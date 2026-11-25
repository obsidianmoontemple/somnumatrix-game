/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var DEITY_F = { hera: 1, demeter: 1, athena: 1, artemis: 1, aphrodite: 1, hestia: 1, persephone: 1, hecate: 1, nemesis: 1, nyx: 1, selene: 1, gaia: 1, echidna: 1,
juno: 1, minerva: 1, venus: 1, vesta: 1, diana: 1, ceres: 1, fortuna: 1, frigg: 1, sif: 1, idunn: 1, freyja: 1, skadi: 1, hel: 1,
isis: 1, maat: 1, nephthys: 1, sekhmet: 1, hathor: 1, bastet: 1, nut: 1, taweret: 1, lakshmi: 1, saraswati: 1, parvati: 1, durga: 1, kali: 1, ganga: 1,
amaterasu: 1, izanami: 1, inari: 1, benzaiten: 1, inanna: 1, ereshkigal: 1, ninhursag: 1, tiamat: 1, oya: 1, osun: 1, yemoja: 1,
brigid: 1, morrigan: 1, airmid: 1, eriu: 1, rhiannon: 1, cerridwen: 1, arianrhod: 1, orddu: 1, mokosh: 1, morana: 1, babayaga: 1,
erzulie: 1, mamanbrigitte: 1, nuwa: 1, xiwangmu: 1, change: 1, guanyin: 1, mazu: 1, hexiangu: 1, xochiquetzal: 1, coatlicue: 1, chalchiuhtlicue: 1,
pachamama: 1, mamaquilla: 1, asaseyaa: 1, pele: 1, hina: 1, papatuanuku: 1, anahita: 1, lilith: 1, naamah: 1, matres: 1, epona: 1, ixchel: 1 };
var TRAD_SKIN = {
Greek: [0xC89A70, 0xD8B08A, 0xB88660], Roman: [0xD0A27A, 0xC08E66, 0xDDB592], Hebrew: [0xC8986C],
Norse: [0xF0D2B8, 0xE8C4A6, 0xDDB596], Slavic: [0xF0D4BC, 0xE6C2A2], Irish: [0xF2D6C0, 0xE8C6A8], Welsh: [0xF0D2BA, 0xE4C0A0], Gaulish: [0xE8C8A8, 0xDCB896], "Anglo-Saxon": [0xEED0B6],
Egyptian: [0x9A6A44, 0xB07A50, 0x8A5A38], Hindu: [0xB07A50, 0x9A6844, 0xC48A5C], Japanese: [0xEAC8A2, 0xDDB890], Chinese: [0xE6C49C, 0xDAB48A],
Mesopotamian: [0xB8885E, 0xA87A52], Persian: [0xC0906A, 0xB08060], Aztec: [0xA8724A, 0x9A6440], Maya: [0x9E6A44, 0xA8724A], Inca: [0xA06A44, 0x946040],
Yoruba: [0x5A3A26, 0x6A4430, 0x4A2E1E], Akan: [0x5E3C28, 0x4E3220], Vodou: [0x5A3A26, 0x6A4632], Hawaiian: [0x9A6640], Polynesian: [0x9A6640, 0x8A5A38],
Demonology: [0xB8A8A0, 0x8A3A30, 0x6A6070], Qliphothic: [0xC8C0C8, 0x5A4A5A], Adversarial: [0xD8C8B8, 0x9A4A3A]
};
var TRAD_HAIR = { Norse: [0xD8B46A, 0xB0702E, 0x8A5A2A], Irish: [0xA0441E, 0xC86A2E, 0x3A2A1A], Welsh: [0x3A2A1A, 0x8A4A22], Slavic: [0xC8A060, 0x6A4A2A],
Gaulish: [0xB07A3A, 0x5A3A22], Greek: [0x2A1E16, 0x4A3220, 0x8A6A3A], Roman: [0x2A1E16, 0x3A2A1A],
Demonology: [0x111114, 0x6A1A1A], Qliphothic: [0x0E0E12, 0xE8E4DA], Adversarial: [0x1A1418, 0xC8C0B0] };
var TRAD_ROBE = { Greek: 0xE8E4DA, Roman: 0xE0D8C4, Norse: 0x5A6A7A, Egyptian: 0xEDE6D4, Hindu: 0xD8822A, Japanese: 0xC0392B, Chinese: 0xB03A2E,
Mesopotamian: 0xC8A882, Persian: 0x8A2A3A, Aztec: 0x2E8A6A, Maya: 0x3A8A5A, Inca: 0xD4B83C, Yoruba: 0xF2EEE6, Akan: 0xD4B83C, Vodou: 0x8A2A6A,
Irish: 0x3F7A3A, Welsh: 0x4A7A5A, Gaulish: 0x6A8A4A, Slavic: 0xE8E0CC, Hawaiian: 0x2E8A8A, Polynesian: 0x9A6A3A,
Demonology: 0x2A1A1A, Qliphothic: 0x2A1A34, Adversarial: 0x2A1820, "Anglo-Saxon": 0x6A5A3A, Hebrew: 0xE8E4DA };
var HEADWEAR = ["crown", "crownwhite", "crownred", "helmet", "wingedhelm", "cap", "hat", "laurel", "mooncrown", "veil", "hood", "head", "sundisc", "horns",
"antlers", "cowhorns", "feather", "plumes", "skull", "formless", "halfface", "tripleface", "fourfaces", "twoface"];
var DOMAIN_SIGNS = [
[/\bsun\b|daylight|\bdawn\b|\blight\b/, "sun", 0xF2B33A], [/\bmoon\b|\bnight\b|stars|dreams|sleep/, "moon", 0xC8D4F0],
[/\bsea\b|ocean|water|river|rain|lake|flood|tide/, "wave", 0x3AA8C8], [/thunder|storm|lightning|\bsky\b|wind/, "bolt", 0x9AD0FF],
[/\bfire\b|forge|hearth|volcano|flame/, "flame", 0xF06A2A], [/death|\bdead\b|underworld|grave|souls|decay/, "hourglass", 0x8A5AC8],
[/\bwar\b|battle|warriors|strife|courage/, "sword", 0xC83A2A], [/love|beauty|desire|marriage|fertility|childbirth/, "heart", 0xF07AA8],
[/harvest|grain|earth|forest|wild|hunt|crops|farm|plants|healing|herbs|spring/, "leaf", 0x5AB84A],
[/wisdom|knowledge|writing|magic|craft|prophecy|poetry|music|learning|law|justice/, "eye", 0x5A8AF0]
];
function deitySign(d) {
var t = String(d.domains || "").toLowerCase();
for (var i = 0; i < DOMAIN_SIGNS.length; i++)
if (DOMAIN_SIGNS[i][0].test(t))
return { kind: DOMAIN_SIGNS[i][1], col: DOMAIN_SIGNS[i][2] };
return { kind: "star", col: 0xE8C27A };
}
var SIGN_TPL = {}, SIGN_MAT = {}, SIGN_GEO = {};
function signShape(kind, col, glow) { return __ZC(106, 0, this, arguments, new.target); }
function signShapeBuild(kind, col, glow) { return __ZC(106, 1, this, arguments, new.target); }
function pickOf(list, h) { return list[(h >>> 0) % list.length]; }
function deityLookMore(spec, d) { return __ZC(106, 2, this, arguments, new.target); }
(function () {
if (typeof deityLook !== "function")
return;
var dl = deityLook;
deityLook = function (spec, d) { dl(spec, d); try {
deityLookMore(spec, d);
}
catch (e) {
if (window.console)
console.warn("deity look:", e);
} };
})();
var DL_GEO = {};
function dlg(k, make) { return DL_GEO[k] || (DL_GEO[k] = make()); }
function dressDeity(g, spec, d) { return __ZC(106, 3, this, arguments, new.target); }
(function () {
if (typeof buildDeity !== "function")
return;
var bd = buildDeity;
buildDeity = function (spec, f) {
var d = spec && spec.deity ? DEITY[spec.deity] : null;
if (d)
try {
deityLookMore(spec, d);
}
catch (e) { }
var g = bd.apply(this, arguments);
if (d)
try {
dressDeity(g, spec, d);
}
catch (e) {
if (window.console)
console.warn("deity dress:", e);
}
return g;
};
})();
(function () {
if (typeof atlTemples !== "function")
return;
var at = atlTemples;
atlTemples = function (C) {
at(C);
store.objects.forEach(function (o) {
if (!o.templerow || !o.deity || o.realm !== C.r.id)
return;
var k = KIT[o.archetype], d = DEITY[o.deity];
if (!k || k.cat !== "structure" || !d)
return;
var t = d.trad || "Greek", rc = null;
d.icons.forEach(function (x) { var p = x.split(":"); if (p[0] === "robe" && ICONCOL[p[1]] !== undefined)
rc = ICONCOL[p[1]]; });
if (rc === null)
rc = TRAD_ROBE[t] || 0xC9A868;
var base = (PRECINCT[t] && PRECINCT[t].trim) || 0xE8E4DA, stone = (t === "Demonology" || t === "Qliphothic" || t === "Adversarial") ? 0x4A4048 : 0xE6E0D2;
o.attrs = o.attrs || {};
if (o.attrs.c === undefined)
o.attrs.c = blend(stone, rc, 0.22);
if (o.attrs.rc === undefined)
o.attrs.rc = blend(shade(rc, -0.15), base, 0.25);
o.deityTemple = true;
});
};
})();
(function () {
if (typeof build !== "function")
return;
var bl = build;
build = function (spec, f) {
var g = bl.apply(this, arguments);
if (spec && spec.deityTemple && spec.deity && DEITY[spec.deity])
try {
templeDress(g, spec, DEITY[spec.deity]);
}
catch (e) {
if (window.console)
console.warn("temple dress:", e);
}
return g;
};
})();
var TMAT = {};
function tmat(c, ds) { var k = c + (ds ? "d" : ""); if (!TMAT[k]) {
TMAT[k] = new THREE.MeshLambertMaterial({ color: c });
if (ds)
TMAT[k].side = THREE.DoubleSide;
} return TMAT[k]; }
function templeDress(g, spec, d) { return __ZC(106, 4, this, arguments, new.target); }
