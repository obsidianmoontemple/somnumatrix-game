/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(346, function () {
"use strict";
return [
function (P, q) {
if (P.use === "weapon") {
var A = BW_ARMS[P.x.arm] || {};
return "A " + wgEsc((A.name || "weapon").toLowerCase()) + " " + (A.dmg ? "that strikes for " + Math.round(A.dmg * P.R.mult * fgQ(q)) + " (the Armoury's: " + A.dmg + ")" : "of its world") + ", and " + (WG_GIFT[P.x.gift] || "") + ". Held anywhere; it fights in Ironfray and wherever dreamers may fight.";
}
if (P.use === "armour")
return WG_SLOT[P.x.wear] + ". Worn and seen by all; it turns " + Math.round(P.x.prot * fgQ(q) * 100) + "% of every blow in Ironfray and wherever dreamers may fight (all your armour together, at most 45%).";
if (P.use === "mount")
return "Ridden anywhere outdoors, in every world and in Somnucor, " + wgMountPace(P, q).toFixed(1) + " times your pace" + (P.x.fly ? ", and it flies" : "") + ".";
if (P.use === "charm")
return "A charm: " + wgFxText(P.x.fx, wgCharmV(P, q)) + " Two charms can be worn at once.";
return "";
},
function (arch) {
var P = WG_MOUNTS[arch], o = CREATURE[arch];
if (!P || !o || o.wgSized)
return;
o.wgSized = true;
try {
o.s = CREATURE[o.wgBase].s || 1;
var g = build({ id: "__wgm_measure", archetype: arch, attrs: {}, solid: false, detail: 2, nights: [], city: true });
g.updateMatrixWorld(true);
var bb = new THREE.Box3().setFromObject(g), h = Math.max(0.2, bb.max.y - bb.min.y);
o.s = o.s * P.x.h / h;
var low = /^(scorpion|crab|turtle|drone|dolphin|seahorse|whale)$/.test(o.wgBase);
if (typeof RIDE_SEAT !== "undefined")
RIDE_SEAT[arch] = +(P.x.h * (low ? 0.78 : 0.6) - 0.15).toFixed(2);
}
catch (e) {
if (typeof RIDE_SEAT !== "undefined" && RIDE_SEAT[arch] === undefined)
RIDE_SEAT[arch] = P.x.h * 0.6;
}
},
function (g, arch) {
var o = CREATURE[arch];
if (!g || g.userData.wgFix || !o || !WG_MOUNTS[arch])
return;
g.userData.wgFix = 1;
var kind = CREATURE[o.wgBase] && CREATURE[o.wgBase].kind;
if (!/^(swim|flyer|float)$/.test(kind || ""))
return;
var kids = g.children.filter(function (c) { return !(c.userData && c.userData.model); }), old = g.userData.anim;
kids.forEach(function (c) { c.position.set(0, 0, 0); c.rotation.y = 0; });
var p = g.position.clone(), r = g.rotation.y;
g.position.set(0, 0, 0);
g.rotation.y = 0;
g.updateMatrixWorld(true);
var bb = new THREE.Box3();
kids.forEach(function (c) { bb.expandByObject(c); });
var lift = isFinite(bb.min.y) ? -bb.min.y : 0;
g.position.copy(p);
g.rotation.y = r;
kids.forEach(function (c) { c.position.y = lift; });
g.userData.anim = function (t, dt) { if (old)
try {
old(t, dt);
}
catch (e) { } kids.forEach(function (c) { c.position.set(0, lift + Math.sin(t * 1.6) * 0.05, 0); c.rotation.y = 0; }); };
},
function (fig) {
var L = fig && fig.userData && fig.userData.limbs;
if (!L)
return;
[L.ll, L.rl].forEach(function (l) { if (!l)
return; l.rotation.z = (l.position.x > 0 ? 1 : -1) * 0.62; l.rotation.x = -0.35; });
[L.la, L.ra].forEach(function (a) { if (!a)
return; a.rotation.x = -0.75; a.rotation.z = (a.position.x > 0 ? -1 : 1) * 0.12; });
fig.userData.astride = true;
},
function (id) {
var it = FG.byId[id], P = wgOf(it);
if (!P || P.use !== "mount")
return false;
if (wgRiding(it)) {
wgDismount();
return false;
}
if (typeof walkMode !== "undefined" && !walkMode) {
wgSay("Step out into the world first: mounts are ridden on foot's ground.");
return false;
}
if (store.inside) {
wgSay("Mounts wait outside. Step out of doors, then ride.");
return false;
}
if (typeof DRIVE !== "undefined" && DRIVE.on) {
wgSay("Get out of what you are driving first.");
return false;
}
if (typeof MM !== "undefined" && MM.ride) {
wgSay("You are in a machine just now.");
return false;
}
if (typeof riding !== "undefined" && riding && typeof ride === "function")
ride(null);
wgMountReady(P.x.arch);
WGEAR.ride = { id: id, name: it.name, arch: P.x.arch, fly: typeof canFly !== "undefined" ? canFly : false };
riding = it.name;
rideSpeed = wgMountPace(P, it.quality);
rideArch = P.x.arch;
if (typeof rideG !== "undefined" && rideG) {
try {
scene.remove(rideG);
}
catch (e) { }
rideG = null;
}
if (P.x.fly && typeof canFly !== "undefined")
canFly = true;
try {
var L = meLook();
L.ride = rideArch;
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
wgSay("<b>You ride " + wgEsc(it.name) + ".</b> " + rideSpeed.toFixed(1) + " times your own pace" + (P.x.fly ? "; it flies (jump to rise)" : "") + ". Ride again from the Backpack to get off.");
return true;
},
function (quiet) {
var R = WGEAR.ride;
WGEAR.ride = null;
if (!R)
return;
if (typeof riding !== "undefined" && riding === R.name) {
riding = null;
rideSpeed = 1;
rideArch = null;
if (typeof rideG !== "undefined" && rideG) {
try {
scene.remove(rideG);
}
catch (e) { }
rideG = null;
}
if (typeof canFly !== "undefined" && !(typeof wgKeeper === "function" && wgKeeper()))
canFly = !!R.fly;
try {
var L = meLook();
L.ride = null;
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
if (!quiet)
wgSay("On foot again.");
}
},
function (id) {
var it = FG.byId[id], P = wgOf(it);
if (!P || P.use !== "charm")
return false;
var C = wgCharmIds(), i = C.indexOf(id);
if (i > -1) {
C.splice(i, 1);
wgSay("You take off " + wgEsc(it.name) + ".");
}
else {
if (C.length >= 2) {
var off = FG.byId[C[0]];
C.shift();
if (off)
wgSay("You take off " + wgEsc(off.name) + " to make room.");
}
C.push(id);
wgSay("<b>You wear " + wgEsc(it.name) + ".</b> " + wgFxText(P.x.fx, wgCharmV(P, it.quality)));
}
try {
save();
}
catch (e) { }
WGEAR.fxAt = 0;
return false;
},
function () {
if (WGEAR.el)
return WGEAR.el;
var el = document.createElement("div");
el.id = "wg-panel";
el.style.cssText = "position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:62;display:none;width:min(580px,calc(100vw - 24px));max-height:min(84vh,780px);overflow:auto;" +
"background:linear-gradient(180deg,rgba(18,20,30,.97),rgba(9,10,16,.98));border:1px solid #8A9AC8;border-radius:8px;padding:12px 14px 14px;color:#E6E8F2;" +
"font:13px/1.45 var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); if (e.code === "Escape")
wgClose(); });
el.addEventListener("click", function (e) { var t = e.target && e.target.closest ? e.target.closest("[data-wg]") : null; if (!t)
return; e.stopPropagation(); wgClick(t.getAttribute("data-wg")); });
document.body.appendChild(el);
WGEAR.el = el;
return el;
},
function (id) {
var W = WGEAR.worlds[id];
if (!W)
return;
WGEAR.open = id;
WGEAR.msg = "";
WGEAR.tab = "all";
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
if (typeof worldCard === "function")
try {
worldCard(null);
}
catch (e) { }
wgPaint();
if (wgSigned() && typeof fgLoad === "function")
fgLoad().then(wgPaint);
if (typeof hmXr === "function" && hmXr() && typeof setStatus === "function")
setStatus("<b>" + wgEsc(W.shop[0]) + "</b>: the goods are in your menu (the first entry).");
},
function () {
if (!WGEAR.open) {
if (WGEAR.el)
WGEAR.el.style.display = "none";
return;
}
var W = WGEAR.worlds[WGEAR.open], el = wgPanel(), h = "";
h += "<div style='display:flex;justify-content:space-between;align-items:center;gap:8px'><b style='font:500 17px var(--serif,Georgia);color:#E8EEFF'>🛒 " + wgEsc(W.shop[0]) + "</b>" + wgB("close", "Close") + "</div>";
h += "<div style='opacity:.8;margin:2px 0 6px'>" + wgEsc(W.shop[1].replace(/, (the )?/, ", the ")) + (W.shop[1].indexOf(",") > -1 ? "," : "") + " sells " + wgEsc(W.place) + "'s own gear, made sound by its smiths. Or make it yourself at <b>" + wgEsc(W.forge[0]) + "</b>: yours may come out finer.</div>";
h += "<div>" + wgB("tab:all", "All", WGEAR.tab === "all");
WG_GROUPS.forEach(function (g) { if (W.gear.some(function (x) { return WG_USES[x[0]] === g[0]; }))
h += wgB("tab:" + g[0], g[1], WGEAR.tab === g[0]); });
h += "</div>";
if (WGEAR.msg)
h += "<div style='margin:6px 0;padding:6px 9px;border-radius:4px;background:rgba(160,180,240,.10);border:1px solid rgba(160,180,240,.35)'>" + WGEAR.msg + "</div>";
if (!wgSigned())
h += "<div style='margin:6px 0;opacity:.8'>Sign in to buy: what you buy is kept against your account, in your Backpack.</div>";
else if (WGEAR.missing)
h += "<div style='margin:6px 0;opacity:.8'>The outfitter opens soon: the shelves are being stocked.</div>";
WG_GROUPS.forEach(function (g) {
if (WGEAR.tab !== "all" && WGEAR.tab !== g[0])
return;
var list = W.gear.filter(function (x) { return WG_USES[x[0]] === g[0]; });
if (!list.length)
return;
h += "<div style='margin:12px 0 4px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#A8B8E8'>" + g[1] + "</div>";
list.forEach(function (x) {
var P = WGEAR.byKey[x[1]], have = wgHave(x[1]);
h += "<div style='margin:6px 0;padding:7px 9px;border:1px solid rgba(138,154,200,.35);border-radius:5px'>" +
"<div style='display:flex;gap:10px;align-items:flex-start'>" + wgPicHtml(x[1], 72) + "<div style='flex:1;min-width:0'>" +
"<div style='display:flex;justify-content:space-between;gap:8px;align-items:flex-start;flex-wrap:wrap'><span><b>" + wgEsc(P.name) + "</b>" + (have ? " <span style='opacity:.7'>· you have " + have + "</span>" : "") + "</span>" +
"<span style='white-space:nowrap'><b style='color:#FFE7A0'>" + (+P.price).toLocaleString() + " gold</b> " + wgB("buy:" + x[1], have ? "Buy another" : "Buy") + "</span></div>" +
"<div style='font-size:12.5px;opacity:.9'>" + wgEsc(P.about) + "</div>" +
"<div style='font-size:12px;opacity:.75;margin-top:2px'>" + wgUseLine(P, 2) + "</div>" +
"<div style='font-size:11.5px;margin-top:3px;opacity:.85'>Make it at " + wgEsc(W.forge[0]) + ": " + (typeof fgNeedHtml === "function" ? fgNeedHtml(P.R.need) : "") + "</div></div></div></div>";
});
});
h += "<div style='margin-top:10px;font-size:12px;opacity:.7'>The truly rare things are never sold: one artifact or relic lies hidden in each world, and rare materials are only ever found. What you buy here is yours for good, in your Backpack, and can be traded like anything you own.</div>";
if (W.kids)
h += "<div style='margin-top:4px;font-size:12px;opacity:.7'>No weapons are sold in the Kids Zone.</div>";
else if (W.noWeapons)
h += "<div style='margin-top:4px;font-size:12px;opacity:.7'>No weapons are sold here: this is a place for peace.</div>";
var sc = el.scrollTop;
el.innerHTML = h;
el.style.display = "block";
el.scrollTop = sc;
},
function (key) {
var P = WGEAR.byKey[key];
if (!P || WGEAR.busy)
return;
if (!wgSigned()) {
WGEAR.msg = "Sign in first.";
wgPaint();
return;
}
WGEAR.busy = true;
WGEAR.msg = "Wrapping it up…";
wgPaint();
wgRpc("world_gear_buy", { p_key: key }).then(function (o) {
WGEAR.busy = false;
WGEAR.msg = wgEsc((o && o.say) || "The outfitter shakes their head.");
if (o && o.ok) {
if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
return (typeof fgLoad === "function" ? fgLoad() : Promise.resolve()).then(function () {
if (typeof loadThings === "function")
loadThings();
if (typeof BKP !== "undefined" && BKP.open && typeof bkpLoad === "function")
bkpLoad();
WGEAR.msg = "<b>" + wgEsc(o.say || "Bought.") + "</b> " + (P.use === "weapon" ? "Hold it from your Backpack." : P.use === "armour" ? "Wear it from your Backpack." : P.use === "mount" ? "Ride it from your Backpack, anywhere outdoors." : "Wear it from your Backpack (two charms at once).");
wgPaint();
});
}
wgPaint();
}).catch(function (e) { WGEAR.busy = false; if (wgMissingErr(e)) {
WGEAR.missing = true;
WGEAR.msg = "The outfitter opens soon.";
}
else
WGEAR.msg = wgEsc((e && e.message) || String(e)); wgPaint(); });
},
function (R) {
if (R.wgPlaces)
return R.wgPlaces;
var all = (R.wards || []).concat((R.deep && R.deep.b) || []);
var mk = all.filter(function (b) { return b.t === "market"; })[0] || null;
var fg = all.filter(function (b) { return b.t === "forge"; })[0] || all.filter(function (b) { return b.t === "workshop"; })[0] || all.filter(function (b) { return b.t === "mine"; })[0] || null;
if (!mk)
mk = fg;
R.wgPlaces = { shop: mk ? mk.n : null, forge: fg ? fg.n : null };
return R.wgPlaces;
},
function (G, I, R, site, W) {
var pl = wgRealmPlaces(R), n = site.b.n, used = {};
function pick(kinds) { for (var k = 0; k < kinds.length; k++)
for (var i = 0; i < I.rooms.length; i++) {
var rm = I.rooms[i];
if (rm.kind === kinds[k] && !used[i]) {
used[i] = 1;
return rm;
}
} return null; }
function spot(rm, label, lines, fn) {
var cx = (rm.x0 + rm.x1) / 2, cz = (rm.z0 + rm.z1) / 2;
cx += (rm.x1 - rm.x0) * 0.22;
I.spots.push({ x: cx, z: cz, r: 3, label: label, fn: fn });
if (typeof wSign === "function") {
var sg = wSign(lines, 1.9, 0.55, "#1A2236", "#E8EEFF");
sg.position.set(cx, 1.55, cz);
sg.userData.grKeep = 1;
G.add(sg);
}
}
if (n === pl.shop) {
var tr = pick(["counter", "shop"]);
var rm = pick(["shop", "store", "counter", "lounge", "office"]) || tr;
if (rm)
spot(rm, "<b>🛒 " + wgEsc(W.shop[0]) + "</b> · <b>press E</b> to see " + wgEsc(R.name) + "'s own gear", [W.shop[0], "armour · weapons · mounts · charms"], function () { wgOutfit(W.id); });
}
if (n === pl.forge) {
var fr = pick(["forge", "lavaforge", "workshop", "engine", "orestore", "store"]);
if (fr)
spot(fr, "<b>⚒️ The anvils of " + wgEsc(W.forge[0]) + "</b> · <b>press E</b> to make " + wgEsc(R.name) + "'s own gear", ["Make " + R.short + "'s own gear", "press E"], function () { craftOpen("wg_" + W.id); });
}
},
function (W, A) {
function gy(x, z) { try {
return W.ground ? (+W.ground(x, z, 0) || 0) : 0;
}
catch (e) {
return 0;
} }
function solid(x, z) { if (W.bound && (x * x + z * z) > (W.bound - 4) * (W.bound - 4))
return true; if (W.solids && worldSolidAt(W.solids, x, z, gy(x, z)))
return true; if (W.block)
try {
if (W.block(x, z, gy(x, z)))
return true;
}
catch (e) { } return false; }
var boxes = [];
W.g.updateMatrixWorld(true);
W.g.traverse(function (m) {
if (!(m.isMesh || m.isInstancedMesh) || m.isSprite || !m.visible || m.isInstancedMesh)
return;
try {
var bb = new THREE.Box3().setFromObject(m);
if (!isFinite(bb.min.x))
return;
if (bb.max.x - bb.min.x > 24 || bb.max.z - bb.min.z > 24)
return;
boxes.push([bb.min.x - W.base, bb.max.x - W.base, bb.min.y, bb.max.y, bb.min.z, bb.max.z]);
}
catch (e) { }
});
function clutter(x, z) {
var y0 = gy(x, z), R = 2.6;
for (var i = 0; i < boxes.length; i++) {
var B = boxes[i];
if (B[1] < x - R || B[0] > x + R || B[5] < z - R || B[4] > z + R)
continue;
if (B[3] < y0 + 0.35 || B[2] > y0 + 3.3)
continue;
return true;
}
return false;
}
var best = null, maxR = W.bound ? Math.min(42, W.bound - 6) : 42;
[[9, 4, 3, 1.5], [6, 3, 2.2, 1.1]].forEach(function (T) {
for (var r = T[0]; r <= maxR && !best; r += T[1]) {
for (var a = 0; a < 12 && !best; a++) {
var an = a / 12 * Math.PI * 2 + 0.4, x = A.x + Math.sin(an) * r, z = A.z + Math.cos(an) * r, ok = true;
for (var u = -T[2]; u <= T[2] + 0.01 && ok; u += T[3])
for (var v = -T[2]; v <= T[2] + 0.01 && ok; v += T[3])
if (solid(x + u, z + v))
ok = false;
if (ok) {
var h0 = gy(x, z);
for (var q = -3; q <= 3 && ok; q += 3) {
if (Math.abs(gy(x + q, z) - h0) > 0.6 || Math.abs(gy(x, z + q) - h0) > 0.6)
ok = false;
}
}
if (ok && clutter(x, z))
ok = false;
if (ok)
best = { x: x, z: z, y: gy(x, z), rot: Math.atan2(A.x - x, A.z - z) };
}
}
});
return best;
},
function (W, id) {
var G = W.g, A = WLD.arrive;
if (!G || !A)
return null;
var S = wgStallSpot(W, A);
if (!S)
return null;
var X = WGEAR.worlds[id], col = X.col, kids = !!X.kids;
var g = new THREE.Group();
g.position.set(S.x, S.y, S.z);
g.rotation.y = S.rot;
g.name = "wg-stall-" + id;
var wood = new THREE.MeshLambertMaterial({ color: kids ? 0xFF5A5A : 0x5A4030 }), cloth = new THREE.MeshLambertMaterial({ color: kids ? 0x2AA8FF : col }), cloth2 = new THREE.MeshLambertMaterial({ color: kids ? 0xFFD800 : 0xE8E0D0 }), dark = new THREE.MeshLambertMaterial({ color: 0x2A2620 });
wBox(3.4, 1.05, 0.9, wood, 0, 0.52, 0.6, g);
wBox(3.6, 0.08, 1.05, dark, 0, 1.08, 0.6, g);
[[-1.7, 0.15], [1.7, 0.15], [-1.7, -1.6], [1.7, -1.6]].forEach(function (p) { wCyl(0.07, 0.07, 2.7, wood, p[0], 1.35, p[1], g, 6); });
for (var i = 0; i < 6; i++) {
var aw = wBox(0.6, 0.06, 2.3, i % 2 ? cloth2 : cloth, -1.5 + i * 0.6, 2.75, -0.6, g);
aw.rotation.x = -0.18;
}
wBox(3.4, 1.9, 0.08, wood, 0, 1.35, -1.62, g);
if (typeof HELD !== "undefined" && !kids && !X.noWeapons)
["sword", "axe", "spear", "bow"].forEach(function (h, i) { if (!HELD[h])
return; try {
var m = HELD[h]();
m.position.set(-1.2 + i * 0.8, 1.5, -1.5);
m.scale.setScalar(0.9);
g.add(m);
}
catch (e) { } });
var sh = wCyl(0.32, 0.32, 0.06, cloth, 1.2, 1.75, -1.52, g, 16);
sh.rotation.x = Math.PI / 2;
wBox(0.5, 0.12, 0.36, cloth, -0.9, 1.18, 0.6, g);
wBox(0.6, 0.14, 0.3, new THREE.MeshLambertMaterial({ color: 0x8A6A4A }), 0.8, 1.19, 0.6, g);
if (typeof wSign === "function") {
var sg = wSign([X.shop[0], "its own gear · press E"], 3.2, 0.7, kids ? "#7A2AB8" : "#1A2236", kids ? "#FFF6C8" : "#E8EEFF");
sg.position.set(0, 3.25, 0.25);
g.add(sg);
}
if (typeof wPerson === "function")
try {
var who = wPerson("wg_" + id, { title: "Outfitter", look: kids ? { top: 0xFF8A00, layer: "apron", layerColor: 0x2AA8FF, hat: "jester", hatColor: 0xFF3A8A } : { layer: "apron", layerColor: col, top: 0xE8E0D0 } });
who.position.set(0.3, 0, -0.6);
who.rotation.y = 0;
g.add(who);
}
catch (e) { }
G.add(g);
var solid = { x: S.x, z: S.z, r: 2, h: 3 };
return { W: W, id: id, g: g, G: G, x: S.x + Math.sin(S.rot) * 2.4, z: S.z + Math.cos(S.rot) * 2.4, solid: solid };
},
function (P) {
var W = P.W, n = P.name.toLowerCase(), g = new THREE.Group(), col = W.col, gemC = WG_GEM[P.x.fx] || 0xFFFFFF;
var silver = /moon|pluto|frozen|mirror|aurora|void|neptune|uranus|mercury|sea/.test(W.id);
var metal = wgMat(silver ? 0xD4D8E0 : 0xD8B24A, { m: 0.6, r: 0.3 }), dark = wgMat(silver ? 0x8A909C : 0x8A6A2A, { m: 0.6, r: 0.4 }), body = wgMat(col, { m: 0.25, r: 0.45 }), gem = wgMat(gemC, { m: 0.1, r: 0.15, e: gemC, ei: 0.35 }), glass = wgMat(0xE8F4FF, { m: 0, r: 0.05, t: 0.45 });
function loop(y) { var l = wgMesh(new THREE.TorusGeometry(0.09, 0.022, 8, 20), metal, 0, y, 0, g); return l; }
function coin(r, face) {
var c = wgMesh(new THREE.CylinderGeometry(r, r, 0.08, 40), face || metal, 0, 0, 0, g);
c.rotation.x = Math.PI / 2;
var rim = wgMesh(new THREE.TorusGeometry(r, 0.035, 8, 40), dark, 0, 0, 0, g);
return c;
}
function stone(r, y, z) { var s = wgMesh(new THREE.OctahedronGeometry(r, 1), gem, 0, y || 0, z || 0.07, g); s.scale.set(1, 1.15, 0.6); return s; }
if (/dice/.test(n)) {
[[-0.2, 0, 0.3], [0.22, 0.05, -0.4]].forEach(function (d) {
var c = wgMesh(new THREE.BoxGeometry(0.34, 0.34, 0.34), wgMat(0xF4F0E8, { m: 0, r: 0.3 }), d[0], d[1], 0, g);
c.rotation.set(0.5, d[2], 0.3);
[[0, 0, 0.175], [0.09, 0.09, 0.175], [-0.09, -0.09, 0.175]].forEach(function (p) { var q = wgMesh(new THREE.SphereGeometry(0.03, 8, 6), wgMat(col, { m: 0.2, r: 0.4 }), p[0], p[1], p[2], c); });
});
}
else if (/star/.test(n)) {
var sh = new THREE.Shape();
for (var i = 0; i < 10; i++) {
var a = i / 10 * Math.PI * 2 + Math.PI / 2, r = i % 2 ? 0.2 : 0.46;
if (i)
sh.lineTo(Math.cos(a) * r, Math.sin(a) * r);
else
sh.moveTo(Math.cos(a) * r, Math.sin(a) * r);
}
var st = wgMesh(new THREE.ExtrudeGeometry(sh, { depth: 0.07, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 2 }), wgMat(0xFFC83A, { m: 0.55, r: 0.3 }), 0, 0, -0.04, g);
stone(0.09, 0, 0.1);
loop(0.55);
}
else if (/flag/.test(n)) {
wgMesh(new THREE.CylinderGeometry(0.025, 0.025, 0.9, 8), metal, -0.25, 0, 0, g);
for (var fx = 0; fx < 4; fx++)
for (var fy = 0; fy < 3; fy++)
wgMesh(new THREE.BoxGeometry(0.13, 0.13, 0.02), wgMat((fx + fy) % 2 ? 0x111111 : 0xF4F4F4, { m: 0, r: 0.5 }), -0.16 + fx * 0.13, 0.36 - fy * 0.13, 0, g);
}
else if (/coin|token|chip|badge|disc/.test(n)) {
coin(0.4, /chip/.test(n) ? wgMat(col, { m: 0.2, r: 0.4 }) : metal);
if (/chip/.test(n))
for (var k = 0; k < 8; k++) {
var a2 = k / 8 * Math.PI * 2;
wgMesh(new THREE.BoxGeometry(0.1, 0.06, 0.09), wgMat(0xF4F0E8, { m: 0, r: 0.4 }), Math.cos(a2) * 0.34, Math.sin(a2) * 0.34, 0, g).rotation.z = a2;
}
var inner = wgMesh(new THREE.CylinderGeometry(0.24, 0.24, 0.1, 32), body, 0, 0, 0, g);
inner.rotation.x = Math.PI / 2;
stone(0.08, 0, 0.08);
if (!/chip/.test(n))
loop(0.48);
}
else if (/pearls/.test(n)) {
for (var p = 0; p < 26; p++) {
var a3 = p / 26 * Math.PI * 2;
wgMesh(new THREE.SphereGeometry(0.065, 12, 10), wgMat(0xF8F2EA, { m: 0.1, r: 0.15 }), Math.cos(a3) * 0.42, Math.sin(a3) * 0.32 - 0.05, 0, g);
}
var cl = wgMesh(new THREE.SphereGeometry(0.08, 12, 10), gem, 0, -0.4, 0.02, g);
}
else if (/heart/.test(n)) {
var hs = new THREE.Shape();
hs.moveTo(0, -0.38);
hs.bezierCurveTo(0.5, 0.0, 0.32, 0.36, 0, 0.18);
hs.bezierCurveTo(-0.32, 0.36, -0.5, 0.0, 0, -0.38);
wgMesh(new THREE.ExtrudeGeometry(hs, { depth: 0.1, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04, bevelSegments: 3 }), /ice|pale/.test(n) ? glass : wgMat(col === 0xFFFFFF ? 0xE04A6A : col, { m: 0.3, r: 0.3 }), 0, 0, -0.05, g);
if (/twin/.test(n)) {
var h2 = g.children[g.children.length - 1].clone();
h2.position.set(0.18, -0.06, -0.12);
h2.scale.setScalar(0.8);
g.add(h2);
}
stone(0.07, 0.02, 0.1);
loop(0.34);
}
else if (/locket|pendant|photo/.test(n)) {
var o = wgMesh(new THREE.SphereGeometry(0.36, 32, 16), metal, 0, 0, 0, g);
o.scale.set(0.82, 1, 0.28);
var face = wgMesh(new THREE.CylinderGeometry(0.22, 0.22, 0.03, 32), body, 0, 0, 0.09, g);
face.rotation.x = Math.PI / 2;
face.scale.set(0.82, 1, 1);
stone(0.07, 0, 0.12);
loop(0.44);
for (var c2 = 0; c2 < 6; c2++)
wgMesh(new THREE.TorusGeometry(0.035, 0.01, 6, 10), metal, 0, 0.55 + c2 * 0.07, 0, g).rotation.y = c2 % 2 ? Math.PI / 2 : 0;
}
else if (/honeycomb/.test(n)) {
[[0, 0], [0.26, 0.15], [-0.26, 0.15], [0, 0.3], [0.26, -0.15], [-0.26, -0.15], [0, -0.3]].forEach(function (q) {
var hx = wgMesh(new THREE.CylinderGeometry(0.15, 0.15, 0.16, 6), wgMat(0xE8A82A, { m: 0.1, r: 0.25, e: 0x5A3A00, ei: 0.4 }), q[0], q[1], 0, g);
hx.rotation.x = Math.PI / 2;
});
loop(0.48);
}
else if (/vial|flask|bottle|culture|spray|mist|drop|water|nitro/.test(n)) {
var liq = wgMat(/nitro/.test(n) ? 0x2A8AFF : gemC, { m: 0, r: 0.2, e: /nitro/.test(n) ? 0x2A8AFF : gemC, ei: 0.25 });
if (/drop/.test(n)) {
var dg = wgMesh(new THREE.SphereGeometry(0.3, 24, 16), liq, 0, -0.08, 0, g);
var tip = wgMesh(new THREE.ConeGeometry(0.21, 0.4, 24), liq, 0, 0.24, 0, g);
loop(0.5);
}
else {
wgMesh(new THREE.CylinderGeometry(0.2, 0.24, 0.62, 24), glass, 0, 0, 0, g);
wgMesh(new THREE.CylinderGeometry(0.18, 0.22, 0.44, 24), liq, 0, -0.08, 0, g);
wgMesh(new THREE.CylinderGeometry(0.1, 0.12, 0.16, 16), glass, 0, 0.38, 0, g);
wgMesh(new THREE.CylinderGeometry(0.11, 0.09, 0.12, 16), wgMat(0x8A5A2A, { m: 0, r: 0.8 }), 0, 0.5, 0, g);
wgMesh(new THREE.TorusGeometry(0.22, 0.025, 8, 24), metal, 0, 0.16, 0, g).rotation.x = Math.PI / 2;
loop(0.64);
}
}
else if (/\bring\b/.test(n)) {
var rg = wgMesh(new THREE.TorusGeometry(0.34, 0.08, 16, 40), metal, 0, -0.08, 0, g);
rg.rotation.x = 0.35;
var set = wgMesh(new THREE.CylinderGeometry(0.12, 0.09, 0.1, 6), dark, 0, 0.28, 0.05, g);
set.rotation.x = 0.35;
var gs = wgMesh(new THREE.OctahedronGeometry(0.15, 1), gem, 0, 0.38, 0.08, g);
gs.scale.set(1, 0.8, 1);
}
else if (/brooch|pin/.test(n)) {
var br = wgMesh(new THREE.SphereGeometry(0.4, 32, 16), metal, 0, 0, 0, g);
br.scale.set(1, 0.78, 0.2);
var bb = wgMesh(new THREE.SphereGeometry(0.3, 32, 16), body, 0, 0, 0.04, g);
bb.scale.set(1, 0.78, 0.25);
for (var r2 = 0; r2 < 12; r2++) {
var a4 = r2 / 12 * Math.PI * 2;
wgMesh(new THREE.SphereGeometry(0.035, 8, 6), metal, Math.cos(a4) * 0.36, Math.sin(a4) * 0.28, 0.06, g);
}
stone(0.12, 0, 0.12);
}
else if (/band|bracelet|ribbon|knot|garland|thread|wristband/.test(n)) {
var band = wgMesh(new THREE.TorusGeometry(0.36, 0.075, 12, 44), /ribbon|knot|thread/.test(n) ? wgMat(col, { m: 0, r: 0.7 }) : body, 0, 0, 0, g);
band.rotation.x = 0.55;
var beads = /garland/.test(n) ? 10 : 6;
for (var b2 = 0; b2 < beads; b2++) {
var a5 = b2 / beads * Math.PI * 2, bx = Math.cos(a5) * 0.36, bz = Math.sin(a5) * 0.36;
var bd = /garland/.test(n) ? wgMesh(new THREE.SphereGeometry(0.1, 10, 8), wgMat(0xFF9A1A, { m: 0, r: 0.6 }), bx, bz * Math.cos(0.55), bz * Math.sin(0.55), g) :
wgMesh(new THREE.SphereGeometry(0.06, 10, 8), b2 === 0 ? gem : metal, bx, bz * Math.cos(0.55), bz * Math.sin(0.55), g);
}
if (/knot/.test(n)) {
wgMesh(new THREE.TorusKnotGeometry(0.13, 0.045, 48, 8), wgMat(col, { m: 0, r: 0.7 }), 0, -0.36, 0.12, g);
}
}
else if (/lantern|lamp|light/.test(n)) {
wgMesh(new THREE.CylinderGeometry(0.22, 0.26, 0.08, 6), dark, 0, -0.3, 0, g);
wgMesh(new THREE.CylinderGeometry(0.16, 0.22, 0.12, 6), dark, 0, 0.3, 0, g);
wgMesh(new THREE.ConeGeometry(0.16, 0.14, 6), dark, 0, 0.42, 0, g);
wgMesh(new THREE.CylinderGeometry(0.2, 0.2, 0.52, 6, 1, true), wgMat(0xFFF4D0, { m: 0, r: 0.1, t: 0.35, ds: true }), 0, 0, 0, g);
for (var e = 0; e < 6; e++) {
var a6 = e / 6 * Math.PI * 2 + Math.PI / 6;
wgMesh(new THREE.BoxGeometry(0.03, 0.54, 0.03), dark, Math.cos(a6) * 0.2, 0, Math.sin(a6) * 0.2, g);
}
wgMesh(new THREE.SphereGeometry(0.11, 16, 12), wgMat(/glowcap|moss|anglerfish/.test(n) ? 0x7AF0C0 : 0xFFE6A0, { m: 0, r: 0.3, e: /glowcap|moss|anglerfish/.test(n) ? 0x5AD0A0 : 0xFFD070, ei: 0.9 }), 0, 0, 0, g);
loop(0.56);
}
else if (/candle/.test(n)) {
wgMesh(new THREE.CylinderGeometry(0.14, 0.14, 0.6, 20), wgMat(0xF4ECD8, { m: 0, r: 0.6 }), 0, 0, 0, g);
wgMesh(new THREE.CylinderGeometry(0.28, 0.3, 0.06, 24), metal, 0, -0.32, 0, g);
var fl = wgMesh(new THREE.SphereGeometry(0.07, 12, 10), wgMat(0xFFC85A, { m: 0, r: 0.3, e: 0xFFA030, ei: 1 }), 0, 0.4, 0, g);
fl.scale.set(1, 1.8, 1);
}
else if (/bell/.test(n)) {
var pts = [];
for (var t = 0; t <= 10; t++) {
var u = t / 10;
pts.push(new THREE.Vector2(0.06 + 0.3 * Math.pow(u, 1.6) + (u > 0.9 ? 0.05 : 0), 0.32 - u * 0.62));
}
wgMesh(new THREE.LatheGeometry(pts, 32), metal, 0, 0, 0, g);
wgMesh(new THREE.SphereGeometry(0.08, 12, 10), dark, 0, -0.3, 0, g);
wgMesh(new THREE.TorusGeometry(0.2, 0.04, 8, 24), wgMat(0xC02A2A, { m: 0, r: 0.6 }), 0, 0.36, 0, g);
loop(0.44);
}
else if (/compass|needle|axis|spin|orbit/.test(n)) {
coin(0.4, dark);
var dial = wgMesh(new THREE.CylinderGeometry(0.33, 0.33, 0.1, 32), wgMat(0xF4F0E4, { m: 0, r: 0.5 }), 0, 0, 0.01, g);
dial.rotation.x = Math.PI / 2;
var nd = wgMesh(new THREE.ConeGeometry(0.05, 0.5, 4), wgMat(0xC02A2A, { m: 0.2, r: 0.4 }), 0, 0, 0.08, g);
nd.rotation.z = -0.6;
wgMesh(new THREE.CylinderGeometry(0.34, 0.34, 0.02, 32), glass, 0, 0, 0.08, g).rotation.x = Math.PI / 2;
loop(0.48);
}
else if (/feather|wing|veil/.test(n)) {
var fs = new THREE.Shape();
fs.moveTo(0, -0.5);
fs.quadraticCurveTo(0.26, -0.05, 0.04, 0.5);
fs.quadraticCurveTo(-0.22, 0.0, 0, -0.5);
var fm = wgMesh(new THREE.ExtrudeGeometry(fs, { depth: 0.02, bevelEnabled: false }), wgMat(/moth/.test(n) ? 0xD8C8A8 : /veil/.test(n) ? 0xF0E8F8 : col, { m: 0, r: 0.8, ds: true }), 0, 0, 0, g);
fm.rotation.z = -0.4;
if (/moth|wing/.test(n)) {
var f2 = fm.clone();
f2.rotation.z = 0.4;
f2.scale.x = -1;
g.add(f2);
}
wgMesh(new THREE.CylinderGeometry(0.012, 0.012, 0.95, 6), metal, 0, 0, 0.02, g).rotation.z = -0.4;
stone(0.06, -0.36, 0.04);
}
else if (/clover|rose|marigold|lichen|moss|kelp|green|algae|dew|seed|honey/.test(n)) {
var petC = /rose/.test(n) ? 0xF07AA0 : /marigold/.test(n) ? 0xFF9A1A : /kelp|algae|green|clover|lichen|moss/.test(n) ? 0x4AA84A : /seed/.test(n) ? 0xB0203A : col;
var np = /clover/.test(n) ? 4 : /seed/.test(n) ? 6 : /rose/.test(n) ? 10 : 8;
for (var q2 = 0; q2 < np; q2++) {
var a7 = q2 / np * Math.PI * 2, pt = wgMesh(new THREE.SphereGeometry(/seed/.test(n) ? 0.09 : 0.17, 14, 10), wgMat(petC, { m: 0, r: 0.5, e: /seed/.test(n) ? 0x400010 : 0, ei: 0.4 }), Math.cos(a7) * 0.2, Math.sin(a7) * 0.2, 0, g);
if (!/seed/.test(n))
pt.scale.set(1, 0.62, 0.3);
pt.rotation.z = a7;
}
var ctr = wgMesh(new THREE.SphereGeometry(0.11, 14, 10), /seed/.test(n) ? wgMat(0xE8B04A, { m: 0, r: 0.2, t: 0.6 }) : gem, 0, 0, 0.04, g);
if (/seed/.test(n))
ctr.scale.setScalar(2.6);
var ring = wgMesh(new THREE.TorusGeometry(0.46, 0.03, 8, 40), metal, 0, 0, 0, g);
loop(0.56);
}
else if (/crystal|shard|rune|stone|salt|ember|scar|offcut|cell|iron|ash|quartz/.test(n)) {
if (/rune|scar|ash|iron/.test(n)) {
var sl = wgMesh(new THREE.BoxGeometry(0.56, 0.74, 0.14), wgMat(/ash/.test(n) ? 0x8A8680 : /iron/.test(n) ? 0x8A3A22 : 0x6A6460, { m: 0.1, r: 0.85 }), 0, 0, 0, g);
sl.geometry.translate(0, 0, 0);
[[-0.12, 0.18, 0.3, 0.06], [0.08, 0, 0.06, 0.42], [0, -0.2, 0.32, 0.06]].forEach(function (r) { wgMesh(new THREE.BoxGeometry(r[2], r[3], 0.02), wgMat(gemC, { m: 0, r: 0.3, e: gemC, ei: 0.7 }), r[0], r[1], 0.08, g); });
loop(0.46);
}
else if (/cell/.test(n)) {
wgMesh(new THREE.CylinderGeometry(0.18, 0.18, 0.62, 24), wgMat(0x2A2E36, { m: 0.5, r: 0.3 }), 0, 0, 0, g);
wgMesh(new THREE.CylinderGeometry(0.19, 0.19, 0.32, 24), wgMat(col, { m: 0.2, r: 0.3, e: col, ei: 0.25 }), 0, 0.02, 0, g);
wgMesh(new THREE.CylinderGeometry(0.07, 0.07, 0.08, 16), metal, 0, 0.35, 0, g);
loop(0.48);
}
else {
var cr = wgMesh(new THREE.OctahedronGeometry(0.3, 0), wgMat(/ember/.test(n) ? 0xFF6A1A : gemC, { m: 0.05, r: 0.1, e: /ember/.test(n) ? 0xC03A00 : gemC, ei: /ember/.test(n) ? 0.8 : 0.3, t: /salt|quartz|shard|offcut|mirror/.test(n) ? 0.85 : 0 }), 0, 0, 0, g);
cr.scale.set(0.8, 1.4, 0.8);
var cap = wgMesh(new THREE.CylinderGeometry(0.12, 0.16, 0.1, 8), metal, 0, 0.42, 0, g);
loop(0.56);
}
}
else {
var pd = wgMesh(new THREE.SphereGeometry(0.32, 32, 16), body, 0, 0, 0, g);
pd.scale.set(0.85, 1.1, 0.4);
wgMesh(new THREE.TorusGeometry(0.32, 0.03, 8, 40), metal, 0, 0, 0, g).scale.set(0.85, 1.1, 1);
stone(0.1, 0, 0.12);
loop(0.44);
}
g.rotation.y = -0.35;
g.rotation.x = 0.12;
return g;
},
function (P) {
var W = P.W, n = P.name.toLowerCase(), g = new THREE.Group(), col = W.col, T = wgTrimOf(W), L = P.x.look || {}, slot = P.x.wear;
var cloth = wgMat(col, { m: 0.04, r: 0.78, ds: true }), plate = wgMat(col, { m: 0.72, r: 0.3 }), leather = wgMat(0x4A3222, { m: 0.05, r: 0.7 }), deep = wgMat(new THREE.Color(col).multiplyScalar(0.55).getHex(), { m: 0.05, r: 0.8, ds: true }), gemC = 0xE8F0FF;
function lathe(pts, mat, y, sz) { var m = wgMesh(new THREE.LatheGeometry(pts.map(function (p) { return new THREE.Vector2(p[0], p[1]); }), 40), mat, 0, y || 0, 0, g); m.scale.z = sz || 0.62; return m; }
function ring(r, t, y, mat, sz) { var m = wgMesh(new THREE.TorusGeometry(r, t, 8, 40), mat, 0, y, 0, g); m.rotation.x = Math.PI / 2; m.scale.y = sz || 0.62; return m; }
function sleeve(sd, len, r0, r1, mat, cuff) {
var pv = new THREE.Group();
pv.position.set(sd * 0.33, 0.5, 0);
pv.rotation.z = sd * 0.32;
g.add(pv);
wgMesh(new THREE.CylinderGeometry(r0, r1, len, 20), mat, 0, -len / 2, 0, pv);
if (cuff) {
var c = wgMesh(new THREE.TorusGeometry(r1, 0.022, 8, 24), cuff, 0, -len + 0.01, 0, pv);
c.rotation.x = Math.PI / 2;
}
return pv;
}
if (slot === "armor") {
var kind = L.layer || "armor", len = { longcoat: 0.78, tunic: 0.36, kimono: 0.62, uniform: 0.22, suit: 0.2, armor: 0.12, vest: 0.12 }[kind];
if (len == null)
len = 0.14;
var flare = kind === "longcoat" || kind === "kimono" ? 0.1 : 0.02;
var prof = [[0.27 + flare, -len], [0.27 + flare * 0.6, -len * 0.5], [0.26, 0], [0.29, 0.16], [0.33, 0.34], [0.35, 0.48], [0.31, 0.57], [0.16, 0.63], [0.12, 0.66]];
lathe(prof, kind === "armor" ? plate : cloth);
if (kind === "armor") {
[-0.04, 0.03, 0.1].forEach(function (y, i) { ring(0.265 + i * 0.006, 0.016, y, T.metal); });
ring(0.13, 0.03, 0.66, T.metal);
ring(0.3, 0.014, 0.5, T.dark);
[-1, 1].forEach(function (sd) {
for (var k = 0; k < 3; k++) {
var pd = wgMesh(new THREE.SphereGeometry(0.17 - k * 0.025, 28, 12, 0, Math.PI * 2, 0, Math.PI / 2), k ? T.metal : plate, sd * (0.35 + k * 0.02), 0.53 - k * 0.07, 0, g);
pd.scale.set(1, 0.7, 0.85);
pd.rotation.z = -sd * 0.55;
}
});
var em = wgMesh(new THREE.OctahedronGeometry(0.05, 1), wgMat(gemC, { m: 0.1, r: 0.15, e: col, ei: 0.25 }), 0, 0.36, 0.22, g);
em.scale.set(1, 1.3, 0.5);
wgMesh(new THREE.TorusGeometry(0.075, 0.012, 8, 24), T.metal, 0, 0.36, 0.205, g);
}
else {
var sl = kind === "vest" ? 0 : kind === "kimono" ? 2 : kind === "tunic" ? 3 : 1;
[-1, 1].forEach(function (sd) {
if (sl === 1)
sleeve(sd, 0.56, 0.095, 0.085, cloth, kind === "sweater" ? deep : T.metal);
else if (sl === 3)
sleeve(sd, 0.3, 0.1, 0.1, cloth, T.metal);
else if (sl === 2) {
var pv = new THREE.Group();
pv.position.set(sd * 0.33, 0.5, 0);
pv.rotation.z = sd * 0.42;
g.add(pv);
var wb = wgMesh(new THREE.BoxGeometry(0.2, 0.5, 0.24), cloth, 0, -0.26, 0, pv);
wgMesh(new THREE.BoxGeometry(0.205, 0.04, 0.245), T.metal, 0, -0.5, 0, pv);
}
});
if (kind === "kimono") {
ring(0.27, 0.07, 0.06, wgMat(0xE8DCC8, { m: 0.05, r: 0.7 }), 0.62).scale.z = 2.2;
[-1, 1].forEach(function (sd) { var c = wgMesh(new THREE.BoxGeometry(0.05, 0.5, 0.02), T.metal, sd * 0.07, 0.4, 0.2, g); c.rotation.z = sd * 0.42; });
}
else if (kind === "hoodie") {
var hd = wgMesh(new THREE.SphereGeometry(0.2, 24, 14, 0, Math.PI * 2, 0, Math.PI * 0.6), cloth, 0, 0.6, -0.12, g);
hd.rotation.x = -0.9;
hd.scale.set(1, 1, 0.8);
wgMesh(new THREE.BoxGeometry(0.3, 0.12, 0.02), deep, 0, 0.06, 0.18, g);
ring(0.27, 0.03, -len, deep);
}
else if (kind === "sweater") {
ring(0.27, 0.035, -len, deep);
ring(0.13, 0.03, 0.66, deep);
for (var r3 = 0; r3 < 3; r3++)
ring(0.335 - r3 * 0.012, 0.008, 0.3 + r3 * 0.06, deep);
}
else {
if (kind === "longcoat" || kind === "uniform" || kind === "tunic")
ring(0.27, 0.03, 0.0, leather);
if (kind === "longcoat" || kind === "tunic")
wgMesh(new THREE.BoxGeometry(0.08, 0.06, 0.02), T.metal, 0, 0, 0.18, g);
var bt = kind === "uniform" ? [[-0.07, 1], [0.07, 1]] : [[0, 1]];
bt.forEach(function (b) { for (var y = 0.1; y < 0.5; y += 0.1)
wgMesh(new THREE.SphereGeometry(0.018, 10, 8), T.metal, b[0], y, 0.2 + (0.5 - y) * 0.02, g); });
if (kind === "uniform") {
[-1, 1].forEach(function (sd) { var ep = wgMesh(new THREE.BoxGeometry(0.14, 0.03, 0.12), T.metal, sd * 0.27, 0.58, 0, g); ep.rotation.z = -sd * 0.3; });
}
if (kind === "suit" || kind === "jacket" || kind === "longcoat") {
[-1, 1].forEach(function (sd) { var lp = wgMesh(new THREE.BoxGeometry(0.06, 0.3, 0.015), kind === "suit" ? deep : T.dark, sd * 0.07, 0.48, 0.215, g); lp.rotation.z = sd * 0.35; lp.rotation.x = -0.2; });
}
if (kind === "suit")
wgMesh(new THREE.BoxGeometry(0.05, 0.3, 0.015), T.metal, 0, 0.42, 0.225, g);
if (kind === "longcoat") {
var cl = lathe([[0.15, 0.6], [0.17, 0.66], [0.2, 0.74]], cloth);
}
if (kind === "vest")
ring(0.27, 0.02, -len, T.metal);
}
}
}
else if (slot === "helmet") {
var hat = L.hat || "helmet";
if (hat === "helmet") {
var dome = wgMesh(new THREE.SphereGeometry(0.32, 40, 20, 0, Math.PI * 2, 0, Math.PI * 0.56), plate, 0, 0, 0, g);
dome.scale.set(0.92, 1.12, 1);
var rim = wgMesh(new THREE.TorusGeometry(0.31, 0.025, 8, 40), T.metal, 0, -0.05, 0, g);
rim.rotation.x = Math.PI / 2;
rim.scale.set(0.92, 1, 1);
if (/visor|window|glass|dome|bubble/.test(n)) {
var vz = wgMesh(new THREE.SphereGeometry(0.3, 32, 16, -Math.PI * 0.35, Math.PI * 0.7, Math.PI * 0.3, Math.PI * 0.35), wgMat(0xE8B84A, { m: 0.9, r: 0.08, t: 0.85 }), 0, 0.02, 0.04, g);
vz.scale.set(0.95, 1.12, 1.04);
}
var crest = wgMesh(new THREE.TorusGeometry(0.33, 0.055, 10, 28, Math.PI), /storm|gale|wind|crest|guard|tower|war|ring|deep/.test(n) ? wgMat(0xC02A2A, { m: 0, r: 0.85 }) : T.metal, 0, 0.02, 0, g);
crest.rotation.y = Math.PI / 2;
crest.scale.set(1, 1.05, 0.5);
}
else if (hat === "crown" || hat === "tiara") {
wgMesh(new THREE.CylinderGeometry(0.3, 0.28, 0.16, 40, 1, true), wgMat(0xD8B24A, { m: 0.8, r: 0.25, ds: true }), 0, 0, 0, g);
var cap = wgMesh(new THREE.SphereGeometry(0.27, 32, 14, 0, Math.PI * 2, 0, Math.PI / 2), wgMat(col, { m: 0, r: 0.85 }), 0, 0.02, 0, g);
cap.scale.y = 0.7;
for (var c3 = 0; c3 < 8; c3++) {
var a8 = c3 / 8 * Math.PI * 2, sp = wgMesh(new THREE.ConeGeometry(0.045, 0.17, 8), wgMat(0xD8B24A, { m: 0.8, r: 0.25 }), Math.sin(a8) * 0.29, 0.16, Math.cos(a8) * 0.29, g);
wgMesh(new THREE.SphereGeometry(0.022, 10, 8), wgMat(0xF4F0E8, { m: 0.1, r: 0.1 }), Math.sin(a8) * 0.29, 0.26, Math.cos(a8) * 0.29, g);
var gm = wgMesh(new THREE.OctahedronGeometry(0.035, 0), wgMat(c3 % 2 ? col : 0xE84A6A, { m: 0.1, r: 0.1, e: c3 % 2 ? col : 0xE84A6A, ei: 0.2 }), Math.sin(a8 + 0.39) * 0.305, 0, Math.cos(a8 + 0.39) * 0.305, g);
}
}
else if (hat === "cowboy") {
wgMesh(new THREE.LatheGeometry([[0, 0.0], [0.22, 0.0], [0.4, 0.015], [0.5, 0.07], [0.52, 0.1]].map(function (p) { return new THREE.Vector2(p[0], p[1]); }), 40), wgMat(col, { m: 0, r: 0.8, ds: true }), 0, 0, 0, g).scale.z = 0.85;
var cr2 = wgMesh(new THREE.CylinderGeometry(0.17, 0.22, 0.26, 32), wgMat(col, { m: 0, r: 0.8 }), 0, 0.13, 0, g);
cr2.scale.z = 0.8;
wgMesh(new THREE.BoxGeometry(0.06, 0.06, 0.4), wgMat(new THREE.Color(col).multiplyScalar(0.7).getHex(), { m: 0, r: 0.8 }), 0, 0.26, 0, g);
var bd2 = wgMesh(new THREE.CylinderGeometry(0.222, 0.222, 0.05, 32, 1, true), leather, 0, 0.04, 0, g);
bd2.scale.z = 0.8;
wgMesh(new THREE.BoxGeometry(0.06, 0.05, 0.02), T.metal, 0, 0.04, 0.18, g);
}
else if (hat === "tophat") {
wgMesh(new THREE.CylinderGeometry(0.42, 0.42, 0.025, 40), wgMat(col, { m: 0.05, r: 0.6 }), 0, 0, 0, g).scale.z = 0.85;
wgMesh(new THREE.CylinderGeometry(0.23, 0.21, 0.5, 40), wgMat(col, { m: 0.05, r: 0.55 }), 0, 0.26, 0, g).scale.z = 0.85;
wgMesh(new THREE.CylinderGeometry(0.215, 0.215, 0.08, 40), T.metal, 0, 0.06, 0, g).scale.z = 0.85;
}
else if (hat === "beanie") {
var bn = wgMesh(new THREE.SphereGeometry(0.3, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), wgMat(col, { m: 0, r: 0.95 }), 0, 0, 0, g);
bn.scale.y = 1.15;
var cu = wgMesh(new THREE.TorusGeometry(0.3, 0.06, 10, 40), wgMat(new THREE.Color(col).multiplyScalar(0.8).getHex(), { m: 0, r: 0.95 }), 0, 0.02, 0, g);
cu.rotation.x = Math.PI / 2;
wgMesh(new THREE.SphereGeometry(0.1, 16, 12), wgMat(0xF4F0E8, { m: 0, r: 1 }), 0, 0.37, 0, g);
}
else if (hat === "wizard" || hat === "witch") {
wgMesh(new THREE.CylinderGeometry(0.5, 0.5, 0.025, 40), wgMat(col, { m: 0, r: 0.8 }), 0, 0, 0, g);
wgMesh(new THREE.CylinderGeometry(0.17, 0.3, 0.4, 32), wgMat(col, { m: 0, r: 0.8 }), 0, 0.2, 0, g);
var tp = wgMesh(new THREE.ConeGeometry(0.17, 0.5, 32), wgMat(col, { m: 0, r: 0.8 }), 0.06, 0.62, 0, g);
tp.rotation.z = -0.3;
wgMesh(new THREE.CylinderGeometry(0.305, 0.305, 0.06, 32, 1, true), T.metal, 0, 0.04, 0, g);
[[0.1, 0.25, 0.25], [-0.12, 0.32, 0.21], [0.03, 0.45, 0.15]].forEach(function (q) { wgMesh(new THREE.OctahedronGeometry(0.035, 0), wgMat(0xFFE79A, { m: 0.3, r: 0.3, e: 0xFFD050, ei: 0.5 }), q[0], q[1], q[2], g); });
}
else if (hat === "bandana") {
var bd3 = wgMesh(new THREE.SphereGeometry(0.3, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5), wgMat(col, { m: 0, r: 0.85 }), 0, 0, 0, g);
bd3.scale.y = 0.9;
var hm = wgMesh(new THREE.TorusGeometry(0.3, 0.025, 8, 40), wgMat(col, { m: 0, r: 0.85 }), 0, 0.01, 0, g);
hm.rotation.x = Math.PI / 2;
wgMesh(new THREE.SphereGeometry(0.06, 12, 10), wgMat(col, { m: 0, r: 0.85 }), 0, 0.02, -0.31, g);
[-1, 1].forEach(function (sd) { var tl = wgMesh(new THREE.BoxGeometry(0.08, 0.24, 0.02), wgMat(col, { m: 0, r: 0.85, ds: true }), sd * 0.05, -0.1, -0.33, g); tl.rotation.z = sd * 0.3; });
for (var d2 = 0; d2 < 10; d2++) {
var a9 = d2 / 10 * Math.PI * 2;
wgMesh(new THREE.SphereGeometry(0.018, 8, 6), wgMat(0xF4F0E8, { m: 0, r: 0.8 }), Math.sin(a9) * 0.24, 0.14, Math.cos(a9) * 0.24, g);
}
}
else if (hat === "vinecrown" || hat === "flowercrown") {
var vn = wgMesh(new THREE.TorusGeometry(0.3, 0.03, 8, 40), wgMat(0x4A7A2A, { m: 0, r: 0.8 }), 0, 0, 0, g);
vn.rotation.x = Math.PI / 2;
for (var l2 = 0; l2 < 16; l2++) {
var a10 = l2 / 16 * Math.PI * 2, lf = wgMesh(new THREE.SphereGeometry(0.07, 12, 8), wgMat(l2 % 2 ? 0x5AA83A : 0x3A8A2A, { m: 0, r: 0.6 }), Math.sin(a10) * 0.3, 0.03, Math.cos(a10) * 0.3, g);
lf.scale.set(0.5, 0.25, 1);
lf.rotation.y = a10 + 0.7;
lf.rotation.z = 0.4;
if (l2 % 4 === 0)
wgMesh(new THREE.SphereGeometry(0.045, 12, 10), wgMat(col === 0x4A7A2A ? 0xF07AA0 : col, { m: 0, r: 0.5 }), Math.sin(a10) * 0.3, 0.07, Math.cos(a10) * 0.3, g);
}
}
else {
var dm = wgMesh(new THREE.SphereGeometry(0.3, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), wgMat(col, { m: 0.1, r: 0.7 }), 0, 0, 0, g);
wgMesh(new THREE.TorusGeometry(0.3, 0.03, 8, 40), T.metal, 0, 0, 0, g).rotation.x = Math.PI / 2;
}
}
else if (slot === "gloves") {
var gl = wgMat(col, { m: 0.08, r: 0.65 });
[-1, 1].forEach(function (sd) {
var h = new THREE.Group();
h.position.set(sd * 0.22, 0, 0);
h.rotation.set(0, sd * 0.25, -sd * 0.18);
g.add(h);
var palm = wgMesh(new THREE.SphereGeometry(0.15, 24, 16), gl, 0, 0.05, 0, h);
palm.scale.set(0.95, 1.25, 0.45);
for (var f = 0; f < 4; f++) {
var fx2 = -0.09 + f * 0.06, fl2 = [0.15, 0.18, 0.17, 0.13][f], fg = wgMesh(wgFinger(0.027, fl2), gl, fx2, 0.22 + fl2 / 2, 0, h);
fg.rotation.z = (f - 1.5) * -0.06;
}
var th = wgMesh(wgFinger(0.03, 0.12), gl, sd * -0.15, 0.06, 0.02, h);
th.rotation.z = sd * 0.9;
wgMesh(new THREE.CylinderGeometry(0.15, 0.18, 0.16, 24, 1, true), wgMat(col, { m: 0.08, r: 0.65, ds: true }), 0, -0.18, 0, h).scale.z = 0.62;
var cf = wgMesh(new THREE.TorusGeometry(0.18, 0.018, 8, 28), T.metal, 0, -0.26, 0, h);
cf.rotation.x = Math.PI / 2;
cf.scale.y = 0.62;
wgMesh(new THREE.BoxGeometry(0.24, 0.05, 0.04), T.metal, 0, 0.18, 0.07, h);
wgMesh(new THREE.BoxGeometry(0.16, 0.12, 0.03), T.dark, 0, 0.04, 0.07, h);
});
}
else if (slot === "boots") {
var bl = wgMat(col, { m: 0.08, r: 0.6 }), sole = wgMat(0x2A2420, { m: 0, r: 0.9 });
[-1, 1].forEach(function (sd) {
var b = new THREE.Group();
b.position.set(sd * 0.17, 0, sd * -0.08);
b.rotation.y = sd * 0.12;
g.add(b);
wgMesh(new THREE.CylinderGeometry(0.115, 0.1, 0.42, 24), bl, 0, 0.33, -0.02, b);
var ft = wgMesh(new THREE.SphereGeometry(0.13, 24, 16), bl, 0, 0.09, 0.1, b);
ft.scale.set(0.85, 0.75, 1.75);
wgMesh(new THREE.BoxGeometry(0.2, 0.04, 0.48), sole, 0, 0.02, 0.08, b);
wgMesh(new THREE.BoxGeometry(0.18, 0.06, 0.1), sole, 0, 0.04, -0.1, b);
var tp2 = wgMesh(new THREE.TorusGeometry(0.118, 0.025, 8, 28), T.metal, 0, 0.54, -0.02, b);
tp2.rotation.x = Math.PI / 2;
var st = wgMesh(new THREE.TorusGeometry(0.108, 0.016, 8, 28), leather, 0, 0.2, -0.01, b);
st.rotation.x = Math.PI / 2;
wgMesh(new THREE.BoxGeometry(0.06, 0.05, 0.02), T.metal, 0, 0.2, 0.1, b);
});
}
else {
var cloak = L.back === "cloak", H = cloak ? 1.25 : 1.1, geo = new THREE.PlaneGeometry(0.7, H, 24, 24), pos = geo.attributes.position;
for (var i = 0; i < pos.count; i++) {
var x = pos.getX(i), y = pos.getY(i), t = (H / 2 - y) / H, wx = x * (1 + 0.5 * t);
pos.setXYZ(i, wx, y, -0.9 * x * x * (1 - 0.4 * t) + 0.035 * Math.sin(wx * 22) * t - 0.15 * t);
}
geo.computeVertexNormals();
wgMesh(geo, cloth, 0, -H / 2 + 0.55, 0, g);
var yk = wgMesh(new THREE.TorusGeometry(0.26, 0.04, 10, 32, Math.PI), cloak ? cloth : T.dark, 0, 0.55, 0.12, g);
yk.rotation.x = -Math.PI / 2;
yk.scale.y = 0.5;
yk.rotation.z = Math.PI;
if (cloak) {
var hd2 = wgMesh(new THREE.SphereGeometry(0.22, 24, 14, 0, Math.PI * 2, 0, Math.PI * 0.55), cloth, 0, 0.6, 0.04, g);
hd2.rotation.x = -1.4;
hd2.scale.set(1, 1.1, 0.7);
}
[-1, 1].forEach(function (sd) {
var cd = wgMesh(new THREE.CylinderGeometry(0.06, 0.06, 0.025, 24), T.metal, sd * 0.12, 0.55, 0.2, g);
cd.rotation.x = Math.PI / 2;
wgMesh(new THREE.OctahedronGeometry(0.025, 0), wgMat(0xE8F0FF, { m: 0.1, r: 0.1, e: col, ei: 0.3 }), sd * 0.12, 0.55, 0.22, g);
});
wgMesh(new THREE.CylinderGeometry(0.008, 0.008, 0.18, 6), T.metal, 0, 0.55, 0.21, g).rotation.z = Math.PI / 2;
}
return g;
},
function (key) {
var P = WGEAR.byKey[key];
if (!P)
return null;
var W = P.W, g = null;
if (P.use === "charm")
return { g: wgCharmModel(P), slot: "charm" };
if (P.use === "weapon") {
var base = typeof BW_ARMS !== "undefined" && BW_ARMS[P.x.arm], bh = base && base.held;
if (typeof HELD !== "undefined" && bh && HELD[bh]) {
g = HELD[bh]();
if (typeof fgTintHeld === "function")
fgTintHeld(g, "wgt_" + W.id, null);
}
return g ? { g: g, slot: "weapon" } : null;
}
if (P.use === "mount") {
wgMountReady(P.x.arch);
g = build({ id: "__wgpic_" + key, archetype: P.x.arch, attrs: {}, solid: false, detail: 4, nights: [], city: true });
wgMountFix(g, P.x.arch);
if (g.userData.anim)
try {
g.userData.anim(1.2, 0);
}
catch (e) { }
if (typeof modelDress === "function")
try {
modelDress(g, { id: "__wgpic_" + key, archetype: P.x.arch, attrs: {}, solid: true, placed: true });
}
catch (e) { }
return { g: g, slot: "mount" };
}
if (P.use === "armour")
return { g: wgArmourModel(P), slot: "piece" };
return null;
},
function (g, flat) {
var b = new THREE.Box3(), v = new THREE.Vector3();
(function walk(o) {
if (!o.visible || (o.userData && o.userData.contact))
return;
if (o.isMesh && o.geometry && o.geometry.attributes && o.geometry.attributes.position && !(flat && /Plane|Circle|Ring/.test(o.geometry.type || ""))) {
var p = o.geometry.attributes.position;
for (var i = 0; i < p.count; i++) {
v.fromBufferAttribute(p, i).applyMatrix4(o.matrixWorld);
b.expandByPoint(v);
}
}
o.children.forEach(walk);
})(g);
return b;
},
function (m) {
var g = m.g;
g.updateMatrixWorld(true);
var bb = wgPicBox(g, m.slot === "mount");
if (bb.isEmpty())
bb.setFromObject(g);
var sz = bb.getSize(new THREE.Vector3()), c = bb.getCenter(new THREE.Vector3());
return { c: c, r: Math.max(sz.x * 0.62, sz.y * 0.62, sz.z * 0.42, 0.05) };
},
function () {
return new Promise(function (done) {
if (typeof modelsManifest !== "function")
return done(0);
var left = 0, t = setTimeout(function () { done(-1); }, 60000);
modelsManifest(function () {
var fs = {};
Object.keys(WG_GLB).forEach(function (b) { fs[WG_GLB[b].f] = 1; });
var all = Object.keys(fs);
left = all.length;
all.forEach(function (f) { modelFile(f, function () { if (--left === 0) {
clearTimeout(t);
done(all.length);
} }); });
});
});
},
function (keys, cell, cols) {
var R = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
R.setPixelRatio(1);
R.setSize(cell, cell);
R.setClearColor(0x000000, 0);
if (R.outputEncoding !== undefined && THREE.sRGBEncoding)
R.outputEncoding = THREE.sRGBEncoding;
var S = new THREE.Scene(), cam = new THREE.PerspectiveCamera(30, 1, 0.01, 200);
S.add(new THREE.HemisphereLight(0xF4F6FF, 0x40384A, 1.05));
var key = new THREE.DirectionalLight(0xFFF4E6, 1.1);
key.position.set(3, 5, 4);
S.add(key);
var rim = new THREE.DirectionalLight(0xB8C8FF, 0.6);
rim.position.set(-4, 2, -3);
S.add(rim);
var rows = Math.ceil(keys.length / cols), cv = document.createElement("canvas");
cv.width = cols * cell;
cv.height = rows * cell;
var x = cv.getContext("2d"), miss = [];
keys.forEach(function (k, i) {
var m = null;
try {
m = wgPicModel(k);
}
catch (e) {
m = null;
}
if (!m || !m.g) {
miss.push(k);
return;
}
var holder = new THREE.Group();
holder.add(m.g);
if (m.slot === "weapon") {
m.g.rotation.set(0, 0, 0);
holder.rotation.set(0.1, -0.6, -0.75);
}
else if (m.slot === "mount") {
var bs = CREATURE[WGEAR.byKey[k].x.arch];
holder.rotation.y = -0.75 + ((bs && WG_PIC_YAW[bs.wgBase]) || 0);
if (bs && /^(crab|scorpion)$/.test(bs.wgBase)) {
var tilt = new THREE.Group();
tilt.add(holder);
tilt.rotation.x = 0.55;
holder = tilt;
}
}
else if (m.slot === "piece")
holder.rotation.set(0.12, -0.45, 0);
S.add(holder);
var F = wgPicFrame({ g: holder, slot: m.slot }), d = F.r / Math.tan(cam.fov * Math.PI / 360) * 1.08;
cam.position.set(F.c.x, F.c.y + d * 0.12, F.c.z + d);
cam.lookAt(F.c);
R.render(S, cam);
x.drawImage(R.domElement, (i % cols) * cell, Math.floor(i / cols) * cell);
S.remove(holder);
holder.traverse(function (o) { if (o.isMesh && o.geometry && o.geometry.dispose && o.userData && o.userData.wgOwn)
o.geometry.dispose(); });
});
R.dispose();
return { url: cv.toDataURL("image/webp", 0.9), n: keys.length, miss: miss };
},
function (key, px) {
px = px || 56;
var at = typeof WG_PICS !== "undefined" && WG_PICS.at && WG_PICS.at[key];
var P = WGEAR.byKey[key], bg = P ? wgHex(P.W.col) : "#445";
var frame = "display:inline-block;flex:none;width:" + px + "px;height:" + px + "px;border-radius:6px;vertical-align:middle;" +
"background-color:#141824;background-image:radial-gradient(circle at 50% 40%," + bg + "55,transparent 70%);border:1px solid rgba(160,176,220,.28)";
if (!at)
return "<span style='" + frame + ";text-align:center;line-height:" + px + "px;font-size:" + Math.round(px * 0.5) + "px'>" + (P ? (P.use === "weapon" ? "⚔️" : P.use === "armour" ? "🛡️" : P.use === "mount" ? "🐎" : "🔮") : "📦") + "</span>";
var S = WG_PICS.sheets[at[0]], n = at[1], cols = S.cols, k = px / S.cell;
return "<span style='" + frame + ";position:relative;overflow:hidden'><span style='position:absolute;inset:0;background:url(assets/world-gear/" + S.file + ") " + (-(n % cols) * px) + "px " + (-Math.floor(n / cols) * px) + "px/" + (cols * px) + "px auto no-repeat'></span></span>";
},
function (par, mat, a, b, r0, r1, seg) {
var d = b.clone().sub(a), L = d.length(), m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r0, L, seg || 18, 1, true), mat);
m.position.copy(a).addScaledVector(d, 0.5);
m.quaternion.setFromUnitVectors(wgV(0, 1, 0), d.normalize());
par.add(m);
wgEl(par, mat, r0, 1, 1, 1, a.x, a.y, a.z, seg || 18);
wgEl(par, mat, r1, 1, 1, 1, b.x, b.y, b.z, seg || 18);
return m;
},
function (par, mat, pts, r0, r1, n, rs) {
var c = new THREE.CatmullRomCurve3(pts), N = n || 32, R = rs || 12, g = new THREE.TubeGeometry(c, N, r0, R, false), p = g.attributes.position, v = new THREE.Vector3();
for (var i = 0; i <= N; i++) {
var t = i / N, ctr = c.getPointAt(t), k = (r0 + (r1 - r0) * t) / r0;
for (var j = 0; j <= R; j++) {
var q = i * (R + 1) + j;
v.fromBufferAttribute(p, q).sub(ctr).multiplyScalar(k).add(ctr);
p.setXYZ(q, v.x, v.y, v.z);
}
}
g.computeVertexNormals();
var m = new THREE.Mesh(g, mat);
par.add(m);
var e = wgEl(par, mat, r1, 1, 1, 1, pts[pts.length - 1].x, pts[pts.length - 1].y, pts[pts.length - 1].z, 10);
return m;
},
function (g, col, H, mark) {
g.updateMatrixWorld(true);
var base = new THREE.Color(col), c = new THREE.Color(), v = new THREE.Vector3();
g.traverse(function (m) {
if (!m.isMesh || !m.material || !m.material.userData.wgFur)
return;
var p = m.geometry.attributes.position, a = new Float32Array(p.count * 3);
for (var i = 0; i < p.count; i++) {
v.fromBufferAttribute(p, i).applyMatrix4(m.matrixWorld);
var t = Math.max(0, Math.min(1, v.y / H)), k = 1.12 - 0.26 * t;
if (mark)
k *= mark(v);
c.copy(base).multiplyScalar(k);
a[i * 3] = Math.min(1, c.r);
a[i * 3 + 1] = Math.min(1, c.g);
a[i * 3 + 2] = Math.min(1, c.b);
}
m.geometry.setAttribute("color", new THREE.BufferAttribute(a, 3));
});
},
function () {
if (WG_FURTEX)
return WG_FURTEX;
var c = document.createElement("canvas");
c.width = c.height = 256;
var x = c.getContext("2d");
x.fillStyle = "#D8D8D8";
x.fillRect(0, 0, 256, 256);
for (var i = 0; i < 5200; i++) {
var px = (i * 97.13) % 256, py = (i * 53.71 + i * i * 0.013) % 256, l = 4 + (i * 7) % 9, v = 170 + ((i * 31) % 86);
x.strokeStyle = "rgba(" + v + "," + v + "," + v + ",0.55)";
x.lineWidth = 1;
x.beginPath();
x.moveTo(px, py);
x.lineTo(px + ((i % 5) - 2) * 0.6, py + l);
x.stroke();
}
var t = new THREE.CanvasTexture(c);
t.wrapS = t.wrapT = THREE.RepeatWrapping;
t.repeat.set(3, 3);
if (THREE.sRGBEncoding !== undefined)
t.encoding = THREE.sRGBEncoding;
return (WG_FURTEX = t);
},
function (col) {
var light = new THREE.Color(col).lerp(new THREE.Color(0xFFF4E4), 0.45).getHex();
return { fur: wgFurMat(), light: new THREE.MeshStandardMaterial({ color: light, roughness: 0.85 }),
dark: new THREE.MeshStandardMaterial({ color: 0x221A16, roughness: 0.6 }),
eye: new THREE.MeshStandardMaterial({ color: 0x120C08, roughness: 0.12, metalness: 0.2 }),
iris: new THREE.MeshStandardMaterial({ color: 0x7A4A1E, roughness: 0.15, metalness: 0.1 }),
pink: new THREE.MeshStandardMaterial({ color: 0xD89A94, roughness: 0.75 }),
shine: new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.1, emissive: 0xFFFFFF, emissiveIntensity: 0.4 }),
horn: new THREE.MeshStandardMaterial({ color: 0xE8DCC0, roughness: 0.4, metalness: 0.05 }),
hoof: new THREE.MeshStandardMaterial({ color: 0x2E2620, roughness: 0.5 }),
nose: new THREE.MeshStandardMaterial({ color: 0x2A1E1C, roughness: 0.35 }),
beak: new THREE.MeshStandardMaterial({ color: 0xE8B23A, roughness: 0.35, metalness: 0.05 }),
gold: new THREE.MeshStandardMaterial({ color: 0xD8B24A, roughness: 0.28, metalness: 0.75 }),
steel: new THREE.MeshStandardMaterial({ color: 0x9AA2AC, roughness: 0.3, metalness: 0.8 }) };
},
function (par, M, x, y, z, r, turn, o) {
o = o || {};
var iris = o.iris ? new THREE.MeshStandardMaterial({ color: o.iris, roughness: 0.15, metalness: 0.1 }) : M.iris;
[-1, 1].forEach(function (s) {
var e = new THREE.Group();
e.position.set(s * x, y, z);
e.rotation.y = s * (turn || 0.5);
par.add(e);
wgEl(e, M.eye, r * 1.04, 1, 1, 0.8, 0, 0, -r * 0.05, 14);
wgEl(e, iris, r * 0.86, 1, 1, 0.5, 0, 0, r * 0.4, 16);
wgEl(e, M.eye, r * 0.5, o.slit ? 0.32 : 1, 1, 0.4, 0, 0, r * 0.62, 12);
wgEl(e, M.shine, r * 0.2, 1, 1, 0.6, -s * r * 0.3, r * 0.32, r * 0.74, 8);
if (o.lid) {
var l = new THREE.Mesh(new THREE.TorusGeometry(r * 0.98, r * 0.2, 8, 20), o.lid);
l.position.z = r * 0.25;
l.scale.set(1.08, 0.9, 1);
e.add(l);
}
});
},
function (par, M, o) {
[[o.fz, o.fw, o.fr, 1], [o.bz, o.bw, o.br, -1]].forEach(function (L) {
[-1, 1].forEach(function (s) {
var top = wgV(s * L[1], o.y, L[0]), knee = wgV(s * L[1] * 1.02, o.y * 0.48, L[0] + (L[3] > 0 ? -0.02 : 0.07) * o.y), foot = wgV(s * L[1] * 1.03, o.foot + L[2] * 0.4, L[0] + (L[3] > 0 ? 0.01 : -0.01) * o.y);
var P = par, off = wgV(0, 0, 0);
if (o.hips) {
P = new THREE.Group();
P.position.copy(top);
par.add(P);
o.hips.push(P);
off = top.clone();
}
top.sub(off);
knee.sub(off);
foot.sub(off);
if (!o.hoof)
wgEl(P, M.fur, L[2] * (L[3] > 0 ? 1.7 : 2.1), 0.6, 1.5, 1.0, top.x * 0.6, top.y - L[2] * 1.2, top.z + (L[3] > 0 ? 0.2 : -0.3) * L[2], 20);
wgSeg(P, M.fur, top, knee, L[2] * 1.45, L[2] * 0.8);
wgSeg(P, M.fur, knee, foot, L[2] * 0.85, L[2] * 0.7);
var fy = -off.y;
if (o.hoof) {
var h = new THREE.Mesh(new THREE.CylinderGeometry(L[2] * 0.72, L[2] * 0.88, o.foot + L[2] * 0.4, 16), M.hoof);
h.position.set(foot.x, fy + (o.foot + L[2] * 0.4) / 2, foot.z);
P.add(h);
}
else {
wgEl(P, o.pawMat || M.fur, L[2] * 1.05, 1, 0.55, 1.35, foot.x, fy + L[2] * 0.5, foot.z + L[2] * 0.35, 16);
for (var q = 0; q < 4; q++)
wgEl(P, o.pawMat || M.fur, L[2] * 0.36, 1, 0.8, 1.2, foot.x + (q - 1.5) * L[2] * 0.48, fy + L[2] * 0.32, foot.z + L[2] * (1.25 - Math.abs(q - 1.5) * 0.2), 10);
if (o.claws)
for (var c = -1; c <= 1; c++) {
var cl = new THREE.Mesh(new THREE.ConeGeometry(L[2] * 0.16, L[2] * 0.45, 8), M.horn);
cl.position.set(foot.x + c * L[2] * 0.5, fy + L[2] * 0.25, foot.z + L[2] * 1.6);
cl.rotation.x = Math.PI / 2 + 0.4;
P.add(cl);
}
}
});
});
},
function (par, mat, E, o) {
o = o || {};
var R = o.rs || 28, N = o.n || 44, z0 = 1e9, z1 = -1e9;
E.forEach(function (e) { z0 = Math.min(z0, e.z - e.rz); z1 = Math.max(z1, e.z + e.rz); });
var pos = [], uv = [], idx = [], k = 4;
for (var i = 0; i <= N; i++) {
var t = i / N, z = z1 - (z1 - z0) * (0.5 - 0.5 * Math.cos(t * Math.PI)), sw = 0, sy = 0, sx = 0, wsum = 0;
E.forEach(function (e) { var u = (z - e.z) / e.rz; if (u * u >= 1)
return; var f = Math.sqrt(1 - u * u), ry = e.ry * f, w = Math.pow(ry, k); sw += w; sy += w * e.y; sx += w * (e.rx / e.ry); wsum += w; });
var r = sw > 0 ? Math.pow(sw, 1 / k) : 0, cy = wsum > 0 ? sy / wsum : E[0].y, ax = wsum > 0 ? sx / wsum : 1;
if (i === 0 || i === N)
r = 0;
for (var j = 0; j <= R; j++) {
var a = j / R * Math.PI * 2;
pos.push(Math.sin(a) * r * ax, cy + Math.cos(a) * r, z);
uv.push(j / R * 2, t * 3);
}
}
for (i = 0; i < N; i++)
for (var j = 0; j < R; j++) {
var A = i * (R + 1) + j, B = A + R + 1;
idx.push(A, B, A + 1, B, B + 1, A + 1);
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
g.setIndex(idx);
g.computeVertexNormals();
var m = new THREE.Mesh(g, mat);
par.add(m);
return m;
},
function (par, M, kind, p, S, o) {
o = o || {};
var h = new THREE.Group();
h.position.copy(p);
par.add(h);
if (kind === "cat" || kind === "dog" || kind === "fox" || kind === "bear") {
var L = { cat: 0.42, dog: 0.85, fox: 1.05, bear: 0.72 }[kind], mw = { cat: 0.55, dog: 0.5, fox: 0.4, bear: 0.62 }[kind], mz = S * (0.5 + L * 0.45);
wgBlend(h, M.fur, [{ z: -S * 0.05, y: S * 0.02, rx: S * 0.98, ry: S * 0.9, rz: S }, { z: S * 0.25, y: -S * 0.2, rx: S * 0.82, ry: S * 0.62, rz: S * 0.7 }, { z: mz, y: -S * 0.3, rx: S * mw, ry: S * 0.4, rz: S * (0.32 + L * 0.45) }], { n: 36, rs: 30 });
if (kind !== "bear")
wgEl(h, M.light, S * 0.5, mw * (kind === "dog" ? 1.3 : 1.6), 0.5, 1 + L * 0.6, 0, -S * 0.48, mz * 0.85, 18);
else
wgEl(h, M.light, S * 0.42, 1.3, 0.75, 1 + L * 0.7, 0, -S * 0.3, mz, 18);
var tip = S * (0.5 + L * 0.45) + S * (0.32 + L * 0.45);
if (kind === "cat") {
wgEl(h, M.pink, S * 0.09, 1.3, 0.7, 0.8, 0, -S * 0.14, tip - S * 0.06, 12);
}
else {
wgEl(h, M.nose, S * (kind === "bear" ? 0.2 : 0.15), 1.35, 0.85, 0.9, 0, -S * 0.18, tip - S * 0.06, 14);
[-1, 1].forEach(function (s) { wgEl(h, M.dark, S * 0.04, 1.4, 0.8, 0.6, s * S * 0.08, -S * 0.21, tip + S * 0.06, 8); });
}
wgTube(h, M.dark, [wgV(-S * 0.24, -S * 0.5, tip - S * 0.42), wgV(-S * 0.14, -S * 0.5, tip - S * 0.12), wgV(0, -S * 0.42, tip - S * 0.04), wgV(S * 0.14, -S * 0.5, tip - S * 0.12), wgV(S * 0.24, -S * 0.5, tip - S * 0.42)], S * 0.018, S * 0.018, 16, 6);
var lid = kind === "bear" ? null : M.fur, slit = kind === "cat" || kind === "fox";
wgEyes(h, M, S * (kind === "bear" ? 0.4 : 0.42), S * 0.2, S * (kind === "bear" ? 0.76 : 0.79), S * (kind === "bear" ? 0.1 : kind === "dog" ? 0.12 : 0.15), kind === "cat" ? 0.35 : 0.5, { iris: o.iris || { cat: 0x9AB830, dog: 0x5A3416, fox: 0xC88A20, bear: 0x2A1A10 }[kind], slit: slit, lid: lid });
if (kind === "cat" || kind === "fox")
[-1, 1].forEach(function (s) { for (var w = 0; w < 3; w++) {
var a = wgV(s * S * 0.22, -S * (0.3 + w * 0.05), tip - S * 0.22), e = wgV(s * S * (0.95 + w * 0.05), -S * (0.2 + w * 0.12), tip - S * 0.35);
wgSeg(h, M.horn, a, e, S * 0.008, S * 0.004, 4);
} });
[-1, 1].forEach(function (s) {
if (kind === "bear" || o.mane) {
var be = new THREE.Group();
be.position.set(s * S * 0.6, S * 0.66, -S * 0.12);
h.add(be);
wgEl(be, M.fur, S * 0.26, 1, 1, 0.55, 0, 0, 0, 14);
wgEl(be, M.dark, S * 0.17, 1, 1, 0.3, 0, 0, S * 0.08, 12);
return;
}
var ear = new THREE.Group(), tall = S * { cat: 0.5, dog: 0.55, fox: 0.75 }[kind], wide = S * { cat: 0.28, dog: 0.3, fox: 0.3 }[kind];
if (kind === "dog") {
ear.position.set(s * S * 0.68, S * 0.45, -S * 0.1);
ear.rotation.set(0, s * 0.2, s * 0.35);
h.add(ear);
var fl = wgEl(ear, M.fur, S * 0.32, 0.35, 1.25, 0.8, s * S * 0.05, -S * 0.32, 0, 16);
return;
}
ear.position.set(s * S * 0.48, S * 0.72, -S * 0.12);
ear.rotation.set(-0.12, -s * 0.25, -s * 0.3);
h.add(ear);
var out = new THREE.Mesh(new THREE.ConeGeometry(wide, tall, 14, 1, true), M.fur);
out.material.side = THREE.DoubleSide;
out.position.y = tall / 2;
out.scale.z = 0.45;
ear.add(out);
var inn = new THREE.Mesh(new THREE.ConeGeometry(wide * 0.72, tall * 0.82, 12), kind === "fox" ? M.light : M.pink);
inn.position.set(0, tall * 0.4, wide * 0.36);
inn.scale.z = 0.15;
ear.add(inn);
if (kind === "fox") {
var tp = new THREE.Mesh(new THREE.ConeGeometry(wide * 0.42, tall * 0.32, 10), M.dark);
tp.position.y = tall * 0.86;
tp.scale.z = 0.5;
ear.add(tp);
}
});
if (kind === "cat" && o.mane) {
for (var i = 0; i < 22; i++) {
var a = i / 22 * Math.PI * 2;
wgEl(h, o.mane, S * 0.42, 1, 1, 0.7, Math.cos(a) * S * 0.95, Math.sin(a) * S * 0.95 - S * 0.15, -S * 0.45, 14);
}
wgEl(h, o.mane, S * 1.25, 1, 1.15, 0.9, 0, -S * 0.1, -S * 0.75, 20);
}
}
else if (kind === "eagle") {
wgEl(h, o.head || M.fur, S, 0.9, 0.95, 1.1, 0, 0, 0);
wgTube(h, M.beak, [wgV(0, S * 0.2, S * 0.75), wgV(0, S * 0.08, S * 1.35), wgV(0, -S * 0.25, S * 1.6), wgV(0, -S * 0.42, S * 1.42)], S * 0.32, S * 0.04, 20, 12);
wgEyes(h, M, S * 0.5, S * 0.28, S * 0.55, S * 0.15, 0.9);
for (var f = 0; f < 7; f++)
wgEl(h, o.head || M.fur, S * 0.3, 0.5, 0.3, 1.4, (f % 2 ? 1 : -1) * S * 0.08 * f, S * (0.5 - f * 0.05), -S * (0.75 + f * 0.08), 12);
}
else if (kind === "boar") {
wgEl(h, M.fur, S, 0.9, 0.95, 1.2, 0, 0, 0);
wgSeg(h, M.fur, wgV(0, -S * 0.1, S * 0.6), wgV(0, -S * 0.3, S * 1.55), S * 0.6, S * 0.4);
var disc = new THREE.Mesh(new THREE.CylinderGeometry(S * 0.4, S * 0.4, S * 0.12, 20), M.nose);
disc.rotation.x = Math.PI / 2;
disc.position.set(0, -S * 0.3, S * 1.92);
h.add(disc);
[-1, 1].forEach(function (s) {
wgTube(h, M.horn, [wgV(s * S * 0.32, -S * 0.45, S * 1.3), wgV(s * S * 0.5, -S * 0.3, S * 1.55), wgV(s * S * 0.45, S * 0.05, S * 1.6)], S * 0.09, S * 0.02, 12, 8);
var ear = new THREE.Mesh(new THREE.ConeGeometry(S * 0.28, S * 0.55, 10), M.fur);
ear.position.set(s * S * 0.55, S * 0.72, -S * 0.05);
ear.rotation.set(0.5, 0, -s * 0.6);
ear.scale.z = 0.5;
h.add(ear);
});
wgEyes(h, M, S * 0.45, S * 0.3, S * 0.62, S * 0.11, 0.5);
}
else if (kind === "ram") {
wgEl(h, M.fur, S, 0.85, 0.9, 1.15, 0, 0, 0);
wgSeg(h, M.light, wgV(0, -S * 0.05, S * 0.55), wgV(0, -S * 0.45, S * 1.3), S * 0.55, S * 0.36);
wgEl(h, M.nose, S * 0.14, 1.4, 0.7, 0.7, 0, -S * 0.42, S * 1.62, 10);
wgEyes(h, M, S * 0.55, S * 0.2, S * 0.5, S * 0.13, 0.9);
[-1, 1].forEach(function (s) {
var pts = [];
for (var i = 0; i <= 14; i++) {
var a = i / 14 * Math.PI * 1.75, r = S * (0.75 - 0.35 * i / 14);
pts.push(wgV(s * (S * 0.55 + S * 0.45 * i / 14), S * 0.55 + Math.sin(a) * r - S * 0.2, -S * 0.15 + Math.cos(a) * r - S * 0.75));
}
wgTube(h, M.horn, pts, S * 0.3, S * 0.08, 48, 14);
var ear = wgEl(h, M.fur, S * 0.3, 1.4, 0.35, 0.6, s * S * 0.95, S * 0.05, -S * 0.05, 12);
ear.rotation.z = -s * 0.4;
});
wgEl(h, M.light, S * 0.25, 0.8, 1.6, 0.8, 0, -S * 0.95, S * 0.85, 12);
}
else if (kind === "rabbit") {
wgEl(h, M.fur, S, 0.95, 0.92, 1.15, 0, 0, 0);
wgEl(h, M.light, S * 0.45, 1.3, 0.9, 0.9, 0, -S * 0.3, S * 0.85);
wgEl(h, M.nose, S * 0.12, 1.3, 0.8, 0.8, 0, -S * 0.12, S * 1.18, 10);
wgEyes(h, M, S * 0.55, S * 0.18, S * 0.55, S * 0.17, 1.0);
[-1, 1].forEach(function (s) {
var ear = new THREE.Group();
ear.position.set(s * S * 0.35, S * 0.7, -S * 0.25);
ear.rotation.set(-0.35, 0, -s * 0.18);
h.add(ear);
wgEl(ear, M.fur, S * 0.32, 0.8, 3.2, 0.35, 0, S * 0.95, 0, 16);
wgEl(ear, o.inner || M.light, S * 0.24, 0.7, 2.8, 0.2, 0, S * 0.95, S * 0.07, 14);
});
}
else if (kind === "elephant") {
wgEl(h, M.fur, S, 0.95, 1.05, 1, 0, 0, 0);
wgTube(h, M.fur, [wgV(0, -S * 0.1, S * 0.75), wgV(0, -S * 0.8, S * 1.1), wgV(0, -S * 1.6, S * 1.05), wgV(0, -S * 2.15, S * 1.25), wgV(0, -S * 2.25, S * 1.55)], S * 0.38, S * 0.13, 40, 16);
wgEyes(h, M, S * 0.72, S * 0.05, S * 0.55, S * 0.09, 1.0);
[-1, 1].forEach(function (s) {
var ear = wgEl(h, M.fur, S * (o.mammoth ? 0.45 : 1.0), 0.15, 1.1, 0.95, s * S * (o.mammoth ? 0.9 : 1.05), -S * 0.15, -S * 0.25, 24);
ear.rotation.y = -s * 0.55;
var tk = o.mammoth ? [wgV(s * S * 0.35, -S * 0.65, S * 0.7), wgV(s * S * 0.7, -S * 1.8, S * 1.3), wgV(s * S * 0.75, -S * 1.95, S * 2.4), wgV(s * S * 0.35, -S * 1.2, S * 2.9)]
: [wgV(s * S * 0.35, -S * 0.65, S * 0.7), wgV(s * S * 0.42, -S * 1.3, S * 1.2), wgV(s * S * 0.38, -S * 1.4, S * 1.75)];
wgTube(h, M.horn, tk, S * 0.15, S * 0.04, 30, 12);
});
if (o.mammoth)
wgEl(h, o.hair || M.fur, S * 0.75, 1, 0.8, 1, 0, S * 0.7, -S * 0.1, 20);
}
return h;
},
function (S, c1, c2) {
var w = new THREE.Group(), m1 = new THREE.MeshStandardMaterial({ color: c1, roughness: 0.8, side: THREE.DoubleSide }), m2 = new THREE.MeshStandardMaterial({ color: c2, roughness: 0.8, side: THREE.DoubleSide });
function feather(len, wid, mat) {
var sh = new THREE.Shape();
sh.moveTo(0, 0);
sh.quadraticCurveTo(wid * 0.62, len * 0.42, wid * 0.18, len);
sh.quadraticCurveTo(0, len * 1.02, -wid * 0.18, len);
sh.quadraticCurveTo(-wid * 0.5, len * 0.4, 0, 0);
var gm = new THREE.ShapeGeometry(sh, 6);
gm.rotateX(-Math.PI / 2);
return new THREE.Mesh(gm, mat);
}
[{ n: 14, l0: 0.5, l1: 0.95, w: 0.2, y: 0, m: m2 }, { n: 12, l0: 0.32, l1: 0.5, w: 0.19, y: 0.012, m: m1 }, { n: 10, l0: 0.18, l1: 0.26, w: 0.18, y: 0.024, m: m1 }].forEach(function (R) {
for (var i = 0; i < R.n; i++) {
var t = (i + 0.5) / R.n, ln = S * (R.l0 + (R.l1 - R.l0) * Math.pow(t, 1.4)), q = feather(ln, S * R.w, R.m);
q.position.set(t * S, R.y * S, 0);
q.rotation.y = -t * t * 0.4;
w.add(q);
}
});
var arm = new THREE.Mesh(new THREE.CylinderGeometry(S * 0.03, S * 0.045, S, 10), m1);
arm.rotation.z = Math.PI / 2;
arm.position.set(S / 2, S * 0.02, 0);
w.add(arm);
return w;
},
function (S, bone, skin) {
var w = new THREE.Group(), sh = new THREE.Shape(), tips = [[1, 0.05], [0.85, -0.55], [0.55, -0.75], [0.25, -0.6]];
sh.moveTo(0, 0);
sh.lineTo(1 * S, 0.05 * S);
for (var i = 1; i < tips.length; i++) {
var a = tips[i - 1], b = tips[i];
sh.quadraticCurveTo((a[0] + b[0]) / 2 * S * 0.9, (a[1] + b[1]) / 2 * S * 0.7, b[0] * S, b[1] * S);
}
sh.quadraticCurveTo(0.08 * S, -0.4 * S, 0, -0.15 * S);
sh.lineTo(0, 0);
var gm = new THREE.ShapeGeometry(sh, 8);
gm.rotateX(-Math.PI / 2);
w.add(new THREE.Mesh(gm, new THREE.MeshStandardMaterial({ color: skin, roughness: 0.7, side: THREE.DoubleSide })));
var bm = new THREE.MeshStandardMaterial({ color: bone, roughness: 0.6 });
tips.forEach(function (t) { var a = wgV(0, 0.01 * S, 0), b = wgV(t[0] * S * 0.97, 0.01 * S, -t[1] * S * 0.97); wgSeg(w, bm, a, b, S * 0.025, S * 0.012, 8); });
return w;
},
function (c, P) {
var n = P.name.toLowerCase(), M = wgMats(c), cat = !/panther|cat/.test(n), g = new THREE.Group();
var o = { y: 0.82, cz: 0.42, hz: -0.42, rc: 0.38, rh: 0.34, fz: 0.5, bz: -0.5, fw: 0.2, bw: 0.21, fr: 0.085, br: 0.095, foot: 0.02, claws: 1 };
wgTorso(g, M, o);
wgLegs(g, M, o);
var mane = cat ? new THREE.MeshStandardMaterial({ color: new THREE.Color(c).multiplyScalar(0.62).getHex(), roughness: 0.95 }) : null;
wgSeg(g, cat ? mane : M.fur, wgV(0, 1.0, 0.6), wgV(0, 1.22, 0.86), 0.26, 0.2);
wgHead(g, M, "cat", wgV(0, 1.28, 0.98), 0.27, { mane: mane });
wgTube(g, M.fur, [wgV(0, 0.95, -0.78), wgV(0, 0.7, -1.05), wgV(0, 0.45, -1.2), wgV(0, 0.55, -1.42)], 0.06, 0.035, 24, 10);
wgEl(g, mane || M.fur, 0.08, 1, 1, 1.4, 0, 0.56, -1.46, 12);
return { g: g, mark: /jaguar|marigold/.test(n) ? wgRosettes : null };
},
function (c) {
var M = wgMats(c), g = new THREE.Group(), o = { y: 0.78, cz: 0.38, hz: -0.4, rc: 0.48, rh: 0.46, fz: 0.45, bz: -0.45, fw: 0.24, bw: 0.25, fr: 0.13, br: 0.14, foot: 0.02, claws: 1 };
wgTorso(g, M, o);
wgLegs(g, M, o);
wgEl(g, M.fur, 0.34, 0.9, 0.8, 1, 0, 1.18, 0.32);
wgSeg(g, M.fur, wgV(0, 1.0, 0.62), wgV(0, 1.05, 0.92), 0.3, 0.24);
wgHead(g, M, "bear", wgV(0, 1.08, 1.06), 0.27);
wgEl(g, M.fur, 0.09, 1, 1, 1, 0, 0.9, -0.86, 12);
return { g: g };
},
function (c) {
var M = wgMats(c), g = new THREE.Group(), o = { y: 0.62, cz: 0.3, hz: -0.35, rc: 0.42, rh: 0.36, fz: 0.38, bz: -0.42, fw: 0.18, bw: 0.18, fr: 0.07, br: 0.08, foot: 0.08, hoof: 1 };
wgTorso(g, M, o);
wgLegs(g, M, o);
var br = new THREE.MeshStandardMaterial({ color: new THREE.Color(c).multiplyScalar(0.55).getHex(), roughness: 1 });
for (var i = 0; i < 12; i++) {
var z = 0.6 - i * 0.09, sp = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.16, 6), br);
sp.position.set(0, 0.98 + Math.sin(i / 11 * Math.PI) * 0.06 - (i > 8 ? (i - 8) * 0.04 : 0), z);
sp.rotation.x = -0.5;
g.add(sp);
}
wgHead(g, M, "boar", wgV(0, 0.72, 0.82), 0.25);
wgTube(g, M.fur, [wgV(0, 0.7, -0.7), wgV(0.05, 0.72, -0.8), wgV(-0.04, 0.66, -0.84), wgV(0.03, 0.6, -0.86)], 0.025, 0.015, 16, 8);
return { g: g };
},
function (c) {
var M = wgMats(c), g = new THREE.Group(), o = { y: 0.82, cz: 0.35, hz: -0.38, rc: 0.4, rh: 0.38, fz: 0.42, bz: -0.42, fw: 0.18, bw: 0.18, fr: 0.065, br: 0.075, foot: 0.08, hoof: 1 };
wgTorso(g, M, o);
wgLegs(g, M, o);
for (var i = 0; i < 26; i++) {
var a = i * 2.4, z = -0.5 + (i % 13) / 12 * 1.0;
wgEl(g, M.fur, 0.17, 1, 0.9, 1, Math.cos(a) * 0.32, 0.86 + Math.sin(a) * 0.3, z, 12);
}
wgSeg(g, M.fur, wgV(0, 1.0, 0.55), wgV(0, 1.3, 0.78), 0.2, 0.14);
wgHead(g, M, "ram", wgV(0, 1.38, 0.88), 0.2);
wgEl(g, M.fur, 0.08, 1, 1.3, 1, 0, 0.98, -0.78, 10);
return { g: g };
},
function (c) {
var M = wgMats(c), g = new THREE.Group();
wgEl(g, M.fur, 0.5, 0.9, 0.95, 1.05, 0, 0.68, -0.22, 32);
wgEl(g, M.fur, 0.38, 0.85, 0.9, 1, 0, 0.78, 0.25, 32);
wgEl(g, M.light, 0.3, 0.8, 0.8, 1, 0, 0.55, 0.25, 24);
[-1, 1].forEach(function (s) {
wgEl(g, M.fur, 0.3, 0.6, 0.9, 1.1, s * 0.33, 0.5, -0.3, 20);
wgSeg(g, M.fur, wgV(s * 0.33, 0.4, -0.4), wgV(s * 0.32, 0.1, -0.3), 0.12, 0.08);
wgEl(g, M.light, 0.1, 0.9, 0.5, 2.6, s * 0.32, 0.06, -0.12, 16);
wgSeg(g, M.fur, wgV(s * 0.17, 0.6, 0.42), wgV(s * 0.18, 0.08, 0.5), 0.08, 0.06);
wgEl(g, M.light, 0.07, 1, 0.6, 1.6, s * 0.18, 0.04, 0.56, 12);
});
wgEl(g, M.light, 0.13, 1, 1, 1, 0, 0.82, -0.72, 14);
wgHead(g, M, "rabbit", wgV(0, 1.1, 0.55), 0.26, { inner: new THREE.MeshStandardMaterial({ color: 0xF4B8C0, roughness: 0.8 }) });
return { g: g };
},
function (c, P) {
var M = wgMats(c), g = new THREE.Group(), o = { y: 1.15, cz: 0.42, hz: -0.42, rc: 0.72, rh: 0.68, fz: 0.48, bz: -0.5, fw: 0.36, bw: 0.36, fr: 0.17, br: 0.18, foot: 0.04, hoof: 1 };
M.hoof = new THREE.MeshStandardMaterial({ color: new THREE.Color(c).multiplyScalar(0.8).getHex(), roughness: 0.9 });
wgTorso(g, M, o);
wgLegs(g, M, o);
wgHead(g, M, "elephant", wgV(0, 1.62, 1.02), 0.42);
wgTube(g, M.fur, [wgV(0, 1.4, -1.05), wgV(0, 1.0, -1.18), wgV(0, 0.7, -1.2)], 0.04, 0.02, 12, 8);
if (/war|armou?r/.test(P.name.toLowerCase() + " " + P.about.toLowerCase())) {
var cl = new THREE.MeshStandardMaterial({ color: 0x8A1E22, roughness: 0.85, side: THREE.DoubleSide });
var cap = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.86, 1.1, 32, 1, true, Math.PI * 0.28, Math.PI * 1.44), cl);
cap.rotation.x = Math.PI / 2;
cap.position.set(0, 1.32, -0.02);
cap.scale.set(1, 1, 0.9);
g.add(cap);
[-1, 1].forEach(function (sd) { for (var f = 0; f < 12; f++)
wgEl(g, M.gold, 0.04, 1, 1, 1, sd * 0.68, 0.78, -0.5 + f / 11 * 1.0, 8); });
var pl = wgEl(g, M.steel, 0.3, 1, 1.1, 0.25, 0, 1.75, 1.36, 20);
pl.rotation.x = -0.3;
}
return { g: g };
},
function (c) {
var M = wgMats(c), g = new THREE.Group(), o = { y: 1.15, cz: 0.42, hz: -0.42, rc: 0.72, rh: 0.66, fz: 0.48, bz: -0.5, fw: 0.36, bw: 0.36, fr: 0.18, br: 0.19, foot: 0.04, hoof: 1 };
var hair = new THREE.MeshStandardMaterial({ color: new THREE.Color(c).multiplyScalar(0.7).getHex(), roughness: 1 });
M.hoof = hair;
wgTorso(g, M, o);
wgLegs(g, M, o);
wgEl(g, M.fur, 0.6, 0.9, 0.8, 1, 0, 1.8, 0.3, 28);
for (var i = 0; i < 40; i++) {
var a = (i % 20) / 19 * Math.PI * 1.3 - Math.PI * 0.65, z = -0.85 + Math.floor(i / 20) * 0.0 + (i % 20) / 19 * 1.7, s = i < 20 ? 1 : -1;
var hk = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.62, 8), hair);
hk.position.set(s * 0.62, 0.72, -0.8 + (i % 20) * 0.085);
hk.rotation.set(Math.PI, 0, s * 0.18);
g.add(hk);
}
wgHead(g, M, "elephant", wgV(0, 1.72, 1.02), 0.42, { mammoth: 1, hair: hair });
wgTube(g, hair, [wgV(0, 1.4, -1.05), wgV(0, 1.05, -1.18), wgV(0, 0.8, -1.2)], 0.05, 0.03, 12, 8);
return { g: g };
},
function (c) {
var M = wgMats(c), g = new THREE.Group(), o = { y: 0.88, cz: 0.4, hz: -0.42, rc: 0.36, rh: 0.32, fz: 0.48, bz: -0.5, fw: 0.19, bw: 0.2, fr: 0.08, br: 0.09, foot: 0.02, claws: 1 };
wgTorso(g, M, o);
wgLegs(g, M, o);
[-1, 0, 1].forEach(function (k) {
var b = wgV(k * 0.24, 1.32, 0.95 + (k ? -0.06 : 0.04));
wgSeg(g, M.fur, wgV(k * 0.12, 1.02, 0.58), b, 0.17, 0.13);
var h = wgHead(g, M, "dog", b.clone().add(wgV(0, 0.04, 0.1)), 0.2);
h.rotation.y = k * 0.35;
});
wgTube(g, M.fur, [wgV(0, 1.0, -0.72), wgV(0, 1.2, -0.95), wgV(0, 1.1, -1.2)], 0.06, 0.02, 16, 8);
return { g: g };
},
function (c) {
var M = wgMats(c), g = new THREE.Group(), o = { y: 0.72, cz: 0.36, hz: -0.36, rc: 0.3, rh: 0.28, fz: 0.42, bz: -0.42, fw: 0.15, bw: 0.16, fr: 0.06, br: 0.07, foot: 0.02 };
wgTorso(g, M, o);
wgLegs(g, M, o);
wgSeg(g, M.fur, wgV(0, 0.85, 0.52), wgV(0, 1.08, 0.78), 0.18, 0.13);
wgHead(g, M, "fox", wgV(0, 1.13, 0.88), 0.2);
for (var t = 0; t < 9; t++) {
var a = (t - 4) / 4 * 0.9, p = [wgV(0, 0.82, -0.6)], tip = wgV(Math.sin(a) * 0.7, 0.82 + Math.cos(a) * 0.55 + 0.35, -1.05 - Math.cos(a) * 0.2);
p.push(wgV(Math.sin(a) * 0.25, 0.95, -0.85));
p.push(wgV(Math.sin(a) * 0.5, 1.1 + Math.cos(a) * 0.3, -1.05));
p.push(tip);
wgTube(g, M.fur, p, 0.06, 0.14, 20, 10);
wgEl(g, M.light, 0.13, 1, 1, 1.4, tip.x, tip.y + 0.04, tip.z - 0.02, 12);
}
return { g: g };
},
function (c, P, eagleBody) {
var M = wgMats(c), g = new THREE.Group(), o = { y: 0.86, cz: 0.4, hz: -0.42, rc: 0.36, rh: 0.34, fz: 0.5, bz: -0.5, fw: 0.19, bw: 0.2, fr: 0.08, br: 0.09, foot: 0.02, claws: 1 };
var white = new THREE.MeshStandardMaterial({ color: 0xF4F0E6, roughness: 0.85 });
wgTorso(g, M, o);
wgLegs(g, M, o);
wgEl(g, white, 0.32, 0.9, 1, 1, 0, 1.05, 0.52, 24);
wgSeg(g, white, wgV(0, 1.1, 0.62), wgV(0, 1.38, 0.88), 0.24, 0.17);
wgHead(g, M, "eagle", wgV(0, 1.48, 0.98), 0.22, { head: white });
wgWingPair(g, 1.2, 0.16, 1.12, 0.28, function () { return wgWing(1.2, c, new THREE.Color(c).multiplyScalar(0.72).getHex()); });
wgTube(g, M.fur, [wgV(0, 0.95, -0.78), wgV(0, 0.7, -1.05), wgV(0, 0.48, -1.2), wgV(0, 0.55, -1.4)], 0.05, 0.03, 20, 8);
wgEl(g, M.fur, 0.08, 1, 1, 1.4, 0, 0.56, -1.44, 12);
return { g: g };
},
function (c) {
var M = wgMats(c), g = new THREE.Group(), o = { y: 1.02, cz: 0.42, hz: -0.42, rc: 0.38, rh: 0.36, fz: 0.5, bz: -0.5, fw: 0.18, bw: 0.19, fr: 0.07, br: 0.08, foot: 0.1, hoof: 1 };
wgTorso(g, M, o);
wgLegs(g, M, o);
var head = new THREE.MeshStandardMaterial({ color: new THREE.Color(c).lerp(new THREE.Color(0xFFFFFF), 0.35).getHex(), roughness: 0.85 });
wgSeg(g, head, wgV(0, 1.2, 0.62), wgV(0, 1.6, 0.92), 0.24, 0.17);
wgHead(g, M, "eagle", wgV(0, 1.7, 1.02), 0.22, { head: head });
wgWingPair(g, 1.25, 0.16, 1.32, 0.3, function () { return wgWing(1.25, head.color.getHex(), c); });
wgTube(g, head, [wgV(0, 1.2, -0.8), wgV(0, 0.95, -1.0), wgV(0, 0.6, -1.08)], 0.08, 0.05, 16, 10);
return { g: g };
},
function (c) {
var M = wgMats(c), g = new THREE.Group(), o = { y: 0.86, cz: 0.4, hz: -0.42, rc: 0.38, rh: 0.34, fz: 0.5, bz: -0.5, fw: 0.2, bw: 0.21, fr: 0.085, br: 0.095, foot: 0.02, claws: 1 };
wgTorso(g, M, o);
wgLegs(g, M, o);
var mane = new THREE.MeshStandardMaterial({ color: new THREE.Color(c).multiplyScalar(0.55).getHex(), roughness: 0.95 });
wgSeg(g, mane, wgV(0, 1.02, 0.6), wgV(0, 1.25, 0.86), 0.26, 0.2);
wgHead(g, M, "cat", wgV(0, 1.3, 0.98), 0.27, { mane: mane });
wgWingPair(g, 1.25, 0.16, 1.12, 0.28, function () { return wgBatWing(1.25, new THREE.Color(c).multiplyScalar(0.5).getHex(), new THREE.Color(c).lerp(new THREE.Color(0x203030), 0.3).getHex()); });
var seg = [wgV(0, 0.95, -0.72), wgV(0, 1.3, -1.0), wgV(0, 1.75, -0.95), wgV(0, 1.95, -0.6), wgV(0, 1.85, -0.3)];
wgTube(g, mane, seg, 0.09, 0.05, 30, 10);
var st = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.28, 10), M.horn);
st.position.copy(seg[4]).add(wgV(0, -0.1, 0.08));
st.rotation.x = 2.4;
g.add(st);
return { g: g };
},
function (c) {
var M = wgMats(c), g = new THREE.Group(), white = new THREE.MeshStandardMaterial({ color: 0xF4F0E6, roughness: 0.85 });
wgEl(g, M.fur, 0.55, 0.85, 0.8, 1.35, 0, 1.0, 0, 32);
wgEl(g, M.light, 0.45, 0.8, 0.7, 1.1, 0, 0.82, 0.22, 24);
wgSeg(g, white, wgV(0, 1.15, 0.6), wgV(0, 1.48, 0.86), 0.26, 0.2);
wgHead(g, M, "eagle", wgV(0, 1.56, 0.96), 0.24, { head: white });
for (var t = 0; t < 9; t++) {
var a = (t - 4) / 4 * 0.55, f = wgEl(g, M.fur, 0.32, 0.28, 0.06, 1, Math.sin(a) * 0.35, 0.95, -0.95 - Math.cos(a) * 0.2, 12);
f.rotation.y = a;
}
[-1, 1].forEach(function (s) {
wgEl(g, M.fur, 0.2, 0.8, 1.1, 0.9, s * 0.24, 0.62, 0.05, 16);
var ft = new THREE.Group();
ft.position.set(s * 0.24, 0, 0.15);
g.add(ft);
wgSeg(ft, M.beak, wgV(0, 0.5, -0.05), wgV(0, 0.06, 0.02), 0.06, 0.05);
[-0.45, 0, 0.45].forEach(function (a) {
wgSeg(ft, M.beak, wgV(0, 0.05, 0.02), wgV(Math.sin(a) * 0.18, 0.03, Math.cos(a) * 0.2), 0.03, 0.025);
var cl = new THREE.Mesh(new THREE.ConeGeometry(0.025, 0.09, 8), M.dark);
cl.position.set(Math.sin(a) * 0.22, 0.02, Math.cos(a) * 0.24);
cl.rotation.x = Math.PI / 2 + 0.5;
ft.add(cl);
});
});
wgWingPair(g, 1.5, 0.32, 1.22, 0.15, function () { return wgWing(1.5, c, new THREE.Color(c).multiplyScalar(0.7).getHex()); });
return { g: g };
},
function (c) {
var M = wgMats(c), g = new THREE.Group();
var body = [wgV(0, 1.95, 0.35), wgV(0, 1.75, 0.12), wgV(0, 1.4, 0.12), wgV(0, 1.0, 0.22), wgV(0, 0.62, 0.12), wgV(0, 0.4, -0.15), wgV(0, 0.38, -0.42), wgV(0, 0.56, -0.5), wgV(0, 0.62, -0.33), wgV(0, 0.5, -0.26)];
wgTube(g, M.fur, body.slice(0, 6), 0.26, 0.17, 40, 18);
wgTube(g, M.fur, body.slice(5), 0.17, 0.04, 30, 12);
wgEl(g, M.fur, 0.25, 0.85, 0.9, 1.05, 0, 2.02, 0.4, 24);
wgSeg(g, M.fur, wgV(0, 1.98, 0.55), wgV(0, 1.86, 0.98), 0.11, 0.06);
wgEyes(g, M, 0.17, 2.06, 0.5, 0.06, 0.9);
var ridge = new THREE.MeshStandardMaterial({ color: new THREE.Color(c).multiplyScalar(0.7).getHex(), roughness: 0.7 });
for (var i = 0; i < 14; i++) {
var t = i / 13, p = new THREE.CatmullRomCurve3(body).getPointAt(t * 0.92), r = 0.27 - 0.21 * t, ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.018, 6, 24), ridge);
ring.position.copy(p);
ring.rotation.x = Math.PI / 2 + 0.3;
g.add(ring);
}
for (var k = 0; k < 5; k++) {
var sp = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.14, 6), ridge);
sp.position.set(Math.cos(k * 1.25) * 0.08, 2.27, 0.36 + Math.sin(k * 1.25) * 0.08);
g.add(sp);
}
var fs = new THREE.Shape();
fs.moveTo(0, 0);
fs.quadraticCurveTo(-0.35, 0.15, -0.32, 0.5);
fs.lineTo(0, 0.55);
fs.lineTo(0, 0);
var fin = new THREE.Mesh(new THREE.ShapeGeometry(fs, 8), new THREE.MeshStandardMaterial({ color: new THREE.Color(c).lerp(new THREE.Color(0xFFFFFF), 0.5).getHex(), roughness: 0.5, transparent: true, opacity: 0.85, side: THREE.DoubleSide }));
fin.rotation.y = Math.PI / 2;
fin.position.set(0, 0.9, -0.12);
g.add(fin);
return { g: g };
},
function (c) {
var M = wgMats(c), g = new THREE.Group(), skin = new THREE.MeshStandardMaterial({ color: 0x8A8668, roughness: 0.85 });
var sh = new THREE.Mesh(new THREE.SphereGeometry(0.62, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2), M.fur);
sh.scale.set(1, 0.72, 1.25);
sh.position.y = 0.32;
g.add(sh);
var rim = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.05, 8, 40), M.fur);
rim.rotation.x = Math.PI / 2;
rim.scale.set(1, 1.25, 1);
rim.position.y = 0.33;
g.add(rim);
var pl = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.08, 32), new THREE.MeshStandardMaterial({ color: 0xD8C890, roughness: 0.8 }));
pl.scale.z = 1.2;
pl.position.y = 0.3;
g.add(pl);
[[1, 0.5], [1, -0.5]].forEach(function (L) { [-1, 1].forEach(function (s) { wgSeg(g, skin, wgV(s * 0.42, 0.3, L[1] * 0.95), wgV(s * 0.62, 0.08, L[1] * 1.05), 0.14, 0.12); wgEl(g, skin, 0.14, 1.1, 0.5, 1.2, s * 0.63, 0.05, L[1] * 1.07, 12); }); });
wgSeg(g, skin, wgV(0, 0.32, 0.65), wgV(0, 0.42, 0.95), 0.13, 0.11);
var hd = wgEl(g, skin, 0.15, 0.95, 0.85, 1.25, 0, 0.45, 1.05, 20);
wgEyes(g, M, 0.1, 0.5, 1.12, 0.035, 1.0);
wgEl(g, skin, 0.05, 1, 0.6, 1.4, 0, 0.28, -0.8, 10);
return { g: g, mark: wgScutes };
},
function (c) {
var M = wgMats(c), g = new THREE.Group();
wgEl(g, M.fur, 0.62, 1.2, 0.55, 0.95, 0, 0.66, 0, 32);
wgEl(g, M.light, 0.55, 1.15, 0.3, 0.9, 0, 0.5, 0, 24);
for (var i = 0; i < 4; i++)
[-1, 1].forEach(function (s) {
var z = 0.3 - i * 0.24, a = wgV(s * 0.62, 0.58, z), k = wgV(s * 1.0, 0.82, z * 1.5), f = wgV(s * 1.2, 0.03, z * 2.1);
wgSeg(g, M.fur, a, k, 0.08, 0.065);
wgSeg(g, M.fur, k, f, 0.065, 0.025);
});
[-1, 1].forEach(function (s) {
var a = wgV(s * 0.45, 0.62, 0.4), e = wgV(s * 0.7, 0.68, 0.75), w = wgV(s * 0.55, 0.7, 1.05);
wgSeg(g, M.fur, a, e, 0.08, 0.07);
wgSeg(g, M.fur, e, w, 0.07, 0.09);
wgEl(g, M.fur, 0.2, 0.75, 0.6, 1.1, s * 0.5, 0.7, 1.25, 20);
var p1 = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.32, 10), M.fur);
p1.position.set(s * 0.48, 0.74, 1.5);
p1.rotation.x = Math.PI / 2 - 0.2;
g.add(p1);
var p2 = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.26, 10), M.fur);
p2.position.set(s * 0.48, 0.6, 1.48);
p2.rotation.x = Math.PI / 2 + 0.25;
g.add(p2);
wgSeg(g, M.fur, wgV(s * 0.12, 0.8, 0.42), wgV(s * 0.15, 1.0, 0.5), 0.025, 0.02);
wgEl(g, M.eye, 0.05, 1, 1, 1, s * 0.15, 1.03, 0.51, 12);
});
return { g: g };
},
function (c) {
var M = wgMats(c), g = new THREE.Group();
wgEl(g, M.fur, 0.4, 1, 0.42, 1, 0, 0.45, 0.42, 28);
for (var i = 0; i < 6; i++)
wgEl(g, M.fur, 0.38 - i * 0.02, 1, 0.5, 0.45, 0, 0.45, 0.05 - i * 0.2, 24);
for (var j = 0; j < 4; j++)
[-1, 1].forEach(function (s) {
var z = 0.38 - j * 0.22, a = wgV(s * 0.3, 0.45, z), k = wgV(s * 0.7, 0.68, z * 1.4), f = wgV(s * 0.95, 0.02, z * 1.9 - 0.1);
wgSeg(g, M.fur, a, k, 0.05, 0.04);
wgSeg(g, M.fur, k, f, 0.04, 0.015);
});
[-1, 1].forEach(function (s) {
var a = wgV(s * 0.25, 0.45, 0.7), e = wgV(s * 0.55, 0.5, 1.0), w = wgV(s * 0.42, 0.5, 1.3);
wgSeg(g, M.fur, a, e, 0.07, 0.06);
wgSeg(g, M.fur, e, w, 0.06, 0.08);
wgEl(g, M.fur, 0.15, 0.8, 0.6, 1.3, s * 0.42, 0.5, 1.45, 16);
var p = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.25, 8), M.fur);
p.position.set(s * 0.36, 0.5, 1.68);
p.rotation.x = Math.PI / 2;
g.add(p);
});
var tail = [];
for (var t = 0; t <= 6; t++) {
var a = t / 6 * Math.PI * 0.95;
tail.push(wgV(0, 0.45 + Math.sin(a) * 0.95, -1.0 - Math.sin(a * 0.5) * 0.35 + (t / 6) * 0.85));
}
wgTube(g, M.fur, tail, 0.15, 0.08, 36, 14);
for (var u = 1; u < 6; u++) {
var c2 = new THREE.CatmullRomCurve3(tail).getPointAt(u / 6), rg = new THREE.Mesh(new THREE.TorusGeometry(0.15 - u * 0.012, 0.022, 6, 20), M.fur);
rg.position.copy(c2);
rg.lookAt(new THREE.CatmullRomCurve3(tail).getPointAt(Math.min(1, u / 6 + 0.02)));
g.add(rg);
}
var tp = tail[6];
wgEl(g, M.fur, 0.14, 1, 0.85, 1.3, tp.x, tp.y - 0.05, tp.z, 16);
var sting = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.26, 10), M.dark);
sting.position.set(tp.x, tp.y - 0.15, tp.z + 0.18);
sting.rotation.x = 2.3;
g.add(sting);
wgEyes(g, M, 0.08, 0.62, 0.72, 0.04, 0.3);
return { g: g };
},
function (root, moving) {
root.updateMatrixWorld(true);
var keep = [root].concat(moving || []), B = [], drop = [];
root.traverse(function (m) {
if (!m.isMesh || m.isSkinnedMesh || m.isInstancedMesh || m.material.transparent)
return;
var a = m.parent;
while (a && keep.indexOf(a) < 0)
a = a.parent;
if (!a)
return;
var b = null;
for (var i = 0; i < B.length; i++)
if (B[i].a === a && B[i].mat === m.material) {
b = B[i];
break;
}
if (!b) {
b = { a: a, mat: m.material, list: [] };
B.push(b);
}
var g = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone();
g.applyMatrix4(new THREE.Matrix4().copy(a.matrixWorld).invert().multiply(m.matrixWorld));
b.list.push(g);
drop.push(m);
});
drop.forEach(function (m) { m.parent.remove(m); });
B.forEach(function (b) {
var n = 0, col = b.list.every(function (g) { return !!g.attributes.color; });
b.list.forEach(function (g) { n += g.attributes.position.count; });
var pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), uv = new Float32Array(n * 2), c = col ? new Float32Array(n * 3) : null, o = 0;
b.list.forEach(function (g) {
var P = g.attributes.position, N = g.attributes.normal, U = g.attributes.uv, k = P.count;
pos.set(P.array.subarray(0, k * 3), o * 3);
if (N)
nor.set(N.array.subarray(0, k * 3), o * 3);
if (U)
uv.set(U.array.subarray(0, k * 2), o * 2);
if (c)
c.set(g.attributes.color.array.subarray(0, k * 3), o * 3);
o += k;
g.dispose();
});
var G = new THREE.BufferGeometry();
G.setAttribute("position", new THREE.BufferAttribute(pos, 3));
G.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
G.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
if (c)
G.setAttribute("color", new THREE.BufferAttribute(c, 3));
G.computeBoundingSphere();
var M = new THREE.Mesh(G, b.mat);
b.a.add(M);
});
},
function (arch) {
if (WG_MADE[arch] !== undefined)
return WG_MADE[arch];
var o = CREATURE[arch], P = null;
for (var k in WGEAR.byKey) {
var p = WGEAR.byKey[k];
if (p.use === "mount" && p.x.arch === arch) {
P = p;
break;
}
}
var B = o && WG_BEAST[o.wgBase];
if (!B || !P)
return (WG_MADE[arch] = null);
try {
var r = B(o.col, P);
r.g.updateMatrixWorld(true);
var bb = new THREE.Box3().setFromObject(r.g);
wgCoat(r.g, o.col, Math.max(0.5, bb.max.y), r.mark);
wgBake(r.g);
r.g.traverse(function (m) { if (m.isMesh) {
m.castShadow = true;
m.receiveShadow = true;
m.userData.model = 1;
} });
return (WG_MADE[arch] = { scene: r.g });
}
catch (e) {
if (window.console)
console.warn("[wg] beast", arch, e);
return (WG_MADE[arch] = null);
}
},
function (col, kind) {
var key = col + "|" + kind;
if (WG_WTEX[key])
return WG_WTEX[key];
var c = document.createElement("canvas");
c.width = c.height = 256;
var x = c.getContext("2d"), base = new THREE.Color(col), lt = base.clone().lerp(new THREE.Color(0xFFFFFF), 0.55), dk = base.clone().multiplyScalar(0.45);
var g = x.createRadialGradient(0, 128, 10, 0, 128, 270);
g.addColorStop(0, "#" + dk.getHexString());
g.addColorStop(0.45, "#" + base.getHexString());
g.addColorStop(1, "#" + lt.getHexString());
x.fillStyle = g;
x.fillRect(0, 0, 256, 256);
x.strokeStyle = kind === "glass" ? "rgba(255,255,255,0.75)" : "#" + dk.getHexString();
x.lineWidth = kind === "glass" ? 1.5 : 3;
for (var i = 0; i < 7; i++) {
var a = -0.9 + i * 0.3;
x.beginPath();
x.moveTo(0, 128);
x.quadraticCurveTo(110, 128 + Math.sin(a) * 60, 256, 128 + Math.sin(a) * 190);
x.stroke();
}
if (kind === "glass") {
for (var j = 0; j < 40; j++) {
x.beginPath();
var u = 30 + ((j * 53) % 220), v = 20 + ((j * 97) % 220);
x.moveTo(u, v);
x.lineTo(u + 12, v + ((j % 3) - 1) * 10);
x.stroke();
}
}
else {
x.fillStyle = "#" + dk.getHexString();
x.beginPath();
x.arc(165, 128, 34, 0, 7);
x.fill();
x.fillStyle = "#" + lt.getHexString();
x.beginPath();
x.arc(165, 128, 22, 0, 7);
x.fill();
x.fillStyle = "#" + dk.getHexString();
x.beginPath();
x.arc(168, 124, 10, 0, 7);
x.fill();
x.fillStyle = "#FFFFFF";
x.beginPath();
x.arc(164, 120, 3, 0, 7);
x.fill();
x.lineWidth = 7;
x.strokeStyle = "#" + dk.getHexString();
x.strokeRect(-4, -4, 264, 264);
}
var t = new THREE.CanvasTexture(c);
t.colorSpace = THREE.SRGBColorSpace;
return (WG_WTEX[key] = t);
},
function (par, mat, w, d, shape, side, rot) {
var sh = new THREE.Shape();
if (shape === "fore") {
sh.moveTo(0, -d * 0.1);
sh.bezierCurveTo(w * 0.3, d * 0.7, w * 0.85, d * 0.75, w, d * 0.35);
sh.bezierCurveTo(w * 0.95, -d * 0.35, w * 0.5, -d * 0.55, 0, -d * 0.25);
}
else if (shape === "hind") {
sh.moveTo(0, 0);
sh.bezierCurveTo(w * 0.4, d * 0.3, w * 0.95, d * 0.1, w * 0.85, -d * 0.5);
sh.bezierCurveTo(w * 0.6, -d * 0.9, w * 0.2, -d * 0.7, 0, -d * 0.3);
}
else {
sh.moveTo(0, d * 0.06);
sh.bezierCurveTo(w * 0.4, d * 0.3, w * 0.95, d * 0.25, w, 0);
sh.bezierCurveTo(w * 0.9, -d * 0.25, w * 0.4, -d * 0.25, 0, -d * 0.06);
}
var geo = new THREE.ShapeGeometry(sh, 14), uv = geo.attributes.uv, P = geo.attributes.position;
for (var i = 0; i < P.count; i++)
uv.setXY(i, P.getX(i) / w, 0.5 + P.getY(i) / (2 * d));
geo.rotateX(-Math.PI / 2);
var m = new THREE.Mesh(geo, mat);
m.rotation.y = rot || 0;
if (side < 0)
m.scale.x = -1;
par.add(m);
return m;
},
function (M, c) {
var b = new THREE.Group(), dk = new THREE.Color(c).multiplyScalar(0.5).getHex(), fz = wgFurMat(0.95), sk = new THREE.MeshStandardMaterial({ color: dk, roughness: 0.6 }), ce = new THREE.MeshStandardMaterial({ color: 0x140C18, roughness: 0.15, metalness: 0.3 }), tex = wgWingTex(c, "moth"), wm = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, map: tex, emissive: new THREE.Color(c), emissiveMap: tex, emissiveIntensity: 0.35, roughness: 0.8, side: THREE.DoubleSide });
wgEl(b, fz, 0.042, 1, 0.95, 1.25, 0, 0, 0.03, 16);
wgBlend(b, fz, [{ z: -0.06, y: -0.005, rx: 0.032, ry: 0.032, rz: 0.05 }, { z: -0.13, y: -0.012, rx: 0.024, ry: 0.024, rz: 0.05 }], { n: 18, rs: 14 });
wgEl(b, fz, 0.028, 1, 0.95, 1, 0, 0.005, 0.085, 12);
[-1, 1].forEach(function (s) {
wgEl(b, ce, 0.014, 1, 1.1, 1, s * 0.02, 0.01, 0.098, 10);
var ant = [wgV(s * 0.01, 0.03, 0.1), wgV(s * 0.05, 0.08, 0.14), wgV(s * 0.09, 0.11, 0.13)];
wgTube(b, sk, ant, 0.003, 0.002, 10, 5);
for (var k = 1; k < 7; k++) {
var t = k / 7, q = new THREE.CatmullRomCurve3(ant).getPointAt(t), br = new THREE.Mesh(new THREE.ConeGeometry(0.0025, 0.03 - t * 0.02, 4), sk);
br.position.copy(q);
br.rotation.set(0.5, 0, s * 1.2);
b.add(br);
}
for (var l = 0; l < 3; l++)
wgTube(b, sk, [wgV(s * 0.025, -0.02, 0.05 - l * 0.025), wgV(s * 0.055, -0.03, 0.055 - l * 0.03), wgV(s * 0.065, -0.06, 0.06 - l * 0.035)], 0.004, 0.002, 6, 5);
});
var wings = [];
[-1, 1].forEach(function (s) {
var h = new THREE.Group();
h.position.set(s * 0.025, 0.015, 0.02);
h.userData.side = s;
b.add(h);
wgLeaf(h, wm, 0.26, 0.13, "fore", s, s * 0.12);
var hw = wgLeaf(h, wm, 0.18, 0.11, "hind", s, -s * 0.3);
hw.position.set(0, -0.002, -0.04);
wings.push(h);
});
return { b: b, wings: wings, s: 1, flutter: 1 };
},
function (M, c) {
var b = new THREE.Group(), glow = new THREE.MeshStandardMaterial({ color: c, emissive: new THREE.Color(c), emissiveIntensity: 0.9, roughness: 0.4 }), core = new THREE.MeshStandardMaterial({ color: 0xFFF6DC, emissive: 0xFFF0C8, emissiveIntensity: 1, roughness: 0.3 }), gold = M.gold, glass = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.28, roughness: 0.05, metalness: 0.1, emissive: new THREE.Color(c), emissiveIntensity: 0.25, depthWrite: false }), tex = wgWingTex(c, "glass"), wm = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, map: tex, transparent: true, opacity: 0.6, emissive: new THREE.Color(c), emissiveIntensity: 0.45, side: THREE.DoubleSide, depthWrite: false });
wgEl(b, glow, 0.075, 1, 1.12, 1, 0, 0, 0, 24);
wgEl(b, core, 0.042, 1, 1, 1, 0, 0.005, 0.03, 16);
wgEl(b, glass, 0.1, 1, 1.15, 1, 0, 0, 0, 24);
var top = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.07, 0.04, 16), gold);
top.position.y = 0.115;
b.add(top);
var knob = new THREE.Mesh(new THREE.TorusGeometry(0.025, 0.006, 8, 16), gold);
knob.position.y = 0.155;
b.add(knob);
var bot = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.03, 0.03, 16), gold);
bot.position.y = -0.12;
b.add(bot);
for (var k = 0; k < 4; k++) {
var a = k / 4 * Math.PI * 2 + Math.PI / 4;
wgTube(b, gold, [wgV(Math.cos(a) * 0.068, 0.1, Math.sin(a) * 0.068), wgV(Math.cos(a) * 0.1, 0, Math.sin(a) * 0.1), wgV(Math.cos(a) * 0.058, -0.11, Math.sin(a) * 0.058)], 0.004, 0.004, 10, 5);
}
[-1, 1].forEach(function (s) { wgEl(b, M.eye, 0.012, 1, 1.3, 0.6, s * 0.025, 0.02, 0.07, 10); wgEl(b, M.shine, 0.004, 1, 1, 1, s * 0.025 - 0.003, 0.027, 0.077, 6); });
wgTube(b, M.dark, [wgV(-0.015, -0.012, 0.072), wgV(0, -0.02, 0.075), wgV(0.015, -0.012, 0.072)], 0.003, 0.003, 8, 5);
var halo = new THREE.Mesh(new THREE.RingGeometry(0.12, 0.135, 32), new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.45, side: THREE.DoubleSide }));
halo.rotation.x = Math.PI / 2;
halo.position.y = 0.19;
b.add(halo);
var wings = [];
[-1, 1].forEach(function (s) {
var h = new THREE.Group();
h.position.set(s * 0.07, 0.05, -0.03);
h.userData.side = s;
b.add(h);
wgLeaf(h, wm, 0.17, 0.05, "dragon", s, s * 0.25);
var w2 = wgLeaf(h, wm, 0.14, 0.045, "dragon", s, -s * 0.2);
w2.position.set(0, -0.01, -0.03);
wings.push(h);
});
return { b: b, wings: wings, s: 1, flutter: 1, glow: glow };
},
function (M) {
var b = new THREE.Group(), legs = [], o = { y: 0.88, cz: 0.38, hz: -0.4, rc: 0.33, rh: 0.3, fz: 0.45, bz: -0.45, fw: 0.17, bw: 0.18, fr: 0.075, br: 0.085, foot: 0.02, hips: legs };
wgTorso(b, M, o);
wgLegs(b, M, o);
wgEl(b, M.light, 0.2, 0.75, 0.8, 1.0, 0, 0.84, 0.52, 20);
wgSeg(b, M.fur, wgV(0, 1.0, 0.55), wgV(0, 1.25, 0.82), 0.17, 0.13);
wgHead(b, M, "dog", wgV(0, 1.3, 0.92), 0.21);
var tl = wgPetTail(b, M, wgV(0, 1.0, -0.7), [wgV(0, 1.0, -0.7), wgV(0, 1.2, -0.88), wgV(0, 1.42, -0.92)], 0.06, 0.035);
return { b: b, legs: legs, tail: tl, s: 0.5 };
},
function (M) {
var b = new THREE.Group(), legs = [], o = { y: 0.62, cz: 0.3, hz: -0.3, rc: 0.24, rh: 0.23, fz: 0.35, bz: -0.35, fw: 0.12, bw: 0.13, fr: 0.05, br: 0.06, foot: 0.02, hips: legs };
wgTorso(b, M, o);
wgLegs(b, M, o);
wgSeg(b, M.fur, wgV(0, 0.72, 0.45), wgV(0, 0.88, 0.62), 0.13, 0.1);
wgHead(b, M, "cat", wgV(0, 0.93, 0.68), 0.18);
var tl = wgPetTail(b, M, wgV(0, 0.68, -0.55), [wgV(0, 0.68, -0.55), wgV(0, 0.62, -0.85), wgV(0, 0.9, -1.05), wgV(0, 1.15, -0.98)], 0.045, 0.03);
return { b: b, legs: legs, tail: tl, s: 0.48 };
},
function (M) {
var b = new THREE.Group(), legs = [], blk = new THREE.MeshStandardMaterial({ color: 0x221C18, roughness: 0.8 }), o = { y: 0.72, cz: 0.34, hz: -0.34, rc: 0.27, rh: 0.25, fz: 0.4, bz: -0.4, fw: 0.14, bw: 0.15, fr: 0.055, br: 0.065, foot: 0.02, hips: legs, pawMat: blk };
wgTorso(b, M, o);
wgLegs(b, M, o);
wgEl(b, M.light, 0.18, 0.8, 1.15, 0.7, 0, 0.7, 0.53, 18);
wgSeg(b, M.fur, wgV(0, 0.82, 0.5), wgV(0, 1.02, 0.72), 0.15, 0.12);
wgHead(b, M, "fox", wgV(0, 1.06, 0.8), 0.19);
var t = new THREE.Group();
t.position.set(0, 0.78, -0.6);
b.add(t);
wgBlend(t, M.fur, [{ z: -0.12, y: 0, rx: 0.1, ry: 0.1, rz: 0.18 }, { z: -0.4, y: -0.05, rx: 0.17, ry: 0.17, rz: 0.3 }, { z: -0.66, y: -0.07, rx: 0.15, ry: 0.15, rz: 0.22 }]);
wgEl(t, M.light, 0.11, 1, 1, 1.5, 0, -0.07, -0.84, 16);
t.rotation.x = -0.25;
return { b: b, legs: legs, tail: t, s: 0.45 };
},
function (M) {
var b = new THREE.Group(), legs = [], skin = new THREE.MeshStandardMaterial({ color: 0xC8A882, roughness: 0.8 }), sp = new THREE.MeshStandardMaterial({ color: 0x4A3A2C, roughness: 0.7 }), tip = new THREE.MeshStandardMaterial({ color: 0xE8DCC8, roughness: 0.7 });
wgEl(b, M.fur, 0.5, 1, 0.72, 1.15, 0, 0.4, 0, 28);
wgEl(b, skin, 0.36, 0.9, 0.6, 1.1, 0, 0.28, 0.12, 20);
wgEl(b, skin, 0.2, 0.9, 0.85, 1.3, 0, 0.32, 0.55, 16);
wgEl(b, M.nose, 0.05, 1, 1, 1, 0, 0.32, 0.8, 10);
wgEyes(b, M, 0.12, 0.42, 0.6, 0.04, 0.7);
for (var i = 0; i < 420; i++) {
var ny = 1 - (i + 0.5) / 420 * 1.55, rr = Math.sqrt(Math.max(0, 1 - ny * ny)), u = i * 2.39996, nx = rr * Math.cos(u), nz = rr * Math.sin(u);
if (nz > 0.55 - ny * 0.4 || ny < -0.35)
continue;
var p = wgV(nx * 0.5, 0.4 + ny * 0.36, nz * 0.575), q = new THREE.Mesh(new THREE.ConeGeometry(0.025, 0.2, 5), i % 4 ? sp : tip);
q.position.copy(p).addScaledVector(wgV(nx, ny, nz - 0.4).normalize(), 0.07);
q.quaternion.setFromUnitVectors(wgV(0, 1, 0), wgV(nx, ny + 0.2, nz - 0.5).normalize());
b.add(q);
}
var o = { y: 0.22, fz: 0.25, bz: -0.25, fw: 0.24, bw: 0.24, fr: 0.05, br: 0.05, foot: 0.02, hips: legs, pawMat: skin, claws: 1 };
wgLegs(b, { fur: skin, horn: M.horn }, o);
return { b: b, legs: legs, s: 0.3 };
},
function (M, c) {
var b = new THREE.Group(), face = new THREE.MeshStandardMaterial({ color: new THREE.Color(c).lerp(new THREE.Color(0xF4EEE4), 0.7).getHex(), roughness: 0.9 }), ye = new THREE.MeshStandardMaterial({ color: 0xF0C020, roughness: 0.2, emissive: 0x604000, emissiveIntensity: 0.3 });
wgEl(b, M.fur, 0.42, 1, 1.25, 0.95, 0, 0.6, 0, 28);
wgEl(b, face, 0.3, 1, 1.15, 0.6, 0, 0.52, 0.18, 20);
wgEl(b, M.fur, 0.32, 1.05, 0.95, 0.95, 0, 1.15, 0.02, 24);
wgEl(b, face, 0.25, 1.15, 1, 0.4, 0, 1.12, 0.2, 20);
[-1, 1].forEach(function (s) {
wgEl(b, ye, 0.085, 1, 1, 0.6, s * 0.11, 1.16, 0.3, 14);
wgEl(b, M.eye, 0.045, 1, 1, 0.6, s * 0.11, 1.16, 0.35, 10);
wgEl(b, M.shine, 0.014, 1, 1, 1, s * 0.1 + 0.015, 1.18, 0.38, 6);
var tf = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.18, 8), M.fur);
tf.position.set(s * 0.2, 1.42, 0.02);
tf.rotation.z = -s * 0.35;
b.add(tf);
[-0.3, 0, 0.3].forEach(function (a) { var cl = new THREE.Mesh(new THREE.ConeGeometry(0.02, 0.1, 6), M.dark); cl.position.set(s * 0.12 + Math.sin(a) * 0.05, 0.06, 0.12 + Math.cos(a) * 0.05); cl.rotation.x = Math.PI / 2 + 0.6; b.add(cl); });
});
wgTube(b, M.beak, [wgV(0, 1.1, 0.3), wgV(0, 1.05, 0.38), wgV(0, 0.98, 0.36)], 0.035, 0.008, 10, 8);
var wings = [];
[-1, 1].forEach(function (s) {
var h = new THREE.Group();
h.position.set(s * 0.36, 0.9, -0.02);
h.userData.side = s;
b.add(h);
var w = wgWing(0.6, c, new THREE.Color(c).multiplyScalar(0.7).getHex());
w.rotation.z = -1.25 * s;
w.position.y = 0.05;
if (s < 0)
w.scale.x = -1;
h.add(w);
wings.push(h);
});
return { b: b, wings: wings, s: 0.32, mark: function (v) { return v.y > 0.3 && v.y < 0.9 && Math.sin(v.y * 48) > 0.6 ? 0.72 : 1; } };
},
function (M, c) {
var b = new THREE.Group(), legs = [], bel = new THREE.MeshStandardMaterial({ color: new THREE.Color(c).lerp(new THREE.Color(0xE8D8A0), 0.55).getHex(), roughness: 0.7 }), o = { y: 0.5, cz: 0.25, hz: -0.25, rc: 0.27, rh: 0.25, fz: 0.32, bz: -0.3, fw: 0.17, bw: 0.18, fr: 0.06, br: 0.07, foot: 0.02, hips: legs, claws: 1 };
wgTorso(b, M, o);
wgLegs(b, M, o);
wgEl(b, bel, 0.22, 0.85, 0.7, 1.6, 0, 0.38, 0, 20);
wgSeg(b, M.fur, wgV(0, 0.62, 0.4), wgV(0, 0.9, 0.62), 0.14, 0.1);
wgEl(b, M.fur, 0.15, 0.95, 0.85, 1.2, 0, 0.95, 0.72, 18);
wgEl(b, M.fur, 0.1, 0.9, 0.7, 1.5, 0, 0.9, 0.92, 16);
wgEl(b, M.nose, 0.02, 1, 1, 1, 0.04, 0.93, 1.06, 6);
wgEl(b, M.nose, 0.02, 1, 1, 1, -0.04, 0.93, 1.06, 6);
wgEyes(b, M, 0.09, 1.0, 0.8, 0.035, 0.7);
[-1, 1].forEach(function (s) { wgTube(b, M.horn, [wgV(s * 0.07, 1.05, 0.68), wgV(s * 0.1, 1.13, 0.55), wgV(s * 0.11, 1.16, 0.42)], 0.03, 0.006, 10, 8); });
for (var r = 0; r < 6; r++) {
var sp = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.08, 6), bel);
sp.position.set(0, 0.82 - r * 0.02, 0.3 - r * 0.15);
b.add(sp);
}
var tl = wgPetTail(b, M, wgV(0, 0.5, -0.45), [wgV(0, 0.5, -0.45), wgV(0, 0.4, -0.75), wgV(0.1, 0.35, -1.05), wgV(0.05, 0.4, -1.3)], 0.1, 0.025);
var spade = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.14, 4), M.fur);
spade.position.set(0.05, -0.1, -0.88);
spade.rotation.x = -Math.PI / 2;
spade.scale.set(1, 1, 0.3);
tl.add(spade);
var wings = [];
[-1, 1].forEach(function (s) {
var h = new THREE.Group();
h.position.set(s * 0.18, 0.75, 0.15);
h.userData.side = s;
b.add(h);
var w = wgBatWing(0.7, new THREE.Color(c).multiplyScalar(0.6).getHex(), new THREE.Color(c).lerp(new THREE.Color(0xE8C890), 0.25).getHex());
w.rotation.z = 0.5 * s;
if (s < 0)
w.scale.x = -1;
h.add(w);
wings.push(h);
});
return { b: b, legs: legs, tail: tl, wings: wings, s: 0.32 };
}
];
});
