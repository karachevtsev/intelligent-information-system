<template>
    <ul v-if="tags.length > 0" class="article-tags">
        <li v-for="tag in tags" :key="tag.slug">
            <NuxtLink :to="`/tags/${tag.slug}`">{{ tag.title }}</NuxtLink>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        tags: {
            type: Array,
            required: true
        },
    }
}
</script>
