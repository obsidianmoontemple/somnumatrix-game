/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var hallDoors = [], hallCount = 0, hallAt = 0, myDoor = null, hallBusy = false, lightCool = 0;
var HALL_R0 = 58, HALL_GAP = 12, HALL_PITCH = 9;
var HALL_GAP_N = 17;
var HALL_GAP_KEYS = ["lby", "dav", "shk", "vrn", "shn", "gmm", "stc", "sw", "poe", "oz"];
var HALL_GAP_USE = 15;
var HALL_GAL_KEYS = [];
function hallGalleryPer(ring) { return Math.max(6, Math.floor(Math.PI * (HALL_R0 + ring * HALL_GAP) / HALL_PITCH)); }
function hallGallerySlot(n, side) {
var ring = 0, seen = 0, per = hallGalleryPer(0);
while (seen + per <= n) {
seen += per;
ring++;
per = hallGalleryPer(ring);
}
var i = n - seen, r = HALL_R0 + ring * HALL_GAP, a = (side ? Math.PI : 0) + Math.PI * (i + 0.5) / per;
return { x: Math.cos(a) * r, z: Math.sin(a) * r, a: a, rot: -a + Math.PI / 2, ring: ring, r: r };
}
function doorPlace(n) { return hallGallerySlot(n, 0); }
function hallRings(count) { return count > 0 ? hallGallerySlot(count - 1, 0).ring + 1 : 0; }
function hallKeyIndex(L, key) { var i = L.indexOf(key); if (i < 0) {
L.push(key);
i = L.length - 1;
} return i; }
function hallHere() { if (typeof hallRealm !== "function" || typeof blockOrigin !== "function")
return null; var r = hallRealm(); if (!r || !r.grid || (store.here || 0) !== r.id)
return null; return blockOrigin(r.grid.bx, r.grid.bz); }
function hallGallerySpot(key) {
var h = hallHere();
if (!h)
return null;
var s = hallGallerySlot(hallKeyIndex(HALL_GAL_KEYS, key), 1);
return { x: h.x + s.x, z: h.z + s.z, a: s.a, ring: s.ring };
}
function hallGapSpot(key) { return __ZC(85, 0, this, arguments, new.target); }
function restGet(path) {
var tok = (typeof signedIn === "function" && signedIn()) ? session.access_token : DW_CONFIG.supabaseKey;
return fetch(DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/rest/v1/" + path, {
headers: { apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + tok, "Content-Type": "application/json" }
}).then(function (r) { return r.ok ? r.json() : null; });
}
function restRpc(name, body) {
var tok = (typeof signedIn === "function" && signedIn()) ? session.access_token : DW_CONFIG.supabaseKey;
return fetch(DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/rest/v1/rpc/" + name, {
method: "POST", headers: { apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + tok, "Content-Type": "application/json" },
body: JSON.stringify(body || {})
}).then(function (r) { return r.ok ? r.json() : null; });
}
function fetchHall() { return __ZC(85, 1, this, arguments, new.target); }
function raiseHall() { return __ZC(85, 2, this, arguments, new.target); }
function openHall() {
return fetchHall().then(function () {
var n = raiseHall();
if (n)
setStatus("<b>The hall stands.</b> " + hallCount + " door" + (hallCount === 1 ? "" : "s") + ", and the rings widen as more are taken.");
return n;
});
}
function takeDoor(name, line, colour) { return __ZC(85, 3, this, arguments, new.target); }
function giveUpDoor() {
if (!signedIn())
return Promise.reject(new Error("Sign in first."));
return restRpc("give_up_door", {}).then(function () { myDoor = null; return openHall(); });
}
function leaveLight(spec) { return __ZC(85, 4, this, arguments, new.target); }
var doorNear = null;
function doorsTick(dt) {
if (lightCool > 0)
lightCool -= dt;
if (!walkMode || store.inside)
return;
var P = camera.position, found = null;
for (var i = 0; i < store.objects.length; i++) {
var o = store.objects[i];
if (!o.dreamerDoor || (o.realm || 0) !== (store.here || 0))
continue;
if (Math.abs(o.x - P.x) > 4 || Math.abs(o.z - P.z) > 4)
continue;
if (Math.hypot(o.x - P.x, o.z - P.z) < 2.6) {
found = o;
break;
}
}
if (found && found !== doorNear) {
doorNear = found;
var mine = (typeof signedIn === "function" && signedIn()) && found.dreamerDoor === session.user.id;
setStatus("<b>" + esc(found.name || "A door") + "</b>" + (found.doorLine ? " \u2014 <i>" + esc(found.doorLine) + "</i>" : "") +
". " + (mine ? "Yours. Press E to go home to your own town."
: (found.lights || 0) + " lights left here. Press <b>L</b> to leave one."));
}
else if (!found && doorNear) {
doorNear = null;
}
}
function doorPanel() {
var el = document.getElementById("door-state");
if (!el)
return;
if (!signedIn()) {
el.textContent = "Sign in above to take a door in the great hall.";
return;
}
el.innerHTML = myDoor
? "<b>Your door stands in the hall.</b> " + esc(myDoor.name || "") + (myDoor.lights ? " \u2014 " + myDoor.lights + " lights left there." : "")
: "You have no door yet. Take one and it joins the hall, however many there come to be.";
}
function initDoors() {
var b;
if ((b = document.getElementById("door-take")))
b.onclick = function () {
var nm = (document.getElementById("door-name").value || "").trim();
var ln = (document.getElementById("door-line").value || "").trim();
if (!nm)
return setStatus("Give the door a name \u2014 yours, or one you dream under.");
takeDoor(nm, ln, null).then(function () { setStatus("<b>Your door stands in the hall of Somnucor.</b>"); doorPanel(); })
.catch(function (e) { setStatus(esc(e.message)); });
};
if ((b = document.getElementById("door-give")))
b.onclick = function () {
if (!confirm("Give up your door? It comes down from the hall."))
return;
giveUpDoor().then(function () { setStatus("Your door has come down."); doorPanel(); })
.catch(function (e) { setStatus(esc(e.message)); });
};
if ((b = document.getElementById("door-hall")))
b.onclick = function () {
if (typeof joinedSomnucor === "function" && !joinedSomnucor())
return setStatus("The Hall of Doors is in Somnucor. Join Somnucor first, and it is built.");
var sc = document.getElementById("set-close");
if (sc)
sc.click();
landWalk();
openHall().then(function () { if (typeof toHall === "function")
toHall(); });
};
doorPanel();
if (cloudOn())
setTimeout(function () {
if (typeof joinedSomnucor === "function" && !joinedSomnucor())
return doorPanel();
openHall().then(doorPanel);
}, 1500);
}
if (typeof addEventListener === "function")
addEventListener("keydown", function (e) {
if (e.code === "KeyL" && walkMode && doorNear)
leaveLight(doorNear);
});
