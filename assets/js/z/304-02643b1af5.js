/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(304, function () {
"use strict";
return [
function () {
var dev = wgdDevice(), inn = wgdIn(), lock = wgdLocked(), mem = wgdMember(), gold = wgdGolden();
var S = [];
S.push({ pic: "moon", title: "Welcome to SomnuMatrix", body: "<p>SomnuMatrix has two halves:</p><ul><li><b>Your dream journal.</b> Tell a dream and it is built around you as a place you can walk through.</li>" +
"<li><b>Somnucor,</b> a city every dreamer shares, with jobs, homes, shops, gold and many worlds beyond it.</li></ul>" +
"<p>This short guide shows you <b>how to sign up</b> and <b>how to play</b>, one step at a time. You can skip it, and open it again any time from <b>☰ Menu › 📖 How to play</b>.</p>" });
var acc;
if (inn) {
acc = "<p class='wgd-ok'>✓ You are signed in" + (wgdWho() ? " as <b>" + wgdEsc(wgdWho()) + "</b>" : "") + ". Your dreams, your home and your gold are kept to your account.</p>" +
"<p>On each <b>new device</b> (another phone, a computer, a Quest 2 headset) sign in once with the same email and password, and it remembers you after that.</p>";
}
else {
acc = "<p>An account keeps your dreams, your home and your gold, on every device. Here is how to make one:</p><ol class='wgd-ol'>" +
"<li>Press <b>Make my account</b> below. Settings opens at <b>Your account</b>.</li>" +
"<li>Type <b>your email</b> and choose <b>a password</b> of at least 10 letters or numbers.</li>" +
"<li>Press <b>Create an account</b>. Fill in <b>your date of birth</b>, then press <b>Create an account</b> again.</li>" +
"<li>Open the <b>letter we email you</b> and press the link in it to confirm.</li>" +
"<li>Come back here, type the same email and password, and press <b>Sign in</b>.</li></ol>" +
"<p class='wgd-small'>You must be <b>13 or older</b> to make an account. Gold, the casino and Ironfray are for <b>18 and over</b>. " +
"On each new device (including a Quest 2 headset) sign in once and it remembers you.</p>" +
(wgdCodeWaiting() ? "<p class='wgd-gold'>🎟️ Your Golden Invitation is waiting. It opens by itself the moment you are signed in.</p>" : "");
}
if (lock)
acc += "<p class='wgd-small'>🔒 This device has a <b>teacher or parent lock</b>. If you are not sure what to do, ask the grown-up who set it up.</p>";
S.push({ pic: "account", title: "Your account", body: acc,
acts: inn ? [] : [["Make my account", function () { wgdAway(); if (typeof openAccountForm === "function")
openAccountForm(); }]] });
var vb = "<p><b>Visitors</b> (anyone with an account) can walk the city and every world, look round the shops, homes and shows, and meet people.</p>" +
"<p><b>Members</b> also hold a <b>job</b>, have a <b>home</b> of their own, and <b>earn and spend gold</b>.</p>";
if (gold)
vb += "<p class='wgd-gold'>🎟️ You hold Golden Invitation No. " + gold + " of 20: your membership dues are waived for good.</p>";
else if (mem)
vb += "<p class='wgd-ok'>✓ You are a member. Everything is open to you.</p>";
else if (!lock)
vb += "<p>To become a member: <b>☰ Menu › Settings</b>, under <b>Your account</b>, press <b>Buy SomnuMatrix</b>. It is paid once, for life, never a subscription.</p>" +
"<p class='wgd-gold'>🎟️ Holding a <b>Golden Invitation</b>? Sign in, then open your <b>🎒 Backpack</b> and press <b>Open it</b>, and type the code printed on yours. It makes you a member for good.</p>";
else
vb += "<p>Ask the grown-up who set up this device about becoming a member.</p>";
var va = [];
if (!mem && !lock)
va.push(["What membership opens", function () { wgdAway(); if (typeof buyPanel === "function")
buyPanel(); }]);
if (!gold && !lock)
va.push(["I have a Golden Invitation", function () { wgdAway(); if (typeof giOpen === "function")
giOpen(); }]);
S.push({ pic: "member", title: "Visitor or member", body: vb, acts: va });
S.push({ pic: "dream", title: "Tell a dream", target: "freetext", body: "<p>This is the heart of SomnuMatrix. <b>Type what you remember</b> in the box" + (dev === "vr" ? "" : ", or press the <b>🎤 microphone</b> and say it") + ". Fragments are enough: a place, a person, a feeling.</p>" +
"<p class='wgd-small'>Press <b>Enter</b> (or <b>Add</b>) after each piece. Your dreams stay on this device unless you choose to keep them to your account.</p>" });
S.push({ pic: "walk", title: "Walk it", target: "walkbtn", body: "<p>Press <b>Walk it</b> and your dream is built around you in 3D, so you can walk through it.</p>" +
"<p class='wgd-small'>Every dream is kept in your <b>Dream journal</b> (☰ Menu › Dream journal). <b>Write a full dream</b> in the same Menu lets you write a long one all at once.</p>" });
S.push({ pic: "menu", title: "The Menu", target: function () { return (typeof walkMode !== "undefined" && walkMode) ? "ps-menu" : "morebtn"; }, body: "<p>Everything else is in <b>☰ Menu</b>. On this screen it holds <b>Settings</b> (your account, joining the city), the <b>Dream journal</b>, <b>The land</b> (your ground, and other worlds) and the <b>Wardrobe</b>.</p>" +
"<p>While you walk, <b>☰ Menu</b> sits " + wgdMenuWhere(dev) + ", and holds your <b>🎒 Backpack</b>, your phone, your work, <b>🥽 VR</b>, the <b>🌍 Dream worlds</b> and the rest.</p>" });
var mv = {
pc: "<p><b>On a computer:</b> <b>W A S D</b> to walk, <b>Shift</b> to run. <b>Click the view</b>, then move the mouse to look around. <b>E</b> talks to someone or uses what is in front of you. <b>Tab</b> frees the mouse to click buttons, and Tab again (or a click on the world) takes it back to looking. <b>Esc</b> closes whatever is open.</p>",
phone: "<p><b>On a phone or tablet:</b> put your <b>left thumb on the circle</b> at the bottom left and push to walk (push further to run). <b>Drag anywhere else</b> to look around. Tap <b>Speak</b> or <b>Use</b> when they appear, and <b>Back</b> to go back.</p>",
vr: "<p><b>In a Quest 2 headset:</b> open SomnuMatrix in the headset's own browser and sign in once. Then <b>☰ Menu › 🥽 VR › Step in with the headset</b>. <b>Left stick</b> walks (press it in to run), <b>right stick</b> turns you. <b>Trigger</b> uses what is in front of you. <b>A or X</b> waves, <b>B or Y</b> backs out.</p>"
};
var others = ["pc", "phone", "vr"].filter(function (k) { return k !== dev; }).map(function (k) { return mv[k]; }).join("");
S.push({ pic: dev, title: "Moving around", body: mv[dev] +
"<details class='wgd-more'><summary>On other devices</summary>" + others + "</details>" +
"<p class='wgd-small'>Short tips appear the first time you walk, drive, fly or go inside. If anything goes wrong, the <b>!</b> button tells the Keeper.</p>" });
var joined = typeof joinedSomnucor === "function" && joinedSomnucor();
S.push({ pic: "city", title: "Somnucor, the city", body: (joined ? "<p class='wgd-ok'>✓ The city is already built on this device.</p>" : "<p>The city is built on your device the first time you join. It takes a moment, once.</p>") +
"<p>Press <b>Take me to Somnucor</b> at the end of this guide, or any time: <b>☰ Menu › The land › Somnucor › Go there</b>" + (joined ? "" : " (join first in <b>☰ Menu › Settings › Join Somnucor</b>)") + ".</p>" +
"<p class='wgd-small'>From the city, the <b>Hall of Doors</b> has a door to every world, and <b>Temple Row</b> a house for every power.</p>" +
"<p class='wgd-small'>On the Market Ring, <b>GiGi's Lounge</b> has Bingo, Mahjong, solitaire and tournaments, free for everyone.</p>" });
S.push({ pic: "work", title: "Work, gold and your backpack", body: "<p>Every workplace with an opening shows a <b>📋 Hiring here</b> button at its door and inside. Tap it to see the posts and apply on the spot. Your jobs, shifts and pay are under <b>☰ Menu › Your work</b>.</p>" +
"<p>Shifts are real time. Wages are paid in <b>gold</b>, the city's money.</p>" +
"<p>Everything you gain (gold, things you buy or find, keys, keepsakes) goes into your <b>🎒 Backpack</b> in the Menu.</p>" +
(mem || gold ? "" : "<p class='wgd-small'>Jobs, a home and gold are for members (Step 2).</p>") });
S.push({ pic: "way", title: "Finding your way", body: "<p><b>" + (dev === "pc" ? "Click" : "Tap") + " the compass</b> at the top left while you walk. Every place nearby is listed with how far it is and which way it lies. Pick one, and an <b>arrow at the top of the screen</b> points the way and counts the metres down.</p>" +
"<p class='wgd-small'>You walk, ride a taxi, drive or fly there yourself; nothing jumps you about.</p>" });
S.push({ pic: "worlds", title: "The other worlds", body: "<p>Beyond the city are more than twenty worlds: Neverland, the Endless Sea, the Underdark, the North Pole, Station Aurora and the planets, Jubilee the Party Planet, the green world of Greenwold, and the dream lands.</p>" +
"<p>Find them in <b>☰ Menu › 🌍 Dream worlds</b>, through the <b>Hall of Doors</b>, or from the <b>Spaceport</b>.</p>" +
(lock ? "" : "<p class='wgd-small'>Ironfray, the battle world, is for 18 and over.</p>") });
S.push({ pic: "done", title: "You're ready", body: "<p>That's everything you need to begin.</p><ul>" +
(inn ? "" : "<li><b>Make your account</b> first (Step 1), so nothing you make is lost.</li>") +
"<li>Tell a dream and press <b>Walk it</b>, or go straight to the city.</li>" +
"<li>Open this guide again any time: <b>☰ Menu › 📖 How to play</b>.</li></ul>",
acts: [["Take me to Somnucor", function () { wgdFinish(); wgdToCity(); }, true], ["Tell a dream first", function () { wgdFinish(); var f = document.getElementById("freetext"); if (f)
try {
f.focus();
}
catch (e) { } }, true]] });
return S;
},
function () {
try {
if (typeof joinedSomnucor === "function" && !joinedSomnucor() && typeof joinSomnucor === "function") {
joinSomnucor();
setTimeout(function () { try {
if (typeof landWalk === "function")
landWalk();
if (typeof toSomnucor === "function")
toSomnucor();
}
catch (e) { } }, 400);
return;
}
if (typeof landWalk === "function")
landWalk();
if (typeof toSomnucor === "function")
toSomnucor();
}
catch (e) {
if (window.console)
console.warn("[welcome-guide] city", e);
}
},
function () {
if (WGD.el)
return;
var st = document.createElement("style");
st.id = "wgd-css";
st.textContent = WGD_CSS;
document.head.appendChild(st);
var sh = document.createElement("div");
sh.id = "wgd-shade";
sh.style.display = "none";
document.body.appendChild(sh);
WGD.shade = sh;
var ring = document.createElement("div");
ring.id = "wgd-ring";
document.body.appendChild(ring);
WGD.ring = ring;
var el = document.createElement("div");
el.id = "wgd-box";
el.setAttribute("role", "dialog");
el.setAttribute("aria-label", "How to play SomnuMatrix");
el.style.display = "none";
["keydown", "keyup", "keypress"].forEach(function (k) { el.addEventListener(k, function (e) { e.stopPropagation(); }); });
["pointerdown", "mousedown", "touchstart", "wheel"].forEach(function (k) { el.addEventListener(k, function (e) { e.stopPropagation(); }, { passive: true }); });
el.addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-wgd]") : null;
if (!t)
return;
var a = t.getAttribute("data-wgd");
if (a === "next")
wgdGo(WGD.i + 1);
else if (a === "back")
wgdGo(WGD.i - 1);
else if (a === "skip")
wgdFinish(true);
else if (a.indexOf("act") === 0) {
var s = WGD.steps[WGD.i], x = s && s.acts && s.acts[+a.slice(3)];
if (x)
try {
x[1]();
}
catch (err) {
if (window.console)
console.warn("[welcome-guide]", err);
}
}
});
document.body.appendChild(el);
WGD.el = el;
var arrow = document.createElement("div");
arrow.className = "wgd-arrow";
arrow.style.display = "none";
el.appendChild(arrow);
WGD.arrow = arrow;
var pill = document.createElement("button");
pill.id = "wgd-pill";
pill.type = "button";
pill.addEventListener("click", function () { wgdBack(); });
document.body.appendChild(pill);
WGD.pill = pill;
window.addEventListener("keydown", function (e) {
if (!WGD.open || WGD.min)
return;
var tg = e.target, typing = tg && (tg.tagName === "INPUT" || tg.tagName === "TEXTAREA" || tg.isContentEditable);
if (e.key === "Escape") {
e.stopImmediatePropagation();
e.preventDefault();
wgdFinish(true);
}
else if (!typing && e.key === "ArrowRight") {
e.stopImmediatePropagation();
wgdGo(WGD.i + 1);
}
else if (!typing && e.key === "ArrowLeft") {
e.stopImmediatePropagation();
wgdGo(WGD.i - 1);
}
}, true);
addEventListener("resize", function () { if (WGD.open && !WGD.min)
wgdPlace(); });
},
function (at) {
wgdBuild();
wgdNoteClose();
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
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
WGD.open = true;
WGD.min = false;
WGD.started = true;
WGD.steps = wgdSteps();
wgdGo(typeof at === "number" ? at : 0);
wgdWatch();
},
function (i) {
WGD.steps = wgdSteps();
if (i < 0)
i = 0;
if (i >= WGD.steps.length) {
wgdFinish();
return;
}
WGD.i = i;
wgdWrite({ at: i });
var s = WGD.steps[i], n = WGD.steps.length, el = WGD.el;
var dots = "";
for (var k = 0; k < n; k++)
dots += "<i" + (k === i ? " class='on'" : "") + "></i>";
var acts = (s.acts || []).map(function (a, j) { return "<button type='button' class='wgd-act' data-wgd='act" + j + "'>" + wgdEsc(a[0]) + "</button>"; }).join("");
el.innerHTML =
"<div class='wgd-top'><div class='wgd-pic'>" + (WGD_PIC[s.pic] || "") + "</div><div><div class='wgd-n'>" + (i === 0 ? "How to play" : i === n - 1 ? "All set" : "Step " + i + " of " + (n - 2)) + "</div><h3>" + wgdEsc(s.title) + "</h3></div></div>" +
"<div class='wgd-body'>" + s.body + "</div>" +
(acts ? "<div class='wgd-acts'>" + acts + "</div>" : "") +
"<div class='wgd-row'>" +
(i > 0 ? "<button type='button' data-wgd='back'>‹ Back</button>" : "<button type='button' class='wgd-skip' data-wgd='skip'>Skip the guide</button>") +
"<div class='wgd-dots' aria-hidden='true'>" + dots + "</div>" +
(i < n - 1 ? "<button type='button' class='wgd-go' data-wgd='next'>" + (i === 0 ? "Show me" : "Next ›") + "</button>" : "<button type='button' class='wgd-go' data-wgd='skip'>Close</button>") +
"</div>" +
(i > 0 && i < n - 1 ? "<div style='text-align:center;margin-top:4px'><button type='button' class='wgd-skip' data-wgd='skip'>Skip the guide</button></div>" : "");
el.appendChild(WGD.arrow);
el.style.display = "block";
el.scrollTop = 0;
requestAnimationFrame(function () { el.classList.add("on"); });
wgdPlace();
var f = el.querySelector(".wgd-go");
if (f && wgdDevice() === "pc")
try {
f.focus({ preventScroll: true });
}
catch (e) { }
},
function () {
var s = WGD.steps[WGD.i];
if (!s || !s.target)
return null;
var id = typeof s.target === "function" ? s.target() : s.target;
var t = id && document.getElementById(id);
if (!t)
return null;
var r = t.getBoundingClientRect();
if (r.width < 4 || r.height < 4 || r.bottom < 0 || r.top > innerHeight || r.right < 0 || r.left > innerWidth)
return null;
var cs = getComputedStyle(t);
if (cs.visibility === "hidden" || cs.display === "none")
return null;
return r;
},
function () {
var el = WGD.el, ring = WGD.ring, ar = WGD.arrow;
if (!el)
return;
var r = wgdTarget(), W = innerWidth, H = innerHeight, bw = el.offsetWidth, bh = el.offsetHeight, m = 12;
if (!r) {
ring.style.display = "none";
ar.style.display = "none";
WGD.shade.style.display = "";
el.style.left = Math.max(m, (W - bw) / 2) + "px";
el.style.top = Math.max(m, (H - bh) / 2) + "px";
return;
}
var p = 6;
ring.style.display = "block";
WGD.shade.style.display = "none";
ring.style.left = (r.left - p) + "px";
ring.style.top = (r.top - p) + "px";
ring.style.width = (r.width + 2 * p) + "px";
ring.style.height = (r.height + 2 * p) + "px";
var cx = r.left + r.width / 2, left = Math.min(Math.max(m, cx - bw / 2), W - bw - m), top, above = r.top > H - r.bottom;
if (above) {
top = r.top - p - 22 - bh;
if (top < m) {
top = m;
}
}
else {
top = r.bottom + p + 22;
if (top + bh > H - m)
top = Math.max(m, H - m - bh);
}
el.style.left = left + "px";
el.style.top = top + "px";
var gap = above ? (r.top - p) - (top + bh) : top - (r.bottom + p);
if (gap < 10) {
ar.style.display = "none";
return;
}
var ax = Math.min(Math.max(left + 18, cx - 14), left + bw - 46);
ar.style.display = "block";
ar.style.left = ax + "px";
if (above) {
ar.style.top = (top + bh) + "px";
ar.style.borderTopColor = "#E8C66A";
ar.style.borderBottomColor = "transparent";
ar.style.borderBottomWidth = "0";
ar.style.borderTopWidth = "16px";
}
else {
ar.style.top = (top - 16) + "px";
ar.style.borderBottomColor = "#E8C66A";
ar.style.borderTopColor = "transparent";
ar.style.borderTopWidth = "0";
ar.style.borderBottomWidth = "16px";
}
},
function () {
var p = document.getElementById("panel");
if (p && p.classList.contains("open"))
return true;
if (document.getElementById("buy-panel"))
return true;
if (typeof GI !== "undefined" && GI && GI.open)
return true;
if (typeof BKP !== "undefined" && BKP && BKP.open)
return true;
if (typeof VRM !== "undefined" && VRM && (VRM.xr || VRM.card))
return true;
var tg = document.getElementById("tg-splash");
if (tg && !tg.classList.contains("tg-out"))
return true;
return false;
},
function (auto) {
WGD.min = true;
WGD.autoMin = !!auto;
WGD.sawBlock = false;
WGD.awayAt = Date.now();
if (WGD.el) {
WGD.el.classList.remove("on");
WGD.el.style.display = "none";
}
if (WGD.ring)
WGD.ring.style.display = "none";
if (WGD.shade)
WGD.shade.style.display = "none";
if (WGD.pill) {
WGD.pill.textContent = "📖 Back to the guide" + (WGD.i > 0 ? " (step " + WGD.i + ")" : "");
WGD.pill.style.display = "block";
}
},
function (skipped) {
WGD.open = false;
WGD.min = false;
wgdWrite({ done: 1, skipped: !!skipped, at: 0, when: Date.now() });
if (WGD.el) {
WGD.el.classList.remove("on");
WGD.el.style.display = "none";
}
if (WGD.ring)
WGD.ring.style.display = "none";
if (WGD.shade)
WGD.shade.style.display = "none";
if (WGD.pill)
WGD.pill.style.display = "none";
if (skipped && typeof setStatus === "function")
setStatus("The guide is in <b>☰ Menu › 📖 How to play</b> whenever you want it.");
},
function () {
if (WGD.watch)
return;
WGD.watch = setInterval(function () {
try {
if (!WGD.open)
return;
if (typeof PF_TIP !== "undefined" && PF_TIP) {
PF_TIP.gap = Math.max(PF_TIP.gap || 0, Date.now() + 3000);
if (PF_TIP.cur && !WGD.min && typeof pfTipClose === "function")
pfTipClose();
}
var b = wgdBlocked();
if (!WGD.min) {
if (b)
wgdAway(true);
else
wgdPlace();
return;
}
if (b)
WGD.sawBlock = true;
else if (WGD.sawBlock && Date.now() - WGD.awayAt > 600)
wgdBack();
}
catch (e) {
if (window.console && !WGD.warned) {
WGD.warned = 1;
console.warn("[welcome-guide]", e);
}
}
}, 400);
},
function () {
if (document.getElementById("wgd-note"))
return;
wgdBuild();
var d = document.createElement("div");
d.id = "wgd-note";
d.setAttribute("role", "status");
d.innerHTML = "<span><b style='color:#F2D27A'>New:</b> a step-by-step guide to signing up and playing. It is in <b>☰ Menu › 📖 How to play</b>.</span>" +
"<button type='button' data-a='go'>Show me</button><button type='button' class='b2' data-a='no'>Not now</button>";
d.addEventListener("click", function (e) {
var a = e.target && e.target.getAttribute && e.target.getAttribute("data-a");
if (!a)
return;
wgdWrite({ noted: 1 });
d.remove();
if (a === "go")
wgdOpen(0);
});
document.body.appendChild(d);
setTimeout(function () { if (d.parentNode) {
wgdWrite({ noted: 1 });
d.remove();
} }, 25000);
}
];
});
