/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(56, function () {
"use strict";
return [
function (c) {
if (!c)
return;
talkWith = c;
talkOpen = true;
if (document.exitPointerLock)
document.exitPointerLock();
document.getElementById("prompt").classList.add("gone");
document.getElementById("t-name").textContent = c.name;
talkMeta(c);
renderLog();
document.getElementById("talk").classList.add("open");
setTimeout(function () { document.getElementById("t-say").focus(); }, 380);
},
function (c) {
var need = wakeNeed(c);
document.getElementById("t-meta").textContent = c.awake
? c.details.length + " remembered \u00b7 " + c.sessions.length + " dream" + (c.sessions.length > 1 ? "s" : "") + (c.born ? " \u00b7 first seen " + c.born : "")
: "not yet awake \u00b7 " + need + " more thing" + (need === 1 ? "" : "s") + " to wake";
document.getElementById("t-say").placeholder = c.awake
? "say something \u2014 enter to send"
: "tell the dream about " + c.name + " \u2014 who they are, what they do, where they live. Enter to add.";
document.getElementById("t-send").textContent = c.awake ? "Speak" : "Tell the dream";
document.getElementById("t-build").style.display = c.awake ? "" : "none";
},
function () {
var el = document.getElementById("t-log");
if (!talkWith)
return;
if (!talkWith.awake) {
var need = wakeNeed(talkWith);
el.innerHTML = '<p class="me">' + esc(talkWith.name) + ' is here, but not awake yet.</p>' +
'<p class="them" style="font-family:var(--sans);font-size:13.5px;color:var(--dim)">A figure wakes once the dream knows enough about them \u2014 ' +
need + ' more thing' + (need === 1 ? "" : "s") + ', or seeing them again on another night. Tell the dream about them below: ' +
'who they are, what they do, where they live, what they were like. Each sentence counts. ' +
'If you say their name ("his name is Silas") they will answer to it.</p>' +
(talkWith.details.length ? '<p class="me">What the dream knows so far:</p>' +
talkWith.details.filter(function (d) { return !/^said: /.test(d); }).slice(-6).map(function (d) { return '<p class="them">' + esc(d) + "</p>"; }).join("") : "");
el.scrollTop = el.scrollHeight;
return;
}
if (!talkWith.log.length) {
el.innerHTML = '<p class="them">' + esc(firstWords(talkWith)) + "</p>";
return;
}
el.innerHTML = talkWith.log.map(function (t) {
return '<p class="' + (t.who === "me" ? "me" : "them") + '">' + esc(t.text) + "</p>";
}).join("");
el.scrollTop = el.scrollHeight;
},
function (c) {
if (c.deity && DEITY[c.deity]) {
var d = DEITY[c.deity], man = mannerOf(c);
if (man === "silent")
return d.name + " looks at you and says nothing.";
if (c.sessions.length > 1)
return "You have come back.";
return man === "kind" ? "Come closer." : man === "stern" ? "You stand before " + d.name + "." : man === "riddling" ? "Ask, and hear what you can." : "I am " + d.name + ".";
}
var d = c.details[c.details.length - 1] || "";
if (c.sessions.length > 1)
return "You have been here before.";
return d ? "\u2026" : "\u2026";
},
function () {
var d = dreamer(), bits = [];
if (d.name)
bits.push("The dreamer is called " + d.name + " here.");
if (d.about)
bits.push("About them: " + d.about);
if (d.practice)
bits.push("Their practice: " + d.practice);
if (d.abilities.length)
bits.push("In dreams they can: " +
d.abilities.map(function (a) { return a.name; }).join(", ") + ".");
if (d.notes)
bits.push("They also say: " + d.notes);
if (!bits.length)
return "";
return bits.join(" ") + " Treat this as true of them, but never claim to know their waking life beyond it.";
},
function (c, base) {
var d = DEITY[c.deity], man = mannerOf(c);
var lines = [
"You are " + d.name + ", of the " + d.trad + " tradition: " + d.domains + ". You have come to the dreamer in a dream, and you speak as yourself, in first person.",
"Draw on your own names, stories, symbols and ways as your tradition knows them, and on everything the dreamer recorded about how you appeared.",
man ? ("How you were in the dream: " + MANNER_WORDS[man] + ". Stay true to that.") : "",
man === "silent" ? "Because you did not speak in the dream, do not speak now: reply only with what you do, in one or two short sentences in the third person, with no spoken words." : "",
"If asked for herbal quantities, medical doses or treatment, speak of meaning and story instead, never amounts or instructions. That is the only line you hold that any figure would."
];
return base.replace(/You are [^.]*a figure inside a dream that the dreamer recorded\./, lines.filter(Boolean).join(" "))
.replace(/You are made only of what the dream contained\.[^.]*\.[^.]*\./, "You know only what your tradition knows of you and what the dream showed.")
.replace("in under 70 words", "in under 90 words");
},
function (c) {
var where = [];
store.objects.forEach(function (o) {
if (KIT[o.archetype] && KIT[o.archetype].cat === "structure") {
var dx = o.x - c.x, dz = o.z - c.z;
if (dx * dx + dz * dz < 160 * 160)
where.push(placeName(o));
}
});
return [
"You are " + c.name + ", a figure inside a dream that the dreamer recorded.",
dreamerBrief(),
"It is " + hhmm(dreamHour()) + ". You are " + (c.doing || "here") +
(c.atId && specById(c.atId) ? (" at " + placeName(specById(c.atId))) : "") + ".",
c.home && specById(c.home) ? ("You live at " + placeName(specById(c.home)) + ".") : "",
c.work && specById(c.work) ? ("By day you are found at " + placeName(specById(c.work)) + ".") : "",
knownGaps(c).length ? ("The dream never recorded " + knownGaps(c).join(", ") +
". You do not know these things about yourself either. If asked, say so, or answer the way a dream answers \u2014 and if you do give an answer, it becomes true.") : "",
"Everything the dreamer wrote down about you: " + (c.details.length ? c.details.join(" / ") : "almost nothing"),
"You have appeared in " + c.sessions.length + " of their dreams.",
where.length ? ("Near you stand: " + where.slice(0, 7).join(", ") + ".") : "",
store.emotions.length ? ("The dream felt: " + store.emotions.slice(0, 6).join(", ") + ".") : "",
"Speak as this figure, in first person, in under 70 words.",
"Answer what the dreamer actually asked. Be particular: name the places near you, use what was recorded about you, notice the hour. Vary how you begin; never open two replies the same way. Sometimes ask them something back. Never lecture and never explain that you are a figure in a dream unless asked.",
(c.log && c.log.length) ? ("You have already said the following. Never repeat any of it, in whole or in part: " +
c.log.filter(function (t) { return t.who !== "me"; }).slice(-6).map(function (t) { return "\u201c" + t.text + "\u201d"; }).join(" ")) : "",
"You are made only of what the dream contained. You know nothing of their waking life, and you never claim to be a real person, a spirit, a god, or a messenger. If asked something outside the dream, deflect the way a dream deflects.",
"You may be fragmentary, evasive or strange. You need not be comforting, but you are never cruel.",
"If you speak of a place, describe it in concrete physical nouns, because what you describe will be built."
].filter(Boolean).join(" ");
},
function () {
if (!talkWith)
return;
var ta = document.getElementById("t-say");
var text = ta.value.trim();
if (!text)
return;
if (!talkWith.awake) {
var r = describeFigure(talkWith, text);
ta.value = "";
document.getElementById("t-name").textContent = talkWith.name;
talkMeta(talkWith);
if (talkWith.awake) {
talkWith.log.push({ who: "them", text: localVoice(talkWith, "hello") });
setStatus("<b>" + esc(talkWith.name) + " is awake.</b>");
}
renderLog();
save();
return;
}
talkWith.log.push({ who: "me", text: text });
ta.value = "";
renderLog();
save();
var c = cfg();
var god = !!(talkWith.deity || talkWith.archetype === "deity");
var bought = god || aiBought();
if (c.mode !== "off" && !bought && typeof offerBuy === "function")
offerBuy("talk", true);
if (c.mode === "off" || !bought) {
var who0 = talkWith;
setTimeout(function () {
who0.log.push({ who: "them", text: localVoice(who0, text) });
lastReply = who0.log[who0.log.length - 1].text;
if (talkWith === who0)
renderLog();
save();
}, 450 + Math.random() * 500);
return;
}
var msgs = [{ role: "system", content: charSystem(talkWith) }];
talkWith.log.slice(-12).forEach(function (t) {
msgs.push({ role: t.who === "me" ? "user" : "assistant", content: t.text });
});
var who = talkWith;
talkWith.log.push({ who: "them", text: "\u2026" });
renderLog();
var ready = (c.mode === "app" && typeof freshToken === "function") ? freshToken().catch(function () { }) : Promise.resolve();
ready.then(function () {
var T = llmTarget(c);
return fetch(T.url, { method: "POST", headers: T.headers, body: JSON.stringify(llmBody(c, god ? {
temperature: 1.0, max_tokens: 1200, messages: msgs, talk: "deity", say: 1
} : {
temperature: 1.0, max_tokens: 1200, messages: msgs, say: 1
})) });
})
.then(function (r) { if (!r.ok) {
var e = new Error(r.status);
e.status = r.status;
throw e;
} return r.json(); })
.then(function (d) {
var t = (d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content || "").trim();
return (typeof stfAfter === "function" && t) ? stfAfter(who, t, text, msgs, god).catch(function () { return t; }) : t;
})
.then(function (t) {
who.log[who.log.length - 1] = { who: "them", text: t || localVoice(who, text) };
lastReply = who.log[who.log.length - 1].text;
addDetail(who, "said: " + lastReply.slice(0, 120));
if (talkWith === who)
renderLog();
save();
})
.catch(function (e) {
if (e && e.status === 402 && !god) {
if (typeof accessDenied === "function")
accessDenied();
if (typeof offerBuy === "function")
offerBuy("talk", true);
}
who.log[who.log.length - 1] = { who: "them", text: localVoice(who, text) };
lastReply = who.log[who.log.length - 1].text;
if (talkWith === who)
renderLog();
save();
});
},
function (text, name) {
if (!name)
return text;
var t = " " + text + " ";
var poss = name + (/s$/i.test(name) ? "'" : "'s");
t = t.replace(/([\s"(])I'm(\W)/gi, "$1" + name + " is$2");
t = t.replace(/([\s"(])I've(\W)/gi, "$1" + name + " has$2");
t = t.replace(/([\s"(])I'll(\W)/gi, "$1" + name + " will$2");
t = t.replace(/([\s"(])I am(\W)/g, "$1" + name + " is$2");
t = t.replace(/([\s"(])I have(\W)/g, "$1" + name + " has$2");
t = t.replace(/([\s"(])I was(\W)/g, "$1" + name + " was$2");
t = t.replace(/([\s"(])I do(\W)/g, "$1" + name + " does$2");
t = t.replace(/([\s"(])I don't(\W)/gi, "$1" + name + " does not$2");
t = t.replace(/([\s"(])I (\w+)/g, function (m, p, v) {
if (/^(am|is|was|have|has|do|does|will|would|can|could|had)$/i.test(v))
return p + name + " " + v;
return p + name + " " + v + (/[sd]$/.test(v) ? "" : "s");
});
t = t.replace(/([\s"(])my(\W)/gi, "$1" + poss + "$2");
t = t.replace(/([\s"(])me(\W)/gi, "$1" + name + "$2");
t = t.replace(/([\s"(])myself(\W)/gi, "$1" + name + "$2");
return t.trim();
},
function () {
if (!lastReply) {
setStatus("<i>Nothing said yet.</i>");
return;
}
var who = talkWith ? talkWith.name : null;
var said = deFirstPerson(lastReply, who);
var n = scanText(said);
feedContext(said);
store.heard = ((store.heard || "") + " " + said).trim();
scheduleParse(300);
save();
updateCount();
setStatus(n ? ("<b>" + n + " form" + (n > 1 ? "s" : "") + " rose from what they said</b>") : "Taken down.");
},
function (c) {
if (!c)
return;
greetWith = c;
greetOpen = true;
greetCount = 0;
if (document.exitPointerLock)
document.exitPointerLock();
document.getElementById("prompt").classList.add("gone");
document.getElementById("g-line").textContent = greetLine(c, 0);
var at = nearestNamed(c.x, c.z, 70);
document.getElementById("g-sub").textContent =
"a stranger \u00b7 " + hhmm(dreamHour()) + (at ? (" \u00b7 near " + placeName(at)) : "");
document.getElementById("g-claim").classList.remove("open");
document.getElementById("g-confirm").style.display = "none";
document.getElementById("g-know").style.display = "";
document.getElementById("g-name").value = "";
fillMergeList();
document.getElementById("greet").classList.add("open");
},
function () {
var sel = document.getElementById("g-merge");
var opts = ['<option value="">\u2014</option>'];
store.characters.forEach(function (c) {
if (c.primary === false || !greetWith)
return;
if (c.archetype !== greetWith.archetype)
return;
opts.push('<option value="' + c.id + '">' + esc(c.name) + "</option>");
});
sel.innerHTML = opts.join("");
},
function () {
if (!greetWith)
return;
var nameEl = document.getElementById("g-name");
var mergeId = document.getElementById("g-merge").value;
var spec = specById(greetWith.objId);
var where = nearestNamed(greetWith.x, greetWith.z, 80);
var note = "recognised at " + hhmm(dreamHour()) + (where ? (" near " + placeName(where)) : "");
if (mergeId) {
var target = null;
store.characters.forEach(function (c) { if (c.id === mergeId)
target = c; });
if (!target) {
setStatus("<i>Could not place them.</i>");
return;
}
if (target.objId && meshes[target.objId] && target.objId !== greetWith.objId) {
var old = specById(target.objId);
if (old) {
scene.remove(meshes[old.id]);
delete meshes[old.id];
var oi = store.objects.indexOf(old);
if (oi > -1)
store.objects.splice(oi, 1);
}
}
var bm = store.blocks && spec && spec.block ? store.blocks[spec.block] : null;
if (bm) {
var km = bm.ids.indexOf(spec.id);
if (km > -1)
bm.ids.splice(km, 1);
}
if (spec) {
spec.filler = false;
spec.charId = target.id;
spec.label = target.name;
spec.name = null;
spec.solid = true;
refresh(spec);
}
var gi = store.characters.indexOf(greetWith);
if (gi > -1)
store.characters.splice(gi, 1);
target.objId = spec ? spec.id : target.objId;
target.x = greetWith.x;
target.z = greetWith.z;
target.anchor = { x: greetWith.x, z: greetWith.z };
addDetail(target, note);
if (target.sessions.indexOf(store.session) === -1)
target.sessions.push(store.session);
checkWake(target);
setStatus("<b>" + esc(target.name) + " again.</b>");
closeGreet();
save();
tickClock(true);
updateCount();
return;
}
var nm = nameEl.value.trim();
if (!nm) {
setStatus("<i>Give them a name first.</i>");
nameEl.focus();
return;
}
var bf = store.blocks && spec && spec.block ? store.blocks[spec.block] : null;
if (bf) {
var kf = bf.ids.indexOf(spec.id);
if (kf > -1)
bf.ids.splice(kf, 1);
}
greetWith.primary = true;
greetWith.name = nm;
greetWith.aka = [normName(nm)];
greetWith.src = { name: "stated" };
greetWith.sessions = [store.session];
greetWith.born = new Date().toISOString().slice(0, 10);
greetWith.anchor = { x: greetWith.x, z: greetWith.z };
addDetail(greetWith, note);
if (spec) {
spec.filler = false;
spec.label = nm;
spec.name = null;
spec.detail = 1;
refresh(spec);
}
setStatus("<b>" + esc(nm) + " is someone now.</b>");
closeGreet();
save();
tickClock(true);
updateCount();
},
function (c) {
var others = store.characters.filter(function (x) {
return x.primary !== false && x.id !== c.id && x.archetype === c.archetype;
});
if (!others.length)
return "";
var opts = ['<option value="">\u2014 same as someone else? \u2014</option>'];
others.forEach(function (x) { opts.push('<option value="' + x.id + '">' + esc(x.name) + "</option>"); });
return '<select class="rmerge" data-keep="' + c.id + '">' + opts.join("") + "</select>";
},
function () {
tickClock(true);
var el = document.getElementById("r-list");
var prim = store.characters.filter(function (c) { return c.primary !== false; });
var fill = store.characters.length - prim.length;
if (!prim.length) {
el.innerHTML = '<div class="rd">No one yet. Dream someone into it.</div>';
}
else {
el.innerHTML = prim.slice().sort(function (a, b) { return awareness(b) - awareness(a); })
.map(function (c) {
var gaps = knownGaps(c);
var at = c.atId ? specById(c.atId) : null;
return '<div class="rc" data-id="' + c.id + '">' +
'<div class="rn">' + esc(c.name) + (c.role ? ' <span class="rq">' + esc(c.role) + '</span>' : "") + "</div>" +
'<div class="rd">' + esc(c.doing || "\u2014") + (at ? (" at " + esc(placeName(at))) : "") +
(c.visible === false ? " \u00b7 not about" : "") + "</div>" +
'<div class="rd">lives: ' + (c.home ? esc(placeName(specById(c.home))) : "<b>not dreamt</b>") + srcMark(c, "home") + "</div>" +
'<div class="rd">by day: ' + (c.work ? esc(placeName(specById(c.work))) : "<b>not dreamt</b>") + srcMark(c, "work") + "</div>" +
'<div class="rd">hours: ' + (c.routine ? "recorded" : "<b>not dreamt</b>") + srcMark(c, "routine") + "</div>" +
'<div class="rd">' + c.details.length + " remembered \u00b7 " + c.sessions.length +
" dream" + (c.sessions.length > 1 ? "s" : "") + (c.awake ? ' \u00b7 <em>awake</em>' : "") + "</div>" +
(gaps.length ? ('<div class="rd"><button class="btn rfill" data-fill="' + c.id +
'" type="button">Fill in ' + gaps.length + ' gap' + (gaps.length > 1 ? "s" : "") + "</button></div>") : "") +
mergeControl(c) +
'<div class="rbar"><i style="width:' + Math.min(Math.round(awareness(c) * 100), 100) + '%"></i></div></div>';
}).join("") +
(fill ? ('<div class="rd" style="margin-top:12px">and ' + fill + " nameless others, who were never dreamt</div>") : "");
Array.prototype.forEach.call(el.querySelectorAll(".rmerge"), function (sel) {
sel.addEventListener("click", function (ev) { ev.stopPropagation(); });
sel.addEventListener("change", function (ev) {
ev.stopPropagation();
var keepId = sel.getAttribute("data-keep"), dropId = sel.value;
if (!dropId)
return;
var kn = "", dn = "";
store.characters.forEach(function (x) {
if (x.id === keepId)
kn = x.name;
if (x.id === dropId)
dn = x.name;
});
if (!confirm("Fold \"" + dn + "\" into \"" + kn + "\"?\n\nEverything recorded about both becomes one person, under the name \"" + kn + "\".")) {
sel.value = "";
return;
}
if (mergeCharacters(keepId, dropId)) {
setStatus("<b>" + esc(dn) + " and " + esc(kn) + " were the same person.</b>");
openRoster();
}
});
});
Array.prototype.forEach.call(el.querySelectorAll(".rfill"), function (b) {
b.addEventListener("click", function (ev) {
ev.stopPropagation();
var id = b.getAttribute("data-fill"), c = null;
store.characters.forEach(function (x) { if (x.id === id)
c = x; });
if (c) {
giveLife(c);
openRoster();
}
});
});
Array.prototype.forEach.call(el.querySelectorAll(".rc"), function (d) {
d.addEventListener("click", function () {
var c = null, id = d.getAttribute("data-id");
store.characters.forEach(function (x) { if (x.id === id)
c = x; });
if (!c)
return;
document.getElementById("roster").classList.remove("open");
if (!walkMode)
setWalk(true);
camera.position.set(c.x, 1.72, c.z + 6);
yaw = Math.PI;
pitch = 0;
if (c.awake)
setTimeout(function () { openTalk(c); }, 220);
});
});
}
document.getElementById("roster").classList.add("open");
}
];
});
