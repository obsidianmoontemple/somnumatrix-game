/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var ACCESSKEY = "somnu.access", BUYPENDKEY = "somnu.buyPending", ACCESS = null, accessAsking = null, buyOffered = {};
function accessRead() {
if (ACCESS)
return ACCESS;
try {
ACCESS = JSON.parse(localStorage.getItem(ACCESSKEY) || "null");
}
catch (e) {
ACCESS = null;
}
return ACCESS;
}
function accessKeep(a) {
ACCESS = a;
try {
a ? localStorage.setItem(ACCESSKEY, JSON.stringify(a)) : localStorage.removeItem(ACCESSKEY);
}
catch (e) { }
}
function accessMe() { return (typeof signedIn === "function" && signedIn() && session.user && session.user.id) || null; }
function hasAccess() {
if (typeof window !== "undefined" && typeof window.SOMNU_ACCESS === "boolean")
return window.SOMNU_ACCESS;
var me = accessMe(), a = accessRead();
if (!me || !a || a.user_id !== me)
return false;
if (a.keeper)
return true;
if (!a.paid)
return false;
if (a.until && !(new Date(a.until).getTime() > Date.now()))
return false;
return true;
}
function accessBought() { var a = accessRead(); return !!(a && a.user_id === accessMe() && a.bought); }
function refreshAccess() {
if (!accessMe() || !(typeof cloudOn === "function" && cloudOn()) || typeof fetch !== "function") {
paintBuyState();
return Promise.resolve(hasAccess());
}
if (accessAsking)
return accessAsking;
var was = hasAccess();
accessAsking = freshToken().then(function (tok) {
if (!tok)
return null;
return fetch(DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/rest/v1/rpc/my_access", { method: "POST",
headers: { apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + tok, "Content-Type": "application/json" }, body: "{}" })
.then(function (r) { return r.ok ? r.json() : null; });
}).then(function (j) {
var me = accessMe();
if (j && j.signed_in === true && me && j.user_id === me)
accessKeep({ user_id: me, paid: !!j.paid, plan: j.plan || "free", until: j.until || null, keeper: !!j.keeper, bought: !!j.bought, city: (typeof j.city === "boolean") ? j.city : undefined, cityPass: j.city_pass || null, at: Date.now() });
}).catch(function () { }).then(function () {
accessAsking = null;
var now = hasAccess();
if (now !== was)
accessChanged(now);
paintBuyState();
return now;
});
return accessAsking;
}
function accessDenied() {
var a = accessRead();
if (a && a.paid && !a.keeper) {
a.paid = false;
accessKeep(a);
paintBuyState();
}
refreshAccess();
}
function accessChanged(now) { return __ZC(129, 0, this, arguments, new.target); }
function cloudSetting(k) { return (typeof DW_CLOUD !== "undefined" && DW_CLOUD.config) ? DW_CLOUD.config[k] : undefined; }
function priceLabel() { var p = cloudSetting("price_label"); return (typeof p === "string" && p.trim()) ? p.trim() : "$29.99"; }
function checkoutBase() {
var u = cloudSetting("checkout_url");
return (typeof u === "string" && /^https:\/\/[^\s"'<>]+$/.test(u.trim())) ? u.trim() : null;
}
function checkoutUrl() { return __ZC(129, 1, this, arguments, new.target); }
function startCheckout() {
var url = checkoutUrl();
if (!url)
return false;
try {
localStorage.setItem(BUYPENDKEY, String(Date.now()));
}
catch (e) { }
window.open(url, "_blank", "noopener");
return true;
}
var buyPollAt = 0;
function buyPending() { var t = 0; try {
t = +localStorage.getItem(BUYPENDKEY) || 0;
}
catch (e) { } return t && Date.now() - t < 2 * 3600 * 1000; }
function pollAccess() {
if (!buyPending() || hasAccess() || Date.now() - buyPollAt < 2000)
return;
buyPollAt = Date.now();
[0, 4000, 10000, 20000, 40000].forEach(function (d) {
setTimeout(function () { if (buyPending() && !hasAccess())
refreshAccess(); }, d);
});
}
var BUY_WHY = {
ai: "Having the AI read your dream and build the rest comes with SomnuMatrix.",
talk: "Talking with a waking figure through the AI comes with SomnuMatrix.",
city: "Joining Somnucor, the shared city, comes with SomnuMatrix.",
vault: "Keeping your dreamscape to your account comes with SomnuMatrix.",
door: "A door of your own in the Hall of Doors comes with SomnuMatrix."
};
var buyPanelWhy = null;
function buyClose() { var p = document.getElementById("buy-panel"); if (p)
p.remove(); }
function buyPanel(why) { return __ZC(129, 2, this, arguments, new.target); }
function offerBuy(why, once) {
if (once && buyOffered[why])
return false;
buyOffered[why] = 1;
buyPanel(why);
return true;
}
function aiNotBought(why) {
if (typeof setStatus === "function")
setStatus("<i>Built from the catalogue; buy SomnuMatrix to have the AI build the rest.</i> " +
"<a href='#' style='color:var(--moon)' onclick='buyPanel(\"ai\");return false'>Buy SomnuMatrix</a>");
offerBuy(why || "ai", true);
}
function paintBuyState() {
if (typeof document === "undefined")
return;
var el = document.getElementById("buy-state");
if (!el) {
var after = document.getElementById("acc-msg");
if (!after || !after.parentNode)
return;
el = document.createElement("div");
el.id = "buy-state";
el.className = "hint";
el.style.cssText = "font-size:13px;color:var(--bone);line-height:1.6;margin:10px 0 0";
after.parentNode.insertBefore(el, after.nextSibling);
}
var price = esc(priceLabel()), a = accessRead();
if (!accessMe())
el.innerHTML = "SomnuMatrix is " + price + " once, for life. <a href='#' style='color:var(--moon)' onclick='buyPanel();return false'>What buying opens</a>";
else if (hasAccess() && accessBought())
el.innerHTML = "<b>Bought: thank you.</b> SomnuMatrix is yours for life.";
else if (hasAccess() && a && a.keeper)
el.innerHTML = "<b>Everything is open</b> to you as a keeper.";
else if (hasAccess())
el.innerHTML = "<b>Everything is open</b> on your " + esc((a && a.plan) || "member") + " plan" + (a && a.until ? (" until " + esc(new Date(a.until).toLocaleDateString())) : "") + ".";
else
el.innerHTML = "<span style='color:var(--dim)'>Free: your dreams from the catalogue, the journal here and the dream books.</span> " +
"<button class='btn' type='button' onclick='buyPanel()' style='margin-top:6px'>Buy SomnuMatrix · " + price + "</button>";
}
if (typeof takeDoor === "function") {
var takeDoorUnbought = takeDoor;
takeDoor = function (name, line, colour) {
if (!hasAccess()) {
offerBuy("door");
return Promise.reject(new Error("A door of your own comes with SomnuMatrix."));
}
return takeDoorUnbought(name, line, colour);
};
}
function initBuy() {
paintBuyState();
if (typeof addEventListener === "function") {
addEventListener("focus", pollAccess);
document.addEventListener("visibilitychange", function () { if (!document.hidden)
pollAccess(); });
}
setTimeout(function () { refreshAccess().then(function (ok) { if (!ok)
pollAccess(); }); }, 1200);
}
if (typeof document !== "undefined") {
if (document.readyState === "loading")
document.addEventListener("DOMContentLoaded", initBuy);
else
initBuy();
}
