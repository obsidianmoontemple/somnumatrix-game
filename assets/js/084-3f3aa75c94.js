/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var vaultKey = null, vaultSalt = null, vaultBusy = false, lastSaved = null, SYNCKEY = "dreamwalker.sync";
function subtle() { return (typeof crypto !== "undefined" && crypto.subtle) ? crypto.subtle : null; }
function syncOn() { return cfg().sync === true; }
function b64(buf) { var b = new Uint8Array(buf), s = ""; for (var i = 0; i < b.length; i++)
s += String.fromCharCode(b[i]); return btoa(s); }
function unb64(str) { var s = atob(str), b = new Uint8Array(s.length); for (var i = 0; i < s.length; i++)
b[i] = s.charCodeAt(i); return b; }
function randBytes(n) { var b = new Uint8Array(n); crypto.getRandomValues(b); return b; }
function makeKey(phrase, salt) { return __ZC(84, 0, this, arguments, new.target); }
function lockUp(text, key) {
var iv = randBytes(12), enc = new TextEncoder();
return subtle().encrypt({ name: "AES-GCM", iv: iv }, key, enc.encode(text))
.then(function (ct) { return { cipher: b64(ct), iv: b64(iv) }; });
}
function unlock(cipher, iv, key) {
return subtle().decrypt({ name: "AES-GCM", iv: unb64(iv) }, key, unb64(cipher))
.then(function (pt) { return new TextDecoder().decode(pt); });
}
function openVault(phrase) { return __ZC(84, 1, this, arguments, new.target); }
function vaultLocked() { return !vaultKey; }
function restHeaders(tok) {
return { "Content-Type": "application/json", apikey: DW_CONFIG.supabaseKey,
Authorization: "Bearer " + tok, Prefer: "resolution=merge-duplicates,return=representation" };
}
function vaultRow() { return __ZC(84, 2, this, arguments, new.target); }
function dreamscapeText() { return __ZC(84, 3, this, arguments, new.target); }
function keepToAccount(quiet) { return __ZC(84, 4, this, arguments, new.target); }
function bringToThisDevice() { return __ZC(84, 5, this, arguments, new.target); }
function syncAfterNight() {
if (!syncOn() || !signedIn() || vaultLocked())
return;
if (typeof hasAccess === "function" && !hasAccess())
return;
keepToAccount(true).catch(function () { });
}
function syncStatus() {
var el = document.getElementById("sync-state");
if (!el)
return;
if (!signedIn()) {
el.textContent = "Sign in above to keep your dreamscape to your account.";
return;
}
var when = lastSaved || (function () { try {
return +localStorage.getItem(SYNCKEY) || 0;
}
catch (e) {
return 0;
} })();
el.innerHTML = (vaultLocked() ? "<b>Locked.</b> Enter your phrase to keep or fetch it. " : "<b>Unlocked on this device.</b> ") +
(when ? ("Last kept " + new Date(when).toLocaleString() + ".") : "Nothing kept yet.") +
((typeof hasAccess === "function" && !hasAccess()) ? " Keeping it to your account comes with SomnuMatrix; bringing down what is already kept still works." : "");
}
function initSync() {
var b;
if ((b = document.getElementById("sync-unlock")))
b.onclick = function () {
var ph = document.getElementById("sync-phrase").value;
setStatus("Working on it\u2026");
openVault(ph).then(function (res) {
document.getElementById("sync-phrase").value = "";
setStatus(res.fresh ? "<b>Vault ready.</b> Nothing kept to this account yet \u2014 press Keep it now."
: "<b>Vault open.</b> You can keep this dreamscape, or bring down the one on your account.");
syncStatus();
}).catch(function (e) { setStatus(esc(e.message)); });
};
if ((b = document.getElementById("sync-save")))
b.onclick = function () { keepToAccount(false).catch(function () { }); };
if ((b = document.getElementById("sync-fetch")))
b.onclick = function () {
if (!confirm("Bring down the dreamscape kept to your account? What is on this device will be replaced."))
return;
bringToThisDevice().catch(function (e) { setStatus(esc(e.message)); });
};
if ((b = document.getElementById("sync-on")))
b.onchange = function () {
if (b.value === "on" && typeof hasAccess === "function" && !hasAccess()) {
b.value = "off";
if (typeof offerBuy === "function")
offerBuy("vault");
return;
}
var c = cfg();
c.sync = (b.value === "on");
setCfg(c);
setStatus(c.sync ? "Your dreamscape will be kept to your account after each night."
: "Kept on this device only.");
};
var s = document.getElementById("sync-on");
if (s)
s.value = syncOn() ? "on" : "off";
syncStatus();
}
