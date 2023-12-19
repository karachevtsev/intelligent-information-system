import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.$router.options.scrollBehavior = async (to: any, from: any, savedPosition: string) => {
        if (savedPosition) {
            return savedPosition;
        }

        const findEl = async (hash: any, x = 0) => {
            try {
                return (
                    document.getElementById(hash.substring(1)) ||
                    new Promise(resolve => {
                        if (x > 50) {
                            return resolve(document.querySelector('#app'));
                        }
                        setTimeout(() => {
                            resolve(findEl(hash, ++x || 1));
                        }, 100);
                    })
                );
            } catch (e) {
                console.log(e);
            }
        };

        if (to.hash) {
            let el = await findEl(to.hash) as HTMLDivElement;
            if (el) {
                const header = document.getElementById('header') as HTMLDivElement;
                const height = header.offsetHeight;

                if ('scrollBehavior' in document.documentElement.style) {
                    return window.scrollTo({ top: el?.offsetTop - height, behavior: 'smooth' });
                } else {
                    return window.scrollTo(0, el?.offsetTop - height);
                }
            }
        }

        return { top: 0, left: 0 };
    };
});
