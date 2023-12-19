<template>
    <div class="box box-stretch">
        <div class="box-header box-header-left">
            <h1 class="title-bordered">Помилка підтвердження</h1>
        </div>
        <div class="box-profile confirmations">
            <p>{{ props.error }}</p>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { useNuxtApp } from '#app';
import { watch } from 'vue';

const { $client } = useNuxtApp();

watch($client, () => {
    if ($client.value) {
        navigateTo({
            path: '/',
            replace: true,
        });
    }
});

const props = defineProps({
    error: String,
});
</script>
