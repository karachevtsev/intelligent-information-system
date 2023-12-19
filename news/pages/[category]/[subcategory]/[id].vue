<template>
    <NuxtLayout v-if="article" name="base">
        <template #top>
            <Breadcrumbs :breadcrumbs="breadcrumbs"
                         class="hide-on-mobile"/>
            <MainThemes buttonText="Мої новини"
                        favoriteLink="news"
                        class="hide-on-mobile"
            />
        </template>
        <div class="content">
            <div class="content-box">
                <div class="box mb-30">
                    <article :style="{ fontSize: fontSize + 'px' }" class="article">
                        <div class="article-controls">
                            <Sharer :url="article.url.href" :has-comments="Boolean(article.commentsThread)"/>
                            <FontSizer @setFontSize="setArticleFontSize"/>
                            <ClientOnly>
                                <BtnFavorite
                                    :isFavorite="favorite"
                                    :showSavedToast="showSavedToast"
                                    onSaveText="новини"
                                    onDeleteText="новин"
                                    class="article-btn-favorite-top"
                                    @addToFavorite="addToFavorite"
                                />
                            </ClientOnly>
                        </div>
                        <div class="article-header">
                            <div class="article-title">
                                <h1 v-html="article.title"></h1>
                                <ClientOnly>
                                    <BtnFavorite
                                        :isFavorite="favorite"
                                        :showSavedToast="showSavedToast"
                                        onSaveText="новини"
                                        onDeleteText="новин"
                                        class="article-btn-favorite-bottom"
                                        @addToFavorite="addToFavorite"
                                    />
                                </ClientOnly>
                            </div>
                            <p v-html="article.description"></p>
                        </div>
                        <div class="article-info">
                            <div class="article-stats">
                                <span v-if="article.type" class="type-info">{{ article.type }}</span>
                                <DateInfo :date="article.publishedAt"/>
                                <Number :value="article.hits" class="views-info"/>
                                <Number v-if="article.commentsCount && article.commentsThread" :value="article.commentsCount" class="comments-info"/>
                            </div>
                            <Sharer :url="article.url.href" :has-comments="Boolean(article.commentsThread)"/>
                            <FontSizer @setFontSize="setArticleFontSize"/>
                        </div>
                        <div class="article-content">
                            <img v-if="article.picture"
                                 :alt="article.title"
                                 :src="article.picture"
                                 class="article-image"
                                 onload="this.style.setProperty('--height', `${this.naturalHeight}px`)"
                            >
                            <ClientOnly>
                                <input
                                    v-if="article.access"
                                    id="access"
                                    :value="(article.access === 'auth' && $client) || ($client?.additional?.packages?.thematic || $client?.additional?.packages?.news) ? 1 : 0"
                                    type="hidden"
                                >
                            </ClientOnly>
                            <div class="article-text" v-html="article.text"></div>
                            <ClientOnly>
                                <Messengers/>
                                <NewsAccess
                                    v-if="article.access"
                                    :accessType="article.access"/>
                            </ClientOnly>
                        </div>
                        <Source :article="article"/>
                        <Tags :tags="article.tags"/>
                        <Attention/>
                        <TextAnalyse
                            :text="article.text"
                        />
                        <TrialSubscribeWidget/>
                    </article>
                </div>
                <Comments id="comments" :thread="article.commentsThread"/>
                <Related section="news" title="новини" link="новин"/>
            </div>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { useNuxtApp } from '#app';
import Attention from 'dtkt-shared/components/article/Attention';
import BtnFavorite from 'dtkt-shared/components/article/BtnFavorite';
import FontSizer from 'dtkt-shared/components/article/FontSizer';
import Messengers from 'dtkt-shared/components/article/Messengers';
import NewsAccess from 'dtkt-shared/components/article/NewsAccess';
import Related from 'dtkt-shared/components/article/Related';
import Sharer from 'dtkt-shared/components/article/Sharer';
import Source from 'dtkt-shared/components/article/Source';
import Tags from 'dtkt-shared/components/article/Tags';
import TrialSubscribeWidget from 'dtkt-shared/components/article/TrialSubscribeWidget';
import Breadcrumbs from 'dtkt-shared/components/Breadcrumbs';
import Comments from 'dtkt-shared/components/Comments';
import DateInfo from 'dtkt-shared/components/DateInfo';
import MainThemes from 'dtkt-shared/components/MainThemes';
import Number from 'dtkt-shared/components/Number';
import { useContent } from 'dtkt-shared/composables/content';
import { createError } from 'h3';
import { onMounted, ref } from 'vue';

definePageMeta({
    layout: false,
});

const route = useRoute();
const match = /^(?<id>\d+)(?:-(?<slug>.*))?$/.exec(route.params.id as string);
if (!match) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
}
const { article, favorite, setFavorite, refresh, hit, error } = await useContent(match.groups as { id: string, slug: string });

if (error.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
}

const breadcrumbs = [
    {
        title: 'Новини',
        url: '/',
    },
    {
        title: article.value.category.title,
        url: `/${article.value.category.slug}`,
    },
    {
        title: article.value.subcategory.title,
        url: `/${article.value.category.slug}/${article.value.subcategory.slug}`,
    },
];

onMounted(() => {
    hit();
});

const { $client, $bus } = useNuxtApp();
const showSavedToast = ref(false);

const addToFavorite = async () => {
    if (!$client.value) {
        $bus.$emit('openLoginModal', { open: true, tab: 'login' });
        return;
    }

    await setFavorite(!favorite.value).then(() => {
        showSavedToast.value = true;
        setTimeout(() => {
            showSavedToast.value = false;
        }, 1500);
        return;
    });
};

useHead({
    title: article.value.title,
    meta: [
        {
            name: 'description',
            content: article.value.description,
        },
        {
            property: 'og:title',
            content: article.value.title,
        },
        {
            property: 'og:description',
            content: article.value.description,
        },
        {
            property: 'og:image',
            content: article.value.shareImage,
        },
        {
            property: 'og:type',
            content: 'article',
        },
        {
            property: 'og:url',
            content: article.value.url.href,
        },
        {
            name: 'robots',
            content: 'max-image-preview:large',
        },
    ],
    link: [
        {
            rel: 'canonical',
            href: article.value.url.href,
        },
        //@ts-ignore
        ...(article.value.picture ? [{
            rel: 'preload',
            href: article.value.picture,
            as: 'image',
        }] : []),
    ],
});

const fontSize = ref(16);

const setArticleFontSize = (size: number) => {
    fontSize.value = size;
};
</script>
