/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(143, function () {
"use strict";
return [
function (pt) {
if (!pt || typeof pt !== "object")
return pt;
var q = Object.assign({}, pt);
var g = String(q.g || q.shape || q.type || q.geometry || "").toLowerCase().replace(/[^a-z]/g, "");
if (AID_G[g])
q.g = AID_G[g];
var s = q.s !== undefined ? q.s : (q.size !== undefined ? q.size : q.dims);
if (typeof s === "number" || typeof s === "string")
s = [s];
if (s && typeof s === "object" && !Array.isArray(s))
s = [s.w || s.x || s.width || s.r || s.radius, s.h || s.y || s.height || s.tube, s.d || s.z || s.depth].filter(function (v) { return v !== undefined; });
if (Array.isArray(s)) {
s = s.map(aidNum).filter(function (v) { return v !== null; }).map(function (v) { return aidClamp(Math.abs(v), 0.03, 60); });
if (q.g === "box" && s.length === 1)
s = [s[0], s[0], s[0]];
if (q.g === "ell" && s.length === 1)
s = [s[0], s[0], s[0]];
if (q.g === "ell" && s.length === 2)
s = [s[0], s[1], s[0]];
if (q.g === "cyl" && s.length === 2)
s = [s[0], s[0], s[1]];
if (q.g === "cone" && s.length === 1)
s = [s[0], s[0] * 2];
if (q.g === "tor" && s.length === 1)
s = [s[0], s[0] * 0.25];
q.s = s;
}
var p = q.p !== undefined ? q.p : (q.pos !== undefined ? q.pos : q.position);
if (p && typeof p === "object" && !Array.isArray(p))
p = [p.x, p.y, p.z];
if (Array.isArray(p)) {
p = p.map(function (v) { var n = aidNum(v); return n === null ? 0 : n; });
if (p.length === 2)
p = [p[0], p[1], 0];
if (p.length >= 3)
q.p = [aidClamp(p[0], -120, 120), aidClamp(p[1], 0, 220), aidClamp(p[2], -120, 120)];
}
else
q.p = [0, (q.s && q.s[1] ? q.s[1] / 2 : 0.5), 0];
var r = q.r !== undefined ? q.r : (q.rot !== undefined ? q.rot : q.rotation);
if (r && typeof r === "object" && !Array.isArray(r))
r = [r.x || 0, r.y || 0, r.z || 0];
if (Array.isArray(r)) {
r = r.map(function (v) { var n = aidNum(v); return n === null ? 0 : n; }).slice(0, 3);
while (r.length < 3)
r.push(0);
if (r.some(function (v) { return Math.abs(v) > 6.3; }))
r = r.map(function (v) { return v * Math.PI / 180; });
q.r = r.map(function (v) { return aidClamp(v, -6.28, 6.28); });
}
else
delete q.r;
var c = q.c !== undefined ? q.c : (q.color !== undefined ? q.color : q.colour);
if (typeof c === "string") {
var cw = c.toLowerCase().trim();
if (typeof NAMED !== "undefined" && NAMED[cw] !== undefined)
c = "#" + ("00000" + NAMED[cw].toString(16)).slice(-6);
else if (/^[0-9a-f]{6}$/i.test(cw))
c = "#" + cw;
else if (/^#[0-9a-f]{3}$/i.test(cw))
c = "#" + cw[1] + cw[1] + cw[2] + cw[2] + cw[3] + cw[3];
q.c = c;
}
else if (typeof c === "number")
q.c = "#" + ("00000" + (c >>> 0).toString(16)).slice(-6);
return q;
},
function (def) {
if (!def || typeof def !== "object")
return def;
var d = Object.assign({}, def);
var cat = String(d.cat || d.category || d.kind || "").toLowerCase().replace(/[^a-z]/g, "");
d.cat = AID_CAT[cat] || (CUSTOM_CAT[cat] ? cat : "infra");
var parts = Array.isArray(d.parts) ? d.parts : (Array.isArray(d.shapes) ? d.shapes : null);
if (parts)
d.parts = parts.slice(0, 40).map(aidPart);
var size = d.size;
if (size && typeof size === "object" && !Array.isArray(size))
size = [size.w || size.width || size.x, size.h || size.height || size.y, size.d || size.depth || size.z];
if (Array.isArray(size))
size = size.map(aidNum);
if (!Array.isArray(size) || size.length !== 3 || size.some(function (v) { return v === null; })) {
var x0 = 0, x1 = 0, y1 = 0, z0 = 0, z1 = 0;
(d.parts || []).forEach(function (pt) {
if (!pt || !pt.p || !pt.s)
return;
var S = pt.s, e, up;
if (pt.g === "box") {
e = Math.max(S[0], S[2] || S[0]) / 2;
up = (S[1] || S[0]) / 2;
}
else if (pt.g === "ell") {
e = Math.max(S[0], S[2] || S[0]);
up = S[1] || S[0];
}
else if (pt.g === "cyl") {
e = Math.max(S[0], S[1] || S[0]);
up = (S[2] || S[0]) / 2;
}
else if (pt.g === "cone") {
e = S[0];
up = (S[1] || S[0]) / 2;
}
else {
e = S[0] + (S[1] || 0);
up = e;
}
x0 = Math.min(x0, pt.p[0] - e);
x1 = Math.max(x1, pt.p[0] + e);
z0 = Math.min(z0, pt.p[2] - e);
z1 = Math.max(z1, pt.p[2] + e);
y1 = Math.max(y1, pt.p[1] + up);
});
size = [x1 - x0 || 1, y1 || 1, z1 - z0 || 1];
}
d.size = size.map(function (v) { return aidClamp(Math.abs(v), 0.1, 220); });
return d;
},
function (key, label, why) {
key = aidKeyFor(key, label);
label = String(label || key || "").trim().slice(0, 60);
if (typeof aidModelKind === "function" && aidModelKind(label)) {
setTimeout(function () { aidModelSweep(true); }, 0);
return;
}
if (!key || !label || AID.done[key] || AID.sourced[key])
return;
if ((AID.tries[key] || 0) >= 3)
return;
if (AID.failed[key] && Date.now() - AID.failed[key] < 20000)
return;
if (AID.queue.some(function (j) { return j.key === key || aidFlat(j.label) === aidFlat(label); }))
return;
if (AID.busyJob && (AID.busyJob.key === key || aidFlat(AID.busyJob.label) === aidFlat(label)))
return;
AID.queue.push({ key: key, label: label, why: why || "" });
setTimeout(aidNext, 600);
},
function (o, depth) {
if (!o || typeof o !== "object" || (depth || 0) > 4)
return null;
if (Array.isArray(o.parts) || Array.isArray(o.shapes))
return o;
if (Array.isArray(o)) {
if (o.length && o[0] && (o[0].g || o[0].shape) && (o[0].s || o[0].size))
return { parts: o };
for (var i = 0; i < o.length; i++) {
var a = aidFindDesign(o[i], (depth || 0) + 1);
if (a)
return a;
}
return null;
}
for (var k in o) {
var f = aidFindDesign(o[k], (depth || 0) + 1);
if (f) {
if (!f.cat && o.cat)
f.cat = o.cat;
if (!f.size && o.size)
f.size = o.size;
return f;
}
}
return null;
},
function () {
if (AID.busy || !AID.queue.length)
return;
if (typeof cfg !== "function" || typeof llmTarget !== "function")
return;
var c = cfg();
if (c.mode === "off")
return;
if (typeof aiBought === "function" && !aiBought())
return;
if (typeof navigator !== "undefined" && navigator.onLine === false)
return;
if (typeof aiCooling === "function" && aiCooling()) {
clearTimeout(AID.coolT);
AID.coolT = setTimeout(aidNext, Math.max(5000, AI_COOL_UNTIL - Date.now() + 500));
return;
}
var job = AID.queue.shift();
AID.busy = true;
AID.busyJob = job;
var n = AID.tries[job.key] = (AID.tries[job.key] || 0) + 1;
AID.at[job.key] = Date.now();
var T = llmTarget(c);
if (!T.url) {
AID.busy = false;
AID.busyJob = null;
return;
}
if (typeof aiSay === "function")
aiSay("<b>Looking up " + esc(job.label) + " on the web and designing it&hellip;</b>", true);
var body = llmBody(c, { temperature: 0.2, max_tokens: 8000, messages: [{ role: "system", content: AID_SYS }, { role: "user", content: "Design this, as it truly looks: " + job.label }] });
if (c.mode === "app") {
body.lookup = [job.label];
if (n === 1)
body.design = true;
}
if (!job.plain && (typeof AI_NO_JSONMODE === "undefined" || !AI_NO_JSONMODE))
body.response_format = { type: "json_object" };
fetch(T.url, { method: "POST", headers: T.headers, body: JSON.stringify(body) })
.then(function (r) { if (!r.ok)
return r.text().then(function (t) { var e = new Error(r.status + " " + t.slice(0, 160)); e.status = r.status; throw e; }); return r.json(); })
.then(function (d) {
AID.busy = false;
AID.busyJob = null;
AID.coolSaid = 0;
if (c.mode === "app" && d && d.somnu_v === undefined)
aidServerOld();
var raw = (d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content) || "";
window.__lastDesign = { label: job.label, raw: String(raw).slice(0, 4000) };
if (!String(raw).trim())
throw new Error("the AI sent back an empty answer");
var def = aidDef(aidFindDesign(aiJson(raw)));
var looked = (d.somnu_lookups || [])[0];
if (!def || !Array.isArray(def.parts))
throw new Error("the answer held no design");
if (!aidUse(job, def, looked))
throw new Error("the design had too few sound parts (" + def.parts.length + ")");
setTimeout(aidNext, 400);
})
.catch(function (e) {
AID.busy = false;
AID.busyJob = null;
var m = String((e && e.message) || e);
AID.err[job.key] = m;
if (window.console)
console.warn("[AI design] " + job.label + ": " + m, window.__lastDesign || "");
if (e && e.status === 402)
return;
if (e && e.status === 400 && /json|response_format/i.test(m))
job.plain = true;
var plain = typeof aiPlainWhy === "function" ? aiPlainWhy(e) : "it did not answer";
if (e && e.status === 429) {
AID.tries[job.key] = Math.max(0, (AID.tries[job.key] || 1) - 1);
AID.queue.push(job);
if (!AID.coolSaid) {
AID.coolSaid = 1;
aidFallback(job, plain, true);
}
setTimeout(aidNext, 2500);
return;
}
if ((AID.tries[job.key] || 0) < 3) {
AID.queue.push(job);
setTimeout(aidNext, 2500);
return;
}
aidFallback(job, plain);
setTimeout(aidNext, 2500);
});
},
function (job, why, keep) {
if (!keep) {
AID.tries[job.key] = 0;
AID.failed[job.key] = Date.now();
}
var kind = aidModelFor(job.label), used = false, flat = aidFlat(job.label);
if (kind)
(store.objects || []).forEach(function (sp) {
if (!sp.charId || sp.filler || aidFlat(sp.label || "") !== flat)
return;
sp.archetype = "human";
var L = (typeof lookOf === "function") ? lookOf(sp) : (sp.look || (sp.look = {}));
L.species = kind;
if (!L.src)
L.src = {};
L.src.species = "dream";
if (typeof refresh === "function")
refresh(sp);
used = true;
});
if (used && typeof save === "function")
save();
if (typeof aiSay === "function")
aiSay(used ?
"<b>" + esc(job.label) + "</b> walks about in the city's own model for now; the AI could not design it from its source this time (" + esc(why) + ") and will try again with your next dream." :
"<i>The AI could not design " + esc(job.label) + " this time (" + esc(why) + "). It will try again with your next dream.</i>");
},
function (job, def, looked) {
if (!def || !Array.isArray(def.parts) || def.parts.length < 6)
return false;
var key = job.key, old = KIT[key];
if (old && !old.grown)
return false;
if (old)
delete KIT[key];
var got = compileArchetype(key, def);
if (!got) {
if (old)
KIT[key] = old;
return false;
}
got.sourced = true;
AID.done[key] = 1;
AID.sourced[key] = looked ? (looked.source + ": " + looked.title) : "own knowledge";
aidKeepSourced();
if (typeof kitCache !== "undefined" && kitCache.defs) {
kitCache.defs[key] = { cat: def.cat, size: def.size, parts: def.parts, label: job.label.toLowerCase(), sourced: 1 };
if (typeof kitCacheSave === "function")
kitCacheSave();
}
if (typeof learnWord === "function")
learnWord(key, job.label.toLowerCase());
if (typeof savedArchetypeKeys !== "undefined")
savedArchetypeKeys[key] = true;
if (def.cat !== "being" && typeof cityRpc === "function" && typeof signedIn === "function" && signedIn())
cityRpc("save_custom_archetype", { p_key: key, p_recipe: { parts: def.parts }, p_cat: def.cat, p_size: def.size, p_label: job.label }).catch(function () { });
var flat = aidFlat(job.label), last = aidFlat(String(job.label).split(/\s+/).pop()), changed = 0;
function named(sp) { var lab = aidFlat(sp.label || sp.sign || ""); return lab === flat || lab === last; }
store.objects.slice().forEach(function (sp) {
if (sp.filler)
return;
if (sp.archetype === key) {
if (typeof refresh === "function")
refresh(sp);
changed++;
return;
}
if (sp.archetype !== "dreamplaceholder" || !named(sp))
return;
sp.archetype = key;
if (sp.sign && (aidFlat(sp.sign) === flat || aidFlat(sp.sign) === last))
delete sp.sign;
if (typeof refresh === "function")
refresh(sp);
changed++;
});
store.objects.slice().forEach(function (sp) {
if (sp.filler || sp.archetype === key || !named(sp))
return;
var standIn = !!sp.charId || sp.archetype === "g" + flat || sp.archetype === "g" + last || sp.archetype === "creature" ||
(typeof lexFind === "function" && lexFind(sp.label || "") === sp.archetype);
if (!standIn)
return;
if (changed && !sp.charId) {
if (typeof removeSpec === "function")
removeSpec(sp);
return;
}
sp.archetype = key;
if (typeof refresh === "function")
refresh(sp);
changed++;
});
var walker = store.objects.some(function (sp) { return sp.charId && sp.archetype === key && named(sp); });
if (walker)
store.objects.slice().forEach(function (sp) { if (!sp.charId && !sp.filler && sp.archetype === key && named(sp) && typeof removeSpec === "function")
removeSpec(sp); });
if (typeof save === "function")
save();
if (typeof aiSay === "function")
aiSay("<b>" + esc(job.label) + "</b> is built" + (looked ? " from " + esc(looked.source) + " (&ldquo;" + esc(looked.title) + "&rdquo;)" : " from what the AI knows (no web page was found for it)") + ".");
return true;
},
function () {
AID.serverOld = true;
if (AID.warned || !(typeof amKeeper === "function" && amKeeper()))
return;
AID.warned = true;
setTimeout(function () { if (typeof aiSay === "function")
aiSay("<i>Keeper: the dream-parse function on the server is an older version, so it cannot look things up on the web. Redeploy it from the latest server update.</i>"); }, 3000);
}
];
});
