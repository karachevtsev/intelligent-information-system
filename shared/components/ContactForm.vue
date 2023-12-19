<template>
    <div class="contact-form">
        <div v-if="!isSend" class="contact-form-wrapper">
            <div class="contact-form-title">
                Маєте пропозиції, зауваження чи побажання? Зв’яжіться з редакцією!
            </div>
            <div class="contact-form-subtitle">
                Ми неодмінно відповімо
            </div>
            <client-only>
                <div class="contact-form-fields">
                    <div v-if="serverError" class="error mb-20">{{ serverError }}</div>
                    <form @submit.prevent="send">
                        <div class="form-group">
                            <Field as="textarea"
                                   class="form-control"
                                   maxlength="250"
                                   minlength="10"
                                   name="message"
                                   placeholder="Текст повинен містити від 10 до 250 символів"
                                   rows="5"
                                   :class="{'has-errors': errors.message}"
                            />
                            <ErrorMessage class="error" name="message"></ErrorMessage>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="name-contact">Ім’я<sup>*</sup></label>
                            <Field v-model="name"
                                   id="name-contact"
                                   class="form-control"
                                   name="name"
                                   placeholder="Ім’я"
                                   type="text"
                                   :class="{'has-errors': errors.name}"
                            />
                            <ErrorMessage class="error" name="name"></ErrorMessage>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="email-contact">E-mail <sup>*</sup></label>
                            <Field v-model="email"
                                   id="email-contact"
                                   class="form-control"
                                   name="email"
                                   placeholder="Пошта"
                                   type="email"
                                   :class="{'has-errors': errors.email}"
                            />
                            <ErrorMessage class="error" name="email"></ErrorMessage>
                        </div>
                        <div class="form-group mb-0">
                            <button class="btn" type="submit" :disabled="isDisabled">
                                Надіслати
                            </button>
                        </div>
                    </form>
                </div>
            </client-only>
        </div>
        <div v-else class="contact-form-message">
            <div class="contact-form-title">
                Дякуємо за звернення!
            </div>
            <div class="contact-form-answer">
                Ми неодмінно відповімо
            </div>
            <img
                alt=""
                height="160"
                loading="lazy"
                src="/images/bg-contact-form.svg?url"
                width="200"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from '#app';
import { ErrorMessage, Field, Form, useForm } from 'vee-validate';
import { ref, watch } from 'vue';
import { object, string } from 'yup';
import { errorMessages } from '../utils/validators';

const { $client } = useNuxtApp();
const email = ref($client.value?.email);
const name = ref($client.value?.name);

watch($client, () => {
    email.value = $client.value?.email;
    name.value = $client.value?.name;
});

const { errors, handleSubmit } = useForm({
    validationSchema: object({
        email: string().required(errorMessages.required).email(errorMessages.email),
        name: string().required(errorMessages.required),
        message: string().required(errorMessages.required).min(10, errorMessages.massageMin).max(250, errorMessages.massageMax),
    }),
});

const isDisabled = ref(false);
const isSend = ref(false);
const serverError = ref(false);
const id = 'incoming';

const { public: { apiBase } } = useRuntimeConfig();

const send = handleSubmit(async ({ email, name, message }) => {
    try {
        isDisabled.value = true;
        await $fetch(`/frontend/tickets/${id}`, {
            baseURL: apiBase,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: { email, name, message },
            async onResponse({ response }) {
                if (!response.ok) {
                    let error = '';
                    switch (response.status) {
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
        serverError.value = error;
    } finally {
        isDisabled.value = false;
    }
});
</script>

<style lang="scss">

.contact-form {

    &-title {
        margin-bottom: 20px;
        font-weight: 700;
        font-size: 21px;
        line-height: 28px;
    }

    &-subtitle {
        margin-bottom: 15px;
        font-size: 19px;
        color: #F1C40F;
    }

    &-answer {
        font-size: 16px;
        color: #000000;
        margin-top: -10px;
    }

    &-fields {
        padding-top: 30px;
        padding-bottom: 30px;
        border-top: 1px solid #EDEDEF;
    }

    .form-group {
        margin-bottom: 25px;

        &:last-child {
            margin-bottom: 0;
        }

        textarea {
            min-height: 140px;

            @include placeholder() {
                font-family: $font-family;
                font-size: 14px;
                font-weight: 400;
                line-height: 16px;
                color: #7A7B7D;
            }
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
        img {
            display: block;
            margin: 50px auto 0;
        }
    }
}
</style>
