/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(193, function () {
return [
function (title, url, foot, opt) {
var m = /archive\.org\/(embed|details)\/(pd-[a-z0-9-]+)/.exec(String(url || "")), args = arguments, me = this;
if (!m || !CIN_MORE[m[2]])
return hallViewerCinBase.apply(me, args);
cinFind(m[2], function (found) {
if (!found) {
if (typeof setStatus === "function")
setStatus("That film can't be found on the Internet Archive just now.");
return;
}
var re = new RegExp(m[2], "g");
hallViewerCinBase.call(me, title, String(url).replace(re, encodeURIComponent(found)), String(foot || "").replace(re, encodeURIComponent(found)), opt && opt.link ? Object.assign({}, opt, { link: String(opt.link).replace(re, encodeURIComponent(found)) }) : opt);
});
}
];
});
