<template>
    <ContentBase>
        <div class="box-header box-header-left">
            <h1 class="title-bordered">Поновлення паролю</h1>
        </div>
        <div class="box-profile restore">
            <template v-if="!isSend">
                <p class="restore-text text-center">Вкажіть ваш правильний e-mail, натисніть на кнопку
                    <br>
                    нижче та перейдіть за посиланням, яке надійде
                    <br>
                    на вказану електронну пошту
                </p>
                <Image name="password-image"/>
                <div class="restore-form">
                    <form @submit.prevent="send">
                        <div class="profile-row">
                            <div class="profile-field profile-field-reset">
                                <label for="email"
                                       class="form-label"
                                >
                                    E-mail:
                                </label>
                            </div>
                            <div class="profile-value">
                                <Field
                                    v-model="email"
                                    :class="{'has-errors': errors.email}"
                                    id="email"
                                    class="form-control"
                                    name="email"
                                    placeholder="Пошта"
                                    type="email"
                                />
                                <ErrorMessage class="error" name="email"></ErrorMessage>
                                <div v-if="serverError" class="error">{{ serverError }}</div>
                            </div>
                        </div>
                        <div class="profile-row">
                            <button class="btn btn-profile" type="submit" :disabled="isDisabled">
                                Поновити пароль
                            </button>
                        </div>
                    </form>
                </div>
            </template>
            <template v-else>
                <div class="profile-register-title text-center">Вже майже все!</div>
                <div class="profile-register-text text-center">
                    Ми відправили лист на адресу <span class="auth-form-email">{{ email }}</span>
                    із посиланнями для поновлення паролю.
                    <br>
                    <br>
                    Якщо ви не отримали листа протягом декількох хвилин, перевірте папки «Промо» і «Спам», або зверніться до вашого
                    системного адміністратора.
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
import { ErrorMessage, Field, useForm } from 'vee-validate';
import { ref } from 'vue';
import { object, string } from 'yup';
import { errorMessages } from 'dtkt-shared/utils/validators';
import Image from '~/components/Image.vue';

const { public: { apiBase } } = useRuntimeConfig();
const isDisabled = ref(false);
const isSend = ref(false);
const serverError = ref('');
const email = ref('');

const { errors, handleSubmit } = useForm({
    validationSchema: object({
        email: string().required(errorMessages.required).email(errorMessages.email),
    }),
});

const send = handleSubmit(async ({ email }) => {
    try {
        isDisabled.value = true;
        serverError.value = '';
        await $fetch<{ data: { data: any } }>('/clients/restore', {
            baseURL: apiBase,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: JSON.stringify({ email }),
            async onResponse({ response }) {
                if (!response.ok) {
                    let error = '';
                    switch (response.status) {
                        case 422:
                            error = 'Користувача з вказаним e-mail не знайдено';
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

<style lang='scss'>
.restore {
    &-text {
        font-size: 18px;
    }

    &-form {
        display: flex;
        justify-content: center;
    }

    .btn {
        margin: 0 auto;
    }
}
</style>
