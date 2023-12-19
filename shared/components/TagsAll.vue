<template>
    <div class="content-box">
        <slot/>
        <div class="box">
            <div class="box-header" :class="{'box-filter' : hasFilter}">
                <h1>Усі теги</h1>
                <template v-if="hasFilter">
                    <DateFilter
                        v-model="currentOption"
                        :defaultOption="defaultOption"
                        :options="options"
                    />
                </template>
            </div>
            <div class="box-content box-contents pb-0">
                <div class="contents contents-tags">
                    <div v-for="(tag, key) in normalizedTags" class="contents-item">
                        <div class="contents-header">
                            <b>{{ key }}</b>
                        </div>
                        <ul>
                            <li v-for="item in tag" :key="item.id">
                                <NuxtLink :to="`/tags/${item.slug}`">{{ item.title }}</NuxtLink>
                                <span class="count">{{ item.count }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useTags } from '../composables/content';
import DateFilter from './DateFilter';

const props = withDefaults(
    defineProps<{
        section?: string;
        hasFilter?: boolean;
    }>(),
    {
        hasFilter: true,
    },
);

const route = useRoute();
const state = ref({
    period: route.query.period || 'all',
});

const currentOption = ref(state.value.period);
const defaultOption = 'За весь час';
const options = [
    { value: 'all', name: 'За весь час' },
    { value: 'year', name: 'За рік' },
    { value: 'month', name: 'За місяць' },
];

const tags = await useTags({ period: state.value.period }, props.section);
const allTags = ref([] as typeof tags);
allTags.value.push(...tags);

async function load() {
    const result = await useTags({ period: state.value.period }, props.section);
    allTags.value = result;
    navigateTo({
        path: route.path,
        query: {
            ...route.query,
            period: state.value.period || void 0,
        },
        replace: true,
    });

    return result;
}

function normalize(arr: any[]) {
    const digit = '0-9';

    return arr.reduce((store, word) => {
        const letter = word['title'].charAt(0).toLowerCase();
        const keyStore = (/[0-9]+/.test(letter) ? (store[digit] || (store[digit] = [])) : (store[letter] || (store[letter] = [])));
        keyStore.push(word);
        return store;
    }, {});
}

const normalizedTags = computed(() => {
    return normalize(allTags.value);
});

watch(currentOption, async (value) => {
    if (state.value.period !== value) {
        state.value.period = value;
        await load();
    }
});

watch(route, async ({ query: { period = '' } }: { query: { period?: string } }) => {
    if (options.find(({ value }) => value === period)) {
        currentOption.value = period;

        if (state.value.period !== period) {
            state.value.period = period;
            await load();
        }
    }
});

onMounted(() => {
    if (route.query.period) {
        currentOption.value = route.query.period;
    }
});
</script>

