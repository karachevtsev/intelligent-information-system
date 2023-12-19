<template>
    <p>Date index page</p>
</template>

<script setup lang="ts">
import { createError } from 'h3';

throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
</script>
