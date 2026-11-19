/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(350, function () {
return [
function (g, op) { g.traverse(function (m) { if (!m.material)
return; var ms = Array.isArray(m.material) ? m.material : [m.material]; var out = ms.map(function (mt) { var c = mt.clone(); c.transparent = true; c.opacity = op; c.depthWrite = false; if (c.color)
c.color.lerp(new THREE.Color(0xC8D8E8), 0.55); return c; }); m.material = Array.isArray(m.material) ? out : out[0]; }); },
function (html, secs, then) {
if (!OVY.veil) {
var v = document.createElement("div");
v.id = "ovy-veil";
v.style.cssText = "position:fixed;inset:0;z-index:44;display:flex;align-items:center;justify-content:center;background:rgba(4,6,12,.94);color:#F0E6CC;font:17px/1.6 var(--serif,Georgia);text-align:center;padding:24px;opacity:0;transition:opacity .9s ease;pointer-events:none";
document.body.appendChild(v);
OVY.veil = v;
}
var V = OVY.veil;
V.innerHTML = "<div style='max-width:560px'>" + html + "<div><span id='ovy-veil-go' role='button' tabindex='0' style='display:inline-block;margin-top:18px;padding:6px 16px;border:1px solid rgba(240,230,204,.45);border-radius:4px;font:13px var(--sans,system-ui);opacity:.75;cursor:pointer;pointer-events:auto'>Go on</span></div></div>";
V.style.display = "flex";
requestAnimationFrame(function () { V.style.opacity = "1"; });
var done = false, fin = function () { if (done)
return; done = true; clearTimeout(OVY.veilT); try {
if (then)
then();
}
catch (e) {
if (window.console)
console.warn("[voyage]", e);
} V.style.opacity = "0"; setTimeout(function () { if (V.style.opacity === "0")
V.style.display = "none"; }, 950); };
var go = document.getElementById("ovy-veil-go");
if (go)
go.onclick = function (ev) { ev.stopPropagation(); if (Date.now() - t0 > 1200)
fin(); };
var t0 = Date.now();
clearTimeout(OVY.veilT);
OVY.veilT = setTimeout(fin, Math.max(1200, (secs || 3) * 1000));
},
function (k) {
var p = SEA_BY[k];
if (!p || !SEA.aboard)
return;
var tx = p.dock ? p.dock.x : p.x + (SEA.sx - p.x) / Math.max(1, Math.hypot(SEA.sx - p.x, SEA.sz - p.z)) * (p.r + 300), tz = p.dock ? p.dock.z : p.z + (SEA.sz - p.z) / Math.max(1, Math.hypot(SEA.sx - p.x, SEA.sz - p.z)) * (p.r + 300);
SEA.auto = { x: tx, z: tz, name: p.name, after: p.dock ? "Press E to go ashore." : "" };
},
function (msg) {
var h = ovyHead("📜 The Voyage Home") + "<div style='opacity:.85'>Homer's Odyssey, played. Sail to each place and live it: walk, sail, choose, and see whether you do better than Odysseus did. Every chapter ends with what Homer really tells, and a keepsake for your backpack.</div>", fns = {};
if (msg)
h += "<div style='margin:6px 0;color:#CFE8C0'>" + msg + "</div>";
if (OVY.k) {
var C = OVY_BY[OVY.k];
h += "<div style='margin:8px 0;padding:6px 8px;border:1px solid #C9A868;border-radius:4px'>Now playing: <b>" + esc(C.title) + "</b><br><span style='opacity:.8'>" + esc(C.goal) + "</span></div>";
h += worldBtn("quit", "Leave this chapter", "You can start it again from the beginning whenever you like");
fns.quit = function () { ovyEnd(false); ovyBook("Chapter left. Start any chapter again from here."); };
}
[1, 2].forEach(function (part) {
h += "<div style='margin:10px 0 2px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#D8A868'>" + OVY_PART[part] + " · " + ovyCount(part) + " of " + OVY_CH.filter(function (c) { return c.part === part; }).length + "</div>";
OVY_CH.forEach(function (c) {
if (c.part !== part)
return;
var d = OVY.done[c.k], p = SEA_BY[c.at];
h += worldBtn("c-" + c.k, (d ? (d.honour ? "★ " : "✓ ") : "○ ") + c.n + ". " + esc(c.title), esc(p ? p.name : "") + " · " + esc(c.book) + " · " + esc(c.goal) + (d && d.honour ? " · you did better than Odysseus" : ""));
fns["c-" + c.k] = function () { ovyChapterCard(c.k); };
});
});
if (ovyCount() === OVY_CH.length)
h += "<div style='margin-top:8px;color:#FFE7B0'>🏛️ <b>Every chapter played.</b> The certificate of the Voyage Home is in your backpack" + (ovySigned() ? "" : " (sign in to keep it)") + ".</div>";
if (ovyKeeper()) {
h += worldBtn("kreset", "Keeper: clear this device's chapter marks", "For testing; the server's record and keepsakes stay");
fns.kreset = function () { OVY.done = {}; ovySave(); ovyBook("Cleared on this device."); };
}
worldCard(h, fns);
},
function (k) {
var c = OVY_BY[k], p = SEA_BY[c.at], d = OVY.done[k];
var h = ovyHead(esc(c.keep[0]) + " " + c.n + ". " + esc(c.title)) + "<div style='opacity:.8'>" + esc(p ? p.name : "") + " · Homer, Odyssey, " + esc(c.book) + "</div>" + ovyP(esc(c.goal) + ".");
h += ovyP("<span style='opacity:.85'>Keepsake: " + esc(c.keep[0]) + " <b>" + esc(c.keep[1]) + "</b>. " + esc(c.keep[2]) + "</span>");
if (d)
h += ovyP("<span style='color:#CFE8C0'>" + (d.honour ? "★ Played, and you did better than Odysseus." : "✓ Played.") + "</span>");
var fns = { go: function () { ovyStart(k); } };
h += worldBtn("go", (d ? "▶ Play it again" : "▶ Play this chapter"), SEA.aboard ? "The Wayfarer sets course for " + esc(p ? p.name : "") + " by herself" : "");
if (d) {
h += worldBtn("hm", "What Homer tells", "The real story, in brief");
fns.hm = function () { ovyHomer(k); };
}
h += worldBtn("bk", "◀ The Voyage Home", "Every chapter");
fns.bk = function () { ovyBook(); };
worldCard(h, fns);
},
function (k, extra) {
var c = OVY_BY[k], h = ovyHead("📜 What Homer tells: " + esc(c.title)) + "<div style='opacity:.8;margin-bottom:4px'>Odyssey, " + esc(c.book) + "</div>", fns = {};
if (extra)
h += "<div style='margin:6px 0;color:#CFE8C0'>" + extra + "</div>";
h += "<ul style='margin:6px 0 0 16px;padding:0'>" + c.homer.map(function (t) { return "<li style='margin:4px 0'>" + esc(t) + "</li>"; }).join("") + "</ul>";
var s = typeof ODL_BY !== "undefined" && ODL_BY[c.at], p = SEA_BY[c.at];
if (s && p && typeof odlCard === "function") {
h += worldBtn("learn", "🎓 Learn here", "The real place, the science, and two questions for your voyage log stamp");
fns.learn = function () { odlCard(p, s); };
}
h += worldBtn("bk", "📜 The Voyage Home", "The next chapter");
fns.bk = function () { ovyBook(); };
worldCard(h, fns);
},
function (k) {
if (!ovyOn())
return;
if (OVY.beast) {
ovySay("<b>You are still one of Circe's creatures.</b> Get your own shape back first.");
return;
}
if (OVY.k)
ovyEnd(false);
var c = OVY_BY[k], P = OVY_PLAY[k];
if (!c || !P)
return;
OVY.k = k;
OVY.D = { k: k, s: "sail", t: 0, goal: null, n: 0 };
OVY.G = new THREE.Group();
WORLDS.sea.g.add(OVY.G);
OVY.D.t0 = Date.now();
if (ovySigned())
ovyRpc("voyage_begin", { p_key: k }).catch(function () { });
worldCard(null);
var p = SEA_BY[c.at];
if (ovyReady(c))
ovyBegin();
else {
if (SEA.aboard) {
ovyCourse(c.at);
ovySay("<b>" + esc(c.title) + ".</b> The Wayfarer sets course for " + esc(p.name) + ". " + (c.ashore ? "Go ashore when you arrive." : ""));
}
else
ovySay("<b>" + esc(c.title) + ".</b> First, back aboard the Wayfarer (the landing, or Back), then sail for " + esc(p.name) + ".");
}
},
function (won, honour, line) {
var k = OVY.k, D = OVY.D;
if (!k)
return;
try {
if (OVY_PLAY[k].end)
OVY_PLAY[k].end(D, won);
}
catch (e) {
if (window.console)
console.warn("[voyage] end", e);
}
if (OVY.G) {
if (OVY.G.parent)
OVY.G.parent.remove(OVY.G);
OVY.G = null;
}
OVY.k = null;
OVY.D = null;
OVY.line = "";
OVY.night = 0;
OVY.mist = 0;
OVY.lock = null;
OVY.sing = 0;
if (!won)
return;
var c = OVY_BY[k], was = OVY.done[k];
OVY.done[k] = { at: new Date().toISOString(), honour: !!(honour || (was && was.honour)) };
ovySave();
ovyTone(523, 0.15);
setTimeout(function () { ovyTone(659, 0.15); }, 160);
setTimeout(function () { ovyTone(784, 0.3); }, 320);
var head = "<b>Chapter played: " + esc(c.title) + ".</b> " + (line || "") + (honour ? " ★ You did better than Odysseus." : "");
ovyHomer(k, head + (ovySigned() ? " …" : " Sign in, and the keepsake (" + esc(c.keep[1].toLowerCase()) + ") is kept in your backpack."));
if (!ovySigned())
return;
var wait = Math.max(0, ((OVY_PLAY[k].min || 40) + 2) * 1000 - (Date.now() - (D && D.t0 || 0)));
setTimeout(function () {
ovyRpc("voyage_finish", { p_key: k, p_honour: !!honour }).then(function (o) {
OVY.mine = null;
var say = (o && o.say) || "";
if (o && o.ok)
ovyHomer(k, head + " " + esc(c.keep[0]) + " " + esc(say) + " <b>It is in your 🎒 Backpack, under Special finds.</b>");
else
ovyHomer(k, head + " " + esc(say || "The keepsake could not be given just now."));
}).catch(function (e) { ovyHomer(k, head + (ovyMissing(e) ? " Keepsakes open soon." : " " + esc((e && e.message) || String(e)))); });
}, wait);
},
function (dt) {
if (!ovyOn())
return;
if (WORLDS.sea.g && OVY.builtFor !== WORLDS.sea.g) {
OVY.builtFor = WORLDS.sea.g;
var mk = typeof worldLetGoMark === "function" ? worldLetGoMark("sea") : null;
try {
ovyBuild(WORLDS.sea.g);
}
catch (e) {
if (window.console)
console.warn("[voyage] build", e);
}
try {
var SW = WORLDS.sea;
if (mk && SW.lgAdded) {
var ad = worldLetGoAdded(mk);
Array.prototype.push.apply(SW.lgAdded, ad);
if (SW.lgAdded.flags)
Array.prototype.push.apply(SW.lgAdded.flags, ad.flags || []);
}
}
catch (e) { }
}
OVY.line = "";
if (OVY.moly && SEA.shore !== SEA_BY.aeaea && !SEA.aboard)
OVY.moly = null;
if (SEA.aboard && OVY.moly)
OVY.moly = null;
try {
if (OVY.beast)
ovyBeastTick(dt);
}
catch (e) {
if (window.console)
console.warn("[voyage] beast", e);
}
try {
ovyAlwaysTick(dt);
}
catch (e) { }
var D = OVY.D;
if (!D)
return;
var c = OVY_BY[D.k], P = OVY_PLAY[D.k];
if (D.s === "sail") {
if (ovyReady(c))
ovyBegin();
else {
var p = SEA_BY[c.at];
if (SEA.aboard && !SEA.auto && !D.told) {
D.told = 1;
}
OVY.line = "<div>📜 <b>" + esc(c.title) + "</b> · " + (SEA.aboard ? "sail for " + esc(p.name) + (c.ashore ? ", then go ashore" : "") : (SEA.shore === p ? "" : "go back aboard, then sail for " + esc(p.name))) + "</div>";
}
return;
}
D.t += dt;
try {
if (P.tick)
P.tick(D, dt, ovyL());
}
catch (e) {
if (window.console && !D.err) {
D.err = 1;
console.warn("[voyage] tick", e);
}
}
if (!OVY.D)
return;
var g = D.goal, gl = "";
if (g) {
var L = ovyL(), dx = g.x - L.x, dz = g.z - L.z, d = Math.hypot(dx, dz);
if (d > 4)
gl = " · " + ovyArrow(dx, dz) + " " + esc(g.name) + " " + (d < 1000 ? Math.round(d) + " m" : (d / 1000).toFixed(1) + " km");
}
var say = "";
try {
say = P.line ? P.line(D) : "";
}
catch (e) { }
OVY.line = "<div>📜 <b>" + esc(c.title) + "</b>" + (say ? " · " + say : "") + gl + "</div>";
},
function (L) {
var r = null;
if (OVY.veil && OVY.veil.style.display !== "none")
return [null, null];
if (OVY.beast)
r = ovyBeastPrompt(L);
if (!r && OVY.D && OVY.D.s !== "sail") {
try {
r = OVY_PLAY[OVY.D.k].prompt(OVY.D, L);
}
catch (e) {
if (window.console && !OVY.D.perr) {
OVY.D.perr = 1;
console.warn("[voyage] prompt", e);
}
}
}
if (r === false)
return [null, null];
if (!r && OVY.D && OVY.D.s !== "sail" && SEA.aboard && OVY_BY[OVY.D.k] && !OVY_BY[OVY.D.k].ashore)
return [null, null];
if (!r)
r = ovyAlwaysPrompt(L);
return r;
},
function (op, html) {
var d = OVY.dark;
if (!d) {
d = document.createElement("div");
d.id = "ovy-dark";
d.style.cssText = "position:fixed;inset:0;z-index:43;pointer-events:none;background:#04060C;opacity:0;transition:opacity .8s ease;display:flex;align-items:flex-start;justify-content:center;padding-top:22vh;color:#E8DCC0;font:16px/1.6 var(--serif,Georgia);text-align:center";
document.body.appendChild(d);
OVY.dark = d;
}
d.style.opacity = String(op || 0);
d.innerHTML = html ? "<div style='max-width:520px;padding:0 20px'>" + html + "<div role='button' aria-hidden='true' style='height:1px;opacity:0'></div></div>" : "";
},
function (D, dt) {
if (D.s !== 1)
return;
var t = D.t;
if (t < 5)
ovyDark(0.92, "<b>Inside the horse.</b><br>It is dark and hot. Thirty men sit knee to knee, swords across their laps. Through a crack you can hear the Trojans dragging the horse up into their city, singing.");
else if (t < 19)
ovyDark(0.88, "<b>A woman's voice outside, calling softly.</b><br>She is calling each man by name, in the voice of his own wife. It is Helen.<br><br><i>\"Come down… it's me…\"</i><br><br>Beside you, young Anticlus opens his mouth to answer.<br><span style='opacity:.75'>Stay silent… " + Math.ceil(19 - t) + "</span>");
else {
ovyDark(0);
OVY.night = 1;
var S = this.spots();
ovyPut(S.side.x, S.side.z, ovyFace(S.side.x, S.side.z, S.gate.x, S.gate.z));
ovyStage(2, [S.gate.x, S.gate.z, "the gates of Troy"]);
ovySay("<b>Night.</b> Helen has gone; Troy is asleep after its feast. You climb down a rope from the horse's belly. Open the gates for the army, which has sailed back in the dark.");
}
},
function (D, L) {
var S = this.spots(), me = this;
if (D.s === 0 && ovyNear(S.horse.x, S.horse.z, 8))
return ovyAsk("The wooden horse", "climb up into its belly", function () { ovyStage(1); ovyGoal(null); ovyTone(180, 0.6); });
if (D.s === 1 && D.t > 5 && D.t < 19)
return ovyAsk("Helen is calling, in your wife's voice", "answer her", function () { ovyTone(160, 0.4); D.t = 0; ovyDark(0.9, "A hard hand clamps over your mouth: Odysseus. <i>\"Not a sound.\"</i><br>Helen's voice drifts away… and comes back. Try again: <b>stay silent</b>, whatever she says."); D.slips = (D.slips || 0) + 1; });
if (D.s === 1)
return false;
if (D.s === 2 && ovyNear(S.gate.x, S.gate.z, 7))
return ovyAsk("The gates of Troy", "lift the great bar and open them", function () { ovyVeil("The gates swing open. The Greek army pours in from the plain, and by morning the ten-year war is over.<br><br>Now Odysseus has only one wish: to go <b>home</b> to Ithaca. It will take him ten more years.", 5, function () { OVY.night = 0; ovyEnd(true, false, "Troy has fallen."); }); });
return null;
},
function (D) {
var p = SEA_BY.lotus, names = ["the young oarsman", "the ship's cook", "the lookout"], R = wRand(Date.now() & 0xffff);
D.men = [];
for (var i = 0; i < 3; i++) {
var a = -2.4 + i * 1.6 + R() * 0.5, d = p.r * (0.3 + R() * 0.25), x = p.x + Math.cos(a) * d, z = p.z + Math.sin(a) * d, tries = 0;
while (seaHeight(x, z) < 2.5 && tries++ < 12) {
d *= 0.8;
x = p.x + Math.cos(a) * d;
z = p.z + Math.sin(a) * d;
}
var g = ovyMan("lotus_scout_" + i, OVY_GREEK([0xB8583A, 0x5A7AA8, 0x8A9A4A][i]), x, z, { face: R() * 6 });
g.userData.pose = "sit";
D.men.push({ g: g, name: names[i], hx: x, hz: z, st: "lost" });
}
D.offer = 18;
ovyStage(0);
ovySay("<b>The Lotus-Eaters.</b> You sent three men inland to see who lives here. They have not come back. Find them, and bring them to the ship; and be careful what you eat.");
},
function (D, dt, L) {
var p = SEA_BY.lotus;
if (SEA.lotus > 0)
D.men.forEach(function (m) { if (m.st === "follow") {
m.st = "lost";
ovySay("<b>Honey-sweet…</b> while you smile at nothing, your men drift back to the lotus groves.");
} });
var k = 0;
D.men.forEach(function (m) {
var g = m.g, tx, tz;
if (m.st === "follow") {
var a = yaw + Math.PI + (k++ - 1) * 0.6;
tx = L.x + Math.sin(a) * 2.6;
tz = L.z + Math.cos(a) * 2.6;
g.userData.pose = null;
}
else {
tx = m.hx;
tz = m.hz;
}
var dx = tx - g.position.x, dz = tz - g.position.z, d = Math.hypot(dx, dz);
if (d > 0.4) {
var st = Math.min(d, (m.st === "follow" ? Math.max(3, d * 1.4) : 1.4) * dt);
g.position.x += dx / d * st;
g.position.z += dz / d * st;
g.position.y = ovyY(g.position.x, g.position.z);
g.rotation.y = Math.atan2(dx, dz);
}
else if (m.st === "lost")
g.userData.pose = "sit";
});
var lost = D.men.filter(function (m) { return m.st === "lost"; });
if (lost.length) {
var b = null;
lost.forEach(function (m) { var d = ovyDist(m.g.position.x, m.g.position.z); if (!b || d < b.d)
b = { m: m, d: d }; });
ovyGoal(b.m.g.position.x, b.m.g.position.z, b.m.name);
}
else
ovyGoal(p.land.x, p.land.z, "the landing");
D.offer -= dt;
if (D.offer < -7)
D.offer = 20 + Math.random() * 12;
},
function (D, L) {
var p = SEA_BY.lotus;
for (var i = 0; i < D.men.length; i++) {
var m = D.men[i];
if (m.st === "lost" && ovyNear(m.g.position.x, m.g.position.z, 3.6))
return ovyAsk("Your scout, " + m.name, "take him by the arm", (function (m) { return function () { m.st = "follow"; ovyTone(600, 0.1); ovySay("<b>" + esc(m.name.charAt(0).toUpperCase() + m.name.slice(1)) + "</b> weeps and begs to stay, but comes, stumbling, at your side."); }; })(m));
}
if (D.offer < 0 && SEA.lotus <= 0)
return ovyAsk("A smiling lotus-eater holds out a honey-sweet fruit", "taste it", function () { SEA.lotus = 30; D.offer = 26; ovySay("<b>Honey-sweet.</b> Why did you come here? It doesn't seem to matter… (it will wear off)"); });
if (D.men.every(function (m) { return m.st === "follow"; }) && ovyNear(p.land.x, p.land.z, 14))
return ovyAsk("The landing", "tie them under the rowing benches and sail at once", function () { ovyEnd(true, false, "All three are aboard, tied under the benches, still weeping for the lotus."); });
return null;
},
function (D, on) {
var S = this.spots(), SL = SEA.solids = SEA.solids || [];
if (D.solids) {
D.solids.forEach(function (s) { var i = SL.indexOf(s); if (i >= 0)
SL.splice(i, 1); });
D.solids = null;
}
if (!on)
return;
D.solids = [];
for (var a = 0; a < Math.PI * 2; a += 0.18) {
if (Math.abs(a - Math.PI / 2) < 0.3)
continue;
var s = { x: S.cx + Math.cos(a) * 19.5, z: S.cz + Math.sin(a) * 15, r: 1.4 };
SL.push(s);
D.solids.push(s);
}
if (on === "shut") {
var dr = { x: S.mouth.x, z: S.mouth.z + 0.6, r: 5 };
SL.push(dr);
D.solids.push(dr);
}
},
function (D) {
var S = this.spots(), G = this.giant();
if (G) {
D.gp = [G.position.x, G.position.z, G.rotation.y];
D.wander = SEA.cyclops.wander;
SEA.cyclops.wander = null;
}
ovyStage(0, [S.mouth.x, S.mouth.z + 2, "the cave"]);
ovySay("<b>Nobody's Escape.</b> You row over to the island with twelve men and a goatskin of very strong wine. Up the slope is a great cave, full of cheeses and pens of lambs. Nobody is home.");
},
function (D, dt, L) {
var S = this.spots(), G = this.giant();
if (D.s >= 1 && D.s <= 4 && G && D.snore != null && D.s >= 3) {
D.snore -= dt;
if (D.snore < 0) {
D.snore = 3.2;
ovyTone(70, 0.9);
}
}
if (D.s === 5) {
if (!D.ride) {
var br = null;
D.rams.forEach(function (r) { if (!r.g || r.g.position.z >= S.cz + 9)
return; var d = ovyDist(r.g.position.x, r.g.position.z) + (r.wait > 0 ? 50 : 0); if (!br || d < br.d)
br = { r: r, d: d }; });
if (br)
ovyGoal(br.r.g.position.x, br.r.g.position.z, "a great ram");
}
D.rams.forEach(function (r, i) {
if (r.wait > 0) {
r.wait -= dt;
return;
}
var path = [[S.cx + (i - 1) * 4, S.cz - 8], [S.cx, S.cz + 8], [S.cx, S.cz + 16], [S.cx, S.cz + 44]], q = path[r.leg + 1];
if (!q) {
r.leg = 0;
r.wait = 4;
ovyAt(r.g, path[0][0], path[0][1]);
return;
}
var dx = q[0] - r.g.position.x, dz = q[1] - r.g.position.z, d = Math.hypot(dx, dz);
if (d < 0.5)
r.leg++;
else {
var st = Math.min(d, 1.7 * dt);
r.g.position.x += dx / d * st;
r.g.position.z += dz / d * st;
r.g.position.y = ovyY(r.g.position.x, r.g.position.z);
r.g.rotation.y = Math.atan2(dx, dz);
}
});
if (D.ride) {
var g = D.ride.g;
camera.position.set(SEA.base + g.position.x, g.position.y + 0.8, g.position.z);
if (g.position.z > S.cz + 12 && !D.felt) {
D.felt = 1;
ovySay("<b>His huge hands stroke the ram's back.</b> <i>\"Dear ram, why last of the flock today? Grieving for your master's eye?\"</i> He lets it pass.");
ovyTone(90, 0.6);
}
if (g.position.z > S.cz + 32) {
D.ride = null;
ovyPut(g.position.x + 1.5, g.position.z + 1, 0);
this.walls(D, false);
ovyStage(6, [SEA_BY.cyclops.land.x, SEA_BY.cyclops.land.z, "the ship"]);
ovySay("<b>Out!</b> You let go of the fleece, untie your men from under the other rams, and drive the flock down to the ship.");
}
}
else if (ovyNear(S.mouth.x, S.mouth.z, 4.5)) {
ovyPut(S.back.x, S.back.z, Math.PI * 0);
ovyTone(120, 0.5);
ovySay("<b>A huge hand gropes along the doorway</b> and sweeps you back into the dark. He is feeling everything that passes. Go out the way a sheep would.");
}
}
},
function (D, L) {
var S = this.spots(), G = this.giant(), me = this, gx = G ? G.position.x : S.cx, gz = G ? G.position.z : S.cz;
if (D.s === 0 && ovyNear(S.mouth.x, S.mouth.z, 7))
return ovyAsk("The great cave", "go in with your men", function () {
ovyPut(S.cx + 3, S.cz + 4, Math.PI);
ovyVeil("You light a fire, eat some of the cheeses, and wait to see who lives here, hoping for a guest's gift.<br><br>At evening he comes: a giant with one eye, driving his flock in. He shuts the door with a stone that twenty-two wagons could not shift.", 5, function () {
if (G) {
G.position.set(S.cx, ovyY(S.cx, S.cz + 9), S.cz + 9);
G.rotation.y = Math.PI;
}
D.door = wMesh(new THREE.DodecahedronGeometry(6.5, 1), new THREE.MeshLambertMaterial({ color: 0x6A6458, flatShading: true }), S.mouth.x, ovyY(S.mouth.x, S.mouth.z) + 4, S.mouth.z + 1.5, OVY.G);
D.door.scale.set(1.2, 0.95, 0.6);
me.walls(D, "shut");
ovyStage(1, [G ? G.position.x : S.cx, G ? G.position.z : S.cz + 9, "Polyphemus"]);
ovySay("<b>Polyphemus</b> stirs up his fire and sees you. <i>\"Strangers! Who are you?\"</i>");
});
});
if (D.s === 1 && G && ovyNear(G.position.x, G.position.z, 10))
return ovyAsk("Polyphemus the Cyclops", "answer him", function () {
ovyChoose("\"What is your name?\"", "He has already eaten two of your men for supper. Now he wants your name.", [
["\"Odysseus of Ithaca, son of Laertes\"", "Your real name", function () { ovyTell("Think like Odysseus", ["Your real name is the one thing you must not give him. Odysseus had a plan that needed a false one. Try again."], function () { }); }],
["\"My name is Nobody\"", "A trick for later", function () { ovySay("<i>\"Then Nobody I shall eat last, as my guest-gift.\"</i> He laughs. Fetch the wine."); ovyStage(2, [S.jar.x, S.jar.z, "Maron's wine"]); D.drinks = 0; }]
]);
});
if (D.s === 2) {
if (!D.bowl && ovyNear(S.jar.x, S.jar.z, 3.2))
return ovyAsk("The goatskin of Maron's wine", "fill the ivy-wood bowl", function () { D.bowl = 1; ovyTone(500, 0.1); ovyGoal(gx, gz, "Polyphemus"); });
if (D.bowl && G && ovyNear(G.position.x, G.position.z, 10))
return ovyAsk("Polyphemus", "offer him the bowl (" + (D.drinks + 1) + " of 3)", function () {
D.bowl = 0;
D.drinks++;
ovyTone(300 + D.drinks * 80, 0.15);
if (D.drinks < 3) {
ovySay(D.drinks === 1 ? "<i>\"More! That is like nectar.\"</i>" : "<i>\"Again! Tell me your name once more, stranger.\"</i> \"Nobody,\" you say.");
ovyGoal(S.jar.x, S.jar.z, "Maron's wine");
}
else {
if (G)
G.userData.pose = "sit";
D.snore = 1;
ovySay("<b>He topples over</b> on his back, his great neck to one side, fast asleep. Now: the stake.");
ovyStage(3, [S.trunk.x, S.trunk.z, "the olive trunk"]);
D.cut = 0;
}
});
}
if (D.s === 3) {
if (!D.cut && ovyNear(S.trunk.x, S.trunk.z, 4))
return ovyAsk("The giant's olive club, green wood as long as a mast", "cut a length of it", function () { D.cut = 1; D.sharp = 0; ovyTone(420, 0.12); });
if (D.cut && D.sharp < 3 && ovyNear(S.trunk.x, S.trunk.z, 4))
return ovyAsk("Your length of olive wood", "sharpen the point (" + (D.sharp + 1) + " of 3)", function () { D.sharp++; ovyTone(460 + D.sharp * 40, 0.1); if (D.sharp >= 3)
ovyGoal(S.fire.x, S.fire.z, "the fire"); });
if (D.sharp >= 3 && ovyNear(S.fire.x, S.fire.z, 3.5))
return ovyAsk("The fire", "harden the point in the embers", function () { ovyTone(300, 0.3); ovySay("<b>The point glows.</b> Four men draw lots to help you lift it."); ovyStage(4, [gx, gz, "the sleeping giant"]); });
if (D.cut && D.sharp < 3)
ovyGoal(S.trunk.x, S.trunk.z, "the olive wood");
}
if (D.s === 4 && G && ovyNear(G.position.x, G.position.z, 10))
return ovyAsk("The sleeping Cyclops", "drive the stake into his one eye", function () {
ovyVeil("He wakes with a roar that shakes the cave. His neighbours come running and shout through the stone door: <i>\"What is the matter, Polyphemus? Is somebody hurting you?\"</i><br><br><i>\"NOBODY is hurting me!\"</i><br><br><i>\"Then if nobody is hurting you, pray to your father Poseidon,\"</i> they say, and go home.", 7, function () {
D.snore = null;
if (G) {
G.userData.pose = "sit";
G.position.set(S.cx, ovyY(S.cx, S.mouth.z - 1.5), S.mouth.z - 1.5);
G.rotation.y = Math.PI;
}
if (D.door) {
D.door.position.x += 11;
}
me.walls(D, true);
D.rams = [0, 1, 2].map(function (i) { var r = ovyBeast("sheep", 1.9, S.cx + (i - 1) * 4, S.cz - 8); return { g: r, leg: 0, wait: 2 + i * 7 }; });
ovyStage(5, [S.mouth.x, S.mouth.z, "the way out"]);
ovySay("<b>Morning.</b> Blind, he rolls the stone aside and sits in the doorway with his arms spread, feeling everything that goes out. His rams are going out to graze…");
});
});
if (D.s === 5 && D.ride)
return false;
if (D.s === 5 && !D.ride) {
for (var i = 0; i < D.rams.length; i++) {
var r = D.rams[i];
if (r.wait <= 0 && r.g && r.g.position.z < S.cz + 9 && ovyNear(r.g.position.x, r.g.position.z, 3.6))
return ovyAsk("The great ram, the best of the flock", "cling on underneath, in its fleece", (function (r) { return function () { D.ride = r; D.felt = 0; ovyTone(520, 0.12); ovySay("You curl up under his belly and grip the thick fleece. He walks on, slowly…"); }; })(r));
}
}
if (D.s === 6 && ovyNear(SEA_BY.cyclops.land.x, SEA_BY.cyclops.land.z, 16))
return ovyAsk("The ship", "push off, and decide what to shout", function () {
ovyChoose("Rowing away", "Polyphemus stands on the shore, blind and furious. Your men beg you to keep quiet.", [
["Keep quiet and row", "Say nothing more", function () { ovyEnd(true, true, "You slipped away in silence, and Poseidon never learned whom to blame."); }],
["Shout: \"It was Odysseus who blinded you!\"", "Your real name, at last", function () { ovyVeil("He hurls a great rock that lands just behind the stern. Then he lifts his hands to the sky: <i>\"Father Poseidon, if I am your son, let Odysseus never reach home; or if he must, let him come late, alone, in a stranger's ship, and find trouble in his house.\"</i><br><br>And Poseidon heard him.", 7, function () { ovyEnd(true, false, "You shouted, as Odysseus did."); }); }]
]);
});
if (D.s >= 1 && D.s <= 5)
return false;
return null;
},
function (D, dt) {
if (D.s === 1 && SEA.aboard) {
ovyStage(2, null);
D.ok = 0;
D.next = 4;
D.win = 0;
SEA.wind = 1e5;
ovyCourse("ithaca");
ovySay("<b>The west wind fills your sail.</b> Nine days and nights to Ithaca. The bag lies under the deck, tied with its silver cord. Hold the sail ropes yourself, and <b>do not fall asleep</b>.");
}
if (D.s !== 2)
return;
if (!SEA.aboard) {
ovySay("Stay aboard: the watch is at the helm.");
return;
}
SEA.wind = Math.max(SEA.wind, 1e5);
if (!SEA.auto)
ovyCourse("ithaca");
var it = SEA_BY.ithaca;
if (D.ok >= 9 || Math.hypot(SEA.sx - it.x, SEA.sz - it.z) < 1500) {
ovyStage(3, null);
ovyDark(0);
SEA.wind = 0;
ovyTell("The fires of Ithaca", ["On the tenth day you see the shore of home, close enough to see men tending fires. You did not sleep, and the bag stays shut.", "<b>Odysseus did sleep</b>, worn out, right here. His crew whispered that the bag was full of gold and silver, opened it, and every storm wind burst out and blew them all the way back to Aeolia."], function () { ovyEnd(true, true, "You kept your watch."); }, "Finish the chapter");
return;
}
if (D.win > 0) {
D.win -= dt;
ovyDark(Math.min(0.75, (2.8 - D.win) / 2.8 * 0.75), "<i>Your eyes are so heavy…</i>");
if (D.win <= 0) {
ovyDark(0);
ovyStage(4, null);
ovyVeil("You sleep.<br><br>The crew whisper: <i>\"Gold and silver, I tell you, a gift from Aeolus, and none of it for us.\"</i> Someone unties the silver cord…<br><br>Every storm wind bursts out at once.", 6, function () {
var a = SEA_BY.aeolia;
SEA.wind = 0;
SEA.auto = null;
SEA.sx = a.dock.x + 120;
SEA.sz = a.dock.z + 260;
SEA.h = Math.PI;
SEA.v = 2;
SEA.storm = 0.9;
ovyTell("Blown back to Aeolia", ["The storm carries you all the way back to the floating island. Aeolus will not help a second time.", "<b>That is exactly what happened to Odysseus.</b> Play it again and see if you can stay awake all nine days."], function () { ovyEnd(true, false, "You slept, as Odysseus did."); }, "Finish the chapter");
});
}
}
else {
D.next -= dt;
if (D.next <= 0) {
D.win = 2.8;
ovyTone(200, 0.2);
}
}
},
function (D) {
var p = SEA_BY.aeolia;
if (D.s === 0 && ovyNear(p.x + 3, p.z + 14, 5))
return ovyAsk("Aeolus, keeper of the winds", "ask him to help you home", function () {
ovyTell("Aeolus' gift", ["He flays an ox, nine years old, and makes a bag of its hide. Into it he ties every blustering wind, shut tight with a shining silver cord, and stows it in your ship.", "Only the gentle west wind is left free, to blow you straight home."], function () { ovyStage(1, [p.land.x, p.land.z, "the landing"]); ovySay("Go back aboard (E at the landing)."); }, "Thank him");
});
if (D.s === 2 && D.win > 0)
return ovyAsk("Your eyes are closing", "stay awake", function () { D.win = 0; D.ok = (D.ok || 0) + 1; D.next = 4 + Math.random() * 4; ovyDark(0); ovyTone(660, 0.08); ovySay("Awake. " + (D.ok) + " of 9."); });
return null;
},
function (D) {
var p = SEA_BY.telepylus, G = OVY.G, rock = new THREE.MeshLambertMaterial({ color: 0x6E685E, flatShading: true });
D.mx = p.x + 520;
[-1, 1].forEach(function (s) { var c = wMesh(new THREE.DodecahedronGeometry(38, 1), rock, D.mx, 10, p.z + s * 100, G); c.scale.set(1, 1.7, 1); c.rotation.y = s; });
D.giants = [-1, 1].map(function (s) { var g = ovyMan("lae_cliff_" + s, { top: 0x6A5A40, topKind: "robe", bottom: 0x5A4A30, hair: 0x3A2A1A, hairStyle: "long", beard: 1, hat: "none" }, D.mx, p.z + s * 100, { species: "giant", scale: 7, face: -Math.PI / 2 }); g.position.y = 60; g.visible = false; return g; });
D.ships = [];
for (var i = 0; i < 11; i++) {
var sh = seaGalley(18, 0x1A1A1E), x = p.x + 400 + (i % 4) * 24, z = p.z - 66 + Math.floor(i / 4) * 44 + (i % 2) * 8;
sh.position.set(x, -0.3, z);
sh.rotation.y = Math.PI / 2 + (i % 3 - 1) * 0.2;
G.add(sh);
D.ships.push({ g: sh, x: x, z: z, sink: 0 });
}
D.rock = { x: p.x + 680, z: p.z };
var rk = wMesh(new THREE.DodecahedronGeometry(6, 0), rock, D.rock.x, 1, D.rock.z, G);
rk.scale.y = 1.4;
D.rocks = [];
SEA.v = Math.min(SEA.v, 4);
SEA.auto = null;
ovyStage(0, null);
ovySay("<b>The Harbour of the Giants.</b> A glorious harbour, ringed by cliffs, its mouth narrow between two headlands. Your eleven other ships are already sailing in.");
ovyChoose("Where do you moor?", "The water inside is perfectly calm. A rock juts up just outside the harbour mouth.", [
["Sail in and moor with the others", "Inside, where it is calm", function () { D.inside = 1; SEA.sx = p.x + 450; SEA.sz = p.z + 6; SEA.h = Math.PI / 2; SEA.v = 0; ovyStage(1, null); D.t = 0; ovySay("You tie up among the others in the still water. Your scouts go up to the city…"); }],
["Tie up to the rock outside", "At the harbour mouth", function () { D.inside = 0; SEA.sx = D.rock.x + 30; SEA.sz = D.rock.z + 10; SEA.h = -Math.PI / 2; SEA.v = 0; ovyStage(1, null); D.t = 0; ovySay("You tie your ship to the rock outside the mouth, a little apart from the rest. Your scouts go up to the city…"); }]
]);
},
function (D, dt) {
var p = SEA_BY.telepylus, me = this;
if (D.s === 1 && D.t > 5) {
D.giants.forEach(function (g) { g.visible = true; });
ovyStage(2, null);
D.throwT = 1;
D.hits = 0;
ovyTone(90, 1);
ovySay("<b>The Laestrygonians!</b> Giants by the thousand line the cliffs, and the boulders begin to fall." + (D.inside ? " Sail for the harbour mouth, east, out to sea!" : ""));
if (D.inside)
ovyGoal(D.mx + 80, p.z, "the harbour mouth");
}
if (D.s !== 2)
return;
D.throwT -= dt;
if (D.throwT <= 0) {
D.throwT = D.inside ? 1.4 : 1.1;
if (D.inside && Math.random() < 0.6)
this.throwAt(D, SEA.sx + (Math.random() - 0.5) * 40 + Math.sin(SEA.h) * SEA.v * 1.5, SEA.sz + (Math.random() - 0.5) * 40 + Math.cos(SEA.h) * SEA.v * 1.5);
else {
var t = D.ships.filter(function (s) { return !s.sink; });
if (t.length) {
var s = t[Math.floor(Math.random() * t.length)];
this.throwAt(D, s.x + (Math.random() - 0.5) * 14, s.z + (Math.random() - 0.5) * 14);
}
}
}
D.rocks = D.rocks.filter(function (r) {
r.u += dt / 2.2;
var u = Math.min(1, r.u);
r.m.position.set(r.fx + (r.tx - r.fx) * u, 64 * (1 - u) + 28 * Math.sin(Math.PI * u), r.fz + (r.tz - r.fz) * u);
r.m.rotation.x += dt * 3;
if (r.u < 1)
return true;
OVY.G.remove(r.m);
ovyTone(80, 0.4);
var ring = wMesh(new THREE.RingGeometry(0.6, 1.4, 24), new THREE.MeshBasicMaterial({ color: 0xF0F4F8, transparent: true, opacity: 0.8, side: THREE.DoubleSide, depthWrite: false }), r.tx, 0.6, r.tz, OVY.G);
ring.rotation.x = -Math.PI / 2;
(D.rings = D.rings || []).push({ m: ring, t: 0 });
D.ships.forEach(function (s) { if (!s.sink && Math.hypot(s.x - r.tx, s.z - r.tz) < 13)
s.sink = 1; });
if (D.inside && Math.hypot(SEA.sx - r.tx, SEA.sz - r.tz) < 10) {
D.hits++;
ovyTone(110, 0.5);
ovySay("<b>A boulder smashes into your ship!</b> (" + D.hits + " of 3)");
if (D.hits >= 3) {
ovyStage(9, null);
ovyVeil("Your ship breaks apart. You and your crew swim, and the rocks keep falling…<br><br>Try again; remember the rock outside the harbour mouth.", 5, function () { var k = D.k; ovyEnd(false); ovyStart(k); });
}
}
return false;
});
(D.rings || []).forEach(function (r) { r.t += dt; r.m.scale.setScalar(1 + r.t * 7); r.m.material.opacity = Math.max(0, 0.8 - r.t * 0.6); });
D.rings = (D.rings || []).filter(function (r) { if (r.t > 1.4) {
OVY.G.remove(r.m);
return false;
} return true; });
D.ships.forEach(function (s) { if (s.sink) {
s.g.position.y -= dt * 1.2;
s.g.rotation.z += dt * 0.15;
} });
if (D.inside && SEA.sx > D.mx + 60) {
ovyStage(3, null);
ovyTell("Out of the harbour", ["You got your ship out, through the falling rocks. Behind you, the harbour is full of wreckage.", "<b>Odysseus never sailed in.</b> He alone tied his ship to the rock outside, and when the giants came he cut the cable with his sword and his men rowed for their lives. Eleven ships were lost; his was the only one left."], function () { ovyEnd(true, false, "You escaped the giants' harbour."); }, "Finish the chapter");
}
if (!D.inside && D.cut && Math.hypot(SEA.sx - D.rock.x, SEA.sz - D.rock.z) > 700) {
ovyStage(3, null);
ovyTell("Away from Telepylus", ["You were wise, as Odysseus was: your ship was outside when the boulders fell. But the other eleven are gone."], function () { ovyEnd(true, false, "Your one ship is safe."); }, "Finish the chapter");
}
},
function (D) { if (D.s === 2 && !D.inside && !D.cut && D.t > 4)
return ovyAsk("The cable to the rock", "cut it with your sword, and row for your lives", function () { D.cut = 1; SEA.h = Math.PI / 2; SEA.v = 8; ovyGoal(D.rock.x + 760, D.rock.z, "the open sea"); ovySay("Cut! Now get clear: 700 m from the rock, any way you like."); }); return null; },
function (why) {
if (OVY.beast)
return;
var A = ovyAeaeaSpots(), r = Math.random(), form = r < 0.65 ? "pig" : r < 0.83 ? "lion" : "wolf", F = OVY_FORMS[form];
var spots = [];
for (var i = 0; i < 5; i++) {
var a = i * 1.256 + 0.4, d = 2.4 + (i % 2) * 1.6;
spots.push({ x: A.sty.x + Math.cos(a) * d, z: A.sty.z + Math.sin(a) * d });
}
OVY.beast = { form: form, t: 240, spots: spots, moly: Math.floor(Math.random() * 5), cool: 0, dug: {}, why: why || "" };
try {
var L = meLook();
L.circe = form;
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
var g = ovyBeast(F.kind, F.s, A.sty.x, A.sty.z, WORLDS.sea.g);
if (g) {
g.visible = false;
OVY.beast.g = g;
}
if (OVY.D && OVY.D.k === "aeaea")
OVY.D.beasted = 1;
worldCard(null);
ovyPut(A.sty.x, A.sty.z, 0);
ovyTone(330, 0.3);
setTimeout(function () { ovyTone(220, 0.5); }, 300);
ovySnout(F.snout);
ovyTell("🐾 You have joined Lady Circe's menagerie!", ["Circe taps you with her wand. <i>\"Off to the sty with the rest of them.\"</i>", F.say, "<b>Three ways back:</b> root about the sty with your nose for the herb moly (pigs are very good at finding roots); or wait until Circe grows bored of you (four minutes); or, if you are the Keeper, simply step out."], null);
},
function (how, quiet) {
var B = OVY.beast;
if (!B)
return;
OVY.beast = null;
try {
var L = meLook();
delete L.circe;
if (typeof publishMyLook === "function")
publishMyLook();
}
catch (e) { }
if (B.g && B.g.parent)
B.g.parent.remove(B.g);
ovySnout(null);
if (quiet || !ovyOn())
return;
var A = ovyAeaeaSpots();
ovyPut(A.sty.x - 9, A.sty.z - 2, ovyFace(A.sty.x - 9, A.sty.z - 2, A.circe.x, A.circe.z));
if (how === "moly")
OVY.moly = true;
ovyTone(523, 0.12);
setTimeout(function () { ovyTone(784, 0.2); }, 140);
ovySay(how === "moly" ? "<b>Moly!</b> The bitter root breaks the spell: you stand up on two legs again, younger and taller than before, as Homer says of Odysseus' men. The moly in your hand will keep you safe from her cups while you stay on Aeaea."
: how === "bored" ? "<b>Circe yawns.</b> <i>\"You're no fun as a pig.\"</i> One touch of her wand and you are yourself again, a little taller, she insists."
: "<b>You step out of the enchantment.</b> (The Keeper's privilege.)");
},
function (e) {
var d = OVY.snout;
if (!e) {
if (d)
d.style.display = "none";
return;
}
if (!d) {
d = document.createElement("div");
d.style.cssText = "position:fixed;left:50%;bottom:calc(14px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:40;font-size:min(22vw,150px);line-height:1;opacity:.55;pointer-events:none;filter:drop-shadow(0 2px 6px rgba(0,0,0,.5))";
document.body.appendChild(d);
OVY.snout = d;
}
d.textContent = e;
d.style.display = "block";
},
function (dt) {
var B = OVY.beast, A = ovyAeaeaSpots(), L = ovyL();
if (!SEA.shore || SEA.shore !== SEA_BY.aeaea) {
ovyBeastOff("", true);
return;
}
B.t -= dt;
B.cool = Math.max(0, B.cool - dt);
if (B.t <= 0) {
ovyBeastOff("bored");
return;
}
if (B.g) {
B.g.visible = false;
}
if (typeof meG !== "undefined" && meG)
meG.visible = false;
OVY.line = "<div>🐾 <b>Circe's menagerie</b> · " + esc(OVY_FORMS[B.form].n) + " · root for moly, or wait " + hxClockOvy(B.t) + " for Circe to tire of you</div>";
},
function (L) {
var B = OVY.beast, A = ovyAeaeaSpots();
if (ovyKeeper()) {
var any = null;
for (var j = 0; j < B.spots.length; j++)
if (ovyNear(B.spots[j].x, B.spots[j].z, 1.8))
any = 1;
if (!any)
return ovyAsk("Keeper", "step out of Circe's enchantment", function () { ovyBeastOff("keeper"); });
}
if (B.cool > 0)
return null;
for (var i = 0; i < B.spots.length; i++) {
var s = B.spots[i];
if (B.dug[i] || !ovyNear(s.x, s.z, 1.8))
continue;
return ovyAsk("A muddy patch", "root about here with your nose", (function (i) {
return function () {
B.dug[i] = 1;
B.cool = 2.5;
ovyTone(180, 0.15);
if (i === B.moly) {
ovyBeastOff("moly");
return;
}
var finds = ["a mouthful of acorns, which Circe throws to all her pigs", "some cornel berries, sour and red", "an old turnip", "a pebble (you are not sure why you ate it)", "a worm, who was not pleased"];
ovySay("<b>Snuffle, snuffle…</b> just " + finds[(i + B.form.length) % finds.length] + ". Try another patch.");
};
})(i));
}
return null;
},
function (L) {
if (SEA.aboard || !OVY.S)
return null;
if (SEA.shore === SEA_BY.aeaea && !OVY.beast) {
var A = ovyAeaeaSpots();
if (ovyNear(A.hermes.x, A.hermes.z, 3.2) && !OVY.moly && !(OVY.D && OVY.D.k === "aeaea"))
return ovyAsk("Hermes, looking like a young man with a golden wand", "take the herb moly he offers", function () { OVY.moly = true; ovyTone(660, 0.12); ovySay("<b>Moly</b>: black root, flower white as milk. <i>\"With this,\"</i> says Hermes, <i>\"her cups can't touch you.\"</i> It works while you stay on Aeaea."); });
if (ovyNear(A.table.x, A.table.z, 2.6))
return ovyAsk("Circe's table: a golden cup of honeyed wine", "accept a cup from Circe", function () {
if (OVY.moly) {
ovySay("<b>You drink.</b> Nothing happens. Circe stares at you, then at the moly in your belt. <i>\"You must be Odysseus. Hermes always said you'd come.\"</i>");
return;
}
ovyBeastOn("cup");
});
}
return null;
},
function (D) { var A = ovyAeaeaSpots(); ovyStage(0, [A.hermes.x, A.hermes.z, "a young man on the path"]); ovySay("<b>Circe's Menagerie.</b> Your scouts went up to the stone house in the glade. Only Eurylochus came back, shaking: the others went in, and now there are new pigs in Circe's sty. Go after them, carefully."); },
function (D) {
if (D.s !== 1 || !D.herbs)
return;
var b = null;
D.herbs.forEach(function (h) { if (!h.g.visible)
return; var d = ovyDist(h.x, h.z); if (!b || d < b.d)
b = { h: h, d: d }; });
if (b && (!D.goal || D.goal.x !== b.h.x || D.goal.z !== b.h.z))
ovyGoal(b.h.x, b.h.z, "a white-flowered herb");
},
function (D, L) {
var A = ovyAeaeaSpots(), me = this;
if (D.s === 0 && ovyNear(A.hermes.x, A.hermes.z, 3.4))
return ovyAsk("A young man with a golden wand", "speak with him", function () {
ovyTell("Hermes", ["<i>\"Where are you going alone, poor man, into these woods? Your friends are penned up in Circe's sty as pigs. Do you mean to set them free? You'll end up there yourself.\"</i>", "<i>\"But I'll keep you safe. The herb that protects you grows right here: moly, the gods call it. Find it: black root, flower white as milk. Then take her cup, and when she lifts her wand, rush at her with your sword.\"</i>"], function () {
var R = wRand(7);
D.herbs = me.herbs.map(function (h, i) {
var a = i * 1.25 + R(), d = 4 + R() * 3, x = A.hermes.x + Math.cos(a) * d, z = A.hermes.z + Math.sin(a) * d, g = new THREE.Group(), y = ovyY(x, z);
wCyl(0.03, 0.03, 0.5, wM(0x4A7A3A), 0, 0.25, 0, g, 5);
for (var f = 0; f < 5; f++) {
var fa = f * 1.256;
wSph(0.07, wM(0xF4F2EC), Math.cos(fa) * 0.09, 0.52, Math.sin(fa) * 0.09, g, 6);
}
wSph(0.05, wM(h[0] === "chamomile" ? 0xE8C83A : 0xF8F8F0), 0, 0.53, 0, g, 6);
for (var l = 0; l < 4; l++) {
var lf = wBox(0.04, 0.22, 0.1, wM(0x4A8A3A), Math.cos(l) * 0.08, 0.12, Math.sin(l) * 0.08, g);
lf.rotation.z = 0.5;
lf.rotation.y = l;
}
g.position.set(x, y, z);
OVY.G.add(g);
return { k: h[0], note: h[1], x: x, z: z, g: g };
});
ovyStage(1, null);
ovySay("Hermes points at the herbs round your feet. Look at each one closely.");
}, "Thank him");
});
if (D.s === 1 && D.herbs) {
for (var i = 0; i < D.herbs.length; i++) {
var h = D.herbs[i];
if (!h.g.visible || !ovyNear(h.x, h.z, 1.9))
continue;
return ovyAsk("A white-flowered herb", "look closely, and pull it up", (function (h) {
return function () {
h.g.visible = false;
ovyTone(400, 0.1);
if (h.k === "moly") {
OVY.moly = true;
ovySay("<b>Moly!</b> The black root comes up at last. Now: Circe's house, and her cup.");
ovyStage(2, [A.table.x, A.table.z, "Circe's table"]);
}
else
ovySay(esc(h.note) + " <b>Not moly.</b> Look for a black root and a milk-white flower.");
};
})(h));
}
}
if (D.s === 2 && ovyNear(A.table.x, A.table.z, 2.6) && OVY.moly)
return ovyAsk("Circe, smiling, holds out a golden cup", "drink it", function () {
ovyChoose("Nothing happens", "You drink it all. Circe taps you with her wand: <i>\"Now off to the sty, and lie with your friends!\"</i> But you are still yourself.", [
["Draw your sword and rush at her", "As Hermes told you", function () { ovyTell("Circe falls back", ["She shrieks, ducks under your sword and clasps your knees. <i>\"Who are you? No man ever drank my potion and stayed himself. You must be Odysseus; Hermes always said you would come.\"</i>", "You make her swear a great oath to do you no harm."], function () { ovyStage(3, [A.sty.x, A.sty.z, "the sty"]); ovySay("Now have her free your men."); }, "Make her swear"); }],
["Run back to the ship", "Get away while you can", function () { ovySay("Hermes said: rush at her. Your crew are still in the sty. Try the cup again."); }]
]);
});
if (D.s === 3 && ovyNear(A.sty.x, A.sty.z, 9))
return ovyAsk("Circe's sty", "have Circe free your crew", function () {
var pigs = SEA.people.filter(function (P) { return P.g && /^circe_pig_/.test(P.g.userData.id || ""); });
D.pigs = pigs;
pigs.forEach(function (P, i) { P.g.visible = false; var m = ovyMan("crew_" + i, OVY_GREEK([0xB8583A, 0x5A7AA8, 0x8A9A4A, 0xA8883A, 0x6A5A8A][i % 5]), P.g.position.x, P.g.position.z, { face: ovyFace(P.g.position.x, P.g.position.z, L.x, L.z) }); });
ovyTone(523, 0.15);
setTimeout(function () { ovyTone(659, 0.15); }, 150);
setTimeout(function () { ovyTone(784, 0.25); }, 300);
ovyTell("Men again", ["Circe walks through the sty, rubbing each pig with a new ointment. The bristles fall away, and your men stand up: younger than before, taller and handsomer, and weeping for joy.", "Even Circe is moved. <i>\"Stay,\"</i> she says, <i>\"eat and drink until you are strong again.\"</i>"], function () { ovyEnd(true, false, "Your crew are men again."); }, "Stay a year (finish the chapter)");
});
return null;
},
function (D) {
var P = this.pit(), t = this.tiresias();
if (t)
t.visible = false;
OVY.mist = 1;
D.order = [];
ovyStage(0, [P.x, P.z, "the pit by the grove"]);
ovySay("<b>Speaking with the Dead.</b> Circe sent you here, to the edge of the world where the sun never shines. Dig the pit beside Persephone's grove, and pour the offerings as she taught you.");
},
function (D) {
var me = this, all = [["milk", "Milk and honey"], ["wine", "Sweet wine"], ["water", "Water"], ["barley", "White barley, sprinkled over it all"]], right = ["milk", "wine", "water", "barley"];
var h = ovyHead("The offerings") + ovyP("Pour them into the pit in the order Circe taught you. " + (D.order.length ? "So far: " + D.order.map(function (k) { return all.filter(function (a) { return a[0] === k; })[0][1].toLowerCase(); }).join(", ") + "." : "")), fns = {};
all.forEach(function (a) {
if (D.order.indexOf(a[0]) >= 0)
return;
h += worldBtn(a[0], a[1], null);
fns[a[0]] = function () {
if (right[D.order.length] !== a[0]) {
D.order = [];
ovyTone(200, 0.2);
worldCard(null);
ovySay("<b>The offering soaks away.</b> Circe said: first milk and honey, then sweet wine, then water, then the white barley. Start again.");
return;
}
D.order.push(a[0]);
ovyTone(400 + D.order.length * 60, 0.1);
if (D.order.length === 4) {
worldCard(null);
me.rise(D);
}
else
me.pour(D);
};
});
worldCard(h, fns);
},
function (D) {
var P = this.pit(), s = this.shades[D.idx % this.shades.length], a = Math.random() * 6.283, d = 24;
var g = ovyMan("shade_" + D.idx, { top: s[2], topKind: s[3] === "f" ? "dress" : "robe", bottom: s[2], skin: 0xD0D8E0, hair: 0xC8CCD0, hairStyle: s[3] === "f" ? "long" : "short", beard: s[0] === "Tiresias" ? 1 : 0, hat: s[0] === "A young bride" ? "hood" : "none", hatColor: 0xF0F0F8 }, P.x + Math.cos(a) * d, P.z + Math.sin(a) * d, { sex: s[3] });
ovyGhostly(g, 0.5);
g.position.y += 0.15;
D.ghosts.push({ g: g, name: s[0], who: s[1], tir: s[0] === "Tiresias", mum: /^Anticleia/.test(s[0]), back: 0 });
D.idx++;
},
function (D, dt) {
var P = this.pit(), me = this;
if (D.s === 1) {
D.next -= dt;
if (D.next <= 0 && D.ghosts.length < 6) {
D.next = 3.5;
this.spawn(D);
}
for (var i = 0; i < D.ghosts.length; i++) {
var G = D.ghosts[i], g = G.g, dx = P.x - g.position.x, dz = P.z - g.position.z, d = Math.hypot(dx, dz);
if (G.back > 0) {
G.back -= dt;
g.position.x -= dx / d * dt * 4;
g.position.z -= dz / d * dt * 4;
}
else if (d > 2.6) {
var st = dt * (G.tir ? 0.8 : 1.05);
g.position.x += dx / d * st;
g.position.z += dz / d * st;
}
else if (G.tir) {
this.prophecy(D);
return;
}
else {
ovyStage(0, [P.x, P.z, "the pit"]);
D.ghosts.forEach(function (x) { OVY.G.remove(x.g); });
D.ghosts = [];
D.order = [];
ovyTone(150, 0.6);
ovySay("<b>The shade of " + esc(G.name) + " drinks first.</b> The rest crowd in, wailing, and the offering is gone. Circe warned you: Tiresias must drink before any other. Pour the offerings again.");
return;
}
g.position.y = ovyY(g.position.x, g.position.z) + 0.15 + Math.sin(D.t * 1.5 + i) * 0.08;
g.rotation.y = Math.atan2(dx, dz);
}
}
},
function (D) {
var me = this;
ovyStage(2, null);
ovyTell("Tiresias speaks", ["He drinks, and knows you. <i>\"Odysseus, you are looking for a sweet way home, but a god will make it bitter: Poseidon has not forgotten his son's eye.\"</i>", "<i>\"You will come to the island where the Sun's cattle graze. Leave them unharmed, and you may all reach Ithaca. Harm them, and your ship and your men are lost; and if you escape, you will come home late, alone, in a stranger's ship, and find trouble in your house.\"</i>", "<i>\"Afterwards, carry an oar inland until you meet people who have never seen the sea, and make your peace with Poseidon. Death will come to you gently, from the sea, when you are old.\"</i>"], function () {
D.ghosts.forEach(function (G) { if (!G.mum && !G.tir)
G.g.visible = false; });
if (!D.ghosts.some(function (G) { return G.mum; })) {
D.idx = 1;
me.spawn(D);
}
var M = D.ghosts.filter(function (G) { return G.mum; })[0];
ovyGoal(M.g.position.x, M.g.position.z, "your mother");
ovySay("Your mother's shade waits, silent, by the pit.");
}, "Go on");
},
function (D, L) {
var P = this.pit(), me = this;
if (D.s === 0 && ovyNear(P.x, P.z, 5))
return ovyAsk("The pit", "pour the offerings", function () { D.order = []; me.pour(D); });
if (D.s === 1) {
var best = null;
D.ghosts.forEach(function (G) { if (G.back > 0)
return; var d = ovyDist(G.g.position.x, G.g.position.z), dp = Math.hypot(G.g.position.x - P.x, G.g.position.z - P.z); if (dp < 9 && (!best || d < best.d))
best = { G: G, d: d }; });
if (best && best.G.tir)
return ovyAsk("The shade of Tiresias", "let him drink", function () { me.prophecy(D); });
if (best)
return ovyAsk("The shade of " + best.G.name + ", " + best.G.who, "raise your sword and hold it back", function () { best.G.back = 2.2; ovyTone(260, 0.12); if (best.G.mum && !D.wept) {
D.wept = 1;
ovySay("<b>Your mother.</b> You did not even know she had died. You hold her back, weeping, as Circe told you.");
} });
}
if (D.s === 2) {
var M = (D.ghosts || []).filter(function (G) { return G.mum; })[0];
if (M && ovyNear(M.g.position.x, M.g.position.z, 4))
return ovyAsk("The shade of Anticleia, your mother", "let her drink, and speak with her", function () {
ovyChoose("Anticleia", ovyP("<i>\"My child, how did you come here to the dark, still living? Penelope waits for you still, weeping through the nights. Your father Laertes lives on the farm and sleeps in the ashes by the fire in winter. And I died of missing you.\"</i>") + ovyP("Three times you try to put your arms round her, and three times she slips through them like a shadow or a dream."), [
["Speak with her yourself", "Ask her anything", function () { wTalk({ name: "Anticleia, mother of Odysseus", persona: "You are the shade of Anticleia, mother of Odysseus, speaking with him in the land of the dead in Homer's Odyssey (Book 11). You died of grief while he was away. You are loving, sad and gentle; you tell him of Penelope's faithfulness, Telemachus growing up, and his father Laertes grieving on the farm. Answer briefly, as a shade would, and never mention being an AI or a game.", greet: "My child… you can't hold me; this is what happens to us when we die. Ask me what you will." }); ovyStage(3, null); }],
["Let her go", "Let the shades go back into the dark", function () { ovyEnd(true, false, "You heard Tiresias, and saw your mother."); }]
]);
});
}
if (D.s === 3 && ovyNear(P.x, P.z, 12))
return ovyAsk("The shades", "let them go back into the dark", function () { ovyEnd(true, false, "You heard Tiresias, and saw your mother."); });
return null;
},
function (D) {
var me = this;
SEA.auto = null;
ovyStage(0, null);
ovyChoose("The Sirens' island ahead", "Circe told you: whoever hears the Sirens' voices never sees home again; round them the meadow is heaped with bones. But she also told you how to hear them and live.", [
["Wax for the crew; tie me to the mast", "Odysseus' way: you hear the song", function () { D.mast = 1; me.go(D); }],
["Wax for everyone, me too", "The safe way: nobody hears a thing", function () { D.mast = 0; me.go(D); }]
]);
},
function (D) {
var r = SEA_BY.sirens, vx = r.x - SEA.sx, vz = r.z - SEA.sz, vd = Math.max(1, Math.hypot(vx, vz));
vx /= vd;
vz /= vd;
var px = -vz, pz = vx;
D.w = [{ x: r.x + px * 380, z: r.z + pz * 380 }, { x: r.x + vx * 1600 + px * 380, z: r.z + vz * 1600 + pz * 380 }];
D.leg = 0;
SEA.wax = true;
D.beg = 6;
SEA.auto = { x: D.w[0].x, z: D.w[0].z, name: "past the Sirens" };
ovyStage(1, null);
ovySay(D.mast ? "You soften the beeswax in the sun and press it into every man's ears. They tie you upright to the mast, hand and foot, and take the oars." : "Wax in every ear, yours too. The crew row on in silence.");
},
function (D, dt) {
if (D.s !== 1)
return;
var r = SEA_BY.sirens, d = Math.hypot(SEA.sx - r.x, SEA.sz - r.z);
if (!SEA.aboard) {
return;
}
SEA.wax = true;
if (!SEA.auto) {
if (D.leg === 0 && Math.hypot(SEA.sx - D.w[0].x, SEA.sz - D.w[0].z) < 80) {
D.leg = 1;
}
var w = D.w[D.leg];
SEA.auto = { x: w.x, z: w.z, name: "past the Sirens" };
if (D.leg === 0 && D.mast)
ovySay("<b>You are tied to the mast.</b> The crew have the helm.");
}
if (D.mast && d < 900) {
D.song = (D.song || 0) - dt;
if (D.song <= 0) {
D.song = 0.45;
var notes = [523, 659, 784, 880, 784, 659, 587, 698];
ovyTone(notes[Math.floor(D.t * 2.2) % notes.length], 0.4);
}
if (!D.heard && d < 850) {
D.heard = 1;
ovySay("<b>The song.</b> <i>\"Come near, Odysseus, glory of the Greeks! Rest your oars and listen. No sailor ever passed us by without hearing our sweet voices, and he goes home knowing more than before: we know everything that happened at Troy, and everything that happens on the wide earth.\"</i>");
}
D.beg -= dt;
}
if (D.leg === 1 && Math.hypot(SEA.sx - r.x, SEA.sz - r.z) > 1400) {
SEA.auto = null;
SEA.wax = false;
ovyStage(2, null);
ovyTell(D.mast ? "The song fades" : "Past the Sirens", D.mast ? ["The singing dies away behind you. The crew take the wax out of their ears and untie you.", D.begs ? "You begged to be untied, just as Odysseus did; Perimedes and Eurylochus only tied you tighter, just as they did for him." : "<b>You never once begged to be untied.</b> Odysseus did: he signalled with his eyebrows, and Perimedes and Eurylochus only tied him tighter."] : ["You never heard a note. Safe, but you will never know what Odysseus heard."], function () { ovyEnd(true, D.mast && !D.begs, ""); }, "Finish the chapter");
}
},
function (D) { var r = SEA_BY.sirens; if (D.s === 1 && D.mast && D.beg < 0 && Math.hypot(SEA.sx - r.x, SEA.sz - r.z) < 900)
return ovyAsk("The song is so sweet", "beg the crew to untie you", function () { D.begs = (D.begs || 0) + 1; D.beg = 7; ovyTone(240, 0.2); ovySay("You strain at the ropes and beg. <b>Perimedes and Eurylochus get up and tie you tighter.</b>"); }); return null; },
function (D) {
var p = SEA_BY.strait, me = this;
SEA.auto = null;
D.from = SEA.sz > p.z ? 1 : -1;
ovyStage(0, null);
ovyChoose("The strait", "Circe's advice: <i>\"Keep close to Scylla's cliff and row past as fast as you can. Better to mourn six men than lose them all. And don't stop to fight her: she is no mortal.\"</i>", [
["Put on your armour, take two spears", "Stand at the bow, ready to fight", function () { D.armed = 1; me.go(D); }],
["Leave the weapons; just row hard", "As Circe advised", function () { D.armed = 0; me.go(D); }]
]);
},
function (D, dt) {
var p = SEA_BY.strait, dx = SEA.sx - p.x, dz = SEA.sz - p.z;
if (!SEA.aboard)
return;
if (D.px != null && Math.hypot(SEA.sx - D.px, SEA.sz - D.pz) > 90)
D.spun = (D.spun || 0) + 1;
D.px = SEA.sx;
D.pz = SEA.sz;
if (D.s === 1 && Math.abs(dx) < 130 && Math.abs(dz) < p.r) {
ovyStage(2, [p.x - 50, p.z - D.from * (p.r + 80), "the far end"]);
}
if (D.s === 2) {
if (!D.took && Math.hypot(SEA.sx - (p.x - 140), SEA.sz - p.z) < 240) {
D.took = 1;
ovyTone(110, 0.8);
ovySay("<b>Scylla!</b> While everyone stares across at Charybdis, six heads swoop down from the cliff and snatch six men from the benches, calling your name." + (D.armed ? " You were standing ready in your armour, and you never even saw her strike." : ""));
}
if (Math.abs(dx) < 300 && dz * D.from < -(p.r + 20)) {
ovyStage(3, null);
var good = !D.armed && !D.spun;
ovyTell("Through the strait", ["You are through. Behind you, Charybdis swallows the sea and spits it out again.", D.armed ? "<b>Odysseus armed himself too</b>, against Circe's advice, and it did no good at all." : "You took Circe's advice and didn't stop to fight. Odysseus put on his armour anyway.", D.spun ? "Charybdis caught you " + D.spun + (D.spun > 1 ? " times" : " time") + "; Odysseus at least kept clear of her, this time." : "You kept clear of Charybdis."], function () { ovyEnd(true, good, ""); }, "Finish the chapter");
}
}
},
function () {
var p = SEA_BY.thrinacia, a0 = Math.atan2(p.land.z - p.z, p.land.x - p.x), out = [];
[-0.35, -0.18, 0.2].forEach(function (da) { var a = a0 + da, r = p.r * 0.6; while (r < p.r * 1.3 && seaHeight(p.x + Math.cos(a) * r, p.z + Math.sin(a) * r) > 2)
r += 4; r -= 6; out.push({ x: p.x + Math.cos(a) * r, z: p.z + Math.sin(a) * r, cool: 0 }); });
return out;
},
function (D) {
var p = SEA_BY.thrinacia;
D.food = 60;
D.week = 0;
D.wt = 0;
D.spots = this.fishSpots();
D.spots.forEach(function (s) { var r = wMesh(new THREE.DodecahedronGeometry(1.1, 0), wM(0x8A8070), s.x, ovyY(s.x, s.z) + 0.3, s.z, OVY.G); r.scale.y = 0.6; });
D.eury = ovyMan("eurylochus", OVY_GREEK(0x7A4A2A), p.land.x + 8, p.land.z - 10, { face: Math.PI });
ovyStage(0, null);
ovySay("<b>The Cattle of the Sun.</b> You meant to sail straight past, but the crew begged to land and sleep ashore. Now the south wind blows and blows, and won't stop. <b>Keep the crew fed by fishing from the rocks, and leave the Sun's cattle alone.</b>");
},
function (D, how) {
ovyStage(9, null);
ovyTone(55, 2.5);
ovyVeil(how + "<br><br>The hides crawl along the ground; the meat lows on the spits. Lampetie runs to tell her father the Sun.<br><br>When at last the wind changes and you sail, a black cloud stands over the ship. Zeus strikes it with a thunderbolt. The mast falls, the crew are thrown into the sea, and only you are left, clinging to the keel and mast, drifting for nine days…", 10, function () {
ovyAshore("ogygia");
ovyEnd(true, false, "You wash up on Calypso's island, alone. (In this dream, the Wayfarer is waiting at Ogygia's landing; Odysseus had no ship at all.)");
});
},
function (D, dt) {
if (D.s !== 0)
return;
var me = this;
D.food -= dt * 1.25;
D.wt += dt;
D.spots.forEach(function (s) { s.cool = Math.max(0, s.cool - dt); });
if (D.food <= 0)
return this.thunder(D, "The crew can bear it no longer. While you sleep, Eurylochus tells them: <i>\"Every death is hateful, but starving is the worst.\"</i> They drive off the best of the cattle.");
if (D.wt > 35) {
D.wt = 0;
D.week++;
if (D.week >= 3) {
ovyStage(1, null);
ovyTell("The wind changes", ["At last the south wind drops. You kept your crew fed, and not one of the Sun's cattle was harmed. You sail with every man alive.", "<b>Odysseus could not do it.</b> Worn out, he went inland to pray and fell asleep; Eurylochus persuaded the starving crew to kill the cattle, and Zeus struck the ship with a thunderbolt. Only Odysseus survived."], function () { ovyEnd(true, true, "Every man alive."); }, "Finish the chapter");
return;
}
ovyChoose("Eurylochus speaks for the crew", "<i>\"Listen to me, friends. Let's drive off the best of the Sun's cattle and offer them to the gods; we'll build the Sun a temple at home to make up for it. Better to die at sea in one gulp than waste away on a desert island.\"</i>", [
["\"No. We fish, and we wait.\"", "Keep your oath", function () { ovySay("The crew grumble, but they go back to their hooks and lines."); }],
["\"Take one heifer, then. Just one.\"", "Let them", function () { me.thunder(D, "They drive off the best of the cattle."); }]
]);
}
},
function (D, L) {
var me = this;
if (D.s !== 0)
return null;
for (var i = 0; i < D.spots.length; i++) {
var s = D.spots[i];
if (ovyNear(s.x, s.z, 3.4)) {
if (s.cool > 0)
return ["<b>Fishing rock</b> · the fish are wary here; wait a moment", null];
return ovyAsk("A fishing rock", "cast a line with a bent hook", (function (s) { return function () { s.cool = 3; if (Math.random() < 0.58) {
D.food = Math.min(100, D.food + 15);
ovyTone(660, 0.1);
ovySay("<b>A fish!</b> The crew cheer. Food: " + Math.round(D.food) + "%");
}
else {
ovyTone(260, 0.1);
ovySay("Nothing. Try again, or try another rock.");
} }; })(s));
}
}
var cw = null;
this.cows().forEach(function (P) { if (!cw && ovyNear(P.g.position.x, P.g.position.z, 3.4))
cw = P; });
if (cw)
return ovyAsk("One of the Sun's broad-browed cattle, sleek and fat", "take it for food", function () { me.thunder(D, "You take one of the Sun's cattle."); });
var ld = SEA_BY.thrinacia.land;
if (ovyNear(ld.x, ld.z, 14))
return ovyAsk("The landing", "try to sail away", function () { ovySay("<b>The south wind blows straight into the harbour</b>, day after day. No ship could leave. Fish, and wait."); });
return null;
},
function (D) {
var p = SEA_BY.ogygia, R = wRand(31), out = [], tries = 0;
while (out.length < 10 && tries++ < 200) {
var a = -0.4 + R() * 2.2, d = p.r * (0.35 + R() * 0.35), x = p.x + Math.cos(a) * d, z = p.z + Math.sin(a) * d;
if (seaHeight(x, z) < 4)
continue;
if (out.some(function (o) { return Math.hypot(o.x - x, o.z - z) < 9; }))
continue;
var g = new THREE.Group(), kind = out.length % 3;
wCyl(0.35, 0.5, 9, wM(0x6A5A44), 0, 4.5, 0, g, 7);
if (kind === 2)
wCone(2.2, 8, wM(0x2A5A3A), 0, 10, 0, g, 8);
else {
var c = wSph(2.6, wM(kind ? 0x6A8A4A : 0x4A7A3A), 0, 9.5, 0, g, 8);
c.scale.y = 1.4;
}
wBox(0.12, 0.5, 0.12, wM(0xC83A3A), 0.5, 2, 0, g);
g.position.set(x, ovyY(x, z), z);
OVY.G.add(g);
out.push({ x: x, z: z, g: g, fall: 0, kind: ["alder", "poplar", "fir"][kind] });
}
return out;
},
function (D, n, into) {
var g = into || D.raft, wood = wM(0x8A6A42), dark = wM(0x5A4028);
if (n === 1)
for (var i = 0; i < 9; i++) {
var l = wCyl(0.3, 0.3, 7, wood, -2.4 + i * 0.6, 0.3, 0, g, 8);
l.rotation.x = Math.PI / 2;
}
if (n === 2) {
wBox(5.6, 0.15, 6.4, wM(0xA88A5A), 0, 0.7, 0, g);
[-1, 1].forEach(function (s) { wBox(0.12, 0.6, 6.4, dark, s * 2.8, 1.05, 0, g); wBox(5.6, 0.6, 0.12, dark, 0, 1.05, s * 3.2, g); });
}
if (n === 3) {
wCyl(0.12, 0.15, 6, dark, 0, 3.7, -0.6, g, 6);
var y = wCyl(0.08, 0.08, 4, dark, 0, 5.8, -0.6, g, 6);
y.rotation.z = Math.PI / 2;
}
if (n === 4) {
var s = wMesh(new THREE.PlaneGeometry(3.8, 3.6), new THREE.MeshLambertMaterial({ color: 0xF0E8D8, side: THREE.DoubleSide }), 0, 4, -0.5, g);
var r = wBox(0.15, 0.15, 3, dark, 0, 0.9, 3.8, g);
r.rotation.x = 0.4;
}
},
function (D) { var p = SEA_BY.ogygia; D.tr = this.trees(D); D.felled = 0; ovyStage(1, null); ovySay("Calypso gives you a great bronze axe with an olive-wood handle, and a polished adze, and leads you to the island's edge where the tall trees grow: alder, poplar and fir, long dead and dry, so they float. Each red thread marks one; fell them (each gives you two logs)."); },
function (D, dt, L) {
var me = this;
if (D.tr)
D.tr.forEach(function (t) { if (t.fall > 0 && t.fall < 1) {
t.fall = Math.min(1, t.fall + dt * 0.8);
t.g.rotation.z = t.fall * 1.45;
if (t.fall >= 1)
t.g.visible = false;
} });
if (D.s === 1 && D.tr) {
var b = null;
D.tr.forEach(function (t) { if (t.fall)
return; var d = ovyDist(t.x, t.z); if (!b || d < b.d)
b = { t: t, d: d }; });
if (b)
ovyGoal(b.t.x, b.t.z, "a marked " + b.t.kind);
}
if (D.s >= 3 && OVY.raft) {
SEA.v = Math.min(SEA.v, D.s === 4 ? 7 : 11);
var s = SEA.ship;
OVY.raft.position.set(SEA.sx, s.position.y + 0.2, SEA.sz);
OVY.raft.rotation.y = SEA.h;
OVY.raft.rotation.z = s.rotation.z * 2;
OVY.raft.rotation.x = s.rotation.x * 2;
s.visible = false;
if (SEA.aboard)
camera.position.set(SEA.base + SEA.sx - Math.sin(SEA.h) * 5, s.position.y + 2.8, SEA.sz - Math.cos(SEA.h) * 5);
}
if (D.s === 4) {
SEA.storm = 1;
D.win = Math.max(0, (D.win || 0) - dt);
D.next -= dt;
if (D.next <= 0 && D.win <= 0) {
D.win = 2.2;
D.next = 3 + Math.random() * 2.5;
ovyTone(90, 0.6);
ovySay("<b>A huge wave!</b> Hold on!");
}
else if (D.win > 0 && D.win - dt <= 0) {
ovySay("The wave sweeps you off the raft; you swim and haul yourself back on. Hold on next time!");
}
}
if (D.s === 5) {
SEA.storm = 1;
if (D.ino) {
D.ino.position.set(SEA.sx + Math.sin(SEA.h) * 9, 0.2 + Math.sin(D.t * 2) * 0.2, SEA.sz + Math.cos(SEA.h) * 9);
D.ino.rotation.y = SEA.h + Math.PI;
}
}
},
function (D) {
var p = SEA_BY.ogygia, me = this;
SEA.sx = p.dock.x;
SEA.sz = p.dock.z + 30;
SEA.h = 0;
seaBoard();
OVY.raft = new THREE.Group();
for (var n = 1; n <= 4; n++)
this.raftPart(D, n, OVY.raft);
SEA.ship.parent.add(OVY.raft);
ovyStage(3, null);
ovyVeil("You sail for seventeen days, steering with the oar, never sleeping, keeping the Great Bear on your left hand as Calypso told you.<br><br>On the eighteenth day the shadowy mountains of the Phaeacians' land rise out of the sea…<br><br>…and Poseidon, coming home from far away, sees you.", 8, function () {
var s = SEA_BY.scheria;
SEA.sx = s.x - 1900;
SEA.sz = s.z + 500;
SEA.h = Math.PI / 2;
SEA.v = 4;
SEA.auto = { x: s.x - 500, z: s.z + 430, name: "the Phaeacians' coast" };
ovyStage(4, null);
D.held = 0;
D.next = 2;
D.win = 0;
ovySay("<b>Poseidon's storm.</b> He gathers the clouds and stirs up the sea with his trident; all the winds at once. Hold on to the raft!");
});
},
function (D, L) {
var p = SEA_BY.ogygia, me = this;
if (D.s === 0 && ovyNear(p.x + 3, p.z - 44, 4))
return ovyAsk("Calypso", "listen to her", function () {
ovyChoose("Calypso's offer", "<i>\"Is it really home you want, Odysseus? Stay with me, and I will make you immortal: never old, never ill, never dying. Is your wife so much more beautiful than I am?\"</i>", [
["Stay with her, and live forever", "Never grow old", function () { ovyVeil("Seven more years go by on Ogygia, as lovely as the first seven and just as long…<br><br>Then Hermes comes skimming over the sea like a gull with a message from Zeus: <i>let him go</i>. Calypso shivers, and lets you go. Homer's Odysseus chose home, every single day.", 7, function () { me.begin2(D); }); }],
["\"Home, and Penelope, and growing old\"", "Odysseus' answer", function () { ovyTell("\"I know,\" says Calypso", ["<i>\"I know she is not as tall or as beautiful as I am. She is mortal. Still, I long for home every day.\"</i> Calypso sighs. Hermes has already told her: Zeus says you must go."], function () { me.begin2(D); }, "Go on"); }]
]);
});
if (D.s === 1) {
for (var i = 0; i < D.tr.length; i++) {
var t = D.tr[i];
if (!t.fall && ovyNear(t.x, t.z, 3.2))
return ovyAsk("A tall dry " + t.kind, "fell it with the bronze axe", (function (t) {
return function () {
t.fall = 0.01;
D.felled++;
ovyTone(300, 0.2);
setTimeout(function () { ovyTone(140, 0.4); }, 700);
if (D.felled >= 10) {
var B = me.raftAt(D);
ovyStage(2, [B.x, B.z, "the raft beach"]);
ovySay("Twenty trees down. Haul the logs to the beach by the landing and build.");
}
};
})(t));
}
}
if (D.s === 2) {
var B = this.raftAt(D);
if (ovyNear(B.x, B.z, 6)) {
var steps = ["Bore the logs and peg them together", "Lay the deck on close-set ribs, and a rail round it", "Step the mast, and fix the yard", "Fit the steering oar; Calypso brings cloth for the sail"];
if (!D.raft) {
D.raft = new THREE.Group();
D.raft.position.set(B.x, ovyY(B.x, B.z), B.z);
OVY.G.add(D.raft);
D.built = 0;
}
if (D.built < 4)
return ovyAsk("Your raft, " + D.built + " of 4 done", steps[D.built].charAt(0).toLowerCase() + steps[D.built].slice(1), function () { D.built++; me.raftPart(D, D.built); ovyTone(400 + D.built * 60, 0.12); if (D.built >= 4)
ovySay("Four days' work, and she is ready, as wide as a good-sized ship's hull. Calypso has filled her with bread, wine and water."); });
return ovyAsk("Your raft, ready", "launch her and sail by the stars", function () { me.launch(D); });
}
}
if (D.s === 4 && D.win > 0)
return ovyAsk("The wave", "hold on to the raft", function () {
D.win = 0;
D.held++;
ovyTone(520, 0.1);
if (D.held >= 5) {
ovyStage(5, null);
D.ino = ovyMan("ino", { top: 0xF4F8FC, topKind: "dress", bottom: 0xF4F8FC, hair: 0x2A4A5A, hairStyle: "long", hat: "none" }, SEA.sx, SEA.sz, { sex: "f" });
ovySay("<b>A sea-goddess rises beside the raft</b> like a seabird: Ino, once a mortal woman. <i>\"Poor man, why does Poseidon hate you so? Take off those heavy clothes, tie my veil round you, and swim for the shore. When you reach it, throw the veil back into the sea.\"</i>");
}
else
ovySay("You cling on. (" + D.held + " of 5)");
});
if (D.s === 5)
return ovyAsk("Ino's veil", "tie it round you", function () {
ovyStage(6, null);
ovyTone(80, 1.2);
ovyVeil("A wave as big as a house breaks over the raft and scatters the logs like chaff in the wind. You climb onto one beam, ride it like a horse, then dive into the sea with Ino's veil round you.<br><br>Two days and two nights you swim. On the third morning you see the land close by, and find the mouth of a gentle river. You throw the veil back into the sea, crawl into a thicket of olives, and sleep.", 10, function () {
me.raftOff();
var s = SEA_BY.scheria;
ovyAshore("scheria", s.x + 66, s.z + 318);
ovyEnd(true, false, "You reached the land of the Phaeacians.");
});
});
return null;
},
function (D) { var S = this.spots(); D.best = 0; D.tries = 0; ovyStage(0, [S.naus.x, S.naus.z, "the girls by the river"]); ovySay("<b>The Phaeacians.</b> Shrieks and laughter wake you: girls playing ball by the river mouth, where the washing is laid out to dry. You have nothing: no ship, no clothes, salt crusted in your hair. Hold a leafy branch in front of you and go and ask for help."); },
function (D, dt) {
var S = this.spots(), me = this;
if (D.s === 3 && D.ph) {
D.osc += dt * (D.ph === "pow" ? 1.7 : 1.3);
var v = (Math.sin(D.osc) + 1) / 2;
if (D.ph === "pow")
D.pw = v;
else
D.an = 10 + v * 60;
OVY.meter = "<div>" + (D.ph === "pow" ? "Power" : "Angle") + ": <span style='font-family:monospace'>" + (D.ph === "pow" ? "█".repeat(Math.round(v * 20)) + "░".repeat(20 - Math.round(v * 20)) : Math.round(D.an) + "°") + "</span> · tap E to set it</div>";
}
else
OVY.meter = "";
if (D.disc) {
var F = D.disc;
F.u += dt / F.T;
var u = Math.min(1, F.u);
F.m.position.set(F.x + F.dx * F.d * u, F.y + F.h * Math.sin(Math.PI * u) + 0.3, F.z + F.dz * F.d * u);
F.m.rotation.y += dt * 12;
if (F.u >= 1) {
D.disc = null;
ovyTone(150, 0.2);
var peg = wCyl(0.05, 0.05, 1, wM(0xC83A3A), F.x + F.dx * F.d, ovyY(F.x + F.dx * F.d, F.z + F.dz * F.d) + 0.5, F.z + F.dz * F.d, OVY.G, 5);
me.after(D, F.d);
}
}
},
function (D, d) {
D.best = Math.max(D.best, d);
var beat = d > 48;
if (beat) {
D.ph = null;
OVY.meter = "";
ovyTell("Past every mark", ["Your discus flies " + d.toFixed(1) + " m, far beyond the Phaeacians' mark at 48 m. Athena, looking like a Phaeacian, pegs it and calls out: <i>\"Even a blind man could find your mark, stranger!\"</i>", "<b>Why the angle matters:</b> with no air, a throw goes furthest at 45°. A real discus is a little wing: the air lifts it, so throwers launch it lower, at about 35 to 40°."], function () { ovyStage(4, [D.demoX, D.demoZ, "Demodocus the bard"]); }, "To the feast");
return;
}
D.tries++;
D.ph = null;
ovySay("<b>" + d.toFixed(1) + " m.</b> Short of the Phaeacians' 48 m mark. " + (D.lastAn < 30 ? "Too flat: give it more angle." : D.lastAn > 50 ? "Too high: it climbs and drops. Try about 35 to 40°." : "More power!") + " Throw again.");
},
function (D, L) {
var S = this.spots(), me = this;
D.demoX = S.demo.x;
D.demoZ = S.demo.z;
if (D.s === 0 && ovyNear(S.naus.x, S.naus.z, 6))
return ovyAsk("Nausicaa, the princess", "ask her for help", function () {
ovyChoose("How do you ask?", "The maids have all run off screaming. Only the princess stands her ground, waiting.", [
["Run up and clasp her knees", "The way a beggar pleads", function () { ovySay("She backs away, alarmed. A dripping wild man rushing at her is no way to begin. Odysseus thought better of it. Try again."); }],
["Stay back, and speak gently", "Words, from a respectful distance", function () { ovyTell("Nausicaa", ["<i>\"Are you a goddess or a mortal, lady? I have never seen anyone like you…\"</i> you begin, and she smiles.", "She gives you clothes and oil from the wagon. <i>\"Follow our wagon as far as the town's edge, then come on alone. In the palace, don't kneel to my father: go straight to my mother, Queen Arete, at the hearth. If she likes you, you will get home.\"</i>"], function () { ovyStage(1, [S.door.x, S.door.z, "the palace of Alcinous"]); }, "Go to the palace"); }]
]);
});
if (D.s === 1 && ovyNear(S.door.x, S.door.z, 9)) {
if (!D.arete) {
D.arete = ovyMan("arete", { top: 0x3A6A8A, topKind: "dress", bottom: 0x3A6A8A, hair: 0x5A3A2A, hairStyle: "long", hat: "crown", hatColor: 0xE8C040, layer: "cloak", layerColor: 0x2A4A6A }, S.arete.x, S.arete.z, { sex: "f", face: 0 });
}
ovyStage(2, [S.arete.x, S.arete.z, "Queen Arete"]);
}
if (D.s === 2 && D.arete && ovyNear(S.arete.x, S.arete.z, 3.6))
return ovyAsk("Queen Arete", "kneel and clasp her knees", function () {
ovyTell("Queen Arete", ["The hall falls silent. <i>\"Queen, I come to you a wretched stranger. Help me get home.\"</i> Then you sit down in the ashes of the hearth.", "Old Echeneus speaks up: a guest should not sit in the ashes. King Alcinous raises you to a silver chair, and promises a ship.", "Tomorrow there are games in your honour."], function () { var T = S.throwAt; ovyStage(3, [T.x, T.z, "the games ground"]); }, "Go to the games");
});
if (D.s === 3) {
var T = S.throwAt;
if (ovyNear(T.x, T.z, 4)) {
if (!D.ph && !D.disc)
return ovyAsk("A heavy stone discus", "step up and throw it", function () { D.ph = "pow"; D.osc = -Math.PI / 2; ovyTone(500, 0.08); });
if (D.ph === "pow")
return ovyAsk("Power", "set it now", function () { D.ph = "ang"; D.osc = -Math.PI / 2; ovyTone(560, 0.08); });
if (D.ph === "ang")
return ovyAsk("Angle: " + Math.round(D.an) + "°", "let it fly", function () {
D.ph = null;
D.lastAn = D.an;
var v = 17 + D.pw * 10, th = D.an * Math.PI / 180, d = v * v * Math.sin(2 * th) / 9.81 * 0.82 * (1 + 0.12 * Math.exp(-Math.pow((D.an - 36) / 9, 2)));
var a = T.dir || 0, m = wCyl(0.32, 0.32, 0.08, wM(0x8A8478), T.x, ovyY(T.x, T.z) + 1.6, T.z, OVY.G, 14);
D.disc = { m: m, x: T.x, y: ovyY(T.x, T.z) + 1.6, z: T.z, dx: Math.sin(a), dz: Math.cos(a), d: d, h: d * Math.tan(th) / 4, T: Math.max(1.2, d / 22), u: 0 };
ovyTone(700, 0.1);
});
}
}
if (D.s === 4 && ovyNear(S.demo.x, S.demo.z, 5))
return ovyAsk("Demodocus, the blind bard", "ask him to sing of the wooden horse", function () {
ovyChoose("The song of the horse", "He sings of the horse that Epeius built, and of the Greeks hidden inside it, and of Odysseus going to Deiphobus' house like the god of war. You pull your cloak over your face to hide your tears, but King Alcinous sees. <i>\"Stranger, why do you weep? Tell us your name.\"</i>", [
["Keep your name secret", "\"I am only a traveller\"", function () { ovySay("The king waits, kindly. The Phaeacians have promised you a ship; they deserve the truth. Ask Demodocus again when you are ready."); }],
["\"I am Odysseus, son of Laertes\"", "And tell them the whole story", function () { me.story(D, 0); }]
]);
});
if (D.s === 5 && ovyNear(S.p.land.x, S.p.land.z, 14))
return ovyAsk("The Phaeacians' ship, which needs no helmsman", "lie down on deck and sleep", function () {
ovyVeil("You lie down on rugs spread on the deck, and sleep falls on you, sweet and deep, almost like death. The ship runs on through the night faster than a falcon, and lands at dawn in a harbour on Ithaca.<br><br>The Phaeacians lift you ashore, still asleep, with all their gifts, and sail away.", 9, function () { ovyAshore("ithaca"); ovyEnd(true, D.best >= 58, "Home, at last, though you don't know it yet."); });
});
return null;
},
function (D, i) {
var me = this, Q = [["What name did you give the Cyclops?", "Nobody", "Odysseus", "Polyphemus"], ["What did Hermes give you on Aeaea?", "The herb moly", "A bag of winds", "A silver bowl"], ["Which shade had to drink first at the edge of the world?", "Tiresias, the prophet", "Your mother", "Achilles"]];
if (i >= Q.length) {
ovyTell("The whole hall is spellbound", ["You tell them everything, from Troy to Calypso's island, until late into the night. Nobody moves.", "King Alcinous says: <i>\"You will go home tomorrow, with gifts from every one of us.\"</i>"], function () { ovyStage(5, [SEA_BY.scheria.land.x, SEA_BY.scheria.land.z, "the harbour"]); }, "To the ship");
return;
}
var q = Q[i], o = [q[1], q[2], q[3]], r = i % 3;
o = [o[r], o[(r + 1) % 3], o[(r + 2) % 3]];
ovyChoose("Your story, " + (i + 1) + " of 3", esc(q[0]), o.map(function (a) { return [esc(a), null, function () { if (a === q[1]) {
ovyTone(600, 0.1);
me.story(D, i + 1);
}
else {
ovySay("Hmm, that's not how it went. Think back over the voyage.");
me.story(D, i);
} }]; }));
},
function () {
var p = SEA_BY.ithaca, H = this.hall() || { x: p.x + 80, z: p.z - 20, y: 0 }, E = OVY.S && OVY.S.eumaeus || { x: p.x - 110, z: p.z + 60 };
return { p: p, H: H, eum: E, athena: { x: p.land.x + 10, z: p.land.z - 16 }, argos: { x: p.x + 8, z: p.z - 30 }, door: { x: H.x, z: H.z + 8.5 }, wash: { x: H.x - 2, z: H.z + 3 }, peg: { x: H.x - 11, z: H.z + 2 }, stone: { x: H.x - 8, z: H.z - 2.5 }, pen: { x: p.x + 4, z: p.z - 44 } };
},
function (D) {
var S = this.spots();
D.ath = ovyMan("athena_shepherd", { top: 0xE8E0C8, topKind: "robe", bottom: 0xE8E0C8, hair: 0xC8A060, hairStyle: "short", hat: "none", layer: "cloak", layerColor: 0x8A9AA8 }, S.athena.x, S.athena.z, { face: Math.PI });
ovyStage(0, [S.athena.x, S.athena.z, "a young shepherd"]);
ovySay("<b>Homecoming.</b> You wake on a beach in a mist and don't know where you are. A young shepherd is coming down the path.");
},
function (D) { return ["speak with the shepherd", "find Eumaeus the swineherd", "make yourself known to your son", "go up to the palace", "let Eurycleia wash your feet", "ask to try the bow", "string the bow: " + (D.pulls || 0) + " of 6", "shoot through the twelve axes" + (D.lined != null ? ": " + D.lined + " of 12 lined up" : ""), "", "go to Penelope"][D.s] || ""; },
function (D, dt, L) {
var S = this.spots(), me = this;
if (D.s === 6 && D.pulls > 0) {
D.pt -= dt;
if (D.pt <= 0) {
D.pulls = 0;
ovySay("<b>The bow springs back straight.</b> Bend it faster: six pulls without stopping.");
}
}
if (D.s === 7) {
var on = ovyNear(S.stone.x, S.stone.z, 1.4);
D.lined = on ? this.aim() : null;
if (on && !D.arrow) {
var k = Math.min(1, dt * 4);
camera.position.x += (SEA.base + S.stone.x - camera.position.x) * k;
camera.position.z += (S.stone.z - camera.position.z) * k;
}
if (on && D.lined < 12) {
var want = -Math.PI / 2, dy = ((want - yaw + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
var cy = camera.position.y - (S.H.y + 1.72), dp = -Math.atan2(cy, 8) - pitch;
if (Math.abs(dy) < 0.06 && Math.abs(dp) < 0.06) {
yaw += dy * Math.min(1, dt * 2.5);
pitch += dp * Math.min(1, dt * 2.5);
}
}
}
if (D.arrow) {
var A = D.arrow;
A.u += dt / 0.7;
A.m.position.x = A.x0 + (A.x1 - A.x0) * Math.min(1, A.u);
if (A.u >= 1) {
D.arrow = null;
me.landed(D, A.hit);
}
}
},
function (D, hit) {
var me = this;
if (!hit) {
ovyTone(200, 0.2);
ovySay("<b>Clang!</b> The arrow glances off an axe head. The suitors jeer. Stand on the stone, line up all twelve rings, and shoot again.");
return;
}
ovyTone(784, 0.15);
setTimeout(function () { ovyTone(988, 0.3); }, 160);
ovyStage(8, null);
ovyVeil("The arrow flies through the rings of all twelve axes and never touches one.<br><br>Then you strip off your rags and leap onto the great threshold with the bow and the quiver. <i>\"That contest is over. Now for another mark, one no man has hit yet.\"</i><br><br>With Telemachus, Eumaeus and the cowherd Philoetius beside you, and Athena watching over you, you win back your hall. (In Homer, Book 22, it is a fierce and bloody fight.) The suitors are gone.", 11, function () {
(D.suitors || []).forEach(function (g) { g.visible = false; });
var S = me.spots();
ovyStage(9, [S.pen.x, S.pen.z, "Penelope"]);
ovySay("Old Eurycleia runs upstairs to wake Penelope: <i>\"He's here! Odysseus is home!\"</i> But Penelope will not believe it so easily.");
});
},
function (D, L) {
var S = this.spots(), me = this, H = S.H;
if (D.s === 0 && ovyNear(S.athena.x, S.athena.z, 4))
return ovyAsk("A young shepherd", "ask where you are", function () {
ovyTell("Athena", ["<i>\"You must be a fool, stranger, or come from very far away. This is Ithaca.\"</i> You spin a long false story about who you are. The shepherd laughs, and turns into a tall, beautiful woman: Athena.", "<i>\"Still the same: you can't stop telling clever lies, even to me. Listen: a hundred and more suitors are eating up your house and courting your wife. No one must know you yet.\"</i>", "She touches you with her wand. Your skin wrinkles, your hair is gone, your eyes grow dim; you are dressed in a filthy old cloak with a beggar's bag. <i>\"Go to your swineherd, Eumaeus. He is loyal.\"</i>"], function () { D.ath.visible = false; ovyStage(1, [S.eum.x, S.eum.z, "the swineherd's hut"]); }, "Go");
});
if (D.s === 1 && ovyNear(S.eum.x, S.eum.z, 6))
return ovyAsk("Eumaeus the swineherd", "ask him for shelter", function () {
ovyTell("Eumaeus", ["His dogs rush at you barking; he runs out and drives them off with stones. <i>\"Come in, old man. Strangers and beggars come from Zeus, and a small gift is still a gift.\"</i>", "He roasts two piglets for you, and talks all evening about his master, who must be dead by now. He does not know he is talking to him."], function () {
D.tel = ovyMan("telemachus_home", OVY_GREEK(0xB8583A), S.eum.x + 3, S.eum.z + 3, { face: 0 });
ovyStage(2, [S.eum.x + 3, S.eum.z + 3, "Telemachus"]);
ovySay("Next morning the dogs don't bark: they fawn. Telemachus is back from Sparta, and Eumaeus has gone to tell Penelope.");
}, "Sleep here");
});
if (D.s === 2 && D.tel && ovyNear(S.eum.x + 3, S.eum.z + 3, 4))
return ovyAsk("Telemachus, your son", "tell him who you are", function () {
ovyTell("Father and son", ["Athena gives you back your own shape for a moment. Telemachus thinks you are a god. <i>\"No god,\"</i> you say. <i>\"I am your father.\"</i>", "You hold each other and weep, loud as sea eagles whose nest has been robbed. Then you plan: you will go up to the palace as the beggar, and Telemachus will hide the weapons from the hall."], function () { D.tel.visible = false; ovyStage(3, [S.argos.x, S.argos.z, "the palace gate"]); }, "Up to the palace");
});
if (D.s === 3 && ovyNear(S.argos.x, S.argos.z, 4))
return ovyAsk("Old Argos, lying by the gate", "look at him", function () {
ovyTell("Argos", ["Lying on the dung heap by the gate, old and full of fleas, is the dog you raised as a puppy before you sailed for Troy.", "He knows you at once, after twenty years. He wags his tail and drops his ears, but he has no strength to come to you. You wipe away a tear so that Eumaeus won't see.", "And Argos, having seen his master again, lets go of his life."], function () { me.party(D); ovyStage(4, [S.wash.x, S.wash.z, "your hall"]); ovySay("Into your own hall, as a beggar. The suitors are feasting. One of them, Antinous, throws a footstool at you."); }, "Into the hall");
});
if (D.s === 4 && ovyNear(S.wash.x, S.wash.z, 3.2))
return ovyAsk("Old Eurycleia, your nurse", "let her wash your feet", function () {
ovyChoose("The scar", "Eurycleia's old hands find the long scar above your knee, where a boar's tusk ripped you when you were a boy hunting on Parnassus. She drops your foot in the basin with a clatter and looks up at you, her eyes full of tears. She opens her mouth to cry out to Penelope.", [
["Let her cry out", "Everyone will know you're home", function () { ovySay("If she cries out now, the suitors will know, and there are a hundred of them. Odysseus stopped her. Try again."); }],
["Hush her: \"Not a word, nurse\"", "Not yet", function () { ovyStage(5, [S.peg.x, S.peg.z, "the great bow"]); ovySay("She keeps your secret. Now Penelope brings out your great bow and twelve axes: whoever strings it and shoots through the axes will marry her. Every suitor tries the bow, and none can even bend it."); }]
]);
});
if (D.s === 5 && ovyNear(S.peg.x, S.peg.z, 2.8))
return ovyAsk("Odysseus' great bow, the gift of Iphitus", "ask to try it", function () { ovyStage(6, null); D.pulls = 0; D.pt = 0; ovySay("<i>\"You, a beggar?\"</i> laughs Antinous. But Telemachus says the bow is his to give. Eumaeus puts it in your hands. String it: <b>six pulls, quickly</b>."); });
if (D.s === 6)
return ovyAsk("The great bow", "bend it and pull the string up (" + (D.pulls + 1) + " of 6)", function () {
D.pulls++;
D.pt = 1.1;
ovyTone(300 + D.pulls * 50, 0.08);
if (D.pulls >= 6) {
ovyStage(7, [S.stone.x, S.stone.z, "the shooting stone"]);
D.shots = 0;
ovyTone(1046, 0.4);
ovySay("<b>Strung,</b> as easily as a bard strings a lyre. You pluck the string and it sings like a swallow. Thunder rolls; the suitors go pale. Now: stand on the stone at the end of the line of axes, and shoot through every ring.");
}
});
if (D.s === 7 && !D.arrow && ovyNear(S.stone.x, S.stone.z, 1.4))
return ovyAsk("The twelve axes (" + (D.lined || 0) + " of 12 rings lined up)", "shoot", function () {
D.shots++;
var hit = me.aim() >= 12, R = me.rings();
var m = wCyl(0.02, 0.02, 0.9, wM(0x8A6A42), 0, 0, 0, OVY.G, 4);
m.rotation.z = Math.PI / 2;
m.position.set(H.x - 7, H.y + 1.72, H.z - 2.5);
D.arrow = { m: m, x0: H.x - 7, x1: hit ? H.x + 11.5 : H.x - 1 + Math.min(11, Math.floor(Math.random() * 5)), u: 0, hit: hit };
ovyTone(900, 0.06);
});
if (D.s === 7 && !ovyNear(S.stone.x, S.stone.z, 1.4))
return false;
if (D.s === 9 && ovyNear(S.pen.x, S.pen.z, 4))
return ovyAsk("Penelope", "go to her", function () {
ovyChoose("Penelope's test", "She sits across the hearth from you and looks at you a long time. <i>\"If you really are Odysseus, we have signs that only we two know.\"</i> Then she says to the maid: <i>\"Eurycleia, move our great bed out of the bedroom for him, and make it up with fleeces.\"</i>", [
["\"Thank you. That will do nicely.\"", "Accept the bed", function () { ovySay("Penelope turns away, cold. Think: could anyone move that bed? Try again."); }],
["\"Who moved my bed?\"", "\"I built it round a living olive tree!\"", function () { ovyTell("The secret of the bed", ["<i>\"Who moved my bed? No one could, unless a god did it! There was an olive tree growing in the courtyard, thick as a pillar. I built the bedroom round it, cut the trunk off, and made the bedpost of it, inlaid with gold, silver and ivory.\"</i>", "Penelope's knees give way. She runs to you, throws her arms round your neck and kisses you. <i>\"Don't be angry. I was so afraid someone would come and trick me.\"</i>", "Athena holds back the dawn, to make that night last longer."], function () { ovyEnd(true, D.shots === 1, "Home."); }, "Home"); }]
]);
});
return null;
},
function (D) {
var S = this.spots(), H = S.H;
if (!this.hall())
return;
D.suitors = [];
for (var i = 0; i < 8; i++) {
var side = i % 2 ? 1 : -1, x = H.x - 5 + Math.floor(i / 2) * 3.4, z = H.z + side * 5.4;
var g = ovyMan("suitor_" + i, { top: [0x8A2A5A, 0x2A6A8A, 0x6A8A2A, 0xA86A2A][i % 4], topKind: "robe", bottom: 0xE8E0D0, hair: [0x2A1A0E, 0x6A4A2A, 0xC8902A][i % 3], hairStyle: i % 2 ? "short" : "long", hat: "none" }, x, z, { face: side > 0 ? Math.PI : 0 });
g.userData.pose = "sit";
D.suitors.push(g);
}
D.eury = ovyMan("eurycleia", { top: 0x6A6A5A, topKind: "dress", bottom: 0x6A6A5A, hair: 0xE8E8E8, hairStyle: "bun", hat: "none" }, S.wash.x + 1, S.wash.z + 0.6, { sex: "f", face: Math.PI });
D.suitors.push(D.eury);
},
function (D) {
var S = this.spots();
D.men = ovyMan("mentor", { top: 0x8A8A7A, topKind: "robe", bottom: 0x8A8A7A, hair: 0xD8D8D8, hairStyle: "short", beard: 1, hat: "none", layer: "cloak", layerColor: 0x5A6A7A }, S.mentor.x, S.mentor.z, { face: -Math.PI / 2 });
ovyStage(0, [S.mentor.x, S.mentor.z, "Mentor"]);
ovySay("<b>Telemachus at Pylos.</b> You are Telemachus, son of Odysseus, twenty years old. Your father has been gone all your life. You have slipped away from Ithaca by night to look for news of him, with old Mentor beside you.");
},
function (D, L) {
var S = this.spots();
if (D.s === 0 && ovyNear(S.mentor.x, S.mentor.z, 3.6))
return ovyAsk("Mentor", "tell him you are afraid to speak to a king", function () {
ovyTell("Mentor", ["<i>\"Mentor, how can I go up and greet him? I've no practice at clever speaking, and a young man is shy of questioning an old one.\"</i>", "<i>\"Telemachus, some of the words you'll think of yourself, and some a god will give you.\"</i> He says it kindly, and strides ahead up the sand. (He is really Athena in disguise; you don't know that yet.)"], function () { ovyStage(1, [S.altar.x, S.altar.z, "the sacrifice on the shore"]); }, "Follow him");
});
if (D.s === 1 && D.cup) {
ovyStage(2, [S.nestor.x, S.nestor.z, "Nestor"]);
}
if (D.s === 1 && !D.cup && ovyNear(S.altar.x, S.altar.z, 15))
return ovyAsk("Nestor's people at their feast, nine companies on their benches", "join them", function () {
ovyChoose("The golden cup", "Nestor's son Peisistratus runs to meet you, sits you on soft fleeces on the sand, and fills a golden cup with wine. Before anyone drinks, an offering must be poured to Poseidon. To whom should he hand the cup first?", [
["To you: you are a king's son", "Take it", function () { D.slip = 1; ovySay("Peisistratus smiles and hands it to Mentor instead: the elder guest comes first. Mentor (Athena) is pleased by his good manners."); D.cup = 1; }],
["To Mentor, the elder", "Let him pour first", function () { D.cup = 1; ovySay("Right: the elder guest first. Mentor pours the offering and prays to Poseidon, then passes the cup to you. Athena, Homer says, was delighted with the young man's good sense."); }]
]);
});
if (D.s === 2 && ovyNear(S.nestor.x, S.nestor.z, 4))
return ovyAsk("Nestor, the old king", "ask him about your father", function () {
ovyTell("Nestor", ["<i>\"Now that our guests have eaten, it's time to ask who they are.\"</i> You tell him. He looks at you a long time: <i>\"You speak just like him. I would never have believed a young man could talk so like Odysseus.\"</i>", "He tells how the Greeks quarrelled after Troy and sailed home in two groups; how he got home quickly, and how Agamemnon was killed when he reached home. <i>\"But of your father I have heard nothing.\"</i>", "<i>\"Go to Menelaus in Sparta. He came home last of all, from far away. My son will drive you there.\"</i>"], function () { var C = S.chariot; ovyStage(3, [C.x, C.z, "the chariot"]); }, "To the chariot");
});
if (D.s === 3 && ovyNear(S.chariot.x, S.chariot.z, 4))
return ovyAsk("Nestor's chariot, with two fast horses", "climb up beside Peisistratus and drive to Sparta", function () {
ovyVeil("Peisistratus touches the horses with the whip and they fly across the plain. All day they shake the yoke; you spend the night at Pherae, and the next evening you come down into the hollow of Lacedaemon.<br><br>(In this dream Lacedaemon lies across the water, so the drive takes no time at all.)", 8, function () { ovyAshore("sparta"); ovyEnd(true, !D.slip, "You reached Sparta."); });
});
return null;
},
function (D) {
var S = this.spots();
D.et = ovyMan("eteoneus", OVY_GREEK(0x5A6A4A), S.door.x + 1.5, S.door.z + 1, { face: 0 });
ovyStage(0, [S.door.x, S.door.z, "the golden doors"]);
ovySay("<b>The Hall of Menelaus.</b> You are still Telemachus. Peisistratus pulls up the horses at the gate of Menelaus' palace in the evening. There is a double wedding going on inside, and music.");
},
function (D, L) {
var S = this.spots();
if (D.s === 0 && ovyNear(S.door.x, S.door.z, 4))
return ovyAsk("Eteoneus, the king's squire", "wait while he asks the king", function () {
ovyTell("At the gate", ["Eteoneus runs in: <i>\"There are two strangers at the gate, my lord. Shall we unhitch their horses, or send them on to someone else?\"</i>", "Menelaus is furious: <i>\"You were never a fool before! We ate many a meal in other men's houses on our way home. Bring them in to the feast!\"</i>", "Maids bathe you, rub you with oil and dress you in fine cloaks. You stare at the hall: bronze, gold, amber, silver and ivory, gleaming like the sun or the moon. <i>\"Zeus' own hall must look like this,\"</i> you whisper to Peisistratus."], function () { D.et.visible = false; ovyStage(1, [S.helen.x, S.helen.z, "Helen"]); }, "Go in");
});
if (D.s === 1 && ovyNear(S.helen.x, S.helen.z, 4))
return ovyAsk("Helen, coming down from her fragrant room", "greet her", function () {
ovyTell("Helen", ["She comes down like a goddess, with her golden distaff and violet wool and her silver work-basket on wheels. She looks at you and stops.", "<i>\"Menelaus, shall I say it? I've never seen anyone so like another person as this young man is like Odysseus. It must be Telemachus.\"</i>", "Peisistratus answers: <i>\"It is. He is shy of speaking first in front of you.\"</i>"], function () { ovyStage(2, [S.men.x, S.men.z, "Menelaus"]); }, "Go on");
});
if (D.s === 2 && ovyNear(S.men.x, S.men.z, 4))
return ovyAsk("Menelaus, king of Sparta", "speak with him", function () {
ovyChoose("A gift for a guest", "Menelaus tells you what the Old Man of the Sea told him: your father is alive, held on an island by the nymph Calypso, with no ship and no crew.<br><br><i>\"Stay with me eleven or twelve days, and I'll send you home with a splendid gift: three horses and a fine chariot.\"</i>", [
["\"Thank you! Three horses!\"", "Accept them", function () { D.slip = 1; ovySay("Think of Ithaca: rocky, all goat-pasture, no wide meadows or racecourses. What would you do with horses? Telemachus said so, politely. Try again."); }],
["\"Ithaca has no meadows for horses…\"", "Ask kindly for something else", function () { ovyTell("Menelaus laughs", ["<i>\"Ithaca is goat country, my lord, rocky; there's no room for horses there. Keep them for your own fine plains of clover and wheat.\"</i>", "Menelaus laughs and pats your hand. <i>\"You come of good blood, dear boy, to speak like that. I'll change the gift: a mixing bowl of solid silver with a rim of gold, the work of Hephaestus himself.\"</i>", "(Want to hear how Menelaus caught the Old Man of the Sea? Play chapter 16, on Pharos.)"], function () { ovyEnd(true, !D.slip, "Your father is alive."); }, "Finish the chapter"); }]
]);
});
return null;
},
function (D, k) {
if (D.fg) {
OVY.G.remove(D.fg);
D.fg = null;
}
var S = this.spots(), x = S.couch.x, z = S.couch.z, g = null;
if (k === "man") {
g = D.man;
g.visible = true;
return;
}
if (D.man)
D.man.visible = false;
if (k === "water") {
g = new THREE.Group();
var w = wSph(1.4, new THREE.MeshPhongMaterial({ color: 0x4A98C8, transparent: true, opacity: 0.7, shininess: 90 }), 0, 1, 0, g, 14);
w.scale.set(1.3, 0.8, 1.3);
ovyAt(g, x, z);
OVY.G.add(g);
}
else if (k === "tree") {
g = new THREE.Group();
wCyl(0.35, 0.5, 5, wM(0x6A5A44), 0, 2.5, 0, g, 7);
var c = wSph(2.6, wM(0x4A8A3A), 0, 6, 0, g, 9);
c.scale.y = 1.3;
ovyAt(g, x, z);
OVY.G.add(g);
}
else {
g = ovyBeast(k === "leopard" ? "lion" : k, k === "snake" ? 1.6 : 1, x, z);
if (g && k === "leopard")
g.traverse(function (m) { if (m.material && m.material.color) {
m.material = m.material.clone();
m.material.color.lerp(new THREE.Color(0xE0B048), 0.6);
} });
}
D.fg = g;
},
function (D) {
var S = this.spots(), P = this.proteus();
if (P)
P.visible = false;
ovyStage(0, [S.eid.x, S.eid.z, "a sea-nymph"]);
ovySay("<b>The Old Man of the Sea.</b> You are Menelaus, king of Sparta, on your way home from Troy. For twenty days the gods have kept you on this island off Egypt, without a breath of wind. Your men are fishing with bent hooks, starving. A sea-nymph is watching you from the shore.");
},
function (D, dt) {
var S = this.spots(), me = this;
if (D.s === 2) {
if (OVY.lock)
camera.position.x = SEA.base + OVY.lock.x, camera.position.z = OVY.lock.z;
var u = Math.min(1, D.t / 12);
if (D.man) {
D.man.position.set(S.sea.x + (S.couch.x - S.sea.x) * u, ovyY(S.sea.x + (S.couch.x - S.sea.x) * u, S.sea.z + (S.couch.z - S.sea.z) * u), S.sea.z + (S.couch.z - S.sea.z) * u);
D.man.rotation.y = ovyFace(S.sea.x, S.sea.z, S.couch.x, S.couch.z);
}
if (D.t > 4 && !D.c1) {
D.c1 = 1;
ovySay("Noon. The seals come up out of the sea and flop down in rows along the sand. Then the Old Man comes, walks along the rows and counts them…");
}
if (D.t > 9 && !D.c2) {
D.c2 = 1;
ovySay("…counting you among the seals, without a thought of a trick.");
}
if (D.t > 12) {
if (D.man)
D.man.userData.pose = "sit";
ovyStage(3, null);
ovySay("<b>He lies down to sleep.</b> Now!");
}
}
if (D.s === 4) {
if (D.ph === "wait") {
D.w -= dt;
if (D.w <= 0) {
D.ph = "now";
D.w = 1.3;
var sh = this.shapes[D.held];
this.form(D, sh[1]);
ovyTone(500, 0.1);
ovySay("<b>He is " + esc(sh[0]) + "!</b> Grip!");
}
}
else if (D.ph === "now") {
D.w -= dt;
if (D.w <= 0)
this.slip(D, "Too late: he twists free for a moment.");
}
}
},
function (D, line) {
var me = this;
D.slips = (D.slips || 0) + 1;
ovyTone(220, 0.15);
D.everSlip = 1;
if (D.slips > 1) {
D.ph = null;
this.form(D, "man");
ovyStage(3, null);
D.slips = 0;
D.held = 0;
ovySay(line + " <b>He slithers out of your grip</b>, back into the shape of an old man, and lies there panting. Seize him again!");
return;
}
D.ph = "wait";
D.w = 1.2 + Math.random() * 2;
ovySay(line + " (One slip; hold on!)");
},
function (D, L) {
var S = this.spots(), me = this;
if (D.s === 0 && ovyNear(S.eid.x, S.eid.z, 4))
return ovyAsk("Eidothea, the sea-nymph", "speak with her", function () {
ovyTell("Eidothea's plan", ["<i>\"Are you a fool, stranger, or do you like suffering, to sit here so long? My father is Proteus, the Old Man of the Sea, who knows every depth of it. Catch him, and he must tell you the way home.\"</i>", "<i>\"At noon he comes up and sleeps among his seals. I will dig four beds in the sand and give you four fresh sealskins. When he lies down, seize him, and hold on whatever he becomes: lion, serpent, leopard, boar, water or tree. When he is an old man again, ask.\"</i>", "She dabs sweet ambrosia under your nose against the smell of the seals."], function () { ovyStage(1, [S.bed.x, S.bed.z, "the beds in the sand"]); }, "To the beds");
});
if (D.s === 1 && ovyNear(S.bed.x, S.bed.z, 2.6))
return ovyAsk("A bed in the sand, with a fresh sealskin", "lie down under it", function () {
OVY.lie = 1;
OVY.lock = { x: S.bed.x, z: S.bed.z };
ovyPut(S.bed.x, S.bed.z, ovyFace(S.bed.x, S.bed.z, S.couch.x, S.couch.z));
D.man = ovyMan("proteus_v", { top: 0x4A7A6A, topKind: "robe", bottom: 0x3A6A5A, shoes: 0x5A5A50, skin: 0xC8B8A0, hair: 0xE8ECE8, hairStyle: "long", beard: 1, hat: "none", layer: "cloak", layerColor: 0x2A5A5A }, S.sea.x, S.sea.z);
ovyStage(2, null);
ovySay("You lie under the stiff sealskin. The smell is terrible; the ambrosia helps.");
});
if (D.s === 3 && (OVY.lie || ovyNear(S.couch.x, S.couch.z, 7)))
return ovyAsk("Proteus, asleep among his seals", "leap up and seize him", function () { OVY.lie = 0; OVY.lock = null; ovyPut(S.couch.x - 2.2, S.couch.z, ovyFace(S.couch.x - 2.2, S.couch.z, S.couch.x, S.couch.z)); D.held = 0; D.slips = 0; D.ph = "wait"; D.w = 1.5 + Math.random() * 2; ovyStage(4, null); ovySay("You leap out with a shout and throw your arms round him. <b>Hold on</b>: grip each time he changes, not before."); });
if (D.s === 4 && D.ph)
return ovyAsk(D.ph === "now" ? "He has changed!" : "He is about to change…", "grip", function () {
if (D.ph !== "now") {
me.slip(D, "Too soon: you loosened your hold to grip again.");
return;
}
D.held++;
ovyTone(600 + D.held * 40, 0.1);
if (D.held >= 6) {
D.ph = null;
me.form(D, "man");
ovyStage(5, null);
ovyTell("The Old Man answers", ["He tires at last, and is an old man again. <i>\"Which god told you how to catch me, son of Atreus? What do you want?\"</i>", "He tells you: you forgot to make the gods their offerings before you sailed; go back to Egypt's river and make them, and the wind will come. He tells you that your brother Agamemnon was killed when he reached home, and that Ajax was drowned.", "<i>\"And one more is still alive, held on an island by the nymph Calypso, weeping for home with no ship and no crew: Odysseus.\"</i>"], function () { ovyEnd(true, !D.everSlip, "The Old Man told you everything."); }, "Finish the chapter");
return;
}
D.ph = "wait";
D.w = 1.2 + Math.random() * 2.2;
ovySay("You hold on. " + D.held + " of 6.");
});
return null;
},
function (G) {
if (OVY.SG && OVY.SG.parent)
OVY.SG.parent.remove(OVY.SG);
var SG = new THREE.Group();
G.add(SG);
OVY.SG = SG;
OVY.S = {};
OVY.floors = [];
var wood = wM(0x7A5A3A), dark = wM(0x4A3A28), stone = wM(0xB8B0A0), SL = SEA.solids = SEA.solids || [];
var each = function (k, fn) { if (!SEA_BY[k])
return; try {
fn(SEA_BY[k]);
}
catch (e) {
if (window.console)
console.warn("[voyage] build " + k, e);
} };
each("aeaea", function (p) {
var A = ovyAeaeaSpots();
var t = ovyFree(A.hx - 13.5, A.hz + 4.5, 1.2);
OVY.S.table = t;
var ty = ovyY(t.x, t.z), tb = new THREE.Group();
tb.position.set(t.x, ty, t.z);
SG.add(tb);
wBox(1.6, 0.08, 0.9, wM(0x5A3A5A), 0, 0.82, 0, tb);
[[-0.7, -0.35], [0.7, -0.35], [-0.7, 0.35], [0.7, 0.35]].forEach(function (q) { wCyl(0.05, 0.05, 0.8, dark, q[0], 0.4, q[1], tb, 6); });
var gold = new THREE.MeshPhongMaterial({ color: 0xE8C040, shininess: 100, specular: 0xFFF0C0 });
wCyl(0.09, 0.05, 0.16, gold, -0.3, 0.95, 0, tb, 10);
wCyl(0.012, 0.012, 0.1, gold, -0.3, 0.88, 0, tb, 4);
var jug = wSph(0.16, gold, 0.35, 1.02, 0, tb, 10);
jug.scale.y = 1.3;
SL.push({ x: t.x, z: t.z, r: 0.9 });
var s = A.sty, sy = ovyY(s.x, s.z), mud = wMesh(new THREE.CircleGeometry(s.r, 24), wM(0x5A4A32), s.x, sy + 0.04, s.z, SG);
mud.rotation.x = -Math.PI / 2;
for (var i = 0; i < 18; i++) {
var a = i / 18 * Math.PI * 2, a2 = (i + 1) / 18 * Math.PI * 2, x = s.x + Math.cos(a) * s.r, z = s.z + Math.sin(a) * s.r, y = ovyY(x, z);
wCyl(0.08, 0.1, 1.2, dark, x, y + 0.6, z, SG, 5);
if (i === 13)
continue;
var mx = (x + s.x + Math.cos(a2) * s.r) / 2, mz = (z + s.z + Math.sin(a2) * s.r) / 2, len = 2 * s.r * Math.sin(Math.PI / 18), my = ovyY(mx, mz);
[0.45, 0.9].forEach(function (h) { var r = wBox(len, 0.07, 0.07, wood, mx, my + h, mz, SG); r.rotation.y = -(a + Math.PI / 18) + Math.PI / 2; });
SL.push({ x: mx, z: mz, hw: len / 2, hd: 0.12, rot: -(a + Math.PI / 18) + Math.PI / 2 });
}
var tr = wBox(2, 0.35, 0.5, wM(0x6A5A44), s.x + 2, sy + 0.2, s.z - 3.5, SG);
wBox(1.8, 0.05, 0.35, wM(0xA88A4A), s.x + 2, sy + 0.36, s.z - 3.5, SG);
var sg = wSign(["Circe's sty", "Residents: pigs, and recent guests", "Please do not accept drinks from the lady of the house"], 4.2, 1.4, "#3A2A4A", "#F0E0F8");
var gx = s.x - s.r - 1.6, gz = s.z + 0.5;
sg.position.set(gx, ovyY(gx, gz) + 1.7, gz);
sg.rotation.y = -Math.PI / 2;
SG.add(sg);
wBox(0.1, 1.1, 0.1, dark, gx, ovyY(gx, gz) + 0.55, gz, SG);
var h = ovyFree(A.p.x + 170, A.p.z + 6, 1.4);
OVY.S.hermes = h;
var hg = wPerson("ovy_hermes", { sex: "m", look: { top: 0xF0E8D8, topKind: "robe", bottom: 0xF0E8D8, shoes: 0xC8A060, hair: 0xC8902A, hairStyle: "short", hat: "none", layer: "cloak", layerColor: 0x3A6AA8 } });
ovyAt(hg, h.x, h.z, ovyFace(h.x, h.z, A.p.land.x, A.p.land.z));
SG.add(hg);
[-1, 1].forEach(function (sd) { var w = wSph(0.12, wM(0xFFFFFF), sd * 0.13, 1.7, -0.02, hg, 8); w.scale.set(0.3, 1, 1.6); w.rotation.z = sd * 0.5; });
var wand = wCyl(0.015, 0.015, 0.9, gold, 0.3, 1.1, 0.15, hg, 5);
wand.rotation.x = 0.4;
SEA.talkers.push({ x: h.x, z: h.z, r: 3.4, name: "Hermes", t: { name: "Hermes", persona: "You are Hermes, the messenger of the gods, from Homer's Odyssey (Books 5 and 10), here on Aeaea looking like a young man with the first down on his lip and a golden wand. You are quick, witty, kind to travellers and fond of a joke. You warn visitors that Circe turns guests into animals with a drugged cup, and you offer them the herb moly (black root, white flower) to protect them. You never mention being an AI or a game.", greet: "Careful, traveller. Everyone who drinks at Circe's table ends up in her sty. Have a sprig of moly?" } });
});
each("cyclops", function (p) {
var cx = p.x + 40, cz = p.z - 90, C = new THREE.Group();
SG.add(C);
var y = function (x, z) { return ovyY(x, z); };
var sk = wSph(0.8, wM(0x6A4A2A), cx - 9, y(cx - 9, cz - 2) + 0.6, cz - 2, C, 10);
sk.scale.set(1.3, 0.8, 0.8);
wCyl(0.6, 0.4, 0.4, wM(0x8A6A3A), cx - 7.6, y(cx - 7.6, cz - 1) + 0.2, cz - 1, C, 12);
var club = wCyl(0.35, 0.42, 11, wM(0x6A6A3A), cx + 8.5, y(cx + 8.5, cz - 6.5) + 0.4, cz - 6.5, C, 8);
club.rotation.z = Math.PI / 2;
club.rotation.y = 0.3;
for (var k = 0; k < 9; k++) {
var ka = k / 9 * Math.PI * 2;
wBox(0.5, 0.35, 0.4, wM(0x6A6458), cx - 2 + Math.cos(ka) * 1.3, y(cx - 2, cz - 4) + 0.18, cz - 4 + Math.sin(ka) * 1.3, C).rotation.y = -ka;
}
wCone(0.7, 1.1, wB(0xFF9A40), cx - 2, y(cx - 2, cz - 4) + 0.6, cz - 4, C, 7);
var gl = wGlow(0xFF9A40, 6, 0.45);
gl.position.set(cx - 2, y(cx - 2, cz - 4) + 1, cz - 4);
C.add(gl);
for (var r = 0; r < 3; r++) {
wBox(3, 0.12, 0.8, wM(0x9A7A4A), cx + 12, y(cx + 12, cz + 2) + 0.6 + r * 0.7, cz + 2 + r * 0.01, C);
for (var c = 0; c < 4; c++)
wCyl(0.25, 0.25, 0.18, wM(0xE8D8A0), cx + 11 + c * 0.7, y(cx + 12, cz + 2) + 0.78 + r * 0.7, cz + 2, C, 10);
}
for (var f = 0; f < 8; f++) {
var fx = cx - 14 + f * 1.2;
wCyl(0.05, 0.05, 1, dark, fx, y(fx, cz + 5) + 0.5, cz + 5, C, 4);
}
wBox(9, 0.06, 0.06, wood, cx - 9.8, y(cx - 10, cz + 5) + 0.7, cz + 5, C);
for (var l = 0; l < 3; l++)
ovyBeast("sheep", 0.6, cx - 12 + l * 1.6, cz + 7, C);
});
each("ithaca", function (p) {
var e = ovyFree(p.x - 110, p.z + 60, 7);
OVY.S.eumaeus = e;
var E = new THREE.Group();
SG.add(E);
var ey = ovyY(e.x, e.z);
wBox(5, 2.6, 4, wM(0x8A7A5A), e.x, ey + 1.2, e.z - 4, E);
var rf = wCone(4, 2, wM(0xA89050), e.x, ey + 3.4, e.z - 4, E, 4);
rf.rotation.y = Math.PI / 4;
wBox(1.2, 1.8, 0.1, wB(0x2A1E14), e.x, ey + 0.9, e.z - 1.95, E);
SL.push({ x: e.x, z: e.z - 4, hw: 2.5, hd: 2 });
for (var i = 0; i < 22; i++) {
var a = i / 22 * Math.PI * 2;
if (i === 5 || i === 6)
continue;
var x = e.x + Math.cos(a) * 7.5, z = e.z + Math.sin(a) * 7.5;
wBox(2.2, 0.9, 0.7, stone, x, ovyY(x, z) + 0.4, z, E).rotation.y = -a + Math.PI / 2;
SL.push({ x: x, z: z, r: 1 });
}
for (var s = 0; s < 4; s++) {
var sx = e.x + 3 + s * 1.6, sz = e.z + 3.5;
wBox(1.4, 0.7, 0.06, wood, sx, ovyY(sx, sz) + 0.35, sz + 0.7, E);
}
for (var pg = 0; pg < 4; pg++) {
var pig = ovyBeast("pig", 1, e.x + 2 + pg * 1.4, e.z + 2.5, SG);
if (pig)
SEA.people.push({ g: pig, wander: { r: 3, sp: 0.4 }, p: p });
}
var eu = wPerson("ovy_eumaeus", { sex: "m", look: { top: 0x7A6A4A, topKind: "robe", bottom: 0x6A5A3A, shoes: 0x5A4030, hair: 0xB8B8B8, hairStyle: "short", beard: 1, hat: "none", layer: "cloak", layerColor: 0x8A6A3A } });
ovyAt(eu, e.x - 2, e.z, 0);
SG.add(eu);
SEA.talkers.push({ x: e.x - 2, z: e.z, r: 3.4, name: "Eumaeus the swineherd", t: { name: "Eumaeus the swineherd", persona: "You are Eumaeus, the loyal swineherd of Odysseus on Ithaca, from Homer's Odyssey (Books 14 to 22). You were born a king's son on the island of Syria and sold as a child; Odysseus' mother raised you. You keep his pigs faithfully although the suitors eat the best every day. You are hospitable to every stranger (guests and beggars come from Zeus), honest, grumbling about the suitors, and you miss your master terribly. Answer warmly and simply. You never mention being an AI or a game.", greet: "Come in, come in, stranger, before my dogs tear your cloak. Sit; there's roast pork. Strangers come from Zeus." } });
var m = ovyFree(p.x + 80, p.z - 20, 15), mx = m.x, mz = m.z, top = -1e9;
for (var gx = -12; gx <= 12; gx += 3)
for (var gz = -7; gz <= 7; gz += 3.5)
top = Math.max(top, seaHeight(mx + gx, mz + gz));
var fy = Math.max(top, 1.6) + 0.15;
OVY.S.hall = { x: mx, z: mz, y: fy };
OVY.floors.push({ x: mx, z: mz, hw: 12, hd: 7, y: fy }, { x: mx, z: mz + 8.5, hw: 2.2, hd: 1.6, y: fy });
var H = new THREE.Group();
SG.add(H);
var wall = wM(0xD8CCB0), floorM = wM(0x9A8A6A);
wBox(24.6, 7, 14.6, wM(0xB8AC90), mx, fy - 3.6, mz, H);
wBox(24, 0.1, 14, floorM, mx, fy - 0.05, mz, H);
wBox(4.4, 7, 3.2, wM(0xB8AC90), mx, fy - 3.6, mz + 8.5, H);
for (var st = 0; st < 4; st++)
wBox(4.4, 0.3, 0.8, stone, mx, fy - 0.3 - st * 0.6, mz + 10.4 + st * 0.8, H);
wBox(24.6, 6, 0.6, wall, mx, fy + 3, mz - 7, H);
wBox(0.6, 6, 14.6, wall, mx - 12, fy + 3, mz, H);
wBox(0.6, 6, 14.6, wall, mx + 12, fy + 3, mz, H);
[-1, 1].forEach(function (sd) { wBox(10.6, 6, 0.6, wall, mx + sd * 7, fy + 3, mz + 7, H); });
wBox(3, 1.6, 0.6, wall, mx, fy + 5.2, mz + 7, H);
wBox(25, 0.4, 15, wM(0x8A5A3A), mx, fy + 6.2, mz, H);
var lan = wBox(4, 0.5, 4, wM(0x8A5A3A), mx, fy + 6.7, mz, H);
SL.push({ x: mx, z: mz - 7, hw: 12.3, hd: 0.35 }, { x: mx - 12, z: mz, hw: 0.35, hd: 7.3 }, { x: mx + 12, z: mz, hw: 0.35, hd: 7.3 }, { x: mx - 7, z: mz + 7, hw: 5.3, hd: 0.35 }, { x: mx + 7, z: mz + 7, hw: 5.3, hd: 0.35 });
[[-4, -3.2], [4, -3.2], [-4, 3.2], [4, 3.2]].forEach(function (q) { wCyl(0.32, 0.38, 6, wM(0x8A3A2A), mx + q[0], fy + 3, mz + q[1], H, 10); SL.push({ x: mx + q[0], z: mz + q[1], r: 0.45 }); });
for (var k = 0; k < 10; k++) {
var ka = k / 10 * Math.PI * 2;
wBox(0.5, 0.3, 0.4, stone, mx + 3 + Math.cos(ka) * 1.1, fy + 0.15, mz + 2 + Math.sin(ka) * 1.1, H).rotation.y = -ka;
}
wCone(0.5, 0.6, wB(0xFF9A40), mx + 3, fy + 0.35, mz + 2, H, 7);
var hg2 = wGlow(0xFF9A40, 5, 0.4);
hg2.position.set(mx + 3, fy + 0.9, mz + 2);
SG.add(hg2);
SL.push({ x: mx + 3, z: mz + 2, r: 1.3 });
[-1, 1].forEach(function (sd) { wBox(14, 0.45, 0.7, wood, mx, fy + 0.23, mz + sd * 5.6, H); wBox(14, 0.06, 0.8, wM(0x6A4A8A), mx, fy + 0.48, mz + sd * 5.6, H); });
for (var t = 0; t < 4; t++) {
var tx = mx - 5 + t * 3.4;
[-1, 1].forEach(function (sd) { wBox(1.2, 0.7, 0.7, wood, tx, fy + 0.35, mz + sd * 4.4, H); wSph(0.18, wM(0xC8A040), tx - 0.2, fy + 0.8, mz + sd * 4.4, H, 8); });
}
var ironM = new THREE.MeshPhongMaterial({ color: 0x8A8E94, shininess: 80 });
for (var ax = 0; ax < 12; ax++) {
var axx = mx - 1 + ax, ay = fy + 1.72, az = mz - 2.5;
wCyl(0.035, 0.04, 1.55, wM(0x6A4A2A), axx, fy + 0.78, az, H, 5);
wBox(0.08, 0.32, 0.5, ironM, axx, ay + 0.05, az - 0.2, H);
var ring = wMesh(new THREE.TorusGeometry(0.2, 0.035, 6, 16), ironM, axx, ay, az, H);
ring.rotation.y = Math.PI / 2;
}
wBox(12.5, 0.15, 0.4, wM(0x5A4A32), mx + 4.5, fy + 0.04, mz - 2.5, H);
var stn = wCyl(0.5, 0.6, 0.12, stone, mx - 8, fy + 0.06, mz - 2.5, H, 12);
var bow = new THREE.Group();
var arc = wMesh(new THREE.TorusGeometry(0.75, 0.035, 5, 20, Math.PI * 0.9), wM(0x6A4A2A), 0, 0, 0, bow);
arc.rotation.z = Math.PI / 2 + 0.16;
bow.position.set(mx - 11.55, fy + 2.2, mz + 2);
bow.rotation.y = Math.PI / 2;
H.add(bow);
wCyl(0.12, 0.12, 0.8, wM(0x8A6A3A), mx - 11.5, fy + 1.9, mz + 3.2, H, 8);
var lamps = [[-9, -5], [9, -5], [-9, 5], [9, 5]];
lamps.forEach(function (q) { wCyl(0.05, 0.07, 1.6, dark, mx + q[0], fy + 0.8, mz + q[1] * 0.9, H, 5); var lg = wGlow(0xFFD890, 2.4, 0.55); lg.position.set(mx + q[0], fy + 1.75, mz + q[1] * 0.9); SG.add(lg); });
var hs = wSign(["The hall of Odysseus", "Twelve axes, one bow", "Suitors: kindly go home"], 4, 1.3, "#3A2A1A", "#F0E0B0");
hs.position.set(mx + 3.2, fy + 1.6, mz + 9.6);
SG.add(hs);
wBox(0.1, 1, 0.1, dark, mx + 3.2, fy + 0.5, mz + 9.65, SG);
});
each("scheria", function (p) {
var t = ovyFree(p.x - 80, p.z + 250, 3), dir = Math.atan2(p.x - t.x, p.z - t.z);
OVY.S.discus = { x: t.x, z: t.z, dir: dir };
for (var k = 0; k < 14; k++) {
var ka = k / 14 * Math.PI * 2;
wBox(0.4, 0.12, 0.25, stone, t.x + Math.cos(ka) * 1.3, ovyY(t.x, t.z) + 0.06, t.z + Math.sin(ka) * 1.3, SG).rotation.y = -ka;
}
var mxp = t.x + Math.sin(dir) * 48, mzp = t.z + Math.cos(dir) * 48;
wCyl(0.06, 0.06, 1.4, wM(0xF0E8D8), mxp, ovyY(mxp, mzp) + 0.7, mzp, SG, 6);
wSph(0.14, wM(0xE8C040), mxp, ovyY(mxp, mzp) + 1.45, mzp, SG, 8);
var gs = wSign(["The games ground", "Discus · the Phaeacians' best: 48 m"], 3.6, 1.1, "#2A4A6A", "#F0F4F8");
var sx = t.x - 2.5, sz = t.z - 1;
gs.position.set(sx, ovyY(sx, sz) + 1.5, sz);
gs.rotation.y = dir;
SG.add(gs);
});
each("pylos", function (p) {
var c = ovyFree(p.x - 90, p.z + 30, 3), ch = new THREE.Group(), bronze = new THREE.MeshPhongMaterial({ color: 0xB8864A, shininess: 90 });
OVY.S.chariot = c;
wBox(1.4, 0.9, 1, bronze, 0, 1.05, 0, ch);
[-0.85, 0.85].forEach(function (x) { var wh = wCyl(0.6, 0.6, 0.1, wood, x, 0.6, 0.1, ch, 12); wh.rotation.z = Math.PI / 2; });
var pole = wBox(0.1, 0.1, 3, wood, 0, 0.7, 1.8, ch);
ovyAt(ch, c.x, c.z, ovyFace(c.x, c.z, p.land.x, p.land.z));
SG.add(ch);
SL.push({ x: c.x, z: c.z, r: 1.1 });
[-0.7, 0.7].forEach(function (o) { var hr = ovyBeast("horse", 1.1, c.x + Math.cos(ch.rotation.y) * o + Math.sin(ch.rotation.y) * 3.6, c.z - Math.sin(ch.rotation.y) * o + Math.cos(ch.rotation.y) * 3.6, SG); if (hr)
hr.rotation.y = ch.rotation.y; });
});
if (typeof landBake !== "function")
return;
},
function () {
try {
if (typeof WLD === "undefined" || WLD.on !== "sea" || typeof SEA === "undefined")
return null;
var k = null;
if (!SEA.aboard && SEA.shore) {
if (OVY_DANGER[SEA.shore.k])
k = SEA.shore.k;
}
else if (SEA.aboard) {
for (var c in OVY_DANGER) {
var p = SEA_BY[c];
if (p && Math.hypot(SEA.sx - p.x, SEA.sz - p.z) < (p.r || 200) + 300) {
k = c;
break;
}
}
}
if (!k)
return null;
var D = OVY.D;
if (OVY.veil && OVY.veil.style.display !== "none")
return null;
if (OVY.k === k && D && D.s !== "sail") {
if (k === "troy" && D.s === 1)
return null;
if (k === "cyclops" && D.s >= 1 && D.s <= 5)
return null;
if (OVY.lock)
return null;
}
if (OVY.beast)
return null;
return k;
}
catch (e) {
return null;
}
}
];
});
