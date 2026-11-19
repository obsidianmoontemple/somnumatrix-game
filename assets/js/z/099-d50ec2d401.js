/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(99, function () {
"use strict";
return [
function (force) {
if (!force && Date.now() - MALL.at < 60000)
return Promise.resolve(MALL.stores);
MALL.at = Date.now();
var q = (typeof signedIn === "function" && signedIn()) ? cityRpc("mall_board") :
fetch(DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/rest/v1/rpc/mall_board", { method: "POST", headers: { apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + DW_CONFIG.supabaseKey, "Content-Type": "application/json" }, body: "{}" }).then(function (r) { return r.ok ? r.json() : []; });
return q.then(function (rows) { MALL.stores = rows || []; if (MALL.g)
mallSigns(); return MALL.stores; })
.catch(function () { return MALL.stores; });
},
function (text, sub, col) {
var c = document.createElement("canvas");
c.width = 512;
c.height = 96;
var x = c.getContext("2d");
x.fillStyle = col || "#1A1D24";
x.fillRect(0, 0, 512, 96);
x.fillStyle = "#F4EEDC";
x.textAlign = "center";
x.textBaseline = "middle";
var F = fitLines(x, String(text), 480, 1, 48, 18, "700", "Georgia, serif");
x.font = "700 " + F.size + "px Georgia, serif";
x.fillText(F.lines[0], 256, sub ? 36 : 50);
if (sub) {
x.font = "400 18px Georgia, serif";
x.fillStyle = "#D8CFB8";
x.fillText(String(sub).slice(0, 56), 256, 74);
}
var t = new THREE.CanvasTexture(c);
t.anisotropy = 4;
return t;
},
function () {
if (MALL.g)
return;
var G = new THREE.Group();
G.position.set(MALL.cx, 0, MALL.cz);
var A = MALL.A;
mdBuild(G);
MALL.units = [];
for (var i = 0; i < MALL_UNITS; i++) {
var pl = mdUnitPlace(i + 1), t = MD.slots.slots[pl.slot].t, y = pl.lv * MD.FL;
var ex = Math.cos(t) * (A + 4), ez = Math.sin(t) * (MALL.B + 4);
var nx = Math.cos(t) / (A + 4), nz = Math.sin(t) / (MALL.B + 4), nl = Math.hypot(nx, nz);
nx /= nl;
nz /= nl;
MALL.units.push({ i: i + 1, lv: pl.lv, y: y, x: MALL.cx + ex, z: MALL.cz + ez, ex: ex, ez: ez, nx: nx, nz: nz, ry: Math.atan2(-nx, -nz), grp: null, key: null });
}
var st = build({ id: "__mallug", archetype: "subwayentrance", attrs: {}, sign: "Underground · World Mall", solid: false, detail: 3, nights: [], city: true });
st.position.set(-A + 18, 0, 0);
st.rotation.y = Math.PI / 2;
G.add(st);
MALL.station = { x: MALL.cx - A + 18, z: MALL.cz };
G.visible = false;
scene.add(G);
MALL.g = G;
mallSigns();
},
function () {
if (!MALL.units.length || !MALL.g)
return;
MALL.units.forEach(function (u) {
var st = mallStoreAt(u.i), key = st ? JSON.stringify([st.name, st.tagline, st.color, st.look, (st.products || []).map(function (p) { return p.id + ":" + p.image; })]) : "empty";
if (u.key === key && u.grp)
return;
if (u.grp) {
MALL.g.remove(u.grp);
mdDispose(u.grp);
}
var g = mfBuild(THREE, st);
g.position.set(u.ex, u.y || 0, u.ez);
g.rotation.y = u.ry;
MALL.g.add(g);
try {
mdCompact(g);
}
catch (e) { }
if (!st)
try {
mdHoarding(g);
}
catch (e) { }
if (st)
mfFeature(THREE, g, st);
u.grp = g;
u.key = key;
mdKeeper(u, st);
});
mdDirectory();
},
function () {
mallBuild();
mallStoresLoad(true);
MALL.on = true;
MALL.g.visible = true;
MD.lvl = 0;
MD.ride = null;
if (store.inside && typeof exitInterior === "function")
exitInterior(true);
camera.position.set(MALL.station.x + 8, 1.72, MALL.station.z);
yaw = -Math.PI / 2;
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
if (typeof walkResume !== "undefined")
walkResume = null;
setStatus("<b>The World Mall.</b> Walk up to any shop window to step in. The Underground home is at the west end.");
},
function () {
var el = document.getElementById("mall");
if (el || !document.body)
return el;
var css = document.createElement("style");
css.textContent = "#mall{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:60;display:none;width:min(720px,calc(100vw - 24px));max-height:84vh;overflow:auto;" +
"background:rgba(10,11,16,.97);border:1px solid var(--gold,#C9A868);border-radius:6px;padding:16px 18px;font:14px var(--sans);color:var(--bone)}" +
"#mall .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;margin-top:12px}" +
"#mall .card{border:1px solid var(--line,#2A2C34);border-radius:4px;padding:10px;display:flex;flex-direction:column;gap:6px}" +
"#mall .card img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:3px;background:#1A1D24}" +
"#mall-prompt{position:fixed;left:50%;bottom:calc(120px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:45;display:none;" +
"background:rgba(10,12,18,.92);border:1px solid var(--gold,#C9A868);border-radius:3px;padding:9px 14px;font:13px var(--sans);color:var(--bone);cursor:pointer}" +
"#mall-mine{position:fixed;right:12px;top:calc(60px + env(safe-area-inset-top,0px));z-index:45;display:none;background:rgba(10,12,18,.92);color:var(--bone);" +
"border:1px solid var(--gold,#C9A868);border-radius:3px;padding:8px 12px;font:13px var(--sans);cursor:pointer}" +
"#mall .buy{display:flex;gap:10px;align-items:center;padding:7px 0;border-bottom:1px solid var(--line,#2A2C34)}" +
"#mall .buy img{width:44px;height:44px;object-fit:cover;border-radius:3px;background:#1A1D24;flex:none}";
document.head.appendChild(css);
el = document.createElement("div");
el.id = "mall";
document.body.appendChild(el);
var pr = document.createElement("div");
pr.id = "mall-prompt";
document.body.appendChild(pr);
var mb = document.createElement("button");
mb.id = "mall-mine";
mb.type = "button";
mb.textContent = "My purchases";
mb.onclick = function () { mallMine(); };
document.body.appendChild(mb);
return el;
},
function (u) {
var el = mallEl(), s = mallStoreAt(u.i);
MALL.open = true;
if (document.exitPointerLock)
document.exitPointerLock();
if (!s) {
el.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:16px">Unit ' + u.i + ' — to let</b><button class="btn" id="mall-x">Leave</button></div>' +
'<p style="color:var(--dim);line-height:1.6">A shop in the World Mall for a real store: its own window, its own range sold here for gold, and the way to buy the real thing. Stores are let by the keeper.</p>' +
'<button class="btn" id="mall-mine-in">My purchases</button>';
}
else {
var LK = mfLook(s), acc = mfHex(s.color || 0xC9A868), tr = mfHex(LK.trim);
el.style.borderColor = acc;
el.innerHTML = (LK.banner ? '<div style="margin:-16px -18px 12px;height:150px;border-radius:6px 6px 0 0;background:#111 url(\'' + esc(LK.banner).replace(/'/g, "%27") + '\') center/cover"></div>' : '<div style="margin:-16px -18px 12px;height:8px;border-radius:6px 6px 0 0;background:linear-gradient(90deg,' + acc + ',' + tr + ')"></div>') +
'<div style="display:flex;justify-content:space-between;align-items:center;gap:10px"><span style="display:flex;align-items:center;gap:10px">' +
(safeUrl(s.logo) ? '<img src="' + esc(safeUrl(s.logo)) + '" alt="" style="width:44px;height:44px;object-fit:contain;border-radius:4px;background:#fff">' : '') +
'<span><b style="font-size:17px">' + esc(s.name) + '</b><br><span style="color:var(--dim)">' + esc(s.tagline || "") + '</span></span></span><span style="display:flex;gap:6px"><button class="btn" id="mall-mine-in">My purchases</button><button class="btn" id="mall-x">Leave</button></span></div>' +
(LK.welcome ? '<p style="margin:10px 0 0;line-height:1.6;font-family:' + (MF_FONTS[LK.font] || MF_FONTS.serif) + '">' + esc(LK.welcome) + '</p>' : '') +
(safeUrl(s.site) ? '<div style="margin-top:6px"><a href="' + esc(safeUrl(s.site)) + '" target="_blank" rel="noopener" style="color:' + acc + '">Visit ' + esc(s.name) + '</a></div>' : '') +
'<div class="grid">' + (s.products || []).map(function (p) {
return '<div class="card">' + (safeUrl(p.image) ? '<img src="' + esc(safeUrl(p.image)) + '" alt="" loading="lazy">' : '') +
'<b>' + esc(p.name) + '</b>' + (p.description ? '<span style="color:var(--dim);font-size:12px;line-height:1.4">' + esc(p.description) + '</span>' : '') +
'<span>' + (+p.gold || 0) + ' gold' + (p.real ? ' <span style="color:var(--dim)">· the real one ' + esc(p.real) + '</span>' : '') + '</span>' +
'<span style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn" data-buy="' + p.id + '">Buy for ' + p.gold + ' gold</button>' +
(safeUrl(p.url) ? '<a class="btn" data-pref="store" data-pitem="' + (+p.id || 0) + '" href="' + esc(safeUrl(p.url)) + '" target="_blank" rel="noopener" style="text-decoration:none">Buy the real one</a>' : '') + '</span></div>';
}).join("") + '</div>' + ((s.products || []).length ? '' : '<p style="color:var(--dim)">The shelves are being stocked.</p>') +
'<div id="mall-msg" style="margin-top:10px;color:var(--dim)"></div>';
}
el.style.display = "block";
document.getElementById("mall-x").onclick = mallClose;
var mi = document.getElementById("mall-mine-in");
if (mi)
mi.onclick = function () { mallMine(u); };
Array.prototype.forEach.call(el.querySelectorAll("[data-buy]"), function (b) {
b.onclick = function () {
var msg = document.getElementById("mall-msg");
if (!(typeof signedIn === "function" && signedIn())) {
msg.textContent = "Sign in to buy.";
return;
}
msg.textContent = "Paying…";
cityRpc("mall_buy", { p_product: +b.getAttribute("data-buy") }).then(function (o) {
msg.innerHTML = o === "ok" ? "<b>Bought.</b> It is yours — it is on your list under My purchases." : esc(String(o));
if (o === "ok")
MALL.mine = null;
if (o === "ok" && typeof refreshStanding === "function")
refreshStanding();
}).catch(function (e) { msg.textContent = e.message; });
};
});
},
function (back) {
var el = mallEl();
MALL.open = true;
if (document.exitPointerLock)
document.exitPointerLock();
el.style.borderColor = "";
el.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:16px">My purchases</b><span style="display:flex;gap:6px">' +
(back ? '<button class="btn" id="mall-back">Back to the shop</button>' : '') + '<button class="btn" id="mall-x">Close</button></span></div><div id="mall-mine-list" style="margin-top:10px;color:var(--dim)">Looking up what you have bought…</div>';
el.style.display = "block";
document.getElementById("mall-x").onclick = mallClose;
var bk = document.getElementById("mall-back");
if (bk)
bk.onclick = function () { mallOpen(back); };
var list = document.getElementById("mall-mine-list");
if (!(typeof signedIn === "function" && signedIn())) {
list.textContent = "Sign in to see what you have bought.";
return;
}
cityRpc("my_mall_purchases", {}).then(function (rows) {
rows = Array.isArray(rows) ? rows : [];
MALL.mine = rows;
if (!document.getElementById("mall-mine-list"))
return;
if (!rows.length) {
list.textContent = "Nothing yet. Everything you buy in the World Mall is listed here.";
return;
}
var tot = rows.reduce(function (a, r) { return a + (+r.gold || 0); }, 0);
list.innerHTML = '<div style="margin-bottom:6px">' + rows.length + ' bought · ' + tot + ' gold in all</div>' + rows.map(function (r) {
var when = r.at ? new Date(r.at) : null;
return '<div class="buy">' + (safeUrl(r.image) ? '<img src="' + esc(safeUrl(r.image)) + '" alt="" loading="lazy">' : '<span style="width:44px;height:44px;flex:none;border-radius:3px;background:#1A1D24"></span>') +
'<span style="flex:1;color:var(--bone)"><b>' + esc(r.product || "A product no longer sold") + '</b><br><span style="color:var(--dim);font-size:12px">' + esc(r.store || "") +
(when ? ' · ' + when.toLocaleDateString() + ' ' + when.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : '') + '</span></span>' +
'<span style="white-space:nowrap">' + (+r.gold || 0) + ' gold</span>' + (safeUrl(r.url) ? ' <a class="btn" href="' + esc(safeUrl(r.url)) + '" target="_blank" rel="noopener" style="text-decoration:none">The real one</a>' : '') + '</div>';
}).join("");
}).catch(function (e) { list.textContent = /my_mall_purchases|function|schema/i.test(e.message || "") ? "Your purchases list is not on this server yet (it comes with the Underground update)." : e.message; });
}
];
});
