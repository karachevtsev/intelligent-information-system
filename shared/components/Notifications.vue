<template>
    <div v-click-outside="hide" class="header-notifications bell-icon">
        <span class="notifications-bell" @click="isOpen = !isOpen">
            <img alt="Персональні повідомлення" src="../assets/svg/bell.svg?url" width="24" height="24"/>
            <span v-if="$client && unreadNotifications > 0" class="notifications-messages">
                {{ unreadNotifications <= 10 ? unreadNotifications : '10+' }}
            </span>
            <span v-else-if="!$client" class="notifications-messages">!</span>
        </span>
        <transition name="fade">
            <div v-if="isOpen" class="notifications-dropdown">
                <div v-if="!notifications" class="notifications-spinner">
                    <Spinner variant="warning"/>
                </div>
                <ul v-else class="notifications-list">
                    <li v-for="notification in notifications">
                        <NuxtLink
                            :to="notification.link"
                            :class="notification.readAt ? 'read' : 'unread'"
                            :target="notification.target"
                            rel=""
                            @click="read(notification.id, notification.readAt)"
                        >
                            {{ notification.message }}
                        </NuxtLink>
                    </li>
                    <li v-if="!$client" class="notifications-auth">
                        <p><span @click="$bus.$emit('openLoginModal')">Авторизуйтесь</span>, щоб читати персональні повідомлення</p>
                    </li>
                    <template v-else>
                        <li class="notifications-auth">
                            <NuxtLink to="https://my.dtkt.ua/notifications">Більше повідомлень</NuxtLink>
                        </li>
                    </template>
                </ul>
                <match-media v-slot="{xs}">
                    <ul class="notifications-list" v-if="!xs">
                        <li v-for="link in links">
                            <NuxtLink
                                :to="link.url"
                                :class="link.rel"
                                target="_blank"
                                rel=""
                                @click="hide"
                            >
                                {{ link.title }}
                            </NuxtLink>
                        </li>
                    </ul>
                    <button type="button" class="close" @click="hide" v-if="xs"></button>
                </match-media>
            </div>
        </transition>
        <match-media v-slot="{xs}">
            <transition name="fade">
                <template v-if="xs">
                    <div v-if="isOpen" class="notifications-backdrop" @click="hide"></div>
                </template>
            </transition>
        </match-media>
    </div>
</template>

<script setup lang="ts">
import { useNuxtApp, useRuntimeConfig } from '#app';
import Spinner from './Spinner';
import MatchMedia from './MatchMedia.vue';
import { ref, watch } from 'vue';

const { $client, $bus } = useNuxtApp();
const { public: { apiBase } } = useRuntimeConfig();
const notifications = ref();
const isOpen = ref(false);
const unreadNotifications = ref($client.value?.unreadNotifications);

watch($client, async () => {
    if ($client.value) {
        unreadNotifications.value = $client.value?.unreadNotifications;
    }
});

const fetchClientNotifications = async (clientValue: object | null) => {
    const url = `/clients/notifications/${!clientValue ? 'common' : ''}`;

    const { data: messages } = await $fetch<any>(url, {
        baseURL: apiBase,
        credentials: 'include',
        params: {
            per_page: 5,
        },
    });

    notifications.value = messages;
};

watch(isOpen, async () => {
    if (isOpen.value === true) {
        await fetchClientNotifications($client.value);
    }
});

const read = async (id: number, readAt: string | null) => {
    if ($client.value && readAt === null) {
        const url = new URL(`/clients/notifications/${id}/read`, apiBase);
        navigator.sendBeacon(url);
        unreadNotifications.value -= 1;
        await fetchClientNotifications($client.value);
    }
    await hide();
};

const hide = () => {
    isOpen.value = false;
};

const links = [
    {
        title: 'Щотижнева розсилка «Головне за тиждень»',
        url: 'https://promo.dtkt.ua/weeklyletter',
        rel: 'main-news',
    },
    {
        title: 'Корисні пуш повідомлення',
        url: 'https://news.dtkt.ua/push',
        rel: 'push-news',
    },
];
</script>

