/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(500, function () {
return [
function () {
var out = {};
try {
if (typeof INT !== "undefined" && INT && typeof store !== "undefined" && store.inside && INT.wpKey && LTF_WP[INT.wpKey])
LTF_WP[INT.wpKey].forEach(function (b) { out[b] = 1; });
if (typeof FG !== "undefined" && FG.open && FG.st && LTF_ST[FG.st])
LTF_ST[FG.st].forEach(function (b) { out[b] = 1; });
if (typeof cfxHephNear === "function" && cfxHephNear())
LTF_ST.volcano.forEach(function (b) { out[b] = 1; });
var w = ltfWorldKey();
if (w)
out["w:" + w] = 1;
}
catch (e) { }
return out;
},
function () {
if (LTFB.el)
return LTFB.el;
var st = document.createElement("style");
st.textContent = "#ltf-book{position:fixed;inset:calc(10px + env(safe-area-inset-top,0px)) calc(10px + env(safe-area-inset-right,0px)) 10px calc(10px + env(safe-area-inset-left,0px));z-index:70;display:none;flex-direction:column;" +
"max-width:880px;margin:0 auto;background:rgba(20,15,10,.97);border:1px solid #C9A868;border-radius:12px;color:#F4EAD6;font:13.5px/1.45 var(--sans,system-ui);box-shadow:0 10px 40px rgba(0,0,0,.6)}" +
"#ltf-book .hd{padding:10px 14px;border-bottom:1px solid rgba(201,168,104,.35);display:flex;flex-wrap:wrap;gap:8px;align-items:center}" +
"#ltf-book .hd b.t{font:600 18px var(--serif,Georgia);color:#FFE7B0;margin-right:auto}" +
"#ltf-book .bd{overflow:auto;padding:6px 12px 14px;flex:1;-webkit-overflow-scrolling:touch}" +
"#ltf-book input,#ltf-book select{background:#1E1710;color:#F4EAD6;border:1px solid #7A6440;border-radius:7px;padding:6px 8px;font:inherit;min-height:34px}" +
"#ltf-book button{background:#3A2C1A;color:#FFE7B0;border:1px solid #C9A868;border-radius:7px;padding:6px 11px;font:inherit;cursor:pointer;min-height:34px}" +
"#ltf-book button[disabled]{opacity:.42;cursor:default}#ltf-book button.on{background:#C9A868;color:#1A130B}" +
"#ltf-book .r{display:flex;gap:10px;padding:9px 2px;border-bottom:1px solid rgba(255,255,255,.07);align-items:flex-start}" +
"#ltf-book .r .p img{width:48px;height:48px;border-radius:8px}#ltf-book .r .m{flex:1;min-width:0}" +
"#ltf-book .r .n{font-weight:600;color:#FFE7B0}#ltf-book .r .dm{opacity:.72;font-size:12.5px}" +
"#ltf-book .nd{display:inline-flex;align-items:center;gap:3px;margin:2px 8px 0 0;font-size:12.5px;white-space:nowrap}#ltf-book .nd img{width:22px!important;height:22px!important}" +
"#ltf-book .g{color:#9FE09A}#ltf-book .x{color:#F0A08A}#ltf-book .s{font:600 15px var(--serif,Georgia);color:#E8C88A;margin:14px 0 2px}" +
"#ltf-book .msg{padding:7px 12px;background:rgba(201,168,104,.16);border-top:1px solid rgba(201,168,104,.3)}" +
"@media (max-width:560px){#ltf-book .r .p img{width:38px;height:38px}#ltf-book .hd b.t{font-size:16px;width:100%}}";
document.head.appendChild(st);
var el = document.createElement("div");
el.id = "ltf-book";
document.body.appendChild(el);
LTFB.el = el;
if (typeof PS_KEEP !== "undefined")
PS_KEEP["ltf-book"] = 1;
el.addEventListener("click", function (e) {
var t = e.target.closest && e.target.closest("[data-lt]");
if (!t)
return;
e.stopPropagation();
var a = t.getAttribute("data-lt"), v = t.getAttribute("data-v");
if (a === "x")
ltfClose();
else if (a === "make")
ltfMake(v, +t.getAttribute("data-n") || 1);
else if (a === "tab") {
LTFB.tab = v;
ltfPaint();
}
else if (a === "can") {
LTFB.can = !LTFB.can;
ltfPaint();
}
else if (a === "use")
ltfUse(v);
});
el.addEventListener("change", function (e) { if (e.target.getAttribute("data-lt") === "sec") {
LTFB.sec = e.target.value || null;
ltfPaint();
} });
el.addEventListener("input", function (e) { if (e.target.getAttribute("data-lt") === "q") {
LTFB.q = e.target.value;
clearTimeout(LTFB.qt);
LTFB.qt = setTimeout(function () { ltfPaint(true); }, 220);
} });
el.addEventListener("keydown", function (e) { e.stopPropagation(); if (e.key === "Escape")
ltfClose(); });
return el;
},
function (R, here, keeper) {
var lv = ltfLevel(), at = keeper || here[R.b], lvOk = keeper || lv >= R.lv, can = ltfCanMake(R) || keeper;
var why = !lvOk ? "Needs level " + R.lv : !at ? "Made at " + (/^w:/.test(R.b) ? ltfBenchName(R.b) : LTF_BENCH_AT[R.b] || ltfBenchName(R.b)) : !can ? "Not enough yet" : "";
var mine = ltfHave(R.mk || R.k);
return "<div class='r'><div class='p'>" + ltfIcon(R.mk || R.k, 48) + "</div><div class='m'><div class='n'>" + dglEsc(R.n) + (mine ? " <span class='dm'>· you have " + mine + "</span>" : "") + "</div>" +
"<div class='dm'>" + dglEsc(R.d) + " · level " + R.lv + " · " + dglEsc(ltfBenchName(R.b)) + "</div><div>" + ltfNeedHtml(R) + "</div></div>" +
"<div style='display:flex;flex-direction:column;gap:4px;align-items:flex-end'><button data-lt='make' data-v='" + R.k + "' data-n='1'" + (why || LTFB.busy ? " disabled" : "") + ">Make</button>" +
(!why && (keeper || ltfCanMake(R, 5)) ? "<button data-lt='make' data-v='" + R.k + "' data-n='5'" + (LTFB.busy ? " disabled" : "") + ">× 5</button>" : "") +
(why ? "<span class='dm' style='max-width:150px;text-align:right'>" + dglEsc(why) + "</span>" : "") + "</div></div>";
},
function () {
var h = "", any = false;
LTF_BOOK.forEach(function (S) {
S[1].forEach(function (r) {
var R = LTF_RB[r[0]], n = ltfHave(R.k);
if (!n || R.ty === "mat" || R.ty === "weapon" || typeof ltfSlotOf === "function" && ltfSlotOf(R))
return;
any = true;
var act = R.ty === "draught" || (R.ty === "ammo" && /bomb/i.test(R.n)) ? "<button data-lt='use' data-v='" + R.k + "'>" + (/bomb|powder/i.test(R.n) ? "Throw" : "Drink") + "</button>"
: R.ty === "weapon" ? "<span class='dm'>In your 🎒 Backpack's weapons</span>" : R.ty === "tome" ? "<span class='dm'>" + (ltfSpellKnown(R) ? "Learned: in the Combat book" : "Learned when made") + "</span>" : "<span class='dm'>Kept</span>";
h += "<div class='r'><div class='p'>" + ltfIcon(R.k, 48) + "</div><div class='m'><div class='n'>" + dglEsc(R.n.replace(" ★", "")) + " <span class='dm'>× " + n + "</span></div><div class='dm'>" + dglEsc(R.d) + "</div></div><div>" + act + "</div></div>";
});
});
return any ? h : "<p class='dm'>Nothing made yet. Find what a recipe needs, go to its bench and make it.</p>";
},
function (keepFocus) {
if (!LTFB.open)
return;
var el = ltfEl();
el.style.display = "flex";
var here = ltfBenchHere(), keeper = ltfKeeper(), hb = Object.keys(here);
var secs = LTF_BOOK.map(function (S) { return S[0]; });
var hd = "<div class='hd'><b class='t'>📜 The Maker's Book</b>" +
"<button data-lt='tab' data-v='book' class='" + (LTFB.tab === "book" ? "on" : "") + "'>Recipes</button><button data-lt='tab' data-v='yours' class='" + (LTFB.tab === "yours" ? "on" : "") + "'>What you made</button>" +
"<button data-lt='x' aria-label='Close'>✕</button>" +
(LTFB.tab === "book" ? "<div style='display:flex;gap:6px;flex-wrap:wrap;width:100%'><select data-lt='sec'><option value=''>Every section</option>" + secs.map(function (s) { return "<option" + (LTFB.sec === s ? " selected" : "") + ">" + dglEsc(s) + "</option>"; }).join("") + "</select>" +
"<input data-lt='q' placeholder='Find a recipe or a material' value='" + dglEsc(LTFB.q) + "' style='flex:1;min-width:140px'>" +
"<button data-lt='can' class='" + (LTFB.can ? "on" : "") + "'>Only what I can make here</button></div>" : "") +
"<div class='dm' style='width:100%'>" + (hb.length ? "Here: " + hb.map(ltfBenchName).join(", ") + "." : "No bench here: read the book anywhere, make things at the bench each recipe names.") + (keeper ? " (The Keeper's bench needs nothing.)" : "") + "</div></div>";
var bd = "";
if (LTFB.tab === "yours")
bd = ltfYours();
else {
var q = LTFB.q.trim().toLowerCase(), shown = 0;
LTF_BOOK.forEach(function (S) {
if (LTFB.sec && S[0] !== LTFB.sec)
return;
var rows = S[1].map(function (r) { return LTF_RB[r[0]]; }).filter(function (R) {
if (q && (R.n + " " + R.d + " " + Object.keys(R.need).map(ltfName).join(" ")).toLowerCase().indexOf(q) < 0)
return false;
if (LTFB.can && !(keeper || (here[R.b] && ltfLevel() >= R.lv && ltfCanMake(R))))
return false;
return true;
});
if (!rows.length)
return;
shown += rows.length;
bd += "<div class='s'>" + dglEsc(S[0]) + "</div>" + rows.slice(0, q || LTFB.sec || LTFB.can ? 400 : 60).map(function (R) { return ltfRow(R, here, keeper); }).join("");
});
if (!shown)
bd = "<p class='dm'>Nothing matches." + (LTFB.can ? " Nothing can be made here with what you have." : "") + "</p>";
}
var sc = el.querySelector(".bd"), top = sc ? sc.scrollTop : 0, foc = keepFocus && document.activeElement && document.activeElement.getAttribute && document.activeElement.getAttribute("data-lt") === "q";
el.innerHTML = hd + "<div class='bd'>" + bd + "</div>" + (LTFB.msg ? "<div class='msg'>" + LTFB.msg + "</div>" : "");
var sc2 = el.querySelector(".bd");
if (sc2 && keepFocus !== false)
sc2.scrollTop = keepFocus ? 0 : top;
if (foc) {
var i = el.querySelector("[data-lt='q']");
if (i) {
i.focus();
try {
i.setSelectionRange(i.value.length, i.value.length);
}
catch (e) { }
}
}
},
function (k, n) {
var R = LTF_RB[k];
if (!R || LTFB.busy)
return;
if (!(typeof signedIn === "function" && signedIn())) {
LTFB.msg = "Sign in first: what you make is kept against your account.";
ltfPaint();
return;
}
if (!ltfKeeper() && !ltfBenchHere()[R.b]) {
LTFB.msg = "That is made at " + dglEsc(/^w:/.test(R.b) ? ltfBenchName(R.b) : LTF_BENCH_AT[R.b] || ltfBenchName(R.b)) + ".";
ltfPaint();
return;
}
LTFB.busy = true;
LTFB.msg = "Working…";
ltfPaint();
cityRpc("loot_make", { p_key: k, p_times: n || 1 }).then(function (r) {
LTFB.busy = false;
if (!r || !r.ok) {
LTFB.msg = dglEsc((r && r.say) || "The bench is not answering just now.");
ltfPaint();
return;
}
if (!ltfKeeper())
Object.keys(R.need).forEach(function (m) { FG.stock[m] = Math.max(0, ltfHave(m) - R.need[m] * (n || 1)); });
FG.stock[r.makes] = r.have != null ? +r.have : ltfHave(r.makes) + (+r.amount || 1);
var extra = ltfMade(R, n || 1);
LTFB.msg = ltfIcon(r.makes, 26) + " " + dglEsc(r.say) + (extra ? " " + extra : "");
try {
if (typeof setStatus === "function")
setStatus(LTFB.msg);
}
catch (e) { }
ltfPaint();
}).catch(function (e) { LTFB.busy = false; LTFB.msg = (typeof rpcMissing === "function" && rpcMissing(e)) ? "The Maker's Book needs the city's the latest server update first." : "The bench is not answering just now."; ltfPaint(); });
},
function (sec) {
try {
if (typeof THREE === "undefined" || typeof camera === "undefined")
return;
if (!LTF_GLOW.l) {
LTF_GLOW.l = new THREE.PointLight(0xFFE7B0, 1.2, 16, 2);
camera.add(LTF_GLOW.l);
if (!camera.parent && typeof scene !== "undefined")
scene.add(camera);
}
LTF_GLOW.l.visible = true;
LTF_GLOW.until = Date.now() + sec * 1000;
}
catch (e) { }
},
function (R, n) {
var say = "";
try {
if (R.ty === "weapon" && LTF_ARMS[R.k]) {
ltfSync();
say = "It is in your 🎒 Backpack's weapons: take it in hand from there.";
}
else if (R.ty === "tome") {
var S = ltfSpellOf(R);
if (S && typeof cbtLearnSpell === "function") {
var had = cbtMagicKnows(S.id);
cbtLearnSpell(S.id, "written at the scribe's desk");
try {
if (typeof cbtSave === "function")
cbtSave();
}
catch (e) { }
say = had ? "You know " + S.n + " already: the tome is kept." : "<b>You learn " + dglEsc(S.n) + ".</b> Put it in a slot from the Combat book.";
}
}
else if (R.ty === "draught" || R.ty === "ammo" && /bomb/i.test(R.n))
say = "Drink or throw it from What you made.";
}
catch (e) { }
return say;
},
function (R) {
try {
var S = /sleep|smoke/i.test(R.n) ? { id: "ltf_bomb", n: R.n, t: "around", m: 0.2, rad: 7, stun: 4, elem: "shadow", mana: 0, cd: 0 } : { id: "ltf_bomb", n: R.n, t: "around", m: 1.6, rad: 6, elem: "fire", dot: { dps: 0.2, t: 4 }, mana: 0, cd: 0 };
if (typeof cbtRun === "function" && typeof CBT !== "undefined" && CBT.on) {
var W = { key: "spell", name: R.n, cls: "magic", elem: S.elem, reach: 22, ranged: true, dmg: 10, cool: 0.6, bare: false, req: 1 };
cbtRun(Object.assign({ spell: 1, rng: 24 }, S), W, typeof cbtPick === "function" ? cbtPick(8) : null);
return dglEsc(R.n) + ": it bursts round you.";
}
}
catch (e) { }
ltfBuff("smoke", 6, 1);
return dglEsc(R.n) + ": smoke and fire burst round you, and the foes lose you for a moment.";
},
function (k) {
var R = LTF_RB[k];
if (!R || LTFB.busy)
return;
LTFB.busy = true;
cityRpc("loot_use", { p_kind: k }).then(function (r) {
LTFB.busy = false;
if (!r || !r.ok) {
LTFB.msg = dglEsc((r && r.say) || "Not just now.");
ltfPaint();
return;
}
FG.stock[k] = +r.have || 0;
var f = LTF_DRINK.filter(function (d) { return d[0].test(R.n); })[0], said = f[1](R);
LTFB.msg = ltfIcon(k, 26) + " " + said;
try {
if (typeof setStatus === "function")
setStatus(LTFB.msg);
}
catch (e) { }
ltfPaint();
}).catch(function () { LTFB.busy = false; LTFB.msg = "Not just now."; ltfPaint(); });
},
function (R) {
if (!R)
return null;
var n = R.n.toLowerCase();
if (R.x && R.x.slot)
return R.x.slot;
if (R.ty === "gadget" || R.x && R.x.pw === "vine")
return "gadget";
if (R.ty === "familiar")
return "familiar";
if (R.ty === "trinket")
return "trinket";
if (R.ty === "jewel") {
if (/ring/.test(n))
return "ring";
if (/bracelet/.test(n))
return "bracelet";
return "amulet";
}
if (R.ty === "armour" || R.ty === "thing" && /mask|crown|gauntlet/.test(n)) {
if (/helm|hood|hat|crown|mask/.test(n))
return "head";
if (/gauntlet|glove/.test(n))
return "hands";
if (/greave|boot|fins|slipper/.test(n))
return "feet";
if (/cloak|wings/.test(n))
return "back";
return "chest";
}
return null;
},
function (R) {
var slot = ltfSlotOf(R);
if (R.ty !== "weapon" && !slot)
return null;
if (R.x && R.x.leg)
return { r: 4, m: [], s: 2 };
var luck = 0;
try {
if (typeof CBT !== "undefined" && CBT.buffs.steady && CBT.buffs.steady.until > CBT.t)
luck = 0.08;
}
catch (e) { }
var x = Math.random() - luck, r = x < 0.04 ? 3 : x < 0.15 ? 2 : x < 0.40 ? 1 : 0;
var pool = LTF_NAMES_M.filter(function (m) { return R.ty === "weapon" || slot !== "ring" && slot !== "amulet" && slot !== "bracelet" || m[2] === 1; }), names = [];
while (names.length < r && pool.length) {
var i = Math.floor(Math.random() * pool.length);
names.push(pool[i][0]);
pool.splice(i, 1);
}
return { r: r, m: names, s: r >= 3 ? 2 : r >= 2 ? 1 : 0 };
},
function (k) {
var R = LTF_RB[k], o = ltfD().roll[k];
if (!R)
return k;
var base = R.n.replace(/\s*\(\d+\)\s*$/, "");
if (!o || !o.m || !o.m.length)
return base;
var pre = o.m.filter(function (q) { return LTF_NM[q] && !LTF_NM[q][2]; }).map(function (q) { return LTF_NM[q][1]; }), suf = o.m.filter(function (q) { return LTF_NM[q] && LTF_NM[q][2]; }).map(function (q) { return LTF_NM[q][1]; });
return (pre.length ? pre.join(" ") + " " : "") + base + (suf.length ? " " + suf[0] : "");
},
function (A, near) {
try {
if (typeof cbtRun !== "function" || !CBT.on)
return false;
var f = typeof cbtPick === "function" ? cbtPick(near || (A.t === "around" || A.t === "buff" ? 8 : 26)) : null;
if (!f && A.t !== "around" && A.t !== "buff")
return false;
A = Object.assign({ id: "ltf_" + (A.elem || "x"), n: "", mana: 0, cd: 0, spell: 1, rng: 24, elem: "light" }, A);
var W = { key: "spell", name: "", cls: "magic", elem: A.elem, reach: 22, ranged: true, dmg: 10, cool: 0.6, bare: false, req: 1 };
LTF.inCast = 1;
try {
cbtRun(A, W, f);
}
finally {
LTF.inCast = 0;
}
return true;
}
catch (e) {
LTF.inCast = 0;
return false;
}
},
function (r) {
if (LTF.inCast || !r || !CBT.on)
return;
var S = ltfStats(), F = S.fx;
LTF.blows = (LTF.blows || 0) + 1;
if (S.critX && r.crit)
r.d = Math.round(r.d * (1 + S.critX / 1.75));
if (F.echo && Math.random() < 0.125 * F.echo)
r.d *= 2;
if (F.vamp)
cbtHeal(Math.max(1, Math.round(r.d * 0.04 * F.vamp)));
if (F.leech)
CBT.mana = Math.min(cbtManaMax(), CBT.mana + 3 * F.leech);
if (F.frozen && ltfCd("frozen", 1.2))
ltfCast({ t: "zone", m: 0.1, rad: 1.2, ticks: 1, slow: 2, elem: "frost" });
if (F.venom && ltfCd("venom", 1.5))
ltfCast({ t: "zone", m: 0.1, rad: 1.2, ticks: 1, dot: { dps: 0.18, t: 4 }, elem: "nature" });
if ((F.thunder || S.set.nemo === 4 || S.pw.nemo) && ltfCd("chain", 2))
ltfCast({ t: "volley", m: 0.5, rng: 16, n2: 2 + (F.thunder || 0), stun: S.pw.nemo ? 0.5 : 0.2, elem: "storm" });
if (F.sun && Math.random() < 0.15)
ltfCast({ t: "zone", m: 0.1, rad: 1.5, ticks: 1, stun: 0.8, elem: "light" });
if (F.push && ltfCd("push", 4))
ltfCast({ t: "arc", m: 0.3, rng: 6, ang: 0.7, push: 6, elem: "frost" });
if (S.set.silk === 4 && ltfCd("web", 3))
ltfCast({ t: "zone", m: 0.1, rad: 1.5, ticks: 1, slow: 3, elem: "nature" });
if (S.set.forge === 4 && LTF.blows % 10 === 0)
ltfCast({ t: "around", m: 1.2, rad: 5, elem: "fire", dot: { dps: 0.15, t: 3 } });
var p = S.pw;
if (p.bell && LTF.blows % 12 === 0) {
ltfCast({ t: "around", m: 0.6, rad: 9, stun: 3, elem: "storm" });
cbtFloatText("🔔 The twelfth toll", null, "#FFE0A0", 1);
}
if (p.tide && ltfCd("tide", 10))
ltfCast({ t: "arc", m: 1.2, rng: 10, ang: 0.8, push: 8, elem: "frost" });
if (p.colossus && ltfCd("slag", 2))
ltfCast({ t: "zone", m: 0.3, rad: 2, ticks: 3, gap: 0.4, elem: "fire" });
if (p.widow && ltfCd("widow", 2))
ltfCast({ t: "zone", m: 0.1, rad: 1.5, ticks: 1, dot: { dps: 0.22, t: 5 }, elem: "nature" });
if (p.sky && ltfCd("sky", 3))
ltfCast({ t: "zone", m: 0.8, rad: 3, ticks: 1, stun: 0.5, elem: "storm" });
if (p.drakefire && ltfCd("drakefire", 8))
ltfCast({ t: "arc", m: 1.5, rng: 8, ang: 0.6, dot: { dps: 0.2, t: 3 }, elem: "fire" });
},
function (d) {
if (!CBT.on || !(d > 0))
return;
var S = ltfStats(), F = S.fx, p = S.pw;
if ((F.thorn || S.set.snow === 4) && ltfCd("thorn", 1.5))
ltfCast({ t: "around", m: 0.25 * (F.thorn || 1), rad: 3, stun: S.set.snow === 4 ? 2 : 0, elem: S.set.snow === 4 ? "frost" : "nature" });
var fam = ltfD().wear.familiar;
if (fam === "lm_ember_wisp" && ltfCd("wisp", 2))
ltfCast({ t: "around", m: 0.4, rad: 3, dot: { dps: 0.15, t: 3 }, elem: "fire" });
var V = typeof cbtVig === "function" ? cbtVig() : { hp: 100, max: 100 }, low = V.hp - d < V.max * 0.25;
if (ltfD().wear.gadget === "lm_smoke_cloak" && d >= 15 && ltfCd("smoke", 20))
ltfBuff("smoke", 4, 1);
if (p.mirror && ltfCd("mirror", 20)) {
CBT.absorb = 40;
CBT.absorbT = CBT.t + 8;
}
if (low) {
if (F.phoenix && ltfCd("phoenix", 60))
ltfCast({ t: "around", m: 2, rad: 7, dot: { dps: 0.3, t: 4 }, elem: "fire" });
if (p.fleece && ltfCd("fleece", 180)) {
setTimeout(function () { cbtHeal(V.max); }, 50);
cbtFloatText("🐏 The Golden Fleece", null, "#FFE07A", 1.2);
}
else if (p.galvanic && ltfCd("galvanic", 3600)) {
setTimeout(function () { cbtHeal(Math.round(V.max / 2)); }, 50);
cbtFloatText("⚡ The Galvanic Heart", null, "#9AD8FF", 1.2);
}
if (S.set.drake === 4 && ltfCd("drakeform", 300)) {
CBT.buffs.might = { until: CBT.t + 15, v: 0.5 };
ltfGlow(15);
cbtFloatText("🐉 Drake form", null, "#FF9A5A", 1.2);
}
}
},
function (o) {
var S = ltfStats(), F = S.fx, p = S.pw;
if (p.nevermore)
setTimeout(function () { ltfCast({ t: "zone", m: 0.5, rad: 2, ticks: 10, gap: 2, elem: "shadow" }); }, 300);
if (S.set.drowned === 4)
setTimeout(function () { ltfCast({ t: "zone", m: 0.4, rad: 2.5, ticks: 10, gap: 2, elem: "frost" }); }, 300);
if (p.widow && Math.random() < 0.5)
setTimeout(function () { ltfCast({ t: "zone", m: 0.3, rad: 2, ticks: 6, gap: 1, elem: "nature" }); }, 300);
var luck = 0.1 * ((F.lucky || 0) + (F.gild || 0) + (F.magpie || 0));
if (luck && Math.random() < luck) {
var w = ltfWorldKey();
if (w !== null && typeof signedIn === "function" && signedIn())
setTimeout(function () { dglTake("world", 1, { src: "beast", lv: Math.max(1, +o.lv || 1), theme: w, where: "the wilds" }, "🍀 Luck: a second pouch"); }, 900);
}
},
function () {
var k = ltfD().wear.gadget;
if (!k || ltfHave(k) <= 0) {
if (typeof setStatus === "function")
setStatus("No gadget worn: put one on from the 📜 Maker's book (What you made).");
return;
}
var R = LTF_RB[k], n = R.n.toLowerCase(), go = function (dist, t) { try {
var f = Math.sin(yaw) * -1, z = Math.cos(yaw) * -1;
if (typeof cbtGo === "function") {
CBT.iframe = Math.max(CBT.iframe || 0, 0.2);
cbtGo("dash", f, z, dist, t || 0.25, null, null);
return true;
}
}
catch (e) { } return false; };
var say = "";
if (/grappling|vine/.test(n)) {
if (!ltfCd("gadget", 4))
return;
say = go(14, 0.35) ? "🪝 You swing forward." : "";
}
else if (/blink/.test(n)) {
if (!ltfCd("gadget", 8))
return;
say = go(8, 0.06) ? "✨ Blink." : "";
}
else if (/jump boots/.test(n)) {
if (!ltfCd("gadget", 3))
return;
say = go(7, 0.3) ? "🦘 A great bound." : "";
}
else if (/trap kit/.test(n)) {
if (!ltfCd("gadget", 12))
return;
say = ltfCast({ t: "zone", m: 0.1, rad: 2.5, ticks: 1, stun: 5, elem: "nature" }) ? "🪤 The trap snaps shut." : "No beast in front of you.";
}
else if (/mirror decoy/.test(n)) {
if (!ltfCd("gadget", 20))
return;
ltfBuff("smoke", 10, 1);
try {
if (typeof cbtFoes === "function")
cbtFoes(14).forEach(function (o) { if (o.calm)
o.calm(10); });
}
catch (e) { }
say = "🪞 Your copy draws the beasts away.";
}
else if (/pocket portal/.test(n)) {
var P = camera.position, w = typeof WLD !== "undefined" ? WLD.on || "" : "";
if (!LTF.portal || LTF.portal.w !== w) {
LTF.portal = { x: P.x, y: P.y, z: P.z, w: w };
say = "🌀 A mark is left here. Use the portal again to come back to it.";
}
else {
P.set(LTF.portal.x, LTF.portal.y, LTF.portal.z);
LTF.portal = null;
say = "🌀 Back to your mark.";
}
}
else if (/smoke cloak/.test(n))
say = "The smoke cloak works by itself: when you are hit hard, you vanish in smoke.";
else
say = dglEsc(R.n) + ": " + dglEsc(R.d) + ". (This one comes with later work.)";
if (say && typeof setStatus === "function")
setStatus(say);
},
function (R) {
var L = ltfD(), k = R.k, slot = ltfSlotOf(R), worn = Object.keys(L.wear).filter(function (s) { return L.wear[s] === k; })[0], o = L.roll[k];
var fx = (o && o.m || []).map(function (q) { return LTF_NM[q] ? "<i>" + dglEsc(LTF_NM[q][1].replace(/^of /, "")) + "</i>: " + dglEsc(LTF_NM[q][3]) : ""; }).filter(Boolean).join(" · ");
var socks = L.sock[k] || [], ns = ltfSockets(k), en = L.ench[k] || [], h = "";
h += "<div class='dm'>" + (fx ? fx + "<br>" : "") + (ns ? "Sockets: " + socks.map(function (g) { return "💎 " + LTF_GEMS[g][0]; }).concat(Array(Math.max(0, ns - socks.length)).fill("◯ empty")).join(", ") + "<br>" : "") +
(en.length ? "Enchanted: " + en.map(function (e) { return dglEsc(ltfName(e)); }).join(", ") + "<br>" : "") + (R.x && R.x.set ? "Set: " + dglEsc(R.x.set) + " (" + (ltfSetCount()[R.x.set] || 0) + " of 4 worn)" : "") + "</div>";
var act = [];
if (slot && R.ty !== "weapon")
act.push(worn ? "<button data-lt2='off' data-v='" + k + "'>Take off</button>" : "<button data-lt2='wear' data-v='" + k + "'>" + (slot === "gadget" || slot === "familiar" ? "Take along" : "Wear") + "</button>");
if (ns > socks.length) {
var G = ltfGemsHave();
if (G.length)
act.push("<select data-lt2='gem' data-v='" + k + "'><option value=''>Set a gem…</option>" + G.map(function (g) { return "<option value='" + g.k + "|" + g.g + "'>" + dglEsc(ltfName(g.k)) + " (" + ltfHave(g.k) + ")</option>"; }).join("") + "</select>");
}
if (ltfHave("lm_socket_punch") > 0 && ns < 3 && (R.ty === "weapon" || slot))
act.push("<button data-lt2='punch' data-v='" + k + "'>Punch a socket</button>");
var maxE = (en.indexOf("lm_elder_twin_rune") >= 0 ? 2 : 1) + (en.indexOf("lm_elder_twin_rune") >= 0 ? 1 : 0);
if (en.filter(function (e) { return e !== "lm_elder_twin_rune"; }).length < (en.indexOf("lm_elder_twin_rune") >= 0 ? 2 : 1) && (R.ty === "weapon" || slot && slot !== "gadget" && slot !== "familiar")) {
var E = ltfEnchHave();
if (E.length)
act.push("<select data-lt2='ench' data-v='" + k + "'><option value=''>Lay an enchantment…</option>" + E.map(function (e) { return "<option value='" + e + "'>" + dglEsc(ltfName(e)) + "</option>"; }).join("") + "</select>");
}
if (ltfHave("lm_elder_twin_rune") > 0 && en.indexOf("lm_elder_twin_rune") < 0 && (R.ty === "weapon" || slot))
act.push("<button data-lt2='ench1' data-v='" + k + "|lm_elder_twin_rune'>Carve the elder twin rune</button>");
return { h: h, act: act.join(" "), worn: worn };
},
function (a, v) {
var L = ltfD(), p = String(v || "").split("|"), k = p[0], R = LTF_RB[k];
if (!R)
return;
if (a === "wear") {
var slot = ltfSlotOf(R);
if (slot === "ring")
slot = !L.wear.ring1 || L.wear.ring1 === k ? "ring1" : !L.wear.ring2 ? "ring2" : "ring1";
if (L.wear[slot] && L.roll[L.wear[slot]] && (L.roll[L.wear[slot]].m || []).indexOf("cursed") >= 0) {
LTFB.msg = "The cursed piece will not come off.";
ltfPaint();
return;
}
L.wear[slot] = k;
LTF.st = null;
ltfSave();
LTFB.msg = ltfIcon(k, 26) + " You put on " + ltfRollHtml(k) + ".";
ltfPaint();
return;
}
if (a === "off") {
if (L.roll[k] && (L.roll[k].m || []).indexOf("cursed") >= 0) {
LTFB.msg = "It is cursed: it will not come off.";
ltfPaint();
return;
}
Object.keys(L.wear).forEach(function (s) { if (L.wear[s] === k)
L.wear[s] = null; });
LTF.st = null;
ltfSave();
LTFB.msg = "Taken off.";
ltfPaint();
return;
}
var use = function (kind, then) {
LTFB.busy = true;
cityRpc("loot_use", { p_kind: kind }).then(function (r) {
LTFB.busy = false;
if (!r || !r.ok) {
LTFB.msg = dglEsc((r && r.say) || "Not just now.");
ltfPaint();
return;
}
FG.stock[kind] = +r.have || 0;
then();
LTF.st = null;
ltfSave();
ltfPaint();
}).catch(function () { LTFB.busy = false; LTFB.msg = "Not just now."; ltfPaint(); });
};
if (a === "gem" && p[1] && p[2]) {
if ((L.sock[k] || []).length >= ltfSockets(k))
return;
use(p[1], function () { (L.sock[k] = L.sock[k] || []).push(p[2]); LTFB.msg = "💎 " + dglEsc(LTF_GEMS[p[2]][0]) + " set in " + ltfRollHtml(k) + "."; });
return;
}
if (a === "punch") {
use("lm_socket_punch", function () { var o = L.roll[k] = L.roll[k] || { r: 0, m: [], s: 0 }; o.p = (o.p || 0) + 1; LTFB.msg = "A socket is punched in " + ltfRollHtml(k) + "."; });
return;
}
if ((a === "ench" || a === "ench1") && p[1]) {
use(p[1], function () { (L.ench[k] = L.ench[k] || []).push(p[1]); LTFB.msg = "✨ " + dglEsc(ltfName(p[1])) + " laid on " + ltfRollHtml(k) + "."; });
return;
}
}
];
});
