<template>
    <div class="calendar-card">
        <div class="calendar-card-header calendar-events">
            Семінари для <br> бухгалтерів
        </div>
        <div class="calendar-card-content">
            <div v-if="events.length" class="calendar-card-date">
                <DateInfo :date="events[0].date"/>
            </div>
            <ul class="calendar-card-list">
                <template v-if="events.length">
                    <li v-for="event in events" :key="event.id">
                        <NuxtLink :to="event.event_link" rel="" target="_blank">{{ event.title }}</NuxtLink>
                        <p v-if="event.lecturer">Лектор: {{ event.lecturer }}</p>
                        <p v-if="event.organizer">Організатор: {{ event.organizer }}</p>
                    </li>
                </template>
                <template v-else>
                    <li>
                        <p class="m-0">Найближча подія вже зовсім скоро. Очікуйте на анонс.</p>
                    </li>
                </template>
            </ul>
        </div>
        <div class="calendar-card-btn">
            <NuxtLink class="btn btn-calendar" rel="" target="_blank" to="https://dtkt.ua/seminars">Перейти до семінарів</NuxtLink>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { useContentList } from '../../composables/content';
import DateInfo from '../../components/DateInfo';

const { articles: events } = await useContentList({ per_page: 1 }, 'dtkt', 'external-events');
</script>
