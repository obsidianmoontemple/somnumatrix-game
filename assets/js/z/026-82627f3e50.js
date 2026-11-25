/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(26, function () {
"use strict";
return [
function (low, s, e, key) {
var sen = " " + low.slice(Math.max(0, s - 70), Math.min(low.length, e + 70)) + " ";
var me = DEITY[key];
if ((me.icons || []).some(function (ic) { var w = ic.split(":")[0]; return w.length > 2 && !DEITY_PLAIN_ICON.test(w) && new RegExp("\\b" + w + "s?\\b").test(sen); }))
return true;
return DEITY_WORDS.some(function (q) { return q[1] !== key && !DEITY[q[1]].cue && sen.indexOf(" " + q[0] + " ") > -1; });
},
function (low) {
var out = [], taken = [];
DEITY_WORDS.forEach(function (p) {
var needle = " " + p[0] + " ", i = 0;
while ((i = low.indexOf(needle, i)) > -1) {
var s = i, e = i + needle.length - 1, clash = false;
for (var t = 0; t < taken.length; t++)
if (s < taken[t][1] && e > taken[t][0])
clash = true;
if (!clash) {
var d = DEITY[p[1]], before = low.slice(Math.max(0, s - 30), s + 1);
var cued = CUES.test(before) || deityCompany(low, s, e, p[1]);
if (!d.cue || cued) {
var cm = /\b(the god|the goddess|god|goddess|lady|lord|the great|the orisa|the orisha|the lwa|the loa|the dragon|the serpent|the demon)\s*$/.exec(low.slice(0, s + 1));
var s2 = cm ? cm.index : s;
out.push({ at: s2, end: e, key: p[1], word: p[0] });
taken.push([s2, e]);
}
}
i = e;
}
});
return out.sort(function (a, b) { return a.at - b.at; });
},
function (c) {
var t = " " + (c.details || []).join(" ").toLowerCase() + " ";
if (/would not speak|wouldn't speak|said nothing|never spoke|did not speak|didn't speak|silent|without a word|in silence/.test(t))
return "silent";
if (/whisper/.test(t))
return "whispering";
if (/\bsang\b|singing|\bsong\b/.test(t))
return "singing";
if (/riddle|in riddles/.test(t))
return "riddling";
if (/angry|furious|wrath|rage|raging|stern|glared/.test(t))
return "stern";
if (/laugh|smil|kind|gentle|warm|tender/.test(t))
return "kind";
if (/wept|weeping|crying|mourn|sorrow/.test(t))
return "sorrowful";
if (/command|ordered|demanded|told me to/.test(t))
return "commanding";
if (/led me|guided me|showed me the way|took me|beckoned/.test(t))
return "guiding";
return null;
},
function (key, attrs, opts) {
var d = DEITY[key];
if (!d)
return null;
var ch = deityCharacter(key), body = ch && ch.objId ? specById(ch.objId) : null;
if (body && (body.realm || 0) === (store.here || 0)) {
if (ch.sessions.indexOf(store.session) === -1)
ch.sessions.push(store.session);
if (body.nights.indexOf(store.session) === -1)
body.nights.push(store.session);
if (opts && opts.look)
applyLook(body, opts.look, null);
refresh(body);
save();
return body;
}
var arch = d.dragon ? "dragon" : "deity";
var s;
if (d.dragon) {
store.open = (store.open || 0) + 1;
var h = heartOf(store.here || 0), ang = store.open * 2.39996, rad = 160 + (store.open % 4) * 40;
s = { x: h.x + Math.cos(ang) * rad, z: h.z + Math.sin(ang) * rad, rot: Math.random() * 6.283 };
}
else
s = spotFor("human", opts && opts.dir, {});
var spec = { id: uid(), archetype: arch, label: d.name, name: d.name, named: "stated", deity: key, attrs: attrs || {},
x: s.x, z: s.z, rot: s.rot || 0, solid: true, detail: 4, nights: [store.session], addr: s.addr || null };
if (store.here)
spec.realm = store.here;
if (!d.dragon) {
lookOf(spec);
deityLook(spec, d);
if (opts && opts.look)
applyLook(spec, opts.look, null);
}
store.objects.push(spec);
if (ch) {
ch.objId = spec.id;
ch.x = spec.x;
ch.z = spec.z;
ch.anchor = { x: spec.x, z: spec.z };
if (ch.sessions.indexOf(store.session) === -1)
ch.sessions.push(store.session);
}
else {
ch = newCharacter(arch, d.name, attrs || {});
ch.name = d.name;
ch.deity = key;
ch.awake = true;
ch.src = { name: "stated" };
ch.aka = [normName(d.name)].concat(d.aka.map(normName));
ch.objId = spec.id;
ch.x = spec.x;
ch.z = spec.z;
ch.anchor = { x: spec.x, z: spec.z };
}
spec.charId = ch.id;
addMesh(spec);
store.lastDeity = spec.id;
viewAt = null;
updateCount();
save();
return spec;
},
function (spec, d) {
var L = lookOf(spec);
L.src = L.src || {};
d.icons.forEach(function (t) {
var p = t.split(":");
if (p[0] === "robe") {
L.top = ICONCOL[p[1]];
L.bottom = shade(ICONCOL[p[1]], -0.2);
L.topKind = "robe";
L.src.top = L.src.bottom = L.src.topKind = "tradition";
}
if (p[0] === "armor") {
L.top = 0x8A8C92;
L.bottom = 0x55575C;
L.topKind = "shirt";
L.src.top = "tradition";
}
if (p[0] === "skin") {
L.skin = ICONSKIN[p[1]];
L.src.skin = "tradition";
}
if (p[0] === "hair") {
L.hair = ICONCOL[p[1]] || L.hair;
L.src.hair = "tradition";
}
if (p[0] === "hat") {
L.hat = p[1];
L.src.hat = "tradition";
}
if (p[0] === "longbeard" || p[0] === "beard") {
L.sex = L.sex || "m";
}
});
if (!L.hairStyle)
L.hairStyle = "long";
}
];
});
