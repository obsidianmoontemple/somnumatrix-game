/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(264, function () {
"use strict";
return [
function (id) {
var el = document.getElementById(id);
if (el)
return el;
el = document.createElement("div");
el.id = id;
el.style.cssText = SANTA_CARD;
el.style.display = "none";
document.body.appendChild(el);
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("keyup", function (e) { e.stopPropagation(); });
el.addEventListener("click", function (e) { var b = e.target.closest && e.target.closest("[data-sa]"); if (!b)
return; e.preventDefault(); santaAct(b.getAttribute("data-sa"), b.getAttribute("data-sv"), b); });
return el;
},
function (ids) {
return Promise.all(ids.map(function (id) { return santaRpc("open_stocking", { p_id: id }).catch(function () { }); })).then(function () {
(SANTA.mine || []).forEach(function (s) { if (ids.indexOf(s.id) >= 0)
s.opened = true; });
if (SANTA.st)
SANTA.st.waiting = Math.max(0, (SANTA.st.waiting || 0) - ids.length);
SANTA.stock.at = 0;
});
},
function (s) {
var items = (s.items || []).map(function (n) { return "🎁 " + santaE(n); }).join("<br>");
return '<div style="border-top:1px solid rgba(255,255,255,.08);padding:6px 0">' + (items || "") + (s.gold ? (items ? "<br>" : "") + "🪙 <b>" + Number(s.gold).toLocaleString() + " gold</b>" : "") +
(s.note ? '<div style="font-style:italic;margin-top:4px">“' + santaE(s.note) + '”</div>' : "") + '<div>' + santaDim((s.lot ? santaE(s.lot) + " · " : "") + new Date(s.at).toLocaleDateString()) + '</div></div>';
},
function (lot) {
var el = santaEl("santa-open");
el.style.display = "block";
el.innerHTML = santaDim("You reach into the stocking…");
santaMineLoad().then(function (rows) {
var mine = (rows || []).filter(function (s) { return !s.opened && (!lot || !s.lot || s.lot === lot); });
if (!mine.length)
mine = (rows || []).filter(function (s) { return !lot || s.lot === lot; }).slice(0, 1);
var h = '<div style="display:flex;justify-content:space-between;align-items:center"><b style="font:600 17px Georgia,serif;color:#FFE7B0">🧦 Your stocking</b>' + santaB("Close", "close-open", null, true) + '</div>';
if (!mine.length)
h += santaDim("It's empty for now. Santa reads every wish in the post box at the North Pole.");
else {
h += '<div style="margin:6px 0">Santa came! Here is what he left:</div>';
mine.forEach(function (s) { h += santaStockingHtml(s); });
h += '<div style="margin-top:8px">' + santaDim("Everything is in your backpack already, the gold is in your purse, and Santa's letter is in your mailbox.") + '</div>' +
'<div style="margin-top:6px">' + santaB("🎒 Open the backpack", "pack") + '</div>';
}
el.innerHTML = h;
var ids = mine.filter(function (s) { return !s.opened; }).map(function (s) { return s.id; });
if (ids.length) {
santaChime();
santaOpenStockings(ids);
}
});
},
function () {
var el = santaEl("santa-wish");
el.style.display = "block";
if (typeof document.exitPointerLock === "function")
try {
document.exitPointerLock();
}
catch (e) { }
santaWishPaint();
if (santaIn())
santaRpc("my_santa_wishes").then(function (r) { SANTA.wishes = Array.isArray(r) ? r : []; santaWishPaint(); }).catch(function (e) { SANTA.wishMsg = santaErr(e); santaWishPaint(); });
},
function () {
var el = document.getElementById("santa-wish");
if (!el || el.style.display === "none")
return;
var h = '<div style="display:flex;justify-content:space-between;align-items:center"><b style="font:600 17px Georgia,serif;color:#FFE7B0">✉️ Dear Santa…</b>' + santaB("Close", "close-wish", null, true) + '</div>';
if (!santaIn()) {
el.innerHTML = h + '<div style="margin-top:8px">Sign in first, so Santa knows whose wish it is and where you live.</div>';
return;
}
var keep = document.getElementById("santa-wish-text"), kept = keep ? keep.value : "", kk = document.querySelector('input[name="santa-wk"]:checked'), kind = kk ? kk.value : "looking";
h += '<div style="margin:6px 0 4px">What would you wish for? Santa reads every one.</div>';
Object.keys(SANTA_KINDS).forEach(function (k) { h += '<label style="display:block;margin:2px 0;cursor:pointer"><input type="radio" name="santa-wk" value="' + k + '"' + (k === kind ? " checked" : "") + '> ' + SANTA_KINDS[k] + '</label>'; });
h += '<textarea id="santa-wish-text" maxlength="400" rows="3" placeholder="A red bicycle, a fountain for my garden, a snow globe…" style="width:100%;box-sizing:border-box;margin-top:6px;border-radius:6px;border:1px solid #6A5A4A;background:#1E1614;color:#F4ECE0;padding:8px;font:14px system-ui,sans-serif">' + santaE(kept) + '</textarea>';
h += '<div style="margin-top:6px">' + santaB("📮 Post it to Santa", "post-wish") + '</div>';
if (SANTA.wishMsg)
h += '<div style="margin-top:6px;color:#FFE7B0">' + santaE(SANTA.wishMsg) + '</div>';
var W = SANTA.wishes;
h += santaHead("Your wish list");
if (!W)
h += santaDim("Fetching your list…");
else if (!W.length)
h += santaDim("Nothing on it yet.");
else
W.forEach(function (w) {
h += '<div style="display:flex;justify-content:space-between;gap:8px;padding:5px 0;border-top:1px solid rgba(255,255,255,.08)"><span>' + santaE(w.body) + '<br>' + santaDim(SANTA_KINDS[w.kind] || "") +
(w.granted ? '<br><span style="color:#9FE0A0">✓ Granted by Santa' + (w.granted_note ? ': “' + santaE(w.granted_note) + '”' : '') + '</span>' : '') + '</span>' + (w.granted ? '' : santaB("Take back", "unwish", w.id, true)) + '</div>';
});
el.innerHTML = h;
},
function (force) {
if (!santaKeeper())
return Promise.resolve(null);
if (!force && SANTA.board && Date.now() - SANTA.boardAt < 30000)
return Promise.resolve(SANTA.board);
SANTA.busy = true;
santaPaint();
return santaRpc("santa_board").then(function (d) {
SANTA.busy = false;
SANTA.boardAt = Date.now();
if (d && d.ok === false) {
SANTA.msg = d.say || "";
SANTA.board = [];
}
else
SANTA.board = (d && d.people) || [];
santaPaint();
return SANTA.board;
}).catch(function (e) { SANTA.busy = false; SANTA.msg = santaErr(e); SANTA.board = SANTA.board || []; santaPaint(); return SANTA.board; });
},
function () {
if (!SANTA.panel)
return;
var el = santaEl("santa-book");
el.style.display = "block";
var keepQ = document.getElementById("santa-q"), focusQ = keepQ && document.activeElement === keepQ;
if (SANTA.fill) {
santaFillPaint(el);
return;
}
var suit = santaSuited(), sl = typeof riding !== "undefined" && riding === "Santa's sleigh", on = !!(SANTA.st && SANTA.st.on);
var h = '<div style="display:flex;justify-content:space-between;align-items:center"><b style="font:600 18px Georgia,serif;color:#FFE7B0">🎅 Santa\'s book</b>' + santaB("Close", "close", null, true) + '</div>';
h += '<div style="margin-top:6px">' + santaB(suit ? "Take off the suit" : "🎅 Put on the suit", "suit") + santaB(sl ? "Leave the sleigh" : "🛷 Call the sleigh", "sleigh") +
santaB(on ? "Santa is out: ON" : "Tell everyone Santa is out", "season", null, !on) + '</div>';
h += '<div style="margin-top:8px">' + ["round:The round", "list:The List", "decor:Decorate"].map(function (t) { var k = t.split(":")[0]; return santaB(t.split(":")[1], "tab", k, SANTA.tab !== k); }).join("") + '</div>';
if (SANTA.msg)
h += '<div style="margin:6px 0;color:#FFE7B0">' + SANTA.msg + '</div>';
var B = SANTA.board;
if (SANTA.tab === "decor")
h += santaDecorHtml();
else if (!B)
h += '<div style="margin-top:8px">' + santaDim(SANTA.busy ? "Opening the book…" : "") + '</div>';
else {
h += '<input id="santa-q" placeholder="Find a name or a home" value="' + santaE(SANTA.q) + '" style="width:100%;box-sizing:border-box;margin-top:8px;border-radius:6px;border:1px solid #6A5A4A;background:#1E1614;color:#F4ECE0;padding:6px 8px;font:14px system-ui,sans-serif">';
var q = SANTA.q.trim().toLowerCase();
var list = B.filter(function (p) { return !q || (p.name || "").toLowerCase().indexOf(q) >= 0 || (p.home && (p.home.lot || "").toLowerCase().indexOf(q) >= 0); });
if (SANTA.tab === "list")
list = list.slice().sort(function (a, b) { return ((a.list && a.list.mark) === "naughty" ? 0 : 1) - ((b.list && b.list.mark) === "naughty" ? 0 : 1) || String(a.name).localeCompare(String(b.name)); });
else
list = list.slice().sort(function (a, b) { return (b.wishes.length ? 1 : 0) - (a.wishes.length ? 1 : 0) || (a.stockings ? 1 : 0) - (b.stockings ? 1 : 0) || String(a.name).localeCompare(String(b.name)); });
var homes = B.filter(function (p) { return p.home; }).length, done = B.filter(function (p) { return p.stockings > 0; }).length;
h += '<div style="margin-top:6px">' + santaDim(B.length + " on the round · " + homes + " with a home · " + done + " stockings filled this month") + '</div>';
if (!list.length)
h += '<div style="margin-top:8px">' + santaDim(B.length ? "No one by that name." : "Nobody lives in Somnucor yet, and no wishes have come in.") + '</div>';
list.slice(0, 120).forEach(function (p) {
var hm = p.home, where = hm ? (santaE(hm.lot) + (hm.quarter ? ", " + santaE(hm.quarter) : "") + (hm.world && hm.world !== "somnucor" ? " (" + santaE((typeof HL_WORLD !== "undefined" && HL_WORLD[hm.world]) || hm.world) + ")" : "")) : "no home yet";
h += '<div style="padding:8px 0;border-top:1px solid rgba(255,255,255,.1)"><div style="display:flex;justify-content:space-between;gap:8px;align-items:center"><b>' + santaE(p.name) + '</b>' + santaMarkHtml(p.list) + '</div>';
h += '<div>' + santaDim("🏠 " + where + (p.member ? "" : " · visitor (no gold)")) + '</div>';
if (SANTA.tab === "list") {
h += '<div>' + santaRecordHtml(p.list) + '</div>' + (p.list && p.list.set_note ? '<div>' + santaDim("Note: " + santaE(p.list.set_note)) + '</div>' : '');
h += '<div>' + santaB("🌟 Nice", "mark", p.user_id + "|nice", p.list && p.list.set === "nice") + santaB("🪨 Naughty", "mark", p.user_id + "|naughty", p.list && p.list.set === "naughty") + santaB("By their record", "mark", p.user_id + "|", !(p.list && p.list.set)) + '</div>';
}
else {
(p.wishes || []).forEach(function (w) { h += '<div style="margin-left:8px">✉️ ' + santaE(w.body) + ' ' + santaDim("(" + (SANTA_KINDS[w.kind] || "wish").toLowerCase() + ")") + '</div>'; });
if (p.stockings)
h += '<div>' + santaDim("🧦 " + p.stockings + " filled this month" + (p.waiting ? ", " + p.waiting + " not opened yet" : "")) + '</div>';
h += '<div>' + (hm && (!hm.world || hm.world === "somnucor") ? santaB("Show the way", "way", p.user_id, true) : "") + santaB("🧦 Fill the stocking", "fill", p.user_id) + '</div>';
}
h += '</div>';
});
}
el.innerHTML = h;
var qi = document.getElementById("santa-q");
if (qi) {
qi.oninput = function () { SANTA.q = qi.value; var pos = qi.selectionStart; santaPaint(); var n = document.getElementById("santa-q"); if (n) {
n.focus();
try {
n.setSelectionRange(pos, pos);
}
catch (e) { }
} };
if (focusQ)
qi.focus();
}
},
function (id) {
var p = santaPerson(id);
if (!p)
return;
SANTA.fill = { p: p, items: [], gold: "", note: "Merry Christmas, " + String(p.name || "").split(" ")[0] + "! Love, Santa", wishes: (p.wishes || []).map(function (w) { return w.id; }), msg: "", busy: false, done: null };
SANTA.panel = true;
santaPaint();
if (!SANTA.shelf)
santaRpc("santa_gift_shelf", { p_q: "" }).then(function (r) { SANTA.shelf = Array.isArray(r) ? r : []; santaPaint(); }).catch(function (e) { SANTA.fill && (SANTA.fill.msg = santaErr(e)); santaPaint(); });
},
function (el) {
var F = SANTA.fill, p = F.p, gi = document.getElementById("santa-gold"), ni = document.getElementById("santa-note"), si = document.getElementById("santa-find");
if (gi)
F.gold = gi.value;
if (ni)
F.note = ni.value;
if (si)
SANTA.shelfQ = si.value;
var h = '<div style="display:flex;justify-content:space-between;align-items:center"><b style="font:600 17px Georgia,serif;color:#FFE7B0">🧦 ' + santaE(p.name) + '\'s stocking</b>' + santaB("Back", "fill-back", null, true) + '</div>';
h += '<div>' + santaMarkHtml(p.list) + ' ' + santaRecordHtml(p.list) + '</div>';
if (F.done) {
h += '<div style="margin-top:10px;color:#9FE0A0"><b>' + santaE(F.done) + '</b></div><div style="margin-top:6px">' + santaDim("It's in their backpack now, with a letter from Santa in their mailbox.") + '</div><div style="margin-top:8px">' + santaB("Back to the round", "fill-back") + '</div>';
el.innerHTML = h;
return;
}
if ((p.wishes || []).length) {
h += santaHead("Their wishes (ticked ones are marked granted)");
p.wishes.forEach(function (w) { var on = F.wishes.indexOf(w.id) >= 0; h += '<label style="display:block;cursor:pointer;margin:2px 0"><input type="checkbox" data-wish="' + w.id + '"' + (on ? " checked" : "") + '> ' + santaE(w.body) + '</label>'; });
}
h += santaHead("In the stocking");
if (!F.items.length)
h += santaDim("Nothing yet. Pick from the workshop, or find anything below.");
else
h += F.items.map(function (n, i) { return '<span style="display:inline-block;margin:2px 6px 2px 0">🎁 ' + santaE(n) + ' <a href="#" data-sa="unpick" data-sv="' + i + '" style="color:#E8A0A0">✕</a></span>'; }).join("");
h += santaHead("Santa's workshop");
var shelf = SANTA.shelf;
if (!shelf)
h += santaDim("Opening the workshop…");
else
h += shelf.filter(function (s) { return s.from === "workshop"; }).map(function (s) { return santaB(santaE(s.name), "pick", s.name, true); }).join("") || santaDim("The workshop shelves are empty just now.");
h += santaHead("Find anything else");
h += '<div style="display:flex;gap:6px"><input id="santa-find" placeholder="a bicycle, a fountain, an armchair…" value="' + santaE(SANTA.shelfQ) + '" style="flex:1;border-radius:6px;border:1px solid #6A5A4A;background:#1E1614;color:#F4ECE0;padding:6px 8px;font:14px system-ui,sans-serif">' + santaB("Find", "find") + '</div>';
if (F.found)
h += '<div style="margin-top:4px">' + (F.found.length ? F.found.filter(function (s) { return s.from !== "workshop" || SANTA.shelfQ; }).map(function (s) { return santaB(santaE(s.name) + ' <span style="opacity:.7">· ' + santaE(s.from) + '</span>', "pick", s.name, true); }).join("") : santaDim("Nothing by that name in the catalogue or the warehouse.")) + '</div>';
h += santaHead("Gold " + (p.member ? "(newly struck by the mint)" : "(not for visitors)"));
h += '<input id="santa-gold" type="number" min="0" max="10000000" step="1" placeholder="0" value="' + santaE(F.gold) + '"' + (p.member ? "" : " disabled") + ' style="width:140px;border-radius:6px;border:1px solid #6A5A4A;background:#1E1614;color:#F4ECE0;padding:6px 8px;font:14px system-ui,sans-serif">';
[100, 500, 1000, 5000].forEach(function (g) { if (p.member)
h += santaB(g.toLocaleString(), "gold", g, true); });
h += santaHead("A note from Santa");
h += '<textarea id="santa-note" rows="2" maxlength="600" style="width:100%;box-sizing:border-box;border-radius:6px;border:1px solid #6A5A4A;background:#1E1614;color:#F4ECE0;padding:8px;font:14px system-ui,sans-serif">' + santaE(F.note) + '</textarea>';
if (F.msg)
h += '<div style="margin-top:6px;color:#FFE7B0">' + santaE(F.msg) + '</div>';
h += '<div style="margin-top:8px">' + santaB(F.busy ? "Filling…" : "🎁 Fill the stocking", "fill-go") + '</div>';
el.innerHTML = h;
Array.prototype.forEach.call(el.querySelectorAll("[data-wish]"), function (c) { c.onchange = function () { var id = +c.getAttribute("data-wish"), k = F.wishes.indexOf(id); if (c.checked && k < 0)
F.wishes.push(id); if (!c.checked && k >= 0)
F.wishes.splice(k, 1); }; });
var fi = document.getElementById("santa-find");
if (fi)
fi.onkeydown = function (e) { if (e.key === "Enter") {
e.preventDefault();
santaAct("find");
} };
},
function () {
var F = SANTA.fill;
if (!F)
return;
var si = document.getElementById("santa-find");
if (si)
SANTA.shelfQ = si.value;
var q = SANTA.shelfQ.trim();
if (!q) {
F.found = null;
santaPaint();
return;
}
santaRpc("santa_gift_shelf", { p_q: q }).then(function (r) { F.found = Array.isArray(r) ? r : []; santaPaint(); }).catch(function (e) { F.msg = santaErr(e); santaPaint(); });
},
function () {
var F = SANTA.fill;
if (!F || F.busy)
return;
var gi = document.getElementById("santa-gold"), ni = document.getElementById("santa-note");
if (gi)
F.gold = gi.value;
if (ni)
F.note = ni.value;
var g = Math.max(0, Math.floor(+F.gold || 0));
F.busy = true;
F.msg = "";
santaPaint();
santaRpc("santa_fill_stocking", { p_user: F.p.user_id, p_gold: g, p_items: F.items, p_note: F.note || null, p_wishes: F.wishes }).then(function (o) {
F.busy = false;
if (o && o.ok) {
F.done = o.say || "Stocking filled.";
santaChime();
SANTA.stock.at = 0;
santaBoardLoad(true);
}
else
F.msg = (o && o.say) || "That did not go in.";
santaPaint();
}).catch(function (e) { F.busy = false; F.msg = santaErr(e); santaPaint(); });
},
function (id) {
var p = santaPerson(id);
if (!p || !p.home)
return;
var spec = santaHomeSpec(p.home.lot);
if (!spec) {
SANTA.msg = santaE(p.home.lot) + " isn't drawn in your city just now.";
santaPaint();
return;
}
var at = (typeof awlFront === "function" && awlFront(spec)) || { x: spec.x, z: spec.z };
guideTo = { key: p.home.lot + " (" + p.name + ")", x: at.x, z: at.z, home: spec.id || true };
var r = typeof somnucorRealm === "function" ? somnucorRealm() : null;
if (r && (store.here || 0) !== r.id && typeof toSomnucor === "function")
toSomnucor();
santaClose();
setStatus("<b>🎅 To " + santaE(p.home.lot) + "</b>, where " + santaE(p.name) + " lives: follow the pointer at the top of the screen. The door opens for Santa; the stocking is by the fire.");
},
function (on) {
if (!santaKeeper())
return;
var L = meLook(), saved;
if (on) {
if (L.santa)
return;
saved = {};
Object.keys(SANTA_LOOK).forEach(function (k) { saved[k] = L.hasOwnProperty(k) ? L[k] : null; });
L.santaSaved = saved;
Object.keys(SANTA_LOOK).forEach(function (k) { L[k] = SANTA_LOOK[k]; });
L.santa = 1;
setStatus("<b>Ho ho ho!</b> The red coat, the white beard, the hat. Everyone in the city sees Santa now.");
}
else {
if (!L.santa)
return;
saved = L.santaSaved || {};
Object.keys(SANTA_LOOK).forEach(function (k) { if (saved[k] === null || saved[k] === undefined)
delete L[k];
else
L[k] = saved[k]; });
delete L.santa;
delete L.santaSaved;
if (typeof riding !== "undefined" && riding === "Santa's sleigh")
santaSleigh(false);
setStatus("<b>The suit goes back on its hook.</b> You are yourself again.");
}
try {
if (typeof fillLook === "function")
fillLook(L, (typeof myUserId === "function" && myUserId()) || "me");
}
catch (e) { }
try {
if (typeof save === "function")
save();
}
catch (e) { }
try {
if (typeof rebuildMe === "function")
rebuildMe();
}
catch (e) { }
try {
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
santaPaint();
},
function (on) {
if (on) {
if (!santaKeeper())
return;
if (typeof walkMode === "undefined" || !walkMode) {
SANTA.msg = "Walk out into the world first, then call the sleigh.";
santaPaint();
return;
}
if (store.inside) {
SANTA.msg = "Step outside first: the reindeer wait in the street.";
santaPaint();
return;
}
if (typeof DRIVE !== "undefined" && DRIVE.on && rideArch !== "sleigh") {
SANTA.msg = "Get out of what you are driving first.";
santaPaint();
return;
}
if (!santaSuited())
santaSuit(true);
if (typeof riding !== "undefined" && riding && riding !== "Santa's sleigh" && typeof ride === "function")
try {
ride(null);
}
catch (e) { }
if (typeof FLYER !== "undefined" && FLYER.sleigh && !SANTA.flyer) {
SANTA.flyer = { vmax: FLYER.sleigh.vmax, acc: FLYER.sleigh.acc };
FLYER.sleigh.vmax = 48;
FLYER.sleigh.acc = 9;
}
riding = "Santa's sleigh";
rideSpeed = 6;
rideArch = "sleigh";
if (rideG) {
scene.remove(rideG);
rideG = null;
}
if (typeof canFly !== "undefined")
canFly = true;
try {
var L = meLook();
L.ride = "sleigh";
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
santaClose();
setStatus("<b>🛷 Up, Dasher! Up, Dancer!</b> Eight reindeer and the sleigh, sack full. Fly with the usual controls; leave it from Santa's book or the backpack.");
}
else {
if (typeof riding !== "undefined" && riding === "Santa's sleigh") {
riding = null;
rideSpeed = 1;
rideArch = null;
if (rideG) {
scene.remove(rideG);
rideG = null;
}
try {
var L2 = meLook();
L2.ride = null;
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
}
if (SANTA.flyer && typeof FLYER !== "undefined" && FLYER.sleigh) {
FLYER.sleigh.vmax = SANTA.flyer.vmax;
FLYER.sleigh.acc = SANTA.flyer.acc;
SANTA.flyer = null;
}
if (typeof canFly !== "undefined") {
var abil = typeof hasAbility === "function" && (hasAbility("flying") || hasAbility("floating"));
canFly = !!(abil || (typeof magicGranted !== "undefined" && magicGranted));
}
setStatus("<b>The reindeer settle.</b> The sleigh waits for Santa's call.");
}
santaPaint();
},
function () {
if (SANTA.G.team)
return SANTA.G.team;
var T = new THREE.Group(), M = function (c, o) { return new THREE.MeshLambertMaterial(Object.assign({ color: c }, o || {})); };
var red = M(0xB8202A), gold = M(0xE0B840, { emissive: 0x3A2A08 }), green = M(0x1E5A32), brown = M(0x7A5236), dark = M(0x2A1A12);
var add = function (geo, mat, x, y, z, rx, ry, rz) { var m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); if (rx || ry || rz)
m.rotation.set(rx || 0, ry || 0, rz || 0); T.add(m); return m; };
add(new THREE.BoxGeometry(1.9, 0.85, 2.9), red, 0, 0.95, -0.1);
add(new THREE.BoxGeometry(1.9, 0.7, 0.3), red, 0, 1.7, -1.45);
add(new THREE.BoxGeometry(2.0, 0.1, 3.0), gold, 0, 1.42, -0.1);
add(new THREE.BoxGeometry(1.6, 0.25, 0.8), green, 0, 1.45, -0.9);
var curl = new THREE.TorusGeometry(0.55, 0.11, 6, 14, Math.PI);
add(curl, red, 0, 1.05, 1.35, 0, Math.PI / 2, 0).scale.set(1, 1, 1);
add(new THREE.TorusGeometry(0.5, 0.06, 6, 14, Math.PI), gold, 0, 1.95, -1.62, 0, 0, 0);
[-0.85, 0.85].forEach(function (x) {
add(new THREE.BoxGeometry(0.1, 0.1, 3.6), gold, x, 0.1, 0);
add(new THREE.TorusGeometry(0.42, 0.06, 6, 14, Math.PI * 0.9), gold, x, 0.5, 1.75, 0, Math.PI / 2, -0.2);
[-1.1, 0, 1.1].forEach(function (z) { add(new THREE.BoxGeometry(0.07, 0.5, 0.07), gold, x, 0.38, z); });
});
var sack = add(new THREE.SphereGeometry(0.5, 12, 10), brown, 0.55, 1.85, -0.95);
sack.scale.set(1, 1.15, 0.9);
add(new THREE.CylinderGeometry(0.09, 0.2, 0.26, 8), brown, 0.55, 2.45, -0.95);
[0xC83A3A, 0x3A7AC8, 0xE8C83A, 0x3AA85A, 0xA83AC8].forEach(function (c, i) { var b = add(new THREE.BoxGeometry(0.3, 0.3, 0.3), M(c), -0.7 + (i % 2) * 0.3, 1.6 + Math.floor(i / 2) * 0.05, -0.9 + Math.floor(i / 2) * 0.32, 0, i * 0.4, 0); b.userData.gift = 1; });
[-0.95, 0.95].forEach(function (x) {
add(new THREE.BoxGeometry(0.16, 0.24, 0.16), dark, x, 1.75, 1.15);
var bulb = add(new THREE.SphereGeometry(0.08, 8, 6), new THREE.MeshBasicMaterial({ color: 0xFFE2A0, fog: false }), x, 1.75, 1.15);
if (typeof wGlow === "function") {
var gl = wGlow(0xFFD890, 1.6, 0.75);
gl.position.set(x, 1.75, 1.15);
T.add(gl);
}
});
if (typeof npReindeer === "function") {
var proto = npReindeer("deer", false);
(proto.userData.legs || []).forEach(function (l) { l.name = "santaLeg"; });
proto.userData = {};
for (var i = 0; i < 8; i++) {
var d = proto.clone();
d.scale.setScalar(0.9);
d.position.set((i % 2 ? 0.7 : -0.7), 0.05, 3.3 + Math.floor(i / 2) * 2.3);
d.name = "santaDeer";
d.userData.ph = i * 0.7;
T.add(d);
}
[-0.7, 0.7].forEach(function (x) { var tr = add(new THREE.BoxGeometry(0.04, 0.04, 8), M(0x5A2A1A), x, 1.25, 5.6); tr.userData.trace = 1; });
}
T.userData.santaTeam = 1;
SANTA.G.team = T;
return T;
},
function (v) {
if (!v || v.userData.santa)
return;
v.userData.santa = 1;
v.children.forEach(function (c) { c.visible = false; });
var t = santaTeamTemplate().clone();
t.name = "santaTeam";
v.add(t);
var legs = [];
t.traverse(function (o) { if (o.name === "santaLeg")
legs.push(o); });
var prev = v.userData.anim;
v.userData.anim = function (time, dt) {
if (prev)
try {
prev(time, dt);
}
catch (e) { }
var fly = typeof DRIVE !== "undefined" && DRIVE.on && DRIVE.v > 2;
for (var i = 0; i < legs.length; i++)
legs[i].rotation.x = fly ? Math.sin(time * 6 + (i % 2 ? Math.PI : 0) + Math.floor(i / 2) * 0.9) * 0.55 : 0;
};
},
function () {
var h = santaHead("Where you stand");
h += '<div>' + SANTA_PIECES.map(function (p) { return santaB(p[1], "put", p[0], true); }).join("") + '</div>';
h += '<div>' + santaB("🏮 Garlands up the lamp posts here", "put", "lamps", true) + santaB("🏠 Light up the nearest home", "home", null, true) + '</div>';
h += santaHead("Taking down");
h += '<div>' + santaB("Take down the nearest", "undo", null, true) + santaB("Take down everything", "undo-all", null, true) + '</div>';
var n = (SANTA.decor || []).length;
h += '<div style="margin-top:6px">' + santaDim(n + " decorations up in the city. Everyone sees them; the lights twinkle softly and slowly, never flashing.") + '</div>';
return h;
},
function (kind) {
if (!santaCityHere()) {
SANTA.msg = "Decorations go up out in the streets of Somnucor.";
santaPaint();
return;
}
var P = camera.position, f = (kind === "arch" || kind === "lamps") ? 0 : 3.5, x = P.x - Math.sin(yaw) * f, z = P.z - Math.cos(yaw) * f;
santaRpc("santa_decorate", { p_kind: kind, p_place: "out", p_x: x - ATLC.x, p_z: z - ATLC.z, p_rot: yaw }).then(function (o) {
SANTA.msg = o && o.ok ? "✨ Up it goes." : santaE((o && o.say) || "That would not go up.");
if (o && o.ok) {
santaChime();
santaDecorLoad(true);
}
santaPaint();
}).catch(function (e) { SANTA.msg = santaErr(e); santaPaint(); });
},
function (r) {
var P = camera.position, best = null, bd = r || 32;
(typeof lotPlots === "function" ? lotPlots() : []).forEach(function (q) {
if (!q || q.kind !== "home" && q.kind !== "district" && !/house|cottage|manor|villa|mansion|bungalow|townhouse|cabin|farmhouse|tenement|apartment/.test(q.archetype || ""))
return;
var d = Math.hypot(q.x - P.x, q.z - P.z);
if (d < bd) {
bd = d;
best = q;
}
});
return best;
},
function () {
if (!santaCityHere()) {
SANTA.msg = "Stand by the home you want to light up.";
santaPaint();
return;
}
var q = santaNearestHome(40);
if (!q) {
SANTA.msg = "No home close enough. Stand right by it.";
santaPaint();
return;
}
santaRpc("santa_decorate", { p_kind: "homelights", p_place: "lot:" + q.name, p_x: 0, p_z: 0, p_rot: 0 }).then(function (o) {
SANTA.msg = o && o.ok ? "✨ " + santaE(q.name) + " is lit up for Christmas." : santaE((o && o.say) || "That did not work.");
if (o && o.ok) {
santaChime();
santaDecorLoad(true);
}
santaPaint();
}).catch(function (e) { SANTA.msg = santaErr(e); santaPaint(); });
},
function (all) {
if (all) {
if (!window.confirm("Take down every Christmas decoration in the city?"))
return;
santaRpc("santa_undecorate", { p_all: true }).then(function (o) { SANTA.msg = o && o.ok ? "All taken down (" + (o.removed || 0) + ")." : santaE((o && o.say) || ""); santaDecorLoad(true); santaPaint(); }).catch(function (e) { SANTA.msg = santaErr(e); santaPaint(); });
return;
}
if (!santaCityHere()) {
SANTA.msg = "Stand by the decoration to take it down.";
santaPaint();
return;
}
var P = camera.position, best = null, bd = 18;
(SANTA.decor || []).forEach(function (d) { var w = santaDecorWorld(d); if (!w)
return; var dd = Math.hypot(w.x - P.x, w.z - P.z); if (dd < bd) {
bd = dd;
best = d;
} });
if (!best) {
SANTA.msg = "Nothing close enough to take down.";
santaPaint();
return;
}
santaRpc("santa_undecorate", { p_id: best.id }).then(function (o) { SANTA.msg = o && o.ok ? "Taken down." : santaE((o && o.say) || ""); santaDecorLoad(true); santaPaint(); }).catch(function (e) { SANTA.msg = santaErr(e); santaPaint(); });
},
function (pts, size, cols, parent) {
var geo = santaGeo("bulb" + size, function () { return new THREE.SphereGeometry(size, 6, 5); });
var by = [[], [], []];
pts.forEach(function (p, i) { by[i % 3].push({ p: p, c: (cols || SANTA_BULB_COLS)[i % (cols || SANTA_BULB_COLS).length] }); });
var m4 = new THREE.Matrix4(), col = new THREE.Color();
by.forEach(function (list, k) {
if (!list.length)
return;
var im = new THREE.InstancedMesh(geo, santaBulbMat(k), list.length);
list.forEach(function (b, i) { m4.makeTranslation(b.p[0], b.p[1], b.p[2]); im.setMatrixAt(i, m4); if (im.setColorAt) {
col.setHex(b.c);
im.setColorAt(i, col);
} });
im.instanceMatrix.needsUpdate = true;
if (im.instanceColor)
im.instanceColor.needsUpdate = true;
im.frustumCulled = false;
im.raycast = function () { };
parent.add(im);
});
},
function (kind) {
var g = new THREE.Group(), add = function (geo, mat, x, y, z, rx, ry, rz) { var m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); if (rx || ry || rz)
m.rotation.set(rx || 0, ry || 0, rz || 0); m.raycast = function () { }; g.add(m); return m; };
var green = santaMat(0x1E5A3A), white = santaMat(0xF4F8FF), red = santaMat(0xC8262A), gold = santaMat(0xE8C040), pts = [], i;
if (kind === "tree") {
add(santaGeo("trunk", function () { return new THREE.CylinderGeometry(0.35, 0.5, 1.6, 8); }), santaMat(0x4A3020), 0, 0.8, 0);
for (i = 0; i < 5; i++)
add(santaGeo("tier" + i, function () { return new THREE.ConeGeometry(3.2 - i * 0.55, 2.6, 12); }), green, 0, 2.2 + i * 1.5, 0);
add(santaGeo("star", function () { return new THREE.OctahedronGeometry(0.55, 0); }), santaMat(0xFFE070, true), 0, 9.4, 0);
if (typeof wGlow === "function") {
var sg = wGlow(0xFFE070, 4, 0.8);
sg.position.y = 9.4;
g.add(sg);
}
for (i = 0; i < 70; i++) {
var y = 1.6 + i / 70 * 7.2, rr = (3.1 - (y - 1.6) / 7.2 * 2.9) * 0.95, a = i * 2.4;
pts.push([Math.cos(a) * rr, y, Math.sin(a) * rr]);
}
santaBulbs(pts, 0.12, null, g);
[0xC83A3A, 0x3A7AC8, 0xE8C83A, 0x3AA85A].forEach(function (c, k) { var a = k * 1.6; add(santaGeo("gift", function () { return new THREE.BoxGeometry(0.7, 0.6, 0.7); }), santaMat(c), Math.cos(a) * 2, 0.3, Math.sin(a) * 2, 0, a, 0); });
}
else if (kind === "snowman") {
add(santaGeo("sn1", function () { return new THREE.SphereGeometry(0.75, 14, 10); }), white, 0, 0.7, 0);
add(santaGeo("sn2", function () { return new THREE.SphereGeometry(0.55, 14, 10); }), white, 0, 1.75, 0);
add(santaGeo("sn3", function () { return new THREE.SphereGeometry(0.38, 14, 10); }), white, 0, 2.5, 0);
add(santaGeo("hatb", function () { return new THREE.CylinderGeometry(0.45, 0.45, 0.05, 14); }), santaMat(0x1A1A1C), 0, 2.83, 0);
add(santaGeo("hatt", function () { return new THREE.CylinderGeometry(0.28, 0.28, 0.45, 14); }), santaMat(0x1A1A1C), 0, 3.06, 0);
add(santaGeo("nose", function () { return new THREE.ConeGeometry(0.06, 0.32, 8); }), santaMat(0xE8742A), 0, 2.5, 0.45, Math.PI / 2, 0, 0);
[-0.13, 0.13].forEach(function (x) { add(santaGeo("eye", function () { return new THREE.SphereGeometry(0.045, 6, 5); }), santaMat(0x1A1A1C), x, 2.62, 0.33); });
[1.95, 1.7, 1.45].forEach(function (y) { add(santaGeo("btn", function () { return new THREE.SphereGeometry(0.05, 6, 5); }), santaMat(0x1A1A1C), 0, y, 0.53); });
add(santaGeo("scarf", function () { return new THREE.TorusGeometry(0.36, 0.08, 6, 16); }), red, 0, 2.15, 0, Math.PI / 2, 0, 0);
}
else if (kind === "canes") {
[-1.4, 1.4].forEach(function (x, k) {
add(santaGeo("cane", function () { return new THREE.CylinderGeometry(0.16, 0.16, 3.4, 10); }), white, x, 1.7, 0);
for (var b = 0; b < 6; b++)
add(santaGeo("band", function () { return new THREE.CylinderGeometry(0.17, 0.17, 0.22, 10); }), red, x, 0.4 + b * 0.55, 0);
add(santaGeo("hook", function () { return new THREE.TorusGeometry(0.45, 0.16, 8, 14, Math.PI); }), red, x + (k ? -0.45 : 0.45), 3.4, 0, 0, 0, 0).rotation.y = k ? Math.PI : 0;
});
}
else if (kind === "arch") {
[-5, 5].forEach(function (x) { add(santaGeo("post", function () { return new THREE.CylinderGeometry(0.28, 0.32, 4.6, 8); }), green, x, 2.3, 0); });
add(santaGeo("arc", function () { return new THREE.TorusGeometry(5, 0.38, 8, 28, Math.PI); }), green, 0, 4.6, 0);
add(santaGeo("bow", function () { return new THREE.SphereGeometry(0.45, 10, 8); }), red, 0, 9.6, 0).scale.set(1.6, 1, 0.5);
for (i = 0; i <= 30; i++) {
var t = i / 30 * Math.PI;
pts.push([Math.cos(t) * 5, 4.6 + Math.sin(t) * 5, 0.4]);
}
for (i = 0; i < 8; i++) {
pts.push([-5, 0.6 + i * 0.55, 0.36]);
pts.push([5, 0.6 + i * 0.55, 0.36]);
}
santaBulbs(pts, 0.13, null, g);
}
else if (kind === "deer") {
var proto = SANTA.G.glowDeer;
if (!proto && typeof npReindeer === "function") {
proto = npReindeer("glow", false);
proto.userData = {};
var gm = santaMat(0xFFF0C8, true);
proto.traverse(function (o) { if (o.isMesh)
o.material = gm; if (o.isSprite)
o.visible = false; });
SANTA.G.glowDeer = proto;
}
if (proto) {
var d1 = proto.clone();
d1.scale.setScalar(1.3);
g.add(d1);
var d2 = proto.clone();
d2.scale.setScalar(1.0);
d2.position.set(1.8, 0, -0.8);
d2.rotation.y = 0.5;
g.add(d2);
}
}
else if (kind === "presents") {
[[0, 0, 1.2, 0xC83A3A], [1.1, 0.3, 0.9, 0x3A7AC8], [-1, 0.2, 0.8, 0xE8C83A], [0.3, -1, 1, 0x3AA85A], [-0.5, 1, 0.7, 0xA83AC8], [0.2, 0.1, 0.6, 0xF4F0E8]].forEach(function (b, k) {
var s = b[2], y = k === 5 ? 1.2 + 0.3 : s / 2;
add(santaGeo("pb" + s, function () { return new THREE.BoxGeometry(s, s, s); }), santaMat(b[3]), b[0], y, b[1], 0, k * 0.5, 0);
add(santaGeo("pr" + s, function () { return new THREE.BoxGeometry(s + 0.02, s + 0.02, 0.12); }), gold, b[0], y, b[1], 0, k * 0.5, 0);
});
}
return g;
},
function (spec) {
var K = typeof KIT !== "undefined" && KIT[spec.archetype], a = spec.attrs || {};
var sx = (+a.s || 1) * (+a.w || 1), sy = (+a.s || 1) * (+a.h || 1), sz = (+a.s || 1) * (+a.d || 1), boxes = [];
try {
var parts = typeof levelParts === "function" && K ? levelParts(K, spec) : (K && K.parts) || [], B = typeof bodyOf === "function" ? bodyOf(parts) : null;
if (B)
parts.forEach(function (pt) {
if (pt.g !== "box" || pt.glow || pt.rep || pt.c === "glass" || pt.c === "dark" || (pt.r && (pt.r[1] || pt.r[0] || pt.r[2])))
return;
var s = pt.s;
if (pt.p[1] - s[1] / 2 > 0.6 || s[1] < B.h * 0.45 || s[0] < 1.5 || s[2] < 1.5)
return;
boxes.push({ x0: (pt.p[0] - s[0] / 2) * sx, x1: (pt.p[0] + s[0] / 2) * sx, z0: (pt.p[2] - s[2] / 2) * sz, z1: (pt.p[2] + s[2] / 2) * sz, top: (pt.p[1] + s[1] / 2) * sy });
});
}
catch (e) {
boxes = [];
}
if (!boxes.length) {
var sz0 = (K && K.size) || [7, 6, 8], W = sz0[0] * sx, H0 = sz0[1] * sy, D0 = sz0[2] * sz;
boxes.push({ x0: -W / 2, x1: W / 2, z0: -D0 / 2, z1: D0 / 2, top: Math.min(H0 * 0.62, Math.max(2.6, H0 - 1.5)) });
}
var big = boxes.some(function (b) { return b.x1 - b.x0 > 180 || b.z1 - b.z0 > 180 || b.top > 120; });
if (big)
return null;
var g = new THREE.Group();
g.name = "santaHomeLights";
var y0 = typeof terrainY === "function" ? terrainY(spec.x, spec.z) : 0;
g.position.set(spec.x, y0, spec.z);
g.rotation.y = spec.rot || 0;
var pts = [], step = 0.55, x, z, y;
boxes.forEach(function (b) {
var mnx = b.x0 - 0.08, mxx = b.x1 + 0.08, mnz = b.z0 - 0.08, mxz = b.z1 + 0.08, eave = Math.max(0.6, b.top - 0.12);
for (x = mnx; x <= mxx; x += step) {
pts.push([x, eave, mxz]);
pts.push([x, eave, mnz]);
}
for (z = mnz; z <= mxz; z += step) {
pts.push([mxx, eave, z]);
pts.push([mnx, eave, z]);
}
for (y = 0.3; y < eave; y += step) {
[[mnx, mnz], [mxx, mnz], [mnx, mxz], [mxx, mxz]].forEach(function (c) { pts.push([c[0], y, c[1]]); });
}
});
if (pts.length > 900)
pts = pts.filter(function (p, i) { return i % Math.ceil(pts.length / 900) === 0; });
santaBulbs(pts, 0.1, null, g);
try {
var D = typeof doorWorld === "function" && doorWorld(spec);
if (D) {
g.updateMatrixWorld(true);
var out = D.out || { x: 0, z: 1 }, wp = new THREE.Vector3(D.x + out.x * 0.12, y0 + 2.3, D.z + out.z * 0.12), lp = g.worldToLocal(wp.clone());
var wr = new THREE.Mesh(santaGeo("wreath", function () { return new THREE.TorusGeometry(0.36, 0.11, 8, 18); }), santaMat(0x1E5A3A));
wr.position.copy(lp);
wr.rotation.y = Math.atan2(out.x, out.z) - (spec.rot || 0);
var bow = new THREE.Mesh(santaGeo("wbow", function () { return new THREE.SphereGeometry(0.11, 8, 6); }), santaMat(0xC8262A));
bow.position.set(0, -0.36, 0.04);
wr.add(bow);
wr.raycast = function () { };
g.add(wr);
}
}
catch (e) { }
return g;
},
function (o) {
var K = typeof KIT !== "undefined" && KIT[o.archetype], H = Math.min(8, ((K && K.size && K.size[1]) || 4.5) * ((o.attrs && +o.attrs.s) || 1));
var g = new THREE.Group();
g.name = "santaLamp";
g.position.set(o.x, typeof terrainY === "function" ? terrainY(o.x, o.z) : 0, o.z);
var leaves = [], bulbs = [];
for (var i = 0; i < 40; i++) {
var t = i / 40, a = t * Math.PI * 8, y = 0.3 + t * (H - 1.0), r = 0.22;
leaves.push([Math.cos(a) * r, y, Math.sin(a) * r]);
if (i % 2)
bulbs.push([Math.cos(a) * (r + 0.06), y, Math.sin(a) * (r + 0.06)]);
}
var geo = santaGeo("leaf", function () { return new THREE.SphereGeometry(0.12, 6, 5); }), im = new THREE.InstancedMesh(geo, santaMat(0x1E5A3A), leaves.length), m4 = new THREE.Matrix4();
leaves.forEach(function (p, i) { m4.makeTranslation(p[0], p[1], p[2]); im.setMatrixAt(i, m4); });
im.instanceMatrix.needsUpdate = true;
im.raycast = function () { };
im.frustumCulled = false;
g.add(im);
santaBulbs(bulbs, 0.08, null, g);
var bow = new THREE.Mesh(santaGeo("lbow", function () { return new THREE.SphereGeometry(0.22, 8, 6); }), santaMat(0xC8262A));
bow.scale.set(1.6, 1, 0.6);
bow.position.y = H - 0.6;
bow.raycast = function () { };
g.add(bow);
return g;
},
function () {
var have = {};
(SANTA.decor || []).forEach(function (d) { have[d.id] = d; });
Object.keys(SANTA.homeL).forEach(function (id) { if (!have[id]) {
var e = SANTA.homeL[id];
if (e.g && e.g.parent)
e.g.parent.remove(e.g);
delete SANTA.homeL[id];
} });
Object.keys(SANTA.lampL).forEach(function (id) { if (!have[id]) {
var L = SANTA.lampL[id];
Object.keys(L.on || {}).forEach(function (k) { var e = L.on[k]; if (e.g && e.g.parent)
e.g.parent.remove(e.g); });
delete SANTA.lampL[id];
} });
Object.keys(SANTA.G.street || {}).forEach(function (id) { if (!have[id]) {
var e = SANTA.G.street[id];
if (e.g.parent)
e.g.parent.remove(e.g);
delete SANTA.G.street[id];
} });
},
function (full) {
var k = full ? "stockFull" : "stockEmpty";
if (SANTA.G[k])
return SANTA.G[k];
var g = new THREE.Group(), red = santaMat(0xB8202A), white = santaMat(0xF4F0E8);
var leg = new THREE.Mesh(new THREE.CylinderGeometry(full ? 0.13 : 0.1, full ? 0.12 : 0.09, 0.42, 10), red);
leg.position.y = -0.3;
g.add(leg);
var foot = new THREE.Mesh(new THREE.SphereGeometry(full ? 0.13 : 0.1, 10, 8), red);
foot.scale.set(1, 0.8, 1.6);
foot.position.set(0, -0.52, 0.08);
g.add(foot);
var cuff = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.12, 12), white);
cuff.position.y = -0.06;
g.add(cuff);
if (full) {
var gift = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.14), santaMat(0x3A7AC8));
gift.position.set(-0.03, 0.04, 0);
gift.rotation.y = 0.5;
g.add(gift);
var cane = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.26, 6), white);
cane.position.set(0.07, 0.08, 0);
g.add(cane);
var hook = new THREE.Mesh(new THREE.TorusGeometry(0.04, 0.018, 6, 10, Math.PI), santaMat(0xC8262A));
hook.position.set(0.11, 0.21, 0);
g.add(hook);
}
g.traverse(function (o) { o.raycast = function () { }; });
SANTA.G[k] = g;
return g;
},
function (fp, rows) {
var want = Math.max(1, Math.min(4, rows.length)), sig = rows.map(function (r) { return r.opened ? "o" : "f"; }).join("") + "|" + want;
if (fp.userData.santaSig === sig)
return;
fp.userData.santaSig = sig;
var old = fp.getObjectByName("santaStockings");
if (old)
fp.remove(old);
var g = new THREE.Group();
g.name = "santaStockings";
for (var i = 0; i < want; i++) {
var r = rows[i], s = santaStockingTemplate(!!(r && !r.opened)).clone();
s.position.set((i - (want - 1) / 2) * 0.45, 1.32, 0.36);
g.add(s);
}
fp.add(g);
},
function (lot) {
var S = SANTA.stock;
if (S.busy)
return;
if (S.lot === lot && S.rows && Date.now() - S.at < 20000)
return;
if (!santaIn()) {
S.lot = lot;
S.rows = [];
S.at = Date.now();
return;
}
S.busy = true;
santaRpc("santa_home_stockings", { p_lot: lot }).then(function (r) { S.busy = false; S.lot = lot; S.rows = Array.isArray(r) ? r : []; S.at = Date.now(); })
.catch(function () { S.busy = false; S.lot = lot; S.rows = S.rows || []; S.at = Date.now(); });
},
function (lot) {
santaBoardLoad(false).then(function (B) {
var who = (B || []).filter(function (p) { return p.home && p.home.lot === lot; });
if (!who.length) {
SANTA.panel = true;
SANTA.fill = null;
SANTA.tab = "round";
SANTA.msg = "Nobody lives at " + santaE(lot) + " just now.";
santaPaint();
return;
}
santaFillStart(who[0].user_id);
});
},
function (a, v, btn) {
if (a === "close")
return santaClose();
if (a === "close-wish") {
var w = document.getElementById("santa-wish");
if (w)
w.style.display = "none";
SANTA.wishMsg = "";
return;
}
if (a === "close-open") {
var o = document.getElementById("santa-open");
if (o)
o.style.display = "none";
return;
}
if (a === "pack") {
var o2 = document.getElementById("santa-open");
if (o2)
o2.style.display = "none";
if (typeof bkpOpen === "function")
bkpOpen();
return;
}
if (a === "post-wish") {
var t = document.getElementById("santa-wish-text"), kk = document.querySelector('input[name="santa-wk"]:checked'), body = t ? t.value.trim() : "";
if (body.length < 2) {
SANTA.wishMsg = "Write your wish first.";
santaWishPaint();
return;
}
santaRpc("santa_wish", { p_kind: kk ? kk.value : "other", p_body: body }).then(function (r) {
SANTA.wishMsg = (r && r.say) || "";
if (r && r.ok) {
if (t)
t.value = "";
santaChime();
setStatus("<b>Posted.</b> The letter drops into the box with a soft thump, and somewhere inside, a bell rings.");
}
return santaRpc("my_santa_wishes");
}).then(function (r) { if (Array.isArray(r))
SANTA.wishes = r; var t2 = document.getElementById("santa-wish-text"); santaWishPaint(); var t3 = document.getElementById("santa-wish-text"); if (t3 && t2)
t3.value = ""; })
.catch(function (e) { SANTA.wishMsg = santaErr(e); santaWishPaint(); });
return;
}
if (a === "unwish") {
santaRpc("santa_unwish", { p_id: +v }).then(function () { return santaRpc("my_santa_wishes"); }).then(function (r) { SANTA.wishes = Array.isArray(r) ? r : SANTA.wishes; santaWishPaint(); }).catch(function (e) { SANTA.wishMsg = santaErr(e); santaWishPaint(); });
return;
}
if (!santaKeeper())
return;
SANTA.msg = "";
if (a === "tab") {
SANTA.tab = v;
SANTA.fill = null;
santaPaint();
if (v === "decor")
santaDecorLoad(true);
return;
}
if (a === "suit")
return santaSuit(!santaSuited());
if (a === "sleigh")
return santaSleigh(!(typeof riding !== "undefined" && riding === "Santa's sleigh"));
if (a === "season") {
var on = !(SANTA.st && SANTA.st.on);
santaRpc("santa_set_season", { p_on: on }).then(function (r) { SANTA.msg = santaE((r && r.say) || ""); if (r && r.ok) {
SANTA.st = SANTA.st || {};
SANTA.st.on = !!r.on;
} santaPaint(); }).catch(function (e) { SANTA.msg = santaErr(e); santaPaint(); });
return;
}
if (a === "mark") {
var parts = String(v).split("|");
santaRpc("santa_mark", { p_user: parts[0], p_mark: parts[1] || null, p_note: null }).then(function (r) {
var p = santaPerson(parts[0]);
if (r && r.ok && p && r.list)
p.list = r.list;
SANTA.msg = santaE((r && r.say) || "");
santaPaint();
}).catch(function (e) { SANTA.msg = santaErr(e); santaPaint(); });
return;
}
if (a === "way")
return santaShowWay(v);
if (a === "fill")
return santaFillStart(v);
if (a === "fill-back") {
SANTA.fill = null;
santaPaint();
return;
}
if (a === "pick") {
if (SANTA.fill && SANTA.fill.items.length < 20) {
SANTA.fill.items.push(v);
}
santaPaint();
return;
}
if (a === "unpick") {
if (SANTA.fill)
SANTA.fill.items.splice(+v, 1);
santaPaint();
return;
}
if (a === "gold") {
if (SANTA.fill) {
var gi = document.getElementById("santa-gold");
var cur = Math.max(0, Math.floor(+(gi ? gi.value : SANTA.fill.gold) || 0));
SANTA.fill.gold = String(cur + (+v));
if (gi)
gi.value = SANTA.fill.gold;
}
return;
}
if (a === "find")
return santaFind();
if (a === "fill-go")
return santaFillGo();
if (a === "put")
return santaPut(v);
if (a === "home")
return santaHomeLights();
if (a === "undo")
return santaUndo(false);
if (a === "undo-all")
return santaUndo(true);
}
];
});
