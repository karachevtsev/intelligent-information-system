<template>
    <div :class="currentVariant" class="spinner"></div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
    variant?: string
}>();

const variants = {
    warning: 'spinner-warning',
};

const currentVariant = computed(() => {
    return variants[props.variant];
});
</script>

<style lang="scss">
.spinner {
    display: inline-block;
    width: 35px;
    height: 35px;
    border-style: solid;
    border-width: 3px;
    border-top-color: $spinner-color;
    border-left-color: $spinner-color;
    border-bottom-color: $spinner-color;
    border-right-color: transparent;
    border-radius: 50%;
    animation: 0.75s linear infinite spinner;

    &.spinner-warning {
        border-top-color: $color-warning;
        border-left-color: $color-warning;
        border-bottom-color: $color-warning;
    }
}

@keyframes spinner {
    to {
        transform: rotate(360deg)
    }
}
</style>
