// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, {transformAssetUrls} from 'vite-plugin-vuetify';
import path from "path";

export default defineNuxtConfig({
    devtools: {enabled: true},

    // app: {
    //   head: {
    //     title: '',
    //     link: [{ rel: 'icon', type: 'image/png', href: "/favicon.svg" }],
    //     meta: [
    //       { charset: 'utf-8' },
    //     ],
    //   },
    // },

    css: [
        'vuetify/lib/styles/main.sass',
        "@/assets/main.scss",
    ],

    build: {
        transpile: ['vuetify'],
    },
    modules: [
        'vuetify-nuxt-module',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
    ],

    vite: {
        vue: {
            template: {
                transformAssetUrls,
            },
        },
        define: {
            'process.env.DEBUG': false,
        },
    },
    devServer: {
        host: 'localhost',
        port: 3000
    },
    ssr: false,
});