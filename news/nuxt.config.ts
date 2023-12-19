import { defineNuxtConfig } from 'nuxt/config';
import svgLoader from 'vite-svg-loader';
import { compression } from 'vite-plugin-compression2';

export default defineNuxtConfig({
    telemetry: false,
    runtimeConfig: {
        public: {
            apiBase: 'https://api-cf.dtkt.ua/',
            baseUrl: 'https://news.dtkt.ua/',
            openx: '79385e7925db5d6986debcf4caf65f0c',
            gtm: ['GTM-WH5HDRT'],
            siteName: 'news',
        },
    },
    routeRules: {
        '/': { swr: 600 },
    },
    experimental: {
        writeEarlyHints: false,
        renderJsonPayloads: false,
    },
    modules: [
        ['@nuxtjs/google-fonts', {
            families: {
                Roboto: {
                    wght: [300, 400, 500, 700, 900],
                },
            },
        }],
        [
            '@nuxt/image',
        ],
    ],
    css: [
        '@/assets/sass/app.scss',
    ],
    plugins: [
        '../shared/plugins/clickOutside.ts',
        '../shared/plugins/clientHandling.ts',
        '../shared/plugins/eventEmitter.ts',
    ],
    vite: {
        server: {
            hmr: {
                protocol: 'ws',
            },
        },
        plugins: [
            svgLoader(),
        ],
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                    @import "../shared/styles/_variables.scss";
                    @import "../shared/styles/_mixins.scss";
                    @import "../shared/styles/_functions.scss";
                    `,
                },
            },
        },

    },
    typescript: {
        strict: true,
    },
    app: {
        head: {
            title: '«Дебет-Кредит» - Бухгалтерські новини',
            htmlAttrs: {
                lang: 'uk',
                class: 'theme-news',
            },
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Усі новини про бухгалтерію, кадри, зарплату, бухгалтерський облік, звітність, право та аудит в Україні! Все, що треба бухгалтеру – на порталі «Дебет-Кредит»: новини, нормативні документи, онлайн журнал, вебінари і семінари для бухгалтерів, консультації, бланки звітності, податковий календар, ставки податків, розміри ЄСВ, прожиткового мінімуму та інші довідники!',
                },
                { property: 'og:title', content: '«Дебет-Кредит» - Бухгалтерські новини' },
                {
                    property: 'og:description',
                    content: 'Усі новини про бухгалтерію, кадри, зарплату, бухгалтерський облік, звітність, право та аудит в Україні! Все, що треба бухгалтеру – на порталі «Дебет-Кредит»: новини, нормативні документи, онлайн журнал, вебінари і семінари для бухгалтерів, консультації, бланки звітності, податковий календар, ставки податків, розміри ЄСВ, прожиткового мінімуму та інші довідники!',
                },
                { property: 'og:image', content: '/og-image.jpg' },
                { name: 'format-detection', content: 'telephone=no' },
                { name: 'msapplication-TileColor', content: '#8bba43' },
                { name: 'msapplication-config', content: '/browserconfig.xml' },
                { name: 'theme-color', content: '#8bba43' },
            ],
            link: [
                { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
                { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
                { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
                { rel: 'manifest', href: '/manifest.json' },
                { rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: '#8bba43' },
                { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
            ],
        },
    },
    alias: {
        'dtkt-shared/': '../shared',
    },
});
