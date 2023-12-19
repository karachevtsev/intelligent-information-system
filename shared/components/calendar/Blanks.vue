<template>
    <div class="calendar-card">
        <div :class="type === 'apply' ? 'calendar-blanks-apply' : 'calendar-blanks-pay'"
             class="calendar-card-header">
            <template v-if="type === 'apply'">
                Останній <br> день подання
            </template>
            <template v-else>
                Останній <br> день сплати
            </template>
        </div>
        <div class="calendar-card-content">
            <div class="calendar-card-date">
                <CalendarDate :date="new Date(date)"/>
            </div>
            <ul class="calendar-card-list">
                <li v-for="item in blanks">
                    <NuxtLink v-if="item.url" :to="item.url" rel="" target="_blank">{{ item.title }}</NuxtLink>
                    <span v-else>{{ item.title }}</span>
                </li>
            </ul>
        </div>
        <div class="calendar-card-btn">
            <NuxtLink class="btn btn-calendar" rel="" target="_blank" to="https://blank.dtkt.ua/">Перейти до всіх</NuxtLink>
        </div>
    </div>
</template>

<script lang='ts' setup>
import CalendarDate from './CalendarDate';

const { public: { apiBase } } = useRuntimeConfig();

const props = defineProps({
    type: String,
});

const {
    data: {
        value: {
            date: date,
            data: blanks,
        },
    },
} = await useFetch<any>('/blanks/widget', {
    baseURL: apiBase,
    key: `/blanks/widget?type=${props.type}`,
    params: {
        type: props.type,
    },
});
</script>
