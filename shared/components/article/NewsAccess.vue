<template>
    <div class="article-access" :class="props.accessType">
        <template v-if="props.accessType === 'thematic'">
            <p>
                Доступ до цієї новини можливий лише для передплатників пакетів «Мій асистент», «Експерт», «Профі».
                Якщо ви передплатник, будь ласка, <span @click="openLoginModal({open: true, tab: 'login'})">авторизуйтесь</span>.
            </p>
            <p>Або
                <NuxtLink :to="SUBSCRIBE_URL" target="_blank" rel="">оформіть передплату</NuxtLink>
                , вартість мінімального пакету «Мій асистент» становить
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
        <template v-if="props.accessType === 'news'">
            <p>
                Доступ до цієї новини можливий лише для передплатників «Дебету-Кредиту». Якщо ви передплатник, будь ласка,
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
        <template v-if="props.accessType === 'auth'">
            <p>
                Доступ до цього матеріалу можливий лише для зареєстрованих користувачів. Якщо ви вже зареєстровані на нашому
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
    accessType: String,
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
    background: #FAE4E4;
    border-radius: 16px;
    font-size: em(18);
    line-height: 140%;
    text-align: center;
    color: #583333;

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
            color: #BE4949;
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
        background: #BE4949;

        &:hover {
            background: #973333;
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
