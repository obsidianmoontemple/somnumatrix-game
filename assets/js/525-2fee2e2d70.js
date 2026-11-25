/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var KC_COL = { gold: [0xE0B040, 0.35, 0.9], silver: [0xD8DCE2, 0.3, 0.9], bronze: [0xB07A40, 0.4, 0.85], darkbronze: [0x5A4A30, 0.5, 0.7], iron: [0x6A6A70, 0.55, 0.7], electrum: [0xD8C890, 0.35, 0.85],
amber: [0xD88A20, 0.25, 0.1], crystal: [0xC8E8FF, 0.1, 0.1], ice: [0xD8F0FF, 0.1, 0.05], pearl: [0xF2EEE6, 0.25, 0.15], ivory: [0xEFE6D0, 0.5, 0], marble: [0xEEEAE2, 0.5, 0], white: [0xF4F2EC, 0.6, 0],
stone: [0x9A948A, 0.9, 0], clay: [0xB87050, 0.85, 0], terracotta: [0xB4603A, 0.85, 0], darkoak: [0x4A3020, 0.8, 0], oak: [0x8A6238, 0.8, 0], black: [0x1C1A1E, 0.6, 0], red: [0xA82A20, 0.6, 0],
green: [0x3A7A3A, 0.6, 0], emerald: [0x1E9A5A, 0.15, 0.2], blue: [0x2A4A9A, 0.5, 0], wool: [0xEAE2CE, 1, 0], hide: [0x7A5232, 0.9, 0], lion: [0xB08A50, 0.9, 0], laurel: [0x4A7A30, 0.8, 0], olive: [0x7A8A40, 0.8, 0],
ember: [0xFF6A20, 0.5, 0], charcoal: [0x2A2624, 0.95, 0], wax: [0xE8D8A0, 0.6, 0], sponge: [0xC8A060, 1, 0], purple: [0x6A2A7A, 0.5, 0], rose: [0xD87090, 0.5, 0] };
var KC_MODELS = ["chest", "coins", "ring", "gem", "statue", "cup", "amphora", "scroll", "crown", "sword", "amulet", "lyre", "helmet", "shield", "mask", "tripod", "lamp", "ship", "bow", "owl", "bull", "dolphin", "shell", "pearl", "apple", "fleece", "horn", "wreath", "tablet", "mirror", "axe", "spear", "feather", "bell", "key", "book", "flower", "star", "heart"];
var KC_GEO = {}, KC_MAT = {};
function kcMat(col, glow) { return __ZC(525, 0, this, arguments, new.target); }
function kcG(k, f) { return KC_GEO[k] || (KC_GEO[k] = f()); }
function kcAdd(g, geo, mat, x, y, z, rx, ry, rz, sx, sy, sz) { var m = new THREE.Mesh(geo, mat); m.position.set(x || 0, y || 0, z || 0); m.rotation.set(rx || 0, ry || 0, rz || 0); if (sx)
m.scale.set(sx, sy || sx, sz || sx); m.castShadow = true; g.add(m); return m; }
function kcBoxG() { return kcG("box", function () { return new THREE.BoxGeometry(1, 1, 1); }); }
function kcCylG() { return kcG("cyl", function () { return new THREE.CylinderGeometry(1, 1, 1, 16); }); }
function kcSphG() { return kcG("sph", function () { return new THREE.SphereGeometry(1, 16, 12); }); }
function kcTorG() { return kcG("tor", function () { return new THREE.TorusGeometry(1, 0.18, 10, 24); }); }
function kcConeG() { return kcG("cone", function () { return new THREE.ConeGeometry(1, 1, 16); }); }
function kcLathe(k, pts) { return kcG(k, function () { return new THREE.LatheGeometry(pts.map(function (p) { return new THREE.Vector2(p[0], p[1]); }), 24); }); }
function kcModel(model, col) { return __ZC(525, 1, this, arguments, new.target); }
function kcHiding(hide, model, col) { return __ZC(525, 2, this, arguments, new.target); }
function kcHideSay(hide) { return __ZC(525, 3, this, arguments, new.target); }
var KC = { place: null, list: [], meshes: {}, asked: {}, at: 0, busy: false, open: null, lastFetch: 0 };
function kcRpc(n, a) { return typeof cityRpc === "function" ? cityRpc(n, a || {}) : Promise.reject(new Error("offline")); }
function kcMissing(e) { return typeof rpcMissing === "function" ? rpcMissing(e) : /function|does not exist|schema cache/i.test(String(e && e.message || e)); }
function kcEsc(s) { return typeof esc === "function" ? esc(s) : String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c]; }); }
function kcKeeper() { return typeof amKeeper === "function" && amKeeper(); }
function kcSignedIn() { return typeof session !== "undefined" && !!session; }
var KC_SUB = { homer: function () { return typeof HGW !== "undefined" && HGW.sc ? HGW.sc : ""; } };
function kcPlace() { if (typeof WLD !== "undefined" && WLD.on) {
var s = KC_SUB[WLD.on] ? KC_SUB[WLD.on]() : "";
return WLD.on + (s ? ":" + s : "");
} return "city"; }
function kcBase() { return (typeof WLD !== "undefined" && WLD.on && WLD.w && WLD.w.base) || 0; }
function kcFeet() { if (typeof camera === "undefined")
return null; var P = camera.position; return { x: P.x - kcBase(), y: P.y - 1.72, z: P.z }; }
function kcNight() { var h = typeof cityHourNow === "function" ? cityHourNow() : new Date().getHours(); return typeof isNightHour === "function" ? isNightHour(h) : (h >= 20.5 || h < 5.5); }
function kcClear() { Object.keys(KC.meshes).forEach(function (id) { var m = KC.meshes[id]; if (m && m.parent)
m.parent.remove(m); }); KC.meshes = {}; }
function kcFetch() {
if (KC.busy || !kcSignedIn())
return;
var pl = kcPlace();
KC.busy = true;
KC.lastFetch = Date.now();
kcRpc("kc_here", { p_place: pl }).then(function (o) { KC.busy = false; if (kcPlace() !== pl)
return; KC.list = (o && o.ok && o.list) || []; kcSync(true); })
.catch(function (e) { KC.busy = false; if (kcMissing(e))
KC.off = true; });
}
function kcSync(all) {
if (typeof scene === "undefined")
return;
var F = kcFeet();
if (!F)
return;
var keep = {}, base = kcBase(), night = kcNight(), K = kcKeeper();
KC.list.forEach(function (c) {
var d = Math.hypot(c.x - F.x, c.z - F.z);
if (d > 140)
return;
if (c.night && !night && !K)
return;
keep[c.id] = 1;
if (KC.meshes[c.id])
return;
var g = kcHiding(K && c.hide === "unseen" ? "plain" : c.hide, c.model, c.colour);
g.position.set(c.x + base, c.y, c.z);
g.userData.kc = c.id;
if (c.hide === "plain" || c.hide === "buried" || K) {
var tw = new THREE.Mesh(kcSphG(), new THREE.MeshBasicMaterial({ color: K && !c.open ? 0x8888AA : 0xFFF0C0, transparent: true, opacity: 0.8, depthWrite: false }));
tw.scale.setScalar(0.04);
tw.position.y = 0.35;
tw.userData.tw = 1;
g.add(tw);
}
if (K) {
var tag = kcTag((c.open ? "🎁 " : "⏸ ") + (c.name || "a gift") + (c.found ? " · found " + c.found : ""));
tag.position.y = 1.1;
g.add(tag);
}
scene.add(g);
KC.meshes[c.id] = g;
});
Object.keys(KC.meshes).forEach(function (id) { if (!keep[id]) {
var m = KC.meshes[id];
if (m.parent)
m.parent.remove(m);
delete KC.meshes[id];
} });
}
function kcTag(text) { return __ZC(525, 4, this, arguments, new.target); }
function kcPanel(html, fns) { return __ZC(525, 5, this, arguments, new.target); }
function kcBtn(k, label, sub) { return "<div data-k='" + k + "' role='button' tabindex='0' style='margin:7px 0;padding:8px 10px;border:1px solid rgba(232,200,120,.5);border-radius:5px;background:rgba(232,200,120,.08)'><b>" + label + "</b>" + (sub ? "<div style='opacity:.75;font-size:12px'>" + sub + "</div>" : "") + "</div>"; }
function kcFound(c) { return __ZC(525, 6, this, arguments, new.target); }
function kcModelName(m, c) { return (c && KC_COL[c] ? c + " " : "") + (m || "gift"); }
function kcTick() {
if (KC.off || typeof camera === "undefined")
return;
if (typeof walkMode !== "undefined" && !walkMode)
return;
var pl = kcPlace();
if (pl !== KC.place) {
KC.place = pl;
KC.list = [];
KC.asked = {};
kcClear();
kcFetch();
return;
}
if (Date.now() - KC.lastFetch > 90000)
kcFetch();
var F = kcFeet();
if (!F)
return;
var t = Date.now() / 1000;
Object.keys(KC.meshes).forEach(function (id) { var g = KC.meshes[id]; g.children.forEach(function (ch) { if (ch.userData.tw) {
var s = 0.03 + 0.03 * Math.max(0, Math.sin(t * 2.2 + (+id)));
ch.scale.setScalar(s);
} }); });
if (Date.now() - KC.at > 2000) {
KC.at = Date.now();
kcSync();
}
if (KC.open || kcKeeper()) {
KC.list.forEach(function (c) { if (Math.hypot(c.x - F.x, c.z - F.z) > 5)
KC.asked[c.id] = 0; });
return;
}
var night = kcNight();
KC.list.forEach(function (c) {
var d = Math.hypot(c.x - F.x, c.z - F.z), dy = Math.abs(c.y - F.y);
if (d > 5) {
KC.asked[c.id] = 0;
return;
}
if (KC.asked[c.id] || dy > 2.6 || (c.night && !night))
return;
if (d < (c.hide === "unseen" ? 1.4 : 2.0))
kcFound(c);
});
}
setInterval(function () { try {
kcTick();
}
catch (e) { } }, 250);
var KC_HIDES = [["plain", "In plain sight"], ["buried", "Buried"], ["stone", "Under a stone"], ["chest", "In a small chest"], ["jar", "In a sealed jar"], ["unseen", "Unseen: found by walking onto it"]];
var KC_SYN = { coin: "coins", money: "coins", gold: "coins", purse: "coins", necklace: "amulet", pendant: "amulet", locket: "amulet", charm: "amulet", jewel: "gem", diamond: "gem", ruby: "gem", sapphire: "gem", emerald: "gem",
statuette: "statue", figure: "statue", figurine: "statue", idol: "statue", vase: "amphora", jar: "amphora", pot: "amphora", urn: "amphora", goblet: "cup", chalice: "cup", trophy: "cup", grail: "cup", letter: "scroll", map: "scroll",
blade: "sword", dagger: "sword", knife: "sword", cloak: "fleece", blanket: "fleece", tiara: "crown", diadem: "crown", circlet: "crown", harp: "lyre", candle: "lamp", lantern: "lamp", boat: "ship", arrow: "bow", bird: "owl",
ox: "bull", cow: "bull", fish: "dolphin", oyster: "pearl", fruit: "apple", crown2: "wreath", laurel: "wreath", garland: "wreath", stone2: "tablet", plaque: "tablet", glass: "mirror", hatchet: "axe", lance: "spear",
quill: "feather", rose: "flower", lily: "flower", bouquet: "flower", medal: "amulet", badge: "amulet" };
function kcRead(text, mats) { return __ZC(525, 7, this, arguments, new.target); }
function kcAiRead(text, mats) { return __ZC(525, 8, this, arguments, new.target); }
var KC_FORM = {};
function kcFormHtml(f, mats) { return __ZC(525, 9, this, arguments, new.target); }
function kcFormRead(p) { return __ZC(525, 10, this, arguments, new.target); }
function kcHideOpen() {
if (!kcKeeper())
return;
var F = kcFeet();
if (!F)
return;
KC_FORM = { at: F, place: kcPlace(), f: {} };
var go = function (mats) { KC_FORM.mats = mats || []; kcHideShow(); };
kcRpc("kc_choices", { p_q: "" }).then(function (o) { go(o && o.ok ? o.mats : []); }).catch(function () { go([]); });
}
function kcHideShow(msg) { return __ZC(525, 11, this, arguments, new.target); }
function kcListShow() { return __ZC(525, 12, this, arguments, new.target); }
(function () {
var b = document.createElement("div");
b.id = "kcHideBtn";
b.title = "Hide a gift here";
b.textContent = "🎁";
b.setAttribute("role", "button");
b.setAttribute("aria-label", "Hide a gift here");
b.style.cssText = "position:fixed;right:14px;bottom:150px;z-index:45;width:44px;height:44px;border-radius:50%;display:none;align-items:center;justify-content:center;font-size:22px;cursor:pointer;background:rgba(30,22,12,.85);border:1px solid #C8A050;box-shadow:0 2px 10px rgba(0,0,0,.5)";
b.onclick = function (e) { e.stopPropagation(); kcHideOpen(); };
(document.body ? Promise.resolve() : new Promise(function (r) { window.addEventListener("DOMContentLoaded", r); })).then(function () { document.body.appendChild(b); });
setInterval(function () { var on = kcKeeper() && (typeof walkMode === "undefined" || walkMode); b.style.display = on ? "flex" : "none"; }, 1000);
})();
