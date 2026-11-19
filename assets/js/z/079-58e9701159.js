/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(79, function () {
"use strict";
return [
function (key, W, D, asBuilt) {
var wp = WP_BY_KEY[key];
if (!wp || !wp.fit || !wp.fit.length)
return [];
var ground = asBuilt.filter(function (p) { return (p.l || 0) === 0; }), out = [];
function free(x, z) {
if (Math.abs(x) < 2.4 && z > D / 2 - 4.5)
return false;
for (var i = 0; i < ground.length; i++) {
var g = ground[i];
if (Math.hypot(g.x - x, g.z - z) < 1.7)
return false;
}
for (var j = 0; j < out.length; j++) {
var o = out[j];
if (Math.hypot(o.x - x, o.z - z) < 1.9)
return false;
}
return true;
}
var spots = [];
for (var x = -W / 2 + 1.6; x <= W / 2 - 1.6; x += 2.3)
spots.push([x, -D / 2 + 1.1, 0]);
for (var z = -D / 2 + 2.6; z <= D / 2 - 4; z += 2.4) {
spots.push([-W / 2 + 1.1, z, Math.PI / 2]);
spots.push([W / 2 - 1.1, z, -Math.PI / 2]);
}
for (var x2 = -W / 4; x2 <= W / 4; x2 += 3.2)
spots.push([x2, 0, 0]);
var si = 0;
wp.fit.forEach(function (k) {
if (!FURN[k])
return;
while (si < spots.length && !free(spots[si][0], spots[si][1]))
si++;
if (si >= spots.length)
return;
var s = spots[si++];
out.push({ k: k, x: +s[0].toFixed(2), z: +s[1].toFixed(2), r: s[2], l: 0 });
});
return out;
},
function () {
if (!INT)
return;
var spec = INT.spec, P = { x: camera.position.x, y: camera.position.y, z: camera.position.z }, lv = INT.level || 0, un = INT.unlocked;
scene.remove(INT.root);
INT = makeInterior(spec);
scene.add(INT.root);
INT.level = lv;
INT.unlocked = un;
wallsAt = -1;
camera.position.set(P.x, P.y, P.z);
if (typeof bringOccupants === "function")
bringOccupants();
},
function () {
var key = INT && INT.wpKey;
if (!key)
return;
if (!canArrange(key))
return setStatus("Only the keeper, the City planner and the Carpenter rearrange Somnucor's buildings.");
wpEditing = key;
wpDraft = JSON.parse(JSON.stringify(workplaceDecor(key) || INT.asBuilt || []));
if (!WP_DECOR[key])
wpDraft = JSON.parse(JSON.stringify(INT.asBuilt || []));
paintArranger();
paintWorkButton();
},
function (msg) {
var el = wpEl();
if (!el)
return;
if (!wpEditing) {
el.style.display = "none";
return;
}
el.style.display = "block";
el.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">' +
'<b style="color:var(--gold,#C9A868)">Arranging ' + (/^lot:/.test(wpEditing) ? "your home" : esc(wpEditing)) + '</b></div>' +
'<div style="color:var(--dim);font-size:12px;line-height:1.5;margin-bottom:8px">Walk to where you want something and place it; stand by a piece to pick it up, turn it or move it. Nobody else sees a change until you save it — then everybody does.</div>' +
'<div style="display:flex;gap:6px;margin-bottom:6px"><select id="wp-kind" style="flex:1;background:var(--void);border:1px solid var(--line);color:var(--bone);padding:5px">' +
furnList().map(function (k) { return '<option>' + k + '</option>'; }).join("") + '</select>' +
'<button class="btn" id="wp-place">Place here</button></div>' +
'<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">' +
'<button class="btn" id="wp-pick">Pick up nearest</button><button class="btn" id="wp-turn">Turn nearest</button>' +
'<button class="btn" id="wp-move">Move nearest here</button></div>' +
'<div style="display:flex;gap:6px;flex-wrap:wrap">' +
'<button class="btn" id="wp-save">Save for everyone</button><button class="btn" id="wp-built">Back to as built</button>' +
'<button class="btn" id="wp-cancel">Leave it as it was</button></div>' +
'<div id="wp-msg" style="color:var(--dim);font-size:12px;margin-top:8px;min-height:16px">' + (msg ? esc(msg) : (wpDraft.length + " pieces")) + '</div>';
var $ = function (i) { return document.getElementById(i); };
$("wp-place").onclick = function () { wpPlace($("wp-kind").value); };
$("wp-pick").onclick = function () { wpNearest(function (i) { wpDraft.splice(i, 1); return "Picked up."; }); };
$("wp-turn").onclick = function () { wpNearest(function (i) { wpDraft[i].r = +(((wpDraft[i].r || 0) + Math.PI / 4) % (Math.PI * 2)).toFixed(3); return "Turned."; }); };
$("wp-move").onclick = function () { wpNearest(function (i) { var h = wpHere(); wpDraft[i].x = h.x; wpDraft[i].z = h.z; wpDraft[i].l = h.l; return "Moved."; }); };
$("wp-save").onclick = wpSave;
$("wp-built").onclick = function () {
if (!confirm("Put everything back the way the building was first furnished? Saved for everyone at once."))
return;
cityRpc("reset_workplace_decor", { p_key: wpEditing }).then(function (o) {
if (o !== "ok")
return paintArranger(String(o));
WP_DECOR[wpEditing] = null;
wpEditing = null;
wpDraft = null;
rebuildHere();
paintArranger();
paintWorkButton();
setStatus("<b>Back as it was built.</b>");
}).catch(function (e) { paintArranger(e.message); });
};
$("wp-cancel").onclick = function () { wpEditing = null; wpDraft = null; rebuildHere(); paintArranger(); paintWorkButton(); };
},
function () {
var key = wpEditing;
cityRpc("save_workplace_decor", { p_key: key, p_decor: wpDraft }).then(function (o) {
if (o !== "ok")
return paintArranger(String(o));
WP_DECOR[key] = wpDraft.slice();
wpEditing = null;
wpDraft = null;
paintArranger();
paintWorkButton();
setStatus("<b>Saved.</b> Everybody who walks into " + esc(key) + " sees it this way now.");
}).catch(function (e) { paintArranger(e.message); });
},
function (key) {
var W = store.workplaceAt || {};
if (W[key])
return key;
var n = function (t) { return String(t || "").toLowerCase().replace(/^the\s+/, "").replace(/[^a-z0-9]+/g, " ").trim(); }, k = n(key);
if (!k)
return null;
var ks = Object.keys(W), i, part = [];
for (i = 0; i < ks.length; i++)
if (n(ks[i]) === k)
return ks[i];
for (i = 0; i < ks.length; i++) {
var m = n(ks[i]);
if (m.length > 3 && (m.indexOf(k) >= 0 || k.indexOf(m) >= 0))
part.push(ks[i]);
}
return part.length === 1 ? part[0] : null;
},
function (key) {
var k2 = wayKey(key), at = k2 && store.workplaceAt[k2];
if (!at)
return setStatus("🧭 <b>" + esc(key || "That place") + "</b> is not on your city's map yet. Ask at the Office of Arrivals in the Tower, on the Tower Plaza, and they will set you right.");
if (typeof landWalk === "function")
landWalk();
guideTo = { key: k2, x: at.x, z: at.z };
var r = somnucorRealm();
if (r && (store.here || 0) !== r.id && typeof toSomnucor === "function")
toSomnucor();
setStatus("🧭 <b>" + esc(k2) + "</b>: follow the pointer at the top of the screen.");
},
function (only) {
var lots = ((typeof standing !== "undefined" && standing && standing.lots) || []).slice().sort(function (a, b) { return (b.own ? 1 : 0) - (a.own ? 1 : 0); });
for (var i = 0; i < lots.length; i++) {
var n = lots[i].lot;
if (only && n !== only)
continue;
var h = (typeof lotHome === "function" && lotHome(n)) || (typeof awlHomeSpec === "function" && awlHomeSpec(n));
if (h)
return { name: n, spec: h };
}
var rows = (typeof HL !== "undefined" && HL.rows) || [];
for (var j = 0; j < rows.length; j++) {
var r = rows[j];
if (!r.mine)
continue;
if (r.world && r.world !== "somnucor")
return { name: r.name, world: r.world };
var h2 = typeof awlHomeSpec === "function" && awlHomeSpec(r.name);
if (h2)
return { name: r.name, spec: h2 };
}
return null;
},
function (name) {
var H = (name && homeGuideFind(name)) || homeGuideFind();
if (!H) {
if (store.workplaceAt && store.workplaceAt["The Land Office"])
showTheWay("The Land Office");
setStatus("<b>You have no home in Somnucor yet.</b> The Land Office sells and lets them: follow the pointer.");
return;
}
if (!H.spec) {
setStatus("<b>Your home, " + esc(H.name) + ", is in " + esc((typeof HL_WORLD !== "undefined" && HL_WORLD[H.world]) || H.world) + ".</b> The pointer only shows the way in Somnucor.");
return;
}
var at = (typeof awlFront === "function" && awlFront(H.spec)) || { x: H.spec.x, z: H.spec.z };
guideTo = { key: H.name, x: at.x, z: at.z, home: H.spec.id || true };
var r = somnucorRealm();
if (r && (store.here || 0) !== r.id && typeof toSomnucor === "function")
toSomnucor();
setStatus("<b>Home to " + esc(H.name) + "</b> — follow the pointer at the top of the screen.");
},
function (msg, where) {
var g = gaolSpec();
if (!g)
return toYard(msg);
if (!(INT && INT.spec === g))
enterBuilding(g);
INT.level = 0;
wallsAt = -1;
var cells = (INT.spots || []).filter(function (s) { return s.room === (where || "cell"); });
if (!cells.length)
cells = INT.spots || [];
var id = (typeof myUserId === "function" && myUserId()) || "x", hsh = 0;
for (var i = 0; i < id.length; i++)
hsh = (hsh * 31 + id.charCodeAt(i)) >>> 0;
var c = cells[hsh % Math.max(1, cells.length)] || { x: 0, z: 0 };
camera.position.set(INT.ox + c.x, 1.72, INT.oz + c.z);
if (typeof flyY !== "undefined")
flyY = 0;
setStatus(msg);
},
function (p) {
var s = "<b>Held by Somnucor</b> for " + esc(p.crime) + ". ";
if (p.serve_hours)
s += Math.floor((p.served || 0) / 60) + "h " + ((p.served || 0) % 60) + "m of " + p.serve_hours + " hours served. ";
if (p.work_off && p.hours)
s += "Or work it off: " + Math.floor((p.worked || 0) / 60) + "h " + ((p.worked || 0) % 60) + "m of " + p.hours + " hours at the yard benches. ";
return s + "Every moment in the Gaol counts; nothing counts while you are away from Somnucor.";
},
function (msg) {
var r = somnucorRealm();
var mine = (typeof myDoor !== "undefined" && myDoor) ? myDoor : null;
if (mine && typeof toHall === "function") {
toHall();
setTimeout(function () {
var d = (typeof specById === "function") ? specById(mine.id) : null;
d = d || mine;
var out = { x: Math.sin(d.rot || 0), z: Math.cos(d.rot || 0) };
camera.position.set(d.x + out.x * 3, 1.72, d.z + out.z * 3);
if (typeof flyY !== "undefined")
flyY = 0;
setStatus(msg);
}, 60);
return;
}
if (r && typeof beHere === "function")
beHere(r.id);
if (ATLC) {
camera.position.set(ATLC.x, terrainY(ATLC.x, ATLC.z + 56) + 1.72, ATLC.z + 56);
if (typeof flyY !== "undefined")
flyY = 0;
}
setStatus(msg + " (Take a door of your own in the Hall and it is there you will wake.)");
}
];
});
