import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import vitePluginVueMarkdown from './plugins/vite-plugin-vue-markdown';

export default defineConfig(async () => {
  // const { visualizer } = await import('rollup-plugin-visualizer');

  return {
    base: '/fxxx-nothing/',
    plugins: [
      vue({ include: [/\.vue$/, /\.md$/] }),
      vitePluginVueMarkdown(),
      // visualizer({
      //   filename: 'dist/stats.html',
      //   open: true,
      //   gzipSize: true,
      //   brotliSize: true,
      //   template: 'treemap',
      // }),
    ],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@VueMarkdown': fileURLToPath(
          new URL('./plugins/vite-plugin-vue-markdown', import.meta.url),
        ),
        '@fuck-nothing-dev': fileURLToPath(
          new URL('../packages/fuck-nothing/src/index.ts', import.meta.url),
        ),
      },
    },

    server: {
      host: true,
    },

    optimizeDeps: {
      include: ['vue', 'vue-router'],
    },

    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'esbuild',

      rollupOptions: {
        treeshake: true,
        output: {
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/js/[name].[hash].js',
          assetFileNames: 'assets/[ext]/[name].[hash].[ext]',
          manualChunks(id) {
            if (!id.includes('node_modules')) return;

            if (id.includes('fuck-nothing')) {
              return 'library';
            }
            // 其他第三方使用默认打包策略
            return;
          },
        },
      },
    },
  };
});
