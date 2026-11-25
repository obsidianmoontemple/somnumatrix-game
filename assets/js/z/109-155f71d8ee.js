/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(109, function () {
"use strict";
return [
function (keepIn) {
if (typeof nmOpen !== "undefined" && nmOpen)
return true;
var ae = document.activeElement;
if (ae && /INPUT|TEXTAREA|SELECT/.test(ae.tagName) && ae !== document.body) {
ae.blur();
return true;
}
for (var i = 0; i < BACK_STEPS.length; i++) {
var s = BACK_STEPS[i];
try {
if (s.open()) {
s.close();
return true;
}
}
catch (e) { }
}
if (backIsOpen("i-card")) {
closeInfoCard();
return true;
}
if (goBackShown("chs-box") && typeof chsClose === "function") {
chsClose();
return true;
}
if (goBackShown("gaz-panel") && typeof GAZ !== "undefined" && typeof gazPaint === "function") {
GAZ.open = false;
gazPaint();
return true;
}
if (goBackShown("ph-box") && typeof PH !== "undefined" && typeof phPaint === "function") {
PH.open = false;
phPaint();
return true;
}
if ((goBackShown("wgd-box") || goBackShown("wgd-shade")) && typeof WGD !== "undefined" && !WGD.min && typeof wgdAway === "function") {
wgdAway();
return true;
}
if (backIsOpen("interp") && typeof closeInterp === "function") {
closeInterp();
return true;
}
if (typeof storyOpen !== "undefined" && storyOpen && typeof closeStory === "function") {
closeStory();
return true;
}
if (backIsOpen("journal") && typeof closeJournal === "function") {
closeJournal();
return true;
}
if (backIsOpen("self") && typeof closeSelf === "function") {
closeSelf();
return true;
}
if (typeof greetOpen !== "undefined" && greetOpen && typeof closeGreet === "function") {
closeGreet();
return true;
}
if (typeof talkOpen !== "undefined" && talkOpen && typeof closeTalk === "function") {
closeTalk();
return true;
}
if (typeof deskOpen !== "undefined" && deskOpen && typeof closeDesk === "function") {
closeDesk();
return true;
}
if (typeof MALL !== "undefined" && MALL.open && typeof mallClose === "function") {
mallClose();
return true;
}
if (typeof ugOpen !== "undefined" && ugOpen && typeof ugHide === "function") {
ugHide();
return true;
}
if (typeof LOTB !== "undefined" && LOTB.open && typeof lotClose === "function") {
lotClose(false);
return true;
}
if (typeof WORK !== "undefined" && WORK.open) {
WORK.open = false;
if (typeof workPaint === "function")
workPaint();
return true;
}
if (typeof wpEditing !== "undefined" && wpEditing) {
var c = document.getElementById("wp-cancel");
if (c) {
c.click();
return true;
}
}
if (backIsOpen("me-ward") && typeof closeWardrobe === "function") {
closeWardrobe();
return true;
}
if (typeof shapeOpen !== "undefined" && shapeOpen) {
shapeOpen = false;
if (typeof paintShape === "function")
paintShape();
if (typeof paintShapeButton === "function")
paintShapeButton();
return true;
}
if (typeof streetOpen !== "undefined" && streetOpen) {
streetOpen = false;
if (typeof paintStreetButton === "function")
paintStreetButton();
if (typeof paintStreet === "function")
paintStreet();
return true;
}
if (backIsOpen("inspect") && typeof closeInspect === "function") {
closeInspect();
return true;
}
if (backIsOpen("roster")) {
document.getElementById("roster").classList.remove("open");
return true;
}
if (backIsOpen("land") && typeof closeLand === "function") {
closeLand();
return true;
}
if (backIsOpen("panel")) {
document.getElementById("panel").classList.remove("open");
return true;
}
if (typeof plotOn !== "undefined" && plotOn && typeof setPlot === "function") {
if (typeof plotArmed !== "undefined" && plotArmed) {
plotArmed = null;
var pp = document.getElementById("p-place");
if (pp)
pp.classList.remove("on");
if (typeof plotStatus === "function")
plotStatus("Placing cancelled.");
}
else
setPlot(false);
return true;
}
if (typeof goBackPanel === "function" && goBackPanel())
return true;
if (typeof WLD !== "undefined" && WLD.card && WLD.card.style.display === "block" && typeof worldCard === "function") {
worldCard(null);
return true;
}
if (keepIn === true)
return false;
if (typeof walkMode !== "undefined" && walkMode && store.inside && typeof INT !== "undefined" && INT && typeof exitInterior === "function") {
exitInterior();
return true;
}
if (typeof walkMode !== "undefined" && walkMode && typeof setWalk === "function") {
setWalk(false);
return true;
}
return false;
},
function () {
if (typeof gpdTopLayer !== "function")
return false;
var top = gpdTopLayer();
if (!top)
return false;
var bs = top.querySelectorAll("button,[role=button],a"), pick = null;
for (var i = 0; i < bs.length && !pick; i++) {
var b = bs[i];
if (b.disabled || !b.offsetParent)
continue;
var t = (b.textContent || "").replace(/[←‹«]/g, "").trim(), al = (b.getAttribute("aria-label") || "") + " " + (b.title || "") + " " + (b.id || "") + " " + (b.className || "");
if (GOBACK_CLOSE.test(t) || /(^|[\s_-])(close|x|shut)([\s_-]|$)/i.test(al))
pick = b;
}
if (!pick)
return false;
pick.click();
return true;
},
function () {
var el = document.getElementById("i-card");
if (el)
return el;
var css = document.createElement("style");
css.textContent = "#i-card{position:fixed;right:12px;top:12px;z-index:62;display:none;width:min(340px,calc(100vw - 24px));max-height:70vh;overflow:auto;" +
"background:rgba(10,12,18,.95);border:1px solid var(--line,#2A2C34);border-radius:6px;padding:12px 14px;font:13px var(--sans);color:var(--bone);line-height:1.5}" +
"#i-card h4{margin:0 0 2px;font:600 15px var(--serif);color:#E8E2D2}#i-card .k{color:var(--dim);font-size:12px}";
document.head.appendChild(css);
el = document.createElement("div");
el.id = "i-card";
document.body.appendChild(el);
return el;
},
function (o) {
var el = infoCardEl();
var name = (typeof placeName === "function" ? placeName(o) : (o.label || o.name || o.archetype));
var d = (typeof KIT !== "undefined" && KIT[o.archetype]) || {};
var kind = { structure: "a building", being: "someone of the city", nature: "part of the land", vehicle: "a vehicle", infra: "part of the streets" }[d.cat] || "part of the city";
var where = "";
if (typeof ATLC !== "undefined" && ATLC && typeof atlRingAt === "function") {
var R = atlRingAt(o.x, o.z);
if (R && R.name)
where = R.name;
}
var wp = (typeof WP_BY_KEY !== "undefined" && WP_BY_KEY[o.label]) || null, jobs = "";
if (wp && typeof WORK !== "undefined") {
jobs = '<div style="margin-top:6px">A place of work: ' + esc(wp.note || "") + '</div>';
}
var why = (typeof visiting !== "undefined" && visiting) ? "You are visiting another dreamer's world: you may look, and nothing you do here changes it."
: "Part of Somnucor, the one city every dreamer shares. Only the city's keepers change it, for everyone at once.";
el.innerHTML = '<div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start"><div><h4>' + esc(name) + '</h4><div class="k">' + esc(kind) + (where ? ' · ' + esc(where) : '') + '</div></div>' +
'<button class="btn" id="i-card-x">Close</button></div>' + (o.sign ? '<div style="margin-top:6px">“' + esc(o.sign) + '”</div>' : '') + jobs +
'<div class="k" style="margin-top:8px">' + why + '</div>';
el.style.display = "block";
document.getElementById("i-card-x").onclick = closeInfoCard;
if (document.exitPointerLock)
document.exitPointerLock();
},
function (freq, secs) {
try {
if (typeof audio === "undefined" || !audio.on || !audio.ctx)
return;
var c = audio.ctx, o = c.createOscillator(), g = c.createGain();
o.type = "sine";
o.frequency.value = freq || 220;
g.gain.value = 0.0001;
o.connect(g);
g.connect(audio.master || c.destination);
var t = c.currentTime;
g.gain.exponentialRampToValueAtTime(0.18, t + 0.05);
g.gain.exponentialRampToValueAtTime(0.0001, t + (secs || 0.6));
o.start(t);
o.stop(t + (secs || 0.6) + 0.05);
}
catch (e) { }
}
];
});
