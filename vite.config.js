import { defineConfig } from 'vite'
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';
import css from 'rollup-plugin-css-only';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      css: false, // CSSを別ファイルに抽出
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      preventAssignment: true,
    }),
    css({ output: 'vue2Dropzone.min.css' }),
    process.env.NODE_ENV === 'production' && terser(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.js'),
      name: 'vue3-dropzone',
      fileName: (format) => `vue3-dropzone.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      input: 'src/index.js',
      output: {
        dir: 'dist',
        entryFileNames: 'vue2Dropzone.js',
        format: 'umd',
        name: 'vue2Dropzone',
        sourcemap: true,
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
})
