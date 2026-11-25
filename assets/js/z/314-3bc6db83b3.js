/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(314, function () {
"use strict";
return [
function () {
if (HV.tex)
return HV.tex;
var c = document.createElement("canvas");
c.width = 256;
c.height = 192;
var x = c.getContext("2d");
var g = x.createLinearGradient(0, 0, 0, 192);
g.addColorStop(0, "#7E92A8");
g.addColorStop(0.55, "#C8B48E");
g.addColorStop(1, "#6E7A52");
x.fillStyle = g;
x.fillRect(0, 0, 256, 192);
x.fillStyle = "#5A6A48";
x.beginPath();
x.moveTo(0, 130);
x.bezierCurveTo(60, 96, 120, 140, 256, 104);
x.lineTo(256, 192);
x.lineTo(0, 192);
x.fill();
x.fillStyle = "#46563A";
x.beginPath();
x.moveTo(0, 160);
x.bezierCurveTo(90, 130, 170, 176, 256, 150);
x.lineTo(256, 192);
x.lineTo(0, 192);
x.fill();
x.fillStyle = "rgba(214,190,140,.75)";
x.beginPath();
x.arc(186, 70, 16, 0, Math.PI * 2);
x.fill();
for (var i = 0; i < 900; i++) {
x.fillStyle = "rgba(" + (i % 3 ? 40 : 220) + "," + (i % 5 ? 40 : 200) + ",30,0.05)";
x.fillRect((i * 73) % 256, (i * 41) % 192, 2, 2);
}
HV.tex = new THREE.CanvasTexture(c);
return HV.tex;
},
function () {
var g = new THREE.Group();
g.name = "hw-vault";
var steel = new THREE.MeshStandardMaterial({ color: 0x5C6168, roughness: 0.45, metalness: 0.7 });
var dark = new THREE.MeshStandardMaterial({ color: 0x2A2C30, roughness: 0.6, metalness: 0.5 });
var brass = new THREE.MeshStandardMaterial({ color: 0xA8884A, roughness: 0.35, metalness: 0.8 });
var box = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.48, 0.04), dark);
box.position.set(0, 1.45, 0.02);
g.add(box);
var door = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.42, 0.03), steel);
door.position.set(0, 1.45, 0.045);
g.add(door);
var dial = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.02, 20), brass);
dial.rotation.x = Math.PI / 2;
dial.position.set(0.06, 1.47, 0.07);
g.add(dial);
var hdl = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.025, 0.025), brass);
hdl.position.set(-0.12, 1.43, 0.07);
g.add(hdl);
var hinge = new THREE.Group();
hinge.name = "hw-vault-hinge";
hinge.position.set(-0.46, 0, 0.09);
g.add(hinge);
var frame = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.74, 0.05), new THREE.MeshStandardMaterial({ color: 0x6A4A26, roughness: 0.6, metalness: 0.1 }));
frame.position.set(0.46, 1.45, 0);
hinge.add(frame);
var pic = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.6), new THREE.MeshLambertMaterial({ map: hvPaintingTex() }));
pic.position.set(0.46, 1.45, 0.027);
hinge.add(pic);
g.userData.hvHinge = hinge;
return g;
},
function () {
var g = new THREE.Group();
g.name = "hw-vaultbox";
var iron = new THREE.MeshStandardMaterial({ color: 0x4A4C50, roughness: 0.55, metalness: 0.6 });
var b = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.42, 0.42), iron);
b.position.y = 0.21;
g.add(b);
var lid = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.05, 0.44), new THREE.MeshStandardMaterial({ color: 0x3A3C40, roughness: 0.5, metalness: 0.6 }));
lid.position.y = 0.445;
g.add(lid);
var dial = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.02, 16), new THREE.MeshStandardMaterial({ color: 0xA8884A, roughness: 0.35, metalness: 0.8 }));
dial.rotation.x = Math.PI / 2;
dial.position.set(0, 0.24, 0.22);
g.add(dial);
return g;
},
function () {
if (typeof INT === "undefined" || !INT || !INT.hvObj || typeof camera === "undefined")
return false;
if (INT.hvObj.parent !== INT.root)
return false;
var p = new THREE.Vector3();
INT.hvObj.updateWorldMatrix(true, false);
INT.hvObj.getWorldPosition(p);
var box = INT.hvObj.userData.furn === "hw_vaultbox";
var a = INT.hvObj.rotation.y + (INT.root.rotation ? INT.root.rotation.y : 0), fx = Math.sin(a), fz = Math.cos(a);
var dx = camera.position.x - p.x, dz = camera.position.z - p.z, ahead = dx * fx + dz * fz, side = Math.abs(dx * fz - dz * fx);
var dy = camera.position.y - p.y;
if (dy < 0.6 || dy > 2.6)
return false;
return box ? Math.hypot(dx, dz) < 1.8 : (ahead > 0.1 && ahead < 2.2 && side < 1.2);
},
function (to) {
HV.swingTo = to;
if (HV.raf)
return;
var last = performance.now();
(function step(now) {
var dt = Math.min(0.05, (now - last) / 1000);
last = now;
HV.swing += (HV.swingTo - HV.swing) * Math.min(1, dt * 6);
if (Math.abs(HV.swingTo - HV.swing) < 0.01)
HV.swing = HV.swingTo;
try {
var h = INT && INT.hvObj && INT.hvObj.userData.hvHinge;
if (h)
h.rotation.y = -1.25 * HV.swing;
}
catch (e) { }
if (HV.swing !== HV.swingTo)
HV.raf = requestAnimationFrame(step);
else
HV.raf = 0;
})(last);
},
function (e, name) {
var m = String(e && e.message || e || "");
try {
var j = JSON.parse(m);
m = j.hint || j.message || m;
}
catch (x) { }
if (/^vault_(one|stock|finds|keep)$/.test(name || "") && /function|404|schema cache/i.test(m))
return (typeof notOpenYet === "function") ? notOpenYet("Putting that in the vault opens soon.", "This part of the vault needs the latest server update.") : "Putting that in the vault opens soon.";
return /function|404|schema cache/i.test(m) ? ((typeof notOpenYet === "function") ? notOpenYet("The home vaults open soon.", "The home vaults need the latest server update.") : "The home vaults open soon.") : m;
},
function () {
var lot = hvLotHere();
if (!lot)
return;
HV.open = true;
HV.lot = lot;
HV.pin = "";
HV.pin1 = "";
HV.old = "";
HV.d = null;
HV.say = "";
HV.step = "";
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
if (typeof worldPrompt === "function" && HV.prompted) {
worldPrompt(null);
HV.prompted = false;
}
hvSwing(0.35);
hvPaint();
hvCall("vault_state", { p_lot: lot }).then(function (o) {
if (!o.ok) {
HV.say = o.say || "The vault does not open.";
HV.step = "msg";
return hvPaint();
}
HV.step = o.has_pin ? "pin" : "pin1";
if (o.locked_until)
HV.say = "The vault is locked after too many wrong tries. Try again a little later.";
hvPaint();
});
},
function () {
var p = HV.pin;
if (p.length < 4) {
HV.say = "A PIN is 4 to 8 numbers.";
return hvPaint();
}
if (HV.step === "pin1") {
HV.pin1 = p;
HV.pin = "";
HV.step = "pin2";
HV.say = "";
return hvPaint();
}
if (HV.step === "pin2") {
if (p !== HV.pin1) {
HV.pin = "";
HV.pin1 = "";
HV.step = "pin1";
HV.say = "Those two did not match. Choose your PIN again.";
return hvPaint();
}
var old = HV.old;
return hvCall("vault_set_pin", { p_lot: HV.lot, p_old: old || null, p_new: p }).then(function (o) {
HV.pin = "";
HV.pin1 = "";
HV.old = "";
if (!o.ok) {
HV.say = o.say || "That did not work.";
HV.step = old ? "old" : "pin1";
return hvPaint();
}
HV.key = p;
HV.d = o;
HV.say = o.say || "";
HV.step = "open";
hvSwing(1);
hvPaint();
});
}
if (HV.step === "old") {
HV.old = p;
HV.pin = "";
HV.step = "pin1";
HV.say = "Now choose your new PIN.";
return hvPaint();
}
if (HV.step === "pin") {
return hvCall("vault_open", { p_lot: HV.lot, p_pin: p }).then(function (o) {
HV.pin = "";
if (!o.ok) {
HV.say = o.say || "Wrong PIN.";
return hvPaint();
}
HV.key = p;
HV.d = o;
HV.say = "";
HV.step = "open";
hvSwing(1);
hvPaint();
});
}
},
function () {
[["refreshStanding"], ["loadThings"], ["loadStock"], ["raMineLoad"], ["mmMineLoad"], ["elState"]].forEach(function (f) {
try {
if (typeof window[f[0]] === "function") {
var p = window[f[0]]();
if (p && p.catch)
p.catch(function () { });
}
}
catch (e) { }
});
try {
if (typeof rrLoad === "function")
rrLoad(true);
}
catch (e) { }
try {
if (typeof fgRpc === "function" && typeof fgItems === "function")
fgRpc("my_crafted").then(function (r) { if (Array.isArray(r))
fgItems(r); }).catch(function () { });
}
catch (e) { }
try {
if (typeof BKP !== "undefined")
BKP.at = 0;
}
catch (e) { }
},
function (id, carry) {
HV.busy = true;
hvPaint();
cityRpc("rare_carry", { p_id: id, p_carry: carry }).then(function (o) { HV.busy = false; HV.say = (o && o.say) || ""; return (typeof rrLoad === "function") ? rrLoad(true) : null; }, function (e) { HV.busy = false; HV.say = hvErr(e); })
.then(function () { hvPaint(); try {
if (typeof BKP !== "undefined")
BKP.at = 0;
}
catch (e) { } });
},
function () {
var dots = "";
for (var i = 0; i < Math.max(4, HV.pin.length); i++)
dots += "<span style='display:inline-block;width:16px;height:16px;border-radius:50%;margin:0 5px;border:2px solid #C9A868;background:" + (i < HV.pin.length ? "#C9A868" : "transparent") + "'></span>";
var h = "<div style='text-align:center;margin:10px 0 12px'>" + dots + "</div><div style='display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:260px;margin:0 auto'>";
["1", "2", "3", "4", "5", "6", "7", "8", "9", "<", "0", "ok"].forEach(function (k) {
var lab = k === "<" ? "⌫" : k === "ok" ? "OK" : k;
h += "<button class='btn' data-hv='key' data-k='" + k + "' style='padding:14px 0;font:600 20px var(--sans,system-ui);" + (k === "ok" ? "background:#6A4A12;border-color:#E8C27A" : "") + "' aria-label='" + (k === "<" ? "Delete" : k === "ok" ? "OK" : k) + "'>" + lab + "</button>";
});
return h + "</div>";
},
function (list, into) {
if (!list || !list.length)
return "<div style='opacity:.7;margin:4px 0'>" + (into ? "Nothing in your backpack to put away." : "Nothing in the vault yet.") + "</div>";
return list.slice(0, 120).map(function (t) {
var btn = t.made ? hvB(into ? "put1" : "take1", into ? "Put in" : "Take out", " data-r='" + (+t.row) + "'")
: hvB(into ? "put" : "take", into ? "Put in" : "Take out", " data-i='" + (+t.item) + "' data-n='1'") + (t.n > 1 ? hvB(into ? "put" : "take", "All " + t.n, " data-i='" + (+t.item) + "' data-n='" + (+t.n) + "'") : "");
return hvLine(esc(t.name) + (t.made && t.of ? " <span style='opacity:.6'>(" + esc(t.of) + ")</span>" : "") + (t.n > 1 ? " <span style='opacity:.7'>× " + t.n + "</span>" : ""), btn);
}).join("") + (list.length > 120 ? "<div style='opacity:.7'>…and " + (list.length - 120) + " more kinds.</div>" : "");
},
function (list, into) {
if (!list || !list.length)
return "<div style='opacity:.7;margin:4px 0'>" + (into ? "Nothing in your stock to put away." : "No stock in the vault yet.") + "</div>";
var a = into ? "sput" : "stake";
return list.map(function (s) {
var n = Math.floor(+s.n || 0), k = esc(s.kind);
return hvLine(esc(hvStockName(s)) + " <span style='opacity:.7'>× " + n.toLocaleString() + "</span>", hvB(a, into ? "Put in 1" : "Take out 1", " data-k='" + k + "' data-n='1'") + (n > 10 ? hvB(a, "10", " data-k='" + k + "' data-n='10'") : "") + (n > 1 ? hvB(a, "All", " data-k='" + k + "' data-n='" + n + "'") : ""));
}).join("");
},
function (s) {
if (s.name && s.name !== s.kind)
return s.name;
try {
if (typeof myStock !== "undefined") {
var m = myStock.filter(function (x) { return x.kind === s.kind && x.name; })[0];
if (m)
return m.name;
}
}
catch (e) { }
try {
if (typeof GW_KIND !== "undefined" && GW_KIND[s.kind] && GW_KIND[s.kind].name)
return GW_KIND[s.kind].name;
}
catch (e) { }
try {
if (typeof DQ_ITEM !== "undefined" && DQ_ITEM[s.kind] && DQ_ITEM[s.kind].name)
return DQ_ITEM[s.kind].name;
}
catch (e) { }
try {
if (typeof EL_MATS !== "undefined") {
var e = EL_MATS.filter(function (m) { return m[0] === s.kind; })[0];
if (e)
return e[1];
}
}
catch (x) { }
try {
if (typeof OW_GOOD !== "undefined" && OW_GOOD[s.kind] && OW_GOOD[s.kind].name)
return OW_GOOD[s.kind].name;
}
catch (e) { }
return String(s.kind || "").replace(/^[a-z]+_/, "").replace(/_/g, " ");
},
function (d) {
var h = "";
var tin = +d.trophies_in || 0, tout = +d.trophies_out || 0, nin = +d.nuggets_in || 0, nout = +d.nuggets_out || 0;
if (tin || tout || nin || nout || d.trophies_out != null || d.nuggets_out != null) {
h += hvHead("Trophies and nuggets");
var fl = function (icon, what, label, vin, vout) {
return hvLine(icon + " " + label + ": <b>" + vin + "</b> in the vault · <b>" + vout + "</b> with you", (vout ? hvB("fput", "Put in" + (vout > 1 ? " all " + vout : ""), " data-w='" + what + "' data-n='" + vout + "'") : "") + (vin ? hvB("ftake", "Take out" + (vin > 1 ? " all " + vin : ""), " data-w='" + what + "' data-n='" + vin + "'") : ""));
};
h += fl("🏆", "trophy", "Nightmare trophies", tin, tout) + fl("✨", "nugget", "Gold nuggets", nin, nout);
}
var arts = d.artifacts || [], mach = d.machines || [], rare = [];
try {
if (typeof rrMine === "function")
rare = rrMine().filter(function (r) { return r.state === "owned" || r.state == null; });
}
catch (e) {
rare = [];
}
if (arts.length) {
h += hvHead("🏺 Rare artifacts");
arts.forEach(function (a) {
var D = (typeof RA !== "undefined" && RA.list && RA.list[a.k]) || { name: a.k, icon: "🏺" };
h += hvLine(esc(D.icon || "🏺") + " " + esc(D.name || a.k) + " <span style='opacity:.7'>" + (a.vault ? "in the vault" : "with you") + "</span>", hvB(a.vault ? "ktake" : "kput", a.vault ? "Take out" : "Put in", " data-w='artifact' data-k='" + esc(a.k) + "'"));
});
}
if (mach.length) {
h += hvHead("⚜️ Mythic machines");
mach.forEach(function (m) {
var D = (typeof MM !== "undefined" && MM.list && MM.list[m.k]) || { name: m.k, icon: "⚜️" };
h += hvLine(esc(D.icon || "⚜️") + " " + esc(D.name || m.k) + " <span style='opacity:.7'>" + (m.vault ? "in the vault" : "out in the worlds") + "</span>", hvB(m.vault ? "ktake" : "kput", m.vault ? "Take out" : "Put in", " data-w='machine' data-k='" + esc(m.k) + "'"));
});
h += "<div style='font-size:12px;opacity:.75'>A machine in the vault is off the worlds and safe. Taken out, it stands by until you call it to you from your Backpack.</div>";
}
if (rare.length) {
h += hvHead("💎 Rare things");
rare.forEach(function (r) {
h += hvLine(esc(r.icon || "💎") + " " + esc(r.name) + " <span style='opacity:.7'>No. " + (+r.serial || 0) + (r.carried ? ", carried" : ", in the vault") + "</span>", hvB("rare", r.carried ? "Put in" : "Take out", " data-id='" + (+r.id) + "' data-c='" + (r.carried ? 0 : 1) + "'"));
});
}
if (!h)
h = "<div style='opacity:.7;margin:8px 0'>No trophies, nuggets, artifacts, machines or rare things yet. Whatever you find, you can keep safe here.</div>";
return h;
},
function () {
var h = "<div style='display:flex;align-items:center;gap:8px;margin-bottom:8px'><b style='font-size:15px;flex:1'>🔐 Your hidden vault</b>" + hvB("x", HV.step === "open" ? "Lock and close" : "Close") + "</div>";
if (HV.say)
h += "<div role='status' style='margin:0 0 8px;padding:5px 8px;border:1px solid rgba(232,194,122,.4);border-radius:4px'>" + esc(HV.say) + "</div>";
if (!HV.step)
return h + "<p>Looking…</p>";
if (HV.step === "msg")
return h;
if (HV.step === "pin1")
return h + "<p style='margin:4px 0'>Choose your own PIN: 4 to 8 numbers. Only you will know it. Nobody else, not even the Keeper, can see it.</p>" + hvPad();
if (HV.step === "pin2")
return h + "<p style='margin:4px 0'>Type the same PIN again.</p>" + hvPad();
if (HV.step === "old")
return h + "<p style='margin:4px 0'>To change your PIN, first type the one you have now.</p>" + hvPad();
if (HV.step === "pin")
return h + "<p style='margin:4px 0'>Type your PIN.</p>" + hvPad() + "<p style='font-size:12px;opacity:.75;margin-top:10px'>Forgotten it? Ask the Keeper to clear it. What is inside stays where it is.</p>";
var d = HV.d || {};
var tabs = [["things", "Things"], ["stock", "Stock"], ["finds", "Finds"], ["gold", "Gold"]];
h += "<div role='tablist' style='display:flex;gap:4px;flex-wrap:wrap;margin:2px 0 6px'>" + tabs.map(function (t) {
var on = HV.tab === t[0];
return hvB("tab", t[1], " data-t='" + t[0] + "' role='tab' aria-selected='" + on + "'", on ? "background:#6A4A12;border-color:#E8C27A;" : "");
}).join("") + "</div>";
if (HV.tab === "gold") {
h += hvHead("Gold") +
"<div>In the vault: <b>" + (+d.gold || 0).toLocaleString() + "</b> · in your purse: <b>" + (+d.purse || 0).toLocaleString() + "</b></div>" +
"<div style='margin:4px 0'>" + [10, 100, 1000].map(function (n) { return hvB("gold", "Put in " + n.toLocaleString(), " data-g='" + n + "'"); }).join("") + (d.purse > 0 ? hvB("gold", "Put in all", " data-g='" + d.purse + "'") : "") + "</div>" +
"<div style='margin:0 0 4px'>" + [10, 100, 1000].map(function (n) { return hvB("gold", "Take out " + n.toLocaleString(), " data-g='-" + n + "'"); }).join("") + (d.gold > 0 ? hvB("gold", "Take out all", " data-g='-" + d.gold + "'") : "") + "</div>";
}
else if (HV.tab === "stock") {
if (d.stock_out == null && d.stock_in == null)
h += "<div style='opacity:.8;margin:6px 0'>Stock goes in the vault soon.</div>";
else
h += hvHead("Stock in the vault") + hvStockRows(d.stock_in, false) + hvHead("Your stock") + hvStockRows(d.stock_out, true);
}
else if (HV.tab === "finds") {
h += hvFindsHtml(d);
}
else {
h += hvHead("In the vault") + hvRows(d.inside, false);
h += hvHead("In your backpack") + hvRows(d.backpack, true);
}
h += "<div style='margin-top:12px'>" + hvB("change", "Change my PIN") + "</div>";
return h;
},
function () {
var el = document.getElementById("hv-box");
if (!HV.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "hv-box";
el.style.cssText = "position:fixed;z-index:56;left:50%;top:50%;transform:translate(-50%,-50%);width:min(440px,calc(100vw - 32px));max-height:min(86vh,760px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(24,24,30,.97),rgba(10,10,14,.98));border:1px solid #C9A868;border-radius:8px;padding:12px 14px 14px;color:var(--bone,#C9BEA8);" +
"font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("click", function (ev) {
var b = ev.target.closest && ev.target.closest("[data-hv]");
if (!b)
return;
ev.stopPropagation();
var a = b.getAttribute("data-hv");
if (a === "x")
return hvClose();
if (a === "key")
return hvKey(b.getAttribute("data-k"));
if (HV.busy)
return;
if (a === "gold")
return hvGold(+b.getAttribute("data-g"));
if (a === "tab") {
HV.tab = b.getAttribute("data-t");
HV.say = "";
hvPaint();
el.scrollTop = 0;
return;
}
if (a === "put" || a === "take")
return hvThing(+b.getAttribute("data-i"), +b.getAttribute("data-n"), a === "put");
if (a === "put1" || a === "take1")
return hvOne(+b.getAttribute("data-r"), a === "put1");
if (a === "sput" || a === "stake")
return hvStock(b.getAttribute("data-k"), +b.getAttribute("data-n"), a === "sput");
if (a === "fput" || a === "ftake")
return hvFinds(b.getAttribute("data-w"), +b.getAttribute("data-n"), a === "fput");
if (a === "kput" || a === "ktake")
return hvKeep(b.getAttribute("data-w"), b.getAttribute("data-k"), a === "kput");
if (a === "rare")
return hvRare(+b.getAttribute("data-id"), b.getAttribute("data-c") === "1");
if (a === "change") {
HV.step = "old";
HV.pin = "";
HV.say = "";
return hvPaint();
}
});
["keyup", "keypress"].forEach(function (k) { el.addEventListener(k, function (e) { e.stopPropagation(); }); });
document.body.appendChild(el);
}
el.style.display = "block";
el.innerHTML = hvHtml() + (HV.busy ? "<div style='opacity:.7;margin-top:6px'>…</div>" : "");
},
function (k, draft) {
if (!k || typeof FURN === "undefined" || !FURN[k])
return false;
var used = bfCount(draft, k), pool = bfPool(k), own = bfOwned(k);
if (used < pool + own)
return true;
var it = typeof SG !== "undefined" && SG.by && SG.by[k], msg;
if (own)
msg = "<b>All " + (pool + own) + " of your " + esc(bfName(k).toLowerCase()) + " are set out.</b> " + (it && typeof SG_DATA !== "undefined" ? "Buy another at " + esc(SG_DATA.shops[it.s]) + "." : "Buy another first.");
else if (pool)
msg = "<b>This house had " + pool + " of those, and all " + pool + " are set out.</b> Another one is bought in the shops first.";
else if (it && typeof SG_DATA !== "undefined")
msg = "<b>You don't own that yet.</b> It is sold at " + esc(SG_DATA.shops[it.s]) + ": buy it first, then set it out.";
else if (/^um_/.test(k))
msg = "<b>You don't own that yet.</b> It is sold at the Model Workshop, in the Somnucor Tower.";
else
msg = "<b>That piece is not this house's own.</b> Furniture is bought in the shops first, then set out at home.";
if (typeof setStatus === "function")
setStatus(msg);
return false;
},
function (sel) {
if (!sel || sel.getAttribute("data-bf"))
return;
sel.setAttribute("data-bf", "1");
var draft = bfDraft() || [], free = bfFree();
var plain = null;
Array.prototype.forEach.call(sel.querySelectorAll("optgroup"), function (g) { if (!g.getAttribute("data-sg") && !g.getAttribute("data-um"))
plain = g; });
var loose = Array.prototype.filter.call(sel.children, function (c) { return c.tagName === "OPTION"; });
if (!plain && loose.length) {
plain = document.createElement("optgroup");
plain.label = "The house's own pieces";
loose.forEach(function (op) { plain.appendChild(op); });
sel.appendChild(plain);
}
if (plain && !free) {
Array.prototype.slice.call(plain.querySelectorAll("option")).forEach(function (op) {
var k = op.value || op.textContent, pool = bfPool(k);
if (!pool) {
op.parentNode.removeChild(op);
return;
}
op.textContent = k + " (" + Math.max(0, pool - bfCount(draft, k)) + " of " + pool + " to set out)";
});
plain.label = "The house's own pieces";
if (!plain.querySelector("option"))
plain.parentNode.removeChild(plain);
}
var bought = sel.querySelector("optgroup[data-sg]");
if (!free) {
var seen = {};
Array.prototype.forEach.call(sel.querySelectorAll("option"), function (op) { seen[op.value] = 1; });
var extra = [];
bfAsBuilt().concat(BF.start || []).forEach(function (p) { if (p && p.k && !seen[p.k] && typeof SG !== "undefined" && SG.by && SG.by[p.k]) {
seen[p.k] = 1;
extra.push(p.k);
} });
if (extra.length) {
var keep = plain && plain.parentNode === sel;
var og = keep ? plain : document.createElement("optgroup");
if (!keep) {
og.label = "The house's own pieces";
og.setAttribute("data-bfh", "1");
}
extra.sort().forEach(function (k) {
var op = document.createElement("option");
op.value = k;
var pool = bfPool(k), own = bfOwned(k);
op.textContent = bfName(k) + " (" + Math.max(0, pool + own - bfCount(draft, k)) + " of " + (pool + own) + " to set out)";
og.appendChild(op);
});
if (!keep)
sel.insertBefore(og, bought ? bought.nextSibling : sel.firstChild);
}
}
var mine = {};
((typeof myThings !== "undefined" && myThings) || []).forEach(function (t) { if (t && /^um_\d+$/.test(t.archetype) && typeof FURN !== "undefined" && FURN[t.archetype])
mine[t.archetype] = (mine[t.archetype] || 0) + 1; });
var keys = Object.keys(mine);
if (keys.length && !sel.querySelector("optgroup[data-um]")) {
var mg = document.createElement("optgroup");
mg.label = "From the Model Workshop";
mg.setAttribute("data-um", "1");
keys.sort().forEach(function (k) {
var op = document.createElement("option");
op.value = k;
var own = mine[k] + (free ? 0 : bfPool(k));
op.textContent = bfName(k) + (free ? "" : " (" + Math.max(0, own - bfCount(draft, k)) + " of " + own + " to set out)");
mg.appendChild(op);
});
sel.insertBefore(mg, sel.firstChild);
}
if (!sel.querySelector("option")) {
var none = document.createElement("option");
none.value = "";
none.textContent = "Nothing to set out: buy furniture in the shops first";
sel.appendChild(none);
}
if (sel.selectedIndex < 0 || !sel.value) {
var first = sel.querySelector("option[value]:not([value=''])");
if (first)
sel.value = first.value;
}
},
function (e) {
var m = String(e && e.message || e || "");
try {
var j = JSON.parse(m);
m = j.hint || j.message || m;
}
catch (x) { }
return /function|404|schema cache/i.test(m) ? ((typeof notOpenYet === "function") ? notOpenYet("The Model Workshop opens soon.", "The Model Workshop needs the latest server update.") : "The Model Workshop opens soon.") : m;
},
function (path) {
var tok = (typeof freshToken === "function") ? freshToken() : Promise.resolve(null);
return tok.then(function (t) {
return fetch(mwBase() + "/storage/v1/object/authenticated/models/" + String(path).split("/").map(encodeURIComponent).join("/"), { headers: { apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + (t || DW_CONFIG.supabaseKey) } });
}).then(function (r) { if (!r.ok)
throw new Error("The model could not be fetched (" + r.status + ")."); return r.arrayBuffer(); });
},
function (buf) {
return new Promise(function (ok, no) {
if (typeof modelsLoader !== "function")
return no(new Error("The model reader is not here."));
modelsLoader(function (L) {
if (!L)
return no(new Error("The model reader could not load."));
try {
L.parse(buf, "", function (gl) { ok(gl); }, function (e) { no(new Error("That file is not a model the game can read.")); });
}
catch (e) {
no(new Error("That file is not a model the game can read."));
}
});
});
},
function (scene) {
var tris = 0, tex = 0, b = new THREE.Box3().setFromObject(scene), s = b.getSize(new THREE.Vector3());
scene.traverse(function (m) {
if (!m.isMesh || !m.geometry)
return;
var g = m.geometry;
tris += g.index ? g.index.count / 3 : (g.attributes.position ? g.attributes.position.count / 3 : 0);
[].concat(m.material || []).forEach(function (mt) {
["map", "normalMap", "roughnessMap", "metalnessMap", "emissiveMap", "aoMap"].forEach(function (k) {
var t = mt && mt[k], im = t && t.image;
if (im)
tex = Math.max(tex, im.width || 0, im.height || 0);
});
});
});
return { tris: Math.round(tris), tex: tex, w: s.x, h: s.y, d: s.z, box: b };
},
function (scene, size) {
var b = new THREE.Box3().setFromObject(scene), s = b.getSize(new THREE.Vector3()), c = b.getCenter(new THREE.Vector3());
var want = (size && +size[1]) || 1, k = s.y > 0.0001 ? want / s.y : 1;
var g = new THREE.Group(), inner = new THREE.Group();
inner.add(scene);
scene.position.set(-c.x, -b.min.y, -c.z);
inner.scale.setScalar(k);
g.add(inner);
return g;
},
function (m) {
var id = m.id;
if (MW.glb[id])
return MW.glb[id];
MW.glb[id] = mwFetch(m.path).then(mwParse).then(function (gl) {
var sc = gl.scene, lite = typeof LITE !== "undefined" && LITE, mats = {};
sc.traverse(function (o) {
if (!o.isMesh)
return;
o.castShadow = !lite;
o.receiveShadow = true;
if (lite && typeof modelMat === "function") {
var conv = function (x) { return mats[x.uuid] || (mats[x.uuid] = modelMat(x)); };
o.material = Array.isArray(o.material) ? o.material.map(conv) : conv(o.material);
}
});
return mwFit(sc, m.size);
});
MW.glb[id].catch(function () { });
return MW.glb[id];
},
function (m) {
var k = "um_" + m.id;
MW.by[k] = m;
if (typeof FURN === "undefined")
return;
FURN[k] = function () {
var g = new THREE.Group();
g.name = k;
var sz = m.size || [1, 1, 1];
var ph = new THREE.Mesh(new THREE.BoxGeometry(+sz[0] || 1, +sz[1] || 1, +sz[2] || 1), new THREE.MeshLambertMaterial({ color: 0x8A8478, transparent: true, opacity: 0.35 }));
ph.position.y = (+sz[1] || 1) / 2;
g.add(ph);
mwScene(m).then(function (proto) { g.remove(ph); ph.geometry.dispose(); g.add(proto.clone(true)); }).catch(function () { });
return g;
};
if (typeof SOLIDFURN !== "undefined" && (+m.size[1] || 0) > 0.5)
SOLIDFURN[k] = 1;
},
function (host, objP, label) {
mwViewStop();
var w = Math.min(380, host.clientWidth || 320), h = Math.round(w * 0.75);
var c = document.createElement("canvas");
c.width = w;
c.height = h;
c.style.cssText = "width:" + w + "px;height:" + h + "px;border-radius:6px;background:#15130F;display:block;margin:6px auto";
host.innerHTML = "";
host.appendChild(c);
var r;
try {
r = new THREE.WebGLRenderer({ canvas: c, antialias: true });
}
catch (e) {
host.textContent = "This device cannot show the viewer.";
return;
}
r.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
r.setSize(w, h, false);
if (r.outputEncoding !== undefined && THREE.sRGBEncoding)
r.outputEncoding = THREE.sRGBEncoding;
var sc = new THREE.Scene();
sc.background = new THREE.Color(0x15130F);
sc.add(new THREE.HemisphereLight(0xEDE6D6, 0x3A3428, 0.9));
var sun = new THREE.DirectionalLight(0xFFF2DC, 0.8);
sun.position.set(3, 5, 4);
sc.add(sun);
var floor = new THREE.Mesh(new THREE.CircleGeometry(3, 40), new THREE.MeshLambertMaterial({ color: 0x2A2620 }));
floor.rotation.x = -Math.PI / 2;
sc.add(floor);
var cam = new THREE.PerspectiveCamera(40, w / h, 0.05, 200);
var v = MW.view = { c: c, r: r, raf: 0, obj: null }, turn = 0, drag = null;
c.addEventListener("pointerdown", function (e) { drag = e.clientX; c.setPointerCapture && c.setPointerCapture(e.pointerId); });
c.addEventListener("pointermove", function (e) { if (drag !== null) {
turn += (e.clientX - drag) * 0.012;
drag = e.clientX;
} });
c.addEventListener("pointerup", function () { drag = null; });
host.insertAdjacentHTML("beforeend", "<div style='text-align:center;font-size:12px;opacity:.75'>" + esc(label || "Drag to turn it round.") + "</div>");
objP.then(function (obj) {
if (MW.view !== v)
return;
v.obj = obj;
sc.add(obj);
var b = new THREE.Box3().setFromObject(obj), s = b.getSize(new THREE.Vector3()), R = Math.max(s.x, s.y, s.z, 0.2);
floor.scale.setScalar(Math.max(0.5, R));
cam.position.set(0, s.y * 0.6 + R * 0.4, R * 2.1);
cam.lookAt(0, s.y * 0.45, 0);
}).catch(function (e) { if (MW.view === v) {
host.innerHTML = "<div style='opacity:.8'>" + esc(e.message || "The model could not be shown.") + "</div>";
mwViewStop();
} });
(function loop() {
if (MW.view !== v)
return;
if (v.obj) {
if (drag === null)
turn += 0.006;
v.obj.rotation.y = turn;
}
r.render(sc, cam);
v.raf = requestAnimationFrame(loop);
})();
},
function (file) {
MW.file = null;
MW.say = "";
if (!file)
return mwPaint();
if (!/\.glb$/i.test(file.name)) {
MW.say = "Choose a .glb file (a 3D model in one file).";
return mwPaint();
}
if (file.size > MW_MAX_BYTES) {
MW.say = "That model is " + (file.size / 1048576).toFixed(1) + " MB. A model is at most 4 MB, so phones can carry it.";
return mwPaint();
}
MW.busy = true;
MW.say = "Reading the model…";
mwPaint();
file.arrayBuffer().then(function (buf) {
var head = new Uint8Array(buf, 0, 4);
if (String.fromCharCode(head[0], head[1], head[2], head[3]) !== "glTF")
throw new Error("That file is not a .glb model.");
return mwParse(buf.slice(0)).then(function (gl) {
var ms = mwMeasure(gl.scene);
if (ms.tris > MW_MAX_TRIS)
throw new Error("That model has " + ms.tris.toLocaleString() + " triangles. At most " + MW_MAX_TRIS.toLocaleString() + ", so every phone can draw it: make it simpler and try again.");
if (ms.tex > MW_MAX_TEX)
throw new Error("A picture in that model is " + ms.tex + " pixels across. At most " + MW_MAX_TEX + ": make its pictures smaller and try again.");
MW.file = { name: file.name, buf: buf, bytes: file.size, ms: ms, scene: gl.scene };
if (!MW.form.title)
MW.form.title = file.name.replace(/\.glb$/i, "").replace(/[_-]+/g, " ").slice(0, 60);
if (!MW.form.height)
MW.form.height = String(Math.max(0.1, Math.min(6, ms.h > 0.01 && ms.h < 20 ? +ms.h.toFixed(2) : 1)));
MW.say = "";
});
}).catch(function (e) { MW.say = e.message || "That model could not be read."; MW.file = null; })
.then(function () { MW.busy = false; mwPaint(); });
},
function () {
var f = MW.file;
if (!f || MW.busy)
return;
var title = String(MW.form.title || "").trim(), price = Math.round(+MW.form.price || 0), height = +MW.form.height || 0;
if (title.length < 2) {
MW.say = "Give the model a name.";
return mwPaint();
}
if (!(price >= 10 && price <= 100000)) {
MW.say = "A price is 10 to 100,000 gold.";
return mwPaint();
}
if (!(height >= 0.05 && height <= 12)) {
MW.say = "How tall it stands, in metres: 0.05 to 12.";
return mwPaint();
}
var uid = typeof myUserId === "function" ? myUserId() : null;
if (!uid) {
MW.say = "Sign in first.";
return mwPaint();
}
var k = height / (f.ms.h || 1), size = [+(f.ms.w * k).toFixed(3), +height.toFixed(3), +(f.ms.d * k).toFixed(3)];
var path = uid + "/" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7) + ".glb";
MW.busy = true;
MW.say = "Sending the model…";
mwPaint();
freshToken().then(function (tok) {
return fetch(mwBase() + "/storage/v1/object/models/" + path.split("/").map(encodeURIComponent).join("/"), { method: "POST",
headers: { apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + tok, "Content-Type": "model/gltf-binary", "x-upsert": "false" }, body: f.buf });
}).then(function (r) {
if (!r.ok)
return r.text().then(function (t) { throw new Error(/policy|row-level|403|401/i.test(t + r.status) ? "Uploading models is for dreamers whose dues are paid (and the Workshop's makers)." : (/bucket/i.test(t) ? mwErr(new Error("function")) : "The upload did not go through (" + r.status + ").")); });
return cityRpc("model_submit", { p_title: title, p_path: path, p_bytes: f.bytes, p_tris: f.ms.tris, p_size: size, p_price: price });
}).then(function (o) {
MW.say = (o && o.say) || "Sent.";
if (o && o.ok) {
MW.file = null;
MW.form = { title: "", price: String(price), height: "" };
}
}).catch(function (e) { MW.say = mwErr(e); })
.then(function () { MW.busy = false; mwLoad(); });
},
function () {
MW.busy = true;
mwPaint();
return mwRpc("model_workshop", {}).then(function (o) { MW.d = o; }, function (e) { MW.d = { ok: false, say: mwErr(e) }; })
.then(function () { MW.busy = false; if (MW.d && MW.d.ok) {
(MW.d.shop || []).forEach(mwRegister);
if (MW.tab === "mine" && !MW.d.maker)
MW.tab = "shop";
if (MW.tab === "review" && !MW.d.mod)
MW.tab = "shop";
} mwPaint(); });
},
function (m, btns, sub) {
return "<div style='padding:6px 0;border-bottom:1px solid rgba(255,255,255,.07)'><div><b>" + esc(m.title) + "</b> <span style='opacity:.75'>" + esc(sub || "") + "</span></div>" +
"<div style='font-size:12px;opacity:.75'>" + (+m.size[1] || 0).toFixed(2) + " m tall · " + (+m.tris || 0).toLocaleString() + " triangles" + (m.maker ? " · made by " + esc(m.maker) : "") + "</div><div>" + btns + "</div>" +
"<div data-mwview='" + m.id + "'></div></div>";
},
function () {
var h = "<div style='display:flex;align-items:center;gap:8px;margin-bottom:8px'><b style='font-size:15px;flex:1'>🧊 The Model Workshop</b>" + mwB("x", "Close") + "</div>" +
"<div style='font-size:12px;opacity:.8;margin:-4px 0 8px'>In the Somnucor Tower. Models made by the city's Model Makers and by any dreamer whose dues are paid, every one looked at by a moderator.</div>";
if (MW.say)
h += "<div role='status' style='margin:0 0 8px;padding:5px 8px;border:1px solid rgba(232,194,122,.4);border-radius:4px'>" + esc(MW.say) + "</div>";
var d = MW.d;
if (!d)
return h + "<p>Looking…</p>";
if (!d.ok)
return h + "<p>" + esc(d.say || "") + "</p>";
var tabs = [["shop", "For sale"]];
if (d.maker)
tabs.push(["mine", "Your models"]);
if (d.mod)
tabs.push(["review", "Review" + ((d.review || []).length ? " (" + d.review.length + ")" : "")]);
tabs.push(["jobs", "Work here"]);
h += "<div style='margin-bottom:8px'>" + tabs.map(function (t) { return mwB("tab", t[1], " data-t='" + t[0] + "'", MW.tab === t[0]); }).join("") + "</div>";
if (MW.tab === "shop") {
var shop = d.shop || [];
if (!shop.length)
h += "<p style='opacity:.8'>Nothing for sale yet. The Model Makers' first pieces go on sale as soon as a moderator has looked at them.</p>";
shop.forEach(function (m) { h += mwRow(m, mwB("look", "👁 Look", " data-i='" + m.id + "'") + (d.me ? mwB("buy", "Buy · " + (+m.price).toLocaleString() + " gold", " data-i='" + m.id + "'") : "<span style='opacity:.7'>Sign in to buy.</span>"), (+m.price).toLocaleString() + " gold"); });
h += "<p style='font-size:12px;opacity:.75;margin-top:8px'>A model you buy is in your backpack. Set it out at home with <b>Rearrange your house</b>.</p>";
}
if (MW.tab === "mine") {
h += "<div style='padding:6px 0 10px;border-bottom:1px solid rgba(255,255,255,.1)'><b>Upload a model</b><div style='font-size:12px;opacity:.8;margin:2px 0 6px'>A .glb file: at most 4 MB, " + MW_MAX_TRIS.toLocaleString() + " triangles, and pictures of " + MW_MAX_TEX + " pixels. It is checked here first, so every phone can draw it. A moderator looks at it before anyone else sees it.</div>" +
"<input id='mw-file' type='file' accept='.glb,model/gltf-binary' style='display:none'>" + mwB("pick", MW.file ? "📦 Choose another file" : "📦 Choose a .glb file");
if (MW.file) {
var ms = MW.file.ms;
h += "<div style='margin:6px 0;font-size:12.5px'>" + esc(MW.file.name) + " · " + (MW.file.bytes / 1048576).toFixed(2) + " MB · " + ms.tris.toLocaleString() + " triangles ✓</div>" +
"<div data-mwview='up'></div>" +
"<label style='display:block;margin:4px 0'>Name <input id='mw-title' maxlength='60' value='" + esc(MW.form.title) + "' style='width:100%;box-sizing:border-box;background:#1A140C;color:inherit;border:1px solid #6A5A3A;border-radius:4px;padding:5px'></label>" +
"<label style='display:inline-block;margin:4px 8px 4px 0'>Height in metres <input id='mw-height' type='number' min='0.05' max='12' step='0.05' value='" + esc(MW.form.height) + "' style='width:80px;background:#1A140C;color:inherit;border:1px solid #6A5A3A;border-radius:4px;padding:5px'></label>" +
"<label style='display:inline-block;margin:4px 0'>Price in gold <input id='mw-price' type='number' min='10' max='100000' step='10' value='" + esc(MW.form.price) + "' style='width:100px;background:#1A140C;color:inherit;border:1px solid #6A5A3A;border-radius:4px;padding:5px'></label>" +
"<div style='font-size:12px;opacity:.75'>You are paid 80% of every sale; the city keeps 20%.</div>" +
"<div style='margin-top:6px'>" + mwB("send", "Send for review") + "</div>";
}
h += "</div>";
var mine = d.mine || [];
if (!mine.length)
h += "<p style='opacity:.8'>You have not sent any models yet.</p>";
mine.forEach(function (m) {
var b = mwB("look", "👁 Look", " data-i='" + m.id + "'");
if (m.status === "approved")
b += mwB("list", m.listed ? "Take off sale" : "Put on sale", " data-i='" + m.id + "' data-l='" + (m.listed ? 0 : 1) + "'") + mwB("price", "Price " + (+m.price).toLocaleString() + ": −50", " data-i='" + m.id + "' data-p='" + Math.max(10, m.price - 50) + "'") + mwB("price", "+50", " data-i='" + m.id + "' data-p='" + Math.min(100000, m.price + 50) + "'");
h += mwRow(m, b, (MW_ST[m.status] || m.status) + (m.status === "approved" ? " · " + (+m.sold || 0) + " sold" : "") + (m.reason ? " · " + m.reason : ""));
});
}
if (MW.tab === "review") {
var rv = d.review || [];
if (!rv.length)
h += "<p style='opacity:.8'>No models waiting.</p>";
rv.forEach(function (m) { h += mwRow(m, mwB("look", "👁 Look", " data-i='" + m.id + "'") + mwB("ok", "✅ Approve", " data-i='" + m.id + "'") + mwB("no", "❌ Refuse", " data-i='" + m.id + "'"), (+m.price).toLocaleString() + " gold"); });
h += "<p style='font-size:12px;opacity:.75;margin-top:8px'>Look at each model all the way round. Refuse anything hateful, sexual, cruel, copied from someone else's work, or carrying a real brand.</p>";
}
if (MW.tab === "jobs") {
h += "<p>The Workshop is one of the city's own businesses, paid by the Treasury. Its makers upload the models; its head runs the floor and looks after promotions and raises.</p>";
(d.jobs || []).forEach(function (j) { h += "<div style='padding:4px 0'><b>" + esc(j.title) + "</b> · " + j.rate + " gold an hour · " + j.taken + " of " + j.positions + " filled</div>"; });
h += "<div style='margin-top:6px'>" + mwB("board", "📋 Apply on the job board") + (d.maker ? "" : "") + "</div>";
}
return h;
},
function () {
var el = document.getElementById("mw-box");
if (!MW.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "mw-box";
el.style.cssText = "position:fixed;z-index:53;left:50%;top:50%;transform:translate(-50%,-50%);width:min(540px,calc(100vw - 32px));max-height:min(86vh,780px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(22,24,30,.97),rgba(9,10,13,.98));border:1px solid #C9A868;border-radius:8px;padding:12px 14px 14px;color:var(--bone,#C9BEA8);" +
"font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("input", function (e) { var t = e.target; if (t.id === "mw-title")
MW.form.title = t.value; if (t.id === "mw-price")
MW.form.price = t.value; if (t.id === "mw-height")
MW.form.height = t.value; });
el.addEventListener("change", function (e) { if (e.target.id === "mw-file")
mwPick(e.target.files && e.target.files[0]); });
el.addEventListener("click", mwClick);
document.body.appendChild(el);
}
el.style.display = "block";
var keep = MW.view && MW.view.c && MW.view.key;
mwViewStop();
el.innerHTML = mwHtml() + (MW.busy ? "<div style='opacity:.7;margin-top:6px'>…</div>" : "");
if (MW.tab === "mine" && MW.file) {
var host = el.querySelector("[data-mwview='up']");
if (host) {
mwViewStart(host, Promise.resolve(mwFit(MW.file.scene.clone(true), [1, +MW.form.height || 1, 1])), "Drag to turn it round. This is how it will look.");
MW.view.key = "up";
}
}
else if (keep && keep !== "up") {
var m = mwFind(keep), host2 = el.querySelector("[data-mwview='" + keep + "']");
if (m && host2) {
mwViewStart(host2, mwScene(m).then(function (p) { return p.clone(true); }));
MW.view.key = keep;
}
}
},
function (ev) {
var b = ev.target.closest && ev.target.closest("[data-mw]");
if (!b)
return;
ev.stopPropagation();
var a = b.getAttribute("data-mw"), id = +b.getAttribute("data-i");
if (a === "x")
return mwClose();
if (a === "tab") {
MW.tab = b.getAttribute("data-t");
MW.say = "";
mwViewStop();
return mwPaint();
}
if (a === "pick") {
var f = document.getElementById("mw-file");
if (f)
f.click();
return;
}
if (a === "look") {
var m = mwFind(id), host = document.querySelector("#mw-box [data-mwview='" + id + "']");
if (!m || !host)
return;
if (MW.view && MW.view.key === id) {
mwViewStop();
host.innerHTML = "";
return;
}
Array.prototype.forEach.call(document.querySelectorAll("#mw-box [data-mwview]"), function (x) { if (x !== host && x.getAttribute("data-mwview") !== "up")
x.innerHTML = ""; });
mwViewStart(host, mwScene(m).then(function (p) { return p.clone(true); }));
MW.view.key = id;
return;
}
if (a === "board") {
mwClose();
if (typeof showJobBoard === "function")
try {
if (typeof openPanel === "function")
openPanel();
showJobBoard();
}
catch (e) { }
setStatus("<b>The Model Workshop is hiring.</b> Look for Model Maker on the job board.");
return;
}
if (MW.busy)
return;
if (a === "send")
return mwSend();
var call = null;
if (a === "buy")
call = cityRpc("model_buy", { p_id: id });
if (a === "ok")
call = cityRpc("model_decide", { p_id: id, p_ok: true, p_reason: "" });
if (a === "no") {
var why = window.prompt ? (window.prompt("Why not? The maker is told. (optional)") || "") : "";
call = cityRpc("model_decide", { p_id: id, p_ok: false, p_reason: why });
}
if (a === "list")
call = cityRpc("model_set", { p_id: id, p_price: null, p_listed: b.getAttribute("data-l") === "1" });
if (a === "price")
call = cityRpc("model_set", { p_id: id, p_price: +b.getAttribute("data-p"), p_listed: null });
if (!call)
return;
MW.busy = true;
mwPaint();
call.then(function (o) { MW.say = (o && o.say) || "Done."; if (a === "buy" && o && o.ok) {
if (typeof loadThings === "function")
loadThings();
if (typeof refreshStanding === "function")
refreshStanding();
} if (a === "ok")
mwLoadList(true); }, function (e) { MW.say = mwErr(e); })
.then(function () { MW.busy = false; mwLoad(); });
}
];
});
