<template>
    <div class="article-access">
        <template v-if="accessType === 3">
            <p>
                Доступ до цього документу можливий лише для передплатників «Дебету-Кредиту». Якщо ви передплатник, будь ласка,
                <span @click="openLoginModal({open: true, tab: 'login'})">авторизуйтесь</span>.
            </p>
            <p>Або
                <NuxtLink :to="SUBSCRIBE_URL" target="_blank" rel="">оформіть передплату</NuxtLink>
                , вартість пакету «Мій асистент» становить
                <Price product="ds-assistant" plan="stand"/>
            </p>
            <NuxtLink :to="SUBSCRIBE_URL" class="btn" target="_blank" rel="">
                Передплатити
                <img
                    alt=""
                    height="18"
                    loading="lazy"
                    src="../../assets/svg/lock-btn.svg?url"
                    width="13"
                />
            </NuxtLink>
        </template>
        <template v-if="accessType === 2">
            <p>
                Доступ до цього документу можливий лише для зареєстрованих користувачів. Якщо ви вже зареєстровані на нашому
                сайті — будь ласка, <span @click="openLoginModal({open: true, tab: 'login'})">авторизуйтесь</span>.
            </p>
            <p>
                Або
                <span @click="$bus.$emit('openLoginModal', {open: true, tab: 'register'})">зареєструйтесь</span>
                , прямо зараз, це не вимагає ваших персональних даних і займе не більше однієї хвилини.
            </p>
            <span class="btn" @click="openLoginModal({open: true, tab: 'register'})">
                Зареєструватись
            </span>
        </template>
    </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from '#app';
import Price from './Price.vue';
import { SUBSCRIBE_URL } from '../../constants';

const props = defineProps({
    accessType: Number,
});

const { $client, $bus } = useNuxtApp();

const openLoginModal = (options: object) => {
    $bus.$emit('openLoginModal', options);
};
</script>

<style lang="scss">
.article-access {
    margin-bottom: 30px;
    padding: 20px 20px 30px;
    background: #E6F5FC;
    border-radius: 16px;
    font-size: em(18);
    line-height: 140%;
    text-align: center;
    color: #0D3343;

    @include laptop-lg() {
        margin-bottom: 40px;
    }

    @include laptop-xl() {
        padding: 30px 100px 40px;
    }

    p {
        margin-bottom: 20px;

        a, span {
            text-decoration: underline;
            color: $color-main;
            cursor: pointer;

            &:hover {
                text-decoration: none;
            }
        }
    }

    .btn {
        width: 200px;
        margin: 10px auto 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        line-height: 23px;
        color: $white;
        background: $color-main;

        &:hover {
            background: $color-success-muted;
        }

        img {
            position: relative;
            top: -2px;
            margin-left: 10px;
        }
    }

    @include noprint();
}
</style>
