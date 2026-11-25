/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(29, function () {
"use strict";
return [
function (seg) {
var o = {}, m;
if (/\bno windows\b|\bwindowless\b|\bwithout (any )?windows\b/.test(seg))
o.ws = "none";
else if (/\bstained[- ]glass\b/.test(seg))
o.ws = "stained";
else if (/\b(arched|gothic|pointed|lancet) windows?\b/.test(seg))
o.ws = "arched";
else if (/\b(round|circular) windows?\b|\bportholes?\b/.test(seg))
o.ws = "round";
else if (/\bshutter(s|ed)\b/.test(seg))
o.ws = "shuttered";
else if (/\bbarred windows?\b|\bbars on (the |its )?windows\b|\bwindows? with bars\b/.test(seg))
o.ws = "barred";
else if (/\bboarded[- ]up\b|\bboarded windows?\b|\bwindows? (were |was )?boarded\b/.test(seg))
o.ws = "boarded";
else if (/\b(tall|long|narrow|floor[- ]to[- ]ceiling) windows?\b/.test(seg))
o.ws = "tall";
if ((m = /\b([a-z]+) (window frames?|shutters|frames)\b/.exec(seg)) && NAMED[m[1]] !== undefined)
o.wf = NAMED[m[1]];
if (/\bdouble doors?\b/.test(seg))
o.ds = "double";
else if (/\barched (front )?door(way)?\b/.test(seg))
o.ds = "arched";
else if (/\b(round|circular) (front )?door\b/.test(seg))
o.ds = "round";
else if (/\bbarn doors?\b/.test(seg))
o.ds = "barn";
else if (/\b(iron|steel|metal|studded) (front )?door\b/.test(seg))
o.ds = "iron";
else if (/\bglass (front )?doors?\b/.test(seg))
o.ds = "glass";
if ((m = /\b([a-z]+) (?:(?:front|back|side|double|arched|round|barn|iron|steel|glass|wooden|oak|studded|big|great|heavy|tall|old|new) )*doors?\b/.exec(seg)) && NAMED[m[1]] !== undefined)
o.dc = NAMED[m[1]];
else if (/\b(oak|wooden|wood) (front )?door\b/.test(seg))
o.dc = 0x6B4A32;
var extra = [];
if (/\bback door\b/.test(seg))
extra.push("back");
if (/\bside doors?\b/.test(seg))
extra.push("left");
if (/\b(two|2) doors\b/.test(seg) && !extra.length)
extra.push("back");
if (/\b(three|3|many|several) doors\b/.test(seg))
extra = ["back", "left", "right"];
if (extra.length)
o.doors = extra;
return o;
},
function (low) {
var out = [], re = / (with|and|its|their|has|had|of|having)( (?:a|an|two|three|four|five|six|many|tall|high|great|big|little|small|pointed|round|tiny|huge|soaring|slender|twin)){0,2} ((?:dark|deep|pale|light|bright) )?([a-z]+) (towers?|turrets?|spires?|steeples?|minarets?|domes?|roofs?|rooftops|walls|doors?|gates?)\b/g, m;
while ((m = re.exec(low))) {
var c = NAMED[m[4]];
if (c === undefined)
continue;
if (m[3]) {
var sh = m[3].trim();
c = shade(c, (sh === "dark" || sh === "deep") ? -0.35 : 0.3);
}
var st = m.index + m[0].indexOf(m[3] || m[4] + " " + m[5]);
out.push({ at: st, end: m.index + m[0].length, key: PART_KEY[m[5]], part: m[5], c: c });
}
return out;
},
function (seg, inside) {
var o = {}, m;
function colourIn(w) { return NAMED[w] !== undefined ? NAMED[w] : undefined; }
function matIn(w, list) { return list.indexOf(w) > -1 ? w : null; }
if ((m = /\b(?:a |an |the )?([a-z]+)[- ]roof(?:ed)?\b/.exec(seg)) || (m = /\broofs? (?:was|were|of) ([a-z]+)\b/.exec(seg))) {
var rw = m[1];
if (colourIn(rw) !== undefined)
o.rc = colourIn(rw);
else if (matIn(rw, ROOFMATS))
o.rm = rw;
else if (rw === "tin" || rw === "corrugated")
o.rm = "metal";
else if (rw === "straw")
o.rm = "thatch";
}
var words = [];
var w1 = /\b([a-z]+)[- ]([a-z]+ )?walls\b/.exec(seg);
if (w1) {
words.push(w1[1]);
if (w1[2])
words.push(w1[2].trim());
}
var w2 = /\bwalls? (?:were|was|of|made of) ([a-z]+)(?: ([a-z]+))?\b/.exec(seg);
if (w2) {
words.push(w2[1]);
if (w2[2])
words.push(w2[2]);
}
if (!inside)
words.forEach(function (w) {
if (colourIn(w) !== undefined && o.c === undefined)
o.c = colourIn(w);
else if (matIn(w, WALLMATS) && o.m === undefined)
o.m = w;
});
if ((m = /\bpainted ([a-z]+)\b/.exec(seg)) && colourIn(m[1]) !== undefined && o.c === undefined && !inside)
o.c = colourIn(m[1]);
if ((m = /\b(?:made )?of ([a-z]+)\b/.exec(seg)) && matIn(m[1], WALLMATS) && o.m === undefined)
o.m = m[1];
return o;
}
];
});
