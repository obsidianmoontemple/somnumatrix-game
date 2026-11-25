/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(36, function () {
"use strict";
return [
function (spec) {
if (!ARMS[spec.archetype])
return false;
dropCarried(true);
carrying = spec;
spec.carried = true;
var g = meshes[spec.id];
if (g)
g.visible = false;
setStatus("<b>You are carrying the " + esc(carriedName()) + ".</b> " + (ARMS[spec.archetype].shot ? "Use it with <b>F</b>, or the <b>use</b> button." : "Drop it with <b>G</b>."));
showCarried();
return true;
},
function (quiet) {
if (!carrying)
return;
var spec = carrying, g = meshes[spec.id];
spec.carried = false;
if (g) {
g.visible = true;
g.position.x = camera.position.x;
g.position.z = camera.position.z;
spec.x = g.position.x;
spec.z = g.position.z;
}
carrying = null;
if (carryMesh && carryMesh.parent)
carryMesh.parent.remove(carryMesh);
carryMesh = null;
if (!quiet)
setStatus("You set it down.");
save();
},
function () {
if (!carrying || shotCool > 0)
return;
var A = ARMS[carrying.archetype];
if (!A || !A.shot) {
setStatus("You swing the " + esc(carriedName()) + ".");
shotCool = 0.5;
return;
}
var S = SHOT[A.shot];
shotCool = 0.55;
var dir = { x: -Math.sin(yaw) * Math.cos(pitch), y: Math.sin(pitch), z: -Math.cos(yaw) * Math.cos(pitch) };
var g = new THREE.Group();
var body = new THREE.Mesh(new THREE.CylinderGeometry(S.len * 0.09, S.len * 0.05, S.len, 6), new THREE.MeshBasicMaterial({ color: S.col }));
body.rotation.x = Math.PI / 2;
g.add(body);
if (S.trail) {
var tr = new THREE.Mesh(new THREE.SphereGeometry(S.len * 0.3, 8, 6), new THREE.MeshBasicMaterial({ color: S.trail, transparent: true, opacity: .75 }));
g.add(tr);
}
g.position.set(camera.position.x + dir.x, camera.position.y - 0.2 + dir.y, camera.position.z + dir.z);
scene.add(g);
shots.push({ g: g, dir: dir, speed: S.speed, life: 4, lands: S.lands });
if (A.shot === "sound")
setStatus("The horn sounds, and carries further than it should.");
},
function (kind, x, y, z) {
var spec = { id: uid(), archetype: kind, label: null, attrs: {}, x: x, z: z, rot: Math.random() * 6.283, solid: false, detail: 3,
nights: [store.session], working: true };
if (store.here)
spec.realm = store.here;
store.objects.push(spec);
addMesh(spec);
setTimeout(function () {
var k = store.objects.indexOf(spec);
if (k > -1) {
store.objects.splice(k, 1);
if (meshes[spec.id]) {
scene.remove(meshes[spec.id]);
delete meshes[spec.id];
}
}
}, 9000);
},
function () {
if (carrying)
return dropCarried(false);
var P = camera.position, best = null, bd = 9;
store.objects.forEach(function (o) {
if (!ARMS[o.archetype] || o.carried)
return;
if ((o.realm || 0) !== (store.here || 0))
return;
var d = (o.x - P.x) * (o.x - P.x) + (o.z - P.z) * (o.z - P.z);
if (d < bd) {
bd = d;
best = o;
}
});
if (best)
pickUp(best);
else
setStatus("Nothing within reach to pick up.");
}
];
});
