<template>
    <div class="modal-block" @mousedown="closePopup" v-if="props.modelValue">
        <div @mousedown.stop @keydown.esc="closePopup" class="modal" ref="popup" tabindex="0">
            <div class="modal-header">
                <slot name="header"></slot>
            </div>
            <div class="modal-content">
                <slot name="content"></slot>
            </div>
            <button v-if="showCloseButton" @click="closePopup" class="close"></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue';

interface Props {
    modelValue?: boolean;
    showCloseButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
    showCloseButton: true,
});

const emit = defineEmits(['update:modelValue']);

const popup = ref<HTMLElement>();

watchEffect(() => {
    if (props.modelValue) focusAtPopup();

    toggleBodyScroll();
});

function closePopup(): void {
    emit('update:modelValue', false);
}

function toggleBodyScroll(): void {
    if (process.client) {
        const scrollBarWidth = window.innerWidth - document.body.offsetWidth;
        document.body.classList.toggle('no-scroll', props.modelValue);
        document.body.style.paddingRight = props.modelValue ? `${scrollBarWidth}px` : '0px';
    }
}

function focusAtPopup(): void {
    setTimeout(() => {
        if (popup.value) popup.value.focus();
    }, 100);
}

onMounted(() => {
    if (props.modelValue) focusAtPopup();
});
</script>

<style lang="scss">
$modal-border-radius: 6px;
$modal-header-background: #A2D2EC !default;

.modal-block {
    position: fixed;
    z-index: 5;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.8);
}

.modal {
    position: relative;
    width: 500px;
    margin: 0 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    border-radius: $modal-border-radius;
    background: $white;
    outline: none;

    &-header {
        padding: 15px;
        font-weight: 700;
        font-size: 18px;
        text-align: center;
        color: $white;
        background: $modal-header-background;
        border-radius: $modal-border-radius $modal-border-radius 0 0;
    }

    &-content {
        padding: 30px;
    }

    .close {
        position: absolute;
        top: -32px;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        padding: 0;
        margin: 0;
        outline: none;
        border: none;
        cursor: pointer;
        background: transparent;

        &:after,
        &:before {
            content: '';
            position: absolute;
            left: 50%;
            margin-left: -11px;
            width: 22px;
            height: 3px;
            border-radius: 2px;
            background: $black;
            transform-origin: 50% 50%;

            @media (min-width: 374px) {
                background: $white;
            }
        }

        &:after {
            transform: rotate3d(0, 0, 1, 45deg);
        }

        &:before {
            transform: rotate3d(0, 0, 1, -45deg);
        }
    }
}
</style>
