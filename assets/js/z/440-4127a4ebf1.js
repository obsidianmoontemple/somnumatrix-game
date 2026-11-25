/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(440, function () {
"use strict";
return [
function (id, html, buttons, ms) {
var old = document.getElementById(id);
if (old && old.parentNode)
old.parentNode.removeChild(old);
if (!document.body)
return null;
njStyle();
var d = document.createElement("div");
d.id = id;
d.className = "nj-card";
d.setAttribute("role", "dialog");
d.innerHTML = '<div class="nj-card-t">' + html + '</div><div class="nj-card-r"></div>';
var row = d.querySelector(".nj-card-r");
var shut = function () { d.classList.remove("on"); setTimeout(function () { if (d.parentNode)
d.parentNode.removeChild(d); }, 450); };
(buttons || []).forEach(function (b) {
var el = document.createElement("button");
el.type = "button";
el.textContent = b[0];
if (b[2])
el.className = b[2];
el.addEventListener("click", function (e) { e.preventDefault(); shut(); try {
if (b[1])
b[1]();
}
catch (x) {
njWarn("card", x);
} });
row.appendChild(el);
});
document.body.appendChild(d);
requestAnimationFrame(function () { d.classList.add("on"); });
if (ms)
setTimeout(function () { if (d.parentNode)
shut(); }, ms);
return d;
},
function (title, body, tag, url) {
if (typeof Notification === "undefined" || Notification.permission !== "granted")
return Promise.resolve(false);
var opt = { body: body, tag: tag, icon: "widow-192.png", badge: "widow-192.png", data: { url: url || njAppUrl() }, renotify: false };
var sw = navigator.serviceWorker;
var plain = function () { try {
var n = new Notification(title, opt);
n.onclick = function () { try {
window.focus();
}
catch (e) { } n.close(); if (/[?&]write\b/.test(opt.data.url) && typeof openStory === "function")
openStory(); };
return true;
}
catch (e) {
return false;
} };
if (!sw || !sw.controller)
return Promise.resolve(plain());
return sw.ready.then(function (reg) { return reg.showNotification(title, opt).then(function () { return true; }); }).catch(function () { return plain(); });
},
function () {
if (typeof Notification === "undefined") {
njSay("This browser can't buzz. Use <b>Add to my phone's alarms</b> instead.");
return Promise.resolve(false);
}
if (Notification.permission === "granted")
return Promise.resolve(true);
if (Notification.permission === "denied") {
njSay("Buzzing is blocked for this site in the browser's settings. <b>Add to my phone's alarms</b> works without it.");
return Promise.resolve(false);
}
return Promise.resolve(Notification.requestPermission()).then(function (p) { return p === "granted"; }).catch(function () { return false; });
},
function (uid, start, title, text, url) {
return ["BEGIN:VEVENT", "UID:" + uid + "@play.obsidianmoontemple.com", "DTSTAMP:" + new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, ""),
"DTSTART:" + njIcsTime(start), "DURATION:PT5M", "RRULE:FREQ=DAILY", "SUMMARY:" + njIcsEsc(title), "DESCRIPTION:" + njIcsEsc(text + "\n" + url), "URL:" + url,
"TRANSP:TRANSPARENT", "BEGIN:VALARM", "ACTION:DISPLAY", "TRIGGER:PT0M", "DESCRIPTION:" + njIcsEsc(title), "END:VALARM", "END:VEVENT"].join("\r\n");
},
function (events, name) {
var text = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//SomnuMatrix//Dream Journal//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH"].concat(events).concat(["END:VCALENDAR"]).join("\r\n") + "\r\n";
try {
var b = new Blob([text], { type: "text/calendar" }), a = document.createElement("a");
a.href = URL.createObjectURL(b);
a.download = name;
document.body.appendChild(a);
a.click();
setTimeout(function () { URL.revokeObjectURL(a.href); if (a.parentNode)
a.parentNode.removeChild(a); }, 4000);
return true;
}
catch (e) {
njWarn("ics", e);
return false;
}
},
function () {
var c = njCfg().remind;
var ok = njIcsFile([njIcsEvent("somnu-morning", njAtTime(njMinutes(c.time)), "What did you dream?", "Write it down before it fades. Your SomnuMatrix dream journal:", njAppUrl())], "somnumatrix-morning-reminder.ics");
if (ok)
njSay("<b>The alarm file is downloaded.</b> Open it and choose your calendar: it rings every morning at " + njE(c.time) + ", and a tap on it opens your journal. To stop it, delete \"What did you dream?\" from your calendar.");
},
function () {
if (njVisiting() || njInVR())
return false;
njCard("nj-morning-card", "<b>Good morning. What did you dream?</b><br>Write it down now, before it fades. Even one line keeps it.", [
["Later", null, "no"],
["Write it now", function () { if (typeof openStory === "function")
openStory(); }]
], 120000);
return true;
},
function () {
var t = document.getElementById("story-text"), h = document.getElementById("story-title");
if (!t || njVisiting())
return;
var text = t.value, title = h ? h.value : "";
if (text.trim().length < 3 && !title.trim()) {
njPut(NJ_OFF.draftKey, null);
return;
}
njPut(NJ_OFF.draftKey, { text: text, title: title, at: Date.now() });
},
function (k) {
var N = { gasstation: "petrol station", ferriswheel: "Ferris wheel", rollercoaster: "roller coaster", hiddenroom: "hidden room", secretdoor: "secret door",
impossiblestair: "impossible stair", floatingisland: "floating island", standingstones: "standing stones", tidalwave: "tidal wave", stormcloud: "storm cloud",
lightningstorm: "lightning storm", clocktower: "clock tower", wizardtower: "wizard's tower", treehouse: "tree house", blackhole: "black hole",
worldtree: "world tree", dreamplaceholder: "dream place", volcanolair: "volcano lair", candyhouse: "house of sweets", trapdoor: "trapdoor", vaultdoor: "vault door" };
return N[k] || String(k || "").replace(/_/g, " ");
},
function () {
var out = { places: [], things: [], people: [], kinds: [], feelings: [] };
if (typeof store === "undefined" || njVisiting())
return out;
njGroups().forEach(function (G) {
if (G.nights.length < 2)
return;
var o = G.rep, k = KIT[o.archetype];
var row = { id: o.id, name: njNameOf(o), arch: o.archetype, nights: G.nights, x: o.x, z: o.z, realm: o.realm || 0 };
(k.cat === "structure" ? out.places : out.things).push(row);
});
(store.characters || []).forEach(function (c) {
if (c.primary === false || c.city || c.deity || !c.sessions)
return;
var ns = njNightsOf(c.sessions);
if (ns.length < 2)
return;
var sp = c.objId && typeof specById === "function" ? specById(c.objId) : null;
out.people.push({ id: c.id, name: String(c.name || "someone"), nights: ns, x: sp ? sp.x : c.x, z: sp ? sp.z : c.z, realm: sp ? (sp.realm || 0) : 0, spec: sp ? sp.id : null });
});
try {
if (typeof baseRates === "function")
baseRates().forEach(function (b) {
if (b.nights < 2 || b.archetype === "human" || b.archetype === "child" || !KIT[b.archetype] || KIT[b.archetype].cat !== "being")
return;
out.kinds.push({ arch: b.archetype, name: njArchName(b.archetype), nights: b.nights, rate: b.rate });
});
}
catch (e) { }
var feel = {};
njSessions().forEach(function (r) { var s = {}; (r.emotions || []).forEach(function (f) { f = String(f).toLowerCase(); if (!s[f]) {
s[f] = 1;
feel[f] = (feel[f] || 0) + 1;
} }); });
Object.keys(feel).forEach(function (f) { if (feel[f] >= 2)
out.feelings.push({ name: f, nights: feel[f] }); });
var by = function (a, b) { return (b.nights.length || b.nights) - (a.nights.length || a.nights); };
out.places.sort(by);
out.things.sort(by);
out.people.sort(by);
out.kinds.sort(by);
out.feelings.sort(by);
return out;
},
function (max) {
var R = njRecurring(), A = (typeof store !== "undefined" && store.atlas) || null, out = [], seen = {};
var add = function (s) { s = String(s || "").trim(); var k = s.toLowerCase(); if (!s || seen[k] || out.length >= (max || 6))
return; seen[k] = 1; out.push(s); };
if (A) {
(A.people || []).slice(0, 2).forEach(function (p) { add(p.name); });
(A.places || []).slice(0, 2).forEach(function (p) { add(p.name); });
(A.things || []).slice(0, 2).forEach(function (p) { add(p.name); });
}
R.people.slice(0, 2).forEach(function (p) { add(p.name); });
R.places.slice(0, 2).forEach(function (p) { add(p.name); });
R.kinds.slice(0, 4).forEach(function (k) { add(/^[aeiou]/i.test(k.name) ? "an " + k.name : "a " + k.name); });
if (A)
(A.themes || []).slice(0, 2).forEach(function (t) { add(t.name); });
return out;
},
function () {
if (NJA.busy)
return;
if (njVisiting())
return njAtlasMsg("Go back to your own dream first.");
var S = njSessions();
if (S.length < 2)
return njAtlasMsg("The atlas needs at least two dreams written down.");
if (!njOnline())
return njAtlasMsg("No signal just now. The record's own atlas is below; ask the AI when you're back online.");
if (typeof aiBought === "function" && !aiBought()) {
if (typeof aiNotBought === "function")
try {
aiNotBought("ai");
}
catch (e) { }
return njAtlasMsg("The AI's reading comes with SomnuMatrix. The record's own atlas is below.");
}
var c = cfg();
if (c.mode === "off")
return njAtlasMsg("The AI is off just now.");
var list = S.slice(-60), per = Math.max(160, Math.floor(14000 / list.length));
var text = list.map(function (r) { var t = (typeof currentText === "function" ? currentText(r) : r.original) || ""; return "NIGHT " + r.n + " (" + r.date + ") " + String(r.title || "") + ": " + String(t).replace(/\s+/g, " ").slice(0, per); }).join("\n");
var sys = ["You read one person's dream journal: every entry, each marked with its night number.",
"Find what keeps coming back across different nights: places, people, things (animals, objects, events) and themes (situations or feelings that repeat, like being late, being chased, a locked door).",
"Only include something that appears on two or more different nights. Use the dreamer's own words for names, short (one to five words). Never invent anything that is not in the entries.",
"For each, list the night numbers it appears on, and a note of at most twelve words on how it appears.",
"Answer with JSON only, no other text: {\"places\":[{\"name\":\"\",\"nights\":[1],\"note\":\"\"}],\"people\":[...],\"things\":[...],\"themes\":[...]}. At most 8 in each list, most frequent first."].join(" ");
NJA.busy = true;
njAtlasMsg("The AI is reading your " + list.length + " dreams…");
var T = llmTarget(c);
fetch(T.url, { method: "POST", headers: T.headers, body: JSON.stringify(llmBody(c, { temperature: 0.2, max_tokens: 2200, messages: [{ role: "system", content: sys }, { role: "user", content: text }] })) })
.then(function (r) { if (!r.ok)
throw new Error(r.status); return r.json(); })
.then(function (d) {
var s = ((d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content) || "").trim();
s = s.replace(/^```(json)?/i, "").replace(/```$/, "").trim();
var a = s.indexOf("{"), b = s.lastIndexOf("}");
if (a < 0 || b < a)
throw new Error("no answer");
var o = JSON.parse(s.slice(a, b + 1)), valid = {};
S.forEach(function (r) { valid[r.n] = 1; });
var clean = function (L) {
return (Array.isArray(L) ? L : []).map(function (x) {
var ns = (Array.isArray(x && x.nights) ? x.nights : []).map(function (n) { return parseInt(n, 10); }).filter(function (n) { return valid[n]; });
ns = ns.filter(function (n, i) { return ns.indexOf(n) === i; }).sort(function (p, q) { return p - q; });
return { name: String((x && x.name) || "").replace(/[<>]/g, "").trim().slice(0, 60), nights: ns, note: String((x && x.note) || "").replace(/[<>]/g, "").trim().slice(0, 120) };
})
.filter(function (x) { return x.name && x.nights.length >= 2; }).slice(0, 8);
};
if (njVisiting())
return;
store.atlas = { at: new Date().toISOString(), read: list.length, places: clean(o.places), people: clean(o.people), things: clean(o.things), themes: clean(o.themes) };
if (typeof save === "function")
save();
NJA.busy = false;
njAtlasMsg("<b>The AI has read your dreams.</b>");
njAtlasPaint();
njPaint();
})
.catch(function (e) {
NJA.busy = false;
var m = String((e && e.message) || e);
njAtlasMsg(/Failed to fetch|NetworkError/i.test(m) ? "The AI couldn't be reached just now. Try again in a moment." : "The AI's reading didn't come back right (" + njE(m) + "). Try again in a moment.");
});
},
function (name) {
var k = String(name || "").toLowerCase().replace(/^(the|a|an|my|our)\s+/, ""), hit = null;
if (!k)
return null;
(store.objects || []).forEach(function (o) { if (hit || !njOwnRealmOk(o))
return; var n = njNameOf(o).toLowerCase(); if (n.indexOf(k) >= 0 || (o.label && String(o.label).toLowerCase().indexOf(k) >= 0))
hit = o; });
return hit;
},
function (item) {
if (njVisiting())
return njAtlasMsg("Go back to your own dream first.");
var built = njFindBuilt(item.name);
if (built)
return njWalkTo(built.x, built.z, built.realm || 0, item.name);
if (typeof scanText !== "function")
return;
var before = {};
store.objects.forEach(function (o) { before[o.id] = 1; });
var go = function () {
var said = String(item.name).replace(/[^\w\s'-]/g, " ").trim();
try {
scanText("There was " + (/^(a|an|the|my|our)\s/i.test(said) ? "" : "a ") + said + ".");
}
catch (e) {
njWarn("lasting", e);
}
var made = store.objects.filter(function (o) { return !before[o.id] && !o.filler; });
if (!made.length)
return njSay("The dream couldn't build <b>" + njE(item.name) + "</b> from those words. Write it into a dream and it will rise.");
made.forEach(function (o) { var ns = (o.nights || []).slice(); item.nights.forEach(function (n) { if (ns.indexOf(n) < 0)
ns.push(n); }); o.nights = ns.sort(function (a, b) { return a - b; }); o.atlas = 1; if (typeof refresh === "function")
refresh(o); });
if (typeof save === "function")
save();
if (typeof updateCount === "function")
try {
updateCount();
}
catch (e) { }
njSay("<b>" + njE(item.name) + " is a lasting place in your dream now</b>, holding the " + item.nights.length + " nights you dreamt it. It grows each time you dream it again.");
};
njAtlasClose();
if (typeof closeJournal === "function")
closeJournal();
if ((store.here || 0) !== 0 || (typeof inSomnucorRealm === "function" && inSomnucorRealm())) {
if (typeof goHomeDream === "function")
goHomeDream();
setTimeout(go, 900);
}
else
go();
},
function (x, z, realm, name) {
if (njVisiting())
return njAtlasMsg("Go back to your own dream first.");
njAtlasClose();
if (typeof closeJournal === "function")
closeJournal();
var step = function () {
try {
if (typeof setWalk === "function" && !walkMode)
setWalk(true);
}
catch (e) { }
var hx = x, hz = z + 14;
camera.position.x = hx;
camera.position.z = hz;
try {
camera.position.y = (typeof terrainY === "function" ? terrainY(hx, hz) : 0) + 1.72;
}
catch (e) { }
if (typeof yaw !== "undefined")
yaw = 0;
njSay("<b>" + njE(name) + "</b>, just ahead of you.");
};
if ((store.here || 0) !== (realm || 0) || (typeof inSomnucorRealm === "function" && inSomnucorRealm())) {
if (realm && typeof visitRealm === "function") {
try {
visitRealm(realm);
}
catch (e) { }
}
else if (typeof goHomeDream === "function")
goHomeDream();
setTimeout(step, 900);
}
else
step();
},
function () {
if (njVisiting())
return njSay("The atlas is of your own dreams: go back to your own first.");
njStyle();
var d = document.getElementById("nja");
if (!d) {
var st = document.createElement("style");
st.textContent = "#nja{position:fixed;inset:0;z-index:60;background:rgba(6,6,12,.94);color:#EDE8F8;font:14px/1.5 system-ui,sans-serif;display:none;overflow:auto}" +
"#nja.on{display:block}#nja .w{max-width:1100px;margin:0 auto;padding:16px calc(16px + env(safe-area-inset-right,0px)) 40px calc(16px + env(safe-area-inset-left,0px))}" +
"#nja h2{font-weight:500;margin:0;font-size:20px;color:#F2D27A}#nja .top{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}" +
"#nja .grid{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:16px;margin-top:12px}" +
"@media (max-width:760px){#nja .grid{grid-template-columns:1fr}}" +
"#nja canvas{width:100%;aspect-ratio:1/1;background:radial-gradient(circle at 50% 45%,#1A1630,#0A0912 75%);border:1px solid #3A3460;border-radius:10px;touch-action:manipulation;cursor:pointer}" +
"#nja h3{font-weight:500;color:#C8B8F8;margin:14px 0 4px;font-size:15px}#nja .it{padding:6px 8px;border-radius:8px;cursor:pointer;border:1px solid transparent}" +
"#nja .it:hover,#nja .it.on{background:#1E1A34;border-color:#4A4470}#nja .it b{color:#F2D27A;font-weight:600}#nja .it small{color:#A8A0C0;display:block}" +
"#nja .sel{background:#16132A;border:1px solid #6A5FA0;border-radius:10px;padding:10px 12px;margin-top:10px}";
document.head.appendChild(st);
d = document.createElement("div");
d.id = "nja";
d.setAttribute("role", "dialog");
d.setAttribute("aria-label", "Your dream atlas");
d.innerHTML = '<div class="w"><div class="top"><h2>🗺️ Your dream atlas</h2><div><button type="button" class="nj-btn" id="nja-ask">✨ Have the AI read all my dreams</button> <button type="button" class="nj-btn" id="nja-close">Close</button></div></div>' +
'<div id="nja-msg" class="nj-dim" style="margin-top:6px"></div><div class="grid"><div><canvas id="nja-map" width="900" height="900" aria-label="Map of your dream"></canvas><div id="nja-sel"></div></div><div id="nja-list"></div></div></div>';
document.body.appendChild(d);
document.getElementById("nja-close").onclick = njAtlasClose;
document.getElementById("nja-ask").onclick = njAtlasAsk;
document.getElementById("nja-map").addEventListener("click", function (e) {
var cv = e.currentTarget, r = cv.getBoundingClientRect(), x = (e.clientX - r.left) * cv.width / r.width, y = (e.clientY - r.top) * cv.height / r.height, best = null, bd = 1e9;
NJA.hit.forEach(function (h) { var dd = Math.hypot(h.px - x, h.py - y); if (dd < Math.max(26, h.r + 10) && dd < bd) {
bd = dd;
best = h;
} });
if (best) {
NJA.sel = best.item;
njAtlasPaint();
}
});
addEventListener("keydown", function (e) { if (NJA.open && e.key === "Escape")
njAtlasClose(); });
}
NJA.open = true;
d.classList.add("on");
NJA.sel = null;
njAtlasPaint();
},
function () {
if (!NJA.open)
return;
var R = njRecurring(), A = store.atlas || null;
njAtlasMsg(NJA.msg || (A ? ("The AI read " + A.read + " dreams on " + njE(new Date(A.at).toLocaleDateString()) + ". Ask again any time to read the newest ones too.") : "Below is what your record already shows. Ask the AI to read every entry for the things the catalogue never built."));
var ask = document.getElementById("nja-ask");
if (ask)
ask.disabled = NJA.busy;
var sec = function (t, L, kind, fmt) {
if (!L.length)
return "";
return '<h3>' + t + '</h3>' + L.map(function (x, i) {
var on = NJA.sel && NJA.sel.kind === kind && NJA.sel.i === i;
return '<div class="it' + (on ? " on" : "") + '" data-k="' + kind + '" data-i="' + i + '"><b>' + njE(x.name) + '</b> ' + fmt(x) + '</div>';
}).join("");
};
var h = "";
h += sec("Places that keep coming back", R.places, "place", function (x) { return "<small>" + njNightsText(x.nights) + " · it grows each time</small>"; });
h += sec("People you meet again", R.people, "person", function (x) { return "<small>" + njNightsText(x.nights) + "</small>"; });
h += sec("Things that return", R.things, "thing", function (x) { return "<small>" + njNightsText(x.nights) + "</small>"; });
h += sec("Kinds of thing you dream often", R.kinds.slice(0, 10), "kind", function (x) { return "<small>on " + x.nights + " nights, " + Math.round(x.rate * 100) + "% of your dreams</small>"; });
h += sec("Feelings that return", R.feelings.slice(0, 8), "feel", function (x) { return "<small>on " + x.nights + " nights</small>"; });
if (A) {
var ai = function (t, L, kind) { return sec(t, L, kind, function (x) { return "<small>" + njNightsText(x.nights) + (x.note ? " · " + njE(x.note) : "") + "</small>"; }); };
h += '<h3 style="color:#F2D27A;margin-top:22px">What the AI found</h3>';
h += ai("Places", A.places, "aiplace") + ai("People", A.people, "aiperson") + ai("Things", A.things, "aithing") + ai("Themes", A.themes, "aitheme");
}
if (!h)
h = '<p class="nj-dim">Nothing has come back twice yet. Keep writing: the second time a place, a person or a thing returns, it appears here, and on the map.</p>';
var el = document.getElementById("nja-list");
el.innerHTML = h;
var lists = { place: R.places, person: R.people, thing: R.things, kind: R.kinds, feel: R.feelings, aiplace: A && A.places, aiperson: A && A.people, aithing: A && A.things, aitheme: A && A.themes };
Array.prototype.forEach.call(el.querySelectorAll(".it"), function (it) {
it.onclick = function () {
var k = it.getAttribute("data-k"), i = +it.getAttribute("data-i"), L = lists[k] || [];
if (L[i]) {
NJA.sel = { kind: k, i: i, row: L[i] };
njAtlasPaint();
}
};
});
if (NJA.sel && !NJA.sel.row) {
var L0 = lists[NJA.sel.kind] || [];
NJA.sel.row = L0[NJA.sel.i];
}
njAtlasMap(R);
njAtlasSel();
},
function () {
var el = document.getElementById("nja-sel");
if (!el)
return;
var S = NJA.sel, x = S && S.row;
if (!x) {
el.innerHTML = '<p class="nj-dim">Tap a glowing place on the map, or anything in the list.</p>';
return;
}
var h = '<div class="sel"><b style="color:#F2D27A">' + njE(x.name) + '</b><br>';
if (x.nights && x.nights.length)
h += '<span class="nj-dim">Dreamt on ' + njNightsText(x.nights) + '</span>' + (x.note ? "<br>" + njE(x.note) : "");
else if (typeof x.nights === "number")
h += '<span class="nj-dim">On ' + x.nights + ' nights</span>';
h += '<div class="nj-row">';
if (x.x != null && isFinite(x.x))
h += '<button type="button" class="nj-btn" id="nja-go">Walk there</button>';
if (S.kind === "aiplace" || S.kind === "aithing") {
var b = njFindBuilt(x.name);
h += '<button type="button" class="nj-btn" id="nja-make">' + (b ? "Walk there" : "Make it a lasting place") + '</button>';
}
h += '</div></div>';
el.innerHTML = h;
var g = document.getElementById("nja-go");
if (g)
g.onclick = function () { njWalkTo(x.x, x.z, x.realm || 0, x.name); };
var m = document.getElementById("nja-make");
if (m)
m.onclick = function () { njMakeLasting(x); };
},
function (R) {
var cv = document.getElementById("nja-map");
if (!cv)
return;
var g = cv.getContext("2d"), W = cv.width, H = cv.height;
g.clearRect(0, 0, W, H);
var realm = 0, objs = (store.objects || []).filter(function (o) { return njOwnRealmOk(o) && (o.realm || 0) === realm && isFinite(o.x) && isFinite(o.z); });
NJA.hit = [];
if (!objs.length) {
g.fillStyle = "#A8A0C0";
g.font = "28px system-ui";
g.textAlign = "center";
g.fillText("Your dream is still empty.", W / 2, H / 2);
return;
}
var x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
objs.forEach(function (o) { x0 = Math.min(x0, o.x); x1 = Math.max(x1, o.x); z0 = Math.min(z0, o.z); z1 = Math.max(z1, o.z); });
var span = Math.max(60, x1 - x0, z1 - z0) * 1.12, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, sc = (W - 80) / span;
var P = function (x, z) { return { x: W / 2 + (x - cx) * sc, y: H / 2 + (z - cz) * sc }; };
var byId = {};
objs.forEach(function (o) { byId[o.id] = o; });
g.strokeStyle = "rgba(150,140,210,.28)";
g.lineWidth = 2;
g.setLineDash([6, 6]);
(store.passages || []).forEach(function (p) { var a = byId[p.from], b = byId[p.to]; if (!a || !b)
return; var A = P(a.x, a.z), B = P(b.x, b.z); g.beginPath(); g.moveTo(A.x, A.y); g.lineTo(B.x, B.y); g.stroke(); });
g.setLineDash([]);
objs.forEach(function (o) {
var k = KIT[o.archetype];
if (!k)
return;
var q = P(o.x, o.z);
g.fillStyle = k.cat === "structure" ? "rgba(190,180,230,.35)" : k.cat === "nature" ? "rgba(110,180,120,.3)" : k.cat === "being" ? "rgba(130,170,240,.3)" : "rgba(170,160,200,.25)";
var s = k.cat === "structure" ? 7 : 4;
g.fillRect(q.x - s / 2, q.y - s / 2, s, s);
});
var you = null;
try {
if (!(typeof inSomnucorRealm === "function" && inSomnucorRealm()) && (store.here || 0) === realm)
you = P(camera.position.x, camera.position.z);
}
catch (e) { }
var mark = function (row, kind, col, i) {
if (row.realm !== realm || !isFinite(row.x))
return;
var q = P(row.x, row.z), n = row.nights.length, r = 9 + Math.min(30, n * 4);
var on = NJA.sel && NJA.sel.kind === kind && NJA.sel.i === i;
var grd = g.createRadialGradient(q.x, q.y, 0, q.x, q.y, r * 2.2);
grd.addColorStop(0, col.replace("A", "0.55"));
grd.addColorStop(1, col.replace("A", "0"));
g.fillStyle = grd;
g.beginPath();
g.arc(q.x, q.y, r * 2.2, 0, Math.PI * 2);
g.fill();
g.fillStyle = col.replace("A", "0.95");
g.beginPath();
g.arc(q.x, q.y, r * 0.55, 0, Math.PI * 2);
g.fill();
if (on) {
g.strokeStyle = "#FFFFFF";
g.lineWidth = 3;
g.beginPath();
g.arc(q.x, q.y, r * 0.9, 0, Math.PI * 2);
g.stroke();
}
NJA.hit.push({ px: q.x, py: q.y, r: r, item: { kind: kind, i: i, row: row } });
if (i < 10 || on) {
g.font = (on ? "600 " : "") + "22px system-ui";
g.textAlign = "center";
g.fillStyle = "rgba(10,8,20,.75)";
var t = row.name.slice(0, 26) + " · " + n, w = g.measureText(t).width;
g.fillRect(q.x - w / 2 - 6, q.y + r * 0.6 + 6, w + 12, 28);
g.fillStyle = "#F2E8C8";
g.fillText(t, q.x, q.y + r * 0.6 + 28);
}
};
R.things.forEach(function (row, i) { mark(row, "thing", "rgba(200,170,240,A)", i); });
R.people.forEach(function (row, i) { mark(row, "person", "rgba(120,180,255,A)", i); });
R.places.forEach(function (row, i) { mark(row, "place", "rgba(242,210,122,A)", i); });
if (you) {
g.fillStyle = "#7FF0C0";
g.beginPath();
g.arc(you.x, you.y, 8, 0, Math.PI * 2);
g.fill();
g.font = "20px system-ui";
g.textAlign = "left";
g.fillText("you", you.x + 12, you.y + 6);
}
g.font = "20px system-ui";
g.textAlign = "left";
g.fillStyle = "rgba(200,190,230,.8)";
g.fillText("gold: places · blue: people · violet: things · bigger = more nights", 20, H - 20);
},
function () {
if (NJA.geo)
return NJA.geo;
var sh = function (geo) { geo.userData.shared = true; return geo; };
NJA.geo = { post: sh(new THREE.CylinderGeometry(0.06, 0.09, 1.7, 6)), lamp: sh(new THREE.SphereGeometry(0.17, 10, 8)), cap: sh(new THREE.ConeGeometry(0.2, 0.22, 6)),
bloom: sh(new THREE.SphereGeometry(0.32, 8, 6)), leaf: sh(new THREE.SphereGeometry(0.42, 7, 5)), ring: sh(new THREE.RingGeometry(0.94, 1, 64)),
mPost: new THREE.MeshLambertMaterial({ color: 0x2E2A26 }), mLamp: new THREE.MeshBasicMaterial({ color: 0xFFD98A }),
mLeaf: new THREE.MeshLambertMaterial({ color: 0x3E6E34 }),
mBloom: [0xE8607A, 0xF2D27A, 0xB890F0, 0xF4F0E8, 0xF08A3A].map(function (c) { return new THREE.MeshLambertMaterial({ color: c }); }),
mRing: new THREE.MeshBasicMaterial({ color: 0xF2D9A0, transparent: true, opacity: 0.22, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }) };
return NJA.geo;
},
function (spec, grp) {
var n = njGrowNights(spec);
if (n < 2 || !grp)
return;
var K = njGrowKit(), k = KIT[spec.archetype], a = spec.attrs || {}, s = a.s || 1;
var w = (k.size[0] * (a.w || 1) * s) / 2 + 1.8, d = (k.size[2] * (a.d || 1) * s) / 2 + 1.8;
var G = new THREE.Group();
G.name = "nj-grow";
G.userData.njGrow = n;
var lite = njLite(), lanterns = Math.min(lite ? 4 : 10, 2 * (n - 1)), blooms = n >= 3 ? Math.min(lite ? 8 : 22, (n - 2) * 6) : 0;
var per = 2 * (2 * w + 2 * d), at = function (t) {
t = ((t % 1) + 1) % 1;
var L = t * per;
if (L < 2 * w)
return { x: -w + L, z: d };
L -= 2 * w;
if (L < 2 * d)
return { x: w, z: d - L };
L -= 2 * d;
if (L < 2 * w)
return { x: w - L, z: -d };
L -= 2 * w;
return { x: -w, z: -d + L };
};
var clear = function (p) { return !(p.z > d - 0.1 && Math.abs(p.x) < 2.2); };
var put = function (m, x, y, z) { m.position.set(x, y, z); m.raycast = function () { }; m.matrixAutoUpdate = false; m.updateMatrix(); G.add(m); };
var placed = 0;
for (var i = 0; placed < lanterns && i < lanterns * 3; i++) {
var p = at(0.02 + i / (lanterns * 1.5) + 0.5 / (lanterns * 1.5));
if (!clear(p))
continue;
placed++;
put(new THREE.Mesh(K.post, K.mPost), p.x, 0.85, p.z);
put(new THREE.Mesh(K.lamp, K.mLamp), p.x, 1.78, p.z);
put(new THREE.Mesh(K.cap, K.mPost), p.x, 1.98, p.z);
}
for (var j = 0; j < blooms; j++) {
var q = at(j / blooms + 0.013);
if (!clear(q))
continue;
var ox = q.x + (q.x > 0 ? 0.6 : -0.6) * ((j % 3) / 2), oz = q.z + (q.z > 0 ? 0.6 : -0.6) * (((j + 1) % 3) / 2);
var lf = new THREE.Mesh(K.leaf, K.mLeaf);
lf.scale.set(1, 0.45, 1);
put(lf, ox, 0.16, oz);
var bl = new THREE.Mesh(K.bloom, K.mBloom[j % K.mBloom.length]);
bl.scale.set(0.8, 0.5, 0.8);
put(bl, ox, 0.36, oz);
}
var ring = new THREE.Mesh(K.ring, K.mRing);
ring.rotation.x = -Math.PI / 2;
var rr = Math.max(w, d) + 0.6 + Math.min(6, n * 0.5);
ring.scale.set(rr, rr, 1);
put(ring, 0, 0.07, 0);
grp.add(G);
},
function (r) {
var out = {}, add = function (k) { k = String(k || "").toLowerCase(); if (/^[a-z]{2,24}$/.test(k))
out[k] = 1; };
try {
var s = researchSummary(r);
(s.events || []).forEach(add);
(s.forms || []).forEach(add);
}
catch (e) { }
(store.objects || []).forEach(function (o) { if (!o.filler && o.nights && o.nights.indexOf(r.n) > -1 && NJ_SIGN_BEINGS[o.archetype])
add(o.archetype); });
delete out.human;
delete out.child;
delete out.deity;
delete out.dreamplaceholder;
return Object.keys(out).slice(0, 16);
},
function () {
if (NJS.spot)
return NJS.spot;
if (typeof ATLC === "undefined" || !ATLC)
return null;
var obs = [];
try {
if (typeof shcPlazaObs === "function")
obs = shcPlazaObs();
}
catch (e) { }
try {
if (typeof shcJackSpot === "function") {
var J = shcJackSpot();
obs.push({ x: J.x, z: J.z, r: 14 });
}
}
catch (e) { }
var got = null;
[66, 74, 58, 82].forEach(function (R) {
if (got)
return;
for (var a = 0.6; a < Math.PI * 2 + 0.6 && !got; a += 0.05) {
if (typeof atlClearAt === "function" && !atlClearAt(R, a, 4, 3))
continue;
var p = { x: ATLC.x + Math.cos(a) * R, z: ATLC.z + Math.sin(a) * R }, bad = false;
obs.forEach(function (o) { if (!bad && Math.hypot(o.x - p.x, o.z - p.z) < (o.r || 4) + 6)
bad = true; });
if (!bad)
got = p;
}
});
NJS.spot = got || { x: ATLC.x + 66, z: ATLC.z };
return NJS.spot;
},
function () {
if (NJS.g)
return NJS.g;
var g = new THREE.Group();
g.name = "nj-shared-night";
var stone = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 3.7, 0.34, 40), new THREE.MeshLambertMaterial({ color: 0x5A566A }));
stone.position.y = 0.17;
g.add(stone);
var ring = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.17, 12, 64), new THREE.MeshBasicMaterial({ color: 0xD8C8FF }));
ring.position.y = 2.9;
g.add(ring);
var veil = new THREE.Mesh(new THREE.CircleGeometry(2.38, 48), new THREE.MeshBasicMaterial({ color: 0x8A7AE0, transparent: true, opacity: 0.45, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }));
veil.position.y = 2.9;
g.add(veil);
var moon = new THREE.Mesh(new THREE.SphereGeometry(0.34, 16, 12), new THREE.MeshBasicMaterial({ color: 0xFFF4D8 }));
moon.position.y = 5.9;
g.add(moon);
g.traverse(function (m) { m.raycast = function () { }; });
g.userData = { ring: ring, veil: veil, moon: moon };
NJS.g = g;
return g;
},
function () {
if (NJS.prompt || !document.body)
return NJS.prompt;
var el = document.createElement("button");
el.id = "nj-sn-prompt";
el.type = "button";
el.style.cssText = "position:fixed;left:50%;bottom:calc(140px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:44;display:none;" +
"background:rgba(14,10,28,.94);color:#F2E8C8;border:1px solid #B8A0F0;border-radius:14px;padding:9px 16px;font:600 14px system-ui,sans-serif;cursor:pointer";
el.onclick = function (e) { e.preventDefault(); njSharedEnter(); };
document.body.appendChild(el);
NJS.prompt = el;
return el;
},
function () {
if (!njSharedOpen() || njVisiting() || typeof beginVisit !== "function" || typeof place !== "function")
return;
if (typeof DT !== "undefined" && DT.code)
return njSay("Leave the dream you are sharing first.");
var N = NJS.now, night = String(N.night || njDay()), signs = N.signs.slice(0, 6);
if (NJS.prompt)
NJS.prompt.style.display = "none";
NJS.near = false;
var S = blank();
S.land = { sky: "violet", season: "calendar", ground: "grass", hills: 1, detail: true, shadows: null, water: 0x2E5E78 };
beginVisit({ dreamerDoor: "shared-night", name: "the Shared Night", doorLine: "" }, { store: S });
if (!visiting)
return;
visiting.sn = night;
var rnd = Math.random;
Math.random = njSharedRand(night + "|" + signs.map(function (s) { return s.sign; }).join(","));
var built = 0;
try {
signs.forEach(function (s) {
var arch = NJ_EVENT_KIT[s.sign] || s.sign;
if (!KIT[arch])
return;
var copies = 1 + (s.n >= 5 ? 1 : 0) + (s.n >= 9 ? 1 : 0);
for (var c = 0; c < copies; c++) {
try {
place(arch, null, {}, {});
built++;
}
catch (e) {
njWarn("shared-place", e);
}
}
});
["wisps", "standingstones"].forEach(function (a) { if (KIT[a])
try {
place(a, null, {}, {});
}
catch (e) { } });
var R2 = njSharedRand("lay|" + night), own = store.objects.filter(function (o) { return !o.filler; }), ring = 0;
own.forEach(function (o, i) {
var k = KIT[o.archetype] || { size: [4, 4, 4] }, big = Math.max(k.size[0], k.size[2]) * ((o.attrs && o.attrs.s) || 1);
ring += i ? Math.max(9, big * 0.6 + 6) : 0;
var a = i * 2.39996 + R2() * 0.3, r = i ? 14 + ring : 0;
o.x = Math.round(Math.cos(a) * r * 10) / 10;
o.z = Math.round(Math.sin(a) * r * 10) / 10;
o.rot = Math.round(R2() * 628) / 100;
(store.characters || []).forEach(function (c) { if (c.objId === o.id) {
c.x = o.x;
c.z = o.z;
c.anchor = { x: o.x, z: o.z };
} });
});
if (typeof populate === "function")
populate();
}
finally {
Math.random = rnd;
}
try {
if (typeof rebuildAll === "function")
rebuildAll();
}
catch (e) {
njWarn("shared-build", e);
}
var h = heartOf(0);
camera.position.set(h.x, 1.72 + ((typeof terrainY === "function" && terrainY(h.x, h.z + 24)) || 0), h.z + 24);
if (typeof yaw !== "undefined")
yaw = 0;
var who = +N.dreamers || 0;
njSay("<b>You are in the Shared Night.</b> Last night " + (who > 1 ? who + " dreamers" : "dreamers") + " dreamt of " + njE(njSharedTitle()) +
". Anyone else who walks in is here with you. Press <b>Back to your own</b> when you are done.");
var vw = document.getElementById("visit-who");
if (vw)
vw.innerHTML = "🌙 <b>The Shared Night</b>: " + njE(njSharedTitle());
if (!built)
njSay("<b>The Shared Night</b> is open, but what was dreamt couldn't be built here. Back to your own when you like.");
},
function () {
var D = njLucidData(), pts = 0, nightsLucid = 0, mornings = {};
Object.keys(D.days).forEach(function (d) { pts += Math.min(8, +D.days[d] || 0); });
njSessions().forEach(function (r) {
var l = +r.lucidity || 0;
if (l >= 3) {
pts += 15;
nightsLucid++;
}
else if (l >= 2) {
pts += 10;
nightsLucid++;
}
mornings[njSealedDay(r)] = 1;
});
var m = Object.keys(mornings).length;
pts += 3 * m;
var lv = 0;
NJL_LEVELS.forEach(function (L, i) { if (pts >= L[0])
lv = i; });
var next = NJL_LEVELS[lv + 1];
return { pts: pts, level: lv, name: NJL_LEVELS[lv][1], next: next ? next[0] : null, nextName: next ? next[1] : null, from: NJL_LEVELS[lv][0], lucidNights: nightsLucid, mornings: m, checks: D.checks || 0 };
},
function () {
if (njVisiting())
return;
var D = njLucidData(), d = njDay();
D.days[d] = (+D.days[d] || 0) + 1;
D.checks = (+D.checks || 0) + 1;
var ks = Object.keys(D.days).sort();
while (ks.length > 60)
delete D.days[ks.shift()];
if (typeof save === "function")
save();
var S = njLucidScore();
njSay("<b>Reality check done.</b> Lucid score " + S.pts + " · " + njE(S.name) + ((+D.days[d] > 8) ? " (eight a day count towards the score)" : "") + ".");
njPaint();
},
function () {
var signs = njDreamSigns(6), chk = NJL_CHECKS[Math.floor(Math.random() * NJL_CHECKS.length)];
var sign = signs.length ? signs[Math.floor(Math.random() * signs.length)] : null;
return "<b>👁️ Are you dreaming?</b><br>" + njE(chk) + (sign ? "<br><i>You often dream of " + njE(sign) + ". When you see it, ask yourself.</i>" : "");
},
function (force) {
if (njVisiting() && !force)
return false;
if (njInVR() || njTyping())
return false;
if (document.getElementById("nj-morning-card") || document.getElementById("nj-lucid-card"))
return false;
njCard("nj-lucid-card", njLucidPingText(), [["Not now", null, "no"], ["I checked", njLucidCheckDone]], 30000);
return true;
},
function () {
var signs = njDreamSigns(4), txt = "Do a reality check: count your fingers, read a line twice." + (signs.length ? " Your dream signs: " + signs.join(", ") + "." : "");
var ev = [11, 15, 19].map(function (h) { return njIcsEvent("somnu-lucid-" + h, njAtTime(h * 60), "Are you dreaming?", txt, location.origin + location.pathname + "?play"); });
if (njIcsFile(ev, "somnumatrix-lucid-pings.ics"))
njSay("<b>The pings file is downloaded.</b> Open it and choose your calendar: it asks \"Are you dreaming?\" at 11, 3 and 7 each day. Delete them from your calendar to stop them.");
},
function () {
var S = njLucidScore(), pc = S.next ? Math.round(100 * (S.pts - S.from) / (S.next - S.from)) : 100;
return '<div class="nj-score">Lucid score <b>' + S.pts + '</b> · <b>' + njE(S.name) + '</b></div><div class="nj-bar"><i style="width:' + pc + '%"></i></div>' +
'<div class="nj-dim">' + (S.next ? (S.next - S.pts) + " more to " + njE(S.nextName) + ". " : "The highest level. ") + S.checks + " reality checks, " + S.lucidNights + " lucid nights, " + S.mornings + " mornings written.</div>";
}
];
});
