<template>
    <BoxWidget :data="data">
        <ul class="box-list" v-if="articles.length">
            <li v-for="article in articles" :key="article.id">
                <div class="box-document has-icon">
                    <NuxtLink :to="article.url.href" target="_blank" rel="">{{ article.title }}</NuxtLink>
                    <p>
                        <PopularDocsItems :items="article.publish"/>
                        |
                        <PopularDocsItems :items="article.vidy"/>
                        від
                        <PopularDocsDate :date="article.date"/>
                        <template v-if="article.number"> № {{ article.number }}</template>
                    </p>
                </div>
            </li>
        </ul>
    </BoxWidget>
</template>

<script lang="ts" setup>
import { useContentList } from '../composables/content';
import BoxWidget from './BoxWidget';
import PopularDocsDate from './BoxWidgetDate';
import PopularDocsItems from './PopularDocsItems';
import { DOCS_URL } from '../constants';

const data = {
    title: 'Важливі документи',
    link: DOCS_URL,
    linkText: 'Усі документи',
};

const { articles } = await useContentList({ per_page: 6 }, 'documents', 'popular');
</script>

<style lang="scss">
.box-document {
    &.has-icon {
        &:before {
            background: $white url(../assets/svg/popular-doc.svg) no-repeat center;
        }
    }
}
</style>
