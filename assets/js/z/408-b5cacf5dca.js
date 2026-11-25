/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(408, function () {
"use strict";
return [
function (id, list, start) {
var o = (typeof location !== "undefined" && /^https?:/.test(location.protocol)) ? "&origin=" + encodeURIComponent(location.origin) : "";
return "https://www.youtube-nocookie.com/embed/" + (id || "videoseries") + "?autoplay=1&playsinline=1&rel=0&enablejsapi=1" + o +
(list ? "&list=" + encodeURIComponent(list) : "") + (start > 0 ? "&start=" + start : "");
},
function (raw) {
var t = String(raw || "").trim();
if (t && !/\s/.test(t))
try {
var u = new URL(/^[a-z]+:\/\//i.test(t) ? t : "https://" + t), h = u.hostname.replace(/^(www|m|music)\./, "");
if (/^https?:$/.test(u.protocol) && (h === "youtu.be" || h === "youtube.com" || h === "youtube-nocookie.com")) {
var id = null, list = u.searchParams.get("list"), p = u.pathname;
if (h === "youtu.be")
id = p.split("/")[1] || null;
else {
id = u.searchParams.get("v");
var mm = p.match(/^\/(embed|shorts|live|v)\/([\w-]{6,})/);
if (!id && mm)
id = mm[2];
}
if (id === "videoseries")
id = null;
if (id && !/^[\w-]{6,20}$/.test(id))
id = null;
if (list && !/^[\w-]{10,64}$/.test(list))
list = null;
if (list && /^RD/.test(list) && id)
list = null;
if (id || list)
return { kind: "video", site: "youtube", url: hytEmbed(id, list, hytTime(u.searchParams.get("t") || u.searchParams.get("start"))),
name: id ? "YouTube video " + id : "YouTube playlist" };
return { err: "That is a YouTube page, not one video. Open the video itself on YouTube, tap Share, then Copy link, and paste that here." };
}
}
catch (e) { }
return hytParse0.apply(this, arguments);
},
function () {
if (typeof window !== "undefined" && window.YT && window.YT.Player)
return Promise.resolve(window.YT);
if (HYT.api)
return HYT.api;
HYT.api = new Promise(function (res, rej) {
var prev = window.onYouTubeIframeAPIReady;
window.onYouTubeIframeAPIReady = function () { try {
if (typeof prev === "function")
prev();
}
catch (e) { } res(window.YT); };
var s = document.createElement("script");
s.src = "https://www.youtube.com/iframe_api";
s.async = true;
s.onerror = function () { HYT.api = null; rej(new Error("no api")); };
document.head.appendChild(s);
setTimeout(function () { rej(new Error("slow")); }, 20000);
});
HYT.api.catch(function () { HYT.api = null; });
return HYT.api;
},
function (code, name) {
var n = name ? "\"" + name + "\"" : "This video";
if (code === 2)
return n + ": that link's video number isn't right. Copy the link again from YouTube (Share, then Copy link).";
if (code === 5)
return n + " couldn't play inside the game on this device. Open on YouTube plays it there.";
if (code === 100)
return n + " is private, taken down, or no longer on YouTube.";
return "YouTube won't let " + n + " play inside the game. That happens with films and shows you bought or rented, age-restricted videos, " +
"videos only shown in some countries, and videos whose makers turned off sharing. Open on YouTube plays it on YouTube itself.";
},
function (r, code) {
if (!HMD.embed || HMD.tvOn !== r.id)
return;
var nm = hmName(r.id) || r.name;
HYT.err = code;
HMD.ytPage = hytPage(r.url);
HMD.msg = hytWhy(code, nm);
if (typeof hmCard === "function")
hmCard(nm, "Can't play here · Open on YouTube");
var o = HMD.close, f = o && o.querySelector(".foot");
if (f) {
f.textContent = HMD.msg;
f.style.color = "#F0D890";
}
hytBar(true);
hmPaint(true);
},
function (f, r) {
if (!f)
return;
HYT.player = null;
hytApi().then(function (YT) {
if (HMD.embed !== f)
return;
try {
HYT.player = new YT.Player(f, { events: {
onError: function (e) { hytErr(r, +(e && e.data) || 0); },
onStateChange: function (e) { if (e && e.data === 1 && HYT.err == null && /^Tap ▶/.test(HMD.msg || "")) {
HMD.msg = "";
hmPaint(true);
} }
} });
}
catch (e) { }
}).catch(function () { });
},
function (big) {
var o = HMD.close;
if (!o)
return;
var bar = o.querySelector(".bar");
if (!bar)
return;
var b = bar.querySelector("[data-hyt]");
if (!b) {
b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-hyt", "open");
b.type = "button";
b.textContent = "Open on YouTube ↗";
b.addEventListener("click", function (e) { e.stopPropagation(); hytOpen(); });
bar.insertBefore(b, bar.lastElementChild);
}
if (big) {
b.style.borderColor = "#C9A868";
b.style.color = "#F0D890";
b.style.fontWeight = "700";
}
},
function (r, remote) {
if (!hytIsYt(r))
return hytOn0.apply(this, arguments);
var b = hytBits(r.url), r2 = Object.assign({}, r, { url: hytEmbed(b.id, b.list, (+r.at || 0) > 2 ? 0 : b.start) });
HYT.err = null;
var out = hytOn0.call(this, r2, remote);
hytBar(false);
var f = HMD.close && HMD.close.querySelector(".foot");
if (f)
f.textContent += " A film you bought or rented on YouTube plays only on YouTube itself: Open on YouTube.";
hytAttach(HMD.embed, r2);
return out;
},
function (page) {
var r = hytNow();
page = page || HMD.ytPage || (r ? hytPage(r.url) : "https://www.youtube.com/");
try {
if (HYT.player && HYT.player.pauseVideo && HYT.err == null)
HYT.player.pauseVideo();
}
catch (e) { }
try {
window.open(page, "_blank", "noopener");
}
catch (e) { }
if (HYT.err == null)
HMD.msg = r && HMD.embed ? "Opened on YouTube. The TV here is paused; tap Watch to carry on here." : "Opened on YouTube.";
hmPaint(true);
},
function () {
var h = '<div class="row"><button class="btn" data-hm="yt-films">🎞 Free films from long ago' + (HYT.films ? ' ▲' : ' ▼') + '</button></div>';
if (!HYT.films)
return h;
h += '<div class="dim" style="font-size:12px;margin:2px 0 4px">Famous films from 1930 or earlier, free for anyone to watch. Tap one: YouTube opens with a search. Pick a full copy, tap Share, then Copy link, and paste it above. (Some copies add new music of their own.)</div>';
HYT_FILMS.forEach(function (f, i) {
h += '<div class="item" style="display:flex;align-items:center;gap:8px"><button class="btn" data-hm="yt-film" data-id="' + i + '">🔍</button>' +
'<span style="flex:1;min-width:0"><b>' + esc(f[0]) + '</b> <span class="dim">(' + f[1] + ') · ' + esc(f[2]) + '</span></span></div>';
});
return h;
},
function () {
var h = hytHtml0.apply(this, arguments);
if (HMD.mode !== "tv")
return h;
var r = hytNow(), page = HMD.ytPage || (r && HMD.embed ? hytPage(r.url) : null);
if (page)
h += '<div class="row"><button class="btn" data-hm="yt-open" style="font-weight:700;border-color:#C9A868;color:#F0D890">▶ Open on YouTube ↗</button></div>' +
(r && HYT.err == null ? '<div class="dim" style="font-size:11.5px">A film you bought or rented on YouTube plays only on YouTube itself; this opens it there.</div>' : '');
if (HMD.linkOpen && !hytKidNo())
h += hytFilmsHtml();
return h;
},
function (a, id) {
if (a === "link" && hytKidNo() && !HMD.linkOpen) {
HMD.msg = HYT_KID;
hmPaint(true);
return;
}
if (a === "yt-open") {
hytOpen();
return;
}
if (a === "yt-films") {
HYT.films = !HYT.films;
hmPaint(true);
return;
}
if (a === "yt-film") {
var f = HYT_FILMS[+id];
if (!f)
return;
try {
window.open("https://www.youtube.com/results?search_query=" + encodeURIComponent(f[0] + " " + f[1] + " full film"), "_blank", "noopener");
}
catch (e) { }
HMD.msg = "YouTube opened with a search for " + f[0] + " (" + f[1] + "). Pick a full copy, tap Share, then Copy link, and paste it here.";
HMD.linkOpen = true;
hmPaint(true);
return;
}
if (a === "off" || a === "next") {
HMD.ytPage = null;
HYT.err = null;
}
return hytAct0.apply(this, arguments);
}
];
});
