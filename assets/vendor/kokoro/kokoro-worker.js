/* SomnuMatrix: the lifelike voices (Kokoro), worked out away from the game so the game never stutters while a voice is
   made. The page sends lines; this sends back the sound of each, one line at a time, in the order asked.
   Kokoro-82M and kokoro-js are Apache-2.0 (see LICENSE-kokoro-js.txt and NOTICE.txt beside this file). */
import { KokoroTTS, env } from "./kokoro.web.js";

let tts = null, busy = false, gen = 0;
const queue = [];

/* the graphics chip makes a voice many times faster than the processor on a small laptop; the processor is used when
   there is no chip the browser can reach. A short warm-up line is made twice and timed, so the page knows whether this
   computer keeps up with speech. */
async function open(device, dtype, model) {
  return KokoroTTS.from_pretrained(model, {
    dtype: dtype, device: device,
    progress_callback: (p) => { if (p && p.status === "progress" && /onnx/.test(p.file || "")) postMessage({ t: "prog", p: Math.round(p.progress || 0), dev: device }); }
  });
}
async function bench() {
  const line = "Good evening, and welcome. The lamps are lit along the square.";
  await tts.generate(line, { voice: "af_heart" });
  const t0 = performance.now(), a = await tts.generate(line, { voice: "af_heart" });
  return (performance.now() - t0) / 1000 / (a.audio.length / a.sampling_rate);
}
async function load(m) {
  if (m.wasm) env.wasmPaths = m.wasm;
  let dev = "";
  try {
    if (m.gpu && self.navigator && navigator.gpu) {
      const ad = await navigator.gpu.requestAdapter();
      if (ad && (m.anyGpu || !ad.isFallbackAdapter)) { tts = await open("webgpu", "fp32", m.model); dev = "webgpu"; }
    }
  } catch (e) { tts = null; postMessage({ t: "note", e: "graphics chip: " + String(e && e.message || e) }); }
  try {
    if (!tts) { tts = await open("wasm", "q8", m.model); dev = "wasm"; }
    const rtf = await bench();
    postMessage({ t: "ready", dev: dev, rtf: rtf });
    pump();
  } catch (e) { postMessage({ t: "fail", e: String(e && e.message || e) }); }
}

async function pump() {
  if (busy || !tts) return;
  const m = queue.shift(); if (!m) return;
  busy = true;
  const g = gen, t0 = performance.now();
  try {
    const a = await tts.generate(m.text, { voice: m.voice, speed: m.speed || 1 });
    if (g === gen) { const pcm = a.audio; postMessage({ t: "pcm", id: m.id, pcm: pcm, sr: a.sampling_rate, ms: performance.now() - t0 }, [pcm.buffer]); }
  } catch (e) { if (g === gen) postMessage({ t: "pcm", id: m.id, err: String(e && e.message || e) }); }
  busy = false;
  pump();
}

self.onmessage = (e) => {
  const m = e.data || {};
  if (m.t === "load") load(m);
  else if (m.t === "say") { queue.push(m); pump(); }
  /* everything waiting is dropped (the game stopped the speech) */
  else if (m.t === "clear") { queue.length = 0; gen++; }
};
