/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(82, function () {
"use strict";
return [
function (make) {
var id = null;
try {
id = localStorage.getItem(DEVKEY);
}
catch (e) { }
if (!id && make) {
id = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() :
"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (ch) { var r = Math.random() * 16 | 0; return (ch === "x" ? r : (r & 3 | 8)).toString(16); });
try {
localStorage.setItem(DEVKEY, id);
}
catch (e) { }
}
return id;
}
];
});
