<template>
    <span v-text="value"></span>
</template>

<script setup>
import {computed} from "vue";

const
    props = defineProps({value: Number}),
    value = computed(() => {
        if (props.value !== null) {
            return props.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        }
    });
</script>
