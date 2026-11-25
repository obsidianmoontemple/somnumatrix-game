/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(246, function () {
"use strict";
return [
function (k) {
if (k === "home") {
var H = typeof homeGuideFind === "function" ? homeGuideFind() : null;
if (!H || !H.spec)
return null;
var D = null;
try {
D = typeof doorWorld === "function" ? doorWorld(H.spec) : null;
}
catch (e) { }
if (D && D.out)
return { x: D.x + D.out.x * 8, z: D.z + D.out.z * 8, name: H.name };
return { x: H.spec.x + 8, z: H.spec.z + 8, name: H.name };
}
return typeof tglTarget === "function" ? tglTarget(k) : null;
},
function () {
var g = build({ id: "__taxi_wait", archetype: "taxicab", attrs: {}, solid: false, detail: 4, nights: [], city: true });
if (typeof modelDress === "function")
try {
modelDress(g, { id: "__taxi_wait", archetype: "taxicab", attrs: {}, solid: true, placed: true, city: true });
}
catch (e) { }
g.traverse(function (m) { m.raycast = function () { }; });
return g;
},
function (nm) {
var id = "cab_driver_" + String(nm || "x").replace(/[^A-Za-z]/g, "").toLowerCase();
var L = typeof randomLook === "function" ? randomLook(id, "human") : blankLook("human");
L.top = 0x3A4A5A;
L.bottom = 0x22262E;
L.hat = "cap";
L.hatColor = 0x2A2A30;
var fg = buildFigure({ id: id, archetype: "human", attrs: {}, look: L, solid: false, detail: 3, nights: [], city: true }, 1);
fg.traverse(function (m) { m.raycast = function () { }; });
return fg;
},
function (fig, g) {
if (!fig || !g)
return;
if (fig.parent !== g) {
if (fig.parent)
fig.parent.remove(fig);
g.add(fig);
}
fig.position.set(0.45, 0.15, -0.9);
fig.rotation.set(0, Math.PI, 0);
fig.visible = true;
fig.userData.pose = "sit";
fig.userData.seated = true;
var lm = fig.userData.limbs;
if (lm)
[lm.ll, lm.rl].forEach(function (l) { if (l) {
l.rotation.x = -1.4;
l.rotation.z = 0;
} });
},
function () {
if (!TXI.g) {
TXI.g = txiModel();
scene.add(TXI.g);
TXI.g.visible = false;
}
if (!TXI.driver) {
var h = 0, id = String((typeof myUserId === "function" && myUserId()) || "x") + (Date.now() / 86400000 | 0);
for (var i = 0; i < id.length; i++)
h = (h * 31 + id.charCodeAt(i)) >>> 0;
TXI.drvName = TXI_NAMES[h % TXI_NAMES.length];
TXI.driver = txiDriverFig(TXI.drvName);
}
txiSeat(TXI.driver, TXI.g);
},
function (k) {
if (!txiLive()) {
setStatus(typeof DRIVE !== "undefined" && DRIVE.on ? "Get out of what you are driving first." : "Cabs run in Somnucor's streets: step outside first.");
return;
}
if (!(typeof signedIn === "function" && signedIn())) {
setStatus("Sign in to take a cab: the fare comes from your purse.");
return;
}
var T = txiTarget(k);
if (!T) {
setStatus("That place is not in the city yet.");
return;
}
txiEnsure();
var P = camera.position, h = typeof yaw !== "undefined" ? yaw : 0, spot = null;
[[3.5, 0], [-3.5, 0], [3.5, 4], [-3.5, 4], [0, 6], [5, -3], [-5, -3], [6, 0], [-6, 0]].some(function (q) {
var fx = -Math.sin(h), fz = -Math.cos(h), lx = -fz, lz = fx, x = P.x + lx * q[0] + fx * q[1], z = P.z + lz * q[0] + fz * q[1], y = terrainY(x, z);
if (!blockedAt(x, z, y) && !blockedAt(x + fx * 2.4, z + fz * 2.4, y) && !blockedAt(x - fx * 2.4, z - fz * 2.4, y)) {
spot = { x: x, z: z };
return true;
}
return false;
});
if (!spot) {
setStatus("<b>No room for a cab here.</b> Step out into the street and call again.");
return;
}
var fx2 = -Math.sin(h), fz2 = -Math.cos(h);
TXI.dest = k;
TXI.name = T.name;
TXI.state = "coming";
TXI.leave = null;
TXI.coming = { t0: performance.now(), dur: 3.4, from: { x: spot.x - fx2 * 26, z: spot.z - fz2 * 26 }, to: spot, rot: h + Math.PI };
txiPlace(TXI.coming.from.x, TXI.coming.from.z, h + Math.PI);
setStatus("<b>A cab is on its way.</b> " + esc(TXI.drvName) + ", a licensed cab driver, is coming round for you.");
txiOpen(false);
},
function () {
if (TXI.state !== "waiting" || TXI.busy)
return;
if (typeof DRIVE !== "undefined" && DRIVE.on)
return;
var T = txiTarget(TXI.dest);
if (!T) {
setStatus("That place is not in the city yet.");
return;
}
var from = { x: TXI.x, z: TXI.z }, route = txiRouteFrom(from.x, from.z, T), m = txiMetres(from.x, from.z, route);
if (m < 25) {
setStatus("<b>You are there already.</b> The cab goes on its way.");
txiSendAway();
return;
}
TXI.busy = true;
setStatus("Paying the fare…");
cityRpc("cab_ride", { p_dest: T.name, p_metres: m }).then(function (o) {
TXI.busy = false;
if (!o || !o.ok) {
setStatus(esc((o && o.say) || "The fare did not go through."));
return;
}
txiGo(T, route, o.fare || 0);
}).catch(function (e) {
TXI.busy = false;
var msg = String((e && e.message) || e || "");
if (/function|schema cache|PGRST2|does not exist/i.test(msg)) {
if (TXI.warned++ < 2 && window.console)
console.warn("[cabs] the server lacks the latest server update:", msg.slice(0, 160));
setStatus(txiNotOpen());
}
else
setStatus(esc(msg || "The fare did not go through."));
});
},
function (T, route, fare) {
if (TXI.state !== "waiting")
return;
if (typeof DRIVE !== "undefined" && DRIVE.on)
return;
TXI.state = "riding";
TXI.g.visible = false;
var P = camera.position, o = { id: "__taxi", archetype: "taxicab", attrs: {}, x: TXI.x, z: TXI.z, rot: TXI.rot };
var W0 = route[0];
if (W0 && W0.x !== undefined) {
var want = Math.atan2(-(W0.x - o.x), -(W0.z - o.z)), h0 = (o.rot || 0) + Math.PI;
if (Math.abs(Math.atan2(Math.sin(want - h0), Math.cos(want - h0))) > 1.0)
o.rot = want - Math.PI;
}
P.x = o.x;
P.z = o.z;
TGL.route = route;
TGL.wi = 0;
TGL.chk = null;
if (typeof CHAUF !== "undefined") {
CHAUF.stopNow = false;
CHAUF.holdT = 0;
CHAUF.dec = null;
}
TGL.auto = { k: TXI.dest, name: T.name, taxi: true, fare: fare };
vehicleTakeWheel(o);
if (typeof DRIVE !== "undefined") {
DRIVE.view = "chase";
DRIVE.cam = null;
}
setStatus("<b>" + esc(TXI.drvName) + " drives you to " + esc(T.name) + ".</b> " + (fare ? "You paid " + fare + " gold. " : "") + "Licensed: keeps under every limit, stops at the lights. Sit back; press Q to get out on the way.");
},
function (x, z, rot, d) {
var fx = Math.sin(rot), fz = Math.cos(rot), R = typeof roadAt === "function" ? roadAt(x, z) : null;
if (!R || R.kind !== "ring" || typeof tglPolar !== "function")
return { x: x + fx * d, z: z + fz * d, rot: rot };
var p = tglPolar(x, z), tx = -Math.sin(p.a), tz = Math.cos(p.a), sg = fx * tx + fz * tz >= 0 ? 1 : -1;
if (Math.abs(fx * tx + fz * tz) < 0.7)
return { x: x + fx * d, z: z + fz * d, rot: rot };
var a = p.a + sg * d / p.r, q = tglXZ(a, p.r);
return { x: q.x, z: q.z, rot: Math.atan2(-Math.sin(a) * sg, Math.cos(a) * sg) };
},
function (A, early, cx, cz, h) {
TXI.state = null;
setTimeout(function () { setStatus(early ? "<b>You step out of the cab.</b> It goes on its way." : "<b>" + esc(A.name || "You are there") + ".</b> You step out of the cab" + (A.fare ? " (" + A.fare + " gold, paid)" : "") + ", and it pulls away."); }, 0);
txiGoAway(cx, cz, h - Math.PI);
},
function (on) {
if (!TXI.box) {
if (!on || !document.body)
return;
var st = document.createElement("style");
st.textContent = TXI_CSS;
document.head.appendChild(st);
TXI.box = document.createElement("div");
TXI.box.id = "txi-box";
document.body.appendChild(TXI.box);
["keydown", "keyup", "keypress"].forEach(function (t) { TXI.box.addEventListener(t, function (ev) { if (/INPUT|TEXTAREA|SELECT/.test(ev.target.tagName))
ev.stopPropagation(); }); });
}
if (!on) {
TXI.box.style.display = "none";
return;
}
if (document.exitPointerLock && document.pointerLockElement)
document.exitPointerLock();
var H = [];
H.push("<div style='display:flex;justify-content:space-between'><h3>🚕 Somnucor Cabs</h3><span data-c='x' style='cursor:pointer'>✕</span></div>");
if (TXI.state === "riding")
H.push("<div class='s'>On the way to " + esc(TXI.name || "") + ". Press Q to get out on the way.</div>");
else if (TXI.state === "coming" || TXI.state === "waiting") {
H.push("<div class='s'>" + (TXI.state === "coming" ? "Your cab is on its way to you." : "Your cab is waiting beside you.") + " To " + esc(TXI.name || "") + ".</div>");
if (TXI.state === "waiting")
H.push("<button data-c='ride'>Get in and go</button>");
H.push("<button class='b2' data-c='away'>Send it away</button>");
}
else {
var opts = txiPlaces(), sel = TXI.sel && opts.some(function (p) { return p.k === TXI.sel; }) ? TXI.sel : (opts[0] && opts[0].k);
H.push("<div class='s'>A cab comes to you and takes you to the door. 2 gold on the meter and 1 gold for every 400 m, never more than 25. Paid as you set off." + (txiKeeper() ? " The Keeper rides free." : "") + "</div>");
H.push("<select data-c='to'>" + opts.map(function (p) { return "<option value='" + esc(p.k) + "'" + (p.k === sel ? " selected" : "") + ">" + esc(p.name) + "</option>"; }).join("") + "</select>");
H.push("<div class='s' data-c='quote'></div><button data-c='call'>Call a cab</button>");
}
TXI.box.innerHTML = H.join("");
TXI.box.style.display = "block";
var q = TXI.box.querySelector("[data-c='quote']"), s = TXI.box.querySelector("[data-c='to']");
var quote = function () {
if (!q || !s)
return;
TXI.sel = s.value;
var T = txiTarget(s.value);
if (!T) {
q.textContent = "That place is not in the city yet.";
return;
}
var P = camera.position, m = txiMetres(P.x, P.z, txiRouteFrom(P.x, P.z, T)), f = txiFare(m);
q.textContent = "About " + (m < 1000 ? Math.round(m / 10) * 10 + " m" : (m / 1000).toFixed(1) + " km") + " by road · " + (f ? "fare about " + f + " gold" : "free");
};
if (s) {
s.onchange = quote;
quote();
}
TXI.box.querySelectorAll("[data-c]").forEach(function (el) {
if (el.tagName === "SELECT" || el.tagName === "DIV")
return;
el.onclick = function (ev) {
ev.stopPropagation();
var c = el.getAttribute("data-c");
if (c === "x")
txiOpen(false);
if (c === "call" && s)
txiCall(s.value);
if (c === "ride") {
txiOpen(false);
txiRide();
}
if (c === "away")
txiSendAway();
};
});
}
];
});
