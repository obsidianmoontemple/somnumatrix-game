/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var HYT = { api: null, player: null, err: null, films: false };
function hytCfg() { var c = (typeof DW_CLOUD !== "undefined" && DW_CLOUD.config && DW_CLOUD.config.home_youtube) || null; return c && typeof c === "object" ? c : {}; }
function hytOff() { return !!hytCfg().off; }
function hytKidNo() { try {
return typeof yngOn === "function" && yngOn() && !yngKid().links;
}
catch (e) {
return false;
} }
var HYT_KID = "Your grown-up hasn't switched on video links for you. Your own videos from this device still play here.";
var HYT_OFF = "The Keeper has YouTube on home TVs switched off for now. Open on YouTube still plays it on YouTube itself.";
function hytTime(t) {
t = String(t || "").trim();
if (!t)
return 0;
if (/^\d+s?$/.test(t))
return parseInt(t, 10) || 0;
var m = t.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
if (!m)
return 0;
return (+m[1] || 0) * 3600 + (+m[2] || 0) * 60 + (+m[3] || 0);
}
function hytEmbed(id, list, start) { return __ZC(405, 0, this, arguments, new.target); }
function hytBits(url) {
var b = { id: null, list: null, start: 0 };
try {
var u = new URL(url), m = u.pathname.match(/\/embed\/([\w-]+)/);
if (m && m[1] !== "videoseries")
b.id = m[1];
b.list = u.searchParams.get("list") || null;
b.start = parseInt(u.searchParams.get("start") || "0", 10) || 0;
}
catch (e) { }
return b;
}
function hytPage(url) {
var b = hytBits(url);
if (b.id)
return "https://www.youtube.com/watch?v=" + b.id + (b.list ? "&list=" + encodeURIComponent(b.list) : "") + (b.start ? "&t=" + b.start + "s" : "");
if (b.list)
return "https://www.youtube.com/playlist?list=" + encodeURIComponent(b.list);
return "https://www.youtube.com/";
}
function hytIsYt(r) { return !!(r && r.site === "youtube"); }
function hytNow() { var r = typeof hmItem === "function" ? hmItem(HMD.tvOn) : null; return hytIsYt(r) ? r : null; }
var hytParse0 = hmLinkParse;
hmLinkParse = function (raw) { return __ZC(405, 1, this, arguments, new.target); };
var hytAdd0 = hmAddLink;
hmAddLink = function (raw) {
if (hytKidNo()) {
HMD.msg = HYT_KID;
HMD.linkOpen = false;
hmPaint(true);
return;
}
var L = hmLinkParse(raw);
if (L && L.site === "youtube" && hytOff()) {
HMD.msg = HYT_OFF;
HMD.ytPage = hytPage(L.url);
HMD.linkOpen = false;
hmPaint(true);
return;
}
return hytAdd0.apply(this, arguments);
};
var hytPlay0 = hmPlay;
hmPlay = function (dev, id, remote) {
var r = hmItem(id);
if (r && r.url && hytKidNo()) {
HMD.msg = HYT_KID;
hmPaint(true);
return;
}
if (dev === "tv" && hytIsYt(r) && hytOff()) {
HMD.msg = HYT_OFF;
HMD.ytPage = hytPage(r.url);
hmPaint(true);
return;
}
if (dev === "tv") {
HMD.ytPage = null;
HYT.err = null;
}
return hytPlay0.apply(this, arguments);
};
function hytApi() { return __ZC(405, 2, this, arguments, new.target); }
function hytWhy(code, name) { return __ZC(405, 3, this, arguments, new.target); }
function hytErr(r, code) { return __ZC(405, 4, this, arguments, new.target); }
function hytAttach(f, r) { return __ZC(405, 5, this, arguments, new.target); }
function hytBar(big) { return __ZC(405, 6, this, arguments, new.target); }
var hytOn0 = hmEmbedOn;
hmEmbedOn = function (r, remote) { return __ZC(405, 7, this, arguments, new.target); };
function hytOpen(page) { return __ZC(405, 8, this, arguments, new.target); }
var HYT_FILMS = [
["A Trip to the Moon", 1902, "Méliès sends astronomers to the Moon by cannon"],
["The Great Train Robbery", 1903, "the first great Western"],
["The Cabinet of Dr. Caligari", 1920, "a painted, crooked dream of a town"],
["The Kid", 1921, "Charlie Chaplin and a foundling"],
["Nosferatu", 1922, "the first vampire film"],
["Nanook of the North", 1922, "a family's year in the Arctic"],
["Safety Last!", 1923, "Harold Lloyd and the clock on the skyscraper"],
["Sherlock Jr.", 1924, "Buster Keaton walks into the cinema screen"],
["The Thief of Bagdad", 1924, "flying carpets and a genie's city"],
["The Phantom of the Opera", 1925, "Lon Chaney beneath the Paris Opera"],
["The Gold Rush", 1925, "Chaplin in the Klondike"],
["The Lost World", 1925, "dinosaurs on a hidden plateau"],
["The General", 1926, "Buster Keaton and a runaway locomotive"],
["Metropolis", 1927, "the great city of the future"],
["The Passion of Joan of Arc", 1928, "Joan's trial, close up"],
["Steamboat Bill, Jr.", 1928, "Keaton and the falling house front"]
];
function hytFilmsHtml() { return __ZC(405, 9, this, arguments, new.target); }
var hytHtml0 = hmHtml;
hmHtml = function () { return __ZC(405, 10, this, arguments, new.target); };
var hytAct0 = hmAct;
hmAct = function (a, id) { return __ZC(405, 11, this, arguments, new.target); };
