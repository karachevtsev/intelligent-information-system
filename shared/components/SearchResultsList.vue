<template>
    <div class="box-results-list">
        <SearchResultsItem
            v-for="result in searchResults"
            :key='result.section'
            :section="result.section"
            :query="queryWord"
            :name="result.name"
            :url="result.url"
            :class="result.url === siteName ? 'active' : ''"
        >
            <SearchByGoogle v-if="result.url === siteName"/>
        </SearchResultsItem>
    </div>
</template>

<script lang='ts' setup>
import SearchResultsItem from './SearchResultsItem.vue';
import SearchByGoogle from './SearchByGoogle';

const { public: { siteName } } = useRuntimeConfig();

const props = defineProps({
    queryWord: {
        type: String,
        required: true,
    },
});

const searchResults = [
    {
        section: 'news',
        name: 'Новин',
        url: 'news',
    },
    {
        section: 'consulting',
        name: 'Консультацій',
        url: 'consulting',
    },
    {
        section: 'online',
        name: 'Статей',
        url: 'online',
    },
    {
        section: 'services',
        name: 'Довідників',
        url: 'services',
    },
    {
        section: 'documents',
        name: 'Документів',
        url: 'docs',
    },
    {
        section: 'blanks',
        name: 'Бланків',
        url: 'blank',
    },
    {
        section: 'webinars',
        name: 'Вебінарів',
        url: 'webinary',
    },
];
</script>
