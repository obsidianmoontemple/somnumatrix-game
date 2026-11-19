/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var EVT = { board: null, at: 0, busy: false, open: false, tab: "on", msg: "", missing: false, form: null, ask: null, reqs: null, reqAt: 0,
preview: null, W: {}, deco: null, said: {}, walk: null, warned: false, slow: 0 };
var EVT_KINDS = { parade: ["🎺", "Parade"], holiday: ["🎉", "Holiday"], festival: ["🎪", "Festival"], gathering: ["🧺", "Gathering"] };
var EVT_RINGS = [["plaza", "the Tower Plaza"], ["civic", "the Civic Ring"], ["estates", "the High Ring"], ["temples", "Temple Row"], ["markets", "the Market Ring"], ["commons", "the Commons"], ["harvest", "the Harvest Ring"]];
var EVT_RADII = { plaza: 130, civic: 245, estates: 430, temples: 740, markets: 1080, commons: 1280, harvest: 1790 };
var EVT_PALETTES = {
royal: ["Royal purple and gold", [0x5A1A7A, 0xE8C040, 0xC83A6A, 0xFFF4D0]],
crimson: ["Crimson and gold", [0xB8202A, 0xE8C040, 0xF4ECD8, 0x7A1A1A]],
spring: ["Spring pastels", [0xE88AB8, 0x8AD0B8, 0xF4E08A, 0xA898E8]],
summer: ["Summer brights", [0xFF8A2A, 0x2AB0E0, 0xFFD040, 0x4AC84A]],
autumn: ["Autumn", [0xC8642A, 0x8A3A1A, 0xE8B040, 0x6A8A2A]],
winter: ["Winter blue and silver", [0x2A5AA8, 0xD8E4F0, 0x8AB8E8, 0xF4F8FF]],
emerald: ["Emerald and cream", [0x1E7A4A, 0xF0E6C8, 0xC8A040, 0x3AA86A]],
ocean: ["Ocean", [0x1A6A8A, 0x7AD8E8, 0xF4ECD8, 0x2A9A9A]],
night: ["Midnight and silver", [0x1A1A4A, 0xC8C8E0, 0x6A5AC8, 0xFFF4D0]],
rainbow: ["Rainbow", [0xFF3A5A, 0xFFC83A, 0x3AE8FF, 0x8AFF5A, 0xC86AFF, 0xFF8A2A]]
};
var EVT_STYLES = [["classic", "Banner and flowers"], ["shop", "Shopfront"], ["carousel", "Carousel"], ["giftbox", "Great gift box"], ["lanterns", "Lanterns"], ["dragon", "Dragon's treasure"],
["masks", "Masks"], ["stars", "Moon and stars"], ["harvest", "Harvest moon"], ["grapes", "Grapes and amphora"], ["rainbow", "Rainbow"], ["sun", "Sun and braziers"],
["ship", "Ship and mermaids"], ["circus", "Circus tent"], ["music", "Lyre and notes"], ["wishes", "Wishing well"], ["crown", "Giant crown"],
["balloon-dragon", "Giant dragon balloon"], ["balloon-moon", "Giant moon balloon"], ["balloon-unicorn", "Giant unicorn balloon"]];
var EVT_THEME = { giftbox: 0, lanterns: 1, dragon: 2, masks: 3, stars: 4, harvest: 5, grapes: 6, rainbow: 7, sun: 8, ship: 9, circus: 10, music: 11, wishes: 12, crown: 13 };
var EVT_LENGTHS = [[20, "20 minutes"], [30, "half an hour"], [60, "an hour"], [90, "an hour and a half"], [120, "two hours"], [180, "three hours"], [240, "four hours"],
[360, "six hours"], [720, "twelve hours"], [1440, "a whole day"], [4320, "three days"], [10080, "a week"], [20160, "two weeks"]];
var EVT_V = 1.6;
function evtIn() { return typeof signedIn === "function" && signedIn(); }
function evtKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function evtE(s) { return typeof esc === "function" ? esc(String(s == null ? "" : s)) : String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
function evtRpc(name, args) { return (typeof cityRpc === "function" ? cityRpc(name, args || {}) : Promise.reject(new Error("offline"))).then(function (d) { EVT.missing = false; return d; }); }
function evtErr(e) { var m = String((e && e.message) || e || ""); if (/function|404|PGRST|does not exist|schema cache/i.test(m)) {
EVT.missing = true;
return "The Events book opens soon.";
} return m || "Something went wrong."; }
function evtHex(c) { return "#" + ("00000" + (c >>> 0).toString(16)).slice(-6); }
function evtCol(s, dflt) { return /^#[0-9a-f]{6}$/i.test(String(s || "")) ? parseInt(String(s).slice(1), 16) : dflt; }
function evtPal(e) { var p = EVT_PALETTES[(e && e.palette) || "royal"] || EVT_PALETTES.royal; return p[1]; }
function evtRingName(q) { for (var i = 0; i < EVT_RINGS.length; i++)
if (EVT_RINGS[i][0] === q)
return EVT_RINGS[i][1]; return "Somnucor"; }
function evtRingR(q) {
if (q === "plaza" && typeof festParadeRadius === "function") {
try {
return festParadeRadius();
}
catch (er) { }
}
if (typeof FEST_QRINGS !== "undefined" && FEST_QRINGS[q])
return FEST_QRINGS[q][0];
return EVT_RADII[q] || 245;
}
function evtCity() { var r = typeof somnucorRealm === "function" ? somnucorRealm() : null; return !!(r && (store.here || 0) === r.id && !(typeof WLD !== "undefined" && WLD.on) && !store.inside && typeof ATLC !== "undefined" && ATLC); }
function evtStart(e) { return new Date(e.starts_at).getTime(); }
function evtEnd(e) { return new Date(e.ends_at).getTime(); }
function evtLive(e) { var n = Date.now(); return !!e && (e.status === "announced" || e.preview) && n >= evtStart(e) && n < evtEnd(e); }
function evtWhen(e) { return __ZC(264, 0, this, arguments, new.target); }
function evtWhere(e) { return (e.x != null && e.z != null && e.kind !== "parade" ? "a spot near " : "") + evtRingName(e.ring); }
function evtSpot(e) {
if (e.x != null && e.z != null)
return { x: ATLC.x + (+e.x), z: ATLC.z + (+e.z) };
var R = evtRingR(e.ring), a = 0.35;
for (var k = 0; k < 60; k++) {
if (typeof atlClearAt !== "function" || atlClearAt(R, a, 20, 8))
break;
a += 0.03;
}
return { x: ATLC.x + Math.cos(a) * R, z: ATLC.z + Math.sin(a) * R };
}
var EVT_CARD = "position:fixed;left:50%;top:calc(70px + env(safe-area-inset-top,0px));transform:translateX(-50%);z-index:58;width:min(460px,calc(100vw - 24px));max-height:calc(100vh - 110px);overflow:auto;" +
"background:rgba(16,10,24,.97);color:#F6EEF8;border:1px solid #C8A040;border-radius:10px;padding:14px 16px;font:14px/1.45 system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.55)";
var EVT_BTN = "background:#7A2A8A;color:#FFF6EA;border:0;border-radius:14px;padding:6px 12px;font:600 13px system-ui,sans-serif;cursor:pointer;margin:2px";
var EVT_BTN2 = "background:#2A2236;color:#F6EEF8;border:1px solid #5A4A6E;border-radius:14px;padding:5px 11px;font:600 13px system-ui,sans-serif;cursor:pointer;margin:2px";
var EVT_IN = "width:100%;box-sizing:border-box;border-radius:6px;border:1px solid #5A4A6E;background:#1E1628;color:#F6EEF8;padding:7px;font:14px system-ui,sans-serif;margin:2px 0 6px";
function evtB(label, act, arg, alt) { return '<button style="' + (alt ? EVT_BTN2 : EVT_BTN) + '" data-ev="' + act + '"' + (arg != null ? ' data-evv="' + evtE(arg) + '"' : '') + '>' + label + '</button>'; }
function evtHead(t) { return '<div style="margin:12px 0 4px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#E8C66A">' + t + '</div>'; }
function evtDim(t) { return '<span style="color:#B8A8C4">' + t + '</span>'; }
function evtEl() { return __ZC(264, 1, this, arguments, new.target); }
function evtLoad(force) {
if (EVT.busy || (!force && Date.now() - EVT.at < 60000))
return Promise.resolve(EVT.board);
EVT.busy = true;
EVT.at = Date.now();
var p = evtIn() ? evtRpc("event_board") : (typeof carePublicRpc === "function" ? carePublicRpc("event_board") : Promise.resolve(null));
return p.then(function (d) {
EVT.busy = false;
if (d && d.ok) {
EVT.board = d;
evtSay();
}
else if (!EVT.board)
EVT.board = { events: [], mine: [], businesses: [] };
evtPaint();
return EVT.board;
}).catch(function (e) { EVT.busy = false; EVT.msg = evtErr(e); if (!EVT.board)
EVT.board = { events: [], mine: [], businesses: [] }; evtPaint(); return EVT.board; });
}
function evtEvents() { return (EVT.board && EVT.board.events) || []; }
function evtById(id) { id = +id; return evtEvents().filter(function (e) { return +e.id === id; })[0] || (EVT.preview && +EVT.preview.id === id ? EVT.preview : null); }
function evtLiveList() { var L = evtEvents().filter(evtLive); if (EVT.preview && evtLive(EVT.preview))
L = L.filter(function (e) { return +e.id !== +EVT.preview.id; }).concat([EVT.preview]); return L; }
function evtSay() {
if (!(typeof walkMode !== "undefined" && walkMode) || !evtCity())
return;
var n = Date.now();
evtEvents().forEach(function (e) {
if (e.status !== "announced")
return;
var k = e.id + "|" + e.starts_at, ic = (EVT_KINDS[e.kind] || EVT_KINDS.parade)[0];
if (evtLive(e) && !EVT.said[k + "on"]) {
EVT.said[k + "on"] = 1;
EVT.said[k + "soon"] = 1;
setStatus("<b>" + ic + " " + evtE(e.title) + "</b> is on now in " + evtE(evtWhere(e)) + ". Open <b>🎪 Events</b> in the Menu and press Show the way.");
}
else if (!evtLive(e) && evtStart(e) > n && evtStart(e) - n < 15 * 60000 && !EVT.said[k + "soon"]) {
EVT.said[k + "soon"] = 1;
setStatus("<b>" + ic + " " + evtE(e.title) + "</b> starts in " + Math.max(1, Math.round((evtStart(e) - n) / 60000)) + " minutes in " + evtE(evtWhere(e)) + ".");
}
});
}
function evtOpen() { EVT.open = true; if (typeof document.exitPointerLock === "function")
try {
document.exitPointerLock();
}
catch (e) { } evtPaint(); evtLoad(true); if (evtKeeper())
evtReqLoad(true); }
function evtClose() { EVT.open = false; EVT.ask = null; var el = document.getElementById("evt-book"); if (el)
el.style.display = "none"; }
function evtPaint() {
var el = document.getElementById("evt-book");
if (!EVT.open) {
if (el)
el.style.display = "none";
return;
}
el = evtEl();
el.style.display = "block";
var k = evtKeeper(), tabs = [["on", "What's on"], ["mine", "My places"]];
if (k) {
tabs.push(["make", EVT.form && EVT.form.id ? "Edit the event" : "Make an event"]);
var np = (EVT.reqs || []).filter(function (r) { return r.status === "pending"; }).length;
tabs.push(["reqs", "Requests" + (np ? " (" + np + ")" : "")]);
}
var h = '<div style="display:flex;justify-content:space-between;align-items:center"><b style="font:600 18px Georgia,serif;color:#FFE7B0">🎪 Events in Somnucor</b>' + evtB("Close", "close", null, true) + '</div>';
h += '<div style="margin:6px 0 2px">' + tabs.map(function (t) { return '<button style="' + (EVT.tab === t[0] ? EVT_BTN : EVT_BTN2) + '" data-ev="tab" data-evv="' + t[0] + '">' + t[1] + '</button>'; }).join("") + '</div>';
if (EVT.msg)
h += '<div style="margin:6px 0;color:#FFE7B0">' + evtE(EVT.msg) + '</div>';
if (EVT.ask)
h += evtAskHtml();
else if (EVT.tab === "mine")
h += evtMineHtml();
else if (EVT.tab === "make" && k)
h += evtFormHtml();
else if (EVT.tab === "reqs" && k)
h += evtReqsHtml();
else
h += evtOnHtml();
var keep = el.scrollTop;
el.innerHTML = h;
el.scrollTop = keep;
}
function evtPlacesHtml(e) { return __ZC(264, 2, this, arguments, new.target); }
function evtMinePlaces(e) { return ((EVT.board && EVT.board.mine) || []).filter(function (m) { return +m.event_id === +e.id && m.status !== "withdrawn"; }); }
function evtOnHtml() { return __ZC(264, 3, this, arguments, new.target); }
function evtCardHtml(e, draft) { return __ZC(264, 4, this, arguments, new.target); }
function evtKindWord(k) { return { float: "a float", walk: "a place marching", stall: "a stall", join: "taking part" }[k] || k; }
function evtMineHtml() { return __ZC(264, 5, this, arguments, new.target); }
function evtAskStart(id) { return __ZC(264, 6, this, arguments, new.target); }
function evtAskRead() {
var A = EVT.ask;
if (!A)
return;
function v(id) { var x = document.getElementById(id); return x ? x.value : null; }
["kind", "biz", "banner", "style", "colour", "note"].forEach(function (k) { var x = v("evt-a-" + k); if (x != null)
A[k] = x; });
}
function evtAskHtml() { return __ZC(264, 7, this, arguments, new.target); }
function evtAskDefaultBanner() {
var A = EVT.ask, biz = (EVT.board && EVT.board.businesses) || [], b = biz.filter(function (x) { return String(x.id) === String(A.biz); })[0];
return b ? b.name : (typeof playerName === "function" && playerName()) || "Your name";
}
function evtAskGo() { return __ZC(264, 8, this, arguments, new.target); }
function evtChime() { if (typeof playTone === "function") {
[784, 988, 1175].forEach(function (f, i) { setTimeout(function () { try {
playTone(f, 0.14);
}
catch (e) { } }, i * 130); });
} }
function evtLocalInput(ms) { var d = new Date(ms), p = function (n) { return (n < 10 ? "0" : "") + n; }; return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + "T" + p(d.getHours()) + ":" + p(d.getMinutes()); }
function evtFormNew() {
var t = Date.now() + 3600000;
t = Math.ceil(t / 3600000) * 3600000;
EVT.form = { id: null, kind: "parade", title: "", blurb: "", where: evtCity() ? "here" : "civic", x: null, z: null, start: evtLocalInput(t), mins: 60, palette: "royal",
style: "crown", banner: "", floats: 4, walkers: 6, stalls: 0, open: true };
}
function evtFormFrom(e) { return __ZC(264, 9, this, arguments, new.target); }
function evtFormRead() { return __ZC(264, 10, this, arguments, new.target); }
function evtFormHtml() { return __ZC(264, 11, this, arguments, new.target); }
function evtFormArgs() { return __ZC(264, 12, this, arguments, new.target); }
function evtSave(then) { return __ZC(264, 13, this, arguments, new.target); }
function evtSet(id, what) { return __ZC(264, 14, this, arguments, new.target); }
function evtTry(e) { return __ZC(264, 15, this, arguments, new.target); }
function evtReqLoad(force) {
if (!evtKeeper())
return;
if (!force && Date.now() - EVT.reqAt < 45000)
return;
EVT.reqAt = Date.now();
evtRpc("event_requests_board").then(function (d) { if (d && d.ok) {
EVT.reqs = d.requests || [];
evtPaint();
} }).catch(function (e) { evtErr(e); });
}
function evtReqsHtml() { return __ZC(264, 16, this, arguments, new.target); }
function evtDecide(id, ok) {
var n = document.getElementById("evt-n-" + id);
evtRpc("event_decide", { p_id: +id, p_ok: !!ok, p_note: n ? n.value : "" }).then(function (o) { EVT.msg = (o && o.say) || ""; evtReqLoad(true); evtLoad(true); }).catch(function (e) { EVT.msg = evtErr(e); evtPaint(); });
}
function evtAct(a, v) { return __ZC(264, 17, this, arguments, new.target); }
function evtShowWay(id) { return __ZC(264, 18, this, arguments, new.target); }
function evtTex(W, c) { (W.tex || (W.tex = [])).push(c.tex); return c.tex; }
function evtSign(W, txt, sub, w, h, bg) {
var c = typeof festCanvasSign === "function" ? festCanvasSign(txt, sub, 1024, 256, bg) : null;
if (!c || typeof festTwoFace !== "function")
return new THREE.Group();
evtTex(W, c);
return festTwoFace(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: c.tex }));
}
function evtNoRay(g) { g.traverse(function (m) { m.raycast = function () { }; }); return g; }
function evtFloat(W, style, col, banner, sub, pal) { return __ZC(264, 19, this, arguments, new.target); }
function evtClassic(W, col, banner, pal) { return __ZC(264, 20, this, arguments, new.target); }
function evtShopfront(W, col, banner) { return __ZC(264, 21, this, arguments, new.target); }
function evtStall(W, col, banner, sub) { return __ZC(264, 22, this, arguments, new.target); }
function evtPlacard(W, txt, col) { return __ZC(264, 23, this, arguments, new.target); }
function evtParadeBuild(e, W) { return __ZC(264, 24, this, arguments, new.target); }
function evtBalloonPut(W, style, col, banner, put, fig, id, me) { return __ZC(264, 25, this, arguments, new.target); }
function evtParadeHead(e, R, P, len) { return __ZC(264, 26, this, arguments, new.target); }
function evtParadeTick(e, W, dt, t) { return __ZC(264, 27, this, arguments, new.target); }
function evtObstacles(cx, cz, r) { return __ZC(264, 28, this, arguments, new.target); }
function evtFree(x, z, obs, pad) {
if (typeof blockedAt === "function" && blockedAt(x, z, 0))
return false;
for (var i = 0; i < obs.length; i++)
if (Math.hypot(obs[i].x - x, obs[i].z - z) < obs[i].r + (pad || 1.2))
return false;
return true;
}
function evtSpotBuild(e, W) { return __ZC(264, 29, this, arguments, new.target); }
function evtArch(W, e, pal) { return __ZC(264, 30, this, arguments, new.target); }
function evtBandstand(pal) { return __ZC(264, 31, this, arguments, new.target); }
function evtBulbs(parent, pts, pal) { return __ZC(264, 32, this, arguments, new.target); }
function evtPolesAndBunting(g, poles, pal, loop) { return __ZC(264, 33, this, arguments, new.target); }
function evtDecoKey(L, P) { return L.map(function (e) { return e.id + ":" + e.palette + ":" + e.title + ":" + e.ring + ":" + e.kind; }).join("|") + "|" + Math.round(P.x / 60) + "," + Math.round(P.z / 60) + "|" + (typeof festOn === "function" && festOn() ? 1 : 0); }
function evtDecoBuild(L, P) { return __ZC(264, 34, this, arguments, new.target); }
function evtBannerTex(e, pal) { return __ZC(264, 35, this, arguments, new.target); }
function evtDropGroup(g, tex) { return __ZC(264, 36, this, arguments, new.target); }
function evtDecoDrop() { if (EVT.deco) {
evtDropGroup(EVT.deco.g, EVT.deco.tex);
EVT.deco = null;
} }
function evtWorldDrop(id) { var W = EVT.W[id]; if (W) {
evtDropGroup(W.g, W.tex);
delete EVT.W[id];
} }
function evtWalkToggle(id) { return __ZC(264, 37, this, arguments, new.target); }
function evtWalkTick() {
var w = EVT.walk;
if (!w)
return;
var e = evtById(w.ev), W = EVT.W[w.ev];
if (!e || !evtLive(e) || !evtCity()) {
EVT.walk = null;
return;
}
var it = W && W.items && W.items.filter(function (x) { return String(x.me) === String(w.place); })[0];
if (!it || it.x === undefined)
return;
var R = evtRingR(e.ring), side = it.role === "float" ? 3.6 : it.l + 1.4, x = ATLC.x + Math.cos(it.a) * (R + side), z = ATLC.z + Math.sin(it.a) * (R + side), P = camera.position;
if (!w.on) {
guideTo = { key: "Your place in " + e.title, x: x, z: z };
if (Math.hypot(P.x - x, P.z - z) < 6) {
w.on = true;
w.last = null;
setStatus("<b>🚶 You are marching in " + evtE(e.title) + "!</b> Walk away from the line to step out.");
}
return;
}
if (w.last && Math.hypot(P.x - w.last.x, P.z - w.last.z) > 1.5) {
EVT.walk = null;
setStatus("You step out of the parade.");
return;
}
P.x = x;
P.z = z;
w.last = { x: x, z: z };
}
function evtWorldTick(dt, t) {
var city = evtCity() && typeof walkMode !== "undefined" && walkMode, L = city ? evtLiveList() : [], keep = {};
if (EVT.preview && !evtLive(EVT.preview)) {
evtWorldDrop(EVT.preview.id);
EVT.preview = null;
}
L.forEach(function (e) {
var sig = e.id + "|" + (e.places || []).map(function (p) { return p.id + p.banner + p.colour + p.style; }).join(",") + "|" + e.title + e.palette + JSON.stringify(e.lead || {}) + e.kind + e.ring + e.x + e.z + (e.preview ? "p" : "");
var W = EVT.W[e.id];
if (W && W.sig !== sig) {
evtWorldDrop(e.id);
W = null;
}
if (!W)
W = EVT.W[e.id] = { sig: sig, tex: [] };
keep[e.id] = 1;
if (e.kind === "parade")
evtParadeTick(e, W, dt, t);
else if (e.kind === "festival" || e.kind === "gathering") {
if (!W.g) {
var c = evtSpot(e), P = camera.position;
if (Math.hypot(c.x - P.x, c.z - P.z) < 260)
evtSpotBuild(e, W);
}
else
W.g.visible = Math.hypot(W.c.x - camera.position.x, W.c.z - camera.position.z) < (W.g.visible ? 340 : 320);
}
});
Object.keys(EVT.W).forEach(function (id) { if (!keep[id])
evtWorldDrop(id); });
var dress = L.filter(function (e) { return e.kind === "parade" || e.kind === "holiday"; });
if (!dress.length) {
evtDecoDrop();
}
else {
var key = evtDecoKey(dress, camera.position);
if (!EVT.deco || EVT.deco.key !== key)
evtDecoBuild(dress, camera.position);
}
evtWalkTick();
}
function evtButtonTick() {
var bar = document.getElementById("me-bar"), b = document.getElementById("me-events");
var show = typeof walkMode !== "undefined" && walkMode && (evtCity() || evtKeeper() || evtLiveList().length > 0);
if (!show) {
if (b)
b.style.display = "none";
if (EVT.open && !evtKeeper())
evtClose();
return;
}
if (!b) {
b = document.createElement("button");
b.className = "btn";
b.id = "me-events";
b.title = "Events: parades, holidays, festivals; ask for a float, a place or a stall";
b.onclick = function () { EVT.open ? evtClose() : evtOpen(); };
if (bar)
bar.appendChild(b);
else {
b.style.cssText = "position:fixed;left:10px;bottom:calc(270px + env(safe-area-inset-bottom,0px));z-index:40";
document.body.appendChild(b);
}
}
else if (bar && b.parentNode !== bar) {
b.style.cssText = "";
bar.appendChild(b);
}
var n = evtLiveList().filter(function (e) { return !e.preview; }).length, np = evtKeeper() ? (EVT.reqs || []).filter(function (r) { return r.status === "pending"; }).length : 0;
var label = "🎪 Events" + (n ? " (" + n + " on)" : "") + (np ? " · " + np + " asking" : "");
if (b.textContent !== label)
b.textContent = label;
b.style.display = "";
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) {
tt(dt);
try {
evtWorldTick(dt, performance.now() / 1000);
EVT.slow -= dt;
if (EVT.slow <= 0) {
EVT.slow = 1;
evtButtonTick();
if (typeof walkMode !== "undefined" && walkMode) {
evtLoad(false);
if (evtKeeper())
evtReqLoad(false);
evtSay();
}
if (EVT.open && !EVT.ask && EVT.tab === "on") {
var el = document.getElementById("evt-book");
if (el && !el.contains(document.activeElement))
evtPaint();
}
}
}
catch (e) {
if (window.console && !EVT.warned) {
EVT.warned = true;
console.warn("[events]", e);
}
}
};
})();
