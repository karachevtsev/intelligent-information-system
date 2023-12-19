<template>
    <footer class="footer" role="contentinfo">
        <div class="container">
            <div class="footer-left">
                <div class="footer-row">
                    <div class="footer-col footer-about">
                        <p>© 2012-{{ currentYear }} «Дебет-Кредит» Український фінансово-бухгалтерський портал.</p>
                        <p>Використання публікацій можливе лише за письмовою згодою редакції «Дебет-Кредит»</p>
                        <div class="footer-app">
                            <NuxtLink to="https://dtkt.ua/apps" rel="">
                                <img
                                    src="../assets/img/app-store.svg?url"
                                    width="140"
                                    height="47"
                                    alt="Мобільний застосунок «Дебет-Кредит» для операційної системи iOS"

                                >
                            </NuxtLink>
                            <NuxtLink to="https://dtkt.ua/apps" rel="">
                                <img
                                    src="../assets/img/google-pay.svg?url"
                                    width="140"
                                    height="47"
                                    alt="Мобільний застосунок «Дебет-Кредит» для операційної системи android"
                                    loading="lazy"
                                >
                            </NuxtLink>
                        </div>
                    </div>
                    <div class="footer-col footer-links">
                        <span>Всі розділи</span>
                        <div class="footer-links-row">
                            <ul>
                                <li v-for="(site, index) in sites[0]">
                                    <NuxtLink :to="site.url" target="_blank" rel="" :key="index">{{ site.title }}</NuxtLink>
                                </li>
                            </ul>
                            <ul>
                                <li v-for="(site, index) in sites[1]">
                                    <NuxtLink :to="site.url" target="_blank" rel="" :key="index">{{ site.title }}</NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="footer-col footer-links">
                        <span>Дебет-Кредит</span>
                        <ul>
                            <li v-for="(site, index) in sites[2]">
                                <NuxtLink :to="site.url" target="_blank" rel="" :key="index">{{ site.title }}</NuxtLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="footer-social">
                    <nuxt-link to="/" class="logo-footer">
                        <img
                            src="../assets/svg/logo-footer.svg?url"
                            width="160"
                            height="19"
                            alt="«Дебет-Кредит» | Бухгалтерський сервіс №1 в Україні"
                            loading="lazy"
                        />
                    </nuxt-link>
                    <ul>
                        <li v-for="social in socials">
                            <NuxtLink :to="social.url" :class="social.name" target="_blank"></NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="footer-right">
                <WeeklyNews id="weekly-bottom"/>
            </div>
        </div>
    </footer>
</template>

<script lang="ts" setup>
import { SOCIAL } from '../constants';
import WeeklyNews from '../components/WeeklyNews';

const { public: { apiBase } } = useRuntimeConfig();
const { data: issues } = await $fetch<any>('/online/latest', {
    baseURL: apiBase,
});

const lastIssueLink = issues[0].url;

const sites = [
    [
        {
            title: 'Головна Дт-Кт',
            url: 'https://dtkt.ua/',
        },
        {
            title: 'Новини',
            url: 'https://news.dtkt.ua/',
        },
        {
            title: 'Документи',
            url: 'https://docs.dtkt.ua/',
        },
        {
            title: 'Бланки',
            url: 'https://blank.dtkt.ua/',
        },
        {
            title: 'Консультації',
            url: 'https://consulting.dtkt.ua/',
        },
        {
            title: 'Сервіси',
            url: 'https://services.dtkt.ua/',
        },
    ],
    [
        {
            title: 'Вебінари',
            url: 'https://webinary.dtkt.ua/',
        },
        {
            title: 'Журнали',
            url: 'https://online.dtkt.ua/',
        },
        {
            title: 'Семінари',
            url: 'https://seminars.dtkt.ua/',
        },
        {
            title: 'Мій кабінет',
            url: 'https://my.dtkt.ua/',
        },
        {
            title: 'Всі теги',
            url: 'https://news.dtkt.ua/tags',
        },
        {
            title: 'Всі рубрики',
            url: 'https://news.dtkt.ua/rubrics',
        },
    ],
    [
        {
            title: 'Свіжий номер',
            url: lastIssueLink,
        },
        {
            title: 'Передплата',
            url: 'https://subscribe.dtkt.ua/',
        },
        {
            title: 'Пуш-повідомлення',
            url: 'https://news.dtkt.ua/push',
        },
        {
            title: 'Про редакцію',
            url: 'https://dtkt.ua/about',
        },
        {
            title: 'Реклама на сайті',
            url: 'https://dtkt.ua/partnership',
        },
        {
            title: 'Щотижнева розсилка',
            url: 'https://promo.dtkt.ua/weeklyletter',
        },
    ],

];
const socials = [
    {
        url: SOCIAL.SOCIAL_FACEBOOK,
        name: 'fb',
    },
    {
        url: SOCIAL.SOCIAL_TELEGRAM,
        name: 'tg',
    },
    {
        url: SOCIAL.SOCIAL_INSTAGRAM,
        name: 'inst',
    },
    {
        url: SOCIAL.SOCIAL_VIBER,
        name: 'vb',
    },
    {
        url: SOCIAL.SOCIAL_YOUTUBE,
        name: 'yt',
    },
];

const currentYear = computed(() => {
    return new Date().getFullYear();
});
</script>
