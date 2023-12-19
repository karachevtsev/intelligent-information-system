<template>
    <div class="content">
        <client-only>
            <div class="content-box">
                <div class="box box-stretch">
                    <div class="box-header box-header-left">
                        <h1 class="title-bordered">Зміна email</h1>
                    </div>
                    <div class="box-profile register-done">
                        <p class="register-done-title">Вітаємо!</p>
                        <p class="register-done-text">
                            Основний e-mail було змінено, авторизуйтесь повторно для переходу до кабінету.
                        </p>
                        <Image name="auth-image" alt=""/>
                        <span class="btn btn-profile" @click="$bus.$emit('openLoginModal', { open: true, tab: 'login' });">Авторизуватись</span>
                    </div>
                </div>
            </div>
        </client-only>
    </div>
</template>

<script lang='ts' setup>
import { useNuxtApp } from '#app';
import { watch } from 'vue';
import Image from '~/components/Image.vue';

const { $client, $bus } = useNuxtApp();

watch($client, () => {
    if ($client.value) {
        navigateTo({
            path: '/',
            replace: true,
        });
    }
});
</script>
