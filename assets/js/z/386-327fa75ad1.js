/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(386, function () {
return [
function (base, mine, fresh) {
var J = function (o) { return JSON.stringify(o === undefined ? null : o); }, out = Object.assign({}, fresh || {});
base = base || {};
mine = mine || {};
Object.keys(Object.assign({}, base, mine)).forEach(function (k) { if (k !== "cams" && J(mine[k]) !== J(base[k])) {
if (mine[k] === undefined)
delete out[k];
else
out[k] = mine[k];
} });
var by = function (L) { var m = {}; (Array.isArray(L) ? L : []).forEach(function (c) { if (c && c.id)
m[c.id] = c; }); return m; };
var B = by(base.cams), M = by(mine.cams), F = by(out.cams), cams = [];
(Array.isArray(out.cams) ? out.cams : []).forEach(function (c) {
if (!c || !c.id)
return;
if (B[c.id] && !M[c.id])
return;
cams.push(M[c.id] && J(M[c.id]) !== J(B[c.id]) ? M[c.id] : c);
});
(Array.isArray(mine.cams) ? mine.cams : []).forEach(function (c) { if (c && c.id && !B[c.id] && !F[c.id])
cams.push(c); });
out.cams = cams.slice(0, 24);
return out;
},
function (base, mine) {
var go = function () { var V = rcamMerge(base, mine, rcamCfg()); return putCloudConfig("roku_cams", V).then(function () { if (typeof DW_CLOUD !== "undefined" && DW_CLOUD.config)
DW_CLOUD.config.roku_cams = V; return V; }); };
return (typeof loadCloudConfig === "function" ? loadCloudConfig().catch(function () { }) : Promise.resolve()).then(go);
},
function () {
if (typeof store !== "undefined" && store.inside)
return { no: "Cameras stand outdoors only: step outside first. (Inside a building could be somebody's home.)" };
if (typeof MALL !== "undefined" && MALL && MALL.on)
return { no: "Not in the World Mall: the shops are indoors." };
if (typeof UG2 !== "undefined" && UG2 && UG2.on)
return { no: "Not in the Underground." };
var P = camera.position;
if (typeof WLD !== "undefined" && WLD && WLD.on && WLD.w) {
var key = WLD.on, dk = (typeof dgrWhere === "function") ? dgrWhere() : key;
if (RCAM_PRIVATE[key] || RCAM_PRIVATE[dk])
return { no: "Not here: this is somebody's own place." };
return { where: key, x: P.x - WLD.w.base, y: P.y, z: P.z, name: (typeof dgrNameOf === "function" ? dgrNameOf(dk) : key) };
}
if (typeof inHallRealm === "function" && inHallRealm()) {
var m = (typeof hallMiddle === "function") ? hallMiddle() : null;
if (!m)
return { no: "The Hall of Doors isn't ready yet: try again in a moment." };
return { where: "hall", x: P.x - m.x, y: P.y, z: P.z - m.z, name: "The Hall of Doors" };
}
if (typeof inSomnucorRealm === "function" && inSomnucorRealm()) {
var h = rcamHeart();
if (!h)
return { no: "The city isn't ready yet: try again in a moment." };
return { where: "city", x: P.x - h.x, y: P.y, z: P.z - h.z, name: "Somnucor" };
}
return { no: "Not in anybody's own dream: cameras go in the city, the Hall of Doors or the worlds." };
},
function () {
var W = rcamWhereNow();
if (W.no) {
setStatus("📷 " + esc(W.no));
return;
}
var c = rcamCfg(), cams = Array.isArray(c.cams) ? c.cams.slice() : [];
if (cams.length >= 24) {
setStatus("📷 That is 24 cameras, the most there can be. Take one away in admin → In the game → Roku cameras first.");
return;
}
var n = 1;
while (cams.some(function (k) { return k.name === W.name + " " + n; }))
n++;
var cam = { id: "c" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), name: W.name + " " + n, where: W.where,
x: Math.round(W.x * 100) / 100, y: Math.round(W.y * 100) / 100, z: Math.round(W.z * 100) / 100,
yaw: Math.round(yaw * 1000) / 1000, pitch: Math.round(pitch * 1000) / 1000, on: true };
cams.push(cam);
var V = Object.assign({}, c, { cams: cams });
setStatus("📷 Placing a camera…");
rcamSaveCfg(c, V).then(function () {
setStatus("📷 <b>" + esc(cam.name) + "</b> placed, looking the way you are looking. Rename it, turn it off or take it away in admin → In the game → Roku cameras.");
}).catch(function (e) { setStatus("📷 The camera wasn't placed: " + esc((e && e.message) || e)); });
},
function (t) {
RCAM.err = t || "";
if (!RCAM.box) {
var b = document.createElement("div");
b.id = "rcam-box";
b.style.cssText = "position:fixed;left:10px;bottom:10px;z-index:9999;max-width:min(440px,90vw);padding:8px 12px;border-radius:6px;background:rgba(10,12,20,.82);color:#E8DFC8;font:12.5px/1.5 system-ui,sans-serif;pointer-events:none";
document.body.appendChild(b);
RCAM.box = b;
}
var list = RCAM.cams.map(function (k) { var a = RCAM.last[k.id]; return "<div>" + (RCAM.cur && RCAM.cur.id === k.id ? "▶ " : "· ") + esc(k.name) + (a ? " <span style='opacity:.6'>" + Math.round((Date.now() - a) / 1000) + " s ago</span>" : "") + "</div>"; }).join("");
RCAM.box.innerHTML = "<b>📷 Roku camera tab</b> · leave this tab open and the cameras keep sending pictures." +
(t ? "<div style='color:#FFD27A;margin-top:4px'>" + t + "</div>" : "") + "<div style='margin-top:4px'>" + (list || "No cameras turned on yet.") + "</div>" +
"<div style='opacity:.6;margin-top:4px'>" + RCAM.sent + " pictures sent</div>";
},
function (cam) {
if (cam.where === "city") {
var h = rcamHeart();
return h ? { x: h.x + cam.x, y: cam.y, z: h.z + cam.z } : null;
}
if (cam.where === "hall") {
var m = (typeof hallMiddle === "function") ? hallMiddle() : null;
return m ? { x: m.x + cam.x, y: cam.y, z: m.z + cam.z } : null;
}
var W = (typeof WORLDS !== "undefined") ? WORLDS[cam.where] : null;
return W ? { x: W.base + cam.x, y: cam.y, z: cam.z } : null;
},
function (cam) {
if (typeof store !== "undefined" && store.inside && typeof exitInterior === "function")
exitInterior(true);
if (!walkMode && typeof setWalk === "function")
setWalk(true);
var moved = false;
if (cam.where === "city" || cam.where === "hall") {
if (WLD.on) {
worldOff(true);
moved = true;
}
if (cam.where === "city" && !inSomnucorRealm()) {
var r = somnucorRealm();
if (!r)
return null;
if (typeof visitRealm === "function")
visitRealm(r.id);
else
toSomnucor();
if (!walkMode && typeof setWalk === "function")
setWalk(true);
moved = true;
}
if (cam.where === "hall" && !inHallRealm()) {
toHall();
moved = true;
}
}
else if (WLD.on !== cam.where) {
if (!WORLDS[cam.where])
return null;
worldGo(cam.where, { keepFrom: true });
moved = true;
}
var P = rcamSpot(cam);
if (!P)
return null;
camera.position.set(P.x, P.y, P.z);
yaw = +cam.yaw || 0;
pitch = +cam.pitch || 0;
return moved;
},
function () {
try {
if (typeof store !== "undefined" && store.inside && typeof exitInterior === "function")
exitInterior(true);
if (typeof WLD !== "undefined" && WLD.on && typeof worldOff === "function")
worldOff(true);
if (typeof inSomnucorRealm === "function" && inSomnucorRealm())
return true;
var r = (typeof somnucorRealm === "function") ? somnucorRealm() : null;
if (!r) {
rcamSay("Somnucor isn't built on this device yet, so the cameras can't start.");
return false;
}
if (typeof visitRealm === "function")
visitRealm(r.id);
else if (typeof toSomnucor === "function")
toSomnucor();
if (!walkMode && typeof setWalk === "function")
setWalk(true);
return true;
}
catch (e) {
rcamSay("Couldn't open the city: " + esc((e && e.message) || e));
return false;
}
},
function () {
var src = renderer.domElement, sw = src.width, sh = src.height;
if (!sw || !sh)
return null;
var c = RCAM.cv || (RCAM.cv = document.createElement("canvas"));
c.width = RCAM_W;
c.height = RCAM_H;
var x = c.getContext("2d"), s = Math.max(RCAM_W / sw, RCAM_H / sh), w = RCAM_W / s, h = RCAM_H / s;
x.drawImage(src, (sw - w) / 2, (sh - h) / 2, w, h, 0, 0, RCAM_W, RCAM_H);
return c;
},
function (cam) {
var src = renderer.domElement, sw = src.width, sh = src.height;
if (!sw || !sh)
return;
var c = RCAM.liveCv || (RCAM.liveCv = document.createElement("canvas"));
if (c.width !== RCAM_W) {
c.width = RCAM_W;
c.height = RCAM_H;
}
var s = Math.max(RCAM_W / sw, RCAM_H / sh), w = RCAM_W / s, h = RCAM_H / s;
c.getContext("2d").drawImage(src, (sw - w) / 2, (sh - h) / 2, w, h, 0, 0, RCAM_W, RCAM_H);
RCAM.liveId = cam.id;
RCAM.liveN++;
},
function () {
var c = rcamCfg(), F = { at: new Date().toISOString(), every: Math.max(5, +c.every || 15),
cams: RCAM.cams.map(function (k) { return { id: k.id, name: k.name, place: k.where, kind: k.drone ? "drone" : "fixed", img: "cam-" + k.id + ".jpg", at: RCAM.last[k.id] ? new Date(RCAM.last[k.id]).toISOString() : null }; }) };
return rcamPut("feed.json", JSON.stringify(F), "application/json");
},
function () {
if (typeof window.rokuCamSink === "function")
return true;
if (typeof isKeeperNow === "function" && isKeeperNow())
return true;
if (typeof signedIn === "function" && signedIn() && typeof checkKeeper === "function" && !RCAM.kBusy && Date.now() - (RCAM.kAsk || 0) > 15000) {
RCAM.kBusy = true;
RCAM.kAsk = Date.now();
checkKeeper().then(function () { RCAM.kBusy = false; }, function () { RCAM.kBusy = false; });
}
return false;
},
function () {
var now = Date.now();
if (RCAM.stage === "wait") {
if (!rcamReady())
return;
if (!rcamKeeperOk()) {
if (now - (RCAM.kAt || 0) > 5000) {
RCAM.kAt = now;
rcamSay("Only the Keeper can run the cameras. Sign in as the Keeper in the game on this computer, then open this again.");
}
return;
}
if (typeof joinSomnucor === "function" && ((typeof joinedSomnucor === "function" && !joinedSomnucor()) || (typeof somnucorRealm === "function" && !somnucorRealm()))) {
joinSomnucor();
RCAM.t0 = now;
RCAM.stage = "join";
return;
}
rcamToCity();
RCAM.stage = "next";
return;
}
if (RCAM.stage === "join") {
if (rcamReady() && now - RCAM.t0 > 6000 && (typeof somnucorRealm !== "function" || somnucorRealm())) {
rcamToCity();
RCAM.stage = "next";
}
else if (now - RCAM.t0 > 60000) {
rcamSay("The city would not build on this device. Reload this page; if it keeps happening, open the game here once and walk into Somnucor.");
RCAM.t0 = now;
}
return;
}
if (now - RCAM.cfgAt > 60000) {
RCAM.cfgAt = now;
if (typeof loadCloudConfig === "function")
loadCloudConfig().catch(function () { });
}
var c = rcamCfg();
if (RCAM.stage === "next") {
RCAM.cams = rcamList();
if (c.off || !RCAM.cams.length) {
RCAM.cur = null;
RCAM.spot = null;
rcamToCity();
rcamSay(c.off ? "The Keeper has the cameras turned off (admin → In the game → Roku cameras)." : "No cameras yet. In the game, stand somewhere public and choose ☰ Menu → 📷 Place a Roku camera here.");
RCAM.t0 = now;
RCAM.stage = "idle";
return;
}
var held = RCAM.live ? RCAM.cams.map(function (k) { return k.id; }).indexOf(RCAM.live) : -1;
if (RCAM.live && held < 0)
RCAM.live = null;
RCAM.i = held >= 0 ? held : (RCAM.i + 1) % RCAM.cams.length;
var cam = RCAM.cams[RCAM.i], moved;
var goal = (cam.drone && typeof rdrGoal === "function") ? rdrGoal(cam) : cam;
try {
moved = rcamGo(goal);
}
catch (e) {
moved = null;
}
if (moved === null) {
RCAM.last[cam.id] = RCAM.last[cam.id] || 0;
rcamSay("Couldn't get to " + esc(cam.name) + ": skipped.");
return;
}
var back = RCAM.seen[cam.id] && now - RCAM.seen[cam.id] < 4 * 60 * 1000;
if (RCAM.cur === cam && held >= 0 && RCAM.spot) {
RCAM.t0 = now;
RCAM.settle = 0;
RCAM.stage = "settle";
return;
}
RCAM.cur = cam;
RCAM.spot = rcamSpot(goal);
rcamPeople(goal, RCAM.spot);
if (cam.drone && typeof rdrArrived === "function")
rdrArrived(cam);
RCAM.t0 = now;
RCAM.settle = moved ? 9000 : back ? 900 : 2500;
RCAM.stage = "settle";
rcamSay(RCAM.err && /Keeper|bucket|Sign in/.test(RCAM.err) ? RCAM.err : "");
return;
}
if (RCAM.stage === "idle") {
if (now - RCAM.t0 > 15000)
RCAM.stage = "next";
return;
}
if (RCAM.stage === "settle") {
if (now - RCAM.t0 < RCAM.settle)
return;
var cam2 = RCAM.cur;
RCAM.stage = "shoot";
RCAM.want = function (cv) {
if (!cv) {
RCAM.stage = "next";
return;
}
try {
var sn = RCAM.snap[cam2.id] || (RCAM.snap[cam2.id] = document.createElement("canvas"));
sn.width = 480;
sn.height = 270;
sn.getContext("2d").drawImage(cv, 0, 0, 480, 270);
sn._at = Date.now();
}
catch (e) { }
RCAM.seen[cam2.id] = Date.now();
RCAM.t0 = Date.now();
RCAM.stage = "gap";
if (RCAM.putting && Date.now() - RCAM.putting < 20000)
return;
cv.toBlob(function (b) {
if (!b)
return;
RCAM.putting = Date.now();
rcamPut("cam-" + cam2.id + ".jpg", b, "image/jpeg").then(function () {
RCAM.last[cam2.id] = Date.now();
RCAM.sent++;
if (Date.now() - RCAM.feedAt > 20000 || RCAM.sent <= RCAM.cams.length) {
RCAM.feedAt = Date.now();
return rcamFeed();
}
}).then(function () { rcamSay(""); }, function (e) { rcamSay(esc((e && e.message) || e)); })
.then(function () { RCAM.putting = false; });
}, "image/jpeg", 0.72);
};
return;
}
if (RCAM.stage === "gap") {
var per = Math.max(5, +c.every || 15) * 1000 / Math.max(1, RCAM.cams.length);
if (RCAM.live && RCAM.cur && RCAM.cur.id === RCAM.live) {
if (now - RCAM.t0 > 5000)
RCAM.stage = "next";
return;
}
if (now - RCAM.t0 > Math.max(0, per - RCAM.settle))
RCAM.stage = "next";
}
},
function (cam, want, k) {
var o = RDR.pose[cam.id], now = performance.now(), dt = Math.min(0.5, (now - (RDR.at[cam.id] || now)) / 1000);
RDR.at[cam.id] = now;
if (!o || Math.hypot(o.x - want.x, o.z - want.z) > 120) {
RDR.pose[cam.id] = { x: want.x, y: want.y, z: want.z };
return RDR.pose[cam.id];
}
var f = Math.min(1, dt * (k || 2.5));
o.x += (want.x - o.x) * f;
o.y += (want.y - o.y) * f;
o.z += (want.z - o.z) * f;
return o;
},
function (cam, t, C, r, h) {
var job = !!r;
C = C || rcamSpot(cam);
if (!C)
return null;
if (!r && cam.fx != null && cam.fz != null)
return rdrFront(cam, t, C);
r = r || rdrN(cam.r, 22, 4, 250);
h = h || rdrN(cam.h, 8, 1, 150);
var v = rdrN(cam.spd, 5, 0.5, 60), a = t * v / r + rdrSeed(cam.id);
var p = rdrAbove(cam.where, { x: C.x + Math.cos(a) * r, y: C.y + h, z: C.z + Math.sin(a) * r }, 4);
return (!job && rdrPerson(cam, C, p, t)) || rdrLook(p, { x: C.x, y: C.y - 1, z: C.z });
},
function (cam, t, C) {
var s = rdrN(cam.s, 10, 1, 80), w = rdrN(cam.w, 20, 2, 160), bh = rdrN(cam.bh, 10, 2, 160), fl = Math.hypot(+cam.fx || 0, +cam.fz || 0) || 1, fx = (+cam.fx || 0) / fl, fz = (+cam.fz || 0) / fl;
var T = { x: C.x + fx * s * 0.9, y: C.y + Math.min(6, bh * 0.25), z: C.z + fz * s * 0.9 };
var F = rdrFrontRoom(cam, C, T, fx, fz, s, w, bh);
var sw = Math.sin(t * rdrN(cam.spd, 5, 0.5, 60) / 120 + rdrSeed(cam.id)) * F.sway, c = Math.cos(sw), si = Math.sin(sw), ux = fx * c - fz * si, uz = fx * si + fz * c;
var p = rdrAbove(cam.where, { x: T.x + ux * F.d, y: C.y + F.h, z: T.z + uz * F.d }, 4);
return rdrPerson(cam, T, p, t) || rdrLook(p, T);
},
function (cam, T, base, t) {
if (cam.where !== "city" || typeof store === "undefined" || !store || !store.characters || typeof meshes === "undefined" || store.inside)
return null;
var W = RDR.who || (RDR.who = {}), slot = Math.floor(t / 25 + rdrSeed(cam.id)), w = W[cam.id];
if (!w || (w.slot !== slot && Date.now() >= (w.next || 0)) || (w.id && !rdrPplAt(w.id))) {
var near = [];
store.characters.forEach(function (c) {
if (!c || c.visible === false || c.deity || (c.archetype !== "human" && c.archetype !== "child"))
return;
var m = meshes[c.objId];
if (!m || !m.visible || !m.parent)
return;
var d = Math.hypot((+c.x || 0) - T.x, (+c.z || 0) - T.z);
if (d < 36)
near.push({ id: c.objId, d: d });
});
near.forEach(function (q) { var P = rdrPplAt(q.id); q.b = P ? Math.hypot(P.x - base.x, P.z - base.z) : 1e9; });
near.sort(function (a, b) { return a.b - b.b; });
near = near.slice(0, 4);
w = W[cam.id] = { slot: slot, id: null, chk: 0, next: 0 };
for (var k = 0; k < near.length; k++) {
var q = near[(slot + k) % near.length], P = rdrPplAt(q.id);
if (P && rdrPplGround(P) && P.y < base.y - 1 && q.b < 60 && rdrPplClear(rdrPplHover(base, P), P)) {
w.id = q.id;
break;
}
}
}
var P2 = w.id ? rdrPplAt(w.id) : null;
if (P2 && Date.now() - w.chk > 1000) {
w.chk = Date.now();
if (!rdrPplClear(rdrPplHover(base, P2), P2)) {
w.id = null;
P2 = null;
w.slot = -1;
w.next = Date.now() + 1000;
}
}
var aim = P2 ? { x: P2.x, y: P2.y + 1.1, z: P2.z } : T, A = RDR.aim || (RDR.aim = {}), o = A[cam.id], now = performance.now(), dt = o ? Math.min(0.5, (now - o.at) / 1000) : 1;
if (!o || Math.hypot(o.x - aim.x, o.z - aim.z) > 150) {
o = A[cam.id] = { x: aim.x, y: aim.y, z: aim.z, f: 0 };
}
var f = Math.min(1, dt * 2.5);
o.x += (aim.x - o.x) * f;
o.y += (aim.y - o.y) * f;
o.z += (aim.z - o.z) * f;
o.at = now;
var dist = Math.hypot(o.x - base.x, o.y - base.y, o.z - base.z);
if (P2)
o.zm = Math.max(10, Math.min(50, 2 * Math.atan(2.6 / Math.max(1, dist)) * 180 / Math.PI));
o.f += ((P2 ? 1 : 0) - o.f) * f;
if (P2)
o.up = rdrPplHover(base, P2).y - base.y;
var at = { x: base.x, y: base.y + (o.up || 0) * o.f, z: base.z };
var L = rdrLook(at, o);
if (o.f > 0.02 && o.zm) {
L.fov = o.zm;
L.zoom = o.f;
}
return P2 || o.f > 0.02 ? L : null;
},
function (S, P) {
try {
var from = new THREE.Vector3(S.x, S.y, S.z), dir = new THREE.Vector3(P.x - S.x, P.y + 1.2 - S.y, P.z - S.z), L = dir.length();
dir.normalize();
var ray = new THREE.Raycaster(from, dir, 0.5, Math.max(0.6, L - 1.2));
if (typeof camera !== "undefined")
ray.camera = camera;
if (typeof bakeRayPick === "function" && bakeRayPick(ray.ray, Math.max(0.6, L - 1.2)))
return false;
return !ray.intersectObjects(scene.children, true).some(function (x) { var o = x.object; return o && o.visible && o.isMesh && !(o.userData && o.userData.rdr); });
}
catch (e) {
return true;
}
},
function (cam, C, T, fx, fz, s, w, bh) {
RDR.room = RDR.room || {};
var key = cam.id + ":" + Math.round(C.x) + "," + Math.round(C.z);
var was = RDR.room[key];
if (was && (was.n >= 3 || Date.now() - was.at < 20000))
return was;
var want = Math.max(14, w * 0.6 + bh * 0.2), h = Math.min(30, Math.max(7, bh * 0.3 + 4)), out = { d: want, h: h, sway: 0.35 };
try {
if (typeof THREE === "undefined" || typeof scene === "undefined" || !scene)
throw 0;
var ray = new THREE.Raycaster(), from = new THREE.Vector3(), dir = new THREE.Vector3();
var clear = function (d, hh) {
from.set(T.x, T.y, T.z);
dir.set(fx * d, C.y + hh - T.y, fz * d);
var L = dir.length();
dir.normalize();
ray.set(from, dir);
ray.near = 1.5;
ray.far = L + 2;
var hit = ray.intersectObjects(scene.children, true).filter(function (x) { var o = x.object; return o && o.visible && o.isMesh && !(o.userData && o.userData.rdr); })[0];
return hit ? hit.distance : Infinity;
};
var tries = [[want, h], [want * 0.75, h], [want, h + 8], [want * 0.6, h + 4], [want * 0.5, h + 12], [want * 0.8, h + 18]], best = null;
tries.some(function (q) { if (clear(q[0], q[1]) >= Math.hypot(q[0], q[1])) {
best = { d: q[0], h: q[1], sway: 0.25 };
return true;
} return false; });
if (best)
out = best;
}
catch (e) { }
out.at = Date.now();
out.n = (was ? was.n : 0) + 1;
RDR.room[key] = out;
return out;
},
function (cam, t) {
var pts = rdrStops(cam);
if (pts.length < 2)
return rdrOrbit(cam, t);
var h = rdrN(cam.h, 6, 1, 150), v = rdrN(cam.spd, 8, 0.5, 60), L = 0;
pts = pts.map(function (q) { return { x: q.x, y: q.y + h, z: q.z }; });
for (var i = 0; i < pts.length; i++) {
var a = pts[i], b = pts[(i + 1) % pts.length];
L += Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z);
}
if (L < 1)
return rdrOrbit(cam, t);
var s = t * v + rdrSeed(cam.id) * L / 6.283, p = rdrAbove(cam.where, rdrAlong(pts, s, L), 4), q = rdrAlong(pts, s + 16, L);
return rdrLook(p, { x: q.x, y: q.y - 5, z: q.z });
},
function (cam) {
if (typeof WLD === "undefined" || WLD.on !== "race" || typeof PY === "undefined" || typeof PYT === "undefined" || !PYT)
return null;
var f = String(cam.follow || "leader");
if (f === "dreamer")
for (var id in PY.ghosts) {
var G = PY.ghosts[id];
if (G && !G.gone && G.g && PY.t - G.seen < 4)
return { x: PY.base + (G.dx !== undefined ? G.dx : G.x), y: G.y, z: (G.dz !== undefined ? G.dz : G.z), h: G.h };
}
var L = PY.riv.filter(function (R) { return !R.dead; }).sort(function (a, b) { return (b.run || 0) - (a.run || 0); });
if (!L.length)
return null;
var i = f === "2" ? 1 : f === "3" ? 2 : f === "last" ? L.length - 1 : 0, R = L[Math.min(i, L.length - 1)];
return { x: PY.base + R.x, y: R.y, z: R.z, h: R.h };
},
function (cam, t) {
if (typeof evtLiveList !== "function" || typeof evtCity !== "function" || !evtCity())
return rdrOrbit(cam, t);
var L = evtLiveList(), e = L.filter(function (x) { return x.kind === "parade"; })[0] || L.filter(function (x) { return x.kind === "festival" || x.kind === "gathering"; })[0];
if (!e)
return rdrOrbit(cam, t);
if (e.kind === "parade") {
var R = evtRingR(e.ring), W = EVT.W && EVT.W[e.id], len = (W && W.len) || 90, me = RDR.pose[cam.id] || camera.position;
var head = evtParadeHead(e, R, me, len), a = head + 24 / R, mid = head - len / 2 / R;
var want = rdrAbove("city", { x: ATLC.x + Math.cos(a) * (R + 16), y: 0, z: ATLC.z + Math.sin(a) * (R + 16) }, 12);
var p = rdrEase(cam, want, 1.5), gy = (typeof terrainY === "function") ? terrainY(ATLC.x + Math.cos(mid) * R, ATLC.z + Math.sin(mid) * R) : p.y - 12;
return rdrLook(p, { x: ATLC.x + Math.cos(mid) * R, y: gy + 1.5, z: ATLC.z + Math.sin(mid) * R });
}
var c = evtSpot(e), gy2 = (typeof terrainY === "function") ? terrainY(c.x, c.z) : 0;
return rdrOrbit(cam, t, { x: c.x, y: gy2 + 1.72, z: c.z }, 40, 16);
},
function (row) {
if (!row || row.away)
return null;
var pl = String(row.place || "out"), m;
if (pl === "out")
return { where: "city", x: +row.x || 0, z: +row.z || 0, ground: true };
if (/^hall:/.test(pl))
return { where: "hall", x: +row.x || 0, y: 1.72, z: +row.z || 0 };
if ((m = /^world:([A-Za-z0-9_]+)$/.exec(pl)) && typeof WORLDS !== "undefined" && WORLDS[m[1]] && !RCAM_PRIVATE[m[1]])
return { where: m[1], x: +row.x || 0, y: (+row.level || 0) + 1.72, z: +row.z || 0 };
return null;
},
function (every) {
if (RDR.rowsBusy || Date.now() - RDR.rowsAt < (every || 5000) || typeof cityRpc !== "function")
return;
RDR.rowsBusy = true;
RDR.rowsAt = Date.now();
cityRpc("list_presence", { p_realm: "somnucor" }).then(function (rows) { var M = {}; (rows || []).forEach(function (r) { if (r && r.user_id)
M[r.user_id] = r; }); RDR.rows = M; })
.catch(function () { }).then(function () { RDR.rowsBusy = false; });
},
function (cam, t) {
var p0 = (typeof presenceOthers !== "undefined") ? presenceOthers[cam.who] : null, g = p0 && p0.group, T = null, rot = 0;
if (g && g.parent && g.visible) {
T = { x: g.position.x, y: g.position.y + 1.6, z: g.position.z };
rot = g.rotation.y;
}
else {
var W = rdrPlayerAt(cam), S = W && rcamSpot(W);
if (S) {
T = S;
rot = +(RDR.rows[cam.who].rot) || 0;
}
}
if (!T)
return rdrOrbit(cam, t);
var fx = -Math.sin(rot), fz = -Math.cos(rot);
var p = rdrEase(cam, { x: T.x - fx * 7, y: T.y + 4.5, z: T.z - fz * 7 }, 2.2);
return rdrLook(p, { x: T.x, y: T.y - 0.4, z: T.z });
},
function () {
pyRaceClear();
pyRivalsMake(7, true, null);
var s = 0;
PY.riv.forEach(function (Rv) {
var g = pyGridSpot(s++);
Rv.d = g.d;
Rv.across = Rv.tAcross = g.across;
Rv.i = Math.max(0, PYT.S.length - 30);
Rv.run = -g.back;
Rv.goal = 0;
var A = pySampleAt(Rv);
Rv.x = g.x;
Rv.z = g.z;
Rv.y = A.y;
Rv.h = g.h;
});
PY.race = { ev: "death", st: "on", show: true, t: 0, laps: 2, lap: 0, cpi: 0, place: 1, alive: 8, kills: 0, outs: [], pen: 0, prev: 0, prog: -1e9, sp: null, started: Date.now() };
RDR.endAt = 0;
},
function () {
if (typeof WLD === "undefined" || WLD.on !== "race" || typeof pyRivalsMake !== "function" || typeof PYT === "undefined" || !PYT || !PYT.S)
return;
var R = PY.race, now = Date.now();
if (R && !R.show)
return;
if (R) {
var alive = PY.riv.filter(function (x) { return !x.dead; }).length, done = PY.riv.some(function (x) { return x.done !== null; });
if ((alive <= 1 || done || R.t > 480) && !RDR.endAt)
RDR.endAt = now;
if (RDR.endAt && now - RDR.endAt > 20000) {
RDR.showAt = now;
rdrShowStart();
}
return;
}
var el = RDR.showAt ? (now - RDR.showAt) / 1000 : 0;
if (!RDR.showAt || el > 420) {
RDR.showAt = now;
el = 0;
}
rdrShowStart();
if (el > 2) {
var dt = Math.max(0.1, el / 3000);
PY.race.st = "out";
for (var t = 0; t < el; t += dt)
pyRivalsTick(dt);
PY.race.st = "on";
PY.race.t = el;
}
},
function (cam, hide) {
var B = RDR.bodies[cam.id];
if (B)
B.visible = !hide && B.userData.want;
if (typeof camera !== "undefined" && camera)
camera.children.forEach(function (c) { if (hide) {
c.userData.rdrWas = c.visible;
c.visible = false;
}
else if (c.userData.rdrWas !== undefined) {
c.visible = c.userData.rdrWas;
delete c.userData.rdrWas;
} });
if (typeof PY !== "undefined" && PY.on && !rcamCfg().names) {
PY.riv.forEach(function (R) { if (R.tag && !R.dead)
R.tag.visible = !hide; });
for (var id in PY.ghosts) {
var G = PY.ghosts[id];
if (G && G.tag)
G.tag.visible = !hide;
}
}
},
function (armed, parcel) {
rdrKit();
var M = RDR.m, G = RDR.g, g = new THREE.Group(), add = function (geo, mat, x, y, z) { var m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); g.add(m); return m; };
add(G.body, M.dark, 0, 0, 0);
add(G.arm, M.dark, 0, 0.02, 0).rotation.y = Math.PI / 4;
add(G.arm, M.dark, 0, 0.02, 0).rotation.y = -Math.PI / 4;
[[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(function (q) { add(G.rotor, M.rotor, q[0] * 0.53, 0.09, q[1] * 0.53).rotation.x = -Math.PI / 2; });
add(G.dot, M.red, -0.53, 0.02, -0.53);
add(G.dot, M.green, 0.53, 0.02, -0.53);
add(G.dot, M.white, 0, 0.1, 0.38);
add(G.lens, M.lens, 0, -0.14, -0.22);
if (armed) {
var b = add(G.gun, M.gun, 0, -0.16, -0.42);
b.rotation.x = Math.PI / 2;
}
if (parcel) {
g.userData.parcel = add(G.box, M.box, 0, -0.42, 0);
}
g.traverse(function (o) { o.raycast = function () { }; o.castShadow = false; });
g.scale.setScalar(1.6);
g.userData.armed = !!armed;
g.userData.want = true;
return g;
},
function (where) {
if (typeof store !== "undefined" && store.inside)
return false;
if (typeof MALL !== "undefined" && MALL && MALL.on)
return false;
if (typeof UG2 !== "undefined" && UG2 && UG2.on)
return false;
if (where === "city")
return !(typeof WLD !== "undefined" && WLD.on) && typeof inSomnucorRealm === "function" && inSomnucorRealm();
if (where === "hall")
return !(typeof WLD !== "undefined" && WLD.on) && typeof inHallRealm === "function" && inHallRealm();
return typeof WLD !== "undefined" && WLD.on === where;
},
function (kind, then) {
rdrKit();
var P = camera.position, from;
var T = (kind === "deliver" && typeof rhbFrame === "function") ? rhbFrame() : null;
if (T && typeof rdrHereIs === "function" && rdrHereIs("city") && Math.hypot(T.x - P.x, T.z - P.z) < 3000)
from = { x: T.x, y: RHB.deckY || T.y + 180, z: T.z };
else
from = { x: P.x + 40, y: P.y + 70, z: P.z - 40 };
var g = rdrBody(kind === "stun", kind === "deliver");
scene.add(g);
var F = { g: g, t: 0, st: performance.now(), fly: kind === "deliver" ? Math.min(9, 2.5 + Math.hypot(from.x - P.x, from.z - P.z) / 220) : 2.4, hold: kind === "deliver" ? 2.2 : kind === "stun" ? 2.6 : 4.5, from: from, then: then };
if (kind === "stun") {
F.beam = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1, 6), new THREE.MeshBasicMaterial({ color: 0x7AD8FF, transparent: true, opacity: 0.55 }));
F.beam.visible = false;
scene.add(F.beam);
}
if (kind === "deliver")
F.box = g.userData.parcel;
RDR.fx.push(F);
return F;
},
function (r) {
if (RCAM.mode || !r || !r.body)
return;
var b = r.body, t = b.t;
if (typeof playTone === "function")
try {
playTone(t === "stun" ? 260 : t === "deliver" ? 720 : 520, 0.18);
}
catch (e) { }
if (t === "warn") {
rdrSendTo("warn");
setStatus("🛸 <b>A Tower drone:</b> " + esc(String(b.note || "The Tower is watching. Mind how you go.").slice(0, 200)));
}
else if (t === "stun") {
var P = camera.position;
RDR.freeze = { x: P.x, y: P.y, z: P.z, until: Date.now() + 5000 };
rdrSendTo("stun");
setStatus("⚡ <b>A Tower drone stuns you.</b>" + (b.note ? " " + esc(String(b.note).slice(0, 200)) : ""));
}
else if (t === "safe") {
rdrSendTo("warn", function () {
if (typeof WLD !== "undefined" && WLD.on && WLD.w && WLD.arrive) {
var W = WLD.w, A = WLD.arrive, gy = 0;
try {
if (W.ground)
gy = +W.ground(A.x, A.z, 0) || 0;
}
catch (e) { }
camera.position.set(W.base + A.x, gy + 1.72, A.z);
if (typeof flyY !== "undefined")
flyY = 0;
}
setStatus("🛸 <b>A Tower drone carries you back to the way in.</b>" + (b.note ? " " + esc(String(b.note).slice(0, 200)) : ""));
});
setStatus("🛸 <b>A Tower drone comes for you.</b>");
}
else if (t === "deliver")
rdrDelivered([{ id: b.id, what: b.what, note: b.note }]);
},
function (list) {
list.forEach(function (d, i) {
setTimeout(function () {
rdrSendTo("deliver", function () {
setStatus("📦 <b>A Tower drone drops off a package" + (d.what ? ": " + esc(String(d.what).slice(0, 80)) : "") + ".</b>" + (d.note ? " " + esc(String(d.note).slice(0, 200)).replace(/([^.!?])$/, "$1.") : "") + " It is in your Backpack.");
});
setStatus("📦 A Tower drone is on its way to you…");
}, i * 14000);
});
var ids = list.map(function (d) { return +d.id; }).filter(function (x) { return x > 0; });
if (ids.length && typeof cityRpc === "function")
cityRpc("drone_seen", { p_ids: ids }).catch(function () { });
},
function (job, extra) {
var W = rcamWhereNow();
if (W.no) {
setStatus("🛸 " + esc(W.no));
return;
}
var c = rcamCfg(), cams = Array.isArray(c.cams) ? c.cams.slice() : [];
if (cams.length >= 24) {
setStatus("🛸 That is 24 cameras and drones, the most there can be. Take one away in admin → In the game → Roku cameras first.");
return;
}
var base = "Drone · " + W.name, n = 1;
while (cams.some(function (k) { return k.name === base + " " + n; }))
n++;
var d = Object.assign({ id: "d" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), name: base + " " + n, where: W.where,
x: Math.round(W.x * 100) / 100, y: Math.round(W.y * 100) / 100, z: Math.round(W.z * 100) / 100, yaw: Math.round(yaw * 1000) / 1000, pitch: Math.round(pitch * 1000) / 1000,
on: true, drone: true, job: job, r: 22, h: job === "patrol" ? 6 : 8, spd: job === "patrol" ? 8 : 5, route: [] }, extra || {});
cams.push(d);
rdrSave(cams, "🛸 <b>" + esc(d.name) + "</b> is up: " + esc(RDR_JOBS[job] || job).toLowerCase() + ". Change it in admin → In the game → Roku cameras.");
},
function (id) {
var W = rcamWhereNow();
if (W.no) {
setStatus("🛸 " + esc(W.no));
return;
}
var c = rcamCfg(), cams = (Array.isArray(c.cams) ? c.cams : []).map(function (k) { return Object.assign({}, k); }), d = cams.filter(function (k) { return k.id === id; })[0];
if (!d)
return;
if (d.where !== W.where) {
setStatus("🛸 That drone patrols somewhere else.");
return;
}
d.route = (Array.isArray(d.route) ? d.route : []).concat([{ x: Math.round(W.x * 100) / 100, y: Math.round(W.y * 100) / 100, z: Math.round(W.z * 100) / 100 }]).slice(0, 30);
rdrSave(cams, "🛸 Stop " + (d.route.length + 1) + " added to <b>" + esc(d.name) + "</b>'s patrol.");
},
function () {
var out = [], C = rcamCfg(), cams = C.off ? [] : rcamList().filter(function (k) { return k.drone; });
Object.keys(RDR.rows || {}).forEach(function (id) {
var row = RDR.rows[id], W = rdrRowWhere(row);
if (!W)
return;
var d = cams.filter(function (k) { return k.job === "player" ? k.who === id : (k.where === W.where && rdrSees(k, W.x, W.z)); })[0];
if (d)
out.push({ id: id, name: row.name || "a dreamer", where: W.where, drone: d.name });
});
return out;
},
function (force) {
if (!force && Date.now() - RDR.flagsAt < 120000)
return Promise.resolve(RDR.flags);
RDR.flagsAt = Date.now();
return cityRpc("drone_flags_board", {}).then(function (o) { RDR.flags = {}; ((o && o.rows) || []).forEach(function (f) { RDR.flags[f.user_id] = f; }); return RDR.flags; }).catch(function () { RDR.flags = RDR.flags || {}; return RDR.flags; });
},
function () {
var el = document.getElementById("rdr-card");
if (!RDR.open) {
if (el)
el.style.display = "none";
return;
}
if (!el) {
el = document.createElement("div");
el.id = "rdr-card";
el.style.cssText = "position:fixed;left:50%;top:calc(70px + env(safe-area-inset-top,0px));transform:translateX(-50%);z-index:58;width:min(480px,calc(100vw - 24px));max-height:calc(100vh - 110px);overflow:auto;background:rgba(10,14,24,.97);color:#EEF4FF;border:1px solid #4A8AC8;border-radius:10px;padding:14px 16px;font:14px/1.45 system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.55)";
el.addEventListener("click", function (ev) { var b = ev.target.closest && ev.target.closest("[data-rdr]"); if (!b)
return; ev.stopPropagation(); rdrDo(b.getAttribute("data-rdr"), b.getAttribute("data-rdrv")); });
document.body.appendChild(el);
}
el.style.display = "block";
var W = rcamWhereNow(), here = W.no ? null : W.where, armed = here && rdrArmed(here), C = rcamCfg(), cams = Array.isArray(C.cams) ? C.cams : [];
var h = '<div style="display:flex;justify-content:space-between;align-items:center"><b style="font-size:16px">🛸 Drones</b>' + rdrB("Close", "close") + '</div>';
if (W.no)
h += '<div style="color:#FFD27A;margin-top:6px">' + esc(W.no) + '</div>';
else {
h += '<div style="opacity:.8">Here: ' + esc(W.name) + (armed ? ' · <b style="color:#FFB08A">your drones are armed here</b>' : '') + '</div>';
h += rdrH("Send a drone up here") + rdrB("🔄 Circle this spot", "up", "orbit") + rdrB("🧭 Patrol from here", "up", "patrol");
if (here === "race")
h += "<div>" + rdrB("🏁 Chase the leader", "race", "leader") + rdrB("2nd", "race", "2") + rdrB("3rd", "race", "3") + rdrB("Last car running", "race", "last") + rdrB("A dreamer's car", "race", "dreamer") + "</div>";
if (here === "city")
h += rdrB("🎺 Ride with parades and events", "up", "event");
var pats = cams.filter(function (k) { return k.drone && k.job === "patrol" && k.where === here; });
if (pats.length)
h += rdrH("Add this spot to a patrol") + pats.map(function (k) { return rdrB("➕ " + esc(k.name) + " (" + (1 + ((k.route || []).length)) + " stops)", "stop", k.id); }).join("");
}
var near = rdrNear();
h += rdrH("Follow a dreamer") + (near.length ? near.map(function (o) { return rdrB("👤 " + esc(o.name), "follow", o.id + "|" + o.name); }).join("") : '<div style="opacity:.7">Nobody near you just now.</div>');
h += rdrH("👁 Who the drones see") + '<div style="opacity:.75;font-size:12.5px">Dreamers near you and near your drones. Only you see this.</div>';
h += '<input id="rdr-note" maxlength="200" placeholder="Words the drone says (optional)" style="width:100%;box-sizing:border-box;border-radius:6px;border:1px solid #4A6A9A;background:#141C2C;color:#EEF4FF;padding:6px;margin:6px 0">';
var ids = {};
near.forEach(function (o) { ids[o.id] = o.name; });
if (RDR.rows)
rdrSeenAll().forEach(function (s) { if (!ids[s.id])
ids[s.id] = s.name; });
var keys = Object.keys(ids).slice(0, 20);
if (!keys.length)
h += '<div style="opacity:.7">Nobody in sight.</div>';
keys.forEach(function (id) {
var I = RDR.info[id] || {}, f = RDR.flags && RDR.flags[id];
h += '<div style="border-top:1px solid rgba(255,255,255,.1);padding:6px 0"><b>' + esc(I.name || ids[id]) + '</b>' + (f ? ' <span style="color:#FF8A6A">🚩 ' + esc(f.why || "flagged") + '</span>' : '') +
'<div style="font-size:12.5px;opacity:.85">' + (I.loaded ? [I.keeper ? "the Keeper" : I.member ? "member" : "visitor", I.adult ? "grown-up" : "young", I.job ? "works: " + esc(I.job) : "no job", I.where ? esc(rkPlaceName(I.where)) + (I.level ? " (danger " + I.level + ")" : "") : ""].filter(Boolean).join(" · ") : "looking…") + '</div>' +
rdrB(f ? "Unflag" : "🚩 Flag", "flag", id) + rdrB("⚠️ Warn", "warn", id) + (armed ? rdrB("⚡ Stun", "stun", id, true) + rdrB("🏠 Send to the way in", "safe", id, true) : "") + '</div>';
});
el.innerHTML = h;
var miss = keys.filter(function (id) { return !RDR.info[id]; });
if (miss.length && !RDR.whoBusy) {
RDR.whoBusy = true;
cityRpc("drone_who", { p_ids: miss }).then(function (o) { ((o && o.rows) || []).forEach(function (r) { r.loaded = true; RDR.info[r.id] = r; }); miss.forEach(function (id) { if (!RDR.info[id])
RDR.info[id] = { loaded: true }; }); })
.catch(function (e) { miss.forEach(function (id) { RDR.info[id] = { loaded: true }; }); if (typeof rpcMissing === "function" && rpcMissing(e))
setStatus("🛸 Run the latest server update in Supabase to switch on what the drones see and do."); })
.then(function () { RDR.whoBusy = false; if (RDR.open)
rdrCard(); });
}
},
function (a, v) {
if (a === "close") {
RDR.open = false;
rdrCard();
return;
}
if (a === "up")
return rdrPlace(v);
if (a === "race")
return rdrPlace("race", { follow: v, r: 40, h: 22 });
if (a === "stop")
return rdrAddStop(v);
if (a === "follow") {
var p = String(v).split("|");
return rdrPlace("player", { who: p[0], whoName: p.slice(1).join("|") });
}
var note = ((document.getElementById("rdr-note") || {}).value || "").trim();
if (a === "flag") {
var on = !(RDR.flags && RDR.flags[v]), why = on ? (note || "watch for them") : null;
cityRpc("drone_flag", { p_user: v, p_why: why }).then(function (o) {
if (o && o.ok === false) {
setStatus("🛸 " + esc(o.say || "Not done."));
return;
}
setStatus(on ? "🚩 Flagged: the drones will tell you when they see them." : "Unflagged.");
return rdrFlagsLoad(true);
})
.catch(function (e) { setStatus("🛸 " + esc((e && e.message) || e)); }).then(function () { rdrCard(); });
return;
}
if (a === "warn" || a === "stun" || a === "safe") {
var W = rcamWhereNow(), w = W.no ? null : W.where;
cityRpc("drone_act", { p_to: v, p_act: a, p_w: w, p_note: note || null, p_body: {} }).then(function (o) {
setStatus(o && o.ok ? "🛸 " + esc(o.say || "Done.") : "🛸 " + esc((o && o.say) || "Not done."));
}).catch(function (e) { setStatus("🛸 " + (typeof rpcMissing === "function" && rpcMissing(e) ? "Run the latest server update in Supabase first." : esc((e && e.message) || e))); });
}
},
function (a, b) {
var geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(a.x, a.y - 0.3, a.z), new THREE.Vector3(b.x, 1.3, b.z)]);
var L = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0x9FE8FF, transparent: true, opacity: 0.85 }));
L.raycast = function () { };
THXF.F.add(L);
RDA.beams.push({ L: L, t: 0.25 });
},
function (cam) {
if (typeof cinWanted !== "function")
return null;
var L = [];
try {
L = (cinWanted() || []).filter(function (w) { return w && !w.gone; });
}
catch (e) {
return null;
}
if (!L.length)
return null;
if (cam.caseId)
return L.filter(function (w) { return String(w.id) === String(cam.caseId); })[0] || null;
L = L.filter(function (w) { return w.drones; });
if (!L.length)
return null;
var n = rdaRoostNo(cam) || 1;
return L[(n - 1) % L.length];
},
function (cs) {
var p = null;
try {
p = (typeof cinCulpritNow === "function") ? cinCulpritNow(cs.id) : null;
}
catch (e) { }
p = p || cs;
if (!p || !isFinite(+p.x) || !isFinite(+p.z))
return null;
if (p.cover && RDA.seen[cs.id])
return RDA.seen[cs.id];
if (Object.keys(RDA.seen).length > 24)
RDA.seen = {};
RDA.seen[cs.id] = { x: +p.x, y: isFinite(+p.y) ? +p.y : (typeof terrainY === "function" ? terrainY(+p.x, +p.z) : 0), z: +p.z };
return { x: +p.x, y: isFinite(+p.y) ? +p.y : (typeof terrainY === "function" ? terrainY(+p.x, +p.z) : 0), z: +p.z };
},
function (cam, t) {
var cs = rdaCase(cam), S = cs ? rdaSuspectAt(cs) : null;
if (!S)
return rdrOrbit(cam, t, null, 30, 18);
var a = t * 0.12 + rdrSeed(cam.id);
var p = rdrEase(cam, rdrAbove("city", { x: S.x + Math.cos(a) * 12, y: S.y + 7, z: S.z + Math.sin(a) * 12 }, 4), 1.8);
if (RCAM.mode)
rdaReport(cam, cs, S);
return rdrLook(p, { x: S.x, y: S.y + 1, z: S.z });
},
function (cam, cs, S) {
if (typeof cinLocated !== "function")
return;
var k = cs.id + "", n = Date.now();
if (RDA.said[k] && n - RDA.said[k] < 10 * 60 * 1000)
return;
RDA.said[k] = n;
var where = "the city";
try {
var h = rcamHeart(), L = (typeof rdpPlaces === "function") ? rdpPlaces().filter(function (p) { return p.where === "city"; }) : [], bd = 1e9;
L.forEach(function (p) { var d = Math.hypot(h.x + p.x - S.x, h.z + p.z - S.z); if (d < bd) {
bd = d;
where = (d < 60 ? "by " : "near ") + p.n;
} });
}
catch (e) { }
try {
cinLocated(cs.id, where, cam.name || "Roost drone");
}
catch (e) { }
}
];
});
