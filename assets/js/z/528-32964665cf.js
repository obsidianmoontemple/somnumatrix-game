/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(528, function () {
"use strict";
return [
function (html) {
var now = performance.now(), want = (html && !tfxPromptHidden(html)) ? String(html) : "";
TFXP.target = want;
if (!want) {
if (!TFXP.h)
return;
if (!TFXP.nullSince)
TFXP.nullSince = now;
if (now - TFXP.nullSince < 330) {
tfxPromptPaint();
return;
}
TFXP.h = "";
TFXP.at = now;
TFXP.nullSince = 0;
tfxPromptPaint();
return;
}
TFXP.nullSince = 0;
if (!TFXP.h || want === TFXP.h) {
if (!TFXP.h)
TFXP.at = now;
TFXP.h = want;
tfxPromptPaint();
return;
}
if (now - TFXP.at < 450) {
tfxPromptPaint();
return;
}
TFXP.h = want;
TFXP.at = now;
tfxPromptPaint();
}
];
});
