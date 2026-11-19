/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var RSY = { looks: {}, lotNames: {}, since: 0, busy: false, at: 0, off: 0, rights: null, rightsAt: 0, rightsBusy: false, open: false, key: null, draft: null,
saved: null, tab: "out", part: "wall", say: "", saving: false, warned: 0, idx: null, idxN: -1, near: null, nearAt: 0, redrawT: {}, list: false,
first: true, missing: false };
var RSY_PAL = [["Soft white", "#D6CFC0"], ["Cream", "#D3C39C"], ["Sand", "#BFA676"], ["Stone grey", "#8C877E"], ["Slate blue", "#4E6278"],
["Navy", "#26344E"], ["Sage", "#8A9B7A"], ["Forest green", "#2F4A33"], ["Teal", "#2E6B6A"], ["Brick red", "#8E3B2E"],
["Terracotta", "#B4643E"], ["Burgundy", "#5E2230"], ["Plum", "#6A3A5E"], ["Rose", "#B87C8C"], ["Mustard", "#B8923A"],
["Chocolate", "#4A3226"], ["Charcoal", "#2C2D31"], ["Black", "#18181B"], ["Gold", "#B8945A"], ["Silver", "#A2A6AC"]];
var RSY_SIGNFG = [["Cream letters", "#E2D6BC"], ["Gold letters", "#D8B46A"], ["Silver letters", "#C8CCD2"], ["White letters", "#E4E0D6"],
["Black letters", "#1A1A1D"], ["Red letters", "#A8322B"], ["Blue letters", "#2F5E9E"], ["Green letters", "#3F7A3A"]];
var RSY_SIGNBG = [["Black board", "#15161B"], ["Navy board", "#1E2A44"], ["Green board", "#1F3A26"], ["Red board", "#5A1E1E"],
["Plum board", "#40243C"], ["Wood board", "#5A3E26"], ["Cream board", "#D3C39C"], ["Gold board", "#9A7A44"]];
var RSY_PARTS = {
out: [
{ k: "wall", n: "Walls", col: "wall", fin: "wallFin", list: [["brick", "Brick"], ["stone", "Stone"], ["wood", "Wood boards"], ["siding", "Siding"],
["plaster", "Plaster"], ["concrete", "Concrete"], ["marble", "Marble"], ["metal", "Metal panels"]] },
{ k: "trim", n: "Trim", col: "trim", has: "trim" },
{ k: "roof", n: "Roof", col: "roof", fin: "roofFin", has: "roof", list: [["shingle", "Shingles"], ["tile", "Clay tiles"], ["slate", "Slate"],
["metalroof", "Metal roof"], ["thatch", "Thatch"]] },
{ k: "towers", n: "Towers & domes", col: "towers", has: "towers" },
{ k: "door", n: "Front door", col: "door", fin: "doorStyle", list: [["plain", "Plain door"], ["arched", "Arched door"], ["double", "Double doors"],
["round", "Round door"], ["barn", "Barn door"], ["iron", "Iron door"], ["glass", "Glass door"]] },
{ k: "win", n: "Windows", col: "frame", colName: "Frames", fin: "win", list: [["square", "Square"], ["arched", "Arched"], ["round", "Round"],
["tall", "Tall"], ["shuttered", "Shuttered"], ["stained", "Stained glass"], ["barred", "Barred"]] },
{ k: "awning", n: "Awning", col: "awning", has: "awning" },
{ k: "sign", n: "Sign", sign: true, has: "sign" }
],
"in": [
{ k: "inWall", n: "Walls inside", col: "inWall", fin: "inFin", list: [["paint", "Painted"], ["plaster", "Plaster"], ["brick", "Brick"],
["wood", "Wood panelling"], ["stone", "Stone"], ["marble", "Marble"]] },
{ k: "floor", n: "Floor", col: "floorCol", fin: "floor", list: [["wood", "Wood boards"], ["tile", "Tiles"], ["stone", "Stone flags"],
["carpet", "Carpet"], ["marble", "Marble"], ["checker", "Chequered"], ["concrete", "Polished concrete"]] }
]
};
var RSY_COLKEYS = ["wall", "trim", "roof", "towers", "door", "frame", "awning", "signFg", "signBg", "inWall", "floorCol"];
function rsyNum(h) { return typeof h === "number" ? h : parseInt(String(h || "").replace("#", ""), 16) || 0; }
function rsyHexStr(n) { return "#" + ("000000" + (n >>> 0).toString(16)).slice(-6).toUpperCase(); }
function rsySafe(h, maxL) {
var n = rsyNum(h), c = new THREE.Color(n), hsl = { h: 0, s: 0, l: 0 };
c.getHSL(hsl);
var top = maxL || 0.8;
if (hsl.l <= top)
return n;
c.setHSL(hsl.h, hsl.s, top);
return c.getHex();
}
function rsyLookEmpty(L) { return !L || !Object.keys(L).length; }
function rsyPlots() { return (store.plots || []).concat(store.districtPlots || []); }
function rsyLotIds() {
var byLot = {};
Object.keys(RSY.lotNames || {}).forEach(function (id) { byLot[RSY.lotNames[id]] = +id; });
((typeof standing !== "undefined" && standing && standing.lots) || []).forEach(function (l) { if (l && l.lot && l.lot_id != null)
byLot[l.lot] = +l.lot_id; });
if (typeof cityLots !== "undefined" && cityLots)
cityLots.forEach(function (r) { byLot[r.name] = r.lot_id; });
return byLot;
}
function rsyIndex() {
var ps = rsyPlots(), byLot = rsyLotIds(), n = ps.length + ":" + Object.keys(byLot).length;
if (RSY.idx && RSY.idxN === n)
return RSY.idx;
var idx = {};
ps.forEach(function (p) { if (p && p.homeId && byLot[p.name] != null)
idx[p.homeId] = "lot:" + byLot[p.name]; });
RSY.idx = idx;
RSY.idxN = n;
return idx;
}
function rsyKeyOf(spec) {
if (!spec)
return null;
if (spec.workplace && spec.city)
return String(spec.workplace);
if (typeof LL_KEY !== "undefined" && spec.city && spec.label === LL_KEY)
return LL_KEY;
return rsyIndex()[spec.id] || null;
}
function rsySpecsOf(key) { return __ZC(315, 0, this, arguments, new.target); }
function rsyName(key) { return __ZC(315, 1, this, arguments, new.target); }
function rsyLookFor(key) {
if (!key)
return null;
var L = (RSY.open && RSY.key === key && RSY.draft) ? RSY.draft : RSY.looks[key];
return rsyLookEmpty(L) ? null : L;
}
function rsyDef(spec) { return KIT[spec && spec.archetype] || null; }
var RSY_GRAND = {
palace: { 0xEDE4D0: "wall", 0xE2D6BE: "wall2", 0x55606E: "roof", 0xC8A882: "trim", 0x6FA394: "towers" },
manor: { 0xE6DCC8: "wall", 0x4A4F58: "roof", 0xF4F0E6: "trim" },
castle: { 0x8C877C: "wall", 0x77726A: "wall2", 0x7E7A70: "wall2", 0x3E4654: "roof" }
};
function rsyGrandCol(arch, c, L) { return __ZC(315, 2, this, arguments, new.target); }
function rsyHas(spec, what) { return __ZC(315, 3, this, arguments, new.target); }
function rsyRoofPart(p) {
if (p.c !== "trim")
return false;
var big = Math.max.apply(null, (p.s || [0]).slice(0, 3));
return p.g === "cone" || p.g === "tri" || (p.g === "cyl" && big > 6);
}
var RSY_ATTR = ["c", "m", "rc", "rm", "dc", "ds", "ws", "wf", "tc", "mc"];
(function () {
if (typeof build !== "function")
return;
var b0 = build;
build = function (spec) {
var L = null;
try {
if (spec && spec.city && !spec.lotItem)
L = rsyLookFor(rsyKeyOf(spec));
}
catch (e) {
L = null;
}
if (!L)
return b0.apply(this, arguments);
var a = spec.attrs || (spec.attrs = {}), keep = {}, had = {}, hadSign = Object.prototype.hasOwnProperty.call(spec, "sign"), sg = spec.sign;
RSY_ATTR.forEach(function (k) { had[k] = Object.prototype.hasOwnProperty.call(a, k); keep[k] = a[k]; });
if (L.wall)
a.c = rsySafe(L.wall);
if (L.wallFin)
a.m = L.wallFin;
if (L.roof)
a.rc = rsySafe(L.roof);
if (L.roofFin)
a.rm = L.roofFin;
if (L.door)
a.dc = rsySafe(L.door);
if (L.doorStyle)
a.ds = L.doorStyle;
if (L.win)
a.ws = L.win;
if (L.frame)
a.wf = rsySafe(L.frame);
if (L.towers) {
a.tc = rsySafe(L.towers);
a.mc = rsySafe(L.towers);
}
if (L.sign)
spec.sign = L.sign;
spec.__rsy = L;
var was = RSY.cur;
RSY.cur = L;
try {
return b0.apply(this, arguments);
}
finally {
RSY.cur = was;
RSY_ATTR.forEach(function (k) { if (had[k])
a[k] = keep[k];
else
delete a[k]; });
if (hadSign)
spec.sign = sg;
else
delete spec.sign;
delete spec.__rsy;
}
};
if (typeof levelParts === "function") {
var lp0 = levelParts;
levelParts = function (def, spec) {
var ps = lp0.apply(this, arguments), L = spec && spec.__rsy;
if (!L || !(L.trim || L.awning || L.roof || L.wall || L.towers))
return ps;
var detail = typeof landOpt !== "function" || landOpt("detail"), arch = spec.archetype;
return ps.map(function (p) {
var gc = RSY_GRAND[arch] ? rsyGrandCol(arch, p.c, L) : null;
if (gc != null)
return Object.assign({}, p, { c: gc });
if (L.awning && p.c === "paint")
return Object.assign({}, p, { c: rsySafe(L.awning) });
if (p.c === "trim") {
var roof = rsyRoofPart(p);
if (roof && L.roof && !detail)
return Object.assign({}, p, { c: rsySafe(L.roof) });
if (!roof && L.trim)
return Object.assign({}, p, { c: rsySafe(L.trim) });
}
return p;
});
};
}
if (typeof signTexture === "function") {
var st0 = signTexture;
signTexture = function (text) {
var L = RSY.cur;
if (!L || !(L.signFg || L.signBg))
return st0.apply(this, arguments);
var fg = rsyHexStr(rsySafe(L.signFg || "#E2D6BC", 0.84)), bg = rsyHexStr(rsySafe(L.signBg || "#15161B", 0.7));
var key = "rsy|" + text + "|" + fg + "|" + bg;
if (SIGN_TEX[key])
return SIGN_TEX[key];
var c = document.createElement("canvas");
c.width = 512;
c.height = 128;
var x = c.getContext("2d");
x.fillStyle = bg;
x.fillRect(0, 0, 512, 128);
x.strokeStyle = fg;
x.globalAlpha = 0.55;
x.lineWidth = 6;
x.strokeRect(3, 3, 506, 122);
x.globalAlpha = 1;
x.fillStyle = fg;
var F = fitLines(x, String(text), 480, 2, 64, 24, "400", "Georgia, serif");
x.font = "400 " + F.size + "px Georgia, serif";
x.textAlign = "center";
x.textBaseline = "middle";
var lh = F.size * 1.08, y0 = 66 - (F.lines.length - 1) * lh / 2;
F.lines.forEach(function (l, i) { x.fillText(l, 256, y0 + i * lh); });
var tex = new THREE.CanvasTexture(c);
tex.anisotropy = 4;
SIGN_TEX[key] = tex;
return tex;
};
}
})();
var RSY_INTEX = { plaster: "plaster", brick: "brick", wood: "wood", stone: "stone", marble: "marble" };
var RSY_FLTEX = { wood: "wood", tile: "floortile", stone: "stone", marble: "marble", concrete: "concrete" };
var RSY_FLCOL = { wood: 0x7A5634, tile: 0xC8C2B6, stone: 0x6E6A64, carpet: 0x7A2A2A, marble: 0xD6D0C4, checker: 0xD8D2C6, concrete: 0x8E8C88 };
function rsyInFurn(o, root) { for (var p = o; p && p !== root; p = p.parent) {
if (p.userData && (p.userData.furn || p.userData.wgShared))
return true;
} return false; }
function rsyDressInside(R, spec, L) { return __ZC(315, 4, this, arguments, new.target); }
(function () {
if (typeof makeInterior !== "function")
return;
var mi0 = makeInterior;
makeInterior = function (spec) {
var R = mi0.apply(this, arguments);
try {
var key = (R && R.wpKey) || rsyKeyOf(spec), L = rsyLookFor(key);
if (L && R && R.root)
rsyDressInside(R, spec, L);
}
catch (e) {
if (!RSY.warned && window.console) {
RSY.warned = 1;
console.warn("[restyle] inside", e);
}
}
return R;
};
})();
function rsyRedraw(key) { return __ZC(315, 5, this, arguments, new.target); }
function rsyIntKey() { if (typeof INT === "undefined" || !INT)
return null; return INT.wpKey || rsyKeyOf(INT.spec); }
function rsyRpc(name, body) {
if (typeof signedIn === "function" && signedIn() && typeof cityRpc === "function")
return cityRpc(name, body);
if (typeof restRpc === "function" && typeof DW_CONFIG !== "undefined" && DW_CONFIG.supabaseUrl)
return restRpc(name, body);
return Promise.resolve(null);
}
function rsyMissing(e) { var m = String(e && e.message || e || ""); return /function|404|schema cache|does not exist/i.test(m); }
function rsyInCity() {
var r = typeof somnucorRealm === "function" ? somnucorRealm() : null;
return !!(r && (store.here || 0) === r.id);
}
function rsyPoll() {
if (RSY.busy || document.hidden || Date.now() < RSY.off)
return;
if (!rsyInCity() && !store.inside)
return;
if (typeof DW_CONFIG === "undefined" || !DW_CONFIG.supabaseUrl)
return;
RSY.busy = true;
rsyRpc("building_looks_since", { p_since: RSY.since }).then(function (o) {
if (!o || !o.ok)
return;
RSY.missing = false;
RSY.since = o.now;
(o.looks || []).forEach(function (r) {
var lm = /^lot:(\d+)$/.exec(r.key || "");
if (lm && r.name) {
RSY.lotNames[lm[1]] = r.name;
RSY.idx = null;
}
var was = RSY.looks[r.key] || {}, now = r.look || {};
if (JSON.stringify(was) === JSON.stringify(now))
return;
if (rsyLookEmpty(now))
delete RSY.looks[r.key];
else
RSY.looks[r.key] = now;
if (RSY.open && RSY.key === r.key) {
RSY.saved = now;
return;
}
rsyRedraw(r.key);
});
}).catch(function (e) { if (rsyMissing(e)) {
RSY.missing = true;
RSY.off = Date.now() + 300000;
} })
.then(function () { RSY.busy = false; RSY.at = Date.now(); });
}
function rsyLoadRights(force) {
if (!(typeof signedIn === "function" && signedIn())) {
RSY.rights = null;
return Promise.resolve(null);
}
if (RSY.rightsBusy)
return Promise.resolve(RSY.rights);
if (!force && RSY.rights && Date.now() - RSY.rightsAt < 60000)
return Promise.resolve(RSY.rights);
RSY.rightsBusy = true;
return cityRpc("building_look_rights", {}).then(function (o) { RSY.rights = o && o.ok ? o : null; })
.catch(function (e) { if (rsyMissing(e))
RSY.missing = true; RSY.rights = null; })
.then(function () { RSY.rightsBusy = false; RSY.rightsAt = Date.now(); return RSY.rights; });
}
function rsyKeeper() { return !!((RSY.rights && RSY.rights.keeper) || (typeof amKeeper === "function" && amKeeper())); }
function rsyMyKeys() {
var out = [], R = RSY.rights;
if (R) {
(R.lots || []).forEach(function (id) { var k = "lot:" + id; if (out.indexOf(k) < 0)
out.push(k); });
(R.places || []).forEach(function (p) { if (p && out.indexOf(p) < 0)
out.push(p); });
}
else
((typeof standing !== "undefined" && standing && standing.lots) || []).forEach(function (l) { var k = "lot:" + l.lot_id; if (out.indexOf(k) < 0)
out.push(k); });
return out;
}
function rsyMay(key) { return !!key && (rsyKeeper() || rsyMyKeys().indexOf(key) >= 0); }
function rsyDoorOf(spec) { var d = null; try {
d = typeof doorWorld === "function" ? doorWorld(spec) : null;
}
catch (e) { } return d || { x: spec.x, z: spec.z }; }
function rsyFindNear() {
if (typeof walkMode === "undefined" || !walkMode)
return null;
if (typeof signedIn !== "function" || !signedIn())
return null;
if (store.inside) {
var k = rsyIntKey();
return k && rsyMay(k) ? { key: k, inside: true } : null;
}
if (!rsyInCity())
return null;
var P = camera.position, best = null, bd = 1e9;
if (rsyKeeper()) {
(store.objects || []).forEach(function (o) {
if (!o.city || o.lotItem)
return;
var d = KIT[o.archetype];
if (!d || d.cat !== "structure")
return;
var s = (o.attrs && o.attrs.s) || 1, r = Math.max(d.size[0], d.size[2]) * s * 0.5 + 8;
var dx = o.x - P.x, dz = o.z - P.z;
if (Math.abs(dx) > r || Math.abs(dz) > r)
return;
var dist = Math.hypot(dx, dz) - r;
if (dist < 0 && dist < bd) {
var k2 = rsyKeyOf(o);
if (k2) {
bd = dist;
best = k2;
}
}
});
return best ? { key: best, inside: false } : null;
}
rsyMyKeys().forEach(function (k) {
rsySpecsOf(k).forEach(function (s) { var d = rsyDoorOf(s), dist = Math.hypot(P.x - d.x, P.z - d.z); if (dist < 20 && dist < bd) {
bd = dist;
best = k;
} });
});
return best ? { key: best, inside: false } : null;
}
function rsyBtn() {
var el = document.getElementById("rsy-btn");
if (el || !document.body)
return el;
el = document.createElement("button");
el.id = "rsy-btn";
el.type = "button";
el.textContent = "🎨 Restyle";
el.title = "Restyle this building: colours, walls, roof, door, windows, sign and the inside";
el.style.cssText = "position:fixed;z-index:44;display:none;left:calc(12px + env(safe-area-inset-left,0px));bottom:calc(326px + env(safe-area-inset-bottom,0px));" +
"background:rgba(10,12,18,.92);color:#EDE8F8;border:1px solid #C9A868;border-radius:18px;padding:7px 14px;font:600 13px system-ui,sans-serif";
el.onclick = function () { if (RSY.near)
rsyOpen(RSY.near.key); };
document.body.appendChild(el);
return el;
}
function rsyBusyElsewhere() {
if (typeof DRIVE !== "undefined" && DRIVE && DRIVE.on)
return true;
if (typeof talkOpen !== "undefined" && talkOpen)
return true;
var kd = document.getElementById("keeper-desk");
if (kd && kd.style.display === "block")
return true;
return false;
}
function rsyBtnPaint() {
var el = rsyBtn();
if (!el)
return;
if (Date.now() - RSY.nearAt > 500) {
RSY.nearAt = Date.now();
RSY.near = rsyFindNear();
}
var show = !!(RSY.near && !RSY.open && !rsyBusyElsewhere());
el.style.display = show ? "block" : "none";
}
function rsyEl() { return __ZC(315, 6, this, arguments, new.target); }
function rsyBtnH(a, label, extra, on) { return "<button class='btn" + (on ? " rsy-on" : "") + "' data-rsy='" + a + "'" + (extra || "") + ">" + label + "</button>"; }
function rsySwatches(colKey, pal, cur) { return __ZC(315, 7, this, arguments, new.target); }
function rsySpecNow() { return rsySpecsOf(RSY.key)[0] || (store.inside && typeof INT !== "undefined" && INT && rsyIntKey() === RSY.key ? INT.spec : null); }
function rsyParts() {
var spec = rsySpecNow();
return (RSY_PARTS[RSY.tab] || []).filter(function (p) { return !p.has || !spec || rsyHas(spec, p.has); });
}
function rsyHtml() { return __ZC(315, 8, this, arguments, new.target); }
function rsyListHtml() { return __ZC(315, 9, this, arguments, new.target); }
function rsyPaint() {
var el = rsyEl();
if (!el)
return;
if (!RSY.open) {
el.style.display = "none";
return;
}
var sc = el.scrollTop;
el.innerHTML = rsyHtml();
el.style.display = "block";
el.scrollTop = sc;
}
function rsySet(k, v, quiet) {
if (!RSY.draft)
RSY.draft = {};
if (v === null || v === undefined || v === "")
delete RSY.draft[k];
else
RSY.draft[k] = v;
RSY.say = "";
rsyRedraw(RSY.key);
if (!quiet)
rsyPaint();
else {
var sv = document.querySelector("#rsy-box [data-rsy=save]");
if (sv)
sv.disabled = false;
}
}
function rsyClick(e) { return __ZC(315, 10, this, arguments, new.target); }
function rsyWay(k) { return __ZC(315, 11, this, arguments, new.target); }
function rsySave() { return __ZC(315, 12, this, arguments, new.target); }
function rsyLeaveDraft() {
var k = RSY.key, changed = k && JSON.stringify(RSY.draft || {}) !== JSON.stringify(RSY.saved || {});
RSY.draft = null;
RSY.saved = null;
if (changed)
rsyRedraw(k);
}
function rsyOpen(key) { return __ZC(315, 13, this, arguments, new.target); }
function rsyClose() { return __ZC(315, 14, this, arguments, new.target); }
function rsyMenuOpen() {
rsyLoadRights(true).then(function () {
RSY.near = rsyFindNear();
if (RSY.near)
return rsyOpen(RSY.near.key);
RSY.open = true;
RSY.list = true;
RSY.key = null;
RSY.say = "";
rsyPaint();
});
}
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return RSY.open; }, close: function () { rsyClose(); } });
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-restyle"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-restyle";
b.title = "Restyle your home or business: colours, walls, roof, door, windows, sign and the inside";
b.textContent = "🎨 Restyle";
b.onclick = function () { rsyMenuOpen(); };
var pk = document.getElementById("me-art");
if (pk && pk.parentNode === bar && pk.nextSibling)
bar.insertBefore(b, pk.nextSibling);
else
bar.appendChild(b);
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
})();
setInterval(function () {
try {
rsyBtnPaint();
if (RSY.open && RSY.key && !store.inside && !rsyInCity())
rsyClose();
if (Date.now() - RSY.at > (store.inside ? 8000 : 12000))
rsyPoll();
if (typeof signedIn === "function" && signedIn() && (rsyInCity() || store.inside) && Date.now() - RSY.rightsAt > 60000)
rsyLoadRights();
var n = rsyPlots().length + ":" + ((typeof cityLots !== "undefined" && cityLots) ? cityLots.length : 0);
if (n !== RSY.idxN && Object.keys(RSY.looks).some(function (k) { return /^lot:/.test(k); })) {
rsyIndex();
Object.keys(RSY.looks).forEach(function (k) { if (/^lot:/.test(k))
rsyRedraw(k); });
}
}
catch (e) {
if (!RSY.warned && window.console) {
RSY.warned = 1;
console.warn("[restyle]", e);
}
}
}, 1000);
