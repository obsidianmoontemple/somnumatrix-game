/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var BANK_KEY = "The Bank of Somnucor";
var BANK_JOBS = [];
for (var bkj = 3600; bkj <= 3619; bkj++)
BANK_JOBS.push(bkj);
if (typeof cityWorkplace === "function")
cityWorkplace({ key: BANK_KEY, ring: "civic", arch: "bank", jobs: BANK_JOBS, fit: [],
note: "The city's own bank: tellers, personal bankers, loans and mortgages, the safe-deposit vault, and the head office upstairs." });
function bankTag() {
if (typeof store === "undefined" || !store.objects)
return;
if (!store.workplaceAt)
store.workplaceAt = {};
for (var i = 0; i < store.objects.length; i++) {
var o = store.objects[i];
if (!o.city || o.label !== BANK_KEY || o.archetype !== "bank")
continue;
o.workplace = BANK_KEY;
store.workplaceAt[BANK_KEY] = { x: o.x, z: o.z, id: o.id };
return o;
}
return null;
}
(function () {
if (typeof buildSomnucorCity === "function") {
var bc = buildSomnucorCity;
buildSomnucorCity = function () { var r = bc.apply(this, arguments); try {
bankTag();
}
catch (e) {
if (window.console)
console.warn("bank:", e);
} return r; };
}
try {
bankTag();
}
catch (e) { }
})();
(function () {
if (typeof FURN !== "object" || !FURN || typeof trB !== "function")
return;
function piece(k, w, d, solid, fn) {
FURN[k] = function () { var g = new THREE.Group(); fn(g); return (typeof trDone === "function") ? trDone(g) : g; };
if (typeof TR_BOX !== "undefined")
TR_BOX[k] = [w, d];
if (solid && typeof SOLIDFURN !== "undefined")
SOLIDFURN[k] = 1;
}
var steel = function () { return trM(0x9AA0A6, null, "shine"); }, dark = function () { return trM(0x3A4048, null, "shine"); };
var BOX_TEX = null;
function boxTex() {
if (BOX_TEX)
return BOX_TEX;
var c = document.createElement("canvas");
c.width = 256;
c.height = 256;
var x = c.getContext("2d");
x.fillStyle = "#8E949A";
x.fillRect(0, 0, 256, 256);
for (var r = 0; r < 8; r++)
for (var q = 0; q < 4; q++) {
var X = q * 64, Y = r * 32;
x.fillStyle = (r + q) % 2 ? "#A4AAB0" : "#9AA0A6";
x.fillRect(X + 2, Y + 2, 60, 28);
x.fillStyle = "#5A6068";
x.fillRect(X + 2, Y + 29, 60, 1);
x.fillRect(X + 61, Y + 2, 1, 28);
x.fillStyle = "#C9A040";
x.beginPath();
x.arc(X + 44, Y + 16, 3, 0, 7);
x.arc(X + 52, Y + 16, 3, 0, 7);
x.fill();
x.fillStyle = "#2A2E34";
x.font = "10px sans-serif";
x.fillText(String(100 + r * 4 + q), X + 8, Y + 19);
}
BOX_TEX = new THREE.CanvasTexture(c);
return BOX_TEX;
}
piece("bkboxwall", 2.0, 0.5, true, function (g) {
trB(g, 2.0, 2.3, 0.5, steel(), 0, 1.15, 0);
var face = new THREE.Mesh(new THREE.PlaneGeometry(1.94, 2.24), new THREE.MeshLambertMaterial({ map: boxTex() }));
face.position.set(0, 1.15, 0.252);
g.add(face);
});
piece("bkbooth", 1.4, 0.9, true, function (g) {
var w = trM(0x6A4A30, "wood");
trB(g, 1.3, 0.05, 0.7, w, 0, 0.76, 0);
trB(g, 1.2, 0.72, 0.05, w, 0, 0.38, -0.3);
trB(g, 0.05, 1.9, 0.9, trM(0x5A6A7A), -0.68, 0.95, 0);
trB(g, 0.05, 1.9, 0.9, trM(0x5A6A7A), 0.68, 0.95, 0);
trB(g, 0.5, 0.14, 0.32, steel(), 0.1, 0.86, 0.05);
});
piece("bkatm", 1.0, 0.5, true, function (g) {
trB(g, 1.0, 2.2, 0.4, trM(0x2E3A4A, null, "shine"), 0, 1.1, 0);
trB(g, 0.62, 0.44, 0.02, trM(0x2A6A9A, null, "glow"), 0, 1.45, 0.205);
trB(g, 0.5, 0.06, 0.16, dark(), 0, 1.08, 0.26);
trB(g, 0.34, 0.03, 0.04, trM(0x101418), 0, 1.22, 0.21);
trB(g, 0.8, 0.12, 0.06, trM(0xC9A040, null, "shine"), 0, 1.95, 0.22);
});
piece("bkqueue", 2.4, 0.3, false, function (g) {
var b = TR_BRASS(), rope = trM(0x8A1E22);
[-1.2, 0, 1.2].forEach(function (x) { trC(g, 0.03, 0.03, 0.95, 8, b, x, 0.475, 0); trC(g, 0.16, 0.18, 0.04, 14, b, x, 0.02, 0); trS(g, 0.05, b, x, 0.98, 0); });
trB(g, 1.2, 0.04, 0.04, rope, -0.6, 0.86, 0);
trB(g, 1.2, 0.04, 0.04, rope, 0.6, 0.86, 0);
});
piece("bkrates", 1.6, 0.1, false, function (g) {
var c = document.createElement("canvas");
c.width = 256;
c.height = 192;
var x = c.getContext("2d");
x.fillStyle = "#1E2A3A";
x.fillRect(0, 0, 256, 192);
x.fillStyle = "#E8D8A8";
x.font = "bold 20px Georgia,serif";
x.fillText("Bank of Somnucor", 22, 32);
x.font = "15px sans-serif";
x.fillStyle = "#DDE4EC";
["Savings: interest on what you hold", "Loans: against wages earned", "Mortgages: ask at the desk", "Safe deposit: ask a banker", "Cash machines: open all hours"].forEach(function (t, i) { x.fillText(t, 16, 66 + i * 25); });
trB(g, 1.6, 1.2, 0.06, trM(0x5A3A22, "wood"), 0, 1.7, 0);
var m = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.1), new THREE.MeshLambertMaterial({ map: new THREE.CanvasTexture(c) }));
m.position.set(0, 1.7, 0.035);
g.add(m);
});
})();
if (typeof wgRoom === "function") {
wgRoom("safedeposit", "Safe-deposit vault", 8, function (R) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.1; v < d / 2 - 1.6; v += 2.05)
R.wallOut("bkboxwall", v);
for (var u = 2.6; u < w - 1.8; u += 2.05)
R.wallS("bkboxwall", u);
R.put("bkbooth", 2.8, d / 2 - 1.4, "s");
R.put("table", w * 0.55, 0.2, "n");
R.staff("Vault keeper", 1.6, -d / 2 + 1.4, "out");
R.spot(1.4, 1.0);
}, { secure: true });
wgRoom("advisor", "Personal banking", 6, function (R) {
var w = R.w, d = R.d, who = (R.opt && R.opt.who) || "Personal banker";
var u = Math.min(w - 2.4, Math.max(3.4, w * 0.55));
R.put("desk", u, 0, "in");
R.put("sg_kf_computerscreen", u + 0.15, -0.4, "in");
R.put("chair", u + 0.75, 0, "in");
R.staff(who, u + 0.85, 0, "in");
R.put("chair", u - 1.0, -0.5, "out");
R.put("chair", u - 1.0, 0.5, "out");
R.wallOut("filecabinet", -1.6);
R.wallOut("filecabinet", -0.9);
R.wallOut("bookshelf", 1.2);
R.put("plant", w - 0.5, d / 2 - 0.55, 0);
R.put("painting", u, -d / 2 + 0.06, "n");
R.put("sofa", 1.4, -d / 2 + 1.6, "n");
R.spot(w * 0.45, 0.6);
}, { public: true });
wgRoom("boardroom", "Boardroom", 10, function (R) {
var w = R.w, d = R.d;
var um = Math.max(3.4, w * 0.5);
R.put("longtable", um, -2.2, "out");
R.put("longtable", um, 2.2, "out");
R.put("chair", um, -d / 2 + 1.0, "n");
R.put("wallscreen", um, -d / 2 + 0.08, "n");
R.put("painting", w - 0.06, -1.2, "in");
R.put("painting", w - 0.06, 1.6, "in");
R.put("plant", w - 0.5, d / 2 - 0.55, 0);
R.put("wgwatercooler", 0.5, -d / 2 + 0.5, "out");
R.spot(1.6, 1.6);
}, { secure: true });
}
if (typeof wgPlace === "function") {
wgPlace(BANK_KEY, { floors: 3, w: 24, front: 20, floor: "marble", wall: 0xE6DDCC,
trade: "Bank teller", clerk: "Bank clerk", head: "Bank manager", control: "Bank IT technician", secure: true,
wingName: "Staff only · Vault and back office",
names: ["Banking hall", "Lending and business banking", "Head office"],
ground: { L: ["vault:The main vault", "safedeposit", "countingroom:Cash room", "interview:Private interview room"],
R: ["security", "clerks:Back office", "records:Ledger room"] },
up: [{ L: ["advisor:Mortgage office", "advisor:Loans office", "advisor:Business banking", "meeting:Client meeting room", "clerks:Card services", "clerks:Fraud team"],
R: ["clerks:Loans processing", "clerks:Accounts office", "office:Branch manager's office", "clerks:Customer contact centre", "staffroom", "lockers", "records:Archive"] },
{ L: ["boardroom", "office:Chief executive's office", "office:Compliance office", "clerks:Audit office", "clerks:Dealing room", "restrooms"],
R: ["clerks:Payments office", "controlroom:Server room", "classroom:Training room", "office:Bank lawyer's office", "clerks:Human resources", "staffroom:Head office kitchen"] }],
fillers: ["meeting:Interview room", "clerks:Operations office", "records:Archive"] });
(function () {
var P = WG_PROG[BANK_KEY];
if (!P)
return;
var who = { "Mortgage office": "Mortgage adviser", "Loans office": "Loan officer", "Business banking": "Business banker" };
P.up[0].L = P.up[0].L.map(function (r) { var lab = String(r).split(":")[1]; return who[lab] ? { t: r, who: who[lab] } : r; });
})();
}
(function () {
if (typeof wgRoomOf !== "function")
return;
var ro = wgRoomOf;
wgRoomOf = function (r) {
if (r && typeof r === "object" && r.t) {
var R = ro(r.t);
if (R)
R.opt = { who: r.who };
return R;
}
return ro.apply(this, arguments);
};
})();
if (typeof WG_FRONT !== "undefined")
WG_FRONT[BANK_KEY] = function (K) { return __ZC(317, 0, this, arguments, new.target); };
