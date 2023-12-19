<template>
    <span>{{ date }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    date: [String, Object],
});

const date = computed(() => new Date(props.date as any).toLocaleDateString('uk-UA'));
</script>

