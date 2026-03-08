import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      entryRoot: 'src',
      outDir: 'dist',
      tsconfigPath: './tsconfig.json',
      rollupTypes: true,
    }),
  ],

  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'fuck-nothing',
      fileName: (format) => `fuck-nothing.${format}.js`,
      formats: ['es', 'umd'],
    },

    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
