import { resolve } from 'node:path';
import { defineConfig } from 'vite';
export default defineConfig({
  root: import.meta.dirname, publicDir: false, worker: { format: 'es' },
  build: { outDir: resolve(import.meta.dirname, 'dist-somnu'), emptyOutDir: true, target: 'es2020', minify: true,
    lib: { entry: resolve(import.meta.dirname, 'src/somnu.ts'), formats: ['iife'], name: 'AraMakerLib', fileName: () => 'ara-maker.js' } },
});
