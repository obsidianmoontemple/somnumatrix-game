/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(17, function () {
"use strict";
return [
function (pt) {
if (!pt || typeof pt !== "object")
return null;
var g = pt.g, need = CUSTOM_SHAPE[g];
if (!need)
return null;
var s = pt.s;
if (!Array.isArray(s) || s.length < need)
return null;
for (var i = 0; i < s.length; i++)
if (!numOK(s[i], 0.03, 60))
return null;
var p = pt.p;
if (!Array.isArray(p) || p.length !== 3)
return null;
if (!numOK(p[0], -120, 120) || !numOK(p[1], -0.5, 220) || !numOK(p[2], -120, 120))
return null;
if (p[1] < 0)
p = [p[0], 0, p[2]];
var out = { g: g, s: s.slice(0, Math.max(need, s.length)), p: [p[0], p[1], p[2]] };
if (Array.isArray(pt.r) && pt.r.length === 3 && pt.r.every(function (v) { return numOK(v, -6.3, 6.3); }))
out.r = pt.r.slice();
var c = pt.c;
if (typeof c === "string" && ROLE[c] !== undefined)
out.c = c;
else if (typeof c === "string" && hexToInt(c) !== undefined)
out.c = hexToInt(c);
else
out.c = "body";
return out;
},
function (key, def) {
if (typeof key !== "string" || !/^[a-z][a-z0-9]{1,23}$/.test(key))
return null;
if (KIT[key])
return KIT[key];
if (!def || !CUSTOM_CAT[def.cat])
return null;
var size = def.size;
if (!Array.isArray(size) || size.length !== 3 || !size.every(function (v) { return numOK(v, 0.1, 220); }))
return null;
var parts = def.parts;
if (!Array.isArray(parts) || !parts.length || parts.length > 40)
return null;
var built = [];
for (var i = 0; i < parts.length; i++) {
var cp = compilePart(parts[i]);
if (cp)
built.push(cp);
}
if (!built.length || built.length < parts.length * 0.6)
return null;
KIT[key] = Object.assign({ cat: def.cat, size: size, parts: built }, { grown: true });
return KIT[key];
},
function (key, def, label) {
if (!key)
return null;
if (KIT[key]) {
if (label)
learnWord(key, label);
return KIT[key];
}
var got = compileArchetype(key, def);
if (!got)
return null;
if (label)
learnWord(key, label);
if (!savedArchetypeKeys[key] && typeof cityRpc === "function" && typeof signedIn === "function" && signedIn()) {
savedArchetypeKeys[key] = true;
cityRpc("save_custom_archetype", { p_key: key, p_recipe: { parts: def.parts }, p_cat: def.cat, p_size: def.size, p_label: label || null }).catch(function () { savedArchetypeKeys[key] = false; });
}
return got;
}
];
});
