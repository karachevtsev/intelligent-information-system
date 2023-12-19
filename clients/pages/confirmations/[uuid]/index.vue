<template>
    <div class="content">
        <client-only>
            <div class="content-box">
                <component
                    v-if="!serverError"
                    :is="component"
                    @sendCode="sendCode"
                >
                </component>
                <Error v-else :error="serverError"/>
            </div>
        </client-only>
    </div>
</template>

<script lang="ts" setup>
import { useNuxtApp, useRoute } from '#app';
import { computed, ref, shallowRef } from 'vue';
import Email from '~/components/Confirmation/Email.vue';
import Register from '~/components/Confirmation/Register.vue';
import Restore from '~/components/Confirmation/Restore.vue';
import Error from '~/components/Confirmation/Error.vue';

const route = useRoute();
const { public: { apiBase } } = useRuntimeConfig();
const serverError = ref('');
const confirmation = ref(null);
const { $client, $logout } = useNuxtApp();

const confirmationsType = shallowRef({
    'DtKt\\Clients\\Confirmations\\RegistrationConfirmation': Register,
    'DtKt\\Clients\\Confirmations\\RestorePasswordConfirmation': Restore,
    'DtKt\\Clients\\Confirmations\\EmailConfirmation': Email,
});

const confirmationsRedirect = shallowRef({
    'DtKt\\Clients\\Confirmations\\RegistrationConfirmation': '/register_done',
    'DtKt\\Clients\\Confirmations\\RestorePasswordConfirmation': '/password_done',
    'DtKt\\Clients\\Confirmations\\EmailConfirmation': '/email_done',
});

try {
    const { data } = await $fetch<{
        data: {
            confirmation: null;
        }
    }>(`/confirmations/${route.params.uuid}`, {
        baseURL: apiBase,
        params: {
            code: route.query.code,
        },
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        async onResponse({ response }) {
            if (!response.ok) {
                let error = '';
                switch (response.status) {
                    case 404:
                        if ($client.value) {
                            await $logout();
                        } else {
                            error = 'Упс, щось пішло не так. Спробуйте пізніше.';
                        }
                        break;
                    default:
                        error = 'Упс, щось пішло не так. Спробуйте пізніше.';
                }
                return Promise.reject(error);
            }
        },
    });
    confirmation.value = data.confirmation;
} catch (error) {
    serverError.value = <string>error;
}

const component = computed(() => {
    return confirmation.value ? confirmationsType.value[confirmation.value] : 'div';
});

const sendCode = async () => {
    try {
        const { data } = await $fetch<{
            data: {
                confirmation: null;
            }
        }>(`/confirmations/${route.params.uuid}`, {
            baseURL: apiBase,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ code: route.query.code }),
            async onResponse({ response }) {
                if (!response.ok) {
                    let error = '';
                    switch (response.status) {
                        case 404:
                            error = 'Упс, щось пішло не так. Спробуйте пізніше.';
                            break;
                        default:
                            error = 'Упс, щось пішло не так. Спробуйте пізніше.';
                    }
                    return Promise.reject(error);
                }
            },
        });
        navigateTo({
            path: confirmationsRedirect.value[data.confirmation],
            replace: true,
        });
    } catch (error) {
        serverError.value = <string>error;
    }
};
</script>

<style lang="scss">
.confirmations {
    display: flex;
    justify-content: center;
    align-items: center;

    @include laptop-xl() {
        padding-top: 100px;
    }
}
</style>
