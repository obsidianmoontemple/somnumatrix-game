/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(403, function () {
"use strict";
return [
function (r) {
if (!r)
return "";
var L = (r.log || []).slice(-6).map(function (x) { return (x.who ? x.who + ": " : "") + x.line; }).join(" / ");
return " THE CASE AS IT STANDS RIGHT NOW (real, from the city's records; never add to it): " + r.what + " at " + r.place + "." +
(r.kind === "crime" && r.culprit && r.culprit.name ? " The culprit: " + r.culprit.name + (r.culprit.look ? ", " + r.culprit.look : "") + "." : "") +
(r.hurt ? " " + r.hurt + " hurt." : "") + (r.riders > 1 ? " " + r.riders + " riders on it." : "") + " What has happened so far: " + L;
},
function (c, voice) {
if (!c || !c.korInc || !korKeeper())
return "";
var r = korCase(c.korInc);
return korFacts(r) + " YOU ARE TALKING TO THE KEEPER, WHO RULES THE CITY, AND WHAT THEY TELL YOU TO DO IS REALLY DONE." +
" Whenever the Keeper asks for something, say plainly that you are doing it (never that it is already done; the outcome comes later) and end your reply with one tag for each thing asked, in this exact form: [[DO: word]]." +
" The only words: " + Object.keys(KOR_ORDERS).map(function (k) { return k + " (" + KOR_ORDERS[k] + ")"; }).join(", ") + "." +
" Only tag what the Keeper actually asked for in their last words, never on your own, never twice for the same ask. If they ask for something not on the list, say what you can do instead.";
},
function (id, o, note) {
if (!id || !KOR_ORDERS[o] || typeof cityRpc !== "function")
return Promise.resolve(null);
var r = korCase(id);
if (r && r.kind === "major" && o === "rider")
o = "crews";
return cityRpc("keeper_incident_order", { p_id: id, p_order: o, p_note: String(note || "").slice(0, 200) }).then(function (res) {
if (res && res.say && typeof setStatus === "function")
setStatus((res.ok ? "✅ On your word: " : "⚠️ ") + esc(res.say));
setTimeout(korPoll, 1500);
return res;
}).catch(function () { if (typeof setStatus === "function")
setStatus("⚠️ Your order did not reach the city."); return null; });
},
function (c, raw, log) {
if (!c || !c.korInc || !korKeeper())
return;
var seen = {}, m, said = String(korLastSaid(log)).replace(/^📞 /, "");
KOR_TAG.lastIndex = 0;
while ((m = KOR_TAG.exec(String(raw || "")))) {
var o = m[1].toLowerCase().replace(/\s+/g, "");
if (o === "letthemgo" || o === "release")
o = "letgo";
if (!KOR_ORDERS[o] || seen[o])
continue;
seen[o] = 1;
KOR.tagged = true;
korOrder(c.korInc, o, said);
}
},
function (p, post, place) {
var T = fpsStore();
T.who[p.name] = Object.assign({}, T.who[p.name] || {}, { persona: "You live in Somnucor, the dreamers' shared city. You are the " + post + ". You are a " + (p.age || 40) + "-year-old " + (p.sex === "f" ? "woman" : "man") + ". Talk like a real person at work: plain words, short sentences.",
title: post, place: place, sex: p.sex, age: p.age });
fpsSave();
},
function () {
var told = korTold();
if (typeof ccnFixRow === "function")
KOR.rows.forEach(ccnFixRow);
KOR.rows.forEach(function (r) {
if (!(r.korders || []).length)
return;
var first = Date.parse(r.korders[0].at), v = r.victim || {};
var h = r.hosp || {};
if (h.done && !told["h" + r.id] && h.sister && h.sister.name) {
korTell("h" + r.id);
var doc = typeof ccnHead === "function" ? ccnHead("hospital") : null;
if (doc) {
var sis = h.sister.name;
h = Object.assign({}, h, { sister: { name: doc.name, sex: doc.sex, age: doc.age, post: doc.post }, ward: h.ward + " (Sister " + sis.split(" ").slice(-1)[0] + " checked it)" });
}
korPerson(h.sister, h.sister.post || "ward sister at the City Hospital", "The City Hospital");
var ppl = (h.people || []), found = ppl.length ? ppl.map(function (x) { return x.name + " (" + x.how + ")"; }).join(", ") : "nobody has been brought in from " + r.place;
var why = "You are ringing the Keeper back because they asked the City Hospital who was brought in after " + r.what + " at " + r.place + ". You checked " + h.ward + ". What you found, and only this: " + found + ". Tell them plainly, like a nurse on the phone.";
var hop = "Keeper, it's " + h.sister.name.split(" ")[0] + " at the City Hospital, about " + r.what + " at " + r.place + ". I checked " + h.ward + ". " + (ppl.length ? "We have " + found + "." : "Nobody's been brought in from there.");
if (!(korFree() && korRing(h.sister.name, why, r.id, hop, "🏥 <b>Hospital check</b>: " + esc(r.what) + " at " + esc(r.place) + "<br><span style='color:#C9C2E0'>" + esc(ppl.length ? "Brought in: " + found : "Nobody brought in") + "</span>")))
korText(h.sister.name, "About " + r.what + " at " + r.place + ": I checked " + h.ward + ". " + (ppl.length ? "We have " + found + "." : "Nobody's been brought in from there.") + " " + (h.sister.name.split(" ")[0]) + ", City Hospital");
return;
}
var key = "s" + r.id + r.state;
var last = (r.log || [])[(r.log || []).length - 1] || {};
if (KOR_END[r.state] && !told[key] && v.name && Date.parse(last.at) > first + 1000 && !/^(Dragon Corp dispatch|Tracker drone|City Hospital)/.test(last.who || "")) {
korTell(key);
if (r.kind === "crime" && typeof ccnCommander === "function") {
var C = ccnCommander();
v = { name: C.name, sex: C.sex, age: C.age, post: C.post };
}
korPerson(v, v.post || ("who keeps " + r.place), r.place);
var wantCall = r.kflags && r.kflags.update;
var why2 = "You are ringing the Keeper back, as they asked, about " + r.what + " at " + r.place + ". How it stands now, and only this: " + (last.who ? last.who + ": " : "") + (last.line || "") + " Tell them plainly and thank them for what they sent.";
var eop = "Keeper, it's " + String(v.name).split(" ")[0] + ", about " + r.what + " at " + r.place + ". " + (last.line || "It's dealt with.") + " Thank you for your help.";
if (!(wantCall && korFree() && korRing(v.name, why2, r.id, eop, korAbout("Case update", r))))
korText(v.name, "About " + r.what + " at " + r.place + ": " + (last.line || "it's dealt with.") + " Thank you for the help.");
return;
}
if (r.fix === "fixed" && !told["f" + r.id] && v.name && (r.kflags || {}).crews) {
korTell("f" + r.id);
if (r.fixer && typeof cinPerson === "function" && typeof ccnHead === "function") {
var fm = cinPerson("cinfm" + r.fixer);
v = { name: fm.name, sex: fm.sex, age: fm.age, post: "the foreman at " + r.fixer };
korPerson(v, v.post, r.fixer);
korText(v.name, r.place + " is mended and back as it was, with the crews you sent. " + String(fm.name).split(" ")[0] + ", " + r.fixer);
}
else {
korPerson(v, v.post || ("who keeps " + r.place), r.place);
korText(v.name, r.place + " is mended and back as it was. Thank you for sending the crews.");
}
}
});
},
function () {
try {
if (!korKeeper() || !KOR.ok || KOR.set.crimes === 0 || String(KOR.set.crimes) === "0" || !korFree())
return;
if (!(typeof cfg === "function" && cfg().folkRing !== false) || Date.now() - KOR.ringAt < 20 * 60000 || typeof INCD === "undefined")
return;
if (typeof PH !== "undefined" && PH.open)
return;
var told = korTold();
var r = (INCD.rows || []).filter(function (x) { return x.kind === "crime" && !x.closed && /reported|responding|at_scene|chasing/.test(x.state) && Date.now() - Date.parse(x.at) < 15 * 60000 && !told["c" + x.id]; })[0];
if (!r || !r.victim || !r.victim.name)
return;
KOR.ringAt = Date.now();
korTell("c" + r.id);
var v = r.victim;
var V = typeof ccnCommander === "function" ? ccnCommander() : null;
if (V) {
korPerson(V, V.post, V.place);
korRing(V.name, "You are the Commander of the Dragon Corp ringing the Keeper, who rules Somnucor, to brief them on a crime just reported: " + r.what + " at " + r.place + ". " + (v.name || "The caller") + " told dispatch: \"" + r.say + "\" Tell them plainly what happened and what your riders are doing so far, then ask if there is anything they want done. Speak like a calm, capable commanding officer on the phone. Start with the kind of crime and the place, then who reported it and what they said, then where your riders are now (" + korState(r.state) + "), then ask what the Keeper wants done.", r.id, "Keeper, " + V.name + ", Commander of the Dragon Corp. Crime report: " + r.what + " at " + r.place + ". " + (v.name || "The caller") + " told dispatch: \u201C" + r.say + "\u201D Status: " + korState(r.state) + ". Do you want anything done?", korAbout("Crime report", r, "reported by " + (v.name || "a caller")));
return;
}
korPerson(v, v.post || ("who keeps " + r.place), r.place);
korRing(v.name, "You are ringing the Keeper, who rules Somnucor, because of " + r.what + " at " + r.place + ": " + r.say + " Tell them plainly what happened and what the Dragon Corp are doing so far, then ask if there is anything they want done. Speak like a real, shaken person on the phone.", r.id, "Keeper? It's " + String(v.name).split(" ")[0] + " at " + r.place + ". " + r.say + " The Dragon Corp have it: " + korState(r.state) + ".", korAbout("Crime report", r, "reported by " + v.name));
}
catch (e) { }
}
];
});
