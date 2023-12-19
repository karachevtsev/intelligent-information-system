<template>
    <span class="date-info" v-html="publishDate"></span>
</template>

<script setup>
import {computed} from "vue";

const
    props = defineProps(
        {
            date: {
                type: [String, Object]
            }
        }
    ),
    publishDate = computed(() => {
        const today = new Date().toLocaleDateString('uk-UA');
        const date = new Date(props.date).toLocaleDateString('uk-UA');

        return today === date ? `Сьогодні` : date;
    });
</script>
