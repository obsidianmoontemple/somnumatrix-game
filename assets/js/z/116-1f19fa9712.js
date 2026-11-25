/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(116, function () {
"use strict";
return [
function (n, head) {
var k = String(n || "").toLowerCase().replace(/[’']/g, "").replace(/^the\s+/, "").replace(/\s+/g, " ").trim();
if (head) {
var h = String(head).toLowerCase();
if (k.slice(-h.length - 1) === " " + h)
k = k.slice(0, -h.length - 1);
}
NAME_HEADS.split("|").forEach(function (h) { if (k.slice(-h.length - 1) === " " + h)
k = k.slice(0, -h.length - 1); });
return k.trim();
},
function (text) {
var out = [], m, seenK = {};
var re1 = new RegExp(NAME_RE_CALLED.source, "g");
while ((m = re1.exec(text))) {
var nm = m[2].trim().replace(/[.,;:!?]+$/, ""), k = nameKey(nm, m[1]);
if (k && !seenK[k]) {
seenK[k] = 1;
out.push({ at: m.index, end: m.index + m[0].length, head: m[1].toLowerCase(), name: nm.replace(/^the\s+/i, "The "), key: k, phrase: m[0] });
}
}
var re2 = new RegExp(NAME_RE_TITLE.source, "g");
while ((m = re2.exec(text))) {
var words = m[1].trim(), first = words.split(/\s+/)[0];
if (/^(I|A|An|The|Then|There|And|But|So|We|He|She|They|My|Our|It|In|On|At|To|When|After|Before|Suddenly)$/.test(first) && words.split(/\s+/).length === 1)
continue;
if (/^(I|A|An|Then|There|And|But|So|We|He|She|They|My|Our|It|In|On|At|To|When|After|Before|Suddenly)$/.test(first))
words = words.split(/\s+/).slice(1).join(" ");
if (!words)
continue;
var nm2 = words + " " + m[2], k2 = nameKey(nm2, m[2]);
if (k2 && !seenK[k2]) {
seenK[k2] = 1;
out.push({ at: m.index, end: m.index + m[0].length, head: m[2].toLowerCase(), name: nm2, key: k2, phrase: m[0] });
}
}
return out;
},
function (head) {
var h = String(head || "").toLowerCase();
var a = (typeof growHeadArch === "function") ? (growHeadArch(h) || growHeadArch(growSingular(h))) : null;
if (!a && typeof lexFind === "function")
a = lexFind(h);
if (!a || !KIT[a])
a = /inn|tavern|pub|bar|saloon|hotel|motel|lodge/.test(h) ? (KIT.hotel ? "hotel" : "shop") : "shop";
return a;
}
];
});
