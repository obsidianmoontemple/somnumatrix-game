/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(422, function () {
"use strict";
return [
function (r) {
try {
if (!r || r.kind !== "major" || !r.victim || r.ccn)
return r;
var h = ccnHead(r.victim.post);
if (!h)
return r;
var old = r.victim.name;
r.ccn = 1;
r.victim = Object.assign({}, r.victim, { name: h.name, sex: h.sex, age: h.age, post: h.post });
(r.log || []).forEach(function (x) { if (x && x.who === old)
x.who = h.name; });
}
catch (e) { }
return r;
},
function () {
var jr = typeof justiceRoles === "function" ? justiceRoles() : {};
var keeper = typeof amKeeper === "function" && amKeeper();
var jobs = typeof wkcJobs === "function" ? wkcJobs() : [];
var heads = {};
jobs.forEach(function (j) { if (j.kind === "head")
heads[j.place] = 1; });
var cmd = !!(typeof CORP !== "undefined" && CORP.data && CORP.data.command);
return { keeper: !!keeper, rider: !!jr.police, command: cmd && !keeper, heads: heads, jobs: jobs };
},
function (evs, me) {
var out = [], V = ccnCommander(), now = Date.now();
(evs || []).forEach(function (e) {
var t = String(e.slot || "").charAt(0), r = ccnCase(e);
if (t === "d") {
if (me.keeper && !me.rider)
return;
if (me.command && r && !(r.state === "reported" && now - Date.parse(r.at) > 3 * 60000))
return;
if (me.command)
e = ccnEv(e, ccnDispatch(), "Dragon Corp dispatch", e.why + " Nobody has taken it in three minutes, so you are ringing the commander.", "Dispatch here. Nobody's picked up the " + (r ? r.what + " at " + r.place : "report") + " yet. Can you put someone on it?");
out.push(e);
return;
}
if (t === "l" && me.keeper && !(r && r.mine_rider)) {
out.push(ccnEv(e, V, V.post, "You are telling the Keeper, as the Commander of the Dragon Corp: " + e.why, "Varn here. " + String(e.line || "").replace(/^Dispatch:\s*/, "")));
return;
}
if (t === "e") {
var tail = String(e.line || "").replace(/^Dragon Corp:\s*/, "");
tail = tail.charAt(0).toUpperCase() + tail.slice(1);
if (me.keeper) {
out.push(ccnEv(e, V, V.post, "You are the Commander of the Dragon Corp telling the Keeper how a case ended: " + e.why, "Varn here. " + tail));
return;
}
if (r && !me.heads[r.place] && !r.mine_owner) {
var mg = ccnManager(r.place);
out.push(ccnEv(e, mg, mg.post, "You run " + r.place + " and are telling one of your staff how the Dragon Corp case ended: " + e.why, ccnFirst(mg.name) + " here. The Corp say: " + tail));
return;
}
out.push(e);
return;
}
if (t === "o" && r) {
var v = r.victim || {}, staffHere = /^(who keeps|who works at)/.test(String(v.post || "")), head = !!(me.heads[r.place] || r.mine_owner);
if (head && staffHere && r.kind !== "major") {
out.push(e);
return;
}
var m = ccnManager(r.place);
if (m.name === v.name) {
out.push(e);
return;
}
var said = r.kind === "major" ? (v.name + ", " + v.post + ", says: \"" + r.say + "\"") : ("What " + (v.name || "the caller") + " told the Dragon Corp: \"" + r.say + "\"");
out.push(ccnEv(e, m, m.post, r.what + " at " + r.place + " has just happened. You run " + r.place + " day to day and you are ringing " + (head ? "the owner" : "one of your staff") + " about it. " + said, ccnFirst(m.name) + " at " + r.place + " here. " + (r.kind === "major" ? "We've " + r.what + ". " + r.say : "There's been " + r.what + ". " + r.say + " The Dragon Corp have been rung.")));
return;
}
if (t === "h") {
var s = ccnSister();
out.push(ccnEv(e, s, s.post, e.why, String(e.line || "").replace(/^Ward desk:/, ccnFirst(s.name) + " on the ward desk:")));
return;
}
out.push(e);
});
if (me.command && typeof INCD !== "undefined")
(INCD.rows || []).forEach(function (r) {
if (r.kind !== "crime" || !(r.state === "arrested" || r.state === "escaped") || r.rider_dreamer || !r.rider_name)
return;
var L = r.log || [], last = L[L.length - 1] || {}, at = last.at ? Date.parse(last.at) : Date.parse(r.at);
var rn = String(r.rider_name).replace(/^Rider /, ""), p = ccnPerson("ccnrider" + rn);
out.push({ slot: "k" + r.id, at: at, kind: "law", how: "text", name: rn, sex: p.sex, age: p.age, first: ccnFirst(rn), post: "a rider of the Dragon Corp", place: r.place, you: "in command of the Dragon Corp",
why: "You are a rider reporting to your commanding officer how your case ended: " + (r.state === "arrested" ? "you arrested " + (r.culprit && r.culprit.name || "the culprit") : "the culprit got away") + " after " + r.what + " at " + r.place + ".",
line: "Reporting, Commander: " + (r.state === "arrested" ? "arrest made for the " + r.what + " at " + r.place + ". " + ((r.culprit && r.culprit.name) || "The culprit") + " is in custody." : "lost them after the " + r.what + " at " + r.place + ". Case stays open."),
what: r.state === "arrested" ? "arrest made" : "culprit got away" });
});
return out;
},
function (e) {
var A, B, home = !(typeof WP_BY_KEY !== "undefined" && WP_BY_KEY[e.from]) && /^(a|an) /i.test(String(e.from || ""));
if (e.kind === "crime") {
var v = (e.inc && e.inc.victim) || {};
A = { name: v.name || "A caller", sex: v.sex, age: v.age, post: v.post || ("at " + e.from), place: e.from };
B = ccnDispatch();
}
else if (e.kind === "major") {
var w = (e.inc && e.inc.victim) || {};
A = { name: w.name || e.caller, sex: w.sex, age: w.age, post: w.post, place: e.from };
B = null;
}
else {
if (home) {
var p = ccnPerson("ccnhome" + e.slot + e.from);
A = { name: p.name, sex: p.sex, age: p.age, post: String(e.from).replace(/^(A|An) /, function (m) { return m.toLowerCase(); }), place: e.from };
}
else
A = ccnManager(e.from);
if (e.to === e.from) {
var q = ccnPerson("ccnmate" + e.to + e.slot);
B = { name: q.name, sex: q.sex, age: q.age, post: "works at " + e.to, place: e.to };
}
else
B = ccnManager(e.to);
}
return { a: A, b: B };
},
function (e) {
var st = typeof fpsStep === "function" ? fpsStep(e) : "";
if (e.kind === "crime")
return "This is a real report to the Dragon Corp of " + e.what + " at " + e.from + ". What the caller says first: \"" + e.say + "\" Dispatch takes the details and sends a rider." + (st ? " Where it stands now: " + st + "." : "");
if (e.kind === "order")
return "This is a real order: " + e.from + " wants " + e.what + " from " + e.to + ". What the caller says first: \"" + e.say + "\" What " + e.to + " says back (keep to it): \"" + e.reply + "\" The courier really carries it afterwards.";
if (e.kind === "call")
return "This is a real call for help: " + e.from + " needs " + e.to + " for " + e.what + ". What the caller says first: \"" + e.say + "\" What " + e.to + " says back (keep to it): \"" + e.reply + "\" Someone from " + e.to + " really goes over.";
return "Workers ringing each other. What the caller says first: \"" + e.say + "\"";
},
function (e, P) {
var key = typeof okyKey === "function" ? okyKey() : "", cf = typeof cfg === "function" ? cfg() : { mode: "off" };
if (!ccnAI() || typeof llmTarget !== "function" || typeof llmBody !== "function")
return Promise.resolve(null);
if (key)
cf = Object.assign({}, cf, { mode: "direct", key: key, model: LLM_MODEL });
var who = function (p) { return p.name + ", " + (p.post || "") + ", a " + (p.age || 40) + "-year-old " + (p.sex === "f" ? "woman" : "man"); };
var sys = "You write one real phone call between two people who live and work in Somnucor, the dreamers' shared city. A is " + who(P.a) + ". B is " + who(P.b) + ". " + ccnFacts(e) +
" A rings B. Write only what they say out loud, 4 to 8 short turns, A first, then turn about. Each line starts with A: or B:. Plain spoken words, the way real people talk on the phone, each in their own way;" +
" they say hello and goodbye briefly. Keep to the facts given: the same thing, the same number, the same answer. No narration, no actions, no emoji, no tags.";
var ready = (cf.mode === "app" && typeof freshToken === "function") ? freshToken().catch(function () { }) : Promise.resolve();
return ready.then(function () {
var T = llmTarget(cf);
return fetch(T.url, { method: "POST", headers: T.headers, body: JSON.stringify(llmBody(cf, { temperature: 0.9, max_tokens: 500, messages: [{ role: "system", content: sys }, { role: "user", content: "The call." }] })) });
})
.then(function (r) { if (!r.ok)
throw new Error(r.status); return r.json(); })
.then(function (d) { var raw = d && d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content || ""; return ccnParse(raw); })
.catch(function () { return null; });
},
function (raw) {
var L = [];
String(raw || "").split(/\n+/).forEach(function (s) { var m = /^\s*\**\s*([AB])\s*\**\s*[:\-–]\s*(.+)$/.exec(s); if (m) {
var t = m[2].replace(/\*[^*]{1,80}\*/g, "").replace(/\[\[[^\]]*\]\]?/g, "").trim();
if (t)
L.push({ who: m[1].toLowerCase(), t: t.slice(0, 240) });
} });
return L.length >= 2 && L[0].who === "a" ? L.slice(0, 10) : null;
},
function (e) {
var slot = String(e.slot), have = CCN.talks[slot];
if (have && have.lines)
return Promise.resolve(have);
if (have && have.p)
return have.p;
var P = ccnParties(e), o = { P: P, lines: null };
o.p = ccnModel(e, P).then(function (L) { o.lines = L || ccnPlain(e, P); o.ai = !!L; o.p = null; return o; });
ccnKeep(slot, o);
return o.p;
},
function (o, side, each, done) {
var L = o.lines.filter(function (x) { return !side || x.who === side; }), i = 0, tok = {};
CCN.playing = tok;
var next = function () {
if (CCN.playing !== tok)
return;
if (i >= L.length) {
CCN.playing = null;
if (done)
done();
return;
}
var x = L[i++], p = x.who === "a" ? o.P.a : o.P.b;
if (each)
each(x, p);
if (typeof fvoSpeak === "function" && typeof fvoOn === "function" && fvoOn())
fvoSpeak(ccnChar(p), x.t, function () { setTimeout(next, side ? 1800 : 350); });
else
setTimeout(next, Math.min(6000, 1200 + x.t.length * 45));
};
next();
},
function (e) {
var P = ccnParties(e), st = typeof fpsStep === "function" ? fpsStep(e) : "", done = /^✔️/.test(st), o = CCN.talks[String(e.slot)];
var nm = function (p) { return p ? "<b style='color:#EDE8F8'>" + esc(p.name) + "</b> <span style='color:#A9A2C0'>(" + esc(p.post || p.place || "") + ")</span>" : ""; };
var h = "<div class='row' data-ccnrow='" + esc(String(e.slot)) + "'><div class='s'>" + (CCN_ICON[e.kind] || "📞") + " " + phWhen(e.at) + (e.what ? " · " + esc(e.what) : "") + "</div>" +
"<div class='s' style='margin-top:2px'>" + nm(P.a) + (P.b ? " rang " + nm(P.b) : " rang <b style='color:#EDE8F8'>the Keeper</b>") + "</div>";
if (o && o.lines)
h += o.lines.map(function (x) { var p = x.who === "a" ? P.a : P.b; return "<div style='font-size:13px;margin-top:2px;" + (x.who === "b" ? "color:#C9C2E0" : "") + "'>" + esc(ccnFirst(p && p.name)) + ": “" + esc(x.t) + "”</div>"; }).join("");
else {
h += "<div style='font-size:13px;margin-top:2px'>“" + esc(e.say) + "”</div>";
if (e.reply && Date.now() - e.at >= 60000)
h += "<div style='font-size:13px;margin-top:2px;color:#C9C2E0'>" + esc(P.b ? ccnFirst(P.b.name) : e.to) + ": “" + esc(e.reply) + "”</div>";
}
if (st)
h += "<div class='s' style='margin-top:3px;color:" + (done ? "#4CC77A" : "#E8C66A") + "'>" + esc(st) + "</div>";
if (P.b)
h += "<div><button data-ccnhear='" + esc(String(e.slot)) + "' style='padding:5px 10px;border-radius:8px;border:1px solid #6A5FA0;background:#221E38;color:#EDE8F8;font-size:12.5px;cursor:pointer;margin-top:4px'>" + (o && o.p ? "⏳ Ringing…" : CCN.playing && CCN.playingSlot === String(e.slot) ? "⏹ Stop" : "🎧 Listen") + "</button></div>";
return h + "</div>";
},
function (slot) {
if (CCN.playing && CCN.playingSlot === slot) {
ccnStop();
CCN.playingSlot = null;
ccnRepaint();
return;
}
var e = ccnFind(slot);
if (!e)
return;
ccnStop();
CCN.playingSlot = slot;
var t = ccnTalk(e);
ccnRepaint();
t.then(function (o) { ccnRepaint(); if (CCN.playingSlot !== slot)
return; ccnPlay(o, null, null, function () { if (CCN.playingSlot === slot) {
CCN.playingSlot = null;
ccnRepaint();
} }); ccnRepaint(); });
}
];
});
