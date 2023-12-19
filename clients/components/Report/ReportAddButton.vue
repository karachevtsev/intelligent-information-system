<template>
    <button type="button" class="btn btn-profile" @click="$bus.$emit('openReportModal', { 'content': 'form'})">Додати підприємство або ФОП</button>
</template>

<script lang='ts' setup>
import { useNuxtApp } from '#app';

const { $client, $bus } = useNuxtApp();
</script>
