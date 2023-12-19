<template>
    <div class="auth-form">
        <template v-if="!confirmationUUID">
            <div class="auth-form-title">Безкоштовно реєструйтесь на сайті «Дебет-Кредит»!</div>
            <div class="auth-form-subtitle">Для цього необхідно заповнити усього три поля</div>
            <div class="auth-form-fields no-border">
                <form @submit.prevent="send">
                    <div class="form-group">
                        <label :for="`email-${props.id}`" class="form-label">E-mail<sup>*</sup></label>
                        <Field :id="`email-${props.id}`"
                               class="form-control"
                               name="email"
                               placeholder="Пошта"
                               type="email"
                               v-model="email"
                               :class="{'has-errors': errors.email}"
                        />
                        <ErrorMessage class="error" name="email"></ErrorMessage>
                        <span v-if="isEmailExists" class="error">Клієнт з таким email вже існує</span>
                    </div>
                    <div class="form-group">
                        <label :for="`name-${props.id}`" class="form-label">Ім’я<sup>*</sup></label>
                        <Field :id="`name-${props.id}`"
                               class="form-control"
                               name="name"
                               placeholder="Ім’я"
                               type="text"
                               :class="{'has-errors': errors.name}"
                        />
                        <ErrorMessage class="error" name="name"></ErrorMessage>
                    </div>
                    <div class="form-group">
                        <label :for="`phone-${props.id}`" class="form-label">Телефон<sup>*</sup></label>
                        <Phone name="phone"
                               :id="`phone-${props.id}`"
                               placeholder="Телефон"
                               :class="{'has-errors': errors.phone}"
                        />
                        <ErrorMessage class="error" name="phone"></ErrorMessage>
                    </div>
                    <div class="form-group">
                        <label :for="`password-${props.id}`" class="form-label">Пароль<sup>*</sup></label>
                        <Field :id="`password-${props.id}`"
                               class="form-control"
                               name="password"
                               placeholder="Не менше 6 символів"
                               type="password"
                               :class="{'has-errors': errors.password}"
                        />
                        <ErrorMessage class="error" name="password"/>
                    </div>
                    <div class="form-group">
                        <label :for="`password-confirm-${props.id}`" class="form-label">Повторіть пароль<sup>*</sup></label>
                        <Field :id="`password-confirm-${props.id}`"
                               class="form-control"
                               name="password_confirmation"
                               placeholder="Повторіть пароль"
                               type="password"
                               :class="{'has-errors': errors.password_confirmation}"
                        />
                        <ErrorMessage class="error" name="password_confirmation"/>
                    </div>
                    <div class="form-group">
                        <button class="btn" type="submit">
                            Зареєструватись
                        </button>
                    </div>
                    <div class="form-group">
                        <p class="text-center">
                            <NuxtLink to="https://promo.dtkt.ua/register" target="_blank" rel="">Що дає реєстрація?</NuxtLink>
                        </p>
                        <p class="auth-info">При реєстрації ви автоматично підписуєтесь на корисні розсилки. Налаштувати теми листів чи відмовитись
                            від
                            них ви можете в особистому кабінеті</p>
                    </div>
                </form>
            </div>
        </template>
        <template v-else>
            <div class="auth-form-title">Вже майже все!</div>
            <div class="auth-form-subtitle mb-30">
                Ми відправили лист на адресу <span class="auth-form-email">{{ email }}</span> з підтвердженням вашої реєстрації. Для її завершення
                перейдіть за посиланням, наведенним у листі.
                <br>
                <br>
                Якщо ви не отримали листа протягом декількох хвилин, перевірте папки «Промо» і «Спам», або зверніться до вашого системного
                адміністратора.
            </div>
            <button class="btn" @click="close" type="button">Зрозуміло</button>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { useNuxtApp } from '#app';
import { ErrorMessage, Field, Form, useForm } from 'vee-validate';
import * as Yup from 'yup';
import Phone from './Phone';
import { errorMessages } from '../utils/validators';
import { ResponseError, ValidationError, ThrottleError } from '../utils/errors';

const props = defineProps({
    id: String,
});

const { $bus } = useNuxtApp();
const { public: { apiBase } } = useRuntimeConfig();
const isEmailExists = ref(false);
const confirmationUUID = ref(null);
const email = ref('');

const { errors, handleSubmit } = useForm({
    validationSchema: Yup.object({
        email: Yup.string().required(errorMessages.required).email(errorMessages.email),
        name: Yup.string().required(errorMessages.required),
        phone: Yup.string().required(errorMessages.required),
        password: Yup.string().required(errorMessages.required).min(6, errorMessages.password),
        password_confirmation: Yup.string().required(errorMessages.required).min(6, errorMessages.password).oneOf([Yup.ref('password'), null], errorMessages.passwordEqual),
    }),
});

const send = handleSubmit(async ({ email, name, phone, password, password_confirmation }) => {
    await fetch(new URL('/clients/register', apiBase), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            phone: [phone],
            info: {
                name: name,
            },
            password: password,
            password_confirmation: password_confirmation,
        }),
    })
        .then(async response => {
            if (!response.ok) {
                switch (response.status) {
                    case 422:
                        throw new ValidationError(response, (await response.json()).errors);
                    case 429:
                        throw new ThrottleError(response);
                }
                throw new ResponseError(response);
            }
            return response.json();
        })
        .then(({ data: confirmation }) => {
            confirmationUUID.value = confirmation?.uuid;
        }, (response: ResponseError) => {
            isEmailExists.value = response instanceof ValidationError && response.has('email');
        });
});

const close = () => {
    confirmationUUID.value = null;
    $bus.$emit('openLoginModal', { open: false });
};
</script>
