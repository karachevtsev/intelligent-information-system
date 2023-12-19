<template>
    <div class="profile-data">
        <template v-if="total > 0">
            <div class="profile-table profile-blanks">
                <div class="profile-table-headline">
                    Тут зберігаються обрані вами бланки
                    <br>
                    з сайту
                    <NuxtLink :to="BLANK_URL" target="_blank" rel="">blank.dtkt.ua</NuxtLink>
                </div>
                <div class="profile-table-row table-header">
                    <div class="profile-table-cell">Найменування бланку</div>
                    <div class="profile-table-cell">Подання</div>
                    <div class="profile-table-cell">Сплата</div>
                    <div class="profile-table-cell">Видалити</div>
                </div>
                <div v-for="article in normalizedArticles" :key="article.id" class="profile-table-row table-body text-left">
                    <div class="profile-table-cell profile-table-caption">
                        <NuxtLink :to="article.url" target="_blank" rel="">{{ article.fullName }}</NuxtLink>
                    </div>
                    <div class="profile-table-cell">
                        <div class="blanks-type">
                            <span class="blanks-type-title">Подання:</span>
                            <ul v-if="article?.apply">
                                <template v-for="date in article.apply">
                                    <li>
                                        {{ new Date(date?.date).toLocaleDateString('uk-UA') }}
                                    </li>
                                </template>
                            </ul>
                            <span v-else class="empty-type">відсутнє</span>
                        </div>
                    </div>
                    <div class="profile-table-cell">
                        <div class="blanks-type">
                            <span class="blanks-type-title">Сплата:</span>
                            <ul v-if="article?.pay">
                                <template v-for="date in article.pay">
                                    <li>
                                        {{ new Date(date?.date).toLocaleDateString('uk-UA') }}
                                    </li>
                                </template>
                            </ul>
                            <span v-else class="empty-type">відсутня</span>
                        </div>
                    </div>
                    <div class="profile-table-cell">
                        <button type="button" class="btn-table-delete"
                                @click="deleteBlankFavorite(article.id)"></button>
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
                <NuxtLink :to="BLANK_URL" class="btn btn-profile" target="_blank" rel="">Обрати бланк</NuxtLink>
            </div>
        </template>
        <div v-else class="favorite-empty">
            <div class="favorite-empty-title">
                Зберігайте тут обрані бланки
                <br>
                з сайту
                <NuxtLink :to="BLANK_URL" target="_blank" rel="">blank.dtkt.ua</NuxtLink>
            </div>
            <Image name="favorite-empty" alt="Обрані бланки з сайту blank.dtkt.ua"/>
            <StepAuth/>
            <div class="favorite-empty-step">
                <span>Крок 2</span>
                <p>Відмічайте обраний бланк, натиснувши на закладку
                    <IconFavorite icon-color="#337CE9"/>
                    поряд з заголовком
                </p>
            </div>
            <div class="favorite-empty-btn">
                <NuxtLink :to="BLANK_URL" class="btn btn-profile" target="_blank" rel="">Обрати бланк</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNuxtApp, useRoute } from '#app';
import { watch, ref, computed } from 'vue';
import { getClientContentListContext } from '~/composables/contentClient';
import { BLANK_URL } from 'dtkt-shared/constants/index.js';
import Pagination from 'dtkt-shared/components/Pagination';

const { $client } = useNuxtApp();
const route = useRoute();
const perPage = ref(10);

const { items: articles, page, pages, toPage, total, deleteBlankFavorite } = await getClientContentListContext(
    {
        perPage: perPage.value,
        page: +(route.query.page || 1),
    },
    'blanks',
    'favorite',
);

const normalizedArticles = computed(() => {
    return articles.value.map((article) => {
        const payTypeDates = article.dates.reduce((prev: { [x: string]: any[]; }, curr: { [x: string]: string | number; }) => {
            (prev[curr['type']] = prev[curr['type']] || []).push(curr);
            return prev;
        }, {});

        return { ...article, ...payTypeDates };
    });
});

watch(articles, async (updatedArticles) => {
    if (updatedArticles.length === 0 && page.value > 1) {
        return navigateTo({
            path: '/blanks',
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
