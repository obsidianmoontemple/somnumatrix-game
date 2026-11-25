/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(383, function () {
"use strict";
return [
function (b) {
var nm = b.g.userData.lcyName, w = b.what, where = (typeof roadAt === "function" && w && w.x !== undefined) ? (roadAt(w.x, w.z).name || "") : "";
var s = "You are " + nm + ", " + b.role + (where ? " on " + where : "") + " in the city of Somnucor. You are at work right now and stay busy while you talk. Talk like a real working person: casual, short, warm or tired or cheerful as fits you.";
if (w && w.kind === "deliver" && typeof fpsTownOrders === "function") {
var o = fpsTownOrders(1).filter(function (e) { return e.kind === "order"; })[0];
if (o)
s += " Right now you are delivering " + o.what + " from " + (o.ship || o.to) + " to " + (o.dest || o.from) + ", ordered by phone.";
}
if (w && w.kind === "build")
s += " The site is a new block of homes; it is on day " + ((w.stage || 0) + 1) + " of ten.";
if (w && w.kind === "works")
s += " You are mending the road; the lane is shut until you finish today.";
if (w && w.kind === "trash")
s += " You do the bin round on this street every morning and afternoon.";
return s;
},
function (b) {
var k = b.what && b.what.kind, L = { trash: ["Mind your toes, love, bin coming through.", "Morning! Lovely day for it, eh?", "Hang on, let me get this one tipped."],
sweep: ["Watch the pile, I've only just swept it.", "All right? Leaves everywhere today."], post: ["Morning! Nothing for you today, I'm afraid. Or is there?", "Can't stop long, got the whole street to do."],
night: ["Evening. All quiet so far.", "You're out late. Everything all right?"], deliver: ["Sorry, just dropping this off. Parcel for the shop.", "Hiya. Mind the van door."],
works: ["Lane's shut, I'm afraid. Pavement's fine though.", "Don't mind the noise, nearly through."], build: ["Hard hats past the gate, love. What can I do for you?", "Coming on nicely, isn't it?"] }[k] || ["Hello there."];
return L[lcyHash(b.g.userData.lcyName + lcyDay()) % L.length];
}
];
});
