<template>
    <div class="calendar-header">
        <button type="button" @click="selectPrevious" class="calendar-prev"></button>
        <span>{{ selectedMonth }}</span>
        <button type="button" @click="selectNext" class="calendar-next"></button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    selectedDate: {
        type: Object,
        required: true,
    },
    currentDate: {
        type: String,
        required: true,
    },
});

const selectedMonth = computed(() => {
    return props.selectedDate.format('MMMM YYYY');
});

const emit = defineEmits(['dateSelected', 'dateSelected']);

const selectPrevious = () => {
    const newSelectedDate = (props.selectedDate).subtract(1, 'month');
    emit('dateSelected', newSelectedDate);
};

const selectNext = () => {
    const newSelectedDate = (props.selectedDate).add(1, 'month');
    emit('dateSelected', newSelectedDate);
};
</script>
