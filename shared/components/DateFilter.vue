<template>
    <div class="date-filter" @click.stop>
        <div
            :class="{ 'active': isShowOptions }"
            class="date-filter-current"
            tabindex="0"
            @click="toggleOptions"
        >
            <div class="date-filter-option">
                {{ currentOption.name || (defaultOption || "Обрати") }}
            </div>
            <img
                alt=""
                class="date-filter-arrow"
                width="8"
                height="6"
                loading="lazy"
                src="../assets/svg/arrow-rubrics.svg?url"
            />
        </div>
        <div v-show="isShowOptions" class="date-filter-dropdown">
            <ul>
                <li
                    v-for="(option, index) in optionsComputed"
                    :key="`option${index}`"
                    :ref="setOptionElementRef"
                    :class="{ 'selected': option.name === currentOption.name }"
                    tabindex="0"
                    @click="setOption(option)"
                >
                    {{ option.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onBeforeUpdate, onMounted, ref, watch } from 'vue';

interface Option {
    value: string | number;
    name: string;
}

type OptionValue = string | number;

const isShowOptions = ref(false);
const currentOption = ref<Option>({ value: '', name: '' });
const optionElements = ref<HTMLElement[]>();

const props = defineProps<{
    defaultOption: OptionValue;
    modelValue: OptionValue;
    options: Option[] | OptionValue[];
}>();

const emit = defineEmits(['update:modelValue']);

const optionsComputed = computed(() => {
    return props.options.map((option: OptionValue | Option) => {
        if (typeof option === 'string' || typeof option === 'number') {
            return { value: option, name: option.toString() };
        } else {
            return option;
        }
    });
});

watch(currentOption, () => {
    if (currentOption.value) emit('update:modelValue', currentOption.value.value);
});

function hideOptions(): void {
    isShowOptions.value = false;
}

function toggleOptions(): void {
    isShowOptions.value = !isShowOptions.value;
}

function setOption(option: Option): void {
    currentOption.value = option;
    hideOptions();
}

function setOptionElementRef(el: any) {
    if (optionElements.value && el) optionElements.value.push(el);
}

onBeforeUpdate(() => {
    optionElements.value = [];
});

onMounted(() => {
    setTimeout(() => {
        if (props.modelValue || props.modelValue === 0) {
            if (typeof props.options[0] === 'string' || typeof props.options[0] === 'number') {
                currentOption.value = { value: props.modelValue, name: props.modelValue.toString() };
            }
            if (typeof props.options[0] === 'object') {
                currentOption.value = (props.options as Option[]).find(
                    (option) => option.value === props.modelValue,
                ) as Option;
            }
        }
    }, 100);

    document.addEventListener('click', hideOptions);
});

watch(() => props.modelValue, (modelValue) => {
    if (modelValue || props.modelValue === 0) {
        if (typeof props.options[0] === 'string' || typeof props.options[0] === 'number') {
            currentOption.value = { value: props.modelValue, name: props.modelValue.toString() };
        }
        if (typeof props.options[0] === 'object') {
            currentOption.value = (props.options as Option[]).find(
                (option) => option.value === props.modelValue,
            ) as Option;
        }
    }
});

onBeforeUnmount(() => {
    document.removeEventListener('click', hideOptions);
});

const fieldType = 'ContentFilter';
defineExpose({ fieldType });
</script>

<style lang="scss">
.date-filter {
    position: relative;

    &-current {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        line-height: 16px;
        color: $gray;
        cursor: pointer;
    }

    &-arrow {
        margin-left: 5px;
    }

    &-dropdown {
        position: absolute;
        z-index: 2;
        left: 50%;
        transform: translateX(-50%);
        width: 130px;
        padding: 10px;
        margin: 5px 0 0 0;
        background: $white;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        border-radius: 10px;

        @include laptop-xl() {
            right: 0;
            left: initial;
            transform: none;
        }

        ul {
            margin: 0;
            padding: 0;
            list-style: none;

            li {
                font-weight: 400;
                font-size: 15px;
                line-height: 16px;
                color: $text-color;
                text-decoration: none;
                display: block;
                border-radius: 6px;
                padding: 7px 10px;
                cursor: pointer;

                &.selected {
                    font-weight: 700;
                }

                &:hover {
                    background: #EFEFEF;
                }
            }
        }
    }
}
</style>
