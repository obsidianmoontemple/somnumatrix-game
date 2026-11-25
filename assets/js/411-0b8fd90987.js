/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var STI = { near: null, at: 0, cards: {}, rep: null, me: null, open: null };
function stiInCity() { return typeof inSomnucorNow === "function" && inSomnucorNow() && typeof walkMode !== "undefined" && walkMode; }
function stiName(p) { return String((p && p.name) || "a dreamer").split(" · ")[0].replace(/\s*\[[^\]]*\]$/, ""); }
function stiCovers() {
if (STI.me && STI.me.young)
return false;
var J = (typeof WORK !== "undefined" && WORK.data && WORK.data.jobs) || [];
return J.some(function (j) { return j.offline; });
}
function stiNearest(reach) {
if (typeof presenceOthers === "undefined" || typeof camera === "undefined")
return null;
var P = camera.position, best = null, bd = reach * reach;
Object.keys(presenceOthers).forEach(function (id) {
var p = presenceOthers[id], g = p && p.group;
if (!p || !p.away || !g || !g.visible)
return;
var dx = g.position.x - P.x, dz = g.position.z - P.z, d = dx * dx + dz * dz;
if (d < bd && Math.abs(g.position.y - (P.y - 1.6)) < 4) {
bd = d;
best = id;
}
});
return best;
}
function stiButton(id) {
var el = document.getElementById("sti-talk");
if (!id) {
if (el)
el.style.display = "none";
STI.near = null;
return;
}
if (!el) {
el = document.createElement("button");
el.id = "sti-talk";
el.type = "button";
el.style.cssText = "position:fixed;left:50%;transform:translateX(-50%);bottom:calc(196px + env(safe-area-inset-bottom,0px));z-index:40;padding:10px 16px;border-radius:999px;border:1px solid #C9A2E8;background:rgba(11,10,20,.88);color:#EDE8F8;font:600 14px system-ui,sans-serif;cursor:pointer";
el.onclick = function (ev) { ev.stopPropagation(); if (STI.near)
stiTalk(STI.near); };
document.body.appendChild(el);
}
STI.near = id;
var label = "🧍 Talk to " + stiName(presenceOthers[id]) + "'s stand-in";
if (el.textContent !== label)
el.textContent = label;
el.style.display = "block";
}
function stiBusy() {
if (typeof talkOpen !== "undefined" && talkOpen)
return true;
if (typeof greetOpen !== "undefined" && greetOpen)
return true;
return false;
}
(function () {
function loop() {
try {
var now = performance.now();
if (now - STI.at > 400) {
STI.at = now;
if (!stiInCity() || stiBusy())
stiButton(null);
else
stiButton(stiNearest(3.6));
}
}
catch (e) {
if (!STI.warned && window.console) {
STI.warned = 1;
console.warn("[stand-ins]", e);
}
}
requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
})();
function stiPersona(k, doing) { return __ZC(411, 0, this, arguments, new.target); }
function stiTalk(id) { return __ZC(411, 1, this, arguments, new.target); }
(function () {
if (typeof stfOk !== "function")
return;
var so = stfOk;
stfOk = function (d, ctx) { if (ctx && ctx.c && (ctx.c.stiUid || / \(stand-in\)$/.test(ctx.c.name || "")))
return false; return so.apply(this, arguments); };
})();
(function () {
if (typeof closeTalk !== "function")
return;
var ct = closeTalk;
closeTalk = function () {
try {
var o = STI.open;
STI.open = null;
if (o && o.c && o.c.stiUid) {
var said = (o.c.log || []).slice(o.from).filter(function (m) { return m.who === "me"; }).map(function (m) { return String(m.text || ""); }).slice(-2).join(" / ");
if (said)
cityRpc("standin_note", { p_user: o.c.stiUid, p_line: said }).catch(function () { });
}
}
catch (e) { }
return ct.apply(this, arguments);
};
})();
function stiLoad(since) {
if (typeof cityRpc !== "function")
return Promise.resolve(null);
return cityRpc("my_standin", { p_since: since }).then(function (o) { if (o && o.ok) {
STI.me = o;
} return o; }).catch(function () { return null; });
}
(function () {
if (typeof arpAsk !== "function")
return;
var aa = arpAsk;
arpAsk = function (since, open) {
var p = new Date(since || Date.now() - 86400000).toISOString();
return stiLoad(p).then(function () { return aa.call(this, since, open); });
};
})();
var STI_ICON = { case: "🐉", repair: "🛠️", talk: "💬", note: "·" };
(function () {
if (typeof arpHtml !== "function")
return;
var ah = arpHtml;
arpHtml = function () {
var h = ah.apply(this, arguments), L = (STI.me && STI.me.log) || [];
if (!L.length)
return h;
var x = '<div style="margin:8px 0 2px"><b>Your stand-in also</b></div>' + L.slice(-20).map(function (r) {
return '<div style="margin:3px 0;line-height:1.45">' + (STI_ICON[r.kind] || "·") + ' ' + esc(r.line) + (r.gold ? ' <b>(+' + (typeof gold === "function" ? gold(r.gold) : r.gold + " gold") + ')</b>' : '') + '</div>';
}).join("");
return h.replace(/<\/div>$/, x + '</div>');
};
})();
(function () {
if (typeof workPaint !== "function")
return;
var wp = workPaint;
workPaint = function () {
wp.apply(this, arguments);
try {
var el = document.getElementById("work");
if (!el || el.style.display === "none")
return;
if (!STI.me && !STI.asked) {
STI.asked = true;
stiLoad(null).then(function (o) { if (o)
workPaint(); });
return;
}
if (!STI.me || STI.me.young)
return;
var box = document.createElement("div");
box.innerHTML = '<div class="job" id="sti-set"><b>Your stand-in</b><div style="color:var(--dim);margin:2px 0 6px;line-height:1.5">While you are away, others may walk up and talk to your stand-in at work. It keeps your post, takes messages and your work calls, and never spends, sells or promises anything of yours. You hear what was said in your away report.</div>' +
'<label style="display:block;margin:4px 0"><input type="checkbox" id="sti-talk-on"' + (STI.me.talk !== false ? ' checked' : '') + '> People may talk to my stand-in</label>' +
'<label style="display:block;margin:4px 0">How my stand-in talks (in your own words)<br><textarea id="sti-words" maxlength="400" rows="2" style="width:100%;box-sizing:border-box">' + esc(STI.me.words || "") + '</textarea></label>' +
'<button class="btn" id="sti-save">Save</button></div>';
el.appendChild(box);
var w = document.getElementById("sti-words");
if (w) {
w.addEventListener("keydown", function (ev) { ev.stopPropagation(); });
w.addEventListener("keyup", function (ev) { ev.stopPropagation(); });
}
document.getElementById("sti-save").onclick = function () {
var on = document.getElementById("sti-talk-on").checked, words = document.getElementById("sti-words").value;
cityRpc("standin_set", { p_talk: on, p_words: words }).then(function (r) { if (r && r.ok) {
STI.me.talk = on;
STI.me.words = words;
setStatus("<b>Your stand-in is set.</b>");
}
else
setStatus(esc((r && r.say) || "Not saved.")); })
.catch(function () { setStatus("Not saved just now."); });
};
}
catch (e) {
if (window.console)
console.warn("[stand-ins]", e);
}
};
})();
