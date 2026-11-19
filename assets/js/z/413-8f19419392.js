/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(413, function () {
"use strict";
return [
function () {
if (DVO.names)
return DVO.names;
var N = {};
Object.keys(DVO_NAMES).forEach(function (k) { N[k] = DVO_NAMES[k]; });
try {
if (typeof DEITY !== "undefined" && DEITY)
Object.keys(DEITY).forEach(function (k) {
var d = DEITY[k];
if (!d || !d.name || k.charAt(0) === "_")
return;
N[String(d.name).toLowerCase()] = k;
(d.aka || []).forEach(function (a) { if (!N[a])
N[a] = k; });
});
}
catch (e) { }
return (DVO.names = N);
},
function (c) {
if (!c)
return "";
var o = String(c.otm || "");
if (o && DVO_OWN[o])
return DVO_OWN[o];
if (/^deep:/.test(o)) {
var dk = o.slice(5);
return DVO_OF[dk] ? dk : "";
}
var k = c.deity && c.deity.charAt(0) !== "_" ? String(c.deity) : "";
if (!k && o.indexOf(":") > 0)
k = o.split(":")[1];
if (k) {
k = DVO_ALIAS[k] || k;
if (DVO_OF[k] || (typeof DEITY !== "undefined" && DEITY[k]))
return k;
}
var n = String(c.name || "").toLowerCase().trim().replace(/^(the goddess|the god|lady|lord)\s+/, "");
return dvoNames()[n] || dvoNames()[String(c.name || "").toLowerCase().trim()] || "";
},
function (c) {
var k = dvoKeyOf(c);
if (!k)
return null;
var kind = DVO_OF[k] || "king", K = DVO_KIND[kind], d = typeof DEITY !== "undefined" && DEITY[k];
var loc = DVO_OWN_LOC[k] || (d && DVO_LOC[d.trad]) || [];
if (loc.indexOf("en-GB") < 0)
loc = loc.concat(DVO_PLAIN);
return { key: k, kind: kind, sx: dvoSexOf(k), p: K.p, r: K.r, mood: K.m, loc: loc, trad: d ? d.trad : "" };
},
function (v) {
var s = typeof fvoVoiceSex === "function" ? fvoVoiceSex(v) : "";
if (s)
return s;
var n = String(v && v.name || "") + " " + String(v && v.voiceURI || "");
if (DVO_VF.test(String(v && v.name || "")))
return "f";
if (DVO_VM.test(String(v && v.name || "")))
return "m";
return DVO_AND_M.test(n) ? "m" : DVO_AND_F.test(n) ? "f" : "";
},
function (c, V) {
var P = dvoProfile(c);
if (!P)
return null;
V = V || [];
var h = typeof fvoHash === "function" ? fvoHash("dvo:" + P.key) : 0, sx = P.sx;
var VS = sx ? V.filter(function (v) { return dvoVoiceSex(v) === sx; }) : V.slice();
if (!VS.length && sx)
VS = V.filter(function (v) { return !dvoVoiceSex(v); });
if (!VS.length)
VS = V.slice();
if (typeof fvoBest === "function")
VS = fvoBest(VS);
var top = 0;
if (typeof fvoReal === "function")
VS.forEach(function (v) { top = Math.max(top, fvoReal(v)); });
for (var i = 0; i < P.loc.length; i++) {
var want = P.loc[i].toLowerCase(), A = VS.filter(function (v) { return dvoLang(v) === want && (typeof fvoReal !== "function" || fvoReal(v) >= top); });
if (A.length) {
VS = A;
break;
}
}
var voice = VS.length ? VS[h % VS.length] : null, vs = dvoVoiceSex(voice);
var p = P.p + (((h >>> 8) % 7) - 3) / 100, rt = P.r + (((h >>> 16) % 5) - 2) / 100;
if (sx && vs && vs !== sx)
p *= sx === "m" ? 0.78 : 1.25;
else if (sx === "m" && !vs)
p *= 0.86;
else if (sx === "f" && !vs)
p *= 1.03;
if (dvoKids()) {
p = Math.max(p, 0.92);
rt = Math.max(rt, 0.9);
}
p = Math.max(0.5, Math.min(1.6, p));
rt = Math.max(0.72, Math.min(1.15, rt));
DVO.last = { key: P.key, kind: P.kind, sx: sx, voice: voice && voice.name || "", lang: voice && voice.lang || "", pitch: p, rate: rt };
return { voice: voice, p: p, rt: rt, sx: sx, h: h, key: P.key, kind: P.kind };
}
];
});
