import { defineConfig } from 'vite';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { copyFileSync, mkdirSync } from 'fs';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  plugins: [
    visualizer({ filename: 'dist/stats.html', template: 'treemap', gzipSize: true }),
    {
      name: 'copy-data',
      writeBundle() {
        // Create data directory in dist
        mkdirSync('dist/data', { recursive: true });
        // Copy steels.json to dist/data
        copyFileSync('data/steels.json', 'dist/data/steels.json');
      }
    }
  ]
});
