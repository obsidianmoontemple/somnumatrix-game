/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var CORP = { data: null, at: 0, mounted: false };
var SECTOR_A0 = 0.19, SECTOR_W = Math.PI / 4;
function sectorAt(x, z) { var a = Math.atan2(z - ATLC.z, x - ATLC.x); return 1 + Math.floor((((a - SECTOR_A0) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) / SECTOR_W); }
var JUDGE_TITLES = ["Judge", "Magistrate", "Chief magistrate"];
function justiceRoles() {
var jobs = ((typeof WORK !== "undefined" && WORK.data && WORK.data.jobs) || []).map(function (j) { return { panel: j.panel, title: j.title }; })
.concat(((typeof standing !== "undefined" && standing && standing.jobs) || []).map(function (j) { return { panel: j.panel, title: j.job }; }));
var has = function (p) { return jobs.some(function (j) { return j.panel === p; }); };
var keeper = typeof amKeeper === "function" && amKeeper();
var r = { police: has("police"), court: has("court"), gaol: has("prison"), keeper: !!keeper,
judge: keeper || jobs.some(function (j) { return JUDGE_TITLES.indexOf(j.title) >= 0; }) };
r.officer = r.police || r.court || r.keeper;
r.desk = r.officer || r.gaol;
return r;
}
function amCorp() { return justiceRoles().police; }
if (typeof amOfficer === "function")
amOfficer = function () { return justiceRoles().officer; };
(function () {
if (typeof targetsFor !== "function")
return;
var tf = targetsFor;
targetsFor = function (kind) {
if (kind !== "sector")
return tf(kind);
var sec = (CORP.data && CORP.data.sector) || sectorAt(camera.position.x, camera.position.z), out = [];
var a0 = SECTOR_A0 + (sec - 1) * SECTOR_W;
Object.keys(ATL_STREETS).forEach(function (k) {
ATL_STREETS[k].forEach(function (rs) {
for (var i = 1; i < 6; i++) {
var a = a0 + SECTOR_W * i / 6;
out.push({ x: ATLC.x + Math.cos(a) * rs, z: ATLC.z + Math.sin(a) * rs, name: "sector " + sec + ", " + (corpRingNameAt(rs) || "the street") });
}
});
});
return out;
};
})();
function corpRingNameAt(r) { for (var i = 0; i < ATL_RINGS.length; i++)
if (r >= ATL_RINGS[i].S && r <= ATL_RINGS[i].E)
return ATL_RINGS[i].name; return "the city"; }
function corpMount(on) { return __ZC(97, 0, this, arguments, new.target); }
function corpRefresh(force) { return __ZC(97, 1, this, arguments, new.target); }
function corpHtml() { return __ZC(97, 2, this, arguments, new.target); }
function corpWire(el) { return __ZC(97, 3, this, arguments, new.target); }
(function () {
if (typeof workPaint !== "function")
return;
var wp = workPaint;
workPaint = function () {
wp();
var el = document.getElementById("work");
if (!el || el.style.display === "none")
return;
var h = corpHtml();
if (!h && !MERIT.score)
return;
var box = document.createElement("div");
box.innerHTML = (MERIT.score ? '<div class="job">Your merit: <b>' + MERIT.score + '</b> <span style="color:var(--dim)">· 100 is good standing; work and errands raise it, misdeeds lower it</span></div>' : '') + h;
el.appendChild(box);
corpWire(box);
};
var wr = workRefresh;
workRefresh = function (force) { return wr(force).then(function (d) { meritRefresh(); if (amCorp())
corpRefresh(force); return d; }); };
})();
(function () {
if (typeof workTick !== "function")
return;
var wt = workTick;
workTick = function (dt) {
var B = WORK.busy;
if (B && B.task && B.task.kind === "report") {
var s = B.stops[0], P = camera.position;
if (Math.hypot(s.x - P.x, s.z - P.z) < 12) {
WORK.busy = null;
var r = document.getElementById("work-run");
if (r)
r.style.display = "none";
setStatus("<b>You are there.</b> See to it, then close the report from your panel.");
}
else
workRunPaint();
return;
}
wt(dt);
corpTick(dt);
};
})();
var MERIT = { score: 0, at: 0 };
function meritRefresh() {
if (!(typeof signedIn === "function" && signedIn()))
return;
if (Date.now() - MERIT.at < 60000)
return;
MERIT.at = Date.now();
cityRpc("my_merit").then(function (m) { if (m)
MERIT.score = m.score; }).catch(function () { });
}
function nearestDreamer(maxD) { return __ZC(97, 4, this, arguments, new.target); }
var misdeedCool = 0;
function misdeed(kind, victim, note) {
if (misdeedCool > 0)
return;
misdeedCool = 3;
cityRpc("merit_misdeed", { p_kind: kind, p_victim: victim || null, p_note: note }).catch(function () { });
MERIT.at = 0;
}
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
if (!walkMode || !inCityNow())
return;
if (e.code === "KeyX") {
var v = nearestDreamer(3);
if (!v)
return;
if (typeof assaultDreamer === "function")
return assaultDreamer(v);
misdeed("assault", v.id, "struck at " + (v.name || "a dreamer"));
if (v.p && typeof sayOver === "function")
sayOver(v.id, "…unhurt.");
cityRpc("say_in_city", { p_body: "* strikes at " + (v.name || "a dreamer") + " — it does them no harm *", p_channel: "near" }).catch(function () { });
setStatus("You strike at <b>" + esc(v.name || "them") + "</b>. It does them no harm at all — here, it cannot. It only marks you, and the Dragon Corp is told.");
}
if (e.code === "KeyT") {
var P = camera.position, stall = cityObjs().filter(function (o) { return /marketstall|marketawning|shop/.test(o.archetype) && Math.hypot(o.x - P.x, o.z - P.z) < 4; })[0];
if (!stall)
return;
if (typeof theftAtStall === "function")
return theftAtStall(stall);
misdeed("theft", null, "took from " + (stall.label || stall.name || "a market stall"));
setStatus("You pocket something from the stall. It is worth nothing to you — but it is marked against you, and the Dragon Corp is told.");
}
});
var CS = { out: 0, busy: null };
var CS_TASKS = [
{ task: "Sweep the Warrens streets", kind: "round", stops: 4 },
{ task: "Clear the rubble", kind: "gather", node: "rubble", secs: 12 },
{ task: "Serve at the soup kitchen", kind: "desk", at: "soup", secs: 16 },
{ task: "Scrub the Gaol yard", kind: "desk", at: "yard", secs: 14 }
];
function csAllowed() { return CS.out > Date.now(); }
function csInWarrens() { if (!ATLC)
return false; var P = camera.position, r = Math.hypot(P.x - ATLC.x, P.z - ATLC.z); return r > 1520 && r < 1720 && !store.inside; }
(function () {
if (typeof gaolTick !== "function")
return;
var gt = gaolTick;
gaolTick = function (dt) {
if (csAllowed() && walkMode && typeof heldNow === "function" && heldNow()) {
if (csInWarrens() || (store.inside && INT && INT.spec && INT.spec.workplace === "The Gaol"))
return;
CS.out = 0;
toCell("<b>Back to your cell.</b> Community service is done in the Warrens, nowhere else.");
return;
}
gt(dt);
};
})();
function csPanel() { return __ZC(97, 5, this, arguments, new.target); }
function csSpot(which) { return __ZC(97, 6, this, arguments, new.target); }
function csStart(t) { return __ZC(97, 7, this, arguments, new.target); }
function csTick(dt) {
var held = typeof heldNow === "function" && heldNow();
var b = document.getElementById("work-btn");
if (held && inCityNow()) {
workEl();
b = document.getElementById("work-btn");
b.style.display = "block";
b.textContent = "Community service";
b.onclick = csPanel;
}
if (!held && b && (typeof smOrig === "function" ? smOrig(b) : b.textContent) === "Community service") {
b.textContent = "Your work";
b.onclick = function () { WORK.open = !WORK.open; if (WORK.open)
workRefresh(true); workPaint(); };
}
var B = CS.busy, run = document.getElementById("work-run");
if (!B) {
return;
}
if (!held) {
CS.busy = null;
if (run)
run.style.display = "none";
return;
}
var P = camera.position, msg = "";
if (B.task.kind === "round") {
var s = B.stops[B.i];
if (Math.hypot(s.x - P.x, s.z - P.z) < 8) {
B.i++;
if (B.i >= B.stops.length) {
csDone();
return;
}
}
s = B.stops[B.i];
var bearing = Math.atan2(s.x - P.x, s.z - P.z), rel = (bearing - (yaw + Math.PI)) * 180 / Math.PI;
msg = "Stop " + (B.i + 1) + " of " + B.stops.length + " · " + Math.round(Math.hypot(s.x - P.x, s.z - P.z)) + " m <span class='arrow' style='transform:rotate(" + (-rel).toFixed(0) + "deg)'>↑</span>";
}
else {
var at = false;
if (B.task.kind === "gather") {
var rub = cityObjs().filter(function (o) { return o.archetype === "rubble" && Math.hypot(o.x - P.x, o.z - P.z) < 8; })[0];
at = !!rub;
msg = at ? "Clearing…" : "Find a heap of rubble in the Warrens";
}
else {
at = B.spot && Math.hypot(B.spot.x - P.x, B.spot.z - P.z) < 14;
msg = at ? "Working…" : ("Go to " + (B.spot ? B.spot.name : "the place") + (B.spot ? " · " + Math.round(Math.hypot(B.spot.x - P.x, B.spot.z - P.z)) + " m" : ""));
}
if (at)
B.t += dt;
if (B.t >= B.need) {
csDone();
return;
}
msg += "<div class='bar'><i style='width:" + Math.min(100, B.t / B.need * 100).toFixed(0) + "%'></i></div>";
}
if (run) {
run.style.display = "block";
run.innerHTML = "<b>" + esc(B.task.task) + "</b><div style='margin-top:6px'>" + msg + "</div><div style='margin-top:6px'><button class='btn' id='cs-stop'>Stop</button></div>";
var st = document.getElementById("cs-stop");
if (st)
st.onclick = function () { CS.busy = null; run.style.display = "none"; };
}
}
function csDone() { return __ZC(97, 8, this, arguments, new.target); }
var CORP_SKY = [];
function corpTick(dt) {
if (misdeedCool > 0)
misdeedCool -= dt;
csTick(dt);
if (typeof eyrieTick === "function")
try {
eyrieTick(dt);
}
catch (e) {
if (window.console)
console.warn("eyrie:", e);
}
var r = somnucorRealm();
if (!r || !ATLC || typeof buildMountDragon !== "function")
return;
var roost = store.workplaceAt && store.workplaceAt["The Dragon Roost"];
if (!roost)
return;
if (!CORP_SKY.length) {
for (var i = 0; i < 4; i++) {
var g = buildMountDragon(["red", "blue", "bronze", "black"][i], { lod: true });
g.userData.pose = "fly";
var rider = buildFigure({ id: "corpsky_r" + i, archetype: "human", attrs: {}, nights: [], city: true, detail: 3,
look: { sex: i % 2 ? "f" : "m", top: 0x23324E, bottom: 0x1E2638, topKind: "shirt", bottomKind: "trousers", shoes: 0x2A1E14, gear: "cloak", gearColor: 0x23324E, hairStyle: i % 2 ? "long" : "short" } }, 1);
rider.position.y = DRAGON_SADDLE - DRAGON_HIP;
riderPose(rider);
g.add(rider);
g.traverse(function (m) { m.raycast = function () { }; });
scene.add(g);
CORP_SKY.push({ g: g, a: i * Math.PI / 2, r: i < 2 ? 60 : 900 + i * 300, h: i < 2 ? 70 : 140 + i * 20, v: i < 2 ? 0.25 : 0.06, cx: i < 2 ? roost.x : ATLC.x, cz: i < 2 ? roost.z : ATLC.z });
}
}
var P = camera.position, show = (store.here || 0) === r.id && !store.inside;
CORP_SKY.forEach(function (d) {
d.a += d.v * dt;
var x = d.cx + Math.cos(d.a) * d.r, z = d.cz + Math.sin(d.a) * d.r;
d.g.visible = show && Math.hypot(x - P.x, z - P.z) < 1500;
if (!d.g.visible)
return;
d.g.position.set(x, terrainY(x, z) + d.h, z);
d.g.rotation.y = Math.atan2(-Math.sin(d.a), Math.cos(d.a));
if (d.g.userData.anim)
try {
d.g.userData.anim(performance.now() / 1000, dt);
}
catch (e) { }
});
}
