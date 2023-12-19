<template>
    <div class="change-email">
        <template v-if="!isSend">
            <div class="change-email-title">
                Вкажіть свою <span>нову</span> адресу
                електронної пошти
            </div>
            <div class="change-email-form">
                <p>
                    Ця електронна адреса буде використовуватись для авторизації на сайтах dtkt.ua, а також отримання розсилок і інформаційних листів
                    від
                    редакції
                </p>
                <client-only>
                    <form @submit.prevent="send">
                        <div class="form-group">
                            <label for="email-current"
                                   class="form-label"
                            >
                                Старий e-mail
                            </label>
                            <Field
                                v-model="emailCurrent"
                                id="email-current"
                                class="form-control"
                                placeholder="Введіть e-mail"
                                type="email"
                                name="email-current"
                                readonly
                            />
                        </div>
                        <div class="form-group">
                            <label for="email-new"
                                   class="form-label"
                            >
                                Новий e-mail
                            </label>
                            <Field
                                v-model="emailNew"
                                :class="{'has-errors': errors.email}"
                                id="email-new"
                                class="form-control"
                                name="email"
                                placeholder="Введіть новий e-mail"
                                type="email"
                            />
                            <ErrorMessage class="error" name="email"></ErrorMessage>
                            <div v-if="serverError" class="error">{{ serverError }}</div>
                        </div>

                        <div class="form-group">
                            <button class="btn" type="submit" :disabled="isDisabled">
                                Змінити
                            </button>
                        </div>
                    </form>
                </client-only>
            </div>
        </template>
        <template v-else>
            <div class="change-email-title">
                Ви змінили свій e-mail
            </div>
            <div class="change-email-message">
                <p>Ми надіслали лист на вашу нову поштову адресу <span>{{ emailNew }}</span>, відкрийте його та перейдіть
                    за посиланням.</p>
                <p>Якщо ви не отримаєте лист протягом декількох хвилин, перевірте теку «Спам» або напишіть на <span>info@dtkt.ua</span></p>
                <img
                    alt=""
                    height="160"
                    loading="lazy"
                    src="/images/bg-contact-form.svg?url"
                    width="200"
                />
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from '#app';
import { ErrorMessage, Field, useForm } from 'vee-validate';
import { ref } from 'vue';
import { object, string } from 'yup';
import { errorMessages } from 'dtkt-shared/utils/validators';

const { public: { apiBase } } = useRuntimeConfig();
const { $client } = useNuxtApp();
const emailCurrent = ref($client.value?.email);
const emailNew = ref('');
const isDisabled = ref(false);
const isSend = ref(false);
const serverError = ref('');

const { errors, handleSubmit } = useForm({
    validationSchema: object({
        email: string().required(errorMessages.required).email(errorMessages.email),
    }),
});

const send = handleSubmit(async ({ email }) => {
    try {
        isDisabled.value = true;
        await $fetch('/clients/email', {
            baseURL: apiBase,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email }),
            async onResponse({ response }) {
                console.log(response);
                if (!response.ok) {
                    let error = '';
                    switch (response.status) {
                        case 422:
                            error = 'Користувач з таким email вже існує';
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
        isSend.value = true;
    } catch (error) {
        serverError.value = <string>error;
    } finally {
        isDisabled.value = false;
    }
});
</script>

<style lang="scss">
.change-email {
    &-title {
        padding-bottom: 15px;
        font-weight: 700;
        font-size: 21px;

        span {
            color: #F1C40F;
        }
    }

    &-text {
        margin-bottom: 0;
    }

    &-form {
        padding-top: 30px;
        padding-bottom: 30px;
        border-top: 1px solid #EDEDEF;

        p {
            margin-bottom: 25px;
        }
    }

    .form-group {
        margin-bottom: 25px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .form-control {
        &:read-only {
            background: #EDEDEF;
        }
    }

    .form-label {
        display: inline-block;
        margin-bottom: 6px;
        font-weight: 400;
        line-height: 18px;
        color: #000000;

        sup {
            position: relative;
            top: 3px;
            font-size: 15px;
            color: #E8132A;
        }
    }

    .btn {
        width: 100%;
        line-height: 1.6;
        margin: 0 auto;
    }

    &-message {
        p {
            span {
                color: #0243EC;
            }
        }

        img {
            display: block;
            margin: 50px auto 0;
        }
    }
}
</style>
