<template>
    <div class="info-line info-line-rates">
        <div class="info-line-title">Базові ставки {{ currentYear }}</div>
        <div class="info-line-list">
            <BaseRatesList/>
        </div>
    </div>
</template>

<script lang="ts" setup>
import BaseRatesList from './BaseRatesList';

const currentYear = computed(() => {
    return new Date().getFullYear();
});
</script>

