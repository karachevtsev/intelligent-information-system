<template>
    <div class="calendar-day"
         :class="{'not-current': !day.isCurrentMonth,'current': isToday }"
    >
        <NuxtLink v-if="day.hasContent" :to=url>{{ date }}</NuxtLink>
        <span v-else>{{ date }}</span>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { computed } from 'vue';

const props = defineProps({
    day: {
        type: Object,
        required: true,
    },
    isToday: {
        type: Boolean,
        default: false,
    },
});

const date = computed(() => {
    return dayjs(props.day.date).format('D');
});

const url = computed(() => {
    return `/date/${dayjs(props.day.date).format('YYYY/MM/DD')}`;
});
</script>
