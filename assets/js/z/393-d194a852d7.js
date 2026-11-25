/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(393, function () {
"use strict";
return [
function (optOut, wish) {
if (CHS.preview)
return Promise.resolve(null);
chsWrite(chsMe(), { done: 1, out: !!optOut, wish: wish || "", at: Date.now() });
return chsRpc("save_char_setup", { p_opted_out: !!optOut, p_job_wish: wish || null }).then(function (o) { CHS.srv = { ok: true, done: true, opted_out: !!optOut, job_wish: wish || null }; return o; })
.catch(function () { return null; });
},
function () {
if (CHS.el)
return;
var st = document.createElement("style");
st.id = "chs-css";
st.textContent = CHS_CSS;
document.head.appendChild(st);
var sh = document.createElement("div");
sh.id = "chs-shade";
sh.style.display = "none";
document.body.appendChild(sh);
CHS.shade = sh;
var el = document.createElement("div");
el.id = "chs-box";
el.setAttribute("role", "dialog");
el.setAttribute("aria-label", "Set up your city character");
el.style.display = "none";
["keydown", "keyup", "keypress"].forEach(function (k) { el.addEventListener(k, function (e) { e.stopPropagation(); if (k === "keydown" && e.key === "Enter" && e.target && e.target.tagName === "INPUT")
chsNext(); }); });
["pointerdown", "mousedown", "touchstart", "wheel"].forEach(function (k) { el.addEventListener(k, function (e) { e.stopPropagation(); }, { passive: true }); });
el.addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-chs]") : null;
if (!t)
return;
var a = t.getAttribute("data-chs");
try {
if (a === "next")
chsNext();
else if (a === "back")
chsGo(CHS.i - 1);
else if (a === "later")
chsLater();
else if (a === "join") {
CHS.d.optOut = false;
chsGo(1);
}
else if (a === "out")
chsOptOut(t);
else if (a === "look")
chsLook();
else if (a === "dress")
chsDress();
else if (a === "city")
chsFinish(true);
else if (a === "stay")
chsFinish(false);
else if (a.indexOf("wish:") === 0) {
CHS.d.wish = a.slice(5);
chsGo(CHS.i);
}
else if (a.indexOf("job:") === 0)
chsApply(+a.slice(4), t);
}
catch (err) {
if (window.console)
console.warn("[char-setup]", err);
}
});
el.addEventListener("input", function (e) {
var t = e.target;
if (!t || !t.id)
return;
if (t.id === "chs-name")
CHS.d.name = t.value.slice(0, 40);
else if (t.id === "chs-door")
CHS.d.door = t.value.slice(0, 40);
else if (t.id === "chs-line")
CHS.d.line = t.value.slice(0, 120);
});
document.body.appendChild(el);
CHS.el = el;
var pill = document.createElement("button");
pill.id = "chs-pill";
pill.type = "button";
pill.textContent = "✨ Back to my character";
pill.addEventListener("click", function () { chsBack(); });
document.body.appendChild(pill);
CHS.pill = pill;
addEventListener("keydown", function (e) { if (CHS.open && !CHS.min && e.key === "Escape") {
e.stopImmediatePropagation();
chsLater();
} }, true);
},
function () {
var D = CHS.d, member = chsMember(), S = [];
S.push({ pic: CHS_HELLO, title: "Let's make your city self", body: "<p>Somnucor is the city every dreamer shares: streets full of people, work and wages, a bank, a home, and a door of your own in the <b>Hall of Doors</b>.</p>" +
"<p>A few quick choices and you're ready. You can change any of them later.</p>" +
(member ? "" : "<p class='chs-small'>You can walk the city as a visitor. A job, a home and gold come with membership.</p>") +
"<div class='chs-acts'><button type='button' class='chs-go' data-chs='join'>Yes, set me up in the city</button></div>" +
"<div class='chs-acts'><button type='button' data-chs='out'>" + (chsJoined() ? "Leave the city, just my own dreams" : "No thanks, just my own dreams") + "</button></div>" +
"<p class='chs-small'>Saying no keeps the dream journal and your own dreamscape exactly as they are. Nothing of the city is built, and you can join any time in Settings.</p>", noNav: true });
S.push({ pic: "🏷️", title: "What should people call you?", body: "<p>This is the name over your head in Somnucor, and the one the city's people use when they talk to you.</p>" +
"<input type='text' id='chs-name' maxlength='40' autocomplete='nickname' placeholder='your name, or the one you dream under' value='" + chsEsc(D.name) + "'>" +
"<p class='chs-small'>No surnames or addresses needed. Something friendly is perfect.</p>", ok: function () { if (!D.name.trim())
return "A name, please — any name you like."; } });
S.push({ pic: "👗", title: "Your look", body: "<p>Pick your clothes, hair and colours in the wardrobe. It opens on you, in a mirror.</p>" +
"<div class='chs-acts'><button type='button' class='chs-act' data-chs='look'>👗 Open the wardrobe</button></div>" +
"<p class='chs-small'>You can skip this. The wardrobe is always under <b>B</b> on a keyboard, or <b>🎒 Backpack › Wardrobe</b>.</p>" });
S.push({ pic: "🚪", title: "Your door in the Hall of Doors", body: "<p>Every dreamer has a door in the great hall. Its name is lettered on the nameplate, and walking through it takes you home.</p>" +
"<input type='text' id='chs-door' maxlength='40' placeholder='the name on your door' value='" + chsEsc(D.door) + "'>" +
"<input type='text' id='chs-line' maxlength='120' placeholder='a line under it, if you like' value='" + chsEsc(D.line) + "'>" +
(CHS.hasDoor ? "<div class='chs-acts'><button type='button' class='chs-act' data-chs='dress'>🎨 Dress up my door</button></div>" :
"<p class='chs-small'>Once it stands you can dress it up (shape, colour, light, ornaments): <b>☰ Menu › 🚪 My door</b>.</p>"),
ok: function () { if (!D.door.trim())
return "Give your door a name — yours is fine."; }, go: chsTakeDoor });
var chips = CHS_WISH.map(function (w) { return "<button type='button' class='chs-chip" + (D.wish === w[0] ? " on" : "") + "' data-chs='wish:" + w[0] + "'><i>" + w[1] + "</i><span>" + chsEsc(w[2]) + "</span></button>"; }).join("");
S.push({ pic: "💼", title: "What work would you love?", body: "<p>Pick what sounds most like you. We'll show you posts that match, and the city's bosses can see what dreamers would like to do.</p>" +
"<div class='chs-chips'>" + chips + "</div>" +
(member ? "" : "<p class='chs-small'>Jobs come with membership. Pick one anyway, and it's ready for you when you join.</p>") });
var w = chsWishRow(D.wish), sum = "<div class='chs-card'>🏷️ <b>" + chsEsc(D.name || "(no name)") + "</b><br>🚪 Door: <b>" + chsEsc(D.door || "(none)") + "</b>" + (D.line ? " <i>— " + chsEsc(D.line) + "</i>" : "") +
"<br>💼 Work: <b>" + (w ? w[1] + " " + chsEsc(w[2]) : "not chosen yet") + "</b></div>";
S.push({ pic: "🎉", title: "You're all set!", body: sum +
"<div id='chs-jobs'>" + chsJobsHtml() + "</div>" +
"<div class='chs-msg' id='chs-msg'></div>" +
"<div class='chs-acts'><button type='button' class='chs-go' data-chs='city'>" + (CHS.preview ? "Close the preview" : "🏙️ Take me to Somnucor") + "</button>" +
(CHS.preview ? "" : "<button type='button' data-chs='stay'>Stay where I am</button>") + "</div>" +
"<p class='chs-small'>Change any of this later: <b>☰ Menu › Settings › Somnucor › ✨ Set up my city character</b>.</p>", last: true });
return S;
},
function () {
var w = chsWishRow(CHS.d.wish);
if (!w)
return "";
if (!chsMember() && !chsKeeper())
return "<p class='chs-small'>When you're a member, the job board is in <b>Settings › Your work and your purse</b>.</p>";
if (CHS.matches === null)
return "<p class='chs-small'>Looking for open posts…</p>";
if (!CHS.matches.length)
return "<p class='chs-small'>No " + chsEsc(w[2].toLowerCase()) + " posts are open right now. The full job board is in <b>Settings › Your work and your purse</b>.</p>";
return "<div class='chs-small' style='margin-top:6px'>Open posts that match:</div>" + CHS.matches.map(function (r) {
return "<div class='chs-job'><span><b>" + chsEsc(r.title) + "</b> <span class='chs-small'>· " + r.rate + " gold " + (r.pay_kind === "salary" ? "a week" : "an hour") + (r.workplace ? " · " + chsEsc(r.workplace) : "") + "</span></span>" +
"<button type='button' data-chs='job:" + r.job_id + "'>" + (r.auto_hire === false ? "Apply" : "Take it") + "</button></div>";
}).join("");
},
function () {
var w = chsWishRow(CHS.d.wish);
CHS.matches = null;
if (!w || !(chsMember() || chsKeeper()) || typeof jobBoard !== "function") {
CHS.matches = [];
return;
}
jobBoard().then(function (rows) {
var open = (rows || []).filter(function (r) { return (r.positions - r.taken) > 0; });
var hit = open.filter(function (r) { return w[3].test([r.title, r.panel, r.workplace].join(" ")); });
if (w[0] === "any")
hit = open;
CHS.matches = hit.slice(0, 4);
var box = document.getElementById("chs-jobs");
if (box && CHS.open)
box.innerHTML = chsJobsHtml();
}).catch(function () { CHS.matches = []; });
},
function (jobId, btn) {
if (CHS.preview) {
chsSay("In the preview nothing is applied for.");
return;
}
if (typeof applyFor !== "function")
return;
var row = (CHS.matches || []).filter(function (r) { return r.job_id === jobId; })[0];
if (btn) {
btn.disabled = true;
btn.textContent = "…";
}
applyFor(jobId, row && row.auto_hire === false ? ("I'd love to do " + ((chsWishRow(CHS.d.wish) || [0, 0, "this work"])[2]).toLowerCase() + ".") : null).then(function () {
if (btn)
btn.textContent = row && row.auto_hire === false ? "Applied ✓" : "Done ✓";
chsSay(row && row.auto_hire === false ? "Your application is in. A keeper chooses for that post." : "You're hired! Your standing in Settings shows the way to work.");
});
},
function (i) {
CHS.steps = chsSteps();
if (i < 0)
i = 0;
if (i >= CHS.steps.length)
i = CHS.steps.length - 1;
CHS.i = i;
var s = CHS.steps[i], n = CHS.steps.length, el = CHS.el, dots = "";
for (var k = 1; k < n; k++)
dots += "<i" + (k <= i ? " class='on'" : "") + "></i>";
var pic = s.pic.length > 8 ? s.pic : "<span>" + s.pic + "</span>";
el.innerHTML = "<div class='chs-top'><div class='chs-pic'>" + pic + "</div><div><div class='chs-n'>" + (CHS.preview ? "Preview · " : "") + (i === 0 ? "Your city character" : s.last ? "All set" : "Step " + i + " of " + (n - 2)) + "</div><h3>" + chsEsc(s.title) + "</h3></div></div>" +
"<div class='chs-body'>" + s.body + "</div><div class='chs-msg' id='chs-err'></div>" +
(s.noNav ? "<div class='chs-row'><button type='button' class='chs-skip' data-chs='later'>Not now</button></div>" :
s.last ? "<div class='chs-row'><button type='button' data-chs='back'>‹ Back</button><div class='chs-dots' aria-hidden='true'>" + dots + "</div></div>" :
"<div class='chs-row'><button type='button' data-chs='back'>‹ Back</button><div class='chs-dots' aria-hidden='true'>" + dots + "</div><button type='button' class='chs-go' data-chs='next'>Next ›</button></div>");
el.style.display = "block";
CHS.shade.style.display = "";
el.scrollTop = 0;
if (s.last && CHS.matches === null)
chsFindJobs();
var f = el.querySelector("input[type=text]");
if (f && !("ontouchstart" in window))
try {
f.focus({ preventScroll: true });
}
catch (e) { }
},
function () {
var s = CHS.steps[CHS.i];
if (!s || s.noNav || s.last)
return;
var bad = s.ok && s.ok();
if (bad) {
var e = document.getElementById("chs-err");
if (e)
e.textContent = bad;
return;
}
if (CHS.i === 1 && !CHS.d.door)
CHS.d.door = CHS.d.name.trim();
if (CHS.i === 4)
CHS.matches = null;
if (s.go) {
if (CHS.busy)
return;
CHS.busy = true;
s.go().then(function () { CHS.busy = false; chsGo(CHS.i + 1); }, function (err) { CHS.busy = false; var e = document.getElementById("chs-err"); if (e)
e.textContent = String((err && err.message) || err || "That didn't go through."); });
return;
}
chsGo(CHS.i + 1);
},
function () {
var D = CHS.d, nm = D.door.trim(), ln = D.line.trim();
if (CHS.preview)
return Promise.resolve();
if (CHS.hasDoor && CHS.hasDoor.name === nm && (CHS.hasDoor.line || "") === ln)
return Promise.resolve();
if (typeof takeDoor !== "function")
return Promise.resolve();
var e = document.getElementById("chs-err");
if (e)
e.textContent = "Putting up your door…";
return takeDoor(nm, ln, null).then(function () { CHS.hasDoor = { name: nm, line: ln }; try {
var a = document.getElementById("door-name"), b = document.getElementById("door-line");
if (a)
a.value = nm;
if (b)
b.value = ln;
if (typeof doorPanel === "function")
doorPanel();
}
catch (x) { } });
},
function () {
if (!CHS.open)
return;
CHS.min = false;
CHS.pill.style.display = "none";
try {
if (typeof meView !== "undefined" && meView === "mirror" && typeof setView === "function" && typeof meBefore !== "undefined" && meBefore)
setView(meBefore);
var w = document.getElementById("me-ward");
if (w)
w.style.display = "none";
}
catch (e) { }
chsGo(CHS.i);
},
function () {
if (!CHS.preview)
chsWrite(chsMe(), { later: Date.now() });
chsClose();
if (typeof setStatus === "function")
setStatus("Set up your city character any time: <b>☰ Menu › Settings › Somnucor › ✨ Set up my city character</b>.");
},
function (btn) {
if (CHS.preview) {
chsClose();
return;
}
if (chsJoined() && btn && !btn.dataset.sure) {
btn.dataset.sure = "1";
btn.textContent = "Sure? Tap again to take the city down";
return;
}
if (chsJoined() && typeof leaveSomnucor === "function")
try {
leaveSomnucor();
}
catch (e) { }
chsKeep(true, CHS.d.wish);
chsClose();
if (typeof setStatus === "function")
setStatus("<b>Just your own dreams, then.</b> The journal and your dreamscape are exactly as they were. Join the city any time in <b>Settings › Somnucor</b>.");
},
function (go) {
if (CHS.preview) {
chsClose();
return;
}
var D = CHS.d;
try {
var me = dreamer();
if (D.name.trim() && me.name !== D.name.trim()) {
me.name = D.name.trim();
if (typeof save === "function")
save();
var sn = document.getElementById("self-name");
if (sn)
sn.value = me.name;
}
}
catch (e) { }
chsKeep(false, D.wish);
chsWrite(chsMe(), { joined: 1 });
chsClose();
var wasIn = chsJoined();
if (go) {
if (typeof wgdToCity === "function")
wgdToCity();
else if (!wasIn && typeof joinSomnucor === "function")
joinSomnucor();
}
else if (!wasIn && typeof joinSomnucor === "function")
joinSomnucor();
setTimeout(function () { if (typeof publishMyLook === "function")
try {
publishMyLook();
}
catch (e) { } }, wasIn ? 100 : 4000);
if (!go && typeof setStatus === "function")
setTimeout(function () { setStatus("<b>Welcome to Somnucor, " + chsEsc(D.name.trim()) + ".</b> Go there any time: <b>☰ Menu › The land › Somnucor</b>."); }, wasIn ? 50 : 2500);
},
function (preview) {
chsBuild();
if (!preview && !chsIn()) {
if (typeof setStatus === "function")
setStatus("Sign in first, then set up your city character. Your door and your name belong to your account.");
return;
}
CHS.preview = !!preview;
var me = null;
try {
me = dreamer();
}
catch (e) { }
var nm = (me && me.name) || "", sv = CHS.srv || {}, kept = chsRead()[chsMe()] || {};
var door = (typeof myDoor !== "undefined" && myDoor) ? myDoor : null;
CHS.hasDoor = door ? { name: String(door.label || door.name || "").replace(/ — yours$/, ""), line: door.doorLine || "" } : null;
CHS.d = { name: nm, door: CHS.hasDoor ? CHS.hasDoor.name : "", line: CHS.hasDoor ? CHS.hasDoor.line : "", wish: sv.job_wish || kept.wish || "", optOut: false };
CHS.matches = null;
if (typeof dmShut === "function")
try {
dmShut();
}
catch (e) { }
if (typeof psClose === "function")
try {
psClose();
}
catch (e) { }
var sc = document.getElementById("panel");
if (sc && sc.classList.contains("open")) {
var b = document.getElementById("set-close");
if (b)
b.click();
}
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
CHS.open = true;
CHS.min = false;
if (CHS.pill)
CHS.pill.style.display = "none";
chsGo(0);
}
];
});
