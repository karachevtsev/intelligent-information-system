<template>
    <span>{{ date }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    date: String,
    type: Number,
});

const date = computed(() => {
    const date = new Date(props.date as string);
    const locales = 'uk-UA';

    const dateType = {
        0: `(у ${date.toLocaleDateString(locales, { year: 'numeric' })} р.)`,
        1: `(${date.toLocaleDateString(locales, { year: 'numeric', month: 'long' })})`,
        2: `(з ${date.toLocaleDateString(locales)} р.)`,
    };

    return dateType[props.type];
});
</script>
