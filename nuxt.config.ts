require('dotenv').config()
import { NuxtConfig } from '@nuxt/types'
import ru from 'vuetify/src/locale/ru'

const config: NuxtConfig = {
    target: 'static',
    head: {
        title: '5D Additive Manufacturing',
        titleTemplate: 'Stereotech - %s',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Stereotech - 5D Additive Manufacturing' },
            { name: 'msapplication-TileColor', content: '#0277bd' },
            { name: 'theme-color', content: '#0277bd' },

        ]
    },
    link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#0277bd' }
    ],

    router: {
        // middleware: 'i18n'
    },
    /*
    ** Global CSS
    */
    css: [

    ],
    /*
    ** Plugins to load before mounting the App
    */
    buildModules: [
        '@nuxt/typescript-build',
        '@nuxtjs/vuetify',
        '@aceforth/nuxt-optimized-images'
    ],
    plugins: [
        '~/plugins/vue-the-mask',
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/pwa',
        '@nuxtjs/sitemap',
        '@nuxtjs/robots',
        '@nuxt/content',
        'nuxt-i18n'
    ],
    content: {
        markdown: {
            tocDepth: 2
        },
        fullTextSearchFields: ['text', 'title']
    },
    i18n: {
        locales: [
            {
                code: 'en',
                name: 'English',
                file: 'en.json',
            },
            {
                code: 'ru',
                name: 'Русский',
                file: 'ru.json',
            },
            {
                code: 'de',
                name: 'Deutsche',
                file: 'de.json'
            }
        ],
        differentDomains: false,
        lazy: true,
        langDir: 'locales/',
        defaultLocale: 'ru',
    },
    env: {
        baseUrl: process.env.BASE_URL || 'http://localhost:3000',
        COCKPIT_TOKEN: process.env.COCKPIT_TOKEN || ''
    },
    manifest: {
        name: 'Stereotech - 5D Additive Manufacturing',
        description: 'Stereotech - 5D Additive Manufacturing',
        author: 'Stereotech',
        lang: 'ru'
    },
    sitemap: {
        hostname: 'https://support.stereotech.org'
    },
    /*
    ** vuetify module configuration
    ** https://github.com/nuxt-community/vuetify-module
    */
    vuetify: {
        materialIcons: false,
        lang: {
            locales: { ru },
            current: 'ru',
            t: (key, ...params) => key
        },
        theme: {
            dark: false,
            disable: false,
            default: false,
            options: {},
            themes: {
                light: {
                    primary: '#0277bd',
                    secondary: '#ffffff',
                    accent: '#191b38',
                    error: '#FF5252',
                    info: '#9C27B0',
                    success: '#4CAF50',
                    warning: '#FFC107'
                },
                dark: {
                    primary: '#0277bd',
                    secondary: '#ffffff',
                    accent: '#191b38',
                    error: '#FF5252',
                    info: '#9C27B0',
                    success: '#4CAF50',
                    warning: '#FFC107'
                }
            }
        },
        iconfont: 'mdi'
    },

    loading: { color: '#263238' },
    loadingIndicator: {
        name: 'folding-cube',
        color: '#ffffff',
        background: '#0277bd'
    },

    optimizedImages: {
        optimizeImages: true,
        optimizeImagesInDev: false
    }
    /*
    ** Build configuration
    */
}

export default config
