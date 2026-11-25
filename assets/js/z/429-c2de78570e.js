/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(429, function () {
"use strict";
return [
function (g, m) {
var A = crActs(m);
if (!A)
return;
g.userData.crM = m;
g.userData.crA = A;
if (A.kind === "sign" && typeof wSign === "function") {
var sz = m.size || [1, 1, 1], w = Math.max(0.8, Math.min(3, (+sz[0] || 1) * 0.9));
try {
var s = wSign([String(A.text || "")], w, 0.34, "#1A1610", "#F2E6C8");
s.position.set(0, (+sz[1] || 1) + 0.3, 0);
s.userData.keep = 1;
g.add(s);
}
catch (e) { }
}
if (A.kind === "door" || A.kind === "vending") {
CR.inst.push(g);
if (CR.inst.length > 200)
CR.inst = CR.inst.filter(crLive);
}
},
function (m) {
var r = crReg0.apply(this, arguments), k = "um_" + (m && m.id);
if (typeof FURN !== "undefined" && FURN[k] && crActs(m)) {
var f0 = FURN[k];
FURN[k] = function () { var g = f0.apply(this, arguments); crDress(g, m); return g; };
if (crActs(m).kind === "door" && typeof SOLIDFURN !== "undefined")
SOLIDFURN[k] = 1;
}
return r;
},
function (g) {
var m = g.userData.crM, sz = (m && m.size) || [1, 1, 1], hw = (+sz[0] || 1) / 2;
if (!g.userData.crBase)
g.userData.crBase = { x: g.position.x, z: g.position.z, ry: g.rotation.y, open: false, a: 0 };
var B = g.userData.crBase;
B.open = !B.open;
var p = new THREE.Vector3();
g.getWorldPosition(p);
var w = crDoorWall(g, p);
if (w) {
if (B.open) {
w.crX = w.x;
w.x = 1e6;
}
else if (w.crX !== undefined) {
w.x = w.crX;
}
}
var to = B.open ? -Math.PI / 2 : 0, from = B.a, t0 = performance.now();
(function step(now) {
var f = Math.min(1, ((now || performance.now()) - t0) / 450), a = from + (to - from) * (1 - Math.pow(1 - f, 3));
B.a = a;
var c0 = Math.cos(B.ry), s0 = Math.sin(B.ry), hx = B.x - hw * c0, hz = B.z + hw * s0;
var r = B.ry + a, c = Math.cos(r), s = Math.sin(r);
g.rotation.y = r;
g.position.x = hx + hw * c;
g.position.z = hz - hw * s;
if (f < 1)
requestAnimationFrame(step);
})();
setStatus(B.open ? "🚪 Open." : "🚪 Shut.");
},
function (m) {
CR.vend = { m: m, d: null, say: "", busy: true };
crVendPaint();
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
mwRpc("model_vending", { p_id: m.id }).then(function (o) { CR.vend && (CR.vend.d = o); (o && o.items || []).forEach(mwRegister); }, function (e) { CR.vend && (CR.vend.d = { ok: false, say: mwErr(e) }); })
.then(function () { if (CR.vend) {
CR.vend.busy = false;
crVendPaint();
} });
},
function () {
var el = CR.vendEl;
if (!CR.vend) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = CR.vendEl = document.createElement("div");
el.id = "cr-vend";
el.style.cssText = "position:fixed;z-index:53;left:50%;top:50%;transform:translate(-50%,-50%);width:min(440px,calc(100vw - 32px));max-height:min(80vh,640px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(22,24,30,.97),rgba(9,10,13,.98));border:1px solid #C9A868;border-radius:8px;padding:12px 14px;color:var(--bone,#C9BEA8);font:13px var(--sans,system-ui)";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", function (ev) {
var b = ev.target.closest && ev.target.closest("[data-cv]");
if (!b || !CR.vend)
return;
var a = b.getAttribute("data-cv");
if (a === "x")
return crVendClose();
if (a === "buy" && !CR.vend.busy) {
CR.vend.busy = true;
crVendPaint();
cityRpc("model_buy", { p_id: +b.getAttribute("data-i") }).then(function (o) { if (CR.vend)
CR.vend.say = (o && o.say) || "Done."; if (o && o.ok) {
if (typeof loadThings === "function")
loadThings();
if (typeof refreshStanding === "function")
refreshStanding();
} }, function (e) { if (CR.vend)
CR.vend.say = mwErr(e); }).then(function () { if (CR.vend) {
CR.vend.busy = false;
crVendPaint();
} });
}
});
document.body.appendChild(el);
}
var V = CR.vend, d = V.d, h = "<div style='display:flex;align-items:center;gap:8px;margin-bottom:6px'><b style='flex:1;font-size:15px'>🥤 " + esc(V.m.title) + "</b><button class='btn' data-cv='x'>Close</button></div>";
if (V.say)
h += "<div role='status' style='margin:0 0 8px;padding:5px 8px;border:1px solid rgba(232,194,122,.4);border-radius:4px'>" + esc(V.say) + "</div>";
if (!d)
h += "<p>Looking…</p>";
else if (!d.ok)
h += "<p>" + esc(d.say || "") + "</p>";
else {
h += "<div style='font-size:12px;opacity:.8;margin-bottom:6px'>Made by " + esc(d.maker || "a maker") + ". Every piece was looked at by a moderator. What you buy goes in your backpack.</div>";
if (!(d.items || []).length)
h += "<p style='opacity:.8'>Nothing in it just now.</p>";
(d.items || []).forEach(function (m) {
h += "<div style='padding:5px 0;border-bottom:1px solid rgba(255,255,255,.07)'><b>" + esc(m.title) + "</b> <span style='opacity:.75'>" + (+m.size[1] || 0).toFixed(2) + " m</span><br>" +
((typeof signedIn === "function" && signedIn()) ? "<button class='btn' data-cv='buy' data-i='" + m.id + "' style='margin-top:3px'>Buy · " + (+m.price).toLocaleString() + " gold</button>" : "<span style='opacity:.7'>Sign in to buy.</span>") + "</div>";
});
}
if (V.busy)
h += "<div style='opacity:.7;margin-top:6px'>…</div>";
el.innerHTML = h;
el.style.display = "block";
},
function (m, btns, sub) {
if (MW.tab === "mine" && m && (m.status === "approved" || m.status === "pending")) {
var A = crActs(m), cur = A ? A.kind : "none";
btns += "<div style='margin-top:4px;font-size:12px'>What it does: " + CR_KINDS.map(function (k) { return mwB("act", k[1], " data-i='" + m.id + "' data-k='" + k[0] + "'", cur === k[0]); }).join("") +
(cur === "sign" || MW.crSign === m.id ? "<div style='margin-top:3px'><input id='cr-sign-" + m.id + "' maxlength='80' value='" + esc(A && A.text || "") + "' placeholder='Words on the sign' style='width:70%;background:#1A140C;color:inherit;border:1px solid #6A5A3A;border-radius:4px;padding:4px'> " +
mwB("actsign", "Save the words", " data-i='" + m.id + "'") + "</div>" : "") + "</div>";
}
return crRow0.call(this, m, btns, sub);
},
function (ev) {
var b = ev.target.closest && ev.target.closest("[data-mw]");
var a = b && b.getAttribute("data-mw");
if (a !== "act" && a !== "actsign")
return crClick0.apply(this, arguments);
ev.stopPropagation();
if (MW.busy)
return;
var id = +b.getAttribute("data-i"), k = a === "act" ? b.getAttribute("data-k") : "sign", txt = "";
if (k === "sign") {
var inp = document.getElementById("cr-sign-" + id);
if (a === "act" && !(inp && inp.value.trim())) {
MW.crSign = id;
MW.say = "Write the words for the sign, then press Save the words.";
return mwPaint();
}
txt = inp ? inp.value : "";
}
MW.busy = true;
mwPaint();
cityRpc("model_acts_set", { p_id: id, p_kind: k, p_text: txt }).then(function (o) { MW.say = (o && o.say) || "Done."; if (o && o.ok) {
MW.crSign = null;
mwLoadList(true);
} }, function (e) { MW.say = mwErr(e); })
.then(function () { MW.busy = false; mwLoad(); });
},
function () {
if (CLIP.rec)
return;
if (!clipCan()) {
setStatus("🎬 This browser cannot record clips. Chrome, Edge or Firefox on a computer or Android can.");
return;
}
var lite = clipLite(), mime = clipMime();
CLIP.max = lite ? 12 : 20;
var st;
try {
st = renderer.domElement.captureStream(lite ? 20 : 30);
}
catch (e) {
setStatus("🎬 The clip could not start.");
return;
}
try {
if (typeof audio !== "undefined" && audio && audio.ctx && audio.master) {
CLIP.dest = audio.ctx.createMediaStreamDestination();
audio.master.connect(CLIP.dest);
CLIP.dest.stream.getAudioTracks().forEach(function (t) { st.addTrack(t); });
}
}
catch (e) {
CLIP.dest = null;
}
var rec;
try {
rec = new MediaRecorder(st, { mimeType: mime, videoBitsPerSecond: lite ? 1500000 : 4000000, audioBitsPerSecond: 96000 });
}
catch (e) {
try {
rec = new MediaRecorder(st);
}
catch (e2) {
clipLetGo(st);
setStatus("🎬 The clip could not start.");
return;
}
}
CLIP.rec = rec;
CLIP.chunks = [];
CLIP.t0 = performance.now();
CLIP.mime = (rec.mimeType || mime).split(";")[0];
CLIP.st = st;
rec.ondataavailable = function (e) { if (e.data && e.data.size)
CLIP.chunks.push(e.data); };
rec.onstop = function () {
var secs = Math.round((performance.now() - CLIP.t0) / 1000), blob = new Blob(CLIP.chunks, { type: CLIP.mime || "video/webm" });
CLIP.chunks = [];
clipLetGo(CLIP.st);
CLIP.rec = null;
CLIP.st = null;
clipBar();
if (blob.size < 1000) {
setStatus("🎬 The clip came out empty. Try again.");
return;
}
clipPreview(blob, secs);
};
rec.start(1000);
CLIP.timer = setInterval(function () { var s = (performance.now() - CLIP.t0) / 1000; if (s >= CLIP.max)
clipStop(); clipBar(); }, 250);
clipBar();
},
function () {
var b = document.getElementById("pm-bar");
if (!b)
return;
var btn = b.querySelector("[data-pm='clip']");
if (!btn) {
btn = document.createElement("button");
btn.className = "btn";
btn.setAttribute("data-pm", "clip");
var snap = b.querySelector("[data-pm='snap']");
b.insertBefore(btn, snap ? snap.nextSibling : b.firstChild);
}
if (CLIP.rec) {
var s = Math.max(0, Math.ceil(CLIP.max - (performance.now() - CLIP.t0) / 1000));
btn.innerHTML = "⏹ Stop · " + s + " s";
btn.style.background = "#7A1E1E";
}
else {
btn.innerHTML = "🎬 Record a clip";
btn.style.background = "";
}
},
function (blob, secs) {
var url = URL.createObjectURL(blob), ext = /mp4/.test(blob.type) ? "mp4" : "webm";
var name = "somnumatrix-" + new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-") + "." + ext;
var el = document.getElementById("clip-shot");
if (!el) {
el = document.createElement("div");
el.id = "clip-shot";
el.style.cssText = "position:fixed;inset:0;z-index:70;background:rgba(6,7,12,.9);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:16px;box-sizing:border-box;font:13px var(--sans,system-ui);color:#E0E8F4";
document.body.appendChild(el);
}
var canShare = false;
try {
canShare = !!(navigator.canShare && navigator.canShare({ files: [new File([blob], name, { type: blob.type })] }));
}
catch (e) { }
el.style.display = "flex";
el.innerHTML = '<video src="' + url + '" controls autoplay muted loop playsinline style="max-width:100%;max-height:64vh;border-radius:4px;background:#000"></video>' +
'<div style="opacity:.8">' + secs + ' seconds · ' + (blob.size / 1048576).toFixed(1) + ' MB</div>' +
'<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center"><a class="btn" href="' + url + '" download="' + name + '">💾 Save</a>' +
(canShare ? '<button class="btn" data-cl="share">📤 Share</button>' : '') +
'<button class="btn" data-cl="link">🔗 Make a link</button><button class="btn" data-cl="close">Done</button></div>' +
'<input id="clip-link" readonly style="display:none;width:min(520px,100%);padding:6px;border-radius:4px;border:1px solid #556;background:#0E1420;color:#CFE">' +
'<div id="clip-msg" style="min-height:18px;color:#F0C040"></div>';
var msg = function (h) { var m = document.getElementById("clip-msg"); if (m)
m.innerHTML = h; };
el.onclick = function (e) {
var t = e.target.closest && e.target.closest("[data-cl]");
if (!t)
return;
var a = t.getAttribute("data-cl");
if (a === "share") {
navigator.share({ files: [new File([blob], name, { type: blob.type })], title: "SomnuMatrix" }).catch(function () { });
}
else if (a === "link") {
if (t.disabled)
return;
t.disabled = true;
msg("Sending the clip…");
clipUpload(blob, secs, ext).then(function (link) {
var li = document.getElementById("clip-link");
li.style.display = "block";
li.value = link;
li.select();
try {
navigator.clipboard.writeText(link).then(function () { msg("🔗 <b>Link copied.</b> Anyone who opens it can watch the clip."); }, function () { msg("Copy the link above."); });
}
catch (er) {
msg("Copy the link above.");
}
}, function (er) { t.disabled = false; msg(esc(er && er.message || "The clip could not be sent.")); });
}
else {
el.style.display = "none";
var v = el.querySelector("video");
if (v) {
v.pause();
v.removeAttribute("src");
v.load();
}
el.innerHTML = "";
URL.revokeObjectURL(url);
blob = null;
}
};
},
function (blob, secs, ext) {
var uid = typeof myUserId === "function" ? myUserId() : null;
if (!uid)
return Promise.reject(new Error("Sign in first to make a link."));
var base = (typeof DW_CONFIG !== "undefined" && DW_CONFIG.supabaseUrl || "").replace(/\/+$/, "");
if (!base)
return Promise.reject(new Error("The game is offline."));
var path = uid + "/" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7) + "." + ext;
var place = "";
try {
place = (typeof pmPlaceName === "function") ? pmPlaceName() : "";
}
catch (e) { }
return freshToken().then(function (tok) {
return fetch(base + "/storage/v1/object/clips/" + path.split("/").map(encodeURIComponent).join("/"), { method: "POST",
headers: { apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + tok, "Content-Type": blob.type.split(";")[0] || "video/webm", "x-upsert": "false" }, body: blob });
}).then(function (r) {
if (!r.ok)
return r.text().then(function (t) {
throw new Error(/policy|row-level|403|401/i.test(t + r.status) ? "Links are for dreamers whose dues are paid, forty clips at a time. Save or Share still work." :
/bucket|not found|404/i.test(t + r.status) ? "Clip links open after the next server update. Save or Share still work." : /size|large|413/i.test(t + r.status) ? "That clip is too big to send (30 MB at most)." : "The clip did not go through (" + r.status + ").");
});
return cityRpc("clip_shared", { p_path: path, p_place: place, p_secs: secs, p_bytes: blob.size });
}).then(function (o) {
if (o && o.ok === false)
throw new Error(o.say || "The clip could not be kept.");
return location.origin + location.pathname.replace(/[^\/]*$/, "") + "clip.html?c=" + encodeURIComponent(path);
});
}
];
});
