<template>
    <div class="box">
        <slot name="head"></slot>
        <div class="box-content">
            <div class="articles-list-title">Новин: {{ total }}</div>
            <ul class="articles-list">
                <template v-for="(article, index) of articles" :key="article.id">
                    <slot :article="article" :index="index" name="item">
                        <li>
                            <div class="article-item-title">
                                <NuxtLink :to="article.url.pathname"><span v-text="article.title"></span></NuxtLink>
                                <client-only>
                                    <img
                                        v-if="article.access && !$client"
                                        alt=""
                                        height="16"
                                        loading="lazy"
                                        src="../assets/svg/article-lock.svg?url"
                                        width="13"
                                    />
                                    <img
                                        v-else-if="article.access && ($client?.additional?.packages?.thematic || $client?.additional?.packages?.news)"
                                        alt=""
                                        height="16"
                                        loading="lazy"
                                        src="../assets/svg/article-unlock.svg?url"
                                        width="13"
                                    />
                                </client-only>
                            </div>
                            <div class="article-item-description" v-text="article.description"></div>
                            <div class="article-item-info">
                                <span v-if="article.type" class="type-info" v-text="article.type"></span>
                            </div>
                        </li>
                    </slot>
                </template>
            </ul>
            <LoadMoreBtn title="Ще новини"/>
            <!--            <Pagination-->
            <!--                :highlight="state.pages"-->
            <!--                :page="state.page"-->
            <!--                :per-page="15"-->
            <!--                :to="{name: $route.name, params: $route.params, query:$route.query}"-->
            <!--                :total="total"-->
            <!--                class="d-none d-lg-block"-->
            <!--            />-->
        </div>
    </div>
</template>
<script lang="ts">

export default {
    props: {
        query: Object,
        category: {},
    },
    async setup(props: any, { emit }) {
        const { articles, meta: { total }, ...additional } = (await useContentList(props.query)).value;
        Object.entries(additional).forEach(([field, value]) => {
            emit(`update:${field}`, value);
        });
        return { articles, total, additional };
    },
};
</script>
