<template>
    <div v-click-outside="hide" class="mobile-search">
        <div class="mobile-search-btn" @click.stop="open = !open">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="transparent">
                <path
                    d="M7.67077 14.3415C11.3549 14.3415 14.3415 11.3549 14.3415 7.67077C14.3415 3.98661 11.3549 1 7.67077 1C3.98661 1 1 3.98661 1 7.67077C1 11.3549 3.98661 14.3415 7.67077 14.3415Z"
                    stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M17 17L12.3846 12.3846" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="mobile-search-container">
            <div class="mobile-search-box" v-if="open">
                <HeaderSearch @onStartSearch="hide"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HeaderSearch from './HeaderSearch';

const open = ref(false);
const hide = () => open.value = false;
</script>
