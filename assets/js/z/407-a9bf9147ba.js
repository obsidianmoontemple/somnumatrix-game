/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(407, function () {
"use strict";
return [
function (k) {
if (typeof BCN_WORLDS !== "undefined" && BCN_WORLDS[k])
return BCN_WORLDS[k];
if (k === "dream")
return "your own dream";
var m = /^(w|land)_(.+)$/.exec(String(k || ""));
if (!m)
return k;
if (m[1] === "w" && typeof WORLDS !== "undefined" && WORLDS[m[2]] && WORLDS[m[2]].name)
return WORLDS[m[2]].name;
if (m[1] === "land" && typeof REALMS !== "undefined" && REALMS[m[2]] && REALMS[m[2]].name)
return REALMS[m[2]].name;
return m[2].replace(/_/g, " ");
},
function (b, W) {
if (b.world !== W.key)
return null;
if (b.place && W.key === "city") {
var a = store.workplaceAt && store.workplaceAt[b.place];
var lift = 0;
if (!a && /^the somnucor tower$/i.test(b.place) && typeof nltTowerSpec === "function") {
a = nltTowerSpec();
if (a)
lift = 170 * (a.s || a.scale || 1);
}
if (!a && /^the temple of the obsidian moon$/i.test(b.place) && typeof otmCitySpot === "function") {
var T = otmCitySpot();
if (T) {
a = { x: T.x + Math.sin(T.ry) * -18, z: T.z + Math.cos(T.ry) * -18 };
lift = Math.max(0, T.y + 29 - (W.ground(a.x - W.ox, a.z - W.oz) || 0));
}
}
if (a)
return { x: a.x - W.ox, z: a.z - W.oz, y: null, lift: lift };
}
return { x: b.x, z: b.z, y: null };
},
function (f) {
var S = bcnHereSpot();
if (!S) {
BCN.msg = "A beacon has to stand out of doors, in a world. Step outside first.";
bcnPaint();
return;
}
if (S.world === "dream")
f.share = "me";
var label = String(f.label || "").replace(/[<>]/g, "").trim().slice(0, 32) || "My spot";
if (BCN.young && BCN_KID_NAMES.indexOf(label) < 0)
label = "My spot";
var col = BCN_PALETTE.indexOf(f.color) >= 0 ? f.color : BCN_PALETTE[0];
var share = f.share === "friends" || f.share === "circle" ? f.share : "me";
if (BCN.young && share === "friends")
share = "circle";
var was = bcnMine(), m = { world: S.world, x: S.x, y: S.y, z: S.z, label: label, color: col, share: share, at: new Date().toISOString() };
var moved = was ? " Your old beacon" + (was.world !== S.world ? " in " + bcnWorldName(was.world) : "") + " has gone out." : "";
bcnKeepMine(m);
BCN.msg = "✨ Your beacon stands here now." + moved;
if (S.world !== "dream" && bcnSigned() && typeof cityRpc === "function") {
cityRpc("beacon_set", { p_world: S.world, p_x: S.x, p_y: S.y, p_z: S.z, p_label: label, p_color: col, p_share: share }).then(function (d) {
if (d && d.ok) {
m.cloud = 1;
m.label = d.label || m.label;
m.color = d.color || m.color;
m.share = d.share || m.share;
BCN.young = !!d.young;
bcnKeepMine(m);
}
else if (d && d.say) {
BCN.msg = d.say;
if (was)
bcnKeepMine(was);
}
bcnPaint();
}, function () { BCN.msg = "✨ Your beacon stands here (kept on this device: the server could not take it just now, so only you see it)."; bcnPaint(); });
}
else if (S.world === "dream")
BCN.msg = "✨ Your beacon stands in your own dream. Only you ever see it here." + moved;
bcnSay("✨ <b>" + bcnE(label) + "</b>: your beacon is lit.");
bcnPaint();
},
function (world, lx, lz, name) {
var W = bcnWhere();
if (!W || W.key !== world) {
bcnSay("<b>" + bcnE(name) + "</b> is in " + bcnE(bcnWorldName(world)) + ". The pointer shows the way once you are there.");
return false;
}
if (typeof guideTo === "undefined")
return false;
guideTo = { key: "✨ " + name, x: W.ox + lx, z: W.oz + lz, bcn: world };
bcnSay("<b>✨ " + bcnE(name) + "</b>: follow the pointer at the top of the screen, and the beam in the sky.");
return true;
},
function () {
if (BCN.geo)
return;
BCN.geo = new THREE.PlaneGeometry(1, 1);
BCN.geo.translate(0, 0.5, 0);
BCN.disc = new THREE.PlaneGeometry(1, 1);
BCN.disc.rotateX(-Math.PI / 2);
var cv = document.createElement("canvas");
cv.width = 64;
cv.height = 256;
var g = cv.getContext("2d"), im = g.createImageData(64, 256);
for (var y = 0; y < 256; y++) {
var v = y / 255, up = Math.pow(v, 0.6) * (1 - Math.pow(1 - v, 24) * 0.6);
for (var x = 0; x < 64; x++) {
var u = (x + 0.5) / 64 * 2 - 1, a = Math.exp(-u * u * 3.2) * (0.35 + 0.65 * up) * (1 - Math.pow(Math.abs(u), 6));
var i = (y * 64 + x) * 4;
im.data[i] = im.data[i + 1] = im.data[i + 2] = 255;
im.data[i + 3] = Math.max(0, Math.min(255, Math.round(a * 255)));
}
}
g.putImageData(im, 0, 0);
BCN.tex = new THREE.CanvasTexture(cv);
var cg = document.createElement("canvas");
cg.width = cg.height = 64;
var h = cg.getContext("2d"), rg = h.createRadialGradient(32, 32, 0, 32, 32, 32);
rg.addColorStop(0, "rgba(255,255,255,1)");
rg.addColorStop(0.25, "rgba(255,255,255,.55)");
rg.addColorStop(1, "rgba(255,255,255,0)");
h.fillStyle = rg;
h.fillRect(0, 0, 64, 64);
BCN.glow = new THREE.CanvasTexture(cg);
},
function (text, col) {
var cv = document.createElement("canvas");
cv.width = 512;
cv.height = 72;
var x = cv.getContext("2d");
x.font = "600 34px system-ui,sans-serif";
var w = Math.min(500, x.measureText(text).width + 48);
x.fillStyle = "rgba(14,12,24,.72)";
x.beginPath();
if (x.roundRect)
x.roundRect(256 - w / 2, 8, w, 56, 28);
else
x.rect(256 - w / 2, 8, w, 56);
x.fill();
x.strokeStyle = col;
x.lineWidth = 3;
x.stroke();
x.fillStyle = "#F6EED8";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillText(text, 256, 37, 470);
var sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(cv), transparent: true, depthWrite: false, depthTest: false, fog: false }));
sp.raycast = function () { };
sp.renderOrder = 5;
return sp;
},
function (o) {
bcnKit();
var g = new THREE.Group(), col = new THREE.Color(o.color);
var halo = new THREE.Mesh(BCN.geo, bcnMat(BCN.tex, col)), core = new THREE.Mesh(BCN.geo, bcnMat(BCN.tex, new THREE.Color(o.color).lerp(new THREE.Color(0xFFFFFF), 0.55)));
var foot = new THREE.Mesh(BCN.disc, bcnMat(BCN.glow, col));
var flare = new THREE.Sprite(new THREE.SpriteMaterial({ map: BCN.glow, color: new THREE.Color(o.color).lerp(new THREE.Color(0xFFFFFF), 0.35), transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, fog: false, toneMapped: false }));
[halo, core, foot, flare].forEach(function (m) { m.raycast = function () { }; m.frustumCulled = false; m.renderOrder = 2; g.add(m); });
foot.position.y = 0.06;
var lab = o.text ? bcnLabel(o.text, o.color) : null;
if (lab)
g.add(lab);
var sw = null;
if (o.swirl) {
sw = [];
var n = bcnLite() ? 27 : 66, sc = new THREE.Color(o.color).lerp(new THREE.Color(0xFFFFFF), 0.3);
for (var k = 0; k < n; k++) {
var sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: BCN.glow, color: sc, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, fog: false, toneMapped: false }));
sp.raycast = function () { };
sp.frustumCulled = false;
sp.renderOrder = 3;
sp.userData = { s: (k % (n / 3)) / (n / 3), strand: k % 3 };
g.add(sp);
sw.push(sp);
}
}
g.userData = { halo: halo, core: core, foot: foot, flare: flare, lab: lab, sw: sw, sig: o.sig };
return g;
},
function () {
var el = document.getElementById("bcn-box");
if (el || !document.body)
return el;
el = document.createElement("div");
el.id = "bcn-box";
el.style.cssText = "position:fixed;right:max(12px,env(safe-area-inset-right,0px));top:calc(64px + env(safe-area-inset-top,0px));z-index:46;width:min(360px,calc(100vw - 24px));max-height:calc(100vh - 120px);overflow:auto;" +
"background:rgba(18,14,30,.96);border:1px solid #6A5FA0;border-radius:14px;padding:12px 14px;color:#EDE8F8;font:13.5px system-ui,sans-serif;display:none;box-shadow:0 8px 30px rgba(0,0,0,.5)";
["keydown", "keyup", "keypress", "pointerdown", "mousedown", "touchstart", "wheel"].forEach(function (e) { el.addEventListener(e, function (ev) { ev.stopPropagation(); }); });
document.body.appendChild(el);
return el;
},
function (list, cur, attr) { return list.map(function (c, i) { return "<span " + attr + "='" + c + "' title='" + bcnE(BCN_PALETTE_NAMES[i] || c) + "' role='button' style='display:inline-block;width:24px;height:24px;border-radius:50%;margin:3px 5px 0 0;cursor:pointer;background:" + c + ";box-shadow:0 0 8px " + c + ";border:2px solid " + (c === cur ? "#FFFFFF" : "rgba(0,0,0,.4)") + "'></span>"; }).join(""); },
function () {
var el = bcnEl();
if (!el)
return;
if (!BCN.open) {
el.style.display = "none";
return;
}
var W = bcnWhere(), m = bcnMine(), H = [], young = BCN.young;
var F = BCN.form || (BCN.form = { label: m ? m.label : "My spot", color: m ? m.color : BCN_PALETTE[0], share: m ? m.share : "me" });
H.push("<div style='display:flex;justify-content:space-between;align-items:center'><b style='font-size:15px'>✨ Magic beacons</b><span data-bcn='close' role='button' style='cursor:pointer;font-size:16px'>✕</span></div>");
H.push("<div style='color:#A9A2C0;font-size:12.5px;margin:4px 0 8px'>A beam of light into the sky that marks a place. You may have one at a time; setting a new one moves it.</div>");
if (m)
H.push("<div style='border:1px solid #3A3460;border-radius:10px;padding:8px 10px;margin-bottom:8px'><div><span style='display:inline-block;width:10px;height:10px;border-radius:50%;background:" + m.color + ";box-shadow:0 0 6px " + m.color + "'></span> <b>" + bcnE(m.label) + "</b></div>" +
"<div style='font-size:12.5px;color:#C8C0E0'>In " + bcnE(bcnWorldName(m.world)) + (bcnDist(m.world, m.x, m.z) ? " · " + bcnDist(m.world, m.x, m.z) + " away" : "") + " · seen by " + ({ me: "only you", friends: "you and your friends", circle: "you and your class or family" }[m.share] || "only you") + "</div>" +
"<div><button data-bcn='way' style='" + BCN_BTN + "'>📍 Show me the way</button><button data-bcn='clear' style='" + BCN_BTN + "'>Take it down</button></div></div>");
else
H.push("<div style='font-size:12.5px;color:#C8C0E0;margin-bottom:6px'>You have no beacon lit.</div>");
if (!W)
H.push("<div style='font-size:12.5px;color:#E8C66A'>Step out of doors to set a beacon.</div>");
else {
H.push("<div style='font-weight:600;margin-top:4px'>" + (m ? "Move my beacon here" : "Set my beacon here") + " <span style='font-weight:400;color:#A9A2C0'>(" + bcnE(W.name) + ")</span></div>");
if (young)
H.push("<select data-bcnf='label' style='" + BCN_INP + ";margin-top:5px'>" + BCN_KID_NAMES.map(function (n) { return "<option" + (n === F.label ? " selected" : "") + ">" + bcnE(n) + "</option>"; }).join("") + "</select>");
else
H.push("<input data-bcnf='label' maxlength='32' value='" + bcnE(F.label) + "' placeholder='What it marks (My spot, Meeting point…)' style='" + BCN_INP + ";width:100%;box-sizing:border-box;margin-top:5px'>");
H.push("<div style='margin-top:4px'>" + bcnSwatches(BCN_PALETTE, F.color, "data-bcnc") + "</div>");
if (W.own)
H.push("<div style='font-size:12.5px;color:#A9A2C0;margin-top:5px'>In your own dream only you see it.</div>");
else
H.push("<label style='display:block;margin-top:6px;font-size:12.5px'>Who sees it<br><select data-bcnf='share' style='" + BCN_INP + ";margin-top:3px'>" +
[["me", "Only me"]].concat(young ? [] : [["friends", "Me and my friends"]]).concat([["circle", "Me and my class or family"]]).map(function (o) { return "<option value='" + o[0] + "'" + (o[0] === F.share ? " selected" : "") + ">" + o[1] + "</option>"; }).join("") + "</select></label>" +
(young ? "<div style='font-size:12px;color:#A9A2C0;margin-top:3px'>Your class or family sees it only if your grown-up lets classmates see each other.</div>" : ""));
H.push("<div><button data-bcn='set' style='" + BCN_BTN + ";border-color:#E8C66A'>✨ " + (m ? "Move it here" : "Light it here") + "</button></div>");
}
if (BCN.msg)
H.push("<div style='margin-top:6px;font-size:12.5px;color:#E8C66A'>" + bcnE(BCN.msg) + "</div>");
if (W) {
var c = bcnCfg(), ks = c.off ? [] : c.list.filter(function (b) { return bcnKeeperSees(b) && b.world === W.key && b.guide !== false; });
var os = W.key === BCN.seenKey ? BCN.others : [];
if (ks.length || os.length) {
H.push("<div style='font-weight:600;margin-top:10px'>Beacons in " + bcnE(W.name) + "</div>");
ks.forEach(function (b) {
var s = bcnKeeperSpot(b, W);
if (!s)
return;
H.push("<div style='display:flex;justify-content:space-between;align-items:center;border-top:1px solid #2A2448;padding:5px 0'><span><span style='color:" + b.color + "'>●</span> " + bcnE(b.label || b.name) + " <span style='color:#A9A2C0;font-size:12px'>" + bcnDist(W.key, s.x, s.z) + "</span></span>" +
"<button data-bcnway='" + bcnE(b.id) + "' style='" + BCN_BTN + ";margin:0'>📍 Way</button></div>");
});
os.forEach(function (o, i) {
H.push("<div style='display:flex;justify-content:space-between;align-items:center;border-top:1px solid #2A2448;padding:5px 0'><span><span style='color:" + bcnE(o.color) + "'>●</span> " + bcnE((o.name || "A friend") + ": " + o.label) + " <span style='color:#A9A2C0;font-size:12px'>" + bcnDist(W.key, +o.x, +o.z) + "</span></span>" +
"<button data-bcnwayp='" + i + "' style='" + BCN_BTN + ";margin:0'>📍 Way</button></div>");
});
}
}
if (bcnKeeper())
H.push(bcnKeeperHtml(W));
el.innerHTML = H.join("");
el.style.display = "block";
el.querySelectorAll("[data-bcnf]").forEach(function (e) { var k = e.getAttribute("data-bcnf"); e[e.tagName === "INPUT" ? "oninput" : "onchange"] = function () { F[k] = e.value; }; });
el.querySelectorAll("[data-bcnc]").forEach(function (e) { e.onclick = function () { F.color = e.getAttribute("data-bcnc"); bcnPaint(); }; });
el.querySelectorAll("[data-bcn]").forEach(function (e) {
e.onclick = function () {
var a = e.getAttribute("data-bcn");
if (a === "close")
bcnClose();
else if (a === "set") {
bcnSet(F);
}
else if (a === "clear")
bcnClear();
else if (a === "way" && m)
bcnGuide(m.world, m.x, m.z, m.label);
};
});
el.querySelectorAll("[data-bcnway]").forEach(function (e) { e.onclick = function () { var b = bcnCfg().list.filter(function (x) { return x.id === e.getAttribute("data-bcnway"); })[0], W2 = bcnWhere(); if (!b || !W2)
return; var s = bcnKeeperSpot(b, W2); if (s)
bcnGuide(b.world, s.x, s.z, b.label || b.name); }; });
el.querySelectorAll("[data-bcnwayp]").forEach(function (e) { e.onclick = function () { var o = BCN.others[+e.getAttribute("data-bcnwayp")]; if (o)
bcnGuide(BCN.seenKey, +o.x, +o.z, (o.name ? o.name.split(" ")[0] + ": " : "") + o.label); }; });
if (bcnKeeper())
bcnKeeperWire(el, W);
},
function (K) {
var fr = typeof fwFriends === "function" ? fwFriends() : [], to = K.to || [], I = BCN_INP;
return "<div style='margin-top:6px;font-size:12.5px'>Also seen by these players:" +
(to.length ? to.map(function (p, i) { return "<span style='display:inline-block;margin:3px 4px 0 0;padding:2px 8px;border:1px solid #4A4470;border-radius:999px'>" + bcnE(p.name) + " <span data-bkto='" + i + "' role='button' style='cursor:pointer'>✕</span></span>"; }).join("") : " <i style='color:#A9A2C0'>nobody chosen</i>") +
"<div style='display:flex;gap:6px;flex-wrap:wrap;margin-top:4px'>" +
(fr.length ? "<select data-bkf2='friend' style='" + I + "'><option value=''>A friend…</option>" + fr.map(function (f) { return "<option value='" + bcnE(f.id) + "'>" + bcnE(f.name || "A friend") + "</option>"; }).join("") + "</select>" : "") +
"<input data-bkf2='who' placeholder='or their email' style='" + I + ";width:150px'><button data-bka='addto' style='" + BCN_BTN + ";margin:0'>Add</button></div></div>";
},
function (W) {
var c = bcnCfg(), K = BCN.kform, H = ["<div style='border-top:2px solid #E8C66A;margin-top:12px;padding-top:8px'><b>🜂 Keeper beacons</b> <span style='color:#A9A2C0;font-size:12px'>(everything here is also in admin → In the game → Magic beacons)</span></div>"];
if (c.off)
H.push("<div style='color:#E8C66A;font-size:12.5px'>All Keeper beacons are switched off in admin.</div>");
if (K) {
var I = BCN_INP;
H.push("<div style='border:1px solid #6A5FA0;border-radius:10px;padding:8px;margin-top:6px'>" +
"<div style='font-size:12.5px;color:#C8C0E0'>" + (K.isNew ? "New beacon where you stand" : "Editing") + " · " + bcnE(bcnWorldName(K.world)) + (K.place ? " · at " + bcnE(K.place) : " · " + K.x + ", " + K.z) + "</div>" +
"<label style='display:block;margin-top:5px'>Name (for your list)<br><input data-bk='name' maxlength='40' value='" + bcnE(K.name) + "' style='" + I + ";width:100%;box-sizing:border-box'></label>" +
"<label style='display:block;margin-top:5px'>Words over it (blank for none)<br><input data-bk='label' maxlength='40' value='" + bcnE(K.label) + "' style='" + I + ";width:100%;box-sizing:border-box'></label>" +
"<div style='display:flex;gap:8px;flex-wrap:wrap;margin-top:5px;align-items:flex-end'><label>Colour<br><input type='color' data-bk='color' value='" + bcnE(K.color.toLowerCase()) + "' style='width:48px;height:30px'></label>" +
"<label>Brightness<br><select data-bk='bright' style='" + I + "'>" + Object.keys(BCN_BRIGHT).map(function (k) { return "<option value='" + k + "'" + (+k === K.bright ? " selected" : "") + ">" + BCN_BRIGHT[k] + "</option>"; }).join("") + "</select></label>" +
"<label>Light<br><select data-bk='motion' style='" + I + "'><option value='glow'" + (K.motion === "glow" ? " selected" : "") + ">Slow glow</option><option value='steady'" + (K.motion === "steady" ? " selected" : "") + ">Steady</option></select></label></div>" +
"<div style='display:flex;gap:8px;flex-wrap:wrap;margin-top:5px'><label>Height (m)<br><input type='number' data-bk='height' min='10' max='800' value='" + K.height + "' style='" + I + ";width:72px'></label>" +
"<label>Width (m)<br><input type='number' data-bk='width' min='0.5' max='16' step='0.5' value='" + K.width + "' style='" + I + ";width:64px'></label>" +
"<label>Raise (m)<br><input type='number' data-bk='lift' min='0' max='400' value='" + K.lift + "' style='" + I + ";width:60px' title='Lift its foot, for a rooftop or a tower top'></label>" +
"<label>Fades past (m, 0 never)<br><input type='number' data-bk='fade' min='0' max='20000' step='50' value='" + K.fade + "' style='" + I + ";width:84px'></label></div>" +
"<label style='display:block;margin-top:5px'>Who sees it<br><select data-bk='who' style='" + I + "'>" + Object.keys(BCN_WHO).map(function (k) { return "<option value='" + k + "'" + (k === K.who ? " selected" : "") + ">" + BCN_WHO[k] + "</option>"; }).join("") + "</select></label>" +
bcnToHtml(K) +
"<label style='display:flex;gap:6px;align-items:center;margin-top:5px'><input type='checkbox' data-bk='guide'" + (K.guide ? " checked" : "") + "> Listed for players with Show me the way</label>" +
"<label style='display:flex;gap:6px;align-items:center;margin-top:3px'><input type='checkbox' data-bk='on'" + (K.on ? " checked" : "") + "> Lit</label>" +
"<div><button data-bka='save' style='" + BCN_BTN + ";border-color:#E8C66A'>Save</button><button data-bka='herenow' style='" + BCN_BTN + "'>Move it to where I stand</button><button data-bka='cancel' style='" + BCN_BTN + "'>Cancel</button></div></div>");
}
else if (W)
H.push("<div><button data-bka='new' style='" + BCN_BTN + ";border-color:#E8C66A'>✨ New Keeper beacon where I stand</button></div>");
if (BCN.kmsg)
H.push("<div style='margin-top:5px;font-size:12.5px;color:#E8C66A'>" + bcnE(BCN.kmsg) + "</div>");
if (c.list.length) {
H.push("<div style='margin-top:6px;font-size:12.5px'>");
c.list.forEach(function (b) {
var here = W && b.world === W.key;
H.push("<div style='border-top:1px solid #2A2448;padding:5px 0'><span style='color:" + b.color + "'>●</span> <b>" + bcnE(b.name) + "</b>" + (b.on ? "" : " <i style='color:#A9A2C0'>(out)</i>") +
"<div style='color:#A9A2C0'>" + bcnE(bcnWorldName(b.world)) + (b.place ? " · " + bcnE(b.place) : " · " + b.x + ", " + b.z) + (here ? " · " + bcnDist(b.world, (bcnKeeperSpot(b, W) || b).x, (bcnKeeperSpot(b, W) || b).z) : "") + " · " + BCN_WHO[b.who] + ((b.to || []).length ? " + " + b.to.length + " chosen" : "") + "</div>" +
"<button data-bke='" + bcnE(b.id) + "' style='" + BCN_BTN + "'>Change</button><button data-bkt='" + bcnE(b.id) + "' style='" + BCN_BTN + "'>" + (b.on ? "Put out" : "Light") + "</button>" +
(here ? "<button data-bkw='" + bcnE(b.id) + "' style='" + BCN_BTN + "'>📍 Way</button>" : "") + "<button data-bkd='" + bcnE(b.id) + "' style='" + BCN_BTN + "'>Take away</button></div>");
});
H.push("</div>");
}
return H.join("");
},
function (c, say) {
c = bcnCleanCfg(c);
if (typeof DW_CLOUD !== "undefined") {
if (!DW_CLOUD.config)
DW_CLOUD.config = {};
DW_CLOUD.config.beacons = c;
}
BCN.kmsg = "Saving…";
bcnPaint();
if (typeof putCloudConfig !== "function") {
BCN.kmsg = "Could not save from here; use admin.";
bcnPaint();
return;
}
putCloudConfig("beacons", c).then(function () { BCN.kmsg = say || "Saved. Every dreamer sees it within three minutes."; bcnPaint(); }, function (e) { BCN.kmsg = "Not saved: " + ((e && e.message) || e); bcnPaint(); });
},
function (el, W) {
var K = BCN.kform;
el.querySelectorAll("[data-bk]").forEach(function (e) {
var k = e.getAttribute("data-bk");
e[e.type === "checkbox" || e.tagName === "SELECT" || e.type === "color" ? "onchange" : "oninput"] = function () {
if (!K)
return;
K[k] = e.type === "checkbox" ? e.checked : (e.type === "number" || k === "bright") ? +e.value : k === "color" ? e.value.toUpperCase() : e.value;
};
});
el.querySelectorAll("[data-bkto]").forEach(function (e) { e.onclick = function () { if (!K)
return; K.to = (K.to || []).slice(); K.to.splice(+e.getAttribute("data-bkto"), 1); bcnPaint(); }; });
el.querySelectorAll("[data-bkf2]").forEach(function (e) { e.onkeydown = function (ev) { ev.stopPropagation(); }; });
el.querySelectorAll("[data-bka]").forEach(function (e) {
e.onclick = function () {
var a = e.getAttribute("data-bka"), S = bcnHereSpot();
if (a === "new") {
if (!S) {
BCN.kmsg = "Step out of doors first.";
bcnPaint();
return;
}
BCN.kform = Object.assign(bcnOne({ name: "Beacon " + (bcnCfg().list.length + 1), label: "", world: S.world, x: S.x, z: S.z, y: S.y }), { isNew: true });
BCN.kmsg = "";
bcnPaint();
}
else if (a === "cancel") {
BCN.kform = null;
bcnPaint();
}
else if (a === "addto" && K) {
var fe = el.querySelector("[data-bkf2='friend']"), we = el.querySelector("[data-bkf2='who']"), fid = fe && fe.value, who = we && we.value.trim();
if (fid) {
var f = (typeof fwFriends === "function" ? fwFriends() : []).filter(function (x) { return x.id === fid; })[0];
bcnToAdd(K, fid, f && f.name);
return;
}
if (!who) {
BCN.kmsg = "Pick a friend, or type their email.";
bcnPaint();
return;
}
if (typeof cityRpc !== "function") {
BCN.kmsg = "Add players from admin.";
bcnPaint();
return;
}
BCN.kmsg = "Looking for them…";
bcnPaint();
cityRpc("keeper_find_user", { p_who: who }).then(function (d) { if (d && d.ok)
bcnToAdd(K, d.id, d.name || d.email);
else {
BCN.kmsg = (d && d.say) || "Nobody with that email.";
bcnPaint();
} }, function () { BCN.kmsg = "Could not look them up just now."; bcnPaint(); });
}
else if (a === "herenow" && K) {
if (!S) {
BCN.kmsg = "Step out of doors first.";
bcnPaint();
return;
}
K.world = S.world;
K.x = S.x;
K.z = S.z;
K.y = S.y;
K.place = "";
bcnPaint();
}
else if (a === "save" && K) {
var c = bcnCfg(), one = bcnOne(K), i = -1;
c.list.forEach(function (b, j) { if (b.id === one.id)
i = j; });
if (i >= 0)
c.list[i] = one;
else
c.list.push(one);
BCN.kform = null;
bcnKeeperSave(c, "Saved “" + one.name + "”. Every dreamer sees it within three minutes.");
}
};
});
function find(id) { var c = bcnCfg(); return { c: c, i: c.list.map(function (b) { return b.id; }).indexOf(id) }; }
el.querySelectorAll("[data-bke]").forEach(function (e) { e.onclick = function () { var f = find(e.getAttribute("data-bke")); if (f.i < 0)
return; BCN.kform = Object.assign({}, f.c.list[f.i]); bcnPaint(); }; });
el.querySelectorAll("[data-bkt]").forEach(function (e) { e.onclick = function () { var f = find(e.getAttribute("data-bkt")); if (f.i < 0)
return; f.c.list[f.i].on = !f.c.list[f.i].on; bcnKeeperSave(f.c); }; });
el.querySelectorAll("[data-bkd]").forEach(function (e) { e.onclick = function () { var f = find(e.getAttribute("data-bkd")); if (f.i < 0)
return; var n = f.c.list[f.i].name; f.c.list.splice(f.i, 1); bcnKeeperSave(f.c, "Took away “" + n + "”."); }; });
el.querySelectorAll("[data-bkw]").forEach(function (e) { e.onclick = function () { var f = find(e.getAttribute("data-bkw")); if (f.i < 0 || !W)
return; var b = f.c.list[f.i], s = bcnKeeperSpot(b, W); if (s)
bcnGuide(b.world, s.x, s.z, b.label || b.name); }; });
},
function () {
var a = [];
try {
a = JSON.parse(bcncLs(BCNC.KEY) || "[]") || [];
}
catch (e) {
a = [];
}
try {
var m = session && session.user && session.user.user_metadata;
if (m && Array.isArray(m.event_codes))
a = a.concat(m.event_codes);
}
catch (e) { }
var seen = {};
return a.map(bcnCodeNorm).filter(function (c) { if (!c || seen[c])
return false; seen[c] = 1; return true; });
},
function (h) {
var e = document.getElementById("bcnc-toast");
if (!e) {
e = document.createElement("div");
e.id = "bcnc-toast";
e.style.cssText = "position:fixed;left:50%;top:64px;transform:translateX(-50%);z-index:2147483000;max-width:min(560px,92vw);padding:12px 18px;border-radius:10px;background:rgba(16,10,30,.94);border:1px solid #C69CFF;color:#F2ECFF;font:14px/1.45 Georgia,serif;box-shadow:0 0 28px rgba(198,156,255,.45);pointer-events:none;transition:opacity .8s";
document.body.appendChild(e);
}
e.innerHTML = h;
e.style.opacity = "1";
e.style.display = "block";
clearTimeout(BCNC.toastT);
BCNC.toastT = setTimeout(function () { e.style.opacity = "0"; }, 12000);
},
function (c, b) {
var had = bcnHasCode(c), dev = [];
try {
dev = JSON.parse(bcncLs(BCNC.KEY) || "[]") || [];
}
catch (e) {
dev = [];
}
if (dev.indexOf(c) < 0) {
dev.push(c);
bcncLs(BCNC.KEY, JSON.stringify(dev.slice(-20)));
}
var m = (session && session.user && session.user.user_metadata) || {}, codes = (Array.isArray(m.event_codes) ? m.event_codes : []).map(bcnCodeNorm);
if (codes.indexOf(c) < 0 && typeof authCall === "function" && typeof freshToken === "function") {
BCNC.busy = true;
freshToken().then(function (tok) { return authCall("PUT", "user", { data: { event_codes: codes.concat([c]).slice(-20) } }, tok); }).then(function (u) {
BCNC.busy = false;
if (u && u.id && session && session.user && u.id === session.user.id) {
session.user = u;
try {
keepSession(session);
}
catch (e) { }
}
}, function () { BCNC.busy = false; });
}
var where = b.place || bcnWorldName(b.world), W = bcnWhere(), s = W && bcnKeeperSpot(b, W);
bcncSay("🌙 <b>" + (had ? "You have the code " : "Welcome! Code ") + bcnE(c) + (had ? "." : " taken.") + "</b> " + (b.code === "SAMHAIN" ? "A bright swirling beacon is lit for you over the Temple of the Obsidian Moon on Temple Row. Samhain begins there at midnight." : "A beacon is lit for you" + (where ? " at " + bcnE(where) : "") + ".") +
(s ? " Follow the pointer at the top of the screen." : " In Somnucor, phone › ✨ › Way shows you the way."));
if (s)
bcnGuide(b.world, s.x, s.z, b.label || b.name);
}
];
});
