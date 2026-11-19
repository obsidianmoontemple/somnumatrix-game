/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(30, function () {
"use strict";
return [
function (g) {
var base = g.children.map(function (m, i) { m.position.set(Math.cos(i * 2.4) * 3, 3 + i * .8, Math.sin(i * 2.4) * 3); return m.position.y; });
for (var i = 0; i < 6; i++) {
var c = g.children[0].clone();
c.position.set(Math.cos(i * 1.1) * (2 + i * .6), 2.5 + i * .7, Math.sin(i * 1.1) * (2 + i * .6));
g.add(c);
base.push(c.position.y);
}
return function (t) { g.children.forEach(function (m, i) { if (base[i] !== undefined)
m.position.y = base[i] + Math.sin(t * .7 + i) * .4; }); };
}
];
});
