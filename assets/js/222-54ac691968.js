/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var GMS = { open: false, view: "lobby", lb: null, lbAt: 0, id: 0, g: null, ver: 0, recvAt: 0, sel: -1, promo: null, say: "", busy: false, inv: { chess: "", draughts: "" }, blind: 10, buyin: 0,
raise: 0, seenTurn: {}, badge: false, tables: [], tried: 0, promptKey: null, warned: 0, pollAt: 0, acting: false };
function gchSq(i) { return "abcdefgh".charAt(i & 7) + ((i >> 3) + 1); }
function gchIdx(s) { return (s.charCodeAt(1) - 49) * 8 + (s.charCodeAt(0) - 97); }
function gchStart() { return { b: "RNBQKBNRPPPPPPPP" + "................................" + "pppppppprnbqkbnr", t: "w", c: "KQkq", e: -1, h: 0, n: 1 }; }
function gchW(ch) { return ch >= "A" && ch <= "Z"; }
var GCH_KN = [[1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]], GCH_KG = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
var GCH_RK = [[1, 0], [-1, 0], [0, 1], [0, -1]], GCH_BS = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
function gchAt(b, r, f) { return (r < 0 || r > 7 || f < 0 || f > 7) ? null : b.charAt(r * 8 + f); }
function gchAttacked(b, sq, byW) { return __ZC(222, 0, this, arguments, new.target); }
function gchKing(b, w) { return b.indexOf(w ? "K" : "k"); }
function gchPseudo(P) { return __ZC(222, 1, this, arguments, new.target); }
function gchApply(P, m) { return __ZC(222, 2, this, arguments, new.target); }
function gchLegal(P) {
var w = P.t === "w";
return gchPseudo(P).filter(function (m) { var Q = gchApply(P, m); return !gchAttacked(Q.b, gchKing(Q.b, w), !w); });
}
function gchCheck(P) { var w = P.t === "w"; return gchAttacked(P.b, gchKing(P.b, w), !w); }
function gchEnd(P) {
var n = gchLegal(P).length;
if (!n)
return gchCheck(P) ? "checkmate" : "stalemate";
if ((P.h || 0) >= 100)
return "draw";
var rest = P.b.replace(/[.Kk]/g, "");
if (rest === "" || (rest.length === 1 && "NBnb".indexOf(rest) >= 0))
return "draw";
return "";
}
function gchMoveStr(m) { return gchSq(m.f) + gchSq(m.t) + (m.p || ""); }
function gdrStart() {
var a = [];
for (var i = 0; i < 64; i++) {
var r = i >> 3, f = i & 7, dark = (r + f) % 2 === 0;
a.push(!dark ? "." : r < 3 ? "d" : r > 4 ? "l" : ".");
}
return { b: a.join(""), t: 0 };
}
function gdrMine(c, side) { return side === 0 ? (c === "d" || c === "D") : (c === "l" || c === "L"); }
function gdrMoves(P) { return __ZC(222, 3, this, arguments, new.target); }
function gdrApply(P, m) {
var a = P.b.split(""), from = m.path[0], to = m.path[m.path.length - 1], c = a[from];
a[from] = ".";
m.caps.forEach(function (s) { a[s] = "."; });
if (c === "d" && (to >> 3) === 7)
c = "D";
if (c === "l" && (to >> 3) === 0)
c = "L";
a[to] = c;
return { b: a.join(""), t: 1 - P.t };
}
function gdrMoveStr(m) { return m.path.join(m.caps.length ? "x" : "-"); }
function gmsSigned() { return typeof signedIn === "function" && signedIn(); }
function gmsLobby(force) {
if (typeof cityRpc !== "function" || (!force && Date.now() - GMS.lbAt < 8000))
return Promise.resolve(GMS.lb);
GMS.lbAt = Date.now();
return cityRpc("games_lobby", {}).then(function (o) { if (o && o.ok) {
GMS.lb = o;
gmsNotice();
} if (GMS.open && GMS.view === "lobby")
gmsPaint(); return o; }).catch(function () { return null; });
}
function gmsLoad() { return __ZC(222, 4, this, arguments, new.target); }
function gmsCall(name, args, then) { return __ZC(222, 5, this, arguments, new.target); }
function gmsMyTurn(g) {
if (!g || g.seat == null || g.status !== "playing")
return false;
if (g.kind === "poker")
return +((g.state || {}).to_act) === +g.seat;
return +((g.state || {}).turn || 0) === +g.seat;
}
function gmsNotice() { return __ZC(222, 6, this, arguments, new.target); }
function gmsBtn(act, label, extra, style) { return "<button class='btn' data-gms='" + act + "'" + (extra || "") + " style='margin:2px 4px 2px 0;" + (style || "") + "'>" + label + "</button>"; }
function gmsName(n) { return esc(n || "a dreamer"); }
function gmsAgo(iso) { var m = Math.round((Date.now() - new Date(iso).getTime()) / 60000); return m < 2 ? "just now" : m < 60 ? m + " min ago" : Math.round(m / 60) + " h ago"; }
function gmsLobbyHtml() { return __ZC(222, 7, this, arguments, new.target); }
function gmsRow(t, mine) { return __ZC(222, 8, this, arguments, new.target); }
function gmsSqPx() { var w = Math.min(560, (window.innerWidth || 400) - 32) - 30; return Math.max(30, Math.min(50, Math.floor(w / 8))); }
function gmsBoardHtml() { return __ZC(222, 9, this, arguments, new.target); }
function gmsBoardView() { return __ZC(222, 10, this, arguments, new.target); }
function gmsCard(c, big) { return __ZC(222, 11, this, arguments, new.target); }
function gmsPokerView() { return __ZC(222, 12, this, arguments, new.target); }
function gmsHtml() { return __ZC(222, 13, this, arguments, new.target); }
function gmsPaint() { return __ZC(222, 14, this, arguments, new.target); }
function gmsChange(e) {
var t = e.target;
if (t.hasAttribute("data-inv"))
GMS.inv[t.getAttribute("data-inv")] = t.value;
if (t.hasAttribute("data-blind"))
GMS.blind = +t.value || 10;
if (t.hasAttribute("data-raise"))
GMS.raise = Math.floor(+t.value || 0);
if (t.hasAttribute("data-buyin"))
GMS.buyin = Math.floor(+t.value || 0);
}
function gmsGo(id) { GMS.id = id; GMS.g = null; GMS.ver = 0; GMS.sel = -1; GMS.promo = null; GMS.raise = 0; GMS.say = ""; GMS.view = "table"; GMS.busy = false; gmsPaint(); gmsLoad(); }
function gmsSend(move, pos, end) { return __ZC(222, 15, this, arguments, new.target); }
function gmsSquare(i) { return __ZC(222, 16, this, arguments, new.target); }
function gmsClick(e) { return __ZC(222, 17, this, arguments, new.target); }
function gmsOpen(id) {
GMS.open = true;
GMS.say = "";
if (id)
gmsGo(id);
else {
if (GMS.view !== "table")
GMS.view = "lobby";
gmsPaint();
if (GMS.view === "table")
gmsLoad();
}
gmsLobby(true);
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
}
function gmsCasinoTable() { return __ZC(222, 18, this, arguments, new.target); }
if (typeof casBuild === "function") {
var gmsCasBuild0 = casBuild;
casBuild = function (G) { return __ZC(222, 19, this, arguments, new.target); };
}
function gmsTableMake(x, z) {
var g = new THREE.Group(), stone = new THREE.MeshLambertMaterial({ color: 0x9A948A }), dk = new THREE.MeshLambertMaterial({ color: 0x6A645A });
var cv = document.createElement("canvas");
cv.width = 128;
cv.height = 128;
var c = cv.getContext("2d");
for (var i = 0; i < 64; i++) {
c.fillStyle = ((i >> 3) + (i & 7)) % 2 ? "#E8DCC0" : "#5A4030";
c.fillRect((i & 7) * 16, (i >> 3) * 16, 16, 16);
}
var tex = new THREE.CanvasTexture(cv);
if (THREE.SRGBColorSpace)
tex.colorSpace = THREE.SRGBColorSpace;
var top = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.1, 1.1), stone);
top.position.y = 0.78;
g.add(top);
var bd = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.8), new THREE.MeshLambertMaterial({ map: tex }));
bd.rotation.x = -Math.PI / 2;
bd.position.y = 0.835;
g.add(bd);
var leg = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.24, 0.74, 10), dk);
leg.position.y = 0.37;
g.add(leg);
[-1, 1].forEach(function (s) { var st = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.26, 0.46, 10), stone); st.position.set(0, 0.23, s * 0.95); g.add(st); });
var wp = new THREE.MeshLambertMaterial({ color: 0xF4ECDC }), bp = new THREE.MeshLambertMaterial({ color: 0x201A16 });
[[-0.3, 0.25, wp], [0.1, 0.3, wp], [0.2, -0.25, bp], [-0.1, -0.3, bp], [0.3, 0.05, wp], [-0.25, -0.05, bp]].forEach(function (q) { var p = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.04, 0.09, 8), q[2]); p.position.set(q[0], 0.88, q[1]); g.add(p); });
g.position.set(x, terrainY(x, z), z);
g.userData.noCull = 1;
scene.add(g);
GMS.tables.push({ g: g, x: x, z: z });
}
function gmsPlaceTick() {
var cr = typeof somnucorRealm === "function" ? somnucorRealm() : null;
if (!cr || (store.here || 0) !== cr.id)
return;
if (GMS.tried || typeof TN === "undefined" || !TN.board || !TN.board.g)
return;
GMS.tried = 1;
var T = TN.board, cx = ATLC.x - T.x, cz = ATLC.z - T.z, L = Math.hypot(cx, cz) || 1, ux = cx / L, uz = cz / L, made = 0;
[[7, -2.6], [7, 2.6], [10, -2.6], [10, 2.6], [13, -2.6], [13, 2.6], [16, 0]].forEach(function (o) {
if (made >= 2)
return;
var x = T.x + ux * o[0] - uz * o[1], z = T.z + uz * o[0] + ux * o[1];
if (typeof dkFree === "function" && !dkFree(x, z, cr.id))
return;
if (typeof blockedAt === "function" && blockedAt(x, z))
return;
if (typeof roadAt === "function") {
var rd = roadAt(x, z);
if (rd && rd.kind !== "plaza")
return;
}
if ((store.objects || []).some(function (q) { return (q.realm || 0) === cr.id && Math.hypot(q.x - x, q.z - z) < 6; }))
return;
if (GMS.tables.some(function (t) { return Math.hypot(t.x - x, t.z - z) < 3; }))
return;
if (typeof NTC !== "undefined" && NTC.boards.some(function (b) { return Math.hypot(b.g.position.x - x, b.g.position.z - z) < 3.5; }))
return;
gmsTableMake(x, z);
made++;
});
}
function gmsPromptTick() {
if (typeof WLD !== "undefined" && WLD.on)
return;
var near = null;
if (typeof inCityNow === "function" && inCityNow() && !(typeof store !== "undefined" && store.inside)) {
var P = camera.position;
GMS.tables.forEach(function (t) { if (Math.hypot(P.x - t.x, P.z - t.z) < 2.2)
near = t; });
}
var html = near ? "♟️ <b>Chess tables</b> · <b>press E</b> to play chess, draughts or cards with another dreamer" : null;
if (html !== GMS.promptKey) {
GMS.promptKey = html;
if (typeof worldPromptCity === "function")
worldPromptCity(html, html ? function () { gmsOpen(); } : null);
}
}
if (typeof backRegister === "function")
backRegister({ order: 2, open: function () { return GMS.open; }, close: function () { GMS.open = false; gmsPaint(); } });
(function () {
function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-games"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-games";
b.title = "Chess, draughts and poker with other dreamers";
b.textContent = "♟️ Games";
b.onclick = function () { gmsOpen(); };
var pk = document.getElementById("me-notices");
if (pk && pk.parentNode === bar && pk.nextSibling)
bar.insertBefore(b, pk.nextSibling);
else
bar.appendChild(b);
}
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", hook);
else
hook();
})();
setInterval(function () {
try {
if (typeof inCityNow === "function" && inCityNow())
gmsPlaceTick();
gmsPromptTick();
var now = Date.now();
if (GMS.open && GMS.view === "table" && GMS.id) {
var g = GMS.g, every = g && g.kind === "poker" ? 1500 : 3000;
if (now - GMS.pollAt >= every) {
GMS.pollAt = now;
gmsLoad();
}
else if (g && (g.kind === "poker" ? g.status !== "closed" : g.status === "playing") && !(document.activeElement && document.activeElement.tagName === "INPUT"))
gmsPaint();
}
else if (gmsSigned() && !document.hidden) {
var going = GMS.lb && (GMS.lb.tables || []).some(function (t) { return t.mine && t.kind !== "poker"; });
if ((!GMS.lb && now - GMS.lbAt > 20000) || (going && now - GMS.lbAt > 30000) || (GMS.open && now - GMS.lbAt > 10000))
gmsLobby(true);
}
}
catch (e) {
if (!GMS.warned && window.console) {
GMS.warned = 1;
console.warn("[games]", e);
}
}
}, 1000);
