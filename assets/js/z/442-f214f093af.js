/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(442, function () {
return [
function () {
if (CRD.busy || Date.now() - CRD.at < 20000)
return;
if (typeof cloudOn !== "function" || !cloudOn() || typeof fetch !== "function")
return;
CRD.busy = true;
fetch(DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/rest/v1/app_config?select=value&key=eq.credits", { headers: cloudHeaders() })
.then(function (r) { if (!r.ok)
throw new Error(r.status); return r.json(); })
.then(function (rows) {
CRD.at = Date.now();
var v = rows && rows[0] ? rows[0].value : null;
try {
if (typeof DW_CLOUD !== "undefined" && DW_CLOUD.config)
DW_CLOUD.config.credits = v;
}
catch (e) { }
CRD.data = crdUse(v);
crdPaint();
})
.catch(function () { })
.then(function () { CRD.busy = false; });
}
];
});
