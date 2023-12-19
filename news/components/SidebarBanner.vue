<template>
    <div v-if="$client?.additional?.no_advert !== true" class="box box-banner mb-30">
        <div class="box-banner-content">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import {useNuxtApp} from '#app';
const {$client} = useNuxtApp();
</script>

