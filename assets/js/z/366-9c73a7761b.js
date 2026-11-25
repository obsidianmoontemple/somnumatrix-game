/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(366, function () {
return [
function (ms, day) {
var d = new Date(ms + SCP_UTC * 3600000), h = d.getUTCHours(), mi = d.getUTCMinutes();
return (day ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getUTCDay()] + " " + d.getUTCDate() + " " + ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][d.getUTCMonth()] + ", " : "") + ((h + 11) % 12 + 1) + ":" + (mi < 10 ? "0" : "") + mi + (h < 12 ? " am" : " pm");
},
function (look, seed) {
var L = look && typeof look === "object" ? JSON.parse(JSON.stringify(look)) : (typeof blankLook === "function" ? blankLook("human") : {});
if (typeof fillLook === "function")
fillLook(L, String(seed || "scp"));
var sp = L.species, o = sp && typeof SPECIES_FEATS !== "undefined" && SPECIES_FEATS[sp];
var spec = { id: "scp_" + seed, archetype: "human", attrs: {}, look: L, solid: false, detail: scpLite() ? 3 : 4, nights: [], city: true };
var g = buildFigure(spec, 1);
if (o && typeof dressFolk === "function") {
try {
dressFolk(g, spec, 1, o);
if (o.hover)
g.children[0].position.y += o.hover;
}
catch (e) { }
}
g.traverse(function (m) { m.raycast = function () { }; });
return g;
},
function (i) {
var G = SCP_GUISE[i % SCP_GUISE.length], L = (typeof randomLook === "function") ? randomLook("scp_guise" + i, "human") : {};
L.sex = i % 2 ? "m" : "f";
L.top = G.top;
L.topKind = G.topKind || null;
L.bottom = G.bottom;
L.layer = G.layer || null;
L.layerColor = G.layerColor;
L.hat = G.hat || null;
L.hatColor = G.hatColor;
L.back = G.back || null;
L.backColor = G.backColor;
L.neck = G.neck || null;
L.face = null;
if (G.skin != null)
L.skin = G.skin;
if (G.shoes != null)
L.shoes = G.shoes;
if (G.sp)
L.species = G.sp;
var g = scpFigure(L, "guise" + i);
if (G.pumpkin) {
var pk = new THREE.Mesh(new THREE.SphereGeometry(0.24, 14, 10), new THREE.MeshLambertMaterial({ color: 0xE8701A }));
pk.scale.set(1.15, 0.9, 1.1);
pk.position.set(0, 1.66, 0);
var fc = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.34), new THREE.MeshBasicMaterial({ map: typeof shcFaceTex === "function" ? shcFaceTex(i) : null, transparent: true, depthWrite: false }));
fc.position.set(0, 1.66, 0.255);
var st = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 0.1, 6), new THREE.MeshLambertMaterial({ color: 0x3A6A20 }));
st.position.set(0, 1.88, 0);
[pk, fc, st].forEach(function (m) { m.raycast = function () { }; g.add(m); });
}
if (i % 2 === 0) {
var pole = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 1.5, 5), new THREE.MeshLambertMaterial({ color: 0x3A2A1A }));
pole.position.set(0.34, 1.2, 0.2);
var lamp = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), new THREE.MeshBasicMaterial({ color: 0xFFA040 }));
lamp.position.set(0.34, 1.98, 0.2);
[pole, lamp].forEach(function (m) { m.raycast = function () { }; g.add(m); });
}
return g;
},
function (root) {
try {
root.updateMatrixWorld(true);
var inv = new THREE.Matrix4().copy(root.matrixWorld).invert ? new THREE.Matrix4().copy(root.matrixWorld).invert() : new THREE.Matrix4().getInverse(root.matrixWorld);
var keep = [];
var lm = root.userData.limbs;
if (lm && typeof lm === "object")
["ll", "rl", "la", "ra"].forEach(function (k) { if (lm[k])
keep.push(lm[k]); });
function kept(o) { for (var p = o; p && p !== root; p = p.parent) {
if (keep.indexOf(p) >= 0)
return true;
var u = p.userData || {};
if (u.bat != null || u.orbit != null || u.bub != null || u.ghost || u.sail || u.cape || u.noBake)
return true;
} return false; }
var groups = {}, order = [];
root.traverse(function (m) {
if (!m.isMesh || m.isInstancedMesh || m.isSkinnedMesh || Array.isArray(m.material) || !m.visible || kept(m))
return;
var mt = m.material;
if (!mt || mt.vertexColors || mt.morphTargets)
return;
var g = m.geometry;
if (!g || !g.attributes || !g.attributes.position)
return;
if (!groups[mt.uuid]) {
groups[mt.uuid] = { mat: mt, list: [] };
order.push(mt.uuid);
}
groups[mt.uuid].list.push(m);
});
order.forEach(function (id) {
var G = groups[id];
if (G.list.length < 2)
return;
var parts = [], n = 0, uv = true;
G.list.forEach(function (m) {
var g = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone();
var mx = new THREE.Matrix4().multiplyMatrices(inv, m.matrixWorld);
g.applyMatrix4(mx);
if (!g.attributes.normal)
g.computeVertexNormals();
if (!g.attributes.uv)
uv = false;
parts.push(g);
n += g.attributes.position.count;
});
var pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), uvs = uv ? new Float32Array(n * 2) : null, o = 0;
parts.forEach(function (g) { var c = g.attributes.position.count; pos.set(g.attributes.position.array.subarray(0, c * 3), o * 3); nor.set(g.attributes.normal.array.subarray(0, c * 3), o * 3); if (uvs)
uvs.set(g.attributes.uv.array.subarray(0, c * 2), o * 2); o += c; g.dispose(); });
var bg = new THREE.BufferGeometry();
bg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
bg.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
if (uvs)
bg.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
bg.computeBoundingSphere();
var mm = new THREE.Mesh(bg, G.mat);
mm.userData.scpMine = 1;
mm.raycast = function () { };
mm.renderOrder = G.list[0].renderOrder;
G.list.forEach(function (m) { if (m.parent)
m.parent.remove(m); });
root.add(mm);
});
}
catch (e) {
if (window.console && !SCP.bakeWarn) {
SCP.bakeWarn = 1;
console.warn("costume contest: bake", e);
}
}
return root;
},
function (id, look, name, w) {
var p = scpPic(id, look, name), s = w || 84;
return "<img data-scp-pic='" + scpE(id) + "' alt='' src='" + (p && p !== "x" ? p : "data:image/gif;base64,R0lGODlhAQABAAAAACw=") + "' style='width:" + s + "px;height:" + Math.round(s * 4 / 3) + "px;border-radius:4px;background:#1A1020;border:1px solid #5A3A6A;display:block;margin:0 auto'>";
},
function () {
if (typeof worldCard !== "function")
return;
if (Date.now() - SCP.at > 15000 && !SCP.busy)
scpLoad(true).then(function () { if (scpCardOpen())
scpCard(); });
var r = scpRules(), ph = scpPhase(), st = SCP.st, keeper = scpKeeper(), fns = {}, h = "", tab = SCP.tab || "grand", minor = scpMinor();
var pa = scpMs("parade_at"), ca = scpMs("catwalk_at");
var head = { enter: "Entries are open: come as you are, in costume", parade: "🎺 The Spooks Parade is going round the city now!", catwalk: "✨ The Catwalk is on, on the stage in the Tower Plaza",
votes: "Entries have closed. Vote for your favourites", crowned: "🏆 The winners are crowned!", before: "Coming on Samhain, 31 October", after: "Samhain is over for this year", off: "Not on just now" }[ph] || "";
h += "<div style='font:600 17px var(--serif,Georgia);color:#FFB050'>🎭 The Samhain Costume Contest</div><div style='opacity:.85;margin-bottom:6px'>" + scpE(head) + "</div>";
if (SCP.msg)
h += "<div style='margin:6px 0;padding:6px 8px;border-radius:4px;background:" + (SCP.bad ? "rgba(200,60,60,.18)" : "rgba(255,160,60,.14)") + "'>" + SCP.msg + "</div>";
var rows = [["Enter", "Free, until " + scpClock(scpMs("enter_ends")) + ": wear your costume and enter here"],
["Spooks Parade", scpClock(pa) + " to " + scpClock(pa + r.parade_min * 60000) + ", round " + (typeof evtRingName === "function" ? evtRingName(r.ring) : "the city") + ": walk with it for a ribbon"],
["Catwalk", scpClock(ca) + " to " + scpClock(ca + r.catwalk_min * 60000) + ", the stage in the Tower Plaza"],
["Votes close", scpClock(scpMs("votes_end"))], ["Crowning", scpClock(scpMs("crown_at")) + ", on the stage, and every dreamer is told"]];
h += "<table style='width:100%;border-collapse:collapse;font-size:12px;margin:2px 0 4px'>" + rows.map(function (q) { return "<tr><td style='opacity:.7;padding:1px 8px 1px 0;vertical-align:top;white-space:nowrap'>" + scpE(q[0]) + "</td><td>" + scpE(q[1]) + "</td></tr>"; }).join("") + "</table>";
var lp = scpLocal(pa);
h += "<div style='opacity:.6;font-size:11px;margin-bottom:6px'>All times " + SCP_TZ + (lp ? "; the parade sets off at " + scpE(lp.replace(/^ \(your time (.*)\)$/, "$1")) + " your time" : "") + ".</div>";
if (SCP.missing && !keeper)
h += "<div style='opacity:.8'>The contest opens very soon. The parade goes ahead on time either way.</div>";
var W = scpWinners();
if (W.length) {
h += "<div style='font-weight:600;color:#FFE7B0;margin-top:8px'>🏆 The winners</div><div style='display:flex;flex-wrap:wrap;gap:6px;justify-content:center'>";
SCP_CATS.forEach(function (c) {
var w = W.filter(function (x) { return x.cat === c[0]; })[0];
if (!w)
return;
h += "<div style='width:96px;text-align:center;font-size:11.5px'>" + scpImg("win_" + c[0], w.look, w.name, 72) + "<div>" + c[2] + " <b>" + scpE(c[1]) + "</b></div><div><b>" + scpE(w.name) + "</b></div><div style='opacity:.8'>as " + scpE(w.title) + "</div>" +
"<div style='opacity:.65'>" + (w.keeper ? "the Keeper's choice" : w.votes + " vote" + (w.votes === 1 ? "" : "s")) + (w.gold ? " · " + w.gold + " gold" : "") + "</div></div>";
});
h += "</div>";
}
var PK = st && st.pumpkin;
if (PK) {
h += "<div style='margin:8px 0;padding:7px 9px;border-radius:5px;border:1px solid #E8C040;background:rgba(232,192,64,.1)'>🎃👑 <b>Somnucor's Pumpkin " + scpE(PK.honour || "King") + "</b>: " + scpE(PK.name) + ", as " + scpE(PK.title) + " (Samhain " + scpE(PK.year) + "), until the next Samhain.</div>";
if (PK.mine) {
["King", "Queen"].forEach(function (t) { if (t === PK.honour)
return; h += worldBtn("hon" + t, "Be called Pumpkin " + t + " instead", ""); fns["hon" + t] = function () { scpRpc("samhain_contest_honour", { p_honour: t }).then(function (d) { scpSay(scpE((d && d.say) || "Done."), !(d && d.ok)); scpLoad(true).then(scpCard); }); }; });
}
}
((st && st.my_circles) || []).forEach(function (c, i) {
h += worldBtn("kp" + i, "🎃 " + scpE(c.name) + ": the Spooks Parade " + (c.parade ? "✓ allowed (say no)" : "not allowed (say yes)"), "Your " + c.kids + " young player" + (c.kids === 1 ? "" : "s") + " " + (c.parade ? "may watch and walk with the parade" : "will not see the parade") + ". The contest itself is for grown-ups.");
fns["kp" + i] = function () { scpRpc("young_parade_set", { p_circle: c.code, p_on: !c.parade }).then(function (d) { scpSay(scpE((d && d.say) || "Done."), !(d && d.ok)); scpLoad(true).then(scpCard); }).catch(function (e) { scpSay(scpE(String(e.message || e)), true); }); };
});
var mine = null;
scpEntries().forEach(function (e) { if (e.mine)
mine = e; });
var open = !scpMinor() && st && !SCP.missing && (ph === "enter" || (keeper && ph !== "crowned" && ph !== "after"));
h += "<div style='font-weight:600;color:#FFE7B0;margin-top:8px'>Your entry</div>";
if (minor) {
h += "<div style='opacity:.85'>The Costume Contest is for grown-ups. Your Samhain is in the Kids Zone: Mistress Moonlantern's glade, the lantern carving, guising and the trick-or-treating.</div>" +
(scpParadeOk() ? "<div style='opacity:.85;margin-top:4px'>🎃 Your grown-up said yes to the <b>Spooks Parade</b>: come and watch it go round!</div>" : "<div style='opacity:.7;margin-top:4px'>The Spooks Parade is for you only if your grown-up says yes.</div>");
open = false;
}
else if (!scpIn())
h += "<div style='opacity:.8'>Sign in to enter or vote.</div>";
else if (mine) {
var mc = scpCat(mine.cat);
h += "<div style='display:flex;gap:10px;align-items:center'>" + "<div>" + scpImg("e" + mine.id, mine.look, mine.name, 72) + "</div><div><b>" + scpE(mine.title) + "</b><br>" + mc[2] + " " + scpE(mc[1]) + "<br><span style='opacity:.7;font-size:11.5px'>Entered in the costume you wore then.</span></div></div>";
if (open) {
h += worldBtn("redo", "👗 Enter again in what I have on now", "Same name and prize; change them below first if you like");
fns.redo = function () { scpEnter(mine.cat, mine.title); };
}
if (ph !== "crowned" && ph !== "after") {
h += worldBtn("out", "Take my entry out", "");
fns.out = function () { scpRpc("samhain_contest_withdraw").then(function (d) { scpSay(scpE((d && d.say) || "Done."), !(d && d.ok)); scpLoad(true).then(scpCard); }).catch(function (e) { scpSay(scpE(String(e.message || e)), true); }); };
}
}
if (!minor && scpIn() && open && (!mine || SCP.editing)) {
var cats = SCP_CATS, pick = SCP.pickCat && cats.some(function (c) { return c[0] === SCP.pickCat; }) ? SCP.pickCat : (mine && !SCP.editing ? mine.cat : cats[0][0]);
var meL = typeof meLook === "function" ? meLook() : null;
var worn = scpWornCostume(meL);
h += "<div style='display:flex;gap:10px;align-items:flex-start;margin-top:4px'><div>" + scpImg("me_" + scpLookKey(meL), meL, "you", 64) + "<div style='font-size:10.5px;opacity:.7;text-align:center'>you, now</div></div><div style='flex:1'>" +
"<div style='font-size:12px;opacity:.8'>Your costume's name</div><input id='scp-title' maxlength='48' value='" + scpE(SCP.title || (mine ? mine.title : "")) + "' placeholder='" + scpE(worn.length ? "e.g. The " + worn[0] : "e.g. The Bog Witch of Hollowmere") + "' style='width:100%;box-sizing:border-box;padding:5px;border-radius:4px;border:1px solid #6A4A7A;background:#140C1A;color:#F4E8F8'>" +
(worn.length ? "<div style='font-size:11.5px;color:#FFB050;margin-top:3px'>🎃 Wearing: " + scpE(worn.join(", ")) + "</div>" : "<div style='font-size:11.5px;opacity:.7;margin-top:3px'>Tip: put on a costume first (the costume shops, your wardrobe).</div>") +
"<div style='font-size:12px;opacity:.8;margin-top:4px'>Enter it for</div>" + cats.map(function (c) { return "<div data-w='cat_" + c[0] + "' role='button' tabindex='0' style='padding:3px 6px;margin:2px 0;border-radius:4px;border:1px solid " + (pick === c[0] ? "#FFB050;background:rgba(255,160,60,.16)" : "rgba(255,255,255,.15)") + "'>" + c[2] + " <b>" + scpE(c[1]) + "</b> <span style='opacity:.65;font-size:11px'>" + scpE(c[3]) + "</span></div>"; }).join("") + "</div></div>";
cats.forEach(function (c) { fns["cat_" + c[0]] = function () { SCP.title = scpTitleNow(); SCP.pickCat = c[0]; scpCard(); }; });
h += worldBtn("enter", "🎭 Enter, wearing what I have on now", "Change your look first (your wardrobe, the costume shops), then enter. Free.");
fns.enter = function () { scpEnter(pick, scpTitleNow()); };
}
else if (scpIn() && mine && open) {
h += worldBtn("edit", "Change the name or the prize", "");
fns.edit = function () { SCP.editing = true; SCP.title = mine.title; SCP.pickCat = mine.cat; scpCard(); };
}
else if (!minor && scpIn() && !mine && !open && !SCP.missing)
h += "<div style='opacity:.8'>" + (ph === "before" ? "Entries open on the day." : "Entries have closed for this year.") + "</div>";
var E = scpEntries();
if (E.length || keeper) {
h += "<div style='font-weight:600;color:#FFE7B0;margin-top:10px'>The entries (" + E.length + ")</div><div style='display:flex;flex-wrap:wrap;gap:3px;margin:3px 0'>" + SCP_CATS.map(function (c) {
var n = E.filter(function (e) { return e.cat === c[0]; }).length;
return "<span data-w='tab_" + c[0] + "' role='button' tabindex='0' style='padding:2px 7px;border-radius:10px;font-size:11.5px;border:1px solid " + (tab === c[0] ? "#FFB050;background:rgba(255,160,60,.18)" : "rgba(255,255,255,.18)") + "'>" + c[2] + " " + scpE(c[1]) + " (" + n + ")</span>";
}).join("") + "</div>";
SCP_CATS.forEach(function (c) { fns["tab_" + c[0]] = function () { SCP.title = scpTitleNow(); SCP.tab = c[0]; scpCard(); }; });
var my = (st && st.votes) || {}, canVote = !minor && st && st.can_vote && ph !== "crowned" && ph !== "after" && Date.now() < scpMs("votes_end");
var list = E.filter(function (e) { return e.cat === tab; });
if (!list.length)
h += "<div style='opacity:.7'>No entries for " + scpE(scpCat(tab)[1]) + " yet.</div>";
h += "<div style='display:flex;flex-wrap:wrap;gap:6px;justify-content:space-between'>";
list.forEach(function (e) {
var voted = +my[tab] === +e.id;
h += "<div style='width:96px;text-align:center;font-size:11.5px;margin-bottom:4px'>" + scpImg("e" + e.id, e.look, e.name, 72) + "<div><b>" + scpE(e.name) + "</b></div><div style='opacity:.8;min-height:2.6em'>as " + scpE(e.title) + "</div>";
if (e.mine)
h += "<div style='opacity:.6'>yours</div>";
else if (canVote) {
h += "<div data-w='v" + e.id + "' role='button' tabindex='0' style='margin-top:2px;padding:2px 4px;border-radius:4px;border:1px solid " + (voted ? "#7AE08A;background:rgba(120,220,140,.18)" : "#FFB050") + "'>" + (voted ? "✓ your vote" : "Vote") + "</div>";
fns["v" + e.id] = function () { scpVote(tab, voted ? null : e.id); };
}
h += "</div>";
});
h += "</div>";
if (!minor && st && !st.can_vote && scpIn() && !keeper && ph !== "crowned")
h += "<div style='opacity:.7;font-size:11.5px'>Accounts can vote from their second day.</div>";
if (canVote)
h += "<div style='opacity:.7;font-size:11.5px'>One vote a prize; you can change it until " + scpClock(scpMs("votes_end")) + ". Vote counts stay hidden until the crowning.</div>";
}
if (typeof inSomnucorNow === "function" && inSomnucorNow() && scpStageDay()) {
h += worldBtn("go", "🎪 Take me to the contest stage", "In the Tower Plaza");
fns.go = function () { worldCard(null); scpGoStage(); };
}
if (keeper) {
h += "<div style='font-weight:600;color:#FFE7B0;margin-top:10px'>Keeper</div><div style='opacity:.75;font-size:11.5px'>The hours, picking a winner yourself, hiding an entry and crowning early: admin › In the game › Costume Contest &amp; Spooks Parade. Try-outs below are seen only by you.</div>";
[["parade", "🎺 Try the Spooks Parade here now"], ["catwalk", "✨ Try the Catwalk now"], ["crowned", "🏆 Try the winners on the stage"]].forEach(function (q) {
h += worldBtn("k" + q[0], q[1] + (SCP.force === q[0] ? " (on)" : ""), "");
fns["k" + q[0]] = function () { SCP.force = SCP.force === q[0] ? null : q[0]; if (SCP.stage)
SCP.stage.want = null; scpCard(); };
});
if (SCP.force) {
h += worldBtn("kreal", "Back to the real clock", "");
fns.kreal = function () { SCP.force = null; if (SCP.stage)
SCP.stage.want = null; scpCard(); };
}
}
worldCard(h, fns);
WLD.card.setAttribute("data-scp", "1");
var inp = document.getElementById("scp-title");
if (inp)
inp.addEventListener("keydown", function (ev) { ev.stopPropagation(); });
},
function (cat, title) {
title = String(title || "").trim().slice(0, 48);
SCP.title = title;
if (!title) {
scpSay("Give your costume a name first.", true);
return;
}
var L = typeof meLook === "function" ? JSON.parse(JSON.stringify(meLook())) : null;
if (!L) {
scpSay("Your look could not be read.", true);
return;
}
scpSay("Entering…");
scpRpc("samhain_contest_enter", { p_cat: cat, p_title: title, p_look: L }).then(function (d) {
if (d && d.ok) {
SCP.editing = false;
SCP.title = "";
SCP.tab = cat;
Object.keys(SCP.pics).forEach(function (k) { if (/^e/.test(k) && d.id && k === "e" + d.id)
delete SCP.pics[k]; });
}
scpSay("🎭 " + scpE((d && d.say) || "Done."), !(d && d.ok));
scpLoad(true).then(function () { if (scpCardOpen())
scpCard(); });
}).catch(function (e) { scpSay(scpMissing(e) ? "The contest opens very soon." : scpE(String(e.message || e)), true); });
},
function (L) {
var out = [];
if (!L)
return out;
try {
Object.keys(L).forEach(function (f) {
var v = L[f];
if (typeof v !== "string" || f === "src")
return;
if (SCP_COSTUME_KEYS.indexOf(v) < 0 && !(typeof SWR_SETS !== "undefined" && JSON.stringify(SWR_SETS).indexOf('"' + v + '"') >= 0))
return;
var w = typeof WEAR !== "undefined" && WEAR[v];
var lab = w && w.label ? w.label : (v === "witch" ? "Witch's hat" : v === "wizard" ? "Wizard's hat" : v);
if (out.indexOf(lab) < 0)
out.push(lab);
});
if (L.species && L.species !== "human" && typeof SPECIES !== "undefined") {
var i = SPECIES.indexOf(L.species);
if (i >= 0 && typeof SPECIES_LABEL !== "undefined")
out.push(SPECIES_LABEL[i] + " looks");
}
}
catch (e) { }
return out.slice(0, 5);
},
function (G) {
if (!G)
return;
if (G.parent)
G.parent.remove(G);
G.traverse(function (m) {
try {
if (m.isSprite && m.material) {
if (m.material.map)
m.material.map.dispose();
m.material.dispose();
}
else if (m.userData.scpMine) {
if (m.geometry)
m.geometry.dispose();
if (m.material && m.material.map)
m.material.map.dispose();
}
}
catch (e) { }
});
},
function () {
if (SCP.spot)
return SCP.spot;
if (typeof ATLC === "undefined" || !ATLC)
return null;
var obs = [];
try {
if (typeof shcPlazaObs === "function")
obs = shcPlazaObs().slice();
}
catch (e) { }
try {
if (typeof shcJackSpot === "function") {
var J = shcJackSpot();
obs.push({ x: J.x, z: J.z, r: 8 });
}
}
catch (e) { }
try {
if (typeof shcFairSpots === "function")
shcFairSpots().forEach(function (s) { obs.push({ x: s.x, z: s.z, r: 7 }); });
}
catch (e) { }
var got = null, Rs = [78, 86, 70, 94, 62];
for (var k = 0; k < Rs.length * 180 && !got; k++) {
var R = Rs[Math.floor(k / 180)], i = k % 180, a = 0.17 + (i % 2 ? 1 : -1) * Math.ceil(i / 2) * 0.035;
if (typeof atlClearAt === "function" && !atlClearAt(R, a, 9, 2))
continue;
var x = ATLC.x + Math.cos(a) * R, z = ATLC.z + Math.sin(a) * R, bad = false;
for (var t = -3; t <= 12 && !bad; t += 3) {
var px = x - Math.cos(a) * t, pz = z - Math.sin(a) * t;
obs.forEach(function (o) { if (!bad && Math.hypot(o.x - px, o.z - pz) < o.r + (t < 4 ? 6.5 : 2.2))
bad = true; });
}
if (!bad)
got = { x: x, z: z, a: a, r: R };
}
if (!got) {
var a2 = 0.17;
got = { x: ATLC.x + Math.cos(a2) * 78, z: ATLC.z + Math.sin(a2) * 78, a: a2, r: 78 };
}
if (obs.length > 20)
SCP.spot = got;
return got;
},
function () {
var S = scpStageSpot();
if (!S)
return;
var px = -Math.sin(S.a), pz = Math.cos(S.a), fx = S.x - Math.cos(S.a) * 21 + px * 6, fz = S.z - Math.sin(S.a) * 21 + pz * 6;
camera.position.set(fx, (typeof terrainY === "function" ? terrainY(fx, fz) : 0) + 1.72, fz);
var tx = S.x - Math.cos(S.a) * 2, tz = S.z - Math.sin(S.a) * 2;
if (typeof yaw !== "undefined")
yaw = Math.atan2(-(tx - fx), -(tz - fz));
if (typeof pitch !== "undefined")
pitch = -0.02;
if (typeof setStatus === "function")
setStatus("🎭 <b>The Costume Contest stage.</b> Press E at the front for the contest.");
},
function (w, h, fn) {
var k = scpLite() ? 1 : 2, t = wTex(w * k, h * k, function (x) { x.scale(k, k); fn(x, w, h); });
if (typeof renderer !== "undefined" && renderer) {
if (renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
try {
t.anisotropy = Math.min(scpLite() ? 4 : 8, (typeof GFX !== "undefined" && GFX.aniso) || renderer.capabilities.getMaxAnisotropy());
}
catch (e) { }
}
return t;
},
function () {
if (SCP.backTex)
return SCP.backTex;
var t = scpTex(1024, 448, function (x, W, H) {
var g = x.createLinearGradient(0, 0, 0, H);
g.addColorStop(0, "#1A0A26");
g.addColorStop(1, "#3A1408");
x.fillStyle = g;
x.fillRect(0, 0, W, H);
x.fillStyle = "#F4D890";
x.beginPath();
x.arc(W * 0.82, 110, 70, 0, 7);
x.fill();
x.fillStyle = "rgba(26,10,38,.25)";
x.beginPath();
x.arc(W * 0.8, 96, 16, 0, 7);
x.arc(W * 0.85, 130, 10, 0, 7);
x.fill();
x.fillStyle = "#0A0608";
[[160, 80], [230, 120], [700, 60], [860, 200], [120, 190]].forEach(function (b) { var bx = b[0], by = b[1]; x.beginPath(); x.moveTo(bx, by); x.quadraticCurveTo(bx - 16, by - 16, bx - 30, by - 2); x.quadraticCurveTo(bx - 18, by, bx - 13, by + 7); x.quadraticCurveTo(bx, by + 2, bx, by + 9); x.quadraticCurveTo(bx, by + 2, bx + 13, by + 7); x.quadraticCurveTo(bx + 18, by, bx + 30, by - 2); x.quadraticCurveTo(bx + 16, by - 16, bx, by); x.fill(); });
x.fillStyle = "#120A10";
x.beginPath();
x.moveTo(0, H);
x.lineTo(0, 330);
x.quadraticCurveTo(200, 280, 400, 330);
x.quadraticCurveTo(640, 370, 800, 320);
x.quadraticCurveTo(920, 290, W, 320);
x.lineTo(W, H);
x.fill();
x.fillRect(560, 250, 60, 90);
x.beginPath();
x.moveTo(552, 252);
x.lineTo(590, 190);
x.lineTo(628, 252);
x.fill();
x.fillStyle = "#FFB040";
x.fillRect(582, 280, 14, 20);
x.textAlign = "center";
x.fillStyle = "#FF8A20";
x.font = "bold 30px Georgia,serif";
x.fillText("SOMNUCOR  ·  SAMHAIN  ·  2026", W / 2, 70);
x.fillStyle = "#FFE0A0";
x.font = "bold 76px Georgia,serif";
x.fillText("THE COSTUME CONTEST", W / 2, 160);
x.fillStyle = "#E8C8F8";
x.font = "italic 32px Georgia,serif";
x.fillText("Scariest · Funniest · Best Handmade · Grandest: the Pumpkin Crown", W / 2, 215);
for (var i = 0; i < 9; i++) {
var px = 60 + i * 113, py = H - 40;
x.fillStyle = "#E86A00";
x.beginPath();
x.ellipse(px, py, 34, 28, 0, 0, 7);
x.fill();
x.fillStyle = "#3A6A20";
x.fillRect(px - 3, py - 36, 6, 10);
x.fillStyle = "#FFE070";
x.beginPath();
x.moveTo(px - 18, py - 6);
x.lineTo(px - 8, py - 16);
x.lineTo(px - 4, py - 4);
x.fill();
x.beginPath();
x.moveTo(px + 18, py - 6);
x.lineTo(px + 8, py - 16);
x.lineTo(px + 4, py - 4);
x.fill();
x.beginPath();
x.moveTo(px - 18, py + 6);
x.lineTo(px - 6, py + 14);
x.lineTo(px, py + 8);
x.lineTo(px + 6, py + 14);
x.lineTo(px + 18, py + 6);
x.quadraticCurveTo(px, py + 24, px - 18, py + 6);
x.fill();
}
});
if (typeof renderer !== "undefined" && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
return (SCP.backTex = t);
},
function (txt, sub, col) {
var t = scpTex(512, 160, function (x, W, H) {
x.fillStyle = col || "#2A0E3A";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#FFB050";
x.lineWidth = 8;
x.strokeRect(6, 6, W - 12, H - 12);
x.textAlign = "center";
x.fillStyle = "#FFE0A0";
x.font = "bold 54px Georgia,serif";
x.fillText(txt, W / 2, sub ? 78 : 100);
if (sub) {
x.fillStyle = "#E8C8F8";
x.font = "30px Georgia,serif";
x.fillText(sub, W / 2, 124);
}
});
if (typeof renderer !== "undefined" && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
return t;
},
function () {
var S = scpStageSpot();
if (!S)
return;
var G = new THREE.Group();
G.name = "samhain costume contest stage";
scene.add(G);
var y0 = typeof terrainY === "function" ? terrainY(S.x, S.z) : 0;
G.position.set(S.x, y0, S.z);
G.rotation.y = Math.atan2(-Math.cos(S.a), -Math.sin(S.a));
var lite = scpLite(), M = {};
function mat(c, basic) { var k = c + (basic ? "b" : ""); if (!M[k]) {
M[k] = basic ? new THREE.MeshBasicMaterial({ color: c }) : new THREE.MeshLambertMaterial({ color: c });
M[k].userData.scpMine = 1;
} return M[k]; }
function box(w, h, d, c, x, y, z, basic) { var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(c, basic)); m.position.set(x, y, z); m.userData.scpMine = 1; G.add(m); return m; }
box(12.4, 1.0, 6.4, 0x2A1A14, 0, 0.5, 0);
box(12.6, 0.9, 6.6, 0x160C12, 0, 0.45, 0);
box(2.6, 1.0, 9, 0x2A1A14, 0, 0.5, 7.7);
box(2.8, 0.9, 9.1, 0x160C12, 0, 0.45, 7.7);
box(12.4, 0.06, 6.4, 0x4A2A5A, 0, 1.03, 0);
box(2.6, 0.06, 9, 0x4A2A5A, 0, 1.03, 7.7);
for (var i = 0; i < 14; i++) {
box(0.9, 0.86, 0.04, i % 2 ? 0xE86A00 : 0x1A1014, -5.85 + i * 0.9, 0.46, 3.32);
}
for (i = 0; i < 10; i++) {
[-1, 1].forEach(function (sd) { box(0.04, 0.86, 0.9, i % 2 ? 0xE86A00 : 0x1A1014, sd * 1.42, 0.46, 3.65 + i * 0.9); });
}
for (i = 0; i < 3; i++)
box(0.9, 0.86, 0.04, i % 2 ? 0xE86A00 : 0x1A1014, -0.9 + i * 0.9, 0.46, 12.27);
box(12.5, 0.06, 0.08, 0xE8C040, 0, 1.05, 3.22);
[-1, 1].forEach(function (sd) { box(0.08, 0.06, 9, 0xE8C040, sd * 1.32, 1.05, 7.7); });
box(2.7, 0.06, 0.08, 0xE8C040, 0, 1.05, 12.2);
[-1, 1].forEach(function (sd) { for (var s = 0; s < 3; s++)
box(1.4, 0.33 * (s + 1), 0.5, 0x3A2A20, sd * (6.2 + 0.9), 0.165 * (s + 1), -1.6 + s * 0.5); });
box(0.3, 6.4, 0.3, 0x1A1014, -6.1, 3.2, -3.0);
box(0.3, 6.4, 0.3, 0x1A1014, 6.1, 3.2, -3.0);
box(12.6, 0.4, 0.4, 0x1A1014, 0, 6.4, -3.0);
var cloth = new THREE.Mesh(new THREE.PlaneGeometry(12, 5.25), new THREE.MeshBasicMaterial({ map: scpBackTex() }));
cloth.position.set(0, 3.65, -2.9);
cloth.userData.scpMine = 1;
G.add(cloth);
var back = new THREE.Mesh(new THREE.PlaneGeometry(12, 5.25), mat(0x1A1014));
back.position.set(0, 3.65, -2.95);
back.rotation.y = Math.PI;
G.add(back);
var fl = new THREE.SphereGeometry(0.09, 8, 6);
fl.userData = {};
var flm = mat(0xFFC060, true), n = lite ? 10 : 20;
for (i = 0; i < n; i++) {
var f = new THREE.Mesh(fl, flm);
f.position.set(-5.9 + i * (11.8 / (n - 1)), 1.12, 3.05);
G.add(f);
}
for (i = 0; i < (lite ? 6 : 12); i++) {
[-1, 1].forEach(function (sd) { var f2 = new THREE.Mesh(fl, flm); f2.position.set(sd * 1.18, 1.12, 3.6 + i * (8 / (lite ? 5 : 11))); G.add(f2); });
}
[[-5.7, 2.7], [5.7, 2.7], [-2.0, 12.0], [2.0, 12.0], [-5.7, -2.3], [5.7, -2.3]].forEach(function (p, k) {
var gp = p[1] > 11 ? 0 : 1.06;
var pk = new THREE.Mesh(new THREE.SphereGeometry(0.3, 14, 10), mat(0xE86A00));
pk.scale.set(1.15, 0.85, 1.1);
pk.position.set(p[0], gp + 0.26, p[1]);
pk.userData.scpMine = 1;
G.add(pk);
if (typeof shcFaceTex === "function") {
var fc = new THREE.Mesh(new THREE.PlaneGeometry(0.44, 0.44), new THREE.MeshBasicMaterial({ map: shcFaceTex(k), transparent: true, depthWrite: false }));
fc.position.set(p[0], gp + 0.26, p[1] + 0.35);
G.add(fc);
}
});
var plin = [];
SCP_CATS.forEach(function (c, k) {
var grand = c[0] === "grand", x = -3.6 + k * 2.4, ht = grand ? 0.75 : 0.45;
box(1.5, ht, 1.5, 0x1A1014, x, 1.06 + ht / 2, -1.5);
var sg = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.47), new THREE.MeshBasicMaterial({ map: scpSignTex(grand ? "Pumpkin Crown" : c[1], "", grand ? "#3A1A08" : "#2A0E3A") }));
sg.position.set(x, 1.06 + ht / 2, -0.74);
sg.userData.scpMine = 1;
G.add(sg);
plin.push({ x: x, y: 1.06 + ht, z: -1.5 });
});
scpBake(G);
G.traverse(function (m) { m.raycast = function () { }; });
SCP.stage = { g: G, spot: S, plin: plin, figs: [], want: null, key: "", t: 0 };
},
function () {
var ph = scpPhase(), E = scpEntries(), lite = scpLite(), out = { ph: ph, list: [] };
if (ph === "crowned") {
var W = scpWinners();
SCP_CATS.forEach(function (c, k) { var w = W.filter(function (x) { return x.cat === c[0]; })[0]; if (w)
out.list.push({ id: "win_" + c[0], look: w.look, tag: c[0] === "grand" ? "🎃👑 Pumpkin " + (w.honour || "King") + ": " + w.name : "🏆 " + c[1] + ": " + w.name, plin: k, title: w.title }); });
if (!out.list.length && SCP.force)
out.list = E.slice(0, SCP_CATS.length).map(function (e, k) { return { id: "e" + e.id, look: e.look, tag: "🏆 " + SCP_CATS[k][1] + ": " + e.name, plin: k }; });
return out;
}
var max = lite ? 5 : 10, list = E.slice();
if (list.length > max) {
var turn = Math.floor(Date.now() / 60000) % Math.ceil(list.length / max);
list = list.slice(turn * max, turn * max + max);
}
out.list = list.map(function (e) { return { id: "e" + e.id, look: e.look, tag: e.name + " · " + e.title, cat: e.cat, name: e.name, title: e.title }; });
return out;
},
function () {
var ST = SCP.stage, who = scpStageWho(), key = who.ph + "|" + who.list.map(function (w) { return w.id; }).join(",");
if (key === ST.key)
return;
ST.key = key;
ST.figs.forEach(function (f) { if (f.g.parent)
f.g.parent.remove(f.g); if (f.tag && typeof dropTag === "function")
dropTag(f.tag); });
ST.figs = [];
who.list.forEach(function (w, i) {
var g = scpBake(scpFigure(w.look, w.id)), f = { g: g, w: w, i: i };
if (typeof makeTag === "function") {
f.tag = makeTag(w.tag, false);
f.tag.position.y = 2.25;
g.add(f.tag);
}
if (w.plin != null) {
var p = ST.plin[w.plin];
g.position.set(p.x, p.y, p.z);
g.rotation.y = 0;
var cr = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.15, 0.12, 10, 1, true), new THREE.MeshLambertMaterial({ color: 0xE8C040, side: THREE.DoubleSide }));
cr.position.y = 1.98;
cr.userData.scpMine = 1;
g.add(cr);
}
else {
var row = i < 5 ? 0 : 1, col = i % 5;
g.position.set(-4 + col * 2, 1.06, row ? -1.9 : 0.2);
g.rotation.y = 0;
}
g.userData.home = g.position.clone();
ST.g.add(g);
ST.figs.push(f);
});
},
function (dt) {
var ST = SCP.stage;
if (!ST)
return;
ST.t += dt;
if (ST.t > 1 || ST.want === null) {
ST.t = 0;
ST.want = 1;
scpStageFigs();
}
var ph = scpPhase(), P = camera.position, t = performance.now() / 1000;
if (ph === "catwalk" && ST.figs.length) {
var ca = SCP.force ? (SCP.forceAt || (SCP.forceAt = Date.now())) : scpMs("catwalk_at"), el = (Date.now() - ca) / 1000, k = Math.floor(el / 20) % ST.figs.length, u = (el % 20) / 20;
ST.figs.forEach(function (f, i) {
var g = f.g, h = g.userData.home, lm = g.userData.limbs;
if (i !== k) {
g.position.copy(h);
g.rotation.y = 0;
if (lm) {
if (lm.ll)
lm.ll.rotation.x = 0;
if (lm.rl)
lm.rl.rotation.x = 0;
}
return;
}
var z, ry, walking = true, x = h.x * (u < 0.12 ? 1 - u / 0.12 : u > 0.88 ? (u - 0.88) / 0.12 : 0);
if (u < 0.42) {
z = h.z + (11.2 - h.z) * Math.min(1, u / 0.42);
ry = 0;
}
else if (u < 0.58) {
z = 11.2;
ry = (u - 0.42) / 0.16 * Math.PI * 2;
walking = false;
}
else {
z = 11.2 - (11.2 - h.z) * ((u - 0.58) / 0.42);
ry = Math.PI;
}
g.position.set(x, 1.06, z);
g.rotation.y = ry;
if (lm) {
var sw = walking ? Math.sin(t * 6) : 0;
if (lm.ll)
lm.ll.rotation.x = sw * 0.4;
if (lm.rl)
lm.rl.rotation.x = -sw * 0.4;
if (lm.la)
lm.la.rotation.x = -sw * 0.35;
if (lm.ra)
lm.ra.rotation.x = sw * 0.35;
}
});
var w = ST.figs[k].w, S = ST.spot;
if (Math.hypot(P.x - S.x, P.z - S.z) < 70 && ST.saidK !== k + ":" + Math.floor(el / 20)) {
ST.saidK = k + ":" + Math.floor(el / 20);
setStatus("✨ <b>On the catwalk now:</b> " + scpE(w.name) + " as <b>" + scpE(w.title) + "</b> (" + scpE(scpCat(w.cat)[1]) + "). Press E at the stage to vote.");
}
}
else {
ST.figs.forEach(function (f, i) {
var g = f.g, h = g.userData.home;
g.position.copy(h);
g.rotation.y = f.w.plin != null ? 0 : Math.sin(t * 0.4 + i) * 0.25;
var lm = g.userData.limbs;
if (lm) {
if (lm.ll)
lm.ll.rotation.x = 0;
if (lm.rl)
lm.rl.rotation.x = 0;
if (lm.ra)
lm.ra.rotation.x = f.w.plin != null ? -2.6 + Math.sin(t * 2 + i) * 0.2 : 0;
}
});
}
},
function (txt) {
var t = scpTex(1024, 128, function (x, W, H) {
x.fillStyle = "#1A0E10";
x.fillRect(0, 0, W, H);
x.fillStyle = "#FF7A1A";
x.fillRect(0, 0, W, 10);
x.fillRect(0, H - 10, W, 10);
x.textAlign = "center";
x.textBaseline = "middle";
x.fillStyle = "#FFE0A0";
x.font = "bold 64px Georgia,serif";
x.fillText(txt, W / 2, H / 2 + 4);
});
if (typeof renderer !== "undefined" && renderer && renderer.outputEncoding === THREE.sRGBEncoding)
t.encoding = THREE.sRGBEncoding;
return t;
},
function () {
if (SCP.batTex)
return SCP.batTex;
return (SCP.batTex = scpTex(128, 64, function (x, W, H) {
x.clearRect(0, 0, W, H);
x.fillStyle = "#0A0608";
var bx = 64, by = 30;
x.beginPath();
x.moveTo(bx, by);
x.quadraticCurveTo(bx - 30, by - 28, bx - 60, by - 4);
x.quadraticCurveTo(bx - 36, by, bx - 28, by + 14);
x.quadraticCurveTo(bx, by + 4, bx, by + 18);
x.quadraticCurveTo(bx, by + 4, bx + 28, by + 14);
x.quadraticCurveTo(bx + 36, by, bx + 60, by - 4);
x.quadraticCurveTo(bx + 30, by - 28, bx, by);
x.fill();
}));
},
function (key, name, col) {
var G = new THREE.Group(), M = {};
function mat(c, basic, extra) { var k = c + (basic ? "b" : "") + (extra ? "x" : ""); if (!M[k]) {
var o = { color: c };
if (extra) {
o.transparent = true;
o.opacity = 0.7;
o.side = THREE.DoubleSide;
o.depthWrite = false;
}
M[k] = basic ? new THREE.MeshBasicMaterial(o) : new THREE.MeshLambertMaterial(o);
M[k].userData.scpMine = 1;
} return M[k]; }
function add(geo, c, x, y, z, basic, extra) { var m = new THREE.Mesh(geo, mat(c, basic, extra)); m.position.set(x, y, z); m.userData.scpMine = 1; G.add(m); return m; }
function box(w, h, d, c, x, y, z, basic) { return add(new THREE.BoxGeometry(w, h, d), c, x, y, z, basic); }
function sph(r, c, x, y, z, basic) { return add(new THREE.SphereGeometry(r, 14, 10), c, x, y, z, basic); }
function cyl(r1, r2, h, c, x, y, z, basic, seg) { return add(new THREE.CylinderGeometry(r1, r2, h, seg || 10), c, x, y, z, basic); }
function face(tex, w, h, x, y, z, ry) { var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, side: THREE.DoubleSide })); m.position.set(x, y, z); m.rotation.y = ry || 0; m.userData.scpMine = 1; G.add(m); return m; }
box(4.2, 0.9, 8, col, 0, 0.75, 0);
box(4.3, 0.12, 8.1, 0x2A1A14, 0, 1.25, 0);
[[-1.9, -2.8], [1.9, -2.8], [-1.9, 2.8], [1.9, 2.8]].forEach(function (p) { var w = cyl(0.45, 0.45, 0.3, 0x1A1014, p[0], 0.45, p[1]); w.rotation.z = Math.PI / 2; });
var bt = scpBannerTex(name);
[-1, 1].forEach(function (sd) { var b = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 0.8), new THREE.MeshBasicMaterial({ map: bt })); b.position.set(sd * 2.13, 0.8, 0); b.rotation.y = sd * Math.PI / 2; b.userData.scpMine = 1; G.add(b); });
var tf = typeof shcFaceTex === "function" ? shcFaceTex : function () { return null; }, y = 1.31;
if (key === "jack") {
var pk = sph(1.9, 0xE86A00, 0, y + 1.7, 0);
pk.scale.set(1.12, 0.9, 1.15);
cyl(0.15, 0.22, 0.6, 0x3A6A20, 0, y + 3.5, 0);
[-1, 1].forEach(function (sd) { face(tf(1), 2.6, 2.6, sd * 2.16, y + 1.75, 0, sd * Math.PI / 2); });
for (var i = 0; i < 4; i++)
sph(0.45, 0xD8600A, -1.5 + i, y + 0.4, (i % 2 ? 2.9 : -2.9));
}
else if (key === "house") {
box(2.8, 2.6, 4.2, 0x2A2030, 0, y + 1.3, -0.4);
var rf = add(new THREE.ConeGeometry(2.6, 2.0, 4), 0x1A1418, 0, y + 3.6, -0.4);
rf.rotation.y = Math.PI / 4;
rf.scale.z = 1.4;
box(0.5, 1.4, 0.5, 0x2A2030, 0.8, y + 4.0, -1.2);
[-1, 1].forEach(function (sd) { for (var w = 0; w < 3; w++) {
box(0.04, 0.6, 0.5, 0xFFC050, sd * 1.42, y + (w === 1 ? 0.9 : 1.8), -1.6 + w * 1.2, true);
} });
var gh = add(new THREE.ConeGeometry(0.45, 1.3, 10), 0xF4F4F0, 1.6, y + 1.2, 2.6, false, true);
sph(0.3, 0xF4F4F0, 1.6, y + 2.0, 2.6);
for (var b = 0; b < 5; b++) {
var bm = face(scpBatTex(), 0.7, 0.35, -1.2 + b * 0.6, y + 4.6 + (b % 2) * 0.5, -0.4 + (b % 3 - 1), 0);
bm.userData.bat = b;
}
}
else if (key === "cauldron") {
var cp = sph(1.4, 0x141414, 0, y + 1.2, -0.5);
cp.scale.y = 0.8;
var rim = add(new THREE.TorusGeometry(1.25, 0.12, 8, 20), 0x2A2A2A, 0, y + 2.1, -0.5);
rim.rotation.x = Math.PI / 2;
var brew = cyl(1.2, 1.2, 0.06, 0x7AF07A, 0, y + 2.05, -0.5, true, 20);
for (var k = 0; k < 5; k++) {
var bb = sph(0.16 + 0.06 * (k % 3), 0x9AFF8A, -0.6 + k * 0.3, y + 2.15, -0.5 + (k % 2 ? 0.3 : -0.3), true);
bb.userData.bub = k;
}
for (var f = 0; f < 5; f++)
add(new THREE.ConeGeometry(0.22, 0.6, 6), 0xFF8A20, -0.8 + f * 0.4, y + 0.3, 0.6, true);
[0, 2.1, 4.2].forEach(function (a, i) { var wf = scpGuiser(0 + i * 10); wf.position.set(Math.sin(a) * 2.0 * 0.8, y, -0.5 + Math.cos(a) * 2.0); wf.rotation.y = a + Math.PI; G.add(wf); });
}
else if (key === "bones") {
var dr = cyl(0.9, 0.9, 0.7, 0xF0E8D8, 0, y + 1.2, -2.4);
dr.rotation.x = Math.PI / 2;
face(scpTex(128, 128, function (x, W, H) { x.fillStyle = "#F0E8D8"; x.fillRect(0, 0, W, H); x.fillStyle = "#1A1014"; x.beginPath(); x.ellipse(64, 56, 34, 38, 0, 0, 7); x.fill(); x.fillStyle = "#F0E8D8"; x.beginPath(); x.ellipse(50, 54, 9, 11, 0, 0, 7); x.ellipse(78, 54, 9, 11, 0, 0, 7); x.fill(); x.fillRect(46, 84, 36, 16); }), 1.5, 1.5, 0, y + 1.2, -2.04, 0);
for (var s = 0; s < 4; s++) {
var L = { top: 0x141014, bottom: 0x141014, skin: 0xF0EEE4, shoes: 0x141014, hat: null, back: null, layer: null, face: null, sex: s % 2 ? "m" : "f", age: "adult" };
var sk = scpFigure(L, "bones" + s);
sk.position.set(-1.4 + s * 0.95, y, 0.8 + (s % 2) * 1.2);
sk.rotation.y = Math.PI / 2 * (s % 2 ? -1 : 1) * 0.3;
G.add(sk);
var rb = face(scpTex(64, 128, function (x, W, H) { x.clearRect(0, 0, W, H); x.strokeStyle = "#F0EEE4"; x.lineWidth = 5; x.beginPath(); x.moveTo(32, 6); x.lineTo(32, 120); x.stroke(); for (var q = 0; q < 5; q++) {
x.beginPath();
x.moveTo(10, 20 + q * 16);
x.quadraticCurveTo(32, 30 + q * 16, 54, 20 + q * 16);
x.stroke();
} }), 0.34, 0.6, 0, 1.3, 0.17, 0);
sk.add(rb);
G.remove(rb);
}
}
else if (key === "horseman") {
box(0.9, 1.0, 2.2, 0x141010, 0, y + 1.6, 0);
var nk = box(0.45, 1.1, 0.45, 0x141010, 0, y + 2.3, 1.0);
nk.rotation.x = 0.5;
box(0.4, 0.4, 0.8, 0x141010, 0, y + 2.8, 1.45);
[[-0.32, -0.85], [0.32, -0.85], [-0.32, 0.85], [0.32, 0.85]].forEach(function (p, i) { var lg = cyl(0.1, 0.08, 1.2, 0x141010, p[0], y + 0.6, p[1]); lg.rotation.x = (i % 2 ? 0.3 : -0.3); });
var tl = cyl(0.04, 0.14, 1.0, 0x0A0808, 0, y + 1.5, -1.3);
tl.rotation.x = -0.6;
sph(0.08, 0xFF3020, 0.18, y + 2.9, 1.75, true);
sph(0.08, 0xFF3020, -0.18, y + 2.9, 1.75, true);
add(new THREE.ConeGeometry(0.55, 1.5, 10), 0x0A080C, 0, y + 2.65, -0.1);
box(0.9, 0.22, 0.4, 0x0A080C, 0, y + 3.35, -0.1);
var arm = box(0.14, 0.8, 0.14, 0x0A080C, 0.5, y + 3.5, 0.2);
arm.rotation.x = -0.8;
var hp = sph(0.3, 0xE86A00, 0.5, y + 3.85, 0.65);
face(tf(2), 0.42, 0.42, 0.5, y + 3.85, 0.96, 0);
var cape = add(new THREE.PlaneGeometry(1.1, 1.6), 0x2A0A0A, 0, y + 2.7, -0.45, false, true);
cape.rotation.x = 0.25;
cape.userData.cape = 1;
}
else if (key === "ship") {
box(2.8, 1.3, 6.2, 0x3A4A5A, 0, y + 0.65, -0.3);
var bow = add(new THREE.ConeGeometry(1.4, 1.8, 4), 0x3A4A5A, 0, y + 0.65, 3.6);
bow.rotation.x = Math.PI / 2;
bow.rotation.y = Math.PI / 4;
bow.scale.set(1, 1, 0.7);
cyl(0.12, 0.14, 5.6, 0x2A2A2A, 0, y + 3.6, -0.4);
box(2.6, 0.1, 0.1, 0x2A2A2A, 0, y + 5.2, -0.4);
var sail = add(new THREE.PlaneGeometry(2.4, 3.0, 6, 6), 0xC8D8E0, 0, y + 3.6, -0.25, false, true);
sail.userData.sail = 1;
[-1, 1].forEach(function (sd) { sph(0.16, 0x7AF0A0, sd * 1.45, y + 1.4, 1.5, true); sph(0.16, 0x7AF0A0, sd * 1.45, y + 1.4, -1.8, true); });
}
else if (key === "spider") {
if (typeof shcWebTex === "function") {
face(shcWebTex(), 4.6, 4.6, 0, y + 2.5, -2.6, 0);
}
var ab = sph(1.2, 0x141014, 0, y + 1.4, -0.6);
ab.scale.set(1, 0.8, 1.2);
sph(0.75, 0x1A1418, 0, y + 1.2, 0.9);
sph(0.1, 0xFF2A2A, 0.25, y + 1.4, 1.6, true);
sph(0.1, 0xFF2A2A, -0.25, y + 1.4, 1.6, true);
sph(0.07, 0xFF2A2A, 0.12, y + 1.55, 1.62, true);
sph(0.07, 0xFF2A2A, -0.12, y + 1.55, 1.62, true);
for (var l = 0; l < 8; l++) {
var sd2 = l < 4 ? 1 : -1, zz = 0.2 + (l % 4) * 0.45 - 0.6;
var up = cyl(0.07, 0.07, 1.6, 0x141014, sd2 * 1.1, y + 1.8, zz);
up.rotation.z = -sd2 * 0.9;
var dn = cyl(0.06, 0.05, 1.7, 0x141014, sd2 * 2.0, y + 0.95, zz);
dn.rotation.z = sd2 * 0.35;
dn.userData.leg = l;
}
}
else if (key === "graves") {
box(4.0, 0.25, 7.6, 0x2A3A1E, 0, y + 0.12, 0);
[[-1.2, -2.6], [1.0, -2.0], [-0.6, -0.4], [1.3, 0.6], [-1.3, 1.6]].forEach(function (p, i) { box(0.7, 1.0 + 0.2 * (i % 3), 0.18, 0x7A7A7A, p[0], y + 0.6, p[1]); var tp = cyl(0.35, 0.35, 0.18, 0x7A7A7A, p[0], y + 1.1 + 0.1 * (i % 3) + 0.0, p[1]); tp.rotation.x = Math.PI / 2; });
box(0.8, 0.4, 2.0, 0x3A2214, 0.6, y + 0.45, 2.6);
var lid = box(0.85, 0.08, 2.0, 0x4A2A18, 0.4, y + 0.75, 2.6);
lid.rotation.z = 0.4;
var g2 = add(new THREE.ConeGeometry(0.4, 1.4, 10), 0xF4F4F0, -0.4, y + 1.9, 2.4, false, true);
g2.userData.ghost = 1;
var gh2 = sph(0.28, 0xF4F4F0, -0.4, y + 2.7, 2.4);
gh2.userData.ghost = 1;
for (var m = 0; m < 4; m++) {
var ms = add(new THREE.PlaneGeometry(3.6, 1.6), 0xD8E0E8, 0, y + 0.35, -2.8 + m * 1.8, false, true);
ms.rotation.x = -Math.PI / 2;
ms.material.opacity = 0.25;
}
}
else if (key === "moon") {
cyl(0.1, 0.12, 4.5, 0x2A2A2A, 0, y + 2.25, 0);
var mn = cyl(2.0, 2.0, 0.2, 0xF4D890, 0, y + 5.2, 0, true, 28);
mn.rotation.x = Math.PI / 2;
mn.userData.moon = 1;
for (var bt2 = 0; bt2 < 8; bt2++) {
var bm2 = face(scpBatTex(), 0.9, 0.45, 0, 0, 0, 0);
bm2.userData.orbit = bt2;
}
for (var q = 0; q < 5; q++)
sph(0.4, 0xE86A00, -1.5 + q * 0.75, y + 0.35, 2.8 - (q % 2) * 5.6);
}
else if (key === "scarecrow") {
for (var c = 0; c < 6; c++) {
add(new THREE.ConeGeometry(0.5, 1.8, 7), 0xC8A050, (c % 2 ? 1.4 : -1.4), y + 0.9, -3 + c * 1.2);
}
[-0.6, 0.8].forEach(function (xx, i) {
cyl(0.06, 0.06, 2.6, 0x5A3A1A, xx, y + 1.3, i ? 1.2 : -1.0);
var cr = box(1.6, 0.08, 0.08, 0x5A3A1A, xx, y + 2.1, i ? 1.2 : -1.0);
var sc = scpGuiser(6);
sc.position.set(xx, y + 0.6, i ? 1.2 : -1.0);
sc.scale.setScalar(0.9);
G.add(sc);
var lm = sc.userData.limbs;
if (lm) {
if (lm.la)
lm.la.rotation.z = -1.4;
if (lm.ra)
lm.ra.rotation.z = 1.4;
}
});
for (var p2 = 0; p2 < 4; p2++)
sph(0.42, 0xE86A00, (p2 % 2 ? 0.9 : -0.9), y + 0.4, 2.6 - (p2 > 1 ? 1.0 : 0));
}
G.traverse(function (o) { o.raycast = function () { }; });
return G;
},
function () {
scpParadeDrop();
var g = new THREE.Group();
g.name = "spooks parade";
scene.add(g);
var lite = scpLite(), items = [], s = 0;
function put(o, ds, l, role) { scpBake(o); g.add(o); items.push({ o: o, s: s, l: l || 0, role: role || "walk" }); s += ds || 0; }
var bn = new THREE.Group(), bm = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 0.9), new THREE.MeshBasicMaterial({ map: scpBannerTex("THE SPOOKS PARADE"), side: THREE.DoubleSide }));
bm.position.y = 2.7;
bm.rotation.y = Math.PI / 2;
bm.userData.scpMine = 1;
bn.add(bm);
put(scpGuiser(3), 0, -2.1);
put(scpGuiser(7), 0, 2.1);
put(bn, 5, 0, "float");
var nf = lite ? 6 : SCP_FLOATS.length, gi = 0;
for (var i = 0; i < nf; i++) {
var F = SCP_FLOATS[i];
put(scpFloat(F[0], F[1], F[2]), 11, 0, "float");
var pairs = lite ? 1 : (i % 2 ? 1 : 2);
for (var p = 0; p < pairs; p++) {
put(scpGuiser(gi++), 0, -1.5);
put(scpGuiser(gi++), 2.6, 1.5);
}
s += 1.5;
}
var E = scpEntries().slice(0, lite ? 4 : 10);
if (E.length) {
var b2 = new THREE.Group(), m2 = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 0.9), new THREE.MeshBasicMaterial({ map: scpBannerTex("THE COSTUME CONTEST"), side: THREE.DoubleSide }));
m2.position.y = 2.7;
m2.rotation.y = Math.PI / 2;
m2.userData.scpMine = 1;
b2.add(m2);
put(scpGuiser(gi++), 0, -2.1);
put(scpGuiser(gi++), 0, 2.1);
put(b2, 4, 0, "float");
E.forEach(function (e, k) { var f = scpFigure(e.look, "e" + e.id); if (typeof makeTag === "function") {
var tg = makeTag(e.name + " · " + e.title, false);
tg.position.y = 2.1;
tg.scale.multiplyScalar(0.75);
f.add(tg);
} put(f, k % 2 ? 2.8 : 0, k % 2 ? 1.4 : -1.4); });
}
g.traverse(function (o) { o.raycast = function () { }; o.castShadow = false; o.receiveShadow = false; });
SCP.parade = { g: g, items: items, len: s, key: scpEntries().map(function (e) { return e.id; }).join(",") };
},
function (R, P, len) {
var secs = (Date.now() - scpParadeStart()) / 1000, K = Math.max(1, Math.ceil(2 * Math.PI * R / (SCP_V * 1200)));
var ap = Math.atan2(P.z - ATLC.z, P.x - ATLC.x), a0 = 0.3 + SCP_V * secs / R, best = 0, bd = 1e9;
for (var k = 0; k < K; k++) {
var ah = a0 + k * 2 * Math.PI / K, mid = ah - len / 2 / R, d = Math.abs(atlWrap(ap - mid));
if (d < bd) {
bd = d;
best = k;
}
}
return a0 + best * 2 * Math.PI / K;
},
function () {
var R = scpRingR(), P = camera.position, len = SCP.parade ? SCP.parade.len : 160, a = scpParadeHead(R, P, len) + 14 / R, x = ATLC.x + Math.cos(a) * (R + 7), z = ATLC.z + Math.sin(a) * (R + 7);
camera.position.set(x, terrainY(x, z) + 1.72, z);
if (typeof yaw !== "undefined") {
var dx = ATLC.x + Math.cos(a - 14 / R) * R - x, dz = ATLC.z + Math.sin(a - 14 / R) * R - z;
yaw = Math.atan2(-dx, -dz);
}
setStatus("🎃 <b>The Spooks Parade</b> is coming towards you round " + (typeof evtRingName === "function" ? evtRingName(scpRules().ring) : "the ring") + ".");
},
function (h) {
if (typeof document === "undefined")
return;
var e = document.getElementById("scp-toast");
if (!e) {
e = document.createElement("div");
e.id = "scp-toast";
e.style.cssText = "position:fixed;left:50%;top:64px;transform:translateX(-50%);z-index:61;max-width:min(560px,92vw);padding:10px 16px;border-radius:8px;background:rgba(20,8,4,.94);border:1px solid #FF8A20;color:#FFF0D8;font:14px/1.4 Georgia,serif;box-shadow:0 4px 18px rgba(0,0,0,.5);transition:opacity .8s;cursor:pointer";
e.onclick = function () { e.style.opacity = "0"; scpCard(); };
document.body.appendChild(e);
}
e.innerHTML = h;
e.style.opacity = "1";
e.style.display = "block";
clearTimeout(SCP.toastT);
SCP.toastT = setTimeout(function () { e.style.opacity = "0"; }, 12000);
}
];
});
