/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(271, function () {
"use strict";
return [
function (o) {
if (!o || typeof o !== "object")
return 1;
var W = 0, D = 0;
if (o.x1 !== undefined && o.x0 !== undefined) {
W = Math.abs(o.x1 - o.x0);
D = Math.abs((o.z1 || 0) - (o.z0 || 0));
}
else if (o.hw !== undefined) {
W = o.hw * 2;
D = (o.hd || 0) * 2;
}
else if (o.W !== undefined) {
W = o.W;
D = o.D || 0;
}
else if (typeof o.w === "number") {
W = o.w;
D = +o.d || 0;
}
return (W >= 28 && D >= 28) ? 2 : 1;
},
function (h) {
if (typeof setStatus === "function")
setStatus(h);
var el = document.getElementById("cfx-nurse-say");
if (!el) {
el = document.createElement("div");
el.id = "cfx-nurse-say";
el.setAttribute("role", "status");
el.style.cssText = "position:fixed;left:50%;transform:translateX(-50%);top:calc(104px + env(safe-area-inset-top,0px));z-index:45;width:max-content;max-width:min(520px,calc(100vw - 32px));" +
"background:rgba(10,12,18,.92);color:#EDE8F8;border:1px solid #8FCB8A;border-radius:12px;padding:9px 14px;font:14px/1.45 system-ui,sans-serif;text-align:center;pointer-events:none;opacity:0;transition:opacity .5s ease";
document.body.appendChild(el);
}
el.innerHTML = "🩺 " + h;
el.style.opacity = "1";
clearTimeout(CFX.nurseSayT);
CFX.nurseSayT = setTimeout(function () { el.style.opacity = "0"; }, Math.max(7000, Math.min(16000, String(h).length * 70)));
},
function () {
if (CFX.nurseBusy)
return;
if (!(typeof signedIn === "function" && signedIn())) {
cfxNurseSay("Sign in, and the duty nurse will see you.");
return;
}
CFX.nurseBusy = true;
cfxNurseSay("The duty nurse is coming over…");
if (typeof presenceSendNow === "function")
presenceSendNow();
setTimeout(function () {
cityRpc("hospital_see_nurse", {}).then(function (o) {
CFX.nurseBusy = false;
if (!o)
return;
cfxNurseSay((o.ok ? "<b>The duty nurse.</b> " : "") + esc(o.say || ""));
if (o.ok && typeof harmApply === "function" && o.hp != null)
try {
harmApply({ hp: o.hp, state: o.state, recovers_at: o.recovers_at, events: [] });
}
catch (e) { }
if (o.cured && typeof NEEDS !== "undefined")
NEEDS.sick = null;
}).catch(function (e) {
CFX.nurseBusy = false;
cfxNurseSay(rpcMissing(e) ? "The duty nurse can treat you soon. Until then you mend by yourself, and the Apothecary sells salves." : esc((e && e.message) || String(e)));
});
}, 400);
},
function () {
var g = new THREE.Group();
try {
var spec = { id: "__heph_forge", archetype: "deity", deity: "hephaestus", attrs: {}, nights: [], city: true, solid: false, detail: 3, name: "Hephaestus", label: "Hephaestus" };
if (typeof deityLook === "function" && typeof DEITY !== "undefined" && DEITY.hephaestus)
deityLook(spec, DEITY.hephaestus);
var f = (typeof buildDeity === "function") ? buildDeity(spec, 1) : buildFigure(spec, 1);
f.scale.multiplyScalar(1.25);
g.add(f);
var tag = makeTag("Hephaestus", false);
tag.position.y = 3.35;
g.add(tag);
g.traverse(function (m) { m.raycast = function () { }; });
}
catch (e) {
if (window.console)
console.warn("[hephaestus]", e);
}
g.userData.heph = 1;
return g;
},
function () {
if (typeof openTalk !== "function")
return;
var key = "wtalk:hephaestus-forge", c = null, P = camera.position;
(store.characters || []).forEach(function (x) { if (x.wKey === key)
c = x; });
if (!c) {
c = { id: (typeof uid === "function" ? uid() : "heph" + Date.now()), wKey: key, archetype: "deity", deity: "hephaestus", city: true, name: "Hephaestus", aka: ["hephaestus", "hephaistos"],
details: [CFX_HEPH], sessions: [store.session], awake: true, log: [{ who: "them", text: "Mind the lava, friend. Few find their way down to my forge. What brings you to the fire?" }],
x: P.x, z: P.z, primary: true, src: { name: "stated" }, role: null, shift: null, routine: null, home: null, work: null, anchor: { x: P.x, z: P.z }, born: "", doing: "at his forge", visible: false };
if (store.characters)
store.characters.push(c);
}
c.x = P.x;
c.z = P.z;
c.visible = false;
openTalk(c);
},
function (force) {
if (CFX.wmBusy || (!force && Date.now() - CFX.wmAt < 20000))
return;
CFX.wmBusy = true;
CFX.wmAt = Date.now();
cityRpc("my_work_mail", {}).then(function (o) { CFX.wm = o && o.ok ? o : null; }).catch(function () { CFX.wm = null; })
.then(function () { CFX.wmBusy = false; if (typeof POST !== "undefined" && POST.open && POST.tab === "work")
postPaint(); if (typeof mbFlags === "function")
mbFlags(); });
},
function () {
var W = cfxWorkBox(), h = "";
if (!CFX.wm)
cfxWorkMailLoad(false);
var r = POST.wreading;
if (r) {
return '<div style="margin-top:8px;border:1px solid rgba(255,255,255,.12);padding:10px;border-radius:3px;background:rgba(244,230,192,.04)">' +
'<div>' + pDim("To") + ' <b>' + esc(r.to || "your work") + '</b> · ' + pDim("From") + ' <b>' + esc(r.from) + '</b></div><div style="margin:2px 0 8px"><b>' + esc(r.subject || "(no subject)") + '</b></div>' +
'<div style="white-space:pre-wrap">' + esc(r.body) + '</div></div>' +
'<div style="margin-top:6px"><button class="btn" data-p="wback">Back to work mail</button></div>';
}
h += pDim("The mail that comes to the places you work. You can also open it at the mailbox by the door.");
var P = W.places || [];
if (!P.length)
return h + '<div style="margin-top:8px">' + pDim("No mail has come to your work yet.") + '</div>';
h += '<div style="margin-top:6px">' + P.map(function (p) { return '<b>' + esc(p.name) + '</b> ' + pDim((+p.unread ? p.unread + " new" : "nothing new") + (p.coming ? " · " + p.coming + " on the way" : "")); }).join("<br>") + '</div>';
var box = W.box || [];
if (!box.length)
return h + '<div style="margin-top:8px">' + pDim("Nothing in the box.") + '</div>';
box.forEach(function (m) {
h += pRow((m.read ? '' : '<b style="color:#E8C870">● </b>') + '<b>' + esc(m.from || "") + '</b> ' + esc(m.subject || "(no subject)") + ' ' + pDim("to " + esc(m.to || "")), '<button class="btn" data-p="wread:' + m.id + '">' + (m.read ? "Read again" : "Open") + '</button>');
});
return h;
}
];
});
