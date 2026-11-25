/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(349, function () {
"use strict";
return [
function (h, big) {
try {
if (typeof setStatus === "function")
setStatus(h);
}
catch (e) { }
if (!big)
return;
var el = document.getElementById("erd-toast");
if (!el) {
el = document.createElement("div");
el.id = "erd-toast";
el.style.cssText = "position:fixed;z-index:60;left:50%;top:30%;transform:translateX(-50%);width:max-content;max-width:min(520px,calc(100vw - 32px));padding:10px 16px;border-radius:8px;" +
"background:rgba(14,16,28,.92);border:1px solid #C9A85A;color:#F2E6C4;font:500 14px var(--sans,system-ui);text-align:center;pointer-events:none;opacity:0;transition:opacity 1s ease";
document.body.appendChild(el);
}
el.innerHTML = h;
setTimeout(function () { el.style.opacity = "1"; }, 30);
clearTimeout(ERD.toastT);
ERD.toastT = setTimeout(function () { el.style.opacity = "0"; }, 6000);
},
function () {
if (ERD.places && Date.now() - ERD.placesAt < 3000 && ERD.placesW === erdWorld())
return ERD.places;
var L = [];
try {
if (typeof pfindPlaces === "function" && !store.inside)
L = pfindPlaces().filter(function (p) { return p && p.name && p.name.length < 70 && !/^(lot|plot)\s*\d/i.test(p.name); });
}
catch (e) {
L = [];
}
ERD.places = L;
ERD.placesAt = Date.now();
ERD.placesW = erdWorld();
return L;
},
function (offer, from) {
var L = erdPlaces().filter(function (p) { return p.d >= 40 && p.d <= 1800 && p.name !== from; });
var B = L.filter(function (p) { return p.kind === "place"; });
if (B.length >= 3)
L = B;
if (!L.length)
L = erdPlaces().filter(function (p) { return p.d >= 15 && p.name !== from; });
if (!L.length)
return null;
return L[erdHash(offer.seed) % L.length];
},
function () {
var L = erdLocal(), live = {};
((ERD.board && ERD.board.runs) || []).forEach(function (r) { live[r.id] = 1; });
Object.keys(L).forEach(function (k) { if (!live[k])
delete L[k]; });
erdLocalSave();
if (ERD.guide && !live[ERD.guide]) {
ERD.guide = null;
if (typeof guideTo !== "undefined" && guideTo && guideTo.erd)
guideTo = null;
}
},
function (giver) {
var w = erdWorld();
return erdRpc("errand_offers", { p_world: w, p_giver: giver }).then(function (o) {
if (o && o.ok) {
ERD.offers[w + "|" + giver] = o;
ERD.missing = false;
}
return o;
}, function (e) { if (erdMissing(e))
ERD.missing = true; return { ok: false, say: ERD.missing ? "Errands aren't open yet." : "The errand list could not be reached. Try again in a moment." }; });
},
function (giver, slot, place) {
var w = erdWorld(), O = ERD.offers[w + "|" + giver];
if (!O)
return;
var o = (O.offers || [])[slot];
if (!o)
return;
var dest = o.kind === "fetch" ? null : erdDestFor(o, place), words = erdOfferWords(w, giver, o, dest);
if (o.kind !== "fetch" && !dest) {
ERD.msg = "Nobody here needs anything taken anywhere just now: there is nowhere named close enough.";
return erdPaint();
}
var P = camera.position;
erdRpc("errand_take", { p_world: w, p_giver: giver, p_slot: slot, p_title: words || "", p_dest: dest ? dest.name : null, p_dist: dest ? Math.round(dest.d) : null }).then(function (r) {
ERD.msg = (r && r.say) || "";
if (r && r.ok && r.run) {
var L = erdLocal();
L[r.run.id] = { w: w, leg: 1, gx: P.x, gz: P.z, x: dest ? dest.x : null, z: dest ? dest.z : null };
erdLocalSave();
if (dest) {
ERD.guide = r.run.id;
erdGuide(true);
ERD.msg += " The pointer at the top shows the way to " + dest.name + ".";
}
erdSay("📜 <b>" + erdEsc(r.run.title) + "</b>" + (dest ? " · follow the pointer" : ""));
}
return Promise.all([erdLoad(true), erdOffers(giver)]);
}, function (e) { ERD.msg = erdMissing(e) ? "Errands aren't open yet." : "That didn't go through. Try again."; }).then(function () { erdPaint(); });
},
function (id) {
return erdRpc("errand_finish", { p_run: id }).then(function (r) {
var say = (r && r.say) || "";
if (r && r.ok) {
var L = erdLocal();
delete L[id];
erdLocalSave();
if (ERD.guide === id) {
ERD.guide = null;
if (typeof guideTo !== "undefined" && guideTo && guideTo.erd)
guideTo = null;
}
if (typeof playTone === "function")
try {
playTone(660, 0.25);
}
catch (e) { }
try {
if (typeof bkpLoad === "function")
bkpLoad();
}
catch (e) { }
}
ERD.msg = say;
erdSay("📜 " + erdEsc(say), !ERD.open);
return erdLoad(true);
}, function () { ERD.msg = "That didn't go through. Try again."; }).then(function () { erdPaint(); });
},
function () {
var w = erdWorld(), P = camera.position, best = null;
erdRuns().forEach(function (r) {
if (best || r.kind === "fetch" || r.world !== w)
return;
var L = erdLocal()[r.id] || {};
if (L.leg !== 2 && erdInsideIs(r.dest)) {
best = { r: r, leg: 1 };
return;
}
if (store.inside)
return;
var T = erdTarget(r);
if (!T)
return;
if (Math.hypot(P.x - T.x, P.z - T.z) < 16)
best = { r: r, leg: L.leg === 2 ? 2 : 1 };
});
return best;
},
function () {
var n = ERD.near;
if (!n)
return;
var r = n.r, L = erdLocal();
L[r.id] = L[r.id] || { w: r.world, leg: 1 };
if (r.kind === "word" && n.leg === 1) {
L[r.id].leg = 2;
erdLocalSave();
if (L[r.id].gx == null) {
var P = camera.position;
L[r.id].gx = P.x;
L[r.id].gz = P.z;
}
ERD.guide = r.id;
erdGuide(true);
if (typeof playTone === "function")
try {
playTone(520, 0.2);
}
catch (e) { }
erdSay("📜 They hear you out and give you their answer. <b>Take it back to " + erdEsc(r.giver) + "</b>: follow the pointer.", true);
erdPromptOff();
return;
}
erdPromptOff();
erdFinish(r.id);
},
function (tab, giver) {
ERD.open = true;
ERD.tab = tab || ERD.tab || "here";
ERD.card = giver ? { giver: giver.name, place: giver.place || "" } : null;
ERD.msg = "";
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
erdPaint();
if (!erdSigned())
return;
var jobs = [erdLoad(true)];
if (ERD.card)
jobs.push(erdOffers(ERD.card.giver));
else if (ERD.tab === "here" && erdWorld() !== "dream")
erdFolk(erdWorld())[0].forEach(function (g) { jobs.push(erdOffers(g)); });
Promise.all(jobs).then(function () { erdPaint(); });
},
function (g) {
var B = ERD.board || {};
if (!(+g))
return "";
if (B.keeper)
return "<span style='color:var(--dim)'>(the Keeper is never paid)</span>";
if (B.paid === false)
return "<span style='color:var(--dim)'>(gold goes to dreamers whose dues are paid; you still get the gift)</span>";
return "🪙 " + erdN(g) + " gold";
},
function (world, giver, place) {
var O = ERD.offers[world + "|" + giver];
if (!O)
return '<div style="color:var(--dim);margin:6px 0">Asking ' + erdEsc(giver) + '…</div>';
if (!O.ok)
return '<div style="color:var(--dim);margin:6px 0">' + erdEsc(O.say || "") + '</div>';
return (O.offers || []).map(function (o) {
var dest = o.kind === "fetch" ? null : erdDestFor(o, place), words = erdOfferWords(world, giver, o, dest);
if (!words)
return "";
var run = o.run ? erdRuns().filter(function (r) { return r.id === o.run; })[0] : null;
var pay = o.kind === "fetch" ? erdGoldLine(o.gold) : (dest ? erdGoldLine(o.kind === "carry" ? Math.min(80, 12 + Math.round(Math.max(30, dest.d) / 20)) : Math.min(100, 18 + Math.round(Math.max(30, dest.d) / 15))) : "");
var h = '<div style="' + ERD_ROW + '"><b>' + (o.kind === "fetch" ? "🧺 " : o.kind === "carry" ? "📦 " : "✉️ ") + erdEsc(words) + '</b>' +
(o.kind === "fetch" ? ' <span style="color:var(--dim)">(you have ' + (+o.have || 0) + ')</span>' : (dest ? ' <span style="color:var(--dim)">(' + (typeof pfindDist === "function" ? pfindDist(dest.d) : Math.round(dest.d) + " m") + ' away)</span>' : '')) +
'<div style="font-size:12px;margin-top:3px">' + [pay, "🎁 a little of what is found here, in your backpack"].filter(Boolean).join(" · ") + '</div>';
if (run)
h += (run.kind === "fetch" ? erdBtn('data-erdfin="' + run.id + '"', "Hand it over", true) : erdBtn('data-erdway="' + run.id + '"', "Show me the way")) + erdBtn('data-erddrop="' + run.id + '"', "Give it up");
else if (o.taken)
h += '<div style="color:var(--dim);font-size:12px;margin-top:4px">' + (o.status === "done" ? "✓ Done today. More tomorrow." : "Given up today.") + '</div>';
else
h += erdBtn('data-erdtake="' + o.slot + '" data-erdg="' + erdEsc(giver) + '" data-erdp="' + erdEsc(place || "") + '"', "Take it", true);
return h + '</div>';
}).join("");
},
function (r) {
var here = r.world === erdWorld(), L = erdLocal()[r.id] || {};
var state = r.kind === "fetch" ? ("Bring " + r.need_n + " × " + String(r.need_name || "").toLowerCase() + " · you have " + (+r.have || 0) + " · hand it over to anyone in " + erdWorldName(r.world)) :
r.kind === "carry" ? ("Take it to " + r.dest + " in " + erdWorldName(r.world)) : (L.leg === 2 ? "Take the answer back to " + r.giver : "Go to " + r.dest + " in " + erdWorldName(r.world) + ", then come back");
var h = '<div style="' + ERD_ROW + '"><b>' + (r.kind === "fetch" ? "🧺 " : r.kind === "carry" ? "📦 " : "✉️ ") + erdEsc(r.title) + '</b> <span style="color:var(--dim)">for ' + erdEsc(r.giver) + '</span>' +
'<div style="font-size:12px;margin-top:3px">' + erdEsc(state) + (+r.gold ? " · " + erdGoldLine(r.gold) : "") + '</div>';
if (r.kind === "fetch") {
if (here)
h += erdBtn('data-erdfin="' + r.id + '"', "Hand it over", true);
}
else if (here && !store.inside)
h += erdBtn('data-erdway="' + r.id + '"', ERD.guide === r.id ? "✓ Pointer on" : "Show me the way");
return h + erdBtn('data-erddrop="' + r.id + '"', "Give it up") + '</div>';
},
function (p, as) {
var where = [p.place, p.world ? erdWorldName(p.world) : ""].filter(Boolean).join(", ");
var want = p.kind === "bring" ? "Bring " + p.need_n + " × " + String(p.need_name || "").toLowerCase() + (p.have != null ? " (you have " + p.have + ")" : "") : "";
var rew = [+p.gold ? "🪙 " + erdN(p.gold) + " gold" : "", p.reward_kind ? "🎁 " + p.reward_n + " × " + String(p.reward_name || "").toLowerCase() : ""].filter(Boolean).join(" + ");
var st = { open: "Open", taken: "Being run" + (p.runner_name ? " by " + p.runner_name : ""), marked: (p.runner_name || "The runner") + " says it is done", paid: "Done and paid", cancelled: "Taken down" }[p.status] || p.status;
var h = '<div style="' + ERD_ROW + (p.for_me && p.status === "open" ? ";border-color:#C9A85A" : "") + '">' + (p.for_me && p.status === "open" ? '<div style="color:#E8C977;font-size:12px">📨 Sent to you</div>' : "") +
'<b>' + (p.biz ? "🏪 " : "🧑 ") + erdEsc(p.title) + '</b> <span style="color:var(--dim)">from ' + erdEsc(p.by) + (p.for_name && !p.for_me ? " to " + erdEsc(p.for_name) : "") + '</span>' +
(p.body ? '<div style="margin-top:3px">' + erdEsc(p.body) + '</div>' : "") +
'<div style="font-size:12px;margin-top:3px">' + [want, where ? "📍 " + where : "", rew].filter(Boolean).map(erdEsc).join(" · ") + '</div>';
if (as !== "open")
h += '<div style="font-size:12px;margin-top:3px;color:#C9D8B0">' + erdEsc(st) + '</div>';
if (p.runner_note && as === "mine")
h += '<div style="font-size:12px;color:var(--dim)">They say: “' + erdEsc(p.runner_note) + '”</div>';
if (p.poster_note && as === "run" && p.status === "taken")
h += '<div style="font-size:12px;color:#F2D684">Sent back: “' + erdEsc(p.poster_note) + '”</div>';
if (as === "open")
h += erdBtn('data-erdrun="' + p.id + '"', "Run it", true);
if (as === "run" && p.status === "taken") {
h += (p.kind === "bring" ? erdBtn('data-erdpdone="' + p.id + '"', "Hand it over", true) : erdBtn('data-erdpmark="' + p.id + '"', "Say it's done", true)) + erdBtn('data-erdpleave="' + p.id + '"', "Give it back");
}
if (as === "mine") {
if (p.status === "marked")
h += erdBtn('data-erdpok="' + p.id + '"', "Pay them", true) + erdBtn('data-erdpno="' + p.id + '"', "Not done yet");
if (p.status === "open" || p.status === "taken")
h += erdBtn('data-erdpcancel="' + p.id + '"', "Take it down");
}
return h + '</div>';
},
function () {
var B = ERD.board || {}, w = erdWorld();
var worlds = (typeof DGR_WORLDS !== "undefined" ? DGR_WORLDS : [["city", "Somnucor"]]).filter(function (r) { return r[0] !== "dream"; });
var places = erdPlaces().slice(0, 150);
if (!B.paid)
return '<div style="' + ERD_ROW + '">Posting an errand is for dreamers whose dues are paid. Anyone can run one.</div>';
return '<div style="display:grid;gap:7px;margin-top:6px">' +
'<label>What is it? <input id="erd-f-title" maxlength="80" placeholder="Fetch timber for the bakery ovens" style="' + ERD_IN + '"></label>' +
'<label>Anything to add <textarea id="erd-f-body" maxlength="400" rows="2" style="' + ERD_IN + '"></textarea></label>' +
'<label>Kind <select id="erd-f-kind" style="' + ERD_IN + '"><option value="task">Do something for me (I say when it is done)</option><option value="bring">Bring me something</option></select></label>' +
'<div id="erd-f-need" style="display:none;gap:6px;grid-template-columns:1fr 90px"><select id="erd-f-nk" style="' + ERD_IN + '">' + (B.kinds || []).map(function (k) { return '<option value="' + erdEsc(k.kind) + '">' + erdEsc(k.name) + '</option>'; }).join("") + '</select><input id="erd-f-nn" type="number" min="1" max="100" value="3" style="' + ERD_IN + '"></div>' +
'<label>Where <select id="erd-f-world" style="' + ERD_IN + '"><option value="">Anywhere</option>' + worlds.map(function (r) { return '<option value="' + r[0] + '"' + (r[0] === w ? " selected" : "") + '>' + erdEsc(r[1]) + '</option>'; }).join("") + '</select></label>' +
'<label>Place (if any) <input id="erd-f-place" list="erd-f-pl" maxlength="80" style="' + ERD_IN + '"><datalist id="erd-f-pl">' + places.map(function (p) { return '<option value="' + erdEsc(p.name) + '">'; }).join("") + '</datalist></label>' +
'<label>Gold for it <input id="erd-f-gold" type="number" min="0" value="50" style="' + ERD_IN + '"></label>' +
'<div style="display:grid;gap:6px;grid-template-columns:1fr 90px"><select id="erd-f-rk" style="' + ERD_IN + '"><option value="">And nothing from my backpack</option>' + (B.stock || []).map(function (s) { return '<option value="' + erdEsc(s.kind) + '">And ' + erdEsc(s.name) + ' (you have ' + (+s.n) + ')</option>'; }).join("") + '</select><input id="erd-f-rn" type="number" min="1" value="1" style="' + ERD_IN + '"></div>' +
((B.biz || []).length ? '<label>In whose name <select id="erd-f-biz" style="' + ERD_IN + '"><option value="">My own</option>' + (B.biz || []).map(function (b) { return '<option value="' + (+b.id) + '">' + erdEsc(b.name) + '</option>'; }).join("") + '</select></label>' : "") +
'<label>For one dreamer only (their name, or leave empty for anyone) <input id="erd-f-for" maxlength="40" style="' + ERD_IN + '"></label>' +
'<div style="color:var(--dim);font-size:12px">The gold and anything from your backpack are held as soon as it is posted, and go to whoever does it. Take it down before anyone runs it and they come back.</div>' +
'<div>' + erdBtn('data-erdpost="1"', "Post the errand", true) + '</div></div>';
},
function () {
var el = document.getElementById("erd-box");
if (!ERD.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "erd-box";
el.style.cssText = ERD_BOX;
el.addEventListener("keydown", function (e) { e.stopPropagation(); if (e.key === "Escape")
erdClose(); });
el.addEventListener("click", erdClick);
el.addEventListener("change", function (e) { if (e.target && e.target.id === "erd-f-kind") {
var n = document.getElementById("erd-f-need");
if (n)
n.style.display = e.target.value === "bring" ? "grid" : "none";
} });
document.body.appendChild(el);
}
el.style.display = "block";
var B = ERD.board, w = erdWorld(), h = "";
var title = ERD.card ? "📜 " + erdEsc(ERD.card.giver) + "'s errands" : "📜 Errands";
h += '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><b style="font:500 16px var(--serif,Georgia);color:#F0E0B8">' + title + '</b><button class="btn" data-erd="close">Close</button></div>';
if (!erdSigned()) {
el.innerHTML = h + '<div style="margin-top:10px">Sign in to run errands: what they earn goes to your backpack.</div>';
return;
}
if (ERD.missing) {
el.innerHTML = h + '<div style="margin-top:10px">Errands aren\'t open yet. They will be soon.</div>';
return;
}
if (B && B.on === false && !B.keeper) {
el.innerHTML = h + '<div style="margin-top:10px">Nobody has errands to give just now.</div>';
return;
}
if (!ERD.card) {
var tabs = [["here", "Here"], ["posts", "Dreamers and businesses"], ["yours", "Yours"], ["post", "Post one"]];
var forMe = B ? (B.posts || []).filter(function (p) { return p.for_me; }).length : 0, ask = B ? (B.mine || []).filter(function (p) { return p.status === "marked"; }).length : 0;
h += '<div style="display:flex;flex-wrap:wrap;gap:5px;margin:8px 0 2px">' + tabs.map(function (t) {
var badge = t[0] === "posts" && forMe ? " (" + forMe + " for you)" : t[0] === "yours" && ask ? " (" + ask + " to answer)" : "";
return '<button class="btn' + (ERD.tab === t[0] ? " primary" : "") + '" data-erdtab="' + t[0] + '" style="padding:3px 9px">' + t[1] + badge + '</button>';
}).join("") + '</div>';
}
if (ERD.msg)
h += '<div style="margin:8px 0;padding:6px 9px;border-left:3px solid #C9A85A;background:rgba(201,168,90,.08)">' + erdEsc(ERD.msg) + '</div>';
if (!B) {
el.innerHTML = h + '<div style="color:var(--dim);margin-top:8px">Looking…</div>';
return;
}
if (B.today)
h += '<div style="color:var(--dim);font-size:12px;margin:4px 0">Today: ' + (+B.today.n) + ' of ' + (+B.today.per_day) + ' errands for the folk of the worlds' + (B.paid && !B.keeper ? ", " + erdN(B.today.gold) + " of " + erdN(B.today.gold_per_day) + " gold" : "") + '.</div>';
if (ERD.card) {
h += erdOfferHtml(w, ERD.card.giver, ERD.card.place);
var other = erdRuns().filter(function (r) { return r.world === w && r.kind === "fetch" && r.giver !== ERD.card.giver; });
if (other.length)
h += '<div style="margin-top:10px;color:#F0E0B8">Things you are bringing others here (anyone will pass them on):</div>' + other.map(erdRunHtml).join("");
var biz = (B.posts || []).filter(function (p) { return p.biz && ERD.card.place && p.place === ERD.card.place; });
if (biz.length)
h += '<div style="margin-top:10px;color:#F0E0B8">Posted here by the business:</div>' + biz.map(function (p) { return erdPostHtml(p, "open"); }).join("");
h += '<div style="margin-top:8px">' + erdBtn('data-erdtab="here"', "All errands") + '</div>';
}
else if (ERD.tab === "here") {
var runs = erdRuns();
if (runs.length)
h += '<div style="margin-top:8px;color:#F0E0B8">Errands you are running (' + runs.length + ' of ' + (+B.today.running || 3) + ')</div>' + runs.map(erdRunHtml).join("");
if (w === "dream")
h += '<div style="' + ERD_ROW + '">This is a dream of your own: nobody here has errands. Every world beyond the Hall of Doors does, and so does Somnucor.</div>';
else {
h += '<div style="margin-top:10px;color:#F0E0B8">The errand board in ' + erdEsc(erdWorldName(w)) + '</div><div style="color:var(--dim);font-size:12px">Anyone you talk to has errands too: ask them, or press 📜 Any errands? under the talk box.</div>';
erdFolk(w)[0].forEach(function (g) { h += '<div style="margin-top:8px"><b>' + erdEsc(g) + '</b></div>' + erdOfferHtml(w, g, ""); });
}
}
else if (ERD.tab === "posts") {
var P = B.posts || [];
h += P.length ? P.map(function (p) { return erdPostHtml(p, "open"); }).join("") : '<div style="' + ERD_ROW + '">No dreamer or business has an errand up just now. Post one of your own?</div>';
}
else if (ERD.tab === "yours") {
var R = B.running || [], M = B.mine || [];
h += '<div style="margin-top:8px;color:#F0E0B8">Errands you are running for others</div>' + (R.length ? R.map(function (p) { return erdPostHtml(p, "run"); }).join("") : '<div style="color:var(--dim)">None.</div>');
h += '<div style="margin-top:10px;color:#F0E0B8">Errands you posted</div>' + (M.length ? M.map(function (p) { return erdPostHtml(p, "mine"); }).join("") : '<div style="color:var(--dim)">None.</div>');
h += '<div id="erd-note" style="display:none;margin-top:8px"><input id="erd-note-i" maxlength="200" placeholder="A word about it (optional)" style="' + ERD_IN + '"><div>' + erdBtn('data-erdnote="go"', "Send", true) + erdBtn('data-erdnote="no"', "Never mind") + '</div></div>';
}
else if (ERD.tab === "post")
h += erdPostForm();
var top = el.scrollTop;
el.innerHTML = h;
el.scrollTop = top;
},
function (e) {
var t = e.target && e.target.closest ? e.target.closest("button") : null;
if (!t)
return;
var a = function (n) { return t.getAttribute(n); };
if (a("data-erd") === "close")
return erdClose();
if (a("data-erdtab")) {
ERD.card = null;
ERD.msg = "";
return erdOpen(a("data-erdtab"));
}
if (a("data-erdtake") != null)
return erdTake(a("data-erdg"), +a("data-erdtake"), a("data-erdp"));
if (a("data-erdfin"))
return erdFinish(+a("data-erdfin"));
if (a("data-erddrop"))
return erdDrop(+a("data-erddrop"));
if (a("data-erdway")) {
ERD.guide = +a("data-erdway");
erdGuide(true);
ERD.msg = "Follow the pointer at the top of the screen.";
return erdPaint();
}
if (a("data-erdrun"))
return erdAfter(erdRpc("errand_take_post", { p_id: +a("data-erdrun") })).then(function () { ERD.tab = "yours"; erdPaint(); });
if (a("data-erdpdone"))
return erdAfter(erdRpc("errand_done_post", { p_id: +a("data-erdpdone"), p_note: "" }));
if (a("data-erdpmark"))
return erdNoteAsk("mark", +a("data-erdpmark"));
if (a("data-erdpno"))
return erdNoteAsk("no", +a("data-erdpno"));
if (a("data-erdpok"))
return erdAfter(erdRpc("errand_confirm", { p_id: +a("data-erdpok"), p_ok: true, p_note: "" }));
if (a("data-erdpleave"))
return erdAfter(erdRpc("errand_leave_post", { p_id: +a("data-erdpleave") }));
if (a("data-erdpcancel"))
return erdAfter(erdRpc("errand_cancel", { p_id: +a("data-erdpcancel") }));
if (a("data-erdnote")) {
var N = ERD.noteFor;
ERD.noteFor = null;
if (a("data-erdnote") !== "go" || !N) {
var box = document.getElementById("erd-note");
if (box)
box.style.display = "none";
return;
}
var note = (document.getElementById("erd-note-i") || {}).value || "";
if (N.kind === "mark")
return erdAfter(erdRpc("errand_done_post", { p_id: N.id, p_note: note }));
return erdAfter(erdRpc("errand_confirm", { p_id: N.id, p_ok: false, p_note: note || "Not done yet" }));
}
if (a("data-erdpost")) {
var v = function (id) { var x = document.getElementById(id); return x ? String(x.value || "").trim() : ""; };
var kind = v("erd-f-kind"), rk = v("erd-f-rk");
var args = { p_title: v("erd-f-title"), p_body: v("erd-f-body"), p_world: v("erd-f-world"), p_place: v("erd-f-place"), p_kind: kind,
p_need_kind: kind === "bring" ? v("erd-f-nk") : null, p_need_n: kind === "bring" ? Math.round(+v("erd-f-nn") || 0) : 0,
p_gold: Math.max(0, Math.round(+v("erd-f-gold") || 0)), p_reward_kind: rk || null, p_reward_n: rk ? Math.round(+v("erd-f-rn") || 0) : 0,
p_employer: v("erd-f-biz") ? +v("erd-f-biz") : null, p_for: v("erd-f-for") };
if (!args.p_title) {
ERD.msg = "Say in a few words what the errand is.";
return erdPaint();
}
return erdRpc("errand_post", args).then(function (r) {
ERD.msg = (r && r.say) || "";
if (r && r.ok) {
ERD.tab = "yours";
try {
if (typeof bkpLoad === "function")
bkpLoad();
}
catch (e) { }
}
return erdLoad(true);
}, function () { ERD.msg = "That didn't go through. Try again."; }).then(function () { erdPaint(); });
}
}
];
});
