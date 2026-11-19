/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(17, function () {
"use strict";
return [
function (words, i) {
var two = (words[i - 1] && (words[i - 1] + " " + words[i]));
if (two && TWOWORD[two])
return { c: TWOWORD[two], n: 2 };
var c = NAMED[words[i]];
if (c === undefined)
return null;
if (words[i - 1] === "dark" || words[i - 1] === "deep")
return { c: shade(c, -0.35), n: 2 };
if (words[i - 1] === "light" || words[i - 1] === "pale" || words[i - 1] === "bright")
return { c: shade(c, 0.3), n: 2 };
return { c: c, n: 1 };
},
function (low) {
var out = [], words = [], pos = [], m, re = /[a-z]+(?:-[a-z]+)?/g;
while ((m = re.exec(low))) {
words.push(m[0]);
pos.push(m.index);
}
for (var i = 0; i < words.length; i++) {
var w = words[i];
var hy = /^([a-z]+)-haired$/.exec(w);
if (hy) {
var hc = NAMED[hy[1]] !== undefined ? NAMED[hy[1]] : ({ fair: NAMED.blonde, dark: HAIR[0], white: HAIR[8], silver: HAIR[7] })[hy[1]];
if (hc !== undefined)
out.push({ at: pos[i], end: pos[i] + w.length, field: "hair", value: hc });
continue;
}
if (w === "hair") {
var c = null, start = pos[i], style = null;
for (var k = i - 1; k >= Math.max(0, i - 3); k--) {
var ca = colorAt(words, k);
if (ca && c === null) {
c = ca.c;
start = pos[k - ca.n + 1];
}
if (/^(long|flowing)$/.test(words[k]))
style = "long";
if (/^(curly|wild|frizzy)$/.test(words[k]))
style = "curly";
if (/^(short|cropped)$/.test(words[k]))
style = "short";
}
if (c !== null)
out.push({ at: start, end: pos[i] + 4, field: "hair", value: c });
if (style)
out.push({ at: start, end: pos[i] + 4, field: "hairStyle", value: style });
continue;
}
if (/^(bald|shaven)$/.test(w)) {
out.push({ at: pos[i], end: pos[i] + w.length, field: "hairStyle", value: "bald" });
continue;
}
var G = GARMENT[w];
if (!G)
continue;
var col = null, st = pos[i];
for (var j = i - 1; j >= Math.max(0, i - 3); j--) {
var cj = colorAt(words, j);
if (cj) {
col = cj.c;
st = pos[j - cj.n + 1];
break;
}
if (/^(in|wearing|with|and)$/.test(words[j]))
break;
}
if (col === null) {
var ctx = false;
for (var c2 = i - 1; c2 >= Math.max(0, i - 3); c2--)
if (/^(in|wearing|wore|dressed|his|her|their|with)$/.test(words[c2]))
ctx = true;
if (!ctx)
continue;
}
var slot = G[0], kind = G[1];
if (slot === "suit") {
if (col !== null) {
out.push({ at: st, end: pos[i] + w.length, field: "top", value: col });
out.push({ at: st, end: pos[i] + w.length, field: "bottom", value: col });
}
out.push({ at: st, end: pos[i] + w.length, field: "topKind", value: "coat" });
continue;
}
if (slot === "hat") {
out.push({ at: st, end: pos[i] + w.length, field: "hat", value: kind });
continue;
}
if (col !== null)
out.push({ at: st, end: pos[i] + w.length, field: slot, value: col });
if (kind && slot === "top")
out.push({ at: st, end: pos[i] + w.length, field: "topKind", value: kind });
if (kind && slot === "bottom")
out.push({ at: st, end: pos[i] + w.length, field: "bottomKind", value: kind });
if (kind === "dress" && col !== null)
out.push({ at: st, end: pos[i] + w.length, field: "bottom", value: col });
}
return out;
}
];
});
