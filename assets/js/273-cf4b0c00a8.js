/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var AH = { board: {}, boardAt: 0, boardBusy: false, v74: null, spec: {}, door: {}, place: null, inside: false,
open: false, data: null, busy: false, msg: "", said: {}, lastTold: null, tick: 0 };
if (typeof PS_KEEP !== "undefined")
PS_KEEP["ah-btn"] = 1;
function ahAsk(name, body) {
if (typeof signedIn === "function" && signedIn() && typeof cityRpc === "function")
return cityRpc(name, body || {});
if (typeof restRpc === "function" && typeof DW_CONFIG !== "undefined" && DW_CONFIG.supabaseUrl)
return restRpc(name, body || {}).then(function (o) { if (o == null)
throw new Error("no answer"); return o; });
return Promise.reject(new Error("offline"));
}
function ahMissing(e) { return /openings_(here|board)|PGRST202|404|Could not find the function/i.test(String(e && e.message || e)); }
function ahIsKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function ahMember() { return ahIsKeeper() || (typeof hasAccess === "function" ? hasAccess() : true); }
function ahBoardFromJobs(rows) {
var b = {};
(rows || []).forEach(function (r) {
if (!r || !r.workplace || r.roams || r.open === false)
return;
var left = (+r.positions || 0) - (+r.taken || 0);
if (left > 0)
b[r.workplace] = (b[r.workplace] || 0) + left;
});
return b;
}
function ahLoadBoard(force) {
if (AH.boardBusy || (!force && Date.now() - AH.boardAt < 60000))
return;
AH.boardBusy = true;
AH.boardAt = Date.now();
var p = AH.v74 === false ? Promise.reject(new Error("openings_board")) : ahAsk("openings_board", {});
p.then(function (o) { AH.v74 = true; AH.board = (o && typeof o === "object" && !Array.isArray(o)) ? o : {}; })
.catch(function (e) {
if (AH.v74 !== false && !ahMissing(e)) {
AH.boardAt = Date.now() - 45000;
return;
}
AH.v74 = false;
return ahAsk("job_board", {}).then(function (rows) { AH.board = ahBoardFromJobs(rows); }).catch(function () { });
})
.then(function () { AH.boardBusy = false; });
}
function ahPlaceName(key) {
var m = /^lot:(\d+)$/.exec(key || "");
if (!m)
return key;
var id = +m[1], rec = (typeof cityLots !== "undefined" && cityLots || []).filter(function (l) { return l.lot_id === id; })[0];
return (rec && (rec.business || rec.name)) || "this business";
}
function ahSpecOf(key) { return __ZC(273, 0, this, arguments, new.target); }
function ahDoorOf(key) {
var s = ahSpecOf(key);
if (!s)
return null;
if (AH.door[key])
return AH.door[key];
var d = null;
try {
d = typeof doorWorld === "function" ? doorWorld(s) : null;
}
catch (e) { }
if (!d)
d = { x: s.x, z: s.z };
AH.door[key] = d;
return d;
}
function ahWhere() {
if (typeof walkMode === "undefined" || !walkMode)
return null;
if (store.inside)
return (typeof INT !== "undefined" && INT && INT.wpKey) ? { key: INT.wpKey, inside: true } : null;
if (typeof inCityNow !== "function" || !inCityNow())
return null;
var P = camera.position, best = null, bd = 9;
Object.keys(AH.board).forEach(function (k) {
if (!(+AH.board[k] > 0))
return;
var d = ahDoorOf(k);
if (!d)
return;
var dist = Math.hypot(P.x - d.x, P.z - d.z);
if (dist < bd) {
bd = dist;
best = k;
}
});
return best ? { key: best, inside: false } : null;
}
function ahBtn() {
var el = document.getElementById("ah-btn");
if (el || !document.body)
return el;
el = document.createElement("button");
el.id = "ah-btn";
el.type = "button";
el.style.cssText = "position:fixed;z-index:44;display:none;left:calc(12px + env(safe-area-inset-left,0px));bottom:calc(284px + env(safe-area-inset-bottom,0px));" +
"background:rgba(10,12,18,.92);color:#EDE8F8;border:1px solid #C9A868;border-radius:18px;padding:7px 14px;font:600 13px system-ui,sans-serif;max-width:70vw;" +
"white-space:nowrap;overflow:hidden;text-overflow:ellipsis";
el.onclick = function () { if (AH.place)
ahOpen(AH.place); };
document.body.appendChild(el);
return el;
}
function ahBusyElsewhere() {
if (typeof DRIVE !== "undefined" && DRIVE && DRIVE.on)
return true;
if (typeof talkOpen !== "undefined" && talkOpen)
return true;
if (typeof deskOpen !== "undefined" && deskOpen)
return true;
var kd = document.getElementById("keeper-desk");
if (kd && kd.style.display === "block")
return true;
return false;
}
function ahPaint() {
var el = ahBtn();
if (!el)
return;
var w = ahWhere(), n = w ? (+AH.board[w.key] || 0) : 0;
AH.place = w && n > 0 ? w.key : null;
AH.inside = !!(w && w.inside);
if (!AH.place)
AH.lastTold = null;
var show = !!(AH.place && !AH.open && !ahBusyElsewhere());
el.style.display = show ? "block" : "none";
if (!show)
return;
var t = "📋 Hiring here · " + n + (n === 1 ? " opening" : " openings");
if (el.textContent !== t)
el.textContent = t;
var tell = AH.place + (AH.inside ? "|in" : "|door");
if (AH.lastTold !== tell) {
AH.lastTold = tell;
if (typeof setStatus === "function")
setStatus("<b>" + esc(ahPlaceName(AH.place)) + " is hiring.</b> Tap <b>📋 Hiring here</b> to see the openings and apply on the spot.");
}
}
function ahFromJobBoard(key) { return __ZC(273, 1, this, arguments, new.target); }
function ahLoad(key) { return __ZC(273, 2, this, arguments, new.target); }
function ahOpen(key) {
AH.open = true;
AH.place = key;
AH.data = null;
AH.msg = "";
ahPanel();
ahLoad(key);
ahPaint();
}
function ahClose() {
AH.open = false;
var p = document.getElementById("ah-panel");
if (p)
p.style.display = "none";
ahPaint();
}
function ahPanel() { return __ZC(273, 3, this, arguments, new.target); }
function ahDim(t) { return '<span style="color:var(--dim,#9AA3B5)">' + t + '</span>'; }
function ahPay(j) {
var k = j.pay_kind;
if (k === "salary")
return (+j.rate || 0).toLocaleString() + " gold a week, paid every two weeks";
if (k === "commission" || k === "tips" || k === "share")
return "paid in " + (k === "share" ? "a share" : k);
return (+j.rate || 0).toLocaleString() + " gold an hour, paid weekly";
}
function ahPanelPaint() { return __ZC(273, 4, this, arguments, new.target); }
function ahApply(jobId, said) { return __ZC(273, 5, this, arguments, new.target); }
function ahClick(e) { return __ZC(273, 6, this, arguments, new.target); }
function ahWalkedOff() {
if (!AH.open)
return;
var w = ahWhere();
if (!w || w.key !== AH.place)
ahClose();
}
if (typeof document !== "undefined") {
document.addEventListener("keydown", function (e) { if (AH.open && e.key === "Escape")
ahClose(); });
setInterval(function () {
if (typeof walkMode === "undefined" || typeof store === "undefined" || typeof camera === "undefined")
return;
try {
var city = (typeof inCityNow === "function" && inCityNow()) || (store.inside && typeof INT !== "undefined" && INT && INT.wpKey);
if (city)
ahLoadBoard(false);
ahPaint();
ahWalkedOff();
}
catch (e) { }
}, 500);
}
