<template>
    <div class="profile-data">
        <template v-if="total > 0">
            <div class="profile-table profile-articles">
                <div class="profile-table-headline">
                    Тут зберігаються обрані вами статті
                    <br>
                    з електронного журналу «Дебет Кредит»
                </div>
                <div class="profile-table-row table-header">
                    <div class="profile-table-cell">Журнал</div>
                    <div class="profile-table-cell">Стаття</div>
                    <div class="profile-table-cell">Видалити</div>
                </div>
                <div v-for="article in articles" :key="article.id" class="profile-table-row table-body">
                    <div class="profile-table-cell font-color-gray">{{ article.issue.title }}</div>
                    <div class="profile-table-cell profile-table-caption">
                        <NuxtLink :to="article.url" target="_blank" rel="">{{ article.title }}</NuxtLink>
                    </div>
                    <div class="profile-table-cell">
                        <button type="button" class="btn-table-delete"
                                @click="deleteOnlineFavorite(article.id)"></button>
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
                <NuxtLink :to="ONLINE_URL" class="btn btn-profile" target="_blank" rel="">Читати статті</NuxtLink>
            </div>
        </template>
        <div v-else class="favorite-empty">
            <div class="favorite-empty-title">
                Зберігайте тут обрані статті
                <br>
                з електронного журналу «Дебет Кредит»
            </div>
            <Image name="favorite-empty" alt="Обрані статті з електронного журналу «Дебет Кредит»"/>
            <StepAuth/>
            <div class="favorite-empty-step">
                <span>Крок 2</span>
                <p>Відмічайте обрану статтю, натиснувши на закладку
                    <IconFavorite icon-color="#FEA331"/>
                    поряд з заголовком
                </p>
            </div>
            <div class="favorite-empty-btn">
                <NuxtLink to="https://online.dtkt.ua/ " class="btn btn-profile" target="_blank" rel="">Читати статті</NuxtLink>
            </div>
            <div class="favorite-empty-info">
                <h2>Хто може читати електронний журнал?</h2>
                <p>Передплатники пакетів «Експерт», «Профі», «Профі Плюс» та «Паперовий Дебет-Кредит».</p>
                <p>Дізнайтесь більше про переваги передплатних пакетів за
                    <NuxtLink :to="SUBSCRIBE_URL">посиланням.</NuxtLink>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNuxtApp, useRoute } from '#app';
import { watch, ref } from 'vue';
import StepAuth from '~/components/StepAuth.vue';
import { getClientContentListContext } from '~/composables/contentClient';
import { SUBSCRIBE_URL, ONLINE_URL } from 'dtkt-shared/constants/index.js';
import Pagination from 'dtkt-shared/components/Pagination';

const { $client } = useNuxtApp();
const route = useRoute();
const perPage = ref(10);

const { items: articles, page, pages, toPage, total, deleteOnlineFavorite } = await getClientContentListContext(
    {
        perPage: perPage.value,
        page: +(route.query.page || 1),
    },
    'online',
    'favorite',
);

watch(articles, async (updatedArticles) => {
    if (updatedArticles.length === 0 && page.value > 1) {
        return navigateTo({
            path: '/articles',
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
