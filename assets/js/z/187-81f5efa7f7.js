/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(187, function () {
"use strict";
return [
function () {
try {
if (typeof renderer === "undefined" || !renderer || typeof scene === "undefined")
return null;
renderer.render(scene, camera);
var src = renderer.domElement, w = 480, h = Math.round(w * src.height / Math.max(1, src.width));
var c = document.createElement("canvas");
c.width = w;
c.height = h;
c.getContext("2d").drawImage(src, 0, 0, w, h);
return c.toDataURL("image/jpeg", 0.62);
}
catch (e) {
return null;
}
},
function (what) {
var P = (typeof camera !== "undefined") ? camera.position : { x: 0, y: 0, z: 0 }, here = store.here || 0;
var near = (store.objects || []).filter(function (o) { return (o.realm || 0) === here && !o.city && !o.hub; })
.map(function (o) { return { a: o.archetype, l: String(o.label || o.name || "").slice(0, 40), d: Math.round(Math.hypot(o.x - P.x, o.z - P.z)), y: o.y || 0 }; })
.sort(function (a, b) { return a.d - b.d; }).slice(0, 40);
var wx = null;
try {
wx = (typeof wxState === "function") ? wxState() : null;
}
catch (e) { }
return {
what: String(what || "").slice(0, 4000),
dream: String(store.transcript || "").slice(-4000),
built: near,
weather: wx ? wx.kind : "",
where: { realm: here, inside: bugInsideName(), place: bugRealmName(here), walking: !!(typeof walkMode !== "undefined" && walkMode),
at: [Math.round(P.x), Math.round(P.y * 10) / 10, Math.round(P.z)], city: bugInCity(here) },
ai: String(window.__lastAI || "").slice(0, 3000),
device: { ua: navigator.userAgent.slice(0, 200), screen: screen.width + "x" + screen.height, ratio: window.devicePixelRatio || 1, gl: bugGL(),
app: (typeof APP_VERSION !== "undefined" ? APP_VERSION : ""), touch: ("ontouchstart" in window) },
at: new Date().toISOString(),
shot: bugShot()
};
},
function (rep) {
if (typeof signedIn !== "function" || !signedIn() || typeof freshToken !== "function" || !DW_CONFIG.supabaseUrl)
return Promise.resolve(false);
if (!rep.rid)
rep.rid = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
if (BUG.sent && BUG.sent[rep.rid])
return Promise.resolve(true);
BUG.flying = BUG.flying || {};
if (BUG.flying[rep.rid])
return Promise.resolve(false);
var post = function (r) { BUG.flying[rep.rid] = 1; var pr = bugPost(r); pr.then(function (ok) { delete BUG.flying[rep.rid]; if (ok)
bugDone(rep.rid); }); return pr; };
return bugWithin(post(rep), rep.shot ? 30000 : 20000).then(function (ok) {
if (ok || BUG.flying[rep.rid])
return ok;
if (rep.shot)
return bugWithin(post(Object.assign({}, rep, { shot: null, shotDropped: true })), 20000);
return ok;
});
},
function (rep) {
return freshToken().then(function (tok) {
if (!tok)
return false;
var line = rep.what.replace(/\s+/g, " ").trim(), subject = "Bug report: " + (line.length > 136 ? line.slice(0, 136).replace(/\s+\S*$/, "") + "\u2026" : (line || "(no words)"));
var body = rep.what || "(the dreamer sent the report without words)";
return fetch(DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/rest/v1/messages", { method: "POST",
headers: { apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + tok, "Content-Type": "application/json", Prefer: "return=minimal" },
body: JSON.stringify({ kind: "support", subject: subject, body: body, attachments: { bug: rep } }) })
.then(function (r) {
return !!r.ok;
});
}).catch(function () { return false; });
},
function () {
if (!BUG.el)
bugBuild();
BUG.shotNow = bugShot();
var img = document.getElementById("bug-shot");
if (img) {
img.src = BUG.shotNow || "";
img.style.display = BUG.shotNow ? "block" : "none";
}
var t = document.getElementById("bug-what");
t.value = BUG.draft || "";
document.getElementById("bug-msg").textContent = "";
if (BUG.el.parentNode !== document.body || document.body.lastElementChild !== BUG.el)
document.body.appendChild(BUG.el);
BUG.el.style.display = "flex";
try {
if (document.pointerLockElement)
document.exitPointerLock();
}
catch (e) { }
try {
if (typeof joy !== "undefined" && joy) {
joy.id = null;
joy.dx = joy.dy = 0;
var kn = document.getElementById("joyknob");
if (kn)
kn.style.transform = "translate(0,0)";
}
}
catch (e) { }
try {
if (typeof keys !== "undefined" && keys)
for (var k in keys)
keys[k] = false;
}
catch (e) { }
bugFit();
try {
t.focus({ preventScroll: true });
}
catch (e) { }
setTimeout(function () { if (bugIsOpen() && document.activeElement !== t)
try {
t.focus({ preventScroll: true });
}
catch (e) { } }, 60);
},
function () {
if (!bugIsOpen())
return;
var vv = window.visualViewport, w = BUG.el;
if (vv && vv.height < innerHeight - 80) {
w.style.top = Math.round(vv.offsetTop) + "px";
w.style.height = Math.round(vv.height) + "px";
w.style.bottom = "auto";
w.style.alignItems = "flex-start";
document.getElementById("bug-box").style.maxHeight = Math.max(160, Math.round(vv.height) - 16) + "px";
}
else {
w.style.top = w.style.height = w.style.bottom = w.style.alignItems = "";
document.getElementById("bug-box").style.maxHeight = "";
}
}
];
});
