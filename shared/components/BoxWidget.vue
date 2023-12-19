<template>
    <div class="box">
        <div class="box-header">
            <h2>{{ data.title }}</h2>
            <div v-if="isMain" class="box-link box-link-top">
                <NuxtLink :target="target" :to="data.link" rel="">
                    {{ data.linkText }}
                    <svg fill="none" height="8" viewBox="0 0 5 8" width="5" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 0.999969L4 3.99997L1 6.99997" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                    </svg>
                </NuxtLink>
            </div>
        </div>
        <div class="box-content">
            <slot></slot>
        </div>
        <div class="box-link" :class="{'box-link-bottom': isMain}">
            <NuxtLink :target="target" :to="data.link" rel="">
                {{ data.linkText }}
                <svg fill="none" height="8" viewBox="0 0 5 8" width="5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 0.999969L4 3.99997L1 6.99997" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                </svg>
            </NuxtLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
    data: {
        type: Object,
        required: true,
        title: String,
        link: String,
        linkText: String,
    },
});

const { public: { siteName } } = useRuntimeConfig();

const isMain = computed(() => siteName === 'dtkt');

const target = computed(() => isMain.value ? '_blank' : '_self');
</script>

<style lang="scss">
.box {
    &-bordered {
        padding: 20px;
        border: 1px solid $gray-lighter;
        border-radius: 16px;

        @include laptop-xl() {
            padding: 30px;
        }

        .box-content {
            padding-bottom: 0;
        }
    }

    &-gray {
        background: #F4F5F7;
        border-color: #F4F5F7;
    }
}
</style>
