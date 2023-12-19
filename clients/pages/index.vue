<template>
    <ContentBase>
        <div class="box-header box-header-left">
            <h1 class="title-bordered">Особисті дані</h1>
        </div>
        <div v-if="profile" class="box-profile profile">
            <div class="profile-row-avatar">
                <div class="profile-field">Аватар:</div>
                <div class="profile-value">
                    <img :src="profile.avatar ?? `/images/profile-img.svg`" class="img-rounded" alt="" width="130"
                         height="130">
                </div>
            </div>
            <div v-if="profile.nickname" class="profile-row profile-nickname">
                <div class="profile-field">
                    Нікнейм:
                    <span>використовується для <br> коментарів на сайті</span>
                </div>
                <div class="profile-value">
                    <input type="text" class="form-control" :value="profile.nickname" readonly>
                </div>
            </div>
            <div class="profile-row">
                <div class="profile-field">
                    E-mail:
                </div>
                <div class="profile-value">
                    <input type="text" class="form-control" :value="profile.email" readonly>
                </div>
            </div>
            <div v-if="profile.info?.surname" class="profile-row">
                <div class="profile-field">
                    Прізвище:
                </div>
                <div class="profile-value">
                    <input type="text" class="form-control" :value="profile.info?.surname" readonly>
                </div>
            </div>
            <div v-if="profile.info?.name" class="profile-row">
                <div class="profile-field">
                    Ім’я:
                </div>
                <div class="profile-value">
                    <input type="text" class="form-control" :value="profile.info?.name" readonly>
                </div>
            </div>
            <div v-if="profile.info?.patronymic" class="profile-row">
                <div class="profile-field">
                    По батькові:
                </div>
                <div class="profile-value">
                    <input type="text" class="form-control" :value="profile.info?.patronymic" readonly>
                </div>
            </div>
            <div v-if="profile.phones.length" class="profile-row">
                <div class="profile-field">
                    Телефон:
                </div>
                <div class="profile-value">
                    <input type="text" class="form-control" :value="profile.phones[0].phone" readonly>
                </div>
            </div>
            <div class="profile-row-btn">
                <NuxtLink to="/profile" class="btn btn-profile">Змінити дані</NuxtLink>
                <NuxtLink to="/delete" class="btn btn-profile-deactivate-link">Видалити аккаунт</NuxtLink>
            </div>
        </div>
    </ContentBase>
</template>

<script lang="ts" setup>
import { useNuxtApp } from '#app';
import { ref } from 'vue';

definePageMeta({
    middleware: 'auth',
});

const { $client } = useNuxtApp();
const { public: { apiBase } } = useRuntimeConfig();

const data = await $fetch<any>('/clients/profile', {
    method: 'GET',
    baseURL: apiBase,
    credentials: 'include',
});

const profile = ref(data.data ?? null);
</script>
