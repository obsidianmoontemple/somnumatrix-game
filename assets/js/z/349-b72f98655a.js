/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(349, function () {
return [
function (m) {
if (!m.isMesh || m.isSkinnedMesh || !m.geometry || !m.geometry.attributes || !m.geometry.attributes.position)
return true;
var mt = Array.isArray(m.material) ? m.material[0] : m.material;
if (!mt || mt.visible === false || mt.colorWrite === false)
return true;
if (mt.transparent && mt.opacity < 0.6)
return true;
return false;
},
function (x, y, z, R) {
var now = performance.now();
if (VWL.R >= R && now - VWL.at < 1500 && Math.abs(x - VWL.cx) < R * 0.2 && Math.abs(z - VWL.cz) < R * 0.2 && Math.abs(y - VWL.cy) < 2)
return;
var t0 = now, buf = VWL.tri, n = 0, me = (typeof meG !== "undefined") ? meG : null, car = (typeof rideG !== "undefined") ? rideG : null;
var sph = new THREE.Sphere(), c = new THREE.Vector3(x, y, z), v = new THREE.Vector3(), M = new THREE.Matrix4(), W = new THREE.Matrix4();
var x0 = x - R, x1 = x + R, y0 = y - R * 0.6, y1 = y + R * 0.6, z0 = z - R, z1 = z + R;
VWL.at = now;
VWL.cx = x;
VWL.cy = y;
VWL.cz = z;
VWL.R = R;
function grow(k) { if (k <= buf.length)
return; var b2 = new Float32Array(Math.max(k, buf.length * 2, 9 * 512)); b2.set(buf.subarray(0, n * 9)); buf = b2; }
function faces(m, mw) {
var g = m.geometry, pos = g.attributes.position, idx = g.index, cnt = idx ? idx.count : pos.count, a = pos.array, st = pos.isInterleavedBufferAttribute ? pos.data.stride : 3, off = pos.isInterleavedBufferAttribute ? pos.offset : 0;
if (pos.isInterleavedBufferAttribute)
a = pos.data.array;
if (!a || !a.length)
return;
var e = mw.elements, ia = idx ? idx.array : null;
for (var i = 0; i + 2 < cnt; i += 3) {
var tx = [0, 0, 0], ty = [0, 0, 0], tz = [0, 0, 0], lo = Infinity;
for (var j = 0; j < 3; j++) {
var vi = ia ? ia[i + j] : i + j, o = vi * st + off, px = a[o], py = a[o + 1], pz = a[o + 2];
tx[j] = e[0] * px + e[4] * py + e[8] * pz + e[12];
ty[j] = e[1] * px + e[5] * py + e[9] * pz + e[13];
tz[j] = e[2] * px + e[6] * py + e[10] * pz + e[14];
}
if ((tx[0] < x0 && tx[1] < x0 && tx[2] < x0) || (tx[0] > x1 && tx[1] > x1 && tx[2] > x1) || (tz[0] < z0 && tz[1] < z0 && tz[2] < z0) || (tz[0] > z1 && tz[1] > z1 && tz[2] > z1) || (ty[0] < y0 && ty[1] < y0 && ty[2] < y0) || (ty[0] > y1 && ty[1] > y1 && ty[2] > y1))
continue;
grow((n + 1) * 9);
var q = n * 9;
buf[q] = tx[0];
buf[q + 1] = ty[0];
buf[q + 2] = tz[0];
buf[q + 3] = tx[1];
buf[q + 4] = ty[1];
buf[q + 5] = tz[1];
buf[q + 6] = tx[2];
buf[q + 7] = ty[2];
buf[q + 8] = tz[2];
n++;
if (n > 40000)
return;
}
}
(function walk(o) {
var pressed = o.userData && o.userData.baked && !o.visible;
if ((!o.visible && !pressed) || o === me || o === car || n > 40000)
return;
if (o.userData && o.userData.bakedChunk)
return;
if (o.userData && o.userData.wSeed !== undefined)
return;
if (o.isMesh && !vwlSkip(o)) {
var g = o.geometry;
if (o.isInstancedMesh) {
if (!g.boundingSphere)
g.computeBoundingSphere();
for (var i = 0; i < o.count; i++) {
o.getMatrixAt(i, M);
W.multiplyMatrices(o.matrixWorld, M);
sph.copy(g.boundingSphere).applyMatrix4(W);
if (sph.radius >= 0.3 && sph.center.distanceTo(c) < sph.radius + R * 1.2)
try {
faces(o, W);
}
catch (e) { }
}
}
else {
if (!g.boundingSphere)
g.computeBoundingSphere();
sph.copy(g.boundingSphere).applyMatrix4(o.matrixWorld);
if (sph.radius >= 0.3 && sph.center.distanceTo(c) < sph.radius + R * 1.2)
try {
faces(o, o.matrixWorld);
}
catch (e) { }
}
}
var k = o.children;
for (var j = 0; j < k.length; j++)
walk(k[j]);
})((typeof INT !== "undefined" && INT && INT.root) ? INT.root : (typeof WLD !== "undefined" && WLD.on && WLD.w && WLD.w.g) ? WLD.w.g : scene);
VWL.tri = buf;
VWL.n = n;
VWL.ms = Math.round((performance.now() - t0) * 10) / 10;
},
function (fx, fy, fz, tx, ty, tz, pad, R) {
if (typeof THREE === "undefined" || typeof scene === "undefined")
return Infinity;
var dx = tx - fx, dy = ty - fy, dz = tz - fz, L = Math.sqrt(dx * dx + dy * dy + dz * dz);
if (L < 1e-4)
return Infinity;
vwlGather(fx, fy, fz, R || Math.max(7, L + 2.5));
pad = pad === undefined ? 0.3 : pad;
var ux = dx / L, uy = dy / L, uz = dz / L, far = L + pad, best = Infinity, b = VWL.tri, n = VWL.n;
var lx = Math.min(fx, tx) - pad, hx = Math.max(fx, tx) + pad, lz = Math.min(fz, tz) - pad, hz = Math.max(fz, tz) + pad, ly = Math.min(fy, ty) - pad, hy = Math.max(fy, ty) + pad;
for (var i = 0; i < n; i++) {
var q = i * 9, ax = b[q], ay = b[q + 1], az = b[q + 2], bx = b[q + 3], by = b[q + 4], bz = b[q + 5], cx = b[q + 6], cy = b[q + 7], cz = b[q + 8];
if ((ax < lx && bx < lx && cx < lx) || (ax > hx && bx > hx && cx > hx) || (az < lz && bz < lz && cz < lz) || (az > hz && bz > hz && cz > hz) || (ay < ly && by < ly && cy < ly) || (ay > hy && by > hy && cy > hy))
continue;
var e1x = bx - ax, e1y = by - ay, e1z = bz - az, e2x = cx - ax, e2y = cy - ay, e2z = cz - az;
var px = uy * e2z - uz * e2y, py = uz * e2x - ux * e2z, pz = ux * e2y - uy * e2x, det = e1x * px + e1y * py + e1z * pz;
if (det > -1e-9 && det < 1e-9)
continue;
var inv = 1 / det, sx = fx - ax, sy = fy - ay, sz = fz - az, u = (sx * px + sy * py + sz * pz) * inv;
if (u < 0 || u > 1)
continue;
var qx = sy * e1z - sz * e1y, qy = sz * e1x - sx * e1z, qz = sx * e1y - sy * e1x, v = (ux * qx + uy * qy + uz * qz) * inv;
if (v < 0 || u + v > 1)
continue;
var t = (e2x * qx + e2y * qy + e2z * qz) * inv;
if (t > 0.02 && t < far && t < best)
best = t;
}
return best === Infinity ? Infinity : Math.max(0, best - pad);
},
function (key, hx, hy, hz, dx, dy, dz, want) {
var now = performance.now(), dt = Math.min(0.1, (now - (VWL.t || now)) / 1000);
VWL.t = now;
var L = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1, r = Infinity;
try {
r = vwlReach(hx, hy, hz, hx + dx * want, hy + dy * want, hz + dz * want, 0.28);
}
catch (e) {
r = Infinity;
}
var d = r === Infinity ? want : Math.min(want, r / L), was = VWL.dist[key];
if (was === undefined || d < was)
was = d;
else
was = Math.min(d, was + Math.max(0.016, dt) * 3.5);
VWL.dist[key] = was;
VWL.hide = was < 0.9;
return was < 0.12 ? 0 : was;
},
function () {
if (typeof VRM === "undefined" || !VRM.xr || !VRM.cam || typeof camera === "undefined")
return null;
if (typeof walkMode !== "undefined" && !walkMode) {
VWL.turn0 = null;
return null;
}
if ((typeof DRIVE !== "undefined" && DRIVE.on) || (typeof SOF !== "undefined" && SOF.seated) || (typeof PASS !== "undefined" && PASS.seat)) {
VWL.turn0 = null;
return null;
}
var h = VRM.cam.position, P = camera.position, t = VRM.turn;
var hx = h.x, hz = h.z;
if (!isFinite(hx) || !isFinite(hz))
return null;
if (VWL.turn0 !== null && Math.abs(t - VWL.turn0) > 1e-5 && Math.abs(t - VWL.turn0) < 1.2) {
var a = vwlRot(hx, hz, VWL.turn0), b = vwlRot(hx, hz, t), mx = a[0] - b[0], mz = a[1] - b[1];
if (mx * mx + mz * mz < 1) {
if (typeof walkBy === "function")
try {
walkBy(mx, mz);
}
catch (e) { }
else {
P.x += mx;
P.z += mz;
}
}
}
VWL.turn0 = t;
if (typeof blockedAt !== "function")
return null;
var w = vwlRot(hx, hz, t), feet = P.y - 1.72;
if (w[0] * w[0] + w[1] * w[1] < 0.0025)
return null;
var free = function (k) { try {
return !blockedAt(P.x + w[0] * k, P.z + w[1] * k, feet);
}
catch (e) {
return true;
} };
if (free(1) || !free(0))
return null;
var lo = 0, hi = 1;
for (var i = 0; i < 7; i++) {
var m = (lo + hi) / 2;
if (free(m))
lo = m;
else
hi = m;
}
return { x: -w[0] * (1 - lo), z: -w[1] * (1 - lo) };
},
function () {
var m = new WeakMap(), lists = [];
["NV", "SEA", "UD", "NP", "LD", "GW", "LL", "FL", "PY", "EL", "KZ", "OW", "GR"].forEach(function (n) { try {
var o = window[n];
if (o && Array.isArray(o.talkers))
lists.push(o.talkers);
if (o && Array.isArray(o.talk))
lists.push(o.talk);
if (o && Array.isArray(o.spots))
lists.push(o.spots);
}
catch (e) { } });
try {
if (typeof WLD !== "undefined" && WLD.w) {
["talkers", "talk", "spots", "people"].forEach(function (k) { if (Array.isArray(WLD.w[k]))
lists.push(WLD.w[k]); });
}
}
catch (e) { }
lists.forEach(function (L) { L.forEach(function (T) { if (!T)
return; var g = T.p && T.p.g ? T.p.g : (T.g && T.g.isObject3D ? T.g : (T.person && T.person.g ? T.person.g : null)); if (g && (T.t || T.fn || T.talk))
m.set(g, T); }); });
return m;
},
function (root) {
var now = performance.now();
if (root === FKN.root && now - FKN.at < 3000)
return FKN.list;
var out = [];
if (typeof LD !== "undefined" && root === LD.g)
(LD.talkers || []).forEach(function (T) { if (T && T.t && T.p && T.p.g && T.p.g.isObject3D)
out.push(T.p.g); });
else if (!(typeof WLD !== "undefined" && WLD.on === "battle"))
root.traverse(function (o) { var u = o.userData; if (u && u.wSeed !== undefined && o.isObject3D && !u.dgb && !/^(bw|dgb)/.test(String(u.wSeed)))
out.push(o); });
FKN.list = out;
FKN.root = root;
FKN.at = now;
FKN.map = fknTalkMap();
return out;
},
function (g, text) {
try {
if (FKN.bub) {
if (FKN.bub.parent)
FKN.bub.parent.remove(FKN.bub);
FKN.bub.material.map.dispose();
FKN.bub.material.dispose();
FKN.bub = null;
}
if (!text)
return;
var cv = document.createElement("canvas");
cv.width = 512;
cv.height = 96;
var x = cv.getContext("2d");
x.font = "600 34px Georgia, serif";
var w = Math.min(500, x.measureText(text).width + 48);
x.fillStyle = "rgba(250,246,236,0.94)";
x.strokeStyle = "rgba(60,48,30,0.55)";
x.lineWidth = 3;
var l = (512 - w) / 2;
x.beginPath();
if (x.roundRect)
x.roundRect(l, 8, w, 74, 22);
else
x.rect(l, 8, w, 74);
x.fill();
x.stroke();
x.fillStyle = "#2A2218";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillText(text, 256, 46, w - 30);
var t = new THREE.CanvasTexture(cv), s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthTest: false, fog: false }));
s.scale.set(1.6, 0.3, 1);
s.renderOrder = 999;
var sc = g.scale && g.scale.y ? g.scale.y : 1;
s.position.set(0, 2.25 / sc, 0);
s.scale.multiplyScalar(1 / sc);
g.add(s);
FKN.bub = s;
FKN.bubT = 3.2;
}
catch (e) { }
},
function (g) {
var title = g.userData.wTitle || "", place = fknPlaceName(), seed = String(g.userData.wSeed || "x");
var who = title ? ("A " + title.toLowerCase().replace(/^(a|an|the) /, "")) : g.userData.wChild ? "A child at play" : "A local of " + place.replace(/^the /i, "the ");
if (/^A [aeiou]/i.test(who))
who = "An" + who.slice(1);
return { name: who, greet: null, persona: "You are " + who.charAt(0).toLowerCase() + who.slice(1) + (title || g.userData.wChild ? " in " + place : "") + ". This is a place in SomnuMatrix (an original world of dreams and wonders). " +
(title ? "Your work here: " + title + ". " : "") + (g.userData.wChild ? "You are a child, playing here, cheerful and curious. " : "") + "You live and work here and know its paths, its people and its stories. Speak warmly and plainly, in character, in first person, under 60 words. Tell a visitor what you do, what is worth seeing nearby, and offer a small rumour or a tip about this place. Never claim to be a real person. (" + seed.slice(0, 24) + ")" };
},
function (s) {
var t = " " + s + " ";
t = t.replace(/\byou're\b/gi, function (m) { return m[0] === "Y" ? "I'm" : "I'm"; }).replace(/\byou've\b/gi, "I've").replace(/\byou'll\b/gi, "I'll").replace(/\byou'd\b/gi, "I'd");
t = t.replace(/\byourselves\b/gi, "ourselves").replace(/\byourself\b/gi, "myself").replace(/\byours\b/gi, "mine").replace(/\bYour\b/g, "My").replace(/\byour\b/g, "my");
t = t.replace(/\b([Yy])ou\b(\s+)(\S+)/g, function (m, y, sp, nx) {
var low = nx.toLowerCase();
if (/^(are|were)\b/.test(low))
return "I" + sp + (low.indexOf("are") === 0 ? "am" : "was") + nx.slice(low.indexOf("are") === 0 ? 3 : 4);
if (FKV_PREP.test(nx))
return "me" + sp + nx;
return "I" + sp + nx;
});
t = t.replace(/\byou([.,;:!?)])/g, "me$1").replace(/\bYou\b/g, "I");
t = t.replace(/([:;]\s*)(she|he)\s+([^.;]*)/, function (m, pre, pr, rest) {
return pre + "I " + rest.replace(/(^|, |,? and )([a-z]+?)(s)(?= (the|a|an|his|her|their|its|every|each|all|up|down|out|in|on|it|them|with|for|to|and|over|round|after)\b)/g, function (m2, lead, w) { return lead + fkvBare(w + "s"); });
});
return t.trim().replace(/^i /, "I ");
},
function (c) {
if (c.fkvF)
return c.fkvF;
var p = String((c.details && c.details[0]) || "");
if (!/^you\b/i.test(p.trim()))
p = "You are " + p.trim();
var parts = p.replace(/\s+/g, " ").replace(/([.!?])\s+(?=[A-Z"(])/g, "$1\n").split("\n");
var facts = [];
parts.forEach(function (s) {
s = s.trim();
if (s.length < 12)
return;
if (FKV_ASK.test(s) || FKV_META.test(s))
return;
if (/^you (speak|answer|reply|talk|chat|love to (tell|talk|share))/i.test(s) && /\b(way|tone|voice|manner|stories|questions)\b/i.test(s))
return;
var f = fkvFirst(s).replace(/(\b[A-Za-z][\w' -]{2,40}), \1\b/g, "$1");
if (!/[.!?]$/.test(f))
f += ".";
facts.push(f);
});
if (!facts.length)
facts.push("I am " + (c.name || "one of the folk here") + ".");
return (c.fkvF = facts);
},
function () {
var out = [];
try {
var L = (typeof dkWorldList === "function" && typeof WLD !== "undefined" && WLD.on) ? dkWorldList(WLD.on) : null;
if (!L && typeof LD !== "undefined" && LD.g)
L = LD.talkers;
var P = camera.position, base = (typeof WLD !== "undefined" && WLD.on && WLD.w) ? WLD.w.base || 0 : 0;
(L || []).forEach(function (T) { if (!T || T.p || typeof T.x !== "number" || !T.name)
return; var d = Math.hypot(T.x + (WLD.on ? base : (LD.ox || 0)) - P.x, T.z + (WLD.on ? 0 : (LD.oz || 0)) - P.z); if (d < 260)
out.push({ n: T.name, d: d }); });
}
catch (e) { }
out.sort(function (a, b) { return a.d - b.d; });
return out.slice(0, 3).map(function (o) { return o.n.replace(/^the /, "the "); });
},
function (c, q) {
var F = fkvFacts(c), N = fkvNamePart(c), said = c.fkvSaid || (c.fkvSaid = []), low = " " + String(q || "").toLowerCase() + " ";
function unsaid(list) { return list.filter(function (s) { return said.indexOf(s) < 0; }); }
function pick(list) { var u = unsaid(list); if (!u.length)
return null; var s = u[0]; said.push(s); return s; }
var place = (typeof fknPlaceName === "function") ? fknPlaceName() : "this place";
var hello = /^\s*(hi|hello|hey|hiya|howdy|greetings|good (morning|day|evening|afternoon)|well met)\b/.test(low);
var who = /who are you|your name|what are you|who('s| is) (this|that)/.test(low);
var work = /what (do|are) you (do|doing|make|sell|working)|your (job|work|trade)|what('s| is) your (job|work)|do you sell|can i (buy|get|have)|what can you/.test(low);
var where = /where|what('s| is) (here|there|near|around|that)|what (should|can) i (see|do|visit)|places?|around here|worth seeing|explore|go next|tip|rumou?r|secret|hidden/.test(low);
var how = /how are you|how('s| is) it going|how do you do|are you (well|ok|okay|happy)/.test(low);
var thanks = /\b(thank|thanks|cheers|ta)\b/.test(low), bye = /\b(bye|goodbye|farewell|see you|later)\b/.test(low);
var story = /story|stories|tell me|what happened|history|remember|odyssey|long ago|legend|myth/.test(low);
var line = null, greet = null;
if (hello && (who || work || where || how || story)) {
greet = (["Hello!", "Well met!", "Hello there!"][said.length % 3]);
hello = false;
}
if (bye)
line = ["Safe travels.", "Go well, and come back soon.", "Mind your step out there."][said.length % 3];
else if (thanks)
line = ["You're very welcome.", "Any time.", "Glad to help."][said.length % 3];
else if (who) {
line = F[0];
if (said.indexOf(F[0]) < 0)
said.push(F[0]);
}
else if (hello)
line = (["Hello!", "Well met!", "Hello there!"][said.length % 3]) + " I'm " + N.who + (N.role ? ", " + N.role : "") + ".";
else if (how)
line = ["Well enough, thank you for asking.", "Busy, as ever, but glad of the company.", "All the better for a visitor."][said.length % 3];
else if (work) {
var wk = F.filter(function (s) { return /\b(I (make|sell|keep|tend|book|run|teach|cook|guard|serve|play|sing|look after|work|mend|build|brew|bake|fish|carve|look|watch|help|trade|fix|forge|grow|care)|my (work|job|trade|shop|stall))\b/i.test(s); });
line = pick(wk) || pick(F.filter(function (x) { return /\bI [a-z]+ (the|every|a|an|my|our|all)\b/.test(x); })) || pick([F[0]]) || pick(F.slice(1)) || F[0];
}
else if (where) {
var nb = fkvNear();
var pl = F.filter(function (s) { return /\b(near|beyond|across|under|along|past|by the|up the|east|west|north|south|road|path|stair|door|gate|bridge|hall|market|shore|cave|tower|garden|house)\b/i.test(s); });
var tipNb = nb.length ? "Have you been to " + nb.join(", ").replace(/, ([^,]*)$/, " or $1") + " yet? It's well worth the walk." : null;
if (tipNb && said.indexOf(tipNb) < 0) {
said.push(tipNb);
line = tipNb;
}
else
line = pick(pl) || pick(F.slice(1));
}
else if (story)
line = pick(F.slice(1)) || pick(F);
if (!line) {
line = pick(F.slice(1)) || pick(F);
}
if (!line) {
var nb2 = fkvNear();
line = pick(["Everyone here has a story, if you ask them.", nb2.length ? "If you have time, go and see " + nb2[0] + "." : "Take your time and look around: there is more here than meets the eye.", "Come back and see me again; I'm usually about."]);
}
if (!line) {
said.length = 0;
line = "That's all I know of it, I'm afraid. Ask me about my work, or what is worth seeing in " + place + ".";
}
if (greet)
line = greet + " " + line;
if (line.length < 70 && !bye && !thanks && said.length % 2 === 1) {
var more = unsaid(F.slice(1))[0];
if (more && more !== line) {
said.push(more);
line += " " + more;
}
}
if (said.length > 60)
said.splice(0, said.length - 60);
return line;
}
];
});
