/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(22, function () {
"use strict";
return [
function (c, extra) {
var b = Object.assign({ model: c.model || LLM_MODEL }, extra);
delete b.say;
if (/gpt-oss|qwen/i.test(b.model)) {
b.reasoning_effort = "low";
b.include_reasoning = false;
}
if (c.mode !== "app") {
delete b.talk;
delete b.lookup;
delete b.design;
}
return b;
},
function (c) {
var h = { "Content-Type": "application/json" };
if (c.mode === "app") {
h.apikey = DW_CONFIG.supabaseKey;
var tok = DW_CONFIG.supabaseKey;
if (typeof session !== "undefined" && session && session.access_token) {
var age = Date.now() - (session.at || 0);
if (age < 55 * 60 * 1000)
tok = session.access_token;
if (age >= 45 * 60 * 1000 && typeof freshToken === "function")
freshToken();
}
h.Authorization = "Bearer " + tok;
return { url: appParseUrl(), headers: h };
}
if (c.mode === "direct" && c.key)
h.Authorization = "Bearer " + c.key;
return { url: c.mode === "proxy" ? c.proxy : LLM_URL, headers: h };
}
];
});
