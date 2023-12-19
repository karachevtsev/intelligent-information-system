<template>
    <div class="content">
        <div class="content-box">
            <div class="box">
                <div class="box-header">
                    <h1>Усі рубрики</h1>
                </div>
                <div class="box-content box-contents pb-0">
                    <div class="contents">
                        <div v-for="category in rubrics" :key="category.id" class="contents-item">
                            <div class="contents-header">
                                <b>
                                    <NuxtLink :to="category.slug">{{ category.title }}</NuxtLink>
                                </b>
                                <b class="count">{{ category.contentCount }}</b>
                            </div>
                            <ul>
                                <li v-for="subcategory in category.subcategories">
                                    <NuxtLink :to="`/${category.slug}/${subcategory.slug}`">{{ subcategory.title }}</NuxtLink>
                                    <span class="count">{{ subcategory.contentCount }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRubrics } from 'dtkt-shared/composables/content';

const rubrics = await useRubrics('news');

useHead({
    meta: [
        {
            name: 'robots',
            content: 'noindex, follow',
        },
    ],
});
</script>
