<template>
    <BoxWidget :data="data">
        <ul class="box-list" v-if="articles.length">
            <li v-for="article in articles" :key="article.id">
                <div class="box-consultation has-icon">
                    <NuxtLink :to="article.url.href" target="_blank" rel="">{{ article.title }}</NuxtLink>
                    <p v-html="article.description "></p>
                </div>
            </li>
        </ul>
    </BoxWidget>
</template>

<script lang="ts" setup>
import { useContentList } from '../composables/content';
import { CONSULTING_URL } from '../constants';
import BoxWidget from './BoxWidget';

const props = defineProps({
    perPage: {
        type: Number,
        default: 3,
    },
});

const data = {
    title: 'Останні консультації',
    link: CONSULTING_URL,
    linkText: 'Усі консультаціі',
    hasBorder: true,
};

const { articles } = await useContentList({ per_page: props.perPage }, 'consulting');
</script>

<style lang="scss">
.box-consultation {

    &.has-icon {
        &:before {
            content: '?';
            font-weight: 900;
            font-size: 16px;
            line-height: 20px;
            text-align: center;
            color: #7F808D;
        }
    }

    p {
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        overflow: hidden;
    }
}
</style>
