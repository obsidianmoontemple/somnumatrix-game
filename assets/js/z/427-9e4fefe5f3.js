/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(427, function () {
return [
function (t) {
t = String(t || "");
var letters = t.replace(/[\s\d\p{P}\p{S}]/gu, "");
if (!letters.length)
return "same";
var cnt = function (re) { var m = t.match(re); return m ? m.length : 0; }, L = letters.length;
if (cnt(/[぀-ヿ]/g) > 0)
return "ja";
if (cnt(/[가-힯]/g) / L > 0.3)
return "ko";
if (cnt(/[一-鿿]/g) / L > 0.3)
return "zh";
if (cnt(/[؀-ۿ]/g) / L > 0.3)
return "ar";
if (cnt(/[ऀ-ॿ]/g) / L > 0.3)
return "hi";
if (cnt(/[Ѐ-ӿ]/g) / L > 0.3)
return /[іїєґ]/i.test(t) ? "uk" : "ru";
var words = t.toLowerCase().replace(/[^\p{L}' ]+/gu, " ").split(/\s+/).filter(Boolean), best = "", bs = 0;
Object.keys(SML_SET).forEach(function (k) { var s = 0; words.forEach(function (w) { if (SML_SET[k][w])
s++; }); if (s > bs) {
bs = s;
best = k;
} });
if (bs)
return best;
if (/^[\x00-\x7f]*$/.test(t))
return "en?";
return "";
},
function (from, to, gesture) {
var key = from + ">" + to;
if (SML.trs[key] !== undefined)
return SML.trs[key];
var T = (typeof self !== "undefined" && self.Translator) || null;
if (!T || !T.availability || !T.create) {
SML.trs[key] = Promise.resolve(null);
return SML.trs[key];
}
var p = smlLimit(T.availability({ sourceLanguage: from, targetLanguage: to }), 4000).then(function (a) {
if (!a || a === "unavailable")
return null;
if (a !== "available" && !gesture)
return "later";
return smlLimit(T.create({ sourceLanguage: from, targetLanguage: to }), a === "available" ? 8000 : 120000);
}).catch(function () { return null; });
SML.trs[key] = p.then(function (t) { if (t === "later") {
delete SML.trs[key];
return null;
} return t; });
return SML.trs[key];
},
function (to, n) {
var L = smlInfo(to);
return "You translate the words of a video game, SomnuMatrix, into " + L[1] + " (" + L[2] + "). You get a JSON array of " + n + " strings. " +
"Reply with ONE JSON object {\"t\": [...]} holding exactly " + n + " strings, the translations in the same order. " +
"Keep {1}, {2} and the like exactly where they belong, keep emoji, keep the names of people and of places in the game as they are, and keep anything in [[double brackets]] unchanged. " +
"Short, natural wording, as a game in " + L[1] + " would say it. If a string is already in " + L[1] + ", give it back unchanged.";
},
function (texts, to, keep) {
var c = cfg();
var ready = (c.mode === "app" && typeof freshToken === "function") ? freshToken().catch(function () { }) : Promise.resolve();
var viaMessages = function () {
var T = llmTarget(c), msgs = [{ role: "system", content: smlPrompt(to, texts.length) }, { role: "user", content: JSON.stringify(texts) }];
return fetch(T.url, { method: "POST", headers: T.headers, body: JSON.stringify(llmBody(Object.assign({}, c, { model: "llama-3.1-8b-instant" }), { temperature: 0.1, max_tokens: 3000, messages: msgs, response_format: { type: "json_object" } })) })
.then(function (r) { if (!r.ok) {
var e = new Error(r.status);
e.status = r.status;
throw e;
} return r.json(); })
.then(function (d) {
var s = (d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content) || "";
var i = s.indexOf("{"), j = s.lastIndexOf("}");
var o = JSON.parse(s.slice(i, j + 1));
return o.t || o.translations || o.out;
});
};
return ready.then(function () {
if (c.mode !== "app" || SML.oldServer)
return viaMessages();
var T = llmTarget(c);
return fetch(T.url, { method: "POST", headers: T.headers, body: JSON.stringify({ translate: { to: to, texts: texts, keep: !!keep } }) })
.then(function (r) {
if (r.status === 400) {
SML.oldServer = true;
return viaMessages();
}
if (!r.ok) {
var e = new Error(r.status);
e.status = r.status;
throw e;
}
return r.json().then(function (d) { if (d && Array.isArray(d.t))
return d.t; SML.oldServer = true; return viaMessages(); });
});
});
},
function () {
if (SML.busy || !SML.q.length)
return;
var to = SML.code;
if (to === "en" && !SML.q.some(function (j) { return j.kind === "chat"; })) {
SML.q = [];
return;
}
var chat = SML.q.filter(function (j) { return j.kind === "chat"; }), ui = SML.q.filter(function (j) { return j.kind !== "chat"; });
var take = chat.concat(ui).slice(0, 60);
SML.q = SML.q.filter(function (j) { return take.indexOf(j) < 0; });
SML.busy = true;
var left = [];
var dev = take.reduce(function (p, j) {
return p.then(function () {
var from = j.from;
if (!from) {
var g = smlGuess(j.t);
from = (g === "en?") ? "en" : (g && g !== "same" ? g : "");
}
if (!from || from === to) {
if (from === to) {
j.cb(j.t);
return;
}
left.push(j);
return;
}
return smlDevice(from, to, false).then(function (tr) {
if (!tr) {
left.push(j);
return;
}
return smlDevOne(tr, from + ">" + to, j.t).then(function (out) { if (out == null) {
left.push(j);
return;
} SML.dev++; j.cb(out); });
});
});
}, Promise.resolve());
dev.then(function () {
if (!left.length || !smlAiOk()) {
SML.busy = false;
if (left.length) {
SML.q = left.concat(SML.q);
smlPumpSoon(4000);
}
else if (SML.q.length)
smlPumpSoon(200);
return;
}
var lc = left.filter(function (j) { return j.kind === "chat"; }), batch = lc.length ? lc.slice(0, 12) : [], n = 0;
if (!batch.length)
left.some(function (j) { if (batch.length >= 40 || n + j.t.length > 3000)
return true; batch.push(j); n += j.t.length; return false; });
SML.q = left.filter(function (j) { return batch.indexOf(j) < 0; }).concat(SML.q);
var keep = batch[0].kind !== "chat";
smlAiCall(batch.map(function (j) { return j.t; }), to, keep).then(function (out) {
SML.fails = 0;
SML.ai++;
SML.next = Date.now() + 1500;
batch.forEach(function (j, i) { var o = out && out[i]; j.cb(typeof o === "string" && o.trim() ? o : null); });
}).catch(function (e) {
SML.fails++;
SML.next = Date.now() + (e && e.status === 429 ? 20000 : SML.fails > 4 ? 120000 : 5000);
batch.forEach(function (j) { j.cb(null); });
}).then(function () { SML.busy = false; if (SML.q.length)
smlPumpSoon(Math.max(200, SML.next - Date.now())); });
});
},
function () {
if (SML.dbP)
return SML.dbP;
SML.dbP = new Promise(function (ok) {
try {
var r = indexedDB.open("sm-lang", 1);
r.onupgradeneeded = function () { r.result.createObjectStore("tr"); };
r.onsuccess = function () { ok(r.result); };
r.onerror = function () { ok(null); };
}
catch (e) {
ok(null);
}
});
return SML.dbP;
},
function () {
if (SML.saveT)
return;
SML.saveT = setTimeout(function () {
SML.saveT = 0;
if (!SML.dirty)
return;
SML.dirty = false;
var code = SML.code, m = SML.map, ks = Object.keys(m);
if (ks.length > 8000) {
ks.slice(0, ks.length - 8000).forEach(function (k) { delete m[k]; });
}
smlDb().then(function (db) { if (!db)
return; try {
db.transaction("tr", "readwrite").objectStore("tr").put(m, code);
}
catch (e) { } });
}, 5000);
},
function (n) {
if (!smlOn() || !smlConf().menus)
return;
var v = n.nodeValue;
if (!v)
return;
var rec = SML.orig.get(n);
if (rec && rec.t === v)
return;
var p = n.parentElement;
if (smlSkip(p))
return;
var core = v.trim();
if (!smlWord(core))
return;
var K = smlKey(core), t = SML.map[K.k];
if (t === undefined) {
SML.orig.set(n, { o: v, t: null });
smlWant(K.k, n);
return;
}
if (t === K.k)
return;
var fill = smlFill(t, K.n), out = v.replace(core, function () { return fill; });
SML.orig.set(n, { o: v, t: out });
SML.nodes.add(n);
n.nodeValue = out;
},
function (el, a) {
if (!smlOn() || !smlConf().menus || !el.getAttribute)
return;
var v = el.getAttribute(a);
if (!v)
return;
var m = SML.attrs.get(el) || {};
if (m[a] && m[a].t === v)
return;
if (smlSkip(el) && !el.matches("input,textarea"))
return;
if (el.closest && el.closest(".notr,[data-notr]"))
return;
var core = v.trim();
if (!smlWord(core))
return;
var K = smlKey(core), t = SML.map[K.k];
if (t === undefined) {
smlWant(K.k, { el: el, a: a });
return;
}
if (t === K.k)
return;
var fill = smlFill(t, K.n), out = v.replace(core, function () { return fill; });
m[a] = { o: v, t: out };
SML.attrs.set(el, m);
SML.nodes.add(el);
el.setAttribute(a, out);
},
function () {
if (!smlOn() || !smlConf().menus)
return;
var ks = Object.keys(SML.want), sent = 0;
for (var i = 0; i < ks.length && sent < 80; i++) {
var k = ks[i], w = SML.want[k];
w.who = w.who.filter(function (x) { return (x.el || x).isConnected; });
if (!w.who.length) {
delete SML.want[k];
SML.wantN--;
continue;
}
if (w.asked || !w.who.some(smlShown))
continue;
w.asked = true;
sent++;
(function (k) {
smlTr(k, "ui", function (out) {
var w = SML.want[k];
delete SML.want[k];
if (w)
SML.wantN--;
if (out == null) {
if (w) {
w.asked = false;
SML.want[k] = w;
SML.wantN++;
}
return;
}
SML.map[k] = smlFits(k, out) ? out : k;
SML.dirty = true;
smlSave();
if (w)
w.who.forEach(function (x) {
if (x.el) {
smlAttr(x.el, x.a);
return;
}
var r = SML.orig.get(x);
if (r && r.t === null && x.nodeValue === r.o) {
SML.orig.delete(x);
smlNode(x);
}
});
});
})(k);
}
},
function (root) {
if (root.nodeType === 3) {
smlNode(root);
return;
}
if (root.nodeType !== 1 || smlSkip(root))
return;
var tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n;
while ((n = tw.nextNode()))
smlNode(n);
SML_ATTRS.forEach(function (a) {
if (root.hasAttribute && root.hasAttribute(a))
smlAttr(root, a);
Array.prototype.forEach.call(root.querySelectorAll("[" + a + "]"), function (el) { smlAttr(el, a); });
});
},
function () {
if (SML.obs || !document.body)
return;
SML.obs = new MutationObserver(function (ms) {
for (var i = 0; i < ms.length; i++) {
var m = ms[i];
if (m.type === "childList")
for (var j = 0; j < m.addedNodes.length; j++)
smlWalk(m.addedNodes[j]);
else if (m.type === "characterData")
smlNode(m.target);
else if (m.type === "attributes")
smlAttr(m.target, m.attributeName);
}
});
SML.obs.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: SML_ATTRS });
smlWalk(document.body);
},
function (l, again) {
if (!l || l.smlT || l.mine || l.sys || !l.body)
return;
l.smlT = 1;
if (!smlConf().chat || !smlNeeds(l.body))
return;
var src = l.body, hit = SML.chat[src];
var put = function (out) { if (!out || out.trim() === src.trim())
return; SML.chat[src] = out; l.orig = src; l.body = out + " 🌐"; again(); };
if (hit) {
put(hit);
return;
}
smlTr(src, "chat", put);
},
function () {
var L = smlInfo();
return "LANGUAGE: the dreamer you are talking with reads and speaks " + L[1] + " (" + L[2] + "). Say everything you say to them in natural, everyday " + L[1] +
", in your own voice and manner, whatever language they write in. Keep the names of people and places as they are. Any [[TAGS]], codes or line labels you are told to use stay exactly as instructed, in English.";
},
function () {
if (SML.capEl)
return SML.capEl;
var el = document.createElement("div");
el.id = "sml-cap";
el.style.cssText = "position:fixed;left:50%;bottom:calc(150px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:46;max-width:min(620px,calc(100vw - 32px));display:flex;flex-direction:column;gap:4px;align-items:center;pointer-events:none";
document.body.appendChild(el);
SML.capEl = el;
return el;
},
function (name, text) {
var box = smlCapBox(), d = document.createElement("div");
d.style.cssText = "background:rgba(8,10,18,.82);color:#EDE8F8;border-radius:10px;padding:6px 12px;font:14px/1.4 system-ui,sans-serif;transition:opacity .8s ease;opacity:1;text-align:center";
var b = document.createElement("b");
b.textContent = name + ": ";
d.appendChild(b);
d.appendChild(document.createTextNode(text));
box.appendChild(d);
while (box.children.length > 3)
box.removeChild(box.firstChild);
setTimeout(function () { d.style.opacity = "0"; setTimeout(function () { if (d.parentNode)
d.parentNode.removeChild(d); }, 900); }, 7000);
},
function (id, raw) {
if (!smlConf().voice)
return;
var o;
try {
o = JSON.parse(raw);
}
catch (e) {
return;
}
if (!o || typeof o.c !== "string")
return;
var t = o.c.slice(0, 300), who = (typeof presenceOthers !== "undefined" && presenceOthers[id] && presenceOthers[id].name) || o.n || "Someone";
if (typeof VC !== "undefined" && (VC.local[id] || VC.mutedBy[id]))
return;
if (o.l === SML.code || !smlNeeds(t)) {
smlCapShow(who, t);
return;
}
if (SML.chat[t]) {
smlCapShow(who, SML.chat[t] + " 🌐");
return;
}
smlTr(t, "chat", function (out) { if (out)
SML.chat[t] = out; smlCapShow(who, out ? out + " 🌐" : t); });
},
function (text) {
if (typeof VC === "undefined" || !VC.on || !VC.stream)
return;
var tr = VC.stream.getAudioTracks()[0];
if (!tr || !tr.enabled)
return;
var me = (typeof store !== "undefined" && store && store.me && store.me.name) || "", msg = JSON.stringify({ c: String(text).slice(0, 300), l: SML.code, n: me });
Object.keys(VC.peers).forEach(function (id) { var P = VC.peers[id]; try {
if (P.dc && P.dc.readyState === "open")
P.dc.send(msg);
}
catch (e) { } });
},
function () {
var el = SML.panel;
if (!el) {
el = SML.panel = document.createElement("div");
el.id = "sml-panel";
el.style.cssText = "position:fixed;z-index:53;left:50%;top:50%;transform:translate(-50%,-50%);width:min(480px,calc(100vw - 32px));max-height:calc(100vh - 80px);overflow:auto;background:rgba(10,12,20,.96);color:#EDE8F8;border:1px solid rgba(201,190,168,.3);border-radius:14px;padding:16px 16px 14px;box-sizing:border-box;font:14px/1.45 system-ui,sans-serif;box-shadow:0 12px 40px rgba(0,0,0,.5)";
document.body.appendChild(el);
el.addEventListener("click", function (e) {
var t = e.target.closest && e.target.closest("[data-sml]");
if (!t)
return;
var a = t.getAttribute("data-sml");
if (a === "x") {
el.style.display = "none";
return;
}
if (a === "cap") {
SML.capOn = !SML.capOn;
smlStore("sm.lang.cap", SML.capOn ? "1" : null);
smlPaint();
return;
}
smlSet(a, true).then(function () { smlPaint(); if (typeof setStatus === "function")
setStatus("🌐 " + smlInfo()[2]); });
});
}
el.style.display = "block";
smlPaint();
},
function () {
var el = SML.panel;
if (!el)
return;
var C = smlConf(), SR = window.SpeechRecognition || window.webkitSpeechRecognition;
var dev = (typeof self !== "undefined" && self.Translator) ? "This browser translates on the device itself, free and offline." : "This browser can't translate by itself, so the city's AI does it.";
var h = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><b style="font-size:16px">🌐 Language</b><button type="button" class="btn" data-sml="x">✕</button></div>' +
'<div style="opacity:.85;margin-bottom:10px">The game in your language: menus, chat from other dreamers, and what the city\'s people say to you.</div>' +
'<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:6px">' +
SML_LANGS.map(function (L) {
var on = L[0] === SML.code;
return '<button type="button" class="btn sml-n" data-sml="' + L[0] + '" style="text-align:left;' + (on ? "outline:2px solid #C9BEA8;" : "") + '">' + (on ? "✓ " : "") + L[2] + '</button>';
}).join("") + '</div>';
if (smlOn())
h += '<div style="opacity:.8;margin-top:10px;font-size:12.5px">' + dev + (C.menus ? "" : " The Keeper has the menus in English for now.") + '</div>';
h += '<div style="margin-top:12px;padding-top:10px;border-top:1px solid rgba(201,190,168,.2)"><b>🎙️ Captions of my voice</b> ' +
'<button type="button" class="btn" data-sml="cap" style="margin-left:6px">' + (SML.capOn ? "On" : "Off") + '</button>' +
'<div style="opacity:.8;font-size:12.5px;margin-top:4px">' + (SR ? "While your voice is on, what you say is written out for the people near you, each in their own language. Only while your voice is going out." : "This browser can't listen for captions (Chrome and Edge can). You still see other people's captions.") + '</div></div>';
el.innerHTML = h;
}
];
});
