<template>
    <ContentBase>
        <div class="box-header box-header-left">
            <h1 class="title-bordered">Електронний документообіг</h1>
        </div>
        <div class="box-profile edo">
            <p class="edo-text">Ми використовуємо електронний документообіг для обміну первинними документами з нашими контрагентами.</p>
            <Image name="law-image" alt=""/>
            <h2>1. У системі «M.E.Doc»</h2>
            <p>Для цього із «Головного меню» програми зайдіть у «Первинні документи», далі у «Реєстр первинних документів» де натисніть на піктограму
                «Отримати повідомлення». Програма попросить пароль від печатки шифрування, і після його введення документи з’являться у вашому
                реєстрі.
                Додатково платформа «М.Е.Doc» надішле вам електронного листа-повідомлення про відправлений у систему первинний документ. Підпишіть
                документ за допомогою свого ЕЦП та поверніть нам.</p>
            <h2>2. У веб-сервісі «СОТА»</h2>
            <p>Для цього із «Головного меню» програми зайдіть у «Реєстр первинних документів» де натисніть на піктограму «Оновити». Програма попросить
                пароль від печатки або підпису шифрування, і після його введення документи з’являться у вашому реєстрі. Підпишіть документ за
                допомогою
                свого ЕЦП та поверніть нам.</p>
            <h2>3. У паперовому вигляді</h2>
            <p>Якщо ви не використовуєте жодну з вказаних систем, заповніть замовлення нижче.</p>
            <div v-if="!isSend" class="edo-form">
                <div class="edo-form-title">
                    <h3>
                        <b>Замовлення на отримання документів у паперовому вигляді</b>
                        (за умови відсутності у вас «M.E.Doc» чи «СОТА»)
                    </h3>
                </div>
                <form @submit.prevent="send">
                    <div class="form-group">
                        <label class="form-label" for="edo-email">E-mail<sup>*</sup></label>
                        <Field v-model="email"
                               id="edo-email"
                               class="form-control"
                               name="email"
                               placeholder="Пошта"
                               type="email"
                               :class="{'has-errors': errors.email}"
                        />
                        <ErrorMessage class="error" name="email"></ErrorMessage>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="edo-name">Ім’я<sup>*</sup></label>
                        <Field v-model="name"
                               id="edo-name"
                               class="form-control"
                               name="name"
                               placeholder="Ім’я"
                               type="text"
                               :class="{'has-errors': errors.name}"
                        />
                        <ErrorMessage class="error" name="name"></ErrorMessage>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="edo-code">ЄДРПОУ (або ІПН для ФОП)<sup>*</sup></label>
                        <Field
                            id="edo-code"
                            class="form-control"
                            name="code"
                            placeholder="ЄДРПОУ або ІПН"
                            type="text"
                            :class="{'has-errors': errors.code}"
                        />
                        <ErrorMessage class="error" name="code"></ErrorMessage>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="edo-message">Ваш коментар</label>
                        <Field as="textarea"
                               id="edo-message"
                               class="form-control"
                               maxlength="250"
                               name="message"
                               placeholder="Повідомте нам додаткову інформацію, якщо вважаєте за потрібне (це поле не є обов’язковим)"
                               rows="5"
                               :class="{'has-errors': errors.message}"
                        />
                        <ErrorMessage class="error" name="message"></ErrorMessage>
                        <div v-if="serverError" class="error">{{ serverError }}</div>
                    </div>
                    <div class="form-group">
                        <button class="btn" type="submit" :disabled="isDisabled">
                            Надіслати
                        </button>
                    </div>
                </form>
            </div>
            <div v-else class="edo-success">
                <h4>
                    Ваше замовлення отримано
                    <br>
                    та знаходиться в опрацюванні
                </h4>
            </div>
        </div>
    </ContentBase>
</template>

<script lang='ts' setup>
import { useNuxtApp, useRoute } from '#app';
import { configure, ErrorMessage, Field, Form, useForm } from 'vee-validate';
import { ref, watch } from 'vue';
import * as Yup from 'yup';
import { errorMessages } from 'dtkt-shared/utils/validators';

configure({
    validateOnInput: false,
    validateOnChange: false,
    validateOnBlur: false,
    validateOnModelUpdate: false,
});

const { public: { apiBase } } = useRuntimeConfig();
const isSend = ref(false);
const serverError = ref('');
const isDisabled = ref(false);

const { errors, handleSubmit } = useForm({
    validationSchema: Yup.object({
        name: Yup.string().required(errorMessages.required),
        email: Yup.string().required(errorMessages.required).email(errorMessages.email),
        message: Yup.string().max(250, errorMessages.massageMax),
        code: Yup.string()
            .required(errorMessages.required)
            .matches(
                /^([0-9]{8}|[0-9]{10})$/,
                'Код ЄДРПОУ може містити 8 або 10 цифр',
            ),
    }),
});

const id = 'edo';

const send = handleSubmit(async ({ email, name, message, code }) => {
    try {
        isDisabled.value = true;
        await $fetch(`/frontend/tickets/${id}`, {
            baseURL: apiBase,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                message,
                options: { code },
            }),
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

const { $client } = useNuxtApp();
const email = ref($client.value?.email);
const name = ref($client.value?.name);

watch($client, () => {
    email.value = $client.value?.email;
    name.value = $client.value?.name;
});
</script>

<style lang='scss'>
.edo {
    font-size: 16px;

    &-text {
        margin-bottom: 10px;
        font-size: 18px;
    }

    img {
        margin-top: 50px;
    }

    h2 {
        position: relative;
        display: inline-block;
        font-weight: bold;
        margin-top: 30px;
        margin-bottom: 30px;

        @include laptop-xl() {
            margin-top: 40px;
        }

        &:after {
            content: "";
            display: block;
            height: 5px;
            margin-top: 5px;
            background: #F2C30D;
        }
    }
}

.edo-form {
    max-width: 640px;
    margin-top: 30px;
    padding: 20px 20px 30px;
    color: #00384E;
    background: #E4F7FF;
    border-radius: 16px;

    @include laptop-xl() {
        padding: 30px;
    }

    .form-label {
        display: block;
        color: inherit;

        sup {
            color: #E8132A;
        }
    }

    textarea {
        min-height: 130px;
    }

    .form-control {
        border-color: #D2E5ED;
    }

    &-title {
        display: flex;
        gap: 10px;
        margin-bottom: 30px;
        line-height: 140%;

        h3 {
            font-weight: 400;

            b {
                font-weight: 700;
            }
        }

        &:before {
            content: '';
            flex-shrink: 0;
            width: 42px;
            height: 46px;
            background: url(~/assets/svg/edo-doc.svg) no-repeat center;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }

    .btn {
        width: 125px;
    }
}

.edo-success {
    max-width: 640px;
    margin-top: 30px;
    padding: 40px 25px;
    color: #00384E;
    background: #E4F7FF;
    border-radius: 16px;

    @include laptop-xl() {
        padding: 100px;
    }

    h4 {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 20px;
        font-size: 16px;
        font-weight: 400;
        line-height: 140%;

        &:before {
            content: '';
            flex-shrink: 0;
            width: 42px;
            height: 46px;
            background: url(~/assets/svg/edo-doc.svg) no-repeat center;
        }
    }
}
</style>
