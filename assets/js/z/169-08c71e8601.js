/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(169, function () {
"use strict";
return [
function (d) {
var h = pDim("Your address: " + esc((d.address && d.address.address) || "") + (d.coming ? " · " + d.coming + " on the way with the carrier" : ""));
if (POST.reading) {
var r = POST.reading;
return h + '<div style="margin-top:8px;border:1px solid rgba(255,255,255,.12);padding:10px;border-radius:3px;background:rgba(244,230,192,.04)">' +
'<div>' + pDim("From") + ' <b>' + esc(r.from) + '</b></div><div style="margin:2px 0 8px"><b>' + esc(r.subject || "(no subject)") + '</b></div>' +
'<div style="white-space:pre-wrap">' + esc(r.body) + '</div></div>' +
'<div style="margin-top:6px"><button class="btn" data-p="back">Back to the box</button>' + (r.from_user ? ' <button class="btn" data-p="reply">Write back</button>' : '') + '</div>';
}
var box = d.box || [];
if (!box.length)
return h + '<div style="margin-top:8px">' + pDim("Nothing in the box.") + '</div>';
box.forEach(function (m) {
h += pRow((m.read ? '' : '<b style="color:#E8C870">● </b>') + '<b>' + esc(m.from || "") + '</b> ' + esc(m.subject || "(no subject)") + ' ' + pDim((m.shop ? "to " + esc(m.to) + " · " : "") + (m.kind === "city" ? "city post" : m.kind === "notice" ? "from a shop" : "")), '<button class="btn" data-p="read:' + m.id + '">' + (m.read ? "Read again" : "Open") + '</button>');
});
return h;
},
function (d) {
var shops = d.shops || [];
return pDim("Letters go with the mail carrier to the address and into the box.") +
'<div style="display:grid;gap:6px;margin-top:8px">' +
'<div style="display:flex;gap:6px"><input id="post-find" placeholder="To: a dreamer\'s name or a shop" style="flex:1" value="' + esc(POST.to ? POST.to.name : "") + '"><button class="btn" data-p="find">Find</button></div>' +
(POST.found.length ? '<div>' + POST.found.map(function (f, i) { return '<button class="btn" data-p="pick:' + i + '" style="margin:2px">' + esc(f.name) + ' ' + pDim(f.kind === "shop" ? "shop" : "dreamer") + '</button>'; }).join("") + '</div>' : '') +
(POST.to ? '<div>' + pDim("To") + ' <b>' + esc(POST.to.name) + '</b></div>' : '') +
(shops.length ? '<div>' + pDim("From") + ' <select id="post-from"><option value="">yourself</option>' + shops.map(function (s) { return '<option value="' + s.id + '">' + esc(s.name) + '</option>'; }).join("") + '</select></div>' : '') +
'<input id="post-subj" placeholder="Subject" maxlength="120">' +
'<textarea id="post-body" rows="6" placeholder="Dear…" maxlength="4000"></textarea>' +
'<div><button class="btn" data-p="send">Post it</button></div></div>';
},
function (d) {
var shops = d.shops || [], h = "";
if (!POST.shop && shops.length)
POST.shop = shops[0].id;
h += pDim("Write to the people who bought from your business, for example when an order is ready.") +
'<div style="margin:6px 0">' + pDim("Business") + ' <select id="post-shop">' + shops.map(function (s) { return '<option value="' + s.id + '"' + (s.id === POST.shop ? ' selected' : '') + '>' + esc(s.name) + '</option>'; }).join("") + '</select></div>';
var c = POST.cust;
if (!c) {
postCust();
return h + pDim("Reading your sales book…");
}
if (!c.length)
return h + pDim("Nobody has bought from it yet.");
c.forEach(function (x) {
h += pRow('<b>' + esc(x.name || "a dreamer") + '</b> ' + pDim(x.bought + " bought"), '<button class="btn" data-p="ready:' + x.id + '">Order ready</button> <button class="btn" data-p="note:' + x.id + '">Write</button>');
});
return h;
},
function () {
var r = POST.round;
if (!r) {
cityRpc("mail_round", {}).then(function (o) { POST.round = o; postPaint(); }).catch(function (e) { POST.round = { ok: false, say: postErr(e) }; postPaint(); });
return pDim("Opening the bag…");
}
if (!r.ok)
return pDim(esc(r.say || "") + " Take a letter carrier or postman post on the job board, at the Post Office.");
var h = pDim("The letters in the bag. Take each one to its address and put it in the box; with nobody on the round, a stand-in carrier takes it within a few minutes.");
if (!(r.letters || []).length)
h += '<div style="margin-top:6px">' + pDim("The bag is empty.") + '</div>';
(r.letters || []).forEach(function (l) {
h += pRow('#' + l.id + ' to <b>' + esc(l.to || "") + '</b> ' + pDim(esc(l.address || "")), (l.x != null ? '<button class="btn" data-p="way:' + l.id + '">The way</button> ' : '') + '<button class="btn" data-p="deliver:' + l.id + '">In the box</button>');
});
return h;
},
function (e) {
var b = e.target && e.target.closest ? e.target.closest("[data-p]") : null;
if (!b)
return;
var a = b.getAttribute("data-p").split(":");
if (a[0] === "x") {
POST.open = false;
postPaint();
return;
}
if (a[0] === "tab") {
POST.tab = a[1];
POST.msg = "";
POST.reading = null;
if (a[1] === "round")
POST.round = null;
if (a[1] === "cust")
POST.cust = null;
postPaint();
return;
}
if (a[0] === "find")
return postFind();
if (a[0] === "pick") {
POST.to = POST.found[+a[1]];
POST.found = [];
postPaint();
return;
}
if (a[0] === "read")
return cityRpc("mail_read", { p_id: +a[1] }).then(function (r) { if (r && r.ok) {
POST.reading = r;
postLoad();
}
else {
POST.msg = (r && r.say) || "";
postPaint();
} }).catch(function (err) { POST.msg = postErr(err); postPaint(); });
if (a[0] === "back") {
POST.reading = null;
postPaint();
return;
}
if (a[0] === "reply") {
var r = POST.reading;
POST.to = { kind: "dreamer", id: r.from_user, name: r.from };
POST.reading = null;
POST.tab = "write";
postPaint();
var s = document.getElementById("post-subj");
if (s)
s.value = "Re: " + (r.subject || "");
return;
}
if (a[0] === "send") {
if (!POST.to) {
POST.msg = "Who is it for? Find them first.";
postPaint();
return;
}
var fs = document.getElementById("post-from");
return postSend(POST.to.kind === "dreamer" ? POST.to.id : null, POST.to.kind === "shop" ? +POST.to.id : null, (document.getElementById("post-subj") || {}).value, (document.getElementById("post-body") || {}).value, fs && fs.value ? +fs.value : null);
}
if (a[0] === "ready" || a[0] === "note") {
var shop = (POST.data.shops || []).filter(function (s) { return s.id === POST.shop; })[0], nm = shop ? shop.name : "your shop";
var body = a[0] === "ready" ? prompt("The note (it goes with the mail carrier):", "Your order is ready to collect at " + nm + ". Thank you!") : prompt("Your letter:", "");
if (!body)
return;
return postSend(a[1], null, a[0] === "ready" ? "Your order is ready" : "A note from " + nm, body, POST.shop);
}
if (a[0] === "way") {
var L = ((POST.round && POST.round.letters) || []).filter(function (x) { return x.id === +a[1]; })[0];
if (L && L.x != null) {
guideTo = { key: L.address, x: L.x, z: L.z };
setStatus("<b>" + esc(L.address) + "</b>: follow the pointer at the top of the screen.");
}
return;
}
if (a[0] === "deliver")
return postSay(cityRpc("mail_deliver", { p_id: +a[1] }), function () { POST.round = null; });
},
function () {
var g = new THREE.Group(), wood = new THREE.MeshLambertMaterial({ color: 0x5A4030 }), box = new THREE.MeshLambertMaterial({ color: 0x2E4A6A }), red = new THREE.MeshLambertMaterial({ color: 0xC0302A });
var post = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.05, 0.1), wood);
post.position.y = 0.52;
g.add(post);
var b = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.3, 0.5), box);
b.position.y = 1.18;
g.add(b);
var top = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.5, 12, 1, false, 0, Math.PI), box);
top.rotation.z = Math.PI / 2;
top.rotation.y = Math.PI / 2;
top.position.y = 1.33;
g.add(top);
var flag = new THREE.Group();
flag.position.set(0.19, 1.2, -0.1);
var arm = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.3, 0.03), red);
arm.position.y = 0.12;
flag.add(arm);
var pen = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.1, 0.14), red);
pen.position.set(0, 0.24, 0.06);
flag.add(pen);
g.add(flag);
g.userData.flag = flag;
g.userData.eye = "mail";
flag.rotation.x = Math.PI / 2;
return g;
},
function () {
var m = MB.near;
if (!m || MB.busy)
return;
var b = m.userData.box;
MB.busy = true;
cityRpc("mailbox_at", { p_x: b.x, p_z: b.z }).then(function (o) {
MB.busy = false;
if (!o || !o.ok)
return setStatus(esc((o && o.say) || "The mailbox will not open."));
if (o.mine) {
POST.open = true;
POST.tab = "box";
GAZ.open = false;
gazPaint();
postLoad();
postPaint();
return setStatus("<b>Your mailbox</b>" + (o.waiting ? ": " + o.waiting + " waiting." : ": nothing new."));
}
if (!o.owned)
return setStatus(esc(o.say || "An empty mailbox: nobody lives here yet."));
if (!confirm("This is " + (o.owner_name ? o.owner_name + "'s" : "somebody else's") + " mailbox (" + (o.name || "") + ").\n\nOpening other people's mail is a crime in Somnucor: the Dragon Corp files a charge with the Courthouse.\n\nOpen it anyway?"))
return;
cityRpc("mail_tamper", { p_x: b.x, p_z: b.z }).then(function (t) { setStatus("<b style='color:#C0603A'>" + esc((t && t.say) || "") + "</b>"); }).catch(function (e) { setStatus(esc(postErr(e))); });
}).catch(function (e) { MB.busy = false; setStatus(esc(postErr(e))); });
},
function () {
cityRpc("gazette_today", {}).then(function (d) {
GAZ.data = d;
gazPaint();
if (d && d.role === "editor")
cityRpc("gazette_desk", {}).then(function (x) { GAZ.desk = x; gazPaint(); }).catch(function () { });
}).catch(function (e) { GAZ.data = { ok: false, say: /function|404|PGRST|does not exist/i.test(String(e && e.message)) ? "The Gazette goes to press soon." : String(e.message) }; gazPaint(); });
},
function () {
var el = document.getElementById("gaz-panel");
if (!el) {
if (!document.body)
return;
el = document.createElement("div");
el.id = "gaz-panel";
el.style.cssText = "position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:62;width:min(760px,calc(100vw - 24px));max-height:88vh;overflow:auto;background:#F2EAD6;color:#1E1A14;border:1px solid #8A7A5A;border-radius:3px;padding:16px 20px;font:15px Georgia,'Times New Roman',serif;line-height:1.45;box-shadow:0 10px 40px rgba(0,0,0,.6)";
document.body.appendChild(el);
el.addEventListener("click", gazClick);
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
}
if (!GAZ.open) {
el.style.display = "none";
return;
}
el.style.display = "block";
var d = GAZ.data, X = '<div style="text-align:right"><button class="btn" data-g="x" style="background:#1E1A14;color:#F2EAD6">Close</button></div>';
if (!d) {
el.innerHTML = X + "<i>The presses are running…</i>";
return;
}
if (!d.ok) {
el.innerHTML = X + "<i>" + esc(d.say || "") + "</i>";
return;
}
var rule = '<div style="border-top:3px double #1E1A14;margin:8px 0"></div>', sec = function (t) { return '<div style="font:bold 12px Georgia,serif;letter-spacing:.18em;text-transform:uppercase;border-bottom:1px solid #1E1A14;margin:14px 0 6px;padding-bottom:2px">' + t + '</div>'; };
var h = X + '<div style="text-align:center;font:bold clamp(26px,6vw,46px)/1 \'Old English Text MT\',\'UnifrakturMaguntia\',Georgia,serif;letter-spacing:.02em">' + esc(d.name) + '</div>' +
'<div style="display:flex;justify-content:space-between;font-size:12px;margin-top:6px;flex-wrap:wrap;gap:6px"><span>' + esc(gazDate(d.date)) + '</span><span>' + esc(d.press) + '</span><span>One copper</span></div>' + rule;
(d.headlines || []).forEach(function (a, i) {
h += '<div style="font:bold ' + (i ? 20 : 28) + 'px/1.15 Georgia,serif;margin:6px 0 4px">' + esc(a.title) + '</div>' +
(a.body ? '<div style="white-space:pre-wrap;' + (i ? '' : 'font-size:16px;') + '">' + esc(a.body) + '</div>' : '') + '<div style="font-size:12px;font-style:italic;margin-top:2px">' + esc(a.by || "") + '</div>';
});
var c = d.city || {};
h += sec("The city in figures") + '<div style="display:flex;gap:16px;flex-wrap:wrap;font-size:14px">' +
'<span>Treasury: <b>' + Number(c.treasury || 0).toLocaleString() + ' gold</b></span><span>At work: <b>' + (c.at_work || 0) + '</b></span><span>Dreamers\' businesses: <b>' + (c.businesses || 0) + '</b></span><span>Goods at the warehouse: <b>' + Number(c.goods || 0).toLocaleString() + '</b></span><span>Letters today: <b>' + (c.letters || 0) + '</b></span></div>';
h += sec("Major updates");
if (!(d.updates || []).length)
h += '<i>No news is good news.</i>';
(d.updates || []).forEach(function (u) { h += '<div style="margin:5px 0"><b>' + esc(u.title) + '</b>' + (u.body ? ' ' + esc(u.body) : '') + '</div>'; });
h += sec("Crime and the courts");
if (!(d.crime || []).length)
h += '<i>The Courthouse had a quiet week.</i>';
(d.crime || []).forEach(function (x) {
var st = { filed: "charged", hearing: "before the court", guilty: "found guilty", not_guilty: "found not guilty", dismissed: "case dismissed" }[x.status] || String(x.status || "").replace(/_/g, " ");
h += '<div style="margin:5px 0"><b>' + esc(x.who) + '</b>, ' + esc(st) + ': ' + esc(x.charge) + (x.status === "guilty" ? (x.hours ? ' · ' + x.hours + ' hours' : '') + (x.fine ? ' · fined ' + x.fine + ' gold' : '') : '') + (x.note ? '. <i>' + esc(x.note) + '</i>' : '') + '</div>';
});
if (d.tickets)
h += '<div style="margin:5px 0;font-size:14px">The Dragon Corp issued <b>' + d.tickets + '</b> traffic ticket' + (d.tickets === 1 ? '' : 's') + ' this week.</div>';
var bySec = {};
(d.articles || []).forEach(function (a) { (bySec[a.section] = bySec[a.section] || []).push(a); });
var names = { city: "About the city", crime: "From the crime desk", business: "Business", notices: "Notices", letters: "Letters to the editor" };
Object.keys(names).forEach(function (k) {
if (!bySec[k])
return;
h += sec(names[k]);
bySec[k].forEach(function (a) { h += '<div style="margin:6px 0"><b>' + esc(a.title) + '</b><div style="white-space:pre-wrap">' + esc(a.body || "") + '</div><div style="font-size:12px;font-style:italic">' + esc(a.by || "") + '</div></div>'; });
});
if (d.role) {
h += sec(d.role === "editor" ? "The editor's desk" : "Write for the Gazette") +
'<div style="display:grid;gap:6px"><select id="gaz-sec"><option value="headline">Headline</option><option value="updates">Major update</option><option value="city">About the city</option><option value="crime">Crime</option><option value="business">Business</option><option value="notices">Notice</option><option value="letters">Letter to the editor</option></select>' +
'<input id="gaz-title" placeholder="The headline" maxlength="140"><textarea id="gaz-body" rows="5" maxlength="6000" placeholder="The piece"></textarea>' +
'<div><button class="btn" data-g="write" style="background:#1E1A14;color:#F2EAD6">' + (d.role === "editor" ? "Print it" : "Send to the editor") + '</button> <span>' + esc(GAZ.msg || "") + '</span></div></div>';
var dk = GAZ.desk;
if (dk && dk.ok && (dk.drafts || []).length) {
h += '<div style="margin-top:8px"><b>Waiting for you:</b></div>';
dk.drafts.forEach(function (a) {
h += '<div style="margin:6px 0;border-left:3px solid #8A7A5A;padding-left:8px"><b>' + esc(a.title) + '</b> <i>(' + esc(a.section) + ', by ' + esc(a.by) + ')</i><div style="white-space:pre-wrap">' + esc(a.body) + '</div>' +
'<button class="btn" data-g="pass:' + a.id + '">Pass it</button> <button class="btn" data-g="spike:' + a.id + '">Spike it</button></div>';
});
}
}
else
h += '<div style="margin-top:14px;font-size:12px;font-style:italic">Written by the editor and reporters of the Chronicle Press. Take a post there from the job board to write for it.</div>';
el.innerHTML = h;
},
function (e) {
var b = e.target && e.target.closest ? e.target.closest("[data-g]") : null;
if (!b)
return;
var a = b.getAttribute("data-g").split(":");
if (a[0] === "x") {
GAZ.open = false;
gazPaint();
return;
}
if (a[0] === "write") {
var v = function (id) { var x = document.getElementById(id); return x ? x.value : ""; };
return cityRpc("gazette_write", { p_section: v("gaz-sec"), p_title: v("gaz-title"), p_body: v("gaz-body") }).then(function (o) { GAZ.msg = (o && o.say) || ""; gazLoad(); }).catch(function (err) { GAZ.msg = String(err.message); gazPaint(); });
}
if (a[0] === "pass" || a[0] === "spike")
return cityRpc("gazette_publish", { p_id: +a[1], p_ok: a[0] === "pass" }).then(function (o) { GAZ.msg = (o && o.say) || ""; gazLoad(); });
}
];
});
