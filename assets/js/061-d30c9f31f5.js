/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var BOOKS = null, BIX = null;
var EMVAR = { bloud: "blood", sonne: "son", yron: "iron", woolfe: "wolf", wolfe: "wolf", sunne: "sun",
moone: "moon", starre: "star", starres: "stars", yeare: "year", eies: "eyes", shippe: "ship" };
function normEM(w) {
w = String(w).toLowerCase().replace(/ſ/g, "s").replace(/é/g, "e").replace(/[^a-z]/g, "");
if (EMVAR[w])
w = EMVAR[w];
if (w.length < 3)
return w;
w = w.replace(/^v(?=[^aeiou])/, "u").replace(/^y(?=[^aeiou])/, "i");
w = w.replace(/([aeiou])u(?=[aeiou])/g, "$1v");
w = w.replace(/ie$/, "y");
w = w.replace(/(.)y(?=[^aeiou]|$)/g, function (m, a) { return /[aeiou]/.test(a) ? m : a + "i"; });
if (w.length > 3 && /s$/.test(w) && !/ss$/.test(w))
w = w.slice(0, -1);
w = w.replace(/([^aeiou])re$/, "$1er");
if (w.length > 3 && /e$/.test(w))
w = w.slice(0, -1);
w = w.replace(/([bcdfgklmnprtz])\1$/, "$1");
return w;
}
var STOPRAW = ("the and that this with from have were was had has for but not you your our their them they she her him his " +
"its are been being into onto upon over under about above after again before then than there here where when what which who " +
"whom whose while would could should shall will can may might must also just very much many more most some any all each every " +
"other another such only own same too out off down one two three first last next still even ever never always because though " +
"through during until unto doth hath thee thou thy thine thereof whereof wherein whereby hee shee wee bee doe goe beene " +
"dream dreame dreamer dreaming dreamt dreamed dreams dreames signifie signify signifies signifieth denote denotes denoteth " +
"foretell foretells foretelleth portend portends indicate indicates betoken betokens mean means meaneth " +
"thing things man men woman women person persons someone something somewhere like felt feel seemed seem looked look saw see " +
"seeing seen went go going came come coming got get made make making knew know thought think told tell said say " +
"back way time times day days night nights good bad great little small large long old new began kept left right " +
"young maid maiden lover affairs fortune business friends enemies interests").split(/\s+/);
var STOP = {};
STOPRAW.forEach(function (w) { STOP[normEM(w)] = 1; STOP[w] = 1; });
function tokensOf(text) {
var out = [], m, re = /[A-Za-zſé']+/g;
while ((m = re.exec(String(text || "")))) {
var t = normEM(m[0]);
if (t.length >= 3)
out.push(t);
}
return out;
}
function books() {
if (BOOKS)
return BOOKS;
if (typeof DW_BOOKS === "undefined" || !DW_BOOKS)
return null;
BOOKS = DW_BOOKS;
indexBooks();
return BOOKS;
}
function indexBooks() { return __ZC(61, 0, this, arguments, new.target); }
var ACTIONS = {};
[
[["fly", "flew", "flown", "flying", "soar", "soared", "soaring"], ["To flye"], ["Flying", "Flight"]],
[["flies", "flys"], ["Of Flyes"], ["Flies"]],
[["float", "floated", "floating", "hover", "hovered", "hovering"], [], ["Floating"]],
[["fall", "fell", "fallen", "falling"], [], ["Fall"]],
[["drown", "drowned", "drowning"], [], ["Drowning"]],
[["climb", "climbed", "climbing"], [], ["Climbing"]],
[["run", "ran", "running", "fled", "fleeing"], [], ["Running"]],
[["hunt", "hunted", "hunting"], ["Of Dogs and the Cha"], []],
[["die", "died", "dying"], ["Of the dead reviving"], ["Dying"]],
[["dead", "corpse", "corpses"], ["Of the Dead"], ["Dead"]],
[["death"], [], ["Death"]],
[["naked", "nude"], [], ["Naked"]],
[["kill", "killed", "killing"], [], ["Killing"]],
[["murder", "murdered", "murdering"], [], ["Murder"]],
[["marry", "married", "marrying", "wedding", "wed"], ["Of Weddings"], ["Marriage", "Wedding"]],
[["pregnant", "pregnancy"], ["To be big with child"], ["Pregnancy"]],
[["born", "birth"], ["Of the birth"], ["Birth"]],
[["baby", "babies", "infant"], ["To have Children"], ["Baby"]],
[["snake", "snakes", "serpent", "serpents"], [], ["Snakes", "Serpents"]],
[["spider", "spiders"], [], ["Spider"]],
[["key", "keys"], ["Of the Key"], ["Key"]],
[["hair"], ["Of Long Haire"], ["Hair"]],
[["money", "coins", "treasure"], ["Of Money"], ["Money"]],
[["war", "battle", "soldiers", "army"], ["Of Warre"], ["War"]],
[["ghost", "ghosts", "phantom", "apparition"], [], ["Ghost", "Apparition"]],
[["tooth", "teeth"], ["Of the Teeth"], ["Teeth"]],
[["mirror", "mirrors"], ["Of the Looking"], ["Mirror"]],
[["storm", "storms"], [], ["Storm"]],
[["earthquake"], [], ["Earthquake"]]
].forEach(function (row) {
var verb = /^(fly|float|fall|drown|climb|run|hunt|die|kill|murder|marry)$/.test(row[0][0]);
row[0].forEach(function (w) { ACTIONS[w] = { a: row[1], m: row[2], wt: verb ? 22 : 10 }; });
});
function resolveActions() { return __ZC(61, 1, this, arguments, new.target); }
function released() { if (!store.released)
store.released = {}; return store.released; }
function localRelease(k) { return !!released()[k] && typeof amKeeper === "function" && amKeeper(); }
function entryHeld(e) {
var k = "w:" + e.w;
return e.hold && !localRelease(k) && !(typeof cloudReleased === "function" && cloudReleased(k));
}
function readingHeld(e, k) {
var key = "r:" + e.w + ":" + k;
return e.hr && e.hr.indexOf(k) > -1 && !localRelease(key) && !(typeof cloudReleased === "function" && cloudReleased(key));
}
function followSee(i, depth) {
var e = BOOKS.miller.entries[i];
if (!e || depth > 3)
return i;
if (e.p.length)
return i;
var n = (e.n || []).join(" "), m = /See\s+([A-Z][A-Za-z' -]+?)[.,;]/.exec(n + ".");
if (!m)
return i;
var j = BIX.mExact[m[1].toLowerCase().trim()];
return (j === undefined) ? i : followSee(j, (depth || 0) + 1);
}
var PHYSICAL = /\b(sick|ill|fever|feverish|pain|painful|aching|ache|hungry|starving|thirst|thirsty|freezing|sweating|bathroom|toilet|alarm clock|deadline|exam|worried|anxious|anxiety|medicine|pills|drunk|hungover|hangover|injured|nauseous|couldn't breathe|could not breathe)\b/i;
function interpretText(text, night) { return __ZC(61, 2, this, arguments, new.target); }
function personalReading(objs, night) { return __ZC(61, 3, this, arguments, new.target); }
var lastInterp = null;
function marked(text, why) {
return String(text).split(/([A-Za-zſé']+)/).map(function (part, ix) {
if (ix % 2 === 0)
return esc(part);
var n = normEM(part);
return (why[n] && !STOP[n] && n.length >= 3) ? "<mark>" + esc(part) + "</mark>" : esc(part);
}).join("");
}
function openInterp(night) { return __ZC(61, 4, this, arguments, new.target); }
function closeInterp() { document.getElementById("interp").classList.remove("open"); }
function drawReading() { return __ZC(61, 5, this, arguments, new.target); }
function renderHeld() { return __ZC(61, 6, this, arguments, new.target); }
