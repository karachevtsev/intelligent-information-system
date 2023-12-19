<template>
    <div class="content-box">
        <div class="box">
            <div class="box-header">
                <h1>Результати пошуку за <span class="title-marked">«{{ queryWord }}»</span></h1>
            </div>
            <div class="box-content pb-0">
                <BoxSearch/>
                <SearchResultsList :queryWord="queryWord"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import BoxSearch from './BoxSearch';
import SearchResultsList from './SearchResultsList';

const route = useRoute();
const queryWord = ref(route.query.query || '');

watch(route, async ({ query: { query: query } }: { query: { query?: string | '' } }) => {
    queryWord.value = query as string;
});
</script>
