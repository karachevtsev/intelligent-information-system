<template>
    <div :class="{ 'expanded': isExpanded, className }"
         class="collapse"
    >
        <button @click="isExpanded = !isExpanded"
                :class="{ 'collapse-arrow-right': rotateArrow, 'collapse-arrow-rotated': isExpanded && rotateArrow}"
                class="collapse-button"
        >
            <span>{{ isExpanded ? props.titleExpanded : props.title }}</span>
        </button>
        <div v-show="isExpanded"
             :class="{ 'expanded': isExpanded }"
             class="collapse-box"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const isExpanded = ref(false);

interface Props {
    modelValue?: boolean;
    title?: string;
    titleExpanded?: string;
    className?: string;
    hasArrow?: boolean;
    rotateArrow?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
    title: 'Open',
    titleExpanded: 'Close',
    className: '',
    hasArrow: true,
    rotateArrow: true,
});

const emit = defineEmits(['update:modelValue']);

watch(isExpanded, () => {
    emit('update:modelValue', isExpanded.value);
});

isExpanded.value = props.modelValue;
</script>
