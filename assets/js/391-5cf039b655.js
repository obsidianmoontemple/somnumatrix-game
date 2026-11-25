/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var STK = { figs: [], names: {}, near: null, at: 0, talk: null };
var STK_WEAK = typeof WeakRef === "function";
var STK_SKIP = /^(__me|presence_|tgl_chauffeur|cab_driver|yard_sales|hp_pilot|arrest_rider|corpsky|sdesc_|__tlpr_|__bacchus|__tncrier)/;
var STK_JOBS = [[/^__carrier/, "a parcel carrier, out on your delivery round"], [/^__crash_medic/, "a paramedic, seeing to a road accident"],
[/^__crash_works/, "one of the road crew clearing up after an accident"], [/^fest_k_/, "one of the people keeping a booth at the Grand Opening Extravaganza"],
[/^(fest_p|frp)/, "one of the performers in the Grand Opening Extravaganza parade"], [/^__ugs_/, "one of the Underground's railway staff"]];
(function () {
if (typeof buildFigure !== "function")
return;
var bf = buildFigure;
buildFigure = function (spec) {
var g = bf.apply(this, arguments);
try {
if (g && spec && spec.id && (spec.archetype === "human" || spec.archetype === "child") && !STK_SKIP.test(String(spec.id))) {
g.userData.stk = { id: String(spec.id), arch: spec.archetype, look: spec.look || null, t: Date.now() };
STK.figs.push(STK_WEAK ? new WeakRef(g) : g);
if (STK.figs.length > 4000)
stkPrune(true);
}
}
catch (e) { }
return g;
};
})();
function stkPrune(all) {
var now = Date.now();
STK.figs = STK.figs.filter(function (r) { var g = stkFig(r); return !!g && (g.parent || (!all && now - g.userData.stk.t < 8000)); });
}
function stkFig(r) { return STK_WEAK && r instanceof WeakRef ? r.deref() : r; }
function stkEach(fn) { STK.figs.forEach(function (r) { var g = stkFig(r); if (g)
fn(g); }); }
function stkInCity() { return typeof inSomnucorNow === "function" && inSomnucorNow() && typeof walkMode !== "undefined" && walkMode; }
function stkShown(g) { for (var o = g; o; o = o.parent) {
if (!o.visible)
return false;
if (o === scene)
return true;
} return false; }
function stkWhere(g) { var p = new THREE.Vector3(); g.getWorldPosition(p); return p; }
function stkCC(g) { if (typeof CC === "undefined" || !CC.pool)
return null; for (var i = 0; i < CC.pool.length; i++) {
var p = CC.pool[i];
if (p && p.g === g)
return p;
} return null; }
function stkLcy(g) {
if (typeof LCY === "undefined")
return null;
var r = null;
function look(L) { (L || []).forEach(function (W) { (W.men || []).forEach(function (m) { if (!r && m && m.g === g)
r = { g: g, role: m.role, what: W }; }); }); }
look(LCY.crews);
look(LCY.sites);
return r;
}
function stkStore(g) { var id = g.userData.stk.id, sp = typeof specById === "function" ? specById(id) : null; return sp && sp.charId && typeof charOf === "function" ? charOf(sp) : null; }
function stkSex(g) { var L = g.userData.stk && g.userData.stk.look; return L && (L.sex === "f" || L.sex === "m") ? L.sex : ""; }
function stkAge(g, key) { return __ZC(391, 0, this, arguments, new.target); }
function stkKey(g) { var p = stkCC(g); if (p)
return "cc|" + p.k + "|" + CC.seed; return "st|" + g.userData.stk.id; }
function stkName(key, sx) {
if (STK.names[key])
return STK.names[key];
var used = {};
try {
var R = (store.characters || []).filter(function (x) { return x.primary === false && x.src && x.src.role === "belongs"; });
if (R.length)
cfkName(R[0]);
Object.keys(CFK.keys).forEach(function (k) { used[CFK.keys[k]] = 1; });
}
catch (e) { }
Object.keys(STK.names).forEach(function (k) { used[STK.names[k]] = 1; });
return (STK.names[key] = cfkName1(key, sx, used));
}
(function () {
if (typeof ccBuild === "function") {
var cb = ccBuild;
ccBuild = function (p) {
var r = cb.apply(this, arguments);
try {
if (p && p.g && p.g.userData.stk) {
var nm = stkName("cc|" + p.k + "|" + CC.seed, stkSex(p.g));
if (p.name !== nm) {
p.name = nm;
p.tagText = null;
}
}
}
catch (e) { }
return r;
};
}
if (typeof lcyMan === "function") {
var lm = lcyMan;
lcyMan = function (seed) {
var g = lm.apply(this, arguments);
try {
if (g && g.userData.stk)
g.userData.lcyName = stkName("st|" + g.userData.stk.id, stkSex(g));
}
catch (e) { }
return g;
};
}
if (typeof lcyGreet === "function")
lcyGreet = function () { return ""; };
})();
function stkPersona(g, key, sx, age) { return __ZC(391, 1, this, arguments, new.target); }
function stkTalk(g) { return __ZC(391, 2, this, arguments, new.target); }
function stkOpen(g, t, sx, age) { return __ZC(391, 3, this, arguments, new.target); }
(function () {
if (typeof ccTick === "function") {
var ct = ccTick;
ccTick = function () {
var r = ct.apply(this, arguments);
try {
var T = STK.talk;
if (T) {
if (typeof talkOpen !== "undefined" && talkOpen) {
var P = camera.position, q = T.p.g.position;
T.p.g.rotation.y = Math.atan2(P.x - q.x, P.z - q.z);
var Lm = T.p.g.userData.limbs;
if (Lm) {
["ll", "rl", "la", "ra"].forEach(function (n) { if (Lm[n])
Lm[n].rotation.x = 0; });
}
}
else {
T.p.sp = T.sp || 1.2;
STK.talk = null;
}
}
}
catch (e) { }
return r;
};
}
})();
function stkNearest(P, reach) {
var best = null, bd = reach * reach, seen = [];
function look(g) {
if (!g || !g.userData.stk || seen.indexOf(g) >= 0)
return;
seen.push(g);
if (!stkShown(g))
return;
var w = stkWhere(g), dx = w.x - P.x, dz = w.z - P.z, d = dx * dx + dz * dz;
if (d < bd && Math.abs(w.y - (P.y - 1.6)) < 4) {
bd = d;
best = g;
}
}
stkEach(look);
if (typeof CC !== "undefined" && CC.pool)
CC.pool.forEach(function (p) { if (p && p.state !== "gone")
look(p.g); });
return best;
}
function stkButton(g) {
var el = document.getElementById("stk-talk");
if (!g) {
if (el)
el.style.display = "none";
STK.near = null;
return;
}
if (!el) {
el = document.createElement("button");
el.id = "stk-talk";
el.type = "button";
el.style.cssText = "position:fixed;left:50%;transform:translateX(-50%);bottom:calc(150px + env(safe-area-inset-bottom,0px));z-index:40;padding:10px 16px;border-radius:999px;border:1px solid #8FB4E8;background:rgba(11,10,20,.88);color:#EDE8F8;font:600 14px system-ui,sans-serif;cursor:pointer";
el.onclick = function (ev) { ev.stopPropagation(); if (STK.near)
stkTalk(STK.near); };
document.body.appendChild(el);
}
STK.near = g;
var p = stkCC(g), nm = p ? p.name : (g.userData.lcyName || stkName(stkKey(g), stkSex(g)));
var label = "💬 Talk to " + nm + (typeof touchRig !== "undefined" && touchRig || STK.busy ? "" : " (E)");
if (el.textContent !== label)
el.textContent = label;
el.style.display = "block";
}
function stkBusy() {
if (typeof talkOpen !== "undefined" && talkOpen)
return true;
if (typeof greetOpen !== "undefined" && greetOpen)
return true;
if (typeof nearChar !== "undefined" && nearChar)
return true;
if (typeof WLD !== "undefined" && WLD.prompt && WLD.prompt.style.display === "block")
return true;
return stkLcyShown();
}
function stkLcyShown() { var l = document.getElementById("lcy-talk"); return !!(l && l.style.display === "block"); }
(function () {
function loop() {
try {
var now = performance.now();
if (now - STK.at > 350) {
STK.at = now;
if (!stkInCity())
stkButton(null);
else {
if (STK.figs.length > 600 && Math.random() < 0.05)
stkPrune(false);
var g = stkNearest(camera.position, 3.6);
if (g && stkLcy(g))
g = null;
if (g && stkStore(g))
g = null;
STK.busy = stkBusy();
stkButton(g && !(typeof talkOpen !== "undefined" && talkOpen) && !(typeof greetOpen !== "undefined" && greetOpen) && !stkLcyShown() ? g : null);
}
}
}
catch (e) {
if (!STK.warned && window.console) {
STK.warned = 1;
console.warn("[street-talk]", e);
}
}
requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
})();
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (e.code !== "KeyE" || !STK.near || /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
if (!stkInCity() || stkBusy())
return;
e.preventDefault();
stkTalk(STK.near);
});
function stkTapAt(x, y) { return __ZC(391, 4, this, arguments, new.target); }
(function () {
if (typeof tapAt !== "function")
return;
var ta = tapAt;
tapAt = function (x, y) {
try {
var hit = typeof objectAt === "function" ? objectAt({ clientX: x, clientY: y }) : null, ch = hit && typeof charOf === "function" ? charOf(hit) : null;
if (!ch && !(typeof talkOpen !== "undefined" && talkOpen) && !(typeof greetOpen !== "undefined" && greetOpen)) {
var g = stkTapAt(x, y);
if (g && stkTalk(g))
return;
}
}
catch (e) {
if (window.console)
console.warn("[street-talk]", e);
}
return ta.apply(this, arguments);
};
})();
