export async function useFrontendSettings(options: Array<string>) {
    const { public: { apiBase } } = useRuntimeConfig();
    const url = new URL('/frontend/settings', apiBase);
    options.forEach(option => url.searchParams.append('option[]=', option));

    const { data }  = await useFetch(`${url}`, {
        baseURL: apiBase,
    });

    return data;
}
