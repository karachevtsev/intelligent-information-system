<template>
    <ContentAccess title="Моє обране">
        <div class="client-favorites">
            <p>Тут зберігаються ваші закладки на статті електронного журналу «Дебет-Кредит»; вебінари редакції, на які ви зареєструвались;
                ваші коментарі під новинами та консультаціями; а також інші обрані матеріали сайту (новини, консультації, довідники,
                бланки та нормативні документи)</p>
            <ul class="favorites">
                <li v-for="favorite in favorites">
                    <NuxtLink :to="favorite.url" :class="favorite.rel">
                        <svg-icon :name="favorite.rel" class="svg-icon"/>
                        <span>{{ favorite.title }}</span>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </ContentAccess>
</template>

<script lang='ts' setup>
import SvgIcon from 'dtkt-shared/components/SvgIcon';

const favorites = [
    {
        title: 'Статті',
        url: '/articles',
        rel: 'online',
    },
    {
        title: 'Новини',
        url: '/news',
        rel: 'news',
    },
    {
        title: 'Довідники',
        url: '/services',
        rel: 'services',
    },
    {
        title: 'Консультації',
        url: '/consulting',
        rel: 'consulting',
    },
    {
        title: 'Документи',
        url: '/documents',
        rel: 'docs',
    },
    {
        title: 'Бланки',
        url: '/blanks',
        rel: 'blank',
    },
    {
        title: 'Вебінари',
        url: '/webinars/webinary',
        rel: 'webinary',
    },
    {
        title: 'Коментарі',
        url: '/comments',
        rel: 'comments',
    },
];
</script>

<style lang='scss'>
.client-favorites {
    p {
        max-width: 930px;
        margin: 0 auto 30px;
        font-size: 18px;
        text-align: center;

        @include laptop-xl() {
            margin-bottom: 20px;
        }
    }

    .favorites {
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        max-width: 800px;
        padding: 0;
        margin: 0 auto;

        li {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            width: 150px;
            height: 150px;
            margin: 10px;

            @include laptop-xl() {
                margin: 20px;
            }
        }

        a {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            color: $black;
            text-decoration: none;
            border: 1px solid #EDEDEF;
            border-radius: 16px;

            $sites: (
                'news',
                'docs',
                'blank',
                'consulting',
                'services',
                'webinary',
                'online',
                'comments',
            );

            @each $site in $sites {
                &.#{$site} {
                    .svg-icon {
                        svg {
                            fill: getSiteColor($site);

                            circle {
                                stroke: getSiteColor($site);
                            }

                            path {
                                fill: $white;

                                &.comment {
                                    fill: getSiteColor($site);
                                    stroke: $white;
                                }
                            }
                        }
                    }

                    &:hover {
                        border-color: getSiteColor($site);
                        border-width: 2px;

                        .svg-icon {
                            border-color: getSiteColor($site);
                        }
                    }
                }
            }

        }

        .svg-icon {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 50px;
            height: 50px;
            margin-bottom: 5px;
            border: 2px solid transparent;
            border-radius: 50%;

            svg {
                width: 40px;
                height: 40px;
            }
        }
    }
}
</style>
