import { defineNuxtPlugin } from '#app';
import { watch } from 'vue';

export default defineNuxtPlugin((nuxtApp) => {
    const client = ref(null);
    const { public: { apiBase, siteName } } = useRuntimeConfig();

    async function update() {
        const { public: { apiBase } } = useRuntimeConfig();
        const { data } = await (await fetch(new URL('/clients/ping', apiBase), {
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include',
        })).json();
        client.value = data;
        return data;
    }

    if (process.client) {
        try {
            client.value = JSON.parse(localStorage.getItem('client') || 'null');
        } catch (e) {
            client.value = null;
        }
        watch(client, (value) => {
            localStorage.setItem('client', JSON.stringify(value ?? null));
        });

        window.addEventListener('storage', (e) => {
            if (e.key === 'client') {
                client.value = JSON.parse(e.newValue as string);
            }
        });

        nuxtApp.hook('app:created', update);
    }

    return {
        provide: {
            client,
            async socialLogin(type: 'google' | 'facebook' | 'linkedin') {
                let win = <Window>window.open('https://my.dtkt.ua/social/' + type, 'social', `location=0,menubar=0,status=0,titlebar=0,toolbar=0,width=600,height=480,left=${(screen.width - 600) / 2}`);
                if (!win) throw new Error('Unable open social popup.');
                do {
                    await new Promise((resolve) => {
                        setTimeout(resolve, 100);
                    });
                } while (!win.closed);
                await update();
            },
            updateClient: update,
            async login(email: string, password: string, remember: boolean = false) {
                const form = new FormData();
                form.append('email', email);
                form.append('password', password);
                form.append('remember', remember ? '1' : '0');
                return await fetch(new URL('/clients/login', apiBase), {
                    method: 'POST',
                    body: form,
                    credentials: 'include',
                })
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                        return Promise.reject(response);
                    })
                    .then(({ data }) => {
                        client.value = data;
                        return client;
                    })
                    .catch((response) => {
                        return response.status;
                    });
            },
            async logout() {
                await fetch(new URL('/clients/logout', apiBase), {
                    method: 'POST',
                    credentials: 'include',
                });
                client.value = null;
                if (siteName === 'my') {
                    await navigateTo({
                        path: '/login',
                        replace: true,
                    });
                }
            },
        },
    };
});
