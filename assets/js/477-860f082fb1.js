/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var BNK = { b: null, life: null, busy: false, tab: "loans", q: null, say: "", el: null, kind: "personal", amt: 5000, yrs: 3, mort: null, missing: false };
var BNK_KIND = { personal: "Personal loan", car: "Car loan", business: "Business loan", mortgage: "Mortgage" };
function bnkRpc(name, args) {
if (!(typeof signedIn === "function" && signedIn()))
return Promise.resolve({ ok: false, say: "Sign in first." });
if (typeof cityRpc !== "function")
return Promise.resolve({ ok: false, say: "Not now." });
return cityRpc(name, args || {}).catch(function (e) {
var m = String((e && e.message) || e || "");
if (/does not exist|Could not find|PGRST202|404|schema cache/i.test(m)) {
BNK.missing = true;
return { ok: false, say: "The loans desk opens soon." };
}
return { ok: false, say: m || "Not now." };
});
}
function bnkG(n) { return Number(n || 0).toLocaleString() + " gold"; }
function bnkWhen(t) {
try {
var d = new Date(t), s = (d.getTime() - Date.now()) / 86400000;
if (s < 0)
return "now";
if (s < 1)
return "within a day";
return "in " + Math.ceil(s) + " day" + (Math.ceil(s) === 1 ? "" : "s");
}
catch (e) {
return "";
}
}
function bnkScoreWord(s) { return s >= 760 ? "excellent" : s >= 700 ? "good" : s >= 640 ? "fair" : s >= 580 ? "poor" : "very poor"; }
function bnkScoreCol(s) { return s >= 760 ? "#8FD88F" : s >= 700 ? "#B8D88F" : s >= 640 ? "#E8C27A" : s >= 580 ? "#E8A06A" : "#E87A6A"; }
function bnkBox() { return __ZC(477, 0, this, arguments, new.target); }
function bnkClose() { if (BNK.el)
BNK.el.style.display = "none"; BNK.open = false; }
function bnkOpen(tab) {
BNK.tab = tab || BNK.tab || "loans";
BNK.open = true;
BNK.say = "";
var el = bnkBox();
el.style.display = "block";
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
bnkPaint();
bnkLoad();
}
function bnkLoad() { return __ZC(477, 1, this, arguments, new.target); }
function bnkSaid(o, reload) {
BNK.say = o && o.say ? String(o.say) : "";
if (o && o.ok !== false) {
if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
}
if (reload !== false)
bnkLoad();
else
bnkPaint();
return o;
}
function bnkTabBtn(k, t) { return '<button class="btn" data-bnktab="' + k + '"' + (BNK.tab === k ? ' style="border-color:#E8C27A;color:#E8C27A"' : '') + '>' + t + '</button> '; }
function bnkNote(t) { return '<div style="opacity:.72;font-size:12.5px;margin:4px 0 8px">' + t + '</div>'; }
function bnkPaint() { return __ZC(477, 2, this, arguments, new.target); }
function bnkHead(B) { return __ZC(477, 3, this, arguments, new.target); }
function bnkLoansHtml(B) { return __ZC(477, 4, this, arguments, new.target); }
var BNK_YRS = { personal: [1, 2, 3, 4, 5], car: [2, 3, 4, 5, 6, 7], business: [1, 2, 3, 5, 7, 10] };
function bnkTakeHtml(B) { return __ZC(477, 5, this, arguments, new.target); }
function bnkTakeWire(el) { return __ZC(477, 6, this, arguments, new.target); }
function bnkHomeHtml(B) { return __ZC(477, 7, this, arguments, new.target); }
function bnkNestHtml(B) { return __ZC(477, 8, this, arguments, new.target); }
function bnkNestWire(el) { return __ZC(477, 9, this, arguments, new.target); }
function bnkPurseHtml(B) { return __ZC(477, 10, this, arguments, new.target); }
function bnkPurseWire(el) { return __ZC(477, 11, this, arguments, new.target); }
document.addEventListener("click", function (e) {
var t = e.target;
if (!t || t.id !== "bnk-oldpay")
return;
var n = Math.floor(+prompt("How much of the owing line to repay?") || 0);
if (n > 0 && typeof bankRepay === "function")
bankRepay(n).then(function () { bnkLoad(); });
}, true);
if (typeof tsBankOpen === "function") {
tsBankOpen = function () { bnkOpen(BNK.tab === "life" ? "loans" : BNK.tab); };
}
(function () {
function wire() {
var b = document.getElementById("bank-borrow");
if (b && !b.dataset.bnk) {
b.dataset.bnk = "1";
b.textContent = "Loans desk";
b.onclick = function (e) { if (e)
e.preventDefault(); bnkOpen("take"); };
}
var r = document.getElementById("bank-repay");
if (r && !document.getElementById("bnk-life-btn")) {
var x = document.createElement("button");
x.className = "btn";
x.type = "button";
x.id = "bnk-life-btn";
x.textContent = "Nest egg and retirement";
x.onclick = function () { bnkOpen("nest"); };
r.parentNode.insertBefore(x, r.nextSibling);
}
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", wire);
else
wire();
setTimeout(wire, 1500);
})();
if (typeof PS_EXTRAS !== "undefined") {
PS_EXTRAS.push({ id: "bnk-ps", label: "🏦 Bank: loans and savings", run: function () { setTimeout(function () { bnkOpen("loans"); }, 10); } });
try {
if (typeof PS_SECTIONS !== "undefined")
PS_SECTIONS.forEach(function (S) { if (S.k === "work" && S.ids.indexOf("bnk-ps") < 0)
S.ids.push("bnk-ps"); });
}
catch (e) { }
}
function bnkMortgage(lot) {
BNK.mort = { lot: lot, down: null, yrs: 30, q: null };
bnkRpc("mortgage_quote", { p_lot: lot, p_down: null, p_weeks: 1560 }).then(function (q) { BNK.mort.q = q; if (q && q.down != null)
BNK.mort.down = q.down; bnkMortPaint(); });
bnkMortPaint();
}
function bnkMortPaint() { return __ZC(477, 12, this, arguments, new.target); }
(function () {
if (typeof wrPaint !== "function")
return;
var wp = wrPaint;
wrPaint = function () {
var r = wp.apply(this, arguments);
try {
var box = document.getElementById("wr-box");
if (!box || box.style.display === "none")
return r;
Array.prototype.forEach.call(box.querySelectorAll("[data-wrbuy]"), function (b) {
if (b.nextSibling && b.nextSibling.getAttribute && b.nextSibling.getAttribute("data-wrmort"))
return;
var row = (typeof WR !== "undefined" && WR.board || []).filter(function (l) { return l.id === +b.getAttribute("data-wrbuy"); })[0];
if (row && row.kind && row.kind !== "home")
return;
var m = document.createElement("button");
m.className = "btn";
m.setAttribute("data-wrmort", b.getAttribute("data-wrbuy"));
m.textContent = "Buy with a mortgage";
m.style.marginLeft = "4px";
m.onclick = function () { bnkMortgage(+b.getAttribute("data-wrbuy")); };
b.parentNode.insertBefore(m, b.nextSibling);
});
}
catch (e) { }
return r;
};
})();
"use strict";
var LIFE = { d: null, at: 0, busy: false, told: null };
function lifeLoad(force) {
if (LIFE.busy || !(typeof signedIn === "function" && signedIn()))
return Promise.resolve(LIFE.d);
if (!force && LIFE.d && Date.now() - LIFE.at < 10 * 60000)
return Promise.resolve(LIFE.d);
LIFE.busy = true;
LIFE.at = Date.now();
return bnkRpc("life_me").then(function (o) { if (o && o.ok) {
LIFE.d = o;
BNK.life = o;
} return LIFE.d; })
.then(function (d) { LIFE.busy = false; lifeAfterLoad(); return d; });
}
function lifeAfterLoad() {
if (BNK.life)
LIFE.d = BNK.life;
var d = LIFE.d;
if (!d)
return;
try {
var k = "sm_life_bday_" + (typeof myUserId === "function" ? myUserId() : ""), last = +(localStorage.getItem(k) || 0);
if (!d.young && d.age && last && d.age > last && typeof setStatus === "function")
setStatus("🎂 <b>Happy birthday!</b> Your character is " + d.age + " today.");
if (d.age)
localStorage.setItem(k, String(d.age));
}
catch (e) { }
lifeLookChanged();
}
function lifeHtml() { return __ZC(477, 13, this, arguments, new.target); }
function lifeWire(el) { return __ZC(477, 14, this, arguments, new.target); }
function lifeSaid(o) { LIFE.at = 0; bnkSaid(o); if (typeof setStatus === "function" && o && o.say)
setStatus(o.ok === false ? esc(o.say) : "<b>" + esc(o.say) + "</b>"); }
function lifeOpen() { bnkOpen("life"); }
if (typeof PS_EXTRAS !== "undefined") {
PS_EXTRAS.push({ id: "life-ps", label: "🎂 My age and retirement", run: function () { setTimeout(lifeOpen, 10); } });
try {
if (typeof PS_SECTIONS !== "undefined")
PS_SECTIONS.forEach(function (S) { if (S.k === "you" && S.ids.indexOf("life-ps") < 0)
S.ids.push("life-ps"); });
}
catch (e) { }
}
function lifeGreyAt(age) { if (!(age > 48))
return 0; return Math.min(1, (age - 48) / 30); }
function lifeMix(c, t, k) {
var r = (c >> 16) & 255, g = (c >> 8) & 255, b = c & 255, R = (t >> 16) & 255, G = (t >> 8) & 255, B = t & 255;
return (Math.round(r + (R - r) * k) << 16) | (Math.round(g + (G - g) * k) << 8) | Math.round(b + (B - b) * k);
}
function lifeAged(L) {
var d = LIFE.d;
if (!L || !d || d.young || !d.grey)
return L;
var k = lifeGreyAt(d.age_exact || d.age);
if (!k || typeof L.hair !== "number")
return L;
var o = {};
for (var p in L)
o[p] = L[p];
o.hair = lifeMix(L.hair, k < 0.7 ? 0xA8A6A2 : 0xE6E3DC, Math.min(1, k * 0.95));
return o;
}
function lifeLookChanged() { return __ZC(477, 15, this, arguments, new.target); }
function lifeWrapRpc(cr) {
return function (name, body) {
if (name === "set_public_look" && body && body.p_look)
try {
body = Object.assign({}, body, { p_look: lifeAged(body.p_look) });
}
catch (e) { }
return cr.call(this, name, body);
};
}
(function () {
if (typeof meSpec === "function") {
var ms = meSpec;
meSpec = function () { var s = ms.apply(this, arguments); try {
if (s && s.look)
s.look = lifeAged(s.look);
}
catch (e) { } return s; };
}
if (typeof cityRpc === "function")
cityRpc = lifeWrapRpc(cityRpc);
})();
setTimeout(function () { lifeLoad(true); }, 9000);
setInterval(function () { try {
lifeLoad(false);
}
catch (e) { } }, 60000);
"use strict";
var WGV_KEY = "Willow Grove Retirement Center", WGV_JOBS = [];
for (var wgvj = 8400; wgvj <= 8411; wgvj++)
WGV_JOBS.push(wgvj);
var WGV = { folk: null, at: 0 };
if (typeof gapPlace === "function")
gapPlace({ key: WGV_KEY, ring: "commons", arch: "manor", s: 0.78, jobs: WGV_JOBS, fit: [],
note: "Willow Grove Retirement Center: suites for dreamers of 62 and over, a lounge, a dining room, a chapel, a gym and its own nurses." });
else if (typeof cityWorkplace === "function")
cityWorkplace({ key: WGV_KEY, ring: "commons", arch: "manor", s: 0.78, jobs: WGV_JOBS, fit: [], note: "Willow Grove Retirement Center." });
if (typeof cityMore === "function")
cityMore("xwv", function (C) {
var f = cityFrontage(C, WGV_KEY, 1420, 4) || cityFrontage(C, WGV_KEY, 1420, 7) || cityFrontage(C, WGV_KEY, 1280, 6) || cityFrontage(C, WGV_KEY, 1420, 2, [-1]);
if (!f || !f.spec)
return;
f.spec.attrs.c = 0xA8705A;
f.spec.attrs.rc = 0x4A4E58;
var kb = C.kerb(f.rs, f.side), face = f.side > 0 ? rotIn(f.a) : rotOut(f.a), q = f.w / 2;
C.at("ornatelamp", kb, f.a + (q - 2) / kb, 0);
C.at("ornatelamp", kb, f.a - (q - 2) / kb, 0);
C.at("flowerbed", kb + f.side * 3, f.a + (q * 0.55) / kb, face);
C.at("flowerbed", kb + f.side * 3, f.a - (q * 0.55) / kb, face);
C.at("bench", kb + f.side * 2.4, f.a + (q * 0.3) / kb, face);
C.at("bench", kb + f.side * 2.4, f.a - (q * 0.3) / kb, face);
C.at("topiary", kb + f.side * 2, f.a + 5 / kb, 0);
C.at("topiary", kb + f.side * 2, f.a - 5 / kb, 0);
C.at("tree", kb + f.side * 1.2, f.a + (q + 3) / kb, 0);
C.at("tree", kb + f.side * 1.2, f.a - (q + 3) / kb, 0);
C.sign(kb + f.side * 0.6, f.a + (q * 0.8) / kb, face, "Willow Grove", "Retirement Center · suites for 62 and over · visitors welcome");
});
(function () {
if (typeof gapPiece !== "function" || typeof trB !== "function")
return;
var M = function (c, t, o) { return trM(c, t || null, o || null); };
var oak = function () { return M(0x8A6038, "wood"); }, cream = function () { return M(0xF2ECDC); }, brass = function () { return M(0xC9A040, null, "shine"); };
function tex(id, draw) {
if (typeof ghrTex === "function")
return ghrTex(id, 512, 320, draw);
var c = document.createElement("canvas");
c.width = 512;
c.height = 320;
draw(c.getContext("2d"), 512, 320);
return new THREE.CanvasTexture(c);
}
function face(g, t, w, h, x, y, z) { var p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshLambertMaterial({ map: t })); p.position.set(x, y, z); g.add(p); return p; }
var name = tex("wgvname", function (x, W, H) {
x.fillStyle = "#3E5A3A";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#D8C890";
x.lineWidth = 6;
x.strokeRect(14, 14, W - 28, H - 28);
x.fillStyle = "#F2E8C8";
x.textAlign = "center";
x.font = "bold 64px Georgia,serif";
x.fillText("Willow Grove", W / 2, 140);
x.font = "italic 30px Georgia,serif";
x.fillText("Retirement Center", W / 2, 200);
x.font = "22px Georgia,serif";
x.fillText("Please sign the visitors' book", W / 2, 262);
});
gapPiece("wgvdesk", 3.0, 0.9, true, function (g) {
var w = oak();
trB(g, 3.0, 1.05, 0.14, w, 0, 0.525, 0.38);
trB(g, 3.1, 0.05, 0.5, cream(), 0, 1.08, 0.32);
trB(g, 3.0, 0.05, 0.8, M(0xE8E0CC), 0, 0.76, 0);
trB(g, 0.12, 0.78, 0.8, w, -1.44, 0.39, 0);
trB(g, 0.12, 0.78, 0.8, w, 1.44, 0.39, 0);
face(g, name, 1.6, 0.56, 0, 0.55, 0.452);
trB(g, 0.46, 0.04, 0.32, M(0x5A2A1E), -0.7, 1.12, 0.3);
trB(g, 0.42, 0.01, 0.28, M(0xF6F2E6), -0.7, 1.145, 0.3);
trC(g, 0.07, 0.09, 0.24, 12, M(0xB8D0E0, null, "glass"), 0.9, 1.22, 0.28);
[[0.86, 1.4, 0.26, 0xE8A0B0], [0.95, 1.42, 0.3, 0xF0E080], [0.9, 1.44, 0.22, 0xE86A6A]].forEach(function (f) { trS(g, 0.05, M(f[3]), f[0], f[1], f[2]); });
trS(g, 0.03, brass(), 1.2, 1.14, 0.36);
});
var acts = tex("wgvacts", function (x, W, H) {
x.fillStyle = "#2A4A6A";
x.fillRect(0, 0, W, H);
x.fillStyle = "#FFF6D8";
x.textAlign = "center";
x.font = "bold 34px Georgia,serif";
x.fillText("What's on today", W / 2, 46);
x.textAlign = "left";
x.font = "22px Georgia,serif";
["9:30  Morning prayers in the chapel", "10:30  Chair exercises (the activity room)", "12:00  Lunch is served", "2:00  Bingo!  4:00  Tea and cake", "6:00  Supper  ·  7:30  Sing-along at the piano"].forEach(function (t, i) { x.fillText(t, 30, 96 + i * 44); });
});
gapPiece("wgvboard", 1.8, 0.12, false, function (g) { trB(g, 1.9, 1.3, 0.06, oak(), 0, 1.55, 0); face(g, acts, 1.76, 1.16, 0, 1.55, 0.035); });
gapPiece("wgvhood", 0.9, 0.9, true, function (g) {
trB(g, 0.62, 0.45, 0.6, M(0xC86A8A), 0, 0.25, 0);
trB(g, 0.62, 0.6, 0.1, M(0xC86A8A), 0, 0.75, -0.26);
trB(g, 0.1, 0.25, 0.5, M(0xC86A8A), -0.3, 0.55, 0);
trB(g, 0.1, 0.25, 0.5, M(0xC86A8A), 0.3, 0.55, 0);
trC(g, 0.03, 0.03, 1.4, 8, M(0xB8BCC2, null, "shine"), 0, 0.7, -0.42);
trS(g, 0.3, M(0xE8E4EC, null, "shine"), 0, 1.42, -0.18);
});
})();
if (typeof wgRoom === "function") {
var sconces = function (R, n) { for (var i = 0; i < n; i++)
R.put("wgvsconce", R.w - 0.02, -R.d / 2 + R.d * (i + 0.5) / n, "in"); };
wgRoom("wgvdining", "Dining room", 14, function (R) {
var w = R.w, d = R.d, n = 0;
for (var u = 2.8; u < w - 1.2; u += 2.6)
for (var v = -d / 2 + 1.8; v < d / 2 - 1.6; v += 2.6) {
R.put("wgvtable", u, v, "n");
if (n < 5 && (n++ % 2 === 0))
R.staff("Resident", u + 0.8, v, "in");
}
R.wallN("wgvhearth", Math.min(w - 1.5, w * 0.62));
R.wallN("wgvcurio", w * 0.3);
R.wallS("wgvsideboard", w * 0.5);
R.wallS("wgvcurio", w * 0.82);
R.put("wgvtrolley", 1.0, d / 2 - 1.6, "in");
R.put("wgvpedestal", 0.5, -d / 2 + 0.5, 0);
R.put("wgvgfclock", w - 0.3, d / 2 - 0.4, "in");
R.put("wgvpedestal", w - 0.4, -d / 2 + 0.45, 0);
R.put("chandelier", w * 0.35, 0, 0);
R.put("chandelier", w * 0.75, 0, 0);
sconces(R, 3);
R.put("painting", w - 0.06, -2.6, "in");
R.put("painting", w - 0.06, 2.6, "in");
R.staff("Dining room server", 1.6, d / 2 - 2.4, "out");
R.staff("Dining room server", w * 0.6, 0.2, "in");
R.spot(1.6, 0);
}, { public: true });
wgRoom("wgvactivity", "Activity room", 10, function (R) {
var w = R.w, d = R.d;
R.put("wgvjigsaw", w * 0.38, -1.9, "n");
R.put("wgvjigsaw", w * 0.38, 1.9, "n");
R.put("wgvjigsaw", w * 0.72, -1.9, "n");
R.staff("Resident", w * 0.38, -1.2, "s");
R.staff("Resident", w * 0.38, 2.6, "s");
R.staff("Resident", w * 0.72, -2.6, "n");
R.put("wgvwingk", w * 0.74, 2.2, "in");
R.put("wgvside", w * 0.74 + 1.0, 2.9, 0);
R.put("wgvbird", w - 0.6, -d / 2 + 0.6, 0);
R.put("wgvflamp", w - 0.5, d / 2 - 0.5, 0);
R.wallS("blackboard", w * 0.5);
R.wallN("wgvbooks", w * 0.3);
R.wallN("wgvphotos", w * 0.62);
R.put("wgvpiano", w - 0.75, 0, "in");
sconces(R, 2);
R.staff("Activities coordinator", w * 0.55, -d / 2 + 1.0, "s");
R.spot(1.6, 0);
}, { public: true });
wgRoom("wgvsalon", "Hair salon", 7, function (R) {
var w = R.w, d = R.d;
R.put("wgvhood", w - 0.8, -1.4, "in");
R.put("wgvhood", w - 0.8, 1.0, "in");
R.put("wallmirror", w - 0.06, -0.2, "in");
R.put("wgvwing", 2.2, -d / 2 + 0.8, "n");
R.put("wgvside", 3.3, -d / 2 + 0.5, 0);
R.put("wgvpedestal", 0.6, d / 2 - 0.6, 0);
R.put("wgvphotos", 4.5, d / 2 - 0.05, "s");
R.staff("Care home hairdresser", w - 1.8, -0.2, "in");
R.staff("Resident", w - 0.8, -1.4, "out");
R.spot(1.6, 0.6);
}, { public: true });
wgRoom("wgvsuite", "Suite", 7, function (R) {
var w = R.w, d = R.d;
R.put("wgvbed", w - 2.6, -d / 2 + 1.18, "n");
R.put("wgvside", w - 1.3, -d / 2 + 0.45, 0);
R.put("wgvside", w - 3.9, -d / 2 + 0.45, 0);
R.wallS("wardrobe", 2.6);
R.put("wgvdresser", w - 2.2, d / 2 - 0.5, "s");
R.put("wgvwingk", w - 1.0, 0.9, "in");
R.wallN("wgvbooks", 6.6);
R.put("wgvphotos", 4.4, d / 2 - 0.04, "s");
R.put("wgtv", 1.8, 1.6, "out");
R.put("wgvflamp", w - 0.4, d / 2 - 0.5, 0);
R.put("painting", w - 0.06, 0.4, "in");
R.put("plant", 0.6, d / 2 - 0.6, 0);
R.spot(2.0, 0.2);
}, { public: true });
wgRoom("wgvlibrary", "Library", 8, function (R) {
var w = R.w, d = R.d;
for (var u = w - 1.4; u > 2.4; u -= 1.75) {
R.put("wgvbooks", u, -d / 2 + 0.25, "n");
R.put("wgvbooks", u, d / 2 - 0.25, "s");
}
R.wallOut("wgvhearth", 0);
R.put("wgvwing", w - 2.6, -1.3, "out");
R.put("wgvwingg", w - 2.6, 1.3, "out");
R.put("wgvcoffee", w - 1.9, 0, "out");
R.put("wgvside", w - 2.7, -2.3, 0);
R.put("wgvflamp", w - 3.5, 2.2, 0);
R.put("wgvglobe", 3.4, 0, 0);
R.put("wgvrocker", 5.2, 1.6, "out");
R.staff("Resident", w - 2.6, 1.3, "out");
R.spot(1.6, 0);
}, { public: true });
wgRoom("wgvtv", "Television lounge", 8, function (R) {
var w = R.w, d = R.d;
R.put("tv", w - 0.5, 0, "in");
R.put("wgvsofa", w - 4.4, 0, "out");
R.put("wgvwing", w - 3.2, -2.5, "out");
R.put("wgvwingg", w - 3.2, 2.5, "out");
R.put("wgvcoffee", w - 2.6, 0, "out");
R.put("wgvside", w - 4.4, -1.6, 0);
R.put("wgvside", w - 4.4, 1.6, 0);
R.put("wgvtrolley", 2.2, -d / 2 + 0.8, "n");
R.put("wgvflamp", w - 0.5, d / 2 - 0.6, 0);
R.put("wgvflamp", w - 0.5, -d / 2 + 0.6, 0);
R.wallN("wgvphotos", 3.5);
R.wallS("wgvcurio", 4.6);
R.put("wgvrocker", 3.4, 1.6, "out");
R.staff("Resident", w - 4.4, 0, "out");
R.staff("Resident", w - 3.2, 2.5, "out");
R.spot(1.6, 0.8);
}, { public: true });
wgRoom("wgvchapel", "Chapel", 8, function (R) {
var w = R.w, d = R.d;
for (var u = 2.0; u < w - 3.0; u += 1.3) {
R.put("wgvpew", u, -1.85, "out");
R.put("wgvpew", u, 1.85, "out");
}
R.wallOut("altarinside", 0);
R.put("candles", w - 0.5, -1.6, 0);
R.put("candles", w - 0.5, 1.6, 0);
R.put("wgvpedestal", w - 0.6, -2.6, 0);
R.put("wgvpedestal", w - 0.6, 2.6, 0);
R.put("piano", 1.0, d / 2 - 0.7, "out");
sconces(R, 2);
R.staff("Chaplain", w - 1.6, 0.9, "in");
R.spot(1.4, 0);
}, { public: true });
}
if (typeof wgPlace === "function") {
var wgvSuites = function (a, b) { var o = []; for (var i = a; i <= b; i++)
o.push("wgvsuite:Suite " + i); return o; };
wgPlace(WGV_KEY, { floors: 3, w: 26, front: 22, floor: "wood", wall: 0xEFE6D2, trade: "Care aide", clerk: "Care home receptionist", head: "Care home director", secure: false,
wingName: "Dining room · Chapel · Salon · Suites upstairs",
names: ["Ground floor · Lounge and dining", "First floor · Suites 1-6, gym and library", "Second floor · Suites 7-18"],
ground: { L: ["wgvdining:Dining room", "kitchen:Kitchen", "wgvactivity:Activity room"], R: ["wgvchapel:Chapel", "wgvsalon:Hair salon", "nursestation:Nurses' station", "office:Director's office"] },
up: [{ L: wgvSuites(1, 6), R: ["physio:Physiotherapy gym", "wgvlibrary:Library", "wgvtv:Television lounge", "laundry", "staffroom"] },
{ L: wgvSuites(7, 12), R: wgvSuites(13, 18) }],
fillers: ["store:Linen store", "restrooms"] });
}
if (typeof WG_FRONT !== "undefined")
WG_FRONT[WGV_KEY] = function (K) { return __ZC(477, 16, this, arguments, new.target); };
function wgvFolk() { return __ZC(477, 17, this, arguments, new.target); }
(function () {
if (typeof wgStaffName === "function") {
var sn = wgStaffName;
wgStaffName = function (key, i, title) {
if (key === WGV_KEY && title === "Resident") {
var F = wgvFolk(), G = (typeof INT !== "undefined" && INT && INT.wg) ? INT.wg.staff : [], k = 0;
for (var j = 0; j < i && j < G.length; j++)
if (G[j].title === "Resident")
k++;
var p = F.length ? F[k % F.length] : null;
if (p && k < F.length)
return { name: p.n, f: p.sx === "f", seed: hash("wgv|" + p.id), folk: p };
var o = sn.apply(this, arguments);
return o;
}
return sn.apply(this, arguments);
};
}
if (typeof wgOnShift === "function") {
var os = wgOnShift;
wgOnShift = function (title, key) { if (key === WGV_KEY && title === "Resident")
return true; return os.apply(this, arguments); };
}
if (typeof jobDress === "function") {
var jd = jobDress;
jobDress = function (L, title, key) {
if (key === WGV_KEY && title === "Resident") {
var h = hash(JSON.stringify(L).length + "|" + (L.sex || ""));
L.hair = [0xB8B4AE, 0xE4E1DA, 0x8E8C88, 0xEFE6CE][h % 4];
L.top = [0x7A8AA0, 0xA07A8A, 0x8A9A7A, 0xC8B8A0, 0x6A5A7A][h % 5];
L.topKind = L.sex === "f" ? (h % 3 ? "coat" : "dress") : (h % 2 ? "coat" : "shirt");
L.bottom = [0x3A3A44, 0x5A4A3A, 0x4A5A6A][h % 3];
L.hat = "none";
L.build = 0.92 + (h % 6) / 100;
if (L.sex === "f" && !/bun|short|curly/.test(L.hairStyle || ""))
L.hairStyle = (h % 2) ? "bun" : "curly";
if (L.sex !== "f" && L.hairStyle === "long")
L.hairStyle = "short";
return L;
}
return jd.apply(this, arguments);
};
}
if (typeof wgTalk === "function") {
var wt = wgTalk;
wgTalk = function (who) {
if (who && who.title === "Resident" && INT && INT.spec && (INT.spec.workplace === WGV_KEY)) {
var F = wgvFolk(), p = F.filter(function (q) { return q.n === who.name; })[0], story = "";
try {
if (p && typeof tlvStory === "function")
story = tlvStory(p) || "";
}
catch (e) { }
var age = p && p.age ? p.age : 75;
wTalk({ name: who.name, doing: "at home at Willow Grove",
persona: who.name + " is " + age + ", retired" + (p && p.was ? " after years as " + (/^[aeiou]/i.test(p.was) ? "an " : "a ") + p.was : "") + ", and lives at Willow Grove Retirement Center in the Commons of Somnucor. " +
story + " Speaks as a real older person would: warm, unhurried, a little nostalgic, glad of company, fond of the staff, the food and the bingo; remembers how the city used to be. Never says it is a game or an AI.",
greet: "Oh, hello, dear. Come and sit down. I'm " + who.name.split(" ")[0] + "." });
return;
}
return wt.apply(this, arguments);
};
}
})();
function wgvDesk(again) { return __ZC(477, 18, this, arguments, new.target); }
if (typeof gapAct === "function") {
gapAct("wgvdesk", { say: "<b>Willow Grove reception</b> · <b>press E</b> (or tap here)", fn: wgvDesk });
gapAct("wgvboard", { say: "<b>What's on today</b> · <b>press E</b> to read", fn: function () { return __ZC(477, 19, this, arguments, new.target); } });
gapAct("wgvtable", { say: function () { return "<b>The dining room</b> · <b>press E</b> to sit down to a meal (residents)"; }, fn: function () {
bnkRpc("retire_meal").then(function (o) {
if (typeof gapSaid === "function")
gapSaid(o);
else if (o && o.say)
setStatus(esc(o.say));
});
} });
gapAct("wgvpiano", { say: "<b>The piano</b> · <b>press E</b> to play an old tune", fn: function () { return __ZC(477, 20, this, arguments, new.target); } });
}
"use strict";
var WGV_STYLE = {
hall: { paper: "#B9C4A6", ink: "#8E9C78", gold: "#D9C38A", pane: "#F1EBDD", trim: "#FFFDF6", skirt: "#5A3E28", kind: "damask" },
dining: { paper: "#7E2E34", ink: "#9A4048", gold: "#D8B46A", pane: "#3E2A1C", trim: "#5A3C26", skirt: "#2E1E12", kind: "stripe" },
suite: { paper: "#F3E6DC", ink: "#D8909A", gold: "#8FA878", pane: "#FBF7EE", trim: "#FFFFFF", skirt: "#6A4A30", kind: "sprig" },
green: { paper: "#2F4A3A", ink: "#3E5E4A", gold: "#C8A860", pane: "#5A3C24", trim: "#6E4A2C", skirt: "#2A1A10", kind: "damask" },
chapel: { paper: "#E8E0CE", ink: "#D4C8AE", gold: "#B89A5A", pane: "#D8CDB4", trim: "#F4EEDF", skirt: "#7A6A50", kind: "stone" },
care: { paper: "#E6EEF0", ink: "#D2DEE2", gold: "#A8BCC4", pane: "#F4F8F8", trim: "#FFFFFF", skirt: "#6A7A82", kind: "plain" }
};
function wgvRoomStyle(label) { return __ZC(477, 21, this, arguments, new.target); }
function wgvCanvas(id, w, h, draw, wrap) { return __ZC(477, 22, this, arguments, new.target); }
function wgvNoise(x, W, H, a, seed) {
var s = seed || 7;
for (var i = 0; i < W * H / 60; i++) {
s = (s * 9301 + 49297) % 233280;
var px = s % W;
s = (s * 9301 + 49297) % 233280;
var py = s % H;
x.fillStyle = (i % 2 ? "rgba(255,255,255," : "rgba(0,0,0,") + a + ")";
x.fillRect(px, py, 2, 2);
}
}
function wgvDamask(x, cx, cy, s, col) { return __ZC(477, 23, this, arguments, new.target); }
function wgvSprig(x, cx, cy, s, S) { return __ZC(477, 24, this, arguments, new.target); }
function wgvPaperTex(k) { return __ZC(477, 25, this, arguments, new.target); }
function wgvPaperMat(k) { var c = wgvPaperMat.c || (wgvPaperMat.c = {}); return c[k] || (c[k] = new THREE.MeshLambertMaterial({ map: wgvPaperTex(k) })); }
function wgvCeilMat() { return __ZC(477, 26, this, arguments, new.target); }
function wgvRugTex(k) { return __ZC(477, 27, this, arguments, new.target); }
function wgvRugMat(k) { var c = wgvRugMat.c || (wgvRugMat.c = {}); return c[k] || (c[k] = new THREE.MeshLambertMaterial({ map: wgvRugTex(k) })); }
function wgvRegions(I) {
var log = (I.wg && I.wg.log) || [], rooms = [];
log.forEach(function (l) { var p = l.split("|"), z = p[4].split(".."); rooms.push({ lv: +p[0], xc: +p[1], sd: p[2] === "L" ? -1 : 1, label: p[3], z0: +z[0], z1: +z[1], style: wgvRoomStyle(p[3]) }); });
return rooms;
}
function wgvDress(I) { return __ZC(477, 28, this, arguments, new.target); }
(function () {
if (typeof makeInterior !== "function")
return;
var mk = makeInterior;
makeInterior = function (spec) {
var I = mk.apply(this, arguments);
try {
if (I && spec && spec.workplace === WGV_KEY)
wgvDress(I);
}
catch (e) {
if (window.console)
console.warn("[wgv] dress", e);
}
return I;
};
})();
"use strict";
(function () {
if (typeof gapPiece !== "function" || typeof trB !== "function")
return;
var M = function (c, o) { return trM(c, null, o || null); };
var polish = function (c) { return M(c || 0x5A3520, "shine"); }, brass = function () { return M(0xC9A040, "shine"); }, glow = function (c) { return M(c || 0xFFE2A8, "glow"); };
var glass = function () { return M(0xCFE6EE, "glass"); }, white = function () { return M(0xFBF8F2); }, china = function () { return M(0xF4F6FA, "shine"); };
var texMat = function (id, w, h, draw, o) {
var c = texMat.c || (texMat.c = {});
if (c[id])
return c[id];
var t = wgvCanvas(id, w, h, draw, !!(o && o.wrap));
return (c[id] = new THREE.MeshLambertMaterial({ map: t }));
};
var face = function (g, mat, w, h, x, y, z, ry) { var p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat); p.position.set(x, y, z); if (ry)
p.rotation.y = ry; g.add(p); return p; };
var cyl = function (g, r1, r2, h, mat, x, y, z, s) { return trC(g, r1, r2, h, s || 12, mat, x, y, z); };
var chintz = function (base, rose, leaf) {
return texMat("wgv-chintz-" + base, 256, 256, function (x, W, H) {
x.fillStyle = base;
x.fillRect(0, 0, W, H);
wgvNoise(x, W, H, 0.04, 3);
for (var i = 0; i < 6; i++)
for (var j = 0; j < 6; j++) {
var cx = i * 44 + (j % 2 ? 22 : 0) + 8, cy = j * 44 + 10;
x.fillStyle = leaf;
x.beginPath();
x.ellipse(cx + 9, cy + 6, 8, 3.5, 0.6, 0, 7);
x.fill();
x.beginPath();
x.ellipse(cx - 8, cy + 7, 7, 3, -0.6, 0, 7);
x.fill();
x.fillStyle = rose;
x.beginPath();
x.arc(cx, cy, 7, 0, 7);
x.fill();
x.fillStyle = "rgba(255,255,255,0.35)";
x.beginPath();
x.arc(cx - 2, cy - 2, 3, 0, 7);
x.fill();
}
}, { wrap: true });
};
var ROSE = function () { return chintz("#F2E2D2", "#C8606E", "#7A9A68"); }, SAGE = function () { return chintz("#C9D3B8", "#B8485A", "#5E7A50"); }, BLUE = function () { return chintz("#D8E0EA", "#5A78A8", "#7A9A68"); };
var velvet = function (c) { return M(c); };
var books = function () {
return texMat("wgv-books", 256, 256, function (x, W, H) {
x.fillStyle = "#2A1A10";
x.fillRect(0, 0, W, H);
var cols = ["#7A2028", "#1F3A5A", "#2E4A30", "#8A6A2A", "#5A2A4A", "#3A3A3A", "#A84A2A", "#E8D8B0", "#284848"], s = 5;
for (var row = 0; row < 4; row++) {
var x0 = 2;
while (x0 < W - 4) {
s = (s * 9301 + 49297) % 233280;
var bw = 8 + s % 12, bh = 44 + s % 16, col = cols[s % cols.length];
x.fillStyle = col;
x.fillRect(x0, row * 64 + 62 - bh, bw, bh);
x.fillStyle = "rgba(255,220,140,0.6)";
x.fillRect(x0 + 2, row * 64 + 62 - bh + 6, bw - 4, 2);
x.fillRect(x0 + 2, row * 64 + 62 - 12, bw - 4, 2);
x0 += bw + 1;
}
x.fillStyle = "#4A2E18";
x.fillRect(0, row * 64 + 62, W, 4);
}
});
};
var quilt = function () {
return texMat("wgv-quilt", 256, 256, function (x, W, H) {
var cols = ["#E8B4B8", "#F6E8D0", "#A8C4A0", "#B8C8E0", "#E8D088", "#D89090"], s = 11;
for (var i = 0; i < 8; i++)
for (var j = 0; j < 8; j++) {
s = (s * 9301 + 49297) % 233280;
x.fillStyle = cols[s % cols.length];
x.fillRect(i * 32, j * 32, 32, 32);
x.fillStyle = "rgba(255,255,255,0.35)";
x.beginPath();
x.moveTo(i * 32, j * 32);
x.lineTo(i * 32 + 32, j * 32);
x.lineTo(i * 32, j * 32 + 32);
x.fill();
}
x.strokeStyle = "rgba(120,80,60,0.45)";
x.setLineDash([3, 3]);
for (var k = 0; k <= 8; k++) {
x.beginPath();
x.moveTo(k * 32, 0);
x.lineTo(k * 32, H);
x.stroke();
x.beginPath();
x.moveTo(0, k * 32);
x.lineTo(W, k * 32);
x.stroke();
}
});
};
var clockFace = function () {
return texMat("wgv-clockface", 128, 128, function (x, W, H) {
x.fillStyle = "#F6EED8";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#C9A040";
x.lineWidth = 6;
x.beginPath();
x.arc(64, 64, 58, 0, 7);
x.stroke();
x.fillStyle = "#2A1A10";
x.font = "bold 13px Georgia,serif";
x.textAlign = "center";
x.textBaseline = "middle";
["XII", "I", "II", "III", "IIII", "V", "VI", "VII", "VIII", "IX", "X", "XI"].forEach(function (n, i) { var a = i * Math.PI / 6 - Math.PI / 2; x.fillText(n, 64 + Math.cos(a) * 44, 64 + Math.sin(a) * 44); });
x.lineWidth = 3;
x.beginPath();
x.moveTo(64, 64);
x.lineTo(64, 30);
x.stroke();
x.beginPath();
x.moveTo(64, 64);
x.lineTo(88, 72);
x.stroke();
});
};
var photo = function (n) {
return texMat("wgv-photo-" + n, 64, 80, function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, n % 2 ? "#D8C8A8" : "#C8D0D8");
g.addColorStop(1, n % 2 ? "#A89070" : "#8890A0");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.fillStyle = n % 3 ? "#5A4030" : "#3A3A40";
for (var p = 0; p < (n % 3) + 1; p++) {
var cx = W / ((n % 3) + 2) * (p + 1);
x.beginPath();
x.arc(cx, H * 0.42, 9, 0, 7);
x.fill();
x.beginPath();
x.ellipse(cx, H * 0.85, 14, 20, 0, 0, 7);
x.fill();
}
});
};
var mirror = function () {
return texMat("wgv-mirror", 64, 128, function (x, W, H) {
var g = x.createLinearGradient(0, 0, W, H);
g.addColorStop(0, "#E8EEF2");
g.addColorStop(0.5, "#9AA8B4");
g.addColorStop(1, "#D8E2EA");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.fillStyle = "rgba(255,255,255,0.5)";
x.beginPath();
x.moveTo(8, H);
x.lineTo(30, 0);
x.lineTo(40, 0);
x.lineTo(18, H);
x.fill();
});
};
var jigsaw = function () {
return texMat("wgv-jigsaw", 256, 256, function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#8AB8E0");
g.addColorStop(0.55, "#F4E8C8");
g.addColorStop(0.6, "#6A9A58");
g.addColorStop(1, "#4A7038");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.fillStyle = "#B8483E";
x.fillRect(90, 110, 70, 50);
x.fillStyle = "#5A3020";
x.beginPath();
x.moveTo(84, 112);
x.lineTo(125, 80);
x.lineTo(166, 112);
x.fill();
x.fillStyle = "#2A2A2A";
x.fillRect(150, 150, W, H);
x.fillStyle = "#EDE4D0";
x.fillRect(150, 150, W, H);
x.strokeStyle = "rgba(0,0,0,0.25)";
x.lineWidth = 1;
for (var i = 0; i < W; i += 21) {
x.beginPath();
x.moveTo(i, 0);
x.lineTo(i, H);
x.stroke();
x.beginPath();
x.moveTo(0, i);
x.lineTo(W, i);
x.stroke();
}
});
};
function chair(g, seat, x, z, ry) {
var c = new THREE.Group(), w = polish(0x5A3520);
[[-0.19, -0.19], [0.19, -0.19], [-0.19, 0.19], [0.19, 0.19]].forEach(function (p) { cyl(c, 0.022, 0.018, 0.45, w, p[0], 0.225, p[1], 8); });
trB(c, 0.46, 0.06, 0.46, w, 0, 0.47, 0);
trB(c, 0.42, 0.07, 0.42, seat, 0, 0.53, 0.01);
cyl(c, 0.022, 0.022, 0.55, w, -0.2, 0.8, -0.2, 8);
cyl(c, 0.022, 0.022, 0.55, w, 0.2, 0.8, -0.2, 8);
trB(c, 0.42, 0.12, 0.04, w, 0, 1.04, -0.2);
trB(c, 0.3, 0.26, 0.03, seat, 0, 0.78, -0.2);
c.position.set(x, 0, z);
c.rotation.y = ry || 0;
g.add(c);
return c;
}
function wing(g, fab, x, z, ry) {
var c = new THREE.Group(), w = polish(0x4A2A18);
[[-0.34, -0.3], [0.34, -0.3], [-0.34, 0.32], [0.34, 0.32]].forEach(function (p) { cyl(c, 0.035, 0.025, 0.18, w, p[0], 0.09, p[1], 8); });
trB(c, 0.86, 0.3, 0.8, fab, 0, 0.32, 0);
trB(c, 0.66, 0.14, 0.66, fab, 0, 0.53, 0.06);
trB(c, 0.82, 0.86, 0.18, fab, 0, 0.88, -0.32);
trB(c, 0.12, 0.5, 0.62, fab, -0.38, 0.72, 0.0);
trB(c, 0.12, 0.5, 0.62, fab, 0.38, 0.72, 0.0);
trB(c, 0.16, 0.42, 0.3, fab, -0.39, 1.06, -0.18);
trB(c, 0.16, 0.42, 0.3, fab, 0.39, 1.06, -0.18);
cyl(c, 0.07, 0.07, 0.62, fab, -0.38, 0.98, 0.02, 10).rotation.x = Math.PI / 2;
cyl(c, 0.07, 0.07, 0.62, fab, 0.38, 0.98, 0.02, 10).rotation.x = Math.PI / 2;
trB(c, 0.34, 0.26, 0.02, white(), 0, 1.1, -0.22);
c.position.set(x, 0, z);
c.rotation.y = ry || 0;
g.add(c);
return c;
}
function lampOn(g, x, y, z, h, shade) {
cyl(g, 0.08, 0.11, 0.06, brass(), x, y + 0.03, z);
cyl(g, 0.025, 0.025, h, brass(), x, y + h / 2, z, 8);
cyl(g, 0.11, 0.2, 0.24, shade || glow(0xFFE6B8), x, y + h + 0.08, z, 14);
cyl(g, 0.2, 0.21, 0.03, M(0xC8A060), x, y + h - 0.04, z, 14);
}
function frames(g, y, z, n, x0) { for (var i = 0; i < n; i++) {
var fx = x0 + i * 0.16, h = 0.16 + (i % 2) * 0.05;
trB(g, 0.13, h + 0.02, 0.02, brass(), fx, y + h / 2, z);
face(g, photo(i + n), 0.1, h - 0.03, fx, y + h / 2, z + 0.012);
} }
function flowers(g, x, y, z, r, seed) {
var cols = [0xE8A0B0, 0xF0E080, 0xE86A6A, 0xFFFFFF, 0xC890D8, 0xF0A060], s = seed || 3;
for (var i = 0; i < 14; i++) {
s = (s * 9301 + 49297) % 233280;
var a = s / 233280 * Math.PI * 2, d = ((s % 97) / 97) * r, hh = ((s % 53) / 53) * r * 0.9;
trS(g, r * 0.22, M(cols[s % cols.length]), x + Math.cos(a) * d, y + hh, z + Math.sin(a) * d);
}
for (var k = 0; k < 6; k++) {
var a2 = k * 1.05;
trS(g, r * 0.2, M(0x5E8A4A), x + Math.cos(a2) * r * 0.8, y + r * 0.1, z + Math.sin(a2) * r * 0.8, 1, 0.5, 1);
}
}
gapPiece("wgvgfclock", 0.6, 0.42, true, function (g) {
var w = polish(0x4A2414);
trB(g, 0.58, 0.36, 0.4, w, 0, 0.18, 0);
trB(g, 0.46, 1.1, 0.32, w, 0, 0.91, 0);
trB(g, 0.56, 0.5, 0.38, w, 0, 1.71, 0);
trB(g, 0.6, 0.08, 0.42, w, 0, 1.98, 0);
var arch = cyl(g, 0.25, 0.25, 0.36, w, 0, 2.04, 0, 16);
arch.rotation.x = Math.PI / 2;
face(g, clockFace(), 0.38, 0.38, 0, 1.72, 0.192);
trB(g, 0.3, 0.7, 0.01, glass(), 0, 0.95, 0.165);
cyl(g, 0.08, 0.08, 0.01, brass(), 0, 0.72, 0.15, 16).rotation.x = Math.PI / 2;
trB(g, 0.012, 0.5, 0.01, brass(), 0, 1.0, 0.15);
[-0.24, 0, 0.24].forEach(function (x) { trS(g, 0.035, brass(), x, 2.32 - (x ? 0.1 : 0), 0); });
});
gapPiece("wgvcurio", 1.3, 0.5, true, function (g) {
var w = polish(0x5A2E18);
trB(g, 1.3, 0.12, 0.48, w, 0, 0.06, 0);
trB(g, 1.24, 0.6, 0.44, w, 0, 0.42, 0);
trB(g, 1.2, 1.2, 0.4, M(0xF2ECDC), 0, 1.32, -0.02);
trB(g, 1.3, 0.1, 0.48, w, 0, 1.97, 0);
trB(g, 0.05, 1.2, 0.42, w, -0.6, 1.32, 0);
trB(g, 0.05, 1.2, 0.42, w, 0.6, 1.32, 0);
trB(g, 0.04, 1.2, 0.04, w, 0, 1.32, 0.2);
trB(g, 1.16, 1.18, 0.01, glass(), 0, 1.32, 0.205);
[0.95, 1.35, 1.72].forEach(function (y) {
trB(g, 1.14, 0.02, 0.36, w, 0, y, 0);
for (var i = 0; i < 5; i++) {
var p = cyl(g, 0.1, 0.1, 0.012, china(), -0.44 + i * 0.22, y + 0.12, -0.12, 16);
p.rotation.x = Math.PI / 2 - 0.25;
cyl(g, 0.04, 0.03, 0.06, M(i % 2 ? 0x3A5A9A : 0xF4F6FA, "shine"), -0.44 + i * 0.22, y + 0.04, 0.06, 10);
}
});
trB(g, 0.5, 0.02, 0.01, brass(), -0.3, 0.45, 0.225);
trB(g, 0.5, 0.02, 0.01, brass(), 0.3, 0.45, 0.225);
});
gapPiece("wgvtrolley", 0.95, 0.55, true, function (g) {
var b = brass(), w = polish(0x6A3A20);
[[-0.4, -0.2], [0.4, -0.2], [-0.4, 0.2], [0.4, 0.2]].forEach(function (p) { cyl(g, 0.015, 0.015, 0.8, b, p[0], 0.45, p[1], 8); trS(g, 0.04, M(0x222222), p[0], 0.04, p[1]); });
trB(g, 0.86, 0.03, 0.46, w, 0, 0.3, 0);
trB(g, 0.86, 0.03, 0.46, w, 0, 0.75, 0);
trB(g, 0.8, 0.01, 0.4, white(), 0, 0.77, 0);
trS(g, 0.1, china(), -0.22, 0.86, 0, 1, 0.8, 1);
cyl(g, 0.012, 0.02, 0.12, china(), -0.32, 0.87, 0).rotation.z = 0.9;
trS(g, 0.03, china(), -0.22, 0.95, 0);
[[0.05, 0.1], [0.05, -0.1], [0.18, 0.12]].forEach(function (p) { cyl(g, 0.05, 0.05, 0.01, china(), p[0], 0.785, p[1], 12); cyl(g, 0.032, 0.025, 0.05, china(), p[0], 0.815, p[1], 10); });
cyl(g, 0.008, 0.008, 0.36, b, 0.3, 0.95, -0.05, 6);
[0.82, 0.96, 1.08].forEach(function (y, i) {
cyl(g, 0.13 - i * 0.03, 0.13 - i * 0.03, 0.008, china(), 0.3, y, -0.05, 16);
for (var k = 0; k < 4 - i; k++) {
var a = k * 1.57 + i;
trB(g, 0.05, 0.035, 0.05, M([0xF0C8D0, 0xF8E8B8, 0x8A4A2A][(k + i) % 3]), 0.3 + Math.cos(a) * 0.07, y + 0.022, -0.05 + Math.sin(a) * 0.07);
}
});
trB(g, 0.3, 0.06, 0.2, M(0xE8D8B0), 0, 0.35, 0);
});
gapPiece("wgvpedestal", 0.5, 0.5, true, function (g) {
var m = M(0xEDE8DE, "shine");
trB(g, 0.42, 0.08, 0.42, m, 0, 0.04, 0);
cyl(g, 0.12, 0.15, 0.9, m, 0, 0.53, 0, 14);
trB(g, 0.4, 0.06, 0.4, m, 0, 1.0, 0);
cyl(g, 0.13, 0.09, 0.24, M(0x3A5A8A, "shine"), 0, 1.15, 0, 14);
flowers(g, 0, 1.36, 0, 0.24, 7);
});
gapPiece("wgvside", 0.6, 0.6, true, function (g) {
var w = polish(0x5A3018);
cyl(g, 0.06, 0.09, 0.62, w, 0, 0.31, 0, 10);
cyl(g, 0.2, 0.24, 0.04, w, 0, 0.03, 0, 14);
cyl(g, 0.28, 0.28, 0.04, w, 0, 0.64, 0, 18);
cyl(g, 0.3, 0.32, 0.06, white(), 0, 0.65, 0, 18);
lampOn(g, -0.08, 0.68, -0.08, 0.36);
frames(g, 0.68, 0.1, 2, 0.02);
trB(g, 0.14, 0.04, 0.2, M(0x7A2028), 0.1, 0.7, -0.12);
});
gapPiece("wgvwing", 0.95, 0.95, true, function (g) { wing(g, ROSE(), 0, 0, 0); });
gapPiece("wgvwingg", 0.95, 0.95, true, function (g) { wing(g, SAGE(), 0, 0, 0); });
gapPiece("wgvwingk", 0.95, 1.5, true, function (g) {
wing(g, BLUE(), 0, -0.25, 0);
trB(g, 0.5, 0.22, 0.36, BLUE(), 0, 0.2, 0.52);
[[-0.2, 0.38], [0.2, 0.38], [-0.2, 0.66], [0.2, 0.66]].forEach(function (p) { cyl(g, 0.02, 0.02, 0.1, polish(), p[0], 0.05, p[1], 6); });
cyl(g, 0.15, 0.12, 0.2, M(0xB8925A), 0.5, 0.1, 0.35, 12);
trS(g, 0.07, M(0xC8506A), 0.47, 0.24, 0.33);
trS(g, 0.06, M(0x6A8AC8), 0.55, 0.23, 0.4);
cyl(g, 0.006, 0.006, 0.34, M(0xD8D8D8, "shine"), 0.5, 0.32, 0.35, 4).rotation.z = 0.5;
});
gapPiece("wgvsofa", 2.3, 0.95, true, function (g) {
var f = ROSE(), w = polish(0x3A2010);
[[-1.0, -0.3], [1.0, -0.3], [-1.0, 0.32], [1.0, 0.32]].forEach(function (p) { cyl(g, 0.04, 0.03, 0.14, w, p[0], 0.07, p[1], 8); });
trB(g, 2.2, 0.32, 0.86, f, 0, 0.3, 0);
[-0.68, 0, 0.68].forEach(function (x) { trB(g, 0.66, 0.14, 0.66, f, x, 0.53, 0.07); });
trB(g, 2.2, 0.62, 0.2, f, 0, 0.76, -0.34);
cyl(g, 0.12, 0.12, 0.86, f, -1.06, 0.62, 0, 12).rotation.x = Math.PI / 2;
cyl(g, 0.12, 0.12, 0.86, f, 1.06, 0.62, 0, 12).rotation.x = Math.PI / 2;
trB(g, 0.2, 0.36, 0.86, f, -1.06, 0.44, 0);
trB(g, 0.2, 0.36, 0.86, f, 1.06, 0.44, 0);
trB(g, 0.4, 0.36, 0.12, M(0x7A9A68), -0.7, 0.78, -0.18, 0.2);
trB(g, 0.4, 0.36, 0.12, M(0xC8606E), 0.7, 0.78, -0.18, 0.2);
for (var i = 0; i < 7; i++)
trS(g, 0.015, M(0x8A3040), -0.9 + i * 0.3, 0.86, -0.235);
});
gapPiece("wgvfish", 1.3, 0.5, true, function (g) {
var w = polish(0x3A2414);
trB(g, 1.3, 0.75, 0.48, w, 0, 0.375, 0);
trB(g, 1.24, 0.04, 0.44, w, 0, 0.77, 0);
trB(g, 1.2, 0.6, 0.4, M(0x4AA0C8, "glass"), 0, 1.1, 0);
trB(g, 1.2, 0.08, 0.4, M(0xD8C8A0), 0, 0.83, 0);
trB(g, 1.22, 0.04, 0.42, M(0x222222), 0, 1.42, 0);
face(g, texMat("wgv-tankback", 128, 64, function (x, W, H) {
var gr = x.createLinearGradient(0, 0, 0, H);
gr.addColorStop(0, "#2A6A9A");
gr.addColorStop(1, "#0E3A5A");
x.fillStyle = gr;
x.fillRect(0, 0, W, H);
x.fillStyle = "#3A7A4A";
for (var i = 0; i < 12; i++) {
x.fillRect(i * 11 + 3, H - 10 - (i * 7) % 30, 3, 40);
}
}), 1.18, 0.58, 0, 1.1, -0.19);
[[-0.3, 1.1, 0xF08A2A], [0.1, 1.2, 0xF0D040], [0.35, 1.0, 0xE84A4A], [-0.1, 0.98, 0x4AA0F0], [0.25, 1.28, 0xF08A2A]].forEach(function (f) { trS(g, 0.035, M(f[2]), f[0], f[1], 0.02, 1.6, 0.8, 0.6); });
for (var k = 0; k < 6; k++)
trB(g, 0.03, 0.18 + (k % 3) * 0.08, 0.03, M(0x4A8A4A), -0.5 + k * 0.2, 0.95 + (k % 3) * 0.04, -0.1);
});
gapPiece("wgvcoat", 0.7, 0.6, true, function (g) {
var w = polish(0x3A2010);
cyl(g, 0.03, 0.04, 1.8, w, -0.12, 0.9, 0, 8);
[0, 1.57, 3.14, 4.71].forEach(function (a) {
trB(g, 0.3, 0.03, 0.04, w, -0.12 + Math.cos(a) * 0.12, 0.06, Math.sin(a) * 0.12, 0, -a, 0);
trB(g, 0.04, 0.03, 0.18, w, -0.12 + Math.cos(a) * 0.08, 1.72, Math.sin(a) * 0.08, 0.6, -a, 0);
});
trB(g, 0.3, 0.8, 0.14, M(0x2A3A5A), -0.12, 1.25, 0.12);
trS(g, 0.12, M(0x3A2A1A), -0.12, 1.86, 0, 1, 0.45, 1);
cyl(g, 0.15, 0.15, 0.01, M(0x3A2A1A), -0.12, 1.82, 0, 14);
cyl(g, 0.11, 0.1, 0.5, M(0x5A6A5A, "shine"), 0.2, 0.25, 0.05, 12);
cyl(g, 0.01, 0.01, 0.8, M(0x1A1A1A), 0.18, 0.6, 0.05, 6);
cyl(g, 0.012, 0.012, 0.75, M(0x6A1A2A), 0.23, 0.58, 0.03, 6);
});
gapPiece("wgvjigsaw", 1.6, 1.6, true, function (g) {
var w = polish(0x5A3018);
[[-0.38, -0.38], [0.38, -0.38], [-0.38, 0.38], [0.38, 0.38]].forEach(function (p) { cyl(g, 0.025, 0.02, 0.72, w, p[0], 0.36, p[1], 8); });
trB(g, 0.9, 0.04, 0.9, M(0x2E5A3A), 0, 0.74, 0);
face(g, jigsaw(), 0.62, 0.5, 0.02, 0.765, -0.05, 0).rotation.x = -Math.PI / 2;
trB(g, 0.22, 0.06, 0.16, M(0xE8D8B0), 0.32, 0.79, 0.3);
for (var i = 0; i < 10; i++)
trB(g, 0.035, 0.004, 0.035, M([0x8AB8E0, 0x6A9A58, 0xB8483E][i % 3]), -0.32 + (i % 5) * 0.05, 0.765, 0.32 + Math.floor(i / 5) * 0.05);
chair(g, SAGE(), 0, -0.72, 0);
chair(g, SAGE(), 0, 0.72, Math.PI);
});
gapPiece("wgvsideboard", 2.0, 0.55, true, function (g) {
var w = polish(0x4A2414), s = M(0xD8DCE0, "shine");
[[-0.92, -0.2], [0.92, -0.2], [-0.92, 0.2], [0.92, 0.2]].forEach(function (p) { cyl(g, 0.03, 0.025, 0.2, w, p[0], 0.1, p[1], 8); });
trB(g, 1.96, 0.7, 0.5, w, 0, 0.55, 0);
trB(g, 2.02, 0.04, 0.56, w, 0, 0.92, 0);
for (var i = 0; i < 3; i++) {
trB(g, 0.6, 0.56, 0.01, polish(0x5A2E18), -0.64 + i * 0.64, 0.55, 0.255);
trS(g, 0.02, brass(), -0.64 + i * 0.64, 0.62, 0.27);
}
trB(g, 1.8, 0.01, 0.3, white(), 0, 0.945, 0);
trS(g, 0.09, s, -0.6, 1.04, 0, 1, 0.9, 1);
trS(g, 0.07, s, -0.38, 1.02, 0.02);
trS(g, 0.06, s, -0.78, 1.01, 0.03);
cyl(g, 0.16, 0.16, 0.01, s, -0.58, 0.955, 0, 16);
cyl(g, 0.05, 0.07, 0.04, s, 0.55, 0.96, 0, 10);
cyl(g, 0.012, 0.012, 0.36, s, 0.55, 1.15, 0, 6);
[-0.12, 0, 0.12].forEach(function (dx) { trB(g, 0.14, 0.012, 0.012, s, 0.55 + dx / 2, 1.28, 0); cyl(g, 0.012, 0.012, 0.14, M(0xF8F2E0), 0.55 + dx, 1.36, 0, 6); trS(g, 0.012, glow(0xFFD070), 0.55 + dx, 1.44, 0); });
cyl(g, 0.08, 0.06, 0.18, china(), 0.1, 1.03, -0.06, 12);
flowers(g, 0.1, 1.16, -0.06, 0.15, 13);
cyl(g, 0.14, 0.14, 0.01, china(), 0.85, 1.1, -0.2, 16).rotation.x = Math.PI / 2 - 0.2;
});
gapPiece("wgvdresser", 1.2, 0.9, true, function (g) {
var w = polish(0x7A4A28), mi = mirror();
trB(g, 1.1, 0.08, 0.48, w, 0, 0.74, -0.12);
trB(g, 0.34, 0.66, 0.44, w, -0.38, 0.37, -0.12);
trB(g, 0.34, 0.66, 0.44, w, 0.38, 0.37, -0.12);
[0.2, 0.42, 0.6].forEach(function (y) { trS(g, 0.015, brass(), -0.38, y, 0.11); trS(g, 0.015, brass(), 0.38, y, 0.11); });
trB(g, 0.5, 0.72, 0.03, w, 0, 1.18, -0.33);
face(g, mi, 0.44, 0.64, 0, 1.18, -0.31);
var l = new THREE.Group();
trB(l, 0.26, 0.6, 0.03, w, 0.13, 0, 0);
face(l, mi, 0.22, 0.52, 0.13, 0, 0.016);
l.position.set(-0.25, 1.16, -0.33);
l.rotation.y = 0.5;
g.add(l);
var r = new THREE.Group();
trB(r, 0.26, 0.6, 0.03, w, -0.13, 0, 0);
face(r, mi, 0.22, 0.52, -0.13, 0, 0.016);
r.position.set(0.25, 1.16, -0.33);
r.rotation.y = -0.5;
g.add(r);
trB(g, 0.9, 0.006, 0.36, white(), 0, 0.783, -0.12);
cyl(g, 0.03, 0.035, 0.1, M(0xE8A0C0, "glass"), -0.3, 0.83, -0.1, 10);
cyl(g, 0.025, 0.03, 0.08, M(0xA0C8E8, "glass"), -0.22, 0.82, -0.05, 10);
trB(g, 0.18, 0.08, 0.12, M(0x7A2028), 0.3, 0.83, -0.12);
trB(g, 0.05, 0.02, 0.16, M(0xD8C8A8), 0.08, 0.795, -0.04);
trB(g, 0.5, 0.1, 0.34, ROSE(), 0, 0.48, 0.28);
[[-0.2, 0.16], [0.2, 0.16], [-0.2, 0.4], [0.2, 0.4]].forEach(function (p) { cyl(g, 0.02, 0.015, 0.43, w, p[0], 0.215, p[1], 6); });
});
gapPiece("wgvbird", 0.6, 0.6, true, function (g) {
var b = brass();
cyl(g, 0.2, 0.24, 0.03, b, 0, 0.015, 0, 12);
cyl(g, 0.02, 0.02, 1.2, b, 0, 0.6, 0, 8);
cyl(g, 0.22, 0.22, 0.03, b, 0, 1.22, 0, 16);
for (var i = 0; i < 14; i++) {
var a = i * Math.PI / 7;
cyl(g, 0.004, 0.004, 0.5, b, Math.cos(a) * 0.21, 1.48, Math.sin(a) * 0.21, 4);
}
var dome = new THREE.Mesh(new THREE.SphereGeometry(0.22, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), M(0xC9A040, "shine"));
dome.position.y = 1.72;
dome.material = M(0xC9A040, "shine");
dome.scale.y = 0.6;
g.add(dome);
cyl(g, 0.004, 0.004, 0.36, b, 0, 1.44, 0, 4).rotation.z = Math.PI / 2;
trS(g, 0.04, M(0x6AC84A), -0.07, 1.5, 0, 1, 1.3, 1);
trS(g, 0.025, M(0xF0E060), -0.07, 1.56, 0.01);
trS(g, 0.04, M(0x5AA0E8), 0.07, 1.5, 0, 1, 1.3, 1);
trS(g, 0.025, M(0xF4F4F4), 0.07, 1.56, 0.01);
});
gapPiece("wgvglobe", 0.7, 0.7, true, function (g) {
var w = polish(0x5A3018);
[0, 2.09, 4.19].forEach(function (a) { trB(g, 0.04, 0.7, 0.04, w, Math.cos(a) * 0.22, 0.35, Math.sin(a) * 0.22, 0, -a, Math.cos(a) * 0.2); });
cyl(g, 0.34, 0.34, 0.04, w, 0, 0.72, 0, 24);
var gl = new THREE.Mesh(new THREE.SphereGeometry(0.28, 20, 14), texMat("wgv-globe", 128, 64, function (x, W, H) {
x.fillStyle = "#C8B888";
x.fillRect(0, 0, W, H);
x.fillStyle = "#8A7A4A";
[[20, 20, 22, 14], [30, 40, 10, 14], [60, 18, 26, 12], [70, 34, 12, 16], [100, 40, 12, 8], [100, 18, 14, 10]].forEach(function (c) { x.beginPath(); x.ellipse(c[0], c[1], c[2] / 2, c[3] / 2, 0.3, 0, 7); x.fill(); });
x.strokeStyle = "rgba(90,60,30,0.4)";
for (var i = 0; i < W; i += 16) {
x.beginPath();
x.moveTo(i, 0);
x.lineTo(i, H);
x.stroke();
}
}));
gl.position.y = 0.9;
gl.rotation.z = 0.4;
g.add(gl);
var ring = new THREE.Mesh(new THREE.TorusGeometry(0.31, 0.012, 6, 24), brass());
ring.position.y = 0.9;
ring.rotation.set(0, Math.PI / 2, 0.4);
g.add(ring);
});
gapPiece("wgvbooks", 1.6, 0.45, true, function (g) {
var w = polish(0x4A2A14);
trB(g, 1.6, 0.14, 0.44, w, 0, 0.07, 0);
trB(g, 1.56, 2.0, 0.04, w, 0, 1.14, -0.2);
trB(g, 0.06, 2.1, 0.42, w, -0.77, 1.12, 0);
trB(g, 0.06, 2.1, 0.42, w, 0.77, 1.12, 0);
trB(g, 1.66, 0.1, 0.46, w, 0, 2.2, 0);
face(g, books(), 1.48, 1.96, 0, 1.13, -0.17);
[0.14, 0.62, 1.1, 1.58, 2.06].forEach(function (y) { trB(g, 1.5, 0.025, 0.4, w, 0, y, 0); });
trB(g, 0.04, 1.96, 0.03, w, 0, 1.13, 0.2);
trB(g, 1.5, 1.96, 0.008, glass(), 0, 1.13, 0.205);
trS(g, 0.015, brass(), -0.06, 1.1, 0.22);
trS(g, 0.015, brass(), 0.06, 1.1, 0.22);
});
gapPiece("wgvphotos", 1.4, 0.06, false, function (g) {
var y0 = 1.55, n = 0;
[[-0.5, 0.2, 0.22, 0.3], [-0.2, 0.32, 0.18, 0.24], [0.05, 0.12, 0.26, 0.34], [0.35, 0.3, 0.2, 0.26], [0.55, 0.05, 0.16, 0.2], [-0.42, -0.15, 0.2, 0.16], [0.2, -0.18, 0.3, 0.2]].forEach(function (f) {
trB(g, f[2] + 0.04, f[3] + 0.04, 0.025, (n % 3) ? polish(0x3A2010) : brass(), f[0], y0 + f[1], 0.012);
face(g, photo(n++), f[2], f[3], f[0], y0 + f[1], 0.026);
});
});
gapPiece("wgvbed", 1.7, 2.25, true, function (g) {
var w = polish(0x6A3A20), q = quilt();
trB(g, 1.6, 0.36, 2.05, w, 0, 0.26, 0);
trB(g, 1.52, 0.24, 1.98, white(), 0, 0.55, 0.02);
trB(g, 1.62, 0.08, 1.6, q, 0, 0.7, 0.22);
trB(g, 1.62, 0.36, 0.04, q, 0, 0.52, 1.03);
trB(g, 0.04, 0.36, 1.6, q, -0.81, 0.52, 0.22);
trB(g, 0.04, 0.36, 1.6, q, 0.81, 0.52, 0.22);
trB(g, 0.6, 0.16, 0.4, white(), -0.38, 0.76, -0.72);
trB(g, 0.6, 0.16, 0.4, white(), 0.38, 0.76, -0.72);
trB(g, 0.42, 0.14, 0.3, M(0xC8606E), 0, 0.8, -0.56);
trB(g, 1.66, 0.06, 0.5, M(0x7A9A68), 0, 0.76, 0.72);
trB(g, 1.72, 1.3, 0.08, w, 0, 0.65, -1.04);
cyl(g, 0.86, 0.86, 0.08, w, 0, 1.2, -1.04, 24, 0).rotation.x = Math.PI / 2;
g.children[g.children.length - 1].scale.set(1, 1, 0.4);
trB(g, 1.5, 0.7, 0.02, ROSE(), 0, 0.98, -0.99);
cyl(g, 0.05, 0.05, 1.3, w, -0.82, 0.65, -1.04, 10);
cyl(g, 0.05, 0.05, 1.3, w, 0.82, 0.65, -1.04, 10);
trS(g, 0.07, brass(), -0.82, 1.34, -1.04);
trS(g, 0.07, brass(), 0.82, 1.34, -1.04);
trB(g, 1.72, 0.62, 0.06, w, 0, 0.42, 1.06);
cyl(g, 0.04, 0.04, 0.7, w, -0.82, 0.35, 1.06, 10);
cyl(g, 0.04, 0.04, 0.7, w, 0.82, 0.35, 1.06, 10);
});
gapPiece("wgvhearth", 2.0, 0.6, true, function (g) {
var mb = M(0xEDE8E0, "shine"), dk = M(0x1A1410);
trB(g, 2.0, 0.06, 0.7, M(0x3A3A3A, "shine"), 0, 0.03, 0.12);
trB(g, 0.34, 1.2, 0.4, mb, -0.78, 0.6, 0);
trB(g, 0.34, 1.2, 0.4, mb, 0.78, 0.6, 0);
trB(g, 1.24, 0.26, 0.4, mb, 0, 1.07, 0);
trB(g, 2.06, 0.08, 0.5, mb, 0, 1.24, 0.02);
trB(g, 1.22, 0.94, 0.06, dk, 0, 0.47, -0.17);
trB(g, 0.9, 0.7, 0.3, M(0x2A2420), 0, 0.4, -0.06);
trB(g, 0.62, 0.06, 0.2, M(0x2A2A2A), 0, 0.12, 0.0);
trS(g, 0.13, glow(0xFF9A3A), -0.1, 0.24, -0.02, 1.2, 0.9, 0.8);
trS(g, 0.1, glow(0xFFC24A), 0.12, 0.22, 0, 1, 1.2, 0.8);
trS(g, 0.07, glow(0xFFF0A0), 0, 0.2, 0.04);
trB(g, 1.24, 0.06, 0.04, brass(), 0, 0.1, 0.38);
cyl(g, 0.012, 0.012, 0.6, brass(), 0.95, 0.3, 0.3, 6);
cyl(g, 0.012, 0.012, 0.6, brass(), 1.0, 0.3, 0.32, 6);
trB(g, 1.5, 1.1, 0.06, polish(0xC9A040), 0, 1.86, -0.17);
face(g, mirror(), 1.36, 0.96, 0, 1.86, -0.135);
trB(g, 0.34, 0.26, 0.12, polish(0x4A2414), 0, 1.41, 0.0);
face(g, clockFace(), 0.16, 0.16, 0, 1.42, 0.062);
[-0.7, 0.7].forEach(function (x) { cyl(g, 0.04, 0.05, 0.24, brass(), x, 1.4, 0.04, 8); cyl(g, 0.015, 0.015, 0.14, M(0xF8F2E0), x, 1.59, 0.04, 6); trS(g, 0.015, glow(0xFFD070), x, 1.67, 0.04); });
cyl(g, 0.05, 0.04, 0.12, M(0x3A5A8A, "shine"), -0.4, 1.34, 0.04, 10);
flowers(g, -0.4, 1.44, 0.04, 0.1, 5);
frames(g, 1.28, 0.1, 2, 0.34);
});
gapPiece("wgvrocker", 0.8, 1.0, true, function (g) {
var w = polish(0x6A3A1A);
[-0.25, 0.25].forEach(function (x) {
for (var k = -3; k <= 3; k++) {
var a = k * 0.12;
trB(g, 0.04, 0.035, 0.17, w, x, 0.06 + 0.85 * (1 - Math.cos(a)), Math.sin(a) * 0.85, a, 0, 0);
}
cyl(g, 0.02, 0.02, 0.45, w, x, 0.28, 0.2, 6);
cyl(g, 0.02, 0.02, 1.0, w, x, 0.55, -0.22, 6);
});
trB(g, 0.54, 0.05, 0.48, w, 0, 0.47, 0);
trB(g, 0.52, 0.06, 0.44, BLUE(), 0, 0.51, 0.01);
for (var i = 0; i < 5; i++)
cyl(g, 0.012, 0.012, 0.6, w, -0.2 + i * 0.1, 0.82, -0.24, 6);
trB(g, 0.56, 0.08, 0.04, w, 0, 1.08, -0.24);
trB(g, 0.5, 0.6, 0.03, texMat("wgv-afghan", 64, 64, function (x, W, H) { for (var i = 0; i < 4; i++)
for (var j = 0; j < 4; j++) {
x.fillStyle = ["#E86A6A", "#F0D060", "#6AA0D8", "#7AC07A"][(i + j) % 4];
x.fillRect(i * 16, j * 16, 16, 16);
x.fillStyle = "#2A2A2A";
x.fillRect(i * 16 + 5, j * 16 + 5, 6, 6);
} }), 0, 0.8, -0.21, 0.15);
});
gapPiece("wgvflamp", 0.5, 0.5, true, function (g) {
var b = brass();
cyl(g, 0.18, 0.2, 0.04, b, 0, 0.02, 0, 14);
cyl(g, 0.022, 0.022, 1.45, b, 0, 0.75, 0, 8);
cyl(g, 0.16, 0.3, 0.32, glow(0xFFE2B0), 0, 1.58, 0, 16);
cyl(g, 0.31, 0.31, 0.05, M(0xC8A060), 0, 1.41, 0, 16);
});
gapPiece("wgvsconce", 0.3, 0.2, false, function (g) {
var b = brass();
trB(g, 0.12, 0.2, 0.03, b, 0, 2.2, 0.015);
cyl(g, 0.012, 0.012, 0.18, b, 0, 2.24, 0.1, 6).rotation.x = Math.PI / 2;
cyl(g, 0.05, 0.09, 0.13, glow(0xFFE6B8), 0, 2.32, 0.18, 12);
trS(g, 0.02, b, 0, 2.24, 0.18);
});
gapPiece("wgvcoffee", 1.1, 0.65, true, function (g) {
var w = polish(0x5A3018);
[[-0.46, -0.24], [0.46, -0.24], [-0.46, 0.24], [0.46, 0.24]].forEach(function (p) { cyl(g, 0.025, 0.02, 0.42, w, p[0], 0.21, p[1], 8); });
trB(g, 1.06, 0.04, 0.6, w, 0, 0.44, 0);
cyl(g, 0.2, 0.2, 0.005, white(), 0, 0.465, 0, 18);
[[-0.3, 0.1], [0.3, -0.1]].forEach(function (p) { cyl(g, 0.06, 0.06, 0.008, china(), p[0], 0.468, p[1], 12); cyl(g, 0.04, 0.03, 0.05, china(), p[0], 0.495, p[1], 10); });
trB(g, 0.3, 0.012, 0.22, M(0xE8E4DA), 0.25, 0.468, 0.12, 0, 0.3, 0);
trB(g, 0.2, 0.03, 0.14, M(0x2A4A7A), -0.28, 0.48, -0.15);
});
gapPiece("wgvtable", 2.0, 2.0, true, function (g) {
cyl(g, 0.55, 0.62, 0.74, white(), 0, 0.38, 0, 20);
cyl(g, 0.56, 0.56, 0.02, M(0xF8F6F0), 0, 0.76, 0, 22);
[[0, 0.38], [0, -0.38], [0.38, 0], [-0.38, 0]].forEach(function (p) {
cyl(g, 0.11, 0.11, 0.01, china(), p[0] * 0.95, 0.775, p[1] * 0.95, 16);
cyl(g, 0.07, 0.07, 0.012, M(0xF4F6FA, "shine"), p[0] * 0.95, 0.784, p[1] * 0.95, 14);
trB(g, 0.02, 0.005, 0.16, M(0xD8DCE0, "shine"), p[0] * 0.95 + (p[1] ? 0.15 : 0), 0.775, p[1] * 0.95 + (p[0] ? 0.15 : 0));
cyl(g, 0.03, 0.025, 0.1, glass(), p[0] * 0.6, 0.82, p[1] * 0.6, 8);
});
cyl(g, 0.04, 0.05, 0.12, M(0x3A5A8A, "shine"), 0, 0.83, 0, 10);
flowers(g, 0, 0.92, 0, 0.1, 9);
cyl(g, 0.04, 0.04, 0.004, M(0xC8A060), 0.12, 0.773, 0.12, 8);
chair(g, M(0x7A2E34), 0, 0.8, Math.PI);
chair(g, M(0x7A2E34), 0, -0.8, 0);
chair(g, M(0x7A2E34), 0.8, 0, -Math.PI / 2);
chair(g, M(0x7A2E34), -0.8, 0, Math.PI / 2);
});
gapPiece("wgvpiano", 1.6, 1.1, true, function (g) {
var w = polish(0x2A1408);
trB(g, 1.5, 1.28, 0.6, w, 0, 0.64, -0.2);
trB(g, 1.46, 0.06, 0.3, w, 0, 0.76, 0.2);
trB(g, 1.36, 0.03, 0.18, M(0xFBF8EE), 0, 0.8, 0.17);
for (var i = 0; i < 26; i++)
trB(g, 0.018, 0.02, 0.1, M(0x111111), -0.65 + i * 0.052 + ((i % 7 === 2 || i % 7 === 6) ? 0.5 : 0) * 0, 0.825, 0.12);
[-0.66, 0.66].forEach(function (x) { trB(g, 0.06, 0.7, 0.4, w, x, 0.35, 0.15); });
trB(g, 0.5, 0.36, 0.01, M(0xF4EEDC), 0, 1.06, 0.1, -0.25);
trB(g, 1.36, 0.04, 0.06, w, 0, 0.9, 0.12);
frames(g, 1.28, -0.25, 4, -0.5);
[-0.55, 0.55].forEach(function (x) { trB(g, 0.04, 0.04, 0.12, brass(), x, 1.0, 0.12); cyl(g, 0.012, 0.012, 0.12, M(0xF8F2E0), x, 1.08, 0.17, 6); trS(g, 0.012, glow(0xFFD070), x, 1.15, 0.17); });
trB(g, 0.7, 0.06, 0.36, M(0x6A2028), 0, 0.5, 0.6);
[[-0.3, 0.46], [0.3, 0.46], [-0.3, 0.74], [0.3, 0.74]].forEach(function (p) { cyl(g, 0.025, 0.02, 0.47, w, p[0], 0.235, p[1], 6); });
});
gapPiece("wgvpew", 2.6, 0.7, true, function (g) {
var w = polish(0x7A4A24);
[-1.27, 1.27].forEach(function (x) { trB(g, 0.07, 0.95, 0.62, w, x, 0.475, 0); var t = cyl(g, 0.31, 0.31, 0.07, w, x, 0.95, 0, 16); t.rotation.z = Math.PI / 2; });
trB(g, 2.5, 0.05, 0.42, w, 0, 0.45, 0.06);
trB(g, 2.44, 0.06, 0.38, M(0x8A2028), 0, 0.5, 0.06);
trB(g, 2.5, 0.5, 0.04, w, 0, 0.75, -0.2);
trB(g, 2.54, 0.06, 0.08, w, 0, 1.02, -0.2);
trB(g, 2.4, 0.03, 0.14, w, 0, 0.78, -0.29);
for (var i = 0; i < 8; i++)
trB(g, 0.05, 0.18, 0.12, M([0x2A1A40, 0x7A2028, 0x1F3A2A][i % 3]), -1.0 + i * 0.28, 0.88, -0.29);
trB(g, 2.4, 0.04, 0.2, w, 0, 0.12, 0.12);
});
})();
