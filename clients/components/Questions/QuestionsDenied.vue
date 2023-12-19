<template>
    <div class="modal-content-questions">
        <p>Ставити запитання консультантам редакції можуть лише передплатники пакетів «Профі», «Профі Плюс» та «Паперовий «Дебет-Кредит»</p>
        <NuxtLink :to="SUBSCRIBE_URL" target="_blank" rel="" class="btn btn-profile">Оформити передплату</NuxtLink>
    </div>
</template>

<script lang='ts' setup>
import { SUBSCRIBE_URL } from 'dtkt-shared/constants/index.js';
</script>

