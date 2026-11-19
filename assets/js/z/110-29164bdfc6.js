/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(110, function () {
"use strict";
return [
function (word, cat) {
var r = growRnd(growHash(word)), P = [];
function box(w, h, d, x, y, z, c) { P.push({ g: "box", s: [w, h, d], p: [x, y, z], c: c }); }
function cyl(rt, rb, h, x, y, z, c) { P.push({ g: "cyl", s: [rt, rb, h], p: [x, y, z], c: c }); }
function cone(rr, h, x, y, z, c) { P.push({ g: "cone", s: [rr, h], p: [x, y, z], c: c }); }
var c1 = growColor(r), c2 = growColor(r), c3 = growColor(r);
if (cat === "structure") {
var w = 6 + r() * 8, d = 6 + r() * 8, h = 4 + r() * 6, kind = Math.floor(r() * 4);
box(w, h, d, 0, h / 2, 0, c1);
box(w * 0.3, h * 0.55, 0.3, 0, h * 0.28, d / 2 + 0.1, "dark");
box(w * 0.9, 0.4, d * 0.9, 0, h + 0.2, 0, c2);
if (kind === 0)
cone(Math.max(w, d) * 0.62, h * 0.7, 0, h + 0.4 + h * 0.35, 0, c3);
else if (kind === 1) {
box(w * 0.5, h * 0.9, d * 0.5, 0, h + 0.4 + h * 0.45, 0, c1);
cone(Math.max(w, d) * 0.36, h * 0.5, 0, h * 1.9 + 0.6, 0, c3);
}
else if (kind === 2) {
cyl(Math.min(w, d) * 0.45, Math.min(w, d) * 0.45, h * 0.35, 0, h + 0.4 + h * 0.17, 0, c3);
}
else {
box(w * 0.25, h * 1.4, d * 0.25, -w * 0.38, h * 0.7, -d * 0.38, c2);
cone(w * 0.2, h * 0.5, -w * 0.38, h * 1.4 + h * 0.25, -d * 0.38, c3);
}
box(w * 0.18, h * 0.2, 0.2, -w * 0.3, h * 0.62, d / 2 + 0.08, "glass");
box(w * 0.18, h * 0.2, 0.2, w * 0.3, h * 0.62, d / 2 + 0.08, "glass");
return { cat: "structure", size: [+w.toFixed(2), +(h * 2).toFixed(2), +d.toFixed(2)], parts: P };
}
if (cat === "nature") {
var th = 2 + r() * 4, tr = 0.2 + r() * 0.3, layers = 1 + Math.floor(r() * 3);
cyl(tr * 0.8, tr, th, 0, th / 2, 0, "bark");
for (var i = 0; i < layers; i++) {
var rr2 = 1.6 + r() * 1.8 - i * 0.4;
if (r() < 0.5)
cone(rr2, 2 + r() * 2, 0, th + 1 + i * 1.4, 0, i % 2 ? c2 : "nature");
else
box(rr2 * 1.4, 1.2 + r(), rr2 * 1.4, 0, th + 0.6 + i * 1.2, 0, i % 2 ? c1 : "nature");
}
if (r() < 0.5)
for (var k = 0; k < 3; k++)
box(0.35, 0.35, 0.35, (r() - 0.5) * 2.6, th + 0.4 + r() * 2, (r() - 0.5) * 2.6, c3);
return { cat: "nature", size: [4, +(th + 5).toFixed(2), 4], parts: P };
}
if (cat === "vehicle") {
var L = 3 + r() * 4, W = 1.6 + r() * 1, H = 1 + r() * 0.8;
box(W, H, L, 0, 0.6 + H / 2, 0, c1);
box(W * 0.9, H * 0.7, L * 0.45, 0, 0.6 + H + H * 0.35, -L * 0.05, c2);
box(W * 0.85, H * 0.45, 0.12, 0, 0.6 + H + H * 0.35, L * 0.18, "glass");
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { P.push({ g: "cyl", s: [0.45, 0.45, 0.3], p: [q[0] * W / 2, 0.45, q[1] * L * 0.32], r: [0, 0, 1.5708], c: "dark" }); });
return { cat: "vehicle", size: [+W.toFixed(2), +(0.6 + H * 2).toFixed(2), +L.toFixed(2)], parts: P };
}
var s = 0.6 + r() * 1.6, bodyK = Math.floor(r() * 3);
box(s * 1.2, 0.25, s * 1.2, 0, 0.125, 0, "stone");
if (bodyK === 0)
box(s, s * 1.4, s, 0, 0.25 + s * 0.7, 0, c1);
else if (bodyK === 1)
cyl(s * 0.5, s * 0.6, s * 1.5, 0, 0.25 + s * 0.75, 0, c1);
else
cone(s * 0.7, s * 1.8, 0, 0.25 + s * 0.9, 0, c1);
var top = 0.25 + (bodyK === 2 ? s * 1.8 : s * 1.45);
if (r() < 0.6)
box(s * 0.5, s * 0.5, s * 0.5, 0, top + s * 0.25, 0, c2);
else
cyl(s * 0.3, s * 0.3, s * 0.4, 0, top + s * 0.2, 0, c2);
if (r() < 0.5)
box(s * 1.3, s * 0.12, s * 0.12, 0, 0.25 + s * 0.8, 0, c3);
return { cat: "infra", size: [+(s * 1.3).toFixed(2), +(top + s * 0.6).toFixed(2), +(s * 1.3).toFixed(2)], parts: P };
},
function (w) {
if (GROW_STOPSET[w])
return true;
if (typeof KIT !== "undefined" && KIT[w])
return true;
if (typeof VOCAB !== "undefined") {
for (var k in VOCAB) {
var L = VOCAB[k];
if (L && L.indexOf && L.indexOf(w) > -1)
return true;
}
}
if (typeof MODIFIERS !== "undefined" && MODIFIERS[w] !== undefined)
return true;
if (typeof NAMED !== "undefined" && NAMED[w] !== undefined)
return true;
if (typeof CREATURE !== "undefined" && CREATURE[w])
return true;
return false;
},
function () {
if (GROW_WORDS && GROW_WORDS.n === (typeof PHRASES !== "undefined" ? PHRASES.length : 0))
return GROW_WORDS.set;
var set = {};
(typeof PHRASES !== "undefined" ? PHRASES : []).forEach(function (p) { String(p[0]).split(/\s+/).forEach(function (w) { if (w)
set[w] = 1; }); });
(typeof DEITY_WORDS !== "undefined" ? DEITY_WORDS : []).forEach(function (d) { String(d[0] || d).toLowerCase().split(/\s+/).forEach(function (w) { if (w)
set[w] = 1; }); });
GROW_WORDS = { n: (typeof PHRASES !== "undefined" ? PHRASES.length : 0), set: set };
return set;
},
function (w) {
if (!w || w.length < 3 || w.length > 22 || !/^[a-z][a-z-]*[a-z]$/.test(w))
return false;
if (GROW_STOPSET[w] || GROW_ABSTRACT.test(w) || GROW_DET.test(w) || GROW_BREAK.test(w) || GROW_VERB.test(w) || GROW_BEING_NEXT.test(w))
return false;
if (/ly$/.test(w))
return false;
if (/(ed|ing)$/.test(w) && w.length > 5)
return false;
return true;
},
function (text) {
var toks = (" " + String(text || "").toLowerCase().replace(/[’']/g, "'").replace(/'s\b/g, "") + " ").replace(/([.,;:!?()"“”])/g, " $1 ").split(/\s+/).filter(Boolean);
var out = [], seen = {}, idx = growWordIndex();
function isBoundary(t) { return !t || /^[.,;:!?()"“”]$/.test(t) || GROW_BREAK.test(t) || GROW_DET.test(t) || GROW_VERB.test(t) || GROW_BEING_NEXT.test(t) || (/ed$/.test(t) && t.length > 4) || /^(full|made|everywhere|again|too|there|here|all|around|away|back|together|up|down)$/.test(t); }
for (var i = 0; i < toks.length; i++) {
var t = toks[i].replace(/[^a-z-]/g, "");
if (!growNounLike(t))
continue;
var next = toks[i + 1] || "", prev = (toks[i - 1] || "").replace(/[^a-z-]/g, "");
if (!isBoundary(next) && growNounLike(next.replace(/[^a-z-]/g, "")))
continue;
if (growAdjLike(t) && growIsKnown(next.replace(/[^a-z-]/g, "")))
continue;
if (!(GROW_PREV.test(prev) || growAdjLike(prev) || (prev && !growIsKnown(prev) && growNounLike(prev))))
continue;
var word = growSingular(t), said = t, compound = null;
if (prev && growNounLike(prev) && !growAdjLike(prev) && !growIsKnown(prev) && !idx[prev + " " + t] && !GROW_PREV.test(prev))
compound = prev + " " + word;
if (!compound && growIsKnown(t))
continue;
if (compound && growIsKnown(prev + " " + t))
continue;
var key = compound || word;
if (seen[key])
continue;
seen[key] = 1;
var person = !compound && GROW_PERSON.test(t) && !/(human|woman|women|person|people)$/.test(t) ? true : false;
var being = !person && (GROW_BEING_NEXT.test(next) || (!compound && GROW_CREATURE.test(word)));
out.push({ word: person ? t : key, said: compound ? prev + " " + t : said, being: being, person: person });
}
return out;
},
function (u) {
if (!u || !u.word)
return null;
if (u.person) {
var pw = u.word, ps = growSingular(pw.replace(/men$/, "man").replace(/women$/, "woman"));
if (typeof learnWord === "function" && typeof KIT !== "undefined" && KIT.human) {
learnWord("human", pw);
if (ps !== pw)
learnWord("human", ps);
}
growNote(ps, "person", "human");
return "human";
}
if (u.being) {
if (typeof learnWord === "function" && typeof KIT !== "undefined" && KIT.creature) {
learnWord("creature", u.word);
if (u.said !== u.word)
learnWord("creature", u.said);
}
growNote(u.word, "being", "creature");
return "creature";
}
var key = ("g" + u.word.replace(/[^a-z0-9]/g, "")).slice(0, 23);
var head = u.word.split(" ").pop();
if (!/^[a-z][a-z0-9]{1,23}$/.test(key))
return null;
if (typeof KIT !== "undefined" && KIT[key]) {
if (typeof learnWord === "function") {
learnWord(key, u.word);
if (u.said !== u.word)
learnWord(key, u.said);
}
return key;
}
var cat = growCategory(head), def = growRecipe(u.word, cat);
var got = (typeof growArchetype === "function") ? growArchetype(key, def, u.word) : null;
if (!got)
return null;
if (u.said !== u.word && typeof learnWord === "function")
learnWord(key, u.said);
GROWN_HERE[key] = u.word;
growNote(u.word, cat, key);
return key;
},
function (w) {
if (!w || w.length < 6)
return null;
for (var k = Math.max(3, w.length - 12); k <= w.length - 3; k++) {
var pre = w.slice(0, k), head = w.slice(k), arch = growHeadArch(head) || growHeadArch(growSingular(head));
if (arch && pre.length >= 2 && !/^(s|es)$/.test(head))
return { pre: pre, head: head, arch: arch, colour: GROW_PREFIX_COLOUR[pre] || null };
}
for (var k2 = w.length - 3; k2 >= 3; k2--) {
var first = w.slice(0, k2), arch2 = growHeadArch(first);
if (arch2 && w.length - k2 >= 3)
return { pre: w.slice(k2), head: first, arch: arch2, colour: null };
}
return null;
},
function (chunk) {
var t = String(chunk || "");
t = t.replace(/\bfire (station|hall|department|house)s?\b/gi, "firehouse").replace(/\bpolice (department|headquarters|hq)\b/gi, "police station");
t = t.replace(GROW_SIZEWORD, function (m, det, size, next) {
if (GROW_BREAK.test(next) || GROW_VERB.test(next) || GROW_BEING_NEXT.test(next) || /^(of|who|that)$/.test(next))
return m;
return det + " huge ";
});
t = t.replace(/\b([a-z]+)\s+([a-z]+)\b/gi, function (m, a, b) {
var al = a.toLowerCase(), bl = b.toLowerCase();
if (!GROW_GENERIC.test(bl))
return m;
if (growWordIndex()[al + " " + bl])
return m;
var arch = growHeadArch(al);
if (!arch || !KIT[arch] || KIT[arch].cat === "being")
return m;
return a;
});
return t;
},
function (chunk) {
var low = " " + String(chunk || "").toLowerCase() + " ", extra = [], text = chunk;
var places = [];
GROW_PLACES.forEach(function (pl) { var mm = low.match(pl[0]); if (mm) {
extra.push(pl[1]);
places.push(mm[1].replace(/\s+/g, ""));
} });
var re = /\b(two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|\d{1,2}|several|many|lots of|a lot of|a few|a couple of|rows of|a row of|dozens of|hundreds of|a bunch of|tons of|loads of|a line of|a group of|a crowd of)\s+(?:(?:big|small|little|tall|old|new|tiny|huge|red|blue|white|black|green|brick|wooden|stone|identical|empty|giant|glowing|dark|bright)\s+)?([a-z]+?(?:ies|es|s))\b/g, m;
while ((m = re.exec(low))) {
var n = GROW_NUM[m[1]] || Math.min(12, parseInt(m[1], 10) || 0);
if (n < 2)
continue;
n = Math.min(12, n);
var pl = m[2], sing = pl.replace(/ies$/, "y").replace(/(ch|sh|x|ss)es$/, "$1").replace(/s$/, "");
var arch = growHeadArch(sing) || growHeadArch(pl);
if (!arch)
continue;
if (KIT[arch] && KIT[arch].cat === "being")
continue;
var more = [];
for (var i = 0; i < n; i++)
more.push("a " + sing + ".");
extra.push(more.join(" "));
}
return { text: text, extra: extra.join(" "), places: places };
}
];
});
