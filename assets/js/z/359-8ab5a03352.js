/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
__ZD(359, function () {
"use strict";
return [
function (n) {
if (BST_TEX.spines[n])
return BST_TEX.spines[n];
var cols = ["#6E2424", "#23395A", "#2F5238", "#7A6226", "#4A2A55", "#8A5A30", "#1F2F3F", "#9A3A2A", "#2E5A5A", "#D8CCB0", "#3A3A3A", "#5A6A2A", "#B07A2A", "#2A2A4A"];
var t = bstCanvas(512, 128, function (x, w, h) {
x.fillStyle = "#2A1C12";
x.fillRect(0, 0, w, h);
var px = 0, k = n * 17 + 3;
while (px < w) {
k = (k * 1103515245 + 12345) & 0x7fffffff;
var bw = 12 + (k % 22), bh = h - 6 - ((k >> 5) % 34), col = cols[(k >> 9) % cols.length];
x.fillStyle = col;
x.fillRect(px, h - bh, bw - 1, bh);
x.fillStyle = "rgba(255,255,255,.08)";
x.fillRect(px + 1, h - bh, 2, bh);
x.fillStyle = "rgba(0,0,0,.22)";
x.fillRect(px + bw - 3, h - bh, 2, bh);
if ((k >> 13) % 3) {
x.fillStyle = "#C9A050";
x.fillRect(px + 2, h - bh + 8, bw - 5, 2);
x.fillRect(px + 2, h - 14, bw - 5, 2);
x.fillStyle = "rgba(232,214,160,.85)";
for (var i = 0; i < 3; i++)
x.fillRect(px + bw / 2 - 1, h - bh + 18 + i * 9, 2, 5);
}
px += bw;
}
});
return (BST_TEX.spines[n] = t);
},
function (text, bg, fg) {
var key = text + "|" + bg;
if (BST_TEX.signs[key])
return BST_TEX.signs[key];
return (BST_TEX.signs[key] = bstCanvas(512, 72, function (x, w, h) {
x.fillStyle = bg || "#1E3B30";
x.fillRect(0, 0, w, h);
x.strokeStyle = "#C9A050";
x.lineWidth = 4;
x.strokeRect(4, 4, w - 8, h - 8);
var fs = 40;
x.font = "bold " + fs + "px Georgia,serif";
while (x.measureText(text).width > w - 36 && fs > 16) {
fs -= 2;
x.font = "bold " + fs + "px Georgia,serif";
}
x.fillStyle = fg || "#F2E6C4";
x.textAlign = "center";
x.textBaseline = "middle";
x.fillText(text, w / 2, h / 2 + 2);
}));
},
function (K) {
var W = K.W, D = K.D, put = K.put;
put("bstfeature", -W / 4 - 0.6, K.B + 0.25, 0);
put("bstfeature", W / 4 + 0.6, K.B + 0.25, 0);
for (var z = K.B + 2.0; z < K.Fz - 9.5; z += 2.1) {
put("bstcase_all", K.L + 0.3, z, Math.PI / 2);
put("bstcase_all", K.R - 0.3, z, -Math.PI / 2);
}
put("bstladder", K.L + 0.85, K.B + 5.2, Math.PI / 2);
put("bstladder", K.R - 0.85, K.B + 7.3, -Math.PI / 2);
put("rug", 0, K.B + 7, 0);
put("rug", 0, K.B + 10.5, 0);
[[-3.4, K.B + 5.4], [3.4, K.B + 5.4], [-3.4, K.B + 9.6], [3.4, K.B + 9.6], [0, K.B + 12.6]].forEach(function (p) { put("bsttable_all", p[0], p[1], 0); });
put("bstcounter", K.R - 2.4, K.Fz - 6.2, -Math.PI / 2);
K.staff("Bookseller", K.R - 1.3, K.Fz - 6.4, -Math.PI / 2);
put("bsthowto", K.R - 0.15, K.Fz - 3.6, -Math.PI / 2);
K.staff("Bookseller", -2.0, K.B + 7.6, Math.PI / 2);
put("wgcoffeebar", K.L + 0.4, K.Fz - 5.6, Math.PI / 2);
K.staff("Café barista", K.L + 1.3, K.Fz - 5.6, -Math.PI / 2);
[[K.L + 3.4, K.Fz - 7.4], [K.L + 3.4, K.Fz - 4.4], [K.L + 6.2, K.Fz - 5.9]].forEach(function (t) { put("table", t[0], t[1], 0); put("chair", t[0] - 0.9, t[1], Math.PI / 2); put("chair", t[0] + 0.9, t[1], -Math.PI / 2); });
[-1, 1].forEach(function (s) {
var x = s * (W / 4 + 1.2);
put("bstarmchair", x - 0.8, K.Fz - 1.6, Math.PI);
put("bstarmchair", x + 0.8, K.Fz - 1.6, Math.PI);
put("bstside", x, K.Fz - 1.4, 0);
put("bstlamp", x + 1.7, K.Fz - 1.0, 0);
});
put("plant", K.L + 0.8, K.Fz - 1.0, 0);
put("plant", K.R - 0.8, K.Fz - 1.0, 0);
put("plant", -1.6, K.B + 1.0, 0);
put("plant", 1.6, K.B + 1.0, 0);
put("clock", K.R - 0.18, K.Fz - 9.0, -Math.PI / 2);
put("chandelier", -W / 4, K.B + 7, 0);
put("chandelier", W / 4, K.B + 7, 0);
put("chandelier", 0, K.Fz - 5, 0);
K.spot(0, K.B + 7.5, "the tables");
K.spot(K.R - 3.6, K.Fz - 6.2, "the counter");
K.spot(K.L + 4, K.Fz - 5.8, "the café");
K.spot(-W / 4, K.B + 2.2, "the wall of new books");
},
function (e) {
if (bstMissing(e)) {
BST.missing = true;
return typeof notOpenYet === "function" ? notOpenYet("The Book Store opens soon.", "The Book Store needs the latest server update.") : "The Book Store opens soon.";
}
var m = String((e && e.message) || e || "That did not go through.");
try {
var j = JSON.parse(m);
m = j.hint || j.message || m;
}
catch (x) { }
return m;
},
function (name, args, read) {
if (bstSigned() && typeof cityRpc === "function")
return cityRpc(name, args || {});
if (read && typeof restRpc === "function" && typeof DW_CONFIG !== "undefined" && DW_CONFIG.supabaseUrl)
return restRpc(name, args || {}).then(function (o) { if (o == null)
throw new Error("PGRST202"); return o; });
return Promise.resolve({ ok: false, say: "Sign in first." });
},
function (force) {
if (BST.loading)
return BST.loading;
if (!force && BST.books && Date.now() - BST.at < 90000)
return Promise.resolve(BST.books);
BST.loading = bstRpc("bookstore_shelves", {}, true).then(function (o) {
BST.loading = null;
BST.at = Date.now();
if (o && o.ok) {
BST.books = o.books || [];
BST.open = o.open !== false;
BST.sites = o.sites || [];
BST.own = o.own_sites !== false;
BST.may = o.may == null ? null : !!o.may;
BST.why = o.why || "";
BST.max = +o.max || 6;
BST.missing = false;
}
else if (!BST.books)
BST.books = [];
BST.count = {};
BST.books.forEach(function (b) { if (b.status === "approved")
BST.count[b.genre] = (BST.count[b.genre] || 0) + 1; });
return BST.books;
}).catch(function (e) { BST.loading = null; BST.at = Date.now(); bstErr(e); if (!BST.books)
BST.books = []; return BST.books; });
return BST.loading;
},
function (ids) {
ids = ids.filter(function (id) { return !BST.cov[id] && !BST.covAsk[id]; }).slice(0, 24);
if (!ids.length)
return Promise.resolve(0);
ids.forEach(function (id) { BST.covAsk[id] = 1; });
return bstRpc("bookstore_covers", { p_ids: ids }, true).then(function (o) {
var n = 0;
((o && o.covers) || []).forEach(function (c) { if (c && c.cover && /^data:image\/(jpeg|png|webp);base64,/.test(c.cover)) {
BST.cov[c.id] = c.cover;
n++;
} });
return n;
}).catch(function () { return 0; });
},
function (x, text, max, lh, y, maxLines) {
var words = String(text || "").split(/\s+/), line = "", lines = [];
words.forEach(function (w) { var t = line ? line + " " + w : w; if (x.measureText(t).width > max && line) {
lines.push(line);
line = w;
}
else
line = t; });
if (line)
lines.push(line);
lines = lines.slice(0, maxLines || 4);
lines.forEach(function (l, i) { x.fillText(l, x.canvas.width / 2, y + i * lh); });
return lines.length;
},
function (b, w, h) {
var c = document.createElement("canvas");
c.width = w || 160;
c.height = h || 240;
var x = c.getContext("2d"), W = c.width, H = c.height;
x.fillStyle = bstColour(b.id);
x.fillRect(0, 0, W, H);
x.strokeStyle = "#C9A050";
x.lineWidth = Math.max(2, W / 60);
x.strokeRect(W * 0.06, H * 0.05, W * 0.88, H * 0.9);
x.fillStyle = "rgba(0,0,0,.18)";
x.fillRect(0, 0, W * 0.07, H);
x.fillStyle = "#F2E6C4";
x.textAlign = "center";
x.font = "bold " + Math.round(W / 8.5) + "px Georgia,serif";
bstWrap(x, b.title, W * 0.8, W / 7.5, H * 0.3, 4);
x.font = "italic " + Math.round(W / 12) + "px Georgia,serif";
x.fillStyle = "#E8D4A0";
bstWrap(x, b.author, W * 0.8, W / 11, H * 0.82, 2);
return c;
},
function (b) {
var t;
if (BST.cov[b.id]) {
var img = new Image();
t = new THREE.Texture(img);
img.onload = function () { t.needsUpdate = true; };
img.src = BST.cov[b.id];
}
else
t = new THREE.CanvasTexture(bstPrinted(b, 160, 240));
if (THREE.SRGBColorSpace && "colorSpace" in t)
t.colorSpace = THREE.SRGBColorSpace;
return t;
},
function (b) {
if (!BST_GEO) {
BST_GEO = { face: new THREE.PlaneGeometry(0.3, 0.44), back: new THREE.BoxGeometry(0.3, 0.44, 0.03) };
BST_BACK = new THREE.MeshLambertMaterial({ color: 0xE8E0CC });
}
var g = new THREE.Group();
var bk = new THREE.Mesh(BST_GEO.back, BST_BACK);
bk.position.z = -0.016;
g.add(bk);
var f = new THREE.Mesh(BST_GEO.face, bstMat(b));
f.position.z = 0.0005;
g.add(f);
g.userData.bstBook = b.id;
return g;
},
function (force) {
if (!bstInside() || !INT.root || !BST.books)
return;
if (!force) {
BST.dressAt = Date.now();
if (!INT.root.children.some(function (c) { var k = c.userData && c.userData.furn; return k && BST_SLOTS[k] && !c.userData.bstOn; }))
return;
}
var kids = INT.root.children, has = {}, pools = {}, used = {}, all = bstShown().slice().sort(function (a, b) { return String(b.at || "").localeCompare(String(a.at || "")); });
kids.forEach(function (c) { var k = c.userData && c.userData.furn; if (k && BST_SLOTS[k])
has[bstPoolOf(k)] = 1; });
var orphans = all.filter(function (b) { return !has[b.genre]; }), rest = all.filter(function (b) { return has[b.genre]; });
pools.all = orphans.concat(rest);
all.forEach(function (b) { if (has[b.genre])
(pools[b.genre] = pools[b.genre] || []).push(b); });
var lite = typeof LITE !== "undefined" && LITE, shown = 0, want = [];
kids.forEach(function (c) {
var k = c.userData && c.userData.furn, S = k && BST_SLOTS[k];
if (!S)
return;
if (c.userData.bstG) {
c.remove(c.userData.bstG);
c.userData.bstG = null;
}
var pool = k === "bstsigning" ? [bstAuthorOfWeek()].filter(Boolean) : pools[bstPoolOf(k)] || [], p = bstPoolOf(k);
var G = new THREE.Group();
S.forEach(function (s) {
if (!pool.length)
return;
var i = used[p] || 0;
if (i >= pool.length) {
if (p !== "all" || i >= pool.length * 3)
return;
}
used[p] = i + 1;
var b = pool[i % pool.length], m = bstBookMesh(b);
m.position.set(s[0], s[1], s[2]);
m.rotation.set(s[3] || 0, s[4] || 0, 0, "YXZ");
G.add(m);
shown++;
if (!BST.cov[b.id] && b.has_cover)
want.push(b.id);
});
c.add(G);
c.userData.bstG = G;
c.userData.bstOn = 1;
});
BST.dressAt = Date.now();
var seen = {};
want = want.filter(function (id) { if (seen[id])
return false; seen[id] = 1; return true; }).slice(0, lite ? 48 : 120);
if (want.length)
bstCovers(want).then(function (n) { if (n)
bstRefresh(); if (want.length > 24)
setTimeout(function () { bstCovers(want.slice(24)).then(function (n2) { if (n2)
bstRefresh(); }); }, 400); });
},
function () {
if (!bstInside() || !INT.root)
return null;
var P = camera.position, fy = (INT.level || 0) * (INT.floor || 4), best = null, bd = 2.3;
INT.root.children.forEach(function (c) {
var k = c.userData && c.userData.furn;
if (!k || k.indexOf("bst") !== 0)
return;
if (!(BST_SLOTS[k] || k === "bstcounter" || k === "bsthowto" || k === "bststage" || k.indexOf("bstomt") === 0))
return;
if (Math.abs(c.position.y - fy) > 1.2)
return;
var d = Math.hypot(P.x - (INT.ox + c.position.x), P.z - (INT.oz + c.position.z));
if (d < bd) {
bd = d;
best = { k: k, c: c };
}
});
return best;
},
function (n) {
var k = n.k;
if (k === "bstcounter")
return "<b>The counter</b> · <b>press E</b> (or tap here) to ask the bookseller";
if (k.indexOf("bstomt") === 0)
return bstOmtSay(k);
if (k === "bsthowto")
return "<b>Your book on our shelves</b> · <b>press E</b> (or tap here) to put yours here";
if (k === "bststage" || k === "bstsigning") {
var a = bstAuthorOfWeek();
return a ? "<b>Author corner</b> · this week, " + esc(a.title) + " by " + esc(a.author) + " · <b>press E</b>" : "<b>Author corner</b> · <b>press E</b> to put your own book here";
}
var p = bstPoolOf(k), n2 = p === "all" ? bstShown().length : (BST.count[p] || 0), name = p === "all" ? (k === "bstfeature" ? "New from our dreamers" : "New and notable") : bstGenreName(p);
return "<b>" + esc(name) + "</b> · " + (n2 ? n2 + " book" + (n2 === 1 ? "" : "s") : "no books here yet") + " · <b>press E</b> (or tap here) to look" + (n2 ? " through them" : "");
},
function (n) {
var k = n.k;
if (k === "bstcounter")
return bstMenu("browse");
if (k.indexOf("bstomt") === 0)
return bstOmtDo(k);
if (k === "bsthowto")
return bstMenu("mine");
if (k === "bststage" || k === "bstsigning") {
var a = bstAuthorOfWeek();
return a ? bstMenu("book", a.id) : bstMenu("mine");
}
var p = bstPoolOf(k);
bstMenu("shelf", p === "all" ? "" : p);
},
function () {
if (BST.el)
return BST.el;
var d = document.createElement("div");
d.id = "bst-panel";
d.style.cssText = "position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:9002;width:min(580px,calc(100vw - 24px));max-height:min(86vh,760px);overflow:auto;display:none;" +
"background:rgba(22,18,14,.97);color:#EFE6D4;border:1px solid rgba(201,160,80,.55);border-radius:12px;padding:14px 16px;font:14px/1.5 system-ui,sans-serif;box-shadow:0 10px 40px rgba(0,0,0,.55)";
document.body.appendChild(d);
BST.el = d;
if (typeof backRegister === "function")
backRegister({ order: 3, open: function () { return BST.el && BST.el.style.display !== "none"; }, close: bstClose });
d.addEventListener("click", bstClick);
return d;
},
function (title, html, back) {
var d = bstEl();
d.style.width = "min(580px,calc(100vw - 24px))";
d.style.maxHeight = "min(86vh,760px)";
d.innerHTML = "<div style='display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px'>" +
(back ? "<button class='btn' data-bst='" + esc(back) + "' style='min-width:44px;min-height:40px' title='Back'>‹</button>" : "") +
"<b style='flex:1;font:600 18px Georgia,serif;color:#E8C27A'>" + esc(title) + "</b><button class='btn' data-bst='x' style='min-width:44px;min-height:40px'>✕</button></div>" + html;
d.style.display = "block";
if (document.exitPointerLock)
try {
document.exitPointerLock();
}
catch (e) { }
},
function (on) {
var t = [["browse", "The shelves"], ["mine", "My books"], ["where", "Where it is"]];
return "<div style='display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px'>" + t.map(function (x) { return "<button class='btn" + (x[0] === on ? " primary" : "") + "' data-bst='" + x[0] + "' style='min-height:40px'>" + x[1] + "</button>"; }).join("") + "</div>";
},
function (b) {
return "<button data-bst='book:" + b.id + "' style='all:unset;cursor:pointer;display:flex;flex-direction:column;gap:4px;width:100%'>" +
"<img alt='' src='" + esc(bstThumb(b)) + "' style='width:100%;aspect-ratio:2/3;object-fit:cover;border-radius:3px;box-shadow:0 2px 8px rgba(0,0,0,.5);background:#2A2018'>" +
"<span style='font:600 13px Georgia,serif;line-height:1.25;color:#F4ECD8'>" + esc(b.title) + "</span><span style='font-size:12px;color:#BFAF90'>" + esc(b.author) + "</span></button>";
},
function (list) {
if (!list.length)
return "<p style='opacity:.8'>No books here yet. Every book in this shop is put here by the dreamer who wrote it: <a href='#' data-bst='mine' style='color:#E8C27A'>put yours here</a>.</p>";
var ids = list.filter(function (b) { return b.has_cover && !BST.cov[b.id]; }).map(function (b) { return b.id; });
if (ids.length)
bstCovers(ids).then(function (n) { if (n && BST.view && BST.el && BST.el.style.display !== "none")
bstMenu(BST.view[0], BST.view[1], true); });
return "<div style='display:grid;grid-template-columns:repeat(auto-fill,minmax(112px,1fr));gap:14px'>" + list.map(bstCard).join("") + "</div>";
},
function (view, arg, quiet) {
view = view || "browse";
BST.view = [view, arg];
if (!BST.books && !quiet) {
bstShow("📚 The Dreamers' Book Store", "<p style='opacity:.8'>Opening the shop…</p>");
}
if (view === "edit")
return bstEditor(arg);
bstLoad(!quiet && view === "mine").then(function () {
if (!BST.view || BST.view[0] !== view || BST.view[1] !== arg)
return;
if (view === "book")
return bstBookView(+arg);
if (view === "leave")
return bstLeave(+arg);
if (view === "mine")
return bstMine();
if (view === "where")
return bstWhere();
if (view === "shelf" || view === "browse")
return bstBrowse(view === "shelf" ? arg : "", quiet);
});
},
function (g, quiet) {
var q = (BST.q || "").toLowerCase(), list = bstShown().filter(function (b) { return (!g || b.genre === g) && (!q || (b.title + " " + b.author).toLowerCase().indexOf(q) >= 0); })
.sort(function (a, b) { return String(b.at || "").localeCompare(String(a.at || "")); });
var opts = "<option value=''>Every kind of book</option>" + BST_GENRES.map(function (x) { var n = BST.count[x[0]] || 0; return "<option value='" + x[0] + "'" + (x[0] === g ? " selected" : "") + ">" + esc(x[1]) + (n ? " (" + n + ")" : "") + "</option>"; }).join("");
var h = bstTabs("browse") +
"<p style='margin:0 0 10px;opacity:.85'>Every book here was written by a dreamer. Open one to read about it; <b>Buy it</b> takes you to the shop that sells it.</p>" +
"<div style='display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px'><select id='bst-g' style='min-height:40px;flex:1;min-width:160px'>" + opts + "</select>" +
"<input id='bst-q' type='search' placeholder='Title or author' value='" + esc(BST.q || "") + "' style='min-height:40px;flex:1;min-width:140px'></div>" +
(BST.missing ? "<p style='opacity:.8'>" + esc(bstErr("404")) + "</p>" : bstGrid(list));
bstShow(g ? "📚 " + bstGenreName(g) : "📚 The Dreamers' Book Store", h);
var sel = document.getElementById("bst-g"), qi = document.getElementById("bst-q");
if (sel)
sel.onchange = function () { bstMenu(sel.value ? "shelf" : "browse", sel.value, true); };
if (qi) {
qi.oninput = function () { BST.q = qi.value; clearTimeout(BST.qt); BST.qt = setTimeout(function () { bstMenu(g ? "shelf" : "browse", g, true); var n = document.getElementById("bst-q"); if (n) {
n.focus();
n.setSelectionRange(n.value.length, n.value.length);
} }, 350); };
}
},
function (id) {
var b = bstById(id);
if (!b)
return bstMenu("browse");
if (b.has_cover && !BST.cov[b.id])
bstCovers([b.id]).then(function (n) { if (n && BST.view && BST.view[0] === "book" && +BST.view[1] === id)
bstBookView(id); });
var mine = !!b.mine, live = b.status === "approved";
var h = "<div style='display:flex;gap:16px;flex-wrap:wrap'>" +
"<img alt='' src='" + esc(bstThumb(b)) + "' style='width:min(180px,40vw);aspect-ratio:2/3;object-fit:cover;border-radius:4px;box-shadow:0 4px 14px rgba(0,0,0,.6);background:#2A2018'>" +
"<div style='flex:1;min-width:200px'><div style='font:600 22px Georgia,serif;color:#F4ECD8;line-height:1.2'>" + esc(b.title) + "</div>" +
"<div style='margin:4px 0 8px;color:#D8C49A'>by " + esc(b.author) + "</div>" +
"<div style='font-size:12px;color:#BFAF90;margin-bottom:10px'>" + esc(bstGenreName(b.genre)) + (b.adult ? " · for grown-ups" : "") + (b.by ? " · put here by " + esc(b.by) : "") + "</div>" +
(b.url && live ? "<button class='btn primary' data-bst='leave:" + b.id + "' style='min-height:44px'>Buy it at " + esc(bstHostName(b.host)) + " ↗</button>" : "") +
(mine ? "<div style='margin-top:8px;display:flex;gap:8px;flex-wrap:wrap'><button class='btn' data-bst='edit:" + b.id + "' style='min-height:40px'>Change it</button></div>" +
(live ? "" : "<p style='color:#E8C07A;font-size:12.5px'>" + esc(bstStatusWords(b)) + "</p>") : "") +
"</div></div>" +
(b.blurb ? "<div style='margin-top:14px;white-space:pre-wrap;line-height:1.6'>" + esc(b.blurb) + "</div>" : "");
bstShow("📚 " + bstGenreName(b.genre), h, b.genre ? "shelf:" + b.genre : "browse");
},
function (id) {
var b = bstById(id);
if (!b || !b.url)
return bstMenu("browse");
var host = bstHostName(b.host);
var h = "<p style='margin:0 0 10px'><b>You are leaving SomnuMatrix.</b></p>" +
"<p style='margin:0 0 10px'>This opens <b>" + esc(host) + "</b> in a new tab, where <i>" + esc(b.title) + "</i> is sold. The game stays open here.</p>" +
"<p style='margin:0 0 14px;opacity:.85;font-size:13px'>The book is sold by that shop, not by SomnuMatrix. What you pay, and what you get, is between you and them. No gold is spent.</p>" +
"<div style='display:flex;gap:8px;flex-wrap:wrap'><a class='btn primary' id='bst-go' href='" + esc(b.url) + "' target='_blank' rel='noopener noreferrer nofollow' style='min-height:44px;display:inline-flex;align-items:center;text-decoration:none'>Go to " + esc(host) + " ↗</a>" +
"<button class='btn' data-bst='book:" + b.id + "' style='min-height:44px'>Stay here</button></div>";
bstShow("Leaving the game", h, "book:" + b.id);
var a = document.getElementById("bst-go");
if (a)
a.onclick = function () { bstRpc("bookstore_open", { p_id: b.id }, true).catch(function () { }); setTimeout(function () { bstMenu("book", b.id, true); }, 200); };
},
function () {
var h = bstTabs("mine");
if (!bstSigned()) {
bstShow("📚 My books", h + "<p>Sign in to Somnucor to put your own book on the shelves.</p>");
return;
}
if (BST.missing) {
bstShow("📚 My books", h + "<p style='opacity:.8'>" + esc(bstErr("404")) + "</p>");
return;
}
var mine = (BST.books || []).filter(function (b) { return b.mine; });
h += "<p style='margin:0 0 10px;opacity:.85'>Wrote a book? Put it on our shelves: its cover, a few words about it, and a link to where it is sold (Amazon, Barnes &amp; Noble, Kobo, Apple Books, Google Play Books, Bookshop.org, Lulu, Gumroad" + (BST.own ? ", or your own website" : "") + "). Readers here open the link and buy it there.</p>";
if (BST.may === false)
h += "<p style='color:#E8C07A'>" + esc(BST.why || "Putting books on the shelves is for dreamers who pay their dues.") + "</p>";
else if (mine.length < (BST.max || 6))
h += "<button class='btn primary' data-bst='edit:new' style='min-height:44px;margin-bottom:12px'>➕ Add a book</button>";
else
h += "<p class='dim' style='opacity:.75'>You have " + mine.length + " books here, as many as one dreamer may have on the shelves.</p>";
h += mine.length ? mine.map(function (b) {
return "<div style='display:flex;gap:12px;align-items:center;padding:8px 0;border-top:1px solid rgba(255,255,255,.08)'>" +
"<img alt='' src='" + esc(bstThumb(b)) + "' style='width:52px;aspect-ratio:2/3;object-fit:cover;border-radius:2px'>" +
"<div style='flex:1;min-width:0'><b>" + esc(b.title) + "</b><br><span style='font-size:12.5px;color:" + (b.status === "approved" ? "#9AE8A0" : "#E8C07A") + "'>" + esc(bstStatusWords(b)) + "</span>" +
(b.opens ? "<br><span style='font-size:12px;opacity:.7'>Opened by readers " + (+b.opens) + " time" + (+b.opens === 1 ? "" : "s") + "</span>" : "") + "</div>" +
"<div style='display:flex;flex-direction:column;gap:6px'><button class='btn' data-bst='edit:" + b.id + "' style='min-height:38px'>Change</button><button class='btn' data-bst='del:" + b.id + "' style='min-height:38px'>Take down</button></div></div>";
}).join("") : "<p style='opacity:.7'>You have no books here yet.</p>";
bstShow("📚 My books", h);
var ids = mine.filter(function (b) { return b.has_cover && !BST.cov[b.id]; }).map(function (b) { return b.id; });
if (ids.length)
bstCovers(ids).then(function (n) { if (n && BST.view && BST.view[0] === "mine")
bstMine(); });
},
function () {
var o = bstPlace(), here = false;
try {
var r = typeof somnucorRealm === "function" ? somnucorRealm() : null;
here = !!(r && (store.here || 0) === r.id && !store.inside && !(typeof WLD !== "undefined" && WLD && WLD.on));
}
catch (e) { }
var h = bstTabs("where") + "<p>The Dreamers' Book Store stands on the <b>Market Ring</b> of Somnucor, among the shops: three storeys of red brick and pale stone, a deep green shop front with two great windows full of books, and its name in gold over the door.</p>" +
"<p style='opacity:.85'>Inside: the shop floor with the counter, the café and the wall of new books from our dreamers; behind it, a room for every kind of book on three floors, the reading rooms, the author corner, and the children's room.</p>";
h += "<p style='opacity:.85'>To find it: tap the compass and type <b>book</b>.</p>";
if (o && here)
h += "<button class='btn primary' data-bst='go' style='min-height:44px'>Take me there</button>";
else if (!o)
h += "<p class='dim' style='opacity:.7'>It shows on the map once you are in Somnucor.</p>";
else
h += "<p class='dim' style='opacity:.7'>Go back to Somnucor and walk to the Market Ring, or open this again there to be taken to the door.</p>";
bstShow("📚 Where it is", h);
},
function (id) {
if (!bstSigned())
return bstMine();
var b = id && id !== "new" ? bstById(+id) : null;
BST.draft = { id: b ? b.id : null, cover: null, coverKeep: !!(b && b.has_cover) };
var g = b ? b.genre : "fiction";
var h = "<p style='margin:0 0 10px;opacity:.85'>" + (b ? "Change what readers see. " : "") + "Books go on the shelves once the Keeper has looked at them.</p>" +
"<label style='display:block;margin-bottom:8px'>Title<br><input id='bst-t' maxlength='120' value='" + esc(b ? b.title : "") + "' style='width:100%;min-height:40px'></label>" +
"<label style='display:block;margin-bottom:8px'>Author (the name on the cover)<br><input id='bst-a' maxlength='80' value='" + esc(b ? b.author : "") + "' style='width:100%;min-height:40px'></label>" +
"<label style='display:block;margin-bottom:8px'>Kind of book<br><select id='bst-gn' style='width:100%;min-height:40px'>" + BST_GENRES.map(function (x) { return "<option value='" + x[0] + "'" + (x[0] === g ? " selected" : "") + ">" + esc(x[1]) + "</option>"; }).join("") + "</select></label>" +
"<label style='display:block;margin-bottom:8px'>About the book (what readers see when they open it)<br><textarea id='bst-bl' maxlength='1200' rows='5' style='width:100%'>" + esc(b ? b.blurb || "" : "") + "</textarea></label>" +
"<label style='display:block;margin-bottom:4px'>Where it is sold (the full address of the book's page, starting https://)<br><input id='bst-u' maxlength='500' inputmode='url' placeholder='https://www.amazon.com/dp/…' value='" + esc(b ? b.url || "" : "") + "' style='width:100%;min-height:40px'></label>" +
"<div id='bst-uw' style='font-size:12px;opacity:.75;margin-bottom:10px'>Amazon, Barnes &amp; Noble, Kobo, Apple Books, Google Play Books, Bookshop.org, Lulu or Gumroad" + (BST.own ? ", or your own website (the Keeper checks it first)" : "") + ".</div>" +
"<div style='display:flex;gap:12px;align-items:center;margin-bottom:10px'><img id='bst-cv' alt='' src='" + esc(b ? bstThumb(b) : bstThumb({ id: 0, title: "Your book", author: "Your name" })) + "' style='width:72px;aspect-ratio:2/3;object-fit:cover;border-radius:3px;background:#2A2018'>" +
"<label style='flex:1'>The cover (a picture)<br><input id='bst-f' type='file' accept='image/*' style='max-width:100%'></label></div>" +
"<label style='display:flex;gap:8px;align-items:center;margin-bottom:12px'><input id='bst-ad' type='checkbox'" + (b && b.adult ? " checked" : "") + "> For grown-ups only (hidden from dreamers under 18)</label>" +
"<div id='bst-msg' style='color:#E8A07A;margin-bottom:8px'></div>" +
"<div style='display:flex;gap:8px;flex-wrap:wrap'><button class='btn primary' data-bst='save' style='min-height:44px'>" + (b ? "Save the changes" : "Put it on the shelves") + "</button><button class='btn' data-bst='mine' style='min-height:44px'>Cancel</button></div>";
bstShow(b ? "📚 Change your book" : "📚 Add your book", h, "mine");
var f = document.getElementById("bst-f");
if (f)
f.onchange = function () {
var file = f.files && f.files[0];
if (!file)
return;
bstShrink(file).then(function (d) { BST.draft.cover = d; var im = document.getElementById("bst-cv"); if (im)
im.src = d; bstNote(""); })
.catch(function (e) { bstNote(e.message || "That picture could not be read."); });
};
var u = document.getElementById("bst-u");
if (u)
u.oninput = function () { var c = bstUrlCheck(u.value); var w = document.getElementById("bst-uw"); if (w && u.value.trim())
w.innerHTML = c.ok ? "✓ " + esc(c.host) + (c.own ? " (your own website: the Keeper checks it first)" : "") : "<span style='color:#E8A07A'>" + esc(c.say) + "</span>"; };
},
function (file) {
return new Promise(function (res, rej) {
if (!file || !/^image\//.test(file.type || ""))
return rej(new Error("That is not a picture."));
var url = URL.createObjectURL(file), img = new Image();
img.onload = function () {
var s = Math.min(1, 400 / Math.max(1, img.height), 300 / Math.max(1, img.width)), w = Math.max(40, Math.round(img.width * s)), h = Math.max(60, Math.round(img.height * s));
var c = document.createElement("canvas");
c.width = w;
c.height = h;
var x = c.getContext("2d");
x.fillStyle = "#FFFFFF";
x.fillRect(0, 0, w, h);
x.drawImage(img, 0, 0, w, h);
URL.revokeObjectURL(url);
var q = 0.84, d = c.toDataURL("image/jpeg", q);
while (d.length > 90000 && q > 0.3) {
q -= 0.1;
d = c.toDataURL("image/jpeg", q);
}
if (d.length > 90000)
return rej(new Error("That picture is too detailed to make small. Try another."));
res(d);
};
img.onerror = function () { URL.revokeObjectURL(url); rej(new Error("That picture could not be read.")); };
img.src = url;
});
},
function (v) {
v = String(v || "").trim();
var m = /^https:\/\/([^\/?#]+)([\/?#][^\s]*)?$/i.exec(v);
if (!m)
return { ok: false, say: "Use the full address of the book's page, starting https://" };
var host = m[1].toLowerCase();
if (/[@:]/.test(host))
return { ok: false, say: "That address is not a plain web address." };
if (/^[0-9.]+$/.test(host) || host.indexOf(".") < 0)
return { ok: false, say: "That address is not a plain web address." };
if (BST_SHORT.indexOf(host.replace(/^www\./, "")) >= 0)
return { ok: false, say: "Use the book's own address, not a shortened link." };
var sites = BST.sites && BST.sites.length ? BST.sites : ["amazon.com", "barnesandnoble.com", "kobo.com", "books.apple.com", "play.google.com", "bookshop.org", "lulu.com", "gumroad.com"];
var known = sites.some(function (s) { s = String(s).toLowerCase(); return host === s || host.slice(-(s.length + 1)) === "." + s || (/^amazon\./.test(s) && /(^|\.)amazon\.[a-z.]+$/.test(host)); });
if (known)
return { ok: true, host: host, own: false };
if (BST.own)
return { ok: true, host: host, own: true };
return { ok: false, say: "Links go to a known bookshop: " + sites.join(", ") + "." };
},
function () {
if (BST.busy)
return;
var t = (document.getElementById("bst-t").value || "").trim(), a = (document.getElementById("bst-a").value || "").trim(), u = (document.getElementById("bst-u").value || "").trim();
if (t.length < 1)
return bstNote("Give your book its title.");
if (a.length < 1)
return bstNote("Say whose name is on the cover.");
var c = bstUrlCheck(u);
if (!c.ok)
return bstNote(c.say);
var D = BST.draft || {};
BST.busy = true;
bstNote("Saving…");
cityRpc("bookstore_save", { p_id: D.id, p_title: t, p_author: a, p_genre: document.getElementById("bst-gn").value, p_blurb: (document.getElementById("bst-bl").value || "").trim(),
p_url: u, p_cover: D.cover || null, p_adult: !!document.getElementById("bst-ad").checked }).then(function (o) {
BST.busy = false;
if (!o || !o.ok)
return bstNote((o && o.say) || "That did not go through.");
if (D.cover && o.id) {
BST.cov[o.id] = D.cover;
}
if (o.id && BST.mat[o.id])
delete BST.mat[o.id];
if (typeof setStatus === "function")
setStatus("<b>" + esc(o.say || "Saved.") + "</b>");
bstMenu("mine");
}).catch(function (e) { BST.busy = false; bstNote(bstErr(e)); });
},
function (id) {
var b = bstById(id);
if (!b)
return;
if (BST.view && BST.view[0] === "del" && +BST.view[1] === id) {
cityRpc("bookstore_remove", { p_id: id }).then(function (o) { if (typeof setStatus === "function")
setStatus(esc((o && o.say) || "Taken down.")); delete BST.cov[id]; bstMenu("mine"); })
.catch(function (e) { bstShow("📚 My books", "<p>" + esc(bstErr(e)) + "</p>", "mine"); });
return;
}
BST.view = ["del", id];
bstShow("Take it down?", "<p>Take <b>" + esc(b.title) + "</b> off the shelves for good?</p><div style='display:flex;gap:8px'><button class='btn primary' data-bst='del:" + id + "' style='min-height:44px'>Take it down</button><button class='btn' data-bst='mine' style='min-height:44px'>Keep it</button></div>", "mine");
},
function (e) {
var t = e.target && e.target.closest ? e.target.closest("[data-bst]") : null;
if (!t)
return;
var a = t.getAttribute("data-bst"), i = a.indexOf(":"), v = i < 0 ? a : a.slice(0, i), arg = i < 0 ? "" : a.slice(i + 1);
if (t.tagName === "A")
e.preventDefault();
if (v === "x")
return bstClose();
if (v === "go")
return bstGo();
if (v === "save")
return bstSave();
if (v === "del")
return bstDelete(+arg);
if (v.indexOf("omt") === 0)
return bstOmt(v, arg);
bstMenu(v, arg);
},
function (i) {
if (BST_OMT_TEX[i])
return BST_OMT_TEX[i];
var b = BST_OMT[i], cv = document.createElement("canvas");
cv.width = 192;
cv.height = 288;
var x = cv.getContext("2d");
x.fillStyle = "#0E0A14";
x.fillRect(0, 0, 192, 288);
x.strokeStyle = "#C9A050";
x.lineWidth = 5;
x.strokeRect(8, 8, 176, 272);
x.lineWidth = 1.5;
x.strokeRect(15, 15, 162, 258);
x.fillStyle = "#E8C878";
x.textAlign = "center";
x.font = "54px Georgia,serif";
x.fillText(b[3] || "☾", 96, 92);
x.font = "bold 19px Georgia,serif";
bstWrap(x, b[0], 160, 22, 140, 4);
x.font = "italic 15px Georgia,serif";
x.fillStyle = "#C8B8E0";
x.fillText(b[1], 96, 252);
var t = new THREE.CanvasTexture(cv), m = new THREE.MeshLambertMaterial({ map: t });
BST_OMT_TEX[i] = m;
if (b[4] && typeof THREE.TextureLoader === "function") {
try {
var ld = new THREE.TextureLoader();
ld.setCrossOrigin && ld.setCrossOrigin("anonymous");
ld.load(b[4], function (tx) { m.map = tx; m.needsUpdate = true; }, undefined, function () { });
}
catch (e) { }
}
return m;
},
function (kind) {
var list = BST_OMT.map(function (b, i) { return i; }).filter(function (i) { return !kind || BST_OMT[i][2] === kind; });
var h = "<p style='margin:0 0 10px;opacity:.85'>The books of the Temple of the Obsidian Moon, by its own hands. Open one to read about it; buy it at Amazon, or ask the temple for a signed copy.</p>" +
"<div style='display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px'><button class='btn" + (kind ? "" : " primary") + "' data-bst='omtshelf:' style='min-height:40px'>Every book</button>" +
BST_OMT_KINDS.map(function (K) { return "<button class='btn" + (kind === K[0] ? " primary" : "") + "' data-bst='omtshelf:" + esc(K[0]) + "' style='min-height:40px'>" + K[2] + " " + esc(K[1]) + "</button>"; }).join("") + "</div>" +
"<div style='display:grid;grid-template-columns:repeat(auto-fill,minmax(118px,1fr));gap:12px'>" + list.map(function (i) {
var b = BST_OMT[i];
return "<button data-bst='omtbook:" + i + "' style='all:unset;cursor:pointer;display:flex;flex-direction:column;gap:4px;width:100%'>" + bstOmtCoverHtml(i) +
"<span style='font:600 13px Georgia,serif;line-height:1.25;color:#F4ECD8'>" + esc(b[0]) + "</span><span style='font-size:12px;color:#BFAF90'>" + esc(b[1]) + "</span></button>";
}).join("") + "</div>" +
"<p style='margin:12px 0 0;font-size:13px;opacity:.85'>Wrote a book yourself? <button class='btn' data-bst='mine' style='min-height:36px'>Put your own book on our shelves</button></p>";
bstShow("☾ The Obsidian Moon alcove", h);
},
function (i) {
var b = BST_OMT[i];
return "<div style='position:relative;width:100%;aspect-ratio:2/3;border-radius:3px;overflow:hidden;background:#0E0A14;border:2px solid #C9A050;box-shadow:0 2px 8px rgba(0,0,0,.5);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:6px;box-sizing:border-box'>" +
"<span style='font:34px Georgia,serif;color:#E8C878'>" + esc(b[3] || "☾") + "</span><span style='font:600 11px Georgia,serif;color:#E8C878;margin-top:6px'>" + esc(b[0]) + "</span>" +
(b[4] ? "<img alt='' src='" + esc(b[4]) + "' onerror='this.remove()' style='position:absolute;inset:0;width:100%;height:100%;object-fit:cover'>" : "") + "</div>";
},
function (i) {
var b = BST_OMT[i];
if (!b)
return bstOmtShelf("");
var h = "<div style='display:flex;gap:14px;flex-wrap:wrap'><div style='width:150px;flex:none'>" + bstOmtCoverHtml(i) + "</div><div style='flex:1;min-width:200px'>" +
"<div style='font:600 19px Georgia,serif;color:#F4ECD8'>" + esc(b[0]) + "</div><div style='margin:4px 0 8px;color:#D8C49A'>by " + esc(b[1]) + " · " + esc(b[2]) + "</div>" +
"<p style='margin:0 0 12px'>" + esc(b[5] || "") + "</p>" +
"<div style='display:flex;gap:8px;flex-wrap:wrap'>" + (b[8] ? "<button class='btn primary' data-bst='omtleave:" + i + "' style='min-height:44px'>Buy at Amazon" + (b[7] ? " · " + esc(b[7]) : "") + " ↗</button>" : "") +
(b[6] && b[6] !== "N/A" ? "<button class='btn' data-bst='omtsign:" + i + "' style='min-height:44px'>✒️ A signed copy · " + esc(b[6]) + "</button>" : "") + "</div>" +
"<p style='margin:10px 0 0;font-size:12.5px;opacity:.75'>Amazon's price is for the Kindle edition; the paperback is at the same link. Signed copies are hand-blessed and sent from the temple: allow a few extra days.</p></div></div>";
bstShow(b[0], h, "omtshelf:" + b[2]);
},
function (i) {
var b = BST_OMT[i];
if (!b || !b[8])
return bstOmtShelf("");
var h = "<p style='margin:0 0 10px'><b>You are leaving SomnuMatrix.</b></p><p style='margin:0 0 10px'>This opens <b>amazon.com</b> in a new tab, where <i>" + esc(b[0]) + "</i> is sold. The game stays open here.</p>" +
"<p style='margin:0 0 14px;opacity:.85;font-size:13px'>What you pay, and what you get, is between you and Amazon. No gold is spent.</p>" +
"<div style='display:flex;gap:8px;flex-wrap:wrap'><a class='btn primary' href='" + esc(b[8]) + "' target='_blank' rel='noopener noreferrer nofollow' style='min-height:44px;display:inline-flex;align-items:center;text-decoration:none'>Go to amazon.com ↗</a>" +
"<button class='btn' data-bst='omtbook:" + i + "' style='min-height:44px'>Stay here</button></div>";
bstShow("Leaving the game", h, "omtbook:" + i);
},
function (i) {
var b = BST_OMT[i];
if (!b)
return bstOmtShelf("");
var h = "<p style='margin:0 0 10px'>Ask the temple for a signed copy of <i>" + esc(b[0]) + "</i> (" + esc(b[6]) + "). The temple writes back to settle the shipping and payment; nothing is paid in the game.</p>" +
"<label style='display:block;margin:6px 0'>Your name<br><input id='omt-nm' maxlength='60' style='width:100%;min-height:36px'></label>" +
"<label style='display:block;margin:6px 0'>Your email<br><input id='omt-em' type='email' maxlength='120' style='width:100%;min-height:36px'></label>" +
"<label style='display:block;margin:6px 0'>Where to send it<br><textarea id='omt-ad' rows='3' maxlength='400' style='width:100%'></textarea></label>" +
"<div style='display:flex;gap:8px;flex-wrap:wrap'><button class='btn primary' id='omt-send' style='min-height:44px'>✉️ Write to the temple</button><button class='btn' data-bst='omtbook:" + i + "' style='min-height:44px'>Back</button></div>" +
"<p style='margin:10px 0 0;font-size:12.5px;opacity:.75'>This opens a letter in your own email, to " + esc(BST_OMT_MAIL) + ".</p>";
bstShow("✒️ A signed copy", h, "omtbook:" + i);
var go = document.getElementById("omt-send");
if (go)
go.onclick = function () {
var nm = (document.getElementById("omt-nm").value || "").trim(), em = (document.getElementById("omt-em").value || "").trim(), ad = (document.getElementById("omt-ad").value || "").trim();
var body = "Signed copy: " + b[0] + " (" + b[6] + ")\nName: " + (nm || "-") + "\nEmail: " + (em || "-") + "\nSend to:\n" + (ad || "-") + "\n\n(asked for at the Obsidian Moon alcove of the Dreamers' Book Store, SomnuMatrix)";
window.open("mailto:" + BST_OMT_MAIL + "?subject=" + encodeURIComponent("Signed Copy Request: " + b[0]) + "&body=" + encodeURIComponent(body), "_blank");
};
}
];
});
