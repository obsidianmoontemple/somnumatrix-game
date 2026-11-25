/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(430, function () {
"use strict";
return [
function (text) {
var el = document.getElementById("eza-cap");
if (!el) {
el = document.createElement("div");
el.id = "eza-cap";
el.setAttribute("aria-live", "polite");
document.body.appendChild(el);
}
el.textContent = String(text || "").slice(0, 400);
el.style.display = text ? "block" : "none";
clearTimeout(EZA.capT);
EZA.capT = setTimeout(ezaCapHide, Math.min(20000, 2500 + String(text || "").length * 70));
},
function () {
var o = ezaCfg(), z = typeof ytmZone === "function" ? ytmZone() : "";
function sel(id, v, opts) { return "<select id='" + id + "' style='width:100%'>" + opts.map(function (p) { return "<option value='" + p[0] + "'" + (String(v) === p[0] ? " selected" : "") + ">" + p[1] + "</option>"; }).join("") + "</select>"; }
return "<h3 style='font-weight:500;margin:18px 0 6px;color:var(--bone)'>Easier to see and hear</h3>" +
"<label for='eza-text'>Text size</label>" + sel("eza-text", o.text, [["1", "Normal"], ["2", "Large"], ["3", "Larger"]]) +
"<label for='eza-cap-on' style='margin-top:10px'>Words for voices</label>" + sel("eza-cap-on", o.cap ? "1" : "0", [["0", "Off"], ["1", "On: show what is said, as it is said"]]) +
"<label for='eza-calm-on' style='margin-top:10px'>Calm screen</label>" + sel("eza-calm-on", o.calm ? "1" : "0", [["0", "Off"], ["1", "On: no screen shake, menus appear still"]]) +
"<label for='eza-cb' style='margin-top:10px'>Colour help</label>" + sel("eza-cb", o.cb, [["", "Off"], ["deu", "Red-green (green weak)"], ["pro", "Red-green (red weak)"], ["tri", "Blue-yellow"]]) +
"<label for='eza-time' style='margin-top:10px'>Event times</label>" + sel("eza-time", o.timeMine ? "1" : "0", [["1", "My own time" + (z ? " (" + z + ")" : "")], ["0", "The Keeper's Arizona time"]]);
},
function () {
var have = document.getElementById("eza-set");
var anchor = document.getElementById("advanced");
if (!anchor || !anchor.parentNode)
return;
if (!have) {
have = document.createElement("div");
have.id = "eza-set";
have.style.cssText = "margin:12px 0";
anchor.parentNode.insertBefore(have, anchor);
}
have.innerHTML = ezaSetHtml();
var map = { "eza-text": ["ezaText", function (v) { return v; }], "eza-cap-on": ["ezaCap", function (v) { return v === "1"; }], "eza-calm-on": ["ezaCalm", function (v) { return v === "1"; }],
"eza-cb": ["ezaCb", function (v) { return v; }], "eza-time": ["timeMine", function (v) { return v === "1"; }] };
Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s)
s.onchange = function () { ezaSave(map[id][0], map[id][1](s.value)); if (id === "eza-cap-on" && s.value === "1")
ezaCapShow("Words for voices are on."); }; });
},
function () {
var d = acvData(), fresh = [];
ACV_LIST.forEach(function (a) { if (!d.got[a[0]] && acvCount(a[5]) >= a[4]) {
d.got[a[0]] = Date.now();
fresh.push(a);
ACV.dirty["b:" + a[0]] = 1;
} });
acvStore();
fresh.slice(0, 2).forEach(function (a, i) { setTimeout(function () { acvToast(a); }, i * 2600); });
if (ACV.open)
acvPaint();
acvSyncSoon();
},
function (k) {
ACV.lastWorld = k;
(function () {
try {
var d = acvData();
if (d.worlds[k] && d.worlds[k].name && !d.worlds[k].guess)
return;
var st = document.getElementById("status"), b = st && st.querySelector("b"), nm = b ? b.textContent.replace(/[.!:]+\s*$/, "").trim() : "";
var guess = false;
if (!nm || nm.length > 48 || /^(loading|one moment)/i.test(nm)) {
nm = k.charAt(0).toUpperCase() + k.slice(1);
guess = true;
}
var had = !!d.worlds[k];
d.worlds[k] = { name: nm, guess: guess || undefined, at: (d.worlds[k] && d.worlds[k].at) || Date.now() };
ACV.dirty["w:" + k] = 1;
if (!had)
acvCheck();
else {
acvStore();
acvSyncSoon();
}
}
catch (e) { }
})();
},
function (s) {
if (!s || typeof s !== "object")
return;
var d = acvData(), ch = false;
Object.keys(s.n || {}).forEach(function (k) { var v = +s.n[k] || 0; if (v > (d.n[k] || 0)) {
d.n[k] = v;
ch = true;
} });
Object.keys(s.got || {}).forEach(function (k) { if (!d.got[k]) {
d.got[k] = s.got[k];
ch = true;
} });
Object.keys(s.worlds || {}).forEach(function (k) { if (!d.worlds[k]) {
d.worlds[k] = s.worlds[k];
ch = true;
} });
Object.keys(s.stories || {}).forEach(function (k) { if (!d.stories[k]) {
d.stories[k] = s.stories[k];
ch = true;
} });
if ((+s.people || 0) > Object.keys(d.people).length) {
d.peopleElsewhere = (+s.people) - Object.keys(d.people).length;
ch = true;
}
if (ch) {
acvStore();
if (ACV.open)
acvPaint();
}
},
function () {
var d = acvData(), got = ACV_LIST.filter(function (a) { return d.got[a[0]]; }).length, h = "";
function tab(k, t) { return "<button class='btn' data-acv='tab' data-t='" + k + "' style='padding:3px 10px;" + (ACV.tab === k ? "border-color:#C9A85A;color:#F2E6C4" : "opacity:.75") + "'>" + t + "</button>"; }
h += "<div style='display:flex;align-items:center;justify-content:space-between;gap:8px'><div style='font:600 17px var(--serif,Georgia);color:#F2E6C4'>🏆 Achievements</div><button class='btn' data-acv='close'>Close</button></div>";
h += "<div style='opacity:.75;font-size:12px;margin:2px 0 8px'>" + got + " of " + ACV_LIST.length + " earned. Badges only: no gold changes hands.</div>";
h += "<div style='display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px'>" + tab("badges", "Achievements") + tab("worlds", "Worlds") + tab("people", "People and stories") + "</div>";
if (ACV.tab === "badges") {
ACV_LIST.forEach(function (a) {
var on = !!d.got[a[0]], c = Math.min(acvCount(a[5]), a[4]);
h += "<div style='display:flex;gap:10px;align-items:center;padding:6px 4px;border-top:1px solid rgba(255,255,255,.07);" + (on ? "" : "opacity:.55") + "'>" +
"<div style='font-size:22px;width:30px;text-align:center;" + (on ? "" : "filter:grayscale(1)") + "'>" + a[1] + "</div>" +
"<div style='flex:1'><div style='font-weight:600;color:" + (on ? "#F2E6C4" : "inherit") + "'>" + acvEsc(a[2]) + "</div><div style='font-size:12px;opacity:.8'>" + acvEsc(a[3]) + "</div></div>" +
"<div style='font-size:12px;white-space:nowrap'>" + (on ? "✓ " + new Date(d.got[a[0]]).toLocaleDateString() : (a[4] > 1 ? c + " / " + a[4] : "")) + "</div></div>";
});
}
else if (ACV.tab === "worlds") {
var ks = Object.keys(d.worlds).sort(function (a, b) { return (d.worlds[a].at || 0) - (d.worlds[b].at || 0); });
var all = typeof WORLDS !== "undefined" ? Object.keys(WORLDS).length : 0, left = Math.max(0, all - ks.length);
h += "<div style='font-size:12.5px;margin-bottom:6px'>You have walked in <b>" + ks.length + "</b> world" + (ks.length === 1 ? "" : "s") + (left ? "; <b>" + left + "</b> more are out there to find." : ".") + "</div>";
if (!ks.length)
h += "<div style='opacity:.7;font-size:12.5px'>Go through a door in Somnucor, the Hall of Doors or your dream to start the list.</div>";
ks.forEach(function (k) { h += "<div style='padding:5px 4px;border-top:1px solid rgba(255,255,255,.07)'>🌍 " + acvEsc(d.worlds[k].name || k) + "<span style='float:right;font-size:11.5px;opacity:.7'>" + new Date(d.worlds[k].at || Date.now()).toLocaleDateString() + "</span></div>"; });
}
else {
var np = Object.keys(d.people).length + (d.peopleElsewhere || 0);
h += "<div style='font-size:12.5px;margin-bottom:8px'>You have talked with <b>" + np + "</b> of the city's people.</div>";
h += "<div style='font-weight:600;margin:10px 0 4px'>Stories finished</div>";
Object.keys(ACV_STORY).forEach(function (k) {
var on = !!d.stories[k];
h += "<div style='padding:5px 4px;border-top:1px solid rgba(255,255,255,.07);" + (on ? "" : "opacity:.5") + "'>" + (on ? "📜 " : "○ ") + acvEsc(ACV_STORY[k]) + (on ? "<span style='float:right;font-size:11.5px;opacity:.7'>" + new Date(d.stories[k]).toLocaleDateString() + "</span>" : "") + "</div>";
});
h += "<div style='font-weight:600;margin:12px 0 4px'>Counts</div><div style='font-size:12.5px;line-height:1.7'>" +
"Dreams written: " + acvCount("dream") + "<br>Shifts worked: " + acvCount("clock_in") + "<br>Lessons passed: " + acvCount("school_pass") + "<br>Photos taken: " + acvCount("photo") + "<br>Phone calls: " + acvCount("call") + "</div>";
}
if (ACV.noServer)
h += "<div style='opacity:.6;font-size:11px;margin-top:10px'>Kept on this device for now.</div>";
return h;
},
function () {
var el = document.getElementById("acv-box");
if (!ACV.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "acv-box";
el.style.cssText = "position:fixed;z-index:53;left:50%;top:50%;transform:translate(-50%,-50%);width:min(460px,calc(100vw - 32px));max-height:min(82vh,700px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(16,18,30,.97),rgba(8,9,14,.98));border:1px solid #C9A85A;border-radius:8px;padding:12px 14px 14px;color:var(--bone,#C9BEA8);" +
"font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-acv]") : null;
if (!t)
return;
var a = t.getAttribute("data-acv");
if (a === "close") {
ACV.open = false;
acvPaint();
}
else if (a === "tab") {
ACV.tab = t.getAttribute("data-t");
acvPaint();
}
});
document.body.appendChild(el);
}
el.innerHTML = acvHtml();
el.style.display = "block";
}
];
});
