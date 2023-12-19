<template>
    <div v-if="events.length" class="box mb-30">
        <div class="box-header">
            <h2>Семінари для бухгалтерів</h2>
        </div>
        <div class="box-content">
            <div class="seminars-list">
                <div class="seminar-event" v-for="event of events" :key="event.id">
                    <NuxtLink :to="event.event_link" target="_blank" rel="nofollow">{{ event.title }}</NuxtLink>
                    <p v-if="event.lecturer">Лектор: {{ event.lecturer }}</p>
                    <SeminarsDate :date="event.date"/>
                </div>
            </div>
        </div>
        <div class="box-link">
            <NuxtLink to="/seminars">
                Усі семінари
                <svg fill="none" height="8" viewBox="0 0 5 8" width="5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 0.999969L4 3.99997L1 6.99997" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                </svg>
            </NuxtLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useContentList } from '../composables/content';
import SeminarsDate from './SeminarsDate';

const { articles: events } = await useContentList({ per_page: 4 }, 'dtkt', 'external-events');
</script>

<style lang="scss">
.seminars-list {
    .seminar {
        color: $gray-dark;

        &-event {
            a {
                display: block;
                margin-bottom: 10px;
                color: inherit;

                &:hover {
                    color: $color-main;
                }
            }

            p {
                margin: 0;
                color: $gray-light;
            }

            + .seminar-event {
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid $gray-lighter;
            }
        }

        &-date {
            display: flex;
            align-items: center;
            margin-top: 15px;
            font-weight: 400;
            font-size: 14px;

            svg {
                position: relative;
                top: -1px;
                flex-shrink: 0;
                margin-right: 4px;
                stroke: $gray-dark;
            }
        }
    }
}
</style>
