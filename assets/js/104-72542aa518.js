/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var EYD = { board: {}, at: 0, edit: 0, draft: null };
var EYD_SIDE = ["the front room on the right", "the back room on the right", "the back room on the left", "the front room on the left"];
var EYD_HALL = 5.2, EYD_RD = 6;
if (typeof PLANS !== "undefined")
PLANS.eyrie = { mode: "mixed", ground: "lobby", w: 20, d: 20, upper: ["quarters", "quarters", "quarters", "quarters"],
wall: 0xD8D2C6, floor: "wood", lift: true };
if (typeof ROOMFURN !== "undefined")
ROOMFURN.quarters = ["bed", "wardrobe", "sofa", "table", "chair", "lamp", "rug", "painting"];
if (typeof ROOMNAME !== "undefined")
ROOMNAME.quarters = "an officer's quarters";
function eydSide(x, z, D) {
D = D || (INT && INT.D) || 20;
if (Math.abs(x) < EYD_HALL / 2)
return -1;
var row = Math.floor((z + D / 2) / EYD_RD);
if (row !== 0 && row !== 1)
return -1;
if (x > 0)
return row === 1 ? 0 : 1;
return row === 0 ? 2 : 3;
}
function eydRoom(s, W, D) {
var sd = (s <= 1) ? 1 : -1, row = (s === 0 || s === 3) ? 1 : 0, z0 = -D / 2 + row * EYD_RD;
return { x0: sd > 0 ? EYD_HALL / 2 : -W / 2, x1: sd > 0 ? W / 2 : -EYD_HALL / 2, z0: z0, z1: z0 + EYD_RD };
}
function eydNum(f, s) { return (f < 1 || f > EYRIE_FLOORS || s < 0) ? 0 : (f - 1) * 4 + s + 1; }
function eydInEyrie() { return !!(store.inside && typeof INT !== "undefined" && INT && INT.spec && INT.spec.eyrie); }
function eydHereNum() {
if (!eydInEyrie())
return 0;
return eydNum(INT.level || 0, eydSide(camera.position.x - INT.ox, camera.position.z - INT.oz));
}
function eydMayArrange(n) {
if (!n)
return false;
if (typeof heldNow === "function" && heldNow())
return false;
if (typeof amKeeper === "function" && amKeeper())
return true;
return !!(CORP.data && CORP.data.apartment === n && amCorp());
}
function eydLayout(n) {
if (EYD.edit === n && EYD.draft)
return EYD.draft;
var d = EYD.board[n];
return Array.isArray(d) ? d : null;
}
function eydLoad(force) { return __ZC(104, 0, this, arguments, new.target); }
function eydPut(I, p, f) { return __ZC(104, 1, this, arguments, new.target); }
function eydDress(I) { return __ZC(104, 2, this, arguments, new.target); }
(function () {
if (typeof makeInterior !== "function")
return;
var mk = makeInterior;
makeInterior = function (spec) {
var I = mk.apply(this, arguments);
if (spec && spec.eyrie && I && I.root)
try {
eydDress(I);
}
catch (e) {
if (window.console)
console.warn("eyrie-home:", e);
}
return I;
};
})();
function eydEl() { return __ZC(104, 3, this, arguments, new.target); }
function eydDesigned(n, I) { return __ZC(104, 4, this, arguments, new.target); }
function eydAsBuilt(n) {
var d = eydDesigned(n);
if (d)
return d;
var S = eyrieSlot(n);
return (INT.asBuilt || []).filter(function (p) {
return (p.l || 0) === S.f && eydSide(p.x, p.z) === S.side && p.k !== "stairs" && p.k !== "spiralstair" && !FIXED_FURN[p.k];
}).map(function (p) { return { k: p.k, x: p.x, z: p.z, r: p.r || 0 }; });
}
function eydStart(n) {
n = n || eydHereNum();
if (!eydMayArrange(n))
return setStatus("Only the officer who lives here, or the Keeper, may furnish this apartment.");
EYD.edit = n;
EYD.draft = JSON.parse(JSON.stringify(EYD.board[n] || eydAsBuilt(n)));
eydPaint();
}
function eydStop() { EYD.edit = 0; EYD.draft = null; if (typeof rebuildHere === "function")
rebuildHere(); eydPaint(); }
function eydPaint(msg) { return __ZC(104, 5, this, arguments, new.target); }
function eydSpot() { return __ZC(104, 6, this, arguments, new.target); }
function eydPlace(k) {
if (!FURN[k])
return;
if (EYD.draft.length >= 120)
return eydPaint("That is as much as one apartment can hold.");
var h = eydSpot();
if (typeof h === "string")
return eydPaint(h);
EYD.draft.push({ k: k, x: h.x, z: h.z, r: h.r });
rebuildHere();
eydPaint(k + " placed.");
}
function eydNearest(fn) { return __ZC(104, 7, this, arguments, new.target); }
function eydSave(decor) { return __ZC(104, 8, this, arguments, new.target); }
(function () {
if (typeof eyriePanel !== "function")
return;
var ep = eyriePanel;
eyriePanel = function (I) {
ep(I);
if (I && !EYD.at)
eydLoad();
try {
if (I && !(CORP.data && CORP.data.apartment) && amCorp() && typeof corpRefresh === "function")
corpRefresh();
}
catch (e) { }
var el = document.getElementById("eyrie-panel");
if (!I || !el)
return;
var lvl = I.level || 0, here = eydHereNum(), mine = CORP.data && CORP.data.apartment, S = mine ? eyrieSlot(mine) : null;
var x = "";
if (EYD.edit)
x = '<div style="margin-top:6px;color:var(--dim)">Furnishing: use the panel on the left.</div>';
else if (mine && amCorp()) {
x = '<div style="margin-top:6px">' + (here === mine ? 'You are in your rooms. ' : '') + '<button class="btn" id="eyd-go">🛋 Furnish your apartment</button></div>';
}
else if (here && typeof amKeeper === "function" && amKeeper())
x = '<div style="margin-top:6px"><button class="btn" id="eyd-go">🛋 Furnish apartment ' + here + '</button></div>';
var key = (el.dataset.k || "") + "|" + x;
if (el.dataset.k2 !== key) {
var old = document.getElementById("eyd-extra");
if (old)
old.remove();
if (x) {
var d = document.createElement("div");
d.id = "eyd-extra";
d.innerHTML = x;
el.appendChild(d);
var b = document.getElementById("eyd-go");
if (b)
b.onclick = function () { if (mine && amCorp() && here !== mine)
eydGoHome(mine); eydStart(here === mine || !(mine && amCorp()) ? here : mine); };
}
el.dataset.k2 = key;
}
eydFold(el, I, lvl + "|" + here + "|" + mine + "|" + (EYD.edit ? 1 : 0));
};
})();
var EYD_FOLD = { key: "", openAt: 0, openFor: 9000 };
function eydFold(el, I, key) { return __ZC(104, 9, this, arguments, new.target); }
(function () {
if (typeof eyriePanel !== "function")
return;
var ep2 = eyriePanel;
eyriePanel = function (I) { var r = ep2.apply(this, arguments); if (!I) {
var c = document.getElementById("eyd-chip");
if (c)
c.style.display = "none";
EYD_FOLD.key = "";
} return r; };
})();
function eydGoHome(n) { return __ZC(104, 10, this, arguments, new.target); }
(function () {
if (typeof eyrieLand !== "function")
return;
var el = eyrieLand;
eyrieLand = function (B) {
var r = el.apply(this, arguments);
try {
var mine = CORP.data && CORP.data.apartment;
if (mine && eydGoHome(mine))
setStatus("<b>Home.</b> " + esc(myDragon().name) + " settles on the balcony. You are in your apartment: 🛋 Furnish your apartment is on the panel below.");
}
catch (e) { }
return r;
};
})();
setInterval(function () {
try {
if (eydInEyrie() && !(CORP.data && CORP.data.apartment) && amCorp() && typeof corpRefresh === "function")
corpRefresh();
}
catch (e) { }
}, 4000);
setInterval(function () {
if (EYD.edit && !eydInEyrie()) {
EYD.edit = 0;
EYD.draft = null;
eydPaint();
}
if (eydInEyrie())
eydLoad();
}, 3000);
