/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(252, function () {
"use strict";
return [
function (K) {
var W = K.W, D = K.D, put = K.put, back = Math.max(4.6, D * 0.3), zp = K.B + back;
K.wallX(zp, K.L, K.R, [K.R - 4, K.R - 2.5]);
put("tycarlift", K.L + W * 0.3, (K.B + zp) / 2, 0);
put("tytoolchest", K.L + W * 0.3 + 3.4, K.B + 0.5, 0);
put("trtoolwall", K.L + 0.1, (K.B + zp) / 2, Math.PI / 2);
put("tytyres", K.R - W * 0.3, K.B + 0.4, 0);
put("workbench", K.R - W * 0.3 - 3, K.B + 0.5, 0);
put("tywashbay", K.R - 1.4, (K.B + zp) / 2, -Math.PI / 2);
put("barrel", K.L + 0.6, K.B + 0.6, 0);
K.spot(K.L + W * 0.3, zp - 1, "the service bay");
var z0 = zp + 1, zm = (zp + K.Fz) / 2;
put("tyshowcar", 0, zm - 0.4, 0);
put("tyshowcar2", -W * 0.27, zm + 1.6, 0);
put("tyshowcar3", W * 0.06 + W * 0.18, zm + 2.4, 0);
put("tyflystand", K.R - 2.2, zp + 1.6, -Math.PI / 2 + 0.001);
for (var i = 0; i < 3; i++) {
var dz = zp + 1.6 + i * ((K.Fz - 4.4 - zp - 1.6) / 2);
put("tysalesdesk", K.L + 2.2, dz, Math.PI / 2);
put("chair", K.L + 1.3, dz, Math.PI / 2);
put("chair", K.L + 3.2, dz - 0.45, -Math.PI / 2);
put("chair", K.L + 3.2, dz + 0.45, -Math.PI / 2);
}
var ox = K.R - 6.4, oz = zp + 4.4;
K.wallZ(ox, zp, oz, [zp + 2.6]);
K.wallX(oz, ox, K.R - 2.4, []);
put("tymgrdesk", K.R - 3.6, zp + 1.7, Math.PI);
put("chair", K.R - 3.6, zp + 0.9, 0);
put("chair", K.R - 3.9, zp + 2.8, Math.PI);
put("filecabinet", K.R - 0.45, zp + 3.3, -Math.PI / 2);
put("tyfinancedesk", ox - 2.2, zp + 1.5, Math.PI);
put("chair", ox - 2.2, zp + 0.8, 0);
put("chair", ox - 2.2, zp + 2.4, Math.PI);
put("trtill", K.R - 3, K.Fz - 2.6, 0);
put("trcounter", K.R - 5.4, K.Fz - 2.6, 0);
put("typriceboard", K.L + 0.12, K.Fz - 4.4, Math.PI / 2);
put("sofa", W * 0.06, K.Fz - 1.6, Math.PI);
put("table", W * 0.06, K.Fz - 2.8, 0);
put("plant", K.L + 0.8, K.Fz - 0.9, 0);
put("plant", K.R - 0.8, K.Fz - 0.9, 0);
put("chandelier", 0, zm, 0);
put("chandelier", -W / 4, zm, 0);
put("chandelier", W / 4, zm, 0);
K.spot(K.L + 3, zp + 3, "the sales desks");
K.spot(0, zm + 3, "the showroom");
K.spot(K.R - 3.6, zp + 2, "the manager's office");
K.spot(K.R - 3, K.Fz - 3.6, "reception");
},
function () {
if (TY.prices && Date.now() - TY.pricesAt < 600000)
return Promise.resolve(TY.prices);
var get = catalogueRead("select=id,kind,archetype,name,price,speed,note&listed=eq.true", true).catch(function () { return []; });
return get.then(function (rows) { var m = {}; (rows || []).forEach(function (r) { m[r.name] = r; }); TY.prices = m; TY.pricesAt = Date.now(); return m; })
.catch(function () { return TY.prices || {}; });
},
function () {
if (TY.boardBusy || (TY.board && Date.now() - TY.boardAt < 60000) || TY.missing && Date.now() - TY.boardAt < 600000)
return Promise.resolve(TY.board);
if (!(typeof signedIn === "function" && signedIn()))
return Promise.resolve(null);
TY.boardBusy = true;
TY.boardAt = Date.now();
return cityRpc("yard_board", {}).then(function (d) { TY.boardBusy = false; TY.missing = false; if (d && d.ok)
TY.board = d; return TY.board; })
.catch(function (e) { TY.boardBusy = false; if (typeof rpcMissing === "function" && rpcMissing(e))
TY.missing = true; return TY.board; });
},
function (nm) {
var id = "yard_sales_" + String(nm || "x").replace(/[^A-Za-z]/g, "").toLowerCase();
var L = typeof randomLook === "function" ? randomLook(id, "human") : blankLook("human");
L.top = 0x2C3444;
L.bottom = 0x23272F;
L.hat = null;
var fg = buildFigure({ id: id, archetype: "human", attrs: {}, look: L, solid: false, detail: 3, nights: [], city: true }, 1);
fg.traverse(function (m) { m.raycast = function () { }; });
return fg;
},
function (nm, x, z, face) {
if (!TY.fig || TY.figFor !== nm) {
tyFigHide();
TY.fig = tyFigure(nm);
TY.figFor = nm;
}
if (TY.fig.parent !== scene) {
if (TY.fig.parent)
TY.fig.parent.remove(TY.fig);
scene.add(TY.fig);
}
var y = typeof supportAt === "function" ? supportAt(x, z, terrainY(x, z) + 1) : terrainY(x, z);
TY.fig.position.set(x, y, z);
TY.fig.rotation.set(0, face, 0);
TY.fig.visible = true;
TY.fig.userData.pose = "stand";
TY.fig.userData.seated = false;
var lm = TY.fig.userData.limbs;
if (lm)
[lm.ll, lm.rl].forEach(function (l) { if (l) {
l.rotation.x = 0;
} });
},
function () {
var P = camera.position, h = typeof yaw !== "undefined" ? yaw : 0, s = tySeller();
var fx = -Math.sin(h), fz = -Math.cos(h), lx = -fz, lz = fx, x = P.x + fx * 1.6 + lx * 1.1, z = P.z + fz * 1.6 + lz * 1.1;
if (typeof blockedAt === "function" && blockedAt(x, z, terrainY(x, z))) {
x = P.x + fx * 1.6 - lx * 1.1;
z = P.z + fz * 1.6 - lz * 1.1;
}
tyFigShow(s.name, x, z, Math.atan2(P.x - x, P.z - z));
},
function (nm) {
if (typeof rideG === "undefined" || !rideG)
return;
if (!TY.fig || TY.figFor !== nm) {
tyFigHide();
TY.fig = tyFigure(nm);
TY.figFor = nm;
}
if (TY.fig.parent !== rideG) {
if (TY.fig.parent)
TY.fig.parent.remove(TY.fig);
rideG.add(TY.fig);
}
TY.fig.position.set(-0.45, 0.15, -0.2);
TY.fig.rotation.set(0, Math.PI, 0);
TY.fig.visible = true;
TY.fig.userData.pose = "sit";
TY.fig.userData.seated = true;
var lm = TY.fig.userData.limbs;
if (lm)
[lm.ll, lm.rl].forEach(function (l) { if (l) {
l.rotation.x = -1.4;
l.rotation.z = 0;
} });
},
function () {
var o = TY.item;
if (!o)
return;
var m = TY.prices || {}, it = m[o.yardItem], arch = o.archetype || (it && it.archetype) || "", k = tyKindOf(arch), lic = tyLicOf(arch), s = tySeller();
var rows = [["Price", it ? tyMoney(it.price) : "asking…"]];
if (it && it.speed)
rows.push(["Pace", (+it.speed).toFixed(1) + " times your own"]);
rows.push(["Licence", lic === "driving" ? "a driving licence to drive it" : (lic === "flying" ? "a flying licence to fly it" : "none needed")]);
var notes = [];
if (it && it.note)
notes.push(it.note);
if (k === "road")
notes.push("Test drive: four minutes with " + s.name + " in the passenger seat. Every law of the road applies.");
else if (k === "fly")
notes.push("Test flight: four minutes. " + s.name + " watches from the lot.");
else if (k === "try")
notes.push("Try it round the yard for two minutes. No licence needed.");
else
notes.push("This one is delivered to you: there are no test runs of it in the city's streets.");
if (s.player)
notes.push(s.name + " is on duty and earns a commission on the sale.");
var h = worldFacts(o.yardItem, s.name + ", " + (s.player ? "salesperson on duty" : "salesperson"), rows, notes);
if (it)
h += worldBtn("buy", "Buy it for " + tyMoney(it.price), "It is yours, and it goes in your things.");
if (k === "road")
h += worldBtn("drive", "Test drive", "Four minutes, then bring it back to the yard.");
else if (k === "fly")
h += worldBtn("drive", "Test flight", "Four minutes, then bring it back down at the yard.");
else if (k === "try")
h += worldBtn("try", "Try it round the yard", "Two minutes, here on the lot.");
h += worldBtn("list", "Every vehicle in the yard", "With its price, and where it stands.");
if (TY.msg)
h += "<div style='margin-top:6px;opacity:.85'>" + TY.msg + "</div>";
TY.card = "item";
worldCard(h, { buy: function () { tyBuy(o.yardItem); }, drive: function () { tyDriveStart(o); }, try: function () { tyTryStart(o); }, list: function () { tyListOpen(); } });
},
function () {
tyPrices().then(function (m) {
var by = { road: [], fly: [], try: [], look: [] }, L = tyLot(), arch = {};
L.forEach(function (o) { arch[o.yardItem] = o.archetype; });
Object.keys(m).forEach(function (n) { var r = m[n], a = arch[n] || r.archetype || ""; if (!arch[n] && !(r.kind === "vehicle" || r.kind === "mount" || r.speed))
return; by[tyKindOf(a)].push(r); });
Object.keys(arch).forEach(function (n) { if (!m[n])
by[tyKindOf(arch[n])].push({ name: n, price: null }); });
if (!Object.keys(arch).length && !Object.keys(m).length) {
worldCard("<b>The Transport Yard</b><div style='opacity:.8'>The price list is not to hand just now. Walk up to anything on the lot: its board has the price.</div>");
return;
}
var heads = { road: "On the road (a driving licence)", fly: "In the air (a flying licence)", try: "To ride (no licence)", look: "Delivered to you" };
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>The Transport Yard</div><div style='opacity:.8;margin-bottom:6px'>Everything the city sells to get about on. Tap one to be shown where it stands on the lot.</div>";
var fns = {}, n = 0;
["road", "fly", "try", "look"].forEach(function (k) {
if (!by[k].length)
return;
by[k].sort(function (a, b) { return (a.price || 0) - (b.price || 0); });
h += "<div style='margin-top:8px;color:#C9A868;font-size:11px;letter-spacing:.08em;text-transform:uppercase'>" + heads[k] + "</div>";
by[k].forEach(function (r) {
var id = "v" + (n++);
fns[id] = function () { tyShowMe(r.name); };
h += "<div data-w='" + id + "' style='display:flex;justify-content:space-between;gap:10px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.1)'><span>" + esc(r.name) +
(r.speed ? " <span style='opacity:.6'>· " + (+r.speed).toFixed(1) + "× pace</span>" : "") + "</span><span style='white-space:nowrap'>" + (r.price == null ? "on its board" : tyMoney(r.price)) + "</span></div>";
});
});
TY.card = "list";
worldCard(h, fns);
});
},
function (name) {
var o = tyLot().filter(function (q) { return q.yardItem === name; })[0];
if (!o) {
setStatus("<b>" + esc(name) + "</b> is sold from the yard, but there is none standing on the lot just now: ask at reception.");
return;
}
var b = o.home || o;
guideTo = { key: name + " on the lot", x: b.x, z: b.z, yard: name };
worldCard(null);
TY.card = null;
setStatus("<b>" + esc(name) + "</b>: it stands on the lot in front of the showroom. Follow the pointer at the top of the screen.");
},
function (name) {
if (!(typeof signedIn === "function" && signedIn())) {
TY.msg = "Sign in to buy: the price comes from your purse.";
tyItemPaint();
return;
}
if (typeof hasAccess === "function" && !hasAccess() && !(typeof amKeeper === "function" && amKeeper())) {
TY.msg = "Visitors may look round the yard; buying comes with SomnuMatrix.";
tyItemPaint();
return;
}
tyPrices().then(function (m) {
var it = m[name];
if (!it) {
TY.msg = "The yard cannot price that yet.";
tyItemPaint();
return;
}
var s = tySeller();
TY.msg = "Writing it up…";
if (TY.card === "item")
tyItemPaint();
return cityRpc("yard_buy", { p_item: it.id, p_seller: s.player ? s.id : null }).then(function (o) {
TY.msg = esc((o && o.say) || "Done.");
setStatus(o && o.ok ? "<b>Bought.</b> " + esc(o.say || "") : esc((o && o.say) || ""));
return Promise.all([refreshStanding(), loadThings()]);
}).catch(function (e) {
if (typeof rpcMissing === "function" && rpcMissing(e))
return buyItem(it.id, null).then(function () { TY.msg = String(document.getElementById("status") ? document.getElementById("status").innerHTML : ""); });
TY.msg = esc(e.message);
}).then(function () { if (TY.card === "item")
tyItemPaint(); });
});
},
function (o) {
if (!o || !o.archetype || !specById(o.id)) {
TY.msg = "That one is not on the lot just now.";
tyItemPaint();
return;
}
if (typeof DRIVE !== "undefined" && DRIVE.on) {
TY.msg = "Get out of what you are driving first.";
tyItemPaint();
return;
}
if (typeof rideArch !== "undefined" && rideArch) {
TY.msg = "Get off what you are riding first.";
tyItemPaint();
return;
}
if (o.yardDrive) {
TY.msg = "Somebody has it out on a test drive.";
tyItemPaint();
return;
}
var lic = tyLicOf(o.archetype), keeper = typeof amKeeper === "function" && amKeeper();
if (!(typeof signedIn === "function" && signedIn())) {
TY.msg = "Sign in for a test drive: the salesperson needs to see your licence.";
tyItemPaint();
return;
}
TY.msg = "Checking your licence…";
tyItemPaint();
var chk = (lic && !keeper && typeof licRefresh === "function") ? licRefresh(true) : Promise.resolve(null);
chk.then(function () {
if (lic && !keeper && !(typeof hasLicence === "function" && hasLicence(lic))) {
TY.msg = "<b>You need a " + (lic === "flying" ? "flying" : "driving") + " licence</b> for a test " + (lic === "flying" ? "flight" : "drive") + ". The Licensing Office in the Civic Ring tests learners in its own " + (lic === "flying" ? "broom" : "car") + ".";
tyItemPaint();
return;
}
var s = tySeller(), P = camera.position;
if (Math.hypot((o.home || o).x - P.x, (o.home || o).z - P.z) > 8) {
TY.msg = "Walk up to it first.";
tyItemPaint();
return;
}
o.home = o.home || { x: o.x, z: o.z, rot: o.rot };
worldCard(null);
TY.card = null;
tyFigHide();
if (!vehicleTakeWheel(o))
return;
o.yardDrive = true;
TY.drive = { o: o, name: o.yardItem, seller: s.name, t0: Date.now(), until: Date.now() + TY_DRIVE_SECS * 1000, warn: 0, fly: tyKindOf(o.archetype) === "fly" };
if (!TY.drive.fly)
setTimeout(function () { if (TY.drive && TY.drive.o === o)
tyFigSeat(s.name); }, 60);
setStatus("<b>Test " + (TY.drive.fly ? "flight" : "drive") + ": the " + esc(o.yardItem.toLowerCase()) + ".</b> " + esc(s.name) + (TY.drive.fly ? " watches from the lot." : " rides along.") +
" Four minutes, then bring it back to the yard. Every law of the road applies, as it does to anybody.");
if (typeof driveNote === "function")
driveNote("Test " + (TY.drive.fly ? "flight" : "drive") + ": 4 minutes", 4);
});
},
function (o) {
if (!o)
return;
var h = o.home;
o.yardDrive = false;
if (h) {
o.x = h.x;
o.z = h.z;
o.rot = h.rot;
}
var g = (typeof meshes !== "undefined") ? meshes[o.id] : null;
if (g) {
g.position.x = o.x;
g.position.z = o.z;
g.position.y = terrainY(o.x, o.z) + (o.y || 0);
g.rotation.y = o.rot;
g.visible = true;
}
if (o._solid !== undefined) {
o.solid = o._solid;
delete o._solid;
}
if (typeof wallsAt !== "undefined")
wallsAt = -1;
},
function (why) {
var T = TY.drive;
if (!T)
return;
TY.drive = null;
tyPark(T.o);
tyFigHide();
var P = camera.position, h = T.o.home || T.o, near = Math.hypot(h.x - P.x, h.z - P.z) < 45;
setStatus("<b>" + esc(T.seller) + " parks the " + esc(T.name.toLowerCase()) + " back in its bay.</b> " +
(why === "late" ? "The time was up, so the yard fetched it back. " : "") + (near ? "What did you think? Walk up to it to buy it." : "It is back on the lot whenever you want it."));
TY.near = null;
},
function (o) {
if (!o || !o.archetype) {
return;
}
if (typeof DRIVE !== "undefined" && DRIVE.on) {
TY.msg = "Get out of what you are driving first.";
tyItemPaint();
return;
}
if ((typeof riding !== "undefined" && riding) || (typeof rideArch !== "undefined" && rideArch)) {
TY.msg = "Get off what you are riding first.";
tyItemPaint();
return;
}
tyPrices().then(function (m) {
var it = m[o.yardItem] || {}, s = tySeller();
worldCard(null);
TY.card = null;
riding = o.yardItem;
rideSpeed = +it.speed || 1.6;
rideArch = o.archetype;
if (rideG) {
scene.remove(rideG);
rideG = null;
}
try {
var L = meLook();
L.ride = rideArch;
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
var g = (typeof meshes !== "undefined") ? meshes[o.id] : null;
if (g)
g.visible = false;
o.yardDrive = true;
var sr = tyShowroom();
TY.trying = { o: o, name: o.yardItem, seller: s.name, until: Date.now() + TY_TRY_SECS * 1000, cx: sr ? sr.x : (o.home || o).x, cz: sr ? sr.z : (o.home || o).z };
setStatus("<b>Trying the " + esc(o.yardItem.toLowerCase()) + ".</b> Two minutes round the yard. " + esc(s.name) + " waits by the board.");
});
},
function (why) {
var T = TY.trying;
if (!T)
return;
TY.trying = null;
if (riding === T.name) {
riding = null;
rideSpeed = 1;
rideArch = null;
if (rideG) {
scene.remove(rideG);
rideG = null;
}
try {
var L = meLook();
L.ride = null;
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
}
tyPark(T.o);
setStatus(why === "far" ? "<b>That is as far as a try goes.</b> " + esc(T.seller) + " takes the " + esc(T.name.toLowerCase()) + " back to its place on the lot."
: "<b>" + esc(T.seller) + " takes the " + esc(T.name.toLowerCase()) + " back to its place.</b> Walk up to it to buy it.");
}
];
});
