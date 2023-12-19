import { GtmSupportOptions } from '@gtm-support/core/src/options';
import { createGtm } from '@gtm-support/vue-gtm';
import { Router } from 'vue-router';

export default defineNuxtPlugin((nuxtApp) => {
    const { public: { gtm } }: { public: { gtm: GtmSupportOptions['id'] } } = nuxtApp.$config;
    nuxtApp.vueApp.use(createGtm({
        id: gtm,
        debug: true,
        vueRouter: nuxtApp.$router as Router,
    }));
});
