/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(63, function () {
"use strict";
return [
function () {
var ta = document.getElementById("freetext");
ta.style.height = "auto";
ta.style.height = Math.min(ta.scrollHeight, window.innerHeight * 0.26) + "px";
var v = ta.value;
if (v.length < draftScanned) {
draftScanned = v.length;
return;
}
var upto = Math.max(v.lastIndexOf(". "), v.lastIndexOf("! "), v.lastIndexOf("? "), v.lastIndexOf("\n"), v.lastIndexOf("; ")) + 1;
if (upto <= draftScanned)
return;
var fresh = v.slice(draftScanned, upto);
draftScanned = upto;
var n = scanText(fresh);
if (n)
setStatus("<b>" + n + " form" + (n > 1 ? "s" : "") + " took shape</b>");
},
function () {
var ta = document.getElementById("freetext");
var v = ta.value.trim();
if (!v) {
setStatus("Type a few words first, then press Add.");
return;
}
var tail = v.slice(draftScanned).trim();
if (tail)
scanText(tail);
feedContext(v);
scanAbilities(v);
committed += v + " ";
store.transcript = committed;
ta.value = "";
ta.style.height = "auto";
draftScanned = 0;
renderTranscript(committed, "");
populate();
scheduleParse(400);
save();
setStatus("Added. Press <b>Walk it</b> to step inside.");
},
function (file) {
var r = new FileReader();
r.onerror = function () { setStatus("<i>Could not read that file.</i>"); };
r.onload = function () {
var d;
try {
d = JSON.parse(r.result);
}
catch (e) {
setStatus("<i>That is not a dreamscape file.</i>");
return;
}
if (!d || !d.objects || !Array.isArray(d.objects)) {
setStatus("<i>That file has no dreamscape in it.</i>");
return;
}
var mine = store.objects.filter(function (o) { return !o.filler; }).length;
var theirs = d.objects.filter(function (o) { return !o.filler; }).length;
var merge = false;
if (mine) {
merge = confirm("You already have " + mine + " form" + (mine === 1 ? "" : "s") + " standing.\n\n" +
"OK to add the " + theirs + " incoming form" + (theirs === 1 ? "" : "s") + " alongside them.\n" +
"Cancel to replace everything with the file.");
}
if (merge)
mergeWorld(d);
else
replaceWorld(d);
};
r.readAsText(file);
},
function () {
store.blocks = {};
store.streets = [];
store.objects.forEach(function (o) {
if (!KIT[o.archetype])
o.archetype = "house";
ensureStreets(Math.round(o.x / PITCH), Math.round(o.z / PITCH));
addMesh(o);
});
store.characters.forEach(assignLife);
populate();
tickClock(true);
updateCount();
save();
},
function (d) {
clearScene();
store = Object.assign(blank(), d);
store.objects = store.objects.filter(function (o) { return !o.filler; });
store.characters = (store.characters || []).filter(function (c) { return c.primary !== false; });
store.blocks = {};
if (!store.lots)
store.lots = {};
committed = store.transcript || "";
draftScanned = 0;
document.getElementById("freetext").value = "";
renderTranscript(committed, "");
rebuild();
setStatus("<b>Dreamscape restored \u2014 " + store.objects.length + " forms.</b>");
},
function (d) {
var maxB = 0;
store.objects.forEach(function (o) {
maxB = Math.max(maxB, Math.abs(Math.round(o.x / PITCH)), Math.abs(Math.round(o.z / PITCH)));
});
var shift = (maxB + 2) * PITCH;
var idMap = {};
(d.objects || []).filter(function (o) { return !o.filler; }).forEach(function (o) {
var old = o.id;
o.id = uid();
idMap[old] = o.id;
o.x += shift;
if (o.bx !== undefined && o.bx !== null)
o.bx += (maxB + 2);
if (o.lot !== undefined && o.lot !== null && o.bx !== undefined && o.bx !== null)
takeLot(o.bx, o.bz, o.lot, o.id);
store.objects.push(o);
addMesh(o);
});
(d.characters || []).filter(function (c) { return c.primary !== false; }).forEach(function (c) {
c.id = uid();
if (c.objId && idMap[c.objId])
c.objId = idMap[c.objId];
else
c.objId = null;
if (c.home && idMap[c.home])
c.home = idMap[c.home];
else
c.home = null;
if (c.work && idMap[c.work])
c.work = idMap[c.work];
else
c.work = null;
c.x += shift;
if (c.anchor)
c.anchor.x += shift;
store.characters.push(c);
var sp = c.objId ? specById(c.objId) : null;
if (sp)
sp.charId = c.id;
});
rebuild();
setStatus("<b>Merged \u2014 " + store.objects.length + " forms now standing.</b>");
},
function () {
var n = store.objects.filter(function (o) { return !o.filler; }).length;
var f = store.characters.filter(function (c) { return c.primary !== false; }).length;
var d = store.sessions.length;
if (!confirm("Start from a clean slate?\n\nThis erases " + n + " place" + (n === 1 ? "" : "s") + ", " + f + " figure" + (f === 1 ? "" : "s") +
" and " + d + " sealed dream" + (d === 1 ? "" : "s") + " from this browser. It cannot be undone.\n\n" +
"Who is dreaming, your settings, and your choices about the books are kept."))
return;
if (n || d) {
if (confirm("Save a copy of everything first?\n\nOK saves a file, then erases.\nCancel erases without saving."))
exportJSON();
}
var keep = { dreamer: store.dreamer, research: store.research, released: store.released };
if (typeof setPlot === "function" && plotOn)
setPlot(false);
if (typeof clearView === "function")
clearView();
clearScene();
store = blank();
if (keep.dreamer)
store.dreamer = keep.dreamer;
if (keep.research)
store.research = keep.research;
if (keep.released)
store.released = keep.released;
realmGroundsAll();
viewAt = null;
committed = "";
draftScanned = 0;
document.getElementById("freetext").value = "";
renderTranscript("", "");
orb.tx = 0;
orb.tz = 0;
save();
updateCount();
tickClock(true);
setStatus("Clean slate. Nothing is standing yet.");
},
function () {
var blob = new Blob([JSON.stringify(store, null, 2)], { type: "application/json" });
var a = document.createElement("a");
a.href = URL.createObjectURL(blob);
a.download = "dreamscape-" + new Date().toISOString().slice(0, 10) + ".json";
a.click();
setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
},
function () {
var text = store.transcript.trim();
if (!text) {
setStatus("Nothing recorded tonight yet.");
return;
}
if (!confirm("Seal this dream and begin another?\n\nWhat you recorded tonight is filed exactly as written and can never be altered. The dreamscape and everyone in it stays."))
return;
closeNight(null, text, false);
document.getElementById("freetext").value = "";
setStatus("Sealed. Night " + store.session + " \u2014 everything you built is still standing.");
},
function () {
var c = cfg(), $ = function (i) { return document.getElementById(i); };
$("mode").value = c.mode || "off";
$("key").value = c.key || "";
$("proxy").value = c.proxy || "";
$("model").value = c.model || LLM_MODEL;
$("density").value = c.density || 26;
$("err").textContent = "";
$("counted").checked = c.counted !== false;
$("nm-on").value = c.nightmares === false ? "off" : "on";
$("nm-catch").value = c.nightmareCatch || "wake";
$("padmode").value = c.pad || "automatic";
$("skies").value = c.skies === false ? "off" : "on";
$("solidall").value = c.solidAll === false ? "half" : "solid";
renderHeld();
$("panel").classList.add("open");
var gsel = document.getElementById("gfx");
if (gsel)
gsel.value = cfg().gfx || "auto";
var isel = document.getElementById("ink");
if (isel)
isel.value = cfg().ink || "off";
var lsel = document.getElementById("lite");
if (lsel)
lsel.value = cfg().lite || "auto";
},
function () {
var $ = function (i) { return document.getElementById(i); };
var was = cfg().counted !== false;
var c = Object.assign({}, cfg(), { mode: $("mode").value, key: $("key").value.trim(), proxy: $("proxy").value.trim(),
model: $("model").value.trim() || LLM_MODEL, density: parseInt($("density").value, 10),
counted: $("counted").checked, nightmares: $("nm-on").value !== "off", nightmareCatch: $("nm-catch").value, pad: $("padmode").value, skies: $("skies").value !== "off", solidAll: $("solidall").value !== "half" });
if (was && !c.counted)
forgetDevice();
if (!was && c.counted)
setTimeout(checkin, 50);
if (c.mode === "direct" && !c.key) {
$("err").textContent = "Direct mode needs a key.";
return;
}
if (c.mode === "direct" && !/^gsk_/.test(c.key)) {
$("err").textContent = "That doesn\u2019t look like a Groq key \u2014 they begin gsk_.";
return;
}
if (c.mode === "proxy" && !c.proxy) {
$("err").textContent = "Proxy mode needs an endpoint URL.";
return;
}
setCfg(c);
setFog(c.density);
$("panel").classList.remove("open");
setStatus("Saved.");
},
function () {
var info = "", ver = "";
try {
var c = renderer && renderer.getContext ? renderer.getContext() : null;
if (c) {
ver = c.getParameter(c.VERSION);
var dbg = c.getExtension("WEBGL_debug_renderer_info");
info = dbg ? c.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "(hidden by the browser)";
}
else {
var g = document.createElement("canvas").getContext("webgl");
info = g ? "a context can be made, but the app has none" : "no WebGL at all";
}
}
catch (e) {
info = "could not be read: " + e.message;
}
var L = [];
L.push("screen: " + innerWidth + " x " + innerHeight + " at " + (window.devicePixelRatio || 1) + "x");
L.push("touch detected: " + (isTouch ? "yes" : "no") + "    coarse pointer: " + ((typeof matchMedia === "function" && matchMedia("(pointer:coarse)").matches) ? "yes" : "no"));
L.push("touch controls started: " + (touchRig ? "yes" : "no") + "    on-screen pad: " + padMode() + (padWanted() ? " (showing)" : " (hidden)"));
L.push("graphics: " + (info || "unknown"));
L.push("webgl version: " + (ver || "unknown"));
L.push("things standing: " + store.objects.length + "    figures: " + store.characters.length);
L.push("app version: " + (typeof APP_VERSION !== "undefined" ? APP_VERSION : "?"));
L.push("browser: " + navigator.userAgent);
return L.join("\n");
}
];
});
