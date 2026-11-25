/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var EQ = { open: false, el: null, pick: null, before: null, said: {} };
var EQ_BAR_MAX = 6, EQ_POT_MAX = 2;
function eqEsc(s) { return typeof esc === "function" ? esc(s) : String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
function eqSay(h) { if (typeof setStatus === "function")
try {
setStatus(h);
}
catch (e) { } }
function eqWarn(k, e) { if (!EQ.said[k]) {
EQ.said[k] = 1;
if (window.console)
console.warn("[equip] " + k, e);
} }
function eqTouch() { try {
return typeof cbtTouch === "function" ? cbtTouch() : (typeof matchMedia === "function" && matchMedia("(pointer:coarse)").matches);
}
catch (e) {
return false;
} }
function eqData() {
var d = typeof store !== "undefined" && store ? store : {};
if (!d.eq || typeof d.eq !== "object")
d.eq = {};
var E = d.eq;
if (!Array.isArray(E.acc))
E.acc = [null, null];
if (!Array.isArray(E.pot))
E.pot = [null, null];
return E;
}
function eqSave() { try {
if (typeof save === "function")
save();
}
catch (e) { } }
function eqLook() { try {
return typeof meLook === "function" ? meLook() : {};
}
catch (e) {
return {};
} }
function eqLookSet(lk, v) { return __ZC(501, 0, this, arguments, new.target); }
function eqWear(k) { return (typeof WEAR !== "undefined" && WEAR[k]) || (typeof WORN !== "undefined" && WORN[k]) || null; }
function eqOwns(k) { try {
return typeof wearOwned === "function" ? wearOwned(k) : !(eqWear(k) || {}).price;
}
catch (e) {
return false;
} }
function eqWearOf(slot) {
var out = [];
if (typeof WEAR !== "undefined")
Object.keys(WEAR).forEach(function (k) { if (WEAR[k].slot === slot && eqOwns(k))
out.push(k); });
if (typeof WORN !== "undefined")
Object.keys(WORN).forEach(function (k) { if (WORN[k].slot === slot && out.indexOf(k) < 0 && eqOwns(k))
out.push(k); });
return out;
}
function eqLookKey(slot) { return (typeof BKP_LOOKKEY !== "undefined" && BKP_LOOKKEY[slot]) || slot; }
function eqLabel(k) { var w = eqWear(k); return w ? w.label : String(k || ""); }
var EQ_RELIC_AT = { crown: "head", plate: "top", boots: "feet", mantle: "acc" };
function eqRelicSlot(key) { try {
if (typeof elSlot === "function")
return elSlot(key);
}
catch (e) { } return { frostplate: "plate", polecrown: "crown", auroramantle: "mantle", longsnowboots: "boots" }[key] || null; }
function eqRelicsFor(where) {
if (typeof RELICS === "undefined" || typeof rlOwned !== "function")
return [];
return RELICS.filter(function (R) { if (R.kind === "weapon")
return false; var s = eqRelicSlot(R.key); if (EQ_RELIC_AT[s] !== where)
return false; try {
return rlOwned(R.key);
}
catch (e) {
return false;
} });
}
function eqRelicWorn(where) { try {
return eqRelicsFor(where).filter(function (R) { return typeof RL !== "undefined" && RL.worn && RL.worn[R.key]; });
}
catch (e) {
return [];
} }
function eqRelicName(R) { return String(R.name).split(",")[0]; }
var EQ_BODY = {
head: { n: "Head", i: "🎩", slot: "hat", none: "none", bare: 1 },
top: { n: "Top", i: "👕" },
hands: { n: "Gloves", i: "🧤", slot: "hands", none: null, bare: 1 },
legs: { n: "Bottom", i: "👖", slot: "legs", none: "trousers" },
feet: { n: "Feet", i: "👞", slot: "feet", none: "shoes" }
};
var EQ_TOPKIND = { shirt: "Shirt", coat: "Coat", dress: "Dress", robe: "Robe" };
function eqBodyNow(k) { return __ZC(501, 1, this, arguments, new.target); }
function eqBodyChoices(k) { return __ZC(501, 2, this, arguments, new.target); }
function eqBodyDo(k, id) { return __ZC(501, 3, this, arguments, new.target); }
function eqHeldName() {
if (typeof carrying === "undefined" || !carrying)
return null;
try {
return carrying.label || (typeof carriedName === "function" ? carriedName() : "") || "Something";
}
catch (e) {
return "Something";
}
}
function eqArmName(a) { return (typeof ARMS !== "undefined" && ARMS[a] && ARMS[a].name) || String(a).replace(/^bw_/, ""); }
function eqWeapons() { return __ZC(501, 4, this, arguments, new.target); }
function eqTwoHanded() { return __ZC(501, 5, this, arguments, new.target); }
function eqRightDo(id) { return __ZC(501, 6, this, arguments, new.target); }
function eqShields() {
if (typeof IFG_SHIELDS === "undefined" || typeof ifgOwns !== "function")
return [];
return Object.keys(IFG_SHIELDS).filter(function (k) { try {
return ifgOwns("s_" + k);
}
catch (e) {
return false;
} });
}
function eqShieldKey() { try {
var d = typeof bwData === "function" ? bwData() : null;
return d && d.sh && typeof IFG_SHIELDS !== "undefined" && IFG_SHIELDS[d.sh] ? d.sh : "";
}
catch (e) {
return "";
} }
function eqShieldNow() { var k = eqShieldKey(); if (!k || eqTwoHanded())
return null; try {
if (!ifgOwns("s_" + k))
return null;
}
catch (e) {
return null;
} return IFG_SHIELDS[k]; }
function eqLeftDo(id) { return __ZC(501, 7, this, arguments, new.target); }
(function () {
if (typeof cbtToughness !== "function")
return;
var ct = cbtToughness;
cbtToughness = function () {
var t = ct.apply(this, arguments);
try {
if (typeof WLD !== "undefined" && WLD.on === "battle")
return t;
var S = eqShieldNow();
if (S)
t = Math.min(0.85, 1 - (1 - t) * (1 - S.front * 0.6));
}
catch (e) { }
return t;
};
})();
function eqArtifacts() { return __ZC(501, 8, this, arguments, new.target); }
function eqArtifactNow() { try {
if (typeof RAP !== "undefined" && RAP.wield && RA.list[RAP.wield])
return RA.list[RAP.wield];
}
catch (e) { } return null; }
function eqArtifactDo(id) {
if (typeof raWield !== "function")
return;
var v = id.slice(id.indexOf(":") + 1), cur = typeof RAP !== "undefined" ? RAP.wield : null;
if (!v) {
if (cur)
raWield(cur);
return;
}
raWield(v);
}
var EQ_ACC_SLOTS = [["back", "On your back"], ["face", "Face"], ["neck", "Neck"], ["ears", "Ears"], ["waist", "Waist"], ["wings", "Wings"], ["horns", "Horns"], ["tail", "Tail"]];
function eqAccSlotOf(k) { var w = eqWear(k); return w ? w.slot : null; }
function eqAccWorn(k) {
if (/^rl:/.test(k)) {
var r = k.slice(3);
return !!(typeof RL !== "undefined" && RL.worn && RL.worn[r]);
}
var s = eqAccSlotOf(k);
if (!s)
return false;
return eqLook()[eqLookKey(s)] === k;
}
function eqAccAll() {
var out = [];
EQ_ACC_SLOTS.forEach(function (S) { eqWearOf(S[0]).forEach(function (k) { out.push({ id: k, g: S[1], n: eqLabel(k) }); }); });
eqRelicsFor("acc").forEach(function (R) { out.push({ id: "rl:" + R.key, g: "Relic", n: eqRelicName(R), d: String(R.does || "").replace(/^Worn: /, "") }); });
return out;
}
function eqAccName(k) { if (/^rl:/.test(k)) {
var R = typeof RL_BY !== "undefined" && RL_BY[k.slice(3)];
return R ? eqRelicName(R) : k;
} return eqLabel(k); }
function eqAccNow() { return __ZC(501, 9, this, arguments, new.target); }
function eqAccOff(k) {
if (!k)
return;
if (/^rl:/.test(k)) {
if (typeof rlWear === "function" && eqAccWorn(k))
rlWear(k.slice(3), false);
return;
}
var s = eqAccSlotOf(k);
if (s && eqAccWorn(k))
eqLookSet(eqLookKey(s), null);
}
function eqAccOn(k) {
if (/^rl:/.test(k)) {
if (typeof rlWear === "function" && !eqAccWorn(k))
rlWear(k.slice(3), true);
return;
}
var s = eqAccSlotOf(k);
if (s)
eqLookSet(eqLookKey(s), k);
}
function eqAccDo(slot, id) { return __ZC(501, 10, this, arguments, new.target); }
function eqHas(n) { try {
return typeof pwHas === "function" && pwHas(n);
}
catch (e) {
return false;
} }
function eqPowersHad() { return (typeof PW_USE !== "undefined" ? EQ_PW_ALL || PW_USE : []).filter(function (u) { return !/^eqpot:/.test(u.n) && eqHas(u.n); }); }
var EQ_PW_ALL = null;
function eqBarNow() {
var E = eqData(), had = eqPowersHad(), names = had.map(function (u) { return u.n; });
if (Array.isArray(E.bar)) {
var out = [];
for (var i = 0; i < EQ_BAR_MAX; i++) {
var n = E.bar[i];
out.push(n && names.indexOf(n) >= 0 && out.indexOf(n) < 0 ? n : null);
}
return out;
}
var a = names.slice(0, EQ_BAR_MAX);
while (a.length < EQ_BAR_MAX)
a.push(null);
return a;
}
function eqPw(n) { var L = EQ_PW_ALL || (typeof PW_USE !== "undefined" ? PW_USE : []); for (var i = 0; i < L.length; i++)
if (L[i].n === n)
return L[i]; return null; }
function eqPwAbout(n) { try {
if (typeof SPB_BY !== "undefined" && SPB_BY[n])
return SPB_BY[n].n + ": " + (SPB_BY[n].use || "");
}
catch (e) { } if (n === "spellbook")
return "Opens your spellbook."; return "Your power of " + n + "."; }
function eqSlotPut(cur, slot, v) {
if (!v || cur[slot] === v) {
cur[slot] = null;
return cur;
}
var j = cur.indexOf(v);
if (j >= 0)
cur[j] = cur[slot];
cur[slot] = v;
return cur;
}
function eqBarDo(slot, id) {
var E = eqData(), v = id.slice(id.indexOf(":") + 1) || null;
E.bar = eqSlotPut(eqBarNow().slice(), slot, v);
eqSave();
eqBarRefresh();
}
function eqPotions() {
try {
if (typeof spbStore !== "function" || typeof SPB_POTIONS === "undefined")
return [];
var S = spbStore();
return Object.keys(SPB_POTIONS).map(function (k) { var P = SPB_POTIONS[k]; return { k: k, n: P.name, i: P.icon, col: P.col, d: P.does, have: +((S.pot || {})[k] || 0) }; });
}
catch (e) {
return [];
}
}
function eqPotNow() { var E = eqData(), out = []; for (var i = 0; i < EQ_POT_MAX; i++) {
var k = E.pot[i];
out.push(k && typeof SPB_POTIONS !== "undefined" && SPB_POTIONS[k] ? k : null);
} return out; }
function eqPotDo(slot, id) {
var E = eqData(), v = id.slice(id.indexOf(":") + 1) || null;
E.pot = eqSlotPut(eqPotNow().slice(), slot, v);
eqSave();
eqBarRefresh();
}
function eqBarRefresh() { try {
if (typeof pwBarSig !== "undefined") {
pwBarSig = "";
pwBarAt = 0;
}
}
catch (e) { } }
(function () {
if (typeof pwBarTick !== "function" || typeof PW_USE === "undefined")
return;
if (typeof pwHas === "function") {
var ph = pwHas;
pwHas = function (n) { if (/^eqpot:/.test(String(n))) {
var k = String(n).split(":")[1];
return eqPotNow().indexOf(k) >= 0;
} return ph.apply(this, arguments); };
}
if (typeof pwUse === "function") {
var pu = pwUse;
pwUse = function (n) {
if (/^eqpot:/.test(String(n))) {
var k = String(n).split(":")[1];
if (typeof spbDrink === "function") {
var P = SPB_POTIONS[k];
if (!spbDrink(k) && !((spbStore().pot || {})[k] > 0))
eqSay("<b>No " + eqEsc(P ? P.name : "potion") + " left.</b> Brew more at an Academy cauldron (herbs grow in its glasshouses and Duskwell's Glowcap Garden).");
}
eqBarRefresh();
return;
}
return pu.apply(this, arguments);
};
}
var bt = pwBarTick;
pwBarTick = function (dt) {
var all = PW_USE, mine = null;
try {
EQ_PW_ALL = all;
mine = [];
eqBarNow().forEach(function (n) { var u = n && eqPw(n); if (u)
mine.push(u); });
var S = typeof spbStore === "function" ? spbStore() : { pot: {} };
eqPotNow().forEach(function (k) {
if (!k)
return;
var P = SPB_POTIONS[k], n = +((S.pot || {})[k] || 0);
mine.push({ n: "eqpot:" + k + ":" + n, i: "<span style='color:" + P.col + "'>" + P.icon + "</span>", t: "×" + n, pot: 1 });
});
}
catch (e) {
eqWarn("bar", e);
mine = null;
}
if (mine)
PW_USE = mine;
var r;
try {
r = bt.apply(this, arguments);
}
finally {
PW_USE = all;
}
try {
eqBarMore();
}
catch (e) { }
return r;
};
})();
function eqBarMore() {
var b = document.getElementById("pw-bar");
if (!b || b.style.display === "none")
return;
Array.prototype.forEach.call(b.querySelectorAll("[data-pw^='eqpot:']"), function (x) { if (x.dataset.eqp)
return; x.dataset.eqp = 1; x.title = "Drink: " + (SPB_POTIONS[x.getAttribute("data-pw").split(":")[1]] || {}).name; });
if (b.querySelector("[data-eqmore]"))
return;
var m = document.createElement("button");
m.setAttribute("data-eqmore", "1");
m.title = "Equipment: choose what is on this bar (O)";
m.style.cssText = "min-width:40px;height:44px;padding:2px 9px;border-radius:22px;border:1px solid rgba(232,194,122,.5);background:rgba(9,11,16,.72);color:#E8C27A;font:600 16px inherit;cursor:pointer";
m.textContent = "⋯";
m.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); eqOpen("spells"); });
b.appendChild(m);
}
function eqTile(id, label, icon, lines, empty, cls) { return __ZC(501, 11, this, arguments, new.target); }
function eqFigureSvg() { return __ZC(501, 12, this, arguments, new.target); }
function eqHtml() { return __ZC(501, 13, this, arguments, new.target); }
function eqPickHtml() { return __ZC(501, 14, this, arguments, new.target); }
var EQ_CSS = "#eq-box{position:fixed;z-index:53;right:12px;top:58px;width:min(470px,calc(100vw - 24px));max-height:calc(100vh - 76px);overflow-y:auto;-webkit-overflow-scrolling:touch;" +
"background:linear-gradient(180deg,rgba(18,15,24,.97),rgba(9,8,12,.98));border:1px solid #8A7A4A;border-radius:8px;padding:12px 14px 16px;color:var(--bone,#C9BEA8);font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);display:none}" +
"#eq-box .eq-hd{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap}#eq-box .eq-hd b{font:500 17px var(--serif,Georgia);color:#F0E0B8}" +
"#eq-box .eq-sub{font-size:12px;opacity:.75;margin:4px 0 8px}" +
"#eq-box .eq-doll{display:grid;grid-template-columns:1fr 74px 1fr;gap:6px;align-items:stretch}#eq-box .eq-col{display:flex;flex-direction:column;gap:6px}" +
"#eq-box .eq-mid{display:flex;align-items:center;justify-content:center}#eq-box .eq-fig{width:70px;height:auto;opacity:.95}" +
"#eq-box .eq-t{display:flex;flex-direction:column;align-items:flex-start;text-align:left;gap:2px;min-height:52px;padding:6px 8px;border-radius:8px;border:1px solid rgba(201,168,104,.35);background:rgba(255,255,255,.035);color:inherit;font:inherit;cursor:pointer;width:100%}" +
"#eq-box .eq-t:hover{border-color:#C9A868}#eq-box .eq-t.on{border-color:#E8C27A;background:rgba(232,194,122,.14);box-shadow:0 0 0 1px rgba(232,194,122,.4)}" +
"#eq-box .eq-l{font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:#C9A868}#eq-box .eq-v{font-size:12.5px;color:#F2E8DA;line-height:1.3}" +
"#eq-box .eq-i{margin-right:4px}#eq-box .eq-e{opacity:.5;font-style:italic}" +
"#eq-box .eq-sec{margin:14px 0 6px;font:500 14px var(--serif,Georgia);color:#F0E0B8;display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:baseline}" +
"#eq-box .eq-k{font:11.5px var(--sans,system-ui);opacity:.6}" +
"#eq-box .eq-row{display:grid;grid-template-columns:repeat(auto-fill,minmax(68px,1fr));gap:6px}#eq-box .eq-t.sm{min-height:48px}#eq-box .eq-t.wide{grid-column:span 2}" +
"#eq-box .eq-note{font-size:12px;opacity:.65;margin-top:4px}" +
"#eq-box .eq-pick{margin-top:8px;border:1px solid #C9A868;border-radius:8px;padding:8px;background:rgba(201,168,104,.06)}" +
"#eq-box .eq-ph{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;color:#F0E0B8}" +
"#eq-box .eq-pg{font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:#C9A868;margin:8px 0 3px}" +
"#eq-box .eq-o{display:block;width:100%;text-align:left;padding:8px 10px;margin:3px 0;border-radius:6px;border:1px solid rgba(255,255,255,.12);background:rgba(9,11,16,.6);color:#F2E8DA;font:inherit;cursor:pointer;min-height:40px}" +
"#eq-box .eq-o.on{border-color:#E8C27A;background:rgba(232,194,122,.16)}#eq-box .eq-o:disabled{opacity:.6;cursor:default}" +
"#eq-box .eq-o small{display:block;opacity:.65;font-size:11.5px;margin-top:2px}#eq-box .eq-o i{opacity:.6;font-size:11.5px}" +
"@media (max-width:560px){#eq-box{left:8px;right:8px;top:calc(8px + env(safe-area-inset-top,0px));width:auto;max-height:calc(100vh - 16px)}#eq-box .eq-doll{grid-template-columns:1fr 52px 1fr}#eq-box .eq-fig{width:50px}}" +
"@media (max-height:480px){#eq-box{top:6px;max-height:calc(100vh - 12px)}}";
function eqBox() { return __ZC(501, 15, this, arguments, new.target); }
function eqChoose(pick, o) { return __ZC(501, 16, this, arguments, new.target); }
function eqPaint() { var el = eqBox(), y = el.scrollTop; el.innerHTML = eqHtml(); el.scrollTop = y; }
function eqOpen(at) { return __ZC(501, 17, this, arguments, new.target); }
function eqClose() {
if (!EQ.open)
return;
EQ.open = false;
EQ.pick = null;
if (EQ.el)
EQ.el.style.display = "none";
try {
if (EQ.before && typeof setView === "function" && meView === "mirror")
setView(EQ.before);
}
catch (e) { }
EQ.before = null;
}
function eqToggle() { if (EQ.open)
eqClose();
else
eqOpen(); }
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return !!EQ.open; }, close: eqClose });
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (e.code !== "KeyO" || e.repeat || e.ctrlKey || e.metaKey || e.altKey)
return;
if (/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || "") || (e.target && e.target.isContentEditable))
return;
if (!(typeof walkMode !== "undefined" && walkMode))
return;
if (typeof rowNear !== "undefined" && rowNear)
return;
if (typeof talkOpen !== "undefined" && talkOpen)
return;
e.preventDefault();
eqToggle();
});
(function () {
if (typeof PS_SECTIONS !== "undefined") {
var Y = PS_SECTIONS.filter(function (s) { return s.k === "you"; })[0];
if (Y && Y.ids.indexOf("me-equip") < 0) {
var i = Y.ids.indexOf("me-pack");
Y.ids.splice(i < 0 ? 0 : i + 1, 0, "me-equip");
}
}
if (typeof PS_ICON !== "undefined")
PS_ICON["me-equip"] = "🧍";
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 800);
if (document.getElementById("me-equip"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-equip";
b.title = "Equipment: what you wear and hold, your artifact, spells and potions (O)";
b.textContent = "🧍 Equipment";
b.onclick = function () { eqToggle(); };
var pk = document.getElementById("me-pack");
if (pk && pk.parentNode === bar && pk.nextSibling)
bar.insertBefore(b, pk.nextSibling);
else
bar.appendChild(b);
}
if (typeof document !== "undefined") {
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
}
})();
(function () {
if (typeof bkpPaint !== "function")
return;
var bp = bkpPaint;
bkpPaint = function () {
var r = bp.apply(this, arguments);
try {
var el = document.getElementById("bkp-box");
if (el && el.style.display !== "none" && !el.querySelector("[data-eqgo]")) {
var w = el.querySelector("[data-bk='wardrobe']");
if (w) {
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-eqgo", "1");
b.textContent = "🧍 Equipment";
b.onclick = function (e) { e.stopPropagation(); if (typeof bkpClose === "function")
bkpClose(); eqOpen(); };
w.parentNode.insertBefore(b, w);
w.parentNode.insertBefore(document.createTextNode(" "), w);
}
}
}
catch (e) { }
return r;
};
})();
(function () {
var last = 0;
if (typeof setInterval === "function")
setInterval(function () { if (!EQ.open || EQ.pick)
return; var now = Date.now(); if (now - last < 1500)
return; last = now; try {
eqPaint();
}
catch (e) { } }, 1600);
})();
var EQK = { tried: false, t0: 0 };
function eqkHeldNow() { return __ZC(501, 18, this, arguments, new.target); }
function eqkSame(a, b) { return JSON.stringify(a || null) === JSON.stringify(b || null); }
function eqkTick() {
try {
if (typeof walkMode === "undefined" || !walkMode || typeof store === "undefined" || !store)
return;
var E = eqData();
if (!EQK.tried) {
if (!EQK.t0) {
EQK.t0 = Date.now();
return;
}
if (Date.now() - EQK.t0 < 2500)
return;
EQK.tried = true;
eqkTakeUp(E.held);
return;
}
var h = eqkHeldNow();
if (h === undefined)
return;
if (!eqkSame(h, E.held)) {
E.held = h;
eqSave();
}
}
catch (e) {
eqWarn("keep", e);
}
}
function eqkTakeUp(h) { return __ZC(501, 19, this, arguments, new.target); }
setInterval(eqkTick, 1500);
function eqSpb(n) { return typeof SPB_BY !== "undefined" && !!SPB_BY[n]; }
function eqHas(n) {
try {
if (eqSpb(n) && typeof spbOn === "function")
return spbOn(n);
return typeof pwHas === "function" && pwHas(n);
}
catch (e) {
return false;
}
}
function eqBarChosen() { var E = eqData(); return Array.isArray(E.bar) ? E : null; }
(function () {
if (typeof spbPinned === "function") {
var sp = spbPinned;
spbPinned = function (s) { try {
var E = eqBarChosen();
if (E)
return E.bar.indexOf(s) >= 0;
}
catch (e) { } return sp.apply(this, arguments); };
}
if (typeof spbPinToggle === "function") {
var st = spbPinToggle;
spbPinToggle = function (s) {
var E = eqBarChosen();
if (!E)
return st.apply(this, arguments);
var bar = E.bar.slice(0, EQ_BAR_MAX);
while (bar.length < EQ_BAR_MAX)
bar.push(null);
var i = bar.indexOf(s);
if (i >= 0)
bar[i] = null;
else {
var e = bar.indexOf(null);
if (e < 0) {
eqSay("<b>Your power bar is full.</b> Take one off first (⋯ at the bar's end).");
return;
}
bar[e] = s;
}
E.bar = bar;
eqSave();
eqBarRefresh();
};
}
})();
eqBarNow = function () {
var E = eqData(), names = eqPowersHad().map(function (u) { return u.n; });
if (Array.isArray(E.bar)) {
var out = [];
for (var i = 0; i < EQ_BAR_MAX; i++) {
var n = E.bar[i];
out.push(n && names.indexOf(n) >= 0 && out.indexOf(n) < 0 ? n : null);
}
return out;
}
var a = names.filter(function (n) { try {
return typeof pwHas === "function" && pwHas(n);
}
catch (e) {
return false;
} }).slice(0, EQ_BAR_MAX);
while (a.length < EQ_BAR_MAX)
a.push(null);
return a;
};
eqBarDo = function (slot, id) {
var E = eqData(), v = id.slice(id.indexOf(":") + 1) || null;
var cur = Array.isArray(E.bar) ? E.bar.slice(0, EQ_BAR_MAX) : eqBarNow().slice();
while (cur.length < EQ_BAR_MAX)
cur.push(null);
E.bar = eqSlotPut(cur, slot, v);
eqSave();
eqBarRefresh();
};
(function () {
if (typeof cbtMagicPut !== "function")
return;
cbtMagicPut = function (id, slot) {
slot = +slot;
if (!(slot >= 0 && slot < 4))
return;
if (id && (!CBT_MAGIC_BY[id] || !cbtMagicKnows(id)))
return;
var p = cbtP(), cur = p.slFix && Array.isArray(p.sl) ? p.sl.slice(0, 4) : cbtMagicChosen().slice();
while (cur.length < 4)
cur.push(null);
var j = id ? cur.indexOf(id) : -1;
if (j >= 0)
cur[j] = null;
cur[slot] = id || null;
p.sl = cur;
p.slFix = true;
if (typeof save === "function")
try {
save();
}
catch (e) { }
};
})();
