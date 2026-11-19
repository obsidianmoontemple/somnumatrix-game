/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(104, function () {
"use strict";
return [
function (force) {
if (!(typeof signedIn === "function" && signedIn()))
return Promise.resolve(null);
if (!force && Date.now() - EYD.at < 90000)
return Promise.resolve(EYD.board);
EYD.at = Date.now();
return cityRpc("eyrie_decor_board").then(function (rows) {
var before = JSON.stringify(EYD.board), b = {};
(rows || []).forEach(function (r) { if (Array.isArray(r.decor))
b[r.apartment] = r.decor; });
EYD.board = b;
if (before !== JSON.stringify(b) && eydInEyrie() && !EYD.edit && typeof rebuildHere === "function")
rebuildHere();
return b;
}).catch(function () { return null; });
},
function (I, p, f) {
if (!FURN[p.k])
return;
var F = I.floor || 3.7, it = FURN[p.k]();
it.userData.furn = p.k;
it.userData.eyd = 1;
it.position.set(p.x, f * F, p.z);
it.rotation.y = p.r || 0;
I.root.add(it);
if (SOLIDFURN[p.k]) {
var bb = furnBox(p.k), c = Math.abs(Math.cos(p.r || 0)), s = Math.abs(Math.sin(p.r || 0));
I.walls.push({ x: I.ox + p.x, z: I.oz + p.z, rot: 0, hw: (c * bb[0] + s * bb[1]) / 2, hd: (s * bb[0] + c * bb[1]) / 2, h: 1.2, level: f });
}
},
function (I) {
var F = I.floor || 3.7, top = Math.min((I.levels || 1) - 1, EYRIE_FLOORS);
for (var f = 1; f <= top; f++)
for (var s = 0; s < 4; s++) {
var lay = eydLayout(eydNum(f, s)) || eydDesigned(eydNum(f, s), I);
if (!lay)
continue;
var gone = [];
for (var i = I.root.children.length - 1; i >= 0; i--) {
var it = I.root.children[i], k = it.userData && it.userData.furn;
if (!k || it.userData.eyd || k === "stairs" || k === "spiralstair" || FIXED_FURN[k])
continue;
if (Math.round(it.position.y / F) !== f || eydSide(it.position.x, it.position.z, I.D) !== s)
continue;
I.root.remove(it);
gone.push(it.position);
}
if (gone.length)
I.walls = I.walls.filter(function (w) {
if (w.level !== f || w.h !== 1.2)
return true;
return !gone.some(function (p) { return Math.abs(w.x - I.ox - p.x) < 0.01 && Math.abs(w.z - I.oz - p.z) < 0.01; });
});
lay.forEach(function (p) { if (eydSide(p.x, p.z, I.D) === s)
eydPut(I, p, f); });
}
},
function () {
var el = document.getElementById("eyd-edit");
if (el || !document.body)
return el;
el = document.createElement("div");
el.id = "eyd-edit";
el.style.cssText = "position:fixed;left:12px;top:calc(96px + env(safe-area-inset-top,0px));z-index:47;display:none;width:min(320px,calc(100vw - 24px));" +
"max-height:calc(100vh - 200px);overflow:auto;background:rgba(8,10,16,.96);border:1px solid #C9A040;border-radius:6px;padding:12px;font:13px var(--sans);color:var(--bone)";
document.body.appendChild(el);
["keydown", "keyup", "keypress"].forEach(function (k) { el.addEventListener(k, function (e) { if (/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))
e.stopPropagation(); }); });
return el;
},
function (n, I) {
I = I || INT;
if (!I || !n)
return null;
var S = eyrieSlot(n), R = eydRoom(S.side, I.W || 20, I.D || 20), sd = R.x0 > 0 ? 1 : -1;
var near = sd > 0 ? R.x0 : R.x1, far = sd > 0 ? R.x1 : R.x0, xc = (R.x0 + R.x1) / 2, z0 = R.z0, z1 = R.z1;
return [
{ k: "bed", x: far - sd * 1.15, z: z0 + 1.2, r: 0 },
{ k: "lamp", x: far - sd * 2.4, z: z0 + 0.45, r: 0 },
{ k: "wardrobe", x: near + sd * 1.5, z: z0 + 0.4, r: 0 },
{ k: "painting", x: xc, z: z0 + 0.15, r: 0 },
{ k: "rug", x: xc + sd * 0.4, z: z0 + 3.3, r: 0 },
{ k: "sofa", x: near + sd * 2.4, z: z1 - 0.55, r: Math.PI },
{ k: "table", x: near + sd * 2.4, z: z1 - 2.0, r: 0 },
{ k: "chair", x: far - sd * 1.3, z: z1 - 1.9, r: sd > 0 ? -Math.PI / 2 : Math.PI / 2 }
];
},
function (msg) {
var el = eydEl();
if (!el)
return;
if (!EYD.edit) {
el.style.display = "none";
return;
}
var n = EYD.edit, S = eyrieSlot(n), mine = CORP.data && CORP.data.apartment === n;
el.style.display = "block";
el.innerHTML = '<b style="color:#E8C27A">Furnishing ' + (mine ? "your apartment" : "apartment " + n) + '</b>' +
'<div style="color:var(--dim);font-size:12px;line-height:1.5;margin:6px 0 8px">Floor ' + (S.f + 1) + ', ' + EYD_SIDE[S.side] + ' off the corridor. ' +
'Walk to where you want something and place it; stand by a piece to turn it, move it or pick it up. Nobody sees a change until you save it.</div>' +
'<div style="display:flex;gap:6px;margin-bottom:6px"><select id="eyd-kind" style="flex:1;min-width:0;background:var(--void);border:1px solid var(--line);color:var(--bone);padding:5px">' +
furnList().map(function (k) { return '<option>' + k + '</option>'; }).join("") + '</select>' +
'<button class="btn" id="eyd-place">Place here</button></div>' +
'<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">' +
'<button class="btn" id="eyd-turn">Turn nearest</button><button class="btn" id="eyd-move">Move nearest here</button>' +
'<button class="btn" id="eyd-pick">Pick up nearest</button></div>' +
'<div style="display:flex;gap:6px;flex-wrap:wrap">' +
'<button class="btn" id="eyd-save">Save</button><button class="btn" id="eyd-built">Back to as built</button>' +
'<button class="btn" id="eyd-cancel">Leave it as it was</button></div>' +
'<div id="eyd-msg" style="color:var(--dim);font-size:12px;margin-top:8px;min-height:16px">' + esc(msg || (EYD.draft.length + " pieces")) + '</div>';
var $ = function (i) { return document.getElementById(i); };
$("eyd-place").onclick = function () { eydPlace($("eyd-kind").value); };
$("eyd-turn").onclick = function () { eydNearest(function (i) { EYD.draft[i].r = +(((EYD.draft[i].r || 0) + Math.PI / 4) % (Math.PI * 2)).toFixed(3); return "Turned."; }); };
$("eyd-move").onclick = function () {
var h = eydSpot();
if (typeof h === "string")
return eydPaint(h);
eydNearest(function (i) { EYD.draft[i].x = h.x; EYD.draft[i].z = h.z; return "Moved."; });
};
$("eyd-pick").onclick = function () { eydNearest(function (i) { EYD.draft.splice(i, 1); return "Picked up."; }); };
$("eyd-save").onclick = function () { eydSave(EYD.draft); };
$("eyd-built").onclick = function () {
if (!confirm("Put this apartment back the way it was first furnished?"))
return;
eydSave(null);
};
$("eyd-cancel").onclick = eydStop;
},
function () {
var S = eyrieSlot(EYD.edit), h = wpHere();
if (h.l !== S.f)
return "You are on another floor: your apartment is on floor " + (S.f + 1) + ".";
if (eydSide(h.x, h.z) !== S.side)
return "That is outside this apartment: it is " + EYD_SIDE[S.side] + " off the corridor.";
var R = eydRoom(S.side, INT.W, INT.D);
if (h.x < R.x0 + 0.45 || h.x > R.x1 - 0.45 || h.z < R.z0 + 0.45 || h.z > R.z1 - 0.45)
return "Too close to the wall: step back a little.";
return h;
},
function (fn) {
var S = eyrieSlot(EYD.edit), h = wpHere(), best = -1, bd = 3.2;
if (h.l !== S.f)
return eydPaint("You are on another floor: your apartment is on floor " + (S.f + 1) + ".");
EYD.draft.forEach(function (p, i) { var d = Math.hypot(p.x - h.x, p.z - h.z); if (d < bd) {
bd = d;
best = i;
} });
if (best < 0)
return eydPaint("Nothing close enough: stand right by it.");
var m = fn(best);
rebuildHere();
eydPaint(m);
},
function (decor) {
var n = EYD.edit, args = { p_decor: decor };
if (!(CORP.data && CORP.data.apartment === n))
args.p_apartment = n;
eydPaint("Saving…");
cityRpc("save_eyrie_decor", args).then(function (o) {
if (o !== "ok")
return eydPaint(String(o));
if (decor)
EYD.board[n] = decor.slice();
else
delete EYD.board[n];
EYD.at = Date.now();
EYD.edit = 0;
EYD.draft = null;
rebuildHere();
eydPaint();
setStatus(decor ? "<b>Saved.</b> Your apartment stays this way, and everyone who comes up sees it." : "<b>Back as it was first furnished.</b>");
}).catch(function (e) {
var m = String(e && e.message || e);
eydPaint(/function|schema|not find|404/i.test(m) ? "The server is not ready to keep apartment furniture yet." : m);
});
},
function (el, I, key) {
var chip = document.getElementById("eyd-chip");
if (!chip && document.body) {
chip = document.createElement("button");
chip.id = "eyd-chip";
chip.type = "button";
chip.style.cssText = "position:fixed;left:50%;transform:translateX(-50%);bottom:86px;z-index:40;display:none;background:rgba(14,16,22,.88);color:#F4E2B8;" +
"border:1px solid #C9A040;border-radius:16px;padding:5px 12px;font:600 13px var(--sans,system-ui);cursor:pointer";
chip.textContent = "🏠 Eyrie: way out, balcony, furnishing";
chip.onclick = function (e) { e.stopPropagation(); EYD_FOLD.openAt = Date.now(); EYD_FOLD.openFor = 30000; if (typeof eyriePanel === "function" && INT)
eyriePanel(INT); };
document.body.appendChild(chip);
}
if (!I) {
if (chip)
chip.style.display = "none";
return;
}
if (key !== EYD_FOLD.key) {
EYD_FOLD.key = key;
EYD_FOLD.openAt = Date.now();
EYD_FOLD.openFor = 9000;
}
var open = EYD.edit || Date.now() - EYD_FOLD.openAt < EYD_FOLD.openFor;
el.style.display = open ? "block" : "none";
if (chip)
chip.style.display = open ? "none" : "block";
},
function (n) {
if (!eydInEyrie() || !n)
return false;
var S = eyrieSlot(n), F = INT.floor || 3.7, f = Math.min(S.f, (INT.levels || 1) - 1);
if (f !== S.f)
return false;
var R = eydRoom(S.side, INT.W, INT.D), x = (R.x0 > 0 ? R.x0 + 1.4 : R.x1 - 1.4), z = (R.z0 + R.z1) / 2;
INT.level = f;
camera.position.set(INT.ox + x, 1.72 + f * F, INT.oz + z);
wallsAt = -1;
yaw = R.x0 > 0 ? -Math.PI / 2 : Math.PI / 2;
return true;
}
];
});
