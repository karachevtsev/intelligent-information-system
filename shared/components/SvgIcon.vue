<template>
  <span :class="attrs.class">
    <client-only>
      <component :is="currentIcon"/>
      <template #fallback>
      </template>
    </client-only>
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
    name?: string
}>();

const currentIcon = computed(() =>
    defineAsyncComponent({
        loader: () => import(`../assets/icons/${props.name}.svg`),
        loadingComponent: {
            template: '<span></span>',
        },
        errorComponent: {
            template: '<span>error</span>',
        },
        delay: 200,
        timeout: 3000,
        suspensible: true,
    }),
);
const attrs = useAttrs();
</script>


