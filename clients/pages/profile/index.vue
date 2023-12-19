<template>
    <ContentBase>
        <div class="box-header box-header-left">
            <h1 class="title-bordered">Особисті дані</h1>
        </div>
        <div class="box-profile profile">
            <div class="profile-row-avatar">
                <div class="profile-field">Аватар:</div>
                <div class="profile-value">
                    <img :src="clientAvatar" class="img-rounded" alt="" width="130" height="130">
                    <div class="profile-value-manage">
                        <label class="btn btn-profile">
                            <input style="display: none;"
                                   name="avatar"
                                   type="file"
                                   accept="image/*"
                                   @change="changeAvatar"
                            >
                            Змінити аватар
                        </label>
                        <button class="btn btn-profile btn-profile-delete" @click="deleteAvatar">Видалити аватар</button>
                    </div>
                </div>
            </div>
            <form @submit.prevent="send">
                <div class="profile-row profile-nickname">
                    <div class="profile-field">
                        Нікнейм:
                        <span>використовується для <br> коментарів на сайті</span>
                    </div>
                    <div class="profile-value">
                        <Field v-model="profile.nickname"
                               :class="{'has-errors': errors.nickname}"
                               name="nickname"
                               type="text"
                               class="form-control"
                        />
                        <ErrorMessage class="error" name="nickname"></ErrorMessage>
                    </div>
                </div>
                <div class="profile-row">
                    <div class="profile-field">
                        E-mail:
                    </div>
                    <div class="profile-value">
                        <Field v-model="profile.email"
                               name="email"
                               type="text"
                               class="form-control bg-readonly"
                               readonly
                        />
                    </div>
                </div>
                <div class="profile-row-btn profile-email-change">
                    <button type="button" class="btn btn-profile" @click="changeEmail">Змінити пошту</button>
                </div>
                <div class="profile-row">
                    <div class="profile-field">
                        Прізвище:
                    </div>
                    <div class="profile-value">
                        <Field v-model="profile.info.surname"
                               :class="{'has-errors': errors.surname}"
                               name="surname"
                               type="text"
                               class="form-control"
                        />
                        <ErrorMessage class="error" name="surname"></ErrorMessage>
                    </div>
                </div>
                <div class="profile-row">
                    <div class="profile-field">
                        Ім’я:
                    </div>
                    <div class="profile-value">
                        <Field v-model="profile.info.name"
                               :class="{'has-errors': errors.name}"
                               name="name"
                               type="text"
                               class="form-control"
                        />
                        <ErrorMessage class="error" name="name"></ErrorMessage>
                    </div>
                </div>
                <div class="profile-row">
                    <div class="profile-field">
                        По батькові:
                    </div>
                    <div class="profile-value">
                        <Field v-model="profile.info.patronymic"
                               name="patronymic"
                               type="text"
                               class="form-control"
                        />
                    </div>
                </div>
                <div class="profile-row">
                    <div class="profile-field">
                        Телефон:
                    </div>
                    <div class="profile-value">
                        <Phone v-model="clientPhone"
                               name="phone"
                               :class="{'has-errors': errors.phone}"
                        />
                        <ErrorMessage class="error" name="phone"></ErrorMessage>
                    </div>
                </div>
                <div class="profile-row-btn">
                    <button class="btn btn-profile" type="submit">Зберегти дані</button>
                </div>
            </form>
        </div>
        <ModalOffCanvas v-model="isShowChangeEmailModal" title="Зміна e-mail">
            <ChangeEmail/>
        </ModalOffCanvas>
    </ContentBase>
</template>

<script lang="ts" setup>
import { useNuxtApp } from '#app';
import ModalOffCanvas from 'dtkt-shared/components/ModalOffCanvas';
import Phone from 'dtkt-shared/components/Phone';
import toast from 'dtkt-shared/components/toast';
import { errorMessages } from 'dtkt-shared/utils/validators';
import { ErrorMessage, Field, useForm } from 'vee-validate';
import { ref } from 'vue';
import * as Yup from 'yup';

definePageMeta({
    middleware: 'auth',
});

const { $client, $updateClient } = useNuxtApp();
const { public: { apiBase } } = useRuntimeConfig();
const isShowChangeEmailModal = ref(false);

const getClientData = async () => {
    const { data: data } = await $fetch<any>('/clients/profile', {
        method: 'GET',
        baseURL: apiBase,
        credentials: 'include',
    });

    return data;
};

const profile = ref(await getClientData() ?? null);
const clientAvatar = ref(profile.value?.avatar ?? '/images/profile-img.svg?url');
const clientPhone = ref(profile.value?.phones[0]?.phone);

const deleteAvatar = async () => {
    try {
        const form = new FormData();
        form.append('_method', 'delete');
        await $fetch<any>('/clients/avatar', {
            baseURL: apiBase,
            method: 'POST',
            credentials: 'include',
            body: form,
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
                clientAvatar.value = '/images/profile-img.svg';
                toast.success(`${response._data.message}`);
                await $updateClient();
            },
        });
    } catch (error) {
        toast.error(<string>error);
    }
};

const changeAvatar = async (e: { target: { files: any; }; }) => {
    const avatar = e.target.files[0];
    const form = new FormData();
    form.append('avatar', avatar);
    try {
        await $fetch('/clients/avatar', {
            baseURL: apiBase,
            method: 'POST',
            credentials: 'include',
            body: form,
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
                clientAvatar.value = response._data.url;
                await $updateClient();
                toast.success(`Дякуємо! ${response._data.message}`);
            },
        });
    } catch (error) {
        toast.error(<string>error);
    }
};

const changeEmail = () => {
    isShowChangeEmailModal.value = true;
};

const { errors, handleSubmit, setFieldError } = useForm({
    validationSchema: Yup.object({
        surname: Yup.string().required(errorMessages.required).nullable(),
        name: Yup.string().required(errorMessages.required),
        phone: Yup.string().required(errorMessages.required),
    }),
});

const send = handleSubmit(async ({ nickname, surname, name, patronymic, phone }) => {
    const clientPhone = (profile.value?.phones[0].phone).replace(/\D/g, '');
    const phones = <any>ref([]);

    if (clientPhone == phone.replace(/\D/g, '')) {
        phones.value = [
            { id: profile.value.phones[0].id, phone: phone },
        ];
    } else {
        phones.value = [
            { id: profile.value.phones[0].id, delete: true },
            { phone: phone },
        ];
    }

    try {
        await $fetch('/clients/profile', {
            baseURL: apiBase,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                nickname,
                phones: phones.value,
                info: {
                    name,
                    surname,
                    patronymic,
                },
            }),
            async onResponse({ response }) {
                if (!response.ok) {
                    let error = '';
                    switch (response.status) {
                        case 429:
                            error = 'Забагато спроб, спробуйте через 1 хв.';
                            break;
                        case 422:
                            const entries = Object.entries(response._data.errors);
                            entries.forEach(([key, value]) => {
                                setFieldError(`${key}`, `${value}`);
                            });
                            error = 'Упс, щось пішло не так.';
                            break;
                        default:
                            error = 'Упс, щось пішло не так. Спробуйте пізніше.';
                    }
                    return Promise.reject(error);
                }
                await $updateClient();
            },
        })
            .then(() => toast.success('Дякуємо! Ваші дані оновлено'))
            .then(() => {
                navigateTo({
                    path: '/',
                    replace: true,
                });
            });
    } catch (error) {
        toast.error(error as string);
    }
});
</script>
