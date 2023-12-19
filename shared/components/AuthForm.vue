<template>
    <div :id="props.id" class="auth-form">
        <div class="auth-form-title">Ви вже зареєстровані?</div>
        <div class="auth-form-subtitle">Будь ласка, авторизуйтесь, заповнивши поля нижче.</div>
        <div class="auth-form-fields">
            <form @submit.prevent="send">
                <div class="form-group">
                    <label :for="`email-${props.id}`"
                           class="form-label"
                    >
                        E-mail <sup>*</sup>
                    </label>
                    <Field :id="`email-${props.id}`"
                           class="form-control"
                           name="email"
                           placeholder="Пошта"
                           type="email"
                           :class="{'has-errors': errors.email}"
                    />
                    <ErrorMessage class="error" name="email"></ErrorMessage>
                    <div class="error" v-if="serverError">{{ serverError }}</div>
                </div>
                <div class="form-group">
                    <label :for="`password-${props.id}`"
                           class="form-label"
                    >
                        Пароль <sup>*</sup>
                    </label>
                    <Field :id="`password-${props.id}`"
                           class="form-control"
                           name="password"
                           placeholder="Пароль"
                           type="password"
                           :class="{'has-errors': errors.password}"
                    />
                    <ErrorMessage class="error" name="password"/>
                </div>
                <div class="form-group form-group-check">
                    <div class="form-check">
                        <input :id="`remember-${props.id}`" checked class="form-check-input" type="checkbox">
                        <label :for="`remember-${props.id}`" class="form-check-label">
                            Запам’ятати дані
                        </label>
                    </div>
                    <NuxtLink to="https://my.dtkt.ua/restore">Забули пароль?</NuxtLink>
                </div>
                <div class="form-group mb-0">
                    <button class="btn" type="submit" :disabled="isDisabled">
                        Увійти
                    </button>
                </div>
            </form>
        </div>
        <div class="auth-form-social">
            <p>Або авторизуйтесь за допомогою свого аккаунта в соціальних мережах</p>
            <ul>
                <li v-if="hide">
                    <button type="button" @click="$socialLogin('facebook')">
                        <svg fill="none" height="40" viewBox="0 0 40 40" width="40" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" fill="#1877F2" r="20"/>
                            <path clip-rule="evenodd"
                                  d="M27.7846 25.7805L28.6714 19.999H23.1242V16.2472C23.1242 14.6655 23.899 13.1237 26.3837 13.1237H28.9058V8.20168C28.9058 8.20168 26.6169 7.81104 24.4286 7.81104C19.8599 7.81104 16.8738 10.5799 16.8738 15.5926V19.999H11.7954V25.7805H16.8738V39.7568C17.8921 39.9166 18.9358 39.9998 19.999 39.9998C21.0622 39.9998 22.1059 39.9166 23.1242 39.7568V25.7805H27.7846"
                                  fill="white"
                                  fill-rule="evenodd"/>
                        </svg>
                    </button>
                </li>
                <li>
                    <button type="button" @click="$socialLogin('google')">
                        <svg fill="none" height="40" viewBox="0 0 40 40" width="40" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" fill="#EDEDEF" r="20"/>
                            <path
                                d="M32.5 20.3001C32.5 19.4223 32.423 18.5889 32.291 17.7778H19.8638V22.7889H26.9792C26.6603 24.4334 25.7255 25.8223 24.3398 26.7667V30.1001H28.5849C31.0703 27.7778 32.5 24.3556 32.5 20.3001Z"
                                fill="#4285F4"/>
                            <path
                                d="M19.8634 33.3333C23.4266 33.3333 26.4069 32.1333 28.5845 30.1L24.3394 26.7667C23.1517 27.5667 21.645 28.0555 19.8634 28.0555C16.4211 28.0555 13.5068 25.7111 12.462 22.5444H8.08496V25.9778C10.2515 30.3333 14.7055 33.3333 19.8634 33.3333Z"
                                fill="#34A853"/>
                            <path
                                d="M12.4622 22.5442C12.1873 21.7442 12.0443 20.8886 12.0443 19.9998C12.0443 19.1109 12.1983 18.2553 12.4622 17.4553V14.022H8.08519C7.18339 15.822 6.6665 17.8442 6.6665 19.9998C6.6665 22.1553 7.18339 24.1775 8.08519 25.9775L12.4622 22.5442Z"
                                fill="#FBBC05"/>
                            <path
                                d="M19.8634 11.9443C21.81 11.9443 23.5476 12.6221 24.9223 13.9443L28.6834 10.1443C26.4069 7.98873 23.4266 6.6665 19.8634 6.6665C14.7055 6.6665 10.2515 9.6665 8.08496 14.0221L12.462 17.4554C13.5068 14.2887 16.4211 11.9443 19.8634 11.9443Z"
                                fill="#EA4335"/>
                        </svg>
                    </button>
                </li>
                <li v-if="hide">
                    <button type="button" @click="$socialLogin('linkedin')">
                        <svg fill="none" height="40" viewBox="0 0 40 40" width="40" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" fill="#0A66C2" r="20"/>
                            <path
                                d="M30.8315 29.1668H26.6905V22.6706C26.6905 21.1214 26.6629 19.1273 24.5368 19.1273C22.38 19.1273 22.05 20.815 22.05 22.5577V29.1663H17.9092V15.8074H21.8844V17.633H21.9402C22.7496 16.2467 24.2601 15.4156 25.8624 15.4752C30.0594 15.4752 30.8333 18.2406 30.8333 21.8383L30.8315 29.1668Z"
                                fill="white"/>
                            <path
                                d="M13.2371 13.9809C13.2368 13.9809 13.2367 13.9809 13.2366 13.9809C11.9183 13.9809 10.8335 12.8944 10.8335 11.5738C10.8335 10.2532 11.9183 9.1665 13.2366 9.1665C14.5547 9.1665 15.6394 10.2529 15.6396 11.5733C15.6396 11.5734 15.6396 11.5735 15.6396 11.5738C15.6396 12.8941 14.5551 13.9808 13.2371 13.9809Z"
                                fill="white"/>
                            <path d="M15.3073 29.1666H11.1621V15.8071H15.3073V29.1666Z" fill="white"/>
                        </svg>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useNuxtApp } from '#app';
import { ref } from 'vue';
import { ErrorMessage, Field, Form, useForm } from 'vee-validate';
import { boolean, object, string } from 'yup';
import { errorMessages } from '../utils/validators';

const props = defineProps({
    id: String,
});

const hide = ref(false);

const { errors, handleSubmit } = useForm({
    validationSchema: object({
        email: string().required(errorMessages.required).email(errorMessages.email),
        password: string().required(errorMessages.required).min(6, errorMessages.password),
        remember: boolean(),
    }),
    initialValues: {
        remember: true,
    },
});

const serverError = ref('');
const { $login } = useNuxtApp();
const isDisabled = ref(false);

const send = handleSubmit(async ({ email, password, remember }) => {
    await $login(email!, password!, remember).then((response: number | object) => {
        if (typeof response === 'number') {
            switch (response) {
                case 429:
                    serverError.value = 'Забагато спроб авторизації, спробуйте через 5 хв.';
                    break;
                case 401:
                    serverError.value = 'Невірний логін або пароль.';
                    break;
                default:
                    serverError.value = 'Упс, щось пішло не так. Спробуйте пізніше.';
            }
        }
    });
});
</script>
