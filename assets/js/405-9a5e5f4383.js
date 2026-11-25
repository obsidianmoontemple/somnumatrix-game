/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var WND_SITES = [
["pyramid", "The Great Pyramid of Giza", "Giza, Egypt", "Giza, by Cairo, Egypt", "about 2560 BC", 1],
["gardens", "The Hanging Gardens of Babylon", "Babylon, Mesopotamia", "near Hillah, Iraq (if they were here)", "about 600 BC (the story says)", 2],
["artemis", "The Temple of Artemis at Ephesus", "Ephesus, Ionia", "near Selçuk, Turkey", "about 550 BC; rebuilt after 356 BC", 3],
["zeus", "The Statue of Zeus at Olympia", "Olympia, Greece", "Olympia, Greece", "about 430 BC", 4],
["mausoleum", "The Mausoleum at Halicarnassus", "Halicarnassus, Caria", "Bodrum, Turkey", "about 350 BC", 5],
["colossus", "The Colossus of Rhodes", "Rhodes, Greece", "Rhodes, Greece", "280 BC", 6],
["pharos", "The Lighthouse of Alexandria", "the island of Pharos, Alexandria, Egypt", "Alexandria, Egypt", "about 280 BC", 7]
];
var WND_PLACES = [
["hall", "The Hall of Wonders: the map floor", ""], ["later", "The Hall: the gallery of later wonders", ""], ["library", "The Hall: the library of sources", ""], ["teachers", "The Hall: the teachers' room", ""],
["pyramid", "The Great Pyramid: the north face", "pyramid"], ["kings", "The Great Pyramid: the King's Chamber", "pyramid"], ["gallery", "The Great Pyramid: the Grand Gallery", "pyramid"],
["gardens", "The Hanging Gardens: the Ishtar Gate", "gardens"], ["terrace", "The Hanging Gardens: the top terrace", "gardens"],
["artemis", "The Temple of Artemis: the steps", "artemis"], ["cella", "The Temple of Artemis: the goddess", "artemis"],
["zeus", "Olympia: the Temple of Zeus", "zeus"], ["throne", "Olympia: before Zeus", "zeus"], ["workshop", "Olympia: Phidias' workshop", "zeus"],
["mausoleum", "The Mausoleum: the front", "mausoleum"], ["tomb", "The Mausoleum: the tomb chamber", "mausoleum"],
["colossus", "The Colossus: the harbour", "colossus"], ["bronze", "The Colossus: the bronze-works", "colossus"],
["pharos", "The Lighthouse: the causeway", "pharos"], ["alexlib", "The Lighthouse: the Library of Alexandria", "pharos"], ["lantern", "The Lighthouse: the lantern", "pharos"]
];
function wndDefaults() {
var s = {};
WND_SITES.forEach(function (r) { s[r[0]] = true; });
return { open: true, talk: true, later: true, view: "then", pass: 8, sites: s, notes: "" };
}
function wndMerge(c) { return __ZC(405, 0, this, arguments, new.target); }
var WND = { key: "wonders", base: -4100000, cfg: null, cfgAt: 0, G: null, K: null, built: false, lite: false, t: 0, pt: 0, mats: {}, geos: {}, myFn: null,
view: {}, vgroups: {}, onView: {}, blockers: {}, people: [], fx: [], acts: {}, room: "", region: "", wantAt: null };
var WND_AT = {};
(function () { WND_SITES.forEach(function (r, i) { var a = i * Math.PI * 2 / 7; WND_AT[r[0]] = { x: Math.round(Math.sin(a) * 620), z: Math.round(-Math.cos(a) * 620), a: a }; }); WND_AT.hall = { x: 0, z: 0, a: 0 }; })();
var WNK = null;
function wndCfg() {
if (!WND.cfg || Date.now() - WND.cfgAt > 20000) {
var c = (typeof cloudSetting === "function") ? cloudSetting("wonders") : null;
WND.cfg = wndMerge(c);
WND.cfgAt = Date.now();
}
return WND.cfg;
}
function wndLite() { return (typeof LITE !== "undefined" && !!LITE) || (typeof LOOK_PHONE !== "undefined" && !!LOOK_PHONE); }
function wndKeeper() { try {
return typeof isKeeperNow === "function" && isKeeperNow();
}
catch (e) {
return false;
} }
function wndSigned() { return typeof signedIn === "function" && signedIn(); }
function wndEsc(s) { return (typeof esc === "function") ? esc(s) : String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
function wndSay(h) { if (typeof setStatus === "function")
setStatus(h); }
function wndSiteOn(k) { return !k || wndKeeper() || wndCfg().sites[k] !== false; }
function wndName(k) { var r = WND_SITES.filter(function (s) { return s[0] === k; })[0]; return r ? r[1] : "The Hall of Wonders"; }
var WND_LS = "wnd_progress_v1";
function wndProg() {
if (!WND.prog) {
try {
WND.prog = JSON.parse(localStorage.getItem(WND_LS) || "{}") || {};
}
catch (e) {
WND.prog = {};
}
}
var p = WND.prog;
p.read = p.read || {};
p.did = p.did || {};
p.view = p.view || {};
return p;
}
function wndProgSave() { try {
localStorage.setItem(WND_LS, JSON.stringify(WND.prog || {}));
}
catch (e) { } }
function wndMat(col, tex, o) { return __ZC(405, 1, this, arguments, new.target); }
function wndGlowM(col, op) { var k = "glow|" + col + "|" + (op || 1); if (!WND.mats[k])
WND.mats[k] = new THREE.MeshBasicMaterial({ color: col, transparent: op !== undefined, opacity: op === undefined ? 1 : op }); return WND.mats[k]; }
function wndCanvasMat(key, w, h, draw, o) { return __ZC(405, 2, this, arguments, new.target); }
function wndP() { return (WNK && WNK.F) || WND.G; }
function wndBox(w, h, d, mat, x, y, z, parent) {
var k = w.toFixed(2) + "," + h.toFixed(2) + "," + d.toFixed(2), g = WND.geos[k];
if (!g) {
g = new THREE.BoxGeometry(w, h, d);
if (typeof metreUVs === "function")
metreUVs(g, "box", [w, h, d]);
WND.geos[k] = g;
}
var m = new THREE.Mesh(g, mat);
m.position.set(x, y, z);
(parent || wndP()).add(m);
return m;
}
function wndCyl(r, h, mat, x, y, z, parent, seg, r2) {
var g = new THREE.CylinderGeometry(r2 === undefined ? r : r2, r, h, seg || 14);
if (typeof metreUVs === "function")
metreUVs(g, "cyl", [r, r2 === undefined ? r : r2, h]);
var m = new THREE.Mesh(g, mat);
m.position.set(x, y, z);
(parent || wndP()).add(m);
return m;
}
function wndSph(r, mat, x, y, z, parent, seg) { var m = new THREE.Mesh(new THREE.SphereGeometry(r, seg || 14, Math.max(6, (seg || 14) * 0.7 | 0)), mat); m.position.set(x, y, z); (parent || wndP()).add(m); return m; }
function wndPlane(w, h, mat, x, y, z, ry, parent) { var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat); m.position.set(x, y, z); m.rotation.y = ry || 0; (parent || wndP()).add(m); return m; }
function wndFlat(w, d, mat, x, y, z, parent) { var m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat); m.rotation.x = -Math.PI / 2; m.position.set(x, y, z); (parent || wndP()).add(m); return m; }
function wndGroup(x, y, z, ry, parent) { var g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = ry || 0; (parent || wndP()).add(g); return g; }
function wndCtx() { return { F: null, site: "hall", v: "", ox: 0, oz: 0, lists: {}, rooms: [], spots: [], flames: [] }; }
function wndL(site) { var K = WNK, s = site || K.site; return K.lists[s] || (K.lists[s] = { solids: [], floors: [], ramps: [], water: [] }); }
function wndSolid(x, z, hw, hd, b, h, rot) { var S = { x: x + WNK.ox, z: z + WNK.oz, hw: hw, hd: hd, b: b || 0, h: h || 3, rot: rot || 0, v: WNK.v }; wndL().solids.push(S); return S; }
function wndRound(x, z, r, b, h) { var S = { x: x + WNK.ox, z: z + WNK.oz, r: r, b: b || 0, h: h || 3, v: WNK.v }; wndL().solids.push(S); return S; }
function wndFloor(x0, z0, x1, z1, y) { x0 += WNK.ox; x1 += WNK.ox; z0 += WNK.oz; z1 += WNK.oz; var F = { x0: Math.min(x0, x1), x1: Math.max(x0, x1), z0: Math.min(z0, z1), z1: Math.max(z0, z1), y: y, v: WNK.v }; wndL().floors.push(F); return F; }
function wndRamp(x0, z0, x1, z1, axis, a0, y0, a1, y1) { x0 += WNK.ox; x1 += WNK.ox; z0 += WNK.oz; z1 += WNK.oz; var o = axis === "x" ? WNK.ox : WNK.oz; a0 += o; a1 += o; var F = { x0: Math.min(x0, x1), x1: Math.max(x0, x1), z0: Math.min(z0, z1), z1: Math.max(z0, z1), axis: axis, a0: a0, y0: y0, a1: a1, y1: y1, v: WNK.v }; wndL().ramps.push(F); return F; }
function wndSolidFrom(obj, h) { return __ZC(405, 3, this, arguments, new.target); }
function wndWater(x, z, hw, hd, r) { x += WNK.ox; z += WNK.oz; var W = r ? { x: x, z: z, r: r, v: WNK.v } : { x: x, z: z, hw: hw, hd: hd, v: WNK.v }; wndL().water.push(W); return W; }
function wndVOk(v) { if (!v)
return true; var i = v.indexOf(":"), site = v.slice(i + 1), want = v.slice(0, i); return wndView(site) === want; }
function wndView(site) { return WND.view[site] || wndProg().view[site] || wndCfg().view || "then"; }
function wndGroundIn(L, x, z, feet) { return __ZC(405, 4, this, arguments, new.target); }
function wndSolidIn(L, x, z, feet) { return __ZC(405, 5, this, arguments, new.target); }
function wndRegion(x, z) {
if (Math.abs(x) < 70 && Math.abs(z) < 60)
return "hall";
var best = "land", bd = 330 * 330;
for (var k in WND_AT) {
if (k === "hall")
continue;
var A = WND_AT[k], d = (x - A.x) * (x - A.x) + (z - A.z) * (z - A.z);
if (d < bd) {
bd = d;
best = k;
}
}
return best;
}
function wndSpot(x, z, r, name, verb, fn, o) { o = o || {}; var S = { x: x + WNK.ox, z: z + WNK.oz, r: r, y: o.y || 0, name: name, verb: verb, fn: fn, when: o.when || null, v: WNK.v, site: WNK.site }; WNK.spots.push(S); return S; }
function wndWall(dir, a, b, c, y, h, t, mat, opens, o) { return __ZC(405, 6, this, arguments, new.target); }
function wndRoom(R) { return __ZC(405, 7, this, arguments, new.target); }
function wndArea(x0, z0, x1, z1, y, h, name) { WNK.rooms.push({ x0: Math.min(x0, x1) + WNK.ox, z0: Math.min(z0, z1) + WNK.oz, x1: Math.max(x0, x1) + WNK.ox, z1: Math.max(z0, z1) + WNK.oz, y: y, h: h, name: name, site: WNK.site, v: WNK.v }); }
function wndRoomAt(K, x, z, feet) {
var best = null;
(K.rooms || []).forEach(function (r) { if (!wndVOk(r.v))
return; if (x >= r.x0 && x <= r.x1 && z >= r.z0 && z <= r.z1 && feet >= r.y - 1.2 && feet <= r.y + r.h && (!best || (r.x1 - r.x0) * (r.z1 - r.z0) < (best.x1 - best.x0) * (best.z1 - best.z0)))
best = r; });
return best;
}
function wndSign(lines, w, h, bg, fg, x, y, z, ry, parent) {
if (typeof wSign !== "function")
return null;
var s = wSign(lines, w, h, bg, fg);
s.position.set(x, y, z);
s.rotation.y = ry || 0;
(parent || wndP()).add(s);
s.userData.keep = 1;
return s;
}
function wndPlaque(key, title, text, w, h, x, y, z, ry, o) { return __ZC(405, 8, this, arguments, new.target); }
function wndFlame(x, y, z, s, col, parent) { return __ZC(405, 9, this, arguments, new.target); }
function wndFlamesTick(t, list) { return __ZC(405, 10, this, arguments, new.target); }
function wndLamp(x, y, z, col, size, parent) { if (typeof wGlow !== "function")
return null; var g = wGlow(col || 0xFFE0A8, size || 2.4, 0.35); g.position.set(x, y, z); (parent || wndP()).add(g); g.userData.keep = 1; return g; }
function wndFluteMat(col, key) { return __ZC(405, 11, this, arguments, new.target); }
function wndColumn(x, y, z, h, r, order, mat, parent, o) { return __ZC(405, 12, this, arguments, new.target); }
function wndColumnsInst(list, h, r, order, mat, parent, o) { return __ZC(405, 13, this, arguments, new.target); }
function wndTree(kind, x, y, z, s, parent) { return __ZC(405, 14, this, arguments, new.target); }
function wndPersonFig(key, x, y, z, ry, look, title) { return __ZC(405, 15, this, arguments, new.target); }
var WND_LESSON_KEYS = [["history", "History", "Who built it, when and why"], ["build", "How it was built", "The engineering and the work"], ["where", "Where it is", "The place on the map, then and now"], ["nowthen", "Then and now", "What survives, and how the rest was lost"], ["know", "How we know", "The evidence: old writers and archaeology"]];
var WND_LESSONS = {
pyramid: {
history: { y: "The Great Pyramid was built for a king of Egypt called Khufu, about 4,500 years ago. It was his tomb: a giant stone house for his body and his spirit after he died. It is the oldest of the Seven Wonders, and the only one still standing.",
f: "The Great Pyramid was built for Khufu (the Greeks called him Cheops), second king of Egypt's Fourth Dynasty, in the Old Kingdom. It was finished about 2560 BC after roughly twenty years of work. It was a royal tomb and a machine for eternity: Egyptians believed the king's spirit (his ka) lived on and rose to join the sun god Ra and the stars. The pyramid stood inside a whole complex: a mortuary temple, a causeway down to a valley temple by the Nile, smaller queens' pyramids, and pits holding full-size boats (one, found in 1954, has been rebuilt and is 43 m long). For about 3,800 years it was the tallest thing people had built." },
build: { y: "It is made of about 2.3 million stone blocks. Most weigh as much as two cars. Workers dragged them on wooden sledges, and poured water on the sand in front so the sledge slid more easily. The outside was covered in smooth, shining white limestone.",
f: "Around 2.3 million blocks, most of local limestone averaging about 2.5 tonnes; the granite beams over the King's Chamber weigh 25 to 80 tonnes and came by river from Aswan, about 800 km south. The fine white casing came from the Tura quarries across the Nile. Blocks moved on wooden sledges: a tomb painting of the official Djehutihotep (about 1880 BC) shows a man pouring water in front of a sledge, and experiments in 2014 showed that sand wetted just right halves the force needed. How the blocks went up is still argued: straight ramps, ramps wrapping round the pyramid, or ramps inside it. The sides face north, south, east and west to within a small fraction of a degree, and the base is almost perfectly level, done with simple tools: plumb lines, set-squares, water channels and the stars. Egyptians measured a slope as a seked: how many palms the face runs in for every cubit (7 palms) it rises. Khufu's seked was 5½ palms, which gives about 51.8 degrees." },
where: { y: "It stands at Giza, on the edge of the desert, just outside the city of Cairo in Egypt. Two more big pyramids and the Great Sphinx stand beside it. The River Nile is close by.",
f: "Giza lies on a limestone plateau on the west bank of the Nile, now on the edge of greater Cairo, Egypt. The west bank was the side of the setting sun, the land of the dead. Khufu's son Khafre and later Menkaure built the two other great pyramids beside his, and the Great Sphinx guards Khafre's causeway. Building here made sense: solid bedrock to carry the weight, stone to quarry on the spot, and the Nile's yearly flood bringing boats almost to the foot of the plateau. The Giza necropolis is part of the UNESCO World Heritage Site 'Memphis and its Necropolis'." },
nowthen: { y: "Long ago the pyramid was white, smooth and pointed. Today you see big steps, because people took away the white outer stones to build houses and mosques in Cairo. It has also lost its top. It is about 8 metres shorter than when it was new.",
f: "New, it stood about 146.6 m high, faced with polished white Tura limestone, perhaps with a capstone (pyramidion) that may have been gilded: nobody knows. Today it is about 138.5 m: the capstone and the top courses are gone. After a great earthquake in 1303 loosened much of the casing, the stones were carried off to build Cairo, and only a few casing blocks remain at the base. Inside, the King's Chamber still holds Khufu's granite coffer, empty, its lid long gone; whatever it once held was robbed in antiquity. The entrance most visitors use today is a tunnel forced into the north face, traditionally said to have been dug about AD 820 for the caliph al-Ma'mun." },
know: { y: "We know a lot because the pyramid is still here and people can measure it. The Greek writer Herodotus visited Egypt about 2,500 years ago and wrote down what he was told. Archaeologists have found the town where the workers lived, and even a diary of a boatman who carried its stones.",
f: "The building itself is the first source: surveyors such as Flinders Petrie (The Pyramids and Temples of Gizeh, 1883) measured it to the millimetre. Herodotus visited about 450 BC and wrote (Histories, Book 2, 124-125) that 100,000 men worked in three-month shifts for twenty years; he wrote two thousand years after it was built, so he passed on what priests and guides told him. Modern finds tell us more: the workers' town and bakeries south of the plateau, the workers' own tombs, and painted marks left by work gangs with names such as 'Friends of Khufu' in the hidden chambers above the King's Chamber. In 2013 the oldest written papyri yet known were found at Wadi al-Jarf on the Red Sea: the logbook of an inspector called Merer, whose crew shipped Tura limestone down the Nile to Giza. Together they show skilled, organised, fed and housed workers, not slaves in chains." }
},
gardens: {
history: { y: "The story says King Nebuchadnezzar of Babylon built a garden on tall terraces for his wife, Queen Amytis. She came from green mountains and missed them, so he made her a mountain of trees and flowers in the middle of the flat, hot city.",
f: "The best-known account says Nebuchadnezzar II, who ruled Babylon from 605 to 562 BC, built the gardens for his wife Amytis, a princess of Media in the green mountains of what is now Iran, who missed her homeland. That story comes from Berossus, a Babylonian priest writing in Greek about 290 BC, whose words survive only because the historian Josephus quoted them (Against Apion, Book 1). Nebuchadnezzar was the great builder of Babylon: its double walls, the Ishtar Gate of blue glazed brick and the Processional Way, the temple of Marduk and its great ziggurat. Yet among his many inscriptions boasting of his buildings, none mentions a garden like this. That is the puzzle at the heart of this wonder." },
build: { y: "The writers say the garden was built in steps, like a giant staircase. Each step was strong enough to hold deep soil and big trees. Workers lifted water from the River Euphrates to the top with machines, so it could run down and water every plant.",
f: "Diodorus (Library of History, Book 2, 10) and Strabo (Geography, Book 16, 1.5) describe a square garden about 4 plethra (some 120 m) a side, rising in terraces like the seats of a theatre. The terraces stood on vaults and thick walls. To keep the water out of the brickwork, the builders laid reeds set in bitumen (natural tar), two courses of baked brick bonded with gypsum, and sheets of lead, with soil deep enough for large trees on top. Strabo says water was raised from the Euphrates by machines turned by people without stopping (he calls them screws). Lifting water uphill without engines is a real engineering problem: a shaduf (a bucket on a lever) lifts a little at a time; a chain of buckets or a water screw lifts a steady stream. Mesopotamians certainly used the shaduf, shown on Akkadian seals of about 2300 BC; the water screw is named after Archimedes, a Greek who lived three centuries after Nebuchadnezzar, so this Babylon lifts its water with shadufs." },
where: { y: "Babylon was a huge city beside the River Euphrates, in the land between two rivers called Mesopotamia. Today its ruins are in Iraq. The land there is flat and hot, so a green mountain-garden would have been a marvel.",
f: "Babylon stood on the Euphrates in southern Mesopotamia ('between the rivers', the Tigris and Euphrates), about 85 km south of modern Baghdad, near Hillah in Iraq. It became a UNESCO World Heritage Site in 2019. The plain is flat, very hot in summer and almost rainless, watered by canals: a terraced garden of mountain trees there would have been an astonishing sight. Some scholars, notably Stephanie Dalley, argue the gardens were really at Nineveh on the Tigris, 450 km north, built by the Assyrian king Sennacherib about 700 BC, whose inscriptions do describe a palace garden watered by an aqueduct and water-raising devices." },
nowthen: { y: "Nothing of the gardens has been found for sure. Some people think they were somewhere else, and some think they were only a story. It is the one wonder that might never have been real!",
f: "No trace of the gardens has been identified with certainty. The German archaeologist Robert Koldewey, who dug Babylon from 1899 to 1917, found a building of vaulted rooms in the Southern Palace with an unusual well and believed he had found their foundations; later study suggests it was a storehouse or offices (tablets listing oil rations were found there). Babylon's ruins themselves suffered from brick-robbing over centuries and from damage in modern times. So the gardens may lie undiscovered, may have stood at Nineveh instead, or may be a story that grew in the telling. This is the only wonder whose very existence is doubted." },
know: { y: "Only writers who lived long after tell us about the gardens. None of them say they saw them with their own eyes. Herodotus, who wrote about Babylon, does not mention them at all. So we must think carefully about what to believe.",
f: "Our sources are all late and second-hand: Berossus (about 290 BC, through Josephus), Diodorus and Strabo (first century BC), Quintus Curtius Rufus (first century AD) and the Greek text 'On the Seven Wonders' credited to Philo of Byzantium. Herodotus describes Babylon at length about 450 BC and says nothing of them; neither do Babylonian records. Historians weigh such evidence by asking: who wrote it, when, how they could know, and whether other evidence agrees. A wonder with only late descriptions and no archaeology is a good lesson in how history is argued from evidence." }
},
artemis: {
history: { y: "The Temple of Artemis was a giant marble house for the goddess Artemis, in the city of Ephesus. It was so beautiful that people came from far away to see it. A man burned it down to make himself famous, and the people built it again even bigger.",
f: "Ephesus, a rich Greek city on the coast of Ionia, had worshipped Artemis on this marshy site for centuries. The first great marble temple was begun about 550 BC, helped by gifts from Croesus, the famously wealthy king of Lydia, and designed by the architect Chersiphron of Knossos and his son Metagenes. Pliny says it took 120 years. In 356 BC a man named Herostratus set fire to it simply to make his name live forever; the Ephesians decreed that nobody should speak his name (it did not work: we know it). A later story says it burned on the night Alexander the Great was born. The Ephesians rebuilt it on the same plan, even grander. When Alexander offered to pay for the work if his name was carved on it, they politely refused: it was not fitting, they said, for one god to make offerings to other gods (Strabo, Book 14, 1.22)." },
build: { y: "It had 127 marble columns, each as tall as a six-storey building. To move such heavy stones, the builder Chersiphron put metal pins in the ends of each column and let oxen roll it along like a giant rolling pin. The temple stood on soft, marshy ground, which helped it survive earthquakes.",
f: "Pliny (Natural History, Book 36, 21) gives 425 by 225 Roman feet (about 115 by 55 m, larger than a football field), 127 columns 60 feet (about 18 m) high, 36 of them carved with figures at the base. It was Ionic: slender columns on moulded bases, crowned with scroll-shaped volutes. Chersiphron's problem was moving column shafts from the quarries over soft roads that would swallow a cart. Vitruvius (On Architecture, Book 10, 2) tells his answer: iron pivots set in the ends of each shaft, a wooden frame round it, and oxen pulling, so the shaft itself became the roller; his son Metagenes used wheels round the architrave blocks the same way. Building on marsh was deliberate: Pliny says it was meant to spare the temple from earthquakes, with layers of charcoal and fleeces packed under the foundations." },
where: { y: "Ephesus was a busy port on the coast of what is now Turkey. Today the sea has moved away, and the temple's place is a quiet marshy field near the town of Selçuk.",
f: "Ephesus lay on the Aegean coast of Asia Minor, in Ionia, near the mouth of the Cayster river; today the site is near Selçuk in Izmir Province, Turkey. The river kept carrying silt into the harbour, and over centuries the coastline moved about 5 km west, leaving the great port stranded inland. The city's later ruins (the Library of Celsus, the great theatre) are a UNESCO World Heritage Site. The temple stood outside the city walls, in the low marsh, which is why its site floods in winter." },
nowthen: { y: "Today only one column stands, put back together from broken pieces, often with a stork's nest on top. Some of the temple's carved stones are in a museum in London.",
f: "The rebuilt temple was damaged when Goths raided Ephesus in AD 268. As Christianity spread, the old temples were closed (decrees of the 390s), and the ruins became a quarry: its marble was burned for lime and reused in later buildings (a legend says some went into Hagia Sophia in Constantinople; this is doubtful). Silt buried what was left. The English engineer John Turtle Wood searched for six years before finding it in 1869. Today a single column, rebuilt from scattered drums, stands in the marsh. A carved column drum and other pieces are in the British Museum." },
know: { y: "Old writers like Pliny measured the temple and wrote it down. Then in 1869 a man named John Wood dug in the mud for years and found the temple's floor and broken columns.",
f: "Pliny's figures and Vitruvius' account of the builders come from Roman writers using older Greek books (Chersiphron and Metagenes themselves wrote a book about the temple, now lost). Strabo tells the story of the fire and of Alexander's offer. The temple appears on coins of Ephesus, often with the cult statue between its columns. Archaeology confirmed the scale: Wood's excavations (Discoveries at Ephesus, 1877) and the British Museum's dig under David Hogarth in 1904-05, which found the earlier temples beneath and a deposit of offerings including some of the earliest coins ever made, of electrum, from Lydia. Where the old writers and the excavations agree, we can be confident." }
},
zeus: {
history: { y: "At Olympia, where the first Olympic Games were held, there was a giant statue of Zeus, king of the Greek gods. He sat on a throne, and he was made of gold and ivory. The sculptor was a famous artist called Phidias.",
f: "Olympia, in the western Peloponnese, was the great sanctuary of Zeus, where the Olympic Games were held every four years from (by tradition) 776 BC. The Temple of Zeus, a Doric temple designed by Libon of Elis, was finished about 456 BC. Some twenty years later the Athenian sculptor Phidias, who had made the great Athena for the Parthenon, made the statue for it, about 435 BC. Zeus sat enthroned, about 12 m high, holding a winged Victory (Nike) in his right hand and a sceptre topped by an eagle in his left. Visitors said seeing it eased grief; the orator Dio Chrysostom said a man who had suffered greatly would forget his troubles before it." },
build: { y: "Inside, the statue had a wooden frame. Thin carved ivory made his skin, and sheets of gold made his robe and hair. Workers poured olive oil into a shallow pool in front of the statue to keep the ivory from cracking.",
f: "The statue was chryselephantine: thin plates of carved ivory for the flesh and beaten gold for the robe, hair and sandals, fixed over a wooden core, with glass, ebony and precious stones on the throne (Pausanias, Description of Greece, Book 5, 11, describes the throne's carvings in detail). Phidias worked in a workshop next to the temple, built to the same size as the temple's inner room so the parts could be tried in place. The floor before the statue was paved with black stone, with a raised rim of white marble to hold olive oil; Pausanias says oil protected the ivory at damp Olympia. Strabo (Book 8, 3.30) noticed the one fault: Zeus nearly touched the roof, so if he stood up he would lift it off. The sense of scale was deliberate: the god was too great for his house." },
where: { y: "Olympia is in a green valley in Greece, beside two rivers, with hills and trees all around. It was a holy place, full of temples, treasure houses and the stadium where the races were run.",
f: "Olympia lies in the valley of the Alpheios river where the Kladeos stream joins it, in Elis in the western Peloponnese, Greece. It was never a city: it was a sanctuary, the Altis, full of temples, altars, treasuries given by Greek cities, statues of victors, and beside it the stadium (192 m long, the length of the race called the stadion), the gymnasium and the guest houses. Greeks from all over the Mediterranean came for the Games, and a sacred truce let them travel safely. The site is a UNESCO World Heritage Site, and the Olympic flame is still lit there for every modern Games." },
nowthen: { y: "The statue is gone. It was probably taken to the city of Constantinople and burned in a fire long ago. The temple fell down in earthquakes. Its huge columns still lie on the ground where they fell, like stacks of giant coins.",
f: "After the emperor Theodosius I ended the old festivals (the last ancient Games are dated to AD 393), the sanctuary declined. A Byzantine writer, Cedrenus, says the statue was carried to Constantinople and burned in a palace fire about AD 475; it may instead have perished at Olympia. Earthquakes in the sixth century threw down the temple's columns, and floods buried the site under metres of silt. Today you can walk among the column drums lying exactly as they fell; one column was re-erected in 2004. Phidias' workshop survives in part, because it was turned into a church in the fifth century." },
know: { y: "A traveller called Pausanias saw the statue and wrote a long description. Coins from the city show what it looked like. Archaeologists even found Phidias' own cup in his workshop, with his name scratched on the bottom!",
f: "Pausanias saw it about AD 170 and described the throne and the statue's decoration (Frazer's translation of 1898 is public domain). Coins of Elis struck under the emperor Hadrian show Zeus on his throne, the best picture we have. German excavations, beginning in 1875, uncovered the temple and its sculptures, now in the Olympia museum. Digs in Phidias' workshop in 1954-58 found tools, clay moulds used to shape the gold drapery, chips of ivory and glass, and a small black cup scratched underneath 'I belong to Pheidias'. That cup ties a real man to a real workshop and a lost wonder." }
},
mausoleum: {
history: { y: "Mausolus was a ruler who lived long ago. When he died, his wife Artemisia built him a huge, beautiful tomb. It was so famous that today any grand tomb is called a 'mausoleum' after him.",
f: "Mausolus ruled Caria, in south-west Asia Minor, from 377 to 353 BC as a satrap (governor) of the Persian Empire, though in practice he was a king. He moved his capital to Halicarnassus and rebuilt it as a splendid Greek city. His tomb was probably planned in his lifetime; after his death his sister and wife Artemisia II carried the work on, and when she died two years later the sculptors finished it, Pliny says, for their own glory and the glory of their art. A Roman story says Artemisia mixed his ashes into a drink, out of grief; it is a legend. The tomb was so famous that 'mausoleum' became the word for any grand tomb, in English and many other languages." },
build: { y: "It had a tall stone base, then a ring of 36 columns, then a roof shaped like a pyramid of 24 steps. On the very top stood a stone chariot pulled by four horses. Four famous sculptors each carved one side.",
f: "Pliny (Natural History, Book 36, 30-31) describes it: 36 columns round it, a pyramid of 24 steps above, and on top a four-horse chariot (quadriga) of marble by Pythis; it was about 140 Roman feet (about 45 m) high. The architects were Satyros and Pytheos (Vitruvius, Book 7, preface). Four of the greatest sculptors of the day each took a side: Scopas the east, Bryaxis the north, Timotheus the south and Leochares the west. Friezes showed Greeks fighting Amazons and centaurs, and a chariot race; hundreds of statues of people, lions and horses stood between the columns and round the base. It mixed Greek columns and sculpture, an Egyptian-style pyramid roof and the tall Carian tomb podium: a building of several cultures at once. The burial chamber lay below, reached by a stair and sealed by a great stone." },
where: { y: "Halicarnassus was a harbour city on the coast of what is now Turkey. Today the town is called Bodrum, and it is famous for its blue sea and white houses.",
f: "Halicarnassus stood on a bay on the Aegean coast of Caria, in south-west Asia Minor; today it is Bodrum, in Muğla Province, Turkey. Herodotus, 'the father of history', was born there about 484 BC. Mausolus laid out the city round its harbour like a theatre, with the tomb on a terrace in the middle of the slope, where everyone in the harbour could see it." },
nowthen: { y: "Earthquakes broke the Mausoleum. Later, knights took its stones to build a castle by the harbour, which still stands. Today there is only a big hole with some broken stones where it stood.",
f: "It stood for about 1,500 years; earthquakes between the twelfth and fifteenth centuries brought it down. From 1494 the Knights of St John (the Hospitallers) used its stones to strengthen their Castle of St Peter in the harbour, and burned much of its marble for lime; carved slabs can still be seen built into the castle walls. Charles Newton excavated the site in 1856-57 and sent sculptures to the British Museum: frieze slabs, a colossal horse from the chariot, and two great standing figures often called Mausolus and Artemisia (who they really show is not certain). Today the site is a quiet open-air museum: the cut of the foundations, the stair and the drains, and scattered blocks." },
know: { y: "The Roman writer Pliny described it. Then an archaeologist called Charles Newton found the spot and dug up pieces of the statues, horses and carvings, which you can still see in a museum.",
f: "Pliny and Vitruvius give its measurements and makers, and a book the architects wrote about it is mentioned but lost. Newton's dig (A History of Discoveries at Halicarnassus, 1862-63, public domain) located it by matching Pliny's description to buried foundations, and Danish excavations from 1966 to 1977 under Kristian Jeppesen studied it again. Pliny's numbers are hard to fit together exactly, so every reconstruction of the Mausoleum (including this one) is a careful best guess built from his words and the stones found." }
},
colossus: {
history: { y: "The people of Rhodes won a war, so they built a giant bronze statue of their sun god, Helios, to say thank you. It was about as tall as a ten-storey building. It only stood for about 54 years before an earthquake knocked it down.",
f: "In 305-304 BC Demetrius Poliorcetes ('the Besieger') attacked Rhodes with the largest siege machines yet seen, including a nine-storey siege tower; after a year he gave up and sailed away, leaving his machines behind. The Rhodians sold them and, with the money, built a statue of their patron the sun god Helios. The sculptor was Chares of Lindos, a pupil of the great Lysippus. It took twelve years and was finished about 280 BC. It was about 70 cubits, roughly 33 m, high: the tallest statue of the ancient world. About 226 BC an earthquake snapped it at the knees, and it fell. An oracle told the Rhodians not to raise it again (Strabo, Book 14, 2.5), and it lay where it fell for about 800 years." },
build: { y: "Workers made an iron frame, like a skeleton, and filled parts of it with heavy stones. Then they covered it with plates of bronze. As it got taller, they piled earth around it to make a hill to stand on, and took the hill away at the end.",
f: "The account credited to Philo of Byzantium says it took 500 talents of bronze and 300 of iron (roughly 15 and 9 tonnes), on a base of white marble. Its skeleton was iron bars and great stones inside, with the bronze skin cast in sections and fixed on. Philo says the builders heaped an earth mound round the statue as it rose, working on top of the mound for each new stage, then dug it all away at the end. Pliny (Book 34, 18) says that, lying broken, few people could put their arms round its thumb, its fingers were bigger than most statues, and through the broken limbs you could see great caverns inside, with the stones used to steady it. A statue that tall had to be balanced on its legs alone: one reason the legs were the part that failed." },
where: { y: "Rhodes is a sunny island in the Aegean Sea, in Greece. Its city had busy harbours full of ships. The Colossus stood near the harbour, where sailors could see it.",
f: "Rhodes is the largest of the Dodecanese islands, off the south-west coast of Asia Minor, now part of Greece. Its capital, at the north tip of the island, was a great trading port with several harbours, rich from shipping grain between Egypt and the Aegean. The statue stood near the harbour or on a height above the city; exactly where is still argued. The medieval Old Town of Rhodes, built by the Knights of St John, is a UNESCO World Heritage Site." },
nowthen: { y: "Many pictures show the Colossus standing with one foot on each side of the harbour, with ships sailing between its legs. That is a myth! It would have been impossible to build, and no old writer says it. Nothing of the statue is left today.",
f: "The famous picture of the Colossus straddling the harbour mouth, ships passing between its legs, comes from medieval and Renaissance imaginations, not ancient sources. With its legs 400 m apart over water it could not have been built or stood, and when it fell it would have blocked the harbour for centuries; ancient writers say it lay on land. The ruins remained a tourist sight for centuries. In AD 653-654, an Arab force under Muawiya took Rhodes, and the chronicler Theophanes says the bronze was sold to a merchant, who needed 900 camels to carry it away. Nothing has been found since. It still inspires: Emma Lazarus' poem on the Statue of Liberty is called 'The New Colossus' (1883)." },
know: { y: "Writers like Pliny saw the broken statue lying on the ground and wrote about how huge it was. No picture made while it stood has survived, so artists today must use clues to guess what it looked like.",
f: "Our knowledge rests on writers: Strabo, Pliny and Philo for its size and making, and the poem of dedication preserved in the Greek Anthology. No drawing made while it stood survives. Its looks are reconstructed from Rhodian coins, which show Helios' head with a crown of sun rays, and from other statues of the god; whether it held a torch, shaded its eyes, or held a cloak is unknown. Claims of finds on the seabed have so far proved to be something else. When the evidence is this thin, honest reconstructions say what is known and what is guessed: ours is a guess, in a pose of a kind Greek bronzes really used." }
},
pharos: {
history: { y: "The Lighthouse of Alexandria was a very tall tower on a small island called Pharos, beside the great city of Alexandria in Egypt. At night a fire burned at the top to guide ships safely into the harbour. It stood for over 1,500 years!",
f: "Alexander the Great founded Alexandria in 331 BC; after his death his general Ptolemy became king of Egypt, and the city became the capital of the Ptolemies, home of the great Library and Museum. The lighthouse was begun under Ptolemy I and finished under his son Ptolemy II Philadelphus about 280 BC, on the island of Pharos, joined to the city by a causeway seven stadia long (the Heptastadion, about 1.2 km). Its builder, or the courtier who paid for it, was Sostratus of Cnidus. The coast here is low and featureless, with reefs: a high tower, seen by day and lit by night, guided ships into one of the busiest ports on earth. It was the last of the Seven Wonders to be built." },
build: { y: "It was built in three parts, one on top of the other: a square bottom, an eight-sided middle, and a round top where the fire burned. Inside was a long sloping ramp, so animals could carry wood all the way up for the fire.",
f: "Descriptions agree on three tiers: a tall square base with a slight taper, an octagonal middle and a cylindrical top carrying the lantern, crowned by a statue (probably Zeus Soter, Zeus the Saviour, though Poseidon and Helios have also been suggested). Estimates of its height run from about 100 to 130 m, making it one of the tallest buildings in the world for centuries. Later Arab visitors describe a broad spiral ramp inside the square tier, wide enough for loaded animals to carry fuel, and many rooms off it. A fire burned at the top by night; by day, some writers say, a great polished mirror reflected the sun. Stories that the mirror could set ships on fire are legends. The building was of stone blocks, some bonded with molten lead against the sea and earthquakes." },
where: { y: "Alexandria is a big city on the Mediterranean Sea in Egypt, where the River Nile meets the sea. The island of Pharos is now joined to the land, and a fort stands where the lighthouse once stood.",
f: "Alexandria lies on Egypt's Mediterranean coast, west of the Nile delta, on a strip between the sea and Lake Mareotis. The Heptastadion causeway between city and island divided the bay into two harbours; over the centuries silt built up on both sides of it until Pharos became part of the mainland. The tower stood at the island's eastern tip, at the entrance to the Great Harbour, where the Citadel of Qaitbay stands today." },
nowthen: { y: "Earthquakes slowly broke the lighthouse. About 550 years ago, a sultan built a strong fort in the same spot, using some of its stones. Divers have found huge blocks and statues from it lying under the sea.",
f: "It survived, repaired many times, for over 1,500 years. Earthquakes in 956, 1303 and 1323 shattered it; the traveller Ibn Battuta found it too ruined to enter on his second visit in 1349. In 1477-1480 the Mamluk sultan Qaitbay built a fort on its foundations, using some of the fallen stone. From 1994 a French team led by Jean-Yves Empereur mapped thousands of blocks, columns, sphinxes and colossal statues on the harbour floor beside the fort, some probably from the lighthouse. Its name lives on: 'pharos' became the word for lighthouse in many languages (French phare, Italian, Spanish and Portuguese faro, farol)." },
know: { y: "The Greek writer Strabo saw it and wrote about it. Later, travellers from the Arab world climbed inside it and described the ramp and rooms. Pictures of it are on old Roman coins from Alexandria.",
f: "Strabo, who lived in Alexandria about 25 BC, describes it and records its dedication by Sostratus 'to the Saviour Gods, on behalf of those who sail the seas' (Geography, Book 17, 1.6). Lucian tells the tale that Sostratus carved his own name in the stone and covered it with plaster bearing the king's, knowing the plaster would fall away in time. Roman coins of Alexandria show the tower, and a small stone lighthouse at Abusir west of the city may copy it. The fullest descriptions are by later Arab and Andalusian visitors who measured and climbed it, such as Ibn Jubayr (1183) and the scholar al-Balawi. Hermann Thiersch's study 'Pharos' (1909, public domain) gathered all the evidence into the reconstruction most later ones follow." }
}
};
var WND_HALL_LESSONS = [
{ k: "seven", t: "What are the Seven Wonders?", y: "Long ago, Greek travellers made lists of the most amazing things people had built. The favourite list had seven. Seven was a special number for the Greeks. Only one of the seven, the Great Pyramid, is still standing.",
f: "The Greeks did not call them 'wonders' at first but theamata: 'things to be seen', the must-sees of the world they knew, round the eastern Mediterranean and Mesopotamia. After Alexander the Great's conquests Greek travellers could reach Egypt and Babylon, and writers made lists of sights. Seven was a meaningful number (the five planets with the Sun and Moon). The list was not fixed for a long time: the poet Antipater of Sidon (about 140 BC, Greek Anthology, Book 9, 58) included the Walls of Babylon and left out the Lighthouse; later lists added the Lighthouse in their place. The list we use was settled in the Renaissance." },
{ k: "time", t: "The timeline", y: "The Great Pyramid is very, very old. It was already about 2,000 years old when the other six were built! The Colossus stood for only 54 years. The Lighthouse stood for more than 1,500.",
f: "The Pyramid (about 2560 BC) is older than all the others by about 2,000 years: the people of Greece who listed it lived closer in time to us than to Khufu. All seven never stood at once: the first Temple of Artemis burned in 356 BC, before the Colossus and the Lighthouse were built, and the Colossus stood only about 54 years (about 280 to 226 BC). Lifespans: Colossus about 54 years; Gardens unknown; Zeus about 900 years; Artemis (the rebuilt temple) about 600; Mausoleum about 1,700; Lighthouse about 1,600; the Pyramid 4,500 years and counting." },
{ k: "evidence", t: "How historians know", y: "Historians are like detectives. They read what old writers said, look at what archaeologists dig up, and check if the clues agree. When clues are missing, a good historian says, 'We don't know yet.'",
f: "Primary sources are made at the time (an inscription, a coin, a papyrus, the building itself). Secondary sources are written later about the past (Pliny describing a temple built 600 years before). For each wonder, ask: who described it, did they see it, how long after, did they have a reason to exaggerate, and does the archaeology agree? The Pyramid is measured directly; the Gardens rest only on late writers; the Colossus' looks rest on coins and guesses. Telling the known from the guessed is the first skill of history." }
];
var WND_QUIZ = {
pyramid: [
["For which king was the Great Pyramid built?", "Khufu (Cheops)", "Tutankhamun", "Ramesses II"],
["About when was it finished?", "About 2560 BC", "About 560 BC", "About AD 100"],
["About how many stone blocks are in it?", "About 2.3 million", "About 23,000", "About 230 million"],
["What did workers pour in front of a sledge to make it slide more easily?", "Water on the sand", "Olive oil on the stones", "Honey on the wood"],
["What covered the outside of the pyramid when it was new?", "Polished white Tura limestone", "Gold leaf", "Painted blue tiles"],
["Why is it shorter today than when it was built?", "Its capstone and top stones are gone", "It sank into the sand", "Wind wore it down by half"],
["What is in the King's Chamber today?", "An empty granite coffer", "Khufu's mummy", "Nothing at all, not even a coffer"],
["What did Egyptians call a measure of a slope?", "A seked", "A cubit-angle", "A degree"],
["What did the 2013 Wadi al-Jarf papyri record?", "A boat crew shipping limestone to Giza", "Spells for the king's mummy", "A list of slaves' names"],
["What does the evidence show about the workers?", "They were organised, fed and housed workers", "They were all prisoners of war", "Nobody worked on it: it was built by machines"]
],
gardens: [
["Which king of Babylon is said to have built the gardens?", "Nebuchadnezzar II", "Hammurabi", "Khufu"],
["For whom, the story says?", "His wife Amytis, who missed her green mountains", "His mother, who loved flowers", "The god Marduk"],
["Beside which river did Babylon stand?", "The Euphrates", "The Nile", "The Danube"],
["In which modern country are Babylon's ruins?", "Iraq", "Egypt", "Greece"],
["How did writers say the water reached the top?", "Lifted from the river by machines worked by people", "It rained every day", "Slaves carried it on their heads"],
["What was laid under the soil to keep water out of the brickwork?", "Reeds in bitumen, baked brick and lead", "Glass and sand", "Nothing: the bricks were waterproof"],
["Which famous visitor to Babylon never mentions the gardens?", "Herodotus", "Pliny", "Alexander the Great"],
["Where do some scholars think the gardens really were?", "Nineveh, built by Sennacherib", "Athens", "Alexandria"],
["What did Koldewey find that he thought were the gardens?", "Vaulted rooms, now thought to be storerooms", "A pool of gold", "The roots of the old trees"],
["What makes this wonder different from the other six?", "Nobody is sure it existed", "It is still standing", "It was built of iron"]
],
artemis: [
["Which goddess was the temple built for?", "Artemis", "Athena", "Hera"],
["In which city did it stand?", "Ephesus", "Athens", "Sparta"],
["Which rich king helped pay for the first great temple?", "Croesus of Lydia", "Darius of Persia", "Ptolemy of Egypt"],
["How many columns did Pliny say it had?", "127", "36", "12"],
["How did Chersiphron move the heavy column shafts?", "Pins in the ends, so oxen rolled them", "On boats down a canal", "He broke them into pebbles"],
["Who burned the temple in 356 BC, and why?", "Herostratus, to become famous", "An enemy army, to win a war", "Lightning, during a storm"],
["What did the Ephesians answer when Alexander offered to pay?", "It was not fitting for a god to give offerings to gods", "Yes, gladly", "They asked for twice as much"],
["Why was the temple built on marshy ground?", "To protect it from earthquakes", "Because it was cheaper", "To be near the fish market"],
["What stands on the site today?", "One rebuilt column", "The whole temple, restored", "A modern hotel"],
["Who found the site again in 1869?", "John Turtle Wood", "Howard Carter", "Heinrich Schliemann"]
],
zeus: [
["Who made the Statue of Zeus?", "Phidias", "Chares of Lindos", "Leonardo da Vinci"],
["What were the statue's skin and robe made of?", "Ivory and gold over wood", "Bronze and iron", "Painted clay"],
["What games were held at Olympia?", "The Olympic Games", "The Roman circus races", "The Pythian Games only"],
["What did Zeus hold in his right hand?", "A figure of winged Victory (Nike)", "A thunderbolt", "A lyre"],
["What was the pool in front of the statue filled with?", "Olive oil", "Sea water", "Wine"],
["What did Strabo say would happen if Zeus stood up?", "He would lift the roof off", "He would walk to Athens", "The statue would crack"],
["What was found in Phidias' workshop?", "A cup saying 'I belong to Pheidias'", "The statue's golden head", "Phidias' own grave"],
["Which writer saw the statue about AD 170 and described it?", "Pausanias", "Herodotus", "Homer"],
["What probably happened to the statue?", "Taken to Constantinople and burned in a fire", "It is in a museum in Paris", "It sank in the sea"],
["What brought down the Temple of Zeus?", "Earthquakes", "A volcano", "Lightning, the god's own"]
],
mausoleum: [
["Who was the Mausoleum built for?", "Mausolus, ruler of Caria", "Alexander the Great", "King Minos"],
["Who carried on the building after he died?", "Artemisia, his wife and sister", "His enemies", "The Roman army"],
["What English word comes from his name?", "Mausoleum: any grand tomb", "Museum", "Monument"],
["What stood on the very top?", "A four-horse chariot", "A lighthouse fire", "A golden eagle"],
["How many steps did its pyramid roof have, says Pliny?", "24", "7", "100"],
["How many sculptors each carved one side?", "Four", "Two", "Seven"],
["What is Halicarnassus called today?", "Bodrum, in Turkey", "Athens, in Greece", "Cairo, in Egypt"],
["Who used its stones to build a castle?", "The Knights of St John", "The Pharaohs", "Napoleon"],
["Who dug it up in 1856-57?", "Charles Newton", "John Turtle Wood", "Flinders Petrie"],
["Which famous historian was born in Halicarnassus?", "Herodotus", "Pliny", "Strabo"]
],
colossus: [
["Which god did the Colossus show?", "Helios, the sun god", "Zeus", "Poseidon"],
["What paid for it?", "Selling the siege machines an enemy left behind", "A tax on olives", "Gold from Egypt"],
["Who was its sculptor?", "Chares of Lindos", "Phidias", "Scopas"],
["About how tall was it?", "About 33 m", "About 3 m", "About 330 m"],
["What was its skin made of?", "Bronze plates", "Gold leaf", "Painted marble"],
["How did builders reach the top as it rose?", "They heaped an earth mound round it", "They used cranes with engines", "They flew on kites"],
["What knocked it down about 226 BC?", "An earthquake", "A war", "A storm at sea"],
["Did it stand with a foot on each side of the harbour?", "No, that is a later myth", "Yes, ships sailed between its legs", "Yes, but only at low tide"],
["What did Pliny say about its fallen thumb?", "Few people could put their arms round it", "It was made of gold", "It was stolen"],
["Which modern statue's poem is called 'The New Colossus'?", "The Statue of Liberty", "Christ the Redeemer", "The Motherland Calls"]
],
pharos: [
["In which city was the Lighthouse?", "Alexandria, Egypt", "Rhodes, Greece", "Rome, Italy"],
["What was the island it stood on called?", "Pharos", "Delos", "Crete"],
["What were its three tiers?", "Square, then eight-sided, then round", "Round, round, round", "Triangle, square, round"],
["What burned at the top by night?", "A fire", "Electric lamps", "A giant candle of wax"],
["Who built or dedicated it?", "Sostratus of Cnidus", "Archimedes", "Ptolemy's cook"],
["How did animals carry fuel up, say later visitors?", "Up a wide spiral ramp inside", "In baskets on ropes", "They did not: fuel was dropped by birds"],
["What joined Pharos island to the city?", "The Heptastadion causeway", "A floating bridge", "A tunnel under the sea"],
["What destroyed it in the end?", "Earthquakes", "A great fire", "Pirates"],
["What stands on its site now?", "The Citadel of Qaitbay", "A modern lighthouse of glass", "Nothing but sea"],
["Which word comes from its name?", "Lighthouse, in many languages (phare, faro)", "Pharmacy", "Farm"]
]
};
var WND_GUIDES = {
antipater: { n: "Antipater of Sidon", site: "hall", sex: "m", age: 55, look: { top: 0xE8E0CC, bottom: 0xE8E0CC, hair: 0xB8B0A8 }, title: "Poet",
g: "A Greek poet of the second century BC, from Sidon in Phoenicia, famous for epigrams and for improvising verse. His epigram in the Greek Anthology (Book 9, 58) lists the sights he had seen: the walls of Babylon, the Zeus by the Alpheios, the Hanging Gardens, the Colossus of the Sun, the pyramids, the tomb of Mausolus, and above them all the house of Artemis. His list has the Walls of Babylon and not the Lighthouse; later lists swapped them. Cicero mentions him as a gifted improviser.",
hi: "Welcome, traveller. Seven sights I set in verse, and the house of Artemis I put above them all. Which shall we speak of?" },
callimachus: { n: "Callimachus of Cyrene", site: "hall", sex: "m", age: 45, look: { top: 0xD8D0B8, bottom: 0x8A7A5A, hair: 0x3A2A1A }, title: "Scholar",
g: "A poet and scholar (about 310-240 BC) who worked at the Library of Alexandria under Ptolemy II. He made the Pinakes, a great catalogue of Greek writers, a forerunner of library catalogues. Among his many works was 'A Collection of Wonders in Lands throughout the World', now lost. He preferred short, polished poems to long epics ('a big book is a big evil').",
hi: "Ah, a reader. I keep lists, you know: of books, of writers, of the wonders of every land. Ask, and I shall tell you which source says what." },
hemiunu: { n: "Hemiunu", site: "pyramid", sex: "m", age: 50, look: { top: 0xF0EAD8, bottom: 0xF0EAD8, skin: 0x9A6A44, hair: 0x1A1410 }, title: "Vizier",
g: "Vizier (chief minister) of Egypt under King Khufu, about 2580 BC, and overseer of all the king's works; most Egyptologists think he was in charge of building the Great Pyramid. A royal prince, probably Khufu's nephew. His tomb (mastaba G 4000) is in the West Field at Giza; his seated limestone statue, found there in 1912, is in the Roemer- und Pelizaeus-Museum, Hildesheim, Germany. Speak as an Old Kingdom official would understand the world: maat (order and right), the king as son of Ra, the work gangs, the quarries at Tura and Aswan, the Nile flood. You never saw Greeks, Romans or later ages; if asked about them, say you cannot know them, and stay honest that much about how the pyramid was built is unknown to the visitor's people.",
hi: "Peace be upon you. You stand at the Horizon of Khufu. I oversaw all the works of His Majesty. What would you know of how it rose?" },
herodotus: { n: "Herodotus", site: "pyramid", sex: "m", age: 40, look: { top: 0xE0D8C4, bottom: 0x6A5A40, hair: 0x4A3A2A }, title: "Historian",
g: "Greek historian (about 484-425 BC) from Halicarnassus, called the father of history. He travelled in Egypt about 450 BC and wrote in Book 2 of his Histories (Rawlinson's 1858 and Macaulay's 1890 translations are public domain) what priests and guides told him: 100,000 men in three-month shifts for twenty years, ten years for the causeway, an inscription on the pyramid recording what the workers ate in radishes, onions and garlic. He also described Babylon in Book 1 (without the gardens). He is a curious, talkative storyteller who says plainly when he only reports what he was told and does not believe it all.",
hi: "Greetings! I asked the priests of Memphis about this very mountain of stone. Shall I tell you what they told me, and what I believed of it?" },
berossus: { n: "Berossus", site: "gardens", sex: "m", age: 55, look: { top: 0x6A4A8A, bottom: 0x6A4A8A, hair: 0x1A1410, skin: 0xA87A54 }, title: "Priest of Bel",
g: "A Babylonian priest of Bel-Marduk who wrote a history of Babylonia in Greek, the Babyloniaca, about 290 BC, dedicated to the Seleucid king Antiochus I. Only fragments survive, quoted by later writers such as Josephus (Against Apion, Book 1, 19-20, Whiston's 1737 translation is public domain). He is the source of the story that Nebuchadnezzar built the hanging garden for his Median queen, who longed for her mountains. He knows Babylon's temples, the Esagila and the ziggurat Etemenanki, the Ishtar Gate and the Processional Way, the cuneiform tablets and the stars. Be honest that he lived about 300 years after Nebuchadnezzar and that no Babylonian inscription mentions the gardens.",
hi: "Welcome to Babylon, gate of the gods. I have read the old tablets of the temple of Bel. You have come about the king's garden: let me tell you what is written, and what is not." },
chersiphron: { n: "Chersiphron of Knossos", site: "artemis", sex: "m", age: 55, look: { top: 0xD8CCB0, bottom: 0x7A6A4A, hair: 0x8A8078 }, title: "Architect",
g: "Cretan architect of the first great marble Temple of Artemis at Ephesus (begun about 550 BC), with his son Metagenes; together they wrote a book about it, now lost. Vitruvius (On Architecture, Book 10, 2, 11-12; Gwilt 1826 and Morgan 1914 translations are public domain) records his way of moving column shafts: iron pivots in the ends and a wooden frame so oxen rolled them along. Pliny (Book 36, 21) gives the temple's size and says the architect nearly despaired over setting the huge lintel over the doorway, until the goddess set it in a dream. He is proud, practical, and fascinated by every engineering problem. He did not live to see the fire of 356 BC; he can speak of it only as a visitor's news.",
hi: "Mind the mud! The goddess chose a marsh, and a marsh it is. I am Chersiphron, who builds her house. Have you come to see how we move the columns?" },
phidias: { n: "Phidias", site: "zeus", sex: "m", age: 55, look: { top: 0xC8B898, bottom: 0x6A5A40, hair: 0x6A6058 }, title: "Sculptor",
g: "Athenian sculptor (about 480-430 BC), the most famous of Greece: he oversaw the Parthenon's sculptures and made its Athena Parthenos, then went to Olympia and made the Zeus about 435 BC in a workshop the size of the temple's cella. A cup found there in the 1950s is inscribed 'I belong to Pheidias'. Ancient stories say he was accused in Athens of stealing gold and of carving his own face on Athena's shield; the stories differ and may be enemies' slander. He works in ivory, gold, ebony and bronze, and says he took Zeus' look from Homer's lines where Zeus nods and Olympus shakes (Iliad 1).",
hi: "Careful, the floor is slick with oil: it keeps the ivory from cracking. I am Phidias. You have come to see the god. Look up, slowly." },
pausanias: { n: "Pausanias", site: "zeus", sex: "m", age: 50, look: { top: 0xA89878, bottom: 0x5A4A30, hair: 0x5A4A3A }, title: "Traveller",
g: "Greek traveller and geographer of the second century AD, who wrote the Description of Greece (Frazer's 1898 translation is public domain). Book 5, 10-11, describes the Temple of Zeus and the statue: the Victory in Zeus' hand, the sceptre with its eagle, the gold robe worked with animals and lilies, the throne of gold, stones, ebony and ivory, the oil pool, the barriers painted by Panaenus. He saw it about AD 170, 600 years after it was made. He is careful, loves old stories and inscriptions, and says when he could not measure something himself.",
hi: "Good day. I write down what a traveller sees in Greece, and nothing in Greece is greater than this. I have measured what I could. Ask me what is on the throne." },
artemisia: { n: "Artemisia II of Caria", site: "mausoleum", sex: "f", age: 45, look: { top: 0x6A2A4A, bottom: 0x6A2A4A, hair: 0x2A1A12 }, title: "Queen",
g: "Queen of Caria, sister and wife of Mausolus, who ruled after him from 353 to 351 BC and drove on the building of his tomb. Vitruvius tells how she defeated a Rhodian fleet that came to seize Halicarnassus after Mausolus' death, by a clever ambush from a hidden harbour, then sailed to Rhodes in the enemy's own ships. Roman writers say she mixed his ashes into her drink and died of grief: treat that as a legend. She held contests of speeches in his honour. She is regal, grieving, sharp and proud of Caria, speaking Greek but ruling for Persia's king. Not to be confused with the earlier Artemisia I who fought at Salamis.",
hi: "You stand before the tomb of my husband and brother, Mausolus. The finest sculptors of Greece carve it, side by side. Ask, and I will tell you why." },
pytheos: { n: "Pytheos", site: "mausoleum", sex: "m", age: 50, look: { top: 0xD0C4A8, bottom: 0x6A5A40, hair: 0x5A4A3A }, title: "Architect",
g: "Greek architect of the fourth century BC who designed the Mausoleum with Satyros (Vitruvius, Book 7, preface) and the Temple of Athena at Priene, a model Ionic temple. He wrote books on architecture and held that an architect should know every art and science (Vitruvius, Book 1, 1.12, disagrees with him a little). He thinks in proportions and grids, and explains the Mausoleum's three parts: the podium, the colonnade, the stepped pyramid with the chariot.",
hi: "Welcome. Podium, colonnade, pyramid, chariot: four parts, one idea. I am Pytheos. Shall I show you how the numbers fit?" },
chares: { n: "Chares of Lindos", site: "colossus", sex: "m", age: 45, look: { top: 0x9A7A5A, bottom: 0x5A4A30, hair: 0x2A2018 }, title: "Sculptor",
g: "Sculptor from Lindos on Rhodes, pupil of the great bronze sculptor Lysippus, who made the Colossus of Helios (about 292-280 BC). Little is known of his life; a late story says he made a mistake in his figures, ran out of money and took his own life, but that is doubtful and must never be told to children; avoid it unless asked by an adult, and say it is an unreliable late tale. He knows bronze casting by sections, iron frames, the earth mound, the siege of Demetrius and the selling of his engines. Be honest that how the statue posed is not known.",
hi: "Bronze, iron and stone, and twelve years of my life. I am Chares. You want to know how a man makes a god seventy cubits tall? Come up the mound." },
pliny: { n: "Pliny the Elder", site: "colossus", sex: "m", age: 55, look: { top: 0xE8E2D2, bottom: 0xE8E2D2, hair: 0x8A8478 }, title: "Natural historian",
g: "Roman writer and admiral (AD 23-79) whose Natural History in 37 books (Bostock and Riley's 1855 translation is public domain) gathers what he had read on everything. He describes the fallen Colossus (Book 34, 18), the Temple of Artemis (36, 21), the Mausoleum (36, 30-31) and the pyramids (36, 16-17), mostly from older books. He died at Vesuvius in AD 79, sailing in to rescue people and to look closer. He is endlessly curious, a little credulous, and fond of numbers; he says when he is quoting others.",
hi: "Even lying on the ground it is a marvel: see, few men can put their arms round the thumb. Gaius Plinius Secundus. Ask me anything; I have read nearly everything." },
sostratus: { n: "Sostratus of Cnidus", site: "pharos", sex: "m", age: 50, look: { top: 0xD8D0BC, bottom: 0x4A5A6A, hair: 0x6A6058 }, title: "Builder",
g: "Courtier of the Ptolemies, from Cnidus, named on the lighthouse's dedication: 'Sostratus of Cnidus, son of Dexiphanes, to the Saviour Gods, on behalf of those who sail the seas' (Strabo, Book 17, 1.6). Whether he was the architect or the man who paid for it is debated. Lucian tells the tale that he carved his name in the stone and covered it with plaster bearing the king's name; treat it as a story. He knows the Heptastadion, the reefs of the coast, the three tiers, the ramp, the fire, Alexandria's Library and the Ptolemies Ptolemy I and II.",
hi: "Look up! The tallest tower men have raised by the sea. I am Sostratus. Every ship that comes home safe is my reward. Shall we climb?" },
strabo: { n: "Strabo", site: "pharos", sex: "m", age: 40, look: { top: 0xC8BCA0, bottom: 0x6A5A40, hair: 0x4A3A2A }, title: "Geographer",
g: "Greek geographer and historian (about 64 BC-AD 24) from Amaseia in Pontus, who lived in Alexandria for some years about 25 BC and wrote the Geography in 17 books (Hamilton and Falconer's 1854-57 translation is public domain). He describes Alexandria, Pharos and its tower (Book 17, 1.6), the hanging garden of Babylon (16, 1.5), Ephesus (14, 1.22), the Colossus lying broken (14, 2.5) and Olympia's Zeus nearly touching the roof (8, 3.30). He is precise about geography and fond of explaining why places are where they are.",
hi: "I have walked every street of Alexandria, from the Gate of the Sun to the Gate of the Moon. Ask me where things are and why, and I will draw you a map in words." }
};
var WND_SOURCES = [
["Herodotus", "about 484-425 BC", "Histories (Rawlinson 1858; Macaulay 1890)", "The pyramids (Book 2, 124-127); Babylon (Book 1, 178-187), with no gardens"],
["Callimachus", "about 310-240 BC", "A Collection of Wonders (lost)", "One of the first books of wonders; only its title survives"],
["Antipater of Sidon", "about 140 BC", "Greek Anthology, Book 9, 58 (Paton 1917)", "The poem that lists the Seven, with the Walls of Babylon instead of the Lighthouse"],
["Diodorus Siculus", "about 90-30 BC", "Library of History (Booth 1700, 1814)", "The Hanging Gardens (Book 2, 10); the pyramids (Book 1, 63)"],
["Strabo", "about 64 BC-AD 24", "Geography (Hamilton and Falconer 1854-57)", "The Pharos, the Gardens, Ephesus, the fallen Colossus, Zeus at Olympia"],
["Vitruvius", "about 80-15 BC", "On Architecture (Gwilt 1826; Morgan 1914)", "Chersiphron's rollers; the Mausoleum's architects"],
["Josephus", "AD 37-about 100", "Against Apion (Whiston 1737)", "Quotes Berossus on Nebuchadnezzar's garden"],
["Pliny the Elder", "AD 23-79", "Natural History (Bostock and Riley 1855)", "The Colossus, the Temple of Artemis, the Mausoleum, the pyramids"],
["Pausanias", "about AD 110-180", "Description of Greece (Frazer 1898)", "The Statue of Zeus and its throne (Book 5, 10-11)"],
["Lucian", "about AD 125-180", "How to Write History (Fowler 1905)", "The story of Sostratus and his hidden name"],
["Flinders Petrie", "1853-1942", "The Pyramids and Temples of Gizeh (1883)", "The first exact survey of the Great Pyramid"],
["John Turtle Wood", "1821-1890", "Discoveries at Ephesus (1877)", "How the Temple of Artemis was found"],
["Charles Newton", "1816-1894", "A History of Discoveries at Halicarnassus (1862)", "Digging up the Mausoleum"],
["Hermann Thiersch", "1874-1939", "Pharos (1909)", "The reconstruction of the Lighthouse most later ones follow"]
];
var WND_TIME = [
["about 2560 BC", "The Great Pyramid of Giza is finished for King Khufu"], ["about 600 BC", "Nebuchadnezzar II rebuilds Babylon (the gardens, the story says)"], ["about 550 BC", "The first great marble Temple of Artemis is begun"],
["776 BC", "The first Olympic Games, by tradition"], ["about 435 BC", "Phidias makes the Statue of Zeus"], ["about 450 BC", "Herodotus visits Egypt and Babylon"], ["356 BC", "Herostratus burns the Temple of Artemis"],
["about 350 BC", "The Mausoleum at Halicarnassus is finished"], ["331 BC", "Alexander the Great founds Alexandria"], ["304 BC", "The siege of Rhodes fails"], ["about 280 BC", "The Colossus and the Lighthouse are finished"],
["about 226 BC", "An earthquake throws down the Colossus"], ["about 140 BC", "Antipater of Sidon writes his list"], ["AD 79", "Pliny dies at Vesuvius"], ["AD 268", "Goths damage the Temple of Artemis"],
["about AD 475", "The Statue of Zeus burns in Constantinople"], ["AD 653", "The fallen Colossus is sold for scrap"], ["1303 and 1323", "Earthquakes shatter the Lighthouse; the Pyramid's casing loosened"],
["1494-1522", "The Mausoleum's stones go into Bodrum's castle"], ["1477-1480", "Qaitbay's fort rises on the Lighthouse's site"], ["1869", "The Temple of Artemis is found again"], ["1883", "Petrie's survey of the Pyramid"], ["1994", "Divers map the Lighthouse's stones in the harbour"], ["2013", "The oldest papyri found: Merer's logbook of the Pyramid"]
];
WND_TIME.sort(function (a, b) { function y(s) { var m = /(\d+)/.exec(s), n = m ? +m[1] : 0; return /BC/.test(s) ? -n : n; } return y(a[0]) - y(b[0]); });
var WND_LATER = [
["wall", "The Great Wall of China", "Northern China", "700s BC to AD 1600s (most of what stands is Ming, 1368-1644)", "Not one wall but many walls built by different dynasties against raiders from the north; the Ming walls alone run about 8,850 km, and all the walls together about 21,000 km. It cannot be seen with the naked eye from the Moon.", "It is so long that walking all of it would take more than a year!", 0xA89878],
["petra", "Petra", "Jordan", "about 300 BC to AD 100", "Capital of the Nabataeans, desert traders in incense and spice, carved straight into rose-red sandstone cliffs, with dams and channels that stored flash-flood water. Its most famous front, the Treasury (al-Khazneh), is a tomb about 40 m high.", "A whole city carved out of pink rock!", 0xC87A5A],
["colosseum", "The Colosseum", "Rome, Italy", "AD 70-80", "The Flavian Amphitheatre, built under the emperors Vespasian and Titus, held perhaps 50,000 people for gladiator fights and animal hunts. Its arches, vaults and concrete set the pattern for stadiums ever since, and its 80 entrances let crowds in and out quickly.", "Today's football stadiums copy its idea.", 0xC8B490],
["chichen", "Chichén Itzá", "Yucatán, Mexico", "about AD 600-1200", "A great Maya city. Its pyramid, El Castillo (the Temple of Kukulcán), has 91 steps on each of four sides plus the top platform: 365, the days of the year. At the equinoxes the afternoon sun throws a shadow like a serpent down its stairs.", "At certain times of year a shadow snake slides down its steps!", 0xB8A880],
["machu", "Machu Picchu", "Andes, Peru", "about AD 1450", "An Inca estate built for the emperor Pachacuti on a ridge 2,430 m up, of stones cut to fit so tightly without mortar that a knife blade will not go between them, with terraces and drains that have held for over 500 years. Hiram Bingham brought it to the world's attention in 1911; local farmers already knew it.", "Its stones fit so tightly you can't slide a piece of paper between them.", 0x8A9A7A],
["taj", "The Taj Mahal", "Agra, India", "1632-1653", "A white marble tomb built by the Mughal emperor Shah Jahan for his wife Mumtaz Mahal, inlaid with flowers of semi-precious stones. Its four minarets lean very slightly outward, so that in an earthquake they would fall away from the tomb.", "Its white marble seems to change colour from pink at dawn to gold at sunset.", 0xF0ECE4],
["christ", "Christ the Redeemer", "Rio de Janeiro, Brazil", "1922-1931", "A statue 30 m tall on a pedestal of 8 m, arms spread 28 m wide, on Corcovado mountain 700 m above the city, made of reinforced concrete covered in a mosaic of thousands of small soapstone tiles.", "It is about as tall as the Colossus of Rhodes was!", 0xE8E4DC]
];
var WND_NATURAL = [
["canyon", "The Grand Canyon", "Arizona, USA", "Carved by the Colorado River over millions of years: up to 29 km wide and 1.8 km deep. Its layers of rock are a record of nearly two billion years of Earth's history.", "Each stripe of rock is a page in Earth's history book.", 0xC86A3A],
["reef", "The Great Barrier Reef", "Queensland, Australia", "The largest coral reef system on Earth, about 2,300 km long, built by billions of tiny animals called coral polyps; it can be seen from space. Warming seas cause coral bleaching that threatens it.", "It was built by tiny animals, smaller than your fingernail.", 0x3AB8C8],
["rio", "The Harbour of Rio de Janeiro", "Brazil", "A huge bay ringed by granite peaks such as Sugarloaf Mountain, shaped by erosion; Portuguese sailors arriving in January 1502 thought it was a river mouth and named it 'River of January'.", "Sailors named it the 'River of January', but it is a bay.", 0x3A8A5A],
["everest", "Mount Everest", "Nepal and China (Tibet)", "The highest mountain above sea level, 8,849 m, still rising a few millimetres a year as India pushes into Asia. Tenzing Norgay and Edmund Hillary first reached the top on 29 May 1953.", "It is still growing, a tiny bit each year!", 0xE8ECF4],
["aurora", "The Aurora (northern and southern lights)", "Near the North and South Poles", "Curtains of light in the night sky made when charged particles from the Sun hit the gases of our upper air: oxygen glows green and red, nitrogen blue and purple. They move slowly and softly.", "Sun particles make the sky glow green.", 0x6AE8A0],
["paricutin", "Parícutin", "Michoacán, Mexico", "A volcano that was born in a farmer's cornfield on 20 February 1943 and grew 336 m in its first year; the only volcano scientists have watched from its birth to its end (1952).", "A volcano that started in a cornfield!", 0x5A4A44],
["victoria", "Victoria Falls", "Zambia and Zimbabwe", "Where the Zambezi River drops about 108 m into a narrow gorge across a width of 1,708 m: one of the largest sheets of falling water in the world. Its local name, Mosi-oa-Tunya, means 'the smoke that thunders'.", "Its local name means 'the smoke that thunders'.", 0xA8D0E8]
];
var WND_QUIZ_LATER = [
["Which empire built most of the Great Wall that stands today?", "The Ming", "The Romans", "The Inca"],
["Petra was carved into what?", "Rose-red sandstone cliffs", "Ice", "White marble"],
["About how many people could the Colosseum hold?", "About 50,000", "About 500", "About 5 million"],
["How many steps does El Castillo at Chichén Itzá have, counting the top?", "365", "100", "7"],
["Who brought Machu Picchu to the world's attention in 1911?", "Hiram Bingham", "Howard Carter", "Marco Polo"],
["Who built the Taj Mahal, and for whom?", "Shah Jahan, for his wife Mumtaz Mahal", "Alexander, for his horse", "Khufu, for himself"],
["Why do the Taj Mahal's minarets lean slightly outward?", "So they would fall away from the tomb in an earthquake", "Because the ground sank", "To look like trees"],
["What is Christ the Redeemer covered in?", "Soapstone tiles", "Gold leaf", "Bronze plates"],
["Can the Great Wall be seen from the Moon with the naked eye?", "No", "Yes, easily", "Only at night"],
["Which of the ancient Seven was given honorary status in the 2007 vote?", "The Great Pyramid", "The Colossus", "The Lighthouse"]
];
var WND_QUIZ_NATURAL = [
["Which river carved the Grand Canyon?", "The Colorado", "The Nile", "The Amazon"],
["What built the Great Barrier Reef?", "Tiny coral polyps", "Volcanoes", "People"],
["How tall is Mount Everest?", "About 8,849 m", "About 849 m", "About 88,490 m"],
["Who first reached the top of Everest in 1953?", "Tenzing Norgay and Edmund Hillary", "Neil Armstrong", "Christopher Columbus"],
["What makes the aurora glow?", "Particles from the Sun hitting our upper air", "Moonlight on ice", "City lights"],
["Where was Parícutin volcano born?", "In a farmer's cornfield", "Under the sea", "On the Moon"],
["What does Mosi-oa-Tunya (Victoria Falls) mean?", "The smoke that thunders", "The big river", "The white wall"],
["Why is Rio de Janeiro called the 'River of January'?", "Sailors in January 1502 thought the bay was a river", "It only rains in January", "A king named January"],
["Which colour does oxygen make in the aurora?", "Green (and red)", "Orange", "Black"],
["What threatens the Great Barrier Reef?", "Warming seas and coral bleaching", "Too much ice", "Volcanoes"]
];
var WND_HALL = { x0: -32, x1: 32, z0: -22, z1: 22, h: 15 };
var WND_COL = { pyramid: "#C8A048", gardens: "#3A9A4A", artemis: "#3A6AC8", zeus: "#C8642A", mausoleum: "#8A4AA8", colossus: "#C88A2A", pharos: "#2A9AB8" };
function wndMapXZ(lon, lat) { return { x: lon - 30, z: 35 - lat }; }
var WND_GEO = { pyramid: [31.13, 29.98], gardens: [44.42, 32.54], artemis: [27.36, 37.95], zeus: [21.63, 37.64], mausoleum: [27.43, 37.04], colossus: [28.22, 36.45], pharos: [29.89, 31.21] };
function wndLand() { return __ZC(405, 16, this, arguments, new.target); }
function wndMapPaint(x, W, H) { return __ZC(405, 17, this, arguments, new.target); }
function wndHall() { return __ZC(405, 18, this, arguments, new.target); }
function wndLectern(x, z, ry) { var g = wndGroup(x, 0, z, ry), wd = wndMat(0x6A3A1A, "wood"); wndBox(0.5, 1.0, 0.4, wd, 0, 0.5, 0, g); var t = wndBox(0.8, 0.06, 0.6, wd, 0, 1.08, 0, g); t.rotation.x = -0.35; wndBox(0.6, 0.02, 0.45, wndMat(0xF4ECD8, null), 0, 1.13, 0.02, g).rotation.x = -0.35; wndRound(x, z, 0.35, 0, 1.2); return g; }
function wndHallWings() { return __ZC(405, 19, this, arguments, new.target); }
function wndLibrary() { return __ZC(405, 20, this, arguments, new.target); }
function wndTeachers() { return __ZC(405, 21, this, arguments, new.target); }
function wndTimeline() { return __ZC(405, 22, this, arguments, new.target); }
function wndTallPaint(x, W, Hh) { return __ZC(405, 23, this, arguments, new.target); }
function wndSevenPaint(x, W, Hh) { return __ZC(405, 24, this, arguments, new.target); }
function wndLater() { return __ZC(405, 25, this, arguments, new.target); }
var WND_MODELS = {
wall: function (g) { return __ZC(405, 26, this, arguments, new.target); },
petra: function (g) { return __ZC(405, 27, this, arguments, new.target); },
colosseum: function (g) { return __ZC(405, 28, this, arguments, new.target); },
chichen: function (g) { return __ZC(405, 29, this, arguments, new.target); },
machu: function (g) { return __ZC(405, 30, this, arguments, new.target); },
taj: function (g) { return __ZC(405, 31, this, arguments, new.target); },
christ: function (g) {
var r = wndMat(0x5A7A4A, "grass"), s = wndMat(0xE8E4DC, null);
var m = new THREE.Mesh(new THREE.ConeGeometry(0.7, 0.8, 7), r);
m.position.y = 0.4;
g.add(m);
wndBox(0.12, 0.08, 0.12, s, 0, 0.82, 0, g);
wndBox(0.1, 0.42, 0.08, s, 0, 1.07, 0, g);
wndBox(0.42, 0.06, 0.06, s, 0, 1.22, 0, g);
wndSph(0.05, s, 0, 1.32, 0, g, 8);
},
canyon: function (g) {
var cols = [0xC86A3A, 0xD8925A, 0xB85A3A, 0xE0A870, 0xA84A2A];
for (var i = 0; i < 5; i++) {
wndBox(0.6, 0.12, 1.5, wndMat(cols[i], null), -0.5, 0.06 + i * 0.12, 0, g);
wndBox(0.6, 0.12, 1.5, wndMat(cols[i], null), 0.5, 0.06 + i * 0.12, 0, g);
}
wndBox(0.18, 0.03, 1.5, wndMat(0x3A7A8A, null), 0, 0.02, 0, g);
},
reef: function (g) { return __ZC(405, 32, this, arguments, new.target); },
rio: function (g) { return __ZC(405, 33, this, arguments, new.target); },
everest: function (g) { return __ZC(405, 34, this, arguments, new.target); },
aurora: function (g) { return __ZC(405, 35, this, arguments, new.target); },
paricutin: function (g) { return __ZC(405, 36, this, arguments, new.target); },
victoria: function (g) { return __ZC(405, 37, this, arguments, new.target); }
};
function wndLaterCard(it, natural) { return __ZC(405, 38, this, arguments, new.target); }
function wndGuide(key, x, z, ry, o) { return __ZC(405, 39, this, arguments, new.target); }
function wndSystem(c) { return __ZC(405, 40, this, arguments, new.target); }
(function () {
if (typeof charSystem !== "function")
return;
var cs = charSystem;
charSystem = function (c) { if (c && c.wnd) {
try {
var s = wndSystem(c);
if (s)
return s;
}
catch (e) {
if (window.console)
console.warn("[wonders] voice", e);
}
} return cs.apply(this, arguments); };
})();
(function () {
if (typeof localVoice !== "function")
return;
var lv = localVoice;
localVoice = function (c, q) {
if (!(c && c.wnd))
return lv.apply(this, arguments);
try {
var Gd = WND_GUIDES[c.wnd], Ls = Gd.site === "hall" ? null : WND_LESSONS[Gd.site], pool = [];
if (Ls)
WND_LESSON_KEYS.forEach(function (k) { String(Ls[k[0]].f).split(". ").forEach(function (s) { if (s.length > 40)
pool.push(s.replace(/\.?$/, ".")); }); });
else
WND_HALL_LESSONS.forEach(function (L) { String(L.f).split(". ").forEach(function (s) { if (s.length > 40)
pool.push(s.replace(/\.?$/, ".")); }); });
if (String(q || "") === "hello")
return Gd.hi;
c.wndI = ((c.wndI || 0) + 1) % Math.max(1, pool.length);
return pool[c.wndI] || Gd.hi;
}
catch (e) {
return lv.apply(this, arguments);
}
};
})();
function wndTalk(key) { return __ZC(405, 41, this, arguments, new.target); }
function wndSiteBegin(key) { return __ZC(405, 42, this, arguments, new.target); }
function wndThen(key) { WNK.F = WND.vgroups[key].then; WNK.v = "then:" + key; }
function wndNowL(key) { WNK.F = WND.vgroups[key].now; WNK.v = "now:" + key; }
function wndAlways(key) { WNK.F = WND.vgroups[key].all; WNK.v = ""; }
function wndExtraL(key, v) { var V = WND.vgroups[key]; if (!V.extra[v]) {
V.extra[v] = wndGroup(0, 0, 0, 0, V.all);
V.extra[v].name = v;
} WNK.F = V.extra[v]; WNK.v = v + ":" + key; }
function wndViewShow(key) {
var V = WND.vgroups[key];
if (!V)
return;
var v = wndView(key);
V.then.visible = v === "then";
V.now.visible = v === "now";
for (var e in V.extra)
V.extra[e].visible = v === e;
}
function wndThenNow(key, x, z, ry, views) { return __ZC(405, 43, this, arguments, new.target); }
function wndThenNowCard(key, views) { return __ZC(405, 44, this, arguments, new.target); }
function wndSetView(key, v) { WND.view[key] = v; var p = wndProg(); p.view[key] = v; wndProgSave(); wndViewShow(key); if (WND.onView && WND.onView[key])
try {
WND.onView[key](v);
}
catch (e) { } }
var WND_PYR = { half: 115.15, h: 146.6, hNow: 138.5, ex: 7,
runs: [{ n: "The Descending Passage", x: 7, z0: -102.2, y0: 17, z1: -76.6, y1: 4.3, w: 1.5, h: 2.4 },
{ n: "The Descending Passage, down into the rock", x: 7, z0: -74.6, y0: 4.3, z1: -12.0, y1: -27.0, w: 1.5, h: 2.4 },
{ n: "The passage to the pit", x: 7, z0: -12.0, y0: -27.0, z1: -3.6, y1: -27.0, w: 1.5, h: 2.4 },
{ n: "The Ascending Passage", x: 8.75, z0: -74.6, y0: 4.3, z1: -41.6, y1: 20.4, w: 1.5, h: 2.4 },
{ n: "The passage to the Queen's Chamber", x: 11.0, z0: -39.6, y0: 20.4, z1: -2.8, y1: 20.4, w: 1.5, h: 2.4 },
{ n: "The Grand Gallery", x: 8.75, z0: -39.6, y0: 20.4, z1: 0.2, y1: 39.8, w: 2.2, h: 8.6, gal: 1 },
{ n: "The antechamber", x: 8.75, z0: 1.8, y0: 40.4, z1: 8.6, y1: 40.4, w: 1.5, h: 3.6 }],
rooms: [{ n: "The King's Chamber", x0: 2.5, x1: 13.0, z0: 8.6, z1: 13.8, y: 40.4, h: 5.8, granite: 1, door: 8.75 },
{ n: "The Queen's Chamber", x0: 8.1, x1: 13.9, z0: -2.8, z1: 2.4, y: 20.4, h: 4.7, gable: 6.2, door: 11.0 },
{ n: "The Subterranean Chamber", x0: 1.0, x1: 15.0, z0: -3.6, z1: 4.7, y: -27.0, h: 3.5, rough: 1, door: 7 },
{ n: "Where the passages part", x0: 6.0, x1: 9.75, z0: -76.6, z1: -74.6, y: 4.3, h: 2.4, land: 1, dn: [7], ds: [7, 8.75] },
{ n: "Where the passages part", x0: 7.9, x1: 12.0, z0: -41.6, z1: -39.6, y: 20.4, h: 2.4, land: 1, dn: [8.75], ds: [8.75, 11.0] }] };
function wndPyrIn(lx, lz, feet) { return __ZC(405, 45, this, arguments, new.target); }
function wndPyramid() { return __ZC(405, 46, this, arguments, new.target); }
function wndPyrInside() { return __ZC(405, 47, this, arguments, new.target); }
var WND_SLEDGE = { x: 150, z: -40, t: 0, len: 36, water: -1, pull: 0, go: 0 };
function wndSledge() { return __ZC(405, 48, this, arguments, new.target); }
function wndSledgeCard() { return __ZC(405, 49, this, arguments, new.target); }
function wndSledgeHaul(w) { return __ZC(405, 50, this, arguments, new.target); }
function wndSledgeTick(dt) { return __ZC(405, 51, this, arguments, new.target); }
function wndSekedCard() { return __ZC(405, 52, this, arguments, new.target); }
function wndSphinx(x, z) { return __ZC(405, 53, this, arguments, new.target); }
var WND_GDN = { tiers: [[-60, 6.25], [-30, 12.5], [0, 18.75], [30, 25]], x1: 60, z0: -60, z1: 60, screw: { on: 0, lit: 0, raised: 0, t: 0 } };
function wndGardens() { return __ZC(405, 54, this, arguments, new.target); }
function wndIshtarPaint(x, W, H) { return __ZC(405, 55, this, arguments, new.target); }
function wndIshtarGate(x, z, blue) { return __ZC(405, 56, this, arguments, new.target); }
function lite_seg() { return WND.lite ? 10 : 20; }
function wndLion(x, y, z, side) {
var m = wndCanvasMat("glaze-lion", 256, 128, wndGlazeLion, { full: 1, ds: 1 });
if (!m.transparent) {
m.transparent = false;
m.alphaTest = 0.5;
m.needsUpdate = true;
}
var p = wndPlane(2.6, 1.3, m, x, y, z, 0);
p.scale.x = side > 0 ? -1 : 1;
p.position.z += side * -0.02;
}
function wndScrewBuild() { return __ZC(405, 57, this, arguments, new.target); }
function wndScrewTurn() { return __ZC(405, 58, this, arguments, new.target); }
function wndScrewTick(dt) { return __ZC(405, 59, this, arguments, new.target); }
function wndArtemisCols() { return __ZC(405, 60, this, arguments, new.target); }
var WND_ART = { y: 2.4, colH: 18, roll: { t: 0, go: 0 } };
function wndArtemis() { return __ZC(405, 61, this, arguments, new.target); }
function wndArtemisStatue(x, y, z) { return __ZC(405, 62, this, arguments, new.target); }
function wndRoller(x, z) { return __ZC(405, 63, this, arguments, new.target); }
function wndRollerTick(dt) {
var R = WND_ART.roll;
if (!R.g || !R.go)
return;
R.t += dt;
var d = Math.min(30, R.t * 1.4);
R.g.position.x = R.x0 + d;
R.spin.rotation.z = -d / 0.95;
R.sol.x = WND_AT.artemis.x + R.x0 + d;
if (d >= 30) {
R.go = 0;
setTimeout(function () { if (R.g) {
R.g.position.x = R.x0;
R.sol.x = WND_AT.artemis.x + R.x0;
} }, 3000);
}
}
var WND_ZEUS = { y: 3, stand: 0, run: null };
function wndZeus() { return __ZC(405, 64, this, arguments, new.target); }
function wndZeusStatue(x, y, z, o) { return __ZC(405, 65, this, arguments, new.target); }
function wndZeusStand() { return __ZC(405, 66, this, arguments, new.target); }
function wndZeusTick(dt) { var Z = WND_ZEUS; if (Z.ghost && Z.stand > 0) {
Z.stand -= dt;
if (Z.stand <= 0)
Z.ghost.visible = false;
} wndRunTick(dt); }
function wndWorkshop(x, z, now) { return __ZC(405, 67, this, arguments, new.target); }
function wndStadium() { return __ZC(405, 68, this, arguments, new.target); }
function wndRunStart() { var R = WND_ZEUS.run; R.t = 0; R.on = 1; wndSay("🏃 <b>Go!</b> Run east down the track to the far line, 192 m. Coroebus of Elis won the first recorded race here in 776 BC."); }
function wndRunTick(dt) { return __ZC(405, 69, this, arguments, new.target); }
var WND_MAU = { cz: -40, pod: 19, col: 11.5, read: {} };
function wndMausoleum() { return __ZC(405, 70, this, arguments, new.target); }
function wndLionStatue(x, y, z, ry) { wndLionForm(wndP(), x, y, z, ry, 1.9, "marble", "stand"); }
function wndQuadriga(x, y, z) { return __ZC(405, 71, this, arguments, new.target); }
function wndMauTomb() { return __ZC(405, 72, this, arguments, new.target); }
function wndShip(x, z, ry) { var g = wndGroup(x, 0, z, ry); wndGalley(g, 15, (Math.abs(x) | 0) % 3); return g; }
function wndCastle(x, z) { return __ZC(405, 73, this, arguments, new.target); }
var WND_COL3 = { x: -70, z: 0, base: 12, h: 33, stage: -1, clip: null, mound: null };
function wndColossus() { return __ZC(405, 74, this, arguments, new.target); }
function wndColBase() {
var C = WND_COL3, m = wndMat(0xF2EEE6, "marble", { phong: 40 });
wndBox(14, 1, 14, m, C.x, 0.5, C.z);
wndBox(10, C.base - 2, 10, m, C.x, 1 + (C.base - 2) / 2, C.z);
wndBox(12, 1, 12, m, C.x, C.base - 0.5, C.z);
wndSolid(C.x, C.z, 7, 7, 0, C.base + 40);
}
function wndColBronze() { return wndMat(0xB07A3A, "metal", { phong: 70, spec: 0xC8A070 }); }
function wndColStatue() { return __ZC(405, 75, this, arguments, new.target); }
function wndColBuildCard() { return __ZC(405, 76, this, arguments, new.target); }
function wndColStage(s) { return __ZC(405, 77, this, arguments, new.target); }
function wndColQuake() {
var C = WND_COL3;
C.quake = 3;
wndSay("🌍 <b>About 226 BC.</b> An earthquake shakes Rhodes. The Colossus breaks at the knees and falls…");
}
function wndColTick(dt) { return __ZC(405, 78, this, arguments, new.target); }
function wndColFallen() { return __ZC(405, 79, this, arguments, new.target); }
function wndBronzeWorks(x, z) { return __ZC(405, 80, this, arguments, new.target); }
var WND_PH = { ix: -170, iz: 0, iy: 1.2, t1: 60, t2: 30, fire: null, lit: 0 };
function wndPharos() { return __ZC(405, 81, this, arguments, new.target); }
function wndPharosTower() { return __ZC(405, 82, this, arguments, new.target); }
function wndBeacon() { return __ZC(405, 83, this, arguments, new.target); }
function wndBeaconTick(dt) { var P = WND_PH; if (P.mirror)
P.mirror.rotation.y += dt * 0.12; }
function wndQaitbay(ix, iz, iy) { return __ZC(405, 84, this, arguments, new.target); }
var WND_ACTS = {
pyramid: [["sledge", "Haul a block on the sledge (try the water)"], ["seked", "Work out the slope, as the Rhind papyrus teaches"]],
gardens: [["screw", "Work the shadufs until the water falls from terrace to terrace"]],
artemis: [["roll", "Roll a column shaft the way Chersiphron did"]],
zeus: [["stand", "Stand Zeus up, and see what Strabo meant"], ["run", "Run the stadion, 192 m, against the clock"]],
mausoleum: [["sides", "Walk round all four sides and learn who carved each"]],
colossus: [["build", "Build it stage by stage behind the earth mound"], ["quake", "See the earthquake of 226 BC, and walk into the fallen pieces"]],
pharos: [["beacon", "Climb the ramp and the stairs, and light the beacon at the top"]]
};
var WND_UNIT = { pyramid: 1, gardens: 2, artemis: 3, zeus: 4, mausoleum: 5, colossus: 6, pharos: 7, later: 8, natural: 9 };
var WND_COURSE = "world-wonders";
function wndDid(key, act) { var p = wndProg(); if (!p.did[key + "_" + act]) {
p.did[key + "_" + act] = Date.now();
wndProgSave();
} }
function wndDone(key, act) { return !!wndProg().did[key + "_" + act]; }
function wndActSpot(key, act, x, z, name, verb, fn, o) { return wndSpot(x, z, 2.2, "✋ " + name, verb, fn, o); }
function wndLevel() {
var p = wndProg();
if (p.level === "y" || p.level === "f")
return p.level;
try {
var g = typeof edrStore === "function" ? edrStore().grade : null;
if (g && /^(K|1|2|3|4|5)$/.test(String(g)))
return "y";
}
catch (e) { }
return "f";
}
function wndLevelBtn() { return __ZC(405, 85, this, arguments, new.target); }
function wndLevelFns(f, redraw) { f.lv_y = function () { var p = wndProg(); p.level = "y"; wndProgSave(); redraw(); }; f.lv_f = function () { var p = wndProg(); p.level = "f"; wndProgSave(); redraw(); }; }
function wndStamped(u) { var st = (typeof eduStore === "function") ? eduStore() : {}; var w = st[WND_COURSE] || {}; return !!w[u]; }
function wndStampCount(maxU) { var n = 0; for (var u = 1; u <= (maxU || 9); u++)
if (wndStamped(u))
n++; return n; }
function wndBegin(key) {
var u = WND_UNIT[key];
if (!u)
return;
WND.t0 = WND.t0 || {};
if (WND.t0[key] && Date.now() - WND.t0[key] < 3 * 3600000)
return;
WND.t0[key] = Date.now();
if (wndSigned() && typeof cityRpc === "function")
cityRpc("school_begin", { p_course: WND_COURSE, p_unit: u }).catch(function () { });
}
function wndLearnStand(key, x, z, ry) { return __ZC(405, 86, this, arguments, new.target); }
function wndLessonsCard(key, tab) { return __ZC(405, 87, this, arguments, new.target); }
function wndHallLesson(i) { return __ZC(405, 88, this, arguments, new.target); }
function wndQuizList(key) { return key === "later" ? WND_QUIZ_LATER : key === "natural" ? WND_QUIZ_NATURAL : WND_QUIZ[key]; }
function wndQuizOpts(key, k) { var q = wndQuizList(key)[k], o = [q[1], q[2], q[3]], r = ((key.length * 7) + k * 5) % 3; return [o[r], o[(r + 1) % 3], o[(r + 2) % 3]]; }
function wndQuizOpen(key) {
if (key === "later" || key === "natural")
wndBegin(key);
if (!WND.quiz || WND.quiz.key !== key)
WND.quiz = { key: key, ans: {}, done: false, score: 0 };
wndQuizCard();
}
function wndQuizCard() { return __ZC(405, 89, this, arguments, new.target); }
function wndQuizMark() { return __ZC(405, 90, this, arguments, new.target); }
function wndStamp(u) { return __ZC(405, 91, this, arguments, new.target); }
function wndPassport() { return __ZC(405, 92, this, arguments, new.target); }
function wndPrint(html) { if (typeof edrShowDoc === "function")
edrShowDoc(html);
else {
var w = window.open("", "_blank");
if (w) {
w.document.write(html);
w.document.close();
}
} }
function wndDocWrap(title, body) { return __ZC(405, 93, this, arguments, new.target); }
function wndPassportDoc() { return __ZC(405, 94, this, arguments, new.target); }
function wndTimeCard() { worldCard(worldFacts("The timeline", "4,500 years of wonders", WND_TIME.map(function (r) { return [r[0], r[1]]; }), []), {}); }
function wndTallCard() { return __ZC(405, 95, this, arguments, new.target); }
function wndSourcesCard() { return __ZC(405, 96, this, arguments, new.target); }
var WND_GOALS = [
["K-2", "Name the Seven Wonders and point to them on the map; say which one still stands; tell one fact about each; say that people long ago built big things without engines, by working together."],
["3-5", "Place each wonder on the map and the timeline; explain one way each was built (sledges and water, shadufs, rollers, bronze over iron, ramps); tell the difference between a story and evidence; compare the heights."],
["6-8", "Explain why each wonder was built (religion, power, memory, trade); use primary and secondary sources; describe how each was lost (earthquake, fire, reuse of stone); calculate a slope from the seked; explain why the Colossus did not straddle the harbour."],
["9-12", "Weigh the evidence for each wonder (especially the Gardens and the Colossus' pose), comparing late writers with archaeology; discuss how the list itself was made and changed; analyse engineering choices (foundations on marsh, relieving chambers, a ramp inside a tower); connect to the later wonders and to heritage protection today."]
];
function wndTeacherGuide() { return __ZC(405, 97, this, arguments, new.target); }
function wndGuideDoc() { return __ZC(405, 98, this, arguments, new.target); }
function wndWorksheet() { return __ZC(405, 99, this, arguments, new.target); }
var WND_ARRIVE = {
hall: [0, 13, 0, 0], later: [36, 0, -Math.PI / 2, 0], library: [-40, -6, Math.PI / 2, 0], teachers: [-47, 13.5, Math.PI, 0],
pyramid: ["pyramid", 40, -290, Math.PI, 0], kings: ["pyramid", 9, 11.2, Math.PI / 2, 40.4], gallery: ["pyramid", 8.75, -36, Math.PI, 22.2],
gardens: ["gardens", -128, 0, -Math.PI / 2, 0], terrace: ["gardens", 45, 8, Math.PI / 2, 25.5],
artemis: ["artemis", -102, 4, -Math.PI / 2, 0], cella: ["artemis", -24, 0, -Math.PI / 2, 2.4],
zeus: ["zeus", 52, 0, Math.PI / 2, 0], throne: ["zeus", 8, -2, Math.PI / 2, 3, 0.32], workshop: ["zeus", -50, 3, Math.PI / 2, 0],
mausoleum: ["mausoleum", 0, -88, Math.PI, 0], tomb: ["mausoleum", -11, -40, -Math.PI / 2, -4.5],
colossus: ["colossus", 20, -8, Math.PI / 2, 0], bronze: ["colossus", 40, -34, 0, 0],
pharos: ["pharos", -50, 0, Math.PI / 2, 1.0], alexlib: ["pharos", 27.5, -47, -Math.PI / 2, 0.6], lantern: ["pharos", -165, 4, Math.PI / 2, 95.2]
};
function wndArrive(at) { return __ZC(405, 100, this, arguments, new.target); }
function wndBuild(G) { return __ZC(405, 101, this, arguments, new.target); }
function wndListsAt(K, x, z) { return __ZC(405, 102, this, arguments, new.target); }
function wndBakeAll(G) { return __ZC(405, 103, this, arguments, new.target); }
function wndForget() { return __ZC(405, 104, this, arguments, new.target); }
var WND_ENV = {
out: { top: 0x2E6EC0, low: 0xA8C4DC, fog: 0xB8C8D8, fogD: 0.001, sun: 1.05, sunCol: 0xFFE8C8, sunDir: [-0.35, 0.75, -0.55], hemi: 0.55, hemiCol: 0xC8D8EC, hemiGround: 0x6A5A40 },
desert: { top: 0x3070C0, low: 0xC0CCD8, fog: 0xC8C8C0, fogD: 0.0009, sun: 1.12, sunCol: 0xFFE6C0, sunDir: [-0.35, 0.75, -0.55], hemi: 0.5, hemiCol: 0xD0DCEC, hemiGround: 0x8A7048 },
hall: { top: 0x2E6EC0, low: 0xA8C4DC, fog: 0xB8C8D8, fogD: 0.0006, sun: 0.7, sunCol: 0xFFF0D8, sunDir: [-0.3, 0.9, -0.3], hemi: 0.5, hemiCol: 0xF4ECE0, hemiGround: 0x8A7A60 },
inside: { top: 0x2A2018, low: 0x3A2E22, fog: 0x2A2018, fogD: 0.012, sun: 0.25, sunCol: 0xFFD8A0, sunDir: [0.2, 0.9, 0.1], hemi: 1.1, hemiCol: 0xFFE0B8, hemiGround: 0x5A4630 }
};
function wndEnv() { return __ZC(405, 105, this, arguments, new.target); }
function wndPyrDeep(lx, lz, feet) { var P = WND_PYR, y = Math.max(0, feet + 0.6), hw = P.half * (1 - y / P.h); return Math.abs(lx) < hw - 1 && Math.abs(lz) < hw - 1; }
function wndMayGo(site) {
if (wndKeeper())
return "";
var c = wndCfg();
if (!c.open)
return "The Wonders of the World are closed for now by the Keeper.";
if (site && !wndSiteOn(site))
return wndName(site) + " is closed for now by the Keeper.";
return "";
}
function wndPlaceSite(at) { var A = WND_ARRIVE[at]; return A && typeof A[0] === "string" ? A[0] : ""; }
function wndGo(at) {
at = at || "hall";
var why = wndMayGo(wndPlaceSite(at));
if (why) {
wndSay("🏛️ <b>" + wndEsc(why) + "</b>");
return false;
}
WND.wantAt = at;
if (WLD.on === WND.key) {
worldCard(null);
wndArrive(at);
return true;
}
return worldGo(WND.key, { fromName: "the city" });
}
function wndLeave() { worldCard(null); worldHome("🏛️ <b>Back from the Wonders of the World.</b> 'Of all the sights, the house of Artemis was greatest' (Antipater)."); }
if (typeof worldDef === "function")
worldDef(WND.key, {
base: WND.base, far: 3600, ownSky: true, tone: 260,
env: function () { return wndEnv(); },
build: function (G) { wndBuild(G); },
enter: function () { return __ZC(405, 106, this, arguments, new.target); },
leave: function () { worldCard(null); var R = WND_ZEUS.run; if (R)
R.on = 0; if (typeof stars !== "undefined" && stars)
stars.visible = true; },
ground: function (x, z, feet) {
var K = WND.K;
if (!K)
return 0;
var g = null;
wndListsAt(K, x, z).forEach(function (L) { var h = wndGroundIn(L, x, z, feet); if (h !== null && (g === null || h > g))
g = h; });
return g === null ? 0 : g;
},
block: function (x, z, feet) { return __ZC(405, 107, this, arguments, new.target); },
tick: function (dt) { wndTick(dt); },
back: function () { wndLeave(); }
});
if (typeof motesTick === "function")
(function () { var f = motesTick; motesTick = function () { var r = f.apply(this, arguments); try {
if (typeof WLD !== "undefined" && WLD.on === WND.key && GFX.motes) {
GFX.motes.pts.material.color.setHex(0xFFE8C0);
GFX.motes.pts.material.opacity = 0.14;
}
}
catch (e) { } return r; }; })();
if (typeof WLG !== "undefined" && WLG.keys.indexOf(WND.key) < 0)
WLG.keys.push(WND.key);
if (typeof worldLetGo === "function")
(function () { var f = worldLetGo; worldLetGo = function (key) { var r = f.apply(this, arguments); if (r && key === WND.key)
wndForget(); return r; }; })();
if (typeof DGR_W !== "undefined" && !DGR_W[WND.key]) {
if (typeof DGR_WORLDS !== "undefined")
DGR_WORLDS.push([WND.key, "The Wonders of the World", 0, "city"]);
DGR_W[WND.key] = { id: WND.key, name: "The Wonders of the World", def: 0, group: "city" };
}
function wndTick(dt) { return __ZC(405, 108, this, arguments, new.target); }
function wndDirectory() { return __ZC(405, 109, this, arguments, new.target); }
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-wonders"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-wonders";
b.title = "The Wonders of the World";
b.textContent = "🏛️ Wonders";
b.onclick = function () { wndDirectory(); };
bar.appendChild(b);
}
if (typeof document !== "undefined")
setTimeout(hook, 1900);
if (typeof PS_EXTRAS !== "undefined" && !PS_EXTRAS.some(function (e) { return e.id === "wnd-ps"; }))
PS_EXTRAS.push({ id: "wnd-ps", label: "🏛️ The Wonders of the World", show: function () { return true; }, run: function () { setTimeout(wndDirectory, 10); } });
if (typeof PS_SECTIONS !== "undefined") {
var pl = PS_SECTIONS.filter(function (s) { return s.k === "places"; })[0];
if (pl && pl.ids.indexOf("wnd-ps") < 0)
pl.ids.push("wnd-ps");
}
})();
(function () {
if (typeof eduPaint !== "function")
return;
var ep = eduPaint;
eduPaint = function () {
var r = ep.apply(this, arguments);
try {
var el = document.getElementById("sch-panel");
if (!el || el.style.display !== "block" || el.querySelector("[data-wnd]"))
return r;
var w = typeof eduWhere === "function" ? eduWhere() : null;
if (!w || !(w.id === "reception" || w.id === "library" || w.id === "atrium"))
return r;
el.insertAdjacentHTML("beforeend", '<div class="row" style="margin-top:6px"><button class="btn" data-wnd="trip">🏛️ Class trip: the Wonders of the World</button></div>');
}
catch (e) { }
return r;
};
addEventListener("click", function (e) { var b = e.target && e.target.closest ? e.target.closest("[data-wnd]") : null; if (!b)
return; e.preventDefault(); if (b.getAttribute("data-wnd") === "trip")
wndGo("hall"); });
})();
(function () {
if (typeof eduWorldCard === "function") {
var wc = eduWorldCard;
eduWorldCard = function () {
var r = wc.apply(this, arguments);
try {
if (EDU.lesson && EDU.lesson.html && EDU.lesson.html.indexOf("data-wnd") < 0) {
EDU.lesson.html = EDU.lesson.html.replace("<div style=\"border:1px dashed", '<div style="border:1px solid #C8CCD2;border-radius:6px;padding:10px;margin:8px 0"><b>The Wonders of the World</b> · Menu &gt; 🏛️ Wonders<br>The Seven Wonders of the Ancient World at their real size: five lessons at each, things to do, people of the time to talk with, and a quiz for each. <span style="color:#2A6A3A">' + wndStampCount(9) + ' of 9 units passed.</span> <button data-wnd="trip" style="margin-left:6px">Go</button></div><div style="border:1px dashed');
eduLessonPaintHtml();
}
}
catch (e) { }
return r;
};
}
if (typeof bkpHtml === "function") {
var bh = bkpHtml;
bkpHtml = function () {
var h = bh.apply(this, arguments);
try {
var n = wndStampCount(9);
if (!n)
return h;
h += '<div style="margin:3px 0">🏛️ ' + (wndStampCount(7) === 7 ? 'Certificate: <b>Wonders Scholar</b>, the Department of Education' : 'The Wonders Passport: ' + n + ' of 9 stamps') + '</div>';
}
catch (e) { }
return h;
};
}
})();
(function () {
if (typeof ktPane === "function") {
var kp = ktPane;
ktPane = function (pane) {
var r = kp.apply(this, arguments);
try {
var row = pane.querySelector("[data-kt-home]");
if (row && row.parentNode && !pane.querySelector("[data-kt-wnd]")) {
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-kt-wnd", "1");
b.textContent = "🏛️ The Wonders of the World";
b.onclick = function () { var kd = document.getElementById("keeper-desk"); if (kd)
kd.style.display = "none"; if (typeof closeDesk === "function")
try {
closeDesk();
}
catch (e) { } wndGo("hall"); };
row.parentNode.appendChild(b);
}
}
catch (e) { }
return r;
};
}
})();
setTimeout(function () {
try {
var m = /[?&]kwonders=([a-z]+)/.exec(location.search);
if (!m)
return;
var where = WND_ARRIVE[m[1]] ? m[1] : "hall";
var tries = 0, iv = setInterval(function () {
tries++;
if (tries > 80) {
clearInterval(iv);
return;
}
if (!wndKeeper())
return;
if (typeof store === "undefined" || !store.workplaceAt || !Object.keys(store.workplaceAt).length)
return;
clearInterval(iv);
wndGo(where);
try {
var q = new URLSearchParams(location.search);
q.delete("kwonders");
var s = q.toString().replace(/^play=(&|$)/, "play$1");
history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
}
catch (e) { }
}, 1500);
}
catch (e) { }
}, 3000);
var WSC = { files: null, wait: null, bad: false, geo: {}, mats: {} };
var WSC_BODY = { m: "quaternius/body-male.glb", f: "quaternius/body-female.glb" };
var WSC_HAIR = { beard: "quaternius/hair-beard.glb", long: "quaternius/hair-long.glb", buns: "quaternius/hair-buns.glb", parted: "quaternius/hair-simpleparted.glb", buzz: "quaternius/hair-buzzed.glb" };
var WSC_ANIM = "quaternius/anims-ual1.glb";
function wscMat(kind) { return __ZC(405, 110, this, arguments, new.target); }
function wndCanvasTex(key, w, h, draw) {
var k = "ct|" + key;
if (WND.mats[k])
return WND.mats[k];
var cv = document.createElement("canvas");
cv.width = w;
cv.height = h;
try {
draw(cv.getContext("2d"), w, h);
}
catch (e) { }
var t = new THREE.CanvasTexture(cv);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
WND.mats[k] = t;
return t;
}
function wscLoad(cb) { return __ZC(405, 111, this, arguments, new.target); }
function wscPose(spec, F) { return __ZC(405, 112, this, arguments, new.target); }
function wscWeld(pos, idx, keep) { return __ZC(405, 113, this, arguments, new.target); }
function wscSleeve(pz, o) { return __ZC(405, 114, this, arguments, new.target); }
function wndSculpt(parent, x, y, z, ry, spec) { return __ZC(405, 115, this, arguments, new.target); }
function wndBeast(parent, x, y, z, ry, file, len, mat, fallback) { return __ZC(405, 116, this, arguments, new.target); }
function wscLap(pz, o) { return __ZC(405, 117, this, arguments, new.target); }
function wscCloth(a, b, y, o) { return __ZC(405, 118, this, arguments, new.target); }
function wscRobed(o) { return __ZC(405, 119, this, arguments, new.target); }
var WND_LIFE = {
pyramid: {
people: [["egypt", 10]], beasts: [["camel", 4], ["horse", 2]], birds: 5, dust: 1,
snd: { s: "temple", b: ["wind", "crowdsoft", "windsoft"] }
},
gardens: { birds: 8, boats: [["euphrates", 3]],
snd: { s: "temple", b: ["fountain", "birds", "crowd"] } },
artemis: { city: { n: 90, col: [0xE8E0D0, 0xD8C8B0, 0xC8B898], r0: 210, r1: 285, h: [4, 8], roof: 0xA85A3A },
people: [["greek", 12]], beasts: [["sheep", 6], ["cow", 2]], birds: 10, smoke: [[-60, 0, 3]],
snd: { s: "temple", b: ["birds", "crowdsoft", "bells"] } },
zeus: { trees: { n: 60, kind: ["olive", "plane", "cypress"], r0: 150, r1: 290 },
people: [["greek", 14]], beasts: [["horse", 4], ["cow", 2]], birds: 10, smoke: [[40, -26, 3.2]],
snd: { s: "pastoral", b: ["birds", "crowd", "windsoft"] } },
mausoleum: { city: { n: 140, col: [0xF0E8D8, 0xE0D4C0, 0xD0C0A8], r0: 120, r1: 290, h: [4, 8], roof: 0xB06A40, hill: 1 },
people: [["greek", 12]], beasts: [["horse", 2], ["sheep", 3]], birds: 8, boats: [["sea", 4]],
snd: { s: "temple", b: ["sea", "gulls", "crowdsoft"] } },
colossus: { city: { n: 150, col: [0xF0E8D8, 0xE0D4C0, 0xD0C0A8], r0: 110, r1: 285, h: [4, 9], roof: 0xB06A40 },
people: [["greek", 14]], beasts: [["horse", 2]], birds: 10, boats: [["sea", 6]],
snd: { s: "temple", b: ["sea", "gulls", "crowd"] } },
pharos: { city: { n: 160, col: [0xF0E8D8, 0xE8DCC8, 0xD8C8B0], r0: 150, r1: 300, h: [5, 10], roof: 0xC8B898, flat: 1, land: function (x, z) { return x > 40; } },
people: [["egypt", 6], ["greek", 8]], beasts: [["camel", 2], ["horse", 2]], birds: 12, boats: [["sea", 7]], smoke: [["fire"]],
snd: { s: "temple", b: ["sea", "gulls", "windhigh"] } }
};
var WND_DRESS = {
egypt: [{ top: 0xF2EEE2, bottom: 0xF2EEE2, skin: 0x8A5A3A, hair: 0x141010 }, { top: 0xF2EEE2, bottom: 0xE8E0C8, skin: 0x9A6A44, hair: 0x1A1410 }, { top: 0xE8D8A8, bottom: 0xF2EEE2, skin: 0x7A4A2E, hair: 0x101010 }, { top: 0x3A6AA8, bottom: 0xF2EEE2, skin: 0x8A5A3A, hair: 0x141010 }],
babylon: [{ top: 0x8A2A2A, bottom: 0x6A3A2A, skin: 0x9A6A44, hair: 0x1A1010 }, { top: 0x2A4A8A, bottom: 0xC8A868, skin: 0x8A5A3A, hair: 0x141010 }, { top: 0xC8A040, bottom: 0x7A4A2A, skin: 0xA87A54, hair: 0x1A1410 }, { top: 0xE8E0C8, bottom: 0x8A3A2A, skin: 0x9A6A44, hair: 0x101010 }],
greek: [{ top: 0xF2EEE2, bottom: 0xF2EEE2, skin: 0xC89A70, hair: 0x3A2A1A }, { top: 0x2A5A9A, bottom: 0xF2EEE2, skin: 0xD8A880, hair: 0x2A1A10 }, { top: 0xA83A2A, bottom: 0xE8E0C8, skin: 0xC08A60, hair: 0x4A3420 }, { top: 0xD8B848, bottom: 0xF2EEE2, skin: 0xC89A70, hair: 0x1A1410 }, { top: 0x5A7A3A, bottom: 0xE8E0C8, skin: 0xB88A60, hair: 0x2A1A10 }]
};
var WND_LV = { people: [], beasts: [], birds: [], boats: [], smoke: [], water: [], t: 0, smokeTex: null };
function wndTaken() { return __ZC(405, 120, this, arguments, new.target); }
var WND_SEA_A = [180, 334];
function wndSeaArc(a) { return a >= WND_SEA_A[0] && a <= WND_SEA_A[1]; }
function wndIsSea(x, z) { return __ZC(405, 121, this, arguments, new.target); }
function wndRidgeH(x, z) { return __ZC(405, 122, this, arguments, new.target); }
function wndHillAt(x, z) { return __ZC(405, 123, this, arguments, new.target); }
function wndTakenFreeze(T) { return __ZC(405, 124, this, arguments, new.target); }
function wndRidges() { return __ZC(405, 125, this, arguments, new.target); }
function wndTown(key, o) { return __ZC(405, 126, this, arguments, new.target); }
function wndGrove(key, o) { return __ZC(405, 127, this, arguments, new.target); }
var WND_SCAT = { pyramid: { bush: 0, rock: 1, tuft: 0.3, dry: 1 }, gardens: { bush: 0.6, rock: 0.4, tuft: 1, dry: 1 }, artemis: { bush: 1, rock: 0.5, tuft: 1 }, zeus: { bush: 1, rock: 0.5, tuft: 1 },
mausoleum: { bush: 0.8, rock: 0.8, tuft: 0.8 }, colossus: { bush: 0.7, rock: 0.9, tuft: 0.8 }, pharos: { bush: 0.3, rock: 0.7, tuft: 0.6, dry: 1 } };
function wndScatter(key) { return __ZC(405, 128, this, arguments, new.target); }
function wndPeople(key, list) { return __ZC(405, 129, this, arguments, new.target); }
function wndBeasts(key, list) { return __ZC(405, 130, this, arguments, new.target); }
function wndBirds(key, n) { return __ZC(405, 131, this, arguments, new.target); }
function wndBoats(key, list) { return __ZC(405, 132, this, arguments, new.target); }
function wndGalley(g, len, v) { return __ZC(405, 133, this, arguments, new.target); }
function wndModelInto(g, file, len, fallback) { return __ZC(405, 134, this, arguments, new.target); }
function wndSmokeTex() { return __ZC(405, 135, this, arguments, new.target); }
function wndSmoke(key, x, y, z, big) { return __ZC(405, 136, this, arguments, new.target); }
function wndDust(key) { var n = WND.lite ? 3 : 8; for (var i = 0; i < n; i++) {
var a = i * 0.8;
wndSmoke(key, Math.cos(a) * 160, 0.5, Math.sin(a) * 160 - 60, false);
} WND_LV.smoke[WND_LV.smoke.length - 1].dust = 1; }
function wndWaterWaves() { return __ZC(405, 137, this, arguments, new.target); }
function wndLife() { return __ZC(405, 138, this, arguments, new.target); }
function wndLifeTick(dt) { return __ZC(405, 139, this, arguments, new.target); }
(function () {
if (typeof WSN_WORLD === "undefined")
return;
WND_SITES.forEach(function (r) { var o = WND_LIFE[r[0]]; if (o && o.snd)
WSN_WORLD["wnd:" + r[0]] = { s: o.snd.s, b: o.snd.b }; });
WSN_WORLD["wnd:hall"] = { s: "temple", b: ["crowdsoft", "fountain"] };
if (typeof wsnKey === "function") {
var wk = wsnKey;
wsnKey = function () { try {
if (typeof WLD !== "undefined" && WLD.on === WND.key && typeof worldLocal === "function") {
var L = worldLocal(), r = wndRegion(L.x, L.z);
return "wnd:" + (r === "land" ? "hall" : r);
}
}
catch (e) { } return wk.apply(this, arguments); };
}
})();
function wndLionForm(parent, x, y, z, ry, len, mat, pose, o) { return __ZC(405, 140, this, arguments, new.target); }
function wndSphinxForm(parent, x, y, z, ry, len) { return __ZC(405, 141, this, arguments, new.target); }
function wndGlazeLion(x) { return __ZC(405, 142, this, arguments, new.target); }
function wndGlazeBull(x, ox, oy, s) { return __ZC(405, 143, this, arguments, new.target); }
function wndGlazeDragon(x, ox, oy, s) { return __ZC(405, 144, this, arguments, new.target); }
function wndRosette(x, cx, cy, r) { x.fillStyle = "#F4E8D0"; for (var p = 0; p < 8; p++) {
var a = p * Math.PI / 4;
x.beginPath();
x.ellipse(cx + Math.cos(a) * r * 0.55, cy + Math.sin(a) * r * 0.55, r * 0.42, r * 0.2, a, 0, 6.3);
x.fill();
} x.fillStyle = "#E8B848"; x.beginPath(); x.arc(cx, cy, r * 0.32, 0, 6.3); x.fill(); }
var BAB = { E: { x: 0, z: 185 }, stages: [[91, 91, 33], [78, 78, 51], [60, 60, 57], [51, 51, 63], [42, 42, 69], [33, 33, 75]], templeY: 75,
walkers: [], talk: [], routes: {}, hideFor: null, poles: [] };
function babM() { return __ZC(405, 145, this, arguments, new.target); }
function babChunk(k) { WNK.site = k ? "gardens~" + k : "gardens"; }
function babGround(x, z, feet) {
var K = WND.K, wx = x + WND_AT.gardens.x, wz = z + WND_AT.gardens.z, g = null;
wndListsAt(K, wx, wz).forEach(function (L) { var h = wndGroundIn(L, wx, wz, feet === undefined ? 200 : feet); if (h !== null && (g === null || h > g))
g = h; });
return g === null ? 0 : g;
}
function babStair(o) { return __ZC(405, 146, this, arguments, new.target); }
function babMerlons(dir, a, b, c, y, t, mat, every) {
var e = every || (WND.lite ? 4 : 2.2);
for (var p = Math.min(a, b) + e / 2; p < Math.max(a, b); p += e) {
if (dir === "x") {
wndBox(1.2, 0.9, t, mat, p, y + 0.45, c);
if (!WND.lite)
wndBox(0.6, 0.6, t, mat, p, y + 1.2, c);
}
else {
wndBox(t, 0.9, 1.2, mat, c, y + 0.45, p);
if (!WND.lite)
wndBox(t, 0.6, 0.6, mat, c, y + 1.2, p);
}
}
}
function babJar(x, y, z, s, mat) { var M = babM(); wndCyl(0.32 * s, 0.75 * s, mat || M.clay, x, y + 0.38 * s, z, null, 10, 0.18 * s); wndCyl(0.16 * s, 0.14 * s, mat || M.clay, x, y + 0.82 * s, z, null, 8, 0.2 * s); }
function babBed(x, z, ry, o) { return __ZC(405, 147, this, arguments, new.target); }
function babTable(x, z, o) { return __ZC(405, 148, this, arguments, new.target); }
function babStool(x, z) { var M = babM(); wndBox(0.4, 0.05, 0.4, M.wood, x, 0.42, z); wndBox(0.32, 0.4, 0.32, M.reed, x, 0.2, z); }
function babMat(x, z, w, d, col) { var M = babM(); wndBox(w, 0.03, d, col || M.reed, x, 0.02, z); }
function babLampStand(x, z, y) { var M = babM(); wndCyl(0.05, 1.1, M.bronze, x, (y || 0) + 0.55, z, null, 6); wndCyl(0.12, 0.06, M.clayL, x, (y || 0) + 1.13, z, null, 8, 0.08); wndLamp(x, (y || 0) + 1.3, z, 0xFFD8A0, 1.4); }
function babQuern(x, z) { var M = babM(); wndBox(0.9, 0.22, 0.45, wndMat(0x8A8478, "stone"), x, 0.11, z); wndBox(0.35, 0.12, 0.3, wndMat(0x9A9488, "stone"), x + 0.1, 0.28, z); }
function babOven(x, z) { var M = babM(); wndCyl(0.55, 1.0, M.clayL, x, 0.5, z, null, 12, 0.42); wndCyl(0.3, 0.04, M.bitumen, x, 1.0, z, null, 10); wndRound(x, z, 0.55, 0, 1.0); }
function babLoom(x, z, ry) {
var M = babM(), g = wndGroup(x, 0, z, ry || 0);
wndBox(0.08, 2, 0.08, M.woodD, -0.7, 1, 0, g);
wndBox(0.08, 2, 0.08, M.woodD, 0.7, 1, 0, g);
wndBox(1.6, 0.08, 0.08, M.woodD, 0, 1.95, 0, g);
wndBox(1.3, 1.3, 0.02, M.cloth[(Math.abs(x + z) | 0) % 6], 0, 1.2, 0, g);
wndBox(1.5, 0.06, 0.06, M.woodD, 0, 0.5, 0, g);
wndSolid(x, z, 0.8, 0.25, 0, 2);
}
function babChest(x, z, ry) { var M = babM(), g = wndGroup(x, 0, z, ry || 0); wndBox(0.9, 0.5, 0.5, M.wood, 0, 0.25, 0, g); wndBox(0.94, 0.06, 0.54, M.woodD, 0, 0.52, 0, g); wndSolid(x, z, 0.5, 0.5, 0, 0.6); }
function babShrineNiche(x, y, z, ry) { var M = babM(), g = wndGroup(x, y, z, ry || 0); wndBox(0.7, 0.9, 0.12, M.mud2, 0, 0, 0, g); wndBox(0.12, 0.3, 0.12, M.clayL, 0, -0.2, 0.08, g); wndSph(0.07, M.clayL, 0, -0.0, 0.08, g, 8); }
function babTablets(x, y, z, n) { var M = babM(); for (var i = 0; i < n; i++)
wndBox(0.09, 0.03, 0.13, M.clayL, x + (i % 4) * 0.12, y + 0.015 + Math.floor(i / 4) * 0.035, z + ((i * 7) % 3) * 0.05); }
function babBasket(x, z, s) { var M = babM(); wndCyl(0.28 * (s || 1), 0.35 * (s || 1), M.reed, x, 0.18 * (s || 1), z, null, 10, 0.22 * (s || 1)); }
function babHouse(x0, z0, x1, z1, door, seed, o) { return __ZC(405, 149, this, arguments, new.target); }
function babLeafM(col) {
var k = "bleaf|" + col;
if (WND.mats[k])
return WND.mats[k];
var t = (typeof leafTex === "function") ? leafTex() : null, m = new THREE.MeshLambertMaterial({ color: col, map: t || null, alphaTest: t ? 0.42 : 0, side: THREE.DoubleSide });
WND.mats[k] = m;
return m;
}
function babLeaves(r, col, x, y, z, parent, sy) { return __ZC(405, 150, this, arguments, new.target); }
function babFrondM() { return __ZC(405, 151, this, arguments, new.target); }
function babFrondGeo() { return __ZC(405, 152, this, arguments, new.target); }
function babFrondMat() { var m = babFrondM(); if (!m.userData.bab) {
m.transparent = false;
m.alphaTest = 0.45;
m.side = THREE.DoubleSide;
m.userData.bab = 1;
m.needsUpdate = true;
} return m; }
function babTree(kind, x, y, z, s, parent) { return __ZC(405, 153, this, arguments, new.target); }
function babShrub(x, y, z, s, col) { return babLeaves(0.7 * (s || 1), col || 0x4A6E2A, x, y + 0.5 * (s || 1), z, null, 0.75); }
function babVineM() { return __ZC(405, 154, this, arguments, new.target); }
function babFlowers(x0, z0, x1, z1, y, n, cols) { return __ZC(405, 155, this, arguments, new.target); }
function babGardensGrow() { return __ZC(405, 156, this, arguments, new.target); }
function babShadufs() { return __ZC(405, 157, this, arguments, new.target); }
function babZigFaces(cx, cz, w, d, y0, y1, mat, step) { return __ZC(405, 158, this, arguments, new.target); }
function babEtemenanki() { return __ZC(405, 159, this, arguments, new.target); }
function babEsagila() { return __ZC(405, 160, this, arguments, new.target); }
function babThronePaint(x, W, H) { return __ZC(405, 161, this, arguments, new.target); }
function babPalace() { return __ZC(405, 162, this, arguments, new.target); }
function babWalls() { return __ZC(405, 163, this, arguments, new.target); }
function babBridge(L) { return __ZC(405, 164, this, arguments, new.target); }
function babStall(x, z, ry, kind, i) { return __ZC(405, 165, this, arguments, new.target); }
function babNewCity() { return __ZC(405, 166, this, arguments, new.target); }
function babOldCity() { return __ZC(405, 167, this, arguments, new.target); }
var BAB_DRESS = {
babylon: [{ top: 0x8A2A2A, bottom: 0x6A3A2A, skin: 0x9A6A44, hair: 0x1A1010 }, { top: 0x2A4A8A, bottom: 0xC8A868, skin: 0x8A5A3A, hair: 0x141010 }, { top: 0xC8A040, bottom: 0x7A4A2A, skin: 0xA87A54, hair: 0x1A1410 }, { top: 0xE8E0C8, bottom: 0x8A3A2A, skin: 0x9A6A44, hair: 0x101010 }, { top: 0x5A3A6A, bottom: 0xD8C8A8, skin: 0x8A5A3A, hair: 0x141010 }, { top: 0xD8C8A8, bottom: 0x3A5A3A, skin: 0x9A6A44, hair: 0x1A1410 }],
egypt: [{ top: 0xF2EEE2, bottom: 0xF2EEE2, skin: 0x8A5A3A, hair: 0x141010 }],
phoenicia: [{ top: 0x6A1A4A, bottom: 0xE8E0C8, skin: 0xA87A54, hair: 0x1A1410 }],
ionia: [{ top: 0xF2EEE2, bottom: 0xF2EEE2, skin: 0xC89A70, hair: 0x3A2A1A }, { top: 0x2A5A9A, bottom: 0xF2EEE2, skin: 0xC08A60, hair: 0x2A1A10 }],
media: [{ top: 0x6A4A2A, bottom: 0x4A3A2A, skin: 0xB88A60, hair: 0x1A1410 }],
judah: [{ top: 0xD8CCB0, bottom: 0x6A5A3A, skin: 0xA87A54, hair: 0x1A1410 }],
arabia: [{ top: 0xE8D8B8, bottom: 0x8A6A3A, skin: 0x8A5A3A, hair: 0x101010 }]
};
var BAB_TALK = {
king: { n: "Nebuchadnezzar II, King of Babylon", sex: "m", look: { top: 0x2A3A8A, bottom: 0x8A2A2A, skin: 0x9A6A44, hair: 0x141010 },
p: "You are Nebuchadnezzar II (Nabû-kudurri-uṣur), king of Babylon from 605 to 562 BC, in your throne room in the Southern Palace about 575 BC. Speak as yourself: proud of what you built (the double walls, the Ishtar Gate, the Processional Way, Esagila rebuilt, Etemenanki finished, the palaces, the bridge) and devoted to Marduk. Keep strictly to what history knows: your victory at Carchemish in 605 BC, your wars in the Levant, the taking of Jerusalem in 597 and 587 BC and the people of Judah brought to Babylon, the long siege of Tyre. Your inscriptions never mention hanging gardens; if asked, say only what the stories later said. Say plainly when something is not known. No cruelty described in detail.",
hi: "You stand before the king of Babylon, in the house of my kingship. Marduk gave me this city to build, and I have built it: walls no army can climb, gates of blue brick, a tower to touch heaven. What would you ask of Nebuchadnezzar?" },
amytis: { n: "Amytis, Queen of Babylon", sex: "f", look: { top: 0x3A6AA8, bottom: 0x2A4A7A, skin: 0xB88A60, hair: 0x1A1410 },
p: "You are Amytis, wife of Nebuchadnezzar II, a princess of the Medes from the green mountains of Media (what is now western Iran), in the Hanging Gardens of Babylon about 575 BC. The story of the gardens being built for you comes from Berossus, a Babylonian priest writing about 290 BC; no Babylonian record names the gardens, and you should say honestly that historians argue whether they stood here at all. Speak warmly of the mountains you miss, the trees, the river, and the city's many peoples.",
hi: "Welcome to my garden. In the mountains of Media, where I was born, the slopes are green all summer; here the plain is flat and burning. My husband says he made me a mountain. Sit in the shade with me: what brings you to Babylon?" },
zigpriest: { n: "Bel-ushallim, priest of Etemenanki", sex: "m", look: { top: 0xE8E0C8, bottom: 0xE8E0C8, skin: 0x9A6A44, hair: 0x141010 },
p: "You are Bel-ushallim, an ordinary priest serving the temple on top of Etemenanki, the great ziggurat of Babylon, about 575 BC. You are a made-up but true-to-life person (say so if asked). Teach what is known: the Esagila Tablet's measures (91 m square, 91 m high, seven stages), mud brick inside and baked brick in bitumen outside, the stairs, the temple on top, the gods Marduk and Nabu, the New Year festival (Akitu). Ziggurats are not pyramids or tombs. Say plainly what is uncertain.",
hi: "You have climbed to the top of Etemenanki! Ninety-one cubits of... no, ninety-one metres, as you would say. Catch your breath. From here you can see the whole of Babylon and the river shining. What would you know of the house of Marduk?" },
esgpriest: { n: "Nabu-shum-iddin, temple-enterer of Esagila", sex: "m", look: { top: 0xE8E0C8, bottom: 0xC8A868, skin: 0x8A5A3A, hair: 0x101010 },
p: "You are Nabu-shum-iddin, an ērib bīti ('temple-enterer') priest of Esagila, the temple of Marduk in Babylon, about 575 BC. You are a made-up but true-to-life person (say so if asked). Teach what is known of Marduk, Zarpanitu, Nabu, the Enuma Elish (read at the New Year festival), the Akitu procession along the Processional Way, offerings, the temple's scribes and its lands. Say plainly what is uncertain.",
hi: "Peace be on you, stranger. You stand in Esagila, the house whose top is high. Lord Marduk sits within in gold. Mind you wash your hands at the basin before you go near him. What would you ask?" },
jehoiachin: { n: "Jehoiachin, King of Judah", sex: "m", look: { top: 0xD8CCB0, bottom: 0x6A5A3A, skin: 0xA87A54, hair: 0x1A1410 },
p: "You are Jehoiachin (Ya'u-kinu in the Babylonian tablets), king of Judah, taken to Babylon in 597 BC when Nebuchadnezzar captured Jerusalem, now living at the Babylonian court about 575 BC with your family. Clay ration tablets found in the Southern Palace record oil given to you and your five sons. Speak with dignity and sorrow for Jerusalem but kindly; you have met people from Tyre, Egypt, Ionia, Media and Elam at court. Keep to history; say plainly what is not known. Be respectful of every faith.",
hi: "Shalom, traveller. I am Jehoiachin, once king in Jerusalem, now a guest of the king of Babylon, whether I wish it or not. The palace scribes write down my oil each month. Many peoples eat at this king's table. Where is your home?" },
dates: { n: "Iddin-Nabu, a date and barley merchant", sex: "m", look: { top: 0xC8A040, bottom: 0x7A4A2A, skin: 0xA87A54, hair: 0x1A1410 },
p: "You are Iddin-Nabu, a Babylonian merchant selling dates and barley in the market of the New City, about 575 BC. A made-up but true-to-life person (say so if asked). Prices in silver by weight (shekels, about 8.3 g), barley and dates as everyday food, palm groves along the canals, contracts on clay tablets witnessed by scribes, families of business such as the house of Egibi. Haggle cheerfully. Keep to history.",
hi: "Dates! The best dates of Babylon, sweet as honey, from my own groves by the canal. A shekel of silver buys you more than you can carry. Or barley, if you bake. What do you need, friend?" },
tyre: { n: "Abdmelqart of Tyre, a Phoenician trader", sex: "m", look: { top: 0x6A1A4A, bottom: 0xE8E0C8, skin: 0xA87A54, hair: 0x1A1410 },
p: "You are Abdmelqart, a Phoenician trader from Tyre in Babylon about 575 BC, selling purple-dyed wool, cedar wood and glass. Tablets from the palace list men of Tyre at Babylon. Your city was besieged by Nebuchadnezzar for thirteen years (about 586 to 573 BC). A made-up but true-to-life person (say so if asked). Speak of ships, the sea, the alphabet your people spread, the purple dye made from murex shells. Keep to history.",
hi: "Ah, you have an eye for colour! This is Tyrian purple, dyed with the sea-snail, worth its weight in silver. And cedar from the mountains of Lebanon behind my city. Babylon buys everything. Will you?" },
egypt: { n: "Pediese, a linen seller from Egypt", sex: "m", look: { top: 0xF2EEE2, bottom: 0xF2EEE2, skin: 0x8A5A3A, hair: 0x141010 },
p: "You are Pediese, an Egyptian trader selling fine linen and papyrus in the market of Babylon about 575 BC, in the time of Pharaoh Apries. A made-up but true-to-life person (say so if asked). Egypt and Babylon were rivals (the battle of Carchemish, 605 BC) yet traded. Speak of the Nile, linen, papyrus, the pyramids already 2,000 years old in your day. Keep to history.",
hi: "Linen from the Nile, finer than any wool of Babylon, cool in the heat. Feel it! I am a long way from home, but silver is silver in any land. What can I show you?" },
ionian: { n: "Lykon, an Ionian carpenter", sex: "m", look: { top: 0x2A5A9A, bottom: 0xF2EEE2, skin: 0xC89A70, hair: 0x3A2A1A },
p: "You are Lykon, a Greek carpenter from Ionia (the coast of what is now western Turkey) working in Babylon about 575 BC; Babylonian ration tablets really do list Ionian carpenters at the palace. A made-up but true-to-life person (say so if asked). Speak of your work, of the Greek cities, of how strange and huge Babylon seems to a Greek. Archimedes will not be born for three hundred years: know nothing of him. Keep to history.",
hi: "Chaire! Greetings! You look as lost as I was when I first came. I am a carpenter; the king pays us Ionians in oil and barley to work his cedar beams. Babylon is bigger than ten Greek cities. Ask me anything." }
};
function babTalker(key, x, y, z, ry) { return __ZC(405, 168, this, arguments, new.target); }
function babTalk(key) { return __ZC(405, 169, this, arguments, new.target); }
function babRoutes() { return __ZC(405, 170, this, arguments, new.target); }
function babWalkers() { return __ZC(405, 171, this, arguments, new.target); }
function babBuild() { return __ZC(405, 172, this, arguments, new.target); }
function wndOthersHide(reg) {
var key = (reg === "hall" || reg === "land") ? "" : reg;
if (BAB.hideFor === key)
return;
BAB.hideFor = key;
WND_SITES.forEach(function (r) { var V = WND.vgroups[r[0]]; if (V)
V.all.visible = wndSiteOn(r[0]) && (!key || key === r[0]); });
}
function babShadufTick(dt) {
var sc = WND_GDN.screw;
if (!sc.poles)
return;
var on = sc.on > 0;
sc.poles.forEach(function (P) { var target = on ? Math.sin(WND.t * 1.6 + P.ph) * 0.45 : 0.25 * (P.ph % 1.6 < 0.8 ? 1 : -1); P.p.rotation.z += (target - P.p.rotation.z) * Math.min(1, dt * 3); });
}
function libShelfPaint(x, W, H) { return __ZC(405, 173, this, arguments, new.target); }
var LIB_TALK = {
eratosthenes: { n: "Eratosthenes of Cyrene, the librarian", sex: "m", look: { top: 0xF2EEE2, bottom: 0xF2EEE2, skin: 0xC89A70, hair: 0xC8C8C0 },
p: "You are Eratosthenes of Cyrene (about 276 to 194 BC), head of the Library of Alexandria under Ptolemy III. You measured the size of the earth from the noon shadows at Syene and Alexandria (about 250,000 stadia round), drew a map of the known world, made a sieve for finding prime numbers and a chronology of history. Teach what is known; the size of the Library's collection is uncertain (ancient numbers run from 40,000 to 700,000 scrolls), and the Library declined over centuries rather than in a single fire. Archimedes is your friend and correspondent.",
hi: "Welcome to the Mouseion, the house of the Muses! Every ship that comes into the harbour has its books copied for us; we keep the copy, or sometimes the original. I am Eratosthenes, keeper of the scrolls. Shall I tell you how I measured the whole earth with a stick and a shadow?" },
copyist: { n: "Theodote, a copyist", sex: "f", look: { top: 0x3A6AA8, bottom: 0xF2EEE2, skin: 0xB88A60, hair: 0x2A1A10 },
p: "You are Theodote, a Greek woman of Alexandria who copies scrolls at the Library about 240 BC. A made-up but true-to-life person (say so if asked). Speak of papyrus from the Nile (strips laid crosswise, pressed, glued into rolls), reed pens and soot ink, the labels (sillyboi) hanging from the scrolls, Callimachus's great catalogue (the Pinakes), and the scholars' work on Homer. Keep to history; say what is uncertain.",
hi: "Careful, the ink is wet! This is the third book of the Iliad, copied from a scroll that came on a ship from Rhodes. A papyrus roll is twenty sheets glued end to end. Would you like to see how we make them?" }
};
function libTalker(key, x, y, z, ry) { return __ZC(405, 174, this, arguments, new.target); }
function wndAlexLibrary() { return __ZC(405, 175, this, arguments, new.target); }
var ALX_HIST = {
alexander: { room: "hall", t: "Alexander's city", by: "after Arrian, Anabasis 3.1-2; Plutarch, Life of Alexander 26; Strabo 17.1.6", p: [
"In the winter of 332 to 331 BC Alexander of Macedon, twenty-four years old and master of Egypt without a battle, sailed down the westernmost branch of the Nile and came to a fishing village called Rhakotis, on a strip of land between the sea and Lake Mareotis. Opposite lay the long island of Pharos, which Homer had named in the Odyssey. Plutarch says Alexander dreamed of an old man reciting those very lines, and woke, and went to see the place.",
"He liked what he saw: a harbour sheltered by the island, fresh water from the lake, and a way inland to the Nile. He marked out the city himself. There was no chalk to hand, so his builders laid out the lines of the streets, the walls and the market with barley meal. Birds came down in clouds and ate it. The seers told him not to be troubled: it meant the city would feed many peoples.",
"The architect was Deinocrates of Rhodes. He drew the streets in a grid, the great Canopic Way running east and west, thirty metres wide, crossed by another running to the sea. The city was laid out in quarters for Greeks, for Egyptians and, soon, for Jews and many others.",
"Alexander never saw it built. He left Egypt in the spring of 331 BC and died in Babylon eight years later, in the palace of Nebuchadnezzar. His general Ptolemy took his body and brought it to Egypt, and in time to this city, where it lies in the Sema, the tomb of the kings, in a coffin of gold.",
"Now, about ninety years later, Alexandria is the greatest city of the Greek world, with perhaps half a million people, and the house of the Muses stands in its royal quarter."
] },
mouseion: { room: "hall", t: "The house of the Muses", by: "after Strabo 17.1.8; Athenaeus 1.22d; Diogenes Laertius 5.78", p: [
"A mouseion is a shrine of the Muses, the nine daughters of Zeus and Memory who keep poetry, history, music, dance and the stars. Ptolemy I Soter, Alexander's general and the first Greek king of Egypt, founded this one about 295 BC, probably on the advice of Demetrius of Phalerum, the exiled ruler of Athens and a pupil of Aristotle's school.",
"Strabo, who saw it about 25 BC, says it has a covered walk, an arcade with seats, and a large house where the scholars eat together. They are paid by the king, they pay no taxes, and they have nothing to do but study, write and teach. A priest of the Muses is in charge, chosen by the king.",
"Not everyone admired it. Timon of Phlius, a sharp-tongued poet, wrote that in crowded Egypt many bookish scribblers were fattened, 'endlessly quarrelling in the bird-cage of the Muses'.",
"The Library belongs to the Mouseion. Its first keepers were Zenodotus of Ephesus, who edited Homer; then Apollonius of Rhodes, the poet; and now Eratosthenes of Cyrene. How many scrolls it holds no one outside can say. Later writers give numbers from 40,000 to 700,000; Callimachus's catalogue alone filled 120 scrolls."
] },
homer: { room: "poetry", t: "Homer and his editors", by: "after the Homeric scholia and the Suda", p: [
"Every Greek child learns Homer: the Iliad, about the wrath of Achilles at Troy, and the Odyssey, about the long voyage home of Odysseus. But by the time the poems came to Alexandria there were many copies, and no two agreed. Some had extra lines, some had lines missing, some had words changed by singers and copyists over four hundred years.",
"Zenodotus of Ephesus, the first keeper of the Library, gathered as many copies as he could and compared them line by line. Where he thought a line was not Homer's he did not cut it out; he put a little dash in the margin, the obelus, so that readers could judge for themselves. He also divided each poem into twenty-four books, one for each letter of the alphabet.",
"Other scholars think Zenodotus was too bold, and the arguing goes on. Ships still bring old copies, from Chios, from Massalia, from Sinope, and each one is read against the rest. This is the work of the Library: to find the truest words of the old poets and keep them."
] },
callimachus: { room: "poetry", t: "The Tables of Callimachus", by: "after the Suda; fragments of the Pinakes", p: [
"Callimachus of Cyrene came to Alexandria as a schoolmaster in the suburb of Eleusis and became the most famous poet at the court. He never held the title of keeper, but he made the Library usable: the Pinakes, the Tables of all those who were distinguished in every kind of learning, and what they wrote.",
"The Tables run to 120 scrolls. Books are sorted first by kind: epic, tragedy, comedy, lyric poetry, history, oratory, laws, philosophy, medicine, mathematics, and a last class for everything else. Within each kind the authors stand in the order of the alphabet, each with a short life, the titles of his works, the first words of each, and how many lines it runs to.",
"That last is a good test: a forger rarely gets the length right. Callimachus is also known for a saying that every student here repeats, often with a sigh: 'a big book is a big evil'. He liked short, polished poems best, and he did not hide it."
] },
apollonius: { room: "poetry", t: "Apollonius and the Argonauts", by: "after the Lives of Apollonius", p: [
"Apollonius was born in Alexandria and taught by Callimachus. He wrote the Argonautica, a long poem in four books about Jason and the heroes of the ship Argo, who sailed to the end of the Black Sea for the Golden Fleece, and of Medea, the king's daughter, who helped Jason and loved him.",
"His old lives say that the first reading went badly and that he left for Rhodes in shame, revised the poem there and came back in triumph, so that men called him Apollonius of Rhodes. They also say he quarrelled bitterly with Callimachus, who disliked long epics. How much of this is true, nobody knows; scholars love a quarrel.",
"He served as keeper of the Library after Zenodotus. Now Eratosthenes has the post, and Apollonius, it is said, is packing his scrolls again."
] },
sappho: { room: "poetry", t: "Sappho, the tenth Muse", by: "after the Palatine Anthology 9.506 and the Alexandrian edition", p: [
"Sappho lived on the island of Lesbos about 600 BC and sang her poems to the lyre: songs of love, of longing, of weddings, of the girls of her circle. Plato, men said, called her the tenth Muse.",
"Her songs were written in the old dialect of Lesbos and many copies were full of mistakes. The scholars here gathered them into nine books, sorted by the metre in which they were sung. The first book alone holds more than a thousand lines.",
"One of her poems begins, in plain words: 'Some say an army of horsemen, some of foot soldiers, some a fleet of ships is the loveliest thing on the black earth; but I say it is whatever one loves.'"
] },
theocritus: { room: "poetry", t: "Two women at the palace", by: "after Theocritus, Idyll 15", p: [
"Theocritus came from Syracuse in Sicily and wrote short poems of shepherds and country singers. One of them is set right here in Alexandria. Two women from Syracuse, Gorgo and Praxinoa, push through the crowds to see the festival of Adonis that Queen Arsinoe gives in the palace.",
"They grumble about husbands, about the dust, about the king's horses in the street ('a soldier's horse nearly trampled me!'), and about a stranger who tells them to stop chattering in their broad accent. 'Who are you to tell us? We are from Corinth, like Bellerophon, and we talk Dorian, and Dorians may talk Dorian!'",
"Inside they see the tapestries, the young Adonis lying on a silver couch, and hear a singer. It is the liveliest picture we have of ordinary people in the city, written about 270 BC."
] },
tragedians: { room: "poetry", t: "The fifteen talents of Athens", by: "after Galen, Commentary on Hippocrates' Epidemics 3", p: [
"Athens keeps official copies of the plays of its three great tragedians, Aeschylus, Sophocles and Euripides, so that actors cannot change the words. King Ptolemy asked to borrow them, to have them copied. The Athenians were wary, and asked for a pledge: fifteen talents of silver, a king's ransom, enough to pay a warship's crew for years.",
"The king paid. He had the scrolls copied on the finest papyrus, kept the originals, and sent the new copies back to Athens with a message: keep the silver. Galen, the physician, tells the story four hundred years later to show how hungry the kings of Egypt were for books.",
"Where the old scrolls of Athens are now kept, the Tables of Callimachus do not say."
] },
herodotus: { room: "history", t: "Herodotus in Egypt", by: "after Herodotus, Histories book 2", p: [
"Herodotus of Halicarnassus travelled in Egypt about 450 BC and filled a whole book with it. He wrote that Egypt is 'the gift of the river': the land the Nile builds each year with its flood. He asked the priests why the river rises in summer, when every other river shrinks, and set out three answers he did not believe and one of his own.",
"He saw the pyramids at Giza and was told that a hundred thousand men worked on the Great Pyramid for twenty years. He wrote of crocodiles, of the sacred cats, of how the Egyptians embalm their dead, and of a Labyrinth near Lake Moeris greater than all the works of the Greeks.",
"Some of what he was told was wrong; much was right. He asked, he wrote down what he heard, and he said plainly when he did not believe it. That is why he is called the father of history."
] },
manetho: { room: "history", t: "Manetho's kings of Egypt", by: "after the fragments of Manetho's Aegyptiaca", p: [
"Manetho was an Egyptian priest of Sebennytos who wrote in Greek, in the time of the first two Ptolemies, so that the Greeks could read the true history of Egypt from the temple records rather than from travellers' tales.",
"He divided the kings of Egypt into thirty dynasties, from Menes, who joined the Two Lands, down to the last native pharaoh, Nectanebo II, whom the Persians drove out in 343 BC. Historians today still use his dynasties.",
"He also wrote that Herodotus had got a great many things wrong, and said so, politely, in a book of his own."
] },
berossus: { room: "history", t: "Berossus of Babylon", by: "after the fragments of Berossus, Babyloniaca", p: [
"In the same years, far to the east, a priest of Marduk in Babylon named Berossus wrote the history of his country in Greek for King Antiochus I. He began with the creation of the world, told of kings before the great flood, and came down to Alexander.",
"It is Berossus who tells of the Hanging Gardens: that King Nebuchadnezzar built terraces planted with trees for his Median queen, who missed the green mountains of her home. No Babylonian tablet names the gardens, and scholars argue still.",
"A copy of his books came to Alexandria. Read beside Manetho, they show two old peoples, the Egyptians and the Babylonians, each answering the Greeks: we were here long before you."
] },
septuagint: { room: "history", t: "The Seventy", by: "after the Letter of Aristeas", p: [
"A letter that claims to be by a courtier named Aristeas tells how King Ptolemy II wished his Library to hold the laws of the Jews, and asked the High Priest in Jerusalem for scholars to translate them into Greek. Seventy-two came, six from each tribe, and finished the work in seventy-two days on the island of Pharos.",
"The letter has many legends in it, and it was probably written later than it pretends. But the translation is real: the Greek version of the first five books of the Hebrew Bible was made in Alexandria in the third century BC, for the Jews of the city, who now speak Greek. It is called the Septuagint, the Seventy.",
"Every year, writes Philo of Alexandria, Jews and others crossed to the island to keep a feast where the translation was made."
] },
procession: { room: "history", t: "The Grand Procession", by: "after Callixeinus of Rhodes, in Athenaeus 5.196-203", p: [
"About 275 BC King Ptolemy II gave a festival in the stadium of Alexandria, and Callixeinus of Rhodes wrote down what passed by. It took a whole day.",
"There were floats of Dionysus with satyrs and nymphs; a wine-press trodden by sixty satyrs; a wineskin of leopard pelts holding thousands of litres that poured out along the street; twenty-four chariots drawn by elephants; antelopes, ostriches pulling carts, wild asses, a giraffe, an Ethiopian rhinoceros and a great white bear. There was a golden statue of Alexander, and a gilded phallus fifty-four metres long carried on a cart, for Dionysus.",
"It was meant to show that the house of Ptolemy was the richest in the world. Most who saw it believed it."
] },
pharos: { room: "history", t: "The tower on Pharos", by: "after Strabo 17.1.6; Lucian, How to Write History 62", p: [
"The lighthouse on the island was finished about 280 BC, built by Sostratus of Cnidus. It is the tallest building the Greeks have ever raised, about a hundred metres, and a fire burns at its top at night to bring ships safe past the reefs.",
"Its dedication reads: 'Sostratus, son of Dexiphanes, of Cnidus, to the Saviour Gods, for those who sail the sea.' Lucian, writing much later, tells a story that Sostratus carved his own name in the stone and covered it with plaster bearing the king's name, knowing that the plaster would fall away in time and his name be left. It is a good story. Nobody knows if it is true.",
"Sostratus was a careful man in other ways too. There is a tale among the copyists that he built more than a tower."
] },
ashoka: { room: "history", t: "Letters from India", by: "after Asoka's Rock Edict XIII; Pliny 6.58", p: [
"Far to the east, beyond Persia, King Asoka of the Maurya rules most of India. After a terrible war in Kalinga he turned to the teaching of the Buddha and carved his edicts on rocks and pillars across his land.",
"In one he writes that he has sent his envoys of dharma, of right living, even to the Greek kings of the west: to Antiochus, and beyond him to Turamaya, Antikini, Maka and Alikasudara. Turamaya is our Ptolemy II.",
"Pliny says Ptolemy II sent an envoy, Dionysius, to the court of India. Greek and Indian kings wrote to one another, and the Library heard of the lands of the Ganges."
] },
ships: { room: "history", t: "The books of the ships", by: "after Galen, Commentary on Hippocrates' Epidemics 3", p: [
"Galen tells that the kings of Egypt were so eager for books that every ship that put in at Alexandria was searched. Any books found aboard were taken to the Library and copied. The copy was given to the owners, and the original was kept, with a label: 'from the ships'.",
"So the stores of the Library fill with books from every port of the sea: from Rhodes, from Athens, from Carthage and Syracuse, from Antioch and Sinope. Many are labelled with the name of the ship's captain or the owner, and the copyists sort them into the Tables of Callimachus.",
"Where all these originals are kept, under lock and seal, is not written in any book in these rooms."
] },
euclid: { room: "science", t: "Euclid's Elements", by: "after Proclus, Commentary on Euclid", p: [
"Euclid taught mathematics in Alexandria in the time of the first Ptolemy. His Elements, in thirteen books, set out geometry and the study of numbers from a handful of definitions and starting truths, proving each step from the ones before.",
"Book one ends with the proof that, in a right-angled triangle, the square on the long side equals the squares on the other two together. Book nine proves that there is no greatest prime number. Book thirteen builds the five regular solids.",
"Proclus tells that King Ptolemy asked if there was a shorter way to learn geometry than the Elements, and Euclid answered: 'There is no royal road to geometry.' Another story says a pupil asked what he would gain by learning it, and Euclid told his slave to give the boy a coin, 'since he must make a profit from what he learns'."
] },
eratosthenes: { room: "science", t: "The measure of the earth", by: "after Cleomedes, On the Circular Motions 1.7", p: [
"Eratosthenes of Cyrene, keeper of the Library, has measured the whole earth without leaving Egypt. At Syene, far up the Nile, on midsummer's day at noon, the sun shines straight down a deep well and a pole casts no shadow. At the same hour at Alexandria a pole does cast one: its angle is a fiftieth part of a whole circle.",
"If the sun's rays are parallel, the earth's surface must curve between the two cities by that same fiftieth part. The road from Syene to Alexandria is reckoned at 5,000 stadia. So the whole way round is fifty times that: 250,000 stadia.",
"How long his stadion was we do not know for sure, so we cannot say exactly how close he came; by most reckonings within a few hundredths of the truth. He also made a map of the known world with lines of latitude, and a way of finding prime numbers by crossing out the multiples, which he calls a sieve. His rivals call him 'Beta', second best at everything. He does not seem to mind."
] },
archimedes: { room: "science", t: "Archimedes of Syracuse", by: "after Diodorus 1.34 and 5.37; Archimedes' letters", p: [
"Archimedes lives in Syracuse in Sicily, but he studied in Alexandria as a young man and writes still to the mathematicians here: to Conon of Samos until he died, then to Dositheus, and to Eratosthenes.",
"Diodorus says that while he was in Egypt he invented the water screw, a spiral tube that lifts water when turned, which Egyptians now use to water their fields and Spaniards to drain their mines. So the screw is a Greek machine, and a new one, unknown to the old kingdoms of Egypt and Babylon; there they lift water with the shaduf, a pole and a bucket.",
"He sends problems as challenges. One, they say, asks how many cattle were in the herds of the Sun god in Sicily, from a set of riddling clues. No one here has solved it."
] },
herophilus: { room: "science", t: "Herophilus, who looked inside", by: "after Galen and Celsus, On Medicine, preface", p: [
"Herophilus of Chalcedon came to Alexandria in the time of the first Ptolemy and became the first Greek to cut open human bodies to learn how they are made. He named the duodenum, found that the nerves run from the brain, and told nerves apart from sinews. He wrote about the eye, the liver and the womb.",
"He was the first to measure the pulse by time: he carried a small water clock to the bedside, set to run for the span of a healthy pulse, and counted the beats.",
"Celsus, writing three hundred years later, says that Herophilus and Erasistratus were given condemned criminals from the king's prisons and cut them open while they still lived. Some scholars doubt it; others believe it. It is not spoken of at the dinner table."
] },
ctesibius: { room: "science", t: "Ctesibius the barber's son", by: "after Vitruvius 9.8 and 10.7; Athenaeus 4.174", p: [
"Ctesibius was the son of a barber in Alexandria. Vitruvius says that as a boy he hung a mirror in his father's shop on a cord with a lead weight running in a tube, and noticed that the weight, pushing out the air, made a sound. From that he came to understand that air is a body, that it can be pushed and that it pushes back.",
"He made a pump with two cylinders to throw water, the first such pump. He made the hydraulis, an organ whose pipes are blown by air pressed by water. And he made a water clock far better than any before, which keeps its water always at the same height so that it drips at the same speed, and moves a figure that points to the hours.",
"He shows them all in the hall of the king's treasures, and is very glad to be asked how they work."
] },
aristarchus: { room: "science", t: "Aristarchus and the moving earth", by: "after Archimedes, The Sand-Reckoner; Aristarchus, On the Sizes and Distances", p: [
"Aristarchus of Samos measured the angle between the sun and the half moon and reasoned that the sun is many times farther away than the moon, and therefore many times larger than the earth.",
"Archimedes writes that Aristarchus put forward a strange idea: that the fixed stars and the sun do not move, and that the earth goes round the sun in a circle, the sun lying in the middle. Most scholars here think this absurd, since we would feel the earth move.",
"Cleanthes the Stoic said Aristarchus should be charged with impiety for setting the hearth of the world in motion. Nobody was charged."
] },
papyrus: { room: "science", t: "How papyrus is made", by: "after Pliny, Natural History 13.68-83", p: [
"Papyrus grows in the marshes of the Nile delta, a tall reed with a three-sided stem. The stem is cut into lengths and the green rind peeled away. The pale pith inside is sliced into long thin strips.",
"The strips are laid side by side on a board, then a second layer across them. The two layers are pressed and beaten; the plant's own sap glues them into one sheet. The sheets dry in the sun and are polished smooth with a stone or a shell. About twenty sheets are glued edge to edge to make a roll.",
"Egypt makes all the papyrus of the world, and the king's treasury grows rich on it. Writing is done with a reed pen and ink of soot and gum. A roll is read by unrolling it from the right hand into the left, a column at a time."
] }
};
var ALX_ROOMS = { hall: "the reading hall", poetry: "poetry and Homer", history: "histories and geography", science: "medicine and mathematics" };
var ALX_CASES = {
clock: { t: "The water clock of Ctesibius", p: "Water runs into a tall cylinder from a funnel kept always brim-full by an overflow, so it drips at the same speed all day. A float rises with the water and lifts a little figure that points to the hours on a column. Because the Egyptian day is cut into twelve hours from sunrise to sunset whatever the season, the column can be turned so the hours are long in summer and short in winter. (Vitruvius 9.8.) Watch the float rise." },
organ: { t: "The hydraulis, the water organ", p: "Two pumps push air into a bronze bell standing in a tank of water. The water presses on the air and keeps it steady, so the pipes sound evenly while the pumps are worked. Each key opens one pipe. Ctesibius invented it here in Alexandria. His wife Thais is said to have been its first player. (Athenaeus 4.174.)" },
sphere: { t: "The armillary sphere", p: "Bronze rings for the circles of the heavens: the equator, the tropics, the zodiac running slantwise, the circles through the poles. Turn it and the sun's path moves among the stars. Ptolemy the astronomer, four hundred years from now, says Eratosthenes measured the slant of the zodiac (the tilt of the earth) as eleven eighty-thirds of half a circle: about 23 degrees and 51 minutes. It is very close." },
elements: { t: "Euclid's Elements, an early copy", p: "Thirteen rolls in a cedar box, the diagrams drawn in red ink. Book one is open at the last proposition: in right-angled triangles the square on the side opposite the right angle equals the squares on the sides about it. Every copy of geometry in the world for two thousand years will begin from this book." },
receipt: { t: "The receipt for fifteen talents", p: "A copy of the pledge King Ptolemy paid to Athens to borrow the official scrolls of Aeschylus, Sophocles and Euripides: fifteen talents of silver, about 390 kilograms. The king kept the scrolls and let Athens keep the silver. The originals are not on show. Where they are, the label does not say." },
tusk: { t: "A war elephant's tusk", p: "Ptolemy II sent hunters to the shores of the Red Sea and founded a town, Ptolemais of the Hunts, to catch African forest elephants and train them for war, since the Seleucid kings had Indian elephants. This tusk came from one of them. (Agatharchides; the Pithom stele.) At the battle of Raphia, twenty-six years from now, the smaller African elephants will turn and run from the Indian ones." },
beasts: { t: "A painted board of the Grand Procession", p: "Painted for the palace from the day of the Grand Procession, about 275 BC: elephants pulling chariots, ostriches in harness, a giraffe ('the camel-leopard'), a rhinoceros from Ethiopia and a great white bear. Callixeinus of Rhodes wrote it all down." },
tablet: { t: "A clay tablet from Babylon", p: "An astronomical diary written in cuneiform on clay: night by night, what the moon and planets did, the weather, the price of barley, the height of the river. The priests of Babylon have kept such diaries for five hundred years. A Chaldean brought it; few here can read it. Hipparchus, a century from now, will use Babylonian records of eclipses." },
coins: { t: "Coins of the kings", p: "A gold daric of the Persian kings, a silver tetradrachm of Alexander with Heracles in a lion skin, and a coin of Ptolemy I showing Alexander wearing the scalp of an elephant, its trunk raised over his brow, and the horns of the god Ammon. The Ptolemies keep their own lighter coin, and no foreign coin may be spent in Egypt: it must be changed at the king's bank." },
deadbook: { t: "A Book of Going Forth by Day", p: "An Egyptian papyrus of spells to guide the dead through the world below, painted for a priest of Thebes: the heart weighed against the feather of Maat before Osiris, and Ammit, the devourer, waiting beside the scales. Egyptians have made such books for twelve centuries; the Greeks call it, wrongly, the Book of the Dead." },
tools: { t: "A physician's instruments", p: "Bronze scalpels, probes, a spatula, hooks, forceps and a cupping vessel, in a wooden case. The Herophilean physicians use such sets. Before cutting they wash the blade in wine. There is no way yet to make a patient sleep through pain except poppy juice and mandrake, and both can kill." },
casket: { t: "The casket of Darius", p: "Plutarch tells that among the treasures of the Persian king Darius was a casket of great price, and Alexander asked his friends what he should keep in it. He chose his copy of the Iliad, corrected by his teacher Aristotle, and slept with it under his pillow beside his dagger. This is a casket of that kind. The scroll, the guards say, went into the Sema with him." },
map: { t: "The map of the world", p: "Eratosthenes' map on a whitened board: the inhabited world as a long island from the Pillars of Heracles in the west to India in the east, crossed by a line of latitude through Rhodes and a line of longitude through Alexandria, Syene and Meroe. Britain is a rough triangle in the north; the Caspian is a gulf of the outer Ocean, which is wrong." },
maid: { t: "Philo's servant", p: "A bronze maid who holds a jug. Set a cup in her hand and she pours wine, then water to mix it, and stops by herself. Inside, pipes and air do the work. Philo of Byzantium, who works in Alexandria, describes her in his book on machines driven by air and water." },
dedication: { t: "Sostratus's stone", p: "A copy of the dedication from the lighthouse: 'Sostratus, son of Dexiphanes, of Cnidus, to the Saviour Gods, for those who sail the sea.' The mason who cut the copy left a mark in the corner: a little ring, and below it the letters for 'beneath'." },
edict: { t: "Words from India", p: "A copy, in Greek and in Aramaic, of a proclamation of King Asoka of India, of the kind he carved at Kandahar: he has given up killing, and his people too, and the hunters and fishermen have stopped. Envoys brought it to King Ptolemy. A note in another hand is tucked behind it." }
};
var ALX_SECRETS = {
tile: { t: "Verses under a tile", d: 0, p: "Under a loose tile in the reading hall someone hid a strip of papyrus: four bitter lines about 'a cage of fattened birds who peck at every poem but their own', signed with a single letter, A. Apollonius, perhaps, before he left." },
timon: { t: "The bird-cage", d: 0, p: "Scratched under the long table of the dining hall, where the scholars lie to eat: 'THE BIRD-CAGE OF THE MUSES'. Timon's jibe, carved by some scholar with a sense of humour." },
obelus: { t: "Zenodotus's dashes", d: 0, p: "On the desk in the poetry room, an old copy of the Iliad with Zenodotus's marks: little dashes in the margin beside every line he doubted. He did not cut the lines out. He let you judge." },
globe: { t: "Sums under the globe", d: 0, p: "Under the bronze globe in the lecture hall, scratched on the stone, Eratosthenes' working: 7 1/5 degrees, 1/50, 5,000, 250,000. And beside it, crossed out, a first try that came out wrong." },
ashoka: { t: "The note behind the edict", d: 0, p: "Tucked behind the Indian king's proclamation: a note in Greek from the envoy Dionysius: 'At the court of Pataliputra I heard a teacher say that every made thing passes away, and that the end of sorrow is to stop wanting. They feed the sick beasts as well as the sick men there.' Nobody in the Library has made anything of it." },
ring: { t: "The ring and 'beneath'", d: 0, p: "The mason's mark on Sostratus's stone: a ring, and 'beneath'. Sostratus built the lighthouse, and, the copyists say, more than a tower." },
poison: { t: "The poison bed", d: 1, p: "In the physicians' garden one bed is set apart behind a low wall: hemlock, henbane, monkshood, mandrake. Andreas grows them to study the poisons and their cures. Every one of them can kill." },
asp: { t: "The asp in the garden", d: 2, p: "An Egyptian cobra lives in the warm stones of the garden wall. Its bite kills in hours. The physicians leave it be: it keeps the rats from the seed." },
trap: { t: "The ring in the medicine room", d: 1, p: "Under the rug of the medicine and mathematics room, a bronze ring set in a stone slab. Lift it, and a stair goes down into the dark." },
tragedies: { t: "The scrolls of Athens", d: 0, p: "In the stores below, in a sealed cedar chest: the official copies of Aeschylus, Sophocles and Euripides that Athens lent against fifteen talents. The originals. The king never sent them back." },
sand: { t: "The fire sand", d: 0, p: "Beside the stair in the stores, a great jar of dry sand with a scoop. The keepers of the stores know what a spark can do among papyrus." },
fire: { t: "Flame among papyrus", d: 2, p: "An open flame and dry papyrus. The Library will fear fire for as long as it stands." },
scytale: { t: "The rod and the strip", d: 1, p: "A wooden rod in the stores, and on the cistern door a leather strip of jumbled letters. Wound round the right rod, the strip reads plain. The Spartans used such rods for secret letters." },
plank: { t: "The plank over the cistern", d: 2, p: "An old plank laid across the great cistern, half rotten. The water below is deep and black and cold." },
dissect: { t: "The notebook of Herophilus", d: 1, p: "In the forbidden room, the notebook of Herophilus on what he saw inside the body, and how he came to see it. Some of it was learned from men who were alive." },
pots: { t: "The red pots", d: 1, p: "Red clay pots and figures written with the names of the king's enemies, made to be smashed: the old Egyptian rite of cursing. The shards are sharp." },
map: { t: "The letter of Sostratus", d: 2, p: "A letter of Sostratus of Cnidus to King Ptolemy II: he has dug, as ordered, a way beneath the royal quarter from the stores of the books to the lower chamber of the Sema, 'so that the king may visit his father Alexander unseen'. And a plan." },
debt: { t: "Kleon's debt", d: 1, p: "A wax tablet dropped among the scrolls: Kleon, a porter of the Mouseion, owes a moneylender of the harbour three talents, to be paid by the next new moon, 'or his sister is sold'." },
setne: { t: "The tale of Setne", d: 0, p: "A demotic papyrus of the tale of Setne Khamwas, the prince who stole the Book of Thoth from a tomb and was punished until he put it back. A warning for anyone who goes into tombs." },
tunnel: { t: "The robbers' way", d: 3, p: "Beyond a breach in the forbidden room, the old tunnel of Sostratus, and new marks of a chisel. The roof is cracked." },
sema: { t: "The lower chamber of the Sema", d: 3, p: "Beneath the tomb of the kings: Alexander of Macedon in his coffin of gold. Death, under the law, for anyone who touches it." }
};
var ALX_SHIPS = [
{ k: "s1", t: "'Sing, goddess, the wrath of Achilles, son of Peleus...'", room: "poetry", w: "the Iliad" },
{ k: "s2", t: "'Herodotus of Halicarnassus here sets out what he learned, so that the deeds of men may not be forgotten...'", room: "history", w: "Herodotus" },
{ k: "s3", t: "'A point is that which has no part. A line is length without breadth...'", room: "science", w: "Euclid's Elements" },
{ k: "s4", t: "'Life is short, the art is long, the moment fleeting, experiment perilous, judgment hard...'", room: "science", w: "Hippocrates' Aphorisms" },
{ k: "s5", t: "'Some say an army of horsemen is the loveliest thing on the black earth...'", room: "poetry", w: "Sappho" },
{ k: "s6", t: "'Thucydides of Athens wrote the war of the Peloponnesians and Athenians, beginning as soon as it broke out...'", room: "history", w: "Thucydides" },
{ k: "s7", t: "'Tell me, Muse, of the man of many turns, who wandered far after he sacked Troy...'", room: "poetry", w: "the Odyssey" },
{ k: "s8", t: "'Of the stars that turn about the pole, the Bears are the brightest...' (a book of the heavens, in prose, with figures)", room: "science", w: "a book of astronomy" },
{ k: "s9", t: "'From the mouth of the Nile to the Pillars of Heracles is so many stadia, sailing along the coast...'", room: "history", w: "a coasting voyage (geography)" },
{ k: "s10", t: "'Let us begin with Zeus, whom we mortals never leave unnamed...'", room: "poetry", w: "Aratus' Phaenomena (a poem)" }
];
var ALX_FORBID = {
dissect: { t: "The notebook of Herophilus", p: "Small close writing, with drawings. The nerves running from the brain like the roots of a tree. The four chambers of the heart. The liver, the womb. And on a page set apart: notes from 'the men the king gave us from the prison', with times, and what moved, and for how long. It is the most exact book of the body in the world, and a horror.", keep: "dissect" },
pots: { t: "The red pots", p: "Thirty red clay pots and little kneeling figures with bound arms, each written in black with names: Libyan chiefs, Nubian kings, a rebel of the Delta. The priests smash them so the names are broken too.", keep: "pots" },
map: { t: "A letter with a plan", p: "'Sostratus son of Dexiphanes to King Ptolemy, greetings. The way is dug as you ordered, from beneath the storehouse of the books to the lower chamber of the Sema, so that you may visit your father Alexander unseen and in quiet. It is narrow, and in the middle the rock is poor; I have propped it with beams of cedar, which will not last for ever...' A plan is drawn below: a door at the east end of this room, walled up.", keep: "map" },
debt: { t: "A wax tablet", p: "Fresh, the wax barely scratched by dust: 'Kleon, porter of the Mouseion, owes to Philon the moneylender of the Eunostos harbour three talents, to be paid at the new moon. If not, his sister Myrrhine is sold at the slave market.' Three talents is more than a porter earns in a lifetime.", keep: "debt" },
manetho: { t: "Manetho's draft", p: "Manetho's own working roll of the king lists, crowded with corrections: thirty dynasties, the names of kings in Greek with the Egyptian beside them, and a note in the margin: 'Herodotus is wrong about Cheops. Again.' Nothing dangerous here, unless you are Herodotus.", keep: "" },
setne: { t: "The tale of Setne Khamwas", p: "A demotic papyrus: Prince Setne goes down into the tomb of Naneferkaptah to take the Book of Thoth, which lets its reader understand the speech of birds and see the gods. The dead man's wife warns him what it cost them. He takes it anyway, and loses everything, until he returns it to the tomb. The copyist has added at the end, in Greek: 'Put back what is not yours.'", keep: "setne" }
};
var ALX = { sp: {}, items: {}, figs: {}, lid: null, lidF: null, lidL: null, door: null, doorS: null, doorL: null, clock: null, sphere: null, fire: null, beam: null, line: "", hold: 0, last: null, step: null, vfx: null, t: 0 };
var ALX_Y = -6;
function alxDyn(x, y, z, ry) { var g = wndGroup(x, y, z, ry || 0); g.userData.keep = 1; return g; }
function alxSpot(id, x, z, y, r, name, verb) {
ALX.sp[id] = { x: x, z: z, y: y || 0, name: name };
ALX.sp[id].S = wndSpot(x, z, r || 2, name, verb, function () { alxPress(id); }, { y: y || 0, when: function () { return alxSpotOn(id); } });
}
var ALX_HOLE = { x0: 82.4, x1: 84.4, z0: -76, z1: -68 };
function alxMedFloor(x0, x1, z0, z1) { return __ZC(405, 176, this, arguments, new.target); }
function alxLid(open) { return __ZC(405, 177, this, arguments, new.target); }
function alxCaseMesh(kind, g) { return __ZC(405, 178, this, arguments, new.target); }
function alxBeastsPaint(c, W, H) { return __ZC(405, 179, this, arguments, new.target); }
function alxDeadPaint(c, W, H) { return __ZC(405, 180, this, arguments, new.target); }
function alxMapPaint(c, W, H) { return __ZC(405, 181, this, arguments, new.target); }
var ALX_CASE_AT = { elements: [38, -123, 0], receipt: [48, -123, 0], tusk: [58, -123, 0], beasts: [68, -123, 0], tablet: [78, -123, 0], coins: [88, -123, 0], deadbook: [98, -123, 0],
tools: [40, -95, Math.PI], casket: [50, -95, Math.PI], map: [60, -95, Math.PI], maid: [76, -95, Math.PI], dedication: [86, -95, Math.PI], edict: [96, -95, Math.PI] };
function alxGallery() { return __ZC(405, 182, this, arguments, new.target); }
var ALX_BEDS = { fennel: [118, -68], hemlock: [132, -68], rue: [118, -58], henbane: [132, -58], poppy: [118, -36], monkshood: [132, -36], carrot: [118, -26], mandrake: [132, -26] };
var ALX_BED_LOOK = { fennel: [0x6A9A3A, 0xE8D040], hemlock: [0x4A7A2A, 0xF4F4F0], rue: [0x7A9A6A, 0xE8D850], henbane: [0x6A7A4A, 0xD8C890], poppy: [0x6A8A4A, 0xC8302A], monkshood: [0x3A5A2A, 0x5A4AA8], carrot: [0x5A8A3A, 0xF0F0E8], mandrake: [0x3A6A2A, 0x8A6AA8] };
function alxGarden() { return __ZC(405, 183, this, arguments, new.target); }
function alxUnder() { return __ZC(405, 184, this, arguments, new.target); }
function alxTombPaint(c, W, H) { return __ZC(405, 185, this, arguments, new.target); }
var ALX_TALK = {
kallias: { n: "Kallias, doorkeeper of the Mouseion", sex: "m", at: [36, 0, -40, -Math.PI / 2], look: { top: 0xD8CCB0, bottom: 0x8A6A3A, skin: 0xB88A60, hair: 0x6A6A60 },
p: "You are Kallias, the old doorkeeper of the Mouseion in Alexandria about 243 BC, a made-up but true-to-life person (say so if asked). You know every scholar by sight and most of the gossip: Eratosthenes is the new keeper, Apollonius is leaving for Rhodes, old Callimachus is ill but still writing, Ctesibius shows his machines in the king's treasures. You keep the register of readers. Keep to history.",
hi: "Another reader! Put your name in the register, young one. Everyone who comes in, I write down; the king likes to know who reads his books." },
callimachus: { n: "Callimachus of Cyrene, poet", sex: "m", at: [52.7, 0, -74, 0], look: { top: 0xE8E0D0, bottom: 0xE8E0D0, skin: 0xC89A70, hair: 0xD8D8D0 },
p: "You are Callimachus of Cyrene, the old poet and scholar of Alexandria (about 305 to 240 BC), maker of the Pinakes, the catalogue of the Library in 120 scrolls, sorted by kind and then by author. You prefer short, polished poems ('a big book is a big evil') and you quarrelled with Apollonius. You are old and ill, and witty. Keep to history; say what is uncertain.",
hi: "Ah. Mind the scrolls. I have catalogued every one of them, and I would rather not catalogue the dust from your sandals. What do you want?" },
apollonius: { n: "Apollonius, poet of the Argonauts", sex: "m", at: [58, 0, -34, Math.PI / 2], look: { top: 0x3A5A8A, bottom: 0xE8E0D0, skin: 0xC08A60, hair: 0x2A1A10 },
p: "You are Apollonius of Rhodes, poet of the Argonautica and former keeper of the Library, about 243 BC, packing to leave Alexandria for Rhodes now that Eratosthenes holds your post. Proud, wounded, generous with anyone who loves Jason and Medea. Keep to what is known and say how uncertain the stories of your quarrel are.",
hi: "Careful with that box, it is the fourth book of my Argonauts. I am leaving for Rhodes. The Rhodians at least know a poem when they hear one." },
ctesibius: { n: "Ctesibius, maker of machines", sex: "m", at: [54, 0, -109, -Math.PI / 2], look: { top: 0x8A4A2A, bottom: 0xD8CCB0, skin: 0xB88A60, hair: 0x3A2A1A },
p: "You are Ctesibius of Alexandria, the barber's son who became the greatest maker of machines of his age, about 243 BC: the double force pump, the hydraulis (water organ), the improved water clock with a constant head, experiments on the springiness of air. Explain how things work clearly and happily. Keep to history.",
hi: "Welcome, welcome! Do you know why my clock keeps better time than any in the world? Most people only ask what hour it is. Ask me how!" },
andreas: { n: "Andreas of Carystus, physician", sex: "m", at: [124, 0, -47, -Math.PI / 2], look: { top: 0xE8E4D8, bottom: 0x6A5A4A, skin: 0xC08A60, hair: 0x2A1A10 },
p: "You are Andreas of Carystus, a young physician of the school of Herophilus in Alexandria about 243 BC (later physician to Ptolemy IV). You study drugs, poisons and the bites of snakes and spiders. Speak of herbs, of the pulse, of Herophilus's anatomy and of how dangerous the poison plants are. Never give modern medical advice or recipes for harm. Keep to history.",
hi: "Mind where you step: the beds on the right are not for salads. I am Andreas, a physician. Are you hurt, or only curious?" },
kleon: { n: "Kleon, a porter", sex: "m", at: [76, 0, -60, Math.PI], look: { top: 0x7A6A4A, bottom: 0x5A4A3A, skin: 0xA87A54, hair: 0x1A1410 },
p: "You are Kleon, a porter of the Mouseion about 243 BC who carries scroll-boxes from the harbour. A made-up person. You are deep in debt to a moneylender and frightened for your sister, but you hide it: you are short, evasive, and change the subject. Keep to history.",
hi: "Out of the way, out of the way, heavy box. ...What? No, I have no time to talk." }
};
function alxTalker(key) {
var T = ALX_TALK[key], A = T.at, look = Object.assign({ sex: T.sex }, T.look);
var g = ALX.figs[key] = wndPersonFig("alx_" + key, A[0], A[1], A[2], A[3], look, "");
WND.people.push({ g: g, site: "pharos", v: WNK.v });
alxSpot("p_" + key, A[0], A[2], A[1], 2.4, T.n, "talk with " + (T.sex === "f" ? "her" : "him"));
}
function alxTalkFree(key) { return __ZC(405, 186, this, arguments, new.target); }
var ALX_FIND = {
s1: [63, -44.2, 0], s2: [40, -30, 0], s3: [93, -26, 0], s4: [94, -56, 0], s5: [80, -17.2, 0], s6: [25.5, -30, 0.6], s7: [50, -86, 0], s8: [107, -53, 0], s9: [84, -63.5, 0], s10: [-4, -62, 0],
letter: [94.2, -30.4, 0], lamp: [48, -24.8, 0], rod: [89.5, -90.4, ALX_Y]
};
function alxFindMesh(kind) { return __ZC(405, 187, this, arguments, new.target); }
function alxFinds() { return __ZC(405, 188, this, arguments, new.target); }
function alxMouseionSpots() { return __ZC(405, 189, this, arguments, new.target); }
function alxWalkers() { return __ZC(405, 190, this, arguments, new.target); }
function wndAlexGrow() { return __ZC(405, 191, this, arguments, new.target); }
function alxS() { return __ZC(405, 192, this, arguments, new.target); }
function alxSave() { wndProgSave(); }
function alxEsc(t) { return wndEsc(t); }
function alxN(o) { return Object.keys(o || {}).length; }
function alxActive() { var S = alxS(); return !!(S.on && !S.done); }
function alxStep() { var S = alxS(); if (!alxActive())
return null; var C = ALX_CH[S.ch]; return C ? C.steps[S.s] || null : null; }
function alxAtList(st) { if (!st || !st.at)
return []; var a = typeof st.at === "function" ? st.at() : st.at; return Array.isArray(a) ? a : [a]; }
function alxAccepts(st, id) { return !!st && !!st.on && alxAtList(st).indexOf(id) >= 0; }
function alxUnderId(id) { var P = ALX.sp[id]; return !!P && P.y < -3; }
function alxTone(f, t) { try {
if (typeof playTone === "function")
playTone(f, t);
}
catch (e) { } }
function alxSay(h) { wndSay("📜 " + h); }
function alxSpotOn(id) { return __ZC(405, 193, this, arguments, new.target); }
function alxPress(id) {
var st = alxStep();
if (st && alxAccepts(st, id))
return st.on(id);
var F = ALX_FREE[id.replace(/_.*$/, "_")] || ALX_FREE[id];
if (F)
return F(id);
}
var ALX_FREE = {
register: function () { alxStoryCard(); },
pinakes: function () { alxPinakesCard(false); },
sundial: function () { alxCard("A sundial", "<p>A stone bowl hollowed like the inside of the sky, with a pointer. The tip's shadow crosses lines for the twelve hours of daylight. Eratosthenes uses a bowl like this to measure the sun's height at noon.</p>"); },
shelf_: function (id) { alxShelfCard(id.slice(6)); },
case_: function (id) { alxCaseCard(id.slice(5)); },
p_: function (id) { alxTalkFree(id.slice(2)); },
sec_: function (id) { alxSecret(id.slice(4), true); },
bed_: function (id) { alxBedCard(id.slice(4), false); },
f_: function (id) { alxForbidCard(id.slice(2)); },
sand: function () { alxSecret("sand", true); alxS().f.sand = 1; alxSave(); },
jarsA: function () { alxCard("Jars of scrolls", "<p>Tall jars sealed with clay, each with a tag: 'from the ships', the name of the ship and its captain. Rhodes, Sinope, Massalia, Carthage.</p>"); },
jarsB: function () { alxCard("Jars of scrolls", "<p>More jars, more tags. Somewhere a drip of water ticks into a puddle.</p>"); },
chest: function () { alxCard("A cedar chest", "<p>Sealed with the king's seal. " + (alxS().sec.tragedies ? "Inside are the scrolls of Athens." : "It is heavy.") + "</p>"); },
breach: function () { alxSecret("tunnel", true); },
crack: function () { alxCard("The crack", "<p>A crack across the roof of the tunnel, and a cedar prop bent like a bow. Walk under it quickly or not at all.</p>"); },
coffin: function () { alxSecret("sema", true); }
};
function alxCard(title, html, btns, o) { return __ZC(405, 194, this, arguments, new.target); }
function alxP(list) { return list.map(function (p) { return "<p style='margin:6px 0'>" + alxEsc(p) + "</p>"; }).join(""); }
function alxQuiz(title, intro, q, answers, right, o) { return __ZC(405, 195, this, arguments, new.target); }
function alxQuizzes(title, list, done, i) { i = i || 0; if (i >= list.length)
return done(); var Q = list[i]; alxQuiz(title, Q[0], Q[1], Q[2], function () { alxQuizzes(title, list, done, i + 1); }, { sub: (i + 1) + " of " + list.length }); }
function alxVfx(col, peak) { return __ZC(405, 196, this, arguments, new.target); }
function alxHurt(n, why) {
var S = alxS();
S.vit = Math.max(0, S.vit - n);
alxSave();
alxVfx();
alxSay("<b>" + alxEsc(why) + "</b> (❤ " + S.vit + ")");
if (S.vit <= 0) {
setTimeout(alxFaint, 900);
return true;
}
return false;
}
function alxFaint() { return __ZC(405, 197, this, arguments, new.target); }
function alxPut(x, z, y, ry) { var A = WND_AT.pharos; camera.position.set(WND.base + A.x + x, (y || 0) + 1.72, A.z + z); if (typeof yaw !== "undefined" && ry != null)
yaw = ry; if (typeof flyY !== "undefined")
flyY = 0; }
function alxSecret(k, show) { return __ZC(405, 198, this, arguments, new.target); }
function alxSkulls(d) { return d ? new Array(d + 1).join("☠") : "none"; }
function alxSecretsCard() { return __ZC(405, 199, this, arguments, new.target); }
function alxReadCard(k, back) { return __ZC(405, 200, this, arguments, new.target); }
function alxShelfCard(room) { return __ZC(405, 201, this, arguments, new.target); }
function alxShelve(x, room) { return __ZC(405, 202, this, arguments, new.target); }
function alxCaseCard(k) { return __ZC(405, 203, this, arguments, new.target); }
var ALX_BED_TXT = {
fennel: "Tall feathery leaves, yellow flowers in flat umbrellas, and a sweet smell of aniseed when you crush a leaf.",
rue: "A low grey-blue bush with small rounded leaves and yellow four-petalled flowers. A sharp, bitter smell.",
poppy: "Grey-green leaves, red flowers, and round seed heads. Andreas scratches the heads to gather their milk.",
carrot: "Lacy leaves and white flower umbrellas with a single dark red floweret in the middle. The stems are hairy, and the root smells of carrot.",
hemlock: "Lacy leaves and white flower umbrellas, very like wild carrot, but the stems are smooth and blotched with purple, and a crushed leaf smells of mice.",
henbane: "Sticky hairy leaves and dull yellow flowers veined with purple, with a heavy rank smell.",
monkshood: "Tall spikes of hooded dark blue flowers, like a monk's cowl.",
mandrake: "A flat rosette of broad leaves on the ground, purple flowers, and yellow fruit like small apples."
};
var ALX_HERBS = { fennel: 1, rue: 1, poppy: 1, carrot: 1 }, ALX_POISON = { hemlock: "hemlock", henbane: "henbane", monkshood: "monkshood (aconite)", mandrake: "mandrake" };
function alxBedCard(k, step) { return __ZC(405, 204, this, arguments, new.target); }
function alxPick(k) { return __ZC(405, 205, this, arguments, new.target); }
function alxAsp() { return __ZC(405, 206, this, arguments, new.target); }
function alxForbidCard(k) { return __ZC(405, 207, this, arguments, new.target); }
function alxPinakesCard(step) { return __ZC(405, 208, this, arguments, new.target); }
function alxOrgan(step) { return __ZC(405, 209, this, arguments, new.target); }
function alxScytale() { return __ZC(405, 210, this, arguments, new.target); }
var ALX_ER = [92, -63.5], ALX_TH = [52, -22.8];
var ALX_CH = [
{ t: "A stranger at the gate", intro: "Alexandria, about 243 BC, the fourth year of King Ptolemy III. You have come by ship with a letter for the keeper of the Library, hoping for a place as a reader of the Mouseion. The doorkeeper is in the entrance hall, west of the garden court.", steps: [
{ say: "Talk with Kallias, the doorkeeper, in the entrance hall", at: "p_kallias", on: function () { return __ZC(405, 211, this, arguments, new.target); } },
{ say: "Read 'Alexander's city' from the reading hall's shelves (south of the court)", at: "shelf_hall", on: function () { alxShelfCard("hall"); }, cond: function (S) { return !!S.read.alexander; } },
{ say: "Find Eratosthenes, the keeper, in the lecture hall (east of the court)", at: "p_eratosthenes", on: function () { return __ZC(405, 212, this, arguments, new.target); } }
] },
{ t: "The ships' books", intro: "Ten scrolls from the Rhodian ship lie scattered about the Mouseion and its streets: in the court, the halls, the porch, even down by the harbour. A small glow marks each.", steps: [
{ say: "Find the ten scrolls from the Rhodian ship", n: function (S) { return ALX_SHIPS.filter(function (x) { return S.got[x.k]; }).length + " of 10"; }, at: function () { var S = alxS(); return ALX_SHIPS.filter(function (x) { return !S.got[x.k]; }).map(function (x) { return x.k; }); }, many: 1,
on: function (id) { return __ZC(405, 213, this, arguments, new.target); },
cond: function (S) { return ALX_SHIPS.every(function (x) { return S.got[x.k]; }); } },
{ say: "Shelve the ten scrolls in their rooms, along the north side of the court", shelving: 1, n: function (S) { return alxN(S.shelved) + " of 10"; }, at: ["shelf_poetry", "shelf_history", "shelf_science"], on: function (id) { alxShelfCard(id.slice(6)); }, cond: function (S) { return ALX_SHIPS.every(function (x) { return S.shelved[x.k]; }); } },
{ say: "Tell Eratosthenes the scrolls are shelved", at: "p_eratosthenes", on: function () { return __ZC(405, 214, this, arguments, new.target); } }
] },
{ t: "Ink and papyrus", intro: "Theodote, a copyist, works in the reading hall. The Library's day is the work of copying: every book that comes in is copied, and the old ones are copied again before they crumble.", steps: [
{ say: "Talk with Theodote the copyist, in the reading hall", at: "p_copyist", on: function () { alxPapyrus(); } },
{ say: "Read five more histories from any shelves", at: ["shelf_hall", "shelf_poetry", "shelf_history", "shelf_science"], on: function (id) { alxShelfCard(id.slice(6)); }, begin: function (S) { S.f.rb3 = alxN(S.read); }, cond: function (S) { return alxN(S.read) >= (S.f.rb3 || 0) + 5; }, n: function (S) { return Math.min(5, alxN(S.read) - (S.f.rb3 || 0)) + " of 5"; } },
{ say: "Talk with Callimachus, the old poet, in the room of poetry and Homer", at: "p_callimachus", on: function () { return __ZC(405, 215, this, arguments, new.target); } },
{ say: "Say goodbye to Apollonius, packing in the garden court", at: "p_apollonius", on: function () { return __ZC(405, 216, this, arguments, new.target); } }
] },
{ t: "The king's treasures", intro: "Across the street north of the Library stands the hall of the king's treasures: marvels gathered and made by the house of Ptolemy. Ctesibius shows his machines there.", steps: [
{ say: "Go into the hall of the king's treasures, north across the street", go: { x: 67, z: -104, y: 0, r: 5 } },
{ say: "Talk with Ctesibius, by his water clock", at: "p_ctesibius", on: function () { return __ZC(405, 217, this, arguments, new.target); } },
{ say: "Look at twelve of the sixteen treasures", at: function () { var S = alxS(); return Object.keys(ALX_CASES).filter(function (k) { return !S.seen[k]; }).map(function (k) { return "case_" + k; }); }, many: 1, on: function (id) { alxCaseCard(id.slice(5)); }, cond: function (S) { return alxN(S.seen) - Object.keys(S.seen).filter(function (k) { return /^f_/.test(k); }).length >= 12; } },
{ say: "Play Ctesibius's scale on the water organ", at: "case_organ", on: function () { alxOrgan(true); } }
] },
{ t: "The measure of the earth", intro: "Eratosthenes wants to know if his new reader understands the thing he is proudest of.", steps: [
{ say: "Go to Eratosthenes in the lecture hall", at: "p_eratosthenes", on: function () { return __ZC(405, 218, this, arguments, new.target); } },
{ say: "Watch the shadow on the sundial in the court (stand still a while)", hold: { id: "sundial", secs: 8 }, done: function () { alxCard("The shadow", "<p>You watch the tip of the shadow creep across the bowl, slower than a snail. Noon is near: the shadow is as short as it will be today. Here, even at midsummer, it never vanishes; at Syene it would.</p>", [["Go on", "", alxDone]]); } },
{ say: "Find the letter from Syracuse in the dining hall", at: "letter", on: function () { return __ZC(405, 219, this, arguments, new.target); } },
{ say: "Give Eratosthenes the letter", at: "p_eratosthenes", on: function () { return __ZC(405, 220, this, arguments, new.target); } }
] },
{ t: "The physicians' garden", intro: "East of the Library, behind a low wall, the physicians grow the plants they study: herbs that heal, and herbs that kill. Andreas of Carystus keeps it.", steps: [
{ say: "Talk with Andreas in the physicians' garden, east of the Library", at: "p_andreas", on: function () { return __ZC(405, 221, this, arguments, new.target); } },
{ say: "Gather fennel, rue, poppy and wild carrot from the beds", at: function () { var S = alxS(); return Object.keys(ALX_BEDS).filter(function (k) { return !S.got["herb_" + k] && (ALX_HERBS[k] || !S.f["looked_" + k]); }).map(function (k) { return "bed_" + k; }); }, many: 1, on: function (id) { alxBedCard(id.slice(4), true); },
cond: function (S) { return Object.keys(ALX_HERBS).every(function (h) { return S.got["herb_" + h]; }); }, n: function (S) { return Object.keys(ALX_HERBS).filter(function (h) { return S.got["herb_" + h]; }).length + " of 4"; } },
{ say: "Bring the herbs to Andreas", at: "p_andreas", on: function () { return __ZC(405, 222, this, arguments, new.target); } },
{ say: "Give Theodote the syrup, in the reading hall", at: "p_copyist", on: function () { return __ZC(405, 223, this, arguments, new.target); } },
{ say: "Read about Herophilus on the shelves of medicine and mathematics", at: "shelf_science", on: function () { alxShelfCard("science"); }, cond: function (S) { return !!S.read.herophilus; } }
] },
{ t: "The book that is not there", intro: "Apollonius said: if you ever find Sostratus's name somewhere it should not be, follow it. Archimedes' letter, in a postscript you nearly missed, asks Eratosthenes 'whether you have found yet the rooms beneath that Sostratus wrote of'. The catalogue is in the entrance hall.", steps: [
{ say: "Search the Tables of Callimachus, the catalogue in the entrance hall", at: "pinakes", on: function () { alxPinakesCard(true); } },
{ say: "Look under the rug in the room of medicine and mathematics", at: "trap", on: function () { return __ZC(405, 224, this, arguments, new.target); } },
{ say: "Tell Eratosthenes what you found", skip: function (S) { return S.f.path !== "told"; }, at: "p_eratosthenes", on: function () { return __ZC(405, 225, this, arguments, new.target); } },
{ say: "Take an oil lamp from the stand in the reading hall", skip: function (S) { return S.f.path !== "alone"; }, at: "lamp", on: function () { var S = alxS(); S.f.light = "open"; S.got.lamp = 1; alxSave(); alxRefresh(); alxSay("You take a little clay oil lamp, its flame bare in the air."); alxDone(); } },
{ say: "Go down the stair under the rug, into the stores", go: { x: 84, z: -84, y: ALX_Y, r: 5 } }
] },
{ t: "The ships' originals", intro: "Beneath the Library: the stores. Jar upon jar of scrolls from the ships, sealed, labelled, waiting. The air is cold and dry and still.", steps: [
{ say: "Search the stores: the jars and the king's chest", at: function () { var S = alxS(); return ["jarsA", "jarsB", "chest"].filter(function (k) { return !S.f["srch_" + k]; }); }, many: 1, on: function (id) { alxSearch(id); },
cond: function (S) { return S.f.srch_jarsA && S.f.srch_jarsB && S.f.srch_chest; }, n: function (S) { return ["jarsA", "jarsB", "chest"].filter(function (k) { return S.f["srch_" + k]; }).length + " of 3"; } },
{ say: "Take the wooden rod you found among the jars", skip: function (S) { return !!S.f.rod; }, at: "rod", on: function () { var S = alxS(); S.f.rod = 1; S.got.rod = 1; alxSave(); alxRefresh(); alxSay("You take the rod: smooth, tapering, thin at one end and thick at the other."); alxDone(); } },
{ say: "Follow the passage north from the stores", go: { x: 84, z: -113.5, y: ALX_Y, r: 3 } }
] },
{ t: "The cistern", intro: "The passage opens on a great cistern: a forest of columns standing in black water, fed from the Nile canal, the city's water for the dry months. Ledges run round the walls. Across the water, a door.", steps: [
{ say: "Cross the cistern to the door on the far side (the ledges go round; a plank goes straight across)", preferGo: 1, go: { x: 84, z: -165.8, y: ALX_Y, r: 2.6 }, at: "plank", on: function () { alxPlank(); } },
{ say: "Light your lamp again from the lamp in the niche", skip: function (S) { return !S.f.lampOut; }, at: "niche", on: function () { var S = alxS(); S.f.lampOut = 0; S.f.light = S.f.lightWas || "lantern"; alxSave(); alxSay("Your light burns again."); alxDone(); } },
{ say: "Read the strip of letters on the sealed door", at: "door", on: function () { alxScytale(); } }
] },
{ t: "The room the kings keep closed", intro: "A low room of shelves and tables, the books and things the kings did not want read. Someone has been here before you, and not long ago: there are fresh footprints in the dust.", steps: [
{ say: "Look at what lies here (four things or more)", at: function () { var S = alxS(); return ["dissect", "pots", "map", "debt", "manetho", "setne"].filter(function (k) { return !S.seen["f_" + k]; }).map(function (k) { return "f_" + k; }); }, many: 1, on: function (id) { alxForbidCard(id.slice(2)); },
cond: function (S) { return ["dissect", "pots", "map", "debt", "manetho", "setne"].filter(function (k) { return S.seen["f_" + k]; }).length >= 4; }, n: function (S) { return Math.min(4, ["dissect", "pots", "map", "debt", "manetho", "setne"].filter(function (k) { return S.seen["f_" + k]; }).length) + " of 4"; } },
{ say: "Look at the hole broken through the east wall", at: "breach", on: function () { return __ZC(405, 226, this, arguments, new.target); } }
] },
{ t: "Under the royal quarter", intro: "The tunnel of Sostratus runs east under the palaces. It was dug for a king to visit his father Alexander unseen. Somebody else is using it tonight.", steps: [
{ say: "Go along the tunnel", at: "crack", on: function () { alxCrack(); } },
{ say: "Shore up the bent prop: hold it steady", skip: function (S) { return !S.f.shoring; }, hold: { id: "crack", secs: 6 }, done: function () { var S = alxS(); S.f.shoring = 0; S.f.shored = 1; alxSave(); alxCard("Shored", "<p>You wedge a fallen beam under the bent prop and hold it while it settles. Dust trickles, and stops. The way is safe, for now.</p>", [["Go on", "", alxDone]]); } },
{ say: "Go on into the chamber at the end of the tunnel", go: { x: 136, z: -177, y: ALX_Y, r: 3 }, done: function () { alxSecret("sema", false); alxDone(); } },
{ say: "Face the man at Alexander's coffin", at: "p_kleon", on: function () { alxKleon(); } }
] },
{ t: "The keeper of the scrolls", intro: "Back up through the stores and the trap, to the lecture hall, where Eratosthenes is waiting.", steps: [
{ say: "Go back to Eratosthenes in the lecture hall", at: "p_eratosthenes", on: function () { alxEnding(); } }
] }
];
function alxPapyrus() { return __ZC(405, 227, this, arguments, new.target); }
function alxSearch(id) { return __ZC(405, 228, this, arguments, new.target); }
function alxFire() { return __ZC(405, 229, this, arguments, new.target); }
function alxPlank() { return __ZC(405, 230, this, arguments, new.target); }
function alxCrack() { return __ZC(405, 231, this, arguments, new.target); }
function alxKleon() { return __ZC(405, 232, this, arguments, new.target); }
function alxEnding() { return __ZC(405, 233, this, arguments, new.target); }
function alxDone() { var S = alxS(); if (!alxActive())
return; S.s++; ALX.hold = 0; alxSave(); alxSkip(); alxRefresh(); }
function alxSkip() { return __ZC(405, 234, this, arguments, new.target); }
function alxCheck() { var st = alxStep(), S = alxS(); if (st && st.cond && st.cond(S))
alxDone(); }
function alxChapterCard() { return __ZC(405, 235, this, arguments, new.target); }
function alxChapterBegin(place) { return __ZC(405, 236, this, arguments, new.target); }
function alxChapterSetup() { var S = alxS(); if (S.ch >= 7) {
S.f.lidOpen = 1;
if (!S.f.light && !S.f.lampOut)
S.f.light = S.f.path === "alone" ? "open" : "lantern";
} if (S.ch >= 8)
S.f.rod = 1; if (S.ch >= 9)
S.f.doorOpen = 1; alxSave(); alxRefresh(); }
function alxStoryCard() { return __ZC(405, 237, this, arguments, new.target); }
function alxRestart() { var p = wndProg(), keep = p.alx && p.alx.ends ? p.alx.ends : {}; p.alx = { ends: keep }; var S = alxS(); S.on = 1; alxSave(); alxRefresh(); alxChapterBegin(false); }
function alxRefresh() { return __ZC(405, 238, this, arguments, new.target); }
function alxTarget(st) { return __ZC(405, 239, this, arguments, new.target); }
function alxWay(P) { return __ZC(405, 240, this, arguments, new.target); }
function alxBeam() { return __ZC(405, 241, this, arguments, new.target); }
function alxUnderNow() { var L = worldLocal(), A = WND_AT.pharos; return wndRegion(L.x, L.z) === "pharos" && L.y - 1.72 < -2.5 && L.x - A.x > 50 && L.z - A.z < -70; }
function alxTick(dt) { return __ZC(405, 242, this, arguments, new.target); }
function alxLine() { return ALX.line || ""; }
function alxTalkStep(key) { var st = alxStep(); if (st && alxAccepts(st, "p_" + key)) {
st.on("p_" + key);
return true;
} return false; }
ALX_SECRETS.safeguard = { t: "Sostratus's last safeguard", d: 3, p: "The bronze lamp on its chain in the reading hall is not a lamp. Its chain runs up through the roof to the props of Sostratus's beams: the old builder's safeguard, so that the king's secrets could be buried in a moment. One pull, and the whole Mouseion comes down." };
var ALX_FALL_MS = 3600000, ALX_LS = "alx_collapse_local";
function alxLibThen() { var V = WND.vgroups.pharos; if (!ALX.stand || ALX.stand.parent !== V.then) {
ALX.stand = wndGroup(0, 0, 0, 0, V.then);
ALX.stand.name = "libstand";
(WND.selfBake = WND.selfBake || []).push(ALX.stand);
} WNK.F = ALX.stand; WNK.v = "then:pharos"; }
function alxColMark() { var L = wndL(); ALX.colL = L; return { L: L, s: L.solids.length, f: L.floors.length, r: L.ramps.length }; }
function alxColTake(m) { var C = ALX.libCol = ALX.libCol || { solids: [], floors: [], ramps: [] }; C.solids = C.solids.concat(m.L.solids.slice(m.s)); C.floors = C.floors.concat(m.L.floors.slice(m.f)); C.ramps = C.ramps.concat(m.L.ramps.slice(m.r)); }
function alxInLib(x, z, y) { return x >= 29.5 && x <= 104.5 && z >= -80.5 && z <= -13.5 && (y == null || y > -1.5); }
function alxUnderLib(x, z, y) { return y < -1 && x >= 73 && x <= 95 && z >= -101 && z <= -66; }
function alxRuinsBuild() { return __ZC(405, 243, this, arguments, new.target); }
function alxLocalDown() { try {
var o = JSON.parse(localStorage.getItem(ALX_LS) || "null");
return o && o.until > Date.now() ? o : null;
}
catch (e) {
return null;
} }
function alxRuined() { var D = ALX.down || alxLocalDown(); return !!(D && Date.now() < D.until); }
function alxDownNow() { var D = ALX.down; if (D && Date.now() < D.until)
return D; return alxLocalDown(); }
function alxNetSet(r) {
if (!r || typeof r !== "object")
return;
var off = r.now ? Date.parse(r.now) - Date.now() : 0;
if (r.down === false) {
ALX.down = null;
ALX.net = "ok";
return;
}
if (r.until) {
ALX.down = { fell: Date.parse(r.fell) - off, until: Date.parse(r.until) - off };
ALX.net = "ok";
}
}
function alxNetPoll() { return __ZC(405, 244, this, arguments, new.target); }
function alxSwitch() { return __ZC(405, 245, this, arguments, new.target); }
ALX_FREE.lampchain = function () { alxSwitch(); };
function alxKeeperRaise() { ALX.down = null; try {
localStorage.removeItem(ALX_LS);
}
catch (e) { } if (typeof cityRpc === "function")
cityRpc("wonders_collapse_clear", { p_place: "alexandria" }).then(function () { }, function () { }); alxRuinShow(false); alxSay("The Library stands again (the Keeper's word)."); }
function alxRuinShow(on) { return __ZC(405, 246, this, arguments, new.target); }
function alxCaught(mine) { return __ZC(405, 247, this, arguments, new.target); }
function alxCollapseTick(dt) { return __ZC(405, 248, this, arguments, new.target); }
function alxRuinLine() { var D = alxDownNow(); if (!D)
return ""; var m = Math.max(1, Math.ceil((D.until - Date.now()) / 60000)); return " · 🏚️ <b>The Library lies in ruins</b>: the way will be clear in " + m + " min"; }
var WND_SWEEP = {
colossus: { at: [-30, 22], kind: "foundry", stalls: [-46, -26] },
pharos: { at: [-50, 8], kind: "quay" }
};
function wndSweepLite(i) { return !WND.lite || i % 2 === 0; }
function wndSweepSpot(key, lx, lz, r) { return __ZC(405, 249, this, arguments, new.target); }
function wndSweep() { return __ZC(405, 250, this, arguments, new.target); }
function wndSweepAmphora(g, x, z, col, lay) { return __ZC(405, 251, this, arguments, new.target); }
function wndSweepPeople(key, list) { return __ZC(405, 252, this, arguments, new.target); }
function wndSweepFoundry(key, S) { return __ZC(405, 253, this, arguments, new.target); }
function wndSweepQuay(key, S) { return __ZC(405, 254, this, arguments, new.target); }
(function () {
if (typeof wndLife !== "function")
return;
var f = wndLife;
wndLife = function () { var r = f.apply(this, arguments); try {
if (WND.taken)
wndSweep();
}
catch (e) {
if (window.console)
console.warn("[wonders] sweep", e);
} return r; };
})();
