<template>
    <div class="modal-canvas" @mousedown="closePopup">
        <transition name="show">
            <div @mousedown.stop @keydown.esc="closePopup" class="modal-canvas-container" ref="popup" tabindex="0" v-if="props.modelValue">
                <template v-if="props.hasTabs">
                    <slot></slot>
                </template>
                <template v-else>
                    <div class="modal-canvas-header">
                        <span>{{ props.title }}</span>
                    </div>
                    <div class="modal-canvas-divider"></div>
                    <div class="modal-canvas-content">
                        <slot></slot>
                    </div>
                </template>
                <button @click="closePopup" class="close"></button>
            </div>
        </transition>
        <transition name="fade">
            <div class="modal-canvas-backdrop" v-if="props.modelValue"></div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue';

interface Props {
    modelValue?: boolean;
    hasTabs?: boolean;
    title?: string;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
    hasTabs: false,
    title: '',
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

.modal-canvas {
    position: fixed;
    z-index: 10;
    top: $header-height;
    right: 0;
    height: 0;

    @include laptop-lg() {
        top: 0;
    }

    &-container {
        position: relative;
        background-color: $white;
        outline: none;
        width: 100%;
        max-width: 320px;
        transition: all .3s;
        z-index: 3;

        @include laptop-lg() {
            width: 560px;
            max-width: 560px;
        }
    }

    &-header {
        background: #FAFAFA;
        padding: 20px 40px 0 40px;

        @include laptop-lg() {
            padding-left: 130px;
            padding-right: 130px;
        }

        span {
            display: inline-block;
            position: relative;
            padding-bottom: 10px;
            font-size: 16px;
            line-height: 22px;
            color: #000000;

            &:before {
                content: '';
                position: absolute;
                width: 130px;
                height: 5px;
                left: 0;
                bottom: 0;
                background: #F1C40F;
            }
        }
    }

    &-divider {
        height: 30px;
        width: 100%;
        background: linear-gradient(180deg, rgba(255, 255, 255, 1) 30%, rgba(255, 255, 255, 0) 100%);
    }

    &-content {
        position: relative;
        padding: 0 40px 200px 40px;
        height: calc(100vh - #{$header-height});
        overflow-y: auto;

        @include scroll();

        @include laptop-lg() {
            padding-left: 130px;
            padding-right: 130px;
            padding-bottom: 50px;
        }
    }

    .close {
        display: flex;
        position: absolute;
        border: none;
        width: $header-height;
        height: $header-height;
        top: 0;
        padding: 0;
        margin: 0;
        outline: none;
        left: -5px;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition-duration: 300ms;
        background: transparent;

        @media (min-width: 374px) {
            left: -$header-height;
        }

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
            transition: top 0.3s 0.3s, transform 0.3s;

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

    &-backdrop {
        position: fixed;
        z-index: 2;
        transition: all 0.2s linear;
        height: auto;
        width: auto;
        right: 0;
        bottom: 0;
        left: 0;
        top: $header-height;
        background-color: rgba(0, 0, 0, 0.8);

        @include laptop-lg() {
            top: 0;
        }
    }

    .show-enter-active,
    .show-leave-active, {
        transition: all 0.3s;
        transform: translateX(0);
    }

    .show-enter-from,
    .show-leave-to {
        transform: translateX(100%);
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
}
</style>
