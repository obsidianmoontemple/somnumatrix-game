/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(53, function () {
"use strict";
return [
function (arch, label, attrs, n) {
n = n || normName(label) || arch;
var ch = { id: uid(), archetype: arch, name: label || arch, aka: [n], details: [],
sessions: [store.session], awake: false, log: [], objId: null, x: 0, z: 0,
primary: true, src: { name: "stated" }, role: null, shift: null, routine: null,
home: null, work: null, anchor: null,
born: new Date().toISOString().slice(0, 10) };
seedDetails(ch, attrs);
store.characters.push(ch);
return ch;
},
function (text) {
if (!text)
return;
var low = text.toLowerCase();
store.characters.forEach(function (c) {
if (c.primary === false)
return;
var hit = c.aka.some(function (a) { return a && low.indexOf(a) > -1; });
if (!hit)
return;
var re = /[^.!?]+[.!?]?/g, m;
while ((m = re.exec(text))) {
var sent = m[0], sl = sent.toLowerCase();
if (!c.aka.some(function (a) { return a && sl.indexOf(a) > -1; }))
continue;
var clause = sent.replace(/[.!?]$/, "").trim();
if (clause.length > 8 && clause.length < 220)
addDetail(c, clause);
}
if (c.sessions.indexOf(store.session) === -1)
c.sessions.push(store.session);
checkWake(c);
});
if (typeof nightmareScan === "function")
nightmareScan(text);
if (typeof insideScan === "function")
insideScan(text);
}
];
});
