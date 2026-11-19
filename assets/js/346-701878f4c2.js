/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var MG = { board: {}, steps: null, at: 0, busy: false, missing: false, cur: null, here: null, near: null, prompted: false, picked: {}, told: {}, digN: 0 };
try {
MG.board = JSON.parse(localStorage.getItem("sm.mg.board") || "{}") || {};
}
catch (e) {
MG.board = {};
}
try {
MG.picked = JSON.parse(localStorage.getItem("sm.mg.picked") || "{}") || {};
}
catch (e) {
MG.picked = {};
}
var MG_STEPS = [30, 90, 180, 300, 450, 630, 840, 1080, 1350, 1650, 1980, 2340];
var MG_SEQ = ["drift", "seam", "gallery", "drift", "seam", "vug", "drift", "gallery", "seam", "stope", "seam", "cavern"];
var MG_PART = {
drift: { n: "a new drift", t: "Drift", d: "a tunnel driven on through the rock, timbered and railed" },
seam: { n: "a new seam", t: "Seam", d: "a side cut where the ore runs thick; anyone may work it" },
gallery: { n: "a gallery", t: "Gallery", d: "a great room cut out of the rock, its roof held up on pillars left standing" },
vug: { n: "a crystal pocket", t: "Crystal pocket", d: "a hollow in the rock lined with crystals that grew there in the dark" },
stope: { n: "a stope", t: "Stope", d: "a tall working where the ore was followed upward, with timber staging to the roof" },
cavern: { n: "the great cavern", t: "The great cavern", d: "a natural cavern the miners broke into at last, with a still pool and the roof lost in the dark" }
};
function mgSteps() { return (MG.steps && MG.steps.length) ? MG.steps : MG_STEPS; }
function mgStage(dug) { var S = mgSteps(), n = 0; for (var i = 0; i < S.length; i++)
if ((+dug || 0) >= S[i])
n = i + 1; return n; }
function mgOrdinal(n) { return ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth"][n - 1] || (n + "th"); }
function mgSeamParts() { var out = []; MG_SEQ.forEach(function (k, i) { if (k === "seam" || k === "vug" || k === "stope" || k === "cavern")
out.push(i); }); return out; }
function mgSeamKind(kinds, crystal, i) {
var k = MG_SEQ[i];
if (k === "vug" && crystal)
return crystal;
var j = mgSeamParts().indexOf(i);
return kinds[Math.max(0, j) % kinds.length];
}
function mgRock(key) { return __ZC(346, 0, this, arguments, new.target); }
var MG_SITES = {
"The Deep Workings": { key: "The Deep Workings", name: "the Deep Workings", short: "the Deep Workings", kinds: ["cr_ore", "cr_coal"], crystal: "cr_crystal", mount: "ud", seed: 11 },
"The Deepdelve Mines": { key: "The Deepdelve Mines", name: "the Deepdelve Mines", short: "the Deepdelve", kinds: ["cr_ore", "hx_deepsilver", "cr_coal", "hx_runestone"], crystal: "cr_crystal", mount: "ud", seed: 23 }
};
function mgRealmKinds(R) { return __ZC(346, 1, this, arguments, new.target); }
function mgRealmSite(R, b) { return __ZC(346, 2, this, arguments, new.target); }
function mgSlug(key) { return String(key || "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 40); }
function mgSpotId(site, i) { return "mg_" + mgSlug(site.key) + "_" + i; }
function mgLayout(site, stage) { return __ZC(346, 3, this, arguments, new.target); }
function mgPartAt(L, x, z) {
if (z > -12)
return "the mouth of the new workings";
if (z < L.face + 6.5)
return "the working face";
for (var i = 0; i < L.parts.length; i++) {
var P = L.parts[i];
if (z <= P.z1 && z >= P.z0)
return "the " + mgOrdinal(P.i + 1) + " part dug: " + MG_PART[P.k].t.toLowerCase();
}
return "the new workings";
}
function mgWalkable(L, x, z) { return __ZC(346, 4, this, arguments, new.target); }
function mgHash(x, y, z, s) { var h = Math.sin(x * 127.1 + y * 311.7 + z * 74.7 + s * 19.19) * 43758.5453; return h - Math.floor(h); }
function mgPush(x, y, z, s) {
if (y <= 0)
return [x, 0, z];
var a = 0.36, b = 0.24;
return [x + (mgHash(x, y, z, s) - 0.5) * 2 * a, y + (mgHash(z, x, y, s + 3) - 0.5) * 2 * b, z + (mgHash(y, z, x, s + 7) - 0.5) * 2 * a];
}
function mgRockGeo(L, s) { return __ZC(346, 5, this, arguments, new.target); }
var MG_MATC = {};
function mgMat(col, kind, o) { return __ZC(346, 6, this, arguments, new.target); }
function mgLite() { return typeof LITE !== "undefined" && !!LITE; }
function mgBoxM(G, w, h, d, mat, x, y, z, ry) { var g = new THREE.BoxGeometry(w, h, d); if (mat.map && typeof metreUVs === "function")
metreUVs(g, "box", [w, h, d]); var m = new THREE.Mesh(g, mat); m.position.set(x, y, z); if (ry)
m.rotation.y = ry; G.add(m); return m; }
function mgCylM(G, rt, rb, h, mat, x, y, z, seg) { var g = new THREE.CylinderGeometry(rt, rb, h, seg || 10); var m = new THREE.Mesh(g, mat); m.position.set(x, y, z); G.add(m); return m; }
function mgFurn(G, k, x, z, ry, s) { if (typeof FURN === "undefined" || !FURN[k])
return null; var g; try {
g = FURN[k]();
}
catch (e) {
return null;
} if (s)
g.scale.setScalar(s); g.position.set(x, 0, z); g.rotation.y = ry || 0; G.add(g); g.traverse(function (m) { if (m.material && m.material.userData)
m.material.userData.noPhoto = 1; }); return g; }
function mgGlow(G, col, size, op, x, y, z) { if (typeof wGlow !== "function")
return null; var s = wGlow(col, size, op); s.position.set(x, y, z); G.add(s); return s; }
function mgLamp(G, x, y, z) { mgCylM(G, 0.12, 0.16, 0.3, mgMat(0xFFC870, null, { basic: 1 }), x, y, z, 8); mgCylM(G, 0.18, 0.18, 0.05, mgMat(0x3A3A3E, "metal"), x, y + 0.18, z, 8); mgGlow(G, 0xFFB860, 2.4, 0.5, x, y, z); }
function mgLump(G, r, h, mat, x, z, seed, y) { return __ZC(346, 7, this, arguments, new.target); }
function mgBuild(site, stage, o) { return __ZC(346, 8, this, arguments, new.target); }
var MG_UD = {
"The Deep Workings": { area: "mg_deep", ox: -8000, oz: 0 },
"The Deepdelve Mines": { area: "mg_delve", ox: -8400, oz: 0 }
};
function mgUdDoor(key) {
if (key === "The Deep Workings")
return { area: "mine", x: 5.95, z: -52, y: 0, rot: -Math.PI / 2, stand: { x: 3.6, z: -52, yaw: Math.PI / 2 }, back: "the Deep Workings" };
if (typeof UDD === "undefined")
return null;
return { area: "deep", x: UDD.DX + 359.9, z: UDD.Zn - 130, y: UDD.Yf, rot: -Math.PI / 2, stand: { x: UDD.DX + 356.4, z: UDD.Zn - 130, yaw: Math.PI / 2 }, back: "the Deepdelve's north gallery" };
}
function mgPortal(G, x, y, z, rot, name) { return __ZC(346, 9, this, arguments, new.target); }
function mgUdSetup() {
if (typeof udxArea !== "function" || typeof UDX === "undefined")
return;
Object.keys(MG_UD).forEach(function (key) {
var U = MG_UD[key], site = MG_SITES[key];
if (UDX.by[U.area])
return;
udxArea({ key: U.area, name: "the new workings of " + site.name, kind: "inside", x0: U.ox - 17, x1: U.ox + 17, z0: U.oz - 262, z1: U.oz + 2, y0: -3, y1: 16,
env: typeof UDX_ENV_DWARF !== "undefined" ? UDX_ENV_DWARF : undefined,
place: function (x, z) { var M = U.built; return "the new workings of " + site.name + (M ? " · " + mgPartAt(M.L, x - U.ox, z - U.oz) : ""); },
build: function (A) { mgUdBuild(A, key); } });
});
}
function mgUdBuild(A, key) { return __ZC(346, 10, this, arguments, new.target); }
function mgSpotName(S) { return S.kind === "back" ? "The way back" : S.kind === "boss" ? "The shift boss" : S.kind === "face" ? "The face" : MG_PART[MG_SEQ[S.seam.i]].t; }
function mgSpotVerb(S) { return S.kind === "back" ? "go back up" : S.kind === "boss" ? "ask how far they have dug" : S.kind === "face" ? "look" : S.seam.vug ? "prise out a crystal" : "work the seam"; }
function mgUdRebuild(key) {
var U = MG_UD[key], A = U && U.A;
if (!A || !A.built)
return;
if (U.built && U.built.g && U.built.g.parent)
U.built.g.parent.remove(U.built.g);
try {
mgUdBuild(A, key);
if (typeof ppBake === "function")
ppBake(U.built.g, 40);
}
catch (e) {
if (window.console)
console.warn("[mine growth]", e);
}
}
function mgUdGo(key) {
var U = MG_UD[key];
if (!U || typeof udxGo !== "function")
return;
if (U.A && U.A.built && U.stage !== mgStageOf(key))
mgUdRebuild(key);
udxGo(U.area, U.ox, U.oz - 2.6, 0, null);
MG.cur = { kind: "ud", key: key };
mgFirstSay(key);
}
function mgUdBack(key) {
var D = mgUdDoor(key);
if (!D || typeof udxGo !== "function")
return;
udxGo(D.area, D.stand.x, D.stand.z, D.stand.yaw, "<b>Back in " + esc(D.back) + ".</b>");
MG.cur = null;
}
function mgUdDoors() {
if (typeof UDX === "undefined" || !UDX.by)
return;
Object.keys(MG_UD).forEach(function (key) {
var U = MG_UD[key];
if (U.door)
return;
var D = mgUdDoor(key), A = D && UDX.by[D.area];
if (!A || !A.built || !A.g)
return;
mgPortal(A.g, D.x, D.y, D.z, D.rot, MG_SITES[key].name.charAt(0).toUpperCase() + MG_SITES[key].name.slice(1));
var T = { x: D.stand.x + 0.9, z: D.stand.z, r: 2.8, name: "The New Workings", verb: "go in (dug by the miners)", fn: function () { mgUdGo(key); } };
A.talk.push(T);
if (UD.talkers.indexOf(T) < 0)
UD.talkers.push(T);
U.door = T;
});
}
mgUdSetup();
var MG_GR_X = -20000;
(function () {
if (typeof grInsideBuild !== "function")
return;
var ib = grInsideBuild;
grInsideBuild = function (site, idx) {
var I = ib.apply(this, arguments);
try {
if (site && site.b && site.b.t === "mine")
mgGrCage(I, site);
}
catch (e) {
if (window.console)
console.warn("[mine growth] cage", e);
}
return I;
};
if (typeof grGround === "function") {
var gg = grGround;
grGround = function (x, z, feet) { if (x < -15000)
return 0; return gg.apply(this, arguments); };
}
if (typeof grBlock === "function") {
var gb = grBlock;
grBlock = function (x, z, feet) { if (x < -15000) {
var C = MG.cur;
if (!C || C.kind !== "gr" || !C.mount || !C.mount.M)
return true;
return !mgWalkable(C.mount.M.L, x - C.mount.ox, z - C.mount.oz);
} return gb.apply(this, arguments); };
}
if (typeof grRoomAt === "function") {
var gr = grRoomAt;
grRoomAt = function (I, x, z) { if (x < -15000) {
var C = MG.cur;
return { name: "the new workings" + (C && C.mount && C.mount.M ? " · " + mgPartAt(C.mount.M.L, x - C.mount.ox, z - C.mount.oz) : "") };
} return gr.apply(this, arguments); };
}
})();
function mgGrCage(I, site) { return __ZC(346, 11, this, arguments, new.target); }
function mgGrMount(site) {
var R = GR.R, idx = Math.max(0, GR.sites.indexOf(site));
return site.mg || (site.mg = { site: mgRealmSite(R, site.b), ox: MG_GR_X - idx * 400, oz: 0, realm: R.key, M: null, stage: -1 });
}
function mgGrBuild(site) { return __ZC(346, 12, this, arguments, new.target); }
function mgGrGo(site) { return __ZC(346, 13, this, arguments, new.target); }
function mgGrBack(site) { return __ZC(346, 14, this, arguments, new.target); }
function mgTick() {
var C = MG.cur;
if (!C)
return;
if (C.kind === "gr") {
var m = C.mount, gone = typeof WLD === "undefined" || !WLD.on || WLD.on !== m.realm || typeof worldLocal !== "function" || worldLocal().x > -15000;
if (gone) {
if (m.M)
m.M.g.visible = false;
if (GR.inside && GR.inside === C.site.I)
C.site.I.g.visible = true;
MG.cur = null;
return;
}
}
else if (C.kind === "ud") {
var U = MG_UD[C.key];
if (typeof WLD === "undefined" || WLD.on !== "underdark" || !U || UDX.here !== U.A) {
MG.cur = null;
return;
}
}
var M = C.kind === "gr" ? C.mount.M : MG_UD[C.key].built, n = Date.now();
if (M)
M.L.seams.forEach(function (S) { if (S.glow)
S.glow.visible = !(MG.picked[mgSpotId(MG_SITES[C.key] || C.mount.site, S.i)] > n); });
}
setInterval(function () { try {
mgUdDoors();
mgTick();
}
catch (e) {
if (!MG.e1) {
MG.e1 = 1;
if (window.console)
console.warn("[mine growth]", e);
}
} }, 500);
function mgRpc(name, args) { return typeof cityRpc === "function" ? cityRpc(name, args || {}) : Promise.reject(new Error("offline")); }
function mgSay(h) { if (typeof setStatus === "function")
setStatus(h); }
function mgKeeper() { try {
return (typeof isKeeperNow === "function" && isKeeperNow()) || (typeof amKeeper === "function" && amKeeper());
}
catch (e) {
return false;
} }
function mgSigned() { try {
return typeof signedIn === "function" && signedIn();
}
catch (e) {
return false;
} }
function mgMissing(e) { var m = String((e && e.message) || e || ""); return /function|404|schema cache|PGRST202|does not exist/i.test(m); }
function mgSave() { try {
localStorage.setItem("sm.mg.board", JSON.stringify(MG.board));
}
catch (e) { } }
function mgDug(key) { var r = MG.board[key]; return r ? (+r.dug || 0) : 0; }
function mgStageOf(key) { return mgStage(mgDug(key)); }
function mgLoad(force) {
if (MG.busy || (!force && Date.now() - MG.at < 90000))
return Promise.resolve(MG.board);
MG.busy = true;
MG.at = Date.now();
return mgRpc("mine_board").then(function (o) {
MG.busy = false;
if (!o || !o.ok)
return MG.board;
MG.missing = false;
if (o.steps && o.steps.length)
MG.steps = o.steps.map(function (n) { return +n; });
var was = {};
Object.keys(MG.board).forEach(function (k) { was[k] = mgStageOf(k); });
MG.board = {};
(o.mines || []).forEach(function (r) { MG.board[r.key] = { dug: +r.dug || 0, name: r.name }; });
mgSave();
Object.keys(MG.board).forEach(function (k) { if (was[k] !== undefined && was[k] !== mgStageOf(k))
mgGrew(k, false); });
return MG.board;
}).catch(function (e) { MG.busy = false; if (mgMissing(e))
MG.missing = true; return MG.board; });
}
function mgGrew(key, say) { return __ZC(346, 15, this, arguments, new.target); }
(function () {
if (typeof cityRpc !== "function")
return;
var cr = cityRpc;
cityRpc = function (name, body) {
var p = cr.apply(this, arguments);
if (name === "do_task" && body && body.p_job != null) {
var j = ((typeof WORK !== "undefined" && WORK.data && WORK.data.jobs) || []).filter(function (x) { return +x.job_id === +body.p_job; })[0];
if (j && /miner|quarr/i.test(j.title || ""))
p.then(function (o) { if (o && o.ok)
setTimeout(function () { mgDig(body.p_job); }, 700); }).catch(function () { });
}
return p;
};
})();
function mgDig(job) { return __ZC(346, 16, this, arguments, new.target); }
function mgFirstSay(key) { return __ZC(346, 17, this, arguments, new.target); }
function mgSpot(S, where) {
if (S.kind === "back") {
if (where.kind === "ud")
mgUdBack(where.key);
else
mgGrBack(where.site);
return;
}
var key = where.kind === "ud" ? where.key : where.site.mg.site.key;
if (S.kind === "boss" || S.kind === "face") {
mgBossCard(key, S.kind === "face");
return;
}
if (S.kind === "seam")
mgGather(S.seam, key);
}
function mgBossCard(key, face) { return __ZC(346, 18, this, arguments, new.target); }
function mgPartsCard(key) { return __ZC(346, 19, this, arguments, new.target); }
function mgBossTalk(key) { return __ZC(346, 20, this, arguments, new.target); }
function mgKeeperSet(key, dug) { return __ZC(346, 21, this, arguments, new.target); }
function mgGather(seam, key) { return __ZC(346, 22, this, arguments, new.target); }
function mgPickedSave() { try {
var n = Date.now(), o = {};
Object.keys(MG.picked).forEach(function (k) { if (MG.picked[k] > n)
o[k] = MG.picked[k]; });
MG.picked = o;
localStorage.setItem("sm.mg.picked", JSON.stringify(o));
}
catch (e) { } }
setTimeout(function () { mgLoad(true); }, 8000);
setInterval(function () { if (MG.cur)
mgLoad(false); }, 30000);
