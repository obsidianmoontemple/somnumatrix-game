/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var GNUG = { n: 0, at: 0, busy: false, open: false, known: null };
function goldLoad(force) {
if (GNUG.busy || (!force && Date.now() - GNUG.at < 60000) || !(typeof signedIn === "function" && signedIn()))
return;
GNUG.busy = true;
GNUG.at = Date.now();
cityRpc("my_gold_finds", {}).then(function (d) {
GNUG.busy = false;
if (!d || !d.ok)
return;
if (GNUG.known !== null && d.nuggets > GNUG.known)
setStatus("<b>Gold!</b> You turned up a gold nugget in the seam. Sell it at the City Treasury: the city pays you, and the nugget goes into its coffers.");
GNUG.known = d.nuggets;
GNUG.n = d.nuggets;
GNUG.pay = d.pay;
GNUG.worth = d.worth;
goldPaint();
}).catch(function () { GNUG.busy = false; });
}
(function () {
if (typeof cityRpc !== "function")
return;
var cr = cityRpc;
cityRpc = function (name, body) {
var p = cr.apply(this, arguments);
if (name === "do_task" && body) {
var j = ((typeof WORK !== "undefined" && WORK.data && WORK.data.jobs) || []).filter(function (x) { return x.job_id === body.p_job; })[0];
if (j && j.title === "Miner")
p.then(function (o) { if (o && o.ok)
setTimeout(function () { goldLoad(true); }, 400); }).catch(function () { });
}
return p;
};
})();
function goldPaint() {
var b = document.getElementById("gold-btn");
var show = GNUG.n > 0 && (typeof careInCity === "function") && (careInCity() || (store.inside && typeof INT !== "undefined" && INT && INT.spec && INT.spec.city));
if (!b) {
if (!show || !document.body)
return;
b = document.createElement("button");
b.id = "gold-btn";
b.type = "button";
b.style.cssText = "position:fixed;right:12px;bottom:calc(140px + env(safe-area-inset-bottom,0px));z-index:45;background:rgba(10,12,18,.92);color:#F2D27A;border:1px solid #C9A040;border-radius:3px;padding:9px 13px;font:13px var(--sans);cursor:pointer";
b.onclick = goldNuggetSell;
document.body.appendChild(b);
}
b.style.display = show ? "block" : "none";
b.textContent = "Gold nuggets: " + GNUG.n;
}
function goldNuggetSell() { return __ZC(143, 0, this, arguments, new.target); }
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick, acc = 0;
transitTick = function (dt) { tt.apply(this, arguments); if ((acc += dt) > 2) {
acc = 0;
try {
if (typeof careInCity === "function" && (careInCity() || store.inside))
goldLoad(false);
goldPaint();
csTick();
}
catch (e) { }
} };
})();
var CS_KEY = "The Community Service Office";
cityWorkplace({ key: CS_KEY, ring: "commons", arch: "shop", s: 1.4, jobs: [1640, 1641], fit: ["desk", "filecabinet", "noticeboard", "crates"],
note: "Community service orders from the court, and the officers who see them worked off about the city." });
cityMore("xcs", function (C) { cityFrontage(C, CS_KEY, 1620, 4) || cityFrontage(C, CS_KEY, 1620, 1, [-1]) || cityFrontage(C, CS_KEY, 1420, 5) || cityFrontage(C, CS_KEY, 1280, 2); });
var CS_TASKS = [["Sweep the streets", "a broom along a stretch of street"], ["Pick up litter in the parks", "a sack and a litter picker"], ["Paint over graffiti", "a pot of paint and a brush"],
["Help at the soup kitchen", "an apron, serving at the Warrens soup kitchen"], ["Clear the gutters", "a shovel and a barrow"], ["Tidy the library shelves", "putting the returned books back"]];
var CS = { order: null, at: 0, busy: false, open: false, run: null, msg: "", officer: false };
function csLoad(force) {
if (CS.busy || (!force && Date.now() - CS.at < 60000) || !(typeof signedIn === "function" && signedIn()))
return;
CS.busy = true;
CS.at = Date.now();
cityRpc("my_community_service", {}).then(function (d) { CS.busy = false; if (d && d.ok) {
CS.order = d.order || null;
CS.officer = !!d.officer;
CS.orders = d.orders || [];
CS.judge = !!d.judge;
} csButton(); if (CS.open)
csPaint(); })
.catch(function () { CS.busy = false; });
}
function csButton() {
var b = document.getElementById("cs-btn");
var show = (!!CS.order || CS.officer || CS.judge || (typeof amKeeper === "function" && amKeeper())) && (typeof careInCity === "function") && (careInCity() || store.inside);
if (!b) {
if (!show || !document.body)
return;
b = document.createElement("button");
b.id = "cs-btn";
b.type = "button";
b.textContent = "Community service";
b.style.cssText = "position:fixed;right:12px;bottom:calc(184px + env(safe-area-inset-bottom,0px));z-index:45;background:rgba(10,12,18,.92);color:var(--bone);border:1px solid #8EB84A;border-radius:3px;padding:9px 13px;font:13px var(--sans);cursor:pointer";
b.onclick = function () { CS.open = !CS.open; if (CS.open)
csLoad(true); csPaint(); };
document.body.appendChild(b);
}
b.style.display = show ? "block" : "none";
if (!show && CS.open) {
CS.open = false;
csPaint();
}
}
function csTick() {
if (typeof careInCity === "function" && (careInCity() || store.inside))
csLoad(false);
else
csButton();
var R = CS.run;
if (!R)
return;
var P = camera.position;
if (Math.hypot(P.x - R.x, P.z - R.z) > 40) {
CS.run = null;
CS.msg = "You walked away from the work: start it again where you are.";
if (CS.open)
csPaint();
return;
}
if (Date.now() >= R.until) {
CS.run = null;
CS.msg = "Reporting the work…";
if (CS.open)
csPaint();
cityRpc("serve_community", { p_task: R.task }).then(function (o) { CS.msg = (o && o.say) || ""; setStatus(esc(CS.msg)); csLoad(true); }).catch(function (e) { CS.msg = e.message; csPaint(); });
}
else if (CS.open)
csPaint();
}
function csPaint() { return __ZC(143, 1, this, arguments, new.target); }
function csClick(e) { return __ZC(143, 2, this, arguments, new.target); }
