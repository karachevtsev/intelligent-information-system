<template>
    <NuxtLayout name="page">
        <div class="push">
            <div class="container text-center">
                <h1 class="push-title">Тільки найважливіші новини</h1>
                <p class="push-subtitle">від редакції «Дебет-Кредит»</p>
                <img src="/images/push.png" alt="Тільки найважливіші новини від редакції «Дебет-Кредит»" loading="lazy" width="387" height="260">
                <p class="push-stats">Наші пуші отримують вже <b v-text="count.about_push"></b> бухгалтерів.</p>
                <p class="push-text">Щоб отримувати важливі повідомлення від редакції прямо на екран свого комп`ютера, натисніть кнопку <span>«Дозволити повідомлення»</span>
                    у спливаючому вікні або у налаштуваннях вашого браузеру.</p>
                <p class="push-text">Приєднуйтесь!</p>
            </div>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { useFrontendSettings } from 'dtkt-shared/composables/frontendSettings';

definePageMeta({
    layout: false,
});

const count = await useFrontendSettings(['about_push']);

useHead({
    meta: [
        {
            name: 'robots',
            content: 'noindex, follow',
        },
    ],
});
</script>

<style lang="scss">
.push {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    line-height: 140%;

    .container {
        padding-top: 40px;
        padding-bottom: 40px;

        @include laptop-lg() {
            padding-top: 60px;
            padding-bottom: 80px;
        }
    }

    &-title {
        margin-bottom: 5px;
        font-size: 21px;
        font-weight: 700;
    }

    &-subtitle {
        margin-bottom: 40px;
        font-size: 18px;
    }

    img {
        display: block;
        margin: 0 auto 40px;
    }

    &-stats {
        margin-bottom: 15px;
        font-size: 18px;
        color: #52A5D8;

        @include laptop-lg() {
            font-size: 21px;
        }
    }

    &-text {
        max-width: 590px;
        margin: 0 auto 20px;

        span {
            color: #52A5D8;
        }

        @include laptop-lg() {
            font-size: 18px;
        }

        &:last-child {
            margin-bottom: 0;
        }
    }
}
</style>
