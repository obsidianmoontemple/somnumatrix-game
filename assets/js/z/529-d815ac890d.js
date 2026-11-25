/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(529, function () {
return [
function (veh, part, lv, then) {
var cur = ugrLv(veh, part), best = ugrBest(veh, part), cost = lv > best ? ugrStepPrice(veh, part, best, lv) : 0;
ugrPay("garage_fit", { p_veh: veh, p_part: part, p_lvl: lv }, cost, function (r) {
(UGR.fit[veh] = UGR.fit[veh] || {})[part] = lv;
(UGR.best[veh] = UGR.best[veh] || {})[part] = Math.max(best, lv);
ugrLocalSave();
ugrApplyAll();
var P = UGR_PART[part];
UGR.msg = "🔧 <b>" + ugrEsc(P.lv[lv][0]) + "</b> fitted" + (cost ? " for " + ugrGold(r && r.gold != null ? r.gold : cost) : "") + ".";
ugrTone(lv > cur ? 660 : 440, 0.12);
then && then();
}, then);
},
function (veh, look, opt, then) {
if (ugrLook(veh, look) === opt) {
then && then();
return;
}
var cost = ugrLookPrice(veh, look, opt) || 0;
ugrPay("garage_look", { p_veh: veh, p_look: look, p_opt: opt }, cost, function (r) {
(UGR.look[veh] = UGR.look[veh] || {})[look] = opt;
ugrLocalSave();
ugrApplyAll();
var it = ugrLookItem(look, opt);
UGR.msg = "🎨 <b>" + ugrEsc(UGR_LOOKS[look].name) + ": " + ugrEsc(it ? it[1] : opt) + "</b>" + (cost ? " for " + ugrGold(r && r.gold != null ? r.gold : cost) : "") + ".";
ugrTone(600, 0.1);
then && then();
}, then);
},
function (fn, args, cost, ok, fail) {
if (UGR.busy)
return;
var keeper = ugrKeeper();
if (!ugrSigned() && !keeper) {
UGR.msg = "Sign in first: the garage keeps your work against your name.";
fail && fail();
return;
}
if (UGR.missing && !keeper) {
UGR.msg = "The garage's books open once the latest server update is run on the server. Nothing was charged.";
fail && fail();
return;
}
var p = ugrPurse();
if (cost > 0 && !keeper && p != null && p < cost) {
UGR.msg = "That is " + ugrGold(cost) + ", and your purse holds " + ugrGold(p) + ".";
fail && fail();
return;
}
if (!ugrSigned() && keeper) {
ok({ gold: 0 });
return;
}
UGR.busy = true;
UGR.msg = "…";
ugrRpc(fn, args).then(function (r) {
UGR.busy = false;
if (!r || !r.ok) {
UGR.msg = ugrEsc((r && r.say) || "The garage could not do that just now.");
fail && fail();
return;
}
if (typeof refreshStanding === "function")
try {
refreshStanding();
}
catch (e) { }
ok(r);
}).catch(function (e) {
UGR.busy = false;
if (ugrMissingErr(e)) {
UGR.missing = true;
if (keeper) {
ok({ gold: 0 });
return;
}
UGR.msg = "The garage's books open once the latest server update is run on the server. Nothing was charged.";
}
else
UGR.msg = ugrEsc((e && e.message) || String(e));
fail && fail();
});
},
function (fam) {
var keeper = ugrKeeper(), out = [], seen = {};
function add(veh, name, icon) { if (seen[veh])
return; seen[veh] = 1; name = String(name || veh); name = name.charAt(0).toUpperCase() + name.slice(1); out.push({ veh: veh, name: name, icon: icon || UGR_FAM[veh.split(":")[0]].icon }); }
if (fam === "city" || fam === "fly") {
var have = keeper ? UGR_CITY.concat(UGR_FLY) : ugrOwnedThings();
have.forEach(function (a) {
if (fam === "city" && UGR_CITY.indexOf(a) >= 0 && typeof VEH !== "undefined" && VEH[a])
add("city:" + a, VEH[a].name, /moto|scooter/.test(a) ? "🏍️" : /bus|truck|van|tractor/.test(a) ? "🚚" : "🚗");
if (fam === "fly" && UGR_FLY.indexOf(a) >= 0 && typeof FLYER !== "undefined" && FLYER[a])
add("fly:" + a, FLYER[a].name, a === "saucer" ? "🛸" : a === "airship" ? "🎈" : "🪄");
});
}
if (fam === "py" && typeof PY_CARS !== "undefined") {
var own = {};
try {
own = pyOwned() || {};
}
catch (e) { }
PY_CARS.forEach(function (c) { if (keeper || own[c.k])
add("py:" + c.k, c.name, "🏎️"); });
}
if (fam === "apt" && typeof APT_PLANES !== "undefined") {
UGR_APT.forEach(function (k) { var why = ""; try {
why = aptMayFly(k);
}
catch (e) {
why = "?";
} if (keeper || !why)
add("apt:" + k, APT_PLANES[k].name.replace(/^The /, "Your "), k === "airliner" ? "🛫" : "🛩️"); });
}
if (fam === "ship" && typeof SB_SHIPS !== "undefined") {
(typeof sbMine === "function" ? sbMine() : ["corp"]).forEach(function (k) { var D = SB_SHIPS[k]; if (D)
add("ship:" + k, D.name, D.icon); });
}
return out;
},
function (veh) {
var f = veh.split(":")[0], k = veh.slice(f.length + 1), rows = [];
function pct(n) { return Math.round(n * 100) + "%"; }
if (f === "city") {
var B = ugrCityBase(k);
if (B) {
var U = ugrCityStats(veh, B);
rows.push(["Top speed", ugrKmh(U.vmax)], ["Pick-up", (U.acc).toFixed(1) + " m/s²"], ["Stopping", (U.brake).toFixed(1) + " m/s²"]);
}
}
if (f === "fly" && typeof FLYER !== "undefined" && FLYER[k]) {
var F = ugrFlyStats(veh, UGR_FLYBASE[k] || FLYER[k]);
rows.push(["Top speed", ugrKmh(F.vmax)], ["Pick-up", F.acc.toFixed(1) + " m/s²"]);
}
if (f === "py" && typeof pyCar === "function") {
var c = pyCar(k);
if (c) {
var P = ugrPyStats(veh, c);
rows.push(["Top speed", ugrKmh(P.top)], ["Pick-up", P.acc.toFixed(1)], ["Grip", pct(Math.min(1, P.grip))], ["Armour", String(P.hp) + (P.cut ? " · " + pct(P.cut) + " off every blow" : "")], ["Weapon", (P.wmul > 1 ? "+" + pct(P.wmul - 1) + " damage" : "stock")]);
}
}
if (f === "apt" && typeof APT_PLANES !== "undefined" && APT_PLANES[k]) {
var A = ugrAptStats(veh, UGR_APTBASE[k] || APT_PLANES[k]);
rows.push(["Thrust", A.thr.toFixed(2)], ["Drag", pct(A.drag / (UGR_APTBASE[k] || APT_PLANES[k]).drag) + " of stock"], ["Roll rate", A.rollR.toFixed(2)], ["Stall", Math.round(A.stall * 1.944) + " knots"]);
}
if (f === "ship" && typeof SB_SHIPS !== "undefined" && SB_SHIPS[k]) {
var D = SB_SHIPS[k];
rows.push(["Hull", String(Math.round(D.hull)) + " · " + pct(ugrHullFrac(k)) + " whole"], ["Shields", String(Math.round(D.shield))], ["Speed", D.spd.toFixed(2) + " times the cutter's"], ["Guns", D.gun + ": " + Math.round(D.dmg) + (D.n > 1 ? " × " + D.n : "") + ", every " + D.cool.toFixed(2) + " s"]);
var S2 = typeof sbSecondGun === "function" ? sbSecondGun() : null;
if (S2)
rows.push(["Second gun", S2.name + ": " + Math.round(S2.dmg) + (S2.n ? " × " + S2.n : "")]);
}
return rows;
},
function (shop) {
shop = shop || ugrShopHere() || { fams: Object.keys(UGR_FAM), name: "Your garage", look: true };
UGR.at = shop;
UGR.sure = null;
UGR.shown = null;
ugrLoad(false).then(function (ok) { if (!ok || !WLD.card || WLD.card.style.display === "none" || UGR.at !== shop)
return; if (UGR.shown)
ugrVehCard(UGR.shown.veh, UGR.shown.name);
else
ugrHome(); });
ugrHome();
},
function () {
var S = UGR.at;
if (!S)
return;
UGR.shown = null;
var p = ugrPurse(), fns = {};
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>🔧 " + ugrEsc(S.name) + "</div>" +
"<div style='opacity:.8;margin-bottom:6px;font-size:12.5px'>" + (S.look ? "Everything you own, and what is fitted. Take it to " + (S.fams.length > 1 ? "a garage" : ugrEsc(UGR_FAM[S.fams[0]].shop)) + " to have work done." : ugrEsc(S.note || "Every part fitted to the one vehicle, and kept with it.")) +
(p != null ? " Your purse: <b>" + ugrGold(p) + "</b>." : "") + "</div>";
if (UGR.msg)
h += "<div style='margin:4px 0 6px;font-size:12.5px'>" + UGR.msg + "</div>";
var any = false;
S.fams.forEach(function (f) {
var list = ugrVehicles(f);
if (!list.length && S.look)
return;
h += "<div style='margin-top:8px;font-weight:600'>" + UGR_FAM[f].icon + " " + ugrEsc(UGR_FAM[f].name) + "</div>";
if (!list.length)
h += "<div style='opacity:.75;font-size:12.5px'>" + ugrEsc(ugrNoneLine(f)) + "</div>";
list.forEach(function (v, i) {
any = true;
var id = "v" + f + i;
var sub = ugrSummary(v.veh);
h += worldBtn(id, v.icon + " " + ugrEsc(v.name), ugrEsc(sub));
fns[id] = function () { UGR.msg = ""; ugrVehCard(v.veh, v.name); };
});
});
if (!any && S.look)
h += "<div style='opacity:.8'>Nothing of yours to fit yet. Cars are sold at the Transport Yard, race cars at Pyreline Motorworks, and ships fly from the Space Corp Spaceport.</div>";
worldCard(h, fns);
},
function (f) {
return f === "city" ? "You have no car, van or motorbike of your own yet: the Transport Yard sells them." :
f === "fly" ? "No flying machine of your own yet: the Transport Yard sells the saucer and the airship." :
f === "py" ? "No race car of your own yet: buy, win, build or find one at Pyreline." :
f === "apt" ? "The hangar fits the planes you hold a licence for: take Captain Vasquez's lessons at the flight school first." :
"The Corp lends every traveller a cutter: take off from the Spaceport and it is fitted here.";
},
function (veh) {
var f = veh.split(":")[0], n = 0, parts = UGR_PARTS.filter(function (P) { return P.fam.indexOf(f) >= 0; });
parts.forEach(function (P) { if (ugrLv(veh, P.k))
n++; });
var s = n ? n + " of " + parts.length + " parts upgraded" : "Stock: nothing fitted yet";
if (f === "ship") {
var fr = ugrHullFrac(veh.slice(5));
if (fr < 0.995)
s += " · hull " + Math.round(fr * 100) + "%, needs mending";
}
return s;
},
function (veh, name) {
UGR.shown = { veh: veh, name: name };
var S = UGR.at || { fams: [], look: true }, f = veh.split(":")[0], here = !S.look && S.fams.indexOf(f) >= 0, fns = { back: function () { UGR.msg = ""; UGR.sure = null; ugrHome(); } };
var h = "<div style='font:600 17px var(--serif,Georgia);color:#FFE7B0'>" + ugrEsc(name) + "</div>" +
"<div style='opacity:.75;font-size:12px;margin-bottom:4px'>" + (here ? "In the bay at " + ugrEsc(S.name) + ". Tap a level for its price; tap it again to have it fitted." : "Fitted at " + ugrEsc(UGR_FAM[f].shop) + ".") + (ugrPurse() != null ? " Purse: <b>" + ugrGold(ugrPurse()) + "</b>." : "") + "</div>";
if (UGR.msg)
h += "<div style='margin:4px 0 6px;font-size:12.5px;padding:5px 8px;border-radius:5px;background:rgba(255,231,176,.08)'>" + UGR.msg + "</div>";
h += "<table style='width:100%;border-collapse:collapse;font-size:12.5px;margin-bottom:4px'>" + ugrStats(veh).map(function (r) { return "<tr><td style='opacity:.7;padding:2px 8px 2px 0;white-space:nowrap'>" + ugrEsc(r[0]) + "</td><td>" + ugrEsc(r[1]) + "</td></tr>"; }).join("") + "</table>";
if (f === "ship") {
var k = veh.slice(5), D = SB_SHIPS[k], fr = ugrHullFrac(k), price = ugrRepairPrice(veh, ugrHullMaxFor(k), fr), dr = ugrLv(veh, "droids");
h += "<div style='margin:6px 0 2px;font-weight:600'>Hull</div><div style='height:8px;border-radius:4px;background:rgba(255,255,255,.12);overflow:hidden'><i style='display:block;height:100%;width:" + Math.round(fr * 100) + "%;background:" + (fr < 0.3 ? "#E8603A" : fr < 0.7 ? "#E8B04A" : "#9AD88A") + "'></i></div>" +
"<div style='font-size:12px;opacity:.85;margin-top:2px'>" + Math.round(fr * 100) + "% whole. " + (dr ? "Your " + ugrEsc(UGR_PART.droids.lv[dr][0].toLowerCase()) + " mend it as you fly." : "Damage stays until a shipyard mends it.") + "</div>";
if (fr < 0.995) {
if (here) {
h += worldBtn("repair", "🛠️ Mend the hull: " + (price ? ugrGold(price) : "free"), k === "corp" ? "The Corp mends its own cutter for nothing" : "Every dent and breach, back to 100%" + (UGR.sure === "repair" ? " · <b>tap again to pay</b>" : ""));
fns.repair = function () { ugrRepairTap(k, price); };
}
else
h += "<div style='font-size:12px;opacity:.8'>Mending it costs " + (price ? ugrGold(price) : "nothing") + " at any shipyard: a station's dock, Pell's Halo, or a station hall.</div>";
}
}
var parts = UGR_PARTS.filter(function (P) { return P.fam.indexOf(f) >= 0; });
h += "<div style='margin-top:8px;font-weight:600'>Parts</div>";
parts.forEach(function (P) {
var cur = ugrLv(veh, P.k), best = ugrBest(veh, P.k);
h += "<div style='margin:6px 0 2px;font-size:12.5px'><b>" + ugrEsc(P.name) + "</b> <span style='opacity:.75'>· " + ugrEsc(P.lv[cur][0]) + (P.lv[cur][1] && cur ? ": " + ugrEsc(P.lv[cur][1]) : "") + "</span></div><div style='display:flex;flex-wrap:wrap;gap:4px'>";
P.lv.forEach(function (L, i) {
var id = "p_" + P.k + "_" + i, cost = i > best ? ugrStepPrice(veh, P.k, best, i) : 0, on = i === cur, sure = UGR.sure === id;
var label = ugrEsc(L[0]) + (on ? " ✓" : i > best ? " · " + ugrGold(cost) : i <= best && i !== cur ? " · paid" : "");
h += "<span data-w='" + id + "' role='button' tabindex='0' title='" + ugrEsc(L[1] || L[0]) + "' style='padding:4px 8px;border-radius:12px;font-size:11.5px;border:1px solid " + (sure ? "#FFD27A" : "rgba(232,198,106,.5)") + ";" + (on ? "background:rgba(232,198,106,.85);color:#1A1208;" : sure ? "background:rgba(255,210,122,.25);" : "") + (here ? "" : "opacity:.7;") + "'>" + (sure ? "Pay " + ugrGold(cost) + "? Tap again" : label) + "</span>";
fns[id] = function () { if (!here) {
UGR.msg = "Take it to " + ugrEsc(UGR_FAM[f].shop) + " to have that fitted.";
ugrVehCard(veh, name);
return;
} ugrPartTap(veh, name, P.k, i, cost); };
});
h += "</div>";
if (P.lv[Math.min(P.lv.length - 1, cur + 1)] && cur < P.lv.length - 1)
h += "<div style='font-size:11.5px;opacity:.7;margin-top:2px'>Next: " + ugrEsc(P.lv[cur + 1][0]) + (P.lv[cur + 1][1] ? ", " + ugrEsc(P.lv[cur + 1][1]) : "") + "</div>";
});
if (f === "apt")
h += "<div style='font-size:11.5px;opacity:.7;margin-top:6px'>Guns, armour and flares are not fitted to planes: there is nowhere to fight in the air yet, and the airport fits nothing that does nothing.</div>";
if (f === "city")
h += "<div style='font-size:11.5px;opacity:.7;margin-top:6px'>Weapons and armour are fitted to Pyreline's race cars: the city is a safe place and its roads carry none.</div>";
var looks = Object.keys(UGR_LOOKS).filter(function (l) { return UGR_LOOKS[l].fam.indexOf(f) >= 0; });
if (looks.length)
h += "<div style='margin-top:10px;font-weight:600'>Looks</div>";
looks.forEach(function (l) {
var L = UGR_LOOKS[l], cur = ugrLook(veh, l);
h += "<div style='margin:6px 0 2px;font-size:12.5px'><b>" + ugrEsc(L.name) + "</b> <span style='opacity:.75'>· " + ugrEsc(cur != null && ugrLookItem(l, cur) ? ugrLookItem(l, cur)[1] : "as it came") + "</span>" + (L.price && L.price[f] ? " <span style='opacity:.6;font-size:11.5px'>(" + ugrGold(ugrLookPrice(veh, l, null)) + " a job)</span>" : "") + "</div><div style='display:flex;flex-wrap:wrap;gap:4px'>";
L.list.forEach(function (o) {
var id = "l_" + l + "_" + o[0], on = cur === o[0] || (cur == null && (o[0] === "stock" || o[0] === "off" || o[0] === "white") && l !== "paint"), sure = UGR.sure === id, col = typeof o[2] === "number" && o[2] ? "#" + ("000000" + o[2].toString(16)).slice(-6) : null;
var cost = ugrLookPrice(veh, l, o[0]) || 0;
var inner = (col ? "<i style='display:inline-block;width:12px;height:12px;border-radius:6px;vertical-align:-2px;margin-right:4px;background:" + col + ";box-shadow:0 0 0 1px rgba(255,255,255,.3)" + (l === "neon" ? ",0 0 8px " + col : "") + "'></i>" : "") + ugrEsc(o[1]) + (on ? " ✓" : "");
if (sure)
inner = "Pay " + ugrGold(cost) + "? Tap again";
h += "<span data-w='" + id + "' role='button' tabindex='0' style='padding:4px 8px;border-radius:12px;font-size:11.5px;border:1px solid " + (sure ? "#FFD27A" : "rgba(232,198,106,.45)") + ";" + (on ? "background:rgba(232,198,106,.25);" : "") + (here ? "" : "opacity:.7;") + "'>" + inner + "</span>";
fns[id] = function () { if (!here) {
UGR.msg = "Take it to " + ugrEsc(UGR_FAM[f].shop) + " for that.";
ugrVehCard(veh, name);
return;
} ugrLookTap(veh, name, l, o[0], cost); };
});
h += "</div>";
});
h += worldBtn("back", "← All your vehicles", "");
worldCard(h, fns);
},
function (veh, c) {
var o = Object.assign({}, c), aP = UGR_PART.armour, al = ugrLv(veh, "armour");
o.top = c.top * (1 + ugrAdd(veh, "engine"));
o.acc = c.acc * (1 + ugrAdd(veh, "turbo"));
o.grip = Math.min(0.99, c.grip * (1 + ugrAdd(veh, "tyres")));
o.hp = c.hp + (aP.add[al] || 0);
o.cut = aP.cut[al] || 0;
o.wmul = 1 + ugrAdd(veh, "weapons");
o.ugr = 1;
return o;
},
function (g, col, key) {
if (!UGR_V3) {
UGR_V3 = new THREE.Vector3();
UGR_V3B = new THREE.Vector3();
}
if (!g || g.userData.ugrPaint === key)
return;
var byMat = new Map();
g.traverse(function (o) {
if (!o.isMesh || !o.material || Array.isArray(o.material) || (o.userData && (o.userData.vlt || o.userData.ugr)))
return;
var m = o.userData.ugrOrigMat || o.material;
if (!m.color || m.transparent || m.isMeshBasicMaterial || m.isSpriteMaterial || m.blending === THREE.AdditiveBlending)
return;
var c = m.color, lum = 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
if (lum < 0.05)
return;
var n = 0, G = o.geometry;
if (G) {
if (!G.boundingBox)
G.computeBoundingBox();
var bs = G.boundingBox.getSize(UGR_V3), sc = o.getWorldScale(UGR_V3B);
var x = bs.x * sc.x, y = bs.y * sc.y, z = bs.z * sc.z;
n = x * y + y * z + x * z;
}
var e = byMat.get(m) || { n: 0, meshes: [] };
e.n += n;
e.meshes.push(o);
byMat.set(m, e);
});
var best = null;
byMat.forEach(function (e, m) { if (!best || e.n > best.n)
best = { m: m, n: e.n, meshes: e.meshes }; });
g.traverse(function (o) { if (o.userData && o.userData.ugrOrigMat) {
o.material = o.userData.ugrOrigMat;
delete o.userData.ugrOrigMat;
} });
g.userData.ugrPaint = key;
if (!best || col == null)
return;
var nm = best.m.clone();
nm.color = new THREE.Color(col);
if (nm.emissive && nm.emissive.getHex() > 0x101010) {
var e = nm.emissive, l = Math.max(e.r, e.g, e.b);
nm.emissive = new THREE.Color(col).multiplyScalar(l * 0.6);
}
best.meshes.forEach(function (o) { o.userData.ugrOrigMat = o.material; o.material = nm; });
},
function () {
if (UGR_NEONTEX)
return UGR_NEONTEX;
var c = document.createElement("canvas");
c.width = c.height = 128;
var x = c.getContext("2d");
var gr = x.createRadialGradient(64, 64, 6, 64, 64, 64);
gr.addColorStop(0, "rgba(255,255,255,0.95)");
gr.addColorStop(0.55, "rgba(255,255,255,0.45)");
gr.addColorStop(1, "rgba(255,255,255,0)");
x.fillStyle = gr;
x.fillRect(0, 0, 128, 128);
UGR_NEONTEX = new THREE.CanvasTexture(c);
return UGR_NEONTEX;
},
function (g, col, len, wid, y) {
var m = g.userData.ugrNeon;
if (!col) {
if (m) {
g.remove(m);
m.material.dispose();
g.userData.ugrNeon = null;
}
return;
}
if (!m) {
var geo = new THREE.PlaneGeometry(1, 1);
geo.rotateX(-Math.PI / 2);
m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: ugrNeonTex(), color: col, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false, fog: true }));
m.userData.ugr = 1;
m.raycast = function () { };
m.renderOrder = 1;
g.add(m);
g.userData.ugrNeon = m;
}
m.material.color.setHex(col);
m.scale.set(wid * 2 + 1.4, 1, len * 2 + 1.6);
m.position.set(0, y || 0.06, 0);
},
function (veh, B) {
var o = Object.assign({}, B), w = ugrAdd(veh, "wing"), c = ugrAdd(veh, "controls");
o.thr = B.thr * (1 + ugrAdd(veh, "aengine"));
o.drag = B.drag * (1 - ugrAdd(veh, "airframe"));
o.pitchR = B.pitchR * (1 + c);
o.rollR = B.rollR * (1 + c);
o.stall = B.stall * (1 - w);
o.rot = B.rot * (1 - w * 0.8);
o.top = B.top * Math.sqrt((o.thr / B.thr) / (o.drag / B.drag));
return o;
},
function (F, on) {
var g = F.g;
if (!g)
return;
var veh = F.ugrVeh || ("apt:" + F.kind), paint = on ? ugrLookItem("paint", ugrLook(veh, "paint")) : null, lc = on ? ugrLookItem("lampcol", ugrLook(veh, "lampcol")) : null;
ugrPaintGroup(g, paint ? paint[2] : null, (paint ? paint[0] : "-") + "|" + (on ? 1 : 0));
if (g.userData.ugrLamp) {
g.remove(g.userData.ugrLamp);
g.userData.ugrLamp = null;
}
if (g.userData.ugrSpot) {
g.remove(g.userData.ugrSpot);
g.remove(g.userData.ugrSpot.target);
g.userData.ugrSpot = null;
}
if (on && lc && lc[2] && typeof vltGlowTex === "function") {
var nose = F.spec.k === "airliner" ? 18 : 3.6;
var s = new THREE.Sprite(new THREE.SpriteMaterial({ map: vltGlowTex(), color: lc[2], blending: THREE.AdditiveBlending, transparent: true, depthWrite: false }));
s.scale.set(1.6, 1.6, 1);
s.position.set(0, F.spec.k === "airliner" ? 1.2 : 0.6, nose);
s.userData.ugr = 1;
g.add(s);
g.userData.ugrLamp = s;
if (!ugrLite()) {
var sp = new THREE.SpotLight(lc[2], 1.2, 160, 0.32, 0.6, 1.2);
sp.position.copy(s.position);
sp.target.position.set(0, -4, nose + 60);
g.add(sp);
g.add(sp.target);
g.userData.ugrSpot = sp;
}
}
},
function () {
if (UGR_SMOKETEX)
return UGR_SMOKETEX;
var c = document.createElement("canvas");
c.width = c.height = 64;
var x = c.getContext("2d"), gr = x.createRadialGradient(32, 32, 2, 32, 32, 32);
gr.addColorStop(0, "rgba(255,255,255,0.85)");
gr.addColorStop(0.6, "rgba(255,255,255,0.35)");
gr.addColorStop(1, "rgba(255,255,255,0)");
x.fillStyle = gr;
x.fillRect(0, 0, 64, 64);
UGR_SMOKETEX = new THREE.CanvasTexture(c);
return UGR_SMOKETEX;
},
function (parent, x, y, z, col, size, life, drift) {
var max = ugrLite() ? 24 : 70;
if (UGR.fx.length >= max) {
var o = UGR.fx.shift();
if (o.s.parent)
o.s.parent.remove(o.s);
o.s.material.dispose();
}
var s = new THREE.Sprite(new THREE.SpriteMaterial({ map: ugrSmokeTex(), color: col, transparent: true, opacity: 0.7, depthWrite: false, fog: true }));
s.position.set(x, y, z);
s.scale.set(size, size, 1);
s.userData.ugr = 1;
s.raycast = function () { };
parent.add(s);
UGR.fx.push({ s: s, t: 0, life: life, size: size, dx: (drift && drift.x) || 0, dy: (drift && drift.y) || 0.4, dz: (drift && drift.z) || 0 });
},
function (force) {
if (typeof SB === "undefined" || !sbHere() || !SB.rollG)
return;
var k = SB.k, D = SB_SHIPS[k];
if (!D)
return;
var fr = Math.max(0, Math.min(1, SB.hull / Math.max(1, D.hull))), veh = "ship:" + k, was = UGR.hull[veh] == null ? 1 : UGR.hull[veh];
if (Math.abs(fr - was) > 0.0005) {
UGR.hull[veh] = fr;
(UGR.unsent = UGR.unsent || {})[veh] = 1;
ugrLocalSave();
}
var sent = UGR.hullSent[veh];
if (sent == null)
sent = was;
if (Math.abs(fr - sent) > 0.0005 && (force || Date.now() - (UGR.hullAt || 0) > 15000) && ugrSigned() && !UGR.missing) {
UGR.hullAt = Date.now();
UGR.hullSent[veh] = fr;
ugrRpc("ship_hull_save", { p_ship: k, p_frac: Math.round(fr * 1000) / 1000 }).then(function () { if (UGR.unsent && UGR.hull[veh] === fr)
delete UGR.unsent[veh]; }).catch(function (e) { if (ugrMissingErr(e))
UGR.missing = true; });
}
},
function (dt) {
if (typeof SB === "undefined" || !sbHere())
return;
var k = SB.k, veh = "ship:" + k, D = SB_SHIPS[k];
if (!D)
return;
var burn = ugrAdd(veh, "burn");
if (burn > 0 && typeof SP_CRUISE !== "undefined" && SP.speed > SP_CRUISE * 1.3 && !SP.auto)
SP.pos.addScaledVector(SP.vel, dt * burn);
UGR.dmgT -= dt;
if (UGR.dmgT <= 0) {
UGR.dmgT = 1;
ugrHullKeep(false);
var holed = ugrHullFrac(k) < 0.3;
if (holed !== !!UGR.holed) {
UGR.holed = holed;
ugrShipApply();
}
ugrShipLooks();
}
var fr = SB.hull / Math.max(1, D.hull);
if (fr < 0.6 && SP.ship && SB.view === "chase" && !(typeof sbVR === "function" && sbVR())) {
UGR.smk = (UGR.smk || 0) - dt;
if (UGR.smk <= 0) {
UGR.smk = (ugrLite() ? 0.22 : 0.09) * (0.4 + fr);
var par = SP.ship.parent || scene, p = SP.ship.position;
var len = (D.len || 12) * 0.45, j = function () { return (Math.random() - 0.5) * len; };
ugrPuff(par, p.x + j(), p.y + j() * 0.4, p.z + j(), fr < 0.3 ? 0x4A4644 : 0x9A9896, len * 0.9, 1.8, { x: 0, y: 2.5, z: 0 });
if (fr < 0.3 && Math.random() < 0.35)
ugrPuff(par, p.x + j(), p.y + j() * 0.4, p.z + j(), 0xFF8A3A, len * 0.2, 0.9, { y: 1 });
}
}
},
function () {
var g = SB.model;
if (!g)
return;
var veh = "ship:" + SB.k, paint = ugrLookItem("paint", ugrLook(veh, "paint")), lc = ugrLookItem("lampcol", ugrLook(veh, "lampcol"));
ugrPaintGroup(g, paint ? paint[2] : null, (paint ? paint[0] : "-") + "|" + SB.k);
var key = lc && lc[2] ? lc[0] : "";
if ((g.userData.ugrLc || "") === key)
return;
g.userData.ugrLc = key;
(g.userData.ugrLights || []).forEach(function (s) { g.remove(s); s.material.dispose(); });
g.userData.ugrLights = [];
if (!key || typeof vltGlowTex !== "function")
return;
var b = new THREE.Box3().setFromObject(g), c = b.getCenter(new THREE.Vector3()), s = b.getSize(new THREE.Vector3());
g.updateMatrixWorld(true);
var inv = new THREE.Matrix4().copy(g.matrixWorld).invert();
[[-0.5, 0, 0], [0.5, 0, 0], [0, 0.5, 0.3], [0, -0.2, -0.5], [-0.35, 0, 0.45], [0.35, 0, 0.45]].forEach(function (o) {
var sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: vltGlowTex(), color: lc[2], blending: THREE.AdditiveBlending, transparent: true, depthWrite: false }));
var w = new THREE.Vector3(c.x + o[0] * s.x, c.y + o[1] * s.y, c.z + o[2] * s.z).applyMatrix4(inv);
sp.position.copy(w);
var r = Math.max(0.8, Math.max(s.x, s.z) * 0.06);
sp.scale.set(r, r, 1);
sp.userData.ugr = 1;
g.add(sp);
g.userData.ugrLights.push(sp);
});
},
function (k, price) {
var veh = "ship:" + k, D = SB_SHIPS[k];
function done(r) {
UGR.hull[veh] = 1;
UGR.hullSent[veh] = 1;
ugrLocalSave();
if (SB.k === k) {
SB.hull = D.hull;
SB.shield = D.shield;
}
ugrShipApply();
UGR.msg = "🛠️ <b>" + ugrEsc(D.short || D.name) + " is mended</b>: every breach closed, hull at 100%" + (r && r.gold ? " for " + ugrGold(r.gold) : "") + ".";
ugrTone(660, 0.14);
ugrVehCard(veh, D.name);
}
if (!ugrSure("repair", price)) {
UGR.msg = "";
ugrVehCard(veh, D.name);
return;
}
if (price <= 0 || ugrKeeper() && !ugrSigned()) {
done({ gold: 0 });
if (ugrSigned() && !UGR.missing)
ugrRpc("ship_hull_save", { p_ship: k, p_frac: 1 }).catch(function () { });
return;
}
if (UGR.missing) {
UGR.msg = "(Mended for nothing: the shipyard's books open once the latest server update is run.)";
done({ gold: 0 });
return;
}
ugrPay("ship_repair", { p_ship: k, p_frac: Math.round(ugrHullFrac(k) * 1000) / 1000 }, price, done, function () { ugrVehCard(veh, D.name); });
ugrVehCard(veh, D.name);
}
];
});
