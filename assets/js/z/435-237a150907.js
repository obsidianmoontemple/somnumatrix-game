/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(435, function () {
"use strict";
return [
function (p) {
var s = [], D = TLV.d || {};
if (p.by === "born")
s.push("You were born here in Somnucor, in " + tlvRingName(p.ring) + ".");
else if (p.by === "train")
s.push("You came to Somnucor on the train " + tlvAgo(p.came) + ", from far away, to make a new start.");
else if (p.by === "plane")
s.push("You flew into Somnucor " + tlvAgo(p.came) + ", from far away, to make a new start.");
else if (p.by === "sea")
s.push("You came to Somnucor by ship, landing at the harbour " + tlvAgo(p.came) + ".");
else
s.push("You have lived in Somnucor for a long time.");
if (p.mate) {
if (p.mate.alive)
s.push("You are married to " + p.mate.n + (p.mate.job ? ", who works as " + p.mate.job : "") + ".");
else
s.push("Your spouse, " + p.mate.n + ", passed away; you still miss them.");
}
var kids = (p.kids || []).filter(function (k) { return k.alive; });
if (kids.length)
s.push("Your " + (kids.length === 1 ? "child is " : "children are ") + kids.map(function (k) { return k.n.split(" ")[0] + " (" + k.age + ")"; }).join(", ") + ".");
var mum = (p.mum || []);
if (mum.length) {
var al = mum.filter(function (m) { return m.alive; }), gone = mum.filter(function (m) { return !m.alive; });
if (al.length)
s.push("Your " + (al.length > 1 ? "parents are " : "parent is ") + al.map(function (m) { return m.n; }).join(" and ") + ".");
if (gone.length)
s.push(gone.map(function (m) { return m.n; }).join(" and ") + (gone.length > 1 ? " have" : " has") + " passed away, and you think of them.");
}
if (p.since && tlvYears(p.since) < 0.3 && p.k && p.age >= 18)
s.push("You only started in this job lately and are still learning the ropes.");
var news = (D.log || []).slice(0, 4).map(function (l) { return l.line; });
if (news.length)
s.push("Recent news in the town that you know about: " + news.join(" ") + " Mention it only if it comes up.");
return s.join(" ");
},
function () {
var H = TLV.hist;
if (!H)
return tlvDim("Opening the galleries…");
if (!H.on)
return tlvDim("The museum is closed just now.");
var rows = H.rows || [];
var h = tlvDim("The City Museum keeps Somnucor's real past. Weddings, the ring council elections, the season landmarks, the Fall of Somnucor, track records and the town's own firsts are added on their own, with the date and a photo of the place.");
if (!rows.length)
return h + tlvDim("The galleries are waiting for the city's first chapter.");
rows.forEach(function (r) {
var ph = r.photo ? '<img src="' + esc(tlvPhotoUrl(r.photo)) + '" alt="" loading="lazy" style="width:100%;max-height:220px;object-fit:cover;border-radius:4px;margin:6px 0 2px;display:block">' : "";
h += '<div style="border:1px solid #3A3226;border-radius:6px;padding:8px 10px;margin-bottom:8px;background:rgba(201,168,104,.05)">' +
'<div style="display:flex;gap:8px;align-items:baseline"><span style="font-size:18px">' + esc(r.icon || "🏛️") + '</span><b style="flex:1;color:#F2E6C4">' + esc(r.title) + '</b>' +
'<span style="color:#9AA3B5;white-space:nowrap">' + esc(tlvDay(r.at)) + '</span></div>' + ph +
(r.body ? '<div style="margin-top:4px">' + esc(r.body) + '</div>' : "") + '</div>';
});
return h;
},
function () {
var D = TLV.d;
if (!D)
return tlvDim("Opening the register…");
if (!D.on)
return tlvDim("The town's years are standing still just now (the Keeper has paused them).");
var L = D.log || [], ppl = (D.people || []).filter(function (p) { return p.st !== "gone" && p.st !== "left"; });
var h = tlvDim("Somnucor's people live whole lives: a city year passes every " + (+D.year_days || 7) + " real days. " + ppl.length + " townsfolk live here now" +
(D.slots ? ", in " + D.slots + " homes and posts" : "") + ".");
if (!L.length)
return h + tlvDim("Nothing has happened in the town yet. Look again in a day or two.");
L.forEach(function (l) {
h += '<div style="padding:5px 0;border-bottom:1px solid #22262F"><span style="margin-right:6px">' + (TLV_KIND[l.kind] || "•") + '</span>' + esc(l.line) +
' <span style="color:#7A8294;white-space:nowrap">' + esc(tlvDay(l.at)) + '</span></div>';
});
return h;
},
function () {
var D = TLV.d;
if (!D)
return tlvDim("Opening the register…");
var q = (TLV.q || "").toLowerCase(), all = (D.people || []).filter(function (p) { return p.st !== "gone" && p.st !== "left"; });
var h = '<div style="display:flex;gap:6px;margin:4px 0 8px"><input id="tlv-q" placeholder="Find someone by name, job or ring" value="' + esc(TLV.q || "") + '" style="flex:1;min-width:0"><button class="btn" data-tlv="find">Find</button></div>';
var L = all.filter(function (p) { return !q || (p.n + " " + (p.job || "") + " " + (p.work || "") + " " + tlvRingName(p.ring)).toLowerCase().indexOf(q) >= 0; })
.sort(function (a, b) { return a.n < b.n ? -1 : 1; });
h += tlvDim(L.length + " of " + all.length + " townsfolk");
L.slice(0, 120).forEach(function (p) {
var what = p.st === "child" ? (p.age < 13 ? "at school" : "at the big school") : p.st === "retired" ? "retired" + (p.was ? " " + p.was : "") : p.job ? p.job + (p.work ? " at " + p.work : "") : "looking for work";
var fam = [];
if (p.mate && p.mate.alive)
fam.push("married to " + p.mate.n);
var kc = (p.kids || []).filter(function (k) { return k.alive; }).length;
if (kc)
fam.push(kc + (kc > 1 ? " children" : " child"));
h += '<div style="padding:5px 0;border-bottom:1px solid #22262F"><b>' + esc(p.n) + '</b>, ' + p.age + ' · ' + esc(what) + ' · ' + esc(tlvRingName(p.ring)) +
(fam.length ? '<div style="color:#9AA3B5">' + esc(fam.join(", ")) + '</div>' : "") + '</div>';
});
if (L.length > 120)
h += tlvDim("…and " + (L.length - 120) + " more. Search to narrow it down.");
return h;
},
function () {
var D = TLV.d;
if (!D)
return tlvDim("Opening the register…");
var G = (D.graves || []).slice().reverse(), F = D.funerals || [];
var h = tlvDim("Everyone who passes away is laid to rest in the Cemetery on Temple Row, behind the Undertaker's. Their name is on their headstone; walk up to it and press E.");
F.forEach(function (f) { h += tlvFuneralRow(f); });
if (!G.length)
return h + tlvDim("No one has been laid to rest since the register began.");
G.forEach(function (g) {
h += '<div style="padding:5px 0;border-bottom:1px solid #22262F">🕯️ <b>' + esc(g.n) + '</b>, aged ' + g.age + (g.was ? ', once ' + esc(g.was) : "") +
' <span style="color:#7A8294">· ' + esc(tlvDay(g.at)) + ' · grave ' + g.g + (g.came ? " · " + g.came + " came to say goodbye" : "") + '</span></div>';
});
return h;
},
function () {
var h = '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><b style="font-size:15px;flex:1">🏛️ Somnucor: its past and its people</b><button class="btn" data-tlv="close">Close</button></div>';
h += '<div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap">' + TLV_TABS.map(function (t) { return tlvBtn("tab", t[1], ' data-t="' + t[0] + '"', TLV.tab === t[0]); }).join("") + '</div>';
if (!tlvSigned())
return h + tlvDim("Sign in to visit the museum and the town register.");
if (TLV.say)
h += '<div style="margin:0 0 8px;color:#E8D9B0">' + esc(TLV.say) + '</div>';
return h + (TLV.tab === "museum" ? tlvMuseumHtml() : TLV.tab === "people" ? tlvPeopleHtml() : TLV.tab === "remembered" ? tlvRememberedHtml() : tlvNewsHtml());
},
function () {
var el = document.getElementById("tlv-box");
if (!TLV.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "tlv-box";
el.style.cssText = "position:fixed;z-index:53;left:50%;top:50%;transform:translate(-50%,-50%);width:min(560px,calc(100vw - 32px));max-height:min(84vh,780px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(16,20,28,.97),rgba(8,9,13,.98));border:1px solid #C9A868;border-radius:8px;padding:12px 14px 14px;color:var(--bone,#C9BEA8);" +
"font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); if (e.key === "Enter" && e.target && e.target.id === "tlv-q") {
TLV.q = e.target.value;
tlvPaint();
} });
el.addEventListener("click", tlvClick);
document.body.appendChild(el);
}
var sc = el.scrollTop, same = el.dataset.tab === TLV.tab;
el.innerHTML = tlvHtml();
el.style.display = "block";
el.dataset.tab = TLV.tab;
if (same)
el.scrollTop = sc;
},
function (e) {
var t = e.target.closest && e.target.closest("[data-tlv]");
if (!t)
return;
var a = t.getAttribute("data-tlv");
if (a === "close")
return tlvClose();
if (a === "tab") {
TLV.tab = t.getAttribute("data-t");
TLV.say = "";
tlvPaint();
return;
}
if (a === "find") {
var i = document.getElementById("tlv-q");
TLV.q = i ? i.value : "";
tlvPaint();
return;
}
if (a === "flower")
return tlvFlower(+t.getAttribute("data-id"));
if (a === "tune")
return tlvTunePlay(t.getAttribute("data-k"));
},
function (i) {
var T = TLV.texs[i];
if (!T) {
var cv = document.createElement("canvas");
cv.width = TLV_FW;
cv.height = TLV_FH;
var tx = new THREE.CanvasTexture(cv);
if (THREE.sRGBEncoding !== undefined && "encoding" in tx)
tx.encoding = THREE.sRGBEncoding;
T = TLV.texs[i] = { cv: cv, tex: tx, key: "", img: null, used: Date.now() };
}
T.used = Date.now();
tlvFramePaint(i);
return T;
},
function (i) {
var T = TLV.texs[i];
if (!T)
return;
var rows = (TLV.hist && TLV.hist.rows) || [], r = rows[i] || null, key = r ? (r.id + ":" + (r.photo || "") + ":" + r.title) : "empty";
if (T.key === key && !(r && r.photo && T.img && !T.drawn))
return;
T.key = key;
T.drawn = false;
var c = T.cv.getContext("2d"), W = TLV_FW, H = TLV_FH;
c.fillStyle = "#EDE4CF";
c.fillRect(0, 0, W, H);
c.fillStyle = "#1C1A16";
c.font = "600 15px Georgia,serif";
c.textAlign = "center";
if (!r) {
c.fillStyle = "#6A5E48";
c.font = "italic 18px Georgia,serif";
c.fillText("This wall waits for", W / 2, H / 2 - 8);
c.fillText("the city's next chapter", W / 2, H / 2 + 16);
T.tex.needsUpdate = true;
return;
}
var ph = { x: 16, y: 14, w: W - 32, h: 170 };
c.fillStyle = "#2A2620";
c.fillRect(ph.x, ph.y, ph.w, ph.h);
var draw = function () {
if (T.img && T.img.complete && T.img.naturalWidth) {
var iw = T.img.naturalWidth, ih = T.img.naturalHeight, k = Math.max(ph.w / iw, ph.h / ih), sw = ph.w / k, sh = ph.h / k;
try {
c.drawImage(T.img, (iw - sw) / 2, (ih - sh) / 2, sw, sh, ph.x, ph.y, ph.w, ph.h);
T.drawn = true;
}
catch (e) { }
}
else {
c.font = "64px serif";
c.textAlign = "center";
c.textBaseline = "middle";
c.fillText(r.icon || "🏛️", W / 2, ph.y + ph.h / 2);
c.textBaseline = "alphabetic";
}
};
if (r.photo) {
var url = tlvPhotoUrl(r.photo);
if (!T.img || T.img.dataset.u !== url) {
var im = new Image();
im.crossOrigin = "anonymous";
im.dataset.u = url;
im.onload = function () { if (TLV.texs[i] === T) {
T.key = "";
tlvFramePaint(i);
} };
im.src = url;
T.img = im;
}
}
else
T.img = null;
draw();
c.fillStyle = "#1C1A16";
c.font = "600 16px Georgia,serif";
c.textAlign = "center";
var words = String(r.title).split(" "), line = "", y = ph.y + ph.h + 24, lines = [];
words.forEach(function (w) { var t = line ? line + " " + w : w; if (c.measureText(t).width > W - 28 && line) {
lines.push(line);
line = w;
}
else
line = t; });
if (line)
lines.push(line);
lines.slice(0, 2).forEach(function (l, j) { c.fillText(l, W / 2, y + j * 20); });
c.fillStyle = "#6A5E48";
c.font = "italic 14px Georgia,serif";
c.fillText(tlvDay(r.at), W / 2, H - 12);
T.tex.needsUpdate = true;
},
function () {
var i = TLV.frameN || 0;
TLV.frameN = i + 1;
var g = new THREE.Group();
if (i >= TLV_FRAMES)
return g;
if (!TLV_FRAME_M)
TLV_FRAME_M = { gold: new THREE.MeshStandardMaterial({ color: 0xB8923E, roughness: 0.45, metalness: 0.6 }),
frameG: new THREE.BoxGeometry(1.36, 1.06, 0.05), picG: new THREE.PlaneGeometry(1.2, 0.9), lightG: new THREE.BoxGeometry(0.9, 0.05, 0.08) };
var M = TLV_FRAME_M, T = tlvFrameTex(i);
var fr = new THREE.Mesh(M.frameG, M.gold);
fr.position.set(0, 2.35, 0.03);
g.add(fr);
var pm = new THREE.MeshBasicMaterial({ map: T.tex, toneMapped: false });
pm.userData.tlvOwn = true;
var pic = new THREE.Mesh(M.picG, pm);
pic.position.set(0, 2.35, 0.06);
pic.userData.tlvFrame = i;
g.add(pic);
var lt = new THREE.Mesh(M.lightG, M.gold);
lt.position.set(0, 2.98, 0.14);
g.add(lt);
g.userData.tlvFrame = i;
TLV.frames.push(g);
return g;
},
function (r, blob) {
var uid = typeof myUserId === "function" ? myUserId() : null;
if (!uid)
return;
var path = uid + "/" + Date.now() + "-" + Math.random().toString(36).slice(2, 7) + ".jpg";
TLV.photos++;
freshToken().then(function (tok) {
return fetch(DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/storage/v1/object/museum/" + path.split("/").map(encodeURIComponent).join("/"), { method: "POST",
headers: { apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + tok, "Content-Type": "image/jpeg", "x-upsert": "false" }, body: blob });
}).then(function (res) { if (!res.ok)
throw new Error("upload " + res.status); return cityRpc("history_photo", { p_id: r.id, p_path: path }); })
.then(function (o) { if (o && o.ok) {
r.photo = path;
tlvFramesPaint();
if (TLV.open)
tlvPaint();
} })
.catch(function () { });
},
function (f, at, dur) {
var c = audio.ctx, g = c.createGain();
g.gain.value = 0.0001;
g.connect(audio.master || c.destination);
[[1, 0.11], [2, 0.045], [3, 0.018]].forEach(function (h) { var o = c.createOscillator(), og = c.createGain(); o.type = "sine"; o.frequency.value = f * h[0]; og.gain.value = h[1]; o.connect(og); og.connect(g); o.start(at); o.stop(at + dur + 0.4); });
g.gain.setValueAtTime(0.0001, at);
g.gain.exponentialRampToValueAtTime(1, at + 0.09);
g.gain.setValueAtTime(1, at + Math.max(0.1, dur - 0.08));
g.gain.exponentialRampToValueAtTime(0.0001, at + dur + 0.35);
},
function (k) {
var T = TLV_TUNES.filter(function (t) { return t.k === k; })[0];
if (!T)
return;
if (typeof audio === "undefined" || !audio.on || !audio.ctx) {
TLV.say = "Turn the game's sound on to hear the music (the 🔊 in the menu).";
if (TLV.open)
tlvPaint();
return;
}
var c = audio.ctx, b = 60 / T.bpm, at = Math.max(c.currentTime, TLV.tuneEnd || 0) + 0.15;
T.m.split(/\s+/).forEach(function (tok) { var p = tok.split(":"), d = (+p[1] || 1) * b; if (p[0] !== "R") {
var f = tlvNoteHz(p[0]);
if (f)
try {
tlvOrgan(f, at, d * 0.95);
}
catch (e) { }
} at += d; });
TLV.tuneEnd = at;
TLV.say = "🎵 " + T.n + " is playing.";
if (TLV.open)
tlvPaint();
},
function (i) {
var g = tlvGraveAt(i), h;
if (!g)
h = "<b>An old headstone</b><div style='opacity:.8;margin-top:4px'>The name has worn away. The newer graves of the town are in the rows beside it.</div>";
else
h = "<div style='text-align:center'><div style='font-size:20px'>🕯️</div><b style='font-size:15px'>" + esc(g.n) + "</b><div style='opacity:.85'>aged " + g.age + (g.was ? " · " + esc(g.was) : "") + "</div>" +
"<div style='opacity:.7;margin-top:2px'>laid to rest " + esc(tlvDay(g.at)) + "</div>" +
(g.mate ? "<div style='margin-top:6px;font-style:italic'>Beloved of " + esc(g.mate) + (g.kids ? ", and of their " + (g.kids > 1 ? g.kids + " children" : "child") : "") + "</div>" : g.kids ? "<div style='margin-top:6px;font-style:italic'>Loved by their " + (g.kids > 1 ? g.kids + " children" : "child") + "</div>" : "") +
(g.came ? "<div style='opacity:.75;margin-top:4px'>" + g.came + (g.came > 1 ? " dreamers" : " dreamer") + " came to say goodbye.</div>" : "") + "</div>";
worldCard(h, {});
},
function () {
var G = ((TLV.d && TLV.d.graves) || []), S = tlvStones(), n = S ? S.list.length : 40, more = G.filter(function (g) { return g.g > n; });
var h = "<b>🕯️ The Cemetery Vault</b><div style='opacity:.8;margin:4px 0'>The roll of the town's remembered.</div>";
if (!G.length)
h += "<div style='opacity:.7'>No names yet since the register began.</div>";
else
h += "<div style='max-height:260px;overflow-y:auto'>" + G.slice().reverse().map(function (g) { return "<div>" + esc(g.n) + ", " + g.age + " <span style='opacity:.6'>· " + esc(tlvDay(g.at)) + (g.g > n ? " · in the vault" : "") + "</span></div>"; }).join("") + "</div>";
if (more.length)
h += "<div style='opacity:.7;margin-top:6px'>The rows outside are full, so the newest are remembered here in the vault.</div>";
worldCard(h, {});
},
function (f) {
var fam = f.family || [], sp = fam.filter(function (x) { return x.who === "spouse"; })[0], kids = fam.filter(function (x) { return x.who === "child"; }), par = fam.filter(function (x) { return x.who === "parent"; });
var s = ["We are gathered here to remember " + f.n + ", who lived " + f.age + " years and made a life in " + tlvRingName(f.ring) + "."];
if (f.was && !/^(patient|guest)$/i.test(f.was))
s.push("Many of you knew them from their years as " + f.was + ", and you will not pass that way again without thinking of them.");
if (sp)
s.push(sp.n + " shared their life, and stands with us today.");
if (kids.length)
s.push("Their " + (kids.length > 1 ? "children, " : "child, ") + kids.map(function (k) { return k.n.split(" ")[0]; }).join(" and ") + ", carry them on.");
if (par.length)
s.push("No parent should outlive their child; we hold " + par.map(function (p) { return p.n; }).join(" and ") + " close today.");
s.push("Rest now. Somnucor remembers you.");
return s;
},
function (f) {
var t = new Date(f.at).getTime(), live = Date.now() >= t - 10 * 60000 && Date.now() <= t + 45 * 60000;
return '<div style="border:1px solid #3A3226;border-radius:6px;padding:8px 10px;margin:8px 0">⚱️ <b>The funeral of ' + esc(f.n) + '</b>, aged ' + f.age +
'<div style="color:#9AA3B5">' + (live ? "<b style='color:#E8D9B0'>Now</b>, at the Cemetery on Temple Row" : "At the Cemetery on Temple Row, " + esc(new Date(f.at).toLocaleString([], { weekday: "short", hour: "2-digit", minute: "2-digit" }))) +
(f.came ? " · " + f.came + " came" : "") + '</div>' +
(live ? (f.mine ? tlvDim("🌹 You laid a flower.") : tlvBtn("flower", "🌹 Lay a flower", ' data-id="' + f.id + '"')) + tlvTunesHtml() : "") + '</div>';
},
function (f) {
var h = "<b>⚱️ The funeral of " + esc(f.n) + "</b><div style='opacity:.8;margin:2px 0 8px'>" + esc(tlvRingName(f.ring)) + " · aged " + f.age + "</div>" +
"<div style='font-style:italic;line-height:1.45'>" + tlvEulogy(f).map(esc).join(" ") + "</div>" +
(f.mine ? "<div style='margin-top:8px;opacity:.8'>🌹 You laid a flower" + (f.came > 1 ? ", with " + (f.came - 1) + " others" : "") + ".</div>" : worldBtn("flower", "🌹 Lay a flower", f.came ? f.came + " have so far" : "Be the first to say goodbye")) +
"<div style='margin-top:6px'><b>🎵 Play a hymn</b></div>" + TLV_TUNES.map(function (t) { return worldBtn("tune_" + t.k, t.n, t.by); }).join("");
var fns = { flower: function () { tlvFlower(f.id); } };
TLV_TUNES.forEach(function (t) { fns["tune_" + t.k] = function () { tlvTunePlay(t.k); }; });
worldCard(h, fns);
},
function (id) {
if (!tlvSigned())
return;
cityRpc("town_respects_pay", { p_id: id }).then(function (o) {
TLV.say = (o && o.say) || "";
var f = ((TLV.d && TLV.d.funerals) || []).filter(function (x) { return x.id === id; })[0];
if (o && o.ok && f) {
f.mine = true;
f.came = o.came;
TLV.flowers = (TLV.flowers || 0) + 1;
tlvFunFlower();
}
if (TLV.open)
tlvPaint();
else if (f)
tlvFuneralCard(f);
}).catch(function () { });
},
function (f, S) {
var gi = Math.min(f.g - 1, S.list.length - 1), st = S.list[Math.max(0, gi)], F = TLV.fun = { id: f.id, g: new THREE.Group(), made: 0, want: Math.min(tlvFunMax(), 2 + (f.family || []).length + 3), st: st, own: [] };
var y = typeof terrainY === "function" ? terrainY(st.x, st.z) : 0;
F.g.position.set(st.x, y, st.z);
var ax = S.x - st.x, az = S.z - st.z, al = Math.hypot(ax, az) || 1;
F.dx = ax / al;
F.dz = az / al;
F.g.rotation.y = Math.atan2(F.dx, F.dz);
function own(geo, col, x, yy, z, o) {
var m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: col, roughness: o && o.r != null ? o.r : 0.7, metalness: o && o.m || 0 }));
m.position.set(x, yy, z);
m.castShadow = true;
m.userData.scpMine = true;
m.raycast = function () { };
F.g.add(m);
return m;
}
own(new THREE.BoxGeometry(1.1, 0.04, 2.2), 0x3A2A1E, 0, 0.02, 1.4);
own(new THREE.BoxGeometry(0.9, 0.5, 2.1), 0x5A3A22, 0, 0.75, 1.4, { r: 0.35 });
own(new THREE.BoxGeometry(0.94, 0.06, 2.14), 0xB8923E, 0, 1.02, 1.4, { m: 0.6, r: 0.4 });
[-0.8, 0.8].forEach(function (z) { own(new THREE.BoxGeometry(0.9, 0.5, 0.08), 0x2A2018, 0, 0.25, 1.4 + z); });
var fl = [0xE8E4E0, 0xC8283A, 0xF0D040, 0xE89AB0, 0xFFFFFF];
for (var i = 0; i < 9; i++)
own(new THREE.SphereGeometry(0.11, 8, 6), fl[i % fl.length], -0.3 + (i % 3) * 0.3, 1.12, 1.0 + Math.floor(i / 3) * 0.35);
own(new THREE.BoxGeometry(0.7, 0.35, 0.35), 0x2E5A2A, -0.9, 0.18, 0.3);
own(new THREE.SphereGeometry(0.26, 8, 6), 0xE8E4E0, -0.9, 0.5, 0.3);
scene.add(F.g);
if (!TLV.heard["fun" + f.id] && typeof audio !== "undefined" && audio.on) {
TLV.heard["fun" + f.id] = 1;
tlvTunePlay(TLV_TUNES[f.id % TLV_TUNES.length].k);
}
},
function (f) {
var F = TLV.fun;
if (!F || F.made >= F.want || typeof evcFig !== "function")
return;
var i = F.made++, fam = f.family || [], who = fam[i - 1], g = null;
try {
if (i === 0)
g = evcFig("tlvof" + f.id, { plain: true, sex: f.id % 2 ? "m" : "f", dress: { topKind: "robe", top: 0x141418, bottom: 0x141418 }, act: "tell" });
else {
var D = TLV_BLACK[(i + f.id) % TLV_BLACK.length], dress = {};
for (var k in D)
if (k !== "sex")
dress[k] = D[k];
var sx = who && who.sx ? who.sx : D.sex, kid = !!(who && who.age < 13);
g = evcFig("tlvm" + f.id + "_" + i, { plain: true, child: kid, sex: sx, dress: dress, act: "stand" });
}
}
catch (e) {
return;
}
if (!g)
return;
g.traverse(function (m) { m.raycast = function () { }; });
if (i === 0) {
g.position.set(0, 0, 2.9);
g.rotation.y = Math.PI;
}
else {
var a = (i - 1) / (Math.max(1, F.want - 1)), x = -2 + a * 4, z = -0.6 - Math.abs(x) * 0.25 + ((i % 2) * -0.6);
g.position.set(x, 0, z);
g.rotation.y = Math.atan2(-x * 0.3, 1.4 - z) * 0.6;
}
F.g.add(g);
}
];
});
