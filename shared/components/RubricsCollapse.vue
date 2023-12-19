<template>
    <div class="rubrics-collapse" :class="{ 'expanded': isExpanded }">
        <div class="rubrics-collapse-header">
            <NuxtLink :to="props.url">{{ props.title }}</NuxtLink>
            <button @click="isExpanded = !isExpanded" class="rubrics-collapse-button">
                <img
                    src="../assets/svg/arrow-collapse.svg?url"
                    class="rubrics-collapse-arrow"
                    width="10"
                    height="10"
                    alt=""
                    loading="lazy"
                />
            </button>
        </div>
        <transition name="fade">
            <div v-show="isExpanded" class="rubrics-collapse-box" :class="{ 'expanded': isExpanded }">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const isExpanded = ref(false);

interface Props {
    modelValue?: boolean;
    title?: string;
    url?: string;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
    title: '',
    url: '',
});

const emit = defineEmits(['update:modelValue']);

watch(isExpanded, () => {
    emit('update:modelValue', isExpanded.value);
});

isExpanded.value = props.modelValue;
</script>

<style lang="scss">
.rubrics-collapse {

    &.expanded {
        .rubrics-collapse-header {
            img {
                transform: rotate(180deg);
            }
        }
    }

    &-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 0 5px 10px;

        &:hover {
            background: $gray-lighter;
            border-radius: 6px;
        }

        a {
            font-weight: 700;
            font-size: 14px;
            color: $text-color;
            text-decoration: none;
        }

        button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 25px;
            margin: 0 0 0 3px;
            border: 0;
            background-color: transparent;
            background-image: none;
            border-radius: 0;
            cursor: pointer;
            overflow: hidden;
            vertical-align: middle;
            white-space: nowrap;
            text-overflow: ellipsis;
            user-select: none;
            text-align: center;

            &:hover {
                background-color: transparent;
            }
        }
    }
}
</style>
