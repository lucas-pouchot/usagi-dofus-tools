import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import generateSitemap from 'vite-ssg-sitemap';
import Layouts from 'vite-plugin-vue-layouts';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import pluginRewriteAll from 'vite-plugin-rewrite-all';
import { VitePWA } from 'vite-plugin-pwa';
import VueI18n from '@intlify/unplugin-vue-i18n/vite';
import Unocss from 'unocss/vite';

import pkg from './package.json';

process.env.VITE_APP_VERSION = pkg.version;

export default defineConfig({
    base: '/usagi-dofus-tools',
    resolve: {
        alias: {
            '~/': `${path.resolve(__dirname, 'src')}/`,
        },
    },

    plugins: [
        Vue({
            include: [/\.vue$/],
            reactivityTransform: true,
        }),

        // https://github.com/hannoeru/vite-plugin-pages
        Pages({
            extensions: ['vue'],
        }),

        pluginRewriteAll(),

        // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
        Layouts(),

        // https://github.com/antfu/unplugin-auto-import
        AutoImport({
            imports: [
                'vue',
                'vue-router',
                'vue-i18n',
                'vue/macros',
                '@vueuse/head',
                '@vueuse/core',
            ],
            dts: 'src/auto-imports.d.ts',
            dirs: [
                'src/composables',
                'src/store',
            ],
            vueTemplate: true,
        }),

        // https://github.com/antfu/unplugin-vue-components
        Components({
            extensions: ['vue'],
            // allow auto import and register components used in markdown
            include: [/\.vue$/, /\.vue\?vue/],
            dts: 'src/components.d.ts',
        }),

        // https://github.com/antfu/unocss
        // see unocss.config.ts for config
        Unocss(),

        // https://github.com/antfu/vite-plugin-pwa
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
            manifest: {
                name: "Usagi's dofus tools",
                short_name: 'Dofus tools',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: '/pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: '/pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                    {
                        src: '/pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                ],
            },
        }),

        // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
        VueI18n({
            runtimeOnly: true,
            compositionOnly: true,
            include: [path.resolve(__dirname, 'locales/**')],
        }),
    ],

    // https://github.com/antfu/vite-ssg
    ssgOptions: {
        script: 'async',
        formatting: 'minify',
        format: 'cjs',
        onFinished() { generateSitemap(); },
    },
});
