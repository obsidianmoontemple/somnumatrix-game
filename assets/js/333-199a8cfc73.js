/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var GR = { base: -580000, realms: {}, list: [], on: null, R: null, inside: null, spots: [], people: [], doors: [], drill: null, near: null, prompted: false,
gates: {}, gatePrompt: false, told: {}, guide: null, banner: "", t: 0, picked: {}, busy: false, stock: null, stockAt: 0, chk: 0, lect: {}, hudEl: null };
var GR_JOB0 = 4800, GR_JOB1 = 5499;
function grLite() { return typeof LITE !== "undefined" && !!LITE; }
function grSigned() { return typeof signedIn === "function" && signedIn(); }
function grKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function grRpc(name, args) { return typeof cityRpc === "function" ? cityRpc(name, args || {}) : Promise.reject(new Error("offline")); }
function grMissing(e) { return typeof rpcMissing === "function" ? rpcMissing(e) : /PGRST202|Could not find the function|does not exist|schema cache|404/i.test(String((e && e.message) || e)); }
function grSay(h) { if (typeof setStatus === "function")
setStatus(h); }
function grTone(f, d) { if (typeof playTone === "function")
try {
playTone(f, d);
}
catch (e) { } }
function grTitle(t, col) { return "<div style='font:600 17px var(--serif,Georgia);color:" + (col || "#FFE7B0") + "'>" + t + "</div>"; }
function grHead(t) { return "<div style='margin:10px 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#D8A868'>" + t + "</div>"; }
function grL() { return typeof worldLocal === "function" ? worldLocal() : { x: 0, y: 0, z: 0 }; }
function grHash(s) { var h = 2166136261; s = String(s); for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619);
} return h >>> 0; }
var GR_MB = {};
function grRealm(r) {
r.key = "gr_" + r.id;
r.idx = GR.list.length;
r.emp = GR_JOB0 + r.idx * 18;
GR.realms[r.id] = r;
GR.list.push(r);
(r.mats || []).forEach(function (m) { GR_MB[m.k] = { kind: m.k, name: m.n, icon: m.e || "", buys: Math.max(1, Math.round(m.p * 0.6)), price: m.rare ? null : m.p }; });
return r;
}
var GR_TEX = { stone: 1, marble: 1, brick: 1, plaster: 1, wood: 1, slate: 1, shingle: 1, metal: 1, metalroof: 1, paving: 1, floortile: 1, tile: 1, concrete: 1, snow: 1, sand: 1, earth: 1, grass: 1, bark: 1 };
function grMat(col, tx, o) { return __ZC(333, 0, this, arguments, new.target); }
function grMesh(geo, mat, x, y, z, P, ry) { var m = new THREE.Mesh(geo, mat); m.position.set(x || 0, y || 0, z || 0); if (ry)
m.rotation.y = ry; if (P)
P.add(m); return m; }
function grBox(P, w, h, d, col, tx, x, y, z, ry, o) { return grMesh(new THREE.BoxGeometry(w, h, d), grMat(col, tx, o), x, y, z, P, ry); }
function grCyl(P, rt, rb, h, col, tx, x, y, z, seg, o) { return grMesh(new THREE.CylinderGeometry(rt, rb, h, seg || 12), grMat(col, tx, o), x, y, z, P); }
function grCone(P, r, h, col, tx, x, y, z, seg, o) { return grMesh(new THREE.ConeGeometry(r, h, seg || 10), grMat(col, tx, o), x, y, z, P); }
function grSph(P, r, col, tx, x, y, z, seg, o) { return grMesh(new THREE.SphereGeometry(r, seg || 14, Math.max(6, ((seg || 14) * 0.6) | 0)), grMat(col, tx, o), x, y, z, P); }
function grDome(P, r, col, tx, x, y, z, seg, o) { return grMesh(new THREE.SphereGeometry(r, seg || 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), grMat(col, tx, o), x, y, z, P); }
function grRoof(P, w, h, d, col, tx, x, y, z, ry) {
var s = new THREE.Shape();
s.moveTo(-d / 2, 0);
s.lineTo(d / 2, 0);
s.lineTo(0, h);
s.lineTo(-d / 2, 0);
var g = new THREE.ExtrudeGeometry(s, { depth: w, bevelEnabled: false });
g.translate(0, 0, -w / 2);
g.rotateY(Math.PI / 2);
return grMesh(g, grMat(col, tx), x, y, z, P, ry);
}
function grBake(grp) { return __ZC(333, 1, this, arguments, new.target); }
function grSign(P, lines, x, y, z, ry, w, h, bg, fg) { var s = wSign(lines, w || 3.4, h || 1, bg || "#1E1A14", fg || "#F0DCA8"); s.position.set(x, y, z); s.rotation.y = ry || 0; s.userData.grKeep = 1; P.add(s); return s; }
function grGlow(P, col, size, op, x, y, z) { var g = wGlow(col, size, op); g.position.set(x, y, z); P.add(g); return g; }
function grFurn(P, name, x, y, z, ry, s) {
if (typeof FURN === "undefined" || typeof FURN[name] !== "function")
return null;
var g;
try {
g = FURN[name]();
}
catch (e) {
return null;
}
if (!g)
return null;
g.position.set(x, y || 0, z);
g.rotation.y = ry || 0;
if (s)
g.scale.setScalar(s);
P.add(g);
return g;
}
function grKit(P, a, x, y, z, ry, s) { return __ZC(333, 2, this, arguments, new.target); }
function grKitSize(a, s) { var d = typeof KIT !== "undefined" && KIT[a]; return d && d.size ? [d.size[0] * (s || 1), d.size[1] * (s || 1), d.size[2] * (s || 1)] : [1, 1, 1]; }
function grHud(html) { return __ZC(333, 3, this, arguments, new.target); }
function grArrow(L, x, z, label) { return __ZC(333, 4, this, arguments, new.target); }
try {
var _gp = JSON.parse(localStorage.getItem("somnu.gr.picked") || "{}"), _gn = Date.now();
Object.keys(_gp).forEach(function (k) { if (_gp[k] > _gn)
GR.picked[k] = _gp[k]; });
}
catch (e) { }
function grPickedSave() { try {
var n = Date.now(), o = {};
Object.keys(GR.picked).forEach(function (k) { if (GR.picked[k] > n)
o[k] = GR.picked[k]; });
localStorage.setItem("somnu.gr.picked", JSON.stringify(o));
}
catch (e) { } }
function grLocalGet(k, d) { try {
var v = JSON.parse(localStorage.getItem("somnu.gr." + k));
return v == null ? d : v;
}
catch (e) {
return d;
} }
function grLocalSet(k, v) { try {
localStorage.setItem("somnu.gr." + k, JSON.stringify(v));
}
catch (e) { } }
var GR_STYLE = {
classical: { wall: [0xE4DCCC, "marble"], trim: [0xC8BCA4, "stone"], roof: [0x8A5A44, "tile"], floor: [0xD8D0C0, "marble"], pave: [0xBEB6A6, "paving"], accent: 0x8A2A2A, glow: 0xFFE2A8, roofKind: "dome", cols: true, lamp: "ornatelamp", tree: "tree", statue: "herostatue" },
gothic: { wall: [0x8A8478, "stone"], trim: [0x5E5A52, "stone"], roof: [0x3E4248, "slate"], floor: [0x6E6A62, "stone"], pave: [0x7A766E, "paving"], accent: 0x4A1E5A, glow: 0xFFD890, roofKind: "spire", cols: false, lamp: "ornatelamp", tree: "pine", statue: "statue" },
dwarf: { wall: [0x7A6E62, "stone"], trim: [0x5A4E42, "stone"], roof: [0x4A4038, "stone"], floor: [0x6A5E52, "stone"], pave: [0x605448, "paving"], accent: 0x8A5A1A, glow: 0xFFB868, roofKind: "flat", cols: true, lamp: "brazier", tree: "giantmushroom", statue: "herostatue" },
timber: { wall: [0xE8DCC0, "plaster"], trim: [0x5A3E26, "wood"], roof: [0x6A4A34, "shingle"], floor: [0x8A6A4A, "wood"], pave: [0x9A8E7A, "paving"], accent: 0x2E5A34, glow: 0xFFD898, roofKind: "pitched", cols: false, lamp: "lanternpost", tree: "tree", statue: "statue" },
crystal: { wall: [0xD8D0F0, "marble"], trim: [0x9A8AC8, "marble"], roof: [0xB8A8F0, null], floor: [0xC8C0E0, "marble"], pave: [0xA89AC8, "paving"], accent: 0x6A4AB8, glow: 0xD8C8FF, roofKind: "crystal", cols: true, lamp: "crystalbrazier", tree: "crystalspire", statue: "obelisk" },
station: { wall: [0x8A9098, "metal"], trim: [0x6E7884, "metal"], roof: [0x8A929C, "metalroof"], floor: [0x9AA0A8, "floortile"], pave: [0x8A9098, "concrete"], accent: 0x2E5A9A, glow: 0xCFE6FF, roofKind: "module", cols: false, lamp: "streetlight", tree: null, statue: "obelisk" },
ice: { wall: [0xB8C4CE, "marble"], trim: [0x7E92A4, "marble"], roof: [0xA8B8C6, "snow"], floor: [0x9CACBA, "marble"], pave: [0xAAB6C0, "snow"], accent: 0x3A6A9A, glow: 0xD8ECFF, roofKind: "spire", cols: true, lamp: "crystalbrazier", tree: "pine", statue: "obelisk" },
desert: { wall: [0xE0C89A, "plaster"], trim: [0xB8946A, "stone"], roof: [0xC8A878, "plaster"], floor: [0xD8C4A0, "tile"], pave: [0xD0B88E, "sand"], accent: 0x2A6A8A, glow: 0xFFD8A0, roofKind: "dome", cols: true, lamp: "brazier", tree: "palm", statue: "obelisk" },
coral: { wall: [0xE8C8B8, "plaster"], trim: [0xC88A7A, "stone"], roof: [0x6AA8B8, "tile"], floor: [0xD8C8B8, "tile"], pave: [0xC8B8A0, "sand"], accent: 0x2A7A8A, glow: 0xC8F0FF, roofKind: "dome", cols: true, lamp: "crystalbrazier", tree: "coral", statue: "obelisk" },
fae: { wall: [0xE8E0C8, "plaster"], trim: [0x6A5A3A, "wood"], roof: [0x4A6A3A, "shingle"], floor: [0x8A7A5A, "wood"], pave: [0x8A9A6A, "grass"], accent: 0x8A4AA8, glow: 0xE8F0B0, roofKind: "spire", cols: false, lamp: "lanternpost", tree: "tree", statue: "statue" },
bone: { wall: [0x8E8A80, "stone"], trim: [0x4A4640, "stone"], roof: [0x2E2C2A, "slate"], floor: [0x5A5650, "stone"], pave: [0x5E5A54, "paving"], accent: 0x3A5A4A, glow: 0xB8E8D0, roofKind: "spire", cols: true, lamp: "brazier", tree: "deadtree", statue: "statue" },
future: { wall: [0x9C9890, "concrete"], trim: [0x5E6670, "metal"], roof: [0x6E747C, "metalroof"], floor: [0xA8A49C, "floortile"], pave: [0x8E8A84, "paving"], accent: 0x2A4E6E, glow: 0xDDF0FF, roofKind: "flat", cols: true, lamp: "streetlight", tree: "pine", statue: "obelisk" },
eastern: { wall: [0xE8DCC8, "plaster"], trim: [0x8A2A1E, "wood"], roof: [0x3A4A44, "tile"], floor: [0x9A7A54, "wood"], pave: [0xB8AE9A, "paving"], accent: 0xA82A1E, glow: 0xFFD8A0, roofKind: "tiered", cols: true, lamp: "lanternpost", tree: "tree", statue: "statue" },
fire: { wall: [0x5A4A42, "stone"], trim: [0x3A2E28, "stone"], roof: [0x2E2622, "slate"], floor: [0x4A3E38, "stone"], pave: [0x463A34, "paving"], accent: 0xA83A1A, glow: 0xFFA868, roofKind: "flat", cols: true, lamp: "brazier", tree: "deadtree", statue: "herostatue" }
};
var GR_ROOM = {
throne: { back: ["grandthrone"], wall: ["hallbanner", "armourstand", "hallbanner", "brazier", "hallbanner", "armourstand"], mid: ["redrunner"], hang: ["ironchandelier", "ironchandelier"] },
council: { back: ["banner"], mid: ["longtable", "longtable"], around: "chair", wall: ["bookshelf", "painting", "maptable", "painting", "clock"], hang: ["chandelier", "chandelier"] },
office: { back: ["desk"], wall: ["bookshelf", "bookshelf", "plant", "painting", "armchair", "clock"], mid: ["rug"], hang: ["chandelier"] },
study: { back: ["desk"], wall: ["bookshelf", "bookshelf", "bookshelf", "lamp", "armchair"], mid: ["rug", "table"], hang: ["chandelier"] },
classroom: { back: ["blackboard"], grid: ["schooldesk", 1.7, 1.6], wall: ["bookshelf", "plant", "clock"], hang: ["chandelier", "chandelier"] },
lecture: { back: ["blackboard"], grid: ["pew", 4, 1.5], wall: ["painting", "painting"], hang: ["chandelier", "chandelier"] },
library: { wall: ["bookshelf", "bookshelf", "bookshelf", "bookshelf", "bookshelf", "bookshelf", "bookshelf", "bookshelf"], mid: ["longtable", "longtable"], around: "chair", hang: ["chandelier", "chandelier"] },
archive: { grid: ["bookshelf", 2.4, 2.2], wall: ["desk", "lamp"], hang: ["chandelier"] },
dorm: { grid: ["bed", 2.4, 3], wall: ["wardrobe", "footchest", "wardrobe", "lamp"], hang: ["chandelier"] },
suite: { back: ["fourposter"], wall: ["wardrobe", "fireplace", "armchair", "painting", "wallmirror", "footchest"], mid: ["rug"], hang: ["chandelier"] },
kitchen: { wall: ["oven", "stove", "counter", "counter", "fridge", "sink", "counter", "barrel"], mid: ["longtable"], hang: ["chandelier"] },
dining: { mid: ["feasttable", "feasttable"], wall: ["painting", "fireplace", "painting", "clock"], hang: ["chandelier", "chandelier"] },
banquet: { mid: ["feasttable", "feasttable"], wall: ["hallbanner", "brazier", "hallbanner", "brazier"], hang: ["ironchandelier", "ironchandelier"] },
armoury: { wall: ["weaponrack", "armourstand", "weaponrack", "armourstand", "weaponrack", "armourstand"], mid: ["weaponrack", "armourstand"], hang: ["chandelier"] },
forge: { back: ["hearthforge"], wall: ["anvil", "barrel", "crates", "weaponrack", "firebowl"], mid: ["anvil"], hang: [] },
lavaforge: { back: ["lavaforge"], wall: ["anvil", "crates", "firebowl", "weaponrack"], mid: ["anvil", "anvil"], hang: [] },
treasury: { back: ["vaultround"], wall: ["treasurechest", "goldcolumn", "treasurechest", "crates"], mid: ["goldhoard"], hang: ["chandelier"] },
vault: { back: ["vaultround"], wall: ["counterbank", "treasurechest", "crates", "treasurechest"], mid: ["goldpile"], hang: [] },
chapel: { back: ["altarinside"], grid: ["pew", 4, 1.6], wall: ["candles", "candles", "banner", "banner"], hang: ["chandelier", "chandelier"] },
shrine: { back: ["altarinside"], wall: ["candles", "plant", "candles", "brazier"], mid: ["rug"], hang: ["chandelier"] },
infirmary: { grid: ["hospitalbed", 2.6, 3], wall: ["sink", "wardrobe", "plant"], hang: ["chandelier"] },
surgery: { mid: ["hospitalbed"], wall: ["wglabbench", "sink", "machine", "wardrobe"], hang: ["chandelier"] },
lab: { wall: ["wglabbench", "wglabbench", "bookshelf", "sink", "machine"], mid: ["wglabbench"], hang: ["chandelier"] },
alchemy: { wall: ["wglabbench", "bookshelf", "wglabbench", "crystals", "barrel"], mid: ["cauldronK"], hang: ["chandelier"] },
observe: { mid: ["maptable", "orreryK"], wall: ["bookshelf", "desk", "lantern", "bookshelf"], hang: [] },
control: { back: ["wgworkstation"], wall: ["wgworkstation", "monitor", "servertower", "wallscreen", "servertower"], mid: ["maptable"], hang: [] },
bunks: { grid: ["wgbunk", 2, 3.2], wall: ["wardrobe", "wardrobe", "lamp"], hang: [] },
store: { grid: ["crates", 2.6, 2.4], wall: ["barrel", "shelfgoods", "barrel", "shelfgoods"], hang: [] },
shop: { back: ["till"], wall: ["shelfgoods", "shelfgoods", "shelfgoods", "shelfgoods", "plant"], mid: ["counter"], hang: ["chandelier"] },
counter: { back: ["counterbank"], wall: ["desk", "bookshelf", "desk", "plant"], grid: ["benchin", 3, 2.2], hang: ["chandelier"] },
lounge: { wall: ["sofa", "armchair", "fireplace", "armchair", "bookshelf", "painting", "plant"], mid: ["rug", "table"], hang: ["chandelier", "chandelier"] },
court: { back: ["judgebench"], wall: ["witnessstand", "jurybox", "courtarms"], mid: ["counseltable", "counseltable"], grid: ["benchin", 3, 1.8], hang: ["chandelier"] },
cells: { wall: ["cage", "cage", "cage", "cage"], mid: ["benchin"], hang: [] },
training: { wall: ["weaponrack", "armourstand", "weaponrack", "benchin", "armourstand"], mid: ["rug", "rug"], hang: ["chandelier"] },
bath: { wall: ["bathtub", "bathtub", "sink", "wallmirror", "plant"], mid: ["rug"], hang: ["chandelier"] },
gallery: { wall: ["painting", "painting", "painting", "painting", "painting", "painting"], mid: ["goldstatue", "crownstand"], hang: ["chandelier", "chandelier"] },
greenhouse: { grid: ["plant", 1.8, 1.8], wall: ["plant", "plant", "barrel"], hang: [] },
crystal: { grid: ["crystalcluster", 3, 3], wall: ["crystals", "crystals"], hang: [] },
mineoffice: { back: ["desk"], wall: ["oreheap", "minecart", "mineprop", "crates", "lantern"], mid: ["minerails"], hang: [] },
orestore: { grid: ["oreheap", 3, 3], wall: ["minecart", "crates", "barrel", "mineprop"], hang: [] },
engine: { back: ["boiler"], wall: ["flywheel", "piston", "pipes", "machine"], mid: ["machine"], hang: [] },
stable: { wall: ["pelt", "barrel", "crates", "pelt"], grid: ["crates", 3.4, 3], hang: [] },
music: { back: ["piano"], grid: ["chair", 1.6, 1.6], wall: ["painting", "painting", "plant"], hang: ["chandelier", "chandelier"] },
workshop: { wall: ["workbench", "trtoolwall", "trlathe", "shelfgoods", "workbench", "crates", "trtoolwall", "machine"], mid: ["workbench", "table"], hang: ["chandelier"] },
lockers: { wall: ["wardrobe", "wardrobe", "wardrobe", "wardrobe", "benchin"], mid: ["benchin"], hang: [] },
hangar: { grid: ["crates", 4, 4], wall: ["machine", "barrel", "machine", "crates"], hang: [] },
map: { mid: ["maptable"], wall: ["bookshelf", "painting", "desk", "painting"], hang: ["chandelier"] },
nursery: { grid: ["crib", 2, 2.2], wall: ["toys", "rug", "lamp", "plant"], hang: ["chandelier"] }
};
var GR_TYPE = {
palace: { size: [54, 20, 36], inside: [80, 64], hall: "The Great Hall", seat: ["throne", "The Throne Room", 0],
rooms: [["council", "The Council Chamber", 1], ["banquet", "The Banqueting Hall", 0], ["suite", "The Royal Apartments", 1], ["treasury", "The Treasury", 1], ["gallery", "The Long Gallery", 0],
["library", "The Palace Library", 0], ["kitchen", "The Palace Kitchens", 1], ["armoury", "The Guard Armoury", 1], ["office", "The Steward's Office", 1], ["lounge", "The Audience Salon", 0], ["chapel", "The Palace Chapel", 0], ["suite", "The Guest Apartments", 0]],
jobs: [["Steward of the palace", 17, 1, false, 8], ["Palace guard", 12, 4, true, 6], ["Palace chamberlain", 14, 1, false, 9], ["Palace cook", 11, 2, true, 5], ["Palace page", 10, 3, true, 8]],
steps: ["Report to the steward", "Walk your round of the halls", "Do what the court needs of you", "Sign the day's book"] },
academy: { size: [48, 16, 32], inside: [66, 52], hall: "The Assembly Hall", seat: ["office", "The Headmistress's Study", 1],
rooms: [["classroom", "Lecture Room One", 0], ["classroom", "Lecture Room Two", 0], ["lecture", "The Theatre of Lectures", 0], ["library", "The Academy Library", 0], ["lab", "The Practical Workroom", 0],
["alchemy", "The Arcane Workroom", 1], ["dorm", "The Scholars' Dormitory", 1], ["dining", "The Refectory", 0], ["observe", "The Observatory", 0], ["office", "The Masters' Common Room", 1]],
jobs: [["Academy master", 16, 3, false, 9], ["Academy tutor", 13, 4, true, 9], ["Academy librarian", 12, 1, true, 8], ["Academy porter", 10, 2, true, 7]],
steps: ["Meet your scholars", "Teach the lesson", "Mark the work", "Write up the register"], lecture: true },
guild: { size: [40, 14, 28], inside: [56, 44], hall: "The Guild Floor", seat: ["council", "The Guildmasters' Table", 1],
rooms: [["workshop", "The Journeymen's Workshop", 0], ["workshop", "The Masters' Workshop", 1], ["store", "The Guild Stores", 1], ["office", "The Records Office", 0], ["counter", "The Hall of Contracts", 0], ["library", "The Pattern Library", 0], ["lounge", "The Members' Room", 0], ["lockers", "The Lockers", 1]],
jobs: [["Guild master", 16, 1, false, 8], ["Guild journeyman", 12, 4, true, 8], ["Guild clerk", 11, 2, true, 9]],
steps: ["Take a contract from the board", "Do the work to the guild's standard", "Have a master check it", "Book it in"] },
temple: { size: [40, 22, 30], inside: [56, 48], hall: "The Nave", seat: ["shrine", "The Inner Sanctum", 1],
rooms: [["chapel", "The Chapel of Light", 0], ["chapel", "The Chapel of Quiet", 0], ["library", "The Scriptorium", 0], ["dorm", "The Cloister Cells", 1], ["infirmary", "The House of Healing", 0], ["dining", "The Refectory", 0], ["shrine", "The Hall of Offerings", 0], ["office", "The Keeper's Vestry", 1]],
jobs: [["Temple keeper", 14, 1, false, 6], ["Temple acolyte", 10, 4, true, 6], ["Temple scribe", 11, 1, true, 9], ["Temple healer", 13, 2, false, 8]],
steps: ["Open the doors at first light", "Tend the lamps and the offerings", "Welcome those who come", "Close the day with the rite"] },
barracks: { size: [46, 12, 30], inside: [60, 46], hall: "The Muster Hall", seat: ["map", "The Commander's War Room", 1],
rooms: [["armoury", "The Armoury", 1], ["training", "The Practice Hall", 0], ["dorm", "The Barrack Room", 1], ["dining", "The Mess", 0], ["infirmary", "The Sick Bay", 0], ["office", "The Duty Office", 0], ["cells", "The Guardroom Cells", 1], ["stable", "The Kit Store", 1]],
jobs: [["Watch commander", 16, 1, false, 7], ["Guard of the watch", 12, 6, true, 6], ["Drill sergeant", 13, 1, false, 7], ["Quartermaster", 12, 1, true, 8]],
steps: ["Muster for the watch", "Patrol your beat", "Drill with your squad", "Hand over with the log"] },
market: { size: [48, 12, 34], inside: [64, 50], hall: "The Trading Floor", seat: ["vault", "The Counting House", 1],
rooms: [["shop", "The Spice and Food Stalls", 0], ["shop", "The Cloth Hall", 0], ["shop", "The Tool Sellers", 0], ["shop", "The Curio Dealers", 0], ["store", "The Bonded Warehouse", 1], ["office", "The Market Office", 0], ["counter", "The Exchange Desk", 0], ["dining", "The Market Cookshop", 0]],
jobs: [["Market warden", 14, 1, false, 7], ["Market porter", 10, 4, true, 6], ["Stallholder's hand", 10, 4, true, 8], ["Exchange clerk", 12, 1, true, 9]],
steps: ["Open the stalls", "Weigh and price the goods", "Serve the buyers", "Count and bank the takings"], trade: true },
library: { size: [40, 16, 30], inside: [56, 46], hall: "The Reading Room", seat: ["archive", "The Locked Stacks", 1],
rooms: [["library", "The North Stacks", 0], ["library", "The South Stacks", 0], ["archive", "The Map Archive", 0], ["study", "The Carrels", 0], ["workshop", "The Bindery", 1], ["office", "The Librarian's Office", 1], ["archive", "The Chronicle Room", 0], ["lounge", "The Quiet Lounge", 0]],
jobs: [["Head librarian", 15, 1, false, 8], ["Library clerk", 11, 3, true, 9], ["Bookbinder", 12, 1, true, 8]],
steps: ["Reshelve the returns", "Help a reader find what they seek", "Mend a damaged book", "Log the day's loans"], chronicle: true },
hospital: { size: [46, 14, 30], inside: [60, 48], hall: "The Admissions Hall", seat: ["office", "The Physician's Office", 1],
rooms: [["infirmary", "The East Ward", 0], ["infirmary", "The West Ward", 0], ["surgery", "The Surgery", 1], ["lab", "The Apothecary", 1], ["nursery", "The Children's Ward", 0], ["bath", "The Baths", 0], ["store", "The Linen Store", 1], ["dorm", "The Nurses' Quarters", 1]],
jobs: [["Physician", 18, 2, false, 8], ["Nurse", 13, 4, true, 7], ["Apothecary", 14, 1, false, 8], ["Orderly", 10, 3, true, 6]],
steps: ["Read the night notes", "See the patients on your list", "Give what is prescribed", "Write up the notes"] },
bank: { size: [40, 14, 28], inside: [54, 44], hall: "The Banking Hall", seat: ["vault", "The Strongroom", 1],
rooms: [["counter", "The Tellers' Counter", 0], ["office", "The Manager's Office", 1], ["office", "The Loans Office", 0], ["vault", "The Deposit Vault", 1], ["archive", "The Ledger Room", 1], ["lounge", "The Clients' Lounge", 0], ["lockers", "The Staff Room", 1]],
jobs: [["Bank manager", 17, 1, false, 9], ["Bank teller", 12, 3, true, 9], ["Strongroom guard", 12, 2, true, 8]],
steps: ["Open the tills", "Serve the customers at the counter", "Balance the ledger", "Lock the strongroom"] },
court: { size: [40, 16, 30], inside: [56, 46], hall: "The Hall of Justice", seat: ["court", "The High Court", 0],
rooms: [["court", "The Lower Court", 0], ["office", "The Judges' Chambers", 1], ["archive", "The Rolls Office", 0], ["cells", "The Holding Cells", 1], ["lounge", "The Witness Room", 0], ["office", "The Advocates' Room", 0], ["library", "The Law Library", 0]],
jobs: [["Court clerk", 13, 2, true, 9], ["Court usher", 11, 2, true, 8], ["Court advocate", 16, 2, false, 9]],
steps: ["Set out the day's list", "Call the cases", "Keep the record", "File the judgements"] },
inn: { size: [38, 14, 26], inside: [52, 42], hall: "The Taproom", seat: ["office", "The Innkeeper's Parlour", 1],
rooms: [["dining", "The Dining Room", 0], ["kitchen", "The Kitchen", 1], ["suite", "The Best Room", 0], ["dorm", "The Travellers' Rooms", 0], ["lounge", "The Snug", 0], ["store", "The Cellar", 1], ["bath", "The Bath House", 0]],
jobs: [["Innkeeper", 14, 1, false, 7], ["Inn cook", 11, 2, true, 5], ["Server", 10, 3, true, 11], ["Chamber hand", 10, 2, true, 8]],
steps: ["Open up and light the fires", "Serve the guests", "Make up the rooms", "Close the books for the night"] },
observatory: { size: [34, 18, 34], inside: [50, 46], hall: "The Instrument Hall", seat: ["observe", "The Great Telescope", 0],
rooms: [["observe", "The Star Room", 0], ["map", "The Chart Room", 0], ["lab", "The Calculation Room", 0], ["library", "The Almanac Library", 0], ["office", "The Astronomer's Study", 1], ["dorm", "The Watchers' Rooms", 1]],
jobs: [["Astronomer", 16, 1, false, 20], ["Observatory assistant", 12, 2, true, 18], ["Chart keeper", 11, 1, true, 9]],
steps: ["Open the dome", "Take the readings", "Work the figures", "Enter them in the almanac"], lecture: true },
lab: { size: [42, 12, 30], inside: [56, 44], hall: "The Main Laboratory", seat: ["control", "The Director's Room", 1],
rooms: [["lab", "The Sample Lab", 0], ["lab", "The Clean Lab", 1], ["control", "The Instrument Room", 0], ["store", "The Cold Store", 1], ["office", "The Researchers' Office", 0], ["library", "The Reading Room", 0], ["lockers", "The Gowning Room", 1]],
jobs: [["Research director", 18, 1, false, 8], ["Researcher", 14, 3, false, 9], ["Lab technician", 12, 3, true, 8]],
steps: ["Check the overnight runs", "Run the day's tests", "Record the results", "Clean and reset the benches"] },
forge: { size: [42, 14, 30], inside: [58, 46], hall: "The Forge Floor", seat: ["lavaforge", "The Master's Forge", 1],
rooms: [["forge", "The Blade Forge", 0], ["forge", "The Armour Forge", 0], ["workshop", "The Finishing Shop", 0], ["store", "The Bar Store", 1], ["armoury", "The Proving Room", 0], ["office", "The Forgemaster's Office", 1], ["engine", "The Bellows House", 1]],
jobs: [["Forgemaster", 16, 1, false, 7], ["Smith", 13, 3, true, 7], ["Striker", 11, 3, true, 7], ["Bellows hand", 10, 2, true, 15]],
steps: ["Bank the fires", "Heat and work the metal", "Quench and temper", "Stamp the work with the forge's mark"] },
mine: { size: [40, 14, 26], inside: [56, 44], hall: "The Pithead Hall", seat: ["mineoffice", "The Mine Captain's Office", 1],
rooms: [["orestore", "The Ore Store", 1], ["mineoffice", "The Lamp Room", 0], ["engine", "The Winding House", 1], ["lockers", "The Changing Room", 0], ["dining", "The Canteen", 0], ["infirmary", "The First-Aid Room", 0], ["store", "The Powder Store", 1]],
jobs: [["Mine captain", 16, 1, false, 6], ["Miner", 13, 6, true, 6], ["Lamp keeper", 10, 1, true, 5], ["Ore sorter", 11, 3, true, 7]],
steps: ["Take your lamp and tally", "Go down to your face", "Work your seam safely", "Send up the ore and check out"], gather: true },
dock: { size: [44, 12, 28], inside: [58, 44], hall: "The Harbour Hall", seat: ["map", "The Harbourmaster's Office", 1],
rooms: [["store", "The Bonded Store", 1], ["office", "The Customs House", 0], ["workshop", "The Rope and Sail Loft", 0], ["dining", "The Sailors' Mess", 0], ["dorm", "The Seamen's Rest", 0], ["map", "The Chart House", 0], ["hangar", "The Boat Shed", 1]],
jobs: [["Harbourmaster", 16, 1, false, 6], ["Dock hand", 11, 5, true, 6], ["Customs officer", 13, 2, false, 8]],
steps: ["Check the tide and the arrivals", "Load and unload", "Check the manifests", "Log the day's sailings"], gather: true },
farm: { size: [40, 12, 26], inside: [54, 42], hall: "The Barn Hall", seat: ["office", "The Steward's Office", 1],
rooms: [["store", "The Granary", 1], ["greenhouse", "The Glasshouse", 0], ["kitchen", "The Dairy Kitchen", 0], ["stable", "The Byre", 0], ["workshop", "The Tool Shed", 0], ["dining", "The Harvest Table", 0], ["store", "The Seed Store", 1]],
jobs: [["Farm steward", 14, 1, false, 6], ["Farmhand", 11, 6, true, 6], ["Dairy hand", 10, 2, true, 5]],
steps: ["Feed and water the stock", "Work the fields or the glasshouse", "Bring in the harvest", "Store and tally it"], gather: true },
hall: { size: [44, 16, 30], inside: [60, 48], hall: "The Grand Chamber", seat: ["council", "The Council Table", 1],
rooms: [["office", "The Records Office", 0], ["office", "The Permits Office", 0], ["counter", "The Public Counter", 0], ["archive", "The Registry", 1], ["lounge", "The Members' Lobby", 0], ["map", "The Planning Room", 0], ["dining", "The Members' Dining Room", 0], ["lockers", "The Staff Room", 1]],
jobs: [["Hall clerk", 12, 3, true, 9], ["Hall steward", 13, 1, false, 8], ["Hall usher", 10, 2, true, 8]],
steps: ["Open the public counter", "Deal with what people bring", "File it properly", "Close the counter and report"] },
bath: { size: [40, 12, 30], inside: [56, 44], hall: "The Great Pool Hall", seat: ["bath", "The Hot Room", 0],
rooms: [["bath", "The Warm Room", 0], ["bath", "The Cold Plunge", 0], ["lounge", "The Resting Room", 0], ["lockers", "The Changing Rooms", 0], ["lab", "The Herb Room", 1], ["engine", "The Boiler Room", 1]],
jobs: [["Baths keeper", 13, 1, false, 7], ["Bath attendant", 10, 4, true, 7], ["Boilerman", 11, 1, true, 5]],
steps: ["Fire the boilers", "Ready the pools and towels", "Look after the bathers", "Clean down at closing"] },
theatre: { size: [44, 18, 34], inside: [60, 52], hall: "The Grand Auditorium", seat: ["music", "The Stage", 0],
rooms: [["lounge", "The Foyer Bar", 0], ["music", "The Rehearsal Room", 0], ["workshop", "The Scene Shop", 1], ["suite", "The Dressing Rooms", 1], ["store", "The Wardrobe Store", 1], ["office", "The Manager's Office", 1], ["music", "The Orchestra Room", 0]],
jobs: [["Stage manager", 14, 1, false, 14], ["Player", 13, 6, true, 16], ["Musician", 12, 4, true, 16], ["Usher", 10, 3, true, 17]],
steps: ["Set the stage", "Rehearse the scenes", "Play to the house", "Strike and reset"] },
workshop: { size: [40, 12, 28], inside: [54, 42], hall: "The Works Floor", seat: ["office", "The Works Manager's Office", 1],
rooms: [["workshop", "Bay One", 0], ["workshop", "Bay Two", 0], ["engine", "The Engine Room", 1], ["store", "The Parts Store", 1], ["lab", "The Test Room", 0], ["lockers", "The Locker Room", 1], ["dining", "The Canteen", 0]],
jobs: [["Works manager", 15, 1, false, 7], ["Fitter", 12, 4, true, 7], ["Apprentice", 10, 3, true, 8]],
steps: ["Take the job card", "Strip, fit and repair", "Test it", "Sign it off"], gather: true },
hangar: { size: [50, 16, 36], inside: [66, 52], hall: "The Flight Deck", seat: ["control", "Flight Control", 1],
rooms: [["hangar", "The Repair Bay", 0], ["store", "The Spares Store", 1], ["control", "The Navigation Room", 0], ["bunks", "The Crew Quarters", 1], ["dining", "The Crew Mess", 0], ["lockers", "The Suit Room", 1], ["office", "The Dispatch Office", 0]],
jobs: [["Flight controller", 16, 1, false, 7], ["Pilot", 15, 3, false, 7], ["Deck crew", 12, 4, true, 6]],
steps: ["Check the board", "Ready the craft", "Fly or guide the flights", "Log the hours"] },
embassy: { size: [40, 14, 28], inside: [54, 44], hall: "The Reception Hall", seat: ["office", "The Ambassador's Study", 1],
rooms: [["lounge", "The Salon", 0], ["council", "The Treaty Room", 1], ["dining", "The State Dining Room", 0], ["suite", "The Guest Suites", 0], ["office", "The Consular Office", 0], ["archive", "The Cipher Room", 1], ["library", "The Embassy Library", 0]],
jobs: [["Ambassador's aide", 15, 1, false, 9], ["Interpreter", 14, 2, false, 9], ["Consular clerk", 12, 2, true, 9]],
steps: ["Read the dispatches", "Receive the visitors", "Interpret and record", "Send the evening dispatch"] },
gaol: { size: [40, 12, 28], inside: [54, 44], hall: "The Gate Hall", seat: ["office", "The Governor's Office", 1],
rooms: [["cells", "The North Block", 1], ["cells", "The South Block", 1], ["dining", "The Hall of Meals", 0], ["workshop", "The Work Room", 1], ["chapel", "The Gaol Chapel", 0], ["infirmary", "The Infirmary", 0], ["office", "The Visiting Room", 0]],
jobs: [["Gaol warden", 14, 3, true, 6], ["Gaol governor", 16, 1, false, 8]],
steps: ["Take over the keys", "Walk the blocks", "Run the day's routine", "Hand over the keys"] }
};
var GR_ROOMWHO = { throne: "Herald", council: "Councillor", office: "Clerk", classroom: "Tutor", lecture: "Lecturer", library: "Librarian", archive: "Archivist", kitchen: "Cook", dining: "Server", banquet: "Steward",
armoury: "Armourer", forge: "Smith", lavaforge: "Forgemaster", treasury: "Treasurer", vault: "Vault keeper", chapel: "Acolyte", shrine: "Keeper of the shrine", infirmary: "Nurse", surgery: "Surgeon", lab: "Researcher",
alchemy: "Arcanist", observe: "Astronomer", control: "Controller", shop: "Stallholder", counter: "Clerk", lounge: "Host", court: "Usher", training: "Drill instructor", bath: "Attendant", gallery: "Curator",
greenhouse: "Gardener", crystal: "Crystal-cutter", mineoffice: "Mine captain", orestore: "Ore sorter", engine: "Engineer", workshop: "Journeyman", music: "Musician", hangar: "Deck hand", map: "Navigator", store: "Storekeeper" };
var GR_AT = { arrive: { x: 0, z: 250 }, gate: { x: 0, z: 266 }, plaza: { x: 0, z: 80, r: 36 }, palace: { x: 0, z: -200 },
rows: [210, 145, 10, -55], arena: { x: -142, z: 80, w: 74, d: 52 }, tunnel: { x0: 200, x1: 330, z: 80, w: 9 }, deep: { x: 420, z: 80, r: 60 },
bound: { x0: -236, x1: 566, z0: -262, z1: 292 }, terr: [{ x0: -82, x1: 82, z0: -160, z1: -110, h: 4.5 }, { x0: -62, x1: 62, z0: -236, z1: -160, h: 9 }],
stairs: [{ x0: -10, x1: 10, z0: -124, z1: -110, h0: 4.5, h1: 0 }, { x0: -10, x1: 10, z0: -174, z1: -160, h0: 9, h1: 4.5 }] };
var GR_DEEP_AT = [[420, 4, 0], [496, 80, -Math.PI / 2], [420, 156, Math.PI], [348, 150, Math.PI / 2]];
function grGround(x, z, feet) { return __ZC(333, 5, this, arguments, new.target); }
function grOnIsle(x, z) {
var L = GR.isles;
for (var i = 0; i < L.length; i++) {
var q = L[i];
if (q.r !== undefined) {
var dx = x - q.x, dz = z - q.z;
if (dx * dx + dz * dz < q.r * q.r)
return true;
}
else if (x >= q.x0 && x <= q.x1 && z >= q.z0 && z <= q.z1)
return true;
}
return false;
}
function grBlock(x, z, feet) {
if (x > 15000)
return grInsideBlock(x, z, feet);
var B = GR_AT.bound;
if (x < B.x0 || x > B.x1 || z < B.z0 || z > B.z1)
return true;
if (GR.R && GR.R.layout === "isles" && !grOnIsle(x, z) && grGround(x, z, feet) < -100)
return true;
if (worldSolidAt(GR.solids, x, z, feet))
return true;
return false;
}
function grBuildOutside(G, R) { return __ZC(333, 6, this, arguments, new.target); }
function grQuays(P, R, S) { return __ZC(333, 7, this, arguments, new.target); }
function grPaveRect(P, R, S, x0, x1, z0, z1, y) { return __ZC(333, 8, this, arguments, new.target); }
function grPaveDisc(P, R, S, x, z, r, y) { return __ZC(333, 9, this, arguments, new.target); }
function grGroundBuild(G, P, R, S) { return __ZC(333, 10, this, arguments, new.target); }
function grRange(P, R, E, gcol) { return __ZC(333, 11, this, arguments, new.target); }
function grLamp(P, S, x, z, R) {
var a = S.lamp, m = grKit(P, a, x, 0, z, 0, 1);
if (!m) {
grCyl(P, 0.1, 0.14, 4, S.trim[0], "metal", x, 2, z, 6);
grSph(P, 0.3, S.glow, null, x, 4.2, z, 8, { glow: true });
}
if (!grLite())
grGlow(P, S.glow, 3.2, 0.3, x, 4.1, z);
}
function grTerraces(P, R, S) { return __ZC(333, 12, this, arguments, new.target); }
function grPlazaHeart(P, R, S) { return __ZC(333, 13, this, arguments, new.target); }
function grSite(G, P, R, S, b, x, z, rot, id, yy) { return __ZC(333, 14, this, arguments, new.target); }
function grIsleFor(x, z, w, d, rot, pad) {
var a = Math.abs(Math.sin(rot)) > 0.5, hw = (a ? d : w) / 2 + pad, hd = (a ? w : d) / 2 + pad;
return { x0: x - hw, x1: x + hw, z0: z - hd, z1: z + hd };
}
function grTint(col, seed, amt) { var c = new THREE.Color(col), r = wRand(grHash(seed))(), hsl = {}; c.getHSL(hsl); c.setHSL(hsl.h + (r - 0.5) * 0.03, Math.min(1, hsl.s * (0.85 + r * 0.4)), Math.max(0, Math.min(1, hsl.l * (1 - amt + r * amt * 2)))); return c.getHex(); }
function grFront(B, R, S, b, w, h, d, grand, colon, trim, glow) { return __ZC(333, 15, this, arguments, new.target); }
function grFacade(B, R, S, b, T, w, h, d, grand) { return __ZC(333, 16, this, arguments, new.target); }
function grSignature(B, R, S, b, w, h, d, top, wall, trim, roof, grand) { return __ZC(333, 17, this, arguments, new.target); }
function grParapet(B, w, d, top, trim, merlons) { return __ZC(333, 18, this, arguments, new.target); }
function grTowers(B, w, d, top, S, s, cap) { return __ZC(333, 19, this, arguments, new.target); }
function grTier(B, w, d, y, roof) { return __ZC(333, 20, this, arguments, new.target); }
function grHomes(P, R, S) { return __ZC(333, 21, this, arguments, new.target); }
function grArena(G, P, R, S) { return __ZC(333, 22, this, arguments, new.target); }
function grTunnel(G, P, R, S) { return __ZC(333, 23, this, arguments, new.target); }
function grDeep(G, P, R, S) { return __ZC(333, 24, this, arguments, new.target); }
function grGatherLook(P, look, x, z, S) { return __ZC(333, 25, this, arguments, new.target); }
function grInnerGate(G, P, R, S) { return __ZC(333, 26, this, arguments, new.target); }
function grLoreStones(P, R, S) { return __ZC(333, 27, this, arguments, new.target); }
var GR_IN_X = 20000, GR_IN_STEP = 260;
function grInsideAt(x, z) { var I = GR.inside; if (I && x > I.x0 - 1 && x < I.x1 + 1 && z > I.z0 - 1 && z < I.z1 + 1)
return I; return null; }
function grInsideBlock(x, z, feet) {
var I = GR.inside;
if (!I)
return true;
if (x < I.x0 + 0.3 || x > I.x1 - 0.3 || z < I.z0 + 0.3 || z > I.z1 - 0.3)
return true;
return worldSolidAt(I.solids, x, z, feet);
}
function grBadge(R) {
if (grKeeper())
return true;
var jobs = (typeof WORK !== "undefined" && WORK.data && WORK.data.jobs) || [];
return jobs.some(function (j) { var id = +j.job_id; return id >= R.emp && id <= R.emp + 17; });
}
function grPlan(site) { return __ZC(333, 28, this, arguments, new.target); }
function grInsideBuild(site, idx) { return __ZC(333, 29, this, arguments, new.target); }
function grRoomBuild(P, G, I, R, S, r, X0, Z0, RH, HH, wallC, wallT) { return __ZC(333, 30, this, arguments, new.target); }
function grFurnish(P, I, R, r, x0, x1, z0, z1, RH) { return __ZC(333, 31, this, arguments, new.target); }
function grStaffPlace(G, I, R, site) { return __ZC(333, 32, this, arguments, new.target); }
function grPersonAt(G, R, o, x, z, ry, outdoor, I) { return __ZC(333, 33, this, arguments, new.target); }
function grCitizens(G, R) { return __ZC(333, 34, this, arguments, new.target); }
function grEnter(site) { return __ZC(333, 35, this, arguments, new.target); }
function grExit() { return __ZC(333, 36, this, arguments, new.target); }
function grRoomAt(I, x, z) { for (var i = 0; i < I.rooms.length; i++) {
var r = I.rooms[i];
if (x > r.x0 && x < r.x1 && z > r.z0 && z < r.z1)
return r;
} return null; }
function grWorkplace(R, b) { return R.name + ": " + b.n; }
function grJobsOf(R) { return __ZC(333, 37, this, arguments, new.target); }
(function () {
if (typeof onSite !== "function")
return;
var os = onSite;
onSite = function (job) {
if (typeof WLD !== "undefined" && WLD.on && GR.R && WLD.on === GR.R.key && job) {
var id = +job.job_id;
if (id >= GR.R.emp && id <= GR.R.emp + 17)
return true;
}
return os.apply(this, arguments);
};
})();
var GR_KEEP = ["solids", "spots", "people", "isles", "sites", "doors", "drillPosts", "gathers", "veil", "plats", "ramps", "fsteps"];
function grSave(R) { var st = {}; GR_KEEP.forEach(function (k) { st[k] = GR[k]; }); R.st = st; }
function grLoad(R) { var st = R.st || {}; GR_KEEP.forEach(function (k) { GR[k] = st[k] || (k === "veil" ? null : []); }); }
function grEnv(R) { return __ZC(333, 38, this, arguments, new.target); }
function grDefine(R) {
if (typeof worldDef !== "function" || WORLDS[R.key])
return;
worldDef(R.key, {
base: GR.base, far: R.layout === "isles" ? 9000 : 4000, ownSky: true, tone: R.tone || 480, gravity: R.gravity || undefined,
env: function () { return grEnv(R); },
build: function (G) { GR.R = R; grBuildOutside(G, R); grSave(R); },
enter: function (opt) {
GR.R = R;
grLoad(R);
GR.inside = null;
GR.on = R.key;
GR.near = null;
GR.drill = null;
GR.guide = null;
(R.st.sites || []).forEach(function (s) { if (s.I)
s.I.g.visible = false; });
var A = GR_AT.arrive;
camera.position.set(GR.base + A.x, 1.72, A.z);
yaw = 0;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
grSay("<b>" + esc(R.name) + ".</b> " + esc(R.intro || "") + " Every building opens (press E at its door); the 🏛️ guide shows the way. The gate behind you takes you back.");
grBtn(true);
},
leave: function () { if (GR.inside) {
GR.inside.g.visible = false;
GR.inside = null;
} (GR.hid || []).forEach(function (c) { c.visible = true; }); GR.hid = []; GR.on = null; GR.drill = null; GR.guide = null; grHud(null); grBtn(false); if (GR.prompted) {
GR.prompted = false;
} var k = R.key; setTimeout(function () { grDrop(k); }, 0); },
ground: function (x, z, feet) { return grGround(x, z, feet); },
block: function (x, z, feet) { return grBlock(x, z, feet); },
tick: function (dt) { grTick(dt); },
back: function () { if (GR.inside) {
grExit();
return;
} grLeave(); }
});
}
function grDrop(key) { return __ZC(333, 39, this, arguments, new.target); }
function grSubNow(w) {
if (w === "surface")
return typeof SF !== "undefined" ? SF.k : null;
if (w === "station")
return typeof STN !== "undefined" ? STN.k : null;
return null;
}
function grGateKey(R) { return R.parent.w + ":" + (R.parent.sub || ""); }
function grHookWorld(w) {
var W = WORLDS[w];
if (!W || W.grHooked)
return;
W.grHooked = true;
var tk = W.tick;
W.tick = function (dt) { if (tk)
tk.apply(this, arguments); try {
grGateTick(w, dt);
}
catch (e) {
if (window.console)
console.warn("[grand] gate", w, e);
} };
var bk = W.block;
W.block = function (x, z, feet) { if (grGateSolid(w, x, z))
return true; return bk ? bk.apply(this, arguments) : false; };
}
function grGatesIn(w) { var sub = grSubNow(w); return GR.list.filter(function (R) { return !R.off && R.parent && R.parent.w === w && (!R.parent.sub || R.parent.sub === sub); }); }
function grGateSolid(w, x, z) {
var L = grGatesIn(w);
for (var i = 0; i < L.length; i++) {
var g = GR.gates[grGateKey(L[i])];
if (!g || !g.sol)
continue;
for (var j = 0; j < g.sol.length; j++) {
var s = g.sol[j], dx = x - s.x, dz = z - s.z;
if (dx * dx + dz * dz < (s.r + 0.35) * (s.r + 0.35))
return true;
}
}
return false;
}
function grGateFind(R, W) { return __ZC(333, 40, this, arguments, new.target); }
function grGateScale(R) { return (R.gate && R.gate.s) || 1; }
function grGateSol(R, g) { var gs = grGateScale(R), c = Math.cos(g.rot), s = Math.sin(g.rot); return [-1, 1].map(function (sd) { return { x: g.x + c * sd * 6.4 * gs, z: g.z - s * sd * 6.4 * gs, r: 1.7 * gs }; }); }
function grGateBuild(R, W, g) { return __ZC(333, 41, this, arguments, new.target); }
function grGateTick(w, dt) { return __ZC(333, 42, this, arguments, new.target); }
function grGo(R) {
worldPrompt(null);
GR.gatePrompt = false;
if (!R || R.off)
return;
var g = GR.gates[grGateKey(R)];
GR.ret = { w: R.parent.w, sub: R.parent.sub || grSubNow(R.parent.w), g: g, yaw: yaw, ugAt: (typeof UG2 !== "undefined" && UG2.on) ? UG2.at : -1 };
grDefine(R);
worldGo(R.key, { keepFrom: !!WLD.on });
}
function grLeave() { return __ZC(333, 43, this, arguments, new.target); }
function grTick(dt) { return __ZC(333, 44, this, arguments, new.target); }
function grDistrict(R, L) { return __ZC(333, 45, this, arguments, new.target); }
function grBtn(on) { return __ZC(333, 46, this, arguments, new.target); }
function grGuideCard() { return __ZC(333, 47, this, arguments, new.target); }
function grChronicle() {
var R = GR.R;
if (!R)
return;
var h = grTitle("📜 The chronicle of " + esc(R.name)) + (R.blurb ? "<div style='opacity:.85;margin:4px 0 6px'>" + esc(R.blurb) + "</div>" : "");
(R.lore || []).concat(R.history || []).forEach(function (L) { h += grHead(esc(L[0])) + "<div>" + esc(L[1]) + "</div>"; });
worldCard(h);
}
function grDrillCard() { return __ZC(333, 48, this, arguments, new.target); }
function grDrillStart() {
var posts = GR.drillPosts || [];
if (!posts.length)
return;
var order = posts.map(function (p, i) { return i; });
for (var i = order.length - 1; i > 0; i--) {
var j = Math.floor(Math.random() * (i + 1)), t = order[i];
order[i] = order[j];
order[j] = t;
}
GR.drill = { order: order, at: 0, t: 0, lit: 0 };
grTone(523, 0.15);
}
function grDrillTick(dt, L) { return __ZC(333, 49, this, arguments, new.target); }
function grMatOf(k) { return __ZC(333, 50, this, arguments, new.target); }
function grGather(sp) { return __ZC(333, 51, this, arguments, new.target); }
function grStock(force) {
if (!grSigned())
return Promise.resolve([]);
if (!force && GR.stock && Date.now() - GR.stockAt < 20000)
return Promise.resolve(GR.stock);
return grRpc("my_stock").then(function (rows) { GR.stock = rows || []; GR.stockAt = Date.now(); return GR.stock; }).catch(function () { return GR.stock || []; });
}
function grHave(k) { var r = (GR.stock || []).filter(function (s) { return s.kind === k; })[0]; return r ? (+r.amount || 0) : 0; }
function grTrade(site, msg) { return __ZC(333, 52, this, arguments, new.target); }
function grBuy(site, k, n) { return __ZC(333, 53, this, arguments, new.target); }
function grSell(site, k, n) { return __ZC(333, 54, this, arguments, new.target); }
function grFeatures(G, I, R, site) { return __ZC(333, 55, this, arguments, new.target); }
function grLecture(site) { return __ZC(333, 56, this, arguments, new.target); }
function grStart() {
GR.list.forEach(function (R) { if (R.off)
return; grDefine(R); if (R.parent && R.parent.w && WORLDS[R.parent.w])
grHookWorld(R.parent.w); });
}
setTimeout(grStart, 0);
var GR_SC = { on: null, near: null, told: {}, ug: null, mall: null };
function grSceneRealm(w, sub) {
for (var i = 0; i < GR.list.length; i++) {
var R = GR.list[i];
if (!R.off && R.parent && R.parent.w === w && (!R.parent.sub || R.parent.sub === sub))
return R;
}
return null;
}
function grSceneTell(R, key, x, z) { return __ZC(333, 57, this, arguments, new.target); }
function grLandGate() { return __ZC(333, 58, this, arguments, new.target); }
(function () {
if (typeof ldBuild === "function") {
var lb = ldBuild;
ldBuild = function (r) { var o = lb.apply(this, arguments); try {
grLandGate();
}
catch (e) {
if (window.console)
console.warn("[grand] land gate", e);
} return o; };
}
if (typeof ldUse === "function") {
var lu = ldUse;
ldUse = function (T) { if (T && T.grR) {
LD.near = null;
if (LD.prompted) {
worldPrompt(null);
LD.prompted = false;
}
grGo(T.grR);
return;
} return lu.apply(this, arguments); };
}
})();
function grSceneGate(kind) { return __ZC(333, 59, this, arguments, new.target); }
function grSceneOrigin(kind) { return kind === "ug" ? { x: UG2.cx, z: UG2.cz } : { x: MALL.cx, z: MALL.cz }; }
function grSceneHere() {
if (typeof WLD !== "undefined" && WLD.on)
return null;
if (typeof MALL !== "undefined" && MALL.on && !store.inside)
return "mall";
if (typeof UG2 !== "undefined" && UG2.on && UG2.mode === "platform")
return "ug";
return null;
}
function grSceneTick(dt) {
var k = grSceneHere();
["ug", "mall"].forEach(function (kk) { var st = GR_SC[kk]; if (st && st.B)
st.B.visible = (kk === k); });
if (!k) {
if (GR_SC.near) {
GR_SC.near = null;
worldPrompt(null);
}
return;
}
var st = grSceneGate(k);
if (!st)
return;
var O = grSceneOrigin(k), g = st.g, gs = grGateScale(st.R);
st.B.position.set(O.x + g.x, g.y, O.z + g.z);
var v = st.B.userData.veil;
if (v)
v.material.opacity = 0.26 + 0.06 * Math.sin(Date.now() / 1250);
grSceneTell(st.R, k, O.x + g.x, O.z + g.z);
var P = camera.position, fx = O.x + g.x + Math.sin(g.rot) * 3 * gs, fz = O.z + g.z + Math.cos(g.rot) * 3 * gs, d = Math.hypot(P.x - fx, P.z - fz);
var near = d < Math.max(2.6, 4.2 * gs) ? st : null;
if (near !== GR_SC.near) {
GR_SC.near = near;
if (near)
worldPrompt("<b>" + esc((near.R.gate && near.R.gate.n) || ("The Gate of " + near.R.name)) + "</b> · <b>press E</b> to go through to " + esc(near.R.name), function () { grSceneGo(); });
else
worldPrompt(null);
}
}
function grSceneGo() {
var st = GR_SC.near;
if (!st)
return;
GR_SC.near = null;
worldPrompt(null);
var k = grSceneHere();
GR.gates[grGateKey(st.R)] = st.g;
grGo(st.R);
if (GR.ret)
GR.ret.scene = k;
}
function grSceneSolid(x, z) {
var k = grSceneHere();
if (!k)
return false;
var st = GR_SC[k];
if (!st)
return false;
var O = grSceneOrigin(k);
for (var i = 0; i < st.sol.length; i++) {
var s = st.sol[i], dx = x - O.x - s.x, dz = z - O.z - s.z;
if (dx * dx + dz * dz < (s.r + 0.3) * (s.r + 0.3))
return true;
}
return false;
}
(function () {
if (typeof transitTick === "function") {
var tt = transitTick;
transitTick = function (dt) { tt.apply(this, arguments); try {
grSceneTick(dt);
}
catch (e) {
if (window.console)
console.warn("[grand] scene gate", e);
} };
}
if (typeof blockedAt === "function") {
var ba = blockedAt;
blockedAt = function (x, z, feet) { if (grSceneSolid(x, z))
return true; return ba.apply(this, arguments); };
}
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (!GR_SC.near || (typeof WLD !== "undefined" && WLD.on))
return;
if (/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
if (e.code === "KeyE" || e.code === "Enter") {
e.preventDefault();
e.stopImmediatePropagation();
grSceneGo();
}
}, true);
})();
var GR_SCENE_LEAVE = {
land: function (R, ret) { worldHome(); var g = ret.g; if (g) {
camera.position.x += Math.sin(g.rot) * 2.5;
camera.position.z += Math.cos(g.rot) * 2.5;
yaw = g.rot + Math.PI;
} },
mall: function (R, ret) { var F = WLD.from; worldHome(); if (typeof mallEnter === "function")
mallEnter(); if (F) {
camera.position.set(F.x, F.y, F.z);
yaw = F.yaw || 0;
pitch = 0;
} },
ug: function (R, ret) { var F = WLD.from; worldHome(); if (ret.ugAt >= 0 && typeof ug2Down === "function")
ug2Down(ret.ugAt); if (F) {
camera.position.set(F.x, F.y, F.z);
yaw = F.yaw || 0;
pitch = 0;
} }
};
var GR_LOOK_DEF = { plan: "avenue", form: "block", decor: [] };
function grLook(R) { return (R && R.look) || GR_LOOK_DEF; }
function grStyle(R) {
var b = GR_STYLE[R.style] || GR_STYLE.classical, L = grLook(R), S = {}, k;
for (k in b)
S[k] = b[k];
if (L.pal)
for (k in L.pal)
S[k] = L.pal[k];
S.k = R.style;
S.form = L.form || "block";
S.plan = L.plan || "avenue";
return S;
}
var GR_RING = { r: 118, road: 92, ang: [35, 65, 115, 145, 215, 245, 295, 325] };
var GR_HILL_Y = [1.2, 2.4, 3.6, 4.8];
function grWardSlots(R) { return __ZC(333, 60, this, arguments, new.target); }
function grHillPlinth(P, R, S, site) { return __ZC(333, 61, this, arguments, new.target); }
function grReserved(x, z, r) { return __ZC(333, 62, this, arguments, new.target); }
function grFree(x, z, r) { return __ZC(333, 63, this, arguments, new.target); }
function grFindFree(rnd, r, tries, near) { return __ZC(333, 64, this, arguments, new.target); }
function grWinRing(B, S, r, y, n, wh, cx, cz, skipFront) { return __ZC(333, 65, this, arguments, new.target); }
function grWinFace(B, S, len, y, z, wh, skipMid, ry) { return __ZC(333, 66, this, arguments, new.target); }
var GR_FORM = {
pod: function (B, R, S, b, w, h, d, grand, wall, trim, roof) { return __ZC(333, 67, this, arguments, new.target); },
round: function (B, R, S, b, w, h, d, grand, wall, trim, roof) { return __ZC(333, 68, this, arguments, new.target); },
stepped: function (B, R, S, b, w, h, d, grand, wall, trim, roof) { return __ZC(333, 69, this, arguments, new.target); },
tower: function (B, R, S, b, w, h, d, grand, wall, trim, roof) { return __ZC(333, 70, this, arguments, new.target); },
carved: function (B, R, S, b, w, h, d, grand, wall, trim, roof) { return __ZC(333, 71, this, arguments, new.target); },
tree: function (B, R, S, b, w, h, d, grand, wall, trim, roof) { return __ZC(333, 72, this, arguments, new.target); },
shell: function (B, R, S, b, w, h, d, grand, wall, trim, roof) { return __ZC(333, 73, this, arguments, new.target); },
timber: function (B, R, S, b, w, h, d, grand, wall, trim, roof) { return __ZC(333, 74, this, arguments, new.target); },
float: function (B, R, S, b, w, h, d, grand, wall, trim, roof) { return __ZC(333, 75, this, arguments, new.target); },
pagoda: function (B, R, S, b, w, h, d, grand, wall, trim, roof) { return __ZC(333, 76, this, arguments, new.target); },
crypt: function (B, R, S, b, w, h, d, grand, wall, trim, roof) { return __ZC(333, 77, this, arguments, new.target); },
fortress: function (B, R, S, b, w, h, d, grand, wall, trim, roof) { return __ZC(333, 78, this, arguments, new.target); },
salvage: function (B, R, S, b, w, h, d, grand, wall, trim, roof) { return __ZC(333, 79, this, arguments, new.target); },
twin: function (B, R, S, b, w, h, d, grand, wall, trim, roof) { return __ZC(333, 80, this, arguments, new.target); }
};
function grHome(P, R, S, x, z, rot, sc) { return __ZC(333, 81, this, arguments, new.target); }
function grRock(P, col, tx, x, z, s, rnd) { var m = grMesh(grRockGeo(Math.floor(rnd() * 8)), grMat(col, tx || "stone"), x, s * 0.35, z, P); m.scale.set(s * (0.8 + rnd() * 0.6), s * (0.5 + rnd() * 0.5), s * (0.8 + rnd() * 0.6)); m.rotation.set(rnd(), rnd() * 6, rnd()); return m; }
var GR_DECOR = {
crater: function (P, R, S, x, z, rnd) { return __ZC(333, 82, this, arguments, new.target); },
rock: function (P, R, S, x, z, rnd) { var E = R.env || {}, s = 1.4 + rnd() * 3; grRock(P, E.rock || E.mtn || 0x6A645C, E.mtnTex || "stone", x, z, s, rnd); if (rnd() < 0.6)
grRock(P, E.rock || E.mtn || 0x6A645C, E.mtnTex || "stone", x + s * 1.2, z + s * 0.6, s * 0.5, rnd); return { r: s * 1.4, solid: true }; },
dune: function (P, R, S, x, z, rnd) { var E = R.env || {}, m = grSph(P, 1, E.groundCol2 || 0xD8BC8A, "sand", x, 0, z, 14); m.scale.set(10 + rnd() * 10, 2 + rnd() * 2.5, 6 + rnd() * 6); m.rotation.y = rnd() * 3; return { r: 12, solid: false }; },
kit: function (P, R, S, x, z, rnd, a, s) { grKit(P, a, x, 0, z, rnd() * 6, s || 1); return { r: 3 * (s || 1), solid: true }; },
crystal: function (P, R, S, x, z, rnd) { return __ZC(333, 83, this, arguments, new.target); },
icespire: function (P, R, S, x, z, rnd) { var n = 2 + Math.floor(rnd() * 3); for (var i = 0; i < n; i++) {
var h = 6 + rnd() * 14;
grCone(P, 1.2 + rnd() * 1.8, h, 0xA8BCCC, "marble", x + (rnd() - 0.5) * 5, h / 2, z + (rnd() - 0.5) * 5, 7);
} return { r: 5, solid: true }; },
drift: function (P, R, S, x, z, rnd) { var m = grSph(P, 1, 0xD4DAE0, "snow", x, 0, z, 12); m.scale.set(5 + rnd() * 6, 1.2 + rnd() * 1.4, 3 + rnd() * 4); m.rotation.y = rnd() * 3; return { r: 6, solid: false }; },
lava: function (P, R, S, x, z, rnd) {
var r = 3 + rnd() * 5;
grCyl(P, r + 1.2, r + 1.6, 0.5, 0x2A2220, "stone", x, 0.2, z, 18);
grCyl(P, r, r, 0.12, 0xC85A26, null, x, 0.46, z, 18, { glow: true });
if (!grLite())
grGlow(P, 0xE07A3A, r * 2.2, 0.2, x, 1.6, z);
return { r: r + 2, solid: true };
},
vent: function (P, R, S, x, z, rnd) { var E = R.env || {}; grCone(P, 2.6, 3, E.rock || 0x4A403A, "stone", x, 1.5, z, 8); grCyl(P, 0.7, 0.7, 0.2, 0xD8803A, null, x, 3, z, 10, { glow: true }); if (!grLite())
grGlow(P, 0xE09050, 4, 0.2, x, 3.6, z); return { r: 3, solid: true }; },
solar: function (P, R, S, x, z, rnd) { var ry = rnd() * 0.6 - 0.3; for (var i = 0; i < 3; i++)
for (var j = 0; j < 2; j++) {
var px = x + (i - 1) * 3.4, pz = z + (j - 0.5) * 4;
grCyl(P, 0.1, 0.1, 1.6, 0x8A8E94, "metal", px, 0.8, pz, 5);
var pn = grBox(P, 3.2, 0.12, 2.2, 0x22324A, null, px, 1.7, pz, ry);
pn.rotation.x = -0.5;
} return { r: 7, solid: true }; },
dish: function (P, R, S, x, z, rnd) { grCyl(P, 0.4, 0.6, 4, 0x8A8E94, "metal", x, 2, z, 8); var d = grMesh(new THREE.SphereGeometry(3, 16, 8, 0, Math.PI * 2, 0, Math.PI / 3), grMat(0xB8BCC2, "metal", { ds: true }), x, 4.6, z, P); d.rotation.x = -0.9; d.rotation.y = rnd() * 6; return { r: 3.5, solid: true }; },
rover: function (P, R, S, x, z, rnd) { return __ZC(333, 84, this, arguments, new.target); },
turbine: function (P, R, S, x, z, rnd) { return __ZC(333, 85, this, arguments, new.target); },
greenhouse: function (P, R, S, x, z, rnd) {
var r = 5 + rnd() * 3;
grCyl(P, r + 0.3, r + 0.3, 0.6, S.trim[0], "metal", x, 0.3, z, 18);
grDome(P, r, 0xB8D8D0, null, x, 0.6, z, 18, { op: 0.38 });
if (!grLite())
for (var i = 0; i < 5; i++)
grSph(P, 0.7, 0x5A8A4A, null, x + (rnd() - 0.5) * r, 0.9, z + (rnd() - 0.5) * r, 6);
return { r: r + 1, solid: true };
},
tent: function (P, R, S, x, z, rnd) { var c = [0xC8A87A, 0xB8584A, 0x8A6A4A, 0xD8C8A8][Math.floor(rnd() * 4)], r = 3 + rnd() * 2; grCone(P, r, 4, c, null, x, 2, z, 8); grBox(P, 1.2, 1.6, 0.1, 0x3A2A1E, null, x, 0.8, z + r * 0.8); return { r: r + 1, solid: true }; },
lantern: function (P, R, S, x, z, rnd) { var c = (grLook(R).lamp) || 0xF0B060; grCyl(P, 0.08, 0.1, 3, 0x2A2620, "metal", x, 1.5, z, 6); grBox(P, 0.5, 0.6, 0.5, c, null, x, 3.2, z, 0, { glow: true }); if (!grLite())
grGlow(P, c, 2.6, 0.24, x, 3.2, z); return { r: 1, solid: true }; },
marigold: function (P, R, S, x, z, rnd) { grBox(P, 4, 0.3, 2, 0x4A3A2A, "earth", x, 0.15, z); for (var i = 0; i < (grLite() ? 6 : 14); i++)
grSph(P, 0.26, rnd() < 0.5 ? 0xE8862A : 0xE0A030, null, x + (rnd() - 0.5) * 3.6, 0.45, z + (rnd() - 0.5) * 1.6, 6); return { r: 2.5, solid: false }; },
flowers: function (P, R, S, x, z, rnd) { var cs = [0xC86A8A, 0xE0C060, 0x8A6AC8, 0xE8E0D0]; grBox(P, 4, 0.3, 2, 0x4A3A2A, "earth", x, 0.15, z); for (var i = 0; i < (grLite() ? 6 : 12); i++)
grSph(P, 0.24, cs[i % 4], null, x + (rnd() - 0.5) * 3.6, 0.45, z + (rnd() - 0.5) * 1.6, 6); return { r: 2.5, solid: false }; },
orchard: function (P, R, S, x, z, rnd) { for (var i = 0; i < 3; i++)
for (var j = 0; j < 2; j++)
grKit(P, "tree", x + (i - 1) * 7, 0, z + (j - 0.5) * 7, rnd() * 6, 0.7); return { r: 11, solid: false }; },
hay: function (P, R, S, x, z, rnd) { for (var i = 0; i < 3; i++) {
var b = grCyl(P, 1, 1, 1.6, 0xC8A85A, null, x + (i - 1) * 2.2, 1, z, 12);
b.rotation.z = Math.PI / 2;
} return { r: 3, solid: true }; },
coral: function (P, R, S, x, z, rnd) { return __ZC(333, 86, this, arguments, new.target); },
kelp: function (P, R, S, x, z, rnd) { for (var i = 0; i < 5; i++) {
var h = 6 + rnd() * 10;
var k = grBox(P, 0.5, h, 0.08, 0x3A6A3A, null, x + (rnd() - 0.5) * 3, h / 2, z + (rnd() - 0.5) * 3, rnd() * 3);
k.rotation.z = (rnd() - 0.5) * 0.2;
} return { r: 2.4, solid: false }; },
clam: function (P, R, S, x, z, rnd) { var s = 1.2 + rnd() * 1.2; grDome(P, s, 0x8A7A8A, null, x, 0, z, 12); var t = grDome(P, s, 0x9A8A9A, null, x, 0.1, z - s * 0.2, 12); t.rotation.x = -0.9; grSph(P, s * 0.3, 0xE8E0E8, null, x, s * 0.3, z, 8); return { r: s + 0.5, solid: true }; },
cloud: function (P, R, S, x, z, rnd) { var c = (R.env && R.env.cloud) || 0xE8E0D0, y = -12 - rnd() * 40; for (var i = 0; i < 4; i++) {
var m = grSph(P, 6 + rnd() * 6, c, null, x + (rnd() - 0.5) * 14, y + (rnd() - 0.5) * 3, z + (rnd() - 0.5) * 10, 9, { op: 0.82 });
m.scale.y = 0.45;
} return { r: 0, solid: false, sky: true }; },
floatrock: function (P, R, S, x, z, rnd) {
var E = R.env || {}, s = 3 + rnd() * 6, y = 8 + rnd() * 30;
var m = grCone(P, s, s * 2.2, E.rock || 0x5A5450, "stone", x, y, z, 7);
m.rotation.x = Math.PI;
grCyl(P, s * 1.02, s, 1, E.groundCol || 0x6A665E, null, x, y + s * 1.1, z, 7);
if (rnd() < 0.5)
grKit(P, "crystalspire", x, y + s * 1.1, z, 0, 0.5);
return { r: 0, solid: false, sky: true };
},
airship: function (P, R, S, x, z, rnd) { return __ZC(333, 87, this, arguments, new.target); },
boat: function (P, R, S, x, z, rnd) { return __ZC(333, 88, this, arguments, new.target); },
scrap: function (P, R, S, x, z, rnd) { var cs = [0x7A4A2A, 0x5A5A56, 0x8A6A4A]; for (var i = 0; i < 5; i++) {
var b = grBox(P, 1 + rnd() * 2.4, 0.6 + rnd() * 1.4, 1 + rnd() * 2, cs[i % 3], "metal", x + (rnd() - 0.5) * 4, 0.5 + i * 0.3, z + (rnd() - 0.5) * 4);
b.rotation.set(rnd() * 0.4, rnd() * 3, rnd() * 0.4);
} return { r: 3.4, solid: true }; },
rustcar: function (P, R, S, x, z, rnd) { return __ZC(333, 89, this, arguments, new.target); },
waterwheel: function (P, R, S, x, z, rnd) {
grBox(P, 6, 0.4, 6, 0x3A6A8A, null, x, 0.1, z, 0, { op: 0.7 });
var wh = grMesh(new THREE.TorusGeometry(3.6, 0.3, 5, 20), grMat(0x5A3E26, "wood"), x, 3.6, z, P);
wh.rotation.y = Math.PI / 2;
for (var i = 0; i < 8; i++) {
var sp = grBox(P, 0.2, 7, 0.4, 0x5A3E26, "wood", x, 3.6, z);
sp.rotation.x = i / 8 * Math.PI;
}
return { r: 4, solid: true };
},
pool: function (P, R, S, x, z, rnd) { var r = 4 + rnd() * 4, c = (grLook(R).water) || 0x3A6A8A; grCyl(P, r + 0.6, r + 0.6, 0.5, S.trim[0], S.trim[1], x, 0.2, z, 24); grCyl(P, r, r, 0.1, c, null, x, 0.47, z, 24, { op: 0.85 }); return { r: r + 1, solid: true }; },
planter: function (P, R, S, x, z, rnd) { grBox(P, 3, 0.9, 3, S.trim[0], S.trim[1], x, 0.45, z); grSph(P, 1.5, 0x4E7A3A, null, x, 1.6, z, 8); return { r: 2, solid: true }; },
tram: function (P, R, S, x, z, rnd) { return __ZC(333, 90, this, arguments, new.target); },
banner: function (P, R, S, x, z, rnd) { grCyl(P, 0.12, 0.14, 9, 0x5A5A5A, "metal", x, 4.5, z, 6); grBox(P, 2.4, 4.4, 0.06, S.accent, null, x + 1.25, 6.4, z); return { r: 1, solid: true }; },
mirror: function (P, R, S, x, z, rnd) { grBox(P, 3, 5, 0.3, 0x9AA2AE, null, x, 2.9, z, rnd() * 6, { glow: true }); grBox(P, 3.6, 0.4, 1, S.trim[0], S.trim[1], x, 0.2, z); return { r: 2.2, solid: true }; },
stones: function (P, R, S, x, z, rnd) { for (var i = 0; i < 6; i++) {
var a = i / 6 * Math.PI * 2, h = 3 + rnd() * 2;
grBox(P, 1.2, h, 0.8, (R.env && R.env.rock) || 0x6A665E, "stone", x + Math.cos(a) * 5, h / 2, z + Math.sin(a) * 5, a);
} return { r: 6, solid: false }; },
well: function (P, R, S, x, z, rnd) { grCyl(P, 1.8, 1.9, 1, S.trim[0], S.trim[1], x, 0.5, z, 14); grCyl(P, 1.5, 1.5, 0.1, 0x3A5A6A, null, x, 0.95, z, 14); [-1, 1].forEach(function (sd) { grBox(P, 0.25, 3, 0.25, 0x5A3E26, "wood", x + sd * 1.6, 1.5, z); }); grRoof(P, 4, 1.4, 3, S.roof[0], S.roof[1], x, 3, z); return { r: 2.2, solid: true }; },
sails: function (P, R, S, x, z, rnd) { var y = -2 - rnd() * 10; grCyl(P, 0.2, 0.2, 16, 0x6A5A4A, "wood", x, y + 8, z, 6); var sl = grBox(P, 0.08, 10, 7, 0xE8E0D0, null, x, y + 10, z + 0.2); sl.rotation.y = rnd() * 1.5; return { r: 0, solid: false, sky: true }; }
};
function grDecorate(G, P, R, S) { return __ZC(333, 91, this, arguments, new.target); }
var GR_KIT_DECOR = { palm: ["palm", 1], pine: ["pine", 1], tree: ["tree", 1], deadtree: ["deadtree", 1], mushroom: ["giantmushroom", 1], cactus: ["cactus", 1], spire: ["crystalspire", 0.8],
worldtree: ["worldtree", 0.3], stall: ["marketstall", 1], windmill: ["windmill", 0.8], tentkit: ["tent", 1], cannon: ["cannon", 1], trebuchet: ["trebuchet", 0.9], grave: ["grave", 1], tomb: ["tomb", 0.8],
runestone: ["runestone", 1], hedge: ["hedge", 1], bush: ["bush", 1], reeds: ["reeds", 1], geyser: ["geyser", 0.8], lighthouse: ["lighthouse", 0.6], scarecrow: ["scarecrow", 1], glowflowers: ["glowflowers", 1],
standing: ["standingstones", 0.8], fountain: ["fountain", 0.8], balloon: ["hotairballoon", 0.7], ruin: ["ruin", 0.6] };
function grPastime(G, P, R, S) { return __ZC(333, 92, this, arguments, new.target); }
function grDoes(R) { return __ZC(333, 93, this, arguments, new.target); }
function grDoesCard() { return __ZC(333, 94, this, arguments, new.target); }
function grDoesBoard(P, R, S) { return __ZC(333, 95, this, arguments, new.target); }
function grFormMark(B, R, S, b, w, h, d, grand, trim) { return __ZC(333, 96, this, arguments, new.target); }
var GR_IN = { wood: 0x6A4630, woodHi: 0x7C5639, woodLo: 0x4A3020, gold: 0xB8963E, sky: 0xC6D6E4, atlas: null, mat: null };
function grPicAtlas() { return __ZC(333, 97, this, arguments, new.target); }
function grPicQuad(L, x, y, z, nx, nz, w, h, cell) { L.push([x, y, z, nx, nz, w, h, cell & 7]); }
function grPicMesh(L) { return __ZC(333, 98, this, arguments, new.target); }
(function () {
if (typeof FURN === "undefined" || typeof FURN.painting !== "function")
return;
var old = FURN.painting, n = 0;
FURN.painting = function () {
try {
grPicAtlas();
var g = new THREE.Group(), cell = (n++) * 5 % 8;
var fr = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.8, 0.05), new THREE.MeshLambertMaterial({ color: GR_IN.gold }));
fr.position.set(0, 1.7, 0);
g.add(fr);
var lip = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.7, 0.06), new THREE.MeshLambertMaterial({ color: 0x7A5A24 }));
lip.position.set(0, 1.7, 0.005);
g.add(lip);
var L = [];
grPicQuad(L, 0, 1.7, 0.04, 0, 1, 0.95, 0.65, cell);
g.add(grPicMesh(L));
return g;
}
catch (e) {
return old();
}
};
})();
function grStrip(P, ax, f, nrm, a0, a1, y, h, dep, o, col, tx) {
var len = a1 - a0;
if (len < 0.05)
return;
var mid = (a0 + a1) / 2, off = f + nrm * (o + dep / 2);
if (ax === "x")
grBox(P, len, h, dep, col, tx, mid, y, off);
else
grBox(P, dep, h, len, col, tx, off, y, mid);
}
function grDado(P, ax, f, nrm, a0, a1, gaps, lite, D) { return __ZC(333, 99, this, arguments, new.target); }
function grCornice(P, ax, f, nrm, a0, a1, H, col) {
grStrip(P, ax, f, nrm, a0, a1, H - 0.05, 0.1, 0.24, 0, col, "plaster");
grStrip(P, ax, f, nrm, a0, a1, H - 0.16, 0.12, 0.14, 0, col, "plaster");
grStrip(P, ax, f, nrm, a0, a1, H - 0.26, 0.06, 0.07, 0, col, "plaster");
}
function grDoorCase(P, ax, f, nrm, c, w, h, col) {
grStrip(P, ax, f, nrm, c - w / 2 - 0.16, c - w / 2, h / 2, h, 0.08, 0, col, "wood");
grStrip(P, ax, f, nrm, c + w / 2, c + w / 2 + 0.16, h / 2, h, 0.08, 0, col, "wood");
grStrip(P, ax, f, nrm, c - w / 2 - 0.16, c + w / 2 + 0.16, h + 0.1, 0.2, 0.08, 0, col, "wood");
grStrip(P, ax, f, nrm, c - w / 2 - 0.3, c + w / 2 + 0.3, h + 0.26, 0.12, 0.16, 0, col, "wood");
}
function grWindow(P, ax, f, nrm, c, y0, w, h, curt, lite) { return __ZC(333, 100, this, arguments, new.target); }
function grPicture(P, L, ax, f, nrm, c, y, w, h, cell) {
grStrip(P, ax, f, nrm, c - w / 2 - 0.08, c + w / 2 + 0.08, y, h + 0.16, 0.05, 0, GR_IN.gold, null);
var x = ax === "x" ? c : f + nrm * 0.056, z = ax === "x" ? f + nrm * 0.056 : c;
grPicQuad(L, x, y, z, ax === "x" ? 0 : nrm, ax === "x" ? nrm : 0, w, h, cell);
}
function grDadoKind(S, wallT) {
if (wallT === "metal")
return { c: S.trim[0], hi: new THREE.Color(S.trim[0]).multiplyScalar(1.12).getHex(), lo: new THREE.Color(S.trim[0]).multiplyScalar(0.7).getHex(), t: "metal" };
return { c: GR_IN.wood, hi: GR_IN.woodHi, lo: GR_IN.woodLo, t: "wood" };
}
function grDressRoom(P, G, I, S, r, pl, X0, Z0, RH, wallT) { return __ZC(333, 101, this, arguments, new.target); }
function grDressHall(P, I, S, pl, X0, Z0, W, DD, HH, RH, wallT) { return __ZC(333, 102, this, arguments, new.target); }
var GR_PAVED = [];
(function () {
var r0 = grPaveRect, d0 = grPaveDisc;
grPaveRect = function (P, R, S, x0, x1, z0, z1, y) { GR_PAVED.push({ x0: Math.min(x0, x1), x1: Math.max(x0, x1), z0: Math.min(z0, z1), z1: Math.max(z0, z1) }); return r0.apply(this, arguments); };
grPaveDisc = function (P, R, S, x, z, r, y) { GR_PAVED.push({ x: x, z: z, r: r }); return d0.apply(this, arguments); };
var b0 = grBuildOutside;
grBuildOutside = function (G, R) { GR_PAVED = []; var out = b0.apply(this, arguments); try {
grMeadow(G, R);
}
catch (e) {
if (window.console)
console.warn("[grand] ground", e);
} return out; };
})();
function grMeadowKind(R) { return __ZC(333, 103, this, arguments, new.target); }
function grMeadow(G, R) { return __ZC(333, 104, this, arguments, new.target); }
grRealm({ id: "moon", parent: { w: "surface", sub: "moon" }, parentName: "the Moon", name: "Mare Haven", short: "Mare Haven",
blurb: "the domed city of the Moon, under glass in the Sea of Tranquillity",
intro: "A city under a great glass dome on the grey plain, Earth hanging blue in the black sky above it. The Grand Concourse runs north to the Hall of the Lunar Compact on its terraces.",
style: "future", layout: "dome", gravity: 1.62, tone: 520, gateCol: 0xBFE0FF,
env: { top: 0x000000, low: 0x05070C, fog: 0x05070C, fogD: 0.0004, sun: 1.0, sunCol: 0xFFFFFF, sunDir: [0.62, 0.3, -0.4], hemi: 0.55, hemiCol: 0xB8C4D8, hemiGround: 0x3A3834, stars: 1, groundCol: 0x6E6A64, groundCol2: 0x9A968E, groundTex: "concrete", mtn: 0x7A766E, mtnTex: "concrete" },
gate: { n: "The Haven Lock", d: "the airlock tunnel to the domed city", back: "The Haven Lock" },
warden: ["Odile Varga", "Lockmaster of the Haven Lock", "the lockmaster who cycles every traveller through the great airlock and knows every street of the dome"],
names: ["Odile", "Tariq", "Mei", "Bastian", "Ngozi", "Iker", "Sunniva", "Rafe", "Lior", "Anouk", "Kofi", "Petra", "Ilse", "Joaquin", "Yara", "Teodor"],
surnames: ["Varga", "Okonjo", "Lindqvist", "Halloran", "Sato", "Mbeki", "Duarte", "Novak", "Fairweather", "Castell", "Arendt", "Quill"],
citizenTitles: ["Dome resident", "Regolith engineer", "Visiting scientist", "Ice trader", "Space Corp officer"], guardTitle: "Compact guard",
plaza: { n: "Earthrise Plaza", d: "where the whole city gathers under the blue Earth", heart: "orrery" }, avenue: { n: "The Grand Concourse" },
palace: { t: "palace", n: "The Hall of the Lunar Compact", d: "the council that governs every settlement on the Moon", hall: "The Chamber of the Compact",
seat: ["throne", "The Speaker's Chair", 0],
staff: [["Speaker Amara Okonjo", "Speaker of the Lunar Compact", "the elected Speaker of the council of the Moon's settlements, calm, wise and proud of the dome"], ["Teodor Lindqvist", "Clerk of the Compact"], ["Mei Sato", "Keeper of the Charter"]],
rooms: [["council", "The Council of Settlements", 1], ["banquet", "The Earthlight Banqueting Hall", 0], ["suite", "The Speaker's Residence", 1], ["treasury", "The Lunar Treasury", 1], ["gallery", "The Gallery of the Landings", 0],
["library", "The Charter Library", 0], ["kitchen", "The Compact Kitchens", 1], ["armoury", "The Compact Guard Room", 1], ["office", "The Office of Water and Air", 1], ["lounge", "The Delegates' Salon", 0], ["map", "The Survey Office", 0], ["suite", "The Visiting Delegates' Rooms", 0]] },
wards: [
{ t: "academy", n: "The Lunar Academy", d: "engineering, geology and the science of living on the Moon", staff: [["Dean Ilse Arendt", "Dean of the Academy", "the dean, a geologist who has walked every mare on the near side"]] },
{ t: "guild", n: "The Regolith Builders' Guild", d: "who print and sinter the city's walls from moon dust" },
{ t: "library", n: "The Archive of the First Footprints", d: "every landing, every crew, every step" },
{ t: "market", n: "The Tranquillity Exchange", d: "ice, oxygen, metals and greenhouse food traded" },
{ t: "hospital", n: "Mare Haven Infirmary", d: "low-gravity medicine and the bone clinic" },
{ t: "barracks", n: "Space Corp Lunar Command", d: "the Corp's watch over the Moon's settlements" },
{ t: "theatre", n: "The Earthrise Theatre", d: "plays, music and the city's night lectures" },
{ t: "observatory", n: "The Far Side Observatory Office", d: "radio astronomy from the quiet side of the Moon" }
],
arena: { n: "The Low-Gravity Field", d: "run the drill in one sixth of Earth's gravity", about: "Six posts stand round the field. Run to each as it lights gold; in the Moon's gravity every stride carries you far." },
homes: { n: "Habitat Row", d: "pressurised homes of the dome's people" },
tunnel: { n: "The Shackleton Tube", kind: "tube" },
deep: { n: "The Helium Fields", d: "the mines, ice works, farms and spaceyard under the second dome", heart: "obelisk",
b: [{ t: "mine", n: "The Ilmenite Mine", d: "black sand dug for iron, titanium and oxygen" }, { t: "workshop", n: "The Ice Works", d: "polar ice melted into water and split into air" }, { t: "farm", n: "The Hydroponic Farms", d: "greens and potatoes grown in water under lamps" }, { t: "hangar", n: "The Lunar Spaceyard", d: "landers, crawlers and the polar shuttle" }],
gather: [{ k: "ow_mo_ilmenite", n: "An ilmenite seam", v: "dig the black sand", look: "ore" }, { k: "ow_mo_regolith", n: "Loose mare regolith", v: "scoop the regolith", look: "coal" }, { k: "ow_mo_anorth", n: "Highland anorthosite", v: "chip off the pale rock", look: "ice" }, { k: "ow_mo_ice", n: "Polar ice in the cold store", v: "take a core of ice", look: "ice" }] },
trade: { say: "The Exchange buys what is mined in the Helium Fields and sells the city's own goods.", sells: ["cr_glass", "cr_parts", "cr_cloth"], buys: ["ow_mo_ilmenite", "ow_mo_regolith", "ow_mo_anorth", "ow_mo_ice", "ow_mo_oxygen", "ow_mo_brick", "cr_ore"] },
lore: [["The founding of Mare Haven", "The first dome went up beside Tranquillity Outpost when the settlers learned to sinter moon dust into brick. Each ring of the dome was raised by the Regolith Builders, and the city grew until it filled the crater floor."],
["The Lunar Compact", "Every settlement on the Moon sends a delegate to the Compact, which meets in the Hall on the terraces. It shares out water and air first, and argues about everything else after."],
["Why a dome", "The Moon has no air to breathe and none to block the Sun's harshest light. The glass of the dome is thick, layered and backed by water, so the city is safe under it."],
["The Helium Fields", "Out through the Shackleton Tube lie the mines. Ilmenite sand gives oxygen when it is heated with hydrogen; the polar ice gives water; and helium-3, rare on Earth, lies in the dust."],
["The real Moon", "Twelve people walked on the Moon between 1969 and 1972, on the Apollo missions. With no wind or rain, their footprints are still there."],
["Earthrise", "From the near side, Earth never rises or sets: it hangs in nearly the same place in the sky, going through phases like the Moon does from Earth."]],
lectures: [{ t: "Gravity on the Moon", x: "The Moon's gravity is about one sixth of Earth's, 1.62 metres per second squared. A person who can jump half a metre on Earth can jump about three metres here.", q: ["How strong is the Moon's gravity, compared with Earth's?", ["About one sixth", "About half", "The same"], 0] },
{ t: "Making air from rock", x: "Ilmenite is a mineral of iron, titanium and oxygen. Heated with hydrogen, it gives up its oxygen as water, which can be split into oxygen to breathe and hydrogen to use again.", q: ["What can be made from ilmenite?", ["Oxygen", "Gold", "Salt"], 0] },
{ t: "Ice in the dark", x: "Near the Moon's poles are craters whose floors the Sun never reaches. They stay far below freezing, and spacecraft have found signs of water ice there.", q: ["Where is the Moon's ice found?", ["In craters the Sun never reaches", "On the equator", "Inside volcanoes"], 0] },
{ t: "Why the sky is black", x: "The Moon has almost no air, so nothing scatters sunlight across the sky. Even at midday the sky is black and the stars are there; the Sun's glare just makes them hard to see.", q: ["Why is the Moon's sky black by day?", ["There is almost no air to scatter light", "The Sun is too far", "The dome is tinted"], 0] },
{ t: "One face to Earth", x: "The Moon turns once on its axis for every trip round Earth, so it always shows us the same face. We call this tidal locking.", q: ["Why do we always see the same side of the Moon?", ["It is tidally locked", "It does not spin", "Earth blocks the other side"], 0] }],
persona: "Mare Haven is a domed city on the Moon, run by the Lunar Compact, a council of the Moon's settlements; the Space Corp keeps watch there. Real lunar science is welcome."
});
grRealm({ id: "mars", parent: { w: "surface", sub: "mars" }, parentName: "Mars", name: "New Jezero", short: "New Jezero",
blurb: "the red city of Mars, terraced into the crater wall above the old river delta",
intro: "Under a ribbed dome on the butterscotch plain, the red stone city climbs on terraces to the Citadel of the Settlers' Assembly. The canal of melted ice runs down the Avenue of the Delta.",
style: "desert", layout: "dome", gravity: 3.71, tone: 470, gateCol: 0xFFD0A0,
env: { top: 0xC8A078, low: 0xE0B890, fog: 0xD8A880, fogD: 0.0011, sun: 0.85, sunCol: 0xFFE8D0, sunDir: [0.5, 0.45, -0.6], hemi: 0.65, hemiCol: 0xE8B890, hemiGround: 0x6A3A22, groundCol: 0x8A3E22, groundCol2: 0xC06A40, groundTex: "sand", mtn: 0x9A4A2A, mtnTex: "sand" },
gate: { n: "The Red Gate", d: "the pressure gate of the red city", back: "The Red Gate" },
warden: ["Hamza Reyes", "Keeper of the Red Gate", "the keeper of the great pressure gate, who has lived on Mars for twenty years and loves its blue sunsets"],
names: ["Hamza", "Ines", "Oskar", "Talia", "Desmond", "Priyanka", "Leif", "Zara", "Matteo", "Amaya", "Rune", "Celeste", "Bram", "Nadia", "Ezra", "Saoirse"],
surnames: ["Reyes", "Okafor", "Brandt", "Kaur", "Moreau", "Haldane", "Ito", "Voss", "Achebe", "Lund", "Carvalho", "Petrov"],
citizenTitles: ["Settler", "Greenhouse grower", "Dust engineer", "Convoy driver", "Rover pilot"], guardTitle: "Assembly guard",
plaza: { n: "The Delta Plaza", d: "where the ice canal pools under the dome", heart: "fountain" }, avenue: { n: "The Avenue of the Delta" },
palace: { t: "palace", n: "The Citadel of the Settlers' Assembly", d: "where the settlers of Mars govern themselves", hall: "The Assembly Floor", seat: ["throne", "The First Settler's Seat", 0],
staff: [["First Settler Celeste Moreau", "First Settler of the Assembly", "the elected leader of the Settlers' Assembly, practical, proud and tireless"], ["Rune Lund", "Assembly secretary"], ["Talia Kaur", "Steward of the Citadel"]] },
wards: [
{ t: "academy", n: "The Ares College", d: "terraforming, geology and the hard science of Mars" },
{ t: "guild", n: "The Guild of Dome-Wrights", d: "who raise and mend the pressure domes" },
{ t: "temple", n: "The Hall of First Light", d: "a quiet hall where settlers remember Earth" },
{ t: "market", n: "The Red Bazaar", d: "water, soil, metals and food traded across Mars" },
{ t: "hospital", n: "The Olympus Clinic", d: "medicine for bodies living in thin air and low gravity" },
{ t: "barracks", n: "The Dust Watch", d: "storm wardens and the Corp's Mars patrol" },
{ t: "library", n: "The Library of the Rovers", d: "the records of every machine that explored Mars first" },
{ t: "inn", n: "The Blue Sunset Inn", d: "rooms and meals for the convoy crews" }
],
arena: { n: "The Canyon Run", d: "the settlers' training ground", about: "Six posts stand round the ground. Run to each as it lights gold. In Mars's gravity, about two fifths of Earth's, you are light on your feet." },
homes: { n: "The Terraces of Home", d: "red stone homes of the settlers" },
tunnel: { n: "The Valles Tunnel", kind: "tunnel" },
deep: { n: "The Delta Works", d: "the mines, the clay pits, the oxygen works and the greenhouse farms", heart: "obelisk",
b: [{ t: "mine", n: "The Basalt Mine", d: "dark rock cut for iron and building stone" }, { t: "workshop", n: "The Oxygen Works", d: "air split from the carbon dioxide sky" }, { t: "farm", n: "The Delta Greenhouses", d: "potatoes and greens grown in washed soil" }, { t: "dock", n: "The Ice Convoy Depot", d: "where the ice crawlers come in from the north" }],
gather: [{ k: "ow_ma_basalt", n: "A basalt face", v: "cut basalt", look: "ore" }, { k: "ow_ma_clay", n: "The delta clay pit", v: "dig clay", look: "coal" }, { k: "ow_ma_ice", n: "Convoy ice on the dock", v: "take a block of ice", look: "ice" }, { k: "ow_ma_o2", n: "The oxygen works' filling bay", v: "fill a canister", look: "gas" }] },
trade: { say: "The Red Bazaar buys what the Delta Works bring in and sells the city's goods.", sells: ["cr_glass", "cr_parts", "cr_cloth", "cr_leather"], buys: ["ow_ma_basalt", "ow_ma_clay", "ow_ma_ice", "ow_ma_o2", "ow_ma_soil", "cr_ore"] },
lore: [["The founding of New Jezero", "The first settlers came down beside the old river delta, where water once ran. They cut their homes into the crater wall for shelter from radiation, then raised the domes over the terraces."],
["The Settlers' Assembly", "Every settler has a voice in the Assembly. It meets in the Citadel at the top of the terraces, and its first duty is the water."],
["The Dust Watch", "Martian dust storms can grow to cover the whole planet. The Dust Watch reads the sky and warns the city to close its vents."],
["The ice canal", "Ice brought by convoy from the northern slopes is melted and runs down the Avenue of the Delta in a stone channel before it is cleaned and stored."],
["The real Jezero", "Jezero Crater held a lake about 3.5 billion years ago. NASA's Perseverance rover has explored its delta since 2021, collecting rock samples."],
["Blue sunsets", "On Mars the sky is butterscotch by day, but sunsets are blue: the fine dust scatters blue light near the Sun."]],
lectures: [{ t: "A day on Mars", x: "A Martian day, called a sol, is 24 hours and 37 minutes: almost the same as Earth's. A Martian year is 687 Earth days.", q: ["How long is a sol, a day on Mars?", ["About 24 hours 37 minutes", "About 10 hours", "About 30 days"], 0] },
{ t: "Why Mars is red", x: "Mars's dust is rich in iron oxide, rust. Fine red dust blown about in the thin air coats everything and tints the sky.", q: ["What makes Mars red?", ["Iron oxide in its dust", "Red plants", "Volcanoes"], 0] },
{ t: "Oxygen from the air", x: "The air of Mars is about 95% carbon dioxide. In 2021 the MOXIE experiment aboard Perseverance made oxygen from it, splitting carbon dioxide at about 800 degrees Celsius.", q: ["What did MOXIE make on Mars?", ["Oxygen from carbon dioxide", "Water from ice", "Fuel from sand"], 0] },
{ t: "The great volcano", x: "Olympus Mons on Mars is the largest volcano in the Solar System, about 22 kilometres high.", q: ["How tall is Olympus Mons?", ["About 22 km", "About 2 km", "About 200 km"], 0] }],
persona: "New Jezero is a domed and terraced city on Mars governed by the Settlers' Assembly. Real Mars science is welcome."
});
grRealm({ id: "mercury", parent: { w: "surface", sub: "mercury" }, parentName: "Mercury", name: "Caloris Deep", short: "Caloris",
blurb: "the buried city of Mercury, cut deep into the rock under the Caloris rim, out of the furious Sun",
intro: "Far below the scorched rim, a great cavern city glows with cool light. The Sun burns three times wider above, but down here the halls are cool and green with gardens.",
style: "station", layout: "cavern", gravity: 3.7, tone: 440, gateCol: 0xFFE8B0,
env: { top: 0x0A0806, low: 0x1A1612, fog: 0x1A1612, fogD: 0.004, sun: 0.35, sunCol: 0xFFE8C8, sunDir: [0.2, 1, 0.1], hemi: 0.95, hemiCol: 0xE8E0D0, hemiGround: 0x3A342C, groundCol: 0x56504A, groundCol2: 0x8A827A, groundTex: "concrete", rock: 0x4E4842, roof: 64, glowCol: 0xFFE0A0, glowKit: "crystalspire" },
gate: { n: "The Shade Gate", d: "the shaft down into the cool city", back: "The Shade Gate" },
warden: ["Ravi Anand", "Warden of the Shade Gate", "the warden of the shaft into Caloris Deep, who never tires of telling visitors how hot it is up top"],
names: ["Ravi", "Esme", "Kwame", "Linnea", "Arjun", "Solveig", "Dario", "Femi", "Hana", "Tobias", "Nima", "Greta"],
surnames: ["Anand", "Sorensen", "Adeyemi", "Holt", "Marchetti", "Takeda", "Brennan", "Osei", "Falk", "Ivanova"],
citizenTitles: ["Deep resident", "Heat engineer", "Solar farmer", "Ore hauler", "Visiting physicist"], guardTitle: "Deep warden",
plaza: { n: "The Cool Court", d: "the city's green heart, far below the burning plain", heart: "tree" }, avenue: { n: "The Long Shade" },
palace: { t: "hall", n: "The Hall of the Shade Council", d: "where Caloris Deep is governed", big: true, staff: [["Councillor Esme Sorensen", "Chair of the Shade Council", "the chair of the council that runs Caloris Deep, sharp, funny and fiercely protective of the cool"]] },
wards: [
{ t: "academy", n: "The Caloris Institute", d: "the physics of the Sun, heat and light" },
{ t: "lab", n: "The Solar Laboratory", d: "studying the Sun from the closest world to it" },
{ t: "market", n: "The Graphite Exchange", d: "graphite, sulphur and power cells traded" },
{ t: "hospital", n: "The Deep Infirmary", d: "medicine far from the Sun's radiation" },
{ t: "barracks", n: "Space Corp Caloris Station", d: "the Corp's watch on Mercury" },
{ t: "guild", n: "The Guild of Heat-Wrights", d: "who carry the heat away so the city stays cool" },
{ t: "bath", n: "The Cold Springs", d: "pools fed by the city's cooling water" },
{ t: "library", n: "The MESSENGER Library", d: "maps of every crater and hollow" }
],
arena: { n: "The Shade Court", d: "the deep wardens' training ground" },
homes: { n: "The Cool Rows", d: "homes cut into the cavern wall" },
tunnel: { n: "The Graphite Bore", kind: "tunnel" },
deep: { n: "The Sun Fields Works", d: "graphite mines, the sulphur hollows and the power works", heart: "flame",
b: [{ t: "mine", n: "The Graphite Mine", d: "the dark rock that makes Mercury dark" }, { t: "workshop", n: "The Cell Works", d: "power cells charged in the fierce sunlight above" }, { t: "forge", n: "The Caloris Smelter", d: "metal smelted with the Sun's own heat" }, { t: "farm", n: "The Lamp Gardens", d: "food grown under lamps in the cool" }],
gather: [{ k: "ow_hg_graphite", n: "A graphite seam", v: "cut graphite", look: "coal" }, { k: "ow_hg_hollow", n: "Hollow-floor dust", v: "scoop the bright dust", look: "crystal" }, { k: "ow_hg_cell", n: "The cell racks", v: "take a charged cell", look: "gas" }, { k: "cr_ore", n: "An iron vein", v: "dig ore", look: "ore" }] },
trade: { say: "The Exchange buys what the Sun Fields bring in.", sells: ["cr_coal", "cr_parts", "cr_glass"], buys: ["ow_hg_graphite", "ow_hg_hollow", "ow_hg_cell", "cr_ore"] },
lore: [["Why the city is buried", "On Mercury's day side the ground reaches about 430 °C; on the night side it falls to −180 °C. A few metres of rock keep a steady, gentle temperature, so the city was built deep."],
["The Shade Council", "Caloris Deep is run by the Shade Council, which meets in the Hall at the top of the terraces. Its first rule: carry the heat away."],
["The Caloris Basin", "The basin above the city is one of the biggest impact craters in the Solar System, about 1,500 km across."],
["The dark world", "MESSENGER found that much of Mercury's darkness comes from carbon, as graphite, in its rock."],
["Ice near the Sun", "Even this close to the Sun there is water ice, in polar craters whose floors are always in shadow."],
["A long day", "One day on Mercury, sunrise to sunrise, lasts 176 Earth days, while its year lasts only 88."]],
lectures: [{ t: "Hot and cold", x: "Mercury has almost no air to hold heat. Its day side reaches about 430 °C, and its night side drops to about −180 °C.", q: ["Why do Mercury's nights get so cold?", ["It has almost no air to hold heat", "It is far from the Sun", "It has oceans"], 0] },
{ t: "Days longer than years", x: "Mercury goes round the Sun in 88 Earth days, but from sunrise to sunrise one day lasts 176 Earth days: two of its years.", q: ["How long is a year on Mercury?", ["88 Earth days", "365 days", "176 days"], 0] },
{ t: "The closest planet", x: "Mercury is the smallest planet and the closest to the Sun, about 58 million kilometres away on average. From its surface the Sun looks about three times as wide as from Earth.", q: ["How big does the Sun look from Mercury?", ["About three times as wide as from Earth", "The same size", "Smaller"], 0] }],
persona: "Caloris Deep is a city cut deep under the Caloris rim on Mercury, run by the Shade Council. Real science about Mercury and the Sun is welcome."
});
grRealm({ id: "venus", parent: { w: "surface", sub: "venus" }, parentName: "Venus", name: "Aphelia", short: "Aphelia",
blurb: "the floating city of Venus, riding the clouds fifty kilometres up, where the air is mild",
intro: "Above the crushing heat, the floating city rides the golden clouds on great lift-rings. Bridges join its platforms; the Palace of the Cloud Regency floats highest of all.",
style: "classical", layout: "isles", tone: 460, gateCol: 0xFFE0A0,
env: { top: 0xC8902A, low: 0xF0D080, fog: 0xE8C070, fogD: 0.0009, sun: 0.75, sunCol: 0xFFE0A0, sunDir: [0.3, 0.8, -0.2], hemi: 0.9, hemiCol: 0xF0C870, hemiGround: 0x8A6A3A, cloud: 0xF0D898, cloud2: 0xC8984A },
gate: { n: "The Sky Lift", d: "the lift up through the clouds to the floating city", back: "The Sky Lift" },
warden: ["Lucia Ferrante", "Liftmistress of the Sky Lift", "the liftmistress who runs the great lift up from the burning ground to the floating city"],
names: ["Lucia", "Aurelio", "Seren", "Cassius", "Elif", "Marius", "Ondine", "Valerian", "Isadora", "Thea", "Lorenzo", "Phoebe"],
surnames: ["Ferrante", "Castellan", "Moreno", "Aldous", "Vance", "Delacroix", "Serrano", "Whitlock", "Amari", "Rossi"],
citizenTitles: ["Cloud citizen", "Lift-ring engineer", "Acid-harvester", "Cloud-sailor", "Visiting climatologist"], guardTitle: "Regency guard",
plaza: { n: "The Golden Platform", d: "the city's great square, open to the clouds", heart: "fountain" }, avenue: { n: "The Bridge of Dawn" },
palace: { t: "palace", n: "The Palace of the Cloud Regency", d: "the regents who keep the city aloft", hall: "The Hall of Winds", seat: ["throne", "The Regent's Throne", 0],
staff: [["Regent Isadora Vance", "Regent of Aphelia", "the Regent of the floating city, gracious and sharp-eyed, who never forgets the furnace below"]] },
wards: [
{ t: "academy", n: "The Academy of the Clouds", d: "atmosphere, chemistry and the science of floating" },
{ t: "guild", n: "The Guild of Lift-Wrights", d: "who keep the lift-rings full and the city aloft" },
{ t: "temple", n: "The Temple of the Morning Star", d: "a hall of quiet above the clouds" },
{ t: "market", n: "The Cloud Exchange", d: "rock, salvage and the city's goods traded" },
{ t: "hospital", n: "The Hospital of the High Air", d: "healers of the floating city" },
{ t: "barracks", n: "The Regency Guard", d: "the city's guard and its sky-sailors" },
{ t: "theatre", n: "The Theatre of Gold", d: "music and plays in the golden light" },
{ t: "bath", n: "The Mist Baths", d: "warm baths of condensed cloud-water" }
],
arena: { n: "The Wind Court", d: "training on the open platform" },
homes: { n: "The Garden Platforms", d: "homes on their own floating gardens" },
tunnel: { n: "The Long Bridge", kind: "bridge" },
deep: { n: "The Harvest Platforms", d: "where the robot rigs bring up rock and salvage from the burning ground", heart: "obelisk",
b: [{ t: "workshop", n: "The Rig Works", d: "the robot drills that work the plains below" }, { t: "dock", n: "The Cloud Docks", d: "where the cloud-ships moor" }, { t: "lab", n: "The Acid Laboratory", d: "turning the cloud's acid into useful chemicals" }, { t: "farm", n: "The Hanging Gardens", d: "food grown in the warm, bright air" }],
gather: [{ k: "ow_ve_basalt", n: "Rig cores, just hauled up", v: "take a basalt core", look: "ore" }, { k: "ow_ve_tessera", n: "Tessera samples", v: "take a sample", look: "coal" }, { k: "ow_ve_salvage", n: "Probe salvage", v: "sort the salvage", look: "gas" }, { k: "cr_glass", n: "The glassmakers' offcuts", v: "gather glass", look: "crystal" }] },
trade: { say: "The Cloud Exchange buys what the rigs bring up.", sells: ["cr_cloth", "cr_glass", "cr_parts"], buys: ["ow_ve_basalt", "ow_ve_tessera", "ow_ve_salvage", "cr_glass"] },
lore: [["Why the city floats", "On the ground Venus is about 465 °C under air 92 times as heavy as Earth's. About 50 km up, the pressure and the temperature are close to Earth's at sea level, so the city floats there."],
["Lift-rings", "Ordinary breathable air is lighter than the carbon dioxide of Venus, so a ring full of it floats, as helium does on Earth."],
["The Cloud Regency", "The city is governed by a Regent and her council from the Palace that floats highest."],
["The morning star", "Venus is the brightest planet in Earth's sky, seen near dawn or dusk; people long called it the morning and evening star."],
["Backwards", "Venus spins backwards: from its surface the Sun would rise in the west and set in the east."],
["The acid clouds", "Venus's clouds are made of sulphuric acid. The city's harvesters turn it into useful chemicals."]],
lectures: [{ t: "The hottest planet", x: "Venus is about 465 °C at the surface, hotter than Mercury, because its thick carbon dioxide air traps heat: a runaway greenhouse effect.", q: ["Why is Venus hotter than Mercury?", ["Its thick air traps heat", "It is closer to the Sun", "Its core is bigger"], 0] },
{ t: "Floating cities", x: "About 50 km above Venus's surface, the pressure is about the same as Earth's at sea level and the temperature is mild. Scientists have suggested floating habitats there.", q: ["At what height is Venus's air like Earth's?", ["About 50 km up", "On the ground", "About 500 km up"], 0] },
{ t: "A long day", x: "Venus takes 243 Earth days to turn once on its axis, longer than its year of 225 Earth days.", q: ["Which is longer on Venus?", ["Its turn on its axis", "Its year", "They are the same"], 0] }],
persona: "Aphelia is a city floating in the clouds of Venus, governed by the Cloud Regency. Real Venus science is welcome."
});
grRealm({ id: "pluto", parent: { w: "surface", sub: "pluto" }, parentName: "Pluto", name: "Tombaugh Halls", short: "Tombaugh",
blurb: "the ice-carved city of Pluto, hollowed out of the water-ice mountains beside the heart",
intro: "Halls carved from ice as hard as granite, lit soft blue. The Hall of the Far Wardens stands at the top of the frozen terraces; the Sun is only a bright star far above.",
style: "ice", layout: "cavern", gravity: 0.62, tone: 400, gateCol: 0xCFE8FF,
env: { top: 0x0A1018, low: 0x18202E, fog: 0x18202E, fogD: 0.003, sun: 0.4, sunCol: 0xFFF0E0, sunDir: [0.3, 1, 0.2], hemi: 0.7, hemiCol: 0xC8D8F0, hemiGround: 0x3A4250, groundCol: 0xC8B8A8, groundCol2: 0xE8E0D8, groundTex: "snow", rock: 0xB8C4D0, roof: 66, glowCol: 0xA8D8FF, glowKit: "crystalspire" },
gate: { n: "The Ice Door", d: "carved into the water-ice mountains", back: "The Ice Door" },
warden: ["Sigrun Halvorsen", "Keeper of the Ice Door", "the keeper of the great door into the ice halls, quiet and patient as the glacier"],
names: ["Sigrun", "Aleksi", "Maren", "Emeka", "Ingrid", "Yusuf", "Freya", "Oren", "Liv", "Casimir", "Annika", "Tomas"],
surnames: ["Halvorsen", "Virtanen", "Eze", "Strand", "Nakamura", "Bergman", "Okoye", "Rask", "Lindahl", "Velde"],
citizenTitles: ["Ice hall resident", "Glacier surveyor", "Tholin chemist", "Ice-cutter", "Visiting astronomer"], guardTitle: "Far Warden",
plaza: { n: "The Heart Court", d: "named for the great pale heart of Pluto", heart: "crystal" }, avenue: { n: "The Nitrogen Way" },
palace: { t: "palace", n: "The Hall of the Far Wardens", d: "keepers of the farthest city of the Sun", hall: "The Hall of the Far Wardens", seat: ["throne", "The Warden's Seat", 0],
staff: [["High Warden Maren Strand", "High Warden of Tombaugh Halls", "the High Warden of the farthest city, steady, warm and proud of the long dark"]] },
wards: [
{ t: "academy", n: "The Tombaugh School", d: "the science of the Kuiper Belt and the far worlds" },
{ t: "observatory", n: "The Charon Observatory", d: "Charon hangs huge above; the stars beyond" },
{ t: "market", n: "The Ice Exchange", d: "ice, tholin and methane frost traded" },
{ t: "hospital", n: "The Warm Rooms", d: "healers of the cold halls" },
{ t: "barracks", n: "Space Corp Far Watch", d: "the Corp's farthest post" },
{ t: "guild", n: "The Guild of Ice-Cutters", d: "who carve the halls from the mountains" },
{ t: "library", n: "The New Horizons Library", d: "the pictures of the 2015 flyby, and all since" },
{ t: "inn", n: "The Long Night Inn", d: "warm rooms at the end of the Solar System" }
],
arena: { n: "The Glide Hall", d: "training in a sixteenth of Earth's gravity" },
homes: { n: "The Ice Rows", d: "homes carved in the walls of the cavern" },
tunnel: { n: "The Glacier Bore", kind: "tunnel" },
deep: { n: "The Sputnik Works", d: "the glacier quarries, tholin pits and methane fields", heart: "crystal",
b: [{ t: "mine", n: "The Ice Quarry", d: "water ice as hard as granite" }, { t: "lab", n: "The Tholin Laboratory", d: "the red-brown stuff of Pluto's dark lands" }, { t: "workshop", n: "The Nitrogen Works", d: "glacier ice melted into air" }, { t: "hangar", n: "The Charon Shuttle Yard", d: "the shuttle to Pluto's great moon" }],
gather: [{ k: "ow_pl_water", n: "Water-ice bedrock", v: "cut a block", look: "ice" }, { k: "ow_pl_n2", n: "Nitrogen ice from the glacier", v: "take nitrogen ice", look: "ice" }, { k: "ow_pl_tholin", n: "A tholin pit", v: "scoop tholin dust", look: "coal" }, { k: "ow_pl_methane", n: "Methane frost", v: "scrape the frost", look: "crystal" }] },
trade: { say: "The Ice Exchange buys what the Sputnik Works bring in.", sells: ["cr_cloth", "cr_parts", "cr_glass"], buys: ["ow_pl_water", "ow_pl_n2", "ow_pl_tholin", "ow_pl_methane"] },
lore: [["The carving of the halls", "Pluto's mountains are water ice, frozen as hard as rock. The Ice-Cutters carved the first hall to shelter from the cold, then another, until a city ran through the mountain."],
["The Far Wardens", "The farthest city of the Sun keeps watch on the Kuiper Belt beyond. Its wardens choose a High Warden every ten years."],
["The heart", "Pluto's great pale heart is Tombaugh Regio; its left side, Sputnik Planitia, is a glacier of frozen nitrogen that slowly churns."],
["Discovery", "Clyde Tombaugh found Pluto in 1930, when he was 24, by comparing photographs of the night sky."],
["New Horizons", "The New Horizons spacecraft flew past Pluto on 14 July 2015 and sent back the first close pictures."],
["Pluto and Charon", "Charon is half Pluto's size. The two swing round a point in the space between them, each always showing the other the same face."]],
lectures: [{ t: "Cold beyond cold", x: "Pluto is about −230 °C. At that cold, nitrogen, methane and carbon monoxide freeze solid, and water ice is as hard as rock.", q: ["What are Pluto's mountains made of?", ["Water ice", "Granite", "Iron"], 0] },
{ t: "A long year", x: "Pluto takes 248 Earth years to go once round the Sun.", q: ["How long is Pluto's year?", ["248 Earth years", "12 Earth years", "1 Earth year"], 0] },
{ t: "A planet or not", x: "Somnucor counts Pluto as the ninth planet. Astronomers have called it a dwarf planet since 2006.", q: ["Since when have astronomers called Pluto a dwarf planet?", ["2006", "1930", "2015"], 0] }],
persona: "Tombaugh Halls is a city carved from the water-ice mountains of Pluto, kept by the Far Wardens. Real Pluto science is welcome."
});
grRealm({ id: "jupiter", parent: { w: "surface", sub: "jupiter" }, parentName: "Jupiter", name: "Vellamar", short: "Vellamar",
blurb: "the floating city of Jupiter, a chain of great cloud stations riding the banded skies",
intro: "Far grander than any single cloud station, Vellamar is a whole city of platforms riding the cream and amber bands, each held up by vast hot-hydrogen lift-domes. Sky-bridges climb from platform to platform to the Palace of the Banded Throne, floating highest of all.",
style: "future", layout: "isles", tone: 420, gateCol: 0xF0C890,
env: { top: 0x8A6440, low: 0xD8B88E, fog: 0xC8A27A, fogD: 0.0010, sun: 0.55, sunCol: 0xFFE8C8, sunDir: [0.35, 0.7, -0.3], hemi: 0.85, hemiCol: 0xE8C89A, hemiGround: 0x7A4A2E, groundCol: 0x8E8A84, groundCol2: 0xB0A89A, groundTex: "floortile", mtn: 0xA8784E, mtnTex: "concrete", cloud: 0xE0CCA8, cloud2: 0xA8683E },
gate: { n: "The Galileo Spire", d: "the lift from the cloud station up into the floating city", back: "The Galileo Spire" },
warden: ["Doran Achterberg", "Spiremaster of the Galileo Spire", "the spiremaster who runs the great lift between Cloud Station Galileo and the city, and who can read a storm band by its colour"],
names: ["Doran", "Liesl", "Kwame", "Marisol", "Tobin", "Anya", "Caspian", "Ruth", "Idris", "Femke", "Soren", "Halima", "Emrys", "Juno", "Rasmus", "Tamsin"],
surnames: ["Achterberg", "Mensah", "Calloway", "Ostrova", "Brightwater", "Delgado", "Hale", "Nakamura", "Oyelaran", "Strand", "Winslow", "Ferro"],
citizenTitles: ["Cloud citizen", "Lift-dome rigger", "Skimmer pilot", "Band forecaster", "Space Corp officer"], guardTitle: "Banded Guard",
plaza: { n: "The Plaza of the Four Moons", d: "the city's great square, where four slow lamps circle a model of the giant", heart: "orrery" }, avenue: { n: "The Equatorial Way" },
palace: { t: "palace", n: "The Palace of the Banded Throne", d: "the seat of the Archon who keeps the city aloft and on course", hall: "The Hall of Bands",
seat: ["throne", "The Archon's Seat", 0],
staff: [["Archon Halima Oyelaran", "Archon of Vellamar", "the elected Archon of the floating city, steady and far-sighted, who has steered it round three great storms"], ["Caspian Ostrova", "Keeper of the Course"], ["Liesl Brightwater", "High Steward of the Lift-Domes"]],
rooms: [["council", "The Council of Platforms", 1], ["banquet", "The Amber Banqueting Hall", 0], ["suite", "The Archon's Apartments", 1], ["treasury", "The Helium Treasury", 1], ["gallery", "The Gallery of the Probes", 0],
["library", "The Library of the Bands", 0], ["kitchen", "The Palace Galleys", 1], ["armoury", "The Banded Guard Room", 1], ["control", "The Helm of the City", 1], ["lounge", "The Envoys' Salon", 0], ["map", "The Storm Chart Room", 0], ["suite", "The Visiting Captains' Rooms", 0]] },
wards: [
{ t: "academy", n: "The Zenith Academy", d: "atmospheric science, flight and the giant planets", staff: [["Provost Emrys Calloway", "Provost of the Academy", "the provost, a cloud physicist who has dropped more probes into Jupiter than anyone alive"]] },
{ t: "guild", n: "The Guild of Lift-Riggers", d: "who keep the hot-hydrogen domes full, warm and sound" },
{ t: "observatory", n: "The Red Eye Observatory", d: "watching the great storm turn, night and day", staff: [["Femke Strand", "Watcher of the Red Eye", "the chief watcher, who has drawn the great storm every day for eleven years"]] },
{ t: "market", n: "The Banded Exchange", d: "hydrogen, helium-3, ammonia and city goods traded" },
{ t: "hospital", n: "The Infirmary of the High Gravity", d: "medicine for bodies under two and a half times Earth's pull" },
{ t: "barracks", n: "The Banded Guard Barracks", d: "the city's guard and its storm-wardens" },
{ t: "theatre", n: "The Theatre of the Turning Storm", d: "plays, music and the great storm on the screen" },
{ t: "embassy", n: "The Hall of the Moons' Envoys", d: "where the stations of Io, Europa, Ganymede and Callisto keep their delegates" }
],
arena: { n: "The Heavyweight Deck", d: "train in Jupiter's crushing pull", about: "Six posts stand round the open deck. Run to each as it lights gold; here every step weighs two and a half times what it does at home, so pace yourself." },
homes: { n: "The Lantern Platforms", d: "homes on small floating platforms, each with its own lift-dome" },
tunnel: { n: "The Long Band Bridge", kind: "bridge" },
deep: { n: "The Skimmer Reach", d: "where the intakes draw in the clouds and the gas is sorted and stored", heart: "obelisk",
b: [{ t: "workshop", n: "The Skimmer Works", d: "the great intakes that drink the cloud" }, { t: "lab", n: "The Cloud Chemistry Hall", d: "sorting hydrogen, helium and ammonia" }, { t: "hangar", n: "The Probe Hangar", d: "where probes are built to fall into the deep" }, { t: "farm", n: "The Amber Glasshouses", d: "food grown under lamps in the dim sunlight" }],
gather: [{ k: "ow_h2", n: "A full skimmer intake", v: "draw off a canister", look: "gas" }, { k: "ow_ju_ammonia", n: "Ammonia frost on the vanes", v: "scrape the white crystals", look: "ice" }, { k: "gr_jupiter_nh4sh", n: "Brown frost from the middle deck", v: "take a sample", look: "crystal" }, { k: "ow_he3", n: "The helium-3 separator", v: "draw a little helium-3", look: "gas" }, { k: "gr_jupiter_probe", n: "A probe recorder caught in the skimmer nets", v: "free the recorder", look: "ore" }] },
trade: { say: "The Banded Exchange buys what the Skimmer Reach draws in and sells the city's own goods.", sells: ["cr_parts", "cr_glass", "ow_ration"], buys: ["ow_h2", "ow_he3", "ow_ju_ammonia", "gr_jupiter_nh4sh", "gr_jupiter_probe", "cr_ore"] },
mats: [{ k: "gr_jupiter_nh4sh", n: "Ammonium hydrosulphide frost", e: "🟤", p: 9 }, { k: "gr_jupiter_probe", n: "Recovered probe recorder", e: "📟", p: 24, rare: 1 }],
lore: [["Why the city floats", "Jupiter has no ground to stand on: it is hydrogen and helium all the way down, growing hotter and denser until the gas turns liquid. Vellamar rides the cloud tops on domes of heated hydrogen, which is lighter than the cold hydrogen around it."],
["From one station to a city", "It began as Cloud Station Galileo, a single platform of the Space Corp. Others moored alongside it, bridges joined them, and over the years the cluster grew into the city of Vellamar."],
["The Archon and the Course", "The city drifts with the wind, so someone must steer. The Archon and the Keeper of the Course choose which band to ride, keeping well clear of the great storms."],
["The colours of the bands", "The white zones are high clouds of ammonia ice. The tan and brown belts lie deeper, where the clouds hold ammonium hydrosulphide, coloured by chemistry still not fully understood."],
["The Great Red Spot", "A storm wider than Earth has been turning in the south of Jupiter for at least a century and a half, and maybe far longer. The Red Eye Observatory has watched it every day since the city was founded."],
["The four moons", "The Hall of the Moons' Envoys keeps delegates from the stations on Io, Europa, Ganymede and Callisto. They argue happily about whose moon is the most remarkable."]],
lectures: [{ t: "The king of the planets", x: "Jupiter has more than twice the mass of all the other planets put together. It is mostly hydrogen and helium, like the Sun.", q: ["What is Jupiter mostly made of?", ["Hydrogen and helium", "Rock and iron", "Water and ice"], 0] },
{ t: "A short day", x: "Jupiter turns once in just under ten hours, the fastest of any planet. The spin stretches its clouds into bands and makes it bulge at the equator.", q: ["How long is a day on Jupiter?", ["Just under ten hours", "About 24 hours", "About a month"], 0] },
{ t: "The Galilean moons", x: "In 1610 Galileo saw four moons circling Jupiter: Io, Europa, Ganymede and Callisto. Ganymede is the largest moon in the Solar System, bigger than the planet Mercury.", q: ["Which is the largest moon in the Solar System?", ["Ganymede", "Our Moon", "Titan"], 0] },
{ t: "Heavy going", x: "At Jupiter's cloud tops gravity is about 24.8 metres per second squared, roughly two and a half times Earth's. Someone who weighs 40 kg at home would feel as heavy as 100 kg there.", q: ["How strong is gravity at Jupiter's cloud tops, compared with Earth's?", ["About two and a half times", "About the same", "About half"], 0] },
{ t: "Hot air, hydrogen style", x: "A balloon floats when the gas inside is lighter than the air outside. Jupiter's air is already hydrogen, the lightest gas, so the only way to float there is to heat hydrogen so it spreads out and becomes lighter still.", q: ["How can a balloon float in Jupiter's air?", ["Fill it with heated hydrogen", "Fill it with cold air", "Fill it with water"], 0] }],
persona: "Vellamar is a floating city in the clouds of Jupiter, grown from the Space Corp's Cloud Station Galileo; it is held up by domes of heated hydrogen, because Jupiter has no surface. It is governed by an elected Archon from the Palace of the Banded Throne, and steered round the great storms. Its people are proud, practical and used to heavy gravity. Real Jupiter science is welcome."
});
grRealm({ id: "saturn", parent: { w: "surface", sub: "saturn" }, parentName: "Saturn", name: "Halcyra", short: "Halcyra",
blurb: "the floating city of Saturn, riding the golden clouds beneath the great rings",
intro: "High in Saturn's pale gold clouds floats Halcyra, its platforms strung on bridges beneath the arch of the rings. Every evening the whole city turns out to watch the rings catch the light above the Ringlight Palace.",
style: "classical", layout: "isles", tone: 440, gateCol: 0xF0E0B0,
env: { top: 0x9A8A64, low: 0xE0D0A4, fog: 0xD4C498, fogD: 0.0009, sun: 0.5, sunCol: 0xFFF0D0, sunDir: [0.4, 0.6, -0.35], hemi: 0.85, hemiCol: 0xF0E0B0, hemiGround: 0x8A7448, groundCol: 0xB4AA98, groundCol2: 0xC6BCA8, groundTex: "marble", mtn: 0xC0A878, mtnTex: "stone", cloud: 0xE4D6AC, cloud2: 0xB89E68 },
gate: { n: "The Cassini Stair", d: "the lift from the cloud station up into the city beneath the rings", back: "The Cassini Stair" },
warden: ["Imogen Trelawny", "Keeper of the Cassini Stair", "the keeper of the lift from Cloud Station Cassini, who knows the name of every ring and every gap between them"],
names: ["Imogen", "Barnaby", "Ottilie", "Kenji", "Rosalind", "Florian", "Esme", "Dario", "Hester", "Lukas", "Mireille", "Augustin", "Wren", "Cyprian", "Della", "Matthias"],
surnames: ["Trelawny", "Okeke", "Vasquez", "Lindgren", "Ashdown", "Morandi", "Tanaka", "Holloway", "Szabo", "Quayle", "Ferreira", "Ambrose"],
citizenTitles: ["Ring citizen", "Ice hauler", "Lift-dome rigger", "Ring surveyor", "Visiting astronomer"], guardTitle: "Ringlight guard",
plaza: { n: "The Plaza of the Rings", d: "the great open square beneath the rings, where the city gathers at ringrise", heart: "orrery" }, avenue: { n: "The Promenade of Gaps" },
palace: { t: "palace", n: "The Ringlight Palace", d: "the seat of the Ring Council that governs the city", hall: "The Hall of the Arch",
seat: ["throne", "The Chair of the Ring Council", 0],
staff: [["First Councillor Rosalind Ashdown", "First Councillor of Halcyra", "the First Councillor of the Ring Council, gentle and exacting, who once hauled ice from the rings herself"], ["Augustin Morandi", "Keeper of the Ring Charts"], ["Hester Okeke", "Clerk of the Council"]],
rooms: [["council", "The Ring Council Chamber", 1], ["banquet", "The Hall of Ringrise Feasts", 0], ["suite", "The First Councillor's Rooms", 1], ["treasury", "The Ice Treasury", 1], ["gallery", "The Gallery of the Hexagon", 0],
["library", "The Library of the Rings", 0], ["kitchen", "The Palace Kitchens", 1], ["armoury", "The Ringlight Guard Room", 1], ["observe", "The Ringwatch Terrace", 0], ["lounge", "The Moons' Salon", 0], ["music", "The Hall of Ring Music", 0], ["suite", "The Guest Apartments", 0]] },
wards: [
{ t: "academy", n: "The Academy of the Rings", d: "planetary science, orbits and the moons of Saturn", staff: [["Dean Kenji Tanaka", "Dean of the Academy", "the dean, an orbital scientist who can tell you why each gap in the rings is where it is"]] },
{ t: "guild", n: "The Ice Haulers' Guild", d: "who fly the shuttles that bring ring ice to the city" },
{ t: "observatory", n: "The Titan Watch", d: "studying the hazy moon with its seas of methane" },
{ t: "market", n: "The Ringside Exchange", d: "ring ice, gas and the city's wares traded" },
{ t: "library", n: "The Hall of Ring Records", d: "every probe, every flight, every chart of the rings" },
{ t: "hospital", n: "The Halcyra Infirmary", d: "healers of the floating city" },
{ t: "bath", n: "The Ringwater Baths", d: "warm baths of melted ring ice, the cleanest water in the Solar System" },
{ t: "theatre", n: "The Theatre of Ringrise", d: "music, plays and the city's evening lectures" }
],
arena: { n: "The Gap Course", d: "train on the open deck under the rings", about: "Six posts stand round the deck, named for the gaps in the rings. Run to each as it lights gold." },
homes: { n: "The Moonlet Platforms", d: "homes on small round platforms, like little moons round the city" },
tunnel: { n: "The Bridge of the Divide", kind: "bridge" },
deep: { n: "The Ice Wharves", d: "where the shuttles unload ring ice and the skimmers draw in the gas", heart: "obelisk",
b: [{ t: "dock", n: "The Ring Shuttle Docks", d: "where the ice shuttles moor after their run" }, { t: "workshop", n: "The Melt Works", d: "ring ice melted and cleaned into water" }, { t: "lab", n: "The Enceladus Laboratory", d: "studying the ice sprayed from the little moon" }, { t: "farm", n: "The Golden Glasshouses", d: "food grown in ring water under lamps" }],
gather: [{ k: "ow_sa_ringice", n: "Ring ice on the wharf", v: "take a block of ring ice", look: "ice" }, { k: "ow_h2", n: "A full skimmer intake", v: "draw off a canister", look: "gas" }, { k: "gr_saturn_spray", n: "Enceladus spray samples", v: "take a phial", look: "crystal" }, { k: "ow_he3", n: "The helium-3 separator", v: "draw a little helium-3", look: "gas" }, { k: "gr_saturn_titan", n: "Titan haze canisters off the shuttle", v: "take a sample canister", look: "gas" }] },
trade: { say: "The Ringside Exchange buys what the Ice Wharves bring in.", sells: ["cr_glass", "cr_cloth", "ow_water"], buys: ["ow_sa_ringice", "ow_h2", "ow_he3", "gr_saturn_spray", "gr_saturn_titan", "cr_crystal"] },
mats: [{ k: "gr_saturn_spray", n: "Enceladus spray ice", e: "💧", p: 14 }, { k: "gr_saturn_titan", n: "Titan haze sample", e: "🟠", p: 22, rare: 1 }],
lore: [["A city with no ground", "Saturn is a ball of hydrogen and helium with no surface to build on. Halcyra floats in the cloud tops on domes of heated hydrogen, the only gas lighter than the air around it."],
["The founding", "Cloud Station Cassini came first, moored to watch the rings. The haulers who brought ice from the rings built homes beside it, and their platforms grew into the city."],
["The rings", "The rings are billions of pieces of water ice, from dust to boulders the size of houses. They stretch hundreds of thousands of kilometres across, yet in most places they are only tens of metres thick."],
["The Ring Council", "Halcyra is governed by the Ring Council, chosen by the platforms. Its first rule is that no ice is taken from the rings faster than the shuttles can carry it carefully."],
["The hexagon", "At Saturn's north pole the clouds form a six-sided jet stream wider than Earth. The Gallery of the Hexagon holds paintings of it by every artist the city has had."],
["The traders", "Pip-Tullik the trader often moors a barge off Cassini's rail, and has been known to swap a great deal for a bag of pretty ring ice."]],
lectures: [{ t: "A planet that would float", x: "Saturn is less dense than water. If there were a bathtub big enough, Saturn would float in it.", q: ["What is unusual about Saturn's density?", ["It is less dense than water", "It is the densest planet", "It is made of iron"], 0] },
{ t: "Rings of ice", x: "Saturn's rings are made mostly of water ice. They are very wide but very thin: in most places only about ten metres to a kilometre thick.", q: ["What are Saturn's rings mostly made of?", ["Water ice", "Gold dust", "Gas"], 0] },
{ t: "Titan", x: "Titan, Saturn's largest moon, is bigger than Mercury and has a thick hazy atmosphere. It has lakes and seas of liquid methane and ethane, and in 2005 the Huygens probe landed there.", q: ["What fills the lakes on Titan?", ["Liquid methane and ethane", "Water", "Lava"], 0] },
{ t: "The geysers of Enceladus", x: "The small moon Enceladus sprays jets of water ice from cracks near its south pole. They come from an ocean under its icy crust, and the spray feeds one of Saturn's rings.", q: ["Where does Enceladus's spray come from?", ["An ocean under its ice", "A volcano of lava", "Saturn's clouds"], 0] },
{ t: "Cassini's last dive", x: "The Cassini spacecraft studied Saturn for thirteen years. In 2017, almost out of fuel, it was steered into Saturn's atmosphere so it could never land on and spoil a moon that might hold life.", q: ["How did the Cassini mission end?", ["It dived into Saturn", "It landed on Titan", "It flew home"], 0] }],
persona: "Halcyra is a floating city in the clouds of Saturn, beneath the rings, grown from the Space Corp's Cloud Station Cassini; Saturn has no surface, so it floats on heated hydrogen. It is governed by the Ring Council from the Ringlight Palace. Its people are ice haulers, scientists and dreamers who love the rings. Real Saturn science is welcome."
});
grRealm({ id: "uranus", parent: { w: "surface", sub: "uranus" }, parentName: "Uranus", name: "Celadine", short: "Celadine",
blurb: "the quiet floating city of Uranus, drifting through soft blue-green haze on a world tipped on its side",
intro: "Celadine floats in the pale, still haze of Uranus, its platforms lit softly against the cold. Long bridges link its quiet terraces to the Palace of the Long Seasons, where the city keeps time by a sun that circles the sky for decades.",
style: "ice", layout: "isles", tone: 380, gateCol: 0xB8E0E4,
env: { top: 0x4E7478, low: 0x9CC4C4, fog: 0x90B8BA, fogD: 0.0010, sun: 0.4, sunCol: 0xE8F4F4, sunDir: [0.2, 0.5, 0.7], hemi: 0.8, hemiCol: 0xB8DCDC, hemiGround: 0x4A6A6C, groundCol: 0x8EA2A6, groundCol2: 0xA4B6B8, groundTex: "marble", mtn: 0x7E9CA0, mtnTex: "stone", cloud: 0xA8CCCC, cloud2: 0x6A9898 },
gate: { n: "The Herschel Lift", d: "the lift from the cloud station up into the quiet city", back: "The Herschel Lift" },
warden: ["Aldric Penhallow", "Liftwarden of the Herschel Lift", "the soft-spoken liftwarden who brings travellers up from Cloud Station Herschel and always offers them a warm drink"],
names: ["Aldric", "Signe", "Ravi", "Clemence", "Osric", "Nadia", "Torvald", "Ines", "Hollis", "Margit", "Evander", "Liang", "Bryony", "Ansel", "Calla", "Joren"],
surnames: ["Penhallow", "Eskildsen", "Raman", "Dufresne", "Whitcombe", "Ivanova", "Larkin", "Abara", "Thorne", "Sundqvist", "Merriman", "Kessler"],
citizenTitles: ["Haze citizen", "Methane skimmer", "Season-keeper", "Lamp tender", "Visiting physicist"], guardTitle: "Season guard",
plaza: { n: "The Plaza of the Tilted Sun", d: "the city's quiet square, where a great dial tracks the decades-long seasons", heart: "obelisk" }, avenue: { n: "The Way of Long Seasons" },
palace: { t: "palace", n: "The Palace of the Long Seasons", d: "the seat of the Season-Warden who keeps the city through its long dark and long light", hall: "The Hall of Equinox",
seat: ["throne", "The Season-Warden's Chair", 0],
staff: [["Season-Warden Margit Sundqvist", "Season-Warden of Celadine", "the Season-Warden, patient and kind, who has guided the city through half a season, some twenty years"], ["Evander Whitcombe", "Keeper of the Calendar"], ["Liang Raman", "Steward of Warmth"]],
rooms: [["council", "The Council of the Haze", 1], ["dining", "The Equinox Feast Hall", 0], ["suite", "The Season-Warden's Rooms", 1], ["treasury", "The Warmth Treasury", 1], ["gallery", "The Gallery of the Faint Rings", 0],
["library", "The Library of Seasons", 0], ["kitchen", "The Palace Kitchens", 1], ["armoury", "The Season Guard Room", 1], ["office", "The Office of Warmth and Light", 1], ["lounge", "The Lamplit Salon", 0], ["observe", "The Pole Watch", 0], ["suite", "The Guest Rooms", 0]] },
wards: [
{ t: "academy", n: "The Academy of the Ice Giants", d: "the science of the cold outer worlds", staff: [["Master Clemence Dufresne", "Master of the Academy", "the master, who studies why Uranus gives off so little heat of its own"]] },
{ t: "guild", n: "The Lamp Tenders' Guild", d: "who keep the city's soft lamps lit through the long dark" },
{ t: "observatory", n: "The Miranda Observatory", d: "watching the moons and the faint dark rings" },
{ t: "market", n: "The Haze Exchange", d: "methane, frost and the city's goods traded" },
{ t: "library", n: "The Library of Moon Names", d: "stories of the moons, all named for characters in old plays and poems" },
{ t: "hospital", n: "The House of Warm Healing", d: "healers who know the long dark is hard on the spirit" },
{ t: "temple", n: "The Hall of Stillness", d: "a calm place to sit and listen to the wind" },
{ t: "inn", n: "The Sideways Lantern", d: "the warmest inn in the outer Solar System" }
],
arena: { n: "The Quiet Deck", d: "steady training in the still haze", about: "Six posts stand round the deck. Run to each as it lights a soft gold." },
homes: { n: "The Lamplight Terraces", d: "snug homes with deep windows on the haze" },
tunnel: { n: "The Bridge of the Pole", kind: "bridge" },
deep: { n: "The Methane Reach", d: "where the skimmers draw the cold gas in and the frost is gathered", heart: "crystal",
b: [{ t: "workshop", n: "The Skimmer Works", d: "intakes that draw in hydrogen, helium and methane" }, { t: "lab", n: "The Frost Laboratory", d: "studying the smelly frost of the cloud tops" }, { t: "farm", n: "The Lamp Gardens", d: "food grown under warm lamps" }, { t: "hangar", n: "The Moon Ferry Hangar", d: "ferries to the five large moons" }],
gather: [{ k: "ow_ur_methane", n: "A methane intake", v: "fill a canister", look: "gas" }, { k: "ow_ur_h2s", n: "Frost on the intake vanes", v: "scrape the frost (hold your nose)", look: "ice" }, { k: "ow_h2", n: "A full hydrogen intake", v: "draw off a canister", look: "gas" }, { k: "gr_uranus_ringdust", n: "Dark ring dust in the ferry filters", v: "tap out the dust", look: "coal" }] },
trade: { say: "The Haze Exchange buys what the Methane Reach draws in.", sells: ["cr_cloth", "cr_parts", "ow_cocoa"], buys: ["ow_ur_methane", "ow_ur_h2s", "ow_h2", "ow_he3", "gr_uranus_ringdust", "cr_glass"] },
mats: [{ k: "gr_uranus_ringdust", n: "Dark ring dust", e: "⚫", p: 16 }],
lore: [["Why the city floats", "Uranus has no solid surface, only gas thickening into a deep icy fluid far below. Celadine floats in the upper haze on domes of heated hydrogen."],
["A world on its side", "Uranus is tipped over so far that it rolls round the Sun on its side. Each pole has about 42 years of daylight and then about 42 years of dark."],
["The Season-Warden", "Because a season lasts twenty years, Celadine chooses a Season-Warden to guide it through each one. The Hall of Equinox is used only twice in a long Uranian year."],
["The colour of the haze", "Methane in the air soaks up red light, so what is left looks blue-green. The city's lamps are warm gold to keep the evenings cheerful."],
["The smell of the clouds", "The frost on the cloud tops is hydrogen sulphide, the gas that makes rotten eggs smell. The skimmer crews take it in good humour."],
["The moons of the plays", "The moons of Uranus are named after characters from the plays of Shakespeare and a poem by Alexander Pope. The Library of Moon Names tells their stories."]],
lectures: [{ t: "The tilted planet", x: "Uranus is tilted about 98 degrees, so it spins almost on its side. Scientists think something huge may have struck it long ago.", q: ["How is Uranus unusual?", ["It spins on its side", "It has no moons", "It is the hottest planet"], 0] },
{ t: "Found with a telescope", x: "In 1781 William Herschel spotted Uranus with a telescope in his garden in Bath. It was the first planet discovered that cannot easily be seen with the naked eye.", q: ["Who discovered Uranus in 1781?", ["William Herschel", "Galileo", "Isaac Newton"], 0] },
{ t: "Why blue-green", x: "Uranus's air has methane in it. Methane absorbs red light, so sunlight reflected back from the clouds looks blue-green.", q: ["What gives Uranus its blue-green colour?", ["Methane absorbing red light", "Oceans of water", "Blue rocks"], 0] },
{ t: "The coldest air", x: "Uranus has recorded the coldest temperatures of any planet's atmosphere, down to about minus 224 °C, colder even than Neptune, which is further from the Sun.", q: ["Which planet has the coldest recorded atmosphere?", ["Uranus", "Neptune", "Mars"], 0] },
{ t: "One visit", x: "Only one spacecraft has ever visited Uranus: Voyager 2, which flew past in January 1986 and found new moons and rings.", q: ["Which spacecraft has visited Uranus?", ["Voyager 2", "Cassini", "Juno"], 0] }],
persona: "Celadine is a quiet floating city in the haze of Uranus, grown from the Space Corp's Cloud Station Herschel; Uranus has no surface, so the city floats on heated hydrogen. It is guided by a Season-Warden through seasons twenty years long. Its people are calm, warm-hearted and fond of lamplight. Real Uranus science is welcome."
});
grRealm({ id: "neptune", parent: { w: "surface", sub: "neptune" }, parentName: "Neptune", name: "Saphirel", short: "Saphirel",
blurb: "the storm-bound floating city of Neptune, anchored against the fastest winds in the Solar System",
intro: "Saphirel rides the deep blue clouds of Neptune, its platforms braced and streamlined against winds that never rest. Sheltered bridges run up to the Tidehold, the palace that turns the city into the gale like a ship's bow.",
style: "station", layout: "isles", tone: 360, gateCol: 0x8AA8E8,
env: { top: 0x0E1A44, low: 0x3A5AA0, fog: 0x2E4A8C, fogD: 0.0012, sun: 0.35, sunCol: 0xDDE6FF, sunDir: [0.3, 0.55, 0.5], hemi: 0.8, hemiCol: 0x8AA4E0, hemiGround: 0x1A2A5A, groundCol: 0x7A8494, groundCol2: 0x8E98A8, groundTex: "metal", mtn: 0x4A5E90, mtnTex: "metal", cloud: 0x4A6AB4, cloud2: 0x1E2E6A },
gate: { n: "The Le Verrier Lock", d: "the sheltered lift from the cloud station up into the storm city", back: "The Le Verrier Lock" },
warden: ["Brannagh Coyle", "Lockkeeper of the Le Verrier Lock", "the weathered lockkeeper who brings travellers up from Cloud Station Le Verrier and will tell you the wind speed before you ask"],
names: ["Brannagh", "Teodoro", "Astrid", "Malik", "Corisande", "Gideon", "Yuki", "Fintan", "Solveig", "Amadou", "Perrine", "Ivo", "Nerys", "Lazlo", "Thandiwe", "Rowan"],
surnames: ["Coyle", "Galbraith", "Nordahl", "Haddad", "Revel", "Okoro", "Fennimore", "Stavros", "Kirkwood", "Lindell", "Moreau", "Tamura"],
citizenTitles: ["Storm citizen", "Balloon launcher", "Wind-brace engineer", "Storm chaser", "Visiting meteorologist"], guardTitle: "Tidehold guard",
plaza: { n: "The Plaza of the Calm Eye", d: "the sheltered square at the city's heart, where the wind cannot reach", heart: "crystal" }, avenue: { n: "The Windward Way" },
palace: { t: "palace", n: "The Tidehold", d: "the palace and helm of the Storm Admiral, who keeps the city facing the wind", hall: "The Hall of the Gale",
seat: ["throne", "The Admiral's Helm", 0],
staff: [["Storm Admiral Solveig Nordahl", "Storm Admiral of Saphirel", "the Storm Admiral, fearless and good-humoured, who has steered the city past two dark storms"], ["Malik Haddad", "Master of the Braces"], ["Perrine Revel", "Keeper of the Storm Log"]],
rooms: [["council", "The Council of the Gale", 1], ["banquet", "The Deepblue Banqueting Hall", 0], ["suite", "The Admiral's Quarters", 1], ["treasury", "The Tidehold Treasury", 1], ["gallery", "The Gallery of Dark Storms", 0],
["library", "The Storm Log Library", 0], ["kitchen", "The Tidehold Galleys", 1], ["armoury", "The Tidehold Guard Room", 1], ["control", "The Wind Helm", 1], ["lounge", "The Lee Salon", 0], ["map", "The Storm Chart Room", 0], ["suite", "The Visiting Captains' Rooms", 0]] },
wards: [
{ t: "academy", n: "The Academy of Winds", d: "meteorology, the ice giants and the science of storms", staff: [["Dean Amadou Okoro", "Dean of the Academy", "the dean, who has flown a weather balloon through the fastest wind ever measured"]] },
{ t: "guild", n: "The Guild of Wind-Braces", d: "who build and mend the struts that hold the city against the gale" },
{ t: "observatory", n: "The Triton Observatory", d: "watching Neptune's great backwards moon" },
{ t: "market", n: "The Gale Exchange", d: "methane, storm data and the city's goods traded" },
{ t: "barracks", n: "The Storm Wardens' Hall", d: "the guard who rescue anyone caught out in the wind" },
{ t: "hospital", n: "The Saphirel Infirmary", d: "healers of the storm city" },
{ t: "library", n: "The Hall of the Prediction", d: "honouring the planet found first by mathematics" },
{ t: "inn", n: "The Leeward Lantern", d: "a snug inn on the sheltered side of the city" }
],
arena: { n: "The Wind Court", d: "train on a deck braced against the gale", about: "Six posts stand round the braced deck. Run to each as it lights gold; the wind screens keep the gale off you, mostly." },
homes: { n: "The Sheltered Rows", d: "rounded homes tucked in the lee of the great braces" },
tunnel: { n: "The Covered Gale Bridge", kind: "bridge" },
deep: { n: "The Storm Reach", d: "where the balloons are launched and the skimmers draw in the cold gas", heart: "obelisk",
b: [{ t: "workshop", n: "The Balloon Works", d: "weather balloons built to fly the great winds" }, { t: "lab", n: "The Storm Data Hall", d: "reading what the balloons brought back" }, { t: "hangar", n: "The Triton Ferry Hangar", d: "ferries to the great backwards moon" }, { t: "farm", n: "The Blue Glasshouses", d: "food grown under lamps in the far dim sunlight" }],
gather: [{ k: "ow_ne_methane", n: "Methane frost on the intakes", v: "scrape the white crystals", look: "ice" }, { k: "ow_ne_storm", n: "A recovered weather balloon", v: "take the storm data core", look: "crystal" }, { k: "ow_h2", n: "A full hydrogen intake", v: "draw off a canister", look: "gas" }, { k: "gr_neptune_triton", n: "Triton frost off the ferry", v: "take a block of nitrogen frost", look: "ice" }] },
trade: { say: "The Gale Exchange buys what the Storm Reach brings in.", sells: ["cr_parts", "cr_cloth", "ow_soup"], buys: ["ow_ne_methane", "ow_ne_storm", "ow_h2", "ow_he3", "gr_neptune_triton", "cr_glass"] },
mats: [{ k: "gr_neptune_triton", n: "Triton nitrogen frost", e: "🧊", p: 15 }],
lore: [["A city in the wind", "Neptune has no surface, only gas thickening into a hot, icy fluid far below. Saphirel floats on domes of heated hydrogen and keeps its bow to the wind, which can blow at about 2,000 km/h."],
["The founding", "Cloud Station Le Verrier was built to launch weather balloons into the great winds. Braced platforms were added one by one, and the storm crews made a city of them."],
["The Storm Admiral", "Saphirel is commanded by a Storm Admiral chosen by the city. Her task is simple and endless: keep the city facing the wind and far from the dark storms."],
["The planet found by mathematics", "Before anyone saw Neptune, Urbain Le Verrier worked out where it must be from the way it tugged on Uranus. Johann Galle looked there in 1846 and found it, close to where the sums said."],
["Triton", "Neptune's largest moon goes round it backwards. Voyager 2 saw dark plumes rising from its frozen nitrogen surface in 1989."],
["The visitors", "Out among Neptune's light, the Veyari keep a watch-station of crystal. The people of Saphirel see it glint now and then, and wave."]],
lectures: [{ t: "The fastest winds", x: "Neptune has the fastest winds measured on any planet, up to about 2,000 km/h. That is much faster than the strongest hurricane on Earth.", q: ["About how fast are Neptune's fastest winds?", ["About 2,000 km/h", "About 200 km/h", "About 20 km/h"], 0] },
{ t: "Found on paper first", x: "Neptune was the first planet found by mathematics. Le Verrier predicted its position from the pull on Uranus, and Galle saw it in 1846.", q: ["How was Neptune first found?", ["By mathematics, then a telescope", "By a space probe", "By the naked eye"], 0] },
{ t: "A long year", x: "Neptune takes about 165 Earth years to go once round the Sun. It finished its first full orbit since its discovery in 2011.", q: ["How long is a year on Neptune?", ["About 165 Earth years", "About 12 Earth years", "One Earth year"], 0] },
{ t: "Triton goes backwards", x: "Triton orbits Neptune in the opposite direction to the planet's spin. Scientists think it was once a separate icy world that Neptune captured.", q: ["What is unusual about Triton's orbit?", ["It goes backwards", "It is square", "It goes round the Sun instead"], 0] },
{ t: "Heat from within", x: "Neptune gives off more than twice as much heat as it receives from the faraway Sun. That inner heat may help drive its tremendous winds.", q: ["Where does much of Neptune's heat come from?", ["From inside the planet", "From a nearby star", "From its moons"], 0] }],
persona: "Saphirel is a floating storm city in the deep blue clouds of Neptune, grown from the Space Corp's Cloud Station Le Verrier; Neptune has no surface, so the city floats on heated hydrogen and keeps its bow to winds of about 2,000 km/h. It is commanded by the Storm Admiral from the Tidehold. Its people are brave, cheerful storm crews. Real Neptune science is welcome."
});
grRealm({ id: "veyar", parent: { w: "surface", sub: "veyar" }, parentName: "Veyar", name: "Ilvessa, the Singing City", short: "Ilvessa",
blurb: "the great crystal capital of the Veyari, beneath a rose sun and a little blue one",
intro: "Beyond the towers you first met lies Ilvessa, the Veyari's own capital, where crystal halls grow rather than being built and hum faintly in the light of two suns. Its Lantern Way climbs to the Spire of the Two Lights, where the Veyari keep their oldest songs.",
style: "crystal", layout: "open", gravity: 7.2, tone: 540, gateCol: 0xE8B0F0,
env: { top: 0x2A0A4A, low: 0xB86AA0, fog: 0xA05A92, fogD: 0.0010, sun: 0.7, sunCol: 0xFFC8F0, sunDir: [0.5, 0.3, -0.7], hemi: 0.8, hemiCol: 0xE0A8E0, hemiGround: 0x3A2A5A, stars: 1, groundCol: 0x4A3A6A, groundCol2: 0x6A4A8A, groundTex: "grass", mtn: 0x5A3E7A, mtnTex: "stone" },
gate: { n: "The Arch of Welcome", d: "the crystal arch from the towers into the Veyari capital", back: "The Arch of Welcome" },
warden: ["Oveth of the Arch", "Keeper of the Arch of Welcome", "a tall, unhurried Veyari who greets every visitor by asking what light they come from"],
names: ["Oveth", "Lirae", "Senn", "Ithra", "Vael", "Orune", "Thesk", "Malai", "Ysolde", "Corrin", "Aveli", "Tharn", "Iselle", "Quen", "Ravessa", "Elun"],
surnames: ["of the Arch", "of the Groves", "of the Song", "of the Rose Light", "of the Blue Light", "of the Long Watch", "of the Circle", "of the Deep Roots", "of the High Spire", "of the Dewbells", "of the Far Gate", "of the Threads"],
citizenTitles: ["Veyari of the city", "Grove-singer", "Light-weaver", "Star-farer", "Space Corp visitor"], guardTitle: "Keeper of the Peace",
plaza: { n: "The Court of Two Lights", d: "the great round court where both suns' shadows meet at midday", heart: "crystal" }, avenue: { n: "The Lantern Way" },
palace: { t: "palace", n: "The Spire of the Two Lights", d: "where the Elder Chorus, the Veyari's gathering of elders, meets and sings", hall: "The Hall of Many Voices",
seat: ["throne", "The Seat of the Eldest Voice", 0],
staff: [["Ithra the Eldest Voice", "Eldest Voice of the Chorus", "the eldest of the Elder Chorus, very old, very calm, who asks visitors questions and listens to every answer"], ["Vael of the Long Watch", "Keeper of the Watch"], ["Lirae of the Threads", "Mistress of Gifts"]],
rooms: [["council", "The Chamber of the Chorus", 1], ["banquet", "The Hall of Shared Fruit", 0], ["suite", "The Eldest Voice's Rooms", 1], ["treasury", "The Hall of Kept Gifts", 1], ["gallery", "The Gallery of Far Worlds", 0],
["library", "The Library of Light-Words", 0], ["kitchen", "The Grove Kitchens", 1], ["crystal", "The Garden of Growing Halls", 0], ["music", "The Chamber of First Songs", 0], ["lounge", "The Hall of Questions", 0], ["observe", "The Star Chamber", 1], ["suite", "The Rooms for Travellers", 0]] },
wards: [
{ t: "academy", n: "The House of Questions", d: "where young Veyari learn by asking, and by singing phrases back", staff: [["Senn of the Song", "Teacher of the House", "a teacher who believes no question is small, and that every answer should be sung twice"]] },
{ t: "temple", n: "The Hall of the Resonant Stone", d: "a hall of quiet where the crystals hum in harmony" },
{ t: "embassy", n: "The Embassy of the Far Sun", d: "the Space Corp's grand embassy in the capital, with Envoy Morrow's staff", staff: [["Imani Achterlund", "Deputy Envoy", "the envoy's deputy, careful and curious, who keeps the embassy's dictionary of Veyari words"]] },
{ t: "guild", n: "The Weavers of Light", d: "who weave lightsilk from the threads of the groves" },
{ t: "library", n: "The Archive of the Long Watch", d: "everything the Veyari have seen from their watch-stations among the stars" },
{ t: "observatory", n: "The Tower of the Far Gate", d: "where the Veyari study the Gate, which they did not build either" },
{ t: "market", n: "The Great Circle of Gifts", d: "the capital's grand hall of exchange, where nothing is ever sold for gold" },
{ t: "hospital", n: "The House of Gentle Light", d: "where the Veyari heal with rest, warmth and song" }
],
arena: { n: "The Garden of Paces", d: "the Veyari's garden for training mind and body", about: "Six crystals stand in the garden. Walk to each as it glows gold; the Veyari say a calm pace is the fastest in the end." },
homes: { n: "The Grove Dwellings", d: "rounded homes grown from living crystal among the glowing trees" },
tunnel: { n: "The Bridge of Hanging Light", kind: "bridge" },
deep: { n: "The Deep Groves", d: "the old forest of crystal and glowing trees where the city's gifts are grown", heart: "tree",
b: [{ t: "farm", n: "The Glowfruit Orchards", d: "groves of soft fruit that glow at dusk" }, { t: "workshop", n: "The Thread House", d: "where grove threads are spun before weaving" }, { t: "temple", n: "The Hall of the Singing Crystals", d: "where the oldest crystals are kept and sung to" }, { t: "lab", n: "The House of Growing", d: "where the Veyari coax crystal halls to grow" }],
gather: [{ k: "cr_crystal", n: "Star crystal at a tower's foot", v: "take what the crystal offers", look: "crystal" }, { k: "ow_vy_glowfruit", n: "A glowfruit tree", v: "pick a ripe glowfruit", look: "crop" }, { k: "ow_vy_dew", n: "Dewbell flowers", v: "gather a little nectar", look: "herb" }, { k: "gr_veyar_thread", n: "Fallen grove threads", v: "gather the soft threads", look: "wood" }, { k: "gr_veyar_shard", n: "Song shards under the singing towers", v: "pick up a shard that hums", look: "crystal" }] },
trade: { say: "The Great Circle of Gifts never takes gold for itself; the embassy's clerks help you turn what you bring into fair gifts.", sells: ["ow_vy_silk", "gr_veyar_shard", "ow_vy_glowfruit"], buys: ["ow_sa_ringice", "ow_pl_n2", "ow_ne_storm", "ow_ar_potato", "ow_he3", "gr_veyar_thread", "cr_crystal"] },
mats: [{ k: "gr_veyar_thread", n: "Grove thread", e: "🧶", p: 12 }, { k: "gr_veyar_shard", n: "Song shard", e: "🔮", p: 38, rare: 1 }],
lore: [["The Singing City", "Ilvessa is the oldest city on Veyar. Its halls are not built but grown: the Veyari sing to young crystal for many years, and it rises in the shape of the song."],
["Two suns", "Veyar circles a rose sun and a little blue one. At midday the two shadows of every tower meet in the Court of Two Lights, and the Veyari call that moment the Meeting."],
["The Elder Chorus", "The Veyari have no kings. The Elder Chorus meets in the Spire and decides things by singing until every voice agrees; it can take many days."],
["Gifts, never gold", "The Veyari have eleven words for kinds of light and none for 'mine'. They exchange only gifts, and a gift from a far place is the most precious of all."],
["The Far Gate", "The Veyari found the Far Gate long ago, as humans did, and they too do not know who made it. The Tower of the Far Gate has studied it for longer than human history."],
["The embassy", "The Space Corp's Envoy, Celeste Morrow, keeps a small embassy by the towers. In Ilvessa the Corp has a grander one, the Embassy of the Far Sun, where humans and Veyari learn each other's words."]],
lectures: [{ t: "Planets with two suns", x: "Many stars have a companion star; perhaps around half of stars like our Sun do. Astronomers have found real planets circling two stars, such as Kepler-16b, found in 2011.", q: ["Have astronomers found real planets that orbit two stars?", ["Yes", "No, it is impossible", "Only in stories"], 0] },
{ t: "Star colours", x: "A star's colour shows its temperature. Red stars are the coolest, yellow ones like our Sun are in the middle, and blue stars are the hottest.", q: ["Which colour of star is the hottest?", ["Blue", "Red", "Yellow"], 0] },
{ t: "Crystals that keep time", x: "A quartz crystal vibrates at a very steady rate when electricity passes through it. That is how most watches keep time: their tiny quartz crystal vibrates 32,768 times a second.", q: ["Why do watches use quartz crystals?", ["They vibrate at a very steady rate", "They glow in the dark", "They are magnetic"], 0] },
{ t: "Worlds beyond our Sun", x: "Planets around other stars are called exoplanets. Astronomers have confirmed thousands of them, many found by watching a star dim slightly as a planet passes in front.", q: ["What is an exoplanet?", ["A planet around another star", "A dead planet", "A moon"], 0] },
{ t: "The Crystal Song (Veyari teaching)", x: "The Veyari teach their children by singing a phrase on the five Singing Crystals and asking them to sing it back. Each round is one note longer, so memory grows like a crystal does.", q: ["How do the Veyari teach their children?", ["By singing phrases to sing back", "By written tests", "By silence"], 0] }],
persona: "Ilvessa is the great capital of the Veyari on Veyar, a world of two suns (a rose one and a little blue one) reached only through the Far Gate past Pluto. The Veyari are tall, calm, courteous star-farers who speak of light poetically, have eleven words for light and none for 'mine', trade only in gifts (never for gold), share knowledge but never weapons, and are governed by the Elder Chorus, which decides by singing. Their halls are grown from crystal by song. The Space Corp keeps an embassy there."
});
grRealm({ id: "aurora", parent: { w: "station", sub: "aurora" }, parentName: "Station Aurora", name: "The Aurora Spindle", short: "Aurora Spindle",
blurb: "the great spinning ring-city inside Station Aurora, where turning gives the weight of home",
intro: "Ride the lift down the spoke from the station hub and the floor grows heavier under you, until you step out into the Spindle: a whole city on the inside of a turning ring, the street curving up out of sight ahead and behind. Its Hall of the Corp stands on terraces above the Concourse, under windows full of Earth.",
style: "station", layout: "dome", tone: 500, gateCol: 0xBFD8FF,
env: { top: 0x0A1428, low: 0x2A3E5E, fog: 0x1E2E48, fogD: 0.0014, sun: 0.85, sunCol: 0xF4F8FF, sunDir: [0.4, 0.6, -0.3], hemi: 0.9, hemiCol: 0xC8D8F0, hemiGround: 0x3A4250, stars: 1, groundCol: 0x7A8290, groundCol2: 0x9AA0AA, groundTex: "floortile", mtn: 0x5A6474, mtnTex: "metal" },
gate: { n: "The Spoke Lift", d: "the lift down the spoke from the hub into the spinning ring", back: "The Spoke Lift" },
warden: ["Rhiannon Achebe", "Liftmaster of the Spoke Lift", "the cheerful liftmaster who rides travellers down the spoke and warns them, every time, that the floor gets heavier"],
names: ["Rhiannon", "Mateus", "Priya", "Owain", "Ayesha", "Gustav", "Lena", "Kofi", "Saskia", "Ronan", "Mina", "Elias", "Tova", "Dmitri", "Hana", "Felix"],
surnames: ["Achebe", "Santos", "Ramaswamy", "Lloyd", "Karimi", "Holm", "Novak", "Asante", "Brauer", "Quinlan", "Cho", "Eriksen"],
citizenTitles: ["Ring resident", "Space Corp crew", "Hydroponics grower", "Recycling engineer", "Visiting scientist"], guardTitle: "Corp security officer",
plaza: { n: "Sunrise Plaza", d: "the great square under the big window, where the crew count sixteen sunrises a day", heart: "orrery" }, avenue: { n: "The Concourse of the Ring" },
palace: { t: "palace", n: "The Hall of the Corp", d: "the Space Corp's command of every station and outpost, a branch of the Dragon Corp", hall: "The Hall of Missions",
seat: ["control", "The Station Commander's Bridge", 0],
staff: [["Commander Ayesha Karimi", "Commander of Station Aurora", "the station commander, brisk and warm, who has flown every Orbital Line route and knows each crew member by name"], ["Gustav Holm", "First Officer"], ["Lena Brauer", "Chief of the Watch"]],
rooms: [["council", "The Mission Council Room", 1], ["banquet", "The Earthview Mess", 0], ["suite", "The Commander's Quarters", 1], ["treasury", "The Corp Stores Vault", 1], ["gallery", "The Gallery of Real Stations", 0],
["library", "The Mission Library", 0], ["kitchen", "The Galley", 1], ["armoury", "The Phaser Locker", 1], ["office", "The Duty Officer's Room", 1], ["lounge", "The Crew Lounge", 0], ["map", "The Orbit Chart Room", 0], ["bunks", "The Visiting Crew Bunks", 0]] },
wards: [
{ t: "academy", n: "The Corp Flight Academy", d: "cadets trained for every station, ship and outpost", staff: [["Instructor Owain Lloyd", "Chief Flight Instructor", "the chief instructor, who has docked a shuttle by hand more times than he can count"]] },
{ t: "lab", n: "The Microgravity Laboratory", d: "experiments up at the hub, where nothing weighs anything" },
{ t: "hospital", n: "The Ring Medical Bay", d: "space medicine: bones, balance and eyes" },
{ t: "market", n: "The Ring Commissary", d: "the station's great shop and trading floor" },
{ t: "barracks", n: "The Security Deck", d: "the Corp's watch over the station and the Orbital Line" },
{ t: "hangar", n: "The Hub Docks", d: "where shuttles from the Spaceport and the Moon come in" },
{ t: "theatre", n: "The Earthlight Theatre", d: "films, music and lectures under a window full of Earth" },
{ t: "inn", n: "The Sixteen Sunrises", d: "the station's lodging house for travellers between lines" }
],
arena: { n: "The Spin Track", d: "run the curving track round the ring", about: "Six posts stand along the track, which curves up ahead of you. Run to each as it lights gold; the floor is the ring's outer wall, and the spin holds you to it." },
homes: { n: "The Ring Quarters", d: "crew cabins and family homes along the curve" },
tunnel: { n: "The Counter-Ring Tube", kind: "tube" },
deep: { n: "The Life Ring", d: "the second ring that keeps everyone fed, watered and breathing", heart: "fountain",
b: [{ t: "farm", n: "The Hydroponic Halls", d: "greens and peppers grown in water under lamps" }, { t: "workshop", n: "The Recycling Bay", d: "where nothing is thrown away" }, { t: "lab", n: "The Water and Air Plant", d: "water reclaimed and air made fresh" }, { t: "workshop", n: "The Fab Shop", d: "parts printed and pressed from recycled metal" }],
gather: [{ k: "ow_au_mizuna", n: "Mizuna in the hydroponic trays", v: "cut the greens", look: "crop" }, { k: "ow_au_chile", n: "Chile plants under the lamps", v: "pick a ripe pepper", look: "crop" }, { k: "ow_au_scrap", n: "The sorting bins", v: "take recovered scrap", look: "ore" }, { k: "gr_aurora_algae", n: "The algae tanks", v: "skim a culture", look: "herb" }] },
trade: { say: "The Ring Commissary buys what the Life Ring grows and recovers, and sells the station's supplies.", sells: ["ow_au_tortilla", "ow_au_coffee", "ow_ration"], buys: ["ow_au_mizuna", "ow_au_chile", "ow_au_scrap", "gr_aurora_algae", "ow_sp_nife", "ow_sp_comet", "cr_parts"] },
mats: [{ k: "gr_aurora_algae", n: "Algae culture", e: "🟢", p: 8 }],
lore: [["Why the ring spins", "Up at the hub, everything floats. Out on the ring, the spin presses you against the floor, which is the ring's outer wall, and it feels like weight. The further from the hub, the heavier you feel."],
["Station Aurora", "Station Aurora is the Space Corp's station over Earth, about 400 km up, a branch of the Dragon Corp. The Spindle was built inside its great ring so crews could live there for years in comfort."],
["The Hall of the Corp", "Every Space Corp mission, from the Orbital Line to first contact with the Veyari, is planned in the Hall of Missions. The Commander's Bridge looks straight down on Earth."],
["Nothing is wasted", "Every drop of water and scrap of metal aboard is used again. The Recycling Bay and the Water and Air Plant are the true heart of the city."],
["Sixteen sunrises", "The station goes round Earth every 92 minutes or so, so the crew see about sixteen sunrises and sunsets a day. Sunrise Plaza counts every one."],
["The lights below", "On dark passes the crew watch the auroras ripple green over the poles of Earth, the lights the station is named after."]],
lectures: [{ t: "Gravity by spinning", x: "A spinning ring pushes everything on it outwards against its floor, which feels just like weight. Engineers have long planned spinning stations to give crews artificial gravity.", q: ["How can a space station give its crew a feeling of weight?", ["By spinning", "By using magnets", "By painting the floor"], 0] },
{ t: "Falling all the time", x: "At 400 km up, Earth's gravity is still about nine tenths as strong as on the ground. Astronauts float because they and their station are falling round Earth together, in free fall.", q: ["Why do astronauts in orbit float?", ["They are falling round Earth with the station", "There is no gravity in space", "The station is too high"], 0] },
{ t: "Sixteen sunrises", x: "The International Space Station circles Earth about every 92 minutes at about 28,000 km/h, so its crew see about sixteen sunrises a day.", q: ["How many sunrises a day does a crew in low orbit see?", ["About sixteen", "One", "About a hundred"], 0] },
{ t: "Water from everything", x: "On the International Space Station, about 98 per cent of the water is recovered and used again, including moisture from the air and the crew's sweat and urine.", q: ["About how much of its water does the ISS recover?", ["About 98 per cent", "About half", "None"], 0] },
{ t: "Why auroras glow", x: "Auroras happen when fast particles from the Sun are steered by Earth's magnetic field towards the poles and strike the upper air. Oxygen there glows green or red; nitrogen adds blue and purple.", q: ["What usually makes the green glow of an aurora?", ["Oxygen high in the air", "Sunlight on ice", "City lights"], 0] }],
persona: "The Aurora Spindle is the city inside the great spinning ring of Station Aurora, the Space Corp's station about 400 km above Earth (the Space Corp is a branch of the Dragon Corp). You reach it by the Spoke Lift from the hub; the spin gives weight on the ring. The Hall of the Corp plans every mission. Crew are friendly, practical and proud that nothing aboard is wasted. Real space-station science (the ISS above all) is welcome."
});
grRealm({ id: "ares", parent: { w: "station", sub: "ares" }, parentName: "the Ares Gateway", name: "Vermilion Harbour", short: "Vermilion",
blurb: "the great docking city of the Ares Gateway, where every ship bound for Mars is made ready",
intro: "Through the Gateway's inner locks lies Vermilion Harbour, a city built around a vast docking bay with Mars glowing rust-red through its great windows. Ships, ore barges and settlers' landers crowd the berths below the Hall of the Red Approach.",
style: "station", layout: "open", tone: 470, gateCol: 0xE8A070,
env: { top: 0x140A08, low: 0x4A2A20, fog: 0x3A2018, fogD: 0.0012, sun: 0.8, sunCol: 0xFFE8D8, sunDir: [0.5, 0.5, -0.4], hemi: 0.8, hemiCol: 0xE0B8A0, hemiGround: 0x4A2A1E, stars: 1, groundCol: 0x7E7672, groundCol2: 0x988E88, groundTex: "floortile", mtn: 0x8A4A30, mtnTex: "metal" },
gate: { n: "The Inner Locks", d: "the great locks from the Gateway into its docking city", back: "The Inner Locks" },
warden: ["Silas Mbatha", "Lockmaster of the Inner Locks", "the lockmaster who has cycled every settler bound for Mars through the locks, and wishes each one a soft landing"],
names: ["Silas", "Ingrid", "Rafael", "Nkechi", "Bjorn", "Leila", "Cormac", "Sana", "Viktor", "Adaeze", "Hugo", "Maren", "Tomas", "Esther", "Kai", "Paloma"],
surnames: ["Mbatha", "Solberg", "Ortega", "Eze", "Calder", "Haidari", "Fitzroy", "Kowalski", "Moreira", "Lund", "Takeda", "Oduya"],
citizenTitles: ["Harbour resident", "Settler bound for Mars", "Dock rigger", "Barge pilot", "Space Corp officer"], guardTitle: "Gateway guard",
plaza: { n: "The Window Plaza", d: "the great square before the great window, Mars filling half the sky", heart: "orrery" }, avenue: { n: "The Berth Road" },
palace: { t: "palace", n: "The Hall of the Red Approach", d: "the Gateway's command, which sets every descent to Mars", hall: "The Hall of Descents",
seat: ["control", "The Approach Bridge", 0],
staff: [["Commander Ingrid Solberg", "Commander of the Ares Gateway", "the Gateway's commander, unflappable and kind, who has set more than a thousand descents to Mars"], ["Rafael Ortega", "Master of the Berths"], ["Nkechi Eze", "Keeper of the Descent Log"]],
rooms: [["council", "The Descent Council", 1], ["banquet", "The Redlight Mess", 0], ["suite", "The Commander's Quarters", 1], ["treasury", "The Gateway Stores Vault", 1], ["gallery", "The Gallery of the Landers", 0],
["library", "The Mars Library", 0], ["kitchen", "The Galley", 1], ["armoury", "The Phaser Locker", 1], ["map", "The Mars Table Room", 0], ["lounge", "The Settlers' Lounge", 0], ["office", "The Manifest Office", 1], ["bunks", "The Visiting Crew Bunks", 0]] },
wards: [
{ t: "academy", n: "The Settlers' College", d: "everything a settler must know before landing on Mars", staff: [["Tutor Adaeze Oduya", "Head of the College", "the head of the college, a geologist who lived five years in Jezero Crater"]] },
{ t: "dock", n: "The Grand Berths", d: "where ships from Earth dock after their long crossing" },
{ t: "hangar", n: "The Lander Yards", d: "where landers are fuelled and checked for the descent" },
{ t: "market", n: "The Red Exchange", d: "ore, food and supplies for Mars traded" },
{ t: "hospital", n: "The Crossing Infirmary", d: "care for crews after months in weightless flight" },
{ t: "barracks", n: "The Gateway Watch", d: "the Corp's guard over the harbour and the Mars approach" },
{ t: "court", n: "The Claims Court", d: "where settlers' land claims on Mars are heard and sealed" },
{ t: "inn", n: "The Last Berth", d: "where settlers spend their last night before the descent" }
],
arena: { n: "The Descent Deck", d: "train for the landing and the walk after", about: "Six posts stand round the deck. Run to each as it lights gold; settlers drill here until their legs remember how to carry them." },
homes: { n: "The Berthside Quarters", d: "cabins for crews and settlers waiting for their window" },
tunnel: { n: "The Long Docking Tube", kind: "tube" },
deep: { n: "The Phobos Quay", d: "the far quay where the ore barges from Mars's little moons unload", heart: "obelisk",
b: [{ t: "dock", n: "The Ore Barge Dock", d: "barges from Phobos and Deimos unload here" }, { t: "forge", n: "The Smelting Hall", d: "moon dust smelted into iron for the harbour" }, { t: "farm", n: "The Hydroponic Bays", d: "potatoes and lettuce grown for the crossing" }, { t: "workshop", n: "The Fab Halls", d: "parts made for ships and settlements" }],
gather: [{ k: "ow_ar_phobos", n: "Phobos regolith on the barge", v: "scoop the grey dust", look: "coal" }, { k: "gr_ares_deimos", n: "Deimos regolith in the hoppers", v: "scoop the pale dust", look: "ore" }, { k: "ow_ar_potato", n: "Hydroponic potatoes", v: "lift the potatoes", look: "crop" }, { k: "ow_ar_greens", n: "Lettuce under the lamps", v: "cut a head of lettuce", look: "crop" }] },
trade: { say: "The Red Exchange buys what the Phobos Quay brings in and sells supplies for the crossing.", sells: ["ow_ration", "ow_pouch", "cr_parts"], buys: ["ow_ar_phobos", "gr_ares_deimos", "ow_ar_potato", "ow_ar_greens", "ow_ma_basalt", "ow_ma_o2", "cr_ore"] },
mats: [{ k: "gr_ares_deimos", n: "Deimos regolith", e: "🌕", p: 7 }],
lore: [["The Gateway", "The Ares Gateway is the Space Corp's station over Mars, built for the settlers. Vermilion Harbour grew around its docking bay as more and more ships came."],
["Windows to Mars", "Earth and Mars line up for the shortest crossing only about every 26 months. When a window opens, the harbour fills with ships, and the Berth Road is the busiest street in the Solar System."],
["The Hall of the Red Approach", "Every lander that goes down to Mars is cleared from the Approach Bridge. The Descent Log holds the story of every landing, good and bumpy."],
["The little moons", "Phobos and Deimos are small, dark and lumpy, perhaps captured asteroids. The harbour's ore barges bring their dust to the Smelting Hall."],
["The Claims Court", "A settler's land on Mars is claimed here, in front of a judge, before they ever land. The claims are sealed and sent down to the Settlers' Assembly in New Jezero."],
["The last night", "Before a descent, settlers spend a night at the Last Berth. It is a tradition to leave a note on its wall for the next settler."]],
lectures: [{ t: "The launch window", x: "The best time to fly from Earth to Mars comes only about every 26 months, when the planets are lined up for the shortest, cheapest path. A crossing then takes about seven months.", q: ["How often does a good launch window to Mars open?", ["About every 26 months", "Every week", "Every ten years"], 0] },
{ t: "Phobos, the fast moon", x: "Phobos goes round Mars about three times a day, faster than Mars spins, so from the ground it rises in the west. It is slowly spiralling inwards and will one day break apart or crash.", q: ["From the surface of Mars, where does Phobos rise?", ["In the west", "In the east", "It never rises"], 0] },
{ t: "Seven minutes", x: "Landing on Mars takes about seven minutes from the top of the air to the ground: heat shield, parachute, then rockets. The Perseverance rover landed this way in February 2021.", q: ["Roughly how long does a Mars landing take?", ["About seven minutes", "About seven hours", "About seven days"], 0] },
{ t: "The tallest volcano", x: "Olympus Mons on Mars is the tallest volcano in the Solar System, about two and a half times the height of Mount Everest above sea level.", q: ["Where is the tallest volcano in the Solar System?", ["On Mars", "On Earth", "On Venus"], 0] },
{ t: "Food in space", x: "The first food grown in space and eaten by astronauts on the ISS was red romaine lettuce, in 2015. Plants grown in water under lamps are called hydroponics.", q: ["What is growing plants in water instead of soil called?", ["Hydroponics", "Geology", "Astronomy"], 0] }],
persona: "Vermilion Harbour is the great docking city of the Ares Gateway, the Space Corp's station over Mars built for the settlers. Ships from Earth dock here and landers go down to Mars from here; Phobos and Deimos ore comes in by barge. The Hall of the Red Approach clears every descent. People are busy, hopeful settlers and seasoned crew. Real Mars science is welcome."
});
grRealm({ id: "space", parent: { w: "space" }, parentName: "open space", name: "Geodia", short: "Geodia",
blurb: "a great city hollowed out of an asteroid in the belt, spun so its people have weight",
intro: "Deep in the belt, a whole asteroid has been hollowed out and set spinning, and inside it lies Geodia: streets terraced up the curving rock, lit by long lamps down the middle. Its Hall of Claims stands above the Plaza of the Drift, where every miner's claim in the belt is recorded.",
style: "future", layout: "cavern", tone: 410, gateCol: 0xC8D8F0,
env: { top: 0x0A0A0E, low: 0x1E1C22, fog: 0x1E1C22, fogD: 0.0035, sun: 0.4, sunCol: 0xFFF0E0, sunDir: [0.2, 1, 0.1], hemi: 0.9, hemiCol: 0xD8D4CC, hemiGround: 0x3A3630, groundCol: 0x5A5650, groundCol2: 0x7E7870, groundTex: "concrete", mtn: 0x4A4642, mtnTex: "stone", rock: 0x4A4640, roof: 72, glowCol: 0xBFD8FF, glowKit: "crystalcluster" },
gate: { n: "The Claim Lock", d: "the docking lock in the asteroid's pole, into the hollow city", back: "The Claim Lock" },
warden: ["Mags Okonkwo", "Keeper of the Claim Lock", "the keeper of the pole lock, a retired miner who has worked claims on a hundred rocks and still carries a lump of nickel-iron for luck"],
names: ["Mags", "Jory", "Anneke", "Tunde", "Pell", "Rosa", "Eamon", "Sigrun", "Dex", "Nilufar", "Bartek", "Ottoline", "Jonah", "Ama", "Lars", "Vesna"],
surnames: ["Okonkwo", "Varley", "Strom", "Adeyemi", "Kask", "Ibarra", "Rourke", "Halvorsen", "Petrakis", "Mwangi", "Duval", "Kettering"],
citizenTitles: ["Hollow resident", "Claim miner", "Comet hauler", "Ring Run pilot", "Space Corp surveyor"], guardTitle: "Claims warden",
plaza: { n: "The Plaza of the Drift", d: "the great square at the bottom of the hollow, where the rock curves up on every side", heart: "orrery" }, avenue: { n: "The Long Lamp Way" },
palace: { t: "palace", n: "The Hall of Claims", d: "where the Belt Assembly records every claim and settles every quarrel over rock", hall: "The Hall of the Registry",
seat: ["throne", "The Registrar-General's Chair", 0],
staff: [["Registrar-General Nilufar Adeyemi", "Registrar-General of the Belt", "the Registrar-General, fair and unshakeable, who has never once lost a claim record"], ["Bartek Kask", "Chief Surveyor"], ["Ottoline Varley", "Keeper of the Registry"]],
rooms: [["council", "The Belt Assembly Chamber", 1], ["banquet", "The Prospectors' Feast Hall", 0], ["suite", "The Registrar-General's Rooms", 1], ["treasury", "The Metal Treasury", 1], ["gallery", "The Gallery of Famous Rocks", 0],
["archive", "The Claims Registry", 1], ["kitchen", "The Hall Kitchens", 1], ["armoury", "The Claims Wardens' Room", 1], ["map", "The Belt Chart Room", 0], ["lounge", "The Miners' Salon", 0], ["court", "The Claims Tribunal", 0], ["suite", "The Guest Rooms", 0]] },
wards: [
{ t: "academy", n: "The School of the Belt", d: "geology, orbits and safe mining in space", staff: [["Master Sigrun Halvorsen", "Master of the School", "the master, who can tell an asteroid's kind by its colour from a hundred kilometres"]] },
{ t: "guild", n: "The Prospectors' Guild", d: "the miners who work the claims in the belt" },
{ t: "forge", n: "The Nickel-Iron Foundry", d: "metal from the belt smelted and cast" },
{ t: "market", n: "The Drift Exchange", d: "ore, ice and goods traded; Pip-Tullik's cousins drop by" },
{ t: "bank", n: "The Bank of the Belt", d: "where claim shares and miners' pay are kept" },
{ t: "hospital", n: "The Hollow Infirmary", d: "healers for miners and haulers" },
{ t: "hangar", n: "The Ring Run Hangar", d: "the racers' sheds for the Ring Run" },
{ t: "inn", n: "The Lucky Lump", d: "the miners' inn, where every table is a slab of nickel-iron" }
],
arena: { n: "The Ring Run Practice Hall", d: "train for the Ring Run inside the rock", about: "Six marker rings glow round the hall, one at a time. Run to each as it lights gold, as the racers fly the real course out past the station." },
homes: { n: "The Terraced Galleries", d: "homes cut into the curving rock walls" },
tunnel: { n: "The Polar Tube", kind: "tube" },
deep: { n: "The Far Workings", d: "the mines, ice works and docks at the asteroid's far end", heart: "obelisk",
b: [{ t: "mine", n: "The Metal Seam Mine", d: "nickel-iron cut from the asteroid's own heart" }, { t: "workshop", n: "The Comet Ice Works", d: "comet ice melted into water and air" }, { t: "dock", n: "The Hauler Docks", d: "where ore haulers bring loads in from distant claims" }, { t: "farm", n: "The Rock Gardens", d: "food grown in crushed chondrite and comet water" }],
gather: [{ k: "ow_sp_nife", n: "A nickel-iron seam", v: "cut the metal", look: "ore" }, { k: "ow_sp_chondrite", n: "Dark chondrite rubble", v: "scoop the crumbly rock", look: "coal" }, { k: "ow_sp_comet", n: "Comet ice in the cold store", v: "take a block of comet ice", look: "ice" }, { k: "gr_space_pgm", n: "Bright grains in the sluice", v: "pan out the grains", look: "crystal" }] },
trade: { say: "The Drift Exchange buys what the Far Workings bring in, and sometimes Pip-Tullik's cousins leave a few curiosities.", sells: ["ow_tk_cake", "cr_parts", "ow_water"], buys: ["ow_sp_nife", "ow_sp_chondrite", "ow_sp_comet", "gr_space_pgm", "cr_ore", "ow_au_scrap"] },
mats: [{ k: "gr_space_pgm", n: "Platinum-group grit", e: "✨", p: 40 }],
lore: [["The hollow rock", "Geodia was a metal-rich asteroid. Miners cut its heart out for metal, sealed the cavern, filled it with air and set the whole rock spinning, so the floor of the hollow feels like ground."],
["The Belt Assembly", "Every claim in the belt is recorded in the Hall of Claims. The Belt Assembly settles quarrels over rock, and the rule is old and simple: whoever records a claim first, and works it fairly, keeps it."],
["The claims", "The Space Corp's mining claims in the belt are worked from Geodia: metal rocks for nickel and iron, dark crumbly rocks for the water locked in their clay."],
["The comet", "Comet ice comes in on haulers from the comet that passes through. Melted, it is water; split, it is air to breathe and fuel to fly."],
["The Ring Run", "The Ring Run is a race through marker rings out beyond Station Aurora. Its pilots train in the hangar here, and the winners' names are cut into the rock above the Plaza."],
["The green trader", "Pip-Tullik the trader is famous here. The miners say Pip has cousins all over the belt, and that each of them bakes spice cake that fizzes."]],
lectures: [{ t: "Mostly empty", x: "The asteroid belt between Mars and Jupiter is mostly empty space. Its asteroids are usually hundreds of thousands of kilometres apart, and spacecraft have flown through it safely.", q: ["What is the asteroid belt mostly made of?", ["Empty space", "Tightly packed rocks", "Gas clouds"], 0] },
{ t: "Not very heavy", x: "All the asteroids in the belt together have only about three per cent of the mass of our Moon. The biggest, the dwarf planet Ceres, holds about a quarter of it.", q: ["What is the largest object in the asteroid belt?", ["Ceres", "Pluto", "Phobos"], 0] },
{ t: "Metal worlds", x: "Some asteroids are made mostly of nickel and iron, like the iron meteorites that fall to Earth. NASA's Psyche spacecraft, launched in 2023, is on its way to a large metal-rich asteroid.", q: ["What are metal-rich asteroids mostly made of?", ["Nickel and iron", "Gold and silver", "Ice"], 0] },
{ t: "Water in the rocks", x: "Carbonaceous chondrites are dark asteroids rich in carbon, with water locked inside clay minerals. Samples brought home from the asteroids Ryugu and Bennu contain such clays.", q: ["Where is water found in a carbonaceous chondrite?", ["Locked in clay minerals", "In open lakes", "It has none"], 0] },
{ t: "Tails away from the Sun", x: "A comet is a lump of ice and dust. Near the Sun its ice turns to gas, and the sunlight and solar wind push its tails so they always point away from the Sun.", q: ["Which way does a comet's tail point?", ["Away from the Sun", "Towards the Sun", "Always behind it"], 0] }],
persona: "Geodia is a city hollowed out of a metal-rich asteroid in the belt between Mars and Jupiter, spun so its people have weight. The Belt Assembly records every mining claim in the Hall of Claims. Miners work the Space Corp's claims, haulers bring comet ice, and Ring Run pilots train here; Pip-Tullik the trader and the trader's cousins are well known. People are tough, cheerful and fair. Real asteroid and comet science is welcome."
});
grRealm({ id: "neverland", parent: { w: "neverland" }, parentName: "Neverland", name: "Aerieholm", short: "Aerieholm",
blurb: "the island capital of flight, built up the cliffs and treetops above the green lagoon",
intro: "Towers of pale stone and living wood climb the island's cliffs, joined by rope walks and flying stairs. At the top of the terraces stands the Palace of the Open Sky, where the island's flyers keep their council.",
style: "fae", layout: "open", tone: 560, gateCol: 0xC8F0B0,
env: { top: 0x5AA8E0, low: 0xBEE4F0, fog: 0xC8E8EC, fogD: 0.0010, sun: 1.0, sunCol: 0xFFF0D0, sunDir: [0.5, 0.7, -0.4], hemi: 0.75, hemiCol: 0xD8F0FF, hemiGround: 0x4A6A3A, groundCol: 0x4E7A3A, groundCol2: 0x8AA860, groundTex: "grass", mtn: 0x5A7A4A, mtnTex: "grass" },
gate: { n: "The Windward Arch", d: "an arch of woven branches where the island's breeze always blows inward", back: "The Windward Arch" },
warden: ["Marlo Fenwhistle", "Keeper of the Windward Arch", "the keeper of the arch, a grey-haired flyer who has caught more falling visitors than anyone alive"],
names: ["Marlo", "Sorrel", "Kestrin", "Imogen", "Talan", "Pippa", "Rowan", "Elowen", "Dashiell", "Wren", "Juniper", "Corin", "Linnet", "Arlo", "Fable", "Tamsin"],
surnames: ["Fenwhistle", "Brightwing", "Larkspur", "Tidewell", "Hollowell", "Swiftbourne", "Mossgrove", "Featherby", "Coraldine", "Windhallow", "Pennywhirl", "Skye"],
citizenTitles: ["Island flyer", "Lagoon diver", "Rope-walk builder", "Dust gatherer", "Visiting voyager"], guardTitle: "Sky warden",
plaza: { n: "The Lagoon Steps", d: "a wide stair of terraces running down to the warm green water", heart: "tree" }, avenue: { n: "The Gull Road" },
palace: { t: "palace", n: "The Palace of the Open Sky", d: "the council of flyers that keeps the island and its winds", hall: "The Hall of Updrafts",
seat: ["throne", "The Perch of the Wind-Speaker", 0],
staff: [["Wind-Speaker Oriel Brightwing", "Wind-Speaker of Aerieholm", "the chosen speaker of the island's flyers, laughing and quick, who never takes the stairs when she can fly"], ["Talan Larkspur", "Clerk of the Winds"], ["Juniper Tidewell", "Steward of the Palace"]],
rooms: [["council", "The Council of the Winds", 1], ["banquet", "The Coconut Feast Hall", 0], ["suite", "The Wind-Speaker's Eyrie", 1], ["treasury", "The Pearl Treasury", 1], ["gallery", "The Gallery of First Flights", 0],
["library", "The Library of Maps and Tides", 0], ["kitchen", "The Cliff Kitchens", 1], ["armoury", "The Sky Wardens' Room", 1], ["office", "The Office of Breezes", 1], ["lounge", "The Sunset Salon", 0], ["map", "The Island Survey Room", 0], ["suite", "The Voyagers' Rooms", 0]] },
wards: [
{ t: "academy", n: "The School of Flight", d: "take-offs, landings, loops and the science of the air", staff: [["Mistress Elowen Featherby", "Mistress of Flight", "the head of the flying school, patient, precise and quietly proud that none of her pupils has ever landed in the lagoon by accident"]] },
{ t: "guild", n: "The Rope-Walkers' Guild", d: "who spin the rope bridges and keep the treetop walks safe" },
{ t: "temple", n: "The Hall of the Second Dawn", d: "a quiet hall of wind chimes where the island gives thanks for the morning" },
{ t: "market", n: "The Driftwood Bazaar", d: "shells, pearls, feathers and coconuts traded round the old wreck" },
{ t: "library", n: "The Story Tower", d: "every tale the island tells, written down before it can be forgotten" },
{ t: "hospital", n: "The Soft Landing", d: "healers for bumps, bruises and the odd sprained wing-arm" },
{ t: "theatre", n: "The Shell Theatre", d: "plays and songs under a roof shaped like a great conch" },
{ t: "observatory", n: "The Star-Steering House", d: "where flyers learn to find their way home by the stars" }
],
arena: { n: "The Updraft Ring", d: "the flyers' training ground on the high cliff", about: "Six posts stand round the ring on the cliff top. Run to each as it lights gold, with the sea wind at your back." },
homes: { n: "The Treetop Rows", d: "homes built into the boughs of the great island trees" },
tunnel: { n: "The Coral Causeway", kind: "bridge" },
deep: { n: "The Outer Cays", d: "the reef islands where the divers, dust gatherers and boatwrights work", heart: "crystal",
b: [{ t: "dock", n: "The Reef Harbour", d: "where the outrigger boats and the pearl divers come in" }, { t: "workshop", n: "The Boatwrights' Sheds", d: "outriggers shaped from driftwood and palm" }, { t: "farm", n: "The Palm Groves", d: "coconuts, breadfruit and the island's gardens" }, { t: "lab", n: "The Dust House", d: "where fairy dust is sifted, weighed and studied" }],
gather: [{ k: "hx_pearl", n: "An oyster bed off the cay", v: "dive for a pearl", look: "fish" }, { k: "hx_shell", n: "Shells on the reef sand", v: "pick up shells", look: "crop" }, { k: "hx_coconut", n: "Coconuts under the palms", v: "gather coconuts", look: "crop" }, { k: "gr_neverland_dustglass", n: "Dust-glass on the cliff", v: "chip off dust-glass", look: "crystal" }] },
trade: { say: "The Driftwood Bazaar buys what the Outer Cays bring in and sells the island's own goods.", sells: ["hx_coconut", "cr_cloth", "gr_neverland_dustglass"], buys: ["hx_pearl", "hx_shell", "hx_feather", "hx_coconut", "hx_dust", "cr_wood", "gr_neverland_dustglass"] },
lore: [["The founding of Aerieholm", "The first flyers built only nests of rope in the tallest trees. As more came, they cut terraces into the cliffs below, and the nests became towers, and the towers became a city that looks down on the whole island."],
["The Council of the Winds", "Every flyer who has crossed the island without touching the ground may speak in the Council. They choose a Wind-Speaker, who listens more than she talks."],
["The island's breeze", "The breeze at the Windward Arch never blows outward. Islanders say the island likes its visitors and would rather keep them; the wardens make sure everyone who wants to leave can."],
["Fairy dust", "The dust gathered on the island's high places makes flying easier for those who believe they can fly. The Dust House studies it, and still cannot say how it works."],
["The Outer Cays", "Beyond the Coral Causeway lie the reef islands: oyster beds, palm groves and the sheds where outriggers are built from wood the sea brings in."],
["The Story Tower", "Islanders have a saying: a tale not told is a tale lost. The Story Tower keeps every tale written down, from the smallest joke to the longest voyage."]],
lectures: [{ t: "How a wing lifts", x: "A wing is shaped and tilted so that it turns the air flowing past it downward. As the wing pushes air down, the air pushes the wing up: that push is called lift.", q: ["What does a wing do to the air to make lift?", ["Turns it downward", "Heats it", "Stops it"], 0] },
{ t: "Light bones", x: "Many birds have hollow bones, strengthened inside by thin struts. They are light but strong, which helps a bird get off the ground.", q: ["Why do many birds have hollow bones?", ["To be light but strong", "To store water", "To keep warm"], 0] },
{ t: "The travelling coconut", x: "A coconut's thick, fibrous husk lets it float. Coconuts can drift across the sea for weeks and still sprout when they wash up on a beach.", q: ["Why can a coconut cross the sea?", ["Its husk lets it float", "It is carried by birds", "It sinks and rolls"], 0] },
{ t: "How a pearl grows", x: "When something gets inside an oyster's shell, the oyster coats it in layer after layer of nacre, the shiny lining of its shell. Over years, the layers build into a pearl.", q: ["What is a pearl made of?", ["Layers of nacre", "Sand", "Coral"], 0] },
{ t: "Pink birds", x: "Flamingos are pink because of pigments called carotenoids in the shrimp and algae they eat. Without them, their feathers grow pale.", q: ["What makes flamingos pink?", ["Pigments in their food", "Sunburn", "Their blood"], 0] }],
persona: "Aerieholm is the island capital of Neverland, a city of towers and treetop walks above the green lagoon, governed by the Council of the Winds and its Wind-Speaker. Its people love flying, stories, the sea and fairy dust; they are cheerful and welcoming. They are the island's own people and do not talk about any famous storybook characters.",
mats: [{ k: "gr_neverland_dustglass", n: "Dust-glass", e: "🔮", p: 14 }]
});
grRealm({ id: "sea", parent: { w: "sea" }, parentName: "the Endless Sea", name: "Saltcrown", short: "Saltcrown",
blurb: "the great harbour city of the Endless Sea, spread across a ring of isles joined by bridges",
intro: "White walls and red roofs rise over a ring of isles, their harbours full of masts. The Admiralty of the Tides stands on the highest isle, its beacon tower steady above the water.",
style: "classical", layout: "isles", tone: 430, gateCol: 0xA8E0F0,
env: { top: 0x3E86C8, low: 0xA8D4E8, fog: 0xB0D8E8, fogD: 0.0009, sun: 1.0, sunCol: 0xFFF4E0, sunDir: [0.6, 0.6, -0.3], hemi: 0.8, hemiCol: 0xC8E4F4, hemiGround: 0x4A5A6A, cloud: 0x2E6E9A, cloud2: 0x1A4A72 },
gate: { n: "The Mooring Stair", d: "a stone stair up from the water to the harbour city", back: "The Mooring Stair" },
warden: ["Bastien Coldwater", "Master of the Mooring Stair", "the harbour master's right hand, who greets every boat and knows every captain by her flag"],
names: ["Bastien", "Nerys", "Caspar", "Ottilie", "Hale", "Marisa", "Torvald", "Isla", "Dorian", "Calla", "Ewan", "Selka", "Fintan", "Rosalind", "Jory", "Maelle"],
surnames: ["Coldwater", "Harrowgate", "Brineholt", "Saltash", "Merrow", "Keelson", "Wavecrest", "Penhallow", "Strand", "Ashcombe", "Rookhaven", "Tidemark"],
citizenTitles: ["Harbour citizen", "Deck hand", "Net-mender", "Salt merchant", "Island captain"], guardTitle: "Harbour guard",
plaza: { n: "The Square of Anchors", d: "the great square by the inner harbour, paved with the city's old anchors", heart: "fountain" }, avenue: { n: "The Rope Walk" },
palace: { t: "palace", n: "The Admiralty of the Tides", d: "the council of captains that keeps the sea lanes and the harbours", hall: "The Hall of Charts",
seat: ["throne", "The High Admiral's Seat", 0],
staff: [["High Admiral Nerys Harrowgate", "High Admiral of Saltcrown", "the elected first captain of the city, weathered, fair and never happier than at a ship's wheel"], ["Caspar Keelson", "Secretary of the Admiralty"], ["Ottilie Saltash", "Keeper of the Charts"]],
rooms: [["council", "The Council of Captains", 1], ["banquet", "The Hall of the Homecoming", 0], ["suite", "The Admiral's Quarters", 1], ["treasury", "The Harbour Treasury", 1], ["gallery", "The Gallery of Ships", 0],
["library", "The Logbook Library", 0], ["kitchen", "The Admiralty Galley", 1], ["armoury", "The Harbour Guard Room", 1], ["office", "The Office of Lights and Buoys", 1], ["lounge", "The Captains' Salon", 0], ["map", "The Great Chart Room", 0], ["suite", "The Visiting Captains' Rooms", 0]] },
wards: [
{ t: "academy", n: "The Navigation College", d: "stars, charts, tides and the handling of ships", staff: [["Master Torvald Brineholt", "Master of the College", "a retired navigator who can find the city in fog by the sound of its bells"]] },
{ t: "guild", n: "The Sailmakers' Guild", d: "who cut and sew the canvas for every ship in the harbour" },
{ t: "market", n: "The Fish Quay", d: "the catch of the morning, salt, olives and sponges" },
{ t: "bank", n: "The House of Cargo Bonds", d: "where voyages are insured and cargoes paid for" },
{ t: "temple", n: "The Chapel of Fair Winds", d: "where sailors light a lamp before a long voyage" },
{ t: "inn", n: "The Bell and Bowline", d: "rooms, hot food and stories for crews ashore" },
{ t: "hospital", n: "The Seafarers' Infirmary", d: "healers who know scurvy, sunstroke and rope burns" },
{ t: "observatory", n: "The Lighthouse Observatory", d: "the beacon above and the star telescope below" }
],
arena: { n: "The Rigging Yard", d: "the deck hands' training ground", about: "Six posts stand round the yard among the practice masts. Run to each as it lights gold, quick as a crew going about." },
homes: { n: "The Harbour Terraces", d: "tall narrow homes stacked up the isles above the water" },
tunnel: { n: "The Long Pontoon", kind: "bridge" },
deep: { n: "The Far Isles", d: "the shipyards, salt pans, sponge beds and timber sheds of the outer islands", heart: "obelisk",
b: [{ t: "dock", n: "The Great Shipyard", d: "where the city's ships are built and launched" }, { t: "workshop", n: "The Rope Works", d: "long sheds where rope is twisted from fibre" }, { t: "farm", n: "The Salt Pans", d: "shallow pools where the sun dries sea water to salt" }, { t: "guild", n: "The Divers' Lodge", d: "sponge and pearl divers of the far reefs" }],
gather: [{ k: "hx_salt", n: "The salt pans", v: "rake salt", look: "crop" }, { k: "hx_fish", n: "The fishing jetty", v: "fish off the jetty", look: "fish" }, { k: "hx_sponge", n: "Sponges on the far reef", v: "gather sponges", look: "fish" }, { k: "cr_wood", n: "The shipyard's offcuts", v: "gather timber", look: "wood" }] },
trade: { say: "The Fish Quay buys what the Far Isles bring in and sells the harbour's goods.", sells: ["hx_salt", "hx_olive", "hx_fish", "cr_cloth", "cr_wood"], buys: ["hx_fish", "hx_tunny", "hx_salt", "hx_sponge", "hx_pearl", "hx_shell", "cr_wood"] },
lore: [["The founding of Saltcrown", "Sailors caught in a long calm tied their ships together in the lee of a ring of isles and waited for the wind. By the time it came, they had built a quay, and many of them never left."],
["The Admiralty", "Every captain who has sailed out of sight of land and brought her ship home has a voice in the Council of Captains. They choose a High Admiral, who keeps the sea lanes and the lights."],
["The beacon", "The beacon on the highest isle burns steady all night, every night. No ship bound for Saltcrown has been lost while it has burned."],
["The Far Isles", "Across the Long Pontoon lie the outer islands: the Great Shipyard, the salt pans, the rope works and the lodge of the divers."],
["Ship's bells", "Ships ring their bells every half hour of a watch, one to eight strokes. The whole harbour rings them together at noon."],
["The sea that goes on", "Captains say the Endless Sea has no far shore, only more islands. The Navigation College keeps a chart of every one ever found."]],
lectures: [{ t: "Why the tides turn", x: "Tides are raised mainly by the Moon's gravity pulling on Earth's oceans, with help from the Sun. Most coasts have two high tides a day, about 12 hours and 25 minutes apart.", q: ["What mainly causes the tides?", ["The Moon's gravity", "The wind", "Rivers"], 0] },
{ t: "Knots", x: "A ship's speed is measured in knots. One knot is one nautical mile an hour, and a nautical mile is 1,852 metres.", q: ["How long is a nautical mile?", ["1,852 metres", "1,000 metres", "5,280 feet"], 0] },
{ t: "Sailing into the wind", x: "No sailing ship can sail straight into the wind. It sails at an angle to the wind and turns back and forth, zigzagging upwind: this is called tacking.", q: ["How does a sailing ship go upwind?", ["By tacking in a zigzag", "By sailing straight at it", "By rowing only"], 0] },
{ t: "Salt in the sea", x: "Sea water is about 3.5% salt by weight, mostly sodium chloride. Leave it in shallow pans in the sun and the water evaporates, leaving the salt behind.", q: ["About how salty is sea water?", ["About 3.5%", "About 35%", "About 0.1%"], 0] },
{ t: "Steering by the stars", x: "In the northern half of the world, the Pole Star stays almost still in the sky over the North Pole. Its height above the horizon is close to your latitude.", q: ["What does the Pole Star's height tell a navigator?", ["Their latitude", "The time", "The depth of the sea"], 0] }],
persona: "Saltcrown is the great harbour city of the Endless Sea, built on a ring of isles joined by bridges and governed by the Admiralty of the Tides and its High Admiral. Its people are sailors, shipwrights, salt-makers and divers; they talk of tides, weather and voyages. Real sea science is welcome. They do not retell any old epic poems.",
mats: []
});
grRealm({ id: "northpole", parent: { w: "northpole" }, parentName: "the North Pole", name: "Starhearth", short: "Starhearth",
blurb: "the hidden capital of the North, a city of lantern-lit halls and workshops under the aurora",
intro: "Steep roofs heavy with snow and windows glowing gold line the streets of the North's hidden capital. The Hall of the Long Night stands on its terraces, where the workshops are planned a year ahead.",
style: "ice", layout: "open", tone: 540, gateCol: 0xD8F0FF,
env: { top: 0x0E1A30, low: 0x2E3E58, fog: 0x34445E, fogD: 0.0011, sun: 0.45, sunCol: 0xFFE8C8, sunDir: [0.3, 0.25, -0.6], hemi: 0.75, hemiCol: 0xB8CCE8, hemiGround: 0x4A5260, stars: 1, groundCol: 0xA8B4C0, groundCol2: 0xBEC8D2, groundTex: "snow", mtn: 0x8A98A8, mtnTex: "snow" },
gate: { n: "The Lantern Gate", d: "a gate of carved pine hung with steady lanterns, half buried in snow", back: "The Lantern Gate" },
warden: ["Odvar Frostmantle", "Keeper of the Lantern Gate", "the elf who keeps the gate lanterns trimmed and greets every visitor with a cup of something hot"],
names: ["Odvar", "Tindra", "Pellam", "Sigrid", "Fennick", "Liesl", "Halvard", "Mistle", "Corbin", "Ylva", "Jesper", "Hedda", "Rimmel", "Saga", "Tobin", "Alva"],
surnames: ["Frostmantle", "Pinebough", "Embersole", "Woolwick", "Snowdrift", "Candlewright", "Belltower", "Hollyfield", "Starlace", "Icewharf", "Tinsley", "Northcott"],
citizenTitles: ["Workshop elf", "Toymaker", "Sleigh-wright", "Wrapping hand", "Reindeer herder"], guardTitle: "Lantern warden",
plaza: { n: "The Square of the First Snow", d: "the great square where the year's first snow is welcomed with songs", heart: "tree" }, avenue: { n: "The Avenue of Lanterns" },
palace: { t: "palace", n: "The Hall of the Long Night", d: "the council that plans the year's making and the great winter round", hall: "The Hall of Plans",
seat: ["throne", "The Chair of the Winter Steward", 0],
staff: [["Winter Steward Tindra Pinebough", "Winter Steward of Starhearth", "the elf who keeps the great calendar of the North, brisk, kind and never seen without a list"], ["Pellam Woolwick", "Keeper of the Calendar"], ["Liesl Embersole", "Steward of the Hall"]],
rooms: [["council", "The Council of Workshops", 1], ["banquet", "The Midwinter Feast Hall", 0], ["suite", "The Steward's Rooms", 1], ["treasury", "The Store of Bells and Ribbon", 1], ["gallery", "The Gallery of Old Toys", 0],
["library", "The Library of Letters", 0], ["kitchen", "The Gingerbread Kitchens", 1], ["armoury", "The Lantern Wardens' Room", 1], ["office", "The Office of Routes", 1], ["lounge", "The Fireside Salon", 0], ["map", "The Map of Every Chimney", 0], ["suite", "The Visitors' Lofts", 0]] },
wards: [
{ t: "academy", n: "The Toymakers' College", d: "woodwork, clockwork, sewing and the craft of a good toy", staff: [["Master Halvard Candlewright", "Master of the College", "a toymaker of three hundred winters who says a toy is not finished until it has been played with"]] },
{ t: "guild", n: "The Guild of Wrappers and Bow-Tiers", d: "paper, ribbon and the perfect bow" },
{ t: "workshop", n: "The Great Clockwork Works", d: "springs, gears and wind-up toys by the thousand" },
{ t: "library", n: "The Hall of Old Letters", d: "every letter ever sent north, kept dry and sorted" },
{ t: "inn", n: "The Warm Mitten", d: "cocoa, soup and a bed by the stove" },
{ t: "hospital", n: "The House of Warm Hands", d: "healers of chilblains, colds and tired elves" },
{ t: "theatre", n: "The Snowlight Theatre", d: "carols, puppet plays and the midwinter pageant" },
{ t: "observatory", n: "The Aurora House", d: "where the northern lights and the long night's stars are watched" }
],
arena: { n: "The Sledding Green", d: "the herders' and sleigh-wrights' training ground", about: "Six posts stand round the snowy green. Run to each as it lights gold; the snow is soft if you tumble." },
homes: { n: "The Snug Rows", d: "steep-roofed cottages, each with a fire always lit" },
tunnel: { n: "The Snow Tunnel", kind: "tunnel" },
deep: { n: "The Far Workshops", d: "the bell-metal pits, the candle works, the woodlots and the ice wharf beyond the hills", heart: "flame",
b: [{ t: "mine", n: "The Bell-Metal Pits", d: "tin and copper dug for the sleigh bells" }, { t: "workshop", n: "The Candle Works", d: "wax melted, dipped and set for every window in the North" }, { t: "farm", n: "The Reindeer Pastures", d: "the herds, their moss and the herders' barns" }, { t: "dock", n: "The Ice Wharf", d: "where ice is sawn from the frozen sea" }],
gather: [{ k: "gr_northpole_bellmetal", n: "A bell-metal seam", v: "dig bell-metal ore", look: "ore" }, { k: "gr_northpole_wax", n: "The candle works' wax vats", v: "ladle out wax", look: "herb" }, { k: "gr_northpole_toywood", n: "The toymakers' woodlot", v: "cut toy timber", look: "wood" }, { k: "hx_ice", n: "Ice blocks at the wharf", v: "saw ice", look: "ice" }] },
trade: { say: "Everything made here stays in the North. The Starhearth stores trade only in the North's own goods.", sells: ["hx_ribbon", "hx_holly", "gr_northpole_wax"], buys: ["hx_pine", "hx_holly", "hx_ice", "hx_moss", "hx_ribbon", "gr_northpole_bellmetal", "gr_northpole_toywood"] },
lore: [["The founding of Starhearth", "When the village workshops grew too small for all the letters, the elves built a second town in a hidden valley over the hills. They lit a fire in its first hearth from the village fire, and it has never gone out."],
["The Hall of the Long Night", "The Council of Workshops meets in the Hall to plan the year: what is to be made, by whom, and by when. The Winter Steward keeps the great calendar, and nobody argues with it."],
["Nothing leaves", "What is made in the North stays in the North until the great winter round. Even the ribbon and the holly are traded only among the workshops."],
["The Hall of Old Letters", "Every letter that has ever come north is kept, dry and sorted, in the Hall of Old Letters. The oldest are written on birch bark."],
["The Far Workshops", "Through the Snow Tunnel lie the bell-metal pits, the candle works, the reindeer pastures and the ice wharf on the frozen sea."],
["The fire in every cottage", "Every cottage in the Snug Rows keeps a fire lit all winter. Elves say a lit hearth is a promise that someone is home."]],
lectures: [{ t: "No land at the Pole", x: "There is no land at the North Pole. It lies on sea ice floating on the Arctic Ocean, which is more than 4,000 metres deep there.", q: ["What is under the ice at the North Pole?", ["The Arctic Ocean", "Solid rock", "A frozen lake"], 0] },
{ t: "Half a year of night", x: "At the North Pole the Sun rises once a year, in March, and sets once, in September. For about six months it is light, and for about six months it is dark.", q: ["How often does the Sun set at the North Pole?", ["Once a year", "Once a day", "Never"], 0] },
{ t: "Antlers for all", x: "Reindeer are the only deer in which both males and females usually grow antlers. They shed them and grow new ones every year.", q: ["Which reindeer grow antlers?", ["Both males and females", "Only males", "Only the young"], 0] },
{ t: "The northern lights", x: "The aurora glows when charged particles from the Sun strike gases high in our atmosphere. Oxygen gives the common green light.", q: ["What gives the aurora its green light?", ["Oxygen high in the air", "Ice crystals", "Moonlight"], 0] },
{ t: "Six-sided snow", x: "Snowflakes have six arms or sides because water molecules lock together in a six-sided pattern when they freeze into ice.", q: ["Why do snowflakes have six sides?", ["Ice crystals form in a six-sided pattern", "The wind shapes them", "They are cut by the cold"], 0] }],
persona: "Starhearth is the hidden capital of the North Pole, a city of workshops, lantern-lit streets and snug cottages in a valley over the hills from the village, run by the Council of Workshops and the Winter Steward. Its people are elves and herders who make toys, bells, candles and ribbon for the great winter round. Firm rule: nothing made or kept in the North ever leaves it, so they never sell or send goods to the city of Somnucor. They use only their own names, and do not name any famous reindeer or characters from stories or films.",
mats: [{ k: "gr_northpole_bellmetal", n: "Bell-metal ore", e: "🔔", p: 10 }, { k: "gr_northpole_wax", n: "Candle wax", e: "🕯️", p: 6 }, { k: "gr_northpole_toywood", n: "Toymaker's timber", e: "🪵", p: 7 }]
});
grRealm({ id: "casino", parent: { w: "casino" }, parentName: "the Hidden Crescent", name: "Crescent Reach", short: "Crescent Reach",
blurb: "the luxury resort city that grew round the hidden casino on the Moon, all grand hotels and theatres under glass",
intro: "Under a great dome of tinted glass, hotels of silver and cream curve round a garden boulevard, Earth hanging blue above. The Palace of the Resort Commission stands on the terraces, where the city's rules are kept.",
style: "future", layout: "dome", gravity: 1.62, tone: 500, gateCol: 0xE0D0FF,
env: { top: 0x02030A, low: 0x0A0C18, fog: 0x0A0C18, fogD: 0.0005, sun: 0.9, sunCol: 0xFFF4E0, sunDir: [0.5, 0.35, -0.5], hemi: 0.65, hemiCol: 0xC8C0E0, hemiGround: 0x3A3640, stars: 1, groundCol: 0x6A6670, groundCol2: 0x8E8A94, groundTex: "floortile", mtn: 0x6E6A66, mtnTex: "concrete" },
gate: { n: "The Silver Lock", d: "a quiet airlock behind the casino that opens on the resort city", back: "The Silver Lock" },
warden: ["Severin Aubrac", "Concierge of the Silver Lock", "the head concierge, immaculate and warm, who can find any guest a table, a room or a way home"],
names: ["Severin", "Ondine", "Raoul", "Celestine", "Dmitri", "Vivienne", "Laurent", "Esther", "Cyprian", "Margaux", "Idris", "Rosalie", "Felix", "Anya", "Quentin", "Belle"],
surnames: ["Aubrac", "Delorme", "Silverton", "Marchmont", "Valcourt", "Ashgrove", "Bellweather", "Moreland", "Crestfield", "Duvall", "Ravensworth", "Lisle"],
citizenTitles: ["Resort resident", "Hotel manager", "Stage performer", "Commission inspector", "Visiting guest"], guardTitle: "Resort security officer",
plaza: { n: "The Earthlight Gardens", d: "a garden square of fountains and lawns under the blue Earth", heart: "fountain" }, avenue: { n: "The Silver Boulevard" },
palace: { t: "palace", n: "The Palace of the Resort Commission", d: "the commission that licenses the casino, inspects the hotels and keeps the resort fair and safe", hall: "The Commission Hall",
seat: ["throne", "The Chief Commissioner's Chair", 0],
staff: [["Chief Commissioner Vivienne Delorme", "Chief Commissioner of Crescent Reach", "the head of the Resort Commission, cool, exact and scrupulously fair, who keeps the casino honest and its guests safe"], ["Laurent Valcourt", "Secretary of the Commission"], ["Esther Marchmont", "Chief Inspector"]],
rooms: [["council", "The Licensing Chamber", 1], ["banquet", "The Crescent Ballroom", 0], ["suite", "The Commissioner's Residence", 1], ["treasury", "The Commission Treasury", 1], ["gallery", "The Gallery of Grand Hotels", 0],
["library", "The Library of Rules", 0], ["kitchen", "The State Kitchens", 1], ["armoury", "The Security Office", 1], ["office", "The Office of Fair Play", 1], ["lounge", "The Ambassadors' Lounge", 0], ["control", "The Watch Room", 1], ["suite", "The Guest of Honour Suite", 0]] },
wards: [
{ t: "inn", n: "The Grand Selenic Hotel", d: "the oldest and grandest of the resort's hotels", staff: [["Madame Celestine Silverton", "General Manager of the Grand Selenic", "the manager of the grandest hotel on the Moon, who remembers every guest's name and how they take their tea"]] },
{ t: "inn", n: "The Earthrise Tower Hotel", d: "three hundred rooms, every one with a window on Earth" },
{ t: "theatre", n: "The Opal Theatre", d: "musicals, magic shows and the resort's great revue" },
{ t: "theatre", n: "The Low-Gravity Ballet House", d: "dancers who leap three times higher than on Earth" },
{ t: "academy", n: "The College of Hospitality", d: "training chefs, concierges, managers and stage crews" },
{ t: "bath", n: "The Moonstone Spa", d: "warm pools, steam rooms and quiet lounges" },
{ t: "court", n: "The Commission Court", d: "where disputes between guests and the resort are fairly heard" },
{ t: "bank", n: "The Resort Bank", d: "guests' accounts, deposits and safe boxes" }
],
arena: { n: "The Starlight Running Track", d: "the staff fitness ground in one sixth of Earth's gravity", about: "Six posts stand round the track. Run to each as it lights gold, bounding in the Moon's light gravity." },
homes: { n: "The Staff Crescent", d: "the homes of the people who keep the resort running" },
tunnel: { n: "The Service Tube", kind: "tube" },
deep: { n: "The Back of the Resort", d: "the laundries, kitchens, greenhouses and staff colleges that keep the hotels running", heart: "obelisk",
b: [{ t: "workshop", n: "The Great Laundry", d: "every sheet and tablecloth in the resort, washed and pressed" }, { t: "farm", n: "The Resort Greenhouses", d: "herbs, fruit and flowers for the kitchens and the lobbies" }, { t: "academy", n: "The Staff College", d: "where porters, waiters and stage hands learn their trade" }, { t: "hangar", n: "The Guest Shuttle Yard", d: "the shuttles that bring guests up from the landing ground" }],
gather: [{ k: "ow_mo_ice", n: "The resort's ice store", v: "take a core of ice", look: "ice" }, { k: "gr_casino_herbs", n: "The greenhouse herb beds", v: "cut fresh herbs", look: "herb" }, { k: "gr_casino_linen", n: "The laundry's pressed linen", v: "fold a stack of linen", look: "crop" }, { k: "ow_mo_regolith", n: "Regolith from the dome works", v: "scoop the regolith", look: "coal" }] },
trade: { say: "The resort's stores buy supplies for the hotels and sell what the resort makes.", sells: ["cr_cloth", "cr_glass", "gr_casino_linen"], buys: ["ow_mo_ice", "ow_mo_regolith", "ow_mo_oxygen", "gr_casino_herbs", "gr_casino_linen", "cr_glass"] },
lore: [["The founding of Crescent Reach", "The Hidden Crescent's first guests had nowhere to sleep but the cage's benches. Someone built a small hotel behind the hall, then another, until a whole city of hotels and theatres had grown under its own dome."],
["The Resort Commission", "The Commission licenses the casino, inspects every hotel and kitchen, and hears complaints. Its first rule is that every guest is treated fairly and leaves safe."],
["Only for adults", "Crescent Reach, like the casino it grew round, is for grown-ups only. The Commission checks every guest at the Silver Lock."],
["The Low-Gravity Ballet", "In one sixth of Earth's gravity, dancers can leap three times as high and hang in the air for longer. The ballet house was built for them, with a stage that reaches up into the dome."],
["The Back of the Resort", "Through the Service Tube lie the laundries, greenhouses, staff colleges and shuttle yard that guests never see but could not do without."],
["The Earthlight Gardens", "The garden square is lit at night only by Earth above. When Earth is full, the lawns are bright enough to read by."]],
lectures: [{ t: "Earth in the Moon's sky", x: "From the Moon, Earth looks nearly four times as wide as the Moon looks from Earth. It goes through phases too, opposite to the Moon's phases seen from Earth.", q: ["How wide does Earth look from the Moon, compared with the Moon from Earth?", ["Nearly four times as wide", "The same", "Half as wide"], 0] },
{ t: "Earthshine", x: "When the Moon is a thin crescent, you can often see its dark part glowing faintly. That glow is sunlight reflected from Earth onto the Moon, called earthshine.", q: ["What lights the dark part of a crescent Moon?", ["Sunlight reflected from Earth", "Moon volcanoes", "Starlight only"], 0] },
{ t: "Sound needs air", x: "Sound travels as waves through air, water or solids. Outside the dome, on the airless Moon, there is no sound at all; inside, the air carries the music.", q: ["Why is there no sound outside the dome?", ["There is no air to carry it", "It is too cold", "The dome blocks it"], 0] },
{ t: "Water used again", x: "Life far from Earth depends on recycling water. The International Space Station recovers about 98% of its water, including from the crew's breath and sweat.", q: ["About how much of its water does the ISS recover?", ["About 98%", "About 10%", "None"], 0] },
{ t: "A drifting Moon", x: "The Moon is slowly moving away from Earth, about 3.8 centimetres a year. Scientists measure it by bouncing lasers off reflectors left on the Moon.", q: ["How fast is the Moon moving away from Earth?", ["About 3.8 cm a year", "About 1 km a year", "It is not moving"], 0] }],
persona: "Crescent Reach is the luxury resort city for adults that grew round the Hidden Crescent casino on the Moon: grand hotels, theatres, a spa, a hospitality college and the Resort Commission that licenses the casino and keeps guests safe. There is no gambling in the resort city itself; the games are all in the casino hall. Staff are polished, warm and professional. Real Moon science is welcome. Keep everything tasteful; nothing sexual.",
mats: [{ k: "gr_casino_herbs", n: "Greenhouse herbs", e: "🌿", p: 5 }, { k: "gr_casino_linen", n: "Pressed hotel linen", e: "🧺", p: 8 }]
});
grRealm({ id: "battle", parent: { w: "battle" }, parentName: "Ironfray", name: "Bastion Varr", short: "Bastion Varr",
blurb: "the war capital of Ironfray, a city of forges, war colleges and banners under a great citadel",
intro: "Grey walls ring after ring climb a rocky hill, banners of every company snapping above the forges. The Citadel of the Fray crowns the top, where the war of the eight fields is ruled and judged.",
style: "fire", layout: "open", tone: 360, gateCol: 0xFFB070,
env: { top: 0x4A4A58, low: 0x8A7E78, fog: 0x8A7E78, fogD: 0.0011, sun: 0.85, sunCol: 0xFFE0C0, sunDir: [0.5, 0.5, -0.5], hemi: 0.65, hemiCol: 0xC8B8A8, hemiGround: 0x3A302A, groundCol: 0x5A5048, groundCol2: 0x7A6E62, groundTex: "earth", mtn: 0x5A524C, mtnTex: "stone" },
gate: { n: "The Iron Postern", d: "a narrow iron door in the camp's wall that opens on the war capital", back: "The Iron Postern" },
warden: ["Gunnar Halvek", "Warden of the Iron Postern", "a scarred old sergeant who checks every fighter's banner and tells new arrivals where the good forges are"],
names: ["Gunnar", "Brenna", "Orsik", "Valka", "Tarquin", "Moira", "Dravin", "Sela", "Corvan", "Hilde", "Ronan", "Kesra", "Aldric", "Thessaly", "Brock", "Isolde"],
surnames: ["Halvek", "Stonecleave", "Ironwright", "Ashborne", "Grimward", "Steelhart", "Blackmoor", "Ravenshield", "Thorncrest", "Embervale", "Holloway", "Kragmoor"],
citizenTitles: ["Mercenary", "Smith", "Banner-bearer", "Quartermaster", "War scholar"], guardTitle: "Citadel guard",
plaza: { n: "The Field of Banners", d: "the great square where every company flies its colours", heart: "flame" }, avenue: { n: "The Road of Shields" },
palace: { t: "palace", n: "The Citadel of the Fray", d: "where the war of the eight fields is ruled, its rules are kept and its honours given", hall: "The Hall of Standards",
seat: ["throne", "The Marshal's Seat", 0],
staff: [["Field Marshal Brenna Stonecleave", "Field Marshal of Bastion Varr", "the marshal who rules the war capital, hard as iron and scrupulously fair, who has fought on all eight fields"], ["Orsik Ironwright", "Herald of the Citadel"], ["Valka Grimward", "Keeper of the Rolls of Honour"]],
rooms: [["council", "The Council of Captains", 1], ["banquet", "The Victors' Hall", 0], ["suite", "The Marshal's Quarters", 1], ["treasury", "The War Chest", 1], ["gallery", "The Gallery of Standards", 0],
["library", "The Library of Campaigns", 0], ["kitchen", "The Citadel Kitchens", 1], ["armoury", "The Great Armoury", 1], ["office", "The Office of Truces", 1], ["lounge", "The Captains' Lounge", 0], ["map", "The War Room of the Eight Fields", 0], ["training", "The Marshal's Practice Hall", 1]] },
wards: [
{ t: "academy", n: "The College of War", d: "tactics, strategy, the history of battle and the code of the Fray", staff: [["Master-at-Arms Tarquin Ashborne", "Master of the College", "a veteran of a hundred battles who teaches that the best fight is the one you planned"]] },
{ t: "guild", n: "The Arms Guild", d: "the guild of armourers, weaponsmiths and bowyers" },
{ t: "forge", n: "The Great Forge of Varr", d: "blades, plate and shields beaten out day and night" },
{ t: "barracks", n: "The Mercenary Halls", d: "where free companies sign on and sleep between battles" },
{ t: "court", n: "The Fray Court", d: "where the rules of the eight fields are kept and disputes are judged" },
{ t: "hospital", n: "The Hall of the Green Leaf", d: "healers who mend fighters and send them back whole" },
{ t: "market", n: "The Spoils Market", d: "salvage, hides, ore and steel bought and sold" },
{ t: "inn", n: "The Broken Lance", d: "food, beds and loud stories after the fighting" }
],
arena: { n: "The Proving Yard", d: "the fighters' training ground below the citadel", about: "Six posts stand round the yard. Run to each as it lights gold; speed wins as many fights as strength." },
homes: { n: "The Shieldwall Rows", d: "stone houses of fighters, smiths and their families" },
tunnel: { n: "The Sappers' Tunnel", kind: "tunnel" },
deep: { n: "The Foundry Ward", d: "the ore pits, the coal workings, the salvage yards and the siege workshops", heart: "flame",
b: [{ t: "mine", n: "The Ironfray Ore Pits", d: "iron ore dug for the forges" }, { t: "workshop", n: "The Siege Works", d: "engines, wagons and walker mechs built and mended" }, { t: "forge", n: "The Steel Foundry", d: "ore and coal turned into steel ingots" }, { t: "workshop", n: "The Salvage Yards", d: "war scrap sorted and melted down" }],
gather: [{ k: "cr_ore", n: "An iron ore face", v: "dig ore", look: "ore" }, { k: "cr_coal", n: "A coal seam", v: "dig coal", look: "coal" }, { k: "cr_scrap", n: "A heap of war scrap", v: "sort the scrap", look: "ore" }, { k: "gr_battle_flint", n: "A flint bed", v: "knap flint", look: "crystal" }] },
trade: { say: "The Spoils Market buys what fighters and the Foundry Ward bring in and sells what the forges need.", sells: ["cr_leather", "cr_cloth", "cr_coal"], buys: ["cr_scrap", "cr_hide", "cr_scale", "cr_ore", "cr_coal", "cr_steel", "gr_battle_flint"] },
lore: [["The founding of Bastion Varr", "The first companies to fight in Ironfray made camp on a rocky hill between the fields. Smiths came to mend their arms, healers to mend their hurts, and the camp grew walls, then more walls, until it was a city."],
["The Citadel and the Marshal", "The Field Marshal rules the war capital and keeps the code of the Fray. Captains of the great companies sit with her in council."],
["The code of the Fray", "Fight on the fields, never in the city. Spare whoever yields. Pay your debts. A fighter beaten on the field wakes whole in the camp, and nobody holds a grudge past the gate."],
["The Fray Court", "When fighters disagree about a battle, the Fray Court hears both sides and judges by the code. Its rulings are final, and its judges have all fought."],
["The Foundry Ward", "Through the Sappers' Tunnel lie the ore pits, the steel foundry, the siege works and the salvage yards that keep every army in Ironfray supplied."],
["The two great banners", "The Crimson Legion and the Azure Host each keep a hall in the city, and fly their colours on opposite sides of the Field of Banners. Free fighters fly their own."]],
lectures: [{ t: "What steel is", x: "Steel is iron with a small amount of carbon added, usually less than 2%. The carbon makes it much harder and stronger than pure iron.", q: ["What is added to iron to make steel?", ["A little carbon", "Copper", "Tin"], 0] },
{ t: "Quench and temper", x: "A smith hardens a blade by heating it and plunging it into water or oil: quenching. Hardened steel is brittle, so it is gently reheated, called tempering, to make it tougher.", q: ["Why is a quenched blade tempered?", ["To make it less brittle", "To make it shine", "To make it lighter"], 0] },
{ t: "The trebuchet", x: "A counterweight trebuchet uses a heavy falling weight to swing a long arm and fling a stone. It was one of the most powerful siege engines of the Middle Ages.", q: ["What powers a counterweight trebuchet?", ["A falling weight", "Gunpowder", "Steam"], 0] },
{ t: "Mail armour", x: "Mail is armour made of thousands of small iron rings linked together. It is flexible and stops slashing blows well.", q: ["What is mail armour made of?", ["Linked metal rings", "Leather strips", "Wooden plates"], 0] },
{ t: "Old books of strategy", x: "Some of the oldest books on strategy were written in China more than 2,000 years ago. Their main lesson still holds: know yourself and know your opponent.", q: ["How old are some of the oldest books on strategy?", ["More than 2,000 years", "About 100 years", "About 500 years"], 0] }],
persona: "Bastion Varr is the war capital of Ironfray, the battle world for adults: a walled city of forges, war colleges, the Arms Guild, mercenary halls and the Fray Court, under the Citadel of the Fray and its Field Marshal. Fighting happens only on the eight fields, never in the city. People here are tough, proud and fair, and talk of tactics, weapons and old battles without gore.",
mats: [{ k: "gr_battle_flint", n: "Knapped flint", e: "🪨", p: 5 }]
});
grRealm({ id: "greenwold", parent: { w: "greenwold" }, parentName: "the Greenwold", name: "Harrowmead", short: "Harrowmead",
blurb: "the grand market town and seat of the Greenwold, all gabled halls, orchards and market squares",
intro: "Timbered halls and thatched barns climb a gentle hill among orchards and hedgerows. The Moot Hall of the Greenwold stands at the top, where the growers meet to plan the seasons.",
style: "timber", layout: "open", tone: 470, gateCol: 0xC8E8A0,
env: { top: 0x6AA8D8, low: 0xC8E0D0, fog: 0xC8DCC8, fogD: 0.0010, sun: 1.0, sunCol: 0xFFF0D0, sunDir: [0.5, 0.7, -0.4], hemi: 0.75, hemiCol: 0xD8ECD8, hemiGround: 0x4A5A30, groundCol: 0x5A7E3A, groundCol2: 0x8AA45A, groundTex: "grass", mtn: 0x5A7A48, mtnTex: "grass" },
gate: { n: "The Hedge Gate", d: "a gate in an old hawthorn hedge, thick with blossom or berries in their season", back: "The Hedge Gate" },
warden: ["Wilfred Applegarth", "Keeper of the Hedge Gate", "a cheerful hedge-layer who keeps the gate and the hedges round it, and always has an apple in his pocket"],
names: ["Wilfred", "Clover", "Barnaby", "Hazel", "Tobias", "Primrose", "Eamon", "Marigold", "Oswin", "Bryony", "Jasper", "Meadow", "Alder", "Poppy", "Hugo", "Linden"],
surnames: ["Applegarth", "Furrowfield", "Haybourne", "Oakhurst", "Thistledown", "Millbrook", "Barleycorn", "Greenacre", "Cobbleton", "Wheatley", "Sorrelby", "Ashdown"],
citizenTitles: ["Grower", "Shepherd", "Miller", "Beekeeper", "Market trader"], guardTitle: "Reeve's warden",
plaza: { n: "The Corn Market Square", d: "the cobbled square where the harvest is sold under the market cross", heart: "tree" }, avenue: { n: "The Orchard Way" },
palace: { t: "palace", n: "The Moot Hall of the Greenwold", d: "where the growers of the Greenwold meet to plan the seasons and share the harvest", hall: "The Moot Floor",
seat: ["throne", "The High Reeve's Chair", 0],
staff: [["High Reeve Clover Furrowfield", "High Reeve of the Greenwold", "the elected head of the growers, a farmer's daughter with soil under her nails and a laugh you can hear across a field"], ["Barnaby Haybourne", "Clerk of the Moot"], ["Hazel Oakhurst", "Keeper of the Seed Rolls"]],
rooms: [["council", "The Growers' Council", 1], ["banquet", "The Harvest Hall", 0], ["suite", "The High Reeve's Rooms", 1], ["treasury", "The Tithe Barn Treasury", 1], ["gallery", "The Gallery of Prize Rosettes", 0],
["library", "The Almanac Library", 0], ["kitchen", "The Moot Kitchens", 1], ["armoury", "The Wardens' Room", 1], ["office", "The Office of Fields and Boundaries", 1], ["lounge", "The Fireside Parlour", 0], ["greenhouse", "The Moot Glasshouse", 0], ["suite", "The Visitors' Rooms", 0]] },
wards: [
{ t: "academy", n: "The College of Husbandry", d: "soil, seed, stock and the science of growing", staff: [["Dr Eamon Thistledown", "Principal of the College", "a soil scientist who can tell a field's health from a handful of earth and a sniff"]] },
{ t: "market", n: "The Great Corn Exchange", d: "grain, fruit, wool and cheese bought and sold" },
{ t: "guild", n: "The Guild of Millers and Bakers", d: "flour ground, bread baked, recipes kept" },
{ t: "library", n: "The Seed Vault Library", d: "seeds of a thousand kinds, and the books on how to grow them" },
{ t: "temple", n: "The Chapel of the Harvest", d: "where the first sheaf and the last are blessed" },
{ t: "inn", n: "The Plough and Sheaf", d: "cider, pies and rooms for drovers" },
{ t: "hospital", n: "The Herb Physic House", d: "healers who grow their own remedies" },
{ t: "court", n: "The Court of Boundaries", d: "where disputes over hedges, water and grazing are settled" }
],
arena: { n: "The Showground", d: "the town's training and show ground", about: "Six posts stand round the showground. Run to each as it lights gold, as fast as a sheepdog." },
homes: { n: "The Cottage Lanes", d: "thatched cottages with their own vegetable gardens" },
tunnel: { n: "The Willow Bridge", kind: "bridge" },
deep: { n: "The Wold Farms", d: "the great estates over the river: mills, dairies, apiaries and woods", heart: "tree",
b: [{ t: "farm", n: "The Long Barn Dairy", d: "cows, goats and the cheese room" }, { t: "workshop", n: "The Water Mill", d: "grain ground into flour by the river's wheel" }, { t: "farm", n: "The Apiary Meadows", d: "hives among the wildflowers" }, { t: "workshop", n: "The Coppice Woods", d: "hazel and willow cut for hurdles and baskets" }],
gather: [{ k: "gr_greenwold_grain", n: "A stook of ripe grain", v: "bind a sheaf", look: "crop" }, { k: "gr_greenwold_honeycomb", n: "A hive in the meadow", v: "take a honeycomb frame", look: "herb" }, { k: "gr_greenwold_fleece", n: "The shearing pen", v: "take a fleece", look: "crop" }, { k: "cr_wood", n: "The coppice stools", v: "cut coppice wood", look: "wood" }, { k: "gr_greenwold_flour", n: "The mill's flour bins", v: "fill a sack of flour", look: "crop" }, { k: "cr_hide", n: "Hides drying at the tannery yard", v: "take a raw hide", look: "wood" }] },
trade: { say: "The Great Corn Exchange buys what the Wold Farms bring in and sells the town's own goods.", sells: ["gr_greenwold_flour", "cr_cloth", "cr_wood"], buys: ["gr_greenwold_grain", "gr_greenwold_honeycomb", "gr_greenwold_fleece", "gr_greenwold_flour", "cr_wood", "cr_leather"] },
lore: [["The founding of Harrowmead", "The first growers of the Greenwold met under one great oak to swap seed and settle boundaries. A market grew round the oak, then a hall, then a town; the oak still stands in the Corn Market Square."],
["The Moot", "Every grower in the Greenwold may speak at the Moot. It chooses a High Reeve every seven harvests, and its first business is always the weather."],
["The Seed Vault", "Under the library, cool and dry, the town keeps seeds of every crop it has ever grown. Growers say a seed kept is a harvest promised."],
["The Wold Farms", "Over the Willow Bridge lie the great estates: the dairy, the water mill, the apiary meadows and the coppice woods."],
["The Court of Boundaries", "Most quarrels in the Greenwold are about hedges, ditches and who may graze where. The Court of Boundaries settles them with maps, old deeds and common sense."],
["Mother Nature's blessing", "Harrowmead's growers say Mother Nature walks the Greenwold, and that she likes a well-laid hedge and a field left to rest."]],
lectures: [{ t: "Plants that feed the soil", x: "Beans, peas and clover carry bacteria in little lumps on their roots that take nitrogen from the air and put it into the soil. Growing them in turn with other crops feeds the field.", q: ["Which plants help put nitrogen into the soil?", ["Beans, peas and clover", "Wheat and barley", "Potatoes"], 0] },
{ t: "Making food from light", x: "Green plants make sugar from carbon dioxide and water using the energy of sunlight. This is photosynthesis, and it gives off the oxygen we breathe.", q: ["What gas do plants give off in photosynthesis?", ["Oxygen", "Carbon dioxide", "Nitrogen"], 0] },
{ t: "The bees' dance", x: "A honeybee that finds good flowers tells the hive with a waggle dance. The angle of the dance shows the direction from the Sun, and its length shows the distance.", q: ["How does a honeybee show the way to flowers?", ["With a waggle dance", "By leaving a trail of honey", "By buzzing louder"], 0] },
{ t: "Turning the fields", x: "Farmers have long rotated crops, growing different things in a field each year. It keeps the soil fertile and stops pests and diseases of one crop building up.", q: ["Why do farmers rotate crops?", ["To keep soil fertile and pests down", "To make fields bigger", "To change the weather"], 0] },
{ t: "Earthworms at work", x: "Earthworms tunnel through the soil, letting in air and water, and drag fallen leaves underground. Their droppings make the soil richer.", q: ["How do earthworms help the soil?", ["They let in air and water and enrich it", "They eat the roots", "They keep it dry"], 0] }],
persona: "Harrowmead is the grand market town and seat of the Greenwold, governed by the Moot of the growers and its High Reeve. Its people are farmers, millers, shepherds, beekeepers and traders, practical and friendly, who know their seasons and love a good harvest. Real growing science is welcome. Mother Nature watches over the Greenwold.",
mats: [{ k: "gr_greenwold_grain", n: "Sheaf of grain", e: "🌾", p: 4 }, { k: "gr_greenwold_honeycomb", n: "Honeycomb", e: "🍯", p: 9 }, { k: "gr_greenwold_fleece", n: "Fleece", e: "🐑", p: 8 }, { k: "gr_greenwold_flour", n: "Stone-ground flour", e: "🥖", p: 6 }]
});
grRealm({ id: "family", parent: { w: "family" }, parentName: "the Family houses", name: "Kinsholm", short: "Kinsholm",
blurb: "the warm civic heart of the Family houses: schools, nurseries, the family court, the registry and wide green parks",
intro: "Honey-coloured halls and gardens full of children's laughter line the streets of the town where families are made and cared for. The House of Families stands on its terraces, its doors always open.",
style: "classical", layout: "open", tone: 520, gateCol: 0xFFD8C8,
env: { top: 0x78B0E0, low: 0xD8E4EC, fog: 0xD8E0E4, fogD: 0.0009, sun: 1.0, sunCol: 0xFFF0DC, sunDir: [0.5, 0.7, -0.4], hemi: 0.8, hemiCol: 0xF0E8E0, hemiGround: 0x5A6A40, groundCol: 0x6A8E48, groundCol2: 0x9AB070, groundTex: "grass", mtn: 0x6A8A58, mtnTex: "grass" },
gate: { n: "The Garden Gate", d: "a wrought-iron gate twined with roses that opens on the families' town", back: "The Garden Gate" },
warden: ["Agnes Whitlow", "Keeper of the Garden Gate", "a grandmother of eleven who keeps the gate, knows every family in town and always has a story ready"],
names: ["Agnes", "Theo", "Lucy", "Samuel", "Clara", "Amos", "Ivy", "Nathaniel", "Rosa", "Elias", "Hattie", "Benedict", "Maya", "Oliver", "Grace", "Felix"],
surnames: ["Whitlow", "Goodfellow", "Hartwell", "Merriweather", "Ashby", "Kindersley", "Lovell", "Fairbairn", "Hollins", "Sweetland", "Wilder", "Ambrose"],
citizenTitles: ["Parent", "Foster carer", "Teacher", "Nursery nurse", "Family worker"], guardTitle: "Town warden",
plaza: { n: "The Square of Hands", d: "the town square, its paving set with the handprints of every child welcomed here", heart: "statue" }, avenue: { n: "The Linden Walk" },
palace: { t: "palace", n: "The House of Families", d: "the town's council and the home of Family Services, who look after every child in care", hall: "The Hall of Welcome",
seat: ["throne", "The Warden's Chair of the House", 0],
staff: [["Warden Rosa Hartwell", "Warden of the House of Families", "the head of the House, once a foster child herself, gentle and unshakeable about what every child deserves"], ["Samuel Goodfellow", "Clerk of the House"], ["Clara Merriweather", "Head of Family Services"]],
rooms: [["council", "The Families' Council", 1], ["banquet", "The Hall of Celebrations", 0], ["suite", "The Warden's Rooms", 1], ["treasury", "The Children's Fund", 1], ["gallery", "The Gallery of Family Portraits", 0],
["library", "The Storybook Library", 0], ["kitchen", "The House Kitchens", 1], ["office", "The Office of Fostering", 1], ["office", "The Office of Adoption", 1], ["lounge", "The Welcome Lounge", 0], ["nursery", "The Little Ones' Room", 0], ["suite", "The Guest Rooms", 0]] },
wards: [
{ t: "court", n: "The Family Court", d: "a calm court where judges decide what is best for each child", staff: [["Judge Elias Kindersley", "Judge of the Family Court", "a soft-spoken judge who always asks the child what they think first"]] },
{ t: "hall", n: "The Registry of Births and Unions", d: "births, marriages, adoptions and names, written down for ever" },
{ t: "academy", n: "The Linden School", d: "the town's school, from first letters to final exams" },
{ t: "academy", n: "The College of Care", d: "training teachers, nursery nurses and foster carers" },
{ t: "hospital", n: "The Children's Hospital", d: "doctors and nurses who specialise in the young" },
{ t: "library", n: "The Children's Library", d: "picture books, chapter books and story time every afternoon" },
{ t: "theatre", n: "The Puppet Theatre", d: "puppet shows, school plays and family concerts" },
{ t: "bath", n: "The Family Swimming Baths", d: "warm pools, swimming lessons and a splash pool for the little ones" }
],
arena: { n: "The Playing Fields", d: "the town's sports and games ground", about: "Six posts stand round the playing field. Run to each as it lights gold, like sports day." },
homes: { n: "The Garden Terraces", d: "family homes with gardens, swings and room to grow" },
tunnel: { n: "The Footbridge over the Brook", kind: "bridge" },
deep: { n: "The Parklands", d: "the great parks beyond the brook: nurseries, allotments, the orchard and the children's farm", heart: "fountain",
b: [{ t: "farm", n: "The Children's Farm", d: "lambs, goats, rabbits and hens for little hands to meet" }, { t: "academy", n: "The Nursery Garden School", d: "a nursery school among the flower beds" }, { t: "farm", n: "The Family Allotments", d: "where families grow their own vegetables together" }, { t: "workshop", n: "The Toy Mender's", d: "broken toys mended and passed on to new homes" }],
gather: [{ k: "gr_family_apples", n: "The park orchard", v: "pick apples", look: "crop" }, { k: "gr_family_flowers", n: "The park flower beds", v: "cut a posy", look: "herb" }, { k: "gr_family_eggs", n: "The children's farm henhouse", v: "collect the eggs", look: "crop" }, { k: "hx_ribbon", n: "The ribbon basket at the toy mender's", v: "take some ribbon", look: "crop" }] },
trade: { say: "The town's shops buy what the Parklands grow and sell what families need.", sells: ["hx_ribbon", "cr_cloth", "gr_family_flowers"], buys: ["gr_family_apples", "gr_family_flowers", "gr_family_eggs", "hx_ribbon", "cr_cloth"] },
lore: [["The founding of Kinsholm", "The first families who came to the houses needed a school, then a doctor, then somewhere to write down their children's names. Each was built around the last, and the town grew up around them like a family round a table."],
["The House of Families", "The House is the town's council and the home of Family Services. Its doors are open day and night, because a family can need help at any hour."],
["The Square of Hands", "Every child welcomed into a family here, born, fostered or adopted, presses a handprint into the paving of the square. There are thousands now."],
["The Family Court", "The Family Court is the quietest court there is. Its rooms have sofas instead of benches, and the judges listen to children first."],
["The Parklands", "Over the brook lie the parks: the children's farm, the allotments, the orchard and the nursery garden school."],
["Every kind of family", "Kinsholm's saying is carved over the House door: a family is the people who come home to each other."]],
lectures: [{ t: "Bones that join", x: "A newborn baby has around 300 bones, many of them partly cartilage. As children grow, some fuse together, and an adult has 206.", q: ["How many bones does an adult have?", ["206", "300", "100"], 0] },
{ t: "Writing it down", x: "In England and Wales, the civil registration of every birth, marriage and death began on 1 July 1837. Registers like these let people trace their families back for generations.", q: ["When did civil registration begin in England and Wales?", ["1837", "1066", "1950"], 0] },
{ t: "How babies see", x: "Newborn babies see most clearly at about 20 to 30 centimetres: roughly the distance to the face of the person holding them.", q: ["At what distance do newborns see best?", ["About 20 to 30 cm", "About 3 metres", "Across a room"], 0] },
{ t: "Learning through play", x: "Play is how young children learn: building, pretending and taking turns help them develop language, problem-solving and friendships.", q: ["What does play help young children develop?", ["Language and problem-solving", "Nothing useful", "Only strength"], 0] },
{ t: "Trees in the park", x: "Trees cool a town by giving shade and by releasing water vapour from their leaves. A street with trees can be several degrees cooler on a hot day.", q: ["How do trees cool a town?", ["Shade and water vapour from their leaves", "They block the wind", "They reflect the sun like mirrors"], 0] }],
persona: "Kinsholm is the warm civic heart of the Family houses: the House of Families and Family Services, the Family Court, the Registry of Births and Unions, schools, nurseries, a children's hospital and wide parks. Its people are parents, foster carers, teachers and family workers, kind and patient, who believe every child deserves a safe, loving home. Keep everything gentle and family-friendly.",
mats: [{ k: "gr_family_apples", n: "Park apples", e: "🍎", p: 4 }, { k: "gr_family_flowers", n: "Posy of park flowers", e: "💐", p: 6 }, { k: "gr_family_eggs", n: "Fresh eggs", e: "🥚", p: 4 }]
});
grRealm({ id: "underground", parent: { w: "ug" }, parentName: "the Underground", name: "Undercross", short: "Undercross",
blurb: "the vast under-city beneath Somnucor, built in the old stations, tunnels and vaults of the Underground",
intro: "Beyond a sealed platform, old station halls open one into another, tiled in cream and green and lit by steady lamps. At the top of the cavern stands the Palace of the Transit Authority, where every train under the city is planned.",
style: "station", layout: "cavern", tone: 410, gateCol: 0xE8D0A0,
env: { top: 0x0C0C0E, low: 0x1E1C1A, fog: 0x1E1C1A, fogD: 0.0035, sun: 0.35, sunCol: 0xFFE8C8, sunDir: [0.2, 1, 0.1], hemi: 0.95, hemiCol: 0xE8E0D0, hemiGround: 0x3A3630, groundCol: 0x5A5650, groundCol2: 0x7E7870, groundTex: "floortile", rock: 0x4A4642, roof: 70, glowCol: 0xFFD8A0, glowKit: "crystalcluster" },
gate: { n: "The Sealed Platform", d: "a platform no train stops at, whose far wall opens for those who know", back: "The Sealed Platform" },
warden: ["Reginald Pettigrew", "Keeper of the Sealed Platform", "a station master of forty years who keeps the forgotten platform swept and its clock exactly right"],
names: ["Reginald", "Mabel", "Archie", "Winifred", "Stanley", "Dot", "Cyril", "Edna", "Percy", "Ruby", "Leonard", "Ada", "Wilf", "Nell", "Horace", "Flo"],
surnames: ["Pettigrew", "Copperfield", "Railton", "Signalby", "Ashworth", "Tunnicliffe", "Platt", "Bramley", "Cogsworth", "Lampton", "Underhill", "Brakewell"],
citizenTitles: ["Under-city resident", "Track engineer", "Signal fitter", "Station master", "Tunnel surveyor"], guardTitle: "Transit warden",
plaza: { n: "The Great Concourse", d: "the oldest booking hall of all, now the under-city's square under a painted clock", heart: "obelisk" }, avenue: { n: "The Old Northbound" },
palace: { t: "palace", n: "The Palace of the Transit Authority", d: "the Authority that plans, builds and runs every line under the city", hall: "The Hall of the Timetable",
seat: ["throne", "The Controller General's Desk", 0],
staff: [["Controller General Winifred Railton", "Controller General of the Transit Authority", "the head of the Authority, who has driven, signalled and dug every line, and still knows every timetable by heart"], ["Archie Copperfield", "Secretary of the Authority"], ["Mabel Signalby", "Chief Engineer"]],
rooms: [["council", "The Board of the Authority", 1], ["banquet", "The Old Refreshment Room", 0], ["suite", "The Controller's Rooms", 1], ["treasury", "The Fares Treasury", 1], ["gallery", "The Gallery of Old Trains", 0],
["library", "The Timetable Library", 0], ["kitchen", "The Staff Canteen Kitchens", 1], ["control", "The Line Control Room", 1], ["office", "The Office of Works", 1], ["lounge", "The Directors' Lounge", 0], ["map", "The Room of the Great Map", 0], ["engine", "The Ventilation Hall", 1]] },
wards: [
{ t: "academy", n: "The Railway Engineering College", d: "track, signals, tunnels and trains", staff: [["Professor Cyril Tunnicliffe", "Principal of the College", "an engineer who has walked every tunnel under the city and will tell you how each was dug"]] },
{ t: "guild", n: "The Signal Fitters' Guild", d: "who keep every signal showing the right light" },
{ t: "workshop", n: "The Carriage Works", d: "trains stripped, mended, painted and sent back out" },
{ t: "library", n: "The Lost Lines Archive", d: "plans of every line ever dug, and some never finished" },
{ t: "market", n: "The Arches Market", d: "stalls under the old brick arches: parts, tools and hot food" },
{ t: "hospital", n: "The Under-City Infirmary", d: "healers for the people who live and work below" },
{ t: "inn", n: "The Last Train Inn", d: "beds for crews on the night shift" },
{ t: "lab", n: "The Tunnel Air Laboratory", d: "keeping the air below fresh and the temperature right" }
],
arena: { n: "The Old Goods Yard", d: "the track crews' training ground", about: "Six posts stand round the old goods yard. Run to each as it lights gold, quick as a crew between trains." },
homes: { n: "The Platform Rows", d: "homes built along disused platforms, each with a lamp at its door" },
tunnel: { n: "The Deep Level Tube", kind: "tube" },
deep: { n: "The Depot Levels", d: "the deep depots, the tunnelling works, the power house and the scrap sidings", heart: "flame",
b: [{ t: "hangar", n: "The Great Depot", d: "where trains sleep, are cleaned and are checked" }, { t: "mine", n: "The Tunnelling Works", d: "where new tunnels are dug under the city" }, { t: "workshop", n: "The Power House", d: "the substation that feeds the rails" }, { t: "workshop", n: "The Scrap Sidings", d: "old rail and parts sorted for reuse" }],
gather: [{ k: "cr_parts", n: "The parts bins in the depot", v: "sort out good parts", look: "ore" }, { k: "cr_steel", n: "Old rail in the scrap sidings", v: "cut a length of rail", look: "ore" }, { k: "gr_underground_clay", n: "Spoil from the tunnelling works", v: "dig blue clay", look: "coal" }, { k: "gr_underground_copper", n: "Old cable in the power house", v: "strip old copper cable", look: "ore" }] },
trade: { say: "The Arches Market buys what the Depot Levels bring up and sells what the under-city needs.", sells: ["cr_parts", "cr_glass", "cr_rubber"], buys: ["cr_parts", "cr_steel", "cr_ore", "cr_coal", "gr_underground_clay", "gr_underground_copper"] },
lore: [["The founding of Undercross", "As the Underground grew, old stations were closed and new ones dug beside them. The crews who worked below began to live in the closed halls, and over the years the forgotten stations joined into a city."],
["The Transit Authority", "The Authority plans, digs and runs every line under Somnucor. Its Controller General sits at the old desk where the first timetable was written."],
["The Sealed Platform", "No train stops at the Sealed Platform, but its clock is always right and its floor always swept. Those who know press the right tile, and the wall opens."],
["The Lost Lines", "The Lost Lines Archive holds plans of tunnels that were started and never finished. Some of them are now the under-city's streets."],
["The Depot Levels", "Through the Deep Level Tube lie the Great Depot, the Tunnelling Works, the Power House and the scrap sidings."],
["Mind the gap", "Every platform in Undercross has a painted line along its edge. Children learn to stand behind it before they learn their letters."]],
lectures: [{ t: "The first underground railway", x: "The world's first underground railway opened in London in 1863. Its first trains were pulled by steam engines.", q: ["When did the first underground railway open?", ["1863", "1963", "1763"], 0] },
{ t: "The tunnelling shield", x: "A tunnelling shield protects workers as they dig through soft ground. Marc Brunel invented one to dig the Thames Tunnel, which opened in 1843.", q: ["What does a tunnelling shield do?", ["Protects workers digging soft ground", "Lights the tunnel", "Pumps out air"], 0] },
{ t: "Signals", x: "Three-aspect railway signals show red for stop, yellow for caution, and green for clear. They keep trains a safe distance apart.", q: ["What does a yellow signal mean?", ["Caution", "Stop", "Clear"], 0] },
{ t: "Braking that makes power", x: "Many electric trains use regenerative braking: their motors work as generators while slowing down, sending energy back into the supply.", q: ["What does regenerative braking do?", ["Turns braking into electricity", "Makes the train faster", "Cools the tunnel"], 0] },
{ t: "Warm tunnels", x: "Deep tube tunnels grow warm over the years, because trains' motors and brakes give off heat that the clay around them soaks up.", q: ["Why do old tube tunnels get warm?", ["Heat from trains is soaked up by the clay", "The Earth's core is close", "Hot water pipes"], 0] }],
persona: "Undercross is the under-city below Somnucor, built in the old stations, tunnels and vaults of the Underground and run by the Transit Authority and its Controller General. Its people are railway engineers, signal fitters, station masters and their families, proud, practical and fond of a good timetable. Real railway history and science are welcome.",
mats: [{ k: "gr_underground_clay", n: "Blue tunnel clay", e: "🧱", p: 4 }, { k: "gr_underground_copper", n: "Old copper cable", e: "🟠", p: 12 }]
});
grRealm({ id: "mall", parent: { w: "mall" }, parentName: "the World Mall", name: "The Grand Exchange Quarter", short: "Exchange Quarter",
blurb: "the great trade quarter behind the World Mall's shops: warehouses, wholesale halls, the merchants' guild and the exchange",
intro: "Behind the shopfronts, a whole city of commerce spreads under a vast glass dome: wholesale halls, warehouses and colonnades busy with carts. The Palace of the Merchants' Guild rises on its terraces, its great clock keeping market time.",
style: "classical", layout: "dome", tone: 490, gateCol: 0xFFE4B0,
env: { top: 0x8AA8C8, low: 0xD8D4CC, fog: 0xD0CCC4, fogD: 0.0009, sun: 0.9, sunCol: 0xFFF0D8, sunDir: [0.4, 0.8, -0.3], hemi: 0.85, hemiCol: 0xF0E8DC, hemiGround: 0x5A5248, groundCol: 0x8A8278, groundCol2: 0xA8A094, groundTex: "marble", mtn: 0x8A8478, mtnTex: "stone" },
gate: { n: "The Staff Door", d: "a plain door behind the shops marked staff only, which opens on a whole quarter", back: "The Staff Door" },
warden: ["Ignatius Ledgerwood", "Keeper of the Staff Door", "the door-keeper who signs in every delivery and knows every merchant by their handshake"],
names: ["Ignatius", "Philippa", "Ambrose", "Lavinia", "Octavian", "Cordelia", "Mercer", "Henrietta", "Rufus", "Seraphina", "Garrick", "Prudence", "Lucius", "Verity", "Barnaby", "Juno"],
surnames: ["Ledgerwood", "Tallyford", "Goldsworth", "Pennyfeather", "Wainwright", "Silkstone", "Brassington", "Merchant", "Coinwell", "Hallmark", "Bartram", "Stockley"],
citizenTitles: ["Merchant", "Wholesaler", "Warehouse hand", "Shop buyer", "Designer"], guardTitle: "Guild watchman",
plaza: { n: "The Exchange Court", d: "the colonnaded square where deals are struck under the great clock", heart: "orrery" }, avenue: { n: "The Carters' Way" },
palace: { t: "palace", n: "The Palace of the Merchants' Guild", d: "the guild of every merchant who trades in the World Mall, keeper of fair weights and fair dealing", hall: "The Hall of the Guild",
seat: ["throne", "The Guild Master's Chair", 0],
staff: [["Guild Master Philippa Goldsworth", "Guild Master of the Merchants", "the head of the Merchants' Guild, shrewd, warm and fiercely honest, who started out sweeping a stall"], ["Ambrose Tallyford", "Secretary of the Guild"], ["Lavinia Pennyfeather", "Warden of Weights and Measures"]],
rooms: [["council", "The Guild Council", 1], ["banquet", "The Merchants' Banqueting Hall", 0], ["suite", "The Guild Master's Rooms", 1], ["treasury", "The Guild Treasury", 1], ["gallery", "The Gallery of Trade", 0],
["library", "The Ledger Library", 0], ["kitchen", "The Guild Kitchens", 1], ["office", "The Office of Weights and Measures", 1], ["office", "The Office of Licences", 1], ["lounge", "The Members' Salon", 0], ["map", "The Room of Trade Routes", 0], ["suite", "The Visiting Merchants' Rooms", 0]] },
wards: [
{ t: "bank", n: "The Mall Exchange", d: "where merchants buy and sell goods by the shipload, and prices are set", staff: [["Mercer Coinwell", "Master of the Exchange", "the master of the trading floor, who can tell the price of silk across three worlds without looking"]] },
{ t: "market", n: "The Wholesale Halls", d: "goods by the crate and the bale for the Mall's shops" },
{ t: "academy", n: "The School of Design", d: "shopfronts, fashion, packaging and window displays" },
{ t: "academy", n: "The College of Commerce", d: "bookkeeping, buying, selling and running a shop" },
{ t: "court", n: "The Court of Fair Dealing", d: "where disputes between merchants are settled" },
{ t: "guild", n: "The Guild of Shopfitters", d: "who build the counters, shelves and windows of every shop" },
{ t: "embassy", n: "The Hall of Foreign Traders", d: "where merchants from other worlds are welcomed and their contracts made" },
{ t: "inn", n: "The Merchants' Rest", d: "rooms, a good dinner and the day's prices" }
],
arena: { n: "The Loading Yard", d: "the porters' training ground", about: "Six posts stand round the loading yard. Run to each as it lights gold, quick as a porter with a late delivery." },
homes: { n: "The Shopkeepers' Rows", d: "flats above the counting houses, home to the quarter's people" },
tunnel: { n: "The Goods Tunnel", kind: "tunnel" },
deep: { n: "The Warehouse District", d: "the great warehouses, the weaving sheds, the glassworks and the packing halls", heart: "obelisk",
b: [{ t: "workshop", n: "The Weaving Sheds", d: "cloth woven for the Mall's tailors and drapers" }, { t: "workshop", n: "The Glassworks", d: "glass blown for windows, bottles and display cases" }, { t: "market", n: "The Bonded Warehouses", d: "goods stored until they are sold" }, { t: "workshop", n: "The Packing Halls", d: "where every parcel is wrapped and labelled" }],
gather: [{ k: "cr_cloth", n: "Bolts from the weaving sheds", v: "take a bolt of cloth", look: "crop" }, { k: "cr_glass", n: "The glassworks' seconds", v: "gather glass", look: "crystal" }, { k: "gr_mall_dye", n: "The dye vats", v: "draw off dye", look: "herb" }, { k: "gr_mall_crate", n: "Empty crates in the warehouse", v: "stack a crate", look: "wood" }] },
trade: { say: "The Wholesale Halls buy what the Warehouse District makes and sell to the shops of the Mall.", sells: ["cr_cloth", "cr_glass", "cr_leather", "gr_mall_dye"], buys: ["cr_cloth", "cr_glass", "cr_leather", "cr_wood", "gr_mall_dye", "gr_mall_crate"] },
lore: [["The founding of the Exchange Quarter", "The World Mall's first shops needed somewhere to store their stock. The storerooms grew into warehouses, the warehouses into halls, and soon there was a whole city of trade behind the shopfronts."],
["The Merchants' Guild", "Every merchant who trades in the Mall belongs to the Guild. It keeps fair weights, fair prices and fair dealing, and its Guild Master is chosen from those who have run a shop for ten years."],
["The great clock", "The clock over the Exchange Court keeps market time. The trading floor opens at its first bell and closes at its last, and nobody trades a minute after."],
["Fair weights", "Every scale in the quarter is checked by the Warden of Weights and Measures. A merchant caught with a false weight is struck off the Guild."],
["The Warehouse District", "Through the Goods Tunnel lie the weaving sheds, the glassworks, the bonded warehouses and the packing halls."],
["Traders from every world", "The Hall of Foreign Traders welcomes merchants from every world the doors reach. Its interpreters can make a deal in a dozen languages."]],
lectures: [{ t: "The Silk Roads", x: "The Silk Roads were networks of trade routes linking China with Central Asia, the Middle East and Europe for more than a thousand years. Silk, spices, paper and ideas travelled along them.", q: ["What did the Silk Roads link?", ["China with Asia, the Middle East and Europe", "America with Africa", "Australia with Japan"], 0] },
{ t: "Paper money", x: "Paper money was first widely used in China around a thousand years ago, during the Song dynasty. It was lighter to carry than strings of coins.", q: ["Where was paper money first widely used?", ["China", "Rome", "Egypt"], 0] },
{ t: "Double-entry bookkeeping", x: "In double-entry bookkeeping, every sum is written twice, once as a debit and once as a credit, so the books always balance. Luca Pacioli described it in print in 1494.", q: ["In double-entry bookkeeping, how many times is each sum written?", ["Twice", "Once", "Three times"], 0] },
{ t: "Supply and demand", x: "When something is scarce and many people want it, its price tends to rise. When there is plenty and few want it, the price tends to fall.", q: ["What usually happens to the price of something scarce that many want?", ["It rises", "It falls", "It stays the same"], 0] },
{ t: "The barcode", x: "The first product ever scanned at a shop till with a barcode was a packet of chewing gum, in Ohio, in 1974.", q: ["When was a barcode first scanned at a shop till?", ["1974", "1924", "2004"], 0] }],
persona: "The Grand Exchange Quarter is the great trade city behind the World Mall's shops: the Palace of the Merchants' Guild, the Mall Exchange, the wholesale halls, warehouses, a school of design and a college of commerce. Its people are merchants, wholesalers, designers and warehouse hands, shrewd but honest, who talk of prices, stock and good service. No real brand names. Real history of trade is welcome.",
mats: [{ k: "gr_mall_dye", n: "Cloth dye", e: "🎨", p: 7 }, { k: "gr_mall_crate", n: "Shipping crate", e: "📦", p: 5 }]
});
grRealm({ id: "hall", parent: { w: "land", sub: "hall" }, parentName: "the Hall of Doors", name: "Vestibar", short: "Vestibar",
blurb: "the city of a thousand thresholds, built in the vaulted dark behind the Hall of Doors",
intro: "Behind the ring of doors lies a whole city under a starry vault, where every street ends in a door and every door is kept. The Avenue of Hinges climbs to the Keyward Palace, where the register of all doors is sealed.",
style: "gothic", layout: "dome", tone: 410, gateCol: 0xC8C0FF,
env: { top: 0x05060E, low: 0x1E1840, fog: 0x14122A, fogD: 0.0016, sun: 0.5, sunCol: 0xD8DCFF, sunDir: [0.3, 0.9, -0.3], hemi: 1.0, hemiCol: 0xC8C8F0, hemiGround: 0x2A2638, stars: 1, groundCol: 0x2A2A38, groundCol2: 0x4A4A5E, groundTex: "marble", mtn: 0x3A3850, mtnTex: "marble" },
gate: { n: "The Door Behind the Doors", d: "a tall plain door at the back of the Hall that opens on the city of thresholds", back: "The Hall of Doors" },
warden: ["Bertil Ashlock", "Keeper of the Door Behind the Doors", "an old doorkeeper with a ring of a hundred keys, who swears he has never once lost one and will happily show you all of them"],
names: ["Bertil", "Isolde", "Caspian", "Wren", "Anselm", "Marisol", "Tobiah", "Lark", "Edda", "Florian", "Saffi", "Corin", "Juno", "Oswin", "Tamsin", "Ivo"],
surnames: ["Ashlock", "Wrenhallow", "Hingeley", "Latchford", "Doorne", "Keyes", "Postlethwaite", "Ambry", "Sillwood", "Thresh", "Vantmoor", "Brassby"],
citizenTitles: ["Door registrar", "Hinge-wright", "Travelling dreamer", "Key-cutter", "Lantern porter"], guardTitle: "Dream warden",
plaza: { n: "The Plaza of Open Doors", d: "where a hundred doorframes stand open on the square, each showing a glimpse of another land", heart: "orrery" }, avenue: { n: "The Avenue of Hinges" },
palace: { t: "palace", n: "The Keyward Palace", d: "the seat of the Registrars, who keep the register of every door between the worlds", hall: "The Hall of the Great Register",
seat: ["throne", "The Chair of the High Registrar", 0],
staff: [["High Registrar Isolde Wrenhallow", "High Registrar of All Doors", "the High Registrar, keeper of the great register, patient, precise and quietly delighted by every new door that appears"], ["Anselm Latchford", "Clerk of the Register"], ["Marisol Keyes", "Mistress of Keys"]],
rooms: [["council", "The Council of Thresholds", 1], ["banquet", "The Hall of Welcome", 0], ["suite", "The High Registrar's Apartments", 1], ["treasury", "The Key Vault", 1], ["gallery", "The Gallery of First Doors", 0],
["library", "The Great Register", 0], ["kitchen", "The Palace Kitchens", 1], ["armoury", "The Wardens' Armoury", 1], ["office", "The Office of New Doors", 1], ["lounge", "The Travellers' Salon", 0], ["map", "The Room of the Map of Everywhere", 0], ["archive", "The Archive of Lost Doors", 1]] },
wards: [
{ t: "academy", n: "The College of Thresholds", d: "where guides learn every land and how to send a dreamer through the right door", staff: [["Provost Caspian Ambry", "Provost of the College", "the provost, who has walked through every door in the Hall at least twice and still takes notes"]] },
{ t: "library", n: "The Library of Every Land", d: "a shelf of books for each land behind each door" },
{ t: "embassy", n: "The Embassy of the Sixteen Lands", d: "where envoys of the dream lands meet and settle what passes between them" },
{ t: "market", n: "The Hinge Market", d: "goods carried through the doors from every land, bought and sold under one roof" },
{ t: "guild", n: "The Guild of Hinge-Wrights and Key-Cutters", d: "who hang, oil and mend every door in the city" },
{ t: "court", n: "The Court of Found Ways", d: "where lost dreamers are matched to their own doors again" },
{ t: "inn", n: "The Waystation Inn", d: "beds and suppers for dreamers between one land and the next" },
{ t: "barracks", n: "The Dream Wardens' Watchhouse", d: "the wardens who keep the city calm and the doors closed when they should be" }
],
arena: { n: "The Field of Doors", d: "the wardens' training ground, ringed with free-standing doors", about: "Six doors stand round the field. Run to each as its lamp lights gold; a warden must reach any door in the city before it swings shut." },
homes: { n: "Lintel Row", d: "tall narrow houses, each with a front door from a different land" },
tunnel: { n: "The Corridor of Many Doors", kind: "tunnel" },
deep: { n: "The Doorworks", d: "where the city's doors are made: the frame joinery, the hinge forge, the keystone quarry and the keyhole laboratory", heart: "obelisk",
b: [{ t: "workshop", n: "The Frame Joinery", d: "oak and dreamwood shaped into doorframes" }, { t: "forge", n: "The Hinge Forge", d: "brass hinges, knockers and keys cast and filed" }, { t: "mine", n: "The Keystone Quarry", d: "the dark stone that tops every arch in Vestibar" }, { t: "lab", n: "The Keyhole Laboratory", d: "where new doors are tested before they are hung" }],
gather: [{ k: "gr_hall_brass", n: "A seam of door-brass", v: "chip out the brass", look: "ore" }, { k: "gr_hall_doorwood", n: "A stack of seasoned dreamwood", v: "take a plank of dreamwood", look: "wood" }, { k: "gr_hall_keystone", n: "A keystone block", v: "cut a keystone", look: "ore" }, { k: "gr_hall_dreamdust", n: "Dreamdust on the doorsills", v: "sweep up the dreamdust", look: "crystal" }] },
trade: { say: "The Hinge Market buys what the Doorworks turn up and sells goods carried in from every land.", sells: ["cr_glass", "cr_wood", "cr_parts"], buys: ["gr_hall_brass", "gr_hall_doorwood", "gr_hall_keystone", "gr_hall_dreamdust", "cr_ore", "cr_crystal"] },
lore: [["How Vestibar began", "The first Registrar found a door at the back of the Hall that opened on nothing but dark. She hung a lamp beyond it, then a second, and by the hundredth lamp there was a street. Vestibar has been growing behind the Hall ever since."],
["The Great Register", "Every door in the Hall is written in the Great Register: where it opens, who made it and who last went through. When a new dreamer arrives, a new door appears, and a new line is written."],
["The Map of Everywhere", "The map in the Hall is a copy. The first one, drawn by hand on a table the size of a room, lies in the Keyward Palace and is still being finished."],
["Lost doors", "Now and then a dreamer forgets the way to their own door. The Court of Found Ways matches them up again; no dreamer has ever stayed lost for long."],
["The Wardens", "The Dream Wardens walk the Hall and the city. They carry no weapons, only lamps and a great deal of patience, and their first duty is to make sure a frightened dreamer feels safe."],
["The keystones", "Every arch in Vestibar is topped with a dark keystone from the quarry beyond the Corridor. People say the city stays up because of them, and the builders say that is exactly right."]],
lectures: [{ t: "How a lock works", x: "Most door locks are pin tumbler locks. Little spring-loaded pins of different lengths block the turning core; the right key pushes every pin to just the right height so the core can turn. Linus Yale Jr. patented the modern form in the 1860s, but the ancient Egyptians had wooden pin locks thousands of years earlier.", q: ["What does the right key do in a pin tumbler lock?", ["Lifts each pin to the right height", "Melts the pins", "Pulls out the spring"], 0] },
{ t: "The keystone", x: "An arch is held up by its own weight. Each wedge-shaped stone presses on its neighbours, and the keystone at the top locks them together. Before the keystone goes in, builders hold the arch up on a wooden frame called centring.", q: ["Where does the keystone sit in an arch?", ["At the very top", "At the bottom", "Beside the arch"], 0] },
{ t: "Dreams and sleep", x: "Sleep comes in cycles of about 90 minutes. The most vivid dreams happen in REM sleep, named for the rapid eye movements that go with it, and the REM spells grow longer towards morning.", q: ["In which kind of sleep do the most vivid dreams happen?", ["REM sleep", "Deep sleep only", "Napping"], 0] },
{ t: "The revolving door", x: "Theophilus Van Kannel of Philadelphia patented the revolving door in 1888. Because it is never fully open, it stops wind and noise rushing in, and it helps keep a building warm.", q: ["Why do revolving doors help keep a building warm?", ["They are never fully open", "They are heated", "They are made of wool"], 0] },
{ t: "Thresholds", x: "In the Hall's own lore, a threshold belongs to neither room, which is why Vestibar's doorkeepers always step across one with care. In Vestibar a dreamer is welcome on every threshold.", q: ["In the lore of Vestibar, what does a threshold belong to?", ["Neither room", "The left room", "The Registrar"], 0] }],
persona: "Vestibar is the city of thresholds behind the Hall of Doors in SomnuMatrix, kept by the Registrars of the Keyward Palace and walked by the gentle Dream Wardens. Its people know every land behind every door, love keys, hinges and maps, and are always glad to help a lost dreamer find their own door.",
mats: [{ k: "gr_hall_brass", n: "Door-brass", e: "🔑", p: 12 }, { k: "gr_hall_doorwood", n: "Dreamwood plank", e: "🚪", p: 9 }, { k: "gr_hall_keystone", n: "Keystone block", e: "🧱", p: 14 }, { k: "gr_hall_dreamdust", n: "Dreamdust", e: "✨", p: 24 }]
});
grRealm({ id: "underworld", parent: { w: "land", sub: "underworld" }, parentName: "the Underworld", name: "Hearthdeep", short: "Hearthdeep",
blurb: "the warm lamp-lit city of riches beneath the earth, past the slow dark river",
intro: "Far below the river crossing, a great cavern glows amber with lamps and giant glowing caps. Hearthdeep is a city of gem-cutters, lantern-makers and kind keepers, and its Avenue of Lamps rises to the Hall of the Deep Crown.",
style: "dwarf", layout: "cavern", tone: 340, gateCol: 0xFFB070,
env: { top: 0x1A0806, low: 0x4A1E10, fog: 0x2A120A, fogD: 0.0035, sun: 0.4, sunCol: 0xFFB080, sunDir: [0.2, 1, 0.2], hemi: 0.9, hemiCol: 0xF0B890, hemiGround: 0x3A2420, groundCol: 0x3A2C28, groundCol2: 0x5E463C, groundTex: "stone", rock: 0x3A2A26, roof: 76, glowCol: 0xFFA868, glowKit: "giantmushroom" },
gate: { n: "The Lamp Stair", d: "a long warm stair, lit lamp by lamp, down into the city beneath", back: "The Lamp Stair" },
warden: ["Garrick Dunmore", "Lamp-Warden of the Stair", "a broad, soft-spoken lamp-warden who has lit every lamp on the stair ten thousand times and likes to tell you which ones are his favourites"],
names: ["Garrick", "Corvina", "Dorian", "Mabyn", "Aldric", "Seren", "Thaddeus", "Ione", "Bryn", "Calla", "Emrys", "Ottilie", "Fennick", "Rhosyn", "Lucan", "Odette"],
surnames: ["Dunmore", "Ashgrove", "Emberly", "Stonewick", "Garnell", "Cindermoss", "Holloway", "Deepdale", "Lanternby", "Underhay", "Gloaming", "Quarrel"],
citizenTitles: ["Gem-cutter", "Lantern-maker", "Ferry hand", "Orchard keeper", "Keeper of stories"], guardTitle: "Lamp-warden",
plaza: { n: "The Square of Warm Lamps", d: "where every family hangs a lamp, and the cavern roof glows with all of them", heart: "flame" }, avenue: { n: "The Avenue of Lamps" },
palace: { t: "palace", n: "The Hall of the Deep Crown", d: "the great hall of the King and Queen Below, kept by their Steward", hall: "The Hall of Garnet Pillars",
seat: ["throne", "The Twin Thrones Below", 0],
staff: [["Steward Corvina Ashgrove", "Steward of the Deep Crown", "the Steward who runs Hearthdeep for the King and Queen Below: calm, kind, very organised and fond of a good cup of tea"], ["Aldric Stonewick", "Keeper of the Garnet Pillars"], ["Ione Deepdale", "Mistress of the Queen's Garden"]],
rooms: [["council", "The Council of the Deep", 1], ["banquet", "The Feast Hall of the Seasons", 0], ["suite", "The Royal Apartments Below", 1], ["treasury", "The Treasury of the Earth", 1], ["gallery", "The Gallery of Gems", 0],
["library", "The Library of the Crown", 0], ["kitchen", "The Pomegranate Kitchens", 1], ["armoury", "The Lamp-Wardens' Store", 1], ["office", "The Steward's Office", 1], ["lounge", "The Hearth Room", 0], ["greenhouse", "The Queen's Winter Garden", 0], ["suite", "The Guest Rooms", 0]] },
wards: [
{ t: "court", n: "The Court of Kind Hearing", d: "where every soul's story is listened to, gently and fairly", staff: [["Judge Emrys Holloway", "Judge of Kind Hearing", "a white-haired judge who listens far more than he speaks and has never once raised his voice"]] },
{ t: "library", n: "The Library of Every Life", d: "a book for every life, full of the good things in it" },
{ t: "academy", n: "The School of Lanterns", d: "where lamp-wardens, ferry hands and story-keepers are taught" },
{ t: "market", n: "The Garnet Market", d: "gems, silver and lanterns bought and sold" },
{ t: "temple", n: "The Temple of the Turning Year", d: "where Hearthdeep marks the seasons, and the day spring goes up to the world above" },
{ t: "bank", n: "The Treasury of Deep Riches", d: "the bank of the city's gems and silver" },
{ t: "dock", n: "The Ferry Quay", d: "the ferry guild's quay on the slow dark river" },
{ t: "inn", n: "The Ember and Kettle", d: "a snug inn with a fire in every room" }
],
arena: { n: "The Lamp Course", d: "the lamp-wardens' training ground", about: "Six lamp posts stand round the course. Run to each as it lights gold; a lamp-warden must reach a dark lamp before anyone notices it has gone out." },
homes: { n: "The Glowcap Rows", d: "cosy homes under the giant glowing caps" },
tunnel: { n: "The Garnet Way", kind: "tunnel" },
deep: { n: "The Gem Galleries", d: "the garnet galleries, the silver forges, the lantern works and the orchards that grow by lamplight", heart: "crystal",
b: [{ t: "mine", n: "The Garnet Galleries", d: "deep red gems dug from the cavern walls" }, { t: "forge", n: "The Silver Forges", d: "silver worked into lamps and bowls" }, { t: "workshop", n: "The Lantern Works", d: "where every lamp in Hearthdeep is made" }, { t: "farm", n: "The Lamplit Orchards", d: "pomegranates and glowcaps grown under warm lamps" }],
gather: [{ k: "gr_underworld_garnet", n: "A garnet vein", v: "prise out a garnet", look: "crystal" }, { k: "gr_underworld_silver", n: "A silver seam", v: "dig silver ore", look: "ore" }, { k: "gr_underworld_pomegranate", n: "A lamplit pomegranate tree", v: "pick a pomegranate", look: "crop" }, { k: "gr_underworld_glowcap", n: "A patch of glowcaps", v: "gather glowcaps", look: "herb" }] },
trade: { say: "The Garnet Market buys what the Gem Galleries bring up and sells the city's lamps and silver.", sells: ["cr_glass", "cr_crystal", "cr_coal"], buys: ["gr_underworld_garnet", "gr_underworld_silver", "gr_underworld_pomegranate", "gr_underworld_glowcap", "cr_ore", "cr_ember"] },
lore: [["The city beneath", "The old stories made the land under the earth a place of riches as well as rest: every gem and every seam of silver lies below. Hearthdeep was built where the richest seams meet, and it has always been warm."],
["The King and Queen Below", "The King and Queen Below rule from the Hall of the Deep Crown, though the Queen spends part of each year in the world above, and spring goes with her. While she is away, the Steward keeps the city."],
["The Court of Kind Hearing", "Here no one is frightened or rushed. Each soul tells their story, the judges listen, and nearly everyone is sent on to rest in quiet fields."],
["The lamps", "Every family in Hearthdeep hangs a lamp in the Square of Warm Lamps. When a new family arrives, the lamp-wardens light one for them before they even ask."],
["The ferry guild", "The ferry hands on the slow dark river are a guild of their own. They are famous for their patience, their long poles and their very bad jokes."],
["The lamplit orchards", "The pomegranates of Hearthdeep grow under lamps in the Gem Galleries. A bowl of their seeds is set out at every feast, in memory of the Queen's old story."]],
lectures: [{ t: "Garnets", x: "Garnets are a family of silicate minerals that form under heat and pressure deep in the Earth. They are most often deep red, but come in almost every colour; the garnet is the birthstone for January.", q: ["Which month has the garnet as its birthstone?", ["January", "July", "October"], 0] },
{ t: "Silver", x: "Silver conducts electricity and heat better than any other metal. It is soft enough to work by hand, which is why silversmiths have shaped it into bowls and jewellery for thousands of years.", q: ["What does silver do better than any other metal?", ["Conduct electricity", "Float on water", "Stay hot for ever"], 0] },
{ t: "Glow-worm caves", x: "In the Waitomo caves of New Zealand, the ceilings shine with glow-worms: the larvae of a small fly. Each glows blue-green and lets down sticky threads to catch insects drawn to its light.", q: ["What are the glow-worms of Waitomo?", ["The larvae of a small fly", "Glowing stones", "Tiny fish"], 0] },
{ t: "The pomegranate", x: "The pomegranate first grew wild in the lands around Iran and was carried across the ancient world. One fruit can hold hundreds of seeds, each wrapped in a juicy red jewel called an aril.", q: ["What is the juicy red covering of a pomegranate seed called?", ["An aril", "A husk", "A stone"], 0] },
{ t: "The seasons in the old story", x: "The ancient Greeks told that the queen of the world below spends part of each year beneath the earth. While she is gone her mother grieves and nothing grows, and when she returns, spring comes. It is a story, not science: real seasons come from the tilt of the Earth's axis.", q: ["What really causes the seasons?", ["The tilt of the Earth's axis", "The Moon", "Volcanoes"], 0] }],
persona: "Hearthdeep is the warm, lamp-lit city of the Underworld in SomnuMatrix, beneath the earth past the slow dark river. It is a place of riches and rest, never of fear: gem-cutters, lantern-makers, gentle judges and ferry hands live here, and the Steward keeps the city for the King and Queen Below. Everyone is kind, calm and welcoming, and nothing here is frightening.",
mats: [{ k: "gr_underworld_garnet", n: "Deep garnet", e: "🔴", p: 28 }, { k: "gr_underworld_silver", n: "Silver ore", e: "🪙", p: 16 }, { k: "gr_underworld_pomegranate", n: "Lamplit pomegranate", e: "🍎", p: 7 }, { k: "gr_underworld_glowcap", n: "Glowcap", e: "🍄", p: 8 }]
});
grRealm({ id: "heavens", parent: { w: "land", sub: "heavens" }, parentName: "the Heavens", name: "Lumenreach", short: "Lumenreach",
blurb: "the city of the Morning Court, its tiered halls riding the clouds in endless golden light",
intro: "High above the cloud sea, tiered halls of white and gold float on islands of cloud, joined by bridges of light. Winged folk and pegasus riders come and go, and the Palace of the Morning Court stands highest of all.",
style: "eastern", layout: "isles", tone: 560, gateCol: 0xFFE8B0,
env: { top: 0x7FAEE4, low: 0xFFF2DA, fog: 0xE8E4DC, fogD: 0.0008, sun: 0.85, sunCol: 0xFFF2D6, sunDir: [0.4, 0.8, -0.3], hemi: 0.62, hemiCol: 0xFFF0D8, hemiGround: 0xB8B0A0, groundCol: 0x9EA2AA, groundCol2: 0xACA690, groundTex: "marble", mtn: 0xC0C4CC, mtnTex: "snow", cloud: 0xE4E0D8, cloud2: 0xB8C8DC },
gate: { n: "The Stair of Dawn", d: "a long stair of light up through the cloudbank to the city of the Morning Court", back: "The Stair of Dawn" },
warden: ["Elior Brightwing", "Warden of the Stair of Dawn", "a cheerful winged warden who meets every climber at the top of the stair with a cup of honeyed milk and a seat to catch their breath"],
names: ["Elior", "Ilaria", "Cassiel", "Noor", "Aurel", "Sefa", "Halcyon", "Mirelle", "Tavish", "Ondina", "Lysander", "Paz", "Evander", "Solenne", "Ravi", "Clementine"],
surnames: ["Brightwing", "Sunmere", "Dawnley", "Featherstone", "Goldhallow", "Skyward", "Haloran", "Clearwater", "Lightfoot", "Morrow", "Amberlee", "Cirrus"],
citizenTitles: ["Cloud gardener", "Choir singer", "Pegasus rider", "Weather-keeper", "Visiting dreamer"], guardTitle: "Wingguard",
plaza: { n: "The Court of Morning", d: "where the whole city gathers to greet a sunrise that never quite ends", heart: "fountain" }, avenue: { n: "The Avenue of Clouds" },
palace: { t: "palace", n: "The Palace of the Morning Court", d: "the tiered palace from which the Morning Court keeps the Heavens in peace", hall: "The Hall of Golden Light",
seat: ["throne", "The Seat of the Dawn", 0],
staff: [["Highwarden Ilaria Sunmere", "First of the Morning Court", "the Highwarden of the Morning Court: serene, warm and endlessly curious about the dreamers who climb up to visit"], ["Aurel Dawnley", "Herald of the Court"], ["Mirelle Goldhallow", "Keeper of the Light"]],
rooms: [["council", "The Council of Seven Skies", 1], ["banquet", "The Hall of Feasting Light", 0], ["suite", "The Highwarden's Apartments", 1], ["treasury", "The Treasury of Sunpearls", 1], ["gallery", "The Gallery of Wings", 0],
["library", "The Library of the Court", 0], ["kitchen", "The Honey Kitchens", 1], ["armoury", "The Wingguard Armoury", 1], ["office", "The Herald's Office", 1], ["music", "The Choir Loft", 0], ["chapel", "The Chapel of Dawn", 0], ["suite", "The Guest Pavilions", 0]] },
wards: [
{ t: "academy", n: "The Choir School of the Spheres", d: "where every child of the Heavens learns to sing, play and fly", staff: [["Mistress Solenne Featherstone", "Mistress of the Choir School", "the Choir Mistress, who can hear a single note out of tune in a choir of a hundred and gently fixes it"]] },
{ t: "theatre", n: "The Hall of Harps", d: "concerts of harp and choir on the edge of the clouds" },
{ t: "observatory", n: "The Weathervane Observatory", d: "where the weather-keepers watch the clouds below" },
{ t: "temple", n: "The Temple of the Seventh Sky", d: "the highest and quietest hall in the city" },
{ t: "hospital", n: "The House of Mending Wings", d: "where tired wings and tired dreamers are rested and mended" },
{ t: "market", n: "The Cloud Bazaar", d: "sunpearls, cloud-wool and honey traded on the drifting stalls" },
{ t: "barracks", n: "The Wingguard Aerie", d: "the pegasus riders who keep watch over the cloud roads" },
{ t: "embassy", n: "The Embassy of the Sun Road", d: "where visitors from every sky and land are welcomed" }
],
arena: { n: "The Pegasus Field", d: "the Wingguard's training ground on a cloud island", about: "Six posts float round the field. Run to each as it lights gold; a Wingguard rider must be at any cloud road in moments." },
homes: { n: "The Cloudside Pavilions", d: "airy homes with tiered roofs on the cloud islands" },
tunnel: { n: "The Prism Bridge", kind: "bridge" },
deep: { n: "The Halcyon Cloudfarms", d: "the cloud orchards, the rainmakers' works, the skyship moorings and the sunlight springs", heart: "fountain",
b: [{ t: "farm", n: "The Cloud Orchards", d: "cloud-wool combed and honey taken from the sky-bees" }, { t: "workshop", n: "The Rainmakers' Works", d: "where gentle rain is spun for the lands below" }, { t: "dock", n: "The Skyship Moorings", d: "where the cloud-ships tie up" }, { t: "bath", n: "The Sunlight Springs", d: "warm pools full of soft light" }],
gather: [{ k: "gr_heavens_cloudwool", n: "A drift of cloud-wool", v: "comb the cloud-wool", look: "crop" }, { k: "gr_heavens_sunpearl", n: "A cluster of sunpearls", v: "pick a sunpearl", look: "crystal" }, { k: "gr_heavens_honey", n: "A sky-bee hive", v: "take a comb of sky-honey", look: "herb" }, { k: "gr_heavens_mist", n: "Morning mist in the hollows", v: "bottle the mist", look: "gas" }] },
trade: { say: "The Cloud Bazaar buys what the cloudfarms bring in and sells the city's fine goods.", sells: ["cr_cloth", "cr_glass", "cr_crystal"], buys: ["gr_heavens_cloudwool", "gr_heavens_sunpearl", "gr_heavens_honey", "gr_heavens_mist", "cr_wood"] },
lore: [["The founding of Lumenreach", "The first of the winged folk rested on a cloud that held, and then on another. They tied the clouds together with bridges of light, and by the time the sun had climbed a little, there was a city."],
["The Morning Court", "Seven keepers, one for each sky, sit on the Morning Court, led by the Highwarden. They keep the Heavens in peace and send gentle weather to the lands below."],
["The endless sunrise", "In Lumenreach the sun rises and never quite finishes rising. It is always early morning, with the whole day still to come."],
["The Wingguard", "The Wingguard ride pegasi along the cloud roads, helping lost travellers and catching anyone who steps off an island by mistake. They have never missed one."],
["Sunpearls", "Where sunlight lies still on a cloud long enough, it gathers into small warm pearls. They light the city at the hour when the sky is palest."],
["The Rainmakers", "Rain for the lands below is spun at the Rainmakers' Works and let down softly. A rainmaker's proudest boast is a rainbow."]],
lectures: [{ t: "What clouds are", x: "Clouds are made of tiny droplets of water or crystals of ice, so small that rising air keeps them up. A fluffy cumulus cloud can weigh hundreds of tonnes, spread through a huge volume of air.", q: ["What are clouds made of?", ["Tiny water droplets or ice crystals", "Smoke", "Cotton"], 0] },
{ t: "Rainbows", x: "A rainbow forms when sunlight is bent, reflected and split into colours inside raindrops. Red is on the outside and violet on the inside, and you always see a rainbow with the Sun behind you.", q: ["Where must the Sun be for you to see a rainbow?", ["Behind you", "In front of you", "Directly overhead"], 0] },
{ t: "Why the sky is blue", x: "Air scatters short blue wavelengths of sunlight much more than long red ones, so blue light comes at us from every part of the sky. This is called Rayleigh scattering.", q: ["Why is the daytime sky blue?", ["Air scatters blue light more than red", "The sea reflects in it", "Space is blue"], 0] },
{ t: "Lightning", x: "A bolt of lightning heats the air around it to about 30,000 °C, several times hotter than the surface of the Sun. The air expands so fast that it makes the sound we hear as thunder.", q: ["What makes the sound of thunder?", ["Air heated by lightning expanding suddenly", "Clouds bumping together", "Rain hitting the ground"], 0] },
{ t: "How birds stay light", x: "Many birds have hollow bones crossed with thin struts, and air sacs that reach into some of them. Their skeletons are light but strong enough for flight.", q: ["What helps many birds stay light enough to fly?", ["Hollow bones", "Feathers full of helium", "Very small hearts"], 0] }],
persona: "Lumenreach is the cloud city of the Heavens in SomnuMatrix, governed by the Morning Court under the Highwarden. Winged folk, choir singers, weather-keepers and pegasus riders of the Wingguard live in tiered halls on cloud islands in an endless golden morning. They are serene and warm, and love explaining real weather and sky science.",
mats: [{ k: "gr_heavens_cloudwool", n: "Cloud-wool", e: "☁️", p: 10 }, { k: "gr_heavens_sunpearl", n: "Sunpearl", e: "🌕", p: 30 }, { k: "gr_heavens_honey", n: "Sky-honey", e: "🍯", p: 9 }, { k: "gr_heavens_mist", n: "Bottled morning mist", e: "🌫️", p: 6 }]
});
grRealm({ id: "depths", parent: { w: "land", sub: "depths" }, parentName: "the Deep", name: "Coralmere", short: "Coralmere",
blurb: "the domed city of the merfolk, far beneath the waves where only the creatures make their own light",
intro: "Under a great dome of living glass on the sea floor, coral towers glow with soft light, and shoals drift past the windows. The Avenue of Tides leads up to the Pearl Court of Queen Maren.",
style: "coral", layout: "dome", tone: 380, gateCol: 0x7FD8E0,
env: { top: 0x04182A, low: 0x1A5A6C, fog: 0x103A4A, fogD: 0.0028, sun: 0.4, sunCol: 0x9FD8E8, sunDir: [0.2, 1, 0.1], hemi: 0.75, hemiCol: 0x8FD0DC, hemiGround: 0x1E3A38, groundCol: 0x4E6A62, groundCol2: 0x7A8C7C, groundTex: "sand", mtn: 0x2E4A50, mtnTex: "sand" },
gate: { n: "The Pearl Lock", d: "a lock of bubbles and glass into the merfolk's domed city", back: "The Pearl Lock" },
warden: ["Nerys Tidewell", "Keeper of the Pearl Lock", "a merfolk lockkeeper with a seahorse that follows her everywhere, who asks every visitor what the sky looks like today"],
names: ["Nerys", "Callum", "Marina", "Oren", "Coraline", "Tadeo", "Isla", "Pelagio", "Sirena", "Finnian", "Lagoa", "Ronan", "Delphine", "Kai", "Perla", "Ewan"],
surnames: ["Tidewell", "Shellwright", "Deepwater", "Brine", "Kelpie", "Saltmarsh", "Wavecrest", "Undertow", "Pearlman", "Reefsby", "Gullane", "Fathom"],
citizenTitles: ["Pearl diver", "Kelp farmer", "Tide-scholar", "Seahorse rider", "Diver from the surface"], guardTitle: "Trident guard",
plaza: { n: "The Square of Lightfall", d: "where the last faint light from the surface falls through the dome onto the coral", heart: "crystal" }, avenue: { n: "The Avenue of Tides" },
palace: { t: "palace", n: "The Pearl Court", d: "the palace of Queen Maren, ruler of the merfolk of the Deep", hall: "The Hall of Mother-of-Pearl",
seat: ["throne", "The Shell Throne", 0],
staff: [["Queen Maren", "Queen of the merfolk of the Deep", "Queen Maren, ruler of the merfolk, gracious and curious about the world above, who asks every visitor about the sky"], ["Oren Shellwright", "Chamberlain of the Pearl Court"], ["Delphine Wavecrest", "Keeper of the Tides"]],
rooms: [["council", "The Council of Currents", 1], ["banquet", "The Feast Hall of the Tides", 0], ["suite", "The Queen's Grotto", 1], ["treasury", "The Pearl Treasury", 1], ["gallery", "The Gallery of Wrecks", 0],
["library", "The Shell Library", 0], ["kitchen", "The Kelp Kitchens", 1], ["armoury", "The Trident Armoury", 1], ["office", "The Chamberlain's Office", 1], ["lounge", "The Bubble Salon", 0], ["map", "The Chart Room of the Seas", 0], ["suite", "The Surface Guests' Rooms", 0]] },
wards: [
{ t: "academy", n: "The Tide School", d: "where young merfolk learn the currents, the creatures and the songs", staff: [["Master Pelagio Brine", "Master of the Tide School", "an old tide-scholar who can name every fish in the reef by the way it swims"]] },
{ t: "library", n: "The Archive of Shells", d: "histories written in spirals inside great shells" },
{ t: "market", n: "The Sunken Exchange", d: "pearls, sea-glass and kelp traded in an old wreck's hold" },
{ t: "temple", n: "The Temple of Deep Currents", d: "a quiet hall where the great currents are honoured" },
{ t: "hospital", n: "The Anemone Infirmary", d: "where the merfolk's healers mend fins and scales" },
{ t: "barracks", n: "The Trident Guard", d: "seahorse riders who keep the reef roads safe" },
{ t: "observatory", n: "The Lightfall Observatory", d: "where scholars watch the far-off light of the surface" },
{ t: "theatre", n: "The Whalesong Theatre", d: "concerts sung with the great whales who pass the dome" }
],
arena: { n: "The Seahorse Ring", d: "the Trident Guard's training ground", about: "Six posts stand round the ring. Swim to each as it lights gold; a Trident rider must reach any reef road before the tide turns." },
homes: { n: "The Coral Terraces", d: "homes grown from living coral" },
tunnel: { n: "The Kelp-Glass Tube", kind: "tube" },
deep: { n: "The Trench Works", d: "the vent mines, the kelp farms, the salvage dock and the glowlight laboratory at the trench edge", heart: "crystal",
b: [{ t: "mine", n: "The Vent Mines", d: "minerals gathered round the warm vents" }, { t: "farm", n: "The Kelp Farms", d: "tall kelp forests grown in rows" }, { t: "dock", n: "The Wreck Salvage Dock", d: "where old wrecks are carefully searched and mended" }, { t: "lab", n: "The Glowlight Laboratory", d: "where scholars study the creatures that make their own light" }],
gather: [{ k: "gr_depths_pearl", n: "An open giant clam", v: "take a pearl", look: "crystal" }, { k: "gr_depths_kelp", n: "A row of tall kelp", v: "cut kelp", look: "crop" }, { k: "gr_depths_ventore", n: "A crust of vent minerals", v: "chip the vent crust", look: "ore" }, { k: "gr_depths_silverfin", n: "A shoal of silverfin", v: "net a few silverfin", look: "fish" }] },
trade: { say: "The Sunken Exchange buys what the Trench Works bring in and sells the merfolk's goods.", sells: ["cr_glass", "cr_cloth", "cr_crystal"], buys: ["gr_depths_pearl", "gr_depths_kelp", "gr_depths_ventore", "gr_depths_silverfin", "cr_ore", "cr_wood"] },
lore: [["The founding of Coralmere", "The merfolk grew the dome from living glass-coral over a hundred years, a ring at a time, until it covered the whole of the valley. Inside, the water is calm and warm, and the city lights itself."],
["Queen Maren", "Queen Maren has ruled the Deep for longer than anyone remembers. She has never seen the sky, but she keeps a bowl of surface sand by her throne and asks every visitor about it."],
["The Trident Guard", "The Trident Guard ride seahorses along the reef roads. Their tridents are mostly for pointing the way, and they are famous for finding lost divers."],
["The Archive of Shells", "The merfolk write in spirals inside great shells. Hold one to your ear and the scholars say you can hear the story."],
["Whalesong", "Every year the great whales pass the dome, and the merfolk sing with them. The concerts in the Whalesong Theatre can be heard for miles."],
["The Trench Works", "Beyond the Kelp-Glass Tube, warm water rises from cracks in the sea floor. Strange creatures live round the vents, and the merfolk gather minerals there with great care."]],
lectures: [{ t: "Pressure under the sea", x: "The weight of the water above presses down harder the deeper you go: about one extra atmosphere of pressure for every 10 metres. At the bottom of the Challenger Deep, nearly 11 kilometres down, it is over a thousand times the pressure at the surface.", q: ["How much does the pressure rise every 10 metres down in the sea?", ["About one atmosphere", "Not at all", "About one hundred atmospheres"], 0] },
{ t: "Life at the vents", x: "In 1977 scientists diving near the Galápagos found hydrothermal vents on the sea floor, surrounded by giant tube worms and clams. They live without sunlight: bacteria make food from chemicals in the vent water, a process called chemosynthesis.", q: ["How do vent bacteria make food without sunlight?", ["From chemicals in the vent water", "From moonlight", "They do not need food"], 0] },
{ t: "The octopus", x: "An octopus has three hearts and blue blood, which carries oxygen using copper instead of iron. It can change colour and texture in a fraction of a second to blend in.", q: ["How many hearts does an octopus have?", ["Three", "One", "Eight"], 0] },
{ t: "Kelp forests", x: "Giant kelp is a seaweed, not a plant, and it can grow about half a metre in a single day. Kelp forests shelter fish, seals and sea otters along cool coasts.", q: ["How fast can giant kelp grow?", ["About half a metre a day", "A centimetre a year", "It never grows"], 0] },
{ t: "Whale song", x: "Male humpback whales sing long songs made of repeating themes. Whales in the same area sing the same song, and it slowly changes from year to year.", q: ["Which whales are famous for singing long, changing songs?", ["Humpback whales", "Blue sharks", "Dolphins only"], 0] }],
persona: "Coralmere is the domed city of the merfolk on the floor of the Deep in SomnuMatrix, ruled by Queen Maren from the Pearl Court. Pearl divers, kelp farmers, tide-scholars and the seahorse riders of the Trident Guard live there. They are curious about the sky and the surface world, and love sharing real facts about the ocean.",
mats: [{ k: "gr_depths_pearl", n: "Deep pearl", e: "🦪", p: 32 }, { k: "gr_depths_kelp", n: "Ribbon kelp", e: "🌿", p: 5 }, { k: "gr_depths_ventore", n: "Vent crust", e: "🪨", p: 14 }, { k: "gr_depths_silverfin", n: "Silverfin", e: "🐟", p: 8 }]
});
grRealm({ id: "faerie", parent: { w: "land", sub: "faerie" }, parentName: "Faerie", name: "Glimmerwold", short: "Glimmerwold",
blurb: "the twilight city of the fae, grown from great trees, toadstools and briar under a violet sky",
intro: "In a wood where it is always dusk, houses grow from the trunks of giant trees and lanterns hang from every branch. The Avenue of Lanterns winds up to the Bramble Palace, where the Moonlit Court keeps its bargains.",
style: "fae", layout: "open", tone: 500, gateCol: 0xE8B8FF,
env: { top: 0x2A2256, low: 0xD08AB8, fog: 0x6A4A7A, fogD: 0.0018, sun: 0.55, sunCol: 0xF0C8FF, sunDir: [-0.4, 0.5, -0.5], hemi: 0.8, hemiCol: 0xE0C8F0, hemiGround: 0x2A4A30, stars: 1, groundCol: 0x3A7048, groundCol2: 0x5A8656, groundTex: "grass", mtn: 0x2E4A3A, mtnTex: "grass" },
gate: { n: "The Ring of Toadstools", d: "a great fairy ring that opens, if you ask politely, on the city of the fae", back: "The Ring of Toadstools" },
warden: ["Bramwell Thistledown", "Keeper of the Ring", "a gnome with a hat taller than he is, who asks every visitor for their name and gives them a nickname in return"],
names: ["Bramwell", "Elowen", "Puck", "Briony", "Tamsin", "Sorrel", "Hazel", "Linden", "Wisteria", "Rowan", "Fennel", "Ivy", "Corrie", "Juniper", "Teasel", "Marigold"],
surnames: ["Thistledown", "Briarlight", "Moonpetal", "Dewberry", "Foxglove", "Hollowoak", "Mossbank", "Starnettle", "Willowisp", "Hedgely", "Fernsby", "Glimmering"],
citizenTitles: ["Gossamer weaver", "Moonlight trader", "Toadstool builder", "Dew gatherer", "Visiting dreamer"], guardTitle: "Thorn guard",
plaza: { n: "The Dancing Green", d: "a wide ring of grass where the fae dance every dusk, which is every evening", heart: "tree" }, avenue: { n: "The Avenue of Lanterns" },
palace: { t: "palace", n: "The Bramble Palace", d: "the living palace of the Moonlit Court, grown from roses and briar", hall: "The Hall of Thorns and Roses",
seat: ["throne", "The Bramble Throne", 0],
staff: [["Queen Elowen Briarlight", "Queen of the Moonlit Court", "the Queen of the Moonlit Court: merry, proud, fond of riddles, and always true to the letter of a promise"], ["Sorrel Moonpetal", "Keeper of Bargains"], ["Linden Hollowoak", "Steward of the Bramble"]],
rooms: [["council", "The Ring of Counsel", 1], ["banquet", "The Moonlit Banquet", 0], ["suite", "The Queen's Bower", 1], ["treasury", "The Treasury of Moonstones", 1], ["gallery", "The Gallery of Wings", 0],
["library", "The Book of Bargains", 0], ["kitchen", "The Honey Kitchens", 1], ["armoury", "The Thorn Armoury", 1], ["office", "The Keeper of Bargains' Desk", 1], ["music", "The Fiddlers' Bower", 0], ["greenhouse", "The Night Garden", 0], ["suite", "The Mortal Guests' Rooms", 0]] },
wards: [
{ t: "academy", n: "The Academy of Small Enchantments", d: "where young fae learn to make flowers open and lanterns glow", staff: [["Mistress Briony Foxglove", "Mistress of Small Enchantments", "a brisk fairy teacher who insists that the smallest spells are the hardest to do well"]] },
{ t: "guild", n: "The Gossamer Weavers", d: "who spin cloth from spider silk and moonlight" },
{ t: "market", n: "The Moonlight Fair", d: "where every bargain is fair and kept to the letter" },
{ t: "library", n: "The Book-Tree Library", d: "a hollow oak whose branches are shelves" },
{ t: "temple", n: "The Grove of the Old Oak", d: "the oldest tree in the wood, and the quietest place in it" },
{ t: "inn", n: "The Toadstool Inn", d: "a springy-floored inn for mortal visitors" },
{ t: "theatre", n: "The Dancing Ring Theatre", d: "plays, puppets and fiddle music under the stars" },
{ t: "bath", n: "The Dewdrop Baths", d: "pools of warm dew among the ferns" }
],
arena: { n: "The Will-o'-Wisp Run", d: "the Thorn Guard's training ground", about: "Six posts stand round the run. Dash to each as its lantern lights gold, quick as a wisp." },
homes: { n: "The Hollow Trees", d: "homes grown into the trunks of giant trees, and toadstool cottages between them" },
tunnel: { n: "The Hollow Root", kind: "tunnel" },
deep: { n: "The Glowwood", d: "the honey meadows, the dew distillery, the moonstone delvings and the lily-pad landing", heart: "tree",
b: [{ t: "farm", n: "The Honey Meadows", d: "wildflower meadows humming with bees" }, { t: "workshop", n: "The Dew Distillery", d: "where dew is gathered and bottled at dusk" }, { t: "mine", n: "The Moonstone Delvings", d: "where the gnomes dig pale glowing stones" }, { t: "dock", n: "The Lily-Pad Landing", d: "where leaf-boats come in across the pond" }],
gather: [{ k: "gr_faerie_honey", n: "A wild bees' hive", v: "take a comb of honey", look: "crop" }, { k: "gr_faerie_moonstone", n: "A moonstone seam", v: "dig a moonstone", look: "crystal" }, { k: "gr_faerie_dew", n: "Dew on the ferns", v: "gather dew", look: "herb" }, { k: "gr_faerie_silk", n: "An old spider's web, long left", v: "wind the silk", look: "herb" }] },
trade: { say: "The Moonlight Fair buys what the Glowwood gives and sells the fae's own fine things. Fair trade only.", sells: ["cr_cloth", "cr_wood", "cr_crystal"], buys: ["gr_faerie_honey", "gr_faerie_moonstone", "gr_faerie_dew", "gr_faerie_silk", "cr_glass"] },
lore: [["The founding of Glimmerwold", "The fae say the wood grew first and the city simply moved in. Every house is a tree that agreed to it, and the fae ask the trees again every spring."],
["The Moonlit Court", "The Queen and her court rule from the Bramble Palace. A promise made at court is written in the Book of Bargains and kept exactly as it was said, so the fae choose their words very carefully."],
["Fair bargains", "A fae bargain is always kept to the letter. Mortal visitors are told to say exactly what they mean, and to say thank you."],
["The everlasting dusk", "It is always dusk in Glimmerwold, the hour when the lanterns are lit and the dancing starts."],
["The gnomes of the Delvings", "The gnomes dig moonstones beyond the Hollow Root. They say each stone holds a little of every moonrise it ever saw."],
["Mortal guests", "Mortal dreamers are welcome guests. Eat what you are offered, dance if you like, and you will always find your way home."]],
lectures: [{ t: "Fairy rings", x: "A real fairy ring is a circle of mushrooms. The fungus spreads outwards underground from where it began, and its mushrooms come up round the edge. Some rings are hundreds of years old.", q: ["Why do fairy rings form a circle?", ["The fungus grows outwards underground", "Fairies plant them", "Rain falls in circles"], 0] },
{ t: "How bees make honey", x: "Honeybees drink nectar from flowers and store it in wax cells. They fan it with their wings until most of the water has gone and it thickens into honey, which keeps for a very long time.", q: ["How do bees thicken nectar into honey?", ["They fan it to remove water", "They freeze it", "They mix it with mud"], 0] },
{ t: "Fireflies", x: "Fireflies are beetles, not flies. They make cold light in their bodies by a chemical reaction, and each kind flashes its own pattern to find a mate.", q: ["What kind of creature is a firefly?", ["A beetle", "A fly", "A moth"], 0] },
{ t: "Spider silk", x: "Weight for weight, some spider silk is stronger than steel and stretchier than nylon. A spider can make several kinds of silk from different glands, for webs, egg cases and safety lines.", q: ["Weight for weight, some spider silk is stronger than what?", ["Steel", "Paper only", "Nothing"], 0] },
{ t: "Moonstone", x: "Moonstone is a kind of feldspar. Thin layers inside it scatter light, giving a soft blue-white sheen that seems to float under the surface.", q: ["What gives moonstone its floating sheen?", ["Thin layers that scatter light", "Paint", "It glows by itself"], 0] }],
persona: "Glimmerwold is the twilight city of Faerie in SomnuMatrix, grown from giant trees, toadstools and briar, and ruled by the Queen of the Moonlit Court from the Bramble Palace. Fairies, gnomes and pixies live there; they are merry, playful, fond of riddles, and every bargain they make is fair and kept to the letter. They are always kind to mortal guests.",
mats: [{ k: "gr_faerie_honey", n: "Wildflower honey", e: "🍯", p: 8 }, { k: "gr_faerie_moonstone", n: "Moonstone", e: "🌙", p: 26 }, { k: "gr_faerie_dew", n: "Bottled dusk-dew", e: "💧", p: 7 }, { k: "gr_faerie_silk", n: "Gossamer silk", e: "🕸️", p: 15 }]
});
grRealm({ id: "void", parent: { w: "land", sub: "void" }, parentName: "the Void", name: "Stillspire", short: "Stillspire",
blurb: "the quiet crystal city adrift in the dark between everything, lit by lamps and far-off stars",
intro: "Crystal towers rise from islands floating in the endless dark, joined by threads of light. It is the quietest city anywhere, and the Lantern Spire at its centre has never once gone out.",
style: "crystal", layout: "isles", tone: 320, gateCol: 0xA8B0FF,
env: { top: 0x000000, low: 0x07070C, fog: 0x08081A, fogD: 0.0012, sun: 0.45, sunCol: 0xB8C0E8, sunDir: [0.3, 0.7, 0.4], hemi: 0.75, hemiCol: 0x9AA4C8, hemiGround: 0x1A1A2A, stars: 1, groundCol: 0x2A2A3C, groundCol2: 0x46465E, groundTex: "marble", mtn: 0x2A2A40, mtnTex: "marble", cloud: 0x14142A, cloud2: 0x0A0A18 },
gate: { n: "The Lamp in the Dark", d: "a single lamp on a post in the emptiness; walk to it, and the city appears", back: "The Lamp in the Dark" },
warden: ["Orrin Hollowlight", "Keeper of the Lamp in the Dark", "a quiet lamp-keeper who speaks softly, because in the Void every word carries, and who is very glad of company"],
names: ["Orrin", "Vela", "Silas", "Nyx", "Eamon", "Lune", "Quill", "Astra", "Halden", "Mira", "Ciaran", "Selka", "Tobin", "Ysolde", "Pell", "Aria"],
surnames: ["Hollowlight", "Stillwater", "Farlamp", "Quietude", "Nightingale", "Driftwood", "Glassby", "Umbridge", "Hush", "Starfall", "Emberlane", "Nought"],
citizenTitles: ["Lamp-keeper", "Shard cutter", "Drift pilot", "Listener", "Visiting dreamer"], guardTitle: "Lantern guard",
plaza: { n: "The Plaza of First Light", d: "where the first lamp in the Void was hung, and still burns", heart: "crystal" }, avenue: { n: "The Thread of Lamps" },
palace: { t: "palace", n: "The Lantern Spire", d: "the crystal tower of the Keepers of the Quiet, whose lamp lights the whole Void", hall: "The Hall of the Undying Lamp",
seat: ["throne", "The Seat of the First Keeper", 0],
staff: [["First Keeper Vela Stillwater", "First Keeper of the Quiet", "the First Keeper of Stillspire, gentle and thoughtful, who believes the dark is only a place where light has not yet been"], ["Silas Farlamp", "Keeper of the Lamp"], ["Astra Glassby", "Steward of the Spire"]],
rooms: [["council", "The Council of the Quiet", 1], ["banquet", "The Hall of Shared Light", 0], ["suite", "The First Keeper's Rooms", 1], ["treasury", "The Vault of Shards", 1], ["gallery", "The Gallery of Lost Stars", 0],
["library", "The Library of Echoes", 0], ["kitchen", "The Spire Kitchens", 1], ["armoury", "The Lantern Guard Store", 1], ["office", "The Keeper's Office", 1], ["observe", "The Lamp Room", 0], ["crystal", "The Shard Garden", 0], ["suite", "The Guest Rooms of the Spire", 0]] },
wards: [
{ t: "observatory", n: "The Observatory of the Far Dark", d: "where astronomers watch the faintest lights there are", staff: [["Astronomer Eamon Driftwood", "Astronomer of the Far Dark", "an astronomer who has spent a lifetime looking at the faintest smudges of light and finds every one of them wonderful"]] },
{ t: "lab", n: "The Laboratory of Almost Nothing", d: "the study of empty space and what is in it after all" },
{ t: "academy", n: "The Academy of the Unwritten", d: "where students learn to imagine what is not there yet" },
{ t: "temple", n: "The Temple of Stillness", d: "a hall of perfect quiet for rest and thinking" },
{ t: "library", n: "The Echo Stacks", d: "books that whisper their first lines when opened" },
{ t: "market", n: "The Exchange of Rare Light", d: "shards, stardust and lamps traded quietly" },
{ t: "inn", n: "The Last Lamp Inn", d: "a warm, bright inn for travellers in the dark" },
{ t: "dock", n: "The Driftharbour", d: "where the drift-boats come in between the floating islands" }
],
arena: { n: "The Floating Field", d: "the Lantern Guard's training ground on a drifting island", about: "Six posts stand round the field. Run to each as it lights gold; a Lantern Guard must reach a dimming lamp before the dark notices." },
homes: { n: "The Lamplit Isles", d: "small crystal homes on islands of their own, each with a lamp at the door" },
tunnel: { n: "The Thread of Light", kind: "bridge" },
deep: { n: "The Shardfields", d: "the shard quarries, the starlight spinnery, the driftship yards and the glowmoss terraces", heart: "crystal",
b: [{ t: "mine", n: "The Shard Quarries", d: "floating crystal cut into lamp-shards" }, { t: "workshop", n: "The Starlight Spinnery", d: "where faint starlight is spun into thread" }, { t: "hangar", n: "The Driftship Yards", d: "where the drift-boats are built and mended" }, { t: "farm", n: "The Glowmoss Terraces", d: "soft glowing moss grown for food and light" }],
gather: [{ k: "gr_void_shard", n: "A floating crystal shard", v: "cut a lamp-shard", look: "crystal" }, { k: "gr_void_stardust", n: "A drift of stardust", v: "scoop stardust", look: "gas" }, { k: "gr_void_glowmoss", n: "A bank of glowmoss", v: "gather glowmoss", look: "herb" }, { k: "gr_void_cometice", n: "A lump of drifting comet ice", v: "chip the comet ice", look: "ice" }] },
trade: { say: "The Exchange of Rare Light buys what the Shardfields bring in, and sells lamps and glass.", sells: ["cr_glass", "cr_crystal", "cr_parts"], buys: ["gr_void_shard", "gr_void_stardust", "gr_void_glowmoss", "gr_void_cometice", "cr_ore"] },
lore: [["The first lamp", "Long ago a traveller lost in the Void hung a lamp on a post so she could find her way back to it. Others saw it and came. The lamp still burns in the Plaza of First Light."],
["The Keepers of the Quiet", "Stillspire is kept by the Keepers, who tend the lamps and make sure no one is ever lost in the dark for long."],
["Why it is so quiet", "Sound needs something to travel through. Between the islands there is almost nothing, so the city is wonderfully still, and the Keepers like it that way."],
["The Watcher", "A great eye floats somewhere in the Void, watching everything kindly. The people of Stillspire wave to it when they pass, and they say it has never once been unkind."],
["The drift-boats", "Drift pilots steer between the islands by the lamps. A drift pilot who brings a lost traveller home is given a lamp of their own on the Thread."],
["The Shardfields", "Beyond the Thread of Light, crystal shards float in great slow clouds. Cut and polished, each one holds a little light for ever."]],
lectures: [{ t: "Sound in empty space", x: "Sound is a vibration passed from particle to particle, through air, water or rock. In the near-empty vacuum of space there is almost nothing to carry it, so space is silent.", q: ["Why can sound not travel through empty space?", ["There is almost nothing to carry the vibration", "It is too cold", "It is too dark"], 0] },
{ t: "Absolute zero", x: "Absolute zero, minus 273.15 °C, is the coldest anything can be: the point where particles have the least possible energy. The space between galaxies sits only a few degrees above it.", q: ["What is absolute zero in degrees Celsius?", ["Minus 273.15", "Zero", "Minus 100"], 0] },
{ t: "Why the night sky is dark", x: "If the universe were endless, unchanging and full of stars, every line of sight would end on a star and the night would blaze. It is dark because the universe has a beginning and is expanding, so light from most places has not had time to reach us, and far light is stretched into wavelengths we cannot see.", q: ["Why is the night sky dark, even with so many stars?", ["The universe has a beginning and is expanding", "Stars switch off at night", "Clouds block them"], 0] },
{ t: "The light year", x: "A light year is a distance, not a time: how far light travels in one year, about 9.46 trillion kilometres. Light covers the distance from the Moon to Earth in just over a second.", q: ["What does a light year measure?", ["A distance", "A time", "A brightness"], 0] },
{ t: "Lamp-shards", x: "In the lore of Stillspire, a shard cut from the Shardfields keeps whatever light first falls on it. That is why the Keepers cut them at the foot of the Lantern Spire.", q: ["In the lore of Stillspire, what does a lamp-shard keep?", ["The first light that falls on it", "The last sound it heard", "Warmth"], 0] }],
persona: "Stillspire is the quiet crystal city of the Void in SomnuMatrix, built on floating islands in the endless dark and kept by the Keepers of the Quiet from the Lantern Spire. Its people are lamp-keepers, shard cutters, drift pilots and astronomers; they speak softly, are gentle and full of wonder, and love explaining real facts about space, light and emptiness. Nobody is ever lost in the dark for long.",
mats: [{ k: "gr_void_shard", n: "Lamp-shard", e: "🔷", p: 22 }, { k: "gr_void_stardust", n: "Stardust", e: "✨", p: 18 }, { k: "gr_void_glowmoss", n: "Glowmoss", e: "🌱", p: 6 }, { k: "gr_void_cometice", n: "Comet ice", e: "🧊", p: 10 }]
});
grRealm({ id: "mirror", parent: { w: "land", sub: "mirror" }, parentName: "the Mirror World", name: "Gemelline", short: "Gemelline",
blurb: "the twin city of the Mirror World, standing on silver islands above its own reflection",
intro: "Pale marble towers stand on islands in a still silver sea, and every one has its twin standing upside down in the water below. The Avenue of Reflections leads to the Palace of Two Thrones, where the Twin Regents rule as one.",
style: "classical", layout: "isles", tone: 480, gateCol: 0xD8E0F0,
env: { top: 0xB0BED4, low: 0xECE8E0, fog: 0xD8DCE4, fogD: 0.0012, sun: 0.7, sunCol: 0xE8ECF4, sunDir: [0.5, 0.7, -0.3], hemi: 0.7, hemiCol: 0xE0E4EC, hemiGround: 0x8A90A0, groundCol: 0x9EA6B6, groundCol2: 0xBCC2CC, groundTex: "paving", mtn: 0xA8B0BE, mtnTex: "marble", cloud: 0xC8CED8, cloud2: 0x9AA2B4 },
gate: { n: "The Looking Gate", d: "a tall silver mirror that you step into rather than look into", back: "The Looking Gate" },
warden: ["Lorne Ellis", "Keeper of the Looking Gate", "a keeper who is always standing beside his own reflection, and who will tell you, quite seriously, that he is the real one"],
names: ["Lorne", "Anna", "Otto", "Hannah", "Ada", "Bob", "Eve", "Pip", "Nan", "Elle", "Asa", "Ava", "Reyer", "Lil", "Neven", "Siris"],
surnames: ["Ellis", "Silverton", "Glasswell", "Twinning", "Brightly", "Reverley", "Lookwood", "Pairmain", "Gleam", "Doubleday", "Facet", "Mercer"],
citizenTitles: ["Silverer", "Glass polisher", "Optician", "Chess player", "Mirror twin"], guardTitle: "Silver guard",
plaza: { n: "The Square of Two Fountains", d: "where one fountain rises up and its twin falls down into the water below", heart: "fountain" }, avenue: { n: "The Avenue of Reflections" },
palace: { t: "palace", n: "The Palace of Two Thrones", d: "where the Twin Regents rule the Mirror World together, each the image of the other", hall: "The Hall of a Thousand Mirrors",
seat: ["throne", "The Two Thrones", 0],
staff: [["Regent Odalys Silverton", "Twin Regent of the Mirror World", "one of the Twin Regents: brisk, fond of rules and order, and never quite sure whether she or her sister Sylado is the reflection"], ["Regent Sylado Silverton", "Twin Regent of the Mirror World"], ["Hannah Glasswell", "Keeper of the Mirrors"]],
rooms: [["council", "The Council of Pairs", 1], ["banquet", "The Banquet of Halves", 0], ["suite", "The Regents' Apartments", 1], ["treasury", "The Silver Treasury", 1], ["gallery", "The Gallery of Reflections", 0],
["library", "The Library of Backward Books", 0], ["kitchen", "The Palace Kitchens", 1], ["armoury", "The Silver Guard Armoury", 1], ["office", "The Office of Opposites", 1], ["lounge", "The Looking-Glass Salon", 0], ["study", "The Chess Study", 0], ["suite", "The Twin Guest Rooms", 0]] },
wards: [
{ t: "academy", n: "The Academy of Optics", d: "the science of light, lenses and mirrors", staff: [["Professor Ada Lookwood", "Professor of Optics", "a professor who can tell you exactly where an image will appear in any mirror, and loves to prove it with a candle"]] },
{ t: "guild", n: "The Silverers' Guild", d: "who coat glass with silver to make the city's mirrors" },
{ t: "market", n: "The Market of Opposites", d: "where you sell first and buy afterwards" },
{ t: "library", n: "The Reflected Stacks", d: "books printed back to front, read with a hand mirror" },
{ t: "court", n: "The Court of Fair Reflection", d: "where each side of a quarrel is shown to the other" },
{ t: "theatre", n: "The Theatre of Twins", d: "plays in which every part is played by a pair" },
{ t: "lab", n: "The Light Laboratory", d: "where lenses, prisms and mirrors are tested" },
{ t: "inn", n: "The Left-Hand Inn", d: "where the right-hand rooms are on the left" }
],
arena: { n: "The Great Chessboard", d: "the Silver Guard's training ground, laid out in black and white squares", about: "Six posts stand round the board. Run to each as it lights gold; a Silver Guard must cross the board faster than any knight." },
homes: { n: "Twin Row", d: "pairs of matching houses, each the reflection of the other" },
tunnel: { n: "The Glass Causeway", kind: "bridge" },
deep: { n: "The Silverworks", d: "the silver mines, the glass furnaces, the polishing halls and the lens workshop", heart: "obelisk",
b: [{ t: "mine", n: "The Silver Mines", d: "silver dug for the backs of mirrors" }, { t: "forge", n: "The Glass Furnaces", d: "sand melted into clear glass" }, { t: "workshop", n: "The Polishing Halls", d: "where every mirror is polished until it is perfect" }, { t: "lab", n: "The Lens Workshop", d: "lenses ground for telescopes and spectacles" }],
gather: [{ k: "gr_mirror_silver", n: "A bright silver seam", v: "dig silver", look: "ore" }, { k: "gr_mirror_sand", n: "A bank of white glass sand", v: "shovel glass sand", look: "coal" }, { k: "gr_mirror_quartz", n: "A cluster of clear quartz", v: "break off a quartz crystal", look: "crystal" }, { k: "gr_mirror_shard", n: "Offcut mirror glass", v: "sort the mirror offcuts", look: "crystal" }] },
trade: { say: "The Market of Opposites buys what the Silverworks bring in, and sells the city's glass and mirrors.", sells: ["cr_glass", "cr_crystal", "cr_parts"], buys: ["gr_mirror_silver", "gr_mirror_sand", "gr_mirror_quartz", "gr_mirror_shard", "cr_ore", "cr_coal"] },
lore: [["The founding of Gemelline", "The city was built twice on the same day: once standing up and once standing on its head in the silver sea. Nobody agrees which was built first."],
["The Twin Regents", "Odalys and Sylado rule the Mirror World together. One always raises her left hand when the other raises her right, and they finish each other's sentences."],
["Backward books", "In the Reflected Stacks every book is printed back to front. Readers hold them up to a hand mirror, and the stories come out the right way round."],
["The Silverers", "The Silverers' Guild has coated glass with silver for as long as the city has stood. Each master signs their mirrors on the back, where only another Silverer will look."],
["The Great Chessboard", "The Silver Guard train on a great board of black and white squares. Every recruit begins as a pawn and hopes to reach the far side."],
["The silver sea", "The sea round Gemelline is so still that you cannot tell where the city ends and its reflection begins. Boats are rowed very gently so as not to disturb it."]],
lectures: [{ t: "The law of reflection", x: "When light bounces off a flat mirror, it leaves at the same angle it arrived. Scientists say the angle of incidence equals the angle of reflection.", q: ["When light hits a flat mirror, how does it leave?", ["At the same angle it arrived", "Straight back every time", "At a random angle"], 0] },
{ t: "The periscope", x: "A periscope uses two mirrors set at 45 degrees, one at each end of a tube. Light bounces down from the top mirror to the bottom one, so you can see over walls or above the water.", q: ["How many mirrors are in a simple periscope?", ["Two", "One", "Six"], 0] },
{ t: "The kaleidoscope", x: "The kaleidoscope was invented by the Scottish scientist David Brewster, who patented it in 1817. Mirrors set at an angle inside a tube reflect coloured pieces over and over into a symmetrical pattern.", q: ["Who invented the kaleidoscope?", ["David Brewster", "Isaac Newton", "Galileo"], 0] },
{ t: "Mirrors on the Moon", x: "Astronauts on Apollo 11, 14 and 15 left special reflectors on the Moon. Scientists still fire lasers at them and time the light's return, measuring the distance to the Moon to within a few centimetres.", q: ["What do scientists measure using the reflectors left on the Moon?", ["The distance to the Moon", "The Moon's colour", "The Moon's weight"], 0] },
{ t: "Why ambulances say ECNALUBMA", x: "Some ambulances have their name painted back to front on the bonnet. A driver ahead sees it in their rear-view mirror, which flips it front to back, and reads it the right way round.", q: ["Why is the word on some ambulances written backwards?", ["So it reads correctly in a mirror", "To look modern", "It is a mistake"], 0] }],
persona: "Gemelline is the twin city of the Mirror World in SomnuMatrix, standing on silver islands above its own reflection and ruled together by the Twin Regents Odalys and Sylado. Its people are silverers, glass polishers, opticians and chess players; many have a twin. They are brisk, playful and fond of rules and puzzles, and love explaining real facts about light and mirrors.",
mats: [{ k: "gr_mirror_silver", n: "Mirror silver", e: "🪙", p: 16 }, { k: "gr_mirror_sand", n: "Glass sand", e: "⏳", p: 4 }, { k: "gr_mirror_quartz", n: "Clear quartz", e: "💎", p: 20 }, { k: "gr_mirror_shard", n: "Mirror offcut", e: "🪞", p: 9 }]
});
grRealm({ id: "dead", parent: { w: "land", sub: "dead" }, parentName: "the Land of the Dead", name: "Lanternhome", short: "Lanternhome",
blurb: "the gentle grey city of lanterns and marigolds, where everyone who is remembered has a light",
intro: "Through the soft mist, a city of pale stone glows with thousands of lanterns, and marigold garlands hang across every street. It is calm and kind here, and the Avenue of Marigolds leads up to the Palace of a Thousand Lanterns.",
style: "bone", layout: "open", tone: 360, gateCol: 0xFFC870,
env: { top: 0x4E5654, low: 0xB0B4A6, fog: 0x8A8E84, fogD: 0.0022, sun: 0.45, sunCol: 0xE8E4D0, sunDir: [0.3, 0.6, -0.5], hemi: 0.85, hemiCol: 0xD8DCD0, hemiGround: 0x4A4840, groundCol: 0x7E7C72, groundCol2: 0x9C988A, groundTex: "paving", mtn: 0x6A6C64, mtnTex: "stone" },
gate: { n: "The Marigold Arch", d: "an arch woven of orange marigolds that opens on the lantern city", back: "The Marigold Arch" },
warden: ["Abuela Rosalind Vega", "Keeper of the Marigold Arch", "a smiling grandmother who weaves fresh marigolds into the arch every morning and offers every visitor a sweet bread roll"],
names: ["Rosalind", "Tomas", "Esperanza", "Felix", "Amelie", "Joaquin", "Lucia", "Benedict", "Paloma", "Mateo", "Winifred", "Hugo", "Inez", "Cosmo", "Dulce", "August"],
surnames: ["Vega", "Candlewick", "Greymantle", "Marigold", "Ashby", "Remembrance", "Willowby", "Lantern", "Stillwell", "Fondly", "Evermore", "Hearth"],
citizenTitles: ["Lantern-keeper", "Marigold grower", "Story-teller", "Candle-maker", "Visiting dreamer"], guardTitle: "Lantern warden",
plaza: { n: "The Square of Remembering", d: "where a lantern burns for everyone who is remembered, and families gather to tell stories", heart: "flame" }, avenue: { n: "The Avenue of Marigolds" },
palace: { t: "palace", n: "The Palace of a Thousand Lanterns", d: "the home of the Keeper of the Remembered, who looks after the whole city", hall: "The Hall of Lanterns",
seat: ["throne", "The Chair of the Keeper", 0],
staff: [["Keeper Aurelia Candlewick", "Keeper of the Remembered", "the Keeper of the Remembered, tender and cheerful, who knows a happy story about almost everyone in the city and loves to share one"], ["Benedict Greymantle", "Steward of the Lanterns"], ["Paloma Marigold", "Mistress of the Garlands"]],
rooms: [["council", "The Council of Families", 1], ["banquet", "The Feast Hall of Reunions", 0], ["suite", "The Keeper's Rooms", 1], ["treasury", "The Treasury of Keepsakes", 1], ["gallery", "The Gallery of Portraits", 0],
["library", "The Library of Happy Memories", 0], ["kitchen", "The Sweet Bread Kitchens", 1], ["armoury", "The Lantern Wardens' Store", 1], ["office", "The Steward's Office", 1], ["lounge", "The Story Room", 0], ["shrine", "The Room of Offerings", 0], ["suite", "The Visitors' Rooms", 0]] },
wards: [
{ t: "library", n: "The Library of Stories Told", d: "every story ever told about someone with love, written down", staff: [["Librarian Felix Willowby", "Librarian of Stories", "a gentle librarian who always has a funny story ready, and believes a good story keeps someone close"]] },
{ t: "temple", n: "The Chapel of Marigolds", d: "a quiet bright chapel full of flowers and candles" },
{ t: "academy", n: "The School of Old Songs", d: "where the old songs and dances are taught to anyone who wants them" },
{ t: "market", n: "The Marigold Market", d: "flowers, candles, sweet bread and paper garlands" },
{ t: "inn", n: "The Quiet Hearth Inn", d: "a warm inn with soup on the stove and stories by the fire" },
{ t: "theatre", n: "The Theatre of Fond Memories", d: "music, dancing and plays about the good old days" },
{ t: "hall", n: "The Hall of Letters", d: "where letters to those we miss are written, read and kept" },
{ t: "observatory", n: "The Lantern Tower", d: "where the lantern-keepers look out over every light in the city" }
],
arena: { n: "The Lantern Green", d: "the lantern wardens' training ground", about: "Six lanterns stand round the green. Walk briskly to each as it glows gold; a lantern warden must relight any lantern that flickers." },
homes: { n: "The Garland Streets", d: "pale stone houses hung with marigold garlands and a lantern at every door" },
tunnel: { n: "The Willow Walk", kind: "bridge" },
deep: { n: "The Marigold Fields", d: "the marigold farms, the lantern works, the chandlers' guild and the pale-stone quarry", heart: "flame",
b: [{ t: "farm", n: "The Marigold Farms", d: "fields of orange marigolds for the garlands" }, { t: "workshop", n: "The Lantern Works", d: "where paper and tin lanterns are made" }, { t: "guild", n: "The Chandlers' Guild", d: "candle-makers who dip every candle by hand" }, { t: "mine", n: "The Pale-Stone Quarry", d: "the soft grey stone the city is built from" }],
gather: [{ k: "gr_dead_marigold", n: "A bed of marigolds", v: "pick marigolds", look: "crop" }, { k: "gr_dead_wax", n: "A comb of candle-wax", v: "gather wax", look: "herb" }, { k: "gr_dead_palestone", n: "A pale-stone face", v: "cut pale stone", look: "ore" }, { k: "gr_dead_willow", n: "A weeping willow", v: "cut willow wands", look: "wood" }] },
trade: { say: "The Marigold Market buys what the fields bring in, and sells lanterns, candles and garlands.", sells: ["cr_glass", "cr_cloth", "cr_wood"], buys: ["gr_dead_marigold", "gr_dead_wax", "gr_dead_palestone", "gr_dead_willow", "cr_ore"] },
lore: [["The founding of Lanternhome", "The first lantern was lit for someone who was missed, and placed where they might see it. Another followed, then another, and the lights became a city."],
["The Keeper of the Remembered", "The Keeper looks after Lanternhome from the Palace of a Thousand Lanterns. Her first rule is that everyone is welcome, and her second is that there should always be soup."],
["Lanterns", "Every lantern in the city burns for someone who is remembered. While anyone remembers them, their lantern stays lit."],
["Marigolds", "The city is hung with orange marigolds, whose bright colour and scent are said to help visitors find the way. The farms beyond the Willow Walk grow them all year."],
["The Hall of Letters", "Anyone may write a letter to someone they miss and leave it in the Hall of Letters. The letter-keepers read each one aloud, kindly, at sunset."],
["Reunion days", "On the city's great feast days, families gather in the Square of Remembering with music, sweet bread and stories. It is the happiest time in Lanternhome."]],
lectures: [{ t: "The Day of the Dead", x: "In Mexico, the Day of the Dead (Día de Muertos) is celebrated on 1 and 2 November. Families build home altars called ofrendas, with photographs, candles, food and marigolds, and remember loved ones with music and stories. It is a joyful festival.", q: ["On which dates is the Day of the Dead celebrated?", ["1 and 2 November", "25 December", "1 January"], 0] },
{ t: "Marigolds", x: "The Mexican marigold, called cempasúchil, is a bright orange flower with a strong scent. Gardeners often grow marigolds among vegetables because their scent can keep some pests away.", q: ["What is the Mexican marigold called in Mexico?", ["Cempasúchil", "Sakura", "Edelweiss"], 0] },
{ t: "How a candle burns", x: "A candle flame does not burn the solid wax. Heat melts the wax, the wick draws it up, and the flame turns it into vapour, which is what actually burns.", q: ["What part of the wax actually burns in a candle flame?", ["The wax vapour", "The solid wax", "The wick only"], 0] },
{ t: "Lantern festivals", x: "During the Obon festival in Japan, families welcome the memory of their ancestors home. At the end of it, in some places, paper lanterns are floated down rivers to light the way back, a custom called tōrō nagashi.", q: ["In tōrō nagashi, what is floated down rivers?", ["Paper lanterns", "Flowers only", "Wooden boats"], 0] },
{ t: "The feather and the heart", x: "In ancient Egyptian belief, a person's heart was weighed against a feather, the feather of truth. A light heart, free of wrongdoing, meant they would go on to peaceful fields.", q: ["In the ancient Egyptian story, what was the heart weighed against?", ["A feather", "A stone", "Gold"], 0] }],
persona: "Lanternhome is the gentle city of the Land of the Dead in SomnuMatrix, a place of pale stone, soft mist, lanterns and marigolds, looked after by the Keeper of the Remembered. Its people are lantern-keepers, story-tellers, marigold growers and candle-makers. They are tender, cheerful and never morbid or frightening: every lantern is for someone who is remembered with love, and they speak warmly of family, memory and happy stories. Suitable for all ages.",
mats: [{ k: "gr_dead_marigold", n: "Marigolds", e: "🌼", p: 5 }, { k: "gr_dead_wax", n: "Candle-wax", e: "🕯️", p: 7 }, { k: "gr_dead_palestone", n: "Pale stone", e: "🪨", p: 8 }, { k: "gr_dead_willow", n: "Willow wands", e: "🌿", p: 6 }]
});
grRealm({ id: "frozen", parent: { w: "land", sub: "frozen" }, parentName: "the Frozen Realm", name: "Isvarden", short: "Isvarden",
blurb: "the city of the Long Winter, carved from blue ice under the dancing aurora",
intro: "Spires of blue ice rise from the snow, and the green aurora ripples overhead. Warm lamplight glows in every window, and the Avenue of Icicles climbs to the Winter Palace of Queen Isveig.",
style: "ice", layout: "open", tone: 540, gateCol: 0xB8E8FF,
env: { top: 0x223E5E, low: 0xB0D2E4, fog: 0x9AB8CC, fogD: 0.0016, sun: 0.6, sunCol: 0xD8ECFF, sunDir: [0.6, 0.35, -0.4], hemi: 0.85, hemiCol: 0xD0E4F4, hemiGround: 0x6A7E8E, stars: 1, groundCol: 0xA8BCCA, groundCol2: 0x8EA6B8, groundTex: "snow", mtn: 0x9AB0C2, mtnTex: "snow" },
gate: { n: "The Icicle Gate", d: "a great gate of hanging icicles that chime as you pass", back: "The Icicle Gate" },
warden: ["Halvard Snowe", "Warden of the Icicle Gate", "a cheerful bearded warden in a thick wool coat, who keeps a pot of hot cocoa by the gate for anyone who looks cold"],
names: ["Halvard", "Isveig", "Brynja", "Torsten", "Signe", "Eskil", "Liv", "Aksel", "Ragna", "Jonas", "Frida", "Oskar", "Tuva", "Magnus", "Ylva", "Kari"],
surnames: ["Snowe", "Frostfell", "Iceby", "Winterborne", "Hailstrom", "Rimewood", "Glacier", "Coldbrook", "Northwind", "Sleetley", "Drift", "Aurland"],
citizenTitles: ["Ice-carver", "Mammoth herder", "Ice fisher", "Aurora watcher", "Wool spinner"], guardTitle: "Snow guard",
plaza: { n: "The Square of the Aurora", d: "where the people gather on long nights to watch the lights ripple overhead", heart: "crystal" }, avenue: { n: "The Avenue of Icicles" },
palace: { t: "palace", n: "The Winter Palace", d: "the palace of Queen Isveig, who rides the north wind and rules the Long Winter", hall: "The Hall of Frost",
seat: ["throne", "The Throne of Rime", 0],
staff: [["Queen Isveig Winterborne", "Queen of the Long Winter", "the Queen of the Long Winter, who rides the north wind; cool and stately on the outside, warm and fond of snowball fights underneath"], ["Torsten Rimewood", "Steward of the Winter Palace"], ["Signe Northwind", "Keeper of the Aurora"]],
rooms: [["council", "The Council of the North", 1], ["banquet", "The Midwinter Feast Hall", 0], ["suite", "The Queen's Frost Apartments", 1], ["treasury", "The Treasury of Blue Ice", 1], ["gallery", "The Gallery of Ice Sculpture", 0],
["library", "The Library of Winters", 0], ["kitchen", "The Warm Kitchens", 1], ["armoury", "The Snow Guard Armoury", 1], ["office", "The Steward's Office", 1], ["lounge", "The Fireside Hall", 0], ["bath", "The Queen's Hot Springs", 0], ["suite", "The Guest Chambers", 0]] },
wards: [
{ t: "academy", n: "The Snowcraft Academy", d: "where young northerners learn ice, snow, weather and stars", staff: [["Master Eskil Hailstrom", "Master of Snowcraft", "a master of snowcraft who can build a snow house in an hour and explain exactly why it is warm inside"]] },
{ t: "guild", n: "The Guild of Ice-Carvers", d: "who carve the city's spires, bridges and statues from blue ice" },
{ t: "market", n: "The Frost Fair", d: "a market held on the frozen lake all year round" },
{ t: "bath", n: "The Steaming Springs", d: "hot springs bubbling up through the ice" },
{ t: "library", n: "The Library of Snowflakes", d: "every snowflake ever drawn, in a thousand books" },
{ t: "hospital", n: "The Warmhearth Infirmary", d: "where cold toes and sniffles are warmed and mended" },
{ t: "barracks", n: "The Mammoth Riders' Hall", d: "the riders who patrol the snowfields on gentle mammoths" },
{ t: "observatory", n: "The Aurora Observatory", d: "where watchers study the lights in the sky" }
],
arena: { n: "The Snowfield Course", d: "the Snow Guard's training ground", about: "Six posts stand round the snowfield. Run to each as it lights gold; a Snow Guard must cross deep snow quickly to help anyone stuck in a drift." },
homes: { n: "The Snowhouse Rows", d: "round snow houses and ice cottages, warm and snug inside" },
tunnel: { n: "The Glacier Tunnel", kind: "tunnel" },
deep: { n: "The Long Ice", d: "the blue-ice quarry, the ice-fishers' harbour, the mammoth pastures and the woolworks", heart: "crystal",
b: [{ t: "mine", n: "The Blue Ice Quarry", d: "ancient blue ice cut in great blocks" }, { t: "dock", n: "The Ice-Fishers' Harbour", d: "where fishers work through holes in the ice" }, { t: "farm", n: "The Mammoth Pastures", d: "where the gentle mammoths graze on winter grass" }, { t: "workshop", n: "The Woolworks", d: "where combed mammoth wool is spun and knitted" }],
gather: [{ k: "gr_frozen_blueice", n: "A face of blue glacier ice", v: "cut a block of blue ice", look: "ice" }, { k: "gr_frozen_char", n: "A fishing hole in the ice", v: "catch an ice char", look: "fish" }, { k: "gr_frozen_wool", n: "A tuft of shed mammoth wool", v: "gather the wool", look: "crop" }, { k: "gr_frozen_lichen", n: "Snow lichen on the rocks", v: "gather lichen", look: "herb" }] },
trade: { say: "The Frost Fair buys what the Long Ice brings in, and sells the north's warm goods.", sells: ["cr_cloth", "cr_leather", "cr_wood"], buys: ["gr_frozen_blueice", "gr_frozen_char", "gr_frozen_wool", "gr_frozen_lichen", "cr_coal", "cr_ore"] },
lore: [["The founding of Isvarden", "The first carvers found a valley where the ice was blue and clear right through. They carved one spire to see if it would stand, and it did; then they carved a city round it."],
["Queen Isveig", "The Queen of the Long Winter rides the north wind and sees every snowfall from above. When she is home, the Winter Palace glitters; when she is away, her Steward keeps the halls swept and the icicles straight."],
["The mammoths", "Gentle mammoths roam the snowfields beyond the Glacier Tunnel. The riders say they are gentle unless you step between a mother and her calf."],
["The Frost Fair", "The Frost Fair has been held on the frozen lake for so long that nobody remembers its first year. You can buy hot cocoa, wool hats and ice skates there at any hour."],
["Warm inside", "Every home in Isvarden is warm inside, even the ones made of snow. The ice-carvers say the secret is thick walls, a small door and a lamp."],
["The aurora", "On long nights the aurora ripples green and violet over the city. The watchers at the Observatory name each great display and write it in their book."]],
lectures: [{ t: "The aurora", x: "Auroras happen when charged particles from the Sun pour along the Earth's magnetic field towards the poles and strike gases high in the air. Oxygen glows green or red, and nitrogen gives blue and purple.", q: ["What usually gives the aurora its green colour?", ["Oxygen high in the air", "Ice crystals", "Green clouds"], 0] },
{ t: "Why glacier ice is blue", x: "Glacier ice is squeezed so hard that most of its air bubbles are pushed out. Thick, dense ice absorbs red light and lets blue light through, so it glows blue.", q: ["Why does thick glacier ice look blue?", ["It absorbs red light and lets blue through", "It is painted", "It reflects the sea"], 0] },
{ t: "Glaciers move", x: "A glacier is a river of ice. Under its own great weight it slowly flows downhill, often only a few centimetres a day, though some move many metres a day.", q: ["What makes a glacier flow?", ["Its own great weight", "The wind", "Animals pushing it"], 0] },
{ t: "Polar bears", x: "A polar bear's fur is not really white: each hair is clear and hollow, and scatters light so it looks white. Underneath, its skin is black, which helps soak up warmth from the sun.", q: ["What colour is a polar bear's skin?", ["Black", "White", "Pink"], 0] },
{ t: "Earth's frozen fresh water", x: "The ice sheet covering Antarctica holds about 70 per cent of all the fresh water on Earth. In places it is more than 4 kilometres thick.", q: ["About how much of Earth's fresh water is in the Antarctic ice sheet?", ["About 70 per cent", "About 1 per cent", "All of it"], 0] }],
persona: "Isvarden is the ice city of the Frozen Realm in SomnuMatrix, carved from blue ice under the aurora and ruled by Queen Isveig of the Long Winter, who rides the north wind. Ice-carvers, mammoth herders, ice fishers and aurora watchers live there. They are hardy, cheerful and hospitable, always offer hot cocoa, and love explaining real facts about ice, snow and the polar lands.",
mats: [{ k: "gr_frozen_blueice", n: "Blue glacier ice", e: "🧊", p: 9 }, { k: "gr_frozen_char", n: "Ice char", e: "🐟", p: 8 }, { k: "gr_frozen_wool", n: "Mammoth wool", e: "🧶", p: 14 }, { k: "gr_frozen_lichen", n: "Snow lichen", e: "🌿", p: 5 }]
});
grRealm({ id: "elsewhere", parent: { w: "land", sub: "elsewhere" }, parentName: "Another World", name: "Ondrevar", short: "Ondrevar",
blurb: "the native city of Another World, its spiral towers grown from coral-glass under a teal sky and a great ringed planet",
intro: "Beyond the settlers' domes, the people of this world, the Ondren, have grown a city of spiral towers that hum softly in the thin wind. A ringed giant hangs in the sky, and the Avenue of Singing Stones leads to the Spiral Moot.",
style: "coral", layout: "open", tone: 450, gateCol: 0x9FF0D8,
env: { top: 0x1A2A4A, low: 0x86C6B4, fog: 0x5A8A88, fogD: 0.0014, sun: 0.6, sunCol: 0xC8F0E0, sunDir: [-0.5, 0.5, -0.4], hemi: 0.8, hemiCol: 0xB8E8D8, hemiGround: 0x2A3440, stars: 1, groundCol: 0x44546A, groundCol2: 0x66788C, groundTex: "earth", mtn: 0x3E5068, mtnTex: "stone" },
gate: { n: "The Windglass Arch", d: "a tall arch of glassy stone that hums as you walk through it", back: "The Windglass Arch" },
warden: ["Thessil Ka-Orun", "Warden of the Windglass Arch", "an Ondren warden, tall and slow-moving, who greets visitors with a hum and has learned a few words of every language that has come through the arch"],
names: ["Thessil", "Aeloth", "Vey", "Orun", "Ilkara", "Senn", "Mavu", "Quoreth", "Tiel", "Ashka", "Daruun", "Elevi", "Pell", "Oskiri", "Nuun", "Yarrow"],
surnames: ["Ka-Orun", "Vey-Tal", "Su-Merren", "Ithkari", "Ondrel", "Ka-Seth", "Lumevar", "Oth-Ren", "Tal-Ashe", "Quivane", "Sorrowind", "Ka-Tiel"],
citizenTitles: ["Ondren singer", "Crystal grower", "Dome trader", "Golem-wright", "Visiting scientist"], guardTitle: "Moot warden",
plaza: { n: "The Ring of Singing Stones", d: "a circle of tall stones that hum together when the wind blows", heart: "obelisk" }, avenue: { n: "The Avenue of Singing Stones" },
palace: { t: "palace", n: "The Spiral Moot", d: "the great spiral hall where the Ondren meet to decide things together, slowly and kindly", hall: "The Hall of the Long Hum",
seat: ["throne", "The Speaker's Spiral", 0],
staff: [["Speaker Aeloth Vey-Tal", "Speaker of the Spiral Moot", "the Speaker of the Ondren, ancient and patient, who has watched the settlers' domes go up with great interest and likes them very much"], ["Ilkara Su-Merren", "Keeper of the Moot"], ["Daruun Ithkari", "Envoy to the domes"]],
rooms: [["council", "The Circle of Voices", 1], ["banquet", "The Hall of Shared Bread", 0], ["suite", "The Speaker's Spiral Rooms", 1], ["treasury", "The Crystal Treasury", 1], ["gallery", "The Gallery of Two Peoples", 0],
["library", "The Library of Hums", 0], ["kitchen", "The Spore Kitchens", 1], ["armoury", "The Moot Wardens' Store", 1], ["office", "The Envoy's Office", 1], ["lounge", "The Guest Hall of the Blue World", 0], ["observe", "The Ring-Planet Room", 0], ["suite", "The Visitors' Spirals", 0]] },
wards: [
{ t: "embassy", n: "The Embassy of the Blue World", d: "where the Ondren and the settlers from Earth meet as friends", staff: [["Envoy Mavu Lumevar", "Envoy of the Ondren", "the envoy who first met the settlers, endlessly curious about Earth, especially rain, cats and toast"]] },
{ t: "academy", n: "The College of Many Suns", d: "where Ondren and settler children learn together" },
{ t: "observatory", n: "The Ring-Planet Observatory", d: "where astronomers watch the giant planet and its moons" },
{ t: "market", n: "The Windglass Bazaar", d: "crystals, spores and dome-grown food traded" },
{ t: "lab", n: "The Xenogarden Laboratory", d: "where Ondren and settler scientists study the world's life" },
{ t: "temple", n: "The Hall of Humming Stones", d: "a quiet hall where the Ondren hum together" },
{ t: "guild", n: "The Golem-Wrights' Guild", d: "who build the stone helpers that carry and lift" },
{ t: "inn", n: "The Moonpool Inn", d: "an inn for visitors, with air the way settlers like it" }
],
arena: { n: "The Low-Wind Field", d: "the Moot wardens' training ground", about: "Six singing stones stand round the field. Run to each as it hums and lights gold." },
homes: { n: "The Spiral Gardens", d: "curling Ondren homes, and a few settler cottages among them" },
tunnel: { n: "The Windglass Tube", kind: "tube" },
deep: { n: "The Lumen Flats", d: "the singing crystal mine, the spore orchards, the golem works and the glassbark woods", heart: "crystal",
b: [{ t: "mine", n: "The Singing Crystal Mine", d: "crystals that hum when they are tapped" }, { t: "farm", n: "The Spore Orchards", d: "tall soft fungi grown for food" }, { t: "workshop", n: "The Golem Works", d: "where stone helpers are built and repaired" }, { t: "hangar", n: "The Skyfin Moorings", d: "where gentle flying skyfins are rested and cared for" }],
gather: [{ k: "gr_elsewhere_crystal", n: "A singing crystal", v: "tap free a singing crystal", look: "crystal" }, { k: "gr_elsewhere_spore", n: "A spore-tree", v: "pick spore-fruit", look: "crop" }, { k: "gr_elsewhere_resin", n: "A glassbark tree", v: "gather glassbark resin", look: "wood" }, { k: "gr_elsewhere_airmoss", n: "A bed of breath-moss", v: "gather breath-moss", look: "gas" }] },
trade: { say: "The Windglass Bazaar buys what the Lumen Flats give, and sells goods of both peoples.", sells: ["cr_crystal", "cr_glass", "cr_parts"], buys: ["gr_elsewhere_crystal", "gr_elsewhere_spore", "gr_elsewhere_resin", "gr_elsewhere_airmoss", "cr_ore", "cr_cloth"] },
lore: [["The Ondren", "The Ondren are tall, slow and very old. They speak by humming, and their towers hum with them. They have lived on this world for longer than they have counted."],
["The settlers", "When the settlers' first dome went up, the Ondren came to watch. They were so interested that they stayed, and now the two peoples trade, learn and garden together."],
["The Spiral Moot", "The Ondren decide everything together in the Spiral Moot. A Moot can take days, because everyone gets a turn to hum."],
["The ringed giant", "A great ringed planet hangs in the sky. The Ondren say this world is one of its moons, and the astronomers agree."],
["The golems", "The stone helpers of the Golem-Wrights' Guild carry, lift and dig. They are slow and careful, and children ride on their shoulders."],
["Breath-moss", "Breath-moss grows in the Lumen Flats and gives off oxygen. The settlers grow it in their domes, and the Ondren find this very funny."]],
lectures: [{ t: "Finding other worlds", x: "Most planets round other stars have been found by the transit method: when a planet passes in front of its star, the star dims very slightly. NASA's Kepler space telescope found thousands of planets this way between 2009 and 2018.", q: ["What does the transit method look for?", ["A star dimming as a planet passes in front", "A planet's sound", "Light from aliens"], 0] },
{ t: "Seven Earth-sized worlds", x: "In 2017 astronomers announced that a small, cool star called TRAPPIST-1 has seven planets about the size of Earth. Several of them orbit in the zone where liquid water could exist.", q: ["How many Earth-sized planets orbit TRAPPIST-1?", ["Seven", "Two", "Twenty"], 0] },
{ t: "Moons that could hold life", x: "Jupiter's moon Europa and Saturn's moon Enceladus have oceans of liquid water under their icy shells. Enceladus sprays jets of water into space from cracks near its south pole.", q: ["What does Enceladus have under its icy shell?", ["An ocean of liquid water", "A forest", "Molten gold"], 0] },
{ t: "Reading the air of other worlds", x: "When starlight passes through a planet's atmosphere, gases absorb particular colours. By splitting the light into a spectrum, telescopes like JWST have detected carbon dioxide and water vapour in the air of planets far away.", q: ["How can telescopes tell what gases are in a faraway planet's air?", ["By studying the colours absorbed from starlight", "By sending a balloon", "By listening"], 0] },
{ t: "The Ondren hum", x: "In Ondrevar's own lore, every Ondren is born with a single note of their own, and a family's notes together make a chord. That is why the towers of a family's home are tuned to it.", q: ["In Ondren lore, what does a family's notes together make?", ["A chord", "A song of silence", "A storm"], 0] }],
persona: "Ondrevar is the native city of Another World in SomnuMatrix, home of the Ondren: tall, slow, ancient people who speak by humming and grow spiral towers of coral-glass. They are friends of the human settlers who live in domes nearby, and the two peoples trade and learn together. Ondren are patient, gentle and very curious about Earth, and like sharing real science about planets round other stars.",
mats: [{ k: "gr_elsewhere_crystal", n: "Singing crystal", e: "🔮", p: 26 }, { k: "gr_elsewhere_spore", n: "Spore-fruit", e: "🍄", p: 6 }, { k: "gr_elsewhere_resin", n: "Glassbark resin", e: "🟢", p: 11 }, { k: "gr_elsewhere_airmoss", n: "Breath-moss", e: "🌱", p: 9 }]
});
grRealm({ id: "fire", parent: { w: "land", sub: "fire" }, parentName: "the Burning Lands", name: "Kilnhaven", short: "Kilnhaven",
blurb: "the forge-city inside a great sleeping volcano, lit by rivers of slow lava",
intro: "Inside the hollow of a vast volcano, a city of dark stone glows with forge-light and slow red rivers of lava. Fire spirits and smiths work side by side, and the Avenue of Embers leads up to the Obsidian Citadel.",
style: "fire", layout: "cavern", tone: 310, gateCol: 0xFF9A50,
env: { top: 0x2A0C06, low: 0x6A2A12, fog: 0x4A1C0C, fogD: 0.0018, sun: 0.85, sunCol: 0xFFB878, sunDir: [0.1, 1, 0.2], hemi: 1.25, hemiCol: 0xFFC090, hemiGround: 0x5A2E1C, groundCol: 0x3A2420, groundCol2: 0x5A3A2E, groundTex: "stone", rock: 0x3A2622, roof: 84, glowCol: 0xFF8A3A, glowKit: "crystalcluster" },
gate: { n: "The Cinder Gate", d: "a gate of black stone in the volcano's flank, warm to the touch", back: "The Cinder Gate" },
warden: ["Brenna Coalhand", "Keeper of the Cinder Gate", "a sturdy dwarf smith who keeps the gate between shifts at the forge, and checks everyone has a water flask before they go in"],
names: ["Brenna", "Ignar", "Cinda", "Torvald", "Ashe", "Fergal", "Sorcha", "Pyrrin", "Ember", "Haldor", "Kestra", "Volka", "Dagny", "Smoulder", "Brann", "Ilse"],
surnames: ["Coalhand", "Emberforge", "Flintlock", "Ashbourne", "Cinderfell", "Stokes", "Hearthstone", "Brimley", "Scorchwood", "Kilnsby", "Magmar", "Blackanvil"],
citizenTitles: ["Smith", "Glassblower", "Lava-watcher", "Fire spirit", "Obsidian cutter"], guardTitle: "Salamander guard",
plaza: { n: "The Square of the Eternal Flame", d: "where a great flame has burned in a stone bowl since the city began", heart: "flame" }, avenue: { n: "The Avenue of Embers" },
palace: { t: "palace", n: "The Obsidian Citadel", d: "the black glass citadel of the Flamewarden, who keeps the volcano sleeping", hall: "The Hall of Black Glass",
seat: ["throne", "The Ember Throne", 0],
staff: [["Flamewarden Ignar Ashbourne", "Flamewarden of the Burning Lands", "the Flamewarden, a great fire spirit who keeps the volcano gently asleep: warm, deep-voiced, proud of the city's craft and kind to visitors"], ["Torvald Blackanvil", "Master of the Citadel Forges"], ["Cinda Hearthstone", "Keeper of the Eternal Flame"]],
rooms: [["council", "The Council of Forges", 1], ["banquet", "The Feast Hall of Embers", 0], ["suite", "The Flamewarden's Chambers", 1], ["treasury", "The Treasury of Emberstones", 1], ["gallery", "The Gallery of Masterworks", 0],
["library", "The Library of Fire", 0], ["kitchen", "The Hearth Kitchens", 1], ["armoury", "The Salamander Armoury", 1], ["office", "The Office of the Volcano Watch", 1], ["lavaforge", "The Citadel Forge", 1], ["lounge", "The Warm Hall of Guests", 0], ["suite", "The Cool Guest Rooms", 0]] },
wards: [
{ t: "forge", n: "The Great Foundry of Kilnhaven", d: "the biggest forge in the Burning Lands, where the best blades and tools are made", staff: [["Forgemistress Dagny Emberforge", "Forgemistress of the Great Foundry", "a dwarf forgemistress with arms like oak branches, who judges every piece by tapping it and listening"]] },
{ t: "academy", n: "The Academy of Flame and Glass", d: "where smiths, glassblowers and lava-watchers are trained" },
{ t: "guild", n: "The Glassblowers' Guild", d: "who blow glass from volcanic sand" },
{ t: "market", n: "The Cinder Market", d: "blades, glass, emberstones and obsidian bought and sold" },
{ t: "barracks", n: "The Salamander Guard", d: "the guards who watch the lava rivers and keep everyone safe" },
{ t: "temple", n: "The Temple of the Reborn Flame", d: "where the story of the firebird reborn from its ashes is told" },
{ t: "bath", n: "The Firewell Springs", d: "hot springs heated by the volcano" },
{ t: "observatory", n: "The Volcano Watch", d: "where the watchers listen to the mountain and keep it asleep" }
],
arena: { n: "The Ember Yard", d: "the Salamander Guard's training ground", about: "Six braziers stand round the yard. Run to each as it lights gold; a Salamander Guard must be at any lava river in moments." },
homes: { n: "The Hearthstone Rows", d: "thick-walled homes of dark stone, cool inside" },
tunnel: { n: "The Magma Road", kind: "tunnel" },
deep: { n: "The Caldera Works", d: "the obsidian mine, the lava smelter, the glassworks and the sulphur laboratory on the crater floor", heart: "flame",
b: [{ t: "mine", n: "The Obsidian Mine", d: "black volcanic glass cut from the crater walls" }, { t: "forge", n: "The Lava Smelter", d: "ore smelted with the volcano's own heat" }, { t: "workshop", n: "The Caldera Glassworks", d: "glass blown and cast in great furnaces" }, { t: "lab", n: "The Sulphur Laboratory", d: "where the volcano's gases are measured" }],
gather: [{ k: "gr_fire_obsidian", n: "An obsidian face", v: "cut obsidian", look: "crystal" }, { k: "cr_ember", n: "Ember rocks", v: "prise out emberstone", look: "ore" }, { k: "gr_fire_sulphur", n: "Sulphur crystals by a vent", v: "scrape sulphur", look: "crystal" }, { k: "gr_fire_pumice", n: "A drift of pumice", v: "gather pumice", look: "coal" }] },
trade: { say: "The Cinder Market buys what the Caldera Works bring in, and sells the forges' best.", sells: ["cr_steel", "cr_glass", "cr_coal"], buys: ["gr_fire_obsidian", "cr_ember", "gr_fire_sulphur", "gr_fire_pumice", "cr_ore", "cr_wood"] },
lore: [["The founding of Kilnhaven", "The first smiths came into the sleeping volcano to borrow its heat. The fire spirits living there were curious rather than cross, and they agreed to share it, as long as the smiths made beautiful things."],
["The Flamewarden", "The Flamewarden is the oldest fire spirit in the mountain. It hums to the volcano each night to keep it gently asleep, and the city has never once been troubled."],
["The Eternal Flame", "The flame in the great square was lit by the first smith and the first fire spirit together. Every forge in Kilnhaven is lit from it."],
["The firebird", "The Temple of the Reborn Flame tells of the firebird, who grows old, burns, and rises new from her own ashes. Smiths say a broken blade, reforged, carries a little of her luck."],
["The Salamander Guard", "The Salamander Guard watch the lava rivers and the crater paths. They are the first to welcome lost visitors, and they always carry water."],
["The Caldera Works", "Out along the Magma Road lies the crater floor, where obsidian, sulphur and pumice are gathered. Workers there wear thick boots and never hurry."]],
lectures: [{ t: "Obsidian", x: "Obsidian is volcanic glass, made when lava cools so fast that no crystals can form. Its broken edges can be sharper than steel, and people made blades from it for thousands of years.", q: ["Why does obsidian have no crystals?", ["The lava cooled too quickly", "It was frozen", "It is plastic"], 0] },
{ t: "Pumice floats", x: "Pumice forms when frothy lava full of gas cools quickly. It is so full of holes that many pieces float on water, and rafts of pumice have drifted across oceans after eruptions.", q: ["Why can pumice float on water?", ["It is full of gas holes", "It is made of wood", "It is magnetic"], 0] },
{ t: "The smell of a volcano", x: "Pure sulphur is a yellow solid with hardly any smell. The rotten-egg smell near volcanoes comes from a gas, hydrogen sulphide, which is a compound of sulphur and hydrogen.", q: ["What gas gives volcanoes their rotten-egg smell?", ["Hydrogen sulphide", "Oxygen", "Helium"], 0] },
{ t: "Earth's hot heart", x: "The centre of the Earth is thought to be about 5,200 °C, roughly as hot as the surface of the Sun. Heat escaping from the inside drives volcanoes and moves the plates of the crust.", q: ["About how hot is the centre of the Earth?", ["About 5,200 °C", "About 100 °C", "About 50,000 °C"], 0] },
{ t: "Kinds of volcano", x: "Shield volcanoes, like those of Hawaii, are broad and gentle, built by runny lava. Stratovolcanoes, like Mount Fuji, are steep cones built of layers of thicker lava and ash.", q: ["What kind of volcano is built by runny lava into a broad, gentle shape?", ["A shield volcano", "A stratovolcano", "A cinder cone only"], 0] }],
persona: "Kilnhaven is the forge-city inside a great sleeping volcano in the Burning Lands of SomnuMatrix, kept by the Flamewarden, the oldest fire spirit in the mountain. Dwarf smiths, glassblowers, fire spirits, imps and lava-watchers work there side by side. They are warm, proud of their craft and kind to visitors, and love explaining real facts about volcanoes, lava and metalwork. The volcano is always safely asleep.",
mats: [{ k: "gr_fire_obsidian", n: "Obsidian", e: "🖤", p: 18 }, { k: "gr_fire_sulphur", n: "Sulphur", e: "🟡", p: 10 }, { k: "gr_fire_pumice", n: "Pumice", e: "🪨", p: 5 }]
});
grRealm({ id: "stars", parent: { w: "land", sub: "stars" }, parentName: "Among the Stars", name: "Celestara", short: "Celestara",
blurb: "the observatory city under a great clear dome on a wandering moon, with the whole Milky Way overhead",
intro: "On a grey moon drifting among the stars, a city of silver towers and telescopes stands under a vast clear dome. The Milky Way arches overhead, and the Avenue of Constellations leads up to the Astral Citadel.",
style: "station", layout: "dome", tone: 600, gateCol: 0xC8D8FF,
env: { top: 0x000002, low: 0x06060E, fog: 0x06060E, fogD: 0.0005, sun: 0.8, sunCol: 0xE8ECFF, sunDir: [0.5, 0.4, -0.5], hemi: 0.6, hemiCol: 0xC8D0E8, hemiGround: 0x3A3A40, stars: 1, groundCol: 0x7E7E84, groundCol2: 0x9A9AA0, groundTex: "sand", mtn: 0x6E6E74, mtnTex: "sand" },
gate: { n: "The Star Lock", d: "the airlock into the domed city on the wandering moon", back: "The Star Lock" },
warden: ["Juniper Okoye", "Keeper of the Star Lock", "a cheerful lockkeeper who points out a new constellation to every visitor before letting them in"],
names: ["Juniper", "Cassian", "Vega", "Rigel", "Lyra", "Orion", "Nova", "Altair", "Elara", "Castor", "Mizar", "Tycho", "Deneb", "Carina", "Sirius", "Halley"],
surnames: ["Okoye", "Starling", "Brightwell", "Kowalczyk", "Nakamura", "Farsight", "Lumen", "Haldane", "Ferreira", "Coldstream", "Quasar", "Meridian"],
citizenTitles: ["Astronomer", "Navigator", "Comet miner", "Telescope maker", "Visiting dreamer"], guardTitle: "Star guard",
plaza: { n: "The Plaza of Constellations", d: "where the pavement is set with the patterns of the stars overhead", heart: "orrery" }, avenue: { n: "The Avenue of Constellations" },
palace: { t: "palace", n: "The Astral Citadel", d: "the seat of the Star-Regent and the council of navigators who chart the moon's wandering path", hall: "The Hall of the Celestial Sphere",
seat: ["throne", "The Star-Regent's Chair", 0],
staff: [["Star-Regent Lyra Farsight", "Star-Regent of Celestara", "the Star-Regent, an astronomer elected to lead the city, who still spends every night at a telescope"], ["Castor Starling", "Chief Navigator"], ["Elara Nakamura", "Keeper of the Star Charts"]],
rooms: [["council", "The Council of Navigators", 1], ["banquet", "The Hall of Starlight", 0], ["suite", "The Star-Regent's Rooms", 1], ["treasury", "The Vault of Star Crystals", 1], ["gallery", "The Gallery of Comets", 0],
["library", "The Library of Star Charts", 0], ["kitchen", "The Citadel Galley", 1], ["armoury", "The Star Guard Locker", 1], ["office", "The Navigator's Office", 1], ["observe", "The Citadel Telescope", 0], ["control", "The Course Room", 1], ["suite", "The Visitors' Quarters", 0]] },
wards: [
{ t: "observatory", n: "The Great Observatory", d: "the largest telescope on the wandering moon", staff: [["Astronomer Tycho Kowalczyk", "Chief Astronomer", "an astronomer who has catalogued ten thousand stars and still gasps at a good meteor"]] },
{ t: "academy", n: "The Academy of Navigation", d: "where navigators learn to steer by the stars" },
{ t: "library", n: "The Star Atlas Library", d: "maps of every star, nebula and galaxy known" },
{ t: "hangar", n: "The Comet Yards", d: "where the little ships that chase comets are kept" },
{ t: "market", n: "The Nebula Exchange", d: "comet ice, star crystal and meteoric iron traded" },
{ t: "lab", n: "The Spectrum Laboratory", d: "where starlight is split to learn what stars are made of" },
{ t: "inn", n: "The Wayfarers' Orbit", d: "an inn with a window of stars in every room" },
{ t: "embassy", n: "The Embassy of Distant Suns", d: "where travellers from other stars are welcomed" }
],
arena: { n: "The Crater Field", d: "the Star Guard's training ground in a shallow crater", about: "Six posts stand round the crater. Run to each as it lights gold; the moon's gravity is low, so every stride carries you far." },
homes: { n: "The Starward Habitats", d: "homes with round windows facing the stars" },
tunnel: { n: "The Meteor Tube", kind: "tube" },
deep: { n: "The Asteroid Diggings", d: "the meteoric iron mine, the comet ice works, the starlight greenhouses and the meteoric forge", heart: "orrery",
b: [{ t: "mine", n: "The Meteoric Iron Mine", d: "iron and nickel dug from a fallen asteroid" }, { t: "workshop", n: "The Comet Ice Works", d: "comet ice melted into water and air" }, { t: "farm", n: "The Starlight Greenhouses", d: "food grown under starlight and lamps" }, { t: "forge", n: "The Meteoric Forge", d: "star-iron worked into tools" }],
gather: [{ k: "gr_stars_meteoric", n: "A seam of meteoric iron", v: "cut star-iron", look: "ore" }, { k: "gr_stars_cometice", n: "A block of comet ice", v: "chip comet ice", look: "ice" }, { k: "gr_stars_starcrystal", n: "A star crystal cluster", v: "break off a star crystal", look: "crystal" }, { k: "gr_stars_helium", n: "A helium vent in the regolith", v: "fill a helium flask", look: "gas" }] },
trade: { say: "The Nebula Exchange buys what the Asteroid Diggings bring in, and sells the city's instruments.", sells: ["cr_glass", "cr_parts", "cr_steel"], buys: ["gr_stars_meteoric", "gr_stars_cometice", "gr_stars_starcrystal", "gr_stars_helium", "cr_crystal", "cr_ore"] },
lore: [["The wandering moon", "Celestara stands on a moon that drifts slowly among the stars rather than circling a world. The navigators chart its path, and nobody quite knows where it will go next."],
["The Star-Regent", "The city chooses its Star-Regent from among its astronomers. By custom the Regent must still take one night's turn at a telescope every week."],
["The Great Observatory", "The Great Observatory's mirror is so large that it took the telescope makers forty years to grind and polish it."],
["Comet chasers", "When a comet passes near, the little ships of the Comet Yards race out to gather its ice. Their pilots are the city's heroes."],
["The Plaza of Constellations", "The pavement of the great plaza is set with silver stars in the patterns overhead. Children learn the sky by hopping from one to the next."],
["The Asteroid Diggings", "Through the Meteor Tube lies an asteroid that fell onto the moon long ago. It is full of iron and nickel, and the smiths call its metal star-iron."]],
lectures: [{ t: "The Sun is a star", x: "The Sun is an ordinary star, one of a few hundred billion in our galaxy, the Milky Way. It looks so much brighter than the others only because it is so close, about 150 million kilometres away.", q: ["Why does the Sun look so much brighter than other stars?", ["It is much closer", "It is the biggest star", "It is on fire"], 0] },
{ t: "Star colours", x: "A star's colour tells its temperature. Red stars are the coolest, yellow stars like the Sun are in between, and blue-white stars are the hottest.", q: ["Which colour of star is hottest?", ["Blue-white", "Red", "Yellow"], 0] },
{ t: "Meteors and meteorites", x: "A meteor is the streak of light made when a bit of space rock burns up in the air. If a piece survives and lands on the ground, it is called a meteorite. Many meteorites are made of iron and nickel.", q: ["What is a space rock called once it has landed on the ground?", ["A meteorite", "A meteor", "A comet"], 0] },
{ t: "Comet tails", x: "A comet is a ball of ice and dust. As it nears the Sun, the ice turns to gas, and the Sun's light and the solar wind push the gas and dust into tails that point away from the Sun.", q: ["Which way does a comet's tail point?", ["Away from the Sun", "Towards the Sun", "Always behind it"], 0] },
{ t: "Splitting starlight", x: "Passing starlight through a prism or grating spreads it into a spectrum crossed by dark lines. Each element makes its own lines, so astronomers can tell what a star is made of. Helium was found in the Sun's spectrum in 1868, before it was found on Earth.", q: ["Where was helium first found?", ["In the Sun's spectrum", "In a cave", "In the sea"], 0] }],
persona: "Celestara is the domed observatory city on a wandering moon Among the Stars in SomnuMatrix, led by the Star-Regent, an elected astronomer. Astronomers, navigators, comet miners and telescope makers live there with the whole Milky Way overhead. They are full of wonder and love explaining real astronomy: stars, comets, meteorites and light.",
mats: [{ k: "gr_stars_meteoric", n: "Star-iron", e: "☄️", p: 16 }, { k: "gr_stars_cometice", n: "Comet ice", e: "🧊", p: 10 }, { k: "gr_stars_starcrystal", n: "Star crystal shard", e: "⭐", p: 28 }, { k: "gr_stars_helium", n: "Helium flask", e: "🎈", p: 12 }]
});
grRealm({ id: "wasteland", parent: { w: "land", sub: "wasteland" }, parentName: "the Wasteland", name: "Wellspring", short: "Wellspring",
blurb: "the great rebuilt city of the Wasteland, grown up round an old dam where the water runs clean again",
intro: "Where an old dam still holds back a lake of clean water, the people of the Wasteland have built a whole city from what was left: patched roofs, windmills, gardens on every terrace. The Avenue of Mending climbs to the Dam Hall, where the Rebuilders' Council meets.",
style: "timber", layout: "open", tone: 400, gateCol: 0xE8D8A0,
env: { top: 0x6A6450, low: 0xC8B078, fog: 0xA89A78, fogD: 0.0018, sun: 0.6, sunCol: 0xE8D8A8, sunDir: [0.5, 0.6, -0.4], hemi: 0.75, hemiCol: 0xE0D0A8, hemiGround: 0x5A5040, groundCol: 0x8A7A5A, groundCol2: 0x6E6A62, groundTex: "earth", mtn: 0x7A6E58, mtnTex: "sand" },
gate: { n: "The Patchwork Gate", d: "a tall gate of welded car doors and road signs, opened with a big friendly bell", back: "The Patchwork Gate" },
warden: ["Dusty Calloway", "Keeper of the Patchwork Gate", "a grey-bearded gatekeeper who rings the bell for every arrival and always asks if they have any seeds to trade"],
names: ["Dusty", "Hester", "Rook", "Juniper", "Tinker", "Marlow", "Sparrow", "Cass", "Bodie", "Wren", "Flint", "Poppy", "Scout", "Ruth", "Gideon", "Clover"],
surnames: ["Calloway", "Cobb", "Mender", "Rivet", "Ashcroft", "Tumbleweed", "Kettle", "Salvage", "Greenhope", "Pike", "Holloway", "Crank"],
citizenTitles: ["Scrapper", "Seed keeper", "Windmill fitter", "Water warden", "Road trader"], guardTitle: "Road warden",
plaza: { n: "The Square of the First Well", d: "where the first clean well was dug, and the city gathers on market days", heart: "fountain" }, avenue: { n: "The Avenue of Mending" },
palace: { t: "palace", n: "The Dam Hall", d: "the great hall built into the old dam, where the Rebuilders' Council governs Wellspring", hall: "The Turbine Hall",
seat: ["throne", "The Mayor's Chair", 0],
staff: [["Mayor Hester Cobb", "Mayor of Wellspring", "the Mayor of Wellspring: practical, plain-spoken and warm, who believes everything broken can be mended if enough people help"], ["Gideon Rivet", "Keeper of the Dam"], ["Ruth Mender", "Clerk of the Council"]],
rooms: [["council", "The Rebuilders' Council", 1], ["banquet", "The Harvest Hall", 0], ["suite", "The Mayor's Rooms", 1], ["treasury", "The Strongroom of Seeds", 1], ["gallery", "The Gallery of Before", 0],
["library", "The Council Library", 0], ["kitchen", "The Big Kitchen", 1], ["armoury", "The Road Wardens' Store", 1], ["office", "The Water Office", 1], ["engine", "The Turbine Room", 1], ["map", "The Map of the Roads", 0], ["suite", "The Travellers' Rooms", 0]] },
wards: [
{ t: "academy", n: "The School of Fixing Things", d: "where everyone learns to mend, grow and build", staff: [["Teacher Tinker Ashcroft", "Head of the School of Fixing Things", "a teacher who can mend a radio with a hairpin and believes every child is a born inventor"]] },
{ t: "library", n: "The Library of Saved Books", d: "every book anyone could find, dried, mended and shared" },
{ t: "market", n: "The Swap Market", d: "water, batteries, seeds and stories traded fair" },
{ t: "hospital", n: "The Mending House", d: "the city's clinic, clean and kind" },
{ t: "guild", n: "The Scrappers' Guild", d: "who sort, clean and reuse everything that can be saved" },
{ t: "bank", n: "The Seed Bank", d: "where seeds of every plant are kept safe and lent out to grow" },
{ t: "barracks", n: "The Road Wardens", d: "who keep the trade roads safe and help travellers in trouble" },
{ t: "inn", n: "The Rusty Kettle Inn", d: "a warm inn with bean soup always on the stove" }
],
arena: { n: "The Old Car Park", d: "the Road Wardens' training ground", about: "Six oil-drum lamps stand round the yard. Run to each as it lights gold; a Road Warden must reach a stranded traveller fast." },
homes: { n: "The Patchwork Terraces", d: "homes built from salvage, each with a garden on the roof" },
tunnel: { n: "The Old Highway Bridge", kind: "bridge" },
deep: { n: "The Salvage Flats", d: "the scrap mine, the new fields, the solar works and the dry-lake depot", heart: "obelisk",
b: [{ t: "mine", n: "The Scrap Mine", d: "old ruins carefully dug for metal and parts" }, { t: "farm", n: "The New Fields", d: "where crops grow again in mended soil" }, { t: "workshop", n: "The Solar Works", d: "where old panels are mended and new ones built" }, { t: "dock", n: "The Dry Lake Depot", d: "where the trade caravans load and unload" }],
gather: [{ k: "cr_scrap", n: "A heap of old scrap", v: "sort out useful scrap", look: "ore" }, { k: "gr_wasteland_seed", n: "A row of seed plants", v: "save seeds", look: "crop" }, { k: "gr_wasteland_water", n: "The clean-water tank", v: "fill a water jug", look: "ice" }, { k: "gr_wasteland_copper", n: "Old copper wire in the ruins", v: "strip copper wire", look: "ore" }, { k: "cr_rubber", n: "A pile of old tyres", v: "cut good rubber from a tyre", look: "coal" }] },
trade: { say: "The Swap Market buys what the Salvage Flats turn up, and sells what Wellspring makes.", sells: ["cr_parts", "cr_cloth", "cr_rubber"], buys: ["cr_scrap", "gr_wasteland_seed", "gr_wasteland_water", "gr_wasteland_copper", "cr_wood", "cr_glass"] },
lore: [["The founding of Wellspring", "After the hard times, a few families found the old dam still standing and the lake behind it clean. They dug one well, then planted one garden, and others followed the smoke of their cooking fires."],
["The Rebuilders' Council", "Wellspring is run by the Rebuilders' Council, which meets in the Dam Hall. Its first rule is to share the water; its second is to plant something."],
["The Seed Bank", "Seeds are the most precious thing in the Wasteland. The Seed Bank lends them out, and every borrower brings back twice as many after the harvest."],
["The dam", "The old dam still turns its turbines, and that is why Wellspring has lights at night. The Keeper of the Dam knows every bolt in it."],
["Haven and Wellspring", "The little scrap town of Haven trades with Wellspring along the roads. Haven sends scrap and stories; Wellspring sends seeds and soup recipes."],
["The Road Wardens", "The Road Wardens ride the trade roads to help anyone stranded. They carry water, spare tyres and a map of every safe well."]],
lectures: [{ t: "Plants that feed the soil", x: "Beans, peas and clover have nodules on their roots full of bacteria that take nitrogen from the air and turn it into food for plants. Farmers grow them to make tired soil rich again.", q: ["Which plants help put nitrogen back into the soil?", ["Beans, peas and clover", "Cacti", "Mushrooms"], 0] },
{ t: "Solar panels", x: "A solar panel is made of cells, usually of silicon. When sunlight strikes them, it knocks electrons loose and makes an electric current, with no moving parts at all.", q: ["What do most solar cells use to turn light into electricity?", ["Silicon", "Gold", "Wood"], 0] },
{ t: "Making water safe", x: "Water can be filtered through layers of sand, gravel and charcoal to remove dirt. Filtering alone does not kill germs, so water should also be boiled or treated before drinking.", q: ["What else should be done after filtering water, to make it safe to drink?", ["Boil or treat it", "Freeze it", "Add sugar"], 0] },
{ t: "Recycling metal", x: "Making aluminium cans from recycled aluminium uses about 95 per cent less energy than making them from raw ore. Aluminium can be recycled again and again without wearing out.", q: ["About how much energy does recycling aluminium save?", ["About 95 per cent", "About 5 per cent", "None"], 0] },
{ t: "Nature comes back", x: "After people left the land around Chernobyl in 1986, wildlife returned in great numbers. Wolves, elk, deer and wild horses now live in the forests that grew back there.", q: ["What happened to the wildlife near Chernobyl after people left?", ["It returned in great numbers", "It all vanished", "It turned into scrap"], 0] }],
persona: "Wellspring is the great rebuilt city of the Wasteland in SomnuMatrix, grown up round an old dam that still gives clean water and power, and run by Mayor Hester Cobb and the Rebuilders' Council. Scrappers, seed keepers, windmill fitters and road traders live there. They are practical, hopeful and generous, trade fairly, value seeds above all, and love explaining how to mend, grow and recycle. It is a hopeful, friendly place, suitable for all ages.",
mats: [{ k: "gr_wasteland_seed", n: "Saved seeds", e: "🌱", p: 14 }, { k: "gr_wasteland_water", n: "Clean water jug", e: "💧", p: 6 }, { k: "gr_wasteland_copper", n: "Copper wire", e: "🧵", p: 11 }]
});
grRealm({ id: "desert", parent: { w: "land", sub: "desert" }, parentName: "the Endless Desert", name: "Sahmira", short: "Sahmira",
blurb: "the oasis city of the Endless Desert, its domes and towers round seven wells under a burning blue sky",
intro: "Out of the dunes rise golden walls, palm gardens and domes of sky-blue tile round seven deep wells. Caravans arrive from every direction, and the Avenue of Palms leads up to the Palace of the Seven Wells.",
style: "desert", layout: "open", tone: 430, gateCol: 0xFFE0A0,
env: { top: 0x4A82C8, low: 0xF0D8A8, fog: 0xE0C898, fogD: 0.0009, sun: 0.95, sunCol: 0xFFF0D0, sunDir: [0.4, 0.8, -0.3], hemi: 0.72, hemiCol: 0xFFE8C0, hemiGround: 0x9A7A4A, groundCol: 0xC4AA78, groundCol2: 0xB09868, groundTex: "sand", mtn: 0xB8986A, mtnTex: "sand" },
gate: { n: "The Caravan Gate", d: "the great carved gate where the caravans come in off the dunes", back: "The Caravan Gate" },
warden: ["Yusra Haddad", "Keeper of the Caravan Gate", "a keeper of the gate who greets every traveller with a cup of cool water and asks where they have come from"],
names: ["Yusra", "Tariq", "Layla", "Idris", "Nadira", "Karim", "Samira", "Faris", "Zaynab", "Omar", "Amira", "Rashid", "Leila", "Hakim", "Salma", "Bashir"],
surnames: ["Haddad", "al-Saffar", "Nasir", "Khoury", "al-Rimal", "Darwish", "Mansour", "Qasim", "Aziz", "Haddadi", "Barakat", "Sabbagh"],
citizenTitles: ["Caravan leader", "Spice merchant", "Water-seller", "Star navigator", "Date grower"], guardTitle: "Well guard",
plaza: { n: "The Square of the Seven Wells", d: "where seven deep wells ring a fountain, and the city meets in the cool of the evening", heart: "fountain" }, avenue: { n: "The Avenue of Palms" },
palace: { t: "palace", n: "The Palace of the Seven Wells", d: "the palace of the Well-Queen, who shares out the water of the desert fairly", hall: "The Hall of Blue Tiles",
seat: ["throne", "The Throne of the Wells", 0],
staff: [["Well-Queen Nadira al-Saffar", "Well-Queen of Sahmira", "the Well-Queen, who shares out the desert's water fairly: wise, generous and fond of poetry and star-gazing"], ["Idris Mansour", "Keeper of the Wells"], ["Samira Barakat", "Mistress of the Palace"]],
rooms: [["council", "The Council of Caravans", 1], ["banquet", "The Feast Hall of Dates", 0], ["suite", "The Well-Queen's Apartments", 1], ["treasury", "The Treasury of Turquoise", 1], ["gallery", "The Gallery of Carpets", 0],
["library", "The Library of Poems", 0], ["kitchen", "The Saffron Kitchens", 1], ["armoury", "The Well Guard Armoury", 1], ["office", "The Office of Water", 1], ["lounge", "The Courtyard of Fountains", 0], ["bath", "The Palace Bathhouse", 0], ["suite", "The Guest Pavilions", 0]] },
wards: [
{ t: "market", n: "The Grand Spice Souk", d: "a maze of stalls selling spices, carpets, lamps and dates", staff: [["Merchant Karim Darwish", "Master of the Souk", "a spice merchant who can name any spice by smell with his eyes shut"]] },
{ t: "inn", n: "The Caravanserai of the Long Road", d: "a great inn with stables round a shady courtyard" },
{ t: "library", n: "The House of Star Charts", d: "maps of the dunes and the stars that guide the caravans" },
{ t: "academy", n: "The Academy of Wells and Water", d: "where engineers learn to find, dig and keep water" },
{ t: "bath", n: "The Rose Bathhouse", d: "cool pools scented with rose water" },
{ t: "observatory", n: "The Tower of the Night Sky", d: "where navigators learn the stars" },
{ t: "guild", n: "The Caravan Masters' Guild", d: "who plan every caravan's road and keep its camels well" },
{ t: "temple", n: "The Hall of the Hidden Spring", d: "a cool quiet hall built over the oldest spring" }
],
arena: { n: "The Dune Course", d: "the Well Guard's training ground", about: "Six posts stand round the dunes. Run to each as it lights gold; running on sand is hard work, so pace yourself." },
homes: { n: "The Courtyard Houses", d: "cool homes built round shady courtyards" },
tunnel: { n: "The Qanat Tunnel", kind: "tunnel" },
deep: { n: "The Salt and Spice Flats", d: "the salt pans, the date palm gardens, the glass kilns and the caravan depot", heart: "obelisk",
b: [{ t: "mine", n: "The Salt Pans", d: "white salt raked from the dry lake bed" }, { t: "farm", n: "The Date Palm Gardens", d: "palms and saffron crocus watered by the qanats" }, { t: "workshop", n: "The Glass Kilns", d: "desert sand melted into coloured glass" }, { t: "dock", n: "The Caravan Depot", d: "where camel trains are loaded for the long road" }],
gather: [{ k: "gr_desert_salt", n: "A crust of desert salt", v: "rake up the salt", look: "crystal" }, { k: "gr_desert_dates", n: "A date palm", v: "pick dates", look: "crop" }, { k: "gr_desert_saffron", n: "A bed of saffron crocus", v: "pick saffron threads", look: "herb" }, { k: "gr_desert_turquoise", n: "A turquoise vein", v: "dig turquoise", look: "ore" }] },
trade: { say: "The Spice Souk buys what the flats bring in, and sells the city's goods.", sells: ["cr_glass", "cr_cloth", "cr_leather"], buys: ["gr_desert_salt", "gr_desert_dates", "gr_desert_saffron", "gr_desert_turquoise", "cr_wood", "cr_ore"] },
lore: [["The founding of Sahmira", "A caravan lost in a sandstorm found seven wells in a ring, and stayed. The city grew round them, and travellers have come to its gate ever since."],
["The Well-Queen", "The Well-Queen's first duty is to share the water fairly. Every household, every caravan and every camel gets its share."],
["The qanats", "Long tunnels carry water underground from the hills to the gardens without losing it to the sun. The Keepers of the Wells walk them every month."],
["The caravans", "Caravans leave at dusk, when it is cool, and steer by the stars. The Caravan Masters' Guild knows every safe road and every well along it."],
["The Grand Spice Souk", "The souk is a maze, and getting lost in it is part of the fun. Any stallholder will happily point you to the way out, after a cup of mint tea."],
["The salt pans", "Beyond the Qanat Tunnel lies a dry lake where salt is raked into white heaps. Salt was once so valuable that caravans carried it across the desert like gold."]],
lectures: [{ t: "Qanats", x: "A qanat is an underground channel that carries water downhill from a source in the hills, with shafts along it for digging and repairs. Qanats were first dug in ancient Persia about 3,000 years ago, and some still flow.", q: ["Where were qanats first dug?", ["Ancient Persia", "Ancient Rome", "Antarctica"], 0] },
{ t: "Cold desert nights", x: "Dry desert air holds little water vapour, and clear skies let heat escape. So a desert that is scorching by day can be near freezing at night.", q: ["Why do deserts get cold at night?", ["Dry air and clear skies let heat escape", "The sand turns to ice", "The wind stops"], 0] },
{ t: "Camels", x: "A camel's hump stores fat, not water. Camels can close their nostrils against blowing sand, have two rows of long eyelashes, and can drink about 100 litres of water in a few minutes.", q: ["What does a camel's hump store?", ["Fat", "Water", "Sand"], 0] },
{ t: "Saffron", x: "Saffron is the threads of the saffron crocus flower, picked by hand. Each flower has only three threads, which is why saffron is the world's most expensive spice.", q: ["How many saffron threads does each crocus flower have?", ["Three", "Thirty", "One hundred"], 0] },
{ t: "Singing dunes", x: "Some sand dunes make a deep booming hum when sand slides down their faces. Scientists think it comes from the grains moving together in a sliding layer.", q: ["What makes some dunes boom and hum?", ["Sand grains sliding together", "Wind in caves", "Animals under the sand"], 0] }],
persona: "Sahmira is the oasis city of the Endless Desert in SomnuMatrix, built round seven wells and ruled by the Well-Queen, who shares out the water fairly. Caravan leaders, spice merchants, water-sellers, date growers and star navigators live there. They are warm, generous hosts who always offer water first, and love explaining real facts about deserts, water, stars and trade.",
mats: [{ k: "gr_desert_salt", n: "Desert salt", e: "🧂", p: 6 }, { k: "gr_desert_dates", n: "Dates", e: "🌴", p: 5 }, { k: "gr_desert_saffron", n: "Saffron threads", e: "🌸", p: 40 }, { k: "gr_desert_turquoise", n: "Turquoise", e: "🔵", p: 24 }]
});
grRealm({ id: "orbital", parent: { w: "land", sub: "station" }, parentName: "the Orbital", name: "Meridian Ring", short: "Meridian Ring",
blurb: "the great spinning ring-city of the Orbital, with parks, towers and the Earth turning below",
intro: "Inside a vast turning ring, streets and parks curve up out of sight in both directions, and through the great windows the Earth rolls past. The Spinward Avenue leads to the Command Spire, where the Orbital is run.",
style: "future", layout: "open", tone: 580, gateCol: 0xBFE0FF,
env: { top: 0x02030A, low: 0x0A1020, fog: 0x0A1020, fogD: 0.0009, sun: 0.7, sunCol: 0xF0F4FF, sunDir: [0.6, 0.5, -0.3], hemi: 0.85, hemiCol: 0xC8D8F0, hemiGround: 0x3A4048, stars: 1, groundCol: 0x6A7480, groundCol2: 0x545E6A, groundTex: "paving", mtn: 0x5A626E, mtnTex: "metal" },
gate: { n: "The Spoke Lock", d: "the airlock and lift down a spoke into the ring-city", back: "The Spoke Lock" },
warden: ["Kenji Abara", "Lockmaster of the Spoke Lock", "a lockmaster who has cycled ten thousand travellers through the lock and still says 'Welcome aboard' like he means it"],
names: ["Kenji", "Imara", "Sasha", "Diego", "Anika", "Lars", "Zola", "Mateus", "Freya", "Ravi", "Noemi", "Tomasz", "Adaeze", "Hugo", "Mina", "Eitan"],
surnames: ["Abara", "Castellane", "Lindgren", "Osei", "Petrova", "Hale", "Yamamoto", "Cardoso", "Strand", "Bergstrom", "Achterberg", "Nakashima"],
citizenTitles: ["Ring engineer", "Hydroponic grower", "Shuttle pilot", "Station scientist", "Visiting astronaut"], guardTitle: "Station security officer",
plaza: { n: "Earthview Plaza", d: "a park beside the great window, where the Earth turns past every ninety minutes", heart: "orrery" }, avenue: { n: "The Spinward Avenue" },
palace: { t: "palace", n: "The Command Spire", d: "the tower at the heart of the ring, where the Orbital's council and its commodore keep everything running", hall: "The Command Hall",
seat: ["control", "The Commodore's Bridge", 1],
staff: [["Commodore Imara Castellane", "Commodore of the Orbital", "the Commodore, a former shuttle pilot who knows every system on the ring and still loves watching sunrises from the bridge"], ["Lars Lindgren", "Chief Engineer"], ["Adaeze Osei", "Ring Council Secretary"]],
rooms: [["council", "The Ring Council Chamber", 1], ["banquet", "The Earthrise Dining Hall", 0], ["suite", "The Commodore's Quarters", 1], ["treasury", "The Credit Vault", 1], ["gallery", "The Gallery of First Flights", 0],
["library", "The Spire Data Library", 0], ["kitchen", "The Spire Galley", 1], ["armoury", "The Security Locker", 1], ["office", "The Life Support Office", 1], ["control", "The Traffic Control Room", 1], ["map", "The Orbit Planning Room", 0], ["suite", "The Guest Cabins", 0]] },
wards: [
{ t: "academy", n: "The Orbital Academy of Flight", d: "where pilots and engineers learn to live and work in orbit", staff: [["Dean Freya Strand", "Dean of the Academy of Flight", "the dean, who spent a year in orbit as a student and has never wanted to go back down"]] },
{ t: "lab", n: "The Microgravity Laboratories", d: "experiments that only work without weight" },
{ t: "hangar", n: "The Docking Ring", d: "where shuttles and cargo ships dock" },
{ t: "hospital", n: "The Ring Medical Bay", d: "medicine for bodies living in space" },
{ t: "market", n: "The Spinward Market", d: "food, parts and goods from Earth and the Moon" },
{ t: "library", n: "The Ring Archive", d: "the records of every crew and every mission" },
{ t: "barracks", n: "Station Security", d: "the officers who keep the ring safe and calm" },
{ t: "theatre", n: "The Starview Theatre", d: "films, music and talks under a window of stars" }
],
arena: { n: "The Spin Gym", d: "the crew's training ground", about: "Six posts stand round the gym. Run to each as it lights gold; on a spinning ring the floor curves up ahead of you." },
homes: { n: "The Habitat Decks", d: "neat crew homes stacked along the curving decks" },
tunnel: { n: "The Hub Spoke", kind: "tube" },
deep: { n: "The Hub Works", d: "the recycling works, the algae farms, the asteroid tethers and the solar watch at the ring's hub", heart: "orrery",
b: [{ t: "workshop", n: "The Recycling Works", d: "where air and water are cleaned and used again" }, { t: "farm", n: "The Algae Farms", d: "green tanks of algae grown for food and oxygen" }, { t: "mine", n: "The Asteroid Tethers", d: "a small captured asteroid mined for metal" }, { t: "observatory", n: "The Solar Watch", d: "where the crew keep an eye on the Sun's weather" }],
gather: [{ k: "gr_orbital_water", n: "The reclaimed water tank", v: "draw clean water", look: "ice" }, { k: "gr_orbital_algae", n: "An algae tank", v: "harvest algae", look: "crop" }, { k: "gr_orbital_nickel", n: "A seam of asteroid nickel", v: "cut nickel ore", look: "ore" }, { k: "gr_orbital_oxygen", n: "The oxygen filling bay", v: "fill an oxygen canister", look: "gas" }] },
trade: { say: "The Spinward Market buys what the Hub Works produce, and sells parts and supplies.", sells: ["cr_parts", "cr_steel", "cr_glass"], buys: ["gr_orbital_water", "gr_orbital_algae", "gr_orbital_nickel", "gr_orbital_oxygen", "cr_scrap", "cr_rubber"] },
lore: [["The building of the Ring", "The Orbital began as a single small station. Module by module it grew, until the engineers joined the pieces into a great ring and set it spinning."],
["The Commodore", "The Orbital is run by a Ring Council and its Commodore from the Command Spire. The Commodore's first duty is the air, the second is the water, and the third is everything else."],
["Sixteen sunrises", "The ring goes round the Earth about once every ninety minutes, so its people see about sixteen sunrises a day. They keep their clocks on one day and draw the blinds to sleep."],
["Why it spins", "The ring spins so that the floor presses up on your feet, giving a feeling of weight. At the hub, where the spokes meet, you float."],
["Nothing wasted", "Every drop of water and every breath of air on the ring is cleaned and used again. The Recycling Works are the most important building on the Orbital."],
["Earthview Plaza", "The great window at Earthview Plaza is the most popular spot on the ring. People picnic there to watch storms, cities and auroras roll by below."]],
lectures: [{ t: "Gravity from spinning", x: "A spinning ring pushes everything on its inner floor towards the centre, and the floor pressing on your feet feels like weight. The faster the spin or the bigger the ring, the stronger the feeling.", q: ["How does a spinning ring give a feeling of weight?", ["The floor pushes you towards the centre as it turns", "It has a magnet", "It is heavy"], 0] },
{ t: "Orbiting is falling", x: "Astronauts in orbit are not beyond Earth's gravity. They are falling all the time, but moving sideways so fast, about 28,000 km/h, that they keep missing the Earth.", q: ["Why do astronauts in orbit float?", ["They are always falling around the Earth", "There is no gravity in space", "Their suits are full of air"], 0] },
{ t: "Recycling water in space", x: "The International Space Station recycles almost all its water, including sweat and moisture from breath. In 2023 its system reached about 98 per cent water recovery.", q: ["About how much of its water does the space station recover?", ["About 98 per cent", "About 10 per cent", "None"], 0] },
{ t: "Taller in space", x: "Without weight pressing down, the discs in an astronaut's spine spread out, and they can grow a few centimetres taller. They shrink back to normal after returning to Earth.", q: ["What happens to an astronaut's height in space?", ["They grow a little taller", "They shrink", "Nothing"], 0] },
{ t: "Space weather", x: "The Sun sometimes flings out bursts of charged particles. Spacecraft crews keep watch, and in a strong solar storm they shelter in the most shielded part of their station.", q: ["Where do crews go in a strong solar storm?", ["The most shielded part of the station", "Outside to watch", "The windows"], 0] }],
persona: "Meridian Ring is the great spinning ring-city of the Orbital in SomnuMatrix, run by the Ring Council and Commodore Imara Castellane from the Command Spire. Engineers, pilots, growers and scientists live there, with the Earth turning past the windows and sixteen sunrises a day. They are friendly, calm and capable, and love explaining real space science.",
mats: [{ k: "gr_orbital_water", n: "Reclaimed water", e: "💧", p: 6 }, { k: "gr_orbital_algae", n: "Algae cake", e: "🟩", p: 7 }, { k: "gr_orbital_nickel", n: "Asteroid nickel", e: "⚙️", p: 15 }, { k: "gr_orbital_oxygen", n: "Oxygen canister", e: "🫧", p: 12 }]
});
grRealm({ id: "future", parent: { w: "land", sub: "future" }, parentName: "the City to Come", name: "Brightwater", short: "Brightwater",
blurb: "the green heart of the City to Come, where towers grow gardens and trams glide all night under a violet sky",
intro: "Glass towers wrapped in gardens rise under a violet evening sky, and quiet trams glide between them. Every roof grows food and every window makes power, and the Avenue of Light leads to the Civic Spire, where the people's assembly meets.",
style: "future", layout: "open", tone: 520, gateCol: 0xD0B8FF,
env: { top: 0x120A2A, low: 0x4A1A5A, fog: 0x2E1A40, fogD: 0.0016, sun: 0.45, sunCol: 0xC8A8FF, sunDir: [-0.4, 0.5, -0.5], hemi: 0.8, hemiCol: 0xC8B8F0, hemiGround: 0x2A2E38, groundCol: 0x2A2E38, groundCol2: 0x3A4048, groundTex: "paving", mtn: 0x2A2A3E, mtnTex: "concrete" },
gate: { n: "The Tram Gate", d: "the tram stop where the night tram glides into the green city", back: "The Tram Gate" },
warden: ["Priya Okonkwo-Hale", "Keeper of the Tram Gate", "a cheerful tram conductor who knows every line in the city and gives every visitor a little paper map anyway, because maps are nice"],
names: ["Priya", "Amaru", "Jun", "Saoirse", "Tendai", "Lucien", "Mei", "Omar", "Ingrid", "Ravi", "Zuri", "Felipe", "Hana", "Arjun", "Nell", "Kofi"],
surnames: ["Okonkwo-Hale", "Lindqvist", "Tanaka", "Morales", "Adebayo", "Novak", "Sorensen", "Chandra", "Reyes", "Kim", "Achebe", "Fontaine"],
citizenTitles: ["Tower farmer", "Tram driver", "Repair technician", "Energy engineer", "Coffee-cart owner"], guardTitle: "City steward",
plaza: { n: "The Commons", d: "a great green square where the trams meet and the people gather", heart: "tree" }, avenue: { n: "The Avenue of Light" },
palace: { t: "palace", n: "The Civic Spire", d: "the glass-and-garden tower where the People's Assembly of the city meets", hall: "The Assembly Hall",
seat: ["council", "The Assembly Floor", 1],
staff: [["Chair Amaru Lindqvist", "Chair of the People's Assembly", "the elected Chair of the People's Assembly: friendly, practical and always on the tram rather than in a car"], ["Ingrid Sorensen", "Clerk of the Assembly"], ["Tendai Adebayo", "Keeper of the Spire Gardens"]],
rooms: [["council", "The Citizens' Forum", 0], ["banquet", "The Harvest Hall", 0], ["suite", "The Chair's Rooms", 1], ["treasury", "The City Fund", 1], ["gallery", "The Gallery of Tomorrow", 0],
["library", "The Open Archive", 0], ["kitchen", "The Spire Kitchen", 1], ["armoury", "The Stewards' Store", 1], ["office", "The Office of Energy", 1], ["control", "The City Grid Room", 1], ["greenhouse", "The Sky Garden", 0], ["suite", "The Visitors' Rooms", 0]] },
wards: [
{ t: "academy", n: "The Open University of Brightwater", d: "free learning for anyone, any age, day or night", staff: [["Professor Mei Tanaka", "Rector of the Open University", "the rector, who believes anyone can learn anything and teaches a free class on the tram every Tuesday"]] },
{ t: "lab", n: "The Fusion Institute", d: "where scientists work on clean power like the Sun's" },
{ t: "farm", n: "The Skyfarm Tower", d: "forty floors of crops grown under soft light" },
{ t: "market", n: "The Repair-and-Share Market", d: "where things are mended, swapped and shared" },
{ t: "hospital", n: "The Long Life Clinic", d: "a calm, bright hospital full of plants" },
{ t: "library", n: "The Library of Everything", d: "books, films and music, free to all" },
{ t: "theatre", n: "The Light Theatre", d: "shows made of light and music" },
{ t: "workshop", n: "The Maker Halls", d: "workshops anyone can use to build and mend" }
],
arena: { n: "The Rooftop Track", d: "the city stewards' training ground, high on a garden roof", about: "Six posts stand round the rooftop. Run to each as it lights gold; the stewards race to help anyone, anywhere in the city." },
homes: { n: "The Garden Towers", d: "homes in towers wrapped in balconies of plants" },
tunnel: { n: "The Glide Tube", kind: "tube" },
deep: { n: "The Circular District", d: "the recycling foundry, the battery works, the vertical orchards and the airship port", heart: "orrery",
b: [{ t: "workshop", n: "The Recycling Foundry", d: "where old things are melted down and made new" }, { t: "lab", n: "The Battery Works", d: "where batteries are built and old ones renewed" }, { t: "farm", n: "The Vertical Orchards", d: "fruit trees grown on stacked terraces" }, { t: "dock", n: "The Airship Port", d: "where quiet solar airships carry cargo" }],
gather: [{ k: "cr_scrap", n: "The recycling sort line", v: "sort reusable parts", look: "ore" }, { k: "gr_future_greens", n: "A tray of tower-grown greens", v: "harvest greens", look: "crop" }, { k: "gr_future_cell", n: "A rack of renewed battery cells", v: "take a renewed cell", look: "gas" }, { k: "gr_future_bioplastic", n: "A vat of plant-made plastic", v: "draw off bioplastic", look: "herb" }, { k: "cr_rubber", n: "The tyre-recycling press", v: "take a slab of rubber", look: "gas" }] },
trade: { say: "The Repair-and-Share Market buys what the Circular District makes, and sells mended goods.", sells: ["cr_parts", "cr_glass", "cr_rubber"], buys: ["cr_scrap", "gr_future_greens", "gr_future_cell", "gr_future_bioplastic", "cr_steel", "cr_cloth"] },
lore: [["The founding of Brightwater", "The City to Come was an old city that decided to change. One street planted a garden on its roof; the next street copied it; and soon every roof in Brightwater was green."],
["The People's Assembly", "Brightwater is run by the People's Assembly, which meets in the Civic Spire. Anyone may come and speak, and the meetings are shown on the trams."],
["The trams", "The trams of Brightwater run all night and are free to ride. The drivers know their regular passengers by name."],
["Nothing thrown away", "In the Circular District nothing is thrown away. Everything is mended, shared, or melted down and made into something new."],
["The Skyfarm Tower", "The Skyfarm Tower grows enough greens to feed whole neighbourhoods, forty floors up, using far less water than a field."],
["The violet sky", "The sky over Brightwater is always a soft violet evening. The city lights are gentle and warm, so the stars still show through."]],
lectures: [{ t: "Fusion power", x: "The Sun shines by fusion: squeezing hydrogen nuclei together to make helium, releasing energy. In December 2022 the National Ignition Facility in California got more energy out of a fusion reaction than the laser energy put in, for the first time.", q: ["What does the Sun fuse together to make energy?", ["Hydrogen into helium", "Iron into gold", "Carbon into oxygen"], 0] },
{ t: "Hydroponics", x: "Hydroponic farms grow plants with their roots in water full of nutrients instead of soil. Stacked indoors under LED lights, they can grow food all year using much less water.", q: ["What do hydroponic plants grow in instead of soil?", ["Water full of nutrients", "Sand", "Air only"], 0] },
{ t: "The lithium-ion battery", x: "Lithium-ion batteries power phones, laptops and electric cars. Three scientists, John Goodenough, Stanley Whittingham and Akira Yoshino, won the 2019 Nobel Prize in Chemistry for developing them.", q: ["Which kind of battery won its inventors the 2019 Nobel Prize in Chemistry?", ["Lithium-ion", "Lead-acid", "Potato"], 0] },
{ t: "Cool green roofs", x: "Cities get hotter than the countryside around them, because roads and roofs soak up heat; this is called the urban heat island effect. Green roofs and trees shade and cool the air, and soak up rain.", q: ["What is the urban heat island effect?", ["Cities being hotter than the countryside", "Islands in rivers", "Hot weather at sea"], 0] },
{ t: "Trams and space", x: "One tram can carry as many people as dozens of cars, using a fraction of the road space. Electric trams also make no exhaust fumes in the street.", q: ["Why do trams save road space?", ["One tram carries as many people as dozens of cars", "They are very small", "They fly"], 0] }],
persona: "Brightwater is the green heart of the City to Come in SomnuMatrix: glass towers wrapped in gardens, free trams all night and a soft violet sky, run by the People's Assembly in the Civic Spire. Tower farmers, tram drivers, repair technicians and energy engineers live there. They are friendly, hopeful and practical, and love explaining real ideas about clean energy, city farming and recycling.",
mats: [{ k: "gr_future_greens", n: "Tower-grown greens", e: "🥬", p: 6 }, { k: "gr_future_cell", n: "Renewed battery cell", e: "🔋", p: 18 }, { k: "gr_future_bioplastic", n: "Bioplastic", e: "♻️", p: 9 }]
});
var GR_STALL_WARES = [["fruit and vegetables", "greengrocer"], ["bread and pies", "baker"], ["cloth and ribbons", "draper"], ["pots and pans", "tinker"],
["spices and tea", "spice seller"], ["cheese and eggs", "dairy woman"], ["flowers", "flower seller"], ["books and maps", "bookseller"],
["candles and lamps", "chandler"], ["fish", "fishmonger"], ["toys and puppets", "toymaker"], ["herbs and simples", "herb seller"]];
function grStreetFree(x, z, r) { return __ZC(333, 105, this, arguments, new.target); }
function grStreetLife(G, P, R, S) { return __ZC(333, 106, this, arguments, new.target); }
function grMoreCitizens(G, R) { return __ZC(333, 107, this, arguments, new.target); }
(function () {
var d0 = grDecorate;
grDecorate = function (G, P, R, S) { var r = d0.apply(this, arguments); try {
grStreetLife(G, P, R, S);
}
catch (e) {
if (window.console)
console.warn("[grand] street life", e);
} return r; };
var c0 = grCitizens;
grCitizens = function (G, R) { var r = c0.apply(this, arguments); try {
grMoreCitizens(G, R);
}
catch (e) {
if (window.console)
console.warn("[grand] citizens", e);
} return r; };
})();
var GR_GATES = {}, GR_LAMPS = {};
function grFormOf(R) { var L = grLook(R); return L.form || "block"; }
GR_GATES.pod = function (P, R, S, x, z) { return __ZC(333, 108, this, arguments, new.target); };
GR_GATES.stepped = function (P, R, S, x, z) { return __ZC(333, 109, this, arguments, new.target); };
GR_GATES.carved = function (P, R, S, x, z) { return __ZC(333, 110, this, arguments, new.target); };
GR_GATES.float = function (P, R, S, x, z) { return __ZC(333, 111, this, arguments, new.target); };
GR_GATES.round = function (P, R, S, x, z) { return __ZC(333, 112, this, arguments, new.target); };
GR_GATES.tower = function (P, R, S, x, z) { return __ZC(333, 113, this, arguments, new.target); };
GR_GATES.timber = function (P, R, S, x, z) { return __ZC(333, 114, this, arguments, new.target); };
GR_GATES.tree = function (P, R, S, x, z) { return __ZC(333, 115, this, arguments, new.target); };
GR_GATES.crypt = function (P, R, S, x, z) { return __ZC(333, 116, this, arguments, new.target); };
GR_GATES.fortress = function (P, R, S, x, z) { return __ZC(333, 117, this, arguments, new.target); };
GR_GATES.pagoda = function (P, R, S, x, z) { return __ZC(333, 118, this, arguments, new.target); };
GR_GATES.salvage = function (P, R, S, x, z) { return __ZC(333, 119, this, arguments, new.target); };
GR_GATES.shell = function (P, R, S, x, z) { return __ZC(333, 120, this, arguments, new.target); };
GR_GATES.twin = function (P, R, S, x, z) { return __ZC(333, 121, this, arguments, new.target); };
GR_LAMPS.pod = function (P, S, x, z) { grCyl(P, 0.25, 0.3, 1.0, S.trim[0], "metal", x, 0.5, z, 8); grCyl(P, 0.27, 0.27, 0.18, S.glow, null, x, 0.95, z, 8, { glow: true }); return 1.0; };
GR_LAMPS.stepped = function (P, S, x, z) { return __ZC(333, 122, this, arguments, new.target); };
GR_LAMPS.carved = function (P, S, x, z) { grBox(P, 0.5, 2.6, 0.5, S.trim[0], S.trim[1], x, 1.3, z); var c = grCyl(P, 0.0, 0.3, 0.9, S.glow, null, x, 3.05, z, 5, { glow: true }); return 3.2; };
GR_LAMPS.float = function (P, S, x, z) {
grCyl(P, 0.08, 0.1, 4.4, 0x6A4E36, "wood", x, 2.2, z, 6);
grBox(P, 1.1, 0.08, 0.08, 0x6A4E36, "wood", x + 0.5, 4.3, z);
grBox(P, 0.02, 0.6, 0.02, 0x1A1A1A, null, x + 0.95, 3.95, z);
grBox(P, 0.32, 0.45, 0.32, 0x2A2A2A, "metal", x + 0.95, 3.45, z);
grSph(P, 0.12, S.glow, null, x + 0.95, 3.45, z, 6, { glow: true });
return 3.45;
};
GR_LAMPS.round = function (P, S, x, z) { grCyl(P, 0.05, 0.07, 4.6, S.trim[0], "metal", x, 2.3, z, 6); grSph(P, 0.42, S.glow, null, x, 4.9, z, 12, { glow: true }); return 4.9; };
GR_LAMPS.tower = function (P, S, x, z) { grCyl(P, 0.09, 0.13, 7, S.trim[0], "metal", x, 3.5, z, 8); grBox(P, 1.6, 0.12, 0.4, S.trim[0], "metal", x, 7, z); grBox(P, 1.2, 0.05, 0.3, S.glow, null, x, 6.92, z, 0, { glow: true }); return 6.9; };
GR_LAMPS.timber = function (P, S, x, z) {
grBox(P, 0.22, 3.8, 0.22, 0x4A3420, "wood", x, 1.9, z);
grBox(P, 0.9, 0.12, 0.12, 0x4A3420, "wood", x + 0.35, 3.7, z);
grBox(P, 0.34, 0.5, 0.34, 0x1E1E1E, "metal", x + 0.7, 3.3, z);
grSph(P, 0.13, 0xFFC870, null, x + 0.7, 3.3, z, 6, { glow: true });
return 3.3;
};
GR_LAMPS.tree = function (P, S, x, z) {
var c = grCyl(P, 0.08, 0.14, 3.6, 0x4A3A2A, "bark", x, 1.8, z, 6);
var h = grCyl(P, 0.06, 0.06, 1.2, 0x4A3A2A, "bark", x + 0.4, 3.6, z, 5);
h.rotation.z = -1.1;
grSph(P, 0.24, 0xFFD27A, null, x + 0.95, 3.2, z, 8, { glow: true });
return 3.2;
};
GR_LAMPS.crypt = function (P, S, x, z) { grCyl(P, 0.06, 0.1, 3.8, 0x1E1E22, "metal", x, 1.9, z, 6); grCyl(P, 0.28, 0.18, 0.55, 0x1E1E22, "metal", x, 4.05, z, 6); grSph(P, 0.15, 0xC8E0A0, null, x, 3.95, z, 6, { glow: true }); return 3.95; };
GR_LAMPS.fortress = function (P, S, x, z) { grBox(P, 0.4, 2.4, 0.4, S.trim[0], S.trim[1], x, 1.2, z); grCyl(P, 0.1, 0.06, 0.7, 0x3A2A1A, "wood", x, 2.7, z, 6); grSph(P, 0.2, 0xFF8A30, null, x, 3.1, z, 6, { glow: true }); return 3.1; };
GR_LAMPS.pagoda = function (P, S, x, z) {
grCyl(P, 0.25, 0.35, 1.2, S.trim[0], "stone", x, 0.6, z, 6);
grBox(P, 0.8, 0.7, 0.8, S.trim[0], "stone", x, 1.55, z);
grBox(P, 0.5, 0.4, 0.5, 0xFFD890, null, x, 1.55, z, 0, { glow: true });
grCone(P, 0.85, 0.5, S.trim[0], "stone", x, 2.15, z, 4);
return 1.55;
};
GR_LAMPS.salvage = function (P, S, x, z) { grCyl(P, 0.32, 0.32, 0.9, 0x6A3A22, "metal", x, 0.45, z, 10); grSph(P, 0.28, 0xFF7A28, null, x, 0.95, z, 8, { glow: true }); return 1.0; };
GR_LAMPS.shell = function (P, S, x, z) { var st = grCyl(P, 0.07, 0.16, 2.8, S.trim[0], null, x, 1.4, z, 6); st.rotation.z = 0.12; grSph(P, 0.35, S.glow, null, x + 0.18, 2.9, z, 10, { glow: true }); return 2.9; };
GR_LAMPS.twin = function (P, S, x, z) { grCyl(P, 0.14, 0.14, 3.6, 0xE8F0F4, "glass", x, 1.8, z, 6); grCyl(P, 0.1, 0.1, 3.0, S.glow, null, x, 1.9, z, 6, { glow: true }); return 2.4; };
(function () {
var g0 = grInnerGate;
grInnerGate = function (G, P, R, S) {
var f = grFormOf(R), fn = GR_GATES[f];
if (!fn)
return g0.apply(this, arguments);
var g = GR_AT.gate, x = g.x, z = g.z, at = fn(P, R, S, x, z) || 10;
if (typeof at === "number")
at = { y: at, z: -2.2 };
var veil = new THREE.Mesh(new THREE.PlaneGeometry(9, 8.4), new THREE.MeshBasicMaterial({ color: R.gateCol || S.glow, transparent: true, opacity: 0.22, depthWrite: false, side: THREE.DoubleSide }));
veil.position.set(x, 4.2, z);
veil.userData.grKeep = 1;
G.add(veil);
GR.veil = veil;
grSign(P, [R.name, "the way back: press E"], x, at.y, z + at.z, Math.PI, at.w || 8.4, at.h || 1.6);
GR.spots.push({ x: x, z: z - 3, r: 3.4, label: "<b>" + esc(R.gate && R.gate.back || "The way back") + "</b> · <b>press E</b> to go back to " + esc(R.parentName || "the world outside"), fn: function () { grLeave(); } });
if (R.warden) {
var w = R.warden;
grPersonAt(G, R, { n: w[0], t: w[1], who: w[2] || "the warden of the gate, who welcomes visitors and knows the realm well" }, x + 5, z - 6, Math.PI * 0.85, true);
}
};
var l0 = grLamp;
grLamp = function (P, S, x, z, R) {
var fn = R && GR_LAMPS[grFormOf(R)];
if (!fn)
return l0.apply(this, arguments);
var y = fn(P, S, x, z);
if (!grLite())
grGlow(P, S.glow, 2.6, 0.28, x, y, z);
};
})();
function grJitter(geo, amt, seed) { return __ZC(333, 123, this, arguments, new.target); }
function grLeafClump(B, r, col, x, y, z, seed, lite) {
var g = grJitter(new THREE.IcosahedronGeometry(r, lite ? 1 : 2), 0.42, seed);
g.scale(1, 0.72, 1);
return grMesh(g, grMat(col, "foliage"), x, y, z, B);
}
function grLimb(B, r0, r1, a, b, col) { return __ZC(333, 124, this, arguments, new.target); }
function grGreatTree(B, x, z, tr, th, cr, lf, seed) { return __ZC(333, 125, this, arguments, new.target); }
var GR_CAPS = [[0xB8281E, 0xF4EEE0, 0xEDE4CC], [0xC23A22, 0xF2ECDE, 0xE8DEC4], [0x8A5A2E, 0xE8D8B0, 0xD8C8A0], [0xA8742E, 0xF0E2C0, 0xE0D0A8], [0x7A3A6A, 0xE8DDF0, 0xD8CCE8]];
function grToadstool(x, z, s, seed) { return __ZC(333, 126, this, arguments, new.target); }
(function () {
var k0 = grKit;
grKit = function (P, a, x, y, z, ry, s) {
if (a === "giantmushroom") {
var G = grToadstool(x, z, s || 1, grHash("ts" + Math.round(x) + "_" + Math.round(z)));
G.position.y = y || 0;
G.rotation.y = ry || 0;
P.add(G);
return G;
}
return k0.apply(this, arguments);
};
if (typeof GR_FORM !== "undefined" && GR_FORM.tree) {
GR_FORM.tree = function (B, R, S, b, w, h, d, grand, wall, trim, roof) {
var hb = h * 0.75, lf = (grLook(R).leaf) || 0x3E6A34, fae = S.k === "fae";
grBox(B, w, hb, d, wall[0], wall[1], 0, hb / 2, 0);
grBox(B, w + 0.6, 0.4, d + 0.6, trim[0], trim[1], 0, hb, 0);
var fl = Math.max(2, Math.round(hb / 5));
for (var f = 0; f < fl; f++)
grWinFace(B, S, w - 2, 1 + (f + 0.55) * (hb - 1) / fl, d / 2 + 0.06, Math.min(1.8, (hb - 1) / fl * 0.5), f === 0);
for (var x = -w / 2; x <= w / 2; x += w / 4)
grBox(B, 0.5, hb, 0.3, trim[0], "wood", x, hb / 2, d / 2 + 0.12);
grRoof(B, w + 1.4, Math.min(8, d * 0.4), d + 1.4, roof[0], roof[1], 0, hb + 0.2, 0);
var tr = grand ? 7 : 4.6, th = h * (grand ? 3 : 2.3), tz = -d * 0.32;
(B.userData.solids = B.userData.solids || []).push({ x: 0, z: tz, r: tr * 1.3 + 3.4 });
grGreatTree(B, 0, tz, tr, th, grand ? 20 : 13, lf, grHash(b.n + "leaf"));
if (fae && !grLite())
for (var g = 0; g < 5; g++) {
var a3 = g / 5 * Math.PI * 2;
grSph(B, 0.4, S.glow, null, Math.cos(a3) * tr * 1.6, th * 0.55 + g * 1.5, tz + Math.sin(a3) * tr * 1.6, 6, { glow: true });
}
return { top: hb };
};
}
})();
var GR_AVES = {};
function grAveRuns(R) { return __ZC(333, 127, this, arguments, new.target); }
function grAveEach(R, every, fn) {
var lite = grLite(), k = 0;
grAveRuns(R).forEach(function (r) { for (var z = r.a - 4; z >= r.b + 2; z -= every) {
if (!lite || k % 2 === 0)
fn(z, k);
k++;
} });
}
function grAveHalf(R) { return grLook(R).plan === "scatter" ? 6.3 : 9.3; }
function grPost(P, x, z, h, col, tx, r) { grCyl(P, r || 0.14, (r || 0.14) * 1.2, h, col, tx, x, h / 2, z, 6); GR.solids.push({ x: x, z: z, r: (r || 0.14) + 0.25 }); }
function grSagLine(P, x0, x1, y, z, s, col) {
var pts = [];
for (var i = 0; i <= 8; i++) {
var t = i / 8;
pts.push(new THREE.Vector3(x0 + (x1 - x0) * t, y - Math.sin(t * Math.PI) * s, z));
}
var c = new THREE.CatmullRomCurve3(pts);
grMesh(new THREE.TubeGeometry(c, 12, 0.03, 3, false), grMat(col, null), 0, 0, 0, P);
return c;
}
function grArch(P, h, w, z, thick, col, tx, seg) { var a = new THREE.Mesh(new THREE.TorusGeometry(w, thick, 6, seg || 16, Math.PI), grMat(col, tx)); a.position.set(0, h, z); a.scale.y = 0.55; P.add(a); return a; }
GR_AVES.pod = function (P, R, S) { return __ZC(333, 128, this, arguments, new.target); };
GR_AVES.stepped = function (P, R, S) { return __ZC(333, 129, this, arguments, new.target); };
GR_AVES.carved = function (P, R, S) { return __ZC(333, 130, this, arguments, new.target); };
GR_AVES.float = function (P, R, S) { return __ZC(333, 131, this, arguments, new.target); };
GR_AVES.round = function (P, R, S) { return __ZC(333, 132, this, arguments, new.target); };
GR_AVES.tower = function (P, R, S) { return __ZC(333, 133, this, arguments, new.target); };
GR_AVES.timber = function (P, R, S) { return __ZC(333, 134, this, arguments, new.target); };
GR_AVES.tree = function (P, R, S) { return __ZC(333, 135, this, arguments, new.target); };
GR_AVES.crypt = function (P, R, S) { return __ZC(333, 136, this, arguments, new.target); };
GR_AVES.fortress = function (P, R, S) { return __ZC(333, 137, this, arguments, new.target); };
GR_AVES.pagoda = function (P, R, S) { return __ZC(333, 138, this, arguments, new.target); };
GR_AVES.salvage = function (P, R, S) { return __ZC(333, 139, this, arguments, new.target); };
GR_AVES.shell = function (P, R, S) { return __ZC(333, 140, this, arguments, new.target); };
GR_AVES.twin = function (P, R, S) { return __ZC(333, 141, this, arguments, new.target); };
(function () {
var d0 = grDecorate;
grDecorate = function (G, P, R, S) {
var r = d0.apply(this, arguments), fn = GR_AVES[grFormOf(R)];
if (fn) {
try {
fn(P, R, S);
}
catch (e) {
console.warn("avenue dressing", R.id, e);
}
}
return r;
};
})();
(function () {
var look = function (id, o) { var R = GR.realms[id]; if (!R)
return; R.look = o; if (o.env) {
R.env = R.env || {};
for (var k in o.env)
R.env[k] = o.env[k];
} if (o.heart && R.plaza)
R.plaza.heart = o.heart; };
var purpose = function (id, t) { var R = GR.realms[id]; if (R)
R.purpose = t; };
look("moon", { plan: "ring", form: "pod", tree: null, env: { groundCol: 0x5E5B57, groundCol2: 0x77736D, mtn: 0x6A6660 }, pal: { wall: [0x8E8A84, "concrete"], roof: [0x74787E, "metalroof"], pave: [0x76726C, "paving"], trim: [0x5E6268, "metal"] },
decor: [["crater", 10], ["rock", 8], ["solar", 6], ["dish", 3], ["rover", 3]],
pastime: { n: "The Crater Rim Dig", d: "Sift the rim of an old impact crater for anorthosite, the pale rock of the Moon's highlands.", k: "ow_mo_anorth", v: "sift the crater rim", look: "dig" } });
purpose("moon", "The capital of the Moon's settlements. Water, air and metal from the Helium Fields keep every dome alive, and the Compact shares them out.");
look("mars", { plan: "hill", form: "stepped", tree: null, sand: 0xA8603E, pal: { wall: [0xA8583A, "plaster"], trim: [0x7A3E2A, "stone"], roof: [0x8A4A32, "plaster"], pave: [0x9A5E44, "sand"], glow: 0xFFD0A0, accent: 0x2A5A6A },
decor: [["rock", 12], ["dune", 6], ["greenhouse", 5], ["solar", 4], ["rover", 3], ["turbine", 2]],
pastime: { n: "The Old River Delta", d: "Dig the fine clay the ancient river laid down, for bricks and for the glassworks.", k: "ow_ma_clay", v: "dig the delta clay", look: "dig" } });
purpose("mars", "The red city terraced into the crater wall. It makes the bricks, air and water that let people live on Mars, and sends ice convoys out across the plains.");
look("mercury", { heart: "flame", plan: "avenue", form: "carved", tree: null, crys: 0xE0C060, pal: { wall: [0x5A5550, "stone"], trim: [0x6A5434, "metal"], pave: [0x5E5A54, "paving"], glow: 0xFFC890 },
decor: [["vent", 8], ["crystal", 6], ["rock", 8]],
pastime: { n: "The Graphite Galleries", d: "Old galleries where the dark graphite of Mercury's crust shows in the walls.", k: "ow_hg_graphite", v: "chip out graphite", look: "dig" } });
purpose("mercury", "A city cut deep into the rock to hide from the furious Sun. Its people farm sunlight on the surface and store it in cells for the whole Solar System.");
look("venus", { plan: "scatter", form: "float", bag: 0xC8A868, tree: null, lamps: false, pal: { pave: [0xA49680, "paving"], wall: [0xE0D4BC, "plaster"], roof: [0xB8963A, "tile"], trim: [0xA89070, "stone"] },
decor: [["cloud", 14], ["airship", 4], ["palm", 6], ["stall", 4], ["fountain", 1]],
pastime: { n: "The Cloud Nets", d: "Great nets hung over the edge catch what drifts up from the surface far below.", k: "ow_ve_salvage", v: "haul in the nets", look: "lookout" } });
purpose("venus", "A city of gasbags and keels riding the clouds where the air is mild. It studies the burning world below and trades what its sample rigs haul up.");
look("pluto", { plan: "ring", form: "carved", tree: null, crys: 0xC8E0FF, pal: { wall: [0xB8C8D4, "snow"], trim: [0x7E92A4, "marble"], pave: [0x7A8894, "paving"] },
decor: [["icespire", 10], ["drift", 8], ["crystal", 4]],
pastime: { n: "The Nitrogen Glacier", d: "Cut blocks from the slow glacier of frozen nitrogen that flows beside the city.", k: "ow_pl_n2", v: "cut nitrogen ice", look: "dig" } });
purpose("pluto", "Halls hollowed out of water-ice mountains at the edge of the Solar System. It mines ices for fuel and air, and keeps the farthest watch in the dark.");
look("jupiter", { plan: "avenue", form: "float", bag: 0xC8845A, tree: null, lamps: false, pal: { wall: [0xD8C8B0, "plaster"], roof: [0xA8643A, "metalroof"] },
decor: [["cloud", 16], ["airship", 5], ["palm", 6], ["stall", 4], ["fountain", 1]],
pastime: { n: "The Skimmer Gantry", d: "A gantry over the edge where the skimmers come in full of hydrogen from the bands.", k: "ow_h2", v: "draw off hydrogen", look: "lookout" } });
purpose("jupiter", "A chain of cloud stations riding Jupiter's bands. It skims hydrogen and helium-3 from the clouds to fuel every ship in the system.");
look("saturn", { plan: "ring", form: "float", bag: 0xE0D8C4, tree: null, lamps: false, pal: { pave: [0xA0927A, "paving"], wall: [0xB8904E, "plaster"], roof: [0x5E4228, "metalroof"], trim: [0x8A6A3A, "stone"], accent: 0x6A2A1E },
decor: [["cloud", 14], ["floatrock", 6], ["airship", 3], ["palm", 6], ["stall", 4], ["fountain", 1]],
pastime: { n: "The Ring-Ice Wharf", d: "Ferries bring blocks of clean ice down from the rings and unload them here.", k: "ow_sa_ringice", v: "take a block of ring ice", look: "pier" } });
purpose("saturn", "A golden city in the clouds under the great rings. It trades ring ice and fuel, and sends shuttles to Titan and Enceladus.");
look("uranus", { plan: "scatter", form: "round", tree: null, lamps: false, pal: { wall: [0xA8C8C4, "marble"], roof: [0x6AA8A8, "tile"], glow: 0xD0F0F0 },
decor: [["cloud", 12]],
pastime: { n: "The Haze Intakes", d: "Intakes that breathe in the blue-green haze and keep its methane.", k: "ow_ur_methane", v: "draw off methane", look: "lookout" } });
purpose("uranus", "A quiet drifting city on a world tipped on its side. It gathers methane and hydrogen, and studies the strangest seasons in the Solar System.");
look("neptune", { plan: "avenue", form: "tower", tree: null, lamps: false, pal: { wall: [0x6E7E9A, "metal"], roof: [0x2E4A7A, "metalroof"], glow: 0xC8DCFF },
decor: [["cloud", 12], ["airship", 2]],
pastime: { n: "The Storm Watch", d: "Weather balloons sent into the great storms come back here, full of readings.", k: "ow_ne_storm", v: "recover a balloon", look: "lookout" } });
purpose("neptune", "Storm towers anchored against the fastest winds there are. It forecasts the weather of the outer worlds and fuels the ferries to Triton.");
look("veyar", { plan: "ring", form: "tower", tree: "crystalspire", pal: { accent: 0xA84A7A },
decor: [["crystal", 10], ["spire", 6], ["glowflowers", 6], ["standing", 2]],
pastime: { n: "The Song Garden", d: "Dewbell flowers that ring softly when the wind moves; their dew is gathered at dawn.", k: "ow_vy_dew", v: "gather dewbells", look: "garden" } });
purpose("veyar", "The singing capital of the Veyari, whose towers hum in the wind. It is the meeting place of their clans and the heart of their music and star-lore.");
look("stars", { plan: "hill", form: "round", tree: null, lane: [0x5E6068, "concrete"], env: { groundCol: 0x3E3F44, groundCol2: 0x4E5056, mtn: 0x4A4B52, hemi: 0.42 }, pal: { wall: [0x6E7078, "concrete"], trim: [0x4E5058, "metal"], roof: [0x8A6A3E, "metalroof"], pave: [0x66686E, "paving"], glow: 0xD8E4FF },
decor: [["crater", 8], ["dish", 6], ["rock", 6], ["solar", 3]],
pastime: { n: "The Meteor Field", d: "A field where small meteors have fallen for ages; their iron still lies in the dust.", k: "gr_stars_meteoric", v: "dig for meteoric iron", look: "dig" } });
purpose("stars", "The observatory city on a wandering moon. It maps the stars, trains the navigators and keeps the great telescopes turning.");
look("neverland", { plan: "scatter", form: "tree", tree: "palm", leaf: 0x3E7A3A, lane: [0x9A8762, "sand"], water: 0x3AA8B8, hs: 0.85, pal: { wall: [0xD8C8A0, "wood"], roof: [0x6A5A34, "shingle"] },
decor: [["palm", 14], ["rock", 6], ["pool", 4], ["flowers", 4]],
pastime: { n: "The Oyster Cay", d: "A jetty out over the shallows, where the oysters sometimes hold a pearl.", k: "hx_pearl", v: "dive for a pearl", look: "pier" } });
purpose("neverland", "The island capital of flight, built up the cliffs and into the treetops. It teaches flying, keeps the lagoon and the reef, and never quite grows up.");
look("sea", { plan: "ring", form: "block", under: "sea", tree: null, pal: { wall: [0xE0DCD0, "plaster"], roof: [0x3A6A9A, "tile"], trim: [0xA89A80, "stone"], accent: 0x2A5A8A, pave: [0x8C8474, "paving"] },
decor: [["boat", 14], ["stall", 4], ["well", 2]],
pastime: { n: "The Long Pier", d: "The fishing pier where anyone may cast a line.", k: "hx_fish", v: "cast a line", look: "pier" } });
purpose("sea", "The harbour city of the Endless Sea, a ring of isles joined by bridges. It builds ships, salts fish and trades with every port on the water.");
look("northpole", { plan: "ring", form: "timber", snow: true, tree: "pine", lane: [0xC8CED4, "snow"], lamp: 0xF0B060, pal: { wall: [0x8A3A30, "wood"], roof: [0x3A4A3A, "shingle"], glow: 0xFFD898 },
decor: [["pine", 16], ["drift", 10], ["lantern", 10]],
pastime: { n: "The Toymakers' Woodlot", d: "A ring of pines kept for the workshops; fallen wood is free to take.", k: "gr_northpole_toywood", v: "gather toy-wood", look: "grove", groveKit: "pine" } });
purpose("northpole", "The hidden capital of the North, all workshops and lantern-lit halls. It makes toys, bells and candles all year for one night of giving.");
look("battle", { plan: "avenue", form: "fortress", tree: null, pal: { accent: 0x8A2A1A },
decor: [["banner", 10], ["trebuchet", 3], ["cannon", 4], ["rock", 6], ["scrap", 4]],
pastime: { n: "The Flint Beds", d: "A bed of hard flint where the armourers send their apprentices.", k: "gr_battle_flint", v: "knap flint", look: "dig" } });
purpose("battle", "The war capital of Ironfray. It trains fighters, forges arms and armour, and runs the battlefields and their bounties.");
look("greenwold", { heart: "fountain", plan: "scatter", form: "timber", tree: "tree", lane: [0x7A6A52, "earth"], hs: 0.85,
decor: [["orchard", 5], ["hay", 5], ["windmill", 2], ["flowers", 6], ["hedge", 6], ["stall", 4], ["scarecrow", 3]],
pastime: { n: "The Meadow Hives", d: "Hives at the edge of the hay meadow; the bees are gentle and the comb is sweet.", k: "gr_greenwold_honeycomb", v: "take a comb of honey", look: "garden" } });
purpose("greenwold", "The market town of the Greenwold. It feeds the realm: grain, wool, honey and fruit are grown here and sold in its squares.");
look("underworld", { plan: "hill", form: "carved", tree: null, crys: 0xC84A5A, water: 0x1A2A3A, lamp: 0xF0A050,
decor: [["crystal", 8], ["lantern", 8], ["rock", 6], ["pool", 2]],
pastime: { n: "The Pomegranate Grove", d: "Lamplit trees that bear fruit with no sun at all.", k: "gr_underworld_pomegranate", v: "pick a pomegranate", look: "grove", groveKit: "tree" } });
purpose("underworld", "The warm city of riches beneath the earth. Its people mine silver and garnet, and keep the lamps lit along the slow dark river.");
look("heavens", { plan: "avenue", form: "pagoda", tree: null, lamps: false, pal: { pave: [0x9A9080, "paving"] },
decor: [["cloud", 16], ["floatrock", 6]],
pastime: { n: "The Sky-Bee Terraces", d: "Terraces of flowers where the sky-bees make their golden honey.", k: "gr_heavens_honey", v: "take sky-honey", look: "garden" } });
purpose("heavens", "The Morning Court's city in the clouds. It keeps the calendar of dawns, teaches music and letters, and welcomes every traveller with tea.");
look("depths", { plan: "scatter", form: "pod", tree: null, water: 0x2A5A6A, pal: { wall: [0xC89A8A, "plaster"], roof: [0xD8B8A0, "tile"], trim: [0x9A6A5A, "stone"] },
decor: [["coral", 14], ["kelp", 12], ["clam", 6], ["rock", 4]],
pastime: { n: "The Giant Clam Beds", d: "A bed of giant clams; now and then one opens on a pearl.", k: "gr_depths_pearl", v: "look for a pearl", look: "board" } });
purpose("depths", "The domed city of the merfolk under the sea. It tends the kelp farms and the vents, and guards the deep against harm.");
look("faerie", { plan: "ring", form: "tree", tree: "giantmushroom", leaf: 0x4A6A3A, lane: [0x5A6A3A, "grass"], hs: 0.85,
decor: [["mushroom", 14], ["glowflowers", 10], ["hedge", 6], ["standing", 1]],
pastime: { n: "The Moonstone Ring", d: "A ring of standing stones where moonstone shows after dark.", k: "gr_faerie_moonstone", v: "look for moonstone", look: "shrine" } });
purpose("faerie", "The twilight city of the fae, grown from great trees and toadstools. It holds the courts of summer and winter, and the bargains are always kept.");
look("void", { plan: "scatter", form: "tower", tree: null, lamps: false,
decor: [["floatrock", 14]],
pastime: { n: "The Shard Drift", d: "Crystal shards drift slowly past the edge of the isles here.", k: "gr_void_shard", v: "catch a drifting shard", look: "lookout" } });
purpose("void", "A quiet crystal city adrift in the dark between everything. It is a place of rest, study and stillness, and a lighthouse for lost dreamers.");
look("mirror", { plan: "avenue", form: "twin", under: "silver", tree: null, pal: { pave: [0x86888C, "paving"] },
decor: [["mirror", 8]],
pastime: { n: "The Silver Shore", d: "A pale shore where the white glass sand is fine enough for the best mirrors.", k: "gr_mirror_sand", v: "gather glass sand", look: "pier" } });
purpose("mirror", "The twin city on silver islands above its own reflection. It makes glass and mirrors, and studies how every choice has another side.");
look("dead", { plan: "scatter", form: "crypt", tree: "deadtree", lamp: 0xF0B060, hs: 0.9,
decor: [["lantern", 18], ["marigold", 10], ["deadtree", 6]],
pastime: { n: "The Marigold Fields", d: "Fields of marigolds grown to light the way home for the remembered.", k: "gr_dead_marigold", v: "pick marigolds", look: "garden" } });
purpose("dead", "The gentle city of lanterns, where everyone who is remembered has a light. It keeps the records of the remembered and helps the living say goodbye.");
look("frozen", { plan: "ring", form: "round", tree: "pine", pal: { wall: [0x9AAEC0, "marble"], roof: [0x8AA0B4, "snow"] },
decor: [["icespire", 10], ["drift", 10], ["pine", 6]],
pastime: { n: "The Char Holes", d: "Holes cut in the lake ice, where the char rise to a line.", k: "gr_frozen_char", v: "fish through the ice", look: "dig" } });
purpose("frozen", "The city of the Long Winter, carved from blue ice. It herds the great woolly beasts, cuts ice and keeps the stories of the dark months.");
look("elsewhere", { plan: "scatter", form: "shell", tree: null, crys: 0x6AD8C8,
decor: [["crystal", 8], ["reeds", 8], ["spire", 4], ["mushroom", 4]],
pastime: { n: "The Breath-Moss Beds", d: "Soft beds of moss that make the air sweet to breathe.", k: "gr_elsewhere_airmoss", v: "gather breath-moss", look: "garden" } });
purpose("elsewhere", "The native city of Another World, its spiral towers grown from coral-glass. It welcomes visitors from other worlds and trades in strange seeds and crystals.");
look("fire", { plan: "avenue", form: "stepped", tree: null, sand: 0x5A4236, pal: { wall: [0x5E4E44, "stone"], trim: [0x4E3E36, "stone"], pave: [0x5A4A42, "paving"] },
decor: [["lava", 10], ["vent", 8], ["rock", 8]],
pastime: { n: "The Obsidian Flow", d: "An old lava flow cooled to black glass, sharp and bright.", k: "gr_fire_obsidian", v: "break off obsidian", look: "dig" } });
purpose("fire", "The forge-city inside a sleeping volcano. Its smiths work with the mountain's own heat and make the finest blades and glass anywhere.");
look("wasteland", { plan: "avenue", form: "salvage", tree: "deadtree", water: 0x4A7A8A, pal: { wall: [0x6A5A48, "concrete"], trim: [0x5A4E40, "wood"], roof: [0x7A6E60, "metalroof"] },
decor: [["rustcar", 8], ["scrap", 8], ["turbine", 3], ["waterwheel", 2], ["flowers", 4]],
pastime: { n: "The Dam Gardens", d: "Green gardens watered from the old dam, where the seed plants grow.", k: "gr_wasteland_seed", v: "gather seeds", look: "garden" } });
purpose("wasteland", "The city rebuilt round an old dam where the water runs clean again. It salvages the old world, grows new gardens and shares its water.");
look("desert", { plan: "ring", form: "stepped", tree: "palm", water: 0x3A8A9A, pal: { pave: [0xB0966C, "sand"] },
decor: [["palm", 16], ["dune", 8], ["tentkit", 5], ["stall", 5], ["well", 4]],
pastime: { n: "The Date Groves", d: "Groves of date palms round the seventh well.", k: "gr_desert_dates", v: "gather dates", look: "grove", groveKit: "palm" } });
purpose("desert", "The oasis city round seven wells. Caravans meet here to trade salt, saffron and turquoise, and the wells are shared by law.");
look("future", { heart: "fountain", plan: "ring", form: "tower", tree: "tree", hs: 1.15,
decor: [["planter", 12], ["tram", 3], ["tree", 8]],
pastime: { n: "The Sky Farm", d: "Trays of greens grown on the terraces, picked fresh every day.", k: "gr_future_greens", v: "pick greens", look: "garden" } });
purpose("future", "The green heart of the City to Come. It grows its food in its towers, recycles everything and runs on clean power.");
})();
var GR_OFF = ["hall", "family", "aurora", "ares", "orbital", "mall", "underground", "casino", "space"];
(function () {
var set = function (id, o) { var R = GR.realms[id]; if (!R)
return; R.gate = R.gate || {}; Object.keys(o).forEach(function (k) { R.gate[k] = o[k]; }); };
set("aurora", { s: 0.5 });
set("ares", { s: 0.5 });
set("casino", { s: 0.5 });
set("family", { s: 0.5 });
set("sea", { at: [70, -110, -Math.PI / 2], y: 0.3, isle: true, reach: 34 });
set("space", { reach: 40 });
set("neverland", { minY: 0.6, rMax: 400 });
GR_OFF.forEach(function (id) { var R = GR.realms[id]; if (R)
R.off = true; });
})();
var GR_ROCKG = {};
function grRockGeo(seed, own) { return __ZC(333, 142, this, arguments, new.target); }
function grArrivalCourt(G, P, R, S) { return __ZC(333, 143, this, arguments, new.target); }
(function () {
if (typeof grDecorate !== "function")
return;
var d0 = grDecorate;
grDecorate = function (G, P, R, S) { var r = d0.apply(this, arguments); try {
grArrivalCourt(G, P, R, S);
}
catch (e) {
if (window.console)
console.warn("[grand] arrival court", e);
} return r; };
})();
var GRQ = { homes: [] };
function grqLeaf(R) {
var L = grLook(R), E = R.env || {};
if (L.leaf)
return L.leaf;
if (E.groundTex === "grass")
return new THREE.Color(E.groundCol || 0x4A6A34).multiplyScalar(0.95).getHex();
return { crystal: 0x6A6AA8, bone: 0x4A5A44, fire: 0x5A5A30, ice: 0x3E5A4A, coral: 0x3E7A6A, desert: 0x5A7A34 }[R.style] || 0x4A7034;
}
function grqFree(x, z, r, y) { return __ZC(333, 144, this, arguments, new.target); }
function grqPatch(P, x, z, w, d, col, tx, ry, y) {
var m = grBox(P, w, 0.06, d, col, tx, x, (y || 0) + 0.04, z, ry || 0);
if (typeof GR_PAVED !== "undefined") {
var e = Math.hypot(w, d) / 2;
GR_PAVED.push({ x: x, z: z, r: e });
}
return m;
}
function grqBed(P, x, z, w, d, ry, kind, leaf, rnd, edge, y) { return __ZC(333, 145, this, arguments, new.target); }
function grqPlanter(P, S, x, z, leaf, rnd, y, cone) { return __ZC(333, 146, this, arguments, new.target); }
function grqHedge(P, x, z, len, ry, leaf, y, h) {
var y0 = y || 0, hh = h || 0.9, m = grBox(P, len, hh, 0.7, new THREE.Color(leaf).multiplyScalar(0.78).getHex(), "grass", x, y0 + hh / 2, z, ry || 0);
GR.solids.push({ x: x, z: z, hw: len / 2 + 0.1, hd: 0.45, rot: ry || 0, h: y0 + hh });
return m;
}
function grqBench(P, x, z, ry, y) { var b = grKit(P, "bench", x, y || 0, z, ry, 1); if (b) {
GR.solids.push({ x: x, z: z, hw: 1.0, hd: 0.45, rot: ry, h: (y || 0) + 1 });
GR.taken.push({ x: x, z: z, r: 1.2 });
} return b; }
function grqBarrel(P, x, z, y) {
if (!grFurn(P, "barrel", x, y || 0, z, 0)) {
grCyl(P, 0.42, 0.38, 1.1, 0x6A4A2E, "wood", x, (y || 0) + 0.55, z, 10);
[0.2, 0.9].forEach(function (h) { grCyl(P, 0.44, 0.44, 0.07, 0x3A3A3A, "metal", x, (y || 0) + h, z, 10); });
}
GR.solids.push({ x: x, z: z, r: 0.5, h: (y || 0) + 1.2 });
}
function grqCrate(P, x, z, ry, s, y, col) {
var c = s || 1;
grBox(P, 1 * c, 0.9 * c, 1 * c, col || 0x8A6A44, "wood", x, (y || 0) + 0.45 * c, z, ry || 0);
grBox(P, 1.04 * c, 0.12 * c, 1.04 * c, new THREE.Color(col || 0x8A6A44).multiplyScalar(0.7).getHex(), "wood", x, (y || 0) + 0.85 * c, z, ry || 0);
GR.solids.push({ x: x, z: z, r: 0.6 * c, h: (y || 0) + c });
}
function grqSacks(P, x, z, rnd) { for (var i = 0; i < 3; i++) {
var s = grSph(P, 0.42, 0xB8A07A, null, x + (i - 1) * 0.6, 0.32, z + (rnd() - 0.5) * 0.3, 8);
s.scale.set(1, 0.75, 0.8);
} grSph(P, 0.4, 0xA8906A, null, x, 0.85, z, 8).scale.set(1, 0.7, 0.8); GR.solids.push({ x: x, z: z, r: 1.1, h: 1.2 }); }
function grqCart(P, x, z, ry, rnd, load) { return __ZC(333, 147, this, arguments, new.target); }
function grqContainer(P, S, x, z, ry, col) {
grBox(P, 2.4, 2.5, 5.8, col, "metal", x, 1.25, z, ry);
for (var i = -2; i <= 2; i++)
grBox(P, 2.46, 2.3, 0.08, new THREE.Color(col).multiplyScalar(0.8).getHex(), "metal", x + Math.cos(ry) * 0 + Math.sin(ry) * i * 1.1, 1.25, z + Math.cos(ry) * i * 1.1, ry);
GR.solids.push({ x: x, z: z, hw: 1.3, hd: 3, rot: ry, h: 2.6 });
}
function grqBottles(P, x, z, ry, col) { return __ZC(333, 148, this, arguments, new.target); }
function grqWash(P, x0, z0, x1, z1, rnd) { return __ZC(333, 149, this, arguments, new.target); }
function grqPerson(G, R, i, x, z, ry, t, who, y) {
var names = R.names || ["Ash", "Briar", "Cole", "Dara"], sur = R.surnames || null;
var p = grPersonAt(G, R, { n: names[(i * 13 + 7) % names.length] + (sur ? " " + sur[(i * 5 + 9) % sur.length] : ""), t: t, who: who }, x, z, ry, true);
if (y !== undefined && p && p.g)
p.g.position.y = y;
GR.solids.push({ x: x, z: z, r: 0.35 });
return p;
}
var GRQ_SETS = {
classical: ["court", "green", "stalls", "yard", "court"], gothic: ["court", "yard", "green", "stalls"], dwarf: ["yard", "stalls", "court", "yard"],
timber: ["green", "plot", "yard", "stalls", "court"], crystal: ["court", "green", "stalls", "court"], station: ["court", "depot", "plot", "court", "stalls"],
ice: ["court", "yard", "stalls", "court"], desert: ["court", "stalls", "yard", "court"], coral: ["court", "stalls", "green", "court"], fae: ["green", "plot", "stalls", "green"],
bone: ["court", "plot", "stalls", "court"], future: ["court", "green", "depot", "stalls"], eastern: ["court", "green", "stalls", "court"], fire: ["yard", "stalls", "court", "depot"]
};
function grqCentre(P, R, S, x, z, rnd) { return __ZC(333, 150, this, arguments, new.target); }
var GRQ_MAKE = {
court: function (G, P, R, S, x, z, ry, rnd, ctx) { return __ZC(333, 151, this, arguments, new.target); },
green: function (G, P, R, S, x, z, ry, rnd, ctx) { return __ZC(333, 152, this, arguments, new.target); },
yard: function (G, P, R, S, x, z, ry, rnd, ctx) { return __ZC(333, 153, this, arguments, new.target); },
depot: function (G, P, R, S, x, z, ry, rnd, ctx) { return __ZC(333, 154, this, arguments, new.target); },
plot: function (G, P, R, S, x, z, ry, rnd, ctx) { return __ZC(333, 155, this, arguments, new.target); },
stalls: function (G, P, R, S, x, z, ry, rnd, ctx) { return __ZC(333, 156, this, arguments, new.target); }
};
var GRQ_TOUCH = {
pod: function (P, R, S, x, z, rnd) {
grCyl(P, 2.2, 2.3, 0.4, S.trim[0], "metal", x, 0.2, z, 16);
grDome(P, 2, 0xC8E0E8, null, x, 0.4, z, 16, { op: 0.32 });
for (var i = 0; i < 5; i++)
grLeafClump(P, 0.4, 0x4E8A3A, x + (rnd() - 0.5) * 2, 0.75, z + (rnd() - 0.5) * 2, grHash("pod" + x + i), true);
return 2.4;
},
tank: function (P, R, S, x, z) { grCyl(P, 1.1, 1.1, 2.6, 0xB8B0A4, "metal", x, 1.5, z, 14); grDome(P, 1.1, 0xB8B0A4, "metal", x, 2.8, z, 14); [0, 2.1, 4.2].forEach(function (a) { grCyl(P, 0.08, 0.08, 0.4, 0x5A5E64, "metal", x + Math.cos(a) * 0.9, 0.2, z + Math.sin(a) * 0.9, 5); }); grCyl(P, 0.1, 0.1, 1.2, 0x8A919C, "metal", x + 1.2, 0.6, z, 6); return 1.4; },
cells: function (P, R, S, x, z) { for (var i = 0; i < 3; i++) {
grBox(P, 0.9, 1.4, 0.9, 0x4A4640, "metal", x + (i - 1) * 1.1, 0.7, z);
grBox(P, 0.5, 0.12, 0.02, 0xE0B050, null, x + (i - 1) * 1.1, 1.1, z + 0.46, 0, { glow: true });
} return 1.8; },
balloon: function (P, R, S, x, z, rnd) {
grCyl(P, 0.14, 0.18, 2.4, 0x5A3E26, "wood", x, 1.2, z, 6);
var b = grSph(P, 1.1, (grLook(R).bag) || S.accent, null, x + 0.4, 6.8, z, 12);
b.scale.set(1, 1.25, 1);
grCyl(P, 0.02, 0.02, 4.4, 0x3A3A3A, null, x + 0.2, 4.4, z, 3).rotation.z = -0.09;
grBox(P, 0.5, 0.4, 0.5, 0x6A4A2E, "wood", x + 0.4, 5.4, z);
return 0.8;
},
gifts: function (P, R, S, x, z, rnd) {
var cs = [0xA82A2A, 0x2A6A3A, 0xE8D8B0, 0x2A4A8A];
for (var i = 0; i < 5; i++) {
var s = 0.5 + rnd() * 0.4, gx = x + (rnd() - 0.5) * 1.6, gz = z + (rnd() - 0.5) * 1.6, c = cs[i % 4];
grBox(P, s, s, s, c, null, gx, s / 2 + (i > 3 ? 0.6 : 0), gz, rnd());
grBox(P, s + 0.02, s + 0.02, 0.08, 0xE8C04A, null, gx, s / 2 + (i > 3 ? 0.6 : 0), gz, 0);
}
return 1.4;
},
ice: function (P, R, S, x, z, rnd) { grBox(P, 1.4, 0.5, 1.4, S.trim[0], S.trim[1], x, 0.25, z); for (var i = 0; i < 3; i++) {
var h = 1.2 + rnd() * 1.6, m = grCyl(P, 0.1, 0.5, h, 0xC8E0F0, null, x + (rnd() - 0.5) * 0.8, 0.5 + h / 2, z + (rnd() - 0.5) * 0.8, 6, { op: 0.8 });
m.rotation.z = (rnd() - 0.5) * 0.4;
} return 1; },
ring: function (P, R, S, x, z) { grCyl(P, 0.8, 0.9, 0.6, S.trim[0], S.trim[1], x, 0.3, z, 12); var t = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.12, 6, 28), grMat(S.trim[0], "metal")); t.position.set(x, 2.2, z); t.rotation.set(0.5, 0, 0.98); P.add(t); grSph(P, 0.5, 0x9AC8C8, null, x, 2.2, z, 12); return 1; },
orb: function (P, R, S, x, z) { grCyl(P, 0.45, 0.6, 1.1, S.trim[0], S.trim[1], x, 0.55, z, 10); grSph(P, 0.55, S.glow, null, x, 1.7, z, 14, { op: 0.75 }); if (!grLite())
grGlow(P, S.glow, 2.4, 0.16, x, 1.7, z); return 0.7; },
chimes: function (P, R, S, x, z) {
[-1, 1].forEach(function (sd) { grCyl(P, 0.07, 0.08, 2.8, S.trim[0], "metal", x + sd, 1.4, z, 6); });
grBox(P, 2.2, 0.08, 0.08, S.trim[0], "metal", x, 2.8, z);
for (var i = 0; i < 6; i++) {
var h = 0.5 + i * 0.12;
grCyl(P, 0.03, 0.03, h, 0xD8D0E8, "metal", x - 0.75 + i * 0.3, 2.75 - h / 2, z, 5);
}
return 1.2;
},
kiosk: function (P, R, S, x, z) { grBox(P, 1.2, 2.2, 0.3, S.trim[0], "metal", x, 1.1, z); grBox(P, 1, 1.3, 0.02, 0x2A3A4A, null, x, 1.4, z + 0.16); grBox(P, 0.9, 0.12, 0.02, S.glow, null, x, 1.95, z + 0.17, 0, { glow: true }); return 0.8; },
hammock: function (P, R, S, x, z) { [-1.6, 1.6].forEach(function (u) { grCyl(P, 0.1, 0.12, 2.2, 0x5A3E26, "wood", x + u, 1.1, z, 6); }); var h = grBox(P, 2.8, 0.06, 0.9, 0xD8C8A0, null, x, 1.1, z); return 1.8; },
nets: function (P, R, S, x, z, rnd) {
[-1, 1].forEach(function (sd) { grCyl(P, 0.07, 0.08, 2.4, 0x5A3E26, "wood", x + sd * 1.2, 1.2, z, 6); });
grBox(P, 2.4, 1.6, 0.03, 0x8A7A5A, null, x, 1.4, z, 0, { op: 0.55, ds: true });
for (var i = 0; i < 3; i++) {
var c = grCyl(P, 0.35, 0.4, 0.6, 0x7A5A3A, "wood", x - 0.8 + i * 0.8, 0.3, z + 0.9, 8);
}
return 1.6;
},
racks: function (P, R, S, x, z) { grKit(P, "weaponrack", x, 0, z, 0, 1); grKit(P, "shield", x + 1.4, 0, z, 0, 0.8); return 1.6; },
hives: function (P, R, S, x, z) { for (var i = 0; i < 3; i++) {
var hx = x + (i - 1) * 1.1;
grBox(P, 0.7, 0.5, 0.7, 0x5A4A3A, "wood", hx, 0.25, z);
for (var k = 0; k < 3; k++)
grBox(P, 0.62, 0.24, 0.62, k % 2 ? 0xE8DCC0 : 0xD8C8A0, "wood", hx, 0.62 + k * 0.25, z);
grBox(P, 0.78, 0.08, 0.78, 0x6A5A44, "wood", hx, 1.39, z);
} return 1.8; },
swing: function (P, R, S, x, z) { return __ZC(333, 157, this, arguments, new.target); },
lantern: function (P, R, S, x, z) { return __ZC(333, 158, this, arguments, new.target); },
marigold: function (P, R, S, x, z, rnd) { GR_DECOR.marigold(P, R, S, x, z, rnd); GR_DECOR.lantern(P, R, S, x + 2.4, z, rnd); return 2.6; },
shell: function (P, R, S, x, z) { var c = grCone(P, 0.7, 2.6, 0xE8D0C0, null, x, 1.3, z, 7); c.rotation.z = 0.2; grCone(P, 0.5, 1.4, 0xD8B8A8, null, x + 0.4, 0.6, z, 7).rotation.z = -1.2; return 1; },
telescope: function (P, R, S, x, z) {
[0, 2.1, 4.2].forEach(function (a) { var l = grCyl(P, 0.04, 0.04, 1.6, 0x3A3A3A, "metal", x + Math.cos(a) * 0.35, 0.75, z + Math.sin(a) * 0.35, 4); l.rotation.set(Math.sin(a) * 0.25, 0, -Math.cos(a) * 0.25); });
var t = grCyl(P, 0.14, 0.2, 1.8, 0xB8A070, "metal", x, 1.8, z, 10);
t.rotation.x = -0.8;
return 0.9;
},
rugs: function (P, R, S, x, z) {
[-1, 1].forEach(function (sd) { grCyl(P, 0.06, 0.07, 2.4, 0x5A3E26, "wood", x + sd * 1.4, 1.2, z, 6); });
grBox(P, 3, 0.06, 0.06, 0x5A3E26, "wood", x, 2.35, z);
[0xA83A2A, 0x2A5A8A, 0xC8A04A].forEach(function (c, i) { grBox(P, 0.85, 1.7, 0.02, c, null, x - 0.95 + i * 0.95, 1.45, z + 0.02 * i, 0, { ds: true }); });
return 1.6;
},
scrap: function (P, R, S, x, z, rnd) { GR_DECOR.scrap(P, R, S, x, z, rnd); return 2.4; },
clam: function (P, R, S, x, z, rnd) { GR_DECOR.clam(P, R, S, x, z, rnd); return 2; },
mirror: function (P, R, S, x, z, rnd) { grBox(P, 1.6, 2.4, 0.15, 0x9AA2AE, null, x, 1.6, z, 0, { glow: true }); grBox(P, 1.9, 0.3, 0.6, S.trim[0], S.trim[1], x, 0.15, z); return 1.1; },
cart: function (P, R, S, x, z, rnd) { grFurn(P, "minecart", x, 0, z, 0) || grqCrate(P, x, z, 0, 1); return 1.2; },
toadstool: function (P, R, S, x, z, rnd) { grKit(P, "giantmushroom", x, 0, z, rnd() * 6, 0.28); return 1.2; },
quench: function (P, R, S, x, z) { grFurn(P, "anvil", x, 0, z, 0); grqBarrel(P, x + 1.2, z); return 1.6; }
};
var GRQ_TOUCHES = { moon: ["pod", "kiosk"], mars: ["tank", "pod"], mercury: ["cells", "kiosk"], venus: ["balloon"], jupiter: ["balloon", "tank"], saturn: ["balloon", "ring"], uranus: ["ring", "orb"],
neptune: ["orb", "kiosk"], veyar: ["chimes"], aurora: ["kiosk", "pod"], ares: ["kiosk", "tank"], space: ["kiosk", "orb"], neverland: ["hammock"], sea: ["nets"], northpole: ["gifts"],
casino: ["kiosk"], battle: ["racks"], greenwold: ["hives"], family: ["swing"], underground: ["kiosk", "cart"], mall: ["kiosk"], hall: ["lantern"], underworld: ["cart", "lantern"],
heavens: ["lantern"], depths: ["clam"], faerie: ["toadstool"], void: ["orb"], mirror: ["mirror"], dead: ["marigold"], frozen: ["ice"], elsewhere: ["shell"], fire: ["quench"],
stars: ["telescope"], wasteland: ["scrap"], desert: ["rugs"], orbital: ["kiosk"], future: ["kiosk", "orb"], pluto: ["ice", "kiosk"] };
function grqTouch(P, R, S, x, z, ry, r, rnd, n) { return __ZC(333, 159, this, arguments, new.target); }
function grqQuarters(G, P, R, S) { return __ZC(333, 160, this, arguments, new.target); }
function grqForecourts(G, P, R, S) { return __ZC(333, 161, this, arguments, new.target); }
function grqGardens(G, P, R, S) { return __ZC(333, 162, this, arguments, new.target); }
function grqArena(G, P, R, S) { return __ZC(333, 163, this, arguments, new.target); }
function grqDeep(G, P, R, S) { return __ZC(333, 164, this, arguments, new.target); }
function grqTerrace(G, P, R, S) { return __ZC(333, 165, this, arguments, new.target); }
function grqParcelKind(R, S) { return __ZC(333, 166, this, arguments, new.target); }
function grqParcels(G, P, R, S) { return __ZC(333, 167, this, arguments, new.target); }
function grqGardenIsles(G, P, R, S, ctx) { return __ZC(333, 168, this, arguments, new.target); }
function grqHall(P, I, S, pl, X0, Z0, W, DD, HH, RH) { return __ZC(333, 169, this, arguments, new.target); }
function grqRoom(P, I, R, r, x0, x1, z0, z1) { return __ZC(333, 170, this, arguments, new.target); }
(function () {
var h0 = grHome;
grHome = function (P, R, S, x, z, rot, sc) { var out = h0.apply(this, arguments); GRQ.homes.push({ x: x, z: z, rot: rot || 0, sc: sc || 1, form: S.form }); return out; };
var dh0 = grDressHall;
grDressHall = function (P, I, S, pl, X0, Z0, W, DD, HH, RH, wallT) { var out = dh0.apply(this, arguments); try {
grqHall(P, I, S, pl, X0, Z0, W, DD, HH, RH);
}
catch (e) {
if (window.console)
console.warn("[grand] hall", e);
} return out; };
var fu0 = grFurnish;
grFurnish = function (P, I, R, r, x0, x1, z0, z1, RH) { var out = fu0.apply(this, arguments); try {
grqRoom(P, I, R, r, x0, x1, z0, z1);
}
catch (e) {
if (window.console)
console.warn("[grand] room", e);
} return out; };
var hs0 = grHomes;
grHomes = function (P, R, S) { GRQ.homes = []; return hs0.apply(this, arguments); };
var d0 = grDecorate;
grDecorate = function (G, P, R, S) {
try {
grqParcels(G, P, R, S);
}
catch (e) {
if (window.console)
console.warn("[grand] parcels", e);
}
var r = d0.apply(this, arguments);
[grqForecourts, grqTerrace, grqArena, grqArena2, grqDeep, grqGardens, grqFire, grqRoutes, grqQuarters].forEach(function (f) { try {
f(G, P, R, S);
}
catch (e) {
if (window.console)
console.warn("[grand] quarters", f.name, e);
} });
return r;
};
})();
function grqDoorWay(x, z) { return __ZC(333, 171, this, arguments, new.target); }
function grqRouteOk(x, z, r) { return __ZC(333, 172, this, arguments, new.target); }
function grqRowPiece(P, R, S, x, z, rnd, leaf) { return __ZC(333, 173, this, arguments, new.target); }
function grqRoutes(G, P, R, S) { return __ZC(333, 174, this, arguments, new.target); }
function grqArena2(G, P, R, S) { return __ZC(333, 175, this, arguments, new.target); }
function grqBrazier(P, x, z) { return __ZC(333, 176, this, arguments, new.target); }
function grqFire(G, P, R, S) { return __ZC(333, 177, this, arguments, new.target); }
function grqPot(P, x, y, z, s) { return __ZC(333, 178, this, arguments, new.target); }
(function () {
var f0 = grFurn;
grFurn = function (P, name, x, y, z, ry, s) { if (name === "plant" && GR.inside !== undefined)
return grqPot(P, x, y, z, (s || 1) * 1.15); return f0.apply(this, arguments); };
})();
