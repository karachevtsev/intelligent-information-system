<template>
    <div class="info-line">
        <div class="info-line-title">Курси валют</div>
        <div class="info-line-list info-line-list-currency">
            <ul v-if="currencies?.data.length">
                <li v-for="currency in currencies.data" :key="currency.code" :class="`is-${currency.change}`">
                    <span>{{ currency.code }}</span> <span>{{ currency.rate.toFixed(2) }}</span>
                    <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M4 0C4.22881 0 4.44824 0.0996619 4.61003 0.277061L7.74732 3.71703C8.08423 4.08644 8.08423 4.68538 7.74732 5.0548C7.41041 5.42421 6.86417 5.42421 6.52726 5.0548L4.86276 3.22971L4.86287 9.05403C4.86288 9.57647 4.47664 9.99999 4.00018 10C3.52371 10 3.13745 9.57651 3.13744 9.05407L3.13733 3.22961L1.47274 5.0548C1.13583 5.42421 0.589593 5.42421 0.252683 5.0548C-0.0842276 4.68538 -0.0842276 4.08644 0.252683 3.71703L3.38997 0.277061C3.55176 0.0996618 3.77119 0 4 0Z"/>
                    </svg>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { useFetch } from '#app';

const { public: { apiBase } } = useRuntimeConfig();

const { data: currencies } = await useFetch('dtkt/currencies', {
    baseURL: apiBase,
    method: 'GET',
    params: {
        'ccy': 'USD,EUR,PLN',
    },
    key: 'dtkt/currencies',
});
</script>

