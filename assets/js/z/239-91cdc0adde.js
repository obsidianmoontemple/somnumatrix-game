/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(239, function () {
return [
function () {
var out = [];
try {
if (typeof standing !== "undefined" && standing) {
if (standing.name)
out.push(standing.name);
if (standing.display_name)
out.push(standing.display_name);
}
if (typeof meLook === "function") {
var L = meLook();
if (L && L.name)
out.push(L.name);
}
}
catch (e) { }
return out.map(function (n) { return String(n).trim().toLowerCase(); }).filter(function (n) { return n.length >= 3 && n !== "a dreamer"; });
},
function () {
var d = document.createElement("div");
d.className = "kimm-order";
d.style.cssText = "margin:6px 0 8px;padding:6px 9px;border:1px solid #C9A868;border-radius:3px;background:rgba(201,168,104,.10);" +
"color:var(--bone,#E8E0D0);font-size:12px;line-height:1.5;text-align:left";
var b = document.createElement("b");
b.style.color = "#E8C27A";
b.textContent = "Standing order from the Keeper: ";
d.appendChild(b);
d.appendChild(document.createTextNode("the Keeper is not to be ticketed, charged or fined. " + KIMM.more));
return d;
},
function () {
var r = (typeof justiceRoles === "function") ? justiceRoles() : {};
if (r.desk || r.keeper || kimmOn())
return true;
var jobs = ((typeof WORK !== "undefined" && WORK.data && WORK.data.jobs) || []);
return jobs.some(function (j) { return /post|courier|carrier|runner|messenger|letter|gaol|warden|bailiff/i.test(String(j.title || "")); });
}
];
});
