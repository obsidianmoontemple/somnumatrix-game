/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(319, function () {
"use strict";
return [
function (o, then) {
if (!o)
return o;
if (o.say && typeof setStatus === "function")
setStatus(o.ok === false ? esc(o.say) : "<b>" + esc(o.say) + "</b>");
if (o.ok !== false) {
if (o.food != null && typeof needsGot === "function")
try {
needsGot(Object.assign({ events: [] }, o));
}
catch (e) { }
if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
if (typeof BKP !== "undefined" && BKP.open && typeof bkpLoad === "function")
try {
bkpLoad();
}
catch (e) { }
}
if (then)
try {
then(o);
}
catch (e) { }
return o;
},
function () {
if (typeof INT === "undefined" || !INT || !INT.root)
return null;
var P = camera.position, fy = (INT.level || 0) * (INT.floor || 4), best = null, bd = 2.4;
INT.root.children.forEach(function (c) {
var k = c.userData && c.userData.furn, a = k && CGAP.acts[k];
if (!a)
return;
if (Math.abs(c.position.y - fy) > 1.2)
return;
if (a.when && !a.when())
return;
var d = Math.hypot(P.x - (INT.ox + c.position.x), P.z - (INT.oz + c.position.z));
if (d < (a.r || bd) && d < bd + 1) {
bd = d;
best = { a: a, k: k, c: c };
}
});
return best;
},
function (where) {
if (typeof INT === "undefined" || !INT || !INT.root)
return null;
var P = camera.position, fy = (INT.level || 0) * (INT.floor || 4), best = null, bd = 2.2;
INT.root.children.forEach(function (c) {
var k = c.userData && c.userData.furn;
if (!k)
return;
var how = GAP_BED.test(k) ? "sleep" : GAP_WASH.test(k) ? "wash" : null;
if (!how)
return;
if (where === "bathhouse" && how !== "wash")
return;
if (Math.abs(c.position.y - fy) > 1.2)
return;
var d = Math.hypot(P.x - (INT.ox + c.position.x), P.z - (INT.oz + c.position.z));
if (d < bd) {
bd = d;
best = { how: how, k: k };
}
});
return best;
},
function (title, html, wire) {
if (!GAPP.el) {
var d = document.createElement("div");
d.id = "gap-panel";
d.style.cssText = "position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:60;width:min(420px,calc(100vw - 32px));max-height:min(78vh,620px);overflow:auto;" +
"background:rgba(20,18,24,.96);color:#EDE6DA;border:1px solid rgba(232,194,122,.45);border-radius:12px;padding:14px 16px;font:14px/1.45 system-ui,sans-serif;box-shadow:0 10px 40px rgba(0,0,0,.5)";
document.body.appendChild(d);
GAPP.el = d;
if (typeof backRegister === "function")
backRegister({ order: 3, open: function () { return GAPP.el && GAPP.el.style.display !== "none"; }, close: gapClose });
}
GAPP.el.innerHTML = "<div style='display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px'><b style='font-size:16px;color:#E8C27A'>" + esc(title) + "</b>" +
"<button class='btn' id='gap-x' style='min-width:40px'>✕</button></div>" + html;
GAPP.el.style.display = "block";
document.getElementById("gap-x").onclick = gapClose;
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
if (wire)
try {
wire(GAPP.el);
}
catch (e) {
if (window.console)
console.warn("gap panel:", e);
}
},
function (title, intro, rows) {
var h = (intro ? "<div style='opacity:.85;margin-bottom:10px'>" + intro + "</div>" : "") + rows.map(function (r, i) {
return "<div style='display:flex;justify-content:space-between;align-items:center;gap:10px;padding:7px 0;border-top:1px solid rgba(255,255,255,.07)'>" +
"<span>" + r[0] + (r[1] ? "<br><span style='opacity:.7;font-size:12px'>" + r[1] + "</span>" : "") + "</span>" +
(r[2] ? "<button class='btn' data-gi='" + i + "' style='min-height:40px;min-width:76px'>" + (r[3] || "Go") + "</button>" : "") + "</div>";
}).join("");
gapPanel(title, h, function (el) {
Array.prototype.forEach.call(el.querySelectorAll("[data-gi]"), function (b) { b.onclick = function () { var r = rows[+b.dataset.gi]; if (r && r[2])
r[2](b); }; });
});
},
function (spot) {
if (CGAP.fishing)
return;
if (!(typeof signedIn === "function" && signedIn())) {
setStatus("Sign in first, and what you catch goes to your backpack.");
return;
}
var F = { spot: spot, t0: performance.now(), bite: 2500 + Math.random() * 6500, done: false };
CGAP.fishing = F;
setStatus("<b>You cast your line</b> into " + esc(spot.name || "the water") + ". Wait for the float to dip…");
if (typeof playTone === "function")
playTone(330, 0.12);
var el = document.createElement("button");
el.className = "btn";
el.id = "gap-strike";
el.textContent = "Strike!";
el.style.cssText = "position:fixed;left:50%;bottom:120px;transform:translateX(-50%);z-index:58;min-width:140px;min-height:52px;font-size:18px;opacity:.55";
document.body.appendChild(el);
F.el = el;
function end() { if (F.el) {
F.el.remove();
F.el = null;
} removeEventListener("keydown", key, true); clearInterval(F.iv); CGAP.fishing = null; }
function strike() {
if (F.done)
return;
F.done = true;
var t = performance.now() - F.t0;
if (t < F.bite) {
end();
setStatus("<b>Too soon.</b> The float had not dipped. Cast again.");
return;
}
if (t > F.bite + 1500) {
end();
setStatus("<b>It got away.</b> Strike as soon as the float dips. Cast again.");
return;
}
end();
gapRpc("gap_fish", { p_spot: String(spot.k || "moat").slice(0, 40) }).then(function (o) { gapSaid(o); });
}
function key(e) { if (e.code === "KeyE" || e.code === "Space" || e.code === "Enter") {
if (/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
e.preventDefault();
e.stopImmediatePropagation();
strike();
} }
addEventListener("keydown", key, true);
el.onclick = strike;
F.iv = setInterval(function () {
var t = performance.now() - F.t0;
if (t >= F.bite && !F.told) {
F.told = true;
if (F.el) {
F.el.style.opacity = "1";
F.el.textContent = "Strike now!";
}
setStatus("<b>The float dips!</b> Strike now (E, Space or the button).");
if (typeof playTone === "function")
playTone(660, 0.18);
}
if (t > F.bite + 1500 && !F.done) {
F.done = true;
end();
setStatus("<b>It got away.</b> Strike as soon as the float dips. Cast again.");
}
if (F.x == null) {
F.x = camera.position.x;
F.z = camera.position.z;
}
if (Math.hypot(camera.position.x - F.x, camera.position.z - F.z) > 3 && !F.done) {
F.done = true;
end();
setStatus("You reel in your line.");
}
}, 120);
},
function (label, note, btns) {
return "<div style='display:flex;justify-content:space-between;align-items:center;gap:10px;padding:7px 0;border-top:1px solid rgba(255,255,255,.07)'>" +
"<span>" + label + (note ? "<br><span style='opacity:.7;font-size:12px'>" + note + "</span>" : "") + "</span><span style='display:flex;gap:6px;flex-shrink:0'>" + btns + "</span></div>";
},
function () {
var T = "The donations box";
gapPanel(T, "<div style='opacity:.8'>Opening the ledger…</div>");
gapRpc("gap_board").then(function (b) {
var h = "<div style='opacity:.85;margin-bottom:10px'>Every coin given here buys food for the hatch and the soup kitchens, and coal and soap for the house.</div>";
if (b && b.ok !== false && b.meals_today != null) {
h += "<div style='display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:10px;text-align:center'>" +
[["Meals today", b.meals_today], ["Meals this week", b.meals_week], ["Given this week", (b.given_week || 0) + " gold"]].map(function (c) {
return "<div style='background:rgba(255,255,255,.05);border-radius:8px;padding:6px'><div style='font-size:18px;color:#E8C27A'>" + esc(String(c[1] == null ? 0 : c[1])) + "</div><div style='font-size:11px;opacity:.75'>" + c[0] + "</div></div>";
}).join("") + "</div>";
var g = (b.givers || []).slice(0, 8);
if (g.length)
h += "<div style='font-size:12px;opacity:.8;margin-bottom:4px'>Thanked this week</div>" + g.map(function (x) { return "<div style='display:flex;justify-content:space-between;font-size:13px'><span>" + esc(x.name || "A friend") + "</span><span>" + esc(String(x.gold || 0)) + " gold</span></div>"; }).join("");
}
else if (b && b.say)
h += "<div style='opacity:.8;margin-bottom:8px'>" + esc(b.say) + "</div>";
h += "<div style='display:flex;gap:8px;margin-top:12px;flex-wrap:wrap'>" + [5, 20, 100].map(function (n) { return gwrBtn("data-give", String(n), "Give " + n + " gold"); }).join("") + "</div>";
gapPanel(T, h, function (el) {
Array.prototype.forEach.call(el.querySelectorAll("[data-give]"), function (btn) {
btn.onclick = function () {
if (GWR.busy)
return;
GWR.busy = true;
btn.disabled = true;
gapDonate(+btn.getAttribute("data-give")).then(function (o) { GWR.busy = false; if (o && o.ok !== false)
gwrGivePanel();
else
btn.disabled = false; }, function () { GWR.busy = false; btn.disabled = false; });
};
});
});
});
},
function () {
gapChoices("The Poorhouse · notices", "Pinned up by the master and the matron.", [
["<b>Hot meals</b>", "Ask at the serving hatch in this hall. A hot meal is given free to anyone who asks.", null],
["<b>Beds</b>", "The dormitories and family rooms are upstairs. Anyone may lie down on a free bunk, at no charge.", null],
["<b>Washing</b>", "The men's and women's washhouses are through the back. Baths and showers are free.", null],
["<b>The infirmary</b>", "Upstairs, with the nurse. Medicines and the doctor are at the City Hospital.", null],
["<b>Soup kitchens</b>", "Two in the Warrens, on the far sides of the ring: a free bowl of soup at either counter.", null],
["<b>Giving</b>", "The donations box is by the door. What is given is counted on its ledger.", function () { gwrGivePanel(); }, "Open"],
["<b>Work</b>", "Cooks, hands, nurses, a teacher and sorters are wanted. See the job board.", null]
]);
},
function () {
var T = "The weighbridge office";
if (!(typeof signedIn === "function" && signedIn())) {
setStatus("Sign in first, and what you find goes to your stock.");
return;
}
gapPanel(T, "<div style='opacity:.8'>The clerk looks over what you have brought…</div>");
var load = (typeof loadStock === "function") ? loadStock() : Promise.resolve([]);
load.then(function (rows) {
var have = {};
(rows || []).forEach(function (r) { if (r && r.kind)
have[r.kind] = r; });
var h = "<div style='opacity:.85;margin-bottom:8px'>The yard buys what you find in the Warrens' scrap heaps, carts, bins and rubble, at the city's price.</div>";
GWR_FINDS.forEach(function (f) {
var r = have[f[0]], n = r ? (r.amount | 0) : 0, p = (r && r.buys != null) ? r.buys : f[2];
h += gwrRow("<b>" + esc(f[1]) + "</b>", "You have " + n + " · " + p + " gold each", gwrBtn("data-s1", f[0], "Sell 1", n < 1) + gwrBtn("data-sa", f[0] + "|" + n, "Sell all", n < 1));
});
gapPanel(T, h, function (el) {
function sell(k, n, btn) {
if (GWR.busy || n < 1)
return;
GWR.busy = true;
btn.disabled = true;
cityRpc("sell_stock", { p_kind: k, p_amount: n }).then(function (o) {
GWR.busy = false;
setStatus(o === "ok" ? "<b>Weighed and paid.</b> " + esc(gwrFindName(k)) + " sold to the yard." : esc(String(o)));
if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
gwrYardPanel();
}).catch(function (e) { GWR.busy = false; btn.disabled = false; setStatus(esc((e && e.message) || "Not now.")); });
}
Array.prototype.forEach.call(el.querySelectorAll("[data-s1]"), function (b) { b.onclick = function () { sell(b.getAttribute("data-s1"), 1, b); }; });
Array.prototype.forEach.call(el.querySelectorAll("[data-sa]"), function (b) { b.onclick = function () { var p = b.getAttribute("data-sa").split("|"); sell(p[0], +p[1], b); }; });
});
});
},
function () {
gapChoices("The Warrens Baths", "The cashier slides the price card across.", [
["<b>A wash</b>", "In the men's or women's bathing hall, the plunge bath or the family bathrooms: 2 gold, paid at the bath.", null],
["<b>The tea counter</b>", "Tea, bread and dripping, and broth.", (typeof needsMenu === "function") ? function () { gapClose(); needsMenu(GWR_BATH); } : null, "Menu"],
["<b>The public laundry</b>", "Upstairs from the bathing halls: wash troughs, mangles and the drying room, kept by the laundry hands.", null]
]);
},
function (key, lines, bg, fg, w, h) {
if (GWR_TEX[key])
return GWR_TEX[key];
var c = document.createElement("canvas");
c.width = w || 256;
c.height = h || 128;
var x = c.getContext("2d");
x.fillStyle = bg;
x.fillRect(0, 0, c.width, c.height);
x.fillStyle = fg;
x.textAlign = "center";
var top = lines.length > 1 ? Math.round(c.height * 0.26) : Math.round(c.height * 0.62);
x.font = "bold " + Math.round(c.height * (lines.length > 1 ? 0.17 : 0.36)) + "px Georgia,serif";
x.fillText(lines[0], c.width / 2, top, c.width - 12);
x.font = Math.round(c.height * 0.11) + "px sans-serif";
for (var i = 1; i < lines.length; i++)
x.fillText(lines[i], c.width / 2, top + Math.round(c.height * 0.06) + i * Math.round(c.height * 0.135), c.width - 12);
return (GWR_TEX[key] = new THREE.CanvasTexture(c));
},
function (R, who) {
var w = R.w, d = R.d;
for (var v = -d / 2 + 1.25; v < d / 2 - 1.0; v += 2.1) {
R.put("gpbath", w - 0.55, v, "in");
if (v + 1.05 < d / 2 - 0.4)
R.put("gwrscreen", w - 0.8, v + 1.05, "n");
}
for (var u = 2.0; u < Math.min(w - 2.4, 6.2); u += 1.1)
R.wallS("gpshower", u);
R.put("benchin", w * 0.42, 0.6, "n");
R.wallN("wgbasin", w - 3.2);
R.put("wgshelving", 1.2, -d / 2 + 2.4, "out");
R.staff(who, 2.2, 0.2, "out");
R.spot(2.0, 1.4);
},
function (K) {
var W = K.W, put = K.put;
var zc = K.B + 2.6;
put("gwrhatch", -6.6, zc, 0);
put("wgsteeltable", -10.4, zc, Math.PI / 2);
put("wgcookline", -6.6, K.B + 0.5, 0);
put("fridge", -10.6, K.B + 0.45, 0);
put("wgshelving", -3.4, K.B + 0.35, 0);
K.staff("Poorhouse cook", -7.4, K.B + 1.6, 0);
K.staff("Poorhouse kitchen hand", -5.4, K.B + 1.6, 0);
K.staff("Soup kitchen volunteer", -9.6, K.B + 1.4, 0);
put("desk", 6.4, K.B + 2.2, 0);
put("chair", 6.4, K.B + 3.2, Math.PI);
put("chair", 7.4, K.B + 3.2, Math.PI);
K.staff("Poorhouse clerk", 6.4, K.B + 1.4, 0);
put("filecabinet", 9.6, K.B + 0.4, 0);
put("filecabinet", 10.3, K.B + 0.4, 0);
put("clock", K.R - 0.3, K.B + 3.4, -Math.PI / 2);
put("gwrnotice", 3.6, K.B + 0.08, 0);
var xs = W >= 22 ? [-8.2, -3.4, 3.4, 8.2] : [-5.6, 5.6];
for (var z = K.B + 6.2; z < K.Fz - 4.4; z += 2.8)
xs.forEach(function (x) { put("gwrrefectory", x, z, 0); });
put("gwrstove", K.L + 0.7, K.B + 9.0, 0);
put("gwrstove", K.R - 0.7, K.B + 9.0, 0);
put("benchin", -5.6, K.Fz - 0.5, Math.PI);
put("benchin", 5.6, K.Fz - 0.5, Math.PI);
put("gwrdonbox", 3.0, K.Fz - 2.2, 0);
put("gwrnotice", K.L + 0.08, K.Fz - 3.2, Math.PI / 2);
K.staff("Poorhouse porter", -2.4, K.Fz - 1.8, Math.PI);
K.staff("Poorhouse attendant", 1.6, K.B + 9.6, -Math.PI / 2);
put("plant", K.L + 0.8, K.Fz - 1.0, 0);
put("plant", K.R - 0.8, K.Fz - 1.0, 0);
K.spot(-6.6, zc + 1.4, "the hatch");
K.spot(0, K.Fz - 3, "the refectory");
K.spot(6.4, K.B + 4, "admissions");
K.spot(3, K.Fz - 3.4, "the donations box");
},
function (K) {
var W = K.W, put = K.put;
put("gwrweigh", -1.6, K.Fz - 5.6, 0);
put("gwrscalehouse", 1.9, K.Fz - 5.6, -Math.PI / 2);
K.staff("Weighbridge clerk", 2.6, K.Fz - 5.2, -Math.PI / 2);
put("gwrpileiron", -8.4, K.B + 1.6, 0);
put("gwrpiletimber", -4.6, K.B + 1.6, 0);
put("gwrpilerags", 4.6, K.B + 1.6, 0);
put("gwrpileglass", 8.4, K.B + 1.6, 0);
put("gwrpilecopper", K.L + 1.6, K.B + 6.4, Math.PI / 2);
put("gwrpilebrass", K.L + 1.6, K.B + 10.0, Math.PI / 2);
put("gwrbale", K.R - 0.8, K.B + 5.6, 0);
put("gwrbale", K.R - 0.8, K.B + 6.8, 0);
put("gwrbale", K.R - 2.0, K.B + 5.6, 0);
put("gwrcart", K.R - 2.6, K.Fz - 4.2, 0);
put("barrel", K.R - 0.7, K.Fz - 1.4, 0);
put("trcrates", K.L + 1.4, K.Fz - 1.6, 0);
put("gwrbin", K.R - 0.6, K.B + 9.6, -Math.PI / 2);
put("gwrbin", K.R - 0.6, K.B + 11.0, -Math.PI / 2);
K.staff("Yard hand", -6.6, K.B + 3.6, Math.PI);
K.staff("Totter", K.R - 3.8, K.Fz - 4.6, -Math.PI / 2);
K.staff("Rag sorter", 4.6, K.B + 3.6, Math.PI);
K.spot(1.9, K.Fz - 3.6, "the weighbridge office");
K.spot(0, K.B + 5, "the yard");
K.spot(K.L + 4, K.B + 8, "the copper and brass");
},
function (K) {
var W = K.W, put = K.put;
put("gwrpaybox", -4.2, K.B + 3.0, 0);
K.staff("Bathhouse cashier", -4.2, K.B + 2.6, 0);
put("gwrteabar", 5.0, K.B + 2.4, 0);
K.staff("Bathhouse tea server", 5.0, K.B + 1.6, 0);
put("wgshelving", 7.6, K.B + 0.35, 0);
[[3.4, K.B + 6.0], [7.0, K.B + 6.0], [3.4, K.B + 9.0], [7.0, K.B + 9.0]].forEach(function (p) { put("table", p[0], p[1], 0); put("chair", p[0] - 0.95, p[1], Math.PI / 2); put("chair", p[0] + 0.95, p[1], -Math.PI / 2); });
put("benchin", K.L + 0.5, K.B + 7.0, Math.PI / 2);
put("benchin", K.L + 0.5, K.B + 10.0, Math.PI / 2);
put("gwrprices", K.L + 0.08, K.Fz - 2.6, Math.PI / 2);
put("clock", K.R - 0.3, K.Fz - 3.0, -Math.PI / 2);
put("plant", K.L + 0.8, K.Fz - 1.0, 0);
put("plant", K.R - 0.8, K.Fz - 1.0, 0);
K.staff("Bath attendant", -1.8, K.Fz - 2.6, Math.PI);
K.spot(-4.2, K.B + 4.6, "the pay box");
K.spot(5, K.B + 4.2, "the tea counter");
K.spot(0, K.Fz - 3, "the hall");
},
function (K) {
var W = K.W, put = K.put, L = K.L, R = K.R, B = K.B, F = K.Fz, P2 = Math.PI / 2;
put("rug", 0, F - 3.2, P2);
put("rug", 0, F - 6.1, P2);
put("rug", 0, F - 9.0, P2);
put("ghrporterdesk", L + 5.8, F - 3.8, P2);
put("ghrpigeon", L + 0.12, F - 3.8, P2);
K.staff("Club head porter", L + 4.7, F - 4.4, P2);
K.staff("Club hall porter", L + 4.7, F - 3.0, P2);
K.staff("Club hall porter", 2.0, F - 1.4, Math.PI);
K.wallX(F - 6.4, R - 6.6, R, []);
put("trcounter", R - 5.6, F - 3.8, -P2);
put("ghrcloakrail", R - 0.5, F - 5.0, -P2);
put("ghrcloakrail", R - 0.5, F - 2.6, -P2);
K.staff("Club valet", R - 4.4, F - 3.8, -P2);
put("ghrmembersbook", -3.2, F - 8.6, 0);
put("ghrnotice", -5.2, B + 0.08, 0);
put("fireplace", L + 0.3, B + 7, P2);
put("rug", L + 3, B + 7, P2);
put("armchair", L + 2.8, B + 5.3, 0);
put("armchair", L + 2.8, B + 8.7, Math.PI);
put("sofa", L + 5.6, B + 7, -P2);
put("table", L + 4.2, B + 7, P2);
put("sofa", R - 0.6, B + 7, -P2);
put("rug", R - 3, B + 7, P2);
put("armchair", R - 3.6, B + 5.6, P2);
put("armchair", R - 3.6, B + 8.4, P2);
put("ghrpapers", R - 2.2, B + 7, P2);
put("painting", L + 0.08, B + 3, P2);
put("painting", R - 0.08, B + 3, -P2);
put("painting", 4.6, B + 0.06, 0);
put("clock", 9, B + 0.2, 0);
put("plant", L + 0.8, B + 0.8, 0);
put("plant", R - 0.8, B + 0.8, 0);
put("plant", R - 0.8, F - 7.4, 0);
put("plant", -1.8, B + 0.8, 0);
put("plant", 1.8, B + 0.8, 0);
put("chandelier", 0, B + 6, 0);
put("chandelier", 0, F - 5, 0);
K.spot(0, F - 3, "the entrance hall");
K.spot(L + 7.4, F - 3.8, "the porter's desk");
K.spot(R - 7.6, F - 3.8, "the cloakroom");
K.spot(-3.2, F - 7.2, "the members' book");
K.spot(L + 4, B + 5, "by the fire");
},
function (K) {
var put = K.put, L = K.L, R = K.R, B = K.B, F = K.Fz, P2 = Math.PI / 2;
put("wgreception", 0, B + 9.2, 0);
K.staff("Agency registrar", -0.6, B + 8.5, 0);
put("ghrhousemap", -5.5, B + 0.06, 0);
put("ghrregister", -5.5, B + 1.4, 0);
put("ghrsituations", 5.5, B + 0.06, 0);
[[L, P2, 1], [R, -P2, -1]].forEach(function (s) {
var x = s[0], r = s[1], sg = s[2];
put("desk", x + sg * 1.6, B + 5.2, r);
put("chair", x + sg * 2.8, B + 4.7, -r);
put("chair", x + sg * 2.8, B + 5.7, -r);
K.staff("Agency registrar", x + sg * 0.8, B + 5.2, r);
put("filecabinet", x + sg * 0.4, B + 2.6, r);
put("filecabinet", x + sg * 0.4, B + 3.3, r);
});
put("sofa", 5.5, F - 0.8, Math.PI);
put("rug", 5.5, F - 2.4, 0);
put("armchair", 3.8, F - 2.4, P2);
put("armchair", 7.2, F - 2.4, -P2);
put("table", 5.5, F - 2.4, 0);
put("sofa", -5.5, F - 0.8, Math.PI);
put("rug", -5.5, F - 2.4, 0);
put("table", -5.5, F - 2.4, 0);
put("clock", R - 0.2, B + 8.4, -P2);
put("painting", L + 0.08, B + 8.6, P2);
put("painting", 2.6, B + 0.06, 0);
put("plant", L + 0.8, F - 0.8, 0);
put("plant", R - 0.8, F - 0.8, 0);
put("plant", -2.2, B + 0.8, 0);
put("plant", 2.2, B + 0.8, 0);
put("chandelier", 0, B + 5, 0);
put("chandelier", 0, F - 3, 0);
K.spot(0, B + 11, "the front desk");
K.spot(-5.5, B + 2.6, "the register of the great houses");
K.spot(5.5, B + 1.6, "situations vacant");
K.spot(5.5, F - 3.6, "the waiting room");
},
function (K) {
var put = K.put, L = K.L, R = K.R, B = K.B, F = K.Fz, P2 = Math.PI / 2;
put("ghrfountain", 0, 0, 0);
put("benchin", 0, 3.4, 0);
put("benchin", 0, -3.4, Math.PI);
var zs = [F - 2.2, F - 5.4, 4.4, -4.4, -7.6, B + 2.6], i;
for (i = 0; i < zs.length; i++) {
put(i % 2 ? "ghrlemon" : "ghrcitrus", -3.4, zs[i], 0);
put(i % 2 ? "ghrcitrus" : "ghrlemon", 3.4, zs[i], 0);
}
put("ghrpalm", L + 1.2, B + 1.2, 0);
put("ghrpalm", L + 1.2, F - 1.2, 0);
put("ghrpalm", L + 1.2, 0, 0);
put("ghrpalm", R - 1.2, F - 1.2, 0);
put("ghrpalm", -6.6, B + 1.2, 0);
[B + 3.6, B + 7.2, F - 7.2, F - 3.6].forEach(function (z) { put("ghrrosebed", L + 4.2, z, P2); });
put("benchin", L + 7.4, B + 5.4, -P2);
put("benchin", L + 7.4, F - 5.4, -P2);
put("ghrplantstand", L + 4.0, 0, P2);
K.staff("Glasshouse gardener", L + 2.8, 0.9, P2);
K.staff("Glasshouse gardener", -2.4, -4.4, P2);
for (var x = R - 7.0; x <= R - 3.3; x += 3.6)
for (var z = B + 7; z <= F - 3; z += 3.5)
put("ghrteatable", x, z, 0);
[-6, -2, 2, 6].forEach(function (z) { put("plant", R - 9.4, z, 0); });
put("ghrcakecase", R - 4.6, B + 2.8, 0);
put("wgcoffeebar", R - 4.6, B + 0.4, 0);
put(typeof wgSignKey === "function" ? wgSignKey("The tea room", false) : "plant", R - 8.4, B + 0.12, 0);
K.staff("Orangery tea room attendant", R - 4.6, B + 1.9, 0);
K.staff("Orangery tea room attendant", R - 5.2, 1.0, -P2);
K.spot(0, F - 3, "the orangery");
K.spot(0, 5.4, "the fountain");
K.spot(L + 6, 0, "the rose walk");
K.spot(R - 5.2, B + 4.4, "the tea room");
K.spot(R - 5.2, 4, "the tea room");
},
function (title, lo, hi, intro) {
if (typeof jobBoard !== "function") {
setStatus("The job board is not open just now.");
return;
}
gapPanel(title, "<div style='opacity:.8'>Reading the register…</div>");
jobBoard().then(function (rows) {
rows = (rows || []).filter(function (r) { return r.job_id >= lo && r.job_id <= hi; });
if (!rows.length) {
gapChoices(title, (intro ? intro + "<br><br>" : "") + "No posts are listed here yet: they open soon.", []);
return;
}
gapChoices(title, intro || "", rows.map(function (r) {
var left = (r.positions || 0) - (r.taken || 0), ask = r.auto_hire === false;
return ["<b>" + esc(r.title) + "</b> · " + r.rate + " gold " + (r.pay_kind === "salary" ? "a week" : "an hour"),
left > 0 ? (left + " free" + (ask ? " · a keeper chooses" : "")) : "All taken just now",
left > 0 && typeof applyFor === "function" ? function () { applyFor(r.job_id, ask ? (prompt("A word about why you want it?") || null) : null); } : null,
ask ? "Apply" : "Take it"];
}));
});
},
function () {
gapChoices("The members' book", "The Crescent Club welcomes every dreamer as its guest. What the club offers, room by room:", [
["<b>The dining room</b> (ground floor)", "Fine dining from the club chef, served by the maître d'hôtel and the waiters.", function () { if (typeof needsMenu === "function")
needsMenu(GHR_CLUB); }, "Menu"],
["<b>The members' bar</b> (ground floor)", "Wine, port and coffee across the bar; the same menu as the dining room.", null],
["<b>The morning room and the garden room</b>", "The day's paper on the low table, writing desks, palms and orange trees.", null],
["<b>The library</b> (first floor)", "Ask at the librarian's desk to read from the club's own shelves.", null],
["<b>The billiards room and the card room</b> (first floor)", "Play a frame at the table, or a rubber of whist.", null],
["<b>The ballroom and the drawing room</b> (first floor)", "The grand piano may be played by anyone who asks it kindly.", null],
["<b>Private dining rooms</b> (first floor)", "Long tables for a party, laid by the waiters.", null],
["<b>Guest suites</b> (second floor)", "Kept by the club housekeeper for guests of members.", null],
["<b>Posts at the club</b>", "Porters, waiters, chefs, the sommelier, the librarian and more.", function () { ghrPosts("Posts at the Crescent Club", 3840, 3853, "The club's household. Wages are paid for the hours you are at your post."); }, "See"]
]);
},
function () {
gapChoices("The porter's desk", "The porter keeps the door, the post and the club's small goods.", [
ghrBuy("gap_club_card", "A membership card", 25, "In a green leather wallet with the club's crest: a keepsake for your backpack."),
ghrBuy("gap_cufflinks", "Silver cufflinks", 40, "A plain silver pair in a club box."),
ghrBuy("gap_decanter", "A cut-glass decanter", 30, "Heavy cut glass with its stopper, as used in the club bar."),
["<b>Where is…?</b>", "Ground floor: the dining room, the bar, the morning room, the garden room. First floor: the ballroom, library, billiards, cards, drawing room and private dining. Second floor: the guest suites.", null],
["<b>The members' book</b>", "Everything the club offers.", ghrClubBook, "Read"]
]);
},
function () {
var you = 0, them = 0;
for (var i = 0; i < 4; i++) {
you += Math.floor(Math.random() * 16);
them += Math.floor(Math.random() * 16);
}
if (typeof playTone === "function")
playTone(520, 0.05);
setStatus("<b>A frame of billiards</b> against the club's marker: you make " + you + ", the marker " + them + ". " +
(you > them ? "Your frame. The steward chalks your name on the board." : you < them ? "The marker's frame. Another, perhaps?" : "All square: the frame is shared."));
},
function () {
if (GHR.playing || typeof playTone !== "function")
return;
GHR.playing = true;
var notes = [262, 330, 392, 523, 494, 392, 330, 349, 440, 392, 330, 262];
notes.forEach(function (f, i) { setTimeout(function () { try {
playTone(f, 0.42);
}
catch (e) { } if (i === notes.length - 1)
GHR.playing = false; }, i * 420); });
setStatus("<b>You play the grand piano.</b> A gentle air carries through the ballroom.");
},
function () {
var H = ghrHouses(), cr = H.filter(function (h) { return /Crescent/.test(h.street); }).length, bk = H.length - cr, m = new Date().getMonth();
var d = new Date();
var day = d.toLocaleDateString ? d.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" }) : "";
ghrPanelText("The High Ring Gazette", [
"<b>" + esc(day) + "</b>",
"<b>The houses.</b> " + (H.length ? (cr + " houses on the Crescent and " + bk + " on Backers Street are kept today by the Household Agency's staff.") : "The great houses of the Crescent and Backers Street are kept by the Household Agency's staff."),
"<b>The Rose Gardens.</b> " + (m >= 5 && m <= 8 ? "The roses are in full bloom beside the Orangery: the head gardener recommends an evening walk." : m >= 9 || m <= 1 ? "The roses have been cut back for winter; the citrus trees are inside the Orangery, fruiting." : "New growth on the roses beside the Orangery; the first buds are expected in early summer."),
"<b>At the club.</b> Dinner is served in the dining room; billiards and cards on the first floor; the ballroom piano is open to anyone who will play it.",
"<b>Situations vacant.</b> The Household Agency is engaging butlers, housekeepers, footmen, maids, valets, cooks, chauffeurs, gardeners, nannies and estate guards."
]);
},
function () {
var H = ghrHouses(), cr = H.filter(function (h) { return /Crescent/.test(h.street); }).length;
gapChoices("The register of the great houses", (H.length ? ("<b>" + H.length + " houses</b> on the register: " + cr + " on the Crescent, " + (H.length - cr) + " on Backers Street. ") : "") +
"Every house is run by staff engaged here. Each estate post works a round of the houses:", GHR_ROUNDS.map(function (r) { return ["<b>" + esc(r[0]) + "</b>", esc(r[1]) + ".", null]; }).concat([
["<b>Posts that work the estates</b>", "Take one and your rounds begin at the muster room.", function () { ghrPosts("Posts in the great houses", 3857, 3866, "Engaged here, working the houses of the High Ring."); }, "See"],
["<b>Posts at the agency</b>", "The director, the registrars and the butler school.", function () { ghrPosts("Posts at the agency", 3854, 3856, ""); }, "See"],
ghrBuy("gap_butler_handbook", "The household handbook", 15, "The agency's own book on running a great house.")
]));
},
function () {
var H = ghrHouses();
if (!H.length) {
setStatus("The rota is chalked fresh each morning: the Crescent first, then Backers Street.");
return;
}
var day = Math.floor(Date.now() / 864e5), n = H.length;
gapChoices("Today's rounds", "The houses on today's rota, post by post (it changes each day):", GHR_ROUNDS.map(function (r, i) {
var pick = [];
for (var k = 0; k < 3; k++) {
var h = H[(day * 7 + i * 13 + k * 29) % n].name;
if (pick.indexOf(h) < 0)
pick.push(h);
}
return ["<b>" + esc(r[0]) + "</b>", esc(pick.join(", ")), null];
}));
},
function () {
gapChoices("The plant stand", "Grown in the propagation house behind the glass:", [
ghrBuy("gap_orange_tree", "A potted orange tree", 30, "In a small green planter. Keep it from frost."),
ghrBuy("gap_lemon_tree", "A potted lemon tree", 28, "Fragrant flowers and fruit at the same time."),
ghrBuy("gap_rose_bouquet", "A bouquet of garden roses", 12, "Cut this morning from the rose house."),
ghrBuy("gap_buttonhole", "A rose buttonhole", 3, "A single bud with a sprig of green.")
]);
},
function (C, rs, side, aG, gw, gd) {
var rg = rs + side * (ATL_ROAD + ATL_SETBACK + gd / 2);
function at(t, u) { var r = rg + side * u; return { r: r, a: aG + t / r }; }
function face(a) { return side > 0 ? rotIn(a) : rotOut(a); }
function put(arch, t, u, rot, attrs, name) { var p = at(t, u); return C.at(arch, p.r, p.a, rot == null ? face(p.a) : rot(p.a), name || null, attrs || {}); }
put("tierfountain", 0, 0.5, function () { return 0; }, { s: 0.6 });
[[-9, -5.5], [9, -5.5], [-9, 0.5], [9, 0.5], [-9, 6.5], [9, 6.5], [0, 7.6]].forEach(function (p) { put("flowerbed", p[0], p[1]); });
[-10, 0, 10].forEach(function (t) { put("hedge", t, gd / 2 - 1); });
[-1, 1].forEach(function (sg) { [-4, 4].forEach(function (u) { put("hedge", sg * (gw / 2 - 1), u, rotAlong); }); });
[[-4.6, -4.2], [4.6, -4.2], [-4.6, 4.4], [4.6, 4.4]].forEach(function (p) { put("bench", p[0], p[1]); });
put("pergola", 0, -gd / 2 + 3.2);
put("topiary", -5.8, -gd / 2 + 1.2);
put("topiary", 5.8, -gd / 2 + 1.2);
put("ornatelamp", -gw / 2 + 2, -gd / 2 + 1.2, function () { return 0; });
put("ornatelamp", gw / 2 - 2, -gd / 2 + 1.2, function () { return 0; });
var kb = rs + side * (ATL_ROAD + 2.5);
C.sign(kb, aG + (gw / 2 - 6) / kb, face(aG), "The Rose Gardens", "The Orangery's rose gardens: free to walk in, from dawn to dusk.");
var c = ghrWorld(C, rg + side * 0.5, aG), g = ghrWorld(C, rg - side * (gd / 2 - 3), aG);
gapSpot({ tag: "ghr", x: c.x, z: c.z, r: 8, say: "<b>The Rose Gardens</b> · <b>press E</b> (or tap here) to walk among the roses", fn: function () {
var m = new Date().getMonth();
setStatus("<b>The Rose Gardens.</b> " + (m >= 5 && m <= 8 ? "The beds are in full bloom: deep red, blush, white and apricot, and the scent is everywhere." : m >= 9 || m <= 1 ? "The roses are cut back for the winter, the beds mulched; the box hedges keep the shape of the garden." : "New leaves on every rose, and the first buds forming. The gardeners are feeding the beds."));
} });
gapSpot({ tag: "ghr", x: g.x, z: g.z, r: 3.5, say: "<b>A bench in the Rose Gardens</b> · <b>press E</b> (or tap here) to sit a while", fn: function () { setStatus("<b>You sit a while</b> under the pergola. Somewhere a blackbird is singing, and the fountain runs."); } });
},
function (title, intro, test, empty) {
if (!(typeof signedIn === "function" && signedIn())) {
setStatus("Sign in first.");
return;
}
if (typeof loadStock !== "function")
return;
loadStock().then(function (st) {
var have = (st || []).filter(function (s) { return s.amount > 0 && test(s.kind); });
var h = "<div style='opacity:.85;margin-bottom:10px'>" + intro + "</div>";
if (!have.length)
h += "<div style='opacity:.8'>" + empty + "</div>";
have.forEach(function (s, i) {
h += "<div style='display:flex;justify-content:space-between;align-items:center;gap:8px;padding:7px 0;border-top:1px solid rgba(255,255,255,.07)'>" +
"<span>" + esc(s.name || s.kind) + " <b>× " + s.amount + "</b><br><span style='opacity:.7;font-size:12px'>" + (s.buys != null ? esc(String(s.buys)) + " gold each" : "") + "</span></span>" +
"<span style='display:flex;gap:6px'><button class='btn' data-s1='" + i + "' style='min-height:40px'>Sell 1</button>" +
(s.amount > 1 ? "<button class='btn' data-sa='" + i + "' style='min-height:40px'>Sell all</button>" : "") + "</span></div>";
});
gapPanel(title, h, function (el) {
function sell(s, n) {
if (CGAP.busy)
return;
CGAP.busy = true;
cityRpc("sell_stock", { p_kind: s.kind, p_amount: n }).then(function (o) {
CGAP.busy = false;
setStatus(o === "ok" ? "<b>Sold:</b> " + n + " × " + esc(s.name || s.kind) + (s.buys != null ? " for " + (n * s.buys) + " gold." : ".") : esc(String(o)));
if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
gmwSell(title, intro, test, empty);
}).catch(function (e) { CGAP.busy = false; setStatus(esc(gapErr(e))); });
}
Array.prototype.forEach.call(el.querySelectorAll("[data-s1]"), function (b) { b.onclick = function () { sell(have[+b.dataset.s1], 1); }; });
Array.prototype.forEach.call(el.querySelectorAll("[data-sa]"), function (b) { b.onclick = function () { var s = have[+b.dataset.sa]; sell(s, s.amount); }; });
});
});
},
function () {
var go = function (things) {
var has = (things || []).some(function (t) { return t && (t.archetype === "gap_rod" || t.name === "Fishing rod"); });
var rows = GMW_SHOP.map(function (it) {
return ["<b>" + esc(it[1]) + "</b> · " + it[2] + " gold", esc(it[3]) + (it[0] === "gap_rod" && has ? " <b>You have one already.</b>" : ""), function () { gapBuy(it[0]).then(function () { if (typeof loadThings === "function")
loadThings(); }); }, "Buy"];
});
gapChoices("The tackle shop", "Cast at any of the eight moat pegs, one by each sector stair, or from the boathouse jetty. Strike when the float dips. The fishmonger here buys what you land.", rows);
};
if (typeof signedIn === "function" && signedIn() && typeof loadThings === "function")
loadThings().then(go, function () { go([]); });
else
go([]);
},
function () {
var rows = GMW_FISH.map(function (f) { return ["<b>" + esc(f[1]) + "</b>", (f[3] === "night" ? "Bites after dark" : f[3] === "day" ? "Bites by day" : "Bites day and night") + " · the fishmonger pays " + f[2] + " gold", null]; });
rows.push(["<b>The pegs</b>", "Eight, one by each sector stair round the moat, on the outer bank below the Harvest Ring. Plus the jetty outside this door.", null]);
gapChoices("The moat board", "What swims in the Outer Moat. The golden carp is rare. Your keep-net holds 40 fish a day.", rows);
},
function () {
var rows = GMW_FINDS.map(function (f) { return ["<b>" + esc(f[1]) + "</b> · " + f[2] + " gold each", esc(f[4]), null]; });
gapChoices("The Wilds board", "What grows and lies out in the Wilds, at patches all the way round. Each patch gives again after some hours. The quartermaster here buys it all. Every nightmare out there attacks anyone, by day and worse by night.", rows);
},
function () {
if (!(typeof signedIn === "function" && signedIn())) {
setStatus("Sign in first.");
return;
}
var get = (typeof nhTrophies === "function") ? nhTrophies(true) : cityRpc("my_trophies", {});
Promise.resolve(get).then(function (T) {
var list = (T && T.trophies) || [], n = list.length, rows = [];
var name = function (t) { return ((typeof NH_TYPES !== "undefined" && NH_TYPES[t.tier]) ? NH_TYPES[t.tier] + " " : "") + t.kind; };
if (n) {
rows.push(["<b>Turn in " + n + (n === 1 ? " trophy" : " trophies") + "</b>", "Worth " + esc(String(T.worth)) + " gold at the city's bounty", function () {
if (CGAP.busy)
return;
CGAP.busy = true;
cityRpc("turn_in_trophies", { p_place: "outpost" }).then(function (d) {
CGAP.busy = false;
var say = (d && d.say) || "Done.";
setStatus((d && d.ok ? "<b>Bounty</b> — " : "") + esc(say));
if (typeof NH !== "undefined" && NH) {
NH.trophies = null;
}
if (typeof nhTrophies === "function")
nhTrophies(true);
if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
gapPanel("The trophy counter", "<div>" + esc(say) + "</div>");
}).catch(function (e) { CGAP.busy = false; var m = gapErr(e); setStatus(esc(m)); gapPanel("The trophy counter", "<div>" + esc(m) + "</div>"); });
}, "Turn in"]);
list.slice(0, 10).forEach(function (t) { rows.push([esc(name(t)), "", null]); });
}
gapChoices("The trophy counter", n ? "The wildwarden checks each trophy and pays the bounty, the same as at the Tower and the Hunters' Lodge." :
"You carry no trophies. Only nightmare hunters take them: put a nightmare down and its trophy is yours. The Hunters' Lodge in the Harvest Ring hires hunters.", rows);
}).catch(function (e) { setStatus(esc(gapErr(e))); });
},
function (again) {
if (!(typeof signedIn === "function" && signedIn())) {
setStatus("Sign in first.");
return;
}
if (typeof NH === "undefined") {
setStatus("No reports are coming in just now.");
return;
}
if (!again && typeof nhWatch === "function") {
try {
nhWatch();
}
catch (e) { }
setTimeout(function () { if (GAPP.el && GAPP.el.style.display !== "none" && GAPP.el.innerHTML === GMW.mapHtml)
gmwReports(true); }, 1500);
}
var rows = [];
(NH.raids || []).forEach(function (r) {
var p = typeof nhReportPos === "function" ? nhReportPos(r) : null;
if (!p)
return;
rows.push(["<b>Sector " + esc(String(r.sector)) + "</b> (" + esc(typeof nhCompass === "function" ? nhCompass(p.x, p.z) : "") + ") · " + esc(typeof nhRingName === "function" ? nhRingName(p.x, p.z) : ""),
esc(typeof nhLabel === "function" ? nhLabel(r.tier, r.strength, nhName(r.kind)) : String(r.kind)) + " · bounty " + esc(String(r.value)) + " gold · last seen " + (p.ago ? p.ago + " min ago" : "just now"),
(typeof nhBeacon === "function" && typeof nhCanFight === "function" && nhCanFight()) ? function () { gapClose(); nhBeacon(r); } : null, "Show me"]);
});
var night = typeof nhNight === "function" && nhNight();
var intro = (night ? "Night: they are trying for the rings." : "Day: the raiders have gone back to the Wilds. Out here they attack anyone, day or night.") +
" " + (NH.hunters || 0) + ((NH.hunters || 0) === 1 ? " hunter" : " hunters") + " on duty." + (rows.length ? "" : " No raid reported in the rings just now.");
gapChoices("The map room · sector reports", intro, rows);
GMW.mapHtml = GAPP.el ? GAPP.el.innerHTML : null;
},
function (boarding) {
if (typeof ORB_LINES === "undefined" || typeof orbBoard !== "function" || typeof orbNext !== "function") {
setStatus("The Orbital Line is not running just now.");
return;
}
var now = orbNow(), rows = [];
ORB_LINES.forEach(function (line) {
if (orbStop(line, "earth") < 0 || !line.stops[1])
return;
var d = line.stops[1], via = line.stops[2] ? " (then " + line.stops[2].name + ")" : "", t = orbNext(line, now + 20);
rows.push(["<b style='color:" + esc(line.col || "#E8C27A") + "'>" + esc(line.name) + "</b> to " + esc(d.name) + esc(via),
"Departs in " + orbMins(t - now) + ", then every " + Math.round(ORB_PERIOD / 60 * 10) / 10 + " minutes",
boarding ? function () { gapClose(); orbBoard(line.k, "earth", d.k); } : null, "Board"]);
});
gapChoices(boarding ? "Gate · Orbital Line" : "Departures", (boarding ? "Space Corp shuttles, on the timetable. " : "Board at the gates, through security. ") + "No fare: the Space Corp runs the line for the city. Shuttles home land at Launch Pad 1, the Space Corp Spaceport in the Harvest Ring.", rows);
},
function (K) {
var W = K.W, put = K.put;
put("gmwtackle", -W / 4 - 0.6, K.B + 4.4, 0);
K.staff("Tackle shop clerk", -W / 4 - 0.6, K.B + 3.6, 0);
put("wgshelving", -W / 4 - 0.6, K.B + 0.5, 0);
put("gmwbaitfridge", K.L + 1.0, K.B + 0.5, 0);
put("gmwrodrack", K.L + 0.2, K.B + 3.6, Math.PI / 2);
put("gmwrodrack", K.L + 0.2, K.B + 5.6, Math.PI / 2);
put("gmwrodrack", K.L + 0.2, K.B + 7.6, Math.PI / 2);
put("gmwfishslab", W / 4 + 0.6, K.B + 4.4, 0);
K.staff("Boathouse fishmonger", W / 4 + 0.6, K.B + 3.5, 0);
put("butcherblock", W / 4 + 1.6, K.B + 0.7, 0);
put("weighscale", W / 4 - 1.4, K.B + 0.7, 0);
put("tricecrates", K.R - 1.0, K.B + 2.4, -Math.PI / 2);
put("gmwboard", 3.0, K.B + 0.08, 0);
put("gmwlifebuoy", -3.0, K.B + 0.1, 0);
put("benchin", -3.2, K.Fz - 3.4, 0);
put("benchin", 3.2, K.Fz - 3.4, 0);
put("trnets", K.R - 0.15, K.Fz - 4.4, -Math.PI / 2);
put("noticeboard", K.L + 0.12, K.Fz - 3.0, Math.PI / 2);
put("clock", K.R - 0.15, K.B + 5.6, -Math.PI / 2);
put("plant", K.L + 0.8, K.Fz - 1.0, 0);
put("plant", K.R - 0.8, K.Fz - 1.0, 0);
put("rug", 0, K.Fz - 4.0, 0);
K.spot(-W / 4, K.B + 6.2, "the tackle shop");
K.spot(W / 4, K.B + 6.2, "the fishmonger");
K.spot(0, K.Fz - 2, "the door");
},
function (K) {
var W = K.W, put = K.put;
put("gmwtrophydesk", -W / 4, K.B + 4.4, 0);
K.staff("Wildwarden", -W / 4, K.B + 3.5, 0);
put("gmwbountyboard", -W / 4, K.B + 0.08, 0);
put("displaycase", K.L + 1.4, K.B + 0.5, 0);
put("gmwqmcounter", W / 4, K.B + 4.4, 0);
K.staff("Outpost quartermaster", W / 4, K.B + 3.5, 0);
put("gmwfindshelf", W / 4, K.B + 0.3, 0);
put("trsacks", K.R - 1.2, K.B + 0.8, 0);
put("weaponrack", K.L + 0.5, K.B + 8.0, Math.PI / 2);
put("gmwwarnboard", K.L + 0.08, K.Fz - 3.2, Math.PI / 2);
put("fireplace", K.R - 0.4, K.B + 9.0, -Math.PI / 2);
put("armchair", K.R - 2.2, K.B + 7.8, -Math.PI / 2);
put("armchair", K.R - 2.2, K.B + 10.2, -Math.PI / 2);
put("trbenchtable", -2.6, K.B + 9.6, 0);
put("pelt", 2.2, K.B + 9.6, 0);
put("trdutydesk", K.R - 2.0, K.Fz - 2.4, -Math.PI / 2);
K.staff("Outpost sentry", K.R - 1.2, K.Fz - 2.4, -Math.PI / 2);
put("ironchandelier", 0, 0, 0);
put("plant", K.L + 0.8, K.Fz - 1.0, 0);
K.spot(-W / 4, K.B + 6.2, "the trophy counter");
K.spot(W / 4, K.B + 6.2, "the quartermaster");
K.spot(0, K.Fz - 2, "the door");
},
function (K) {
var W = K.W, put = K.put, x, i;
var cx0 = K.L + 2.6;
for (i = 0; i < 4; i++) {
x = cx0 + i * 3.0;
put("gmwcheckin", x, K.B + 3.0, 0);
K.staff("Check-in agent", x, K.B + 2.1, 0);
}
for (x = K.L + 1.8; x < cx0 + 3 * 3.0 + 1.0; x += 3.2)
put("wgconveyor", x, K.B + 0.6, 0);
put("gmwqueue", cx0 + 1.5, K.B + 6.0, 0);
put("gmwqueue", cx0 + 6.5, K.B + 6.0, 0);
put("gmwdepboard", cx0 + 4.5, K.B + 0.1, 0);
put("gmwdepboard", 4.6, K.B + 0.1, 0);
put("gmwxray", -2.6, K.B + 3.6, Math.PI / 2);
put("gmwscanarch", 0, K.B + 3.2, 0);
put("gmwqueue", -1.6, K.B + 6.8, Math.PI / 2);
put("gmwqueue", 1.6, K.B + 6.8, Math.PI / 2);
K.staff("Security screener", -4.1, K.B + 3.6, Math.PI / 2);
K.staff("Security screener", 1.6, K.B + 4.4, -Math.PI / 2);
put("wgreception", 7.4, K.B + 5.0, 0);
K.staff("Terminal information officer", 7.4, K.B + 4.2, 0);
put("trcounter", K.R - 3.6, K.B + 2.4, 0);
put("trtill", K.R - 6.0, K.B + 2.4, 0);
put("wgcoffeebar", K.R - 0.35, K.B + 4.6, -Math.PI / 2);
put("fridge", K.R - 1.0, K.B + 0.4, 0);
K.staff("Terminal café attendant", K.R - 4.4, K.B + 1.6, 0);
for (var z = K.B + 7.0; z < K.Fz - 3.0; z += 3.0)
for (var tx = K.R - 6.4; tx < K.R - 1.4; tx += 4.0) {
put("table", tx, z, 0);
put("chair", tx - 0.95, z, Math.PI / 2);
put("chair", tx + 0.95, z, -Math.PI / 2);
}
for (var sz = K.B + 9.0; sz < K.Fz - 4.5; sz += 3.0)
for (var sx = K.L + 2.6; sx < -3.2; sx += 3.0)
put("wgchairrow", sx, sz, Math.PI);
put("gmwtrolley", K.L + 1.2, K.Fz - 1.6, 0);
put("gmwtrolley", K.L + 2.2, K.Fz - 1.6, 0);
put("clock", -4.6, K.B + 0.1, 0);
put("plant", K.L + 0.8, K.Fz - 1.0, 0);
put("plant", K.R - 0.8, K.Fz - 1.0, 0);
put("plant", 4.0, K.Fz - 1.0, 0);
K.spot(0, K.B + 7.6, "security");
K.spot(cx0 + 4.5, K.B + 7.0, "check-in");
K.spot(K.R - 4, K.B + 8, "the café");
K.spot(0, K.Fz - 2, "the doors");
}
];
});
