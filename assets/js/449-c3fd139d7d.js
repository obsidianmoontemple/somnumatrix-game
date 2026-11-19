/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var BD = { open: false, busy: false, say: "", mine: null, posts: null, find: "", code: "", asked: false };
function bdIs(c) { return /^BARD/.test(typeof giNorm === "function" ? giNorm(c) : String(c || "").toUpperCase()); }
function bdShow(c) { c = giNorm(c); return c.length === 16 ? c.slice(0, 4) + "-" + c.slice(4, 8) + "-" + c.slice(8, 12) + "-" + c.slice(12) : c; }
(function () {
if (document.getElementById("bd-style"))
return;
var s = document.createElement("style");
s.id = "bd-style";
s.textContent =
"#bd-box{position:fixed;z-index:61;left:50%;top:50%;transform:translate(-50%,-50%);width:min(460px,calc(100vw - 32px));max-height:min(88vh,720px);overflow-y:auto;" +
"border-radius:6px;box-shadow:0 20px 70px rgba(0,0,0,.7);-webkit-overflow-scrolling:touch;" +
"background:radial-gradient(ellipse at 30% 20%,#F6EBCF,#EBD9B0 55%,#D9BF8A 100%);color:#2E1E10}" +
"#bd-box .bd-in{position:relative;padding:26px 26px 22px;font:15px/1.6 'Palatino Linotype',Palatino,'Book Antiqua',Georgia,serif}" +
"#bd-box .bd-in:before{content:'';position:absolute;inset:9px;border:2px solid #7A1F1A;outline:1px solid #B08A3E;outline-offset:3px;pointer-events:none}" +
"#bd-box .bd-sub{text-align:center;font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#7A1F1A}" +
"#bd-box h3{margin:6px 0 2px;text-align:center;font:italic 600 27px/1.15 'Palatino Linotype',Palatino,Georgia,serif;color:#4A120E}" +
"#bd-box .bd-orn{text-align:center;color:#9A7A36;letter-spacing:.5em;margin:2px 0 8px}" +
"#bd-box p{margin:9px 0}" +
"#bd-box .bd-q{font-style:italic;text-align:center;color:#5A2A18}" +
"#bd-box .bd-sig{text-align:right;font:italic 26px/1.1 'Segoe Script','Brush Script MT','Apple Chancery','URW Chancery L',cursive;color:#2A1608;margin:12px 6px 0}" +
"#bd-box .bd-sig small{display:block;font:italic 12px Georgia,serif;color:#5A3A1E;margin-top:4px}" +
"#bd-box input{width:100%;box-sizing:border-box;padding:9px 11px;border-radius:4px;border:1px solid #8A6A36;background:#FBF4E2;color:#2E1E10;font:15px Georgia,serif}" +
"#bd-box input.bd-code{font:600 18px ui-monospace,Menlo,monospace;letter-spacing:.12em;text-align:center;text-transform:uppercase}" +
"#bd-box .bd-row{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:12px}" +
"#bd-box button{font:15px Georgia,serif;padding:8px 14px;border-radius:4px;border:1px solid #7A5A2A;background:#F3E4C0;color:#3A220E;cursor:pointer}" +
"#bd-box button.bd-red{background:linear-gradient(180deg,#9A2A22,#6E1712);color:#F8EBD0;border-color:#4A0E0A}" +
"#bd-box .bd-say{min-height:18px;text-align:center;color:#8A2A1A;font-size:14px}" +
"#bd-box .bd-list{max-height:min(38vh,300px);overflow-y:auto;margin-top:8px;border:1px solid rgba(122,90,42,.45);border-radius:4px;background:rgba(251,244,226,.6)}" +
"#bd-box .bd-post{display:block;width:100%;text-align:left;border:0;border-bottom:1px solid rgba(122,90,42,.25);border-radius:0;background:transparent;padding:8px 10px}" +
"#bd-box .bd-post:hover,#bd-box .bd-post:focus{background:rgba(154,42,34,.1)}" +
"#bd-box .bd-post small{display:block;color:#6A4A2A;font-size:12px}" +
"#bd-box .bd-seal{position:absolute;right:22px;top:20px;width:46px;height:46px;border-radius:50%;" +
"background:radial-gradient(circle at 38% 35%,#C8443A,#8A1C16 60%,#5A0E0A);box-shadow:0 2px 4px rgba(0,0,0,.35);" +
"color:#E8B8A8;font:italic 700 17px/46px Georgia,serif;text-align:center}";
(document.head || document.documentElement).appendChild(s);
})();
function bdOpen() { BD.open = true; BD.say = ""; bdPaint(); if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { } }
function bdClose() { BD.open = false; bdPaint(); }
if (typeof backRegister === "function")
backRegister({ order: 1, open: function () { return !!BD.open; }, close: bdClose });
function bdPostsHtml() { return __ZC(449, 0, this, arguments, new.target); }
function bdPaint() { return __ZC(449, 1, this, arguments, new.target); }
function bdLoadPosts() {
if (BD.posts)
return Promise.resolve(BD.posts);
return cityRpc("bard_invite_posts").then(function (r) { BD.posts = Array.isArray(r) ? r : []; if (BD.open)
bdPaint(); return BD.posts; })
.catch(function () { BD.posts = []; if (BD.open)
bdPaint(); return BD.posts; });
}
function bdLoadMine() {
if (!(typeof signedIn === "function" && signedIn()))
return Promise.resolve(null);
return cityRpc("my_bard_invitation").then(function (o) { BD.mine = o && o.no ? o : null; return BD.mine; }).catch(function () { return null; });
}
function bdRedeem() { return __ZC(449, 2, this, arguments, new.target); }
function bdChoose(job) { return __ZC(449, 3, this, arguments, new.target); }
(function () {
if (typeof giRedeem !== "function")
return;
var gr = giRedeem;
giRedeem = function () {
try {
var f = document.getElementById("gi-code"), c = f ? giNorm(f.value) : GI.code;
if (bdIs(c)) {
GI.code = c;
BD.code = c;
if (typeof giClose === "function")
giClose();
BD.open = true;
return bdRedeem();
}
}
catch (e) { }
return gr.apply(this, arguments);
};
if (typeof giOpen === "function") {
var go = giOpen;
giOpen = function () {
if (bdIs(GI.code) && !(typeof signedIn === "function" && signedIn())) {
BD.code = GI.code;
return bdOpen();
}
return go.apply(this, arguments);
};
}
})();
(function () {
var wasIn = false, tries = 0;
function tick() {
tries++;
var inn = typeof signedIn === "function" && signedIn();
if (inn && !wasIn) {
wasIn = true;
bdLoadMine().then(function (m) { if (m && !m.job_id && !BD.asked) {
BD.asked = true;
bdLoadPosts();
bdOpen();
} });
}
if (!inn)
wasIn = false;
setTimeout(tick, tries < 40 ? 2000 : 8000);
}
setTimeout(tick, 3000);
})();
(function () {
if (typeof bkpHtml !== "function")
return;
var bh = bkpHtml;
bkpHtml = function () {
var h = bh.apply(this, arguments), x = "";
try {
if (BD.mine && BD.mine.no)
x = '<div style="margin:8px 0 2px;padding:8px 10px;border:1px solid #7A1F1A;border-radius:6px;background:linear-gradient(90deg,rgba(235,217,176,.22),rgba(235,217,176,.05))">' +
'📜 <b style="color:#E8D3A0">The Bard’s Invitation</b>' + (BD.mine.job_id ? '' : ' <span style="font-size:12px;color:#E0A080">(choose thy post)</span>') +
' <button class="btn" data-bkbd="1" style="float:right">Look</button></div>';
}
catch (e) { }
return x + h;
};
document.addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-bkbd]") : null;
if (!t)
return;
e.stopPropagation();
if (typeof bkpClose === "function")
bkpClose();
if (BD.mine && !BD.mine.job_id)
bdLoadPosts();
bdOpen();
}, true);
if (typeof bkpLoad === "function") {
var bl = bkpLoad;
bkpLoad = function () { var r = bl.apply(this, arguments); bdLoadMine().then(function (m) { if (m && typeof BKP !== "undefined" && BKP.open)
bkpPaint(); }); return r; };
}
})();
