<template>
    <div class="content">
        <SearchResults/>
    </div>
</template>

<script lang="ts" setup>
import SearchResults from 'dtkt-shared/components/SearchResults';

useHead({
    meta: [
        {
            name: 'robots',
            content: 'noindex, follow',
        },
    ],
});
</script>
