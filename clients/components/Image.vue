<template>
    <img :src="imageSrc"
         :alt="alt"
         :width="width"
         :height="height"
         :class="className"
         class="profile-image"
    >
</template>

<script lang='ts' setup>
import { computed } from 'vue';

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    className: {
        type: String,
    },
    width: {
        type: [Number, String],
        default: 400,
    },
    height: {
        type: [Number, String],
        default: 260,
    },
    alt: {
        type: String,
        default: '',
    },
});

const imageSrc = computed(() => {
    return `/images/${props.name}.svg?url`;
});
</script>
