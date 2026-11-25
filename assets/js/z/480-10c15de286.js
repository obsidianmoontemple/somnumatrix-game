/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(480, function () {
"use strict";
return [
function (t) {
return String(t || "").replace(/<[^>]*>/g, " ").replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[☀-➿]|[⬀-⯿]|️|‍/g, "").replace(/[“”"«»]/g, "").replace(/\s+/g, " ").trim().replace(/[\s.,;:!?'’)\-]+$/, "").replace(/^[\s'‘(]+/, "").replace(/(\s+(of|the|de|von|van|and|a|an|in|on|at|to|by))+$/i, "").replace(/'s$/, "");
},
function (n) {
n = svoName(n);
var cut = n.split(/\.\s+/), last = cut.pop();
while (cut.length && /(^|\s)(Mr|Mrs|Ms|Dr|St|Mt|Jr|Sr|[A-Z])$/.test(cut[cut.length - 1]))
last = cut.pop() + ". " + last;
n = last;
n = n.replace(/^(but|and|then|so|now|yet|when|as|while|until|if|for|or|said|says|cried|asked)\s+/i, "");
return n;
},
function (n) {
n = svoName(n);
if (!n || n.length > 48 || /\d/.test(n) || SVO_NOTNAME.test(n))
return false;
var W = n.split(" ");
if (W.length > 7)
return false;
if (!W.some(function (w) { return /^[A-Z]/.test(w) && !/^(The|A|An|Old|Young|Little)$/.test(w); }))
return false;
if (SVO_NOTWHO.test(n) && !SVO_WHO[n.toLowerCase()] && !SVO_F.test(n) && !SVO_M.test(n))
return false;
return W.every(function (w, i) { return /^(of|the|de|da|di|del|van|von|der|le|la|du|y|and|&|in|on|at|a)$/i.test(w) && i > 0 || /^[A-Z0-9'"‘’(\-]/.test(w) || /^(the|a)$/i.test(w); });
},
function (n) {
n = svoName(n);
var ln = n.toLowerCase(), first = n.replace(/^(the|a|old|young|little|saint|good|wicked)\s+/i, "").split(" ")[0].replace(/[^A-Za-z]/g, "");
if (SVO_WHO[ln] || SVO_WHO[ln.replace(/^the /, "")] || SVO_F.test(n) || SVO_M.test(n) || SVO_FN.test(first))
return true;
if (SVO_KIND.some(function (K) { return K[1].test(n); }))
return true;
try {
if (typeof dvoKeyOf === "function" && dvoKeyOf({ name: n }))
return true;
}
catch (e) { }
return false;
},
function (K, name, sx, kid) {
if (!name || typeof name !== "string")
return;
sx = String(sx || "").toLowerCase().charAt(0);
if (sx !== "f" && sx !== "m")
return;
var v = { sx: sx, kid: !!kid }, keys = [svoKey(name)], cut = name.split(/,|\s+[-–—(]\s*/)[0];
if (cut !== name)
keys.push(svoKey(cut));
keys.forEach(function (k) { if (!k)
return; k = k.replace(/^the /, ""); var o = K.full.get(k); if (!o)
K.full.set(k, v);
else if (o.sx !== sx)
o.mix = 1; });
var f = svoKey(cut).replace(/^(the|a|an|old|young|little|la|le|mme|mlle|m|mr|mrs|miss|dr|captain|lord|lady|sir|senator|king|queen|prince|princess)\s+/, "").split(" ")[0];
if (f && f.length > 2 && !/^(a|an|the|one|of)$/.test(f)) {
var o2 = K.first.get(f);
if (!o2)
K.first.set(f, { sx: sx, kid: !!kid });
else if (o2.sx !== sx)
o2.mix = 1;
}
},
function () {
var now = Date.now();
if (SVO_KNOWN.n >= 0 && now - (SVO_KNOWN.t || 0) < 3000)
return SVO_KNOWN;
var G;
try {
G = Object.getOwnPropertyNames(window);
}
catch (e) {
return SVO_KNOWN;
}
if (G.length === SVO_KNOWN.n) {
SVO_KNOWN.t = now;
return SVO_KNOWN;
}
var K = new SvoKnownT(G.length);
G.forEach(function (g) {
if (!/^[A-Z][A-Z0-9_]+$/.test(g) || /^SVO_/.test(g))
return;
var v;
try {
v = window[g];
}
catch (e) {
return;
}
if (!v || typeof v !== "object" || v.nodeType)
return;
try {
var ks = Array.isArray(v) ? null : Object.keys(v).slice(0, 4000), vals = ks ? ks.map(function (k) { return v[k]; }) : v.slice(0, 4000);
vals.forEach(function (x, i) {
if (!x || typeof x !== "object")
return;
if (ks && typeof x.name !== "string" && typeof x.sex === "string" && /^[a-z][a-z' -]{2,30}$/.test(ks[i]))
svoKnownAdd(K, ks[i], x.sex, x.child || x.kid);
if (Array.isArray(x)) {
if (typeof x[0] === "string" && (x[1] === "f" || x[1] === "m"))
svoKnownAdd(K, x[0], x[1], x[5]);
return;
}
var sx = x.sex || x.sx || x.gender;
if (typeof x.name === "string" && typeof sx === "string")
svoKnownAdd(K, x.name, sx, x.child || x.kid);
if (Array.isArray(x.cast))
x.cast.forEach(function (c) { if (c && typeof c.name === "string" && (c.sex || c.sx))
svoKnownAdd(K, c.name, c.sex || c.sx, c.child); });
});
}
catch (e) { }
});
K.t = now;
SVO_KNOWN = K;
return K;
},
function (n) {
var K = svoKnown(), k = svoKey(n).replace(/^the /, ""), o = K.full.get(k);
if (o && !o.mix)
return o;
var cut = svoKey(String(n).split(/,|\s+[-–—(]\s*/)[0]).replace(/^the /, "");
o = K.full.get(cut);
if (o && !o.mix)
return o;
if (k.split(" ").length <= 2) {
var f = k.replace(/^(a|an|old|young|little|la|le|mme|mlle|m|mr|mrs|miss|dr|captain|lord|lady|sir|senator|king|queen|prince|princess)\s+/, "").split(" ")[0];
o = K.first.get(f);
if (o && !o.mix && !/^(a|an|one|someone|voice)$/.test(f))
return o;
}
return null;
},
function (n) {
var c = String(n || "").split(/,|\s+[-–—(]\s*/)[0].trim(), W = c.split(/\s+/);
if (!c)
return false;
if (/^(a|an|the|one|some|another)\s+[a-z]/i.test(c) && !/^(the|a|an)\s+[A-Z][a-z]+\s+[A-Z]/.test(c))
return !SVO_FN.test(W[1] || "");
if (W.length >= 2 && W.slice(1).every(function (w) { return /^[a-z]/.test(w) || /^(of|the|and|&)$/i.test(w); }))
return true;
if (W.length === 1 && /^[a-z]/.test(c))
return true;
return false;
},
function (name, body, about) {
var n = svoName(name), ln = n.toLowerCase(), W = SVO_WHO[ln] || SVO_WHO[ln.replace(/^the /, "")] || {}, P = { name: n || "someone", sx: W.sx || "", kid: !!W.kid, old: !!W.old, kind: W.k || "", p: W.p || 0, r: W.r || 0, loc: W.loc || null };
var ab = String(about || "");
if (!P.sx && body && (body.sx === "f" || body.sx === "m") && svoRole(n) && !SVO_FS.test(n) && !SVO_MS.test(n))
P.sx = body.sx;
if (!P.sx) {
var KN = svoKnownOf(n);
if (KN) {
P.sx = KN.sx;
if (KN.kid && !W.old)
P.kid = true;
}
}
if (!P.sx && /^la\s+[A-Z]/i.test(n))
P.sx = "f";
if (!P.sx) {
var f = SVO_F.test(n), m = SVO_M.test(n);
if (f && !m)
P.sx = "f";
else if (m && !f)
P.sx = "m";
else if (f && m) {
var fi = n.search(SVO_F), mi = n.search(SVO_M);
P.sx = fi < mi ? "f" : "m";
}
}
var first = n.replace(/^(the|a|old|young|little|saint|st\.?|good|wicked)\s+/i, "").split(" ")[0].replace(/[^A-Za-z]/g, "");
if (!P.sx && SVO_FN.test(first))
P.sx = "f";
if (!P.sx && first && /^[A-Z]/.test(first) && /(a|ia|ina|ette|elle|ine)$/i.test(first) && !SVO_MA.test(first) && n.split(" ")[0] === first)
P.sx = "f";
if (!P.sx && ab) {
var she = (ab.match(/\b(she|her|hers|herself|woman|girl|lady|mother|wife)\b/gi) || []).length, he = (ab.match(/\b(he|him|his|himself|man|boy|gentleman|father|husband)\b/gi) || []).length;
if (she > he)
P.sx = "f";
else if (he > she)
P.sx = "m";
}
if (!P.sx && body && (body.sx === "f" || body.sx === "m"))
P.sx = body.sx;
if (!P.sx && first && !/^(the|a|an|someone|voice|one)$/i.test(n.split(" ")[0]) && /^[A-Z]/.test(first) && !SVO_KIND.some(function (K) { return K[1].test(n); }))
P.sx = "m";
if (!W.kid && !W.old) {
if (SVO_OLD.test(n) || (ab && /\b(old|elderly|aged|grey-haired|white-haired|grandmother|grandfather)\b/i.test(ab)))
P.old = true;
else if (SVO_KID.test(n) || (ab && /\b(little girl|little boy|a child|a boy of|a girl of|young boy|young girl|\d{1,2}[- ]year[- ]old)\b/i.test(ab)))
P.kid = true;
else if (body && body.kid)
P.kid = true;
}
if (!P.kind && !SVO_WHO[ln] && !/^(mr|mrs|miss|ms|dr|doctor|captain|professor|lord|lady|sir|master|mistress|goodwife|constable|inspector|commander|uncle|aunt)\.?\s/i.test(n)) {
for (var i = 0; i < SVO_KIND.length; i++)
if (SVO_KIND[i][1].test(n)) {
P.kind = SVO_KIND[i][0];
break;
}
}
if (!P.loc) {
for (var j = 0; j < SVO_PEOPLE.length; j++)
if (SVO_PEOPLE[j][0].test(n)) {
P.loc = SVO_PEOPLE[j][1];
break;
}
}
if (!P.sx && (P.kind === "beast" || P.kind === "giant" || P.kind === "machine" || P.kind === "gruff"))
P.sx = "m";
if (!P.sx) {
P.sx = (svoHash("sx:" + ln) % 2) ? "f" : "m";
P.guess = true;
}
return P;
},
function () {
try {
if (typeof camera === "undefined" || !camera)
return null;
var P = camera.position, best = null, bd = 36, dead = 0, v = svoNearBody.v || (svoNearBody.v = new THREE.Vector3());
for (var i = 0; i < SVO.reg.length; i++) {
var r = SVO.reg[i], g = r && r.deref ? r.deref() : r;
if (!g || !g.parent) {
dead++;
continue;
}
if (!g.visible)
continue;
g.getWorldPosition(v);
var dx = v.x - P.x, dz = v.z - P.z, d = dx * dx + dz * dz;
if (d < bd && Math.abs(v.y - P.y) < 6) {
bd = d;
best = g;
}
}
if (dead > 200)
svoPrune();
return best ? best.userData.svo : null;
}
catch (e) {
return null;
}
},
function (P, V) {
V = V || [];
var key = String(P.name).toLowerCase(), h = svoHash("svo:" + key), sx = P.sx;
if (svoWorld() && !/^(space|station|surface|shuttle)$/.test(svoWorld()) && typeof dvoPick === "function") {
try {
var dv = dvoPick({ name: P.name }, V);
if (dv && dv.voice !== undefined) {
if (dv.sx)
P.sx = dv.sx;
return { voice: dv.voice, p: dv.p, rt: dv.rt, sx: dv.sx, god: dv.key };
}
}
catch (e) { }
}
var pool = V.slice();
var kidV = P.kid ? pool.filter(function (v) { return SVO_CHILDV.test(String(v.name || "")); }) : [];
if (kidV.length) {
var ks = kidV.filter(function (v) { return !svoVS(v) || svoVS(v) === sx || /ana|maisie/i.test(v.name); });
if (ks.length)
kidV = ks;
}
var VS = kidV.length ? kidV : pool.filter(function (v) { return !SVO_CHILDV.test(String(v.name || "")) && svoVS(v) === (P.kid && !kidV.length ? "f" : sx); });
if (P.kid && !kidV.length && !VS.length)
VS = pool.filter(function (v) { return svoVS(v) === sx; });
if (!VS.length)
VS = pool.filter(function (v) { return !svoVS(v); });
if (!VS.length)
VS = pool;
if (typeof fvoBest === "function")
VS = fvoBest(VS);
var loc = P.loc || SVO_LOC[svoWorld()] || ["en-GB", "en-US"];
if (!P.loc && SVO_MIX[svoWorld()] && loc.length > 1)
loc = [loc[(svoHash("loc|" + key + "|" + key.length) >>> 7) % loc.length]].concat(loc);
var top = 0;
if (typeof fvoReal === "function")
VS.forEach(function (v) { top = Math.max(top, fvoReal(v)); });
for (var i = 0; i < loc.length; i++) {
var want = loc[i].toLowerCase();
var A = VS.filter(function (v) { var l = svoLang(v); return (l === want || (want === "en-gb-scotland" && /scot/i.test(v.name + " " + l))) && (typeof fvoReal !== "function" || fvoReal(v) >= Math.max(1, top - 1)); });
if (A.length) {
VS = A;
break;
}
}
var voice = VS.length ? VS[h % VS.length] : null, vs = svoVS(voice), kidVoice = !!(voice && SVO_CHILDV.test(voice.name || ""));
var p = 0.96 + ((h >>> 8) % 9) / 100, rt = 0.95 + ((h >>> 16) % 9) / 100;
if (sx && vs && vs !== sx)
p *= sx === "m" ? 0.8 : 1.22;
else if (!vs && sx === "m")
p *= 0.86;
else if (!vs && sx === "f")
p *= 1.05;
if (P.kid) {
if (!kidVoice)
p = Math.max(p * 1.22, 1.2);
rt = Math.min(1.14, rt + 0.06);
}
else if (P.old) {
p *= 0.93;
rt = Math.max(0.8, rt - 0.09);
}
var K = null;
for (var j = 0; j < SVO_KIND.length; j++)
if (SVO_KIND[j][0] === P.kind) {
K = SVO_KIND[j];
break;
}
if (K) {
if (P.kind === "small")
p = Math.max(p, K[2]);
else if (P.kind === "gentle" || P.kind === "royal" || P.kind === "witch")
p *= K[2];
else
p = Math.min(p, K[2] + ((h >>> 8) % 5) / 100);
rt = P.kind === "small" ? Math.max(rt, K[3]) : Math.min(rt, K[3] + ((h >>> 16) % 4) / 100);
}
if (P.p)
p = P.p * (P.kid ? 1.15 : 1);
if (P.r)
rt = P.r;
try {
if (typeof dvoKids === "function" && dvoKids()) {
p = Math.max(p, 0.92);
rt = Math.max(rt, 0.9);
}
}
catch (e) { }
p = Math.max(0.5, Math.min(1.7, p));
rt = Math.max(0.72, Math.min(1.18, rt));
return { voice: voice, p: p, rt: rt, sx: sx };
},
function (L, done, src) {
if (L && L.length)
L = L.filter(function (x) { return x && !svoSys(x.text); });
if (!svoOn() || !L || !L.length) {
if (done)
done();
return;
}
var run = (SVO.run = (SVO.run || 0) + 1), V = (typeof FVO !== "undefined" && FVO.voices && FVO.voices.length) ? FVO.voices : (typeof fvoVoices === "function" ? fvoVoices() : []);
var Q = [];
L.forEach(function (x) { var t = typeof fvoClean === "function" ? fvoClean(x.text) : String(x.text || ""); if (!t)
return; var parts = typeof fvoPieces === "function" ? fvoPieces(t.slice(0, 1400)) : [t]; var vp = svoPick(x.who, V); parts.forEach(function (pt) { Q.push({ t: pt, v: vp, who: x.who }); }); });
if (!Q.length) {
if (done)
done();
return;
}
SVO.fromCard = src === "card";
SVO.said = { src: src || "", lines: Q.map(function (q) { return { who: q.who.name, text: q.t, voice: q.v.voice && q.v.voice.name || "", lang: q.v.voice && q.v.voice.lang || "", pitch: +q.v.p.toFixed(2), rate: +q.v.rt.toFixed(2), sx: q.who.sx, kid: q.who.kid, old: q.who.old, kind: q.who.kind, god: q.v.god || "" }; }) };
try {
speechSynthesis.cancel();
speechSynthesis.resume();
}
catch (e) { }
var i = 0, fin = false;
var next = function () {
if (run !== SVO.run || fin)
return;
if (i >= Q.length) {
fin = true;
if (done)
done();
return;
}
var q = Q[i++], started = false, tried = false;
var go = function (vo) {
var u = new SpeechSynthesisUtterance(q.t);
if (vo) {
u.voice = vo;
u.lang = vo.lang || "en-GB";
}
u.pitch = q.v.p;
u.rate = q.v.rt;
u.volume = 1;
u.onstart = function () { started = true; };
u.onend = function () { started = true; next(); };
u.onerror = function (ev) { var er = ev && ev.error; if (!started && !tried && er !== "interrupted" && er !== "canceled") {
tried = true;
go(svoOwn(V, q.v));
}
else if (er !== "interrupted" && er !== "canceled")
next(); };
try {
speechSynthesis.speak(u);
}
catch (e) {
next();
}
setTimeout(function () { if (!started && !tried && run === SVO.run && !speechSynthesis.speaking) {
tried = true;
try {
speechSynthesis.cancel();
}
catch (e) { }
go(svoOwn(V, q.v));
} }, 2500);
};
go(q.v.voice);
};
next();
},
function (html) {
try {
var d = document.createElement("div");
d.innerHTML = String(html || "").replace(/<br\s*\/?>|<\/(div|p|li|h\d|tr)>/gi, " $&");
d.querySelectorAll("[data-w],button,script,style,input,select,textarea").forEach(function (x) { x.remove(); });
return (d.textContent || "").replace(/\s+/g, " ").trim();
}
catch (e) {
return String(html || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
},
function (text, dflt, body) {
var out = [], re = /“([^”]{2,})”?|"([^"]{2,})"?|«([^»]{2,})»?|(?:^|[\s(>—])[‘']([A-Z][^]*?[.!?,;:…—\-])[’'](?=[\s()<]|$)/g, m, lastWho = null;
while ((m = re.exec(text))) {
var q = (m[1] || m[2] || m[3] || m[4] || "").trim();
if (!q || !/[A-Za-z]/.test(q))
continue;
var before = text.slice(Math.max(0, m.index - 90), m.index), after = text.slice(re.lastIndex, re.lastIndex + 70), who = null, mm;
var pron = "";
if ((mm = before.match(SVO_BEFORE))) {
if (svoNameLike(svoTidy(mm[1])))
who = svoTidy(mm[1]);
else if (/^(she|he)$/i.test(svoTidy(mm[1])))
pron = svoTidy(mm[1]).toLowerCase();
}
if (!who && !pron && (mm = before.match(SVO_COLON))) {
var t3 = svoTidy(mm[1]);
if (svoNameLike(t3) && (svoPerson(t3) || !/^(the|a|an)\b/i.test(t3)))
who = t3;
else if (/^(she|he)$/i.test(t3))
pron = t3.toLowerCase();
}
if (!who && !pron && (mm = after.match(SVO_AFTER))) {
if (svoNameLike(svoTidy(mm[1])))
who = svoTidy(mm[1]);
}
if (!who && !pron && (mm = after.match(SVO_AFTER2))) {
var t2 = svoTidy(mm[1]);
if (svoNameLike(t2))
who = t2;
else if (/^(she|he)$/i.test(t2))
pron = t2.toLowerCase();
}
var P = null;
if (who)
P = svoWho(who, null);
else if (pron) {
var ps = pron === "she" ? "f" : "m";
P = lastWho && lastWho.sx === ps ? lastWho : dflt && dflt.sx === ps ? dflt : svoWho("someone " + pron, null, pron);
}
else
P = lastWho || dflt || svoWho("the voice", body);
if (q.split(" ").length < 2 && q.length < 14 && !/[!?.]$/.test(q))
continue;
out.push({ who: P, text: q });
if (who)
lastWho = P;
}
return out;
},
function (body) {
var Pr = SVO.prompt;
if (!Pr || Date.now() - Pr.at > 45000)
return null;
var t = Pr.t.replace(/\bpress E\b.*$/i, ""), NM = "((?:the |old |young |little )?[A-Z][\\w'’\\-]*\\.?(?:\\s+(?:of|the|de|von|van|[A-Z][\\w'’\\-]*\\.?)){0,4})";
var pr = /\b(her|she)\b/i.test(t) && !/\b(him|he|his)\b/i.test(t) ? "she" : /\b(him|he|his)\b/i.test(t) && !/\b(her|she)\b/i.test(t) ? "he" : "";
var pats = [new RegExp("\\b(?:speak|talk|chat|listen|answer|reply|say [^.]{0,20})\\s+(?:with|to)\\s+" + NM),
new RegExp("\\b(?:Ask|Show|Give|Tell|Help|Hear|Wake|Comfort|Follow|Meet|Greet|Hail|Thank|Warn|Find|Join|Visit|Call|Question|Fetch|Bring)\\s+" + NM),
new RegExp("(?:^|[.!?]\\s+)" + NM + "\\s+(?:is|are|was|stands|sits|waits|wants|has|keeps|holds|looks|comes|calls|needs|says|asks|leans|lies|kneels|paces|works|sews|reads|watches)\\b")];
for (var i = 0; i < pats.length; i++) {
var m = t.match(pats[i]);
if (!m)
continue;
var n = svoTidy(m[1]);
if (svoNameLike(n) && !SVO_NOTWHO.test(n) && (i === 0 || svoPerson(n)))
return svoWho(n, body, pr);
}
return null;
},
function (html) {
if (!svoStory() || !svoOn())
return;
var title = "", d = null;
try {
d = document.createElement("div");
d.innerHTML = String(html || "");
var t = d.querySelector("div[style*='17px']") || d.querySelector("b,h1,h2,h3");
title = t ? (t.textContent || "") : "";
if (t)
t.remove();
}
catch (e) { }
var text = d ? svoTextOf(d.innerHTML) : svoTextOf(html);
var body = svoNearBody(), tn = svoName(title);
var strong = svoNameLike(tn) && svoPerson(tn), dflt = strong ? svoWho(tn, body) : svoPromptWho(body);
if (!dflt && svoNameLike(tn))
dflt = svoWho(tn, body);
if (!dflt)
dflt = svoDefault(body);
var L = svoQuotes(text, dflt, body);
if (!L.length) {
var mm = text.match(/^\s*([^:]{2,48}):\s+(.{4,})$/);
if (mm && svoNameLike(mm[1]))
L = [{ who: svoWho(mm[1], body), text: mm[2] }];
}
if (!L.length)
return;
var key = L.map(function (x) { return x.text; }).join("|");
if (key === SVO.last && Date.now() - SVO.lastT < 4000)
return;
SVO.last = key;
SVO.lastT = Date.now();
svoSay(L, null, "card");
},
function (nm) {
var first = String(nm || "").replace(/^(the|old|young|little|dr|mr|mrs|miss|ms|captain|sir|lady|lord)\.?\s+/i, "").split(/[\s·,]/)[0].replace(/[^A-Za-z]/g, "");
if (!first)
return "";
var low = first.toLowerCase(), F = typeof TEMP_GIVEN_F !== "undefined" ? TEMP_GIVEN_F : [], M = typeof TEMP_GIVEN_M !== "undefined" ? TEMP_GIVEN_M : [];
var inF = F.some(function (x) { return String(x).toLowerCase() === low; }), inM = M.some(function (x) { return String(x).toLowerCase() === low; });
if (inF && !inM)
return "f";
if (inM && !inF)
return "m";
if (SVO_MN.test(first) && !SVO_FN.test(first))
return "m";
if (SVO_FN.test(first) && !SVO_MN.test(first) && !SVO_MA.test(first))
return "f";
return "";
},
function (g, want) {
var A = g.userData.svoArgs;
if (!A || !A.wp)
return false;
var o = Object.assign({}, A.o, { sex: want });
if (o.look)
o.look = Object.assign({}, o.look, { sex: want });
var g2 = A.wp(A.seed, o);
if (!g2)
return false;
(A.kids || []).forEach(function (c) { if (c.parent === g)
g.remove(c); });
var nk = g2.children.slice();
nk.forEach(function (c) { g2.remove(c); g.add(c); });
g.children = nk.concat(g.children.filter(function (c) { return nk.indexOf(c) < 0; }));
Object.keys(g2.userData).forEach(function (k) { if (!/^(wSeed|wan|svo|svoArgs|svoTagged)$/.test(k))
g.userData[k] = g2.userData[k]; });
g.userData.svo = { sx: want, kid: g.userData.svo && g.userData.svo.kid };
A.kids = nk;
A.o = o;
return true;
}
];
});
