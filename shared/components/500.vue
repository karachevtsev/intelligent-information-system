<template>
    <div class="error-page">
        <h1>Ой, щось пішло не так…</h1>
        <p>Перезавантажте сторінку або зайдіть пізніше</p>
        <picture>
            <img src="../assets/img/500.jpg" alt="Ой, щось пішло не так…" loading="lazy">
        </picture>
        <p>Можливо, спробуєте одне з цих посилань?</p>
        <div class="error-page-buttons">
            <NuxtLink to="/" class="btn" @click="$emit('clearError')">Перейти на головну</NuxtLink>
            <NuxtLink to="mailto:info@dtkt.ua" class="btn" @click.prevent="$bus.$emit('openContactModal', true)">Написати нам</NuxtLink>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { useNuxtApp } from '#app';

const { $bus } = useNuxtApp();
</script>

