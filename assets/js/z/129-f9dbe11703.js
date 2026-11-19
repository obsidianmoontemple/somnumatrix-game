/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(129, function () {
"use strict";
return [
function (now) {
if (now) {
try {
localStorage.removeItem(BUYPENDKEY);
}
catch (e) { }
if (typeof setStatus === "function")
setStatus("<b>Bought: thank you.</b> SomnuMatrix is yours for life — the AI, Somnucor, your vault and a door of your own are open.");
}
if (document.getElementById("buy-panel"))
buyPanel(buyPanelWhy);
if (typeof paintJoin === "function")
paintJoin();
if (typeof syncStatus === "function")
syncStatus();
},
function () {
var base = checkoutBase(), me = accessMe();
if (!base || !me)
return null;
var hash = "", h = base.indexOf("#");
if (h > -1) {
hash = base.slice(h);
base = base.slice(0, h);
}
var em = (typeof myEmail === "function") ? myEmail() : "";
return base + (base.indexOf("?") > -1 ? "&" : "?") + "client_reference_id=" + encodeURIComponent(me) +
(em ? "&prefilled_email=" + encodeURIComponent(em) : "") + hash;
},
function (why) {
if (typeof document === "undefined")
return;
buyPanelWhy = why || null;
buyClose();
var me = accessMe(), paid = hasAccess(), price = priceLabel(), base = checkoutBase(), help = cloudSetting("support_email");
help = (typeof help === "string" && /^[^@\s<>"']+@[^@\s<>"']+$/.test(help.trim())) ? help.trim() : null;
var bg = document.createElement("div");
bg.id = "buy-panel";
bg.style.cssText = "position:fixed;inset:0;z-index:9000;background:rgba(5,6,10,.66);display:grid;place-items:center;padding:16px";
var act;
if (paid) {
act = "<div style='font-family:var(--serif);font-size:17px;margin:14px 0 4px'>" + (accessBought() ? "Bought: thank you." : "Everything is open to you.") + "</div>" +
"<div style='color:var(--dim)'>It is all yours, for life.</div>";
}
else if (!me) {
act = "<div style='font-family:var(--serif);font-size:17px;margin:14px 0 4px'>Make an account first</div>" +
"<div style='color:var(--dim);margin-bottom:10px'>SomnuMatrix is bought to an account, so it follows you to every device. Make one (or sign in), then come back here.</div>" +
"<button class='btn on' id='buy-acc'>Make an account</button>";
}
else if (!base) {
act = "<div style='font-family:var(--serif);font-size:17px;margin:14px 0 4px'>Buying isn't open yet</div>" +
"<div style='color:var(--dim)'>Everything free still works. When buying opens, this is where it will be.</div>";
}
else {
act = "<div style='display:flex;flex-wrap:wrap;gap:8px;margin-top:14px'>" +
"<button class='btn on' id='buy-go'>Buy SomnuMatrix · " + esc(price) + "</button>" +
"<button class='btn' id='buy-done'>I've paid</button></div>" +
"<div id='buy-msg' style='color:var(--dim);margin-top:8px;min-height:20px'>" + (buyPending() ? "If you have paid, press I've paid." : "Payment opens in a new tab, on the payment provider's own page.") + "</div>";
}
bg.innerHTML = "<div role='dialog' aria-label='Buy SomnuMatrix' style='width:min(440px,100%);max-height:90vh;overflow-y:auto;background:rgba(10,12,18,.97);border:1px solid var(--line);border-radius:4px;padding:18px 20px;font:14px/1.55 var(--sans);color:var(--bone)'>" +
(why && BUY_WHY[why] && !paid ? "<div style='color:var(--ember);margin-bottom:8px'>" + BUY_WHY[why] + "</div>" : "") +
"<div style='font-family:var(--serif);font-size:21px'>SomnuMatrix, for life</div>" +
"<div style='color:var(--dim);margin:2px 0 10px'>" + esc(price) + ", once. Never a subscription.</div>" +
"<ul style='margin:0 0 10px;padding-left:18px'>" +
"<li>The AI reads your dreams and builds whatever the catalogue lacks</li>" +
"<li>Figures you wake answer you through the AI</li>" +
"<li>Somnucor: the shared city, its work, wages and Temple Row</li>" +
"<li>Your dreamscape kept to your account, locked with your own phrase</li>" +
"<li>A door of your own in the Hall of Doors</li></ul>" +
"<div style='color:var(--dim);font-size:13px'>Free, always: telling and walking your dreams with the built-in catalogue, your journal on this device, and the dream books.</div>" +
act +
(help ? "<div style='color:var(--dim);font-size:12.5px;margin-top:10px'>Questions about buying: <a style='color:var(--moon)' href='mailto:" + esc(help) + "'>" + esc(help) + "</a></div>" : "") +
"<div style='text-align:right;margin-top:14px'><button class='btn' id='buy-x'>Close</button></div></div>";
document.body.appendChild(bg);
bg.onclick = function (e) { if (e.target === bg)
buyClose(); };
bg.onkeydown = function (e) { e.stopPropagation(); if (e.key === "Escape")
buyClose(); };
bg.querySelector("#buy-x").onclick = buyClose;
var b;
if ((b = bg.querySelector("#buy-acc")))
b.onclick = function () { buyClose(); if (typeof openAccountForm === "function")
openAccountForm(); };
if ((b = bg.querySelector("#buy-go")))
b.onclick = function () {
var m = bg.querySelector("#buy-msg");
if (startCheckout())
m.textContent = "The payment page has opened in a new tab. When you have paid, come back and press I've paid.";
else
m.textContent = "Buying isn't open yet.";
};
if ((b = bg.querySelector("#buy-done")))
b.onclick = function () {
var m = bg.querySelector("#buy-msg");
m.textContent = "Looking…";
refreshAccess().then(function (ok) {
if (ok)
return;
m.textContent = "Not through yet. It can take a minute after paying — this keeps looking, or press I've paid again shortly.";
pollAccess();
});
};
var f = bg.querySelector("#buy-go") || bg.querySelector("#buy-acc") || bg.querySelector("#buy-x");
if (f)
f.focus();
}
];
});
