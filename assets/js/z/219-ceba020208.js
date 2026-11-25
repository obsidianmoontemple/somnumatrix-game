/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(219, function () {
"use strict";
return [
function (name, args, then) {
CTY.say = "…";
ctyPaint();
cityRpc(name, args).then(function (o) { CTY.say = (o && o.say) || ""; if (then)
then(o); CTY.busy.pj = false; ctyLoad("pj", true); if (typeof cwxLoad === "function" && /weather/.test(name))
cwxLoad(true); })
.catch(function () { CTY.say = "That did not go through. Try again in a moment."; ctyPaint(); });
},
function (x, z, R, cityId) {
var y0 = terrainY(x, z);
if (typeof ATLC !== "undefined" && ATLC && typeof atlNearStair === "function") {
for (var a = 0; a < 6.28; a += 0.785) {
var px = x + Math.cos(a) * R, pz = z + Math.sin(a) * R, dx = px - ATLC.x, dz = pz - ATLC.z;
if (atlNearStair(Math.hypot(dx, dz), Math.atan2(dz, dx)))
return false;
}
}
try {
var hp = (typeof rmapPad === "function") ? rmapPad() : null;
if (hp && Math.hypot(hp.x - x, hp.z - z) < R + 30)
return false;
}
catch (e) { }
var far = [];
if (typeof DK !== "undefined" && DK.gate)
far.push(DK.gate);
if (typeof TN !== "undefined" && TN.board)
far.push(TN.board);
if (typeof SHW !== "undefined" && SHW.v)
Object.keys(SHW.v).forEach(function (k) { if (SHW.v[k])
far.push({ x: SHW.v[k].x, z: SHW.v[k].z, r: 34 + R }); });
if (typeof STL !== "undefined" && STL.row)
far.push({ x: STL.row.x, z: STL.row.z, r: 24 + R });
Object.keys(CTY.sites).forEach(function (k) { var s = CTY.sites[k]; if (s)
far.push({ x: s.x, z: s.z, r: s.R + R + 6 }); });
if (typeof FEST !== "undefined" && FEST.solids)
FEST.solids.forEach(function (s) { far.push({ x: s.x, z: s.z, r: s.r + R + 8 }); });
for (var f = 0; f < far.length; f++) {
if (Math.hypot(far[f].x - x, far[f].z - z) < (far[f].r || 30))
return false;
}
for (var e = 0; e < 6.28; e += 0.524) {
var ex = x + Math.cos(e) * (R + 12), ez = z + Math.sin(e) * (R + 12);
if (Math.abs(terrainY(ex, ez) - y0) > 1.5)
return false;
}
for (var gx = -R; gx <= R; gx += 3)
for (var gz = -R; gz <= R; gz += 3) {
if (gx * gx + gz * gz > R * R)
continue;
var qx = x + gx, qz = z + gz, y = terrainY(qx, qz);
if (Math.abs(y - y0) > 0.5)
return false;
try {
if (typeof blockedAt === "function" && blockedAt(qx, qz, y + 0.2))
return false;
}
catch (e) { }
if (typeof atlIsWater === "function") {
try {
if (atlIsWater(qx, qz))
return false;
}
catch (e) { }
}
if (typeof roadAt === "function") {
try {
var rd = roadAt(qx, qz);
if (rd && (rd.kind === "ring" || rd.kind === "avenue"))
return false;
}
catch (e) { }
}
}
var O = store.objects;
for (var o = 0; o < O.length; o++) {
var ob = O[o];
if ((ob.realm || 0) !== cityId)
continue;
if (Math.abs(ob.x - x) > R + 40 || Math.abs(ob.z - z) > R + 40)
continue;
var K = KIT[ob.archetype], rr = K ? Math.max(K.size[0], K.size[2]) * 0.5 * ((ob.attrs && ob.attrs.s) || 1) : 2;
if (Math.hypot(ob.x - x, ob.z - z) < R + rr + 1)
return false;
}
return true;
},
function (p) {
var c = document.createElement("canvas");
c.width = 512;
c.height = 256;
var x = c.getContext("2d");
x.fillStyle = "#1A1612";
x.fillRect(0, 0, 512, 256);
x.strokeStyle = "#E8C67A";
x.lineWidth = 8;
x.strokeRect(6, 6, 500, 244);
x.textAlign = "center";
x.fillStyle = "#F2E6C4";
var n = p.name, fs = 40;
x.font = "700 " + fs + "px Georgia,serif";
while (x.measureText(n).width > 470 && fs > 20) {
fs -= 2;
x.font = "700 " + fs + "px Georgia,serif";
}
x.fillText(n, 256, 56);
if (p.status === "built") {
x.font = "26px sans-serif";
x.fillStyle = "#D8C8A0";
x.fillText("Built by the dreamers of Somnucor", 256, 118);
x.fillText((p.built_at ? new Date(p.built_at).toLocaleDateString() : "") + " · " + (p.givers || 0) + " dreamers gave", 256, 156);
x.fillText(Number(p.gold).toLocaleString() + " gold and " + p.work + " turns of work", 256, 194);
}
else {
x.font = "24px sans-serif";
x.fillStyle = "#D8C8A0";
x.fillText("A city project · press E to lend a hand", 256, 96);
[["Gold", p.gold, p.gold_goal, "#E8C67A", 130], ["Work", p.work, p.work_goal, "#7AB8E8", 186]].forEach(function (b) {
x.fillStyle = "#D8C8A0";
x.textAlign = "left";
x.font = "22px sans-serif";
x.fillText(b[0], 30, b[4] + 18);
x.fillStyle = "#3A3228";
x.fillRect(100, b[4], 380, 24);
x.fillStyle = b[3];
x.fillRect(100, b[4], 380 * Math.min(1, b[1] / Math.max(1, b[2])), 24);
x.fillStyle = "#F2E6C4";
x.textAlign = "center";
x.font = "18px sans-serif";
x.fillText(Number(b[1]).toLocaleString() + " / " + Number(b[2]).toLocaleString(), 290, b[4] + 18);
});
}
var t = new THREE.CanvasTexture(c);
if (THREE.SRGBColorSpace)
t.colorSpace = THREE.SRGBColorSpace;
return t;
},
function (p, x, z, th) {
var C = CTY_SPOT[p.key], y0 = terrainY(x, z), g = new THREE.Group();
g.name = "project-" + p.key;
g.position.set(x, y0, z);
g.userData.noCull = 1;
var S = CTY.sites[p.key] = { key: p.key, x: x, z: z, y: y0, th: th, R: C.R, g: g, status: null, body: null, scaf: null, fence: null, sign: null, signKey: "" };
try {
var b = build({ id: "cty-" + p.key, archetype: p.arch, attrs: {}, x: 0, z: 0, rot: 0, detail: 1, found: true, city: true });
b.rotation.y = th;
g.add(b);
S.body = b;
}
catch (e) { }
var sg = new THREE.Group(), post = ctyM(0x3A2A1C);
sg.add(P(new THREE.BoxGeometry(0.14, 2.2, 0.14), post, -1.3, 1.1, 0));
sg.add(P(new THREE.BoxGeometry(0.14, 2.2, 0.14), post, 1.3, 1.1, 0));
var sm = new THREE.MeshBasicMaterial({ map: ctySignTex(p) }), face = P(new THREE.PlaneGeometry(2.8, 1.4), sm, 0, 2.3, 0.08);
sg.add(face);
sg.add(P(new THREE.BoxGeometry(2.9, 1.5, 0.1), ctyM(0x2A2018), 0, 2.3, 0));
sg.position.set(Math.sin(th) * (C.R + 1.5), 0, Math.cos(th) * (C.R + 1.5));
sg.rotation.y = th;
g.add(sg);
S.sign = sm;
S.signAt = { x: x + Math.sin(th) * (C.R + 1.5), z: z + Math.cos(th) * (C.R + 1.5) };
scene.add(g);
ctySiteDress(S, p);
return S;
},
function (S, p) {
var prog = p.status === "built" ? 1 : ctyProgress(p), key = p.status + "|" + p.gold + "|" + p.work;
if (S.signKey === key)
return;
S.signKey = key;
if (S.sign) {
if (S.sign.map)
S.sign.map.dispose();
S.sign.map = ctySignTex(p);
S.sign.needsUpdate = true;
}
if (S.body) {
var h = p.status === "built" ? 1 : Math.max(0.06, prog);
S.body.scale.set(1, h, 1);
}
var building = p.status !== "built";
if (building && !S.fence) {
var f = new THREE.Group(), wood = ctyM(0x8A6A44), plank = ctyM(0xC89A5A), n = Math.max(12, Math.round(S.R * 2.2));
for (var i = 0; i < n; i++) {
var a = i / n * Math.PI * 2, a2 = (i + 1) / n * Math.PI * 2, r = S.R + 0.6;
f.add(P(new THREE.BoxGeometry(0.12, 1.2, 0.12), wood, Math.cos(a) * r, 0.6, Math.sin(a) * r));
if (i % n === Math.floor(n * 0.25))
continue;
var mx = (Math.cos(a) + Math.cos(a2)) / 2 * r, mz = (Math.sin(a) + Math.sin(a2)) / 2 * r, len = 2 * r * Math.sin(Math.PI / n);
var rail = P(new THREE.BoxGeometry(len, 0.1, 0.06), plank, mx, 0.9, mz);
rail.rotation.y = -(a + a2) / 2 + Math.PI / 2;
f.add(rail);
}
S.g.add(f);
S.fence = f;
var sc = new THREE.Group();
S.g.add(sc);
S.scaf = sc;
}
if (!building && S.fence) {
S.g.remove(S.fence);
S.g.remove(S.scaf);
S.fence = null;
S.scaf = null;
}
if (S.scaf) {
while (S.scaf.children.length)
S.scaf.remove(S.scaf.children[0]);
var K = KIT[p.arch], H = (K ? K.size[1] : 10) * Math.max(0.06, prog) + 1.2, w = (K ? Math.max(K.size[0], K.size[2]) : 8) * 0.5 + 0.8, pole = ctyM(0x9A9A9A), boards = ctyM(0xB08850);
w = Math.min(w, S.R - 0.4);
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (c) { S.scaf.add(P(new THREE.CylinderGeometry(0.07, 0.07, H, 6), pole, c[0] * w, H / 2, c[1] * w)); });
for (var y = 2; y < H; y += 2) {
[[0, -1], [0, 1]].forEach(function (c) { S.scaf.add(P(new THREE.BoxGeometry(w * 2, 0.08, 0.6), boards, 0, y, c[1] * w)); });
[[-1, 0], [1, 0]].forEach(function (c) { S.scaf.add(P(new THREE.BoxGeometry(0.6, 0.08, w * 2), boards, c[0] * w, y, 0)); });
}
S.scaf.rotation.y = S.th;
}
},
function () {
var Bk = CTY.bank;
if (!Bk)
return;
var x = Bk.ctx, B = CTY.pr;
x.fillStyle = "#101820";
x.fillRect(0, 0, 512, 384);
x.strokeStyle = "#C9A868";
x.lineWidth = 6;
x.strokeRect(4, 4, 504, 376);
x.fillStyle = "#F2E6C4";
x.textAlign = "center";
x.font = "700 32px Georgia,serif";
x.fillText("Market prices", 256, 44);
x.font = "17px sans-serif";
x.fillStyle = "#9AB0C0";
x.fillText("shop goods move with what dreamers buy · press E for more", 256, 70);
if (!B) {
x.fillStyle = "#D8C8A0";
x.font = "20px sans-serif";
x.fillText("Reading the market…", 256, 200);
Bk.tex.needsUpdate = true;
return;
}
x.textAlign = "left";
x.font = "20px sans-serif";
(B.kinds || []).slice(0, 8).forEach(function (k, i) {
var y = 104 + i * 30, pct = Math.round((k.factor - 1) * 100), up = k.factor > k.prev + 0.001, dn = k.factor < k.prev - 0.001;
x.fillStyle = "#E8E0D0";
x.fillText(ctyKindName(k.kind), 30, y);
x.fillStyle = pct > 0 ? "#E89A7A" : pct < 0 ? "#8AD0A0" : "#C8C0B0";
x.textAlign = "right";
x.fillText((pct > 0 ? "+" : "") + pct + "% " + (up ? "▲" : dn ? "▼" : "·"), 480, y);
x.textAlign = "left";
});
var W = (B.wages || []).filter(function (w) { return w.factor > 1; }).length;
x.fillStyle = "#C9A868";
x.font = "18px sans-serif";
x.fillText(W ? (W === 1 ? "1 city job short of staff pays extra" : W + " city jobs short of staff pay extra") : "City jobs pay their usual wage", 30, 362);
Bk.tex.needsUpdate = true;
},
function () {
var k = cwxNow(), S = (typeof CWX !== "undefined" && CWX.srv) || null, h = '';
h += '<div style="font-size:28px">' + (CWX_ICON[k] || "") + ' <b style="font-size:17px;color:#F2E6C4;vertical-align:middle">' + CWX_NAME[k] + ' over Somnucor</b></div>';
if (CWX_WHAT[k])
h += '<div style="color:#E8D9B0;margin:4px 0">' + CWX_WHAT[k] + '</div>';
if (S && S.set)
h += '<div style="color:#9AA3B5">Set by the Keeper until ' + ctyWhen(new Date(S.set.until).getTime()) + '.</div>';
h += '<b style="display:block;margin-top:10px">The next twelve hours</b><div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px">';
cwxForecast().forEach(function (f) { h += '<div style="flex:1;min-width:90px;border:1px solid #2A3040;border-radius:6px;padding:6px;text-align:center"><div style="font-size:20px">' + (CWX_ICON[f.kind] || "") + '</div><div>' + CWX_NAME[f.kind] + '</div><div style="color:#9AA3B5">from ' + ctyWhen(f.at) + '</div></div>'; });
h += '</div><div style="color:#9AA3B5;margin-top:6px">Snow slows walking and driving. A storm keeps the Wayfarer in harbour. A heat wave makes you thirsty twice as fast.</div>';
h += '<b style="display:block;margin-top:10px">Holidays</b>';
cwxHolidays(5).forEach(function (x) { h += '<div style="border-top:1px solid #2A3040;padding:5px 0">' + x.h.icon + ' <b>' + esc(x.h.name) + '</b> · ' + (x.days === 0 ? "today" : x.days === 1 ? "tomorrow" : "in " + x.days + " days") + '<br><span style="color:#9AA3B5">' + esc(x.h.line) + '</span></div>'; });
if (S && S.keeper) {
h += '<div style="border:1px solid #5A4A2A;border-radius:6px;padding:8px;margin-top:10px"><b>Keeper: set the weather</b><div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px"><select id="cty-wk">' +
["clear", "rain", "storm", "snow", "fog", "wind", "heat"].map(function (q) { return '<option value="' + q + '">' + CWX_ICON[q] + ' ' + CWX_NAME[q] + '</option>'; }).join("") +
'</select><select id="cty-wh">' + [1, 3, 6, 12, 24, 48, 72].map(function (n) { return '<option value="' + n + '"' + (n === 3 ? " selected" : "") + '>for ' + n + ' hour' + (n === 1 ? "" : "s") + '</option>'; }).join("") +
'</select><button class="btn" data-cty="wset">Set it</button><button class="btn" data-cty="wnat">Back to the seasons</button></div></div>';
}
return h;
},
function () {
var B = CTY.pj, h = '';
if (!B)
return '<div style="color:#9AA3B5">Opening…</div>';
h += '<div style="color:#9AA3B5;margin-bottom:6px">The whole city builds one thing at a time. Give gold, or go to the site and lend a hand (a turn every ten minutes). When the gold and the work are both in, it is built for good.</div>';
B.projects.forEach(function (p) {
if (p.status === "waiting" && !B.keeper)
return;
var open = p.status === "open", built = p.status === "built", sel = CTY.sel === p.id;
h += '<div style="border:1px solid ' + (open ? "#C9A868" : "#2A3040") + ';border-radius:6px;padding:8px 10px;margin-bottom:8px">';
h += '<b style="color:#F2E6C4">' + (built ? "🏛️ " : open ? "🏗️ " : "· ") + esc(p.name) + '</b> <span style="color:#9AA3B5">' + (built ? "built " + new Date(p.built_at).toLocaleDateString() : open ? Math.round(ctyProgress(p) * 100) + "% built" : p.status === "closed" ? "set aside" : "to come") + '</span>';
h += '<div style="color:#C8BCA8;margin:2px 0 4px">' + esc(p.note) + '</div>';
if (open || sel || built) {
h += 'Gold ' + Number(p.gold).toLocaleString() + ' of ' + Number(p.gold_goal).toLocaleString() + ctyBar(p.gold, p.gold_goal, "#E8C67A");
h += 'Work ' + p.work + ' of ' + p.work_goal + ' turns' + ctyBar(p.work, p.work_goal, "#7AB8E8");
h += '<div style="color:#9AA3B5">' + (p.givers || 0) + ' dreamer' + (p.givers === 1 ? "" : "s") + ' have given' + ((p.mine_gold || p.mine_work) ? ' · you: ' + Number(p.mine_gold).toLocaleString() + ' gold, ' + p.mine_work + ' turns' : '') + '</div>';
if ((p.top || []).length)
h += '<div style="color:#9AA3B5">Most given: ' + p.top.map(function (t) { return esc(t.name || "a dreamer") + (t.gold ? ' ' + Number(t.gold).toLocaleString() + ' gold' : '') + (t.work ? ' ' + t.work + ' turns' : ''); }).join(", ") + '</div>';
}
if (open) {
if (!signedIn())
h += '<div style="color:#9AA3B5;margin-top:6px">Sign in to give or to work.</div>';
else if (!B.paid)
h += '<div style="color:#9AA3B5;margin-top:6px">Giving and working on city projects is for dreamers whose dues are paid.</div>';
else {
var S = CTY.sites[p.key], here = S && ctySiteNear() === S, wait = B.next_work && new Date(B.next_work).getTime() > Date.now();
h += '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px;align-items:center"><input id="cty-g-' + p.id + '" type="number" min="1" max="100000" placeholder="gold" style="width:90px"><button class="btn" data-cty="give" data-id="' + p.id + '">Give gold</button>' +
(here ? '<button class="btn" data-cty="work" data-id="' + p.id + '"' + (wait ? " disabled" : "") + '>🔨 Lend a hand' + (wait ? " (in " + Math.ceil((new Date(B.next_work).getTime() - Date.now()) / 60000) + " min)" : "") + '</button>' :
'<button class="btn" data-cty="go" data-id="' + p.id + '">Show me the site</button>') + '</div>';
}
}
else if (built && CTY.sites[p.key])
h += '<button class="btn" data-cty="go" data-id="' + p.id + '" style="margin-top:6px">Show me the way</button>';
if (B.keeper && !built)
h += '<div style="margin-top:6px;color:#C9A868">Keeper: ' + (open ? '' : '<button class="btn" data-cty="kopen" data-id="' + p.id + '" style="padding:2px 8px">Open it</button> ') +
'<button class="btn" data-cty="kfinish" data-id="' + p.id + '" style="padding:2px 8px">Finish it now</button>' + (open ? ' <button class="btn" data-cty="kclose" data-id="' + p.id + '" style="padding:2px 8px">Set it aside</button>' : '') + '</div>';
h += '</div>';
});
return h;
},
function () {
var B = CTY.pr, h = '';
if (!B)
return '<div style="color:#9AA3B5">Reading the market…</div>';
h += '<div style="color:#9AA3B5;margin-bottom:6px">Every hour the city looks at what dreamers bought in the last day against a usual day. Goods in demand cost a little more, goods nobody buys a little less (80% to 130% of the old price). City jobs short of staff pay up to 15% more; jobs with every post filled pay 5% less.</div>';
h += '<b>Shop goods</b>';
(B.kinds || []).forEach(function (k) {
var pct = Math.round((k.factor - 1) * 100), up = k.factor > k.prev + 0.001, dn = k.factor < k.prev - 0.001;
h += '<div style="display:flex;justify-content:space-between;border-top:1px solid #2A3040;padding:4px 0"><span>' + esc(ctyKindName(k.kind)) + ' <span style="color:#9AA3B5">· ' + k.items + ' kinds · ' + k.bought + ' bought today, ' + k.usual + ' a usual day</span></span><b style="color:' + (pct > 0 ? "#E89A7A" : pct < 0 ? "#8AD0A0" : "#C8C0B0") + '">' + (pct > 0 ? "+" : "") + pct + '% ' + (up ? "▲" : dn ? "▼" : "") + '</b></div>';
});
if ((B.movers || []).length) {
h += '<b style="display:block;margin-top:10px">Biggest changes</b>';
B.movers.forEach(function (m) {
var pct = Math.round((m.price - m.base_price) / m.base_price * 100);
h += '<div style="display:flex;justify-content:space-between;border-top:1px solid #2A3040;padding:4px 0"><span>' + esc(m.name) + '</span><span>' + Number(m.price).toLocaleString() + ' gold <span style="color:' + (pct > 0 ? "#E89A7A" : "#8AD0A0") + '">(' + (pct > 0 ? "+" : "") + pct + '%)</span></span></div>';
});
}
h += '<b style="display:block;margin-top:10px">City wages</b>';
if (!(B.wages || []).length)
h += '<div style="color:#9AA3B5">Every city job pays its usual wage just now.</div>';
(B.wages || []).forEach(function (w) {
var pct = Math.round((w.factor - 1) * 100);
h += '<div style="display:flex;justify-content:space-between;border-top:1px solid #2A3040;padding:4px 0"><span>' + esc(w.title) + (w.workplace ? ' <span style="color:#9AA3B5">· ' + esc(w.workplace) + '</span>' : '') + ' <span style="color:#9AA3B5">· ' + w.held + ' of ' + w.positions + ' posts filled</span></span><span>' + w.rate + (w.pay_kind === "salary" ? "" : "/h") + ' <b style="color:' + (pct > 0 ? "#8AD0A0" : "#E89A7A") + '">' + (pct > 0 ? "+" : "") + pct + '%</b></span></div>';
});
if (B.treasury != null)
h += '<div style="color:#9AA3B5;margin-top:8px">The city treasury holds ' + Number(B.treasury).toLocaleString() + ' gold. The market toll is ' + (B.toll || 0) + '%.</div>';
return h;
},
function () {
var h = '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><b style="font-size:15px;flex:1">🏙️ The city</b><button class="btn" data-cty="close">Close</button></div>';
h += '<div style="display:flex;gap:6px;margin-bottom:10px">' + [["weather", "Weather"], ["projects", "Projects"], ["prices", "Prices"]].map(function (t) { return '<button class="btn" data-cty="tab" data-t="' + t[0] + '" style="' + (CTY.tab === t[0] ? "border-color:#E8C67A;color:#F2E6C4" : "") + '">' + t[1] + '</button>'; }).join("") + '</div>';
if (CTY.say)
h += '<div style="margin:0 0 8px;color:#E8D9B0">' + esc(CTY.say) + '</div>';
return h + (CTY.tab === "weather" ? ctyWeatherHtml() : CTY.tab === "projects" ? ctyProjectsHtml() : ctyPricesHtml());
},
function (e) {
var t = e.target.closest && e.target.closest("[data-cty]");
if (!t)
return;
var a = t.getAttribute("data-cty"), id = +t.getAttribute("data-id");
if (a === "close") {
CTY.open = false;
ctyPaint();
return;
}
if (a === "tab") {
CTY.tab = t.getAttribute("data-t");
CTY.say = "";
ctyPaint();
if (CTY.tab === "prices")
ctyLoad("pr", true);
if (CTY.tab === "projects")
ctyLoad("pj", true);
return;
}
if (a === "give") {
var f = document.getElementById("cty-g-" + id), g = Math.round(+(f && f.value || 0));
if (!(g >= 1)) {
CTY.say = "How much gold?";
ctyPaint();
return;
}
var p = CTY.pj.projects.filter(function (q) { return q.id === id; })[0];
if (!confirm("Give " + g.toLocaleString() + " gold to " + (p ? p.name : "the project") + "? It goes to the city to build it, and is not returned."))
return;
ctyAct("project_give", { p_id: id, p_gold: g }, function (o) { if (o && o.ok && f)
f.value = ""; });
return;
}
if (a === "work") {
ctyAct("project_work", { p_id: id });
return;
}
if (a === "go") {
var q = CTY.pj.projects.filter(function (x) { return x.id === id; })[0], S = q && CTY.sites[q.key];
if (S) {
guideTo = { key: q.name, x: S.signAt.x, z: S.signAt.z };
var r = somnucorRealm();
if (r && (store.here || 0) !== r.id && typeof toSomnucor === "function")
toSomnucor();
setStatus("<b>" + esc(q.name) + "</b>: follow the pointer at the top of the screen.");
CTY.open = false;
ctyPaint();
}
else {
CTY.say = "The site is found when you are in the city. Go to Somnucor and look again.";
ctyPaint();
}
return;
}
if (a === "kopen" || a === "kfinish" || a === "kclose") {
ctyAct("project_keeper", { p_id: id, p_act: a.slice(1) });
return;
}
if (a === "wset") {
ctyAct("city_weather_keeper", { p_kind: document.getElementById("cty-wk").value, p_hours: +document.getElementById("cty-wh").value }, function () { setTimeout(function () { if (typeof wxApply === "function")
wxApply(); ctyPaint(); }, 1200); });
return;
}
if (a === "wnat") {
ctyAct("city_weather_keeper", { p_kind: "natural", p_hours: 0 }, function () { setTimeout(function () { if (typeof wxApply === "function")
wxApply(); ctyPaint(); }, 1200); });
return;
}
}
];
});
