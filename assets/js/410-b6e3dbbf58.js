/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var BCN_PALETTE = ["#7FD8FF", "#FFD27A", "#FF7A9A", "#9CFF8A", "#C69CFF", "#FFFFFF", "#FF9A4A", "#4AE8C8", "#FF5A5A", "#6A8CFF"];
var BCN_PALETTE_NAMES = ["Sky blue", "Gold", "Rose", "Leaf green", "Violet", "White", "Amber", "Sea green", "Red", "Deep blue"];
var BCN_KID_NAMES = ["My spot", "Meeting point", "Home", "School", "Look here"];
var BCN_WHO = { all: "Everyone", members: "Members only", keeper: "Only me and the players I choose" };
var BCN_MOTION = { glow: "A slow glow (rises and falls over six seconds)", steady: "Steady", swirl: "A bright swirl (sparks turning slowly up round the beam)" };
var BCN_BRIGHT = { 1: "Soft", 2: "Medium", 3: "Bright" };
var BCN_WORLDS = { city: "Somnucor (the city)", land_hall: "The Hall of Doors", w_greenwold: "Greenwold", w_kidszone: "The Kids Zone",
w_family: "Family world", w_party: "Party Planet", w_battle: "The Battle World", w_race: "Race Planet", w_lounge: "Lawanda's Lounge",
w_neverland: "Neverland", w_sea: "The Endless Sea", w_underdark: "The Underdark", w_northpole: "The North Pole", w_ctale: "The Classic Tales",
land_underworld: "The Underworld", land_heavens: "The Heavens", land_depths: "The Depths", land_faerie: "Faerie", land_void: "The Void",
land_mirror: "The Mirror World", land_dead: "The Land of the Dead", land_frozen: "The Frozen Realm" };
function bcnHexOk(s) { return /^#[0-9A-Fa-f]{6}$/.test(String(s || "")); }
function bcnNum(v, lo, hi, d) { v = +v; return isFinite(v) ? Math.max(lo, Math.min(hi, v)) : d; }
function bcnOne(b) {
b = b || {};
return { id: String(b.id || ("b" + Date.now().toString(36) + Math.floor(Math.random() * 1e4))).replace(/[^a-z0-9]/gi, "").slice(0, 20) || "b1",
name: String(b.name || "Beacon").replace(/[<>]/g, "").trim().slice(0, 40) || "Beacon",
label: String(b.label == null ? "" : b.label).replace(/[<>]/g, "").trim().slice(0, 40),
on: b.on !== false,
world: /^[a-z0-9_]{1,40}$/.test(String(b.world || "")) ? String(b.world) : "city",
place: String(b.place || "").replace(/[<>]/g, "").slice(0, 60),
x: bcnNum(b.x, -100000, 100000, 0), y: bcnNum(b.y, -5000, 5000, 0), z: bcnNum(b.z, -100000, 100000, 0), lift: bcnNum(b.lift, 0, 400, 0),
color: bcnHexOk(b.color) ? String(b.color).toUpperCase() : "#7FD8FF",
bright: Math.round(bcnNum(b.bright, 1, 3, 2)), height: Math.round(bcnNum(b.height, 10, 800, 160)), width: bcnNum(b.width, 0.5, 16, 2.5),
motion: BCN_MOTION[b.motion] ? b.motion : "glow", who: BCN_WHO[b.who] ? b.who : "all",
to: (Array.isArray(b.to) ? b.to : []).filter(function (p) { return p && /^[0-9a-f-]{36}$/i.test(String(p.id || "")); }).slice(0, 60).map(function (p) { return { id: String(p.id).toLowerCase(), name: String(p.name || "A player").replace(/[<>]/g, "").slice(0, 40) }; }), fade: Math.round(bcnNum(b.fade, 0, 20000, 0)),
guide: b.guide !== false,
code: bcnCodeNorm(b.code), until: bcnUntilOk(b.until) };
}
function bcnCodeNorm(s) { return String(s == null ? "" : s).toUpperCase().replace(/[^A-Z0-9-]/g, "").slice(0, 24); }
function bcnUntilOk(s) { s = String(s == null ? "" : s).trim(); return s && isFinite(Date.parse(s)) ? new Date(Date.parse(s)).toISOString() : ""; }
function bcnOver(b) { return !!(b && b.until && Date.now() > Date.parse(b.until)); }
var BCN_SAMHAIN = { id: "samhain2026", name: "Samhain at the Temple", label: "🌙 Samhain at the Temple", on: true, world: "city", place: "The Temple of the Obsidian Moon",
lift: 0, color: "#C69CFF", bright: 3, height: 420, width: 5, motion: "swirl", who: "keeper", fade: 0, guide: true, code: "SAMHAIN", until: "2026-11-01T09:00:00Z" };
function bcnDefaults() { return { off: false, list: [] }; }
function bcnCleanCfg(c) {
c = (c && typeof c === "object") ? c : bcnDefaults();
var list = (Array.isArray(c.list) ? c.list : []).slice(0, 60);
if (!c.samhain2026 && !list.some(function (b) { return b && b.id === BCN_SAMHAIN.id; }))
list = list.concat([BCN_SAMHAIN]);
return { off: !!c.off, samhain2026: true, list: list.map(bcnOne) };
}
var BCN = { KEY: "somnu.beacon.mine", mine: undefined, others: [], young: false, seenAt: 0, seenKey: "", busy: false, root: null, objs: {},
geo: null, tex: null, glow: null, open: false, form: null, kform: null, msg: "", kmsg: "", warned: false, n: 0, lastKey: null, server: null };
var BCN_MAX = 24, BCN_MAX_LITE = 8;
function bcnLite() { return (typeof LITE !== "undefined" && LITE) || (typeof LOOK_PHONE !== "undefined" && LOOK_PHONE) || (typeof renderer !== "undefined" && renderer && renderer.xr && renderer.xr.isPresenting); }
function bcnSay(t) { if (typeof setStatus === "function")
try {
setStatus(t);
}
catch (e) { } }
function bcnE(s) { return typeof esc === "function" ? esc(s) : String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
function bcnSigned() { return typeof signedIn === "function" && signedIn(); }
function bcnKeeper() { try {
return typeof isKeeperNow === "function" && isKeeperNow();
}
catch (e) {
return false;
} }
function bcnMember() { try {
return bcnKeeper() || (typeof hasAccess === "function" && hasAccess());
}
catch (e) {
return false;
} }
function bcnWhere() {
try {
if (typeof store === "undefined" || store.inside)
return null;
if (typeof WLD !== "undefined" && WLD.on) {
var k = WLD.on;
if (k === "shuttle" || k === "mmin" || !WLD.w)
return null;
if (k === "surface")
k = "surface_" + ((typeof SF !== "undefined" && SF.k) || "x");
var W = WLD.w;
return { key: "w_" + String(k).replace(/[^a-z0-9_]/gi, "").toLowerCase(), name: W.name || (typeof BCN_WORLDS !== "undefined" && BCN_WORLDS["w_" + k]) || k, ox: W.base || 0, oz: 0,
ground: function (lx, lz) { try {
var h = W.ground ? W.ground(lx, lz, 0) : 0;
return (h == null || !isFinite(h)) ? 0 : h;
}
catch (e) {
return 0;
} } };
}
if (typeof walkMode !== "undefined" && !walkMode)
return null;
if (typeof MALL !== "undefined" && MALL && MALL.on)
return null;
if (typeof UG2 !== "undefined" && UG2 && UG2.on)
return null;
if (typeof undergroundSpot === "function" && undergroundSpot())
return null;
var tY = function (ox, oz) { return function (lx, lz) { try {
return typeof terrainY === "function" ? (terrainY(ox + lx, oz + lz) || 0) : 0;
}
catch (e) {
return 0;
} }; };
var here = store.here || 0;
if (!here)
return { key: "dream", name: "your own dream", ox: 0, oz: 0, ground: tY(0, 0), own: true };
var r = typeof realmById === "function" ? realmById(here) : null;
if (!r)
return null;
if (r.kind === "somnucor") {
if (typeof ATLC === "undefined" || !ATLC)
return null;
return { key: "city", name: "Somnucor", ox: ATLC.x, oz: ATLC.z, ground: tY(ATLC.x, ATLC.z) };
}
var o = (typeof LD !== "undefined" && LD && LD.rid === here) ? { x: LD.ox, z: LD.oz } : (r.grid && typeof blockOrigin === "function" ? blockOrigin(r.grid.bx, r.grid.bz) : { x: r.x0 || 0, z: 0 });
return { key: "land_" + String(r.kind).replace(/[^a-z0-9_]/gi, "").toLowerCase(), name: r.name || (typeof REALMS !== "undefined" && REALMS[r.kind] && REALMS[r.kind].name) || r.kind, ox: o.x, oz: o.z, ground: tY(o.x, o.z) };
}
catch (e) {
return null;
}
}
function bcnWorldName(k) { return __ZC(410, 0, this, arguments, new.target); }
function bcnHereSpot() {
var W = bcnWhere();
if (!W || typeof camera === "undefined")
return null;
var P = camera.position, lx = P.x - W.ox, lz = P.z - W.oz;
return { world: W.key, name: W.name, x: Math.round(lx * 10) / 10, z: Math.round(lz * 10) / 10, y: Math.round(W.ground(lx, lz) * 10) / 10 };
}
function bcnCfg() { var c = typeof cloudSetting === "function" ? cloudSetting("beacons") : null; return bcnCleanCfg(c); }
function bcnKeeperSees(b) {
if (!b.on || bcnOver(b))
return false;
var me = typeof myUserId === "function" ? String(myUserId() || "").toLowerCase() : "";
if (me && (b.to || []).some(function (p) { return p.id === me; }))
return true;
if (b.code)
return bcnKeeper() || bcnHasCode(b.code);
if (b.who === "keeper")
return bcnKeeper();
if (b.who === "members")
return bcnMember();
return true;
}
function bcnKeeperSpot(b, W) { return __ZC(410, 1, this, arguments, new.target); }
function bcnMine() {
if (BCN.mine === undefined) {
try {
BCN.mine = JSON.parse(localStorage.getItem(BCN.KEY) || "null");
}
catch (e) {
BCN.mine = null;
}
}
return BCN.mine;
}
function bcnKeepMine(m) { BCN.mine = m; try {
if (m)
localStorage.setItem(BCN.KEY, JSON.stringify(m));
else
localStorage.removeItem(BCN.KEY);
}
catch (e) { } }
function bcnSeen(force) {
var W = bcnWhere();
if (!W || W.own || !bcnSigned() || typeof cityRpc !== "function" || BCN.busy)
return;
if (!force && W.key === BCN.seenKey && Date.now() - BCN.seenAt < 45000)
return;
BCN.busy = true;
BCN.seenAt = Date.now();
var key = W.key;
cityRpc("beacons_seen", { p_world: key }).then(function (d) {
BCN.busy = false;
BCN.server = !!(d && d.ok);
if (!d || !d.ok)
return;
BCN.seenKey = key;
BCN.others = (d.others || []).slice(0, 40);
BCN.young = !!d.young;
if (d.mine)
bcnKeepMine({ world: d.mine.world, x: +d.mine.x, y: +d.mine.y, z: +d.mine.z, label: d.mine.label, color: d.mine.color, share: d.mine.share, at: d.mine.at });
else if (BCN.mine && BCN.mine.cloud)
bcnKeepMine(null);
if (BCN.open)
bcnPaint();
}, function () { BCN.busy = false; BCN.server = false; });
}
function bcnSet(f) { return __ZC(410, 2, this, arguments, new.target); }
function bcnClear() {
bcnKeepMine(null);
BCN.msg = "Your beacon is out.";
if (bcnSigned() && typeof cityRpc === "function")
cityRpc("beacon_clear", {}).catch(function () { });
bcnPaint();
}
function bcnGuide(world, lx, lz, name) { return __ZC(410, 3, this, arguments, new.target); }
function bcnGuideTick(W) {
if (typeof guideTo === "undefined" || !guideTo || !guideTo.bcn)
return;
if (!W || W.key !== guideTo.bcn) {
if (!store.inside)
guideTo = null;
return;
}
var P = camera.position;
if (Math.hypot(guideTo.x - P.x, guideTo.z - P.z) < 16) {
var n = guideTo.key;
guideTo = null;
bcnSay("<b>" + bcnE(n) + "</b>: you are here.");
}
}
function bcnKit() { return __ZC(410, 4, this, arguments, new.target); }
function bcnMat(map, col) { return new THREE.MeshBasicMaterial({ map: map, color: col, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, fog: false, side: THREE.DoubleSide, toneMapped: false }); }
function bcnLabel(text, col) { return __ZC(410, 5, this, arguments, new.target); }
function bcnBuild(o) { return __ZC(410, 6, this, arguments, new.target); }
function bcnDrop(id) {
var g = BCN.objs[id];
if (!g)
return;
if (g.parent)
g.parent.remove(g);
g.traverse(function (m) { if (m.material) {
if (m.material.map && m.material.map !== BCN.tex && m.material.map !== BCN.glow)
m.material.map.dispose();
m.material.dispose();
} });
delete BCN.objs[id];
}
function bcnList(W) {
var L = [], c = bcnCfg(), lite = bcnLite();
if (!c.off)
c.list.forEach(function (b) {
if (!bcnKeeperSees(b))
return;
var s = bcnKeeperSpot(b, W);
if (!s)
return;
L.push({ id: "k_" + b.id, x: s.x, z: s.z, y: s.y, lift: b.lift || s.lift || 0, color: b.color, height: b.height, width: b.width, bright: b.bright, glow: b.motion === "glow", swirl: b.motion === "swirl", fade: b.fade,
text: b.label, keeper: true, name: b.name, guide: b.guide });
});
var m = bcnMine();
if (m && m.world === W.key)
L.push({ id: "me", x: m.x, z: m.z, y: m.y, lift: 0, color: m.color, height: lite ? 90 : 120, width: 1.6, bright: 2, glow: true, fade: 0, text: "✨ " + m.label, mine: true, name: m.label });
if (W.key === BCN.seenKey)
(BCN.others || []).forEach(function (o) {
L.push({ id: "p_" + o.id, x: +o.x, z: +o.z, y: +o.y, lift: 0, color: BCN_PALETTE.indexOf(o.color) >= 0 ? o.color : BCN_PALETTE[0], height: lite ? 70 : 100, width: 1.3, bright: 2, glow: true, fade: 1500,
text: (o.name ? o.name.split(" ")[0] + ": " : "") + o.label, name: (o.name ? o.name + ": " : "") + o.label });
});
L.forEach(function (o) { o.sig = [o.color, o.text || "", o.swirl ? "s" : ""].join("|"); });
return L;
}
function bcnDraw(dt) {
BCN.n++;
if (typeof scene === "undefined" || typeof camera === "undefined" || typeof THREE === "undefined")
return;
var W = bcnWhere();
if (W && W.key !== BCN.lastKey) {
BCN.lastKey = W.key;
if (!W.own)
bcnSeen(true);
}
bcnGuideTick(W);
if (!BCN.root) {
BCN.root = new THREE.Group();
BCN.root.name = "beacons";
scene.add(BCN.root);
}
if (BCN.root.parent !== scene)
scene.add(BCN.root);
if (!W) {
BCN.root.visible = false;
return;
}
BCN.root.visible = true;
if (BCN.n % 300 === 0)
bcnSeen(false);
var P = camera.position, lite = bcnLite(), t = performance.now() / 1000, keep = {};
var L = bcnList(W).map(function (o) { var ax = W.ox + o.x, az = W.oz + o.z; o.ax = ax; o.az = az; o.d = Math.hypot(ax - P.x, az - P.z); return o; })
.filter(function (o) { return !(o.fade > 0 && o.d > o.fade); })
.sort(function (a, b) { return (b.mine ? 1 : 0) - (a.mine ? 1 : 0) || a.d - b.d; }).slice(0, lite ? BCN_MAX_LITE : BCN_MAX);
BCN.shown = L.length;
L.forEach(function (o, i) {
keep[o.id] = 1;
var g = BCN.objs[o.id];
if (g && g.userData.sig !== o.sig) {
bcnDrop(o.id);
g = null;
}
if (!g) {
g = bcnBuild(o);
BCN.root.add(g);
BCN.objs[o.id] = g;
}
var U = g.userData, gy = W.ground(o.x, o.z);
g.position.set(o.ax, gy + (o.lift || 0), o.az);
var face = Math.atan2(P.x - o.ax, P.z - o.az);
U.halo.rotation.y = U.core.rotation.y = face;
var w = o.width, h = o.height;
U.halo.scale.set(Math.max(w * 3.2, o.d * 0.022), h, 1);
U.core.scale.set(Math.max(w * 0.9, o.d * 0.007), h * 0.97, 1);
U.foot.scale.set(w * 5, 1, w * 5);
var fs = Math.max(w * 3, o.d * 0.03);
U.flare.scale.set(fs, fs, 1);
U.flare.position.y = Math.min(1.2, w * 0.4);
var k = [0, 0.42, 0.66, 0.92][o.bright] || 0.66;
if (o.glow)
k *= 0.8 + 0.2 * Math.sin(t * (Math.PI * 2 / 6) + (i * 1.7));
if (o.fade > 0)
k *= Math.max(0, Math.min(1, (o.fade - o.d) / (o.fade * 0.3)));
var near = Math.max(0.3, Math.min(1, o.d / (w * 6)));
U.halo.material.opacity = k * 0.7 * near;
U.core.material.opacity = k * near;
U.foot.material.opacity = k * 0.7;
U.flare.material.opacity = k * 0.8 * near;
if (U.sw) {
var sh = Math.min(h * 0.6, 220), sr = Math.max(w * 5, o.d * 0.03), ss = Math.max(w * 1.8, o.d * 0.017);
U.sw.forEach(function (sp) {
var q = (sp.userData.s + t * 0.035) % 1, a = q * Math.PI * 5 + sp.userData.strand * (Math.PI * 2 / 3) + t * 0.9, r = sr * (1.15 - 0.6 * q);
sp.position.set(Math.cos(a) * r, 1 + q * sh, Math.sin(a) * r);
sp.scale.set(ss * (1.2 - 0.5 * q), ss * (1.2 - 0.5 * q), 1);
sp.material.opacity = Math.min(1, k * 1.1) * Math.sin(Math.PI * q) * Math.max(0.5, near);
});
}
if (U.lab) {
var far = lite ? 220 : 420, show = o.d < far && i < (lite ? 4 : 6);
U.lab.visible = show;
if (show) {
var s = Math.max(1.2, Math.min(24, o.d * 0.05));
U.lab.scale.set(s * 7.1, s, 1);
U.lab.position.y = Math.min(h * 0.45, 2.6 + s * 1.6);
U.lab.material.opacity = Math.max(0, Math.min(1, (far - o.d) / 30));
}
}
});
Object.keys(BCN.objs).forEach(function (id) { if (!keep[id])
bcnDrop(id); });
}
var BCN_BTN = "padding:6px 11px;border-radius:8px;border:1px solid #6A5FA0;background:#221E38;color:#EDE8F8;font-size:13px;cursor:pointer;margin:4px 6px 0 0";
var BCN_INP = "padding:5px 7px;border-radius:6px;border:1px solid #4A4470;background:#141022;color:#EDE8F8;font-size:13px";
function bcnEl() { return __ZC(410, 7, this, arguments, new.target); }
if (typeof PS_KEEP !== "undefined")
PS_KEEP["bcn-box"] = 1;
function bcnOpen() { BCN.open = true; bcnSeen(true); bcnPaint(); }
function bcnClose() { BCN.open = false; var el = bcnEl(); if (el)
el.style.display = "none"; }
function bcnDist(world, x, z) { var W = bcnWhere(); if (!W || W.key !== world || typeof camera === "undefined")
return ""; var d = Math.hypot(W.ox + x - camera.position.x, W.oz + z - camera.position.z); return d < 1000 ? Math.round(d) + " m" : (d / 1000).toFixed(1) + " km"; }
function bcnSwatches(list, cur, attr) { return __ZC(410, 8, this, arguments, new.target); }
function bcnPaint() { return __ZC(410, 9, this, arguments, new.target); }
function bcnToHtml(K) { return __ZC(410, 10, this, arguments, new.target); }
function bcnToAdd(K, id, name) {
K.to = (K.to || []).filter(function (p) { return p.id !== id; });
K.to.push({ id: String(id).toLowerCase(), name: name || "A player" });
BCN.kmsg = "Added " + (name || "them") + ". Press Save to keep it.";
bcnPaint();
}
function bcnKeeperHtml(W) { return __ZC(410, 11, this, arguments, new.target); }
function bcnKeeperSave(c, say) { return __ZC(410, 12, this, arguments, new.target); }
function bcnKeeperWire(el, W) { return __ZC(410, 13, this, arguments, new.target); }
(function () {
if (typeof phPaint !== "function")
return;
var pp = phPaint;
phPaint = function () {
var r = pp.apply(this, arguments);
try {
var box = document.getElementById("ph-box"), wh = box && box.querySelector(".top [data-p='wayhome']");
if (wh && !box.querySelector("[data-bcnph]")) {
var s = document.createElement("span");
s.setAttribute("data-bcnph", "1");
s.title = "Magic beacons";
s.textContent = "✨";
s.style.cssText = "cursor:pointer;font-size:14px;margin-right:12px";
s.onclick = function (ev) { ev.stopPropagation(); if (BCN.open)
bcnClose();
else
bcnOpen(); };
wh.parentNode.insertBefore(s, wh);
}
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof rmapPanelPaint !== "function")
return;
var rp = rmapPanelPaint;
rmapPanelPaint = function () {
var r = rp.apply(this, arguments);
try {
var el = document.getElementById("rmap"), W = bcnWhere();
if (!el || !W || W.key !== "city" || typeof ATL_RINGS === "undefined" || typeof rmapDot !== "function")
return r;
var g = el.querySelector("canvas").getContext("2d"), outer = ATL_RINGS[ATL_RINGS.length - 1].S + 120, M = { cx: 450, cy: 450, sc: (450 - 8) / outer };
bcnList(W).forEach(function (o) { rmapDot(g, M, W.ox + o.x, W.oz + o.z, o.color, 7, "✨ " + String(o.name || o.text || "Beacon").replace(/^✨ /, "").slice(0, 28), 20); });
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) {
try {
return tt.apply(this, arguments);
}
finally {
try {
bcnDraw(dt);
}
catch (e) {
if (!BCN.warned) {
BCN.warned = true;
if (window.console)
console.warn("[beacons]", e);
}
}
}
};
})();
var BCNC = { KEY: "somnu.eventcodes", PEND: "somnu.eventcode.pending", busy: false, toastT: 0, said: "" };
function bcncLs(k, v) { try {
if (v === undefined)
return localStorage.getItem(k);
if (v === null)
localStorage.removeItem(k);
else
localStorage.setItem(k, v);
}
catch (e) { } return null; }
function bcncMine() { return __ZC(410, 14, this, arguments, new.target); }
function bcnHasCode(c) { c = bcnCodeNorm(c); return !!c && bcncMine().indexOf(c) >= 0; }
function bcncBeacon(c) {
if (typeof DW_CLOUD === "undefined" || !DW_CLOUD.config)
return undefined;
var cf = bcnCfg();
if (cf.off)
return null;
return cf.list.filter(function (b) { return b.code && b.code === c && b.on && !bcnOver(b); })[0] || null;
}
function bcncToast(h) { return __ZC(410, 15, this, arguments, new.target); }
function bcncSay(h) { BCNC.said = h; bcncToast(h); bcnSay(h); if (typeof tgateMsg === "function" && document.getElementById("tg-msg"))
try {
tgateMsg(h.replace(/<[^>]+>/g, ""));
}
catch (e) { } }
function bcncPend(c) { c = bcnCodeNorm(c); if (c)
bcncLs(BCNC.PEND, c); return c; }
function bcncFromBoxes() { ["tg-code", "acc-code"].forEach(function (id) { var e = document.getElementById(id); if (e && e.value.trim())
bcncPend(e.value); }); }
function bcncTry() {
var c = bcnCodeNorm(bcncLs(BCNC.PEND));
if (!c || BCNC.busy)
return;
if (!bcnSigned())
return;
var b = bcncBeacon(c);
if (b === undefined)
return;
bcncLs(BCNC.PEND, null);
if (!b) {
bcncSay("The code <b>" + bcnE(c) + "</b> is not one we know, or its night is over.");
return;
}
bcncTake(c, b);
}
function bcncTake(c, b) { return __ZC(410, 16, this, arguments, new.target); }
var BCNC_INP = "width:100%;box-sizing:border-box;margin-top:8px";
function bcncBox(id, where, before) {
if (!where || document.getElementById(id))
return;
var i = document.createElement("input");
i.id = id;
i.type = "text";
i.autocomplete = "off";
i.maxLength = 24;
i.setAttribute("autocapitalize", "characters");
i.placeholder = "Event code (if you have one)";
i.style.cssText = BCNC_INP;
i.value = bcnCodeNorm(bcncLs(BCNC.PEND)) || "";
["keydown", "keyup", "keypress"].forEach(function (k) { i.addEventListener(k, function (e) { e.stopPropagation(); }); });
if (before)
where.parentNode.insertBefore(i, where);
else
where.parentNode.insertBefore(i, where.nextSibling);
}
(function () {
try {
var q = new URLSearchParams(location.search), c = q.get("code") || q.get("event");
if (c)
bcncPend(c);
}
catch (e) { }
if (typeof tgateDraw === "function") {
var td = tgateDraw;
tgateDraw = function () {
var r = td.apply(this, arguments);
try {
if (signedIn()) {
var en = document.getElementById("tg-enter");
if (en)
bcncBox("tg-code", en, true);
}
else
bcncBox("tg-code", document.getElementById("tg-pass"));
}
catch (e) { }
return r;
};
}
["tgateEmail", "tgateGoogle", "tgateEnter", "createAccount", "signIn"].forEach(function (n) {
if (typeof window[n] !== "function")
return;
var f = window[n];
window[n] = function () { try {
bcncFromBoxes();
}
catch (e) { } var r = f.apply(this, arguments); setTimeout(bcncTry, 600); return r; };
});
if (typeof authPost === "function") {
var ap = authPost;
authPost = function (path, body, tok) {
try {
var c = bcnCodeNorm(bcncLs(BCNC.PEND));
if (c && /^signup/.test(String(path)) && body) {
body.data = Object.assign({}, body.data || {}, { event_codes: [c] });
}
}
catch (e) { }
return ap.apply(this, arguments);
};
}
if (typeof keepSession === "function") {
var ks = keepSession;
keepSession = function (s) { var r = ks.apply(this, arguments); if (s && s.access_token)
setTimeout(bcncTry, 300); return r; };
}
var add = function () { try {
bcncBox("acc-code", document.getElementById("acc-pass"));
}
catch (e) { } };
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", add);
else
add();
setInterval(bcncTry, 2500);
if (typeof bcnPaint === "function") {
var bp = bcnPaint;
bcnPaint = function () {
var r = bp.apply(this, arguments);
try {
var el = bcnEl();
if (el && BCN.open) {
var mine = bcncMine(), d = document.createElement("div");
d.style.cssText = "border-top:1px solid #2A2448;margin-top:10px;padding-top:8px";
d.innerHTML = "<div style='font-weight:600'>Event code</div>" + (mine.length ? "<div style='font-size:12.5px;color:#C8C0E0;margin-top:2px'>Yours: " + mine.map(bcnE).join(", ") + "</div>" : "") +
"<div style='margin-top:4px'><input data-bcncode maxlength='24' placeholder='e.g. SAMHAIN' style='" + BCN_INP + ";width:130px;text-transform:uppercase'> <button data-bcncgo style='" + BCN_BTN + "'>Use it</button></div>";
el.appendChild(d);
var inp = d.querySelector("[data-bcncode]");
["keydown", "keyup", "keypress"].forEach(function (k) { inp.addEventListener(k, function (e) { e.stopPropagation(); if (k === "keydown" && e.key === "Enter")
d.querySelector("[data-bcncgo]").click(); }); });
d.querySelector("[data-bcncgo]").onclick = function () {
var c = bcncPend(inp.value);
if (!c)
return;
if (!bcnSigned()) {
bcncSay("Sign in first (Settings), and the code <b>" + bcnE(c) + "</b> will be taken.");
return;
}
bcncTry();
setTimeout(function () { if (BCN.open)
bcnPaint(); }, 200);
};
}
}
catch (e) { }
return r;
};
}
})();
