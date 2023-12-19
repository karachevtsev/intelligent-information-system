<template>
    <div class="box-result">
        <template v-if="Object.keys(result).length !== 0 && result?.articles.length">
            <div class="articles-list-title">{{ name }}: {{ result?.total }}</div>
            <ul class="articles-list">
                <li v-for="article of result?.articles" :key="article.id">
                    <div class="article-item-title">
                        <NuxtLink :to="article.url.href"
                                  target="_blank"
                                  rel=""
                        >
                            <span v-html="section === 'blanks' ? article.fullName : article.title"></span>
                        </NuxtLink>
                        <ul v-if="section === 'documents'" class="article-item-meta article-meta-info">
                            <li v-if="article.publish.length">
                                <DocsInfoItems :items="article.publish"
                                               class="article-meta article-meta-publish"/>
                            </li>
                            <li v-if="article.vidy.length">
                                <DocsInfoItems :items="article.vidy"
                                               class="article-meta article-meta-document"/>
                            </li>
                            <li v-if="article.date">
                                <DateInfo :date="article.date"/>
                            </li>
                            <li v-if="article.number">
                                <span class="article-meta article-meta-number">{{ article.number }}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="article-item-description" v-html="section === 'blanks' ? article.shortName : (article?.description ?? '')"></div>
                    <div class="article-item-info" v-if="section === 'news' || section === 'consulting'">
                        <span v-if="article.type" class="type-info">{{ article.type }}</span>
                        <DateInfo :date="article.publishedAt"/>
                        <number v-if="article.hits" :value="article.hits" class="views-info"/>
                        <number v-if="article.commentsCount !== null" :value="article?.commentsCount" class="comments-info"/>
                    </div>
                    <div class="article-item-info" v-if="section === 'services'">
                        <span class="date-info">оновлено&nbsp<BoxWidgetDate :date="article.publishedAt"/></span>
                    </div>
                    <div class="article-item-info" v-if="section === 'online'">
                        <NuxtLink :to="article?.issue?.url" class="link-info" target="_blank" rel="">
                            <span v-html="article?.issue?.title"></span>
                        </NuxtLink>
                    </div>
                </li>
            </ul>
            <div class="box-result-all">
                <NuxtLink :to="`https://${url}.dtkt.ua/search?query=${query}`" target="_blank" rel="">
                    Усі результати
                    <svg fill="none" height="8" viewBox="0 0 5 8" width="5" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 0.999969L4 3.99997L1 6.99997" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="1.5"></path>
                    </svg>
                </NuxtLink>
            </div>
            <slot></slot>
        </template>
        <template v-else>
            <div class="box-result-nothing">
                За запитом <span class="query">({{ query }})</span> <b class="site-name">{{ name }}</b> не знайдено
            </div>
            <slot></slot>
        </template>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from '#app';
import { getContentListContext } from '../composables/content';
import Number from './Number';
import DateInfo from './DateInfo';
import BoxWidgetDate from './BoxWidgetDate';
import DocsInfoItems from './PopularDocsItems';
import { ref, watch } from 'vue';

const route = useRoute();
const perPage = 5;
const result = ref({});
const data = ref({});

const props = defineProps({
    section: String,
    name: String,
    query: String,
    url: String,
});

type Section = 'news' | 'consulting' | 'webinars' | 'blanks' | 'services' | 'documents' | 'dtkt'

const search = async (query: string, section: Section) => {
    if (query === '') return;

    data.value = await getContentListContext({
        query: query,
        per_page: perPage,
    }, section, 'search');

    result.value = { ...data.value };
};

await search(props.query, props.section as Section);

watch(route, async ({ query: { query: query } }: { query: { query?: string | '' } }) => {
    await search(query, props.section as Section);
});
</script>

