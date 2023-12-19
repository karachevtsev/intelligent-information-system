import { ref, watch } from 'vue';

type LinkItem = {
    target: '_blank' | null
    title: string
    url: string
}

export async function useLinks(type: string) {
    const { public: { apiBase } } = useRuntimeConfig();

    const { data } = await useFetch<{ data: Array<LinkItem> }>('/frontend/links', {
        baseURL: apiBase,
        key: `/frontend/links?type=${type}`,
        params: {
            type,
        },
    });

    const links = ref<LinkItem[]>(data.value?.data ?? []);

    watch(data, (value) => {
        links.value = value?.data ?? [];
    });

    return links;
}
