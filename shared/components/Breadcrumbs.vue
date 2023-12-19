<template>
    <div class="breadcrumbs">
        <ul>
            <li v-for="(item, index) in breadcrumbs"
                :key="index"
            >
                <NuxtLink v-if="item.url" :to="item.url" :class="item?.className">
                    {{ item.title }}
                </NuxtLink>
                <span v-else :class="item?.className">{{ item.title }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    breadcrumbs: {
        type: Array,
        required: true,
        default: [],
    },
});
</script>
