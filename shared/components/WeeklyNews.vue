<template>
    <div class="weekly-news" :class="props.id">
        <h2>Головне за тиждень</h2>
        <p>від редакції «Дебет-Кредит»</p>
        <div v-if="result === 'initial'" class="weekly-news-form">
            <form @submit.prevent="send">
                <label :for="id" class="form-label">Кожного понеділка на Ваш e-mail</label>
                <div class="form-group">
                    <Field name="email"
                           type="email"
                           class="form-control"
                           :id="id"
                           placeholder="Введіть e-mail"
                           :class="{'has-errors': errors.email}"
                    />
                    <Field type="hidden"
                           name="source"
                           :value="id === 'weekly-top' ? 'weeklyletter-top' : 'weeklyletter-footer'"
                    />
                    <Field type="hidden"
                           name="template"
                           value="weekly"
                    />
                    <Field type="hidden"
                           name="mailing"
                           value="7"
                    />
                    <button type="submit">
                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.49268 10.502V21.877C4.49268 22.109 4.58486 22.3316 4.74896 22.4957C4.91305 22.6598 5.13561 22.752 5.36768 22.752H24.6177C24.8497 22.752 25.0723 22.6598 25.2364 22.4957C25.4005 22.3316 25.4927 22.109 25.4927 21.877V10.502L14.9927 3.50195L4.49268 10.502Z"
                                stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.0835 16.627L4.76245 22.5047" stroke="white" stroke-width="1.5" stroke-linecap="round"
                                  stroke-linejoin="round"/>
                            <path d="M25.2231 22.5047L16.9019 16.627" stroke="white" stroke-width="1.5" stroke-linecap="round"
                                  stroke-linejoin="round"/>
                            <path d="M25.4927 10.502L16.9018 16.627H13.0835L4.49268 10.502" stroke="white" stroke-width="1.5" stroke-linecap="round"
                                  stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <ErrorMessage name="email" class="error"/>
            </form>
        </div>
        <template v-else>
            <div v-if="result" class="weekly-news-message">
                <span>Вітаємо!</span>
                <p>Залишилось тільки підтвердити підписку на розсилку (перевірте вашу поштову скриньку) – і вже найближчого понеділка ви отримаєте
                    перший лист від редакції</p>
            </div>
            <div v-else class="weekly-news-message">
                <span>Дякуємо!</span>
                <p>Але ви вже отримуєте щотижневу розсилку від «Дебету-Кредиту»</p>
            </div>
        </template>
    </div>
</template>

<script setup>
import {Field, Form, ErrorMessage, useForm} from 'vee-validate';
import {object, string} from 'yup';
import {errorMessages} from "../utils/validators";
import {ref} from 'vue'

const props = defineProps({
    id: String
})

let result = ref('initial');

const {errors, handleSubmit} = useForm({
    validationSchema: object({
        email: string().required(errorMessages.required).email(errorMessages.email),
    }),
});

const send = handleSubmit(async (values) => {
    result.value = await $fetch('https://my.dtkt.ua/mailing/subscribe', {
        method: 'POST',
        body: values,
    })
        .then(res => res.result)
        .catch(error => {
            console.log(error)
        })
});
</script>
