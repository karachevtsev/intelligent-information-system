<template>
    <div class="profile-a">
        <template v-if="$client?.additional.left < 0 || $client?.additional.left === null">
            <p class="profile-a-info">
                У цьому розділі передплатники електронних пакетів «Дебету-Кредиту», а також
                <br>
                паперового журналу, можуть відключити показ будь-яких рекламних оголошень
                <br>
                на сайті (поп-апів, банерів, нагадувань тощо)
            </p>
            <Image name="profile-a" alt=""/>
            <NuxtLink :to="SUBSCRIBE_URL" class="btn btn-profile" target="_blank">Оформити передплату</NuxtLink>
        </template>
        <template v-else>
            <template v-if="!$client?.additional?.no_advert">
                <p class="profile-a-info">
                    Тут ви можете відмовитись від показу рекламних оголошень
                    <br>
                    на сайті «Дебет-Кредит» (поп-апів, банерів, нагадувань тощо)
                    <br>
                    і включити їх знову
                </p>
                <Image name="profile-a" alt=""/>
                <button type="button" @click="toggleAdvert(1)"
                        :disabled="isDisabled"
                        class="btn btn-profile"
                >
                    Вимкнути рекламу
                </button>
            </template>
            <template v-else>
                <p class="profile-a-info">
                    Тут ви можете підключити показ рекламних оголошень
                    <br>
                    на сайті «Дебет-Кредит» (і вимкнути їх знову)
                </p>
                <Image name="profile-a" alt=""/>
                <button @click="toggleAdvert(0)"
                        :disabled="isDisabled"
                        class="btn btn-profile"
                >
                    Повернути рекламу
                </button>
            </template>
        </template>
    </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from '#app';
import { SUBSCRIBE_URL } from 'dtkt-shared/constants/index.js';

const { $client, $updateClient } = useNuxtApp();
const { public: { apiBase } } = useRuntimeConfig();
const isDisabled = ref(false);

const toggleAdvert = async (value: number) => {
    isDisabled.value = true;
    try {
        await $fetch('/dtkt/no-advert', {
            baseURL: apiBase,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: {
                'value': value,
            },
        });
        await $updateClient();
    } catch (e) {
        console.log(e);
    } finally {
        isDisabled.value = false;
    }
};
</script>

<style lang="scss">
.profile-a {
    text-align: center;

    &-info {
        margin-bottom: 30px;
        font-size: 18px;

        br {
            display: none;

            @include laptop-xl() {
                display: block;
            }
        }
    }
}
</style>
