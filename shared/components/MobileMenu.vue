<template>
    <div class="mobile-menu">
        <div :class="{open: open}" class="hamburger" @click="open = !open">
            <span></span>
        </div>
        <div class="mobile-menu-container">
            <transition name="show">
                <div class="mobile-menu-box" v-if="open">
                    <client-only>
                        <Collapse v-if="$client" v-model="isExpandedUser" :title="$client.name" :titleExpanded="$client.name" class="collapse-user">
                            <ul class="mobile-menu-list">
                                <template v-if="siteName !== 'my'">
                                    <template v-for="userLink in userLinks">
                                        <li>
                                            <NuxtLink :to="userLink.link" rel="">{{ userLink.title }}</NuxtLink>
                                        </li>
                                    </template>
                                </template>
                                <li class="mobile-logout">
                                    <span @click="$logout">Вийти</span>
                                </li>
                            </ul>
                        </Collapse>
                        <div v-else class="mobile-menu-login">
                            <div class="mobile-menu-title" @click="openLoginModal">
                                <img
                                    alt=""
                                    height="24"
                                    width="24"
                                    loading="lazy"
                                    src="../assets/svg/user.svg?url"
                                />
                                Увійти
                            </div>
                        </div>
                    </client-only>
                    <div class="mobile-menu-btn-top">
                        <NuxtLink class="btn btn-subscribe" to="https://subscribe.dtkt.ua/" target="_blank" rel="">Оформити передплату</NuxtLink>
                    </div>
                    <slot name="site-menu"></slot>
                    <Collapse v-model="isExpandedSites" title="Всі розділи" titleExpanded="Всі розділи">
                        <NavigationList className="navigation-list-mobile"/>
                    </Collapse>
                    <Collapse v-model="isExpandedContacts" class="collapse-contacts" title="Контакти" titleExpanded="Контакти">
                        <ul class="mobile-menu-contacts">
                            <li v-for="contact in contacts">
                                <span :class="contact.icon">{{ contact.caption }}</span>
                            </li>
                        </ul>
                        <div class="mobile-menu-btn">
                            <span class="btn" @click="openContactModal">Напишіть нам</span>
                        </div>
                    </Collapse>
                </div>
            </transition>
        </div>
        <transition name="fade">
            <div class="mobile-menu-backdrop" @click="open = false" v-if="open"></div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from '#app';
import { watch, ref, onBeforeUnmount } from 'vue';
import Collapse from './Collapse.vue';
import NavigationList from './NavigationList.vue';
import { PHONE, EMAIL } from '../constants';

const { public: { siteName } } = useRuntimeConfig();
const { $client, $bus, $logout } = useNuxtApp();
const isExpandedUser = ref(true);
const isExpandedSites = ref(true);
const isExpandedContacts = ref(true);
const open = ref(false);

const userLinks = ref([
    {
        link: 'https://my.dtkt.ua/',
        title: 'Особиста інформація',
    },
    {
        link: 'https://my.dtkt.ua/mailing',
        title: 'Мої розсилки',
    },
    {
        link: 'https://my.dtkt.ua/subscriptions',
        title: 'Моя передплата',
    },
    {
        link: 'https://my.dtkt.ua/favorites',
        title: 'Збережене',
    },
]);

const contacts = ref([
    {
        icon: 'city-icon',
        caption: PHONE.PHONE_CITY,
    },
    {
        icon: 'kst-icon',
        caption: PHONE.PHONE_KSTR,
    },
    {
        icon: 'vdf-icon',
        caption: PHONE.PHONE_VDFN,
    },
    {
        icon: '',
        caption: EMAIL,
    },
]);

const openLoginModal = () => {
    open.value = false;
    $bus.$emit('openLoginModal');
};

const openContactModal = () => {
    open.value = false;
    $bus.$emit('openContactModal', true);
};

const close = (e) => (e.target.tagName === 'A') && (open.value = false);

if (process.client) {
    window.addEventListener('click', close, {
        passive: true,
        capture: true,
    });
}

onBeforeUnmount(() => {
    window.removeEventListener('click', close);
});

function toggleBodyScroll(close) {
    if (process.client) {
        document.body.classList.toggle('no-scroll', close);
    }
}

watch(open, (value) => {
    toggleBodyScroll(value);
});
</script>
