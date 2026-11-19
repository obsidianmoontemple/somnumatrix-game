/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(397, function () {
"use strict";
return [
function () {
if (!dvrAllowed())
return;
dvrClose();
var o = document.createElement("div");
o.id = "dvr-full";
o.style.cssText = "position:fixed;inset:0;z-index:2147483000;background:#07060C;display:flex;flex-direction:column";
var B = typeof PH_BTN === "string" ? PH_BTN : "";
o.innerHTML = "<div style='display:flex;align-items:center;gap:10px;padding:6px 12px;background:#120F1C;color:#EDE8F8;font:600 13px system-ui,sans-serif;border-bottom:1px solid #2A2440'>" +
"<span style='flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap'>🌑 The Long Silence: Divine Realms</span>" +
"<button type='button' data-dvr='tab' style='background:none;border:0;color:#E8C66A;font:inherit;cursor:pointer;padding:0'>Own tab</button>" +
"<button type='button' data-dvr='close' style='" + B + "'>✕ Back to the city</button></div>" +
"<iframe src='" + DVR.URL + "' title='The Long Silence: Divine Realms' allow='autoplay; fullscreen; clipboard-write' style='flex:1;width:100%;border:0;background:#07060C'></iframe>";
["keydown", "keyup", "keypress"].forEach(function (k) { o.addEventListener(k, function (ev) { ev.stopPropagation(); if (k === "keydown" && ev.key === "Escape")
dvrClose(); }); });
o.querySelector("[data-dvr='close']").onclick = function (ev) { ev.stopPropagation(); dvrClose(); };
o.querySelector("[data-dvr='tab']").onclick = function (ev) { ev.stopPropagation(); dvrOwnTab(); };
document.body.appendChild(o);
try {
if (document.pointerLockElement && document.exitPointerLock)
document.exitPointerLock();
}
catch (e) { }
try {
if (typeof PH !== "undefined") {
PH.open = false;
var b = document.getElementById("ph-box");
if (b)
b.style.display = "none";
}
}
catch (e) { }
}
];
});
