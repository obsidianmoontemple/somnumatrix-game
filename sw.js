/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var GFX = "somnu-gfx-v1", PAGES = "somnu-pages-v1", META = "somnu-meta-v1";
var KEEP = [GFX, PAGES, META];
var MAN = null, BASE = null;
function pathOf(u, base) { u = String(u).split("?")[0]; return u.indexOf(base) === 0 ? decodeURI(u.slice(base.length)) : ""; }
function stamp(res, fp) {
if (!fp || res.type === "opaque")
return res;
var h = new Headers(res.headers);
h.set("x-somnu-fp", fp);
return new Response(res.body, { status: res.status, statusText: res.statusText, headers: h });
}
function loadMan() {
if (MAN)
return Promise.resolve();
return caches.open(META).then(function (m) { return m.match("manifest"); }).then(function (r) { return r ? r.json() : null; })
.then(function (o) { if (o && o.files) {
MAN = o.files;
BASE = o.base;
} }).catch(function () { });
}
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) {
e.waitUntil(caches.keys().then(function (ks) {
return Promise.all(ks.filter(function (k) { return /^somnu-/.test(k) && KEEP.indexOf(k) < 0; }).map(function (k) { return caches.delete(k); }));
}).then(function () { return self.clients.claim(); }));
});
function isGraphics(url) {
if (url.origin === self.location.origin)
return /\/assets\//.test(url.pathname);
return url.hostname === "cdnjs.cloudflare.com" && /three\.js/.test(url.pathname);
}
function isPage(req, url) {
return url.origin === self.location.origin && (req.mode === "navigate" || /\.html?$/.test(url.pathname) || /\/$/.test(url.pathname) || /assets-manifest\.json$/.test(url.pathname));
}
function ranged(req, hit) {
var r = req.headers.get("range"), m = r && /^bytes=(\d*)-(\d*)$/.exec(r.trim());
if (!m || hit.status !== 200)
return hit;
return hit.blob().then(function (b) {
var n = b.size, a = m[1] === "" ? Math.max(0, n - (+m[2] || 0)) : +m[1], z = m[1] === "" || m[2] === "" ? n - 1 : Math.min(+m[2], n - 1);
if (a >= n || a > z)
return new Response(null, { status: 416, headers: { "Content-Range": "bytes */" + n } });
var h = new Headers(hit.headers);
h.set("Content-Range", "bytes " + a + "-" + z + "/" + n);
h.set("Content-Length", String(z - a + 1));
h.set("Accept-Ranges", "bytes");
return new Response(b.slice(a, z + 1), { status: 206, statusText: "Partial Content", headers: h });
});
}
self.addEventListener("fetch", function (e) {
var req = e.request;
if (req.method !== "GET")
return;
var url;
try {
url = new URL(req.url);
}
catch (x) {
return;
}
if (/[?&]nosw\b/.test(url.search))
return;
if (isGraphics(url)) {
e.respondWith(caches.open(GFX).then(function (c) {
return c.match(req, { ignoreSearch: true }).then(function (hit) {
if (hit)
return ranged(req, hit);
if (req.headers.get("range"))
return fetch(req);
return fetch(req).then(function (res) {
if (res && (res.ok || res.type === "opaque")) {
var copy = res.clone();
loadMan().then(function () {
var n = BASE ? pathOf(req.url, BASE) : "";
return c.put(req, stamp(copy, MAN && MAN[n]));
}).catch(function () { });
}
return res;
});
});
}));
return;
}
if (isPage(req, url)) {
e.respondWith(fetch(req.mode === "navigate" ? new Request(req.url, { cache: "no-cache", credentials: "same-origin" }) : req).then(function (res) {
if (res && res.ok) {
var copy = res.clone();
caches.open(PAGES).then(function (c) { c.put(req, copy); }).catch(function () { });
}
return res;
}).catch(function () {
return caches.open(PAGES).then(function (c) { return c.match(req, { ignoreSearch: true }); }).then(function (hit) {
return hit || new Response("You are offline, and this page has not been kept yet.", { status: 503, headers: { "Content-Type": "text/plain" } });
});
}));
}
});
var busy = false;
self.addEventListener("message", function (e) {
var d = e.data || {};
if (d.type !== "sync" || !d.manifest || !d.manifest.files)
return;
var src = e.source;
var say = function (o) { try {
if (src)
src.postMessage(o);
}
catch (x) { } };
if (busy) {
say({ type: "busy" });
return;
}
busy = true;
var base = d.base || self.registration.scope, files = d.manifest.files, names = Object.keys(files);
MAN = files;
BASE = base;
var gfx, have = {};
var job = caches.open(META).then(function (m) { return m.put("manifest", new Response(JSON.stringify({ base: base, files: files }))); })
.then(function () { return caches.open(GFX); })
.then(function (c) { gfx = c; return gfx.keys(); })
.then(function (ks) {
return Promise.all(ks.map(function (k) {
var n = pathOf(k.url, base);
if (!n)
return null;
if (!(n in files))
return /^assets\/js\//.test(n) ? gfx.delete(k) : null;
return gfx.match(k).then(function (r) {
if (r && r.headers.get("x-somnu-fp") === files[n]) {
have[n] = 1;
return null;
}
return gfx.delete(k);
});
}));
})
.then(function () {
var todo = d.all ? names.filter(function (n) { return !have[n]; }) : [];
var done = names.length - todo.length, i = 0;
say({ type: "progress", done: done, total: names.length });
function next() {
if (i >= todo.length)
return Promise.resolve();
var n = todo[i++], u = new URL(n, base).href;
return fetch(u).then(function (res) { if (res.ok)
return gfx.put(u, stamp(res, files[n])); })
.then(function () { done++; if (done % 10 === 0 || i === todo.length)
say({ type: "progress", done: done, total: names.length }); })
.catch(function () { }).then(next);
}
return next();
})
.then(function () { return gfx.keys(); })
.then(function (ks) { say({ type: "done", kept: ks.length, total: names.length }); })
.catch(function (x) { say({ type: "error", message: String(x && x.message || x) }); })
.then(function () { busy = false; });
if (e.waitUntil)
e.waitUntil(job);
});
self.addEventListener("notificationclick", function (e) {
e.notification.close();
var url = (e.notification.data && e.notification.data.url) || self.registration.scope;
e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (cs) {
for (var i = 0; i < cs.length; i++) {
var c = cs[i];
if (c.url.indexOf(self.registration.scope) === 0 && "focus" in c) {
try {
c.postMessage({ type: "somnu-open", url: url });
}
catch (x) { }
return c.focus();
}
}
return self.clients.openWindow ? self.clients.openWindow(url) : null;
}));
});