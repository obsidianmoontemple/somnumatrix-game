/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(422, function () {
"use strict";
return [
function (m, g, ws) {
var p = g.parameters || {}, sx = Math.abs(ws.x), sy = Math.abs(ws.y), sz = Math.abs(ws.z), sr = Math.max(sx, sz);
switch (g.type) {
case "BoxGeometry": return { kind: "box", s: [(p.width || 1) * sx, (p.height || 1) * sy, (p.depth || 1) * sz] };
case "CylinderGeometry": return { kind: "cyl", s: [(p.radiusTop || 0) * sr, (p.radiusBottom || 0) * sr, (p.height || 1) * sy] };
case "ConeGeometry": return { kind: "cone", s: [(p.radius || 1) * sr, (p.height || 1) * sy] };
case "SphereGeometry":
case "IcosahedronGeometry":
case "DodecahedronGeometry":
case "OctahedronGeometry": return { kind: "sph", s: [(p.radius || 1) * Math.max(sx, sy, sz)] };
case "PlaneGeometry": return { kind: "pln", s: [(p.width || 1) * sx, (p.height || 1) * sy] };
case "CircleGeometry":
case "RingGeometry":
var r = (p.radius || p.outerRadius || 1);
return { kind: "pln", s: [2 * r * sx, 2 * r * sy] };
case "TorusGeometry": return { kind: "pln", s: [2 * Math.PI * (p.radius || 1) * sr, 2 * Math.PI * (p.tube || 0.4) * sr] };
}
if (!g.boundingBox)
g.computeBoundingBox();
var b = g.boundingBox;
if (!b)
return null;
var d = [(b.max.x - b.min.x) * sx, (b.max.y - b.min.y) * sy, (b.max.z - b.min.z) * sz].sort(function (a, c) { return c - a; });
return { kind: "pln", s: [d[0], d[1]] };
}
];
});
