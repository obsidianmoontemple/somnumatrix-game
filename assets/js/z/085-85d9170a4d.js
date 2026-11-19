/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(85, function () {
"use strict";
return [
function (key) {
var h = hallHere();
if (!h)
return null;
var k = hallKeyIndex(HALL_GAP_KEYS, key);
if (k >= HALL_GAP_USE)
return hallGallerySpot(key);
var gaps = [];
for (var i = 0; i < HALL_GAP_N; i++) {
var a = ((i + 0.5) / HALL_GAP_N) * Math.PI * 2;
gaps.push({ a: a, d: Math.abs(Math.atan2(Math.sin(a + Math.PI / 2), Math.cos(a + Math.PI / 2))) });
}
gaps.sort(function (p, q) { return p.d - q.d; });
var a2 = gaps[k].a;
return { x: h.x + Math.cos(a2) * 29.5, z: h.z + Math.sin(a2) * 29.5, a: a2 };
},
function () {
if (hallBusy || !cloudOn() || typeof fetch !== "function")
return Promise.resolve(0);
hallBusy = true;
return restRpc("hall_of_doors", { p_from: 0, p_count: 1000 }).then(function (rows) {
hallBusy = false;
hallDoors = rows || [];
hallCount = hallDoors.length;
return restRpc("doors_standing").then(function (n) { hallCount = (typeof n === "number") ? n : hallCount; return hallCount; });
}).catch(function () { hallBusy = false; return 0; });
},
function () {
if (typeof joinedSomnucor === "function" && !joinedSomnucor())
return 0;
var r = (typeof hallRealm === "function") ? (hallRealm() || (typeof buildHall === "function" ? buildHall() : null)) : null;
if (!r)
return 0;
var h = blockOrigin(r.grid.bx, r.grid.bz);
for (var i = store.objects.length - 1; i >= 0; i--) {
var o = store.objects[i];
if (o.dreamerDoor) {
if (meshes[o.id]) {
scene.remove(meshes[o.id]);
delete meshes[o.id];
}
store.objects.splice(i, 1);
}
}
var mine = (typeof signedIn === "function" && signedIn()) ? session.user.id : null;
hallDoors.forEach(function (d, n) {
var p = doorPlace(n);
var spec = { id: uid(), archetype: "hubdoor", label: d.name, name: d.name, named: "stated", attrs: { c: d.colour || undefined },
x: h.x + p.x * 1.0, z: h.z + p.z * 1.0, rot: p.rot, solid: true, detail: 4, nights: [store.session], realm: r.id,
dreamerDoor: d.user_id, doorLine: d.line || "", lights: d.lights || 0, hub: true,
note: (d.line ? d.line + "\\n" : "") + "A door in the great hall. " + (d.lights || 0) + " lights left here." };
if (mine && d.user_id === mine) {
spec.leadsTo = "town";
spec.name = d.name + " \u2014 yours";
myDoor = spec;
}
store.objects.push(spec);
if (typeof addMesh === "function")
addMesh(spec);
});
save();
return hallDoors.length;
},
function (name, line, colour) {
if (!signedIn())
return Promise.reject(new Error("Sign in first \u2014 a door belongs to an account, not a browser."));
return restRpc("take_door", { p_name: name, p_line: line || null, p_colour: colour || null }).then(function (out) {
if (out !== "ok")
throw new Error(out || "That didn't take.");
return openHall();
});
},
function (spec) {
if (!spec || !spec.dreamerDoor || lightCool > 0)
return;
lightCool = 2;
restRpc("leave_light", { p_door: spec.dreamerDoor }).then(function (n) {
if (typeof n === "number") {
spec.lights = n;
setStatus("<b>A light left at " + esc(spec.name || "their door") + ".</b> " + n + " now burn there.");
}
else
setStatus("You cannot leave a light at your own door.");
}).catch(function () { });
}
];
});
