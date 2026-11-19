/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var SG = { by: {}, shop: {}, files: {}, tex: {}, icons: {}, open: null, cat: null, rows: null, tab: "", q: "", page: 1, msg: "", busy: false };
(function () {
if (typeof SG_DATA === "undefined")
return;
SG_DATA.goods.forEach(function (it) { it.kind = "home"; SG.by[it.k] = it; (SG.shop[it.s] = SG.shop[it.s] || []).push(it); });
SG_DATA.wear.forEach(function (it) { it.kind = "wear"; SG.by[it.k] = it; (SG.shop[it.s] = SG.shop[it.s] || []).push(it); });
})();
function sgItem(k) { return SG.by[k] || null; }
function sgShopIndex(name) { return typeof SG_DATA === "undefined" ? -1 : SG_DATA.shops.indexOf(name); }
var SG_CEIL = 3.15;
function sgModelsOn() { return typeof modelsOn === "function" ? modelsOn() : true; }
function sgLoader(cb) {
if (typeof modelsLoader === "function")
return modelsLoader(cb);
if (THREE.GLTFLoader) {
SG.loader = SG.loader || new THREE.GLTFLoader();
return cb(SG.loader);
}
}
function sgMat(m) { return __ZC(280, 0, this, arguments, new.target); }
function sgFile(file, cb) { return __ZC(280, 1, this, arguments, new.target); }
function sgDressModel(inner, it) { return __ZC(280, 2, this, arguments, new.target); }
function sgLift(it) {
if (it.a === "wall")
return it.y || 1.4;
if (it.a === "ceil")
return Math.max(0.2, SG_CEIL - it.z[1]);
return 0;
}
function sgMesh(it, o) { return __ZC(280, 3, this, arguments, new.target); }
function sgBoxGeo() { if (!SG.box) {
SG.box = new THREE.BoxGeometry(1, 1, 1);
} return SG.box; }
function sgRand(seed) { var s = seed >>> 0 || 1; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function sgCanvasTex(key, w, h, draw) {
if (SG.tex["c:" + key])
return SG.tex["c:" + key];
var c = document.createElement("canvas");
c.width = w;
c.height = h;
draw(c.getContext("2d"), w, h);
var t = new THREE.CanvasTexture(c);
t.anisotropy = 2;
return (SG.tex["c:" + key] = t);
}
function sgHex(c) { return "#" + ("000000" + (c >>> 0).toString(16)).slice(-6); }
function sgMix(a, b, k) { var A = new THREE.Color(a), B = new THREE.Color(b); return "#" + A.lerp(B, k).getHexString(); }
function sgPainting(x, W, H, o) { return __ZC(280, 4, this, arguments, new.target); }
function sgRug(x, W, H, o) { return __ZC(280, 5, this, arguments, new.target); }
function sgLam(c) { var k = "l" + c; if (!SG.lam)
SG.lam = {}; return SG.lam[k] || (SG.lam[k] = new THREE.MeshLambertMaterial({ color: c })); }
function sgProc(it) { return __ZC(280, 6, this, arguments, new.target); }
(function () {
if (typeof FURN !== "object" || typeof SG_DATA === "undefined")
return;
SG_DATA.goods.forEach(function (it) {
if (FURN[it.k])
return;
FURN[it.k] = function () { return sgMesh(it); };
if (it.b && typeof SOLIDFURN !== "undefined")
SOLIDFURN[it.k] = 1;
});
if (typeof furnBox === "function") {
var fb = furnBox;
furnBox = function (k) { var it = SG.by[k]; return it && it.z ? [Math.max(0.3, it.z[0]), Math.max(0.3, it.z[2])] : fb.apply(this, arguments); };
}
})();
function sgOwned(k) {
var n = 0;
((typeof myThings !== "undefined" && myThings) || []).forEach(function (t) { if (t && t.archetype === k)
n++; });
return n;
}
function sgKeeper() { return typeof amKeeper === "function" && amKeeper(); }
(function () {
if (typeof furnList !== "function")
return;
var fl = furnList;
furnList = function () { return fl.apply(this, arguments).filter(function (k) { return !SG.by[k]; }); };
})();
function sgOwnedHome() {
var out = [], seen = {};
((typeof myThings !== "undefined" && myThings) || []).forEach(function (t) { var it = t && SG.by[t.archetype]; if (it && it.kind === "home" && !seen[it.k]) {
seen[it.k] = 1;
out.push(it);
} });
return out.sort(function (a, b) { return a.n < b.n ? -1 : 1; });
}
function sgFillSelect(sel, draft, pick) { return __ZC(280, 7, this, arguments, new.target); }
function sgMayPlace(k, draft) { return __ZC(280, 8, this, arguments, new.target); }
(function () {
if (typeof paintArranger === "function") {
var pa = paintArranger;
paintArranger = function () { var r = pa.apply(this, arguments); try {
sgFillSelect(document.getElementById("wp-kind"), typeof wpDraft !== "undefined" ? wpDraft : null, SG.pick);
}
catch (e) { } return r; };
}
if (typeof eydPaint === "function") {
var ep = eydPaint;
eydPaint = function () { var r = ep.apply(this, arguments); try {
sgFillSelect(document.getElementById("eyd-kind"), EYD.draft, SG.pick);
}
catch (e) { } return r; };
}
if (typeof wpPlace === "function") {
var wp = wpPlace;
wpPlace = function (k) { if (!sgMayPlace(k, typeof wpDraft !== "undefined" ? wpDraft : null))
return; SG.pick = SG.by[k] ? k : SG.pick; return wp.apply(this, arguments); };
}
if (typeof eydPlace === "function") {
var yp = eydPlace;
eydPlace = function (k) { if (!sgMayPlace(k, EYD.draft))
return; SG.pick = SG.by[k] ? k : SG.pick; return yp.apply(this, arguments); };
}
})();
var SG_TOPS = { table: 0.79, desk: 0.79, counter: 0.93, schooldesk: 0.68, longtable: 0.82, till: 1.0, shopcounter: 0.98, workbench: 0.9, labbench: 0.95, counseltable: 0.79, feasttable: 0.82 };
function sgTopOf(c) {
var k = c.userData && c.userData.furn;
if (!k)
return 0;
var it = SG.by[k];
if (it) {
if (it.a || !it.b)
return 0;
if (/table|desk|counter|sideboard|drawers|dresser|cabinet|cupboard|bar|chest|nightstand|bedside|stand|shelving|bench|unit/i.test(it.n))
return it.z[1];
return 0;
}
return SG_TOPS[k] || 0;
}
function sgSettle(I) { return __ZC(280, 9, this, arguments, new.target); }
(function () {
if (typeof makeInterior !== "function")
return;
var mk = makeInterior;
makeInterior = function () { var I = mk.apply(this, arguments); try {
sgSettle(I);
}
catch (e) { } return I; };
})();
function sgKit(k) {
var it = SG.by[k];
if (!it || it.kind !== "home" || typeof KIT === "undefined")
return;
if (!KIT[k])
KIT[k] = { cat: "sgoods", size: [Math.max(0.2, it.z[0]), Math.max(0.2, it.z[1]), Math.max(0.2, it.z[2])], parts: [{ g: "box", s: it.z, p: [0, it.z[1] / 2, 0], c: 0xB8A890 }], sg: 1 };
}
(function () {
if (typeof build !== "function")
return;
var b0 = build;
build = function (spec) {
var it = spec && SG.by[spec.archetype];
if (it && it.kind === "home") {
sgKit(it.k);
var g = sgMesh(it, { noLift: it.a === "ceil" });
g.userData.id = spec.id;
return g;
}
return b0.apply(this, arguments);
};
function scan() { try {
((typeof store !== "undefined" && store.objects) || []).forEach(function (o) { if (o && SG.by[o.archetype])
sgKit(o.archetype); });
}
catch (e) { } }
scan();
addEventListener("DOMContentLoaded", function () { scan(); setTimeout(scan, 1500); });
if (typeof rebuild === "function") {
var rb = rebuild;
rebuild = function () { scan(); return rb.apply(this, arguments); };
}
})();
function sgSetOut(it) { return __ZC(280, 10, this, arguments, new.target); }
function sgPlaceHome(it) { return __ZC(280, 11, this, arguments, new.target); }
var SG_DYE = { layer: "layerColor", back: "backColor", hat: "hatColor", legs: "bottom", feet: "shoes", neck: "accColor", hands: "accColor", ears: "accColor", waist: "accColor", face: "accColor" };
function sgLookKey(slot) { return (typeof BKP_LOOKKEY !== "undefined" && BKP_LOOKKEY[slot]) || slot; }
function sgWearing(it) {
if (typeof WEAR === "undefined" || !WEAR[it.w])
return false;
var L = meLook(), lk = sgLookKey(WEAR[it.w].slot);
return L[lk] === it.w && L.sgw && L.sgw[lk] === it.k;
}
function sgWear(it, on) { return __ZC(280, 12, this, arguments, new.target); }
(function () {
if (typeof renderWardrobe !== "function")
return;
var rw = renderWardrobe;
renderWardrobe = function () {
try {
var L = meLook();
if (L.sgw)
Object.keys(L.sgw).forEach(function (lk) { var it = SG.by[L.sgw[lk]]; if (!it || L[lk] !== it.w) {
delete L.sgw[lk];
if (L.sgwWas)
delete L.sgwWas[lk];
} });
}
catch (e) { }
return rw.apply(this, arguments);
};
if (typeof wearOwned === "function") {
var wo = wearOwned;
wearOwned = function (key) {
if (wo.apply(this, arguments))
return true;
return ((typeof myThings !== "undefined" && myThings) || []).some(function (t) { var it = t && SG.by[t.archetype]; return it && it.kind === "wear" && it.w === key; });
};
}
})();
function sgWearIcon(it, px) { return __ZC(280, 13, this, arguments, new.target); }
function sgIconHtml(it, px) { return __ZC(280, 14, this, arguments, new.target); }
(function () {
if (typeof SHOPC_SHELVES === "undefined" || typeof SG_DATA === "undefined")
return;
SG_DATA.shops.forEach(function (k) { if (!SHOPC_SHELVES[k] && sgShopGoods(k).length && !(typeof NEEDS_PLACES !== "undefined" && NEEDS_PLACES[k]))
SHOPC_SHELVES[k] = { name: /^\b$/ }; });
})();
function sgRowsLoad(force) { return __ZC(280, 15, this, arguments, new.target); }
function sgEl() { return __ZC(280, 16, this, arguments, new.target); }
function sgShopGoods(name) { var i = sgShopIndex(name); return i < 0 ? [] : (SG.shop[i] || []); }
function sgShopOpen(name) { return __ZC(280, 17, this, arguments, new.target); }
function sgShopClose() { SG.open = null; var el = document.getElementById("sgshop"); if (el)
el.style.display = "none"; }
var SG_SUBS = {
"The Joinery": [["Kitchens", /kitchen|sink|range|fridge|oven unit|counter|prep table|scullery|shaker|restaurant wall/i], ["Sofas", /sofa|loveseat|day bed|ottoman/i], ["Armchairs", /armchair|lounge chair|reclining/i], ["Beds", /\bbeds?\b/i],
["Cupboards and drawers", /drawers|dresser|tallboy|cabinet|cupboard|sideboard|chest|nightstand|bedside|media stand/i], ["Bookcases and shelves", /bookcase|shelving|shelf|shelves/i], ["Tables and desks", /table|desk|breakfast bar/i], ["Chairs and stools", /chair|stool|bench/i]],
"The Glassworks": [["Mirrors", /mirror/i], ["Windows", /window/i], ["Ceiling lights", /pendant|chandelier|ceiling|fan|hanging lantern/i], ["Lamps", /lamp|light|lantern/i], ["Glassware", /bottle|phial|flask/i]],
"The Weaving Shed": [["Rugs", /rug|runner/i], ["Curtains", /curtain/i], ["Cushions", /cushion|bolster/i]]
};
function sgCat(it) {
if (it.kind === "wear")
return sgWearCat(it);
var L = SG_SUBS[SG_DATA.shops[it.s]];
if (L)
for (var i = 0; i < L.length; i++)
if (L[i][1].test(it.n))
return L[i][0];
return SG_DATA.cats[it.c];
}
function sgCats(goods) { var c = []; goods.forEach(function (it) { var n = sgCat(it); if (c.indexOf(n) < 0)
c.push(n); }); return c; }
function sgWearCat(it) { var s = WEAR[it.w] && WEAR[it.w].slot; return { layer: "Coats and tops", back: "Capes and packs", hat: "Hats", neck: "Scarves and ties", hands: "Gloves", legs: "Trousers and skirts", feet: "Shoes and boots" }[s] || "Clothes"; }
function sgPaint() { return __ZC(280, 18, this, arguments, new.target); }
function sgPaintList() { return __ZC(280, 19, this, arguments, new.target); }
function sgBuy(k, btn) { return __ZC(280, 20, this, arguments, new.target); }
function sgLook(it) { return __ZC(280, 21, this, arguments, new.target); }
function sgLookClose() { var el = document.getElementById("sg-look"); if (el)
el.style.display = "none"; if (SG.spin) {
SG.spin.stop = 1;
SG.spin = null;
} }
function sgSpin(it, box) { return __ZC(280, 22, this, arguments, new.target); }
(function () {
if (typeof shopcOpen !== "function")
return;
var so = shopcOpen;
shopcOpen = function (k) { if (sgShopGoods(k).length) {
if (typeof SHOPC !== "undefined")
SHOPC.open = null;
return sgShopOpen(k);
} return so.apply(this, arguments); };
if (typeof tsTick === "function") {
var tt = tsTick;
tsTick = function () { var r = tt.apply(this, arguments); try {
if (SG.open && !(typeof shopcHere === "function" && shopcHere() === SG.open))
sgShopClose();
}
catch (e) { } return r; };
}
})();
function sgIconsLoad(i) {
if (typeof SG_ICONS === "undefined" || !SG_ICONS[i] || SG_ICONS[i].asked)
return;
SG_ICONS[i].asked = 1;
var im = new Image();
im.src = "assets/shop-icons/" + SG_ICONS[i].file;
}
(function () {
if (typeof bkpUseBtns !== "function" || typeof bkpUse !== "function")
return;
var ub = bkpUseBtns, uu = bkpUse;
bkpUseBtns = function (t, i, D) {
var it = t && SG.by[t.archetype];
if (!it)
return ub.apply(this, arguments);
var b = function (label, what) { return '<button class="btn" data-bki="' + i + '" data-bkw="' + what + '">' + label + '</button>'; };
if (it.kind === "wear")
return b(sgWearing(it) ? "Take off" : "Wear", "sgwear") + " " + b("Look", "sglook");
var hold = SG_ARMS[it.k] && sgArmsReady() ? b(sgHolding(it) ? "Put away" : "Hold", "sghold") + " " : "";
return hold + b("Place at home", "sghome") + " " + b("Set it out", "sgset") + " " + b("Look", "sglook");
};
bkpUse = function (t) {
var w = t.getAttribute("data-bkw"), ii = t.getAttribute("data-bki");
if (!/^sg/.test(w || "") || ii == null)
return uu.apply(this, arguments);
var thing = (BKP.items || [])[+ii], it = thing && SG.by[thing.archetype];
if (!it)
return true;
if (w === "sgwear")
sgWear(it, !sgWearing(it));
else if (w === "sghold") {
if (sgHolding(it)) {
if (typeof bkpStow === "function")
bkpStow();
}
else
sgHold(it);
}
else if (w === "sghome") {
sgPlaceHome(it);
return true;
}
else if (w === "sgset") {
sgSetOut(it);
}
else if (w === "sglook")
sgLook(it);
setTimeout(bkpPaint, 60);
return true;
};
if (typeof bkpPaint === "function") {
var bp = bkpPaint;
bkpPaint = function () {
var r = bp.apply(this, arguments);
try {
var el = document.getElementById("bkp-box");
if (el && BKP.open)
Array.prototype.forEach.call(el.querySelectorAll('button[data-bkw="sglook"]'), function (btn) {
var row = btn.closest("div"), thing = (BKP.items || [])[+btn.getAttribute("data-bki")], it = thing && SG.by[thing.archetype];
if (!row || !it || row.getAttribute("data-sgic"))
return;
row.setAttribute("data-sgic", "1");
var left = row.firstElementChild;
if (!left)
return;
var ic = document.createElement("span");
ic.style.cssText = "display:inline-block;vertical-align:middle;margin-right:6px";
ic.innerHTML = sgIconHtml(it, 36);
left.innerHTML = left.innerHTML.replace(/^(👕|📦)\s*/, "");
left.insertBefore(ic, left.firstChild);
sgIconsLoad(it.s);
});
}
catch (e) { }
return r;
};
}
})();
var SG_ARMS = {
sg_qp_swordbronze: { base: "longsword", dmg: 17, grip: 0.12 },
sg_qp_axebronze: { base: "battleaxe", dmg: 22, grip: 0.08 },
sg_qp_pickaxebronze: { base: "warhammer", dmg: 20, knock: 1.5, grip: 0.1 },
sg_qp_shieldwooden: { base: "roundshield", dmg: 8, reach: 1.8, arc: 1.2, cool: 0.6, ward: 0.5, knock: 2.5, shield: 1 }
};
function sgArmKey(k) { return "sg" + String(k).replace(/^sg_qp_/, ""); }
function sgArmsReady() {
if (typeof BW_ARMS === "undefined" || typeof HELD === "undefined" || typeof ARMS === "undefined")
return false;
Object.keys(SG_ARMS).forEach(function (k) {
var it = SG.by[k], S = SG_ARMS[k], key = sgArmKey(k);
if (!it || BW_ARMS[key])
return;
var base = BW_ARMS[S.base] || BW_ARMS.longsword, A = {};
for (var p in base)
A[p] = base[p];
["dmg", "reach", "arc", "cool", "ward", "knock"].forEach(function (p) { if (S[p] != null)
A[p] = S[p]; });
A.name = it.n;
A.era = "Bought";
A.bought = k;
A.held = "sgH_" + key;
HELD[A.held] = function () {
var g = new THREE.Group(), m = sgMesh(it, { noLift: true });
if (S.shield) {
m.position.set(0, 0.1 - it.z[1] / 2, -0.12);
m.rotation.y = Math.PI;
}
else
m.position.y = -S.grip;
if (S.shield)
g.userData.sgShield = 1;
g.add(m);
return g;
};
BW_ARMS[key] = A;
ARMS["bw_" + key] = { held: A.held, shot: null, name: it.n.toLowerCase() };
});
return true;
}
function sgHolding(it) { return typeof carrying !== "undefined" && !!carrying && carrying.archetype === "bw_" + sgArmKey(it.k); }
function sgArmsSync(full) { return __ZC(280, 23, this, arguments, new.target); }
function sgHold(it) { return __ZC(280, 24, this, arguments, new.target); }
(function () {
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", function () { sgArmsReady(); });
else
setTimeout(sgArmsReady, 0);
if (typeof showCarried === "function") {
var sc = showCarried;
showCarried = function () {
var r = sc.apply(this, arguments);
if (typeof carryMesh !== "undefined" && carryMesh && carryMesh.userData.sgShield)
carryMesh.rotation.y += Math.PI;
return r;
};
}
if (typeof loadThings === "function") {
var lt = loadThings;
loadThings = function () {
var r = lt.apply(this, arguments);
Promise.resolve(r).then(function (rows) { if (Array.isArray(rows) && typeof signedIn === "function" && signedIn())
sgArmsSync(true); });
return r;
};
}
if (typeof bkpKeptHtml === "function") {
var bk = bkpKeptHtml;
bkpKeptHtml = function () {
var K = store.kept;
if (!Array.isArray(K))
return bk.apply(this, arguments);
store.kept = K.filter(function (q) { return !/^bw_sg[a-z]+$/.test(q.a); });
try {
return bk.apply(this, arguments);
}
finally {
store.kept = K;
}
};
}
})();
function sgIconSheet(s, cell, cols) { return __ZC(280, 25, this, arguments, new.target); }
