/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
function wgDepth(k) { var b = (typeof TR_BOX !== "undefined" && TR_BOX[k]) || (typeof furnBox === "function" ? furnBox(k) : [1, 1]); return b ? b[1] : 1; }
function wgWide(k) { var b = (typeof TR_BOX !== "undefined" && TR_BOX[k]) || (typeof furnBox === "function" ? furnBox(k) : [1, 1]); return b ? b[0] : 1; }
var WG_ROOM = {};
function wgRoom(type, label, len, fn, o) { o = o || {}; WG_ROOM[type] = { type: type, label: label, len: len, fn: fn, secure: !!o.secure, open: !!o.open, public: !!o.public }; }
wgRoom("staffroom", "Staff room", 7.5, function (R) {
var w = R.w, d = R.d;
R.wallS("wgcoffeebar", w * 0.45);
R.wallS("fridge", w * 0.45 + 1.85);
R.put("wgvending", w - 0.55, -d / 2 + 0.6, "in");
R.put("table", w * 0.45, -0.6, "n");
R.put("chair", w * 0.45 - 1.0, -0.6, "out");
R.put("chair", w * 0.45 + 1.0, -0.6, "in");
R.put("chair", w * 0.45, -1.4, "n");
R.put("chair", w * 0.45, 0.2, "s");
R.put("sofa", w - 0.6, d / 2 - 2.2, "in");
R.put("rug", w - 2.2, d / 2 - 2.2, 0);
R.put("wgtv", w - 3.9, d / 2 - 2.2, "out");
R.put("plant", w - 0.5, d / 2 - 0.6, 0);
R.put("noticeboard", 2.6, -d / 2 + 0.1, "n");
R.spot(w * 0.45, 0.6);
R.spot(w - 2.2, d / 2 - 1.2);
});
wgRoom("restrooms", "Restrooms", 6, function (R) {
var w = R.w, d = R.d, n = Math.max(2, Math.min(4, Math.floor((d - 0.4) / 1.15)));
for (var i = 0; i < n; i++)
R.put("wgtoilet", w - 0.85, -d / 2 + 0.62 + i * 1.15, "in");
R.wallS("wgbasin", Math.max(2.2, w - 3.3));
R.put("plant", 0.5, -d / 2 + 0.5, 0);
R.spot(w * 0.4, 0);
});
wgRoom("lockers", "Locker room", 5.5, function (R) {
var w = R.w, d = R.d;
for (var u = 2.0; u < w - 1.2; u += 2.5) {
R.wallS("trlockers", u);
if (u > 2.6)
R.wallN("trlockers", u);
}
R.put("benchin", w * 0.55, 0, "n");
R.put("wallmirror", w - 0.06, 0, "in");
R.spot(w * 0.35, 0.4);
});
wgRoom("office", "Manager's office", 6, function (R) {
var w = R.w, d = R.d;
R.wallOut("wgworkstation", -0.3);
R.staff("@head", w - 1.55, -0.45, "out");
R.put("chair", w - 2.6, -0.75, "out");
R.put("chair", w - 2.6, 0.15, "out");
R.wallS("filecabinet", w - 0.6);
R.wallS("filecabinet", w - 1.6);
R.wallS("bookshelf", w * 0.38);
R.put("plant", w - 0.5, d / 2 - 0.55, 0);
R.put("painting", w - 0.06, d / 2 - 1.7, "in");
R.put("sofa", 1.6, -d / 2 + 1.6, "n");
R.spot(w * 0.45, 0.4);
});
wgRoom("meeting", "Meeting room", 7, function (R) {
var w = R.w, d = R.d;
R.put("longtable", w * 0.52, -0.2, "out");
for (var u = w * 0.52 - 1.6; u <= w * 0.52 + 1.61; u += 1.07) {
R.put("chair", u, -1.55, "n");
R.put("chair", u, 1.15, "s");
}
R.put("wallscreen", w - 0.06, -0.2, "in");
R.put("wgwhiteboard", w * 0.5, -d / 2 + 0.08, "n");
R.put("plant", w - 0.5, d / 2 - 0.55, 0);
R.put("wgwatercooler", 0.5, -d / 2 + 0.5, "out");
R.spot(w * 0.3, 1.6);
});
wgRoom("clerks", "Clerks' office", 9, function (R) {
var w = R.w, d = R.d, n = 0;
for (var v = -d / 2 + 1.6; v < d / 2 - 2.6; v += 2.4) {
R.put("wgworkstation", w - 1.0, v, "in");
if (n < 2)
R.staff("@clerk", w - 1.85, v - 0.1, "out");
n++;
if (w > 8.5) {
R.put("wgworkstation", w - 4.2, v, "in");
}
}
R.wallS("filecabinet", 2.2);
R.wallS("filecabinet", 3.2);
R.wallS("wgcopier", 4.6);
R.put("wgwatercooler", 0.5, -d / 2 + 0.5, "out");
R.put("plant", w - 0.5, d / 2 - 0.55, 0);
R.put("noticeboard", w - 0.06, d / 2 - 1.6, "in");
R.spot(1.8, 0);
});
wgRoom("store", "Storeroom", 7, function (R) {
var w = R.w, d = R.d;
for (var u = 2.4; u < w - 0.6; u += 2.5) {
R.put("wgshelving", u, -d / 2 + 0.45, "n");
R.put("wgshelving", u, 0.2, "n");
R.put("wgshelving", u, 1.1, "s");
}
R.put("trcrates", w - 1.2, d / 2 - 0.8, "in");
R.spot(1.4, -0.6);
});
wgRoom("records", "Records room", 6, function (R) {
var w = R.w, d = R.d;
for (var u = 2.2; u < w - 0.8; u += 1.0) {
R.put("filecabinet", u, -d / 2 + 0.4, "n");
R.put("filecabinet", u, 0.0, "n");
R.put("filecabinet", u, 0.75, "s");
}
R.wallOut("wgworkstation", d / 2 - 1.4);
R.spot(1.5, 0);
});
wgRoom("security", "Security office", 5.5, function (R) {
var w = R.w, d = R.d;
R.put("wgcctv", w - 0.06, 0, "in");
R.put("wgcontrol", w - 1.25, 0, "in");
R.staff("@security", w - 2.3, 0, "out");
R.wallS("trlockers", 2.4);
R.wallS("keyrack", 4.4);
R.put("wgwatercooler", 0.5, -d / 2 + 0.5, "out");
R.spot(1.6, -0.5);
}, { secure: true });
wgRoom("kitchen", "Kitchen", 8, function (R) {
var w = R.w, d = R.d;
R.wallOut("wgcookline", -0.6);
R.staff("Cook", w - 1.55, -0.6, "out");
R.staff("Kitchen porter", 2.6, -d / 2 + 1.3, "s");
R.put("wgsteeltable", w - 3.2, -0.4, "n");
R.wallS("wgdishpit", 2.6);
R.wallS("fridge", 4.4);
R.wallS("fridge", 5.3);
R.wallN("wgshelving", w - 1.4);
R.spot(w - 3.2, 1.6);
});
wgRoom("laundry", "Laundry", 5.5, function (R) {
var w = R.w, d = R.d;
R.wallOut("wglaundry", -0.8);
R.wallOut("wglaundry", 1.2);
R.wallS("wgshelving", 3);
R.put("wgsteeltable", 3.4, 0.4, "n");
R.spot(1.6, 0);
});
wgRoom("lounge", "Lounge", 7, function (R) {
var w = R.w, d = R.d;
R.put("sofa", w - 0.6, 0, "in");
R.put("armchair", w - 2.6, -1.6, "n");
R.put("armchair", w - 2.6, 1.6, "s");
R.put("rug", w - 2.2, 0, 0);
R.put("table", w - 2.2, 0, "n");
R.put("bookshelf", w * 0.4, -d / 2 + 0.25, "n");
R.put("plant", w - 0.5, -d / 2 + 0.55, 0);
R.put("plant", w - 0.5, d / 2 - 0.55, 0);
R.put("painting", w - 0.06, 0, "in");
R.spot(w * 0.4, 0);
}, { public: true });
wgRoom("waiting", "Waiting room", 7, function (R) {
var w = R.w, d = R.d;
R.put("wgchairrow", w - 0.5, -1.5, "in");
R.put("wgchairrow", w - 0.5, 1.2, "in");
R.put("wgchairrow", w * 0.5, -d / 2 + 0.45, "n");
R.put("plant", w - 0.5, d / 2 - 0.55, 0);
R.put("wgvending", 0.55, -d / 2 + 0.6, "out");
R.put("wallscreen", w - 0.06, -0.15, "in");
R.spot(w * 0.4, 0);
}, { public: true });
wgRoom("plantroom", "Plant room", 8, function (R) {
var w = R.w, d = R.d;
R.wallOut("boiler", -1.4);
R.wallOut("trpump", 1.6);
R.put("pipes", w * 0.5, -d / 2 + 0.5, "n");
R.put("wgcontrol", 2.6, -0.2, "out");
R.put("trtoolwall", w * 0.6, d / 2 - 0.12, "s");
R.spot(2.2, 1.4);
}, { secure: true });
wgRoom("triage", "Triage", 6, function (R) {
var w = R.w, d = R.d;
R.wallOut("wgworkstation", -1.0);
R.staff("Triage nurse", w - 1.85, -1.1, "out");
R.put("wgexamcouch", w - 1.2, 1.3, "in");
R.put("wgvitals", w - 0.4, 0.15, "in");
R.put("weighscale", 2.4, -d / 2 + 0.5, "n");
R.put("chair", w - 2.6, -0.6, "out");
R.put("wgbasin", 3.9, -d / 2 + 0.3, "n");
R.spot(2, 0);
});
wgRoom("ed", "Emergency department", 17, function (R) {
var w = R.w, d = R.d, n = Math.floor((d - 2.4) / 2.9);
for (var i = 0; i < n; i++)
R.put("wgbay", w - 1.15, -d / 2 + 1.6 + i * 2.9, "in");
R.put("wgnursedesk", 2.6, -1.2, "out");
R.staff("Emergency nurse", 3.5, -1.2, "in");
R.staff("Emergency doctor", 2.4, 1.4, "out");
R.staff("Healthcare assistant", w - 2.6, -d / 2 + 3.0, "out");
R.put("wgcrashcart", 0.5, -d / 2 + 0.8, "out");
R.put("wgwheelchair", 0.6, -d / 2 + 2.2, "out");
R.put("wgivstand", 1.6, -d / 2 + 0.5, 0);
for (var j = 0; j < n; j++) {
R.spot(w - 2.3, -d / 2 + 1.6 + j * 2.9, "emergency");
}
});
wgRoom("resus", "Resuscitation", 8, function (R) {
var w = R.w, d = R.d;
[-1.6, 1.6].forEach(function (v) { R.put("hospitalbed", w - 1.3, v, "in"); R.put("wgvitals", w - 0.4, v - 0.95, "in"); R.put("wgivstand", w - 2.4, v - 0.85, 0); R.put("wgcurtain", w - 1.3, v + 1.3, "n"); });
R.put("wganaesthesia", w * 0.4, -d / 2 + 0.5, "n");
R.put("wgcrashcart", 2.0, -d / 2 + 0.5, "n");
R.staff("Resuscitation doctor", w - 2.4, 0, "out");
R.staff("Emergency nurse", w - 2.4, -2.6, "out");
R.spot(2.4, 0.6);
}, { secure: true });
wgRoom("xray", "X-ray", 7.5, function (R) {
var w = R.w, d = R.d;
R.put("wgxray", w - 2.2, -0.6, "n");
R.put("trw4", 2.6, -1.4, "in");
R.put("wgworkstation", 1.2, -2.4, "n");
R.staff("Radiographer", 1.3, -1.6, "s");
R.put("chair", w - 0.6, d / 2 - 1.2, "in");
R.spot(1.6, 0.6);
}, { secure: true });
wgRoom("ct", "CT scanner", 9, function (R) {
var w = R.w, d = R.d;
R.put("wgscanner", w - 2.6, 0.2, "n");
R.put("trw6", 3.2, -0.6, "in");
R.put("wgworkstation", 1.4, -1.8, "n");
R.put("wgworkstation", 1.4, 0.6, "n");
R.staff("Radiographer", 1.4, -1.0, "s");
R.put("wgivstand", w - 1.0, -2.6, 0);
R.spot(1.6, 2.0);
}, { secure: true });
wgRoom("pharmacy", "Pharmacy", 8, function (R) {
var w = R.w, d = R.d;
R.put("trcounter", 2.6, d / 2 - 3.2, "in");
R.put("trtill", 2.6, d / 2 - 5.6, "in");
R.staff("Pharmacist", 3.4, d / 2 - 3.2, "in");
R.staff("Pharmacy technician", w - 2.6, 0, "out");
for (var v = -d / 2 + 0.4; v < d / 2 - 1.4; v += 2.2)
R.put("wgmedshelf", w - 0.3, v + 1.0, "in");
R.wallS("wgmedshelf", 4.6);
R.put("wgworkstation", 4.6, 0.4, "s");
R.spot(1.2, d / 2 - 3.2);
}, { public: true });
wgRoom("ward", "Ward", 15, function (R) {
var w = R.w, d = R.d, n = Math.floor((d - 2.6) / 2.7);
for (var i = 0; i < n; i++) {
var v = -d / 2 + 1.5 + i * 2.7;
R.put("wgbay", w - 1.15, v, "in");
R.spot(w - 2.25, v + 0.2, "ward");
R.put("chair", w - 2.6, v - 0.8, "out");
}
if (w > 8) {
for (var j = 0; j < n - 1; j++) {
var v2 = -d / 2 + 1.5 + j * 2.7;
R.put("wgbay", 2.4, v2, "out");
R.spot(3.5, v2 + 0.2, "ward");
}
}
R.staff("Ward nurse", w * 0.55, 0.4, "out");
R.staff("Healthcare assistant", w * 0.55, -d / 2 + 2.2, "in");
R.put("wgcrashcart", 0.5, -d / 2 + 0.6, "out");
});
wgRoom("icu", "Intensive care", 13, function (R) {
var w = R.w, d = R.d, n = Math.floor((d - 3) / 3.1);
for (var i = 0; i < n; i++) {
var v = -d / 2 + 1.8 + i * 3.1;
R.put("wgbay", w - 1.15, v, "in");
R.put("wganaesthesia", w - 0.45, v + 1.25, "in");
}
R.put("wgnursedesk", 2.4, 0, "out");
R.staff("Intensive care nurse", 3.3, 0, "in");
R.staff("Intensive care doctor", w - 2.6, -d / 2 + 2.5, "out");
R.put("wgcrashcart", 0.5, -d / 2 + 0.6, "out");
R.spot(2.2, 2.2);
}, { secure: true });
wgRoom("theatre", "Operating theatre", 9.5, function (R) {
var w = R.w, d = R.d;
R.put("wgoptable", w * 0.58, -0.2, "n");
R.put("wganaesthesia", w * 0.58, -d / 2 + 0.5, "n");
R.put("wgvitals", w * 0.58 - 1.0, -d / 2 + 1.2, "n");
R.put("wgsteeltable", w * 0.58 + 1.5, 0, "n");
R.put("wgcrashcart", w - 0.45, d / 2 - 1.2, "in");
R.put("wgmedshelf", w - 0.3, -1.6, "in");
R.staff("Surgeon", w * 0.58 - 0.85, 0.1, "out");
R.staff("Anaesthetist", w * 0.58, -d / 2 + 1.25, "n");
R.staff("Scrub nurse", w * 0.58 + 0.9, 0.9, "in");
R.spot(2, 1.6);
}, { secure: true });
wgRoom("scrub", "Scrub room", 5, function (R) {
var w = R.w, d = R.d;
R.wallOut("wgscrubsink", 0);
R.wallS("wgshelving", 2.8);
R.put("trlockers", 3.2, d / 2 - 0.35, "s");
R.spot(1.6, 0);
}, { secure: true });
wgRoom("recovery", "Recovery", 10, function (R) {
var w = R.w, d = R.d, n = Math.floor((d - 2) / 2.8);
for (var i = 0; i < n; i++)
R.put("wgbay", w - 1.15, -d / 2 + 1.5 + i * 2.8, "in");
R.put("wgnursedesk", 2.4, -0.4, "out");
R.staff("Recovery nurse", 3.3, -0.4, "in");
R.spot(1.6, 1.6);
}, { secure: true });
wgRoom("lab", "Laboratory", 9, function (R) {
var w = R.w, d = R.d;
R.wallOut("wglabbench", -1.6);
R.wallOut("wglabbench", 1.4);
R.put("wglabbench", w * 0.45, -0.2, "n");
R.wallS("fridge", 2.4);
R.wallS("fridge", 3.3);
R.staff("Laboratory scientist", w - 1.45, -1.6, "out");
R.staff("Laboratory scientist", w * 0.45, -1.0, "n");
R.put("wgworkstation", 2.6, d / 2 - 2.8, "s");
R.spot(1.6, 0.6);
}, { secure: true });
wgRoom("consult", "Consulting room", 5.5, function (R) {
var w = R.w, d = R.d;
R.wallOut("wgworkstation", -0.8);
R.staff("Doctor", w - 1.6, -0.9, "out");
R.put("chair", w - 2.7, -0.6, "out");
R.put("wgexamcouch", 2.2, -d / 2 + 1.1, "out");
R.put("wgcurtain", 3.1, -d / 2 + 1.1, 0);
R.put("wgbasin", w - 1.1, d / 2 - 0.32, "s");
R.put("wgvitals", 1.2, -d / 2 + 0.35, "n");
R.spot(1.6, 0.8);
});
wgRoom("maternity", "Maternity ward", 13, function (R) {
var w = R.w, d = R.d, n = Math.floor((d - 2.4) / 2.9);
for (var i = 0; i < n; i++) {
var v = -d / 2 + 1.6 + i * 2.9;
R.put("wgbay", w - 1.15, v, "in");
R.put("crib", w - 2.5, v - 0.4, "in");
R.put("armchair", w - 2.6, v + 0.8, "out");
R.spot(w - 3.4, v + 0.3, "ward");
}
R.staff("Midwife", w * 0.4, 0, "out");
R.staff("Midwife", w * 0.4, -d / 2 + 2, "out");
R.put("wgvitals", 1.0, -d / 2 + 0.4, "n");
});
wgRoom("children", "Children's ward", 13, function (R) {
var w = R.w, d = R.d, n = Math.floor((d - 2.4) / 2.9);
for (var i = 0; i < n; i++) {
var v = -d / 2 + 1.6 + i * 2.9;
R.put("wgbay", w - 1.15, v, "in");
R.spot(w - 2.3, v + 0.3, "ward");
}
R.put("rug", w * 0.38, 0, 0);
R.put("toys", w * 0.38, 0.4, 0);
R.put("toys", w * 0.38 - 0.8, -0.6, 1);
R.put("bookshelf", w * 0.38, -d / 2 + 0.25, "n");
R.put("table", w * 0.38, -1.8, "n");
R.staff("Children's nurse", w * 0.45, 1.6, "out");
R.put("painting", 0.06, -d / 2 + 2, "out");
});
wgRoom("chapel", "Chapel", 8, function (R) {
var w = R.w, d = R.d;
R.put("altarinside", w - 0.8, -0.4, "in");
R.put("candles", w - 0.5, -1.8, 0);
R.put("candles", w - 0.5, 1.0, 0);
for (var u = w - 2.6; u > 1.6; u -= 1.5)
R.put("pew", u, -0.4, "out");
R.staff("Chaplain", w - 1.6, 0.9, "in");
R.put("plant", w - 0.5, d / 2 - 0.6, 0);
R.spot(1.4, 0);
}, { public: true });
wgRoom("cafeteria", "Cafeteria", 13, function (R) {
var w = R.w, d = R.d;
R.put("trcounter", w - 1.5, -d / 2 + 1.6, "n");
R.put("trtill", w - 3.8, -d / 2 + 1.6, "n");
R.put("wgcookline", w - 1.6, -d / 2 + 0.45, "n");
R.staff("Cafeteria cook", w - 1.5, -d / 2 + 0.95, "n");
R.staff("Cashier", w - 3.8, -d / 2 + 0.95, "n");
for (var v = -d / 2 + 4; v < d / 2 - 1.5; v += 2.6)
for (var u = 2.4; u < w - 1; u += 3) {
R.put("table", u, v, "out");
R.put("chair", u - 0.95, v, "out");
R.put("chair", u + 0.95, v, "in");
}
R.put("wgvending", 0.55, -d / 2 + 0.6, "out");
R.put("wgcoffeebar", w - 0.35, d / 2 - 2, "in");
R.spot(1.6, 0);
}, { public: true });
wgRoom("giftshop", "Gift shop", 6, function (R) {
var w = R.w, d = R.d;
R.put("trcounter", 2.4, -d / 2 + 1.0, "out");
R.put("trtill", 2.4, -d / 2 + 1.0, "out");
R.staff("Shop assistant", 2.4, -d / 2 + 0.35, "out");
R.wallOut("shelfgoods", -1.2);
R.wallOut("shelfgoods", 1.4);
R.put("flowerbucket", w - 2.4, d / 2 - 0.6, 0);
R.put("displaycase", w * 0.55, 0.6, "n");
R.spot(1.6, 1.0);
}, { public: true });
wgRoom("mortuary", "Mortuary", 8, function (R) {
var w = R.w, d = R.d;
R.wallOut("wgmorgue", -0.4);
R.put("wgsteeltable", w * 0.5, -0.4, "n");
R.put("wgscrubsink", w * 0.5, -d / 2 + 0.35, "n");
R.put("wgshelving", 2.2, -d / 2 + 0.45, "n");
R.staff("Mortuary technician", w * 0.5 + 0.8, 0.6, "in");
R.spot(1.6, 1.2);
}, { secure: true });
wgRoom("linen", "Linen and supplies", 5, function (R) {
var w = R.w, d = R.d;
R.wallOut("wgshelving", -1.1);
R.wallOut("wgshelving", 1.1);
R.wallS("wgshelving", 2.6);
R.put("wglaundry", 3, d / 2 - 0.4, "s");
R.spot(1.4, 0);
});
wgRoom("nursestation", "Nurses' station", 6, function (R) {
var w = R.w, d = R.d;
R.put("wgnursedesk", 2.4, -0.6, "out");
R.staff("Charge nurse", 3.3, -0.6, "in");
R.wallOut("filecabinet", -1.6);
R.wallOut("filecabinet", -0.8);
R.put("wgmedshelf", w - 0.3, 1.4, "in");
R.put("noticeboard", w - 0.06, 0.2, "in");
R.spot(1.2, 1.4);
}, { open: true });
wgRoom("dialysis", "Day treatment", 11, function (R) {
var w = R.w, d = R.d, n = Math.floor((d - 2) / 2.4);
for (var i = 0; i < n; i++) {
var v = -d / 2 + 1.4 + i * 2.4;
R.put("armchair", w - 1.1, v, "in");
R.put("wgivstand", w - 0.4, v - 0.6, 0);
R.put("wgvitals", w - 0.4, v + 0.6, "in");
}
R.staff("Treatment nurse", w * 0.4, 0, "out");
R.put("wgnursedesk", 2.2, -d / 2 + 1.6, "out");
R.spot(1.6, 1.6);
});
wgRoom("physio", "Physiotherapy", 10, function (R) {
var w = R.w, d = R.d;
R.wallOut("wgtreadmill", -2.4);
R.wallOut("wgtreadmill", -0.9);
R.put("wgexamcouch", w - 1.1, 1.6, "in");
R.put("wgexamcouch", w - 1.1, 3.4, "in");
R.put("rug", w * 0.45, 0, 0);
R.put("wallmirror", 0.06, -d / 2 + 2, "out");
R.staff("Physiotherapist", w * 0.45, 0.6, "out");
R.spot(1.8, 0);
});
wgRoom("dispatch", "Dispatch room", 7, function (R) {
var w = R.w, d = R.d;
R.put("wgcontrol", w - 1.4, -0.4, "in");
R.put("trwallmap", w - 0.06, -0.4, "in");
R.staff("@dispatch", w - 2.45, -0.4, "out");
R.put("trtimetable", w * 0.4, -d / 2 + 0.08, "n");
R.put("wgworkstation", 2.6, 1.6, "s");
R.put("wgwatercooler", 0.5, -d / 2 + 0.5, "out");
R.spot(1.6, 0);
});
wgRoom("armoury", "Armoury", 6, function (R) {
var w = R.w, d = R.d;
R.wallOut("weaponrack", -1.2);
R.wallOut("weaponrack", 0.6);
R.put("armourstand", w * 0.5, -d / 2 + 0.6, 0);
R.put("armourstand", w * 0.5 + 1.2, -d / 2 + 0.6, 0);
R.put("workbench", 2.6, -d / 2 + 0.45, "n");
R.put("trlockers", 3.2, d / 2 - 0.35, "s");
R.spot(1.6, 0);
}, { secure: true });
wgRoom("bunkroom", "Bunk room", 8, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.2; v < d / 2 - 1.4; v += 2.0) {
R.put("wgbunk", w - 1.1, v, "in");
}
for (var u = 2.4; u < w - 2.5; u += 1.3)
R.put("trlockers", u, -d / 2 + 0.35, "n");
R.put("table", w * 0.4, 0.6, "n");
R.put("chair", w * 0.4 - 0.9, 0.6, "out");
R.spot(1.6, 0.6);
});
wgRoom("briefing", "Briefing room", 8, function (R) {
var w = R.w, d = R.d;
R.put("trwallmap", w - 0.06, 0, "in");
R.put("lectern", w - 1.2, 1.6, "out");
for (var u = w - 2.6; u > 1.8; u -= 1.3)
for (var v = -d / 2 + 1.4; v < d / 2 - 1.2; v += 2.4)
R.put("benchin", u, v, "out");
R.spot(1.4, 0);
});
wgRoom("cells", "Holding cells", 8, function (R) {
var w = R.w, d = R.d;
[-d / 4, d / 4].forEach(function (v) { R.put("wgbunk", w - 0.6, v, "in"); R.put("cellbars", w - 2.2, v, "out"); });
R.put("trw" + Math.max(2, Math.round((w - 2.2) * 2)), w - 1.1, 0, "n");
R.put("trdutydesk", 1.6, -d / 2 + 1.2, "out");
R.staff("@guard", 0.7, -d / 2 + 1.2, "out");
R.spot(1.2, 1.6);
}, { secure: true });
wgRoom("interview", "Interview room", 5, function (R) {
var w = R.w, d = R.d;
R.put("table", w * 0.6, 0, "n");
R.put("chair", w * 0.6 - 0.95, 0, "out");
R.put("chair", w * 0.6 + 0.95, 0, "in");
R.put("chair", w * 0.6 + 0.95, 0.8, "in");
R.put("wallmirror", 0.06, -0.8, "out");
R.spot(1.4, 1.2);
}, { secure: true });
wgRoom("vault", "Strong room", 7, function (R) {
var w = R.w, d = R.d;
R.wallOut("vaultround", 0);
if (FURN.goldpile) {
R.put("goldpile", w - 2.4, -d / 2 + 1.0, 0);
R.put("goldpile", w - 2.4, d / 2 - 1.6, 0);
}
R.put("treasurechest", 2.6, -d / 2 + 0.6, "n");
R.put("wgshelving", 3.4, d / 2 - 0.4, "s");
R.staff("@vault", 1.6, -d / 2 + 1.6, "out");
R.spot(1.4, 1.2);
}, { secure: true });
wgRoom("countingroom", "Counting room", 8, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.4; v < d / 2 - 2.4; v += 2.3) {
R.put("wgworkstation", w - 1.0, v, "in");
R.put("trassay", w - 3.4, v, "out");
}
R.staff("@clerk", w - 1.85, -d / 2 + 1.3, "out");
R.wallS("filecabinet", 2.2);
R.spot(1.6, 0);
}, { secure: true });
wgRoom("classroom", "Classroom", 9, function (R) {
var w = R.w, d = R.d;
R.put("blackboard", w - 0.12, 0, "in");
R.put("desk", w - 1.6, 0, "out");
R.staff("Teacher", w - 1.0, 0.9, "in");
for (var u = w - 3.4; u > 1.6; u -= 1.7)
for (var v = -d / 2 + 1.4; v < d / 2 - 1.6; v += 1.9)
R.put("schooldesk", u, v, "in");
R.put("bookshelf", w * 0.5, -d / 2 + 0.25, "n");
R.put("clock", 0.2, -d / 2 + 1.0, "out");
R.spot(1.4, 0);
}, { public: true });
wgRoom("library", "Library", 10, function (R) {
var w = R.w, d = R.d;
for (var u = w - 0.3; u > 2.6; u -= 2.3) {
R.put("bookshelf", u, -d / 2 + 0.25, "n");
R.put("bookshelf", u, d / 2 - 0.25, "s");
}
R.put("table", w * 0.5, 0, "n");
R.put("chair", w * 0.5 - 0.9, 0, "out");
R.put("chair", w * 0.5 + 0.9, 0, "in");
R.put("lamp", w * 0.5, 0.5, 0);
R.put("wgreception", 2.0, -1.6, "out");
R.staff("Librarian", 2.0, -2.4, "out");
R.spot(1.4, 1.4);
}, { public: true });
wgRoom("gym", "Gymnasium", 12, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.4; v < -1; v += 1.3)
R.put("wgtreadmill", w - 1.2, v, "in");
R.put("rug", w * 0.5, 2, 0);
R.put("rug", w * 0.5, 4, 0);
R.put("wallmirror", w - 0.06, 3, "in");
R.put("benchin", 1.6, d / 2 - 3.2, "out");
R.staff("@coach", w * 0.5, 1.0, "out");
R.spot(1.6, 0);
});
wgRoom("infirmary", "Sick bay", 6, function (R) {
var w = R.w, d = R.d;
R.put("wgbay", w - 1.15, -1.2, "in");
R.put("wgworkstation", 2.4, -d / 2 + 0.6, "n");
R.put("wgmedshelf", w - 0.3, 1.6, "in");
R.staff("School nurse", 2.4, -d / 2 + 1.3, "s");
R.spot(1.6, 0.8);
});
wgRoom("guestroom", "Guest room", 6.5, function (R) {
var w = R.w, d = R.d;
R.put("bed", w - 1.2, -0.6, "in");
R.put("wgbedside", w - 0.35, -1.9, "in");
R.put("wgbedside", w - 0.35, 0.7, "in");
R.put("wardrobe", 2.6, -d / 2 + 0.35, "n");
R.put("armchair", 2.4, 0.8, "out");
R.put("desk", w - 2.6, -d / 2 + 0.4, "n");
R.put("wgtv", 4.2, -d / 2 + 0.3, "n");
R.put("painting", w - 0.06, -0.6, "in");
R.put("rug", w - 2.8, -0.6, 0);
R.spot(2.6, 0);
}, { public: true });
wgRoom("suite", "Suite", 10, function (R) {
var w = R.w, d = R.d;
R.put("bed", w - 1.2, -d / 2 + 1.6, "in");
R.put("wgbedside", w - 0.35, -d / 2 + 0.3, "in");
R.put("wardrobe", 3, -d / 2 + 0.35, "n");
R.put("sofa", w - 0.6, 1.6, "in");
R.put("armchair", w - 2.6, 0.6, "n");
R.put("table", w - 2.2, 1.6, "n");
R.put("wgtv", 2.4, 1.6, "out");
R.put("rug", w - 2.0, 1.6, 0);
R.put("bathtub", 1.6, -d / 2 + 1.6, "out");
R.put("plant", w - 0.5, d / 2 - 0.6, 0);
R.put("chandelier", w * 0.5, 0, 0);
R.spot(2.4, 0.4);
}, { public: true });
wgRoom("functionroom", "Function room", 12, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 2; v < d / 2 - 2; v += 3)
for (var u = 2.6; u < w - 1.4; u += 3.2) {
R.put("table", u, v, "n");
R.put("chair", u - 0.95, v, "out");
R.put("chair", u + 0.95, v, "in");
R.put("chair", u, v - 0.75, "n");
R.put("chair", u, v + 0.75, "s");
}
R.put("piano", w - 1.0, d / 2 - 1.2, "in");
R.put("chandelier", w * 0.5, 0, 0);
R.spot(1.4, 0);
}, { public: true });
wgRoom("gallery", "Gallery", 10, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.6; v < d / 2 - 1; v += 2.6)
R.put("painting", w - 0.06, v, "in");
R.put("painting", w * 0.5, -d / 2 + 0.06, "n");
R.put("displaycase", w * 0.55, -1.4, "n");
R.put("displaycase", w * 0.55, 1.4, "n");
R.put("trplinth", w * 0.55, 0, "n");
R.put("benchin", 2.4, 0, "out");
R.staff("Gallery attendant", 1.4, -d / 2 + 1.2, "out");
R.spot(1.6, 2);
}, { public: true });
wgRoom("conservation", "Conservation workshop", 7, function (R) {
var w = R.w, d = R.d;
R.wallOut("workbench", -1.2);
R.wallOut("wglabbench", 1.4);
R.put("treasel", 3, -d / 2 + 0.6, "n");
R.put("wgshelving", 2.4, d / 2 - 0.4, "s");
R.staff("Conservator", w - 1.5, -1.2, "out");
R.spot(1.6, 0);
}, { secure: true });
wgRoom("stacks", "Stacks", 10, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1; v < d / 2 - 1.5; v += 1.8)
R.put("wgshelving", w * 0.55, v, "n");
R.put("trplanchest", w - 0.6, -d / 2 + 1, "in");
R.put("trplanchest", w - 0.6, 1, "in");
R.staff("@archivist", 1.6, 0, "out");
R.spot(1.4, 1.2);
}, { secure: true });
wgRoom("reading", "Reading room", 9, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.6; v < d / 2 - 2; v += 2.6) {
R.put("table", w - 2.2, v, "n");
R.put("chair", w - 3.1, v, "out");
R.put("chair", w - 1.3, v, "in");
R.put("lamp", w - 2.2, v + 0.3, 0);
}
R.put("bookshelf", w * 0.3, -d / 2 + 0.25, "n");
R.put("lectern", 1.6, -d / 2 + 1.2, "out");
R.spot(1.4, 0.8);
}, { public: true });
wgRoom("drafting", "Drawing office", 9, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.6; v < d / 2 - 2.4; v += 2.4) {
R.put("trdraft", w - 1.0, v, "in");
}
R.put("maptable", w * 0.4, -0.4, "n");
R.put("trplanchest", 2.2, -d / 2 + 0.6, "n");
R.put("trwallmap", 0.06, -d / 2 + 2.2, "out");
R.staff("@drafter", w - 1.9, -d / 2 + 1.6, "out");
R.staff("@drafter", w * 0.4, 0.6, "s");
R.spot(1.4, 0.4);
});
wgRoom("workroom", "Workroom", 8, function (R) {
var w = R.w, d = R.d, o = R.opt || {}, a = o.bench || ["workbench"], m = o.mid || null;
var v = -d / 2 + 1.0;
a.forEach(function (k, i) { var dd = wgDepth(k); R.put(k, w - dd / 2 - 0.15, v + wgWide(k) / 2, "in"); if (i < 2)
R.staff(o.who || "@trade", w - dd - 0.75, v + wgWide(k) / 2, "out"); v += wgWide(k) + 0.6; });
if (m)
m.forEach(function (k, i) { R.put(k, w * 0.42, -d / 2 + 1.4 + i * 2.6, "n"); });
(o.wall || ["trtoolwall"]).forEach(function (k, i) { R.put(k, 2.4 + i * 2.6, -d / 2 + wgDepth(k) / 2 + 0.1, "n"); });
R.put("wgshelving", w - 1.4, d / 2 - 0.4, "s");
R.spot(1.6, 0);
});
wgRoom("coldroom", "Cold room", 6, function (R) {
var w = R.w, d = R.d, o = R.opt || {};
R.put("wgcolddoor", 0.4, 0.2, "out");
(o.hang || ["wgshelving", "wgshelving"]).forEach(function (k, i) { R.put(k, w - wgDepth(k) / 2 - 0.15, -d / 2 + 1.2 + i * 2.3, "in"); });
R.put("wgshelving", w * 0.5, -d / 2 + 0.45, "n");
R.spot(1.6, -1.6);
}, { secure: true });
wgRoom("cellar", "Cellar", 9, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 0.9; v < d / 2 - 1; v += 1.3) {
R.put("cask", w - 0.6, v, "in");
}
for (var u = 2.4; u < w - 2; u += 1.4)
R.put("barrel", u, -d / 2 + 0.6, 0);
R.put("wgshelving", w * 0.5, 0.4, "n");
R.put("trcrates", 2.6, d / 2 - 1, "s");
R.spot(1.4, 0);
}, { secure: true });
wgRoom("bakehouse", "Bakehouse", 9, function (R) {
var w = R.w, d = R.d;
R.wallOut("oven", -2.2);
R.wallOut("oven", -0.6);
R.wallOut("trbreadrack", 1.4);
R.put("wgsteeltable", w * 0.45, -0.6, "n");
R.put("wgsteeltable", w * 0.45, 1.8, "n");
R.put("trsacks", 2.4, -d / 2 + 0.6, "n");
R.put("trsacks", 3.8, -d / 2 + 0.6, "n");
R.wallS("fridge", 5.3);
R.staff("Baker", w - 1.6, -1.4, "out");
R.staff("Baker", w * 0.45 + 0.7, 0.4, "in");
R.spot(1.6, 1.6);
}, { secure: true });
wgRoom("cutting", "Cutting room", 8, function (R) {
var w = R.w, d = R.d;
R.wallOut("trmeathooks", -1.4);
R.put("butcherblock", w * 0.5, -0.8, "n");
R.put("butcherblock", w * 0.5, 1.4, "n");
R.wallS("wgscrubsink", 3.4);
R.staff("Butcher", w * 0.5 + 0.9, -0.8, "in");
R.spot(1.6, 1.4);
}, { secure: true });
wgRoom("pressroom", "Press room", 10, function (R) {
var w = R.w, d = R.d;
R.wallOut("printpress", -2);
R.wallOut("printpress", 1.4);
R.put("trtypecase", 2.4, -d / 2 + 0.4, "n");
R.put("trtypecase", 4.4, -d / 2 + 0.4, "n");
R.put("trpaper", w * 0.45, 0, "n");
R.staff("Printer", w - 2.4, -2, "out");
R.staff("Compositor", 3.2, -d / 2 + 1.2, "s");
R.spot(1.6, 1.6);
}, { secure: true });
wgRoom("newsroom", "Newsroom", 10, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.6; v < d / 2 - 2.4; v += 2.4) {
R.put("wgworkstation", w - 1.0, v, "in");
R.put("wgworkstation", w - 4.2, v, "out");
}
R.staff("Reporter", w - 1.85, -d / 2 + 1.5, "out");
R.staff("Editor", w - 3.35, -d / 2 + 1.5, "in");
R.put("wgwhiteboard", w * 0.5, -d / 2 + 0.08, "n");
R.put("wgcopier", 1.0, -d / 2 + 0.5, "out");
R.spot(1.6, 0.4);
});
wgRoom("sorting", "Sorting office", 11, function (R) {
var w = R.w, d = R.d;
R.wallOut("trsort", -2.4);
R.wallOut("trsort", 0.2);
R.put("wgconveyor", w * 0.45, -1.0, "n");
R.put("wgconveyor", w * 0.45, 1.6, "n");
R.put("trsacks", 2.4, -d / 2 + 0.6, "n");
R.staff("Sorter", w - 1.0, -1.1, "out");
R.staff("Sorter", w * 0.45, 0.3, "n");
R.put("trcrates", 2.4, d / 2 - 1.2, "s");
R.spot(1.6, 0);
}, { secure: true });
wgRoom("forge", "Forge", 9, function (R) {
var w = R.w, d = R.d;
R.wallOut("forge", -1.6);
R.put("anvil", w - 2.6, -1.6, "in");
R.put("trquench", w - 2.6, 0.2, "in");
R.wallOut("trtoolwall", 1.6);
R.put("wgshelving", 2.4, -d / 2 + 0.45, "n");
R.staff("Smith", w - 3.3, -1.6, "out");
R.spot(1.6, 1.4);
}, { secure: true });
wgRoom("glasshall", "Glass hall", 11, function (R) {
var w = R.w, d = R.d;
R.wallOut("trglassfurnace", -2.4);
R.put("trglassbench", w - 3.0, 0.8, "in");
R.put("trglassbench", w * 0.4, -1.6, "n");
R.wallS("wgshelving", 2.6);
R.staff("Glassblower", w - 3.8, 0.8, "out");
R.staff("Glassblower", w * 0.4, -0.8, "s");
R.spot(1.6, 2);
}, { secure: true });
wgRoom("kiln", "Kiln room", 7, function (R) {
var w = R.w, d = R.d;
R.wallOut("oven", -1.4);
R.wallOut("oven", 0.4);
R.put("potterswheel", w * 0.45, -1.2, "n");
R.put("wgshelving", 2.4, -d / 2 + 0.45, "n");
R.put("wgshelving", 2.4, d / 2 - 0.45, "s");
R.staff("Potter", w * 0.45, -0.5, "s");
R.spot(1.6, 0.4);
}, { secure: true });
wgRoom("salon", "Salon", 7, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.2; v < d / 2 - 1.2; v += 1.9) {
R.put("barberchair", w - 1.1, v, "out");
R.put("wallmirror", w - 0.06, v, "in");
}
R.put("wgbasin", 2.4, -d / 2 + 0.3, "n");
R.put("wgchairrow", 1.0, 0.4, "out");
R.staff("@trade", w - 1.9, -d / 2 + 1.6, "out");
R.spot(1.6, -0.8);
}, { public: true });
wgRoom("restroom1", "Restroom", 3.5, function (R) {
var w = R.w, d = R.d;
R.put("wgtoilet", w - 0.85, -0.4, "in");
R.wallS("wgbasin", Math.max(2.2, w - 2.8));
R.spot(1.4, 0);
}, { public: true });
wgRoom("chapelofrest", "Chapel of rest", 8, function (R) {
var w = R.w, d = R.d;
R.put("coffin", w - 1.6, 0, "in");
R.put("candles", w - 0.5, -1.4, 0);
R.put("candles", w - 0.5, 1.4, 0);
R.put("flowerbucket", w - 1.6, -1.8, 0);
for (var u = w - 3.2; u > 1.6; u -= 1.5)
R.put("pew", u, 0, "out");
R.put("plant", w - 0.5, d / 2 - 0.6, 0);
R.spot(1.4, 0);
}, { public: true });
wgRoom("embalming", "Preparation room", 7, function (R) {
var w = R.w, d = R.d;
R.put("wgsteeltable", w * 0.55, 0, "n");
R.wallOut("wgmorgue", -1.2);
R.wallS("wgscrubsink", 2.6);
R.put("wgshelving", 2.4, d / 2 - 0.4, "s");
R.staff("Undertaker", w * 0.55 - 0.9, 0, "out");
R.spot(1.6, 1.6);
}, { secure: true });
wgRoom("animals", "Animal rooms", 11, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.0; v < d / 2 - 1.2; v += 2.2)
R.put("trcages", w - 0.7, v, "in");
R.put("trtrough", w * 0.45, -1.4, "n");
R.put("trhay", w * 0.45, 1.4, 0);
R.staff("@keeper", w * 0.45, 0, "out");
R.spot(1.6, 0);
}, { secure: true });
wgRoom("vet", "Treatment room", 7, function (R) {
var w = R.w, d = R.d;
R.put("wgsteeltable", w * 0.55, 0, "n");
R.put("wgmedshelf", w - 0.3, -1.6, "in");
R.wallS("wgbasin", 2.6);
R.put("trcages", w - 0.7, 1.8, "in");
R.staff("Animal doctor", w * 0.55 - 0.9, 0, "out");
R.spot(1.6, 1.6);
}, { secure: true });
wgRoom("feedstore", "Feed store", 6, function (R) {
var w = R.w, d = R.d;
R.wallOut("trsacks", -1.6);
R.wallOut("trsacks", 0);
R.wallOut("trhay", 1.6);
R.put("barrel", 2.4, -d / 2 + 0.6, 0);
R.put("barrel", 3.4, -d / 2 + 0.6, 0);
R.spot(1.4, 0);
});
wgRoom("tack", "Tack room", 6, function (R) {
var w = R.w, d = R.d;
R.wallOut("trsaddles", -1.4);
R.wallOut("trsaddles", 0.8);
R.wallS("trtoolwall", 3);
R.put("benchin", w * 0.45, 0.6, "n");
R.staff("@trade", w * 0.45, -0.6, "out");
R.spot(1.4, 0);
});
wgRoom("milking", "Milking parlour", 11, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.2; v < d / 2 - 1.2; v += 2.2) {
R.put("trstall", w - 1.2, v, "in");
}
R.put("trchurns", w * 0.4, -d / 2 + 0.6, "n");
R.put("trchurns", w * 0.4 + 1.4, -d / 2 + 0.6, "n");
R.put("wgscrubsink", 2.6, d / 2 - 0.4, "s");
R.staff("@trade", w * 0.4, 0, "out");
R.spot(1.6, 0);
}, { secure: true });
wgRoom("woolstore", "Wool store", 7, function (R) {
var w = R.w, d = R.d;
R.wallOut("trsacks", -1.4);
R.wallOut("trsacks", 0.2);
R.put("weighscale", w * 0.45, -d / 2 + 0.6, 0);
R.put("loom", w * 0.45, 1.2, "n");
R.put("trcrates", 2.4, -d / 2 + 0.7, "n");
R.spot(1.6, 0);
});
wgRoom("lamproom", "Lamp room", 6, function (R) {
var w = R.w, d = R.d;
R.wallOut("trtoolwall", -1.2);
R.wallOut("wgshelving", 1.0);
R.put("workbench", w * 0.45, -d / 2 + 0.5, "n");
R.put("trlockers", 2.4, d / 2 - 0.35, "s");
R.spot(1.6, 0);
});
wgRoom("trophy", "Trophy room", 8, function (R) {
var w = R.w, d = R.d;
R.put("pelt", w * 0.5, 0, 0);
R.put("fireplace", w - 0.35, 0, "in");
R.put("armchair", w - 2.2, -1.4, "n");
R.put("armchair", w - 2.2, 1.4, "s");
R.put("displaycase", 2.6, -d / 2 + 0.5, "n");
R.put("weaponrack", 4.6, -d / 2 + 0.3, "n");
R.spot(1.6, 0);
});
wgRoom("netloft", "Net loft", 8, function (R) {
var w = R.w, d = R.d;
R.wallOut("trnets", -1.4);
R.wallOut("trnets", 1.4);
R.put("trfishtable", w * 0.45, 0, "n");
R.put("trcrates", 2.4, -d / 2 + 0.7, "n");
R.put("barrel", 2.4, d / 2 - 0.8, 0);
R.staff("@trade", w * 0.45 - 0.9, 0, "out");
R.spot(1.4, 0);
});
wgRoom("warehouse", "Warehouse floor", 14, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 0.7; v < d / 2 - 1.6; v += 3.1)
R.put("wgpallets", w - 0.65, v + 1.4, "in");
for (var v2 = -d / 2 + 0.7; v2 < d / 2 - 4; v2 += 3.1)
R.put("wgpallets", w * 0.4, v2 + 1.4, "out");
R.put("wgforklift", 2.2, d / 2 - 2.4, "s");
R.staff("@trade", 2.4, -d / 2 + 1.0, "out");
R.spot(1.4, 0);
}, { secure: true });
wgRoom("loading", "Loading bay", 8, function (R) {
var w = R.w, d = R.d;
R.put("wgconveyor", w * 0.5, -1.6, "n");
R.put("trcrates", w - 1.2, 0.8, "in");
R.put("wgforklift", w * 0.5, 1.6, "in");
R.put("wgworkstation", 1.4, -d / 2 + 0.6, "n");
R.staff("@trade", 1.4, -d / 2 + 1.4, "s");
R.spot(1.4, 1.2);
});
wgRoom("controlroom", "Control room", 8, function (R) {
var w = R.w, d = R.d;
R.wallOut("wgcontrol", -0.4);
R.put("wgcctv", w - 0.06, 2.4, "in");
R.put("wgcontrol", w * 0.45, -d / 2 + 0.6, "n");
R.staff("@control", w - 2.2, -0.4, "out");
R.staff("@control", w * 0.45, -d / 2 + 1.5, "s");
R.put("wgwhiteboard", 0.06, -d / 2 + 2.2, "out");
R.spot(1.6, 1.2);
}, { secure: true });
wgRoom("garage", "Workshop bay", 11, function (R) {
var w = R.w, d = R.d;
if (FURN.tycarlift)
R.put("tycarlift", w - 2.4, -0.6, "in");
else
R.put("trwheelstand", w - 2.4, -0.6, "in");
R.put("tytoolchest", w - 0.5, d / 2 - 1.6, "in");
R.wallS("trtoolwall", 2.6);
R.put("tytyres", 2.2, d / 2 - 0.8, "s");
R.put("workbench", w * 0.45, -d / 2 + 0.5, "n");
R.staff("@trade", w - 3.8, 0.2, "in");
R.spot(1.6, 1.6);
}, { secure: true });
wgRoom("keeperflat", "Keeper's quarters", 9, function (R) {
var w = R.w, d = R.d;
R.put("bed", w - 1.2, -d / 2 + 1.4, "in");
R.put("wardrobe", 2.6, -d / 2 + 0.35, "n");
R.put("fireplace", w - 0.35, 1.4, "in");
R.put("armchair", w - 2.2, 1.4, "out");
R.put("table", 2.6, 1.6, "n");
R.put("chair", 1.7, 1.6, "out");
R.put("stove", w * 0.5, d / 2 - 0.4, "s");
R.put("bookshelf", 4, d / 2 - 0.25, "s");
R.spot(1.6, 0);
});
wgRoom("farmkitchen", "Farm kitchen", 9, function (R) {
var w = R.w, d = R.d;
R.wallOut("stove", -1.4);
R.wallOut("sink", 0);
R.wallOut("fridge", 1.2);
R.put("longtable", w * 0.45, 0, "out");
R.put("benchin", w * 0.45 - 1.0, 0, "out");
R.put("benchin", w * 0.45 + 1.0, 0, "in");
R.put("fireplace", w * 0.4, -d / 2 + 0.35, "n");
R.put("wardrobe", 2.4, d / 2 - 0.35, "s");
R.staff("@trade", w - 1.4, -0.5, "out");
R.spot(1.6, 0);
});
wgRoom("mudroom", "Boot room", 4.5, function (R) {
var w = R.w, d = R.d;
R.wallOut("trtoolwall", 0);
R.put("benchin", w * 0.5, -d / 2 + 0.4, "n");
R.put("trlockers", 2.4, d / 2 - 0.35, "s");
R.spot(1.4, 0);
});
wgRoom("dormitory", "Dormitory", 10, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.2; v < d / 2 - 1.2; v += 1.8) {
R.put("bed", w - 1.2, v, "in");
}
for (var u = 2.4; u < w - 3; u += 1.4)
R.put("footchest", u, -d / 2 + 0.4, "n");
R.put("wardrobe", 2.6, d / 2 - 0.35, "s");
R.spot(1.6, 0);
});
wgRoom("examroom", "Examination room", 7, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.4; v < d / 2 - 1.6; v += 1.9)
for (var u = w - 1.0; u > 2.2; u -= 1.9)
R.put("schooldesk", u, v, "in");
R.put("desk", 1.6, -d / 2 + 1.0, "out");
R.staff("Examiner", 0.9, -d / 2 + 1.0, "out");
R.put("clock", 0.2, 0.6, "out");
R.spot(1.2, 1.6);
});
wgRoom("bar", "Bar", 9, function (R) {
var w = R.w, d = R.d;
R.wallOut("cask", -2.2);
R.wallOut("cask", -1.0);
R.put("trcounter", w - 2.2, 0.6, "in");
R.put("trcounter", w - 2.2, -1.8, "in");
R.staff("@bar", w - 1.4, -0.6, "out");
for (var v = -d / 2 + 1.4; v < d / 2 - 1.6; v += 2.6) {
R.put("table", 2.6, v, "n");
R.put("chair", 1.7, v, "out");
R.put("chair", 3.5, v, "in");
}
R.put("fireplace", w * 0.5, -d / 2 + 0.35, "n");
R.spot(1.4, 0);
}, { public: true });
wgRoom("treasurydesk", "Exchange hall", 9, function (R) {
var w = R.w, d = R.d;
R.put("counterbank", w - 1.8, 0, "in");
R.staff("@clerk", w - 1.0, -1.2, "out");
R.staff("@clerk", w - 1.0, 1.2, "out");
R.put("wgchairrow", 1.0, -1.6, "out");
R.put("plant", 0.5, d / 2 - 3, 0);
R.spot(1.6, 0);
}, { public: true });
