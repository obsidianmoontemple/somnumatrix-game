/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var WSL = { t: 0, set: null, items: [], gRef: null };
var WSL_C = { rust: 0x8A4A2A, rustD: 0x5E3420, rustL: 0xA86A3A, tin: 0x8E9296, tinD: 0x5E6266, conc: 0x9A958A, concD: 0x6E6A62, asph: 0x3A3836, wood: 0x7A5A3A, woodD: 0x4E3A26,
green: 0x5E9A48, greenL: 0x86C060, tarp: 0x3A6A8A, tarpR: 0xA8482A, yellow: 0xD8A820, glass: 0xBFDDEE, char: 0x2A2622, cloth: 0xD8D0C0, sand: 0xB8A070 };
function wslState() { if (typeof store === "undefined")
return { done: {}, pk: {} }; if (!store.wsl || typeof store.wsl !== "object")
store.wsl = { done: {}, pk: {} }; if (!store.wsl.done)
store.wsl.done = {}; if (!store.wsl.pk)
store.wsl.pk = {}; return store.wsl; }
function wslDone(k) { return !!wslState().done[k]; }
(function () {
var fix = function () {
if (typeof REALMS === "undefined" || !REALMS.wasteland || REALMS.wasteland.wsl)
return;
var T = REALMS.wasteland;
T.wsl = 1;
T.ground = 0x8E7A58;
T.tex = "earth";
T.flat = true;
T.path = 0x6A6258;
T.skyTop = 0x54627A;
T.skyLow = 0xE8AE68;
T.dens = 1.25;
T.light = 0xFFDCA8;
T.amb = 0.72;
T.sun = 0.8;
if (typeof REALM_SCENERY !== "undefined")
REALM_SCENERY.wasteland = [];
};
fix();
WSL.fix = fix;
if (typeof DQ_LANDS !== "undefined" && DQ_LANDS.wasteland) {
var L = DQ_LANDS.wasteland;
L.gather = [["cr_parts", 6, "scrap", 0x7A7268, [-78, -22, 24]], ["dr_seedpod", 10, "fruit", 0x9A8A4A, [-58, -96, 30]], ["dr_battery", 8, "scrap", 0x4A5A3A, [70, -158, 30]]];
L.board = [7, -8, -0.4];
(L.games || []).forEach(function (g) { if (g.area)
g.area = [0, -70, 36]; });
}
})();
function wslPanel(B, x, z, ry, w, h, k) { return __ZC(473, 0, this, arguments, new.target); }
function wslWall(B, cx, cz, r, gaps, seed) { return __ZC(473, 1, this, arguments, new.target); }
function wslWindPump(B, G, x, z, h, turning, blades) { return __ZC(473, 2, this, arguments, new.target); }
function wslRuin(B, x, z, w, d, h, ry, seed) { return __ZC(473, 3, this, arguments, new.target); }
function wslCar(B, x, z, ry, k) { return __ZC(473, 4, this, arguments, new.target); }
function wslPylon(B, x, z, ry, lean) { return __ZC(473, 5, this, arguments, new.target); }
function wslPlanter(B, x, z, k, grown, R) { return __ZC(473, 6, this, arguments, new.target); }
function wslPlan(P) { return __ZC(473, 7, this, arguments, new.target); }
var WSL_JOBS = [
{ k: "pump", who: "Mara the water-keeper", n: "Wind for the big pump", ask: "The big pump lost its blades in the last storm. Three good sheets of metal would do it: there's a wing-skin at the fallen airliner, a bonnet at the breaker's yard, and a road sign on the long road.",
items: [["pump0", -142, -128, "A sheet of wing-skin", "cut free"], ["pump1", -82, -16, "A straight car bonnet", "take"], ["pump2", -58, -146.4, "A fallen road sign", "pick up"]], hand: "hand the three sheets to",
done: "Mara and Old Dez have the blades cut and bolted on by evening. The big pump turns, the trough fills, and there is green round it already.", gift: ["dr_filtered", 3] },
{ k: "radio", who: "Sparks", n: "A voice on the air", ask: "The mast needs four power cells that still hold a charge. Try the fuel station, the school bus, the dead city, and the old fairground.",
items: [["radio0", 66, -169.4, "A power cell behind the till", "take"], ["radio1", 18.4, -41.4, "A power cell under a bus seat", "take"], ["radio2", 182, -234, "A power cell in a shop doorway", "take"], ["radio3", 97.4, -31.2, "A power cell in the ticket booth's lamp", "take"]], hand: "give the four cells to",
done: "The lamp on the mast comes on, red and steady. That night Sparks calls on the hour, and for the first time someone answers: Wellspring, by the old dam.", gift: ["dr_canlantern", 1] },
{ k: "garden", who: "Juniper the grower", n: "The first garden", ask: "The city had a seed merchant, and seed keeps for years in a sealed tin. Five tins and every bed in Haven is planted. Look in the city streets, under the overpass, and in the striped tent at the fair.",
items: [["garden0", 160, -233, "A sealed tin of bean seed", "take"], ["garden1", 214, -263, "A sealed tin of squash seed", "take"], ["garden2", 236, -225, "A sealed tin of tomato seed", "take"], ["garden3", 118, -37, "A sealed tin of sunflower seed", "take"], ["garden4", 114, -147, "A sealed tin of apple pips", "take"]], hand: "give the five tins to",
done: "Every tyre, bath and crate is planted. Come back and look: tomatoes, beans up their poles, and four small apple trees in blossom by the wall.", gift: ["dr_beansoup", 3] },
{ k: "lights", who: "Old Dez the mechanic", n: "Lights for the square", ask: "I've a generator that runs on chip fat. It wants a fan belt, and I want bulbs: the fairground had hundreds. Three strings of bulbs, one belt. Breaker's yard for the belt.",
items: [["lights0", 112, -37.5, "A string of fairground bulbs", "unhook"], ["lights1", 126, -23, "A string of fairground bulbs", "unhook"], ["lights2", 95, -40.4, "A string of fairground bulbs", "unhook"], ["lights3", -66, -20, "A fan belt that isn't perished", "take"]], hand: "give the bulbs and the belt to",
done: "Dez pulls the cord, the generator coughs, and the square lights up: yellow, orange, blue and green. Granny Wren says she'd forgotten what it looked like.", gift: ["dr_canlantern", 1] },
{ k: "road", who: "Zeke the caravan master", n: "The long road open", ask: "Three falls of rubble between here and the overpass, and my carts can't pass. Many hands, mine included. Go to each and we'll haul it clear.",
items: [["road0", 36, -152, "A fall of rubble across the road", "help haul clear"], ["road1", 84, -152, "A fall of rubble across the road", "help haul clear"], ["road2", 150, -160, "A fall of rubble by the overpass", "help haul clear"]], hand: "tell the road is clear to",
done: "The first caravan in a season comes down the long road from Wellspring and unloads in Haven's square: salt, cloth, seed potatoes, letters.", gift: ["dr_scrapflower", 1] }
];
function wslJobLeft(J) { var S = wslState(); return J.items.filter(function (it) { return !S.pk[it[0]]; }); }
function wslHere() { return typeof LD !== "undefined" && LD.g && LD.kind === "wasteland" && typeof ldRealm === "function" && !!ldRealm(); }
function wslItemMesh(key) { return __ZC(473, 8, this, arguments, new.target); }
function wslClearMarks() { return __ZC(473, 9, this, arguments, new.target); }
function wslWhoAt(name) { var T = null; LD.talkers.forEach(function (x) { if (!T && x.name === name && x.wsl === undefined)
T = x; }); if (!T)
return null; return [T.p ? T.p.g.position.x : T.x, T.p ? T.p.g.position.z : T.z]; }
function wslSetMarks() { return __ZC(473, 10, this, arguments, new.target); }
function wslSave() { try {
if (typeof save === "function")
save();
}
catch (e) { } }
function wslBoard() { return __ZC(473, 11, this, arguments, new.target); }
function wslJobCard(J) { return __ZC(473, 12, this, arguments, new.target); }
var WSL_RADIO = ["\"Haven, this is Wellspring. We hear you. We have clean water and a seed bank. What do you need?\"", "\"...any station, any station, this is the ship Halcyon, twelve days out, we have seen green on the coast. Repeat: green on the coast.\"", "\"Haven, Wellspring. Tell Juniper the apple grafts took. Tell her all of them took.\"", "A child's voice, very far off, counting to a hundred in a language you don't know. Then laughter.", "\"This is Northlight. We thought we were the only ones. How many are you? ... A hundred and twelve! Did you hear that? A hundred and twelve!\"", "Static; then, faintly, somebody playing a fiddle badly, and somebody else telling them so."];
function wslAct(T) { return __ZC(473, 13, this, arguments, new.target); }
function wslTick(dt) {
if (!wslHere()) {
if (WSL.gRef) {
WSL.gRef = null;
if (typeof guideTo !== "undefined" && guideTo && guideTo.key === "wsl") {
try {
guideTo = null;
}
catch (e) { }
}
}
return;
}
if (WSL.gRef !== LD.g) {
WSL.gRef = LD.g;
WSL.set = null;
WSL.items = [];
}
var S = wslState(), sig = Object.keys(S.pk).length + ":" + Object.keys(S.done).length;
if (WSL.set !== sig)
wslSetMarks();
LD.talkers.forEach(function (T) { if (T.wsl === "hand") {
var at = wslWhoAt(T.follow);
if (at) {
T.x = at[0];
T.z = at[1];
}
} });
}
(function () {
if (typeof LD_SETS === "undefined" || typeof lglB !== "function")
return;
if (typeof ldUse === "function") {
var lu = ldUse;
ldUse = function (T) { if (T && T.wsl !== undefined && typeof LD !== "undefined" && LD.kind === "wasteland") {
try {
wslAct(T);
}
catch (e) {
if (window.console)
console.warn("wasteland-haven:", e);
}
return;
} return lu.apply(this, arguments); };
}
if (typeof ldTick === "function") {
var lt = ldTick;
ldTick = function (dt) { lt(dt); try {
wslTick(dt);
}
catch (e) {
if (window.console && !WSL.warned) {
WSL.warned = 1;
console.warn("wasteland-haven tick:", e);
}
} };
}
})();
