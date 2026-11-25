/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(224, function () {
"use strict";
return [
function (name, args, then) {
RR.say = "…";
rrPaint();
cityRpc(name, args).then(function (o) { RR.say = (o && o.say) || ""; if (then)
then(o || {}); RR.busy = false; return rrLoad(true); })
.then(function () { rrPaint(); if (typeof BKP !== "undefined" && BKP.at)
BKP.at = 0; })
.catch(function () { RR.say = "That did not go through. Try again in a moment."; rrPaint(); });
},
function (id) {
var r = rrMine().filter(function (x) { return x.id === id; })[0];
if (!r)
return;
function go() { if (r.relic && typeof rlTake === "function")
rlTake(r.relic); if (typeof renderWardrobe === "function")
try {
renderWardrobe();
}
catch (e) { } if (typeof bkpPaint === "function" && typeof BKP !== "undefined" && BKP.open)
bkpPaint(); }
if (r.carried)
return go();
cityRpc("rare_carry", { p_id: id, p_carry: true }).then(function (o) {
if (!(o && o.ok)) {
setStatus(esc((o && o.say) || "That did not go through."));
return;
}
return rrLoad(true).then(function () { r = rrMine().filter(function (x) { return x.id === id; })[0] || r; go(); });
}).catch(function () { setStatus("That did not go through. Try again in a moment."); });
},
function (id, carry) {
cityRpc("rare_carry", { p_id: id, p_carry: !!carry }).then(function (o) { setStatus(esc((o && o.say) || "")); return rrLoad(true); })
.then(function () { if (typeof bkpPaint === "function" && typeof BKP !== "undefined" && BKP.open)
bkpPaint(); if (typeof renderWardrobe === "function")
try {
renderWardrobe();
}
catch (e) { } })
.catch(function () { setStatus("That did not go through. Try again in a moment."); });
},
function (v) {
if (!v || HARM_COOL > 0)
return;
HARM_COOL = 2;
if (HARM.state === "down")
return;
cityRpc("assault_dreamer", { p_victim: v.id }).then(function (o) {
if (!o)
return;
if (o.ok === false) {
setStatus(esc(o.say || "You miss."));
return;
}
var down = o.victim_state === "down";
if (typeof sayOver === "function")
sayOver(v.id, down ? "…" : "Ow!");
if (v.p && v.p.group)
harmKnock(v.p.group, down);
cityRpc("say_in_city", { p_body: "* strikes " + (v.name || "a dreamer") + (down ? ", who goes down *" : " *"), p_channel: "near" }).catch(function () { });
if (typeof MERIT !== "undefined")
MERIT.at = 0;
if (o.zone === "wilds") {
setStatus("⚔️ You strike <b>" + esc(o.victim || v.name || "them") + "</b>: " + (o.harm || 0) + " harm" + (down ? ", and they go down" : "") + ". Out in the Wilds, it is a fair fight." +
(o.took ? " You take <b>" + esc(o.took.name) + "</b> (No. " + o.took.serial + " of " + o.took.of + ") from them." : ""));
if (o.took)
rrLoad(true);
return;
}
if (o.caught)
return arrestScene(o, "assault");
setStatus("You strike <b>" + esc(o.victim || v.name || "them") + "</b>: " + (o.harm || 0) + " harm" + (down ? ", and they go down" : "") +
". It is marked against you, and the Dragon Corp is told." + (o.safe ? " (The rings are a safe zone: nobody can be knocked down here.)" : "") +
(o.patrol ? " A Corp dragon is over this sector — it may have seen." : ""));
}).catch(function (e) { setStatus(esc((e && e.message) || "You miss.")); });
},
function (icon) {
var g = new THREE.Group();
var cv = document.createElement("canvas");
cv.width = 128;
cv.height = 128;
var c = cv.getContext("2d");
var gr = c.createRadialGradient(64, 64, 6, 64, 64, 62);
gr.addColorStop(0, "rgba(255,244,214,.95)");
gr.addColorStop(0.45, "rgba(232,194,122,.45)");
gr.addColorStop(1, "rgba(232,194,122,0)");
c.fillStyle = gr;
c.fillRect(0, 0, 128, 128);
c.font = "64px serif";
c.textAlign = "center";
c.textBaseline = "middle";
c.fillText(icon || "💎", 64, 68);
var tex = new THREE.CanvasTexture(cv);
if (THREE.SRGBColorSpace)
tex.colorSpace = THREE.SRGBColorSpace;
var sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
sp.scale.set(1.3, 1.3, 1);
g.add(sp);
var gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.16, 0), new THREE.MeshLambertMaterial({ color: 0xFFE7B0, emissive: new THREE.Color(0xB08A3A), emissiveIntensity: 0.8 }));
gem.position.y = -0.75;
g.add(gem);
g.userData.gem = gem;
g.userData.noCull = 1;
return g;
},
function (id, world) {
if (!(typeof signedIn === "function" && signedIn())) {
setStatus("Sign in to keep the rare things you find.");
return;
}
cityRpc("rare_take", { p_id: id, p_world: world }).then(function (o) {
setStatus(((o && o.ok) ? "💎 " : "") + esc((o && o.say) || "It slipped away."));
if (o && o.ok && typeof playTone === "function")
try {
playTone(660, 0.25);
}
catch (e) { }
rrLoad(true);
}).catch(function () { setStatus("It slipped away. Try again in a moment."); });
},
function () {
var b = RR.b, h = "<div style='display:flex;align-items:center;gap:8px;margin-bottom:8px'><b style='font-size:15px;flex:1'>💎 Rare things</b>" + rrBtn("x", "Close") + "</div>";
if (RR.say)
h += "<div style='margin:0 0 8px;padding:5px 8px;border:1px solid rgba(232,194,122,.4);border-radius:4px'>" + esc(RR.say) + "</div>";
if (!b)
return h + "<p>Looking…</p>";
var offers = b.offers || [];
h += "<div style='margin-bottom:8px'>" + [["mine", "Yours" + (rrMine().length ? " (" + rrMine().length + ")" : "")], ["offers", "Offers" + (offers.length ? " (" + offers.length + ")" : "")], ["reg", "The Register"], ["rules", "Zones"]].map(function (t) {
return "<button class='btn' data-rr='tab' data-t='" + t[0] + "' style='margin:0 4px 4px 0;" + (RR.tab === t[0] ? "background:#6A4A12;border-color:#E8C27A" : "") + "'>" + t[1] + "</button>";
}).join("") + "</div>";
var where = (b.wild || []).map(function (w) { return rrPlace(w.world); }).filter(function (v, i, a) { return a.indexOf(v) === i; });
if (RR.tab === "mine") {
if (!b.signed_in)
h += "<p>Sign in to keep rare things.</p>";
else if (!rrMine().length)
h += "<p style='opacity:.85'>You hold none yet. Each one is hidden in a world, glowing softly. Find one and press E. One a day each, so everyone has a chance.</p>";
rrMine().forEach(function (r) {
var o = RR.offer[r.id] || {}, sent = (b.sent || []).filter(function (s) { return s.item_id === r.id; })[0];
h += "<div style='padding:7px 0;border-top:1px solid rgba(201,168,104,.2)'><div><span style='font-size:20px'>" + esc(r.icon) + "</span> <b>" + esc(r.name) + "</b> <span style='opacity:.75'>No. " + r.serial + " of " + r.of + "</span></div>" +
"<div style='opacity:.8;font-size:12px;margin:2px 0'>" + esc(r.lore) + (r.relic ? " <b>Carry it to wield or wear it.</b>" : "") + "</div>" +
"<div>" + (r.carried ? "🎒 You carry it. " + rrBtn("keep", "Keep it at home", " data-id='" + r.id + "'") : "🏠 Kept safe at home. " + rrBtn("carry", "Carry it", " data-id='" + r.id + "'")) + "</div>";
if (sent)
h += "<div style='font-size:12px'>Offered to " + esc(sent.to_name || "a dreamer") + (sent.price ? " for " + (+sent.price).toLocaleString() + " gold" : " as a gift") + " " + rrBtn("withdraw", "Take it back", " data-o='" + sent.id + "'") + "</div>";
else if ((b.friends || []).length)
h += "<div style='font-size:12px;margin-top:2px'>Offer it to <select data-rrto='" + r.id + "' style='background:#1A140C;color:inherit;border:1px solid #6A5A3A;border-radius:4px;padding:2px'>" +
b.friends.map(function (f) { return "<option value='" + esc(f.id) + "'" + (o.to === f.id ? " selected" : "") + ">" + esc(f.name || "a friend") + "</option>"; }).join("") + "</select> for <input data-rrprice='" + r.id + "' type='number' min='0' max='1000000' value='" + (o.price || 0) + "' style='width:80px;background:#1A140C;color:inherit;border:1px solid #6A5A3A;border-radius:4px;padding:2px'> gold (0 is a gift) " + rrBtn("offer", "Offer", " data-id='" + r.id + "'") + "</div>";
else
h += "<div style='font-size:12px;opacity:.7'>Make friends on your phone to offer it to someone.</div>";
h += "</div>";
});
if (where.length)
h += "<p style='opacity:.8;margin-top:10px'>Hidden now, somewhere in: " + where.map(esc).join(", ") + ".</p>";
}
else if (RR.tab === "offers") {
if (!offers.length)
h += "<p style='opacity:.8'>No one is offering you anything just now.</p>";
offers.forEach(function (o) {
var r = o.item || {};
h += "<div style='padding:7px 0;border-top:1px solid rgba(201,168,104,.2)'>" + esc(o.from_name || "A dreamer") + " offers you <b>" + esc(r.icon || "") + " " + esc(r.name || "") + "</b> (No. " + r.serial + " of " + r.of + ") " +
(o.price ? "for <b>" + (+o.price).toLocaleString() + " gold</b>" : "as a gift") + "<br>" + rrBtn("yes", o.price ? "Buy it" : "Take it", " data-o='" + o.id + "'") + rrBtn("no", "No, thank you", " data-o='" + o.id + "'") + "</div>";
});
}
else if (RR.tab === "reg") {
h += "<p style='opacity:.8;font-size:12px'>Every rare thing in the world, how many were ever made, and who holds them now.</p>";
(b.register || []).forEach(function (k) {
h += "<div style='padding:5px 0;border-top:1px solid rgba(201,168,104,.2)'><span style='font-size:18px'>" + esc(k.icon) + "</span> <b>" + esc(k.name) + "</b> <span style='opacity:.75'>· " + (k.total === 1 ? "only one in the world" : k.total + " made") + " · " + k.found + " held</span>" +
((k.holders || []).length ? "<div style='font-size:12px;opacity:.85'>" + k.holders.map(function (x) { return "No. " + x.serial + ": " + esc(x.name || "a dreamer"); }).join(" · ") + "</div>" : "") + "</div>";
});
}
else {
var rule = b.rings || "protected";
h += "<p>🛡️ <b>The rings are a safe zone.</b> " + (rule === "none" ? "Nobody can be struck there." : rule === "open" ? "Striking someone there is a crime: the Dragon Corp is told and may arrest you." : "Striking someone there is a crime: the Dragon Corp is told and may arrest you. Nobody can be knocked down in the rings.") + "</p>" +
"<p>⚔️ <b>The Wilds are a danger zone.</b> Beyond the outer ring, fighting is open: no crime, no arrest. Whoever puts another dreamer down there takes one rare thing they were carrying. Go down out there any other way and a carried rare thing falls where you lie, for anyone to pick up within the hour.</p>" +
"<p>🏠 Rare things kept at home are always safe.</p>";
if (b.keeper)
h += "<p style='margin-top:10px'><b>Keeper:</b> fighting in the rings is " + [["protected", "Protected"], ["none", "Not allowed"], ["open", "Open (old rule)"]].map(function (x) {
return "<button class='btn' data-rr='rule' data-r='" + x[0] + "' style='margin:2px;" + (rule === x[0] ? "background:#6A4A12;border-color:#E8C27A" : "") + "'>" + x[1] + "</button>";
}).join("") + "</p>";
}
return h;
},
function () {
var el = document.getElementById("rr-box");
if (!RR.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "rr-box";
el.style.cssText = "position:fixed;z-index:53;left:50%;top:50%;transform:translate(-50%,-50%);width:min(540px,calc(100vw - 32px));max-height:min(86vh,780px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(28,22,14,.97),rgba(10,9,7,.98));border:1px solid #C9A868;border-radius:8px;padding:12px 14px 14px;color:var(--bone,#C9BEA8);" +
"font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", rrClick);
el.addEventListener("change", function (e) {
var t = e.target, id;
if ((id = t.getAttribute("data-rrto"))) {
(RR.offer[id] = RR.offer[id] || {}).to = t.value;
}
if ((id = t.getAttribute("data-rrprice"))) {
(RR.offer[id] = RR.offer[id] || {}).price = Math.max(0, Math.floor(+t.value || 0));
}
});
document.body.appendChild(el);
}
el.innerHTML = rrHtml();
el.style.display = "block";
},
function (e) {
var t = e.target.closest && e.target.closest("[data-rr]");
if (!t)
return;
var a = t.getAttribute("data-rr"), id = +t.getAttribute("data-id") || 0, oid = +t.getAttribute("data-o") || 0;
if (a === "x") {
RR.open = false;
rrPaint();
return;
}
if (a === "tab") {
RR.tab = t.getAttribute("data-t");
RR.say = "";
rrPaint();
return;
}
if (a === "carry" || a === "keep") {
rrAct("rare_carry", { p_id: id, p_carry: a === "carry" });
return;
}
if (a === "offer") {
var sel = document.querySelector("#rr-box [data-rrto='" + id + "']"), pr = document.querySelector("#rr-box [data-rrprice='" + id + "']");
var to = sel ? sel.value : null, price = pr ? Math.max(0, Math.floor(+pr.value || 0)) : 0;
if (!to) {
RR.say = "Choose who to offer it to.";
rrPaint();
return;
}
rrAct("rare_offer", { p_id: id, p_to: to, p_price: price });
return;
}
if (a === "withdraw") {
rrAct("rare_answer", { p_offer: oid, p_yes: false });
return;
}
if (a === "yes") {
rrAct("rare_answer", { p_offer: oid, p_yes: true });
return;
}
if (a === "no") {
rrAct("rare_answer", { p_offer: oid, p_yes: false });
return;
}
if (a === "rule") {
rrAct("zone_rule_set", { p_rule: t.getAttribute("data-r") });
return;
}
},
function () {
var m = rrMine();
if (!(typeof signedIn === "function" && signedIn()) || !m.length)
return "";
var x = '<div style="margin-top:6px"><b>💎 Rare things</b></div>';
m.forEach(function (r) {
var R = r.relic && typeof RL_BY !== "undefined" ? RL_BY[r.relic] : null, worn = R && R.kind === "armour" && typeof RL !== "undefined" && RL.worn && RL.worn[r.relic] && r.carried;
var use = R ? '<button class="btn" onclick="rrUse(' + (+r.id) + ')">' + (R.kind === "armour" ? (worn ? "Take it off" : "Wear it") : "Take it up") + '</button>' : "";
var move = r.carried ? '<button class="btn" onclick="rrCarry(' + (+r.id) + ',false)">Keep at home</button>' : '<button class="btn" onclick="rrCarry(' + (+r.id) + ',true)">Carry it</button>';
x += '<div style="display:flex;align-items:center;gap:6px;padding:3px 0;flex-wrap:wrap"><span style="flex:1 1 160px">' + esc(r.icon) + " " + esc(r.name) + ' <span style="opacity:.7">No. ' + r.serial + " of " + r.of + (worn ? ", worn" : r.carried ? ", carried" : ", at home") + '</span></span>' + use + move + '<button class="btn" onclick="rrOpen(\'mine\')">Open</button></div>';
});
return x;
},
function (e) { var m = String(e && e.message || e || ""); try {
var j = JSON.parse(m);
m = j.hint || j.message || m;
}
catch (x) { } return /function|404|schema cache/i.test(m) ? (typeof notOpenYet === "function" ? notOpenYet("Arenas open soon.", "Arenas need the latest server update.") : "Arenas open soon.") : m; },
function () {
if (!(typeof signedIn === "function" && signedIn())) {
AR.live = { ok: false, say: "Sign in to watch the arenas." };
arPaint();
return Promise.resolve();
}
if (AR.busy)
return Promise.resolve();
AR.busy = true;
var p = AR.tab === "live" ? cityRpc("arena_live", {}).then(function (o) { AR.live = o; }) : cityRpc("arena_board", {}).then(function (o) { AR.board = o; });
return p.catch(function (e) { AR.say = arErr(e); }).then(function () { AR.busy = false; AR.at = Date.now(); arPaint(); });
},
function (g) {
if (g.kind === "teams" && g.teams)
return "<b style='color:" + AR_SIDE[0][1] + "'>Red " + g.teams[0] + "</b> · <b style='color:" + AR_SIDE[1][1] + "'>Blue " + g.teams[1] + "</b>";
return arPlayers(g).slice().sort(function (a, b) { return b.score - a.score; }).slice(0, 4).map(function (r) { return esc(String(r.name || "?")) + " <b>" + r.score + "</b>"; }).join(" · ");
},
function () {
var h = "<div style='display:flex;align-items:center;gap:8px;margin-bottom:8px'><b style='font-size:15px;flex:1'>🏟️ Arenas</b>" + arBtn("x", "Close") + "</div>";
if (AR.say)
h += "<div style='margin:0 0 8px;padding:5px 8px;border:1px solid rgba(106,224,255,.4);border-radius:4px'>" + esc(AR.say) + "</div>";
if (AR.watch) {
var g = AR.wst;
h += "<div style='margin-bottom:6px'>" + arBtn("back", "‹ Back") + "<b>" + (g ? AR_KIND[g.kind] || "A match" : "Watching") + "</b>";
if (g) {
var now = Date.now() + (g.now ? g.now - AR.wAt : 0);
h += " · " + (g.status === "open" ? "starting soon" : g.status === "running" ? (function () { var t = Math.max(0, Math.ceil((g.ends - now) / 1000)); return Math.floor(t / 60) + ":" + ("0" + t % 60).slice(-2); })() : "over" + (g.result ? ": " + arResult(g.result, g.kind) : ""));
}
h += "</div><canvas id='ar-map' width='480' height='300' style='width:100%;max-width:480px;aspect-ratio:8/5;background:#0A1220;border:1px solid #2A4A6A;border-radius:6px;display:block'></canvas>";
if (g)
h += "<div id='ar-sc' style='margin-top:6px'>" + arScore(g) + "</div>";
h += "<p style='opacity:.7;font-size:12px'>A live view from the station's cameras. To play, go to Station Aurora: the tag rack in the arena, or the Duelling Deck.</p>";
return h;
}
h += "<div style='margin-bottom:8px'>" + [["live", "Live now"], ["results", "Results"], ["champs", "Champions"]].map(function (t) {
return "<button class='btn' data-ar='tab' data-t='" + t[0] + "' style='margin:0 4px 4px 0;" + (AR.tab === t[0] ? "background:#14405A;border-color:#6AE0FF" : "") + "'>" + t[1] + "</button>";
}).join("") + "</div>";
if (AR.tab === "live") {
var L = AR.live;
if (!L)
return h + "<p>Looking…</p>";
if (!L.ok)
return h + "<p>" + esc(L.say || "") + "</p>";
var gs = L.games || [];
if (!gs.length)
h += "<p style='opacity:.85'>No match is on just now. Start one on Station Aurora: laser tag or a team battle at the arena's tag rack, or a duel on the Duelling Deck. Anyone signed in can watch here.</p>";
gs.forEach(function (g) {
var n = arPlayers(g).length;
h += "<div style='padding:7px 0;border-top:1px solid rgba(106,224,255,.2)'><b>" + (AR_KIND[g.kind] || g.kind) + "</b> · " + n + " player" + (n === 1 ? "" : "s") + " · " +
(g.status === "open" ? "waiting to start" : g.status === "running" ? "<span style='color:#9AF0B0'>on now</span>" : "over " + arWhen(g.ends) + (g.result ? ", " + arResult(g.result, g.kind) : "")) +
"<div style='font-size:12.5px;margin:2px 0'>" + arScore(g) + "</div>" + arBtn("watch", g.status === "done" ? "See the floor" : "Watch", " data-g='" + g.game + "'") + "</div>";
});
return h;
}
var B = AR.board;
if (!B)
return h + "<p>Looking…</p>";
if (!B.ok)
return h + "<p>" + esc(B.say || "") + "</p>";
if (AR.tab === "results") {
var rs = B.recent || [];
if (!rs.length)
h += "<p style='opacity:.85'>No results yet.</p>";
rs.forEach(function (g) {
h += "<div style='padding:6px 0;border-top:1px solid rgba(106,224,255,.2)'><b>" + (AR_KIND[g.kind] || g.kind) + "</b> · " + arWhen(g.at) + " · " + arResult(g.result, g.kind) +
(g.kind === "teams" && g.result && g.result.teams ? " (" + g.result.teams[0] + " to " + g.result.teams[1] + ")" : "") +
"<div style='font-size:12.5px'>" + (g.players || []).map(function (p) { return (g.kind === "teams" && p.team != null ? "<span style='color:" + AR_SIDE[p.team][1] + "'>●</span> " : "") + (p.won ? "🏆 " : "") + esc(p.name || "?") + (p.me ? " (you)" : "") + " " + p.score; }).join(" · ") + "</div></div>";
});
return h;
}
var me = B.me || {};
h += "<div style='margin-bottom:8px'>Your record: <b>" + (me.won || 0) + "</b> win" + (me.won === 1 ? "" : "s") + " from " + (me.played || 0) + " (laser tag " + (me.tag || 0) + ", team battles " + (me.teams || 0) + ", duels " + (me.duel || 0) + "). Each win pays 40 experience.</div>";
[["all", "🏆 Most wins, last 30 days"], ["tag", "🔫 Laser tag"], ["teams", "🔴🔵 Team battles"], ["duel", "⚔️ Duels"]].forEach(function (d) {
var rows = (B.champions || {})[d[0]] || [];
h += "<div style='margin-bottom:8px'><div style='font-weight:600;margin-bottom:2px'>" + d[1] + "</div>";
if (!rows.length)
h += "<div style='opacity:.7;font-size:12px'>Nobody yet. It could be you.</div>";
rows.forEach(function (r, i) { h += "<div style='display:flex;gap:8px;font-size:12.5px;border-bottom:1px solid #1E2A3A;padding:2px 0'><span style='width:20px;opacity:.7'>" + (i + 1) + ".</span><span style='flex:1'>" + esc(r.name || "a dreamer") + " <span style='opacity:.65'>· " + esc(r.sub || "") + "</span></span><b>" + r.n + "</b></div>"; });
h += "</div>";
});
return h;
},
function () {
var el = document.getElementById("ar-box");
if (!AR.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "ar-box";
el.style.cssText = "position:fixed;z-index:53;left:50%;top:50%;transform:translate(-50%,-50%);width:min(540px,calc(100vw - 32px));max-height:min(86vh,780px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(12,22,34,.97),rgba(6,10,16,.98));border:1px solid #4A8AB8;border-radius:8px;padding:12px 14px 14px;color:#D6E4F0;" +
"font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", arClick);
document.body.appendChild(el);
}
el.innerHTML = arHtml();
el.style.display = "block";
if (AR.watch)
arMap();
},
function (e) {
var t = e.target.closest && e.target.closest("[data-ar]");
if (!t)
return;
var a = t.getAttribute("data-ar");
if (a === "x") {
arClose();
return;
}
if (a === "tab") {
AR.tab = t.getAttribute("data-t");
AR.say = "";
arPaint();
arLoad();
return;
}
if (a === "watch") {
AR.watch = +t.getAttribute("data-g");
AR.wst = null;
AR.draw = {};
AR.say = "";
arPaint();
arWatchPoll();
return;
}
if (a === "back") {
AR.watch = null;
AR.wst = null;
arPaint();
arLoad();
return;
}
},
function () {
if (!AR.open || !AR.watch || AR.wbusy)
return;
AR.wbusy = true;
var id = AR.watch;
cityRpc("arena_watch", { p_game: id }).then(function (o) { if (AR.watch !== id)
return; if (o && o.ok) {
AR.wst = o;
AR.wAt = Date.now();
}
else
AR.say = (o && o.say) || "That match is over."; })
.catch(function (e) { AR.say = arErr(e); }).then(function () { AR.wbusy = false; if (AR.open)
arPaint(); });
},
function () {
var c = document.getElementById("ar-map"), g = AR.wst;
if (!c || !c.getContext)
return;
var x = c.getContext("2d"), W = c.width, H = c.height, duel = g && g.kind === "duel";
var A = typeof SD_ARENA !== "undefined" ? SD_ARENA : { x0: 27.4, x1: 80.6, z0: -34.6, z1: -0.4 }, D = typeof SD_DUEL !== "undefined" ? SD_DUEL : { x: 42, z: 15, r: 6 };
var box = duel ? { x0: D.x - D.r - 3, x1: D.x + D.r + 3, z0: D.z - D.r - 3, z1: D.z + D.r + 3 } : A;
var sc = Math.min((W - 20) / (box.x1 - box.x0), (H - 20) / (box.z1 - box.z0)), ox = (W - (box.x1 - box.x0) * sc) / 2, oz = (H - (box.z1 - box.z0) * sc) / 2;
function px(v) { return ox + (v - box.x0) * sc; }
function pz(v) { return oz + (v - box.z0) * sc; }
x.clearRect(0, 0, W, H);
x.strokeStyle = "#2A6A8A";
x.lineWidth = 2;
if (duel) {
x.beginPath();
x.arc(px(D.x), pz(D.z), D.r * sc, 0, Math.PI * 2);
x.stroke();
}
else {
x.strokeRect(px(A.x0), pz(A.z0), (A.x1 - A.x0) * sc, (A.z1 - A.z0) * sc);
x.strokeStyle = "#1E3A50";
x.beginPath();
x.moveTo(px((A.x0 + A.x1) / 2), pz(A.z0));
x.lineTo(px((A.x0 + A.x1) / 2), pz(A.z1));
x.stroke();
}
if (!g) {
x.fillStyle = "#8AA0B8";
x.font = "14px system-ui";
x.fillText("Finding the match…", 20, 30);
return;
}
x.font = "12px system-ui";
x.textAlign = "center";
(g.players || []).forEach(function (r) {
if (r.out)
return;
var d = AR.draw[r.id] || (AR.draw[r.id] = { x: r.x, z: r.z });
d.tx = r.x;
d.tz = r.z;
var col = g.kind === "teams" && r.team != null ? AR_SIDE[r.team][1] : g.kind === "duel" ? "#FFD24A" : "#6AE0FF";
var tagged = r.tagged_age != null && r.tagged_age < 2000;
x.globalAlpha = tagged ? 0.4 : 1;
x.fillStyle = col;
x.beginPath();
x.arc(px(d.x), pz(d.z), 6, 0, Math.PI * 2);
x.fill();
x.globalAlpha = 1;
x.fillStyle = "#E8F0F8";
x.fillText(String(r.name || "?").split(" ")[0] + " " + r.score, px(d.x), pz(d.z) - 10);
});
x.textAlign = "left";
},
function (tab) {
AR.open = true;
AR.say = "";
if (tab)
AR.tab = tab;
AR.watch = null;
arPaint();
arLoad();
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
if (!AR.timer)
AR.timer = setInterval(function () {
try {
if (!AR.open) {
clearInterval(AR.timer);
AR.timer = null;
return;
}
arTick();
AR.tk = (AR.tk || 0) + 1;
if (AR.watch) {
if (AR.tk % 10 === 0 && !document.hidden)
arWatchPoll();
}
else if (AR.tab === "live" && AR.tk % 50 === 0 && !document.hidden)
arLoad();
}
catch (e) {
if (!AR.warned && window.console) {
AR.warned = 1;
console.warn("[arenas]", e);
}
}
}, 100);
},
function (e) { var m = String(e && e.message || e || ""); try {
var j = JSON.parse(m);
m = j.hint || j.message || m;
}
catch (x) { } return /function|404|schema cache/i.test(m) ? (typeof notOpenYet === "function" ? notOpenYet("Reputation opens soon.", "Reputation needs the latest server update.") : "Reputation opens soon.") : m; },
function (r) {
if (!r)
return "";
var rows = [["Good deeds (merit)", "+" + r.good], ["Misdeeds (merit)", r.bad ? "−" + r.bad : "0"], ["Traffic tickets", r.tickets ? r.tickets + " × −3" : "none"], ["Guilty verdicts", r.guilty ? r.guilty + " × −10" : "none"],
["Times in the gaol", r.gaol ? r.gaol + " × −5" : "none"], ["Neighbours' word", (r.words > 0 ? "+" : r.words < 0 ? "−" : "") + Math.abs(r.words) + " (" + r.commends + " commended, " + r.complaints + " complained)"]];
return "<table style='width:100%;font-size:12.5px;margin:4px 0'>" + rows.map(function (x) { return "<tr><td>" + x[0] + "</td><td style='text-align:right'>" + x[1] + "</td></tr>"; }).join("") +
"<tr><td><b>Standing</b></td><td style='text-align:right'><b>" + r.score + "</b></td></tr></table>";
},
function (list) {
if (!list || !list.length)
return "<p style='opacity:.7;font-size:12px'>No word yet from your neighbours.</p>";
return list.map(function (w) {
return "<div style='font-size:12.5px;padding:3px 0;border-top:1px solid #2A2418'>" + (w.kind === "commend" ? "🏅 " : "📋 ") +
(w.kind === "commend" ? "Commended by " + esc(w.from || "a dreamer") : "A complaint" + (w.from ? " from " + esc(w.from) : "")) + (w.note ? ": “" + esc(w.note) + "”" : "") + " <span style='opacity:.6'>" + arWhen(w.at) + "</span></div>";
}).join("");
},
function () {
var h = "<div style='display:flex;align-items:center;gap:8px;margin-bottom:8px'><b style='font-size:15px;flex:1'>🏅 Reputation</b>" + rpBtn("x", "Close") + "</div>";
if (RP.say)
h += "<div style='margin:0 0 8px;padding:5px 8px;border:1px solid rgba(232,194,122,.4);border-radius:4px'>" + esc(RP.say) + "</div>";
h += "<div style='margin-bottom:8px'>" + [["me", "Yours"], ["find", "Speak for someone"], ["how", "How it works"]].map(function (t) {
return "<button class='btn' data-rp='tab' data-t='" + t[0] + "' style='margin:0 4px 4px 0;" + (RP.tab === t[0] ? "background:#6A4A12;border-color:#E8C27A" : "") + "'>" + t[1] + "</button>";
}).join("") + "</div>";
if (RP.tab === "how") {
return h + "<p>Your standing is counted from the last <b>90 days</b> of your record, so it mends with time.</p>" +
"<p>Good deeds raise it: work, service, learning, arrests and help given all add merit. Misdeeds, traffic tickets (−3), guilty verdicts (−10) and time in the gaol (−5) lower it. Your neighbours' word adds or takes up to 20.</p>" +
"<p>" + rpLevel("Honoured") + " 40 and over · " + rpLevel("Respected") + " 10 to 39 · " + rpLevel("Ordinary") + " −9 to 9 · " + rpLevel("Doubtful") + " −29 to −10 · " + rpLevel("Notorious") + " −30 and below</p>" +
"<p><b>Doors it closes:</b> trusted posts (the Dragon Corp, the bank, the court, the gaol, the hospital and the schools) need Ordinary or better. A Notorious dreamer cannot rent a new market stall, sit at a stakes poker table, or speak for anyone.</p>" +
"<p><b>Doors it opens:</b> an Honoured dreamer's word counts half as much again, and the most Honoured are named on the leaderboards.</p>" +
"<p>Any dreamer whose dues are paid may commend or complain about another once a week. Commendations are signed. Complaints reach the dreamer unsigned; the Keeper can see who sent them and strike out a feud.</p>";
}
if (RP.tab === "find") {
h += "<input id='rp-q' placeholder='Find a dreamer by name' value='" + esc(RP.q) + "' style='width:100%;box-sizing:border-box;background:#1A140C;color:inherit;border:1px solid #6A5A3A;border-radius:4px;padding:6px;margin-bottom:6px'>";
if (RP.other) {
var o = RP.other;
h += "<div style='padding:8px;border:1px solid rgba(201,168,104,.35);border-radius:6px;margin-bottom:6px'><b>" + esc(o.name || "A dreamer") + "</b>: " + rpLevel(o.level) +
"<div style='font-size:12.5px;opacity:.85'>" + o.commends + " commended · " + o.complaints + " complained, in the last 90 days</div>";
if (o.keeper_view && o.rep)
h += rpBreakdown(o.rep) + rpHeard(o.heard) + rpBtn("strike", "Keeper: strike out their neighbours' word", " data-u='" + esc(o.id) + "'");
if (o.can_speak) {
h += "<div style='margin-top:6px'><input id='rp-note' maxlength='140' placeholder='A few words (optional)' value='" + esc(RP.note) + "' style='width:100%;box-sizing:border-box;background:#1A140C;color:inherit;border:1px solid #6A5A3A;border-radius:4px;padding:5px;margin-bottom:4px'>" +
rpBtn("commend", "🏅 Commend", " data-u='" + esc(o.id) + "'") + rpBtn("complain", "📋 Complain", " data-u='" + esc(o.id) + "'") + "</div>";
}
else if (!o.mine)
h += "<div style='font-size:12px;opacity:.75;margin-top:4px'>You spoke of them " + arWhen(o.spoke_at) + ". Once a week for each dreamer.</div>";
h += "</div>";
}
(RP.found || []).slice(0, 12).forEach(function (p) { h += "<div style='display:flex;align-items:center;gap:6px;padding:3px 0;border-top:1px solid #2A2418'><span style='flex:1'>" + esc(p.name || "a dreamer") + (p.here ? " <span style='color:#9AF0B0;font-size:11px'>● on now</span>" : "") + "</span>" + rpBtn("see", "See standing", " data-u='" + esc(p.id) + "'") + "</div>"; });
if (!RP.found.length && !RP.other)
h += "<p style='opacity:.75;font-size:12px'>Type a name to find a neighbour.</p>";
return h;
}
var c = RP.card;
if (!c)
return h + "<p>Counting…</p>";
if (!c.ok)
return h + "<p>" + esc(c.say || "") + "</p>";
h += "<div style='font-size:15px;margin-bottom:4px'>You are " + rpLevel(c.level) + "</div>";
if (c.level === "Keeper")
return h + "<p>The Keeper is above the law, and above reputation.</p>";
h += rpBreakdown(c.rep);
var d = c.doors || {}, shut = ["trusted", "stall", "stakes", "words"].filter(function (k) { return d[k]; });
h += "<div style='margin:6px 0'><b>Doors</b>" + (shut.length ? shut.map(function (k) { return "<div style='font-size:12.5px;color:#F0B08A'>🚪 " + esc(d[k]) + "</div>"; }).join("") : "<div style='font-size:12.5px;color:#B8E0A0'>Every door is open to you.</div>") +
(c.level === "Honoured" ? "<div style='font-size:12.5px;color:#F2D27A'>Your word counts half as much again when you commend or complain.</div>" : "") + "</div>";
h += "<div style='margin-top:8px'><b>What your neighbours said</b></div>" + rpHeard(c.heard);
if ((c.said || []).length)
h += "<div style='margin-top:8px'><b>What you said this month</b></div>" + c.said.map(function (w) { return "<div style='font-size:12px;opacity:.85'>" + (w.kind === "commend" ? "🏅 Commended " : "📋 Complained about ") + esc(w.name || "a dreamer") + " · " + arWhen(w.at) + "</div>"; }).join("");
return h;
},
function () {
var el = document.getElementById("rp-box");
if (!RP.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "rp-box";
el.style.cssText = "position:fixed;z-index:53;left:50%;top:50%;transform:translate(-50%,-50%);width:min(540px,calc(100vw - 32px));max-height:min(86vh,780px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(28,22,14,.97),rgba(10,9,7,.98));border:1px solid #C9A868;border-radius:8px;padding:12px 14px 14px;color:var(--bone,#C9BEA8);" +
"font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", rpClick);
el.addEventListener("input", function (e) {
if (e.target.id === "rp-note") {
RP.note = e.target.value;
return;
}
if (e.target.id !== "rp-q")
return;
RP.q = e.target.value;
clearTimeout(RP.qt);
RP.qt = setTimeout(function () {
var q = RP.q.trim();
if (!q) {
RP.found = [];
rpPaint();
rpFocus();
return;
}
cityRpc("phone_book", { p_q: q }).then(function (d) { RP.found = (d && d.people) || []; }).catch(function () { RP.found = []; }).then(function () { rpPaint(); rpFocus(); });
}, 350);
});
document.body.appendChild(el);
}
el.innerHTML = rpHtml();
el.style.display = "block";
},
function (e) {
var t = e.target.closest && e.target.closest("[data-rp]");
if (!t)
return;
var a = t.getAttribute("data-rp"), u = t.getAttribute("data-u");
if (a === "x") {
RP.open = false;
rpPaint();
return;
}
if (a === "tab") {
RP.tab = t.getAttribute("data-t");
RP.say = "";
rpPaint();
if (RP.tab === "me")
rpLoad();
return;
}
if (a === "see") {
RP.say = "";
rpSee(u);
return;
}
if ((a === "commend" || a === "complain") && !RP.busy) {
RP.busy = true;
cityRpc("rep_word", { p_user: u, p_kind: a, p_note: RP.note || "" }).then(function (o) { RP.say = (o && o.say) || ""; if (o && o.card && o.card.ok)
RP.other = o.card; RP.note = ""; })
.catch(function (e) { RP.say = rpErr(e); }).then(function () { RP.busy = false; rpPaint(); });
return;
}
if (a === "strike") {
cityRpc("rep_word_remove", { p_user: u, p_from: null }).then(function (o) { RP.say = (o && o.say) || ""; if (o && o.card && o.card.ok)
RP.other = o.card; }).catch(function (e) { RP.say = rpErr(e); }).then(rpPaint);
}
},
function (text, colour) {
var key = text + "|" + colour;
if (HA.tex["s:" + key])
return HA.tex["s:" + key];
var c = document.createElement("canvas");
c.width = 512;
c.height = 160;
var x = c.getContext("2d");
x.fillStyle = "#1A1612";
x.fillRect(0, 0, 512, 160);
x.strokeStyle = colour;
x.lineWidth = 8;
x.strokeRect(6, 6, 500, 148);
x.fillStyle = colour;
x.textAlign = "center";
x.textBaseline = "middle";
var F = typeof fitLines === "function" ? fitLines(x, String(text), 470, 2, 62, 22, "700", "Georgia, serif") : { size: 44, lines: [String(text)] };
x.font = "700 " + F.size + "px Georgia, serif";
var lh = F.size * 1.08, y0 = 80 - (F.lines.length - 1) * lh / 2;
F.lines.forEach(function (l, i) { x.fillText(l, 256, y0 + i * lh); });
var t = new THREE.CanvasTexture(c);
t.anisotropy = 4;
HA.tex["s:" + key] = t;
return t;
},
function (s) {
var g = new THREE.Group(), wood = new THREE.MeshLambertMaterial({ color: 0x4A3624 });
[-0.95, 0.95].forEach(function (x) { var p = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.3, 0.12), wood); p.position.set(x, 1.15, 0); g.add(p); });
var back = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.72, 0.08), wood);
back.position.set(0, 1.85, 0);
g.add(back);
var tex = haSignTex(s.text, s.colour || "#E8D9B0");
[1, -1].forEach(function (side) {
var f = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 0.62), new THREE.MeshLambertMaterial({ map: tex, emissive: 0x1A1A1A }));
f.position.set(0, 1.85, 0.045 * side);
if (side < 0)
f.rotation.y = Math.PI;
g.add(f);
});
g.name = "lot sign";
return g;
},
function (only) {
if (typeof cityLots === "undefined")
return;
var want = {};
cityLots.forEach(function (rec) { if (HA.signs[rec.lot_id])
want[rec.lot_id] = rec; });
Object.keys(HA.signMesh).forEach(function (id) {
if (want[id] && !(only && only[id]))
return;
var m = HA.signMesh[id];
if (m && m.parent)
m.parent.remove(m);
delete HA.signMesh[id];
});
Object.keys(want).forEach(function (id) {
if (HA.signMesh[id])
return;
var rec = want[id], b = haBoardOf(rec.name), h = typeof lotHome === "function" ? lotHome(rec.name) : null;
if (!b && !h)
return;
var bx = b ? b.x : h.x, bz = b ? b.z : h.z, rot = b ? (b.rot || 0) : (h.rot || 0);
var x = bx + Math.cos(rot) * 2.9, z = bz - Math.sin(rot) * 2.9;
var m = haSignMesh(HA.signs[id]);
var y = typeof terrainY === "function" ? terrainY(x, z) : 0;
m.position.set(x, y, z);
m.rotation.y = rot;
scene.add(m);
HA.signMesh[id] = m;
});
},
function (a) {
var g = new THREE.Group(), big = Math.max(a.w || 1, a.h || 1), W = 1.1 * (a.w || 1) / big, H = 1.1 * (a.h || 1) / big;
var frame = new THREE.Mesh(new THREE.BoxGeometry(W + 0.12, H + 0.12, 0.05), new THREE.MeshLambertMaterial({ color: 0x3A2A1A }));
g.add(frame);
var face = new THREE.Mesh(new THREE.PlaneGeometry(W, H), new THREE.MeshLambertMaterial({ map: haArtTex(a) }));
face.position.z = 0.03;
g.add(face);
if (a.status === "pending") {
var tag = new THREE.Mesh(new THREE.PlaneGeometry(W * 0.9, 0.12), new THREE.MeshBasicMaterial({ color: 0xC9A23A }));
tag.position.set(0, -H / 2 - 0.12, 0.03);
g.add(tag);
}
g.userData.art = a;
g.name = "picture " + a.art;
return g;
},
function (lot) {
if (!lot || HA.artAt[lot] && Date.now() - HA.artAt[lot] < 60000)
return;
HA.artAt[lot] = Date.now();
haRpc("art_on_lot", { p_lot: lot }).then(function (o) {
if (!o || !o.ok)
return;
var was = JSON.stringify((HA.art[lot] || []).map(function (a) { return [a.id, a.status]; }));
HA.art[lot] = o.art || [];
var now = JSON.stringify(HA.art[lot].map(function (a) { return [a.id, a.status]; }));
if (was !== now && haIntLot() === lot && !(typeof wpEditing !== "undefined" && wpEditing) && typeof rebuildHere === "function")
rebuildHere();
if (HA.open)
haPaint();
}).catch(function () { delete HA.artAt[lot]; });
},
function (spec) {
var I = haMakeInt0.apply(this, arguments);
try {
var m = I && I.wpKey && /^lot:(\d+)$/.exec(I.wpKey), lot = m ? +m[1] : 0;
if (lot) {
(HA.art[lot] || []).forEach(function (a) {
var g = haArtMesh(a);
g.position.set(+a.x || 0, (+a.l || 0) * (I.floor || 3.2) + 1.6, +a.z || 0);
g.rotation.y = +a.r || 0;
I.root.add(g);
});
setTimeout(function () { haArtLoad(lot); }, 50);
}
}
catch (e) {
if (!HA.warned && window.console) {
HA.warned = 1;
console.warn("[art]", e);
}
}
return I;
},
function (file) {
return new Promise(function (res, rej) {
if (!file || !/^image\//.test(file.type || ""))
return rej(new Error("That is not a picture."));
var url = URL.createObjectURL(file), img = new Image();
img.onload = function () {
var big = Math.max(img.width, img.height), s = Math.min(1, 512 / big), w = Math.max(16, Math.round(img.width * s)), h = Math.max(16, Math.round(img.height * s));
var c = document.createElement("canvas");
c.width = w;
c.height = h;
c.getContext("2d").drawImage(img, 0, 0, w, h);
URL.revokeObjectURL(url);
var q = 0.82, d = c.toDataURL("image/jpeg", q);
while (d.length > 135000 && q > 0.3) {
q -= 0.12;
d = c.toDataURL("image/jpeg", q);
}
if (d.length > 135000)
return rej(new Error("That picture is too detailed to make small. Try another."));
res({ data: d, w: w, h: h });
};
img.onerror = function () { URL.revokeObjectURL(url); rej(new Error("That picture could not be read.")); };
img.src = url;
});
},
function (e) { var m = String(e && e.message || e || ""); try {
var j = JSON.parse(m);
m = j.hint || j.message || m;
}
catch (x) { } return /function|404|schema cache/i.test(m) ? (typeof notOpenYet === "function" ? notOpenYet("Pictures and signs open soon.", "Pictures and signs need the latest server update.") : "Pictures and signs open soon.") : m; },
function () {
var h = "<div style='display:flex;align-items:center;gap:8px;margin-bottom:8px'><b style='font-size:15px;flex:1'>🖼️ Art and signs</b>" + haBtn("x", "Close") + "</div>";
if (HA.say)
h += "<div style='margin:0 0 8px;padding:5px 8px;border:1px solid rgba(232,194,122,.4);border-radius:4px'>" + esc(HA.say) + "</div>";
var d = HA.d;
if (!d)
return h + "<p>Looking…</p>";
if (!d.ok)
return h + "<p>" + esc(d.say || "") + "</p>";
var tabs = [["mine", "Your pictures"], ["gallery", "Gallery"], ["signs", "Your sign"]];
if (d.mod)
tabs.push(["review", "Review" + ((d.review || []).length ? " (" + d.review.length + ")" : "")]);
h += "<div style='margin-bottom:8px'>" + tabs.map(function (t) { return "<button class='btn' data-ha='tab' data-t='" + t[0] + "' style='margin:0 4px 4px 0;" + (HA.tab === t[0] ? "background:#6A4A12;border-color:#E8C27A" : "") + "'>" + t[1] + "</button>"; }).join("") + "</div>";
var here = haMyLotHere(), inLot = haIntLot();
if (HA.tab === "mine") {
if (d.may !== "ok")
h += "<p style='opacity:.85'>" + esc(d.may) + "</p>";
else {
h += "<div style='padding:6px 0'><b>Put up a picture</b><div style='font-size:12px;opacity:.8;margin:2px 0 4px'>A photo or drawing from your device. It is made small first (512 pixels at most). A moderator looks at every picture before anyone else can see it.</div>" +
"<input id='ha-title' maxlength='60' placeholder='A title' value='" + esc(HA.upTitle || "") + "' style='width:100%;box-sizing:border-box;background:#1A140C;color:inherit;border:1px solid #6A5A3A;border-radius:4px;padding:5px;margin-bottom:4px'>" +
"<input id='ha-file' type='file' accept='image/*' style='display:none'>" + haBtn("pick", "📷 Choose a picture") + (HA.up ? " <span style='opacity:.8'>Sending…</span>" : "") + "</div>";
}
if (inLot)
h += "<div style='font-size:12.5px;margin:4px 0;color:#B8E0A0'>" + (here ? "You are in your own house: hang a picture on the wall in front of you." : "You are visiting someone's house.") + "</div>";
(d.mine || []).forEach(function (a) {
h += "<div style='display:flex;gap:8px;padding:7px 0;border-top:1px solid rgba(201,168,104,.2)'>" + haThumb(a) + "<div style='flex:1;min-width:0'><b>" + esc(a.title) + "</b> <span style='font-size:12px;opacity:.8'>" + HA_ST[a.status] + "</span>" +
(a.reason ? "<div style='font-size:12px;opacity:.8'>" + esc(a.reason) + "</div>" : "") +
"<div style='font-size:12px;opacity:.8'>" + (a.hung ? "On " + a.hung + " wall" + (a.hung === 1 ? "" : "s") + ". " : "") + (a.sold ? a.sold + " print" + (a.sold === 1 ? "" : "s") + " sold. " : "") + "</div>" +
(here && a.status !== "rejected" ? haBtn("hang", "Hang it here", " data-id='" + a.id + "'") : "") +
(a.status === "approved" ? "<span style='font-size:12px'>Prints at <input data-haprice='" + a.id + "' type='number' min='1' max='100000' value='" + (HA.price[a.id] != null ? HA.price[a.id] : (a.price || "")) + "' placeholder='gold' style='width:70px;background:#1A140C;color:inherit;border:1px solid #6A5A3A;border-radius:4px;padding:2px'> " + haBtn("sell", a.price ? "Change" : "Sell prints", " data-id='" + a.id + "'") + (a.price ? haBtn("unsell", "Stop selling", " data-id='" + a.id + "'") : "") + "</span>" : "") +
haBtn("del", "Take away for good", " data-id='" + a.id + "'") + "</div></div>";
});
if ((d.prints || []).length) {
h += "<div style='margin-top:8px'><b>Prints you have bought</b></div>";
d.prints.forEach(function (a) { h += "<div style='display:flex;gap:8px;padding:6px 0;border-top:1px solid rgba(201,168,104,.2)'>" + haThumb(a) + "<div style='flex:1'><b>" + esc(a.title) + "</b><div style='font-size:12px;opacity:.8'>by " + esc(a.by || "a dreamer") + "</div>" + (here ? haBtn("hang", "Hang it here", " data-id='" + a.id + "'") : "") + "</div></div>"; });
}
if (inLot) {
var walls = HA.art[inLot] || [];
if (walls.length) {
h += "<div style='margin-top:8px'><b>On these walls</b></div>";
walls.forEach(function (a) {
h += "<div style='display:flex;align-items:center;gap:6px;font-size:12.5px;padding:3px 0;border-top:1px solid #2A2418'><span style='flex:1'>" + esc(a.title) + " <span style='opacity:.7'>by " + esc(a.by || "a dreamer") + "</span></span>" +
(here ? haBtn("down", "Take down", " data-id='" + a.id + "'") : haBtn("report", "Report", " data-id='" + a.art + "'")) + "</div>";
});
}
}
if (!(d.mine || []).length && !(d.prints || []).length)
h += "<p style='opacity:.75;font-size:12px'>No pictures yet.</p>";
return h;
}
if (HA.tab === "gallery") {
var G = HA.gal;
if (!G)
return h + "<p>Looking…</p>";
if (!G.ok)
return h + "<p>" + esc(G.say || "") + "</p>";
h += "<p style='font-size:12px;opacity:.8'>Prints of dreamers' own pictures. The maker gets 90% of the price; the city keeps 10%. Hang your print at home.</p>";
if (!(G.art || []).length)
h += "<p style='opacity:.8'>Nothing for sale yet.</p>";
(G.art || []).forEach(function (a) {
h += "<div style='display:flex;gap:8px;padding:7px 0;border-top:1px solid rgba(201,168,104,.2)'>" + haThumb(a) + "<div style='flex:1'><b>" + esc(a.title) + "</b><div style='font-size:12px;opacity:.8'>by " + esc(a.by || "a dreamer") + " · " + (+a.price).toLocaleString() + " gold · " + a.sold + " sold</div>" +
(a.mine ? "<span style='font-size:12px;opacity:.7'>Yours</span>" : a.have ? "<span style='font-size:12px;color:#B8E0A0'>You have a print</span>" : haBtn("buy", "Buy a print", " data-id='" + a.id + "'")) +
(a.mine ? "" : haBtn("report", "Report", " data-id='" + a.id + "'")) + "</div></div>";
});
h += "<div>" + (HA.page > 0 ? haBtn("prev", "‹ Back") : "") + (G.more ? haBtn("next", "More ›") : "") + "</div>";
return h;
}
if (HA.tab === "signs") {
if (d.may !== "ok")
return h + "<p>" + esc(d.may) + "</p>";
if (!(d.lots || []).length)
return h + "<p style='opacity:.85'>A sign stands on a lot you own or rent. Buy or rent one at the Land Office in the Civic Ring.</p>";
h += "<p style='font-size:12px;opacity:.8'>Up to 40 letters, in the colour you choose. It stands at the front of the lot for everyone to see.</p>";
d.lots.forEach(function (l) {
var s = HA.sign[l.id] || { text: l.sign || "", colour: l.colour || "#E8D9B0" };
h += "<div style='padding:6px 0;border-top:1px solid rgba(201,168,104,.2)'><b>" + esc(l.name) + "</b><div style='display:flex;gap:6px;align-items:center;margin-top:3px'>" +
"<input data-hasign='" + l.id + "' maxlength='40' value='" + esc(s.text) + "' placeholder='Your sign' style='flex:1;min-width:0;background:#1A140C;color:inherit;border:1px solid #6A5A3A;border-radius:4px;padding:5px'>" +
"<input data-hacol='" + l.id + "' type='color' value='" + esc(s.colour) + "' style='width:40px;height:30px;border:none;background:none'></div>" +
haBtn("signsave", "Put it up", " data-id='" + l.id + "'") + (l.sign ? haBtn("signdown", "Take it down", " data-id='" + l.id + "'") : "") + "</div>";
});
return h;
}
var R = d.review || [];
h += "<p style='font-size:12px;opacity:.8'>Every picture waits here until a moderator approves it. Refuse anything a 13-year-old should not see, anything cruel, and anything that is not theirs to show.</p>";
if (!R.length)
h += "<p style='opacity:.8'>Nothing waiting.</p>";
R.forEach(function (a) {
h += "<div style='padding:7px 0;border-top:1px solid rgba(201,168,104,.2)'><img src='" + esc(a.data) + "' alt='' style='max-width:100%;max-height:260px;border-radius:4px;display:block;margin-bottom:4px'><b>" + esc(a.title) + "</b> <span style='font-size:12px;opacity:.8'>by " + esc(a.by || "a dreamer") + "</span>" +
((a.reports || []).length ? "<div style='font-size:12px;color:#F0B08A'>Reported: " + a.reports.map(function (n) { return esc(n || "(no note)"); }).join(" · ") + "</div>" : "") +
"<div>" + haBtn("ok", "Approve", " data-id='" + a.id + "'") + haBtn("no", "Refuse", " data-id='" + a.id + "'") + "</div></div>";
});
if ((d.signs || []).length) {
h += "<div style='margin-top:10px'><b>Newest signs</b></div>";
d.signs.forEach(function (s) { h += "<div style='display:flex;align-items:center;gap:6px;font-size:12.5px;padding:3px 0;border-top:1px solid #2A2418'><span style='flex:1'>“" + esc(s.text) + "” <span style='opacity:.7'>on " + esc(s.lot_name || "a lot") + ", by " + esc(s.by || "a dreamer") + "</span></span>" + haBtn("signclear", "Take down", " data-id='" + s.lot + "'") + "</div>"; });
}
return h;
},
function () {
var el = document.getElementById("ha-box");
if (!HA.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "ha-box";
el.style.cssText = "position:fixed;z-index:53;left:50%;top:50%;transform:translate(-50%,-50%);width:min(540px,calc(100vw - 32px));max-height:min(86vh,780px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(28,22,14,.97),rgba(10,9,7,.98));border:1px solid #C9A868;border-radius:8px;padding:12px 14px 14px;color:var(--bone,#C9BEA8);" +
"font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", haClick);
el.addEventListener("input", function (e) {
var t = e.target, id;
if (t.id === "ha-title")
HA.upTitle = t.value;
if ((id = t.getAttribute("data-haprice")))
HA.price[id] = t.value;
if ((id = t.getAttribute("data-hasign"))) {
(HA.sign[id] = HA.sign[id] || haSignNow(id)).text = t.value;
}
if ((id = t.getAttribute("data-hacol"))) {
(HA.sign[id] = HA.sign[id] || haSignNow(id)).colour = t.value;
}
});
el.addEventListener("change", function (e) { if (e.target.id === "ha-file" && e.target.files && e.target.files[0])
haUpload(e.target.files[0]); });
document.body.appendChild(el);
}
el.innerHTML = haHtml();
el.style.display = "block";
},
function (file) {
HA.up = true;
HA.say = "";
haPaint();
haShrink(file).then(function (p) {
return cityRpc("art_upload", { p_title: HA.upTitle || "", p_data: p.data, p_w: p.w, p_h: p.h }).then(function (o) { HA.say = (o && o.say) || ""; if (o && o.ok)
HA.upTitle = ""; });
}).catch(function (e) { HA.say = haErr(e); }).then(function () { HA.up = null; haLoad(); });
},
function (I, lv, fx, fz) {
if (!I || !I.walls)
return null;
var x = camera.position.x, z = camera.position.z;
for (var s = 0; s < 700; s++) {
var nx = x + fx * 0.05, nz = z + fz * 0.05, hit = false;
for (var i = 0; i < I.walls.length; i++) {
var w = I.walls[i];
if ((w.level || 0) !== lv || (w.h != null && w.h < 1.6))
continue;
if (Math.abs(nx - w.x) < w.hw && Math.abs(nz - w.z) < w.hd) {
hit = true;
break;
}
}
if (hit)
return s < 6 ? null : { x: +(x - I.ox).toFixed(2), z: +(z - I.oz).toFixed(2) };
x = nx;
z = nz;
}
return null;
},
function (e) {
var t = e.target.closest && e.target.closest("[data-ha]");
if (!t)
return;
var a = t.getAttribute("data-ha"), id = +t.getAttribute("data-id") || 0;
if (a === "x") {
HA.open = false;
haPaint();
return;
}
if (a === "tab") {
HA.tab = t.getAttribute("data-t");
HA.say = "";
haPaint();
if (HA.tab === "gallery")
haGallery();
return;
}
if (a === "pick") {
var f = document.getElementById("ha-file");
if (f)
f.click();
return;
}
if (a === "hang") {
var lot = haMyLotHere();
if (!lot || typeof wpHere !== "function") {
HA.say = "Stand in your own house, facing the wall.";
haPaint();
return;
}
var w = wpHere();
var fx = -Math.sin(yaw), fz = -Math.cos(yaw), I = INT, px = w.x, pz = w.z;
var pt = haWallAhead(I, w.l || 0, fx, fz);
if (pt) {
px = pt.x;
pz = pt.z;
}
haAct("art_hang", { p_art: id, p_lot: lot, p_x: +px.toFixed(2), p_z: +pz.toFixed(2), p_r: w.r, p_l: w.l }, function (o) { if (o && o.ok) {
delete HA.artAt[lot];
haArtLoad(lot);
} });
return;
}
if (a === "down") {
var l2 = haIntLot();
haAct("art_unhang", { p_id: id }, function () { delete HA.artAt[l2]; haArtLoad(l2); });
return;
}
if (a === "sell") {
var pr = Math.floor(+HA.price[id] || 0);
if (pr < 1) {
HA.say = "Set a price in gold first.";
haPaint();
return;
}
haAct("art_sell", { p_id: id, p_price: pr });
return;
}
if (a === "unsell") {
haAct("art_sell", { p_id: id, p_price: null });
return;
}
if (a === "del") {
if (!confirm("Take this picture away for good? It comes down from every wall, prints included."))
return;
haAct("art_delete", { p_id: id });
return;
}
if (a === "buy") {
haAct("art_buy", { p_id: id }, function () { haGallery(); });
return;
}
if (a === "report") {
var why = prompt("What is wrong with this picture? (optional)") || "";
haAct("art_report", { p_id: id, p_note: why });
return;
}
if (a === "ok") {
haAct("art_decide", { p_id: id, p_ok: true, p_reason: "" });
return;
}
if (a === "no") {
var r = prompt("Why not? The maker is told. (optional)") || "";
haAct("art_decide", { p_id: id, p_ok: false, p_reason: r });
return;
}
if (a === "signsave") {
var s = HA.sign[id] || haSignNow(id);
haAct("lot_sign_set", { p_lot: id, p_text: s.text, p_colour: s.colour }, function (o) { if (o && o.ok) {
delete HA.sign[id];
HA.since = Math.max(0, HA.since - 15000);
haPoll();
} });
return;
}
if (a === "signdown") {
haAct("lot_sign_set", { p_lot: id, p_text: "", p_colour: null }, function () { delete HA.sign[id]; HA.since = Math.max(0, HA.since - 15000); haPoll(); });
return;
}
if (a === "signclear") {
haAct("lot_sign_clear", { p_lot: id });
return;
}
if (a === "prev") {
HA.page = Math.max(0, HA.page - 1);
haGallery();
return;
}
if (a === "next") {
HA.page++;
haGallery();
return;
}
}
];
});
