/* SomnuMatrix (c) 2026 Thaddeus (obsidianmoontemple). All rights reserved. Proprietary: no copying, hosting or reuse without written permission. */
"use strict";
var REAL = { on: false, u: { top: { value: new THREE.Color(0x8FB0D8) }, low: { value: new THREE.Color(0x6A6458) }, spec: { value: 0.55 }, bump: { value: 0.9 }, time: { value: 0 } }, n: 0, skyDone: false };
function realWanted() {
if (window.REAL_OFF)
return false;
if (typeof GFX_MAX === "undefined" || !GFX_MAX)
return false;
if (typeof LITE !== "undefined" && LITE)
return false;
if (typeof GFX_STYLE !== "undefined" && GFX_STYLE === "stylized")
return false;
if (typeof gfxWanted === "function" && gfxWanted() === "standard")
return false;
return true;
}
REAL.on = realWanted();
var REAL_PARS = [
"uniform vec3 realTop; uniform vec3 realLow; uniform float realSpec; uniform float realBump; uniform float realTime;",
"float realLum( vec3 c ){ return dot( c, vec3( 0.299, 0.587, 0.114 ) ); }",
"float realH( vec2 p ){ return fract( sin( dot( p, vec2( 127.1, 311.7 ) ) )*43758.5453 ); }",
"float realVN( vec2 p ){ vec2 i=floor( p ), f=fract( p ); f=f*f*( 3.0-2.0*f ); return mix( mix( realH( i ), realH( i+vec2( 1.0, 0.0 ) ), f.x ), mix( realH( i+vec2( 0.0, 1.0 ) ), realH( i+vec2( 1.0, 1.0 ) ), f.x ), f.y ); }",
"float realGrain( vec2 p ){ return realVN( p )*0.6+realVN( p*2.7+3.1 )*0.4; }",
"vec3 realPerturb( vec3 sp, vec3 sn, vec2 dh, float fd ){",
"  vec3 sx=dFdx( sp ), sy=dFdy( sp ); vec3 r1=cross( sy, sn ), r2=cross( sn, sx );",
"  float det=dot( sx, r1 )*fd; vec3 g=sign( det )*( dh.x*r1+dh.y*r2 );",
"  vec3 v=abs( det )*sn-g; return dot( v, v )>1e-12?normalize( v ):sn; }",
"vec3 realPerturbN( vec3 ep, vec3 N, vec3 mapN, float fd, vec2 uv ){",
"  vec3 q0=dFdx( ep ), q1=dFdy( ep ); vec2 st0=dFdx( uv ), st1=dFdy( uv );",
"  vec3 q1p=cross( q1, N ), q0p=cross( N, q0 ); vec3 T=q1p*st0.x+q0p*st1.x, B=q1p*st0.y+q0p*st1.y;",
"  float det=max( dot( T, T ), dot( B, B ) ), sc=( det==0.0 )?0.0:fd*inversesqrt( det );",
"  vec3 v=T*( mapN.x*sc )+B*( mapN.y*sc )+N*mapN.z; return dot( v, v )>1e-12?normalize( v ):N; }"
].join("\n");
var REAL_DYE = [
"#if defined( USE_MAP ) && defined( REAL_DYE )",
"{ vec4 tx=sRGBToLinear( texture2D( realDyeMap, vUv ) ); vec3 g=sqrt( tx.rgb );",
"  float mx=max( g.r, max( g.g, g.b ) ), sat=mx>0.0?( mx-min( g.r, min( g.g, g.b ) ) )/mx:0.0;",
"  diffuseColor.rgb=mix( tx.rgb, diffuseColor.rgb, smoothstep( 0.05, 0.12, sat ) ); }",
"#endif"
].join("\n");
var REAL_WEAVE = [
"#if defined( USE_MAP ) && defined( REAL_SOFT )",
"{ vec2 ts=vec2( 512.0 );",
"  #if __VERSION__ >= 300",
"  ts=vec2( textureSize( map, 0 ) );",
"  #endif",
"  float near=1.0-smoothstep( 2.0, 7.0, length( vViewPosition ) );",
"  #ifdef REAL_SKIN",
"  vec2 sp=vUv*ts*0.8; float sk=realVN( sp )*0.7+realVN( sp*2.3 )*0.3;",
"  float sv=near*( 1.0-smoothstep( 0.25, 0.6, fwidth( sp.x )+fwidth( sp.y ) ) );",
"  diffuseColor.rgb*=1.0+( sk-0.5 )*0.08*sv;",
"  normal=realPerturb( -vViewPosition, normal, vec2( dFdx( sk ), dFdy( sk ) )*0.03*sv, faceDirection );",
"  #else",
"  vec2 wp=vUv*ts*3.0*3.14159;",
"  float wa=sin( wp.x )*0.5+0.5, wb=sin( wp.y )*0.5+0.5, ck=step( 0.0, sin( wp.x*0.5 )*sin( wp.y*0.5 ) );",
"  float wv=mix( wa, wb, ck )+( realVN( vUv*ts*0.9 )-0.5 )*0.35;",
"  float fw=fwidth( wp.x )+fwidth( wp.y ), vis=near*( 1.0-smoothstep( 0.6, 1.6, fw ) );",
"  diffuseColor.rgb*=1.0+( wv-0.55 )*0.32*vis;",
"  normal=realPerturb( -vViewPosition, normal, vec2( dFdx( wv ), dFdy( wv ) )*0.12*vis, faceDirection );",
"  #endif",
"}",
"#endif"
].join("\n");
var REAL_TILE = [
"#ifdef REAL_WATER",
"diffuseColor.rgb*=vec3( 0.78, 0.86, 0.95 );",
"#endif",
"#if defined( USE_MAP ) && defined( REAL_TILE )",
"{ vec3 mc=texture2D( map, vUv*0.117+vec2( 0.31, 0.73 ) ).rgb; vec3 av=texture2D( map, vUv, 9.0 ).rgb;",
"  float k=realLum( mc )/max( realLum( av ), 0.02 ); diffuseColor.rgb*=clamp( mix( 1.0, k, 0.5 ), 0.72, 1.3 ); }",
"#endif"
].join("\n");
var REAL_BUMP = [
"#if defined( USE_MAP ) && defined( REAL_NR )",
"{ vec2 nxy=realNRv.rg*2.0-1.0; float nf=1.0-smoothstep( 12.0, 45.0, length( vViewPosition ) );",
"  vec3 mapN=vec3( nxy*realNRs*1.2*nf, sqrt( max( 1.0-dot( nxy, nxy ), 0.0 ) ) );",
"  normal=realPerturbN( -vViewPosition, normal, normalize( mapN ), faceDirection, vUv ); }",
"#endif",
"#if defined( USE_MAP ) && !defined( USE_NORMALMAP ) && !defined( USE_BUMPMAP ) && !defined( REAL_SOFT )",
"{ vec2 ux=dFdx( vUv ), uy=dFdy( vUv );",
"  #if __VERSION__ >= 300",
"  vec2 ts=vec2( textureSize( map, 0 ) );",
"  #else",
"  vec2 ts=vec2( 512.0 );",
"  #endif",
"  float dens=max( length( ux*ts ), length( uy*ts ) );",
"  float fade=1.0-smoothstep( 35.0, 120.0, length( vViewPosition ) );",
"  /* only where the picture's own pixels are as big as the screen's or bigger: further off, many of its pixels fall in",
"     one of the screen's, their differences jump about as you move and the ground flashed (13 Nov 2026, NO STROBE) */",
"  float own=smoothstep( 0.35, 1.2, dens )*( 1.0-smoothstep( 0.9, 1.8, dens ) );",
"  float h0=realLum( texture2D( map, vUv ).rgb );",
"  float hx=realLum( texture2D( map, vUv+ux ).rgb ), hy=realLum( texture2D( map, vUv+uy ).rgb );",
"  vec2 dh=vec2( hx-h0, hy-h0 )*realBump*own;",
"  vec2 gp=vUv*ts*3.0; float gn=realGrain( gp );",
"  float close=( 1.0-smoothstep( 0.05, 0.14, dens ) )*( 1.0-smoothstep( 4.0, 18.0, length( vViewPosition ) ) );",
"  dh+=vec2( dFdx( gn ), dFdy( gn ) )*0.35*close;",
"  diffuseColor.rgb*=1.0+( gn-0.5 )*0.16*close;",
"  normal=realPerturb( -vViewPosition, normal, dh*fade, faceDirection ); }",
"#endif"
].join("\n");
var REAL_WATER = [
"#if defined( REAL_WATER ) && defined( USE_NORMALMAP ) && defined( TANGENTSPACE_NORMALMAP )",
"{ vec3 n1=texture2D( normalMap, vUv+realTime*vec2( 0.011, 0.006 ) ).xyz*2.0-1.0;",
"  vec3 n2=texture2D( normalMap, vUv*0.41+vec2( 0.37, 0.11 )-realTime*vec2( 0.007, -0.009 ) ).xyz*2.0-1.0;",
"  float wd=1.0-smoothstep( 25.0, 260.0, length( vViewPosition ) );",
"  vec3 mapN=normalize( vec3( ( n1.xy+n2.xy )*normalScale*( 0.25+0.75*wd ), max( n1.z*n2.z, 0.2 ) ) );",
"  normal=perturbNormal2Arb( -vViewPosition, normal, mapN, faceDirection ); }",
"#else",
"#include <normal_fragment_maps>",
"#endif"
].join("\n");
var REAL_SWAY = [
"#include <begin_vertex>",
"{ float sw=realTime*1.1+position.x*0.35+position.z*0.27; float a=0.05*clamp( length( position ), 0.0, 4.0 );",
"  transformed.x+=sin( sw )*a; transformed.z+=sin( sw*0.83+1.7 )*a*0.8; transformed.y+=sin( sw*1.3 )*a*0.25; }"
].join("\n");
var REAL_LEAFLIGHT = [
"#if defined( REAL_LEAF ) && NUM_DIR_LIGHTS > 0",
"{ float bl=max( dot( -geometry.viewDir, directionalLights[ 0 ].direction ), 0.0 );",
"  reflectedLight.directDiffuse+=diffuseColor.rgb*directionalLights[ 0 ].color*( pow( bl, 3.0 )*0.55+0.08 ); }",
"#endif"
].join("\n");
var REAL_FLESH = [
"#if defined( REAL_SKIN ) && NUM_DIR_LIGHTS > 0",
"{ float nl=dot( geometry.normal, directionalLights[ 0 ].direction );",
"  float wr=max( ( nl+0.5 )/1.5, 0.0 )-max( nl, 0.0 );",
"  reflectedLight.directDiffuse+=directionalLights[ 0 ].color*diffuseColor.rgb*vec3( 1.0, 0.4, 0.28 )*wr*0.6;",
"  float rim=pow( 1.0-max( dot( geometry.normal, geometry.viewDir ), 0.0 ), 3.0 );",
"  reflectedLight.indirectDiffuse+=realTop*diffuseColor.rgb*rim*0.35; }",
"#elif defined( REAL_SOFT )",
"{ float rim=pow( 1.0-max( dot( geometry.normal, geometry.viewDir ), 0.0 ), 4.0 );",
"  reflectedLight.indirectDiffuse+=( realTop*0.5+diffuseColor.rgb*0.5 )*rim*0.35; }",
"#endif",
"#if defined( REAL_FUR ) && NUM_DIR_LIGHTS > 0",
"{ float nl=dot( geometry.normal, directionalLights[ 0 ].direction );",
"  float wr=max( ( nl+0.45 )/1.45, 0.0 )-max( nl, 0.0 );",
"  reflectedLight.directDiffuse+=directionalLights[ 0 ].color*diffuseColor.rgb*wr*0.7;",
"  float rim=pow( 1.0-max( dot( geometry.normal, geometry.viewDir ), 0.0 ), 2.5 );",
"  reflectedLight.indirectDiffuse+=( realTop*0.45+diffuseColor.rgb*1.2 )*rim*0.55;",
"  reflectedLight.directSpecular*=0.25; }",
"#endif",
"#if defined( REAL_HAIR ) && NUM_DIR_LIGHTS > 0",
"{ vec3 up=normalize( ( viewMatrix*vec4( 0.0, 1.0, 0.0, 0.0 ) ).xyz ); vec3 T=normalize( up-geometry.normal*dot( geometry.normal, up )+1e-4 );",
"  vec3 L=directionalLights[ 0 ].direction, H=normalize( L+geometry.viewDir );",
"  float th=dot( T, H ), s1=sqrt( max( 1.0-th*th, 0.0 ) ); float th2=dot( normalize( T+geometry.normal*0.25 ), H ), s2=sqrt( max( 1.0-th2*th2, 0.0 ) );",
"  float vis=clamp( dot( geometry.normal, L )*0.7+0.3, 0.0, 1.0 );",
"  reflectedLight.directSpecular+=directionalLights[ 0 ].color*( pow( s1, 90.0 )*0.35+pow( s2, 24.0 )*0.3*diffuseColor.rgb*2.0 )*vis; }",
"#endif"
].join("\n");
var REAL_ROUGH = [
"#include <roughnessmap_fragment>",
"#ifdef REAL_NR",
"vec4 realNRv=texture2D( realNR, vUv );",
"roughnessFactor=clamp( roughnessFactor*mix( 1.0, realNRv.b*2.0, 0.35 ), 0.3, 1.0 );",
"#endif"
].join("\n");
var REAL_NR = { tex: {}, str: { brick: 1.0, stone: 1.0, wood: 0.6, siding: 0.8, metalroof: 0.9, shingle: 1.0, tile: 1.0, slate: 1.0, bark: 1.2, paving: 1.0 } };
function realPhotoKind(m) { var c = m && m.map && m.map.image; return (c && c.__pht && REAL_NR.str[c.__pht] !== undefined) ? c.__pht : ""; }
function realNRTex(k) {
var T = REAL_NR.tex[k];
if (T)
return T.ready ? T : null;
T = REAL_NR.tex[k] = new THREE.TextureLoader().load("assets/textures/pbr/" + k + "-nr" + ((typeof PHOTO_TEX !== "undefined" && PHOTO_TEX.hi) ? "-1k" : "") + ".jpg", function () { T.ready = 1; realRefreshKind(k); });
T.wrapS = T.wrapT = THREE.RepeatWrapping;
T.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy ? renderer.capabilities.getMaxAnisotropy() : 1);
return null;
}
function realRefreshKind(k) {
if (typeof scene === "undefined" || !scene)
return;
var seen = new Set();
scene.traverse(function (o) {
var ms = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : [];
ms.forEach(function (m) { if (m && !seen.has(m) && m.__real && realPhotoKind(m) === k) {
seen.add(m);
m.needsUpdate = true;
} });
});
}
if (typeof phtApply === "function") {
var realPhtApply = phtApply;
phtApply = function (k) { var r = realPhtApply.apply(this, arguments); try {
if (REAL.on && REAL_NR.str[k] !== undefined) {
if (realNRTex(k))
realRefreshKind(k);
}
}
catch (e) { } return r; };
}
var REAL_WET_KINDS = { asphalt: 1, paving: 1, stone: 1, concrete: 1, marble: 1, floortile: 1, tile: 1, brick: 1, slate: 1 };
var REAL_WET = [
"float realWetK=0.0;",
"#if defined( REAL_ENVMAP ) && defined( REAL_WETOK ) && defined( USE_MAP ) && !defined( REAL_SOFT ) && !defined( REAL_WATER ) && !defined( FLAT_SHADED )",
"if( realWet>0.001 ){",
"  vec3 ng=normalize( vNormal )*faceDirection; vec3 wn=inverseTransformDirection( ng, viewMatrix );",
"  float up=smoothstep( 0.82, 0.97, wn.y );",
"  float pd=smoothstep( 0.5, 0.66, realVN( vUv*0.9+vec2( 3.1, 7.7 ) )*0.65+realVN( vUv*2.3 )*0.35 );",
"  float wk=realWet*up;",
"  diffuseColor.rgb*=1.0-0.45*wk-0.25*wk*pd;",
"  roughnessFactor=mix( roughnessFactor, mix( 0.35, 0.03, pd ), wk );",
"  normal=normalize( mix( normal, ng, wk*pd ) );",
"  realWetK=wk*( 0.4+0.6*pd );",
"}",
"#endif",
"#include <lights_physical_fragment>"
].join("\n");
function realIsLeaf(m) { return !!(m && m.map && typeof LEAF !== "undefined" && LEAF.tex && m.map === LEAF.tex); }
var REAL_SKY = [
"{ vec3 rv=inverseTransformDirection( reflect( -geometry.viewDir, geometry.normal ), viewMatrix );",
"  #ifdef REAL_ENVMAP",
"  vec3 ev=textureCubeUV( realEnv, rv, material.specularRoughness ).rgb*realEnvK;",
"  float fr=0.04+0.96*pow( 1.0-max( dot( geometry.normal, geometry.viewDir ), 0.0 ), 5.0 );",
"  #ifdef REAL_WATER",
"  radiance+=ev*0.9;",
"  #elif defined( REAL_GLOSS )",
"  radiance+=ev*REAL_GLOSS;",
"  #else",
"  vec3 gr=mix( realLow, realTop, smoothstep( -0.25, 0.55, rv.y ) );",
"  radiance+=gr*realSpec*( 1.0-realWetK )+ev*realWetK*( 0.3+2.2*fr );",
"  #endif",
"  #else",
"  #ifdef REAL_WATER",
"  radiance+=mix( realLow, realTop, smoothstep( -0.25, 0.55, rv.y ) )*0.45;",
"  #elif defined( REAL_GLOSS )",
"  radiance+=mix( realLow, realTop, smoothstep( -0.25, 0.55, rv.y ) )*REAL_GLOSS;",
"  #else",
"  radiance+=mix( realLow, realTop, smoothstep( -0.25, 0.55, rv.y ) )*realSpec;",
"  #endif",
"  #endif",
"}",
"#include <lights_fragment_end>"
].join("\n") + "\n" + REAL_LEAFLIGHT + "\n" + REAL_FLESH;
function realShader(sh, mat) {
if (!REAL.on)
return;
var P = THREE.ShaderLib.physical, std = !!mat.isMeshStandardMaterial;
if (!std)
sh.vertexShader = P.vertexShader;
var f = std ? sh.fragmentShader : P.fragmentShader;
var K = mat.userData && mat.userData.realKind, G = K ? REAL_KINDS[K] : null;
if (G && G.gloss)
f = "#define REAL_GLOSS " + G.gloss.toFixed(2) + "\n" + f;
var leaf = realIsLeaf(mat);
if (leaf) {
f = "#define REAL_LEAF\n" + f;
sh.vertexShader = ("#define REAL_LEAF\nuniform float realTime;\n" + sh.vertexShader).replace("#include <begin_vertex>", REAL_SWAY);
}
if (mat.userData && mat.userData.realFur)
f = "#define REAL_FUR\n" + f;
if (mat.userData && mat.userData.realHair)
f = "#define REAL_HAIR\n" + f;
var soft = !!(mat.userData && mat.userData.realSoft);
if (soft)
f = "#define REAL_SOFT\n" + (mat.userData.realSkin ? "#define REAL_SKIN\n" : "") + f;
else if (mat.map && mat.map.wrapS === THREE.RepeatWrapping)
f = "#define REAL_TILE\n" + f;
var dye = mat.userData && mat.userData.realDye;
if (dye && dye.map) {
f = "#define REAL_DYE\nuniform sampler2D realDyeMap;\n" + f;
sh.uniforms.realDyeMap = { value: dye.map };
}
var water = !!(mat.userData && mat.userData.realWater);
if (water)
f = "#define REAL_WATER\n" + f;
var pk = (!soft && !water && !window.NR_OFF) ? realPhotoKind(mat) : "", NT = pk ? realNRTex(pk) : null;
if (NT) {
f = "#define REAL_NR\nuniform sampler2D realNR; uniform float realNRs;\n" + f;
sh.uniforms.realNR = { value: NT };
sh.uniforms.realNRs = { value: REAL_NR.str[pk] };
}
var env = (typeof REAL_ENV !== "undefined" && REAL_ENV.ok && REAL_ENV.u.env.value && !mat.envMap) ? REAL_ENV : null;
var mc = mat.map && mat.map.image, wk = mc && mc.__pht;
if (env && wk && REAL_WET_KINDS[wk])
f = "#define REAL_WETOK\n" + f;
if (env) {
f = "#define REAL_ENVMAP\nuniform sampler2D realEnv; uniform float realEnvK; uniform float realWet;\n" + f;
if (!/ENVMAP_TYPE_CUBE_UV/.test(f))
f = f.replace("#include <common>", "#include <common>\n#ifndef ENVMAP_TYPE_CUBE_UV\n#define ENVMAP_TYPE_CUBE_UV\n#define REAL_CUBE_TMP\n#endif\n#ifndef USE_ENVMAP\nvec4 envMapTexelToLinear( vec4 v ){ return " + (env.dec ? env.dec + "( v )" : "v") + "; }\n#endif\n#ifndef USE_ENVMAP\n#include <cube_uv_reflection_fragment>\n#undef r0\n#undef v0\n#undef m0\n#undef r1\n#undef v1\n#undef m1\n#undef r4\n#undef v4\n#undef m4\n#undef r5\n#undef v5\n#undef m5\n#undef r6\n#undef v6\n#undef m6\n#endif\n#ifdef REAL_CUBE_TMP\n#undef ENVMAP_TYPE_CUBE_UV\n#endif");
sh.uniforms.realEnv = env.u.env;
sh.uniforms.realEnvK = env.u.envK;
sh.uniforms.realWet = env.u.wet;
}
else
f = "uniform float realWet;\n" + f;
f = f.replace("#include <common>", "#include <common>\n" + REAL_PARS)
.replace("#include <map_fragment>", "#include <map_fragment>\n" + REAL_DYE + "\n" + REAL_TILE)
.replace("#include <normal_fragment_maps>", REAL_WATER + "\n" + REAL_BUMP + "\n" + REAL_WEAVE)
.replace("#include <roughnessmap_fragment>", REAL_ROUGH)
.replace("#include <lights_physical_fragment>", REAL_WET)
.replace("#include <lights_fragment_end>", REAL_SKY);
sh.fragmentShader = f;
var r = 0.86;
if (mat.isMeshPhongMaterial) {
var s = mat.shininess === undefined ? 30 : mat.shininess;
r = Math.max(0.22, Math.min(0.9, 1.05 - Math.sqrt(s / 140)));
}
if (mat.userData && mat.userData.realRough !== undefined)
r = mat.userData.realRough;
if (water)
r = 0.16;
if (soft && mat.userData.realSkin)
r = 0.5;
if (G) {
r = G.rough;
}
if (!std) {
sh.uniforms.roughness = { value: r };
sh.uniforms.metalness = { value: G ? G.metal : 0 };
}
sh.uniforms.realTop = REAL.u.top;
sh.uniforms.realLow = REAL.u.low;
sh.uniforms.realSpec = REAL.u.spec;
sh.uniforms.realBump = REAL.u.bump;
sh.uniforms.realTime = REAL.u.time;
}
var REAL_KINDS = { eye: { rough: 0.12, metal: 0, gloss: 0.45 }, paint: { rough: 0.24, metal: 0, gloss: 1.15 }, metal: { rough: 0.32, metal: 0.7, gloss: 1.3 }, rubber: { rough: 0.92, metal: 0, gloss: 0.15 }, wood: { rough: 0.6, metal: 0, gloss: 0.5 } };
var REAL_HSL = { h: 0, s: 0, l: 0 };
function realKindOfColour(c) {
c.getHSL(REAL_HSL);
if (REAL_HSL.l < 0.09)
return "rubber";
if (REAL_HSL.s < 0.12)
return "metal";
if (REAL_HSL.h > 0.03 && REAL_HSL.h < 0.12 && REAL_HSL.s < 0.6 && REAL_HSL.l < 0.42)
return "wood";
return "paint";
}
function realDressVehicle(g) { return __ZC(423, 0, this, arguments, new.target); }
if (typeof addMesh === "function") {
var realAddMesh = addMesh;
addMesh = function (spec) {
var r = realAddMesh.apply(this, arguments);
try {
if (spec && typeof meshes !== "undefined" && meshes[spec.id]) {
var d = (typeof KIT !== "undefined") ? KIT[spec.archetype] : null;
if ((d && d.cat === "vehicle") || (typeof VEH !== "undefined" && VEH[spec.archetype])) {
meshes[spec.id].traverse(function (o) { var m = o.material; if (m && !Array.isArray(m) && m.userData && !m.map)
m.userData.noPhoto = 1; });
if (REAL.on)
realDressVehicle(meshes[spec.id]);
}
}
}
catch (e) { }
return r;
};
}
var REAL_DEFKEY = THREE.Material.prototype.customProgramCacheKey, REAL_DEFOBC = THREE.Material.prototype.onBeforeCompile;
function realPatch(mat) {
if (mat.__real)
return;
mat.__real = 1;
if (!(mat.isMeshLambertMaterial || mat.isMeshPhongMaterial || mat.isMeshStandardMaterial) || mat.isShaderMaterial)
return;
if (mat.userData && mat.userData.noReal)
return;
if (mat.envMap || mat.wireframe)
return;
var orig = mat.onBeforeCompile, has = orig && orig !== REAL_DEFOBC, ok = mat.customProgramCacheKey;
var mine = function (sh, r) { realShader(sh, this); if (has)
orig.call(this, sh, r); };
mat.onBeforeCompile = mine;
mat.customProgramCacheKey = function () {
if (this.onBeforeCompile !== mine)
return ok === REAL_DEFKEY ? this.onBeforeCompile.toString() : ok.call(this);
var t = ((this.map && this.map.wrapS === THREE.RepeatWrapping) ? "t" : "") + ((this.userData && this.userData.realWater) ? "w" : "") + ((this.userData && this.userData.realKind) || "") + (realIsLeaf(this) ? "L" : "") + ((this.userData && this.userData.realSoft) ? "s" : "") + ((this.userData && this.userData.realSkin) ? "k" : "") + ((this.userData && this.userData.realDye) ? "d" : "") + ((this.userData && this.userData.realFur) ? "f" : "") + ((this.userData && this.userData.realHair) ? "h" : "") + ((typeof REAL_ENV !== "undefined" && REAL_ENV.ok) ? "e" : "") + ((this.map && this.map.image && REAL_WET_KINDS[this.map.image.__pht]) ? "W" : "") + (function (m) { var k = realPhotoKind(m); return k && REAL_NR.tex[k] && REAL_NR.tex[k].ready ? "p" + k : ""; })(this);
if (!REAL.on)
return ok === REAL_DEFKEY ? (has ? orig.toString() : "") : ok.call(this);
return "real1|" + t + "|" + (ok === REAL_DEFKEY ? (has ? orig.toString() : "") : ok.call(this));
};
mat.needsUpdate = true;
REAL.n++;
}
(function () {
if (!REAL.on || !THREE.Object3D)
return;
var ob = THREE.Object3D.prototype.onBeforeRender;
THREE.Object3D.prototype.onBeforeRender = function (r, s, c, g, mat) {
if (mat && !mat.__real && REAL.on) {
if (mat.userData && mat.map && realOnBody(this))
mat.userData.realSoft = 1;
if (typeof crsTag === "function" && !window.CREATURE_OFF)
crsTag(mat);
realPatch(mat);
}
return ob.apply(this, arguments);
};
})();
function realOnBody(o) {
if (o.isSkinnedMesh)
return true;
for (var p = o.parent, k = 0; p && k < 6; p = p.parent, k++) {
var ch = p.children;
for (var i = 0; i < ch.length && i < 40; i++)
if (ch[i].isSkinnedMesh)
return true;
if (p.userData && p.userData.id)
break;
}
return false;
}
function realTick() {
if (!REAL.on)
return;
if (typeof hemi !== "undefined" && hemi) {
var k = Math.min(1.4, hemi.intensity);
REAL.u.top.value.copy(hemi.color).multiplyScalar(k);
REAL.u.low.value.copy(hemi.groundColor).multiplyScalar(k * 0.8);
}
var inside = !!(typeof store !== "undefined" && store && store.inside);
REAL.u.spec.value = inside ? 0.3 : 0.55;
REAL.u.time.value = (performance.now() / 1000) % 3600;
}
if (typeof wavesOn === "function") {
var realWavesOn = wavesOn;
wavesOn = function (mesh) {
var r = realWavesOn.apply(this, arguments);
try {
if (mesh && mesh.material && mesh.material.userData) {
mesh.material.userData.realWater = 1;
mesh.material.needsUpdate = true;
}
}
catch (e) { }
return r;
};
}
var REAL_WD = { t: [], at: 0, since: 0, off: false };
function realWatch(now) {
if (!REAL.on || REAL_WD.off || (typeof navigator !== "undefined" && navigator.webdriver))
return;
if (document.hidden) {
REAL_WD.t.length = 0;
REAL_WD.at = 0;
return;
}
if (!REAL_WD.since)
REAL_WD.since = now;
var w = (typeof WLD !== "undefined" && WLD.on) || "city";
if (w !== REAL_WD.where) {
REAL_WD.where = w;
REAL_WD.since = now;
REAL_WD.t.length = 0;
}
if (REAL_WD.at) {
var d = now - REAL_WD.at;
if (d < 1000)
REAL_WD.t.push(d);
}
REAL_WD.at = now;
if (now - REAL_WD.since < 20000 || REAL_WD.t.length < 300)
return;
var a = REAL_WD.t.slice(-300).sort(function (x, y) { return x - y; }), med = a[150];
if (REAL_WD.t.length > 600)
REAL_WD.t.splice(0, 300);
if (med > 32) {
REAL_WD.off = true;
REAL.on = false;
scene.traverse(function (o) { var m = o.material; if (!m)
return; (Array.isArray(m) ? m : [m]).forEach(function (x) { if (x.__real)
x.needsUpdate = true; }); });
if (window.console)
console.info("real-look: this computer is drawing slowly (" + Math.round(med) + " ms a frame); plain surfaces from now on");
}
}
var REAL_NOCLOUD = { space: 1, station: 1, shuttle: 1, surface: 1, underdark: 1, mmin: 1, lounge: 1, casino: 1, race: 1 };
var REAL_SKYU = { time: { value: 0 }, cover: { value: 0.5 }, oct: { value: 5 } };
function realSkyPatch() {
if (window.REAL_OFF || typeof sky === "undefined" || !sky || !sky.material || !sky.material.uniforms)
return;
if (!LOOK.skyDone && !(typeof LOOK_OFF !== "undefined" && LOOK_OFF))
return;
REAL.skyDone = true;
var m = sky.material, u = m.uniforms;
if (!u.sunDir) {
u.sunDir = { value: new THREE.Vector3(0, 1, 0) };
u.sunCol = { value: new THREE.Color(0xFFD9A0) };
u.glow = { value: 0 };
}
u.cTime = REAL_SKYU.time;
u.cCover = REAL_SKYU.cover;
u.cOct = REAL_SKYU.oct;
var lite = (typeof GFX_PHONE !== "undefined" && GFX_PHONE) || (typeof LITE !== "undefined" && LITE);
m.fragmentShader = [(typeof LOOK_FOG_KNEE !== "undefined" ? LOOK_FOG_KNEE : "vec3 lookFogKnee( vec3 c ){ return c; }"),
"uniform vec3 top; uniform vec3 low; uniform vec3 sunDir; uniform vec3 sunCol; uniform float glow; uniform float cTime; uniform float cCover; varying vec3 vP;",
"float hsh( vec2 p ){ return fract( sin( dot( p, vec2( 127.1, 311.7 ) ) )*43758.5453 ); }",
"float vn( vec2 p ){ vec2 i=floor( p ), f=fract( p ); f=f*f*( 3.0-2.0*f );",
"  return mix( mix( hsh( i ), hsh( i+vec2( 1.0, 0.0 ) ), f.x ), mix( hsh( i+vec2( 0.0, 1.0 ) ), hsh( i+vec2( 1.0, 1.0 ) ), f.x ), f.y ); }",
"float fbm( vec2 p ){ float a=0.5, s=0.0; for( int i=0; i<" + (lite ? 3 : 5) + "; i++ ){ s+=a*vn( p ); p=p*2.03+vec2( 17.1, 9.2 ); a*=0.5; } return s; }",
"void main(){",
"  vec3 d=normalize( vP ); float h=clamp( d.y, 0.0, 1.0 );",
"  vec3 col=mix( low, top, pow( h, 0.5 ) );",
"  col=mix( col, top*0.82, smoothstep( 0.35, 1.0, h )*0.5 );",
"  col=mix( col, low*1.06+0.015, ( 1.0-smoothstep( 0.0, 0.16, h ) )*0.55 );",
"  vec3 sd=normalize( sunDir ); float s=max( dot( d, sd ), 0.0 );",
"  col+=sunCol*( pow( s, 6.0 )*0.22+pow( s, 48.0 )*0.25 )*glow*( 1.0-h*0.5 );",
"  if( cCover>0.01 && d.y>0.015 ){",
"    vec2 cp=d.xz/( d.y+0.08 )*1.6+vec2( cTime*0.012, cTime*0.004 );",
"    float n=fbm( cp ); float n2=fbm( cp*0.5+vec2( 3.7, 1.3 ) );",
"    float c=smoothstep( 1.0-cCover*0.95, 1.08-cCover*0.6, n*0.65+n2*0.45 );",
"    float th=fbm( cp+sd.xz*0.35 );",
"    float lum=dot( top, vec3( 0.3, 0.59, 0.11 ) );",
"    vec3 lit=mix( low, vec3( 1.0 ), 0.55 )*( 0.45+0.75*clamp( lum*2.2, 0.0, 1.0 ) )+sunCol*glow*0.35;",
"    vec3 dark=mix( low, top, 0.4 )*0.72;",
"    vec3 cc=mix( lit, dark, clamp( ( th-n )*2.2+0.35, 0.0, 1.0 )*0.6 );",
"    cc+=sunCol*pow( s, 10.0 )*glow*0.5*( 1.0-c );",
"    col=mix( col, cc, c*smoothstep( 0.015, 0.22, d.y )*0.92 );",
"  }",
"  col=mix( col, low, step( d.y, 0.0 ) );",
"  gl_FragColor=vec4( lookFogKnee( col ), 1.0 );",
"}"].join("\n");
m.needsUpdate = true;
}
function realSkyTick(dt) {
if (!REAL.skyDone)
return;
REAL_SKYU.time.value += dt;
var w = (typeof WLD !== "undefined" && WLD.on) ? WLD.on : null, cov = 0.5;
if (w && (REAL_NOCLOUD[w] || (WLD.w && WLD.w.noClouds)))
cov = 0;
else if (typeof WX !== "undefined" && WX && WX.kind && WX.kind !== "clear")
cov = Math.min(0.95, 0.7 + 0.2 * (WX.strength || 1));
REAL_SKYU.cover.value += (cov - REAL_SKYU.cover.value) * Math.min(1, dt * 0.5);
}
var REAL_GRADE = {
uniforms: { tDiffuse: { value: null }, sat: { value: 1.1 }, con: { value: 1.06 }, vig: { value: 0.22 }, lift: { value: 0.0 } },
vertexShader: "varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4( position, 1.0 ); }",
fragmentShader: [
"uniform sampler2D tDiffuse; uniform float sat; uniform float con; uniform float vig; uniform float lift; varying vec2 vUv;",
"void main(){",
"  vec4 t=texture2D( tDiffuse, vUv ); vec3 c=t.rgb;",
"  float l=dot( c, vec3( 0.2126, 0.7152, 0.0722 ) );",
"  c=mix( vec3( l ), c, sat );",
"  c=clamp( ( c-0.5 )*con+0.5, 0.0, 1.0 ); c=c+lift*( 1.0-c );",
"  vec2 q=vUv-0.5; c*=1.0-vig*smoothstep( 0.25, 0.85, dot( q, q )*2.2 );",
"  gl_FragColor=vec4( c, t.a );",
"}"
].join("\n")
};
if (typeof gfxBuild === "function") {
var realGfxBuild = gfxBuild;
gfxBuild = function () {
var r = realGfxBuild.apply(this, arguments);
try {
var C = GFX.composer;
if (C && !GFX.ink && !window.REAL_OFF && THREE.ShaderPass) {
GFX.grade = new THREE.ShaderPass(REAL_GRADE);
C.addPass(GFX.grade);
}
}
catch (e) {
if (window.console)
console.warn("real-look grade:", e);
}
return r;
};
}
function realGradeTick() {
if (!GFX.grade)
return;
var u = GFX.grade.uniforms, inside = !!(typeof store !== "undefined" && store && store.inside);
u.vig.value = inside ? 0.16 : 0.22;
}
if (typeof gfxRender === "function") {
var realGfxRender = gfxRender, realLast = 0;
gfxRender = function () {
try {
var now = performance.now(), dt = realLast ? Math.min(0.1, (now - realLast) / 1000) : 0.016;
realLast = now;
if (!REAL.skyDone)
realSkyPatch();
realSkyTick(dt);
realTick();
realGradeTick();
realShadeTick();
if (typeof realEnvTick === "function")
realEnvTick(dt);
realWatch(now);
}
catch (e) {
if (!REAL.warned) {
REAL.warned = 1;
if (window.console)
console.warn("real-look:", e);
}
}
return realGfxRender.apply(this, arguments);
};
}
var FINE = { near: 11, max: 8, at: 0, queue: [], made: 0 };
function fineWanted() { return !window.FINE_OFF && typeof REAL !== "undefined" && REAL.on; }
function fineFlat(A) {
if (A.__fineFlat)
return A.__fineFlat;
if (!A.isInterleavedBufferAttribute)
return A.array;
var s = A.itemSize, D = A.data, st = D.stride, of = A.offset, src = D.array, o = new src.constructor(A.count * s);
for (var i = 0; i < A.count; i++)
for (var k = 0; k < s; k++)
o[i * s + k] = src[i * st + of + k];
return o;
}
function fineSplit(G) { return __ZC(423, 1, this, arguments, new.target); }
function fineNormals(H) { return __ZC(423, 2, this, arguments, new.target); }
function fineGet(G) {
var F = G.userData.fine;
if (F)
return F === -1 ? null : F;
if (FINE.queue.indexOf(G) < 0)
FINE.queue.push(G);
return null;
}
function fineWork() {
var t0 = performance.now();
while (FINE.queue.length && performance.now() - t0 < 12) {
var G = FINE.queue.shift();
if (G.userData.fine)
continue;
try {
G.userData.fine = fineSplit(G) || -1;
FINE.made++;
}
catch (e) {
G.userData.fine = -1;
if (window.console)
console.warn("[fine]", e);
}
}
}
function fineSet(E, on) { return __ZC(423, 3, this, arguments, new.target); }
(function () {
if (typeof hdfFile !== "function")
return;
var hf = hdfFile;
hdfFile = function (file, cb) {
return hf.call(this, file, function (F) {
try {
if (F && F.scene && !F.__fineMarked) {
F.__fineMarked = 1;
F.scene.traverse(function (m) { if (m.isSkinnedMesh && m.geometry && m.geometry.index)
m.geometry.userData.fineOk = 1; });
}
}
catch (e) { }
return cb(F);
});
};
if (typeof hdfSkinMat === "function") {
var sm = hdfSkinMat;
hdfSkinMat = function () { var M = sm.apply(this, arguments); try {
if (M && M.userData && !M.userData.realSkin) {
M.userData.realSkin = 1;
M.userData.realSoft = 1;
}
}
catch (e) { } return M; };
}
if (typeof hdfHeadOnly === "function") {
var ho = hdfHeadOnly;
hdfHeadOnly = function (m) {
var H = ho.apply(this, arguments);
try {
var gu = m.geometry.userData;
if (H && H.userData === gu)
H.userData = { fineOk: gu.fineOk ? 1 : 0 };
}
catch (e) { }
return H;
};
}
})();
function fineTick(dt) {
if (typeof HDF === "undefined" || !HDF.list)
return;
FINE.at -= dt;
if (FINE.queue.length)
fineWork();
if (FINE.at > 0)
return;
FINE.at = 0.5;
var want = fineWanted(), near = [];
for (var i = 0; i < HDF.list.length; i++) {
var E = HDF.list[i];
if (!E.model)
continue;
if (want && (E.d || 0) < FINE.near)
near.push(E);
else if (E.fine)
fineSet(E, false);
}
near.sort(function (a, b) { return (a.d || 0) - (b.d || 0); });
near.forEach(function (E, k) { fineSet(E, k < FINE.max); });
}
(function () {
if (typeof stepFigures !== "function")
return;
var sf = stepFigures;
stepFigures = function (dt) { var r = sf.apply(this, arguments); try {
fineTick(dt);
}
catch (e) {
if (window.console && !FINE.warned) {
FINE.warned = 1;
console.warn("[fine]", e);
}
} return r; };
if (typeof hdfDetach === "function") {
var hd = hdfDetach;
hdfDetach = function (E) { try {
if (E && E.model)
fineSet(E, false);
E.fine = false;
}
catch (e) { } return hd.apply(this, arguments); };
}
})();
(function () {
if (typeof hdfDye !== "function")
return;
var hd = hdfDye;
hdfDye = function (mat, col) {
var M = hd.apply(this, arguments);
try {
if (M && M.userData && M.userData.hdfGrey && !M.userData.realDye && mat.map && mat.map.image) {
Object.defineProperty(M.userData, "realDye", { value: { map: mat.map }, enumerable: false, configurable: true });
}
}
catch (e) { }
return M;
};
})();
var REAL_SHADE = {
uniforms: { tDiffuse: { value: null }, tDepth: { value: null }, near: { value: 0.1 }, far: { value: 6000 }, logF: { value: 0 }, isLog: { value: 0 },
focal: { value: 800 }, res: { value: new THREE.Vector2(1, 1) }, radius: { value: 0.4 }, strength: { value: 0.8 }, plane: { value: 0 } },
vertexShader: "varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4( position, 1.0 ); }",
fragmentShader: [
"uniform sampler2D tDiffuse; uniform sampler2D tDepth; uniform float near; uniform float far; uniform float logF; uniform float isLog;",
"uniform float focal; uniform vec2 res; uniform float radius; uniform float strength; uniform float plane; varying vec2 vUv;",
"float lin( vec2 uv ){ float d=texture2D( tDepth, uv ).x;",
"  if( isLog>0.5 ) return exp2( d*logF )-1.0;",
"  float z=d*2.0-1.0; return ( 2.0*near*far )/( far+near-z*( far-near ) ); }",
"void main(){",
"  vec4 c=texture2D( tDiffuse, vUv ); float d0=lin( vUv );",
"  if( d0>180.0 ){ gl_FragColor=c; return; }",
"  float px=clamp( radius*focal/max( d0, 0.1 ), 2.0, 60.0 ), occ=0.0;",
"  for( int i=0; i<12; i++ ){",
"    float fi=float( i ), ang=fi*0.5236+( fi>5.5?0.2618:0.0 ), rr=px*( fi>5.5?1.0:0.45 );",
"    vec2 o=vec2( cos( ang ), sin( ang ) )*rr/res;",
"    float d1=lin( vUv+o ), d2=lin( vUv-o );",
"    float pr=mix( ( d1+d2 )*0.5, 2.0*d1*d2/max( d1+d2, 1e-4 ), plane );",
"    float h=d0-pr-plane*radius*0.6, span=radius*2.0;",
"    float ok=step( d0-d1, span )*step( d0-d2, span );",
"    occ+=clamp( h/( radius*0.5 ), 0.0, 1.0 )*ok;",
"  }",
"  occ/=12.0;",
"  float ao=1.0-strength*occ*( 1.0-smoothstep( 90.0, 180.0, d0 ) );",
"  gl_FragColor=vec4( c.rgb*ao, c.a );",
"}"
].join("\n")
};
function realShadePass() {
var P = new THREE.ShaderPass(REAL_SHADE);
var base = P.render;
P.render = function (r, w, rd) {
var dt = rd && rd.depthTexture;
this.uniforms.tDepth.value = dt || null;
this.uniforms.strength.value = dt ? 0.8 : 0.0;
this.uniforms.plane.value = (typeof WLD !== "undefined" && WLD.w && WLD.w.shadePlane) ? 1 : 0;
return base.apply(this, arguments);
};
return P;
}
if (typeof gfxBuild === "function") {
var realGfxBuild2 = gfxBuild;
gfxBuild = function () {
var r = realGfxBuild2.apply(this, arguments);
try {
var C = GFX.composer;
if (C && !GFX.ink && !window.REAL_OFF && !window.SHADE_OFF && typeof realWanted === "function" && realWanted() && THREE.ShaderPass && THREE.DepthTexture && C.insertPass) {
[C.renderTarget1, C.renderTarget2].forEach(function (t) { var D = new THREE.DepthTexture(); D.type = THREE.UnsignedIntType; t.depthTexture = D; t.depthBuffer = true; });
GFX.shade = realShadePass();
C.insertPass(GFX.shade, 1);
}
}
catch (e) {
GFX.shade = null;
if (window.console)
console.warn("real-look shade:", e);
}
return r;
};
}
function realShadeTick() {
var S = GFX.shade;
if (!S)
return;
var u = S.uniforms, pr = renderer.getPixelRatio(), h = innerHeight * pr, w = innerWidth * pr;
S.enabled = !!(REAL.on && !window.SHADE_OFF);
u.res.value.set(w, h);
u.near.value = camera.near;
u.far.value = camera.far;
u.isLog.value = renderer.capabilities.logarithmicDepthBuffer ? 1 : 0;
u.logF.value = Math.log2(camera.far + 1);
u.focal.value = h * 0.5 / Math.tan((camera.fov || 60) * Math.PI / 360);
}
if (typeof applyShadows === "function") {
var realApplyShadows = applyShadows;
applyShadows = function () {
var r = realApplyShadows.apply(this, arguments);
try {
if (REAL.on && !window.SHADE_OFF && sun && sun.castShadow && sun.shadow && sun.shadow.mapSize.width < 4096) {
var mx = renderer.capabilities && renderer.capabilities.maxTextureSize || 4096;
if (mx >= 4096) {
sun.shadow.mapSize.width = sun.shadow.mapSize.height = 4096;
if (sun.shadow.map) {
sun.shadow.map.dispose();
sun.shadow.map = null;
}
sun.shadow.bias = -0.0004;
if ("normalBias" in sun.shadow)
sun.shadow.normalBias = 0.2;
}
}
}
catch (e) { }
return r;
};
}
try {
if (typeof sun !== "undefined" && sun && typeof renderer !== "undefined" && renderer)
applyShadows();
}
catch (e) { }
var RT = { kinds: {}, at: 0, near: 170, max: 420, list: [], tex: {}, u: { time: { value: 0 } }, made: 0 };
RT.PRESETS = {
oak: { seed: 35729, type: "deciduous", bark: { type: "oak", tint: 0xFFF1D1, scale: [1, 10] }, branch: { levels: 3, angle: [0, 54, 58, 32], children: [6, 4, 3], force: -0.01, gnarl: [0, -0.1, -0.15, 0.09], length: [37.24, 11.08, 12.39, 7.16], radius: [1.41, 0.9, 0.69, 1.19], sections: [8, 6, 3, 1], segments: [7, 5, 3, 3], start: [0, 0.49, 0.06, 0.12], taper: [0.73, 0.42, 0.69, 0.75], twist: [-0.23, 0.42, 0, 0] }, leaves: { type: "oak", angle: 42, count: 18, start: 0.16, size: 2.5, vary: 0.7, tint: 0xD5D5CD, alpha: 0.5 } },
ash: { seed: 36330, type: "deciduous", bark: { type: "oak", tint: 0xCECDBE, scale: [0.5, 5] }, branch: { levels: 3, angle: [0, 48, 75, 60], children: [7, 4, 3], force: -0.06, gnarl: [0.03, 0.25, 0.2, 0.09], length: [43.47, 27.14, 9.51, 4.6], radius: [2, 0.63, 0.76, 0.7], sections: [12, 8, 6, 4], segments: [12, 6, 4, 3], start: [0, 0.23, 0.33, 0], taper: [0.7, 0.7, 0.7, 0.7], twist: [0.09, -0.07, 0, 0] }, leaves: { type: "ash", angle: 55, count: 16, start: 0, size: 2.67, vary: 0.72, tint: 0xFFFFFF, alpha: 0.5 } },
aspen: { seed: 18020, type: "deciduous", bark: { type: "birch", tint: 0xFFFFFF, scale: [1, 1] }, branch: { levels: 2, angle: [0, 75, 32, 7], children: [10, 3, 3], force: 0.0148, gnarl: [0.05, 0.12, 0.12, 0.02], length: [50, 6.07, 11.19, 1], radius: [0.72, 0.41, 0.7, 0.7], sections: [12, 10, 8, 6], segments: [8, 6, 4, 3], start: [0, 0.59, 0.35, 0], taper: [0.37, 0.13, 0.7, 0.7], twist: [0, 0, 0, 0] }, leaves: { type: "aspen", angle: 30, count: 11, start: 0.124, size: 2.5, vary: 0.7, tint: 0xFFFA62, alpha: 0.5 } },
pine: { seed: 13977, type: "evergreen", bark: { type: "pine", tint: 0xFFFFFF, scale: [1, 1] }, branch: { levels: 1, angle: [0, 110, 16, 60], children: [82, 3, 5], force: -0.003, gnarl: [0.05, 0.08, 0, 0], length: [50, 23.87, 14.08, 1], radius: [1.05, 0.36, 0.7, 0.7], sections: [12, 10, 8, 6], segments: [8, 6, 4, 3], start: [0, 0.27, 0.14, 0.3], taper: [0.7, 0.7, 0.7, 0.7], twist: [0, 0, 0, 0] }, leaves: { type: "pine", angle: 39, count: 30, start: 0.09, size: 1.435, vary: 0.201, tint: 0xFFFFFF, alpha: 0.3 } }
};
function rtWanted() { return !window.TREES_OFF && typeof REAL !== "undefined" && REAL.on; }
function rtRng(seed) { return __ZC(423, 4, this, arguments, new.target); }
function rtGrow(P) { return __ZC(423, 5, this, arguments, new.target); }
function rtTex(url, srgb, rep) { return __ZC(423, 6, this, arguments, new.target); }
function rtLeafShader(sh) { return __ZC(423, 7, this, arguments, new.target); }
function rtKind(name) { return __ZC(423, 8, this, arguments, new.target); }
var RT_LEAFY = ["oak", "oak", "ash", "aspen"];
function rtPick(o) {
if (o.userData.rtKind)
return o.userData.rtKind;
var a = o.userData.rtArch, h = Math.abs(Math.round(o.position.x * 7.13 + o.position.z * 3.71)) % RT_LEAFY.length;
return (o.userData.rtKind = a === "pine" ? "pine" : RT_LEAFY[h]);
}
function rtColour(o) { return __ZC(423, 9, this, arguments, new.target); }
(function () {
if (typeof build !== "function")
return;
var b0 = build;
build = function (spec) {
var g = b0.apply(this, arguments);
try {
var a = spec && spec.archetype;
if (g && (a === "tree" || a === "pine") && !(g.userData && g.userData.ghost)) {
g.userData.rtArch = a;
var parts = KIT[a] && KIT[a].parts, i = 0;
g.traverse(function (m) { if (m.isMesh && m !== g) {
var p = parts && parts[i++];
m.userData.rtPart = p && p.c === "bark" ? "bark" : "leaf";
} });
RT.list.push(new WeakRef(g));
}
}
catch (e) { }
return g;
};
})();
function rtHide(o, hide) {
if (!!o.userData.rtHid === hide)
return;
o.userData.rtHid = hide;
o.traverse(function (m) { if (m.isMesh && m.userData.rtPart) {
if (hide) {
m.userData.rtVis = m.visible;
m.visible = false;
}
else
m.visible = m.userData.rtVis !== false;
} });
}
var RT_M = new THREE.Matrix4(), RT_V = new THREE.Vector3(), RT_S = new THREE.Vector3(), RT_Q = new THREE.Quaternion();
function rtTick(dt) {
RT.u.time.value += dt;
RT.at -= dt;
if (RT.at > 0)
return;
RT.at = 0.5;
var on = rtWanted(), cam = camera.position, pick = {}, keep = [];
for (var i = 0; i < RT.list.length; i++) {
var o = RT.list[i].deref();
if (!o)
continue;
keep.push(RT.list[i]);
var shown = false;
if (on) {
var top = o, vis = true;
while (top) {
if (top.visible === false) {
vis = false;
break;
}
if (!top.parent)
break;
top = top.parent;
}
var pressed = false;
o.traverse(function (m) { if (m.userData.baked && m.userData.rtPart)
pressed = true; });
if (pressed)
vis = false;
if (vis && top === scene) {
o.getWorldPosition(RT_V);
var d = RT_V.distanceTo(cam);
if (d < RT.near) {
var k = rtPick(o);
(pick[k] = pick[k] || []).push({ o: o, d: d });
shown = true;
}
}
}
if (!shown && o.userData.rtHid)
rtHide(o, false);
}
RT.list = keep;
rtChunks(on, cam, pick);
Object.keys(RT.PRESETS).forEach(function (name) {
var L = pick[name] || [], K = RT.kinds[name];
if (!L.length && !K)
return;
if (!K) {
try {
K = rtKind(name);
}
catch (e) {
if (window.console)
console.warn("[trees]", e);
return;
}
}
L.sort(function (a, b) { return a.d - b.d; });
if (L.length > RT.max)
L.length = RT.max;
if (!K.im || K.cap < L.length) {
var cap = Math.max(32, Math.ceil(L.length * 1.5));
if (K.im) {
scene.remove(K.im.w);
scene.remove(K.im.l);
K.im.w.dispose && K.im.w.dispose();
K.im.l.dispose && K.im.l.dispose();
}
var w = new THREE.InstancedMesh(K.wood, K.wm, cap), l = new THREE.InstancedMesh(K.leaves, K.lm, cap);
l.customDepthMaterial = K.dm;
[w, l].forEach(function (m) { m.frustumCulled = false; m.castShadow = true; m.receiveShadow = true; m.raycast = function () { }; m.userData.noMerge = 1; m.userData.hdf = 1; m.name = "real-trees-" + name; scene.add(m); });
K.im = { w: w, l: l };
K.cap = cap;
}
L.forEach(function (q, j) {
var o = q.o;
o.updateWorldMatrix(true, false);
o.matrixWorld.decompose(RT_V, RT_Q, RT_S);
var spin = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), ((Math.abs(RT_V.x * 13.1 + RT_V.z * 7.7)) % 6.283));
RT_M.compose(RT_V, RT_Q.clone().multiply(spin), RT_S);
K.im.w.setMatrixAt(j, RT_M);
K.im.l.setMatrixAt(j, RT_M);
K.im.l.setColorAt(j, rtLeafTint(rtColour(o), name));
rtHide(o, true);
});
K.im.w.count = K.im.l.count = L.length;
K.im.w.instanceMatrix.needsUpdate = true;
K.im.l.instanceMatrix.needsUpdate = true;
if (K.im.l.instanceColor)
K.im.l.instanceColor.needsUpdate = true;
K.im.w.visible = K.im.l.visible = L.length > 0;
});
}
var RT_C = new THREE.Color(), RT_G = new THREE.Color(0x4E7A34);
function rtLeafTint(c, name) {
var hsl = {}, g = {};
c.getHSL(hsl);
RT_G.getHSL(g);
if (Math.abs(hsl.h - g.h) < 0.07 && hsl.s > 0.15)
return RT_C.setRGB(1, 1, 1);
return RT_C.copy(c).multiplyScalar(1.0 / Math.max(0.25, c.r * 0.3 + c.g * 0.59 + c.b * 0.11)).multiplyScalar(0.55).lerp(new THREE.Color(1, 1, 1), 0.15);
}
(function () {
if (typeof stepFigures !== "function")
return;
var sf = stepFigures;
stepFigures = function (dt) { var r = sf.apply(this, arguments); try {
rtTick(dt || 0.016);
}
catch (e) {
if (window.console && !RT.warned) {
RT.warned = 1;
console.warn("[trees]", e);
}
} return r; };
})();
var RT_CUR = null;
(function () {
if (typeof bakeable !== "function" || typeof bakeMatKey !== "function" || typeof bakeMesh !== "function")
return;
var b0 = bakeable, k0 = bakeMatKey, m0 = bakeMesh;
bakeable = function (m) { var r = b0.apply(this, arguments); RT_CUR = r ? m : null; return r; };
bakeMatKey = function (mt, special) {
var c = RT_CUR;
RT_CUR = null;
if (c && c.userData && c.userData.rtPart && !special && !window.TREES_OFF && (rtWanted() || (typeof realWanted === "function" && realWanted())))
special = "rt";
return k0.call(this, mt, special);
};
bakeMesh = function (G) { var r = m0.apply(this, arguments); try {
if (G && G.special === "rt" && r && r.mesh)
r.mesh.userData.rtTrees = 1;
}
catch (e) { } return r; };
})();
function rtChunks(on, cam, pick) {
if (typeof BAKE === "undefined" || !BAKE.chunks)
return;
Object.keys(BAKE.chunks).forEach(function (k) {
var ch = BAKE.chunks[k];
if (!ch || !ch.meshes || !ch.meshes.length)
return;
var tm = ch.meshes.filter(function (m) { return m.userData.rtTrees; });
if (!tm.length)
return;
var near = on && ch.cx !== undefined && Math.hypot(ch.cx - cam.x, ch.cz - cam.z) < RT.near;
tm.forEach(function (m) {
if (near) {
if (m.userData.rtMask === undefined) {
m.userData.rtMask = m.layers.mask;
m.layers.mask = 0;
}
}
else if (m.userData.rtMask !== undefined) {
m.layers.mask = m.userData.rtMask;
delete m.userData.rtMask;
}
});
if (!near)
return;
(ch.members || []).forEach(function (M) {
var o = M.g;
if (!o || !o.userData.rtArch || !o.parent)
return;
o.getWorldPosition(RT_V);
var k2 = rtPick(o);
(pick[k2] = pick[k2] || []).push({ o: o, d: RT_V.distanceTo(cam), chunk: 1 });
});
});
}
var REAL_ENV = { rt: null, gen: null, sc: null, at: 0, u: { env: { value: null }, wet: { value: 0 }, envK: { value: 1 } }, ok: false };
function realEnvWanted() { return !window.ENV_OFF && typeof REAL !== "undefined" && REAL.on && !!THREE.PMREMGenerator; }
function realEnvTick(dt) {
if (!realEnvWanted() || typeof sky === "undefined" || !sky || !REAL.skyDone)
return;
var raining = !window.WET_OFF && typeof WX !== "undefined" && WX && (WX.kind === "rain" || WX.kind === "storm");
var inDoors = (typeof store !== "undefined" && store && store.inside);
var w = REAL_ENV.u.wet;
w.value = Math.max(0, Math.min(1, w.value + (raining && !inDoors ? dt / 40 : -dt / 90)));
REAL_ENV.at -= dt;
if (REAL_ENV.at > 0 && REAL_ENV.rt)
return;
REAL_ENV.at = 3;
try {
if (!REAL_ENV.gen) {
REAL_ENV.gen = new THREE.PMREMGenerator(renderer);
REAL_ENV.sc = new THREE.Scene();
}
var sc = REAL_ENV.sc;
if (!REAL_ENV.m || REAL_ENV.m.material !== sky.material) {
if (REAL_ENV.m)
sc.remove(REAL_ENV.m);
REAL_ENV.m = new THREE.Mesh(sky.geometry, sky.material);
REAL_ENV.m.frustumCulled = false;
sc.add(REAL_ENV.m);
}
var r = sky.geometry.parameters && sky.geometry.parameters.radius || 1000;
if (!REAL_ENV.cube) {
REAL_ENV.cube = new THREE.WebGLCubeRenderTarget(128, { format: THREE.RGBAFormat, generateMipmaps: false, encoding: THREE.sRGBEncoding });
REAL_ENV.cam = new THREE.CubeCamera(r * 0.05, r * 2, REAL_ENV.cube);
sc.add(REAL_ENV.cam);
}
var old = REAL_ENV.rt, ac = renderer.autoClear, tg = renderer.getRenderTarget(), tm = renderer.toneMapping;
renderer.autoClear = true;
renderer.toneMapping = THREE.NoToneMapping;
REAL_ENV.cam.update(renderer, sc);
var rt = REAL_ENV.gen.fromCubemap(REAL_ENV.cube.texture);
renderer.autoClear = ac;
renderer.toneMapping = tm;
renderer.setRenderTarget(tg);
REAL_ENV.dec = rt.texture.encoding === THREE.RGBEEncoding ? "RGBEToLinear" : rt.texture.encoding === THREE.sRGBEncoding ? "sRGBToLinear" : "";
REAL_ENV.rt = rt;
REAL_ENV.u.env.value = rt.texture;
if (old)
old.dispose();
if (!REAL_ENV.ok) {
REAL_ENV.ok = true;
realEnvRefresh();
}
}
catch (e) {
if (!REAL_ENV.warned) {
REAL_ENV.warned = 1;
if (window.console)
console.warn("real-look env:", e);
}
}
}
function realEnvRefresh() {
if (typeof scene === "undefined" || !scene)
return;
var seen = new Set();
scene.traverse(function (o) {
var ms = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : [];
ms.forEach(function (m) { if (m && !seen.has(m) && m.__real) {
seen.add(m);
m.needsUpdate = true;
} });
});
}
var CRS = { geo: new WeakMap(), made: 0, re: /animated-animals|farm-animals|ultimate-monsters|animated-fish|characters\/creatures/ };
function crsWanted() { return !window.CREATURE_OFF && typeof REAL !== "undefined" && REAL.on; }
function crsSmoothed(G) { return __ZC(423, 10, this, arguments, new.target); }
function crsRound(G) { return __ZC(423, 11, this, arguments, new.target); }
function crsDress(root) {
root.traverse(function (m) {
if (!m.isMesh || !m.geometry || m.userData.crs)
return;
m.userData.crs = 1;
var R = crsRound(m.geometry);
if (R)
m.geometry = R;
});
}
if (typeof modelSwap === "function") {
var crsModelSwap = modelSwap;
modelSwap = function (g, spec, e, F) {
var r = crsModelSwap.apply(this, arguments);
try {
if (crsWanted() && e && CRS.re.test([].concat(e.f || []).join(" "))) {
g.children.forEach(function (c) { if (c.userData && c.userData.model)
crsDress(c); });
}
}
catch (err) { }
return r;
};
}
var CRS_FUR = /^(main|main_dark|main_light|fur|wool|body|coat)(\.\d+)?$/i, CRS_EYE = /(^|_)eyes?(_white|_black)?(\.\d+)?$/i, CRS_HAIR = /hair|mane/i;
function crsTag(mat) {
var n = mat && mat.name;
if (!n || !mat.userData)
return;
if (CRS_EYE.test(n) && !/brow|lash/i.test(n))
mat.userData.realKind = "eye";
else if (CRS_HAIR.test(n) && !/brow/i.test(n))
mat.userData.realHair = 1;
else if (CRS_FUR.test(n))
mat.userData.realFur = 1;
}
