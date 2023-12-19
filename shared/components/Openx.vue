<template>
    <ins :data-revive-id="$openx.id" :data-revive-zoneid="props.zone"></ins>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

const { $openx } = useNuxtApp();
const props = defineProps({
    zone: { type: String, required: true },
});

onMounted(() => {
    $openx.load(props.zone);
});
</script>

