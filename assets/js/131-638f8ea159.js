/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
function isKeeperNow() {
if (typeof window !== "undefined" && window.SOMNU_KEEPER === true)
return true;
if (typeof amKeeper === "function" && amKeeper())
return true;
try {
if (typeof accessRead === "function" && typeof accessMe === "function") {
var a = accessRead(), me = accessMe();
if (a && me && a.user_id === me && a.keeper)
return true;
}
}
catch (e) { }
return false;
}
var DEV_RULES = [
[/\s*[—–-]?\s*has schema-update-\d+ been run\?/gi, "."],
[/,?\s*or run schema-update-\d+[^.<]*\./gi, "."],
[/\s*[—–-]\s*run (?:schema-update-\d+|the \w+ update)[^.<]*\.?/gi, "."],
[/\s*Run schema-update-\d+[^.<]*\./gi, ""],
[/The AI didn't answer \([^)]*\)/g, function (m) { return /GROQ|JWT|Supabase|secret|server said|it said|model/i.test(m) ? "The AI didn't answer just now" : m; }],
[/The browser blocked that call\. Use proxy mode\./g, "That could not be reached just now."]
];
var DEV_LEFT = /schema-update|SQL Editor|run the \w+ update|been run\?|GROQ_API_KEY|JWT verification|PGRST\d+|schema cache|Could not find the function|proxy mode/i;
var DEV_PLAIN = "This part of the city isn't open yet.";
var devReplaced = 0;
function playerSafe(s) {
if (s == null)
return s;
var t = String(s);
if (!DEV_LEFT.test(t) || isKeeperNow())
return s;
DEV_RULES.forEach(function (r) { t = t.replace(r[0], r[1]); });
t = t.replace(/\.\./g, ".");
if (DEV_LEFT.test(t))
t = DEV_PLAIN;
devReplaced++;
return t;
}
(function () {
if (typeof setStatus === "function") {
var ss = setStatus;
setStatus = function (h) { return ss.call(this, playerSafe(h)); };
}
if (typeof paintShape === "function") {
var ps = paintShape;
paintShape = function (msg) { return ps.apply(this, [playerSafe(msg)].concat([].slice.call(arguments, 1))); };
}
if (typeof aiSay === "function") {
var as = aiSay;
aiSay = function (h, q) { return as.call(this, playerSafe(h), q); };
}
if (typeof MutationObserver === "undefined" || typeof document === "undefined" || !document.body)
return;
function own(n) { var e = n.nodeType === 1 ? n : n.parentNode; return !!(e && e.closest && e.closest("#transcript,#freetext,#story,#j-detail,textarea,script,style")); }
function fix(n) {
if (n.nodeType === 3) {
if (n.nodeValue.length > 8 && DEV_LEFT.test(n.nodeValue) && !own(n)) {
var v = playerSafe(n.nodeValue);
if (v !== n.nodeValue)
n.nodeValue = v;
}
return;
}
if (n.nodeType !== 1 || own(n))
return;
if (!DEV_LEFT.test(n.textContent || ""))
return;
var w = document.createTreeWalker(n, 4, null, false), t;
while ((t = w.nextNode()))
fix(t);
}
new MutationObserver(function (list) {
if (isKeeperNow())
return;
for (var i = 0; i < list.length; i++) {
var m = list[i];
if (m.type === "characterData")
fix(m.target);
else
for (var j = 0; j < m.addedNodes.length; j++)
fix(m.addedNodes[j]);
}
}).observe(document.body, { childList: true, subtree: true, characterData: true });
})();
function realDreamt() {
if (typeof store === "undefined" || !store.objects)
return 0;
var n = 0;
store.objects.forEach(function (o) { if (!o.filler && !(o.realm || 0) && !o.hub)
n++; });
return n;
}
function firstNight() { return typeof store !== "undefined" && store && !(store.sessions && store.sessions.length); }
(function () {
if (typeof document === "undefined")
return;
var more = document.getElementById("more"), mb = document.getElementById("morebtn");
if (more && mb)
mb.addEventListener("click", function () {
var open = more.hasAttribute("hidden");
if (open)
more.removeAttribute("hidden");
else
more.setAttribute("hidden", "");
mb.setAttribute("aria-expanded", open ? "true" : "false");
});
var sb = document.getElementById("set-sound");
function paintSound() {
if (!sb)
return;
var on = typeof audio !== "undefined" && audio && audio.on;
sb.textContent = on ? "Sound is on — turn it off" : "Sound is off — turn it on";
}
var sc = document.getElementById("set-close");
if (sc)
sc.addEventListener("click", function () { var c = document.getElementById("closebtn"); if (c)
c.click(); });
if (sb)
sb.addEventListener("click", function () { var s = document.getElementById("soundbtn"); if (s)
s.click(); paintSound(); });
if (typeof openPanel === "function") {
var op = openPanel;
openPanel = function () {
document.body.classList.toggle("is-keeper", isKeeperNow());
var r = op.apply(this, arguments);
paintSound();
return r;
};
}
})();
var polishSeen = -1, polishBoot = Date.now();
function dreamExtent() {
var h = typeof heartOf === "function" ? heartOf(0) : { x: 0, z: 0 }, far = 0, south = h.z;
store.objects.forEach(function (o) { if (o.filler || (o.realm || 0))
return; far = Math.max(far, Math.hypot(o.x - h.x, o.z - h.z)); south = Math.max(south, o.z); });
return { x: h.x, z: h.z, r: far, south: south };
}
function frameDream() {
if (typeof orb === "undefined" || typeof walkMode === "undefined" || walkMode)
return;
if ((store.here || 0) !== 0)
return;
var e = dreamExtent();
orb.tx = e.x;
orb.tz = e.z;
orb.r = Math.max(48, Math.min(260, e.r * 2.6 + 40));
orb.p = Math.max(orb.p || 0, 0.5);
if (typeof viewAt !== "undefined")
viewAt = { x: e.x, z: e.z };
}
function polishTick() {
if (typeof document === "undefined" || typeof store === "undefined" || !store)
return;
document.body.classList.toggle("is-keeper", isKeeperNow());
var n = realDreamt();
var fl = document.getElementById("first-line");
if (fl)
fl.classList.toggle("gone", n > 0);
var sc = document.getElementById("scrim");
if (sc)
sc.classList.toggle("built", n > 0);
if (polishSeen === 0 && n > 0)
frameDream();
polishSeen = n;
if (Date.now() - polishBoot < 20000) {
var st = document.getElementById("status");
if (st && /^Press the circle and talk, or type below\.?$/.test(st.textContent))
st.innerHTML = "";
}
}
if (typeof setInterval === "function")
setInterval(polishTick, 500);
var walkHintTimer = null;
if (typeof setWalk === "function") {
var setWalkPlain = setWalk;
setWalk = function (on) {
var R = typeof walkResume !== "undefined" ? walkResume : null;
var resumes = !!(on && R && !R.inside && !store.inside && (!R.here || (typeof realmById === "function" && realmById(R.here))));
var r = setWalkPlain.apply(this, arguments);
var more = document.getElementById("more"), mb = document.getElementById("morebtn");
if (on && more && !more.hasAttribute("hidden")) {
more.setAttribute("hidden", "");
if (mb)
mb.setAttribute("aria-expanded", "false");
}
if (walkHintTimer) {
clearTimeout(walkHintTimer);
walkHintTimer = null;
}
if (!on)
return r;
walkHintTimer = setTimeout(function () { var w = document.getElementById("walkhint"); if (w)
w.classList.add("gone"); }, 9000);
if (resumes || store.inside || typeof camera === "undefined" || !camera)
return r;
if (typeof ATLC !== "undefined" && ATLC && store.here === ATLC.id) {
arriveInSomnucor();
return r;
}
if ((store.here || 0) === 0 && firstNight() && realDreamt() > 0) {
var e = dreamExtent(), built = store.objects.filter(function (o) { return !o.filler && !(o.realm || 0) && KIT[o.archetype] && KIT[o.archetype].cat === "structure"; });
var half = 6;
built.forEach(function (o) { half = Math.max(half, Math.abs(o.x - e.x) + 6); });
var hf = Math.atan(Math.tan((camera.fov || 60) * Math.PI / 360) * (camera.aspect || 1)) * 0.85;
var aim = { x: e.x, z: e.z }, d = Math.max(26, half / Math.tan(hf));
if (d > 70 && built.length) {
aim = { x: built[0].x, z: built[0].z };
d = 24;
}
var near = function (z) { return store.objects.some(function (o) { return !o.filler && !(o.realm || 0) && Math.hypot(o.x - aim.x, o.z - z) < 9; }); };
while (d < 80 && near(aim.z + d))
d += 4;
camera.position.set(aim.x, camera.position.y, aim.z + d);
yaw = 0;
pitch = -0.04;
}
return r;
};
}
function arriveInSomnucor() {
if (typeof ATLC === "undefined" || !ATLC || typeof camera === "undefined" || !camera)
return;
camera.position.set(ATLC.x, camera.position.y, ATLC.z + 50);
yaw = 0;
pitch = 0.12;
}
if (typeof toSomnucor === "function") {
var toSomnucorPlain = toSomnucor;
toSomnucor = function () {
var r = toSomnucorPlain.apply(this, arguments);
if (typeof walkMode !== "undefined" && walkMode && !store.inside)
arriveInSomnucor();
return r;
};
}
if (typeof tickClock === "function") {
var tickClockPlain = tickClock;
tickClock = function (force) {
var r = tickClockPlain.apply(this, arguments);
try {
if (!firstNight() || store.inside || (store.here || 0) !== 0)
return r;
var dl = typeof daylight === "function" && typeof dreamHour === "function" ? daylight(dreamHour()) : 1;
if (dl >= 0.55)
return r;
if (typeof hemi !== "undefined" && hemi && hemi.intensity < 0.8) {
hemi.intensity = 0.8;
hemi.color.setHex(blend(0x3A4468, 0xCFDCEA, 0.5));
hemi.groundColor.setHex(blend(0x07080D, 0x5A5040, 0.55));
}
if (typeof groundColor === "function") {
var gc = groundColor(), c = blend(blend(gc, 0x07080C, 0.84), gc, 0.7);
if (typeof ground !== "undefined" && ground)
ground.material.color.setHex(c);
if (typeof terrain !== "undefined" && terrain)
terrain.material.color.setHex(c);
}
}
catch (e) { }
return r;
};
}
