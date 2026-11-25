/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(452, function () {
"use strict";
return [
function () {
if (!BD.posts)
return '<p style="text-align:center;color:#6A4A2A">The list of posts is being fetched…</p>';
var f = BD.find.toLowerCase().trim(), n = 0, h = "";
for (var i = 0; i < BD.posts.length && n < 60; i++) {
var p = BD.posts[i], t = (p.title + " " + p.workplace + " " + p.employer).toLowerCase();
if (f && t.indexOf(f) < 0)
continue;
n++;
h += '<button class="bd-post" data-bd="post" data-job="' + (+p.job_id) + '"><b>' + esc(p.title) + '</b><small>' + esc(p.workplace || p.employer || "") +
' · ' + esc(String(p.rate)) + ' gold ' + (p.pay_kind === "salary" ? "a week" : "an hour") + '</small></button>';
}
if (!n)
h = '<p style="text-align:center;padding:8px">No post by that name. Try another word, such as teacher, nurse, baker or library.</p>';
return '<div class="bd-list">' + h + '</div><p style="font-size:12px;color:#6A4A2A;text-align:center">' + BD.posts.length + ' posts in all. Type a word to find yours; any post may be chosen, even one that is full.</p>';
},
function () {
var el = document.getElementById("bd-box");
if (!BD.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "bd-box";
el.addEventListener("keydown", function (e) { e.stopPropagation(); if (e.key === "Enter" && e.target && e.target.id === "bd-code")
bdRedeem(); });
el.addEventListener("keyup", function (e) { e.stopPropagation(); });
el.addEventListener("input", function (e) {
if (e.target && e.target.id === "bd-find") {
BD.find = e.target.value;
var l = el.querySelector("#bd-posts");
if (l)
l.innerHTML = bdPostsHtml();
}
});
el.addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-bd]") : null;
if (!t)
return;
var w = t.getAttribute("data-bd");
if (w === "close")
return bdClose();
if (w === "signin") {
bdClose();
if (typeof openAccountForm === "function")
openAccountForm();
return;
}
if (w === "open")
return bdRedeem();
if (w === "post")
return bdChoose(+t.getAttribute("data-job"));
if (w === "pack") {
bdClose();
if (typeof bkpOpen === "function")
bkpOpen();
return;
}
if (w === "london") {
bdClose();
if (typeof shkGo === "function")
shkGo();
return;
}
});
document.body.appendChild(el);
}
el.style.display = "block";
var h = '<div class="bd-in"><div class="bd-seal">WS</div><div class="bd-sub">From the Globe, upon the Bankside</div><h3>The Bard’s Invitation</h3><div class="bd-orn">❦ ❦ ❦</div>';
var M = BD.mine;
if (M && M.no && !M.job_id) {
h += '<p>Good friend, thou art come, and the house is the fuller for it. Thy place among us is thine for life: no dues shall ever be asked of thee.</p>' +
'<p><b>Now choose thy work in the city.</b> Thy entry pack follows at once: the garments for the post, two months’ wages in thy purse, and the way to thy door.</p>' +
'<input id="bd-find" autocomplete="off" placeholder="Find a post: teacher, nurse, librarian, baker…" value="' + esc(BD.find) + '">' +
'<div id="bd-posts">' + bdPostsHtml() + '</div>' +
'<div class="bd-say">' + (BD.busy ? '<span style="color:#6A4A2A">A moment…</span>' : esc(BD.say || "")) + '</div>' +
'<div class="bd-row"><button data-bd="close">Choose later</button></div>';
}
else if (M && M.no) {
h += '<p>Thou art one of us for life, and thy post in the city is <b>' + esc(M.job_title || "thine") + '</b>. Thy entry pack is in thy backpack: wear thy garments from it, and it will show thee the way.</p>' +
'<p class="bd-q">“All the world’s a stage, and all the men and women merely players.”</p>' +
'<p>When thou hast leisure, cross the river to Bankside and find me in the tiring-house of the Globe. Every word I ever set down is on the shelves of the Folio Library at Stationers’ Hall.</p>' +
'<div class="bd-sig">Will. Shakespeare<small>The Globe, upon the Bankside</small></div>' +
'<div class="bd-row"><button class="bd-red" data-bd="london">To Shakespeare’s London</button><button data-bd="pack">My backpack</button><button data-bd="close">Close</button></div>';
}
else if (!(typeof signedIn === "function" && signedIn())) {
h += '<p style="text-align:center">' + (BD.code ? 'Thine invitation <b style="letter-spacing:.06em">' + esc(bdShow(BD.code)) + '</b> is waiting. ' : '') +
'Sign in first, or make thine account, so the invitation is kept against thy name. It will open the moment thou art signed in.</p>' +
'<div class="bd-row"><button class="bd-red" data-bd="signin">Sign in</button><button data-bd="close">Later</button></div>';
}
else {
h += '<p style="text-align:center">Type the code written upon thine invitation.</p>' +
'<input id="bd-code" class="bd-code" autocomplete="off" autocapitalize="characters" spellcheck="false" maxlength="24" placeholder="BARD-XXXX-XXXX-XXXX" value="' + esc(bdShow(BD.code)) + '">' +
'<div class="bd-say">' + (BD.busy ? '<span style="color:#6A4A2A">Breaking the seal…</span>' : esc(BD.say || "")) + '</div>' +
'<div class="bd-row"><button class="bd-red" data-bd="open">Open mine invitation</button><button data-bd="close">Close</button></div>';
}
el.innerHTML = h + '</div>';
var f = el.querySelector("#bd-find");
if (f && BD.find) {
try {
f.focus();
f.setSelectionRange(f.value.length, f.value.length);
}
catch (e) { }
}
},
function () {
if (BD.busy)
return;
var f = document.getElementById("bd-code");
if (f)
BD.code = giNorm(f.value);
if (!bdIs(BD.code)) {
GI.code = BD.code;
bdClose();
if (typeof giOpen === "function")
giOpen();
return;
}
if (BD.code.length < 16) {
BD.say = "Type the whole code from thine invitation.";
return bdPaint();
}
if (!(typeof signedIn === "function" && signedIn())) {
giKeep(BD.code);
return bdOpen();
}
BD.busy = true;
BD.say = "";
if (!BD.open)
BD.open = true;
bdPaint();
var dev = typeof deviceId === "function" ? deviceId(true) : null, kind = typeof platformWord === "function" ? platformWord() : null;
cityRpc("bard_invite_redeem", { p_code: BD.code, p_device: dev, p_kind: kind }).then(function (o) {
BD.busy = false;
if (o && o.ok && o.no) {
BD.mine = { no: o.no, at: o.at, job_id: o.job_id || null, job_title: o.job_title || null };
BD.code = "";
giKeep("");
GI.code = "";
if (typeof refreshAccess === "function")
try {
refreshAccess();
}
catch (e) { }
if (typeof loadThings === "function")
try {
loadThings();
}
catch (e) { }
if (!BD.mine.job_id)
bdLoadPosts();
}
else {
BD.say = (o && o.say) || "That did not go through. Try again in a moment.";
if (o && o.why !== "sign_in")
giKeep("");
}
bdPaint();
}).catch(function (e) {
BD.busy = false;
var m = String((e && e.message) || e);
BD.say = /bard_invite|PGRST202|Could not find/i.test(m) ? "The invitation opens very soon. Try again shortly." : "That did not go through. Try again in a moment.";
bdPaint();
});
},
function (job) {
if (BD.busy || !job)
return;
BD.busy = true;
BD.say = "";
bdPaint();
cityRpc("bard_invite_choose", { p_job: job }).then(function (o) {
BD.busy = false;
if (o && o.ok) {
BD.mine.job_id = o.job_id;
BD.mine.job_title = o.job_title;
if (typeof setStatus === "function")
setStatus("<b>" + esc(o.say || "Thy post is thine.") + "</b>");
if (typeof loadThings === "function")
try {
loadThings();
}
catch (e) { }
if (typeof bkpLoad === "function" && typeof BKP !== "undefined" && BKP.open)
bkpLoad();
}
else
BD.say = (o && o.say) || "That post could not be given just now. Choose another.";
bdPaint();
}).catch(function () { BD.busy = false; BD.say = "That did not go through. Try again in a moment."; bdPaint(); });
}
];
});
