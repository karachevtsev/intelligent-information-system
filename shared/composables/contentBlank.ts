import { ref, watch } from 'vue';

type BlankType = 'tax' | 'authority' | 'type' | 'period' | 'forms'

export interface SubCategory {
    id: number;
    title: string;
    slug: string;
    type: BlankType;
    url: string | '';
    other?: number;
    weight?: number;
    blanks_count?: number;
    period?: string;

    [key: string]: any;
}

interface Category {
    [key: string]: SubCategory[];
}

interface RubricsList {
    [key: string]: string;
}

export interface Tag {
    id: string;
    slug: string;
    title: string;
}

export interface Blank {
    id: string;
    url: URL;
    important: number;
    fullName: string;
    shortName: string;
    tags: Array<Tag>;

    [key: string]: any;
}

export interface Rubric {
    title: string;
    alias: string;
    count: number;
    blanks: Array<Blank>;

    [key: string]: any;
}

const rubricsList: RubricsList = {
    tax: 'За податками',
    authority: 'За держорганом',
    type: 'За типом звітності',
    periods: 'За звітним періодом',
    forms: 'Типові форми',
} as const;

export async function useRubrics() {
    // @ts-ignore
    const { public: { apiBase } } = useRuntimeConfig();
    const rubrics = ref();
    // @ts-ignore
    const { data } = await useFetch<{ data: Category }>(`blanks/rubrics`, { baseURL: apiBase, key: `blanks/rubrics` });
    const rubricsData = <Category>(data.value?.data ?? {});

    rubrics.value = Object.keys(rubricsList).map((key) => {
        return {
            alias: key,
            caption: rubricsList[key],
            children: rubricsData[key],
        };
    });

    return rubrics;
}

export async function useRubric(type: BlankType, params: {}) {
    // @ts-ignore
    const { public: { apiBase } } = useRuntimeConfig();
    const rubric = ref();
    // @ts-ignore
    const { data } = await useFetch<{ data: Array<Rubric> }>(`blanks/rubrics/${type}`, {
        baseURL: apiBase,
        key: `blanks/rubrics/${type}`,
        params,
    });

    if (data.value) {
        rubric.value = u(data.value.data);
    }

    function u(rubric: Rubric) {
        rubric.value = data.value.data.forEach((item: Rubric) => {
            if (item.blanks.length) {
                item.blanks.map((blank: Blank) => {
                    blank.url = new URL(blank.url);
                });
            }
        });

        return rubric;
    }

    watch(data, (value) => {
        rubric.value = u(value.data);
    });

    return { rubric };
}
