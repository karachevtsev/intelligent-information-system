<template>
    <ul v-if="rates?.data.length" :class="{'box-list': showFullRates}">
        <li v-for="rate in rates.data">
            <div v-if="showFullRates" class="box-rate has-icon">
                <div class="box-rate-text">
                    <NuxtLink :to="rate.url" target="_blank" rel="">{{ rate.description }}</NuxtLink>
                    <BaseRatesDates :date="rate.date" :type="rate.dateType" class="box-rate-date"/>
                </div>
                <span class="box-rate-value">{{ rate.value }}</span>
            </div>
            <template v-else>
                <NuxtLink :to="rate.url" target="_blank" rel="">{{ rate.title }}</NuxtLink>
                {{ rate.value }}
            </template>
        </li>
    </ul>
</template>

<script lang="ts" setup>
import { useFetch } from '#app';
import BaseRatesDates from './BaseRatesDates';

const props = defineProps({
    showFullRates: {
        type: Boolean,
        default: false,
    },
});

const { public: { apiBase } } = useRuntimeConfig();

const { data: rates } = await useFetch('dtkt/base-rates', {
    baseURL: apiBase,
    method: 'GET',
    key: 'dtkt/base-rates',
});
</script>

<style lang="scss">
.box-rate {
    display: flex;

    &.has-icon {
        &:before {
            background: $white url(../assets/svg/base-rates.svg) no-repeat center;
        }

        a {
            padding-left: 0;
        }
    }

    &-text {
        display: flex;
        flex-direction: column;
        padding-left: 25px;

        a {
            margin-right: 5px;
        }

        @include tablet() {
            flex-direction: row;
            flex-wrap: wrap;
        }
    }

    &-date {
        margin-top: 5px;
        color: $gray;

        @include tablet() {
            margin-top: 0;
        }
    }

    &-value {
        margin-left: auto;
        padding-left: 20px;
        flex-shrink: 0;
    }
}
</style>>
