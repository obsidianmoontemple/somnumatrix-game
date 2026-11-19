/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(222, function () {
"use strict";
return [
function (b, sq, byW) {
var r = sq >> 3, f = sq & 7, i, d, k, c;
var pr = byW ? r - 1 : r + 1, pc = byW ? "P" : "p";
if (gchAt(b, pr, f - 1) === pc || gchAt(b, pr, f + 1) === pc)
return true;
for (i = 0; i < 8; i++) {
c = gchAt(b, r + GCH_KN[i][0], f + GCH_KN[i][1]);
if (c === (byW ? "N" : "n"))
return true;
}
for (i = 0; i < 8; i++) {
c = gchAt(b, r + GCH_KG[i][0], f + GCH_KG[i][1]);
if (c === (byW ? "K" : "k"))
return true;
}
for (k = 0; k < 2; k++) {
var dirs = k ? GCH_BS : GCH_RK, hit = k ? (byW ? "BQ" : "bq") : (byW ? "RQ" : "rq");
for (i = 0; i < 4; i++) {
for (d = 1; d < 8; d++) {
c = gchAt(b, r + dirs[i][0] * d, f + dirs[i][1] * d);
if (c === null)
break;
if (c !== ".") {
if (hit.indexOf(c) >= 0)
return true;
break;
}
}
}
}
return false;
},
function (P) {
var b = P.b, w = P.t === "w", out = [], i, r, f, c, d, k, t, tc;
function own(ch) { return ch !== "." && gchW(ch) === w; }
function add(fr, to, pr, kind) { out.push({ f: fr, t: to, p: pr || "", k: kind || "" }); }
for (i = 0; i < 64; i++) {
c = b.charAt(i);
if (c === "." || gchW(c) !== w)
continue;
r = i >> 3;
f = i & 7;
var u = c.toUpperCase();
if (u === "P") {
var dr = w ? 1 : -1, last = w ? 7 : 0, home = w ? 1 : 6;
var one = (r + dr) * 8 + f;
if (r + dr >= 0 && r + dr < 8 && b.charAt(one) === ".") {
if (r + dr === last)
["q", "r", "b", "n"].forEach(function (p) { add(i, one, p); });
else
add(i, one);
var two = (r + 2 * dr) * 8 + f;
if (r === home && b.charAt(two) === ".")
add(i, two, "", "two");
}
[-1, 1].forEach(function (df) {
var tr = r + dr, tf = f + df;
if (tr < 0 || tr > 7 || tf < 0 || tf > 7)
return;
var to = tr * 8 + tf, x = b.charAt(to);
if (x !== "." && gchW(x) !== w) {
if (tr === last)
["q", "r", "b", "n"].forEach(function (p) { add(i, to, p); });
else
add(i, to);
}
else if (to === P.e)
add(i, to, "", "ep");
});
}
else if (u === "N" || u === "K") {
var J = u === "N" ? GCH_KN : GCH_KG;
for (k = 0; k < 8; k++) {
tc = gchAt(b, r + J[k][0], f + J[k][1]);
if (tc === null || own(tc))
continue;
add(i, (r + J[k][0]) * 8 + f + J[k][1]);
}
if (u === "K" && f === 4 && r === (w ? 0 : 7) && !gchAttacked(b, i, !w)) {
var row = r * 8, cr = P.c || "";
if (cr.indexOf(w ? "K" : "k") >= 0 && b.charAt(row + 5) === "." && b.charAt(row + 6) === "." && b.charAt(row + 7) === (w ? "R" : "r") && !gchAttacked(b, row + 5, !w))
add(i, row + 6, "", "castle");
if (cr.indexOf(w ? "Q" : "q") >= 0 && b.charAt(row + 3) === "." && b.charAt(row + 2) === "." && b.charAt(row + 1) === "." && b.charAt(row) === (w ? "R" : "r") && !gchAttacked(b, row + 3, !w))
add(i, row + 2, "", "castle");
}
}
else {
var D = u === "R" ? GCH_RK : u === "B" ? GCH_BS : GCH_RK.concat(GCH_BS);
for (k = 0; k < D.length; k++) {
for (d = 1; d < 8; d++) {
tc = gchAt(b, r + D[k][0] * d, f + D[k][1] * d);
if (tc === null || own(tc))
break;
add(i, (r + D[k][0] * d) * 8 + f + D[k][1] * d);
if (tc !== ".")
break;
}
}
}
}
return out;
},
function (P, m) {
var a = P.b.split(""), c = a[m.f], w = P.t === "w", cap = a[m.t] !== "." || m.k === "ep";
a[m.t] = m.p ? (w ? m.p.toUpperCase() : m.p) : c;
a[m.f] = ".";
if (m.k === "ep")
a[m.t + (w ? -8 : 8)] = ".";
if (m.k === "castle") {
var row = m.f & 56;
if ((m.t & 7) === 6) {
a[row + 5] = a[row + 7];
a[row + 7] = ".";
}
else {
a[row + 3] = a[row];
a[row] = ".";
}
}
var cr = P.c || "";
function drop(x) { cr = cr.replace(x, ""); }
if (c === "K") {
drop("K");
drop("Q");
}
if (c === "k") {
drop("k");
drop("q");
}
[m.f, m.t].forEach(function (s) { if (s === 0)
drop("Q"); if (s === 7)
drop("K"); if (s === 56)
drop("q"); if (s === 63)
drop("k"); });
return { b: a.join(""), t: w ? "b" : "w", c: cr, e: m.k === "two" ? (m.f + m.t) / 2 : -1, h: (c.toUpperCase() === "P" || cap) ? 0 : (P.h || 0) + 1, n: (P.n || 1) + (w ? 0 : 1) };
},
function (P) {
var b = P.b, side = P.t, caps = [], steps = [], i;
for (i = 0; i < 64; i++) {
var c = b.charAt(i);
if (!gdrMine(c, side))
continue;
var king = c === "D" || c === "L", dirs = king ? [[1, 1], [1, -1], [-1, 1], [-1, -1]] : (side === 0 ? [[1, 1], [1, -1]] : [[-1, 1], [-1, -1]]);
(function (start, dirs, king) {
var bb = b.split("");
bb[start] = ".";
function jump(at, path, taken) {
var r = at >> 3, f = at & 7, more = false;
dirs.forEach(function (d) {
var mr = r + d[0], mf = f + d[1], tr = r + 2 * d[0], tf = f + 2 * d[1];
if (tr < 0 || tr > 7 || tf < 0 || tf > 7)
return;
var mid = mr * 8 + mf, to = tr * 8 + tf, mc = bb[mid];
if (mc === "." || gdrMine(mc, side) || taken.indexOf(mid) >= 0 || bb[to] !== ".")
return;
more = true;
var crown = !king && tr === (side === 0 ? 7 : 0);
if (crown)
caps.push({ path: path.concat([to]), caps: taken.concat([mid]) });
else
jump(to, path.concat([to]), taken.concat([mid]));
});
if (!more && taken.length)
caps.push({ path: path, caps: taken });
}
jump(start, [start], []);
dirs.forEach(function (d) { var tr = (start >> 3) + d[0], tf = (start & 7) + d[1]; if (tr < 0 || tr > 7 || tf < 0 || tf > 7)
return; var to = tr * 8 + tf; if (b.charAt(to) === ".")
steps.push({ path: [start, to], caps: [] }); });
})(i, dirs, king);
}
return caps.length ? caps : steps;
},
function () {
if (!GMS.id || typeof cityRpc !== "function" || GMS.busy)
return;
GMS.busy = true;
cityRpc("game_state", { p_id: GMS.id, p_ver: GMS.g ? GMS.ver : 0 }).then(function (o) {
GMS.busy = false;
if (!o || !o.ok) {
if (o && o.say) {
GMS.say = o.say;
gmsPaint();
}
return;
}
if (o.same)
return;
var was = GMS.g, myTurnBefore = was && gmsMyTurn(was);
GMS.g = o;
GMS.ver = o.ver;
GMS.recvAt = Date.now();
if (was && was.state && o.state && JSON.stringify(was.hole) !== JSON.stringify(o.hole))
GMS.raise = 0;
if (!myTurnBefore && gmsMyTurn(o) && o.kind !== "poker" && !document.hidden)
GMS.say = "Your move.";
gmsPaint();
}).catch(function () { GMS.busy = false; });
},
function (name, args, then) {
if (GMS.acting)
return;
GMS.acting = true;
GMS.say = "…";
gmsPaint();
cityRpc(name, args).then(function (o) {
GMS.acting = false;
GMS.say = (o && o.say) || (o && o.ok ? "" : "That did not go through.");
if (then)
then(o || {});
GMS.busy = false;
if (GMS.view === "table")
gmsLoad();
gmsLobby(true);
gmsPaint();
}).catch(function () { GMS.acting = false; GMS.say = "That did not go through. Try again in a moment."; gmsPaint(); });
},
function () {
var lb = GMS.lb;
if (!lb)
return;
var due = (lb.tables || []).filter(function (t) { return t.your_move; }), fresh = null;
due.forEach(function (t) { if (GMS.seenTurn[t.id] !== t.ver) {
GMS.seenTurn[t.id] = t.ver;
fresh = t;
} });
GMS.badge = due.length > 0;
var b = document.getElementById("me-games");
if (b)
b.textContent = GMS.badge ? "♟️ Games •" : "♟️ Games";
if (fresh && !(GMS.open && GMS.view === "table" && GMS.id === fresh.id) && typeof setStatus === "function") {
var opp = (fresh.players || []).filter(function (p) { return p.id !== lb.me; })[0];
setStatus("♟️ Your move at " + fresh.kind + (opp ? " against " + (opp.name || "a dreamer") : "") + ". ☰ Menu → ♟️ Games.");
}
},
function () {
var lb = GMS.lb, h = "";
if (!lb)
return "<p>Looking at the tables…</p>";
if (!lb.signed_in)
h += "<p style='opacity:.85'>Sign in to play. You can watch any open table.</p>";
var mine = (lb.tables || []).filter(function (t) { return t.mine; }), others = (lb.tables || []).filter(function (t) { return !t.mine; });
if (mine.length) {
h += "<div style='font-weight:600;margin:6px 0 4px'>Your games</div>";
mine.forEach(function (t) { h += gmsRow(t, true); });
}
if (lb.signed_in) {
var fr = lb.friends || [];
var pick = function (k) {
return "<select data-inv='" + k + "' style='max-width:150px;background:#1A140C;color:inherit;border:1px solid #6A5A3A;border-radius:4px;padding:3px'><option value=''>anyone</option>" +
fr.map(function (f) { return "<option value='" + esc(f.id) + "'" + (GMS.inv[k] === f.id ? " selected" : "") + ">" + esc(f.name || "a friend") + "</option>"; }).join("") + "</select>";
};
h += "<div style='font-weight:600;margin:10px 0 4px'>Start a game</div>" +
"<div style='margin:3px 0'>♟️ Chess, for " + pick("chess") + " " + gmsBtn("new", "Set the board", " data-k='chess'") + "</div>" +
"<div style='margin:3px 0'>🔴 Draughts, for " + pick("draughts") + " " + gmsBtn("new", "Set the board", " data-k='draughts'") + "</div>" +
"<div style='margin:3px 0'>🃏 Hold'em poker: " + gmsBtn("pnew", "Friendly table", " data-s='0'") +
(lb.adult && !lb.keeper ? " or for chips, blinds <select data-blind style='background:#1A140C;color:inherit;border:1px solid #6A5A3A;border-radius:4px;padding:3px'>" +
[5, 10, 25, 50, 100, 250].map(function (v) { return "<option value='" + v + "'" + (GMS.blind === v ? " selected" : "") + ">" + v + "/" + (v * 2) + "</option>"; }).join("") + "</select> " + gmsBtn("pnew", "Stakes table", " data-s='1'") : "") +
"</div>" +
(lb.adult && !lb.keeper ? "<div style='opacity:.7;font-size:12px'>Stakes tables use your casino chips (you have " + ((+lb.chips || 0).toLocaleString()) + "). The house keeps 5% of a pot that sees a flop, at most three big blinds.</div>" :
lb.keeper ? "<div style='opacity:.7;font-size:12px'>The Keeper plays at friendly tables: the Keeper's gold never passes to players.</div>" :
"<div style='opacity:.7;font-size:12px'>Playing for chips is for adults. Friendly tables are open to everyone.</div>");
}
h += "<div style='font-weight:600;margin:10px 0 4px'>Open tables</div>";
if (!others.length)
h += "<p style='opacity:.75'>No one else has a table open. Start one, and anyone passing can sit down.</p>";
others.forEach(function (t) { h += gmsRow(t, false); });
if ((lb.done || []).length) {
h += "<div style='font-weight:600;margin:10px 0 4px'>Finished today</div>";
lb.done.slice(0, 8).forEach(function (d) { h += "<div style='opacity:.85;margin:2px 0'>" + esc(d.kind) + ": " + (d.winner ? (d.winner === lb.me ? "you won" : gmsName(d.winner_name) + " won") : "a draw") + " (" + esc(d.result || "") + "), " + gmsAgo(d.at) + "</div>"; });
}
return h;
},
function (t, mine) {
var lb = GMS.lb, icon = t.kind === "chess" ? "♟️" : t.kind === "draughts" ? "🔴" : "🃏";
var ppl = (t.players || []).map(function (p) { return p.id === lb.me ? "you" : gmsName(p.name); });
var line = t.kind === "poker" ? esc(t.title) + " · " + ppl.length + " of 6 seated" + (ppl.length ? " (" + ppl.join(", ") + ")" : "") :
esc(t.title) + " · " + (ppl.length < 2 ? (t.host === lb.me ? "you wait" : gmsName(t.host_name) + " waits") + " for a player" + (t.invite ? (t.for_me ? " (asked you)" : " (a friend asked)") : "") : ppl.join(" against "));
var acts = "";
if (mine)
acts = gmsBtn("go", t.your_move ? "Your move" : "Open", " data-id='" + t.id + "'", t.your_move ? "background:#6A4A12;border-color:#E8C27A" : "");
else if (t.kind === "poker")
acts = gmsBtn("go", "Sit or watch", " data-id='" + t.id + "'");
else if (t.status === "open" && lb.signed_in)
acts = gmsBtn("join", "Sit down", " data-id='" + t.id + "'") + gmsBtn("go", "Look", " data-id='" + t.id + "'");
else
acts = gmsBtn("go", "Watch", " data-id='" + t.id + "'");
return "<div style='display:flex;align-items:center;gap:6px;flex-wrap:wrap;padding:5px 0;border-top:1px solid rgba(201,168,104,.2)'><span style='flex:1;min-width:180px'>" + icon + " " + line + "</span>" + acts + "</div>";
},
function () {
var g = GMS.g, st = g.state || {}, chess = g.kind === "chess", flip = g.seat === 1, px = gmsSqPx();
var P = st.pos || (chess ? gchStart() : gdrStart()), moves = [], targets = {}, lastSq = {};
var mine = gmsMyTurn(g);
if (mine && GMS.sel >= 0) {
if (chess)
gchLegal(P).forEach(function (m) { if (m.f === GMS.sel)
targets[m.t] = 1; });
else
gdrMoves(P).forEach(function (m) { if (m.path[0] === GMS.sel)
targets[m.path[m.path.length - 1]] = 1; });
}
var movable = {};
if (mine) {
if (chess)
gchLegal(P).forEach(function (m) { movable[m.f] = 1; });
else
gdrMoves(P).forEach(function (m) { movable[m.path[0]] = 1; });
}
if (st.last) {
if (chess) {
lastSq[gchIdx(st.last.substr(0, 2))] = 1;
lastSq[gchIdx(st.last.substr(2, 2))] = 1;
}
else
String(st.last).split(/[x-]/).forEach(function (s) { lastSq[+s] = 1; });
}
var check = chess && gchCheck(P) ? gchKing(P.b, P.t === "w") : -1;
var GL = { K: "♔", Q: "♕", R: "♖", B: "♗", N: "♘", P: "♙", k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" };
var h = "<div style='display:inline-grid;grid-template-columns:repeat(8," + px + "px);border:2px solid #6A4A2E;touch-action:manipulation;user-select:none'>";
for (var row = 0; row < 8; row++)
for (var col = 0; col < 8; col++) {
var r = flip ? row : 7 - row, f = flip ? 7 - col : col, i = r * 8 + f, dark = (r + f) % 2 === 0, c = P.b.charAt(i);
var bg = chess ? (dark ? "#B58863" : "#F0D9B5") : (dark ? "#5A3A22" : "#E8D8B8");
if (lastSq[i])
bg = chess ? (dark ? "#AAA23A" : "#CDD26A") : "#7A5A2A";
if (i === GMS.sel)
bg = "#6A9A5A";
if (i === check)
bg = "#C8584A";
var inner = "";
if (c !== ".") {
if (chess)
inner = "<span style='font-size:" + Math.round(px * 0.78) + "px;line-height:1;color:" + (gchW(c) ? "#FFFFFF" : "#141414") + ";text-shadow:" + (gchW(c) ? "0 0 2px #000,0 0 1px #000" : "0 0 1px #FFF") + "'>" + GL[c] + "︎</span>";
else {
var light = c === "l" || c === "L", kg = c === "D" || c === "L";
inner = "<span style='display:flex;align-items:center;justify-content:center;width:78%;height:78%;border-radius:50%;background:" + (light ? "#F4ECDC" : "#8A1E1E") + ";border:2px solid " + (light ? "#B8A888" : "#4A0E0E") + ";box-shadow:0 2px 0 rgba(0,0,0,.4);color:" + (light ? "#8A6A2A" : "#E8C27A") + ";font-size:" + Math.round(px * 0.4) + "px'>" + (kg ? "♛︎" : "") + "</span>";
}
}
var dot = targets[i] ? "<span style='position:absolute;width:30%;height:30%;border-radius:50%;background:rgba(40,90,40,.65)'></span>" : "";
h += "<div data-gms='sq' data-i='" + i + "' style='position:relative;width:" + px + "px;height:" + px + "px;background:" + bg + ";display:flex;align-items:center;justify-content:center;cursor:" + ((movable[i] || targets[i]) ? "pointer" : "default") + "'>" + inner + dot + "</div>";
}
return h + "</div>";
},
function () {
var g = GMS.g, st = g.state || {}, lb = GMS.lb || {}, chess = g.kind === "chess";
var pl = g.players || [], p0 = pl.filter(function (p) { return p.seat === 0; })[0], p1 = pl.filter(function (p) { return p.seat === 1; })[0];
var side = function (s) { return chess ? (s === 0 ? "White" : "Black") : (s === 0 ? "Red" : "White"); };
var nm = function (p) { return p ? (p.id === lb.me ? "you" : gmsName(p.name)) : "(an empty chair)"; };
var h = "<div style='margin:4px 0 8px'>" + side(0) + ": <b>" + nm(p0) + "</b> · " + side(1) + ": <b>" + nm(p1) + "</b></div>";
var P = st.pos || (chess ? gchStart() : gdrStart());
if (g.status === "open")
h += "<p>" + (g.seat === 0 ? "Waiting for someone to sit down. You are " + side(0) + " and move first." : "This board is waiting for a player.") + "</p>";
else if (g.status === "done" || g.status === "closed")
h += "<p style='color:#FFE7B0'><b>" + (g.winner ? (g.winner === lb.me ? "You won" : gmsName(g.winner_name) + " won") : "A draw") + "</b>" + (g.result ? " (" + esc(g.result) + ")" : "") + ".</p>";
else {
var turn = +(st.turn || 0), mine = gmsMyTurn(g);
h += "<p>" + (mine ? "<b style='color:#FFE7B0'>Your move</b>" : (g.seat == null ? side(turn) + " to move" : nm(turn === 0 ? p0 : p1) + " to move")) +
(chess && gchCheck(P) ? " · <b>check</b>" : "") + (!chess && mine && gdrMoves(P).some(function (m) { return m.caps.length; }) ? " · you must take" : "") + "</p>";
if (st.draw != null && g.seat != null)
h += "<p style='color:#FFE7B0'>" + (+st.draw === g.seat ? "You offered a draw." : "They offer a draw. " + gmsBtn("draw", "Accept the draw") + gmsBtn("nodraw", "Play on")) + "</p>";
}
if (GMS.promo)
h += "<p>Make your pawn a: " + ["q", "r", "b", "n"].map(function (p) { return gmsBtn("promo", { q: "queen", r: "rook", b: "bishop", n: "knight" }[p], " data-p='" + p + "'"); }).join("") + "</p>";
h += "<div style='text-align:center'>" + gmsBoardHtml() + "</div>";
if ((st.moves || []).length)
h += "<div style='opacity:.7;font-size:12px;margin-top:6px'>" + st.moves.length + " moves played" + (chess ? " · last " + esc(st.last || "") : "") + "</div>";
if (g.seat != null) {
h += "<div style='margin-top:8px'>";
if (g.status === "open" && g.seat === 0)
h += gmsBtn("close", "Put the board away");
if (g.status === "playing") {
h += gmsBtn("resign", "Resign") + (st.draw == null ? gmsBtn("draw", "Offer a draw") : "");
var idle = (g.turn_age || 0) + (Date.now() - GMS.recvAt) / 1000;
if (!gmsMyTurn(g) && idle > 600)
h += gmsBtn("claim", "Claim the game: they left");
else if (!gmsMyTurn(g))
h += "<span style='opacity:.65;font-size:12px'>If they leave the game for ten minutes on their move, you may claim it.</span>";
}
h += "</div>";
}
else if (g.status === "open" && lb.signed_in)
h += "<div style='margin-top:8px'>" + gmsBtn("join", "Sit down", " data-id='" + g.id + "'") + "</div>";
if (!chess)
h += "<div style='opacity:.65;font-size:12px;margin-top:6px'>English draughts: men move forward on the dark squares, taking is a must, and you may take again in the same move. A man reaching the far side is crowned and moves both ways. Run out of moves and you lose.</div>";
return h;
},
function (c, big) {
if (c == null)
return "<span style='display:inline-block;width:" + (big ? 44 : 30) + "px;height:" + (big ? 62 : 42) + "px;margin:2px;border-radius:5px;background:repeating-linear-gradient(45deg,#6A1A2A,#6A1A2A 4px,#4A0E1E 4px,#4A0E1E 8px);border:1px solid #C9A868'></span>";
var r = "  23456789TJQKA".charAt(c >> 2), s = c & 3, red = s === 1 || s === 2;
r = r === "T" ? "10" : r;
return "<span style='display:inline-flex;flex-direction:column;align-items:center;justify-content:center;width:" + (big ? 44 : 30) + "px;height:" + (big ? 62 : 42) + "px;margin:2px;border-radius:5px;background:#FBF7EE;border:1px solid #8A7A5A;color:" + (red ? "#B01E28" : "#141414") + ";font:700 " + (big ? 18 : 13) + "px Georgia;line-height:1.05'>" + r + "<span>" + ["♣", "♦", "♥", "♠"][s] + "︎</span></span>";
},
function () {
var g = GMS.g, st = g.state || {}, lb = GMS.lb || {}, ps = st.p || [], me = g.seat != null ? ps[g.seat] : null, h = "";
var left = Math.max(0, Math.round(40 - ((g.turn_age || 0) + (Date.now() - GMS.recvAt) / 1000)));
h += "<div style='background:radial-gradient(ellipse at center,#1E7A4E,#0E4A2E);border:6px solid #4A2418;border-radius:90px;padding:14px 10px;text-align:center;margin:6px 0'>" +
"<div style='min-height:66px'>" + ((st.board || []).length ? (st.board || []).map(function (c) { return gmsCard(c, false); }).join("") : "<span style='opacity:.7'>" + (st.street === "waiting" ? "Waiting for players: two or more to deal." : "") + "</span>") + "</div>" +
"<div style='color:#FFE7B0;margin-top:4px'>" + (+st.pot ? "Pot " + (+st.pot).toLocaleString() : "") + (st.rake && st.street === "done" ? " · house " + st.rake : "") + "</div>" +
"<div style='opacity:.9;font-size:12px;margin-top:2px'>" + esc(st.last || "") + "</div></div>";
for (var s = 0; s < 6; s++) {
var x = ps[s];
if (!x || typeof x !== "object")
continue;
var act = +st.to_act === s && st.street !== "done", shown = st.shown && st.shown[String(s)];
h += "<div style='display:flex;align-items:center;gap:6px;padding:4px 6px;margin:2px 0;border-radius:5px;background:" + (act ? "rgba(232,194,122,.18)" : "transparent") + ";opacity:" + (x.folded || x.out ? 0.55 : 1) + "'>" +
"<span style='width:22px'>" + (+st.button === s ? "Ⓓ" : "") + "</span>" +
"<span style='flex:1'>" + (g.seat === s ? "<b>you</b>" : gmsName(x.name)) + (x.folded ? " · folded" : "") + (x.allin ? " · all in" : "") + (x.out && !x.folded && st.street !== "done" ? " · sitting out" : "") + (act ? " · ⏳ " + left + "s" : "") +
(shown ? " · " + shown.cards.map(function (c) { return gmsCard(c, false); }).join("") + " " + esc(shown.hand) : "") + (+x.won > 0 && st.street === "done" ? " · <b style='color:#FFE7B0'>won " + (+x.won).toLocaleString() + "</b>" : "") + "</span>" +
"<span>" + (+x.bet ? "bet " + (+x.bet).toLocaleString() + " · " : "") + (+x.stack).toLocaleString() + "</span></div>";
}
if (me) {
h += "<div style='margin:8px 0 4px'>Your cards: " + (g.hole ? g.hole.map(function (c) { return gmsCard(c, true); }).join("") : "<span style='opacity:.7'>none this hand</span>") + "</div>";
if (gmsMyTurn(g) && st.street !== "done") {
var cur = +st.cur || 0, bet = +me.bet || 0, stack = +me.stack || 0, toCall = Math.max(0, cur - bet), minTo = Math.min(bet + stack, cur + (+st.minr || g.blind * 2)), maxTo = bet + stack;
if (!GMS.raise || GMS.raise < minTo || GMS.raise > maxTo)
GMS.raise = minTo;
h += "<div style='margin:6px 0'>" + gmsBtn("pk", "Fold", " data-a='fold'") + (toCall ? gmsBtn("pk", "Call " + Math.min(toCall, stack).toLocaleString(), " data-a='call'") : gmsBtn("pk", "Check", " data-a='check'"));
if (maxTo > cur) {
h += "<br>" + (cur ? "Raise to" : "Bet") + " <input data-raise type='number' min='" + minTo + "' max='" + maxTo + "' step='" + g.blind + "' value='" + GMS.raise + "' style='width:90px;background:#1A140C;color:inherit;border:1px solid #6A5A3A;border-radius:4px;padding:3px'> " +
gmsBtn("pk", cur ? "Raise" : "Bet", " data-a='" + (cur ? "raise" : "bet") + "'") + gmsBtn("pk", "All in (" + maxTo.toLocaleString() + ")", " data-a='allin'");
if (minTo < maxTo)
h += "<div>" + [0.5, 1].map(function (f) { var v = Math.max(minTo, Math.min(maxTo, cur + Math.round(((+st.pot || 0) + cur + toCall) * f / g.blind) * g.blind)); return gmsBtn("amt", (f === 1 ? "Pot" : "Half pot") + " (" + v.toLocaleString() + ")", " data-v='" + v + "'"); }).join("") + "</div>";
}
h += "</div>";
}
h += "<div style='margin-top:6px'>" + (+me.stack === 0 && (st.street === "done" || st.street === "waiting" || me.out) ? gmsBtn("sit", "Buy back in") : "") + gmsBtn("leave", "Stand up") + "</div>";
}
else if (g.status !== "closed") {
var lb2 = GMS.lb || {};
if (!lb2.signed_in)
h += "<p style='opacity:.8'>Sign in to sit down.</p>";
else if (g.stakes && (!lb2.adult || lb2.keeper))
h += "<p style='opacity:.8'>" + (lb2.keeper ? "The Keeper plays at friendly tables only." : "Playing for chips is for adults. Friendly tables are open to everyone.") + "</p>";
else if (ps.filter(function (x) { return x && typeof x === "object"; }).length < 6) {
if (g.stakes) {
if (!GMS.buyin)
GMS.buyin = g.blind * 200;
h += "<div>Sit down with <input data-buyin type='number' min='" + (g.blind * 40) + "' max='" + (g.blind * 400) + "' step='" + g.blind + "' value='" + GMS.buyin + "' style='width:90px;background:#1A140C;color:inherit;border:1px solid #6A5A3A;border-radius:4px;padding:3px'> chips (you have " + ((+g.chips || 0).toLocaleString()) + ") " + gmsBtn("sit", "Sit down") + "</div>";
}
else
h += gmsBtn("sit", "Sit down with 1,000 play chips");
}
else
h += "<p>The table is full. You may watch.</p>";
}
h += "<div style='opacity:.65;font-size:12px;margin-top:8px'>Texas Hold'em, no limit, blinds " + g.blind + "/" + (g.blind * 2) + ". " + (g.stakes ? "Real casino chips; when you stand up, what is in front of you goes back to your purse." : "Play chips: nothing is won or lost.") + " Act within 40 seconds or you check, or fold.</div>";
return h;
},
function () {
var h = "<div style='display:flex;align-items:center;gap:8px;margin-bottom:8px'>" + (GMS.view === "table" ? gmsBtn("back", "← All games") : "") +
"<b style='font-size:15px;flex:1'>♟️ " + (GMS.view === "table" && GMS.g ? esc(GMS.g.title || "Games") : "Games together") + "</b>" + gmsBtn("x", "Close") + "</div>";
if (GMS.say)
h += "<div style='margin:0 0 8px;padding:5px 8px;border:1px solid rgba(232,194,122,.4);border-radius:4px'>" + esc(GMS.say) + "</div>";
if (GMS.view === "table")
h += GMS.g ? (GMS.g.kind === "poker" ? gmsPokerView() : gmsBoardView()) : "<p>Sitting down…</p>";
else
h += gmsLobbyHtml();
return h;
},
function () {
var el = document.getElementById("gms-box");
if (!GMS.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "gms-box";
el.style.cssText = "position:fixed;z-index:53;left:50%;top:50%;transform:translate(-50%,-50%);width:min(560px,calc(100vw - 32px));max-height:min(88vh,800px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(28,22,14,.97),rgba(10,9,7,.98));border:1px solid #C9A868;border-radius:8px;padding:12px 14px 14px;color:var(--bone,#C9BEA8);" +
"font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", gmsClick);
el.addEventListener("change", gmsChange);
document.body.appendChild(el);
}
var a = document.activeElement;
if (a && el.contains(a) && a.tagName === "INPUT" && el.style.display === "block")
return;
el.innerHTML = gmsHtml();
el.style.display = "block";
},
function (move, pos, end) {
var g = GMS.g;
GMS.sel = -1;
GMS.promo = null;
g.state = Object.assign({}, g.state, { pos: pos, last: move, turn: 1 - g.seat });
gmsCall("game_move", { p_id: g.id, p_ver: g.ver, p_move: move, p_pos: pos, p_end: end || null }, function (o) { if (o && o.stale) {
GMS.ver = 0;
} });
},
function (i) {
var g = GMS.g;
if (!gmsMyTurn(g))
return;
var st = g.state || {}, chess = g.kind === "chess", P = st.pos || (chess ? gchStart() : gdrStart());
if (chess) {
var L = gchLegal(P), hit = L.filter(function (m) { return m.f === GMS.sel && m.t === i; });
if (hit.length) {
if (hit.length > 1) {
GMS.promo = { f: GMS.sel, t: i };
gmsPaint();
return;
}
var Q = gchApply(P, hit[0]);
gmsSend(gchMoveStr(hit[0]), Q, gchEnd(Q));
return;
}
GMS.sel = L.some(function (m) { return m.f === i; }) ? i : -1;
GMS.promo = null;
gmsPaint();
return;
}
var M = gdrMoves(P), hm = M.filter(function (m) { return m.path[0] === GMS.sel && m.path[m.path.length - 1] === i; });
if (hm.length) {
var R = gdrApply(P, hm[0]);
gmsSend(gdrMoveStr(hm[0]), R, gdrMoves(R).length ? null : "win");
return;
}
GMS.sel = M.some(function (m) { return m.path[0] === i; }) ? i : -1;
gmsPaint();
},
function (e) {
var t = e.target.closest && e.target.closest("[data-gms]");
if (!t)
return;
var a = t.getAttribute("data-gms"), id = +t.getAttribute("data-id") || 0, g = GMS.g;
if (a === "x") {
GMS.open = false;
gmsPaint();
return;
}
if (a === "back") {
GMS.view = "lobby";
GMS.id = 0;
GMS.g = null;
GMS.say = "";
gmsPaint();
gmsLobby(true);
return;
}
if (a === "go") {
gmsGo(id);
return;
}
if (a === "sq") {
gmsSquare(+t.getAttribute("data-i"));
return;
}
if (a === "promo" && GMS.promo && g) {
var P = (g.state || {}).pos || gchStart(), p = t.getAttribute("data-p");
var m = gchLegal(P).filter(function (x) { return x.f === GMS.promo.f && x.t === GMS.promo.t && x.p === p; })[0];
if (m) {
var Q = gchApply(P, m);
gmsSend(gchMoveStr(m), Q, gchEnd(Q));
}
return;
}
if (a === "new") {
var k = t.getAttribute("data-k");
gmsCall("game_new", { p_kind: k, p_invite: GMS.inv[k] || null }, function (o) { if (o.ok && o.id)
gmsGo(o.id); });
return;
}
if (a === "pnew") {
var stake = t.getAttribute("data-s") === "1";
gmsCall("poker_new", { p_stakes: stake, p_blind: GMS.blind, p_invite: null }, function (o) { if (o.ok && o.id) {
GMS.buyin = 0;
gmsGo(o.id);
} });
return;
}
if (a === "join") {
gmsCall("game_join", { p_id: id || GMS.id }, function (o) { if (o.ok)
gmsGo(id || GMS.id); });
return;
}
if (!g)
return;
if (a === "resign") {
if (!confirm("Resign this game?"))
return;
gmsCall("game_call", { p_id: g.id, p_act: "resign" });
return;
}
if (a === "draw" || a === "nodraw" || a === "claim" || a === "close") {
gmsCall("game_call", { p_id: g.id, p_act: a });
return;
}
if (a === "sit") {
var bi = document.querySelector("#gms-box [data-buyin]");
if (bi)
GMS.buyin = Math.floor(+bi.value || 0);
gmsCall("poker_sit", { p_id: g.id, p_buyin: g.stakes ? (GMS.buyin || g.blind * 200) : null });
return;
}
if (a === "leave") {
if (!confirm(g.stakes ? "Stand up? Your chips go back to your purse; a hand you are in is folded." : "Stand up from the table?"))
return;
gmsCall("poker_leave", { p_id: g.id });
return;
}
if (a === "amt") {
GMS.raise = +t.getAttribute("data-v");
var ri = document.querySelector("#gms-box [data-raise]");
if (ri)
ri.value = GMS.raise;
return;
}
if (a === "pk") {
var act = t.getAttribute("data-a"), inp = document.querySelector("#gms-box [data-raise]");
if (inp)
GMS.raise = Math.floor(+inp.value || 0);
gmsCall("poker_act", { p_id: g.id, p_act: act, p_amt: (act === "bet" || act === "raise") ? GMS.raise : 0 });
GMS.raise = 0;
return;
}
},
function () {
GMS.open = true;
GMS.say = "";
gmsLobby(true).then(function (lb) {
var p = ((lb || {}).tables || []).filter(function (t) { return t.kind === "poker"; });
var mine = p.filter(function (t) { return t.mine; })[0];
if (mine) {
gmsGo(mine.id);
return;
}
GMS.view = "lobby";
GMS.say = p.length ? "Pick a poker table to sit at, or open your own." : "No poker table is open. Open one, friendly or for chips, and others can sit down.";
gmsPaint();
});
gmsPaint();
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
},
function (G) {
gmsCasBuild0(G);
try {
var felt = wM(0x0E5A3A), wood = wM(0x4A2418), gold = wM(0xC9A868, { e: 0x3A2A08 }), red = wM(0x8A1A2A);
var t = new THREE.Group();
t.position.set(0, 0, -6);
G.add(t);
var rim = wCyl(2.1, 2.1, 0.16, wood, 0, 0.86, 0, t, 28);
rim.scale.z = 0.62;
var top = wCyl(1.92, 1.92, 0.18, felt, 0, 0.9, 0, t, 28);
top.scale.z = 0.58;
wCyl(0.45, 0.7, 0.8, wood, 0, 0.4, 0, t, 12);
for (var s = 0; s < 6; s++) {
var a = s / 6 * Math.PI * 2, sx = Math.cos(a) * 2.55, sz = Math.sin(a) * 1.7;
wCyl(0.26, 0.26, 0.08, red, sx, 0.62, sz, t, 12);
wCyl(0.05, 0.05, 0.6, gold, sx, 0.31, sz, t, 6);
var cd = wBox(0.16, 0.01, 0.22, wM(0xF0E6D2), Math.cos(a) * 1.4, 1.0, Math.sin(a) * 0.85, t);
cd.rotation.y = -a;
}
var sg = wSign(["THE PLAYERS' TABLE", "Hold'em between dreamers"], 3.2, 0.8, "#14080E", "#E8C27A");
sg.position.set(0, 2.9, 0);
t.add(sg);
sg.position.z = 0.04;
var sg2 = sg.clone();
sg2.rotation.y = Math.PI;
sg2.position.z = -0.04;
t.add(sg2);
CAS.solids.push({ x: 0, z: -6, hw: 2.1, hd: 1.25 });
CAS.spots.push({ x: 0, z: -3.9, r: 1.5, name: "The players' table: poker with other dreamers", fn: gmsCasinoTable });
CAS.spots.push({ x: 0, z: -8.1, r: 1.5, name: "The players' table: poker with other dreamers", fn: gmsCasinoTable });
}
catch (e) {
if (window.console)
console.warn("[games] casino table", e);
}
}
];
});
