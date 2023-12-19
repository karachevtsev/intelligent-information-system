import type { RouterOptions } from '@nuxt/schema';

export default <RouterOptions>{
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            const header = document.getElementById('header') as HTMLDivElement;
            const height = header.offsetHeight;

            return {
                el: to.hash,
                top: height,
            };
        }

        if (savedPosition) {
            return savedPosition;
        } else {
            return {
                top: 0,
            };
        }
    },
};
