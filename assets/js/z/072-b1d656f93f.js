/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(72, function () {
"use strict";
return [
function (text) {
if (!text)
return;
var sents = (text.match(/[^.!?]+[.!?]?/g) || []).map(function (s) { return s.toLowerCase(); });
store.characters.forEach(function (c) {
if (!c.objId || c.primary === false || !c.aka || !c.aka.length)
return;
sents.forEach(function (s, i) {
if (!c.aka.some(function (a) { return a && s.indexOf(a) > -1; }))
return;
var o = typeof CREATURE !== "undefined" ? CREATURE[c.archetype] : null;
var threat = THREAT.test(s), friendly = FRIENDLY.test(s);
if (friendly) {
c.nightmare = false;
c.src = c.src || {};
c.src.nightmare = "stated";
return;
}
if (threat || (o && o.night && !(c.src && c.src.nightmare === "stated"))) {
c.nightmare = true;
if (threat) {
c.src = c.src || {};
c.src.nightmare = "stated";
}
}
if (!c.nightmare)
return;
var tail = sents.slice(i, i + 3).join(" ");
DEFEAT.forEach(function (d) {
if (d[1].test(tail)) {
c.defeat = c.defeat || [];
if (c.defeat.indexOf(d[0]) === -1)
c.defeat.push(d[0]);
}
});
});
});
},
function (c) {
nmOpen = c;
nmTimer = NM_WAIT;
var W = encounterWays(c), el = document.getElementById("nm-panel");
if (!el) {
el = document.createElement("div");
el.id = "nm-panel";
el.style.cssText = "position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:40;width:min(560px,92vw);" +
"background:rgba(8,6,10,.95);border:1px solid #5A2A2A;padding:16px 18px;border-radius:3px;box-shadow:0 0 40px rgba(120,0,0,.35)";
if (document.body)
document.body.appendChild(el);
}
function btn(way, label, mark) { return '<button class="btn" data-way="' + esc(way) + '" style="margin:3px' + (mark ? ';border-color:#C9A868;color:#E8C27A' : "") + '">' + esc(label) + "</button>"; }
var h = '<div style="color:#E8D8D0;font-size:15px;margin-bottom:4px"><b>' + esc(c.name && c.name !== "someone" ? c.name : "It") + '</b> has reached you.</div>' +
'<div style="height:3px;background:#2A1414;margin:8px 0 12px"><div id="nm-bar" style="height:3px;width:100%;background:#A8322B"></div></div>';
if (W.dreamt.length)
h += '<div style="font-size:12px;color:#C9A868;margin-bottom:4px">As you dreamt it ending</div>' + W.dreamt.map(function (w) { return btn(w, WAY_BUTTON[w] || w, true); }).join("");
if (W.abilities.length)
h += '<div style="font-size:12px;color:#9FB4D8;margin:8px 0 4px">What you can do in dreams</div>' + W.abilities.map(function (a) { return btn(a, a.slice(8)); }).join("");
h += '<div style="font-size:12px;color:#999;margin:8px 0 4px">' + (W.dreamt.length ? "Or another way \u2014 whatever you choose becomes true" : "The dream never said how it ended. Whatever you choose becomes true") + '</div>' +
W.rest.map(function (w) { return btn(w, WAY_BUTTON[w]); }).join("") +
'<div style="margin-top:10px">' + btn("run", "Run") + btn("wake", "Wake up") + "</div>";
el.innerHTML = h;
el.style.display = "block";
Array.prototype.forEach.call(el.querySelectorAll("[data-way]"), function (b) { b.onclick = function () { chooseWay(c, b.getAttribute("data-way")); }; });
if (typeof audio !== "undefined" && audio.on && typeof playTone === "function")
try {
playTone(70, 0.8);
}
catch (e) { }
},
function (c, way) {
closeEncounter();
if (way === "run") {
nmCool = 4;
var P = camera.position, g = meshes[c.objId];
if (g) {
var dx = P.x - g.position.x, dz = P.z - g.position.z, d = Math.sqrt(dx * dx + dz * dz) || 1;
walkBy(dx / d * 6, dz / d * 6);
}
setStatus("You run. It is still coming.");
return;
}
if (way === "wake") {
wakeAtDawn("You woke.");
return;
}
defeatNightmare(c, way);
},
function (c, way) {
var label = way.indexOf("ability:") === 0 ? ("with " + way.slice(8)) : (DEFEAT_LABEL[way] || way);
c.beaten = lastDreamt(c);
if (way.indexOf("ability:") !== 0) {
c.defeat = c.defeat || [];
if (c.defeat.indexOf(way) === -1)
c.defeat.push(way);
}
addDetail(c, "was defeated " + label + " when the dreamer faced it at night");
var g = meshes[c.objId];
if (g) {
var burst = particles(80, [1.5, 3, 1.5], way === "light" || way === "prayer" || way === "song" ? 0xFFF2D6 : way === "fire" ? 0xFF8A3A : 0xB8C4D8, 1.4, .9);
burst.position.set(g.position.x, 0, g.position.z);
scene.add(burst);
var t0 = 0, s0 = g.scale.x || 1;
var fade = function (dt) {
t0 += dt;
var k = Math.max(0, 1 - t0 / 1.6);
g.scale.set(s0 * k, s0 * k, s0 * k);
rise(burst, dt, 3, 0);
if (t0 >= 1.6) {
g.visible = false;
g.scale.set(s0, s0, s0);
scene.remove(burst);
return true;
}
return false;
};
nmFades.push(fade);
}
setStatus("<b>" + esc(c.name && c.name !== "someone" ? c.name : "It") + " is gone</b> \u2014 defeated " + esc(label) + ". It will not come again until you dream it again.");
save();
}
];
});
