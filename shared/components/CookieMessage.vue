<template>
    <div class="cookie-message" v-if="show">
        <h3>Файли cookie та конфіденційність</h3>
        <p>Ми використовуємо файли cookie для покращення роботу веб-сайту: аналітики користування сервісами, налаштування рекламних та маркетингових
            пропозицій, функціоналу Особистого кабінету Користувача.</p>
        <p>Натиснувши кнопку «Прийняти» ви довіряєте нам свої дані та погоджуєтесь з використанням нами файлів cookie. Для отримання додаткової
            інформації перейдіть до
            <NuxtLink :to="page" target="_blank" rel="">Політики використання файлів cookie.</NuxtLink>
        </p>
        <div class="cookie-message-buttons">
            <button type="button" class="btn btn-accept" @click="accept">Прийняти</button>
            <NuxtLink :to="page" class="btn btn-more" target="_blank" rel="">Дізнатись більше</NuxtLink>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue';

const page = ref('https://my.dtkt.ua/cookies');
const show = ref(false);
const name = 'dk-accept-cookie';
const expires = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365).toUTCString();

const accept = () => {
    show.value = false;
    document.cookie = `${name}=1;path=/;domain=.dtkt.ua;expires=${expires}`;
};

const checkAccept = async () => {
    if (window.location.hostname === 'localhost') {
        return show.value = false;
    }

    return show.value = (document.cookie.indexOf(`${name}=1`) === -1);
};

await checkAccept();
</script>

<style lang='scss'>
.cookie-message {
    position: fixed;
    z-index: 2;
    left: 30px;
    right: 30px;
    bottom: 30px;
    padding: 30px 20px;
    font-weight: 400;
    font-size: 15px;
    line-height: 120%;
    color: #FFFFFF;
    background: #333333;
    box-shadow: 0 11px 30px rgba(0, 0, 0, 0.4);
    border-radius: 6px;

    @include tablet() {
        width: 440px;
    }

    h3 {
        margin-bottom: 15px;
    }

    p {
        margin-bottom: 10px;

        a {
            color: inherit;

            &:hover {
                text-decoration: none;
            }
        }
    }

    &-buttons {
        margin-top: 30px;
        display: flex;
        align-items: center;
        flex-direction: column;

        @include tablet() {
            flex-direction: row;
        }
    }

    .btn {
        width: 150px;
        font-size: 14px;
        line-height: 15px;

        + .btn {
            margin-top: 20px;

            @include tablet() {
                margin-top: 0;
                margin-left: 30px;
            }
        }

        &:focus {
            color: $black;
        }

        &-accept {
            text-transform: uppercase;
            background: #F1C40F;

            &:hover, &:active {
                background: #F1B20F;
            }
        }

        &-more {
            background: #CDCDCD;

            &:hover, &:active {
                background: #999999;
            }
        }
    }
}
</style>
