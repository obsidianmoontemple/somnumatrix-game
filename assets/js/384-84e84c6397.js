/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var CFK = { keys: {} };
var CFK_F = ["Ada", "Bram", "Cora", "Dennis", "Edie", "Felix", "Greta", "Hal", "Iris", "Jonah", "Kit", "Lena", "Milo", "Nora", "Otto", "Pearl", "Quinn", "Rosa", "Silas", "Tilda",
"Uma", "Victor", "Wren", "Xavier", "Yara", "Zeke", "Agnes", "Basil", "Clara", "Declan", "Elsie", "Fergus", "Hattie", "Ivo", "June", "Leon", "Mabel", "Ned", "Olive", "Percy",
"Ruth", "Sam", "Thea", "Vera", "Walt", "Amira", "Bashir", "Chen", "Dara", "Esi", "Femi", "Hana", "Ines", "Jamal", "Keiko", "Luis", "Mei", "Nadia", "Omar", "Priya", "Ravi", "Sofia", "Tariq", "Yusuf"];
var CFK_L = ["Abbott", "Bell", "Carver", "Drummond", "Ellery", "Finch", "Gale", "Hart", "Ives", "Jessop", "Kemp", "Lark", "Marsh", "Nash", "Oakes", "Penn", "Quill", "Reeve", "Stokes", "Thorne",
"Upton", "Vane", "Webb", "Yeo", "Ashby", "Brook", "Crane", "Dale", "Fairweather", "Gray", "Holt", "Lowe", "Moss", "Pryce", "Rowe", "Sato", "Okoye", "Haddad", "Kowalski", "Moreau", "Novak", "Rossi", "Singh"];
function cfkHash(s) { var h = 2166136261; s = String(s); for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619);
} return h >>> 0; }
function cfkInCity() { return typeof inSomnucorNow === "function" && inSomnucorNow(); }
function cfkResident(c) { return !!(c && c.primary === false && c.src && (c.src.role === "belongs" || ((c.archetype === "human" || c.archetype === "child") && !c.src.name)) && !c.deity && cfkInCity()); }
function cfkKey(c) {
if (c.cfkKey)
return c.cfkKey;
var g = [c.role || "", c.work || "", c.home || ""].join("|"), n = 0;
for (var i = 0; i < store.characters.length; i++) {
var x = store.characters[i];
if (x === c)
break;
if (x.primary === false && [x.role || "", x.work || "", x.home || ""].join("|") === g)
n++;
}
return (c.cfkKey = g + "|" + n);
}
var CFK_W = { Ada: 1, Cora: 1, Edie: 1, Greta: 1, Iris: 1, Lena: 1, Nora: 1, Pearl: 1, Rosa: 1, Tilda: 1, Uma: 1, Wren: 1, Yara: 1, Agnes: 1, Clara: 1, Elsie: 1, Hattie: 1, June: 1, Mabel: 1, Olive: 1,
Ruth: 1, Thea: 1, Vera: 1, Amira: 1, Dara: 1, Esi: 1, Hana: 1, Ines: 1, Keiko: 1, Mei: 1, Nadia: 1, Priya: 1, Sofia: 1 };
function cfkSex(c) { try {
var s = typeof specById === "function" ? specById(c.objId) : null;
return s && s.look && s.look.sex || "";
}
catch (e) {
return "";
} }
function cfkName1(k, sx, used) {
var L = CFK_F.filter(function (n) { return sx === "f" ? CFK_W[n] : sx === "m" ? !CFK_W[n] : true; }), nm = "";
for (var t = 0; t < 60; t++) {
var h = cfkHash(k + (t ? "#" + t : ""));
nm = L[h % L.length] + " " + CFK_L[(h >>> 9) % CFK_L.length];
if (!used[nm])
break;
}
used[nm] = 1;
return nm;
}
function cfkName(c) {
var all = (store.characters || []).filter(function (x) { return x.primary === false && x.src && x.src.role === "belongs"; });
if (CFK.n !== all.length) {
var used = {}, keys = {};
all.map(function (x) { return { k: cfkKey(x), x: x }; }).sort(function (a, b) { return a.k < b.k ? -1 : a.k > b.k ? 1 : 0; })
.forEach(function (o) { keys[o.k] = cfkName1(o.k, cfkSex(o.x), used); });
CFK.keys = keys;
CFK.n = all.length;
}
var k = cfkKey(c);
return CFK.keys[k] || (CFK.keys[k] = cfkName1(k, cfkSex(c), {}));
}
var CFK_GREY = { 0x8E8C88: 1, 0xB8B4AE: 1, 0xE4E1DA: 1 }, CFK_DYED = { 0x6B2A5E: 1, 0x2F5E9E: 1, 0x3F7A3A: 1 };
function cfkAge(c) { return __ZC(384, 0, this, arguments, new.target); }
function cfkAgeWords(age, sx) { return __ZC(384, 1, this, arguments, new.target); }
function cfkJob(role) {
if (!role)
return "";
var p = String(role).split("_");
if (p.length > 1 && (p[1] === "day" || p[1] === "night"))
return p[1] + " " + p[0];
return p.join(" ");
}
function cfkPlace(id) {
try {
var s = id && typeof specById === "function" ? specById(id) : null;
return s && typeof placeName === "function" ? placeName(s) : "";
}
catch (e) {
return "";
}
}
function cfkPersona(c) { return __ZC(384, 2, this, arguments, new.target); }
function cfkTalk(c) { return __ZC(384, 3, this, arguments, new.target); }
(function () {
if (typeof openGreet !== "function" || typeof wTalk !== "function")
return;
var og = openGreet;
openGreet = function (c) {
try {
if (cfkResident(c)) {
cfkTalk(c);
return;
}
}
catch (e) {
if (window.console)
console.warn("[city-folk]", e);
}
return og.apply(this, arguments);
};
})();
function cfkSndPaint() { return __ZC(384, 4, this, arguments, new.target); }
(function () {
if (typeof openTalk !== "function")
return;
var ot = openTalk;
openTalk = function () { var r = ot.apply(this, arguments); try {
cfkSndPaint();
}
catch (e) { } return r; };
})();
