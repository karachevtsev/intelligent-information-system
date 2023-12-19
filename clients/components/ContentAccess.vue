<template>
    <ContentBase>
        <div class="box-header box-header-left">
            <h1 class="title-bordered">{{ title }}</h1>
        </div>
        <div class="box-profile">
            <template v-if="$client">
                <slot></slot>
            </template>
            <Login v-else/>
        </div>
    </ContentBase>
</template>

<script lang="ts" setup>
import { useNuxtApp } from '#app';

const { $client } = useNuxtApp();

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
});
</script>
