/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var SCP = { st: null, at: 0, busy: false, missing: false, force: null, stage: null, parade: null, said: {}, t: 0, pt: 0, near: null, warned: false,
pics: {}, picQ: [], walkS: 0, walked: false, lastTick: 0 };
var SCP_CATS = [
["scary", "Scariest", "💀", "The costume that makes the bravest dreamer jump"],
["funny", "Funniest", "🤡", "The costume that gets the biggest laugh"],
["handmade", "Best Handmade", "🧵", "Put together from what you had, with your own ideas"],
["grand", "Grandest", "👑", "The most splendid of all: crowned Somnucor's Pumpkin King or Queen until next Samhain"]
];
function scpCat(k) { for (var i = 0; i < SCP_CATS.length; i++)
if (SCP_CATS[i][0] === k)
return SCP_CATS[i]; return SCP_CATS[0]; }
var SCP_TZ = "Arizona time", SCP_UTC = -7;
var SCP_DEFAULT = { year: 2026, open: true, enter_ends: "2026-11-01T01:00:00Z", parade_at: "2026-11-01T01:00:00Z", parade_min: 60,
catwalk_at: "2026-11-01T02:00:00Z", catwalk_min: 60, votes_end: "2026-11-01T03:00:00Z", crown_at: "2026-11-01T03:30:00Z", ring: "civic", gold: 250, crowned_at: null };
var SCP_FLOATS = [
["jack", "The Great Jack-o'-Lantern", 0xE86A00],
["house", "The Haunted House", 0x3A2A4A],
["cauldron", "The Witches' Cauldron", 0x1E4A2A],
["bones", "The Skeleton Band", 0x1A1418],
["horseman", "The Headless Horseman", 0x2A1A10],
["ship", "The Ghost Ship", 0x2A3A4A],
["spider", "The Great Spider", 0x2A0E2E],
["graves", "The Old Churchyard", 0x2A2A2A],
["moon", "The Harvest Moon and the Bats", 0x1A1A3A],
["scarecrow", "The Scarecrows' Field", 0x6A4A1A]
];
var SCP_GUISE = [
{ n: "witch", top: 0x1B1C20, topKind: "robe", bottom: 0x1B1C20, hat: "witch", hatColor: 0x141418, back: "cape", backColor: 0x3A1A4A, skin: 0x9AC08A },
{ n: "wizard", top: 0x2A2A6A, topKind: "robe", bottom: 0x2A2A6A, hat: "wizard", hatColor: 0x2A2A6A, back: "cloak", backColor: 0x1A1A4A },
{ n: "vampire", top: 0x1A1418, layer: "suit", layerColor: 0x141014, bottom: 0x141014, back: "cape", backColor: 0x8A1020, skin: 0xE8E0DC, neck: "bowtie" },
{ n: "ghost", top: 0xF4F2EE, topKind: "robe", bottom: 0xF4F2EE, hat: "hood", hatColor: 0xF4F2EE, skin: 0xF0F0F0, shoes: 0xF4F2EE },
{ n: "devil", top: 0xA81820, bottom: 0x6A0A10, back: "cape", backColor: 0x1A0A0A, sp: "tiefling", skin: 0xC84A3A },
{ n: "goblin", top: 0x4A5A2A, layer: "tunic", layerColor: 0x3A2A1A, bottom: 0x3A2A1A, sp: "goblin", skin: 0x6A9A3A },
{ n: "scarecrow", top: 0xC89A4A, layer: "vest", layerColor: 0x6A4A2A, bottom: 0x5A6A8A, hat: "brimmed", hatColor: 0xB8904A },
{ n: "pumpkin", top: 0x1A1418, bottom: 0x1A1418, back: "cloak", backColor: 0x2A1A0A, pumpkin: true },
{ n: "bat", top: 0x141014, bottom: 0x141014, back: "cape", backColor: 0x141014, sp: "fairy", wings: 0x141014 },
{ n: "mummy", top: 0xD8CCA8, bottom: 0xD8CCA8, skin: 0xD8CCA8, hat: "hood", hatColor: 0xD8CCA8, shoes: 0xD8CCA8 }
];
var SCP_V = 1.4;
function scpIn() { return typeof signedIn === "function" && signedIn(); }
function scpKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function scpLite() { return (typeof LITE !== "undefined" && !!LITE) || (typeof LOOK_PHONE !== "undefined" && !!LOOK_PHONE); }
function scpE(s) { return typeof esc === "function" ? esc(String(s == null ? "" : s)) : String(s == null ? "" : s); }
function scpRpc(n, a) { return typeof cityRpc === "function" ? cityRpc(n, a || {}) : Promise.reject(new Error("offline")); }
function scpMissing(e) { return /function|404|PGRST|does not exist|schema cache/i.test(String((e && e.message) || e || "")); }
function scpRules() { var r = SCP.st && SCP.st.rules; return r && r.parade_at ? r : SCP_DEFAULT; }
function scpMs(k) { return Date.parse(scpRules()[k]); }
function scpEntries() { return (SCP.st && SCP.st.entries) || []; }
function scpWinners() { return (SCP.st && SCP.st.winners) || []; }
function scpPhase(at) {
var r = scpRules(), n = at || Date.now();
if (SCP.force)
return SCP.force;
if (!r.open)
return "off";
var pa = scpMs("parade_at"), pe = pa + r.parade_min * 60000, ca = scpMs("catwalk_at"), ce = ca + r.catwalk_min * 60000, ve = scpMs("votes_end"), cr = scpMs("crown_at");
if (n >= pa && n < pe)
return "parade";
var crowned = r.crowned_at ? Date.parse(r.crowned_at) : (n >= cr ? cr : 0);
if (crowned)
return n < crowned + 6 * 3600000 ? "crowned" : "after";
if (n >= ca && n < ce)
return "catwalk";
if (n < scpMs("enter_ends"))
return n < pa - 36 * 3600000 ? "before" : "enter";
return "votes";
}
function scpNight() { return !!SCP.force || typeof shnOn !== "function" || shnOn(); }
function scpStageDay() { var p = scpPhase(); return scpNight() && p !== "off" && p !== "before" && p !== "after"; }
function scpParadeOn() { return scpNight() && scpPhase() === "parade" && scpParadeOk(); }
function scpYoungPlayer() { try {
return typeof yngOn === "function" && yngOn();
}
catch (e) {
return false;
} }
function scpMinor() { return !!(SCP.st && SCP.st.minor) || scpYoungPlayer(); }
function scpParadeOk() { if (SCP.force)
return true; if (SCP.st && SCP.st.parade_ok != null)
return SCP.st.parade_ok !== false; return !scpYoungPlayer(); }
function scpClock(ms, day) { return __ZC(364, 0, this, arguments, new.target); }
function scpLocal(ms) { try {
if (new Date().getTimezoneOffset() === -SCP_UTC * 60)
return "";
return " (your time " + new Date(ms).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }) + ")";
}
catch (e) {
return "";
} }
function scpIn_(ms) { var m = Math.max(0, Math.round((ms - Date.now()) / 60000)); if (m < 60)
return m + " minute" + (m === 1 ? "" : "s"); var h = Math.floor(m / 60), r = m % 60; return h + " hour" + (h === 1 ? "" : "s") + (r ? " " + r + " min" : ""); }
function scpLoad(force) {
if (SCP.busy || (!force && Date.now() - SCP.at < 60000))
return Promise.resolve(SCP.st);
if (!scpIn()) {
SCP.at = Date.now();
return Promise.resolve(null);
}
SCP.busy = true;
return scpRpc("samhain_contest_state").then(function (d) { SCP.busy = false; SCP.at = Date.now(); SCP.missing = false; if (d && d.ok) {
SCP.st = d;
if (SCP.stage)
SCP.stage.want = null;
} return SCP.st; })
.catch(function (e) { SCP.busy = false; SCP.at = Date.now(); if (scpMissing(e))
SCP.missing = true; return SCP.st; });
}
function scpFigure(look, seed) { return __ZC(364, 1, this, arguments, new.target); }
function scpPic(id, look, name) {
if (SCP.pics[id])
return SCP.pics[id];
if (!SCP.picQ.some(function (q) { return q.id === id; }))
SCP.picQ.push({ id: id, look: look, name: name });
return null;
}
function scpPicWork() {
if (!SCP.picQ.length || typeof renderer === "undefined" || !renderer)
return;
var n = 0;
while (SCP.picQ.length && n < 3) {
n++;
var q = SCP.picQ.shift();
if (SCP.pics[q.id])
continue;
try {
var W = 120, H = 160, rt = new THREE.WebGLRenderTarget(W, H), sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(28, W / H, 0.05, 50);
sc.add(new THREE.HemisphereLight(0xFFF0E0, 0x3A2A3A, 1.0));
var dl = new THREE.DirectionalLight(0xFFE0B0, 0.8);
dl.position.set(2, 4, 5);
sc.add(dl);
var g = scpFigure(q.look, q.id);
sc.add(g);
g.rotation.y = 0.35;
var b = new THREE.Box3().setFromObject(g), sz = new THREE.Vector3(), c = new THREE.Vector3();
b.getSize(sz);
b.getCenter(c);
var R = Math.max(sz.y * 1.95, 1.6);
cam.position.set(c.x + 0.2, c.y + 0.15, c.z + R);
cam.lookAt(c.x, c.y, c.z);
var was = renderer.getRenderTarget();
renderer.setRenderTarget(rt);
renderer.setClearColor(0x1A1020, 1);
renderer.clear();
renderer.render(sc, cam);
var px = new Uint8Array(W * H * 4);
renderer.readRenderTargetPixels(rt, 0, 0, W, H, px);
renderer.setRenderTarget(was);
rt.dispose();
var cv = document.createElement("canvas");
cv.width = W;
cv.height = H;
var cx = cv.getContext("2d"), img = cx.createImageData(W, H);
for (var y = 0; y < H; y++)
img.data.set(px.subarray((H - 1 - y) * W * 4, (H - y) * W * 4), y * W * 4);
cx.putImageData(img, 0, 0);
SCP.pics[q.id] = cv.toDataURL("image/png");
}
catch (e) {
SCP.pics[q.id] = "x";
}
}
try {
document.querySelectorAll("img[data-scp-pic]").forEach(function (im) { var p = SCP.pics[im.getAttribute("data-scp-pic")]; if (p && p !== "x" && im.src !== p)
im.src = p; });
}
catch (e) { }
}
function scpGuiser(i) { return __ZC(364, 2, this, arguments, new.target); }
function scpBake(root) { return __ZC(364, 3, this, arguments, new.target); }
function scpCardOpen() { return typeof WLD !== "undefined" && WLD.card && WLD.card.style.display === "block" && WLD.card.getAttribute("data-scp") === "1"; }
function scpSay(h, bad) { SCP.msg = h; SCP.bad = !!bad; if (scpCardOpen())
scpCard(); }
function scpImg(id, look, name, w) { return __ZC(364, 4, this, arguments, new.target); }
function scpCard() { return __ZC(364, 5, this, arguments, new.target); }
function scpTitleNow() { var i = document.getElementById("scp-title"); return i ? i.value : (SCP.title || ""); }
function scpLookKey(L) { var s = JSON.stringify(L || {}), h = 0; for (var i = 0; i < s.length; i++)
h = (h * 31 + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); }
function scpEnter(cat, title) { return __ZC(364, 6, this, arguments, new.target); }
function scpVote(cat, id) {
scpRpc("samhain_contest_vote", { p_cat: cat, p_entry: id }).then(function (d) { scpSay(scpE((d && d.say) || "Done."), !(d && d.ok)); scpLoad(true).then(function () { if (scpCardOpen())
scpCard(); }); })
.catch(function (e) { scpSay(scpE(String(e.message || e)), true); });
}
var SCP_COSTUME_KEYS = ["ghostsheet", "skeletonsuit", "mummywraps", "pumpkinsuit", "vampcloak", "catears", "piratehat", "scarecrowhat", "eyepatch", "dominomask", "witch", "wizard", "cape", "cloak", "tophat", "crown", "horns", "halo"];
function scpWornCostume(L) { return __ZC(364, 7, this, arguments, new.target); }
function scpDrop(G) { return __ZC(364, 8, this, arguments, new.target); }
function scpStageSpot() { return __ZC(364, 9, this, arguments, new.target); }
function scpGoStage() { return __ZC(364, 10, this, arguments, new.target); }
function scpTex(w, h, fn) { return __ZC(364, 11, this, arguments, new.target); }
function scpBackTex() { return __ZC(364, 12, this, arguments, new.target); }
function scpSignTex(txt, sub, col) { return __ZC(364, 13, this, arguments, new.target); }
function scpStageBuild() { return __ZC(364, 14, this, arguments, new.target); }
function scpStageWho() { return __ZC(364, 15, this, arguments, new.target); }
function scpStageFigs() { return __ZC(364, 16, this, arguments, new.target); }
function scpStageTick(dt) { return __ZC(364, 17, this, arguments, new.target); }
function scpBannerTex(txt) { return __ZC(364, 18, this, arguments, new.target); }
function scpBatTex() { return __ZC(364, 19, this, arguments, new.target); }
function scpFloat(key, name, col) { return __ZC(364, 20, this, arguments, new.target); }
function scpParadeDrop() { var R = SCP.parade; if (!R)
return; scpDrop(R.g); SCP.parade = null; }
function scpParadeBuild() { return __ZC(364, 21, this, arguments, new.target); }
function scpRingR() { var q = scpRules().ring || "civic"; return typeof evtRingR === "function" ? evtRingR(q) : ({ plaza: 130, civic: 245, estates: 430, temples: 740, markets: 1080, commons: 1280, harvest: 1790 })[q] || 245; }
function scpParadeStart() { return SCP.force === "parade" ? (SCP.forceAt || (SCP.forceAt = Date.now())) : scpMs("parade_at"); }
function scpParadeHead(R, P, len) { return __ZC(364, 22, this, arguments, new.target); }
function scpParadeTick(dt, on) {
var P = camera.position;
if (!on || typeof ATLC === "undefined" || !ATLC) {
if (SCP.parade)
scpParadeDrop();
return;
}
var R = scpRingR();
if (Math.abs(Math.hypot(P.x - ATLC.x, P.z - ATLC.z) - R) > 160) {
if (SCP.parade)
SCP.parade.g.visible = false;
SCP.paradeNear = false;
return;
}
if (!SCP.parade || SCP.parade.key !== scpEntries().map(function (e) { return e.id; }).join(","))
scpParadeBuild();
var W = SCP.parade, head = scpParadeHead(R, P, W.len), t = performance.now() / 1000, near = false;
W.g.visible = true;
W.head = head;
W.items.forEach(function (it, i) {
var a = head - it.s / R, rr = R + it.l, x = ATLC.x + Math.cos(a) * rr, z = ATLC.z + Math.sin(a) * rr, ry = Math.atan2(-Math.sin(a), Math.cos(a)), o = it.o, y = terrainY(x, z);
o.rotation.y = ry;
if (it.role !== "float") {
var lm = o.userData.limbs, sw = Math.sin(t * 5 + i);
if (lm) {
if (lm.ll)
lm.ll.rotation.x = sw * 0.45;
if (lm.rl)
lm.rl.rotation.x = -sw * 0.45;
if (lm.la)
lm.la.rotation.x = -sw * 0.4;
if (lm.ra)
lm.ra.rotation.x = sw * 0.4;
}
y += Math.abs(sw) * 0.04;
}
else if (o.visible)
o.traverse(function (m) {
var u = m.userData;
if (u.bat != null) {
m.position.y += Math.sin(t * 2 + u.bat) * 0.004;
m.rotation.y = Math.sin(t + u.bat) * 0.4;
}
if (u.orbit != null) {
var oa = t * 0.5 + u.orbit * 0.785;
m.position.set(Math.cos(oa) * 2.8, 6.2 + Math.sin(t + u.orbit) * 0.4, Math.sin(oa) * 2.8);
m.rotation.y = -oa;
}
if (u.bub != null) {
m.position.y = 1.31 + 2.15 + ((t * 0.4 + u.bub * 0.2) % 1) * 0.5;
}
if (u.ghost) {
m.position.y += Math.sin(t * 1.2) * 0.003;
}
if (u.sail || u.cape) {
m.rotation.y = Math.sin(t * 0.8) * 0.12;
}
});
o.position.set(x, y, z);
it.x = x;
it.z = z;
var dd = Math.hypot(x - P.x, z - P.z);
o.visible = dd < (scpLite() ? 110 : 170);
if (dd < 9)
near = true;
});
if (near && !SCP.paradeNear && Date.now() - (SCP.paradeSaid || 0) > 90000) {
SCP.paradeSaid = Date.now();
setStatus("🎃 <b>The Spooks Parade is passing!</b> Walk along with it for a Spooks Parade ribbon.");
}
SCP.paradeNear = near;
if (near && !SCP.walked) {
SCP.walkS += dt;
if (SCP.walkS >= 180) {
SCP.walked = true;
if (scpIn())
scpRpc("samhain_contest_walked").then(function (d) { setStatus("🎗️ <b>You walked with the Spooks Parade.</b> " + scpE((d && d.say) || "")); }).catch(function () { setStatus("🎗️ <b>You walked with the Spooks Parade.</b>"); });
else
setStatus("🎗️ <b>You walked with the Spooks Parade.</b> Sign in to keep a ribbon for it next time.");
}
}
}
function scpGoParade() { return __ZC(364, 23, this, arguments, new.target); }
function scpCity() { return typeof inSomnucorNow === "function" && inSomnucorNow() && !(typeof WLD !== "undefined" && WLD.on) && !(typeof store !== "undefined" && store.inside) && typeof ATLC !== "undefined" && !!ATLC; }
function scpTick(dt) {
var city = scpCity(), P = camera.position;
SCP.t += dt;
if (SCP.t > 2) {
SCP.t = 0;
try {
scpPumpkinMark();
}
catch (e) { }
if (city || scpCardOpen())
scpLoad(false);
scpPicWork();
}
else if (SCP.picQ.length)
scpPicWork();
if (!SCP.force)
SCP.forceAt = 0;
var stage = city && scpStageDay() && Math.hypot(P.x - ATLC.x, P.z - ATLC.z) < 260;
if (stage) {
if (!SCP.stage)
scpStageBuild();
scpStageTick(dt);
}
else if (SCP.stage) {
scpDrop(SCP.stage.g);
SCP.stage = null;
}
scpParadeTick(dt, city && scpParadeOn());
SCP.pt += dt;
if (SCP.pt < 0.2)
return;
SCP.pt = 0;
var S = SCP.stage && SCP.stage.spot;
if (S && !scpCardOpen()) {
var fx = S.x - Math.cos(S.a) * 8, fz = S.z - Math.sin(S.a) * 8;
if (Math.hypot(P.x - fx, P.z - fz) < 9) {
if (SCP.near !== "stage") {
SCP.near = "stage";
worldPromptCity("🎭 <b>The Costume Contest</b> · <b>press E</b> to enter or vote", function () { worldPromptCity(null); SCP.near = null; scpCard(); });
}
return;
}
}
if (SCP.near) {
SCP.near = null;
worldPromptCity(null);
}
}
(function () {
if (typeof transitTick !== "function")
return;
var tt = transitTick;
transitTick = function (dt) { tt.apply(this, arguments); try {
scpTick(dt);
}
catch (e) {
if (!SCP.warned) {
SCP.warned = true;
if (window.console)
console.warn("costume contest:", e);
}
} };
})();
function scpToast(h) { return __ZC(364, 24, this, arguments, new.target); }
function scpBell(n) { for (var i = 0; i < n; i++)
(function (i) { setTimeout(function () { if (typeof playTone === "function")
playTone(196, 1.6); }, i * 1100); })(i); }
function scpWatch() {
try {
if (typeof camera === "undefined" || SCP.force)
return;
var r = scpRules();
if (!r.open)
return;
var now = Date.now(), told;
try {
told = JSON.parse(localStorage.getItem("scp_told") || "{}") || {};
}
catch (e) {
told = {};
}
var pa = scpMs("parade_at"), ca = scpMs("catwalk_at"), ve = scpMs("votes_end"), cr = scpMs("crown_at"), y = r.year, k = null, h = "", bells = 1, ring = typeof evtRingName === "function" ? evtRingName(r.ring) : "the city";
function at(ms, win) { return now >= ms && now < ms + win * 60000; }
if (at(pa, 15)) {
k = "parade";
bells = 3;
h = "🎃🔔 <b>The Spooks Parade has set off!</b> Floats, guisers and the Costume Contest's entrants are going round " + scpE(ring) + " until " + scpClock(pa + r.parade_min * 60000) + ". Put on your costume and walk with it. Menu › 🎭 Costume Contest.";
}
else if (at(pa - 30 * 60000, 10)) {
k = "parade-soon";
h = "🎃 <b>The Spooks Parade sets off in half an hour</b>, round " + scpE(ring) + ". Costume Contest entries close then too: Menu › 🎭 Costume Contest.";
}
else if (at(ca, 15)) {
k = "catwalk";
bells = 2;
h = "✨🔔 <b>The Catwalk has begun</b> on the contest stage in the Tower Plaza: every entrant walks it in costume. Votes close at " + scpClock(ve) + ". Menu › 🎭 Costume Contest.";
}
else if (at(ve - 15 * 60000, 10)) {
k = "votes-soon";
h = "🗳️ <b>Fifteen minutes left to vote</b> in the Costume Contest. Menu › 🎭 Costume Contest.";
}
else if (scpWinners().length && now >= cr - 60000 && now < cr + 3 * 3600000 || (r.crowned_at && now < Date.parse(r.crowned_at) + 3 * 3600000 && scpWinners().length)) {
k = "crowned";
bells = 5;
h = "🏆🔔 <b>The Samhain Costume Contest winners!</b><br>" + SCP_CATS.map(function (c) { var w = scpWinners().filter(function (x) { return x.cat === c[0]; })[0]; return w ? (c[0] === "grand" ? "🎃👑 Grandest, and <b>Somnucor's Pumpkin " + scpE(w.honour || "King") + "</b> until next Samhain: <b>" + scpE(w.name) + "</b> as " + scpE(w.title) : c[2] + " " + scpE(c[1]) + ": <b>" + scpE(w.name) + "</b> as " + scpE(w.title)) : ""; }).filter(Boolean).join("<br>") + "<br>They stand crowned on the stage in the Tower Plaza.";
}
if (!k || told[y + ":" + k])
return;
told[y + ":" + k] = now;
try {
localStorage.setItem("scp_told", JSON.stringify(told));
}
catch (e) { }
scpToast(h);
scpBell(bells);
if (k === "crowned") {
var mine = scpWinners().filter(function (w) { return w.mine; })[0];
if (mine)
setTimeout(function () { scpToast(mine.cat === "grand" ? "🎃👑 <b>You are Somnucor's Pumpkin " + scpE(mine.honour || "King") + "</b> until next Samhain! The pumpkin crown" + (mine.gold ? " and " + mine.gold + " gold are" : " is") + " in your backpack, and everyone sees your title over your head. (King or Queen: change it on the contest card.)" : "👑 <b>You won " + scpE(scpCat(mine.cat)[1]) + "!</b> The Champion's sash" + (mine.gold ? " and " + mine.gold + " gold are" : " is") + " in your backpack."); }, 13000);
}
}
catch (e) { }
}
function scpWatchLoad() { try {
var cr = scpMs("crown_at"), now = Date.now();
if (now >= cr - 120000 && now < cr + 3 * 3600000 && !scpWinners().length)
scpLoad(true);
else if (now - SCP.at > 10 * 60000)
scpLoad(false);
}
catch (e) { } }
if (typeof setInterval === "function")
setTimeout(function () { scpWatchLoad(); scpWatch(); setInterval(function () { scpWatchLoad(); scpWatch(); try {
scpPumpkinMark();
}
catch (e) { } }, 20000); }, 14000);
(function () {
function hook() {
if (typeof document === "undefined")
return;
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
var btn = document.getElementById("me-scp");
if (!btn) {
btn = document.createElement("button");
btn.className = "btn";
btn.id = "me-scp";
btn.title = "The Samhain Costume Contest and the Spooks Parade";
btn.textContent = "🎭 Costume Contest";
btn.onclick = function () { scpCard(); };
bar.appendChild(btn);
}
btn.style.display = (scpStageDay() || scpKeeper() || (SCP.st && SCP.st.pumpkin)) ? "" : "none";
setTimeout(hook, 30000);
}
if (typeof document !== "undefined")
setTimeout(hook, 2100);
})();
(function () {
if (typeof shnMenu !== "function")
return;
var sm = shnMenu;
shnMenu = function () {
var r = sm.apply(this, arguments);
try {
var c = WLD.card;
if (c && c.style.display === "block" && (scpStageDay() || scpKeeper())) {
var el = document.createElement("div");
el.innerHTML = worldBtn("scp", "🎭 The Costume Contest & the Spooks Parade", "Enter in your costume, vote, and when the parade goes round");
var bt = el.firstChild;
bt.style.cursor = "pointer";
bt.onclick = function (ev) { ev.stopPropagation(); scpCard(); };
c.appendChild(bt);
}
}
catch (e) { }
return r;
};
})();
(function () {
var sc = scpCard;
scpCard = function () {
sc.apply(this, arguments);
try {
if (scpParadeOn() && scpCity()) {
var el = document.createElement("div");
el.innerHTML = worldBtn("scpgo", "🎃 Take me to the Spooks Parade", "Beside it, as it comes round");
var bt = el.firstChild;
bt.style.cursor = "pointer";
bt.onclick = function (ev) { ev.stopPropagation(); worldCard(null); scpGoParade(); };
var c = WLD.card, first = c.querySelector("table");
if (first && first.parentNode === c)
c.insertBefore(bt, first);
else
c.appendChild(bt);
}
}
catch (e) { }
};
})();
setTimeout(function () {
try {
var m = /[?&]kspooks=(parade|catwalk|crowned|stage)/.exec(location.search);
if (!m)
return;
var tries = 0, iv = setInterval(function () {
tries++;
if (tries > 80) {
clearInterval(iv);
return;
}
if (!scpKeeper())
return;
if (typeof store === "undefined" || !store.workplaceAt || !Object.keys(store.workplaceAt).length)
return;
clearInterval(iv);
SCP.force = m[1] === "stage" ? null : m[1];
SCP.forceAt = 0;
try {
if (!inSomnucorNow() && typeof somnucorRealm === "function" && somnucorRealm() && typeof visitRealm === "function")
visitRealm(somnucorRealm().id);
}
catch (e) { }
setTimeout(function () { try {
if (m[1] === "parade")
scpGoParade();
else
scpGoStage();
}
catch (e) { } }, 2500);
setStatus("🎭 <b>Keeper try-out</b> (only you see it). Menu › 🎭 Costume Contest › Back to the real clock ends it.");
try {
var q = new URLSearchParams(location.search);
q.delete("kspooks");
var s = q.toString().replace(/^play=(&|$)/, "play$1");
history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
}
catch (e) { }
}, 1500);
}
catch (e) { }
}, 3200);
function scpPumpkinMark() {
var PK = SCP.st && SCP.st.pumpkin;
if (!PK || !PK.user_id || typeof presenceOthers === "undefined")
return;
var p = presenceOthers[PK.user_id], g = p && p.group;
if (!g)
return;
var key = PK.honour + PK.name;
if (g.userData.scpPk === key)
return;
g.userData.scpPk = key;
if (typeof makeTag === "function") {
var old = g.userData.tag;
if (old && typeof dropTag === "function")
dropTag(old);
var tg = makeTag("🎃👑 Pumpkin " + (PK.honour || "King") + " · " + (p.name || PK.name), false);
tg.position.y = old ? old.position.y : 2.02;
g.add(tg);
g.userData.tag = tg;
}
if (!g.userData.scpCrown) {
var cr = new THREE.Group(), gold = new THREE.MeshLambertMaterial({ color: 0xE8B030 }), pk = new THREE.MeshLambertMaterial({ color: 0xE8701A });
var band = new THREE.Mesh(new THREE.CylinderGeometry(0.135, 0.14, 0.07, 14, 1, true), gold);
band.material.side = THREE.DoubleSide;
cr.add(band);
for (var i = 0; i < 6; i++) {
var a = i / 6 * Math.PI * 2, pt = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), pk);
pt.position.set(Math.cos(a) * 0.135, 0.06, Math.sin(a) * 0.135);
cr.add(pt);
}
cr.position.y = 1.86;
cr.traverse(function (m) { m.raycast = function () { }; });
g.add(cr);
g.userData.scpCrown = cr;
}
}
function scpStats() { return { phase: scpPhase(), stage: !!SCP.stage, figs: SCP.stage ? SCP.stage.figs.length : 0, parade: !!SCP.parade && SCP.parade.g.visible, items: SCP.parade ? SCP.parade.items.length : 0, spot: SCP.spot || null, pics: Object.keys(SCP.pics).length }; }
