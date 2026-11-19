/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(96, function () {
"use strict";
return [
function (on) {
if (on) {
riding = "Corp dragon";
rideSpeed = 4;
rideArch = "dragon";
if (typeof canFly !== "undefined")
canFly = true;
if (rideG) {
scene.remove(rideG);
rideG = null;
}
var L = meLook();
L.ride = "dragon";
if (typeof publishMyLook === "function")
publishMyLook();
CORP.mounted = true;
setStatus("<b>Mounted.</b> Space to climb, C to come down. Your sector is yours to keep.");
}
else {
if (typeof ride === "function")
ride(null);
CORP.mounted = false;
}
},
function (force) {
if (!amCorp() && !(typeof amKeeper === "function" && amKeeper()))
return Promise.resolve(null);
if (!force && Date.now() - CORP.at < 20000)
return Promise.resolve(CORP.data);
CORP.at = Date.now();
return cityRpc("corp_status").then(function (d) { CORP.data = d && d.corp ? d : null; if (WORK.open)
workPaint(); return CORP.data; }).catch(function () { return null; });
},
function () {
var d = CORP.data;
if (!d)
return "";
var h = '<div class="job"><b style="color:#E8C27A">The Dragon Corp</b>' + (d.sector ? ' <span style="color:var(--dim)">· you keep the <b style="color:var(--bone)">' + esc(((d.sectors || [])[d.sector - 1] || {}).name || ("sector " + d.sector)) + '</b></span>' : '') +
'<div style="margin:6px 0"><button class="btn" id="corp-mount">' + (CORP.mounted ? "Dismount" : "Mount your dragon") + '</button></div>';
h += '<div style="color:var(--dim);margin-top:4px">Sectors</div>';
(d.sectors || []).forEach(function (s) {
h += '<div style="padding:3px 0">' + esc(s.name) + ' · <span style="color:var(--dim)">' + (s.riders.length ? s.riders.map(function (r) { return esc(r.name) + (r.online ? " ●" : ""); }).join(", ") : "no rider") +
(s.open ? ' · <b style="color:#C0603A">' + s.open + ' open</b>' : '') + '</span>' +
(d.command ? s.riders.map(function (r) { return ' <select data-rider="' + r.id + '">' + [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) { return '<option' + (n === s.n ? " selected" : "") + '>' + n + '</option>'; }).join("") + '</select>'; }).join("") : "") + '</div>';
});
h += '<div style="color:var(--dim);margin-top:8px">Reports</div>';
if (!(d.reports || []).length)
h += '<div style="color:var(--dim)">Nothing open. The city is quiet.</div>';
(d.reports || []).forEach(function (r) {
h += '<div class="tk"><span><b>' + esc(r.kind) + '</b> · ' + esc(r.offender || "?") + (r.victim ? ' against ' + esc(r.victim) : '') + ' · sector ' + (r.sector || "?") +
'<br><span style="color:var(--dim);font-size:12px">' + esc(r.note || "") + '</span></span><span style="white-space:nowrap">' +
(r.x !== null && r.x !== undefined ? '<button class="btn" data-fly="' + r.id + '">Go</button> ' : '') +
(r.offender_id ? '<button class="btn" data-charge="' + r.id + '">Charge</button> ' : '') + '<button class="btn" data-close="' + r.id + '">Close</button></span></div>';
});
h += '<div style="color:var(--dim);margin-top:8px">Merit rolls <span style="font-size:12px">(100 is good standing)</span></div>';
(d.rolls || []).slice(0, 25).forEach(function (m) {
h += '<div class="tk"><span>' + esc(m.name) + ' · <b style="color:' + (m.score < 80 ? '#C0603A' : m.score > 110 ? '#8FCB8A' : 'var(--bone)') + '">' + m.score + '</b>' +
((m.recent && m.recent[0]) ? ' <span style="color:var(--dim);font-size:12px">· ' + esc(m.recent[0].kind) + (m.recent[0].note ? ": " + esc(m.recent[0].note) : "") + '</span>' : '') + '</span>' +
'<span style="white-space:nowrap"><button class="btn" data-mark="' + m.id + '" data-d="1">+</button> <button class="btn" data-mark="' + m.id + '" data-d="-1">−</button></span></div>';
});
return h + '</div>';
},
function (el) {
var d = CORP.data;
if (!d)
return;
var mb = document.getElementById("corp-mount");
if (mb)
mb.onclick = function () {
if (CORP.mounted && typeof EY !== "undefined" && EY.atDoor && typeof eyrieGoIn === "function" && eyrieGoIn()) {
workPaint();
return;
}
if (CORP.mounted && typeof DRIVE !== "undefined" && DRIVE.on && DRIVE.mode === "fly" && DRIVE.alt > 2.5) {
setStatus("<b>Land first.</b> Hold C (or the down button) to come down, then dismount.");
return;
}
corpMount(!CORP.mounted);
workPaint();
};
Array.prototype.forEach.call(el.querySelectorAll("[data-rider]"), function (sel) {
sel.onchange = function () {
cityRpc("corp_assign_sector", { p_user: sel.getAttribute("data-rider"), p_sector: +sel.value }).then(function (o) { setStatus(o === "ok" ? "Sector assigned." : esc(String(o))); corpRefresh(true); });
};
});
Array.prototype.forEach.call(el.querySelectorAll("[data-close]"), function (b) {
b.onclick = function () {
var why = prompt("How was it seen to?", "warned them");
if (why === null)
return;
cityRpc("corp_resolve", { p_report: +b.getAttribute("data-close"), p_outcome: why }).then(function (o) { setStatus(o === "ok" ? "Report closed." : esc(String(o))); corpRefresh(true); });
};
});
Array.prototype.forEach.call(el.querySelectorAll("[data-charge]"), function (b) {
b.onclick = function () {
var r = (d.reports || []).filter(function (x) { return String(x.id) === b.getAttribute("data-charge"); })[0];
if (!r)
return;
var ch = prompt("The charge against " + (r.offender || "them") + "?", r.kind);
if (!ch)
return;
cityRpc("file_charge", { p_user: r.offender_id, p_charge: ch, p_detail: (r.note || "") + " (Corp report " + r.id + ", sector " + (r.sector || "?") + ")" }).then(function (o) {
if (o !== "ok") {
setStatus(esc(String(o)));
return;
}
setStatus("<b>Charged.</b> The clerk will list it for the next sitting at The Courthouse.");
cityRpc("corp_resolve", { p_report: r.id, p_outcome: "charged: " + ch }).then(function () { corpRefresh(true); });
}).catch(function (e) { setStatus(esc(e.message)); });
};
});
Array.prototype.forEach.call(el.querySelectorAll("[data-fly]"), function (b) {
b.onclick = function () {
var r = (d.reports || []).filter(function (x) { return String(x.id) === b.getAttribute("data-fly"); })[0];
if (!r)
return;
var j = ((WORK.data && WORK.data.jobs) || []).filter(function (x) { return x.panel === "police"; })[0];
WORK.busy = { job: j, task: { task: "Answer a report", kind: "report" }, stops: [{ x: ATLC.x + r.x, z: ATLC.z + r.z, name: "where it happened" }], i: 0, t: 0, need: 0, report: r.id };
WORK.open = false;
workPaint();
workRunPaint();
};
});
Array.prototype.forEach.call(el.querySelectorAll("[data-mark]"), function (b) {
b.onclick = function () {
var up = b.getAttribute("data-d") === "1", n = prompt(up ? "Commend them — how much (1 to 5)?" : "Caution them — how much (1 to 10)?", up ? "2" : "3");
if (!n)
return;
var why = prompt("Why?", "");
if (!why)
return;
cityRpc("corp_mark", { p_user: b.getAttribute("data-mark"), p_delta: (up ? 1 : -1) * Math.abs(parseInt(n, 10) || 1), p_note: why }).then(function (o) { setStatus(o === "ok" ? "Marked." : esc(String(o))); corpRefresh(true); });
};
});
},
function (maxD) {
if (typeof presenceOthers === "undefined")
return null;
var P = camera.position, best = null, bd = maxD;
Object.keys(presenceOthers).forEach(function (id) {
var p = presenceOthers[id];
if (!p.group)
return;
var d = Math.hypot(p.group.position.x - P.x, p.group.position.z - P.z);
if (d < bd) {
bd = d;
best = { id: id, name: p.name, p: p };
}
});
return best;
},
function () {
var el = workEl();
if (!el)
return;
el.style.display = "block";
var left = standing && standing.prison ? prisonWords(standing.prison) : "";
el.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:14px">Community service</b><button class="btn" id="cs-x">Close</button></div>' +
'<div style="color:var(--dim);margin:6px 0;line-height:1.5">Work in the Warrens under the Dragon Corp\'s eye. Each task done takes <b style="color:var(--bone)">half an hour</b> off your sentence and earns back a little merit. Leave the Warrens and you are taken back to your cell.</div>' +
(left ? '<div style="margin-bottom:6px">' + left + '</div>' : '') +
CS_TASKS.map(function (t, i) { return '<div class="tk"><span>' + esc(t.task) + '</span><button class="btn" data-cs="' + i + '">Start</button></div>'; }).join("");
document.getElementById("cs-x").onclick = function () { el.style.display = "none"; };
Array.prototype.forEach.call(el.querySelectorAll("[data-cs]"), function (b) { b.onclick = function () { csStart(CS_TASKS[+b.getAttribute("data-cs")]); }; });
},
function (which) {
if (which === "yard" && store.gaolYard)
return { x: store.gaolYard.x, z: store.gaolYard.z, name: "the Gaol yard" };
var k = cityObjs().filter(function (o) { return o.archetype === "soupkitchen"; }).sort(function (a, b) { return Math.hypot(a.x - camera.position.x, a.z - camera.position.z) - Math.hypot(b.x - camera.position.x, b.z - camera.position.z); })[0];
return k ? { x: k.x, z: k.z, name: "the soup kitchen" } : null;
},
function (t) {
CS.out = Date.now() + 15 * 60000;
if (store.inside && typeof exitInterior === "function" && typeof toYard === "function")
toYard("<b>Out to work.</b> The Warrens, under the Corp's eye.");
var B = { task: t, t: 0, need: t.secs || 0, i: 0, cs: true };
if (t.kind === "round") {
var W = atlRing("warrens"), P = camera.position, a0 = Math.atan2(P.z - ATLC.z, P.x - ATLC.x);
B.stops = [];
for (var i = 1; i <= t.stops; i++) {
var a = a0 + i * 40 / 1620;
B.stops.push({ x: ATLC.x + Math.cos(a) * 1620, z: ATLC.z + Math.sin(a) * 1620, name: "the Warrens street" });
}
}
else if (t.kind === "desk") {
B.spot = csSpot(t.at);
}
CS.busy = B;
var el = document.getElementById("work");
if (el)
el.style.display = "none";
},
function () {
var B = CS.busy;
CS.busy = null;
var run = document.getElementById("work-run");
if (run)
run.style.display = "none";
cityRpc("community_service", { p_task: B.task.task }).then(function (o) {
if (!o || !o.ok) {
setStatus(esc((o && o.say) || "That did not count."));
return;
}
CS.out = Date.now() + 15 * 60000;
if (o.free) {
CS.out = 0;
setStatus("<b>Your time is served.</b> The Corp signs you off — you are free to go.");
}
else
setStatus("<b>" + esc(B.task.task) + "</b> — done. Half an hour off your sentence; " + o.left_min + " minutes left to serve.");
if (typeof refreshStanding === "function")
refreshStanding();
}).catch(function (e) { setStatus(esc(e.message)); });
}
];
});
