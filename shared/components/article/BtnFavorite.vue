<template>
    <div class="article-btn-favorite">
        <button class="btn-favorite" type="button" @click="$emit('addToFavorite')">
            <svg :class="$client && isFavorite ? 'is-favorite' : ''" height="25" viewBox="0 0 18 25" width="18"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M17 24L8.99907 19L1 24V2C1 1.73478 1.10536 1.48043 1.29289 1.29289C1.48043 1.10536 1.73478 1 2 1H16C16.2652 1 16.5196 1.10536 16.7071 1.29289C16.8946 1.48043 17 1.73478 17 2V24Z"
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
            </svg>
        </button>
        <div :class="showSavedToast ? 'show' : ''" class="toast toast-favorite">
            <template v-if="isFavorite">
                Збережено в «Мої {{ onSaveText }}»
            </template>
            <template v-else>
                Вилучено з «Моїх {{ onDeleteText }}»
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useNuxtApp } from '#app';

const { $client } = useNuxtApp();

const props = defineProps({
    isFavorite: Boolean,
    showSavedToast: Boolean,
    onSaveText: String,
    onDeleteText: String,
});
</script>

<style lang="scss">
.article-btn-favorite {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin-left: 20px;
    width: 18px;
    height: 25px;

    @include laptop-lg() {
        top: 6px;
        margin-left: 24px;
    }

    &-top {
        @include laptop-lg() {
            display: none;
        }
    }

    &-bottom {
        display: none;

        @include laptop-lg() {
            display: flex;
        }
    }

    .btn-favorite {
        @include button-reset();
        display: inline-block;
        width: inherit;
        height: inherit;
        background-color: $white;

        &:hover {
            background-color: $white;
        }

        svg {
            stroke: $color-main;

            &.is-favorite {
                fill: $color-main;
            }
        }
    }

    @include noprint();
}
</style>
