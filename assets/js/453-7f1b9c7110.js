/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
var PACT = { q: [], last: "", seen: "", seenN: 0, inDone: false, off: false, busy: false };
var PACT_QUIET = /^(is_|my_|list_|get_|find_|friends_|history_|admin_|sm_)|^(note_activity|upsert_presence|upsert_presence_at|clear_presence|list_presence|publish_look|live_poll|live_send|game_state|leaderboards|ranks_of|phone_book|catalogue_board|zone_rules|gold_rates|city_clock|city_weather|city_chat_since|guild_chat_since|world_chat_since|world_chat_struck|city_edits_since|building_looks_since|lots_changed|doors_standing|hall_of_doors|tower_find_dreamer|voice_who|crowd_meet|lock_status|next_paydays|away_plans|mailbox_at|keeper_find_user|keeper_invitations|ach_mark|folk_memory_note|standin_note|widow_user_mind_add|own_key_mark|temple_altar_log|city_incident_located|ai_court_tick|folk_personas|folk_memory_all|town_lives|dark_homes|address_roll|art_gallery|insurance_quotes|wholesale_catalogue|shop_customers|business_fronts_public|expansion_tenants|lot_lights|work_mailbox|standin_card|carrier_tickets)$|_(my|me|inbox|card|quotes|choices|halls|rumours|runs|seen|public|all|gallery|live|watch|docket|case|roll|record|posts|tick|standing|secrets|nearby|board|state|since|list|mine|now|today|top|lobby|roster|queue|status|check|who|get|beat|poll|books|feed|here|ok|rules)$|_my_/;
var PACT_DO = { bill_pay_all: 1, delete_my_account: 1, set_my_birthdate: 1, school_enrol_me: 1 };
var PACT_WORDS = { clock_in: "Clocked in at work", clock_out: "Clocked out of work", do_task: "Did a work task", start_task: "Started a work task",
draw_pay: "Drew pay", apply_for: "Applied for a job", leave_job: "Left a job", hire: "Hired someone", fire: "Let someone go",
buy_item: "Bought an item", buy_food: "Bought food", buy_goods: "Bought goods", buy_lot: "Bought ground", buy_stock: "Bought stock", sell_stock: "Sold stock",
mall_buy: "Bought in the World Mall", dream_buy: "Bought in a dream shop", pay_dreamer: "Paid another dreamer", pay_rent: "Paid rent", pay_fine: "Paid a fine",
bank_deposit: "Put gold in the bank", bank_withdraw: "Took gold from the bank", bank_borrow: "Borrowed from the bank", bank_repay: "Paid back the bank",
gold_buy_request: "Asked to buy gold", gold_sell_request: "Asked to sell gold", offer_trade: "Offered a trade", accept_trade: "Accepted a trade",
say_in_city: "Spoke in city chat", world_say: "Spoke in a world's chat", guild_say: "Spoke in guild chat", mail_send: "Sent a letter",
take_lease: "Took a lease", open_business: "Opened a business", raise_building: "Raised a building", dress_lot: "Dressed their ground",
dream_world_enter: "Walked into a dream world", walk_in: "Walked into a published dream", take_door: "Took a door in the Hall", publish_scape: "Published a dream",
cab_ride: "Took a cab", ride_underground: "Rode the Underground", buy_ug_ticket: "Bought an Underground ticket", pass_ride: "Got a lift", pass_drive: "Gave a lift",
race_join: "Joined a race", race_finish: "Finished a race", race_submit: "Raced", light_candle: "Lit a candle at the temple", attend_service: "Went to a service",
school_begin: "Began a school lesson", school_pass: "Passed a school lesson", academy_learn: "Learnt at an academy", library_visit: "Visited the library",
casino_buy_chips: "Bought casino chips", casino_cash_out: "Cashed out casino chips", casino_slots: "Played the slots", casino_roulette: "Played roulette",
casino_bj_deal: "Played blackjack", casino_craps: "Played craps", casino_baccarat: "Played baccarat", casino_wheel: "Spun the wheel",
hunt_claim: "Found something on the hunt", artifact_claim: "Found a hidden artifact", mythic_claim: "Claimed a mythic machine", elemental_find: "Found an elemental relic",
green_harvest: "Harvested in Greenwold", craft_make: "Made something", relic_forge: "Forged a relic", gap_fish: "Went fishing",
court_say: "Spoke in court", file_charge: "Filed a charge", report_offence: "Reported an offence", chat_report: "Reported a chat line", voice_report: "Reported someone's voice",
set_public_name: "Changed their name", bill_pay_all: "Paid all their bills", delete_my_account: "Deleted their account", set_my_birthdate: "Set their birthday", school_enrol_me: "Enrolled at the City School", set_public_look: "Changed their look", submit_research: "Shared research", request_account_deletion: "Asked to delete their account" };
function pactWords(name) {
if (PACT_WORDS[name])
return PACT_WORDS[name];
var s = String(name).replace(/_/g, " ").replace(/\s+/g, " ").trim();
return s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
}
function pactDevice() {
var ua = navigator.userAgent || "";
if (/OculusBrowser|Quest|Pico|Wolvic/.test(ua))
return "Quest";
if (/SomnuMatrix|wv\)/.test(ua) && /Android/.test(ua))
return "Android app";
if (/Android/.test(ua))
return /Mobile/.test(ua) ? "Android phone" : "Android tablet";
if (/iPhone|iPod/.test(ua))
return "iPhone";
if (/iPad/.test(ua) || (navigator.maxTouchPoints > 1 && /Macintosh/.test(ua)))
return "iPad";
if (/Electron|SomnuMatrixDesktop/.test(ua))
return "PC app";
return /Windows/.test(ua) ? "Windows PC" : /Mac/.test(ua) ? "Mac" : /CrOS/.test(ua) ? "Chromebook" : /Linux/.test(ua) ? "Linux PC" : "Computer";
}
function pactWhere() {
try {
var here = (typeof store !== "undefined" && store) ? store.here : null;
var inside = (typeof bugInsideName === "function") ? bugInsideName() : "";
inside = String(inside || "").replace(/\s*\([^)]*\)\s*$/, "");
if (typeof bugInCity === "function" && bugInCity(here))
return inside ? inside + ", Somnucor" : "Somnucor streets";
if (typeof inHallRealm === "function" && inHallRealm())
return "Hall of Doors";
var r = (typeof bugRealmName === "function") ? bugRealmName(here) : "";
if (r)
return inside ? inside + ", " + r : r;
return inside || "";
}
catch (e) {
return "";
}
}
function pactOn() { try {
return !PACT.off && typeof signedIn === "function" && signedIn();
}
catch (e) {
return false;
} }
function pactAdd(k, w, extra) {
if (!pactOn() || !w)
return;
var it = { k: k, w: String(w).slice(0, 80), p: PACT.last ? String(PACT.last).slice(0, 80) : "", t: Date.now() };
if (extra)
for (var x in extra)
it[x] = extra[x];
var prev = PACT.q[PACT.q.length - 1];
if (prev && prev.k === k && prev.w === it.w && k === "did" && it.t - prev.t < 2000)
return;
PACT.q.push(it);
if (PACT.q.length > 60)
PACT.q.splice(0, PACT.q.length - 60);
}
function pactSend(leaving) {
if (PACT.off || PACT.busy || !PACT.q.length || !pactOn())
return;
var now = Date.now(), items = PACT.q.splice(0, 40).map(function (it) {
var o = { k: it.k, w: it.w, p: it.p, a: Math.max(0, Math.round((now - it.t) / 1000)) };
if (it.d)
o.d = it.d;
return o;
});
var url = DW_CONFIG.supabaseUrl.replace(/\/+$/, "") + "/rest/v1/rpc/note_activity";
var go = function (tok) {
if (!tok)
return Promise.resolve();
return fetch(url, { method: "POST", keepalive: !!leaving, headers: { apikey: DW_CONFIG.supabaseKey, Authorization: "Bearer " + tok, "Content-Type": "application/json" },
body: JSON.stringify({ p_items: items }), __pact: true }).then(function (r) {
if (r && r.status === 404)
PACT.off = true;
});
};
PACT.busy = true;
var t = leaving && typeof session !== "undefined" && session ? Promise.resolve(session.access_token) : (typeof freshToken === "function" ? freshToken() : Promise.resolve(null));
t.then(go).catch(function () { }).then(function () { PACT.busy = false; });
}
(function () {
if (!window.fetch || window.fetch.__pact)
return;
var f0 = window.fetch;
var f1 = function (u, o) {
var p = f0.apply(this, arguments);
try {
if (o && o.__pact)
return p;
var s = typeof u === "string" ? u : (u && u.url) || "", m = (o && o.method) || (u && u.method) || "GET";
var i = s.indexOf("/rest/v1/rpc/");
if (i >= 0 && String(m).toUpperCase() === "POST") {
var name = s.slice(i + 13).split(/[?#]/)[0];
if (name && (PACT_DO[name] || !PACT_QUIET.test(name)))
p.then(function (r) { if (r && r.ok)
pactAdd("did", pactWords(name)); }, function () { });
}
}
catch (e) { }
return p;
};
f1.__pact = true;
if (f0.__cwsOut)
f1.__cwsOut = true;
window.fetch = f1;
})();
setInterval(function () {
if (PACT.off)
return;
if (!pactOn()) {
PACT.inDone = false;
return;
}
if (!PACT.inDone) {
PACT.inDone = true;
PACT.last = pactWhere();
pactAdd("in", "Came into the game", { d: pactDevice() });
}
var w = pactWhere();
if (w === PACT.seen)
PACT.seenN++;
else {
PACT.seen = w;
PACT.seenN = 0;
}
if (w && PACT.seenN === 1 && w !== PACT.last) {
PACT.last = w;
pactAdd("went", w);
}
}, 10000);
setInterval(function () { if (document.visibilityState !== "hidden")
pactSend(false); }, 60000);
setTimeout(function () { pactSend(false); }, 25000);
var PACT_AWAY = 5 * 60000;
document.addEventListener("visibilitychange", function () {
if (document.visibilityState === "hidden") {
PACT.hidAt = Date.now();
PACT.awayNoted = false;
pactSend(true);
return;
}
var was = PACT.hidAt;
PACT.hidAt = 0;
if (was && Date.now() - was >= PACT_AWAY && pactOn() && PACT.inDone) {
if (!PACT.awayNoted) {
pactAdd("out", "Put the game away");
var o = PACT.q[PACT.q.length - 1];
if (o)
o.t = was;
}
pactAdd("in", "Came back to the game", { d: pactDevice() });
}
});
setInterval(function () {
if (PACT.hidAt && !PACT.awayNoted && Date.now() - PACT.hidAt >= PACT_AWAY && pactOn() && PACT.inDone) {
PACT.awayNoted = true;
pactAdd("out", "Put the game away");
var o = PACT.q[PACT.q.length - 1];
if (o)
o.t = PACT.hidAt;
pactSend(true);
}
}, 60000);
window.addEventListener("pagehide", function () { if (pactOn() && PACT.inDone && !PACT.awayNoted) {
PACT.awayNoted = true;
pactAdd("out", "Left the game");
} pactSend(true); });
