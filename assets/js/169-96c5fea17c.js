/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var POST = { open: false, tab: "box", data: null, msg: "", to: null, found: [], round: null, cust: null, shop: null, reading: null, at: 0 };
var GAZ = { open: false, data: null, desk: null, msg: "" };
var POST_BTN = "position:fixed;bottom:calc(96px + env(safe-area-inset-bottom,0px));z-index:45;background:rgba(10,12,18,.92);color:var(--bone);border:1px solid #6A9AC0;border-radius:3px;padding:9px 13px;font:13px var(--sans);cursor:pointer";
var POST_BOX = "position:fixed;right:12px;bottom:calc(140px + env(safe-area-inset-bottom,0px));z-index:47;width:min(460px,calc(100vw - 24px));max-height:min(74vh,660px);overflow:auto;background:rgba(8,10,16,.97);border:1px solid #6A9AC0;border-radius:4px;padding:12px 14px;font:13px var(--sans);color:var(--bone);line-height:1.45";
function postErr(e) { var m = String((e && e.message) || e || ""); return /function|404|PGRST|does not exist/i.test(m) ? "The post opens soon." : m; }
function postShow() { return typeof signedIn === "function" && signedIn() && typeof careInCity === "function" && (careInCity() || (store.inside && typeof INT !== "undefined" && INT && INT.spec && INT.spec.city)); }
function postButtons() {
var show = postShow();
[["post-btn", "Post", "82px", function () { POST.open = !POST.open; if (POST.open) {
GAZ.open = false;
gazPaint();
postLoad();
} postPaint(); }],
["gaz-btn", "Gazette", "162px", function () { GAZ.open = !GAZ.open; if (GAZ.open) {
POST.open = false;
postPaint();
gazLoad();
} gazPaint(); }]].forEach(function (b) {
var el = document.getElementById(b[0]);
if (!el) {
if (!show || !document.body)
return;
el = document.createElement("button");
el.id = b[0];
el.type = "button";
el.textContent = b[1];
el.style.cssText = POST_BTN + ";right:" + b[2];
el.onclick = b[3];
document.body.appendChild(el);
}
el.style.display = show ? "block" : "none";
});
if (!show) {
if (POST.open) {
POST.open = false;
postPaint();
}
if (GAZ.open) {
GAZ.open = false;
gazPaint();
}
}
var pb = document.getElementById("post-btn");
if (pb && POST.data && POST.data.ok)
pb.textContent = POST.data.unread ? "Post (" + POST.data.unread + ")" : "Post";
}
function postLoad() {
if (!(typeof signedIn === "function" && signedIn()))
return Promise.resolve();
POST.at = Date.now();
return cityRpc("my_mail", {}).then(function (d) { POST.data = d; postPaint(); mbFlags(); postButtons(); })
.catch(function (e) { POST.data = { ok: false, say: postErr(e) }; postPaint(); });
}
function pDim(t) { return '<span style="color:var(--dim)">' + t + '</span>'; }
function pRow(l, r) { return '<div style="display:flex;justify-content:space-between;gap:6px;align-items:center;margin-top:4px"><span>' + l + '</span><span style="white-space:nowrap">' + (r || "") + '</span></div>'; }
function postPaint() {
var el = document.getElementById("post-panel");
if (!el) {
if (!document.body)
return;
el = document.createElement("div");
el.id = "post-panel";
el.style.cssText = POST_BOX;
document.body.appendChild(el);
el.addEventListener("click", postClick);
el.addEventListener("keydown", function (e) { e.stopPropagation(); if (e.key === "Enter" && e.target.id === "post-find")
postFind(); });
}
if (!POST.open) {
el.style.display = "none";
return;
}
el.style.display = "block";
var d = POST.data, tabs = [["box", "Your mailbox"], ["write", "Write a letter"]];
if (d && d.ok && (d.shops || []).length)
tabs.push(["cust", "Your customers"]);
tabs.push(["round", "Carrier's round"]);
var h = '<div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:14px">The Somnucor post</b><button class="btn" data-p="x">Close</button></div>' +
'<div style="display:flex;gap:4px;margin:8px 0;flex-wrap:wrap">' + tabs.map(function (t) { return '<button class="btn" data-p="tab:' + t[0] + '" style="' + (POST.tab === t[0] ? 'border-color:#C9A040;color:#F4E6C0' : 'opacity:.8') + '">' + t[1] + '</button>'; }).join("") + '</div>' +
(POST.msg ? '<div style="margin:4px 0 6px"><b>' + esc(POST.msg) + '</b></div>' : '');
if (!d)
h += pDim("Opening the box…");
else if (!d.ok)
h += pDim(esc(d.say || ""));
else if (POST.tab === "box")
h += postBoxHtml(d);
else if (POST.tab === "write")
h += postWriteHtml(d);
else if (POST.tab === "cust")
h += postCustHtml(d);
else
h += postRoundHtml();
el.innerHTML = h;
}
function postBoxHtml(d) { return __ZC(169, 0, this, arguments, new.target); }
function postWriteHtml(d) { return __ZC(169, 1, this, arguments, new.target); }
function postCustHtml(d) { return __ZC(169, 2, this, arguments, new.target); }
function postRoundHtml() { return __ZC(169, 3, this, arguments, new.target); }
function postFind() {
var q = (document.getElementById("post-find") || {}).value || "";
cityRpc("mail_find", { p_q: q.trim() }).then(function (r) { POST.found = r || []; if (!POST.found.length)
POST.msg = "Nobody by that name.";
else
POST.msg = ""; postPaint(); })
.catch(function (e) { POST.msg = postErr(e); postPaint(); });
}
function postCust() {
if (!POST.shop)
return;
cityRpc("shop_customers", { p_shop: POST.shop }).then(function (r) { POST.cust = r || []; postPaint(); }).catch(function () { POST.cust = []; postPaint(); });
}
function postSay(p, after) {
POST.msg = "…";
postPaint();
return p.then(function (o) { POST.msg = (o && o.say) || (o && o.ok ? "Done." : "That did not go through."); if (after)
after(o); postPaint(); return o; })
.catch(function (e) { POST.msg = postErr(e); postPaint(); });
}
function postSend(toUser, toShop, subject, body, fromShop) {
return postSay(cityRpc("mail_send", { p_to_user: toUser || null, p_to_shop: toShop || null, p_subject: subject || "", p_body: body || "", p_from_shop: fromShop || null }), function (o) { if (o && o.ok) {
POST.to = null;
POST.found = [];
postLoad();
} });
}
function postClick(e) { return __ZC(169, 4, this, arguments, new.target); }
(function () {
if (typeof document === "undefined")
return;
document.addEventListener("change", function (e) { if (e.target && e.target.id === "post-shop") {
POST.shop = +e.target.value;
POST.cust = null;
postPaint();
} });
})();
var MB = { g: null, at: { x: 1e9, z: 1e9 }, boxes: [], near: null, busy: false, mine: null };
function mbMesh() { return __ZC(169, 5, this, arguments, new.target); }
function mbBuild() {
if (typeof THREE === "undefined" || !scene)
return;
var r = typeof somnucorRealm === "function" ? somnucorRealm() : null;
if (!r || (store.here || 0) !== r.id || store.inside || !walkMode) {
if (MB.g)
MB.g.visible = false;
return;
}
var P = camera.position;
if (MB.g && MB.g.parent === scene && Math.hypot(P.x - MB.at.x, P.z - MB.at.z) < 20) {
MB.g.visible = true;
return;
}
if (!MB.g) {
MB.g = new THREE.Group();
MB.g.name = "mailboxes";
}
if (MB.g.parent !== scene)
scene.add(MB.g);
while (MB.g.children.length)
MB.g.remove(MB.g.children[0]);
MB.boxes = [];
MB.at = { x: P.x, z: P.z };
MB.g.visible = true;
store.objects.forEach(function (o) {
if ((o.realm || 0) !== r.id || o.filler || !o.city)
return;
if (Math.abs(o.x - P.x) > 90 || Math.abs(o.z - P.z) > 90)
return;
if (typeof enterable !== "function" || !enterable(o))
return;
var d = null;
try {
d = doorWorld(o);
}
catch (e) {
return;
}
var side = { x: d.out.z, z: -d.out.x }, x = d.x + d.out.x * 1.6 + side.x * 1.9, z = d.z + d.out.z * 1.6 + side.z * 1.9;
var m = mbMesh();
m.position.set(x, (typeof terrainY === "function") ? terrainY(x, z) : 0, z);
m.rotation.y = Math.atan2(d.out.x, d.out.z);
m.userData.box = { x: x, z: z, name: (typeof placeName === "function") ? placeName(o) : "", work: o.workplace || null };
MB.g.add(m);
MB.boxes.push(m);
});
mbFlags();
}
function mbFlags() {
var d = POST.data, a = d && d.ok && d.address, n = d && d.ok ? d.unread : 0, best = null, bd = 1e9;
MB.boxes.forEach(function (m) {
m.userData.flag.rotation.x = Math.PI / 2;
if (a && a.x != null) {
var dd = Math.hypot(m.position.x - a.x, m.position.z - a.z);
if (dd < bd) {
bd = dd;
best = m;
}
}
});
if (best && bd < 30 && n > 0)
best.userData.flag.rotation.x = 0;
}
function mbPromptEl() {
var el = document.getElementById("mb-prompt");
if (el || !document.body)
return el;
el = document.createElement("button");
el.id = "mb-prompt";
el.type = "button";
el.style.cssText = "position:fixed;left:50%;bottom:calc(140px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:44;display:none;background:rgba(10,12,18,.92);color:var(--bone);border:1px solid #6A9AC0;border-radius:3px;padding:8px 14px;font:13px var(--sans);cursor:pointer";
el.textContent = "Open the mailbox";
el.onclick = function () { mbOpen(); };
document.body.appendChild(el);
return el;
}
function mbNear() {
var el = mbPromptEl();
if (!el)
return;
var P = camera.position, near = null, nd = 3.2;
if (MB.g && MB.g.visible)
MB.boxes.forEach(function (m) { var d = Math.hypot(m.position.x - P.x, m.position.z - P.z); if (d < nd) {
nd = d;
near = m;
} });
MB.near = near;
el.style.display = near && postShow() ? "block" : "none";
}
function mbOpen() { return __ZC(169, 6, this, arguments, new.target); }
function gazLoad() { return __ZC(169, 7, this, arguments, new.target); }
function gazDate(t) { try {
return new Date(t).toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}
catch (e) {
return "";
} }
function gazPaint() { return __ZC(169, 8, this, arguments, new.target); }
function gazClick(e) { return __ZC(169, 9, this, arguments, new.target); }
addEventListener("keydown", function (e) { if (e.key === "Escape" && GAZ.open) {
GAZ.open = false;
gazPaint();
} });
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick, acc = 0, acc2 = 0;
transitTick = function (dt) {
tt.apply(this, arguments);
if ((acc += dt) > 0.5) {
acc = 0;
try {
mbBuild();
mbNear();
}
catch (e) { }
}
if ((acc2 += dt) > 1) {
acc2 = 0;
try {
postButtons();
if (postShow() && Date.now() - POST.at > 60000)
postLoad();
}
catch (e) { }
}
};
})();
