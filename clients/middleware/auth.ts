import { useNuxtApp } from '#app';

export default defineNuxtRouteMiddleware((to, from) => {
    const { $client } = useNuxtApp();
    if (process.client) {
        if (!$client.value) {
            return navigateTo({
                path: '/login',
                replace: true,
            });
        }
    }
});
