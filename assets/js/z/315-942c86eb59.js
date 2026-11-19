/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(315, function () {
"use strict";
return [
function (key) {
var out = [], m = /^lot:(\d+)$/.exec(key || "");
if (m) {
var id = +m[1], byLot = rsyLotIds(), nm = null;
Object.keys(byLot).forEach(function (n) { if (+byLot[n] === id)
nm = n; });
var h = nm && typeof lotHome === "function" ? lotHome(nm) : null;
if (h)
out.push(h);
}
else {
(store.objects || []).forEach(function (o) { if (o.city && (o.workplace === key || (typeof LL_KEY !== "undefined" && key === LL_KEY && o.label === LL_KEY)) && out.indexOf(o) < 0)
out.push(o); });
}
return out;
},
function (key) {
if (typeof ahPlaceName === "function") {
try {
return ahPlaceName(key);
}
catch (e) { }
}
var m = /^lot:(\d+)$/.exec(key || "");
if (m) {
var id = +m[1], rec = (typeof cityLots !== "undefined" && cityLots || []).filter(function (l) { return l.lot_id === id; })[0];
if (rec)
return rec.business || rec.name;
var byLot = rsyLotIds(), nm = null;
Object.keys(byLot).forEach(function (n) { if (+byLot[n] === id)
nm = n; });
return nm || "this building";
}
return key || "this building";
},
function (arch, c, L) {
var M = RSY_GRAND[arch], role = M && typeof c === "number" ? M[c] : null;
if (!role)
return null;
if (role === "wall2") {
if (!L.wall)
return null;
var w = new THREE.Color(rsySafe(L.wall));
w.multiplyScalar(0.92);
return w.getHex();
}
if (role === "towers" && !L.towers && L.roof)
return rsySafe(L.roof);
return L[role] ? rsySafe(L[role]) : null;
},
function (spec, what) {
var d = rsyDef(spec);
if (!d)
return false;
var ps = d.parts || [];
if (RSY_GRAND[spec.archetype] && (what === "trim" || what === "roof" || what === "towers")) {
var M = RSY_GRAND[spec.archetype];
if (Object.keys(M).some(function (k) { return M[k] === what; }))
return true;
}
if (what === "trim")
return ps.some(function (p) { return p.c === "trim" && !rsyRoofPart(p); });
if (what === "roof")
return ps.some(rsyRoofPart);
if (what === "towers")
return ps.some(function (p) { return (p.g === "cyl" || p.g === "cone" || p.g === "sph") && !p.glow && p.c !== "glass" && p.c !== "dark" && !rsyRoofPart(p); });
if (what === "awning")
return ps.some(function (p) { return p.c === "paint"; });
if (what === "sign")
return !!d.sign;
return true;
},
function (R, spec, L) {
var plan = typeof planOf === "function" ? planOf(spec) : {}, I = spec.inside || {};
var wall0 = (I.wall !== undefined ? I.wall : plan.wall), fk = I.floor || plan.floor;
var floor0 = (typeof FLOORCOL !== "undefined" && FLOORCOL[fk]) || 0x7A5634;
if (wall0 === undefined)
wall0 = 0xDCD4C4;
var wantWall = !!(L.inWall || L.inFin), wantFloor = !!(L.floorCol || L.floor);
if (!wantWall && !wantFloor)
return 0;
var wCol = L.inWall ? rsySafe(L.inWall, 0.78) : (L.inFin && L.inFin !== "paint" && MATCOLOR[RSY_INTEX[L.inFin]]) ? MATCOLOR[RSY_INTEX[L.inFin]] : wall0;
var wTex = L.inFin && RSY_INTEX[L.inFin] && typeof texOf === "function" ? texOf(RSY_INTEX[L.inFin]) : null;
var fCol = L.floorCol ? rsySafe(L.floorCol, 0.78) : (L.floor ? (RSY_FLCOL[L.floor] || floor0) : floor0);
var fTex = L.floor && RSY_FLTEX[L.floor] && typeof texOf === "function" ? texOf(RSY_FLTEX[L.floor]) : null;
var made = new Map(), n = 0, sc = new THREE.Vector3();
R.root.updateMatrixWorld(true);
R.root.traverse(function (o) {
if (!o.isMesh || o.isInstancedMesh || Array.isArray(o.material) || !o.material || !o.material.color)
return;
if (rsyInFurn(o, R.root))
return;
var hex = o.material.color.getHex(), what = null;
if (wantWall && hex === (wall0 & 0xFFFFFF))
what = "w";
else if (wantFloor && hex === (floor0 & 0xFFFFFF))
what = "f";
if (!what)
return;
var key = o.material.uuid + what, m = made.get(key);
if (!m) {
m = o.material.clone();
m.color.setHex(what === "w" ? wCol : fCol);
var t = what === "w" ? wTex : fTex;
if (t) {
m.map = t;
m.needsUpdate = true;
}
else if (what === "w" && L.inFin === "paint" && m.map) {
m.map = null;
m.needsUpdate = true;
}
else if (what === "f" && L.floor === "carpet" && m.map) {
m.map = null;
m.needsUpdate = true;
}
made.set(key, m);
}
var t2 = what === "w" ? wTex : fTex;
if (t2 && o.geometry && typeof wsfUVs === "function") {
var g = o.geometry.clone();
o.getWorldScale(sc);
if (wsfUVs(g, { x: Math.abs(sc.x) || 1, y: Math.abs(sc.y) || 1, z: Math.abs(sc.z) || 1 }))
o.geometry = g;
}
o.material = m;
n++;
});
return n;
},
function (key) {
if (!key)
return;
clearTimeout(RSY.redrawT[key]);
RSY.redrawT[key] = setTimeout(function () {
delete RSY.redrawT[key];
try {
rsySpecsOf(key).forEach(function (s) {
if (!meshes[s.id] || typeof refresh !== "function")
return;
if (typeof BAKE !== "undefined" && typeof bakeChunkKey === "function" && typeof bakeUnbake === "function") {
var bk = bakeChunkKey(s), ch = BAKE.chunks[bk];
if (ch && ch.meshes && ch.meshes.length) {
bakeUnbake(bk);
if (BAKE.queue.indexOf(bk) < 0)
BAKE.queue.unshift(bk);
}
}
refresh(s);
});
if (store.inside && typeof INT !== "undefined" && INT && rsyIntKey() === key && !(typeof wpEditing !== "undefined" && wpEditing) && typeof rebuildHere === "function")
rebuildHere();
}
catch (e) {
if (!RSY.warned && window.console) {
RSY.warned = 1;
console.warn("[restyle] redraw", e);
}
}
}, 120);
},
function () {
var el = document.getElementById("rsy-box");
if (el || !document.body)
return el;
if (!document.getElementById("rsy-css")) {
var st = document.createElement("style");
st.id = "rsy-css";
st.textContent = "#rsy-box{position:fixed;z-index:53;right:calc(12px + env(safe-area-inset-right,0px));top:calc(84px + env(safe-area-inset-top,0px));" +
"width:min(380px,calc(100vw - 32px));max-height:calc(100vh - 170px);overflow-y:auto;-webkit-overflow-scrolling:touch;" +
"background:linear-gradient(180deg,rgba(28,22,14,.96),rgba(10,9,7,.97));border:1px solid #C9A868;border-radius:8px;padding:10px 12px 12px;" +
"color:var(--bone,#C9BEA8);font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);box-sizing:border-box}" +
"@media (max-width:700px){#rsy-box{left:16px;right:16px;width:auto;top:auto;bottom:calc(10px + env(safe-area-inset-bottom,0px));max-height:48vh}}" +
"#rsy-box .btn{margin:2px 4px 2px 0}" +
"#rsy-box .btn.rsy-on{background:#6A4A12!important;border-color:#E8C27A!important}" +
"#rsy-box .rsy-sw{width:34px;height:34px;border-radius:6px;border:2px solid rgba(255,255,255,.18);margin:3px;padding:0;cursor:pointer;vertical-align:middle}" +
"#rsy-box .rsy-sw.rsy-on{border-color:#E8C27A!important;box-shadow:0 0 0 2px rgba(232,194,122,.5)}" +
"#rsy-box .rsy-h{font-size:12px;opacity:.8;margin:8px 0 3px}" +
"#rsy-box input[type=text]{width:100%;box-sizing:border-box;background:#1A140C;color:inherit;border:1px solid #6A5A3A;border-radius:4px;padding:6px;font-size:14px}" +
"#rsy-box input[type=color]{width:40px;height:32px;border:1px solid #6A5A3A;background:#1A140C;padding:1px;vertical-align:middle;border-radius:4px}";
document.head.appendChild(st);
}
el = document.createElement("div");
el.id = "rsy-box";
el.style.display = "none";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", rsyClick);
el.addEventListener("input", function (e) {
var t = e.target;
if (t.id === "rsy-sign") {
rsySet("sign", t.value.slice(0, 40), true);
}
if (t.getAttribute && t.getAttribute("data-rsycol"))
rsySet(t.getAttribute("data-rsycol"), String(t.value).toUpperCase());
});
document.body.appendChild(el);
return el;
},
function (colKey, pal, cur) {
return pal.map(function (p) {
var on = cur && cur.toUpperCase() === p[1].toUpperCase();
return "<button class='rsy-sw" + (on ? " rsy-on" : "") + "' data-rsy='col' data-k='" + colKey + "' data-v='" + p[1] + "' title='" + esc(p[0]) + "' aria-label='" + esc(p[0]) + "' style='background:" + p[1] + "'></button>";
}).join("");
},
function () {
var D = RSY.draft || {}, dirty = JSON.stringify(D) !== JSON.stringify(RSY.saved || {});
var h = "<div style='display:flex;align-items:center;gap:8px;margin-bottom:6px'><b style='font-size:15px;flex:1'>🎨 Restyle · " + esc(rsyName(RSY.key)) + "</b>" + rsyBtnH("x", "Close") + "</div>";
if (RSY.list)
return h + rsyListHtml();
var mine = rsyMyKeys().indexOf(RSY.key) >= 0;
h += "<div style='font-size:12px;opacity:.8;margin-bottom:6px'>" + (mine ? "Your building. What you pick shows at once; press Save and everyone sees it." :
"As the Keeper you can restyle any building in Somnucor; your word overrides the owner's.") + "</div>";
if (RSY.missing)
h += "<div style='margin:4px 0 8px;padding:5px 8px;border:1px solid rgba(232,194,122,.4);border-radius:4px'>" +
esc(typeof notOpenYet === "function" ? notOpenYet("Restyling opens soon. You can try looks now; saving waits for the city's next update.", "Saving needs the latest server update in Supabase.") : "Saving opens soon.") + "</div>";
h += "<div style='margin-bottom:6px'>" + rsyBtnH("tab", RSY.tab === "out" ? "<b>Outside</b>" : "Outside", " data-t='out'", RSY.tab === "out") + rsyBtnH("tab", RSY.tab === "in" ? "<b>Inside</b>" : "Inside", " data-t='in'", RSY.tab === "in") + "</div>";
var parts = rsyParts(), P = parts.filter(function (p) { return p.k === RSY.part; })[0] || parts[0];
if (P)
RSY.part = P.k;
h += "<div style='margin-bottom:4px'>" + parts.map(function (p) {
var set = (p.col && D[p.col]) || (p.fin && D[p.fin]) || (p.sign && (D.sign || D.signFg || D.signBg));
return rsyBtnH("part", p.n + (set ? " •" : ""), " data-p='" + p.k + "'", p === P);
}).join("") + "</div>";
if (P) {
if (P.sign) {
h += "<div class='rsy-h'>Words on the sign (up to 40 letters; blank keeps the name)</div><input id='rsy-sign' type='text' maxlength='40' value='" + esc(D.sign || "") + "' placeholder='" + esc(rsyName(RSY.key)) + "'>";
h += "<div class='rsy-h'>Letters</div>" + rsySwatches("signFg", RSY_SIGNFG, D.signFg);
h += "<div class='rsy-h'>Board</div>" + rsySwatches("signBg", RSY_SIGNBG, D.signBg);
h += "<div>" + rsyBtnH("clr", "As built", " data-k='sign'") + "</div>";
}
else {
if (P.col) {
h += "<div class='rsy-h'>" + esc(P.colName || "Colour") + "</div>" + rsySwatches(P.col, RSY_PAL, D[P.col]);
h += "<div style='margin-top:4px'><label style='font-size:12px;opacity:.85'>Any colour <input type='color' data-rsycol='" + P.col + "' value='" + (D[P.col] || "#8C877E").toLowerCase() + "'></label> " +
rsyBtnH("clr", "As built", " data-k='" + P.col + "'", !D[P.col]) + "</div>";
}
if (P.fin) {
h += "<div class='rsy-h'>" + (P.k === "door" ? "Style" : P.k === "win" ? "Style" : "Made of") + "</div>" + P.list.map(function (f) { return rsyBtnH("fin", esc(f[1]), " data-k='" + P.fin + "' data-v='" + f[0] + "'", D[P.fin] === f[0]); }).join("") +
rsyBtnH("clr", "As built", " data-k='" + P.fin + "'", !D[P.fin]);
}
}
}
if (RSY.say)
h += "<div style='margin:8px 0 2px;padding:5px 8px;border:1px solid rgba(232,194,122,.4);border-radius:4px'>" + esc(RSY.say) + "</div>";
h += "<div style='margin-top:10px;border-top:1px solid rgba(201,168,104,.3);padding-top:8px'>" +
rsyBtnH("save", RSY.saving ? "Saving…" : "💾 Save for everyone", (dirty && !RSY.saving ? "" : " disabled")) +
rsyBtnH("undo", "↩ Undo changes", dirty ? "" : " disabled") +
rsyBtnH("reset", "🏗️ All as built", rsyLookEmpty(D) ? " disabled" : "") +
(rsyMyKeys().length > 1 || rsyKeeper() ? rsyBtnH("list", "Your buildings") : "") + "</div>";
return h;
},
function () {
var keys = rsyMyKeys();
var h = "<div style='font-size:12px;opacity:.8;margin-bottom:6px'>" + (keys.length ? "The buildings you can restyle. Walk to one (or step inside) and press 🎨 Restyle, or pick it here." :
(rsyKeeper() ? "As the Keeper you can restyle any building: walk up to it and press 🎨 Restyle." : "You have no home or business of your own yet. Whoever owns or rents a home, a shop or a business can restyle it.")) + "</div>";
keys.forEach(function (k) {
h += "<div style='display:flex;align-items:center;gap:6px;margin:3px 0'><span style='flex:1'>" + esc(rsyName(k)) + (RSY.looks[k] ? " <span style='opacity:.7'>· restyled</span>" : "") + "</span>" +
rsyBtnH("pick", "Restyle", " data-k='" + esc(k) + "'") + rsyBtnH("way", "Show the way", " data-k='" + esc(k) + "'") + "</div>";
});
return h;
},
function (e) {
var b = e.target.closest && e.target.closest("[data-rsy]");
if (!b || b.disabled)
return;
var a = b.getAttribute("data-rsy"), k = b.getAttribute("data-k"), v = b.getAttribute("data-v");
if (a === "x")
return rsyClose();
if (a === "tab") {
RSY.tab = b.getAttribute("data-t");
RSY.part = null;
return rsyPaint();
}
if (a === "part") {
RSY.part = b.getAttribute("data-p");
return rsyPaint();
}
if (a === "col" || a === "fin")
return rsySet(k, (RSY.draft && RSY.draft[k] === v && a === "fin") ? null : v);
if (a === "clr") {
if (k === "sign") {
["sign", "signFg", "signBg"].forEach(function (x) { if (RSY.draft)
delete RSY.draft[x]; });
rsyRedraw(RSY.key);
return rsyPaint();
}
return rsySet(k, null);
}
if (a === "undo") {
RSY.draft = JSON.parse(JSON.stringify(RSY.saved || {}));
RSY.say = "Back to the saved look.";
rsyRedraw(RSY.key);
return rsyPaint();
}
if (a === "reset") {
RSY.draft = {};
RSY.say = "Everything as it was built. Press Save to keep it that way.";
rsyRedraw(RSY.key);
return rsyPaint();
}
if (a === "save")
return rsySave();
if (a === "list") {
rsyLeaveDraft();
RSY.list = true;
return rsyPaint();
}
if (a === "pick") {
RSY.list = false;
return rsyOpen(k);
}
if (a === "way")
return rsyWay(k);
},
function (k) {
var s = rsySpecsOf(k)[0];
if (!/^lot:/.test(k) && typeof showTheWay === "function")
showTheWay(k);
else if (s && typeof guideTo !== "undefined") {
var d = rsyDoorOf(s);
guideTo = { key: k, x: d.x, z: d.z };
if (typeof setStatus === "function")
setStatus("<b>" + esc(rsyName(k)) + "</b>: follow the pointer at the top of the screen.");
}
rsyClose();
},
function () {
if (!RSY.key || RSY.saving)
return;
if (!(typeof signedIn === "function" && signedIn())) {
RSY.say = "Sign in first.";
return rsyPaint();
}
var look = JSON.parse(JSON.stringify(RSY.draft || {})), key = RSY.key;
RSY.saving = true;
rsyPaint();
cityRpc("building_look_set", { p_key: key, p_look: look }).then(function (o) {
if (!o || !o.ok) {
RSY.say = (o && o.say) || "That did not save.";
return;
}
var L = o.look || {};
if (rsyLookEmpty(L))
delete RSY.looks[key];
else
RSY.looks[key] = L;
if (RSY.key === key) {
RSY.saved = JSON.parse(JSON.stringify(L));
RSY.draft = JSON.parse(JSON.stringify(L));
}
RSY.say = o.say || "Saved.";
rsyRedraw(key);
}).catch(function (e) {
RSY.say = rsyMissing(e) ? (typeof notOpenYet === "function" ? notOpenYet("Saving opens with the city's next update. Your look shows only to you until then.", "Saving needs the latest server update in Supabase.") : "Saving opens soon.") : String(e && e.message || e);
if (rsyMissing(e))
RSY.missing = true;
}).then(function () { RSY.saving = false; rsyPaint(); });
},
function (key) {
rsyLoadRights().then(function () {
if (key && !rsyMay(key)) {
if (typeof setStatus === "function")
setStatus("Only the owner of this building (or the Keeper) can restyle it.");
return;
}
if (RSY.open && RSY.key !== key)
rsyLeaveDraft();
RSY.open = true;
RSY.list = !key;
RSY.key = key || null;
RSY.say = "";
RSY.tab = store.inside ? "in" : "out";
RSY.part = null;
if (key) {
RSY.saved = JSON.parse(JSON.stringify(RSY.looks[key] || {}));
RSY.draft = JSON.parse(JSON.stringify(RSY.saved));
}
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
rsyPaint();
if (key && typeof setStatus === "function")
setStatus("<b>🎨 Restyle.</b> Pick colours and materials; you see them at once. <b>Save</b> shows them to everyone.");
});
},
function () {
if (!RSY.open)
return;
var unsaved = RSY.key && JSON.stringify(RSY.draft || {}) !== JSON.stringify(RSY.saved || {});
rsyLeaveDraft();
RSY.open = false;
RSY.list = false;
RSY.key = null;
rsyPaint();
if (unsaved && typeof setStatus === "function")
setStatus("Restyle closed without saving: the building is as it was.");
}
];
});
