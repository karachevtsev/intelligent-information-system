<template>
    <NuxtLayout name="base">
        <template #top>
            <MainThemes buttonText="Мої новини"
                        favoriteLink="news"
            />
            <InfoLine/>
        </template>
        <div class="content">
            <div class="content-box">
                <div class="box box-center">
                    <div class="box-header">
                        <ContentFilter
                            v-model="sort"
                            :options="options"
                            defaultName="Новини"
                            isMainTitle
                        />
                        <RubricsMenu/>
                    </div>
                    <div class="box-content pb-0">
                        <ul v-if="articles?.length" class="articles-list">
                            <li v-for="article of articles" :key="article.id">
                                <div class="article-item">
                                    <div class="article-item-title">
                                        <NuxtLink :to="article.url.pathname">{{ article.title }}</NuxtLink>
                                        <LockIcon :access="article.access"/>
                                    </div>
                                    <div class="article-item-info">
                                        <span v-if="article.type" class="type-info">{{ article.type }}</span>
                                        <DateInfo :date="article.publishedAt"/>
                                        <Number :value="article.hits" class="views-info"/>
                                        <Number v-if="article.commentsCount" :value="article.commentsCount" class="comments-info"/>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <Pagination
                            :highlight="pages"
                            :page="page"
                            :per-page="per_page"
                            :total="total"
                            @page="toPage"
                        />
                        <LoadMoreBtn title="Ще новини" @click="more"/>
                    </div>
                </div>
                <AccountantCalendar>
                    <Webinars/>
                    <Blanks type="apply"/>
                    <Blanks type="pay"/>
                </AccountantCalendar>
            </div>
            <div class="sidebar sidebar-right">
                <JournalsDtkt/>
                <RecentConsultations class="mb-30"/>
                <Calendar/>
            </div>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { useNuxtApp } from '#app';
import { ref, watch } from 'vue';
import { getContentListContext } from 'dtkt-shared/composables/content';
import AccountantCalendar from 'dtkt-shared/components/calendar/AccountantCalendar';
import Blanks from 'dtkt-shared/components/calendar/Blanks';
import Webinars from 'dtkt-shared/components/calendar/Webinars';
import ContentFilter from 'dtkt-shared/components/ContentFilter';
import DateInfo from 'dtkt-shared/components/DateInfo';
import JournalsDtkt from 'dtkt-shared/components/JournalsDtkt';
import MainThemes from 'dtkt-shared/components/MainThemes';
import Number from 'dtkt-shared/components/Number';
import Pagination from 'dtkt-shared/components/Pagination';
import RubricsMenu from 'dtkt-shared/components/RubricsMenu';
import RecentConsultations from 'dtkt-shared/components/RecentConsultations';
import LoadMoreBtn from 'dtkt-shared/components/LoadMoreBtn';
import InfoLine from 'dtkt-shared/components/InfoLine';
import LockIcon from '~/components/LockIcon';
import Calendar from '~/components/Calendar';

const { $client } = useNuxtApp();
const per_page = 30;

definePageMeta({
    layout: false,
});

const options = [
    { value: '', name: 'Останні новини' },
    { value: 'main', name: 'Головні новини' },
    { value: 'popular', name: 'Популярні новини' },
    { value: 'commented', name: 'Найбільш коментовані' },
];

const route = useRoute();
const sort = ref<'main' | 'popular' | 'commented' | 'hot' | ''>(<''>options.find(({ value }) => value === route.query.sort)?.value || '');

const { articles, more, toPage, total, page, pages } = await getContentListContext({
    page: +(route.query.page || 1),
    per_page,
    sort_by: sort.value || 'hot',
}, 'news', 'content');

watch(route, async (value) => {
    let need = false;
    let params: any = void 0;
    if (page.value !== +(route.query.page || '1')) {
        need = true;
    }
    const sort_by = <''>route.query.sort || '';
    if (options.find(({ value }) => value === sort_by)) {
        if (sort.value !== sort_by || 'hot') {
            sort.value = sort_by || 'hot';
            params = { sort_by: <'main'>sort.value };
            need = true;
        }
    }
    if (need) {
        await toPage(+(route.query.page || '1'), params);
    }
});

const { public: { baseUrl } } = useRuntimeConfig();

useHead({
    link: [
        {
            rel: 'canonical',
            href: baseUrl,
        },
    ],
    meta: [
        {
            name: 'robots',
            content: 'max-image-preview:large',
        },
    ],
});
</script>
