<template>
    <div class="to-top">
        <div class="to-top-btn" @click="scrollTop" v-if="visible">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 27V5" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7 14L16 5L25 14" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <slot v-else/>
    </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';

const visible = ref(false);
const scrolling = ref(false);

const scrollListener = () => {
    visible.value = window.scrollY > 300;
};

if (process.client) {
    window.addEventListener('scroll', scrollListener, {
        passive: true,
        capture: true,
    });
}
const scrollTop = () => {
    if (scrolling.value) {
        return;
    }

    scrolling.value = true;

    let intervalId = setInterval(() => {
        if (window.scrollX === 0) {
            scrolling.value = false;
            clearInterval(intervalId);
        }

        window.scrollTo(0, 0);
    }, 10);
};

onUnmounted(() => {
    window.removeEventListener('scroll', scrollListener);
});
</script>

<style lang="scss">
.to-top {
    position: fixed;
    right: 15px;
    bottom: 130px;
    z-index: 10;

    @include laptop-lg() {
        right: 35px;
        bottom: 150px;
    }

    &-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: $color-main;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
            background: $color-success-muted;
        }
    }
}
</style>
