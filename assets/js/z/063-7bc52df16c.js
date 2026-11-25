/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(63, function () {
"use strict";
return [
function () {
if (!rec)
return;
listening = !listening;
var m = document.getElementById("mic");
m.classList.toggle("live", listening);
m.setAttribute("aria-label", listening ? "Stop listening" : "Start listening");
if (listening) {
try {
rec.start();
setStatus("Listening.");
}
catch (e) { }
}
else {
rec.stop();
setStatus("Stopped.");
}
}
];
});
