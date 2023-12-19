<template>
    <ContentBase>
        <div class="box-header box-header-left">
            <h1 class="title-bordered">Реєстрація на сайті</h1>
        </div>
        <div class="box-profile profile">
            <template v-if="!confirmationUUID">
                <p class="profile-register-title">
                    Безкоштовно реєструйтесь на сайті «Дебет-Кредит»!
                </p>
                <div class="register-form">
                    <form @submit.prevent="send">
                        <div class="profile-row">
                            <div class="profile-field">
                                E-mail<sup>*</sup>
                            </div>
                            <div class="profile-value">
                                <Field id="email"
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
                        </div>
                        <div class="profile-row">
                            <div class="profile-field">
                                Ім’я<sup>*</sup>
                            </div>
                            <div class="profile-value">
                                <Field id="name"
                                       class="form-control"
                                       name="name"
                                       placeholder="Ім’я"
                                       type="text"
                                       :class="{'has-errors': errors.name}"
                                />
                                <ErrorMessage class="error" name="name"></ErrorMessage>
                            </div>
                        </div>
                        <div class="profile-row">
                            <div class="profile-field">
                                Телефон<sup>*</sup>
                            </div>
                            <div class="profile-value">
                                <Phone name="phone"
                                       id="phone"
                                       placeholder="Телефон"
                                       :class="{'has-errors': errors.phone}"
                                />
                                <ErrorMessage class="error" name="phone"></ErrorMessage>
                            </div>
                        </div>
                        <div class="profile-row">
                            <div class="profile-field">
                                Пароль<sup>*</sup>
                            </div>
                            <div class="profile-value">
                                <Field id="password"
                                       class="form-control"
                                       name="password"
                                       placeholder="Не менше 6 символів"
                                       type="password"
                                       :class="{'has-errors': errors.password}"
                                />
                                <ErrorMessage class="error" name="password"/>
                            </div>
                        </div>
                        <div class="profile-row">
                            <div class="profile-field">
                                Повторіть пароль<sup>*</sup>
                            </div>
                            <div class="profile-value">
                                <Field id="password-confirm"
                                       class="form-control"
                                       name="password_confirmation"
                                       placeholder="Повторіть пароль"
                                       type="password"
                                       :class="{'has-errors': errors.password_confirmation}"
                                />
                                <ErrorMessage class="error" name="password_confirmation"/>
                            </div>
                        </div>
                        <div class="profile-row align-center">
                            <div class="profile-field">
                                <button class="btn btn-profile" type="submit">
                                    Зареєструватись
                                </button>
                            </div>
                            <div class="profile-value">
                                <NuxtLink to="https://promo.dtkt.ua/register" target="_blank" rel="">Що дає реєстрація?</NuxtLink>
                            </div>
                        </div>
                        <p class="profile-register-info">
                            При реєстрації ви автоматично підписуєтесь на корисні розсилки. Налаштувати актуальні теми, чи відмовитись ви
                            завжди зможете у розділі «E-mail розсилки» у меню зліва.
                        </p>
                    </form>
                </div>
            </template>
            <template v-else>
                <div class="profile-register-title text-center">Вже майже все!</div>
                <div class="profile-register-text text-center">
                    Ми відправили лист на адресу <span class="auth-form-email">{{ email }}</span> з підтвердженням вашої реєстрації. Для
                    її завершення
                    перейдіть за посиланням, наведенним у листі.
                    <br>
                    <br>
                    Якщо ви не отримали листа протягом декількох хвилин, перевірте папки «Промо» і «Спам», або зверніться до вашого
                    системного
                    адміністратора.
                </div>
                <Image name="bg-contact-form"
                       width="200"
                       alt=""
                />
            </template>
        </div>
    </ContentBase>
</template>

<script lang='ts' setup>
import { ErrorMessage, Field, Form, useForm } from 'vee-validate';
import * as Yup from 'yup';
import Phone from 'dtkt-shared/components/Phone';
import { errorMessages } from 'dtkt-shared/utils/validators';
import { ResponseError, ValidationError, ThrottleError } from 'dtkt-shared/utils/errors';

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
</script>

<style lang='scss'>

</style>
