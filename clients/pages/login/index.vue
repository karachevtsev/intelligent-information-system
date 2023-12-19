<template>
    <ContentBase>
        <Login/>
    </ContentBase>
</template>

<script setup lang="ts">
import { useNuxtApp } from '#app';
import { watch } from 'vue';

const { $client } = useNuxtApp();

const redirect = async () => {
    if ($client.value) {
        navigateTo({
            path: '/',
            replace: true,
        });
    }
};

await redirect();

watch($client, async () => await redirect());
</script>
