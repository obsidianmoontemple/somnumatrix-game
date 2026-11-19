/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var FPN = { set: {}, at: 0, asking: null };
var FPN_T = [
"cheerful and chatty: you like people and it shows",
"dry and deadpan: you say funny things with a straight face",
"warm but nosy: you want to know everyone's business, kindly",
"grumpy until warmed up: short at first, soft once someone makes you laugh",
"shy and gentle: you speak softly and take a while to open up",
"brisk and no-nonsense: busy, practical, straight to the point",
"dreamy and easily distracted: your mind wanders mid-sentence",
"proud of your work: you love showing how it's done properly",
"a bit of a worrier: you fret about small things, then laugh at yourself",
"a sly joker: you tease people you like",
"earnest and eager: keen to help, sometimes too keen",
"laid-back and unhurried: nothing is ever urgent to you",
"sharp-tongued but fair: blunt, never mean",
"sentimental: old memories and small kindnesses get to you",
"a born gossip: you know everyone and everything that goes on",
"quietly confident: you don't talk much, but what you say lands"
];
var FPN_S = [
"you call people “love” or “pet”",
"you say “right then” and “anyway” a lot",
"you trail off sometimes and pick the thought back up",
"you answer a question with a question now and then",
"you like a long word, and don't always use it right",
"you mutter mild oaths: “blimey”, “good grief”, “heck”",
"you talk in short, clipped sentences",
"you laugh at your own jokes",
"you quote your grandmother's sayings",
"you over-explain, then apologise for going on",
"you're polite and a bit formal at first, then relax",
"you think out loud",
"you use a lot of “honestly” and “to be fair”",
"you tell little stories to make a point"
];
var FPN_L = [
"gardening, and you'll talk tomatoes for hours", "old maps", "a good card game", "your dog, Biscuit", "your cat, who rules the house",
"baking on your day off", "fishing at dawn", "dancing, badly but happily", "a particular bench where the sun hits just right",
"collecting odd buttons", "birdsong; you can name most birds by ear", "the smell of rain", "sad songs", "long walks at night",
"fixing broken things", "a good scary story", "the summer fair", "the stars: you know the constellations", "knitting",
"spicy food", "puzzles of every kind", "the theatre", "horses", "old books with notes in the margins", "the sea",
"a perfectly made cup of tea", "carving little wooden animals", "the first snow every year", "rumours about hidden treasure", "singing while you work"
];
var FPN_W = [
"rent going up", "your aching knee", "a sick parent", "a rival just down the road", "not being good enough at your work",
"saving for a wedding", "how fast everything is changing", "your teenager's friends", "a debt you'd rather not talk about",
"the weather turning", "whether you locked the door this morning", "getting older", "a letter you never answered", "strangers who ask too many questions"
];
var FPN_H = [
"you live alone with a cat", "you're married with two young children", "you look after your grandmother", "you've just got engaged",
"you're divorced and nervously dating again", "you're raising a teenager on your own", "you come from a big, noisy family", "you were widowed a few years ago",
"you share a home with your brother", "you have three messy housemates", "you've just moved here and don't know many people yet", "your twins started school this year"
];
var FPN_X = [
"you secretly write poems nobody has read", "you're saving up to open a place of your own", "you sing in a choir", "you once won a prize for the biggest marrow",
"you're learning to play the fiddle, slowly", "you can't swim and hide it", "you keep a diary of everyone you meet", "you're terrified of moths",
"you used to be a travelling performer", "you've never left the place you were born", "you paint at night", "you're teaching yourself to read old scripts"
];
var FPN_V = [
"you love this place and would never leave", "you think things were better in the old days", "you dream of travelling far away",
"you're a little wary of newcomers until you know them", "you think the place needs more green spaces", "you know every shortcut and are proud of it",
"you complain about the noise but secretly love it", "you think young people work too hard", "you're sure something strange happens here after dark"
];
function fpnHash(s) { var h = 2166136261; s = String(s || ""); for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619);
} return h >>> 0; }
function fpnPick(L, h, salt) { return L[(fpnHash(h + "|" + salt)) % L.length]; }
function fpnDrawn(c) { return __ZC(371, 0, this, arguments, new.target); }
function fpnBrief(c) {
var own = FPN.set[String(c.name || "").trim().toLowerCase()];
if (own)
return "Your own personality (always the same, whoever you talk to): " + own + " Let it show the way it does in a real person, never as a list.";
return fpnDrawn(c);
}
function fpnLoad(force) { return __ZC(371, 1, this, arguments, new.target); }
function fpnFolk(c) { return typeof fmyIsFolk === "function" && fmyIsFolk(c) && !(typeof okyGod === "function" && okyGod(c)); }
(function () {
if (typeof charSystem !== "function")
return;
var cs = charSystem;
charSystem = function (c) {
var s = cs.apply(this, arguments);
try {
if (fpnFolk(c))
s = s + " " + fpnBrief(c);
}
catch (e) {
if (window.console)
console.warn("[folk-persona]", e);
}
return s;
};
})();
(function () {
if (typeof openTalk !== "function")
return;
var ot = openTalk;
openTalk = function (c) { var r = ot.apply(this, arguments); try {
if (fpnFolk(c))
fpnLoad();
}
catch (e) { } return r; };
})();
