/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(44, function () {
"use strict";
return [
function (spec, addr) {
var h = hash(spec.id), sn = choose(SURNAME, h), sn2 = choose(SURNAME, h >>> 9), st = choose(SAINT, h >>> 5);
var a = spec.archetype;
switch (a) {
case "house":
case "cottage":
return (h % 3 === 0) ? ("The " + sn + " house") : (addr.num + " " + addr.street);
case "apartment": return sn + ((h % 2) ? " Court" : " Buildings");
case "motel": return "The " + sn + " Motel";
case "hotel": return "The " + sn;
case "tower":
case "skyscraper": return sn + " Tower";
case "church":
case "chapel": return "St " + st + "'s";
case "cathedral": return st + " Cathedral";
case "hospital": return "St " + st + "'s Hospital";
case "school": return sn + " School";
case "bank": return sn + " & " + sn2.slice(0, 1) + "o.";
case "library": return "The " + sn + " Library";
case "station": return addr.street.split(" ")[0] + " Station";
case "courthouse": return sn + " Court House";
case "institution": return "The " + sn + " Institute";
case "shop": return sn + "'s";
case "warehouse":
case "factory": return sn + " Works";
case "barn": return sn + " Farm";
case "lighthouse": return sn + " Light";
case "windmill": return sn + " Mill";
case "pier": return sn + " Pier";
case "bridge": return sn + " Bridge";
case "water": return "The " + sn;
case "hill": return sn + " Hill";
case "mountain": return sn + " Fell";
case "grass": return sn + " Green";
case "cave": return sn + " Hollow";
case "tomb":
case "grave": return "The " + sn + " plot";
case "monument":
case "statue": return "The " + sn + " Memorial";
case "road":
case "sidewalk": return addr.street;
case "tunnel": return sn + " Tunnel";
case "gate": return sn + " Gate";
case "fountain": return sn + " Fountain";
case "well": return sn + " Well";
case "ruin": return "The old " + sn + " place";
default: return null;
}
},
function (n) {
if (!n)
return null;
var t = String(n).toLowerCase().replace(/^the\s+/, "").trim();
for (var i = 0; i < store.objects.length; i++) {
var o = store.objects[i];
var a = (o.name || "").toLowerCase().replace(/^the\s+/, "");
var b = (o.label || "").toLowerCase().replace(/^the\s+/, "");
if (a === t || b === t || (a && a.indexOf(t) > -1) || (b && b.indexOf(t) > -1))
return o;
}
return null;
}
];
});
