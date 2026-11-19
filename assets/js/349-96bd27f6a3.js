/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var VWL = { tri: new Float32Array(0), n: 0, at: 0, cx: 0, cy: 0, cz: 0, R: 0, dist: {}, ms: 0, hide: false, turn0: null };
function vwlSkip(m) { return __ZC(349, 0, this, arguments, new.target); }
function vwlGather(x, y, z, R) { return __ZC(349, 1, this, arguments, new.target); }
function vwlReach(fx, fy, fz, tx, ty, tz, pad, R) { return __ZC(349, 2, this, arguments, new.target); }
function vwlView(key, hx, hy, hz, dx, dy, dz, want) { return __ZC(349, 3, this, arguments, new.target); }
function vwlHideMe() { var h = VWL.hide; VWL.hide = false; return h; }
function vwlRot(x, z, a) { var c = Math.cos(a), s = Math.sin(a); return [x * c + z * s, -x * s + z * c]; }
function vwlVrFix() { return __ZC(349, 4, this, arguments, new.target); }
(function () {
if (typeof vrmXrRender !== "function")
return;
var xr = vrmXrRender;
vrmXrRender = function () {
var off = null;
try {
off = vwlVrFix();
}
catch (e) {
off = null;
}
if (!off)
return xr.apply(this, arguments);
var P = camera.position;
P.x += off.x;
P.z += off.z;
try {
return xr.apply(this, arguments);
}
finally {
P.x -= off.x;
P.z -= off.z;
}
};
})();
var FKN = { myFn: null, myG: null, list: [], at: 0, root: null, map: null, near: null, greeted: new WeakSet(), bub: null, bubT: 0, t: 0, held: [] };
(function () { if (typeof worldOff !== "function")
return; var o = worldOff; worldOff = function () { var r = o.apply(this, arguments); FKN.list = []; FKN.root = null; FKN.map = null; FKN.near = null; return r; }; })();
function fknPlaceName() {
var h = (typeof WLD !== "undefined" && WLD.hud && WLD.hud.dataset && WLD.hud.dataset.h) || "";
var t = h.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().split(" · ").pop().trim();
return t || "this world";
}
function fknTalkMap() { return __ZC(349, 5, this, arguments, new.target); }
function fknPeople(root) { return __ZC(349, 6, this, arguments, new.target); }
function fknShown(o) { for (var q = o, i = 0; q && i < 40; q = q.parent, i++) {
if (!q.visible)
return false;
} return true; }
var FKN_V = new THREE.Vector3();
function fknBubble(g, text) { return __ZC(349, 7, this, arguments, new.target); }
var FKN_HI = ["Hello there.", "Well met.", "Good day to you.", "Oh! Hello.", "Welcome, traveller.", "Can I help you?", "Ah, a dreamer.", "Hello, friend."];
function fknGreet(g) {
var T = FKN.map && FKN.map.get(g), seed = String(g.userData.wSeed || ""), h = 0;
for (var i = 0; i < seed.length; i++)
h = (h * 31 + seed.charCodeAt(i)) | 0;
var line = T && T.t && T.t.greet && T.t.greet.length < 42 ? T.t.greet : FKN_HI[Math.abs(h) % FKN_HI.length];
fknBubble(g, line);
}
function fknStranger(g) { return __ZC(349, 8, this, arguments, new.target); }
function fknTick(dt) {
var root = fknRoot();
if (!root) {
FKN.near = null;
fknUnprompt();
return;
}
if (typeof VRM !== "undefined" && VRM.xr && VRM.rest)
return;
if (FKN.bub && (FKN.bubT -= dt) <= 0)
fknBubble(null, null);
FKN.t += dt;
if (FKN.t < 0.1)
return;
var step = FKN.t;
FKN.t = 0;
var P = camera.position, list = fknPeople(root), best = null, bd = 36;
for (var i = 0; i < list.length; i++) {
var g = list[i];
g.getWorldPosition(FKN_V);
var dx = FKN_V.x - P.x, dz = FKN_V.z - P.z, d2 = dx * dx + dz * dz;
if (d2 < bd && Math.abs(FKN_V.y - (P.y - 1.72)) < 3 && fknShown(g)) {
bd = d2;
best = g;
}
}
var near = best && bd < 4.5 * 4.5 ? best : null;
if (near) {
var u = near.userData;
if (u.wan)
u.wan.wait = Math.max(u.wan.wait || 0, 1.2);
if (u.pose !== "sit" && u.pose !== "lie" && !u.fknNoTurn) {
near.getWorldPosition(FKN_V);
var want = Math.atan2(P.x - FKN_V.x, P.z - FKN_V.z), par = near.parent;
if (par) {
var pq = new THREE.Euler().setFromQuaternion(par.getWorldQuaternion(new THREE.Quaternion()), "YXZ");
want -= pq.y;
}
var diff = ((want - near.rotation.y) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI;
near.rotation.y += diff * Math.min(1, step * 5);
}
if (!FKN.greeted.has(near) && bd < 3.6 * 3.6) {
FKN.greeted.add(near);
fknGreet(near);
}
}
FKN.near = near;
var mine = WLD.promptFn && WLD.promptFn === FKN.myFn;
if (near && bd < 2.8 * 2.8 && (!WLD.promptFn || mine) && !(FKN.map && FKN.map.get(near)) && !(typeof talkOpen !== "undefined" && talkOpen) && !(WLD.card && WLD.card.style.display === "block")) {
if (!mine || FKN.myG !== near) {
var st = near.userData.fknT || (near.userData.fknT = fknStranger(near));
FKN.myG = near;
FKN.myFn = function () { fknUnprompt(); wTalk(st); };
worldPrompt("<b>" + esc(st.name) + "</b> · <b>press E</b> to talk", FKN.myFn);
}
}
else if (mine)
fknUnprompt();
}
function fknUnprompt() { if (WLD.promptFn && WLD.promptFn === FKN.myFn)
worldPrompt(null); FKN.myFn = null; FKN.myG = null; }
function fknRoot() {
if (typeof walkMode === "undefined" || !walkMode || typeof WLD === "undefined")
return null;
if (WLD.on)
return WLD.w && WLD.w.g ? WLD.w.g : null;
if (typeof LD !== "undefined" && LD.g && store.here === LD.rid && !store.inside && !(typeof INT !== "undefined" && INT))
return LD.g;
return null;
}
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (!FKN.myFn || WLD.on || WLD.promptFn !== FKN.myFn)
return;
if (/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
if (e.code === "KeyE" || e.code === "Enter") {
e.preventDefault();
e.stopImmediatePropagation();
FKN.myFn();
}
}, true);
(function () {
if (typeof ldTick !== "function")
return;
var lt = ldTick;
ldTick = function (dt) { var r = lt.apply(this, arguments); try {
if (!WLD.on)
fknTick(dt || 0.016);
}
catch (e) { } return r; };
})();
(function () {
if (typeof worldTick !== "function")
return;
var wt = worldTick;
worldTick = function (dt) { var r = wt.apply(this, arguments); try {
fknTick(dt || 0.016);
}
catch (e) {
if (!FKN.warned) {
FKN.warned = 1;
console.warn("folk", e);
}
} return r; };
})();
(function () {
if (typeof wPerson !== "function")
return;
var wp = wPerson;
wPerson = function (seed, o) { var g = wp.apply(this, arguments); try {
if (g && o) {
if (o.title)
g.userData.wTitle = o.title;
if (o.place)
g.userData.wPlace = o.place;
if (o.child)
g.userData.wChild = 1;
}
}
catch (e) { } return g; };
})();
var FKV_ASK = /^(speak|share|answer|reply|never|always|keep|stay|be|do not|don't|use|talk|tell (the|a|any)|if|only|avoid|remember|refer|mention|greet|offer|when (asked|someone|a player|players|the dreamer))\b/i;
var FKV_META = /\b(SomnuMatrix|players?|the dreamer|in character|first person|under \d+ words|\d+ words|family-friendly|every age|roleplay|role-play|an original setting|AI\b|chatbot|this game)\b/i;
var FKV_PREP = /^(the|a|an|to|with|for|of|at|in|on|by|from|into|about|and|or|but|so|too|as|here|there|again|well|now|back|up|down|out|off|away|all|both|no|nothing|anything|something|any|some|this|that|these|those|my|his|her|our|their|its|[^a-z])/i;
function fkvFirst(s) { return __ZC(349, 9, this, arguments, new.target); }
function fkvBare(v) {
var x = { is: "am", has: "have", does: "do", goes: "go" }[v];
if (x)
return x;
if (/ies$/.test(v))
return v.slice(0, -3) + "y";
if (/(ch|sh|ss|x|z|o)es$/.test(v))
return v.slice(0, -2);
return v.slice(0, -1);
}
function fkvFacts(c) { return __ZC(349, 10, this, arguments, new.target); }
function fkvNamePart(c) { var n = String(c.name || ""), i = n.indexOf(","); return i > 0 ? { who: n.slice(0, i).trim(), role: n.slice(i + 1).trim() } : { who: n, role: "" }; }
function fkvNear() { return __ZC(349, 11, this, arguments, new.target); }
function fkvVoice(c, q) { return __ZC(349, 12, this, arguments, new.target); }
(function () {
if (typeof localVoice !== "function")
return;
var lv = localVoice;
localVoice = function (c, q) {
if (c && c.wKey && !c.deity && c.archetype !== "deity" && c.details && c.details[0] && /^(you\b|the |a |an )/i.test(String(c.details[0]).trim())) {
try {
return fkvVoice(c, q);
}
catch (e) { }
}
return lv.apply(this, arguments);
};
})();
