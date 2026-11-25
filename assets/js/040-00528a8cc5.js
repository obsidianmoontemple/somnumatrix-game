/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var ROW_GAP = 36, ROW_BUILD = 8;
var ROW_AT = 0.70, ROW_R0 = 360, ROW_ENTRY = 150;
var ROW_LANES = 9, ROW_LANE_GAP = 30, ROW_PRECINCT_GAP = 24;
var PRECINCT = {
Greek: { house: "temple", ground: "groundpad", trim: 0xE8E4DA, note: "Olympos, and the older powers under it" },
Roman: { house: "temple", ground: "groundpad", trim: 0xE0D8C4, note: "The state gods, and the household ones" },
Norse: { house: "longhouse", ground: "snowfield", trim: 0x8A6A44, note: "Asgard's own, and the giants' kin" },
Egyptian: { house: "ziggurat", ground: "groundpad", trim: 0xE8C27A, note: "The Two Lands, and the hall of judgement" },
Yoruba: { house: "roundhouse", ground: "lawn", trim: 0xC8763A, note: "The orisha, and the roads between" },
Irish: { house: "roundhouse", ground: "lawn", trim: 0x3F7A3A, note: "The Tuatha Dé Danann" },
Welsh: { house: "roundhouse", ground: "lawn", trim: 0x4A7A5A, note: "Annwn, and the houses of the old tales" },
Gaulish: { house: "roundhouse", ground: "lawn", trim: 0x6A8A4A, note: "What the Romans wrote down, and what they did not" },
Chinese: { house: "pagoda", ground: "groundpad", trim: 0xB03A2E, note: "The celestial bureaucracy, and the immortals" },
Hindu: { house: "mandir", ground: "groundpad", trim: 0xE8A63A, note: "The devas, and the great forms" },
Japanese: { house: "torii", ground: "zengarden", trim: 0xC0392B, note: "The kami, at their own gates" },
Mesopotamian: { house: "ziggurat", ground: "groundpad", trim: 0xC8A882, note: "Sumer, Akkad, and what came after" },
Aztec: { house: "ziggurat", ground: "groundpad", trim: 0x2E8A6A, note: "The fifth sun, and its keepers" },
Maya: { house: "ziggurat", ground: "lawn", trim: 0x3A8A5A, note: "The long count, and the hero twins" },
Inca: { house: "ziggurat", ground: "groundpad", trim: 0xD4B83C, note: "The sun, the mountains, and the dead" },
Slavic: { house: "izba", ground: "snowfield", trim: 0x7A5230, note: "The old ones of the forests and the hearth" },
Akan: { house: "roundhouse", ground: "lawn", trim: 0xD4B83C, note: "Nyame, and the spider who told the stories" },
Hawaiian: { house: "stilthouse", ground: "lawn", trim: 0x2E8A8A, note: "The islands, and the fire beneath them" },
Polynesian: { house: "stilthouse", ground: "lawn", trim: 0x2E8A8A, note: "The long voyages, and what was found" },
Vodou: { house: "shrine", ground: "groundpad", trim: 0x8A2A6A, note: "The lwa, and the crossroads" },
Persian: { house: "mandir", ground: "groundpad", trim: 0xC8A040, note: "The light, and what stands against it" },
Demonology: { house: "crypt", ground: null, trim: 0x6A1A1A, note: "Named here because they were named elsewhere first" },
Qliphothic: { house: "crypt", ground: null, trim: 0x3A1A4A, note: "The shells, and the husks of the tree" },
Adversarial: { house: "crypt", ground: null, trim: 0x4A1A2A, note: "Those who refused, in every telling" },
"Anglo-Saxon": { house: "longhouse", ground: "lawn", trim: 0x8A7A4A, note: "What survived in charms and place-names" },
Hebrew: { house: "temple", ground: "groundpad", trim: 0xC9A868, note: "The name, and the hosts about it" }
};
function templeRowRealm() { return (typeof somnucorRealm === "function") ? somnucorRealm() : null; }
function candleMine(key) {
try {
return +((JSON.parse(localStorage.getItem("somnu.candles") || "{}"))[key] || 0);
}
catch (e) {
return 0;
}
}
function candleCount(key) {
if (typeof TL !== "undefined" && TL.boardLoaded)
return +(TL.board[key] || 0);
return candleMine(key);
}
function candleKeep(key) {
var all = {};
try {
all = JSON.parse(localStorage.getItem("somnu.candles") || "{}");
}
catch (e) { }
all[key] = (all[key] || 0) + 1;
try {
localStorage.setItem("somnu.candles", JSON.stringify(all));
}
catch (e) { }
return all[key];
}
function lightCandle(key, name) { return __ZC(40, 0, this, arguments, new.target); }
function leaveOffering(key, name, howMuch) { return __ZC(40, 1, this, arguments, new.target); }
function toTempleRow() { return __ZC(40, 2, this, arguments, new.target); }
var rowNear = null, rowCool = 0;
function templeTick(dt) {
if (rowCool > 0)
rowCool -= dt;
if (typeof templeLifeTick === "function")
templeLifeTick(dt);
if (!walkMode || store.inside) {
rowNear = null;
return;
}
var P = camera.position, found = null;
for (var i = 0; i < store.objects.length; i++) {
var o = store.objects[i];
if (!o.deity || (o.realm || 0) !== (store.here || 0))
continue;
if (Math.abs(o.x - P.x) > 6 || Math.abs(o.z - P.z) > 6)
continue;
if (Math.hypot(o.x - P.x, o.z - P.z) < 3.4) {
found = o;
break;
}
}
if (found && found !== rowNear) {
rowNear = found;
var d = DEITY[found.deity] || { name: found.deity };
var lit = candleCount(found.deity);
if (typeof tlBoardLoad === "function")
tlBoardLoad(false);
setStatus("<b>" + esc(d.name) + "</b>" + (d.domains ? " — " + esc(d.domains) : "") +
". Press <b>C</b> to light a candle" + (lit ? (" (" + lit + " burning)") : "") +
", <b>O</b> to leave something in the bowl, <b>T</b> to see what the bowl holds. Walk in at the door to go inside.");
}
else if (!found && rowNear)
rowNear = null;
}
function templeStanding(key, name) { return __ZC(40, 3, this, arguments, new.target); }
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
if (!rowNear || rowCool > 0)
return;
var d = DEITY[rowNear.deity] || { name: rowNear.deity };
if (e.code === "KeyC") {
rowCool = 0.6;
lightCandle(rowNear.deity, d.name);
}
if (e.code === "KeyO") {
rowCool = 0.6;
templeOfferPanel(rowNear.deity);
}
if (e.code === "KeyT") {
rowCool = 0.6;
templeStanding(rowNear.deity, d.name);
}
});
function templeOfferPanel(key) { return __ZC(40, 4, this, arguments, new.target); }
