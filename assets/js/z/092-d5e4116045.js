/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(92, function () {
"use strict";
return [
function () {
var p = document.getElementById("pd-powers");
if (p && p.style.display === "block") {
p.style.display = "none";
return;
}
if (!p) {
p = document.createElement("div");
p.id = "pd-powers";
p.style.cssText = "position:fixed;z-index:20;left:50%;top:14%;transform:translateX(-50%);width:min(340px,92vw);" +
"max-height:70vh;overflow-y:auto;background:rgba(9,11,16,.96);border:1px solid var(--line,#333);border-radius:4px;padding:16px 18px";
document.body.appendChild(p);
}
var d = dreamer(), have = {};
(d.abilities || []).forEach(function (a) { have[a.name] = a; });
var h = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">' +
'<b style="color:var(--bone,#ddd);font-weight:500">What you can do in dreams</b>' +
'<button class="btn" id="pw-close">Done</button></div>' +
'<p style="font-size:12px;color:var(--dim,#999);margin:0 0 12px;line-height:1.5">These come from your dreams. You can also switch one on yourself &mdash; it is your dream.</p>';
ABILITY.forEach(function (pair) {
var on = !!have[pair[0]], src = on && have[pair[0]].src === "stated" ? " <span style=\"color:var(--gold,#C9A868)\">dreamt</span>" : "";
h += '<div style="display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid var(--line,#333)">' +
'<input type="checkbox" data-ab="' + esc(pair[0]) + '"' + (on ? " checked" : "") + ' style="width:auto">' +
'<span style="flex:1;font-size:14px">' + esc(pair[0]) + src + "</span></div>";
});
p.innerHTML = h;
p.style.display = "block";
document.getElementById("pw-close").onclick = function () { p.style.display = "none"; };
Array.prototype.forEach.call(p.querySelectorAll("[data-ab]"), function (c) {
c.onchange = function () {
var nm = c.getAttribute("data-ab"), d2 = dreamer();
if (c.checked) {
if (!hasAbility(nm))
d2.abilities.push({ name: nm, nights: [store.session], src: "chosen" });
}
else
d2.abilities = d2.abilities.filter(function (a) { return a.name !== nm; });
if (typeof canFly !== "undefined")
canFly = hasAbility("flying") || hasAbility("floating");
save();
};
});
}
];
});
