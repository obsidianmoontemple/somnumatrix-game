/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var JOBWORK_TARGETS = { "Bailiff": { "Serve a summons": ["homes"] }, "Ferryman": { "Run the ferry round the moat": ["docks"] }, "Harbourmaster": { "Inspect the moorings": ["docks"] }, "Shepherd": { "Walk the flock round the fields": ["fields"] }, "Forester": { "Mark trees for felling": ["trees"] }, "Dream warden": { "Walk the Hall of Doors": ["gate"] }, "Gate technician": { "Inspect the gate lamps": ["lamps"] }, "Guide": { "Show a newcomer the city": ["workplaces"] }, "Hall porter": { "Sweep the Hall's steps": ["gate"] }, "Gazette writer": { "Gather the news about the city": ["workplaces"] }, "Midwife": { "Visit new mothers at home": ["homes"] }, "Physician": { "Make house calls": ["homes"] }, "Cartographer": { "Survey a street": ["streets"] }, "City planner": { "Inspect the rings": ["workplaces"] }, "Surveyor": { "Measure out plots": ["plots"] }, "Pit foreman": { "Inspect the pits": ["rocks"] }, "Dragon rider": { "Fly your sector's patrol": ["sector"] }, "Night rider": { "Fly the night patrol over your sector": ["sector"] }, "Wing commander": { "Inspect your wing's sector": ["sector"] }, "Corp marshal": { "Fly over the whole city": ["stations"] }, "Letter carrier": { "Deliver the post": ["homes"] }, "Gaoler": { "Check the cells": ["gaol"] }, "Warden": { "Inspect the yard": ["gaol"] }, "Land assessor": { "Value a property": ["plots"] }, "Letting agent": { "Show a lot to let": ["plots"] }, "Realtor": { "Show a lot for sale": ["plots"] }, "Rent collector": { "Collect the rents": ["plots"] }, "Courier": { "Carry a parcel across the city": ["workplaces"] }, "Runner": { "Run a message": ["workplaces"], "Run errands for the shops": ["shops"] }, "Teacher": { "Walk the children home": ["homes"] }, "Bell ringer": { "Ring the bells along the Row": ["temples"] }, "Candle keeper": { "Light the candles in the houses": ["temples"] }, "Gravedigger": { "Tend the graveyard": ["temples"] }, "Temple keeper": { "Open the houses of Temple Row": ["temples"] }, "Temple warden": { "Keep watch along Temple Row": ["temples"] }, "Bus driver": { "Drive the omnibus round": ["stations"] }, "Carriage driver": { "Drive a fare across the city": ["workplaces"] }, "Driver": { "Drive a delivery": ["shops"] }, "Tram driver": { "Drive the tram round the ring": ["stations"] }, "Tax clerk": { "Deliver tax notices": ["shops"] }, "Carpenter": { "Repair woodwork about the city": ["workplaces"] }, "Dome keeper": { "Check the dome's panes": ["gardens"] }, "Electrician": { "Mend the wiring about the city": ["lamps"] }, "Engineer": { "Inspect the pumps": ["fountains"] }, "Gardener": { "Tend the city's gardens": ["gardens"] }, "Glazier": { "Replace broken panes": ["workplaces"] }, "Groundskeeper": { "Mow the greens": ["gardens"] }, "Lamplighter": { "Light the street lamps": ["lamps"] }, "Mason": { "Repair the city's walls": ["streets"] }, "Plumber": { "Fix the city's pipes": ["fountains"] }, "Road crew": { "Mend the road": ["streets"] }, "Roofer": { "Repair roofs about the city": ["homes"] }, "Sanitation": { "Clear the bins": ["streets"] }, "Sign writer": { "Repaint the street signs": ["signs"] }, "Street sweeper": { "Sweep the streets": ["streets"] }, "Water keeper": { "Check the falls and canals": ["fountains"] } };
var JOBWORK_STOPS = { "Bailiff|Serve a summons": 2, "Ferryman|Run the ferry round the moat": 3, "Harbourmaster|Inspect the moorings": 3, "Shepherd|Walk the flock round the fields": 3, "Forester|Mark trees for felling": 4, "Dream warden|Walk the Hall of Doors": 3, "Gate technician|Inspect the gate lamps": 3, "Guide|Show a newcomer the city": 4, "Hall porter|Sweep the Hall's steps": 3, "Gazette writer|Gather the news about the city": 3, "Midwife|Visit new mothers at home": 2, "Physician|Make house calls": 3, "Cartographer|Survey a street": 4, "City planner|Inspect the rings": 3, "Surveyor|Measure out plots": 3, "Pit foreman|Inspect the pits": 3, "Dragon rider|Fly your sector's patrol": 5, "Night rider|Fly the night patrol over your sector": 5, "Wing commander|Inspect your wing's sector": 4, "Corp marshal|Fly over the whole city": 4, "Letter carrier|Deliver the post": 5, "Gaoler|Check the cells": 3, "Warden|Inspect the yard": 3, "Land assessor|Value a property": 2, "Letting agent|Show a lot to let": 2, "Realtor|Show a lot for sale": 2, "Rent collector|Collect the rents": 4, "Courier|Carry a parcel across the city": 3, "Runner|Run a message": 2, "Runner|Run errands for the shops": 3, "Teacher|Walk the children home": 2, "Bell ringer|Ring the bells along the Row": 3, "Candle keeper|Light the candles in the houses": 4, "Gravedigger|Tend the graveyard": 2, "Temple keeper|Open the houses of Temple Row": 4, "Temple warden|Keep watch along Temple Row": 3, "Bus driver|Drive the omnibus round": 4, "Carriage driver|Drive a fare across the city": 3, "Driver|Drive a delivery": 3, "Tram driver|Drive the tram round the ring": 4, "Tax clerk|Deliver tax notices": 3, "Carpenter|Repair woodwork about the city": 3, "Dome keeper|Check the dome's panes": 3, "Electrician|Mend the wiring about the city": 3, "Engineer|Inspect the pumps": 3, "Gardener|Tend the city's gardens": 4, "Glazier|Replace broken panes": 3, "Groundskeeper|Mow the greens": 4, "Lamplighter|Light the street lamps": 6, "Mason|Repair the city's walls": 3, "Plumber|Fix the city's pipes": 3, "Road crew|Mend the road": 4, "Roofer|Repair roofs about the city": 3, "Sanitation|Clear the bins": 5, "Sign writer|Repaint the street signs": 3, "Street sweeper|Sweep the streets": 5, "Water keeper|Check the falls and canals": 3 };
var JOBWORK_NODE = { "Dock hand|Haul crates off the quay": "crates", "Fisherman|Cast a net from the quay": "water", "Dairyman|Milk the herd": "animals", "Farmhand|Bring in the harvest": "fields", "Shepherd|Shear the sheep": "animals", "Charcoal burner|Gather deadwood": "trees", "Forester|Plant saplings": "trees", "Lumberjack|Fell a tree": "trees", "Herbalist|Gather healing herbs": "gardens", "Miner|Dig at the seam": "crystal", "Quarryman|Quarry stone": "rocks", "Gardener|Grow flowers": "gardens" };
var WORK = { data: null, at: 0, busy: null, open: false, svc: {}, svcAt: 0, toast: "" };
function workServices() {
var now = Date.now();
if (now - WORK.svcAt < 120000)
return;
WORK.svcAt = now;
var f = (typeof signedIn === "function" && signedIn()) ? cityRpc("city_services_board") : null;
if (!f)
return;
f.then(function (rows) { (rows || []).forEach(function (r) { WORK.svc[r.key] = r.level; }); }).catch(function () { });
}
function svcLevel(k) { var v = WORK.svc[k]; return v === undefined ? 70 : v; }
(function () {
if (typeof lampsForNight === "function") {
var lf = lampsForNight;
lampsForNight = function (night) { lf(night * (0.25 + 0.75 * svcLevel("lighting") / 100)); };
}
})();
function wpReach(key) { var w = WP_BY_KEY && WP_BY_KEY[key]; return w && w.ring === "harvest" ? 200 : (key === "The Hunters' Lodge" ? 80 : 60); }
function wpAt(key) { return store.workplaceAt && store.workplaceAt[key]; }
function inCityNow() { var r = somnucorRealm(); return !!(r && walkMode && (store.here || 0) === r.id); }
function onSite(job) { return __ZC(96, 0, this, arguments, new.target); }
function inWilds() { if (!inCityNow() || store.inside || !ATLC)
return false; return Math.hypot(camera.position.x - ATLC.x, camera.position.z - ATLC.z) > 2160; }
var NODE_RE = { crystal: /crystal|gem|mineshaft/, rocks: /^rock$|crater|boulder|quarry/, trees: /^(tree|pine|oak|birch|willow|deadtree)$/,
fields: /field|crop|wheat|hay|orchard|vineyard|scarecrow|barn/, animals: /^(cow|sheep|goat|pig|horse|chicken)$/, water: /pier|boat|quay|dock|crane|fishingboat/,
gardens: /flower|hedge|topiary|garden|fountain|bush|lawn/, crates: /crates|barrel|pallets|sacks/ };
var TARGET_RE = { lamps: /streetlight|ornatelamp|dimlamp|lamppost|crystalbrazier|gaslamp/, fountains: /fountain|well|handpump/, signs: /^signboard$/,
docks: NODE_RE.water, trees: NODE_RE.trees, fields: NODE_RE.fields, rocks: NODE_RE.rocks, gardens: NODE_RE.gardens };
function cityObjs() { var r = somnucorRealm(); return r ? store.objects.filter(function (o) { return o.realm === r.id; }) : []; }
function targetsFor(kind) {
var out = [], rr = function (o) { return Math.hypot(o.x - ATLC.x, o.z - ATLC.z); };
if (kind === "homes")
lotPlots().forEach(function (p) { var h = p.homeId && specById(p.homeId); if (h)
out.push({ x: h.x, z: h.z, name: p.name }); });
else if (kind === "plots")
cityObjs().forEach(function (o) { if (o.plot)
out.push({ x: o.x, z: o.z, name: o.plot.name, plot: o.plot }); });
else if (kind === "workplaces" || kind === "shops")
Object.keys(store.workplaceAt || {}).forEach(function (k) {
var w = store.workplaceAt[k], wp = WP_BY_KEY[k];
if (kind === "shops" && !(wp && wp.ring === "markets"))
return;
out.push({ x: w.x, z: w.z, name: k });
});
else if (kind === "stations") {
(UNDERGROUND || []).forEach(function (s) { out.push({ x: s.x, z: s.z, name: s.name }); });
cityObjs().forEach(function (o) { if (o.archetype === "tramstop")
out.push({ x: o.x, z: o.z, name: "the tram stop" }); });
}
else if (kind === "temples")
cityObjs().forEach(function (o) { var d = KIT[o.archetype], r = rr(o); if (d && d.cat === "structure" && r > 660 && r < 960 && Math.max(d.size[0], d.size[2]) > 9)
out.push({ x: o.x, z: o.z, name: o.label || o.name || "the house" }); });
else if (kind === "gate")
cityObjs().forEach(function (o) { if (rr(o) < 140 && KIT[o.archetype] && KIT[o.archetype].cat !== "being")
out.push({ x: o.x, z: o.z, name: o.label || "the plaza" }); });
else if (kind === "gaol") {
var Y = store.gaolYard;
if (Y)
cityObjs().forEach(function (o) { if (/prisonwall|watchtower|brazier|crates/.test(o.archetype) && Math.hypot(o.x - Y.x, o.z - Y.z) < 80)
out.push({ x: o.x, z: o.z, name: "the yard" }); });
}
else if (kind === "streets") {
var P = camera.position, d = Math.hypot(P.x - ATLC.x, P.z - ATLC.z), best = null;
Object.keys(ATL_STREETS).forEach(function (k) { ATL_STREETS[k].forEach(function (rs) { if (best === null || Math.abs(rs - d) < Math.abs(best - d))
best = rs; }); });
var a0 = Math.atan2(P.z - ATLC.z, P.x - ATLC.x);
for (var i = -12; i <= 12; i++) {
var a = a0 + i * 30 / best;
out.push({ x: ATLC.x + Math.cos(a) * best, z: ATLC.z + Math.sin(a) * best, name: "the street" });
}
}
else {
var re = TARGET_RE[kind];
if (re)
cityObjs().forEach(function (o) { if (re.test(o.archetype))
out.push({ x: o.x, z: o.z, name: o.label || o.archetype }); });
}
return out;
}
function pickStops(kinds, n) { return __ZC(96, 1, this, arguments, new.target); }
function nearestNode(node, job) { return __ZC(96, 2, this, arguments, new.target); }
var CITYCLOCK = { offset: null, tz: "", at: 0 };
function cityClockLoad() {
if (Date.now() - CITYCLOCK.at < 600000)
return;
CITYCLOCK.at = Date.now();
if (typeof DW_CONFIG === "undefined" || !DW_CONFIG.supabaseUrl)
return;
fetch(DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/rest/v1/rpc/city_clock", { method: "POST",
headers: { apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + DW_CONFIG.supabaseKey, "Content-Type": "application/json" }, body: "{}" })
.then(function (r) { return r.ok ? r.json() : null; }).then(function (c) { if (c && typeof c.offset_min === "number") {
CITYCLOCK.offset = c.offset_min;
CITYCLOCK.tz = c.tz || "";
} }).catch(function () { });
}
function cityHourNow() {
if (CITYCLOCK.offset === null) {
var d = new Date();
return d.getHours() + d.getMinutes() / 60;
}
var t = Date.now() / 3600000 + CITYCLOCK.offset / 60;
return ((t % 24) + 24) % 24;
}
function hm(h) { h = ((h % 24) + 24) % 24; var H = Math.floor(h), M = Math.round((h - H) * 60); if (M === 60) {
H = (H + 1) % 24;
M = 0;
} return (H < 10 ? "0" : "") + H + ":" + (M < 10 ? "0" : "") + M; }
function inWindow(h, s, l, g) { if (s === null || s === undefined)
return false; g = g || 0; return (((h - (s - g)) % 24) + 24) % 24 <= l + 2 * g; }
function shiftNow(sh, g) { if (!sh)
return true; var h = cityHourNow(); return inWindow(h, sh.start1, sh.len1, g) || inWindow(h, sh.start2, sh.len2, g); }
function shiftWords(sh) {
if (!sh)
return "any time";
var w = hm(sh.start1) + "–" + hm(+sh.start1 + +sh.len1);
if (sh.start2 !== null && sh.start2 !== undefined)
w += " and " + hm(sh.start2) + "–" + hm(+sh.start2 + +sh.len2);
return w;
}
function shiftUntil(sh) {
var h = cityHourNow(), best = 99;
[[sh.start1, sh.len1], [sh.start2, sh.len2]].forEach(function (w) { if (w[0] === null || w[0] === undefined)
return; var d = ((w[0] - h) % 24 + 24) % 24; if (d < best)
best = d; });
return best;
}
function inWords(hrs) { var H = Math.floor(hrs), M = Math.round((hrs - H) * 60); return (H ? H + " h " : "") + M + " min"; }
function workEl() { return __ZC(96, 3, this, arguments, new.target); }
function workRefresh(force) {
cityClockLoad();
if (!(typeof signedIn === "function" && signedIn()))
return Promise.resolve(null);
if (!force && Date.now() - WORK.at < 30000)
return Promise.resolve(WORK.data);
WORK.at = Date.now();
return cityRpc("my_work").then(function (d) {
WORK.data = d || null;
if (d && d.clock && typeof d.clock.offset_min === "number") {
CITYCLOCK.offset = d.clock.offset_min;
CITYCLOCK.tz = d.clock.tz || "";
}
((d && d.services) || []).forEach(function (r) { WORK.svc[r.key] = r.level; });
WORK.svcAt = Date.now();
workPaint();
return d;
}).catch(function () { return null; });
}
var KIND_WORDS = { station: "at your post", desk: "at your post", round: "rounds", gather: "gathering", hunt: "in the Wilds", lamps: "every lamp in your ward", beds: "every garden in your ward" };
function workPaint() { return __ZC(96, 4, this, arguments, new.target); }
function pay(j) { return j.pay_kind === "salary" ? (j.rate + " gold a week") : (j.rate + " gold an hour"); }
function anyHours(j) { return !!j && (j.pay_kind === "salary" || !!j.any_hours || !!j.head || !!j.owner || /^(head|chief|commander|director|captain|manager|principal|governor|master)\b/i.test(String(j.title || ""))); }
var WARD_NAMES = ["the East", "the South-East", "the South", "the South-West", "the West", "the North-West", "the North", "the North-East"];
function wardName(n) { return "ward " + n + " (" + (WARD_NAMES[(n - 1) % 8] || "") + ")"; }
function wardOf(x, z) { if (!ATLC)
return 1; var a = Math.atan2(z - ATLC.z, x - ATLC.x); return Math.floor(((a + Math.PI / 8) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) / (Math.PI / 4)) + 1; }
function clockIn(j) { return __ZC(96, 5, this, arguments, new.target); }
function clockOut(j) {
if (WORK.busy && WORK.busy.job === j)
workCancel();
cityRpc("clock_out", { p_job: j.job_id }).then(function () { setStatus("Clocked out. Draw your pay whenever you like."); workRefresh(true); });
}
function clockedJob() { return ((WORK.data && WORK.data.jobs) || []).filter(function (j) { return j.clocked_in; })[0] || null; }
function shuffleSteps(steps, seed) { var a = steps.slice(), r = seed || 1; for (var i = a.length - 1; i > 0; i--) {
r = (r * 9301 + 49297) % 233280;
var k = Math.floor(r / 233280 * (i + 1));
var t = a[i];
a[i] = a[k];
a[k] = t;
} return a; }
function workStart(job, task) { return __ZC(96, 6, this, arguments, new.target); }
function workCancel(why) { WORK.busy = null; var r = document.getElementById("work-run"); if (r)
r.style.display = "none"; if (why)
setStatus(why); workPaint(); }
function workDone() { return __ZC(96, 7, this, arguments, new.target); }
function workChoose(step) {
var B = WORK.busy;
if (!B || B.chosen || B.penalty > 0)
return;
var want = B.steps[B.s];
if (step === want) {
B.chosen = true;
B.t = 0;
B.last = Date.now();
}
else {
B.penalty = 3;
setStatus("Not yet — first: <b>" + esc(want) + "</b>.");
}
workRunPaint();
}
function workRunPaint() { return __ZC(96, 8, this, arguments, new.target); }
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
var B = WORK.busy;
if (!B || e.code !== "KeyE")
return;
if ((B.task.kind === "round" || B.task.kind === "lamps") && B.atStop && !B.chosen) {
e.preventDefault();
e.stopImmediatePropagation();
workChoose(B.steps[0]);
}
}, true);
var workPaintAt = 0, hunterNear = null;
function workBeat() { return __ZC(96, 9, this, arguments, new.target); }
function loadWork() { return workRefresh(true); }
function workTick(dt) {
workServices();
var noJob = WORK.data && !(WORK.data.jobs || []).length;
if (typeof signedIn === "function" && signedIn() && inCityNow() && (!WORK.data || noJob) && Date.now() - WORK.at > (noJob ? 120000 : 30000))
workRefresh(false);
var b = document.getElementById("work-btn");
if (!b && WORK.data && (WORK.data.jobs || []).length)
workEl();
workPaintAt -= dt;
if (workPaintAt <= 0) {
workPaintAt = 0.5;
var bb = document.getElementById("work-btn");
if (bb)
bb.style.display = (inCityNow() && WORK.data && (WORK.data.jobs || []).length) ? "block" : "none";
}
hunterTick();
if (WORK.lastP) {
WORK.moved = (WORK.moved || 0) + Math.hypot(camera.position.x - WORK.lastP.x, camera.position.z - WORK.lastP.z);
}
WORK.lastP = { x: camera.position.x, z: camera.position.z };
WORK.beatAt = (WORK.beatAt || 0) - dt;
if (WORK.beatAt <= 0) {
WORK.beatAt = 60;
if (clockedJob() && inCityNow())
workBeat();
}
var B = WORK.busy;
if (!B || B.sending)
return;
if (!inCityNow()) {
workCancel("You left the city; the work is left off.");
return;
}
var P = camera.position, k = B.task.kind;
if (B.penalty > 0)
B.penalty -= dt;
if (k === "station" || k === "desk" || k === "gather") {
if (k === "gather") {
if (!B.node || Math.random() < 0.01)
B.node = nearestNode(B.task.node || JOBWORK_NODE[B.job.title + "|" + B.task.task] || "crates", B.job);
B.atNode = B.node && (B.node.fallback ? onSite(B.job) : Math.hypot(B.node.x - P.x, B.node.z - P.z) < 9);
B.paused = !B.atNode;
}
else
B.paused = !onSite(B.job);
if (!B.paused && B.chosen) {
B.t += dt;
B.last = WORK.lastWork = Date.now();
if (B.t >= B.stepSecs) {
B.chosen = false;
B.t = 0;
B.s++;
if (B.s >= B.steps.length) {
B.s = 0;
B.item++;
if (B.item >= B.items) {
workDone();
return;
}
}
}
}
}
else if (k === "round" || k === "lamps" || k === "beds") {
var s = B.stops[B.i];
if (!s) {
workDone();
return;
}
var near = Math.hypot(s.x - P.x, s.z - P.z) < (k === "lamps" ? 5 : 8);
if (near !== B.atStop) {
B.atStop = near;
if (!near) {
B.chosen = false;
B.t = 0;
}
}
if (near)
B.last = WORK.lastWork = Date.now();
if (near && B.chosen && k !== "beds") {
B.t += dt;
if (B.t >= B.stepSecs) {
B.chosen = false;
B.t = 0;
if (k === "lamps" && typeof lampDone === "function")
lampDone(B, s);
B.i++;
B.atStop = false;
if (B.i >= B.stops.length) {
workDone();
return;
}
setStatus("<b>" + esc(s.name || "Done") + "</b> — done. On to the next.");
}
}
if (k === "beds" && B.bedBusy) {
B.t += dt;
if (B.t >= B.stepSecs) {
var act = B.bedBusy;
B.bedBusy = null;
B.t = 0;
if (typeof bedDone === "function")
bedDone(B, s, act);
}
}
}
workRunPaint();
}
function amHunter() { return ((WORK.data && WORK.data.jobs) || []).some(function (j) { return j.panel === "hunt"; }); }
function hunterTick() {
hunterNear = null;
if (!amHunter() || !inWilds() || typeof nmOpen === "undefined" || nmOpen)
return;
var P = camera.position, list = store.wildsNightmares || [], best = null, bd = 7;
list.forEach(function (w) {
var g = meshes[w.id];
if (!g || !g.visible || g.userData.nmGone)
return;
var d = Math.hypot(g.position.x - P.x, g.position.z - P.z);
if (d < bd) {
bd = d;
best = w;
}
});
hunterNear = best;
if (best && !WORK.huntSaid) {
WORK.huntSaid = best.id;
setStatus("A nightmare is close — press <b>H</b> to hunt it.");
}
if (!best)
WORK.huntSaid = null;
}
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
if (e.code === "KeyH" && hunterNear && typeof openEncounter === "function" && typeof wildChar === "function") {
e.preventDefault();
openEncounter(wildChar(hunterNear, null));
}
});
(function () {
if (typeof defeatNightmare !== "function")
return;
var dn = defeatNightmare;
defeatNightmare = function (c, way) {
var r = dn.apply(this, arguments);
if (c && c.wild && amHunter()) {
var jobs = (WORK.data.jobs || []).filter(function (j) { return j.panel === "hunt" && j.clocked_in; });
var j = jobs[0], t = j && (j.tasks || []).filter(function (x) { return x.kind === "hunt"; })[0];
if (j && t) {
WORK.busy = { job: j, task: t, t: 0, need: 0, ref: c.objId || null, steps: ["Face the nightmare"], items: 1, item: 0, s: 0, last: Date.now() };
workDone();
}
else if (!jobs.length)
setStatus("Faced — but you were not clocked in, so it does not count toward your work.");
}
return r;
};
})();
