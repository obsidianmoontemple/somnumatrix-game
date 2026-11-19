/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(308, function () {
"use strict";
return [
function (root, F) {
var T = F ? bshBindScales(F) : null;
root.traverse(function (m) {
if (!m.isSkinnedMesh || !m.skeleton)
return;
var sk = m.skeleton;
if (!sk.bshInv0) {
if (!T)
return;
sk.bshInv0 = sk.boneInverses;
sk.boneInverses = sk.boneInverses.map(function (q) { return q.clone(); });
}
var I0 = sk.bshInv0;
for (var i = 0; i < sk.bones.length; i++) {
var b = sk.bones[i], t = T && b && T[b.name];
sk.boneInverses[i].copy(I0[i]);
if (t && (t[0] !== 1 || t[1] !== 1 || t[2] !== 1))
sk.boneInverses[i].premultiply(BSH_M.makeScale(t[0], t[1], t[2]));
}
});
},
function (L) {
var s = (L.shape && typeof L.shape === "object") ? L.shape : {};
var hd = (typeof hdfOn === "function" && hdfOn());
var h = '<div style="font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--dim,#999);margin:12px 0 4px">Body shape</div>';
BSH_KEYS.forEach(function (k) {
var v = Math.round(bshClamp(s[k[0]]) * 100);
h += '<div class="lk-row"><div class="lk-h">' + k[1] + ' <span class="lk-p" data-bshv="' + k[0] + '">' + bshWord(k, v) + '</span></div>' +
'<div style="display:flex;align-items:center;gap:8px;font-size:11.5px;color:var(--dim,#999)"><span style="min-width:52px;text-align:right">' + k[2] + '</span>' +
'<input type="range" min="-100" max="100" step="5" value="' + v + '" data-bsh="' + k[0] + '" aria-label="' + k[1] + '" style="flex:1;min-width:0;height:28px">' +
'<span style="min-width:52px">' + k[3] + '</span></div></div>';
});
h += '<div style="display:flex;gap:8px;align-items:center;margin-top:6px;flex-wrap:wrap"><button class="btn" data-bshreset="1">Back to average</button>' +
'<span style="font-size:11.5px;color:var(--dim,#999);line-height:1.5">Your clothes take the same shape. Everyone near you sees it.' + (hd ? '' : ' Turn on "Detailed people" in Settings to see every slider; the simple figures show height, shoulders, hips and limbs.') + '</span></div>';
return h;
}
];
});
