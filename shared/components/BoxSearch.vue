<template>
    <div class="box-search">
        <input v-model="query"
               @keydown.enter="search"
               @input="handleInput"
               type="text"
               placeholder="Шукати">
        <span @click="clear" v-if="query" class="clear-input"></span>
        <button type="button" @click="search" class="btn">Шукати</button>
    </div>
</template>

<script lang='ts' setup>
import { useRoute } from '#app';
import { ref, watch } from 'vue';

const props = defineProps({
    toGlobalSearch: {
        type: Boolean,
        default: true,
    },
});

const route = useRoute();
const query = ref(route.query.query || '');

const handleInput = (event: { target: { value: string }; }) => {
    query.value = event.target.value;
};

const clear = () => {
    query.value = '';
};

const search = () => {
    if (query.value === '') return;

    return navigateTo({
        path: props.toGlobalSearch ? '/search/all' : '/search',
        query: {
            query: query.value,
        },
        replace: true,
    });
};

watch(route, async ({ query: { query: queryString } }: { query: { query?: string | '' } }) => {
    query.value = queryString;
});
</script>
