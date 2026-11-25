/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(69, function () {
"use strict";
return [
function (low) {
for (var i = 0; i < REALM_NEAR.length; i++) {
if (REALM_NEAR[i][1].test(low)) {
var name = (REALMS[REALM_NEAR[i][0]] || {}).name || "another world";
return "You spoke of " + name + " but not of going there. Say how you got in \u2014 <i>\u201cI went down into it\u201d, \u201cI stepped through\u201d, \u201cI found myself there\u201d</i> \u2014 or use <b>Cross into\u2026</b> in The land.";
}
}
return null;
}
];
});
