<template>
    <BoxWidget :data="data">
        <ul class="box-list" v-if="articles.length">
            <li v-for="article in articles" :key="article.id">
                <div class="box-blank has-icon">
                    <NuxtLink :target="target" :to="isBlanks ? article.url.pathname : article.url.href" rel="">{{ article.fullName }}</NuxtLink>
                </div>
            </li>
        </ul>
    </BoxWidget>
</template>

<script lang='ts' setup>
import { computed } from 'vue';
import { BLANK_URL } from '../constants';
import { useContentList } from '../composables/content';
import BoxWidget from './BoxWidget';

const { public: { siteName } } = useRuntimeConfig();

const isBlanks = computed(() => siteName === 'blank');

const url = computed(() => isBlanks.value ? '/blanks?sort=popular' : BLANK_URL);

const target = computed(() => isBlanks.value ? '_self' : '_blank');

const data = {
    title: 'Популярні бланки',
    link: url.value,
    linkText: 'Усі бланки',
    hasBorder: true,
};

const { articles } = await useContentList({ sort_by: 'popular', per_page: 5 }, 'blanks', 'blanks');


</script>

<style lang='scss'>
.box-blank {
    &.has-icon {
        &:before {
            background: url(../assets/svg/docs.svg) no-repeat center;
        }
    }
}
</style>
