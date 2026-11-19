/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var NAME_HEADS = "inn|tavern|hotel|motel|cafe|café|coffee shop|bar|pub|saloon|shop|store|market|bank|church|temple|cathedral|chapel|shrine|mosque|synagogue|school|academy|university|college|library|museum|hospital|clinic|castle|palace|fortress|fort|tower|mansion|manor|house|hall|theatre|theater|cinema|station|diner|restaurant|bakery|mill|farm|lighthouse|prison|jail|arena|stadium|gallery|emporium|lodge|cabin|cottage|warehouse|factory|office|building|club|casino|mall|boutique|salon|spa|gym|garage|barn|chateau|villa|keep|abbey|monastery|observatory|asylum|orphanage|apartments|apartment|tenement|skyscraper|motel";
var NAME_RE_CALLED = new RegExp("\\b(?:an?|the|this|that|my|our|some)\\s+(?:(?:old|new|big|small|little|tall|grand|tiny|huge|abandoned|haunted|ruined|red|blue|green|white|black|golden|stone|wooden|brick)\\s+){0,2}(" + NAME_HEADS + ")\\s*,?\\s+(?:called|named|known as|by the name of)\\s+((?:[Tt]he\\s+)?[A-Z][\\w'’&-]*(?:\\s+(?:of|the|and|&|de|du|la|le)?\\s*[A-Z][\\w'’&-]*){0,4})", "g");
var NAME_RE_TITLE = new RegExp("\\b(?:[Tt]he\\s+)?((?:[A-Z][\\w'’&-]*\\s+){1,4})(" + NAME_HEADS.split("|").map(function (h) { return h.charAt(0).toUpperCase() + h.slice(1); }).join("|") + ")\\b", "g");
function nameKey(n, head) { return __ZC(115, 0, this, arguments, new.target); }
function namedHere() {
var here = store.here || 0, out = {};
store.objects.forEach(function (o) { if (o.nameKey && !o.filler && (o.realm || 0) === here)
out[o.nameKey] = o; });
return out;
}
function namesDeclared(text) { return __ZC(115, 1, this, arguments, new.target); }
function nameHeadArch(head) { return __ZC(115, 2, this, arguments, new.target); }
function nameGive(o, name, key) {
o.name = name;
o.named = "stated";
o.nameKey = key;
if (KIT[o.archetype] && KIT[o.archetype].sign)
o.sign = name;
if (typeof refresh === "function")
refresh(o);
}
(function () {
if (typeof scanText !== "function")
return;
var inner = scanText;
scanText = function (chunk) {
var text = String(chunk || ""), known = namedHere(), decl = [], reused = [];
try {
decl = namesDeclared(text);
decl = decl.filter(function (d) { if (known[d.key]) {
reused.push(known[d.key]);
text = text.split(d.phrase).join(" ");
return false;
} return true; });
Object.keys(known).forEach(function (k) {
var esc = k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/ /g, "\\s+");
var re = new RegExp("\\b(?:the\\s+)?" + esc + "(?:'s)?(?:\\s+(?:" + NAME_HEADS + "))?\\b", "gi");
if (re.test(text)) {
reused.push(known[k]);
text = text.replace(re, " ");
}
});
decl.forEach(function (d) { var nameOnly = d.name.replace(/^the\s+/i, ""); text = text.split(nameOnly).join(" "); text = text.replace(new RegExp("\\b(called|named|known as|by the name of)\\s*", "gi"), " "); });
}
catch (e) {
if (window.console)
console.warn("names:", e);
}
var n0 = store.objects.length;
var res = inner.call(this, text);
try {
var fresh = store.objects.slice(n0).filter(function (o) { return !o.filler && KIT[o.archetype] && KIT[o.archetype].cat === "structure" && !o.nameKey; });
decl.forEach(function (d) {
var want = nameHeadArch(d.head);
var o = fresh.filter(function (x) { return x.archetype === want; })[0] || fresh.filter(function (x) { return String(x.label || "").toLowerCase().indexOf(d.head) > -1; })[0];
if (!o && typeof place === "function")
o = place(want, d.head, {}, { name: d.name });
if (o) {
fresh = fresh.filter(function (x) { return x !== o; });
nameGive(o, d.name, d.key);
o.label = d.head;
store.lastId = o.id;
}
});
if (reused.length) {
store.lastId = reused[reused.length - 1].id;
reused.forEach(function (o) { if (o.nights && o.nights.indexOf(store.session) < 0)
o.nights.push(store.session); });
}
if (decl.length || reused.length) {
if (typeof save === "function")
save();
}
}
catch (e) {
if (window.console)
console.warn("names:", e);
}
return res;
};
})();
(function () {
if (typeof reconcile !== "function")
return;
var rc = reconcile;
reconcile = function (p) {
try {
var known = namedHere();
((p && p.objects) || []).forEach(function (o) {
if (!o || !o.name)
return;
var k = nameKey(o.name, o.label);
if (known[k]) {
o.__sameAs = known[k].id;
o.archetype = o.archetype || known[k].archetype;
}
});
if (p && p.objects)
p.objects = p.objects.filter(function (o) { return !o.__sameAs; });
}
catch (e) { }
var r = rc.apply(this, arguments);
try {
var known2 = namedHere();
store.objects.forEach(function (o) {
if (o.named === "stated" && o.name && !o.nameKey && !o.filler) {
var k = nameKey(o.name, o.label);
if (k && !known2[k]) {
o.nameKey = k;
known2[k] = o;
}
}
});
}
catch (e) { }
return r;
};
})();