<style lang="scss">
.header-notifications {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    width: 35px;
    cursor: pointer;

    .notifications-bell {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 24px;
        height: 24px;

        .notifications-messages {
            position: absolute;
            left: 12px;
            top: -1px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 13px;
            padding: 0 3px;
            width: max-content;
            height: 13px;
            border-radius: 999px;
            background: #DE4747;
            font-weight: 700;
            line-height: 12px;
            font-size: 9px;
            color: $white;
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .3s ease;

        @include laptop-lg() {
            transition: none;
        }
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
}

.notifications-backdrop {
    z-index: 0;
    position: fixed;
    bottom: 52px;
    left: 0;
    right: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.8);

    @include mobile() {
        bottom: 56px;
    }

    @include laptop-lg() {
        display: none;
    }
}

.notifications-dropdown {
    z-index: 1;
    position: fixed;
    bottom: 52px;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    background: $white;
    padding: 26px 0 30px;

    @include mobile() {
        bottom: 56px;
    }

    @include laptop-lg() {
        position: absolute;
        top: 30px;
        right: 0;
        left: initial;
        bottom: initial;
        padding: 10px;
        display: block;
        min-width: 155px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        width: 260px;
    }

    > ul {
        margin: 0;
        padding: 0 0 0 20px;
        list-style: none;
        background: #fff;

        @include laptop-lg() {
            padding: 0;
        }

        > li {
            line-height: 18px;
            margin-right: 20px;
            display: flex;
            align-items: center;

            @include laptop-lg() {
                margin-right: 0;
            }

            > a, > span {
                display: block;
                width: 100%;
                padding: 6px 10px;
                border-radius: 6px;
                color: inherit;
                text-decoration: none;
                cursor: pointer;

                @include laptop-lg() {
                    padding: 6px 10px;
                }

                &:hover {
                    background: #EFEFEF;
                }
            }

            + li {
                margin-top: 3px;
            }
        }
    }

    .notifications-list {
        position: relative;
        max-height: 60vh;
        overflow: auto;

        @include laptop-lg() {
            max-height: 100%;
            overflow: initial;
        }

        li {
            a {
                position: relative;
                padding-left: 30px;

                @include laptop-lg() {
                    padding-left: 45px;
                }

                &:before {
                    position: absolute;
                    top: 5px;
                    left: 2px;
                    content: '';
                    display: block;
                    width: 24px;
                    height: 24px;

                    @include laptop-lg() {
                        left: 13px;
                    }
                }

                &.unread {
                    font-weight: bold;

                    &:before {
                        background: url(../assets/svg/bell.svg) no-repeat top center;
                    }
                }

                &.read {
                    &:before {
                        background: url(../assets/svg/bell-outline.svg) no-repeat top center;
                    }
                }

                &.more {
                    color: #7E7F8C;
                }

                &.main-news {
                    &:before {
                        top: 6px;
                        background: url(../assets/svg/envelope-open.svg) no-repeat center;
                    }
                }

                &.theme-news {
                    &:before {
                        background: url(../assets/svg/folder.svg) no-repeat center;
                    }
                }

                &.push-news {
                    &:before {
                        background: url(../assets/svg/megaphone.svg) no-repeat center;
                    }
                }
            }

            &.notifications-auth {
                padding: 11px 10px 0 30px;
                line-height: 18px;
                color: #7E7F8C;
                cursor: auto;

                a {
                    display: inline;
                    width: auto;
                    padding: 0;
                    text-decoration: underline;

                    &:hover {
                        background: transparent;
                        text-decoration: none;
                    }
                }

                @include laptop-lg() {
                    padding-top: 10px;
                    padding-bottom: 15px;
                    padding-left: 45px;

                    + .notifications-auth {
                        padding-top: 0;
                    }
                }

                &.has-border {
                    position: relative;
                    margin-top: 20px;
                    padding-top: 20px;

                    @include laptop-lg() {
                        padding-top: 15px;
                        margin-top: 12px;
                    }

                    &:before {
                        content: "";
                        position: absolute;
                        top: 0;
                        right: 10px;
                        left: 10px;
                        height: 1px;
                        background: #EDEDEF;
                    }
                }

                p {
                    margin-bottom: 0;
                    padding: 0;

                    > span {
                        text-decoration: underline;
                        cursor: pointer;

                        &:hover {
                            text-decoration: none;
                        }
                    }

                    &:hover {
                        background: none;
                    }
                }
            }
        }

        + .notifications-list {
            margin-top: 5px;
            padding-top: 5px;

            &:before {
                content: "";
                position: absolute;
                top: 0;
                right: 10px;
                left: 10px;
                height: 1px;
                background: $border-color;
            }
        }
    }

    .close {
        position: absolute;
        top: -54px;
        right: 0;
        display: flex;
        border: none;
        width: $header-height;
        height: $header-height;
        padding: 0;
        margin: 0;
        outline: none;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition-duration: 300ms;
        background: transparent;

        &:after,
        &:before {
            content: '';
            position: absolute;
            left: 50%;
            margin-left: -11px;
            width: 22px;
            height: 2px;
            border-radius: 2px;
            background: $white;
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

.notifications-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 20px 0;
}
</style>
