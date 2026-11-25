/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(501, function () {
"use strict";
return [
function (lk, v) {
var L = eqLook();
L[lk] = v;
L.src = L.src || {};
L.src[lk] = "chosen";
try {
var od = dreamer().offDuty;
if (od && od.look && lk in od.look)
od.look[lk] = v;
}
catch (e) { }
try {
if (typeof rebuildMe === "function")
rebuildMe();
}
catch (e) {
eqWarn("rebuild", e);
}
eqSave();
try {
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
},
function (k) {
var L = eqLook(), S = EQ_BODY[k], parts = [];
if (k === "top") {
parts.push(EQ_TOPKIND[L.topKind] || "Shirt");
if (L.layer && eqWear(L.layer))
parts.push(eqLabel(L.layer));
}
else {
var v = L[eqLookKey(S.slot)];
if (v && eqWear(v) && !(k === "head" && v === "none"))
parts.push(eqLabel(v));
else if (!v && S.none && eqWear(S.none))
parts.push(eqLabel(S.none));
}
var at = k === "head" ? "head" : k === "top" ? "top" : k === "feet" ? "feet" : null;
if (at)
eqRelicWorn(at).forEach(function (R) { parts.push("✦ " + eqRelicName(R)); });
return parts;
},
function (k) {
var L = eqLook(), S = EQ_BODY[k], out = [];
if (k === "top") {
Object.keys(EQ_TOPKIND).forEach(function (t) { out.push({ g: "Underneath", id: "tk:" + t, n: EQ_TOPKIND[t], on: (L.topKind || "shirt") === t }); });
out.push({ g: "Over it", id: "ly:", n: "Nothing over it", on: !L.layer });
eqWearOf("layer").forEach(function (w) { out.push({ g: "Over it", id: "ly:" + w, n: eqLabel(w), on: L.layer === w }); });
}
else {
var lk = eqLookKey(S.slot), cur = L[lk];
if (S.bare)
out.push({ g: "", id: "w:", n: "Nothing", on: !cur || cur === "none" });
eqWearOf(S.slot).forEach(function (w) { out.push({ g: "", id: "w:" + w, n: eqLabel(w), on: cur === w || (!cur && w === S.none) }); });
}
var at = k === "head" ? "head" : k === "top" ? "top" : k === "feet" ? "feet" : null;
if (at)
eqRelicsFor(at).forEach(function (R) { out.push({ g: "Relic armour (worn over the rest)", id: "rl:" + R.key, n: eqRelicName(R), d: String(R.does || "").replace(/^Worn: /, ""), on: !!(RL.worn && RL.worn[R.key]) }); });
if (k === "hands" && out.length < 2)
out.push({ g: "", id: "", n: "No gloves yet: the Tailor's sells them", dis: 1 });
return out;
},
function (k, id) {
var S = EQ_BODY[k], p = id.indexOf(":"), how = id.slice(0, p), v = id.slice(p + 1);
if (how === "tk") {
eqLookSet("topKind", v);
eqSay("You change into a " + EQ_TOPKIND[v].toLowerCase() + ".");
}
else if (how === "ly") {
eqLookSet("layer", v || null);
eqSay(v ? "<b>You put on the " + eqEsc(eqLabel(v)) + ".</b>" : "You take off what was over your top.");
}
else if (how === "w") {
var lk = eqLookKey(S.slot);
eqLookSet(lk, v || S.none);
eqSay(v ? "<b>You put on the " + eqEsc(eqLabel(v)) + ".</b>" : "You take it off.");
}
else if (how === "rl" && typeof rlWear === "function") {
rlWear(v, !(RL.worn && RL.worn[v]));
}
},
function () {
var out = [], seen = {}, held = typeof carrying !== "undefined" && carrying ? carrying : null;
function add(o) { var key = String(o.n).toLowerCase(); if (seen[key])
return; seen[key] = 1; out.push(o); }
try {
(typeof bkpKept === "function" ? bkpKept() : []).forEach(function (k) {
if (typeof ARMS === "undefined" || !ARMS[k.a])
return;
add({ id: "k:" + k.id, n: k.name || eqArmName(k.a), a: k.a, from: k.from || "", on: !!held && (held.keptId === k.id || held.id === k.id || (held.archetype === k.a && /^bw_/.test(k.a))) });
});
}
catch (e) {
eqWarn("kept", e);
}
try {
if (typeof RELICS !== "undefined" && typeof rlOwned === "function")
RELICS.forEach(function (R) {
if (R.kind !== "weapon" || !rlOwned(R.key))
return;
add({ id: "rw:" + R.key, n: eqRelicName(R), a: "relic_" + R.key, from: "a relic", d: R.does, on: !!held && held.archetype === "relic_" + R.key });
});
}
catch (e) {
eqWarn("relics", e);
}
try {
((typeof myThings !== "undefined" && myThings) || []).forEach(function (t, i) {
if (/^relic_/.test(String(t.archetype || "")))
return;
if (typeof bkpWearKey === "function" && bkpWearKey(t))
return;
var a = typeof bkpArmOf === "function" ? bkpArmOf(t) : null;
if (!a)
return;
add({ id: "t:" + i, n: t.name, a: a, from: "yours", t: t, on: !!held && held.fromItem === t.name });
});
}
catch (e) {
eqWarn("things", e);
}
return out;
},
function () {
try {
var k = typeof bwHeldKey === "function" ? bwHeldKey() : null;
if (k && typeof ifgTwoHanded === "function" && typeof BW_ARMS !== "undefined")
return ifgTwoHanded(k, BW_ARMS[k]);
var c = typeof carrying !== "undefined" && carrying ? String(carrying.archetype || "") : "", A = typeof ARMS !== "undefined" && ARMS[c];
return !!A && /bow|staff|rifle|gun|spear|halberd|scythe|hammer/i.test(String(A.held || "")) && !/pistol|wand/i.test(String(A.held || ""));
}
catch (e) {
return false;
}
},
function (id) {
var p = id.indexOf(":"), how = id.slice(0, p), v = id.slice(p + 1), held = typeof carrying !== "undefined" && carrying;
if (how === "none") {
if (!held)
return;
if (held.relic && typeof dropCarried === "function")
dropCarried();
else if (typeof bkpStow === "function")
bkpStow();
return;
}
var W = eqWeapons().filter(function (o) { return o.id === id; })[0];
if (!W)
return;
if (W.on) {
eqRightDo("none:");
return;
}
if (how === "rw" && typeof rlTake === "function") {
if (held && typeof bkpStow === "function" && !held.relic)
bkpStow(true);
else if (held && held.relic && typeof dropCarried === "function")
dropCarried(true);
rlTake(v);
return;
}
if (how === "k") {
var k = bkpKept().filter(function (q) { return q.id === v; })[0];
if (!k)
return;
if (/^bw_/.test(k.a) && typeof bwEquip === "function")
bwEquip(k.a.slice(3));
else if (typeof bkpHold === "function")
bkpHold(k.a, k.name, { keptId: k.id });
eqSay("<b>" + eqEsc(W.n) + "</b> in your hand.");
return;
}
if (how === "t" && typeof bkpHold === "function") {
bkpHold(W.a, W.n, { fromItem: W.n });
eqSay("<b>" + eqEsc(W.n) + "</b> in your hand.");
}
},
function (id) {
var v = id.slice(id.indexOf(":") + 1), d = typeof bwData === "function" ? bwData() : null;
if (!d)
return;
d.sh = v && d.sh !== v ? v : "";
if (typeof bwSave === "function")
try {
bwSave(true);
}
catch (e) { }
eqSay(d.sh ? "<b>" + eqEsc(IFG_SHIELDS[d.sh].name) + "</b> on your arm." + (eqTwoHanded() ? " (Your weapon needs both hands: it waits on your back.)" : "") : "Your shield goes back in your pack.");
},
function () {
if (typeof RA === "undefined")
return [];
return (RA.mine || []).filter(function (r) { return RA.list && RA.list[r.k]; }).map(function (r) {
var d = RA.list[r.k], P = typeof RA_POW !== "undefined" && RA_POW[r.k];
return { id: "ra:" + r.k, k: r.k, n: d.name, i: d.icon || "✨", d: P ? P.pasT + " " + P.n + ": " + P.actT : "", on: typeof RAP !== "undefined" && RAP.wield === r.k };
});
},
function () {
var E = eqData(), cur = E.acc.map(function (k) { return k && eqAccWorn(k) ? k : null; });
if (!E.accSet) {
var worn = eqAccAll().map(function (o) { return o.id; }).filter(eqAccWorn);
for (var i = 0; i < 2; i++)
if (!cur[i]) {
var n = worn.filter(function (k) { return cur.indexOf(k) < 0; })[0];
if (n)
cur[i] = n;
}
}
return cur;
},
function (slot, id) {
var E = eqData(), now = eqAccNow(), old = now[slot], v = id.slice(id.indexOf(":") + 1) || null;
E.acc = now.slice();
E.accSet = 1;
if (v && v === old) {
eqAccOff(old);
E.acc[slot] = null;
eqSay("You take off the " + eqEsc(eqAccName(old)) + ".");
eqSave();
return;
}
if (old)
eqAccOff(old);
if (v) {
var other = E.acc[1 - slot];
if (other === v || (other && !/^rl:/.test(v) && !/^rl:/.test(other) && eqAccSlotOf(other) === eqAccSlotOf(v)))
E.acc[1 - slot] = null;
eqAccOn(v);
eqSay("<b>You put on the " + eqEsc(eqAccName(v)) + ".</b>");
}
E.acc[slot] = v;
eqSave();
},
function (id, label, icon, lines, empty, cls) {
var on = EQ.pick === id;
return "<button class='eq-t" + (on ? " on" : "") + (cls ? " " + cls : "") + "' data-eq='" + id + "'><span class='eq-l'>" + label + "</span><span class='eq-v'>" + (lines && lines.length ?
"<span class='eq-i'>" + icon + "</span>" + lines.map(eqEsc).join("<br>") : "<span class='eq-e'>" + (empty || "Empty") + "</span>") + "</span></button>";
},
function () {
return "<svg class='eq-fig' viewBox='0 0 100 230' aria-hidden='true'><g fill='rgba(232,194,122,.13)' stroke='rgba(232,194,122,.55)' stroke-width='1.4'>" +
"<circle cx='50' cy='24' r='15'/><path d='M30 46 Q50 40 70 46 L76 112 L64 112 L62 70 L60 118 L40 118 L38 70 L36 112 L24 112 Z'/>" +
"<path d='M40 120 L60 120 L62 200 L53 200 L50 140 L47 200 L38 200 Z'/><ellipse cx='42' cy='206' rx='8' ry='4'/><ellipse cx='58' cy='206' rx='8' ry='4'/></g></svg>";
},
function () {
var L = eqLook(), h = "";
h += "<div class='eq-hd'><b>🧍 Equipment</b><span><button class='btn' data-eqx='pack'>🎒 Backpack</button> <button class='btn' data-eqx='ward'>👗 Wardrobe</button> <button class='btn' data-eqx='x'>Close</button></span></div>";
h += "<div class='eq-sub'>What you have on, and in your hands. Tap a place to change it" + (eqTouch() ? "" : " (O opens and closes this page)") + ".</div>";
var held = eqHeldName(), sh = eqShieldKey(), two = eqTwoHanded(), art = eqArtifactNow(), acc = eqAccNow();
var left = "", right = "";
left += eqTile("b:head", "Head", "🎩", eqBodyNow("head"), "Bare");
left += eqTile("b:top", "Top", "👕", eqBodyNow("top"));
left += eqTile("b:hands", "Gloves", "🧤", eqBodyNow("hands"), "None");
left += eqTile("b:legs", "Bottom", "👖", eqBodyNow("legs"));
left += eqTile("b:feet", "Feet", "👞", eqBodyNow("feet"));
right += eqTile("h:right", "Right hand", "⚔️", held ? [held] : null, "Bare hand");
right += eqTile("h:left", "Left hand", "🛡️", sh ? [IFG_SHIELDS[sh].name + (two ? " (on your back: two hands on your weapon)" : "")] : null, "Free");
right += eqTile("a:art", "Artifact", "✨", art ? [art.name] : null, "None wielded");
right += eqTile("c:0", "Accessory 1", "💍", acc[0] ? [eqAccName(acc[0])] : null, "None");
right += eqTile("c:1", "Accessory 2", "💍", acc[1] ? [eqAccName(acc[1])] : null, "None");
h += "<div class='eq-doll'><div class='eq-col'>" + left + "</div><div class='eq-mid'>" + eqFigureSvg() + "</div><div class='eq-col'>" + right + "</div></div>";
if (EQ.pick && /^[bhac]:/.test(EQ.pick))
h += eqPickHtml();
h += "<div class='eq-sec' id='eq-spells'>✨ Spells on your power bar <span class='eq-k'>" + (eqTouch() ? "tap them on the bar" : "keys 1 to 6 (5 to 0 in a fight)") + "</span></div><div class='eq-row'>";
var bar = eqBarNow(), had = eqPowersHad();
bar.forEach(function (n, i) { var u = n && eqPw(n); h += eqTile("s:" + i, String(i + 1), u ? u.i : "", u ? [u.t] : null, had.length ? "Empty" : "—", "sm"); });
h += "</div>";
if (!had.length)
h += "<div class='eq-note'>No powers or spells yet. Dream powers come as you dream; spells are learned at the Somnucor Academy.</div>";
else if (had.length > EQ_BAR_MAX)
h += "<div class='eq-note'>You know " + had.length + ": the bar holds six. The rest wait here.</div>";
if (EQ.pick && /^s:/.test(EQ.pick))
h += eqPickHtml();
if (typeof cbtMagicChosen === "function" && typeof CBT_MAGIC_BY !== "undefined") {
var mk = typeof cbtMagicKnown === "function" ? cbtMagicKnown() : [], ch = cbtMagicChosen();
h += "<div class='eq-sec'>🔥 Battle spells <span class='eq-k'>" + (eqTouch() ? "✨ on the fighting buttons" : "Shift + 1 to 4 in a fight") + "</span></div><div class='eq-row'>";
ch.forEach(function (id, i) { var M = id && CBT_MAGIC_BY[id]; h += eqTile("m:" + i, (eqTouch() ? "" : "⇧") + (i + 1), M ? M.i : "", M ? [M.n] : null, mk.length ? "Empty" : "—", "sm"); });
h += "</div>";
if (!mk.length)
h += "<div class='eq-note'>None learned yet: battle spells come from tomes, dropped by foes and found glowing where there is danger.</div>";
if (EQ.pick && /^m:/.test(EQ.pick))
h += eqPickHtml();
}
var pots = eqPotions(), pn = eqPotNow();
h += "<div class='eq-sec'>🧪 Potions on your bar <span class='eq-k'>a tap drinks one</span></div><div class='eq-row'>";
pn.forEach(function (k, i) { var P = k && pots.filter(function (p) { return p.k === k; })[0]; h += eqTile("p:" + i, "Potion " + (i + 1), P ? "<span style='color:" + P.col + "'>" + eqEsc(P.i) + "</span>" : "", P ? [P.n + " ×" + P.have] : null, "Empty", "sm wide"); });
h += "</div>";
if (!pots.some(function (p) { return p.have > 0; }))
h += "<div class='eq-note'>No potions yet: brew them at an Academy cauldron from herbs you gather.</div>";
if (EQ.pick && /^p:/.test(EQ.pick))
h += eqPickHtml();
return h;
},
function () {
var p = EQ.pick, k = p.slice(p.indexOf(":") + 1), kind = p.charAt(0), opts = [], title = "";
if (kind === "b") {
title = EQ_BODY[k].n;
opts = eqBodyChoices(k);
}
else if (kind === "h" && k === "right") {
title = "Right hand";
opts = [{ id: "none:", n: "Bare hand", on: !eqHeldName() }].concat(eqWeapons().map(function (W) { return { id: W.id, n: W.n, d: W.d || (W.from ? "from " + W.from : ""), on: W.on }; }));
if (opts.length === 1)
opts.push({ id: "", n: "No weapons yet: win them, find them, or buy them at Ironfray's Armoury", dis: 1 });
}
else if (kind === "h") {
title = "Left hand";
var cur = eqShieldKey();
opts = [{ id: "sh:", n: "Free", on: !cur }].concat(eqShields().map(function (s) { var S = IFG_SHIELDS[s]; return { id: "sh:" + s, n: S.name, d: S.about + " Turns " + Math.round(S.front * 100) + "% of a blow from in front in Ironfray, and some of every blow in any fight.", on: cur === s }; }));
if (opts.length === 1)
opts.push({ id: "", n: "No shields yet: Ironfray's Armoury sells them", dis: 1 });
else if (eqTwoHanded())
opts.push({ id: "", n: "The weapon in your right hand needs both: a shield waits on your back until you take up a one-handed one", dis: 1 });
}
else if (kind === "a") {
title = "Artifact (one at a time)";
var A = eqArtifacts();
opts = [{ id: "ra:", n: "None", on: !eqArtifactNow() }].concat(A.map(function (o) { return { id: o.id, n: o.i + " " + o.n, d: o.d, on: o.on }; }));
if (!A.length)
opts.push({ id: "", n: (typeof RA !== "undefined" && RA.mineAt < 0 ? "Looking…" : "No artifacts yet: the rarest things in every world lie hidden, one to a world"), dis: 1 });
}
else if (kind === "c") {
title = "Accessory " + (+k + 1);
var now = eqAccNow(), all = eqAccAll();
opts = [{ id: "c:", n: "None", on: !now[+k] }].concat(all.map(function (o) { return { g: o.g, id: "c:" + o.id, n: o.n, d: o.d, on: now[+k] === o.id, other: now[1 - k] === o.id }; }));
if (!all.length)
opts.push({ id: "", n: "No accessories yet: the Tailor's sells them", dis: 1 });
}
else if (kind === "s") {
title = "Power bar, place " + (+k + 1);
var bar = eqBarNow();
opts = [{ id: "s:", n: "Empty", on: !bar[+k] }].concat(eqPowersHad().map(function (u) { var at = bar.indexOf(u.n); return { id: "s:" + u.n, n: u.i + " " + u.t, d: eqPwAbout(u.n), on: at === +k, other: at >= 0 && at !== +k ? "on " + (at + 1) : "" }; }));
}
else if (kind === "m") {
title = "Battle spell " + (+k + 1);
var ch = cbtMagicChosen();
opts = [{ id: "m:", n: "Empty", on: !ch[+k] }].concat(cbtMagicKnown().filter(function (id) { return CBT_MAGIC_BY[id]; }).map(function (id) {
var M = CBT_MAGIC_BY[id], at = ch.indexOf(id);
return { id: "m:" + id, n: M.i + " " + M.n, d: M.d + " (" + M.mana + " mana)", on: at === +k, other: at >= 0 && at !== +k ? "on " + (at + 1) : "" };
}));
}
else if (kind === "p") {
title = "Potion " + (+k + 1);
var pn = eqPotNow();
opts = [{ id: "p:", n: "Empty", on: !pn[+k] }].concat(eqPotions().map(function (o) { return { id: "p:" + o.k, n: o.i + " " + o.n + " ×" + o.have, d: o.d + (o.have ? "" : " (none brewed yet)"), on: pn[+k] === o.k }; }));
}
var h = "<div class='eq-pick'><div class='eq-ph'><b>" + eqEsc(title) + "</b><button class='btn' data-eqx='unpick'>Done</button></div>", g = null;
opts.forEach(function (o) {
if (o.g != null && o.g !== g) {
g = o.g;
if (g)
h += "<div class='eq-pg'>" + eqEsc(g) + "</div>";
}
h += "<button class='eq-o" + (o.on ? " on" : "") + "'" + (o.dis ? " disabled" : " data-eqo='" + eqEsc(o.id) + "'") + "><span>" + (o.on ? "✓ " : "") + eqEsc(o.n) +
(o.other ? " <i>(" + (o.other === true ? "in the other slot" : eqEsc(o.other)) + ")</i>" : "") + "</span>" + (o.d ? "<small>" + eqEsc(o.d) + "</small>" : "") + "</button>";
});
return h + "</div>";
},
function () {
if (EQ.el)
return EQ.el;
var st = document.createElement("style");
st.textContent = EQ_CSS;
document.head.appendChild(st);
var el = EQ.el = document.createElement("div");
el.id = "eq-box";
el.setAttribute("role", "dialog");
el.setAttribute("aria-label", "Equipment");
el.addEventListener("keydown", function (e) { if (e.code === "KeyO" || e.code === "Escape") {
e.preventDefault();
eqClose();
} e.stopPropagation(); });
el.addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-eq],[data-eqo],[data-eqx]") : null;
if (!t)
return;
e.preventDefault();
e.stopPropagation();
var x = t.getAttribute("data-eqx");
if (x === "x")
return eqClose();
if (x === "pack") {
eqClose();
if (typeof bkpOpen === "function")
bkpOpen();
return;
}
if (x === "ward") {
eqClose();
if (typeof openWardrobe === "function")
openWardrobe();
return;
}
if (x === "unpick") {
EQ.pick = null;
return eqPaint();
}
var s = t.getAttribute("data-eq");
if (s != null) {
EQ.pick = EQ.pick === s ? null : s;
if (EQ.pick === "a:art" && typeof raMineLoad === "function" && typeof RA !== "undefined" && RA.mineAt < 0)
try {
RA.mineAt = 0;
raMineLoad().then(function () { if (EQ.open)
eqPaint(); });
}
catch (er) { }
eqPaint();
var p = el.querySelector(".eq-pick");
if (p && p.scrollIntoView)
try {
p.scrollIntoView({ block: "nearest" });
}
catch (er) { }
return;
}
var o = t.getAttribute("data-eqo");
if (o == null || !EQ.pick)
return;
try {
eqChoose(EQ.pick, o);
}
catch (er) {
eqWarn("choose", er);
}
setTimeout(function () { if (EQ.open)
eqPaint(); }, 60);
});
document.body.appendChild(el);
return el;
},
function (pick, o) {
var kind = pick.charAt(0), k = pick.slice(2);
if (typeof playTone === "function")
try {
playTone(560, 0.05);
}
catch (e) { }
if (kind === "b")
eqBodyDo(k, o);
else if (kind === "h" && k === "right")
eqRightDo(o);
else if (kind === "h")
eqLeftDo(o);
else if (kind === "a")
eqArtifactDo(o);
else if (kind === "c")
eqAccDo(+k, o);
else if (kind === "s")
eqBarDo(+k, o);
else if (kind === "m" && typeof cbtMagicPut === "function") {
var id = o.slice(2) || null, ch = cbtMagicChosen();
cbtMagicPut(ch[+k] === id ? null : id, +k);
}
else if (kind === "p")
eqPotDo(+k, o);
},
function (at) {
if (typeof document === "undefined" || !document.body)
return;
var el = eqBox();
EQ.open = true;
EQ.pick = null;
try {
if (typeof bkpClose === "function" && typeof BKP !== "undefined" && BKP.open)
bkpClose();
}
catch (e) { }
try {
if (typeof closeWardrobe === "function") {
var w = document.getElementById("me-ward");
if (w && w.style.display === "block")
closeWardrobe();
}
}
catch (e) { }
try {
if (typeof ifgOwnedLoad === "function")
ifgOwnedLoad();
}
catch (e) { }
try {
if (typeof raMineLoad === "function" && typeof RA !== "undefined" && typeof signedIn === "function" && signedIn())
raMineLoad().then(function () { if (EQ.open)
eqPaint(); }).catch(function () { });
}
catch (e) { }
try {
var fight = typeof CBT !== "undefined" && CBT.on && CBT.eng > 0;
if (!fight && typeof walkMode !== "undefined" && walkMode && typeof setView === "function" && typeof meView !== "undefined") {
if (meView !== "mirror") {
EQ.before = meView;
setView("mirror");
}
}
}
catch (e) { }
eqPaint();
el.style.display = "block";
try {
if (document.pointerLockElement && document.exitPointerLock)
document.exitPointerLock();
}
catch (e) { }
if (at === "spells") {
var s = document.getElementById("eq-spells");
if (s && s.scrollIntoView)
try {
s.scrollIntoView({ block: "start" });
}
catch (e) { }
}
},
function () {
var c = typeof carrying !== "undefined" ? carrying : null;
if (!c)
return null;
var a = String(c.archetype || "");
if (c.relic && /^relic_/.test(a))
return { rw: a.slice(6) };
if (!c.fromBag)
return undefined;
if (c.keptId)
return { k: c.keptId, a: a };
if (c.fromItem)
return { t: c.fromItem, a: a };
return undefined;
},
function (h) {
if (!h || (typeof carrying !== "undefined" && carrying))
return;
try {
if (h.rw) {
if (typeof rlTake === "function" && typeof rlOwned === "function" && rlOwned(h.rw))
rlTake(h.rw);
return;
}
var W = eqWeapons().filter(function (o) { return (h.k && o.id === "k:" + h.k) || (h.t && /^t:/.test(o.id) && o.n === h.t); })[0];
if (!W) {
var E = eqData();
E.held = null;
eqSave();
return;
}
eqRightDo(W.id);
eqSay("<b>" + eqEsc(W.n) + "</b> in your hand, as you left it.");
}
catch (e) {
eqWarn("take up", e);
}
}
];
});
