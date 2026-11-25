/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var TXI = { state: null, g: null, driver: null, dest: null, name: null, x: 0, z: 0, rot: 0, coming: null, leave: null, box: null, css: false, prompt: null,
quote: null, msg: "", busy: false, waitT: 0, warned: 0, drvName: null };
var TXI_NAMES = ["Sid Okonkwo", "Maggie Thorne", "Raj Varma", "Bettina Kowalczyk", "Lou Ferreira", "Dot Hennessy", "Yusuf Demir", "Peg O'Malley", "Ivo Brandt", "Nell Achebe"];
function txiKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function txiLive() {
return !!(typeof walkMode !== "undefined" && walkMode && typeof careInCity === "function" && careInCity() && !store.inside &&
!(typeof DRIVE !== "undefined" && DRIVE.on) && !(typeof PASS !== "undefined" && PASS.seat));
}
function txiFare(m) { if (txiKeeper())
return 0; return Math.min(25, 2 + Math.ceil(Math.max(0, m) / 400)); }
function txiPlaces() {
var L = [];
var H = typeof homeGuideFind === "function" ? homeGuideFind() : null;
if (H && H.spec)
L.push({ k: "home", name: "Home (" + H.name + ")" });
(typeof tglPlaces === "function" ? tglPlaces() : []).forEach(function (p) { if (p.k !== "garage")
L.push(p); });
return L;
}
function txiTarget(k) { return __ZC(246, 0, this, arguments, new.target); }
function txiRouteFrom(x, z, T) { return typeof tglRoute === "function" ? tglRoute({ x: x, z: z }, { x: T.x, z: T.z }) : [{ x: T.x, z: T.z }]; }
function txiMetres(x, z, route) {
var m = 0, cx = x, cz = z;
route.forEach(function (W) { if (W.lift) {
m += 40;
cx = W.to.x;
cz = W.to.z;
return;
} if (W.x === undefined)
return; m += Math.hypot(W.x - cx, W.z - cz); cx = W.x; cz = W.z; });
return Math.round(m);
}
function txiModel() { return __ZC(246, 1, this, arguments, new.target); }
function txiDriverFig(nm) { return __ZC(246, 2, this, arguments, new.target); }
function txiSeat(fig, g) { return __ZC(246, 3, this, arguments, new.target); }
function txiEnsure() { return __ZC(246, 4, this, arguments, new.target); }
function txiPlace(x, z, rot) { TXI.x = x; TXI.z = z; TXI.rot = rot; TXI.g.position.set(x, terrainY(x, z), z); TXI.g.rotation.y = rot; TXI.g.visible = true; }
function txiCall(k) { return __ZC(246, 5, this, arguments, new.target); }
function txiSendAway() {
if (TXI.state !== "waiting" && TXI.state !== "coming")
return;
TXI.state = null;
TXI.coming = null;
txiGoAway(TXI.x, TXI.z, TXI.rot);
setStatus("The cab goes on its way.");
txiOpen(false);
}
function txiGoAway(x, z, rot) {
if (!TXI.g)
return;
txiSeat(TXI.driver, TXI.g);
txiPlace(x, z, rot);
TXI.leave = { t0: performance.now(), x: x, z: z, rot: rot };
}
function txiNotOpen() {
var keep = txiKeeper();
return "<b>Cabs are not running yet.</b> " + (keep ? "Run the latest server update on the database to start them." : "They start once the city's server has its next update.");
}
function txiRide() { return __ZC(246, 6, this, arguments, new.target); }
function txiGo(T, route, fare) { return __ZC(246, 7, this, arguments, new.target); }
function txiAlong(x, z, rot, d) { return __ZC(246, 8, this, arguments, new.target); }
function txiArrive(A, early, cx, cz, h) { return __ZC(246, 9, this, arguments, new.target); }
function txiTick(dt) {
var now = performance.now();
if (TXI.coming) {
var C = TXI.coming, k = Math.min(1, (now - C.t0) / 1000 / C.dur), e = 1 - Math.pow(1 - k, 3), cd = Math.hypot(C.to.x - C.from.x, C.to.z - C.from.z);
var Qc = txiAlong(C.to.x, C.to.z, C.rot + Math.PI, cd * (1 - e));
txiPlace(Qc.x, Qc.z, Qc.rot + Math.PI);
if (k >= 1) {
TXI.coming = null;
TXI.state = "waiting";
TXI.waitT = 0;
var T = txiTarget(TXI.dest), route = T ? txiRouteFrom(TXI.x, TXI.z, T) : [], f = txiFare(txiMetres(TXI.x, TXI.z, route));
setStatus("<b>Your cab is here.</b> Press E beside it (or tap it) to get in" + (f ? ": " + f + " gold to " + esc(TXI.name) + ", paid as you set off." : "."));
}
}
if (TXI.leave) {
var L = TXI.leave, t = (now - L.t0) / 1000, d = Math.min(60, t * t * 1.6 + t * 2), Q = txiAlong(L.x, L.z, L.rot, d);
txiPlace(Q.x, Q.z, Q.rot);
if (t > 6) {
TXI.leave = null;
TXI.g.visible = false;
}
}
if (TXI.g && TXI.g.visible && !(typeof careInCity === "function" && careInCity()))
TXI.g.visible = false;
if (TXI.state === "waiting") {
var P = camera.position, dd = Math.hypot(P.x - TXI.x, P.z - TXI.z);
TXI.waitT += dt || 0;
if (dd > 80 || TXI.waitT > 180 || !(typeof careInCity === "function" && careInCity())) {
txiSendAway();
}
}
var pr = txiPromptEl(), near = txiNear(), show = !!near;
if (pr && (pr.style.display === "block") !== show)
pr.style.display = show ? "block" : "none";
}
function txiNear() {
if (TXI.state !== "waiting" || !walkMode || store.inside || (typeof DRIVE !== "undefined" && DRIVE.on))
return false;
var P = camera.position;
return Math.hypot(P.x - TXI.x, P.z - TXI.z) < 4.8;
}
function txiPromptEl() {
if (TXI.prompt || !document.body)
return TXI.prompt;
var el = document.createElement("div");
el.id = "txi-prompt";
el.style.cssText = "position:fixed;left:50%;bottom:calc(120px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:45;display:none;background:rgba(14,12,20,.92);border:1px solid #E8C440;border-radius:4px;padding:7px 14px;font:14px system-ui,sans-serif;color:#F2EEE4;cursor:pointer";
el.innerHTML = "<b>Your cab</b> · press E or tap to get in";
el.onclick = function (ev) { ev.stopPropagation(); txiRide(); };
document.body.appendChild(el);
TXI.prompt = el;
return el;
}
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (e.code !== "KeyE" || !txiNear() || /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
e.preventDefault();
e.stopImmediatePropagation();
txiRide();
}, true);
var TXI_CSS = "#txi-box{position:fixed;left:58px;bottom:calc(84px + env(safe-area-inset-bottom,0px));z-index:58;width:min(330px,calc(100vw - 70px));max-height:min(74vh,600px);overflow:auto;display:none;background:#0E0B18;border:1px solid #8A7A2A;border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,.6);color:#EDE8F8;font:14px/1.45 system-ui,sans-serif;padding:12px 14px}" +
"#txi-box h3{margin:0 0 4px;font:600 16px Georgia,serif}#txi-box .s{color:#A9A2C0;font-size:12.5px}" +
"#txi-box button{background:#E8C440;color:#17120A;border:0;border-radius:14px;padding:7px 12px;font:600 13px system-ui,sans-serif;cursor:pointer;margin:3px 4px 3px 0}" +
"#txi-box button.b2{background:#2A2448;color:#EDE8F8}#txi-box select{width:100%;box-sizing:border-box;background:#15122A;color:#fff;border:1px solid #3A3160;border-radius:10px;padding:8px;font:14px system-ui,sans-serif;margin:6px 0}" +
"@media (max-width:600px){#txi-box{left:10px;width:calc(100vw - 20px)}}";
function txiOpen(on) { return __ZC(246, 10, this, arguments, new.target); }
(function () {
if (typeof presenceGroupFor === "function") {
var pg = presenceGroupFor;
presenceGroupFor = function (row) {
var g = pg.apply(this, arguments), L = row && row.look;
if (L && L.ride === "taxicab" && L.cab) {
for (var i = g.children.length - 1; i >= 0; i--) {
var v = g.children[i];
if (v === g.userData.tag)
continue;
try {
if (typeof modelDress === "function")
modelDress(v, { id: "__ptaxi_" + row.user_id, archetype: "taxicab", attrs: {}, solid: true, placed: true, city: true });
}
catch (e) { }
try {
txiSeat(txiDriverFig("cab" + row.user_id), v);
}
catch (e) { }
break;
}
}
return g;
};
}
if (typeof licenceStatusFor === "function") {
var ls = licenceStatusFor;
licenceStatusFor = function (kind) {
if (kind === "driving" && typeof TGL !== "undefined" && TGL.auto && TGL.auto.taxi)
return { word: "Licensed cab driver · " + (TXI.drvName || "the driver"), cls: "ok" };
return ls.apply(this, arguments);
};
}
if (typeof chaufCrash === "function") {
var cc = chaufCrash;
chaufCrash = function (what, mph) {
if (TGL.auto && TGL.auto.taxi) {
if (typeof CHAUF !== "undefined") {
if (Date.now() - CHAUF.crashAt < 6000)
return;
CHAUF.crashAt = Date.now();
CHAUF.stopNow = true;
CHAUF.said = null;
}
setStatus("<b>The cab stops at once.</b> " + esc(TXI.drvName || "The driver") + " " + esc(what) + ". The cab company's insurance deals with it; you step out.");
return;
}
return cc.apply(this, arguments);
};
}
if (typeof crashLog === "function") {
var cl = crashLog;
crashLog = function () { if (typeof TGL !== "undefined" && TGL.auto && TGL.auto.taxi)
return; return cl.apply(this, arguments); };
}
if (typeof transitTick === "function") {
var tt = transitTick, pub = "";
transitTick = function (dt) {
tt.apply(this, arguments);
try {
txiTick(dt);
var cab = !!(TGL.auto && TGL.auto.taxi) ? "1" : "";
if (cab !== pub && typeof meLook === "function") {
pub = cab;
var L = meLook();
L.cab = cab ? 1 : null;
if (typeof publishMyLook === "function")
publishMyLook();
}
}
catch (e) {
if (window.console && TXI.warned++ < 3)
console.warn("[cabs]", e);
}
};
}
})();
