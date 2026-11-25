/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(315, function () {
"use strict";
return [
function (q, name) {
var a = stfNorm(q), b = stfNorm(name);
if (!a || !b)
return 0;
if (a === b)
return 100;
if (b.indexOf(a) >= 0 || a.indexOf(b) >= 0)
return 60 + Math.min(a.length, b.length);
var aw = a.split(" "), bw = b.split(" "), hit = 0;
aw.forEach(function (w) { if (w.length > 2 && bw.some(function (x) { return x === w || (w.length > 4 && (x.indexOf(w) === 0 || w.indexOf(x) === 0)); }))
hit++; });
return hit ? Math.round(50 * hit / Math.max(aw.length, bw.length)) + hit * 5 : 0;
},
function () {
var L = [], seen = {};
function add(n, x, z) { if (!n || seen[n] || x == null || z == null)
return; seen[n] = 1; L.push({ label: n, x: x, z: z }); }
if (stfInCity() || (store.inside && !(typeof WLD !== "undefined" && WLD && WLD.on))) {
Object.keys(store.workplaceAt || {}).forEach(function (k) {
var sp = typeof ktSpecFor === "function" ? ktSpecFor(k) : null, D = null;
try {
D = sp && typeof doorWorld === "function" ? doorWorld(sp) : null;
}
catch (e) { }
var w = store.workplaceAt[k];
if (D && D.out)
add(k, D.x + D.out.x * 3, D.z + D.out.z * 3);
else if (w)
add(k, w.x, w.z);
});
}
if (typeof pfindPlaces === "function" && !store.inside)
try {
pfindPlaces().forEach(function (p) { add(p.name, p.x, p.z); });
}
catch (e) { }
return L;
},
function () {
if (!(typeof INT !== "undefined" && INT && store.inside))
return [];
var L = [], seen = {}, fn = INT.floorNames || [];
function lvName(l) { return fn[l] || (l ? "floor " + (l + 1) : "the ground floor"); }
(INT.spots || []).forEach(function (s) {
if (!s.room)
return;
var k = s.room + "#" + (s.level || 0);
if (seen[k])
return;
seen[k] = 1;
L.push({ label: String(s.room), level: s.level || 0, x: INT.ox + s.x, z: INT.oz + s.z, where: lvName(s.level || 0) });
});
if (INT.wg)
(INT.wg.staff || []).forEach(function (s) {
L.push({ label: "the " + String(s.title).toLowerCase(), staff: true, room: s.room, level: s.level || 0, x: INT.ox + s.x, z: INT.oz + s.z, where: (s.room ? s.room + ", " : "") + lvName(s.level || 0) });
});
return L;
},
function (force) {
if (STF.rosterBusy || typeof cityRpc !== "function" || !(typeof signedIn === "function" && signedIn()))
return Promise.resolve(STF.roster);
if (!force && STF.roster && Date.now() - STF.rosterAt < 12000)
return Promise.resolve(STF.roster);
STF.rosterBusy = true;
return cityRpc("list_presence", { p_realm: "somnucor" }).then(function (rows) {
STF.rosterBusy = false;
STF.rosterAt = Date.now();
var me = typeof myUserId === "function" ? myUserId() : null;
STF.roster = (Array.isArray(rows) ? rows : []).filter(function (r) { return r && r.user_id && r.user_id !== me && r.name; });
return STF.roster;
}).catch(function () { STF.rosterBusy = false; return STF.roster; });
},
function (r) {
var p = String(r.place || "out");
if (r.away)
return "away (not at the keys right now)";
if (p === "out") {
var ox = (typeof ATLC !== "undefined" && ATLC) ? ATLC.x : 0, oz = (typeof ATLC !== "undefined" && ATLC) ? ATLC.z : 0, n = stfNearestPlace(ox + (+r.x || 0), oz + (+r.z || 0));
return "out in the streets" + (n ? (n.d < 30 ? " by " : " nearest to ") + n.key : "");
}
if (/^mall:/.test(p))
return "in the World Mall" + ((+r.level || 0) ? " (level " + ((+r.level) + 1) + ")" : "");
if (/^underground/.test(p))
return "down in the Underground" + (/train/.test(p) ? ", riding a train" : "");
var lab = p.split(":").slice(1).join(":") || "a building";
return "inside " + lab + ((+r.level || 0) ? " (floor " + ((+r.level) + 1) + ")" : " (ground floor)");
},
function (r) {
if (!r)
return null;
var p = String(r.place || "out");
try {
var w = typeof placeToWorld === "function" ? placeToWorld({ x: +r.x || 0, z: +r.z || 0, place: p, level: +r.level || 0 }) : null;
if (w)
return { x: w.x, z: w.z, level: w.level || 0, here: true };
}
catch (e) { }
if (p === "out" && typeof ATLC !== "undefined" && ATLC)
return { x: ATLC.x + (+r.x || 0), z: ATLC.z + (+r.z || 0), out: true };
if (/^mall:|^underground/.test(p))
return null;
var lab = p.split(":").slice(1).join(":"), sp = null;
if (lab)
(store.objects || []).some(function (o) { if (o && (o.workplace === lab || o.label === lab || o.name === lab)) {
sp = o;
return true;
} return false; });
if (!sp && typeof ktSpecFor === "function" && lab)
sp = ktSpecFor(lab);
if (!sp)
return null;
var D = null;
try {
D = typeof doorWorld === "function" ? doorWorld(sp) : null;
}
catch (e) { }
return D ? { x: D.x + (D.out ? D.out.x * 2 : 0), z: D.z + (D.out ? D.out.z * 2 : 0), door: lab } : { x: sp.x, z: sp.z, door: lab };
},
function (c) {
var ctx = stfCtx(c), A = stfAvailable(ctx), L = [];
L.push("WHAT YOU CAN REALLY DO. This is a living world: anything you agree to do must truly happen, so you may only offer or agree to the actions listed here. " +
"To do one, end your reply with its tag exactly as shown (the dreamer never sees the tag), and speak as if it is happening now, because it is. Use a tag only when the dreamer asks for that or agrees to it, and never more than one tag in a reply.");
A.forEach(function (d) { L.push("[[" + d.tag + (d.arg ? ": " + d.arg : "") + "]] " + d.hint + "."); });
if (stfDef("ESCORT") && A.indexOf(stfDef("ESCORT")) >= 0)
L.push("An escort is a colleague of yours, there within moments; you may say one is coming, because with the tag one really does come.");
if (!stfDef("MAKE") || A.indexOf(stfDef("MAKE")) < 0)
L.push("You cannot make, forge, craft, build or repair anything for the dreamer here, and you cannot take orders or commissions; if asked, say so honestly and, if something like it is sold here or elsewhere in the city, say where.");
L.push("Never promise, offer or pretend anything that is not one of these actions: nobody is \"on their way\", and you will not send for, fetch, bring, call, cook, pour, prepare or arrange anything else. " +
"If asked for something you cannot do, say plainly and kindly that you can't, and who or where can (you may offer to walk them there). You can still talk about anything.");
var R = stfRooms(), seen = {};
if (R.length) {
var rooms = R.filter(function (r) { if (r.staff || seen[r.label])
return false; seen[r.label] = 1; return true; }).slice(0, 40).map(function (r) { return r.label + " (" + r.where + ")"; });
var staff = R.filter(function (r) { return r.staff; }).slice(0, 30).map(function (r) { return r.label.replace(/^the /, "") + " (" + r.where + ")"; });
if (rooms.length)
L.push("Rooms in this building: " + rooms.join("; ") + ".");
if (staff.length)
L.push("Who works where in this building: " + staff.join("; ") + ".");
}
var P = stfPlaces().map(function (p) { return p.label; });
if (P.length)
L.push("Places you can name for ESCORT or GUIDE: " + P.slice(0, 90).join("; ") + ".");
if (stfInCity() || store.inside) {
if (STF.roster) {
var rr = STF.roster.slice(0, 40).map(function (r) { return r.name + ": " + stfRowWhere(r); });
L.push(rr.length ? ("Where every dreamer in Somnucor is right now, from the city's own records (true; nothing else is): " + rr.join("; ") + ". If asked where someone is, answer only from this, and if they are not on it, say they are not in the city right now as far as the city knows.") :
"The city's records show no other dreamer in Somnucor right now; if asked where someone is, say so.");
}
else
L.push("You do not know where any dreamer is right now. If asked, say honestly that you can't see where they are from here.");
}
return L.join(" ");
},
function (c, tag, said) {
var ctx = stfCtx(c), d = stfDef(tag.tag);
if (!d || !stfOk(d, ctx))
return { ok: false, say: "(That can't be done from here.)" };
var arg = tag.arg;
if (!arg && d.arg && tag.tag !== "REPORT" && tag.tag !== "CAB")
return { ok: false, say: "(Where to? Say the place or the name.)" };
if (!arg && tag.tag === "REPORT")
arg = said || "";
var r;
try {
r = d.run(ctx, arg) || { ok: true };
}
catch (e) {
if (window.console)
console.warn("[staff-deeds] " + tag.tag, e);
r = { ok: false, say: "(Something went wrong; it didn't happen. Try again.)" };
}
if (r && r.say && typeof setStatus === "function")
setStatus(r.say);
return r;
},
function (c, t, said, msgs, god) {
if (!stfIsStaff(c))
return Promise.resolve(t);
var tags = stfTags(t);
if (tags.length)
return Promise.resolve(stfFinish(c, t, tags, said));
if (!STF_PROMISE.test(t))
return Promise.resolve(t);
return stfAsk(c, msgs.concat([{ role: "assistant", content: t }, { role: "system", content: "Your last reply promised something that will not happen (no action tag). Say it again to the dreamer in your own voice: either do one of your real actions, with its tag at the end, or say plainly that you can't do that and what they can do instead. Do not mention this note." }]), god)
.then(function (t2) {
if (!t2)
return stfHonest(t);
var tg = stfTags(t2);
if (tg.length)
return stfFinish(c, t2, tg, said);
return STF_PROMISE.test(t2) ? stfHonest(t2) : t2;
}).catch(function () { return stfHonest(t); });
},
function (c, msgs, god) {
var C = cfg();
if (C.mode === "off")
return Promise.resolve("");
var ready = (C.mode === "app" && typeof freshToken === "function") ? freshToken().catch(function () { }) : Promise.resolve();
return ready.then(function () {
var T = llmTarget(C), body = { temperature: 0.7, max_tokens: 1200, messages: msgs };
if (god)
body.talk = "deity";
return fetch(T.url, { method: "POST", headers: T.headers, body: JSON.stringify(llmBody(C, body)) });
}).then(function (r) { if (!r.ok)
throw new Error(r.status); return r.json(); })
.then(function (d) { return ((d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content) || "").trim(); });
},
function (ctx, arg) {
var q = String(arg || "").trim();
if (!q)
return null;
var row = STF.roster ? stfBest(q, STF.roster, function (r) { return r.name; }) : null;
if (row && stfScore(q, row.name) >= 60)
return { kind: "dreamer", label: row.name, id: row.user_id, row: row };
var R = stfRooms(), rm = R.length ? stfBest(q, R, function (r) { return r.label; }) : null;
var pl = stfFindPlace(q);
if (rm && (!pl || stfScore(q, rm.label) >= stfScore(q, pl.label)))
return { kind: "room", label: rm.label, x: rm.x, z: rm.z, level: rm.level, building: INT.spec, where: rm.where };
if (pl)
return { kind: "place", label: pl.label, x: pl.x, z: pl.z };
if (row)
return { kind: "dreamer", label: row.name, id: row.user_id, row: row };
return null;
},
function (ctx) {
var key = ctx.place || ctx.world || "Somnucor", n = 900 + Math.floor(Math.random() * 90);
if (typeof wgStaffName === "function")
return wgStaffName(key, n, ctx.title || "escort");
var h = hash("sdesc|" + key + "|" + n), f = (h >>> 3) % 2 === 0;
var gf = (typeof TEMP_GIVEN_F !== "undefined") ? TEMP_GIVEN_F : ["Mara"], gm = (typeof TEMP_GIVEN_M !== "undefined") ? TEMP_GIVEN_M : ["Hal"], sn = (typeof SURNAME !== "undefined") ? SURNAME : ["Grey"];
return { name: (f ? gf : gm)[(h >>> 5) % (f ? gf : gm).length] + " " + sn[(h >>> 10) % sn.length], f: f, seed: h };
},
function (ctx, arg) {
if (!(typeof walkMode !== "undefined" && walkMode))
return { ok: false, say: "(You need to be walking about for someone to walk with you.)" };
var T = stfEscortTarget(ctx, arg);
if (!T) {
var who = STF.roster ? "" : " (sign in to find other dreamers)";
return { ok: false, say: "(Nobody knows a place or a dreamer called “" + esc(arg) + "” here" + who + ", so no escort went.)" };
}
if (T.kind === "dreamer") {
var pt = stfRowPoint(T.row);
if (!pt)
return { ok: false, say: "(" + esc(T.label) + " is " + esc(stfRowWhere(T.row)) + ", where an escort can't take you from here.)" };
}
if (ESC)
stfEscortEnd(null, true);
var who2 = stfEscortName(ctx), title = ctx.title || (ctx.world ? "guide" : "escort");
var P = camera.position, fx = -Math.sin(yaw), fz = -Math.cos(yaw);
ESC = { name: who2.name, f: who2.f, title: title, badge: (ctx.inside && INT && INT.wg) ? INT.wg.key : null, building: ctx.inside ? INT.spec : null, T: T,
x: P.x, z: P.z, phase: "coming", t0: Date.now(), at: 0, said: "", fig: null, host: null, here: store.here || 0, leaveT: 0, lastRoster: 0, gone: false };
var sp0 = stfEscortSpot(-fx, -fz, [5, 3.5, 2.2, 1.2]);
ESC.x = sp0.x;
ESC.z = sp0.z;
stfEscortFig();
stfEscortPill();
stfLoop();
return { ok: true, say: "<b>" + esc(ESC.name) + "</b>, " + esc(String(title).toLowerCase()) + ", is coming to walk you to <b>" + esc(T.label) + "</b>." };
},
function () {
if (!ESC)
return;
var host = (store.inside && typeof INT !== "undefined" && INT && INT.root) ? INT.root : scene;
if (ESC.fig && ESC.host === host) {
if (!ESC.fig.parent)
host.add(ESC.fig);
return;
}
if (ESC.fig) {
if (ESC.fig.parent)
ESC.fig.parent.remove(ESC.fig);
if (typeof hdfForget === "function")
try {
hdfForget(ESC.fig);
}
catch (e) { }
}
ESC.fig = null;
try {
var id = "sdesc_" + ESC.name, L = (typeof randomLook === "function") ? randomLook(id, "human") : {};
L.sex = ESC.f ? "f" : "m";
if (typeof csLookFill === "function")
try {
csLookFill(L, id);
}
catch (e) { }
if (typeof jobDress === "function")
try {
jobDress(L, ESC.title, (ESC.building && (ESC.building.workplace || ESC.building.label)) || "");
}
catch (e) { }
var g = buildFigure({ id: "__" + id, archetype: "human", attrs: {}, look: L, solid: false, detail: (typeof LITE !== "undefined" && LITE) ? 2 : 3, nights: [], city: true }, 1);
if (typeof makeTag === "function") {
var tag = makeTag(ESC.name + " · " + ESC.title, false);
tag.scale.multiplyScalar(0.4);
tag.position.y = 2.05;
g.add(tag);
}
g.traverse(function (m) { m.raycast = function () { }; });
host.add(g);
ESC.fig = g;
ESC.host = host;
}
catch (e) {
if (window.console)
console.warn("[staff-deeds] escort figure", e);
}
},
function () {
var T = ESC.T, P = camera.position, inB = store.inside && typeof INT !== "undefined" && INT && INT.spec, lv = inB ? (INT.level || 0) : 0;
if (T.kind === "dreamer") {
var pr = (typeof presenceOthers !== "undefined") ? presenceOthers[T.id] : null;
if (pr && pr.group && pr.group.parent)
return { x: pr.group.position.x, z: pr.group.position.z, level: pr.target && pr.target.level || lv, goal: true, label: T.label, near: 3 };
var pt = stfRowPoint(T.row);
if (pt && pt.here)
return { x: pt.x, z: pt.z, level: pt.level || 0, goal: true, label: T.label, near: 3, stairs: inB && (pt.level || 0) !== lv };
if (pt && inB)
return stfEscortWayOut(lv);
if (pt)
return { x: pt.x, z: pt.z, goal: !pt.door, label: pt.door ? ("the door of " + pt.door) : T.label, near: pt.door ? 3 : 4, door: pt.door };
return null;
}
if (T.kind === "room") {
if (!inB || INT.spec !== T.building)
return null;
if ((T.level || 0) !== lv)
return stfEscortStairs(lv, T.level || 0);
return { x: T.x, z: T.z, goal: true, label: T.label, near: 2.6 };
}
if (inB) {
if (INT.wpKey && INT.wpKey === T.label)
return { x: P.x, z: P.z, goal: true, label: T.label, near: 99 };
return stfEscortWayOut(lv);
}
return { x: T.x, z: T.z, goal: true, label: T.label, near: 8 };
},
function (lv, want) {
var up = want > lv, best = null, bd = 1e9, P = camera.position;
(INT.stairs || []).forEach(function (s) { if ((up && s.from !== lv) || (!up && s.from !== lv - 1))
return; var d = Math.hypot(s.x - P.x, s.z - P.z); if (d < bd) {
bd = d;
best = s;
} });
(INT.lifts || []).forEach(function (l) { var d = Math.hypot(l.x - P.x, l.z - P.z); if (d < bd) {
bd = d;
best = l;
} });
if (!best)
return null;
return { x: best.x, z: best.z, label: (up ? "the stairs up" : "the stairs down"), near: 0.5, stairs: true };
},
function () {
if (STF.raf)
return;
STF.last = performance.now();
var step = function (now) {
STF.raf = 0;
if (!ESC)
return;
var dt = Math.min(0.25, (now - STF.last) / 1000);
STF.last = now;
try {
stfEscortTick(dt);
}
catch (e) {
if (window.console)
console.warn("[staff-deeds] escort", e);
stfEscortEnd(null, true);
return;
}
if (ESC)
STF.raf = requestAnimationFrame(step);
};
STF.raf = requestAnimationFrame(step);
},
function (W) {
if (!stfCityOn(ESC.x, ESC.z) || !stfCityOn(W.x, W.z))
return null;
var R = ATL_RINGS, RUN = ATL_STAIR_RUN, cx = ATLC.x, cz = ATLC.z;
var ei = stfRing(ESC.x, ESC.z), wi = stfRing(W.x, W.z), tj = wi >= 0 ? wi : stfRingNear(W.x, W.z);
var er = Math.hypot(ESC.x - cx, ESC.z - cz), ea = Math.atan2(ESC.z - cz, ESC.x - cx);
if (ei < 0) {
var st = atlNearStair(er, ea);
if (!st)
return null;
var u = -1;
for (var i = 0; i < R.length - 1; i++)
if (er >= R[i].E - 0.5 && er <= R[i + 1].S + RUN + 0.5) {
u = i;
break;
}
if (u < 0)
return null;
var wr0 = Math.hypot(W.x - cx, W.z - cz), wst = wi < 0 ? atlNearStair(wr0, Math.atan2(W.z - cz, W.x - cx)) : null;
if (wst && wst.s === st.s && wr0 >= R[u].E - 0.5 && wr0 <= R[u + 1].S + RUN + 0.5)
return { to: { x: W.x, z: W.z }, direct: true, last: true };
return { to: stfStairPt(st.s.a, tj > u ? R[u + 1].S + RUN + 4 : R[u].E - 4), direct: true };
}
if (tj === ei)
return { to: { x: W.x, z: W.z }, level: R[ei].H, last: true };
var down = tj > ei, wr = Math.hypot(W.x - cx, W.z - cz), wa = Math.atan2(W.z - cz, W.x - cx), best = null, bc = 1e9;
for (var k = 0; k < ATL_STAIRS.length; k++) {
var c = er * stfTurn(ea, ATL_STAIRS[k].a) + wr * stfTurn(wa, ATL_STAIRS[k].a);
if (c < bc) {
bc = c;
best = ATL_STAIRS[k];
}
}
return { to: stfStairPt(best.a, down ? R[ei].E - 4 : R[ei].S + RUN + 4), then: stfStairPt(best.a, down ? R[ei + 1].S + RUN + 4 : R[ei - 1].E - 4), level: R[ei].H, down: down };
},
function (ax, az, bx, bz, level) {
if (typeof findPath !== "function" || typeof navBlocked !== "function" || typeof lineClear !== "function")
return null;
var cell = NAV_CELL, nb = navBlocked, r = null, out = !store.inside && typeof WALLS !== "undefined" && typeof wallsAt !== "undefined", W0 = null, at0 = 0;
try {
NAV_CELL = 0.7;
if (out) {
var all = solidWalls(), x0 = Math.min(ax, bx) - 46, x1 = Math.max(ax, bx) + 46, z0 = Math.min(az, bz) - 46, z1 = Math.max(az, bz) + 46;
W0 = WALLS;
at0 = wallsAt;
WALLS = all.filter(function (w) { if (w.lair)
return true; var m = w.r !== undefined ? w.r + 1 : w.hw + w.hd + 1; return w.x > x0 - m && w.x < x1 + m && w.z > z0 - m && w.z < z1 + m; });
wallsAt = performance.now() + 60000;
}
if (level != null)
navBlocked = function (x, z) { return nb(x, z) || Math.abs(terrainY(x, z) - level) > 0.6; };
var gd = Math.hypot(bx - ax, bz - az), back = [0, 1.6];
for (var t = 0; t < back.length && !r; t++) {
if (t && gd < back[t] + 1.5)
break;
var gx = bx - (bx - ax) / (gd || 1) * back[t], gz = bz - (bz - az) / (gd || 1) * back[t];
r = findPath(ax, az, gx, gz);
if (!r || !r.length || (r.length === 1 && Math.hypot(r[0].x - ax, r[0].z - az) > NAV_CELL * 1.6 && !lineClear(ax, az, r[0].x, r[0].z)))
r = null;
}
}
catch (e) {
r = null;
}
navBlocked = nb;
NAV_CELL = cell;
if (W0) {
WALLS = W0;
wallsAt = at0;
}
return r;
},
function (W) {
var now = ESC.clock || 0, R = ESC.route, G = ESC.routeGoal;
var spent = R && R.length === 1 && !ESC.routeFull && Math.hypot(R[0].x - ESC.x, R[0].z - ESC.z) < 2;
if (R && R.length && G && Math.hypot(G.x - W.x, G.z - W.z) < 3 && !spent && now - ESC.routeAt < 20)
return R;
if (!R && G && Math.hypot(G.x - W.x, G.z - W.z) < 3 && now - ESC.routeAt < 0.7)
return null;
var leg = stfCityLeg(W), aim = leg ? leg.to : W;
var far = store.inside ? 110 : 60;
var dx = aim.x - ESC.x, dz = aim.z - ESC.z, d = Math.hypot(dx, dz), full = d <= far, to = full ? { x: aim.x, z: aim.z } : { x: ESC.x + dx / d * far, z: ESC.z + dz / d * far };
var r = null;
if (leg && leg.direct)
r = [to];
else
r = stfFind(ESC.x, ESC.z, to.x, to.z, leg ? leg.level : null);
if (r && r.length) {
r = r.slice(0, 400);
if (leg && leg.then && full)
r.push(leg.then);
}
ESC.route = (r && r.length) ? r : null;
ESC.routeGoal = { x: W.x, z: W.z };
ESC.routeFull = full && (!leg || !!leg.last);
ESC.routeAt = now;
ESC.onStairs = !!(leg && (leg.direct || leg.then));
ESC.stairsDown = leg && leg.then ? leg.down : ESC.stairsDown;
return ESC.route;
},
function (x, z) {
var P = camera.position;
try {
if (typeof navBlocked === "function" && navBlocked(x, z))
return false;
if (stfCityOn(x, z)) {
var d = Math.hypot(x - P.x, z - P.z), py = terrainY(P.x, P.z);
if (Math.abs(terrainY(x, z) - py) > 0.45 * d + 0.4)
return false;
for (var t = 0.25; t < 1; t += 0.25)
if (Math.abs(terrainY(P.x + (x - P.x) * t, P.z + (z - P.z) * t) - py) > 0.45 * d + 0.4)
return false;
}
if (typeof lineClear === "function" && !lineClear(P.x, P.z, x, z))
return false;
}
catch (e) { }
return true;
},
function (ux, uz, dists) {
var P = camera.position, a0 = Math.atan2(ux, uz), turns = [0.33, -0.33, 0, 0.9, -0.9, 1.6, -1.6, 2.4, -2.4, 3.14];
for (var i = 0; i < dists.length; i++)
for (var k = 0; k < turns.length; k++) {
var a = a0 + turns[k], x = P.x + Math.sin(a) * dists[i], z = P.z + Math.cos(a) * dists[i];
if (stfSpotOk(x, z))
return { x: x, z: z };
}
return { x: P.x + ux * 0.6, z: P.z + uz * 0.6 };
},
function (tx, tz, st) {
var mx = tx - ESC.x, mz = tz - ESC.z, md = Math.hypot(mx, mz);
if (md < 0.05 || st <= 0)
return 0;
st = Math.min(md, st);
var a0 = Math.atan2(mx, mz), turn = [0, 0.6, -0.6, 1.2, -1.2], inNow = false, yNow = 0, city = stfCityOn(ESC.x, ESC.z);
try {
inNow = typeof navBlocked === "function" && navBlocked(ESC.x, ESC.z);
if (city)
yNow = terrainY(ESC.x, ESC.z);
}
catch (e) { }
for (var k = 0; k < turn.length; k++) {
var nx = ESC.x + Math.sin(a0 + turn[k]) * st, nz = ESC.z + Math.cos(a0 + turn[k]) * st, ok = true;
try {
if (!inNow && typeof navBlocked === "function" && navBlocked(nx, nz))
ok = false;
else if (city && stfCityOn(nx, nz) && Math.abs(terrainY(nx, nz) - yNow) > 0.5 * st + 0.8)
ok = false;
}
catch (e) { }
if (ok) {
ESC.x = nx;
ESC.z = nz;
return st;
}
if (inNow)
break;
}
return -1;
},
function (dt) {
if (!ESC)
return;
if (!(typeof walkMode !== "undefined" && walkMode) || Date.now() - ESC.t0 > 25 * 60000)
return stfEscortEnd("Your escort has gone back to work.");
if ((store.here || 0) !== ESC.here) {
ESC.here = store.here || 0;
if (ESC.T.kind === "place") {
var np = stfFindPlace(ESC.T.label);
if (!np || stfScore(ESC.T.label, np.label) < 60)
return stfEscortEnd("<b>" + esc(ESC.T.label) + "</b> is back the way you came, so " + esc(ESC.name.split(" ")[0]) + " goes back to work.");
ESC.T = { kind: "place", label: np.label, x: np.x, z: np.z };
}
if (ESC.T.kind === "room")
return stfEscortEnd(esc(ESC.name.split(" ")[0]) + " stays in the building you left.");
stfEscortBeside();
}
ESC.clock = (ESC.clock || 0) + dt;
var hostWas = ESC.host, levelWas = ESC.level;
stfEscortFig();
var lvNow = (store.inside && INT) ? (INT.level || 0) : -1;
if ((hostWas && ESC.host !== hostWas) || (levelWas !== undefined && levelWas !== lvNow)) {
if (ESC.phase !== "leaving") {
stfEscortBeside();
if (ESC.phase === "coming")
ESC.phase = "leading";
}
}
ESC.level = lvNow;
var g = ESC.fig, P = camera.position, inB = store.inside && INT && INT.root && ESC.host === INT.root, ox = inB ? INT.ox : 0, oz = inB ? INT.oz : 0;
if (ESC.px !== undefined && dt > 0) {
var pv = Math.hypot(P.x - ESC.px, P.z - ESC.pz) / dt;
ESC.pv = (ESC.pv || 0) * 0.85 + Math.min(pv, 12) * 0.15;
}
ESC.px = P.x;
ESC.pz = P.z;
if (ESC.T.kind === "dreamer" && Date.now() - ESC.lastRoster > 5000) {
ESC.lastRoster = Date.now();
stfRosterLoad(true).then(function () {
if (!ESC || ESC.T.kind !== "dreamer")
return;
var r = (STF.roster || []).filter(function (x) { return x.user_id === ESC.T.id; })[0];
if (r)
ESC.T.row = r;
else
ESC.lost = (ESC.lost || 0) + 1;
});
}
if (ESC.lost >= 3)
return stfEscortEnd("<b>" + esc(ESC.T.label) + "</b> has left the city, so " + esc(ESC.name.split(" ")[0]) + " goes back to work.");
var W = stfEscortWaypoint();
if (!W && ESC.T.kind === "room")
return stfEscortEnd(esc(ESC.name.split(" ")[0]) + " stays in the building you left.");
var feet = P.y - 1.72;
if (ESC.phase === "leaving") {
ESC.leaveT += dt;
var lst = (ESC.lx || ESC.lz) ? stfEscortStep(ESC.x + ESC.lx * 3, ESC.z + ESC.lz * 3, dt * 1.4) : 0;
if (g) {
g.position.set(ESC.x - ox, inB ? (INT.level || 0) * INT.floor : stfEscortY(false, feet), ESC.z - oz);
if (ESC.lx || ESC.lz)
g.rotation.y = Math.atan2(ESC.lx, ESC.lz);
stfSwing(g, lst > 0 ? 1 : 0);
}
if (Date.now() - ESC.leftAt > 3500)
stfEscortEnd(null, true);
return;
}
var nm = esc(ESC.name.split(" ")[0]);
var dx = W ? W.x - P.x : 0, dz = W ? W.z - P.z : 0, d = Math.hypot(dx, dz), gap = Math.hypot(P.x - ESC.x, P.z - ESC.z);
var sameLevel = !(W && W.level !== undefined && inB && W.level !== (INT.level || 0));
var eToW = W ? Math.hypot(W.x - ESC.x, W.z - ESC.z) : 1e9;
if (W && W.goal && !W.stairs && sameLevel && (d < W.near || (ESC.phase === "leading" && eToW < Math.max(1.5, W.near) && gap < 4.5))) {
var inDoor = ESC.T.kind === "place" && !store.inside && store.workplaceAt && store.workplaceAt[ESC.T.label];
setStatus("<b>" + nm + ":</b> “Here we are" + (ESC.T.kind === "dreamer" ? ", there's " + esc(ESC.T.label) : ": " + esc(ESC.T.label)) + "." + (inDoor ? " The door's just there." : "") + "” " + nm + " heads back to work.");
if (typeof guideTo !== "undefined" && guideTo && guideTo.sd)
guideTo = null;
var a = Math.random() * 6.283;
ESC.lx = 0;
ESC.lz = 0;
for (var q = 0; q < 8; q++) {
var a2 = a + q * 0.785, sx = Math.sin(a2), sz = Math.cos(a2), okWay = true;
try {
for (var u2 = 1; u2 <= 5 && okWay; u2++) {
var qx = ESC.x + sx * u2, qz = ESC.z + sz * u2;
if ((typeof navBlocked === "function" && navBlocked(qx, qz)) || (stfCityOn(qx, qz) && Math.abs(terrainY(qx, qz) - terrainY(ESC.x, ESC.z)) > 0.5 * u2 + 0.6))
okWay = false;
}
}
catch (e) {
okWay = false;
}
if (okWay) {
ESC.lx = sx;
ESC.lz = sz;
break;
}
}
ESC.phase = "leaving";
ESC.leaveT = 0;
ESC.leftAt = Date.now();
stfEscortPill();
return;
}
if (!store.inside && W && typeof guideTo !== "undefined" && (!guideTo || guideTo.sd))
guideTo = { key: W.label, x: W.x, z: W.z, sd: 1 };
var want = null, sp = 0, face = null, R = null;
if (ESC.phase === "coming") {
if (gap < 2.6) {
ESC.phase = "leading";
ESC.route = null;
ESC.routeGoal = null;
stfEscortPill();
stfEscortSay("This way, follow me.", "go");
}
else {
if (gap > 30)
stfEscortBeside();
R = stfEscortRoute({ x: P.x, z: P.z });
if (R) {
while (R.length > 1 && Math.hypot(R[0].x - ESC.x, R[0].z - ESC.z) < 0.7)
R.shift();
want = R[0];
}
sp = 2.8;
}
}
else if (W) {
if (gap > 30) {
stfEscortBeside();
gap = 0;
}
R = stfEscortRoute(W);
if (R)
while (R.length > 1 && Math.hypot(R[0].x - ESC.x, R[0].z - ESC.z) < 0.7)
R.shift();
var atWay = R && ESC.routeFull && R.length === 1 && Math.hypot(R[0].x - ESC.x, R[0].z - ESC.z) < (W.goal ? Math.max(1.2, Math.min(W.near * 0.5, 3)) : 0.9);
if (gap > 7.5) {
sp = 0;
face = Math.atan2(P.x - ESC.x, P.z - ESC.z);
ESC.wait = (ESC.wait || 0) + dt;
if (ESC.wait > 1.2)
stfEscortSay(gap > 16 ? "Over here! I'll wait for you." : "This way, keep up.", "wait" + Math.floor(ESC.wait / 12));
}
else if (atWay) {
sp = 0;
face = Math.atan2(P.x - ESC.x, P.z - ESC.z);
if (W.out)
stfEscortSay("Out through the front door here.", "door" + lvNow);
else if (W.stairs)
stfEscortSay(W.label === "the stairs up" ? "Up the stairs here." : "Down the stairs here.", "stairs" + lvNow);
else if (W.door)
stfEscortSay("In through this door.", "in" + W.door);
}
else {
ESC.wait = 0;
if (ESC.saidKey && ESC.saidKey.indexOf("wait") === 0)
ESC.saidKey = "";
want = R ? R[0] : null;
sp = gap < 4 ? Math.max(1.9, (ESC.pv || 0) * 1.12) : (gap < 6 ? 1.6 : 1.1);
sp = Math.min(sp, 9);
if (ESC.onStairs && R && R.length <= 2 && stfCityOn(ESC.x, ESC.z)) {
var onRamp = stfRing(ESC.x, ESC.z) < 0;
if (onRamp || Math.hypot(R[0].x - ESC.x, R[0].z - ESC.z) < 9) {
var yNow = terrainY(ESC.x, ESC.z), yEnd = terrainY(R[R.length - 1].x, R[R.length - 1].z), dn = Math.abs(yEnd - yNow) > 1 ? yEnd < yNow : !!ESC.stairsDown;
stfEscortSay(dn ? "Down the stairs here, mind your step." : "Up the stairs here.", "cstair" + Math.round(Math.hypot(ESC.x - ATLC.x, ESC.z - ATLC.z) / 120) + (dn ? "d" : "u"));
}
}
}
}
var mx = 0, mz = 0, md = 0, moved = 0;
if (want && sp > 0) {
mx = want.x - ESC.x;
mz = want.z - ESC.z;
md = Math.hypot(mx, mz);
moved = stfEscortStep(want.x, want.z, sp * dt);
if (moved < 0) {
ESC.route = null;
ESC.routeAt = ESC.clock || 0;
}
}
var tryingTo = sp > 0 && (ESC.phase === "coming" || (W && gap <= 7.5));
if (tryingTo && !(moved > 0) && (!want || md > 0.05)) {
ESC.stuck = (ESC.stuck || 0) + dt;
if (ESC.stuck > 2.5 && gap > 2.2) {
stfEscortBeside();
}
}
else if (moved > 0)
ESC.stuck = 0;
if (g) {
g.position.set(ESC.x - ox, stfEscortY(inB, feet), ESC.z - oz);
if (face === null)
face = (moved > 0) ? Math.atan2(mx, mz) : g.rotation.y;
g.rotation.y = face;
stfSwing(g, (moved > 0) ? Math.min(1, sp / 2) : 0);
}
ESC.at += dt;
if (ESC.at > 0.5) {
ESC.at = 0;
ESC.way = W;
stfEscortPill();
}
},
function (say, quiet) {
if (!ESC)
return;
if (ESC.fig) {
if (ESC.fig.parent)
ESC.fig.parent.remove(ESC.fig);
if (typeof hdfForget === "function")
try {
hdfForget(ESC.fig);
}
catch (e) { }
}
if (typeof guideTo !== "undefined" && guideTo && guideTo.sd)
guideTo = null;
ESC = null;
if (say && !quiet && typeof setStatus === "function")
setStatus(say);
stfEscortPill();
if (typeof wallsAt !== "undefined")
wallsAt = -1;
},
function () {
var el = document.getElementById("stf-esc");
if (!ESC || ESC.phase === "leaving") {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "stf-esc";
el.style.cssText = "position:fixed;left:50%;transform:translateX(-50%);top:calc(128px + env(safe-area-inset-top,0px));z-index:44;max-width:calc(100vw - 24px);" +
"background:rgba(10,12,18,.9);border:1px solid #8FCB8A;border-radius:16px;padding:5px 12px;font:13px var(--sans,system-ui);color:var(--bone,#E8DFC8);cursor:pointer;text-align:center";
el.title = "Tap to send them back to work";
el.onclick = function () { if (ESC)
stfEscortEnd("<b>" + esc(ESC.name.split(" ")[0]) + "</b> goes back to work."); };
document.body.appendChild(el);
}
var n = esc(ESC.name.split(" ")[0]), W = ESC.way, h;
if (ESC.phase === "coming")
h = "🚶 <b>" + n + "</b> is coming over to take you to <b>" + esc(ESC.T.label) + "</b>";
else {
var P = camera.position, arrow = "";
if (W) {
var want = Math.atan2(-(W.x - P.x), -(W.z - P.z)), turn = (typeof atlWrap === "function") ? atlWrap(want - yaw) : 0;
arrow = ["↑", "↗", "→", "↘", "↓", "↙", "←", "↖"][Math.round(((-turn / (Math.PI * 2)) * 8 + 8)) % 8] + " ";
}
h = "🚶 Follow <b>" + n + "</b> to <b>" + esc(ESC.T.label) + "</b>" + (W ? " · " + arrow + (W.goal ? Math.round(Math.hypot(W.x - P.x, W.z - P.z)) + " m" : esc(W.label)) : "");
}
h += ' <span style="opacity:.6">· tap to stop</span>';
if (el.dataset.h !== h) {
el.dataset.h = h;
el.innerHTML = h;
}
el.style.display = "block";
},
function (arg) {
var L = tglPlaces().concat([{ k: "home", name: "home" }]);
var p = arg ? stfBest(arg, L, function (x) { return x.name; }) : null;
if (arg && !p)
return { ok: false, say: "(The cab office doesn't know “" + esc(arg) + "”.)" };
if (!p)
return { ok: false, say: "(Where to? Say the place.)" };
if (!(typeof signedIn === "function" && signedIn()))
return { ok: false, say: "(Sign in to take a cab: the fare comes from your purse.)" };
if (store.inside) {
STF.cab = { k: p.k, name: p.name, until: Date.now() + 10 * 60000 };
return { ok: true, say: "<b>A cab is called for " + esc(p.name) + ".</b> It pulls up at the kerb as you step outside." };
}
stfSoon(function () { txiCall(p.k); });
return { ok: true };
},
function (ctx, what) {
what = String(what || "").trim();
if (!(typeof signedIn === "function" && signedIn()) || typeof freshToken !== "function" || !DW_CONFIG || !DW_CONFIG.supabaseUrl)
return { ok: false, say: "(Sign in so a report can carry your name to the Corp.)" };
if (what.length < 4)
return { ok: false, say: "(Say what happened, and the report goes in.)" };
var me = (typeof dreamer === "function" && dreamer().name) || "a dreamer", where = ctx.place || (typeof stfRowWhere === "function" ? "Somnucor" : "");
var log = (ctx.c && ctx.c.log || []).slice(-8).map(function (t) { return (t.who === "me" ? me : ctx.name) + ": " + t.text; }).join("\n");
freshToken().then(function (tok) {
if (!tok)
throw new Error("not signed in");
return fetch(DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/rest/v1/messages", { method: "POST",
headers: { apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + tok, "Content-Type": "application/json", Prefer: "return=minimal" },
body: JSON.stringify({ kind: "support", subject: ("Report to the Dragon Corp: " + what.replace(/\s+/g, " ")).slice(0, 190),
body: "Taken by " + ctx.name + (ctx.title ? " (" + ctx.title + ")" : "") + " at " + where + ".\n\n" + what.slice(0, 3000) + (log ? "\n\nThe conversation:\n" + log.slice(0, 6000) : ""),
attachments: { report: { by: ctx.name, title: ctx.title, place: where, at: new Date().toISOString() } } }) });
}).then(function (r) { setStatus(r && r.ok ? "<b>Your report is in.</b> It is on the Dragon Corp's desk; the Keeper reads every one." : "<b>The report didn't go through.</b> Try again in a moment."); })
.catch(function () { setStatus("<b>The report didn't go through.</b> Try again in a moment."); });
return { ok: true };
},
function (c) {
var box = document.getElementById("stf-chips");
if (!c) {
if (box)
box.style.display = "none";
return;
}
var talk = document.getElementById("talk"), say = document.getElementById("t-say");
if (!talk || !say)
return;
if (!box) {
box = document.createElement("div");
box.id = "stf-chips";
box.style.cssText = "display:flex;flex-wrap:wrap;gap:6px;margin:0 0 8px";
talk.insertBefore(box, say);
box.addEventListener("click", function (e) { var b = e.target.closest && e.target.closest("[data-stf]"); if (!b || !STF.ctx)
return; stfChip(b.getAttribute("data-stf")); });
box.addEventListener("keydown", function (e) { e.stopPropagation(); if (e.key === "Enter" && e.target && e.target.id === "stf-arg") {
e.preventDefault();
stfChipGo();
} });
}
var ctx = stfCtx(c), A = stfAvailable(ctx);
box.innerHTML = A.map(function (d) { return '<button class="btn" data-stf="' + d.tag + '" style="padding:3px 9px;font-size:12.5px">' + esc(d.label || d.tag) + '</button>'; }).join("") +
'<div id="stf-ask" style="display:none;width:100%;gap:6px;align-items:center"><input id="stf-arg" list="stf-list" style="flex:1;min-width:0;padding:5px 8px;border-radius:5px;border:1px solid rgba(201,190,168,.4);background:#0C0B14;color:#E6E0D2;font:14px var(--sans,system-ui)"><datalist id="stf-list"></datalist><button class="btn" data-stf="go" style="padding:3px 10px">Go</button></div>';
box.style.display = A.length ? "flex" : "none";
},
function (tag) {
if (tag === "go")
return stfChipGo();
var d = stfDef(tag);
if (!d)
return;
if (!d.arg)
return stfChipRun(tag, "");
STF.chip = tag;
var ask = document.getElementById("stf-ask"), inp = document.getElementById("stf-arg"), dl = document.getElementById("stf-list");
var opts = [];
if (tag === "ESCORT" || tag === "GUIDE") {
if (tag === "ESCORT") {
stfRooms().forEach(function (r) { opts.push(r.label); });
(STF.roster || []).forEach(function (r) { opts.push(r.name); });
}
stfPlaces().forEach(function (p) { opts.push(p.label); });
}
if (tag === "CAB" && typeof tglPlaces === "function")
tglPlaces().forEach(function (p) { opts.push(p.name); });
var seen = {};
dl.innerHTML = opts.filter(function (o) { if (seen[o])
return false; seen[o] = 1; return true; }).slice(0, 200).map(function (o) { return '<option value="' + esc(o) + '">'; }).join("");
inp.placeholder = tag === "REPORT" ? "what happened" : "where to, or who";
inp.value = "";
ask.style.display = "flex";
inp.focus();
},
function (tag, arg) {
var c = STF.ctx;
if (!c)
return;
var d = stfDef(tag), word = { ESCORT: "Could someone walk me to " + arg + "?", GUIDE: "Which way is " + arg + "?", SERVE: "Could I see the menu?", SELL: "What do you have for sale?",
BANK: "I'd like to do some banking.", TREAT: "Could you see to me?", HIRE: "Are you hiring?", CAB: "Could you call me a cab to " + arg + "?", REPORT: "I want to report something: " + arg }[tag] || ((d && d.label) || tag) + (arg ? " " + arg : "");
c.log.push({ who: "me", text: word });
var r = stfDo(c, { tag: tag, arg: arg }, arg);
var ok = r && r.ok !== false;
c.log.push({ who: "them", text: ok ? ({ ESCORT: "Of course. Someone will walk you there now.", GUIDE: "That way. Follow the pointer.", REPORT: "Noted, every word. It's on the Corp's desk now.", CAB: "Done. The cab's coming." }[tag] || "Certainly.") : String((r && r.say) || "I can't do that from here.").replace(/<[^>]+>/g, "").replace(/^\(|\)$/g, "") });
if (typeof renderLog === "function" && typeof talkWith !== "undefined" && talkWith === c)
renderLog();
if (typeof save === "function")
save();
}
];
});
