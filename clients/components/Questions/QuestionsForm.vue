<template>
    <div class="questions-service">
        <template v-if="!isSend">
            <div class="questions-service-headline">
                <b>Поставити запитання</b>
                консультантам редакції «Дебет-Кредит»
            </div>
            <Image name="password-done" alt="Поставити запитання"/>
            <div class="questions-service-text">
                <p>Ми відповідаємо на запитання з податкового та бухгалтерського обліку, правових питань організації та ведення бізнесу, а також
                    кадрового
                    діловодства.</p>
                <p>Консультації надаються згідно з
                    <NuxtLink to="/consulting_abt" target="_blank" rel="">правилами</NuxtLink>
                    , розміщеними на нашому сайті.
                </p>
            </div>
            <div class="questions-service-btn-row mb-30">
                <NuxtLink to="/consulting_abt" target="_blank" rel="" class="btn btn-profile">Правила користування сервісом</NuxtLink>
                <button type="button" class="btn btn-profile" @click="$emit('toQuestions')">До списку моїх запитань</button>
            </div>
            <div class="questions-service-form question-form">
                <div class="question-form-title">Моє запитання</div>
                <div class="question-form-info">
                    Перш ніж поставити запитання, радимо скористатися пошуком на сайті за ключовими словами,
                    <NuxtLink to="https://consulting.dtkt.ua/rubrics" target="_blank" rel="">рубриками</NuxtLink>
                    чи
                    <NuxtLink to="https://consulting.dtkt.ua/tags" target="_blank" rel="">тегами</NuxtLink>
                </div>
                <form @submit.prevent="send">
                    <div class="form-group">
                        <label class="form-label" for="subject">1. Введіть тему запитання (наприклад: ПДВ, прибуток, єдиний податок)
                        </label>
                        <Field
                            id="subject"
                            class="form-control"
                            name="subject"
                            placeholder="Тема"
                            type="text"
                            :class="{'has-errors': errors.subject}"
                        />
                        <ErrorMessage class="error" name="subject"></ErrorMessage>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="question">2. Сформулюйте текст запитання (максимально чітко)</label>
                        <Field as="textarea"
                               class="form-control"
                               id="question"
                               name="body"
                               placeholder="Ваше запитання (текст запитання повинен містити від 10 до 2500 символів)"
                               :class="{'has-errors': errors.body}"
                        />
                        <ErrorMessage class="error" name="body"></ErrorMessage>
                    </div>
                    <div class="form-group">
                        <p>3. Перевірте актуальність своїх даних (та за потреби відредагуйте ім'я та номер телефону)</p>
                        <div class="form-group-columns">
                            <div class="form-group">
                                <label class="form-label d-none" for="name">Ім’я</label>
                                <Field v-model="name"
                                       id="name"
                                       class="form-control"
                                       name="name"
                                       placeholder="Ім’я"
                                       type="text"
                                       :class="{'has-errors': errors.name}"
                                />
                                <ErrorMessage class="error" name="name"></ErrorMessage>
                            </div>
                            <div class="form-group">
                                <label for="phone" class="form-label d-none">Мобільний телефон</label>
                                <Phone v-model="phone"
                                       name="phone"
                                       id="phone"
                                       placeholder="Мобільний телефон"
                                       :class="{'has-errors': errors.phone}"
                                />
                                <ErrorMessage class="error" name="phone"></ErrorMessage>
                            </div>
                        </div>
                    </div>
                    <div class="form-group-btn">
                        <button class="btn btn-profile" type="submit" :disabled="isDisabled">
                            Надіслати запитання
                        </button>
                    </div>
                    <div class="form-group">
                        <label class="form-check">
                            <input class="form-check-input"
                                   type="checkbox"
                                   v-model="checked"
                            >
                            <Field type="hidden"
                                   name="isphone"
                                   v-model="isPhone"
                            />
                            <span class="form-check-label">
                            <b>Прошу за можливості надати письмову відповідь.</b>
                            (Вказана опція залежить від поточної завантаженості консультантів редакції; ми повідомимо вас про таку можливість протягом двох діб).
                        </span>
                        </label>
                    </div>
                </form>
            </div>
        </template>
        <template v-else>
            <div class="questions-service-headline">
                <b>Дякуємо!</b>
            </div>
            <Image name="question-done" alt=""/>
            <div class="questions-service-text text-lg">
                <p v-if="checked">Ваше запитання перебуває на розгляді у консультантів редакції «Дебет-Кредит». Після перевірки на відповідність до
                    правил ви
                    отримаєте відповідь електронною поштою на адресу
                    <NuxtLink :to="`mailto:${$client?.email }`">{{ $client?.email }}</NuxtLink>
                    .
                </p>
                <p v-else>
                    Ваше запитання перебуває на розгляді у консультантів редакції «Дебет-Кредит». Після перевірки на відповідність до правил вам
                    зателефонують протягом робочого дня.
                </p>
                <p>Усі поставленні вами запитання та відповіді на них ви можете бачити у своєму Особистому кабінеті, розділ
                    <NuxtLink to="/questions" @click="$emit('toQuestions')">«Запитання до редакції»</NuxtLink>
                </p>
            </div>
            <div class="questions-service-btn-row">
                <NuxtLink :to="CONSULTING_URL" target="_blank" rel="" class="btn btn-profile">Перейти на сайт «Консультації»</NuxtLink>
                <button type="button" class="btn btn-profile" @click="$emit('toQuestions')">До списку моїх запитань</button>
            </div>
        </template>
    </div>
</template>

<script lang='ts' setup>
import { useNuxtApp } from '#app';
import { configure, ErrorMessage, Field, Form, useForm } from 'vee-validate';
import { ref, watch } from 'vue';
import * as Yup from 'yup';
import { errorMessages } from 'dtkt-shared/utils/validators';
import Phone from 'dtkt-shared/components/Phone';
import { CONSULTING_URL } from 'dtkt-shared/constants/index.js';

configure({
    validateOnInput: false,
    validateOnChange: false,
    validateOnBlur: false,
    validateOnModelUpdate: false,
});

const { $client } = useNuxtApp();
const name = ref($client.value?.name);
const phone = ref($client.value?.phone);
const checked = ref(false);
const isPhone = ref(1);
const { public: { apiBase } } = useRuntimeConfig();
const isSend = ref(false);
const serverError = ref('');
const isDisabled = ref(false);

watch(checked, () => {
    isPhone.value = checked.value ? 0 : 1;
});

watch($client, () => {
    name.value = $client.value?.name;
    phone.value = $client.value?.phone;
});

const { errors, handleSubmit } = useForm({
    validationSchema: Yup.object({
        subject: Yup.string().required(errorMessages.required),
        body: Yup.string().required(errorMessages.required).min(10, errorMessages.massageMin).max(2500, errorMessages.massageMax),
        name: Yup.string().required(errorMessages.required),
        phone: Yup.string().required(errorMessages.required),
    }),
});

const send = handleSubmit(async ({ subject, body, name, phone, isphone }) => {
    try {
        isDisabled.value = true;
        await $fetch('/consulting/questions', {
            baseURL: apiBase,
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
            },
            body: {
                subject,
                body,
                name,
                phone,
                isphone,
            },
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
        serverError.value = <string>error;
    } finally {
        isDisabled.value = false;
    }
});
</script>

<style lang='scss'>
.questions-service {
    &-headline {
        margin-bottom: 40px;
        font-size: 21px;
        text-align: center;

        b {
            display: block;
            font-weight: 700;
        }
    }

    &-text {
        max-width: 780px;
        margin: 0 auto 30px;
        text-align: center;

        p {
            font-size: 16px;

            &:last-child {
                margin-bottom: 0;
            }
        }

        &.text-lg {
            p {
                margin-bottom: 20px;
                font-size: 18px;
            }
        }
    }

    &-btn {
        margin-bottom: 50px;
        text-align: center;
    }

    &-btn-row {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        @include laptop-xl() {
            flex-direction: row;
        }

        .btn-profile {
            width: 280px;

            + .btn-profile {
                margin-top: 20px;

                @include laptop-xl() {
                    margin-top: 0;
                    margin-left: 30px;
                }
            }
        }
    }
}

.question-form {
    padding: 20px;
    max-width: 700px;
    margin: 0 auto;
    background: #F4F4F4;
    border-radius: 16px;

    @include laptop-xl() {
        padding: 30px;
    }

    &-title {
        margin-bottom: 10px;
        font-weight: 600;
        font-size: 21px;
        color: #DE4747;

        @include laptop-xl() {
            font-size: 34px;
        }
    }

    &-info {
        margin-bottom: 30px;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #999999;

        @include laptop-xl() {
            margin-bottom: 40px;
        }
    }

    .form-group {
        margin-bottom: 30px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .form-group-btn {
        margin-bottom: 30px;
        text-align: center;
    }

    .form-label {
        display: block;
        margin-bottom: 10px;
        font-size: 16px;
        line-height: 19px;
        font-weight: 400;
        color: #000000;

        &.d-none {
            display: none;
        }
    }

    .form-group-columns {

        @include laptop-xl() {
            display: flex;
            justify-content: space-between;
            margin-left: -20px;
            margin-right: -20px;
        }

        .form-group {
            flex: 1;
            margin-bottom: 20px;

            @include laptop-xl() {
                margin: 0 20px;
            }
        }
    }

    textarea {
        min-height: 240px;
        resize: vertical;
        font-family: $font-family;
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
        color: #7A7B7D;

        @include laptop-lg() {
            min-height: 160px;
        }

        @include placeholder() {
            font-family: $font-family;
            font-size: 14px;
            font-weight: 400;
            line-height: 16px;
            color: #7A7B7D;
        }
    }

    .form-check {
        font-size: 14px;
        line-height: 16px;
        color: #999999;
        font-style: italic;

        b {
            font-weight: 700;
        }

        input {
            margin-right: 10px;
        }
    }
}
</style>
