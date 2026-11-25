/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(85, function () {
"use strict";
return [
function (phrase, salt) {
var S = subtle();
if (!S)
return Promise.reject(new Error("this browser cannot lock things"));
var enc = new TextEncoder();
return S.importKey("raw", enc.encode(phrase), { name: "PBKDF2" }, false, ["deriveKey"])
.then(function (base) {
return S.deriveKey({ name: "PBKDF2", salt: salt, iterations: 210000, hash: "SHA-256" }, base, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
});
},
function (phrase) {
if (!phrase || phrase.length < 8)
return Promise.reject(new Error("Use at least eight characters."));
return vaultRow().then(function (row) {
vaultSalt = row && row.salt ? unb64(row.salt) : randBytes(16);
return makeKey(phrase, vaultSalt).then(function (k) {
vaultKey = k;
if (!row)
return { fresh: true };
return unlock(row.cipher, row.iv, k).then(function () { return { fresh: false, row: row }; })
.catch(function () { vaultKey = null; throw new Error("That phrase doesn't open this vault."); });
});
});
},
function () {
return freshToken().then(function (tok) {
if (!tok)
return null;
return fetch(DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/rest/v1/vault?select=*", { headers: restHeaders(tok) })
.then(function (r) { return r.ok ? r.json() : []; })
.then(function (rows) { return (rows && rows[0]) || null; });
});
},
function () {
var keep = {};
["objects", "characters", "sessions", "transcript", "dreamer", "passages", "realms", "hoods", "grid", "townGrid",
"here", "session", "blocks", "streets", "land", "research", "insideSlots", "lastId", "lastAny", "lastLot"].forEach(function (k) {
if (store[k] !== undefined)
keep[k] = store[k];
});
return JSON.stringify({ v: 1, at: Date.now(), store: keep });
},
function (quiet) {
if (!signedIn())
return Promise.reject(new Error("Sign in first."));
if (typeof hasAccess === "function" && !hasAccess()) {
if (!quiet && typeof offerBuy === "function")
offerBuy("vault");
return Promise.reject(new Error("Keeping your dreamscape to your account comes with SomnuMatrix."));
}
if (vaultLocked())
return Promise.reject(new Error("Unlock the vault with your phrase first."));
if (vaultBusy)
return Promise.resolve(null);
vaultBusy = true;
var text = dreamscapeText();
return lockUp(text, vaultKey).then(function (sealed) {
return freshToken().then(function (tok) {
return fetch(DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/rest/v1/vault", {
method: "POST", headers: restHeaders(tok),
body: JSON.stringify({ user_id: session.user.id, cipher: sealed.cipher, iv: sealed.iv,
salt: b64(vaultSalt), bytes: text.length, updated_at: new Date().toISOString(), version: 1 })
});
});
}).then(function (r) {
vaultBusy = false;
if (!r.ok)
throw new Error("It didn't go up. Try again in a moment.");
lastSaved = Date.now();
try {
localStorage.setItem(SYNCKEY, String(lastSaved));
}
catch (e) { }
if (!quiet)
setStatus("<b>Kept to your account.</b> Locked on this device before it left it.");
syncStatus();
return true;
}).catch(function (e) { vaultBusy = false; if (!quiet)
setStatus(esc(e.message)); throw e; });
},
function () {
if (!signedIn())
return Promise.reject(new Error("Sign in first."));
if (vaultLocked())
return Promise.reject(new Error("Unlock the vault with your phrase first."));
return vaultRow().then(function (row) {
if (!row)
throw new Error("There is nothing kept to this account yet.");
return unlock(row.cipher, row.iv, vaultKey).then(function (text) {
var got = JSON.parse(text);
if (!got || !got.store)
throw new Error("What came down could not be read.");
Object.keys(got.store).forEach(function (k) { store[k] = got.store[k]; });
save();
if (typeof rebuildAll === "function")
rebuildAll();
else if (typeof rebuildWorld === "function")
rebuildWorld();
setStatus("<b>Your dreamscape is on this device.</b> " + (store.objects || []).length + " things standing.");
syncStatus();
return true;
});
});
}
];
});
