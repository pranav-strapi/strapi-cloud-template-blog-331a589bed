import { defineConfig } from 'vite';
import { mergeConfig } from 'vite';

export default defineConfig((config) => {
  return mergeConfig(config, {
    css: {
      preprocessorOptions: {
        scss: {
          // You can add global SCSS variables or imports here if needed
        },
      },
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo:any) => {
            if (assetInfo.name.endsWith('.css') && assetInfo.name.startsWith('strapi')) {
              return 'custom.css';
            }
            return assetInfo.name;
          },
        },
      },
    },
  });
});