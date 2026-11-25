/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var DYE = { mats: {}, masks: {}, means: {}, ranks: {}, lo: 0.2, hi: 0.9, full: 1.3, keep: 48, n: 0, sel: null, zone: 0, vr: null,
pal: [0xFFFFFF, 0xF2EAD8, 0xC8C8C8, 0x7A7A80, 0x3A3A40, 0x101012, 0xD4AF37, 0xB08D57, 0xB87333, 0xC0C6CE,
0xE0201E, 0x8A1020, 0xFF7A1A, 0xFFC21A, 0xFFF04A, 0x9BE22A, 0x1FA84A, 0x0E6B4A, 0x16B8A8, 0x18D4F0,
0x3A8AF0, 0x1A3A9A, 0x0E1A4A, 0x7A3AE0, 0xB45AF0, 0x5A1A7A, 0xF03AA8, 0xFF9AC8, 0x7A4A2A, 0xC89A68] };
var DYE_ZONES = ["Base", "Trim", "Accent"];
var DYE_PAL_NAMES = ["White", "Ivory", "Silver grey", "Slate", "Charcoal", "Black", "Gold", "Brass", "Copper", "Steel",
"Red", "Crimson", "Orange", "Amber", "Yellow", "Lime", "Green", "Emerald", "Teal", "Cyan",
"Blue", "Royal blue", "Navy", "Purple", "Violet", "Plum", "Magenta", "Pink", "Brown", "Tan"];
function dyeOk(c) { return typeof c === "number" && isFinite(c) && c >= 0 && c <= 0xFFFFFF && Math.floor(c) === c; }
function dyeHex(c) { return "#" + ("000000" + ((c >>> 0) & 0xFFFFFF).toString(16)).slice(-6).toUpperCase(); }
function dyeOf(L, key) {
var d = L && L.dye && typeof L.dye === "object" && L.dye[key];
if (!Array.isArray(d) || d.length < 3 || !dyeOk(d[0]) || !dyeOk(d[1]) || !dyeOk(d[2]))
return null;
return d;
}
function dyeLinear() { return typeof renderer !== "undefined" && renderer && renderer.outputEncoding === THREE.sRGBEncoding; }
function dyeCol(hex) { var c = new THREE.Color(hex); if (dyeLinear())
c.convertSRGBToLinear(); return c; }
function dyeLum(r, g, b) { return 0.2126 * r + 0.7152 * g + 0.0722 * b; }
function dyeLinV(v) { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }
var DYE_VS = "varying float vDyY;\n";
var DYE_FS = "uniform vec3 dyC0;\nuniform vec3 dyC1;\nuniform vec3 dyC2;\nuniform vec3 dyZw;\nuniform vec3 dyMeans;\nuniform vec4 dyBand;\nuniform vec3 dyShade;\nuniform float dySpec;\n" +
"#if DYE_MODE == 1\nuniform sampler2D dyMask;\n#endif\nvarying float vDyY;\n";
var DYE_FRAG = [
"#ifdef DYE",
"{",
"  float dyDl = dot( diffuseColor.rgb, vec3( 0.2126, 0.7152, 0.0722 ) );",
"  float dyIrr = dot( reflectedLight.directDiffuse + reflectedLight.indirectDiffuse, vec3( 0.2126, 0.7152, 0.0722 ) ) / max( dyDl, 0.0004 );",
"  float dySh = clamp( dyShade.x + ( 1.0 - dyShade.x ) * dyIrr / dyShade.z, dyShade.x, dyShade.y );",
"  vec3 dyW = dyZw;",
"  #if DYE_MODE == 1",
"    dyW = texture2D( dyMask, vUv ).rgb; dyW /= max( dyW.r + dyW.g + dyW.b, 0.001 );",
"  #endif",
"  #ifdef DYE_BAND",
"    float dyT = clamp( ( vDyY - dyBand.x ) / max( dyBand.y - dyBand.x, 0.0001 ), 0.0, 1.0 );",
"    if( dyW.r > 0.5 ){ if( dyT < dyBand.z ) dyW = vec3( 0.0, 1.0, 0.0 ); else if( dyT < dyBand.z + dyBand.w ) dyW = vec3( 0.0, 0.0, 1.0 ); }",
"  #endif",
"  float dyDet = 1.0;",
"  #ifdef USE_MAP",
"    float dyTl = dot( texelColor.rgb, vec3( 0.2126, 0.7152, 0.0722 ) );",
"    dyDet = mix( 1.0, clamp( dyTl / max( dot( dyW, dyMeans ), 0.02 ), 0.55, 1.35 ), 0.6 );",
"  #endif",
"  gl_FragColor.rgb = ( dyC0 * dyW.r + dyC1 * dyW.g + dyC2 * dyW.b ) * dyDet * dySh;",
"  #ifdef DYE_SPEC",
"    gl_FragColor.rgb += ( reflectedLight.directSpecular + reflectedLight.indirectSpecular ) * dySpec;",
"  #endif",
"}",
"#endif"
].join("\n");
function dyeCompile(sh, r) { return __ZC(353, 0, this, arguments, new.target); }
function dyeMat(o) { return __ZC(353, 1, this, arguments, new.target); }
function dyeTrim() { return __ZC(353, 2, this, arguments, new.target); }
function dyeImg(tex, max) { return __ZC(353, 3, this, arguments, new.target); }
function dyeTexMean(tex) { return __ZC(353, 4, this, arguments, new.target); }
function dyeMask(tex, geo) { return __ZC(353, 5, this, arguments, new.target); }
function dyeArea(geo) { return __ZC(353, 6, this, arguments, new.target); }
function dyeBandOf(geo, trim, accent) {
if (!geo.boundingBox)
geo.computeBoundingBox();
var b = geo.boundingBox;
return [b.min.y, b.max.y, trim, accent];
}
function dyePieces(L) { return __ZC(353, 7, this, arguments, new.target); }
function dyeWhKey(L, id) {
if (id === L.layer)
return "layer:" + id;
if (id === "coat" || id === "dress" || id === "robe")
return "top:" + (L.topKind || id);
if (id === "backpack" || id === "cloakhood")
return L.back ? "back:" + L.back : null;
var s = ["neck", "ears", "hands", "waist"];
for (var i = 0; i < s.length; i++)
if (L[s[i]] === id)
return s[i] + ":" + id;
if (id === L.shoeKind)
return "feet:" + id;
if (/^(jeans|jeanscalf|trousersleg|shorts|kilt|kiltunder|skirt|skirtunder)$/.test(id))
return "legs:" + (L.bottomKind || "trousers");
return null;
}
function dyeHdfKey(L, part) { return __ZC(353, 8, this, arguments, new.target); }
var DYE_SIMPLE = { torso: "top", bust: "top", arm: "top", shoulder: "top", collar: "top", coattail: "top", dress: "top", robe: "top",
leg: "legs", hips: "legs", skirt: "legs", shortleg: "legs", kilt: "legs", kiltstripe: "legs",
shoe: "feet", boot: "feet", sole: "feet", sandal: "feet", heel: "feet",
sleeve: "layer", shell: "layer", lapel: "layer", coatskirt: "layer", button: "layer", band: "layer", hoodback: "layer", pocket: "layer", tunic: "layer", tunicbelt: "layer",
apron: "layer", tie: "layer", tieknot: "layer", badge: "layer", kimono: "layer", obi: "layer", kimonosleeve: "layer", breastplate: "layer", pauldron: "layer", armorbelt: "layer",
cape: "back", cloakhood: "back", pack: "back", strap: "back",
hatcap: "hat", brimcap: "hat", crown: "hat", brim: "hat", hood: "hat", beanie: "hat", beaniefold: "hat", bandana: "hat", tophat: "hat", topbrim: "hat", topband: "hat", cbcrown: "hat", cbbrim: "hat",
wizcone: "hat", star: "hat", witchbrim: "hat", helmet: "hat", flower: "hat", tiara: "hat", tiaragem: "hat", crownband: "hat", crownpt: "hat", jewel: "hat", vinering: "hat", vineleaf: "hat", grapes: "hat",
jesterband: "hat", jesterpoint: "hat", jesterbell: "hat",
lens: "face", bridge: "face", shade: "face", facemask: "face", carnivalmask: "face", maskfeather: "face",
scarf: "neck", scarfend: "neck", bow: "neck", chain: "neck", pendant: "neck", rosette: "neck", rosettemid: "neck", rosettetail: "neck", medalband: "neck", medal: "neck",
earring: "ears", satchel: "waist", satchelstrap: "waist", hand: "hands",
vest: "gear", buckle: "gear", cloak: "gear", clasp: "gear" };
function dyeSimpleKey(L, m) { return __ZC(353, 9, this, arguments, new.target); }
function dyeKindOf(mat) { return __ZC(353, 10, this, arguments, new.target); }
function dyeZones(list) { return __ZC(353, 11, this, arguments, new.target); }
function dyeWhPart(L, id, parts, p) {
var key = dyeWhKey(L, id), tri = key && dyeOf(L, key);
if (!tri)
return null;
if (!parts.dyZ) {
parts.dyZ = dyeZones(parts.map(function (q) {
var r = typeof q.c === "function" ? "apron" : String(q.c);
return { sig: r + "/" + q.k, area: q.g ? dyeArea(q.g) : 0, dark: /^dark/.test(r) };
}));
}
var Z = parts.dyZ, sig = (typeof p.c === "function" ? "apron" : String(p.c)) + "/" + p.k, zone = Z.z[sig] || 0;
return { id: key + ":" + zone, sig: tri.join(","), tri: tri, zone: zone, band: zone === 0 ? Z.band : null };
}
function dyeWhMat(dz, kind, skin, geo) {
var weave = null;
if (kind !== "metal" && kind !== "gold" && kind !== "gem" && typeof whMat === "function") {
try {
weave = whMat(kind, 0x808080).map || null;
}
catch (e) { }
}
return dyeMat({ tri: dz.tri, zone: dz.zone, kind: kind, skin: skin, map: weave, band: dz.band ? dyeBandOf(geo, dz.band[0], dz.band[1]) : null });
}
function dyeHdfMesh(mesh, L, part) { return __ZC(353, 12, this, arguments, new.target); }
function dyeMeshes(list, tri) { return __ZC(353, 13, this, arguments, new.target); }
function dyeRestore(g) { if (g)
g.traverse(function (m) { if (m.isMesh && m.userData.dyFrom) {
m.material = m.userData.dyFrom;
delete m.userData.dyFrom;
} }); }
function dyeMount(g, tri) { return __ZC(353, 14, this, arguments, new.target); }
function dyeSimpleFigure(g, L) { return __ZC(353, 15, this, arguments, new.target); }
function dyeHeldKeyNow() { return typeof rlHeldNow === "function" ? rlHeldNow() : null; }
function dyeHeld(m, L, h) {
if (!m || !h)
return;
var tri = dyeOf(L, "held:" + h);
if (!tri)
return;
var list = [];
m.traverse(function (o) { if (o.isMesh)
list.push(o); });
dyeMeshes(list, tri);
}
function dyeHeldBase(h) { return __ZC(353, 16, this, arguments, new.target); }
(function () {
if (typeof hdfAttach === "function") {
var ha = hdfAttach;
hdfAttach = function (E) {
var r = ha.apply(this, arguments);
try {
var L = E && E.spec && E.spec.look;
if (L && L.dye) {
[[E.hatFit, "hat:" + L.hat], [E.glassFit, "face:" + L.face]].forEach(function (q) { var tri = q[0] && dyeOf(L, q[1]); if (!tri)
return; var list = []; q[0].traverse(function (o) { if (o.isMesh)
list.push(o); }); dyeMeshes(list, tri); });
}
}
catch (e) {
if (window.console)
console.warn("[dyes]", e);
}
return r;
};
}
if (typeof hdfDress === "function") {
var hd = hdfDress;
hdfDress = function (mesh, L, part) { var r = hd.apply(this, arguments); try {
if (part && L && L.dye)
dyeHdfMesh(mesh, L, part);
}
catch (e) {
if (window.console)
console.warn("[dyes]", e);
} return r; };
}
if (typeof buildFigure === "function") {
var bf = buildFigure;
buildFigure = function (spec) {
var g = bf.apply(this, arguments);
try {
var L = spec && spec.look;
if (g && L && L.dye) {
dyeSimpleFigure(g, L);
if (/^presence_/.test(String(spec.id || "")) && L.held) {
var m = g.userData.heldMesh;
if (!m && L.heldBase && typeof HELD !== "undefined" && HELD[L.heldBase] && !HELD[L.held] && g.children[0]) {
m = HELD[L.heldBase]();
if (L.heldTint && typeof fgTintHeld === "function")
try {
fgTintHeld(m, L.heldTint[0], L.heldTint[1]);
}
catch (e) { }
m.position.set(-0.3, 0.98, 0.3);
g.children[0].add(m);
g.userData.heldMesh = m;
}
dyeHeld(m, L, L.held);
}
}
else if (g && L && /^presence_/.test(String(spec.id || "")) && L.held && L.heldBase && !g.userData.heldMesh && typeof HELD !== "undefined" && !HELD[L.held] && HELD[L.heldBase] && g.children[0]) {
var m2 = HELD[L.heldBase]();
if (L.heldTint && typeof fgTintHeld === "function")
try {
fgTintHeld(m2, L.heldTint[0], L.heldTint[1]);
}
catch (e) { }
m2.position.set(-0.3, 0.98, 0.3);
g.children[0].add(m2);
g.userData.heldMesh = m2;
}
}
catch (e) {
if (window.console)
console.warn("[dyes]", e);
}
return g;
};
}
if (typeof meLook === "function") {
var ml = meLook;
meLook = function () {
var L = ml.apply(this, arguments);
try {
if (L && L.held && /^fgH\d+$/.test(L.held) && typeof RLF !== "undefined" && RLF.pub) {
var b = dyeHeldBase(L.held);
if (b) {
L.heldBase = b.base;
L.heldTint = [b.tier, b.colour];
}
}
}
catch (e) { }
return L;
};
}
if (typeof showCarried === "function") {
var sc = showCarried;
showCarried = function () { var r = sc.apply(this, arguments); try {
if (typeof carryMesh !== "undefined" && carryMesh) {
var A = ARMS[carrying.archetype];
dyeHeld(carryMesh, meLook(), A && A.held);
}
}
catch (e) { } return r; };
}
if (typeof bwVmSet === "function") {
var vs = bwVmSet;
bwVmSet = function () { var had = typeof BW !== "undefined" && BW.vm; var r = vs.apply(this, arguments); try {
if (BW.vm && BW.vm !== had && BW.vm.userData.m) {
var A = BW_ARMS[BW.vmKey];
dyeHeld(BW.vm.userData.m, meLook(), A && A.held);
}
}
catch (e) { } return r; };
}
if (typeof bwVrHand === "function") {
var vh = bwVrHand;
bwVrHand = function () { var had = typeof BW !== "undefined" && BW.vrHand; var r = vh.apply(this, arguments); try {
if (BW.vrHand && BW.vrHand !== had) {
var A = BW_ARMS[BW.vrHandKey];
dyeHeld(BW.vrHand, meLook(), A && A.held);
}
}
catch (e) { } return r; };
}
})();
(function () {
if (typeof rideTick === "function") {
var rt = rideTick, n = 0;
rideTick = function (dt) {
var r = rt.apply(this, arguments);
try {
if (typeof rideG !== "undefined" && rideG && rideArch && (++n % 20 === 1 || !rideG.userData.dyeSeen)) {
rideG.userData.dyeSeen = 1;
var tri = dyeOf(meLook(), "ride:" + rideArch), c = 0;
rideG.traverse(function (m) { if (m.isMesh)
c++; });
if (tri ? rideG.userData.dyeSig !== tri.join(",") + ":" + c : rideG.userData.dyeTri)
dyeMount(rideG, tri);
}
}
catch (e) { }
return r;
};
}
if (typeof presenceGroupFor === "function") {
var pg = presenceGroupFor;
presenceGroupFor = function (row) {
var g = pg.apply(this, arguments);
try {
var L = row && !row.away && row.look, k = L && L.ride, tri = k && dyeOf(L, "ride:" + k);
if (tri && g) {
var v = g.userData.mount || null;
if (!v)
for (var i = g.children.length - 1; i >= 0; i--) {
if (g.children[i] !== g.userData.tag && !g.children[i].userData.hdfRoot) {
v = g.children[i];
break;
}
}
if (v && v !== g.children[0])
dyeMount(v, tri);
}
}
catch (e) { }
return g;
};
}
if (typeof modelSwap === "function") {
var ms = modelSwap;
modelSwap = function (g) { var r = ms.apply(this, arguments); try {
if (g && g.userData.dyeTri)
dyeMount(g, g.userData.dyeTri);
}
catch (e) { } return r; };
}
})();
function dyeRedrawMine() { return __ZC(353, 17, this, arguments, new.target); }
var DYE_FIELD = { top: "top", layer: "layerColor", legs: "bottom", feet: "shoes", hat: "hatColor", back: "backColor", gear: "gearColor" };
function dyeStart(L, key) {
var slot = key.split(":")[0], f = DYE_FIELD[slot], b = f && dyeOk(L[f]) ? L[f] : slot === "held" ? 0xC0C6CE : 0x7A7A80;
var t = typeof wshade === "function" ? wshade(b, 0.6) : b;
return [b, t, 0xD4AF37];
}
function dyeList(L) { return __ZC(353, 18, this, arguments, new.target); }
function dyeSet(key, zone, col) { return __ZC(353, 19, this, arguments, new.target); }
function dyeTabHtml(L) { return __ZC(353, 20, this, arguments, new.target); }
(function () {
if (typeof renderWardrobe !== "function")
return;
var rw = renderWardrobe;
renderWardrobe = function () {
var r = rw.apply(this, arguments);
try {
var w = document.getElementById("me-ward"), bar = w && w.querySelector("[data-wtab]");
if (!bar)
return r;
bar = bar.parentNode;
bar.style.flexWrap = "wrap";
var b = document.createElement("button");
b.className = "btn";
b.setAttribute("data-wtab", "dyes");
b.textContent = "🎨 Dyes";
if (WARD_TAB === "dyes")
b.style.cssText = "color:var(--bone,#ddd);border-color:var(--bone,#ddd)";
bar.appendChild(b);
b.onclick = function () { WARD_TAB = "dyes"; renderWardrobe(); };
if (WARD_TAB !== "dyes")
return r;
var box = document.createElement("div");
box.id = "dye-tab";
box.innerHTML = dyeTabHtml(meLook());
bar.parentNode.insertBefore(box, bar.nextSibling);
Array.prototype.forEach.call(box.querySelectorAll("[data-dyp]"), function (x) { x.onclick = function () { DYE.sel = x.getAttribute("data-dyp"); renderWardrobe(); }; });
Array.prototype.forEach.call(box.querySelectorAll("[data-dyz]"), function (x) { x.onclick = function () { DYE.zone = +x.getAttribute("data-dyz"); renderWardrobe(); }; });
Array.prototype.forEach.call(box.querySelectorAll("[data-dyc]"), function (x) { x.onclick = function () { dyeSet(DYE.sel, DYE.zone || 0, +x.getAttribute("data-dyc")); renderWardrobe(); }; });
Array.prototype.forEach.call(box.querySelectorAll("[data-dyk]"), function (x) { x.onchange = function () { dyeSet(DYE.sel, DYE.zone || 0, parseInt(x.value.slice(1), 16)); renderWardrobe(); }; });
Array.prototype.forEach.call(box.querySelectorAll("[data-dyr]"), function (x) { x.onclick = function () { dyeSet(DYE.sel, null); renderWardrobe(); }; });
}
catch (e) {
if (window.console)
console.warn("[dyes]", e);
}
return r;
};
})();
(function () {
if (typeof vrpMenuItems !== "function")
return;
var vm = vrpMenuItems;
function back() { return { t: "◀ All of the menu", keep: true, run: function () { vrpMenuSection(null); } }; }
function pieces() {
var L = meLook(), it = [back()];
dyeList(L).forEach(function (p) {
var tri = dyeOf(L, p.key);
it.push({ t: "🎨 " + p.label + (tri ? "" : " (its own colours)") + " ▸", keep: true, run: function () { vrpMenuSection({ t: p.label, items: zones(p) }); } });
});
return it;
}
function zones(p) {
var L = meLook(), tri = dyeOf(L, p.key) || dyeStart(L, p.key);
var it = [{ t: "◀ Your gear", keep: true, run: function () { vrpMenuSection({ t: "Dye your gear", items: pieces() }); } }];
DYE_ZONES.forEach(function (n, z) {
var i = DYE.pal.indexOf(tri[z]);
it.push({ t: n + ": " + (i >= 0 ? DYE_PAL_NAMES[i] : dyeHex(tri[z])) + " ▸", keep: true, run: function () { vrpMenuSection({ t: p.label + ": " + n.toLowerCase(), items: colours(p, z) }); } });
});
if (dyeOf(L, p.key))
it.push({ t: "↺ Back to its own colours", keep: true, run: function () { dyeSet(p.key, null); vrpMenuSection({ t: p.label, items: zones(p) }); } });
return it;
}
function colours(p, z) {
var L = meLook(), cur = (dyeOf(L, p.key) || dyeStart(L, p.key))[z];
var it = [{ t: "◀ " + p.label, keep: true, run: function () { vrpMenuSection({ t: p.label, items: zones(p) }); } }];
DYE.pal.forEach(function (c, i) { it.push({ t: (c === cur ? "✓ " : "   ") + DYE_PAL_NAMES[i], keep: true, run: function () { dyeSet(p.key, z, c); vrpMenuSection({ t: p.label, items: zones(p) }); } }); });
return it;
}
vrpMenuItems = function () {
var items = vm.apply(this, arguments);
try {
items.push({ t: "🎨 Dye your gear ▸", keep: true, run: function () { vrpMenuSection({ t: "Dye your gear", items: pieces() }); } });
}
catch (e) { }
return items;
};
})();
