/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
function renderTranscript(fin, interim) {
var el = document.getElementById("transcript");
el.innerHTML = esc(fin) + (interim ? '<span class="interim">' + esc(interim) + "</span>" : "");
el.scrollTop = el.scrollHeight;
}
function esc(s) {
return String(s).replace(/[&<>"']/g, function (c) {
return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
});
}
function safeUrl(u) { u = String(u == null ? "" : u).trim(); return /^https:\/\/[^\s"'<>]+$/i.test(u) ? u : ""; }
function setStatus(h) { document.getElementById("status").innerHTML = h; }
function updateCount() {
var n = store.objects.length;
document.getElementById("count").textContent = n ? n + (n === 1 ? " form" : " forms") : "empty";
}
var draftScanned = 0;
function onDraftInput() { return __ZC(63, 0, this, arguments, new.target); }
function commitDraft() { return __ZC(63, 1, this, arguments, new.target); }
function importJSON(file) { return __ZC(63, 2, this, arguments, new.target); }
function clearScene() {
Object.keys(meshes).forEach(function (k) { scene.remove(meshes[k]); });
meshes = {};
drawnEdges = {};
for (var i = scene.children.length - 1; i >= 0; i--) {
var c = scene.children[i];
if (c.isMesh && c.userData && c.userData.street)
scene.remove(c);
}
}
function rebuild() { return __ZC(63, 3, this, arguments, new.target); }
function replaceWorld(d) { return __ZC(63, 4, this, arguments, new.target); }
function mergeWorld(d) { return __ZC(63, 5, this, arguments, new.target); }
function cleanSlate() { return __ZC(63, 6, this, arguments, new.target); }
function exportJSON() { return __ZC(63, 7, this, arguments, new.target); }
function newDream() { return __ZC(63, 8, this, arguments, new.target); }
function wire() {
var $ = function (id) { return document.getElementById(id); };
$("mic").addEventListener("click", toggleMic);
$("commitbtn").addEventListener("click", commitDraft);
$("walkbtn").addEventListener("click", function () { setWalk(!walkMode); });
$("newbtn").addEventListener("click", newDream);
$("exportbtn").addEventListener("click", exportJSON);
$("importbtn").addEventListener("click", function () { $("importfile").click(); });
$("importfile").addEventListener("change", function () {
if (this.files && this.files[0])
importJSON(this.files[0]);
this.value = "";
});
$("setbtn").addEventListener("click", openPanel);
$("closebtn").addEventListener("click", function () { $("panel").classList.remove("open"); });
$("savebtn").addEventListener("click", savePanel);
$("wipebtn").addEventListener("click", function () {
if (confirm("Erase every dream stored in this browser?")) {
try {
localStorage.removeItem(KEY);
}
catch (e) { }
location.reload();
}
});
$("tscrub").addEventListener("input", function () {
scrubOffset = parseInt(this.value, 10) / 60;
tickClock(true);
});
$("tnow").addEventListener("click", function () {
scrubOffset = null;
document.getElementById("tscrub").value = Math.round(dreamHour() * 60);
tickClock(true);
});
$("g-again").addEventListener("click", greetAgain);
$("g-close").addEventListener("click", closeGreet);
$("g-know").addEventListener("click", function () {
$("g-claim").classList.add("open");
$("g-know").style.display = "none";
$("g-confirm").style.display = "";
$("g-name").focus();
});
$("g-confirm").addEventListener("click", claimStranger);
$("g-name").addEventListener("keydown", function (e) {
if (e.key === "Enter") {
e.preventDefault();
claimStranger();
}
});
$("journalbtn").addEventListener("click", openJournal);
$("interpbtn").addEventListener("click", function () { openInterp(null); });
$("x-close").addEventListener("click", closeInterp);
$("j-close").addEventListener("click", closeJournal);
$("viewing-clear").addEventListener("click", clearView);
$("j-consent").addEventListener("change", function () {
var rs = research();
rs.consent = this.checked;
rs.since = this.checked ? new Date().toISOString().slice(0, 10) : null;
save();
$("j-rstate").textContent = rs.consent ? ("on since " + rs.since) : "off";
if (jSel !== null)
renderJournalDetail(jSel);
});
$("i-link").addEventListener("change", function () {
if (!picked || !this.value)
return;
var other = specById(this.value);
if (!other)
return;
if (!confirm("Treat this as the same " + picked.archetype + " as " + placeName(other) + "?\n\nIt becomes one place that has appeared on several nights.")) {
this.value = "";
return;
}
var keepId = other.id;
linkPlaces(keepId, picked.id);
closeInspect();
setStatus("<b>One place, " + specById(keepId).nights.length + " nights.</b>");
});
$("storybtn").addEventListener("click", openStory);
$("story-close").addEventListener("click", closeStory);
$("story-render").addEventListener("click", renderStory);
$("story-text").addEventListener("input", updateStoryCount);
$("selfbtn").addEventListener("click", openSelf);
$("self-close").addEventListener("click", closeSelf);
$("self-save").addEventListener("click", saveSelf);
$("self-ability-add").addEventListener("keydown", function (e) {
if (e.key !== "Enter")
return;
e.preventDefault();
var v = this.value.trim();
if (!v)
return;
dreamer().abilities.push({ name: v, nights: [store.session], src: "added" });
this.value = "";
save();
renderAbilities();
});
$("slatebtn").addEventListener("click", cleanSlate);
$("i-floors").addEventListener("change", function () {
if (!picked)
return;
var v = parseInt(this.value, 10);
if (!LEVELS[picked.archetype]) {
this.value = "";
return;
}
picked.attrs.lv = Math.max(1, Math.min(120, isNaN(v) ? LEVELS[picked.archetype] : v));
touchPicked();
});
$("rosterbtn").addEventListener("click", openRoster);
$("r-close").addEventListener("click", function () { $("roster").classList.remove("open"); });
$("t-send").addEventListener("click", sendTalk);
$("t-close").addEventListener("click", closeTalk);
$("t-build").addEventListener("click", buildFromReply);
$("t-say").addEventListener("keydown", function (e) {
if (e.key === "Enter" && !e.shiftKey) {
e.preventDefault();
sendTalk();
}
});
$("soundbtn").addEventListener("click", function () {
if (audio.on) {
stopAudio();
this.textContent = "Sound off";
this.classList.remove("on");
}
else {
startAudio();
this.textContent = "Sound on";
this.classList.add("on");
}
});
var ta = $("freetext");
ta.addEventListener("input", onDraftInput);
ta.addEventListener("keydown", function (e) {
if (e.key === "Enter" && !e.shiftKey) {
e.preventDefault();
commitDraft();
}
});
$("density").addEventListener("input", function () {
setFog(parseInt(this.value, 10));
var c = cfg();
c.density = parseInt(this.value, 10);
setCfg(c);
});
$("i-name-in").addEventListener("input", function () { if (picked) {
picked.name = this.value || null;
$("i-name").textContent = placeName(picked);
save();
} });
$("i-label").addEventListener("input", function () { if (picked) {
picked.label = this.value;
$("i-name").textContent = placeName(picked);
save();
} });
$("i-sign").addEventListener("change", function () { if (picked) {
picked.sign = this.value || null;
touchPicked();
} });
$("i-scale").addEventListener("input", function () { if (picked) {
picked.attrs.s = parseFloat(this.value);
touchPicked();
} });
$("i-height").addEventListener("input", function () { if (picked) {
picked.attrs.h = parseFloat(this.value);
touchPicked();
} });
$("i-solid").addEventListener("click", function () {
if (!picked)
return;
picked.solid = !picked.solid;
if (picked.solid && picked.filler) {
picked.filler = false;
picked.placed = true;
picked.nights = [store.session];
var c = charOf(picked);
if (c) {
c.primary = true;
c.src = c.src || {};
c.src.name = c.src.name || "chosen";
}
setStatus("<b>" + esc(placeName(picked)) + "</b> is yours now, and will stay.");
}
touchPicked();
});
$("i-del").addEventListener("click", function () { if (picked) {
removeSpec(picked);
closeInspect();
updateCount();
save();
} });
wireLand();
}
function paintScrub() {
var stops = [];
for (var h = 0; h <= 24; h += 1) {
var c = skyAt(Math.min(h, 23.99)).low;
stops.push("#" + ("000000" + c.toString(16)).slice(-6) + " " + (h / 24 * 100).toFixed(1) + "%");
}
document.getElementById("tscrub").style.background = "linear-gradient(90deg," + stops.join(",") + ")";
}
function openPanel() { return __ZC(63, 9, this, arguments, new.target); }
function savePanel() { return __ZC(63, 10, this, arguments, new.target); }
function deviceReport() { return __ZC(63, 11, this, arguments, new.target); }
(function () {
var b = typeof document !== "undefined" && document.getElementById ? document.getElementById("diagbtn") : null;
if (!b)
return;
b.onclick = function () {
var d = document.getElementById("diag");
d.textContent = deviceReport();
d.style.display = d.style.display === "none" ? "block" : "none";
};
})();
