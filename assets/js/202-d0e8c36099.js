/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var HL = { rows: null, by: {}, at: 0, busy: false, said: 0, tryAt: 0, tryName: null, wait: null };
function hlLoad(force) { return __ZC(202, 0, this, arguments, new.target); }
function hlPlotOf(spec) {
if (!spec || typeof lotPlots !== "function")
return null;
var L = lotPlots();
for (var i = 0; i < L.length; i++) {
var q = L[i];
if (q.homeId === spec.id && (q.kind === "home" || q.kind === "district"))
return q;
}
return null;
}
function hlRow(name, world) { return HL.by[(world || "somnucor") + "|" + name] || null; }
function hlOpen(name, world) {
if (typeof amKeeper === "function" && amKeeper())
return true;
if (typeof signedIn !== "function" || !signedIn())
return false;
var r = hlRow(name, world);
if (r)
return r.open !== undefined && r.open !== null ? !!r.open : !!r.mine;
var lot = typeof lotByName === "function" && (!world || world === "somnucor") ? lotByName(name) : null;
return !!(typeof standing !== "undefined" && standing && (standing.lots || []).some(function (l) { return l.lot === name || (lot && l.lot_id === lot.lot_id); }));
}
var HL_WORLD = { northpole: "the North Pole", neverland: "Neverland", sea: "the Endless Sea", underdark: "the Underdark", moon: "the Moon", mars: "Mars", station: "the space station" };
function hlWhere(w) { return w && w !== "somnucor" ? " (" + (HL_WORLD[w] || w) + ")" : ""; }
function hlMoney(n) { return (Number(n) || 0).toLocaleString(); }
var HL_CARD = "position:fixed;left:50%;top:18%;transform:translateX(-50%);z-index:58;width:min(400px,calc(100vw - 32px));background:rgba(12,10,22,.97);color:var(--bone,#EDE8F8);border:1px solid #8A7A4A;border-radius:8px;padding:14px 16px;font:14px/1.5 system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.5)";
function hlLocked(name, world) { return __ZC(202, 1, this, arguments, new.target); }
(function () {
if (typeof enterBuilding !== "function")
return;
var eb = enterBuilding;
enterBuilding = function (spec) {
var p = null;
try {
p = hlPlotOf(spec);
}
catch (e) { }
if (!p || (typeof amKeeper === "function" && amKeeper()))
return eb.apply(this, arguments);
var self = this, args = arguments;
if (typeof signedIn === "function" && signedIn() && (!HL.rows || Date.now() - HL.at > 20000)) {
if (HL.wait === p.name)
return;
HL.wait = p.name;
hlLoad(true).then(function () {
HL.wait = null;
if (store.inside)
return;
if (hlOpen(p.name))
eb.apply(self, args);
else
hlLocked(p.name);
});
return;
}
if (hlOpen(p.name))
return eb.apply(this, arguments);
hlLocked(p.name);
};
})();
(function () {
if (typeof whRaise !== "function")
return;
var wr = whRaise;
whRaise = function (key, W, G, solids) {
var list = wr.apply(this, arguments);
try {
(list || []).forEach(function (o) {
var dome = !!(WH_PLAN[key] && WH_PLAN[key].style === "dome"), wd = dome ? 2.1 : 1.8, lz = dome ? o.hd + 1.35 : o.hd, c = Math.cos(o.rot), s = Math.sin(o.rot);
var dm = new THREE.Mesh(new THREE.BoxGeometry(wd, 2.2, 0.08), new THREE.MeshStandardMaterial({ color: 0x5A3E2A, roughness: 0.8 }));
var kn = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), new THREE.MeshStandardMaterial({ color: 0xC8A050, roughness: 0.4, metalness: 0.6 }));
kn.position.set(wd / 2 - 0.18, 0, 0.06);
dm.add(kn);
dm.position.set(o.x + lz * s, o.floor + 1.1, o.z + lz * c);
dm.rotation.y = o.rot;
G.add(dm);
var sol = { x: o.x + lz * s, z: o.z + lz * c, hw: wd / 2, hd: 0.12, rot: o.rot };
solids.push(sol);
o.lock = { mesh: dm, solid: sol, hw: wd / 2, open: null };
});
}
catch (e) {
if (window.console)
console.warn("[home locks]", e);
}
return list;
};
})();
function hlWorldTick() {
if (typeof WLD === "undefined" || !WLD.on || typeof WHM === "undefined")
return;
var key = WLD.on;
if (key === "surface")
key = typeof whSurfKey === "function" ? whSurfKey() : null;
var L = key && WHM.homes[key];
if (!L || !L.length)
return;
hlLoad(false);
var world = key === "station" ? "station" : key;
L.forEach(function (o) {
if (!o.lock)
return;
var op = hlOpen(o.name, world);
if (op !== o.lock.open) {
o.lock.open = op;
o.lock.mesh.visible = !op;
o.lock.solid.hw = op ? -1 : o.lock.hw;
}
if (!op && typeof camera !== "undefined") {
var dx = camera.position.x - o.lock.solid.x, dz = camera.position.z - o.lock.solid.z;
if (dx * dx + dz * dz < 2.2)
hlLocked(o.name, world);
}
});
}
setInterval(function () { try {
hlWorldTick();
}
catch (e) { } }, 500);
var PH = { open: false, tab: "msgs", inbox: null, book: null, pages: null, thread: null, withId: null, withName: "", msg: "", q: "", at: 0, busy: false, draft: {}, pageTo: null, pageText: "", showFor: null, missing: false };
var PH_BTN = "background:#E8C66A;color:#17120A;border:0;border-radius:14px;padding:6px 12px;font:600 13px system-ui,sans-serif;cursor:pointer";
var PH_BTN2 = "background:#2A2448;color:#EDE8F8;border:0;border-radius:14px;padding:6px 12px;font:600 13px system-ui,sans-serif;cursor:pointer";
var PH_CSS = "#ph-btn{position:fixed;left:10px;bottom:calc(132px + env(safe-area-inset-bottom,0px));z-index:40;width:40px;height:40px;border-radius:12px;border:1px solid rgba(232,198,106,.55);background:rgba(20,16,40,.82);color:#E8C66A;font:18px/38px system-ui,sans-serif;text-align:center;cursor:pointer;padding:0}" +
"#ph-btn .b{position:absolute;top:-5px;right:-5px;min-width:17px;height:17px;border-radius:9px;background:#C0392B;color:#fff;font:600 11px/17px system-ui,sans-serif;padding:0 3px;box-sizing:border-box}" +
"#ph-box{position:fixed;left:58px;bottom:calc(84px + env(safe-area-inset-bottom,0px));z-index:57;width:min(340px,calc(100vw - 70px));height:min(76vh,620px);display:none;flex-direction:column;background:#0B0A14;border:3px solid #2E2A40;border-radius:26px;box-shadow:0 12px 40px rgba(0,0,0,.6);color:#EDE8F8;font:14px/1.45 system-ui,sans-serif;overflow:hidden}" +
"#ph-box .top{display:flex;justify-content:space-between;align-items:center;padding:10px 18px 4px;font:600 12px system-ui,sans-serif;color:#C9C2E0}" +
"#ph-box .tabs{display:flex;gap:4px;padding:4px 10px 8px}#ph-box .tabs span{flex:1;text-align:center;padding:6px 0;border-radius:12px;background:#17142A;cursor:pointer;font:600 12.5px system-ui,sans-serif}" +
"#ph-box .tabs span.on{background:#E8C66A;color:#17120A}" +
"#ph-box .body{flex:1;overflow:auto;padding:0 12px 10px}" +
"#ph-box .row{display:block;padding:8px 10px;border-radius:12px;background:#15122A;margin:6px 0;cursor:default}" +
"#ph-box .row .n{font-weight:600}#ph-box .row .s{color:#A9A2C0;font-size:12.5px}" +
"#ph-box .row .acts{display:flex;gap:6px;justify-content:flex-end;margin-top:6px}" +
"#ph-box .bub{max-width:80%;padding:7px 11px;border-radius:14px;margin:4px 0;white-space:pre-wrap;word-wrap:break-word}" +
"#ph-box .me{margin-left:auto;background:#3A6FD8;color:#fff;border-bottom-right-radius:4px}#ph-box .them{background:#26223C;border-bottom-left-radius:4px}" +
"#ph-box input,#ph-box textarea,#ph-box select{width:100%;box-sizing:border-box;background:#15122A;color:#fff;border:1px solid #3A3160;border-radius:12px;padding:8px 10px;font:14px system-ui,sans-serif}" +
"#ph-box .send{display:flex;gap:6px;padding:8px 12px 12px;border-top:1px solid #1E1A30}" +
"#ph-box .msg{color:#E8C66A;font-size:12.5px;padding:0 14px 6px;min-height:4px}" +
"#ph-box .dot{display:inline-block;width:8px;height:8px;border-radius:50%;background:#4CC77A;margin-right:5px}" +
"#ph-box .pb-h{display:flex;justify-content:space-between;align-items:center;padding:8px 10px;margin:4px 0 0;border-radius:10px;background:#1C1834;cursor:pointer;font-weight:600}" +
"#ph-box .pb-h.l1{margin-left:10px;background:#18152C;font-weight:500}#ph-box .pb-h.l2{margin-left:20px;background:#15122A;font-weight:500;font-size:13.5px}" +
"#ph-box .pb-h.on{color:#E8C66A}#ph-box .pb-r{margin-left:10px}#ph-box .pb-in .pb-r{margin-left:20px}" +
"#ph-box .home-bar{height:5px;width:110px;border-radius:3px;background:#3A3550;margin:0 auto 8px}";
function phErr(e) { var m = String((e && e.message) || e || ""); if (/function|404|PGRST|does not exist/i.test(m)) {
PH.missing = true;
return "The phone network opens soon.";
} return m; }
function phEls() {
var b = document.getElementById("ph-btn");
if (b)
return b;
var st = document.createElement("style");
st.textContent = PH_CSS;
document.head.appendChild(st);
b = document.createElement("button");
b.id = "ph-btn";
b.title = "Your phone (P)";
b.innerHTML = "📱<span class='b' style='display:none'></span>";
b.onclick = function (ev) { ev.stopPropagation(); PH.open = !PH.open; if (PH.open) {
phLoad();
} phPaint(); };
document.body.appendChild(b);
var box = document.createElement("div");
box.id = "ph-box";
document.body.appendChild(box);
["keydown", "keyup", "keypress"].forEach(function (t) { box.addEventListener(t, function (ev) { if (/INPUT|TEXTAREA|SELECT/.test(ev.target.tagName))
ev.stopPropagation(); }); });
return b;
}
addEventListener("keydown", function (e) {
if (e.repeat || e.ctrlKey || e.altKey || e.metaKey || (e.key !== "p" && e.key !== "P"))
return;
var t = e.target, tag = t && t.tagName || "";
if (/INPUT|TEXTAREA|SELECT/.test(tag) || (t && t.isContentEditable))
return;
if (typeof ARC !== "undefined" && ARC.open)
return;
if (typeof bugIsOpen === "function" && bugIsOpen())
return;
var b = document.getElementById("ph-btn");
if (!b)
return;
e.preventDefault();
if (!PH.open) {
try {
if (document.pointerLockElement)
document.exitPointerLock();
}
catch (er) { }
}
b.click();
});
function phCall(name, body) { return cityRpc(name, body || {}).then(function (d) { PH.missing = false; return d; }); }
function phLoad() { return __ZC(202, 2, this, arguments, new.target); }
function phBook() { phCall("phone_book", { p_q: PH.q || "" }).then(function (d) { PH.book = d; phPaint(); }).catch(function (e) { PH.msg = phErr(e); phPaint(); }); }
function phPages() { phCall("phone_pages").then(function (d) { PH.pages = d; phPaint(); }).catch(function (e) { PH.msg = phErr(e); phPaint(); }); }
function phThread(id) { phCall("phone_thread", { p_with: id }).then(function (d) { PH.thread = d; if (d && d.name)
PH.withName = d.name; phPaint(true); phCall("phone_inbox").then(function (x) { PH.inbox = x; phBadge(); }); }).catch(function (e) { PH.msg = phErr(e); phPaint(); }); }
function phBadge() {
var b = phEls(), s = b.querySelector(".b"), n = PH.inbox && PH.inbox.ok ? (Number(PH.inbox.unread) || 0) + (Number(PH.inbox.pages_open) || 0) + (Number(PH.inbox.friend_asks) || 0) : 0;
s.textContent = n > 99 ? "99+" : String(n);
s.style.display = n ? "block" : "none";
}
function phOpenPage(wp, text) { PH.open = true; PH.tab = "pager"; PH.pageTo = wp; PH.pageText = text || ""; phEls(); phLoad(); phPages(); phPaint(); }
function phClock() { var d = new Date(); return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2); }
function phWhen(t) { if (!t)
return ""; var d = new Date(t), s = (Date.now() - d.getTime()) / 1000; if (s < 60)
return "now"; if (s < 3600)
return Math.floor(s / 60) + " min"; if (s < 86400)
return Math.floor(s / 3600) + " h"; return d.toLocaleDateString(); }
var PH_CATS = [
["City services, law and care", /^(courthouse|institution|hospital|library|museum|school|wizardschool|chapel)$/, /post office|chronicle press|community service|undertaker/i],
["Banks, land and money", /^bank$/],
["Food, drink and lodging", /^(hotel)$/, /inn\b|tavern|bakery|brew|cook|butcher|greengrocer|dairy|kitchen|caf|tea/i],
["Shows and pastimes", /^(picturehouse)$/, /arcade|theatre|theater|casino|toy|music|gallery/i],
["Shops and crafts", /^(shop|cottage)$/],
["Travel and transport", /^(station|garage|subwayentrance|spaceport|lighthouse)$/],
["Works, farms and the wild", /^(warehouse|factory|reactor|biodome|shed|barn|farmhouse|windmill)$/, /gardeners|forester|hunters|menagerie/i],
["Homes and estates", /^house$/]
];
var PH_TRAD = null;
function phTradOf(key) {
if (!PH_TRAD) {
PH_TRAD = {};
if (typeof DEITY !== "undefined")
for (var d in DEITY) {
var D0 = DEITY[d];
PH_TRAD[(typeof tlHouseName === "function" ? tlHouseName(D0) : D0.name + "'s house")] = D0.trad || "Other";
}
}
return PH_TRAD[key] || null;
}
function phCatOf(p) { return __ZC(202, 3, this, arguments, new.target); }
function phRingOrder() {
var o = [];
if (typeof ATL_RINGS !== "undefined")
ATL_RINGS.forEach(function (r, i) { o.push({ k: r.k, name: r.name || r.k, i: i }); });
return o;
}
function phBookPlaces(bk) { return __ZC(202, 4, this, arguments, new.target); }
var PFR = { list: null, at: 0, busy: null, asks: null, missing: false, by: {} };
function pfLoad(force) {
if (typeof signedIn !== "function" || !signedIn())
return Promise.resolve(null);
if (PFR.busy)
return PFR.busy;
if (!force && PFR.list && Date.now() - PFR.at < 30000)
return Promise.resolve(PFR.list);
if (PFR.missing && !force && Date.now() - PFR.at < 120000)
return Promise.resolve(PFR.list);
PFR.busy = cityRpc("friends_list", {}).then(function (d) {
PFR.busy = null;
PFR.at = Date.now();
PFR.missing = false;
PFR.list = d;
PFR.by = {};
if (d && d.ok) {
(d.friends || []).forEach(function (r) { PFR.by[r.id] = "friend"; });
(d.asks_out || []).forEach(function (r) { PFR.by[r.id] = "asked"; });
(d.asks_in || []).forEach(function (r) { PFR.by[r.id] = "askme"; });
(d.blocked || []).forEach(function (r) { PFR.by[r.id] = "blocked"; });
PFR.asks = (d.asks_in || []).length;
}
if (PH.open)
phPaint();
if (typeof wcPaint === "function")
try {
wcPaint(false);
}
catch (e) { }
return d;
}).catch(function (e) { PFR.busy = null; PFR.at = Date.now(); var m = String((e && e.message) || e || ""); if (/function|404|PGRST|does not exist/i.test(m))
PFR.missing = true; if (PH.open)
phPaint(); return null; });
return PFR.busy;
}
function pfState(id) { return id && PFR.by[id] || null; }
function pfBlockedIds() { var o = {}; if (PFR.list && PFR.list.ok)
(PFR.list.blocked || []).forEach(function (r) { o[r.id] = r.name || "someone"; }); return o; }
function pfBtn(act, id, name, label, main) { return "<button data-pf='" + act + "' data-u='" + esc(id) + "' data-name='" + esc(name || "") + "' style='" + (main ? PH_BTN : PH_BTN2) + "'>" + label + "</button>"; }
function pfButtons(id, name, small) { return __ZC(202, 5, this, arguments, new.target); }
function pfBody() { return __ZC(202, 6, this, arguments, new.target); }
function pfDo(act, id, name, sure) { return __ZC(202, 7, this, arguments, new.target); }
function phPaint(scrollEnd) {
var b = phEls(), box = document.getElementById("ph-box");
var show = typeof signedIn === "function" && signedIn();
b.style.display = show ? "block" : "none";
if (!show || !PH.open) {
box.style.display = "none";
return;
}
box.querySelectorAll("[data-keep]").forEach(function (i) { PH.draft[i.getAttribute("data-keep")] = i.value; });
var H = [], T = PH.tab;
H.push("<div class='top'><span>Somnucor Tel</span><span>" + phClock() + "</span><span><span data-p='cab' title='Call a cab' style='cursor:pointer;font-size:14px;margin-right:12px'>🚕</span><span data-p='wayhome' title='Show me the way home' style='cursor:pointer;font-size:14px;margin-right:12px'>🏠</span><span data-p='close' style='cursor:pointer;font-size:15px'>✕</span></span></div>");
H.push("<div class='tabs'>" + [["msgs", "Messages"], ["friends", "Friends"], ["book", "Phone book"], ["pager", "Pager"]].map(function (t) { var k = t[0] === "friends" && PFR.list && PFR.list.ok ? (PFR.list.asks_in || []).length : 0; return "<span data-tab='" + t[0] + "' class='" + (T === t[0] ? "on" : "") + "'>" + t[1] + (k ? " <b style='color:#C0392B'>" + k + "</b>" : "") + "</span>"; }).join("") + "</div>");
H.push("<div class='msg'>" + esc(PH.msg || "") + "</div>");
var body = [], foot = "";
if (T === "msgs" && PH.withId) {
body.push("<div style='display:flex;align-items:center;gap:8px;margin:2px 0 6px'><span data-p='back' style='cursor:pointer;color:#E8C66A'>‹ Back</span><b style='flex:1'>" + esc(PH.withName || "") + "</b>" + pfButtons(PH.withId, PH.withName, true) + "</div>");
var M = PH.thread && PH.thread.messages || [];
if (!M.length)
body.push("<div class='s' style='color:#A9A2C0;text-align:center;margin-top:20px'>No messages yet. Say hello.</div>");
M.forEach(function (m) {
body.push("<div style='display:flex'><div class='bub " + (m.mine ? "me" : "them") + "'>" + esc(m.body) + "<div style='font-size:10.5px;opacity:.7;text-align:right'>" + phWhen(m.at) +
(m.mine ? "" : " · <span data-phrep='" + (+m.id) + "' role='button' style='cursor:pointer;text-decoration:underline'>Report</span>") + "</div></div></div>");
});
foot = "<div class='send'><input data-keep='say' placeholder='Message' maxlength='1000' value='" + esc(PH.draft.say || "") + "'><button data-p='send' style='" + PH_BTN + "'>Send</button></div>";
}
else if (T === "msgs") {
var th = PH.inbox && PH.inbox.threads || [];
if (PH.inbox && !PH.inbox.ok)
body.push("<div class='row'>" + esc(PH.inbox.say || "") + "</div>");
if (!th.length)
body.push("<div class='row'><div class='n'>No messages yet</div><div class='s'>Find a resident in the phone book and send them a message.</div></div>");
th.forEach(function (t) {
body.push("<div class='row' data-with='" + esc(t.with) + "' data-name='" + esc(t.name || "") + "' style='cursor:pointer'><div style='display:flex;justify-content:space-between'><span class='n'>" + esc(t.name || "Someone") + "</span><span class='s'>" + phWhen(t.at) + "</span></div>" +
"<div class='s'>" + (t.mine ? "You: " : "") + esc(String(t.last || "").slice(0, 80)) + (t.unread ? " <b style='color:#E8C66A'>· " + t.unread + " new</b>" : "") + "</div></div>");
});
}
else if (T === "book") {
body.push("<input data-keep='q' placeholder='Search names and businesses' value='" + esc(PH.draft.q != null ? PH.draft.q : PH.q) + "'>");
var bk = PH.book;
if (!bk)
body.push("<div class='s' style='margin-top:10px'>Opening the book…</div>");
else if (!bk.ok)
body.push("<div class='row'>" + esc(bk.say || "") + "</div>");
else {
if (PH.showFor) {
var homes = (HL.rows || []).filter(function (r) { return !r.held && r.kind === "home" && (r.for_sale || r.to_let); });
body.push("<div class='row'><div class='n'>Show a home to " + esc(PH.showFor.name) + "</div><select data-keep='showlot'>" + homes.map(function (r) { return "<option value='" + r.id + "'>" + esc(r.name + hlWhere(r.world)) + "</option>"; }).join("") + "</select>" +
"<div class='acts'><button data-p='showcancel' style='" + PH_BTN2 + "'>Cancel</button><button data-p='showgo' style='" + PH_BTN + "'>Open it for 30 minutes</button></div></div>");
}
body.push("<div class='s' style='margin:10px 2px 0;font-weight:600'>Residents</div>");
(bk.people || []).forEach(function (p) {
body.push("<div class='row'><div class='n'>" + (p.here ? "<span class='dot'></span>" : "") + esc(p.name || "A resident") + "</div><div class='s'>" + (p.home ? esc(p.home) : "No address yet") + "</div>" +
"<div class='acts' style='flex-wrap:wrap'>" + pfButtons(p.id, p.name, false) + (bk.realtor ? "<button data-show='" + esc(p.id) + "' data-name='" + esc(p.name || "") + "' style='" + PH_BTN2 + "'>Show a home</button>" : "") + "<button data-with='" + esc(p.id) + "' data-name='" + esc(p.name || "") + "' style='" + PH_BTN + "'>Message</button></div></div>");
});
if (!(bk.people || []).length)
body.push("<div class='s'>Nobody by that name.</div>");
body.push(phBookPlaces(bk));
}
}
else if (T === "friends") {
body.push(pfBody());
}
else if (T === "pager") {
if (PH.pageTo) {
body.push("<div class='row'><div class='n'>Page " + esc(PH.pageTo) + "</div><textarea data-keep='pagetext' rows='3' maxlength='600' placeholder='What do you need?'>" + esc(PH.draft.pagetext != null ? PH.draft.pagetext : PH.pageText) + "</textarea>" +
"<div class='acts'><button data-p='pagecancel' style='" + PH_BTN2 + "'>Cancel</button><button data-p='pagego' style='" + PH_BTN + "'>Send page</button></div></div>");
}
var pg = PH.pages;
if (!pg)
body.push("<div class='s' style='margin-top:10px'>Reading the pager…</div>");
else if (!pg.ok)
body.push("<div class='row'>" + esc(pg.say || "") + "</div>");
else {
if ((pg.incoming || []).length) {
body.push("<div class='s' style='margin:6px 2px 0;font-weight:600'>Pages for where you work</div>");
pg.incoming.forEach(function (p) {
body.push("<div class='row'><div style='display:flex;justify-content:space-between'><span class='n'>" + esc(p.from || "Someone") + " → " + esc(p.workplace) + "</span><span class='s'>" + phWhen(p.at) + "</span></div><div>" + esc(p.body) + "</div>" +
(p.taken ? "<div class='s'>Taken by " + esc(p.taken) + (p.done ? ", done" : "") + "</div>" : "") + (p.answer ? "<div class='s'>Answer: " + esc(p.answer) + "</div>" : "") +
(p.done ? "" : "<input data-keep='ans" + p.id + "' placeholder='Answer them' maxlength='600' value='" + esc(PH.draft["ans" + p.id] || "") + "' style='margin-top:6px'><div class='acts'>" + (p.taken ? "" : "<button data-take='" + p.id + "' style='" + PH_BTN2 + "'>Take it</button>") +
"<button data-done='" + p.id + "' style='" + PH_BTN2 + "'>Done</button><button data-ans='" + p.id + "' style='" + PH_BTN + "'>Answer</button></div>") + "</div>");
});
}
body.push("<div class='s' style='margin:10px 2px 0;font-weight:600'>Your pages</div>");
if (!(pg.sent || []).length)
body.push("<div class='row'><div class='s'>Page any business from the phone book: a plumber, a realtor, the bakery. Whoever works there answers.</div></div>");
(pg.sent || []).forEach(function (p) {
body.push("<div class='row'><div style='display:flex;justify-content:space-between'><span class='n'>" + esc(p.workplace) + "</span><span class='s'>" + phWhen(p.at) + "</span></div><div class='s'>" + esc(p.body) + "</div>" +
"<div>" + (p.answer ? "<b>" + esc(p.taken || "They") + ":</b> " + esc(p.answer) : p.taken ? esc(p.taken) + " has it in hand." : "Waiting for someone there to take it.") + (p.done ? " <span class='s'>· done</span>" : "") + "</div></div>");
});
}
}
H.push("<div class='body'>" + body.join("") + "</div>" + foot + "<div class='home-bar'></div>");
var sc = box.querySelector(".body"), keepScroll = sc ? sc.scrollTop : 0, focus = document.activeElement && box.contains(document.activeElement) ? document.activeElement.getAttribute("data-keep") : null;
box.innerHTML = H.join("");
box.style.display = "flex";
sc = box.querySelector(".body");
if (sc)
sc.scrollTop = scrollEnd ? sc.scrollHeight : keepScroll;
if (focus) {
var f = box.querySelector("[data-keep='" + focus + "']");
if (f) {
f.focus();
try {
var n = f.value.length;
f.setSelectionRange(n, n);
}
catch (e) { }
}
}
function on(sel, fn) { box.querySelectorAll(sel).forEach(function (el) { el.onclick = function (ev) { ev.stopPropagation(); fn(el); }; }); }
function val(k) { var i = box.querySelector("[data-keep='" + k + "']"); return i ? i.value : ""; }
on("[data-tab]", function (el) { PH.tab = el.getAttribute("data-tab"); PH.msg = ""; if (PH.tab !== "msgs")
PH.withId = null; if (PH.tab === "book" && !PH.book)
phBook(); if (PH.tab === "pager")
phPages(); if (PH.tab === "friends")
pfLoad(true); phPaint(); });
on("[data-p='close']", function () { PH.open = false; phPaint(); });
on("[data-p='cab']", function () { PH.open = false; phPaint(); if (typeof txiOpen === "function")
txiOpen(true); });
on("[data-p='wayhome']", function () { PH.open = false; phPaint(); if (typeof showTheWayHome === "function")
showTheWayHome(); });
on("[data-p='back']", function () { PH.withId = null; PH.thread = null; phPaint(); });
on("[data-phrep]", function (el) {
phCall("chat_report", { p_kind: "phone", p_id: +el.getAttribute("data-phrep"), p_why: null }).then(function (o) {
PH.msg = o === "ok" ? "Reported. A moderator will look at it." : String(o || "");
phPaint();
}).catch(function (e) { PH.msg = phErr(e); phPaint(); });
});
on("[data-with]", function (el) { PH.tab = "msgs"; PH.withId = el.getAttribute("data-with"); PH.withName = el.getAttribute("data-name") || ""; PH.thread = null; PH.msg = ""; phPaint(); phThread(PH.withId); });
on("[data-grp]", function (el) { var g = el.getAttribute("data-grp"), o = PH.bookOpen || (PH.bookOpen = {}); o[g] = !o[g]; phPaint(); });
on("[data-page]", function (el) { PH.tab = "pager"; PH.pageTo = el.getAttribute("data-page"); PH.pageText = ""; PH.draft.pagetext = null; phPages(); phPaint(); });
on("[data-show]", function (el) { PH.showFor = { id: el.getAttribute("data-show"), name: el.getAttribute("data-name") || "them" }; hlLoad(true).then(function () { phPaint(); }); phPaint(); });
on("[data-p='showcancel']", function () { PH.showFor = null; phPaint(); });
on("[data-p='showgo']", function () {
var lot = Number(val("showlot"));
if (!lot || !PH.showFor)
return;
phCall("show_home", { p_lot: lot, p_user: PH.showFor.id, p_minutes: 30 }).then(function (d) { PH.msg = d && d.say || ""; PH.showFor = null; phPaint(); }).catch(function (e) { PH.msg = phErr(e); phPaint(); });
});
on("[data-p='send']", function () {
var t = val("say").trim();
if (!t || !PH.withId)
return;
phCall("phone_send", { p_to: PH.withId, p_body: t }).then(function (d) { if (d && d.ok) {
PH.draft.say = "";
PH.msg = "";
var i = box.querySelector("[data-keep='say']");
if (i)
i.value = "";
phThread(PH.withId);
}
else {
PH.msg = d && d.say || "";
phPaint();
} }).catch(function (e) { PH.msg = phErr(e); phPaint(); });
});
var si = box.querySelector("[data-keep='say']");
if (si)
si.onkeydown = function (ev) { if (ev.key === "Enter") {
ev.preventDefault();
var s = box.querySelector("[data-p='send']");
if (s)
s.click();
} };
var qi = box.querySelector("[data-keep='q']");
if (qi)
qi.oninput = function () { PH.q = qi.value; clearTimeout(PH.qt); PH.qt = setTimeout(phBook, 350); };
on("[data-p='pagecancel']", function () { PH.pageTo = null; PH.draft.pagetext = null; phPaint(); });
on("[data-p='pagego']", function () {
var t = val("pagetext").trim();
if (!t)
return;
phCall("phone_page", { p_workplace: PH.pageTo, p_body: t }).then(function (d) { PH.msg = d && d.say || ""; if (d && d.ok) {
PH.pageTo = null;
PH.draft.pagetext = null;
} phPages(); }).catch(function (e) { PH.msg = phErr(e); phPaint(); });
});
function answer(id, text, done) { phCall("phone_page_answer", { p_id: id, p_answer: text || null, p_done: !!done }).then(function (d) { PH.msg = d && d.say || ""; PH.draft["ans" + id] = ""; phPages(); }).catch(function (e) { PH.msg = phErr(e); phPaint(); }); }
on("[data-take]", function (el) { answer(Number(el.getAttribute("data-take")), null, false); });
on("[data-done]", function (el) { var id = Number(el.getAttribute("data-done")); answer(id, val("ans" + id), true); });
on("[data-ans]", function (el) { var id = Number(el.getAttribute("data-ans")); var t = val("ans" + id).trim(); if (t)
answer(id, t, false); });
on("[data-pf]", function (el) { pfDo(el.getAttribute("data-pf"), el.getAttribute("data-u"), el.getAttribute("data-name") || ""); });
}
setInterval(function () {
try {
var b = phEls(), show = typeof signedIn === "function" && signedIn();
if (b.style.display !== (show ? "block" : "none"))
phPaint();
if (!show || PH.missing && Date.now() - PH.at < 120000)
return;
if (!PFR.list && !PFR.busy)
pfLoad(false);
var gap = PH.open && PH.withId ? 5000 : 20000;
if (Date.now() - PH.at < gap)
return;
PH.at = Date.now();
if (PH.open && PH.withId) {
phThread(PH.withId);
return;
}
phCall("phone_inbox").then(function (d) {
var was = PH.inbox && PH.inbox.unread;
PH.inbox = d;
phBadge();
if (PH.open && PH.tab === "msgs" && !PH.withId) {
var ae = document.activeElement;
if (!(ae && document.getElementById("ph-box").contains(ae)))
phPaint();
}
if (d && d.ok && was != null && d.unread > was && !PH.open && typeof setStatus === "function")
setStatus("📱 <b>A new message</b> on your phone.");
if (d && d.ok && PFR.asks != null && (Number(d.friend_asks) || 0) > PFR.asks) {
pfLoad(true);
if (!PH.open && typeof setStatus === "function")
setStatus("📱 Somebody asked to be <b>your friend</b>. See Friends on your phone.");
}
if (d && d.ok)
PFR.asks = Number(d.friend_asks) || 0;
}).catch(function (e) { phErr(e); });
}
catch (e) { }
}, 1000);
