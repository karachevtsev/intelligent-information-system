<template>
    <div class="header-search">
        <input v-model="inputValue"
               @input="handleInput"
               @keydown.enter="search(inputValue);"
               type="text"
               placeholder="Шукати"
        >
        <span class="clear-input" @click.stop="inputValue = ''" v-if="inputValue"></span>
        <span v-else class="find-input"></span>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits(['onStartSearch']);
const route = useRoute();
const inputValue = ref('');

const search = (query: string) => {
    if (query === '') return;

    emit('onStartSearch');

    return navigateTo({
        path: '/search/all',
        query: {
            query: query,
        },
        replace: true,
    });
};

const handleInput = (event) => {
    inputValue.value = event.target.value;
};

watch(route, () => {
    inputValue.value = '';
});
</script>
