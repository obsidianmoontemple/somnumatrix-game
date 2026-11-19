/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var TS = { board: [], at: 0, busy: false, city: [], arc: null, arcOn: false, prompted: false, key: "" };
var TS_ARC = { cx: -120000, cz: 1400, L: 186, W: 34 };
function tsLoad(force) {
if (TS.busy || (!force && Date.now() - TS.at < 60000))
return;
TS.busy = true;
TS.at = Date.now();
var q = (typeof signedIn === "function" && signedIn()) ? cityRpc("tower_sites_board") :
fetch(DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/rest/v1/rpc/tower_sites_board", { method: "POST", headers: { apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + DW_CONFIG.supabaseKey, "Content-Type": "application/json" }, body: "{}" }).then(function (r) { return r.ok ? r.json() : []; });
Promise.resolve(q).then(function (rows) { TS.busy = false; TS.board = Array.isArray(rows) ? rows : []; tsApply(); }).catch(function () { TS.busy = false; });
}
function tsSite(area, kind, slot) { return TS.board.filter(function (s) { return s.area === area && s.kind === kind && +s.slot === +slot; })[0] || null; }
S("towerplot", "structure", [28, 4, 22], [
{ g: "box", s: [28, .12, 22], p: [0, .06, 0], c: 0x6E8A52 },
{ g: "box", s: [28, .35, .35], p: [0, .18, 10.8], c: 0xB8AE9A }, { g: "box", s: [28, .35, .35], p: [0, .18, -10.8], c: 0xB8AE9A },
{ g: "box", s: [.35, .35, 22], p: [13.8, .18, 0], c: 0xB8AE9A }, { g: "box", s: [.35, .35, 22], p: [-13.8, .18, 0], c: 0xB8AE9A },
{ g: "box", s: [.18, 2.6, .18], p: [-2.6, 1.3, 9.8], c: 0x4A3A2A }, { g: "box", s: [.18, 2.6, .18], p: [2.6, 1.3, 9.8], c: 0x4A3A2A },
{ g: "box", s: [5.8, 1.5, .12], p: [0, 2.3, 9.8], c: 0x24335E },
{ g: "box", s: [.25, .9, .25], p: [-8, .45, 10.8], c: 0xE8A030, rep: [3, 8, 0, 0] }
], ["tower plot", "reserved plot", "empty plot"], { sign: [0, 2.3, 9.9, 5.4, 1.2] });
function tsFrontage(C, rs, k0, side) {
var arch = "towerplot", w = kitW(arch, 1), d = kitD(arch, 1);
var stand = store.objects.filter(function (o) { return o.realm === C.r.id && KIT[o.archetype] && KIT[o.archetype].cat !== "being" && !(typeof NOWALL !== "undefined" && NOWALL[o.archetype] && o.archetype !== "signboard"); })
.map(function (o) { var k = KIT[o.archetype], s = (o.attrs && o.attrs.s) || 1; return { x: o.x, z: o.z, r: Math.max(k.size[0] * (o.attrs && o.attrs.w || 1), k.size[2] * (o.attrs && o.attrs.d || 1)) * s * 0.5 }; });
function clear(rr, a, rad) {
if (!atlClearAt(rr, a, rad, 4))
return false;
var x = C.h.x + Math.cos(a) * rr, z = C.h.z + Math.sin(a) * rr;
for (var i = 0; i < stand.length; i++) {
var q = stand[i], dx = q.x - x, dz = q.z - z, m = q.r + rad;
if (dx * dx + dz * dz < m * m)
return false;
}
return true;
}
var main = ATL_STAIRS.filter(function (s) { return s.main; }), got = null;
[side, -side].forEach(function (sd) {
if (got)
return;
var rb = rs + sd * (ATL_ROAD + ATL_SETBACK + d / 2), rad = Math.max(w, d) / 2 + 3;
for (var k = 0; k < main.length && !got; k++) {
for (var t = 0; t < (Math.PI / 4) * rb && !got; t += 3) {
var a = main[(k + k0) % main.length].a + (ATL_MAIN_HALF + w / 2 + 8 + t) / rb;
if (clear(rb, a, rad))
got = { side: sd, a: a };
}
}
});
if (!got)
return null;
return C.front(arch, rs, got.side, got.a, 1, "A plot held by the Tower", { sign: "Held by the Tower" });
}
cityMore("xts", function (C) {
TS.city = [];
for (var i = 1; i <= 6; i++) {
[["cinema", 1080, i + 3, 1], ["bank", 1280, i + 1, -1]].forEach(function (q) {
var f = tsFrontage(C, q[1], q[2], q[3]);
if (!f || !f.spec)
return;
var sp = f.spec;
sp.tsKind = q[0];
sp.tsSlot = i;
sp.tsArea = "city";
sp.tsOpen = false;
sp.note = "Granted by the Tower to a new " + (q[0] === "cinema" ? "picture house" : "bank") + ". Apply to the Tower for a business permit to open one here.";
TS.city.push(sp);
});
}
tsApply();
});
function tsApplyCity() {
TS.city.forEach(function (sp) {
var s = tsSite("city", sp.tsKind, sp.tsSlot), open = !!(s && s.open), name = open ? String(s.name || "") : "";
var key = open ? sp.tsKind + "|" + name : "";
if (sp.tsKey === key)
return;
sp.tsKey = key;
sp.tsOpen = open;
if (open) {
sp.archetype = sp.tsKind === "cinema" ? "picturehouse" : "bank";
sp.label = name;
sp.name = name;
sp.sign = name;
sp.named = "stated";
if (sp.tsKind === "cinema") {
sp.attrs = sp.attrs || {};
sp.attrs.c = 0x6A2A3A;
}
}
else {
sp.archetype = "towerplot";
sp.label = "A plot held by the Tower";
sp.name = sp.label;
sp.sign = "Held by the Tower";
}
if (typeof refresh === "function" && typeof meshes !== "undefined" && meshes[sp.id])
refresh(sp);
});
}
function tsApply() { try {
tsApplyCity();
}
catch (e) { } try {
tsApplyArcade();
}
catch (e) { } }
(function () {
if (typeof cinIsHouse === "function") {
var ci = cinIsHouse;
cinIsHouse = function (spec) { if (spec && spec.tsKind === "cinema" && spec.tsOpen)
return true; return ci.apply(this, arguments); };
}
})();
function tsTex(lines, fg, bg, w, h) { return __ZC(178, 0, this, arguments, new.target); }
function tsArcBuild() { return __ZC(178, 1, this, arguments, new.target); }
function tsPalace(G) { return __ZC(178, 2, this, arguments, new.target); }
function tsUnitDraw(U, s) { return __ZC(178, 3, this, arguments, new.target); }
function tsApplyArcade() {
if (!TS.arc || !TS.units)
return;
TS.units.forEach(function (U) {
var s = tsSite("mall", U.kind, U.slot), key = s && s.open ? String(s.name) : "";
if (U.key === key)
return;
U.key = key;
tsUnitDraw(U, s);
U.spec = s && s.open ? { id: "__arc_" + U.kind + U.slot, archetype: U.kind === "cinema" ? "picturehouse" : "bank", label: key, name: key, sign: key,
x: U.wx + Math.sin(U.ry) * -11, z: U.wz + Math.cos(U.ry) * -11, rot: U.ry, attrs: {}, city: true, tsKind: U.kind, tsSlot: U.slot, tsArea: "mall", tsOpen: true, detail: 3, nights: [], arcade: true } : null;
});
}
function tsArcEnter() { return __ZC(178, 4, this, arguments, new.target); }
function tsArcLeave(toHall) {
TS.arcOn = false;
if (TS.arc)
TS.arc.visible = false;
if (toHall && MALL.g) {
MALL.g.visible = true;
camera.position.set(MALL.cx + MALL.A - 12, 1.72, MALL.cz);
yaw = Math.PI / 2;
pitch = 0;
setStatus("Back in the World Mall.");
}
tsPrompt(null);
}
function tsMallArch() { return __ZC(178, 5, this, arguments, new.target); }
(function () {
if (typeof mallBuild === "function") {
var mb = mallBuild;
mallBuild = function () { var r = mb.apply(this, arguments); try {
tsMallArch();
}
catch (e) { } return r; };
}
if (typeof mallEnter === "function") {
var me = mallEnter;
mallEnter = function () { var r = me.apply(this, arguments); try {
tsMallArch();
tsLoad(false);
}
catch (e) { } return r; };
}
if (typeof mallLeave === "function") {
var ml = mallLeave;
mallLeave = function () { if (TS.arcOn)
tsArcLeave(false); return ml.apply(this, arguments); };
}
if (typeof blockedAt === "function") {
var ba = blockedAt;
blockedAt = function (x, z, feet) {
if (TS.arcOn && !store.inside && Math.abs(x - TS_ARC.cx) < 400 && Math.abs(z - TS_ARC.cz) < 400) {
var lx = x - TS_ARC.cx, lz = z - TS_ARC.cz;
if (Math.abs(lx) > TS_ARC.L / 2 - 1.2 || Math.abs(lz) > TS_ARC.W / 2 - (lx > TS_ARC.L / 2 - 46 ? 1.2 : 3.4))
return true;
if (TS.cabs)
for (var i = 0; i < TS.cabs.length; i++) {
var c = TS.cabs[i];
if (Math.abs(x - c.mx) < 1.1 && Math.abs(z - c.mz) < 0.95)
return true;
}
return false;
}
return ba.apply(this, arguments);
};
}
if (typeof supportAt === "function") {
var sa = supportAt;
supportAt = function (x, z, feet) { if (TS.arcOn && !store.inside && Math.abs(x - TS_ARC.cx) < 400 && Math.abs(z - TS_ARC.cz) < 400)
return 0; return sa.apply(this, arguments); };
}
if (typeof exitInterior === "function") {
var ex = exitInterior;
exitInterior = function (q) {
var sp = typeof INT !== "undefined" && INT ? INT.spec : null;
var r = ex.apply(this, arguments);
if (sp && sp.arcade) {
TS.arcOn = true;
if (TS.arc)
TS.arc.visible = true;
if (MALL.g)
MALL.g.visible = false;
}
return r;
};
}
if (typeof enterBuilding === "function") {
var eb = enterBuilding;
enterBuilding = function (spec) {
var r = eb.apply(this, arguments);
if (spec && spec.arcade && TS.arc)
TS.arc.visible = false;
if (spec && (spec.archetype === "bank"))
setStatus("<b>Inside " + esc(placeName(spec)) + ".</b> The counter is open: <b>press E</b> (or tap the note at the bottom) to do your banking.");
return r;
};
}
})();
function tsPrompt(html, fn) { if (typeof worldPrompt !== "function")
return; if (html) {
if (TS.ph !== html) {
worldPrompt(html, fn);
TS.ph = html;
}
TS.fn = fn || null;
TS.prompted = true;
}
else if (TS.prompted) {
worldPrompt(null);
TS.prompted = false;
TS.fn = null;
TS.ph = "";
} }
function tsBankOpen() {
if (typeof openPanel === "function")
openPanel();
setTimeout(function () { var el = document.getElementById("bank-state"); if (el && el.scrollIntoView)
el.scrollIntoView({ block: "center" }); if (typeof loadStanding === "function")
try {
loadStanding();
}
catch (e) { } }, 120);
}
function tsTick() {
if (typeof WLD !== "undefined" && WLD.on)
return;
var P = camera.position;
if (typeof INT !== "undefined" && INT && INT.spec && INT.spec.archetype === "bank") {
tsPrompt("<b>" + esc(placeName(INT.spec)) + "</b> · the counter is open · <b>press E</b> (or tap here) to bank", tsBankOpen);
return;
}
if (typeof INT !== "undefined" && INT) {
tsPrompt(null);
return;
}
if (MALL.on && !TS.arcOn && MALL.g && MALL.g.visible) {
if (Math.abs(P.x - (MALL.cx + MALL.A - 6)) < 4.5 && Math.abs(P.z - MALL.cz) < 4.5)
return tsPrompt("<b>The Grand Arcade</b> · picture houses, banks and the Pixel Palace arcade · <b>press E</b> to go through", tsArcEnter);
return tsPrompt(null);
}
if (TS.arcOn) {
if (Math.abs(P.x - (TS_ARC.cx - TS_ARC.L / 2 + 2)) < 5 && Math.abs(P.z - TS_ARC.cz) < 5)
return tsPrompt("<b>The World Mall</b> · <b>press E</b> to go back into the hall", function () { tsArcLeave(true); });
var cab = null, cd = 1.6;
(TS.cabs || []).forEach(function (c) { var d = Math.hypot(P.x - c.x, P.z - c.z); if (d < cd) {
cd = d;
cab = c;
} });
if (cab && typeof arcOpen === "function") {
var gg = ARC_GAMES[cab.id];
return tsPrompt("<b>" + esc(gg.name) + "</b> · " + esc(gg.blurb) + " · <b>press E</b> to play", function () { arcOpen(cab.id); });
}
var near = null;
(TS.units || []).forEach(function (U) { if (Math.hypot(P.x - U.x, P.z - U.z) < 3.4)
near = U; });
if (near) {
if (near.spec)
return tsPrompt("<b>" + esc(near.spec.label) + "</b> · <b>press E</b> to go in", function () { enterBuilding(near.spec); });
return tsPrompt("<b>A space held by the Tower</b> · " + (near.kind === "cinema" ? "for a picture house" : "for a bank") + " · dark until it is granted. Ask at the Tower for a business permit.", null);
}
}
tsPrompt(null);
}
(function () {
if (typeof transitTick === "function") {
var tt = transitTick;
transitTick = function (dt) { tt(dt); try {
tsTick();
if (typeof careInCity === "function" && careInCity())
tsLoad(false);
}
catch (e) { } };
}
addEventListener("keydown", function (e) {
if ((e.code !== "KeyE" && e.code !== "Enter") || !TS.prompted || !TS.fn || (typeof WLD !== "undefined" && WLD.on))
return;
if (/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
e.preventDefault();
e.stopImmediatePropagation();
var f = TS.fn;
tsPrompt(null);
f();
}, true);
})();
(function () {
if (typeof paintBusiness !== "function")
return;
var pb = paintBusiness;
paintBusiness = function () {
pb.apply(this, arguments);
var el = document.getElementById("business-state");
if (!el || !myJobs || !myJobs.length)
return;
var mine = myJobs.filter(function (j) { return j.job_id != null; });
if (!mine.length)
return;
var h = "<div style='margin-top:14px;padding-top:8px;border-top:1px solid var(--line)'><b>Set your wages</b>" +
"<div style='color:var(--dim);font-size:12px;margin:2px 0 6px'>As the head of the business you choose what each post pays. " +
"A dreamer's own business pays from its own wallet; the city's own businesses are paid by the Treasury, and the Keeper sees every change.</div>";
mine.forEach(function (j, i) {
var kind = j.kind || j.pay_kind || "hourly";
h += "<div style='margin:4px 0'>" + esc(j.title) + " <span style='color:var(--dim)'>(" + esc(j.employer || "") + ")</span> " +
"<input type='number' min='1' id='tsw-" + i + "' value='" + (+j.rate || 1) + "' style='width:80px;background:var(--void);border:1px solid var(--line);color:var(--bone);padding:3px'> gold " +
"<select id='tsk-" + i + "' style='background:var(--void);border:1px solid var(--line);color:var(--bone)'><option value='hourly'" + (kind === "hourly" ? " selected" : "") + ">an hour</option><option value='salary'" + (kind === "salary" ? " selected" : "") + ">a week (salary)</option></select> " +
"<button class='btn' data-tsw='" + i + "'>Set</button></div>";
});
h += "<div id='tsw-msg' style='font-size:12px;min-height:16px'></div></div>";
el.insertAdjacentHTML("beforeend", h);
Array.prototype.forEach.call(el.querySelectorAll("[data-tsw]"), function (b) {
b.onclick = function () {
var i = +b.getAttribute("data-tsw"), j = mine[i], rate = +document.getElementById("tsw-" + i).value | 0, kind = document.getElementById("tsk-" + i).value;
var msg = document.getElementById("tsw-msg");
cityRpc("set_wage", { p_job: j.job_id, p_kind: kind, p_rate: rate, p_starting: j.starting || 0 }).then(function (o) {
if (o === "ok") {
if (msg)
msg.textContent = j.title + " now pays " + rate + " gold " + (kind === "salary" ? "a week" : "an hour") + ".";
setStatus("<b>Wage set.</b> " + esc(j.title) + ": " + rate + " gold " + (kind === "salary" ? "a week" : "an hour") + ".");
loadMyJobs();
}
else if (msg)
msg.textContent = String(o);
}).catch(function (e) { if (msg)
msg.textContent = e.message; });
};
});
};
})();
