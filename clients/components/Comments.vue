<template>
    <div class="profile-data">
        <template v-if="total > 0">
            <div class="profile-table profile-comments">
                <div class="profile-table-headline">
                    Тут зберігаються всі ваші коментарі під
                    <NuxtLink :to="NEWS_URL" target="_blank" rel="">новинами</NuxtLink>
                    та <br>
                    <NuxtLink :to="CONSULTING_URL" target="_blank" rel="">консультаціями</NuxtLink>
                    на нашому сайті
                </div>
                <div class="profile-table-row table-header">
                    <div class="profile-table-cell">Дата коментаря</div>
                    <div class="profile-table-cell">Що коментували</div>
                    <div class="profile-table-cell">Ваш коментар</div>
                </div>
                <div v-for="comment in comments" class="profile-table-row table-body">
                    <div class="profile-table-cell font-color-gray">
                        {{ new Date(comment.created_at).toLocaleDateString('uk-UA') }}
                    </div>
                    <div class="profile-table-cell profile-table-caption text-left">
                        <NuxtLink :to="comment.content.url" target="_blank" rel="">{{ comment.content.title }}</NuxtLink>
                    </div>
                    <div class="profile-table-cell font-color-gray text-left">
                        {{ comment.comment }}
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
                Тут зберігаються всі ваші коментарі під
                <NuxtLink :to="NEWS_URL" target="_blank" rel="">новинами</NuxtLink>
                та <br>
                <NuxtLink :to="CONSULTING_URL" target="_blank" rel="">консультаціями</NuxtLink>
                на нашому сайті
            </div>
            <Image name="favorite-empty" alt="Тут зберігаються всі ваші коментарі"/>
            <div class="favorite-empty-info">
                <h2>Як залишити коментар?</h2>
                <p>Під кожною новиною або консультацією є форма для написання коментарів.
                    <br>
                    Заповніть її та натисніть кнопку «Надіслати коментар»
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNuxtApp, useRoute } from '#app';
import { watch, ref } from 'vue';
import { getClientContentListContext } from '~/composables/contentClient';
import { NEWS_URL, CONSULTING_URL } from 'dtkt-shared/constants/index.js';
import Pagination from 'dtkt-shared/components/Pagination';

const { $client } = useNuxtApp();
const route = useRoute();
const perPage = ref(10);

const { items: comments, page, pages, toPage, total } = await getClientContentListContext(
    {
        perPage: perPage.value,
        page: +(route.query.page || 1),
    },
    'dtkt',
    'my-comments',
);

watch(route, async ({ query: { page: _page = '1' } }: { query: { page?: string } }) => {
    if (page.value !== +_page) {
        await toPage(+_page);
    }
});
</script>
