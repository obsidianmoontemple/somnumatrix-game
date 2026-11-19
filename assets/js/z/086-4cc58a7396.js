/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(86, function () {
"use strict";
return [
function (withWords) {
var keep = {};
["objects", "characters", "realms", "hoods", "grid", "townGrid", "land", "insideSlots"].forEach(function (k) {
if (store[k] !== undefined)
keep[k] = store[k];
});
keep.dreamer = { name: (store.dreamer && store.dreamer.name) || "", abilities: [] };
if (withWords) {
keep.sessions = store.sessions || [];
keep.transcript = store.transcript || "";
}
else {
keep.sessions = (store.sessions || []).map(function (r) { return { n: r.n, date: r.date, title: "Night " + r.n }; });
keep.transcript = "";
if (keep.characters)
keep.characters = keep.characters.map(function (c) {
var o = {};
for (var k in c)
o[k] = c[k];
o.details = [];
o.log = [];
return o;
});
}
return { v: 1, at: Date.now(), name: (store.dreamer && store.dreamer.name) || "", words: !!withWords, store: keep };
},
function (withWords) {
if (!signedIn())
return Promise.reject(new Error("Sign in first \u2014 a shared world belongs to an account."));
return restRpc("publish_scape", { p_scape: scapeForVisitors(withWords), p_words: !!withWords }).then(function (out) {
if (out !== "ok")
throw new Error(out || "It didn't publish.");
return true;
});
},
function (spec) {
if (visitCool > 0 || amVisiting())
return;
if (!spec.dreamerDoor)
return;
if (signedIn() && spec.dreamerDoor === session.user.id) {
return;
}
visitCool = 2;
setStatus("<b>Knocking at " + esc(spec.name || "a door") + "\u2026</b>");
restRpc("walk_in", { p_door: spec.dreamerDoor }).then(function (got) {
if (!got || !got.store) {
setStatus("<b>" + esc(spec.name || "That door") + "</b> is shut. " + (spec.doorLine ? "<i>" + esc(spec.doorLine) + "</i> \u2014 " : "") +
"Only a door its owner has opened can be walked through.");
return;
}
beginVisit(spec, got);
}).catch(function () { setStatus("That door would not open just now."); });
},
function (spec, got) {
visitKept = {};
Object.keys(store).forEach(function (k) { visitKept[k] = store[k]; });
visiting = { id: spec.dreamerDoor, name: spec.name || "a dreamer", line: spec.doorLine || "", was: visitKept.here || 0,
wasAt: { x: camera.position.x, y: camera.position.y, z: camera.position.z } };
Object.keys(store).forEach(function (k) { if (k !== "dreamer")
delete store[k]; });
Object.keys(got.store).forEach(function (k) { store[k] = got.store[k]; });
store.here = 0;
store.inside = null;
store.visiting = true;
if (typeof rebuildAll === "function")
rebuildAll();
var h = heartOf(0);
camera.position.set(h.x, 1.72, h.z + 26);
showVisitBar(true);
setStatus("<b>You are walking in " + esc(visiting.name) + "'s world.</b> " + (visiting.line ? "<i>" + esc(visiting.line) + "</i>. " : "") +
"Nothing you do here changes anything. Press <b>Back to your own</b> when you are done.");
},
function () {
if (!visiting)
return;
var back = visiting;
visiting = null;
Object.keys(store).forEach(function (k) { delete store[k]; });
Object.keys(visitKept).forEach(function (k) { store[k] = visitKept[k]; });
visitKept = null;
visitCool = 2;
if (typeof rebuildAll === "function")
rebuildAll();
camera.position.set(back.wasAt.x, back.wasAt.y, back.wasAt.z);
showVisitBar(false);
setStatus("<b>Home.</b> Your own dreamscape is exactly as you left it.");
save();
},
function (on) {
var el = document.getElementById("visit-bar");
if (!el && on && document.body) {
el = document.createElement("div");
el.id = "visit-bar";
el.style.cssText = "position:fixed;left:50%;top:12px;transform:translateX(-50%);z-index:40;display:flex;gap:12px;align-items:center;" +
"background:rgba(10,12,18,.94);border:1px solid var(--gold,#C9A868);border-radius:3px;padding:8px 14px;font-family:var(--sans);font-size:14px";
el.innerHTML = '<span id="visit-who"></span><button class="btn" id="visit-out">Back to your own</button>';
document.body.appendChild(el);
document.getElementById("visit-out").onclick = endVisit;
}
if (!el)
return;
el.style.display = on ? "flex" : "none";
if (on)
document.getElementById("visit-who").innerHTML = "Walking in <b>" + esc(visiting.name) + "</b>'s world";
}
];
});
