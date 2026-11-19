/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(372, function () {
"use strict";
return [
function () {
var T = fpsStore();
try {
var names = Object.keys(T.log).sort(function (a, b) { var x = T.log[a], y = T.log[b]; return ((y[y.length - 1] || {}).at || 0) - ((x[x.length - 1] || {}).at || 0); });
names.slice(60).forEach(function (n) { delete T.log[n]; delete T.unread[n]; });
Object.keys(T.log).forEach(function (n) { var l = T.log[n]; if (l.length > 40)
l.splice(0, l.length - 40); });
localStorage.setItem(FPS.TKEY, JSON.stringify(T));
}
catch (e) { }
},
function () {
var T = fpsStore(), seen = {}, L = [];
Object.keys((typeof FMY !== "undefined" && FMY.mem) || {}).forEach(function (k) {
if (k.indexOf("wtalk:") !== 0)
return;
var n = k.slice(6);
if (/hephaestus/i.test(n))
return;
seen[n] = 1;
L.push({ name: n, last: FMY.mem[k].last || 0 });
});
Object.keys(T.log).forEach(function (n) { if (!seen[n]) {
var l = T.log[n];
L.push({ name: n, last: (l[l.length - 1] || {}).at || 0 });
} });
return L.sort(function (a, b) { return b.last - a.last; });
},
function (name) {
var key = "wtalk:" + name, c = null;
(store.characters || []).forEach(function (x) { if (x.wKey === key)
c = x; });
if (c)
return c;
var w = fpsStore().who[name] || {}, m = /(\d+)-year-old (girl|young woman|woman|boy|young man|man)\b/.exec(w.persona || "");
if (m && !w.sex) {
w = Object.assign({}, w, { sex: /girl|woman/.test(m[2]) ? "f" : "m", age: +m[1] });
}
return { id: "fps-" + fpsHash(name), wKey: key, archetype: "human", name: name, aka: [], details: [w.persona || (name + " is someone you met in Somnucor.")], sessions: [1], awake: true, log: [],
x: 0, z: 0, primary: false, src: { name: "stated" }, stfTitle: w.title, stfPlace: w.place, doing: "going about their day", visible: false,
ftkSex: w.sex || undefined, ftkAge: w.age || undefined };
},
function (c, log, extra, voice, orElse) {
var key = typeof okyKey === "function" ? okyKey() : "", cf = typeof cfg === "function" ? cfg() : { mode: "off" };
var quiet = !key && typeof okyQuiet === "function" && okyQuiet(), may = key || (!quiet && cf.mode !== "off" && typeof aiBought === "function" && aiBought());
var lastMine = (log.filter(function (m) { return m.me; }).slice(-1)[0] || {}).t || "";
var plain = function () { return orElse || fpsSimple(c, lastMine); };
if (!may || typeof llmTarget !== "function")
return Promise.resolve(plain());
if (key)
cf = Object.assign({}, cf, { mode: "direct", key: key, model: LLM_MODEL });
var sys = (typeof twhWith === "function" ? twhWith(c, function () { return charSystem(c); }) : charSystem(c)) + (voice ? " RIGHT NOW YOU ARE ON A PHONE CALL with them, talking out loud, not face to face and not texting. Talk the way a real person does on the phone: plain spoken words, contractions, the odd \"um\" or \"oh\" only when it is natural, one to three short sentences. No emoji, no actions in asterisks, no lists, no tags." + (typeof mtgRule === "function" ? mtgRule(c, true) : " On the phone you cannot do any of the tagged actions or promise to come anywhere; you may say they should drop by.") :
" RIGHT NOW YOU ARE TEXTING on your phone, not face to face. Write like a real text: short and casual, one to three short lines, an emoji only if it suits you, no actions in asterisks, no tags." + (typeof mtgRule === "function" ? mtgRule(c, false) : " Over text you cannot do any of the tagged actions or promise to come anywhere; you may say they should drop by.")) + (extra ? " " + extra : "") + (typeof korRule === "function" ? korRule(c, voice) : "")
+ (typeof twhFact === "function" ? twhFact(c, voice) : "");
var msgs = [{ role: "system", content: sys }];
log.slice(-12).forEach(function (m) { msgs.push({ role: m.me ? "user" : "assistant", content: m.t }); });
if (msgs.length === 1)
msgs.push({ role: "user", content: "(no messages yet)" });
var ready = (cf.mode === "app" && typeof freshToken === "function") ? freshToken().catch(function () { }) : Promise.resolve();
var go = function (M) {
var T = llmTarget(cf);
return fetch(T.url, { method: "POST", headers: T.headers, body: JSON.stringify(llmBody(cf, { temperature: 1.0, max_tokens: 600, messages: M, say: 1 })) })
.then(function (r) { if (!r.ok)
throw new Error(r.status); return r.json(); })
.then(function (d) { return d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content; });
};
var main = ready.then(function () { return go(msgs); })
.then(function (raw) {
var bad = typeof twhCheck === "function" ? twhCheck(c, raw) : "";
if (!bad)
return raw;
return go(msgs.concat([{ role: "assistant", content: String(raw || "") }, { role: "system", content: bad }]))
.then(function (r2) { return twhCheck(c, r2) ? twhMend(c, r2) : r2; }, function () { return twhMend(c, raw); });
})
.then(function (raw) {
if (typeof mtgFromReply === "function")
mtgFromReply(c, raw, voice ? "call" : "text");
if (typeof korFromReply === "function")
korFromReply(c, raw, log);
var t = fpsCut(raw);
return t || plain();
})
.catch(function () { return plain(); });
if (!voice)
return main;
return new Promise(function (ok) {
var done = false, t = setTimeout(function () { if (!done) {
done = true;
ok(plain());
} }, 9000);
main.then(function (r) { if (!done) {
done = true;
clearTimeout(t);
ok(r);
} });
});
},
function (name, text) {
text = String(text || "").trim().slice(0, 600);
if (!text || FPS.busy)
return;
var T = fpsStore(), L = T.log[name] || (T.log[name] = []), c = fpsChar(name);
L.push({ me: 1, t: text, at: Date.now() });
fpsSave();
FPS.busy = true;
fpsPaint(true);
setTimeout(function () {
fpsAsk(c, L).then(function (t) {
L.push({ t: t, at: Date.now() });
FPS.busy = false;
if (FPS.with !== name || !(typeof PH !== "undefined" && PH.open)) {
T.unread[name] = (T.unread[name] || 0) + 1;
fpsToast(name, t);
}
fpsSave();
fpsPaint(true);
fpsBadge();
});
}, 900 + Math.random() * 1800);
},
function () {
var n = FPS.with;
FPS.with = null;
if (!n)
return;
var L = (fpsStore().log[n] || []), from = FPS.from || 0, lines = L.slice(from).map(function (m) { return { who: m.me ? "me" : "them", text: m.t }; });
if (lines.some(function (x) { return x.who === "me"; }) && typeof fmyRemember === "function")
fmyRemember(fpsChar(n), [{ who: "them", text: "(by text message)" }].concat(lines));
},
function () {
try {
if (!(typeof signedIn === "function" && signedIn()) || FPS.busy || document.visibilityState === "hidden")
return;
if (Date.now() - FPS.lastIn < 40 * 60000)
return;
var L = fpsKnown().filter(function (p) { return Date.now() - p.last < 4 * 86400000 && Date.now() - p.last > 20 * 60000 && !(typeof twhAsleep === "function" && twhAsleep(p.name)); });
if (!L.length || Math.random() > 0.35)
return;
FPS.lastIn = Date.now();
var p = L[Math.floor(Math.random() * Math.min(5, L.length))], c = fpsChar(p.name), T = fpsStore(), log = T.log[p.name] || (T.log[p.name] = []);
fpsAsk(c, log, "Send them ONE short text first, out of the blue, the way a friend or a shopkeeper who knows them might: something from your day, a follow-up on what you remember of them, or news from your work. Never ask them to do a task.").then(function (t) {
if (!t || /^(mm-hm|is that so|right, right|fair enough)/i.test(t))
t = ["Hey! Good seeing you the other day. Drop by again sometime.", "Quiet day here. Come say hello if you're passing.", "Thought of you today. Hope all's well!"][Math.floor(Math.random() * 3)];
log.push({ t: t, at: Date.now() });
T.unread[p.name] = (T.unread[p.name] || 0) + 1;
fpsSave();
fpsBadge();
fpsToast(p.name, t);
if (typeof PH !== "undefined" && PH.open && PH.tab === "town")
fpsPaint();
});
}
catch (e) { }
},
function () {
var H = [], T = fpsStore();
if (FPS.with) {
var n = FPS.with, L = T.log[n] || [];
var wh = typeof twhLine === "function" ? twhLine(n) : "";
H.push("<div style='display:flex;align-items:center;gap:8px;margin:2px 0 6px'><span data-fps='back' style='cursor:pointer;color:#E8C66A'>‹ Back</span><b style='flex:1'>" + esc(n) + (wh ? "<div class='s' data-twh style='font-weight:400;color:#A9A2C0'>" + esc(wh) + "</div>" : "") + "</b></div>");
if (!L.length)
H.push("<div class='s' style='color:#A9A2C0;text-align:center;margin-top:20px'>Say hello.</div>");
L.forEach(function (m) { H.push("<div style='display:flex'><div class='bub " + (m.me ? "me" : "them") + "'>" + esc(m.t) + "<div style='font-size:10.5px;opacity:.7;text-align:right'>" + phWhen(m.at) + "</div></div></div>"); });
if (FPS.busy)
H.push("<div class='s' style='color:#A9A2C0'>" + esc(n.split(" ")[0]) + " is typing…</div>");
return { body: H.join(""), foot: "<div class='send'><input data-fpskeep='say' placeholder='Text " + esc(n.split(" ")[0]) + "' maxlength='600'><button data-fps='send' style='" + PH_BTN + "'>Send</button></div>" };
}
var P = fpsKnown();
H.push("<div class='s' style='margin:4px 2px 0;font-weight:600'>People you know</div>");
if (!P.length)
H.push("<div class='row'><div class='s'>Talk to people around the city and the worlds, and they'll be here to text.</div></div>");
P.slice(0, 40).forEach(function (p) {
var L = T.log[p.name] || [], last = L[L.length - 1], u = T.unread[p.name] || 0;
H.push("<div class='row' data-fpswith='" + esc(p.name) + "' style='cursor:pointer'><div style='display:flex;justify-content:space-between'><span class='n'>" + esc(p.name) + "</span><span class='s'>" + (last ? phWhen(last.at) : "") + "</span></div>" +
(function () { var wh = typeof twhLine === "function" ? twhLine(p.name) : ""; return wh ? "<div class='s' data-twh style='color:#C9C2E0'>" + esc(wh) + "</div>" : ""; })() +
"<div class='s'>" + (last ? (last.me ? "You: " : "") + esc(String(last.t).slice(0, 70)) : "Tap to text") + (u ? " <b style='color:#E8C66A'>· " + u + " new</b>" : "") + "</div></div>");
});
H.push("<div class='s' style='margin:12px 2px 0;font-weight:600'>Around town</div>");
fpsTownOrders(2).slice(0, 24).forEach(function (e) {
var st = fpsStep(e), done = /^✔️/.test(st);
H.push("<div class='row'><div class='s'>" + FPS_ICON[e.kind] + " " + phWhen(e.at) + " · <b style='color:#EDE8F8'>" + esc(e.from) + "</b> → " + esc(e.to) + (e.what ? " · " + esc(e.what) : "") + "</div><div style='font-size:13px;margin-top:2px'>“" + esc(e.say) + "”</div>" +
(e.reply && Date.now() - e.at >= 60000 ? "<div style='font-size:13px;margin-top:2px;color:#C9C2E0'>" + esc(e.to) + ": “" + esc(e.reply) + "”</div>" : "") +
(st ? "<div class='s' style='margin-top:3px;color:" + (done ? "#4CC77A" : "#E8C66A") + "'>" + esc(st) + "</div>" : "") + "</div>");
});
return { body: H.join(""), foot: "" };
}
];
});
