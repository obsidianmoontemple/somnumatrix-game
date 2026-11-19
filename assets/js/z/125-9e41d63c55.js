/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(125, function () {
"use strict";
return [
function (h) {
if (!h || typeof h.hp !== "number")
return;
var prev = HARM.state, before = HARM.hp;
HARM.hp = Math.max(0, Math.min(100, h.hp));
HARM.state = h.state || (HARM.hp <= 0 ? "down" : HARM.hp < 70 ? "hurt" : "well");
HARM.recovers = h.recovers_at || null;
var ev = h.events || [];
ev.forEach(function (e) {
if (e.kind === "assault" || e.kind === "downed") {
setStatus("<b>" + esc(e.by || "Somebody") + " struck you</b> — " + (e.amount || 0) + " harm." + (e.kind === "downed" ? " You go down." : "") +
" The Dragon Corp has been told.");
harmFlash();
}
else if (e.kind === "treated") {
setStatus("<b>" + esc(e.by || "A nurse") + "</b> sees to you. You feel better already.");
}
});
if (prev !== HARM.state || before !== HARM.hp || ev.length)
harmFire(prev, ev);
if (prev !== "down" && HARM.state === "down")
harmGoDown();
if (prev === "down" && HARM.state !== "down") {
HARM.hosp = false;
setStatus("<b>You are on your feet again.</b> The hospital lets you go — go gently for a while.");
}
harmPaint();
},
function () {
var v = document.getElementById("harm-vignette");
if (v || !document.body)
return v;
v = document.createElement("div");
v.id = "harm-vignette";
v.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:30;opacity:0;transition:opacity .6s;" +
"background:radial-gradient(ellipse at center,rgba(0,0,0,0) 48%,rgba(120,8,8,.55) 82%,rgba(70,0,0,.85) 100%)";
document.body.appendChild(v);
var c = document.createElement("div");
c.id = "harm-chip";
c.style.cssText = "position:fixed;left:50%;top:calc(88px + env(safe-area-inset-top,0px));transform:translateX(-50%);z-index:44;display:none;" +
"background:rgba(10,12,18,.9);border:1px solid #C0603A;border-radius:3px;padding:5px 11px;font:12.5px var(--sans);color:var(--bone)";
document.body.appendChild(c);
return v;
},
function () {
var v = harmEls();
if (!v)
return;
var c = document.getElementById("harm-chip");
var bad = HARM.state === "down" ? 1 : HARM.state === "hurt" ? Math.max(0.25, 1 - HARM.hp / 70) : 0;
v.style.opacity = String(bad * 0.9);
if (HARM.state === "well") {
c.style.display = "none";
return;
}
c.style.display = "block";
c.innerHTML = HARM.state === "down" ? "<b style='color:#E07050'>Down</b> · at the City Hospital" + (HARM.recovers ? " · on your feet about " + harmClock(HARM.recovers) : "") :
"<b style='color:#E0A050'>Hurt</b> · " + HARM.hp + " of 100 · mending by itself";
},
function (iso) {
var t = Date.parse(iso);
if (!isFinite(t))
return "";
if (typeof CITYCLOCK !== "undefined" && CITYCLOCK.offset !== null && typeof hm === "function")
return hm(t / 3600000 + CITYCLOCK.offset / 60) + " city time";
var d = new Date(t);
return (d.getHours() < 10 ? "0" : "") + d.getHours() + ":" + (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
},
function (msg) {
var s = hospitalSpec();
if (!s)
return false;
if (!inHospital())
enterBuilding(s);
INT.level = 0;
if (typeof wallsAt !== "undefined")
wallsAt = -1;
var beds = (INT.spots || []).filter(function (q) { return q.room === "ward" && !(q.level > 0); });
if (!beds.length)
beds = (INT.spots || []).filter(function (q) { return !(q.level > 0); });
var id = (typeof myUserId === "function" && myUserId()) || "x", b = beds[hash(id) % Math.max(1, beds.length)] || { x: 0, z: 0 };
camera.position.set(INT.ox + b.x, 1.72, INT.oz + b.z);
if (typeof flyY !== "undefined")
flyY = 0;
HARM.hosp = true;
if (msg)
setStatus(msg);
return true;
},
function () {
harmFlash();
if (typeof CORP !== "undefined" && CORP.mounted && typeof corpMount === "function")
corpMount(false);
var inCity = typeof inCityNow === "function" && inCityNow();
if (!inCity) {
setStatus("<b>You are down.</b> When you come back to Somnucor you will wake in the City Hospital.");
return;
}
harmToWard("<b>You go down.</b> You are carried to the City Hospital" + (HARM.recovers ? " and will be on your feet about " + harmClock(HARM.recovers) : "") +
". A physician or a nurse can see to you sooner.");
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
if (typeof sayOver === "function")
sayOver(v.id, o.victim_state === "down" ? "…" : "Ow!");
if (v.p && v.p.group)
harmKnock(v.p.group, o.victim_state === "down");
cityRpc("say_in_city", { p_body: "* strikes " + (v.name || "a dreamer") + (o.victim_state === "down" ? ", who goes down *" : " *"), p_channel: "near" }).catch(function () { });
if (typeof MERIT !== "undefined")
MERIT.at = 0;
if (o.caught)
return arrestScene(o, "assault");
setStatus("You strike <b>" + esc(o.victim || v.name || "them") + "</b> — " + (o.harm || 0) + " harm" + (o.victim_state === "down" ? ", and they go down" : "") +
". It is marked against you, and the Dragon Corp is told." + (o.patrol ? " A Corp dragon is over this sector — it may have seen." : ""));
}).catch(function (e) {
if (rpcMissing(e) && typeof misdeed === "function") {
misdeed("assault", v.id, "struck at " + (v.name || "a dreamer"));
if (typeof sayOver === "function")
sayOver(v.id, "…unhurt.");
setStatus("You strike at <b>" + esc(v.name || "them") + "</b>. It does them no harm here. It only marks you, and the Dragon Corp is told.");
}
else
setStatus(esc(e.message));
});
},
function (stall) {
if (HARM_COOL > 0)
return;
HARM_COOL = 2;
var what = "took from " + ((stall && (stall.label || stall.name)) || "a market stall");
cityRpc("theft_at_stall", { p_note: what }).then(function (o) {
if (!o)
return;
if (o.ok === false) {
setStatus(esc(o.say || "Not now."));
return;
}
if (typeof MERIT !== "undefined")
MERIT.at = 0;
if (o.caught)
return arrestScene(o, "theft");
setStatus("You pocket something from the stall. It is worth nothing to you, but it is marked against you and the Dragon Corp is told." +
(o.patrol ? " A Corp dragon is over this sector." : ""));
}).catch(function (e) {
if (rpcMissing(e) && typeof misdeed === "function") {
misdeed("theft", null, what);
setStatus("You pocket something from the stall. It is marked against you, and the Dragon Corp is told.");
}
else
setStatus(esc(e.message));
});
},
function (kind, detail, victimId) {
if (!(typeof signedIn === "function" && signedIn()))
return Promise.resolve(null);
kind = String(kind || "").toLowerCase().replace(/[^a-z_]/g, "_");
if (CRIME_SAID[kind] && Date.now() - CRIME_SAID[kind] < 60000)
return Promise.resolve(null);
CRIME_SAID[kind] = Date.now();
return cityRpc("report_offence", { p_kind: kind, p_note: String(detail || "").slice(0, 300), p_victim: victimId || null }).then(function (o) {
if (o && o.caught)
arrestScene(o, kind.replace(/_/g, " "));
else if (o && o.ok)
setStatus("<b>The Dragon Corp has been told.</b> " + esc(String(detail || kind.replace(/_/g, " "))) + " is marked against you.");
return o;
}).catch(function (e) { if (window.console)
console.warn("reportCrime:", e && e.message); return null; });
},
function (o, what) {
var hear = o.hearing_at ? harmClock(o.hearing_at) : "";
var by = o.by === "rider" ? ("<b>" + esc(o.rider || "A rider of the Dragon Corp") + "</b> of the Dragon Corp saw it") :
("<b>" + esc(standinRiderName(o.sector)) + "</b>, a rider of the Dragon Corp over sector " + (o.sector || "?") + ", swoops down");
setStatus(by + " and arrests you for " + esc(what || "it") + ". " +
(o.case ? "You are charged, and the case is listed at The Courthouse" + (hear ? " for " + hear : "") + ". " : "") +
(o.remand ? "You are held in the Gaol on remand until the hearing." : o.bail ? "You are bailed to appear — the court does not sit until morning." : ""));
if (o.by === "standin")
arrestSwoop();
setTimeout(function () {
if (typeof refreshStanding === "function")
refreshStanding().then(function () { if (o.remand && typeof heldNow === "function" && heldNow() && typeof toCell === "function")
toCell("<b>On remand.</b> The cells, until the court sends for you. " + (hear ? "The hearing is at " + hear + "." : "")); });
if (typeof courtRefresh === "function")
courtRefresh(true);
}, o.by === "standin" ? 2600 : 400);
},
function () {
if (typeof buildMountDragon !== "function" || store.inside)
return;
if (ARREST.g) {
scene.remove(ARREST.g);
ARREST.g = null;
}
var g = buildMountDragon((typeof DRAGON_COLS !== "undefined" && DRAGON_COLS.length) ? DRAGON_COLS[hash("swoop" + Date.now()) % DRAGON_COLS.length] : "blue", { lod: true });
g.userData.pose = "fly";
if (typeof buildFigure === "function") {
var r = buildFigure({ id: "arrest_rider", archetype: "human", attrs: {}, nights: [], city: true, detail: 3,
look: { sex: "m", top: 0x23324E, bottom: 0x1E2638, topKind: "shirt", bottomKind: "trousers", shoes: 0x2A1E14, gear: "cloak", gearColor: 0x23324E, hairStyle: "short" } }, 1);
r.position.y = (typeof DRAGON_SADDLE !== "undefined" ? DRAGON_SADDLE - DRAGON_HIP : 1.6);
if (typeof riderPose === "function")
riderPose(r);
g.add(r);
}
g.traverse(function (m) { m.raycast = function () { }; });
var P = camera.position, a = yaw + Math.PI * 0.75;
ARREST.from = { x: P.x + Math.sin(a) * 160, z: P.z + Math.cos(a) * 160, y: P.y + 120 };
ARREST.to = { x: P.x + Math.sin(yaw + Math.PI) * -4, z: P.z + Math.cos(yaw + Math.PI) * -4, y: (typeof terrainY === "function" ? terrainY(P.x, P.z) : P.y - 1.7) };
ARREST.t = 0;
ARREST.g = g;
scene.add(g);
}
];
});
