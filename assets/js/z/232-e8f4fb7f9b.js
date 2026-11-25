/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(232, function () {
"use strict";
return [
function (since, open) {
var p = new Date(since || Date.now() - 86400000).toISOString();
var done = function (o) { ARP.rep = o; ARP.show = true; if (open)
WORK.open = true; if (typeof workPaint === "function")
workPaint(); };
return cityRpc("my_away_report", { p_since: p }).then(function (o) { done(o && o.ok ? o : { ok: false, since: p }); })
.catch(function () { done({ ok: false, since: p }); });
},
function () {
var R = ARP.rep, h = '<div class="job" id="arp"><div style="display:flex;justify-content:space-between;align-items:center"><b>Away report</b><button class="btn" id="arp-x">Hide</button></div>';
if (!R || !R.ok)
return h + '<div style="color:var(--dim);margin-top:4px;line-height:1.5">The city clerk cannot write the report just now. Your setting below still holds: with it on, your someone goes to work in your hours while you are away and earns two fifths of your rate, paid with your wages.</div></div>';
h += '<div style="color:var(--dim);margin:4px 0;line-height:1.5">While you were away (' + arpWhen(R.since) + '):</div>';
(R.jobs || []).forEach(function (j) {
var hrs = +j.hours || 0;
h += '<div style="margin:5px 0;line-height:1.5"><b>' + esc(j.title) + '</b> · ';
if (!hrs)
h += 'none of your hours fell while you were away.';
else if (j.offline)
h += 'your someone worked <b>' + arpHours(hrs) + '</b> of your shift' + (j.roams ? ' on the streets' : ' at ' + esc(j.workplace || "your post")) +
' and earned about <b>' + (typeof gold === "function" ? gold(j.gold || 0) : (j.gold || 0) + " gold") + '</b>, paid with your wages.';
else
h += '<b>' + arpHours(hrs) + '</b> of your shift went by and your someone stayed home, because <i>Work my shifts while I am away</i> is off.';
h += '</div>';
});
if (!(R.jobs || []).length)
h += '<div style="margin:5px 0">You hold no job yet, so your someone kept to home.</div>';
if (R.doing && R.doing.doing && typeof AWL_WORDS !== "undefined")
h += '<div style="color:var(--dim);margin-top:4px">When you came back they were ' + esc(AWL_WORDS[R.doing.doing] || "away") + '.</div>';
return h + '</div>';
}
];
});
