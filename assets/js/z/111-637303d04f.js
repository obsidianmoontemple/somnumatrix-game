/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(111, function () {
"use strict";
return [
function (w) {
var p = w.split(" "), last = p.pop(), pl;
if (/(man)$/.test(last))
pl = last.replace(/man$/, "men");
else if (/[^aeiou]y$/.test(last))
pl = last.replace(/y$/, "ies");
else if (/(s|x|z|ch|sh)$/.test(last))
pl = last + "es";
else if (/(wolf|leaf|loaf|calf|half|shelf|elf|thief)$/.test(last))
pl = last.replace(/f$/, "ves");
else if (/(knife|wife|life)$/.test(last))
pl = last.replace(/fe$/, "ves");
else if (/^(mouse|goose|sheep|deer|fish|moose|people|folk|men|women|children)$/.test(last))
return null;
else
pl = last + "s";
p.push(pl);
return p.join(" ");
},
function () {
if (typeof PHRASES === "undefined" || PHRASES.length === MORE_PLURALS_N)
return;
var have = {};
PHRASES.forEach(function (pr) { have[pr[0]] = 1; });
var add = [];
PHRASES.forEach(function (pr) {
var w = pr[0];
if (!/^[a-z][a-z' -]*[a-z]$/.test(w) || w.length < 3)
return;
if (/s$/.test(w) && !/(ss|us|is)$/.test(w))
return;
if (typeof KIT !== "undefined" && KIT[pr[1]] && KIT[pr[1]].cat === "being" && pr[1] === "human")
return;
var pl = morePlural(w);
if (pl && !have[pl]) {
have[pl] = 1;
add.push([pl, pr[1]]);
}
});
add.forEach(function (a) { PHRASES.push(a); if (VOCAB[a[1]])
VOCAB[a[1]].push(a[0]); });
PHRASES.sort(function (a, b) { return b[0].length - a[0].length; });
MORE_PLURALS_N = PHRASES.length;
},
function (w) {
if (!w)
return false;
var set = moreExactSet();
if (set[w] || growKnownWord(w))
return true;
var sing = growSingular(w);
if (sing !== w && (set[sing] || growKnownWord(sing)))
return true;
return growAdjLike(w) && !!growWordIndex()[w];
},
function (text) {
var out = [], m;
var re1 = new RegExp("\\b(?:my|our|his|her|their)\\s+(" + MORE_REL + ")\\s+([A-Z][a-z]{1,15})\\b", "g");
while ((m = re1.exec(text)))
out.push({ rel: m[1].toLowerCase(), name: m[2] });
var re2 = /\b(?:a|an|the)\s+(man|woman|girl|boy|person|guy|lady|kid|child|stranger|old man|old woman)\s+(?:named|called)\s+([A-Z][a-z]{1,15})\b/g;
while ((m = re2.exec(text)))
out.push({ rel: m[1].toLowerCase(), name: m[2] });
return out;
}
];
});
