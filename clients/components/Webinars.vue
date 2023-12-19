<template>
    <div class="profile-data">
        <template v-if="total > 0">
            <div class="profile-table profile-webinars">
                <div class="profile-table-headline">
                    Тут зберігаються вебінари редакції,
                    <br>
                    на які ви зареєструвались, з сайту
                    <NuxtLink :to="WEBINARY_URL" target="_blank" rel="">webinary.dtkt.ua</NuxtLink>
                </div>
                <div class="profile-table-row table-header">
                    <div class="profile-table-cell">Дата проведення</div>
                    <div class="profile-table-cell">Тема вебінару</div>
                </div>
                <div v-for="article in articles" :key="article.id" class="profile-table-row table-body">
                    <div class="profile-table-cell font-color-gray">
                        {{ new Date(article.webinar.date).toLocaleDateString('uk-UA') }}
                    </div>
                    <div class="profile-table-cell profile-table-caption">
                        <NuxtLink :to="article.url" target="_blank" rel="">{{ article.title }}</NuxtLink>
                        <div class="profile-table-description">Лектор: {{ article.author.name }}</div>
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
        </template>
        <div v-else class="favorite-empty">
            <div class="favorite-empty-title">
                Тут зберігаються вебінари редакції, на які ви
                <br>
                зареєструвались, з сайту
                <NuxtLink :to="WEBINARY_URL" target="_blank" rel="">webinary.dtkt.ua</NuxtLink>
            </div>
            <Image name="favorite-empty" alt="Вебінари редакції, на які ви зареєструвались, з сайту webinary.dtkt.ua"/>
            <div class="favorite-empty-info">
                <h2>Хто може реєструватись на вебінари?</h2>
                <p>Передплатники пакетів «Профі», «Профі Плюс» та «Паперовий Дебет-Кредит» мають
                    змогу дивитись вебінари безкоштовно. Усі інші – після оплати.
                </p>
            </div>
            <div class="favorite-empty-info">
                <h2>Як зареєструватись на вебінар?</h2>
                <p>Зареєструватись для перегляду ви зможете на сторінці вебінару на сайті
                    <NuxtLink :to="WEBINARY_URL" target="_blank" rel="">webinary.dtkt.ua.</NuxtLink>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNuxtApp, useRoute } from '#app';
import { watch, ref } from 'vue';
import { getClientContentListContext } from '~/composables/contentClient';
import { WEBINARY_URL } from 'dtkt-shared/constants/index.js';
import Pagination from 'dtkt-shared/components/Pagination';

const { $client } = useNuxtApp();
const route = useRoute();
const perPage = ref(10);

const { items: articles, page, pages, toPage, total } = await getClientContentListContext(
    {
        per_page: perPage.value,
        page: +(route.query.page || 1),
    },
    'webinars',
    'webinars',
);

watch(route, async ({ query: { page: _page = '1' } }: { query: { page?: string } }) => {
    if (page.value !== +_page) {
        await toPage(+_page);
    }
});
</script>
