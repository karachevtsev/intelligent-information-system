<template>
    <NuxtLayout name="base">
        <template #top>
            <Breadcrumbs :breadcrumbs="breadcrumbs"/>
            <MainThemes buttonText="Мої новини"
                        favoriteLink="news"
                        class="hide-on-mobile"
            />
        </template>
        <div class="content">
            <div class="content-box">
                <div class="box">
                    <div class="box-header">
                        <h1>Усі новини по тегу <span class="title-marked">«{{ title }}»</span></h1>
                    </div>
                    <div class="box-content pb-0">
                        <div class="articles-list-title">Новин: {{ total }}</div>
                        <ul class="articles-list">
                            <li v-for="article of articles" :key="article.id">
                                <div class="article-item-title">
                                    <NuxtLink :to="article.url.pathname">{{ article.title }}</NuxtLink>
                                    <LockIcon :access="article.access"/>
                                </div>
                                <div class="article-item-description">{{ article.description }}</div>
                                <div class="article-item-info">
                                    <span v-if="article.type" class="type-info">{{ article.type }}</span>
                                    <DateInfo :date="article.publishedAt"/>
                                    <Number :value="article.hits" class="views-info"/>
                                    <Number v-if="article.commentsCount" :value="article.commentsCount" class="comments-info"/>
                                </div>
                            </li>
                        </ul>
                        <Pagination
                            :highlight="pages"
                            :page="page"
                            :per-page="25"
                            :to="{name: $route.name, params: $route.params, query:$route.query}"
                            :total="total"
                        />
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { useNuxtApp } from '#app';
import Breadcrumbs from 'dtkt-shared/components/Breadcrumbs';
import DateInfo from 'dtkt-shared/components/DateInfo';
import MainThemes from 'dtkt-shared/components/MainThemes';
import Number from 'dtkt-shared/components/Number';
import Pagination from 'dtkt-shared/components/Pagination';
import { getContentListContext } from 'dtkt-shared/composables/content';
import { watch } from 'vue';

definePageMeta({
    layout: false,
});

const { $client } = useNuxtApp();
const route = useRoute();

const { articles, more, toPage, total, page, pages, tag: { slug, title } } = await getContentListContext({
    page: +(route.query.page || 1),
    tag: <string>route.params.tag,
    per_page: 25,
});

watch(route, async ({ query: { page: _page = '1' } }: { query: { page?: string } }) => {
    if (page.value !== +_page) {
        await toPage(+_page);
    }
});

const breadcrumbs = [
    {
        title: 'Новини',
        url: '/',
    },
    {
        title: 'Усі теги',
        url: '/tags',
    },
    {
        title: title,
        url: `/tags/${slug}`,
    },
];

useHead({
    meta: [
        {
            name: 'robots',
            content: 'noindex, follow',
        },
    ],
});
</script>
