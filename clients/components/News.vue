<template>
    <div class="profile-data">
        <template v-if="total > 0">
            <div class="profile-table profile-articles">
                <div class="profile-table-headline">
                    Тут зберігаються обрані вами новини
                    <br>
                    з сайту
                    <NuxtLink :to="NEWS_URL" target="_blank" rel="">news.dtkt.ua</NuxtLink>
                </div>
                <div class="profile-table-row table-header">
                    <div class="profile-table-cell">Дата новини</div>
                    <div class="profile-table-cell">Новина</div>
                    <div class="profile-table-cell">Видалити</div>
                </div>
                <div v-for="article in articles" :key="article.id" class="profile-table-row table-body">
                    <div class="profile-table-cell font-color-gray">{{
                            new Date(article.publishedAt).toLocaleDateString('uk-UA')
                        }}
                    </div>
                    <div class="profile-table-cell profile-table-caption">
                        <NuxtLink :to="article.url" target="_blank" rel="">{{ article.title }}</NuxtLink>
                    </div>
                    <div class="profile-table-cell">
                        <button type="button" class="btn-table-delete"
                                @click="deleteFavorite(article.id)"></button>
                    </div>
                </div>
            </div>
            <Pagination
                v-if="total > perPage"
                :highlight="pages"
                :page="page"
                :per-page="perPage"
                :total="total"
            />
            <div class="profile-table-btn">
                <NuxtLink :to="NEWS_URL" class="btn btn-profile" target="_blank" rel="">Читати новини</NuxtLink>
            </div>
        </template>
        <div v-else class="favorite-empty">
            <div class="favorite-empty-title">
                Зберігайте тут обрані новини
                <br>
                з сайту
                <NuxtLink :to="NEWS_URL" target="_blank" rel="">news.dtkt.ua</NuxtLink>
            </div>
            <Image name="favorite-empty" alt="Обрані новини з сайту news.dtkt.ua"/>
            <StepAuth/>
            <div class="favorite-empty-step">
                <span>Крок 2</span>
                <p>Відмічайте обрану новину, натиснувши на закладку
                    <IconFavorite icon-color="#8BBA43"/>
                    поряд з заголовком
                </p>
            </div>
            <div class="favorite-empty-btn">
                <NuxtLink :to="NEWS_URL" class="btn btn-profile" target="_blank" rel="">Читати новини</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNuxtApp, useRoute } from '#app';
import { watch, ref } from 'vue';
import { getClientContentListContext } from '~/composables/contentClient';
import { NEWS_URL } from 'dtkt-shared/constants/index.js';
import Pagination from 'dtkt-shared/components/Pagination';

const { $client } = useNuxtApp();
const route = useRoute();
const perPage = ref(10);

const { items: articles, page, pages, toPage, total, deleteFavorite } = await getClientContentListContext(
    {
        perPage: perPage.value,
        page: +(route.query.page || 1),
    },
    'news',
    'favorite',
);

watch(articles, async (updatedArticles) => {
    if (updatedArticles.length === 0 && page.value > 1) {
        return navigateTo({
            path: '/news',
            query: {
                page: page.value - 1,
            },
            replace: true,
        });
    }
});

watch(route, async ({ query: { page: _page = '1' } }: { query: { page?: string } }) => {
    if (page.value !== +_page) {
        await toPage(+_page);
    }
});
</script>
