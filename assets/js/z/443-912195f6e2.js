/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(443, function () {
"use strict";
return [
function () {
try {
if (typeof DRIVE !== "undefined" && DRIVE.on && typeof vehicleLeave === "function")
vehicleLeave();
}
catch (e) { }
try {
if (typeof store !== "undefined" && store.inside && typeof exitInterior === "function")
exitInterior(true);
}
catch (e) { }
try {
if (typeof beHere === "function")
beHere(0);
var t = typeof heartOf === "function" ? heartOf(0) : { x: 0, z: 0 };
if (typeof walkMode !== "undefined" && walkMode && typeof camera !== "undefined" && camera)
camera.position.set(t.x, camera.position.y, t.z + 24);
else if (typeof orb !== "undefined" && orb) {
orb.tx = t.x;
orb.tz = t.z;
if (typeof viewAt !== "undefined")
viewAt = { x: t.x, z: t.z };
}
}
catch (e) {
if (window.console)
console.warn("[city-door] home", e);
}
},
function () {
if (typeof document === "undefined")
return;
if (typeof window !== "undefined" && window.SOMNU_ACCESS === true)
return;
cdrClose();
var signed = typeof signedIn === "function" && signedIn(), st = cityPassStatus();
var price = (typeof priceLabel === "function") ? priceLabel() : "$29.99";
var esc2 = typeof esc === "function" ? esc : function (s) { return String(s); };
var bg = document.createElement("div");
bg.id = "cdr-panel";
bg.setAttribute("role", "dialog");
bg.setAttribute("aria-modal", "true");
bg.setAttribute("aria-label", "Somnucor's door");
bg.style.cssText = "position:fixed;inset:0;z-index:70;background:rgba(6,6,12,.62);display:flex;align-items:center;justify-content:center;padding:16px";
var ask;
if (!signed)
ask = "<p style='margin:10px 0 0'>Sign in or make an account first, then you can ask.</p><button class='btn' type='button' id='cdr-acc' style='margin-top:8px'>Sign in or make an account</button>";
else if (st === "asked")
ask = "<p style='margin:10px 0 0'><b>Your request is with the Keeper.</b> The door opens by itself when you are let in.</p>";
else
ask = "<p style='margin:10px 0 0'>Or ask the Keeper to let you in.</p>" +
"<input id='cdr-note' maxlength='300' placeholder='A line for the Keeper (optional)' style='width:100%;box-sizing:border-box;margin-top:6px;padding:8px;border-radius:8px;border:1px solid rgba(201,190,168,.4);background:#14131c;color:#E6E0D2'>" +
"<button class='btn' type='button' id='cdr-ask' style='margin-top:8px'>Ask the Keeper to let me in</button>";
bg.innerHTML = "<div style='width:min(440px,100%);max-height:86vh;overflow-y:auto;background:#0C0B14;border:1px solid rgba(201,190,168,.45);border-radius:12px;color:#E6E0D2;font:14px system-ui,sans-serif;padding:16px 18px;box-shadow:0 14px 50px rgba(0,0,0,.65)'>" +
"<h3 style='margin:0 0 6px;font:700 18px system-ui,sans-serif;color:#F2E6C8'>Somnucor's door is closed to you for now</h3>" +
"<p style='margin:0'>The city is for members and for dreamers the Keeper has let in. Your own dream, your journal, the dream books and the other worlds are yours as always.</p>" +
"<button class='btn primary' type='button' id='cdr-buy' style='margin-top:12px'>Become a member · " + esc2(price) + " once, for life</button>" +
ask +
"<div id='cdr-msg' style='margin-top:8px;color:#C9BEA8'></div>" +
"<div style='text-align:right;margin-top:10px'><button class='btn' type='button' id='cdr-close'>Not now</button></div></div>";
document.body.appendChild(bg);
bg.onclick = function (e) { if (e.target === bg)
cdrClose(); };
bg.onkeydown = function (e) { e.stopPropagation(); if (e.key === "Escape")
cdrClose(); };
var b;
if ((b = bg.querySelector("#cdr-close")))
b.onclick = cdrClose;
if ((b = bg.querySelector("#cdr-buy")))
b.onclick = function () { cdrClose(); if (typeof buyPanel === "function")
buyPanel("city"); };
if ((b = bg.querySelector("#cdr-acc")))
b.onclick = function () { cdrClose(); if (typeof openAccountForm === "function")
openAccountForm(); };
if ((b = bg.querySelector("#cdr-ask")))
b.onclick = function () {
var m = bg.querySelector("#cdr-msg"), n = bg.querySelector("#cdr-note");
b.disabled = true;
if (m)
m.textContent = "Asking…";
cityRpc("city_pass_ask", { p_note: n ? n.value : "" }).then(function (o) {
if (m)
m.textContent = (o && o.say) || "Asked.";
if (o && o.ok) {
CDR.asked = Date.now();
cdrKeepAsking();
if (typeof refreshAccess === "function")
refreshAccess();
}
else
b.disabled = false;
}).catch(function () { if (m)
m.textContent = "That did not go through. The server may not have the door yet."; b.disabled = false; });
};
var f = bg.querySelector("#cdr-buy");
if (f)
try {
f.focus();
}
catch (e) { }
}
];
});
