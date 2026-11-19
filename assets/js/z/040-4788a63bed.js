/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(40, function () {
"use strict";
return [
function () {
if (typeof KIT === "undefined")
return 0;
var widest = 0;
DISTRICT_CYCLE.forEach(function (a) { if (KIT[a])
widest = Math.max(widest, KIT[a].size[0], KIT[a].size[2]); });
var step = Math.max(60, widest * 1.15), rowGap = widest * 0.62 + 70;
var rowsNeeded = Math.ceil(DISTRICT_HOMES.length / DISTRICT_ROW_CAP);
var maxPer = Math.ceil(DISTRICT_ROW_CAP / 2), span = maxPer * step;
var along0 = (rowsNeeded - 1) * rowGap, depth = widest * 0.55 + 18;
var rr = DISTRICT_R + along0 + depth;
return Math.hypot(rr, span / 2 + 20);
},
function () {
if (!signedIn())
return Promise.reject(new Error("Sign in first."));
var plots = (store.districtPlots || []);
if (!plots.length)
return Promise.reject(new Error("There is no District laid out yet."));
var done = 0, failed = 0;
function one(i) {
if (i >= plots.length) {
setStatus("<b>" + done + " District plots entered in the books.</b>" + (failed ? (" " + failed + " were refused.") : ""));
return loadLots();
}
var p = plots[i];
return cityRpc("section_lot", { p_name: p.name, p_quarter: p.quarter, p_kind: "district", p_x: p.x, p_z: p.z, p_w: 30, p_d: 30 })
.then(function (id) { done++; return cityRpc("price_lot", { p_lot: id, p_price: 0, p_rent: 0, p_sale: false, p_let: false }); })
.catch(function () { failed++; })
.then(function () { return one(i + 1); });
}
setStatus("Entering the District's plots in the books…");
return one(0);
},
function () {
if (!signedIn())
return Promise.reject(new Error("Sign in first."));
var plots = (store.plots || []);
if (!plots.length)
return Promise.reject(new Error("There are no plots laid out yet."));
var done = 0, failed = 0;
function one(i) {
if (i >= plots.length) {
setStatus("<b>" + done + " plots entered in the books.</b>" + (failed ? (" " + failed + " were refused.") : ""));
return loadLots();
}
var p = plots[i];
return cityRpc("section_lot", { p_name: p.name, p_quarter: p.quarter, p_kind: p.kind,
p_x: p.x, p_z: p.z, p_w: 34, p_d: 34 })
.then(function (id) {
done++;
return cityRpc("price_lot", { p_lot: id, p_price: p.price, p_rent: p.rent, p_sale: true, p_let: true });
})
.catch(function () { failed++; })
.then(function () { return one(i + 1); });
}
setStatus("Entering the plots in the books\u2026");
return one(0);
},
function () {
var plots = (store.plots || []).concat(store.districtPlots || []);
if (!plots.length || !cityLots.length)
return;
plots.forEach(function (p) {
var rec = lotByName(p.name);
if (!rec || !rec.decor)
return;
var built = rec.decor.built;
if (built && KIT[built] && built !== p.archetype && p.homeId) {
var home = store.objects.filter(function (o) { return o.id === p.homeId; })[0];
if (home) {
home.archetype = built;
p.archetype = built;
if (typeof refresh === "function")
refresh(home);
}
}
});
},
function () {
if (buildCostsCache)
return Promise.resolve(buildCostsCache);
return freshToken().then(function (tok) {
return fetch(DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/rest/v1/build_costs?select=archetype,kind,amount&order=archetype", {
headers: { apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + (tok || DW_CONFIG.supabaseKey) }
}).then(function (r) { return r.ok ? r.json() : []; });
}).then(function (rows) {
var byArch = {};
(rows || []).forEach(function (r) { (byArch[r.archetype] = byArch[r.archetype] || []).push(r); });
buildCostsCache = byArch;
return byArch;
}).catch(function () { return {}; });
},
function (rec, board) {
if (!rec || !ownLot(rec.lot_id))
return setStatus("Only ground you hold can be built on.");
loadBuildCosts().then(function (byArch) {
var archs = Object.keys(byArch);
if (!archs.length)
return setStatus("Nobody knows how to build anything here yet.");
var menu = archs.map(function (a, i) {
return (i + 1) + ". " + a + " (" + byArch[a].map(function (c) { return c.amount + " " + c.kind; }).join(", ") + ")";
}).join("\n");
var pick = (prompt("Raise what on " + rec.name + "?\n\n" + menu + "\n\nType the name:") || "").trim().toLowerCase();
if (!pick || archs.indexOf(pick) < 0)
return;
raiseBuilding(rec.lot_id, pick, board);
});
},
function (lotId, archetype, board) {
return cityRpc("raise_building", { p_lot: lotId, p_archetype: archetype }).then(function (o) {
if (o !== "ok") {
setStatus(esc(String(o)));
return;
}
setStatus("<b>Raised.</b> " + esc(archetype) + " now stands there.");
if (board && board.plot && board.plot.homeId && KIT[archetype]) {
var home = store.objects.filter(function (x) { return x.id === board.plot.homeId; })[0];
if (home) {
home.archetype = archetype;
if (typeof refresh === "function")
refresh(home);
if (typeof save === "function")
save();
}
board.plot.archetype = archetype;
}
lotsAt = 0;
return loadLots();
}).catch(function (e) { setStatus(esc(e.message)); });
},
function (lotId, note) {
return freshToken().then(function (tok) {
return fetch(DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/rest/v1/lots?select=decor&id=eq." + lotId, {
headers: { apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + (tok || DW_CONFIG.supabaseKey) }
}).then(function (r) { return r.ok ? r.json() : []; });
}).then(function (rows) {
var decor = (rows && rows[0] && rows[0].decor) || {};
decor.dressed = note;
return cityRpc("dress_lot", { p_lot: lotId, p_decor: decor });
}).then(function (o) {
setStatus(o === "ok" ? "<b>Dressed.</b>" : esc(String(o)));
lotsAt = 0;
return loadLots();
}).catch(function (e) { setStatus(esc(e.message)); });
},
function (name) {
if (yardPrices)
return Promise.resolve(yardPrices[name] || null);
return catalogueRead("select=id,name,price,speed,note&listed=eq.true", false).catch(function () { return []; }).then(function (rows) {
yardPrices = {};
(rows || []).forEach(function (r) { yardPrices[r.name] = r; });
return yardPrices[name] || null;
}).catch(function () { return null; });
}
];
});
