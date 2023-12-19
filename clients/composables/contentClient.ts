import { ref } from 'vue';

type Section = 'shop4' | 'clients' | 'news' | 'online' | 'services' | 'consulting' | 'documents' | 'blanks' | 'webinars' | 'my' | 'dtkt'
type ContentType = 'profile' | 'notifications' | 'orders' | 'favorite' | 'my-comments' | 'webinars' | 'questions'

interface Params {
    perPage?: number;
    per_page?: number;
    query?: string;
    page?: number;
}

export async function useClientContentList(params: Params = {}, section: Section = 'clients', contentType: ContentType = 'profile'): Promise<{ items: Array<object>, meta: any, links: any[] }> {
    const { public: { apiBase } } = useRuntimeConfig();
    let items: Array<object>;

    const { data, ...additional } = await $fetch<{ data: any[], meta: any, links: any }>(`${section}/${contentType}`, {
        method: 'GET',
        baseURL: apiBase,
        params,
        credentials: 'include',
    });

    if (contentType === 'orders') {
        items = data?.map((order) => {
            order.createdAt = new Date(order.created_at);
            order.downloadUrl = new URL(`shop4/orders/${order.id}/download`, apiBase);

            return order;
        });
    } else {
        items = [...data];
    }

    return {
        items, ...additional,
    };
}

export async function getClientContentListContext(params: Params = {}, section: Section = 'clients', contentType: ContentType = 'profile') {
    let _items: Array<object> = [];
    let _pages: number[] = [params.page || 1];

    const { public: { apiBase } } = useRuntimeConfig();
    const items = ref(_items);
    const page = ref(params.page || 1);
    const pages = ref(_pages);
    const total = ref(0);
    const lastPage = ref(0);

    async function load(_page: number, reset = true) {
        let result;
        if (process.client) {
            result = await useClientContentList({ ...params, page: _page }, section, contentType);

            if (reset) {
                _pages = [_page];
                _items = [...result.items];
            } else {
                _items = [..._items, ...result.items];
                _pages = [..._pages, _page];
            }
            pages.value = _pages;
            items.value = _items;
            page.value = result.meta?.current_page;
            total.value = result.meta?.total;
            lastPage.value = result.meta?.last_page;

            return result;
        }
    }

    function toPage(_page: number, _params?: Omit<Params, 'page'>) {
        if (_params) {
            Object.assign(params, _params);
        }

        return load(_page);
    }

    async function readNotification(id: number, readAt: string | null, cb: Function) {
        if (readAt !== null) return;

        await $fetch<any>(`/clients/notifications/${id}/read`, {
            baseURL: apiBase,
            method: 'POST',
            credentials: 'include',
            async onResponse({ response }) {
                if (response.ok) {
                    await load(page.value);
                    await cb();
                }
            },
        });
    }

    async function deleteNotification(id: number, cb: Function) {
        await $fetch<any>(`/clients/notifications/${id}`, {
            baseURL: apiBase,
            method: 'DELETE',
            credentials: 'include',
            async onResponse({ response }) {
                if (response.ok) {
                    await load(page.value);
                    await cb();
                }
            },
        });
    }

    async function deleteOnlineFavorite(id: number) {
        await $fetch<any>(`${section}/favorite`, {
            baseURL: apiBase,
            method: 'POST',
            credentials: 'include',
            body: {
                id: id,
                favorite: 'false',
            },
            async onResponse({ response }) {
                if (response.ok) {
                    await load(page.value);
                }
            },
        });
    }

    async function deleteFavorite(id: number) {
        await $fetch<any>(`${section}/content/${id}/favorite`, {
            baseURL: apiBase,
            method: 'POST',
            credentials: 'include',
            body: {
                isFavorite: '0',
            },
            async onResponse({ response }) {
                if (response.ok) {
                    await load(page.value);
                }
            },
        });
    }

    async function deleteBlankFavorite(id: number) {
        await $fetch<any>(`blanks/favorite/${id}`, {
            baseURL: apiBase,
            method: 'DELETE',
            credentials: 'include',
            async onResponse({ response }) {
                if (response.ok) {
                    await load(page.value);
                }
            },
        });
    }

    await load(page.value);

    return {
        items,
        total,
        page,
        lastPage,
        pages,
        toPage,
        readNotification,
        deleteNotification,
        deleteOnlineFavorite,
        deleteFavorite,
        deleteBlankFavorite,
    };
}
