/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(256, function () {
"use strict";
return [
function () {
var P = dshPrefs(), O = DSH.opts, L = [];
L.push("Dream journal" + (dshWho() ? " of " + dshWho() : "") + (P.name ? ", for " + P.name : ""));
L.push("Prepared " + new Date().toLocaleDateString() + " with SomnuMatrix. Each dream is as it was first written, sealed that night.");
if (O.note)
L.push("", "A note: " + O.note);
dshChosen().forEach(function (r) {
L.push("", "— " + (r.title || ("Night " + r.n)) + " · " + (r.date || "") + " —", "", String(r.original || "").trim());
if (O.feel && (r.emotions || []).length)
L.push("", "Feelings: " + r.emotions.join(", "));
if (O.lucid && r.lucidity)
L.push("How lucid: " + dshLucid(r.lucidity));
if (O.versions)
(r.versions || []).forEach(function (v) { L.push("", "Told again, " + String(v.at || "").slice(0, 10) + ": " + String(v.text || "").trim()); });
if (O.outcomes)
(r.outcomes || []).forEach(function (o) { L.push("Afterwards (" + (o.kind || "") + (o.eventDate ? ", " + o.eventDate : "") + "): " + (o.note || "")); });
});
return L.join("\n");
},
function () {
var P = dshPrefs(), O = DSH.opts, who = dshWho();
var h = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Dream journal' + (who ? " — " + dshE(who) : "") + '</title>' +
'<style>body{font:16px/1.6 Georgia,serif;color:#222;max-width:720px;margin:32px auto;padding:0 20px}h1{font-weight:normal;margin:0}' +
'.sub{color:#666;font-size:13px;margin:4px 0 24px}.d{border-top:1px solid #ccc;padding:16px 0;page-break-inside:avoid}.d h2{font-size:18px;font-weight:normal;margin:0 0 2px}' +
'.dt{color:#777;font-size:13px}.t{white-space:pre-wrap;margin:10px 0}.m{color:#555;font-size:14px}.note{background:#f6f3ea;padding:10px 12px;border-radius:4px}' +
'@media print{body{margin:0}}</style></head><body>' +
'<h1>Dream journal</h1><div class="sub">' + (who ? dshE(who) + " · " : "") + (P.name ? "for " + dshE(P.name) + " · " : "") + "prepared " + dshE(new Date().toLocaleDateString()) +
". Each dream is shown as it was first written, sealed the night it was told.</div>";
if (O.note)
h += '<p class="note">' + dshE(O.note) + '</p>';
dshChosen().forEach(function (r) {
h += '<div class="d"><h2>' + dshE(r.title || ("Night " + r.n)) + '</h2><div class="dt">' + dshE(r.date || "") + '</div><div class="t">' + dshE(String(r.original || "").trim()) + '</div>';
if (O.feel && (r.emotions || []).length)
h += '<div class="m"><b>Feelings:</b> ' + dshE(r.emotions.join(", ")) + '</div>';
if (O.lucid && r.lucidity)
h += '<div class="m"><b>How lucid:</b> ' + dshE(dshLucid(r.lucidity)) + '</div>';
if (O.versions)
(r.versions || []).forEach(function (v) { h += '<div class="m"><b>Told again, ' + dshE(String(v.at || "").slice(0, 10)) + ':</b> ' + dshE(String(v.text || "").trim()) + '</div>'; });
if (O.outcomes)
(r.outcomes || []).forEach(function (o) { h += '<div class="m"><b>Afterwards</b> (' + dshE(o.kind || "") + (o.eventDate ? ", " + dshE(o.eventDate) : "") + '): ' + dshE(o.note || "") + '</div>'; });
h += '</div>';
});
return h + '</body></html>';
},
function () {
if (!dshNeed())
return;
var w = window.open("", "_blank");
if (!w) {
dshSay("Your browser blocked the new page. Use <b>Download</b> instead, then print it.");
return;
}
w.document.open();
w.document.write(dshHtml());
w.document.close();
setTimeout(function () { try {
w.focus();
w.print();
}
catch (e) { } }, 400);
dshSay("The document is open in a new page. Choose <b>Save as PDF</b> in the print window to keep a copy.");
},
function () {
if (!dshNeed())
return;
var f = dshFile(), a = document.createElement("a");
a.href = URL.createObjectURL(f.blob);
a.download = f.name;
document.body.appendChild(a);
a.click();
setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
dshSay("Downloaded <b>" + dshE(f.name) + "</b>. Attach it to an email or a message to your therapist.");
},
function () {
if (!dshNeed())
return;
var f = dshFile(), file = null;
try {
file = new File([f.blob], f.name, { type: "text/html" });
}
catch (e) { }
var data = { title: "Dream journal", text: dshText() };
if (file && navigator.canShare && navigator.canShare({ files: [file] }))
data = { title: "Dream journal", files: [file], text: "My dream journal, from SomnuMatrix." };
if (!navigator.share) {
dshSay("This browser has no share sheet. Use <b>Email</b> or <b>Download</b>.");
return;
}
navigator.share(data).then(function () { dshSay("Shared."); }).catch(function (e) { if (e && e.name !== "AbortError")
dshSay("It could not be shared from here. Use <b>Email</b> or <b>Download</b>."); });
},
function () {
if (!dshNeed())
return;
var P = dshPrefs(), body = dshText(), cut = false;
if (body.length > 1800) {
body = body.slice(0, 1800) + "…";
cut = true;
}
if (cut)
body += "\n\n(The rest is in the attached document.)";
location.href = "mailto:" + encodeURIComponent(P.email || "") + "?subject=" + encodeURIComponent("My dream journal") + "&body=" + encodeURIComponent(body);
dshSay(cut ? "Your mail app opens with the start of the dreams. They are long, so <b>Download</b> the document too and attach it." : "Your mail app opens with the dreams in the message. Check it and send.");
},
function () {
var el = document.getElementById("dsh-box");
if (!DSH.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "dsh-box";
el.setAttribute("role", "dialog");
el.setAttribute("aria-label", "Send dreams to my therapist");
el.style.cssText = "position:fixed;z-index:60;left:50%;top:50%;transform:translate(-50%,-50%);width:min(500px,calc(100vw - 32px));max-height:min(84vh,700px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(18,15,24,.98),rgba(9,8,12,.99));border:1px solid #8A7A4A;border-radius:8px;padding:14px 16px;color:var(--bone,#C9BEA8);" +
"font:14px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", function (e) {
var t = e.target;
if (!t)
return;
var a = t.getAttribute && t.getAttribute("data-dsh");
if (a === "close") {
DSH.open = false;
return dshPaint();
}
if (a === "all") {
dshNights().forEach(function (r) { DSH.pick[r.n] = 1; });
return dshPaint();
}
if (a === "none") {
DSH.pick = {};
return dshPaint();
}
if (a === "print")
return dshPrint();
if (a === "share")
return dshShare();
if (a === "email")
return dshEmail();
if (a === "download")
return dshDownload();
});
el.addEventListener("change", function (e) {
var t = e.target;
if (!t)
return;
var n = t.getAttribute("data-night");
if (n != null) {
if (t.checked)
DSH.pick[n] = 1;
else
delete DSH.pick[n];
dshCount();
return;
}
var o = t.getAttribute("data-opt");
if (o) {
DSH.opts[o] = t.checked ? 1 : 0;
return;
}
if (t.id === "dsh-name" || t.id === "dsh-email") {
var P = dshPrefs();
P.name = document.getElementById("dsh-name").value.trim();
P.email = document.getElementById("dsh-email").value.trim();
dshSavePrefs(P);
}
if (t.id === "dsh-note")
DSH.opts.note = t.value.trim();
});
document.body.appendChild(el);
}
var P = dshPrefs(), N = dshNights(), O = DSH.opts;
var h = '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><b style="font:500 17px var(--serif,Georgia);color:#F0E0B8">Send to my therapist</b><button class="btn" data-dsh="close">Close</button></div>' +
'<div style="color:var(--dim);font-size:12.5px;margin:4px 0 10px">Choose the dreams, and a document is made here on your device. It goes only where you send it: nothing passes through SomnuMatrix.</div>';
h += '<div style="display:flex;gap:8px;flex-wrap:wrap"><input id="dsh-name" placeholder="Therapist\'s name" value="' + dshE(P.name || "") + '" style="flex:1;min-width:140px"><input id="dsh-email" type="email" placeholder="Their email (optional)" value="' + dshE(P.email || "") + '" style="flex:1;min-width:160px"></div>';
if (!N.length)
h += '<p style="color:var(--dim)">No sealed dreams yet. Tell a dream, then seal it (Menu > Seal it, start a new dream), and it can be sent.</p>';
else {
h += '<div style="display:flex;justify-content:space-between;align-items:center;margin:12px 0 4px"><span style="color:var(--dim)" id="dsh-count"></span><span><button class="btn" data-dsh="all">All</button> <button class="btn" data-dsh="none">None</button></span></div>' +
'<div style="max-height:220px;overflow-y:auto;border:1px solid rgba(255,255,255,.1);border-radius:4px;padding:4px 8px">';
N.forEach(function (r) {
h += '<label style="display:flex;gap:8px;align-items:flex-start;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.05)"><input type="checkbox" data-night="' + r.n + '"' + (DSH.pick[r.n] ? " checked" : "") + ' style="margin-top:3px">' +
'<span><b>' + dshE(r.title || ("Night " + r.n)) + '</b> <span style="color:var(--dim)">· ' + dshE(r.date || "") + '</span><br><span style="color:var(--dim);font-size:12.5px">' + dshE(String(r.original || "").slice(0, 110)) + (String(r.original || "").length > 110 ? "…" : "") + '</span></span></label>';
});
h += '</div>';
h += '<div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:4px 14px;font-size:13px">' +
[["feel", "Feelings"], ["lucid", "How lucid"], ["versions", "Later tellings"], ["outcomes", "What came true"]].map(function (k) { return '<label><input type="checkbox" data-opt="' + k[0] + '"' + (O[k[0]] ? " checked" : "") + '> ' + k[1] + '</label>'; }).join("") + '</div>';
h += '<textarea id="dsh-note" rows="2" maxlength="600" placeholder="A note for them (optional)" style="width:100%;margin-top:10px;box-sizing:border-box">' + dshE(O.note || "") + '</textarea>';
h += '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:10px"><button class="btn" data-dsh="print">Print or PDF</button><button class="btn" data-dsh="share">Share</button><button class="btn" data-dsh="email">Email</button><button class="btn" data-dsh="download">Download</button></div>';
}
h += '<div id="dsh-msg" style="margin-top:8px;font-size:13px;color:#E8D8A8"></div>';
el.innerHTML = h;
el.style.display = "block";
dshCount();
}
];
});
