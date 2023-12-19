<template>
    <span>{{ separatedItems }}</span>
</template>

<script lang='ts' setup>
import { computed } from 'vue';

const props = defineProps({
    items: Array,
});

const separatedItems = computed(() => {
    return props.items.join(', ');
});
</script>
