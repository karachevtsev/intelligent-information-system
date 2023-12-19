<template>
    <button type="button" class="btn btn-profile" @click="$bus.$emit('askQuestion')">Поставити запитання</button>
</template>

<script lang='ts' setup>
import { useNuxtApp } from '#app';

const { $bus } = useNuxtApp();
</script>
