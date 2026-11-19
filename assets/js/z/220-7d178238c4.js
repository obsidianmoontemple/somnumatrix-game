/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(220, function () {
"use strict";
return [
function (id, name) {
if (typeof PH === "undefined" || typeof phThread !== "function") {
NTC.say = "Your phone is not ready yet.";
ntcPaint();
return;
}
PH.open = true;
PH.tab = "msgs";
PH.withId = id;
PH.withName = name || "";
PH.thread = null;
PH.msg = "";
if (typeof phEls === "function")
phEls();
if (typeof phPaint === "function")
phPaint();
phThread(id);
NTC.open = false;
ntcPaint();
},
function () {
var B = NTC.b, h = '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><b style="font-size:15px;flex:1">📌 Notices</b>' +
(B && B.paid && !NTC.write ? '<button class="btn" data-ntc="write" style="border-color:#C9A868">Pin a notice</button>' : '') + '<button class="btn" data-ntc="close">Close</button></div>';
if (NTC.say)
h += '<div style="margin:0 0 8px;color:#E8D9B0">' + esc(NTC.say) + '</div>';
if (!B)
return h + '<div style="color:#9AA3B5">Opening…</div>';
if (NTC.write) {
var F = NTC.form;
h += '<div style="display:grid;gap:8px">';
h += '<label>What kind<br><select id="ntc-kind" style="width:100%">' + Object.keys(NTC_KIND).map(function (k) { return '<option value="' + k + '"' + (F.kind === k ? " selected" : "") + '>' + NTC_KIND[k][0] + ' ' + NTC_KIND[k][1] + '</option>'; }).join("") + '</select></label>';
h += '<label>Heading<br><input id="ntc-title" maxlength="80" placeholder="Selling a red bicycle" value="' + esc(F.title) + '" style="width:100%;box-sizing:border-box"></label>';
h += '<label>More (optional)<br><textarea id="ntc-body" maxlength="600" rows="4" style="width:100%;box-sizing:border-box">' + esc(F.body) + '</textarea></label>';
h += '<div style="display:flex;gap:8px"><label style="flex:2">Where (optional)<br><input id="ntc-place" maxlength="80" placeholder="Dreamers\' Row, stall 4" value="' + esc(F.place) + '" style="width:100%;box-sizing:border-box"></label>' +
'<label style="flex:1">For<br><select id="ntc-days" style="width:100%">' + [1, 3, 7, 14].map(function (d) { return '<option value="' + d + '"' + (+F.days === d ? " selected" : "") + '>' + d + ' day' + (d === 1 ? "" : "s") + '</option>'; }).join("") + '</select></label></div>';
h += '<div style="color:#9AA3B5">Everyone can read it, on every board in the city. Keep it kind: the chat word filter cleans it, and three reports take it down. You have ' + B.live + ' of 5 up.</div>';
h += '<div style="display:flex;gap:6px"><button class="btn" data-ntc="post" style="border-color:#C9A868">📌 Pin it up</button><button class="btn" data-ntc="unwrite">Back</button></div></div>';
return h;
}
h += '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px">' + [["", "All"]].concat(Object.keys(NTC_KIND).map(function (k) { return [k, NTC_KIND[k][0] + " " + NTC_KIND[k][1]]; })).map(function (t) {
return '<button class="btn" data-ntc="kind" data-k="' + t[0] + '" style="padding:3px 9px;' + (NTC.kind === t[0] ? "border-color:#C9A868;color:#F2E6C4" : "") + '">' + t[1] + '</button>';
}).join("") + '</div>';
var N = (B.notices || []).filter(function (n) { return !NTC.kind || n.kind === NTC.kind; });
if (!N.length)
h += '<div style="color:#9AA3B5">Nothing pinned here yet.' + (B.paid ? ' Pin the first one.' : B.signed_in ? ' Dreamers whose dues are paid can pin notices.' : ' Sign in to pin one.') + '</div>';
N.forEach(function (n) {
var k = NTC_KIND[n.kind] || NTC_KIND.other;
h += '<div style="border:1px solid ' + (n.hidden ? "#7A3A3A" : "#2A3040") + ';border-radius:6px;padding:8px 10px;margin-bottom:8px' + (n.hidden ? ";opacity:.75" : "") + '">';
h += '<b style="color:#F2E6C4">' + k[0] + ' ' + esc(n.title) + '</b>' + (n.hidden ? ' <span style="color:#E89A7A">· taken down after reports</span>' : '');
if (n.body)
h += '<div style="margin:3px 0;white-space:pre-wrap">' + esc(n.body) + '</div>';
h += '<div style="color:#9AA3B5">' + (n.place ? '📍 ' + esc(n.place) + ' · ' : '') + esc(n.by_name) + ' · ' + ntcAgo(n.at) + ' · up until ' + new Date(n.expires).toLocaleDateString([], { day: "numeric", month: "short" }) + (B.mod && n.reports ? ' · ' + n.reports + ' report' + (n.reports === 1 ? "" : "s") : '') + '</div>';
h += '<div style="display:flex;gap:6px;margin-top:6px;flex-wrap:wrap">';
if (!n.mine && B.signed_in)
h += '<button class="btn" data-ntc="msg" data-u="' + esc(n.by) + '" data-n="' + esc(n.by_name) + '" style="padding:3px 9px">💬 Message them</button>';
if (n.mine || B.mod)
h += '<button class="btn" data-ntc="remove" data-id="' + n.id + '" style="padding:3px 9px">Take it down</button>';
if (B.mod && n.hidden)
h += '<button class="btn" data-ntc="restore" data-id="' + n.id + '" style="padding:3px 9px">Put it back</button>';
if (!n.mine && B.signed_in && !n.hidden)
h += '<button class="btn" data-ntc="report" data-id="' + n.id + '" style="padding:3px 9px;color:#C8A8A0"' + (n.reported ? " disabled" : "") + '>' + (n.reported ? "Reported" : "⚑ Report") + '</button>';
h += '</div></div>';
});
return h;
},
function (e) {
var t = e.target.closest && e.target.closest("[data-ntc]");
if (!t)
return;
var a = t.getAttribute("data-ntc"), id = +t.getAttribute("data-id");
if (a === "close") {
NTC.open = false;
ntcPaint();
return;
}
if (a === "kind") {
NTC.kind = t.getAttribute("data-k");
NTC.say = "";
ntcPaint();
return;
}
if (a === "write") {
NTC.write = true;
NTC.say = "";
ntcPaint();
return;
}
if (a === "unwrite") {
ntcKeep();
NTC.write = false;
NTC.say = "";
ntcPaint();
return;
}
if (a === "post") {
ntcKeep();
var F = NTC.form;
if (!String(F.title).trim()) {
NTC.say = "Give your notice a heading.";
ntcPaint();
return;
}
ntcAct("notice_post", { p_kind: F.kind, p_title: F.title, p_body: F.body, p_place: F.place, p_days: F.days }, function (o) { if (o && o.ok) {
NTC.write = false;
NTC.form = { kind: F.kind, title: "", body: "", place: "", days: 7 };
} });
return;
}
if (a === "msg") {
ntcMessage(t.getAttribute("data-u"), t.getAttribute("data-n"));
return;
}
if (a === "remove") {
if (!confirm("Take this notice down?"))
return;
ntcAct("notice_remove", { p_id: id, p_restore: false });
return;
}
if (a === "restore") {
ntcAct("notice_remove", { p_id: id, p_restore: true });
return;
}
if (a === "report") {
if (!confirm("Report this notice to the officers as unkind, unsafe or a cheat?"))
return;
ntcAct("notice_report", { p_id: id });
return;
}
}
];
});
