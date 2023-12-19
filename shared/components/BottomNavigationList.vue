<template>
    <ul class="bottom-navigation-list ">
        <li v-for="site in sites"
            :class="[site.rel === siteName ? 'active' : '', site.rel]"
        >
            <NuxtLink
                rel=""
                :to="site.link"
            >
                <svg-icon :name="site.rel"
                          class="svg-icon"
                />
                {{ site.title }}
            </NuxtLink>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SvgIcon from './SvgIcon';
import {
    MAIN_URL,
    NEWS_URL,
    DOCS_URL,
    BLANK_URL,
    CONSULTING_URL,
    SERVICES_URL,
    WEBINARY_URL,
    SEMINARS_URL,
    ONLINE_URL,
    MY_URL,
    CLUB_URL,
} from '../constants';

const { public: { siteName } } = useRuntimeConfig();

const sites = ref([
    {
        title: 'Новини',
        rel: 'news',
        link: NEWS_URL,
    },
    {
        title: 'Документи',
        rel: 'docs',
        link: DOCS_URL,
    },
    {
        title: 'Бланки',
        rel: 'blank',
        link: BLANK_URL,
    },
    {
        title: 'Консультації',
        rel: 'consulting',
        link: CONSULTING_URL,
    },
    {
        title: 'Сервіси',
        rel: 'services',
        link: SERVICES_URL,
    },
    {
        title: 'Вебінари',
        rel: 'webinary',
        link: WEBINARY_URL,
    },
    {
        title: 'Семінари',
        rel: 'seminars',
        link: SEMINARS_URL,
    },
    {
        title: 'Журнали',
        rel: 'online',
        link: ONLINE_URL,
    },
    {
        title: 'Формум',
        rel: 'club',
        link: CLUB_URL,
    },
    {
        title: 'Головна',
        rel: 'dtkt',
        link: MAIN_URL,
    },
    {
        title: 'Мій кабінет',
        rel: 'my',
        link: MY_URL,
    },
]);
</script>

<style lang='scss'>
.bottom-navigation-list {
    position: relative;
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;

    @include laptop-xl() {
        justify-content: space-between;
        height: 100%;
    }

    $sites: (
        'news',
        'docs',
        'blank',
        'consulting',
        'services',
        'webinary',
        'seminars',
        'online',
        'club',
        'dtkt',
        'my',
    );

    li {
        position: relative;
        width: 65px;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        scroll-snap-align: start;

        @include laptop-xl() {
            width: auto;
            height: 100%;
        }

        &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: transparent;
            border-radius: 0 0 3px 3px;
        }

        @each $site in $sites {
            $i: index($sites, $site);

            &.#{$site} {
                order: #{$i};

                &:hover,
                &:active {
                    a {
                        color: $black;
                    }

                    .svg-icon {
                        svg {
                            fill: getSiteColor($site);
                        }

                        circle {
                            stroke: getSiteColor($site);
                        }

                        path {
                            fill: $white;
                        }
                    }
                }
            }
        }

        &.active {
            order: -1;

            a {
                color: $black;
            }

            @each $site in $sites {
                &.#{$site} {
                    &:before {
                        background: getSiteColor($site);
                    }

                    .svg-icon {
                        svg {
                            fill: getSiteColor($site);
                        }

                        circle {
                            stroke: getSiteColor($site);
                        }

                        path {
                            fill: $white;
                        }
                    }
                }
            }
        }

        a {
            position: relative;
            width: 100%;
            height: 100%;
            margin: 0 5px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            font-weight: 500;
            font-size: 8px;
            line-height: 9px;
            color: $gray;
            text-decoration: none;

            @include mobile() {
                font-size: 9px;
            }

            @include laptop-xl() {
                flex-direction: row;
                line-height: 14px;
                font-size: 14px;
            }
        }

        .svg-icon {
            margin-bottom: 5px;
            width: 20px;
            height: 20px;

            @include mobile() {
                width: 24px;
                height: 24px;
            }

            @include laptop-xl() {
                margin-right: 6px;
            }

            svg {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
