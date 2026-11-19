/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var WX = { kind: "clear", strength: 1, quakeUntil: 0, flashAt: 0, flashUntil: 0, group: null, sys: {}, overlay: null, flash: null, last: 0 };
var WX_KINDS = ["clear", "rain", "storm", "snow", "hail", "fog", "wind", "sandstorm", "heat", "ash", "meteors"];
var WX_WORDS = [
["storm", /\b(thunder ?storms?|thunder(ing|ed)?|lightning (storm|struck|flashed|bolts?)|storm(y|ing|s)?|hurricanes?|typhoons?|cyclones?|monsoons?|tempests?|gales?)\b/],
["rain", /\b(rain(ing|ed|y|s|fall|drops?)?|drizzl\w*|downpour|pouring|showers)\b/],
["snow", /\b(snow(ing|ed|y|fall|flakes?|storm)?|blizzards?|sleet|flurr\w*|white ?out|avalanche)\b/],
["hail", /\b(hail(ing|ed|stones?)?)\b/],
["fog", /\b(fog(gy)?|mist(y)?|haz(e|y)|smog|murk)\b/],
["sandstorm", /\b(sand ?storms?|dust ?storms?|haboob)\b/],
["wind", /\b(wind(y|s)?|gusts?|gust(ing|y)|blustery)\b/],
["heat", /\b(heat ?waves?|scorching|sweltering|blazing (sun|heat)|boiling hot|drought)\b/],
["ash", /\b(ash ?fall|falling ash|ash (rained|fell|everywhere)|(volcano|volcanoes) erupt\w*|eruptions?|erupted)\b/],
["meteors", /\b(meteor (shower|storm)s?|shooting stars|stars? (were )?falling|asteroids? (fell|falling|hit))\b/],
["clear", /\b(sunny|clear (sky|skies|day|night)|blue skies?|the rain stopped|the storm (passed|ended))\b/]
];
var WX_EVENTS = [
[/\b(earth ?quakes?|quakes?|tremors?|the ground (shook|was shaking|trembled|split|cracked)|shaking ground)\b/, "a fissure. rubble. rubble.", { quake: 1 }],
[/\b(tsunamis?|tidal waves?|giant waves?|wall of water)\b/, "a tidal wave. water.", {}],
[/\b(hurricanes?|typhoons?|cyclones?)\b/, "a tornado. rubble.", { wx: "storm" }],
[/\b(tornado(es)?|twisters?)\b/, "", { wx: "wind" }],
[/\b(flood(s|ed|ing)?|flood ?waters?|deluge)\b/, "", { wx: "rain" }],
[/\b(wild ?fires?|forest fires?|bush ?fires?|the (forest|trees|town|city) (was|were) (on fire|burning))\b/, "a burning forest. a column of smoke.", { wx: "heat" }],
[/\b((volcano|volcanoes) erupt\w*|eruptions?|erupted)\b/, "a volcano. a lava flow. an ash cloud.", { wx: "ash" }],
[/\b(avalanches?)\b/, "a mountain. rubble. boulders.", { wx: "snow" }],
[/\b(land ?slides?|mud ?slides?|rock ?slides?|rock ?falls?)\b/, "a hill. rubble. rubble. boulders.", {}],
[/\b(meteors? (hit|struck|crashed|fell)|asteroids? (hit|struck|crashed|fell)|impact crater)\b/, "a meteor. an impact crater.", { wx: "meteors" }],
[/\b(sink ?holes? opened|the ground (gave way|collapsed))\b/, "a sinkhole.", {}],
[/\b(blackout|power (went )?out|the lights went out)\b/, "", { dark: 1 }]
];
function wxState() { store.weather = store.weather || {}; return store.weather[store.here || 0] || { kind: "clear", strength: 1 }; }
function wxSet(kind, strength, why) {
if (WX_KINDS.indexOf(kind) < 0)
return;
store.weather = store.weather || {};
store.weather[store.here || 0] = { kind: kind, strength: Math.max(0.3, Math.min(2, strength || 1)), why: why || "" };
wxApply();
if (typeof save === "function")
save();
}
function wxRead(text) { return __ZC(113, 0, this, arguments, new.target); }
function wxDrops(n, col, size, opa, tall) {
var pos = new Float32Array(n * 3);
for (var i = 0; i < n; i++) {
pos[i * 3] = (Math.random() - 0.5) * 90;
pos[i * 3 + 1] = Math.random() * tall;
pos[i * 3 + 2] = (Math.random() - 0.5) * 90;
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
var m = new THREE.PointsMaterial({ color: col, size: size, transparent: true, opacity: opa, depthWrite: false,
map: (typeof dotTexture === "function") ? dotTexture() : null, alphaTest: 0.02, sizeAttenuation: true });
var p = new THREE.Points(g, m);
p.frustumCulled = false;
return p;
}
function wxStreaks(n, col, opa, len) {
var pos = new Float32Array(n * 6);
for (var i = 0; i < n; i++) {
var x = (Math.random() - 0.5) * 60, y = Math.random() * 40, z = (Math.random() - 0.5) * 60;
pos[i * 6] = x;
pos[i * 6 + 1] = y;
pos[i * 6 + 2] = z;
pos[i * 6 + 3] = x + 0.15;
pos[i * 6 + 4] = y + len;
pos[i * 6 + 5] = z;
}
var g = new THREE.BufferGeometry();
g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
var l = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: opa, depthWrite: false }));
l.frustumCulled = false;
return l;
}
function wxBuild() {
if (WX.group || typeof scene === "undefined" || !scene)
return;
WX.group = new THREE.Group();
WX.group.name = "weather";
WX.sys.rain = wxStreaks(4200, 0xC8D4E4, 0.75, 1.6);
WX.sys.snow = wxDrops(2200, 0xFFFFFF, 0.32, 0.95, 40);
WX.sys.hail = wxDrops(1400, 0xE8F0F8, 0.2, 0.95, 40);
WX.sys.ash = wxDrops(1800, 0x55504C, 0.3, 0.8, 40);
WX.sys.dust = wxDrops(2600, 0xC8A878, 0.28, 0.55, 22);
WX.sys.meteors = wxStreaks(40, 0xFFD890, 0.95, -6);
Object.keys(WX.sys).forEach(function (k) { WX.sys[k].visible = false; WX.group.add(WX.sys[k]); });
scene.add(WX.group);
var ov = document.createElement("div");
ov.id = "wx-tint";
ov.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:2;transition:background .8s";
document.body.appendChild(ov);
WX.overlay = ov;
var fl = document.createElement("div");
fl.id = "wx-flash";
fl.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:3;background:#EEF2FF;opacity:0;transition:opacity 1.2s ease-in-out";
document.body.appendChild(fl);
WX.flash = fl;
}
var WX_TINT = { clear: "transparent", rain: "rgba(40,48,60,.28)", storm: "rgba(20,24,34,.45)", snow: "rgba(220,228,240,.18)", hail: "rgba(60,66,78,.3)",
fog: "rgba(200,204,210,.22)", wind: "rgba(80,80,70,.08)", sandstorm: "rgba(190,150,90,.38)", heat: "rgba(255,170,80,.12)", ash: "rgba(60,54,50,.4)", meteors: "rgba(10,10,30,.25)" };
var WX_FOG = { clear: 1, rain: 1.7, storm: 2.3, snow: 2.0, hail: 1.6, fog: 4.5, wind: 1.1, sandstorm: 4.0, heat: 1.2, ash: 2.6, meteors: 1 };
function wxInCity() { return (typeof careInCity === "function" && careInCity()) || store.inside; }
function wxApply() {
wxBuild();
if (!WX.group)
return;
var s = wxInCity() ? { kind: "clear", strength: 1 } : wxState();
WX.kind = s.kind;
WX.strength = s.strength || 1;
var k = WX.kind;
WX.sys.rain.visible = (k === "rain" || k === "storm");
WX.sys.snow.visible = (k === "snow");
WX.sys.hail.visible = (k === "hail");
WX.sys.ash.visible = (k === "ash");
WX.sys.dust.visible = (k === "sandstorm" || k === "wind");
WX.sys.meteors.visible = (k === "meteors");
WX.sys.dust.material.color.setHex(k === "wind" ? 0x9A9488 : 0xC8A878);
WX.sys.dust.material.opacity = k === "wind" ? 0.25 : 0.6;
WX.sys.rain.material.opacity = Math.min(1, (k === "storm" ? 0.9 : 0.75) * Math.min(1.4, WX.strength));
if (WX.overlay)
WX.overlay.style.background = WX_TINT[k] || "transparent";
if (typeof fogForLight === "function" && typeof lastDl !== "undefined")
fogForLight(lastDl);
}
var lastDl = 0.8;
(function () {
if (typeof fogForLight !== "function")
return;
var ff = fogForLight;
fogForLight = function (dl) {
lastDl = dl;
ff.apply(this, arguments);
if (scene && scene.fog && WX.kind && WX.kind !== "clear" && !wxInCity())
scene.fog.density *= (WX_FOG[WX.kind] || 1) * Math.max(0.7, Math.min(1.5, WX.strength));
};
})();
function wxTick() {
if (!WX.group || typeof camera === "undefined")
return;
var now = performance.now(), dt = Math.min(0.1, (now - (WX.last || now)) / 1000);
WX.last = now;
var P = camera.position;
WX.group.position.set(P.x, Math.max(0, P.y - 12), P.z);
var wind = (WX.kind === "wind" || WX.kind === "sandstorm" || WX.kind === "storm") ? 1 : 0;
function fall(p, speed, drift, top, isLine) {
if (!p.visible)
return;
var a = p.geometry.attributes.position, arr = a.array, step = isLine ? 6 : 3, half = isLine ? 30 : 45;
for (var i = 0; i < arr.length; i += step) {
arr[i + 1] -= speed * dt;
arr[i] += drift * dt;
if (isLine) {
arr[i + 4] -= speed * dt;
arr[i + 3] += drift * dt;
}
if (arr[i + 1] < 0) {
var nx = (Math.random() - 0.5) * half * 2, nz = (Math.random() - 0.5) * half * 2, ny = top * (0.8 + Math.random() * 0.2);
var dx = isLine ? arr[i + 3] - arr[i] : 0, dy = isLine ? arr[i + 4] - arr[i + 1] : 0;
arr[i] = nx;
arr[i + 1] = ny;
arr[i + 2] = nz;
if (isLine) {
arr[i + 3] = nx + dx;
arr[i + 4] = ny + dy;
arr[i + 5] = nz;
}
}
if (arr[i] > half) {
arr[i] -= half * 2;
if (isLine)
arr[i + 3] -= half * 2;
}
}
a.needsUpdate = true;
}
var S = WX.strength || 1;
fall(WX.sys.rain, (WX.kind === "storm" ? 34 : 24) * Math.min(1.5, S), wind ? 6 : 0.5, 40, true);
fall(WX.sys.snow, 2.2 * S, wind ? 3 : 0.6, 40, false);
fall(WX.sys.hail, 18 * S, 0.5, 40, false);
fall(WX.sys.ash, 1.3, 0.8, 40, false);
fall(WX.sys.dust, 0.4, (WX.kind === "sandstorm" ? 22 : 9) * S, 22, false);
fall(WX.sys.meteors, 30, 18, 60, true);
if (WX.kind === "storm" && WX.flash) {
if (now > WX.flashAt) {
WX.flashAt = now + 9000 + Math.random() * 12000 / Math.max(0.5, S);
WX.flashUntil = now + 1400;
if (typeof playTone === "function") {
try {
setTimeout(function () { playTone(48, 0.9, "sawtooth", 0.05); }, 500 + Math.random() * 900);
}
catch (e) { }
}
}
WX.flash.style.opacity = now < WX.flashUntil ? (0.12) : 0;
}
else if (WX.flash)
WX.flash.style.opacity = 0;
}
function wxQuake(seconds) { WX.quakeUntil = performance.now() + 1000 * (seconds || 8); }
(function () {
if (typeof renderView !== "function")
return;
var rv = renderView;
renderView = function () {
try {
wxTick();
}
catch (e) { }
var shook = false, ox = 0, oy = 0, oz = 0;
if (typeof camera !== "undefined" && performance.now() < WX.quakeUntil) {
var left = (WX.quakeUntil - performance.now()) / 1000, amp = Math.min(1, left / 3) * 0.35;
ox = (Math.random() - 0.5) * amp;
oy = (Math.random() - 0.5) * amp * 0.6;
oz = (Math.random() - 0.5) * amp;
camera.position.x += ox;
camera.position.y += oy;
camera.position.z += oz;
shook = true;
}
var r = rv.apply(this, arguments);
if (shook) {
camera.position.x -= ox;
camera.position.y -= oy;
camera.position.z -= oz;
}
return r;
};
})();
(function () {
if (typeof GROW_STOPSET !== "undefined")
("rain raining rained rainy rains drizzle drizzling downpour pouring showers snow snowing snowed snowy snowflakes sleet hail hailing fog foggy mist misty haze hazy smog wind windy winds gust gusts gale gales thunder thundering lightning weather sky skies sunshine sunny cloudy overcast storm stormy storms heat ash ashfall tremor tremors quake earthquake")
.split(" ").forEach(function (w) { GROW_STOPSET[w] = 1; });
if (typeof learnWord === "function") {
[["tidalwave", ["tsunami", "tsunamis"]], ["tornado", ["hurricane", "hurricanes", "typhoon", "tornadoes"]], ["rubble", ["debris", "wreckage", "collapsed buildings"]],
["wildfire", ["wild fire", "bush fire", "bushfire"]], ["ashcloud", ["ash cloud", "a column of smoke", "smoke"]], ["crater", ["impact crater"]],
["rock", ["boulders", "falling rocks"]], ["fissure", ["earthquake", "quake"]]].forEach(function (p) {
if (KIT[p[0]])
p[1].forEach(function (w) { learnWord(p[0], w); });
});
}
if (typeof scanText !== "function")
return;
var inner = scanText;
scanText = function (chunk) {
var low = " " + String(chunk || "").toLowerCase() + " ", extra = [], quake = false, wxFromEvent = null, dark = false;
WX_EVENTS.forEach(function (ev) { if (ev[0].test(low)) {
if (ev[1])
extra.push(ev[1]);
if (ev[2].quake)
quake = true;
if (ev[2].wx)
wxFromEvent = ev[2].wx;
if (ev[2].dark)
dark = true;
} });
var res = inner.apply(this, arguments);
try {
if (extra.length) {
var had = {};
store.objects.forEach(function (o) { if (!o.filler)
had[o.archetype] = 1; });
extra = extra.join(" ").split(/\.\s*/).filter(function (it) {
it = it.trim();
if (!it)
return false;
var w = it.replace(/^(a|an|the|some)\s+/, "");
var k = growHeadArch(w) || growHeadArch(growSingular(w));
return !(k && had[k]);
});
}
if (extra.length) {
var n0 = store.objects.length;
inner.call(this, extra.join(". ") + ".");
for (var q = n0; q < store.objects.length; q++) {
store.objects[q].instant = true;
store.objects[q].standIn = "event";
}
}
var w = wxRead(chunk);
if (w)
wxSet(w.kind, w.strength, "said");
else if (wxFromEvent)
wxSet(wxFromEvent, 1.2, "event");
if (quake)
wxQuake(9);
if (dark && typeof scrubOffset !== "undefined") {
wxSet(wxState().kind === "clear" ? "fog" : wxState().kind, 1, "dark");
}
}
catch (e) {
if (window.console)
console.warn("weather:", e);
}
return res;
};
})();
(function () {
if (typeof buildSys === "function") {
var bs = buildSys;
buildSys = function () { return bs.apply(this, arguments) + " Also add \"weather\": one of clear, rain, storm, snow, hail, fog, wind, sandstorm, heat, ash, meteors, only if the dream says or clearly implies the weather; and \"disasters\": a list of any of earthquake, tsunami, flood, tornado, hurricane, wildfire, eruption, avalanche, landslide, meteor strike, sinkhole that happen in the dream. Build what a disaster leaves behind as objects too (a tsunami is a tidalwave, an earthquake leaves a fissure and rubble, an eruption is a volcano with a lavaflow)."; };
}
if (typeof reconcile !== "function")
return;
var rc = reconcile;
reconcile = function (p) {
var r = rc.apply(this, arguments);
try {
if (p && typeof p.weather === "string" && WX_KINDS.indexOf(p.weather.toLowerCase()) > -1 && p.weather.toLowerCase() !== "clear")
wxSet(p.weather.toLowerCase(), 1.1, "ai");
var ds = (p && p.disasters) || [];
if (ds.some(function (d) { return /quake|tremor/i.test(d); }))
wxQuake(9);
if (!p.weather) {
ds.forEach(function (d) {
d = String(d).toLowerCase();
if (/hurricane|typhoon|cyclone/.test(d))
wxSet("storm", 1.5, "ai");
else if (/erupt|volcan/.test(d))
wxSet("ash", 1, "ai");
else if (/avalanche/.test(d))
wxSet("snow", 1.3, "ai");
else if (/meteor/.test(d))
wxSet("meteors", 1, "ai");
else if (/flood/.test(d))
wxSet("rain", 1.4, "ai");
});
}
}
catch (e) { }
return r;
};
})();
var DREAM_SKY_THING = /^(the |a |an )?(sun|sunshine|sunlight|sunbeams?|sunrise|sunset|moon|full moon|crescent moon|moonlight|stars?|starlight|sky|rainbow in the sky)$/i;
(function () {
if (typeof buildSys === "function") {
var bs = buildSys;
buildSys = function () { return bs.apply(this, arguments) + " The sun, the moon, the stars and the sky are never objects: they are already overhead, so never list them in objects (\"the sun shining brightly\" means a bright clear day)."; };
}
if (typeof reconcile !== "function")
return;
var rc = reconcile;
reconcile = function (p) {
try {
if (p && Array.isArray(p.objects))
p.objects = p.objects.filter(function (o) {
var a = String((o && (o.label || o.archetype)) || "").trim(), b = String((o && o.archetype) || "").trim();
return !(DREAM_SKY_THING.test(a) || DREAM_SKY_THING.test(b));
});
}
catch (e) { }
var r = rc.apply(this, arguments);
try {
(store.objects || []).slice().forEach(function (sp) { if (sp && !sp.city && !sp.hub && !sp.dreamerDoor && (DREAM_SKY_THING.test(String(sp.label || "")) || DREAM_SKY_THING.test(String(sp.archetype || ""))) && typeof removeSpec === "function")
removeSpec(sp); });
}
catch (e) { }
return r;
};
})();
(function () {
var lastHere = null, lastIn = null;
setInterval(function () {
try {
var h = store.here || 0, inC = wxInCity();
if (h !== lastHere || inC !== lastIn) {
lastHere = h;
lastIn = inC;
wxApply();
}
}
catch (e) { }
}, 700);
setTimeout(function () { try {
wxApply();
}
catch (e) { } }, 1500);
})();
