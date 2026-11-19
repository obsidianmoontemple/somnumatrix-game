/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var MNG = { board: null, at: 0, busy: false, missing: false, hew: null, cart: null, cartMesh: null, said: {}, lodeSaid: null };
var MNG_RANKS = [
[0, "Trammer", "the working face and the first seam"],
[40, "Hewer", "the seams past the first gallery and the crystal pocket"],
[150, "Face-hand", "the deep seams and the stope"],
[400, "Deputy", "the deepest seams and the great cavern"],
[1000, "Face-Master", "a cart of 14 loads"],
[2500, "Deep Master", "a cart of 16 loads, the most there is"]
];
function mngRank(loads) { var r = 0; for (var i = 0; i < MNG_RANKS.length; i++)
if ((+loads || 0) >= MNG_RANKS[i][0])
r = i; return r; }
function mngRankName(r) { return (MNG_RANKS[Math.max(0, Math.min(5, r | 0))] || MNG_RANKS[0])[1]; }
function mngCap(r) { return 6 + 2 * (r | 0); }
function mngNeed(face) { return face >= 10 ? 3 : face >= 8 ? 2 : face >= 4 ? 1 : 0; }
function mngDepth(key, face) { return face < 0 ? Math.min(mgStageOf(key), 3) : face; }
function mngDanger(d) { return d >= 8 ? "deep: creaking roof and bad air" : d >= 4 ? "the roof creaks here" : "safe working"; }
function mngVeinWord(v) {
if (!v)
return "untouched";
if (v.shut)
return "roof down";
var f = v.cap ? v.left / v.cap : 1;
return v.left <= 0 ? "worked out" : f > 0.66 ? "rich" : f > 0.33 ? "fair" : "thin";
}
var MNG_CON_ICON = { loads: "🛒", ore: "🪨", gems: "💎", deep: "⛏️", world: "🌍", lode: "✨" };
function mngRpc(name, args) { return typeof cityRpc === "function" ? cityRpc(name, args || {}) : Promise.reject(new Error("offline")); }
function mngSay(h) { return __ZC(400, 0, this, arguments, new.target); }
function mngMissing(e) { var m = String((e && e.message) || e || ""); return /function|404|schema cache|PGRST202|does not exist/i.test(m); }
function mngMe() { return (MNG.board && MNG.board.me) || null; }
function mngVein(key, face) { var v = MNG.board && MNG.board.veins; return v ? v[key + "|" + face] || null : null; }
function mngIsLode(key) { return !!(MNG.board && MNG.board.lode === key); }
function mngMat(k) { return __ZC(400, 1, this, arguments, new.target); }
function mngKinds(o) { return Object.keys(o || {}).filter(function (k) { return +o[k] > 0; }).map(function (k) { var M = mngMat(k); return (M.icon || "🪨") + " " + (+o[k]) + " " + esc(M.name); }).join(", "); }
function mngLoad(force) {
if (MNG.busy || (!force && Date.now() - MNG.at < 30000))
return Promise.resolve(MNG.board);
MNG.busy = true;
MNG.at = Date.now();
return mngRpc("mine_guild_board").then(function (o) {
MNG.busy = false;
if (!o || !o.ok)
return MNG.board;
MNG.missing = false;
MNG.board = o;
if (o.me && o.me.cart)
MNG.cart = o.me.cart;
mngLodeTell();
mngCartPaint();
return o;
}).catch(function (e) { MNG.busy = false; if (mngMissing(e))
MNG.missing = true; return MNG.board; });
}
function mngLodeTell() { return __ZC(400, 2, this, arguments, new.target); }
function mngHud() {
var el = document.getElementById("mng-hud");
if (el)
return el;
el = document.createElement("div");
el.id = "mng-hud";
el.style.cssText = "position:fixed;left:50%;bottom:150px;transform:translateX(-50%);z-index:40;min-width:260px;max-width:min(92vw,420px);padding:8px 12px;border-radius:6px;" +
"background:rgba(20,16,12,.86);border:1px solid rgba(232,200,140,.45);color:#F2E2C0;font:13px/1.4 system-ui,sans-serif;display:none;pointer-events:auto";
document.body.appendChild(el);
if (!document.getElementById("mng-css")) {
var st = document.createElement("style");
st.id = "mng-css";
st.textContent = "@media (max-width:640px){#mng-hud{left:auto!important;right:8px;transform:none!important;bottom:262px!important;min-width:0!important;max-width:60vw!important;font-size:12px!important}#mng-say{top:132px!important;font-size:12px!important}}";
document.head.appendChild(st);
}
var dim = document.createElement("div");
dim.id = "mng-dim";
dim.style.cssText = "position:fixed;inset:0;z-index:30;pointer-events:none;opacity:0;background:radial-gradient(ellipse at center,rgba(0,0,0,0) 12%,rgba(10,6,2,.96) 68%)";
document.body.appendChild(dim);
return el;
}
function mngHudPaint() {
var el = mngHud(), H = MNG.hew, c = MNG.cart || { loads: 0, cap: 6 }, A = MNG.air, n = Date.now();
var dim = document.getElementById("mng-dim");
if (dim)
dim.style.opacity = A ? String(Math.min(0.95, 0.62 + (n - A.at) / 60000 * 0.33)) : "0";
if (!H && !A) {
el.style.display = "none";
return;
}
var h = "";
if (H) {
var bar = 0, line = "";
if (H.phase === "hew") {
bar = Math.min(1, (n - H.t0) / (H.secs * 1000));
line = "⛏️ Hewing " + esc(H.name) + " · " + Math.max(0, Math.ceil(H.secs - (n - H.t0) / 1000)) + " s to the next load";
}
else if (H.phase === "creak") {
bar = Math.min(1, (n - H.t0) / 45000);
line = "⚠️ <b>The roof is creaking!</b> Press E at the face (or the button) to set a prop. " + Math.max(0, 45 - Math.floor((n - H.t0) / 1000)) + " s";
}
else if (H.phase === "prop") {
bar = Math.min(1, (n - H.t0) / 8000);
line = "🪵 Setting a prop under the cap-piece…";
}
else if (H.phase === "send")
line = "⛏️ The load comes away…";
h += "<div>" + line + "</div><div style='height:6px;background:rgba(255,255,255,.12);border-radius:3px;margin:5px 0'><i style='display:block;height:100%;width:" + Math.round(bar * 100) + "%;background:" + (H.phase === "creak" ? "#D0603A" : "#D8B060") + ";border-radius:3px'></i></div>";
var v = mngVein(H.key, H.face);
h += "<div style='opacity:.85;font-size:12px'>🛒 Cart " + (+c.loads || 0) + " of " + (+c.cap || 6) + " loads · vein " + mngVeinWord(v) + (v ? " (" + Math.max(0, v.left) + " loads)" : "") + (mngIsLode(H.key) && H.face < 0 ? " · ✨ <b>mother lode</b>" : "") + "</div>";
h += "<div style='margin-top:6px;display:flex;gap:6px;flex-wrap:wrap'>" +
(H.phase === "creak" ? "<button type='button' class='btn' data-mng='prop'>🪵 Set a prop</button>" : "") +
"<button type='button' class='btn' data-mng='stop'>Stop hewing</button></div>";
}
if (A) {
var left = Math.max(0, 60 - Math.floor((n - A.at) / 1000));
h += "<div style='margin-top:" + (H ? "8" : "0") + "px;color:#FFB080'>🕯️ <b>Bad air.</b> Your lamp is burning low. Walk back towards the shaft for fresh air: " + left + " s</div>";
}
el.innerHTML = h;
el.style.display = "block";
Array.prototype.forEach.call(el.querySelectorAll("[data-mng]"), function (b) { b.onclick = function () { var k = b.getAttribute("data-mng"); if (k === "stop")
mngHewStop("You stop hewing."); if (k === "prop")
mngProp(); }; });
}
function mngWhere() { var C = MG.cur; if (!C)
return null; return C.kind === "ud" ? { kind: "ud", key: C.key } : { kind: "gr", site: C.site }; }
function mngKeyOf(where) { return where.kind === "ud" ? where.key : where.site.mg.site.key; }
function mngHewStart(key, face, label) { return __ZC(400, 3, this, arguments, new.target); }
function mngHewStop(why) { if (!MNG.hew)
return; MNG.hew = null; mngHudPaint(); mngCartPaint(); if (why)
mngSay(why); }
function mngSwing() { if (typeof playTone !== "function")
return; try {
playTone(150 + Math.random() * 60, 0.07);
setTimeout(function () { playTone(95 + Math.random() * 30, 0.12); }, 90);
}
catch (e) { } }
function mngHewSend() { return __ZC(400, 4, this, arguments, new.target); }
function mngJobDig() {
try {
var j = typeof clockedJob === "function" ? clockedJob() : null;
if (j && /miner|quarr/i.test(j.title || "") && typeof mgDig === "function")
mgDig(j.job_id);
}
catch (e) { }
}
function mngProp() {
var H = MNG.hew;
if (!H || H.phase !== "creak")
return;
H.phase = "prop";
H.t0 = Date.now();
H.x = camera.position.x;
H.z = camera.position.z;
if (typeof playTone === "function")
try {
playTone(200, 0.1);
}
catch (e) { }
mngHudPaint();
}
function mngPropDone() { return __ZC(400, 5, this, arguments, new.target); }
function mngRockfall(say) { return __ZC(400, 6, this, arguments, new.target); }
function mngCarried(say) {
mngHudPaint();
mngCartPaint();
var W = mngWhere();
if (W) {
if (W.kind === "ud" && typeof mgUdBack === "function")
mgUdBack(W.key);
else if (W.kind === "gr" && typeof mgGrBack === "function")
mgGrBack(W.site);
}
setTimeout(function () { mngSay("🕯️ <b>" + esc(say || "You were carried up.") + "</b>"); }, 300);
}
function mngFresh() {
MNG.air = null;
mngHudPaint();
mngRpc("mine_fresh").then(function (o) { mngSay("🕯️ " + esc((o && o.say) || "Fresh air.")); }).catch(function () { });
}
function mngBank(then) { return __ZC(400, 7, this, arguments, new.target); }
function mngCartMesh() { return __ZC(400, 8, this, arguments, new.target); }
function mngCartPaint() { return __ZC(400, 9, this, arguments, new.target); }
function mngCartFrame() {
var g = MNG.cartMesh, C = MG.cur, c = MNG.cart || {};
if (!g)
return;
var show = !!C && ((+c.loads || 0) > 0 || !!MNG.hew);
g.visible = show;
if (!show)
return;
var P = camera.position, fy = (typeof yaw !== "undefined" ? yaw : 0), fx = -Math.sin(fy), fz = -Math.cos(fy), floor = P.y - 1.72;
if (MNG.hew) {
var H = MNG.hew;
if (!g.userData.park || g.userData.park !== H) {
g.userData.park = H;
g.position.set(P.x - fz * 1.3 - fx * 0.6, floor, P.z + fx * 1.3 - fz * 0.6);
g.rotation.y = fy;
}
return;
}
g.userData.park = null;
var tx = P.x + fx * 1.75, tz = P.z + fz * 1.75;
if (Math.hypot(tx - g.position.x, tz - g.position.z) > 6) {
g.position.x = tx;
g.position.z = tz;
g.rotation.y = fy;
}
g.position.x += (tx - g.position.x) * 0.25;
g.position.z += (tz - g.position.z) * 0.25;
g.position.y = floor;
var dr = fy - g.rotation.y;
while (dr > Math.PI)
dr -= Math.PI * 2;
while (dr < -Math.PI)
dr += Math.PI * 2;
g.rotation.y += dr * 0.2;
}
function mngBar(f, col) { return "<div style='height:6px;background:rgba(255,255,255,.12);border-radius:3px;margin:3px 0 6px'><i style='display:block;height:100%;width:" + Math.round(Math.max(0, Math.min(1, f)) * 100) + "%;background:" + (col || "#D8B060") + ";border-radius:3px'></i></div>"; }
function mngHowTo(key) { return __ZC(400, 10, this, arguments, new.target); }
function mngBoardCard() { return __ZC(400, 11, this, arguments, new.target); }
function mngHowCard() { return __ZC(400, 12, this, arguments, new.target); }
function mngRanksCard() { return __ZC(400, 13, this, arguments, new.target); }
function mngFaceCard(key) { return __ZC(400, 14, this, arguments, new.target); }
function mngLodeMark(M, key) { return __ZC(400, 15, this, arguments, new.target); }
function mngKeeperBtns(key, fns) { return __ZC(400, 16, this, arguments, new.target); }
var mngOrigBoss = function (key, face) { return mgBossCard(key, face); };
(function () {
if (typeof mgSpot !== "function")
return;
var spot = mgSpot, boss = mgBossCard, verb = mgSpotVerb, tick = mgTick, build = mgBuild;
mngOrigBoss = function (key, face) { return boss(key, face); };
mgSpot = function (S, where) {
var key = mngKeyOf(where);
if (S.kind === "seam") {
mngHewStart(key, S.seam.i, MG_PART[MG_SEQ[S.seam.i]].t.toLowerCase().replace(/^(seam|stope)$/, "the $1").replace(/^crystal pocket$/, "the crystal pocket").replace(/^the great cavern$/, "the great cavern's face"));
return;
}
if (S.kind === "face") {
if (MNG.hew && MNG.hew.key === key && MNG.hew.face === -1) {
if (MNG.hew.phase === "creak")
mngProp();
return;
}
mngFaceCard(key);
return;
}
if (S.kind === "back" && MNG.cart && +MNG.cart.loads > 0) {
var a = this, b = arguments;
mngBank(function () { spot.apply(a, b); });
return;
}
if (S.kind === "back") {
MNG.air = null;
mngHewStop(null);
}
return spot.apply(this, arguments);
};
mgSpotVerb = function (S) {
if (S.kind === "seam")
return S.seam.vug ? "hew the crystal pocket (into your cart)" : "hew the seam (into your cart)";
if (S.kind === "face")
return "hew the working face";
if (S.kind === "back" && MNG.cart && +MNG.cart.loads > 0)
return "bank your cart and go back up";
return verb.apply(this, arguments);
};
mgBossCard = function (key, face) {
var r = boss.apply(this, arguments);
try {
var c = typeof WLD !== "undefined" && WLD.card;
if (!c || c.style.display === "none")
return r;
var fns = { board: function () { mngBoardCard(); } }, h = worldBtn("board", "⛏️ The Miners' Guild board", "contracts, the week's table, your rank") + mngKeeperBtns(key, fns);
var d = document.createElement("div");
d.innerHTML = h;
c.appendChild(d);
d.querySelectorAll("[data-w]").forEach(function (b) { b.style.cursor = "pointer"; b.onclick = function (ev) { ev.stopPropagation(); var n = b.getAttribute("data-w"); if (fns[n])
fns[n](); }; });
}
catch (e) { }
return r;
};
mgBuild = function (site, stage, o) {
var M = build.apply(this, arguments);
try {
M.spots.forEach(function (S) {
if (S.kind === "seam")
S.label = "<b>" + esc(MG_PART[MG_SEQ[S.seam.i]].t) + "</b> · <b>press E</b> to hew (real minutes; into your 🛒 cart)" + (mngNeed(S.seam.i) ? " · " + mngRankName(mngNeed(S.seam.i)) + " and up" : "");
if (S.kind === "face")
S.label = "<b>The working face</b> · <b>press E</b> to hew";
});
}
catch (e) { }
return M;
};
mgTick = function () {
tick.apply(this, arguments);
var C = MG.cur;
if (!C || !MNG.board)
return;
var M = C.kind === "gr" ? (C.mount && C.mount.M) : (MG_UD[C.key] && MG_UD[C.key].built), key = C.kind === "gr" ? C.mount.site.key : C.key;
if (!M)
return;
M.L.seams.forEach(function (S) { if (!S.glow)
return; var v = mngVein(key, S.i); S.glow.visible = !v || (v.left > 0 && !v.shut); });
mngLodeMark(M, key);
};
})();
function mngStep() {
var H = MNG.hew, n = Date.now(), P = typeof camera !== "undefined" && camera ? camera.position : null;
if (!MG.cur) {
if (H)
mngHewStop(null);
if (MNG.air) {
MNG.air = null;
}
mngHudPaint();
return;
}
if (H && P) {
var moved = Math.hypot(P.x - H.x, P.z - H.z);
if (moved > 3.2) {
mngHewStop(H.phase === "prop" ? "You left the prop half set." : "You step away from the face and stop hewing.");
return;
}
if (H.phase === "hew") {
if (n - H.swing > 1500) {
H.swing = n;
mngSwing();
}
if (n - H.t0 >= H.secs * 1000)
mngHewSend();
}
else if (H.phase === "prop" && n - H.t0 >= 8000) {
H.phase = "send";
mngPropDone();
}
else if (H.phase === "creak" && n - H.t0 >= 46000) {
H.phase = "hew";
H.t0 = n - H.secs * 1000;
mngHewSend();
}
}
if (MNG.air && P) {
if (Math.hypot(P.x - MNG.air.x, P.z - MNG.air.z) >= 18)
mngFresh();
else if (n - MNG.air.at > 62000 && !MNG.air.sent) {
MNG.air.sent = 1;
if (H)
mngHewStop(null);
var W = mngWhere();
if (W)
mngRpc("mine_hew", { p_key: mngKeyOf(W), p_face: -1 }).then(function (o) { if (o && o.carried) {
MNG.air = null;
MNG.cart = Object.assign({}, MNG.cart || {}, { loads: +o.cart || 0 });
mngCarried(o.say);
}
else {
MNG.air = null;
mngHudPaint();
} }).catch(function () { MNG.air = null; });
}
}
mngHudPaint();
}
setInterval(function () { try {
mngStep();
}
catch (e) {
if (!MNG.e1) {
MNG.e1 = 1;
if (window.console)
console.warn("[mining guild]", e);
}
} }, 250);
(function frame() { try {
mngCartFrame();
}
catch (e) { } if (typeof requestAnimationFrame === "function")
requestAnimationFrame(frame); })();
setInterval(function () { if (MG.cur)
mngLoad(false); }, 15000);
setTimeout(function () { mngLoad(true); }, 12000);
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-mining"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-mining";
b.title = "The Miners' Guild: today's mother lode, contracts, the week's table and your rank";
b.textContent = "⛏️ Mining";
b.onclick = function () { mngBoardCard(); };
bar.appendChild(b);
}
if (typeof document !== "undefined")
setTimeout(hook, 1900);
})();
