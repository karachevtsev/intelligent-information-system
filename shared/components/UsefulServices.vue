<template>
    <BoxWidget :data="data">
        <ul class="box-list">
            <li>
                <div class="box-service has-icon">
                    <NuxtLink to="https://services.dtkt.ua/calculators/salary" target="_blank">{{ salary.title }}</NuxtLink>
                    <span class="box-service-date">оновлено <BoxWidgetDate :date="salary.updated_at"/></span>
                </div>
            </li>
            <li>
                <div class="box-service has-icon">
                    <NuxtLink to="https://services.dtkt.ua/calculators/vacation" target="_blank">{{ vacation.title }}</NuxtLink>
                    <span class="box-service-date">оновлено <BoxWidgetDate :date="vacation.updated_at"/></span>
                </div>
            </li>
            <li v-for="(article) in articles" :key="article.id">
                <div class="box-service has-icon">
                    <NuxtLink :to="article.url.href" target="_blank">{{ article.title }}</NuxtLink>
                    <span class="box-service-date">оновлено <BoxWidgetDate :date="article.publishedAt"/></span>
                </div>
            </li>
        </ul>
    </BoxWidget>
</template>

<script lang='ts' setup>
import BoxWidget from './BoxWidget';
import { SERVICES_URL } from '../constants';
import { useContentList, useRubrics } from '../composables/content';
import BoxWidgetDate from './BoxWidgetDate';

const props = defineProps({
    perPage: {
        type: Number,
        default: 3,
    },
});

const data = {
    title: 'Корисні сервіси',
    link: SERVICES_URL,
    linkText: 'Усі сервіси',
};

const { articles } = await useContentList({ sort_by: 'popular', per_page: props.perPage }, 'services');
const { subcategory: salary } = await useContentList({ category: 'calculators', subcategory: 'salary' }, 'services');
const { subcategory: vacation } = await useContentList({ category: 'calculators', subcategory: 'vacation' }, 'services');
const rubrics = await useRubrics('services');
</script>

<style lang='scss'>
.box-gray {
    .box-service {
        &.has-icon {
            &:before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 20px;
                height: 20px;
                background: $white url(../assets/svg/like-light.svg) no-repeat center;
            }
        }
    }
}

.box-service {
    &.has-icon {
        &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 20px;
            height: 20px;
            background: rgba(0, 0, 0, 0.2) url(../assets/svg/like.svg) no-repeat center;
        }
    }

    &-date {
        display: flex;
        align-items: center;
        margin-top: 3px;
        padding-left: 26px;
        font-size: 14px;
        color: $gray-light;

        span {
            margin-left: 3px;
        }

        &:before {
            content: '';
            width: 16px;
            height: 16px;
            display: block;
            margin-right: 3px;
            background: url(../assets/svg/callendar.svg) no-repeat center;
        }
    }
}
</style>
