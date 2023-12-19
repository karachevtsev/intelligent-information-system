<template>
    <div class="content-box">
        <div class="box">
            <div class="box-header box-filter">
                <h1>Результати пошуку за <span class="title-marked">«{{ queryWord }}»</span></h1>
                <template v-if="hasFilter">
                    <DateFilter
                        v-model="currentOption"
                        :defaultOption="defaultOption"
                        :options="options"
                    />
                </template>
            </div>
            <div class="box-content pb-0">
                <BoxSearch :toGlobalSearch="false"/>
                <div class="box-result">
                    <template v-if="Object.keys(result).length !== 0 && result?.articles.length">
                        <div class="articles-list-title">{{ items }}: {{ result?.total }}</div>
                        <ul class="articles-list">
                            <li v-for="article of result?.articles" :key="article.id">
                                <div class="article-item-title">
                                    <NuxtLink :to="article.url.pathname"><span
                                        v-html="section === 'blanks' ? article.fullName : article.title"></span></NuxtLink>
                                </div>
                                <template v-if="section === 'blanks'">
                                    <div class="article-item-description" v-html="article.shortName"></div>
                                </template>
                                <template v-else>
                                    <div class="article-item-description" v-html="article.description"></div>
                                </template>
                                <div class="article-item-info" v-if="section === 'news' || section === 'consulting'">
                                    <span v-if="article.type" class="type-info">{{ article.type }}</span>
                                    <DateInfo v-if="article.publishedAt" :date="article.publishedAt"/>
                                    <Number v-if="article.hits" :value="article.hits" class="views-info"/>
                                    <Number v-if="article.commentsCount" :value="article.commentsCount" class="comments-info"/>
                                </div>
                                <div class="article-item-info" v-if="section === 'services'">
                                    <span class="date-info">оновлено&nbsp<BoxWidgetDate :date="article.publishedAt"/></span>
                                </div>
                                <div class="article-item-info is-online-color" v-if="section === 'online'">
                                    <NuxtLink :to="article?.issue?.url" class="link-info" target="_blank" rel="">
                                        <span v-html="article?.issue?.title"></span>
                                    </NuxtLink>
                                </div>
                            </li>
                        </ul>
                        <Pagination
                            v-if="result.total > perPage"
                            :highlight="result.pages"
                            :page="result.page"
                            :per-page="perPage"
                            :to="{name: $route.name, params: $route.params, query:$route.query}"
                            :total="+result.total"
                        />
                    </template>
                    <div class="no-results" v-else>По вашому запиту <span>({{ queryWord }})</span> нічого не знайдено...</div>
                </div>
                <SearchByGoogle/>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { getContentListContext } from '../composables/content';
import Pagination from './Pagination';
import DateInfo from './DateInfo';
import DateFilter from './DateFilter';
import Number from './Number';
import BoxWidgetDate from './BoxWidgetDate';
import SearchByGoogle from './SearchByGoogle';
import BoxSearch from './BoxSearch';

const props = defineProps({
    section: {
        type: String,
        default: 'news',
    },
    items: {
        type: String,
        default: 'Новин',
    },
    hasFilter: {
        type: Boolean,
        default: true,
    },
});

const route = useRoute();
const queryWord = ref(route.query.query || '');
const perPage = 25;
const result = ref({});
const data = ref({});

const currentOption = ref(route.query.period || 'year');
const defaultOption = 'За рік';
const options = [
    { value: 'all', name: 'За весь час' },
    { value: 'year', name: 'За рік' },
    { value: 'month', name: 'За місяць' },
];

const search = async (query: string, page = route.query.page || 1, period = route.query.period || 'year') => {
    if (query === '') return;

    //@ts-ignore
    data.value = await getContentListContext({
        page: +page,
        query: query,
        per_page: perPage,
        period: period,
    }, props.section, 'search');

    result.value = { ...data.value };
    queryWord.value = query;
    currentOption.value = period;
};

await search(queryWord.value as string);

watch(data, () => {
    result.value = { ...data.value };
});

watch(route, async ({ query: { page: _page = '1', query: query } }: { query: { page?: string, query?: string | '' } }) => {
    await search(query as string, +_page);
});

watch(currentOption, async (value) => {
    navigateTo({
        path: route.path,
        query: {
            ...route.query,
            page: 1,
            query: queryWord.value,
            period: value,
        },
        replace: true,
    });
});
</script>
