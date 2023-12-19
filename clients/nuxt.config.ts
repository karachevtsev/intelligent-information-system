import svgLoader from 'vite-svg-loader';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    telemetry: false,
    runtimeConfig: {
        public: {
            apiBase: 'https://api-cf.dtkt.ua/',
            baseUrl: 'https://my.dtkt.ua/',
            siteName: 'my',
            gtm: ['GTM-WH5HDRT'],
        },
    },
    experimental: {
        writeEarlyHints: false,
    },
    css: [
        '@/assets/sass/app.scss',
    ],
    plugins: [
        '../shared/plugins/clickOutside.ts',
        '../shared/plugins/clientHandling.ts',
        '../shared/plugins/eventEmitter.ts',
        '../shared/plugins/gtag.client.ts',
        '../shared/plugins/scrollToTop.ts',
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
                    @import "@/assets/sass/_variables.scss";
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
            title: '«Дебет-Кредит» - Особистий кабінет',
            htmlAttrs: {
                lang: 'uk',
                class: 'theme-client',
            },
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Усі новини про бухгалтерію, кадри, зарплату, бухгалтерський облік, звітність, право та аудит в Україні! Все, що треба бухгалтеру – на порталі «Дебет-Кредит»: новини, нормативні документи, онлайн журнал, вебінари і семінари для бухгалтерів, консультації, бланки звітності, податковий календар, ставки податків, розміри ЄСВ, прожиткового мінімуму та інші довідники!',
                },
                { property: 'og:title', content: '«Дебет-Кредит» - Особистий кабінет' },
                {
                    property: 'og:description',
                    content: 'Усі новини про бухгалтерію, кадри, зарплату, бухгалтерський облік, звітність, право та аудит в Україні! Все, що треба бухгалтеру – на порталі «Дебет-Кредит»: новини, нормативні документи, онлайн журнал, вебінари і семінари для бухгалтерів, консультації, бланки звітності, податковий календар, ставки податків, розміри ЄСВ, прожиткового мінімуму та інші довідники!',
                },
                { property: 'og:image', content: '/og-image.jpg' },
                { name: 'format-detection', content: 'telephone=no' },
                { name: 'msapplication-TileColor', content: '#0e7838' },
                { name: 'msapplication-config', content: '/browserconfig.xml' },
                { name: 'theme-color', content: '#0e7838' },
            ],
            link: [
                { rel: 'preload', href: '/fonts/roboto-300.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
                { rel: 'preload', href: '/fonts/roboto-400.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
                { rel: 'preload', href: '/fonts/roboto-500.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
                { rel: 'preload', href: '/fonts/roboto-700.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
                { rel: 'preload', href: '/fonts/roboto-900.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
                { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
                { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
                { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
                { rel: 'manifest', href: '/manifest.json' },
                { rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: '#0e7838' },
                { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
            ],
            script: [
                {
                    src: '/outdated.js',
                    type: 'text/javascript',
                    vmid: 'outdated',
                    async: true,
                },
            ],
        },
    },
    alias: {
        'dtkt-shared/': '../shared',
        // yup: 'yup/lib/index.js',
    },
});
