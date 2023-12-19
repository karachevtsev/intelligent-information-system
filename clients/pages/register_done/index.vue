<template>
    <ContentBase>
        <div class="box-header box-header-left">
            <h1 class="title-bordered">Реєстрація на сайті</h1>
        </div>
        <div class="box-profile register-done">
            <p class="register-done-title">Вітаємо!</p>
            <p class="register-done-text">
                Вашу реєстрацію на сайті завершено.
                <br>
                Тепер ви можете користуватись усіма сервісами «Дебету-Кредиту»
            </p>
            <Image name="auth-image" alt=""/>
            <span class="btn btn-profile" @click="$bus.$emit('openLoginModal', { open: true, tab: 'login' });">Авторизуватись</span>
        </div>
    </ContentBase>
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

<style lang="scss">
.register-done {
    text-align: center;

    &-title {
        margin-bottom: 10px;
        font-weight: 500;
        font-size: 18px;
        color: $link-color;
    }

    &-text {
        font-size: 18px;
    }

    img {
        margin-top: 30px;
        margin-bottom: 30px;

        @include laptop-xl() {
            margin-top: 40px;
            margin-bottom: 40px;
        }
    }
}
</style>

