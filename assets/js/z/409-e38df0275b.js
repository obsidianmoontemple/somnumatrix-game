/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(409, function () {
"use strict";
return [
function (c) {
c = (c && typeof c === "object") ? c : {};
var o = { open: c.open !== false, league: typeof c.league === "string" && c.league.trim() ? c.league.trim().slice(0, 60) : "Somnucor Schools Athletic League",
arena: typeof c.arena === "string" && c.arena.trim() ? c.arena.trim().slice(0, 60) : "The Universal Sports Arena",
fbQ: Math.max(1, Math.min(12, +c.fbQ || 12)), bbQ: Math.max(1, Math.min(8, +c.bbQ || 8)), live: c.live !== false, tickets: c.tickets !== false,
finalX: Math.max(1, Math.min(5, +c.finalX || 2)), studentFree: c.studentFree !== false, coachTalk: c.coachTalk !== false, notes: typeof c.notes === "string" ? c.notes.slice(0, 1200) : "",
prices: {}, caps: {}, schools: [] };
SPT_SECTIONS.forEach(function (s) { var p = c.prices && c.prices[s[0]]; o.prices[s[0]] = s[0] === "student" ? 0 : Math.max(0, Math.min(100000, Math.round(p === undefined || p === null || p === "" ? s[2] : +p || 0))); });
var caps = { student: 4000, upper: 30000, lower: 20000, club: 3000, court: 400 };
SPT_SECTIONS.forEach(function (s) { var v = c.caps && +c.caps[s[0]]; o.caps[s[0]] = v > 0 ? Math.min(100000, Math.round(v)) : caps[s[0]]; });
var given = Array.isArray(c.schools) ? c.schools : [], seen = {};
function hex(v, d) { return /^#[0-9a-f]{6}$/i.test(String(v || "")) ? String(v).toUpperCase() : d; }
function txt(v, d, n) { return typeof v === "string" && v.trim() ? v.trim().slice(0, n || 48) : d; }
SPT_SCHOOLS0.forEach(function (r) {
var g = given.filter(function (x) { return x && x.id === r[0]; })[0] || {};
seen[r[0]] = 1;
o.schools.push({ id: r[0], school: txt(g.school, r[1]), team: txt(g.team, r[2]), mascot: txt(g.mascot, r[3], 24), emblem: SPT_EMBLEMS.some(function (e) { return e[0] === g.emblem; }) ? g.emblem : r[4],
c1: hex(g.c1, r[5]), c2: hex(g.c2, r[6]), c3: hex(g.c3, r[7]), home: txt(g.home, r[8]), rating: Math.max(40, Math.min(99, Math.round(+g.rating || r[9]))),
logo: /^https:\/\/[^\s"'<>]+$/i.test(String(g.logo || "")) ? String(g.logo) : "", on: g.on !== false, campus: r[0] === "city" || r[0] === "commons", partner: txt(g.partner, "", 80) });
});
given.forEach(function (g) {
if (!g || !g.id || seen[g.id] || !/^[a-z][a-z0-9]{1,15}$/.test(g.id) || o.schools.length >= 16)
return;
seen[g.id] = 1;
o.schools.push({ id: g.id, school: txt(g.school, "A partner school"), team: txt(g.team, "Partner Hawks"), mascot: txt(g.mascot, "Hawks", 24), emblem: SPT_EMBLEMS.some(function (e) { return e[0] === g.emblem; }) ? g.emblem : "eagle",
c1: hex(g.c1, "#2A4A8A"), c2: hex(g.c2, "#F0C040"), c3: hex(g.c3, "#FFFFFF"), home: txt(g.home, "a partner campus"), rating: Math.max(40, Math.min(99, Math.round(+g.rating || 68))),
logo: /^https:\/\/[^\s"'<>]+$/i.test(String(g.logo || "")) ? String(g.logo) : "", on: g.on !== false, campus: false, added: true, partner: txt(g.partner, "", 80) });
});
return o;
},
function (sport, year, C) {
C = C || sptMerge(null);
var S = SPT_SPORTS[sport], ids = sptSchoolsOn(C).map(function (s) { return s.id; }), out = [];
if (ids.length < 2)
return out;
var rr = sptRoundRobin(ids), rounds = rr.slice(), dates = [];
if (sport === "fb") {
for (var x = 0; rounds.length < 10 && x < rr.length; x++)
rounds.push(rr[x].map(function (g) { return [g[1], g[0]]; }));
var d = new Date(Date.UTC(year, 7, 31));
while (d.getUTCDay() !== 5)
d.setUTCDate(d.getUTCDate() - 1);
for (var w = 0; w < rounds.length + 2; w++) {
var dd = new Date(d.getTime() + w * 7 * 86400000);
dates.push(sptAZ(dd.getUTCFullYear(), dd.getUTCMonth(), dd.getUTCDate(), S.hour, S.min));
}
}
else {
for (var x2 = 0; rounds.length < 14 && x2 < rr.length * 2; x2++) {
var g0 = rr[x2 % rr.length];
rounds.push(g0.map(function (g) { return [g[1], g[0]]; }));
}
var th = new Date(Date.UTC(year, 10, 1));
var thu = 0;
while (thu < 4) {
if (th.getUTCDay() === 4)
thu++;
if (thu < 4)
th.setUTCDate(th.getUTCDate() + 1);
}
var tgFri = new Date(th.getTime() + 86400000).toISOString().slice(0, 10);
var c = new Date(Date.UTC(year, 10, 15));
while (c.getUTCDay() !== 2)
c.setUTCDate(c.getUTCDate() + 1);
for (var guard = 0; dates.length < rounds.length + 2 && guard < 200; guard++, c.setUTCDate(c.getUTCDate() + 1)) {
var wd = c.getUTCDay(), iso = c.toISOString().slice(0, 10), mo = c.getUTCMonth(), dy = c.getUTCDate();
if (wd !== 2 && wd !== 5)
continue;
if (iso === tgFri)
continue;
if ((mo === 11 && dy >= 19) || (mo === 0 && dy <= 4))
continue;
dates.push(sptAZ(c.getUTCFullYear(), mo, dy, S.hour, S.min));
}
var last = dates[rounds.length - 1];
dates[rounds.length] = last + 7 * 86400000;
dates[rounds.length + 1] = last + 11 * 86400000;
}
var classicDone = false;
rounds.forEach(function (games, ri) {
games.forEach(function (g, gi) {
var cross = !classicDone && ((g[0] === "city" && g[1] === "commons") || (g[0] === "commons" && g[1] === "city"));
if (cross)
classicDone = true;
out.push({ id: sport + year + "-r" + (ri + 1) + "-" + g[0] + "-" + g[1], sport: sport, season: year, round: ri + 1, kick: dates[ri], home: g[0], away: g[1],
venue: cross ? (sport === "fb" ? "arena" : "hall") : (sport === "fb" ? g[0] : g[0] + "-gym"), big: cross, kind: cross ? "classic" : "league", title: cross ? "The Crosstown Classic" : "Week " + (ri + 1) });
});
});
out.push({ id: sport + year + "-semi1", sport: sport, season: year, round: rounds.length + 1, kick: dates[rounds.length], home: "#1", away: "#4", venue: sport === "fb" ? "arena" : "hall", big: true, kind: "semi", title: "Semi-final" });
out.push({ id: sport + year + "-semi2", sport: sport, season: year, round: rounds.length + 1, kick: dates[rounds.length] + (sport === "fb" ? 0 : 2.5 * 3600000), home: "#2", away: "#3", venue: sport === "fb" ? "arena" : "hall", big: true, kind: "semi", title: "Semi-final" });
out.push({ id: sport + year + "-final", sport: sport, season: year, round: rounds.length + 2, kick: dates[rounds.length + 1], home: "W1", away: "W2", venue: sport === "fb" ? "arena" : "hall", big: true, kind: "final", title: sport === "fb" ? "The Somnucor Bowl (championship)" : "The Championship" });
if (sport === "fb") {
out[out.length - 2].kick = dates[rounds.length] + 86400000;
}
return out;
},
function (h, secs) {
if (typeof setStatus === "function")
setStatus(h);
var el = document.getElementById("spt-say");
if (!el) {
el = document.createElement("div");
el.id = "spt-say";
el.style.cssText = "position:fixed;left:50%;top:64px;transform:translateX(-50%);z-index:58;max-width:min(640px,calc(100vw - 24px));padding:6px 12px;border-radius:6px;background:rgba(8,12,22,.82);color:#F4F0E4;font:14px/1.4 var(--sans,system-ui);text-align:center;pointer-events:none;display:none";
document.body.appendChild(el);
}
el.innerHTML = h;
el.style.display = "block";
clearTimeout(SPT.sayT);
SPT.sayT = setTimeout(function () { el.style.display = "none"; }, (secs || 5) * 1000);
},
function (name, body) {
if (sptSigned())
return cityRpc(name, body);
if (typeof DW_CONFIG === "undefined" || !DW_CONFIG.supabaseUrl)
return Promise.reject(new Error("offline"));
return fetch(DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/rest/v1/rpc/" + name, { method: "POST",
headers: { apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + DW_CONFIG.supabaseKey, "Content-Type": "application/json" }, body: JSON.stringify(body || {}) })
.then(function (r) { return r.ok ? r.json() : r.text().then(function (t) { throw new Error(t || "that didn't go through"); }); });
},
function (force) {
if (SPT.busy)
return Promise.resolve(SPT.board);
if (!force && SPT.board && Date.now() - SPT.boardAt < 60000)
return Promise.resolve(SPT.board);
SPT.busy = true;
return sptRpc("sports_board", {}).then(function (B) {
SPT.busy = false;
SPT.board = B && typeof B === "object" ? B : {};
SPT.boardAt = Date.now();
(SPT.board.results || []).forEach(function (r) { SPT.results[r.fixture] = [+r.hs, +r.as]; });
return SPT.board;
}, function () { SPT.busy = false; if (!SPT.board)
SPT.board = {}; SPT.boardAt = Date.now() - 30000; return SPT.board; });
},
function (school, sport, season) {
var key = school + "|" + sport + "|" + season;
SPT.squads = SPT.squads || {};
if (SPT.squads[key] && SPT.squads[key].at === SPT.boardAt)
return SPT.squads[key];
var R = sptRng(sptHash(key)), pos = sport === "fb" ? SPT_FB_POS : SPT_BB_POS, used = {}, list = [];
var mem = ((SPT.board && SPT.board.members) || []).filter(function (m) { return m.sport === sport && m.school === school; });
pos.forEach(function (p, i) {
var nm;
for (var k = 0; k < 20; k++) {
nm = SPT_FIRST[Math.floor(R() * SPT_FIRST.length)] + " " + SPT_LAST[Math.floor(R() * SPT_LAST.length)];
if (!used[nm])
break;
}
used[nm] = 1;
var no = sport === "fb" ? ({ QB: 7, RB: 22, WR: 80 + i, TE: 88, LT: 72, LG: 66, C: 55, RG: 64, RT: 76, DE: 90 + i, DT: 95 + i, LB: 40 + i, CB: 20 + i, S: 30 + i, K: 3 })[p] || (10 + i) : [3, 11, 23, 32, 44, 5, 14, 21, 33, 50][i];
list.push({ name: nm, pos: p, no: no, f: R() < 0.5, dreamer: false });
});
mem.slice(0, list.length).forEach(function (m) {
var at = -1;
list.forEach(function (P, i) { if (at < 0 && !P.dreamer && P.pos === m.pos)
at = i; });
if (at < 0)
list.forEach(function (P, i) { if (at < 0 && !P.dreamer)
at = i; });
if (at >= 0) {
list[at].name = m.name || "A dreamer";
list[at].dreamer = true;
if (m.number)
list[at].no = m.number;
}
});
list.at = SPT.boardAt;
SPT.squads[key] = list;
return list;
},
function (sport, year) {
var C = sptCfg();
year = year || sptSeasonYear(sport);
var key = sport + year + "|" + JSON.stringify(C.schools.map(function (s) { return [s.id, s.on, s.rating]; })) + "|" + C.fbQ + "|" + C.bbQ + "|" + SPT.boardAt;
if (SPT.seasons && SPT.seasons[key])
return SPT.seasons[key];
var F = sptFixtures(sport, year, C), now = Date.now();
var reg = F.filter(function (f) { return f.kind === "league" || f.kind === "classic"; });
var tbl = sptTable(sport, reg, now), regDone = reg.every(function (f) { return sptFinal(f, now); });
F.forEach(function (f) {
if (f.kind === "semi" && regDone && tbl.length >= 4) {
var m = { "#1": 0, "#2": 1, "#3": 2, "#4": 3 };
f.home = tbl[m[f.home]].id;
f.away = tbl[m[f.away]].id;
f.ready = true;
}
else if (f.kind === "league" || f.kind === "classic")
f.ready = true;
});
var semis = F.filter(function (f) { return f.kind === "semi"; }), fin = F.filter(function (f) { return f.kind === "final"; })[0];
if (fin && semis.length === 2 && semis.every(function (s) { return s.ready && sptFinal(s, now); })) {
fin.home = sptWinner(semis[0]);
fin.away = sptWinner(semis[1]);
fin.ready = true;
}
SPT.seasons = SPT.seasons || {};
SPT.seasons[key] = F;
return F;
},
function (sport, reg, now) {
var C = sptCfg(), T = {};
sptSchoolsOn(C).forEach(function (s) { T[s.id] = { id: s.id, w: 0, l: 0, t: 0, pf: 0, pa: 0, gp: 0 }; });
reg.forEach(function (f) {
var s = sptFinal(f, now);
if (!s || !T[f.home] || !T[f.away])
return;
var H = T[f.home], A = T[f.away];
H.gp++;
A.gp++;
H.pf += s[0];
H.pa += s[1];
A.pf += s[1];
A.pa += s[0];
if (s[0] > s[1]) {
H.w++;
A.l++;
}
else if (s[1] > s[0]) {
A.w++;
H.l++;
}
else {
H.t++;
A.t++;
}
});
return Object.keys(T).map(function (k) { return T[k]; }).sort(function (a, b) {
var pa = (a.w + a.t / 2) / Math.max(1, a.gp), pb = (b.w + b.t / 2) / Math.max(1, b.gp);
return pb - pa || ((b.pf - b.pa) - (a.pf - a.pa)) || b.pf - a.pf || (a.id < b.id ? -1 : 1);
});
},
function (venue, now) {
now = now || Date.now();
var best = null;
["fb", "bb"].forEach(function (sp) {
[sptSeasonYear(sp, now), sptSeasonYear(sp, now) - 1].forEach(function (y) {
sptSeason(sp, y).forEach(function (f) {
if (f.venue !== venue || !f.ready)
return;
var S = sptSim(f);
if (!S)
return;
var end = f.kick + S.end * 1000;
if (now >= f.kick - 3600000 && now < end + 900000) {
if (!best || f.kick < best.kick)
best = f;
}
});
});
});
return best;
},
function (filter, n) {
var now = Date.now(), out = [];
["fb", "bb"].forEach(function (sp) { sptSeason(sp).forEach(function (f) { var S = f.ready ? sptSim(f) : null, end = S ? f.kick + S.end * 1000 : f.kick + 7200000; if (end > now && (!filter || filter(f)))
out.push(f); }); });
return out.sort(function (a, b) { return a.kick - b.kick; }).slice(0, n || 8);
},
function (f) {
if (!f || !f.ready)
return null;
var C = sptCfg();
var key = f.id + "|" + f.home + "|" + f.away + "|" + (f.sport === "fb" ? C.fbQ : C.bbQ);
if (SPT.sims[key])
return SPT.sims[key];
var H = sptSchool(f.home), A = sptSchool(f.away);
if (!H || !A)
return null;
var S = f.sport === "fb" ? sptSimFb(f, H.rating, A.rating, C.fbQ) : sptSimBb(f, H.rating, A.rating, C.bbQ);
SPT.sims[key] = S;
return S;
},
function (f, rh, ra, qm) {
var R = sptRng(sptHash("fb|" + f.id + "|" + f.home + "|" + f.away)), B = function (m, s) { return sptBell(R, m, s); }, ev = [], sc = [0, 0], t = 0, q = 1, clk = qm * 60, Q = qm * 60, ot = 0;
var rat = { h: rh + 3, a: ra };
var first = R() < 0.5 ? "h" : "a", off, spot, down, togo, running = false;
function other(s) { return s === "h" ? "a" : "h"; }
function add(o) { o.t = Math.round(t); o.q = q; o.clk = Math.max(0, Math.round(clk)); o.sc = sc.slice(); ev.push(o); return o; }
function kickoff(kicker, from) {
var rec = other(kicker);
from = from || 40;
running = false;
var tb = from === 40 && R() < 0.3, ret = tb ? 20 : Math.max(5, Math.min(55, Math.round(B(27, 7) + (rat[rec] - rat[kicker]) * 0.1))), td = !tb && R() < 0.012;
off = rec;
down = 1;
togo = 10;
spot = td ? 100 : ret;
add({ k: "ko", off: kicker, d: td ? 14 : 8, spot: from, to: 100 - spot, tb: tb, ret: td ? "td" : ret });
t += 8 + (td ? 6 : 0);
if (!td) {
t += 24;
}
else {
score(rec, 6, true);
}
}
function score(side, pts, td) {
sc[side === "h" ? 0 : 1] += pts;
if (td) {
var e = add({ k: "try", off: side, d: 5 });
var two = q >= 4 && (sc[side === "h" ? 0 : 1] - sc[side === "h" ? 1 : 0] === -2 || sc[side === "h" ? 0 : 1] - sc[side === "h" ? 1 : 0] === -1) && !ot;
var good = two ? R() < 0.45 + (rat[side] - rat[other(side)]) * 0.004 : R() < 0.94;
e.two = two;
e.good = good;
if (good)
sc[side === "h" ? 0 : 1] += two ? 2 : 1;
e.sc = sc.slice();
t += 30;
if (!ot)
kickoff(side);
}
}
function periodEnd() {
if (ot)
return false;
if (clk > 0)
return false;
add({ k: "end", off: off, d: 0, spot: spot });
if (q === 2) {
t += 900;
q = 3;
clk = Q;
kickoff(first);
return true;
}
if (q < 4) {
t += 120;
q++;
clk = Q;
return true;
}
return true;
}
kickoff(first);
var guard = 0;
while (guard++ < 900) {
if (q > 4 && !ot)
break;
if (!ot && clk <= 0) {
if (q === 4) {
add({ k: "end", off: off, d: 0, spot: spot });
break;
}
periodEnd();
continue;
}
var lead = sc[off === "h" ? 0 : 1] - sc[off === "h" ? 1 : 0], late = q === 4 && clk < 180, gap = running ? (late && lead > 0 ? 38 : late && lead < 0 ? 14 : B(31, 4)) : B(22, 4);
gap = Math.max(8, Math.min(39, gap));
t += gap;
if (running && !ot) {
clk -= gap;
if (clk <= 0) {
clk = 0;
continue;
}
}
var o = off, d = other(o), diff = (rat[o] - rat[d]);
var fgDist = 100 - spot + 17;
if (down === 4) {
var trail = lead < 0 && q === 4 && clk < 300;
if (fgDist <= 50 && togo > 1 && !(trail && lead < -3)) {
var pFg = Math.max(0.15, Math.min(0.97, 1.04 - (fgDist - 17) * 0.019 + diff * 0.002)), good = R() < pFg;
add({ k: "fg", off: o, d: 5, spot: spot, dist: fgDist, good: good });
t += 5;
clk -= ot ? 0 : 5;
running = false;
if (good) {
sc[o === "h" ? 0 : 1] += 3;
ev[ev.length - 1].sc = sc.slice();
t += 30;
if (!ot)
kickoff(o);
else {
if (otNext())
break;
}
}
else {
if (ot) {
if (otNext())
break;
}
else {
off = d;
spot = Math.max(20, 100 - spot);
down = 1;
togo = 10;
}
}
continue;
}
if (!(togo <= 2 && spot >= 40) && !trail && !ot) {
var net = Math.round(B(37, 6)), land = spot + net, tb = land >= 100;
add({ k: "punt", off: o, d: 7, spot: spot, net: tb ? 100 - spot - 20 : net, tb: tb });
t += 7;
clk -= 7;
running = false;
off = d;
spot = tb ? 20 : Math.max(1, 100 - land);
down = 1;
togo = 10;
continue;
}
}
var passP = (togo >= 7 ? 0.62 : togo <= 2 ? 0.28 : 0.45) + (late && lead < 0 ? 0.3 : 0) - (late && lead > 0 ? 0.35 : 0), isPass = R() < passP, e, gain = 0, stop = false, turn = false;
var who = isPass ? ["WR", "WR", "WR", "TE", "RB"][Math.floor(R() * 5)] : (R() < 0.8 ? "RB" : "QB"), whoN = who === "WR" ? Math.floor(R() * 3) : 0;
if (late && lead > 0 && clk <= 40 * Math.max(0, 4 - down) && !ot) {
add({ k: "kneel", off: o, d: 3, spot: spot, gain: -1, down: down, togo: togo });
t += 3;
clk -= 3;
spot -= 1;
running = true;
down++;
togo++;
if (down > 4) {
off = d;
spot = 100 - spot;
down = 1;
togo = 10;
running = false;
}
continue;
}
if (isPass) {
var rSack = R(), rInt = R(), rComp = R();
if (rSack < 0.065 - diff * 0.001) {
gain = -Math.max(2, Math.round(B(7, 2)));
e = add({ k: "sack", off: o, d: 5, spot: spot, gain: gain, down: down, togo: togo, who: "QB" });
running = true;
}
else if (rInt < 0.03 - diff * 0.0006) {
var back = Math.round(B(10, 8));
e = add({ k: "int", off: o, d: 7, spot: spot, air: Math.round(B(14, 6)), ret: back, down: down, togo: togo, who: who, whoN: whoN });
turn = true;
stop = true;
var at = Math.min(99, spot + e.air);
spot = Math.max(1, Math.min(100, 100 - at + back));
}
else if (rComp < 0.58 + diff * 0.004) {
gain = Math.max(0, Math.round(B(10, 6)));
if (R() < 0.07)
gain += Math.round(15 + R() * 30);
var oob = R() < (late && lead < 0 ? 0.6 : 0.22);
e = add({ k: "pass", off: o, d: 6, spot: spot, gain: gain, down: down, togo: togo, who: who, whoN: whoN, oob: oob });
running = !oob;
}
else {
e = add({ k: "inc", off: o, d: 5, spot: spot, gain: 0, down: down, togo: togo, who: who, whoN: whoN });
running = false;
}
}
else {
gain = Math.round(B(4.2 + diff * 0.06, 4));
if (gain < -4)
gain = -4;
if (R() < 0.045)
gain += Math.round(12 + R() * 30);
var oob2 = R() < 0.12;
e = add({ k: "run", off: o, d: 5, spot: spot, gain: gain, down: down, togo: togo, who: who, oob: oob2 });
running = !oob2;
}
t += e.d;
if (!ot)
clk -= e.d;
if (turn) {
off = d;
down = 1;
togo = 10;
running = false;
if (ot) {
if (otNext())
break;
}
continue;
}
if ((e.k === "run" || e.k === "pass") && R() < 0.012) {
e.fum = true;
spot = Math.max(1, Math.min(99, spot + gain));
off = d;
spot = 100 - spot;
down = 1;
togo = 10;
running = false;
if (ot) {
if (otNext())
break;
}
continue;
}
spot += gain;
if (spot >= 100) {
e.td = true;
running = false;
sc[o === "h" ? 0 : 1] += 6;
e.sc = sc.slice();
var ex = add({ k: "try", off: o, d: 5 });
var tw = q >= 4 && !ot && (lead + 6 === -1 || lead + 6 === -2) || (ot && ot > 2);
var gd = tw ? R() < 0.45 + diff * 0.004 : R() < 0.94;
ex.two = tw;
ex.good = gd;
if (gd)
sc[o === "h" ? 0 : 1] += tw ? 2 : 1;
ex.sc = sc.slice();
t += 35;
if (ot) {
if (otNext())
break;
}
else
kickoff(o);
continue;
}
if (spot <= 0) {
e.safety = true;
running = false;
sc[d === "h" ? 0 : 1] += 2;
e.sc = sc.slice();
t += 30;
kickoff(o, 20);
continue;
}
if (gain >= togo) {
down = 1;
togo = Math.min(10, 100 - spot);
e.first = true;
}
else {
down++;
togo -= gain;
if (down > 4) {
e.downs = true;
off = d;
spot = 100 - spot;
down = 1;
togo = 10;
running = false;
if (ot) {
if (otNext())
break;
}
}
}
}
function otNext() {
otTurn++;
if (otTurn % 2 === 0 && sc[0] !== sc[1])
return true;
if (otTurn >= 16 && sc[0] !== sc[1])
return true;
if (otTurn >= 20) {
sc[R() < 0.5 ? 0 : 1] += 3;
add({ k: "fg", off: off, d: 5, spot: 83, dist: 24, good: true });
return true;
}
off = otTurn % 2 === 0 ? otFirst : other(otFirst);
spot = 90;
down = 1;
togo = 10;
t += otTurn % 2 === 0 ? 180 : 25;
if (otTurn % 2 === 0)
q++;
return false;
}
var otTurn = 0, otFirst = "a";
if (sc[0] === sc[1]) {
t += 180;
q = 5;
ot = 1;
otFirst = R() < 0.5 ? "h" : "a";
off = otFirst;
spot = 90;
down = 1;
togo = 10;
otTurn = 0;
clk = 0;
var g2 = 0;
while (g2++ < 400) {
t += B(22, 3);
var o2 = off, d2 = other(o2), df = rat[o2] - rat[d2];
if (down === 4) {
var fd = 100 - spot + 17;
var gF = R() < Math.max(0.3, 1.04 - (fd - 17) * 0.019);
add({ k: "fg", off: o2, d: 5, spot: spot, dist: fd, good: gF });
t += 5;
if (gF) {
sc[o2 === "h" ? 0 : 1] += 3;
ev[ev.length - 1].sc = sc.slice();
}
if (otNext())
break;
continue;
}
var ps = R() < 0.5, gn = ps ? (R() < 0.55 ? Math.max(0, Math.round(B(8, 5))) : 0) : Math.round(B(3.5 + df * 0.05, 3.5));
var e2 = add({ k: ps ? (gn > 0 ? "pass" : "inc") : "run", off: o2, d: 5, spot: spot, gain: gn, down: down, togo: togo, who: ps ? "WR" : "RB", whoN: 0 });
t += 5;
spot += gn;
if (spot >= 100) {
e2.td = true;
sc[o2 === "h" ? 0 : 1] += 6;
e2.sc = sc.slice();
var x2 = add({ k: "try", off: o2, d: 5 });
var gd2 = R() < 0.92;
x2.good = gd2;
if (gd2)
sc[o2 === "h" ? 0 : 1] += 1;
x2.sc = sc.slice();
t += 30;
if (otNext())
break;
continue;
}
if (gn >= togo) {
down = 1;
togo = 100 - spot;
e2.first = true;
}
else {
down++;
togo -= gn;
if (down > 4) {
e2.downs = true;
if (otNext())
break;
}
}
}
add({ k: "end", off: off, d: 0, spot: spot });
}
t += 60;
return { ev: ev, sc: sc, end: Math.round(t), ot: ot ? q - 4 : 0 };
},
function (f, rh, ra, qm) {
var R = sptRng(sptHash("bb|" + f.id + "|" + f.home + "|" + f.away)), B = function (m, s) { return sptBell(R, m, s); }, ev = [], sc = [0, 0], t = 0, q = 1, Q = qm * 60, clk = Q, tf = [0, 0];
var rat = { h: rh + 2, a: ra }, off = R() < 0.5 ? "h" : "a", arrow = off === "h" ? "a" : "h";
function other(s) { return s === "h" ? "a" : "h"; }
function add(o) { o.t = Math.round(t); o.q = q; o.clk = Math.max(0, Math.round(clk)); o.sc = sc.slice(); ev.push(o); return o; }
add({ k: "tip", off: off, d: 3 });
t += 3;
clk -= 3;
var guard = 0;
while (guard++ < 2000) {
if (clk <= 0) {
add({ k: "end", off: off, d: 0 });
if (q >= 4 && sc[0] !== sc[1])
break;
if (q === 2) {
t += 600;
}
else
t += q >= 4 ? 60 : 60;
q++;
clk = q > 4 ? 4 * 60 : Q;
tf = [0, 0];
if (q > 4) {
off = R() < 0.5 ? "h" : "a";
add({ k: "tip", off: off, d: 3 });
t += 3;
clk -= 3;
}
else {
off = arrow;
arrow = other(arrow);
}
if (q > 12)
break;
continue;
}
var o = off, d = other(o), diff = rat[o] - rat[d], lead = sc[o === "h" ? 0 : 1] - sc[o === "h" ? 1 : 0];
var len = Math.max(4, Math.min(34, B(15, 5)));
if (q >= 4 && clk < 60 && lead > 0)
len = Math.min(34, clk);
if (q >= 4 && clk < 60 && lead < 0)
len = Math.min(len, 7);
if (len > clk)
len = clk;
var who = Math.floor(R() * 5), r = R(), e;
if (R() < 0.035) {
add({ k: "to", off: o, d: 0 });
t += 60;
}
if (r < 0.14 - diff * 0.002) {
e = add({ k: "tov", off: o, d: len, who: who });
t += len;
clk -= len;
if (R() < 0.4) {
t += 8;
}
off = d;
continue;
}
var three = R() < 0.36, fouled = R() < 0.11, pct = (three ? 0.33 : 0.47) + diff * 0.004, made = R() < pct;
if (R() < 0.06 && !fouled) {
tf[d === "h" ? 0 : 1]++;
var bonus = tf[d === "h" ? 0 : 1] >= 5;
e = add({ k: "foul", off: o, d: len * 0.6, who: who, bonus: bonus });
t += len * 0.6 + 12;
clk -= len * 0.6;
if (bonus) {
var m1 = R() < 0.68, m2 = R() < 0.68;
e.ft = [m1, m2];
sc[o === "h" ? 0 : 1] += (m1 ? 1 : 0) + (m2 ? 1 : 0);
e.sc = sc.slice();
t += 20;
off = d;
}
continue;
}
var pts = made ? (three ? 3 : 2) : 0;
e = add({ k: made ? "make" : "miss", off: o, d: len, who: who, three: three, pts: pts });
t += len;
clk -= len;
if (fouled) {
tf[d === "h" ? 0 : 1]++;
var n = made ? 1 : (three ? 3 : 2), fts = [];
for (var i = 0; i < n; i++)
fts.push(R() < 0.68);
e.foul = true;
e.ft = fts;
pts += fts.filter(Boolean).length;
t += 14 + n * 8;
}
sc[o === "h" ? 0 : 1] += pts;
e.sc = sc.slice();
if (made || fouled) {
off = d;
continue;
}
var orb = R() < 0.28 + diff * 0.003;
e.reb = orb ? "o" : "d";
e.rebWho = Math.floor(R() * 5);
if (!orb)
off = d;
}
t += 30;
return { ev: ev, sc: sc, end: Math.round(t), ot: Math.max(0, q - 4) };
},
function (f, e) {
var H = sptSchool(f.home), A = sptSchool(f.away), O = e.off === "h" ? H : A, D = e.off === "h" ? A : H, sq = sptSquad(O.id, f.sport, f.season);
var nm = function (p, n) { return sptPN(sptP(sq, p, n)); };
var downs = ["", "1st", "2nd", "3rd", "4th"], yd = function (v, side) { v = Math.round(v); return v === 50 ? "midfield" : v < 50 ? (side || "their") + " own " + v : "the " + (side ? O : D).mascot + " " + (100 - v); }, dd = e.down ? downs[e.down] + " and " + (e.togo >= 100 - e.spot ? "goal" : e.togo) + " on " + yd(e.spot) + ". " : "";
if (f.sport === "fb")
switch (e.k) {
case "ko": return O.mascot + " kick off from the " + e.spot + "." + (e.tb ? " Into the end zone: a touchback." : e.ret === "td" ? " Returned all the way for a TOUCHDOWN!" : " Returned to " + (e.ret < 50 ? "the " + D.mascot + " own " + e.ret : "the " + O.mascot + " " + (100 - e.ret)) + ".");
case "run": return dd + nm(e.who === "QB" ? "QB" : "RB") + (e.gain >= 0 ? " runs for " + e.gain : " is stopped for a loss of " + (-e.gain)) + (e.td ? ": TOUCHDOWN " + O.mascot + "!" : e.safety ? " in the end zone: SAFETY!" : e.fum ? ". Fumble! " + D.mascot + " recover." : e.first ? ". First down." : e.downs ? ". Turnover on downs." : e.oob ? ", out of bounds." : ".");
case "pass": return dd + nm("QB") + " to " + nm(e.who, e.whoN) + " for " + e.gain + (e.td ? ": TOUCHDOWN " + O.mascot + "!" : e.fum ? ". Fumble! " + D.mascot + " recover." : e.first ? ". First down." : e.downs ? ". Turnover on downs." : e.oob ? ", out of bounds." : ".");
case "inc": return dd + nm("QB") + "'s pass for " + nm(e.who, e.whoN) + " falls incomplete" + (e.downs ? ". Turnover on downs." : ".");
case "sack": return dd + nm("QB") + " is sacked for a loss of " + (-e.gain) + (e.safety ? " in the end zone: SAFETY!" : e.downs ? ". Turnover on downs." : ".");
case "int": return dd + nm("QB") + "'s pass is INTERCEPTED by " + D.mascot + "!";
case "punt": return O.mascot + " punt" + (e.tb ? ": into the end zone, a touchback." : ", " + e.net + " yards net.");
case "fg": return O.mascot + " try a " + e.dist + "-yard field goal: " + (e.good ? "IT'S GOOD! Three points." : "no good.");
case "try": return e.two ? "Going for two: " + (e.good ? "GOOD! Two points." : "stopped short.") : "The kick after: " + (e.good ? "good." : "no good!");
case "kneel": return nm("QB") + " takes a knee.";
case "end": return e.q > 4 ? "That's the game!" : e.q === 2 ? "Half time." : e.q === 4 ? "That's the game!" : "End of the " + ["", "first", "second", "third", "fourth"][e.q] + " quarter.";
}
var p = sptPN(sq[e.who || 0]);
switch (e.k) {
case "tip": return "The tip-off: " + O.mascot + " have it.";
case "make": return p + (e.three ? " hits a THREE!" : " scores two.") + (e.foul ? " And one! " + e.ft.filter(Boolean).length + " of " + e.ft.length + " from the line." : "");
case "miss": return p + (e.three ? " misses from three" : " misses") + (e.foul ? ", but was fouled: " + e.ft.filter(Boolean).length + " of " + e.ft.length + " from the line." : e.reb === "o" ? ". Offensive rebound!" : ". " + D.mascot + " rebound.");
case "tov": return p + " turns it over. " + D.mascot + " ball.";
case "foul": return "A foul on " + D.mascot + (e.bonus ? ": the bonus. " + p + " makes " + e.ft.filter(Boolean).length + " of 2." : ".");
case "to": return O.mascot + " call a time-out.";
case "end": return e.q >= 4 ? "Final buzzer!" : e.q === 2 ? "Half time." : "End of the " + ["", "first", "second", "third"][e.q] + " quarter.";
}
return "";
},
function (col, tex, o) {
o = o || {};
var k = col + "|" + (tex || "") + "|" + JSON.stringify(o);
if (SPT.mats[k])
return SPT.mats[k];
var m = o.phong && !SPT.lite ? new THREE.MeshPhongMaterial({ color: col, shininess: o.phong, specular: o.spec || 0x333333 }) : new THREE.MeshLambertMaterial({ color: col });
if (tex && typeof texOf === "function") {
var t = texOf(tex);
if (t)
m.map = t;
}
if (o.e !== undefined) {
m.emissive = new THREE.Color(o.e);
m.emissiveIntensity = o.ei || 1;
}
if (o.op !== undefined) {
m.transparent = true;
m.opacity = o.op;
m.depthWrite = false;
}
if (o.ds)
m.side = THREE.DoubleSide;
SPT.mats[k] = m;
return m;
},
function (key, w, h, draw, o) {
o = o || {};
var k = "cv|" + key;
if (SPT.mats[k])
return SPT.mats[k];
if (SPT.lite && !o.full) {
w = Math.max(64, w >> 1);
h = Math.max(64, h >> 1);
}
var t = new THREE.CanvasTexture(sptCanvas(w, h, draw));
if (t.anisotropy !== undefined)
t.anisotropy = 4;
var m = o.basic ? new THREE.MeshBasicMaterial({ map: t, transparent: !!o.op, side: o.ds ? THREE.DoubleSide : THREE.FrontSide }) : new THREE.MeshLambertMaterial({ map: t, side: o.ds ? THREE.DoubleSide : THREE.FrontSide });
SPT.mats[k] = m;
return m;
},
function (T, x, z) {
var lx = Math.abs(x - T.cx), lz = Math.abs(z - T.cz), e;
if (T.only === "s" && z < T.cz || T.only === "n" && z > T.cz)
return -1;
if (T.side === "z") {
if (T.len && lx > T.len / 2)
return -1;
e = lz - T.iz;
}
else
e = Math.max(lx - T.ix, lz - T.iz);
if (e < 0 || e >= T.out)
return -1;
for (var i = 0; i < T.gaps.length; i++) {
var G = T.gaps[i];
if (G[0] === "x" && Math.abs(x - T.cx - G[1]) < G[2] && lz > T.iz - 1)
return -1;
if (G[0] === "z" && Math.abs(z - T.cz - G[1]) < G[2] && lx > T.ix - 1)
return -1;
}
return e;
},
function (x, z, feet) {
var K = SPT.K;
if (!K)
return 0;
var best = 0;
for (var i = 0; i < K.tiers.length; i++) {
var T = K.tiers[i], e = sptTierE(T, x, z);
if (e < 0)
continue;
var y = T.y0 + (Math.floor(e / T.dep) + 1) * T.rise;
if (y > best && (feet === undefined || feet === null || y <= feet + 0.75 || y <= best + 0.75))
best = y;
}
for (var j = 0; j < K.floors.length; j++) {
var F = K.floors[j];
if (x >= F.x0 && x <= F.x1 && z >= F.z0 && z <= F.z1 && F.y > best && (feet === undefined || feet === null || F.y <= feet + 0.75))
best = F.y;
}
return best;
},
function (x, z, feet) {
var K = SPT.K;
if (!K)
return false;
if (Math.abs(x) > 1400 || z < -700 || z > 1300)
return true;
for (var i = 0; i < K.solids.length; i++) {
var s = K.solids[i];
if (feet > s.b + s.h - 0.3 || feet + 1.7 < s.b)
continue;
if (Math.abs(x - s.x) < s.hw + 0.35 && Math.abs(z - s.z) < s.hd + 0.35)
return true;
}
for (var g = 0; g < K.gates.length; g++) {
var G = K.gates[g];
if (Math.abs(x - G.x) < G.hw && Math.abs(z - G.z) < G.hd && G.shut && G.shut())
return true;
}
return false;
},
function (dir, a, b, c, y, h, t, mat, opens) {
opens = (opens || []).slice().sort(function (p, q) { return p.at - q.at; });
var lo = Math.min(a, b), hi = Math.max(a, b), cur = lo;
function seg(s0, s1, y0, y1, solid) {
if (s1 - s0 < 0.02 || y1 - y0 < 0.02)
return;
var mid = (s0 + s1) / 2, len = s1 - s0, hh = y1 - y0;
if (dir === "x")
sptBox(len, hh, t, mat, mid, y0 + hh / 2, c);
else
sptBox(t, hh, len, mat, c, y0 + hh / 2, mid);
if (solid) {
if (dir === "x")
sptSolid(mid, c, len / 2, t / 2, hh, y0);
else
sptSolid(c, mid, t / 2, len / 2, hh, y0);
}
}
opens.forEach(function (O) { var s0 = Math.max(lo, O.at - O.w / 2), s1 = Math.min(hi, O.at + O.w / 2), top = Math.min(h, O.h || 3.2); seg(cur, s0, y, y + h, true); seg(s0, s1, y + top, y + h, false); cur = s1; });
seg(cur, hi, y, y + h, true);
},
function (x, S, size, cx, cy) {
var r = size / 2;
x.save();
x.translate(cx, cy);
x.fillStyle = S.c1;
x.beginPath();
x.arc(0, 0, r, 0, Math.PI * 2);
x.fill();
x.lineWidth = r * 0.1;
x.strokeStyle = S.c2;
x.beginPath();
x.arc(0, 0, r * 0.93, 0, Math.PI * 2);
x.stroke();
x.lineWidth = r * 0.03;
x.strokeStyle = S.c3;
x.beginPath();
x.arc(0, 0, r * 0.83, 0, Math.PI * 2);
x.stroke();
var c2 = S.c2, c3 = S.c3, s = r * 0.62;
x.fillStyle = c2;
x.strokeStyle = c3;
x.lineWidth = r * 0.035;
x.lineJoin = "round";
function poly(pts, fill) { x.beginPath(); pts.forEach(function (p, i) { if (i)
x.lineTo(p[0] * s, p[1] * s);
else
x.moveTo(p[0] * s, p[1] * s); }); x.closePath(); x.fillStyle = fill || c2; x.fill(); x.stroke(); }
function dot(px, py, pr, fill) { x.beginPath(); x.arc(px * s, py * s, pr * s, 0, Math.PI * 2); x.fillStyle = fill; x.fill(); }
switch (S.emblem) {
case "owl":
poly([[-0.75, -0.75], [-0.35, -0.45], [0.35, -0.45], [0.75, -0.75], [0.7, 0.2], [0.4, 0.75], [0, 0.9], [-0.4, 0.75], [-0.7, 0.2]]);
dot(-0.32, -0.08, 0.27, c3);
dot(0.32, -0.08, 0.27, c3);
dot(-0.32, -0.08, 0.13, S.c1);
dot(0.32, -0.08, 0.13, S.c1);
poly([[-0.1, 0.15], [0.1, 0.15], [0, 0.4]], c3);
break;
case "fox":
poly([[-0.85, -0.85], [-0.3, -0.4], [0.3, -0.4], [0.85, -0.85], [0.7, 0.0], [0.0, 0.9], [-0.7, 0.0]]);
poly([[-0.45, 0.1], [0, 0.9], [0.45, 0.1], [0, 0.3]], c3);
dot(-0.3, -0.08, 0.09, S.c1);
dot(0.3, -0.08, 0.09, S.c1);
dot(0, 0.78, 0.1, S.c1);
break;
case "stag":
poly([[-0.35, -0.2], [0.35, -0.2], [0.3, 0.4], [0, 0.85], [-0.3, 0.4]]);
[-1, 1].forEach(function (k) { x.beginPath(); x.moveTo(k * 0.2 * s, -0.2 * s); x.lineTo(k * 0.55 * s, -0.75 * s); x.lineTo(k * 0.9 * s, -0.9 * s); x.moveTo(k * 0.42 * s, -0.55 * s); x.lineTo(k * 0.8 * s, -0.45 * s); x.moveTo(k * 0.5 * s, -0.68 * s); x.lineTo(k * 0.45 * s, -0.98 * s); x.lineWidth = r * 0.09; x.strokeStyle = c2; x.stroke(); });
dot(-0.15, 0.1, 0.07, S.c1);
dot(0.15, 0.1, 0.07, S.c1);
break;
case "comet":
dot(0.35, -0.3, 0.32, c2);
x.beginPath();
x.moveTo(0.15 * s, -0.55 * s);
x.quadraticCurveTo(-0.4 * s, 0.0, -0.9 * s, 0.75 * s);
x.quadraticCurveTo(-0.1 * s, 0.15 * s, 0.6 * s, -0.1 * s);
x.closePath();
x.fillStyle = c3;
x.fill();
dot(0.35, -0.3, 0.18, c3);
break;
case "lion":
for (var i = 0; i < 14; i++) {
var a = i / 14 * Math.PI * 2;
poly([[Math.cos(a) * 0.5, Math.sin(a) * 0.5], [Math.cos(a + 0.22) * 0.95, Math.sin(a + 0.22) * 0.95], [Math.cos(a + 0.45) * 0.5, Math.sin(a + 0.45) * 0.5]], c2);
}
dot(0, 0.05, 0.55, c3);
dot(-0.2, -0.08, 0.07, S.c1);
dot(0.2, -0.08, 0.07, S.c1);
poly([[-0.12, 0.15], [0.12, 0.15], [0, 0.3]], S.c1);
break;
case "bear":
dot(-0.55, -0.55, 0.25, c2);
dot(0.55, -0.55, 0.25, c2);
dot(0, 0.05, 0.75, c2);
dot(0, 0.35, 0.32, c3);
dot(-0.28, -0.12, 0.08, S.c1);
dot(0.28, -0.12, 0.08, S.c1);
dot(0, 0.25, 0.1, S.c1);
break;
case "anchor":
x.lineWidth = r * 0.12;
x.strokeStyle = c2;
x.beginPath();
x.moveTo(0, -0.65 * s);
x.lineTo(0, 0.8 * s);
x.moveTo(-0.45 * s, -0.35 * s);
x.lineTo(0.45 * s, -0.35 * s);
x.stroke();
x.beginPath();
x.arc(0, 0.25 * s, 0.6 * s, 0.15, Math.PI - 0.15);
x.stroke();
x.lineWidth = r * 0.07;
x.beginPath();
x.arc(0, -0.8 * s, 0.15 * s, 0, Math.PI * 2);
x.stroke();
break;
case "wolf":
poly([[-0.8, -0.9], [-0.3, -0.35], [0.3, -0.35], [0.8, -0.9], [0.75, 0.05], [0.3, 0.55], [0, 0.95], [-0.3, 0.55], [-0.75, 0.05]]);
poly([[-0.55, -0.2], [-0.12, -0.05], [-0.45, 0.05]], c3);
poly([[0.55, -0.2], [0.12, -0.05], [0.45, 0.05]], c3);
dot(0, 0.82, 0.1, S.c1);
break;
case "eagle":
poly([[-0.95, -0.3], [-0.3, -0.1], [-0.15, -0.6], [0.2, -0.65], [0.45, -0.45], [0.25, -0.3], [0.3, -0.1], [0.95, -0.3], [0.55, 0.25], [0.2, 0.3], [0.15, 0.8], [-0.15, 0.8], [-0.2, 0.3], [-0.55, 0.25]]);
dot(0.12, -0.48, 0.06, S.c1);
break;
case "star":
var P = [];
for (var j = 0; j < 10; j++) {
var b = -Math.PI / 2 + j * Math.PI / 5, rr = j % 2 ? 0.42 : 0.95;
P.push([Math.cos(b) * rr, Math.sin(b) * rr]);
}
poly(P);
break;
case "shield":
poly([[-0.7, -0.8], [0.7, -0.8], [0.7, 0.1], [0, 0.9], [-0.7, 0.1]]);
poly([[-0.1, -0.8], [0.1, -0.8], [0.1, 0.75], [-0.1, 0.75]], c3);
break;
case "bolt":
poly([[0.2, -0.95], [-0.5, 0.1], [-0.05, 0.1], [-0.25, 0.95], [0.5, -0.15], [0.05, -0.15]]);
break;
case "crown":
poly([[-0.8, 0.5], [-0.8, -0.35], [-0.4, 0.05], [0, -0.6], [0.4, 0.05], [0.8, -0.35], [0.8, 0.5]]);
dot(0, -0.6, 0.1, c3);
dot(-0.8, -0.35, 0.08, c3);
dot(0.8, -0.35, 0.08, c3);
break;
default:
x.beginPath();
x.arc(0.15 * s, 0, 0.8 * s, Math.PI * 0.35, Math.PI * 1.65);
x.arc(0.45 * s, 0, 0.6 * s, Math.PI * 1.55, Math.PI * 0.45, true);
x.closePath();
x.fillStyle = c2;
x.fill();
}
x.restore();
},
function (S) {
if (!S.logo)
return null;
var L = SPT.logos = SPT.logos || {};
if (L[S.logo])
return L[S.logo].ok ? L[S.logo].img : null;
var im = new Image();
im.crossOrigin = "anonymous";
L[S.logo] = { img: im, ok: false };
im.onload = function () { L[S.logo].ok = true; SPT.relogo = true; };
im.onerror = function () { };
im.src = S.logo;
return null;
},
function (S) {
return sptCanvasMat("field-" + S.id + "-" + S.c1 + S.c2 + S.emblem + (S.logo && SPT.logos && SPT.logos[S.logo] && SPT.logos[S.logo].ok ? "L" : ""), 2048, 912, function (x, W, H) {
var yd = W / 120;
for (var i = 0; i < 24; i++) {
x.fillStyle = i % 2 ? "#3E7A32" : "#47863A";
x.fillRect(i * 5 * yd, 0, 5 * yd, H);
}
x.fillStyle = S.c1;
x.fillRect(0, 0, 10 * yd, H);
x.fillRect(110 * yd, 0, 10 * yd, H);
x.save();
x.fillStyle = S.c2;
x.font = "bold " + Math.round(H * 0.13) + "px Georgia";
x.textAlign = "center";
x.textBaseline = "middle";
x.translate(5 * yd, H / 2);
x.rotate(-Math.PI / 2);
x.fillText(S.mascot.toUpperCase(), 0, 0);
x.restore();
x.save();
x.fillStyle = S.c2;
x.font = "bold " + Math.round(H * 0.13) + "px Georgia";
x.textAlign = "center";
x.textBaseline = "middle";
x.translate(115 * yd, H / 2);
x.rotate(Math.PI / 2);
x.fillText(S.mascot.toUpperCase(), 0, 0);
x.restore();
x.strokeStyle = "#F4F4F0";
x.fillStyle = "#F4F4F0";
x.lineWidth = Math.max(2, yd * 0.12);
x.strokeRect(1, 1, W - 2, H - 2);
for (var y = 10; y <= 110; y += 5) {
x.beginPath();
x.moveTo(y * yd, 0);
x.lineTo(y * yd, H);
x.lineWidth = y === 10 || y === 110 ? yd * 0.22 : yd * 0.12;
x.stroke();
}
var hz = H * (53.333 / 160);
x.lineWidth = yd * 0.1;
for (var k = 11; k < 110; k++) {
if (k % 5 === 0)
continue;
[[0, yd * 0.66], [hz - yd * 0.33, hz + yd * 0.33], [H - hz - yd * 0.33, H - hz + yd * 0.33], [H - yd * 0.66, H]].forEach(function (p) { x.beginPath(); x.moveTo(k * yd, p[0]); x.lineTo(k * yd, p[1]); x.stroke(); });
}
x.font = "bold " + Math.round(yd * 2) + "px Georgia";
x.textAlign = "center";
x.textBaseline = "middle";
for (var n = 20; n <= 100; n += 10) {
var v = n <= 60 ? n - 10 : 110 - n;
[H * 0.15, H * 0.85].forEach(function (yy, ii) { x.save(); x.translate(n * yd, yy); if (ii === 0)
x.rotate(Math.PI); x.fillText(String(v), 0, 0); x.restore(); });
}
sptBadge(x, S, H * 0.34, W / 2, H / 2);
}, { full: true });
},
function (S, big) {
var L = big ? 94 : 84;
return sptCanvasMat("court-" + S.id + "-" + S.c1 + S.c2 + S.emblem + (big ? "b" : "") + (S.logo && SPT.logos && SPT.logos[S.logo] && SPT.logos[S.logo].ok ? "L" : ""), 1680, 1000, function (x, W, H) {
var ft = W / L;
x.fillStyle = "#C8945A";
x.fillRect(0, 0, W, H);
for (var i = 0; i < H; i += ft * 0.25) {
x.fillStyle = "rgba(" + (i / ft * 37 % 30 | 0) + ",0,0," + (0.04 + ((i * 7) % 5) * 0.012) + ")";
x.fillRect(0, i, W, ft * 0.25);
}
x.strokeStyle = "#F8F4EC";
x.lineWidth = ft * 0.17;
x.strokeRect(ft * 0.1, ft * 0.1, W - ft * 0.2, H - ft * 0.2);
x.beginPath();
x.moveTo(W / 2, 0);
x.lineTo(W / 2, H);
x.stroke();
x.beginPath();
x.arc(W / 2, H / 2, 6 * ft, 0, Math.PI * 2);
x.fillStyle = S.c1;
x.fill();
x.stroke();
[0, 1].forEach(function (side) {
var sx = side ? W : 0, dir = side ? -1 : 1, hx = sx + dir * (4 + 0.75) * ft;
x.fillStyle = S.c1;
x.fillRect(Math.min(sx, sx + dir * 19 * ft), H / 2 - 6 * ft, 19 * ft, 12 * ft);
x.strokeRect(Math.min(sx, sx + dir * 19 * ft), H / 2 - 6 * ft, 19 * ft, 12 * ft);
x.beginPath();
x.arc(sx + dir * 19 * ft, H / 2, 6 * ft, side ? Math.PI / 2 : -Math.PI / 2, side ? Math.PI * 1.5 : Math.PI / 2);
x.stroke();
var r = (19 + 9 / 12) * ft, a = Math.asin(Math.min(1, (H / 2 - 3 * ft) / r));
x.beginPath();
x.arc(hx, H / 2, r, side ? Math.PI - a : -a, side ? Math.PI + a : a, false);
x.stroke();
x.beginPath();
x.moveTo(sx, H / 2 - r * Math.sin(a));
x.lineTo(hx + dir * r * Math.cos(a), H / 2 - r * Math.sin(a));
x.moveTo(sx, H / 2 + r * Math.sin(a));
x.lineTo(hx + dir * r * Math.cos(a), H / 2 + r * Math.sin(a));
x.stroke();
x.save();
x.translate(sx + dir * 1.6 * ft, H / 2);
x.rotate(side ? Math.PI / 2 : -Math.PI / 2);
x.fillStyle = S.c2;
x.font = "bold " + Math.round(ft * 1.8) + "px Georgia";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillText(S.school.toUpperCase(), 0, -ft * 2.2);
x.restore();
});
sptBadge(x, S, 10 * ft, W / 2, H / 2);
x.fillStyle = S.c1;
x.font = "bold " + Math.round(ft * 2.6) + "px Georgia";
x.textAlign = "center";
x.fillText(S.team.toUpperCase(), W * 0.27, H * 0.93);
x.fillText(S.team.toUpperCase(), W * 0.73, H * 0.93);
}, { full: true });
},
function (w, h, x, y, z, ry, venue, parent) {
var cv = document.createElement("canvas");
cv.width = 512;
cv.height = 256;
var t = new THREE.CanvasTexture(cv);
var m = new THREE.MeshBasicMaterial({ map: t }), p = sptPlane(w, h, m, x, y, z, ry, parent);
var back = sptBox(w + 0.4, h + 0.4, 0.3, sptMat(0x1A1C22), 0, 0, -0.2, p);
var B = { cv: cv, t: t, mesh: p, venue: venue, last: "" };
SPT.K.boards.push(B);
sptBoardPaint(B, null);
return B;
},
function (B, st) {
var key = JSON.stringify(st || 0);
if (key === B.last)
return;
B.last = key;
var x = B.cv.getContext("2d"), W = 512, H = 256;
x.fillStyle = "#0A0C12";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#3A3F4A";
x.lineWidth = 4;
x.strokeRect(4, 4, W - 8, H - 8);
var V = SPT.K && SPT.K.venues[B.venue], S = V && V.school ? sptSchool(V.school) : null;
if (!st) {
x.fillStyle = "#F0C040";
x.font = "bold 34px Georgia";
x.textAlign = "center";
x.fillText(S ? S.school : sptCfg().arena, W / 2, 70);
x.fillStyle = "#E8ECF4";
x.font = "26px Georgia";
x.fillText(S ? "Home of the " + S.team : "Home of the big games", W / 2, 118);
var nx = sptNext(function (f) { return f.venue === B.venue; }, 1)[0];
if (nx) {
var hS = sptSchool(nx.home), aS = sptSchool(nx.away);
x.fillStyle = "#9FD0FF";
x.font = "22px Georgia";
x.fillText("Next: " + SPT_SPORTS[nx.sport].name + (nx.ready ? ", " + aS.mascot + " at " + hS.mascot : ", " + nx.title), W / 2, 170);
x.fillText(sptWhen(nx.kick), W / 2, 204);
}
B.t.needsUpdate = true;
return;
}
x.textAlign = "center";
x.fillStyle = "#E8ECF4";
x.font = "bold 26px Georgia";
x.fillText(st.hn, W * 0.22, 46);
x.fillText(st.an, W * 0.78, 46);
x.fillStyle = "#FF4A3A";
x.font = "bold 96px monospace";
x.fillText(String(st.hs), W * 0.22, 140);
x.fillText(String(st.as), W * 0.78, 140);
x.fillStyle = "#F0C040";
x.font = "bold 56px monospace";
x.fillText(st.clock, W / 2, 104);
x.fillStyle = "#E8ECF4";
x.font = "bold 24px Georgia";
x.fillText(st.q, W / 2, 140);
x.fillStyle = "#9FD0FF";
x.font = "22px Georgia";
x.fillText(st.line || "", W / 2, 200);
if (st.poss) {
x.fillStyle = "#F0C040";
x.beginPath();
x.arc(st.poss === "h" ? W * 0.22 : W * 0.78, 168, 8, 0, Math.PI * 2);
x.fill();
}
if (st.extra) {
x.fillStyle = "#C8CCD8";
x.font = "20px Georgia";
x.fillText(st.extra, W / 2, 236);
}
B.t.needsUpdate = true;
},
function (G) {
var K = SPT.K;
var grass = sptMat(0x5A8A42, "grass"), path = sptMat(0x948C80, "paving");
sptFlat(3000, 2200, grass, 0, -0.12, 300);
sptFlat(18, 560, path, 150, 0.01, -10);
sptFlat(1300, 14, path, 0, 0.01, 40);
sptBowl();
sptHall();
sptPlaza();
sptCfg().schools.forEach(function (S, i) { if (!S.on)
return; var A = sptCampusAt(i); var n = A.z - SPT_FW / 2 - 12 - 40; sptFlat(10, n, path, A.x, 0.012, 40 + n / 2); var w = A.z + 100 - 40; sptFlat(8, w, path, A.x - 66, 0.012, 40 + w / 2); sptFlat(66, 8, path, A.x - 33, 0.012, A.z + 100); sptStadium(S, A.x, A.z); sptGym(S, A.x, A.z + 125); });
},
function (T, mats) {
var lite = SPT.lite;
for (var r = 0; r < T.rows; r++) {
var h = T.y0 + (r + 1) * T.rise, e0 = r * T.dep, m = mats[r % mats.length];
var sides = (T.side === "z" ? ["s", "n"] : ["s", "n", "e", "w"]).filter(function (sd) { return !T.only || sd === T.only; });
sides.forEach(function (sd) {
var long = sd === "s" || sd === "n", half = long ? (T.len ? T.len / 2 : T.ix + e0 + T.dep) : (T.iz + e0 + T.dep), off = (long ? T.iz : T.ix) + e0 + T.dep / 2, sg = sd === "s" || sd === "e" ? 1 : -1;
var gaps = T.gaps.filter(function (G) { return long ? G[0] === "x" : G[0] === "z"; }).map(function (G) { return [G[1] - G[2], G[1] + G[2]]; }).sort(function (a, b) { return a[0] - b[0]; });
var cur = -half;
gaps.concat([[half, half]]).forEach(function (g) {
var a = cur, b = Math.min(half, g[0]);
if (b - a > 0.2) {
var mid = (a + b) / 2;
if (long)
sptBox(b - a, h - T.y0 + 0.02, T.dep, m, T.cx + mid, T.y0 + (h - T.y0) / 2, T.cz + sg * off);
else
sptBox(T.dep, h - T.y0 + 0.02, b - a, m, T.cx + sg * off, T.y0 + (h - T.y0) / 2, T.cz + mid);
if (!lite && r % 2 === 0) {
var seat = SPT.seatMat || (SPT.seatMat = sptMat(0x2A3A5A));
if (long)
sptBox(b - a, 0.08, 0.4, seat, T.cx + mid, h + 0.04, T.cz + sg * (off + T.dep * 0.15));
else
sptBox(0.4, 0.08, b - a, seat, T.cx + sg * (off + T.dep * 0.15), h + 0.04, T.cz + mid);
}
}
cur = Math.max(cur, g[1]);
});
});
}
},
function (cx, cz, col) {
var m = sptMat(col || 0xF0D040, null, { phong: 40 }), half = SPT_FL / 2, w = 7.11 / 2;
[-1, 1].forEach(function (s) {
var x = cx + s * (half + 0.6);
sptCyl(0.12, 3.05, m, x, 1.52, cz, null, 8);
sptBox(0.14, 0.14, w * 2, m, x, 3.05, cz);
sptCyl(0.06, 6, m, x, 6.05, cz - w, null, 6);
sptCyl(0.06, 6, m, x, 6.05, cz + w, null, 6);
sptCyl(0.45, 1.8, sptMat(0x2A4A8A), x, 0.9, cz, null, 10);
sptSolid(x, cz, 0.45, 0.45, 3);
});
},
function () {
var A = SPT_ARENA.bowl, C = sptCfg(), neutral = { id: "arena", school: "arena", c1: "#1A2A4A", c2: "#F0C040", c3: "#FFFFFF", emblem: "star", mascot: "Somnucor", team: "Universal Sports Arena", school_: "" };
neutral.school = "The Universal Sports Arena";
var F = sptFieldMat(Object.assign({}, neutral, { mascot: "SOMNUCOR", id: "arena-bowl" }));
sptFlat(160, 104, sptMat(0x9A4A34), A.x, 0.005, A.z);
sptFlat(SPT_FL + 8, SPT_FW + 8, sptMat(0x47863A, "grass"), A.x, 0.012, A.z);
sptFlat(SPT_FL, SPT_FW, F, A.x, 0.02, A.z);
sptPosts(A.x, A.z);
var lo = sptTier({ cx: A.x, cz: A.z, ix: 66, iz: 40, rows: 20, dep: 0.85, rise: 0.42, gaps: [["x", 0, 3], ["z", 0, 3]] });
sptRows(lo, [sptMat(0x5A6A82, "concrete"), sptMat(0x52627A, "concrete")]);
var cy = lo.rows * lo.rise, e1 = lo.out;
[[A.x, A.z - (lo.iz + e1 + 2.5), 2 * (lo.ix + e1 + 5), 5], [A.x, A.z + (lo.iz + e1 + 2.5), 2 * (lo.ix + e1 + 5), 5], [A.x - (lo.ix + e1 + 2.5), A.z, 5, 2 * (lo.iz + e1)], [A.x + (lo.ix + e1 + 2.5), A.z, 5, 2 * (lo.iz + e1)]].forEach(function (c) {
sptBox(c[2], cy, c[3], sptMat(0x6A7080, "concrete"), c[0], cy / 2, c[1]);
SPT.K.floors.push({ x0: c[0] - c[2] / 2, x1: c[0] + c[2] / 2, z0: c[1] - c[3] / 2, z1: c[1] + c[3] / 2, y: cy });
});
var up = sptTier({ cx: A.x, cz: A.z, ix: lo.ix + e1 + 5, iz: lo.iz + e1 + 5, rows: 18, dep: 0.85, rise: 0.55, y0: cy, gaps: [["x", 0, 3], ["z", 0, 3]] });
sptRows(up, [sptMat(0x3A4A6A, "concrete"), sptMat(0x34445E, "concrete")]);
var ox = up.ix + up.out + 0.6, oz = up.iz + up.out + 0.6, top = cy + up.rows * up.rise + 3, wall = sptMat(0xC8C0B0, "concrete");
sptWall("x", A.x - ox, A.x + ox, A.z - oz, 0, top, 1.2, wall, [{ at: A.x, w: 6, h: 4.2 }]);
sptWall("x", A.x - ox, A.x + ox, A.z + oz, 0, top, 1.2, wall, [{ at: A.x, w: 6, h: 4.2 }]);
sptWall("z", A.z - oz, A.z + oz, A.x - ox, 0, top, 1.2, wall, [{ at: A.z, w: 6, h: 4.2 }]);
sptWall("z", A.z - oz, A.z + oz, A.x + ox, 0, top, 1.2, wall, [{ at: A.z, w: 6, h: 4.2 }]);
[[0, -1], [0, 1], [-1, 0], [1, 0]].forEach(function (d) {
var len = oz - lo.iz + 1;
if (d[0] === 0) {
var zm = A.z + d[1] * (lo.iz + len / 2);
sptSolid(A.x - 3.3, zm, 0.3, len / 2, 6);
sptSolid(A.x + 3.3, zm, 0.3, len / 2, 6);
sptBox(0.6, 6, len, wall, A.x - 3.3, 3, zm);
sptBox(0.6, 6, len, wall, A.x + 3.3, 3, zm);
sptBox(7.2, 0.6, len, wall, A.x, 6.3, zm);
}
else {
var lx = ox - lo.ix + 1, xm = A.x + d[0] * (lo.ix + lx / 2);
sptSolid(xm, A.z - 3.3, lx / 2, 0.3, 6);
sptSolid(xm, A.z + 3.3, lx / 2, 0.3, 6);
sptBox(lx, 6, 0.6, wall, xm, 3, A.z - 3.3);
sptBox(lx, 6, 0.6, wall, xm, 3, A.z + 3.3);
sptBox(lx, 0.6, 7.2, wall, xm, 6.3, A.z);
}
SPT.K.gates.push({ x: A.x + d[0] * ox, z: A.z + d[1] * oz, hw: d[0] ? 1.4 : 3.2, hd: d[0] ? 3.2 : 1.4, shut: function () { return sptGateShut("arena"); } });
});
var rm = sptMat(0xD8DCE2, "metalroof", { ds: true });
sptBox(2 * ox, 0.6, 16, rm, A.x, top + 4, A.z - oz + 8);
sptBox(2 * ox, 0.6, 16, rm, A.x, top + 4, A.z + oz - 8);
sptBox(16, 0.6, 2 * oz - 32, rm, A.x - ox + 8, top + 4, A.z);
sptBox(16, 0.6, 2 * oz - 32, rm, A.x + ox - 8, top + 4, A.z);
for (var i = -3; i <= 3; i++) {
sptBox(6, 0.5, 0.6, sptBasic(0xFFF6DC), A.x + i * 24, top + 3.6, A.z - oz + 16.5);
sptBox(6, 0.5, 0.6, sptBasic(0xFFF6DC), A.x + i * 24, top + 3.6, A.z + oz - 16.5);
}
sptBoard(26, 13, A.x - lo.ix - e1 - 2, cy + 12, A.z, Math.PI / 2, "arena");
sptBoard(26, 13, A.x + lo.ix + e1 + 2, cy + 12, A.z, -Math.PI / 2, "arena");
var nm = C.arena.toUpperCase();
[[0, -1, Math.PI], [1, 0, Math.PI / 2], [-1, 0, -Math.PI / 2], [0, 1, 0]].forEach(function (d) {
var s = typeof wSign === "function" ? wSign([nm, "Football · Basketball · Every sport"], 30, 5, "#1A2A4A", "#F0C040") : null;
if (s) {
s.position.set(A.x + d[0] * (ox + 0.7), top - 3, A.z + d[1] * (oz + 0.7));
s.rotation.y = d[2];
sptPar().add(s);
}
});
sptVenue("arena", { kind: "stadium", sport: "fb", cx: A.x, cz: A.z, school: null, name: C.arena, ox: ox, oz: oz, lo: lo, up: up });
sptArea(A.x - ox, A.z - oz, A.x + ox, A.z + oz, "The stadium bowl", "arena");
sptArea(A.x - SPT_FL / 2, A.z - SPT_FW / 2, A.x + SPT_FL / 2, A.z + SPT_FW / 2, "The field", "arena");
},
function () {
var A = SPT_ARENA.hall, C = sptCfg(), neutral = { id: "arena-hall", school: C.arena, team: "Universal Sports Arena", mascot: "Somnucor", c1: "#1A2A4A", c2: "#F0C040", c3: "#FFFFFF", emblem: "star" };
var T = sptTier({ cx: A.x, cz: A.z, ix: SPT_CL / 2 + 4, iz: SPT_CW / 2 + 4, rows: 26, dep: 0.8, rise: 0.45, gaps: [["z", 0, 2.6]] });
var ox = T.ix + T.out + 0.5, oz = T.iz + T.out + 0.5, H = T.rows * T.rise + 9, wall = sptMat(0xB8C0CC, "concrete");
sptFlat(2 * ox, 2 * oz, sptMat(0x8A6A4A, "wood"), A.x, 0.03, A.z);
sptFlat(SPT_CL + 0.02, SPT_CW + 0.02, sptCourtMat(neutral, true), A.x, 0.07, A.z);
sptHoops(A.x, A.z);
sptRows(T, [sptMat(0x7A1E2A), sptMat(0x6A1A26)]);
sptWall("x", A.x - ox, A.x + ox, A.z - oz, 0, H, 1, wall);
sptWall("x", A.x - ox, A.x + ox, A.z + oz, 0, H, 1, wall);
sptWall("z", A.z - oz, A.z + oz, A.x - ox, 0, H, 1, wall, [{ at: A.z, w: 5.2, h: 4 }]);
sptWall("z", A.z - oz, A.z + oz, A.x + ox, 0, H, 1, wall, [{ at: A.z, w: 5.2, h: 4 }]);
sptBox(2 * ox, 0.6, 2 * oz, sptMat(0x2A2E36, "metalroof", { ds: true }), A.x, H, A.z);
[-1, 1].forEach(function (s) {
var len = ox - T.ix + 1, xm = A.x + s * (T.ix + len / 2);
sptSolid(xm, A.z - 2.9, len / 2, 0.3, 5);
sptSolid(xm, A.z + 2.9, len / 2, 0.3, 5);
sptBox(len, 5, 0.6, wall, xm, 2.5, A.z - 2.9);
sptBox(len, 5, 0.6, wall, xm, 2.5, A.z + 2.9);
sptBox(len, 0.5, 6.4, wall, xm, 5.2, A.z);
SPT.K.gates.push({ x: A.x + s * ox, z: A.z, hw: 1.4, hd: 2.8, shut: function () { return sptGateShut("hall"); } });
});
var cube = sptGroup(A.x, 14, A.z);
sptBox(8.4, 4.6, 8.4, sptMat(0x1A1C22), 0, 0, 0, cube);
for (var i = 0; i < 4; i++) {
var a = i * Math.PI / 2;
sptBoard(8, 4.2, Math.sin(a) * 4.25, 0, Math.cos(a) * 4.25, a, "hall", cube);
}
for (var lx = -2; lx <= 2; lx++)
for (var lz = -1; lz <= 1; lz++)
sptBox(3, 0.3, 1.2, sptBasic(0xFFF6E4), A.x + lx * 14, H - 0.6, A.z + lz * 14);
if (typeof wSign === "function") {
var s = wSign(["THE ARENA HALL", C.arena], 18, 4, "#1A2A4A", "#F0C040");
s.position.set(A.x - ox - 0.6, H - 3, A.z);
s.rotation.y = -Math.PI / 2;
sptPar().add(s);
}
sptVenue("hall", { kind: "gym", sport: "bb", cx: A.x, cz: A.z, school: null, name: "The Arena Hall", ox: ox, oz: oz, tier: T });
sptArea(A.x - ox, A.z - oz, A.x + ox, A.z + oz, "The Arena Hall", "hall");
sptArea(A.x - SPT_CL / 2, A.z - SPT_CW / 2, A.x + SPT_CL / 2, A.z + SPT_CW / 2, "The court", "hall");
},
function (cx, cz) {
var rim = sptMat(0xE86A1A, null, { phong: 60 }), glass = sptMat(0xE8F0F8, null, { op: 0.55 }), pole = sptMat(0x2A2E36, "metal");
[-1, 1].forEach(function (s) {
var bx = cx + s * (SPT_CL / 2 - 1.22), hx = cx + s * SPT_HOOP;
sptBox(0.05, 1.07, 1.83, glass, bx, 3.05 + 0.15 + 0.535 - 0.15, cz);
sptBox(0.06, 0.46, 0.61, sptMat(0xF4F4F4), bx - s * 0.01, 3.32, cz);
var t = new THREE.Mesh(new THREE.TorusGeometry(0.2286, 0.012, 6, 20), rim);
t.rotation.x = Math.PI / 2;
t.position.set(hx, 3.05, cz);
sptPar().add(t);
var net = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.14, 0.42, 12, 1, true), sptMat(0xF4F4F4, null, { op: 0.6, ds: true }));
net.position.set(hx, 2.83, cz);
sptPar().add(net);
sptBox(Math.abs(bx - hx), 0.04, 0.1, rim, (bx + hx) / 2, 3.05, cz);
sptBox(1.4, 0.12, 0.12, pole, bx + s * 0.7, 3.4, cz);
sptCyl(0.14, 3.6, pole, cx + s * (SPT_CL / 2 + 1.4), 1.8, cz, null, 8);
sptBox(1.2, 0.9, 1.2, sptMat(0x1A2A4A), cx + s * (SPT_CL / 2 + 1.4), 0.45, cz);
sptSolid(cx + s * (SPT_CL / 2 + 1.4), cz, 0.6, 0.6, 3.6);
});
},
function () {
var P = SPT_ARENA.plaza, C = sptCfg(), stone = sptMat(0x8E8880, "paving");
sptFlat(120, 110, stone, P.x, 0.015, P.z);
var bx = P.x, bz = P.z + 36;
sptBox(12, 3.6, 5, sptMat(0x1A2A4A), bx, 1.8, bz);
sptSolid(bx, bz, 6, 2.5, 3.6);
sptBox(12.6, 0.4, 6, sptMat(0xF0C040), bx, 3.8, bz);
for (var i = -2; i <= 2; i++)
sptBox(1.6, 1.1, 0.06, sptMat(0xBFE0F0, null, { op: 0.4 }), bx + i * 2.3, 1.9, bz - 2.53);
if (typeof wSign === "function") {
var s = wSign(["BOX OFFICE", "Tickets for the big games"], 8, 1.6, "#1A2A4A", "#F0C040");
s.position.set(bx, 4.9, bz - 2.6);
s.rotation.y = Math.PI;
sptPar().add(s);
}
sptSpot(bx, bz - 4, 3.6, "The box office", "buy a ticket for a big game", function () { sptBoxOffice(); });
var lb = sptPlane(14, 7, sptLeagueMat(), P.x - 40, 4.5, P.z - 10, Math.PI / 2);
sptBox(0.4, 8, 15, sptMat(0x2A2E36), P.x - 40.3, 4, P.z - 10);
sptSolid(P.x - 40.3, P.z - 10, 0.4, 7.5, 8);
SPT.K.league = lb;
sptSpot(P.x - 37, P.z - 10, 4, "The league board", "see the table and the fixtures", function () { sptLeagueCard(); });
var hx = P.x + 38, hz = P.z - 24, hm = sptMat(0xE8E0D0, "marble");
sptFlat(18, 14, sptMat(0x8A2A2A), hx, 0.03, hz);
sptWall("x", hx - 9, hx + 9, hz - 7, 0, 5, 0.4, hm);
sptWall("x", hx - 9, hx + 9, hz + 7, 0, 5, 0.4, hm, [{ at: hx, w: 3, h: 3.2 }]);
sptWall("z", hz - 7, hz + 7, hx - 9, 0, 5, 0.4, hm);
sptWall("z", hz - 7, hz + 7, hx + 9, 0, 5, 0.4, hm);
sptBox(18.6, 0.4, 14.6, sptMat(0xF0C040), hx, 5.2, hz);
sptPlane(14, 3.8, sptFameMat(), hx, 2.6, hz - 6.75, 0);
if (typeof wSign === "function") {
var s2 = wSign(["HALL OF FAME", "The champions of the league"], 8, 1.6, "#5A1A1A", "#F0C040");
s2.position.set(hx, 4.2, hz + 7.25);
sptPar().add(s2);
}
sptSpot(hx, hz - 3, 4.5, "The Hall of Fame", "read the champions", function () { sptFameCard(); });
sptArea(hx - 9, hz - 7, hx + 9, hz + 7, "The Hall of Fame", "plaza");
sptArea(P.x - 60, P.z - 55, P.x + 60, P.z + 55, "The plaza", "plaza");
if (typeof wSign === "function") {
var s3 = wSign(["CAMPUS ROW  ↓", "Every school's own stadium and gym"], 8, 1.6, "#2A3A2A", "#F4ECD8");
s3.position.set(P.x + 9.5, 2.6, P.z + 70);
s3.rotation.y = Math.PI;
sptPar().add(s3);
sptCyl(0.1, 2, sptMat(0x5A5A5A), P.x + 9.5, 1, P.z + 70);
}
},
function () {
var L = SPT.leagueCv;
if (!L)
return;
var C = sptCfg(), fb = sptTable("fb", sptSeason("fb").filter(function (f) { return f.kind === "league" || f.kind === "classic"; })), bb = sptTable("bb", sptSeason("bb").filter(function (f) { return f.kind === "league" || f.kind === "classic"; }));
var key = JSON.stringify([fb, bb]);
if (key === L.last)
return;
L.last = key;
var x = L.cv.getContext("2d"), W = 1024, H = 512;
x.fillStyle = "#101828";
x.fillRect(0, 0, W, H);
x.fillStyle = "#F0C040";
x.font = "bold 40px Georgia";
x.textAlign = "center";
x.fillText(C.league, W / 2, 52);
[[fb, "🏈 FOOTBALL " + sptSeasonYear("fb"), 40], [bb, "🏀 BASKETBALL " + sptSeasonYear("bb") + "-" + String(sptSeasonYear("bb") + 1).slice(2), 532]].forEach(function (p) {
x.textAlign = "left";
x.fillStyle = "#9FD0FF";
x.font = "bold 26px Georgia";
x.fillText(p[1], p[2], 100);
p[0].slice(0, 10).forEach(function (r, i) {
var S = sptSchool(r.id);
x.fillStyle = S.c1;
x.fillRect(p[2], 118 + i * 36, 26, 26);
x.fillStyle = "#E8ECF4";
x.font = "22px Georgia";
x.fillText((i + 1) + ". " + S.team, p[2] + 36, 138 + i * 36);
x.textAlign = "right";
x.fillText(r.w + "-" + r.l + (r.t ? "-" + r.t : ""), p[2] + 440, 138 + i * 36);
x.textAlign = "left";
});
});
L.t.needsUpdate = true;
},
function () {
return sptCanvasMat("fame", 1024, 280, function (x, W, H) {
x.fillStyle = "#2A1A12";
x.fillRect(0, 0, W, H);
x.strokeStyle = "#C89A3A";
x.lineWidth = 8;
x.strokeRect(8, 8, W - 16, H - 16);
x.fillStyle = "#F0C040";
x.font = "bold 40px Georgia";
x.textAlign = "center";
x.fillText("CHAMPIONS OF THE LEAGUE", W / 2, 60);
var rows = sptChampions().slice(0, 4);
x.font = "26px Georgia";
x.fillStyle = "#F4ECD8";
if (!rows.length)
x.fillText("The first champions are still to be crowned.", W / 2, 150);
rows.forEach(function (r, i) { x.fillText(r, W / 2, 110 + i * 40); });
}, { full: true });
},
function () {
var out = [], now = Date.now();
["fb", "bb"].forEach(function (sp) {
for (var y = sptSeasonYear(sp); y >= sptSeasonYear(sp) - 3; y--) {
var fin = sptSeason(sp, y).filter(function (f) { return f.kind === "final"; })[0];
if (fin && fin.ready && sptFinal(fin, now)) {
var w = sptWinner(fin), s = sptFinal(fin);
out.push(SPT_SPORTS[sp].icon + " " + (sp === "fb" ? y : y + "-" + String(y + 1).slice(2)) + ": " + sptSchool(w).team + " (" + Math.max(s[0], s[1]) + "-" + Math.min(s[0], s[1]) + ")");
}
}
});
return out;
},
function (S, cx, cz) {
sptFlat(SPT_FL + 14, SPT_FW + 14, sptMat(0x3E7034, "grass"), cx, 0.008, cz);
sptFlat(SPT_FL, SPT_FW, sptFieldMat(S), cx, 0.02, cz);
sptPosts(cx, cz, 0xF0D040);
var home = sptTier({ cx: cx, cz: cz, ix: 0, iz: SPT_FW / 2 + 6, rows: 12, dep: 0.85, rise: 0.45, side: "z", only: "s", len: 80, gaps: [["x", -20, 1], ["x", 20, 1]] });
var c1 = new THREE.Color(S.c1).getHex(), c2 = new THREE.Color(S.c2).getHex();
sptRows(home, [sptMat(c1), sptMat(0x8A9098, "metal")]);
var top = home.rows * home.rise;
sptBox(24, 3.2, 4, sptMat(c1), cx, top + 1.6 + 3, cz + home.iz + home.out + 1.5);
sptBox(22, 1.4, 0.1, sptMat(0xBFE0F0, null, { op: 0.4 }), cx, top + 5, cz + home.iz + home.out - 0.52);
sptCyl(0.2, top + 3, sptMat(0x5A5A5A), cx - 11, (top + 3) / 2, cz + home.iz + home.out + 3, null, 6);
sptCyl(0.2, top + 3, sptMat(0x5A5A5A), cx + 11, (top + 3) / 2, cz + home.iz + home.out + 3, null, 6);
if (typeof wSign === "function") {
var s = wSign([S.team.toUpperCase(), S.school], 18, 2.6, S.c1, S.c2);
s.position.set(cx, top + 7.6, cz + home.iz + home.out - 0.1);
s.rotation.y = Math.PI;
sptPar().add(s);
}
sptSolid(cx, cz + home.iz + home.out + 0.6, 40, 0.4, top + 1.5);
var away = sptTier({ cx: cx, cz: cz, ix: 0, iz: SPT_FW / 2 + 6, rows: 8, dep: 0.85, rise: 0.45, side: "z", only: "n", len: 60, gaps: [["x", 0, 1]] });
sptRows(away, [sptMat(0x8A9098, "metal"), sptMat(0x7A8088, "metal")]);
sptLightTower(cx - 45, cz - 38, 22);
sptLightTower(cx + 45, cz - 38, 22);
sptLightTower(cx - 45, cz + home.iz + home.out + 4, 24);
sptLightTower(cx + 45, cz + home.iz + home.out + 4, 24);
sptBoard(12, 6, cx + SPT_FL / 2 + 10, 8, cz, -Math.PI / 2, S.id);
sptCyl(0.3, 5, sptMat(0x5A5A5A), cx + SPT_FL / 2 + 10.3, 2.5, cz, null, 8);
sptSolid(cx + SPT_FL / 2 + 10.3, cz, 0.4, 0.4, 5);
sptVenue(S.id, { kind: "stadium", sport: "fb", cx: cx, cz: cz, school: S.id, name: S.school + " stadium" });
sptArea(cx - 70, cz - 50, cx + 70, cz + home.iz + home.out + 4, S.school + ": the stadium of the " + S.team, S.id);
sptCoach(S, cx - 20, cz + SPT_FW / 2 + 3, "fb");
sptSpot(cx, cz + SPT_FW / 2 + 2.5, 4, S.team + " sideline", "play, practise or join the team", function () { sptVenueCard(S.id); });
},
function (S, cx, cz) {
var T = sptTier({ cx: cx, cz: cz, ix: 0, iz: SPT_CW / 2 + 2.2, rows: 7, dep: 0.8, rise: 0.42, side: "z", len: SPT_CL, gaps: [["x", 0, 1]] });
var ox = SPT_CL / 2 + 5, oz = T.iz + T.out + 1.5, H = 10, c1 = new THREE.Color(S.c1).getHex(), c2 = new THREE.Color(S.c2).getHex(), brick = sptMat(0xB86A4A, "brick");
sptFlat(2 * ox, 2 * oz, sptMat(0xB8844A, "wood"), cx, 0.03, cz);
sptFlat(SPT_CL, SPT_CW, sptCourtMat(S), cx, 0.07, cz);
sptHoops(cx, cz);
sptRows(T, [sptMat(0xC8A070, "wood"), sptMat(0xB89060, "wood")]);
sptWall("x", cx - ox, cx + ox, cz - oz, 0, H, 0.5, brick, [{ at: cx, w: 4, h: 3.4 }]);
sptWall("x", cx - ox, cx + ox, cz + oz, 0, H, 0.5, brick);
sptWall("z", cz - oz, cz + oz, cx - ox, 0, H, 0.5, brick);
sptWall("z", cz - oz, cz + oz, cx + ox, 0, H, 0.5, brick);
sptBox(2 * ox + 1, 0.5, 2 * oz + 1, sptMat(c1, "metalroof", { ds: true }), cx, H + 0.25, cz);
sptBox(2 * ox, 1.2, 0.1, sptMat(c1), cx, H - 0.8, cz - oz + 0.3);
sptBox(2 * ox, 1.2, 0.1, sptMat(c1), cx, H - 0.8, cz + oz - 0.3);
for (var i = -2; i <= 2; i++)
sptBox(3, 0.25, 1, sptBasic(0xFFF6E4), cx + i * 7, H - 0.4, cz);
var ban = sptCanvasMat("ban-" + S.id + S.c1 + S.c2 + S.emblem, 512, 512, function (x, W, Hh) { x.fillStyle = S.c1; x.fillRect(0, 0, W, Hh); sptBadge(x, S, W * 0.62, W / 2, Hh * 0.42); x.fillStyle = S.c2; x.font = "bold 54px Georgia"; x.textAlign = "center"; x.fillText(S.mascot.toUpperCase(), W / 2, Hh * 0.9); });
sptPlane(4.2, 4.2, ban, cx + ox - 0.3, 6.2, cz, -Math.PI / 2);
sptBoard(6, 3, cx - ox + 0.4, 6.4, cz, Math.PI / 2, S.id + "-gym");
if (typeof wSign === "function") {
var s = wSign([S.school.toUpperCase() + " GYMNASIUM", "Home of the " + S.team], 12, 2, S.c1, S.c2);
s.position.set(cx, H + 1.6, cz - oz - 0.4);
s.rotation.y = Math.PI;
sptPar().add(s);
}
sptVenue(S.id + "-gym", { kind: "gym", sport: "bb", cx: cx, cz: cz, school: S.id, name: S.school + " gymnasium", ox: ox, oz: oz });
sptArea(cx - ox, cz - oz, cx + ox, cz + oz, S.school + ": the gym of the " + S.team, S.id + "-gym");
sptCoach(S, cx - SPT_CL / 2 + 3, cz - SPT_CW / 2 - 1.2, "bb");
sptSpot(cx, cz - SPT_CW / 2 - 1.4, 3.5, S.team + " bench", "play, practise or join the team", function () { sptVenueCard(S.id + "-gym"); });
},
function (S, x, z, sport) {
var nm = (sport === "fb" ? "Coach " : "Coach ") + SPT_LAST[sptHash(S.id + sport) % SPT_LAST.length], key = "spt_coach_" + S.id + "_" + sport;
var g = null;
try {
if (typeof wPerson === "function")
g = wPerson(key, { look: { top: new THREE.Color(S.c1).getHex(), bottom: 0x2A2A32, topKind: "shirt", bottomKind: "trousers", hat: "cap", hatColor: new THREE.Color(S.c2).getHex(), layer: null, gear: null }, title: "coach", place: S.school });
}
catch (e) {
g = null;
}
if (g) {
g.position.set(x, 0, z);
g.rotation.y = Math.PI;
sptPar().add(g);
g.userData.keep = 1;
g.traverse(function (o) { o.raycast = function () { }; });
}
var C = sptCfg(), sp = SPT_SPORTS[sport].name.toLowerCase();
sptSpot(x, z, 2.2, nm, "talk with the " + sp + " coach", function () {
if (typeof wTalk !== "function" || !C.coachTalk) {
sptSay("🗣️ <b>" + sptEsc(nm) + ":</b> " + sptEsc("Welcome to the " + S.team + ". Practise every day, learn the rules, and look after each other out there."), 7);
return;
}
wTalk({ name: nm, persona: "You are " + nm + ", the " + sp + " coach of the " + S.team + " at " + S.school + " in Somnucor, inside a game called SomnuMatrix. You coach high-school " + sp + " by the NFHS rulebook and know it well: explain any rule, the clock, positions, plays and drills simply and correctly. Be upbeat, fair and encouraging; praise effort; teamwork and good sportsmanship come first. Many players are young: keep everything kind and age-appropriate, never ask for personal details, never talk about betting. Keep answers short." + (C.notes ? " The league's own notes: " + C.notes : ""),
greet: "Hey there! I coach the " + S.team + ". Want to know a rule, a play, or how to make the team?" });
}, { venue: sport === "fb" ? S.id : S.id + "-gym" });
},
function (S, sport, i, ref) {
var c1 = new THREE.Color(ref ? "#F4F4F4" : S.c1).getHex(), c2 = new THREE.Color(ref ? "#1A1A1A" : S.c2).getHex();
var look = { top: c1, bottom: sport === "fb" ? (ref ? 0x1A1A1A : 0xE8E4DA) : c1, topKind: "shirt", bottomKind: sport === "fb" ? "trousers" : "shorts", shoes: ref ? 0x111111 : c2, layer: null, gear: null, neck: null, waist: null, back: null, face: null,
hat: sport === "fb" && !ref ? "helmet" : ref ? "cap" : "none", hatColor: sport === "fb" ? c2 : 0x111111 };
var g = null;
try {
if (typeof wPerson === "function")
g = wPerson("spt_" + (ref ? "ref" : S.id) + "_" + sport + "_" + i, { look: look, title: ref ? "referee" : "athlete", place: "the stadium" });
}
catch (e) {
g = null;
}
if (!g) {
g = new THREE.Group();
sptCyl(0.22, 1.5, sptMat(c1), 0, 0.75, 0, g, 8, 0.28);
sptBox(0.3, 0.3, 0.3, sptMat(0xC89A70), 0, 1.66, 0, g);
}
if (ref && !SPT.lite) {
var st = sptCanvasMat("stripes", 64, 64, function (x, W, H) { for (var k = 0; k < 8; k++) {
x.fillStyle = k % 2 ? "#111" : "#F4F4F4";
x.fillRect(k * W / 8, 0, W / 8, H);
} });
var sh = sptCyl(0.2, 0.5, st, 0, 1.25, 0, g, 10, 0.22);
sh.scale.set(1, 1, 0.75);
}
g.traverse(function (o) { o.raycast = function () { }; });
g.userData.keep = 1;
g.userData.dgb = 1;
g.userData.fknNoTurn = 1;
return g;
},
function (a, dt, y) {
var dx = a.tx - a.x, dz = a.tz - a.z, d = Math.hypot(dx, dz), st = Math.min(d, a.sp * dt);
if (d > 0.05) {
a.x += dx / d * st;
a.z += dz / d * st;
a.v = st / Math.max(dt, 1e-3);
a.ry = Math.atan2(dx, dz);
}
else
a.v *= 0.8;
a.g.position.set(a.x, y || 0, a.z);
a.g.rotation.y = a.face !== null && a.v < 0.5 ? a.face : (a.ry === undefined ? 0 : a.ry);
var L = a.g.userData.limbs;
if (L) {
a.ph += dt * (2 + a.v * 1.6);
var k = Math.min(1, a.v / 5), sw = Math.sin(a.ph) * 0.9 * k;
L.ll.rotation.x = sw;
L.rl.rotation.x = -sw;
L.la.rotation.x = -sw * 0.8;
L.ra.rotation.x = sw * 0.8;
}
},
function (V, f, fill) {
var K = SPT.K, tiers = K.tiers.filter(function (T) { return T.cx === V.cx && T.cz === V.cz; }), spots = [];
var H = f ? sptSchool(f.home) : null, A = f ? sptSchool(f.away) : null, R = sptRng(sptHash((f ? f.id : V.id) + "crowd")), max = SPT.lite ? 500 : 2600;
tiers.forEach(function (T) {
var sides = (T.side === "z" ? ["s", "n"] : ["s", "n", "e", "w"]).filter(function (sd) { return !T.only || sd === T.only; });
for (var r = 0; r < T.rows; r++)
sides.forEach(function (sd) {
var long = sd === "s" || sd === "n", half = long ? (T.len ? T.len / 2 : T.ix + r * T.dep) : (T.iz + r * T.dep), off = (long ? T.iz : T.ix) + r * T.dep + T.dep * 0.5, sg = sd === "s" || sd === "e" ? 1 : -1;
for (var p = -half + 0.5; p < half; p += 0.62) {
if (R() > fill)
continue;
var x = long ? T.cx + p : T.cx + sg * off, z = long ? T.cz + sg * off : T.cz + p;
if (sptTierE(T, x, z) < 0)
continue;
spots.push([x, T.y0 + (r + 1) * T.rise, z, sd]);
}
});
});
for (var i = spots.length - 1; i > 0; i--) {
var j = Math.floor(R() * (i + 1)), t = spots[i];
spots[i] = spots[j];
spots[j] = t;
}
spots = spots.slice(0, max);
if (!spots.length)
return null;
var body = new THREE.InstancedMesh(new THREE.BoxGeometry(0.42, 0.62, 0.3), new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), spots.length);
var head = new THREE.InstancedMesh(new THREE.SphereGeometry(0.12, 8, 6), new THREE.MeshLambertMaterial({ color: 0xFFFFFF }), spots.length);
var M = new THREE.Matrix4(), col = new THREE.Color(), skins = [0xF2D2B6, 0xE0B08A, 0xC68A5E, 0x8D5A3A, 0x5A3A26];
spots.forEach(function (s, i) {
var face = s[3] === "s" ? Math.PI : s[3] === "n" ? 0 : s[3] === "e" ? -Math.PI / 2 : Math.PI / 2;
M.makeRotationY(face);
M.setPosition(s[0], s[1] + 0.42, s[2]);
body.setMatrixAt(i, M);
M.makeTranslation(s[0], s[1] + 0.86, s[2]);
head.setMatrixAt(i, M);
var homeSide = V.kind === "gym" && V.school ? s[3] === "s" : s[2] > V.cz, S = f ? (homeSide ? H : A) : null;
col.set(S ? (R() < 0.6 ? S.c1 : S.c2) : ["#3A5A8A", "#8A3A3A", "#E8E0D0", "#4A6A3A", "#2A2A2A"][Math.floor(R() * 5)]);
body.setColorAt(i, col);
col.setHex(skins[Math.floor(R() * skins.length)]);
head.setColorAt(i, col);
});
body.instanceMatrix.needsUpdate = true;
head.instanceMatrix.needsUpdate = true;
if (body.instanceColor)
body.instanceColor.needsUpdate = true;
if (head.instanceColor)
head.instanceColor.needsUpdate = true;
var g = new THREE.Group();
g.add(body);
g.add(head);
g.traverse(function (o) { o.raycast = function () { }; });
return g;
},
function (V, f) {
var S = sptSim(f);
if (!S)
return null;
var root = new THREE.Group();
SPT.G.add(root);
var H = sptSchool(f.home), A = sptSchool(f.away), n = f.sport === "fb" ? 11 : 5, W = { f: f, S: S, V: V, root: root, h: [], a: [], refs: [], ball: sptBallMesh(f.sport), ev: -2, flight: null, holder: null };
root.add(W.ball);
for (var i = 0; i < n; i++) {
var gh = sptKit(H, f.sport, i), ga = sptKit(A, f.sport, i);
root.add(gh);
root.add(ga);
W.h.push(sptMover(gh, V.cx - 5 - i, V.cz + (f.sport === "fb" ? SPT_FW / 2 - 2 : SPT_CW / 2 - 1), 6.8));
W.a.push(sptMover(ga, V.cx + 5 + i, V.cz - (f.sport === "fb" ? SPT_FW / 2 - 2 : SPT_CW / 2 - 1), 6.8));
}
for (var r = 0; r < (f.sport === "fb" ? (SPT.lite ? 2 : 4) : 2); r++) {
var gr = sptKit(H, f.sport, r, true);
root.add(gr);
W.refs.push(sptMover(gr, V.cx, V.cz, 5));
}
var fill = f.big ? 0.92 : 0.55;
W.crowd = sptCrowd(V, f, fill);
if (W.crowd)
root.add(W.crowd);
SPT.watch[V.id] = W;
return W;
},
function (W, dt, now) {
var f = W.f, S = W.S, V = W.V, secs = (now - f.kick) / 1000, i = sptSimAt(S, secs), e = i >= 0 ? S.ev[i] : null;
if (secs < 0) {
if (W.ev !== -1) {
W.ev = -1;
sptWarmup(W);
}
}
else if (i !== W.ev && e) {
W.ev = i;
W.u0 = e.t;
sptShowEvent(W, e, i);
}
var u = e ? secs - e.t : 0;
if (e && u >= 0)
sptShowPhase(W, e, u);
var ys = 0;
W.h.concat(W.a).forEach(function (a) { sptMove(a, dt, ys); });
W.refs.forEach(function (a) { sptMove(a, dt, 0); });
sptBallTick(W, dt, secs);
var st = sptShowState(W, e, secs);
SPT.K.boards.forEach(function (B) { if (B.venue === V.id)
sptBoardPaint(B, st); });
if (e && W.called !== i && u >= e.d - 0.2) {
W.called = i;
var line = sptCall(f, e);
if (line && SPT.near === V.id)
sptTicker(SPT_SPORTS[f.sport].icon + " " + sptEsc(line));
}
},
function (W, e, secs) {
var f = W.f, H = sptSchool(f.home), A = sptSchool(f.away);
if (secs < 0)
return { hn: H.mascot, an: A.mascot, hs: 0, as: 0, clock: sptClock(-secs), q: "KICK-OFF IN", line: f.title, poss: "" };
if (!e)
return null;
var u = secs - e.t, sc = u >= e.d ? e.sc : (W.S.ev[W.ev - 1] || { sc: [0, 0] }).sc;
var Q = (f.sport === "fb" ? sptCfg().fbQ : sptCfg().bbQ) * 60, clk = e.clk, running = f.sport === "bb" || (e.k !== "end");
if (f.sport === "bb" && e.k !== "end" && e.k !== "to")
clk = Math.max(0, e.clk - Math.min(u, e.d));
if (f.sport === "fb" && u < e.d && e.k !== "end")
clk = Math.max(0, e.clk - u);
var done = secs >= W.S.end - 30, qn = e.q > 4 ? "OT" : "Q" + e.q;
var line = f.sport === "fb" && e.down ? ["", "1st", "2nd", "3rd", "4th"][e.down] + " & " + (e.togo >= 100 - e.spot ? "Goal" : e.togo) : f.sport === "bb" ? "Shot clock " + Math.max(0, Math.round(35 - Math.min(u, e.d || 0))) : "";
if (e.k === "end" && e.q === 2) {
qn = "HALF";
line = "Half time";
}
if (done) {
qn = "FINAL" + (W.S.ot ? " (OT)" : "");
line = f.title;
clk = 0;
}
return { hn: H.mascot, an: A.mascot, hs: sc[0], as: sc[1], clock: sptClock(clk), q: qn, line: line, poss: done ? "" : e.off, extra: f.big ? f.title : "" };
},
function (h) {
var el = document.getElementById("spt-tick");
if (!el) {
el = document.createElement("div");
el.id = "spt-tick";
el.style.cssText = "position:fixed;left:50%;bottom:86px;transform:translateX(-50%);z-index:57;max-width:min(680px,calc(100vw - 24px));padding:6px 12px;border-radius:6px;background:rgba(10,16,32,.85);color:#F4F0E4;font:14px/1.4 var(--sans,system-ui);text-align:center;pointer-events:none";
document.body.appendChild(el);
}
el.innerHTML = h;
el.style.display = "block";
clearTimeout(SPT.tickT);
SPT.tickT = setTimeout(function () { el.style.display = "none"; }, 9000);
},
function (W, e, i) {
var f = W.f, V = W.V, d = sptDir(f, e), O = e.off === "h" ? W.h : W.a, D = e.off === "h" ? W.a : W.h, R = sptRng(sptHash(f.id + "|" + i));
W.R = R;
W.flight = null;
W.phase = "set";
if (f.sport === "fb") {
var los = sptLosX(W, e, e.spot !== undefined ? e.spot : 35);
if (e.k === "ko") {
var kx = los;
O.forEach(function (a, j) { a.tx = kx - d * 1.5; a.tz = V.cz - 20 + j * 4; });
D.forEach(function (a, j) { a.tx = kx + d * (j < 2 ? 50 : j < 6 ? 30 : 15); a.tz = V.cz - 15 + ((j * 7) % 11) * 3; });
W.holder = null;
W.ballAt = [kx, 0.1, V.cz];
}
else if (e.k === "end" || e.k === "try") { }
else {
O.forEach(function (a, j) { var p = SPT_FB_OFF[j]; a.tx = los + d * p[0]; a.tz = V.cz + p[1]; a.face = d > 0 ? Math.PI / 2 : -Math.PI / 2; });
D.forEach(function (a, j) { var p = SPT_FB_DEF[j]; a.tx = los + d * p[0]; a.tz = V.cz + p[1]; a.face = d > 0 ? -Math.PI / 2 : Math.PI / 2; });
W.holder = O[8];
}
W.refs.forEach(function (a, j) { a.tx = los + (j % 2 ? 1 : -1) * (j < 2 ? 8 : 14); a.tz = V.cz + (j < 2 ? -SPT_FW / 2 - 1 : SPT_FW / 2 + 1); });
}
else {
var hx = V.cx + d * SPT_HOOP, sp = [[-7, 0], [-5, -4.5], [-5, 4.5], [-2, -5.6], [-1.5, 2.2]];
O.forEach(function (a, j) { var p = sp[(j + i) % 5]; a.tx = hx + d * p[0]; a.tz = V.cz + p[1]; });
D.forEach(function (a, j) { var m = O[j]; a.tx = (m.tx + hx) / 2 * 0.35 + m.tx * 0.65; a.tz = m.tz * 0.8 + V.cz * 0.2; });
W.holder = O[0];
W.refs.forEach(function (a, j) { a.tx = V.cx + (j ? -1 : 1) * 4; a.tz = V.cz + (j ? -1 : 1) * (SPT_CW / 2 + 0.8); });
}
},
function (W, e, u) {
var f = W.f, V = W.V, d = sptDir(f, e), O = e.off === "h" ? W.h : W.a, D = e.off === "h" ? W.a : W.h;
if (f.sport === "fb") {
var los = sptLosX(W, e, e.spot || 35);
if (e.k === "ko") {
if (W.phase === "set" && u >= 0) {
W.phase = "go";
var land = sptLosX(W, e, e.tb ? 100 : 95) - 0;
land = los + d * (e.tb ? 70 : 55) * SPT_YD;
W.flight = { a: [los, 0.1, V.cz], b: [land, 0.4, V.cz], t0: u, t1: u + 3.4, h: 16, to: e.tb ? null : D[0] };
D[0].tx = land;
D[0].tz = V.cz;
O.forEach(function (a) { a.tx = land - d * 8; a.tz = a.z; a.sp = 7; });
}
if (W.phase === "go" && u >= 3.6 && e.ret !== "td" && !e.tb) {
W.phase = "ret";
var end = V.cx + sptDir(f, { q: e.q, off: e.off === "h" ? "a" : "h" }) * ((e.ret === "td" ? 100 : e.ret) - 50) * SPT_YD;
D[0].tx = end;
D[0].sp = 7.4;
O.forEach(function (a, j) { a.tx = end + (j % 3 - 1) * 2; a.tz = V.cz + (j % 5 - 2) * 3; });
}
return;
}
if (e.k === "end" || e.k === "try" || e.k === "kneel") {
if (e.k === "try" && W.phase === "set" && u > 0.5) {
W.phase = "go";
var gx = V.cx + d * (SPT_FL / 2 + 0.6);
W.flight = { a: [V.cx + d * (SPT_FL / 2 - 10 - 7 * SPT_YD), 0.2, V.cz], b: [gx, e.good ? 5 : 2, V.cz + (e.good ? 0 : 4.5)], t0: u, t1: u + 1.6, h: 6 };
}
return;
}
var gain = e.gain || 0, end = sptLosX(W, e, (e.spot || 35) + (e.k === "int" ? (e.air || 10) : gain));
if (W.phase === "set" && u >= 0) {
W.phase = "go";
var qb = O[0], rb = O[1], who = e.who === "RB" ? O[1] : e.who === "TE" ? O[5] : e.who === "QB" ? O[0] : O[2 + (e.whoN || 0) % 3];
qb.tx = los - d * (e.k === "run" ? 1.5 : 6);
qb.tz = V.cz;
W.holder = qb;
for (var j = 6; j < 11; j++) {
O[j].tx = los + d * 0.8;
}
for (var k = 0; k < 4; k++) {
D[k].tx = los - d * 0.4;
}
if (e.k === "run") {
W.carry = e.who === "QB" ? qb : rb;
W.handT = 0.8;
rb.tx = los - d * 3;
rb.tz = V.cz + (e.gain > 3 ? 2 : -2);
}
else if (e.k === "punt" || e.k === "fg") {
qb.tx = los - d * (e.k === "punt" ? 13 : 7);
W.carry = null;
}
else {
W.carry = who;
[2, 3, 4, 5].forEach(function (j) { var r = O[j]; r.tx = los + d * (j === 2 + (e.whoN || 0) % 3 || (j === 5 && e.who === "TE") ? Math.max(4, gain * SPT_YD) : 8 + j * 2); r.tz = V.cz + (r.z - V.cz) * 0.6; });
if (e.who === "RB") {
rb.tx = los + d * 3;
rb.tz = V.cz + 8;
}
who.tx = los + d * Math.max(3, (e.k === "int" ? (e.air || 10) : Math.min(gain, 15)) * SPT_YD);
}
D.slice(4).forEach(function (a) { a.tx = end - d * 2 + (a.z - V.cz) * 0.1; a.tz = V.cz + (a.z - V.cz) * 0.5; a.sp = 6.4; });
}
if (W.phase === "go") {
if (e.k === "run" && u >= W.handT) {
W.phase = "carry";
W.holder = W.carry;
W.carry.tx = end;
W.carry.tz = V.cz + (W.R() - 0.5) * 14;
W.carry.sp = 6.8;
D.forEach(function (a) { a.tx = end + d * 0.8; a.tz = W.carry.tz + (a.z - V.cz) * 0.15; });
}
if ((e.k === "pass" || e.k === "inc" || e.k === "int") && u >= 2.6) {
W.phase = "air";
var tg = W.carry, ex = tg.tx, ez = tg.tz;
W.flight = { a: [O[0].x, 2, O[0].z], b: [ex, 1.4, ez], t0: u, t1: u + 1.1, h: 3, to: e.k === "pass" ? tg : e.k === "int" ? D[9] : null, drop: e.k === "inc" };
if (e.k === "int") {
D[9].tx = ex;
D[9].tz = ez;
}
}
if (e.k === "sack" && u >= 2.2) {
W.phase = "done";
D[0].tx = O[0].x;
D[0].tz = O[0].z;
O[0].tx = end;
}
if (e.k === "punt" && u >= 1.2) {
W.phase = "air";
W.flight = { a: [O[0].x, 1, O[0].z], b: [los + d * (e.net || 38) * SPT_YD, 0.3, V.cz], t0: u, t1: u + 4, h: 20 };
}
if (e.k === "fg" && u >= 1.2) {
W.phase = "air";
var px = V.cx + d * (SPT_FL / 2 + 0.6);
W.flight = { a: [O[0].x + d * 0.5, 0.2, V.cz], b: [px, e.good ? 5 : 2.5, V.cz + (e.good ? 0 : 5)], t0: u, t1: u + 2, h: 10 };
}
}
if (W.phase === "air" && W.flight && u > W.flight.t1 + 0.05 && W.flight.to && e.k === "pass") {
W.phase = "yac";
W.holder = W.flight.to;
W.flight = null;
W.holder.tx = end;
W.holder.sp = 6.6;
}
if (W.phase === "air" && W.flight && u > W.flight.t1 + 0.05 && e.k === "int") {
W.phase = "ret";
W.holder = D[9];
W.flight = null;
D[9].tx = D[9].x - d * (e.ret || 5) * SPT_YD;
}
}
else {
var hx = V.cx + d * SPT_HOOP;
if (e.k === "tip" || e.k === "end" || e.k === "to")
return;
var step = Math.floor(u / 2.4);
if (step !== W.step && u < e.d - 1.4) {
W.step = step;
var nx = O[Math.floor(W.R() * 5)];
if (nx !== W.holder) {
W.flight = { a: [W.holder.x, 1.2, W.holder.z], b: [nx.x, 1.2, nx.z], t0: u, t1: u + 0.5, h: 0.3, to: nx };
W.holder = null;
}
O.forEach(function (a, j) { if (W.R() < 0.5) {
a.tx = hx - d * (2 + W.R() * 5);
a.tz = V.cz + (W.R() - 0.5) * 11;
} });
D.forEach(function (a, j) { var m = O[j]; a.tx = m.tx * 0.7 + hx * 0.3; a.tz = m.tz * 0.85 + V.cz * 0.15; });
}
if ((e.k === "make" || e.k === "miss") && u >= e.d - 1.3 && W.phase !== "shot") {
W.phase = "shot";
var sh = W.holder || O[e.who || 0];
W.flight = { a: [sh.x, 2.2, sh.z], b: [hx, e.k === "make" ? 3.0 : 3.2, V.cz + (e.k === "make" ? 0 : 0.25)], t0: u, t1: u + 1.1, h: e.three ? 3 : 2, made: e.k === "make" };
W.holder = null;
}
if (e.k === "tov" && u >= e.d - 0.5 && W.phase !== "tov") {
W.phase = "tov";
W.holder = D[e.who || 0];
}
}
},
function (W, dt, secs) {
var b = W.ball, F = W.flight, u = secs - (W.u0 || 0);
if (F) {
var k = Math.max(0, Math.min(1, (u - F.t0) / (F.t1 - F.t0)));
b.position.set(F.a[0] + (F.b[0] - F.a[0]) * k, F.a[1] + (F.b[1] - F.a[1]) * k + Math.sin(k * Math.PI) * F.h, F.a[2] + (F.b[2] - F.a[2]) * k);
if (k >= 1) {
if (F.to && W.f.sport === "bb") {
W.holder = F.to;
W.flight = null;
}
else if (F.drop || F.made !== undefined || !F.to) {
b.position.y = Math.max(0.12, b.position.y - dt * 3);
}
}
return;
}
if (W.holder) {
var a = W.holder;
b.position.set(a.x + Math.sin(a.g.rotation.y) * 0.35, W.f.sport === "bb" ? 0.5 + Math.abs(Math.sin(secs * 6)) * 0.45 : 1.15, a.z + Math.cos(a.g.rotation.y) * 0.35);
}
else if (W.ballAt) {
b.position.set(W.ballAt[0], W.ballAt[1], W.ballAt[2]);
}
},
function (sport, venueId, opp, len, mine) {
var V = SPT.K && SPT.K.venues[venueId];
if (!V)
return;
if (SPT.game)
sptGameEnd(true);
if (sptShowFor(V)) {
sptSay("A league game is being played here right now. Watch it from the stands, or play on another field.", 6);
return;
}
var C = sptCfg(), my = mine || sptMyCampus(), Hs = sptSchool(my), As = sptSchool(opp);
if (!As || As.id === Hs.id) {
var o = sptSchoolsOn(C).filter(function (s) { return s.id !== Hs.id; });
As = o[Math.floor(Math.random() * o.length)];
}
var full = (sport === "fb" ? C.fbQ : C.bbQ) * 60, mult = SPT_LEN[len] || 1;
var G = { sport: sport, V: V, H: Hs, A: As, len: len, Q: Math.max(60, Math.round(full * mult)), q: 1, clk: 0, sc: [0, 0], poss: "h", state: "pre", timer: 3, log: [], t0: Date.now(), secs: 0,
tos: [sport === "fb" ? 3 : 5, sport === "fb" ? 3 : 5], tf: [0, 0], root: new THREE.Group(), h: [], a: [], refs: [], ball: sptBallMesh(sport), flight: null, holder: null, cool: 0, skill: sptMySkill() };
G.clk = G.Q;
SPT.G.add(G.root);
G.root.add(G.ball);
sptGameKeys(true);
SPT.game = G;
worldCard(null);
worldPrompt(null);
if (sport === "bb")
sptBbSetup(G);
else
sptFbSetup(G);
G.crowd = sptCrowd(V, { id: "play" + G.t0, home: Hs.id, away: As.id }, 0.35);
if (G.crowd)
G.root.add(G.crowd);
sptHud();
sptSay(SPT_SPORTS[sport].icon + " <b>" + sptEsc(Hs.team) + " v " + sptEsc(As.team) + "</b>. " + (sport === "bb" ? "Four quarters of " + sptClock(G.Q) + ". The tip-off in three seconds." : "Four quarters of " + sptClock(G.Q) + ". The kick-off in a moment."), 6);
},
function (quiet) {
var G = SPT.game;
if (!G)
return;
SPT.game = null;
sptGameKeys(false);
if (G.root && G.root.parent)
G.root.parent.remove(G.root);
if (G.crowd)
G.crowd.traverse(function (o) { if (o.isInstancedMesh) {
o.geometry.dispose();
o.material.dispose();
} });
var hud = document.getElementById("spt-hud");
if (hud)
hud.style.display = "none";
var m = document.getElementById("spt-meter");
if (m)
m.style.display = "none";
var bt = document.getElementById("spt-btns");
if (bt)
bt.style.display = "none";
var cp = document.getElementById("spt-call");
if (cp)
cp.style.display = "none";
if (quiet)
return;
},
function (G) {
G.state = "over";
var w = G.sc[0] > G.sc[1], t = G.sc[0] === G.sc[1];
sptGameRecord(G);
var b = worldBtn("again", "Play again", "the same sides") + worldBtn("leave", "Leave the " + (G.sport === "fb" ? "field" : "court"), "");
worldCard(worldFacts((w ? "🏆 You won! " : t ? "A tie. " : "Good game. ") + G.H.mascot + " " + G.sc[0] + ", " + G.A.mascot + " " + G.sc[1], SPT_SPORTS[G.sport].name + (G.len === "real" ? " · full length" : " · " + G.len + " game"), (G.stats ? Object.keys(G.stats).map(function (k) { return [k, String(G.stats[k])]; }) : []), [w ? "Well played. The win goes on your sports record." : "Every game goes on your sports record. Practise at the sideline or the bench to get better."]) + b, { again: function () { var s = G.sport, v = G.V.id, o = G.A.id, l = G.len, h = G.H.id; sptGameEnd(true); worldCard(null); sptGameStart(s, v, o, l, h); }, leave: function () { sptGameEnd(true); worldCard(null); } });
},
function () {
var el = document.getElementById("spt-hud");
if (!el) {
el = document.createElement("div");
el.id = "spt-hud";
el.style.cssText = "position:fixed;left:50%;top:8px;transform:translateX(-50%);z-index:59;padding:6px 12px;border-radius:8px;background:rgba(8,12,22,.86);color:#F4F0E4;font:600 15px/1.35 var(--sans,system-ui);text-align:center;min-width:280px";
document.body.appendChild(el);
var btn = document.createElement("div");
btn.id = "spt-btns";
btn.style.cssText = "position:fixed;right:12px;bottom:150px;z-index:59;display:flex;flex-direction:column;gap:8px";
[["E", "act"], ["Q", "pass"], ["T", "time"], ["X", "quit"]].forEach(function (b) { var d = document.createElement("button"); d.className = "btn"; d.setAttribute("data-spt", b[1]); d.style.cssText = "min-width:96px;padding:10px 12px;font-weight:600"; btn.appendChild(d); });
btn.addEventListener("click", function (e) { var t = e.target.closest("[data-spt]"); if (!t)
return; e.preventDefault(); e.stopPropagation(); sptGameKey(t.getAttribute("data-spt")); });
document.body.appendChild(btn);
}
el.style.display = "block";
document.getElementById("spt-btns").style.display = "flex";
},
function (G) {
var el = document.getElementById("spt-hud"), bt = document.getElementById("spt-btns");
if (!el)
return;
if (!G) {
el.style.display = "none";
if (bt)
bt.style.display = "none";
return;
}
var qn = G.q > 4 ? "OT" + (G.q > 5 ? G.q - 4 : "") : "Q" + G.q, mid = G.sport === "bb" ? "Shot clock " + Math.ceil(Math.max(0, G.shot || 0)) : (G.down ? ["", "1st", "2nd", "3rd", "4th"][G.down] + " & " + (G.togo >= 100 - G.spot ? "Goal" : Math.max(1, Math.round(G.togo))) + " · ball on " + sptYdL(G, G.spot) : "");
var h = "<span style='color:" + G.H.c2 + "'>" + sptEsc(G.H.mascot) + "</span> <b style='font-size:20px'>" + G.sc[0] + "</b> &nbsp;·&nbsp; " + qn + " <b style='color:#F0C040;font-size:18px'>" + sptClock(G.clk) + "</b> &nbsp;·&nbsp; <b style='font-size:20px'>" + G.sc[1] + "</b> <span style='color:" + G.A.c2 + "'>" + sptEsc(G.A.mascot) + "</span>" +
"<div style='font-weight:400;font-size:12.5px;opacity:.9'>" + sptEsc(mid) + (G.sport === "fb" && G.pc !== undefined && G.state === "huddle" ? " · play clock " + Math.ceil(Math.max(0, G.pc)) : "") + (G.poss ? " · " + (G.poss === "h" ? "your ball" : "their ball") : "") + (G.note ? " · " + G.note : "") + "</div>";
if (el.dataset.h !== h) {
el.dataset.h = h;
el.innerHTML = h;
}
if (bt) {
var L = G.sport === "bb" ? { act: G.holder === G.me ? "E · Shoot" : G.state === "ft" && G.ftMe ? "E · Free throw" : G.poss === "a" ? "E · Steal" : "E · —", pass: G.holder === G.me ? "Q · Pass" : "Q · Call for it", time: "T · Time-out (" + G.tos[0] + ")", quit: "X · Stop" }
: { act: G.state === "huddle" ? "E · Snap" : G.me && G.holder === G.me && G.canThrow ? "E · Throw" : G.poss === "a" ? "E · Tackle" : G.kicking ? "E · Kick" : "E · —", pass: G.state === "huddle" ? "Q · Change play" : "Q · —", time: "T · Time-out (" + G.tos[0] + ")", quit: "X · Stop" };
if (G.state === "break" || G.state === "timeout")
L.act = "E · Skip the break";
bt.querySelectorAll("[data-spt]").forEach(function (b) { var t = L[b.getAttribute("data-spt")]; if (b.textContent !== t)
b.textContent = t; });
}
},
function (on) {
if (on && !SPT_KEYFN) {
SPT_KEYFN = function (e) {
if (!SPT.game || /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
var dg = /^Digit([1-7])$/.exec(e.code || "");
if (dg && SPT.game.sport === "fb" && SPT.game.state === "huddle") {
e.preventDefault();
e.stopImmediatePropagation();
sptFbChoose(SPT.game, +dg[1] - 1);
return;
}
var k = { KeyE: "act", Enter: "act", KeyQ: "pass", KeyT: "time", KeyX: "quit" }[e.code];
if (!k)
return;
e.preventDefault();
e.stopImmediatePropagation();
if (!e.repeat)
sptGameKey(k);
};
addEventListener("keydown", SPT_KEYFN, true);
}
if (!on && SPT_KEYFN) {
removeEventListener("keydown", SPT_KEYFN, true);
SPT_KEYFN = null;
}
},
function (k) {
var G = SPT.game;
if (!G)
return;
if (k === "quit") {
worldCard(worldFacts("Stop the game?", "It does not go on your record.", [], []) + worldBtn("y", "Stop", "") + worldBtn("n", "Keep playing", ""), { y: function () { worldCard(null); sptGameEnd(true); sptSay("The game is stopped.", 4); }, n: function () { worldCard(null); } });
return;
}
if ((G.state === "break" || G.state === "timeout") && k === "act") {
G.timer = Math.min(G.timer, 0.5);
return;
}
if (G.sport === "bb")
sptBbKey(G, k);
else
sptFbKey(G, k);
},
function (G, dt) {
var P = worldLocal(), me = G.me;
if (!me)
return;
if (G.lastP && !G.frozen) {
var dx = P.x - G.lastP.x, dz = P.z - G.lastP.z, d = Math.hypot(dx, dz), run = typeof keys !== "undefined" && (keys.ShiftLeft || keys.ShiftRight), max = (run ? 7.4 : 4.6) * Math.max(dt, 0.001) * (1 + (G.skill.run || 0) * 0.008);
if (d > max && d < 20) {
camera.position.x -= dx * (1 - max / d);
camera.position.z -= dz * (1 - max / d);
P = worldLocal();
}
}
if (G.frozen) {
camera.position.x = SPT.base + G.frozen[0];
camera.position.z = G.frozen[1];
P = worldLocal();
}
G.lastP = { x: P.x, z: P.z };
me.x = P.x;
me.z = P.z;
me.v = 0;
},
function (G, on, label) {
var el = document.getElementById("spt-meter");
if (!el) {
el = document.createElement("div");
el.id = "spt-meter";
el.style.cssText = "position:fixed;left:50%;bottom:200px;transform:translateX(-50%);z-index:59;width:min(360px,80vw);padding:8px 10px;border-radius:8px;background:rgba(8,12,22,.86);color:#F4F0E4;font:13px var(--sans,system-ui);text-align:center";
el.innerHTML = "<div id='spt-ml'></div><div style='position:relative;height:16px;margin-top:6px;border-radius:8px;background:linear-gradient(90deg,#8A2A2A,#C8A030 35%,#3AA05A 45%,#3AA05A 55%,#C8A030 65%,#8A2A2A)'><div id='spt-mk' style='position:absolute;top:-3px;width:6px;height:22px;background:#FFF;border-radius:3px'></div></div>";
document.body.appendChild(el);
}
el.style.display = on ? "block" : "none";
if (on) {
document.getElementById("spt-ml").textContent = label || "Press E when the marker is in the green";
G.mt = 0;
}
},
function (G) {
var V = G.V;
for (var i = 0; i < 5; i++) {
var ga = sptKit(G.A, "bb", i);
G.root.add(ga);
G.a.push(sptMover(ga, V.cx + 3 + i, V.cz, 6.2 + (G.A.rating - 70) * 0.03));
if (i === 0) {
G.me = sptMover(new THREE.Group(), V.cx - 1, V.cz, 7);
G.me.human = true;
G.h.push(G.me);
}
else {
var gh = sptKit(G.H, "bb", i);
G.root.add(gh);
G.h.push(sptMover(gh, V.cx - 3 - i, V.cz, 6.2 + (G.H.rating - 70) * 0.03));
}
}
for (var r = 0; r < 2; r++) {
var gr = sptKit(G.H, "bb", r, true);
G.root.add(gr);
G.refs.push(sptMover(gr, V.cx, V.cz + (r ? -1 : 1) * (SPT_CW / 2 + 0.8), 5));
}
G.shot = 35;
G.stats = { "Your points": 0, "Your assists": 0, "Your steals": 0, "Rebounds": 0 };
sptPutMe(G, V.cx - 1.2, V.cz, 1);
G.state = "pre";
G.timer = 3;
G.h.forEach(function (a, i) { if (!a.human) {
a.x = a.tx = V.cx - 3 - (i % 2) * 2;
a.z = a.tz = V.cz + (i < 3 ? -3 : 3);
} });
G.a.forEach(function (a, i) { a.x = a.tx = V.cx + (i ? 3 + (i % 2) * 2 : 1.2); a.z = a.tz = V.cz + (i ? (i < 3 ? -3 : 3) : 0); });
G.ball.position.set(V.cx, 3.2, V.cz);
},
function (G, dt) {
var V = G.V;
sptMeTick(G, dt);
if (G.state === "pre") {
G.timer -= dt;
if (G.timer <= 0) {
G.state = "flight";
var w = Math.random() < 0.5 + (G.skill.run || 0) * 0.01 ? G.me : G.a[0];
G.flight = { a: [V.cx, 3.6, V.cz], b: [w.x, 1.2, w.z], t: 0, T: 0.7, h: 1.2, to: w, kind: "tip" };
G.arrow = w === G.me ? "a" : "h";
G.state = "live";
}
}
else if (G.state === "break" || G.state === "timeout") {
G.timer -= dt;
G.note = (G.state === "break" ? (G.q === 3 ? "half time " : "break ") : "time-out ") + sptClock(G.timer);
if (G.timer <= 0) {
G.note = "";
G.state = "dead";
G.timer = 0.1;
}
}
else if (G.state === "dead") {
G.timer -= dt;
if (G.timer <= 0) {
var f = G.then;
G.then = null;
G.state = "live";
G.note = "";
if (f)
f();
}
}
else if (G.state === "ft")
sptBbFtTick(G, dt);
else if (G.state === "live") {
G.clk -= dt;
G.shot -= dt;
G.secs += dt;
if (G.back > 0 && G.holder && sptBbInBack(G, G.holder)) {
G.back -= dt;
if (G.back <= 0) {
sptBbTurn(G, "Ten seconds in the backcourt: a violation.");
}
}
else
G.back = 0;
if (G.shot <= 0 && !G.flight) {
sptBbTurn(G, "The shot clock ran out: a violation.");
}
if (G.holder === G.me && (Math.abs(G.me.x - V.cx) > SPT_CL / 2 || Math.abs(G.me.z - V.cz) > SPT_CW / 2)) {
sptBbTurn(G, "Out of bounds: their ball.");
}
if (G.clk <= 0 && !(G.flight && G.flight.kind === "shot")) {
G.clk = 0;
sptBbPeriodEnd(G);
}
else
sptBbAI(G, dt);
}
G.h.concat(G.a).forEach(function (a) { if (!a.human)
sptMove(a, dt, 0); });
G.refs.forEach(function (a, i) { a.tx = (G.holder ? G.holder.x : V.cx) + (i ? -3 : 3); sptMove(a, dt, 0); });
sptBbBall(G, dt);
G.cool = Math.max(0, G.cool - dt);
sptHudPaint(G);
},
function (G, dt) {
var F = G.flight, b = G.ball;
if (F) {
F.t += dt;
var k = Math.min(1, F.t / F.T);
b.position.set(F.a[0] + (F.b[0] - F.a[0]) * k, F.a[1] + (F.b[1] - F.a[1]) * k + Math.sin(k * Math.PI) * F.h, F.a[2] + (F.b[2] - F.a[2]) * k);
if (k >= 1) {
G.flight = null;
sptBbLand(G, F);
}
return;
}
if (G.holder === G.me)
sptBallInHand(G);
else if (G.holder) {
var a = G.holder;
b.position.set(a.x + Math.sin(a.g.rotation.y) * 0.35, 0.45 + Math.abs(Math.sin(G.secs * 7)) * 0.5, a.z + Math.cos(a.g.rotation.y) * 0.35);
}
},
function (G, F) {
if (F.kind === "pass" || F.kind === "tip" || F.kind === "reb") {
sptBbGive(G, F.to);
if (F.kind === "pass" && F.from === G.me && F.to !== G.me)
G.assist = F.to;
if (F.to === G.me && F.kind === "reb")
G.stats.Rebounds++;
return;
}
if (F.kind === "steal") {
sptBbGive(G, F.to);
return;
}
if (F.kind === "shot") {
var team = F.team, i = team === "h" ? 0 : 1;
if (F.made) {
G.sc[i] += F.pts;
if (F.shooter === G.me)
G.stats["Your points"] += F.pts;
if (team === "h" && G.assist && F.shooter !== G.me && G.assistBy === G.me)
G.stats["Your assists"]++;
sptSay("🏀 " + (F.shooter === G.me ? "<b>You score " + F.pts + "!</b>" : sptEsc(team === "h" ? G.H.mascot : G.A.mascot) + " score " + F.pts + ".") + (F.foul ? " And one!" : ""), 3);
if (F.foul) {
sptBbFts(G, F.shooter, 1, team);
return;
}
if (G.clk <= 0) {
sptBbPeriodEnd(G);
return;
}
var other = team === "h" ? G.a : G.h, H = sptBbHoop(G, team);
var inb = other[0];
if (inb.human) {
sptPutMe(G, H.x + H.dir * 1.8, G.V.cz + 1.5, -H.dir);
}
else {
inb.x = inb.tx = H.x + H.dir * 1.8;
inb.z = inb.tz = G.V.cz + 1.5;
}
G.ball.position.set(H.x, 1.2, H.z);
sptBbGive(G, inb);
return;
}
if (F.foul) {
sptBbFts(G, F.shooter, F.pts, team);
return;
}
if (G.clk <= 0) {
sptBbPeriodEnd(G);
return;
}
G.shot = 35;
var Hh = sptBbHoop(G, team), off = team === "h" ? G.h : G.a, def = team === "h" ? G.a : G.h, orb = Math.random() < 0.28;
var near = sptNearest(G.h.concat(G.a), Hh.x - Hh.dir * 1.5, Hh.z), meNear = Math.hypot(G.me.x - Hh.x, G.me.z - Hh.z) < 3.2;
var to = meNear && Math.random() < 0.55 ? G.me : sptNearest(orb ? off : def, Hh.x, Hh.z).a || near.a;
G.flight = { a: [Hh.x, 3.05, Hh.z], b: [to.x, 1.3, to.z], t: 0, T: 0.5, h: 0.8, to: to, kind: "reb" };
}
},
function (G, a) {
var team = sptBbTeam(G, a), H = sptBbHoop(G, team), d = Math.hypot(a.x - H.x, a.z - H.z), three = d > SPT_ARC + 0.05, def = team === "h" ? G.a : G.h, n = sptNearest(def, a.x, a.z);
var p = d < 1.6 ? 0.62 : d < 4.6 ? 0.46 : !three ? 0.4 : d < 8 ? 0.34 : d < 10 ? 0.16 : 0.05;
if (a === G.me) {
p += (three ? G.skill.three : G.skill.shoot) * 0.004;
var f = sptFwd(), hx = (H.x - a.x) / Math.max(0.1, d), hz = (H.z - a.z) / Math.max(0.1, d), dot = f[0] * hx + f[1] * hz;
if (dot < 0.65)
p -= 0.22;
}
else
p += ((team === "h" ? G.H : G.A).rating - (team === "h" ? G.A : G.H).rating) * 0.003;
if (n.d < 1.0)
p -= 0.18;
else if (n.d < 1.8)
p -= 0.09;
if (n.a === G.me && G.blockT > 0) {
p -= 0.3;
}
var foul = n.d < 1.2 && !n.a.human && Math.random() < 0.1, made = Math.random() < Math.max(0.02, p);
G.holder = null;
G.flight = { a: [a.x, 2.2, a.z], b: [H.x, 3.08, H.z + (made ? 0 : (Math.random() - 0.5) * 0.5)], t: 0, T: 0.75 + d * 0.05, h: 1.2 + d * 0.18, kind: "shot", team: team, made: made, pts: three ? 3 : 2, foul: foul, shooter: a };
if (foul) {
G.tf[team === "h" ? 1 : 0]++;
}
G.assistBy = G.lastPasser;
G.shot = 35;
},
function (G, from, to) {
var mx = (from.x + to.x) / 2, mz = (from.z + to.z) / 2, def = sptBbTeam(G, from) === "h" ? G.a : G.h, n = sptNearest(def, mx, mz), d = Math.hypot(to.x - from.x, to.z - from.z);
var picked = n.d < 0.9 && Math.random() < 0.3 + (n.a.human ? 0.2 : 0);
G.lastPasser = from;
G.holder = null;
G.flight = { a: [from.x, 1.3, from.z], b: [(picked ? n.a : to).x, 1.3, (picked ? n.a : to).z], t: 0, T: Math.max(0.25, d / 14), h: 0.25, to: picked ? n.a : to, kind: picked ? "steal" : "pass", from: from };
if (picked && n.a === G.me)
G.stats["Your steals"]++;
if (picked)
sptSay("🏀 " + (n.a === G.me ? "<b>You pick off the pass!</b>" : "The pass is picked off!"), 3);
},
function (G) {
G.flight = null;
G.holder = null;
G.tf = [0, 0];
if (G.q >= 4 && G.sc[0] !== G.sc[1]) {
sptSay("🏀 <b>The final buzzer!</b>", 5);
sptGameOver(G);
return;
}
var half = G.q === 2;
G.q++;
G.clk = G.q > 4 ? Math.max(60, Math.round(G.Q / 2)) : G.Q;
G.state = "break";
G.timer = half ? (G.len === "real" ? 600 : 120) : (G.len === "real" ? 60 : 20);
sptSay("🏀 " + (half ? "<b>Half time.</b> The teams change ends." : G.q > 4 ? "<b>Tied: overtime!</b>" : "End of the quarter.") + " Press E to skip the break.", 5);
G.then = function () {
var V = G.V, side = G.q > 4 ? (Math.random() < 0.5 ? "h" : "a") : (G.arrow || "h");
if (G.q <= 4)
G.arrow = side === "h" ? "a" : "h";
var team = side === "h" ? G.h : G.a, H = sptBbHoop(G, side), a = team[0];
if (a.human)
sptPutMe(G, V.cx - H.dir * 0.5, V.cz + SPT_CW / 2 - 0.4, H.dir);
else {
a.x = a.tx = V.cx;
a.z = a.tz = V.cz + SPT_CW / 2 - 0.4;
}
sptBbGive(G, a);
};
},
function (G, shooter, n, team) {
var H = sptBbHoop(G, team), x = H.x - H.dir * 4.34;
G.state = "ft";
G.ft = { n: n, left: n, team: team, shooter: shooter, x: x, wait: 1.6, made: 0 };
G.ftMe = shooter === G.me;
G.holder = shooter;
if (shooter.human)
sptPutMe(G, x, G.V.cz, H.dir);
else {
shooter.x = shooter.tx = x;
shooter.z = shooter.tz = G.V.cz;
}
G.h.concat(G.a).forEach(function (a, i) { if (a === shooter || a.human)
return; a.tx = H.x - H.dir * (1 + (i % 3) * 1.0); a.tz = G.V.cz + (i % 2 ? -1.9 : 1.9); });
if (G.ftMe) {
G.frozen = [x, G.V.cz];
sptMeter(G, true, "Free throw " + (n - G.ft.left + 1) + " of " + n + ": press E when the marker is in the green");
}
sptSay("🏀 " + (G.ftMe ? "<b>To the line:</b> " : "To the line: ") + n + " free throw" + (n > 1 ? "s" : "") + ".", 3);
},
function (G, made) {
var F = G.ft, H = sptBbHoop(G, F.team);
F.left--;
if (made) {
F.made++;
G.sc[F.team === "h" ? 0 : 1]++;
if (F.shooter === G.me)
G.stats["Your points"]++;
}
G.holder = null;
G.flight = { a: [F.x, 2.2, G.V.cz], b: [H.x, 3.08, H.z + (made ? 0 : 0.3)], t: 0, T: 1.0, h: 1.6, kind: "ftball" };
setTimeout(function () {
if (!SPT.game || SPT.game !== G)
return;
G.flight = null;
if (F.left > 0) {
G.holder = F.shooter;
F.wait = 1.4;
if (G.ftMe)
sptMeter(G, true, "Free throw " + (F.n - F.left + 1) + " of " + F.n + ": press E in the green");
return;
}
G.ft = null;
G.frozen = null;
G.ftMe = false;
sptMeter(G, false);
G.state = "live";
if (made) {
var other = F.team === "h" ? G.a : G.h, a = other[0];
if (a.human)
sptPutMe(G, H.x + H.dir * 1.6, G.V.cz + 1.4, -H.dir);
else {
a.x = a.tx = H.x + H.dir * 1.6;
a.z = a.tz = G.V.cz + 1.4;
}
sptBbGive(G, a);
}
else {
var def = F.team === "h" ? G.a : G.h, r = Math.random() < 0.75 ? sptNearest(def, H.x, H.z).a : sptNearest(F.team === "h" ? G.h : G.a, H.x, H.z).a;
G.flight = { a: [H.x, 3.05, H.z], b: [r.x, 1.3, r.z], t: 0, T: 0.5, h: 0.6, to: r, kind: "reb" };
}
}, 1150);
sptSay("🏀 " + (made ? "Good." : "Off the rim."), 2);
},
function (G, dt) {
var V = G.V, offT = G.poss === "h" ? G.h : G.a, defT = G.poss === "h" ? G.a : G.h, H = sptBbHoop(G, G.poss);
G.mv = (G.mv || 0) - dt;
var re = G.mv <= 0;
if (re)
G.mv = 2.2 + Math.random();
offT.forEach(function (a, i) {
if (a.human)
return;
if (re || a.tx === undefined) {
var s = SPT_BB_SPOTS[i];
a.tx = H.x + H.dir * s[0] + (Math.random() - 0.5) * 1.6;
a.tz = H.z + s[1] + (Math.random() - 0.5) * 1.6;
}
if (a === G.holder && G.drive) {
a.tx = H.x - H.dir * 0.9;
a.tz = H.z;
}
});
var hi = -1, swap = -1;
defT.forEach(function (a, i) { if (a.human)
hi = i; });
if (hi >= 0) {
var hm = defT[hi], nm = sptNearest(offT, hm.x, hm.z);
if (nm.a && nm.d < 3.5)
swap = offT.indexOf(nm.a);
}
defT.forEach(function (a, i) {
if (a.human)
return;
var m = offT[i];
if (hi >= 0) {
if (i === swap)
m = offT[hi];
else if (swap < 0 && i === (hi + 1) % 5) {
m = G.holder && offT.indexOf(G.holder) >= 0 ? G.holder : offT[hi];
}
}
a.tx = m.x + (H.x - m.x) * 0.25;
a.tz = m.z + (H.z - m.z) * 0.25;
a.sp = 6.4;
});
if (G.flight || !G.holder || G.holder.human)
return;
G.dec -= dt;
if (G.dec > 0)
return;
G.dec = 0.6 + Math.random() * 0.5;
var a = G.holder, team = sptBbTeam(G, a), mates = (team === "h" ? G.h : G.a).filter(function (m) { return m !== a; }), d = Math.hypot(a.x - H.x, a.z - H.z), opp = sptNearest(team === "h" ? G.a : G.h, a.x, a.z);
if (opp.d < 1.1 && !opp.a.human && Math.random() < 0.035) {
G.flight = { a: [a.x, 1, a.z], b: [opp.a.x, 1, opp.a.z], t: 0, T: 0.25, h: 0.1, to: opp.a, kind: "steal" };
G.holder = null;
sptSay("🏀 Stolen!", 2);
return;
}
if (sptBbInBack(G, a)) {
a.tx = H.x - H.dir * 7;
G.drive = false;
return;
}
if (team === "h" && (G.wantBall || Math.random() < 0.3) && G.me) {
var md = sptNearest(G.a, G.me.x, G.me.z).d;
if (md > 1.6 || G.wantBall) {
G.wantBall = false;
sptBbPass(G, a, G.me);
return;
}
}
if (d < 1.8 && opp.d > 0.8 || G.shot < 4 || (opp.d > 2.2 && d < SPT_ARC + 1.5 && Math.random() < 0.4)) {
G.drive = false;
sptBbShoot(G, a);
return;
}
if (opp.d > 2 && d < 9 && Math.random() < 0.35) {
G.drive = true;
return;
}
var to = mates.filter(function (m) { return !m.human || team === "a"; })[Math.floor(Math.random() * (mates.length - (team === "h" ? 1 : 0)))] || mates[0];
G.drive = false;
sptBbPass(G, a, to);
},
function (G, k) {
if (G.state === "ft") {
if (k === "act" && G.ftMe && !G.flight && G.ft && G.ft.wait <= 0.8) {
var s = sptMeterScore(G), p = 0.2 + s * 0.85 + (G.skill.ft || 0) * 0.006;
sptMeter(G, false);
sptBbFtShot(G, Math.random() < Math.min(0.97, p));
}
return;
}
if (k === "time") {
if (G.tos[0] <= 0) {
sptSay("No time-outs left.", 3);
return;
}
if (G.state !== "live" && G.state !== "dead")
return;
if (G.state === "live" && (G.poss !== "h" || G.flight)) {
sptSay("Only the side with the ball (or a dead ball) may call a time-out.", 3);
return;
}
G.tos[0]--;
var hold = G.holder, was = G.then;
G.state = "timeout";
G.timer = G.len === "real" ? 60 : 15;
G.then = was || function () { if (hold)
sptBbGive(G, hold); };
sptSay("⏱️ <b>Time-out.</b> The clock stops. Press E to go back on.", 4);
return;
}
if (G.state !== "live")
return;
if (k === "act") {
if (G.holder === G.me) {
sptBbShoot(G, G.me);
return;
}
if (G.poss === "a" && G.holder && G.cool <= 0) {
G.cool = 1.2;
var d = Math.hypot(G.holder.x - G.me.x, G.holder.z - G.me.z);
if (d > 1.7) {
sptSay("Get closer to the ball first.", 2);
return;
}
var r = Math.random(), pSteal = 0.26 + (G.skill.tackle || 0) * 0.006;
if (r < pSteal) {
G.stats["Your steals"]++;
var from = G.holder;
G.holder = null;
G.flight = { a: [from.x, 1, from.z], b: [G.me.x, 1, G.me.z], t: 0, T: 0.2, h: 0.1, to: G.me, kind: "steal" };
sptSay("🏀 <b>You steal it!</b>", 3);
}
else if (r < pSteal + 0.18) {
G.tf[0]++;
var bonus = G.tf[0] >= 5, sh = G.holder;
sptSay("🏀 A foul on you" + (bonus ? ": they're in the bonus." : "."), 3);
if (bonus)
sptBbFts(G, sh, 2, "a");
else
sptBbDead(G, 2, function () { sptBbGive(G, sh); }, null);
}
else
sptSay("Missed the steal.", 2);
return;
}
if (G.flight && G.flight.kind === "shot" && G.flight.team === "a" && G.flight.t < 0.25 && Math.hypot(G.flight.shooter.x - G.me.x, G.flight.shooter.z - G.me.z) < 1.3 && Math.random() < 0.35 + (G.skill.tackle || 0) * 0.01) {
var F = G.flight;
F.made = false;
F.foul = false;
F.b = [G.me.x + 2, 0.3, G.me.z];
sptSay("🏀 <b>Blocked!</b>", 3);
}
return;
}
if (k === "pass") {
if (G.holder === G.me) {
var f = sptFwd(), best = null, bs = -2;
G.h.forEach(function (m) { if (m === G.me)
return; var dx = m.x - G.me.x, dz = m.z - G.me.z, d = Math.hypot(dx, dz) || 1, s = (dx * f[0] + dz * f[1]) / d - d * 0.01; if (s > bs) {
bs = s;
best = m;
} });
if (best)
sptBbPass(G, G.me, best);
return;
}
if (G.poss === "h") {
G.wantBall = true;
sptSay("🙋 You call for the ball.", 2);
}
}
},
function (G) {
var V = G.V;
for (var i = 0; i < 11; i++) {
var gh = sptKit(G.H, "fb", i), ga = sptKit(G.A, "fb", i);
G.root.add(gh);
G.root.add(ga);
G.h.push(sptMover(gh, V.cx - 10, V.cz - 20 + i * 4, 6.6 + (G.H.rating - 70) * 0.03));
G.a.push(sptMover(ga, V.cx + 10, V.cz - 20 + i * 4, 6.6 + (G.A.rating - 70) * 0.03));
}
for (var r = 0; r < (SPT.lite ? 2 : 4); r++) {
var gr = sptKit(G.H, "fb", r, true);
G.root.add(gr);
G.refs.push(sptMover(gr, V.cx, V.cz + SPT_FW / 2 + 1, 5));
}
G.stats = { "Your yards": 0, "Your touchdowns": 0, "Your tackles": 0, "Passes completed": 0 };
G.tos = [3, 3];
G.first = Math.random() < 0.5 ? "h" : "a";
G.running = false;
G.pc = 0;
G.me = G.h[1];
G.me.g.visible = false;
sptPutMe(G, V.cx - 20, V.cz + 5, 1);
G.state = "dead";
G.timer = 3;
G.then = function () { sptFbKickoff(G, G.first === "h" ? "a" : "h", 40); };
},
function (G, kicker, from) {
var rec = kicker === "h" ? "a" : "h", V = G.V, kx = sptFbX(G, kicker, from || 40), d = sptFbDir(G, kicker), K = sptFbTeam(G, kicker), R = sptFbTeam(G, rec);
G.poss = rec;
G.down = 0;
G.running = false;
K.forEach(function (a, i) { a.x = a.tx = kx - d * (i === 0 ? 4 : 1); a.z = a.tz = V.cz - 22 + i * 4.4; });
R.forEach(function (a, i) { var deep = i === 1; a.x = a.tx = kx + d * (deep ? 55 : i < 5 ? 22 : i < 8 ? 30 : 40); a.z = a.tz = V.cz + (deep ? 0 : -18 + (i % 6) * 7); });
G.retMan = R[1];
if (rec === "h")
sptFbSetMe(G, R[1]);
else
sptFbSetMe(G, K[5]);
var tb = Math.random() < 0.3, land = kx + d * (tb ? 62 : 52) * SPT_YD;
G.flight = { a: [kx, 0.2, V.cz], b: [land, 1.1, V.cz + (Math.random() - 0.5) * 8], t: 0, T: 3.4, h: 18, kind: "kick", tb: tb };
G.holder = null;
G.state = "play";
G.play = { kind: "ko", kicker: kicker, t: 0 };
G.note = "kick-off";
sptSay("🏈 " + (rec === "h" ? "<b>The kick-off.</b> You are the returner: catch it and run." : "<b>The kick-off.</b> Get down the field and tackle the returner."), 4);
},
function (G, admin) {
var V = G.V;
G.state = "huddle";
G.pc = admin ? 25 : 40;
G.call = null;
G.dcall = "base";
G.canThrow = false;
G.note = "";
G.flight = null;
G.holder = null;
G.kicking = false;
if (G.q > 4)
G.running = false;
var off = G.poss, los = sptFbX(G, off, G.spot), d = sptFbDir(G, off), O = sptFbTeam(G, off), D = sptFbTeam(G, off === "h" ? "a" : "h");
O.forEach(function (a, i) { var p = SPT_FB_OFF[i]; a.tx = los + d * p[0]; a.tz = V.cz + p[1]; a.face = d > 0 ? Math.PI / 2 : -Math.PI / 2; a.sp = 6.6; a.eng = 0; });
D.forEach(function (a, i) { var p = SPT_FB_DEF[i]; a.tx = los + d * p[0]; a.tz = V.cz + p[1]; a.face = d > 0 ? -Math.PI / 2 : Math.PI / 2; a.sp = 6.6; a.eng = 0; a.blitz = a.deep = false; });
G.refs.forEach(function (a, i) { a.tx = los + (i % 2 ? 1 : -1) * (i < 2 ? 6 : 14); a.tz = V.cz + (i < 2 ? -SPT_FW / 2 - 1 : SPT_FW / 2 + 1); });
if (off === "h") {
var rb = O[1];
rb.x = rb.tx;
rb.z = rb.tz;
sptFbSetMe(G, rb);
sptFbCallPanel(G, true);
}
else {
var lb = D[5];
lb.x = lb.tx;
lb.z = lb.tz;
sptFbSetMe(G, lb);
G.aiSnap = 6 + Math.random() * (G.running ? 28 : 14);
sptFbCallPanel(G, true);
}
G.losX = los;
G.gainX = sptFbX(G, off, Math.min(100, G.spot + G.togo));
sptFbChains(G);
},
function (G, on) {
var el = document.getElementById("spt-call");
if (!el) {
el = document.createElement("div");
el.id = "spt-call";
el.style.cssText = "position:fixed;left:12px;top:50%;transform:translateY(-50%);z-index:59;width:220px;padding:8px;border-radius:8px;background:rgba(8,12,22,.86);color:#F4F0E4;font:13px/1.35 var(--sans,system-ui)";
el.addEventListener("click", function (e) { var b = e.target.closest("[data-call]"); if (!b)
return; e.preventDefault(); e.stopPropagation(); sptFbChoose(SPT.game, +b.getAttribute("data-call")); });
document.body.appendChild(el);
}
if (!on || !G) {
el.style.display = "none";
return;
}
var off = G.poss === "h", list = off ? SPT_PLAYS : SPT_DEFS, cur = off ? G.call : G.dcall;
el.innerHTML = "<div style='font-weight:600;margin-bottom:4px'>" + (off ? "Call the play (1-7), then E to snap" : "Call the defence (1-3)") + "</div>" + list.map(function (p, i) {
var dim = off && ((p[0] === "punt" || p[0] === "fg") && G.down < 4 && G.q <= 4 ? false : false);
return "<div data-call='" + i + "' role='button' style='cursor:pointer;margin:3px 0;padding:5px 7px;border-radius:5px;border:1px solid " + (cur === p[0] ? "#F0C040" : "rgba(143,180,232,.4)") + ";background:" + (cur === p[0] ? "rgba(240,192,64,.15)" : "transparent") + (dim ? ";opacity:.5" : "") + "'><b>" + (i + 1) + "</b> " + sptEsc(p[1]) + (p[2] ? "<div style='opacity:.7;font-size:11.5px'>" + sptEsc(p[2]) + "</div>" : "") + "</div>";
}).join("");
el.style.display = "block";
},
function (G, i) {
if (!G || G.state !== "huddle")
return;
if (G.poss === "h") {
var p = SPT_PLAYS[i];
if (!p)
return;
G.call = p[0];
var O = G.h;
var who = p[0] === "quick" || p[0] === "deep" || p[0] === "kneel" ? O[0] : p[0] === "fg" || p[0] === "punt" ? O[0] : O[1];
if (p[0] === "fg" || p[0] === "punt") {
O[0].tx = G.losX - sptFbDir(G, "h") * (p[0] === "punt" ? 13 : 7);
}
else if (p[0] === "quick" || p[0] === "deep") {
O[0].tx = G.losX - sptFbDir(G, "h") * 4.5;
}
else
O[0].tx = G.losX - sptFbDir(G, "h") * 1.2;
who.x = who.tx;
who.z = who.tz;
sptFbSetMe(G, who);
}
else {
var dd = SPT_DEFS[i];
if (!dd)
return;
G.dcall = dd[0];
}
sptFbCallPanel(G, true);
},
function (G) {
var off = G.poss, O = sptFbTeam(G, off), D = sptFbTeam(G, off === "h" ? "a" : "h"), d = sptFbDir(G, off), V = G.V, los = G.losX;
if (off === "a" && !G.call)
G.call = sptFbAiCall(G);
if (off === "h" && !G.call) {
G.call = "run";
}
sptFbCallPanel(G, false);
var c = G.call;
G.state = "play";
G.play = { kind: c, t: 0, off: off, los: los, spot0: G.spot, d: d };
G.note = "";
G.pc = 0;
O.concat(D).forEach(function (a) { a.x = a.tx; a.z = a.tz; a.face = null; a.eng = 0; });
if (G.me)
sptPutMe(G, G.me.x, G.me.z, sptFbDir(G, sptFbSide(G, G.me)));
G.holder = O[0];
G.canThrow = c === "quick" || c === "deep";
if (c === "kneel") {
sptFbEnd(G, O[0], "kneel");
return;
}
if (c === "punt" || c === "fg") {
G.flight = null;
G.holder = O[0];
G.kicking = true;
if (off === "h" && c === "fg") {
G.frozen = [G.me.x, G.me.z];
sptMeter(G, true, "The kick: press E when the marker is in the green");
}
G.play.kickAt = off === "h" && c === "fg" ? 99 : 1.3;
return;
}
var deep = c === "deep";
[2, 3, 4, 5].forEach(function (j, k) { var r = O[j], depth = (deep ? [22, 20, 14, 11] : [6, 7, 5, 4])[k] + Math.random() * 3; r.route = [[los + d * depth * SPT_YD, r.z + (deep ? 0 : (r.z > V.cz ? -6 : 6))], [los + d * (depth + 25) * SPT_YD, r.z + (deep ? (r.z > V.cz ? -4 : 4) : 0)]]; r.tx = r.route[0][0]; r.tz = r.route[0][1]; r.leg = 0; });
O[1].tx = los - d * 2;
O[1].tz = V.cz + (c === "sweep" ? (Math.random() < 0.5 ? -10 : 10) : 1.5);
if (c === "run" || c === "sweep") {
G.handT = 0.7;
G.canThrow = false;
}
if (off === "a") {
if (G.dcall === "blitz") {
D[4].blitz = D[6].blitz = true;
}
if (G.dcall === "prevent") {
D[9].deep = D[10].deep = true;
}
}
G.snapT = 0;
},
function (G) {
var lead = G.sc[1] - G.sc[0], late = G.q === 4 && G.clk < 180, fd = 100 - G.spot + 17;
if (late && lead > 0 && G.running)
return "kneel";
if (G.down === 4 && G.q <= 4) {
if (fd <= 48 && G.togo > 1)
return "fg";
if (!(G.togo <= 2 && G.spot >= 40) && !(late && lead < 0))
return "punt";
}
if (G.q > 4 && G.down === 4)
return "fg";
var pp = (G.togo >= 7 ? 0.62 : G.togo <= 2 ? 0.28 : 0.45) + (late && lead < 0 ? 0.3 : 0);
return Math.random() < pp ? (Math.random() < 0.3 ? "deep" : "quick") : (Math.random() < 0.3 ? "sweep" : "run");
},
function (G, dt) {
var V = G.V;
sptMeTick(G, dt);
if (G.state === "dead") {
G.timer -= dt;
if (G.running && G.q <= 4) {
G.clk -= dt;
}
if (G.timer <= 0) {
var f = G.then;
G.then = null;
if (f)
f();
}
}
else if (G.state === "break" || G.state === "timeout") {
G.timer -= dt;
G.note = (G.state === "break" ? (G.q === 3 ? "half time " : "between quarters ") : "time-out ") + sptClock(G.timer);
if (G.timer <= 0) {
G.note = "";
var f2 = G.then;
G.then = null;
if (f2)
f2();
}
}
else if (G.state === "huddle") {
G.pc -= dt;
if (G.running && G.q <= 4)
G.clk -= dt;
if (G.q <= 4 && G.clk <= 0) {
G.clk = 0;
sptFbPeriodEnd(G);
}
else if (G.poss === "a" && G.pc <= 40 - G.aiSnap)
sptFbSnap(G);
else if (G.pc <= 0) {
G.spot = Math.max(1, G.spot - 5);
G.togo = Math.min(G.togo + 5, 100 - G.spot);
sptSay("🚩 <b>Delay of game</b> on you: five yards, the down again.", 4);
sptFbHuddle(G, true);
}
}
else if (G.state === "play")
sptFbPlayTick(G, dt);
G.h.concat(G.a).forEach(function (a) { if (a !== G.me)
sptMove(a, dt, 0); });
G.refs.forEach(function (a) { sptMove(a, dt, 0); });
sptFbBall(G, dt);
G.cool = Math.max(0, G.cool - dt);
sptHudPaint(G);
},
function (G, dt) {
var F = G.flight, b = G.ball;
if (F) {
F.t += dt;
var k = Math.min(1, F.t / F.T);
b.position.set(F.a[0] + (F.b[0] - F.a[0]) * k, F.a[1] + (F.b[1] - F.a[1]) * k + Math.sin(k * Math.PI) * F.h, F.a[2] + (F.b[2] - F.a[2]) * k);
b.rotation.z += dt * 8;
if (k >= 1) {
G.flight = null;
sptFbLand(G, F);
}
return;
}
if (G.holder === G.me)
sptBallInHand(G);
else if (G.holder) {
var a = G.holder;
b.position.set(a.x + Math.sin(a.g.rotation.y) * 0.3, 1.15, a.z + Math.cos(a.g.rotation.y) * 0.3);
}
},
function (G, dt) {
var P = G.play, V = G.V;
P.t += dt;
if (G.q <= 4)
G.clk -= dt;
var off = P.off || G.poss, O = sptFbTeam(G, off), D = sptFbTeam(G, off === "h" ? "a" : "h"), d = P.d || sptFbDir(G, off);
if (P.kind === "ko") {
var K = sptFbTeam(G, P.kicker), Rt = sptFbTeam(G, P.kicker === "h" ? "a" : "h");
if (G.flight) {
var F = G.flight;
if (G.retMan !== G.me) {
G.retMan.tx = F.b[0];
G.retMan.tz = F.b[2];
}
K.forEach(function (a) { if (a !== G.me) {
a.tx = F.b[0] - sptFbDir(G, P.kicker) * 6;
a.tz = a.z;
} });
return;
}
sptFbChase(G, Rt, K, dt);
return;
}
if (G.kicking) {
if (P.t >= P.kickAt && !G.flight && G.holder) {
var kind = P.kind, D2 = sptFbDir(G, off);
if (kind === "punt") {
var net = Math.round(sptBell(Math.random, 37, 6)), land = Math.min(100, G.spot + net);
G.flight = { a: [O[0].x, 1, O[0].z], b: [sptFbX(G, off, Math.min(land, 100)), 0.3, V.cz], t: 0, T: 4, h: 20, kind: "punt", land: land };
}
else {
var dist = 100 - G.spot + 17, p = Math.max(0.12, Math.min(0.97, 1.04 - (dist - 17) * 0.019 + ((off === "h" ? G.H : G.A).rating - 70) * 0.003));
if (off === "h")
p = Math.min(0.98, p * 0.5 + (G.kickScore || 0) * 0.55 + (G.skill.kick || 0) * 0.01);
var good = Math.random() < p;
G.flight = { a: [O[0].x + D2 * 0.6, 0.2, V.cz], b: [V.cx + D2 * (SPT_FL / 2 + 0.6), good ? 5.2 : 2.2, V.cz + (good ? (Math.random() - 0.5) * 4 : (Math.random() < 0.5 ? -6 : 6))], t: 0, T: 2, h: 9, kind: "fg", good: good, dist: dist };
}
G.holder = null;
}
return;
}
if ((P.kind === "run" || P.kind === "sweep") && G.handT !== null && P.t >= G.handT) {
G.handT = null;
G.holder = O[1];
if (off === "a") {
O[1].tx = P.los + d * 12;
}
}
if (G.holder === O[0] && (P.kind === "quick" || P.kind === "deep") && O[0] !== G.me) {
O[0].tx = P.los - d * 6.5;
O[0].tz = V.cz;
var rush = sptNearest(D, O[0].x, O[0].z), wait = P.kind === "deep" ? 2.6 : 1.6;
if (P.t > wait || (rush.d < 1.6 && P.t > 1))
sptFbAiThrow(G, O, D, d);
}
if (G.holder === G.me && G.canThrow && (sptFbSpot(G, off, G.me.x) > G.spot + 0.3)) {
G.canThrow = false;
sptSay("Past the line: you can't throw now. Run!", 3);
}
[2, 3, 4, 5].forEach(function (j) { var r = O[j]; if (r === G.me || r === G.holder || !r.route)
return; if (Math.hypot(r.x - r.tx, r.z - r.tz) < 1 && r.leg < 1) {
r.leg = 1;
r.tx = r.route[1][0];
r.tz = r.route[1][1];
} });
for (var j = 6; j < 11; j++) {
var bl = O[j], dl = sptNearest(D.slice(0, 4).concat(D[4].blitz ? [D[4]] : []).concat(D[6].blitz ? [D[6]] : []), bl.x, bl.z).a;
if (!dl)
continue;
if (!dl.eng && Math.hypot(bl.x - dl.x, bl.z - dl.z) < 1.3) {
dl.eng = 1.5 + Math.random() * 2 * (1 + ((off === "h" ? G.H : G.A).rating - (off === "h" ? G.A : G.H).rating) * 0.02);
}
bl.tx = dl.x - d * 0.6;
bl.tz = dl.z;
}
D.forEach(function (a) { if (a.eng > 0) {
a.eng -= dt;
a.sp = 0.6;
if (a.eng <= 0)
a.eng = -1;
}
else
a.sp = a === G.me ? a.sp : 6.5; });
if (G.flight) {
var F2 = G.flight;
D.forEach(function (a, i) { if (a === G.me)
return; if (i >= 7 || (i >= 4 && !a.blitz)) {
a.tx = F2.b[0];
a.tz = F2.b[2];
} });
if (F2.to && F2.to !== G.me) {
F2.to.tx = F2.b[0];
F2.to.tz = F2.b[2];
}
return;
}
if (!G.holder)
return;
sptFbChase(G, O, D, dt);
},
function (G, O, D, dt) {
var V = G.V, a = G.holder, side = sptFbSide(G, a), d = sptFbDir(G, side), P = G.play;
if (a === O[0] && G.canThrow) {
D.forEach(function (df, i) {
if (df === G.me || df.eng > 0)
return;
if (i < 4 || df.blitz) {
df.tx = a.x;
df.tz = a.z;
return;
}
var m = i === 7 ? O[2] : i === 8 ? O[3] : i === 9 ? O[4] : i === 10 ? O[5] : null;
if (m) {
df.tx = m.x + d * (df.deep ? 5 : 1.5);
df.tz = m.z;
}
else {
df.tx = P.los + d * 7 * SPT_YD;
df.tz = V.cz + (i - 5) * 7;
}
});
for (var t = 0; t < D.length; t++) {
var q = D[t];
if (Math.hypot(q.x - a.x, q.z - a.z) < (q === G.me ? (G.dive > 0 ? 1.7 : 1.05) : 0.95) && !(q.eng > 0) && Math.random() < 0.25) {
if (q === G.me)
G.stats["Your tackles"]++;
sptSay("🏈 <b>Sacked!</b>", 2);
sptFbEnd(G, a, "tackle", q);
return;
}
}
return;
}
if (a !== G.me) {
var near = sptNearest(D, a.x + d * 3, a.z), dodge = near.a && near.d < 6 ? (a.z > near.a.z ? 1 : -1) * 4 : 0;
a.tx = a.x + d * 10;
a.tz = Math.max(V.cz - SPT_FW / 2 + 2, Math.min(V.cz + SPT_FW / 2 - 2, a.z + dodge));
a.sp = 6.9 + ((side === "h" ? G.H : G.A).rating - 70) * 0.03;
}
var vx = (a.tx - a.x), vz = (a.tz - a.z), vl = Math.hypot(vx, vz) || 1;
D.forEach(function (df, i) {
if (df === G.me || df.eng > 0)
return;
var dist = Math.hypot(df.x - a.x, df.z - a.z), lead = Math.min(1.2, dist / 7);
df.tx = a.x + vx / vl * a.sp * lead * (a === G.me ? 0.7 : 1);
df.tz = a.z + vz / vl * a.sp * lead * (a === G.me ? 0.7 : 1);
if (df.deep && dist > 14) {
df.tx = a.x + d * 8;
}
});
O.forEach(function (o, i) { if (o === a || o === G.me || i >= 6)
return; var t = sptNearest(D, a.x + d * 4, a.z).a; if (t) {
o.tx = t.x - d * 0.5;
o.tz = t.z;
} });
var spot = sptFbSpot(G, side, a.x);
if (Math.abs(a.z - V.cz) > SPT_FW / 2) {
sptFbEnd(G, a, "oob");
return;
}
if (spot >= 100) {
sptFbEnd(G, a, "td");
return;
}
G.tk = (G.tk || 0) - dt;
if (G.tk > 0)
return;
G.tk = 0.18;
for (var i = 0; i < D.length; i++) {
var df = D[i], dd = Math.hypot(df.x - a.x, df.z - a.z), reach = df === G.me ? (G.dive > 0 ? 1.7 : 1.05) : 0.95;
if (dd < reach && !(df.eng > 0)) {
var p = (df === G.me ? 0.8 + (G.skill.tackle || 0) * 0.01 : 0.55) - (a === G.me ? (G.skill.run || 0) * 0.012 : 0);
if (Math.random() < p) {
if (df === G.me)
G.stats["Your tackles"]++;
sptFbEnd(G, a, "tackle", df);
return;
}
if (a === G.me)
sptSay("💪 You break a tackle!", 2);
df.eng = 0.6;
}
}
},
function (G, qb, r) {
var dx = r.tx - r.x, dz = r.tz - r.z, dl = Math.hypot(dx, dz) || 1, dist = Math.hypot(r.x - qb.x, r.z - qb.z), T = dist / 19 + 0.25, lead = Math.min(r.sp * T, dl);
var bx = r.x + dx / dl * lead, bz = r.z + dz / dl * lead;
G.flight = { a: [qb.x, 2, qb.z], b: [bx, 1.4, bz], t: 0, T: T, h: Math.min(8, dist * 0.12), kind: "pass", to: r, from: qb };
G.holder = null;
G.canThrow = false;
},
function (G, F) {
var V = G.V, P = G.play;
if (F.kind === "kick") {
var rec = P.kicker === "h" ? "a" : "h";
if (F.tb) {
G.poss = rec;
G.spot = 20;
G.down = 1;
G.togo = 10;
sptFbDead(G, 2.5, function () { sptFbHuddle(G, true); }, "Into the end zone: a touchback. The ball comes out to the 20.");
return;
}
G.holder = G.retMan;
if (G.retMan !== G.me) {
G.retMan.x = F.b[0];
G.retMan.z = F.b[2];
}
else
sptPutMe(G, F.b[0], F.b[2], sptFbDir(G, rec));
G.play = { kind: "ret", t: 0, off: rec, d: sptFbDir(G, rec), los: F.b[0], spot0: sptFbSpot(G, rec, F.b[0]) };
G.poss = rec;
return;
}
if (F.kind === "punt") {
var r2 = P.off === "h" ? "a" : "h";
G.poss = r2;
G.spot = F.land >= 100 ? 20 : Math.max(1, 100 - F.land);
G.down = 1;
G.togo = 10;
G.kicking = false;
G.running = false;
sptFbDead(G, 3, function () { sptFbHuddle(G, true); }, (P.off === "h" ? "Your punt" : "Their punt") + (F.land >= 100 ? ": a touchback." : " goes " + (F.land - P.spot0) + " yards."));
return;
}
if (F.kind === "fg" || F.kind === "pat") {
G.kicking = false;
G.frozen = null;
var side = P.off, i = side === "h" ? 0 : 1;
if (F.kind === "pat") {
if (F.good)
G.sc[i] += 1;
sptFbDead(G, 3, function () { sptFbAfterScore(G, side); }, "The kick after: " + (F.good ? "good." : "no good!"));
return;
}
if (F.good) {
G.sc[i] += 3;
sptFbDead(G, 3, function () { sptFbAfterScore(G, side); }, "The " + F.dist + "-yard field goal is <b>GOOD!</b>");
}
else {
G.poss = side === "h" ? "a" : "h";
G.spot = Math.max(20, 100 - P.spot0);
G.down = 1;
G.togo = 10;
G.running = false;
sptFbDead(G, 3, function () { G.q > 4 ? sptFbOtNext(G) : sptFbHuddle(G, true); }, "The " + F.dist + "-yard field goal is no good.");
}
return;
}
if (F.kind === "pass") {
var r = F.to, D = sptFbTeam(G, P.off === "h" ? "a" : "h"), lx = F.b[0], lz = F.b[2], rd = Math.hypot(r.x - lx, r.z - lz), dn = sptNearest(D, lx, lz);
var catchP = rd < 1.6 ? 0.86 + (r === G.me ? (G.skill.catch_ || 0) * 0.006 : 0) : rd < 2.6 ? 0.4 : 0;
if (dn.d < 1.2 && Math.random() < (dn.a === G.me ? 0.35 : 0.14)) {
G.holder = dn.a;
G.poss = P.off === "h" ? "a" : "h";
P.off = G.poss;
P.d = sptFbDir(G, G.poss);
G.turn = true;
sptSay("🏈 <b>INTERCEPTED!</b>", 3);
if (dn.a === G.me)
sptPutMe(G, G.me.x, G.me.z, P.d);
return;
}
if (dn.d < 1.0 && Math.random() < 0.35)
catchP *= 0.3;
if (Math.random() < catchP) {
r.x = lx;
r.z = lz;
G.holder = r;
G.stats["Passes completed"] += P.off === "h" ? 1 : 0;
if (P.off === "h") {
sptFbSetMe(G, r);
sptSay("🏈 <b>Caught!</b> Run!", 2);
}
return;
}
sptFbEnd(G, null, "inc");
return;
}
},
function (G, a, how, by) {
var P = G.play, side = G.poss, V = G.V;
G.flight = null;
G.kicking = false;
if (G.two) {
var made2 = how === "td";
G.two = false;
if (made2)
G.sc[side === "h" ? 0 : 1] += 2;
G.running = false;
sptFbDead(G, 3, function () { sptFbAfterScore(G, "h"); }, made2 ? "🎉 <b>Two points!</b>" : "The try for two is stopped.");
return;
}
if (how === "kneel") {
G.spot = Math.max(1, G.spot - 1);
G.down++;
G.togo++;
G.running = true;
return sptFbNext(G, "Take a knee.");
}
if (how === "inc") {
G.running = false;
G.down++;
return sptFbNext(G, "Incomplete.");
}
var spot = Math.round(sptFbSpot(G, side, a.x));
var gain = spot - (P.spot0 !== undefined ? P.spot0 : G.spot);
if (side === "h" && (a === G.me || G.h.indexOf(a) >= 0))
G.stats["Your yards"] += Math.max(0, a === G.me ? gain : 0);
if (how === "td") {
G.sc[side === "h" ? 0 : 1] += 6;
if (a === G.me)
G.stats["Your touchdowns"]++;
G.running = false;
sptFbDead(G, 3, function () { sptFbTry(G, side); }, "🎉 <b>TOUCHDOWN " + sptEsc(side === "h" ? G.H.mascot : G.A.mascot) + "!</b>");
return;
}
if (spot <= 0 && !G.turn) {
var other = side === "h" ? "a" : "h";
G.sc[other === "h" ? 0 : 1] += 2;
G.running = false;
sptFbDead(G, 3, function () { sptFbKickoff(G, side, 20); }, "<b>SAFETY!</b> Two points, and a free kick from the 20.");
return;
}
if (G.turn || P.kind === "ret") {
G.turn = false;
G.poss = side;
G.spot = Math.max(1, Math.min(99, spot));
G.down = 1;
G.togo = Math.min(10, 100 - G.spot);
G.running = false;
return sptFbDead(G, 2.5, function () { G.q > 4 ? sptFbOtNext(G) : sptFbHuddle(G, true); }, (P.kind === "ret" ? "The return to " + sptYdL(G, side === "h" ? G.spot : 100 - G.spot) + "." : "A change of possession."));
}
G.running = how !== "oob";
G.spot = Math.max(1, Math.min(99, spot));
if (gain >= G.togo) {
G.down = 1;
G.togo = Math.min(10, 100 - G.spot);
return sptFbNext(G, (how === "oob" ? "Out of bounds. " : "") + "<b>First down!</b>");
}
G.down++;
G.togo -= gain;
sptFbNext(G, (how === "oob" ? "Out of bounds after " : "Down after ") + gain + " yard" + (Math.abs(gain) === 1 ? "" : "s") + ".");
},
function (G, why) {
if (G.down > 4) {
G.poss = G.poss === "h" ? "a" : "h";
G.spot = 100 - G.spot;
G.down = 1;
G.togo = Math.min(10, 100 - G.spot);
G.running = false;
why += " <b>Turnover on downs.</b>";
if (G.q > 4)
return sptFbDead(G, 2.5, function () { sptFbOtNext(G); }, why);
}
sptFbDead(G, 2.5, function () { if (G.q <= 4 && G.clk <= 0) {
G.clk = 0;
sptFbPeriodEnd(G);
}
else
sptFbHuddle(G, false); }, why);
},
function (G, side) {
if (side === "a") {
var good = Math.random() < 0.94;
if (good)
G.sc[1]++;
sptFbDead(G, 2.5, function () { sptFbAfterScore(G, "a"); }, "Their kick after: " + (good ? "good." : "no good!"));
return;
}
worldCard(worldFacts("The try", "Kick for one, or go for two from the 3-yard line?", [], []) + worldBtn("k", "Kick for one", "the timing bar") + worldBtn("t", "Go for two", "one play from the 3"), { k: function () {
worldCard(null);
G.play = { kind: "pat", off: "h", t: 0, spot0: 97, d: sptFbDir(G, "h") };
G.spot = 97;
var O = G.h;
sptFbHuddle(G, true);
sptFbCallPanel(G, false);
G.state = "play";
G.kicking = true;
G.holder = O[0];
O[0].x = O[0].tx = G.losX - sptFbDir(G, "h") * 7;
sptFbSetMe(G, O[0]);
G.frozen = [G.me.x, G.me.z];
G.play.kickAt = 99;
sptMeter(G, true, "The kick after: press E in the green");
},
t: function () { worldCard(null); G.spot = 97; G.down = 4; G.togo = 3; G.two = true; sptFbHuddle(G, true); } });
},
function (G) {
G.state = "break";
G.holder = null;
G.flight = null;
var half = G.q === 2, last = G.q === 4;
if (last && G.sc[0] !== G.sc[1]) {
sptSay("🏈 <b>That's the game!</b>", 5);
sptGameOver(G);
return;
}
if (last) {
G.q = 5;
G.timer = G.len === "real" ? 180 : 10;
G.ot = { turn: 0, first: Math.random() < 0.5 ? "h" : "a" };
sptSay("🏈 <b>Tied: overtime.</b> Each side gets a series from the 10-yard line.", 5);
G.then = function () { sptFbOtNext(G, true); };
return;
}
G.q++;
G.clk = G.Q;
G.timer = half ? (G.len === "real" ? 900 : 120) : (G.len === "real" ? 120 : 15);
G.tos = half ? [3, 3] : G.tos;
sptSay("🏈 " + (half ? "<b>Half time.</b>" : "End of the quarter: the teams change ends.") + " Press E to skip the break.", 5);
G.then = half ? function () { sptFbKickoff(G, G.first, 40); } : function () { G.state = "huddle"; sptFbHuddle(G, true); };
},
function (G, first) {
var O = G.ot;
if (!first) {
O.turn++;
if (O.turn % 2 === 0 && G.sc[0] !== G.sc[1]) {
sptSay("🏈 <b>That's the game, in overtime!</b>", 5);
sptGameOver(G);
return;
}
if (O.turn % 2 === 0)
G.q++;
}
G.poss = O.turn % 2 === 0 ? O.first : (O.first === "h" ? "a" : "h");
G.spot = 90;
G.down = 1;
G.togo = 10;
G.running = false;
sptFbHuddle(G, true);
},
function (G, k) {
if (k === "act") {
if (G.state === "huddle" && G.poss === "h") {
if (!G.call) {
sptSay("Call the play first (1 to 7).", 2);
return;
}
sptFbSnap(G);
return;
}
if (G.state === "play" && G.kicking && G.poss === "h" && G.play.kickAt === 99) {
G.kickScore = sptMeterScore(G);
sptMeter(G, false);
G.frozen = null;
if (G.play.kind === "pat") {
var good = Math.random() < Math.min(0.99, 0.45 + G.kickScore * 0.55 + (G.skill.kick || 0) * 0.01);
G.holder = null;
var D = sptFbDir(G, "h");
G.flight = { a: [G.me.x + D * 0.6, 0.2, G.V.cz], b: [G.V.cx + D * (SPT_FL / 2 + 0.6), good ? 5.2 : 2.2, G.V.cz + (good ? 0 : (Math.random() < 0.5 ? -6 : 6))], t: 0, T: 1.6, h: 6, kind: "pat", good: good };
G.play.kickAt = 0;
return;
}
G.play.kickAt = 0;
return;
}
if (G.state === "play" && G.holder === G.me && G.canThrow) {
var f = sptFwd(), best = null, bs = -2;
[2, 3, 4, 5, 1].forEach(function (j) { var r = G.h[j], dx = r.x - G.me.x, dz = r.z - G.me.z, dd = Math.hypot(dx, dz) || 1, s = (dx * f[0] + dz * f[1]) / dd; if (s > bs) {
bs = s;
best = r;
} });
if (best)
sptFbThrow(G, G.me, best);
return;
}
if (G.state === "play" && G.poss === "a" && G.cool <= 0) {
G.cool = 1;
G.dive = 0.5;
setTimeout(function () { G.dive = 0; }, 500);
return;
}
return;
}
if (k === "time") {
if (G.tos[0] <= 0) {
sptSay("No time-outs left this half.", 3);
return;
}
if (G.state !== "huddle" && G.state !== "dead") {
sptSay("A time-out is called between plays.", 3);
return;
}
G.tos[0]--;
G.running = false;
var was = G.state, th = G.then;
G.state = "timeout";
G.timer = G.len === "real" ? 60 : 15;
G.then = was === "huddle" ? function () { sptFbHuddle(G, true); } : th;
sptSay("⏱️ <b>Time-out.</b> The clock stops.", 4);
return;
}
},
function (at) {
var V = SPT.K && SPT.K.venues[at], p;
if (V && V.school) {
p = V.kind === "gym" ? [V.cx, V.cz - SPT_CW / 2 - 3, 0] : [V.cx - 15, V.cz + SPT_FW / 2 + 3, 0];
}
else
p = SPT_ARRIVE[at] || SPT_ARRIVE.plaza;
var y = sptGround(p[0], p[1]);
camera.position.set(SPT.base + p[0], y + 1.72, p[1]);
if (typeof yaw !== "undefined")
yaw = p[2];
if (typeof pitch !== "undefined")
pitch = 0;
if (typeof flyY !== "undefined")
flyY = 0;
},
function (G) {
SPT.G = G;
SPT.lite = sptLite();
SPT.geos = {};
SPT.watch = {};
var K = SPT.K = sptCtx();
K.F = G;
try {
sptBuildAll(G);
}
catch (e) {
if (window.console)
console.warn("[sports] build", e);
}
K.F = G;
try {
if (typeof gwBake === "function") {
K.boards.forEach(function (B) { B.mesh.userData.keep = 1; });
if (SPT.K.league)
SPT.K.league.userData.keep = 1;
gwBake(G);
}
}
catch (e) {
if (window.console)
console.warn("[sports] bake", e);
}
G.traverse(function (o) { if (!o.isSprite)
o.raycast = function () { }; });
SPT.built = true;
SPT.builtCfg = JSON.stringify(sptCfg().schools);
},
function () {
Object.keys(SPT.watch).forEach(sptShowStop);
if (SPT.game)
sptGameEnd(true);
for (var k in SPT.mats) {
var m = SPT.mats[k];
if (m && m.map && m.map.isCanvasTexture)
try {
m.map.dispose();
}
catch (e) { }
if (m && m.dispose)
try {
m.dispose();
}
catch (e) { }
}
for (var g in SPT.geos) {
try {
SPT.geos[g].dispose();
}
catch (e) { }
}
SPT.mats = {};
SPT.geos = {};
SPT.K = null;
SPT.G = null;
SPT.built = false;
SPT.seatMat = null;
SPT.leagueCv = null;
},
function () {
if (SPT.built && SPT.builtCfg !== JSON.stringify(sptCfg().schools) && WLD.w && WLD.w.g) {
var G = WLD.w.g;
while (G.children.length)
G.remove(G.children[0]);
sptForget();
sptBuild(G);
}
sptArrive(SPT.wantAt || "plaza");
SPT.wantAt = null;
sptSay("🏟️ <b>" + sptEsc(sptCfg().arena) + ".</b> The stadium bowl to the west, the Arena Hall to the east, the box office in front of you. Campus Row, every school's own stadium and gym, is down the road to the south.", 8);
},
function (dt) {
var K = SPT.K;
if (!K)
return;
SPT.t += dt;
if (typeof stars !== "undefined" && stars && stars.visible)
stars.visible = false;
var now = Date.now(), L = worldLocal(), feet = L.y - 1.72;
try {
if (SPT.game) {
if (SPT.game.drill)
sptDrillTick(SPT.game, dt);
else if (SPT.game.sport === "bb")
sptBbTick(SPT.game, dt);
else
sptFbTick(SPT.game, dt);
}
SPT.lt = (SPT.lt || 0) - dt;
if (SPT.lt <= 0) {
SPT.lt = 2;
var near = null, nd = 1e9;
for (var id in K.venues) {
var V = K.venues[id], d = Math.hypot(L.x - V.cx, L.z - V.cz);
if (d < nd) {
nd = d;
near = id;
}
var f = C0().live && d < 420 ? sptAtVenue(id, now) : null, W = SPT.watch[id];
if (W && (!f || W.f.id !== f.id))
sptShowStop(id);
if (f && !SPT.watch[id] && !(SPT.game && SPT.game.V === V))
sptShowStart(V, f);
if (!f && !W)
K.boards.forEach(function (B) { if (B.venue === id && d < 420)
sptBoardPaint(B, null); });
}
SPT.near = nd < 160 ? near : null;
if (SPT.relogo) {
SPT.relogo = false;
}
if (SPT.t - (SPT.lpT || -99) > 30) {
SPT.lpT = SPT.t;
sptLeaguePaint();
}
}
for (var w in SPT.watch)
sptShowTick(SPT.watch[w], dt, now);
}
catch (e) {
if (!SPT.e1) {
SPT.e1 = 1;
if (window.console)
console.warn("[sports] tick", e);
}
}
var ar = sptAreaAt(L.x, L.z), live = SPT.near && SPT.watch[SPT.near];
worldBanner("<b>🏟️ " + sptEsc(sptCfg().arena) + "</b>" + (ar ? " · " + sptEsc(ar.name) : "") + (live ? " · <span style='color:#FF8A6A'>LIVE: " + sptEsc(sptSchool(live.f.home).mascot) + " v " + sptEsc(sptSchool(live.f.away).mascot) + "</span>" : ""));
if (SPT.game) {
if (SPT.myFn && WLD.promptFn === SPT.myFn)
worldPrompt(null);
return;
}
SPT.pt += dt;
if (SPT.pt < 0.15)
return;
SPT.pt = 0;
if (WLD.card && WLD.card.style.display === "block") {
if (SPT.myFn && WLD.promptFn === SPT.myFn)
worldPrompt(null);
return;
}
var best = null, bd = 1e9;
K.spots.forEach(function (s) {
if (Math.abs(s.x - L.x) > s.r + 1 || Math.abs(s.z - L.z) > s.r + 1 || Math.abs(feet - s.y) > 2.2)
return;
if (s.when && !s.when())
return;
var d = Math.hypot(L.x - s.x, L.z - s.z);
if (d < s.r && d / s.r < bd) {
bd = d / s.r;
best = s;
}
});
K.gates.forEach(function (G) { if (Math.abs(L.x - G.x) < G.hw + 2 && Math.abs(L.z - G.z) < G.hd + 2 && G.shut && G.shut()) {
if (!SPT.gateTold || now - SPT.gateTold > 20000) {
SPT.gateTold = now;
sptSay("🎟️ <b>Tonight's game is ticketed.</b> Buy a seat at the box office on the plaza (pupils under 18 sit in the student section free).", 7);
}
} });
if (best) {
var fn = best.fn;
SPT.myFn = fn;
worldPrompt("<b>" + sptEsc(best.name) + "</b> · <b>press E</b> to " + sptEsc(best.verb), fn);
}
else if (SPT.myFn && WLD.promptFn === SPT.myFn) {
worldPrompt(null);
SPT.myFn = null;
}
},
function () {
sptLoad().then(function () {
var C = sptCfg(), B = SPT.board || {}, me = B.me || {}, adult = !!me.adult, b = "", f = {}, rows = [];
if (!C.tickets) {
worldCard(worldFacts("🎟️ The box office", "The big games are free to walk into just now.", [], ["The Keeper has the ticket check off."]), {});
return;
}
rows.push(["Prices", SPT_SECTIONS.filter(function (s) { return s[0] !== "student"; }).map(function (s) { return s[1] + " " + sptMoney(C.prices[s[0]]); }).join(" · ")]);
rows.push(["The championship", "seats at " + C.finalX + " times the price"]);
rows.push(["Pupils under 18", "the student section, free (one seat a game)"]);
var G = sptBigGames();
if (!G.length)
b += "<p style='opacity:.8'>No big games on the calendar just now.</p>";
G.forEach(function (g, i) {
var H = g.ready ? sptSchool(g.home) : null, A = g.ready ? sptSchool(g.away) : null, t = sptHasTicket(g.id), title = SPT_SPORTS[g.sport].icon + " " + g.title + (H ? ": " + A.team + " at " + H.team : " (the sides are decided by the table)");
b += "<div style='margin:8px 0;padding:8px 10px;border:1px solid rgba(240,192,64,.4);border-radius:6px'><b>" + sptEsc(title) + "</b><div style='opacity:.75;font-size:12px'>" + sptEsc(sptWhen(g.kick)) + " · " + (g.sport === "fb" ? "the stadium bowl" : "the Arena Hall") + "</div>";
if (t)
b += "<div style='color:#9FE0A8;margin-top:4px'>🎟️ Your seat: " + sptEsc(t.seat) + " (" + sptEsc((SPT_SECTIONS.filter(function (s) { return s[0] === t.section; })[0] || [0, t.section])[1]) + ")</div>";
else if (!sptSigned())
b += "<div style='color:#F0C040;font-size:12.5px;margin-top:4px'>Sign in to buy a ticket.</div>";
else
SPT_SECTIONS.forEach(function (s) {
if (s[0] === "student" ? (adult && !me.keeper) : !adult && !me.keeper)
return;
if (g.sport === "bb" && s[0] === "upper")
return;
var p = s[0] === "student" ? 0 : sptPriceFor(C, g, s[0]), k = "t" + i + s[0];
b += worldBtn(k, s[1] + ": " + sptMoney(p), "");
f[k] = function () { sptBuy(g, s[0]); };
});
b += "</div>";
});
worldCard(worldFacts("🎟️ The box office", C.arena + ": the semi-finals, the championships and the Crosstown Classic", rows, []) + b, f);
});
},
function (g, sec) {
worldCard(worldFacts("🎟️ Buying your seat…", "", [], []), {});
sptRpc("sports_ticket_buy", { p_fixture: g.id, p_section: sec, p_kick: new Date(g.kick).toISOString() }).then(function (r) {
sptLoad(true).then(function () { worldCard(worldFacts(r && r.ok ? "🎟️ Your ticket" : "🎟️ The box office", r && r.say ? r.say : "That didn't go through.", [], r && r.ok ? ["Show it at the gate: it opens an hour before the start.", "Your ticket is in the box office card and in your Backpack."] : []) + worldBtn("back", "Back to the box office", ""), { back: function () { sptBoxOffice(); } }); });
}, function (e) { worldCard(worldFacts("🎟️ The box office", "The box office is not open yet: " + String(e && e.message || e).slice(0, 140), [], []), {}); });
},
function (sport) {
sport = sport || SPT.lcSport || "fb";
SPT.lcSport = sport;
var C = sptCfg(), F = sptSeason(sport), now = Date.now();
var tbl = sptTable(sport, F.filter(function (f) { return f.kind === "league" || f.kind === "classic"; }), now);
var h = "<table style='width:100%;font-size:12.5px;border-collapse:collapse'><tr style='opacity:.7'><td></td><td>School</td><td>W-L</td><td>For</td><td>Against</td></tr>" + tbl.map(function (r, i) {
var S = sptSchool(r.id);
return "<tr><td>" + (i + 1) + "</td><td><span style='display:inline-block;width:10px;height:10px;background:" + S.c1 + ";border:1px solid " + S.c2 + ";margin-right:5px'></span>" + sptEsc(S.team) + "</td><td>" + r.w + "-" + r.l + (r.t ? "-" + r.t : "") + "</td><td>" + r.pf + "</td><td>" + r.pa + "</td></tr>";
}).join("") + "</table>";
var recent = F.filter(function (f) { return f.ready && sptFinal(f, now); }).slice(-5).reverse(), next = F.filter(function (f) { var S = f.ready ? sptSim(f) : null; return !S || now < f.kick + S.end * 1000; }).slice(0, 6);
h += "<div style='margin-top:8px;font-weight:600'>Latest</div>" + (recent.length ? recent.map(function (f) { var s = sptFinal(f, now); return "<div style='font-size:12.5px'>" + sptEsc(sptSchool(f.home).mascot) + " " + s[0] + ", " + sptEsc(sptSchool(f.away).mascot) + " " + s[1] + (f.big ? " · " + sptEsc(f.title) : "") + "</div>"; }).join("") : "<div style='opacity:.7;font-size:12.5px'>The season has not started yet.</div>");
h += "<div style='margin-top:8px;font-weight:600'>Coming up</div>" + next.map(function (f) {
var live = now >= f.kick;
return "<div style='font-size:12.5px'>" + (live ? "<b style='color:#FF8A6A'>LIVE</b> " : "") + sptEsc(f.ready ? sptSchool(f.away).mascot + " at " + sptSchool(f.home).mascot : f.title) + " · " + sptEsc(sptWhen(f.kick)) + (f.big ? " · 🎟️ " + sptEsc(f.title) : "") + "</div>";
}).join("");
var b = worldBtn("fb", "🏈 Football", "") + worldBtn("bb", "🏀 Basketball", "");
worldCard(worldFacts(SPT_SPORTS[sport].icon + " " + C.league, SPT_SPORTS[sport].name + " " + (sport === "fb" ? sptSeasonYear(sport) : sptSeasonYear(sport) + "-" + String(sptSeasonYear(sport) + 1).slice(2)) + ": the table (the top four play the semi-finals at the Arena)", [], []) + h + b, { fb: function () { sptLeagueCard("fb"); }, bb: function () { sptLeagueCard("bb"); } });
},
function (vid) {
var K = SPT.K, V = K && K.venues[vid];
if (!V)
return;
var S = sptSchool(V.school), sport = V.sport, B = SPT.board || {}, me = B.me || {}, mine = me[sport];
sptLoad();
var sq = sptSquad(S.id, sport, sptSeasonYear(sport)), dreamers = sq.filter(function (p) { return p.dreamer; }).length;
var nx = sptNext(function (f) { return f.sport === sport && (f.home === S.id || f.away === S.id); }, 1)[0];
var rows = [["School", S.school + (S.partner ? " (" + S.partner + ")" : "")], ["Team", S.team + " · the " + S.mascot], ["Colours", ""], ["Roster", sq.length + " players, " + dreamers + " of them dreamers"],
["Next game", nx ? (nx.ready ? (nx.home === S.id ? "v " + sptSchool(nx.away).team : "at " + sptSchool(nx.home).team) : nx.title) + ", " + sptWhen(nx.kick) : "the season is over"]];
var b = "", f = {};
b += worldBtn("play", "Play a game", sport === "fb" ? "11 a side, the high-school rules; you call the plays" : "5 a side, the high-school rules; you are the point guard");
f.play = function () { sptPlayCard(vid); };
b += worldBtn("drill", "Practise", "drills that build your skills");
f.drill = function () { sptDrillCard(vid); };
if (mine && mine.school === S.id) {
b += worldBtn("leave", "Leave the team", "");
f.leave = function () { sptRpc("sports_leave", { p_sport: sport }).then(function (r) { sptSay("📋 " + sptEsc(r && r.say || "Done."), 5); sptLoad(true).then(function () { sptVenueCard(vid); }); }, function (e) { sptSay(sptEsc(String(e.message || e).slice(0, 120)), 5); }); };
}
else {
b += worldBtn("join", "Join the " + S.team, mine ? "you play for the " + sptSchool(mine.school).team + " now: joining moves you" : "your name on the roster, in the league games");
f.join = function () { sptJoinCard(vid); };
}
b += worldBtn("roster", "The roster", "");
f.roster = function () { worldCard(worldFacts(S.team + ": the " + SPT_SPORTS[sport].name.toLowerCase() + " roster", S.school, sq.map(function (p) { return ["#" + p.no + " " + p.pos, p.name + (p.dreamer ? " ★" : "")]; }), ["★ a dreamer on the team"]) + worldBtn("back", "Back", ""), { back: function () { sptVenueCard(vid); } }); };
b += worldBtn("table", "The league table", "");
f.table = function () { sptLeagueCard(sport); };
var card = worldFacts(SPT_SPORTS[sport].icon + " " + S.team, V.name, rows, []);
card = card.replace("<td style='padding:2px 0'></td>", "<td style='padding:2px 0'><span style='display:inline-block;width:18px;height:12px;background:" + S.c1 + "'></span> <span style='display:inline-block;width:18px;height:12px;background:" + S.c2 + "'></span></td>");
worldCard(card + b, f);
try {
localStorage.setItem("spt_campus", S.id);
}
catch (e) { }
},
function (vid) {
var V = SPT.K.venues[vid], S = sptSchool(V.school), sport = V.sport, b = "", f = {}, C = sptCfg(), q = sport === "fb" ? C.fbQ : C.bbQ;
SPT.pick = SPT.pick || { len: "short" };
[["real", "Full length", q + "-minute quarters, the real breaks"], ["short", "Half length", (q / 2) + "-minute quarters"], ["quick", "Quick game", (q / 4) + "-minute quarters"]].forEach(function (L) { b += worldBtn("l" + L[0], (SPT.pick.len === L[0] ? "● " : "○ ") + L[1], L[2]); f["l" + L[0]] = function () { SPT.pick.len = L[0]; sptPlayCard(vid); }; });
b += "<div style='margin-top:8px;font-weight:600'>Play the " + sptEsc(S.team) + " against…</div>";
sptSchoolsOn(C).forEach(function (o) { if (o.id === S.id)
return; b += worldBtn("o" + o.id, o.team, o.school); f["o" + o.id] = function () { worldCard(null); sptGameStart(sport, vid, o.id, SPT.pick.len, S.id); }; });
worldCard(worldFacts(SPT_SPORTS[sport].icon + " Play a game", sport === "fb" ? "E snap / throw / dive · 1-7 call the play · T time-out · Shift sprint · X stop" : "E shoot / steal · Q pass (or call for the ball) · T time-out · Shift sprint · X stop", [], []) + b, f);
},
function (vid) {
var V = SPT.K.venues[vid], S = sptSchool(V.school), sport = V.sport, pos = sport === "fb" ? ["QB", "RB", "WR", "TE", "LT", "C", "DE", "DT", "LB", "CB", "S", "K"] : ["PG", "SG", "SF", "PF", "C"], b = "", f = {};
if (!sptSigned()) {
worldCard(worldFacts("Join the " + S.team, "Sign in first, so the roster knows it is you.", [], []), {});
return;
}
pos.forEach(function (p) {
b += worldBtn("p" + p, p, { QB: "quarterback", RB: "running back", WR: "wide receiver", TE: "tight end", LT: "left tackle", C: "centre", DE: "defensive end", DT: "defensive tackle", LB: "linebacker", CB: "cornerback", S: "safety", K: "kicker", PG: "point guard", SG: "shooting guard", SF: "small forward", PF: "power forward" }[p] || "");
f["p" + p] = function () { sptRpc("sports_join", { p_sport: sport, p_school: S.id, p_pos: p }).then(function (r) { sptSay("📋 " + sptEsc(r && r.say || "Done."), 6); sptLoad(true).then(function () { sptVenueCard(vid); }); }, function (e) { sptSay("The roster is not open yet: " + sptEsc(String(e.message || e).slice(0, 120)), 6); }); };
});
worldCard(worldFacts("Join the " + S.team, "Which position? Your name goes on the roster in that place, and the league games call your name.", [], ["One team for each sport; you may change once a day."]) + b, f);
},
function (vid) {
var V = SPT.K.venues[vid], sk = sptMySkill(), b = "", f = {};
SPT_DRILLS[V.sport].forEach(function (d) { b += worldBtn("d" + d[0], d[1], d[2] + " · your " + d[3].replace("_", "") + " skill " + sk[d[3]] + "/20"); f["d" + d[0]] = function () { worldCard(null); sptDrillStart(vid, d); }; });
worldCard(worldFacts("Practise", "Each good session adds a point to that skill (up to 20). The skills make you better in every game.", [], []) + b, f);
},
function (vid, d) {
var V = SPT.K.venues[vid];
if (SPT.game)
sptGameEnd(true);
var G = { drill: d[0], skillKey: d[3], sport: V.sport, V: V, H: sptSchool(V.school), A: sptSchool(V.school), root: new THREE.Group(), ball: sptBallMesh(V.sport), n: 0, made: 0, state: "drill", t: 0, skill: sptMySkill(), h: [], a: [], refs: [], sc: [0, 0], q: 1, clk: 0, tos: [0, 0], note: "" };
SPT.G.add(G.root);
G.root.add(G.ball);
SPT.game = G;
sptGameKeys(true);
sptHud();
G.me = sptMover(new THREE.Group(), V.cx, V.cz, 7);
var dir = 1;
if (d[0] === "ft") {
G.total = 10;
sptPutMe(G, V.cx + SPT_HOOP - 4.34, V.cz, 1);
G.frozen = [V.cx + SPT_HOOP - 4.34, V.cz];
sptMeter(G, true, "Free throw 1 of 10: press E in the green");
}
else if (d[0] === "three") {
G.total = 5;
G.spots = [[-6.3, 0], [-4.5, -4.5], [-4.5, 4.5], [-0.3, -6.4], [-0.3, 6.4]];
sptDrillSpot(G);
}
else if (d[0] === "fg") {
G.total = 5;
G.dists = [20, 25, 30, 40, 45];
sptDrillKickSpot(G);
}
else if (d[0] === "catch") {
G.total = 10;
sptPutMe(G, V.cx - 20, V.cz, 1);
G.nextT = 2;
}
else {
G.total = d[0] === "dash" ? 1 : 4;
G.run = { from: d[0] === "dash" ? V.cx - 36.6 / 2 : V.cx - SPT_CL / 2 + 0.5, len: d[0] === "dash" ? 36.58 : SPT_CL - 1, legs: d[0] === "dash" ? 1 : 4, leg: 0, t: -3 };
sptPutMe(G, G.run.from, V.cz, 1);
G.frozen = [G.run.from, V.cz];
}
sptSay("🏋️ <b>" + sptEsc(d[1]) + ".</b> " + sptEsc(d[2]) + (d[0] === "dash" || d[0] === "sprint" ? ". Get set: you go in three seconds. Hold Shift to sprint." : "."), 5);
},
function (G, dt) {
sptMeTick(G, dt);
G.t += dt;
var V = G.V;
if (G.meterOn !== false && (G.drill === "ft" || G.drill === "three" || G.drill === "fg") && !G.flight)
sptMeterAt(G, dt);
if (G.flight) {
var F = G.flight;
F.t += dt;
var k = Math.min(1, F.t / F.T);
G.ball.position.set(F.a[0] + (F.b[0] - F.a[0]) * k, F.a[1] + (F.b[1] - F.a[1]) * k + Math.sin(k * Math.PI) * F.h, F.a[2] + (F.b[2] - F.a[2]) * k);
if (k >= 1) {
G.flight = null;
if (F.done)
F.done();
}
}
else if (G.drill !== "catch")
sptBallInHand(G);
if (G.run) {
var R = G.run;
R.t += dt;
if (R.t < 0) {
G.note = "get set… " + Math.ceil(-R.t);
}
else {
if (G.frozen) {
G.frozen = null;
sptSay("🏁 <b>GO!</b>", 2);
}
G.note = R.t.toFixed(2) + " s";
var goal = R.leg % 2 === 0 ? R.from + R.len : R.from;
if (Math.abs(G.me.x - goal) < 1.2) {
R.leg++;
if (R.leg >= R.legs) {
var t = R.t, std = G.drill === "dash" ? 36.58 / 7.2 : (SPT_CL * 4) / 6.6, sc = Math.max(0, Math.min(10, Math.round(10 * (std * 1.35 - t) / (std * 0.45))));
sptDrillDone(G, sc, "Your time: " + t.toFixed(2) + " seconds.");
G.run = null;
}
}
}
}
if (G.drill === "catch" && G.nextT !== undefined) {
G.nextT -= dt;
if (G.nextT <= 0 && !G.flight && G.n < G.total) {
G.nextT = undefined;
var P = worldLocal(), tx = P.x + (Math.random() - 0.5) * 6, tz = P.z + (Math.random() - 0.5) * 6, from = [V.cx + 20, 1.5, V.cz];
G.target = [tx, tz];
G.flight = { a: from, b: [tx, 1.3, tz], t: 0, T: 1.6, h: 4, done: function () {
var Q = worldLocal(), d = Math.hypot(Q.x - tx, Q.z - tz), ok = d < 1.4 + G.skill.catch_ * 0.02;
G.n++;
if (ok)
G.made++;
sptSay(ok ? "🏈 <b>Caught!</b>" : "Dropped: get under it next time.", 2);
if (G.n >= G.total)
sptDrillDone(G, G.made, G.made + " of 10 caught.");
else
G.nextT = 1.5;
} };
sptSay("🏈 Here it comes: get under the ball!", 2);
}
}
sptHudPaint(G);
var el = document.getElementById("spt-hud");
if (el) {
var h = "🏋️ <b>" + sptEsc((SPT_DRILLS[G.sport].filter(function (d) { return d[0] === G.drill; })[0] || [0, "Practice"])[1]) + "</b> · " + G.made + " of " + G.n + (G.total ? " (of " + G.total + ")" : "") + (G.note ? " · " + G.note : "");
if (el.dataset.h !== h) {
el.dataset.h = h;
el.innerHTML = h;
}
}
},
function (G, k) {
if (k !== "act" || G.flight || G.done)
return;
var V = G.V, P = worldLocal();
if (G.drill === "ft" || G.drill === "three") {
var s = sptMeterScore(G), sk = G.drill === "ft" ? G.skill.ft : G.skill.three, made = Math.random() < Math.min(0.97, (G.drill === "ft" ? 0.2 : 0.08) + s * (G.drill === "ft" ? 0.8 : 0.7) + sk * 0.008);
G.flight = { a: [P.x, P.y - 0.4, P.z], b: [V.cx + SPT_HOOP, 3.08, V.cz + (made ? 0 : 0.3)], t: 0, T: 1.1, h: 1.6, done: function () {
G.n++;
if (made)
G.made++;
sptSay(made ? "🏀 <b>Swish!</b>" : "Off the rim.", 2);
if (G.n >= G.total) {
sptMeter(G, false);
sptDrillDone(G, G.drill === "ft" ? G.made : G.made * 2, G.made + " of " + G.total + " made.");
}
else if (G.drill === "three")
sptDrillSpot(G);
else
sptMeter(G, true, "Free throw " + (G.n + 1) + " of 10: press E in the green");
} };
return;
}
if (G.drill === "fg") {
var s2 = sptMeterScore(G), dist = G.dists[G.n], good = Math.random() < Math.min(0.98, s2 * 1.05 - (dist - 20) * 0.008 + G.skill.kick * 0.01);
G.flight = { a: [P.x + 0.6, 0.2, P.z], b: [V.cx + SPT_FL / 2 + 0.6, good ? 5.2 : 2.2, V.cz + (good ? 0 : (Math.random() < 0.5 ? -5 : 5))], t: 0, T: 1.8, h: 8, done: function () {
G.n++;
if (good)
G.made++;
sptSay(good ? "🏈 <b>It's good!</b>" : "No good.", 2);
if (G.n >= G.total) {
sptMeter(G, false);
sptDrillDone(G, G.made * 2, G.made + " of 5 good.");
}
else
sptDrillKickSpot(G);
} };
}
},
function (G, score, line) {
G.done = true;
sptMeter(G, false);
var key = G.skillKey, drill = G.drill, sport = G.sport;
var after = function (r) {
worldCard(worldFacts("🏋️ Practice over", line, [["Score", score + " of 10"]], [r && r.say ? r.say : sptSigned() ? "Saved." : "Sign in to keep your skills."]) + worldBtn("again", "Again", "") + worldBtn("done", "Done", ""), { again: function () { var vid = G.V.id, d = SPT_DRILLS[sport].filter(function (x) { return x[0] === drill; })[0]; sptGameEnd(true); worldCard(null); sptDrillStart(vid, d); }, done: function () { sptGameEnd(true); worldCard(null); } });
};
if (!sptSigned()) {
after(null);
return;
}
sptRpc("sports_practice", { p_sport: sport, p_drill: drill, p_skill: key, p_score: score }).then(function (r) { sptLoad(true); after(r); }, function () { after({ say: "The practice book is not open yet (the server update is still to come)." }); });
},
function () {
sptLoad();
var C = sptCfg(), b = "", f = {}, inW = WLD.on === SPT.key, now = Date.now();
var live = sptNext(function (f) { return now >= f.kick; }, 4), next = sptNext(function (f) { return now < f.kick; }, 3);
var rows = [["League", C.league], ["Football", SPT_SPORTS.fb.q + "-minute quarters, Friday nights, late August to November"], ["Basketball", SPT_SPORTS.bb.q + "-minute quarters, Tuesdays and Fridays, November to February"]];
live.forEach(function (g) { var V = g.venue; b += worldBtn("w" + g.id, "🔴 LIVE: " + (g.ready ? sptSchool(g.away).team + " at " + sptSchool(g.home).team : g.title), SPT_SPORTS[g.sport].name + (g.big ? " · " + g.title + " · at the Arena (ticket)" : "")); f["w" + g.id] = function () { worldCard(null); sptGo(g.big ? (g.sport === "fb" ? "plaza" : "plaza") : V); }; });
next.forEach(function (g) { b += "<div style='font-size:12.5px;opacity:.85;margin:3px 0'>Next: " + SPT_SPORTS[g.sport].icon + " " + sptEsc(g.ready ? sptSchool(g.away).mascot + " at " + sptSchool(g.home).mascot : g.title) + " · " + sptEsc(sptWhen(g.kick)) + "</div>"; });
b += worldBtn("plaza", "🏟️ " + C.arena, "the stadium bowl, the Arena Hall, the box office, the Hall of Fame");
f.plaza = function () { worldCard(null); sptGo("plaza"); };
b += worldBtn("box", "🎟️ Tickets for the big games", "");
f.box = function () { sptBoxOffice(); };
b += worldBtn("tbl", "📋 The league table and fixtures", "");
f.tbl = function () { sptLeagueCard(); };
b += "<div style='margin-top:8px;font-weight:600'>Campus Row</div>";
sptSchoolsOn(C).forEach(function (S) {
b += worldBtn("s" + S.id, S.team, S.school + ": the stadium" + (S.campus ? " · your campus" : ""));
f["s" + S.id] = function () { worldCard(null); sptGo(S.id); };
b += worldBtn("g" + S.id, "   🏀 " + S.school + " gym", "");
f["g" + S.id] = function () { worldCard(null); sptGo(S.id + "-gym"); };
});
if (inW) {
b += worldBtn("out", "Leave", "back to where you were");
f.out = function () { sptLeave(); };
}
worldCard(worldFacts("🏟️ School sports", "football and basketball, the high-school rules, the real clock", rows, []) + b, f);
},
function (G) {
if (typeof swkTree !== "function")
return;
var P = SPT_ARENA.plaza, D = new THREE.Group();
D.name = "spt-dress";
G.add(D);
var gr = function (x, z) { return sptGround(x, z); };
var sch = (sptCfg().schools || []).filter(function (S) { return S.on; });
var cols = sch.map(function (S) { return [new THREE.Color(S.c1).getHex(), new THREE.Color(S.c2).getHex()]; });
if (!cols.length)
cols = [[0x1A2A4A, 0xF0C040], [0x8A1A1A, 0xF0F0F0], [0x1A5A2A, 0xF0D040], [0x4A1A6A, 0xE8E8E8]];
for (var bx = -60; bx <= 60; bx += 10)
swkFlat(D, 0.5, 110, swkM(0x5E5A54, "stone"), P.x + bx, 0.04, P.z);
for (var bz = -55; bz <= 55; bz += 10)
swkFlat(D, 120, 0.5, swkM(0x5E5A54, "stone"), P.x, 0.041, P.z + bz);
swkFlat(D, 17, 110, swkM(0xA0968A, "paving"), P.x, 0.05, P.z);
var i = 0;
[108, 204].forEach(function (x) {
for (var z = -350; z <= -250; z += 12.5) {
if (Math.abs(z - P.z) < 8 || (x < P.x && z > -325 && z < -292))
continue;
i++;
if (!swkKeep(i))
continue;
swkPlanter(D, x, z, 2.6, 2.6, { stone: 0x8A847A });
swkTree(D, x, z, { y: 0.55, s: 1.15, c: 0x557F3A });
if (z + 6.25 < -250 && Math.abs(z + 6.25 - P.z) > 8) {
swkBench(D, x + (x < P.x ? 3.2 : -3.2), z + 6.25, x < P.x ? Math.PI / 2 : -Math.PI / 2);
if (i % 3 === 0)
swkBin(D, x + (x < P.x ? 3.2 : -3.2), z + 7.8);
}
}
});
for (var lz = -345; lz <= -245; lz += 15) {
if (Math.abs(lz - P.z) < 7 || Math.abs(lz + 264) < 5)
continue;
swkLamp(D, P.x - 9.6, lz, { h: 4.6 });
swkLamp(D, P.x + 9.6, lz, { h: 4.6 });
}
var fx = 118, fz = -272, F = swkAt(D, fx, 0, fz, 0);
swkCyl(F, 5, 5.2, 0.7, swkM(0x8A8478, "stone"), 0, 0.35, 0, 28);
swkCyl(F, 4.6, 4.6, 0.04, swkM(0x2E5A6A, null, { op: 0.85 }), 0, 0.62, 0, 28);
swkCyl(F, 0.6, 0.9, 1.6, swkM(0x8A8478, "stone"), 0, 1.2, 0, 12);
swkCyl(F, 1.6, 0.5, 0.4, swkM(0x8A8478, "stone"), 0, 2.1, 0, 16);
swkCyl(F, 1.4, 1.4, 0.03, swkM(0x3A6A7A, null, { op: 0.8 }), 0, 2.31, 0, 16);
swkCyl(F, 0.15, 0.25, 1.2, swkM(0x6A6458, "stone"), 0, 2.8, 0, 8);
swkMesh(F, new THREE.ConeGeometry(0.5, 1.2, 10, 1, true), swkM(0xD8E8F0, null, { op: 0.35, ds: true }), 0, 3.0, 0, 0);
for (var fb = 0; fb < 6; fb++) {
var fa = fb / 6 * 6.283;
if (swkKeep(fb))
swkBench(D, fx + Math.cos(fa) * 8, fz + Math.sin(fa) * 8, -fa - Math.PI / 2);
}
[["HOT DOGS", 0xC83A2A, 0xF0E8D8, [0xC8642A, 0xE8C050, 0xA83A2A]], ["POPCORN", 0xD8B030, 0xC82A2A, [0xF4E8C0, 0xF0D890, 0xE8D8A0]], ["DRINKS", 0x2A6AA8, 0xF0F0F0, [0x3A8AC8, 0xE84A3A, 0xF0E040]], ["TEAM SHOP", cols[0][0], cols[0][1], [cols[0][0], cols[0][1], 0xF0F0F0]]].forEach(function (s, k) {
if (!swkKeep(k) && k === 3)
return;
var sx = k < 3 ? 116 + k * 8.5 : 196, sz = k < 3 ? -345 : -290;
swkStall(D, sx, sz, k < 3 ? 0 : -Math.PI / 2, { w: 4, c1: s[1], c2: s[2], goods: s[3] });
if (typeof wSign === "function") {
var sg = wSign([s[0]], 3.6, 0.7, "#1E1A16", "#F4E6C0");
if (k < 3)
sg.position.set(sx, 3.25, sz + 0.8);
else {
sg.position.set(sx - 0.8, 3.25, sz);
sg.rotation.y = -Math.PI / 2;
}
D.add(sg);
}
});
[[115, -335, 0x1A3A5A], [122, -328, 0xA82A2A], [129, -335, 0x2A5A3A], [136, -328, 0x1A3A5A], [117, -322, 0xD8A030], [131, -321, 0xA82A2A]].forEach(function (t, k) { if (swkKeep(k))
swkCafe(D, t[0], t[1], { parasol: t[2], n: k % 2 ? 4 : 3 }); });
for (var f = 0; f < 12; f++) {
var c = cols[f % cols.length], fxx = f < 6 ? 110 + f * 5.5 : 202 - (f - 6) * 5.5;
if (swkKeep(f))
swkFlag(D, fxx, -247, { h: 9, c1: c[0], c2: c[1], ry: Math.PI / 2 });
}
var R = swkAt(D, 170, 0, -346, 0);
swkBox(R, 3, 1.6, 3, swkM(0x6E6A62, "stone"), 0, 0.8, 0);
swkBox(R, 3.3, 0.15, 3.3, swkM(0x7E7A72, "stone"), 0, 1.67, 0);
try {
var run = wPerson("spt_bronze", { title: "athlete" });
if (run) {
run.scale.setScalar(1.6);
run.position.set(0, 1.75, 0);
run.rotation.y = -Math.PI / 2;
var bronze = swkM(0x7A5A2E, "metal", { e: 0x1A1006 });
run.traverse(function (m) { if (m.isMesh)
m.material = bronze; });
R.add(run);
}
}
catch (e) { }
if (typeof wSign === "function") {
var pl = wSign(["THE RUNNER", "for every pupil who ever ran for their school"], 2.6, 0.6, "#3A2E1E", "#E8D8B0");
pl.position.set(170, 1.0, -344.45);
D.add(pl);
}
[[176, -280], [188, -272], [194, -286], [180, -262]].forEach(function (t, k) {
if (!swkKeep(k))
return;
var T = swkAt(D, t[0], 0, t[1], k * 0.4), w = swkM(0x7A5A3A, "wood");
swkBox(T, 2.2, 0.06, 0.8, w, 0, 0.76, 0);
swkBox(T, 2.2, 0.05, 0.3, w, 0, 0.45, 0.65);
swkBox(T, 2.2, 0.05, 0.3, w, 0, 0.45, -0.65);
[-0.9, 0.9].forEach(function (e) { swkBox(T, 0.08, 0.76, 1.6, w, e, 0.38, 0); });
});
swkStall(D, 200, -262, -Math.PI / 2, { w: 3.4, c1: cols[1 % cols.length][0], c2: 0xF0F0F0, goods: [cols[1 % cols.length][0], 0xF0F0F0, cols[1 % cols.length][1]] });
[-8, -5.5, -3, 3, 5.5, 8].forEach(function (b) { swkBollard(D, P.x + b, -246); });
var L = [];
[[116, -346.4], [124.5, -346.4], [133, -346.4], [196.9, -290], [200.9, -262]].forEach(function (p) { L.push([p[0], p[1], Math.PI * (p[0] > 190 ? -0.5 : 1), "food vendor"]); });
[[150, -269], [149.3, -270.4], [150.6, -271.8], [149.6, -273.2]].forEach(function (p) { L.push([p[0], p[1], Math.PI, "sports fan"]); });
for (var n = 0; n < 22; n++) {
var r = swkR(n * 31 + 7), px = 108 + r() * 96, pz = -352 + r() * 104;
if (Math.abs(px - P.x) < 9.5 && pz < -262)
px += px < P.x ? -9 : 9;
if (Math.hypot(px - fx, pz - fz) < 6)
px += 10;
var c = cols[n % cols.length];
L.push([px, pz, r() * 6.28, n % 5 === 0 ? "athlete" : "sports fan", { walk: n % 3 === 0 ? 0 : 5, child: n % 6 === 2, look: { top: c[0], hat: n % 4 === 0 ? "cap" : undefined, hatColor: c[1] } }]);
}
[[115, -335.8], [122, -328.8], [129.6, -335.6], [136.6, -328.5], [176, -280.9], [188, -272.8]].forEach(function (p, k) { L.push([p[0], p[1], k * 1.1, "sports fan", { look: { top: cols[k % cols.length][0] } }]); });
swkPeople(D, "spt_plaza", L, gr);
var BV = SPT.K.venues.arena, LB = [];
if (BV)
[BV.lo, BV.up].forEach(function (T, ti) {
for (var m = 0; m < (swkLite() ? 8 : 18); m++) {
var rr = swkR(m * 17 + 3 + ti * 101), row = Math.floor(rr() * Math.min(10, T.rows)), side = rr() < 0.5 ? 1 : -1, zz = (rr() - 0.5) * 2 * (T.iz - 4);
if (Math.abs(zz) < 4)
zz += 8;
LB.push([SPT_ARENA.bowl.x + side * (T.ix + row * T.dep + T.dep * 0.5), SPT_ARENA.bowl.z + zz, side > 0 ? -Math.PI / 2 : Math.PI / 2, "sports fan", { y: T.y0 + (row + 1) * T.rise, look: { top: cols[m % cols.length][0] } }]);
}
});
swkPeople(D, "spt_bowl", LB, null);
var skipX = [150];
sch.forEach(function (S, k) { var A = sptCampusAt((sptCfg().schools || []).indexOf(S)); skipX.push(A.x, A.x - 66); });
var rn = 0;
for (var rx = -630; rx <= 630; rx += 24) {
if (skipX.some(function (v) { return Math.abs(rx - v) < 12; }))
continue;
rn++;
[27.5, 52.5].forEach(function (rz, k) { if (!swkKeep(rn + k))
return; swkTree(D, rx + (k ? 12 : 0), rz, { s: 1.05, c: k ? 0x4F7A36 : 0x5A8040 }); });
if (rn % 2 === 0) {
swkLamp(D, rx + 6, 31.5, { h: 4.4 });
swkBench(D, rx + 6, 49, Math.PI);
}
}
var RL = [];
for (var w = 0; w < (swkLite() ? 6 : 12); w++) {
var r3 = swkR(w * 23 + 9);
RL.push([-600 + r3() * 1200, 36 + r3() * 8, r3() < 0.5 ? Math.PI / 2 : -Math.PI / 2, w % 4 === 0 ? "athlete" : "sports fan", { walk: 10, child: w % 3 === 1, look: { top: cols[w % cols.length][0] } }]);
}
swkPeople(D, "spt_road", RL, gr);
sch.forEach(function (S, k) {
var A = sptCampusAt((sptCfg().schools || []).indexOf(S)), gz = A.z + 125, c = [new THREE.Color(S.c1).getHex(), new THREE.Color(S.c2).getHex()], GL = [];
var iz = SPT_CW / 2 + 2.2;
for (var q = 0; q < (swkLite() ? 5 : 10); q++) {
var r4 = swkR(q * 7 + k * 131), row = Math.floor(r4() * 6), sd = r4() < 0.6 ? 1 : -1, xx = A.x + (r4() - 0.5) * SPT_CL * 0.85;
if (Math.abs(xx - A.x) < 1.2)
xx += 2;
GL.push([xx, gz + sd * (iz + row * 0.8 + 0.4), sd > 0 ? Math.PI : 0, "sports fan", { y: (row + 1) * 0.42, child: q % 3 === 0, look: { top: q % 2 ? c[0] : c[1] } }]);
}
GL.push([A.x + SPT_HOOP - 3, gz + 2, Math.PI / 2, "athlete", { y: 0.07, look: { top: c[0] } }]);
GL.push([A.x - SPT_HOOP + 4, gz - 1.5, -Math.PI / 2, "athlete", { y: 0.07, look: { top: c[1] } }]);
var hz = A.z + SPT_FW / 2 + 6;
for (var u = 0; u < (swkLite() ? 5 : 10); u++) {
var r5 = swkR(u * 11 + k * 71), row2 = Math.floor(r5() * 10), xs = A.x + (r5() - 0.5) * 76;
if (Math.abs(Math.abs(xs - A.x) - 20) < 1.5)
xs += 3;
GL.push([xs, hz + row2 * 0.85 + 0.42, Math.PI, "sports fan", { y: (row2 + 1) * 0.45, child: u % 4 === 0, look: { top: u % 2 ? c[0] : c[1] } }]);
}
swkPeople(D, "spt_school_" + S.id, GL, null);
});
var H = SPT_ARENA.hall;
[-1, 1].forEach(function (s) {
var bx2 = H.x + s * 5.5, bz2 = H.z + SPT_CW / 2 + 2.2;
var row = swkAt(D, bx2, 0.07, bz2, 0);
swkBox(row, 6, 0.45, 0.5, swkM(0x2A2E36, "metal"), 0, 0.225, 0);
for (var c2 = 0; c2 < 8; c2++)
swkBox(row, 0.55, 0.12, 0.5, swkM(0x1A2A4A), -2.6 + c2 * 0.74, 0.5, 0);
});
var st = swkAt(D, H.x, 0.07, H.z + SPT_CW / 2 + 2.4, 0);
swkBox(st, 3.6, 0.9, 0.7, swkM(0x1A2A4A, "wood"), 0, 0.45, 0);
swkBox(st, 3.7, 0.05, 0.8, swkM(0xF0C040), 0, 0.92, 0);
var HL = [[H.x - 1, H.z + SPT_CW / 2 + 2.9, Math.PI, "referee"], [H.x + 1, H.z + SPT_CW / 2 + 2.9, Math.PI, "sports fan"]];
sptRowsPeople(HL, H, cols);
swkPeople(D, "spt_hall", HL, null);
},
function (L, H, cols) {
var V = SPT.K && SPT.K.venues.hall, T = V && V.tier;
if (!T)
return;
for (var n = 0; n < (swkLite() ? 10 : 22); n++) {
var r = swkR(n * 13 + 5), row = 1 + Math.floor(r() * 5), side = r() < 0.5 ? -1 : 1, x = H.x + (r() - 0.5) * SPT_CL * 0.9, z = H.z + side * (T.iz + row * T.dep + T.dep * 0.5), y = T.y0 + (row + 1) * T.rise;
L.push([x, z, side < 0 ? 0 : Math.PI, "sports fan", { y: y, look: { top: cols[n % cols.length][0] } }]);
}
}
];
});
