/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var WG_C = 1.6, WG_STAIR = 8.8, WG_LIFT = 3.8, WG_LOBBY = 3.4;
function wgProg(key) { return (key && typeof WG_PROG !== "undefined" && WG_PROG[key]) || null; }
function wgRoomOf(r) {
var s = String(r), i = s.indexOf(":"), t = i < 0 ? s : s.slice(0, i), lab = i < 0 ? null : s.slice(i + 1), def = WG_ROOM[t];
if (!def)
return null;
return { type: t, def: def, label: lab || def.label, len: def.len };
}
function wgStairs(L, floors) {
var br = (L % 2 === 0 && L < floors - 1) || (L > 0 && (L - 1) % 2 === 0), fl = (L % 2 === 1 && L < floors - 1) || (L > 0 && (L - 1) % 2 === 1);
return { br: br, fl: fl };
}
function wgSideLen(list) { var s = 0; (list || []).forEach(function (r) { var R = wgRoomOf(r); if (R)
s += R.len; }); return s; }
function wgBands(W) { return W >= 40 ? 2 : 1; }
function wgSplit(f, n, P, L) { return __ZC(276, 0, this, arguments, new.target); }
function wgReserve(P, L, n, b) {
var st = wgStairs(L, P.floors), lift = P.floors > 2, r = { lA: 0, rA: 0, lB: 0 };
if (lift) {
if (n === 1)
r.lA = WG_LIFT;
else if (b === 0)
r.rA = WG_LIFT;
else
r.lA = WG_LIFT;
}
if (st.br && b === n - 1)
r.rA = Math.max(r.rA, WG_STAIR);
if (st.fl && b === 0 && L > 0)
r.lB = WG_STAIR;
return r;
}
function wgFloorNeed(P, L, n) {
var f = L === 0 ? P.ground : (P.up || [])[L - 1];
if (!f)
return 0;
n = n || 1;
var m = 0;
wgSplit(f, n, P, L).forEach(function (bf, b) {
var r = wgReserve(P, L, n, b);
m = Math.max(m, wgSideLen(bf.L) + r.lA + r.lB, wgSideLen(bf.R) + r.rA);
});
return m + (L === 0 ? WG_LOBBY : 0.6);
}
function wgFoot(spec) {
try {
var d0 = KIT[spec.archetype] || KIT.house, a0 = spec.attrs || {}, s0 = a0.s || 1, B0 = bodyOf(levelParts(d0, spec));
if (!B0)
return { w: 0, d: 0 };
return { w: Math.min(56, B0.w * s0 * (a0.w || 1) * 0.86), d: Math.min(56, B0.d * s0 * (a0.d || 1) * 0.86) };
}
catch (e) {
return { w: 0, d: 0 };
}
}
function wgSize(spec, P, p) {
var FP = wgFoot(spec);
var W = Math.max(P.w || 22, p.w || 0, FP.w), Df = Math.max(12, Math.min(26, P.front || p.d || 12));
var n = wgBands(W), g = wgFloorNeed(P, 0, n), D = Df + g;
for (var L = 1; L < P.floors; L++)
D = Math.max(D, wgFloorNeed(P, L, n));
D = Math.max(D, FP.d);
return { W: W, D: D, Df: Df, wing: D - Df };
}
(function () {
if (typeof planOf !== "function" || typeof fillHall !== "function" || typeof makeInterior !== "function")
return;
var po = planOf;
planOf = function (spec) {
var p = po.apply(this, arguments);
try {
var key = spec && spec.workplace, P = wgProg(key);
if (!P || !p)
return p;
if (!(p.fill === "tr:" + key || p.ground === "tr:" + key || (typeof WG_FRONT !== "undefined" && WG_FRONT[key])))
return p;
var S = wgSize(spec, P, p);
return { mode: "hall", w: S.W, d: S.D, fill: "tr:" + key, wall: P.wall || p.wall || 0xE6E0D4, floor: P.floor || p.floor || "wood", h: p.h, lift: P.floors > 2, liftLeft: false, wg: S };
}
catch (e) {
if (window.console)
console.warn("[wings] plan", e);
}
return p;
};
if (typeof levelsOf === "function") {
var lo = levelsOf;
levelsOf = function (spec) { if (WG.cur && spec === WG.cur.spec)
return WG.cur.P.floors; return lo.apply(this, arguments); };
}
var fh = fillHall;
fillHall = function (kind, W, D, put, spots) {
var B = WG.cur;
if (B) {
var L = B.lv++;
try {
if (L === 0)
wgGround(B, W, D, put, spots);
else
wgUpper(B, L, W, D, put, spots);
return;
}
catch (e) {
if (window.console)
console.warn("[wings] floor " + L, e);
}
}
return fh.apply(this, arguments);
};
var mi = makeInterior;
makeInterior = function (spec) {
var key = spec && spec.workplace, P = wgProg(key);
if (!P || !((typeof TR !== "undefined" && TR[key]) || (typeof WG_FRONT !== "undefined" && WG_FRONT[key])))
return mi.apply(this, arguments);
var was = WG.cur, B = { spec: spec, key: key, P: P, lv: 0, staff: [], signs: 0 };
WG.cur = B;
var I;
try {
I = mi.apply(this, arguments);
}
finally {
WG.cur = was;
}
try {
if (I)
wgAfter(I, B);
}
catch (e) {
if (window.console)
console.warn("[wings] after", e);
}
return I;
};
if (typeof workplaceDecor === "function") {
var wd = workplaceDecor;
workplaceDecor = function (key) {
var d = wd.apply(this, arguments);
try {
if (d && wgProg(key) && !(typeof wpEditing !== "undefined" && wpEditing === key) && !d.some(function (p) { return p && p.k === "wgmark"; }))
return null;
}
catch (e) { }
return d;
};
}
if (typeof FURN === "object" && FURN && !FURN.wgmark) {
FURN.wgmark = function () { var g = new THREE.Group(); g.visible = false; return g; };
}
})();
function wgMakeR(B, put, spots, L, sd, z0, z1, W, def, label, opt, xc) { return __ZC(276, 1, this, arguments, new.target); }
function wgTitle(P, t) { return __ZC(276, 2, this, arguments, new.target); }
function wgWallZ(put, x, z0, z1, gaps) { return __ZC(276, 3, this, arguments, new.target); }
function wgWallX(put, z, x0, x1, gaps) { return __ZC(276, 4, this, arguments, new.target); }
function wgSide(B, put, spots, L, sd, W, zA, zB, list, xc) { return __ZC(276, 5, this, arguments, new.target); }
function wgFloor(B, L, W, D, put, spots, zA, zB, f) { return __ZC(276, 6, this, arguments, new.target); }
function wgGround(B, W, D, put, spots) { return __ZC(276, 7, this, arguments, new.target); }
function wgUpper(B, L, W, D, put, spots) {
var f = (B.P.up || [])[L - 1] || { L: ["office", "meeting"], R: ["clerks", "staffroom"] };
wgFloor(B, L, W, D, put, spots, -D / 2, D / 2 - 0.6, f);
put("benchin", W / 2 - 1, D / 2 - 2.2, -Math.PI / 2);
}
var INT_PLAN_LAST = null;
(function () { var po = planOf; planOf = function (spec) { var p = po.apply(this, arguments); if (WG.cur && spec === WG.cur.spec)
INT_PLAN_LAST = p; return p; }; })();
function wgAfter(I, B) { return __ZC(276, 8, this, arguments, new.target); }
function wgBadge(key) { return __ZC(276, 9, this, arguments, new.target); }
function wgLocksTick() { return __ZC(276, 10, this, arguments, new.target); }
function wgStaffName(key, i, title) { return __ZC(276, 11, this, arguments, new.target); }
function wgOnShift(title, key) {
if (/hospital/i.test(key))
return true;
try {
if (typeof tempOnShift === "function")
return tempOnShift({ post: { title: title, workplace: key } });
}
catch (e) { }
return true;
}
function wgStaffTick() { return __ZC(276, 12, this, arguments, new.target); }
function wgTalkTarget() { return __ZC(276, 13, this, arguments, new.target); }
function wgTalk(who) { return __ZC(276, 14, this, arguments, new.target); }
function wgTalkPaint() { return __ZC(276, 15, this, arguments, new.target); }
if (typeof PS_KEEP !== "undefined")
PS_KEEP["wg-talk"] = 1;
addEventListener("keydown", function (e) {
if (e.code !== "KeyT" || !WG.near)
return;
if (document.activeElement && /TEXTAREA|INPUT/.test(document.activeElement.tagName))
return;
if (typeof talkOpen !== "undefined" && talkOpen)
return;
e.preventDefault();
wgTalk(WG.near);
});
function wgCullTick() { return __ZC(276, 16, this, arguments, new.target); }
setInterval(function () {
try {
if (typeof INT === "undefined" || !INT || !INT.wg) {
var el = document.getElementById("wg-talk");
if (el)
el.style.display = "none";
return;
}
wgLocksTick();
wgCullTick();
wgStaffTick();
wgTalkPaint();
}
catch (e) {
if (window.console)
console.warn("[wings]", e);
}
}, 300);
