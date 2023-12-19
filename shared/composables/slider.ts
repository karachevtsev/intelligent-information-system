import { ref } from 'vue';

export async function useSlider(name: string) {
    // @ts-ignore
    const { public: { apiBase } } = useRuntimeConfig();
    // @ts-ignore
    const { data } = await useFetch<{ data: any }>(`/frontend/sliders?vue=1&sliders[]=${encodeURIComponent(name)}`,
        {
            baseURL: apiBase,
            key: `/frontend/sliders?vue=1&sliders[]=${encodeURIComponent(name)}`,
        });

    return ref<any>(data.value.data[name] ?? {});
}
