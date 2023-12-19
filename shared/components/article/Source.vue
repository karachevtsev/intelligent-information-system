<template>
    <div class="article-source">
        <p v-if="article?.author">
            <span>Автор: </span>
            <span class="author">{{ article.author.name }}</span>
        </p>
        <p v-if="article?.origin">
            <span>{{ article.origin.type === 1 ? 'На підставі' : 'Джерело' }}: </span>
            <NuxtLink :to="article.origin.url" target="_blank">{{ article.origin.origin }}</NuxtLink>
        </p>
        <p v-if="article?.category">
            <span>Рубрика: </span>
            <NuxtLink :to="`/${article.category.slug}`">{{ article.category.title }}</NuxtLink>
            <span class="slash">/</span>
            <NuxtLink :to="`/${article.category.slug}/${article.subcategory.slug}`">{{ article.subcategory.title }}</NuxtLink>
        </p>
    </div>
</template>

<script>
export default {
    props: {
        article: {
            type: Object,
            required: true
        },
    }
}
</script>
