<template>
    <div class="favorite-empty">
        <div class="favorite-empty-btn">
            <ReportAddButton/>
        </div>
        <div class="favorite-empty-info">
            <h2>Хто може скористатись сервісом?</h2>
            <p>Передплатники пакетів «Профі», «Профі Плюс» та «Паперовий «Дебет-Кредит» мають змогу подавати і зберігати податкову та іншу звітність
                за допомогою сервісу «СОТА». Детальніше про сервіс –
                <NuxtLink to="https://sota-buh.com.ua/page/hint/modul-zvitnist" target="_blank">за посиланням.</NuxtLink>
            </p>
        </div>
    </div>
</template>

<script lang='ts' setup>
import ReportAddButton from '~/components/Report/ReportAddButton';
</script>
