/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(250, function () {
"use strict";
return [
function (force) {
if (RGAR.busy || RGAR.missing)
return Promise.resolve(RGAR.data);
if (!force && RGAR.data && Date.now() - RGAR.at < 30000)
return Promise.resolve(RGAR.data);
if (!(typeof signedIn === "function" && signedIn()))
return Promise.resolve(null);
RGAR.busy = true;
return cityRpc("race_garage", {}).then(function (d) { if (d && d.ok) {
RGAR.data = d;
RGAR.at = Date.now();
rgarCheckFit();
} return RGAR.data; })
.catch(function (e) { if (typeof rpcMissing === "function" && rpcMissing(e))
RGAR.missing = true; return null; })
.then(function (d) { RGAR.busy = false; return d; });
},
function () {
try {
var L = meLook(), F = rgarFit(), fx = (F.glow || F.trim) ? { glow: F.glow || null, trim: F.trim || null } : null;
var was = JSON.stringify(L.carFx || null), now = JSON.stringify(fx);
if (was === now)
return;
if (fx)
L.carFx = fx;
else
delete L.carFx;
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
},
function () {
if (!(typeof signedIn === "function" && signedIn())) {
worldCard(worldFacts("The club's garage", "Turbo upgrades and car lights", [], ["Sign in to earn race points and spend them here."]));
return;
}
worldCard(worldFacts("The club's garage", "The mechanics look up from a car", [], ["One moment…"]));
rgarLoad(true).then(function (d) {
if (!d) {
worldCard(worldFacts("The club's garage", "Turbo upgrades and car lights", [], [RGAR.missing ? "The garage opens soon. Race meanwhile: your times still go on the board." : "The garage could not be reached. Try again in a moment."]));
return;
}
rgarPaint();
});
},
function (name, label, on, dim, col) {
return "<span data-w='" + name + "' style='display:inline-block;margin:3px 4px 3px 0;padding:5px 9px;border-radius:12px;font-size:12px;" +
"border:1px solid " + (on ? "#FFD25A" : "rgba(143,180,232,.5)") + ";background:" + (on ? "rgba(255,210,90,.16)" : "rgba(143,180,232,.08)") + ";opacity:" + (dim ? 0.75 : 1) + "'>" +
(col !== undefined ? "<span style='display:inline-block;width:10px;height:10px;border-radius:5px;margin-right:5px;vertical-align:-1px;background:#" + ("00000" + col.toString(16)).slice(-6) + "'></span>" : "") + label + "</span>";
},
function (msg) {
var d = RGAR.data, F = rgarFit(), fns = {}, pr = d.prices || {}, h = "";
h += "<div style='margin:4px 0 8px'><b>" + (d.keeper ? "Everything is yours, Keeper." : d.points + " race points") + "</b>" + (d.keeper ? "" : "<span style='opacity:.75'> · earned " + d.earned + " in all</span>") + "</div>";
if (msg)
h += "<div style='margin:0 0 8px;color:#FFD25A'>" + esc(msg) + "</div>";
h += "<div style='font-size:12px;opacity:.8'>Turbo: more top speed and pick-up in any car you drive (the limits still apply off the course)</div>";
for (var t = 1; t <= 3; t++) {
(function (t) {
var own = rgarOwned("turbo" + t), name = "t" + t;
h += rgarChip(name, own ? ("Stage " + t + (rgarTurbo() === t ? " · in use" : "")) : ("Stage " + t + " · " + pr["turbo" + t] + " pts"), own && rgarTurbo() === t, !own);
fns[name] = function () { if (own) {
F.turbo = t;
rgarSaveFit(F);
rgarPaint("Turbo stage " + t + " in use.");
}
else
rgarBuy("turbo" + t); };
})(t);
}
h += rgarChip("t0", "Off" + (rgarTurbo() ? "" : " · in use"), !rgarTurbo(), false);
fns.t0 = function () { F.turbo = 0; rgarSaveFit(F); rgarPaint("Turbo off."); };
[["glow", "Underglow", "a soft light on the road under the car"], ["trim", "Neon trim", "a lit line along each side"]].forEach(function (k) {
h += "<div style='font-size:12px;opacity:.8;margin-top:8px'>" + k[1] + ": " + k[2] + " (steady, never blinking)</div>";
RGAR_NAMES.forEach(function (c) {
var item = k[0] + ":" + c, own = rgarOwned(item), on = F[k[0]] === c, name = k[0] + "_" + c;
h += rgarChip(name, own ? (c + (on ? " · on" : "")) : (c + " · " + pr[k[0]] + " pts"), on, !own, RGAR_COL[c]);
fns[name] = function () { if (own) {
F[k[0]] = c;
rgarSaveFit(F);
rgarPublish();
rgarPaint(k[1] + ": " + c + ".");
}
else
rgarBuy(item); };
});
var off = k[0] + "_off";
h += rgarChip(off, "Off", !F[k[0]], false);
fns[off] = function () { delete F[k[0]]; rgarSaveFit(F); rgarPublish(); rgarPaint(k[1] + " off."); };
});
h += "<div style='font-size:12px;opacity:.75;margin-top:8px'>Earn points: a live heat pays 1st 6 + 2 for every racer, 2nd 6, 3rd 4, any finish 2. A race against the club's rivals pays 2, or 4 for a win (up to 24 a day; " + (d.solo_left != null ? d.solo_left : 24) + " left today).</div>";
worldCard(worldFacts("The club's garage", "Turbo upgrades and car lights", [], []) + h, fns);
},
function (item) {
cityRpc("race_buy", { p_item: item }).then(function (o) {
if (o && o.ok) {
rgarLoad(true).then(function () {
var F = rgarFit(), k = item.split(":");
if (k.length === 2)
F[k[0]] = k[1];
else if (/^turbo/.test(item))
F.turbo = +item.slice(5);
rgarSaveFit(F);
rgarPublish();
rgarPaint((o.say || "Fitted.") + (o.paid ? " (" + o.paid + " points)" : ""));
});
}
else
rgarPaint((o && o.say) || "The garage could not fit that.");
}).catch(function () { rgarPaint("The garage could not be reached. Try again in a moment."); });
},
function () {
if (RGAR_GLOWTEX)
return RGAR_GLOWTEX;
var c = document.createElement("canvas");
c.width = c.height = 128;
var x = c.getContext("2d");
var g = x.createRadialGradient(64, 64, 6, 64, 64, 64);
g.addColorStop(0, "rgba(255,255,255,1)");
g.addColorStop(0.55, "rgba(255,255,255,.55)");
g.addColorStop(1, "rgba(255,255,255,0)");
x.fillStyle = g;
x.fillRect(0, 0, 128, 128);
RGAR_GLOWTEX = new THREE.CanvasTexture(c);
return RGAR_GLOWTEX;
},
function (arch, fx) {
if (!fx || !(fx.glow || fx.trim))
return null;
var sz = (typeof KIT !== "undefined" && KIT[arch] && KIT[arch].size) || [1.9, 1.5, 4.6], w = sz[0], l = sz[2], g = new THREE.Group();
if (fx.glow && RGAR_COL[fx.glow] !== undefined) {
var m = new THREE.Mesh(new THREE.PlaneGeometry(w + 2.2, l + 2), new THREE.MeshBasicMaterial({ map: rgarGlowTex(), color: RGAR_COL[fx.glow], transparent: true, opacity: 1, blending: THREE.AdditiveBlending, depthWrite: false }));
m.rotation.x = -Math.PI / 2;
m.position.y = 0.16;
m.renderOrder = 2;
g.add(m);
}
if (fx.trim && RGAR_COL[fx.trim] !== undefined) {
var tm = new THREE.MeshBasicMaterial({ color: RGAR_COL[fx.trim] }), y = Math.max(0.28, sz[1] * 0.26);
[-1, 1].forEach(function (s) { var b = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.06, l * 0.78), tm); b.position.set(s * (w / 2 + 0.02), y, 0); g.add(b); });
}
g.traverse(function (m) { m.raycast = function () { }; });
g.userData.carFx = true;
return g;
},
function () {
var el = document.getElementById("race-lobby");
if (!el)
return;
if (!(typeof signedIn === "function" && signedIn())) {
el.textContent = "Sign in to race other players.";
return;
}
cityRpc("race_lobby", { p_track: "warrens" }).then(function (o) {
var e2 = document.getElementById("race-lobby");
if (!e2 || !o || !o.ok)
return;
e2.textContent = o.grid ? (o.grid + " on the grid now, starting in about " + Math.max(1, Math.round((o.starts - o.now) / 1000)) + " s") : o.running ? "A heat is running now; join the next one." : "No one on the grid yet: join and the heat starts when a second racer comes.";
}).catch(function (e) { var e3 = document.getElementById("race-lobby"); if (e3 && typeof rpcMissing === "function" && rpcMissing(e))
e3.textContent = "Live heats open soon."; });
},
function (own) {
var T = raceTrack();
if (!T || RACE.on)
return;
if (!(typeof signedIn === "function" && signedIn())) {
setStatus("Sign in to race other players.");
return;
}
if (!raceNight()) {
setStatus("<b>The steward shakes their head.</b> " + raceDayWords());
return;
}
if (!raceLicensed()) {
setStatus("<b>The steward shakes their head.</b> No driving licence, no race. The Licensing Office in the Civic Ring tests learners.");
return;
}
if (!own && typeof DRIVE !== "undefined" && DRIVE.on) {
setStatus("Get out of what you are driving first, or bring it to the start line.");
return;
}
setStatus("The steward writes you onto the next heat…");
cityRpc("race_join", { p_track: "warrens" }).then(function (o) {
if (!o || !o.ok) {
setStatus(esc((o && o.say) || "The steward could not write you in."));
return;
}
var me = (o.racers || []).filter(function (r) { return r.me; })[0];
if (!me)
return;
var heat = { id: o.heat, slot: me.slot, racers: o.racers, status: o.status, startLocal: o.starts - (o.now - Date.now()), polled: Date.now(), busy: false, said: 0 };
raceStart(own ? true : null, heat);
if (!RACE.on || RACE.live !== heat) {
cityRpc("race_leave", { p_heat: heat.id }).catch(function () { });
return;
}
rliveState(o);
rgarLoad();
}).catch(function (e) { setStatus(typeof rpcMissing === "function" && rpcMissing(e) ? "Live heats open soon. Race the club's three rivals meanwhile." : "The steward could not be reached. Try again in a moment."); });
},
function (o) {
var L = RACE.live;
if (!L || !o)
return;
if (o.ok === false) {
if (RACE.on)
raceEnd(null, esc(o.say || "The heat is over."));
return;
}
L.racers = o.racers || [];
L.status = o.status;
var st = o.starts - (o.now - Date.now());
if (Math.abs(st - L.startLocal) > 800) {
L.startLocal = st;
if (RACE.phase === "lights" && o.status === "open") {
RACE.phase = "grid";
(RACE.lamps || []).forEach(function (m) { m.material.color.setHex(0x2A1A1A); });
}
}
if (o.status === "done" && RACE.phase === "go") {
raceEnd(null, "The heat is over.");
return;
}
L.racers.forEach(function (r) {
if (r.me)
return;
var G = rliveGhost(r);
if (!G)
return;
G.target = (r.progress || 0) + (r.speed || 0) * Math.min(2, (r.age || 0) / 1000);
G.speed = r.speed || 0;
G.lane = r.lane || 0;
G.r = r;
});
},
function () {
var L = RACE.live;
if (!L || L.busy)
return;
L.busy = true;
L.polled = Date.now();
var D = DRIVE, P = camera.position, T = RACE.trk, q = racePolar(P.x, P.z), go = RACE.phase === "go";
cityRpc("race_heat", { p_heat: L.id, p_progress: go ? raceAlong(q.a) * T.rs : 0, p_speed: go ? Math.abs(D.v) : 0, p_lane: q.r - T.rs, p_cp: RACE.cp })
.then(rliveState).catch(function () { }).then(function () { L.busy = false; });
},
function (dt) {
var L = RACE.live, now = Date.now(), n = (L.racers || []).filter(function (r) { return !r.out; }).length;
if (now - L.polled > (RACE.phase === "go" ? 700 : 1500))
rlivePoll();
var left = (L.startLocal - now) / 1000;
if (RACE.phase === "grid") {
if (n >= 2 && left <= 4)
RACE.phase = "lights";
else if (now - L.said > 1000) {
L.said = now;
setStatus(n < 2 ? "<b>Live heat</b> · waiting on the grid for another racer. Anyone at the Warrens club can join; Q to leave the grid."
: "<b>Live heat</b> · " + n + " racers on the grid · the lamps light in " + Math.max(1, Math.ceil(left - 4)) + " s");
}
}
if (RACE.phase === "lights")
RACE.t = Math.max(0, 4 - left);
if (RACE.phase === "go")
RACE.t = rliveClock();
rliveGhostsTick(dt);
return true;
},
function (r) {
var G = RLIVE.ghosts[r.id];
if (G)
return G;
var look = null;
try {
var p = presenceOthers[r.id];
if (p && p.lastLook)
look = JSON.parse(p.lastLook);
}
catch (e) { }
var arch = (look && look.ride && typeof vehicleKindOf === "function" && vehicleKindOf(look.ride) === "road") ? look.ride : "sportscar";
var cols = [0x2A6ACF, 0x1E9A5A, 0xE8C030, 0xC81E28, 0x7A3ACF, 0xE07020, 0x20A0B0, 0xDDDDDD], g = null;
try {
g = build({ id: "__rl_" + r.id, archetype: arch, attrs: { c: cols[r.slot % 8] }, solid: false, detail: 4, nights: [], city: true });
if (typeof modelDress === "function")
modelDress(g, { id: "__rl_" + r.id, archetype: arch, attrs: { c: cols[r.slot % 8] }, solid: true, placed: true });
}
catch (e) {
g = new THREE.Group();
}
var holder = new THREE.Group();
holder.add(g);
var fx = look && look.carFx ? rgarFxGroup(arch, look.carFx) : null;
if (fx)
holder.add(fx);
if (typeof makeTag === "function") {
try {
var tag = makeTag(r.name || "a racer", false);
tag.position.y = 2.6;
holder.add(tag);
holder.userData.tag = tag;
}
catch (e) { }
}
holder.traverse(function (m) { m.raycast = function () { }; });
scene.add(holder);
var T = RACE.trk, back = 5 + 7 * Math.floor(r.slot / 2);
G = RLIVE.ghosts[r.id] = { g: holder, cur: -back, target: -back, speed: 0, lane: ROAD_SIDE * 2.6 * (r.slot % 2 ? -1 : 1), r: r };
return G;
},
function (dt) {
var T = RACE.trk, go = RACE.phase === "go";
Object.keys(RLIVE.ghosts).forEach(function (id) {
var G = RLIVE.ghosts[id], r = G.r;
if (r.out) {
G.g.visible = false;
return;
}
if (go) {
G.target += G.speed * dt;
G.cur += G.speed * dt;
G.cur += (G.target - G.cur) * Math.min(1, dt * 2);
}
if (r.ms != null)
G.cur = Math.max(G.cur, Math.min(G.cur + G.speed * dt, T.len + 30 + r.slot * 6));
var a = T.a0 + G.cur / T.rs, rr = T.rs + G.lane, p = raceXZ(a, rr);
G.g.position.set(p.x, terrainY(p.x, p.z), p.z);
G.g.rotation.y = Math.atan2(-Math.sin(a), Math.cos(a));
var pp = typeof presenceOthers !== "undefined" && presenceOthers[id];
if (pp && pp.group) {
pp.group.visible = false;
RLIVE.hid[id] = 1;
}
});
},
function () {
Object.keys(RLIVE.ghosts).forEach(function (id) { var G = RLIVE.ghosts[id]; if (G.g.userData.tag && typeof dropTag === "function")
try {
dropTag(G.g.userData.tag);
}
catch (e) { } scene.remove(G.g); });
RLIVE.ghosts = {};
Object.keys(RLIVE.hid).forEach(function (id) { var pp = presenceOthers[id]; if (pp && pp.group)
pp.group.visible = true; });
RLIVE.hid = {};
},
function (L, secs, why) {
if (secs === null) {
setTimeout(rliveClear, 500);
cityRpc("race_leave", { p_heat: L.id }).catch(function () { });
setStatus("<b>Out of the live heat.</b> " + (why || ""));
return;
}
var ms = Math.round(secs * 1000), best = raceBest();
if (!best || ms < best)
try {
localStorage.setItem("somnu.raceBest.warrens", String(ms));
}
catch (e) { }
worldCard(worldFacts("Across the line", "The steward signs your time", [["Your time", raceFmt(ms)]], ["Signing…"]));
cityRpc("race_heat", { p_heat: L.id, p_progress: RACE.trk.len, p_speed: 0, p_lane: 0, p_cp: RACE_CP })
.then(function () { return cityRpc("race_finish", { p_heat: L.id, p_ms: ms }); })
.then(function (o) {
RGAR.at = 0;
RACE.boardAt = 0;
if (!o || !o.ok) {
worldCard(worldFacts("Across the line", "", [["Your time", raceFmt(ms)]], [esc((o && o.say) || "The steward could not sign it.")]));
setTimeout(rliveClear, 4000);
return;
}
setStatus(esc(o.say));
var show = function (st) {
var rows = [["Your time", raceFmt(ms)], ["Place", o.place + " of " + o.of], ["Race points", "+" + o.points]];
((st && st.racers) || L.racers || []).forEach(function (r) { if (r.me)
return; rows.push([esc(r.name || "a racer"), r.ms != null ? raceFmt(r.ms) + " (" + r.place + ")" : r.out ? "out" : "still racing"]); });
worldCard(worldFacts(o.place === 1 ? "You win the heat!" : "Finished", o.place === 1 ? "First across the line" : "", rows, ["Spend race points at the club's garage, by the sign."]) + worldBtn("garage", "The club's garage", "Turbo and car lights"), { garage: rgarOpen });
};
show(null);
var k = 0, more = function () {
if (++k > 8) {
rliveClear();
return;
}
cityRpc("race_heat", { p_heat: L.id, p_progress: RACE.trk.len, p_speed: 0, p_lane: 0, p_cp: RACE_CP }).then(function (st) {
if (st && st.ok) {
L.racers = st.racers;
if (WLD && WLD.card && WLD.card.style.display === "block" && /heat|Finished/.test(WLD.card.textContent))
show(st);
rliveState(st);
if (st.status === "done") {
setTimeout(rliveClear, 3000);
return;
}
}
setTimeout(more, 2500);
}).catch(function () { setTimeout(more, 2500); });
};
setTimeout(more, 2500);
}).catch(function () { worldCard(worldFacts("Across the line", "", [["Your time", raceFmt(ms)]], ["The steward could not be reached; the time is kept in this browser."])); setTimeout(rliveClear, 4000); });
}
];
});
