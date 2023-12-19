<template>
    <NuxtLink to="/" class="site-logo">
        {{ title }}
    </NuxtLink>
</template>

<script lang="ts" setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
});
</script>
