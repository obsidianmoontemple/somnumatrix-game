/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(210, function () {
"use strict";
return [
function () {
var N = (TN.d && TN.d.news) || [];
if (!N.length)
return;
var top = N[0], key = tnSeenKey();
if (TN.seen === null) {
try {
TN.seen = +(localStorage.getItem(key) || 0);
}
catch (e) {
TN.seen = 0;
}
if (!TN.seen) {
TN.seen = +top.id;
try {
localStorage.setItem(key, String(TN.seen));
}
catch (e) { }
return;
}
}
var fresh = N.filter(function (a) { return +a.id > TN.seen; });
if (!fresh.length)
return;
TN.seen = Math.max.apply(null, fresh.map(function (a) { return +a.id; }));
try {
localStorage.setItem(key, String(TN.seen));
}
catch (e) { }
if (typeof inCityNow === "function" && inCityNow())
tnBanner(fresh[0]);
},
function (a) {
var b = TN.banner;
if (!b) {
b = document.createElement("div");
b.id = "tn-banner";
b.style.cssText = "position:fixed;left:50%;top:calc(" + (innerWidth < 700 ? "104px" : "54px") + " + env(safe-area-inset-top,0px));transform:translateX(-50%);z-index:46;max-width:min(560px,calc(100vw - 32px));" +
"background:rgba(26,20,14,.94);border:1px solid #C9A868;border-radius:6px;padding:8px 14px;font:13px var(--sans,system-ui);color:#F0E8D8;line-height:1.45;" +
"opacity:0;transition:opacity .9s ease;pointer-events:auto;cursor:pointer;box-shadow:0 6px 24px rgba(0,0,0,.45)";
b.onclick = function () { b.style.opacity = "0"; TN.open = true; tnPaint(); tnLoad(); };
document.body.appendChild(b);
TN.banner = b;
}
b.innerHTML = '<span style="color:#E0B060;font-weight:600;letter-spacing:.06em">📰 ' + (a.breaking ? "BREAKING" : "THE GAZETTE") + '</span> · <b>' + esc(a.title) + '</b>' +
(a.body ? '<div style="opacity:.8;font-size:12px;margin-top:2px">' + esc(String(a.body).slice(0, 160)) + '</div>' : '');
b.style.display = "block";
requestAnimationFrame(function () { b.style.opacity = "1"; });
clearTimeout(TN.bannerT);
TN.bannerT = setTimeout(function () { b.style.opacity = "0"; setTimeout(function () { if (b.style.opacity === "0")
b.style.display = "none"; }, 1000); }, 9000);
},
function () {
var D = TN.d || {}, h = "", hr = tnHour();
if (!(typeof signedIn === "function" && signedIn()))
return '<div style="color:var(--dim);line-height:1.5">Sign in to see what is on in Somnucor tonight.</div>';
if (!D.ok && TN.busy)
return '<div style="color:var(--dim)">Asking the city…</div>';
h += '<div style="color:var(--dim);margin:4px 0 8px">City time <b style="color:#F0E8D8">' + tnClock(hr) + '</b>' + (tnWeather() ? ' · ' + esc(tnWeather()) : '') +
(typeof D.about === "number" ? ' · <b style="color:#F0E8D8">' + D.about + '</b> dreamer' + (D.about === 1 ? '' : 's') + ' about' : '') +
(typeof D.at_work === "number" ? ' · ' + D.at_work + ' at work' : '') + '</div>';
var R = tnRows(), live = R.filter(function (r) { return r[2]; }), later = R.filter(function (r) { return !r[2]; });
var row = function (r) { return '<div style="padding:5px 0;border-bottom:1px solid rgba(255,255,255,.06);line-height:1.5">' + r[0] + ' ' + r[1] + '</div>'; };
h += '<div style="margin:8px 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#C9A868">On now</div>' + (live.length ? live.map(row).join("") : '<div style="color:var(--dim)">Nothing special: the city keeps its hours.</div>');
if (later.length)
h += '<div style="margin:12px 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#C9A868">Coming up, and the city\'s news</div>' + later.map(row).join("");
var N = D.news || [];
h += '<div style="margin:12px 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#C9A868">The latest from the Gazette</div>';
if (!N.length)
h += '<div style="color:var(--dim)">All quiet: nothing in the last two days.</div>';
N.forEach(function (a) {
h += '<div style="padding:5px 0;border-bottom:1px solid rgba(255,255,255,.06);line-height:1.45">' + (a.breaking ? '<span style="color:#E0B060;font-size:11px;letter-spacing:.06em">BREAKING</span> ' : '') + '<b>' + esc(a.title) + '</b> <span style="color:var(--dim);font-size:11.5px">' + tnAgo(a.at) + '</span>' +
(a.body ? '<div style="color:#C9BEA8;font-size:12px">' + esc(String(a.body).slice(0, 240)) + '</div>' : '') + '</div>';
});
h += '<div style="margin-top:10px;color:var(--dim);font-size:12px">The town crier calls the news on the Tower Plaza. The 🎪 Events book has every parade and festival; the Gazette has the rest.</div>';
return h;
},
function () {
var C = TN.crier;
if (!C)
return;
var N = (TN.d && TN.d.news) || [], pick = null;
for (var i = 0; i < N.length; i++) {
if (!TN.heard[N[i].id]) {
pick = N[i];
break;
}
}
var text;
if (pick) {
TN.heard[pick.id] = 1;
text = "Hear ye! " + String(pick.title).replace(/^[A-Z ]+:\s*/, function (m) { return m.charAt(0) + m.slice(1).toLowerCase(); });
}
else {
var R = tnRows().filter(function (r) { return r[2]; }), r = R[Math.floor(Math.random() * Math.max(1, R.length))];
text = r ? "Hear ye! " + String(r[1]).replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#39;/g, "'") : "Hear ye! All is well in Somnucor!";
}
if (text.length > 120)
text = text.slice(0, 117) + "…";
if (C.sp.material.map)
C.sp.material.map.dispose();
C.sp.material.map = tnBubbleTex(text);
C.sp.material.needsUpdate = true;
C.sp.visible = true;
C.line = text;
C.ring = 1.2;
if (typeof playTone === "function") {
playTone(1180, 0.12);
setTimeout(function () { playTone(1180, 0.12); }, 260);
}
if (typeof setStatus === "function")
setStatus("📣 <b>The town crier:</b> “" + esc(text) + "”");
try {
if (typeof audio !== "undefined" && audio.on && window.speechSynthesis && typeof SpeechSynthesisUtterance !== "undefined" && !(typeof fvoBusy === "function" && fvoBusy())) {
var u = new SpeechSynthesisUtterance(text.replace("…", ""));
u.rate = 0.95;
u.pitch = 0.9;
u.volume = 0.9;
window.speechSynthesis.cancel();
window.speechSynthesis.speak(u);
}
}
catch (e) { }
}
];
});
