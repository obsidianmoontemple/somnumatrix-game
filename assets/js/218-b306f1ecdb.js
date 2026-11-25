/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var CWX = { srv: null, at: 0, busy: false, last: null, shown: null, warned: 0, greeted: null };
var CWX_NAME = { clear: "Clear skies", rain: "Rain", storm: "A storm", snow: "Snow", fog: "Fog", wind: "High wind", heat: "A heat wave" };
var CWX_ICON = { clear: "☀️", rain: "🌧️", storm: "⛈️", snow: "❄️", fog: "🌫️", wind: "🌬️", heat: "🔥" };
var CWX_WHAT = { clear: "", rain: "Umbrella weather.", storm: "The Wayfarer stays in harbour at the Last Pier until it passes.",
snow: "The roads are slow and so is walking: cars at about two thirds of their speed.", fog: "You will not see far.", wind: "Hold on to your hat.",
heat: "Thirst drops twice as fast. Drink often." };
function cwxKindAt(ms) {
var b = Math.floor(ms / 1000 / 10800), r = (b * b * 7919 + b * 104729 + 1299709) % 1000, m = new Date(b * 10800 * 1000).getUTCMonth() + 1;
if (m === 12 || m <= 2)
return r < 350 ? "clear" : r < 500 ? "fog" : r < 800 ? "snow" : r < 900 ? "storm" : "wind";
if (m <= 5)
return r < 450 ? "clear" : r < 750 ? "rain" : r < 850 ? "storm" : r < 950 ? "fog" : "wind";
if (m <= 8)
return r < 450 ? "clear" : r < 750 ? "heat" : r < 850 ? "storm" : r < 950 ? "rain" : "wind";
return r < 400 ? "clear" : r < 650 ? "rain" : r < 800 ? "fog" : r < 900 ? "wind" : "storm";
}
function cwxNow() {
var S = CWX.srv;
if (S && S.set && S.set.kind && new Date(S.set.until).getTime() > Date.now())
return S.set.kind;
return cwxKindAt(Date.now());
}
function cwxForecast() {
var b = Math.floor(Date.now() / 1000 / 10800), out = [];
for (var i = 1; i <= 4; i++) {
var t = (b + i) * 10800 * 1000;
out.push({ at: t, kind: cwxKindAt(t) });
}
return out;
}
function cwxHere() { return typeof careInCity === "function" && careInCity(); }
function cwxLoad(force) {
if (CWX.busy || (!force && Date.now() - CWX.at < 300000) || typeof cityRpc !== "function")
return;
CWX.busy = true;
CWX.at = Date.now();
cityRpc("city_weather", {}).then(function (o) { if (o && o.ok)
CWX.srv = o; }).catch(function () { }).then(function () { CWX.busy = false; });
}
function cwxPace() { return cwxHere() && cwxNow() === "snow" ? 0.8 : 1; }
function cwxRoad() { var k = cwxHere() ? cwxNow() : "clear"; return k === "snow" ? 0.65 : k === "storm" ? 0.85 : 1; }
(function () {
if (typeof wxApply !== "function")
return;
var wa = wxApply;
wxApply = function () {
if (!cwxHere()) {
cwxDensity(false);
return wa.apply(this, arguments);
}
var a = wxInCity, b = wxState, k = cwxNow();
wxInCity = function () { return false; };
wxState = function () { return { kind: k, strength: 0.85 }; };
try {
return wa.apply(this, arguments);
}
finally {
wxInCity = a;
wxState = b;
CWX.shown = k;
cwxDensity(true);
}
};
})();
function cwxDensity(city) {
try {
if (typeof WX === "undefined" || !WX.sys || !WX.sys.rain)
return;
var lite = city && typeof LITE !== "undefined" && !!LITE;
[["rain", 4200 * 2], ["snow", 2200], ["hail", 1400], ["dust", 2600]].forEach(function (q) { var s = WX.sys[q[0]]; if (s)
s.geometry.setDrawRange(0, lite ? Math.floor(q[1] / 2) : q[1]); });
}
catch (e) { }
}
(function () {
if (typeof fogForLight !== "function")
return;
var ff = fogForLight;
fogForLight = function () {
var r = ff.apply(this, arguments);
try {
if (cwxHere() && scene && scene.fog) {
var k = CWX.shown || "clear";
var m = { rain: 1.25, storm: 1.5, snow: 1.4, fog: 2.2, wind: 1.05, heat: 1.1 }[k];
if (m)
scene.fog.density *= m;
}
}
catch (e) { }
return r;
};
})();
(function () {
if (typeof vehSpec !== "function")
return;
var vs = vehSpec;
vehSpec = function () {
var s = vs.apply(this, arguments);
if (!s)
return s;
var f = cwxRoad();
if (f < 1) {
s.vmax *= f;
s.acc *= Math.max(0.6, f);
}
return s;
};
})();
(function () {
if (typeof worldGo !== "function")
return;
var wg = worldGo;
worldGo = function (key) {
if (key === "sea" && cwxHere() && cwxNow() === "storm") {
if (typeof setStatus === "function")
setStatus("⛈️ <b>The Wayfarer stays in harbour.</b> No ship leaves the Last Pier in a storm. It clears " + cwxClears() + ".");
return;
}
return wg.apply(this, arguments);
};
})();
function cwxClears() { return __ZC(218, 0, this, arguments, new.target); }
var CWX_HOL = [
{ m: 1, d: 1, icon: "🌅", name: "New Dawn Day", line: "The first light of the year, greeted from the Tower Plaza." },
{ m: 2, d: 14, icon: "💌", name: "Hearts' Night", line: "Letters, lanterns and a dance for those who love someone." },
{ m: 3, d: 20, icon: "🌸", name: "First Bloom", line: "Spring comes to the gardens; the city dresses in blossom." },
{ m: 6, d: 21, icon: "🌞", name: "Longest Light", line: "The longest day of the year, and the shortest night." },
{ m: 9, d: 22, icon: "🌾", name: "The Harvest Moon Fair", line: "The Harvest Ring brings in the year's crops; the city dresses for the harvest." },
{ m: 10, d: 31, icon: "🎃", name: "Lantern Night", line: "Carved lanterns on every step, and costumes in every street." },
{ m: 12, d: 21, icon: "❄️", name: "Midwinter Night", line: "The longest night: fires lit all over the city to call the sun back." },
{ m: 12, d: 25, icon: "🎁", name: "Gift Night", line: "Gifts left by the fireplace, and the North Pole's sleigh over the city." },
{ m: 12, d: 31, icon: "🎆", name: "Year's End", line: "The last night of the year: the whole city on the Tower Plaza to see it out." }
];
function cwxHolidays(n) {
var now = new Date(), y = now.getFullYear(), today = new Date(y, now.getMonth(), now.getDate()).getTime(), out = [];
CWX_HOL.forEach(function (h) {
var t = new Date(y, h.m - 1, h.d).getTime();
if (t < today)
t = new Date(y + 1, h.m - 1, h.d).getTime();
out.push({ h: h, t: t, days: Math.round((t - today) / 86400000) });
});
out.sort(function (a, b) { return a.t - b.t; });
return out.slice(0, n || 3);
}
function cwxGreet() { return __ZC(218, 1, this, arguments, new.target); }
(function () {
if (typeof tnRows !== "function")
return;
var tr = tnRows;
tnRows = function () {
var rows = tr.apply(this, arguments);
try {
var k = cwxNow(), f = cwxForecast(), next = null;
for (var i = 0; i < f.length; i++)
if (f[i].kind !== k) {
next = f[i];
break;
}
rows.unshift([CWX_ICON[k] || "☀️", "<b>" + CWX_NAME[k] + " over Somnucor</b>" + (CWX_WHAT[k] ? " · " + CWX_WHAT[k] : "") + (next ? " · " + CWX_NAME[next.kind].toLowerCase() + " " + tnWhen(new Date(next.at).toISOString()) : ""), k !== "clear"]);
cwxHolidays(2).forEach(function (h, j) {
if (j && h.days > 45)
return;
rows.push([h.h.icon, "<b>" + esc(h.h.name) + "</b> · " + (h.days === 0 ? "today! " : h.days === 1 ? "tomorrow · " : "in " + h.days + " days · ") + esc(h.h.line), h.days === 0]);
});
}
catch (e) { }
return rows;
};
})();
if (typeof tnWeather === "function") {
(function () { var tw = tnWeather; tnWeather = function () { if (cwxHere() || (typeof inCityNow === "function" && inCityNow()))
return CWX_NAME[cwxNow()] || "Clear skies"; return tw.apply(this, arguments); }; })();
}
setInterval(function () {
try {
var here = cwxHere(), k = here ? cwxNow() : null;
if (here && k !== CWX.shown && typeof wxApply === "function") {
var was = CWX.shown;
wxApply();
if (was && k !== was && typeof setStatus === "function")
setStatus((CWX_ICON[k] || "") + " <b>" + CWX_NAME[k] + "</b> over Somnucor." + (CWX_WHAT[k] ? " " + CWX_WHAT[k] : ""));
}
if (!here && CWX.shown) {
CWX.shown = null;
}
if (here) {
cwxLoad(false);
cwxGreet();
}
}
catch (e) {
if (!CWX.warned && window.console) {
CWX.warned = 1;
console.warn("[city-weather]", e);
}
}
}, 2000);
