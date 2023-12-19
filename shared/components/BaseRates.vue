<template>
    <BoxWidget :data="data">
        <BaseRatesList :showFullRates="true"/>
    </BoxWidget>
</template>

<script lang="ts" setup>
import BoxWidget from './BoxWidget';
import BaseRatesList from './BaseRatesList';

const data = {
    title: 'Базові ставки',
    link: 'https://services.dtkt.ua/catalogues',
    linkText: 'Усі ставки',
};
</script>
