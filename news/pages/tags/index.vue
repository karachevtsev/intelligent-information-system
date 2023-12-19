<template>
    <div class="content">
        <TagsAll section="news"/>
    </div>
</template>

<script setup lang="ts">
import TagsAll from 'dtkt-shared/components/TagsAll';

useHead({
    meta: [
        {
            name: 'robots',
            content: 'noindex, follow',
        },
    ],
});
</script>
