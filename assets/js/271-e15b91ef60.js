/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var CFX = { irBtn: null, nurseBtn: null, hephBtn: null, nurseBusy: false, wm: null, wmAt: 0, wmBusy: false, tick: 0 };
(function () {
if (typeof enterBuilding === "function") {
var eb = enterBuilding;
enterBuilding = function () { indoorRun = false; return eb.apply(this, arguments); };
}
if (typeof exitInterior === "function") {
var ex = exitInterior;
exitInterior = function () { indoorRun = false; return ex.apply(this, arguments); };
}
})();
CFX.inW = 0;
function cfxHallSize(o) { return __ZC(271, 0, this, arguments, new.target); }
function cfxWorldIndoors() {
if (typeof MALL !== "undefined" && MALL.on)
return 2;
if (typeof UGO !== "undefined" && UGO.inside)
return 1;
if (typeof WLD === "undefined" || !WLD.on)
return 0;
var w = WLD.on, L = (typeof worldLocal === "function") ? worldLocal() : null, r;
if (w === "casino" || w === "station" || w === "tower" || w === "outbreak")
return 2;
if (w === "shuttle")
return 1;
if (typeof BDL !== "undefined" && BDL.inside)
return 1;
if (w === "davinci" && typeof DAV !== "undefined" && DAV.insideOf)
return cfxHallSize(DAV.insideOf);
if (w === "verne" && typeof VRN !== "undefined" && VRN.insideOf)
return cfxHallSize(VRN.insideOf);
if (w === "erebos" && typeof EBS !== "undefined" && EBS.room)
return cfxHallSize(EBS.room);
if (w === "samhain" && typeof SHN !== "undefined" && SHN.room)
return cfxHallSize(SHN.room);
if (w === "grimm" && typeof GMM !== "undefined" && GMM.room)
return cfxHallSize(GMM.room);
if (w === "bard" && typeof SHK !== "undefined" && SHK.inside)
return 1;
if (w === "guildlands" && typeof HND !== "undefined" && HND.inside)
return 1;
if (/^gr_/.test(w) && typeof GR !== "undefined" && GR.inside)
return cfxHallSize(GR.inside);
if (w === "underdark" && typeof UDX !== "undefined" && UDX.here && UDX.here.kind === "inside")
return 1;
if (w === "party" && typeof PP !== "undefined" && PP.zoneDef && PP.zoneDef.indoor)
return 1;
if (w === "oz" && typeof OZ !== "undefined" && OZ.room)
return cfxHallSize(OZ.room);
if (w === "poe" && typeof POE !== "undefined" && POE.room && !POE.room.city)
return cfxHallSize(POE.room);
if (w === "neverland" && typeof NVB !== "undefined" && NVB.room)
return cfxHallSize(NVB.rooms && NVB.rooms[NVB.room] && NVB.rooms[NVB.room].R || null);
if (w === "stillwater" && typeof SW !== "undefined" && SW.room)
return cfxHallSize(SW.room);
if (typeof OTM !== "undefined" && w === OTM.key && OTM.room)
return 2;
if (typeof WND !== "undefined" && w === WND.key && WND.room)
return 2;
if (w === "timemachine" && typeof TMW !== "undefined" && TMW.inHouse)
return 1;
if (w === "maze" && typeof LBY !== "undefined" && (LBY.zone === "deep" || LBY.zone === "heart" || LBY.zone === "inside"))
return 2;
if (WLD.w && typeof WLD.w.indoors === "function") {
try {
var wi = WLD.w.indoors();
if (wi)
return wi === 2 ? 2 : 1;
}
catch (e) { }
}
if (!L)
return 0;
if (w === "greenwold" && typeof gwRoomAt === "function" && (r = gwRoomAt(L.x, L.z)))
return cfxHallSize(r);
if (w === "kidszone" && typeof kzRoomAt === "function" && (r = kzRoomAt(L.x, L.z)))
return cfxHallSize(r);
if (w === "lounge" && typeof llRoomAt === "function" && (r = llRoomAt(L.x, L.z)))
return cfxHallSize(r);
if (w === "family" && typeof flRoomAt === "function" && (r = flRoomAt(L.x, L.z)))
return cfxHallSize(r);
if (w === "sim" && typeof PTX !== "undefined" && PTX.spec && Math.abs(L.x) < PTX.spec.w / 2 && Math.abs(L.z) < PTX.spec.d / 2)
return 1;
return 0;
}
function cfxIndoorsNow() {
if (store.inside) {
var I = (typeof INT !== "undefined") ? INT : null;
return (I && I.W >= 28 && I.D >= 28) ? 2 : 1;
}
return CFX.inW;
}
function cfxIndoorTick() {
var was = CFX.inW, now = 0;
try {
now = store.inside ? 0 : cfxWorldIndoors();
}
catch (e) {
now = 0;
}
CFX.inW = now;
if (now && !was)
indoorRun = false;
}
if (typeof PS_KEEP !== "undefined") {
PS_KEEP["cfx-run"] = 1;
PS_KEEP["cfx-nurse"] = 1;
PS_KEEP["cfx-heph"] = 1;
}
function cfxBtn(id, css, onclick) {
var el = document.getElementById(id);
if (el || !document.body)
return el;
el = document.createElement("button");
el.id = id;
el.type = "button";
el.style.cssText = "position:fixed;z-index:44;display:none;background:rgba(10,12,18,.9);color:#EDE8F8;border:1px solid #6A9AC0;border-radius:18px;padding:7px 14px;font:600 13px system-ui,sans-serif;" + css;
el.onclick = onclick;
document.body.appendChild(el);
return el;
}
function cfxIrPaint() {
var el = cfxBtn("cfx-run", "left:calc(12px + env(safe-area-inset-left,0px));bottom:calc(196px + env(safe-area-inset-bottom,0px))", function () {
indoorRun = !indoorRun;
cfxIrPaint();
setStatus(indoorRun ? "<b>Running indoors.</b> Tap Run again to walk." : "<b>Walking indoors.</b>");
});
if (!el)
return;
var show = !!(walkMode && cfxIndoorsNow() && !(typeof DRIVE !== "undefined" && DRIVE && DRIVE.on) && !(typeof talkOpen !== "undefined" && talkOpen));
el.style.display = show ? "block" : "none";
if (show) {
var t = indoorRun ? "🏃 Running · tap to walk" : "🚶 Walking · tap to run";
if (el.textContent !== t)
el.textContent = t;
el.style.borderColor = indoorRun ? "#E8C66A" : "#6A9AC0";
}
}
var CFX_DUTY = [{ job_id: "hd1", title: "Duty nurse" }, { job_id: "hd2", title: "Duty doctor" }];
(function () {
if (typeof tempsPlan !== "function")
return;
var tp = tempsPlan;
tempsPlan = function (rows) {
if (Array.isArray(rows) && rows.length && store.workplaceAt && store.workplaceAt["The City Hospital"]) {
rows = rows.slice();
CFX_DUTY.forEach(function (d) { rows.push({ job_id: d.job_id, title: d.title, workplace: "The City Hospital", positions: 1, taken: 0, panel: null, roams: false }); });
}
return tp.call(this, rows);
};
})();
function cfxDuty(t) { return !!(t && typeof t.id === "string" && t.id.indexOf("twhd") === 0); }
(function () {
if (typeof crewMake === "function") {
var cm = crewMake;
crewMake = function () { var L = TEMPS.list; TEMPS.list = L.filter(function (t) { return !cfxDuty(t); }); try {
return cm.apply(this, arguments);
}
finally {
TEMPS.list = L;
} };
}
if (typeof tempOnShift === "function") {
var to = tempOnShift;
tempOnShift = function (t) { if (cfxDuty(t))
return true; return to.apply(this, arguments); };
}
})();
function cfxNeedsNurse() {
var h = (typeof HARM !== "undefined" && HARM) || {}, sick = typeof NEEDS !== "undefined" && NEEDS && NEEDS.sick;
return h.state === "down" || h.state === "hurt" || (typeof h.hp === "number" && h.hp < 100) || !!sick;
}
function cfxNurseSay(h) { return __ZC(271, 1, this, arguments, new.target); }
function cfxNurse() { return __ZC(271, 2, this, arguments, new.target); }
function cfxNursePaint() {
var el = cfxBtn("cfx-nurse", "left:50%;transform:translateX(-50%);bottom:calc(236px + env(safe-area-inset-bottom,0px));border-color:#8FCB8A", cfxNurse);
if (!el)
return;
var show = !!(walkMode && typeof inHospital === "function" && inHospital() && !(typeof talkOpen !== "undefined" && talkOpen));
el.style.display = show ? "block" : "none";
if (show) {
var t = cfxNeedsNurse() ? "🩺 See the duty nurse" : "🩺 Ask the duty nurse to look you over";
if (el.textContent !== t)
el.textContent = t;
}
}
if (typeof FURN !== "undefined") {
FURN.hephaestus = function () { return __ZC(271, 3, this, arguments, new.target); };
if (typeof FIXED_FURN !== "undefined")
FIXED_FURN.hephaestus = 1;
}
var CFX_HEPH = "Hephaestus, the Greek god of the forge, fire, metalwork and craft, son of Hera, husband of Aphrodite, " +
"lame of foot and mighty of arm. He keeps his forge here in the heart of the Volcano Castle in Somnucor, where the lava runs. " +
"He speaks plainly and warmly, like a master smith to an apprentice, proud of good work and impatient with shoddy work. " +
"He knows the old stories: the armour of Achilles, the net that caught Ares and Aphrodite, the thrones of Olympus, Pandora, " +
"his fall from Olympus to Lemnos. He loves the castle's dragons and its secrets, and will hint (never tell outright) that a " +
"true craftsman looks closely at every forge, anvil and mark. He stays in character and never talks about being a game or a computer.";
function cfxHephNear() {
if (!(store.inside && INT && INT.root && walkMode))
return null;
if (!INT.hephObj || !INT.hephObj.parent) {
INT.hephObj = null;
INT.root.traverse(function (o) { if (!INT.hephObj && o.userData && o.userData.heph)
INT.hephObj = o; });
if (!INT.hephObj)
INT.hephObj = 0;
}
var H = INT.hephObj;
if (!H)
return null;
var p = new THREE.Vector3();
H.getWorldPosition(p);
var P = camera.position;
if (Math.abs((P.y - 1.72) - p.y) > 2.5)
return null;
return Math.hypot(P.x - p.x, P.z - p.z) < 5.5 ? H : null;
}
function cfxHephTalk() { return __ZC(271, 4, this, arguments, new.target); }
function cfxHephPaint() {
var el = cfxBtn("cfx-heph", "left:50%;transform:translateX(-50%);bottom:calc(236px + env(safe-area-inset-bottom,0px));border-color:#E07A3A", cfxHephTalk);
if (!el)
return;
var near = !(typeof talkOpen !== "undefined" && talkOpen) && cfxHephNear();
el.style.display = near ? "block" : "none";
if (near && el.textContent !== "🔨 Speak with Hephaestus")
el.textContent = "🔨 Speak with Hephaestus";
}
(function () {
if (typeof atlHarvest !== "function")
return;
var ah = atlHarvest;
atlHarvest = function (C) {
var r = ah.apply(this, arguments);
try {
if (C && C.plots && !C.plots.some(function (p) { return p.name === "The Volcano Castle"; })) {
var sp = null;
(store.objects || []).forEach(function (o) { if (!sp && o.city && o.archetype === "castle" && (o.label === "The Volcano Castle" || o.name === "The Volcano Castle"))
sp = o; });
if (sp)
C.plots.push({ name: "The Volcano Castle", quarter: "The Harvest Ring", kind: "estate", x: sp.x, z: sp.z, rot: sp.rot || 0, archetype: "castle", homeId: sp.id });
}
}
catch (e) {
if (window.console)
console.warn("[volcano] plot", e);
}
return r;
};
})();
(function () {
if (typeof workplaceKeyOf !== "function")
return;
var wk = workplaceKeyOf;
workplaceKeyOf = function (spec) {
var k = wk.apply(this, arguments);
if (k || !spec || !spec.city)
return k;
try {
var p = lotPlots().filter(function (q) { return q.homeId === spec.id && q.kind === "estate"; })[0];
if (!p)
return k;
var mine = (typeof standing !== "undefined" && standing && standing.lots || []).filter(function (l) { return l.lot === p.name && l.lot_id != null; })[0];
return mine ? ("lot:" + mine.lot_id) : k;
}
catch (e) {
return k;
}
};
})();
function cfxInWorld() { return typeof WLD !== "undefined" && WLD && !!WLD.on; }
function cfxCityHere() { var r = typeof somnucorRealm === "function" ? somnucorRealm() : null; return !!(r && (store.here || 0) === r.id); }
(function () {
if (typeof wxSet === "function") {
var ws = wxSet;
wxSet = function (kind, strength, why) { if (cfxInWorld() || (cfxCityHere() && why !== "stopped"))
return; return ws.apply(this, arguments); };
}
if (typeof buildFromReply === "function") {
var bf = buildFromReply;
buildFromReply = function () {
if (cfxInWorld() || cfxCityHere()) {
setStatus("<b>What is said here stays here.</b> To build it, tell it in your own dream: open your dream journal and describe it there.");
return;
}
return bf.apply(this, arguments);
};
}
if (typeof worldOff === "function") {
var wo = worldOff;
worldOff = function () { var r = wo.apply(this, arguments); try {
cfxClearCitySnow();
}
catch (e) { } return r; };
}
})();
function cfxClearCitySnow() {
var r = typeof somnucorRealm === "function" ? somnucorRealm() : null;
if (!r)
return 0;
var n = 0, st = store.weather && store.weather[r.id];
if (st && st.kind && st.kind !== "clear") {
delete store.weather[r.id];
n++;
}
var wx = ["blizzard", "snowstorm", "snowfield", "stormcloud", "raincloud", "lightningstorm", "thundercloud", "fogbank"];
(store.objects || []).slice().forEach(function (o) {
if ((o.realm || 0) !== r.id || o.city || wx.indexOf(o.archetype) < 0)
return;
var i = store.objects.indexOf(o);
if (i > -1)
store.objects.splice(i, 1);
if (typeof meshes !== "undefined" && meshes[o.id]) {
scene.remove(meshes[o.id]);
delete meshes[o.id];
}
n++;
});
if (n) {
if (typeof save === "function")
save();
if (typeof wxApply === "function")
try {
wxApply();
}
catch (e) { }
}
return n;
}
setTimeout(function () { try {
cfxClearCitySnow();
}
catch (e) { } }, 8000);
function cfxWorkMailLoad(force) { return __ZC(271, 5, this, arguments, new.target); }
function cfxWorkBox() {
if (CFX.wm)
return CFX.wm;
var d = typeof POST !== "undefined" && POST.data, box = d && d.ok ? (d.box || []).filter(function (m) { return m.shop; }) : [];
var places = {};
box.forEach(function (m) { var p = places[m.shop] || (places[m.shop] = { shop: m.shop, name: m.to || "", unread: 0 }); if (!m.read)
p.unread++; });
return { ok: true, places: Object.keys(places).map(function (k) { return places[k]; }), box: box, old: true };
}
function cfxWorkUnread() { var W = cfxWorkBox(); return (W.places || []).reduce(function (a, p) { return a + (+p.unread || 0); }, 0); }
function cfxWorkHtml() { return __ZC(271, 6, this, arguments, new.target); }
(function () {
if (typeof postPaint !== "function")
return;
var pp = postPaint;
postPaint = function () {
var r = pp.apply(this, arguments);
try {
var el = document.getElementById("post-panel");
if (el && POST.open && POST.data && POST.data.ok && !el.querySelector('[data-p="tab:work"]')) {
var box = el.querySelector('[data-p="tab:box"]');
if (box && (CFX.wm && (CFX.wm.places || []).length || cfxWorkBox().places.length || (typeof WORK !== "undefined" && WORK.data && (WORK.data.jobs || []).length))) {
var n = cfxWorkUnread(), b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-p", "tab:work");
b.textContent = n ? "Work mail (" + n + ")" : "Work mail";
b.style.cssText = POST.tab === "work" ? "border-color:#C9A040;color:#F4E6C0" : "opacity:.8";
box.parentNode.insertBefore(b, box.nextSibling);
}
}
}
catch (e) { }
return r;
};
if (typeof postRoundHtml === "function") {
var pr = postRoundHtml;
postRoundHtml = function () { if (POST.tab === "work") {
try {
return cfxWorkHtml();
}
catch (e) {
return pDim(esc(String(e)));
}
} return pr.apply(this, arguments); };
}
if (typeof postClick === "function") {
var pc = postClick;
postClick = function (e) {
var b = e.target && e.target.closest ? e.target.closest("[data-p]") : null, a = b ? b.getAttribute("data-p").split(":") : [];
if (a[0] === "tab" && a[1] === "work") {
POST.wreading = null;
cfxWorkMailLoad(true);
}
if (a[0] === "wback") {
POST.wreading = null;
postPaint();
return;
}
if (a[0] === "wread") {
var id = +a[1], row = (cfxWorkBox().box || []).filter(function (m) { return m.id === id; })[0];
return cityRpc("mail_read", { p_id: id }).then(function (o) {
if (o && o.ok) {
o.to = row && row.to;
POST.wreading = o;
if (row)
row.read = true;
cfxWorkMailLoad(true);
postLoad();
}
else {
POST.msg = (o && o.say) || "";
postPaint();
}
}).catch(function (err) { POST.msg = postErr(err); postPaint(); });
}
return pc.apply(this, arguments);
};
}
if (typeof mbOpen === "function") {
var mo = mbOpen;
mbOpen = function () {
var m = MB.near, b = m && m.userData.box;
if (!b || !b.work || MB.busy)
return mo.apply(this, arguments);
MB.busy = true;
cityRpc("work_mailbox", { p_work: b.work }).then(function (o) {
MB.busy = false;
if (!o || !o.ok)
return setStatus(esc((o && o.say) || "The mailbox will not open."));
if (o.mine) {
POST.open = true;
POST.tab = "work";
POST.wreading = null;
if (typeof GAZ !== "undefined") {
GAZ.open = false;
gazPaint();
}
cfxWorkMailLoad(true);
postLoad();
postPaint();
return setStatus("<b>The mailbox of " + esc(o.name || b.work) + "</b>" + (o.waiting ? ": " + o.waiting + " waiting." : ": nothing new."));
}
if (!o.owned)
return setStatus(esc(o.say || "An empty mailbox."));
setStatus("<b>The mailbox of " + esc(o.name || b.work) + ".</b> It is for the people who work there: opening other people's mail is a crime in Somnucor.");
}).catch(function (e) { MB.busy = false; if (typeof rpcMissing === "function" && rpcMissing(e))
return mo.apply(this, arguments); setStatus(esc(postErr(e))); });
};
}
if (typeof mbNear === "function") {
var mn = mbNear;
mbNear = function () {
var r = mn.apply(this, arguments);
try {
var el = document.getElementById("mb-prompt"), m = MB.near, b = m && m.userData.box;
if (el) {
var t = b ? ("📬 Open the mailbox" + (b.work || b.name ? " · " + (b.work || b.name) : "")) : "Open the mailbox";
if (el.textContent !== t)
el.textContent = t;
}
}
catch (e) { }
return r;
};
}
if (typeof mbFlags === "function") {
var mf = mbFlags;
mbFlags = function () {
var r = mf.apply(this, arguments);
try {
var W = cfxWorkBox(), up = {};
(W.places || []).forEach(function (p) { if (+p.unread)
up[p.workplace || p.name] = 1; });
MB.boxes.forEach(function (m) { var b = m.userData.box; if (b && b.work && up[b.work])
m.userData.flag.rotation.x = 0; });
}
catch (e) { }
return r;
};
}
})();
setInterval(function () {
if (typeof walkMode === "undefined" || typeof store === "undefined")
return;
try {
cfxIndoorTick();
}
catch (e) { }
try {
cfxIrPaint();
cfxNursePaint();
cfxHephPaint();
}
catch (e) { }
try {
if (typeof inCityNow === "function" && inCityNow() && typeof signedIn === "function" && signedIn() && typeof WORK !== "undefined" && WORK.data && (WORK.data.jobs || []).length)
cfxWorkMailLoad(false);
}
catch (e) { }
}, 300);
