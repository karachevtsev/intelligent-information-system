<template>
    <div class="profile-data">
        <template v-if="total > 0">
            <div class="profile-table profile-articles">
                <div class="profile-table-headline">
                    Тут зберігаються обрані вами довідники
                    <br>
                    з сайту
                    <NuxtLink :to="SERVICES_URL" target="_blank" rel="">services.dtkt.ua</NuxtLink>
                </div>
                <div class="profile-table-row table-header">
                    <div class="profile-table-cell">Дата оновлення</div>
                    <div class="profile-table-cell">Довідник</div>
                    <div class="profile-table-cell">Видалити</div>
                </div>
                <div v-for="article in articles" :key="article.id" class="profile-table-row table-body">
                    <div class="profile-table-cell font-color-gray">
                        {{ new Date(article.publishedAt).toLocaleDateString('uk-UA') }}
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
                <NuxtLink :to="SERVICES_URL" class="btn btn-profile" target="_blank" rel="">Більше довідників</NuxtLink>
            </div>
        </template>
        <div v-else class="favorite-empty">
            <div class="favorite-empty-title">
                Зберігайте тут обрані довідники
                <br>
                з сайту
                <NuxtLink :to="SERVICES_URL" target="_blank" rel="">services.dtkt.ua</NuxtLink>
            </div>
            <Image name="favorite-empty" alt="Обрані довідники з сайту services.dtkt.ua"/>
            <StepAuth/>
            <div class="favorite-empty-step">
                <span>Крок 2</span>
                <p>Відмічайте обраний довідник, натиснувши на зірочку
                    <IconFavoriteStar icon-color="#DF253A"/>
                    поряд з заголовком
                </p>
            </div>
            <div class="favorite-empty-btn">
                <NuxtLink :to="SERVICES_URL" class="btn btn-profile" target="_blank" rel="">Більше довідників</NuxtLink>
            </div>
            <div class="favorite-empty-info">
                <h2>Що таке розділ «Довідники»?</h2>
                <p>Серед довідників ви знайдете інформацію щодо відповідальності бухгалтера та керівника, норми тривалості
                    робочого часу, індекси інфляції, розміри ЄСВ і податків, реквізити для сплати податків, терміни відпустки тощо.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNuxtApp, useRoute } from '#app';
import { watch, ref } from 'vue';
import { getClientContentListContext } from '~/composables/contentClient';
import { SERVICES_URL } from 'dtkt-shared/constants/index.js';
import Pagination from 'dtkt-shared/components/Pagination';

const { $client } = useNuxtApp();
const route = useRoute();
const perPage = ref(10);

const { items: articles, page, pages, toPage, total, deleteFavorite } = await getClientContentListContext(
    {
        perPage: perPage.value,
        page: +(route.query.page || 1),
    },
    'services',
    'favorite',
);

watch(articles, async (updatedArticles) => {
    if (updatedArticles.length === 0 && page.value > 1) {
        return navigateTo({
            path: '/services',
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
