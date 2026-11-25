/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(139, function () {
"use strict";
return [
function () {
var el = document.getElementById("decor-panel");
if (!el) {
el = document.createElement("div");
el.id = "decor-panel";
el.style.cssText = "position:fixed;right:12px;bottom:calc(96px + env(safe-area-inset-bottom,0px));z-index:46;width:min(380px,calc(100vw - 24px));max-height:min(72vh,640px);overflow:auto;background:rgba(8,10,16,.96);border:1px solid #E0761E;border-radius:4px;padding:12px 14px;font:13px var(--sans);color:var(--bone)";
document.body.appendChild(el);
}
if (!DGUILD.open) {
el.style.display = "none";
return;
}
el.style.display = "block";
var s = DGUILD.state || { theme: "auto", quarters: {}, density: "normal", lit: true };
var h = '<div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:14px">The city\'s decor</b><button class="btn" id="dc-x">Close</button></div>' +
'<div style="color:var(--dim);margin:6px 0 8px;line-height:1.5">What you choose here is what every dreamer sees. Now showing: <b style="color:var(--bone)">' + esc(DECOR_THEMES.filter(function (t) { return t[0] === decorTheme(); })[0][1]) + '</b>' +
(s.by_name ? ' · set by ' + esc(s.by_name) : '') + '.</div>' +
'<label style="display:block;margin:6px 0 3px">Season</label><select id="dc-theme" style="width:100%">' + DECOR_THEMES.map(function (t) { return '<option value="' + t[0] + '"' + ((s.theme || "auto") === t[0] ? ' selected' : '') + '>' + esc(t[1]) + (t[0] === "auto" ? " (now " + esc(decorCalendar()) + ")" : "") + '</option>'; }).join("") + '</select>' +
'<label style="display:block;margin:10px 0 3px">How much</label><select id="dc-dens" style="width:100%">' + [["light", "A light touch"], ["normal", "Well dressed"], ["lavish", "Lavish"]].map(function (t) { return '<option value="' + t[0] + '"' + ((s.density || "normal") === t[0] ? ' selected' : '') + '>' + t[1] + '</option>'; }).join("") + '</select>' +
'<label style="display:block;margin:10px 0 3px">Which quarters</label>' + DECOR_QUARTERS.map(function (q) { var on = !s.quarters || s.quarters[q[0]] !== false; return '<label style="display:block;margin:2px 0"><input type="checkbox" data-q="' + q[0] + '"' + (on ? ' checked' : '') + '> ' + esc(q[1]) + '</label>'; }).join("") +
'<label style="display:block;margin:10px 0 3px"><input type="checkbox" id="dc-lit"' + (s.lit === false ? '' : ' checked') + '> Light the lanterns and jack-o\'-lanterns at night</label>' +
'<div style="margin-top:12px"><button class="btn" id="dc-save">Dress the city</button> <span id="dc-msg" style="color:var(--dim)"></span></div>';
el.innerHTML = h;
document.getElementById("dc-x").onclick = function () { DGUILD.open = false; decorPanel(); };
document.getElementById("dc-save").onclick = function () {
var q = {};
Array.prototype.forEach.call(el.querySelectorAll("[data-q]"), function (x) { q[x.getAttribute("data-q")] = !!x.checked; });
var body = { p_theme: document.getElementById("dc-theme").value, p_quarters: q, p_density: document.getElementById("dc-dens").value, p_lit: !!document.getElementById("dc-lit").checked };
var msg = document.getElementById("dc-msg");
msg.textContent = "Dressing…";
cityRpc("set_city_decor", body).then(function (o) {
if (!o || !o.ok) {
msg.textContent = (o && o.say) || "That did not go through.";
return;
}
DGUILD.state = o.state || DGUILD.state;
decorRebuild();
msg.textContent = "Done. The city is dressed.";
setStatus("<b>The city is dressed for " + esc(DECOR_THEMES.filter(function (t) { return t[0] === decorTheme(); })[0][1]) + ".</b>");
}).catch(function (e) { msg.textContent = e.message; });
};
}
];
});
