<template>
    <ContentAccess title="Impersonate">
        <client-only>
            <div class="impersonate">
                <template v-if="$client.options?.impersonate">
                    <form @submit.prevent="send">
                        <div class="form-group">
                            <label for="email-impersonate"
                                   class="form-label"
                            >
                                E-mail
                            </label>
                            <Field
                                v-model="email"
                                :class="{'has-errors': errors.email}"
                                id="email-impersonate"
                                class="form-control"
                                placeholder="Введіть e-mail"
                                type="email"
                                name="email"
                            />
                            <ErrorMessage class="error" name="email"></ErrorMessage>
                            <div v-if="serverError" class="error">{{ serverError }}</div>
                        </div>
                        <div class="form-group">
                            <button class="btn" type="submit">
                                Увійти
                            </button>
                        </div>
                    </form>
                </template>
                <template v-else>
                    <h2>У вас немає доступу до цієї сторінки!</h2>
                </template>
            </div>
        </client-only>
    </ContentAccess>
</template>

<script lang='ts' setup>
import {useNuxtApp} from "#app";
import {ErrorMessage, Field, useForm} from 'vee-validate';
import {errorMessages} from 'dtkt-shared/utils/validators';
import {ref} from 'vue';
import {object, string} from 'yup';


const {public: {apiBase}} = useRuntimeConfig();
const {$client} = useNuxtApp();
const email = ref('');
const isDisabled = ref(false);
const serverError = ref('');

const {errors, handleSubmit} = useForm({
    validationSchema: object({
        email: string().required(errorMessages.required).email(errorMessages.email),
    }),
});

const send = handleSubmit(async ({email}) => {
    try {
        isDisabled.value = true;
        await $fetch('/clients/impersonate', {
            baseURL: apiBase,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({email}),
            async onResponse({response}) {
                console.log(response);
                if (!response.ok) {
                    let error = '';
                    switch (response.status) {
                        case 404:
                            error = 'Користувача з таким email не знайдено';
                            break;
                        case 429:
                            error = 'Забагато спроб, спробуйте через 1 хв.';
                            break;
                        default:
                            error = 'Упс, щось пішло не так. Спробуйте пізніше.';
                    }
                    return Promise.reject(error);
                }
            },
        });
        location.reload();
    } catch (error) {
        serverError.value = <string>error;
    } finally {
        isDisabled.value = false;
    }
});

</script>

<style lang='scss'>
.impersonate {

    @include laptop-lg() {
        width: 50%;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .btn {
        width: 180px;
    }
}
</style>