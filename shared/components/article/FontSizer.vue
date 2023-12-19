<template>
    <div class="article-font">
        <button type="button" @click="decreaseFontSize">-</button>
        <button type="button" @click="resetFontSize">A</button>
        <button type="button" @click="increaseFontSize">+</button>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const ARTICLE_DEFAULT_FONT_SIZE = 16;
const ARTICLE_MAX_FONT_SIZE = 22;
const ARTICLE_MIN_FONT_SIZE = 10;
const FONT_SIZE_STORAGE_KEY = 'fontSize';
const FONT_SIZE_STEP = 2;

const count = ref(0);
const fontSize = ref(ARTICLE_DEFAULT_FONT_SIZE);

const emit = defineEmits(['setFontSize']);

const increaseFontSize = () => {
    if (fontSize.value === ARTICLE_MAX_FONT_SIZE) return;

    fontSize.value += FONT_SIZE_STEP;
    emit('setFontSize', fontSize.value);
};

const decreaseFontSize = () => {
    if (fontSize.value === ARTICLE_MIN_FONT_SIZE) return;

    fontSize.value -= FONT_SIZE_STEP;
    emit('setFontSize', fontSize.value);
};

const resetFontSize = () => {
    fontSize.value = ARTICLE_DEFAULT_FONT_SIZE;
    emit('setFontSize', fontSize.value);
};

onMounted(() => {
    fontSize.value = localStorage.getItem(FONT_SIZE_STORAGE_KEY) ? parseInt(localStorage.getItem(FONT_SIZE_STORAGE_KEY)!) : ARTICLE_DEFAULT_FONT_SIZE;
    emit('setFontSize', fontSize.value);
});

watch(fontSize, (value) => {
    localStorage.setItem(FONT_SIZE_STORAGE_KEY, `${value}`);
});
</script>

<style lang="scss">
.article-font {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;

    button {
        @include button-reset();
        display: flex;
        justify-content: center;
        align-items: center;
        width: 25px;
        height: 25px;
        background-color: $white;
        font-size: 21px;
        line-height: 25px;
        text-transform: uppercase;
        color: $gray-light;

        @include laptop-lg() {
            color: $black;
        }

        &:hover {
            background-color: $white;
            color: $color-main;
        }
    }
}
</style>
