<template>
    <b>лише {{ priceToFixed }} грн/міс</b>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const { public: { apiBase } } = useRuntimeConfig();

const props = defineProps({
    product: String,
    plan: String,
});

const { base: { price } } = await $fetch<any>(`/shop4/price/${props.product}/${props.plan}`, {
    method: 'GET',
    baseURL: apiBase,
});

const priceToFixed = computed(() => {
    return parseInt(price).toFixed(0);
});
</script>
