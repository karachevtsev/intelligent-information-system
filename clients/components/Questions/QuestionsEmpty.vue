<template>
    <div class="favorite-empty">
        <div class="favorite-empty-title">
            Тут зберігаються відповіді на ваші запитання
            <br>
            консультантам редакції «Дебет-Кредит»
        </div>
        <Image name="password-done" alt="Відповіді на ваші запитання"/>
        <div class="favorite-empty-btn">
            <QuestionsButton/>
        </div>
        <div class="favorite-empty-info">
            <h2>Хто може ставити питання консультантам редакції?</h2>
            <p>Передплатники пакетів «Профі», «Профі Плюс» та «Паперовий «Дебет-Кредит» мають змогу ставити запитання
                консультантам редакції. Детальніше про сервіс –
                <NuxtLink to="/consulting_abt" target="_blank" rel="">за посиланням.</NuxtLink>
            </p>
        </div>
    </div>
</template>

<script lang='ts' setup>
import Image from '~/components/Image.vue';
import QuestionsButton from '~/components/Questions/QuestionsButton.vue';
</script>

