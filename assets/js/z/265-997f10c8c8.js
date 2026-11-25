/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(265, function () {
"use strict";
return [
function (e) {
var s = new Date(evtStart(e)), en = new Date(evtEnd(e)), n = Date.now(), o = { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }, t = { hour: "2-digit", minute: "2-digit" };
if (n >= evtEnd(e))
return "Over";
if (n >= evtStart(e))
return "On now, until " + (en - n < 86400000 ? en.toLocaleTimeString([], t) : en.toLocaleString([], o));
var mins = Math.round((evtEnd(e) - evtStart(e)) / 60000), len = EVT_LENGTHS.filter(function (L) { return L[0] === mins; })[0];
return s.toLocaleString([], o) + " · " + (len ? len[1] : mins + " minutes");
},
function () {
var el = document.getElementById("evt-book");
if (el)
return el;
el = document.createElement("div");
el.id = "evt-book";
el.style.cssText = EVT_CARD;
el.style.display = "none";
document.body.appendChild(el);
["keydown", "keyup", "keypress"].forEach(function (k) { el.addEventListener(k, function (e) { e.stopPropagation(); }); });
el.addEventListener("click", function (e) { var b = e.target.closest && e.target.closest("[data-ev]"); if (!b)
return; e.preventDefault(); evtAct(b.getAttribute("data-ev"), b.getAttribute("data-evv")); });
el.addEventListener("change", function (e) { if (e.target && e.target.getAttribute && e.target.getAttribute("data-evc")) {
evtFormRead();
evtAskRead();
evtPaint();
} });
return el;
},
function (e) {
var P = e.places || [], fl = P.filter(function (p) { return p.kind === "float"; }), wk = P.filter(function (p) { return p.kind === "walk"; }), st = P.filter(function (p) { return p.kind === "stall"; }), jn = P.filter(function (p) { return p.kind === "join"; });
var s = e.spots || {}, out = [];
function nm(p) { return '<span style="display:inline-block;width:9px;height:9px;border-radius:2px;background:' + evtE(p.colour || "#C8283A") + ';margin-right:4px"></span>' + evtE(p.banner || p.business || p.who); }
if (+s.floats)
out.push("<b>Floats</b> " + fl.length + " of " + s.floats + (fl.length ? ": " + fl.map(nm).join(", ") : ""));
if (+s.walkers)
out.push("<b>Marching</b> " + wk.length + " of " + s.walkers + (wk.length ? ": " + wk.map(nm).join(", ") : ""));
if (+s.stalls)
out.push("<b>Stalls</b> " + st.length + " of " + s.stalls + (st.length ? ": " + st.map(nm).join(", ") : ""));
if (jn.length)
out.push("<b>Taking part</b> " + jn.length);
return out.length ? '<div style="margin-top:4px;font-size:13px">' + out.join("<br>") + '</div>' : "";
},
function () {
if (!EVT.board)
return '<div style="margin-top:8px">' + evtDim("Fetching what's on…") + '</div>';
var L = evtEvents().filter(function (e) { return e.status === "announced" && evtEnd(e) > Date.now(); }), k = evtKeeper(), h = "";
if (k) {
var D = evtEvents().filter(function (e) { return e.status === "draft"; });
if (D.length) {
h += evtHead("Your drafts (only you see these)");
D.forEach(function (e) { h += evtCardHtml(e, true); });
}
}
h += evtHead("What's on");
if (!L.length)
h += '<div>' + evtDim(EVT.missing ? "" : "Nothing announced just now." + (k ? " Make one under Make an event." : " The Keeper announces parades, holidays and festivals here.")) + '</div>';
L.forEach(function (e) { h += evtCardHtml(e, false); });
var past = evtEvents().filter(function (e) { return e.status === "announced" && evtEnd(e) <= Date.now(); });
if (past.length) {
h += evtHead("Just finished");
past.forEach(function (e) { h += '<div style="padding:3px 0">' + evtDim((EVT_KINDS[e.kind] || EVT_KINDS.parade)[0] + " " + evtE(e.title)) + '</div>'; });
}
return h;
},
function (e, draft) {
var ic = EVT_KINDS[e.kind] || EVT_KINDS.parade, live = evtLive(e), k = evtKeeper(), mine = evtMinePlaces(e), pal = evtPal(e);
var h = '<div style="border-top:1px solid rgba(255,255,255,.1);padding:8px 0">';
h += '<div style="display:flex;gap:8px;align-items:baseline"><b style="font-size:15px">' + ic[0] + " " + evtE(e.title) + '</b>' + (live ? '<span style="color:#9FE0A0;font-size:12px">● on now</span>' : '') + '</div>';
h += '<div style="font-size:12px">' + evtDim(ic[1] + " · " + evtE(evtWhen(e)) + " · " + evtE(evtWhere(e))) + '</div>';
h += '<div style="margin:3px 0">' + pal.slice(0, 4).map(function (c) { return '<span style="display:inline-block;width:14px;height:8px;background:' + evtHex(c) + ';margin-right:2px;border-radius:2px"></span>'; }).join("") + '</div>';
if (e.blurb)
h += '<div style="margin:3px 0">' + evtE(e.blurb) + '</div>';
h += evtPlacesHtml(e);
if (mine.length)
h += '<div style="margin-top:4px;color:#FFE7B0">' + mine.map(function (m) { return "Yours: " + evtE(evtKindWord(m.kind)) + " · " + (m.status === "approved" ? "✓ given" : m.status === "pending" ? "waiting for the Keeper" : "not this time"); }).join("<br>") + '</div>';
h += '<div style="margin-top:6px">';
if (!draft && (live || evtCity()))
h += evtB("🧭 Show the way", "way", e.id);
if (!draft && evtIn()) {
var s = e.spots || {}, can = e.open && e.kind !== "holiday" && ((+s.floats) || (+s.walkers) || (+s.stalls));
if (can)
h += evtB("Ask for a place", "ask", e.id);
if (!mine.some(function (m) { return m.kind === "join"; }))
h += evtB("🙋 Count me in", "join", e.id, true);
if (live && e.kind === "parade" && mine.some(function (m) { return m.status === "approved" && (m.kind === "walk" || m.kind === "float"); }))
h += evtB(EVT.walk && +EVT.walk.ev === +e.id ? "Step out of the parade" : "🚶 Walk in my place", "walk", e.id);
}
else if (!draft && !evtIn())
h += evtDim(" Sign in to take part.");
if (k) {
h += '<br>' + evtB("✏️ Edit", "edit", e.id, true);
if (draft)
h += evtB("📣 Announce", "announce", e.id) + evtB("▶ Start now", "start", e.id);
else if (!live)
h += evtB("▶ Start now", "start", e.id);
else
h += evtB("■ End now", "end", e.id, true);
h += evtB("Call it off", "cancel", e.id, true) + evtB("👁 Try it here", "try", e.id, true);
}
return h + '</div></div>';
},
function () {
if (!evtIn())
return '<div style="margin-top:8px">Sign in to ask for a place in a parade or a stall at a festival.</div>';
var M = (EVT.board && EVT.board.mine) || [], h = evtHead("Your places");
if (!M.length)
return h + evtDim("None yet. Ask for one under What's on.");
M.forEach(function (m) {
var e = evtById(m.event_id);
h += '<div style="border-top:1px solid rgba(255,255,255,.1);padding:6px 0"><b>' + evtE(e ? e.title : "An event") + '</b> · ' + evtE(evtKindWord(m.kind)) +
(m.kind !== "join" ? '<br><span style="display:inline-block;width:9px;height:9px;background:' + evtE(m.colour) + ';margin-right:4px"></span>“' + evtE(m.banner) + '”' + (m.business ? " for " + evtE(m.business) : "") : "") +
'<br>' + (m.status === "approved" ? '<span style="color:#9FE0A0">✓ Given by the Keeper</span>' : m.status === "pending" ? evtDim("Waiting for the Keeper") : '<span style="color:#E8A0A0">Not this time</span>') +
(m.keeper_note ? '<br><i>“' + evtE(m.keeper_note) + '”</i>' : '') + '<br>' + evtB("Take it back", "withdraw", m.id, true) + '</div>';
});
return h;
},
function (id) {
var e = evtById(id);
if (!e)
return;
var s = e.spots || {}, kind = +s.floats ? "float" : +s.walkers ? "walk" : "stall", biz = (EVT.board && EVT.board.businesses) || [];
EVT.ask = { ev: e.id, kind: kind, biz: biz.length ? String(biz[0].id) : "", banner: "", style: kind === "stall" ? "stall" : biz.length ? "shop" : "classic", colour: evtHex(evtPal(e)[0]), note: "" };
EVT.msg = "";
evtPaint();
},
function () {
var A = EVT.ask, e = evtById(A.ev);
if (!e) {
EVT.ask = null;
return "";
}
var s = e.spots || {}, biz = (EVT.board && EVT.board.businesses) || [];
var h = evtHead("A place at " + evtE(e.title));
if (EVT.board && EVT.board.member === false)
h += '<div style="margin-bottom:6px">' + evtDim("Taking part is for dreamers who pay their dues. Visitors are welcome to watch.") + '</div>';
h += '<label>What would you like?</label><select id="evt-a-kind" data-evc="1" style="' + EVT_IN + '">' +
[["float", "A float", +s.floats], ["walk", "A place marching, with a placard", +s.walkers], ["stall", "A stall", +s.stalls]].filter(function (o) { return o[2]; })
.map(function (o) { return '<option value="' + o[0] + '"' + (A.kind === o[0] ? " selected" : "") + '>' + o[1] + '</option>'; }).join("") + '</select>';
h += '<label>For</label><select id="evt-a-biz" data-evc="1" style="' + EVT_IN + '"><option value="">Just me, for fun</option>' + biz.map(function (b) { return '<option value="' + b.id + '"' + (String(A.biz) === String(b.id) ? " selected" : "") + '>' + evtE(b.name) + '</option>'; }).join("") + '</select>';
h += '<label>What the banner says</label><input id="evt-a-banner" maxlength="40" value="' + evtE(A.banner) + '" placeholder="' + evtE(evtAskDefaultBanner()) + '" style="' + EVT_IN + '">';
if (A.kind === "float")
h += '<label>The float</label><select id="evt-a-style" data-evc="1" style="' + EVT_IN + '">' + EVT_STYLES.map(function (o) { return '<option value="' + o[0] + '"' + (A.style === o[0] ? " selected" : "") + '>' + o[1] + '</option>'; }).join("") + '</select>';
h += '<label>Your colour</label> <input id="evt-a-colour" type="color" value="' + evtE(A.colour) + '" style="width:56px;height:30px;border:0;background:none;vertical-align:middle"><br>';
h += '<label>A word to the Keeper (if you like)</label><textarea id="evt-a-note" maxlength="400" rows="2" style="' + EVT_IN + '">' + evtE(A.note) + '</textarea>';
h += evtB("Ask the Keeper", "ask-go") + evtB("Back", "ask-back", null, true);
return h;
},
function () {
evtAskRead();
var A = EVT.ask;
evtRpc("event_request", { p_event: +A.ev, p_kind: A.kind, p_employer: A.biz ? +A.biz : null, p_banner: A.banner || "", p_style: A.kind === "float" ? A.style : A.kind === "stall" ? "stall" : "walk", p_colour: A.colour, p_note: A.note || "" })
.then(function (o) { EVT.msg = (o && o.say) || ""; if (o && o.ok) {
EVT.ask = null;
EVT.tab = "mine";
evtChime();
} evtLoad(true); evtPaint(); })
.catch(function (e) { EVT.msg = evtErr(e); evtPaint(); });
},
function (e) {
var mins = Math.round((evtEnd(e) - evtStart(e)) / 60000);
EVT.form = { id: e.id, kind: e.kind, title: e.title, blurb: e.blurb || "", where: (e.x != null && e.z != null && e.kind !== "parade") ? "keep" : e.ring, x: e.x, z: e.z, ring: e.ring, start: evtLocalInput(evtStart(e)), mins: mins,
palette: e.palette || "royal", style: (e.lead && e.lead.style) || "crown", banner: (e.lead && e.lead.banner) || "", floats: +(e.spots || {}).floats || 0, walkers: +(e.spots || {}).walkers || 0, stalls: +(e.spots || {}).stalls || 0, open: e.open !== false };
},
function () {
var F = EVT.form;
if (!F)
return;
function v(id) { var x = document.getElementById(id); return x ? (x.type === "checkbox" ? x.checked : x.value) : null; }
["kind", "title", "blurb", "where", "start", "mins", "palette", "style", "banner", "floats", "walkers", "stalls", "open"].forEach(function (k) { var x = v("evt-f-" + k); if (x != null)
F[k] = x; });
["mins", "floats", "walkers", "stalls"].forEach(function (k) { F[k] = Math.max(0, parseInt(F[k], 10) || 0); });
},
function () {
if (!EVT.form)
evtFormNew();
var F = EVT.form, h = evtHead(F.id ? "Edit the event" : "Make an event");
function sel(id, opts, cur) { return '<select id="evt-f-' + id + '" data-evc="1" style="' + EVT_IN + '">' + opts.map(function (o) { return '<option value="' + evtE(o[0]) + '"' + (String(cur) === String(o[0]) ? " selected" : "") + '>' + evtE(o[1]) + '</option>'; }).join("") + '</select>'; }
function num(id, cur, max) { return '<input id="evt-f-' + id + '" type="number" min="0" max="' + max + '" value="' + cur + '" style="' + EVT_IN + ';width:70px;display:inline-block;margin-right:8px">'; }
h += '<label>What kind</label>' + sel("kind", Object.keys(EVT_KINDS).map(function (k) { return [k, EVT_KINDS[k][0] + " " + EVT_KINDS[k][1] + ({ parade: ", round a ring with floats and marchers", holiday: ", the streets dressed in its colours", festival: ", stalls and a bandstand at a spot", gathering: ", an arch and bunting at a spot" }[k])]; }), F.kind);
h += '<label>Its name</label><input id="evt-f-title" maxlength="80" value="' + evtE(F.title) + '" placeholder="The Midsummer Parade" style="' + EVT_IN + '">';
h += '<label>A few words about it</label><textarea id="evt-f-blurb" maxlength="600" rows="2" placeholder="Floats, music and every business in town…" style="' + EVT_IN + '">' + evtE(F.blurb) + '</textarea>';
var where = EVT_RINGS.map(function (r) { return [r[0], (F.kind === "parade" ? "Round " : "On ") + r[1]]; });
if (F.kind !== "parade" && F.kind !== "holiday") {
if (F.where === "keep" || (F.x != null && F.z != null))
where.unshift(["keep", "The spot already chosen"]);
if (evtCity())
where.unshift(["here", "Here, where I stand"]);
}
else if (evtCity())
where.unshift(["here", "The ring I am nearest"]);
h += '<label>Where</label>' + sel("where", where, F.where);
h += '<label>Starts</label><input id="evt-f-start" type="datetime-local" value="' + evtE(F.start) + '" style="' + EVT_IN + '">';
h += '<label>Lasts</label>' + sel("mins", EVT_LENGTHS, F.mins);
h += '<label>Its colours</label>' + sel("palette", Object.keys(EVT_PALETTES).map(function (k) { return [k, EVT_PALETTES[k][0]]; }), F.palette);
h += '<div style="margin:-2px 0 6px">' + (EVT_PALETTES[F.palette] || EVT_PALETTES.royal)[1].map(function (c) { return '<span style="display:inline-block;width:26px;height:12px;background:' + evtHex(c) + ';margin-right:3px;border-radius:2px"></span>'; }).join("") + '</div>';
if (F.kind === "parade") {
h += '<label>The lead float</label>' + sel("style", EVT_STYLES, F.style);
h += '<label>The lead float\'s banner</label><input id="evt-f-banner" maxlength="40" value="' + evtE(F.banner) + '" placeholder="' + evtE(F.title || "The event's name") + '" style="' + EVT_IN + '">';
h += '<label>Room for</label><div>' + num("floats", F.floats, 12) + 'floats ' + num("walkers", F.walkers, 24) + 'marchers</div>';
}
else if (F.kind !== "holiday") {
h += '<label>Room for</label><div>' + num("stalls", F.stalls, 16) + 'stalls</div>';
}
if (F.kind !== "holiday")
h += '<label style="display:block;margin:4px 0 8px"><input id="evt-f-open" type="checkbox"' + (F.open ? " checked" : "") + '> Dreamers may ask for a place</label>';
h += '<div>' + evtB("💾 Save", "save") + evtB("👁 Try it here", "try-form", null, true) + evtB("📣 Save and announce", "save-announce") + evtB("▶ Save and start now", "save-start") + '</div>';
h += '<div style="margin-top:4px">' + evtB(F.id ? "Start a new one" : "Clear", "new", null, true) + '</div>';
h += '<div style="margin-top:6px;font-size:12px">' + evtDim("Try it here builds it round you for ten minutes, for your eyes only. Announcing puts it in What's on and in the Gazette.") + '</div>';
return h;
},
function () {
evtFormRead();
var F = EVT.form, ring = F.where, x = null, z = null;
if (F.where === "here" && evtCity()) {
var P = camera.position, dc = Math.hypot(P.x - ATLC.x, P.z - ATLC.z), best = "civic", bd = 1e9;
EVT_RINGS.forEach(function (r) { var d = Math.abs(evtRingR(r[0]) - dc); if (d < bd) {
bd = d;
best = r[0];
} });
ring = best;
if (F.kind !== "parade" && F.kind !== "holiday") {
x = P.x - ATLC.x;
z = P.z - ATLC.z;
}
}
else if (F.where === "keep") {
ring = F.ring || "civic";
x = F.x;
z = F.z;
}
var st = F.start ? new Date(F.start) : new Date();
if (isNaN(st.getTime()))
st = new Date();
return { p_id: F.id ? +F.id : null, p_kind: F.kind, p_title: String(F.title || "").trim(), p_blurb: F.blurb || "", p_ring: ring, p_x: x, p_z: z, p_starts: st.toISOString(), p_minutes: +F.mins || 60,
p_palette: F.palette, p_lead: { style: F.style, banner: String(F.banner || "").trim() }, p_spots: { floats: F.kind === "parade" ? F.floats : 0, walkers: F.kind === "parade" ? F.walkers : 0, stalls: (F.kind === "festival" || F.kind === "gathering") ? F.stalls : 0 }, p_open: F.kind === "holiday" ? false : !!F.open };
},
function (then) {
var a = evtFormArgs();
if (a.p_title.length < 2) {
EVT.msg = "Give the event a name.";
evtPaint();
return;
}
evtRpc("event_save", a).then(function (o) {
if (!o || !o.ok) {
EVT.msg = (o && o.say) || "That did not save.";
evtPaint();
return;
}
EVT.form.id = o.id;
EVT.form.where = a.p_x != null ? "keep" : a.p_ring;
EVT.form.x = a.p_x;
EVT.form.z = a.p_z;
EVT.form.ring = a.p_ring;
if (then)
evtSet(o.id, then);
else {
EVT.msg = "Saved as a draft. Announce it when you are ready.";
evtLoad(true);
evtPaint();
}
}).catch(function (e) { EVT.msg = evtErr(e); evtPaint(); });
},
function (id, what) {
if (what === "cancel" && !window.confirm("Call this event off? Everyone with a place gets a letter."))
return;
evtRpc("event_set", { p_id: +id, p_do: what }).then(function (o) { EVT.msg = (o && o.say) || ""; if (o && o.ok) {
if (what !== "end" && what !== "cancel")
evtChime();
EVT.tab = "on";
if (EVT.preview && +EVT.preview.id === +id)
EVT.preview = null;
} evtLoad(true); evtPaint(); })
.catch(function (e) { EVT.msg = evtErr(e); evtPaint(); });
},
function (e) {
if (!evtCity()) {
EVT.msg = "Step out into the streets of Somnucor first.";
evtPaint();
return;
}
var x = JSON.parse(JSON.stringify(e));
x.preview = true;
x.id = e.id || "try";
x.starts_at = new Date(Date.now() - 1000).toISOString();
x.ends_at = new Date(Date.now() + 600000).toISOString();
var P = camera.position;
if (x.kind === "parade") {
var dc = Math.hypot(P.x - ATLC.x, P.z - ATLC.z), best = x.ring, bd = Math.abs(evtRingR(x.ring) - dc);
EVT_RINGS.forEach(function (r) { var d = Math.abs(evtRingR(r[0]) - dc); if (d < bd) {
bd = d;
best = r[0];
} });
x.ring = best;
var R = evtRingR(x.ring), ap = Math.atan2(P.z - ATLC.z, P.x - ATLC.x);
x.phase = ap + 40 / R;
}
else if (x.kind !== "holiday" && (x.x == null || x.z == null)) {
x.x = P.x - ATLC.x;
x.z = P.z - ATLC.z;
}
var s = x.spots || {}, pal = evtPal(x), have = (x.places || []).slice();
function fill(kind, n, styles) { var got = have.filter(function (p) { return p.kind === kind; }).length; for (var i = got; i < Math.min(n, got + 3); i++)
have.push({ id: "s" + kind + i, kind: kind, banner: { float: "A dreamer's float", walk: "Marchers", stall: "A dreamer's stall" }[kind], style: styles[i % styles.length], colour: evtHex(pal[(i + 1) % pal.length]) }); }
fill("float", +s.floats, ["shop", "classic", "balloon-unicorn"]);
fill("walk", +s.walkers, ["walk"]);
fill("stall", +s.stalls, ["stall"]);
x.places = have;
EVT.preview = x;
evtWorldDrop(x.id);
EVT.msg = "👁 Here it is, for ten minutes, for your eyes only.";
evtClose();
setStatus("<b>👁 " + evtE(x.title || "Your event") + "</b>: a try-out only you can see, for ten minutes.");
},
function () {
var R = EVT.reqs;
if (!R)
return '<div style="margin-top:8px">' + evtDim("Fetching the requests…") + '</div>';
var P = R.filter(function (r) { return r.status === "pending"; }), D = R.filter(function (r) { return r.status !== "pending"; }), h = evtHead("Waiting for you");
if (!P.length)
h += evtDim("Nobody is waiting.");
P.forEach(function (r) {
h += '<div style="border-top:1px solid rgba(255,255,255,.1);padding:6px 0"><b>' + evtE(r.who) + '</b> asks for ' + evtE(evtKindWord(r.kind)) + ' at <b>' + evtE(r.event) + '</b>' +
'<br><span style="display:inline-block;width:9px;height:9px;background:' + evtE(r.colour) + ';margin-right:4px"></span>“' + evtE(r.banner) + '”' + (r.business ? " for " + evtE(r.business) : " (for fun)") +
(r.kind === "float" ? " · " + evtE((EVT_STYLES.filter(function (s) { return s[0] === r.style; })[0] || [0, r.style])[1]) : "") +
(r.note ? '<br><i>“' + evtE(r.note) + '”</i>' : '') + '<br>' + evtDim(r.taken + " of " + r.room + " given") +
'<input id="evt-n-' + r.id + '" maxlength="300" placeholder="A word back (if you like)" style="' + EVT_IN + '">' + evtB("Yes", "yes", r.id) + evtB("No", "no", r.id, true) + '</div>';
});
if (D.length) {
h += evtHead("Answered this week");
D.slice(0, 20).forEach(function (r) { h += '<div style="padding:3px 0">' + (r.status === "approved" ? "✓ " : "✗ ") + evtE(r.who) + ": " + evtE(evtKindWord(r.kind)) + ", " + evtE(r.event) + " · “" + evtE(r.banner) + "”</div>"; });
}
return h;
},
function (a, v) {
if (a === "close") {
evtClose();
return;
}
if (a === "tab") {
EVT.tab = v;
EVT.ask = null;
EVT.msg = "";
if (v === "reqs")
evtReqLoad(true);
evtPaint();
return;
}
if (a === "way") {
evtShowWay(v);
return;
}
if (a === "ask") {
if (!evtIn()) {
EVT.msg = "Sign in first.";
evtPaint();
return;
}
evtAskStart(v);
return;
}
if (a === "ask-back") {
EVT.ask = null;
evtPaint();
return;
}
if (a === "ask-go") {
evtAskGo();
return;
}
if (a === "join") {
evtRpc("event_request", { p_event: +v, p_kind: "join", p_employer: null, p_banner: "", p_style: "walk", p_colour: "#C8283A", p_note: "" }).then(function (o) { EVT.msg = (o && o.say) || ""; if (o && o.ok)
evtChime(); evtLoad(true); }).catch(function (e) { EVT.msg = evtErr(e); evtPaint(); });
return;
}
if (a === "withdraw") {
evtRpc("event_withdraw", { p_id: +v }).then(function (o) { EVT.msg = (o && o.say) || ""; evtLoad(true); }).catch(function (e) { EVT.msg = evtErr(e); evtPaint(); });
return;
}
if (a === "walk") {
evtWalkToggle(v);
return;
}
if (a === "edit") {
var e = evtById(v);
if (e) {
evtFormFrom(e);
EVT.tab = "make";
EVT.msg = "";
evtPaint();
}
return;
}
if (a === "new") {
evtFormNew();
EVT.msg = "";
evtPaint();
return;
}
if (a === "save") {
evtSave(null);
return;
}
if (a === "save-announce") {
evtSave("announce");
return;
}
if (a === "save-start") {
evtSave("start");
return;
}
if (a === "try-form") {
var f = evtFormArgs();
evtTry({ id: f.p_id || "try", kind: f.p_kind, title: f.p_title || "Your event", blurb: f.p_blurb, ring: f.p_ring, x: f.p_x, z: f.p_z, palette: f.p_palette, lead: f.p_lead, spots: f.p_spots, open: f.p_open, places: (evtById(f.p_id) || {}).places || [] });
return;
}
if (a === "try") {
var e2 = evtById(v);
if (e2)
evtTry(e2);
return;
}
if (a === "announce" || a === "start" || a === "end" || a === "cancel") {
evtSet(v, a);
return;
}
if (a === "yes" || a === "no") {
evtDecide(v, a === "yes");
return;
}
},
function (id) {
var e = evtById(id);
if (!e)
return;
var r = typeof somnucorRealm === "function" ? somnucorRealm() : null;
if (r && (store.here || 0) !== r.id && typeof toSomnucor === "function")
toSomnucor();
var at = null, P = camera.position;
if (e.kind === "parade") {
var W = EVT.W[e.id], R = evtRingR(e.ring), hd = evtParadeHead(e, R, P, W && W.len);
at = { x: ATLC.x + Math.cos(hd) * R, z: ATLC.z + Math.sin(hd) * R };
}
else if (e.kind === "holiday") {
var R2 = evtRingR(e.ring), ap = Math.atan2(P.z - ATLC.z, P.x - ATLC.x);
at = { x: ATLC.x + Math.cos(ap) * R2, z: ATLC.z + Math.sin(ap) * R2 };
}
else
at = evtSpot(e);
guideTo = { key: e.title, x: at.x, z: at.z };
evtClose();
setStatus("<b>" + (EVT_KINDS[e.kind] || EVT_KINDS.parade)[0] + " To " + evtE(e.title) + "</b>: follow the pointer at the top of the screen.");
},
function (W, style, col, banner, sub, pal) {
var w = 4.4, l = 9, g;
if (style === "carousel" && typeof frpCarouselFloat === "function") {
g = frpCarouselFloat();
w = 4.8;
l = 8;
}
else {
g = frpFloat(w, l, col);
if (EVT_THEME[style] !== undefined && typeof frpTheme === "function")
g.add(frpTheme(EVT_THEME[style]));
else if (style === "shop")
g.add(evtShopfront(W, col, banner));
else
g.add(evtClassic(W, col, banner, pal));
}
var c = typeof festCanvasSign === "function" ? festCanvasSign(banner, sub || "", 1024, 160, evtHex(col)) : null;
if (c) {
evtTex(W, c);
var m = new THREE.MeshBasicMaterial({ map: c.tex }), geo = new THREE.PlaneGeometry(l * 0.82, 0.68);
[1, -1].forEach(function (sd) { var p = new THREE.Mesh(geo, m); p.position.set(sd * (w / 2 + 0.08), 0.42, 0); p.rotation.y = sd * Math.PI / 2; g.add(p); });
}
return evtNoRay(g);
},
function (W, col, banner, pal) {
var g = new THREE.Group(), gold = fM(0xE8C040);
var arch = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.12, 6, 24, Math.PI), fM(0x3A7A3A));
arch.position.set(0, 1.2, -1.5);
g.add(arch);
for (var i = 0; i <= 12; i++) {
var a = i / 12 * Math.PI, f = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 6), fM(pal[i % pal.length]));
f.position.set(Math.cos(a) * 1.9, 1.2 + Math.sin(a) * 1.9, -1.5);
g.add(f);
}
[[-1.6, 2.8], [1.6, 2.8], [-1.6, -3.4], [1.6, -3.4]].forEach(function (q, k) {
var u = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.25, 0.6, 10), gold);
u.position.set(q[0], 1.5, q[1]);
g.add(u);
for (var j = 0; j < 5; j++) {
var b = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), fM(pal[(k + j) % pal.length]));
b.position.set(q[0] + Math.cos(j * 1.3) * 0.22, 1.9 + (j % 2) * 0.12, q[1] + Math.sin(j * 1.3) * 0.22);
g.add(b);
}
});
[-1.7, 1.7].forEach(function (x) { var p = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.6, 6), gold); p.position.set(0, 2.5, x); g.add(p); });
var s = evtSign(W, banner, "", 3.6, 0.9, evtHex(col));
s.position.set(0, 3.6, 0);
s.rotation.y = Math.PI / 2;
g.add(s);
return g;
},
function (W, col, banner) {
var g = new THREE.Group(), wall = fM(0xF4ECD8), dark = fM(0x3A2A22);
var body = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.6, 2.2), wall);
body.position.set(0, 2.5, -2.2);
g.add(body);
var trim = new THREE.Mesh(new THREE.BoxGeometry(3.7, 0.25, 2.3), fM(col));
trim.position.set(0, 3.9, -2.2);
g.add(trim);
[1, -1].forEach(function (sd) {
var door = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.7, 0.8), dark);
door.position.set(sd * 1.81, 2.05, -1.4);
g.add(door);
var win = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.0, 1.1), new THREE.MeshBasicMaterial({ color: 0xFFE8B0 }));
win.position.set(sd * 1.81, 2.4, -2.75);
g.add(win);
var tx = typeof festStripes === "function" ? festStripes(evtHex(col), "#FFF4E0", 10) : null;
if (tx) {
tx.repeat.set(2, 1);
evtTex(W, { tex: tx });
}
var aw = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.9), tx ? new THREE.MeshLambertMaterial({ map: tx, side: THREE.DoubleSide }) : fM(col));
aw.position.set(sd * 2.15, 3.25, -2.2);
aw.rotation.set(0, sd * Math.PI / 2, 0);
aw.rotateX(-0.7);
g.add(aw);
});
var s = evtSign(W, banner, "", 3.4, 0.8, evtHex(col));
s.position.set(0, 4.4, -2.2);
s.rotation.y = Math.PI / 2;
g.add(s);
var ct = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.8, 0.8), fM(col));
ct.position.set(0, 1.6, 2.0);
g.add(ct);
for (var i = 0; i < 5; i++) {
var b = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.3, 0.34), fM([0xE8C040, 0xC83A3A, 0x3A7AC8, 0x5AA85A, 0xF4ECD8][i]));
b.position.set(-1 + i * 0.5, 2.15, 2.0);
g.add(b);
}
return g;
},
function (W, col, banner, sub) {
var g = new THREE.Group(), wood = fM(0x8A5A32);
var ct = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.0, 1.0), fM(col));
ct.position.set(0, 0.5, 0.4);
g.add(ct);
var top = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.08, 1.1), wood);
top.position.set(0, 1.04, 0.4);
g.add(top);
[[-1.25, 0.9], [1.25, 0.9], [-1.25, -0.6], [1.25, -0.6]].forEach(function (q) { var p = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.6, 6), wood); p.position.set(q[0], 1.3, q[1]); g.add(p); });
var tx = typeof festStripes === "function" ? festStripes(evtHex(col), "#FFF4E0", 12) : null;
if (tx) {
tx.repeat.set(2, 1);
evtTex(W, { tex: tx });
}
var can = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.12, 1.9), tx ? new THREE.MeshLambertMaterial({ map: tx }) : fM(col));
can.position.set(0, 2.62, 0.15);
can.rotation.x = 0.18;
g.add(can);
for (var i = 0; i < 6; i++) {
var b = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.24, 0.28), fM([0xE8C040, 0xC83A3A, 0x3A7AC8, 0x5AA85A, 0xF4ECD8, 0xC86AFF][i]));
b.position.set(-1 + i * 0.4, 1.2, 0.4);
g.add(b);
}
var s = evtSign(W, banner, sub || "", 2.6, 0.6, evtHex(col));
s.position.set(0, 3.05, 0.95);
g.add(s);
return evtNoRay(g);
},
function (W, txt, col) {
var g = new THREE.Group(), pole = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 2.6, 6), fM(0x8A5A32));
pole.position.set(0.32, 1.6, 0.25);
g.add(pole);
var c = typeof festCanvasSign === "function" ? festCanvasSign(txt, "", 512, 192, evtHex(col)) : null;
if (c) {
evtTex(W, c);
var s = festTwoFace(new THREE.PlaneGeometry(1.3, 0.5), new THREE.MeshBasicMaterial({ map: c.tex }));
s.position.set(0.32, 2.9, 0.25);
s.rotation.y = Math.PI / 2;
g.add(s);
}
return g;
},
function (e, W) {
var g = new THREE.Group();
g.name = "event parade " + e.id;
scene.add(g);
var lite = typeof LITE !== "undefined" && LITE, pal = evtPal(e), items = [], s = 0;
function put(o, ds, l, role, lift, me, off) { g.add(o); items.push({ o: o, s: s + (off || 0), l: l || 0, role: role || "walk", lift: lift || 0, me: me || null }); s += ds || 0; }
function fig(id, i, role, col) { return typeof frpFig === "function" ? frpFig(id, i, role, col) : new THREE.Group(); }
var bn = new THREE.Group(), bs = evtSign(W, e.title, (EVT_KINDS[e.kind] || EVT_KINDS.parade)[1].toUpperCase(), 3.8, 1.0, evtHex(pal[0]));
bs.position.y = 2.6;
bs.rotation.y = Math.PI / 2;
bn.add(bs);
[-1.95, 1.95].forEach(function (z) { var p = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 3.2, 6), fM(0xE8C040)); p.position.set(0, 1.6, z); bn.add(p); });
put(fig("ev_bn1", 0, "walk", pal[0]), 0, -1.95);
put(fig("ev_bn2", 1, "walk", pal[0]), 0, 1.95);
put(evtNoRay(bn), 4, 0, "float");
put(fig("ev_major", 1, "major", pal[0]), 3, 0);
var nb = lite ? 6 : 10;
for (var b = 0; b < nb; b++)
put(fig("ev_band" + b, b, b % 4 < 2 ? "drum" : "horn", pal[b % 2 ? 1 : 0]), b % 4 === 3 ? 2.2 : 0, -2.4 + (b % 4) * 1.6);
s += 3;
var ls = (e.lead && e.lead.style) || "crown", lb = (e.lead && e.lead.banner) || e.title;
if (/^balloon-/.test(ls))
evtBalloonPut(W, ls, pal[0], lb, put, fig, "ev_lead", null);
else
put(evtFloat(W, ls, pal[0], lb, "", pal), 11, 0, "float");
var P = e.places || [], nfl = 0;
P.filter(function (p) { return p.kind === "float"; }).slice(0, 12).forEach(function (p, i) {
var col = evtCol(p.colour, pal[(i + 1) % pal.length]), sub = p.business && p.business !== p.banner ? p.business : (p.who && p.who !== p.banner ? p.who : "");
if (/^balloon-/.test(p.style))
evtBalloonPut(W, p.style, col, p.banner, put, fig, "ev_f" + i, p.id);
else {
put(fig("ev_fa" + i, i + 2, "walk", col), 0, 3.4, "walk", 0, null, 4);
put(evtFloat(W, p.style || "classic", col, p.banner || "", sub, pal), 11, 0, "float", 0, p.id);
}
nfl++;
});
P.filter(function (p) { return p.kind === "walk"; }).slice(0, 24).forEach(function (p, i) {
var col = evtCol(p.colour, pal[(i + 2) % pal.length]), m = fig("ev_w" + i, i + 4, "walk", col);
m.add(evtPlacard(W, p.banner || "", col));
m.userData.placard = true;
put(m, 0, -1.2, "walk", 0, p.id);
put(fig("ev_w2" + i, i + 5, "flag", col), 2.6, 1.2);
});
var nf = lite ? 2 : 4;
for (var f = 0; f < nf; f++)
put(fig("ev_flag" + f, f, "flag", pal[f % pal.length]), f % 2 ? 2.4 : 0, f % 2 ? 1.6 : -1.6, "flag");
evtNoRay(g);
W.spin = [];
g.traverse(function (o) { if (o.userData && o.userData.spin)
W.spin.push(o.userData.spin); });
W.g = g;
W.items = items;
W.len = s;
},
function (W, style, col, banner, put, fig, id, me) {
var bl = typeof frpBalloon === "function" ? frpBalloon(style.replace("balloon-", "")) : new THREE.Group();
var h1 = fig(id + "a", 3, "walk", col), h2 = fig(id + "b", 4, "walk", col);
h1.add(evtPlacard(W, banner, col));
h1.userData.placard = true;
put(h1, 0, -1.5, "walk", 0, me, -1);
put(h2, 0, 1.5, "walk", 0, null, 3);
put(bl, 9, 0, "balloon", 0, null);
},
function (e, R, P, len) {
var secs = (Date.now() - evtStart(e)) / 1000, K = Math.max(1, Math.ceil(2 * Math.PI * R / (EVT_V * 1200)));
var ap = Math.atan2(P.z - ATLC.z, P.x - ATLC.x), a0 = (e.phase != null ? e.phase : R * 0.37 + (+e.id || 0) * 0.9) + EVT_V * secs / R, best = 0, bd = 1e9, L = len || 90;
for (var k = 0; k < K; k++) {
var ah = a0 + k * 2 * Math.PI / K, mid = ah - L / 2 / R, d = Math.abs(((ap - mid) % (2 * Math.PI) + 3 * Math.PI) % (2 * Math.PI) - Math.PI);
if (d < bd) {
bd = d;
best = k;
}
}
return a0 + best * 2 * Math.PI / K;
},
function (e, W, dt, t) {
var R = evtRingR(e.ring), P = camera.position;
if (Math.abs(Math.hypot(P.x - ATLC.x, P.z - ATLC.z) - R) > 140) {
if (W.g)
W.g.visible = false;
W.near = false;
return;
}
if (!W.g)
evtParadeBuild(e, W);
var head = evtParadeHead(e, R, P, W.len), hx = ATLC.x + Math.cos(head - W.len / 2 / R) * R, hz = ATLC.z + Math.sin(head - W.len / 2 / R) * R;
if (Math.hypot(hx - P.x, hz - P.z) > 360) {
W.g.visible = false;
W.near = false;
return;
}
W.g.visible = true;
W.head = head;
var near = false;
W.items.forEach(function (it, i) {
var a = head - it.s / R, rr = R + it.l, x = ATLC.x + Math.cos(a) * rr, z = ATLC.z + Math.sin(a) * rr, ry = Math.atan2(-Math.sin(a), Math.cos(a)), o = it.o, y = terrainY(x, z) + (it.lift || 0);
if (it.role === "balloon") {
y += Math.sin(t * 0.6 + i) * 0.3;
o.rotation.y = ry + Math.sin(t * 0.3 + i) * 0.1;
}
else if (it.role === "float") {
o.rotation.y = ry;
}
else {
o.rotation.y = ry;
var lm = o.userData.limbs, sw = Math.sin(t * 5 + i);
if (lm) {
if (lm.ll)
lm.ll.rotation.x = sw * 0.45;
if (lm.rl)
lm.rl.rotation.x = -sw * 0.45;
if (it.role === "flag") {
if (lm.ra)
lm.ra.rotation.x = -1.4 + Math.sin(t * 1.5 + i) * 0.5;
if (lm.la)
lm.la.rotation.x = -sw * 0.5;
}
else {
if (lm.la)
lm.la.rotation.x = -sw * 0.5;
if (lm.ra)
lm.ra.rotation.x = o.userData.placard ? -0.9 : sw * 0.5;
}
}
if (o.userData.flag)
o.userData.flag.rotation.y = Math.sin(t * 1.5 + i) * 0.5;
y += Math.abs(sw) * 0.04;
}
o.position.set(x, y, z);
it.x = x;
it.z = z;
it.a = a;
if (Math.hypot(x - P.x, z - P.z) < 22)
near = true;
});
(W.spin || []).forEach(function (sp) { sp.rotation.y = t * 0.4; });
if (near && !W.near && Date.now() - (W.nearAt || 0) > 60000) {
W.nearAt = Date.now();
setStatus("<b>🎺 " + evtE(e.title) + " is passing!</b>");
}
W.near = near;
},
function (cx, cz, r) {
var out = [];
try {
var rid = typeof somnucorRealm === "function" ? somnucorRealm().id : null;
store.objects.forEach(function (o) {
if (o.realm !== rid || !KIT[o.archetype] || KIT[o.archetype].cat === "being")
return;
var d = Math.hypot(o.x - cx, o.z - cz);
if (d > r + 40)
return;
var k = KIT[o.archetype], s = (o.attrs && o.attrs.s) || 1;
out.push({ x: o.x, z: o.z, r: Math.max(k.size[0] * (o.attrs && o.attrs.w || 1), k.size[2] * (o.attrs && o.attrs.d || 1)) * s * 0.5 });
});
}
catch (er) { }
return out;
},
function (e, W) {
var g = new THREE.Group();
g.name = "event spot " + e.id;
scene.add(g);
var c = evtSpot(e), pal = evtPal(e), obs = evtObstacles(c.x, c.z, 30), y0 = terrainY(c.x, c.z), lite = typeof LITE !== "undefined" && LITE;
var aT = Math.atan2(ATLC.z - c.z, ATLC.x - c.x);
var ax = c.x + Math.cos(aT) * 14, az = c.z + Math.sin(aT) * 14;
if (evtFree(ax, az, obs, 2)) {
var arch = evtArch(W, e, pal);
arch.position.set(ax, terrainY(ax, az), az);
arch.rotation.y = Math.atan2(Math.cos(aT), -Math.sin(aT)) + Math.PI / 2;
g.add(arch);
}
var poles = [], N = lite ? 10 : 14, R = 16;
for (var i = 0; i < N; i++) {
var a = aT + (i + 0.5) / N * Math.PI * 2, x = c.x + Math.cos(a) * R, z = c.z + Math.sin(a) * R;
if (Math.abs(Math.atan2(Math.sin(a - aT), Math.cos(a - aT))) < 0.3) {
poles.push(null);
continue;
}
poles.push(evtFree(x, z, obs, 0.8) ? [x, terrainY(x, z), z] : null);
}
evtPolesAndBunting(g, poles, pal, true);
var st = (e.places || []).filter(function (p) { return p.kind === "stall"; }).slice(0, 16), n = Math.max(st.length, 1);
st.forEach(function (p, i) {
var placed = false;
for (var tries = 0; tries < 12 && !placed; tries++) {
var a = aT + Math.PI / n + (i + tries * 0.37) / n * Math.PI * 2 * (n < 6 ? 0.6 : 1) + (n < 6 ? Math.PI * 0.7 : 0), rr = 9 + (tries % 3) * 1.5, x = c.x + Math.cos(a) * rr, z = c.z + Math.sin(a) * rr;
if (!evtFree(x, z, obs, 2))
continue;
var col = evtCol(p.colour, pal[(i + 1) % pal.length]), s = evtStall(W, col, p.banner || "", p.business && p.business !== p.banner ? p.business : "");
s.position.set(x, terrainY(x, z), z);
s.rotation.y = Math.atan2(c.x - x, c.z - z);
g.add(s);
obs.push({ x: x, z: z, r: 1.8 });
placed = true;
}
});
if (e.kind === "festival" && evtFree(c.x, c.z, obs, 3)) {
var bsd = evtBandstand(pal);
bsd.position.set(c.x, y0, c.z);
g.add(bsd);
}
evtNoRay(g);
W.g = g;
W.c = c;
},
function (W, e, pal) {
var g = new THREE.Group(), w = 7, h = 6.5;
[-1, 1].forEach(function (sd) {
var p = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.38, h, 10), fM(pal[0]));
p.position.set(sd * w / 2, h / 2, 0);
g.add(p);
var top = new THREE.Mesh(new THREE.SphereGeometry(0.5, 12, 8), fM(pal[1]));
top.position.set(sd * w / 2, h + 0.4, 0);
g.add(top);
});
var bar = new THREE.Mesh(new THREE.BoxGeometry(w + 0.6, 0.4, 0.4), fM(pal[1]));
bar.position.y = h;
g.add(bar);
var s = evtSign(W, e.title, (EVT_KINDS[e.kind] || EVT_KINDS.parade)[1].toUpperCase() + " · ALL WELCOME", w - 0.6, 1.5, evtHex(pal[0]));
s.position.y = h - 1.1;
g.add(s);
var pts = [];
for (var i = 0; i <= 16; i++) {
var f = i / 16;
pts.push([-w / 2 + f * w, h + 0.32, 0.22]);
}
evtBulbs(g, pts, pal);
return g;
},
function (pal) {
var g = new THREE.Group();
var base = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 3.6, 0.7, 16), fM(0xF4ECD8));
base.position.y = 0.35;
g.add(base);
for (var i = 0; i < 8; i++) {
var a = i / 8 * Math.PI * 2, p = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3, 6), fM(pal[1]));
p.position.set(Math.cos(a) * 3.1, 2.2, Math.sin(a) * 3.1);
g.add(p);
}
var roof = new THREE.Mesh(new THREE.ConeGeometry(4, 1.8, 16), fM(pal[0]));
roof.position.y = 4.6;
g.add(roof);
var fin = new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 8), fM(pal[1]));
fin.position.y = 5.6;
g.add(fin);
return g;
},
function (L, P) {
evtDecoDrop();
var G = new THREE.Group();
G.name = "event streets";
scene.add(G);
EVT.deco = { g: G, key: evtDecoKey(L, P), tex: [] };
var lite = typeof LITE !== "undefined" && LITE, reach = lite ? 110 : 180, step = 18, dc = Math.hypot(P.x - ATLC.x, P.z - ATLC.z), ac = Math.atan2(P.z - ATLC.z, P.x - ATLC.x);
var fest = typeof festOn === "function" && festOn() && typeof FEST !== "undefined" && FEST.street;
var rings = typeof FEST_RINGS !== "undefined" ? FEST_RINGS : [245, 430, 565, 740, 880, 1080, 1280, 1420, 1620, 1790];
var used = {};
L.forEach(function (e, ei) {
var pal = evtPal(e), mine = [];
if (e.kind === "parade")
mine = [evtRingR(e.ring)].filter(function (rs) { return rs > 200; });
else if (e.kind === "holiday")
mine = rings.filter(function (rs) { return Math.abs(rs - dc) < reach + 30; });
else
return;
var bannerTex = evtBannerTex(e, pal);
EVT.deco.tex.push(bannerTex);
var bm = new THREE.MeshBasicMaterial({ map: bannerTex }), bgeo = EVT.bannerGeo || (EVT.bannerGeo = new THREE.PlaneGeometry(0.9, 2.3)), nb = 0;
mine.forEach(function (rs) {
if (Math.abs(rs - dc) > reach + 30)
return;
var j = used[rs] || 0;
used[rs] = j + 1;
if (j > (fest ? 1 : 2))
return;
[1, -1].forEach(function (side) {
var rk = rs + side * (ATL_ROAD + 1.4), span = reach / rk, i0 = Math.ceil((ac - span) * rk / step), i1 = Math.floor((ac + span) * rk / step), poles = [];
for (var i = i0; i <= i1; i++) {
var a = i * step / rk, x = ATLC.x + Math.cos(a) * rk, z = ATLC.z + Math.sin(a) * rk, clear = (typeof atlClearAt !== "function" || atlClearAt(rk, a, 1, 2)) && !(typeof blockedAt === "function" && blockedAt(x, z, 0));
if (fest) {
if (clear && (((i % 3) + 3) % 3) === (1 + j) && nb < 50) {
var m = festTwoFace(bgeo, bm);
m.position.set(x - Math.cos(a) * 0.5 * side, terrainY(x, z) + 4.2, z - Math.sin(a) * 0.5 * side);
m.rotation.y = rotIn(a) + Math.PI / 2;
G.add(m);
nb++;
}
continue;
}
if (j === 0)
poles.push(clear ? [x, terrainY(x, z), z] : null);
if (clear && (((i % 3) + 3) % 3) === j && nb < 50) {
var m2 = festTwoFace(bgeo, bm);
m2.position.set(x + Math.cos(a) * 0.5 * side, terrainY(x, z) + 3.9, z + Math.sin(a) * 0.5 * side);
m2.rotation.y = rotIn(a) + Math.PI / 2;
G.add(m2);
nb++;
}
}
if (!fest && j === 0)
evtPolesAndBunting(G, poles, pal, false);
});
});
});
evtNoRay(G);
},
function (e, pal) {
return hallCanvas(128, 320, function (g, w, h) {
var gr = g.createLinearGradient(0, 0, 0, h);
gr.addColorStop(0, evtHex(pal[0]));
gr.addColorStop(1, evtHex(pal[2 % pal.length]));
g.fillStyle = gr;
g.fillRect(0, 0, w, h);
g.fillStyle = evtHex(pal[1]);
g.beginPath();
g.moveTo(0, h);
g.lineTo(w / 2, h - 30);
g.lineTo(w, h);
g.fill();
g.fillRect(0, 0, w, 10);
g.save();
g.translate(w / 2, h / 2 - 14);
g.rotate(-Math.PI / 2);
hallText(g, String(e.title || "").toUpperCase(), 0, -6, h - 50, "bold 28px Georgia,serif", "#FFF8E8");
hallText(g, (EVT_KINDS[e.kind] || EVT_KINDS.parade)[1], 0, 26, h - 80, "italic 18px Georgia,serif", "#FFF0C8");
g.restore();
}).tex;
},
function (g, tex) {
if (!g)
return;
if (g.parent)
g.parent.remove(g);
g.traverse(function (m) { try {
if (m.isInstancedMesh && m.userData.evtOwn) {
if (m.geometry !== EVT.bulbGeo && m.geometry !== EVT.triGeo)
m.geometry.dispose();
m.material.dispose();
if (m.dispose)
m.dispose();
}
}
catch (e) { } });
(tex || []).forEach(function (t) { try {
t.dispose();
}
catch (e) { } });
},
function (id) {
if (EVT.walk && +EVT.walk.ev === +id) {
EVT.walk = null;
setStatus("You step out of the parade.");
evtPaint();
return;
}
var e = evtById(id);
if (!e)
return;
var mine = evtMinePlaces(e).filter(function (m) { return m.status === "approved" && (m.kind === "walk" || m.kind === "float"); })[0];
if (!mine) {
return;
}
EVT.walk = { ev: e.id, place: mine.id, last: null };
evtClose();
setStatus("<b>🚶 Find your place:</b> follow the pointer to the parade; once you are beside it you march along with it. Move away to step out.");
}
];
});
