/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var NH = { raids: [], slain: [], at: 0, fetched: 0, night: false, missing: false, specs: {}, hp: {}, open: false, trophies: null, tAt: 0, beacon: null, said: {}, msg: "", hunters: 0 };
var NH_TYPES = ["", "Lesser", "Common", "Fearsome", "Dread", "Terror"];
var NH_STR = ["", "Weak", "Hardy", "Strong", "Savage", "Monstrous"];
var NH_TIER = { fenrir: 5, kraken: 5, giant: 4, frostgiant: 4, demon: 4, manticore: 4, chimera: 4, cerberus: 4, basilisk: 4, seaserpent: 4,
troll: 3, ogre: 3, werewolf: 3, vampire: 3, wraith: 3, gorgon: 3, minotaur: 3, nighthag: 3, tallman: 3, boogeyman: 3, oni: 3, nightmare: 3, kelpie: 3, siren: 3, giantworm: 3,
ghost: 2, witch: 2, harpy: 2, mummy: 2, raider: 2, mutant: 2, hellhound: 2, shark: 2, tentacles: 2, faceless: 2, banshee: 2, bear: 2, tiger: 2 };
function nhTier(kind) { return NH_TIER[kind] || 1; }
function nhValue(t, s, raid) { t = Math.max(1, Math.min(5, t)); s = Math.max(1, Math.min(5, s)); return Math.round(t * t * 10 * (0.6 + 0.2 * s)) * (raid ? 1.5 : 1); }
function nhRank(t, s) { return NH_TYPES[t] + " · " + NH_STR[s]; }
function nhLabel(t, s, kind) { return NH_TYPES[t] + " " + String(kind).replace(/^The /, "").toLowerCase() + " (" + NH_STR[s].toLowerCase() + ")"; }
function nhBlows(t, s) { return Math.max(1, t - 1) + (s >= 4 ? 1 : 0); }
function nhWildStr(id) { return 1 + (hash(String(id) + "nhs") % 5); }
function nhCanFight() { return (typeof amHunter === "function" && amHunter()) || (typeof amKeeper === "function" && amKeeper()); }
function nhInCity() { var r = typeof somnucorRealm === "function" && somnucorRealm(); return !!(r && (store.here || 0) === r.id && typeof ATLC !== "undefined" && ATLC); }
function nhNight() { return typeof isNightHour === "function" && typeof cityHourNow === "function" && isNightHour(cityHourNow()); }
function nhErr(e) { var m = String((e && e.message) || e || ""); return /function|404|PGRST|does not exist|schema cache/i.test(m) ? "The hunt opens soon." : m; }
function nhCompass(x, z) {
var b = (Math.atan2(x - ATLC.x, -(z - ATLC.z)) * 180 / Math.PI + 360) % 360;
return ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"][Math.round(b / 45) % 8];
}
function nhRingName(x, z) {
var r = Math.hypot(x - ATLC.x, z - ATLC.z);
for (var i = 0; i < ATL_RINGS.length; i++) {
var R = ATL_RINGS[i];
if (r >= R.S - 10 && r <= R.E + 10)
return R.name || R.k;
}
return r > 2100 ? "the Nightmare Wilds" : "the city";
}
function nhName(kind) { return typeof wildCreatureName === "function" ? wildCreatureName(kind) : "The " + kind; }
function nhRng(seed) { var s = (seed >>> 0) || 1; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function nhRoute(raid) { return __ZC(200, 0, this, arguments, new.target); }
function nhRaidAge(raid) { return raid.age + (Date.now() - NH.fetched) / 1000; }
function nhRaidPos(raid, age) { return __ZC(200, 1, this, arguments, new.target); }
function nhReportPos(raid) {
var age = nhRaidAge(raid), seen = Math.max(0, age - (age % 120)), p = nhRaidPos(raid, seen);
if (!p)
return null;
var rnd = nhRng(raid.seed + Math.floor(age / 120)), a = rnd() * Math.PI * 2, d = 30 + rnd() * 30;
return { x: p.x + Math.cos(a) * d, z: p.z + Math.sin(a) * d, ago: Math.round((age - seen) / 60) };
}
function nhWatch() {
if (!(typeof signedIn === "function" && signedIn()) || !nhInCity() || NH.missing)
return;
NH.at = Date.now();
cityRpc("nightmare_watch", {}).then(function (d) {
if (!d)
return;
var was = {};
NH.raids.forEach(function (r) { was[r.id] = r; });
NH.night = !!d.night;
NH.slain = d.slain || [];
NH.hunters = d.hunters || 0;
NH.fetched = Date.now();
NH.raids = (d.raids || []).map(function (r) { if (was[r.id] && was[r.id]._route)
r._route = was[r.id]._route; return r; });
NH.raids.forEach(function (r) {
if (!was[r.id] && !NH.said[r.id] && nhCanFight()) {
NH.said[r.id] = 1;
var p = nhRaidPos(r);
setStatus("<b>Nightmare report</b> — a " + esc(nhLabel(r.tier, r.strength, nhName(r.kind))) +
" coming in from the Wilds in sector " + r.sector + " (" + nhCompass(p.x, p.z) + "). Worth " + r.value + " gold.");
}
});
nhPaint();
}).catch(function (e) { if (/function|404|PGRST|does not exist|schema cache/i.test(String((e && e.message) || e)))
NH.missing = true; });
}
function nhSync(dt) {
var here = nhInCity() && !store.inside, r = here && somnucorRealm(), live = {};
NH.raids.forEach(function (raid) {
var id = "nmraid_" + raid.id;
live[id] = 1;
var p = nhRaidPos(raid);
if (!p)
return;
var g = meshes[id];
if (!g && here && typeof addMesh === "function" && KIT[raid.kind]) {
var spec = { id: id, archetype: raid.kind, label: null, attrs: {}, x: p.x, z: p.z, rot: 0, solid: false, detail: 3, nights: [store.session], realm: r.id, hub: true, city: true, wild: true, nhRaid: raid.id, peopled: false };
store.objects.push(spec);
try {
addMesh(spec);
}
catch (e) { }
g = meshes[id];
if (g && typeof terrainY === "function")
g.position.y = terrainY(p.x, p.z);
}
if (!g)
return;
var u = g.userData;
if (u.nmGone)
return;
if (!u.nhChase) {
var d = Math.hypot(g.position.x - p.x, g.position.z - p.z);
u.nhStuck = d > 25 ? (u.nhStuck || 0) + dt : 0;
if (u.nhStuck > 5 || d > 120) {
g.position.x = p.x;
g.position.z = p.z;
if (typeof terrainY === "function")
g.position.y = terrainY(p.x, p.z);
u.nhStuck = 0;
u.path = null;
}
var ahead = nhRaidPos(raid, nhRaidAge(raid) + 1.5);
u.target = ahead || p;
u.hunt = 0;
}
});
Object.keys(meshes).forEach(function (id) {
if (id.indexOf("nmraid_") !== 0 || (live[id] && here))
return;
var g = meshes[id];
if (g.userData.nhFading)
return;
g.userData.nhFading = true;
var t0 = 0, s0 = g.scale.x || 1;
var done = function () {
if (typeof scene !== "undefined")
scene.remove(g);
delete meshes[id];
var k = store.objects.findIndex(function (o) { return o.id === id; });
if (k > -1)
store.objects.splice(k, 1);
};
if (!here || typeof nmFades === "undefined") {
done();
return;
}
nmFades.push(function (dt) { t0 += dt; var k = Math.max(0, 1 - t0 / 1.6); g.scale.set(s0 * k, s0 * k, s0 * k); if (t0 >= 1.6) {
done();
return true;
} return false; });
});
}
function nhChase() {
if (!nhInCity() || store.inside || !walkMode)
return;
var P = camera.position;
NH.raids.forEach(function (raid) {
var g = meshes["nmraid_" + raid.id];
if (!g || !g.visible || g.userData.nmGone || g.userData.nhFading)
return;
var u = g.userData, dx = P.x - g.position.x, dz = P.z - g.position.z, d = Math.hypot(dx, dz), aggro = 24 + raid.tier * 5;
var chase = d < aggro && !nmOpen;
u.nhChase = chase;
u.hunt = chase ? 1 : 0;
if (chase) {
u.target = { x: P.x - dx / d * 1.2, z: P.z - dz / d * 1.2 };
u.path = null;
if (d < NM_REACH + 0.5 && nmCool <= 0)
openEncounter(nhRaidChar(raid));
}
});
}
function nhRaidChar(raid) {
return { wild: true, nhRaid: raid, id: "raid_" + raid.id, objId: "nmraid_" + raid.id, kind: raid.kind, name: nhName(raid.kind), defeat: [], sessions: [],
nhTier: raid.tier, nhStr: raid.strength };
}
(function () {
if (typeof wildChar === "function") {
var wc = wildChar;
wildChar = function (w) { var c = wc.apply(this, arguments); if (c) {
c.nhTier = nhTier(w.kind);
c.nhStr = nhWildStr(w.id);
} return c; };
}
if (typeof openEncounter !== "function")
return;
var oe = openEncounter;
openEncounter = function (c) {
if (!c || !c.nhTier)
return oe.apply(this, arguments);
if (NH.hp[c.objId] == null)
NH.hp[c.objId] = nhBlows(c.nhTier, c.nhStr);
var fight = !c.nhRaid || nhCanFight();
if (!fight) {
nmOpen = c;
nmTimer = Math.max(5, NM_WAIT - (c.nhTier - 1) * 1.2);
var el = document.getElementById("nm-panel");
if (!el) {
oe.apply(this, arguments);
el = document.getElementById("nm-panel");
nmOpen = c;
}
el.innerHTML = '<div style="color:#E8D8D0;font-size:15px;margin-bottom:2px"><b>' + esc(c.name) + '</b> has reached you.</div>' +
'<div style="font-size:12px;color:#C9A868">' + esc(nhRank(c.nhTier, c.nhStr)) + ' nightmare, loose in the rings</div>' +
'<div style="height:3px;background:#2A1414;margin:8px 0 10px"><div id="nm-bar" style="height:3px;width:100%;background:#A8322B"></div></div>' +
'<div style="font-size:13px;color:#ccc;margin-bottom:8px">Only the nightmare hunters may fight it inside the city. Get away from it, and tell a hunter.</div>' +
'<button class="btn" data-way="run">Run</button>';
el.style.display = "block";
el.querySelector("[data-way]").onclick = function () { chooseWay(c, "run"); };
return;
}
oe.apply(this, arguments);
nmTimer = Math.max(5, NM_WAIT - (c.nhTier - 1) * 1.2);
var el2 = document.getElementById("nm-panel"), first = el2 && el2.firstChild;
if (first) {
var left = NH.hp[c.objId], total = nhBlows(c.nhTier, c.nhStr), info = document.createElement("div");
info.style.cssText = "font-size:12px;color:#C9A868;margin:2px 0 0";
info.innerHTML = esc(nhRank(c.nhTier, c.nhStr)) + (total > 1 ? " — it takes " + total + " blows" + (left < total ? ", " + left + " to go" : "") : "") +
(nhCanFight() ? " · trophy worth " + nhValue(c.nhTier, c.nhStr, !!c.nhRaid) + " gold" : "");
first.parentNode.insertBefore(info, first.nextSibling);
}
};
})();
(function () {
if (typeof defeatNightmare !== "function")
return;
var dn = defeatNightmare;
defeatNightmare = function (c, way) {
if (!c || !c.nhTier)
return dn.apply(this, arguments);
var left = (NH.hp[c.objId] == null ? nhBlows(c.nhTier, c.nhStr) : NH.hp[c.objId]) - 1;
if (left > 0) {
NH.hp[c.objId] = left;
nmCool = 0.6;
var g = meshes[c.objId], P = camera.position;
if (g) {
var dx = g.position.x - P.x, dz = g.position.z - P.z, d = Math.hypot(dx, dz) || 1;
g.position.x += dx / d * 2.2;
g.position.z += dz / d * 2.2;
}
setStatus("<b>" + esc(c.name) + " reels</b> — " + left + (left === 1 ? " more blow" : " more blows") + " to put it down.");
setTimeout(function () { if (!nmOpen && meshes[c.objId] && !meshes[c.objId].userData.nmGone)
openEncounter(c); }, 700);
return;
}
delete NH.hp[c.objId];
var r = dn.apply(this, arguments);
if (c.nhRaid) {
var gg = meshes[c.objId];
if (gg)
gg.userData.nmGone = true;
}
var label = nhLabel(c.nhTier, c.nhStr, c.name);
if (!nhCanFight()) {
setStatus("<b>" + esc(c.name) + " is gone.</b> Only a nightmare hunter takes a trophy; the Hunters' Lodge is hiring.");
return r;
}
if (!(typeof signedIn === "function" && signedIn())) {
setStatus("<b>" + esc(c.name) + " is down.</b> Sign in, and its trophy is yours.");
return r;
}
cityRpc("nightmare_trophy", { p_raid: c.nhRaid ? c.nhRaid.id : null, p_kind: c.kind, p_strength: c.nhStr }).then(function (d) {
if (d && d.ok) {
NH.trophies = null;
setStatus("<b>Trophy taken</b> — the " + esc(label) + ", worth " + d.value + " gold. You carry " + d.carried +
". Turn them in at the Tower or the Hunters' Lodge.");
nhTrophies(true);
if (c.nhRaid)
nhWatch();
}
else
setStatus("<b>" + esc(c.name) + " is down.</b> " + esc((d && d.say) || ""));
}).catch(function (e) { setStatus("<b>" + esc(c.name) + " is down.</b> " + esc(nhErr(e))); });
return r;
};
})();
(function () {
if (typeof caught !== "function")
return;
var oc = caught;
caught = function (c) {
if (!c || !c.nhTier)
return oc.apply(this, arguments);
closeEncounter();
nmCool = 6;
var g = meshes[c.objId], P = camera.position;
if (g && typeof walkBy === "function") {
var dx = P.x - g.position.x, dz = P.z - g.position.z, d = Math.hypot(dx, dz) || 1;
walkBy(dx / d * 7, dz / d * 7);
}
if (!(typeof signedIn === "function" && signedIn())) {
setStatus("<b>" + esc(c.name) + " strikes you</b> and throws you clear.");
return;
}
cityRpc("nightmare_strike", { p_kind: c.kind, p_strength: c.nhStr, p_raid: c.nhRaid ? c.nhRaid.id : null }).then(function (d) {
if (!d)
return;
if (typeof d.hp === "number" && typeof harmApply === "function")
harmApply({ hp: d.hp, state: d.state, recovers_at: d.recovers_at });
if (d.ok && d.harm)
setStatus("<b>" + esc(c.name) + " strikes you</b> — " + d.harm + " harm." + (d.state === "down" ? " You go down, and are carried to the City Hospital." : d.state === "hurt" ? " You are hurt. Get clear of it." : ""));
}).catch(function (e) { setStatus("<b>" + esc(c.name) + " strikes you</b> and throws you clear."); });
};
})();
function nhTrophies(force) { return __ZC(200, 2, this, arguments, new.target); }
function nhTurnInPlace() {
if (!nhInCity())
return null;
if (store.inside && typeof INT !== "undefined" && INT && INT.spec) {
if (INT.spec.archetype === "somnucortower")
return "tower";
if (INT.spec.workplace === "The Hunters' Lodge")
return "lodge";
return null;
}
var P = camera.position;
if (Math.hypot(P.x - ATLC.x, P.z - ATLC.z) < 60)
return "tower";
var w = typeof wpAt === "function" && wpAt("The Hunters' Lodge");
if (w && Math.hypot(P.x - w.x, P.z - w.z) < 26)
return "lodge";
return null;
}
function nhTurnIn(place) {
cityRpc("turn_in_trophies", { p_place: place }).then(function (d) {
setStatus((d && d.ok ? "<b>Bounty</b> — " : "") + esc((d && d.say) || ""));
NH.trophies = null;
nhTrophies(true);
}).catch(function (e) { setStatus(esc(nhErr(e))); });
}
var NH_BOX = "position:fixed;right:12px;bottom:calc(140px + env(safe-area-inset-bottom,0px));z-index:47;width:min(440px,calc(100vw - 24px));max-height:min(70vh,620px);overflow:auto;background:rgba(10,8,10,.97);border:1px solid #8A4A3A;border-radius:4px;padding:14px 16px;color:var(--bone);font:13px var(--sans)";
function nhShowBtn() { return typeof signedIn === "function" && signedIn() && nhInCity() && nhCanFight(); }
function nhPaint() {
var show = nhShowBtn(), b = document.getElementById("nh-btn");
if (!b && show && document.body && typeof POST_BTN !== "undefined") {
b = document.createElement("button");
b.id = "nh-btn";
b.type = "button";
b.style.cssText = POST_BTN + ";right:242px;border-color:#8A4A3A";
b.onclick = function () { NH.open = !NH.open; if (NH.open) {
nhWatch();
nhTrophies(true);
} nhPaint(); };
document.body.appendChild(b);
}
if (b) {
b.style.display = show ? "block" : "none";
b.textContent = NH.raids.length ? "Hunt (" + NH.raids.length + ")" : "Hunt";
}
var place = nhTurnInPlace(), n = NH.trophies && NH.trophies.trophies ? NH.trophies.trophies.length : 0, t = document.getElementById("nh-turnin");
if (!t && place && n && document.body) {
t = document.createElement("button");
t.id = "nh-turnin";
t.type = "button";
t.style.cssText = "position:fixed;left:50%;transform:translateX(-50%);bottom:calc(150px + env(safe-area-inset-bottom,0px));z-index:46;background:rgba(20,12,8,.94);color:#F0D8A8;border:1px solid #C9A868;border-radius:3px;padding:10px 16px;font:14px var(--sans);cursor:pointer";
document.body.appendChild(t);
}
if (t) {
t.style.display = place && n ? "block" : "none";
if (place && n) {
t.textContent = "Turn in " + n + (n === 1 ? " trophy" : " trophies") + " for " + NH.trophies.worth + " gold" + (place === "tower" ? " (Tower)" : " (Hunters' Lodge)");
t.onclick = function () { nhTurnIn(place); };
}
}
var box = document.getElementById("nh-box");
if (!NH.open || !show) {
if (box)
box.style.display = "none";
if (!show)
NH.open = false;
return;
}
if (!box) {
box = document.createElement("div");
box.id = "nh-box";
box.style.cssText = NH_BOX;
document.body.appendChild(box);
}
var h = '<div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:15px;color:#E8C27A">Nightmare reports</b><button class="btn" id="nh-x">Close</button></div>';
h += '<div style="color:#aaa;margin:4px 0 10px">' + (nhNight() ? "Night. They are trying for the rings." : "Day. The raiders have gone back to the Wilds; in the Wilds they attack anyone, day or night.") +
" " + NH.hunters + (NH.hunters === 1 ? " hunter" : " hunters") + " on duty.</div>";
if (!NH.raids.length)
h += '<div style="color:#ccc">No raid reported in the rings just now.</div>';
NH.raids.forEach(function (r) {
var p = nhReportPos(r);
if (!p)
return;
h += '<div style="border-top:1px solid #3A2A26;padding:8px 0"><b>Sector ' + r.sector + '</b> (' + nhCompass(p.x, p.z) + ') — ' + esc(nhRingName(p.x, p.z)) + '<br>' +
'<span style="color:#E8C27A">' + esc(nhLabel(r.tier, r.strength, nhName(r.kind))) + '</span>' +
' · bounty ' + r.value + ' gold<br><span style="color:#999">Last seen ' + (p.ago ? p.ago + " min ago" : "just now") + ', somewhere near here.</span> ' +
'<button class="btn" data-nhgo="' + r.id + '" style="margin-left:6px">Show me</button></div>';
});
if (NH.slain.length)
h += '<div style="margin-top:8px;color:#aaa">Put down tonight: ' + NH.slain.map(function (s) { return esc(NH_TYPES[s.tier] + " " + s.kind) + " by " + esc(s.by); }).join(", ") + "</div>";
var T = NH.trophies;
h += '<div style="border-top:1px solid #3A2A26;margin-top:10px;padding-top:8px"><b>Your trophies</b><br>';
if (T && T.trophies && T.trophies.length)
h += T.trophies.length + " carried, worth " + T.worth + " gold: " + T.trophies.slice(0, 12).map(function (t) { return esc(NH_TYPES[t.tier] + " " + t.kind); }).join(", ") +
'<br><span style="color:#999">Turn them in at the Tower or the Hunters\' Lodge.</span>';
else
h += '<span style="color:#999">None carried. Put a nightmare down and its trophy is yours.</span>';
if (T && T.earned)
h += '<br><span style="color:#999">Bounties earned so far: ' + T.earned + ' gold.</span>';
if (NH.msg)
h += '<div style="color:#E8A0A0;margin-top:6px">' + esc(NH.msg) + '</div>';
h += "</div>";
box.style.display = "block";
if (box.dataset.h === h)
return;
box.dataset.h = h;
box.innerHTML = h;
document.getElementById("nh-x").onclick = function () { NH.open = false; nhPaint(); };
Array.prototype.forEach.call(box.querySelectorAll("[data-nhgo]"), function (btn) {
btn.onclick = function () {
var r = NH.raids.filter(function (x) { return String(x.id) === btn.getAttribute("data-nhgo"); })[0];
if (r)
nhBeacon(r);
};
});
}
function nhBeacon(raid) { return __ZC(200, 3, this, arguments, new.target); }
function nhBeaconTick() {
var b = NH.beacon;
if (!b || !b.parent)
return;
var live = NH.raids.some(function (r) { return r.id === b.userData.raid; });
if (!live || Date.now() > b.userData.until || !nhInCity() || store.inside)
b.parent.remove(b);
}
(function () {
var last = Date.now();
setInterval(function () {
var now = Date.now(), dt = Math.min(1, (now - last) / 1000);
last = now;
try {
if (nhInCity() && now - NH.at > 20000)
nhWatch();
nhSync(dt);
nhChase();
nhBeaconTick();
if (nhInCity() && (nhCanFight() || nhTurnInPlace()) && now - NH.tAt > 60000)
nhTrophies();
nhPaint();
}
catch (e) {
if (window.console)
console.warn("[hunt]", e);
}
}, 200);
})();
