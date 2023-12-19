<template>
    <div class="modal-report-denied">
        <p>Подавати звітність через веб-сервіс «СОТА» можуть лише передплатники пакетів «Профі», «Профі Плюс»
            та «Паперовий «Дебет-Кредит»</p>
        <p>
            <NuxtLink :to="SUBSCRIBE_URL" target="_blank" rel="" class="btn btn-profile">Оформити передплату</NuxtLink>
        </p>
    </div>
</template>

<script lang='ts' setup>
import { SUBSCRIBE_URL } from 'dtkt-shared/constants/index.js';
</script>

<style lang='scss'>
.modal-report-denied {
    text-align: center;

    p {
        font-size: 16px;
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }
    }
}
</style>
