/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(399, function () {
"use strict";
return [
function (s, fallback) {
s = String(s || "").toLowerCase().replace(/[’`]/g, "'").trim();
var best = "", bs = 0;
mtgPlaces().forEach(function (k) {
var n = k.toLowerCase().replace(/[’`]/g, "'"), core = n.replace(/^the\s+/, "").replace(/'s$/, ""), sc = 0;
if (s === n || s === core)
sc = 200;
else if (core.length >= 3 && s.indexOf(core) >= 0)
sc = 100 + core.length;
else {
s.split(/[^a-z']+/).forEach(function (w) { w = w.replace(/'s$/, ""); if (w.length >= 4 && core.split(/[^a-z']+/).indexOf(w) >= 0)
sc += 20; });
}
if (sc > bs) {
bs = sc;
best = k;
}
});
return bs >= 20 ? best : (fallback || "");
},
function (s) {
s = String(s || "").toLowerCase();
var now = Date.now(), h = mtgHour(), m, H = null;
if (/\b(right now|now|right away|straight away|asap|soon)\b/.test(s))
return now + 10 * 60000;
if ((m = /\bin\s+(\d+|an?|half an?)\s*(minutes?|mins?|hours?|hrs?)\b/.exec(s))) {
var n = /half/.test(m[1]) ? 0.5 : /^an?$/.test(m[1]) ? 1 : +m[1];
return now + n * (/^h/.test(m[2]) ? 3600000 : 60000);
}
if ((m = /\b(\d{1,2})[:.](\d{2})\s*(am|pm|a\.m\.|p\.m\.)?/.exec(s))) {
H = (+m[1]) + (+m[2]) / 60;
if (m[3] && /p/.test(m[3]) && +m[1] < 12)
H += 12;
if (m[3] && /a/.test(m[3]) && +m[1] === 12)
H -= 12;
}
else if ((m = /\b(\d{1,2})\s*(am|pm|a\.m\.|p\.m\.|o'?clock)\b/.exec(s))) {
H = +m[1];
if (/p/.test(m[2]) && H < 12)
H += 12;
if (/a/.test(m[2]) && H === 12)
H = 0;
if (/o/.test(m[2]) && H < 8)
H += 12;
}
else if (/\bnoon|midday\b/.test(s))
H = 12;
else if (/\blunch/.test(s))
H = 12.5;
else if (/\bmidnight\b/.test(s))
H = 24;
else if (/\b(tonight|this evening|evening)\b/.test(s))
H = 19;
else if (/\bmorning\b/.test(s))
H = 9;
else if (/\bafternoon\b/.test(s))
H = 15;
if (H === null)
return now + 30 * 60000;
var d = H - h;
if (/\btomorrow\b/.test(s))
d = d < 0 ? d + 24 : d + 24;
else if (d < -0.25)
d += 24;
return now + Math.max(0, d) * 3600000;
},
function (c) {
var w = (typeof fpsStore === "function" && fpsStore().who && fpsStore().who[c.name]) || {};
return { name: c.name, sex: c.ftkSex || w.sex || "", age: c.ftkAge || w.age || 0, title: c.stfTitle || w.title || "", work: c.stfPlace || w.place || "",
persona: (c.details && c.details[0]) || w.persona || (c.name + " lives and works in Somnucor.") };
},
function (m) {
var P0 = mtgFrom(m), FP = P0 && typeof cinFrontOf === "function" ? cinFrontOf(m.place) : null;
if (P0 && FP) {
var dd = Math.hypot(P0.x - FP.x, P0.z - FP.z) * 1.3;
return Math.max(2, Math.min(20, dd / 1.35 / 60)) * 60000;
}
var FA = m.work && m.work !== m.place && typeof cinFrontOf === "function" ? cinFrontOf(m.work) : null, FB = typeof cinFrontOf === "function" ? cinFrontOf(m.place) : null;
if (!FA || !FB || typeof ATLC === "undefined" || !ATLC)
return 4 * 60000;
var a0 = Math.atan2(FA.z - ATLC.z, FA.x - ATLC.x), a1 = Math.atan2(FB.z - ATLC.z, FB.x - ATLC.x), da = Math.abs(a1 - a0);
if (da > Math.PI)
da = 2 * Math.PI - da;
var d = da * FA.street + Math.abs(FA.street - FB.street) + 20;
return Math.max(3, Math.min(15, d / 1.35 / 60)) * 60000;
},
function (c, arg, via) {
if (!c || !c.name || c.deity || c.archetype === "deity")
return null;
var w = mtgWho(c), parts = String(arg || "").split("|").map(function (x) { return x.trim(); });
var whole = String(arg || ""), place = mtgPlace(parts[0], "") || mtgPlace(whole, "") || w.work || "";
if (!place || !mtgPlaces().length || mtgPlaces().indexOf(place) < 0)
place = mtgPlace(w.work, "") || "";
if (!place)
return null;
var at = mtgWhen(parts.length > 1 ? parts[1] : whole), what = (parts.length > 2 ? parts.slice(2).join(" ") : "").slice(0, 160);
var m0 = mtgOpen(c.name);
var m = m0 && m0.state === "set" ? m0 : { id: "m" + Date.now().toString(36) + Math.floor(Math.random() * 1e4), name: c.name, state: "set", told: {} };
m.sex = w.sex;
m.age = w.age;
m.title = w.title;
m.work = w.work;
m.persona = w.persona;
var me = typeof twhFrom === "function" ? twhFrom(c.name) : null;
if (me) {
m.rk = me.rk;
m.look = me.look;
}
else {
delete m.rk;
delete m.look;
}
if (m.state === "set")
delete m.from;
m.place = place;
m.what = what || m.what || "";
m.via = via || "text";
m.made = Date.now();
m.at = Math.max(at, Date.now() + mtgWalk(m) + 60000);
if (m !== m0)
mtgStore().push(m);
mtgSave();
if (typeof setStatus === "function")
setStatus("📅 <b>" + esc(c.name) + "</b> will meet you at <b>" + esc(place) + "</b> at " + mtgClock(m.at) + mtgDay(m.at) + (m.what ? " (" + esc(m.what) + ")" : "") + ". Phone > Town > Meetings.");
return m;
},
function (c, voice) {
var L = mtgPlaces(), ex = ["The Bakery", "The Tavern", "The Somnucor Inn", "The Mill"].filter(function (p) { return L.indexOf(p) >= 0; });
var m = c && mtgOpen(c.name);
return (voice ? " On the phone" : " Over text") + " you cannot do any of the tagged actions but one: you may arrange to meet them in person. Only when you both agree to meet, end your reply with [[MEET: place | time | what it is about]]," +
" where the place is a real place in Somnucor" + (ex.length ? " (such as " + ex.join(", ") + ")" : "") + (c && c.stfPlace ? " or your own workplace, " + c.stfPlace : "") +
", and the time is on the city clock (it is " + mtgClock(Date.now()) + " now). You will really walk there and wait for them, so never agree to meet without the tag and never promise to come anywhere any other way." +
(m ? " You already have a meeting with them: " + m.place + " at " + mtgClock(m.at) + mtgDay(m.at) + (m.what ? ", about " + m.what : "") + ". Keep to it; if you both change it, send the new tag." : "");
},
function (m, t) {
if (typeof fpsStore !== "function")
return;
var T = fpsStore(), L = T.log[m.name] || (T.log[m.name] = []);
L.push({ t: t, at: Date.now() });
T.unread[m.name] = (T.unread[m.name] || 0) + 1;
if (typeof fpsSave === "function")
fpsSave();
if (typeof fpsBadge === "function")
fpsBadge();
if (typeof fpsToast === "function")
fpsToast(m.name, t);
if (typeof PH !== "undefined" && PH.open && PH.tab === "town" && typeof phPaint === "function")
phPaint(true);
},
function (m) {
var now = Date.now(), go = m.at - mtgWalk(m);
if (m.state === "met")
return now - (m.lastTalk || m.metAt) > 3 * 60000 ? "done" : "met";
if (m.state !== "set")
return m.state;
if (now < go)
return "before";
if (now < m.at)
return "walking";
if (now < m.at + MTG_WAIT * 60000)
return "waiting";
return "missed";
},
function (m) {
if (typeof buildFigure !== "function" || typeof randomLook !== "function")
return null;
var L = null;
if (m.look)
L = JSON.parse(JSON.stringify(m.look));
else {
for (var i = 0; i < 16; i++) {
L = randomLook("mtg_" + m.name + "_" + i, "human");
if (!m.sex || L.sex === m.sex)
break;
}
L.age = "adult";
}
var g;
try {
g = buildFigure({ id: "__mtg_" + m.id, archetype: "human", attrs: {}, look: L, solid: false, detail: (typeof LITE !== "undefined" && LITE) ? 2 : 3, nights: [] }, 1);
}
catch (e) {
return null;
}
g.traverse(function (o) { o.raycast = function () { }; });
g.userData.lcyName = m.name;
try {
var cv = document.createElement("canvas");
cv.width = 256;
cv.height = 48;
var x = cv.getContext("2d");
x.fillStyle = "rgba(20,14,30,.75)";
x.fillRect(0, 0, 256, 48);
x.fillStyle = "#F2E6C8";
x.font = "600 22px system-ui,sans-serif";
x.textAlign = "center";
x.fillText(m.name, 128, 31);
var sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(cv), transparent: true, depthWrite: false }));
sp.scale.set(1.6, 0.3, 1);
sp.position.y = 2.15;
sp.raycast = function () { };
g.add(sp);
}
catch (e) { }
return g;
},
function (m, st) {
if (typeof cinFrontOf !== "function")
return null;
var FB = cinFrontOf(m.place);
if (!FB)
return null;
var spot = cinAt(FB, 2.2, 1.6);
if (st === "walking") {
var w = mtgWalk(m), f = Math.max(0, Math.min(1, 1 - (m.at - Date.now()) / w)), P0 = mtgFrom(m), FA = P0 && typeof ATLC !== "undefined" && ATLC ? mtgPt(P0) : m.work && m.work !== m.place ? cinFrontOf(m.work) : null;
if (FA && typeof cinRoute === "function") {
var R = cinRoute(FA, FB, f, spot);
return { x: R.x, z: R.z, face: R.face, walk: f < 1 };
}
var p = cinAt(FB, 2.2, 1.6 - 40 * (1 - f));
return { x: p.x, z: p.z, face: Math.atan2(FB.sx, FB.sz), walk: f < 1 };
}
return { x: spot.x, z: spot.z, face: FB.face, walk: false };
},
function (m) {
if (typeof wTalk !== "function")
return;
var how = { text: "by text", call: "on the phone", talk: "when you last spoke", asked: "by text" }[m.via] || "by text";
var persona = m.persona + " You arranged " + how + " to meet the dreamer here at " + m.place + " at " + mtgClock(m.at) + (m.what ? ", about: " + m.what : "") +
". You came, and they have just walked up to you. Greet them as someone who has been expecting them, and get on with what you agreed, in person, now.";
wTalk({ name: m.name, persona: persona, greet: "", doing: "meeting the dreamer at " + m.place });
(store.characters || []).forEach(function (x) { if (x.wKey === "wtalk:" + m.name) {
x.details[0] = persona;
if (m.sex)
x.ftkSex = m.sex;
if (m.age)
x.ftkAge = m.age;
if (m.title)
x.stfTitle = m.title;
if (m.work)
x.stfPlace = m.work;
} });
if (m.state === "set") {
m.state = "met";
m.metAt = Date.now();
mtgSave();
}
mtgButton(null);
},
function (m) {
var st = mtgStage(m), first = m.name.split(" ")[0];
return { before: "⏳ " + first + " sets off from " + (m.rk ? "wherever they are then" : m.work && m.work !== m.place ? m.work : "nearby") + " at " + mtgClock(m.at - mtgWalk(m)) + mtgDay(m.at - mtgWalk(m)),
walking: "🚶 " + first + " is on the way", waiting: "🕰️ " + first + " is there, waiting for you (till " + mtgClock(m.at + MTG_WAIT * 60000) + ")",
met: "✔️ You met", done: "✔️ You met", missed: "⚠️ You missed it: " + first + " waited half an hour", off: "✖️ Called off" }[st] || st;
},
function (name, place, at, what) {
if (typeof fpsChar !== "function")
return;
var c = fpsChar(name), m = mtgMake(c, place + " | " + mtgClock(at) + (at - Date.now() > 20 * 3600000 ? " tomorrow" : "") + " | " + (what || ""), "asked");
if (!m)
return;
var T = fpsStore(), L = T.log[name] || (T.log[name] = []);
L.push({ me: 1, t: "Can we meet at " + m.place + " at " + mtgClock(m.at) + mtgDay(m.at) + "?" + (m.what ? " It's about " + m.what + "." : ""), at: Date.now() });
fpsSave();
var ok = ["See you at " + m.place + " at " + mtgClock(m.at) + "!", "Yes, that works. " + m.place + ", " + mtgClock(m.at) + ". I'll be there.", "Done. I'll meet you outside " + m.place + " at " + mtgClock(m.at) + "."][Math.floor(Math.random() * 3)];
FPS.busy = true;
if (typeof phPaint === "function")
phPaint(true);
var key = typeof okyKey === "function" ? okyKey() : "", cf = typeof cfg === "function" ? cfg() : { mode: "off" }, quiet = !key && typeof okyQuiet === "function" && okyQuiet();
var may = key || (!quiet && cf.mode !== "off" && typeof aiBought === "function" && aiBought());
var p = may && typeof fpsAsk === "function" ? fpsAsk(c, L, "They have just asked to meet you at " + m.place + " at " + mtgClock(m.at) + mtgDay(m.at) + (m.what ? " about " + m.what : "") + ". It is agreed and set, and you will really be there: say yes, in your own words, in one short line, with no tag.") : Promise.resolve(ok);
MTG.asking = true;
p.then(function (t) { MTG.asking = false; if (!t || /^(mm-hm|is that so|right, right|fair enough)/i.test(t))
t = ok; L.push({ t: t, at: Date.now() }); FPS.busy = false; fpsSave(); if (typeof phPaint === "function")
phPaint(true); });
},
function (id) {
var m = mtgStore().filter(function (x) { return x.id === id; })[0];
if (!m)
return;
m.state = "off";
mtgSave();
if (typeof fpsStore === "function") {
var T = fpsStore(), L = T.log[m.name] || (T.log[m.name] = []);
L.push({ me: 1, t: "Sorry, I can't make it to " + m.place + " after all.", at: Date.now() });
L.push({ t: ["No problem, another time!", "Ah, shame. Another day then.", "That's fine. Let me know when suits."][Math.floor(Math.random() * 3)], at: Date.now() + 1 });
fpsSave();
}
if (typeof phPaint === "function")
phPaint(true);
}
];
});
