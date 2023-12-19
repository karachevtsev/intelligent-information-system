<template>
    <div class="profile-login">
        <Image
            alt="Авторизуйтесь або зареєструйтесь"
            name="auth-image"
        />
        <p v-if="authOrLogin">
            Для доступу до своїх даних
            <br>
            вам необхідно <span @click="openLoginModal({open: true, tab: 'login'})">Увійти</span> або <span
            @click="openLoginModal({open: true, tab: 'register'})">Зареєструватись</span>.
        </p>
        <p v-else>
            Для видалення аккаунту на сайті «Дебет-Кредит»
            <br>
            спочатку <span @click="openLoginModal({open: true, tab: 'login'})">авторизуйтесь</span>
        </p>
    </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from '#app';

const props = withDefaults(
    defineProps<{
        authOrLogin?: boolean
    }>(),
    {
        authOrLogin: true
    }
);

const { $bus } = useNuxtApp();

const openLoginModal = (options: object) => {
    $bus.$emit('openLoginModal', options);
};
</script>
