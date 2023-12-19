<template>
    <div class="box mb-30">
        <div class="box-header">
            <h2>{{ isNews ? 'Головне' : 'Головні новини' }}</h2>
        </div>
        <div class="box-content">
            <ul class="main-news">
                <li v-for="article of articles" :key="article.id">
                    <NuxtLink :class="article.important ? 'important_2' : 'important_1'"
                              :to="isNews ? article.url.pathname : article.url.href"
                              rel=""
                    >{{ article.title }}
                    </NuxtLink>
                </li>
            </ul>
        </div>
        <div class="box-link">
            <NuxtLink :replace="route.path === '/'"
                      :to="isNews ? '/?sort=main' : `${NEWS_URL}?sort=main`"
                      rel=""
            >
                Усі головні
                <svg fill="none" height="8" viewBox="0 0 5 8" width="5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 0.999969L4 3.99997L1 6.99997" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                </svg>
            </NuxtLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRoute } from '#app';
import { computed } from 'vue';
import { useContentList } from '../composables/content';
import { NEWS_URL } from '../constants';

const { public: { siteName } } = useRuntimeConfig();
const route = useRoute();

const { articles } = await useContentList({ sort_by: 'main', per_page: 5 }, 'news');

const isNews = computed(() => siteName === 'news');
</script>
