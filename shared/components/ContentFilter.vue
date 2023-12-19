<template>
    <div v-click-outside="hide" class="content-filter">
        <div
            :class="{ 'active': isShowOptions }"
            class="content-filter-current"
            tabindex="0"
            @click="isShowOptions = true"
        >
            <div class="content-filter-option">
                <h1 v-if="isMainTitle">
                    {{ currentOption.name }}
                </h1>
                <span v-else>
                    {{ currentOption.name }}
                </span>
            </div>
            <img
                alt=""
                class="content-filter-arrow"
                height="8"
                src="../assets/svg/arrow-collapse.svg?url"
                width="11"
            />
        </div>
        <ul v-if="isShowOptions" class="content-filter-dropdown">
            <NuxtLink v-for="(option, index) in options" :key="index" v-slot="{navigate}" :to="option.value ? `?sort=${option.value}`:'?'" custom>
                <li
                    :class="{ 'selected': option.name === currentOption.name }"
                    tabindex="0"
                    @click="hide();navigate()"
                >
                    {{ option.name }}
                </li>
            </NuxtLink>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

interface Option {
    value: string | number;
    name: string;
}

const isShowOptions = ref(false),
    emit = defineEmits(['update:modelValue']),
    props = defineProps<{
        isMainTitle: boolean;
        defaultName: string;
        modelValue: string | number;
        options: Option[];
    }>(),
    currentOption = computed(() => props.options.find(({ value }) => value === props.modelValue) || { value: '', name: props.defaultName }),
    hide = () => {
        isShowOptions.value = false;
    };
</script>

<style lang="scss">
.content-filter {
    position: relative;
    display: inline-block;

    &-current {
        position: relative;
        display: flex;
        align-items: center;
        transition-duration: 300ms;
        cursor: pointer;
        user-select: none;
        word-break: break-all;
        white-space: pre;
        overflow: hidden;
    }

    &-arrow {
        margin-left: 5px;
        margin-top: 4px;
    }

    &-option {
        > h1, span {
            font-size: $font-size-h2;
            line-height: 25px;
            font-weight: 700;
        }
    }

    &-dropdown {
        position: absolute;
        z-index: 3;
        width: 210px;
        left: 50%;
        margin: 5px 0 50% 0;
        transform: translateX(-50%);
        padding: 10px;
        list-style: none;
        user-select: none;
        outline: none;
        cursor: pointer;
        background: $white;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        border-radius: 10px;

        @include laptop-lg() {
            left: 0;
            transform: translateX(0);
        }

        > li {
            border-radius: 6px;
            padding: 5px 10px;

            &.selected {
                font-weight: 700;
            }

            &:hover {
                background: #EFEFEF;
            }
        }
    }
}
</style>
