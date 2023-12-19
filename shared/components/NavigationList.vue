<template>
    <ul class="navigation-list" :class="props.className">
        <li v-for="site in DK_SITES">
            <NuxtLink
                rel=""
                :class="[site.rel === siteName ? 'active' : '', site.rel]"
                :to="site.link"
            >
                <svg-icon :name="site.rel" class="svg-icon"/>
                {{ site.title }}
            </NuxtLink>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { DK_SITES } from '../constants';
import SvgIcon from './SvgIcon';

const { public: { siteName } } = useRuntimeConfig();

const props = defineProps({
    className: String,
});
</script>
