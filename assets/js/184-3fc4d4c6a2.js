/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var DL = { busy: false, at: 0, snowGround: false };
var DL_BOATS = ["boat", "fishingboat", "rowboat", "canoe", "raft", "yacht", "dinghy", "kayak", "ship", "sailboat", "gondola"];
var DL_WATERS = ["water", "lake", "sea", "ocean", "pond"];
var DL_FENCES = ["fence", "picketfence", "stonewall", "hedge", "railings", "railing", "wall", "castlewall", "palisade"];
var DL_NODOOR = { cave: 1, igloo: 1, grotto: 1, cavern: 1 };
function dlLow(t) { return " " + String(t || "").toLowerCase().replace(/[^a-z'\s.,!?;-]/g, " ").replace(/\s+/g, " ") + " "; }
function dlSentences(t) { return String(t || "").split(/[.!?;\n]+/).map(dlLow).filter(function (s) { return s.trim().length > 2; }); }
function dlHere(o) { return o && !o.city && !o.hub && (o.realm || 0) === (store.here || 0); }
function dlKit(a) { return typeof KIT !== "undefined" && KIT[a]; }
function dlMe() {
if (typeof walkMode !== "undefined" && walkMode && typeof camera !== "undefined")
return { x: camera.position.x, z: camera.position.z };
if (typeof orb !== "undefined" && orb)
return { x: orb.tx, z: orb.tz };
return { x: 0, z: 0 };
}
function dlNew(arch, x, z, attrs, extra) { return __ZC(184, 0, this, arguments, new.target); }
function dlFind(list, pred) {
var objs = store.objects || [], best = null;
for (var i = objs.length - 1; i >= 0; i--) {
var o = objs[i];
if (!dlHere(o) || o.filler && !o.dlMade)
continue;
if (list.indexOf(o.archetype) > -1 || (pred && pred(o))) {
best = o;
break;
}
}
return best;
}
function dlLabelHas(o, re) { return re.test(String(o.label || o.name || "").toLowerCase()); }
function dlStand(x, feet, z, faceX, faceZ) { return __ZC(184, 1, this, arguments, new.target); }
function dlApplyStand() { return __ZC(184, 2, this, arguments, new.target); }
(function () {
if (typeof setWalk !== "function")
return;
var sw = setWalk;
setWalk = function (on) {
var r = sw.apply(this, arguments);
if (on && DL.stand && !store.inside)
dlApplyStand();
return r;
};
})();
(function () {
if (typeof surfaceList !== "function")
return;
var sl = surfaceList;
surfaceList = function () {
var fresh = !(surfAt > 0 && performance.now() - surfAt < 500);
var L = sl.apply(this, arguments);
if (!fresh)
return L;
try {
var lifted = {};
store.objects.forEach(function (o) { if (o.y && dlHere(o))
lifted[o.archetype + "@" + Math.round(o.x) + "," + Math.round(o.z)] = o.y; });
L.forEach(function (w) { var y = lifted[w.kind + "@" + Math.round(w.x) + "," + Math.round(w.z)]; if (y)
w.b = (w.b || 0) + y; });
store.objects.forEach(function (o) {
if (!dlHere(o) || !o.dlDeck)
return;
var g = meshes[o.id];
if (!g)
return;
L.push({ x: g.position.x, z: g.position.z, rot: g.rotation.y || 0, hw: o.dlDeck.hw, hd: o.dlDeck.hd, top: 0, s: 1, kind: "dldeck", b: o.dlDeck.y });
});
}
catch (e) { }
return L;
};
})();
var DL_BOAT_RE = /\b(?:i|we)\b[^.]*?\b(?:on|in|aboard|onboard|inside|into|rowing|sailing|sailed|rowed|paddled|paddling|steered|rode|riding|took|fishing from|steering)\s+(?:a|an|the|my|our|his|her|their|this|that)?\s*(?:[a-z'-]+\s+){0,3}?(boat|fishing boat|rowboat|rowing boat|canoe|raft|yacht|dinghy|kayak|ship|sailboat|sailing boat|gondola|skiff|trawler)\b/;
var DL_WATER_RE = /\b(deep water|deep sea|open sea|the sea|the ocean|an ocean|a sea|ocean|sea|lake|a river|the river|water|waves|bay|harbour|harbor)\b/;
function dlBoat(sent) { return __ZC(184, 3, this, arguments, new.target); }
function dlBoatKeep() {
store.objects.forEach(function (o) {
if (!o.dlAt || !dlHere(o))
return;
if (Math.abs(o.x - o.dlAt.x) < 0.5 && Math.abs(o.z - o.dlAt.z) < 0.5 && (o.y || 0) === o.dlAt.y)
return;
o.x = o.dlAt.x;
o.z = o.dlAt.z;
o.y = o.dlAt.y;
if (typeof refresh === "function")
refresh(o);
});
}
setInterval(function () { try {
if (store && store.objects && !(typeof walkMode !== "undefined" && walkMode && store.inside))
dlBoatKeep();
}
catch (e) { } }, 1500);
function dlOnDeck(x, z) { return __ZC(184, 4, this, arguments, new.target); }
(function () {
if (typeof pwWaterAt !== "function")
return;
var pw = pwWaterAt;
pwWaterAt = function (x, z) { try {
if (dlOnDeck(x, z))
return null;
}
catch (e) { } return pw.apply(this, arguments); };
})();
function dlDeckSpot(g, waterY, axis) { return __ZC(184, 5, this, arguments, new.target); }
function dlDeckHeight(g, gy) {
var b = new THREE.Box3().setFromObject(g), sp = dlDeckSpot(g, b.min.y);
return sp ? sp.y : gy + 0.55;
}
var DL_ROUND_RE = /\b(?:([a-z'-]+)\s+)?(picket fence|fence|fences|stone wall|walls?|hedges?|railings?|palisade)\s+(?:all\s+|running\s+|that ran\s+|going\s+)?(?:around|round|surrounding|encircling|enclosing|circling)\s+(?:a|an|the|my|our|his|her|their|this|that)?\s*((?:[a-z'-]+\s*){1,3})/;
var DL_ROUND_RE2 = /\b(?:a|an|the|my)?\s*((?:[a-z'-]+\s*){1,3}?)\s+(?:was|were|stood|sat)?\s*(?:surrounded|enclosed|fenced|ringed|circled)\s+(?:in\s+|by\s+|with\s+)(?:a|an)?\s*(?:[a-z'-]+\s+)?(picket fence|fence|stone wall|wall|hedge|railings?)\b/;
function dlFenceArch(word) {
if (/hedge/.test(word) && dlKit("hedge"))
return "hedge";
if (/stone wall|wall/.test(word) && dlKit("stonewall"))
return "stonewall";
return dlKit("fence") ? "fence" : null;
}
function dlTargetFor(words) { return __ZC(184, 6, this, arguments, new.target); }
function dlFence(sent) { return __ZC(184, 7, this, arguments, new.target); }
var DL_SKY_RE = /\b(floating|flying|hovering|levitating|airborne|sky|cloud)\s+(city|town|castle|palace|village|island|kingdom|fortress|citadel|temple)\b|\b(city|town|castle|palace|village|kingdom|fortress|citadel|temple)\s+(?:that\s+|which\s+)?(?:was\s+)?(?:floating|floated|hovering|hovered|held up|up in the (?:air|sky|clouds)|in the (?:sky|clouds|air)|above the clouds|high in the (?:air|sky))\b/;
var DL_SKY_Y = 70;
function dlSky(sent) { return __ZC(184, 8, this, arguments, new.target); }
function dlSkyKeep() { return __ZC(184, 9, this, arguments, new.target); }
function dlLiftStreets(cx, cz, R) { return __ZC(184, 10, this, arguments, new.target); }
(function () {
if (typeof exitInterior !== "function")
return;
var ex = exitInterior;
exitInterior = function () {
var spec = INT && INT.spec;
var r = ex.apply(this, arguments);
try {
if (spec && spec.y && typeof camera !== "undefined") {
camera.position.y += spec.y;
if (typeof flyY !== "undefined")
flyY = spec.y;
}
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof dbDoorHang !== "function")
return;
var dh = dbDoorHang;
dbDoorHang = function (g, spec) {
var r = dh.apply(this, arguments);
try {
if (spec && DL_NODOOR[spec.archetype] && g && g.userData.dbDoorObj) {
g.remove(g.userData.dbDoorObj);
g.userData.dbDoorObj = null;
}
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof build !== "function")
return;
var b = build;
build = function (spec) {
var g = b.apply(this, arguments);
try {
if (spec && spec.dlSkyRock && g) {
var disc = null;
g.traverse(function (m) { if (m.isMesh && m.geometry && m.geometry.type === "CylinderGeometry" && m.geometry.parameters.radiusTop > 5)
disc = m; });
if (disc)
g.traverse(function (m) { if (m.isMesh && m !== disc && m.position.y > disc.position.y + 0.5)
m.visible = false; });
if (disc && disc.material) {
disc.material = disc.material.clone();
disc.material.color.setHex(0x6E8E52);
}
}
if (spec && spec.archetype === "igloo" && g && g.isGroup && !g.userData.dlMouth) {
var bb = new THREE.Box3().setFromObject(g);
if (bb.isEmpty())
return g;
g.updateMatrixWorld(true);
var inv = g.matrixWorld.clone().invert();
var lo = bb.min.clone().applyMatrix4(inv), hi = bb.max.clone().applyMatrix4(inv);
var W = Math.abs(hi.x - lo.x), front = Math.max(lo.z, hi.z), H = Math.abs(hi.y - lo.y);
var snow = new THREE.MeshLambertMaterial({ color: 0xEEF4FA }), dark = new THREE.MeshBasicMaterial({ color: 0x101418 });
var tun = new THREE.Mesh(new THREE.CylinderGeometry(W * 0.16, W * 0.16, W * 0.32, 14, 1, true, 0, Math.PI), snow);
tun.material.side = THREE.DoubleSide;
tun.rotation.z = Math.PI / 2;
tun.rotation.y = Math.PI / 2;
tun.position.set(0, 0, front + W * 0.1);
var hole = new THREE.Mesh(new THREE.CircleGeometry(W * 0.14, 16, 0, Math.PI), dark);
hole.position.set(0, 0.02, front + W * 0.26);
g.add(tun);
g.add(hole);
g.userData.dlMouth = 1;
}
}
catch (e) { }
return g;
};
})();
(function () {
if (typeof makeInterior !== "function")
return;
var mi = makeInterior;
makeInterior = function (spec) {
var I = mi.apply(this, arguments);
try {
if (!I || !spec)
return I;
var cave = spec.archetype === "cave" || I.cave || (KIT[spec.archetype] && KIT[spec.archetype].caveLike), igloo = spec.archetype === "igloo";
if (!cave && !igloo)
return I;
var wallM = new THREE.MeshLambertMaterial({ color: cave ? 0x4A443C : 0xDDE9F3, flatShading: true });
var floorM = new THREE.MeshLambertMaterial({ color: cave ? 0x3E3933 : 0xE8EEF2, flatShading: true });
var keep = function (m) { var p = m; while (p && p !== I.root) {
if (p.userData && p.userData.furn)
return true;
p = p.parent;
} return false; };
I.root.children.slice().forEach(function (c) {
if (c.isLight)
return;
if (c.userData && c.userData.furn) {
if (igloo)
c.visible = false;
return;
}
if (!c.isMesh)
return;
var bx = new THREE.Box3().setFromObject(c), sz = bx.getSize(new THREE.Vector3());
if (sz.y < 0.25 && sz.x > 2 && sz.z > 2) {
c.material = floorM;
return;
}
c.visible = false;
});
var W = I.W || 8, D = I.D || 8, H = igloo ? Math.max(2.8, W * 0.5) : Math.max(4.2, (I.ceilH || 3.2) * 1.5);
var geo = new THREE.IcosahedronGeometry(1, cave ? 2 : 3);
if (cave) {
var pa = geo.attributes.position;
for (var i = 0; i < pa.count; i++) {
var vx = pa.getX(i), vy = pa.getY(i), vz = pa.getZ(i);
var hsh = Math.abs(Math.sin(Math.round(vx * 1000) * 12.9898 + Math.round(vy * 1000) * 78.233 + Math.round(vz * 1000) * 37.719) * 43758.5453) % 1, k = 1 + hsh * 0.12;
pa.setXYZ(i, vx * k, vy * k, vz * k);
}
geo.computeVertexNormals();
}
var dome = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ color: cave ? 0x4A443C : 0xC6DAEA, side: THREE.BackSide, flatShading: cave }));
dome.scale.set(W * 0.75, H, D * 0.75);
dome.position.set(0, 0, 0);
I.root.add(dome);
if (igloo) {
for (var r = 1; r < 6; r++) {
var y = H * r / 6, rad = Math.sqrt(Math.max(0, 1 - (y / H) * (y / H)));
var ring = new THREE.Mesh(new THREE.TorusGeometry(1, 0.02, 4, 40), new THREE.MeshLambertMaterial({ color: 0x96B0C6 }));
ring.rotation.x = Math.PI / 2;
ring.scale.set(W * 0.75 * rad * 0.99, D * 0.75 * rad * 0.99, 1);
ring.position.y = y;
I.root.add(ring);
}
var fur = new THREE.MeshLambertMaterial({ color: 0x8A6A4A }), fur2 = new THREE.MeshLambertMaterial({ color: 0xD8CCB8 });
var bench = new THREE.Mesh(new THREE.BoxGeometry(W * 0.8, 0.45, 1.2), floorM);
bench.position.set(0, 0.22, -D * 0.32);
I.root.add(bench);
var pelt = new THREE.Mesh(new THREE.BoxGeometry(W * 0.7, 0.06, 1.0), fur);
pelt.position.set(0, 0.48, -D * 0.32);
I.root.add(pelt);
var rug = new THREE.Mesh(new THREE.CircleGeometry(1.1, 18), fur2);
rug.rotation.x = -Math.PI / 2;
rug.position.set(0, 0.03, 0);
I.root.add(rug);
var lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.16, 0.12, 12), new THREE.MeshLambertMaterial({ color: 0x5A5048 }));
lamp.position.set(W * 0.25, 0.08, -D * 0.1);
I.root.add(lamp);
var flame = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), new THREE.MeshBasicMaterial({ color: 0xFFC860 }));
flame.position.set(W * 0.25, 0.2, -D * 0.1);
I.root.add(flame);
var pl = new THREE.PointLight(0xFFD8A0, 0.9, W * 1.6);
pl.position.set(W * 0.25, 0.6, -D * 0.1);
I.root.add(pl);
}
I.winMats = [];
I.winGlints = [];
I.cave = !!cave;
I.igloo = igloo;
}
catch (e) {
if (window.console)
console.warn("[layers] inside", e);
}
return I;
};
})();
var DL_LAND_ARCH = ["mountain", "volcano", "hill"];
var DL_NEST_RE = /^(.*?)\b(?:(?:hidden|tucked|set|built|carved|cut|dug|nestled|deep|high|hollowed|sunk)\s+(?:away\s+|out\s+|up\s+|down\s+)?)?(?:in|into|inside|within|among|amongst|at the foot of|at the base of|at the bottom of|on the side of|in the side of|on the slope of|in the slope of|on the flank of|under|beneath|below|halfway up)\s+(?:the|a|an|some|those|these)?\s*(?:[a-z'-]+\s+){0,2}?(mountains?|mountainside|mountain range|hills?|hillside|hilltops?|cliffs?|cliff face|cliffside|rock face|rockface|crags?|peaks?|volcano|ridge|fells?|highlands?)\b/;
var DL_FALLS_RE = /\bbehind\s+(?:a|the|some)?\s*(?:[a-z'-]+\s+){0,2}?(waterfall|falls|cascade)\b/;
function dlLandFor(word) { return __ZC(184, 11, this, arguments, new.target); }
function dlNestle(sent) { return __ZC(184, 12, this, arguments, new.target); }
function dlSubjectFor(words) { return __ZC(184, 13, this, arguments, new.target); }
function dlFallsBehind(sent) { return __ZC(184, 14, this, arguments, new.target); }
var DL_GRAND = ["castle", "palace", "manor", "firepalace", "airpalace", "earthpalace", "waterpalace", "icepalace", "cloudpalace", "merpalace", "dwarvenhall", "dragonlair", "temple", "wizardschool", "fairycastle", "faethrone"];
var DL_ROOMS = [
[/\bthrone ?rooms?\b|\bthrone halls?\b|\bcourt of the throne\b/, "throneroom", "throne room|throne"],
[/\b(?:banquet|banqueting|feast(?:ing)?|dining|great|mead) halls?\b|\bdining rooms?\b/, "banquet", "banquet|feast|dining|great hall|mead hall|halls"],
[/\btreasure (?:vaults?|rooms?|chambers?|hoards?)\b|\btreasur(?:y|ies)\b|\bvaults?\b|\bhoard\b/, "treasury", "treasure|vault|treasury|hoard|gold"],
[/\b(?:sleeping |living |servants'? |guest )?quarters\b|\bbed ?chambers?\b|\bbedrooms?\b|\bsleeping rooms?\b/, "bedroom", "quarters|bedchamber|bedroom|chamber"],
[/\bkitchens?\b/, "kitchen", "kitchen"],
[/\barmou?r(?:y|ies)\b/, "armoury", "armou?ry|armor|armour"],
[/\b(?:forges?|smithy|smithies|workshops?)\b/, "forge", "forge|smithy|workshop"],
[/\blibrar(?:y|ies)\b/, "study", "library"],
[/\bdungeons?\b/, "cell", "dungeon"],
[/\bballrooms?\b/, "ballroom", "ballroom"],
[/\bchapels?\b/, "chapel", "chapel"],
[/\b(?:a|the|my|his|her|their|our|personal|private|own|old|gold|silver|gem|crystal|deep|dwarven)\s+mines?\b|\bmineshafts?\b|\bmine shafts?\b/, "mine", "mine"],
[/\bsteam(?:[- ]?power(?:ed)?|works| engines?| machines?)?\b|\bboiler ?rooms?\b|\bengine ?rooms?\b|\bclockwork\b|\bgears?\b/, "engine", "steam|boiler|engine|clockwork|gears?"]
];
if (typeof ROOMFURN !== "undefined") {
ROOMFURN.banquet = ROOMFURN.banquet || ["longtable", "longtable", "chandelier", "hallbanner", "candles", "banner"];
ROOMFURN.treasury = ROOMFURN.treasury || ["goldpile", "goldpile", "vaultround", "crates", "candles", "goldpile"];
ROOMFURN.armoury = ROOMFURN.armoury || ["banner", "crates", "barrel", "banner"];
ROOMFURN.forge = ROOMFURN.forge || ["hearthforge", "anvil", "crates", "barrel"];
ROOMFURN.chapel = ROOMFURN.chapel || ["candles", "pew", "banner"];
ROOMFURN.mine = ROOMFURN.mine || ["crystals", "boulder", "stalagmite", "crates", "crystals", "barrel", "boulder"];
ROOMFURN.engine = ROOMFURN.engine || ["machine", "machine", "barrel", "crates", "machine"];
}
if (typeof ROOMNAME !== "undefined") {
ROOMNAME.banquet = ROOMNAME.banquet || "the banquet hall";
ROOMNAME.treasury = ROOMNAME.treasury || "the treasure vault";
ROOMNAME.armoury = ROOMNAME.armoury || "the armoury";
ROOMNAME.forge = ROOMNAME.forge || "the forge";
ROOMNAME.mine = ROOMNAME.mine || "the mine";
ROOMNAME.engine = ROOMNAME.engine || "the steam engine room";
}
function dlGrandFor(sent) { return __ZC(184, 15, this, arguments, new.target); }
function dlRooms(sent) { return __ZC(184, 16, this, arguments, new.target); }
(function () {
if (typeof planOf !== "function")
return;
var po = planOf;
planOf = function (spec) {
var p = po.apply(this, arguments);
if (!p || !spec || !spec.dlRooms || !spec.dlRooms.length)
return p;
var q = Object.assign({}, p), mine = spec.dlRooms.slice();
if (q.mode === "hall") {
if (mine.indexOf("throneroom") > -1 && q.fill !== "castle" && q.fill !== "church")
q.fill = "castle";
}
else if (q.mode === "rooms")
q.rooms = mine.concat(q.rooms || []).slice(0, 10);
else if (q.mode === "mixed")
q.upper = mine.concat(q.upper || []).slice(0, 10);
return q;
};
})();
function dlHallFloors(spec) { return (spec && spec.dlRooms || []).filter(function (k) { return k !== "throneroom"; }).slice(0, 7); }
(function () {
if (typeof levelsOf === "function") {
var lo = levelsOf;
levelsOf = function (spec) {
var n = lo.apply(this, arguments);
try {
var p = (typeof planOf === "function") ? planOf(spec) : null;
if (spec && spec.dlRooms && p && p.mode === "hall") {
var f = dlHallFloors(spec).length;
if (f)
n = Math.max(n, 1 + f);
}
}
catch (e) { }
return Math.min(16, n);
};
}
if (typeof makeInterior === "function") {
var mi = makeInterior;
makeInterior = function (spec) {
var was = DL.fillSeq;
DL.fillSeq = (spec && spec.dlRooms) ? { rooms: dlHallFloors(spec), i: 0 } : null;
try {
return mi.apply(this, arguments);
}
finally {
DL.fillSeq = was;
}
};
}
if (typeof fillHall === "function") {
var fh = fillHall;
fillHall = function (kind, W, D, put, spots) {
var F = DL.fillSeq;
if (F) {
var i = F.i++;
if (i > 0 && F.rooms[i - 1])
return dlFillRoom(F.rooms[i - 1], W, D, put, spots);
}
return fh.apply(this, arguments);
};
}
})();
function dlFillRoom(k, W, D, put, spots) { return __ZC(184, 17, this, arguments, new.target); }
function dlIgloo(sent) { return __ZC(184, 18, this, arguments, new.target); }
var DL_STOP_RE = new RegExp("\\b(?:(?:the\\s+)?(?:rain|raining|snow|snowing|snowfall|snowstorm|blizzard|storm|thunderstorm|thunder|lightning|hail|fog|mist|wind|winds|sandstorm|dust ?storm|ash|meteors?|meteor shower|heat ?wave|weather|downpour|drizzle|sleet)\\s+(?:had\\s+|has\\s+|finally\\s+|suddenly\\s+|then\\s+|all\\s+)*(?:stopped|ended|ceased|cleared(?: up)?|passed|eased(?: off)?|died (?:down|away)|faded(?: away)?|let up|lifted|went away|was gone|were gone|vanished|blew over|stopped falling|melted away)" +
"|it (?:stopped|ceased|quit) (?:raining|snowing|hailing|storming|thundering)" +
"|no (?:more|longer) (?:any )?(?:rain|snow|storm|hail|fog|wind|lightning)" +
"|(?:stop|end|clear) the (?:rain|snow|storm|weather|fog|wind|hail|blizzard)" +
"|the (?:sky|skies) cleared|the clouds (?:parted|cleared)|the sun came (?:out|back)|the weather (?:cleared|changed|turned fine))\\b");
function dlWeatherStopped(text) { return __ZC(184, 19, this, arguments, new.target); }
(function () {
if (typeof wxRead !== "function")
return;
var wr = wxRead;
wxRead = function (text) {
if (dlWeatherStopped(text))
return { kind: "clear", strength: 1 };
return wr.apply(this, arguments);
};
})();
var DL_WX_THINGS = { snow: ["blizzard", "snowstorm"], storm: ["stormcloud", "lightningstorm", "thundercloud"], rain: ["raincloud", "stormcloud"],
sandstorm: ["sandstorm"], fog: ["fogbank"], ash: ["ashcloud"], meteors: ["meteor"], wind: ["tornado"], hail: ["stormcloud"] };
function dlWeather() { return __ZC(184, 20, this, arguments, new.target); }
(function () {
if (typeof wxSet !== "function")
return;
var ws = wxSet;
wxSet = function (kind, strength, why) {
try {
if (kind !== "clear" && (why === "ai" || why === "event") && dlWeatherStopped(dlText()))
return;
}
catch (e) { }
return ws.apply(this, arguments);
};
})();
function dlSnowy() { return __ZC(184, 21, this, arguments, new.target); }
(function () {
if (typeof groundColor === "function") {
var gc = groundColor;
groundColor = function () { if (DL.snowGround && typeof GROUNDCOL !== "undefined" && GROUNDCOL.snow)
return GROUNDCOL.snow; return gc.apply(this, arguments); };
}
if (typeof groundTex === "function") {
var gt = groundTex;
groundTex = function () { if (DL.snowGround)
return "snow"; return gt.apply(this, arguments); };
}
if (typeof landSignature === "function") {
var ls = landSignature;
landSignature = function () { return ls.apply(this, arguments) + (DL.snowGround ? "|dlsnow" : ""); };
}
})();
function dlGround() {
var want = !!dlSnowy();
if (want === DL.snowGround)
return;
DL.snowGround = want;
try {
if (typeof terrainTick === "function")
terrainTick();
}
catch (e) { }
try {
if (typeof tickClock === "function")
tickClock(true);
}
catch (e) { }
}
function dlBringNear(before) { return __ZC(184, 22, this, arguments, new.target); }
var dlInner = null;
function dlText() { if (DL.saidAt !== store.session)
return String(store.transcript || ""); return String(store.transcript || "") + " " + (DL.said || ""); }
function dlSaid(chunk) {
var t = String(store.transcript || "");
if (chunk == null)
return dlText();
if (DL.saidAt !== store.session) {
DL.saidAt = store.session;
DL.said = "";
}
if (chunk && t.indexOf(chunk) < 0 && DL.said.indexOf(chunk) < 0)
DL.said += " " + chunk + ".";
return t + " " + DL.said;
}
function dlPass(before, chunk) { return __ZC(184, 23, this, arguments, new.target); }
(function () {
if (typeof scanText === "function") {
var st = scanText;
dlInner = function (t) { return st.call(this, t); };
scanText = function (chunk) {
var before = store.objects.length;
var r = st.apply(this, arguments);
if (!DL.busy)
setTimeout(function () { dlPass(before, typeof chunk === "string" ? chunk : ""); }, 60);
return r;
};
}
if (typeof reconcile === "function") {
var rc = reconcile;
reconcile = function (p) {
var before = store.objects.length;
var r = rc.apply(this, arguments);
setTimeout(function () { dlPass(before); }, 60);
return r;
};
}
})();
(function () {
if (typeof wxBuild !== "function")
return;
var wb = wxBuild;
wxBuild = function () {
var r = wb.apply(this, arguments);
try {
if (WX.flash) {
WX.flash.style.transition = "opacity .6s ease";
WX.flash.style.background = "#C8D2E8";
}
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof wxTick !== "function")
return;
var wt = wxTick;
var anchor = null;
wxTick = function () {
var keepG = null;
try {
if (WX.group && typeof camera !== "undefined") {
keepG = WX.group.position.clone();
}
}
catch (e) { }
var r = wt.apply(this, arguments);
try {
if (WX.flash) {
var on = parseFloat(WX.flash.style.opacity) || 0;
if (on > 0.2)
WX.flash.style.opacity = "0.16";
}
if (WX.group && typeof camera !== "undefined") {
var P = camera.position;
if (!anchor)
anchor = { x: P.x, z: P.z };
var dx = P.x - anchor.x, dz = P.z - anchor.z;
if (dx !== 0 || dz !== 0) {
Object.keys(WX.sys).forEach(function (k) {
var p = WX.sys[k];
if (!p.visible)
return;
var a = p.geometry.attributes.position, arr = a.array, line = !!p.isLineSegments, step = line ? 6 : 3, half = line ? 30 : 45;
for (var i = 0; i < arr.length; i += step) {
arr[i] -= dx;
arr[i + 2] -= dz;
if (line) {
arr[i + 3] -= dx;
arr[i + 5] -= dz;
}
if (arr[i] < -half) {
arr[i] += half * 2;
if (line)
arr[i + 3] += half * 2;
}
else if (arr[i] > half) {
arr[i] -= half * 2;
if (line)
arr[i + 3] -= half * 2;
}
if (arr[i + 2] < -half) {
arr[i + 2] += half * 2;
if (line)
arr[i + 5] += half * 2;
}
else if (arr[i + 2] > half) {
arr[i + 2] -= half * 2;
if (line)
arr[i + 5] -= half * 2;
}
}
a.needsUpdate = true;
});
}
anchor.x = P.x;
anchor.z = P.z;
}
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof wxQuake !== "function")
return;
var wq = wxQuake;
wxQuake = function (sec) { return wq.call(this, Math.min(sec || 8, 5)); };
})();
function dlSmooth(root) {
try {
if (typeof renderer === "undefined" || !renderer || !renderer.capabilities)
return;
var max = renderer.capabilities.getMaxAnisotropy ? renderer.capabilities.getMaxAnisotropy() : 1;
if (THREE.Texture && THREE.Texture.DEFAULT_ANISOTROPY !== undefined)
THREE.Texture.DEFAULT_ANISOTROPY = max;
(root || scene).traverse(function (o) {
if (!o.isMesh || !o.material)
return;
(Array.isArray(o.material) ? o.material : [o.material]).forEach(function (m) {
["map", "normalMap", "roughnessMap", "bumpMap"].forEach(function (k) {
var t = m[k];
if (!t || t.dlSm)
return;
t.dlSm = 1;
if (t.anisotropy < max) {
t.anisotropy = max;
if (t.image)
t.needsUpdate = true;
}
if (t.generateMipmaps === false && t.image && t.image.width && (t.image.width & (t.image.width - 1)) === 0) {
t.generateMipmaps = true;
t.minFilter = THREE.LinearMipmapLinearFilter;
t.needsUpdate = true;
}
});
});
});
}
catch (e) { }
}
setTimeout(function () { dlSmooth(); }, 3000);
setInterval(function () { if (typeof scene !== "undefined" && scene && !store.inside)
dlSmooth(); }, 15000);
(function () {
if (typeof buildTerrain === "function") {
var bt = buildTerrain;
buildTerrain = function () { var r = bt.apply(this, arguments); try {
if (terrain)
dlSmooth(terrain);
}
catch (e) { } return r; };
}
})();
