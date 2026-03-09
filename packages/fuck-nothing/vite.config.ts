import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
// import fg from 'fast-glob';

// const getEntries = () => {
//   const entries: Record<string, string> = {
//     index: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
//   };

//   const files = fg.sync('src/components/**/index.ts');

//   files.forEach((file) => {
//     const name = file.replace('src/', '').replace('.ts', '');

//     entries[name] = file;
//   });

//   const styleFiles = fg.sync('src/components/**/style/{index,css}.ts');

//   styleFiles.forEach((file) => {
//     const name = file.replace('src/', '').replace('.ts', '');

//     entries[name] = file;
//   });

//   return entries;
// };

export default defineConfig({
  plugins: [
    vue(),
    dts({
      entryRoot: 'src',
      outDir: 'dist',
      tsconfigPath: './tsconfig.json',
      rollupTypes: true,
      // exclude: ['src/components/**/style'],
    }),
  ],
  // build: {
  //   rollupOptions: {
  //     input: getEntries(),
  //     external: ['vue', /^fuck-nothing\/theme/, /^@theme/],
  //     preserveEntrySignatures: 'exports-only',

  //     output: {
  //       format: 'es',

  //       preserveModules: true,
  //       preserveModulesRoot: 'src',

  //       entryFileNames: '[name].js',
  //     },
  //   },
  // },

  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'fxxx-nothing',
      fileName: (format) => `fxxx-nothing.${format}.js`,
      formats: ['es', 'cjs', 'umd'],
    },

    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
