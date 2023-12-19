<template>
    <div class="error-page">
        <h1>Сторінку, яку ви хотіли відкрити, не знайдено</h1>
        <p>Тут лише котик :)</p>
        <picture>
            <source srcset="../assets/img/404.png" media="(min-width: 1000px)" type="image/jpeg">
            <source srcset="../assets/img/404-sm.png" media="(min-width: 768px)" type="image/jpeg">
            <img src="../assets/img/404-sm.png" alt="Сторінку, яку ви хотіли відкрити, не знайдено" loading="lazy">
        </picture>
        <p>Можливо, спробуєте одне з цих посилань?</p>
        <div class="error-page-buttons">
            <NuxtLink to="/" class="btn" @click="$emit('clearError')">Перейти на головну</NuxtLink>
            <NuxtLink to="mailto:info@dtkt.ua" class="btn" @click.prevent="$bus.$emit('openContactModal', true)">Написати нам</NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from '#app';

const { $bus } = useNuxtApp();
</script>

<style lang="scss">
.error-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    text-align: center;

    h1 {
        margin-bottom: 10px;
        font-weight: 700;
        font-size: 21px;

        + p {
            font-size: 21px;
            margin-bottom: 40px;
            font-weight: 700;
        }
    }

    picture {
        display: block;
        margin-bottom: 30px;
    }

    p {
        margin-bottom: 30px;
        font-size: 18px;

        @include laptop-lg() {
            font-size: 21px;
        }
    }

    &-buttons {
        display: flex;
        flex-direction: column;

        @include tablet() {
            flex-direction: row;
            align-items: center;
        }

        .btn {
            width: 170px;
            font-size: 14px;

            + .btn {
                margin-top: 20px;

                @include tablet() {
                    margin-top: 0;
                    margin-left: 20px;
                }
            }
        }
    }
}
</style>
