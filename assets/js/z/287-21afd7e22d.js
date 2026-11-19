/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(287, function () {
"use strict";
return [
function () {
var el = document.getElementById("gi-box");
if (!GI.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "gi-box";
el.addEventListener("keydown", function (e) { e.stopPropagation(); if (e.key === "Enter" && e.target && e.target.id === "gi-code")
giRedeem(); });
el.addEventListener("keyup", function (e) { e.stopPropagation(); });
el.addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-gi]") : null;
if (!t)
return;
var w = t.getAttribute("data-gi");
if (w === "close")
return giClose();
if (w === "later") {
giClose();
return;
}
if (w === "forget") {
GI.code = "";
giKeep("");
giClose();
return;
}
if (w === "signin") {
giClose();
if (typeof openAccountForm === "function")
openAccountForm();
return;
}
if (w === "open")
return giRedeem();
if (w === "way")
return giWayToHall();
if (w === "pluscopy")
return giPlusCopy();
if (w === "plusshare")
return giPlusShare();
if (w === "pack") {
giClose();
if (typeof bkpOpen === "function")
bkpOpen();
return;
}
});
document.body.appendChild(el);
}
el.style.display = "block";
var h = '<div class="gi-in">' + giMotes() + '<div class="gi-sub">SomnuMatrix · Dream Walker’s Atlas</div><h3>The Golden Invitation</h3>';
var M = GI.mine;
if (M && M.no && M.plusOf) {
h += '<div class="gi-no">No. ' + M.no + ' +1<small>THE COMPANION’S PLACE</small></div>' +
'<p style="text-align:center">' + (M.fresh ? '<b>Welcome, honoured companion.</b> ' : '') + 'You are the +1 of Golden Invitation No. ' + M.no + ', one of only twenty, handed out by the Keeper’s own hand. ' +
'Your membership dues are waived for good, so any open post in the city is yours to take, first come, first served. ' +
'Your keepsake is in your backpack for good. It can never be sold, traded or given away.</p>' + giGatherHtml(M.gathering) +
(M.at ? '<p style="text-align:center;color:#BFA062;font-size:12px">Opened ' + new Date(M.at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) + '</p>' : '') +
'<div class="gi-row"><button class="btn gi-gold" data-gi="pack">See it in your backpack</button><button class="btn" data-gi="close">Enter the dream</button></div>';
}
else if (M && M.no) {
h += '<div class="gi-no">No. ' + M.no + '<small>OF TWENTY</small></div>' +
'<p style="text-align:center">' + (M.fresh ? '<b>Welcome, honoured guest.</b> ' : '') + 'You hold one of only twenty Golden Invitations, handed out by the Keeper’s own hand. ' +
'Your membership dues are waived for good, so any open post in the city is yours to take, first come, first served. ' +
'Its keepsake is in your backpack for good. It can never be sold, traded or given away.</p>' + giPlusHtml(M.plus) + giGatherHtml(M.gathering) +
(M.at ? '<p style="text-align:center;color:#BFA062;font-size:12px">Opened ' + new Date(M.at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) + '</p>' : '') +
'<div class="gi-row"><button class="btn gi-gold" data-gi="pack">See it in your backpack</button><button class="btn" data-gi="close">Enter the dream</button></div>';
}
else if (!(typeof signedIn === "function" && signedIn())) {
h += '<p style="text-align:center">' + (GI.code ? 'Your invitation <b style="letter-spacing:.08em">' + esc(giShow(GI.code)) + '</b> is waiting. ' : '') +
'Sign in first, so the invitation can be kept against your account. ' + (GI.code ? 'It will open the moment you are signed in.' : '') + '</p>' +
'<div class="gi-row"><button class="btn gi-gold" data-gi="signin">Sign in</button><button class="btn" data-gi="later">Later</button></div>';
}
else {
h += '<p style="text-align:center">Only twenty were ever made. Type the code printed on yours to open it.</p>' +
'<input id="gi-code" autocomplete="off" autocapitalize="characters" spellcheck="false" maxlength="20" placeholder="XXXX-XXXX-XXXX" value="' + esc(giShow(GI.code)) + '">' +
'<div class="gi-say">' + (GI.busy ? '<span style="color:#BFA062">Opening…</span>' : esc(GI.say || "")) + '</div>' +
'<div class="gi-row"><button class="btn gi-gold" data-gi="open">Open my invitation</button><button class="btn" data-gi="' + (GI.code ? 'forget' : 'close') + '">' + (GI.code ? 'Not now' : 'Close') + '</button></div>';
}
el.innerHTML = h + '</div>';
},
function (p) {
if (!p)
return "";
var box = '<div style="margin:12px 0 4px;padding:10px 12px;border:1px solid rgba(217,180,90,.45);border-radius:8px;background:rgba(217,180,90,.08);text-align:center">' +
'<div style="font:600 15px var(--serif,Georgia);color:#E8C977">🎟️ Your +1</div>';
if (p.used)
return box + '<div style="font-size:13px;margin-top:4px">Your companion has opened it' + (p.name ? ': <b>' + esc(p.name) + '</b>' : '') + '. They share your welcome: dues waived, and a place beside you at the Golden Gathering.</div></div>';
if (!p.code)
return "";
return box + '<div style="font-size:13px;margin-top:3px">Your invitation brings one companion. Send them this code or the link; they open it the same way you did, once, on their own account. ' +
'They get the same welcome: dues waived for good, and a place beside you at the Golden Gathering.</div>' +
'<div style="margin:8px auto 2px;display:inline-block;padding:6px 12px;border:1px solid #8C6A26;border-radius:6px;background:#120C07;font:700 18px/1.2 ui-monospace,Menlo,monospace;letter-spacing:.12em;color:#F1E3BE;user-select:all">' + esc(giShow(p.code)) + '</div>' +
'<div class="gi-row" style="margin-top:8px"><button class="btn gi-gold" data-gi="pluscopy">Copy the link</button>' + (navigator.share ? '<button class="btn" data-gi="plusshare">Send it</button>' : '') + '</div>' +
'<div id="gi-plus-say" style="font-size:12px;color:#BFA062;min-height:16px;margin-top:4px"></div></div>';
},
function () {
var p = GI.mine && GI.mine.plus;
if (!p || !p.code)
return;
var link = giPlusLink(p.code), done = function () { giPlusSay("Link copied. Paste it into a message to your companion."); };
try {
if (navigator.clipboard && navigator.clipboard.writeText) {
navigator.clipboard.writeText(link).then(done, function () { giPlusSay(link); });
return;
}
}
catch (e) { }
giPlusSay(link);
},
function (g) {
return '<div style="margin:12px 0 4px;padding:10px 12px;border:1px solid rgba(217,180,90,.45);border-radius:8px;background:rgba(217,180,90,.08);text-align:center">' +
'<div style="font:600 15px var(--serif,Georgia);color:#E8C977">🎉 The Golden Gathering</div>' +
'<div style="font-size:13px;margin-top:3px">You are invited to a special gathering in <b>The Gilded Hall</b> on Jubilee, the Party Planet.</div>' +
'<div style="font-size:13px;margin-top:5px;color:#F1E3BE"><b>' + (g && g.at ? esc(giWhen(g.at)) : "The Keeper will announce the day") + '</b></div>' +
(g && g.note ? '<div style="font-size:12px;margin-top:4px;color:#BFA062">' + esc(g.note) + '</div>' : '') +
'<div style="font-size:12px;margin-top:6px;color:#D8C79A;line-height:1.5">The Hall stands behind the gold gates at the south end of Jubilee Boulevard, and its doors open only for the twenty guests and their companions. ' +
'To get there, take the free Party Line shuttle from Launch Pad 1 at the Space Corp Spaceport.</div>' +
'<div style="margin-top:8px"><button class="btn gi-gold" data-gi="way">Show me the way</button></div></div>';
},
function () {
giClose();
if (typeof WLD !== "undefined" && WLD.on === "party" && typeof ppShowWay === "function") {
GI.toHall = false;
ppShowWay("hall");
return;
}
if (typeof WLD !== "undefined" && WLD.on) {
GI.toHall = true;
if (typeof setStatus === "function")
setStatus("<b>The Gilded Hall</b> is on Jubilee, the Party Planet. Head back to Somnucor and take the Party Line shuttle from Launch Pad 1 at the Space Corp Spaceport.");
return;
}
GI.toHall = true;
if (typeof showTheWay === "function" && store.workplaceAt && store.workplaceAt["The Space Corp Spaceport"]) {
showTheWay("The Space Corp Spaceport");
if (typeof setStatus === "function")
setStatus("<b>The Space Corp Spaceport</b>: follow the pointer, then board the Party Line at Launch Pad 1. On Jubilee an arrow will lead you to the Gilded Hall.");
}
else if (typeof setStatus === "function")
setStatus("Take the Party Line shuttle from Launch Pad 1 at the Space Corp Spaceport. On Jubilee an arrow will lead you to the Gilded Hall.");
},
function () {
if (GI.busy)
return;
var f = document.getElementById("gi-code");
if (f)
GI.code = giNorm(f.value);
if (GI.code.length < 8) {
GI.say = "Type the whole code from your invitation.";
return giPaint();
}
if (!(typeof signedIn === "function" && signedIn())) {
giKeep(GI.code);
return giPaint();
}
GI.busy = true;
GI.say = "";
giPaint();
var dev = typeof deviceId === "function" ? deviceId(true) : null, kind = typeof platformWord === "function" ? platformWord() : null;
try {
if (typeof renderer !== "undefined" && renderer && renderer.xr && renderer.xr.isPresenting)
kind = "headset";
}
catch (e) { }
cityRpc("invite_redeem", { p_code: GI.code, p_device: dev, p_kind: kind }).then(function (o) {
GI.busy = false;
if (o && o.ok && o.no) {
GI.mine = { no: o.no, at: o.at, fresh: !o.already, plusOf: o.plus ? o.no : null };
GI.code = "";
giKeep("");
giLoadMine().then(function () { if (GI.open)
giPaint(); });
if (typeof refreshAccess === "function")
try {
refreshAccess();
}
catch (e) { }
if (typeof setStatus === "function")
setStatus("<b>" + esc(o.say || "Welcome.") + "</b>");
if (typeof bkpLoad === "function" && typeof BKP !== "undefined" && BKP.open)
bkpLoad();
if (typeof loadThings === "function")
loadThings();
}
else {
GI.say = (o && o.say) || "That did not go through. Try again in a moment.";
if (o && o.why !== "sign_in")
giKeep("");
}
giPaint();
}).catch(function (e) {
GI.busy = false;
var m = String((e && e.message) || e);
GI.say = /invite_redeem|PGRST202|Could not find/i.test(m) ? "The invitations open soon." : "That did not go through. Try again in a moment.";
giPaint();
});
},
function (r) {
var p = r.plus;
if (!p)
return '<span style="color:var(--dim)">' + (r.redeemed ? 'needs the latest server update' : 'comes when it is opened') + '</span>';
if (p.redeemed)
return '✅ <b>' + esc(p.name || p.email || "a companion") + '</b>' + (p.name && p.email ? '<br><span style="color:var(--dim);font-size:12px">' + esc(p.email) + '</span>' : '') +
'<br><span style="color:var(--dim);font-size:12px">' + new Date(p.at).toLocaleString() + (p.kind ? ' · on a ' + esc(p.kind) : '') + '</span>';
return '<span style="font-family:ui-monospace,Menlo,monospace;letter-spacing:.06em">' + esc(giShow(p.code)) + '</span><br><span style="color:var(--dim);font-size:12px">not used yet</span>';
},
function (pane) {
if (!(typeof amKeeper === "function" && amKeeper())) {
pane.textContent = "Only the Keeper keeps this list.";
return;
}
pane.innerHTML = "Looking…";
giLoadMine().then(function () { return cityRpc("keeper_invitations"); }).then(function (rows) {
rows = Array.isArray(rows) ? rows : [];
var used = rows.filter(function (r) { return r.redeemed; }).length, given = rows.filter(function (r) { return r.given_to; }).length;
var td = 'style="padding:6px;border-bottom:1px solid var(--line);vertical-align:top"';
var G = GI.gather || {}, loc = "";
try {
if (G.at) {
var d = new Date(G.at);
loc = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}
}
catch (e) { }
var gath = '<div style="margin:0 0 14px;padding:10px 12px;border:1px solid var(--line);border-radius:6px">' +
'<b style="color:var(--gold,#C9A868)">🎉 The Golden Gathering in the Gilded Hall, on Jubilee, the Party Planet</b>' +
'<div style="color:var(--dim);font-size:12px;margin:4px 0 8px">Every guest who has opened an invitation sees this on their invitation.</div>' +
'<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><input type="datetime-local" id="gi-g-at" value="' + loc + '">' +
'<input id="gi-g-note" value="' + esc(G.note || "") + '" placeholder="a line for the guests (dress, what to bring)" style="flex:1;min-width:180px">' +
'<button class="btn" id="gi-g-save">Save</button></div></div>';
pane.innerHTML = gath + '<p style="color:var(--dim);line-height:1.6">The twenty Golden Invitations. Write who you handed each one to; the rest fills itself in when a guest opens theirs. To hide one in a world, stand where you want it and use <b>Backpack › Hide a Golden Invitation here</b>. ' +
'<b style="color:var(--bone)">' + given + '</b> handed out, <b style="color:var(--bone)">' + used + '</b> opened, <b style="color:var(--bone)">' + (rows.length - used) + '</b> still waiting. Each opened invitation brings a +1 code for one companion; ' + (function (n) { return '<b style="color:var(--bone)">' + n + '</b> ' + (n === 1 ? 'companion has' : 'companions have') + ' joined.'; })(rows.filter(function (r) { return r.plus && r.plus.redeemed; }).length) + '</p>' +
'<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;min-width:520px">' +
'<tr style="color:var(--dim);font-size:12px;text-align:left"><th ' + td + '>No.</th><th ' + td + '>Given to</th><th ' + td + '>Opened</th><th ' + td + '>Their +1</th><th ' + td + '></th></tr>' +
rows.map(function (r) {
var who = r.redeemed ? ('<b>' + esc(r.name || r.email || "a dreamer") + '</b>' + (r.name && r.email ? '<br><span style="color:var(--dim);font-size:12px">' + esc(r.email) + '</span>' : '') +
'<br><span style="color:var(--dim);font-size:12px">' + new Date(r.at).toLocaleString() + (r.kind ? ' · on a ' + esc(r.kind) : '') + (r.device ? ' · device ' + esc(String(r.device).slice(0, 8)) : '') + '</span>') :
'<span style="color:var(--dim)">not yet</span>';
if (r.hidden && !r.redeemed)
who += '<br><span style="font-size:12px">🗺️ Hidden <b>' + esc(r.hidden.label || ("in " + giPlaceName(r.hidden.place))) + '</b></span>';
return '<tr><td ' + td + '><b style="color:var(--gold,#C9A868);font-family:var(--serif)">' + r.no + '</b></td>' +
'<td ' + td + '><input data-gi-who="' + r.no + '" value="' + esc(r.given_to || "") + '" placeholder="who has it?" style="width:100%;min-width:120px;box-sizing:border-box"></td>' +
'<td ' + td + '>' + (r.redeemed ? '✅ ' : '') + who + '</td>' +
'<td ' + td + '>' + giDeskPlus(r) + '</td>' +
'<td ' + td + ' style="white-space:nowrap"><button class="btn" data-gi-save="' + r.no + '">Save</button>' + (r.redeemed ? ' <button class="btn" data-gi-free="' + r.no + '">Set free</button>' : '') + (r.plus && r.plus.redeemed ? ' <button class="btn" data-gi-plusfree="' + r.no + '">Set +1 free</button>' : '') + (r.hidden && !r.redeemed ? ' <button class="btn" data-gi-unhide="' + r.no + '">Take back</button>' : '') + '</td></tr>';
}).join("") + '</table></div>';
Array.prototype.forEach.call(pane.querySelectorAll("#gi-g-at,#gi-g-note"), function (f) {
f.addEventListener("keydown", function (e) { e.stopPropagation(); });
f.addEventListener("keyup", function (e) { e.stopPropagation(); });
});
var gs = document.getElementById("gi-g-save");
if (gs)
gs.onclick = function () {
var v = document.getElementById("gi-g-at").value, n = document.getElementById("gi-g-note").value;
cityRpc("keeper_gathering_set", { p_at: v ? new Date(v).toISOString() : null, p_note: n }).then(function (o) {
if (typeof kdMsg === "function")
kdMsg(o && o.ok ? "The Golden Gathering is set." : String((o && o.say) || o), !(o && o.ok));
giLoadMine().then(function () { giDeskPane(pane); });
}).catch(function (e) { if (typeof kdMsg === "function")
kdMsg(/keeper_gathering_set|PGRST202|Could not find/i.test(e.message) ? "Setting the gathering needs the latest server update." : e.message, true); });
};
Array.prototype.forEach.call(pane.querySelectorAll("[data-gi-who]"), function (f) {
f.addEventListener("keydown", function (e) { e.stopPropagation(); if (e.key === "Enter") {
var b = pane.querySelector('[data-gi-save="' + f.getAttribute("data-gi-who") + '"]');
if (b)
b.click();
} });
f.addEventListener("keyup", function (e) { e.stopPropagation(); });
});
Array.prototype.forEach.call(pane.querySelectorAll("[data-gi-save]"), function (b) {
b.onclick = function () {
var n = +b.getAttribute("data-gi-save"), f = pane.querySelector('[data-gi-who="' + n + '"]');
cityRpc("keeper_invitation_note", { p_no: n, p_given_to: f ? f.value : "" }).then(function (o) {
if (typeof kdMsg === "function")
kdMsg(o && o.ok ? "Invitation " + n + " noted." : String((o && o.say) || o), !(o && o.ok));
giDeskPane(pane);
}).catch(function (e) { if (typeof kdMsg === "function")
kdMsg(e.message, true); });
};
});
Array.prototype.forEach.call(pane.querySelectorAll("[data-gi-unhide]"), function (b) {
b.onclick = function () {
var n = +b.getAttribute("data-gi-unhide");
cityRpc("keeper_invitation_unhide", { p_no: n }).then(function () { if (typeof kdMsg === "function")
kdMsg("Invitation " + n + " is no longer hidden."); if (typeof GIH !== "undefined")
GIH.at = 0; giDeskPane(pane); })
.catch(function (e) { if (typeof kdMsg === "function")
kdMsg(e.message, true); });
};
});
Array.prototype.forEach.call(pane.querySelectorAll("[data-gi-plusfree]"), function (b) {
b.onclick = function () {
var n = +b.getAttribute("data-gi-plusfree");
if (!confirm("Set the +1 of Golden Invitation No. " + n + " free again? The companion's keepsake leaves their backpack, their membership goes back to what it was, and the +1 gets a fresh code."))
return;
cityRpc("keeper_plus_reset", { p_no: n }).then(function (o) {
if (typeof kdMsg === "function")
kdMsg(o && o.ok ? "The +1 of invitation " + n + " is free again, with a fresh code." : String((o && o.say) || o), !(o && o.ok));
giDeskPane(pane);
}).catch(function (e) { if (typeof kdMsg === "function")
kdMsg(/keeper_plus_reset|PGRST202|Could not find/i.test(e.message) ? "The +1 needs the latest server update." : e.message, true); });
};
});
Array.prototype.forEach.call(pane.querySelectorAll("[data-gi-free]"), function (b) {
b.onclick = function () {
var n = +b.getAttribute("data-gi-free");
if (!confirm("Set Golden Invitation No. " + n + " free again? Its keepsake leaves that dreamer's backpack, and the same code will open it once more."))
return;
cityRpc("keeper_invitation_reset", { p_no: n }).then(function (o) {
if (typeof kdMsg === "function")
kdMsg(o && o.ok ? "Invitation " + n + " is free again." : String((o && o.say) || o), !(o && o.ok));
giDeskPane(pane);
}).catch(function (e) { if (typeof kdMsg === "function")
kdMsg(e.message, true); });
};
});
}).catch(function (e) {
var m = String((e && e.message) || e);
pane.innerHTML = "<span style='color:#C0603A'>" + (/keeper_invitations|PGRST202|Could not find/i.test(m) ? "The list appears soon." : esc(m)) + "</span>";
});
},
function () {
try {
if (typeof store !== "undefined" && store.inside && typeof INT !== "undefined" && INT && INT.spec && typeof placeName === "function") {
var lv = typeof INT.level === "number" ? INT.level : 0;
return "inside " + placeName(INT.spec) + (lv < 0 ? ", below ground" : lv > 0 ? ", floor " + (lv + 1) : "");
}
}
catch (e) { }
var k = giWhere();
return k ? "in " + giPlaceName(k) : "";
},
function (no) {
var g = new THREE.Group();
var cv = document.createElement("canvas");
cv.width = 256;
cv.height = 112;
var c = cv.getContext("2d"), gr = c.createLinearGradient(0, 0, 256, 112);
gr.addColorStop(0, "#B88A35");
gr.addColorStop(0.3, "#E3C27A");
gr.addColorStop(0.55, "#C99C48");
gr.addColorStop(0.8, "#E2C276");
gr.addColorStop(1, "#B88633");
c.fillStyle = gr;
c.fillRect(0, 0, 256, 112);
c.strokeStyle = "rgba(60,38,10,.8)";
c.lineWidth = 4;
c.strokeRect(6, 6, 244, 100);
c.fillStyle = "#2A1C0A";
c.textAlign = "center";
c.font = "600 13px Georgia,serif";
c.fillText("S O M N U M A T R I X", 128, 32);
c.font = "700 25px Georgia,serif";
c.fillText("Golden Invitation", 128, 64);
c.font = "600 15px Georgia,serif";
c.fillText("No. " + no + " of 20", 128, 90);
var tex = new THREE.CanvasTexture(cv);
var face = new THREE.MeshLambertMaterial({ map: tex, emissive: new THREE.Color(0x6A4A10), emissiveIntensity: 0.45, side: THREE.DoubleSide });
var card = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.48), face);
g.add(card);
if (typeof wGlow === "function") {
var s = wGlow(0xE8C977, 2.0, 0.32);
g.add(s);
}
g.userData.noCull = 1;
g.userData.card = card;
return g;
},
function (no) {
if (GI.busy)
return;
if (!(typeof signedIn === "function" && signedIn())) {
GI.say = "";
giOpen();
return;
}
GI.busy = true;
var dev = typeof deviceId === "function" ? deviceId(true) : null, kind = typeof platformWord === "function" ? platformWord() : null;
try {
if (typeof renderer !== "undefined" && renderer && renderer.xr && renderer.xr.isPresenting)
kind = "headset";
}
catch (e) { }
cityRpc("invite_find", { p_no: no, p_device: dev, p_kind: kind }).then(function (o) {
GI.busy = false;
GIH.at = 0;
if (o && o.ok && o.no) {
GI.mine = { no: o.no, at: o.at, fresh: true };
giLoadMine().then(function () { giOpen(); });
if (typeof refreshAccess === "function")
try {
refreshAccess();
}
catch (e) { }
if (typeof loadThings === "function")
loadThings();
}
else if (typeof setStatus === "function")
setStatus(esc((o && o.say) || "The invitation slips away. Try again in a moment."));
}).catch(function (e) { GI.busy = false; if (typeof setStatus === "function")
setStatus(esc((e && e.message) || String(e))); });
},
function (no) {
cityRpc("keeper_invitation_unhide", { p_no: no }).then(function () {
GIH.at = 0;
GIH.list = GIH.list.filter(function (h) { return h.no !== no; });
if (typeof setStatus === "function")
setStatus("<b>Golden Invitation No. " + no + "</b> is back in your hand, hidden nowhere.");
}).catch(function (e) { if (typeof setStatus === "function")
setStatus(esc(e.message)); });
},
function (no) {
var place = giWhere();
if (!place) {
if (typeof setStatus === "function")
setStatus("Walk somewhere first (on foot, not in the dream journal), then hide it where you stand.");
return Promise.resolve(null);
}
var P = camera.position;
var label = giHereName();
return cityRpc("keeper_invitation_hide", { p_no: no, p_place: place, p_x: P.x - giBase(), p_y: P.y - 1.72, p_z: P.z, p_label: label }).then(function (o) {
GIH.at = 0;
if (typeof setStatus === "function")
setStatus(esc((o && o.say) || String(o)) + (o && o.ok ? " (" + esc(label) + ")" : ""));
return o;
}).catch(function (e) { if (typeof setStatus === "function")
setStatus(/keeper_invitation_hide|PGRST202|Could not find/i.test(e.message) ? "Hiding invitations needs the latest server update." : esc(e.message)); return null; });
},
function () {
var el = document.getElementById("gi-hide-list");
if (!el)
return;
el.textContent = "Looking…";
cityRpc("keeper_invitations").then(function (rows) {
rows = (Array.isArray(rows) ? rows : []).filter(function (r) { return !r.redeemed; });
if (!rows.length) {
el.textContent = "Every invitation has been opened.";
return;
}
el.innerHTML = '<select id="gi-hide-no" style="padding:6px;border-radius:6px;background:#120C07;color:#F1E3BE;border:1px solid #8C6A26">' +
rows.map(function (r) { return '<option value="' + r.no + '">No. ' + r.no + (r.given_to ? " · " + esc(r.given_to) : "") + (r.hidden ? " · hidden " + esc(r.hidden.label || ("in " + giPlaceName(r.hidden.place))) : "") + '</option>'; }).join("") + '</select> ' +
'<button class="btn gi-gold" id="gi-hide-go">Hide it where I stand</button>';
document.getElementById("gi-hide-go").onclick = function () {
var n = +document.getElementById("gi-hide-no").value;
giHideHere(n).then(function (o) { if (o && o.ok) {
giClose();
} });
};
}).catch(function (e) { el.textContent = /keeper_invitations|PGRST202|Could not find/i.test(e.message) ? "Needs the latest server update." : e.message; });
}
];
});
