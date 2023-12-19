<template>
    <ContentBase>
        <div class="box-header box-header-left">
            <h1 class="title-bordered">Вхід</h1>
        </div>
        <div class="profile-login">
            <Image
                alt="Авторизуйтесь або зареєструйтесь"
                name="password-done"
            />
            <p>
                Для доступу до своїх даних вам необхідно <br>
                <span @click="openLoginModal({open: true, tab: 'login'})">Увійти</span> або <span
                @click="openLoginModal({open: true, tab: 'register'})">Зареєструватись</span>.
            </p>
        </div>
    </ContentBase>
</template>

<script lang='ts' setup>
import { useNuxtApp } from '#app';
import { watch } from 'vue';
import Image from '~/components/Image.vue';

const { $client, $bus } = useNuxtApp();

const openLoginModal = (options: object) => {
    $bus.$emit('openLoginModal', options);
};

watch($client, () => {
    if ($client.value) {
        navigateTo({
            path: '/',
            replace: true,
        });
    }
});
</script>
