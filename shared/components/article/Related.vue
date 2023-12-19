<template>
    <div class="box noprint">
        <div class="box-header">
            <h2>Усі {{ title }} рубрики <span class="title-marked">«{{ subcategory.title }}»</span></h2>
        </div>
        <div class="box-content">
            <ul class="articles-list">
                <li v-for="article of articles" :key="article.id">
                    <div class="article-item-title">
                        <NuxtLink v-slot="{href, navigate}" :to="article.url.pathname" custom>
                            <a :href="href" v-text="article.title" @click.prevent="navigate()"/>
                        </NuxtLink>
                    </div>
                    <div class="article-item-description" v-text="article.description"></div>
                    <div class="article-item-info">
                        <DateInfo :date="article.publishedAt"/>
                        <Number v-if="article.hits" :value="article.hits" class="views-info"/>
                        <Number v-if="article.commentsCount" :value="article.commentsCount" class="comments-info"/>
                    </div>
                </li>
            </ul>
        </div>
        <div class="box-link-center">
            <NuxtLink :to="`/${category.slug}/${subcategory.slug}`">
                Більше {{ link }}
                <svg fill="none" height="8" viewBox="0 0 5 8" width="5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 0.999969L4 3.99997L1 6.99997" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                </svg>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from '#app';
import { getContentListContext } from 'dtkt-shared/composables/content';
import DateInfo from 'dtkt-shared/components/DateInfo';
import Number from 'dtkt-shared/components/Number';

const props = defineProps({
    section: String,
    title: String,
    link: String,
});

const route = useRoute();

const { articles, pages, category, subcategory } = await getContentListContext({
    category: <string>route.params.category,
    subcategory: <string>route.params.subcategory,
    per_page: 5,
}, props.section);
</script>
