/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var BILL_KEY = "Somnucor Insurance Brokers";
var BILL = { data: null, at: 0, busy: false, missing: false, first: true, seen: {}, warned: {}, dark: {}, darkAt: 0, darkBusy: false, open: {},
ins: { open: false, line: "health", q: null, lot: null, msg: "", busy: false }, lastIn: null, crashAt: 0, hospSaid: 0 };
cityWorkplace({ key: BILL_KEY, ring: "markets", arch: "bank", s: 0.85, jobs: [1900, 1901, 1902, 1903, 1904], fit: ["desk", "desk", "filecabinet", "noticeboard", "benchin"],
note: "Insurance for people, vehicles and homes. Compare three insurers' quotes with a broker." });
cityMore("xib", function (C) { cityFrontage(C, BILL_KEY, 1080, 9) || cityFrontage(C, BILL_KEY, 1080, 15) || cityFrontage(C, BILL_KEY, 1080, 4); });
(function () {
if (typeof FURN === "undefined" || typeof trM !== "function" || FURN.billdesk)
return;
FURN.billdesk = function () {
var g = FURN.desk ? FURN.desk() : new THREE.Group();
var G = new THREE.Group();
G.add(g);
trB(G, 0.36, 0.03, 0.26, trM(0x2E4A6A), -0.25, 0.8, -0.05);
trB(G, 0.32, 0.08, 0.24, trM(0x8A6A44, "wood"), 0.42, 0.83, -0.12);
trB(G, 0.3, 0.02, 0.22, trM(0xF2EEE2), 0.42, 0.88, -0.12);
trC(G, 0.07, 0.09, 0.03, 12, TR_BRASS(), -0.55, 0.8, -0.2);
trC(G, 0.012, 0.012, 0.36, 6, TR_BRASS(), -0.55, 0.98, -0.2);
trC(G, 0.05, 0.11, 0.12, 12, trM(0x2E5A3A, null, "shine"), -0.5, 1.16, -0.16, 0.5, 0, 0);
return trDone(G);
};
if (typeof SOLIDFURN !== "undefined")
SOLIDFURN.billdesk = 1;
if (typeof TR_BOX !== "undefined")
TR_BOX.billdesk = [1.4, 0.7];
})();
if (typeof TR !== "undefined")
TR[BILL_KEY] = function (K) { return __ZC(241, 0, this, arguments, new.target); };
if (typeof ROOMNAME !== "undefined")
ROOMNAME["tr:" + BILL_KEY] = "Insurance Brokers";
try {
if (typeof TEMP_PREFER !== "undefined")
TEMP_PREFER.unshift([/broker's receptionist/i, /trtill|trcounter/], [/claims adjuster|underwriter/i, /billdesk|filecabinet/], [/principal broker|insurance broker/i, /^desk$/]);
}
catch (e) { }
(function () {
if (typeof tsTick !== "function")
return;
var tt = tsTick;
tsTick = function () {
if (typeof INT !== "undefined" && INT && INT.spec && INT.spec.workplace === BILL_KEY && typeof tsPrompt === "function") {
tsPrompt("<b>Somnucor Insurance Brokers</b> · <b>press E</b> (or tap here) for quotes and your policies", function () { billInsOpen(); });
return;
}
return tt.apply(this, arguments);
};
})();
function billErr(e) { if (typeof rpcMissing === "function" && rpcMissing(e)) {
BILL.missing = true;
return "Bills open soon.";
} return String((e && e.message) || e || ""); }
function billShow() { return typeof postShow === "function" && postShow(); }
function billLoad(force) {
if (!(typeof signedIn === "function" && signedIn()) || BILL.busy)
return Promise.resolve(BILL.data);
if (!force && (Date.now() - BILL.at < 90000 || (BILL.missing && Date.now() - BILL.at < 600000)))
return Promise.resolve(BILL.data);
BILL.busy = true;
BILL.at = Date.now();
return cityRpc("my_bills", {}).then(function (d) { BILL.busy = false; BILL.missing = false; billGot(d); return d; })
.catch(function (e) { BILL.busy = false; var m = billErr(e); if (!BILL.data)
BILL.data = { ok: false, say: m }; billRepaint(); return BILL.data; });
}
function billGot(d) { return __ZC(241, 1, this, arguments, new.target); }
function billRepaint() {
if (typeof POST !== "undefined" && POST.open && (POST.tab === "bills" || POST.reading))
postPaint();
if (BILL.ins.open)
billInsPaint();
}
function billG(n) { return (Number(n) || 0).toLocaleString() + " gold"; }
function billDay(t) { if (!t)
return ""; var d = new Date(t); if (!isFinite(d.getTime()))
return ""; return d.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" }); }
function billDim(t) { return '<span style="color:var(--dim)">' + t + '</span>'; }
function billBtn(attr, label, extra) { return '<button class="btn" data-bill="' + attr + '"' + (extra || "") + '>' + label + '</button>'; }
function billSay(p, after) { return __ZC(241, 2, this, arguments, new.target); }
var BILL_KIND = { hospital: "Hospital", premium: "Insurance", power: "Power", water: "Water", reconnect: "Reconnection", vehicle: "Crash repairs", home: "Home" };
function billHtml() { return __ZC(241, 3, this, arguments, new.target); }
function billRowHtml(b) { return __ZC(241, 4, this, arguments, new.target); }
(function () {
if (typeof postPaint !== "function")
return;
var pp = postPaint;
postPaint = function () {
var r = pp.apply(this, arguments);
try {
var el = document.getElementById("post-panel");
if (el && POST.open) {
var box = el.querySelector('[data-p="tab:box"]');
if (box && !el.querySelector('[data-p="tab:bills"]')) {
var d = BILL.data, n = d && d.ok ? (d.bills || []).filter(function (b) { return b.status === "open" && b.owed > 0; }).length : 0;
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-p", "tab:bills");
b.textContent = n ? "Bills (" + n + ")" : "Bills";
b.style.cssText = POST.tab === "bills" ? "border-color:#C9A040;color:#F4E6C0" : "opacity:.8";
box.parentNode.insertBefore(b, box.nextSibling);
}
}
}
catch (e) { }
return r;
};
if (typeof postRoundHtml === "function") {
var pr = postRoundHtml;
postRoundHtml = function () { if (POST.tab === "bills") {
try {
return billHtml();
}
catch (e) {
return billDim(esc(String(e)));
}
} return pr.apply(this, arguments); };
}
if (typeof postBoxHtml === "function") {
var pb = postBoxHtml;
postBoxHtml = function (d) {
var h = pb.apply(this, arguments);
try {
var r = POST.reading;
if (!r || !r.id)
return h;
var bd = BILL.data, bill = null;
if (bd && bd.ok)
(bd.bills || []).forEach(function (b) { if ((b.letters || []).some(function (m) { return Number(m) === Number(r.id); }))
bill = b; });
if (!bill) {
if (/bill|premium|notice|reminder|insur|power|water/i.test(String(r.subject || "")) && Date.now() - BILL.at > 8000)
billLoad(true);
return h;
}
var box = '<div style="margin-top:8px;padding:8px;border:1px solid #C9A040;border-radius:3px">';
if (bill.status === "open" && bill.owed > 0)
box += '<b>Bill no. ' + bill.id + ': ' + billG(bill.owed) + ' to pay</b>, ' + (bill.overdue ? "past due" : "due") + ' ' + esc(billDay(bill.due)) + '.' +
'<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px">' + billBtn("pay:" + bill.id, "Pay " + billG(bill.owed)) + billBtn("part:" + bill.id, "Pay part") + billBtn("tab", "All my bills") + '</div>';
else
box += '<b>Bill no. ' + bill.id + '</b>: ' + (bill.status === "void" ? "cancelled, nothing to pay." : "paid. Thank you.") + ' ' + billBtn("tab", "All my bills");
return h + box + (BILL.msg ? '<div style="margin-top:4px"><b>' + esc(BILL.msg) + '</b></div>' : '') + '</div>';
}
catch (e) {
return h;
}
};
}
if (typeof postClick === "function") {
var pc = postClick;
postClick = function (e) {
var b = e.target && e.target.closest ? e.target.closest("[data-p]") : null;
if (b && b.getAttribute("data-p") === "tab:bills") {
BILL.msg = "";
billLoad(true);
}
return pc.apply(this, arguments);
};
}
})();
function billOpen() { return __ZC(241, 5, this, arguments, new.target); }
document.addEventListener("click", function (e) {
var b = e.target && e.target.closest ? e.target.closest("[data-bill]") : null;
if (!b)
return;
e.stopPropagation();
var a = b.getAttribute("data-bill").split(":"), id = Number(a[1]);
if (a[0] === "tab")
return billOpen();
if (a[0] === "all")
return billSay(cityRpc("bill_pay_all", {}));
if (a[0] === "pay")
return billSay(cityRpc("bill_pay", { p_bill: id, p_gold: null }));
if (a[0] === "claim")
return billSay(cityRpc("bill_claim_vehicle", { p_bill: id }).catch(function (e) {
if (/bill_claim_vehicle|function|404|PGRST/i.test(String(e && e.message || e)))
return { ok: false, say: "Claims on car bills open once the Keeper runs the latest server update." };
throw e;
}));
if (a[0] === "part") {
var bl = billFind(id), s = prompt("How much do you want to pay now? (owed: " + (bl ? bl.owed : "?") + " gold" + (bl && bl.plan_min ? "; the plan asks at least " + bl.plan_min : "") + ")", bl && bl.plan_min ? String(Math.min(bl.plan_min, bl.owed)) : "");
var g = Math.floor(Number(s));
if (!s || !(g > 0))
return;
return billSay(cityRpc("bill_pay", { p_bill: id, p_gold: g }));
}
if (a[0] === "more") {
BILL.open[id] = !BILL.open[id];
billRepaint();
return;
}
if (a[0] === "cancel") {
if (!confirm("Cancel this policy? You will no longer be covered. The days already paid for are refunded."))
return;
return billSay(cityRpc("insurance_cancel", { p_policy: id }), function () { BILL.ins.q = null; });
}
if (a[0] === "ins")
return billInsOpen();
if (a[0] === "insx") {
BILL.ins.open = false;
billInsPaint();
return;
}
if (a[0] === "line") {
BILL.ins.line = a[1];
BILL.ins.q = null;
BILL.ins.msg = "";
billInsQuote();
billInsPaint();
return;
}
if (a[0] === "buy")
return billInsBuy(a.slice(1).join(":"));
if (a[0] === "way") {
BILL.ins.open = false;
billInsPaint();
if (typeof showTheWay === "function")
showTheWay(BILL_KEY);
return;
}
}, true);
function billFind(id) { var d = BILL.data; return d && d.ok ? (d.bills || []).filter(function (b) { return b.id === id; })[0] : null; }
var BILL_LINES = [["health", "Health"], ["vehicle", "Vehicle"], ["home", "Home"], ["mine", "Your policies"]];
function billInsOpen(line) {
BILL.ins.open = true;
if (line)
BILL.ins.line = line;
BILL.ins.msg = "";
BILL.ins.ok = null;
BILL.ins.q = null;
if (typeof POST !== "undefined" && POST.open) {
POST.open = false;
postPaint();
}
billInsQuote();
billLoad();
billInsPaint();
}
function billInsQuote() { return __ZC(241, 6, this, arguments, new.target); }
function billStandIn() {
if (typeof TEMPS === "undefined")
return null;
var t = TEMPS.list.filter(function (t) { return t.post && t.post.workplace === BILL_KEY && /broker/i.test(t.post.title || "") && !/recept/i.test(t.post.title || ""); })[0];
return t ? t.name : null;
}
function billInsPaint() { return __ZC(241, 7, this, arguments, new.target); }
var BILL_LINE_SAY = {
health: "Health insurance pays the hospital for you. You pay the premium every two weeks. When you are treated you pay the <b>deductible</b> first (once a year), then your <b>share</b> of the rest, up to the <b>yearly maximum</b>; after that the insurer pays it all. A low premium usually means more to pay when you are hurt.",
vehicle: "Driving without cover means paying for every crash yourself. <b>Third-party</b> pays for the other driver or the person you hit. <b>Collision</b> and <b>full</b> cover pay your own repairs too, less the deductible. Every at-fault claim and every penalty point raises your premium.",
home: "<b>Renters'</b> cover insures your things in a home you rent (the owner insures the building). <b>Homeowners'</b> cover insures the house itself, priced by its value. The deductible is what you pay toward each claim."
};
function billQuoteHtml(q) { return __ZC(241, 8, this, arguments, new.target); }
function billTierName(line, t) { return __ZC(241, 9, this, arguments, new.target); }
function billTerms(line, p) { return __ZC(241, 10, this, arguments, new.target); }
function billMineHtml() { return __ZC(241, 11, this, arguments, new.target); }
function billInsBuy(plan) { return __ZC(241, 12, this, arguments, new.target); }
function billAtDesk() { return !!(typeof store !== "undefined" && store.inside && typeof INT !== "undefined" && INT && INT.spec && INT.spec.workplace === BILL_KEY); }
(function () {
if (typeof phPaint !== "function")
return;
var pp = phPaint;
phPaint = function () {
var r = pp.apply(this, arguments);
try {
var box = document.getElementById("ph-box"), tabs = box && box.querySelector(".tabs");
if (tabs && box.style.display !== "none" && !tabs.querySelector("[data-billtab]")) {
var s = document.createElement("span");
s.setAttribute("data-billtab", "1");
s.textContent = "Bills";
s.onclick = function (ev) { ev.stopPropagation(); PH.open = false; phPaint(); billOpen(); };
tabs.appendChild(s);
}
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof trfCrash !== "function")
return;
var tc = trfCrash;
trfCrash = function (H) {
var r = tc.apply(this, arguments);
try {
billCrash(H);
}
catch (e) {
if (window.console)
console.warn("bills crash:", e);
}
return r;
};
})();
function billCrash(H) { return __ZC(241, 13, this, arguments, new.target); }
if (typeof onHarm === "function")
onHarm(function (info) {
if (info.prev !== "down" && info.state === "down") {
billLoad(true).then(function (d) {
var hs = d && d.ok && d.hospital;
if (!hs || !(hs.overdue > 0) || d.exempt)
return;
setTimeout(function () { setStatus("<b>The ward is busy with paying patients first.</b> Your hospital account is past due (" + billG(hs.owed) + "), so you wait longer to be seen. You are never refused when you are down, and nobody goes to gaol over a medical bill. Pay it, or start a plan, under <b>Post · Bills</b>."); }, 3500);
});
}
if (info.prev === "down" && info.state !== "down") {
setTimeout(function () { if (!(BILL.data && BILL.data.exempt))
setStatus("<b>You are on your feet again.</b> The hospital's bill will follow in the post: see <b>Post · Bills</b>."); billLoad(true); }, 4000);
}
});
function billEnteredHospital() { return __ZC(241, 14, this, arguments, new.target); }
function billDarkName(spec) {
if (!spec)
return null;
var p = (typeof hlPlotOf === "function") ? hlPlotOf(spec) : null;
return p && BILL.dark[p.name] ? p.name : null;
}
function billLoadDark() {
if (BILL.darkBusy || BILL.missing || !(typeof signedIn === "function" && signedIn()))
return;
BILL.darkBusy = true;
BILL.darkAt = Date.now();
cityRpc("dark_homes", {}).then(function (rows) {
BILL.darkBusy = false;
var m = {};
(Array.isArray(rows) ? rows : []).forEach(function (r) { if (r && r.name)
m[r.name] = r.since || true; });
BILL.dark = m;
billDarkApply();
}).catch(function (e) { BILL.darkBusy = false; billErr(e); });
}
var BILL_SHADE = { g: {}, mat: null, at: 0 };
function billDarkApply() {
if (typeof LWLOT !== "undefined" && LWLOT.groups)
Object.keys(LWLOT.groups).forEach(function (n) { var g = LWLOT.groups[n], off = !!BILL.dark[n]; if (g && g.visible === off)
g.visible = !off; });
billShades();
}
function billShadeMat() { return __ZC(241, 15, this, arguments, new.target); }
function billShadeMake(spec) { return __ZC(241, 16, this, arguments, new.target); }
function billHomeDrawn(sp) { return __ZC(241, 17, this, arguments, new.target); }
function billShades() { return __ZC(241, 18, this, arguments, new.target); }
(function () {
if (typeof lwApplyLots === "function") {
var la = lwApplyLots;
lwApplyLots = function () { var r = la.apply(this, arguments); try {
billDarkApply();
}
catch (e) { } return r; };
}
})();
setInterval(function () { try {
if (Object.keys(BILL.dark).length || Object.keys(BILL_SHADE.g).length)
billDarkApply();
}
catch (e) { } }, 1000);
function billDarkInside(on) { return __ZC(241, 19, this, arguments, new.target); }
(function () {
if (typeof interiorTick !== "function")
return;
var it = interiorTick;
interiorTick = function (dt) {
var r = it.apply(this, arguments);
try {
billInsideTick();
}
catch (e) {
if (window.console && !BILL.warnedTick) {
BILL.warnedTick = true;
console.warn("bills:", e);
}
}
return r;
};
})();
function billInsideTick() {
var spec = (typeof INT !== "undefined" && INT && store.inside) ? INT.spec : null;
if (spec !== BILL.lastIn) {
BILL.lastIn = spec;
if (spec && spec.workplace === BILL_KEY) {
if (!BILL.ins.open && !BILL.insShown) {
BILL.insShown = true;
billInsOpen();
}
setStatus("<b>Somnucor Insurance Brokers.</b> Three insurers' quotes for your health, your vehicle and your home, side by side. A broker will set it up for you.");
}
else if (BILL.ins.open && !spec) {
BILL.ins.open = false;
billInsPaint();
}
if (spec && spec.workplace === "The City Hospital")
billEnteredHospital();
var dn = billDarkName(spec);
if (dn) {
var mine = BILL.data && BILL.data.ok && (BILL.data.homes || []).some(function (h) { return h.name === dn && h.service === "power" && h.off; });
setStatus(mine ? "<b>The power is off.</b> Somnucor Power cut the supply for an unpaid bill. Pay it and the reconnection fee under <b>Post · Bills</b>, and the lights come back on." :
"<b>The power is off in this house.</b> The lamps are dark; only daylight comes in.");
}
}
if (!spec)
return;
var dark = !!billDarkName(spec);
billDarkInside(dark);
if (!dark)
return;
(INT.lightPool || []).forEach(function (l) { l.intensity = 0; });
if (INT.lightFill)
INT.lightFill.intensity = 0;
var day = (typeof daylight === "function" && typeof dreamHour === "function") ? daylight(dreamHour()) : 1;
if (typeof hemi !== "undefined" && hemi)
hemi.intensity = 0.07 + 0.43 * day;
}
setInterval(function () {
try {
if (!(typeof signedIn === "function" && signedIn()))
return;
var inSom = billShow() || (typeof inSomnucorNow === "function" && inSomnucorNow());
if (!inSom)
return;
billLoad(false);
if (Date.now() - BILL.darkAt > (BILL.missing ? 600000 : 60000))
billLoadDark();
}
catch (e) { }
}, 5000);
function billTest(d, dark) { if (d)
billGot(d); if (dark) {
BILL.dark = dark;
billDarkApply();
} return BILL; }
