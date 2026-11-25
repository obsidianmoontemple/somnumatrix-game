/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var WR = { open: false, tab: "board", board: null, roll: null, at: 0, msg: "", world: "", missing: false };
var WR_WORLD = { somnucor: "Somnucor", northpole: "The North Pole", neverland: "Neverland", sea: "The Endless Sea", underdark: "The Underdark", moon: "The Moon", mars: "Mars", station: "The Orbital Station" };
var WR_ORDER = ["somnucor", "northpole", "neverland", "sea", "underdark", "moon", "mars", "station"];
function wrAtOffice() {
if (typeof somnucorRealm !== "function")
return false;
var r = somnucorRealm();
if (!r || (store.here || 0) !== r.id)
return false;
if (store.inside)
return !!(typeof INT !== "undefined" && INT && INT.spec && INT.spec.workplace === "The Land Office");
var w = typeof wpAt === "function" && wpAt("The Land Office"), P = camera.position;
return !!(w && Math.hypot(P.x - w.x, P.z - w.z) < 22);
}
function wrLoad(force) { return __ZC(201, 0, this, arguments, new.target); }
function wrDeal(kind, id) {
var go = kind === "buy" ? (typeof buyLot === "function" ? buyLot : null) : (typeof takeLease === "function" ? takeLease : null);
if (!go)
return;
go(id).then(function () { if (typeof lotsAt !== "undefined")
lotsAt = 0; if (typeof loadLots === "function")
loadLots(); WR.at = 0; wrLoad(true); });
}
var WR_BOX = "position:fixed;left:50%;transform:translateX(-50%);bottom:calc(140px + env(safe-area-inset-bottom,0px));z-index:47;width:min(620px,calc(100vw - 24px));max-height:min(72vh,660px);overflow:auto;background:rgba(10,10,14,.97);border:1px solid #C9A868;border-radius:4px;padding:14px 16px;color:var(--bone);font:13px var(--sans)";
function wrPaint(force) {
var here = wrAtOffice() && typeof signedIn === "function" && signedIn();
var b = document.getElementById("wr-btn");
if (!b && here && document.body) {
b = document.createElement("button");
b.id = "wr-btn";
b.type = "button";
b.textContent = "The Land Office counter";
b.style.cssText = "position:fixed;left:50%;transform:translateX(-50%);bottom:calc(96px + env(safe-area-inset-bottom,0px));z-index:46;background:rgba(14,12,8,.94);color:#F0D8A8;border:1px solid #C9A868;border-radius:3px;padding:9px 14px;font:13px var(--sans);cursor:pointer";
b.onclick = function () { WR.open = !WR.open; if (WR.open)
wrLoad(true); wrPaint(true); };
document.body.appendChild(b);
}
if (b)
b.style.display = here && !WR.open ? "block" : "none";
var box = document.getElementById("wr-box");
if (!here || !WR.open) {
if (box)
box.style.display = "none";
if (!here)
WR.open = false;
return;
}
if (!box) {
box = document.createElement("div");
box.id = "wr-box";
box.style.cssText = WR_BOX;
document.body.appendChild(box);
}
box.style.display = "block";
if (!force && box.dataset.ok)
return;
box.dataset.ok = "1";
var h = '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><b style="font-size:15px;color:#E8C27A">The Land Office</b>' +
'<span><button class="btn" data-wrtab="board"' + (WR.tab === "board" ? ' style="border-color:#C9A868"' : "") + '>Lots on the market</button> ' +
(WR.roll ? '<button class="btn" data-wrtab="roll"' + (WR.tab === "roll" ? ' style="border-color:#C9A868"' : "") + '>The address roll</button> ' : "") +
'<button class="btn" id="wr-x">Close</button></span></div>';
h += '<div style="color:#aaa;margin:4px 0 8px">Every lot in every world is bought and let here, and nowhere else.</div>';
h += '<select id="wr-world" style="margin-bottom:8px"><option value="">Every world</option>' + WR_ORDER.map(function (k) { return '<option value="' + k + '"' + (WR.world === k ? " selected" : "") + ">" + WR_WORLD[k] + "</option>"; }).join("") + "</select>";
if (WR.tab === "roll" && WR.roll) {
var rr = WR.roll.filter(function (l) { return !WR.world || l.world === WR.world; });
h += rr.slice(0, 300).map(function (l) {
var held = [l.owner_name ? "owner " + esc(l.owner_name) : "", l.tenant_name ? "tenant " + esc(l.tenant_name) : ""].filter(Boolean).join(", ") || '<span style="color:#888">nobody</span>';
return '<div style="border-top:1px solid #2A2A30;padding:6px 0"><b>' + esc(l.name) + '</b> <span style="color:#999">' + esc(l.quarter || "") + " · " + esc(WR_WORLD[l.world] || l.world) + "</span><br>" + held +
(l.reserved ? ' · <span style="color:#E8C27A">assigned by the Keeper only</span>' : "") + "</div>";
}).join("") || '<div style="color:#999">Nothing on the roll.</div>';
h += '<div style="color:#999;margin-top:8px">The Keeper assigns lots from the address roll on the Keeper page.</div>';
}
else {
var rows = (WR.board || []).filter(function (l) { return !WR.world || l.world === WR.world; });
if (!WR.board)
h += '<div style="color:#999">Opening the books…</div>';
var last = "";
rows.forEach(function (l) {
if (l.world !== last) {
last = l.world;
h += '<div style="margin-top:10px;color:#E8C27A;font-size:14px">' + esc(WR_WORLD[l.world] || l.world) + "</div>";
}
var deal = "";
if (l.mine)
deal = '<span style="color:#9FD89F">yours</span>';
else if (l.reserved)
deal = '<span style="color:#C9A868">assigned by the Keeper</span>';
else if (l.held)
deal = '<span style="color:#888">taken</span>';
else {
if (l.for_sale && l.price != null)
deal += '<button class="btn" data-wrbuy="' + l.id + '">Buy, ' + Number(l.price).toLocaleString() + ' gold</button> ';
if (l.to_let && l.rent != null)
deal += '<button class="btn" data-wrlet="' + l.id + '">Lease, ' + Number(l.rent).toLocaleString() + ' a week</button>';
if (!deal)
deal = '<span style="color:#888">off the market</span>';
}
h += '<div style="border-top:1px solid #2A2A30;padding:6px 0"><b>' + esc(l.name) + '</b> <span style="color:#999">' + esc(l.quarter || "") + "</span>" +
(l.note ? '<br><span style="color:#bbb">' + esc(l.note) + "</span>" : "") + '<div style="margin-top:4px">' + deal + "</div></div>";
});
if (WR.board && !rows.length)
h += '<div style="color:#999">No lots in that world yet.</div>';
if (WR.missing)
h += '<div style="color:#E8A0A0;margin-top:8px">Lots in the other worlds open soon. The city\'s own lots are here meanwhile.</div>';
}
box.innerHTML = h;
document.getElementById("wr-x").onclick = function () { WR.open = false; wrPaint(true); };
document.getElementById("wr-world").onchange = function () { WR.world = this.value; wrPaint(true); };
Array.prototype.forEach.call(box.querySelectorAll("[data-wrtab]"), function (x) { x.onclick = function () { WR.tab = x.getAttribute("data-wrtab"); wrPaint(true); }; });
Array.prototype.forEach.call(box.querySelectorAll("[data-wrbuy]"), function (x) { x.onclick = function () { wrDeal("buy", +x.getAttribute("data-wrbuy")); }; });
Array.prototype.forEach.call(box.querySelectorAll("[data-wrlet]"), function (x) { x.onclick = function () { wrDeal("let", +x.getAttribute("data-wrlet")); }; });
}
setInterval(function () { try {
wrPaint(false);
if (WR.open && Date.now() - WR.at > 30000)
wrLoad();
}
catch (e) {
if (window.console)
console.warn("[realty]", e);
} }, 400);
var WHM = { homes: {}, at: 0, rows: null, signs: [] };
var WH_PLAN = {
northpole: { style: "cottage", face: { x: 0, z: 18 }, lots: [["Hollyberry Lane 1", -150, -20], ["Hollyberry Lane 2", -150, 10], ["Hollyberry Lane 3", -150, 40], ["Hollyberry Lane 4", -150, 70],
["Hollyberry Lane 5", -180, -20], ["Hollyberry Lane 6", -180, 10], ["Hollyberry Lane 7", -180, 40], ["Hollyberry Lane 8", -180, 70]] },
neverland: { style: "cove", face: { x: 135, z: -460 }, lots: [["Mermaid Cove 1", 90, -380], ["Mermaid Cove 2", 120, -380], ["Mermaid Cove 3", 150, -380], ["Mermaid Cove 4", 180, -380],
["Mermaid Cove 5", 90, -350], ["Mermaid Cove 6", 120, -350], ["Mermaid Cove 7", 150, -350], ["Mermaid Cove 8", 180, -350]] },
sea: { style: "villa", face: { x: 4600, z: -2600 }, gr: function (x, z) { return Math.max(seaHeight(x, z), -1.2); }, bl: function (x, z, f) { return seaHeight(x, z) < -1 || worldSolidAt(SEA.solids || [], x, z, f); }, lots: [["Ithaca Shore 1", 4095, -2660], ["Ithaca Shore 2", 4100, -2620], ["Ithaca Shore 3", 4100, -2580], ["Ithaca Shore 4", 4095, -2540],
["Ithaca Shore 5", 4030, -2620], ["Ithaca Shore 6", 4030, -2575]] },
underdark: { style: "spire", face: { x: 200, z: -800 }, lots: [["Spire Row 1", 120, -620], ["Spire Row 2", 145, -612], ["Spire Row 3", 170, -606], ["Spire Row 4", 195, -604],
["Spire Row 5", 220, -606], ["Spire Row 6", 245, -612]] },
moon: { style: "dome", face: { x: 0, z: 0 }, lots: [["Tranquility Domes 1", -60, 40], ["Tranquility Domes 2", -45, 62], ["Tranquility Domes 3", -22, 74], ["Tranquility Domes 4", 4, 78]] },
mars: { style: "dome", face: { x: 0, z: 0 }, lots: [["Red Plain Habitats 1", -60, 40], ["Red Plain Habitats 2", -45, 62], ["Red Plain Habitats 3", -22, 74], ["Red Plain Habitats 4", 4, 78]] },
station: { style: "cabin", face: { x: 0, z: 0 }, lots: [["Station Ring Cabin 1", -20, 24], ["Station Ring Cabin 2", -12, 24], ["Station Ring Cabin 3", 12, 24], ["Station Ring Cabin 4", 20, 24]] }
};
var WH_STYLE = {
cottage: { w: 9, d: 7, h: 3.1, wall: 0x7A4E30, trim: 0xF2EEE6, roof: 0xF4F6FA, roofEdge: 0xA8323A, floor: 0x8A6440, door: 0xA8323A, rug: 0xA8323A, quilt: 0x2E6A3A, feature: "hearth", pitch: 0.62 },
cove: { w: 9, d: 7, h: 3, wall: 0xA8844E, trim: 0x6A4A2A, roof: 0xC8A860, roofEdge: 0x8A6A3A, floor: 0x9A7448, door: 0x3A6A8A, rug: 0x3A7A8A, quilt: 0xD8B060, feature: "chest", pitch: 0.7 },
villa: { w: 10, d: 8, h: 3.4, wall: 0xF0EBE0, trim: 0xB8583A, roof: 0xB8583A, roofEdge: 0x8A3A22, floor: 0xD8C8A8, door: 0x2E5A9A, rug: 0x2E5A9A, quilt: 0xE8E0D0, feature: "amphora", pitch: 0.28 },
spire: { w: 8, d: 8, h: 3.6, wall: 0x2E2A36, trim: 0x5A3A8A, roof: 0x24202C, roofEdge: 0x5A3A8A, floor: 0x3A3644, door: 0x5A3A8A, rug: 0x4A2A6A, quilt: 0x5A2A7A, feature: "mushroom", pitch: 1.1, glow: 0xB890FF },
dome: { w: 7, d: 7, h: 2.6, r: 5, wall: 0xD8DCE2, trim: 0x3A6AB8, roof: 0xC8D8E8, floor: 0x8A8E98, door: 0x3A6AB8, rug: 0x3A4A6A, quilt: 0x4A6A9A, feature: "garden" },
cabin: { w: 5.6, d: 4.6, h: 2.7, wall: 0xC8CCD4, trim: 0x3A6AB8, floor: 0x5A606C, door: 0x3A6AB8, rug: 0x2A3A5A, quilt: 0x3A5A8A, feature: "desk", flat: true }
};
function whFurnish(g, S, W, D, seed) { return __ZC(201, 1, this, arguments, new.target); }
function whHouse(S, seed) { return __ZC(201, 2, this, arguments, new.target); }
function whSignTex(name, line) { return wSign([name, line, "Bought and let at the Land Office, Somnucor"], 2.4, 1.2, "#2A2018", "#F0D8A8"); }
function whStatus(name) { return __ZC(201, 3, this, arguments, new.target); }
function whSpot(W, x, z, hw, hd, taken, P) { return __ZC(201, 4, this, arguments, new.target); }
function whRaise(key, W, G, solids) { return __ZC(201, 5, this, arguments, new.target); }
function whGround(key, x, z, h) { return __ZC(201, 6, this, arguments, new.target); }
function whSurfKey() { return typeof SF !== "undefined" && SF.k ? SF.k : null; }
(function () {
["northpole", "neverland", "sea", "underdark", "station"].forEach(function (key) {
var W = WORLDS[key];
if (!W)
return;
var b = W.build, g0 = W.ground;
W.build = function (G, opt) {
var r = b.apply(this, arguments);
try {
var sol = key === "northpole" ? NP.solids : key === "neverland" ? NV.solids : key === "sea" ? (SEA.solids = SEA.solids || []) : key === "underdark" ? UD.solids : STN.solids;
whRaise(key, W, G, sol);
}
catch (e) {
if (window.console)
console.warn("[world homes]", key, e);
}
return r;
};
W.ground = function (x, z, feet) { return whGround(key, x, z, g0.apply(this, arguments)); };
});
var SFW = WORLDS.surface;
if (SFW && typeof sfBuild === "function") {
var sb = sfBuild, sg0 = SFW.ground;
sfBuild = function (k) {
var r = sb.apply(this, arguments);
WHM.homes.moon = null;
WHM.homes.mars = null;
try {
if (WH_PLAN[k]) {
var tmp = Object.create(SFW);
tmp.key = k;
whRaise(k, tmp, SFW.g, SF.solids);
}
}
catch (e) {
if (window.console)
console.warn("[world homes]", k, e);
}
return r;
};
SFW.ground = function (x, z, feet) { var k = whSurfKey(); var h = sg0.apply(this, arguments); return k ? whGround(k, x, z, h) : h; };
}
})();
function whTick() {
var key = typeof WLD !== "undefined" && WLD.on;
if (!key)
return;
if (key === "surface")
key = whSurfKey();
var L = key && WHM.homes[key];
if (!L || !L.length)
return;
if (Date.now() - WHM.at > 60000 && typeof signedIn === "function" && signedIn()) {
WHM.at = Date.now();
cityRpc("realty_board", {}).then(function (d) { WHM.rows = d || []; }).catch(function () { });
}
L.forEach(function (o) {
var line = whStatus(o.name);
if (line === o.line)
return;
o.line = line;
var t = whSignTex(o.name, line);
if (o.sign.material.map)
o.sign.material.map.dispose();
o.sign.material.map = t.material.map;
o.sign.material.needsUpdate = true;
});
}
setInterval(function () { try {
whTick();
}
catch (e) { } }, 1000);
