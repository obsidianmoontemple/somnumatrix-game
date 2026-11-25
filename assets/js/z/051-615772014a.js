/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(51, function () {
"use strict";
return [
function (id, b) {
if (meshes[id]) {
scene.remove(meshes[id]);
delete meshes[id];
}
for (var i = store.objects.length - 1; i >= 0; i--)
if (store.objects[i].id === id) {
store.objects.splice(i, 1);
break;
}
for (var j = store.characters.length - 1; j >= 0; j--)
if (store.characters[j].objId === id) {
store.characters.splice(j, 1);
break;
}
if (b) {
var k = b.ids.indexOf(id);
if (k > -1)
b.ids.splice(k, 1);
}
}
];
});
