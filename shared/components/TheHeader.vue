<template>
    <header id="header" class="header" role="banner">
        <div class="header-top">
            <div class="container">
                <div class="header-top-left">
                    <ul class="header-list">
                        <li class="has-icon trial-icon">
                            <NuxtLink rel="" target="_blank" :to="SUBSCRIBE_TRIAL_URL">Спробувати безкоштовно</NuxtLink>
                        </li>
                        <li class="has-icon subscribe-icon">
                            <NuxtLink rel="" target="_blank" :to="SUBSCRIBE_URL">Передплата</NuxtLink>
                        </li>
                        <li class="has-icon adverts-icon">
                            <client-only>
                                <NuxtLink v-if="$client?.additional?.no_advert"
                                          to="https://my.dtkt.ua/adverts"
                                          target="_blank"
                                          rel=""
                                >
                                    Увімкнути рекламу
                                </NuxtLink>
                                <NuxtLink v-else
                                          @click.prevent="$bus.$emit('openAdvertModal', true)"
                                          to="https://my.dtkt.ua/adverts"
                                          target="_blank"
                                          rel=""
                                >
                                    Вимкнути рекламу
                                </NuxtLink>
                            </client-only>
                        </li>
                    </ul>
                </div>
                <div class="header-top-right">
                    <ul class="header-list">
                        <li class="has-icon contacts-icon contact-icon header-dropdown">
                            Контакти
                            <div class="header-dropdown-box">
                                <ul>
                                    <li class="has-button">
                                        <button class="btn header-btn" @click="$bus.$emit('openContactModal', true)" type="button">Напишіть нам
                                        </button>
                                    </li>
                                    <li v-for="phone in phones">
                                        <span :class="phone.icon" class="has-icon">{{ phone.number }}</span>
                                    </li>
                                    <li><span>{{ email }}</span></li>
                                    <li>
                                        <NuxtLink :to="club" target="_blank">Клуб бухгалтерів «Дебет-Кредит»</NuxtLink>
                                    </li>
                                </ul>
                                <div class="header-social">
                                    <ul>
                                        <li v-for="social in socials">
                                            <NuxtLink :class="social.name" :to="social.url" target="_blank"></NuxtLink>
                                        </li>
                                    </ul>
                                </div>
                                <ul>
                                    <li>
                                        <NuxtLink target="_blank" to="https://dtkt.ua/about" rel="">Про редакцію</NuxtLink>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <client-only>
                            <li v-if="$client" class="header-user header-dropdown user-login">
                                <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                                        fill="#F1C40F"/>
                                    <mask id="mask0_527_21887" height="20" maskUnits="userSpaceOnUse" style="mask-type:alpha" width="20" x="0" y="0">
                                        <path
                                            d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                                            fill="#74747D"/>
                                    </mask>
                                    <g mask="url(#mask0_527_21887)">
                                        <path
                                            d="M10 32C15.5228 32 20 27.5228 20 22C20 16.4772 15.5228 12 10 12C4.47715 12 0 16.4772 0 22C0 27.5228 4.47715 32 10 32Z"
                                            fill="#DE4747"/>
                                    </g>
                                    <path
                                        d="M9.99996 12.5385C12.1241 12.5385 13.8461 10.8165 13.8461 8.69235C13.8461 6.56817 12.1241 4.84619 9.99996 4.84619C7.87579 4.84619 6.15381 6.56817 6.15381 8.69235C6.15381 10.8165 7.87579 12.5385 9.99996 12.5385Z"
                                        fill="#DE4747"/>
                                </svg>
                                <span class="header-user-name">{{ $client.name }}</span>
                                <div class="header-dropdown-box user-dropdown">
                                    <ul>
                                        <li>
                                            <NuxtLink rel="" target="_blank" to="https://my.dtkt.ua/">Особиста інформація</NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink rel="" target="_blank" to="https://my.dtkt.ua/mailing">Мої розсилки</NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink rel="" target="_blank" to="https://my.dtkt.ua/subscriptions">Моя передплата</NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink rel="" target="_blank" to="https://my.dtkt.ua/favorites">Збережене</NuxtLink>
                                        </li>
                                        <li class="header-logout">
                                            <span @click="$logout()">Вийти</span>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li v-else class="header-user">
                                <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                                        fill="#CDCDD4"/>
                                    <mask id="mask0_527_21811" height="20" maskUnits="userSpaceOnUse" style="mask-type:alpha" width="20" x="0" y="0">
                                        <path
                                            d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                                            fill="#74747D"/>
                                    </mask>
                                    <g mask="url(#mask0_527_21811)">
                                        <path
                                            d="M10 31C15.5228 31 20 26.5228 20 21C20 15.4772 15.5228 11 10 11C4.47715 11 0 15.4772 0 21C0 26.5228 4.47715 31 10 31Z"
                                            fill="#7F808D"/>
                                    </g>
                                    <path
                                        d="M9.99996 12.5385C12.1241 12.5385 13.8461 10.8165 13.8461 8.69235C13.8461 6.56817 12.1241 4.84619 9.99996 4.84619C7.87579 4.84619 6.15381 6.56817 6.15381 8.69235C6.15381 10.8165 7.87579 12.5385 9.99996 12.5385Z"
                                        fill="#797A87"/>
                                </svg>
                                <span class="header-user-login" @click="$bus.$emit('openLoginModal')">Увійти</span>
                            </li>
                            <li>
                                <Notifications/>
                            </li>
                        </client-only>
                    </ul>
                </div>
            </div>
        </div>
        <div class="header-bottom">
            <div class="container">
                <div class="header-bottom-left">
                    <slot name="site-logo"></slot>
                    <div class="site-navigation">
                        <Navigation/>
                    </div>
                </div>
                <slot name="mobile-menu"></slot>
                <Logo/>
                <MobileSearch/>
                <div class="header-bottom-right">
                    <HeaderSearch/>
                </div>
            </div>
        </div>
    </header>
</template>

<script lang="ts" setup>
import { useNuxtApp } from '#app';
import { EMAIL, PHONE, SOCIAL, SOCIAL_FACEBOOK_CLUB, SUBSCRIBE_URL, SUBSCRIBE_TRIAL_URL } from '../constants';
import { watch, ref } from 'vue';
import Navigation from './Navigation.vue';
import Logo from './Logo.vue';
import HeaderSearch from './HeaderSearch.vue';
import MobileSearch from './MobileSearch.vue';
import Notifications from './Notifications.vue';

const { $client, $bus } = useNuxtApp();
const isDisabledAdvert = ref($client.value?.additional?.no_advert || false);

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
    ],
    phones = [
        {
            number: PHONE.PHONE_CITY,
            icon: 'city-icon',
        },
        {
            number: PHONE.PHONE_KSTR,
            icon: 'kst-icon',
        },
        {
            number: PHONE.PHONE_VDFN,
            icon: 'vdf-icon',
        },
    ],
    email = EMAIL,
    club = SOCIAL_FACEBOOK_CLUB;

watch($client, async () => {
    await $bus.$emit('openLoginModal', { open: false });
});

$bus.$on('disableAdvert', (value: boolean): void => {
    isDisabledAdvert.value = value;
});
</script>
