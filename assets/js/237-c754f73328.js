/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var PASS = { view: "chase", cam: null, drv: null, drvT: 0, riders: [], seenAsk: {}, open: "ask", as: null, dest: null, destT: 0,
seat: null, state: null, disp: null, look: 0, yawSet: 0, prevFly: false, rideT: 0, pend: null, pendDriver: null,
near: [], nearT: 0, invite: null, carpools: [], work: [], workT: 0, pass: null,
panel: null, tab: "seats", chipKey: "", barKey: "", btn: null, carG: null, off: 0, warned: false, busy: false, lastSay: "" };
var PASS_FAMILY = null, PASS_COMPANY = null, PASS_FOUND = [];
function PASS_me() { return (typeof myUserId === "function") ? myUserId() : null; }
function PASS_live() {
return !!(typeof walkMode !== "undefined" && walkMode && typeof signedIn === "function" && signedIn() &&
typeof joinedSomnucor === "function" && joinedSomnucor() && typeof inSomnucorNow === "function" && inSomnucorNow() &&
typeof ATLC !== "undefined" && ATLC && !(typeof amVisiting === "function" && amVisiting()));
}
function PASS_e(s) { return (typeof esc === "function") ? esc(s == null ? "" : String(s)) : String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return "&#" + c.charCodeAt(0) + ";"; }); }
function PASS_say(h) { if (typeof setStatus === "function")
setStatus(h); }
function PASS_rpc(name, args) {
if (PASS.off > Date.now())
return Promise.resolve({ ok: false, say: "Lifts are not open yet.", off: true });
return cityRpc(name, args || {}).then(function (r) { return r || { ok: false, say: "No answer." }; }).catch(function (e) {
var m = (e && e.message) || "";
if (/function|schema cache|PGRST2/i.test(m)) {
PASS.off = Date.now() + 60000;
if (!PASS.warned && window.console) {
PASS.warned = true;
console.warn("[passengers] the server lacks the latest server update:", m.slice(0, 160));
}
return { ok: false, say: (typeof notOpenYet === "function") ? notOpenYet("Lifts are not open yet.", "Run the latest server update to open lifts.") : "Lifts are not open yet.", off: true };
}
return { ok: false, say: m || "That did not go through." };
});
}
function PASS_name(arch) {
var v = (typeof VEH !== "undefined" && VEH[arch]) || (typeof FLYER !== "undefined" && FLYER[arch]);
return (v && v.name) || arch || "car";
}
function PASS_when(t) {
if (!t)
return "";
var d = new Date(t);
if (isNaN(d.getTime()))
return "";
return d.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });
}
function PASS_dist(m) { return m < 1000 ? (Math.round(m / 5) * 5) + " m" : (m / 1000).toFixed(1) + " km"; }
function PASS_way(dx, dz) {
if (typeof compassWord !== "function" || typeof bearingOfHeading !== "function")
return "";
return compassWord(bearingOfHeading(Math.atan2(-dx, -dz)));
}
function PASS_ang(a) { return ((a % (Math.PI * 2)) + Math.PI * 3) % (Math.PI * 2) - Math.PI; }
function PASS_seatH(arch) { return (typeof RIDE_SEAT !== "undefined" && RIDE_SEAT[arch] !== undefined) ? RIDE_SEAT[arch] : 0; }
function PASS_flyer(arch) { return !!(typeof FLYER !== "undefined" && FLYER[arch]); }
var PASS_LAYOUT = {
car: [[-0.55, 0], [-0.55, 1.0], [0, 1.0], [0.55, 1.0]], taxicab: [[-0.55, 0], [-0.55, 1.0], [0, 1.0], [0.55, 1.0]],
coupe: [[-0.55, 0], [-0.45, 0.95], [0.45, 0.95]], vintagecar: [[-0.55, 0], [-0.45, 1.0], [0.45, 1.0]],
hovercar: [[-0.55, 0], [-0.45, 0.95], [0.45, 0.95]], roadster: [[-0.55, 0]], sportscar: [[-0.55, 0]],
limousine: [[-0.55, 0], [-0.5, 1.3], [0.5, 1.3], [-0.5, 2.2], [0.5, 2.2], [-0.5, 3.0], [0.5, 3.0]],
van: [[-0.55, 0], [-0.55, 1.1], [0, 1.1], [0.55, 1.1], [-0.55, 2.0], [0, 2.0], [0.55, 2.0]],
truck: [[-0.6, 0], [0.6, 0]], motorbike: [[0, 0.55]], scooter: [[0, 0.5]],
carriage: [[-0.4, 1.0], [0.4, 1.0], [0, 1.0]], hansomcab: [[-0.35, 0.2], [0.35, 0.2]], wagon: [[-0.5, 1.2], [0.5, 1.2], [-0.5, 2.0], [0.5, 2.0]], cart: [[0.45, 0]],
dragon: [[0, 0.9]], broomstick: [[0, 0.55]], flyingcarpet: [[-0.45, 0.6], [0.45, 0.6]], pegasus: [[0, 0.6]], griffin: [[0, 0.6]], hippogriff: [[0, 0.6]],
saucer: [[-0.7, 0], [0.7, 0]], sleigh: [[0, 0.9], [-0.4, 1.6], [0.4, 1.6]], firechariot: [[0, 0.5]]
};
function PASS_seatXZ(arch, i) { return __ZC(237, 0, this, arguments, new.target); }
function PASS_board(r) { return __ZC(237, 1, this, arguments, new.target); }
function PASS_state(r) { return __ZC(237, 2, this, arguments, new.target); }
function PASS_hopOut(gone, why, force) { return __ZC(237, 3, this, arguments, new.target); }
function PASS_carNow(dt) { return __ZC(237, 4, this, arguments, new.target); }
function PASS_riderFrame(dt) { return __ZC(237, 5, this, arguments, new.target); }
function PASS_toggleView() {
PASS.view = PASS.view === "seat" ? "chase" : "seat";
PASS.cam = null;
try {
localStorage.setItem("somnu.passview", PASS.view);
}
catch (e) { }
PASS_paintBar();
}
try {
var PASS_v0 = localStorage.getItem("somnu.passview");
if (PASS_v0 === "seat" || PASS_v0 === "chase")
PASS.view = PASS_v0;
}
catch (e) { }
function PASS_myCarMesh() {
if (!PASS.seat)
return null;
var dp = (typeof presenceOthers !== "undefined") ? presenceOthers[PASS.seat.driver] : null;
if (dp && dp.group && dp.group.userData.passCar)
return dp.group.userData.passCar;
return PASS.carG;
}
function PASS_render(rv, self, args) { return __ZC(237, 6, this, arguments, new.target); }
function PASS_lookOf(g) { return (g && g.userData && g.userData.passLook) || null; }
function PASS_carBase(id) { return __ZC(237, 7, this, arguments, new.target); }
function PASS_seatAll() {
if (typeof presenceOthers === "undefined")
return;
if (PASS.seat && PASS.disp) {
var D = PASS.disp, dp = presenceOthers[PASS.seat.driver], base = terrainY(D.x, D.z);
if (PASS.seat.mode === "fly" && typeof D.y === "number")
base = D.y - PASS_seatH(PASS.seat.arch);
if (dp && dp.group) {
dp.group.position.set(D.x, base, D.z);
dp.group.rotation.y = D.h;
if (PASS.carG) {
scene.remove(PASS.carG);
PASS.carG = null;
}
}
else {
if (!PASS.carG || PASS.carG.userData.arch !== PASS.seat.arch) {
if (PASS.carG)
scene.remove(PASS.carG);
try {
PASS.carG = build({ id: "__pass_car", archetype: PASS.seat.arch, attrs: {}, solid: false, detail: 3, nights: [], city: true });
PASS.carG.traverse(function (m) { m.raycast = function () { }; });
PASS.carG.userData.arch = PASS.seat.arch;
scene.add(PASS.carG);
}
catch (e) {
PASS.carG = null;
}
}
if (PASS.carG) {
PASS.carG.position.set(D.x, base, D.z);
PASS.carG.rotation.y = D.h + Math.PI;
}
}
}
Object.keys(presenceOthers).forEach(function (id) {
var p = presenceOthers[id], L = PASS_lookOf(p.group), ps = L && L.pass;
if (!ps || !ps.d)
return;
var B = PASS_carBase(ps.d);
if (!B)
return;
var o = PASS_seatXZ(ps.a, ps.s), c = Math.cos(B.rot), s = Math.sin(B.rot);
p.group.position.set(B.x + o[0] * c + o[1] * s, B.y, B.z - o[0] * s + o[1] * c);
p.group.rotation.y = B.rot;
});
}
function PASS_sit(fig, arch) {
var lm = fig && fig.userData && fig.userData.limbs;
if (!lm)
return;
[lm.ll, lm.rl].forEach(function (l) { if (l) {
l.rotation.x = -1.4;
l.rotation.z = 0;
} });
}
function PASS_kind() {
var D = DRIVE, id = D.spec && D.spec.id;
if (PASS.as && id === PASS.as.id)
return PASS.as;
if (id === "__keeper_limo")
return { kind: "limo" };
return { kind: "own" };
}
function PASS_canHost() {
var D = (typeof DRIVE !== "undefined") ? DRIVE : null;
if (!D || !D.on || !D.mode || !PASS_live())
return false;
if (store.inside || D.src === "corp")
return false;
if ((D.test && D.test.active) || (D.spec && D.spec.learner))
return false;
var pl = (typeof myPlace === "function") ? myPlace() : { place: "out" };
return pl.place === "out";
}
function PASS_send() { return __ZC(237, 8, this, arguments, new.target); }
var PASS_names = {};
function PASS_findName(id) { return PASS_names[id] || null; }
function PASS_driverTick(dt) {
var host = PASS_canHost();
if (host) {
if (!PASS.drv)
PASS.drvT = 0;
PASS.drvT -= dt;
if (PASS.drvT <= 0 && !PASS.busy) {
PASS.drvT = PASS.riders.length ? 1 : 3;
if (!PASS.drv)
PASS.drv = { seats: 0 };
PASS_send();
}
PASS_destTick(dt);
}
else if (PASS.drv) {
var had = PASS.riders.filter(function (x) { return x.status === "seated"; }).length;
PASS.drv = null;
PASS.riders = [];
PASS.as = PASS.as && DRIVE.on ? PASS.as : null;
PASS.dest = null;
PASS_rpc("pass_stop");
if (had)
PASS_say("<b>Everybody out.</b> Your passengers step out with you.");
PASS_paint();
}
}
function PASS_destTick(dt) { return __ZC(237, 9, this, arguments, new.target); }
function PASS_answer(id, yes) {
return PASS_rpc("pass_answer", { p_rider: id, p_yes: !!yes }).then(function (r) {
if (r.say)
PASS_say(PASS_e(r.say));
if (r.riders)
PASS.riders = r.riders;
PASS.drvT = 0.3;
PASS_paint();
});
}
function PASS_invite(id) {
return PASS_rpc("pass_invite", { p_user: id }).then(function (r) { if (r.say)
PASS_say(PASS_e(r.say)); if (r.riders)
PASS.riders = r.riders; PASS_paint(); });
}
function PASS_carsNear() {
if (typeof presenceOthers === "undefined")
return false;
var P = camera.position, any = false;
Object.keys(presenceOthers).forEach(function (id) {
var p = presenceOthers[id], L = PASS_lookOf(p.group);
if (!L || !L.ride || !p.group)
return;
if (typeof vehicleKindOf === "function" && !vehicleKindOf(L.ride))
return;
if (Math.hypot(p.group.position.x - P.x, p.group.position.z - P.z) < 32)
any = true;
});
return any;
}
function PASS_poll() { return __ZC(237, 10, this, arguments, new.target); }
function PASS_rideState(r) { return __ZC(237, 11, this, arguments, new.target); }
function PASS_ask(driver) { return __ZC(237, 12, this, arguments, new.target); }
function PASS_cancel() {
PASS.pend = null;
PASS.pendDriver = null;
PASS.invite = null;
PASS.pick = null;
return PASS_rpc("pass_leave").then(function () { PASS_paint(); });
}
function PASS_take(arch, as, attrs) { return __ZC(237, 13, this, arguments, new.target); }
function PASS_carColour(n) { return [0x2A4A7A, 0x7A2A2A, 0x2A6A4A, 0xD8D0C0, 0x3A3A44, 0x8A6A2A][Math.abs(n | 0) % 6]; }
var PASS_CSS = "#pass-btn{position:fixed;z-index:40;left:calc(10px + env(safe-area-inset-left,0px));bottom:calc(228px + env(safe-area-inset-bottom,0px));" +
"width:40px;height:40px;border-radius:12px;border:1px solid rgba(232,198,106,.55);background:rgba(20,16,40,.82);color:#E8C66A;" +
"font:18px/38px system-ui,sans-serif;text-align:center;cursor:pointer;padding:0;display:none}" +
"#pass-btn .pass-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}" +
"#pass-btn .b{position:absolute;top:-5px;right:-5px;min-width:17px;height:17px;border-radius:9px;background:#E8C66A;color:#17120A;font:600 11px/17px system-ui,sans-serif;padding:0 3px;box-sizing:border-box}" +
"#pass-chip{position:fixed;z-index:47;left:50%;transform:translateX(-50%);bottom:calc(240px + env(safe-area-inset-bottom,0px));display:none;" +
"max-width:calc(100vw - 32px);box-sizing:border-box;background:rgba(14,12,26,.95);color:#EDE8F8;border:1px solid #3A3160;border-radius:14px;" +
"padding:8px 10px;font:14px system-ui,sans-serif;align-items:center;gap:8px;flex-wrap:wrap;justify-content:center}" +
"#pass-chip span{flex:1 1 160px;min-width:0}" +
"#pass-chip button,#pass-bar button,#pass-panel .pp-b{background:#E8C66A;color:#17120A;border:0;border-radius:12px;padding:7px 13px;font:600 14px system-ui,sans-serif;cursor:pointer;min-height:36px}" +
"#pass-chip button.b2,#pass-bar button.b2,#pass-panel .pp-b.b2{background:#2A2448;color:#EDE8F8}" +
"#pass-bar{position:fixed;z-index:47;left:50%;transform:translateX(-50%);top:calc(64px + env(safe-area-inset-top,0px));display:none;" +
"max-width:calc(100vw - 32px);box-sizing:border-box;background:rgba(14,12,26,.95);color:#EDE8F8;border:1px solid rgba(232,198,106,.55);border-radius:14px;" +
"padding:7px 8px 7px 12px;font:14px system-ui,sans-serif;align-items:center;gap:10px}" +
"#pass-bar span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}" +
"#pass-bar button{white-space:nowrap}" +
"body.ps-phone #pass-bar{top:calc(142px + env(safe-area-inset-top,0px));left:calc(10px + env(safe-area-inset-left,0px));right:calc(60px + env(safe-area-inset-right,0px));transform:none;max-width:none}" +
"body:not(.ps-phone) #pass-bar{top:calc(100px + env(safe-area-inset-top,0px))}" +
"#pass-panel{position:fixed;z-index:58;left:50%;transform:translateX(-50%);top:calc(56px + env(safe-area-inset-top,0px));display:none;flex-direction:column;" +
"width:min(440px,calc(100vw - 16px));max-height:calc(100vh - 120px);box-sizing:border-box;background:#0C0A16;color:#EDE8F8;" +
"border:1px solid #3A3160;border-radius:16px;font:14px system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.55)}" +
"#pass-panel.on{display:flex}" +
"body.ps-phone #pass-panel{top:auto;bottom:0;left:0;right:0;transform:none;width:auto;max-height:62vh;border-radius:18px 18px 0 0;padding-bottom:env(safe-area-inset-bottom,0px)}" +
"#pass-panel .pp-top{display:flex;align-items:center;gap:6px;padding:10px 10px 6px 14px}" +
"#pass-panel .pp-top b{flex:1;font:600 16px Georgia,serif}" +
"#pass-panel .pp-tabs{display:flex;gap:4px;padding:0 8px 8px;border-bottom:1px solid #3A3160;overflow-x:auto}" +
"#pass-panel .pp-tabs button{flex:1 0 auto;background:#1E1A34;color:#CFC8E8;border:1px solid #3A3160;border-radius:10px;padding:7px 10px;font:600 13px system-ui,sans-serif;min-height:36px;cursor:pointer}" +
"#pass-panel .pp-tabs button.on{background:#E8C66A;color:#17120A;border-color:#E8C66A}" +
"#pass-panel .pp-body{overflow-y:auto;-webkit-overflow-scrolling:touch;padding:10px 14px 14px}" +
"#pass-panel h4{margin:12px 0 6px;font:600 12px system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#E8C66A}" +
"#pass-panel h4:first-child{margin-top:2px}" +
"#pass-panel .pp-row{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:7px 0;border-bottom:1px solid rgba(58,49,96,.6);flex-wrap:wrap}" +
"#pass-panel .pp-row>span{flex:1 1 150px;min-width:0}" +
"#pass-panel .pp-row .pp-acts{display:flex;gap:6px;flex-wrap:wrap}" +
"#pass-panel .pp-dim{color:#9C94B8;font-size:13px}" +
"#pass-panel .pp-card{background:#1A1630;border:1px solid #3A3160;border-radius:12px;padding:10px 12px;margin:4px 0 8px}" +
"#pass-panel input,#pass-panel select{background:#0B0A14;border:1px solid #3A3160;color:#EDE8F8;border-radius:10px;padding:8px 10px;font:16px system-ui,sans-serif;min-width:0;box-sizing:border-box}" +
"#pass-panel .pp-line{display:flex;gap:6px;align-items:center;flex-wrap:wrap}" +
"#dhud .dh-btns .btn.pass-seats{position:relative}" +
"#dhud .dh-btns .btn.pass-seats i{font-style:normal;display:inline-block;min-width:15px;margin-left:5px;padding:0 4px;border-radius:8px;background:#E8C66A;color:#17120A;font-size:11px}";
function PASS_build() {
if (PASS.btn || !document.body)
return;
var st = document.createElement("style");
st.id = "pass-css";
st.textContent = PASS_CSS;
document.head.appendChild(st);
var b = document.createElement("button");
b.id = "pass-btn";
b.type = "button";
b.title = "Lifts, family cars and the carpool";
b.innerHTML = "<span aria-hidden='true'>&#128663;</span><span class='pass-sr'> Lifts &amp; carpool</span>";
b.addEventListener("click", function () { if (PASS.panel && PASS.panel.classList.contains("on"))
PASS_close();
else
PASS_openPanel(PASS.seat || PASS.drv ? "seats" : PASS.tab); });
document.body.appendChild(b);
PASS.btn = b;
var c = document.createElement("div");
c.id = "pass-chip";
document.body.appendChild(c);
c.addEventListener("click", PASS_click);
var r = document.createElement("div");
r.id = "pass-bar";
document.body.appendChild(r);
r.addEventListener("click", PASS_click);
var p = document.createElement("div");
p.id = "pass-panel";
p.innerHTML = '<div class="pp-top"><b>Lifts</b><button type="button" class="pp-b b2" data-pa="close">Close</button></div>' +
'<div class="pp-tabs"><button type="button" data-pt="seats">Seats</button><button type="button" data-pt="family">Family</button>' +
'<button type="button" data-pt="company">Company</button><button type="button" data-pt="pass">Lift Pass</button></div><div class="pp-body" id="pass-body"></div>';
document.body.appendChild(p);
PASS.panel = p;
p.addEventListener("click", PASS_click);
["keydown", "keyup", "keypress"].forEach(function (k) {
p.addEventListener(k, function (e) {
if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) {
e.stopPropagation();
if (k === "keydown" && e.key === "Enter" && e.target.id === "pass-q") {
e.preventDefault();
PASS_search();
}
if (k === "keydown" && e.key === "Escape")
e.target.blur();
}
});
});
p.addEventListener("change", function (e) { var t = e.target; if (t && t.id === "pass-open") {
PASS.open = t.value;
PASS.drvT = 0;
PASS_paint();
} });
}
function PASS_openPanel(tab) {
PASS_build();
PASS.tab = tab || PASS.tab;
PASS.panel.classList.add("on");
PASS_paintChip();
if (PASS.tab === "family")
PASS_loadFamily();
if (PASS.tab === "company")
PASS_loadCompany();
if (PASS.tab === "pass" || PASS.tab === "seats")
PASS_loadPass();
PASS_paintPanel();
}
function PASS_close() { if (PASS.panel)
PASS.panel.classList.remove("on"); }
function PASS_loadPass() { return PASS_rpc("pass_lift_status").then(function (r) { if (r.ok) {
PASS.pass = r;
PASS_paintPanel();
} }); }
function PASS_loadFamily() { return PASS_rpc("pass_family_board").then(function (r) { PASS_FAMILY = r; PASS_paintPanel(); }); }
function PASS_loadCompany() { return PASS_rpc("pass_company_board").then(function (r) { PASS_COMPANY = r; if (r.ok) {
PASS.work = r.works || [];
if (r.pass)
PASS.pass = r.pass;
} PASS_paintPanel(); }); }
function PASS_search() { return __ZC(237, 14, this, arguments, new.target); }
function PASS_passLine() { return __ZC(237, 15, this, arguments, new.target); }
function PASS_paintPanel() { return __ZC(237, 16, this, arguments, new.target); }
function PASS_mins(m) { m = Math.max(0, Math.round(m)); return m < 60 ? m + " min" : Math.floor(m / 60) + " h " + (m % 60) + " min"; }
function PASS_seatPickHtml() { return __ZC(237, 17, this, arguments, new.target); }
function PASS_seatPickLoad() { return __ZC(237, 18, this, arguments, new.target); }
function PASS_moveSeat(n) { return __ZC(237, 19, this, arguments, new.target); }
function PASS_click(e) { return __ZC(237, 20, this, arguments, new.target); }
function PASS_paintChip() {
var c = document.getElementById("pass-chip");
if (!c)
return;
var h = "", key = "", P = camera.position;
if (PASS_live() && !store.inside && !PASS.seat && !(PASS.panel && PASS.panel.classList.contains("on"))) {
if (PASS.drv && typeof DRIVE !== "undefined" && DRIVE.on) {
var a = PASS.riders.filter(function (x) { return x.status === "asked"; })[0];
var w = PASS.riders.filter(function (x) { return x.status === "waiting" && typeof x.x === "number" && Math.hypot(ATLC.x + x.x - P.x, ATLC.z + x.z - P.z) < 16; })[0];
if (a) {
key = "ask" + a.id;
h = "<span><b>" + PASS_e(a.name) + "</b> asks for a seat.</span><button type='button' data-pa='yes' data-id='" + PASS_e(a.id) + "'>Let in</button><button type='button' class='b2' data-pa='no' data-id='" + PASS_e(a.id) + "'>No</button>";
}
else if (w) {
key = "pick" + w.id;
h = "<span><b>" + PASS_e(w.name) + "</b> is waiting here for the carpool.</span><button type='button' data-pa='yes' data-id='" + PASS_e(w.id) + "'>Pick up</button>";
}
}
else if (!(typeof DRIVE !== "undefined" && DRIVE.on)) {
if (PASS.invite) {
key = "inv" + PASS.invite.driver;
h = "<span><b>" + PASS_e(PASS.invite.name) + "</b> offers you a seat in their " + PASS_e(PASS_name(PASS.invite.arch)) + ".</span><button type='button' data-pa='ask' data-id='" + PASS_e(PASS.invite.driver) + "'>Get in</button><button type='button' class='b2' data-pa='cancel'>No thanks</button>";
}
else if (PASS.pend) {
key = "pend" + PASS.pend;
h = "<span>" + (PASS.pend === "waiting" ? "Your carpool pickup is booked. Wait here." : "Asked for a seat. Waiting for the driver…") + "</span><button type='button' class='b2' data-pa='cancel'>Cancel</button>";
}
else {
var near = (PASS.near || []).filter(function (x) { return !x.why_not && x.taken < x.seats && Math.hypot(ATLC.x + x.x - P.x, ATLC.z + x.z - P.z) < 9; })[0];
if (near) {
key = "near" + near.driver;
h = "<span><b>" + PASS_e(near.name) + "</b>'s " + PASS_e(PASS_name(near.arch)) + " · " + (near.seats - near.taken) + " seat" + (near.seats - near.taken === 1 ? "" : "s") + " free</span><button type='button' data-pa='ask' data-id='" + PASS_e(near.driver) + "'>" + (near.family || near.coworker ? "Get in" : "Ask for a seat") + "</button>";
}
else {
var soon = (PASS.work || []).filter(function (x) { return x.mins_to_shift != null && x.mins_to_shift <= 60; })[0];
var pool = soon && (PASS.carpools || []).filter(function (t) { return t.employer === soon.name && !t.why_not && t.taken < t.seats; })[0];
if (pool) {
key = "pool" + pool.driver;
h = "<span>Carpool to <b>" + PASS_e(soon.name) + "</b>: " + PASS_e(pool.name) + " is driving, " + PASS_dist(Math.hypot(ATLC.x + pool.x - P.x, ATLC.z + pool.z - P.z)) + " away.</span><button type='button' data-pa='ask' data-id='" + PASS_e(pool.driver) + "'>Ask for a pickup</button>";
}
}
}
}
}
if (key !== PASS.chipKey) {
PASS.chipKey = key;
c.innerHTML = h;
c.style.display = h ? "flex" : "none";
}
}
function PASS_paintBar() {
var b = document.getElementById("pass-bar");
if (!b)
return;
var S = PASS.seat, h = "", key = "";
if (S && walkMode) {
key = S.driver + S.seat + (S.dest || "") + PASS.view;
h = "<span>With <b>" + PASS_e(S.name) + "</b> · seat " + (S.seat + 1) + (S.dest ? " · to " + PASS_e(S.dest) : "") + "</span>" +
"<button type='button' class='b2' data-pa='view' title='Change view (V)'>" + (PASS.view === "seat" ? "Behind" : "Seat") + "</button><button type='button' data-pa='out'>Hop out</button>";
}
if (key !== PASS.barKey) {
PASS.barKey = key;
b.innerHTML = h;
b.style.display = h ? "flex" : "none";
}
}
function PASS_hudButton() {
var row = document.querySelector("#dhud .dh-btns");
if (!row)
return;
var b = row.querySelector(".pass-seats");
if (!PASS.drv || PASS.drv.fail) {
if (b)
b.remove();
return;
}
if (!b) {
b = document.createElement("button");
b.className = "btn pass-seats";
b.type = "button";
b.title = "Passengers";
var fire = function (ev) { if (ev) {
ev.preventDefault();
ev.stopPropagation();
} if (PASS.panel && PASS.panel.classList.contains("on"))
PASS_close();
else
PASS_openPanel("seats"); };
b.addEventListener("click", fire);
b.addEventListener("touchend", fire, { passive: false });
row.insertBefore(b, row.firstChild);
}
var n = PASS.riders.filter(function (x) { return x.status === "seated"; }).length, ask = PASS.riders.filter(function (x) { return x.status !== "seated"; }).length;
var t = (PASS.drv.seats ? "Seats " + n + "/" + PASS.drv.seats : "Seats") + (ask ? "<i>" + ask + "</i>" : "");
if (b.innerHTML !== t)
b.innerHTML = t;
}
function PASS_paint() { PASS_paintChip(); PASS_paintBar(); PASS_paintPanel(); }
var PASS_slow = 0;
function PASS_tick(dt) {
PASS_build();
var live = PASS_live();
if (PASS.btn) {
var show = live && !store.inside;
if ((PASS.btn.style.display === "block") !== show)
PASS.btn.style.display = show ? "block" : "none";
}
if (!live || store.inside) {
if (PASS.seat)
PASS_hopOut(true, "<b>Out of the car.</b>", true);
if (!live)
PASS_close();
}
try {
PASS_driverTick(dt);
}
catch (e) {
if (window.console)
console.warn("[passengers] drive:", e);
}
if (live && !store.inside) {
if (PASS.seat || PASS.pend) {
PASS.rideT -= dt;
if (PASS.rideT <= 0) {
PASS.rideT = PASS.seat ? 1 : 2.5;
PASS_rpc("pass_ride").then(PASS_rideState);
}
}
if (!PASS.seat && !(typeof DRIVE !== "undefined" && DRIVE.on)) {
PASS.nearT -= dt;
var near = PASS_carsNear(), pool = (PASS.work || []).some(function (w) { return w.cars && w.cars.length && w.mins_to_shift != null && w.mins_to_shift <= 60; });
var panel = PASS.panel && PASS.panel.classList.contains("on");
if (PASS.nearT <= 0 && (near || PASS.pend || PASS.invite || pool || panel)) {
PASS.nearT = near || PASS.pend || panel ? 2.5 : 15;
PASS_poll();
}
if (!near && !PASS.pend && !PASS.invite && !pool && !panel && PASS.near.length) {
PASS.near = [];
}
}
PASS.workT -= dt;
if (PASS.workT <= 0) {
PASS.workT = 300;
PASS_rpc("pass_company_board").then(function (r) { if (r.ok) {
PASS.work = r.works || [];
PASS_COMPANY = r;
if (r.pass)
PASS.pass = r.pass;
} });
}
}
PASS_seatAll();
PASS_slow -= dt;
if (PASS_slow <= 0) {
PASS_slow = 0.5;
PASS_paintChip();
PASS_paintBar();
PASS_hudButton();
if (!PASS.seat)
try {
var L = meLook();
if (L.pass) {
L.pass = null;
if (typeof publishMyLook === "function")
publishMyLook();
}
}
catch (e) { }
}
}
(function () {
if (typeof vehicleFrame === "function") {
var vf = vehicleFrame;
vehicleFrame = function (dt) {
if (PASS.seat && walkMode && !store.inside && !(typeof DRIVE !== "undefined" && DRIVE.on)) {
try {
PASS_riderFrame(dt);
}
catch (e) {
if (window.console)
console.warn("[passengers] ride:", e);
}
return true;
}
return vf.apply(this, arguments);
};
}
if (typeof rideSeatNow === "function") {
var rs = rideSeatNow;
rideSeatNow = function () { if (PASS.seat && walkMode && !store.inside)
return PASS_seatH(PASS.seat.arch); return rs.apply(this, arguments); };
}
if (typeof transitTick === "function") {
var tt = transitTick;
transitTick = function (dt) { tt.apply(this, arguments); try {
PASS_tick(dt);
}
catch (e) {
if (window.console && !PASS.tw) {
PASS.tw = 1;
console.warn("[passengers]", e);
}
} };
}
if (typeof presenceGroupFor === "function") {
var pg = presenceGroupFor;
presenceGroupFor = function (row) {
var g = pg.apply(this, arguments), L = row && row.look;
g.userData.passLook = L || null;
if (L && L.ride) {
for (var i = g.children.length - 1; i >= 0; i--) {
if (g.children[i] !== g.userData.tag) {
g.userData.passCar = g.children[i];
break;
}
}
}
if (L && L.pass && L.pass.d) {
var dy = PASS_seatH(L.pass.a);
g.children.forEach(function (c) { if (c !== g.userData.tag)
c.position.y += dy; });
if (g.userData.tag)
g.userData.tag.position.y += Math.max(0, dy);
PASS_sit(g, L.pass.a);
}
return g;
};
}
if (typeof avatarTick === "function") {
var at = avatarTick;
avatarTick = function (dt) {
at.apply(this, arguments);
if (PASS.seat && PASS.disp && typeof meG !== "undefined" && meG) {
meG.rotation.y = PASS.disp.h + Math.PI;
PASS_sit(meG, PASS.seat.arch);
meG.visible = PASS.view === "chase" || meView !== "eyes";
}
};
}
if (typeof vehicleLeave === "function") {
var vl = vehicleLeave;
vehicleLeave = function () {
var o = (typeof DRIVE !== "undefined" && DRIVE.on) ? DRIVE.spec : null, as = PASS.as;
var r = vl.apply(this, arguments);
if (o && o.passCar && !DRIVE.on) {
PASS.as = null;
PASS.dest = null;
PASS_say(as && as.kind === "company" ? "<b>Out of the company car.</b> It goes back to the company's garage." : "<b>Out of the family car.</b> It goes back to its owner's garage.");
}
return r;
};
}
if (typeof DriveHUD !== "undefined" && DriveHUD && typeof DriveHUD.open === "function") {
var dho = DriveHUD.open;
DriveHUD.open = function () { var r = dho.apply(this, arguments); try {
PASS_hudButton();
}
catch (e) { } return r; };
}
if (typeof renderView === "function") {
var rv = renderView;
renderView = function () {
if (PASS.seat && PASS.disp && walkMode && !store.inside && camera && !(typeof DRIVE !== "undefined" && DRIVE.on)) {
try {
return PASS_render(rv, this, arguments);
}
catch (e) {
if (window.console && !PASS.rw) {
PASS.rw = 1;
console.warn("[passengers] view:", e);
}
}
}
return rv.apply(this, arguments);
};
}
addEventListener("keydown", function (e) {
if (/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
if (!PASS.seat || !walkMode)
return;
if (typeof DRIVE !== "undefined" && DRIVE.on)
return;
if (e.code === "KeyQ") {
e.preventDefault();
e.stopImmediatePropagation();
PASS_hopOut(false);
}
if (e.code === "KeyV") {
e.preventDefault();
e.stopImmediatePropagation();
PASS_toggleView();
}
}, true);
addEventListener("pagehide", function () { try {
if (PASS.drv)
PASS_rpc("pass_stop");
else if (PASS.seat)
PASS_rpc("pass_leave");
}
catch (e) { } });
})();
