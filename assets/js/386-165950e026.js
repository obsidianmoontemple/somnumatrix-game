/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var RCAM = { mode: null, cams: [], i: -1, cur: null, want: null, stage: "wait", t0: 0, settle: 0, last: {}, box: null, cv: null, err: "", sent: 0, feedAt: 0, cfgAt: 0,
live: null, liveCv: null, liveId: null, liveAt: 0, liveN: 0, snap: {}, seen: {}, putting: false, roll: 0, yawWas: null, poseAt: 0 };
var RCAM_BUCKET = "roku-cams", RCAM_W = 960, RCAM_H = 540;
var RCAM_PRIVATE = { family: 1, lounge: 1, sim: 1, dream: 1, estate: 1, estates: 1 };
function rcamCfg() {
var c = (typeof cloudSetting === "function") ? cloudSetting("roku_cams") : null;
return (c && typeof c === "object") ? c : {};
}
function rcamList() { var c = rcamCfg(); return (Array.isArray(c.cams) ? c.cams : []).filter(function (k) { return k && k.id && k.on !== false; }); }
function rcamMerge(base, mine, fresh) { return __ZC(386, 0, this, arguments, new.target); }
function rcamSaveCfg(base, mine) { return __ZC(386, 1, this, arguments, new.target); }
function rcamWhereNow() { return __ZC(386, 2, this, arguments, new.target); }
function rcamPlaceHere() { return __ZC(386, 3, this, arguments, new.target); }
(function () {
if (typeof PS_EXTRAS !== "undefined" && !PS_EXTRAS.some(function (e) { return e.id === "rcam-ps"; }))
PS_EXTRAS.push({ id: "rcam-ps", label: "📷 Place a Roku camera here", show: function () { return !RCAM.mode && typeof isKeeperNow === "function" && isKeeperNow(); }, run: function () { setTimeout(rcamPlaceHere, 10); } });
if (typeof PS_SECTIONS !== "undefined") {
var h = PS_SECTIONS.filter(function (s) { return s.k === "here"; })[0];
if (h && h.ids.indexOf("rcam-ps") < 0)
h.ids.push("rcam-ps");
}
})();
RCAM.mode = (function () { try {
var m = /[?&]rokucam=([a-z]+)/.exec(location.search || "");
return m ? m[1] : null;
}
catch (e) {
return null;
} })();
function rcamSay(t) { return __ZC(386, 4, this, arguments, new.target); }
function rcamStyle() {
var st = document.createElement("style");
st.textContent = "body.rcam-on>*:not(#world):not(#rcam-box):not(script):not(style){display:none!important}body.rcam-on{cursor:none}";
document.head.appendChild(st);
document.body.classList.add("rcam-on");
}
function rcamHeart() {
if (typeof ATLC !== "undefined" && ATLC)
return { x: ATLC.x, z: ATLC.z };
var r = (typeof somnucorRealm === "function") ? somnucorRealm() : null;
return (r && typeof heartOf === "function") ? heartOf(r.id) : null;
}
function rcamSpot(cam) { return __ZC(386, 5, this, arguments, new.target); }
function rcamGo(cam) { return __ZC(386, 6, this, arguments, new.target); }
function rcamPeople(cam, P) {
try {
if (!P || cam.where !== "city" || typeof seedBlock !== "function" || typeof PITCH === "undefined")
return;
seedBlock(Math.round(P.x / PITCH), Math.round(P.z / PITCH));
if (typeof balanceCrowds === "function" && typeof dreamHour === "function")
balanceCrowds(dreamHour());
}
catch (e) { }
}
function rcamToCity() { return __ZC(386, 7, this, arguments, new.target); }
function rcamGrab() { return __ZC(386, 8, this, arguments, new.target); }
function rcamLiveFrame(cam) { return __ZC(386, 9, this, arguments, new.target); }
function rcamLive(id) { RCAM.live = id || null; if (id && (!RCAM.cur || RCAM.cur.id !== id))
RCAM.stage = "next"; }
function rcamTagsHidden(hide) {
var names = !!rcamCfg().names;
if (typeof presenceOthers === "undefined")
return;
Object.keys(presenceOthers).forEach(function (id) {
var p = presenceOthers[id], G = p && p.group;
if (p && p.bubble)
p.bubble.visible = !hide;
if (G && G.userData && G.userData.tag)
G.userData.tag.visible = !hide || names;
});
}
if (RCAM.mode && typeof renderView === "function")
(function () {
var rv = renderView;
renderView = function () {
var cam = RCAM.cur, P = cam && RCAM.spot;
if (!P)
return rv.apply(this, arguments);
var Q = (cam.drone && typeof rdrPose === "function") ? rdrPose(cam) : null, roll = 0;
if (Q) {
var tn = performance.now() / 1000, dtp = RCAM.poseAt ? Math.min(0.2, tn - RCAM.poseAt) : 0;
RCAM.poseAt = tn;
var dy = RCAM.yawWas === null || RCAM.yawCam !== cam.id ? 0 : Math.atan2(Math.sin(Q.yaw - RCAM.yawWas), Math.cos(Q.yaw - RCAM.yawWas));
RCAM.yawWas = Q.yaw;
RCAM.yawCam = cam.id;
var want = dtp > 0 ? Math.max(-0.22, Math.min(0.22, -(dy / dtp) * 0.35)) : 0;
RCAM.roll += (want - RCAM.roll) * Math.min(1, dtp * 2.5);
roll = RCAM.roll;
camera.position.set(Q.x + Math.sin(tn * 0.7) * 0.12, Q.y + Math.sin(tn * 1.3) * 0.10, Q.z + Math.cos(tn * 0.53) * 0.12);
yaw = Q.yaw + Math.sin(tn * 0.41) * 0.006;
pitch = Q.pitch + Math.sin(tn * 0.9) * 0.005;
}
else {
camera.position.set(P.x, P.y, P.z);
yaw = +cam.yaw || 0;
pitch = +cam.pitch || 0;
}
camera.rotation.order = "YXZ";
camera.rotation.set(pitch, yaw, roll);
var fov0 = camera.fov, fz = Q && Q.fov && Q.zoom ? fov0 + (Q.fov - fov0) * Math.min(1, Q.zoom) : fov0;
if (fz !== fov0) {
camera.fov = fz;
camera.updateProjectionMatrix();
}
var me = (typeof meG !== "undefined" && meG) ? meG : null, mv = me && me.visible;
if (me)
me.visible = false;
rcamTagsHidden(true);
if (typeof rdrTabHide === "function")
rdrTabHide(cam, true);
(typeof gfxRender === "function" ? gfxRender() : renderer.render(scene, camera));
if (RCAM.want) {
var fn = RCAM.want;
RCAM.want = null;
try {
fn(rcamGrab());
}
catch (e) {
fn(null);
}
}
var nowL = performance.now();
if (RCAM.stage !== "wait" && RCAM.stage !== "join" && nowL - RCAM.liveAt > 30) {
try {
rcamLiveFrame(cam);
RCAM.liveAt = nowL;
}
catch (e) { }
}
rcamTagsHidden(false);
if (typeof rdrTabHide === "function")
rdrTabHide(cam, false);
if (me)
me.visible = mv;
if (fz !== fov0) {
camera.fov = fov0;
camera.updateProjectionMatrix();
}
};
})();
if (RCAM.mode && typeof cityRpc === "function")
(function () {
var cr = cityRpc, quiet = /^(upsert_presence|upsert_presence_at|clear_presence|publish_look|set_|save_|send_|post_|pay_|buy_|claim_|join_|take_|give_|book_|hire_|apply_|quit_|note_)/;
cityRpc = function (name) { if (quiet.test(String(name)))
return Promise.resolve(null); return cr.apply(this, arguments); };
if (typeof checkin === "function")
checkin = function () { };
if (typeof keepToAccount === "function")
keepToAccount = function () { return Promise.reject(new Error("the camera tab keeps nothing")); };
if (typeof syncAfterNight === "function")
syncAfterNight = function () { };
})();
function rcamSink() { return typeof window.rokuCamSink === "function" ? window.rokuCamSink : null; }
function rcamPut(path, body, type) {
var sink = rcamSink();
if (sink) {
if (typeof body === "string")
return Promise.resolve(sink(path, btoa(unescape(encodeURIComponent(body))), type));
return new Promise(function (res) { var fr = new FileReader(); fr.onload = function () { res(sink(path, String(fr.result).split(",")[1], type)); }; fr.readAsDataURL(body); });
}
if (typeof signedIn !== "function" || !signedIn())
return Promise.reject(new Error("Sign in as the Keeper in this browser (in the game), then reload this tab."));
return freshToken().then(function (tok) {
return fetch(DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/storage/v1/object/" + RCAM_BUCKET + "/" + path, { method: "POST",
headers: { apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + tok, "Content-Type": type, "x-upsert": "true", "cache-control": "max-age=5" }, body: body })
.then(function (r) {
if (r.ok)
return true;
return r.text().then(function (t) {
if (/not found|bucket/i.test(t))
throw new Error("The pictures bucket isn't there yet: run the latest server update in Supabase.");
if (/row-level|policy|unauthor|403/i.test(t + r.status))
throw new Error("Only the Keeper can send camera pictures: sign in as the Keeper in this browser.");
throw new Error(t || ("the pictures could not be sent (" + r.status + ")"));
});
});
});
}
function rcamFeed() { return __ZC(386, 10, this, arguments, new.target); }
function rcamReady() {
return typeof camera !== "undefined" && camera && typeof scene !== "undefined" && scene && typeof renderer !== "undefined" && renderer && typeof setWalk === "function" &&
!(typeof PERF_JOINING !== "undefined" && PERF_JOINING) && !(typeof ATL_JOB !== "undefined" && ATL_JOB);
}
function rcamKeeperOk() { return __ZC(386, 11, this, arguments, new.target); }
function rcamStep() { return __ZC(386, 12, this, arguments, new.target); }
if (RCAM.mode)
setTimeout(function () {
try {
rcamStyle();
if (renderer && renderer.setPixelRatio)
renderer.setPixelRatio(1);
}
catch (e) { }
rcamSay("Getting the city ready…");
setInterval(function () { try {
rcamStep();
}
catch (e) {
if (!RCAM.e1) {
RCAM.e1 = 1;
console.warn("[roku-cam]", e);
}
RCAM.stage = "next";
} }, 400);
setInterval(function () { try {
rcamSay(RCAM.err);
}
catch (e) { } }, 5000);
}, 3000);
var RDR = { pose: {}, at: {}, bodies: {}, m: null, g: null, rows: null, rowsAt: 0, rowsBusy: false, showAt: 0, endAt: 0, t0: 0, fx: [], freeze: null, got: {} };
var RDR_JOBS = { orbit: "Circles its spot", patrol: "Flies a patrol round", race: "Chases the race", event: "Rides with parades and events", player: "Follows one dreamer" };
function rdrN(v, d, lo, hi) { v = +v; if (!isFinite(v) || v <= 0)
v = d; return Math.max(lo, Math.min(hi, v)); }
function rdrSeed(id) { var h = 0; id = String(id || ""); for (var i = 0; i < id.length; i++)
h = (h * 31 + id.charCodeAt(i)) | 0; return (Math.abs(h) % 6283) / 1000; }
function rdrLook(p, t) {
var dx = t.x - p.x, dy = t.y - p.y, dz = t.z - p.z;
return { x: p.x, y: p.y, z: p.z, yaw: Math.atan2(-dx, -dz), pitch: Math.atan2(dy, Math.max(0.01, Math.hypot(dx, dz))) };
}
function rdrAbove(where, p, gap) {
if (where === "city" && typeof terrainY === "function") {
try {
p.y = Math.max(p.y, terrainY(p.x, p.z) + (gap || 3));
}
catch (e) { }
}
return p;
}
function rdrEase(cam, want, k) { return __ZC(386, 13, this, arguments, new.target); }
function rdrOrbit(cam, t, C, r, h) { return __ZC(386, 14, this, arguments, new.target); }
function rdrFront(cam, t, C) { return __ZC(386, 15, this, arguments, new.target); }
function rdrPerson(cam, T, base, t) { return __ZC(386, 16, this, arguments, new.target); }
function rdrPplHover(base, P) { var hd = Math.hypot(P.x - base.x, P.z - base.z); return { x: base.x, y: Math.max(base.y, Math.min(base.y + 20, P.y + 1.1 + hd * 0.58)), z: base.z }; }
function rdrPplGround(P) { if (typeof terrainY !== "function")
return true; try {
return Math.abs(P.y - terrainY(P.x, P.z)) < 2.5;
}
catch (e) {
return true;
} }
function rdrPplAt(id) { var m = meshes[id]; if (!m || !m.visible || !m.parent)
return null; try {
var v = new THREE.Vector3();
m.getWorldPosition(v);
return { x: v.x, y: v.y, z: v.z };
}
catch (e) {
return null;
} }
function rdrPplClear(S, P) { return __ZC(386, 17, this, arguments, new.target); }
function rdrFrontRoom(cam, C, T, fx, fz, s, w, bh) { return __ZC(386, 18, this, arguments, new.target); }
function rdrStops(cam) {
return [{ x: cam.x, y: cam.y, z: cam.z }].concat(Array.isArray(cam.route) ? cam.route : []).map(function (q) { return rcamSpot({ where: cam.where, x: +q.x || 0, y: +q.y || 0, z: +q.z || 0 }); }).filter(Boolean);
}
function rdrAlong(pts, s, L) {
s = ((s % L) + L) % L;
for (var i = 0; i < pts.length; i++) {
var a = pts[i], b = pts[(i + 1) % pts.length], d = Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z);
if (s <= d || i === pts.length - 1) {
var f = d > 0 ? Math.min(1, s / d) : 0;
return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f, z: a.z + (b.z - a.z) * f };
}
s -= d;
}
return pts[0];
}
function rdrPatrol(cam, t) { return __ZC(386, 19, this, arguments, new.target); }
function rdrRaceCar(cam) { return __ZC(386, 20, this, arguments, new.target); }
function rdrRace(cam, t) {
var c = rdrRaceCar(cam);
if (!c)
return rdrOrbit(cam, t, null, 40, 22);
var fx = -Math.sin(c.h), fz = -Math.cos(c.h);
var p = rdrEase(cam, { x: c.x - fx * 16, y: c.y + 7.5, z: c.z - fz * 16 }, 2.6);
return rdrLook(p, { x: c.x + fx * 14, y: c.y, z: c.z + fz * 14 });
}
function rdrEvent(cam, t) { return __ZC(386, 21, this, arguments, new.target); }
function rdrRowWhere(row) { return __ZC(386, 22, this, arguments, new.target); }
function rdrRowsTick(every) { return __ZC(386, 23, this, arguments, new.target); }
function rdrPlayerAt(cam) {
var W = rdrRowWhere(RDR.rows && RDR.rows[cam.who]);
if (!W)
return null;
if (W.ground) {
var h = rcamHeart();
W.y = (h && typeof terrainY === "function") ? terrainY(h.x + W.x, h.z + W.z) + 1.72 : 200;
}
return W;
}
function rdrPlayer(cam, t) { return __ZC(386, 24, this, arguments, new.target); }
function rdrPose(cam) {
var t = Date.now() / 1000;
try {
if (cam.job === "patrol")
return rdrPatrol(cam, t);
if (cam.job === "race")
return rdrRace(cam, t);
if (cam.job === "event")
return rdrEvent(cam, t);
if (cam.job === "player")
return rdrPlayer(cam, t);
return rdrOrbit(cam, t);
}
catch (e) {
return null;
}
}
function rdrGoal(cam) {
if (cam.job === "player") {
var W = rdrPlayerAt(cam);
if (W)
return { where: W.where, x: W.x, y: W.y, z: W.z, yaw: 0, pitch: 0 };
}
return cam;
}
function rdrShowStart() { return __ZC(386, 25, this, arguments, new.target); }
function rdrShowEnsure() { return __ZC(386, 26, this, arguments, new.target); }
function rdrArrived(cam) { if (cam.job === "race")
try {
rdrShowEnsure();
}
catch (e) { } }
function rdrTabHide(cam, hide) { return __ZC(386, 27, this, arguments, new.target); }
if (RCAM.mode) {
if (typeof pyRaceTick === "function")
(function () { var rt = pyRaceTick; pyRaceTick = function (dt) { if (typeof PY !== "undefined" && PY.race && PY.race.show) {
PY.race.t += dt;
return;
} return rt.apply(this, arguments); }; })();
if (typeof pyAllowedNow === "function")
pyAllowedNow = function () { return { ok: true }; };
["dgrHurt", "bwHurtMe", "dgbHurt", "cdmgHurt"].forEach(function (n) { if (typeof window[n] === "function")
window[n] = function () { }; });
setInterval(function () {
try {
var L = rcamList().filter(function (k) { return k.drone; });
if (L.some(function (k) { return k.job === "race"; }))
rdrShowEnsure();
if (L.some(function (k) { return k.job === "player"; }))
rdrRowsTick(4000);
if (L.some(function (k) { return k.job === "event"; }) && typeof evtLoad === "function")
evtLoad(false);
}
catch (e) { }
}, 1000);
}
function rdrKit() {
if (RDR.m)
return;
RDR.m = { dark: new THREE.MeshStandardMaterial({ color: 0x2A2E36, metalness: 0.6, roughness: 0.4 }),
rotor: new THREE.MeshBasicMaterial({ color: 0xA8B4C0, transparent: true, opacity: 0.32, side: THREE.DoubleSide, depthWrite: false }),
red: new THREE.MeshBasicMaterial({ color: 0xFF3A2A }), green: new THREE.MeshBasicMaterial({ color: 0x3AFF6A }), white: new THREE.MeshBasicMaterial({ color: 0xF4F8FF }),
lens: new THREE.MeshStandardMaterial({ color: 0x101014, metalness: 0.9, roughness: 0.15 }),
gun: new THREE.MeshStandardMaterial({ color: 0x3A2A26, emissive: 0xC8501A, emissiveIntensity: 0.5 }),
box: new THREE.MeshStandardMaterial({ color: 0xB8875A, roughness: 0.85 }) };
RDR.g = { body: new THREE.BoxGeometry(0.7, 0.18, 0.7), arm: new THREE.BoxGeometry(1.5, 0.06, 0.08), rotor: new THREE.CircleGeometry(0.34, 16),
dot: new THREE.SphereGeometry(0.06, 6, 4), lens: new THREE.SphereGeometry(0.15, 10, 8), gun: new THREE.CylinderGeometry(0.05, 0.05, 0.5, 6), box: new THREE.BoxGeometry(0.5, 0.4, 0.5) };
}
function rdrBody(armed, parcel) { return __ZC(386, 28, this, arguments, new.target); }
function rdrHereIs(where) { return __ZC(386, 29, this, arguments, new.target); }
function rdrArmed(where) {
if (where === "city" || where === "hall")
return false;
var lv = 0;
try {
lv = (typeof dgrLevelOf === "function") ? dgrLevelOf(where) : 0;
}
catch (e) { }
return lv >= 2;
}
function rdrBodiesTick() {
var C = rcamCfg(), keep = {}, me = (typeof myUserId === "function") ? myUserId() : null, P = camera.position;
var list = C.off ? [] : rcamList().filter(function (k) { return k.drone; });
list.forEach(function (cam) {
var Q = null;
if (cam.job === "player") {
if (RCAM.mode)
Q = RDR.pose[cam.id] ? rdrPose(cam) : null;
else if (me && cam.who === me && rdrRowWhere({ place: (typeof myPlace === "function" ? myPlace().place : "") })) {
var f = { x: -Math.sin(yaw), z: -Math.cos(yaw) }, t = Date.now() / 1000;
Q = { x: P.x - f.x * 6 + Math.sin(t * 0.7) * 0.8, y: P.y + 3.6 + Math.sin(t * 1.1) * 0.2, z: P.z - f.z * 6 + Math.cos(t * 0.6) * 0.8, yaw: yaw, pitch: -0.3 };
}
}
else if ((cam.job === "orbit" || cam.job === "patrol" || cam.job === "track" || !cam.job) && rdrHereIs(cam.where))
Q = rdrPose(cam);
else if (RCAM.mode && rdrHereIs(cam.where))
Q = rdrPose(cam);
if (!Q)
return;
if (!RCAM.mode && typeof LITE !== "undefined" && LITE && Math.hypot(Q.x - P.x, Q.z - P.z) > 120)
return;
var armed = rdrArmed(cam.where), B = RDR.bodies[cam.id];
if (B && B.userData.armed !== armed) {
scene.remove(B);
B = null;
}
if (!B) {
B = RDR.bodies[cam.id] = rdrBody(armed);
scene.add(B);
}
keep[cam.id] = 1;
B.userData.want = true;
B.visible = true;
B.position.set(Q.x, Q.y + Math.sin(Date.now() / 700 + rdrSeed(cam.id)) * 0.15, Q.z);
B.rotation.set(0, Q.yaw, 0);
});
for (var id in RDR.bodies)
if (!keep[id]) {
scene.remove(RDR.bodies[id]);
delete RDR.bodies[id];
}
}
var RHB = { g: null, body: null, lamp: null, n: 0, pos: null, col: null, spec: null, at: 0, m4: null, c: null, v: null };
var RHB_MAX = 80;
function rhbTower() {
var r = (typeof somnucorRealm === "function") ? somnucorRealm() : null;
if (!r || typeof store === "undefined" || !store.objects)
return null;
for (var i = 0; i < store.objects.length; i++) {
var o = store.objects[i];
if (o.archetype === "somnucortower" && o.realm === r.id)
return o;
}
return null;
}
function rhbFrame() {
var T = RHB.spec;
if (!T)
return null;
var s = T.s || T.scale || 1, y = ((typeof terrainY === "function") ? terrainY(T.x, T.z) : 0) + (T.y || 0);
return { x: T.x, z: T.z, y: y, s: s };
}
function rhbNight() {
try {
var h = (typeof cityHourNow === "function") ? cityHourNow() : (typeof dreamHour === "function" ? dreamHour() : 12);
return typeof isNightHour === "function" ? isNightHour(h) : (h >= 20.5 || h < 5.5);
}
catch (e) {
return false;
}
}
function rhbCount() {
var C = rcamCfg(), H = (C.hub && typeof C.hub === "object") ? C.hub : {}, cams = Array.isArray(C.cams) ? C.cams : [];
var off = cams.filter(function (k) { return k && k.drone && (C.off || k.on === false); }).length;
var fleet = H.fleet === undefined ? 40 : Math.max(0, Math.min(60, +H.fleet || 0));
var n = Math.min(RHB_MAX, off + fleet);
if (typeof LITE !== "undefined" && LITE && !RCAM.mode)
n = Math.min(n, 16);
return { n: n, show: H.show !== false };
}
function rhbBuild(F) {
rdrKit();
var s = F.s, G = new THREE.Group();
G.name = "drone hub";
RHB.g = G;
var deckY = F.y + 181 * s, deck = new THREE.Mesh(new THREE.TorusGeometry(8 * s, 1.1 * s, 8, 40), RDR.m.dark);
deck.rotation.x = Math.PI / 2;
deck.position.set(F.x, deckY, F.z);
G.add(deck);
var rim = new THREE.Mesh(new THREE.TorusGeometry(9.2 * s, 0.18 * s, 6, 48), new THREE.MeshBasicMaterial({ color: 0x6AE8FF }));
rim.rotation.x = Math.PI / 2;
rim.position.set(F.x, deckY + 0.4 * s, F.z);
G.add(rim);
for (var k = 0; k < 4; k++) {
var sp = new THREE.Mesh(new THREE.BoxGeometry(7 * s, 0.5 * s, 0.6 * s), RDR.m.dark);
sp.position.set(F.x + Math.cos(k * Math.PI / 2) * 4 * s, deckY, F.z + Math.sin(k * Math.PI / 2) * 4 * s);
sp.rotation.y = -k * Math.PI / 2;
G.add(sp);
}
RHB.deckY = deckY + 1.2 * s;
var bodyGeo = new THREE.BoxGeometry(1.4, 0.36, 1.4), lampGeo = new THREE.SphereGeometry(2, 10, 8), haloGeo = new THREE.SphereGeometry(5, 12, 8);
RHB.body = new THREE.InstancedMesh(bodyGeo, RDR.m.dark, RHB_MAX);
RHB.lamp = new THREE.InstancedMesh(lampGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }), RHB_MAX);
RHB.halo = new THREE.InstancedMesh(haloGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false }), RHB_MAX);
[RHB.lamp, RHB.halo].forEach(function (m) { m.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(RHB_MAX * 3).fill(1), 3); });
[RHB.body, RHB.lamp, RHB.halo].forEach(function (m) { m.frustumCulled = false; m.count = 0; m.raycast = function () { }; G.add(m); });
RHB.pos = new Float32Array(RHB_MAX * 3);
RHB.m4 = new THREE.Matrix4();
RHB.c = new THREE.Color();
RHB.v = null;
G.traverse(function (o) { o.raycast = function () { }; });
scene.add(G);
}
function rhbShape(k, i, n, t, F) {
var s = F.s * 2.4, y0 = F.y + 230 * F.s, TAU = Math.PI * 2, a, r, u;
if (k === 0) {
var ring = i % 3, per = Math.ceil(n / 3), j = Math.floor(i / 3);
a = j / per * TAU + t * 0.22 * (ring % 2 ? -1 : 1);
r = (18 + ring * 10) * s;
return [F.x + Math.cos(a) * r, y0 + ring * 8 * s, F.z + Math.sin(a) * r];
}
if (k === 1) {
u = i / n;
a = u * TAU * 3 + t * 0.35 + (i % 2) * Math.PI;
r = 16 * s;
return [F.x + Math.cos(a) * r, y0 - 28 * s + u * 72 * s, F.z + Math.sin(a) * r];
}
if (k === 2) {
a = i / n * TAU + t * 0.12;
r = (10 + 30 * Math.abs(Math.cos(3 * a))) * s;
return [F.x + Math.cos(a) * r, y0 + 10 * s + Math.sin(a * 2 + t * 0.5) * 5 * s, F.z + Math.sin(a) * r];
}
var phi = Math.acos(1 - 2 * (i + 0.5) / n), th = Math.PI * (1 + Math.sqrt(5)) * i + t * 0.18, R = (24 + 3 * Math.sin(t * 0.4)) * s;
return [F.x + Math.cos(th) * Math.sin(phi) * R, y0 + 14 * s + Math.cos(phi) * R, F.z + Math.sin(th) * Math.sin(phi) * R];
}
function rhbTick(dt) {
var inCity = !(typeof WLD !== "undefined" && WLD.on) && !(typeof store !== "undefined" && store.inside) && typeof inSomnucorRealm === "function" && inSomnucorRealm();
if (!inCity) {
if (RHB.g)
RHB.g.visible = false;
return;
}
if (!RHB.spec) {
if (Date.now() - RHB.at < 5000)
return;
RHB.at = Date.now();
RHB.spec = rhbTower();
if (!RHB.spec)
return;
}
var F = rhbFrame();
if (!F)
return;
if (!RHB.g)
rhbBuild(F);
var P = camera.position;
if (Math.hypot(P.x - F.x, P.z - F.z) > ((typeof LITE !== "undefined" && LITE) ? 1400 : 2600)) {
RHB.g.visible = false;
return;
}
RHB.g.visible = true;
var C = rhbCount(), n = C.n, night = C.show && rhbNight(), t = Date.now() / 1000;
var now = performance.now(), rdt = Math.min(1, (now - (RHB.t0 || now)) / 1000);
RHB.t0 = now;
var k = Math.floor(t / 75) % 4, f = 1 - Math.exp(-rdt * 1.1), first = !RHB.v;
if (first)
RHB.v = 1;
for (var i = 0; i < n; i++) {
var q;
if (night)
q = rhbShape(k, i, n, t, F);
else {
var a = i / Math.max(1, n) * Math.PI * 2;
q = [F.x + Math.cos(a) * 8 * F.s, RHB.deckY, F.z + Math.sin(a) * 8 * F.s];
}
var o = i * 3;
if (first || i >= RHB.n) {
RHB.pos[o] = q[0];
RHB.pos[o + 1] = q[1];
RHB.pos[o + 2] = q[2];
}
else {
RHB.pos[o] += (q[0] - RHB.pos[o]) * f;
RHB.pos[o + 1] += (q[1] - RHB.pos[o + 1]) * f;
RHB.pos[o + 2] += (q[2] - RHB.pos[o + 2]) * f;
}
RHB.m4.makeTranslation(RHB.pos[o], RHB.pos[o + 1], RHB.pos[o + 2]);
RHB.body.setMatrixAt(i, RHB.m4);
RHB.m4.makeTranslation(RHB.pos[o], RHB.pos[o + 1] - 0.3, RHB.pos[o + 2]);
RHB.lamp.setMatrixAt(i, RHB.m4);
RHB.halo.setMatrixAt(i, RHB.m4);
if (night)
RHB.c.setHSL(((k * 0.23 + i / n * 0.6 + t * 0.01) % 1 + 1) % 1, 0.9, 0.6);
else
RHB.c.setHex(0x3AC86A);
RHB.lamp.setColorAt(i, RHB.c);
RHB.halo.setColorAt(i, RHB.c);
}
RHB.n = n;
RHB.body.count = n;
RHB.lamp.count = n;
RHB.halo.count = night ? n : 0;
RHB.body.instanceMatrix.needsUpdate = true;
RHB.lamp.instanceMatrix.needsUpdate = true;
RHB.halo.instanceMatrix.needsUpdate = true;
if (RHB.lamp.instanceColor)
RHB.lamp.instanceColor.needsUpdate = true;
if (RHB.halo.instanceColor)
RHB.halo.instanceColor.needsUpdate = true;
}
function rdrFrame() {
var now = performance.now(), dt = Math.min(0.1, (now - (RDR.t0 || now)) / 1000);
RDR.t0 = now;
if (typeof camera === "undefined" || !camera || typeof scene === "undefined" || !scene || typeof THREE === "undefined")
return;
rdrBodiesTick();
rhbTick(dt);
rdrFxTick(dt);
if (RDR.freeze) {
if (Date.now() > RDR.freeze.until)
RDR.freeze = null;
else
camera.position.set(RDR.freeze.x, RDR.freeze.y, RDR.freeze.z);
}
}
if (typeof renderView === "function")
(function () {
var rv = renderView;
renderView = function () { try {
rdrFrame();
}
catch (e) {
if (!RDR.e1) {
RDR.e1 = 1;
console.warn("[drones]", e);
}
} return rv.apply(this, arguments); };
})();
function rdrFxTick(dt) {
for (var i = RDR.fx.length - 1; i >= 0; i--) {
var F = RDR.fx[i], nowp = performance.now();
dt = Math.min(0.25, (nowp - (F.lt || nowp)) / 1000);
F.lt = nowp;
F.t = (nowp - F.st) / 1000;
var P = camera.position, f = { x: -Math.sin(yaw), z: -Math.cos(yaw) };
var stay = { x: P.x + f.x * 5, y: P.y + 1.2, z: P.z + f.z * 5 };
var k = Math.min(1, F.t / F.fly), e = k * k * (3 - 2 * k), out = F.t > F.fly + F.hold ? Math.min(1, (F.t - F.fly - F.hold) / F.fly) : 0;
var x = F.from.x + (stay.x - F.from.x) * e, y = F.from.y + (stay.y - F.from.y) * e, z = F.from.z + (stay.z - F.from.z) * e;
y += out * 60;
F.g.position.set(x, y + Math.sin(F.t * 2) * 0.12, z);
F.g.rotation.y = Math.atan2(-(P.x - x), -(P.z - z));
if (F.beam) {
F.beam.visible = F.t > F.fly && F.t < F.fly + 1.4;
if (F.beam.visible) {
var dx = P.x - x, dy = (P.y - 0.6) - y, dz = P.z - z, L = Math.hypot(dx, dy, dz);
F.beam.position.set(x + dx / 2, y + dy / 2, z + dz / 2);
F.beam.scale.set(1, L, 1);
F.beam.lookAt(P.x, P.y - 0.6, P.z);
F.beam.rotateX(Math.PI / 2);
}
}
if (F.box && !F.dropped && F.t > F.fly + 0.6) {
F.dropped = true;
F.g.remove(F.box);
F.box.position.set(x, y - 0.7, z);
F.box.scale.setScalar(1.6);
scene.add(F.box);
F.boxV = 0;
}
if (F.dropped && F.box.parent) {
var gy = P.y - 1.72 + 0.32;
F.boxV -= 9.8 * dt;
F.box.position.y = Math.max(gy, F.box.position.y + F.boxV * dt);
if (F.t > F.fly + F.hold + F.fly)
scene.remove(F.box);
}
if (!F.fired && F.t > F.fly + F.hold * 0.6) {
F.fired = true;
if (F.then)
try {
F.then();
}
catch (er) { }
}
if (F.t > F.fly * 2 + F.hold) {
scene.remove(F.g);
if (F.beam)
scene.remove(F.beam);
if (F.box && F.box.parent)
scene.remove(F.box);
RDR.fx.splice(i, 1);
}
}
}
function rdrSendTo(kind, then) { return __ZC(386, 30, this, arguments, new.target); }
function rdrGot(r) { return __ZC(386, 31, this, arguments, new.target); }
function rdrDelivered(list) { return __ZC(386, 32, this, arguments, new.target); }
if (typeof cityRpc === "function")
(function () {
var cr = cityRpc;
cityRpc = function (name) {
var p = cr.apply(this, arguments);
if (name === "live_poll" && p && typeof p.then === "function")
p.then(function (o) { try {
((o && o.rows) || []).forEach(function (r) { if (r && r.kind === "drone" && !RDR.got[r.id]) {
RDR.got[r.id] = 1;
rdrGot(r);
} });
}
catch (e) { } }, function () { });
return p;
};
})();
if (!RCAM.mode)
setTimeout(function rdrMine() {
if (!(typeof signedIn === "function" && signedIn()) || typeof cityRpc !== "function") {
setTimeout(rdrMine, 30000);
return;
}
cityRpc("drone_mine", {}).then(function (o) { if (o && o.ok && o.rows && o.rows.length)
rdrDelivered(o.rows.slice(0, 5)); }).catch(function () { });
}, 25000);
function rdrKeeper() { return !RCAM.mode && typeof isKeeperNow === "function" && isKeeperNow(); }
function rdrSave(cams, say) {
var c = rcamCfg(), V = Object.assign({}, c, { cams: cams });
return rcamSaveCfg(c, V).then(function () { setStatus(say); rdrCard(); })
.catch(function (e) { setStatus("🛸 Not saved: " + esc((e && e.message) || e)); });
}
function rdrPlace(job, extra) { return __ZC(386, 33, this, arguments, new.target); }
function rdrAddStop(id) { return __ZC(386, 34, this, arguments, new.target); }
function rdrPlaceKey() { var W = rcamWhereNow(); return W.no ? null : W.where; }
function rdrSees(cam, x, z) {
if (cam.job === "patrol")
return rdrStops(cam).length && [{ x: cam.x, z: cam.z }].concat(cam.route || []).some(function (q) { return Math.hypot((+q.x || 0) - x, (+q.z || 0) - z) < 80; });
return Math.hypot((+cam.x || 0) - x, (+cam.z || 0) - z) < (rdrN(cam.r, 22, 4, 250) + (cam.job === "event" ? 400 : 70));
}
function rdrSeenAll() { return __ZC(386, 35, this, arguments, new.target); }
RDR.flags = null;
RDR.flagsAt = 0;
RDR.told = {};
RDR.info = {};
function rdrFlagsLoad(force) { return __ZC(386, 36, this, arguments, new.target); }
if (!RCAM.mode)
setInterval(function () {
try {
if (!rdrKeeper())
return;
var C = rcamCfg();
if (C.off || !rcamList().some(function (k) { return k.drone; }))
return;
rdrRowsTick(20000);
rdrFlagsLoad(false);
if (!RDR.flags || !RDR.rows)
return;
rdrSeenAll().forEach(function (s) {
var f = RDR.flags[s.id];
if (!f)
return;
if (Date.now() - (RDR.told[s.id] || 0) < 600000)
return;
RDR.told[s.id] = Date.now();
setStatus("🚩 <b>" + esc(s.drone) + " sees " + esc(s.name) + "</b>" + (f.why ? " (flagged: " + esc(f.why) + ")" : " (flagged)") + " in " + esc(rkPlaceName(s.where)) + ". ☰ Menu → 🛸 Drones.");
if (typeof playTone === "function")
try {
playTone(880, 0.15);
}
catch (e) { }
});
}
catch (e) { }
}, 5000);
function rkPlaceName(w) { return w === "city" ? "Somnucor" : w === "hall" ? "the Hall of Doors" : ((typeof dgrNameOf === "function" ? dgrNameOf(w) : w) || w); }
var RDR_BTN = "background:#24304A;color:#EAF2FF;border:1px solid #4A6A9A;border-radius:14px;padding:5px 11px;font:600 13px system-ui,sans-serif;cursor:pointer;margin:2px";
var RDR_HOT = "background:#5A2418;color:#FFE8DC;border:1px solid #C86A4A;border-radius:14px;padding:5px 11px;font:600 13px system-ui,sans-serif;cursor:pointer;margin:2px";
function rdrB(label, act, arg, hot) { return '<button style="' + (hot ? RDR_HOT : RDR_BTN) + '" data-rdr="' + act + '"' + (arg != null ? ' data-rdrv="' + esc(String(arg)) + '"' : '') + '>' + label + '</button>'; }
function rdrH(t) { return '<div style="margin:12px 0 4px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#8AC8FF">' + t + '</div>'; }
function rdrNear() {
var P = camera.position, list = (typeof presenceList === "function") ? presenceList() : [];
return list.filter(function (o) { return o.dist < 120; }).slice(0, 10);
}
function rdrCard() { return __ZC(386, 37, this, arguments, new.target); }
function rdrOpen() {
if (!rdrKeeper())
return;
RDR.open = true;
if (typeof document.exitPointerLock === "function")
try {
document.exitPointerLock();
}
catch (e) { }
rdrRowsTick(0);
rdrFlagsLoad(true).then(function () { if (RDR.open)
rdrCard(); });
rdrCard();
}
function rdrDo(a, v) { return __ZC(386, 38, this, arguments, new.target); }
(function () {
if (typeof PS_EXTRAS !== "undefined" && !PS_EXTRAS.some(function (e) { return e.id === "rdr-ps"; }))
PS_EXTRAS.push({ id: "rdr-ps", label: "🛸 Drones", show: function () { return rdrKeeper(); }, run: function () { setTimeout(rdrOpen, 10); } });
if (typeof PS_SECTIONS !== "undefined") {
var h = PS_SECTIONS.filter(function (s) { return s.k === "here"; })[0];
if (h && h.ids.indexOf("rdr-ps") < 0)
h.ids.push("rdr-ps");
}
})();
var RDP = { at: 0, sent: "", arr: {} };
var RDP_SKIP = /gigi|family house|volcano castle|private|crown estate|\bhome\b/i;
var RDP_SIGN = /(ring|row|square|market|gate|quarter|docks?|harbour|park|gardens?|road|street|lane|way|walk|plaza|commons|green|bridge|wharf|quay)$/i;
var RDP_NOT = /^(altarseasonal|maptable|towerplot|house|manor|palace|tenementblock|farmhouse|izba|cottage)$/;
function rdpPlaces() {
var h = rcamHeart(), out = [], seen = {};
function add(n, p) { n = String(n).trim(); var k = n.toLowerCase(); if (!n || seen[k] || RDP_SKIP.test(n))
return; seen[k] = 1; out.push(Object.assign({ n: n }, p)); }
if (h && typeof store !== "undefined" && Array.isArray(store.objects))
store.objects.forEach(function (o) {
if (!o || !o.city || !o.name)
return;
var a = o.archetype, K = (typeof KIT !== "undefined" && KIT[a]) || {};
var temple = /'s house$/.test(o.name) && !!o.workplace;
var ok = (K.cat === "structure" && (!RDP_NOT.test(a) || temple || (!!o.workplace && a !== "house"))) || a === "subwayentrance" || a === "volcano" ||
(a === "signboard" && RDP_SIGN.test(o.name) && !/\d$/.test(o.name));
if (!ok)
return;
var y = 200;
try {
if (typeof terrainY === "function")
y = terrainY(o.x, o.z);
}
catch (e) { }
var F = (typeof frontOf === "function") ? frontOf(o) : { fx: 0, fz: 1 }, S = Array.isArray(K.size) ? K.size : [20, 10, 20], sc = +((o.attrs || {}).s) || 1;
add(o.name, { where: "city", x: Math.round((o.x - h.x) * 10) / 10, y: Math.round((y + 1.7) * 10) / 10, z: Math.round((o.z - h.z) * 10) / 10,
fx: Math.round(F.fx * 100) / 100, fz: Math.round(F.fz * 100) / 100,
w: Math.round(Math.min(160, Math.max(2, S[0] * sc))), s: Math.round(Math.min(80, Math.max(1, S[2] * sc / 2))), bh: Math.round(Math.min(160, Math.max(2, S[1] * sc))) });
});
add("Inside the Hall of Doors", { where: "hall", arrive: true });
if (typeof WORLDS !== "undefined")
Object.keys(WORLDS).forEach(function (k) {
if (RCAM_PRIVATE[k])
return;
var nm = (typeof dgrNameOf === "function") ? dgrNameOf(k) : "";
if (!nm || nm === "this world")
nm = rdpWorldName(k);
add(nm, { where: k, arrive: true });
});
return out;
}
var RDP_NAMES = { surface: "On a planet's surface", station: "The space station", tower: "Inside the Helix Tower", mmin: "Inside a mythic machine" };
function rdpWorldName(k) {
if (RDP_NAMES[k])
return RDP_NAMES[k];
var R = (/^gr_/.test(k) && typeof GR !== "undefined" && GR.realms) ? GR.realms[k.slice(3)] : null;
if (R && R.name)
return R.name + (R.parentName && R.parentName !== R.name ? ", " + R.parentName.replace(/^the\s+/i, "the ") : "");
var W = (typeof WORLDS !== "undefined") ? WORLDS[k] : null;
if (W && (W.name || W.title))
return String(W.name || W.title);
return String(k).replace(/^gr_/, "").replace(/_/g, " ").replace(/^./, function (c) { return c.toUpperCase(); });
}
function rdpNoteArrive(where) {
try {
var P = camera.position;
if (where === "hall") {
var m = (typeof hallMiddle === "function") ? hallMiddle() : null;
if (m)
RDP.arr.hall = { x: P.x - m.x, y: P.y, z: P.z - m.z };
return;
}
var W = WORLDS[where];
if (W)
RDP.arr[where] = { x: P.x - W.base, y: P.y, z: P.z };
}
catch (e) { }
}
if (typeof worldGo === "function")
(function () {
var go = worldGo;
worldGo = function (key) { var r = go.apply(this, arguments); if (r && typeof WLD !== "undefined" && WLD.on === key && !RDP.arr[key])
rdpNoteArrive(key); return r; };
})();
if (typeof toHall === "function")
(function () {
var go = toHall;
toHall = function () { var r = go.apply(this, arguments); setTimeout(function () { if (!RDP.arr.hall && typeof inHallRealm === "function" && inHallRealm())
rdpNoteArrive("hall"); }, 1500); return r; };
})();
(function () {
var spot = rcamSpot;
rcamSpot = function (cam) {
if (cam && cam.arrive) {
var a = RDP.arr[cam.where];
if (!a && typeof WLD !== "undefined" && WLD.on === cam.where && cam.where !== "hall") {
rdpNoteArrive(cam.where);
a = RDP.arr[cam.where];
}
if (!a)
return null;
if (cam.where === "hall") {
var m = (typeof hallMiddle === "function") ? hallMiddle() : null;
return m ? { x: m.x + a.x, y: a.y, z: m.z + a.z } : null;
}
var W = WORLDS[cam.where];
return W ? { x: W.base + a.x, y: a.y, z: a.z } : null;
}
return spot(cam);
};
})();
setInterval(function () {
if (!(typeof isKeeperNow === "function" && isKeeperNow()))
return;
if (!(RCAM.mode === "run" || (typeof rdrKeeper === "function" && rdrKeeper())))
return;
if (Date.now() - RDP.at < 10 * 60 * 1000)
return;
var L = rdpPlaces();
if (L.filter(function (p) { return p.where === "city"; }).length < 20)
return;
var body = JSON.stringify(L);
if (body === RDP.sent) {
RDP.at = Date.now();
return;
}
RDP.at = Date.now();
rcamPut("drone-places.json", JSON.stringify({ at: new Date().toISOString(), places: L }), "application/json").then(function () { RDP.sent = body; }, function () { RDP.at = Date.now() - 9 * 60 * 1000; });
}, 20000);
var RDA = { esc: [], beams: [], at: 0, said: {}, seen: {} };
var RDA_SAFE = { city: 1, hall: 1, greenwold: 1, jubilee: 1, kids: 1, kidszone: 1, london: 1, guildlands: 1, family: 1, lounge: 1, sim: 1, dream: 1, estate: 1, estates: 1 };
function rdaCfg() { var a = rcamCfg().arms; a = (a && typeof a === "object") ? a : {}; return { on: a.on !== false, shield: Math.max(0, Math.min(100, a.shield === undefined ? 100 : +a.shield || 0)) }; }
(function () {
var was = rdrArmed;
rdrArmed = function (where) {
if (!rdaCfg().on || RDA_SAFE[where] || (typeof RCAM_PRIVATE !== "undefined" && RCAM_PRIVATE[where]))
return false;
if (/kid/i.test(String(where || "")))
return false;
return was(where);
};
})();
function rdaShield(g, strength) {
var m = new THREE.MeshBasicMaterial({ color: 0x7FD8FF, transparent: true, opacity: 0.16, depthWrite: false });
var s = new THREE.Mesh(new THREE.SphereGeometry(1.15, 18, 12), m);
s.raycast = function () { };
s.userData.rda = 1;
g.add(s);
g.userData.shield = s;
g.userData.sh = strength;
return s;
}
function rdaShieldPaint(g) {
var s = g && g.userData.shield;
if (!s)
return;
var f = Math.max(0, Math.min(1, (g.userData.sh || 0) / 100));
s.visible = f > 0.02;
s.material.opacity = 0.06 + 0.12 * f;
s.material.color.setHex(f > 0.5 ? 0x7FD8FF : f > 0.25 ? 0xFFC46A : 0xFF8A5A);
}
(function () {
var was = rdrBody;
rdrBody = function (armed, parcel) {
var g = was(armed, parcel), C = rdaCfg();
if (armed && C.shield > 0)
rdaShield(g, C.shield);
return g;
};
})();
function rdaFallHere() { return typeof THXF !== "undefined" && THXF && THXF.F && typeof WLD !== "undefined" && WLD.on && WLD.on === THXF.key; }
function rdaEscortsTick(dt) {
var want = rdaFallHere() && THXF.phase === "night" && rdaCfg().on && rdrArmed(THXF.key);
if (!want) {
RDA.esc.forEach(function (E) { if (E.g.parent)
E.g.parent.remove(E.g); });
RDA.esc = [];
rdaBeamsTick(dt, true);
return;
}
var C = rdaCfg();
while (RDA.esc.length < 2) {
var g = rdrBody(true);
THXF.F.add(g);
RDA.esc.push({ g: g, i: RDA.esc.length, cool: 1 + RDA.esc.length, sh: C.shield, up: 0 });
g.userData.sh = C.shield;
}
var t = Date.now() / 1000;
RDA.esc.forEach(function (E) {
var a = t * 0.18 + E.i * Math.PI, r = 16, x = Math.cos(a) * r, z = Math.sin(a) * r;
var under = 0;
THXF.figs.forEach(function (F) { if (!F.down && Math.hypot(F.g.position.x - x, F.g.position.z - z) < 6)
under++; });
if (under && E.sh > 0)
E.sh = Math.max(0, E.sh - 8 * under * dt);
else if (!under)
E.sh = Math.min(C.shield, E.sh + 6 * dt);
if (E.sh <= 0)
E.up = Math.max(E.up, 1);
if (E.up && E.sh >= C.shield * 0.6)
E.up = 0;
var y = E.up ? 20 : 7 + Math.sin(t * 1.3 + E.i) * 0.4;
E.g.position.set(x, E.g.position.y ? E.g.position.y + (y - E.g.position.y) * Math.min(1, dt * 1.5) : y, z);
E.g.userData.sh = E.sh;
rdaShieldPaint(E.g);
E.cool -= dt;
if (E.up || E.cool > 0)
return;
var best = null, bd = 1e9;
THXF.figs.forEach(function (F) { if (F.down)
return; var d = Math.hypot(F.g.position.x - x, F.g.position.z - z); if (d < 34 && d < bd) {
bd = d;
best = F;
} });
if (!best)
return;
E.cool = 2.4;
E.g.rotation.y = Math.atan2(-(best.g.position.x - x), -(best.g.position.z - z));
rdaBeam(E.g.position, best.g.position);
best.hp--;
if (best.hp <= 0 && !best.down) {
best.down = true;
THXF.left--;
best.g.rotation.x = -1.4;
best.g.position.y = 0.3;
setTimeout(function () { if (best.g.parent)
best.g.parent.remove(best.g); }, 4000);
if (THXF.left <= 0 && typeof thxFallDawn === "function")
thxFallDawn();
}
});
rdaBeamsTick(dt, false);
}
function rdaBeam(a, b) { return __ZC(386, 39, this, arguments, new.target); }
function rdaBeamsTick(dt, all) {
RDA.beams = RDA.beams.filter(function (B) { B.t -= dt; if (all || B.t <= 0) {
if (B.L.parent)
B.L.parent.remove(B.L);
B.L.geometry.dispose();
return false;
} return true; });
}
setInterval(function () { var n = Date.now(), dt = RDA.at ? Math.min(0.2, (n - RDA.at) / 1000) : 0.05; RDA.at = n; try {
rdaEscortsTick(dt);
}
catch (e) { } }, 50);
RDR_JOBS.track = "Tracks a suspect for the Dragon Corp";
function rdaRoostNo(cam) { var m = /^roost(\d)$/.exec(String(cam.id || "")); return m ? +m[1] : 0; }
function rdaCase(cam) { return __ZC(386, 40, this, arguments, new.target); }
function rdaSuspectAt(cs) { return __ZC(386, 41, this, arguments, new.target); }
function rdaTrack(cam, t) { return __ZC(386, 42, this, arguments, new.target); }
function rdaReport(cam, cs, S) { return __ZC(386, 43, this, arguments, new.target); }
(function () {
var was = rdrPose;
rdrPose = function (cam) { if (cam && cam.job === "track") {
try {
return rdaTrack(cam, Date.now() / 1000);
}
catch (e) {
return null;
}
} return was(cam); };
})();
