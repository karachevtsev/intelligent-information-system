import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
    const { public: { openx } } = useRuntimeConfig();

    function update() {
        // @ts-ignore
        window.reviveAsync?.[openx]?.refresh();
    }

    let timer: any;
    return {
        provide: {
            openx: {
                id: openx,
                load(zone: string) {
                    console.log('openx', zone);
                    clearTimeout(timer);
                    timer = setTimeout(() => update(), 100);
                },
            },
        },
    };
});
