<template>
    <div class="profile">
        <form @submit.prevent="send">
            <div class="profile-row">
                <div class="profile-field">
                    Платник:
                </div>
                <div class="profile-value">
                    <Field v-model="data.payer"
                           :class="{'has-errors': errors.payer}"
                           name="payer"
                           type="text"
                           class="form-control"
                    />
                    <ErrorMessage class="error" name="payer"></ErrorMessage>
                </div>
            </div>
            <div class="profile-row">
                <div class="profile-field">
                    Код ЄДРПОУ:
                </div>
                <div class="profile-value">
                    <Field v-model="data.sub_edrpou"
                           :class="{'has-errors': errors.sub_edrpou}"
                           name="sub_edrpou"
                           type="text"
                           class="form-control"
                    />
                    <ErrorMessage class="error" name="sub_edrpou"></ErrorMessage>
                </div>
            </div>
            <div class="profile-row">
                <div class="profile-field">
                    Канал передплати:
                </div>
                <div class="profile-value">
                    <Field v-model="data.pagency"
                           :class="{'has-errors': errors.pagency}"
                           name="pagency"
                           type="text"
                           class="form-control"
                    />
                    <ErrorMessage class="error" name="pagency"></ErrorMessage>
                </div>
            </div>
            <div class="profile-row">
                <div class="profile-field">
                    Початок передплати:
                </div>
                <div class="profile-value">
                    <Field v-model="selectedStart"
                           name="substart"
                           as="select"
                           class="form-control form-control-select"
                           :class="{'has-errors': errors.substart}"
                    >
                        <option value="" disabled>Оберіть початок передплати</option>
                        <option v-for="date in subStartValues"
                                :value="date.value">
                            {{ date.date }}
                        </option>
                    </Field>
                    <ErrorMessage class="error" name="substart"></ErrorMessage>
                </div>
            </div>
            <div class="profile-row">
                <div class="profile-field">
                    Кількість місяців:
                </div>
                <div class="profile-value">
                    <Field v-model="selectedSubCount"
                           name="subcount"
                           as="select"
                           class="form-control form-control-select"
                           :class="{'has-errors': errors.subcount}"
                    >
                        <option value="" disabled>Оберіть кількість місяців</option>
                        <option v-for="i in 12"
                                :value="i"
                                :key="i"
                        >
                            {{ i }}
                            <Plural :value="i" one=" місяць" few=" місяці" many=" місяців"/>
                        </option>
                    </Field>
                    <ErrorMessage class="error" name="subcount"></ErrorMessage>
                </div>
            </div>
            <div class="profile-row-btn">
                <button class="btn btn-profile" type="submit">Зберегти дані</button>
            </div>
        </form>
    </div>
</template>

<script lang='ts' setup>
import { useRuntimeConfig } from '#app';
import { computed, ref } from 'vue';
import * as Yup from 'yup';
import { ErrorMessage, Field, useForm } from 'vee-validate';
import { errorMessages } from 'dtkt-shared/utils/validators';
import toast from 'dtkt-shared/components/toast';
import { getClientPaperSubscription } from '~/composables/paperSubscription';
import Plural from 'dtkt-shared/components/plural';

const { public: { apiBase } } = useRuntimeConfig();
const { data } = await getClientPaperSubscription();
const selectedSubCount = ref(data.subcount);
const selectedStart = ref(data.substart);
const now = new Date;
const year = now.getFullYear();
const month = now.getMonth();
const dateEnd = year * 12 + month + 12;
const dateStart = dateEnd - 24;

const convertToStartDate = (value: number) => {
    const year = Math.floor(value / 12);
    const month = new Date(year, value % 12, 1).toLocaleDateString('uk-UA', { month: 'long' });

    return `${month} ${year}`;
};

const subStartValues = computed(() => {
    const values: any[] = [];

    if (dateStart > data.substart && data.substart > 0) {
        values.push({
            'value': data.substart,
            'date': convertToStartDate(data.substart),
        });
    }

    for (let i = dateStart; i <= dateEnd; i++) {
        const month = {
            'value': i,
            'date': convertToStartDate(i),
        };

        values.push(month);
    }

    return values;
});

const { errors, handleSubmit } = useForm({
    validationSchema: Yup.object({
        payer: Yup.string().required(errorMessages.required).nullable(),
        sub_edrpou: Yup.string().nullable()
            .required(errorMessages.required)
            .matches(
                /^([0-9]{8}|[0-9]{10})$/,
                'Код ЄДРПОУ може містити 8 або 10 цифр',
            ),
        pagency: Yup.string().required(errorMessages.required).nullable(),
        substart: Yup.string().required(errorMessages.required).nullable(),
        subcount: Yup.string().required(errorMessages.required).nullable(),
    }),
});

const send = handleSubmit(async ({ payer, sub_edrpou, pagency, substart, subcount }) => {

    try {
        await $fetch('/dtkt/paper', {
            baseURL: apiBase,
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                'pagency': {
                    payer,
                    sub_edrpou,
                    pagency,
                    substart,
                    subcount,
                },
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
        })
            .then(() => toast.success('Дякуємо! Ваші дані оновлено'))
            .then(() => {
                navigateTo({
                    path: '/paper',
                    replace: true,
                });
            });
    } catch (error) {
        toast.error(<string>error);
    }
});
</script>
