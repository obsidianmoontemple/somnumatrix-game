/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var ERD_FOLK = {
city: [["Mrs Pell, the grocer", "Tobin, a carter", "Ada Venn, the clerk at the Tower"], ["a basket of eggs", "a sealed letter", "a bolt of blue cloth", "a mended clock", "a jar of honey", "a parcel of books"]],
mall: [["Jun, a stallholder", "Mrs Arkwright, the floor manager"], ["a shoebox", "a gift bag", "a till roll", "a tailor's parcel"]],
underground: [["Old Wim, the booking clerk", "Dessa, a track walker"], ["a lost umbrella", "a lamp wick", "a timetable", "a satchel of tickets"]],
aurora: [["Officer Thale, the quartermaster", "Nia Okoro, a hydroponics tech"], ["a seed tray", "a sealed sample case", "a crew mail packet", "a spare filter"]],
ares: [["Dock chief Ruzo", "Pella, a cargo clerk"], ["a manifest", "a crate of bolts", "a medical kit", "a pressure valve"]],
jupiter: [["Ilse, a cloud-skimmer", "Warden Mabry"], ["a gas sample", "a weather log", "a pair of mag boots", "a coil of cable"]],
saturn: [["Corin, a ring surveyor", "Hollis, a deck hand"], ["a ring chart", "a crate of ice cores", "a calibration lens", "a tool roll"]],
uranus: [["Teodor, a pressure tech", "Sabine, a station cook"], ["a spice tin", "a sealed hatch key", "a reading slate", "a crate of rations"]],
neptune: [["Maren, a storm watcher", "Bertil, a pump hand"], ["a storm log", "a gasket set", "a thermos", "a pouch of letters"]],
casino: [["Lucien, a croupier", "Miss Delacroix, the hostess"], ["a velvet chip case", "a sealed envelope", "a bottle of sparkling water", "a pressed jacket"]],
shuttle: [["the purser", "a steward"], ["a blanket", "a tray of tea", "a passenger's coat"]],
moon: [["Rafe, a regolith miner", "Doctor Ines Kaur"], ["a core sample", "a med pouch", "a helmet lamp", "a sack of potatoes"]],
space: [["the pilot on the open channel", "a salvage crew"], ["a beacon", "a fuel cell", "a drone part"]],
mars: [["Sol Abara, a terraformer", "Greta, a dome farmer"], ["a seedling crate", "a dust filter", "a rover part", "a soil sample"]],
pluto: [["Halvard, a hall keeper", "Yuki, an ice cutter"], ["an ice core", "a heater coil", "a sealed log book", "a wool cap"]],
gr_jupiter: [["Vellamar's harbourmaster", "Sera, a sky-gardener"], ["a cloud-silk scarf", "a crate of sky fruit", "a ledger", "a lantern"]],
gr_saturn: [["Halcyra's archivist", "Bram, a ring-glass maker"], ["a ring-glass bowl", "a scroll case", "a box of tea", "a chime"]],
gr_uranus: [["Celadine's lamplighter", "Ottilie, a tailor"], ["a bolt of teal silk", "a lamp mantle", "a hat box", "a music roll"]],
gr_neptune: [["Saphirel's ferryman", "Ione, a pearl cutter"], ["a pearl case", "a net", "a tide table", "a bottle of kelp tonic"]],
mercury: [["Varenne's apprentice", "Ostrava, a heat-shield smith"], ["a crucible", "a pair of tongs", "a sealed ingot", "a cooling cloak"]],
venus: [["Lisette, an acid-garden keeper", "Captain Moreau"], ["a sealed flask", "a rose cutting", "a glass mask", "a perfume case"]],
veyar: [["Ilvessa's choir mistress", "Tamsin, a string maker"], ["a tuning fork", "a hymn sheet", "a spool of gut string", "a bell clapper"]],
race: [["the pit boss", "Kesh, a tyre fitter"], ["a wheel nut set", "a can of fuel", "a pit board", "a fresh helmet visor"]],
greenwold: [["Goodwife Hale of Harrowmead", "Pip Thornberry, a shepherd"], ["a round of cheese", "a pail of milk", "a sheaf of barley", "a pot of jam"]],
party: [["Confetti Carla", "Benny, a balloon seller"], ["a box of streamers", "a crate of lemonade", "a party hat", "a cake"]],
northpole: [["Elf Tinsel, the wrapping lead", "Mrs Winter, the cook"], ["a wrapped present", "a tray of gingerbread", "a spool of ribbon", "a reindeer harness bell"]],
lounge: [["GiGi's maître d'", "Rosa, a waitress"], ["a tray of teacakes", "a vase of roses", "a record", "a silk shawl"]],
family: [["the wedding planner", "Nan Wilder, a foster mother"], ["a bouquet", "a christening gown", "a cake topper", "a photo album"]],
mmin: [["the machine's crew chief"], ["a fuse", "a coil of wire", "a manual"]],
neverland: [["Tiddler, a Lost Boy", "Mother Gull of Aerieholm"], ["a bag of acorns", "a feather cap", "a bottle of moonlight", "a carved whistle"]],
sea: [["Old Nerys of Saltcrown", "Captain Dov, a fishing skipper"], ["a coil of rope", "a jar of olives", "a net float", "a sealed amphora"]],
underdark: [["Velra, a dark-elf guide", "Brunhild Stonehallow, a dwarf smith"], ["a glowcap lantern", "a silk bundle", "a sealed rune tablet", "a cask of deep ale"]],
battle: [["Sergeant Krell of Bastion Varr", "Ma Oduya, a field medic"], ["a quiver of arrows", "a field dressing kit", "a sealed dispatch", "a whetstone"]],
hall: [["the Doorwarden", "a quiet archivist"], ["a ring of keys", "a lantern", "a sealed map"]],
heavens: [["Seraphine of Lumenreach", "an old bell ringer"], ["a feather quill", "a bell rope", "a cloud-silk veil", "a jar of light"]],
orbital: [["the Orbital's purser", "Ravi, a docking hand"], ["a pass card", "a crate of fruit", "a toolkit"]],
kidszone: [["Pippa the ringmaster", "Mr Bramble, the zookeeper"], ["a bucket of fish for the seals", "a bag of carrots", "a big red ball", "a box of crayons", "a juggling set"]],
faerie: [["Thistledown, a pixie herald", "the Moth Queen's page"], ["a thimble of dew", "an acorn cup", "a spider-silk ribbon", "a toadstool cap"]],
future: [["Mx Calloway, a transit planner", "Juno, a solar fitter"], ["a data chip", "a battery pack", "a sealed design roll", "a bike part"]],
depths: [["Coralmere's tide-keeper", "Wren, a pearl diver"], ["a pearl net", "a sealed clam", "a kelp rope", "a lantern fish jar"]],
mirror: [["Gemelline's glazier", "a twin who will not say which"], ["a silvered mirror", "a reversed letter", "a glass key", "a pair of gloves"]],
dead: [["Lanternhome's candle keeper", "Old Ambrose, a ferryman"], ["a box of candles", "a marigold wreath", "a letter to the living", "a lamp oil flask"]],
frozen: [["Isvarden's hearth keeper", "Sigrun, a sled driver"], ["a fur bundle", "a sack of firewood", "a pot of stew", "an ice pick"]],
elsewhere: [["Ondrevar's map maker", "a stranger in green"], ["a folded map", "a seed pouch", "a strange key", "a sealed jar"]],
stars: [["Celestara's astronomer", "Lio, a lens grinder"], ["a star chart", "a lens case", "a brass sextant", "a night log"]],
desert: [["Sahmira's water seller", "Khalid, a caravan master"], ["a water skin", "a bolt of linen", "a sack of dates", "a saffron pouch"]],
underworld: [["Hearthdeep's coal warden", "Morrow, a ferryman's boy"], ["a coal scuttle", "a bundle of ash wood", "a sealed urn", "a horn lantern"]],
void: [["Stillspire's listener", "a figure made of quiet"], ["a silent bell", "a blank book", "a dark-glass lens"]],
fire: [["Kilnhaven's kiln master", "Ember, a glassblower"], ["a crucible of glaze", "a fired pot", "a pair of tongs", "a sealed salve"]],
wasteland: [["Wellspring's water warden", "Rook, a scrapper"], ["a water can", "a crate of scrap", "a radio", "a seed bag"]]
};
var ERD = { board: null, boardAt: 0, busy: false, missing: false, open: false, tab: "here", offers: {}, near: null, prompted: false, guide: null,
places: null, placesAt: 0, seen: null, pingAt: 0, local: null, card: null, msg: "" };
function erdSigned() { return typeof signedIn === "function" && signedIn(); }
function erdRpc(n, a) { try {
return typeof cityRpc === "function" ? cityRpc(n, a || {}) : Promise.reject(new Error("offline"));
}
catch (e) {
return Promise.reject(e);
} }
function erdMissing(e) { return typeof rpcMissing === "function" ? rpcMissing(e) : /PGRST202|Could not find the function|does not exist|schema cache/i.test(String((e && e.message) || e || "")); }
function erdEsc(s) { return typeof esc === "function" ? esc(s == null ? "" : s) : String(s == null ? "" : s).replace(/[&<>"']/g, ""); }
function erdSay(h, big) { return __ZC(348, 0, this, arguments, new.target); }
function erdN(n) { return (+n || 0).toLocaleString(); }
function erdWorld() { try {
if (typeof dgrWhere === "function")
return dgrWhere();
}
catch (e) { } return "city"; }
function erdWorldName(id) {
if (!id)
return "anywhere";
if (typeof DGR_W !== "undefined" && DGR_W[id])
return DGR_W[id].name.split(/[:,(]/)[0].trim();
return id === "city" ? "Somnucor" : id;
}
function erdFolk(id) { return ERD_FOLK[id] || ERD_FOLK[String(id || "").replace(/^gr_/, "")] || ERD_FOLK.city; }
function erdHash(s) { var h = 2166136261; s = String(s || ""); for (var i = 0; i < s.length; i++) {
h ^= s.charCodeAt(i);
h = Math.imul(h, 16777619);
} return h >>> 0; }
function erdLocal() {
if (ERD.local)
return ERD.local;
try {
ERD.local = JSON.parse(localStorage.getItem("erd-runs-v1") || "{}") || {};
}
catch (e) {
ERD.local = {};
}
return ERD.local;
}
function erdLocalSave() { try {
localStorage.setItem("erd-runs-v1", JSON.stringify(ERD.local || {}));
}
catch (e) { } }
function erdPlaces() { return __ZC(348, 1, this, arguments, new.target); }
function erdPlaceNamed(name) {
var L = erdPlaces();
for (var i = 0; i < L.length; i++)
if (L[i].name === name)
return L[i];
return null;
}
function erdDestFor(offer, from) {
var C = ERD.dests || (ERD.dests = {}), k = erdWorld() + "|" + offer.seed;
if (C[k] && Date.now() - C[k].at < 120000)
return C[k].p;
var p = erdDestPick(offer, from);
C[k] = { p: p, at: Date.now() };
if (p) {
var me = camera.position;
p.d = Math.hypot(p.x - me.x, p.z - me.z);
}
return p;
}
function erdDestPick(offer, from) { return __ZC(348, 2, this, arguments, new.target); }
function erdThing(world, offer) { var F = erdFolk(world)[1]; return F[erdHash(offer.seed + "t") % F.length]; }
function erdOfferWords(world, giver, o, dest) {
if (o.kind === "fetch")
return "Bring " + o.need_n + " × " + String(o.need_name || o.need_kind).toLowerCase();
if (!dest)
return null;
if (o.kind === "carry")
return "Carry " + erdThing(world, o) + " to " + dest.name;
return "Take word to " + dest.name + " and bring the answer back";
}
function erdLoad(force) {
if (!erdSigned() || ERD.busy)
return Promise.resolve(ERD.board);
if (!force && ERD.board && Date.now() - ERD.boardAt < 20000)
return Promise.resolve(ERD.board);
ERD.busy = true;
return erdRpc("errand_board", { p_world: erdWorld() }).then(function (o) {
ERD.busy = false;
if (o && o.ok) {
ERD.board = o;
ERD.boardAt = Date.now();
ERD.missing = false;
erdTidyLocal();
}
return ERD.board;
}, function (e) { ERD.busy = false; if (erdMissing(e))
ERD.missing = true; return ERD.board; });
}
function erdTidyLocal() { return __ZC(348, 3, this, arguments, new.target); }
function erdRuns() { return (ERD.board && ERD.board.runs) || []; }
function erdOffers(giver) { return __ZC(348, 4, this, arguments, new.target); }
function erdTake(giver, slot, place) { return __ZC(348, 5, this, arguments, new.target); }
function erdFinish(id) { return __ZC(348, 6, this, arguments, new.target); }
function erdDrop(id) {
erdRpc("errand_drop", { p_run: id }).then(function (r) { ERD.msg = (r && r.say) || ""; var L = erdLocal(); delete L[id]; erdLocalSave(); return erdLoad(true); })
.catch(function () { }).then(function () { erdPaint(); });
}
function erdTarget(r) {
var L = erdLocal()[r.id] || {};
if (r.kind === "fetch")
return null;
if (L.leg === 2)
return L.gx != null ? { label: r.giver, x: L.gx, z: L.gz, back: true } : null;
var p = erdPlaceNamed(r.dest);
if (p)
return { label: r.dest, x: p.x, z: p.z };
return L.x != null ? { label: r.dest, x: L.x, z: L.z } : null;
}
function erdGuide(force) {
if (typeof guideTo === "undefined")
return;
var r = erdRuns().filter(function (x) { return x.id === ERD.guide; })[0];
if (!r || r.world !== erdWorld() || store.inside)
return;
var T = erdTarget(r);
if (!T)
return;
if (force || !guideTo || guideTo.erd)
guideTo = { key: T.label, x: T.x, z: T.z, erd: 1 };
}
function erdInsideIs(name) {
try {
if (!store.inside || typeof INT === "undefined" || !INT || !INT.spec)
return false;
var n = INT.wpKey || INT.spec.workplace || INT.spec.label || (typeof placeName === "function" ? placeName(INT.spec) : "");
return !!n && String(n).toLowerCase() === String(name || "").toLowerCase();
}
catch (e) {
return false;
}
}
function erdNearRun() { return __ZC(348, 7, this, arguments, new.target); }
function erdHandOver() { return __ZC(348, 8, this, arguments, new.target); }
function erdPromptOff() {
if (!ERD.prompted)
return;
ERD.prompted = false;
ERD.near = null;
if (typeof worldPrompt === "function" && typeof WLD !== "undefined" && WLD.promptFn === erdHandOver)
worldPrompt(null);
}
function erdTick() {
if (!erdSigned() || !erdRuns().length) {
erdPromptOff();
return;
}
if (typeof walkMode !== "undefined" && !walkMode) {
erdPromptOff();
return;
}
erdGuide(false);
var near = erdNearRun();
if (near) {
var mine = typeof WLD !== "undefined" && WLD.promptFn === erdHandOver;
if (typeof WLD !== "undefined" && WLD.promptFn && !mine) {
ERD.prompted = false;
return;
}
ERD.near = near;
var r = near.r, html = r.kind === "carry" ? "📦 <b>Hand over " + erdEsc(String(r.title).replace(/^Carry\s+/, "").replace(/\s+to\s+.*$/, "")) + "</b> for " + erdEsc(r.giver) + " · <b>press E</b> (or tap here)" :
near.leg === 2 ? "📜 <b>Give " + erdEsc(r.giver) + " the answer</b> · <b>press E</b> (or tap here)" : "📜 <b>Give them " + erdEsc(r.giver) + "'s word</b> · <b>press E</b> (or tap here)";
if (typeof worldPrompt === "function" && (!ERD.prompted || !WLD.prompt || WLD.prompt.dataset.h !== html))
worldPrompt(html, erdHandOver);
ERD.prompted = true;
}
else
erdPromptOff();
}
setInterval(function () { try {
erdTick();
}
catch (e) { } }, 400);
addEventListener("keydown", function (e) {
if ((e.code !== "KeyE" && e.code !== "Enter") || !ERD.prompted || !ERD.near || typeof WLD === "undefined" || WLD.promptFn !== erdHandOver)
return;
if (/INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || ""))
return;
e.preventDefault();
e.stopImmediatePropagation();
erdHandOver();
}, true);
var ERD_BOX = "position:fixed;z-index:53;left:50%;top:50%;transform:translate(-50%,-50%);width:min(500px,calc(100vw - 32px));max-height:min(80vh,680px);overflow-y:auto;" +
"background:linear-gradient(180deg,rgba(18,15,24,.97),rgba(9,8,12,.98));border:1px solid #8A7A4A;border-radius:8px;padding:12px 14px 14px;color:var(--bone,#C9BEA8);" +
"font:13px var(--sans,system-ui);box-shadow:0 14px 50px rgba(0,0,0,.6);-webkit-overflow-scrolling:touch";
var ERD_ROW = "margin:7px 0;padding:8px 10px;border:1px solid rgba(201,190,168,.22);border-radius:6px;background:rgba(255,255,255,.03)";
var ERD_IN = "width:100%;box-sizing:border-box;padding:6px 8px;border-radius:5px;border:1px solid rgba(201,190,168,.4);background:#0C0B14;color:#E6E0D2;font:14px var(--sans,system-ui)";
function erdOpen(tab, giver) { return __ZC(348, 9, this, arguments, new.target); }
function erdClose() { ERD.open = false; ERD.card = null; var el = document.getElementById("erd-box"); if (el)
el.style.display = "none"; }
function erdBtn(attr, label, primary) { return '<button class="btn' + (primary ? ' primary' : '') + '" ' + attr + ' style="padding:3px 10px;margin:4px 6px 0 0">' + label + '</button>'; }
function erdGoldLine(g) { return __ZC(348, 10, this, arguments, new.target); }
function erdOfferHtml(world, giver, place) { return __ZC(348, 11, this, arguments, new.target); }
function erdRunHtml(r) { return __ZC(348, 12, this, arguments, new.target); }
function erdPostHtml(p, as) { return __ZC(348, 13, this, arguments, new.target); }
function erdPostForm() { return __ZC(348, 14, this, arguments, new.target); }
function erdPaint() { return __ZC(348, 15, this, arguments, new.target); }
function erdAfter(p) {
return p.then(function (r) { ERD.msg = (r && r.say) || ""; try {
if (typeof bkpLoad === "function")
bkpLoad();
}
catch (e) { } return erdLoad(true); }, function (e) { ERD.msg = erdMissing(e) ? "Errands aren't open yet." : "That didn't go through. Try again."; }).then(function () { erdPaint(); });
}
function erdNoteAsk(kind, id) {
ERD.noteFor = { kind: kind, id: id };
var n = document.getElementById("erd-note");
if (!n)
return;
n.style.display = "block";
var i = document.getElementById("erd-note-i");
i.value = "";
i.placeholder = kind === "no" ? "What is still to do? (optional)" : "A word about it (optional)";
i.focus();
}
function erdClick(e) { return __ZC(348, 16, this, arguments, new.target); }
(function () {
var def = { tag: "ERRAND", label: "📜 Any errands?",
hint: "shows the dreamer your errands for today (carrying something somewhere, taking word, or bringing you things found here), and lets them hand over what they bring you; use it when they ask for work, an errand, a favour or a job to do for you, or bring you something you asked for",
when: function (ctx) { return erdSigned() && !ERD.missing && erdWorld() !== "dream" && !!(ctx && ctx.name); },
run: function (ctx) {
var g = { name: ctx.name, place: ctx.place || "" };
setTimeout(function () { try {
if (typeof talkOpen !== "undefined" && talkOpen && typeof closeTalk === "function")
closeTalk();
}
catch (e) { } erdOpen("here", g); }, 1200);
return { ok: true };
} };
if (typeof staffDeedAdd === "function")
staffDeedAdd(def);
else {
window.SD_PENDING = window.SD_PENDING || [];
window.SD_PENDING.push(def);
}
})();
(function hook() {
var bar = document.getElementById("me-bar");
if (!bar)
return setTimeout(hook, 900);
if (document.getElementById("me-errands"))
return;
var b = document.createElement("button");
b.className = "btn";
b.id = "me-errands";
b.title = "Errands: from the folk of every world, other dreamers and businesses";
b.textContent = "📜 Errands";
b.onclick = function () { erdOpen(ERD.tab === "post" ? "here" : ERD.tab); };
var pk = document.getElementById("me-who");
if (pk && pk.parentNode === bar && pk.nextSibling)
bar.insertBefore(b, pk.nextSibling);
else
bar.appendChild(b);
})();
try {
if (typeof PS_SECTIONS !== "undefined") {
var erdSec = PS_SECTIONS.filter(function (s) { return s.k === "people"; })[0];
if (erdSec && erdSec.ids.indexOf("me-errands") < 0) {
var ewi = erdSec.ids.indexOf("me-who");
erdSec.ids.splice(ewi >= 0 ? ewi + 1 : erdSec.ids.length, 0, "me-errands");
}
}
}
catch (e) { }
addEventListener("keydown", function (e) { if (e.key === "Escape" && ERD.open)
erdClose(); });
(function () {
if (typeof bkpHtml !== "function")
return;
var bh = bkpHtml;
bkpHtml = function () {
var h = bh.apply(this, arguments), runs = erdRuns();
if (!runs.length)
return h;
try {
h += '<div style="margin-top:12px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#C9A85A">Errand papers</div>' +
'<div>' + runs.map(function (r) { return '<div style="margin:4px 0">' + (r.kind === "fetch" ? "🧺 " : r.kind === "carry" ? "📦 " : "✉️ ") + erdEsc(r.title) + ' <span style="color:var(--dim)">for ' + erdEsc(r.giver) + ', ' + erdEsc(erdWorldName(r.world)) + '</span></div>'; }).join("") +
'<button class="btn" data-erdbk="1" style="margin-top:4px">📜 Errands</button></div>';
}
catch (e) { }
return h;
};
document.addEventListener("click", function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-erdbk]") : null;
if (!t)
return;
e.stopPropagation();
if (typeof bkpClose === "function")
bkpClose();
erdOpen("here");
}, true);
if (typeof bkpLoad === "function") {
var bl = bkpLoad;
bkpLoad = function () { var r = bl.apply(this, arguments); if (!ERD.busy && Date.now() - ERD.boardAt > 20000)
erdLoad(true).then(function () { if (typeof BKP !== "undefined" && BKP.open && typeof bkpPaint === "function")
bkpPaint(); }); return r; };
}
})();
function erdSeen() { if (ERD.seen)
return ERD.seen; try {
ERD.seen = JSON.parse(localStorage.getItem("erd-seen-v1") || "null");
}
catch (e) { } return ERD.seen; }
function erdPing() {
if (!erdSigned() || ERD.missing || document.hidden)
return;
ERD.pingAt = Date.now();
erdRpc("errand_ping", {}).then(function (o) {
if (!o || !o.ok)
return;
var old = erdSeen(), now = { m: {}, r: {}, f: +o.for_me || 0 }, news = [];
(o.mine || []).forEach(function (p) {
var k = p.status + "|" + p.updated;
now.m[p.id] = k;
if (old && old.m && old.m[p.id] !== k) {
if (p.status === "taken")
news.push((p.runner_name || "A dreamer") + " is running your errand “" + p.title + "”.");
if (p.status === "marked")
news.push((p.runner_name || "The runner") + " says “" + p.title + "” is done. Menu → Errands → Yours, to pay them or send it back.");
}
});
(o.running || []).forEach(function (p) {
var k = p.status + "|" + p.updated;
now.r[p.id] = k;
if (old && old.r && old.r[p.id] && old.r[p.id] !== k) {
if (p.status === "paid")
news.push("“" + p.title + "” for " + p.by + ": paid.");
if (p.status === "taken")
news.push(p.by + " sent “" + p.title + "” back: " + (p.poster_note || "not done yet") + ".");
if (p.status === "cancelled")
news.push(p.by + " took “" + p.title + "” down.");
}
});
if (old && now.f > (+old.f || 0))
news.push("An errand has been sent to you. Menu → Errands.");
ERD.seen = now;
try {
localStorage.setItem("erd-seen-v1", JSON.stringify(now));
}
catch (e) { }
if (news.length) {
erdSay("📜 " + erdEsc(news.slice(0, 2).join(" ")), true);
ERD.boardAt = 0;
try {
if (typeof bkpLoad === "function" && news.some(function (n) { return /paid/.test(n); }))
bkpLoad();
}
catch (e) { }
if (ERD.open)
erdOpen(ERD.tab);
}
}, function (e) { if (erdMissing(e))
ERD.missing = true; });
}
setTimeout(function () { erdLoad(true); erdPing(); }, 9000);
setInterval(function () { try {
erdPing();
if (erdSigned() && !document.hidden && erdRuns().length && Date.now() - ERD.boardAt > 240000)
erdLoad(true);
}
catch (e) { } }, 180000);
function erdTest() { return { ERD: ERD, erdWorld: erdWorld, erdDestFor: erdDestFor, erdOfferWords: erdOfferWords, erdNearRun: erdNearRun, erdTick: erdTick, erdLocal: erdLocal, erdPaint: erdPaint, erdOpen: erdOpen, erdHandOver: erdHandOver }; }
