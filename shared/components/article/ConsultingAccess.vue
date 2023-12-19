<template>
    <div class="article-access">
        <p>
            Доступ до цієї консультації можливий лише для передплатників «Дебету-Кредиту». Якщо ви передплатник, будь ласка,
            <span @click="openLoginModal({open: true, tab: 'login'})">авторизуйтесь</span>.
        </p>
        <p>Або
            <NuxtLink :to="SUBSCRIBE_URL" rel="" target="_blank">оформіть передплату,</NuxtLink>
            вартість пакету «Мій асистент» становить
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
    </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from '#app';
import Price from './Price.vue';
import { SUBSCRIBE_URL } from '../../constants';

const { $bus } = useNuxtApp();

const openLoginModal = (options: object) => {
    $bus.$emit('openLoginModal', options);
};
</script>

<style lang="scss">
.article-access {
    margin-bottom: 30px;
    padding: 20px 20px 30px;
    font-size: em(18);
    line-height: 140%;
    text-align: center;
    color: #583333;
    background: #FFF4E4;
    border-radius: 16px;

    &.thematic {
        @include laptop-xl() {
            p:nth-child(2) {
                padding-left: 60px;
                padding-right: 60px;
            }
        }
    }

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
        color: #FFFFFF;
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
