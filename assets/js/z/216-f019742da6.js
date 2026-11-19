/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(216, function () {
"use strict";
return [
function (force) {
if (STL.busy || (!force && Date.now() - STL.at < 20000))
return;
STL.busy = true;
STL.at = Date.now();
cityRpc("stalls_board", {}).then(function (o) { if (o && o.ok) {
STL.b = o;
stlDress();
}
else if (o)
STL.b = o; })
.catch(function () { if (!STL.b)
STL.b = { ok: false, say: "The stalls could not be opened just now." }; })
.then(function () { STL.busy = false; stlPaint(); });
},
function (name, args, then) {
STL.say = "…";
stlPaint();
cityRpc(name, args).then(function (o) {
STL.say = (o && o.say) || "";
if (then)
then(o);
STL.busy = false;
stlLoad(true);
if (typeof BKP !== "undefined" && BKP.open && typeof bkpLoad === "function")
bkpLoad();
})
.catch(function () { STL.say = "That did not go through. Try again in a moment."; stlPaint(); });
},
function (i) {
var V = STL.row;
if (V) {
var sp = stlSpot(i), p = stlW(V, sp.lx, sp.lz * 0.2);
guideTo = { key: "Stall " + (i + 1) + " on Dreamers' Row", x: p.x, z: p.z };
}
else {
var sg = stlMarketSign();
if (sg)
guideTo = { key: "The Night Market", x: sg.x, z: sg.z };
}
var r = somnucorRealm();
if (r && (store.here || 0) !== r.id && typeof toSomnucor === "function")
toSomnucor();
setStatus("<b>Dreamers' Row</b>, by the Night Market: follow the pointer at the top of the screen.");
STL.open = false;
stlPaint();
},
function (st) {
var B = STL.b, h = '<div style="border:1px solid #3A3040;border-radius:6px;padding:8px 10px;margin-bottom:10px">';
if (!st.holder) {
h += '<b style="color:#F2E6C4">Stall ' + st.id + '</b> is to let, 25 gold a day.';
if (!signedIn())
return h + '<div style="color:#9AA3B5;margin-top:4px">Sign in to rent it.</div></div>';
if (!B.paid)
return h + '<div style="color:#9AA3B5;margin-top:4px">Renting a stall is for dreamers whose dues are paid.</div></div>';
if (stlMine())
return h + '<div style="color:#9AA3B5;margin-top:4px">You keep stall ' + stlMine().id + ' already. One stall to a dreamer.</div></div>';
return h + stlFormHtml(st, true) + '</div>';
}
h += '<b style="color:' + esc(st.colour || "#F2E6C4") + '">🏪 ' + esc(st.name) + '</b> · stall ' + st.id + (st.mine ? ' · <b>yours</b>, ' + esc(stlWhen(st.until)) : ' · kept by ' + esc(st.holder_name || "a dreamer"));
if (st.sign)
h += '<div style="color:#D8C8A0;margin-top:2px"><i>' + esc(st.sign) + '</i></div>';
if (st.blocked)
return h + '<div style="color:#9AA3B5;margin-top:6px">You cannot trade with this stallholder.</div></div>';
if (!(st.goods || []).length)
h += '<div style="color:#9AA3B5;margin-top:6px">Nothing laid out just now.</div>';
(st.goods || []).forEach(function (g) {
h += '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;border-top:1px solid #2A3040;padding:5px 0;margin-top:4px"><span>' + esc(g.name) + '</span><span><b>' + g.price + '</b> gold ';
if (st.mine)
h += '<button class="btn" data-st="unlist" data-id="' + g.id + '" style="padding:2px 8px">Take back</button>';
else if (signedIn() && !B.keeper)
h += '<button class="btn" data-st="buy" data-id="' + g.id + '" data-p="' + g.price + '" data-n="' + esc(g.name) + '" style="padding:2px 8px">Buy</button>';
h += '</span></div>';
});
if (st.mine) {
var things = (B.things || []).filter(function (t) { return !(typeof keyNeverSold === "function" && keyNeverSold(t)); });
h += '<div style="margin-top:10px"><b>Lay something out</b>';
if (!things.length)
h += '<div style="color:#9AA3B5">Your backpack has nothing to sell. Things you buy in the city shops go there.</div>';
else
h += '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px"><select id="st-item" style="flex:1;min-width:160px">' + things.map(function (t) { return '<option value="' + t.item + '" data-p="' + (t.price || 1) + '">' + esc(t.name) + ' ×' + t.n + (t.price ? ' (shop price ' + t.price + ')' : '') + '</option>'; }).join("") + '</select>' +
'<input id="st-price" type="number" min="1" max="1000000" placeholder="price" style="width:90px"> <button class="btn" data-st="list">Lay it out</button></div>' +
'<div style="color:#9AA3B5;margin-top:2px">When it sells, ' + (B.toll || 0) + '% goes to the city as market toll and the rest is yours.</div>';
h += '</div><div style="margin-top:10px"><b>Your stall</b>' + stlFormHtml(st, false) + '</div>';
h += '<div style="margin-top:8px"><button class="btn" data-st="giveup">Give the stall up</button> <span style="color:#9AA3B5">unsold things go back to your backpack</span></div>';
}
return h + '</div>';
},
function (st, fresh) {
var col = st.holder ? st.colour : STL_COLS[(st.id - 1) % STL_COLS.length];
return '<div style="display:grid;grid-template-columns:auto 1fr;gap:6px 8px;align-items:center;margin-top:6px">' +
'<label>Name</label><input id="st-name" maxlength="32" value="' + esc(st.holder ? st.name : "") + '" placeholder="' + esc(((STL.b && STL.b.me_name) || "My") + " stall") + '">' +
'<label>Sign</label><input id="st-sign" maxlength="80" value="' + esc(st.sign || "") + '" placeholder="what you sell, in a line">' +
'<label>Awning</label><span>' + STL_COLS.map(function (c) { return '<label style="display:inline-block;margin-right:4px"><input type="radio" name="st-col" value="' + c + '"' + (c.toLowerCase() === String(col).toLowerCase() ? " checked" : "") + '><span style="display:inline-block;width:16px;height:16px;background:' + c + ';border-radius:3px;vertical-align:middle"></span></label>'; }).join("") + '</span>' +
'<label>' + (fresh ? "Days" : "Add days") + '</label><span><input id="st-days" type="number" min="' + (fresh ? 1 : 0) + '" max="30" value="' + (fresh ? 3 : 0) + '" style="width:70px"> at 25 gold a day' + (STL.b && STL.b.keeper ? " (free for the Keeper)" : "") + '</span></div>' +
'<button class="btn" data-st="rent" data-id="' + st.id + '" style="margin-top:6px">' + (fresh ? "Rent stall " + st.id : "Save") + '</button>';
},
function () {
var B = STL.b, h = '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><b style="font-size:15px;flex:1">🏪 Dreamers\' Row · the Night Market</b><button class="btn" data-st="close">Close</button></div>';
if (STL.say)
h += '<div style="margin:0 0 8px;color:#E8D9B0">' + esc(STL.say) + '</div>';
if (!B)
return h + '<div style="color:#9AA3B5">Opening…</div>';
if (!B.ok)
return h + '<div style="color:#E8C67A">' + esc(B.say || "") + '</div>';
var mine = stlMine(), sel = STL.sel && B.stalls[STL.sel - 1];
if (!sel && mine)
sel = mine;
if (sel)
h += stlStallHtml(sel);
else
h += '<div style="color:#9AA3B5;margin-bottom:8px">Sixteen stalls kept by dreamers beside the Night Market. Rent one for 25 gold a day and sell what is in your backpack at your own price.</div>';
h += '<div style="display:flex;justify-content:space-between;align-items:center"><b>Every stall</b><button class="btn" data-st="go" data-id="' + (sel ? sel.id : 1) + '" style="padding:2px 8px">Show me the way</button></div>';
B.stalls.forEach(function (st) {
h += '<div data-st="pick" data-id="' + st.id + '" style="cursor:pointer;border-top:1px solid #2A3040;padding:5px 2px;' + (sel && sel.id === st.id ? "background:rgba(232,198,122,.08)" : "") + '">' +
'<span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:' + (st.holder ? esc(st.colour) : "#5A5048") + ';margin-right:6px"></span>' +
(st.holder ? '<b>' + esc(st.name) + '</b> · ' + (st.goods || []).length + ' for sale' + (st.mine ? " · yours" : "") : '<span style="color:#9AA3B5">Stall ' + st.id + ' · to let</span>') + '</div>';
});
return h;
},
function () {
var el = document.getElementById("stl-box");
if (!STL.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "stl-box";
el.style.cssText = "position:fixed;z-index:53;left:50%;top:50%;transform:translate(-50%,-50%);width:min(500px,calc(100vw - 32px));max-height:min(84vh,740px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(26,16,14,.97),rgba(9,7,7,.98));border:1px solid #C8283A;border-radius:8px;padding:12px 14px 14px;color:var(--bone,#C9BEA8);" +
"font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", stlClick);
el.addEventListener("change", function (e) { if (e.target && e.target.id === "st-item") {
var o = e.target.options[e.target.selectedIndex], p = document.getElementById("st-price");
if (p && !p.value && o)
p.value = o.getAttribute("data-p");
} });
document.body.appendChild(el);
}
var keep = {};
["st-name", "st-sign", "st-days", "st-price", "st-item"].forEach(function (id) { var f = document.getElementById(id); if (f)
keep[id] = f.value; });
var kc = el.querySelector('input[name="st-col"]:checked'), sid = el.getAttribute("data-sel");
el.innerHTML = stlHtml();
el.style.display = "block";
if (sid === String(STL.sel)) {
Object.keys(keep).forEach(function (id) { var f = document.getElementById(id); if (f)
f.value = keep[id]; });
if (kc) {
var r = el.querySelector('input[name="st-col"][value="' + kc.value + '"]');
if (r)
r.checked = true;
}
}
el.setAttribute("data-sel", String(STL.sel));
var it = document.getElementById("st-item"), pr = document.getElementById("st-price");
if (it && pr && !pr.value) {
var o = it.options[it.selectedIndex];
if (o)
pr.value = o.getAttribute("data-p");
}
},
function (e) {
var t = e.target.closest && e.target.closest("[data-st]");
if (!t)
return;
var a = t.getAttribute("data-st"), id = +t.getAttribute("data-id");
if (a === "close") {
STL.open = false;
stlPaint();
return;
}
if (a === "pick") {
STL.sel = id;
STL.say = "";
stlPaint();
return;
}
if (a === "go") {
stlGo(id - 1);
return;
}
if (a === "buy") {
if (!confirm("Buy " + t.getAttribute("data-n") + " for " + t.getAttribute("data-p") + " gold?"))
return;
stlAct("stall_buy", { p_good: id });
return;
}
if (a === "unlist") {
stlAct("stall_unlist", { p_good: id });
return;
}
if (a === "list") {
var it = document.getElementById("st-item"), pr = document.getElementById("st-price");
if (!it || !pr)
return;
var p = Math.round(+pr.value);
if (!(p >= 1)) {
STL.say = "Set a price first.";
stlPaint();
return;
}
stlAct("stall_list", { p_item: +it.value, p_price: p }, function (o) { if (o && o.ok) {
var f = document.getElementById("st-price");
if (f)
f.value = "";
} });
return;
}
if (a === "rent") {
var c = document.querySelector('#stl-box input[name="st-col"]:checked');
stlAct("stall_rent", { p_stall: id, p_days: Math.max(0, Math.round(+(document.getElementById("st-days") || {}).value || 0)), p_name: (document.getElementById("st-name") || {}).value || "",
p_sign: (document.getElementById("st-sign") || {}).value || "", p_colour: c ? c.value : "#C8283A" }, function (o) { if (o && o.ok)
STL.sel = id; });
return;
}
if (a === "giveup") {
if (!confirm("Give your stall up? Unsold things go back to your backpack, and the rent already paid is not returned."))
return;
stlAct("stall_give_up", {}, function () { STL.sel = 0; });
return;
}
}
];
});
