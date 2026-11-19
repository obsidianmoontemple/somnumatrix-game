/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var LP = { b: null, busy: false, at: 0, say: "", sure: "", view: "map", d: 1, plot: null, ed: null, edSel: -1, edCat: "build", g: null, key: "", cityId: null,
sk: {}, built: {}, solid: [], doors: [], sale: {}, signs: [], mats: {}, seen: 0 };
var LP_D = [null,
{ gap: 15, band: 0 }, { gap: 14, band: 0 }, { gap: 11, band: 0 }, { gap: 13, band: 0 },
{ gap: 15, band: 1 }, { gap: 14, band: 1 }, { gap: 11, band: 1 }, { gap: 13, band: 1 }];
var LP_RS = [1885, 2015];
var LP_ROAD = 4, LP_PAVE = 2.6;
var LP_W = 34, LP_DEEP = 40;
var LP_USE = { homes: "🏡 Homes", shops: "🛍️ Shops", gardens: "🌷 Gardens", workshops: "🔨 Workshops" };
var LP_USE_NOTE = { homes: "houses and cottages with their gardens", shops: "shopfronts with awnings along the pavement", gardens: "gardens, ponds and orchards, with benches on the street", workshops: "yards, barns and sheds where things are made" };
function lpMid(id) { var D = LP_D[id]; return 0.19 + (D.gap + 0.5) * Math.PI / 8; }
function lpRs(id) { return LP_RS[LP_D[id].band]; }
function lpPlotGeo(id, n) { return __ZC(436, 0, this, arguments, new.target); }
function lpW(G, lx, lz) { var c = Math.cos(G.rot), s = Math.sin(G.rot); return { x: G.x + lx * c + lz * s, z: G.z - lx * s + lz * c }; }
function lpLocal(G, x, z) { var dx = x - G.x, dz = z - G.z, c = Math.cos(G.rot), s = Math.sin(G.rot); return { x: dx * c - dz * s, z: dx * s + dz * c }; }
function lpHalfArc(id) { return (LP_ROAD + LP_PAVE + 6 + 3 * (LP_W + 4) + 14) / lpRs(id); }
function lpInDistrict(x, z, pad) {
if (typeof ATLC === "undefined" || !ATLC)
return 0;
var dx = x - ATLC.x, dz = z - ATLC.z, r = Math.hypot(dx, dz), a = Math.atan2(dz, dx);
for (var id = 1; id < LP_D.length; id++) {
var rs = lpRs(id), dr = LP_ROAD + LP_PAVE + LP_DEEP + 2 + (pad || 0);
if (Math.abs(r - rs) > dr)
continue;
if (Math.abs(atlWrap(a - lpMid(id))) * r < lpHalfArc(id) * rs + (pad || 0))
return id;
}
return 0;
}
function lpSigned() { return typeof signedIn === "function" && signedIn(); }
function lpLoad(force) {
if (LP.busy && Date.now() - LP.at > 20000)
LP.busy = false;
if (LP.busy || (!force && Date.now() - LP.at < 45000) || typeof cityRpc !== "function" || !lpSigned())
return;
LP.busy = true;
LP.at = Date.now();
cityRpc("land_board", {}).then(function (o) { if (o && o.ok) {
LP.b = o;
lpModels();
} })
.catch(function (e) { var m = String(e && e.message || e || ""); if (/function|404|schema/i.test(m))
LP.missing = true; })
.then(function () { LP.busy = false; lpDress(); if (CTY.open && CTY.tab === "land")
ctyPaint(); });
}
function lpAct(name, args, then) {
CTY.say = "…";
ctyPaint();
cityRpc(name, args).then(function (o) { CTY.say = (o && o.say) || ""; LP.sure = ""; if (then)
then(o); LP.busy = false; lpLoad(true); })
.catch(function () { CTY.say = "That did not go through. Try again in a moment."; ctyPaint(); });
}
function lpModels() { return __ZC(436, 1, this, arguments, new.target); }
function lpDistrict(id) { return ((LP.b && LP.b.districts) || []).filter(function (d) { return d.id === id; })[0] || null; }
function lpPlot(id) { return ((LP.b && LP.b.plots) || []).filter(function (p) { return p.id === id; })[0] || null; }
function lpG(n) { return Number(n || 0).toLocaleString(); }
"use strict";
function lpLite() { return typeof LITE !== "undefined" && !!LITE; }
function lpMat(k, col, tex, o) { return __ZC(436, 2, this, arguments, new.target); }
function lpFlat(pts, y, mat) { return __ZC(436, 3, this, arguments, new.target); }
function lpTri(idx, pos, a, b, c) {
var ax = pos[a * 3], az = pos[a * 3 + 2], ux = pos[b * 3] - ax, uz = pos[b * 3 + 2] - az, vx = pos[c * 3] - ax, vz = pos[c * 3 + 2] - az;
if (uz * vx - ux * vz > 0)
idx.push(a, b, c);
else
idx.push(a, c, b);
}
function lpArcPts(r0, r1, a0, a1) { var n = Math.max(2, Math.ceil(Math.abs(a1 - a0) * (r0 + r1) / 2 / 6)), P = []; for (var i = 0; i <= n; i++) {
var a = a0 + (a1 - a0) * i / n;
P.push({ x: Math.cos(a) * r0, z: Math.sin(a) * r0 }, { x: Math.cos(a) * r1, z: Math.sin(a) * r1 });
} return P; }
function lpRadPts(a, hw, r0, r1) { var c = Math.cos(a), s = Math.sin(a), px = -s * hw, pz = c * hw; return [{ x: c * r0 - px, z: s * r0 - pz }, { x: c * r0 + px, z: s * r0 + pz }, { x: c * r1 - px, z: s * r1 - pz }, { x: c * r1 + px, z: s * r1 + pz }]; }
function lpBox(g, w, h, d, mat, x, y, z, ry, tex) { var geo = new THREE.BoxGeometry(w, h, d); if (tex && typeof metreUVs === "function")
metreUVs(geo, "box", [w, h, d]); var m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); if (ry)
m.rotation.y = ry; m.castShadow = !lpLite(); m.receiveShadow = true; g.add(m); return m; }
function lpCyl(g, r, h, mat, x, y, z, seg, r2) { var m = new THREE.Mesh(new THREE.CylinderGeometry(r2 === undefined ? r : r2, r, h, seg || 8), mat); m.position.set(x, y, z); m.castShadow = !lpLite(); g.add(m); return m; }
function lpAt(r, a) { return { x: Math.cos(a) * r, z: Math.sin(a) * r }; }
function lpLamp(g, x, y, z, face) { return __ZC(436, 4, this, arguments, new.target); }
function lpTree(g, x, y, z, seed, s) { return __ZC(436, 5, this, arguments, new.target); }
function lpBench(g, x, y, z, ry) { return __ZC(436, 6, this, arguments, new.target); }
function lpPlanter(g, x, y, z, ry, seed) { return __ZC(436, 7, this, arguments, new.target); }
function lpSignTex(lines, w, h, bg, fg, accent) { return __ZC(436, 8, this, arguments, new.target); }
function lpBoard(g, x, y, z, ry, lines, W, H, o) { return __ZC(436, 9, this, arguments, new.target); }
function lpStreet(id, G0) { return __ZC(436, 10, this, arguments, new.target); }
function lpBunting(g, rs, am, half, y) { return __ZC(436, 11, this, arguments, new.target); }
function lpFountain(g, rs, am, y) { return __ZC(436, 12, this, arguments, new.target); }
function lpYardThings(g, rs, am, y) { return __ZC(436, 13, this, arguments, new.target); }
function lpPlotGround(g, G, p, D) { return __ZC(436, 14, this, arguments, new.target); }
var LP_SKIN = { brick: ["brick", 0xB06A4E], glass: ["glass", 0x8AA8BC], metal: ["metal", 0xA8B0B8], concrete: ["concrete", 0xB8B6B0], plaster: ["plaster", 0xE8E0D0], wood: ["wood", 0xA87A4E], stone: ["stone", 0xB8AE9C], timber: ["wood", 0xA87A4E] };
function lpStudioSpec(t) { var S = typeof ptxRead === "function" ? ptxRead(t) : { type: "office", storeys: 1, w: 16, d: 12, skin: "brick", title: "Building", name: "Building", text: t }; return S; }
function lpStudioSize(S) { return { w: Math.max(8, Math.min(30, S.w)), d: Math.max(8, Math.min(30, S.d)), h: S.storeys * (S.type === "house" ? 3.0 : 3.8) }; }
function lpStudio(S, lite) { return __ZC(436, 15, this, arguments, new.target); }
function lpPieceSize(e) {
if (e.k === "kit") {
var K = KIT[e.a];
return K ? { w: K.size[0], d: K.size[2], h: K.size[1] } : { w: 2, d: 2, h: 2 };
}
if (e.k === "studio")
return lpStudioSize(lpStudioSpec(e.t));
var m = typeof MW !== "undefined" && MW.by && MW.by[e.a];
var s = (m && m.size) || [1, 1, 1];
return { w: +s[0] || 1, d: +s[2] || 1, h: +s[1] || 1 };
}
function lpBuildPlot(G, p, list) { return __ZC(436, 16, this, arguments, new.target); }
function lpFree(g) {
if (!g)
return;
if (g.parent)
g.parent.remove(g);
g.traverse(function (m) {
if (!m.isMesh)
return;
if (m.geometry && (m.name === "gw-bake" || m.userData.lpOwn))
m.geometry.dispose();
var mt = m.material;
if (mt && mt.map && mt.map.lpOwn) {
mt.map.dispose();
mt.dispose();
}
});
}
function lpUnbuild(B) {
if (!B)
return;
B.specs.forEach(function (s) { if (typeof removeSpec === "function")
removeSpec(s); });
B.groups.forEach(function (g) { if (g.userData.lpStudio)
lpFree(g);
else if (g.parent)
g.parent.remove(g); });
}
function lpTeardown() {
if (LP.g) {
lpFree(LP.g);
LP.g = null;
}
Object.keys(LP.built).forEach(function (k) { lpUnbuild(LP.built[k].B); });
LP.built = {};
LP.sk = {};
LP.key = "";
LP.solid = [];
LP.doors = [];
LP.sale = {};
LP.signs = [];
}
function lpDress() {
if (typeof ATLC === "undefined" || !ATLC || typeof scene === "undefined" || !scene)
return;
var cr = somnucorRealm();
if (!cr)
return;
if (LP.cityId !== null && LP.cityId !== ATLC.id) {
lpTeardown();
}
LP.cityId = ATLC.id;
var B = LP.b;
if (!B)
return;
var key = JSON.stringify((B.districts || []).map(function (d) { return [d.id, d.status, d.use, d.need, d.price, d.vote_until, d.sold]; })) + "|" + B.payers + "|" + lpLite();
if (key !== LP.key) {
if (LP.g)
lpFree(LP.g);
LP.key = key;
LP.sale = {};
LP.signs = [];
var root = new THREE.Group();
root.name = "land-plots";
root.userData.noCull = 1;
for (var id = 1; id < LP_D.length; id++) {
var y0 = typeof terrainY === "function" ? terrainY(ATLC.x + Math.cos(lpMid(id)) * lpRs(id), ATLC.z + Math.sin(lpMid(id)) * lpRs(id)) : 25;
var sg = lpStreet(id, { y: y0 });
root.add(sg);
var D = lpDistrict(id);
if (D && D.status === "open") {
var pg = new THREE.Group();
pg.position.set(ATLC.x, 0, ATLC.z);
pg.name = "land-plots-" + id;
for (var n = 1; n <= 12; n++) {
var G = lpPlotGeo(id, n);
lpPlotGround(pg, G, lpPlot(G.id), D);
}
if (typeof gwBake === "function")
try {
gwBake(pg);
}
catch (e) { }
root.add(pg);
}
}
LP.g = root;
scene.add(root);
Object.keys(LP.built).forEach(function (k) { LP.built[k].key = ""; });
}
var want = {};
(B.plots || []).forEach(function (p) {
var D = lpDistrict(p.d);
if (!D || D.status !== "open")
return;
var list = (LP.ed && LP.ed.id === p.id) ? LP.ed.build : p.build;
if (!list || !list.length)
return;
want[p.id] = 1;
var k = JSON.stringify(list) + "|" + (p.name || "") + "|" + (LP.ed && LP.ed.id === p.id ? LP.ed.name : "") + "|" + lpLite(), cur = LP.built[p.id];
var alive = cur && cur.B.specs.every(function (s) { return store.objects.indexOf(s) >= 0; });
if (cur && cur.key === k && alive)
return;
if (cur)
lpUnbuild(cur.B);
LP.built[p.id] = { key: k, B: lpBuildPlot(lpPlotGeo(p.d, p.n), p, list) };
});
Object.keys(LP.built).forEach(function (k) { if (!want[k]) {
lpUnbuild(LP.built[k].B);
delete LP.built[k];
} });
LP.solid = [];
LP.doors = [];
Object.keys(LP.built).forEach(function (k) { var b = LP.built[k].B; LP.solid = LP.solid.concat(b.solid); LP.doors = LP.doors.concat(b.doors); });
lpVis();
}
function lpVis() { return __ZC(436, 17, this, arguments, new.target); }
"use strict";
var LP_BUILDINGS = [["cottage", "Cottage"], ["house", "House"], ["farmhouse", "Farmhouse"], ["shop", "Shop"], ["teahouse", "Tea house"], ["barn", "Barn"], ["stable", "Stable"],
["garage", "Garage"], ["shed", "Shed"], ["hanok", "Hanok"], ["machiya", "Machiya"], ["izba", "Log house"], ["cycladic", "Island house"], ["stilthouse", "Stilt house"],
["roundhouse", "Roundhouse"], ["riad", "Riad"], ["pueblo", "Pueblo"], ["yurt", "Yurt"], ["toadstoolhouse", "Toadstool house"], ["candyhouse", "Sweet house"],
["windmill", "Windmill"], ["chapel", "Chapel"], ["firehouse", "Fire house"]];
var LP_YARD = [["tree", "Tree"], ["pine", "Pine"], ["bush", "Bush"], ["hedge", "Hedge"], ["flowers", "Flowers"], ["flowerbed", "Flower bed"], ["topiary", "Topiary"], ["bonsai", "Bonsai"],
["pond", "Pond"], ["koipond", "Koi pond"], ["zengarden", "Raked garden"], ["fountain", "Fountain"], ["tiledfountain", "Tiled fountain"], ["tierfountain", "Grand fountain"], ["well", "Well"],
["gazebo", "Gazebo"], ["bench", "Bench"], ["lanternpost", "Lantern post"], ["ornatelamp", "Lamp"], ["streetlight", "Street light"], ["fence", "Fence"], ["ironfence", "Iron railings"],
["stonewall", "Stone wall"], ["marketstall", "Market stall"], ["marketawning", "Awning"], ["playground", "Playground"], ["pool", "Swimming pool"], ["haybale", "Hay bale"],
["scarecrow", "Scarecrow"], ["washing", "Washing line"], ["mailbox", "Post box"], ["crates", "Crates"], ["barrel", "Barrel"], ["cart", "Cart"], ["wagon", "Wagon"], ["tractor", "Tractor"],
["herostatue", "Statue"], ["plinth", "Plinth"], ["stringlights", "String lights"], ["paperlanterns", "Paper lanterns"], ["brazier", "Brazier"], ["handpump", "Water pump"],
["cornstalk", "Corn"], ["wheat", "Wheat"], ["field", "Crop field"], ["lawn", "Lawn"], ["driveway", "Driveway"], ["trashcan", "Bin"]];
function lpName(e) { return __ZC(436, 18, this, arguments, new.target); }
function lpBtn(act, label, attrs, on) { return '<button class="btn" data-cty="' + act + '"' + (attrs || "") + ' style="margin:3px 4px 3px 0;' + (on ? "border-color:#E8C67A;color:#F2E6C4" : "") + '">' + label + '</button>'; }
function lpBoxHtml(inner, gold) { return '<div style="border:1px solid ' + (gold ? "#C9A868" : "#2A3040") + ';border-radius:6px;padding:8px 10px;margin-bottom:8px">' + inner + '</div>'; }
function lpDim(s) { return '<div style="color:#9AA3B5;margin:3px 0">' + s + '</div>'; }
function lpDay(t) { var d = new Date(t); return d.toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" }) + ", " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); }
function lpHtml() { return __ZC(436, 19, this, arguments, new.target); }
function lpMapHtml() { return __ZC(436, 20, this, arguments, new.target); }
function lpPlotsHtml() { return __ZC(436, 21, this, arguments, new.target); }
function lpEditStart(id) {
var p = lpPlot(id);
if (!p)
return;
LP.ed = { id: id, name: p.name || "", build: JSON.parse(JSON.stringify(p.build || [])), dirty: false };
LP.edSel = LP.ed.build.length ? 0 : -1;
LP.edCat = "build";
LP.sure = "";
lpDress();
}
function lpFoot(e) { var Z = lpPieceSize(e), odd = (e.r || 0) % 2 === 1; return { w: odd ? Z.d : Z.w, d: odd ? Z.w : Z.d }; }
function lpClamp(e) { var F = lpFoot(e), mx = Math.max(0, 16 - F.w / 2 + 0.5), mz = Math.max(0, 19 - F.d / 2 + 0.5); e.x = Math.round(Math.max(-Math.min(16, mx), Math.min(Math.min(16, mx), e.x)) * 10) / 10; e.z = Math.round(Math.max(-Math.min(19, mz), Math.min(Math.min(19, mz), e.z)) * 10) / 10; }
function lpOverlaps(e, skip) { var F = lpFoot(e); return LP.ed.build.some(function (o, i) { if (i === skip)
return false; var G = lpFoot(o); return Math.abs(o.x - e.x) < (F.w + G.w) / 2 && Math.abs(o.z - e.z) < (F.d + G.d) / 2; }); }
function lpFreeSpot(e) {
var F = lpFoot(e), big = F.w * F.d > 30;
for (var zz = 0; zz <= 38; zz += 2) {
var z = big ? -19 + F.d / 2 + zz : 19 - F.d / 2 - zz;
for (var xx = 0; xx <= 32; xx += 2) {
var x = (xx / 2 % 2 ? 1 : -1) * Math.ceil(xx / 4) * 2;
e.x = x;
e.z = z;
lpClamp(e);
if (!lpOverlaps(e, -1))
return true;
}
}
e.x = 0;
e.z = 0;
return false;
}
function lpAdd(e) { return __ZC(436, 22, this, arguments, new.target); }
function lpEditHtml() { return __ZC(436, 23, this, arguments, new.target); }
function lpPlanDraw() { return __ZC(436, 24, this, arguments, new.target); }
function lpEditClick(t, a) { return __ZC(436, 25, this, arguments, new.target); }
function lpClick(t, a) { return __ZC(436, 26, this, arguments, new.target); }
"use strict";
(function () {
if (typeof ctyHtml !== "function" || typeof ctyClick !== "function" || typeof ctyPaint !== "function")
return;
var TABS = [["weather", "Weather"], ["projects", "Projects"], ["prices", "Prices"], ["council", "🗳️ Council"], ["market", "⚖️ Market House"], ["land", "🏡 Land"]];
var html0 = ctyHtml;
ctyHtml = function () {
if (CTY.tab !== "land")
return html0.apply(this, arguments).replace(/(data-t="market"[^>]*>[^<]*<\/button>)/, '$1<button class="btn" data-cty="tab" data-t="land">🏡 Land</button>');
var h = '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><b style="font-size:15px;flex:1">🏙️ The city</b><button class="btn" data-cty="close">Close</button></div>';
h += '<div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap">' + TABS.map(function (t) { return '<button class="btn" data-cty="tab" data-t="' + t[0] + '" style="' + (CTY.tab === t[0] ? "border-color:#E8C67A;color:#F2E6C4" : "") + '">' + t[1] + '</button>'; }).join("") + '</div>';
if (CTY.say)
h += '<div style="margin:0 0 8px;color:#E8D9B0">' + esc(CTY.say) + '</div>';
return h + lpHtml();
};
var paint0 = ctyPaint;
ctyPaint = function () {
var keep = {}, el = document.getElementById("cty-box");
if (el)
el.querySelectorAll("#lp-name,#lp-studio").forEach(function (f) { keep[f.id] = f.value; });
paint0.apply(this, arguments);
if (LP.ed && keep["lp-name"] === undefined)
keep["lp-name"] = LP.ed.name;
Object.keys(keep).forEach(function (id) { var f = document.getElementById(id); if (f)
f.value = keep[id]; });
if (CTY.open && CTY.tab === "land")
try {
lpPlanDraw();
}
catch (e) { }
};
var click0 = ctyClick;
ctyClick = function (e) {
var t = e.target.closest && e.target.closest("[data-cty]");
if (!t)
return;
var a = t.getAttribute("data-cty");
if (a === "tab" && t.getAttribute("data-t") === "land") {
CTY.tab = "land";
CTY.say = "";
ctyPaint();
lpLoad(true);
return;
}
if (a === "close" && LP.ed) {
var nm = document.getElementById("lp-name");
if (nm)
LP.ed.name = nm.value;
}
if (/^lp/.test(a)) {
lpClick(t, a);
return;
}
return click0.apply(this, arguments);
};
var el = document.getElementById("cty-box");
if (el) {
el.removeEventListener("click", click0);
el.addEventListener("click", ctyClick);
}
var open0 = ctyOpen;
ctyOpen = function (tab) { if (tab === "land")
CTY.tab = "land"; var r = open0.apply(this, arguments); if (CTY.tab === "land")
lpLoad(true); return r; };
if (typeof CV_KIND !== "undefined")
CV_KIND.district = "🏘️ What a new street becomes";
})();
function lpOpenLand(view, id) { LP.view = view || "map"; if (view === "plots") {
LP.d = Math.floor(id / 100) || id;
LP.plot = id > 100 ? id : null;
} CTY.tab = "land"; ctyOpen("land"); }
function lpPromptHere() {
if (!LP.b || typeof ATLC === "undefined" || !ATLC || !(typeof ctyIn === "function" && ctyIn()))
return null;
var P = camera.position, i, best = null, bd = 1e9;
if (!lpInDistrict(P.x, P.z, 30))
return null;
for (i = 0; i < LP.doors.length; i++) {
var dr = LP.doors[i], d = Math.hypot(P.x - dr.x, P.z - dr.z);
if (d < 2.4 && d < bd) {
bd = d;
best = dr;
}
}
if (best)
return { html: "🏗️ <b>" + esc(best.name) + "</b>" + (best.owner ? " · built by " + esc(best.owner) : "") + " · <b>press E</b> to go in", fn: function () { lpVisit(best.S); } };
for (i = 0; i < LP.signs.length; i++) {
var s = LP.signs[i];
if (Math.hypot(P.x - s.x, P.z - s.z) < 3.5) {
var D = lpDistrict(s.d);
return { html: "🏡 <b>" + esc(D ? D.name : "The new street") + "</b> · <b>press E</b> to see its plots", fn: function () { lpOpenLand("plots", s.d); } };
}
}
var id = lpInDistrict(P.x, P.z, 0);
if (!id)
return null;
for (var n = 1; n <= 12; n++) {
var G = lpPlotGeo(id, n), L = lpLocal(G, P.x, P.z);
if (Math.abs(L.x) > LP_W / 2 + 0.5 || Math.abs(L.z) > LP_DEEP / 2 + 1.5)
continue;
var p = lpPlot(G.id), D2 = lpDistrict(id);
if (!p)
return null;
if (p.mine)
return { html: "🏡 <b>" + esc(p.name || ("Your plot, " + D2.name)) + "</b> · <b>press E</b> to build", fn: function () { lpEditStart(p.id); lpOpenLand("map"); } };
if (!p.owner)
return { html: "🏷️ <b>Plot " + n + ", " + esc(D2.name) + "</b> · for sale, " + lpG(D2.price) + " gold · <b>press E</b>", fn: function () { lpOpenLand("plots", p.id); } };
return null;
}
return null;
}
(function () {
if (typeof ctyPromptTick !== "function")
return;
var pt0 = ctyPromptTick;
ctyPromptTick = function () {
var b = null;
try {
b = lpPromptHere();
}
catch (e) { }
if (b) {
if (b.html !== CTY.promptKey) {
CTY.promptKey = b.html;
if (typeof worldPromptCity === "function")
worldPromptCity(b.html, b.fn);
}
return;
}
return pt0.apply(this, arguments);
};
})();
function lpVisit(S) { return __ZC(436, 27, this, arguments, new.target); }
(function () {
if (typeof blockedAt !== "function")
return;
var ba = blockedAt;
blockedAt = function (x, z, feet) {
if (LP.solid.length && !(typeof store !== "undefined" && store.inside) && !(typeof WLD !== "undefined" && WLD.on)) {
for (var i = 0; i < LP.solid.length; i++) {
var S = LP.solid[i];
if (Math.abs(x - S.x) > 40 || Math.abs(z - S.z) > 40)
continue;
var dx = x - S.x, dz = z - S.z, c = Math.cos(S.rot), s = Math.sin(S.rot), lx = dx * c - dz * s, lz = dx * s + dz * c;
if (Math.abs(lx) < S.hw && Math.abs(lz) < S.hd && (feet === undefined || feet < S.h))
return true;
}
}
return ba.apply(this, arguments);
};
})();
(function () {
function guard(name, pad) {
var f = window[name];
if (typeof f !== "function")
return;
window[name] = function (x, z) { try {
if (lpInDistrict(x, z, pad))
return false;
}
catch (e) { } return f.apply(this, arguments); };
}
guard("ctyClear", 12);
guard("rmapFree", 4);
guard("dkFree", 6);
})();
(function () {
if (typeof tnRows !== "function")
return;
var tr = tnRows;
tnRows = function () {
var rows = tr.apply(this, arguments);
try {
(LP.b && LP.b.districts || []).forEach(function (d) {
if (d.status === "vote")
rows.push(["🏘️", "<b>" + esc(d.name) + " is surveyed</b>: the High Council chooses what the new street becomes (☰ Menu → 🏙️ City → 🏡 Land)", false]);
else if (d.status === "open" && d.opened_at && Date.now() - new Date(d.opened_at).getTime() < 3 * 86400000 && d.id > 1)
rows.push(["🏘️", "<b>" + esc(d.name) + " has opened</b> in the Harvest Ring: plots for sale (☰ Menu → 🏙️ City → 🏡 Land)", false]);
});
}
catch (e) { }
return rows;
};
})();
setInterval(function () {
try {
var inCity = typeof ATLC !== "undefined" && ATLC && typeof ctyIn === "function" && ctyIn();
if (inCity || CTY.open && CTY.tab === "land")
lpLoad(false);
if (typeof ATLC !== "undefined" && ATLC && LP.b) {
if (!LP.g || LP.cityId !== ATLC.id)
lpDress();
else {
var vis = false;
for (var k in LP.built) {
if (LP.built[k].B.specs.some(function (s) { return store.objects.indexOf(s) < 0; })) {
vis = true;
break;
}
}
if (vis)
lpDress();
else
lpVis();
}
}
else if (LP.g && (typeof ATLC === "undefined" || !ATLC))
lpTeardown();
}
catch (e) {
if (!LP.warned && window.console) {
LP.warned = 1;
console.warn("[land-plots]", e);
}
}
}, 1500);
if (typeof backRegister === "function")
backRegister({ order: 1, open: function () { return CTY.open && CTY.tab === "land" && (!!LP.ed || LP.view === "plots"); }, close: function () { if (LP.ed) {
LP.ed = null;
lpDress();
}
else
LP.view = "map"; ctyPaint(); } });
