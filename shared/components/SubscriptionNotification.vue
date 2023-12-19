<template>
    <div v-if="isShow" class="subscription-notification">
        <p>
            <span class="attention">Увага!</span>
            До закінчення вашої передплати залишилось <span>{{ subscriptionLeft }}</span>
            <Plural :value="subscriptionLeft" one=" день." few=" дні." many=" днів."/>
            Не забудьте продовжити її за
            <NuxtLink :to="SUBSCRIBE_URL" target="_blank" @click="hide">посиланням</NuxtLink>
            або у вашого менеджера
        </p>
        <span class="close" @click="hide"></span>
    </div>
</template>

<script setup lang="ts">
import Plural from './plural';
import { setExpireTime, getExpireValue } from '../utils/localStorage';
import { SUBSCRIBE_URL } from '../constants';
import { useNuxtApp } from '#app';
import { ref, watch } from 'vue';

const { $client } = useNuxtApp();
const subscriptionLeft = ref({});
const isShow = ref(false);
const storageKey = ref('subscription-notification');

const show = async () => {
    if ($client.value?.additional?.left && $client.value?.additional?.left >= 0 && $client.value?.additional?.left <= 10) {
        isShow.value = !getExpireValue(`${storageKey.value}-${$client.value?.id}`);
        subscriptionLeft.value = $client.value?.additional?.left;
    } else {
        isShow.value = false;
    }
};

const hide = async () => {
    isShow.value = false;
    setExpireTime(`${storageKey.value}-${$client.value?.id}`, 1, 72);
};

await show();

watch($client, async () => {
    await show();
});
</script>

<style lang="scss">


.subscription-notification {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 34px;
    padding: 0 20px;
    background: $color-warning;

    p {
        margin: 0;
        color: #583333;

        .attention {
            display: inline-block;
            margin-right: 10px;
            padding: 0 8px;
            line-height: 18px;
            color: #FFFFFF;
            background: #BE4949;
            border-radius: 4px;
        }

        a {
            text-decoration: underline;
            color: #BE4949;

            &:hover {
                text-decoration: none;
            }
        }
    }

    .close {
        position: absolute;
        top: 50%;
        right: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 22px;
        height: 22px;
        margin-top: -11px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;

        &:hover {
            background: #583333;

            &:after,
            &:before {
                background: #fff;
            }
        }

        &:after,
        &:before {
            content: '';
            position: absolute;
            left: 50%;
            margin-left: -6px;
            width: 12px;
            height: 1.5px;
            border-radius: 2px;
            background: #583333;
            transform-origin: 50% 50%;
            transition: top 0.3s 0.3s, transform 0.3s;
        }

        &:after {
            transform: rotate3d(0, 0, 1, 45deg);
        }

        &:before {
            transform: rotate3d(0, 0, 1, -45deg);
        }
    }
}
</style>
