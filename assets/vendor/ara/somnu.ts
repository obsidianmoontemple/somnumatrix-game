/* SomnuMatrix build of the ara3d generator: window.AraMaker.make(params, opts) -> GLB bytes, made in a worker. */
import AraWorker from './library/worker?worker&inline';
import { GARMENTS } from '../../../src/core/garments/catalog';
import { PATTERNS } from '../../../src/core/garments/textures';
import { HAIRSTYLES, FACIAL_HAIR, FACIAL_HAIR_LABELS, EARRINGS, EARRING_LABELS } from '../../../src/core/looks';
import { TATTOOS, TATTOO_LABELS } from '../../../src/core/looks/tattoos';
import { EXPRESSIONS } from '../../../src/core/face';
import { DEFAULT_PARAMS } from '../../../src/core/params';
let worker: Worker | undefined, next = 1;
const pending = new Map<number, any>();
function gen() {
  if (worker) return worker;
  worker = new AraWorker();
  worker.onmessage = ({ data }: MessageEvent<any>) => { const j = pending.get(data.id); if (!j) return; if (data.type === 'progress') { j.p && j.p(data.label, data.fraction); return; } pending.delete(data.id); data.type === 'done' ? j.ok(data.result) : j.no(Error(data.message)); };
  worker.onerror = (e) => { for (const j of pending.values()) j.no(Error('maker worker failed ' + (e.message || ''))); pending.clear(); worker?.terminate(); worker = undefined; };
  return worker;
}
/* a recipe saved by an older maker, or typed by hand, keeps only what this one knows (a wrong pattern would stop the whole person) */
function clean(input: any) {
  const p = input && input.params; if (!p || !p.garmentStyles) return input;
  const by: any = {}; for (const g of GARMENTS as any[]) by[g.id] = g;
  const gs: any = {};
  for (const k of Object.keys(p.garmentStyles)) { const g = by[k], st = p.garmentStyles[k]; if (!g || !st) continue; const o: any = {};
    if (st.pattern && g.patterns.indexOf(st.pattern) >= 0) o.pattern = st.pattern;
    if (/^#[0-9a-f]{6}$/i.test(st.color || '')) o.color = st.color; if (/^#[0-9a-f]{6}$/i.test(st.color2 || '')) o.color2 = st.color2;
    gs[k] = o; }
  return { ...input, params: { ...p, garmentStyles: gs } };
}
function make(input: any, options: any = {}) {
  input = clean(input);
  const { assetsUrl, onProgress, ...rest } = options;
  const abs = new URL(assetsUrl, location.href).href;
  return new Promise<any>((ok, no) => { const id = next++; pending.set(id, { ok, no, p: onProgress }); gen().postMessage({ id, assetsUrl: abs, input, options: rest }); })
    .then((g: any) => ({ glb: g.files[0].data, params: g.params, colors: g.colors, height: g.height, clipNames: g.clipNames }));
}
const lists = {
  garments: GARMENTS.filter((g: any) => !g.setOnly).map((g: any) => ({ id: g.id, label: g.label, slot: g.slot, patterns: g.patterns, color: g.color, color2: g.color2, colorLabels: g.colorLabels || null, fullLength: !!g.fullLength })),
  patterns: PATTERNS, hair: HAIRSTYLES, facialHair: FACIAL_HAIR, facialHairLabels: FACIAL_HAIR_LABELS, earrings: EARRINGS, earringLabels: EARRING_LABELS,
  tattoos: TATTOOS, tattooLabels: TATTOO_LABELS, expressions: EXPRESSIONS, defaults: DEFAULT_PARAMS,
};
(globalThis as any).AraMaker = { make, lists, stop() { worker?.terminate(); worker = undefined; } };
