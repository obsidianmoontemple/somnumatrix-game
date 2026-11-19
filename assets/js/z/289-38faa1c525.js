/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(289, function () {
return [
function (str) {
if (typeof crypto !== "undefined" && crypto.subtle && typeof TextEncoder !== "undefined") {
return crypto.subtle.digest("SHA-256", new TextEncoder().encode(str)).then(function (b) {
return Array.prototype.map.call(new Uint8Array(b), function (x) { return ("0" + x.toString(16)).slice(-2); }).join("");
});
}
return Promise.resolve(flkSha256Plain(str));
},
function (ascii) {
function r(v, n) { return (v >>> n) | (v << (32 - n)); }
var K = [], H = [], p = 0, i, j, c;
for (c = 2; p < 64; c++) {
for (i = 2; i * i <= c; i++) {
if (c % i === 0)
break;
}
if (i * i > c) {
if (p < 8)
H[p] = (Math.pow(c, 1 / 2) * 4294967296) | 0;
K[p++] = (Math.pow(c, 1 / 3) * 4294967296) | 0;
}
}
var s = unescape(encodeURIComponent(ascii)), words = [], bl = s.length * 8;
s += "\x80";
while (s.length % 64 !== 56)
s += "\x00";
for (i = 0; i < s.length; i++) {
j = s.charCodeAt(i);
words[i >> 2] |= j << ((3 - i) % 4) * 8;
}
words[words.length] = (bl / 4294967296) | 0;
words[words.length] = bl | 0;
for (j = 0; j < words.length;) {
var w = words.slice(j, j += 16), o = H.slice(0);
for (i = 0; i < 64; i++) {
var w15 = w[i - 15], w2 = w[i - 2], a = H[0], e = H[4];
var t1 = H[7] + (r(e, 6) ^ r(e, 11) ^ r(e, 25)) + ((e & H[5]) ^ (~e & H[6])) + K[i] + (w[i] = (i < 16) ? w[i] : (w[i - 16] + (r(w15, 7) ^ r(w15, 18) ^ (w15 >>> 3)) + w[i - 7] + (r(w2, 17) ^ r(w2, 19) ^ (w2 >>> 10))) | 0);
var t2 = (r(a, 2) ^ r(a, 13) ^ r(a, 22)) + ((a & H[1]) ^ (a & H[2]) ^ (H[1] & H[2]));
H = [(t1 + t2) | 0].concat(H);
H[4] = (H[4] + t1) | 0;
H.length = 8;
}
for (i = 0; i < 8; i++)
H[i] = (H[i] + o[i]) | 0;
}
var out = "";
for (i = 0; i < 8; i++) {
for (j = 3; j + 1; j--) {
var b = (H[i] >> (j * 8)) & 255;
out += ((b < 16) ? "0" : "") + b.toString(16);
}
}
return out;
},
function (name, data) {
var body = (data !== undefined) ? data : (FLK_TEXT[name] ? FLK_SAY : { ok: false, say: FLK_SAY, error: FLK_SAY, family_lock: true });
try {
return Promise.resolve(new Response(JSON.stringify(body), { status: 200, headers: { "Content-Type": "application/json" } }));
}
catch (e) {
return Promise.resolve({ ok: true, status: 200, json: function () { return Promise.resolve(body); }, text: function () { return Promise.resolve(JSON.stringify(body)); }, clone: function () { return this; } });
}
},
function (name, init) {
if (FLK_OFF[name])
return flkAnswer(name);
if (name === "voice_who")
return flkAnswer(name, []);
var b = flkBody(init);
if (name === "live_send") {
if (String(b.p_kind || "").toLowerCase() === "rtc")
return flkAnswer(name);
if (!b.p_to && FLK.server !== true)
return flkAnswer(name);
}
if (FLK_TO[name]) {
var to = b[FLK_TO[name]];
if (to && !flkAllowed(to))
return flkAnswer(name);
if (!to && name === "mail_send" && b.p_to_shop != null)
return flkAnswer(name);
}
if (FLK_SAYING[name] && FLK.server !== true)
return flkAnswer(name, FLK_TEXT[name] ? "Only you can hear that: the teacher or parent lock is on." : undefined);
return null;
},
function (pin, code, name) {
if (!flkPinOk(pin))
return Promise.reject(new Error("A PIN is 4 to 8 numbers."));
code = String(code || "").trim().toUpperCase();
return flkPinHash(pin).then(function (h) {
if (flkSignedIn() && typeof cloudOn === "function" && cloudOn()) {
return flkRpc("lock_now", { p_pin_hash: h, p_code: code || null, p_name: name || null }).then(function (r) {
if (!r || !r.ok)
throw new Error((r && r.say) || "The lock could not be set just now.");
FLK.st = { on: true, code: r.code, name: r.name, pinHash: h, boundTo: flkMe(), at: Date.now() };
flkSave();
FLK.syncAt = 0;
return flkSync(true);
}, function (e) {
if (FLK.server === false || /offline|signed out/.test(e.message)) {
FLK.st = { on: true, code: code || null, name: name || null, pinHash: h, at: Date.now() };
flkSave();
FLK.allowed = {};
return;
}
throw e;
});
}
FLK.st = { on: true, code: code || null, name: name || null, pinHash: h, at: Date.now() };
flkSave();
FLK.allowed = {};
});
},
function (pin) {
if (flkWaiting())
return Promise.reject(new Error("Too many wrong PINs. Wait ten minutes and try again."));
return flkPinHash(pin).then(function (h) {
var localOk = !!FLK.st.pinHash && FLK.st.pinHash === h;
if (FLK.st.pinHash && !localOk) {
flkTried();
throw new Error("That is not the PIN.");
}
var off = function () { FLK.st = { on: false }; flkSave(); FLK.allowed = {}; try {
localStorage.removeItem(FLK.tryKey);
}
catch (e) { } flkRowApply(); };
if (flkSignedIn() && FLK.server !== false) {
return flkRpc("lock_off", { p_pin_hash: h }).then(function (r) {
if (r && r.ok)
return off();
if (localOk)
return off();
flkTried();
throw new Error((r && r.say) || "That is not the PIN.");
}, function (e) {
if (localOk)
return off();
throw new Error("The lock is kept by your account. Connect and sign in to turn it off.");
});
}
if (localOk)
return off();
throw new Error("The lock is kept by your account. Sign in to turn it off.");
});
},
function (ev) {
var t = ev.target && ev.target.closest ? ev.target.closest("[data-flk]") : null;
if (!t)
return;
var a = t.getAttribute("data-flk");
if (a === "lock" || a === "class" || a === "join" || a === "off" || a === "row") {
FLK_FORM = a;
flkSay("");
flkPaint();
var f = document.querySelector("#flk-card input");
if (f)
f.focus();
return;
}
if (a === "cancel") {
FLK_FORM = null;
flkSay("");
flkPaint();
return;
}
var pin = flkVal("flk-pin");
if ((a === "lock-go" || a === "class-go") && pin !== flkVal("flk-pin2")) {
flkSay("The two PINs are not the same.", true);
return;
}
if ((a === "lock-go" || a === "class-go" || a === "join-go") && !flkPinOk(pin)) {
flkSay("A PIN is 4 to 8 numbers.", true);
return;
}
var done = function (msg) { FLK_FORM = null; flkPaint(); flkSay(msg); };
var fail = function (e) { flkSay((e && e.message) || "That did not work just now.", true); };
if (a === "lock-go") {
flkSay("Locking…");
var typed = flkVal("flk-code");
flkLock(pin, typed, flkVal("flk-name")).then(function () {
done("Locked" + (FLK.st.name ? " into " + FLK.st.name : "") + "." + (FLK.st.code && !typed ? " Lock a brother's or sister's device with code " + FLK.st.code + " and the same PIN to let them play together." : ""));
}, fail);
}
else if (a === "row-go") {
var to = FLK.st.temples === false;
flkSay("Checking…");
flkSetRow(to, pin).then(function () { done(to ? "Temple Row is back in the city." : "Temple Row is put away. It slides back into the falls."); }, fail);
}
else if (a === "row-class") {
var on = t.getAttribute("data-on") === "1";
flkRpc("lock_set_temples", { p_code: t.getAttribute("data-code"), p_on: on }).then(function (r) { if (!r || !r.ok)
throw new Error((r && r.say) || "That did not work just now."); FLK.syncAt = 0; return flkSync(true); })
.then(function () { flkSay(on ? "Temple Row comes back for that class or family." : "Temple Row is put away for that class or family. Their devices follow within a minute."); }).catch(fail);
}
else if (a === "off-go") {
flkSay("Checking…");
flkUnlock(pin).then(function () { done("The lock is off."); }, fail);
}
else if (a === "class-go") {
flkSay("Starting…");
flkPinHash(pin).then(function (h) { return flkRpc("lock_circle_new", { p_name: flkVal("flk-name"), p_pin_hash: h }); }).then(function (r) {
if (!r || !r.ok)
throw new Error((r && r.say) || "It could not be started just now.");
FLK.syncAt = 0;
return flkSync(true).then(function () { done("Started. The code is " + r.code + ". On each child's device: Settings, Lock this device, this code and your PIN."); });
}).catch(function (e) { fail(FLK.server === false ? new Error("Classes and families open once the city's server has its newest update.") : e); });
}
else if (a === "join-go") {
flkPinHash(pin).then(function (h) { return flkRpc("lock_join_open", { p_code: flkVal("flk-code").toUpperCase(), p_pin_hash: h }); }).then(function (r) {
if (!r || !r.ok)
throw new Error((r && r.say) || "That did not work just now.");
FLK.syncAt = 0;
return flkSync(true).then(function () { done("Joined " + r.name + ". Its players can see and reach you."); });
}).catch(fail);
}
else if (a === "release" || a === "close" || a === "leave") {
var code = t.getAttribute("data-code"), id = t.getAttribute("data-id") || null;
if (a === "close" && !confirm("Close " + code + "? Everyone in it is unlocked."))
return;
var call = a === "leave" ? flkRpc("lock_leave_open", { p_code: code }) : flkRpc("lock_release", { p_code: code, p_user: a === "close" ? null : id });
call.then(function (r) { if (r && r.ok === false)
throw new Error(r.say); FLK.syncAt = 0; return flkSync(true); }).then(function () { flkSay("Done."); }).catch(fail);
}
},
function () {
var r = flkRowCity();
if (!r || typeof ATLC === "undefined" || !ATLC)
return 0;
var gone = {}, n = 0;
for (var i = store.objects.length - 1; i >= 0; i--) {
var o = store.objects[i];
if ((o.realm || 0) !== r.id || !flkRowIn(o.x, o.z))
continue;
if (typeof meshes !== "undefined" && meshes[o.id]) {
scene.remove(meshes[o.id]);
delete meshes[o.id];
}
o._gone = true;
store.objects.splice(i, 1);
FLK_ROW.objs.push(o);
gone[o.id] = 1;
n++;
}
for (var c = store.characters.length - 1; c >= 0; c--) {
var ch = store.characters[c];
if (ch && ch.objId && gone[ch.objId]) {
store.characters.splice(c, 1);
FLK_ROW.chars.push(ch);
}
}
var W = store.workplaceAt || {};
Object.keys(W).forEach(function (k) { var w = W[k]; if (w && flkRowIn(w.x, w.z)) {
FLK_ROW.wp[k] = w;
delete W[k];
} });
return n;
},
function () {
var r = flkRowCity();
FLK_ROW.objs.reverse().forEach(function (o) {
if (r && (o.realm || 0) !== r.id)
return;
o._gone = false;
store.objects.push(o);
if (typeof atlMeshQueue !== "undefined" && !(typeof meshes !== "undefined" && meshes[o.id]))
atlMeshQueue.push(o);
});
FLK_ROW.chars.reverse().forEach(function (ch) { store.characters.push(ch); });
if (store.workplaceAt)
Object.keys(FLK_ROW.wp).forEach(function (k) { store.workplaceAt[k] = FLK_ROW.wp[k]; });
FLK_ROW.objs = [];
FLK_ROW.chars = [];
FLK_ROW.wp = {};
if (typeof atlSortQueue === "function")
atlSortQueue();
},
function (parts, down, done) {
var D = 36, T = 4500, t0 = performance.now();
parts.forEach(function (m) { if (m.userData.flkY === undefined)
m.userData.flkY = m.position.y; if (!down)
m.position.y = m.userData.flkY - D; });
(function step() {
var t = Math.min(1, (performance.now() - t0) / T), e = 0.5 - 0.5 * Math.cos(Math.PI * t), k = down ? e : 1 - e;
parts.forEach(function (m) { m.position.y = m.userData.flkY - D * k; });
if (t < 1)
requestAnimationFrame(step);
else {
parts.forEach(function (m) { delete m.userData.flkY; });
done();
}
})();
},
function () {
var out = [];
if (typeof atlGroup !== "undefined" && atlGroup)
atlGroup.children.forEach(function (m) { if (m.userData.ring === "temples")
out.push(m); });
var r = flkRowCity();
if (r && typeof meshes !== "undefined")
store.objects.forEach(function (o) { if ((o.realm || 0) === r.id && meshes[o.id] && flkRowIn(o.x, o.z))
out.push(meshes[o.id]); });
return out;
},
function () {
var want = flkRowWanted();
if (FLK_ROW.busy)
return;
if (want === FLK_ROW.hidden) {
FLK_ROW.pending = false;
return;
}
if (!flkRowStanding()) {
flkRowRings(want);
return;
}
if (flkRowPlayerOn()) {
if (!FLK_ROW.pending && typeof setStatus === "function")
setStatus(want ? "🔒 Temple Row will slide back into the falls as soon as you step off it." : "🔒 Temple Row will rise again as soon as you step off the stairway.");
FLK_ROW.pending = true;
return;
}
FLK_ROW.pending = false;
var here = flkRowHere();
if (want) {
var off = function () { flkRowSweep(); flkRowRings(true); flkRowGround(); FLK_ROW.busy = false; };
if (!here) {
off();
return;
}
FLK_ROW.busy = true;
if (typeof setStatus === "function")
setStatus("🔒 Temple Row slides back into the falls.");
flkRowSlide(flkRowParts(), true, off);
}
else {
flkRowRings(false);
flkRowGround();
if (!here) {
flkRowRestore();
return;
}
FLK_ROW.busy = true;
if (typeof setStatus === "function")
setStatus("🔒 Temple Row rises from the falls.");
flkRowSlide(flkRowParts(), false, function () { flkRowRestore(); FLK_ROW.busy = false; });
}
},
function (on, pin) {
var apply = function () { FLK.st.temples = !!on; flkSave(); flkRowApply(); };
if (!flkOn())
return Promise.reject(new Error("Lock the device first."));
if (flkWaiting())
return Promise.reject(new Error("Too many wrong PINs. Wait ten minutes and try again."));
return flkPinHash(pin).then(function (h) {
var localOk = !!FLK.st.pinHash && FLK.st.pinHash === h;
if (FLK.st.pinHash && !localOk) {
flkTried();
throw new Error("That is not the PIN.");
}
if (flkSignedIn() && FLK.server === true && FLK.st.code && FLK.st.boundTo === flkMe()) {
return flkRpc("lock_set_temples", { p_code: FLK.st.code, p_on: !!on, p_pin_hash: h }).then(function (r) {
if (!r || !r.ok) {
if (!localOk)
flkTried();
throw new Error((r && r.say) || "That did not work just now.");
}
apply();
});
}
if (localOk)
return apply();
throw new Error("Sign in to change this.");
});
}
];
});
