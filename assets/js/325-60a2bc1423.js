/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var CW = { wings: [], locks: [], doors: [], guide: null, badgeAt: 0, badge: false, wheel: null, busy: false };
var CW_WHEEL = [40, 1, 2, 5, 1, 1, 10, 2, 1, 1, 5, 2, 1, 20, 1, 2, 1, 5, 1, 2, 10, 1, 1, 2, 5, 1, 1, 1, 2, 1, 1, 5, 2, 1, 10, 1, 2, 1, 5, 1, 20, 2, 1, 1, 2, 1, 1, 10, 2, 1, 2, 5, 2, 2];
var CW_DICE = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
var CW_KEY = "The Hidden Crescent";
if (typeof NEEDS_PLACES !== "undefined")
NEEDS_PLACES["The Earthrise Room"] = "Fine dining under Earthrise, for gold";
function cwBadge() {
var now = Date.now();
if (now - CW.badgeAt < 1500)
return CW.badge;
CW.badgeAt = now;
CW.badge = typeof wgBadge === "function" ? !!wgBadge(CW_KEY) : (typeof isKeeperNow === "function" && isKeeperNow());
return CW.badge;
}
function cwWing(G, o) { return __ZC(325, 0, this, arguments, new.target); }
function cwCutWall(G) { return __ZC(325, 1, this, arguments, new.target); }
function cwBuild(G) { return __ZC(325, 2, this, arguments, new.target); }
function cwStaffOnly(what) { return __ZC(325, 3, this, arguments, new.target); }
function cwRoomCard(title, text, post) {
worldCard("<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>" + esc(title) + "</div><div style='opacity:.85;margin-top:6px'>" + esc(text) + "</div>" +
(post ? "<div style='opacity:.7;margin-top:6px'>The post here: " + esc(post) + ".</div>" : ""));
}
function cwGuideCard() { return __ZC(325, 4, this, arguments, new.target); }
function cwCrapsLocal(kind, bet) { return __ZC(325, 5, this, arguments, new.target); }
function cwCraps(i) { return __ZC(325, 6, this, arguments, new.target); }
function cwRoll(i, kind) { return __ZC(325, 7, this, arguments, new.target); }
function cwBacLocal(side, bet) { return __ZC(325, 8, this, arguments, new.target); }
function cwBaccarat() { return __ZC(325, 9, this, arguments, new.target); }
function cwDeal(side) { return __ZC(325, 10, this, arguments, new.target); }
function cwWheelLocal(pick, bet) {
var seg = Math.floor(Math.random() * 54), val = CW_WHEEL[seg], pay = val === pick ? bet * (pick + 1) : 0;
CAS.pchips += -bet + pay;
return { ok: true, seg: seg, value: val, win: pay > 0, payout: pay };
}
function cwWheel() { return __ZC(325, 11, this, arguments, new.target); }
function cwSpinWheel(pick) { return __ZC(325, 12, this, arguments, new.target); }
function cwTick(dt) { return __ZC(325, 13, this, arguments, new.target); }
function cwKeep(v, d) {
if (!v || d > 3 || typeof v !== "object")
return;
if (v.isObject3D) {
v.userData.keep = 1;
return;
}
if (Array.isArray(v))
v.forEach(function (x) { cwKeep(x, d + 1); });
else
Object.keys(v).forEach(function (k) { cwKeep(v[k], d + 1); });
}
function cwLiteBake(G) { return __ZC(325, 14, this, arguments, new.target); }
(function () {
if (typeof WORLDS === "undefined" || !WORLDS.casino)
return;
var C = WORLDS.casino, b0 = C.build, k0 = C.tick, bl0 = C.block;
C.build = function (G) {
b0.apply(this, arguments);
try {
cwBuild(G);
}
catch (e) {
if (window.console)
console.warn("[casino-wings]", e);
}
try {
cwLiteBake(G);
}
catch (e) {
if (window.console)
console.warn("[casino-wings] bake", e);
}
};
C.tick = function (dt) { k0.apply(this, arguments); try {
cwTick(dt);
}
catch (e) { } };
C.bound = 80;
C.block = function (x, z, feet) {
if (x * x + z * z > 30.5 * 30.5) {
var inn = false;
for (var i = 0; i < CW.wings.length; i++) {
var W = CW.wings[i];
if (W.inside(x, z) || W.door(x, z)) {
inn = true;
break;
}
}
if (!inn)
return true;
}
if (CW.locks.length && !cwBadge() && worldSolidAt(CW.locks, x, z, feet))
return true;
return bl0.apply(this, arguments);
};
if (typeof worldBanner === "function") {
var wb = worldBanner;
worldBanner = function (h) {
var G = CW.guide;
if (G && WLD.on === "casino" && h) {
var L = worldLocal(), dx = G.x - L.x, dz = G.z - L.z, d = Math.hypot(dx, dz);
if (d < 3) {
CW.guide = null;
setStatus("<b>" + esc(G.name) + ".</b> You are here.");
}
else {
var arrow = "➜";
try {
if (typeof bearingOf === "function" && typeof pfindArrow === "function")
arrow = pfindArrow(bearingOf(dx, dz));
}
catch (e) { }
h += "<div>" + arrow + " <b>" + esc(G.name) + "</b> · " + Math.round(d) + " m</div>";
}
}
return wb.apply(this, [h].concat([].slice.call(arguments, 1)));
};
}
})();
