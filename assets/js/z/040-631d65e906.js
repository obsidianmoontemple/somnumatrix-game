/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(40, function () {
"use strict";
return [
function (key, name) {
var word = (typeof tlInfo === "function" && DEITY[key]) ? tlInfo(DEITY[key]).light : "candle";
if (typeof signedIn !== "function" || !signedIn()) {
var n0 = candleKeep(key);
setStatus("<b>A " + word + " lit at the house of " + esc(name) + ".</b> Sign in, and others will see it burning too. (" + n0 + " from you, so far.)");
return n0;
}
cityRpc("light_candle", { p_deity: key }).then(function (o) {
if (!o || !o.ok) {
setStatus(esc((o && o.say) || "The " + word + " would not light."));
return;
}
var mine = candleKeep(key);
if (typeof TL !== "undefined") {
TL.board[key] = o.burning;
TL.boardLoaded = true;
if (typeof tlCandlesShow === "function")
tlCandlesShow();
}
if (typeof tlSound === "function")
tlSound("bell");
setStatus("<b>A " + word + " lit at the house of " + esc(name) + ".</b> " + o.burning + " burning here now, for everyone who comes · " + mine + " from you, so far.");
}).catch(function (e) {
var n1 = candleKeep(key);
setStatus(/function|schema|404/i.test(e.message) ? ("<b>A " + word + " lit at the house of " + esc(name) + ".</b> Only you can see it until the temples update is run.") : esc(e.message));
return n1;
});
},
function (key, name, howMuch) {
if (typeof signedIn !== "function" || !signedIn()) {
setStatus("An offering is left by account, so it can be remembered.");
return;
}
cityRpc("move_offering", { p_deity: key, p_gold: howMuch }).then(function (o) {
setStatus(o === "ok" ? ("<b>Left at the bowl of " + esc(name) + ".</b> Nothing is asked in return.")
: esc(String(o)));
if (typeof refreshStanding === "function")
refreshStanding();
}).catch(function () { setStatus("The bowl is not ready yet."); });
},
function () {
var r = templeRowRealm() || buildTempleRow();
if (!r)
return;
if (typeof beHere === "function")
beHere(r.id);
if (typeof atlRefresh === "function")
atlRefresh();
var T = (typeof atlRing === "function") ? atlRing("temples") : null, a = 0.19, rr = T ? T.S + ATL_STAIR_RUN + 14 : 700;
var gx = (ATLC ? ATLC.x : 0) + Math.cos(a) * rr, gz = (ATLC ? ATLC.z : 0) + Math.sin(a) * rr;
if (walkMode)
camera.position.set(gx, 1.72, gz);
else if (typeof visitRealm === "function")
visitRealm(r.id);
setStatus("<b>Temple Row.</b> A house for every power the Atlas knows. Light a candle, or leave what you wish.");
},
function (key, name) {
return cityRpc("temple_standing", { p_deity: key }).then(function (s) {
if (!s || !s.offerings)
return setStatus("Nothing left at " + esc(name) + "'s house yet.");
setStatus("<b>" + esc(name) + "</b> — " + s.offerings + " offering" + (s.offerings === 1 ? "" : "s") +
" left over time, " + gold(s.gold || 0) + " in all" +
(s.waiting ? (", " + gold(s.waiting) + " still waiting in the bowl") : "") + ".");
}).catch(function (e) { setStatus(esc(e.message)); });
},
function (key) {
var d = DEITY[key];
if (!d || typeof document === "undefined")
return;
var old = document.getElementById("tl-offer");
if (old)
old.remove();
var I = (typeof tlInfo === "function") ? tlInfo(d) : { gift: ["a flower"] }, inside = !!(typeof INT !== "undefined" && INT && INT.temple);
var bg = document.createElement("div");
bg.id = "tl-offer";
bg.style.cssText = "position:fixed;inset:0;z-index:9000;background:rgba(5,6,10,.6);display:grid;place-items:center;padding:16px";
bg.innerHTML = "<div style='width:min(400px,100%);background:rgba(10,12,18,.97);border:1px solid var(--gold,#C9A868);border-radius:4px;padding:16px 18px;font:14px var(--sans);color:var(--bone);line-height:1.5'>" +
"<div style='font-family:var(--serif);font-size:19px'>An offering to " + esc(d.name) + "</div>" +
"<div style='color:var(--dim);margin:4px 0 8px'>What is traditionally given" + (inside ? ", set on the table before the image:" : " (go inside to set it before the image):") + "</div>" +
"<div style='display:flex;flex-wrap:wrap;gap:6px'>" + I.gift.map(function (g, i) { return "<button class='btn' data-gift='" + i + "'>" + esc(g) + "</button>"; }).join("") + "</div>" +
"<div style='color:var(--dim);margin:12px 0 6px'>And, if you wish, gold for the bowl. Half keeps the city's houses; half goes to those who tend them.</div>" +
"<div style='display:flex;flex-wrap:wrap;gap:6px;align-items:center'>" + [1, 5, 10, 25].map(function (n) { return "<button class='btn' data-gold='" + n + "'>" + n + "</button>"; }).join("") +
"<input id='tl-offer-n' inputmode='numeric' placeholder='other' style='width:80px;background:#07080B;border:1px solid var(--line);color:var(--bone);padding:6px'> <button class='btn' id='tl-offer-go'>Leave it</button></div>" +
"<div style='text-align:right;margin-top:12px'><button class='btn' id='tl-offer-x'>Close</button></div></div>";
document.body.appendChild(bg);
function close() { bg.remove(); }
bg.onclick = function (e) { if (e.target === bg)
close(); };
bg.querySelector("#tl-offer-x").onclick = close;
Array.prototype.forEach.call(bg.querySelectorAll("[data-gift]"), function (b) {
b.onclick = function () {
var g = I.gift[+b.getAttribute("data-gift")];
if (inside && typeof tlGift === "function")
tlGift(g);
else
setStatus("<b>" + esc(g.charAt(0).toUpperCase() + g.slice(1)) + "</b> — left at the house of " + esc(d.name) + ". Nothing is asked in return.");
close();
};
});
Array.prototype.forEach.call(bg.querySelectorAll("[data-gold]"), function (b) { b.onclick = function () { bg.querySelector("#tl-offer-n").value = b.getAttribute("data-gold"); }; });
var inp = bg.querySelector("#tl-offer-n");
inp.onkeydown = function (e) { e.stopPropagation(); if (e.key === "Enter")
bg.querySelector("#tl-offer-go").click(); if (e.key === "Escape")
close(); };
bg.querySelector("#tl-offer-go").onclick = function () {
var n = Math.floor(+(inp.value || 0));
if (!(n > 0)) {
inp.focus();
return;
}
close();
leaveOffering(key, d.name, n);
};
}
];
});
