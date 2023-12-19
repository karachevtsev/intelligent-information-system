<template>
    <div class="modal-content-questions">
        <p>У цьому місяці у вас не залишилося активних консультацій від редакції. Знову поставити запитання ви зможете у наступному місяці
            передплати.</p>
        <p>Скористайтеся нашою базою готових відповідей
            на сайті «Консультації»</p>
        <NuxtLink :to="CONSULTING_URL" target="_blank" rel="" class="btn btn-profile">Перейти до консультацій</NuxtLink>
    </div>
</template>

<script lang='ts' setup>
import { CONSULTING_URL } from 'dtkt-shared/constants/index.js';
</script>

