<template>
    <div class="main-themes">
        <span class="main-themes-title">Важливі теми</span>
        <div class="main-themes-row">
            <div :class="{end}" class="main-themes-slider">
                <ul ref="slider">
                    <li v-for="theme in themes">
                        <NuxtLink :target="theme.target" :to="theme.url"><span v-html="theme.title"></span></NuxtLink>
                    </li>
                </ul>
            </div>
            <div class="main-themes-btn">
                <NuxtLink :to="favoriteLink ? `https://my.dtkt.ua/${favoriteLink}` : 'https://my.dtkt.ua/'"
                          class="btn"
                          rel=""
                          target="_blank">
                    {{ buttonText }}
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { debounce } from '../utils/debounce';
import { useLinks } from '../composables/links';

const props = defineProps({
    buttonText: String,
    favoriteLink: String,
});

const slider = ref<HTMLUListElement>();
const end = ref(false);

const onScroll = debounce(function () {
    const el = slider.value!;
    end.value = el.scrollWidth - el.scrollLeft - el.clientWidth <= 20;
});

onMounted(() => {
    slider.value?.addEventListener('scroll', onScroll, { passive: true });
});

onBeforeUnmount(() => {
    slider.value?.removeEventListener('scroll', onScroll);
});

const themes = await useLinks('topics');
</script>
