/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(309, function () {
"use strict";
return [
function (id, kind) {
var X = TOG_EMO[kind];
if (!X || !X.pair)
return;
if (!togLive()) {
setStatus("Emotes done together are for Somnucor, with dreamers near you.");
return;
}
var g = togFigure(id), d = g ? Math.hypot(g.position.x - camera.position.x, g.position.z - camera.position.z) : 99;
if (d > 4) {
setStatus(X.icon + " Step closer to " + esc(togxName(id)) + " first (within 4 m).");
return;
}
TOGX.out = { id: id, kind: kind, at: Date.now() };
togxSend("q." + kind + "." + togxHex(id)).then(function (o) { if (o && o.ok !== false)
setStatus(X.icon + " You asked <b>" + esc(togxName(id)) + "</b> for " + X.ask + ". They choose."); });
},
function (from, q, kind, hex, name) {
var X = TOG_EMO[kind];
if (!X || !X.pair)
return;
var target = togxWho(hex);
if (q === "q") {
if (target !== "me")
return;
if (VC && VC.local && VC.local[from])
return;
TOGX.ask = { from: from, name: name || togxName(from), kind: kind, at: Date.now() };
togxAskBox();
return;
}
if (q === "n") {
if (target === "me" && TOGX.out && TOGX.out.id === from) {
TOGX.out = null;
setStatus(X.icon + " <b>" + esc(name || togxName(from)) + "</b> said no thanks this time.");
}
return;
}
if (target === "me" && !(TOGX.out && TOGX.out.id === from && TOGX.out.kind === kind))
return;
if (target === "me")
TOGX.out = null;
togxStart(from, target, kind, name);
},
function (a, b, kind, name) {
togEmoteOn(a, kind, null);
if (TOG.emo[a])
TOG.emo[a].with = b;
if (b) {
togEmoteOn(b, kind, null);
if (TOG.emo[b])
TOG.emo[b].with = a;
}
var X = TOG_EMO[kind];
if (typeof streetNote === "function")
try {
var an = a === "me" ? "You" : esc(name || togxName(a)), bn = !b ? "" : b === "me" ? "you" : esc(togxName(b));
if (bn)
streetNote("<b>" + an + "</b> and <b>" + bn + "</b> " + X.verb + " " + X.icon);
}
catch (e) { }
},
function () {
var el = document.getElementById("togx-ask"), A = TOGX.ask;
if (A && Date.now() - A.at > 30000) {
TOGX.ask = A = null;
}
if (!A) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "togx-ask";
el.style.cssText = "position:fixed;left:50%;transform:translateX(-50%);bottom:calc(150px + env(safe-area-inset-bottom,0px));z-index:58;width:min(440px,calc(100vw - 32px));min-height:160px;box-sizing:border-box;" +
"background:linear-gradient(180deg,rgba(26,20,34,.97),rgba(12,10,18,.98));border:1px solid #C9A0C8;border-radius:10px;padding:12px 14px;color:#F0E6F0;font:14px var(--sans,system-ui);" +
"box-shadow:0 10px 36px rgba(0,0,0,.55);text-align:center;transition:opacity .4s ease";
el.addEventListener("click", function (e) { var t = e.target.closest && e.target.closest("[data-tx]"); if (!t)
return; togxAnswer(t.getAttribute("data-tx") === "yes"); });
document.body.appendChild(el);
}
var X = TOG_EMO[A.kind];
el.style.display = "block";
el.innerHTML = '<div style="font-size:30px;line-height:1.1">' + X.icon + '</div><div style="margin:6px 0 10px"><b>' + esc(A.name) + '</b> would like ' + X.ask + '.</div>' +
'<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap"><button class="btn" data-tx="yes" style="font-weight:600">' + X.icon + ' ' + X.word + ' back</button><button class="btn" data-tx="no">No thanks</button></div>';
},
function (g, e, kind, t, k, b) {
if (!e || !e.with)
return;
var o = togFigure(e.with);
if (!o)
return;
var P = o.getWorldPosition(TOGX_V[0]), Me = g.getWorldPosition(TOGX_V[1]);
var d = Math.hypot(P.x - Me.x, P.z - Me.z);
if (d < 0.05 || d > 4.5)
return;
g.updateMatrixWorld();
var p = g.worldToLocal(P.clone());
p.y = 0;
var r = p.length();
if (r < 1e-4)
return;
var sway = kind === "slow" ? Math.sin(t * 1.3) * 0.18 : 0;
b.rotation.y = Math.atan2(p.x, p.z) * k + sway * k;
if (kind === "slow") {
b.rotation.z = Math.sin(t * 1.3) * 0.04 * k;
b.position.y = Math.abs(Math.sin(t * 1.3)) * 0.015 * k;
}
var sc = g.getWorldScale(TOGX_V[1]).x || 1, gap = (TOGX_GAP[kind] || 0.8) / sc, step = Math.max(0, r / 2 - gap / 2);
b.position.x = p.x / r * step * k;
b.position.z = p.z / r * step * k;
},
function () {
var h = '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:6px"><b style="font:500 16px var(--serif,Georgia);color:#F0E6D8">😊 Emotes</b><button class="btn" data-tx="close">Close</button></div>';
h += '<div style="color:var(--dim);font-size:12px;margin-bottom:6px">Everyone near you sees them. ' + (typeof HDF_PHONE !== "undefined" && HDF_PHONE ? '' : 'Press N to open this.') + '</div>';
TOGX_GROUPS.forEach(function (G) {
h += '<div style="font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#C9A868;margin:10px 0 4px">' + G[0] + '</div><div style="display:flex;flex-wrap:wrap;gap:6px">';
G[1].forEach(function (k) { var e = togxEmo(k); if (e)
h += '<button class="btn" data-tx="emote" data-k="' + k + '" style="padding:6px 9px">' + e[1] + ' ' + e[2] + '</button>'; });
h += '</div>';
});
h += '<div style="font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#C9A868;margin:12px 0 4px">With someone near you</div>';
var near = (typeof presenceList === "function" && togLive()) ? presenceList().filter(function (p) { return p.dist < 4; }).slice(0, 5) : [];
if (!togLive())
h += '<div style="color:var(--dim)">In Somnucor, with dreamers near you. They always choose whether to join in.</div>';
else if (!near.length)
h += '<div style="color:var(--dim)">Nobody is within 4 m. Walk up to someone, then ask: they choose whether to join in.</div>';
near.forEach(function (p) {
h += '<div style="padding:6px 0;border-bottom:1px solid rgba(255,255,255,.06)"><b>' + esc(p.name) + '</b> <span style="color:var(--dim);font-size:12px">' + Math.round(p.dist) + ' m</span><div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:4px">' +
TOGX_PAIR.map(function (e) { return '<button class="btn" data-tx="pair" data-k="' + e[0] + '" data-id="' + p.id + '" style="padding:4px 8px">' + e[1] + ' ' + e[2] + '</button>'; }).join("") + '</div></div>';
});
return h;
},
function () {
var el = document.getElementById("togx-box");
if (!TOGX.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "togx-box";
el.style.cssText = "position:fixed;z-index:53;left:50%;top:50%;transform:translate(-50%,-50%);width:min(500px,calc(100vw - 32px));max-height:min(80vh,680px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(16,18,30,.97),rgba(8,9,14,.98));border:1px solid #8A7AA8;border-radius:8px;padding:12px 14px 14px;color:var(--bone,#C9BEA8);" +
"font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
el.addEventListener("keydown", function (e) { e.stopPropagation(); });
el.addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-tx]") : null;
if (!t)
return;
var a = t.getAttribute("data-tx");
if (a === "close")
togxOpen(false);
else if (a === "emote") {
togEmote(t.getAttribute("data-k"));
if (HDF_PHONE || (typeof VRM !== "undefined" && VRM.open))
togxOpen(false);
}
else if (a === "pair") {
togxAsk(t.getAttribute("data-id"), t.getAttribute("data-k"));
togxOpen(false);
}
});
document.body.appendChild(el);
}
el.style.display = "block";
var st = el.scrollTop;
el.innerHTML = togxHtml();
el.scrollTop = st;
},
function () {
if (VCX.tex)
return VCX.tex;
var cv = document.createElement("canvas");
cv.width = cv.height = 96;
var x = cv.getContext("2d");
x.fillStyle = "rgba(236,244,226,.9)";
x.beginPath();
x.arc(48, 48, 40, 0, Math.PI * 2);
x.fill();
x.font = "50px 'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillText("🔊", 48, 52);
VCX.tex = new THREE.CanvasTexture(cv);
return VCX.tex;
},
function () {
Object.keys(VC.peers).forEach(function (id) {
var g = togFigure(id), lv = (VC.peers[id].state === "on" && typeof vcLevel === "function") ? vcLevel(id) : 0, s = VCX.spk[id];
if (!g) {
vcxSpeakerOff(id);
return;
}
if (!s) {
if (lv < 0.06)
return;
var sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: vcxSpeakerTex(), transparent: true, depthWrite: false, opacity: 0 }));
sp.renderOrder = 11;
s = VCX.spk[id] = { sp: sp, a: 0, lv: 0 };
}
if (s.sp.parent !== g) {
g.add(s.sp);
}
s.lv += (lv - s.lv) * 0.2;
var want = lv > 0.06 ? 1 : 0;
s.a += (want - s.a) * (want ? 0.18 : 0.05);
s.sp.material.opacity = s.a * 0.95;
s.sp.visible = s.a > 0.02;
var sc = 0.3 + Math.min(0.12, s.lv * 0.14);
s.sp.scale.set(sc, sc, 1);
s.sp.position.set(0.32, 2.62, 0);
});
Object.keys(VCX.spk).forEach(function (id) { if (!VC.peers[id])
vcxSpeakerOff(id); });
},
function () {
var el = document.getElementById("vc-pill");
if (!el)
return;
var s = el.querySelector("[data-vcx]");
if (!s)
return;
var me = Math.min(1, VCX.meter), live = !VC.muted && (!VCX.ptt || vcxHeld());
var bar = '<span title="Your microphone" style="display:inline-block;width:38px;height:7px;border-radius:4px;background:rgba(255,255,255,.12);overflow:hidden;vertical-align:middle">' +
'<span style="display:block;height:100%;width:' + Math.round(me * 100) + '%;background:' + (live ? '#8FCB7A' : '#6A6A6A') + ';transition:width .12s linear"></span></span>';
var t = vcxTalkers(), who = t.length ? '<span style="color:#F0F4E4">🔊 ' + t.slice(0, 2).map(esc).join(", ") + (t.length > 2 ? ' +' + (t.length - 2) : '') + '</span>' : '';
var ptt = VCX.ptt ? '<button class="btn" data-vcptt="1" style="padding:2px 9px;touch-action:none;user-select:none;-webkit-user-select:none;' + (vcxHeld() ? 'border-color:#8FCB7A;color:#DFF5D0' : '') + '">' + (vcxHeld() ? '🎙️ Talking' : 'Hold to talk') + '</button>' : '';
var html = bar + ptt + who;
if (s._h !== html) {
s._h = html;
s.innerHTML = html;
}
}
];
});
