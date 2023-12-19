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
        const today = new Date().toLocaleDateString('uk-UA'),
            date = new Date(props.date).toLocaleDateString('uk-UA'),
            time = new Date(props.date).toLocaleTimeString('uk-UA', {hour: '2-digit', minute: '2-digit'})
        return today === date ? `Сьогодні ${time}` : date;
    });
</script>

