<template>
    <div class="seminar-date">
        <svg v-if="hasIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
                d="M13 2.5H3C2.72386 2.5 2.5 2.72386 2.5 3V13C2.5 13.2761 2.72386 13.5 3 13.5H13C13.2761 13.5 13.5 13.2761 13.5 13V3C13.5 2.72386 13.2761 2.5 13 2.5Z"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11 1.5V3.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 1.5V3.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2.5 5.5H13.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span v-text="date"></span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    date: String,
    hasIcon: {
        type: Boolean,
        default: true,
    },
});

const date = computed(() => {
    const date = new Date(props.date as string);
    const locale = 'uk-UA';

    return `${date.toLocaleDateString(locale, { month: 'long', day: 'numeric' })}, ${date.toLocaleDateString(locale, { weekday: 'long' })}`;
});
</script>
