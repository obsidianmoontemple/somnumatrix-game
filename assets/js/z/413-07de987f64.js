/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(413, function () {
return [
function () {
return swrMat("wrap", function () {
return new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: swrTex("wrap", 64, 64, function (x, W, H) {
x.fillStyle = "#E8E0CC";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 9; i++) {
x.strokeStyle = "rgba(90,70,40," + (0.25 + Math.random() * 0.2) + ")";
x.lineWidth = 1.5;
var y = i * 7 + Math.random() * 3;
x.beginPath();
x.moveTo(0, y);
x.lineTo(W, y + (Math.random() * 10 - 5));
x.stroke();
}
}) });
});
},
function () {
return swrMat("straw", function () {
return new THREE.MeshLambertMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide, map: swrTex("straw", 64, 64, function (x, W, H) {
x.fillStyle = "#C8A04A";
x.fillRect(0, 0, W, H);
for (var i = 0; i < 70; i++) {
x.strokeStyle = ["#E8C870", "#A07A2A", "#D8B058"][i % 3];
x.lineWidth = 1;
var px = Math.random() * W;
x.beginPath();
x.moveTo(px, 0);
x.lineTo(px + Math.random() * 6 - 3, H);
x.stroke();
}
}) });
});
},
function () {
return swrMat("shroud", function () {
return new THREE.MeshLambertMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide, transparent: true, depthWrite: false, emissive: 0x1A1E26,
map: swrTex("shroud", 32, 128, function (x, W, H) { var g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "rgba(232,236,244,1)"); g.addColorStop(0.65, "rgba(214,222,236,0.85)"); g.addColorStop(1, "rgba(190,200,220,0.05)"); x.fillStyle = g; x.fillRect(0, 0, W, H); }) });
});
},
function () {
return swrMat("web", function () {
return new THREE.MeshLambertMaterial({ color: 0xFFFFFF, map: swrTex("web", 64, 64, function (x, W, H) {
x.fillStyle = "#141418";
x.fillRect(0, 0, W, H);
x.strokeStyle = "rgba(230,230,240,.7)";
x.lineWidth = 1;
for (var a = 0; a < 8; a++) {
x.beginPath();
x.moveTo(W / 2, H / 2);
x.lineTo(W / 2 + Math.cos(a * 0.785) * W, H / 2 + Math.sin(a * 0.785) * H);
x.stroke();
}
for (var r = 6; r < W; r += 8) {
x.beginPath();
x.arc(W / 2, H / 2, r, 0, 7);
x.stroke();
}
}) });
});
},
function () {
return swrMat("gwing", function () {
var s = new THREE.Shape();
s.moveTo(0, 0);
s.lineTo(0.62, 0.22);
s.lineTo(0.66, 0.1);
s.quadraticCurveTo(0.56, -0.12, 0.5, -0.36);
s.quadraticCurveTo(0.42, -0.22, 0.33, -0.38);
s.quadraticCurveTo(0.24, -0.24, 0.16, -0.46);
s.quadraticCurveTo(0.08, -0.3, 0, -0.52);
s.lineTo(0, 0);
return new THREE.ShapeGeometry(s);
});
},
function (force) {
if (!swrSigned())
return Promise.resolve(null);
if (!force && SWR.ownAt && Date.now() - SWR.ownAt < 60000)
return Promise.resolve(SWR.rules);
return swrRpc("samhain_wear_mine", {}).then(function (o) {
if (!o || o.ok === false)
return null;
SWR.own = {};
(o.own || []).forEach(function (r) { SWR.own[r.k] = r.at || 1; });
SWR.rules = o.rules || null;
SWR.ownAt = Date.now();
return SWR.rules;
}).catch(function () { SWR.ownAt = Date.now(); return null; });
},
function (k, on) {
var w = WEAR[k];
if (!w)
return;
var L = meLook(), lk = swrLookKey(w.slot);
L[lk] = on === false ? null : k;
L.src = L.src || {};
L.src[lk] = "chosen";
try {
var od = dreamer().offDuty;
if (od && od.look && lk in od.look)
od.look[lk] = L[lk];
}
catch (e) { }
if (typeof rebuildMe === "function")
rebuildMe();
if (typeof save === "function")
save();
try {
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
},
function () {
var R = SWR.rules || {}, b = "", fns = {}, L = meLook();
b += "<div style='font-size:12px;opacity:.85;margin:4px 0 8px'>" + swrOwnCount() + " of " + SWR_LINE.length + " found. " + (R.trade ? "The Keeper lets the line be <b>given</b> to another dreamer standing near you." : "Each piece is <b>yours alone</b>: it can't be sold, traded or given, so it always says you were there.") + "</div>";
SWR_LINE.forEach(function (r, i) {
var have = SWR.own[r[0]], Rr = SWR_RARE[r[3]], on = L[swrLookKey(r[1])] === r[0];
b += "<div style='display:flex;gap:8px;align-items:center;margin:3px 0;padding:5px 7px;border-radius:6px;background:rgba(255,255,255,.04);opacity:" + (have ? 1 : 0.55) + "'>" +
"<span style='flex:1'><b style='color:" + Rr.col + "'>" + esc(r[2]) + "</b> <span style='font-size:11px;opacity:.8'>" + Rr.n + "</span><br><span style='font-size:11px;opacity:.8'>" + esc(have ? r[4] : "Not found yet.") + "</span></span>" +
(have ? "<button class='btn' data-w='w" + i + "'>" + (on ? "Take off" : "Wear") + "</button>" + (R.trade ? "<button class='btn' data-w='g" + i + "'>Give</button>" : "") : "") + "</div>";
fns["w" + i] = function () { swrWear(r[0], !on); swrMyLine(); };
fns["g" + i] = function () { swrGive(r[0]); };
});
worldCard(worldFacts("🎃 Your Samhain line", "Won only in the apple barrels while Samhain is on. Never sold.", [], []) + b, fns);
},
function (k) {
var near = (typeof presenceList === "function" ? presenceList() : []).filter(function (p) { return p.dist < 8; }), b = "", fns = {};
if (!near.length) {
setStatus("Stand near the dreamer you want to give it to (within a few steps).");
return;
}
near.slice(0, 6).forEach(function (p, i) {
b += worldBtn("p" + i, "🎁 Give it to " + esc(p.name), "");
fns["p" + i] = function () {
worldCard(null);
swrRpc("samhain_wear_give", { p_k: k, p_to: p.id }).then(function (o) { setStatus(esc((o && o.say) || "Not now.")); swrLoad(true); }).catch(function () { setStatus("Not now."); });
};
});
worldCard(worldFacts("🎁 Give " + esc(WEAR[k].label), "Once given it's theirs, and gone from you.", [], []) + b, fns);
},
function (o) {
o = o || {};
swrBobStop();
var kids = !!o.kids, B = SWR.bob = { o: o, kids: kids, t: 0, left: 90, goes: 3, caught: [], breath: 1, under: false, dipKey: false, dipBtn: false,
head: { x: 150, y: 230, vx: 0, vy: 0 }, aim: { x: 150, y: 230 }, keys: {}, apples: [], ripples: [], say: "", sayT: 0, done: false, last: performance.now(),
rolls: 0 };
var nGold = kids ? 1 : 2, n = kids ? 6 : 7;
for (var i = 0; i < n; i++) {
var kind = i < nGold ? "gold" : (i % 2 ? "green" : "red"), A = SWR_APPLES[kind], a = Math.random() * Math.PI * 2, d = Math.random() * 80;
B.apples.push({ k: kind, r: A.r, x: 150 + Math.cos(a) * d, y: 150 + Math.sin(a) * d, vx: 0, vy: 0, ph: Math.random() * 6, spin: Math.random() * 6, gone: false });
}
var on = swrOn(), signed = swrSigned();
var note = !signed ? "Sign in to win a prize: anyone can play." : !on ? "Samhain isn't on just now, so no apple carries a prize. Play for fun!" : "Some apples have a <b>Samhain prize</b> tied to the stem. Free to play, always.";
var h = worldFacts("🍎 Bobbing for apples" + (o.where ? " · " + esc(o.where) : ""), "Hands behind your back!", [], []) +
"<div style='font-size:12px;line-height:1.45;margin:2px 0 6px'>Steer over the tub with your mouse or finger (or arrow keys). <b>Hold DIP</b> to put your face in, <b>BITE</b> when an apple's at your teeth. Go slowly: rush and the apples bob away. Pin one against the side; the little <b style='color:#E8B030'>gold-ribboned</b> ones are slippery. " + note + "</div>" +
"<canvas id='swr-tub' width='300' height='300' style='display:block;margin:0 auto;width:min(300px,78vw);height:min(300px,78vw);border-radius:10px;touch-action:none;background:#14100C'></canvas>" +
"<div style='display:flex;gap:8px;margin-top:8px'><button class='btn' id='swr-dip' style='flex:1;padding:12px 0;font-size:15px'>💦 DIP (hold)</button><button class='btn' id='swr-bite' style='flex:1;padding:12px 0;font-size:15px'>😬 BITE</button></div>" +
"<div id='swr-tubsay' style='min-height:18px;font-size:12px;margin-top:6px;text-align:center'></div>" +
(signed ? worldBtn("line", "🎃 Your Samhain line", "") : "");
worldCard(h, { line: function () { swrBobStop(); swrLoad(true).then(swrMyLine); } });
var cv = document.getElementById("swr-tub");
B.cv = cv;
function aimAt(ev) { var r = cv.getBoundingClientRect(), p = ev.touches ? ev.touches[0] : ev; if (!p)
return; B.aim.x = (p.clientX - r.left) / r.width * SWR_TUB.W; B.aim.y = (p.clientY - r.top) / r.height * SWR_TUB.H; B.useAim = true; }
cv.addEventListener("pointermove", aimAt);
cv.addEventListener("pointerdown", function (ev) { aimAt(ev); });
cv.addEventListener("touchmove", function (ev) { aimAt(ev); ev.preventDefault(); }, { passive: false });
var dip = document.getElementById("swr-dip"), bite = document.getElementById("swr-bite");
["pointerdown", "touchstart"].forEach(function (e) { dip.addEventListener(e, function (ev) { ev.preventDefault(); B.dipBtn = true; if (ev.pointerId != null)
B.dipId = ev.pointerId; }, { passive: false }); });
["pointerup", "pointerleave", "touchend", "touchcancel"].forEach(function (e) { dip.addEventListener(e, function () { if (B.dipBtn)
B.upAt = performance.now(); B.dipBtn = false; }); });
var biteAt = 0;
bite.addEventListener("pointerdown", function (ev) { ev.preventDefault(); ev.stopPropagation(); biteAt = performance.now(); swrBite(); });
bite.addEventListener("click", function (ev) { ev.stopPropagation(); if (performance.now() - biteAt < 700)
return; swrBite(); });
B.kd = function (ev) {
if (!SWR.bob || !document.getElementById("swr-tub"))
return;
var k = ev.key;
var used = true;
if (k === " ") {
B.dipKey = true;
}
else if (k === "b" || k === "B" || k === "Enter") {
if (!ev.repeat)
swrBite();
}
else if (/^(Arrow|w$|a$|s$|d$|W$|A$|S$|D$)/.test(k)) {
B.keys[k.toLowerCase()] = true;
B.useAim = false;
}
else
used = false;
if (used) {
ev.preventDefault();
ev.stopPropagation();
}
};
B.ku = function (ev) { if (!SWR.bob)
return; var k = ev.key; if (k === " ")
B.dipKey = false; B.keys[k.toLowerCase()] = false; };
B.pu = function (ev) { if (SWR.bob === B && B.dipBtn && ev.pointerId === B.dipId) {
B.upAt = performance.now();
B.dipBtn = false;
} };
window.addEventListener("keydown", B.kd, true);
window.addEventListener("keyup", B.ku, true);
window.addEventListener("pointerup", B.pu, true);
B.raf = requestAnimationFrame(swrBobFrame);
},
function (B, dt) {
var T = SWR_TUB, cx = T.W / 2, cy = T.H / 2, H = B.head;
B.t += dt;
B.left -= dt;
if (B.left <= 0) {
swrBobEnd("⏳ Time! " + (B.caught.length ? "" : "Not a single apple. "));
return;
}
var sp = B.under ? 70 : 150, tx = H.x, ty = H.y;
if (B.useAim) {
tx = B.aim.x;
ty = B.aim.y;
}
else {
var kx = (B.keys.arrowright || B.keys.d ? 1 : 0) - (B.keys.arrowleft || B.keys.a ? 1 : 0), ky = (B.keys.arrowdown || B.keys.s ? 1 : 0) - (B.keys.arrowup || B.keys.w ? 1 : 0);
tx = H.x + kx * 40;
ty = H.y + ky * 40;
}
var dx = tx - H.x, dy = ty - H.y, d = Math.hypot(dx, dy), want = Math.min(sp, d * 4);
var nvx = d > 0.5 ? dx / d * want : 0, nvy = d > 0.5 ? dy / d * want : 0;
H.vx += (nvx - H.vx) * Math.min(1, dt * 6);
H.vy += (nvy - H.vy) * Math.min(1, dt * 6);
H.x += H.vx * dt;
H.y += H.vy * dt;
var hr = Math.hypot(H.x - cx, H.y - cy), lim = T.R - 14;
if (hr > lim) {
H.x = cx + (H.x - cx) / hr * lim;
H.y = cy + (H.y - cy) / hr * lim;
}
var hs = Math.hypot(H.vx, H.vy);
var wantUnder = B.dipKey || B.dipBtn;
if (wantUnder && !B.under && B.breath > 0.15) {
B.under = true;
B.ripples.push({ x: H.x, y: H.y, r: 6, a: 1 });
}
if (!wantUnder && B.under) {
B.under = false;
B.upAt = performance.now();
}
if (B.under) {
B.breath -= dt / (B.kids ? 4.6 : 4.0);
if (B.breath <= 0) {
B.breath = 0;
B.under = false;
B.dipKey = false;
B.dipBtn = false;
B.goes--;
swrSay("💦 <b>Splutter!</b> Out of breath. " + (B.goes > 0 ? B.goes + " go" + (B.goes > 1 ? "es" : "") + " left." : ""));
if (B.goes <= 0)
return swrBobEnd("💦 Out of goes!");
}
}
else
B.breath = Math.min(1, B.breath + dt / (B.kids ? 2.2 : 3.0));
B.apples.forEach(function (A) {
if (A.gone)
return;
A.ph += dt;
var slip = A.k === "gold" ? 1.7 : 1;
A.vx += Math.cos(A.ph * 0.7 + A.spin) * 8 * dt * slip;
A.vy += Math.sin(A.ph * 0.9 + A.spin * 1.3) * 8 * dt * slip;
if (B.under) {
var ex = A.x - H.x, ey = A.y - H.y, ed = Math.hypot(ex, ey) || 1, reach = 22 + A.r + (hs * 0.35);
if (ed < reach + 30) {
var push = (hs * 0.9 + (ed < 22 + A.r ? 60 : 0)) * slip * (B.kids ? 0.7 : 1);
A.vx += ex / ed * push * dt * 4;
A.vy += ey / ed * push * dt * 4;
}
}
var damp = Math.pow(A.k === "gold" ? 0.55 : 0.35, dt);
A.vx *= damp;
A.vy *= damp;
A.x += A.vx * dt;
A.y += A.vy * dt;
var ar = Math.hypot(A.x - cx, A.y - cy), al = T.R - 6 - A.r;
if (ar > al) {
var nx = (A.x - cx) / ar, ny = (A.y - cy) / ar;
A.x = cx + nx * al;
A.y = cy + ny * al;
var vn = A.vx * nx + A.vy * ny;
if (vn > 0) {
A.vx -= vn * 1.6 * nx;
A.vy -= vn * 1.6 * ny;
}
}
});
for (var i = 0; i < B.apples.length; i++)
for (var j = i + 1; j < B.apples.length; j++) {
var P = B.apples[i], Q = B.apples[j];
if (P.gone || Q.gone)
continue;
var qx = Q.x - P.x, qy = Q.y - P.y, qd = Math.hypot(qx, qy) || 1, m = P.r + Q.r;
if (qd < m) {
var o = (m - qd) / 2;
P.x -= qx / qd * o;
P.y -= qy / qd * o;
Q.x += qx / qd * o;
Q.y += qy / qd * o;
}
}
B.ripples.forEach(function (r) { r.r += dt * 50; r.a -= dt * 0.9; });
B.ripples = B.ripples.filter(function (r) { return r.a > 0; });
if (B.under && hs > 40 && Math.random() < dt * 8)
B.ripples.push({ x: H.x, y: H.y, r: 22, a: 0.6 });
},
function () {
var B = SWR.bob;
if (!B || B.done)
return;
if (!B.under && B.upAt && performance.now() - B.upAt < 2000 && B.breath > 0.05) {
B.under = true;
B.upAt = 0;
}
if (!B.under) {
swrSay("😬 Snap! Only air. <b>Hold DIP</b> to put your face in first.");
return;
}
var T = SWR_TUB, cx = T.W / 2, cy = T.H / 2, H = B.head, best = null, bd = 1e9;
B.apples.forEach(function (A) { if (A.gone)
return; var d = Math.hypot(A.x - H.x, A.y - H.y); if (d < 22 + A.r + 7 && d < bd) {
bd = d;
best = A;
} });
if (!best) {
B.goes--;
swrSay("💦 A mouthful of cold water. " + (B.goes > 0 ? B.goes + " go" + (B.goes > 1 ? "es" : "") + " left." : ""));
if (B.goes <= 0)
swrBobEnd("💦 Out of goes!");
if (typeof shnSfx === "function")
shnSfx("scrape");
return;
}
var speed = Math.hypot(best.vx, best.vy), pinned = Math.hypot(best.x - cx, best.y - cy) > T.R - 6 - best.r - 5;
var p = pinned ? 0.92 : Math.max(0.08, 0.65 - speed / 60);
if (best.k === "gold")
p *= pinned ? 0.75 : 0.5;
if (B.kids)
p = Math.min(0.95, p * 1.35);
if (Math.random() < p) {
best.gone = true;
B.caught.push(best.k);
B.under = false;
B.dipKey = B.dipBtn = false;
if (typeof shnSfx === "function")
shnSfx("pop");
swrSay("🍎 <b>Got it!</b> A " + SWR_APPLES[best.k].n + " in your teeth" + (pinned ? ", pinned against the side." : "!"));
swrCaught(best.k);
if (B.caught.length >= 3)
setTimeout(function () { swrBobEnd("🍎🍎🍎 Three apples!"); }, 900);
}
else {
B.goes--;
var a = Math.atan2(best.y - H.y, best.x - H.x);
best.vx += Math.cos(a) * 90;
best.vy += Math.sin(a) * 90;
if (typeof shnSfx === "function")
shnSfx("scrape");
swrSay("💦 It slipped off your teeth" + (pinned ? "" : " (pin it against the side!)") + ". " + (B.goes > 0 ? B.goes + " go" + (B.goes > 1 ? "es" : "") + " left." : ""));
if (B.goes <= 0)
swrBobEnd("💦 Out of goes!");
}
},
function (kind) {
var B = SWR.bob;
if (B && B.o && B.o.onCatch)
try {
B.o.onCatch(kind, B.caught.length);
}
catch (e) { }
if (!swrSigned() || !swrOn())
return;
swrRpc("samhain_apple_take", { p_kind: kind }).then(function (o) {
if (!o)
return;
if (o.prize) {
SWR.own[o.prize] = Date.now();
var r = swrLine(o.prize), Rr = r ? SWR_RARE[r[3]] : null;
swrPrizeCard(o.prize);
if (typeof shnSfx === "function")
shnSfx("bell", { f: 880 });
}
else if (o.out && o.ticket && SWR.bob)
swrTicketOffer(o.ticket, o.say);
else if (o.say && SWR.bob)
swrSay(SWR.bob.say + " <span style='opacity:.8'>" + esc(o.say) + "</span>");
}).catch(function () { });
},
function (t, say) {
if (!SWR.bob || SWR.bob.kids)
return;
swrSay("<span style='opacity:.85'>" + esc(say || "") + "</span> <b style='cursor:pointer;text-decoration:underline' id='swr-ticket'>🎟 A ticket: " + (+t.tries) + " more prize apples for " + (+t.gold) + " gold</b>");
var e = document.getElementById("swr-ticket");
if (e)
e.onclick = function () {
e.onclick = null;
swrRpc("samhain_apple_ticket", {}).then(function (r) { swrSay(r && r.say ? esc(r.say) : "The ticket stall is shut just now."); if (r && r.ok && typeof goldLoad === "function")
try {
goldLoad(true);
}
catch (x) { } }).catch(function () { swrSay("The ticket stall is shut just now."); });
};
},
function (k) {
swrBobStop();
var r = swrLine(k);
if (!r)
return;
var Rr = SWR_RARE[r[3]];
worldCard(worldFacts("🎃 A prize on the stem!", "Tied to the apple with an orange ribbon", [], []) +
"<div style='text-align:center;margin:8px 0;padding:12px;border-radius:8px;background:rgba(255,140,40,.1);border:1px solid " + Rr.col + "'><div style='font-size:12px;color:" + Rr.col + "'>" + Rr.n + " · the Samhain line</div><div style='font-size:19px;margin:4px 0'><b>" + esc(r[2]) + "</b></div><div style='font-size:12px;opacity:.85'>" + esc(r[4]) + "</div></div>" +
"<div style='font-size:12px;opacity:.85'>It's yours for good. It can only be won like this, while Samhain is on: never sold anywhere.</div>" +
worldBtn("wear", "👤 Wear it now", "") + worldBtn("again", "🍎 Bob again", "") + worldBtn("line", "🎃 Your Samhain line", ""), { wear: function () { swrWear(k, true); worldCard(null); setStatus("You put on the <b>" + esc(r[2]) + "</b>."); }, again: function () { swrBob(SWR.lastO || {}); }, line: function () { swrMyLine(); } });
},
function (head) {
var B = SWR.bob;
if (!B || B.done)
return;
B.done = true;
SWR.lastO = B.o;
var n = B.caught.length;
swrSay(head + " " + (n ? "You caught <b>" + n + "</b> apple" + (n > 1 ? "s" : "") + "." : "") + " <b style='cursor:pointer;text-decoration:underline' id='swr-again'>Bob again</b>");
var a = document.getElementById("swr-again");
if (a)
a.onclick = function () { swrBob(B.o); };
if (B.o && B.o.onEnd)
try {
B.o.onEnd(n);
}
catch (e) { }
},
function (B) {
var cv = B.cv, x = cv.getContext("2d"), T = SWR_TUB, cx = T.W / 2, cy = T.H / 2, t = B.t;
x.clearRect(0, 0, T.W, T.H);
x.fillStyle = "#6A4424";
x.beginPath();
x.arc(cx, cy, 148, 0, 7);
x.fill();
for (var s = 0; s < 28; s++) {
var a = s / 28 * Math.PI * 2;
x.strokeStyle = "rgba(40,22,10,.6)";
x.lineWidth = 1.5;
x.beginPath();
x.moveTo(cx + Math.cos(a) * T.R, cy + Math.sin(a) * T.R);
x.lineTo(cx + Math.cos(a) * 148, cy + Math.sin(a) * 148);
x.stroke();
}
x.strokeStyle = "#2A2A2E";
x.lineWidth = 5;
x.beginPath();
x.arc(cx, cy, 145, 0, 7);
x.stroke();
var wg = x.createRadialGradient(cx - 20, cy - 30, 10, cx, cy, T.R);
wg.addColorStop(0, "#2A5A6A");
wg.addColorStop(1, "#0E2430");
x.fillStyle = wg;
x.beginPath();
x.arc(cx, cy, T.R, 0, 7);
x.fill();
x.save();
x.beginPath();
x.arc(cx, cy, T.R, 0, 7);
x.clip();
for (var w = 0; w < 6; w++) {
x.strokeStyle = "rgba(200,230,240,.07)";
x.lineWidth = 2;
x.beginPath();
x.arc(cx + Math.sin(t * 0.4 + w) * 30, cy + Math.cos(t * 0.3 + w * 2) * 30, 30 + w * 18, 0, 7);
x.stroke();
}
B.ripples.forEach(function (r) { x.strokeStyle = "rgba(220,240,250," + (r.a * 0.5) + ")"; x.lineWidth = 1.5; x.beginPath(); x.arc(r.x, r.y, r.r, 0, 7); x.stroke(); });
B.apples.forEach(function (A) {
if (A.gone)
return;
var bob = 1 + Math.sin(A.ph * 3) * 0.05, rr = A.r * bob;
x.fillStyle = "rgba(0,0,0,.3)";
x.beginPath();
x.ellipse(A.x + 3, A.y + 4, rr, rr * 0.8, 0, 0, 7);
x.fill();
var g = x.createRadialGradient(A.x - rr * 0.35, A.y - rr * 0.4, 1, A.x, A.y, rr);
g.addColorStop(0, "#FFF6E0");
g.addColorStop(0.25, SWR_APPLES[A.k].col);
g.addColorStop(1, "#2A0A04");
x.fillStyle = g;
x.beginPath();
x.arc(A.x, A.y, rr, 0, 7);
x.fill();
x.strokeStyle = "#4A2A0A";
x.lineWidth = 2;
x.beginPath();
x.moveTo(A.x, A.y - rr * 0.5);
x.lineTo(A.x + 3, A.y - rr * 0.5 - 5);
x.stroke();
if (A.k === "gold") {
x.strokeStyle = "#FF8A20";
x.lineWidth = 2;
x.beginPath();
x.moveTo(A.x + 3, A.y - rr * 0.5 - 5);
x.quadraticCurveTo(A.x + 10, A.y - rr - 2, A.x + 12, A.y - rr + 4);
x.stroke();
}
});
var H = B.head;
if (B.under) {
x.fillStyle = "rgba(230,220,200,.25)";
x.beginPath();
x.arc(H.x, H.y, 22, 0, 7);
x.fill();
x.strokeStyle = "rgba(255,255,255,.7)";
x.lineWidth = 2;
x.beginPath();
x.arc(H.x, H.y, 22 + Math.sin(t * 12) * 1.5, 0, 7);
x.stroke();
x.fillStyle = "rgba(255,240,220,.9)";
x.beginPath();
x.ellipse(H.x, H.y + 4, 7, 4, 0, 0, 7);
x.fill();
}
else {
x.fillStyle = "rgba(0,0,0,.35)";
x.beginPath();
x.arc(H.x + 6, H.y + 8, 24, 0, 7);
x.fill();
x.strokeStyle = "rgba(255,230,180,.8)";
x.setLineDash([4, 4]);
x.lineWidth = 1.5;
x.beginPath();
x.arc(H.x, H.y, 22, 0, 7);
x.stroke();
x.setLineDash([]);
}
x.restore();
x.fillStyle = "rgba(0,0,0,.55)";
x.fillRect(60, 6, 180, 12);
x.fillStyle = B.breath < 0.3 ? "#E05030" : "#7AC8F0";
x.fillRect(62, 8, 176 * B.breath, 8);
x.fillStyle = "#FFF";
x.font = "10px sans-serif";
x.textAlign = "center";
x.fillText("breath", 150, 30);
x.textAlign = "left";
x.font = "13px sans-serif";
x.fillText("❤".repeat(Math.max(0, B.goes)), 8, 292);
x.textAlign = "right";
x.fillText(Math.ceil(Math.max(0, B.left)) + "s · 🍎" + B.caught.length, 292, 292);
},
function () {
try {
if (!WLD.card || WLD.card.style.display !== "block")
return;
var d = document.createElement("div");
d.innerHTML = worldBtn("swr", "🍎 Bobbing for apples and the Samhain line", "A prize on some apples' stems: free to play. At the Samhain Fair, Hollowmere's barrel, and the Little Moons' Samhain");
var b = d.firstChild;
b.style.cursor = "pointer";
b.onclick = function (ev) { ev.stopPropagation(); swrLoad(true).then(swrMyLine); };
WLD.card.appendChild(b);
}
catch (e) { }
},
function (parent, look, x, z, rot, s) {
if (typeof buildFigure !== "function")
return null;
var L = Object.assign({ sex: "f", skin: 0xD8C8B0, hair: 0x2A1A10, top: 0x3A3A40, topKind: "shirt", bottom: 0x2A2A30, shoes: 0x1A1A1A, hat: null }, look);
var g = buildFigure({ id: "__swr_" + x + "_" + z, archetype: "human", attrs: {}, look: L, solid: false, detail: 3, nights: [], city: true }, 1);
g.position.set(x, 0, z);
g.rotation.y = rot || 0;
if (s)
g.scale.setScalar(s);
g.traverse(function (m) { m.raycast = function () { }; });
parent.add(g);
return g;
},
function () {
var F = SHC.fair;
if (!F)
return;
F.stalls.forEach(function (S) {
if (S.k === "apples") {
var g = S.g, oak = new THREE.MeshLambertMaterial({ color: 0x6A4424 }), iron = new THREE.MeshLambertMaterial({ color: 0x2A2A2E });
[[-0.9, 0], [0.9, 0]].forEach(function (p, i) {
var tub = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.55, 0.75, 18), oak);
tub.position.set(p[0], 0.375, 2.3);
g.add(tub);
[0.15, 0.6].forEach(function (h) { var hp = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.025, 5, 20), iron); hp.rotation.x = Math.PI / 2; hp.position.set(p[0], h, 2.3); g.add(hp); });
var w = new THREE.Mesh(new THREE.CircleGeometry(0.57, 20), new THREE.MeshLambertMaterial({ color: 0x1E4050 }));
w.rotation.x = -Math.PI / 2;
w.position.set(p[0], 0.7, 2.3);
g.add(w);
for (var a = 0; a < 6; a++) {
var ap = new THREE.Mesh(new THREE.SphereGeometry(0.075, 10, 8), new THREE.MeshLambertMaterial({ color: a === 0 ? 0xD8A020 : (a % 2 ? 0x6AA83A : 0xC8201A) }));
ap.position.set(p[0] + Math.cos(a * 1.1 + i) * 0.32, 0.72, 2.3 + Math.sin(a * 1.1 + i) * 0.32);
g.add(ap);
}
});
var crate = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.4, 0.5), oak);
crate.position.set(0, 1.25, 1.1);
g.add(crate);
for (var c = 0; c < 8; c++) {
var ca = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), new THREE.MeshLambertMaterial({ color: c % 3 ? 0xC8201A : 0x6AA83A }));
ca.position.set(-0.3 + (c % 4) * 0.2, 1.5, 1.0 + Math.floor(c / 4) * 0.18);
g.add(ca);
}
if (typeof solidPush === "function") { }
}
else if (S.k === "costumes") {
var g2 = S.g, rail = new THREE.MeshLambertMaterial({ color: 0x8A8A92 });
var bar = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 3.2, 6), rail);
bar.rotation.z = Math.PI / 2;
bar.position.set(0, 2.15, -1.2);
g2.add(bar);
[0xF4F4F0, 0x141418, 0xE0701A, 0x6A3A9A, 0x8A1020, 0xE8E0CC, 0x3A6A1A, 0x5A2A1A].forEach(function (col, i) { var c = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.95, 0.07), new THREE.MeshLambertMaterial({ color: col })); c.position.set(-1.4 + i * 0.4, 1.62, -1.2); g2.add(c); });
[["vampire", -1.15], ["ghost", 0], ["witch", 1.15]].forEach(function (d) { swrDummy(g2, swrSetLook(d[0]), d[1], -0.15, 0, 0.92); });
}
});
},
function (look) {
var L = meLook();
if (!store.swrCostumeKeep) {
var keep = {};
SWR_KEEP_KEYS.forEach(function (lk) { keep[lk] = L[lk] === undefined ? null : L[lk]; });
store.swrCostumeKeep = keep;
}
var od = null;
try {
od = dreamer().offDuty;
}
catch (e) { }
Object.keys(look).forEach(function (lk) { L[lk] = look[lk]; L.src = L.src || {}; L.src[lk] = "chosen"; if (od && od.look && lk in od.look)
od.look[lk] = look[lk]; });
if (typeof rebuildMe === "function")
rebuildMe();
if (typeof save === "function")
save();
try {
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
},
function () {
var K = store.swrCostumeKeep;
if (!K)
return;
var L = meLook(), od = null;
try {
od = dreamer().offDuty;
}
catch (e) { }
Object.keys(K).forEach(function (lk) { L[lk] = K[lk]; if (od && od.look && lk in od.look)
od.look[lk] = K[lk]; });
store.swrCostumeKeep = null;
if (typeof rebuildMe === "function")
rebuildMe();
if (typeof save === "function")
save();
try {
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
},
function (keys, rows) {
var got = [];
return keys.reduce(function (p, k) {
return p.then(function () {
var it = wearRow(rows, k);
return cityRpc("buy_item", { p_item: it.id, p_lot: null }).then(function (o) { if (o !== "ok")
throw new Error(String(o || "Not now.")); got.push(k); });
});
}, Promise.resolve())
.then(function () { return { ok: true, got: got }; }, function (e) { return { ok: false, got: got, say: String((e && e.message) || e) }; })
.then(function (r) { return Promise.all([typeof refreshStanding === "function" ? refreshStanding() : 0, loadThings()]).catch(function () { }).then(function () { return r; }); });
},
function (kind, i) {
if (SWRS.busy)
return;
var S = kind === "set" ? SWR_SETS[i] : null, r = kind === "piece" ? SWR_COST[i] : null;
var look = S ? swrSetLook(S[0]) : (function () { var o = {}; o[swrLookKey(r[1])] = r[0]; return o; })(), name = S ? swrSetName(S) : r[2];
var need = S ? swrSetNeed(S) : (wearOwned(r[0]) ? [] : [r[0]]);
if (!need.length) {
SWRS.ask = null;
if (!S && swrWearing(look)) {
var o2 = {};
o2[swrLookKey(r[1])] = null;
swrPutOn(o2);
swrShopSay("You take off the <b>" + esc(name) + "</b>.");
return swrShop();
}
swrPutOn(look);
swrShopSay("🎭 You put on your <b>" + esc(name) + "</b>" + (S ? " costume" : "") + ". Happy Samhain!");
return swrShop();
}
if (!swrSigned()) {
swrShopSay("Sign in and join Somnucor to buy costumes. You can still borrow one free in the Kids Zone if you're a young dreamer.");
return swrShop();
}
SWRS.busy = true;
swrShopSay("");
swrShop();
swrRowsFor(need).then(function (rows) {
SWRS.busy = false;
var miss = need.filter(function (k) { return !wearRow(rows, k); });
if (miss.length) {
swrShopSay("Madame Mortlake hasn't got the <b>" + esc(miss.map(function (k) { return WEAR[k].label; }).join(", ")) + "</b> on her rails yet. Try again soon.");
return swrShop();
}
var cost = need.reduce(function (s, k) { return s + (+wearRow(rows, k).price || 0); }, 0);
SWRS.ask = { kind: kind, i: i, need: need, cost: cost, rows: rows, look: look, name: name, set: !!S };
swrShop();
}).catch(function () { SWRS.busy = false; swrShopSay("The shop can't reach the city's books just now. Try again in a moment."); swrShop(); });
},
function () {
var A = SWRS.ask;
if (!A || SWRS.busy)
return;
SWRS.ask = null;
SWRS.busy = true;
swrShopSay("");
swrShop();
swrBuyAll(A.need, A.rows).then(function (r) {
SWRS.busy = false;
if (r.ok) {
swrPutOn(A.look);
swrShopSay("🎭 <b>Bought</b> for " + A.cost.toLocaleString() + " gold, and you're wearing your <b>" + esc(A.name) + "</b>" + (A.set ? " costume" : "") + ". It's yours for good: put it on any time from the Wardrobe or here.");
}
else
swrShopSay((r.got.length ? "Bought the " + esc(r.got.map(function (k) { return WEAR[k].label; }).join(", ")) + ", but not the rest: " : "Not bought: ") + esc(r.say));
swrShop();
});
},
function () {
var adult = typeof AGE === "undefined" || !AGE.known || AGE.adult || swrKeeper(), b = "", fns = {};
if (swrSigned() && !adult) {
worldCard(worldFacts("🎭 Mortlake's Costumes", "Costumes for grown-ups", [], []) +
"<div style='margin:6px 0'>Madame Mortlake smiles: \"These are for the grown-ups, dear. The <b>Little Moons' Costume Closet</b> in Wonderglen lends costumes to young dreamers for free!\"</div>");
return;
}
var box = "margin:4px 0 8px;padding:7px 10px;border-radius:6px;";
if (SWRS.busy)
b += "<div style='" + box + "background:rgba(176,122,240,.14)'>⏳ Madame Mortlake is fetching it from the back…</div>";
else if (SWRS.ask) {
var A = SWRS.ask;
b += "<div style='" + box + "background:rgba(255,231,176,.12);border:1px solid rgba(255,231,176,.5)'>Buy the <b>" + esc(A.name) + "</b>" + (A.set ? " costume" : "") + " for <b>" + A.cost.toLocaleString() + " gold</b>?" +
(A.set ? "<div style='font-size:12px;opacity:.85'>" + esc(A.need.map(function (k) { return WEAR[k].label; }).join(", ")) + "</div>" : "") +
worldBtn("yes", "✅ Yes, buy it and put it on", "Yours for good") + worldBtn("no", "Not now", "") + "</div>";
fns.yes = swrShopYes;
fns.no = function () { SWRS.ask = null; swrShop(); };
}
else if (SWRS.msg)
b += "<div style='" + box + "background:rgba(143,232,160,.12)'>" + SWRS.msg + "</div>";
if (store.swrCostumeKeep && !SWRS.busy) {
b += worldBtn("off", "↩️ Take my costume off", "Back into what you wore before");
fns.off = function () { swrTakeOff(); SWRS.ask = null; swrShopSay("You change back into your own clothes."); swrShop(); };
}
b += "<div style='font-size:12px;opacity:.85;margin:2px 0 8px'>Ordinary costumes, yours for good once bought (wear them from the Wardrobe all year). The <b>Samhain line</b> isn't sold here or anywhere: it's only ever found on an apple's stem.</div>";
b += "<div style='font-weight:600;margin:6px 0 2px'>Whole costumes</div>";
SWR_SETS.forEach(function (S, i) {
var need = swrSetNeed(S), cost = need.reduce(function (s, v) { return s + (+String(wearShownPrice(v)).replace(/,/g, "") || 0); }, 0), on = !need.length && swrWearing(swrSetLook(S[0]));
b += worldBtn("s" + i, S[1] + (need.length ? " · " + cost.toLocaleString() + " gold" : on ? " · you're wearing it" : " · yours: put it on"), Object.keys(S[2]).filter(function (lk) { return S[2][lk] && WEAR[S[2][lk]]; }).map(function (lk) { var v = S[2][lk]; return WEAR[v].label + (wearOwned(v) ? " ✓" : ""); }).join(", "));
fns["s" + i] = function () { swrShopPick("set", i); };
});
b += "<div style='font-weight:600;margin:8px 0 2px'>Single pieces</div>";
SWR_COST.forEach(function (r, i) {
var own = wearOwned(r[0]), on = own && meLook()[swrLookKey(r[1])] === r[0];
b += worldBtn("p" + i, esc(r[2]) + (on ? " · wearing (press to take off)" : own ? " · yours: put it on" : " · " + wearShownPrice(r[0]) + " gold"), "");
fns["p" + i] = function () { swrShopPick("piece", i); };
});
var c = WLD.card, top = c && c.style.display === "block" && c.querySelector("[data-swrshop]") ? c.scrollTop : 0;
worldCard(worldFacts("🎭 Mortlake's Costumes", "A Samhain costume shop at the Fair: pick a whole costume, or a piece", [], []) + "<span data-swrshop></span>" + b, fns);
try {
WLD.card.scrollTop = top;
}
catch (e) { }
},
function (G) {
var S = KZ_SITE.samhain;
var tx = S.x - 1, tz = S.z - 9, tg = kzAt(G, tx, tz, kzFace(tx, tz, S.x, S.z));
wCyl(0.7, 0.62, 0.8, kzM(0x8A5A2A), 0, 0.4, 0, tg, 18);
[0.15, 0.65].forEach(function (h) { var hp = new THREE.Mesh(new THREE.TorusGeometry(0.68, 0.03, 5, 20), kzM(0x3A3A40)); hp.rotation.x = Math.PI / 2; hp.position.y = h; tg.add(hp); });
var w = new THREE.Mesh(new THREE.CircleGeometry(0.64, 20), kzM(0x3A8AB0));
w.rotation.x = -Math.PI / 2;
w.position.y = 0.76;
tg.add(w);
for (var a = 0; a < 6; a++)
wSph(0.085, kzM(a === 0 ? 0xE8B020 : (a % 2 ? 0x7AC83A : 0xE0301A)), Math.cos(a * 1.05) * 0.36, 0.78, Math.sin(a * 1.05) * 0.36, tg, 10);
kzSolidIn(tg, 0, 0, 0.7, 0.7, 0.8);
kzSpot(tx + Math.sin(tg.rotation.y) * 1.5, tz + Math.cos(tg.rotation.y) * 1.5, 2.2, "🍎 The Apple Tub", "bob for apples (free!)", function () { swrBob({ kids: true, where: "the Little Moons' Samhain" }); });
var cx = S.x - 9.5, cz = S.z + 4, cg = kzAt(G, cx, cz, kzFace(cx, cz, S.x, S.z));
wBox(2.0, 2.4, 0.7, kzM(0x2A1A3A), 0, 1.2, -0.1, cg);
wBox(2.1, 0.15, 0.8, kzM(0xC8CCD8), 0, 2.45, -0.1, cg);
wBox(1.8, 2.1, 0.05, kzM(0x141018), 0, 1.2, 0.22, cg);
[-1, 1].forEach(function (sd) { var d = wBox(0.95, 2.2, 0.06, kzM(0x3A2A5A), sd * 1.35, 1.2, 0.55, cg); d.rotation.y = sd * -1.1; wSph(0.04, kzM(0xC8CCD8), sd * 1.2, 1.2, 0.75, cg, 8); });
var moon = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.05, 6, 16, Math.PI * 1.25), kzM(0xE8ECF8));
moon.position.set(0, 2.75, -0.1);
moon.rotation.z = -0.9;
cg.add(moon);
wCyl(0.02, 0.02, 1.7, kzM(0xC8CCD8), 0, 2.05, 0.34, cg, 6).rotation.z = Math.PI / 2;
[0xF4F4F0, 0x141418, 0xE0701A, 0x6A3A9A, 0xE8E0CC, 0x8A6A3A].forEach(function (col, i) { wBox(0.24, 0.8, 0.06, kzM(col), -0.65 + i * 0.26, 1.6, 0.34, cg); });
kzSolidIn(cg, 0, -0.1, 1.05, 0.4, 2.5);
kzSign(G, cx + Math.sin(cg.rotation.y) * 0.4, cz + Math.cos(cg.rotation.y) * 0.4, cg.rotation.y, ["THE COSTUME CLOSET", "borrow one, free!"], 2.0, 0.5, "#141018", "#FFB060", 3.2);
kzSpot(cx + Math.sin(cg.rotation.y) * 1.8, cz + Math.cos(cg.rotation.y) * 1.8, 2.4, "🎭 The Costume Closet", "borrow a costume (free)", function () { swrCloset(); });
},
function () {
var b = "<div style='margin:6px 0'>Mistress Moonlantern opens the doors: \"Borrow anything you like, little moon! It's free. When you go home from Wonderglen, the costume hops back into the closet.\"</div>", fns = {};
SWR_SETS.forEach(function (S, i) { b += worldBtn("c" + i, S[1], ""); fns["c" + i] = function () { swrLend(S[0]); worldCard(null); setStatus("🎭 You put on the <b>" + esc(S[1].replace(/^\S+ /, "")) + "</b> costume from the closet. Happy Samhain!"); }; });
if (store.swrLent) {
b += worldBtn("back", "↩️ Give my costume back", "");
fns.back = function () { swrUnlend(); worldCard(null); setStatus("The costume goes back in the closet."); };
}
worldCard(worldFacts("🎭 The Costume Closet", "Free costumes to borrow for the Little Moons' Samhain", [], []) + b, fns);
},
function (k) {
var L = meLook(), look = swrSetLook(k);
if (!store.swrLent) {
var keep = {};
["layer", "back", "hat", "face", "layerColor", "backColor", "accColor"].forEach(function (lk) { keep[lk] = L[lk] === undefined ? null : L[lk]; });
store.swrLent = { keep: keep };
}
store.swrLent.set = k;
Object.keys(look).forEach(function (lk) { L[lk] = look[lk]; });
if (typeof rebuildMe === "function")
rebuildMe();
if (typeof save === "function")
save();
try {
publishMyLook();
}
catch (e) { }
}
];
});
