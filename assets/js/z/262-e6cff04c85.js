/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(262, function () {
"use strict";
return [
function (k, rows) {
var S = SHOPC_SHELVES[k];
var out = (rows || []).filter(function (r) { return r && r.listed !== false && (+r.price || 0) > 0 && (!S || (S.kind && S.kind.test(String(r.kind || ""))) || (S.name && S.name.test(String(r.name || "")))); });
return out.length ? out : (rows || []).filter(function (r) { return r && r.listed !== false && (+r.price || 0) > 0; }).slice(0, 30);
},
function () {
var el = document.getElementById("shopc");
if (!el) {
el = document.createElement("div");
el.id = "shopc";
el.style.cssText = "position:fixed;z-index:58;left:50%;top:50%;transform:translate(-50%,-50%);width:min(460px,calc(100vw - 28px));max-height:min(78vh,620px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(18,15,24,.97),rgba(9,8,12,.98));border:1px solid #8A7A4A;border-radius:8px;padding:12px 14px 14px;color:var(--bone,#C9BEA8);font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);display:none;-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", function (e) {
var b = e.target.closest && e.target.closest("[data-shc]");
if (!b)
return;
var a = b.getAttribute("data-shc");
if (a === "x")
return shopcClose();
if (a === "pack") {
shopcClose();
if (typeof bkpOpen === "function")
bkpOpen();
return;
}
var id = +a, r = (SHOPC.cat || []).filter(function (q) { return +q.id === id; })[0];
if (!r)
return;
if (!(typeof signedIn === "function" && signedIn())) {
SHOPC.msg = "Sign in and join Somnucor to buy.";
return shopcPaint();
}
if (!confirm("Buy the " + r.name + " for " + Number(r.price).toLocaleString() + " gold? It's yours for good, in your backpack."))
return;
b.disabled = true;
SHOPC.msg = "Paying…";
shopcPaint();
Promise.resolve(buyItem(r.id, null)).then(function (o) { SHOPC.msg = o === "ok" ? "<b style='color:#9AFFA0'>Bought: " + esc(r.name) + ".</b> It is in your backpack." : "<span style='color:#FFB89A'>" + esc(String(o || "Not bought.")) + "</span>"; shopcPaint(); });
});
document.body.appendChild(el);
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return !!SHOPC.open; }, close: shopcClose });
}
return el;
},
function () {
var el = shopcEl(), k = SHOPC.open;
if (!k) {
el.style.display = "none";
return;
}
var rows = SHOPC.cat ? shopcRows(k, SHOPC.cat) : null, h = '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><b style="font:500 16px var(--serif,Georgia);color:#F0E0B8">' + esc(k) + '</b><span><button class="btn" data-shc="pack">🎒 Backpack</button> <button class="btn" data-shc="x">Close</button></span></div>';
if (SHOPC.msg)
h += '<div style="margin:6px 0">' + SHOPC.msg + '</div>';
if (!rows)
h += '<div style="color:var(--dim,#999);margin-top:8px">Looking at the shelves…</div>';
else if (!rows.length)
h += '<div style="color:var(--dim,#999);margin-top:8px">The shelves open once the server has the city catalogue.</div>';
else
rows.forEach(function (r) { h += '<div style="display:flex;justify-content:space-between;gap:10px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.06)"><span>' + esc(r.name) + (r.note ? '<br><span style="color:var(--dim,#999);font-size:12px">' + esc(r.note) + '</span>' : '') + '</span><span style="white-space:nowrap">' + Number(r.price).toLocaleString() + ' gold <button class="btn" data-shc="' + (+r.id) + '">Buy</button></span></div>'; });
el.innerHTML = h;
el.style.display = "block";
},
function (k) {
SHOPC.open = k;
SHOPC.msg = "";
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
shopcPaint();
if (!SHOPC.cat && typeof cityRpc === "function")
catalogueRows().then(function (r) { SHOPC.cat = Array.isArray(r) ? r : []; shopcPaint(); }).catch(function () { SHOPC.cat = []; shopcPaint(); SHOPC.cat = null; });
}
];
});
