<template>
    <div class="profile-data">
        <template v-if="total > 0">
            <div class="profile-table profile-documents">
                <div class="profile-table-headline">
                    Тут зберігаються обрані вами нормативні
                    <br>
                    документи з сайту
                    <NuxtLink :to="DOCS_URL" target="_blank" rel="">docs.dtkt.ua</NuxtLink>
                </div>
                <div class="profile-table-row table-header">
                    <div class="profile-table-cell">Нормативний документ</div>
                    <div class="profile-table-cell">Видалити</div>
                </div>
                <div v-for="article in articles" :key="article.id" class="profile-table-row table-body">
                    <div class="profile-table-cell profile-table-caption">
                        <NuxtLink :to="article.url" target="_blank" rel="">{{ article.title }}</NuxtLink>
                        <div class="profile-table-description">
                            <span v-for="publish in article?.publish">{{ publish }}</span>.
                            <span v-for="vidy in article?.vidy">{{ vidy }}</span>
                            від {{ article?.date }} №{{ article?.number }}
                        </div>
                    </div>
                    <div class="profile-table-cell">
                        <button type="button" class="btn-table-delete"
                                @click="deleteOnlineFavorite(article.uid)"></button>
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
                <NuxtLink :to="DOCS_URL" class="btn btn-profile" target="_blank" rel="">Переглянути документи</NuxtLink>
            </div>
        </template>
        <div v-else class="favorite-empty">
            <div class="favorite-empty-title">
                Зберігайте тут обрані нормативні документи
                <br>
                з сайту
                <NuxtLink :to="DOCS_URL" target="_blank" rel="">docs.dtkt.ua</NuxtLink>
            </div>
            <Image name="favorite-empty" alt="Обрані нормативні документи з сайту docs.dtkt.ua"/>
            <StepAuth/>
            <div class="favorite-empty-step">
                <span>Крок 2</span>
                <p>Відмічайте обраний документ, натиснувши на закладку
                    <IconFavorite icon-color="#31B0E5"/>
                    поряд з заголовком
                </p>
            </div>
            <div class="favorite-empty-btn">
                <NuxtLink :to="DOCS_URL" class="btn btn-profile" target="_blank" rel="">Переглянути документи</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNuxtApp, useRoute } from '#app';
import { watch, ref } from 'vue';
import { getClientContentListContext } from '~/composables/contentClient';
import { DOCS_URL } from 'dtkt-shared/constants/index.js';
import Pagination from 'dtkt-shared/components/Pagination';

const { $client } = useNuxtApp();
const route = useRoute();
const perPage = ref(10);

const { items: articles, page, pages, toPage, total, deleteOnlineFavorite } = await getClientContentListContext(
    {
        perPage: perPage.value,
        page: +(route.query.page || 1),
    },
    'documents',
    'favorite',
);

watch(articles, async (updatedArticles) => {
    if (updatedArticles.length === 0 && page.value > 1) {
        return navigateTo({
            path: '/documents',
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
