<template>
    <div class="box box-stretch">
        <div class="box-header box-header-left">
            <h1 class="title-bordered">Поновлення паролю</h1>
        </div>
        <div class="box-profile confirmations">
            <div class="box-profile profile">
                <Image name="password-image" alt="Поновлення паролю"/>
                <form @submit.prevent="send">
                    <div class="profile-row">
                        <div class="profile-field">Введіть свій новий пароль:</div>
                        <div class="profile-value">
                            <Password
                                :class="{'has-errors': errors.password}"
                                name="password"
                                placeholder="Не менше 6 символів"
                            />
                            <ErrorMessage class="error" name="password"/>
                        </div>
                    </div>
                    <div class="profile-row">
                        <div class="profile-field">Підтвердіть новий пароль:</div>
                        <div class="profile-value">
                            <Password
                                :class="{'has-errors': errors.password_confirmation}"
                                name="password_confirmation"
                                placeholder="Повторіть пароль"
                            />
                            <ErrorMessage class="error" name="password_confirmation"/>
                        </div>
                    </div>
                    <div class="profile-row-btn">
                        <button class="btn btn-profile" type="submit">
                            Зберегти
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useNuxtApp, useRoute } from '#app';
import { ref } from 'vue';
import { ErrorMessage, useForm } from 'vee-validate';
import * as Yup from 'yup';
import { errorMessages } from 'dtkt-shared/utils/validators';
import Password from '~/components/Password.vue';

const route = useRoute();
const { $client, $logout } = useNuxtApp();
const serverError = ref('');
const { public: { apiBase } } = useRuntimeConfig();
const show = ref(false);

const { errors, handleSubmit } = useForm({
    validationSchema: Yup.object({
        password: Yup.string().required(errorMessages.required).min(6, errorMessages.password),
        password_confirmation: Yup.string().required(errorMessages.required).min(6, errorMessages.password).oneOf([Yup.ref('password'), null], errorMessages.passwordEqual),
    }),
});

const emit = defineEmits(['sendFormData']);

const send = handleSubmit(async ({ password, password_confirmation }) => {
    try {
        await $fetch(`/confirmations/${route.params.uuid}`, {
            baseURL: apiBase,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify({
                password: password,
                password_confirmation: password_confirmation,
            }),
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
            path: '/password_done',
            replace: true,
        });
    } catch (error) {
        serverError.value = <string>error;
    }
});
</script>
