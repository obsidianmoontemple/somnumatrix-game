/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(268, function () {
"use strict";
return [
function () {
var g = F([
P(box(1.6, .5, .45), mL(DARKWOOD), 0, .25, 0),
P(box(1.5, .03, .4), mL(0x2A1E16), 0, .515, 0),
P(box(.36, .06, .22), mL(0x1A1A1E), 0, .55, 0),
P(box(.08, .2, .05), mL(0x1A1A1E), 0, .66, -.02),
P(box(1.32, .78, .06), mL(0x101114), 0, 1.15, -.02),
P(box(.04, .04, .02), mG(0xB04030, .9), .6, .79, .015)
]);
var scr = new THREE.Mesh(new THREE.PlaneGeometry(1.2, .675), new THREE.MeshBasicMaterial({ color: 0x0B0D11 }));
scr.position.set(0, 1.15, .012);
scr.userData.hmScreen = 1;
g.add(scr);
return g;
},
function () {
var g = F([
P(box(.55, .6, .42), mL(WOOD), 0, .3, 0),
P(box(.48, .27, .2), mL(0x5A3A22), 0, .735, 0),
P(box(.2, .17, .01), mL(0x2A221C), -.1, .735, .101),
P(box(.04, .04, .03), mL(0xC9A868), .17, .68, .11),
P(box(.04, .04, .03), mL(0xC9A868), .08, .68, .11),
P(new THREE.CylinderGeometry(.006, .006, .42, 5), mL(0x9A9CA2), .18, 1.06, -.05)
]);
var dial = P(box(.17, .07, .01), new THREE.MeshBasicMaterial({ color: 0x6A5A3E }), .125, .78, .103);
dial.userData.hmDial = 1;
g.add(dial);
return g;
},
function (put, W, D, there) {
function clear(x, z, r) {
for (var i = 0; i < there.length; i++) {
var o = there[i], k = o.userData && o.userData.furn;
if (k === "rug" || k === "chandelier" || k === "runner")
continue;
if (Math.abs(o.position.x - x) < r + .6 && Math.abs(o.position.z - z) < r + .6)
return false;
}
return true;
}
var x = W / 2 - .45, tz = D / 2 - Math.max(2.4, D * .25), rz = D / 2 - 1.0;
for (var n = 0; n < 6 && !clear(x, tz, .8); n++)
tz -= 1.4;
put("hometv", x, tz, -Math.PI / 2);
if (!clear(x, rz, .3))
rz = tz - 1.5;
put("homeradio", x, rz, -Math.PI / 2);
},
function () {
if (HMD.dbp)
return HMD.dbp;
HMD.dbp = new Promise(function (res, rej) {
if (typeof indexedDB === "undefined")
return rej(new Error("none"));
var r = indexedDB.open("somnu-home-media", 1);
r.onupgradeneeded = function () {
var d = r.result;
if (!d.objectStoreNames.contains("meta"))
d.createObjectStore("meta", { keyPath: "id" });
if (!d.objectStoreNames.contains("blobs"))
d.createObjectStore("blobs", { keyPath: "id" });
};
r.onsuccess = function () { res(r.result); };
r.onerror = function () { rej(r.error || new Error("closed")); };
});
HMD.dbp.catch(function () { HMD.dbp = null; });
return HMD.dbp;
},
function () {
return hmDb().then(function (db) { return hmReq(db.transaction("meta").objectStore("meta").getAll()); })
.then(function (rows) { rows.sort(function (a, b) { return (a.added || 0) - (b.added || 0); }); HMD.list = rows; return rows; })
.catch(function () { HMD.list = HMD.list || []; HMD.msg = "This browser won't keep files (a private window can't). Try a normal window."; return HMD.list; });
},
function (files) {
files = Array.prototype.slice.call(files || []);
if (!files.length)
return;
try {
if (navigator.storage && navigator.storage.persist)
navigator.storage.persist();
}
catch (e) { }
var added = 0, skipped = [], full = false, fresh = [];
HMD.msg = "Adding " + files.length + (files.length === 1 ? " file" : " files") + "…";
hmPaint(true);
hmDb().then(function (db) {
return files.reduce(function (chain, f) {
return chain.then(function () {
var kind = hmKindOf(f);
if (!kind) {
skipped.push(f.name);
return;
}
var id = "hm" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
var tx = db.transaction(["meta", "blobs"], "readwrite");
tx.objectStore("blobs").put({ id: id, blob: f });
tx.objectStore("meta").put({ id: id, name: String(f.name || "untitled").slice(0, 120), kind: kind, size: f.size || 0, type: f.type || "", added: Date.now() });
return new Promise(function (res) {
tx.oncomplete = function () { added++; fresh.push({ id: id, kind: kind }); res(); };
tx.onerror = tx.onabort = function () { var er = tx.error; if (er && /quota/i.test(er.name || ""))
full = true; skipped.push(f.name); res(); };
});
});
}, Promise.resolve());
}).catch(function () { full = full || false; skipped = files.map(function (f) { return f.name; }); })
.then(hmList).then(function () {
var m = [];
if (added)
m.push("Added " + added + (added === 1 ? " file" : " files") + ".");
if (full)
m.push("This device has no room left for more.");
else if (skipped.length)
m.push("Not added (not a video or song this can keep): " + skipped.slice(0, 3).join(", ") + (skipped.length > 3 ? "…" : "") + ".");
HMD.msg = m.join(" ");
hmPaint(true);
if (HMD.mode === "tv" || HMD.mode === "radio") {
var dev = HMD.mode, want = dev === "tv" ? "video" : "audio", first = fresh.filter(function (f) { return f.kind === want; })[0];
if (!first && fresh.length && HMD.homeId) {
dev = fresh[0].kind === "video" ? "tv" : "radio";
first = fresh[0];
HMD.mode = dev;
}
hmUrls(want).then(function () { return dev !== HMD.mode ? null : hmUrls(dev === "tv" ? "video" : "audio"); }).then(function () {
if (first && HMD.homeId && HMD.urls[first.id]) {
HMD.listOpen = false;
hmPlay(dev, first.id);
}
});
}
});
},
function (raw) {
var t = String(raw || "").trim(), bad = { err: "That doesn't look like a link. Copy the whole address (it starts with https://) and paste it here." };
if (!t)
return { err: "Paste or type a link first." };
if (/\s/.test(t))
return bad;
if (!/^[a-z]+:\/\//i.test(t))
t = "https://" + t;
var u;
try {
u = new URL(t);
}
catch (e) {
return bad;
}
if (!/\.[a-z0-9-]{2,}$/i.test(u.hostname) && !/^localhost$|^\d+\.\d+\.\d+\.\d+$/.test(u.hostname))
return bad;
if (!/^https?:$/.test(u.protocol))
return { err: "Only https:// links can play here." };
var h = u.hostname.replace(/^(www|m|music)\./, ""), path = u.pathname, id = null;
if (h === "youtu.be")
id = path.split("/")[1];
else if (/(^|\.)youtube(-nocookie)?\.com$/.test(h)) {
id = u.searchParams.get("v");
var mm = path.match(/^\/(embed|shorts|live|v)\/([\w-]{6,})/);
if (!id && mm)
id = mm[2];
}
if (id && /^[\w-]{6,20}$/.test(id))
return { kind: "video", site: "youtube", url: "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&playsinline=1&rel=0", name: "YouTube video " + id };
if (/(^|\.)vimeo\.com$/.test(h)) {
var vm = path.match(/(\d{5,})/);
if (vm)
return { kind: "video", site: "vimeo", url: "https://player.vimeo.com/video/" + vm[1] + "?autoplay=1", name: "Vimeo video " + vm[1] };
}
var file = decodeURIComponent(path.split("/").pop() || "") || h;
if (HM_VIDEO.test(path))
return { kind: "video", url: u.href, name: file };
if (HM_AUDIO.test(path))
return { kind: "audio", url: u.href, name: file };
if (/\.(m3u8)$/i.test(path))
return { err: "That is a live stream address; this TV can't tune into those yet. A link to a video file (.mp4, .webm) or a YouTube or Vimeo page will play." };
return { kind: HMD.mode === "radio" ? "audio" : "video", url: u.href, name: file, guess: true };
},
function (raw) {
var L = hmLinkParse(raw);
if (L.err) {
HMD.msg = L.err;
hmPaint(true);
return;
}
var id = "hl" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
var row = { id: id, name: String(L.name || "link").slice(0, 120), kind: L.kind, size: 0, type: "", added: Date.now(), url: L.url, site: L.site || "", guess: !!L.guess };
HMD.linkOpen = false;
if (row.site)
hmTitle(row, /^https?:/i.test(String(raw).trim()) ? String(raw).trim() : "https://" + String(raw).trim());
hmDb().then(function (db) {
var tx = db.transaction("meta", "readwrite");
tx.objectStore("meta").put(row);
return new Promise(function (res) { tx.oncomplete = tx.onerror = tx.onabort = function () { res(); }; });
})
.catch(function () { HMD.list = (HMD.list || []).concat([row]); })
.then(function () { return HMD.dbp ? hmList() : HMD.list; })
.then(function () {
HMD.urls[id] = L.url;
if (HMD.homeId && (HMD.mode === "tv" || HMD.mode === "radio")) {
var dev = L.kind === "video" ? "tv" : "radio";
HMD.mode = dev;
HMD.listOpen = false;
hmPlay(dev, id);
}
else {
HMD.msg = "Link kept. It plays on the " + (L.kind === "video" ? "TV" : "radio") + " at home.";
hmPaint(true);
}
});
},
function (row, page) {
var q = row.site === "youtube" ? "https://www.youtube.com/oembed?format=json&url=" + encodeURIComponent(page)
: row.site === "vimeo" ? "https://vimeo.com/api/oembed.json?url=" + encodeURIComponent(page) : null;
if (!q || typeof fetch !== "function")
return;
fetch(q).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) {
if (!j || !j.title)
return;
row.name = String(j.title).slice(0, 120);
var mine = hmItem(row.id);
if (mine)
mine.name = row.name;
hmDb().then(function (db) { db.transaction("meta", "readwrite").objectStore("meta").put(row); }).catch(function () { });
if (HMD.tvOn === row.id)
hmCard(row.name, "On now · tap Watch to see it");
var bar = HMD.close && HMD.close.querySelector(".bar b");
if (bar && HMD.tvOn === row.id)
bar.textContent = "📺 " + row.name;
hmPaint(true);
}).catch(function () { });
},
function (id) {
if (HMD.tvOn === id)
hmOff("tv");
if (HMD.radioOn === id)
hmOff("radio");
if (HMD.urls[id]) {
if (/^blob:/.test(HMD.urls[id]))
try {
URL.revokeObjectURL(HMD.urls[id]);
}
catch (e) { }
delete HMD.urls[id];
}
hmDb().then(function (db) {
var tx = db.transaction(["meta", "blobs"], "readwrite");
tx.objectStore("meta").delete(id);
tx.objectStore("blobs").delete(id);
return new Promise(function (res) { tx.oncomplete = tx.onerror = tx.onabort = function () { res(); }; });
}).catch(function () { }).then(hmList).then(function () { HMD.msg = "Removed."; hmPaint(true); });
},
function (kind) {
if (!HMD.list)
return hmList().then(function () { return HMD.list && HMD.list.length ? hmUrls(kind) : null; });
var want = (HMD.list || []).filter(function (r) { if (r.url && r.kind === kind && !HMD.urls[r.id])
HMD.urls[r.id] = r.url; return r.kind === kind && !HMD.urls[r.id]; });
if (!want.length) {
hmPaint(true);
return Promise.resolve();
}
return hmDb().then(function (db) {
return Promise.all(want.map(function (r) {
return hmReq(db.transaction("blobs").objectStore("blobs").get(r.id)).then(function (b) {
if (b && b.blob && !HMD.urls[r.id])
HMD.urls[r.id] = URL.createObjectURL(b.blob);
}).catch(function () { });
}));
}).catch(function () { }).then(function () { hmPaint(true); });
},
function () {
if (HMD.vid)
return HMD.vid;
var v = document.createElement("video");
v.playsInline = true;
v.setAttribute("playsinline", "");
v.preload = "auto";
v.addEventListener("loadedmetadata", function () { hmFit(); hmSeekDue("tv", v); });
v.addEventListener("playing", function () { if (/^Tap ▶/.test(HMD.msg))
HMD.msg = ""; hmTexOn(); hmPaint(true); });
v.addEventListener("pause", function () { hmPaint(true); });
v.addEventListener("ended", function () { hmNext("tv"); });
v.addEventListener("error", function () {
if (!HMD.tvOn || !v.getAttribute("src"))
return;
var r = hmItem(HMD.tvOn);
if (r && r.url && v.crossOrigin) {
v.removeAttribute("crossorigin");
HMD.tvTaint = true;
v.src = r.url;
var p = v.play();
if (p && p.catch)
p.catch(function () { });
return;
}
HMD.msg = hmCantPlay(r, "video");
hmOff("tv");
});
HMD.vid = v;
return v;
},
function () {
if (HMD.aud)
return HMD.aud;
var a = document.createElement("audio");
a.preload = "auto";
a.addEventListener("loadedmetadata", function () { hmSeekDue("radio", a); });
a.addEventListener("playing", function () { if (/^Tap ▶/.test(HMD.msg))
HMD.msg = ""; hmDial(true); hmPaint(true); });
a.addEventListener("pause", function () { hmDial(false); hmPaint(true); });
a.addEventListener("ended", function () { hmNext("radio"); });
a.addEventListener("error", function () { if (!HMD.radioOn || !a.getAttribute("src"))
return; HMD.msg = hmCantPlay(hmItem(HMD.radioOn), "audio"); hmOff("radio"); });
HMD.aud = a;
return a;
},
function (r, kind) {
var n = r ? "\"" + r.name + "\"" : "That one";
if (r && r.url)
return n + " didn't play. The link may be private, gone, or not a " + (kind === "video" ? "video" : "song") + " file. " +
(kind === "video" ? "Links ending in .mp4 or .webm, or a YouTube or Vimeo page, work best." : "Links ending in .mp3 work best.");
if (r && /\.(mov|mkv|avi|wmv|3gp)$/i.test(r.name || ""))
return n + " is a kind of video this browser can't play (phones often film in .mov). An .mp4 copy of it will play.";
return "This device can't play " + n + ". " + (kind === "video" ? "MP4 videos" : "MP3 songs") + " play almost everywhere.";
},
function (dev, id, remote) {
var url = HMD.urls[id], r = hmItem(id);
if (!remote)
hmShare(dev, r, 0, true);
if (!url && r && r.url)
url = HMD.urls[id] = r.url;
if (!url) {
HMD.msg = "Still getting that ready. Tap it again in a moment.";
hmPaint(true);
hmUrls(dev === "tv" ? "video" : "audio");
return;
}
if (dev === "tv" && r && r.site) {
hmEmbedOn(r, remote);
return;
}
if (dev === "tv")
hmEmbedOff();
var el = dev === "tv" ? hmVideo() : hmAudio();
if (dev === "tv") {
HMD.tvOn = id;
HMD.tvTaint = false;
}
else
HMD.radioOn = id;
HMD.msg = "";
if (dev === "tv" && r && r.url)
el.crossOrigin = "anonymous";
else
el.removeAttribute("crossorigin");
el.src = url;
el.volume = Math.min(1, HMD.vol[dev]);
var p = el.play();
if (p && p.catch)
p.catch(function () { setTimeout(function () { if (el.paused && (dev === "tv" ? HMD.tvOn : HMD.radioOn) === id && !el.error) {
HMD.msg = "Tap ▶ Play to start it.";
hmPaint(true);
} }, 400); });
if (dev === "tv") {
hmFit();
}
hmPaint(true);
},
function (dev) {
var on = dev === "tv" ? HMD.tvOn : HMD.radioOn, keep = dev === "tv" ? HMD.tvAll : HMD.radioAll;
var cur = hmItem(on);
if (cur && cur.shared) {
hmOff(dev);
return;
}
var L = (HMD.list || []).filter(function (r) { return r.kind === (dev === "tv" ? "video" : "audio"); });
if (!keep || L.length < 1) {
hmOff(dev);
return;
}
var i = -1;
for (var k = 0; k < L.length; k++)
if (L[k].id === on)
i = k;
var nx = L[(i + 1) % L.length];
if (nx && HMD.urls[nx.id])
hmPlay(dev, nx.id);
else
hmOff(dev);
},
function (title, line) {
var s = hmScreen();
if (!s)
return;
var c = HMD.cardC || (HMD.cardC = document.createElement("canvas"));
c.width = 512;
c.height = 288;
var x = c.getContext("2d");
x.fillStyle = "#14121C";
x.fillRect(0, 0, 512, 288);
x.fillStyle = "#C9A868";
x.font = "600 30px system-ui,sans-serif";
x.textAlign = "center";
x.fillText("▶", 256, 96);
x.fillStyle = "#EDE8F8";
x.font = "600 24px system-ui,sans-serif";
var t = String(title || "");
if (t.length > 34)
t = t.slice(0, 33) + "…";
x.fillText(t, 256, 150);
x.fillStyle = "#A8A0B8";
x.font = "20px system-ui,sans-serif";
x.fillText(line || "", 256, 196);
if (HMD.tex) {
HMD.tex.dispose();
HMD.tex = null;
}
if (!HMD.cardT)
HMD.cardT = new THREE.CanvasTexture(c);
HMD.cardT.needsUpdate = true;
s.scale.set(1, 1, 1);
s.material.map = HMD.cardT;
s.material.color.setHex(0xFFFFFF);
s.material.needsUpdate = true;
},
function (r, remote) {
var v = HMD.vid;
if (v && HMD.tvOn) {
try {
v.pause();
v.removeAttribute("src");
v.load();
}
catch (e) { }
}
hmEmbedOff();
hmCloseUp(false);
if (HMD.tex) {
HMD.tex.dispose();
HMD.tex = null;
}
HMD.tvOn = r.id;
HMD.tvTaint = false;
HMD.msg = "";
var f = document.createElement("iframe");
var at = Math.floor(+r.at || 0), src = r.url;
if (at > 2)
src = r.site === "vimeo" ? src.replace(/#.*$/, "") + "#t=" + at + "s" : src + (src.indexOf("?") < 0 ? "?" : "&") + "start=" + at;
f.src = src;
f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
f.setAttribute("allowfullscreen", "");
f.referrerPolicy = "strict-origin-when-cross-origin";
f.title = r.name;
f.style.cssText = "width:min(1100px,100%);aspect-ratio:16/9;max-height:calc(100vh - 110px);border:0;background:#000;border-radius:3px";
HMD.embed = f;
hmCard(r.name, "On now · tap Watch to see it");
hmCloseUp(true);
if (remote && HMD.close)
HMD.close.style.display = "none";
},
function () {
if (!HMD.embed)
return;
try {
HMD.embed.src = "about:blank";
HMD.embed.remove();
}
catch (e) { }
HMD.embed = null;
if (HMD.close) {
HMD.close.remove();
HMD.close = null;
}
var s = hmScreen();
if (s && HMD.cardT && s.material.map === HMD.cardT) {
s.material.map = null;
s.material.color.setHex(0x0B0D11);
s.material.needsUpdate = true;
}
},
function () {
var s = hmScreen(), v = HMD.vid;
if (!s || !v)
return;
if (HMD.tvTaint) {
hmCard(hmName(HMD.tvOn), "On now · tap Watch to see it");
if (!HMD.close && HMD.mode === "tv" && HMD.taintShown !== HMD.tvOn) {
HMD.taintShown = HMD.tvOn;
hmCloseUp(true);
}
return;
}
if (!HMD.tex) {
HMD.tex = new THREE.VideoTexture(v);
if (THREE.sRGBEncoding !== undefined)
HMD.tex.encoding = THREE.sRGBEncoding;
}
if (s.material.map !== HMD.tex) {
s.material.map = HMD.tex;
s.material.color.setHex(0xFFFFFF);
s.material.needsUpdate = true;
}
hmFit();
},
function (open) {
if (!open) {
if (HMD.close && HMD.embed) {
HMD.close.style.display = "none";
hmPaint(true);
return;
}
if (HMD.close) {
var v0 = HMD.vid;
if (v0) {
v0.controls = false;
v0.style.cssText = "display:none";
document.body.appendChild(v0);
}
HMD.close.remove();
HMD.close = null;
}
hmPaint(true);
return;
}
if (HMD.close && HMD.embed) {
HMD.close.style.display = "";
return;
}
if (HMD.close)
return;
var v = HMD.embed || HMD.vid;
if (!v || !HMD.tvOn)
return;
var o = document.createElement("div");
o.className = "hall-view";
o.id = "hm-close";
o.innerHTML = '<div class="bar"><b>📺 ' + esc(hmName(HMD.tvOn)) + '</b><button class="btn" data-hm="closeup-off">Back to the room</button></div>';
if (!HMD.embed) {
v.controls = true;
v.style.cssText = "width:min(1100px,100%);max-height:calc(100vh - 110px);background:#000;border-radius:3px";
}
o.appendChild(v);
var f = document.createElement("div");
f.className = "foot";
var cu = hmItem(HMD.tvOn), shr = !!(cu && cu.url && HMD.sh.tv && HMD.sh.tv.url === cu.url);
f.textContent = (shr ? "Everyone in the home has this on too. " : "Only you can see and hear this. ") +
(HMD.embed ? "Its volume is set in the player. Back to the room keeps it playing; Off on the TV stops it." : "It is still on the TV in the room.");
o.appendChild(f);
o.addEventListener("click", function (e) { var b = e.target.closest && e.target.closest("[data-hm]"); if (b)
hmCloseUp(false); });
document.body.appendChild(o);
HMD.close = o;
},
function () {
var i = document.getElementById("hm-file");
if (!i) {
i = document.createElement("input");
i.type = "file";
i.id = "hm-file";
i.multiple = true;
i.accept = "video/*,audio/*,.mp4,.m4v,.webm,.mov,.mkv,.mp3,.m4a,.aac,.wav,.ogg,.opus,.flac";
i.style.display = "none";
i.addEventListener("change", function () { hmAdd(i.files); i.value = ""; });
document.body.appendChild(i);
}
i.click();
},
function (r, dev) {
var on = dev && ((dev === "tv" && HMD.tvOn === r.id) || (dev === "radio" && HMD.radioOn === r.id));
var ready = !!HMD.urls[r.id];
return '<div class="item" style="display:flex;align-items:center;gap:8px">' +
(dev ? '<button class="btn" data-hm="play" data-id="' + esc(r.id) + '"' + (ready ? '' : ' disabled') + '>' + (on ? '▶ On now' : '▶') + '</button>' : '') +
'<span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap' + (on ? ';color:#F0D890' : '') + '">' + (r.url ? '🔗 ' : '') + esc(r.name) + '</span>' +
'<span class="dim" style="font-size:11.5px">' + (r.url ? (r.site === "youtube" ? "YouTube" : r.site === "vimeo" ? "Vimeo" : "link") : hmMB(r.size)) + '</span>' +
'<button class="btn" data-hm="remove" data-id="' + esc(r.id) + '" title="Remove from your list"' + (dev ? ' style="padding:4px 9px"' : '') + '>' + (dev ? '✕' : 'Remove') + '</button></div>';
},
function (what) {
var xr = hmXr();
var h = '<div class="row" style="gap:8px;flex-wrap:wrap">' +
(xr ? '' : '<button class="btn" data-hm="add" style="flex:1;min-width:140px;padding:10px 12px;font-weight:700;border-color:#C9A868;color:#F0D890">＋ Add ' + what + ' from this device</button>') +
'<button class="btn" data-hm="link" style="flex:1;min-width:140px;padding:10px 12px;font-weight:700;border-color:#C9A868;color:#F0D890">🔗 Play a link</button></div>';
if (HMD.linkOpen)
h += '<div class="row" style="gap:6px;align-items:center">' +
'<input type="url" id="hm-link" inputmode="url" autocomplete="off" placeholder="Paste a link: YouTube, Vimeo, or a .mp4 / .mp3 file" ' +
'style="flex:1;min-width:0;background:#07070C;border:1px solid rgba(201,190,168,.4);color:#EDE8F8;border-radius:8px;padding:9px 10px;font:15px system-ui,sans-serif">' +
'<button class="btn" data-hm="link-go" style="font-weight:700">▶ Play</button></div>';
if (xr)
h += '<div class="dim" style="margin-top:4px;font-size:12px">Files from this device are added outside the headset view; they wait here in your list.</div>';
return h;
},
function () {
var L = HMD.list || [], vids = L.filter(function (r) { return r.kind === "video"; }), songs = L.filter(function (r) { return r.kind === "audio"; });
var h = '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px">';
if (HMD.mode === "lib") {
h += '<h4>📺 Your videos and music</h4><button class="btn" data-hm="close">Close</button></div>' +
'<div class="dim" style="margin-top:4px">Add your own videos and songs. They stay on this device and are never sent anywhere, so nobody else sees or hears them. ' +
'They play on the TV and the radio in the living room of a home (every home but the Warrens).</div>' +
hmAddRow("videos or music");
if (HMD.msg)
h += '<div style="margin-top:6px;color:#F0D890">' + esc(HMD.msg) + '</div>';
h += '<div style="margin-top:8px"><b>Videos</b> <span class="dim">(' + vids.length + ')</span></div>' + (vids.length ? vids.map(function (r) { return hmRow(r, null); }).join("") : '<div class="dim">None yet.</div>');
h += '<div style="margin-top:8px"><b>Music</b> <span class="dim">(' + songs.length + ')</span></div>' + (songs.length ? songs.map(function (r) { return hmRow(r, null); }).join("") : '<div class="dim">None yet.</div>');
return h;
}
var tv = HMD.mode === "tv", dev = HMD.mode, on = tv ? HMD.tvOn : HMD.radioOn, el = tv ? HMD.vid : HMD.aud, list = tv ? vids : songs;
var playing = !!(on && el && !el.paused), all = tv ? HMD.tvAll : HMD.radioAll, emb = tv && !!HMD.embed;
var oi = hmItem(on), sh = HMD.sh[dev], who = "";
if (oi && hmShOn()) {
if (oi.url && sh && sh.url === oi.url)
who = sh.mine ? "On for everyone in the home." : "Put on by " + (sh.by || "someone here") + ", for everyone in the home.";
else if (oi.url && HMD.shMay === false)
who = "Just for you: only the people who live here change it for everyone.";
else if (!oi.url)
who = "Just for you: your own files stay on this device.";
}
var whoH = who ? '<div class="dim" style="font-size:12px;margin-top:2px">' + esc(who) + '</div>' : '';
h += '<h4>' + (tv ? '📺 The television' : '📻 The radio') + '</h4><div style="display:flex;gap:6px">' +
(HMD.homeId ? '<button class="btn" data-hm="swap">' + (tv ? '📻 Radio' : '📺 TV') + '</button>' : '') + '<button class="btn" data-hm="close">Close</button></div></div>';
if (on && emb)
h += '<div style="margin-top:2px">On now: <b>' + esc(hmName(on)) + '</b></div>' + whoH +
'<div class="row"><button class="btn" data-hm="closeup">🔍 Watch</button><button class="btn" data-hm="next">⏭ Next</button><button class="btn" data-hm="off">⏹ Off</button></div>';
else if (on)
h += '<div style="margin-top:2px">' + (playing ? (tv ? 'On now: ' : 'Playing: ') : 'Paused: ') + '<b>' + esc(hmName(on)) + '</b></div>' + whoH +
'<div class="row">' + (playing ? '<button class="btn" data-hm="pause">⏸ Pause</button>' : '<button class="btn" data-hm="resume">▶ Play</button>') +
'<button class="btn" data-hm="next">⏭ Next</button><button class="btn" data-hm="off">⏹ Off</button>' +
(tv ? '<button class="btn" data-hm="closeup">🔍 Watch up close</button>' : '') + '</div>';
else
h += hmAddRow(tv ? 'videos' : 'music');
if (!emb)
h += '<div class="row" style="align-items:center"><span>Volume</span><button class="btn" data-hm="vol-">−</button><b>' + Math.round(HMD.vol[dev] * 100) + '%</b><button class="btn" data-hm="vol+">＋</button>' +
'<label style="margin-left:6px"><input type="checkbox" data-hm="all"' + (all ? ' checked' : '') + '> ' + (tv ? 'one after another' : 'play on through them all') + '</label></div>';
if (HMD.msg)
h += '<div style="margin-top:6px;color:#F0D890">' + esc(HMD.msg) + '</div>';
if (on && !HMD.listOpen) {
h += '<div class="row"><button class="btn" data-hm="list">' + (tv ? 'Choose another video' : 'Choose another song') + ' (' + list.length + ')</button>' +
'<button class="btn" data-hm="add">＋ Add</button><button class="btn" data-hm="link">🔗 Link</button></div>' + (HMD.linkOpen ? hmAddRow(tv ? 'videos' : 'music') : '');
return h;
}
h += '<div style="margin-top:8px"><b>' + (tv ? 'Your videos' : 'Your music') + '</b></div>';
h += list.length ? list.map(function (r) { return hmRow(r, dev); }).join("") : '<div class="dim">Nothing here yet. Add your own ' + (tv ? 'videos' : 'songs') + ' and they play here.</div>';
if (on)
h += hmAddRow(tv ? 'videos' : 'music');
h += '<div class="dim" style="margin-top:6px;font-size:11.5px">' + (hmShOn() && HMD.shMay !== false ?
'A link plays for everyone in the home. Your own files stay on this device and play for you only.' :
'Only you see and hear this, and only inside the home. Your files stay on this device.') + '</div>';
return h;
},
function (force) {
if (!HMD.mode) {
if (HMD.el)
HMD.el.style.display = "none";
HMD.painted = "";
return;
}
var el = HMD.el || (HMD.el = hallPanel("hm-panel", "#C9A868"));
if (!el)
return;
var ph = (typeof psIsPhone === "function") && psIsPhone(), pos = ph ? "max-height:min(44vh,560px)" : "left:auto;right:12px;bottom:calc(150px + env(safe-area-inset-bottom,0px))";
if (el.__pos !== pos) {
el.__pos = pos;
el.style.left = "";
el.style.right = "";
el.style.bottom = "";
el.style.maxHeight = "";
el.style.cssText += ";" + pos;
}
if (!el.__hm) {
el.__hm = 1;
el.addEventListener("click", function (e) { var b = e.target.closest && e.target.closest("[data-hm]"); if (!b || b.tagName === "INPUT")
return; hmAct(b.getAttribute("data-hm"), b.getAttribute("data-id")); });
el.addEventListener("change", function (e) { var b = e.target; if (b && b.getAttribute && b.getAttribute("data-hm") === "all") {
if (HMD.mode === "tv")
HMD.tvAll = b.checked;
else
HMD.radioAll = b.checked;
} });
["keydown", "keyup", "keypress"].forEach(function (k) {
el.addEventListener(k, function (e) {
if (!e.target || e.target.tagName !== "INPUT" || e.target.type === "checkbox")
return;
e.stopPropagation();
if (k === "keydown" && e.key === "Enter") {
e.preventDefault();
hmAct("link-go");
}
if (k === "keydown" && e.key === "Escape")
e.target.blur();
});
});
el.addEventListener("pointerdown", function (e) { if (e.target && e.target.tagName === "INPUT")
e.stopPropagation(); });
}
var h = hmHtml();
if (force || h !== HMD.painted) {
var li = document.getElementById("hm-link"), lv = li ? li.value : "", lf = li && document.activeElement === li;
el.innerHTML = h;
HMD.painted = h;
var ln = document.getElementById("hm-link");
if (ln) {
if (lv)
ln.value = lv;
if (lf || HMD.linkFocus) {
HMD.linkFocus = false;
try {
ln.focus();
}
catch (e) { }
}
}
}
el.style.display = "block";
},
function (a, id) {
var dev = HMD.mode === "tv" ? "tv" : "radio", el = dev === "tv" ? HMD.vid : HMD.aud;
if (a === "close") {
if (HMD.mode !== "lib" && HMD.near === HMD.mode)
HMD.shut = HMD.mode;
HMD.mode = null;
HMD.msg = "";
HMD.pinned = false;
HMD.linkOpen = false;
hmPaint();
return;
}
if (a === "add") {
hmPicker();
return;
}
if (a === "link") {
HMD.linkOpen = !HMD.linkOpen;
HMD.linkFocus = HMD.linkOpen;
HMD.msg = "";
hmPaint(true);
return;
}
if (a === "link-go") {
var li = document.getElementById("hm-link");
hmAddLink(li ? li.value : "");
return;
}
if (a === "swap") {
HMD.mode = HMD.mode === "tv" ? "radio" : "tv";
HMD.pinned = true;
HMD.msg = "";
HMD.linkOpen = false;
hmUrls(HMD.mode === "tv" ? "video" : "audio");
hmPaint(true);
return;
}
if (a === "remove") {
hmRemove(id);
return;
}
if (a === "play") {
HMD.listOpen = false;
hmPlay(dev, id);
return;
}
if (a === "list") {
HMD.listOpen = true;
hmPaint(true);
return;
}
if (a === "pause" && el) {
el.pause();
hmShare(dev, hmItem(dev === "tv" ? HMD.tvOn : HMD.radioOn), el.currentTime, false);
return;
}
if (a === "resume" && el) {
var p = el.play();
if (p && p.catch)
p.catch(function () { });
hmShare(dev, hmItem(dev === "tv" ? HMD.tvOn : HMD.radioOn), el.currentTime, true);
return;
}
if (a === "next") {
var keep = dev === "tv" ? HMD.tvAll : HMD.radioAll;
if (dev === "tv")
HMD.tvAll = true;
else
HMD.radioAll = true;
hmNext(dev);
if (dev === "tv")
HMD.tvAll = keep;
else
HMD.radioAll = keep;
return;
}
if (a === "off") {
var wasOn = hmItem(dev === "tv" ? HMD.tvOn : HMD.radioOn);
hmOff(dev);
if (wasOn && wasOn.url)
hmShare(dev, null);
return;
}
if (a === "closeup") {
hmCloseUp(true);
return;
}
if (a === "vol-") {
hmVolume(dev, -.1);
return;
}
if (a === "vol+") {
hmVolume(dev, .1);
return;
}
},
function (dev, r, pos, playing) {
if (!hmShOn())
return;
var cur = HMD.sh[dev];
if (r && !r.url) {
if (!(cur && cur.url))
return;
r = null;
}
if (r && r.shared && cur && cur.url === r.url && playing === undefined)
return;
var L = hmShLot();
cityRpc("home_screen_put", { p_world: L.world, p_lot: L.name, p_dev: dev, p_url: r ? r.url : null, p_site: r ? (r.site || null) : null,
p_kind: r ? r.kind : null, p_name: r ? r.name : null, p_pos: Math.max(0, +pos || 0), p_playing: playing !== false })
.then(function (d) {
if (!d)
return;
if (d.ok) {
HMD.shV[dev] = Math.max(HMD.shV[dev] || 0, +d.v || 0);
HMD.sh[dev] = r ? { url: r.url, site: r.site || null, name: r.name, mine: true } : null;
HMD.shMay = true;
hmPaint(true);
return;
}
if (d.mine === false) {
HMD.shMay = false;
if (!HMD.shTold) {
HMD.shTold = true;
HMD.msg = d.say || "";
hmPaint(true);
}
}
}).catch(function (e) { hmShMissing(e); });
},
function (d) {
if (!d || !d.ok || !HMD.homeId)
return;
HMD.shMay = !!d.may;
["tv", "radio"].forEach(function (dev) {
var s = d.screens && d.screens[dev];
if (!s)
return;
if ((+s.v || 0) <= (HMD.shV[dev] || 0))
return;
HMD.shV[dev] = +s.v || 0;
var was = HMD.sh[dev];
HMD.sh[dev] = s.url ? { url: s.url, site: s.site, name: s.name, by: s.by, mine: !!s.mine } : null;
var el = dev === "tv" ? HMD.vid : HMD.aud, onId = dev === "tv" ? HMD.tvOn : HMD.radioOn, cur = hmItem(onId);
var at = Math.max(0, (+s.pos || 0) + (s.playing ? Math.max(0, ((+d.now || 0) - (+s.started || 0)) / 1000) : 0));
if (!s.url) {
if (cur && (cur.shared || (cur.url && was && was.url === cur.url)))
hmOff(dev);
hmPaint(true);
return;
}
if (s.mine && cur && cur.url === s.url)
return;
if (cur && cur.url === s.url && !(dev === "tv" && HMD.embed)) {
if (el) {
if (Math.abs(el.currentTime - at) > 3)
try {
el.currentTime = at;
}
catch (e) { }
if (s.playing && el.paused) {
var p0 = el.play();
if (p0 && p0.catch)
p0.catch(function () { });
}
else if (!s.playing && !el.paused)
el.pause();
}
hmPaint(true);
return;
}
var id = "sh" + dev + s.v, kind = s.kind || (dev === "tv" ? "video" : "audio");
var row = { id: id, name: s.name || (dev === "tv" ? "a video" : "a song"), kind: kind, url: s.url, site: s.site || "", shared: true, by: s.by || "", at: at };
if (/youtu\.?be|vimeo\.com/i.test(s.url) && !/\/embed\/|player\.vimeo\.com/i.test(s.url)) {
var lp = hmLinkParse(s.url);
if (lp && lp.site) {
row.url = lp.url;
row.site = lp.site;
if (HMD.sh[dev]) {
HMD.sh[dev].url = lp.url;
HMD.sh[dev].site = lp.site;
}
}
}
HMD.extra = (HMD.extra || []).filter(function (x) { return x.id !== (dev === "tv" ? HMD.tvOn : HMD.radioOn) || !x.shared; }).concat([row]);
HMD.urls[id] = row.url;
if (!(dev === "tv" && row.site))
HMD.seek[dev] = at > 1 ? at : null;
hmPlay(dev, id, true);
var el2 = dev === "tv" ? HMD.vid : HMD.aud;
if (!s.playing && el2 && !(dev === "tv" && row.site)) {
try {
el2.pause();
}
catch (e) { }
}
if (!s.mine) {
HMD.msg = (s.by ? s.by + " put on " : "On for everyone here: ") + row.name + (s.by ? " for everyone here." : ".");
if (HMD.mode !== dev && typeof setStatus === "function")
setStatus("📺 " + esc(HMD.msg));
}
hmPaint(true);
});
},
function (dt) {
if (!hmShOn())
return;
var now = performance.now();
if (now < HMD.shCool || HMD.shBusy)
return;
HMD.shCool = now + HM_SH_EVERY * 1000;
HMD.shBusy = true;
var L = hmShLot();
cityRpc("home_screen_get", { p_world: L.world, p_lot: L.name })
.then(function (d) { HMD.shBusy = false; if (L.name === (hmShLot() || {}).name)
hmShApply(d); })
.catch(function (e) { HMD.shBusy = false; hmShMissing(e); });
}
];
});
