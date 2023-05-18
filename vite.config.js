import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @use 'sass:math';
                    @import "@/assets/css/variables-sass.scss";
                    @import "@/assets/css/mixins.scss";
                    @import "@/assets/css/functions.scss";
                    `,
            },
        },
    },
});
