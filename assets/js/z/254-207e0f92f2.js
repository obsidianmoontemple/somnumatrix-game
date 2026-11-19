/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(254, function () {
"use strict";
return [
function () {
if (!(typeof signedIn === "function" && signedIn())) {
BKP.d = {};
bkpPaint();
return Promise.resolve();
}
BKP.busy = true;
bkpPaint();
var D = {};
var jobs = [
(typeof refreshStanding === "function" ? refreshStanding() : Promise.resolve(null)).then(function (s) { D.st = s || (typeof standing !== "undefined" ? standing : null); }),
(typeof loadThings === "function" ? loadThings() : Promise.resolve([])).then(function (r) { D.things = r || []; }),
(typeof loadStock === "function" ? loadStock() : Promise.resolve([])).then(function (r) { D.stock = r || []; }),
bkpRpc("casino_wallet").then(function (o) { D.cas = o && o.ok ? o : null; }),
bkpRpc("my_gold_finds").then(function (o) { D.nug = o && o.ok ? o : null; }),
bkpRpc("fest_state").then(function (o) { D.fest = o && typeof o === "object" ? o : null; }),
bkpRpc("my_trophies").then(function (o) { D.tro = o || null; }),
bkpRpc("my_licences").then(function (o) { D.lic = o && o.ok ? o : null; }),
bkpRpc("pass_lift_status").then(function (o) { D.pass = o && o.ok ? o : null; }),
bkpRpc("my_bills").then(function (o) { D.bills = o && o.ok ? o : null; }),
bkpRpc("my_office").then(function (o) { D.office = o || null; }),
bkpRpc("my_mall_purchases").then(function (o) { D.mall = Array.isArray(o) ? o : null; }),
bkpRpc("my_entry_packs").then(function (o) { D.packs = Array.isArray(o) ? o : (o && Array.isArray(o.packs) ? o.packs : null); })
];
return Promise.all(jobs.map(function (p) { return p.catch(function () { }); })).then(function () { BKP.d = D; BKP.busy = false; BKP.at = Date.now(); bkpPaint(); });
},
function () {
var D = BKP.d || {}, h = "";
if (!(typeof signedIn === "function" && signedIn()))
return bkpHandHtml() + bkpHead("The rest") + bkpDim("Sign in to see everything else you hold. Your backpack is kept against your account.");
if (BKP.busy && !BKP.at)
return bkpDim("Opening your backpack…");
var st = D.st || {}, keeper = typeof amKeeper === "function" && amKeeper();
h += bkpHead("Money");
h += bkpRow("🪙 Gold in your purse", "<b>" + (st.gold || 0).toLocaleString() + "</b>" + (st.granted ? " " + bkpDim("(" + Number(st.granted).toLocaleString() + " granted)") : "") + (keeper ? " " + bkpDim("· Keeper's own, never sold") : ""));
if (st.saved)
h += bkpRow("🏦 In the bank", (+st.saved).toLocaleString() + " gold");
if (st.owed)
h += bkpRow("📜 Owed to the bank", '<span style="color:#E0A080">' + (+st.owed).toLocaleString() + " gold</span>");
if (D.cas)
h += bkpRow("🎰 Casino chips", (+D.cas.chips || 0).toLocaleString() + " " + bkpDim("(cash out at the Moon casino, " + (D.cas.rate || 10) + " to a gold)") + ' <button class="btn" data-bku="chips">Spend</button>');
if (D.nug && D.nug.nuggets)
h += bkpRow("✨ Gold nuggets", D.nug.nuggets + " " + bkpDim("(worth " + (D.nug.worth || 0).toLocaleString() + " gold at the City Treasury)") + ' <button class="btn" data-bku="nuggets">Sell</button>');
if (D.fest && (D.fest.tickets || (D.fest.masks || []).length)) {
h += bkpRow("🎟️ Extravaganza tickets", (+D.fest.tickets || 0).toLocaleString() + ' <button class="btn" data-bku="tickets">Spend</button>');
if ((D.fest.masks || []).length)
h += bkpRow("🎭 Golden masks found", (D.fest.masks || []).length);
}
var T = D.things || [], by = { ride: [], wear: [], skin: [], relic: [], other: [] };
T.forEach(function (t) { by[bkpKind(t)].push(t); });
h += bkpHead("Things you own");
var corp = typeof CORP !== "undefined" && CORP.data;
if (!T.length && !corp)
h += bkpDim("Nothing yet. The shops, the tailor's and the market all sell things that are yours for good.");
h = bkpHandHtml() + h;
if (by.ride.length || corp) {
h += '<div style="margin-top:6px">' + bkpDim("To ride") + '</div>';
if (corp) {
var dg = myDragon();
h += bkpRow("🐉 " + esc(dg.name) + " " + bkpDim("(your Dragon Corp dragon, " + esc(dg.color) + ")"), '<button class="btn" data-bku="corp">' + (CORP.mounted ? "Get down" : "Mount") + '</button>');
}
by.ride.forEach(function (t) {
var on = typeof riding !== "undefined" && riding === t.name;
h += bkpRow(esc(t.name) + " " + bkpDim("× " + (+t.speed || 1).toFixed(1) + " your pace"), '<button class="btn" data-bkride="' + esc(t.name) + '">' + (on ? "Get off" : "Ride") + '</button>');
});
}
BKP.items = [];
var list = function (arr, title, icon) {
if (!arr.length)
return;
h += '<div style="margin-top:6px">' + bkpDim(title) + '</div>';
var n = {}, one = {};
arr.forEach(function (t) { n[t.name] = (n[t.name] || 0) + 1; one[t.name] = one[t.name] || t; });
Object.keys(n).sort().forEach(function (k) {
var t = one[k], i = BKP.items.push(t) - 1;
h += bkpRow(icon + " " + esc(k) + (n[k] > 1 ? " " + bkpDim("× " + n[k]) : ""), bkpUseBtns(t, i, D));
});
};
list(by.wear, "Clothes and hats", "👕");
list(by.skin, "Skins", "🎨");
list(by.relic, "Relics", "💎");
list(by.other, "Everything else", "📦");
bkpKeptHtml().split("\u0000").forEach(function (x) { h += x; });
if (D.mall && D.mall.length) {
h += '<div style="margin-top:6px">' + bkpDim("From the World Mall") + '</div>';
D.mall.slice(0, 12).forEach(function (r) { h += bkpRow("🛍️ " + esc(r.name || r.title || r.item || "A purchase"), '<button class="btn" data-bku="mall">See it</button>'); });
}
var S = (D.stock || []).filter(function (s) { return (+s.amount || 0) > 0; });
if (S.length) {
h += bkpHead("Stock: materials and finds");
S.forEach(function (s) { var M = (typeof FG_MB !== "undefined" && FG_MB[s.kind]) || (typeof HX_MB !== "undefined" && HX_MB[s.kind]) || {}; h += bkpRow((M.icon || "🧺") + " " + esc(s.name || M.name || s.kind), (+s.amount).toLocaleString() + (typeof sellStock === "function" ? ' <button class="btn" data-bkstock="' + esc(s.kind) + '">Sell one</button>' : '')); });
}
if (typeof NEEDS !== "undefined" && typeof needsCard === "function" && typeof needsLive === "function" && needsLive())
h += bkpHead("Food and drink") + bkpRow("🍞 How you are, and where to eat", '<button class="btn" data-bku="needs">Open</button>');
var tr = D.tro && D.tro.trophies || [];
if (tr.length) {
h += bkpHead("Trophies");
h += bkpRow("🦴 Nightmare trophies", tr.length + " " + bkpDim("(worth " + (D.tro.worth || 0).toLocaleString() + " gold at the Tower or the Hunters' Lodge)") + ' <button class="btn" data-bku="trophies">Turn in</button>');
}
var P = "";
((D.lic && D.lic.licences) || []).forEach(function (l) {
var ok = !l.revoked && (!l.expires_at || new Date(l.expires_at).getTime() > Date.now());
P += bkpRow("🪪 " + (l.kind === "flying" ? "Flying" : "Driving") + " licence", (ok ? '<span style="color:#8FCB8A">valid</span>' : '<span style="color:#E0A080">' + (l.revoked ? "revoked" : "expired") + '</span>') + (l.points ? " " + bkpDim("· " + l.points + " points") : "") + (l.expires_at && ok ? " " + bkpDim("· to " + new Date(l.expires_at).toLocaleDateString()) : ""));
});
if (D.pass && D.pass.valid)
P += bkpRow("🚗 Lift pass", D.pass.until ? bkpDim("to " + new Date(D.pass.until).toLocaleDateString()) : bkpDim("Keeper"));
((D.bills && D.bills.policies) || []).filter(function (p) { return p.status === "active"; }).forEach(function (p) { P += bkpRow("🛡️ " + esc(p.name), bkpDim(esc(p.line) + (p.lot ? " · " + esc(p.lot) : ""))); });
(st.lots || []).forEach(function (l) { P += bkpRow("🏠 " + esc(l.lot), bkpDim(l.own ? "yours" : "leased")); });
try {
Object.keys((typeof CIN !== "undefined" && CIN.tickets) || {}).forEach(function (n) { if (cinHasTicket(n))
P += bkpRow("🎬 Picture House ticket, screen " + esc(n), bkpDim("good until " + new Date(CIN.tickets[n]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))); });
}
catch (e) { }
if (D.office && D.office.number)
P += bkpRow("🗝️ Office " + esc(D.office.number) + (D.office.name ? " — " + esc(D.office.name) : ""), D.office.keycode ? "code <b>" + esc(D.office.keycode) + "</b>" : bkpDim("no code yet"));
if (P) {
h += bkpHead("Papers and keys");
h += P;
}
return h;
},
function (t) {
if (typeof WEAR === "undefined")
return null;
var a = String(t.archetype || ""), n = String(t.name || "").toLowerCase();
if (/^wear_/.test(a) && WEAR[a.slice(5)])
return a.slice(5);
if (BKP_WEARAS[a] && WEAR[BKP_WEARAS[a][0]])
return BKP_WEARAS[a][0];
var ks = Object.keys(WEAR);
for (var i = 0; i < ks.length; i++)
if (WEAR[ks[i]].label.toLowerCase() === n)
return ks[i];
return null;
},
function (t) {
if (typeof AT_SKINS === "undefined")
return null;
var a = String(t.archetype || ""), n = String(t.name || "").toLowerCase();
if (/^skin_/.test(a) && AT_BY[a.slice(5)])
return a.slice(5);
var s = AT_SKINS.filter(function (x) { return (x.name + " skin").toLowerCase() === n || x.name.toLowerCase() === n; })[0];
return s ? s.key : null;
},
function (t, D) {
var n = String(t.name || "");
if (!/^work attire/i.test(n))
return null;
var title = n.replace(/^work attire:\s*/i, "").toLowerCase(), all = ((D && D.packs) || []).concat((typeof EP !== "undefined" && EP.list) || []);
return all.filter(function (p) { return p && (String(p.job_title || p.title || p.job || "").toLowerCase() === title || (p.attire_item && p.attire_item === t.id)); })[0] || null;
},
function (t, i, D) {
var b = function (label, what) { return '<button class="btn" data-bki="' + i + '" data-bkw="' + what + '">' + label + '</button>'; }, out = [], L = meLook();
var wk = bkpWearKey(t);
if (wk) {
var lk = BKP_LOOKKEY[WEAR[wk].slot] || WEAR[wk].slot;
out.push(b(L[lk] === wk ? "Take off" : "Wear", "wear"));
}
var sk = !wk && bkpSkinKey(t);
if (sk) {
out.push(b(L.skinKey === sk ? "Wearing" : "Wear", "skin"));
}
var a = String(t.archetype || "");
if (/^relic_/.test(a) && typeof RL_BY !== "undefined" && RL_BY[a.slice(6)]) {
var R = RL_BY[a.slice(6)];
out.push(R.kind === "weapon" ? b(typeof carrying !== "undefined" && carrying && carrying.archetype === a ? "Put down" : "Take up", "relic") : b(RL.worn[R.key] ? "Take off" : "Put on", "relic"));
}
else if (!wk && !sk && bkpArmOf(t))
out.push(b(typeof carrying !== "undefined" && carrying && carrying.fromItem === t.name ? "Put away" : "Hold", "arm"));
if (typeof LW_BY !== "undefined" && LW_BY[a])
out.push(b("Hang it", "light"));
if (bkpPack(t, D) || /^work attire/i.test(String(t.name || "")))
out.push(b("Wear", "attire"));
if (!out.length && typeof KIT !== "undefined" && KIT[a])
out.push(b("Set it out", "place"));
out.push(b("Look", "look"));
return out.join(" ");
},
function () {
var h = "";
if (typeof carrying !== "undefined" && carrying) {
h += bkpHead("In your hand");
var A = (typeof ARMS !== "undefined" && ARMS[carrying.archetype]) || {};
h += bkpRow("✋ " + esc(carrying.label || carriedName()), (A.shot || carrying.relic ? '<button class="btn" data-bku="use">Use (F)</button> ' : '<button class="btn" data-bku="use">Swing (F)</button> ') + (carrying.relic ? '' : '<button class="btn" data-bku="stow">Put away</button> ') + '<button class="btn" data-bku="drop">Set down (G)</button>');
}
return h;
},
function () {
var K = bkpKept().filter(function (k) { return !(typeof carrying !== "undefined" && carrying && (carrying.id === k.id || carrying.keptId === k.id)); });
if (!K.length)
return "";
var h = '<div style="margin-top:6px">' + bkpDim("Weapons and tools you have picked up") + '</div>';
K.forEach(function (k, i) {
var A = (typeof ARMS !== "undefined" && ARMS[k.a]) || { name: k.a };
h += bkpRow("⚔️ " + esc(k.name || A.name) + (k.from ? " " + bkpDim("(from " + esc(k.from) + ")") : ""), '<button class="btn" data-bkk="' + esc(k.id) + '">Hold</button>');
});
return h;
},
function (quiet) {
if (typeof carrying === "undefined" || !carrying)
return;
var sp = carrying;
if (sp.relic) {
dropCarried();
return;
}
carrying = null;
sp.carried = false;
if (typeof carryMesh !== "undefined" && carryMesh && carryMesh.parent)
carryMesh.parent.remove(carryMesh);
carryMesh = null;
if (!sp.fromBag) {
bkpRemoveFromWorld(sp);
var K = bkpKept();
if (!K.some(function (k) { return k.id === sp.id; }))
K.push({ id: sp.id, a: sp.archetype, name: sp.label || carriedName.call(null) || (ARMS[sp.archetype] || {}).name });
}
if (!quiet)
setStatus("Put away in your backpack.");
save();
},
function (arch, label, extra) {
if (typeof pickUp !== "function" || typeof ARMS === "undefined" || !ARMS[arch])
return setStatus("You can't hold that here.");
if (carrying)
bkpStow(true);
var P = camera.position, sp = Object.assign({ id: "bag_" + (typeof uid === "function" ? uid() : Date.now()), archetype: arch, label: label || null, attrs: {}, x: P.x, z: P.z, solid: false, detail: 3, nights: [store.session], issued: true, fromBag: true }, extra || {});
pickUp(sp);
},
function (t) {
var u = t.getAttribute("data-bku");
if (u) {
if (u === "use") {
if (typeof useCarried === "function")
useCarried();
}
else if (u === "stow")
bkpStow();
else if (u === "drop") {
if (typeof dropCarried === "function")
dropCarried();
}
else if (u === "corp") {
if (typeof corpMount === "function")
corpMount(!CORP.mounted);
}
else if (u === "mall") {
bkpClose();
if (typeof mallMine === "function")
mallMine();
return true;
}
else if (u === "needs") {
bkpClose();
needsCard();
return true;
}
else if (u === "tickets") {
bkpClose();
setStatus("<b>Spend your tickets at the Prize Booth</b> on the Midway, by the Extravaganza gates: walk up to it and press E.");
if (typeof showTheWay === "function" && store.workplaceAt && store.workplaceAt["The Midway"])
showTheWay("The Midway");
return true;
}
else if (u === "chips") {
bkpClose();
setStatus("<b>Chips are spent and cashed out at the Hidden Crescent</b>, the casino on the Moon: take the Space Corp shuttle from the Tower, then the hatch on the Moon.");
return true;
}
else if (u === "nuggets") {
bkpClose();
if (typeof showTheWay === "function")
showTheWay("The City Treasury");
setStatus("<b>Sell your nuggets at the City Treasury</b>: follow the pointer, go in, and use the counter.");
return true;
}
else if (u === "trophies") {
var pl = typeof nhTurnInPlace === "function" && nhTurnInPlace();
if (pl)
nhTurnIn(pl);
else {
bkpClose();
if (typeof showTheWay === "function")
showTheWay("The Hunters' Lodge");
setStatus("<b>Turn trophies in at the Hunters' Lodge</b> (or in the Tower): follow the pointer.");
return true;
}
}
setTimeout(bkpPaint, 60);
return true;
}
var kk = t.getAttribute("data-bkk");
if (kk != null) {
var k = bkpKept().filter(function (q) { return q.id === kk; })[0];
if (k) {
bkpHold(k.a, k.name, { keptId: k.id });
}
setTimeout(bkpPaint, 60);
return true;
}
var st = t.getAttribute("data-bkstock");
if (st != null) {
Promise.resolve(sellStock(st, 1)).then(function () { setTimeout(bkpLoad, 400); });
return true;
}
var ii = t.getAttribute("data-bki");
if (ii == null)
return false;
var it = (BKP.items || [])[+ii], w = t.getAttribute("data-bkw");
if (!it)
return true;
var L = meLook(), a = String(it.archetype || "");
if (w === "wear") {
var wk = bkpWearKey(it), slot = WEAR[wk].slot, lk = BKP_LOOKKEY[slot] || slot, on = L[lk] !== wk;
var v = on ? wk : (slot === "legs" ? "trousers" : slot === "feet" ? "shoes" : null);
L[lk] = v;
L.src = L.src || {};
L.src[lk] = "chosen";
var wa = BKP_WEARAS[a], ck = wa && wa[1] != null && typeof SG_DYE !== "undefined" && SG_DYE[slot];
if (ck && on) {
L.wasCol = L.wasCol || {};
if (!(ck in L.wasCol))
L.wasCol[ck] = L[ck] === undefined ? null : L[ck];
L[ck] = wa[1];
}
else if (ck && L.wasCol && ck in L.wasCol) {
L[ck] = L.wasCol[ck];
delete L.wasCol[ck];
}
try {
var od = dreamer().offDuty;
if (od && od.look && lk in od.look)
od.look[lk] = v;
}
catch (e) { }
if (typeof rebuildMe === "function")
rebuildMe();
save();
setStatus(on ? "<b>You put on the " + esc(WEAR[wk].label) + ".</b>" : "You take off the " + esc(WEAR[wk].label) + ".");
}
else if (w === "skin") {
var sk = bkpSkinKey(it);
if (sk && typeof atWear === "function") {
atWear(sk, false);
setStatus("<b>You wear the " + esc(AT_BY[sk].name) + " skin.</b>");
}
}
else if (w === "relic") {
var key = a.slice(6), R = RL_BY[key];
if (R.kind === "weapon" && carrying && carrying.archetype === a)
dropCarried();
else
rlTake(key);
}
else if (w === "arm") {
if (carrying && carrying.fromItem === it.name)
bkpStow();
else
bkpHold(bkpArmOf(it), it.name, { fromItem: it.name });
}
else if (w === "light") {
bkpClose();
setStatus("<b>Hang it on your home.</b> Stand at your own lot's board and press <b>D</b>, then choose the " + esc(it.name) + ".");
if (typeof showTheWayHome === "function")
showTheWayHome();
return true;
}
else if (w === "attire") {
var pk = bkpPack(it, BKP.d);
if (pk && typeof epWear === "function")
epWear(pk);
else if (typeof jobDress === "function") {
var ttl = String(it.name).replace(/^work attire:\s*/i, "");
var d = dreamer();
if (!d.offDuty) {
var keep = {};
(typeof EP_FIELDS !== "undefined" ? EP_FIELDS : []).forEach(function (f) { keep[f] = L[f] === undefined ? null : L[f]; });
d.offDuty = { look: keep, job: ttl };
}
jobDress(L, ttl, null);
if (typeof rebuildMe === "function")
rebuildMe();
save();
}
setStatus("<b>You change into your work clothes.</b> The Wardrobe changes you back.");
}
else if (w === "place") {
if (!bkpInDream()) {
setStatus("<b>" + esc(it.name) + "</b>: set it out in one of your dreams (open the backpack there), or hang it at home from your lot's board with <b>D</b>.");
return true;
}
var P = camera.position, fx = -Math.sin(yaw), fz = -Math.cos(yaw);
var spec = { id: (typeof uid === "function" ? uid() : "sc" + Date.now()), archetype: a, label: it.name, attrs: {}, x: P.x + fx * 2.5, z: P.z + fz * 2.5, solid: false, detail: 3, nights: [store.session], issued: true, realm: store.here || 0 };
store.objects.push(spec);
if (typeof addMesh === "function")
addMesh(spec);
save();
setStatus("<b>You set out the " + esc(it.name) + ".</b> It stays in this dream; it is still yours.");
}
else if (w === "look") {
setStatus("<b>" + esc(it.name) + "</b>" + (it.note ? " — " + esc(it.note) : "") + (it.speed ? " You can ride it." : ""));
}
setTimeout(bkpPaint, 60);
return true;
},
function () {
var el = document.getElementById("bkp-box");
if (!BKP.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "bkp-box";
el.style.cssText = "position:fixed;z-index:52;left:50%;top:50%;transform:translate(-50%,-50%);width:min(460px,calc(100vw - 32px));max-height:min(78vh,640px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(18,15,24,.97),rgba(9,8,12,.98));border:1px solid #8A7A4A;border-radius:8px;padding:12px 14px 14px;color:var(--bone,#C9BEA8);" +
"font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-bk],[data-bkride],[data-bku],[data-bki],[data-bkk],[data-bkstock]") : null;
if (!t)
return;
if (bkpUse(t))
return;
if (t.getAttribute("data-bk") === "close")
return bkpClose();
if (t.getAttribute("data-bk") === "wardrobe") {
bkpClose();
if (typeof openWardrobe === "function")
openWardrobe();
return;
}
var r = t.getAttribute("data-bkride");
if (r != null && typeof ride === "function") {
ride(typeof riding !== "undefined" && riding === r ? null : r);
bkpPaint();
}
});
document.body.appendChild(el);
}
el.style.display = "block";
el.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><b style="font:500 16px var(--serif,Georgia);color:#F0E0B8">🎒 Your backpack</b>' +
'<span><button class="btn" data-bk="wardrobe">Wardrobe</button> <button class="btn" data-bk="close">Close</button></span></div>' +
(BKP.busy && BKP.at ? '<div style="color:var(--dim);font-size:12px;margin-top:4px">Checking…</div>' : '') + '<div id="bkp-body">' + bkpHtml() + '</div>';
try {
bkpTabs(document.getElementById("bkp-body"));
}
catch (e) { }
},
function (title) {
var t = String(title || "").toLowerCase();
if (/in your hand/.test(t))
return "hand";
if (/money|casino|chips/.test(t))
return "money";
if (/clothes|hats|skins|wardrobe/.test(t))
return "clothes";
if (/relic|rare|artifact|mythic|invitation|trophies|spoils|santa|keepsake|gift|treasure|machines/.test(t))
return "special";
if (/stock|material|greenwold|food and drink|dream lands|outer worlds|finds|harvest|essence/.test(t))
return "materials";
if (/papers|keys|school|passport|certificate|learning|diploma|licence/.test(t))
return "papers";
return "things";
},
function (n) {
if (!n || n.nodeType !== 1 || n.querySelector("button"))
return null;
var st = n.getAttribute("style") || "", tx = (n.textContent || "").trim();
if (!tx || tx.length > 90)
return null;
if (/text-transform:\s*uppercase/.test(st))
return tx;
var f = n.firstElementChild;
if (/margin-top:\s*\d+px/.test(st) && f && (f.tagName === "B" || f.tagName === "SPAN"))
return (f.textContent || tx).trim();
return null;
},
function (body) {
if (!body || !(typeof signedIn === "function" && signedIn()))
return;
var nodes = Array.prototype.slice.call(body.childNodes), secs = [], cur = { tab: null, nodes: [] }, top = null;
nodes.forEach(function (n) {
if (n.nodeType === 3 && !n.textContent.trim())
return;
var h = bkpTabHead(n);
if (h != null) {
cur = { tab: bkpTabOf(h), nodes: [n] };
secs.push(cur);
return;
}
var f = n.nodeType === 1 && n.firstElementChild, st = n.nodeType === 1 ? (n.getAttribute("style") || "") : "";
if (f && f.tagName === "B" && /border-top/.test(st)) {
secs.push({ tab: bkpTabOf(f.textContent), nodes: [n] });
cur = { tab: null, nodes: [] };
return;
}
if (!cur.tab) {
var t2 = bkpTabOf(n.textContent);
if (!top || top.tab !== t2) {
top = { tab: t2, nodes: [] };
secs.push(top);
}
top.nodes.push(n);
return;
}
cur.nodes.push(n);
});
var count = {};
secs.forEach(function (S) { if (S.tab !== "hand")
count[S.tab] = (count[S.tab] || 0) + S.nodes.length; });
var have = BKP_TABS.filter(function (T) { return T[0] === "all" || count[T[0]]; });
var pick = BKP.tab;
if (!pick) {
try {
pick = localStorage.getItem("somnu.bkp.tab");
}
catch (e) { }
}
if (!pick || !have.some(function (T) { return T[0] === pick; }))
pick = have.length > 1 ? have[0][0] : "all";
BKP.tab = pick;
var bar = document.createElement("div");
bar.className = "bkp-tabs";
bar.setAttribute("role", "tablist");
bar.style.cssText = "display:flex;flex-wrap:wrap;gap:6px;margin:10px 0 4px;position:sticky;top:-12px;z-index:1;padding:6px 0;background:rgba(14,12,19,.97);border-bottom:1px solid rgba(201,168,104,.25)";
have.forEach(function (T) {
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-bktab", T[0]);
b.setAttribute("role", "tab");
b.setAttribute("aria-selected", T[0] === pick ? "true" : "false");
b.textContent = T[1];
b.style.cssText = "min-height:36px;padding:6px 10px" + (T[0] === pick ? ";background:#8A7A4A;color:#140F08;border-color:#C9A868" : "");
bar.appendChild(b);
});
var hand = document.createElement("div"), panes = {};
body.innerHTML = "";
secs.forEach(function (S) {
var box = document.createElement("div");
box.setAttribute("data-bkpane", S.tab);
S.nodes.forEach(function (n) { box.appendChild(n); });
if (S.tab === "hand")
hand.appendChild(box);
else {
box.style.display = (pick === "all" || pick === S.tab) ? "" : "none";
(panes[S.tab] = panes[S.tab] || []).push(box);
}
});
body.appendChild(hand);
body.appendChild(bar);
secs.forEach(function (S) { if (S.tab !== "hand")
body.appendChild(S.nodes[0].parentNode); });
if (pick !== "all" && !count[pick]) {
var e = document.createElement("div");
e.style.color = "var(--dim,#999)";
e.textContent = "Nothing here yet.";
body.appendChild(e);
}
}
];
});
