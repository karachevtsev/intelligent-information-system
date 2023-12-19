<template>
    <div class="content">
        <SearchResultsLocal/>
    </div>
</template>

<script lang="ts" setup>
import SearchResultsLocal from 'dtkt-shared/components/SearchResultsLocal';

useHead({
    meta: [
        {
            name: 'robots',
            content: 'noindex, follow',
        },
    ],
});
</script>
