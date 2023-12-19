<template>
    <ContentAccess title="Змінити пароль">
        <Image name="password-image" alt=""/>
        <form @submit.prevent="send">
            <div class="profile-row">
                <div class="profile-field">Старий пароль:</div>
                <div class="profile-value">
                    <Password
                        :class="{'has-errors': errors.old_password || serverError}"
                        name="old_password"
                        placeholder="Не менше 6 символів"
                    />
                    <ErrorMessage class="error" name="old_password"/>
                    <span v-if="serverError" class="error">{{ serverError }}</span>
                </div>
            </div>
            <div class="profile-row">
                <div class="profile-field">Новий пароль:</div>
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
                <div class="profile-field">Повторіть пароль:</div>
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
    </ContentAccess>
</template>

<script lang="ts" setup>
import { useNuxtApp } from '#app';
import { ref } from 'vue';
import { ErrorMessage, useForm } from 'vee-validate';
import * as Yup from 'yup';
import { errorMessages } from 'dtkt-shared/utils/validators';

const { $client, $logout } = useNuxtApp();
const serverError = ref('');
const { public: { apiBase } } = useRuntimeConfig();
const show = ref(false);

const { errors, handleSubmit } = useForm({
    validationSchema: Yup.object({
        old_password: Yup.string().required(errorMessages.required).min(6, errorMessages.password),
        password: Yup.string().required(errorMessages.required).min(6, errorMessages.password),
        password_confirmation: Yup.string().required(errorMessages.required).min(6, errorMessages.password).oneOf([Yup.ref('password'), null], errorMessages.passwordEqual),
    }),
});

const send = handleSubmit(async ({ old_password, password, password_confirmation }) => {
    try {
        await $fetch('/clients/password', {
            baseURL: apiBase,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                old_password,
                password,
                password_confirmation,
            }),
            async onResponse({ response }) {
                if (!response.ok) {
                    let error = '';
                    console.log(response.status);
                    switch (response.status) {
                        case 422:
                            error = 'Невірний пароль.';
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
        await $logout();
    } catch (error) {
        serverError.value = <string>error;
    }
});
</script>

<style lang="scss">

</style>
