import preact from '@preact/preset-vite';
import {defineConfig} from 'vite';
import editorServerPlugin from './src/server';

import {fileURLToPath} from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "/src/assets/sass/_import.scss";`,
      },
    },
  },
  define: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  plugins: [
    preact({
      babel: {
        plugins: [['@babel/plugin-proposal-decorators', {legacy: true}]],
      },
    }),
    editorServerPlugin(),
  ],
  resolve: {
    alias: [
      {
        find: '@animation-scheme-editor/core',
        replacement: '@animation-scheme-editor/core/src',
      },
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  },
});
