/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(277, function () {
"use strict";
return [
function (f, n, P, L) {
var out = [], len = [];
for (var i = 0; i < n; i++) {
out.push({ L: [], R: [] });
var r = P ? wgReserve(P, L, n, i) : { lA: 0, lB: 0, rA: 0 };
len.push([r.lA + r.lB, r.rA]);
}
var all = [], a = f.L || [], b = f.R || [];
for (var j = 0; j < Math.max(a.length, b.length); j++) {
if (j < a.length)
all.push(a[j]);
if (j < b.length)
all.push(b[j]);
}
all.forEach(function (r) {
var R = wgRoomOf(r);
if (!R)
return;
var bi = 0, si = 0, best = 1e9;
for (var k = 0; k < n; k++)
for (var s2 = 0; s2 < 2; s2++)
if (len[k][s2] < best - 0.01) {
best = len[k][s2];
bi = k;
si = s2;
}
(si ? out[bi].R : out[bi].L).push(r);
len[bi][si] += R.len;
});
return out;
},
function (B, put, spots, L, sd, z0, z1, W, def, label, opt, xc) {
xc = xc || 0;
var c = WG_C, w = W / 2 - c - 0.14, d = z1 - z0 - 0.16, vc = (z0 + z1) / 2;
var face = function (f) {
if (typeof f === "number")
return f;
var fx = 0, fz = 0;
if (f === "in")
fx = -sd;
else if (f === "out")
fx = sd;
else if (f === "n")
fz = 1;
else if (f === "s")
fz = -1;
else
fz = 1;
return Math.atan2(fx, fz);
};
var R = { w: w, d: d, label: label, lv: L, sd: sd, opt: opt || null,
put: function (k, u, v, f) { if (!FURN[k])
return; put(k, xc + sd * (c + 0.08 + u), vc + v, face(f)); },
spot: function (u, v, room) { spots.push({ x: xc + sd * (c + 0.08 + u), z: vc + v, room: room || label.toLowerCase(), level: L }); },
staff: function (t, u, v, f) { B.staff.push({ title: wgTitle(B.P, t), x: xc + sd * (c + 0.08 + u), z: vc + v, ry: face(f), level: L, room: label }); } };
R.wallOut = function (k, v) { R.put(k, w - wgDepth(k) / 2 - 0.08, v, "in"); };
R.wallS = function (k, u) { R.put(k, u, -d / 2 + wgDepth(k) / 2 + 0.08, "n"); };
R.wallN = function (k, u) { R.put(k, u, d / 2 - wgDepth(k) / 2 - 0.08, "s"); };
return R;
},
function (P, t) {
if (t.charAt(0) !== "@")
return t;
var map = { "@head": P.head || "Manager", "@clerk": P.clerk || "Clerk", "@trade": P.trade || "Worker", "@security": "Security officer", "@guard": P.guard || "Guard",
"@dispatch": P.dispatch || "Dispatcher", "@vault": "Vault keeper", "@archivist": "Archivist", "@drafter": P.trade || "Draughtsman", "@keeper": P.trade || "Keeper",
"@control": P.control || "Control room operator", "@bar": P.bar || "Barkeep", "@coach": "Physical training instructor" };
return map[t] || P.trade || "Worker";
},
function (put, x, z0, z1, gaps) {
var at = z0;
(gaps || []).slice().sort(function (a, b) { return a.z - b.z; }).concat([null]).forEach(function (g) {
var end = g === null ? z1 : g.z - 0.75;
while (end - at > 0.24) {
var len = Math.min(6, end - at), n = Math.max(1, Math.round(len / 0.5));
len = n * 0.5;
if (at + len > end + 0.26) {
n = Math.max(1, n - 1);
len = n * 0.5;
}
put("trw" + n, x, at + len / 2, Math.PI / 2);
at += len;
}
if (g !== null) {
put(g.secure ? "wgsecdoor" : "trdoorframe", x, g.z, Math.PI / 2);
at = g.z + 0.75;
}
});
},
function (put, z, x0, x1, gaps) {
var at = x0;
(gaps || []).slice().sort(function (a, b) { return a.x - b.x; }).concat([null]).forEach(function (g) {
var end = g === null ? x1 : g.x - 0.75;
while (end - at > 0.24) {
var len = Math.min(6, end - at), n = Math.max(1, Math.round(len / 0.5));
len = n * 0.5;
if (at + len > end + 0.26) {
n = Math.max(1, n - 1);
len = n * 0.5;
}
put("trw" + n, at + len / 2, z, 0);
at += len;
}
if (g !== null) {
put(g.secure ? "wgsecdoor" : "trdoorframe", g.x, z, 0);
at = g.x + 0.75;
}
});
},
function (B, put, spots, L, sd, W, zA, zB, list, xc) {
xc = xc || 0;
var c = WG_C, z = zA, walled = false, P = B.P, xi = xc + sd * c, xo = xc + sd * W / 2, xa = Math.min(xi, xo), xb = Math.max(xi, xo);
var place = function (r, len) {
var z0 = z, z1 = z + len, def = r.def, sec = def.secure && !P.openAll, open = def.open;
B.names = B.names || {};
var nm = r.label;
B.names[nm] = (B.names[nm] || 0) + 1;
if (B.names[nm] > 1 && !/\d$/.test(nm))
r = { type: r.type, def: r.def, label: nm + " " + B.names[nm], len: r.len, opt: r.opt };
wgWallX(put, z0, xa, xb, []);
if (!open) {
var dz = z1 - 1.38;
wgWallZ(put, xi, z0, z1, [{ z: dz, secure: sec }]);
put(wgSignKey(r.label, sec), xi, dz, sd < 0 ? Math.PI / 2 : -Math.PI / 2);
if (len >= 6 && FURN.painting)
put("painting", xc + sd * (c - 0.09), (z0 + dz) / 2 - 0.3, sd < 0 ? Math.PI / 2 : -Math.PI / 2);
}
else
put(wgSignKey(r.label, false), xc + sd * (c + 0.05), z0 + 0.12, 0);
(B.log = B.log || []).push(L + "|" + Math.round(xc) + "|" + (sd < 0 ? "L" : "R") + "|" + r.label + "|" + z0.toFixed(1) + ".." + z1.toFixed(1));
var R = wgMakeR(B, put, spots, L, sd, z0, z1, W, def, r.label, r.opt, xc);
try {
def.fn(R);
}
catch (e) {
if (window.console)
console.warn("[wings] room " + r.type, e);
}
z = z1;
walled = true;
};
(list || []).forEach(function (rr) {
var r = wgRoomOf(rr);
if (!r)
return;
if (B.P.opts && B.P.opts[r.type])
r.opt = B.P.opts[r.type];
if (z + r.len > zB + 0.01)
return;
place(r, r.len);
});
var left = zB - z;
var fills = B.P.fillers || [B.P.filler || "lounge", "store", "meeting", "lounge"], fi = Math.abs(L * 7 + (sd > 0 ? 3 : 0) + Math.round(xc)) % fills.length;
while (left >= 4.6) {
var fill = wgRoomOf(fills[(fi++) % fills.length]);
if (!fill)
break;
var fl = left < 9.5 ? left : Math.max(5, Math.min(fill.len, left - 5));
place(fill, fl);
left = zB - z;
}
if (left > 1.4)
put("plant", xc + sd * (W / 2 - 0.8), z + left / 2, 0);
if (walled)
wgWallX(put, z, xa, xb, []);
},
function (B, L, W, D, put, spots, zA, zB, f) {
var P = B.P, n = wgBands(W), Wb = W / n, st = wgStairs(L, P.floors);
wgSplit(f, n, P, L).forEach(function (bf, b) {
var xc = -W / 2 + Wb * (b + 0.5), r = wgReserve(P, L, n, b);
wgSide(B, put, spots, L, -1, Wb, zA + r.lA, zB - r.lB, bf.L, xc);
wgSide(B, put, spots, L, 1, Wb, zA + r.rA, zB, bf.R, xc);
spots.push({ x: xc, z: (zA + zB) / 2, room: "the corridor", level: L });
if (L > 0)
spots.push({ x: xc, z: zB - 2, room: "the corridor", level: L });
});
if (st.br)
put(wgSignKey("Stairs", false), W / 2 - Wb / 2 + WG_C + 0.05, zA + WG_STAIR / 2, -Math.PI / 2);
},
function (B, W, D, put, spots) {
var P = B.P, S = (INT_PLAN_LAST && INT_PLAN_LAST.wg) || null;
var wing = D - (S ? S.Df : Math.max(12, Math.min(26, P.front || 12)));
if (wing > D - 10)
wing = D - 10;
var Df = D - wing, zP = -D / 2 + wing, zoff = zP + Df / 2;
var tr = [], fs = [];
var putF = function (k, x, z, r) { tr.push({ k: k, x: x, z: z }); put(k, x, z + zoff, r); };
var front = (typeof WG_FRONT !== "undefined" && WG_FRONT[B.key]) || TR[B.key];
var K = trKit(W, Df, putF, fs);
K.staff = function (t, x, z, ry) { B.staff.push({ title: wgTitle(P, t), x: x, z: z + zoff, ry: ry || 0, level: 0, room: "the front" }); };
try {
front(K);
}
catch (e) {
if (window.console)
console.warn("[wings] front " + B.key, e);
}
fs.forEach(function (q) { spots.push({ x: q.x, z: q.z + zoff, room: q.room, level: 0 }); });
var cand = [0, 1.6, -1.6, 3.2, -3.2, 4.8, -4.8, 6.4, -6.4], dx = 0;
for (var i = 0; i < cand.length; i++) {
var x = cand[i], hit = tr.some(function (p) { return Math.abs(p.x - x) < 1.5 && p.z < -Df / 2 + 2.2 && !/^trw|^trdoorframe/.test(p.k); });
if (!hit && Math.abs(x) < W / 2 - 2) {
dx = x;
break;
}
}
var sec = !!P.secure;
wgWallX(put, zP, -W / 2, W / 2, [{ x: dx, secure: sec }]);
put(wgSignKey(P.wingName || (sec ? "Staff only" : "Through to the wards"), sec), dx, zP, 0);
put("wgmark", 0, zP - 1, 0);
var zB = zP - WG_LOBBY;
put("plant", -W / 2 + 0.8, zB + WG_LOBBY / 2, 0);
put("plant", W / 2 - 0.8, zB + WG_LOBBY / 2, 0);
if (P.lobby)
P.lobby(put, W, zB, zP);
spots.push({ x: dx, z: zP - 1.6, room: "the corridor", level: 0 });
wgFloor(B, 0, W, D, put, spots, -D / 2, zB, P.ground || { L: [], R: [] });
},
function (I, B) {
I.wg = { key: B.key, P: B.P, staff: B.staff, locks: [], figs: {}, allowed: null, log: B.log || [] };
if (B.P.names)
I.floorNames = B.P.names.slice(0, I.levels);
I.root.children.forEach(function (c) {
if (!(c.userData && c.userData.furn === "wgsecdoor"))
return;
var wx = I.ox + c.position.x, wz = I.oz + c.position.z, lv = Math.round(c.position.y / (I.floor || 3.7));
var wall = null;
(I.walls || []).forEach(function (w) { if (!wall && Math.abs(w.x - wx) < 0.05 && Math.abs(w.z - wz) < 0.05 && (w.level || 0) === lv)
wall = w; });
I.wg.locks.push({ obj: c, wall: wall, x: wx, z: wz, level: lv, open: false });
});
WG.toldLock = 0;
},
function (key) {
try {
if (typeof isKeeperNow === "function" && isKeeperNow())
return true;
if (typeof amOfficer === "function" && amOfficer())
return true;
var S = (typeof standing !== "undefined" && standing) || null;
if (!S)
return false;
if ((S.jobs || []).some(function (j) { return j && (j.workplace === key || j.employer === key); }))
return true;
if ((S.business || []).some(function (b) { return b && (b.name === key || b.workplace === key); }))
return true;
}
catch (e) { }
return false;
},
function () {
if (!INT || !INT.wg)
return;
var G = INT.wg, ok = wgBadge(G.key);
if (ok !== G.allowed) {
G.allowed = ok;
G.locks.forEach(function (k) {
var leaf = k.obj.getObjectByName("leaf");
if (ok && !k.open) {
k.open = true;
if (leaf)
leaf.rotation.y = -1.35;
if (k.wall) {
var i = INT.walls.indexOf(k.wall);
if (i >= 0)
INT.walls.splice(i, 1);
}
}
else if (!ok && k.open) {
k.open = false;
if (leaf)
leaf.rotation.y = 0;
if (k.wall && INT.walls.indexOf(k.wall) < 0)
INT.walls.push(k.wall);
}
});
if (typeof wallsAt !== "undefined")
wallsAt = -1;
}
if (!ok && walkMode) {
var P = camera.position, lv = INT.level || 0;
G.locks.forEach(function (k) {
if (k.level !== lv || Math.hypot(P.x - k.x, P.z - k.z) > 1.6)
return;
if (Date.now() - WG.toldLock < 8000)
return;
WG.toldLock = Date.now();
setStatus("<b>Staff only.</b> This door opens to the badge of someone who works at " + esc(placeName(INT.spec)) + ". Ask at the front if you need to go through.");
});
}
},
function (key, i, title) {
var h = hash("wgstaff|" + key + "|" + i + "|" + title), f = (h >>> 3) % 2 === 0;
var gf = (typeof TEMP_GIVEN_F !== "undefined") ? TEMP_GIVEN_F : ["Mara"], gm = (typeof TEMP_GIVEN_M !== "undefined") ? TEMP_GIVEN_M : ["Tom"], sn = (typeof SURNAME !== "undefined") ? SURNAME : ["Grey"];
return { name: (f ? gf : gm)[(h >>> 5) % (f ? gf : gm).length] + " " + sn[(h >>> 10) % sn.length], f: f, seed: h };
},
function () {
if (!INT || !INT.wg || !walkMode)
return;
var G = INT.wg, P = camera.position, lv = INT.level || 0, max = (typeof LITE !== "undefined" && LITE) ? 6 : 12, near = [];
G.staff.forEach(function (s, i) {
if (s.level !== lv) {
return;
}
var d = Math.hypot(P.x - (INT.ox + s.x), P.z - (INT.oz + s.z));
if (d < 20)
near.push({ s: s, i: i, d: d });
});
near.sort(function (a, b) { return a.d - b.d; });
near = near.slice(0, max);
var keep = {};
near.forEach(function (n) { keep[n.i] = 1; });
Object.keys(G.figs).forEach(function (i) { if (!keep[i]) {
INT.root.remove(G.figs[i]);
delete G.figs[i];
} });
var made = 0;
near.forEach(function (n) {
if (G.figs[n.i] || made >= 1)
return;
var s = n.s;
if (!wgOnShift(s.title, G.key))
return;
made++;
var who = wgStaffName(G.key, n.i, s.title), id = "wgs_" + G.key + "_" + n.i;
var L0 = (typeof randomLook === "function") ? randomLook(id, "human") : {};
L0.sex = who.f ? "f" : "m";
if (typeof csLookFill === "function")
try {
csLookFill(L0, id);
}
catch (e) { }
if (typeof jobDress === "function")
try {
jobDress(L0, s.title, G.key);
}
catch (e) { }
var g;
try {
g = buildFigure({ id: "__wg_" + id, archetype: "human", attrs: {}, look: L0, solid: false, detail: (typeof LITE !== "undefined" && LITE) ? 2 : 3, nights: [], city: true }, 1);
}
catch (e) {
return;
}
g.position.set(s.x, s.level * (INT.floor || 3.7), s.z);
g.rotation.y = s.ry || 0;
var lm = g.userData.limbs;
if (lm) {
if (lm.la)
lm.la.rotation.x = -0.6;
if (lm.ra)
lm.ra.rotation.x = -0.45;
}
if (typeof makeTag === "function") {
var tag = makeTag(who.name + " · " + s.title, false);
tag.position.y = 2.15;
g.add(tag);
}
g.traverse(function (m) { m.raycast = function () { }; });
g.userData.wgWho = { name: who.name, title: s.title, room: s.room };
INT.root.add(g);
G.figs[n.i] = g;
});
},
function () {
if (!INT || !walkMode || store.inside !== (INT.spec && INT.spec.id))
return null;
var P = camera.position, lv = INT.level || 0, F = INT.floor || 3.7, best = null, bd = 2.7;
var look = function (g, who) {
if (!g || !g.parent)
return;
if (Math.abs(g.position.y - lv * F) > 1)
return;
var d = Math.hypot(P.x - (INT.ox + g.position.x), P.z - (INT.oz + g.position.z));
if (d < bd) {
bd = d;
best = who;
}
};
if (INT.wg)
Object.keys(INT.wg.figs).forEach(function (i) { var g = INT.wg.figs[i]; look(g, g.userData.wgWho); });
if (INT.tw && typeof TEMPS !== "undefined")
Object.keys(INT.tw).forEach(function (id) { var t = TEMPS.list.filter(function (q) { return q.id === id; })[0]; if (t)
look(INT.tw[id], { name: t.name, title: t.post.title, room: null }); });
return best;
},
function (who) {
if (!who || typeof wTalk !== "function")
return;
var place = INT && INT.spec ? placeName(INT.spec) : "Somnucor";
wTalk({ name: who.name, doing: "at work",
persona: who.name + " is the " + who.title + " at " + place + " in Somnucor, at work right now" + (who.room ? " in the " + who.room.toLowerCase() : "") +
". Speaks as a real " + who.title.toLowerCase() + " would at work: warm, practical and brief; knows the place, its rooms and its people, explains how things work here, and helps the dreamer as far as the job allows. Never says it is a game or an AI.",
greet: "Hello. I'm " + who.name.split(" ")[0] + ", " + (/^[aeiou]/i.test(who.title) ? "an " : "a ") + who.title.toLowerCase() + " here. What can I do for you?" });
},
function () {
var el = typeof cfxBtn === "function" ? cfxBtn("wg-talk", "left:50%;transform:translateX(-50%);bottom:calc(276px + env(safe-area-inset-bottom,0px));border-color:#C9A86A", function () { wgTalk(WG.near); }) : null;
if (!el)
return;
var open = typeof talkOpen !== "undefined" && talkOpen;
WG.near = open ? null : wgTalkTarget();
el.style.display = WG.near ? "block" : "none";
if (WG.near) {
var t = "💬 Talk to " + WG.near.name.split(" ")[0] + " · " + WG.near.title;
if (el.textContent !== t)
el.textContent = t;
var nb = document.getElementById("cfx-nurse"), b = "calc(276px + env(safe-area-inset-bottom,0px))";
if (nb && nb.style.display !== "none") {
var r = nb.getBoundingClientRect();
if (r.height)
b = Math.round(window.innerHeight - r.top + 8) + "px";
}
if (el.style.bottom !== b)
el.style.bottom = b;
}
},
function () {
if (!INT || !INT.wg || !INT.root)
return;
var P = camera.position, lv = (window.__wgTopL !== undefined) ? window.__wgTopL : (INT.level || 0), F = INT.floor || 3.7, R = (window.__wgTopL !== undefined) ? 999 : (typeof LITE !== "undefined" && LITE) ? 28 : 46, cx = P.x - INT.ox, cz = P.z - INT.oz;
INT.root.children.forEach(function (c) {
var k = c.userData && c.userData.furn;
if (!k || k === "stairs")
return;
if (c.userData.wgVis0 === undefined)
c.userData.wgVis0 = c.visible;
var cl = Math.round(c.position.y / F), on = cl === lv;
var far = !/^trw|^trdoorframe|^wgsecdoor|^wgsign/.test(k) && (Math.abs(c.position.x - cx) > R || Math.abs(c.position.z - cz) > R);
c.visible = c.userData.wgVis0 && on && !far;
});
}
];
});
