/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(181, function () {
"use strict";
return [
function (x, g, w, h, S) {
var r = function (n) { var s = Math.sin(n * 127.1 + S.col * 0.0001) * 43758.5453; return s - Math.floor(s); };
var hex = function (c, a) { var C = new THREE.Color(c); return "rgba(" + Math.round(C.r * 255) + "," + Math.round(C.g * 255) + "," + Math.round(C.b * 255) + "," + a + ")"; };
var u = Math.max(1, w / 512), i, k;
function crack(ctx, style, lw, n, seed) {
ctx.strokeStyle = style;
ctx.lineWidth = lw;
ctx.lineCap = "round";
for (i = 0; i < n; i++) {
var px = r(seed + i) * w, py = r(seed + i + 0.37) * h, a = r(seed + i + 0.71) * 6.28;
ctx.beginPath();
ctx.moveTo(px, py);
for (k = 0; k < 6; k++) {
a += (r(seed + i * 7 + k) - 0.5) * 1.4;
px += Math.cos(a) * 14 * u;
py += Math.sin(a) * 14 * u;
ctx.lineTo(px, py);
if (r(seed + i * 3 + k) > 0.8) {
ctx.moveTo(px, py);
ctx.lineTo(px + Math.cos(a + 1.2) * 8 * u, py + Math.sin(a + 1.2) * 8 * u);
ctx.moveTo(px, py);
}
}
ctx.stroke();
}
}
x.save();
if (g)
g.save();
if (S.pat === "ember") {
x.fillStyle = "rgba(0,0,0,0.25)";
x.fillRect(0, 0, w, h);
crack(x, hex(S.glow, 0.9), 2.2 * u, w * h / 9000, 11);
if (g) {
crack(g, hex(S.glow, 1), 2.6 * u, w * h / 9000, 11);
g.globalAlpha = 0.35;
crack(g, hex(S.glow, 1), 7 * u, w * h / 9000, 11);
}
}
else if (S.pat === "frost") {
x.strokeStyle = "rgba(255,255,255,0.45)";
x.lineWidth = 1.2 * u;
for (i = 0; i < w * h / 7000; i++) {
var fx = r(i) * w, fy = r(i + 0.5) * h;
for (k = 0; k < 6; k++) {
var fa = k * 1.047 + r(i + 0.2), fl = (6 + r(i + k) * 10) * u;
x.beginPath();
x.moveTo(fx, fy);
x.lineTo(fx + Math.cos(fa) * fl, fy + Math.sin(fa) * fl);
x.stroke();
if (g) {
g.strokeStyle = hex(S.glow, 0.8);
g.lineWidth = 1.4 * u;
g.beginPath();
g.moveTo(fx, fy);
g.lineTo(fx + Math.cos(fa) * fl, fy + Math.sin(fa) * fl);
g.stroke();
}
}
}
if (g) {
g.fillStyle = hex(S.glow, 0.12);
g.fillRect(0, 0, w, h);
}
}
else if (S.pat === "moon") {
for (i = 0; i < w * h / 220; i++) {
var mx = r(i) * w, my = r(i + 0.33) * h, ma = 0.15 + r(i + 0.9) * 0.3;
x.fillStyle = "rgba(235,245,255," + ma + ")";
x.fillRect(mx, my, 1.3 * u, 1.3 * u);
if (g && r(i + 0.6) > 0.7) {
g.fillStyle = hex(S.glow, ma + 0.3);
g.fillRect(mx, my, 1.6 * u, 1.6 * u);
}
}
if (g) {
g.fillStyle = hex(S.glow, 0.16);
g.fillRect(0, 0, w, h);
}
}
else if (S.pat === "star") {
for (i = 0; i < w * h / 900; i++) {
var sx = r(i) * w, sy = r(i + 0.21) * h, ss = (0.8 + r(i + 0.4) * 1.8) * u;
x.fillStyle = "rgba(255,255,255,0.85)";
x.beginPath();
x.arc(sx, sy, ss, 0, 7);
x.fill();
if (g) {
g.fillStyle = hex(S.glow, 1);
g.beginPath();
g.arc(sx, sy, ss * 1.3, 0, 7);
g.fill();
}
}
}
else if (S.pat === "gild") {
var gr = x.createLinearGradient(0, 0, w, h);
gr.addColorStop(0, "rgba(255,240,180,0.18)");
gr.addColorStop(0.5, "rgba(120,80,20,0.12)");
gr.addColorStop(1, "rgba(255,230,160,0.2)");
x.fillStyle = gr;
x.fillRect(0, 0, w, h);
x.strokeStyle = "rgba(255,236,170,0.25)";
x.lineWidth = 1 * u;
for (i = 0; i < w / 6; i++) {
var lx = r(i) * w;
x.beginPath();
x.moveTo(lx, 0);
x.lineTo(lx + w * 0.08, h);
x.stroke();
}
if (g) {
g.fillStyle = hex(S.glow, 0.5);
g.fillRect(0, 0, w, h);
}
}
else if (S.pat === "woad") {
x.strokeStyle = hex(S.ink, 0.6);
x.lineWidth = 2.4 * u;
for (i = 0; i < w * h / 26000; i++) {
var cx = r(i) * w, cy = r(i + 0.4) * h, R = (6 + r(i + 0.8) * 10) * u;
x.beginPath();
for (k = 0; k < 40; k++) {
var t = k / 40 * 12.6, rr = R * t / 12.6;
x.lineTo(cx + Math.cos(t) * rr, cy + Math.sin(t) * rr);
}
x.stroke();
}
}
else if (S.pat === "bark") {
x.strokeStyle = hex(S.ink, 0.28);
x.lineWidth = 1.4 * u;
for (i = 0; i < w / 3; i++) {
var bx = r(i) * w;
x.beginPath();
x.moveTo(bx, 0);
for (k = 1; k <= 10; k++)
x.lineTo(bx + Math.sin(k * 1.3 + i) * 3 * u, h * k / 10);
x.stroke();
}
}
else if (S.pat === "stone") {
x.fillStyle = "rgba(0,0,0,0.06)";
for (i = 0; i < w * h / 120; i++)
x.fillRect(r(i) * w, r(i + 0.5) * h, 2 * u, 2 * u);
crack(x, hex(S.ink, 0.45), 1.4 * u, w * h / 12000, 23);
}
else if (S.pat === "dots" || S.pat === "freckles") {
for (i = 0; i < w * h / (S.pat === "dots" ? 2600 : 1200); i++) {
var dx = r(i) * w, dy = r(i + 0.21) * h, dr = (S.pat === "dots" ? 2.5 + r(i + 0.4) * 5 : 0.8 + r(i + 0.4) * 1.2) * u;
x.beginPath();
x.arc(dx, dy, dr, 0, 7);
x.fillStyle = hex(S.ink, S.pat === "dots" ? 0.7 : 0.4);
x.fill();
if (g) {
g.beginPath();
g.arc(dx, dy, dr, 0, 7);
g.fillStyle = hex(S.glow, 0.95);
g.fill();
}
}
}
else if (typeof spPattern === "function") {
spPattern(x, w, h, S.pat, S.col);
if (g) {
if (S.pat === "rough") {
crack(g, hex(S.glow, 0.9), 2 * u, w * h / 14000, 31);
}
else {
for (i = 0; i < w * h / 300; i++) {
g.fillStyle = hex(S.glow, 0.3 + r(i) * 0.5);
g.fillRect(r(i + 0.1) * w, r(i + 0.2) * h, 1.4 * u, 1.4 * u);
}
}
}
}
x.restore();
if (g)
g.restore();
},
function (key, trial) {
var S = AT_BY[key], L = meLook();
if (!S)
return;
if (!trial && !atOwned(key))
return setStatus("Buy it at the Dreamskin Atelier on Guild Street first.");
if (trial && !AT.trying)
AT.trying = { species: L.species || null, skin: L.skin, skinKey: L.skinKey || null, src: L.src ? L.src.species : undefined };
if ((L.species || "human") !== S.sp) {
L.species = S.sp === "human" ? null : S.sp;
L.src = L.src || {};
L.src.species = "chosen";
}
L.skin = S.col;
L.skinKey = S.key;
L.src = L.src || {};
L.src.skin = "chosen";
rebuildMe();
if (!trial && typeof save === "function")
save();
if (typeof presencePublished !== "undefined")
presencePublished = false;
},
function (arch, kind, list) {
var it = AT.cat && AT.cat.filter(function (r) { return r.archetype === arch && (!kind || r.kind === kind); })[0];
if (it && +it.price >= 0)
return Number(it.price).toLocaleString();
if (!AT.cat && !atShownPrice.asked && typeof signedIn === "function" && signedIn()) {
atShownPrice.asked = 1;
atCatalogue().then(function () { if (AT.cat)
try {
atPaint();
}
catch (e) { } });
}
return Number(list || 0).toLocaleString();
},
function (key) {
var S = AT_BY[key];
if (!S)
return;
if (!(typeof signedIn === "function" && signedIn()))
return setStatus("Sign in and join Somnucor to buy at the Atelier.");
atCatalogue().then(function (rows) {
var it = (rows || []).filter(function (r) { return r.archetype === "skin_" + key; })[0];
if (!it) {
AT.msg = (rows && rows.length) ? "That skin isn't on the city catalogue yet." : "The Atelier's books didn't load. Try again in a moment.";
atPaint();
return;
}
if (!confirm("Buy the " + S.name + " skin for " + Number(it.price).toLocaleString() + " gold? It's yours for good."))
return;
Promise.resolve(buyItem(it.id, null)).then(function (o) {
if (o !== "ok" && !atOwned(key)) {
AT.msg = "Not bought: " + String(o || "the Atelier could not take the gold.");
atPaint();
return;
}
AT.trying = null;
if (atOwned(key)) {
atWear(key, false);
AT.msg = "The " + S.name + " skin is yours. Wear it any time from the Wardrobe or your backpack.";
}
atPaint();
});
});
},
function (home, spot, arch) {
var k = KIT[home.archetype] || KIT.house, s = (home.attrs && home.attrs.s) || 1;
var W = k.size[0] * s * ((home.attrs && home.attrs.w) || 1), H = k.size[1] * s, D = k.size[2] * s * ((home.attrs && home.attrs.d) || 1);
var L = LW_BY[arch] || { mount: "hang" }, lk = KIT[arch], lw = lk ? lk.size[0] : 2;
var p = { x: 0, y: 0, z: D / 2 + 0.12, ry: 0, sx: 1 };
if (spot === "door") {
p.y = L.mount === "wall" ? Math.min(3.0, H * 0.42) : Math.min(3.6, H * 0.5) - 1.6;
}
else if (spot === "frontwall") {
p.x = W * 0.25;
p.y = Math.min(2.4, H * 0.3);
}
else if (spot === "sidel" || spot === "sider") {
var sd = spot === "sidel" ? -1 : 1;
p.x = sd * (W / 2 + 0.12);
p.z = 0;
p.ry = sd * Math.PI / 2;
p.y = Math.min(2.4, H * 0.3);
}
else if (spot === "eaves") {
p.y = Math.max(2.2, H * 0.62) - 1.6;
p.z = D / 2 + 0.35;
if (lw > 2.5)
p.sx = Math.max(0.4, W * 0.95 / lw);
}
else if (spot === "porch") {
p.y = 1.6;
p.z = D / 2 + 2.6;
}
else if (spot === "garden") {
p.y = 1.2;
p.z = D / 2 + 5;
if (lw > 2.5)
p.sx = Math.max(0.4, W * 0.9 / lw);
}
else if (spot === "gardenl" || spot === "gardenr") {
p.x = (spot === "gardenl" ? -1 : 1) * (W / 2 - 0.5);
p.z = D / 2 + 3;
}
else if (spot === "path") {
p.x = 1.6;
p.z = D / 2 + 4.5;
}
return p;
},
function () {
if (typeof cityLots === "undefined" || !cityLots || !cityLots.length || typeof scene === "undefined" || !scene)
return;
var plots = (store.plots || []).concat(store.districtPlots || []);
plots.forEach(function (p) {
var rec = lotByName(p.name), lights = (rec && rec.decor && Array.isArray(rec.decor.lights)) ? rec.decor.lights : [], sig = JSON.stringify(lights);
if (LWLOT.sig[p.name] === sig)
return;
LWLOT.sig[p.name] = sig;
if (LWLOT.groups[p.name]) {
scene.remove(LWLOT.groups[p.name]);
delete LWLOT.groups[p.name];
}
if (!lights.length || !p.homeId)
return;
var home = store.objects.filter(function (o) { return o.id === p.homeId; })[0];
if (!home)
return;
var G = new THREE.Group();
G.name = "lot lights";
G.position.set(home.x, (typeof terrainY === "function") ? terrainY(home.x, home.z) : 0, home.z);
G.rotation.y = home.rot || 0;
lights.slice(0, 24).forEach(function (l, i) {
if (!KIT[l.a])
return;
try {
var m = build({ id: "__lw_" + p.name + "_" + i, archetype: l.a, attrs: {}, x: 0, z: 0, rot: 0, detail: 3, nights: [] }), q = lwPlace(home, l.s, l.a);
m.position.set(q.x, q.y, q.z);
m.rotation.y = q.ry;
m.scale.x = q.sx;
G.add(m);
}
catch (e) { }
});
G.userData.home = home.id;
scene.add(G);
LWLOT.groups[p.name] = G;
});
},
function () {
var el = document.getElementById("lwd-panel");
if (!el) {
if (!document.body)
return;
el = document.createElement("div");
el.id = "lwd-panel";
el.style.cssText = "position:fixed;left:12px;bottom:calc(96px + env(safe-area-inset-bottom,0px));z-index:46;width:min(400px,calc(100vw - 24px));max-height:min(70vh,600px);overflow:auto;background:rgba(8,10,16,.96);border:1px solid #C9A040;border-radius:4px;padding:12px 14px;font:13px var(--sans);color:var(--bone)";
document.body.appendChild(el);
el.addEventListener("click", lwdClick);
el.addEventListener("change", function (e) { var t = e.target; if (t && t.getAttribute("data-lwspot") != null) {
var i = +t.getAttribute("data-lwspot");
if (LWD.lights[i])
LWD.lights[i].s = t.value;
} });
}
if (!LWD.open) {
el.style.display = "none";
return;
}
el.style.display = "block";
var rec = LWD.rec, h = '<div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:14px">Lights for ' + esc(rec ? rec.name : "your lot") + '</b><button class="btn" data-lwd="x">Close</button></div>';
h += '<div style="color:var(--dim);margin:6px 0">Hang the lights you own from the Lightworks on Guild Street. Everyone who walks past sees them.</div>';
if (LWD.msg)
h += '<div style="margin:4px 0"><b>' + esc(LWD.msg) + '</b></div>';
if (!LWD.lights.length)
h += '<div style="color:var(--dim)">Nothing hung here yet.</div>';
LWD.lights.forEach(function (l, i) {
var L = LW_BY[l.a];
if (!L)
return;
var sp = LW_SPOTS[L.mount];
h += '<div style="display:flex;gap:6px;align-items:center;margin-top:5px"><span style="flex:1">' + esc(L.name) + '</span><select data-lwspot="' + i + '">' + sp.map(function (s) { return '<option value="' + s[0] + '"' + (s[0] === l.s ? ' selected' : '') + '>' + s[1] + '</option>'; }).join("") + '</select><button class="btn" data-lwd="rm:' + i + '">Take down</button></div>';
});
var own = LW_LIGHTS.filter(function (L) { return lwOwnedCount(L.a) > LWD.lights.filter(function (x) { return x.a === L.a; }).length; });
h += '<div style="border-top:1px solid rgba(255,255,255,.1);margin-top:9px;padding-top:7px"><b>Yours to hang</b>';
if (!own.length)
h += '<div style="color:var(--dim)">No lights to hang. Buy them at the Lightworks.</div>';
own.forEach(function (L) { h += '<div style="display:flex;justify-content:space-between;margin-top:4px"><span>' + esc(L.name) + '</span><button class="btn" data-lwd="add:' + L.a + '">Hang it</button></div>'; });
h += '</div><div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap"><button class="btn" data-lwd="save" style="border-color:#C9A040">Save the lights</button><button class="btn" data-lwd="words">Dress it with words instead</button></div>';
el.innerHTML = h;
},
function (e) {
var b = e.target.closest && e.target.closest("[data-lwd]");
if (!b)
return;
var a = b.getAttribute("data-lwd");
if (a === "x") {
LWD.open = false;
lwdPaint();
return;
}
if (a.indexOf("rm:") === 0) {
LWD.lights.splice(+a.slice(3), 1);
lwdPaint();
return;
}
if (a.indexOf("add:") === 0) {
var k = a.slice(4), L = LW_BY[k];
if (L && LWD.lights.length < 24)
LWD.lights.push({ a: k, s: LW_SPOTS[L.mount][0][0] });
else
LWD.msg = "Twenty-four lights is the most one lot can hold.";
lwdPaint();
return;
}
if (a === "words") {
var rec = LWD.rec;
LWD.open = false;
lwdPaint();
var choice = (prompt("Dress " + rec.name + " with what? A word or two — it is remembered on the lot.") || "").trim();
if (choice)
dressLot(rec.lot_id, choice);
return;
}
if (a === "save") {
var r = LWD.rec;
cityRpc("lot_lights", { p_lot: r.lot_id, p_lights: LWD.lights }).then(function (o) {
if (o !== "ok") {
LWD.msg = String(o || "That didn't go through.");
lwdPaint();
return;
}
LWD.msg = "Saved. Your lights are up.";
r.decor = Object.assign({}, r.decor || {}, { lights: LWD.lights.slice() });
lwApplyLots();
lwdPaint();
if (typeof lotsAt !== "undefined") {
lotsAt = 0;
if (typeof loadLots === "function")
loadLots();
}
}).catch(function (e) { LWD.msg = /function|404|PGRST|does not exist/i.test(String(e && e.message || e)) ? "Hanging lights opens soon." : String(e && e.message || e); lwdPaint(); });
}
},
function (a) {
var L = LW_BY[a];
if (!L)
return;
if (!(typeof signedIn === "function" && signedIn()))
return setStatus("Sign in and join Somnucor to buy at the Lightworks.");
atCatalogue().then(function (rows) {
var it = (rows || []).filter(function (r) { return r.kind === "light" && r.archetype === a; })[0];
if (!it) {
AT.msg = (rows && rows.length) ? "That light isn't on the city catalogue yet." : "The Lightworks's books didn't load. Try again in a moment.";
atPaint();
return;
}
if (!confirm("Buy " + L.name.toLowerCase() + " for " + Number(it.price).toLocaleString() + " gold? Hang them on your own lot: stand at its board and press D."))
return;
Promise.resolve(buyItem(it.id, null)).then(function () { AT.msg = L.name + " bought. Hang them on your lot: stand at its board and press D."; atPaint(); });
});
},
function () {
var xs = [], zs = [];
(INT.walls || []).forEach(function (w) { if ((w.level || 0) !== 0)
return; xs.push(w.x - INT.ox - w.hw, w.x - INT.ox + w.hw); zs.push(w.z - INT.oz - w.hd, w.z - INT.oz + w.hd); });
if (!xs.length)
return { x0: -8, x1: 8, z0: -8, z1: 8 };
return { x0: Math.min.apply(null, xs) + 0.4, x1: Math.max.apply(null, xs) - 0.4, z0: Math.min.apply(null, zs) + 0.4, z1: Math.max.apply(null, zs) - 0.4 };
},
function (S, i) {
return { species: S.sp === "human" ? null : S.sp, skin: S.col, skinKey: S.key, sex: i % 2 ? "m" : "f", hair: [0x2A1A12, 0xE8D8B0, 0x6A3A1A, 0xC8C8D0][i % 4], hairStyle: i % 2 ? "short" : "long",
top: [0xF4F0E8, 0x2A2A3A, 0x6A2A3A, 0x2A4A6A][i % 4], topKind: "shirt", bottom: 0x2A2A30, bottomKind: "trousers", shoes: 0x1A1A1E, hat: "none", src: { species: "chosen", skin: "chosen" } };
},
function (G, S, i, x, z, side) {
var spec = { id: "__atp_" + S.key, archetype: "human", attrs: {}, look: atLook(S, i), solid: false, detail: 4, nights: [] };
var g = buildFigure(spec, 1), o = S.sp !== "human" && typeof SPECIES_FEATS !== "undefined" && SPECIES_FEATS[S.sp];
if (o && typeof dressFolk === "function") {
try {
dressFolk(g, spec, 1, o);
}
catch (e) { }
}
g.position.set(x, 0.5, z);
g.rotation.y = side < 0 ? Math.PI / 2 : -Math.PI / 2;
var tag = makeTag(S.name + " · " + S.price.toLocaleString() + " gold", false);
tag.position.y = 2.55;
tag.scale.multiplyScalar(0.75);
g.add(tag);
g.traverse(function (m) { m.raycast = function () { }; });
G.add(g);
},
function () {
if (!INT || !INT.spec)
return;
var key = INT.spec.workplace;
if (key !== AT_KEY && key !== LW_KEY)
return;
var B = atBounds(), W = B.x1 - B.x0, D = B.z1 - B.z0, cx = (B.x0 + B.x1) / 2, ceil = (typeof INT_H !== "undefined" ? INT_H : 4) - 0.1;
var G = new THREE.Group();
G.name = "shop display";
INT.root.add(G);
INT.atShop = key;
function put(arch, x, y, z, ry, sx) { try {
var m = build({ id: "__at_" + arch + "_" + x.toFixed(1) + z.toFixed(1), archetype: arch, attrs: {}, x: 0, z: 0, rot: 0, detail: 3, nights: [] });
m.position.set(x, y, z);
m.rotation.y = ry || 0;
if (sx)
m.scale.x = sx;
G.add(m);
return m;
}
catch (e) {
return null;
} }
if (key === AT_KEY) {
var kinds = SPECIES.filter(function (sp) { return AT_SKINS.some(function (s) { return s.sp === sp; }); });
var shown = kinds.map(function (sp) { return AT_SKINS.filter(function (s) { return s.sp === sp && s.glow; })[0] || AT_SKINS.filter(function (s) { return s.sp === sp; })[0]; });
var pm = new THREE.MeshLambertMaterial({ color: 0xEDE6DA }), rim = new THREE.MeshLambertMaterial({ color: 0xC8A040, emissive: 0x2A1E08 });
shown.forEach(function (S, i) {
var side = i < 6 ? -1 : 1, k = i % 6, z = B.z0 + 1.6 + k * Math.max(1.6, (D - 3.2) / 5), x = side < 0 ? B.x0 + 1.1 : B.x1 - 1.1;
var pl = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.66, 0.5, 20), pm);
pl.position.set(x, 0.25, z);
G.add(pl);
var rr = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.025, 6, 28), rim);
rr.rotation.x = Math.PI / 2;
rr.position.set(x, 0.5, z);
G.add(rr);
setTimeout(function () { if (!INT || INT.root !== G.parent)
return; try {
atPlinthFigure(G, S, i, x, z, side);
}
catch (e) {
if (window.console)
console.warn("atelier figure:", e);
} }, 400 + i * 700);
});
put("chandelier", cx, ceil - 2.2, (B.z0 + B.z1) / 2, 0);
put("pendantlamps", cx, ceil - 2.0, B.z0 + 2.2, 0);
}
else {
put("chandelier", cx, ceil - 2.2, (B.z0 + B.z1) / 2, 0);
put("pendantlamps", cx - 2.5, ceil - 2.0, B.z0 + 3, 0);
put("pendantlamps", cx + 2.5, ceil - 2.0, B.z1 - 3, 0);
put("festoonlights", cx, ceil - 1.7, B.z0 + 1.5, 0, W / 8);
put("fairylights", cx, ceil - 1.6, B.z1 - 1.2, 0, W / 8);
put("paperlanterns", cx, ceil - 1.8, (B.z0 + B.z1) / 2 + 2.5, 0, Math.min(1, W / 6.5));
put("icicles", cx, ceil - 1.3, (B.z0 + B.z1) / 2 - 2.5, 0, W / 8);
var neons = ["neonheart", "neonstar", "neonmoon", "neonbolt"], step = W / (neons.length + 1);
neons.forEach(function (n, i) { put(n, B.x0 + step * (i + 1), 1.2, B.z0 + 0.15, 0); });
put("ledstrip", B.x0 + 0.1, 0.15, (B.z0 + B.z1) / 2, Math.PI / 2, D / 6);
put("ledstrippink", B.x1 - 0.1, 0.15, (B.z0 + B.z1) / 2, -Math.PI / 2, D / 6);
put("barlights", B.x0 + 0.2, 2.2, (B.z0 + B.z1) / 2 - 2, Math.PI / 2);
put("barlights", B.x1 - 0.2, 2.2, (B.z0 + B.z1) / 2 + 2, -Math.PI / 2);
put("lanternpost", B.x0 + 1, 0, B.z1 - 1.5, 0);
put("lanternpost", B.x1 - 1, 0, B.z1 - 1.5, 0);
put("uplights", cx, 0, B.z1 - 2.4, 0);
}
},
function () {
var el = document.getElementById("at-panel");
if (!el) {
if (!document.body)
return;
el = document.createElement("div");
el.id = "at-panel";
el.style.cssText = "position:fixed;right:12px;top:64px;z-index:46;width:min(400px,calc(100vw - 24px));max-height:calc(100vh - 180px);overflow:auto;background:rgba(8,10,16,.95);border:1px solid #C9A040;border-radius:4px;padding:12px 14px;font:13px var(--sans);color:var(--bone)";
document.body.appendChild(el);
el.addEventListener("click", atClick);
}
var shop = INT && INT.atShop;
if (!AT.open || !shop) {
el.style.display = "none";
return;
}
el.style.display = "block";
var h = '<div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:14px">' + (shop === AT_KEY ? "The Dreamskin Atelier" : "The Lightworks") + '</b><button class="btn" data-at="x">Close</button></div>';
if (AT.msg)
h += '<div style="margin:6px 0"><b>' + esc(AT.msg) + '</b></div>';
if (shop === AT_KEY) {
var cur = (meLook().species || "human");
AT.sp = AT.sp || (AT_SKINS.some(function (s) { return s.sp === cur; }) ? cur : "human");
h += '<div style="color:var(--dim);margin:6px 0">Three skins for every kind of dreamer, some of which glow. Your kind\'s everyday skins are always free in the Wardrobe.</div>';
h += '<div style="display:flex;flex-wrap:wrap;gap:4px;margin:6px 0">' + SPECIES.map(function (sp, i) { if (!AT_SKINS.some(function (s) { return s.sp === sp; }))
return ""; return '<button class="btn" data-at="sp:' + sp + '" style="' + (AT.sp === sp ? 'border-color:#C9A040;color:#F4E6C0' : 'opacity:.8') + '">' + SPECIES_LABEL[i] + '</button>'; }).join("") + '</div>';
AT_SKINS.filter(function (s) { return s.sp === AT.sp; }).forEach(function (S) {
var own = atOwned(S.key), wearing = atSkinOf(meLook()) === S;
h += '<div style="display:flex;align-items:center;gap:8px;margin-top:7px"><span style="width:18px;height:18px;border-radius:50%;background:#' + ('00000' + S.col.toString(16)).slice(-6) + ';' + (S.glow ? 'box-shadow:0 0 8px #' + ('00000' + S.glow.toString(16)).slice(-6) : '') + ';border:1px solid rgba(255,255,255,.3)"></span>' +
'<span style="flex:1">' + esc(S.name) + (S.glow ? ' <span style="color:#C9A040">glows</span>' : '') + '<br><span style="color:var(--dim)">' + (own ? "yours" : atShownPrice("skin_" + S.key, null, S.price) + " gold") + '</span></span>' +
(wearing ? '<span style="color:var(--dim)">wearing</span>' : own ? '<button class="btn" data-at="wear:' + S.key + '">Wear</button>' : '<button class="btn" data-at="try:' + S.key + '">Try on</button> <button class="btn" data-at="buy:' + S.key + '">Buy</button>') + '</div>';
});
if (AT.trying)
h += '<div style="margin-top:9px"><button class="btn" data-at="off">Take it off</button> <button class="btn" data-at="mirror">See yourself</button></div>';
}
else {
h += '<div style="color:var(--dim);margin:6px 0">Hang what you buy on your own lot: stand at its board and press D.</div>';
LW_LIGHTS.forEach(function (L) {
var n = lwOwnedCount(L.a);
h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:5px"><span>' + esc(L.name) + '<br><span style="color:var(--dim)">' + atShownPrice(L.a, "light", L.price) + ' gold' + (n ? ' · you have ' + n : '') + '</span></span><button class="btn" data-at="lbuy:' + L.a + '">Buy</button></div>';
});
}
el.innerHTML = h;
},
function (e) {
var b = e.target.closest && e.target.closest("[data-at]");
if (!b)
return;
var a = b.getAttribute("data-at");
if (a === "x") {
AT.open = false;
if (AT.trying)
atTakeOff();
atPaint();
return;
}
if (a.indexOf("sp:") === 0) {
AT.sp = a.slice(3);
atPaint();
return;
}
if (a.indexOf("try:") === 0) {
atWear(a.slice(4), true);
AT.msg = "Trying on the " + AT_BY[a.slice(4)].name + " skin. Press See yourself to look.";
atPaint();
return;
}
if (a.indexOf("wear:") === 0) {
AT.trying = null;
atWear(a.slice(5), false);
AT.msg = "Wearing the " + AT_BY[a.slice(5)].name + " skin.";
atPaint();
return;
}
if (a.indexOf("buy:") === 0) {
atBuy(a.slice(4));
return;
}
if (a.indexOf("lbuy:") === 0) {
lwBuy(a.slice(5));
return;
}
if (a === "off") {
atTakeOff();
AT.msg = "";
atPaint();
return;
}
if (a === "mirror") {
if (typeof setView === "function")
setView(typeof meView !== "undefined" && meView === "mirror" ? "eyes" : "mirror");
return;
}
}
];
});
