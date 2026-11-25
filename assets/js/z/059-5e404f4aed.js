/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(59, function () {
"use strict";
return [
function (chunk) {
if (!chunk || chunk.length < 3)
return 0;
chunk = deaccent(chunk);
var low = " " + chunk.toLowerCase().replace(/[^a-z\s'-]/g, " ").replace(/\s+/g, " ") + " ";
var rawLow = low;
var spats = [];
SPATIAL.forEach(function (sp) {
var re = new RegExp(sp[0].source, "g"), m;
while ((m = re.exec(low)) !== null) {
spats.push({ at: m.index, rel: sp[1], n: sp[2] });
low = low.slice(0, m.index) + new Array(m[0].length + 1).join("\u0000") + low.slice(m.index + m[0].length);
re.lastIndex = m.index + m[0].length;
}
});
spats.sort(function (a, b) { return a.at - b.at; });
var looks = appearanceIn(low);
looks.forEach(function (L) {
low = low.slice(0, L.at) + new Array(L.end - L.at + 1).join("\u0000") + low.slice(L.end);
});
var partCols = partColoursIn(low);
partCols.forEach(function (P) { low = low.slice(0, P.at) + new Array(P.end - P.at + 1).join("\u0000") + low.slice(P.end); });
var crossings = realmSwitchesIn(low), ci = 0;
crossings.forEach(function (S) { low = low.slice(0, S.at) + new Array(S.end - S.at + 1).join("\u0000") + low.slice(S.end); });
function crossUpTo(pos) {
while (ci < crossings.length && crossings[ci].at < pos) {
var S = crossings[ci++];
var guide = (S.kind && lastDeity && S.at - lastDeityAt < 160) ? lastDeity : null;
if (S.kind)
enterRealm(S.kind, S.secret, S.via, guide);
else
leaveRealm();
}
}
var found = [];
deitiesIn(low).forEach(function (G) {
found.push({ at: G.at, arch: DEITY[G.key].dragon ? "dragon" : "deity", word: G.word, deity: G.key });
low = low.slice(0, G.at) + new Array(G.end - G.at + 1).join("\u0000") + low.slice(G.end);
});
var lastDeity = null, lastDeityAt = -1;
PHRASES.forEach(function (pr) {
var needle = " " + pr[0] + " ", idx = 0;
while ((idx = low.indexOf(needle, idx)) > -1) {
found.push({ at: idx, len: needle.length, arch: pr[1], word: pr[0] });
low = low.slice(0, idx + 1) + "\u0000".repeat(needle.length - 2) + low.slice(idx + needle.length - 1);
idx += needle.length - 1;
}
});
var NUMW = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12,
thirteen: 13, fourteen: 14, fifteen: 15, twenty: 20, thirty: 30, forty: 40, fifty: 50, single: 1, double: 2 };
var levelsAt = [], lre = /\b(\d{1,3}|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|twenty|thirty|forty|fifty|single|double)[\s-]*(?:stor(?:e?y|ies|eys)|floors?|levels?|flights?)\b/g, lm;
while ((lm = lre.exec(low)))
levelsAt.push({ at: lm.index, lv: Math.max(1, Math.min(120, NUMW[lm[1]] || parseInt(lm[1], 10))) });
var mods = [];
Object.keys(MODIFIERS).forEach(function (m) {
var needle = " " + m + " ", idx = 0;
while ((idx = low.indexOf(needle, idx)) > -1) {
mods.push({ at: idx, m: m });
idx += needle.length - 1;
}
});
mods.sort(function (a, b) { return a.at - b.at; });
mods.forEach(function (md, i) {
var nx = mods[i + 1];
if (/^(dark|pale|deep|light|bright)$/.test(md.m) && nx && NAMED[nx.m] !== undefined && nx.at - md.at <= md.m.length + 2) {
md.skip = true;
nx.shade = (md.m === "dark" || md.m === "deep") ? -0.35 : 0.3;
}
});
found.sort(function (a, b) { return a.at - b.at; });
var doorBefore = {};
var farMap = (typeof distancesIn === "function")
? shareDistances(distancesIn(rawLow), found.filter(function (q) { return KIT[q.arch] && KIT[q.arch].cat === "structure"; }), rawLow)
: null;
for (var di = found.length - 1; di >= 0; di--) {
var fd = found[di], owned = false;
if (!((/door/.test(fd.word) && (fd.arch === "portal" || !/secret|hidden|concealed|trap|false/.test(fd.word))) || (fd.arch === "vaultdoor" && /round door/.test(fd.word))))
continue;
for (var dk = di + 1; dk < found.length; dk++) {
var fn2 = found[dk];
if (fn2.at - fd.at > 80)
break;
if (KIT[fn2.arch] && KIT[fn2.arch].cat === "structure") {
if (OWNED_DOOR.test(rawLow.slice(Math.max(0, fd.at - 32), fd.at + 1))) {
doorBefore[fn2.at] = rawLow.slice(Math.max(0, fd.at - 42), fd.at + 14);
found.splice(di, 1);
owned = true;
}
break;
}
}
if (owned)
continue;
for (var dj = di - 1; dj >= 0; dj--) {
var fo = found[dj];
if (fd.at - fo.at > 80)
break;
if (KIT[fo.arch] && KIT[fo.arch].cat === "structure") {
if (OWNED_DOOR.test(rawLow.slice(Math.max(0, fd.at - 32), fd.at + 1)))
found.splice(di, 1);
break;
}
}
}
looks.forEach(function (L) {
var best = null, bd = Infinity;
found.forEach(function (f) {
if (!PEOPLE[f.arch])
return;
var d = L.at > f.at ? (L.at - f.at) : (f.at - L.at) * 1.5;
if (d < bd && d < 110) {
bd = d;
best = f;
}
});
if (best) {
best.look = best.look || {};
best.look[L.field] = L.value;
}
});
partCols.forEach(function (P) {
var best = null;
found.forEach(function (f) { if (f.at < P.at && P.at - f.at < 140 && KIT[f.arch] && KIT[f.arch].cat === "structure")
best = f; });
if (best) {
(best.partAttrs = best.partAttrs || {})[P.key] = P.c;
return;
}
var lone = PART_ALONE[P.part];
if (lone && KIT[lone])
found.push({ at: P.at, arch: lone, word: P.part, partAttrs: { c: P.c } });
});
found.sort(function (a, b) { return a.at - b.at; });
spats.forEach(function (sp) {
var best = null, bd = Infinity;
found.forEach(function (f) {
var d = Math.abs(sp.at - f.at) * (sp.at > f.at ? 1 : 1.6);
if (d < bd) {
bd = d;
best = f;
}
});
sp.owner = best ? best.at : null;
});
var fired = 0, prev = -1;
found.forEach(function (f) {
crossUpTo(f.at);
var attrs = {};
mods.forEach(function (md) {
if (md.skip || !(md.at > prev && md.at < f.at))
return;
var v = Object.assign({}, MODIFIERS[md.m]);
if (md.shade && v.c !== undefined)
v.c = shade(v.c, md.shade);
Object.assign(attrs, v);
});
if (f.word === "log cabin")
attrs.m = "wood";
if (f.partAttrs)
Object.assign(attrs, f.partAttrs);
levelsAt.forEach(function (L) {
if ((L.at > prev && L.at < f.at) || (L.at > f.at && L.at - f.at < 24))
attrs.lv = L.lv;
});
var dirs = [];
for (var si = 0; si < spats.length; si++)
if (spats[si].owner === f.at)
dirs.push(spats[si]);
if (KIT[f.arch] && KIT[f.arch].cat === "structure") {
var fi = found.indexOf(f), nextAt = fi > -1 && fi + 1 < found.length ? found[fi + 1].at : low.length;
var faceSeg = rawLow.slice(f.at, Math.min(nextAt, f.at + 160));
var howFar = farMap ? farMap[f.at] : null;
Object.assign(attrs, openingsFrom(faceSeg));
Object.assign(attrs, facadeFrom(faceSeg, INSIDE_CUE.test(faceSeg)));
if (doorBefore[f.at]) {
var pre = openingsFrom(doorBefore[f.at]);
if (pre.ds !== undefined && attrs.ds === undefined)
attrs.ds = pre.ds;
if (pre.dc !== undefined && attrs.dc === undefined)
attrs.dc = pre.dc;
}
}
if ((INDOOR_ONLY[f.arch] || (f.arch === "portal" && /mirror/.test(f.word))) &&
(/\b(inside|indoors|room|hallway|corridor|upstairs|downstairs|kitchen|bedroom|living room|ballroom|attic|basement)\b/.test(rawLow.slice(Math.max(0, f.at - 70), f.at)) || /^ *[a-z]* ?room\b/.test(rawLow.slice(f.at + f.word.length + 1, f.at + f.word.length + 12)))) {
prev = f.at;
return;
}
if (f.arch === "bicycle" && /\b(rode|riding|ride|on a bike|on a bicycle|on his bike|on her bike|cycling|pedalling|pedaling)\b/
.test(rawLow.slice(Math.max(0, f.at - 60), f.at + 60)))
attrs.ridden = 1;
if (f.arch === "driveway") {
var hm = store.lastId ? specById(store.lastId) : null;
if (hm && DRIVEWAYED[hm.archetype]) {
ensureDriveway(hm);
prev = f.at;
return;
}
}
if (f.deity) {
var dsp = placeDeity(f.deity, attrs, { dir: dirs.length ? dirs : null, look: f.look || null });
if (dsp) {
lastDeity = dsp;
lastDeityAt = f.at;
fired++;
}
prev = f.at;
return;
}
var art = articleBefore(low, f.at);
var fresh = /\b(another|other|different|second|third|new)\s*$/.test(low.slice(Math.max(0, f.at - 22), f.at));
var again = (art !== "indefinite" && !fresh) ? findExisting(f.arch, f.word) : null;
if (again) {
var grew = false;
if (PEOPLE[again.archetype] && (f.look || sexOfWord(f.word))) {
applyLook(again, f.look, sexOfWord(f.word));
grew = true;
}
for (var k in attrs) {
if (again.attrs[k] === undefined) {
again.attrs[k] = attrs[k];
grew = true;
}
}
again.detail = (again.detail || 1) + 1;
if (grew || again.detail === 2)
refresh(again);
}
else {
if (/\b(hidden|secret|concealed|veiled)\s*$/.test(low.slice(Math.max(0, f.at - 14), f.at)))
attrs.hidden = 1;
place(f.arch, f.word, attrs, { dir: dirs.length ? dirs : null, forceNew: fresh, look: f.look || null, sex: sexOfWord(f.word),
away: (typeof howFar !== "undefined") ? howFar : null });
fired++;
}
prev = f.at;
});
crossUpTo(Infinity);
if (!crossings.length && typeof crossingHint === "function") {
var hint = crossingHint(low);
if (hint && typeof setStatus === "function")
setStatus(hint);
}
var raw = chunk.toLowerCase();
EMOTIONS.forEach(function (e) { if (raw.indexOf(e) > -1 && store.emotions.indexOf(e) === -1)
store.emotions.push(e); });
LUCID.forEach(function (l) { if (raw.indexOf(l) > -1)
store.lucidity = Math.max(store.lucidity, 2); });
return fired;
},
function (low, at) {
var before = low.slice(Math.max(0, at - 24), at).trim();
var words = before.split(/\s+/);
for (var i = words.length - 1; i >= 0 && i >= words.length - 3; i--) {
var w = words[i];
if (INDEFINITE.indexOf(w) > -1)
return "indefinite";
if (DEFINITE.indexOf(w) > -1)
return "definite";
if (/'s$|s'$/.test(w))
return "definite";
}
return "none";
},
function () {
return [
"You read a remembered dream fragment and return the physical world it implies.",
"Return ONLY valid JSON, no prose, no markdown fences:",
'{"objects":[{"archetype":"","label":"","name":"","sign":"","attrs":{"h":1,"w":1,"d":1,"s":1,"lv":2,"c":"#RRGGBB"}}],"people":[{"label":"","role":"","shift":"day|night|none","livesAt":"","worksAt":"","doing":""}],"newArchetypes":[{"key":"","cat":"","size":[1,1,1],"parts":[{"g":"box","s":[1,1,1],"p":[0,0,0],"c":"#RRGGBB"}]}],"emotions":[""],"lucidity":0}',
"archetype should be exactly one of: " + archList() + " whenever one of those is truly what the dreamer meant.",
"Whenever the dreamer names a specific physical thing whose look is not truly on that list, invent it rather than settling for something generic: a firehouse is not a house, a firetruck is not a truck, a carousel is not a tower, a jabberwock is not a dragon. Set archetype to a short new key of your own (lowercase letters and digits only, under 20 characters, not already on the list) and add one matching entry for it to newArchetypes so it is built exactly as it should look. Ordinary people are never invented: use the people array for them.",
"A newArchetypes entry: key matches the archetype you invented. cat is structure for a building, nature for a living or grown thing, infra for an object, fixture or piece of furniture, vehicle for something that is ridden or driven, being for a creature or beast. size is its overall width, height and depth in metres (0.2 to 200), true to life. parts is 6 to 30 solid shapes that make it unmistakable, with its distinctive features: a firehouse has wide red bay doors, a hose tower and a bell; a firetruck has a red cab, ladders on top, lights and wheels. g is box (s=[width,height,depth]), cyl (s=[radiusTop,radiusBottom,height]), cone (s=[radius,height]), sph (s=[radius]) or tor (s=[radius,tube]). p is that part's centre in metres from the ground at the object's own middle (x across, y up and never negative, z toward its front). r is an optional rotation [x,y,z] in radians. c is its true colour as a hex string.",
"Read the dreamer's words the way a person would. Joined-up and compound words mean what they say: a firehouse is a fire station with bay doors and a fire engine, a treehouse is a small house up in a tree, a schoolyard is the school's grounds, a backyard is the lawn and fence behind a house, a laundromat is a shop of washing machines. A place made of many things is built as those things, each as its own object: a neighbourhood is a street lined with six to ten houses, driveways, trees and parked cars; a village is cottages, a church, a well and a shop; downtown is tall buildings, offices, shops, a bank, streetlights and traffic; a strip mall is a row of four to six shops and a car park; a farm is a farmhouse, a barn, fields, fences and animals; a harbour is piers, boats, cranes and warehouses. Counts are kept: six houses is six objects, lots of trees is six to ten trees.",
"Invent a key only once per fragment: if the same new thing comes up again in it, reuse the key you already gave it rather than inventing it twice.",
"label is the dreamer's own words for the thing, short.",
"sign is any lettering visible on it, else omit.",
"attrs are multipliers around 1 - h height, w width, d depth, s overall scale. lv is the number of floors, only if stated. Omit what you cannot infer.",
"c is an approximate colour only if described or strongly implied.",
"lucidity: 0 none, 1 faint unease, 2 knew it was a dream, 3 partial control, 4 full control.",
"name is the proper name of the place ONLY if the dreamer gave one. Never invent a name.",
"people: every person, animal or presence in the fragment. role is their stated occupation if given, else omit. shift is day or night ONLY if the dream said when they are about, else \"none\". livesAt and worksAt are place names ONLY if the dream said. doing is what they were doing, in the dreamer\u2019s words.",
"This is the strict rule: report only what the fragment states or unmistakably implies. Leave a field out rather than filling it. An empty field is correct; an invented one is not.",
"Include only what is actually present in the fragment. Do not invent scenery.",
"The dreamer's dreams contain magic, secret ways and impossible things. Take them literally. A hidden door is a hidden door, not a metaphor.",
"passages: any way the dreamer moved between two named places. kind is door, stairs, street, portal, secret or fall. Use portal when the way is not physically possible, secret when it was hidden. Only report ways actually travelled or described.",
"Add a passages array: [{\"from\":\"\",\"to\":\"\",\"kind\":\"\"}] using place names as given."
].join(" ");
},
function () {
AI_WAITING = true;
aiSay(AI_AWAY_WORDS, true);
if (++aiAwayTries > 3)
return;
clearTimeout(aiAwayRetry);
aiAwayRetry = setTimeout(function () { if (AI_WAITING && navigator.onLine !== false) {
AI_WAITING = false;
scheduleParse(500);
} }, 60000);
},
function (delay) {
if (cfg().mode === "off")
return;
if (!aiBought()) {
clearTimeout(parseTimer);
parseTimer = setTimeout(function () { if (typeof aiNotBought === "function")
aiNotBought("ai"); }, delay || 2000);
return;
}
if (typeof navigator !== "undefined" && navigator.onLine === false) {
AI_WAITING = true;
setTimeout(function () { aiSay(AI_AWAY_WORDS, true); }, 400);
return;
}
if (cfg().mode === "app" && typeof freshToken === "function" && tokenAge() >= 45 * 60 * 1000)
freshToken();
clearTimeout(parseTimer);
parseTimer = setTimeout(runParse, delay || 2000);
},
function (text) {
var out = [], seenT = {};
function add(t) { var k = t.toLowerCase(); if (seenT[k] || out.length >= 8)
return; seenT[k] = 1; out.push(t); }
var re = /\b([A-Z][a-zA-Z'’-]+(?:\s+(?:of|the|de|du|la|le|von|van)?\s*[A-Z][a-zA-Z'’-]+)*)/g, m;
while ((m = re.exec(text))) {
var t = m[1].trim(), first = t.split(/\s+/)[0];
if (t.split(/\s+/).length === 1 && LOOKUP_SKIP.test(t))
continue;
if (LOOKUP_SKIP.test(first) && t.split(/\s+/).length > 1)
t = t.split(/\s+/).slice(1).join(" ");
if (/^(I|A)$/.test(t))
continue;
var before = text.slice(Math.max(0, m.index - 2), m.index);
var startOfSentence = m.index === 0 || /[.!?]\s*$/.test(text.slice(Math.max(0, m.index - 3), m.index));
if (startOfSentence && t.split(/\s+/).length === 1 && !/^[A-Z][a-z]+$/.test(t))
continue;
if (startOfSentence && t.split(/\s+/).length === 1)
continue;
add(t);
}
var low = text.toLowerCase();
Object.keys(DREAM_UNKNOWN).map(function (k) { return DREAM_UNKNOWN[k]; })
.filter(function (x) { return low.indexOf(x.w.toLowerCase()) > -1; })
.sort(function (a, b) { return b.n - a.n || b.at - a.at; }).forEach(function (x) { add(x.w); });
return out;
},
function (p) {
if (Array.isArray(p))
p = { objects: p };
if (!p || typeof p !== "object")
return { objects: [] };
function lowerKeys(o) { var r = {}; Object.keys(o || {}).forEach(function (k) { r[k.toLowerCase().replace(/[^a-z]/g, "")] = o[k]; }); return r; }
function findArr(o, names, depth) {
if (!o || typeof o !== "object" || depth > 3)
return null;
var L = lowerKeys(o);
for (var i = 0; i < names.length; i++)
if (Array.isArray(L[names[i]]))
return L[names[i]];
for (var k in o) {
if (o[k] && typeof o[k] === "object" && !Array.isArray(o[k])) {
var got = findArr(o[k], names, depth + 1);
if (got)
return got;
}
}
return null;
}
var out = Object.assign({}, p);
out.objects = findArr(p, ["objects", "things", "items", "places", "buildings", "scene", "world"], 0) || [];
out.people = findArr(p, ["people", "characters", "beings", "persons", "figures"], 0) || [];
out.newArchetypes = findArr(p, ["newarchetypes", "archetypes", "newforms", "designs", "inventions"], 0) || [];
out.objects = out.objects.map(function (o) {
if (typeof o === "string")
return { archetype: o.toLowerCase().replace(/[^a-z0-9]/g, ""), label: o };
o = Object.assign({}, o);
var L = lowerKeys(o);
if (!o.archetype)
o.archetype = String(L.archetype || L.type || L.kind || L.key || L.name || "").toLowerCase().replace(/[^a-z0-9]/g, "");
if (!o.label)
o.label = L.label || L.name || L.description || o.archetype;
return o;
}).filter(function (o) { return o.archetype; });
out.newArchetypes = out.newArchetypes.filter(function (a) { return a && a.key && Array.isArray(a.parts); });
var L0 = lowerKeys(p);
if (!out.weather && typeof L0.weather === "string")
out.weather = L0.weather;
if (!out.disasters && Array.isArray(L0.disasters))
out.disasters = L0.disasters;
return out;
},
function (e) {
var m = String((e && e.message) || e || ""), st = (e && e.status) || 0;
if (st === 429 || /rate[ _-]?limit|too many/i.test(m)) {
var w = /try again in\s*(?:(\d+)h)?\s*(?:(\d+)m)?\s*(?:([\d.]+)s)?/i.exec(m), ms = 0;
if (w)
ms = ((+w[1] || 0) * 3600 + (+w[2] || 0) * 60 + (+w[3] || 0)) * 1000;
if (!ms)
ms = /per day|\bTPD\b|\bRPD\b/i.test(m) ? 15 * 60 * 1000 : 60 * 1000;
AI_COOL_UNTIL = Math.max(AI_COOL_UNTIL, Date.now() + Math.min(ms, 6 * 3600 * 1000));
return "it is busy for a while";
}
if (st === 402)
return "it is for dreamers who have bought SomnuMatrix";
if (/failed to fetch|networkerror|load failed/i.test(m))
return "it could not be reached";
if (st >= 500)
return "the server had a hiccup";
return "it did not answer";
},
function (retry) {
var c = cfg(), text = store.transcript.trim();
if (!text || c.mode === "off")
return;
if (!aiBought()) {
if (typeof aiNotBought === "function")
aiNotBought("ai");
return;
}
if (c.mode === "app" && typeof freshToken === "function" && tokenAge() >= 55 * 60 * 1000 && Date.now() - parseTokAt > 60000) {
parseTokAt = Date.now();
return freshToken().then(function () { runParse(retry || 0); });
}
var T = llmTarget(c), url = T.url, headers = T.headers;
if (!url) {
aiSay("<i>The AI has no address set, so only the quick version is built.</i>");
return;
}
if (c.mode === "direct" && !c.key) {
setStatus("<i>No key set.</i>");
return;
}
aiSay("<b>The city's AI is reading your dream&hellip;</b>", true);
var sys = buildSys() + (retry && retry !== 0 ? " Keep the answer short: at most 12 parts for any new thing. Your answer MUST be one JSON object whose \"objects\" array lists every physical thing, place and creature in the dream; an empty objects list is never correct when the dream names things." : "") +
" Anything at all may appear in a dream: if a thing is not on the archetype list, design it yourself from what you know of it, or from what was looked up for you, and never leave it out.";
var terms = [];
try {
terms = lookupTerms(text);
}
catch (e) { }
if (terms.length)
aiSay("<b>The city's AI is looking up</b> " + terms.slice(0, 4).map(esc).join(", ") + (terms.length > 4 ? "&hellip;" : "") + " <b>and reading your dream&hellip;</b>", true);
var bodyObj = llmBody(c, { temperature: 0.2, max_tokens: 8000, messages: [{ role: "system", content: sys }, { role: "user", content: text }] });
if (c.mode === "app" && terms.length)
bodyObj.lookup = terms;
if (!AI_NO_JSONMODE)
bodyObj.response_format = { type: "json_object" };
fetch(url, { method: "POST", headers: headers, body: JSON.stringify(bodyObj) })
.then(function (r) { if (!r.ok)
return r.text().then(function (t) { var e = new Error(r.status + " " + t.slice(0, 160)); e.status = r.status; throw e; }); return r.json(); })
.then(function (d) {
var raw = (d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content) || "";
window.__lastAI = raw;
if (!String(raw).trim()) {
var e0 = new Error("the AI sent back an empty answer");
e0.raw = JSON.stringify(d).slice(0, 200);
throw e0;
}
var p = aiNormal(aiJson(raw));
p.__looked = (d.somnu_lookups || []).map(function (x) { return x.term; });
p.__server = d.somnu_v;
p.__app = c.mode === "app";
if (!(p.objects || []).length && !(p.people || []).length && !(p.newArchetypes || []).length) {
var e1 = new Error("the AI's answer listed nothing to build");
e1.raw = String(raw).slice(0, 200);
throw e1;
}
var before = store.objects.length;
reconcile(p);
APP_LLM_DOWN = 0;
aiAwayTries = 0;
var made = (p.objects || []).length, fresh = (p.newArchetypes || []).length;
var looked = (d.somnu_lookups || []).map(function (x) { return esc(x.term) + " <span style='opacity:.7'>(" + esc(x.source) + ")</span>"; });
aiSay("<b>The AI has read your dream.</b> " + made + " thing" + (made === 1 ? "" : "s") + " understood" + (fresh ? (", " + fresh + " designed new") : "") + "." +
(looked.length ? (" Looked up: " + looked.join(", ") + ".") : ""));
})
.catch(function (e) {
var m = String(e.message || e);
var tries = (retry === true ? 1 : (+retry || 0));
if (e.status === 402 && c.mode === "app") {
if (typeof accessDenied === "function")
accessDenied();
if (typeof aiNotBought === "function")
aiNotBought("ai");
else
aiSay("<i>Built from the catalogue; buy SomnuMatrix to have the AI build the rest.</i>");
return;
}
if (e.status === 400 && /response_format|json/i.test(m) && !AI_NO_JSONMODE) {
AI_NO_JSONMODE = true;
return runParse(tries);
}
if (typeof navigator !== "undefined" && navigator.onLine === false)
return aiAway();
if (!e.status && /failed to fetch|networkerror|load failed|network request failed/i.test(m))
return aiAway();
if (e.status === 429 && typeof aiPlainWhy === "function") {
aiPlainWhy(e);
if (AI_COOL_UNTIL - Date.now() > 30000)
tries = 3;
}
if (tries < 3 && (!e.status || e.status >= 500 || e.status === 429 || /cut short|not readable|empty answer|listed nothing/.test(m))) {
aiSay("<i>The AI is taking a moment&hellip; asking again.</i>", true);
return setTimeout(function () { runParse(tries + 1); }, [2500, 6000, 12000][tries]);
}
if (c.mode === "app") {
APP_LLM_DOWN = Date.now();
var st = e.status || 0, low = m.toLowerCase(), why;
if (/invalid_api_key|invalid api key|api key/i.test(m))
why = "Groq says the AI key on the server is wrong or expired: set a new GROQ_API_KEY secret";
else if (/jwt|authorization header/i.test(m))
why = "Supabase wants a sign-in token: JWT verification is still on for dream-parse";
else if (/groq_api_key is not set/i.test(m))
why = "the server has no GROQ_API_KEY secret";
else if (/model.*(not found|does not exist|decommission)|model_not_found/i.test(m))
why = "Groq no longer offers that model";
else if (st === 429 || /rate limit|too many/i.test(low))
why = "it is busy for a moment";
else if (/failed to fetch|networkerror|load failed/i.test(low))
why = "it could not be reached";
else if (e.raw)
why = m + "; it said: " + e.raw.slice(0, 140);
else
why = "server said " + m.slice(0, 140);
if (window.console)
console.info("[AI] full answer from the server:", m);
if (typeof amKeeper === "function" && amKeeper())
aiSay("<i>The AI didn't answer (" + esc(why) + "). What you see is the quick version; it will try again with your next words.</i>");
else
aiSay("<i>The AI didn't answer just now. What you see is built from the catalogue; it will try again with your next words.</i>");
return;
}
if (/Failed to fetch|NetworkError|CORS/i.test(m))
setStatus("<i>The browser blocked that call. Use proxy mode.</i>");
else
setStatus("<i>" + esc(m.slice(0, 110)) + "</i>");
});
},
function (p) {
var objs = p.objects || [], used = {}, solid = 0, added = 0, grown = 0;
var newDefs = {};
(p.newArchetypes || []).forEach(function (nd) { if (nd && typeof nd.key === "string" && !newDefs[nd.key])
newDefs[nd.key] = nd; });
objs.forEach(function (o) {
if (!o || !o.archetype)
return;
if (!KIT[o.archetype]) {
var got = typeof growArchetype === "function" ? growArchetype(o.archetype, newDefs[o.archetype], o.label) : null;
if (got)
grown++;
else
o = Object.assign({}, o, { archetype: "dreamplaceholder", sign: o.sign || o.label || o.archetype });
}
var attrs = {};
["h", "w", "d", "s"].forEach(function (k) {
if (o.attrs && typeof o.attrs[k] === "number")
attrs[k] = Math.max(0.2, Math.min(6, o.attrs[k]));
});
if (o.attrs && typeof o.attrs.lv === "number" && o.attrs.lv >= 1)
attrs.lv = Math.min(120, Math.round(o.attrs.lv));
if (o.attrs && o.attrs.c) {
var ci = hexToInt(o.attrs.c);
if (ci !== undefined)
attrs.c = ci;
}
var match = null, want = normName(o.label || "");
if (want)
for (var i = store.objects.length - 1; i >= 0; i--) {
var s1 = store.objects[i];
if (s1.filler || used[s1.id] || s1.archetype !== o.archetype)
continue;
if (normName(s1.label || "") === want || normName(s1.name || "") === want) {
match = s1;
break;
}
}
if (!match)
for (var j = 0; j < store.objects.length; j++) {
var s2 = store.objects[j];
if (s2.filler)
continue;
if (!s2.solid && !used[s2.id] && s2.archetype === o.archetype) {
match = s2;
break;
}
}
if (!match)
for (var q = store.objects.length - 1; q >= 0; q--) {
var s3 = store.objects[q];
if (s3.filler || used[s3.id] || s3.archetype !== o.archetype)
continue;
if (!s3.nights || s3.nights.indexOf(store.session) === -1)
continue;
match = s3;
break;
}
if (match) {
used[match.id] = true;
match.solid = true;
if (o.label)
match.label = o.label;
if (o.name) {
match.name = o.name;
match.named = "stated";
}
if (o.sign)
match.sign = o.sign;
match.attrs = Object.assign({}, match.attrs, attrs);
refresh(match);
solid++;
}
else {
var sp = place(o.archetype, o.label, attrs, { solid: true, sign: o.sign || null, name: o.name || null });
used[sp.id] = true;
added++;
}
});
(p.passages || []).forEach(function (pa) {
if (!pa || !pa.from || !pa.to)
return;
var A = byName(pa.from), B = byName(pa.to);
if (A && B)
addPassage(A.id, B.id, pa.kind || "door", pa.kind === "secret");
});
var lives = 0;
(p.people || []).forEach(function (pe) {
if (!pe || !pe.label)
return;
var n = normName(pe.label), c = null;
for (var i = 0; i < store.characters.length; i++) {
var x = store.characters[i];
if (normName(x.name) === n || x.aka.indexOf(n) > -1) {
c = x;
break;
}
}
if (!c)
return;
if (!c.src)
c.src = {};
if (pe.role) {
c.role = pe.role;
c.src.role = "parsed";
addDetail(c, "is a " + pe.role);
}
if (pe.shift && pe.shift !== "none") {
c.shift = pe.shift;
c.src.shift = "parsed";
addDetail(c, "is about by " + pe.shift);
}
if (pe.doing)
addDetail(c, "was " + pe.doing);
if (pe.livesAt) {
var h = byName(pe.livesAt);
if (h) {
c.home = h.id;
c.src.home = "stated";
}
}
if (pe.worksAt) {
var w = byName(pe.worksAt);
if (w) {
c.work = w.id;
c.src.work = "stated";
}
}
var RANK = { stated: 3, parsed: 2, filled: 1 };
if (!c.routine || (RANK[c.src.routine] || 0) < 2) {
var r = routineFrom((c.details.join(". ") + " " + (pe.doing || "")), c.role, c.shift);
if (r) {
c.routine = r;
c.src.routine = "parsed";
lives++;
}
}
if (pe.shift && pe.shift !== "none") {
var r2 = routineFrom((pe.doing || ""), c.role, pe.shift);
if (r2 && (RANK[c.src.routine] || 0) < 3) {
c.routine = r2;
c.src.routine = "stated";
lives++;
}
}
checkWake(c);
});
(p.emotions || []).forEach(function (e) { if (e && store.emotions.indexOf(e) === -1)
store.emotions.push(e); });
if (typeof p.lucidity === "number")
store.lucidity = Math.max(store.lucidity, p.lucidity);
populate();
save();
updateCount();
var bits = [];
if (solid)
bits.push(solid + " sharpened");
if (added)
bits.push(added + " added");
if (grown)
bits.push(grown + " built for the first time");
if (lives)
bits.push(lives + " given hours");
tickClock(true);
setStatus(bits.length ? "<b>" + bits.join(", ") + "</b>" : "Nothing new in that.");
}
];
});
