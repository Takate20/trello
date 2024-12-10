// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import path from "path";

export default defineNuxtConfig({
  devtools: { enabled: true },
  
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
  ],
  
  build: {
    transpile: ['vuetify'],
  },
  modules: ['vuetify-nuxt-module'],
  
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    define: {
      'process.env.DEBUG': false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/colors.scss" as *;'
        }
      }
    },
  },
  devServer: {
    host: 'localhost',
    port: 3000
  },
});