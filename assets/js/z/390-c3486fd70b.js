/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(390, function () {
"use strict";
return [
function (key, label) {
var on = PCX.arm === key && Date.now() - PCX.at < 5000, b = document.createElement("button");
b.type = "button";
b.setAttribute("data-pcx", key);
b.textContent = on ? "Sure? Tap again" : label;
b.style.cssText = (typeof PH_BTN2 === "string" ? PH_BTN2 : "") + ";font-size:12px;padding:5px 10px" + (on ? ";background:#C0392B;color:#fff" : "");
b.onclick = function (ev) { ev.stopPropagation(); pcxTap(key); };
return b;
},
function (key) {
if (PCX.arm !== key || Date.now() - PCX.at >= 5000) {
PCX.arm = key;
PCX.at = Date.now();
clearTimeout(PCX.t);
PCX.t = setTimeout(function () { if (PCX.arm === key) {
PCX.arm = null;
if (PH.open)
phPaint();
} }, 5000);
phPaint();
return;
}
PCX.arm = null;
clearTimeout(PCX.t);
if (key === "msg1" || key === "msgall")
pcxServer(key === "msg1" ? PH.withId : null);
else
pcxTown(key === "town1" ? FPS.with : null);
},
function (id) {
phCall("phone_clear", { p_with: id || null }).then(function (d) {
PH.msg = d && d.say || "";
if (d && d.ok) {
if (id) {
PH.thread = { ok: true, messages: [] };
}
return phCall("phone_inbox").then(function (x) { PH.inbox = x; phBadge(); phPaint(); });
}
phPaint();
}).catch(function (e) {
var m = String((e && e.message) || e || "");
PH.msg = /function|404|PGRST|does not exist/i.test(m) ? "Clearing messages opens soon." : m;
phPaint();
});
},
function (name) {
if (typeof fpsStore !== "function")
return;
var T = fpsStore();
if (name) {
if (typeof fpsLeave === "function" && FPS.with === name) {
fpsLeave();
FPS.with = name;
}
delete T.log[name];
T.unread[name] = 0;
FPS.from = 0;
}
else {
if (typeof fpsLeave === "function")
fpsLeave();
T.log = {};
T.unread = {};
}
if (typeof fpsSave === "function")
fpsSave();
if (typeof fpsBadge === "function")
fpsBadge();
PH.msg = name ? "Texts cleared." : "All texts cleared.";
phPaint();
}
];
});
