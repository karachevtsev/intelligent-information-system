<template>
    <ClientOnly>
        <img
            v-if="isUnlock"
            key="unlock"
            alt=""
            height="16"
            loading="lazy"
            src="@/assets/svg/article-unlock.svg?url"
            width="13"
        />
        <img
            v-else-if="access" key="lock"
            alt=""
            height="16"
            loading="lazy"
            src="@/assets/svg/article-lock.svg?url"
            width="13"
        />
    </ClientOnly>
</template>

<script lang='ts' setup>
import { useNuxtApp } from '#app';

const props = defineProps({
    access: String,
});

const { $client } = useNuxtApp();

const clientHasAbility = (ability: string): boolean => {
    return $client?.value?.additional?.packages?.hasOwnProperty(ability);
};

const isUnlock = computed(() => {
    return (props.access === 'auth' && $client.value) || (props.access === 'news' && clientHasAbility('news')) || (props.access === 'thematic' && clientHasAbility('thematic'));
});
</script>
