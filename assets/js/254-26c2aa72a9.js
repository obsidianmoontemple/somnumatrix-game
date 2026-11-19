/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var BKP = { open: false, busy: false, d: {}, at: 0 };
function bkpRpc(name, args) { return (typeof cityRpc === "function" ? cityRpc(name, args || {}) : Promise.reject(new Error("offline"))).catch(function () { return null; }); }
function bkpLoad() { return __ZC(254, 0, this, arguments, new.target); }
function bkpOpen() { BKP.open = true; bkpPaint(); bkpLoad(); if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { } }
function bkpClose() { BKP.open = false; bkpPaint(); }
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return !!BKP.open; }, close: bkpClose });
function bkpKind(t) {
var a = String(t.archetype || ""), n = String(t.name || "");
if (t.speed)
return "ride";
if (/^wear_/.test(a))
return "wear";
if (/^skin_/.test(a) || / skin$/i.test(n))
return "skin";
if (/^relic_/.test(a))
return "relic";
return "other";
}
function bkpRow(left, right) { return '<div style="display:flex;justify-content:space-between;gap:10px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.06)"><span>' + left + '</span><span style="text-align:right;max-width:58%;overflow-wrap:anywhere">' + right + '</span></div>'; }
function bkpHead(t) { return '<div style="margin:12px 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#C9A868">' + t + '</div>'; }
function bkpDim(t) { return '<span style="color:var(--dim,#999)">' + t + '</span>'; }
function bkpHtml() { return __ZC(254, 1, this, arguments, new.target); }
var BKP_WEARAS = { pp_partyhat: ["wizard", 0xE85AA8], pp_mask: ["carnivalmask", 0xD8B048], pp_tiara: ["tiara", 0xE8E0F8], pp_bal_crown: ["crown", 0xF0C040],
ll_keep_scarf: ["scarf", 0xC8A8E0], ll_prize_scarf: ["scarf", 0xC8A8E0], ll_keep_pearls: ["necklace", 0xF4F0E6], ll_prize_pearls: ["necklace", 0xF4F0E6] };
var BKP_LOOKKEY = { layer: "layer", legs: "bottomKind", feet: "shoeKind", hat: "hat", back: "back", face: "face", neck: "neck", ears: "ears", hands: "hands", waist: "waist" };
var BKP_ARMNAME = [[/laser ?sword|lightsaber/i, "lasersword"], [/phaser|ray ?gun|blaster/i, "phaser"], [/pistol|revolver|handgun|flintlock/i, "pistol"], [/gun|rifle|musket|shotgun|carbine|blunderbuss/i, "rifle"],
[/crossbow/i, "crossbowlying"], [/\bbow\b|longbow/i, "bowlying"], [/sling/i, "slinglying"], [/dagger|knife|dirk/i, "daggerlying"], [/sword|sabre|saber|blade|katana|rapier|cutlass|scimitar/i, "swordlying"],
[/spear|lance|pike|trident/i, "spearlying"], [/\baxe\b|hatchet/i, "axelying"], [/mace|club|hammer/i, "maelying"], [/shield/i, "shieldlying"], [/staff/i, "staffmagic"], [/wand/i, "wand"], [/torch/i, "torchlying"], [/horn/i, "hornlying"]];
function bkpKept() { var d = store; if (!Array.isArray(d.kept))
d.kept = []; return d.kept; }
function bkpArmNoun(t) {
if (/fish|food|drink|card|mug|cup|plush|toy/i.test(String(t.archetype || "")))
return "";
var w = String(t.name || "").split(/\s+(?:of|from|with|for|in)\s+/i)[0].trim().split(/\s+/);
return w[w.length - 1] || "";
}
function bkpArmOf(t) {
var a = String(t.archetype || "");
if (typeof ARMS !== "undefined" && ARMS[a])
return a;
var n = bkpArmNoun(t);
for (var i = 0; i < BKP_ARMNAME.length; i++)
if (BKP_ARMNAME[i][0].test(n) && typeof ARMS !== "undefined" && ARMS[BKP_ARMNAME[i][1]])
return BKP_ARMNAME[i][1];
return null;
}
function bkpWearKey(t) { return __ZC(254, 2, this, arguments, new.target); }
function bkpSkinKey(t) { return __ZC(254, 3, this, arguments, new.target); }
function bkpPack(t, D) { return __ZC(254, 4, this, arguments, new.target); }
function bkpInDream() { var r = typeof somnucorRealm === "function" ? somnucorRealm() : null; return !(r && (store.here || 0) === r.id) && !(typeof WLD !== "undefined" && WLD.on) && !store.inside && !store.hub; }
function bkpUseBtns(t, i, D) { return __ZC(254, 5, this, arguments, new.target); }
function bkpHandHtml() { return __ZC(254, 6, this, arguments, new.target); }
function bkpKeptHtml() { return __ZC(254, 7, this, arguments, new.target); }
function bkpRemoveFromWorld(spec) {
var k = store.objects.indexOf(spec);
if (k > -1)
store.objects.splice(k, 1);
if (typeof meshes !== "undefined" && meshes[spec.id]) {
scene.remove(meshes[spec.id]);
delete meshes[spec.id];
}
}
function bkpStow(quiet) { return __ZC(254, 8, this, arguments, new.target); }
function bkpHold(arch, label, extra) { return __ZC(254, 9, this, arguments, new.target); }
function bkpUse(t) { return __ZC(254, 10, this, arguments, new.target); }
(function () {
if (typeof pickUp !== "function" || typeof dropCarried !== "function")
return;
var pu = pickUp, dc = dropCarried;
pickUp = function (spec) {
var r = pu.apply(this, arguments);
try {
if (r && spec && !spec.relic && !spec.fromBag && !/^relic_/.test(String(spec.archetype || ""))) {
var K = bkpKept();
if (!K.some(function (k) { return k.id === spec.id; }))
K.push({ id: spec.id, a: spec.archetype, name: spec.label || (ARMS[spec.archetype] || {}).name, from: bkpInDream() ? "a dream" : null });
save();
}
}
catch (e) { }
if (BKP.open)
setTimeout(bkpPaint, 60);
return r;
};
dropCarried = function (quiet) {
if (carrying && carrying.fromBag) {
bkpStow(true);
if (!quiet)
setStatus("Back in your backpack.");
if (BKP.open)
setTimeout(bkpPaint, 60);
return;
}
try {
if (carrying && !quiet) {
var id = carrying.id, K = bkpKept(), j = K.findIndex(function (k) { return k.id === id; });
if (j > -1)
K.splice(j, 1);
}
}
catch (e) { }
var r = dc.apply(this, arguments);
if (BKP.open)
setTimeout(bkpPaint, 60);
return r;
};
function unstick() { try {
(store.objects || []).forEach(function (o) { if (o.carried && o !== carrying)
o.carried = false; });
}
catch (e) { } }
setTimeout(unstick, 1500);
if (typeof beHere === "function") {
var bh = beHere;
beHere = function () { var r = bh.apply(this, arguments); unstick(); return r; };
}
})();
function bkpPaint() { return __ZC(254, 11, this, arguments, new.target); }
var BKP_TABS = [["things", "🧰 Things"], ["clothes", "👕 Clothes"], ["materials", "🧺 Materials"], ["special", "💎 Special finds"], ["money", "🪙 Money"], ["papers", "📜 Papers"], ["all", "All"]];
function bkpTabOf(title) { return __ZC(254, 12, this, arguments, new.target); }
function bkpTabHead(n) { return __ZC(254, 13, this, arguments, new.target); }
function bkpTabs(body) { return __ZC(254, 14, this, arguments, new.target); }
document.addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-bktab]") : null;
if (!t)
return;
e.stopPropagation();
BKP.tab = t.getAttribute("data-bktab");
try {
localStorage.setItem("somnu.bkp.tab", BKP.tab);
}
catch (x) { }
var el = document.getElementById("bkp-box"), y = el ? el.scrollTop : 0;
bkpPaint();
if (el)
el.scrollTop = Math.min(y, el.scrollTop);
}, true);
(function () {
var bh = bkpHtml;
bkpHtml = function () {
var h = bh.apply(this, arguments);
try {
if (typeof signedIn === "function" && signedIn() || typeof festLocal !== "function")
return h;
var L = festLocal() || {}, m = (L.masks || []).length;
if (L.tickets || m)
h += bkpHead("Money") + (L.tickets ? bkpRow("🎟️ Extravaganza tickets", (+L.tickets).toLocaleString() + " " + bkpDim("(on this device; sign in to win real prizes)")) : "") +
(m ? bkpRow("🎭 Golden masks found", m + " " + bkpDim("(on this device)")) : "");
}
catch (e) { }
return h;
};
})();
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 700);
if (document.getElementById("me-pack"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-pack";
b.title = "Your backpack: everything you hold (I)";
b.textContent = "🎒 Backpack";
b.onclick = function () { BKP.open ? bkpClose() : bkpOpen(); };
var w = document.getElementById("me-dress");
if (w && w.nextSibling)
bar.insertBefore(b, w.nextSibling);
else
bar.appendChild(b);
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
addEventListener("keydown", function (e) {
if (e.code !== "KeyI" || e.repeat || !(typeof walkMode !== "undefined" && walkMode))
return;
if (/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
if (typeof WLD !== "undefined" && WLD && WLD.on)
return;
BKP.open ? bkpClose() : bkpOpen();
});
})();
