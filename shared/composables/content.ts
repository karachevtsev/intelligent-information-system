import { ref, watch } from 'vue';
import { NEWS_URL } from '../constants';

type Section = 'news' | 'consulting' | 'webinars' | 'blanks' | 'services' | 'documents' | 'dtkt'
type ContentType = 'content' | 'search' | 'blanks' | 'popular' | 'external-events' | 'documents/main' | 'documents/popular' | 'documents'

interface SubCategory {
    id: number;
    title: string;
    slug: string;
    contentCount?: number;
}

interface Category extends SubCategory {
    subcategories?: SubCategory[];
}

interface DocumentsList {
    title: string;
    uid: string;
}

interface Content {
    id: number;
    title: string;
    description: string;
    publishedAt: Date;
    category: Category;
    subcategory: SubCategory;
    url: URL;
    slug?: string;
    hits: number;
    commentsCount: number;
    type?: string | null;

    [key: string]: any;
}

interface tagsParams {
    period?: 'year' | 'all' | 'month';
}

export async function useTags(params: tagsParams = {}, section: Section = 'news') {
    // @ts-ignore
    const { public: { apiBase } } = useRuntimeConfig();
    // @ts-ignore
    const { data } = await useFetch<{ data: Array<Category> }>(`${section}/tags`, { baseURL: apiBase, params, key: params.period });

    return data.value?.data;
}

export async function useRubrics(section: string) {
    // @ts-ignore
    const { public: { apiBase } } = useRuntimeConfig();
    // @ts-ignore
    const { data } = await useFetch<{ data: Array<Category> }>(`${section}/rubrics`, { baseURL: apiBase, key: `${section}/rubrics` });

    const rubrics = ref<Category[]>(data.value?.data ?? []);
    watch(data, (value) => {
        rubrics.value = value?.data ?? [];
    });

    return rubrics;
}

export async function useContent({ id, slug }: { id: number | string, slug?: string }, section: Section = 'news') {
    // @ts-ignore
    const { public: { apiBase, baseUrl } } = useRuntimeConfig();
    const favorite = ref(false);
    const article = ref();

    // @ts-ignore
    if (process.client && section !== 'webinars') {
        // @ts-ignore
        $fetch<{ data: { isFavorite: boolean } }>(`${section}/content/${id}/favorite`, {
            baseURL: apiBase,
            credentials: 'include',
        }).then(({ data: { isFavorite } }) => {
            favorite.value = isFavorite;
        }).catch(() => {
            favorite.value = false;
        });
    }

    // @ts-ignore
    const { data, error, refresh } = await useFetch<{ data: Content }>(`${section}/content/${id}`, {
        baseURL: apiBase,
        key: `${section}/content/${id}`,
        params: { slug },
    });

    if (data.value) {
        article.value = u(data.value.data);
    }

    function u(article: Content): Content {
        article.publishedAt = new Date(article.publishedAt);
        let url;
        if (section === 'webinars') {
            url = `view/${article.id}${article?.slug ? `-${article?.slug}` : ''}`;
        } else {
            url = `${article.category?.slug}/${article?.subcategory?.slug}/${article.id}${article?.slug ? `-${article?.slug}` : ''}`;
        }

        article.url = new URL(url, baseUrl);
        return article;
    }

    watch(data, (value) => {
        console.log(value);
        article.value = u(value.data);
    });

    return {
        article,
        favorite,
        error,
        async setFavorite(value: boolean = true) {
            const prev = favorite.value;
            try {
                // @ts-ignore
                const { data: { isFavorite } } = await $fetch<{ data: { isFavorite: boolean } }>(`${section}/content/${id}/favorite`, {
                    baseURL: apiBase,
                    method: 'POST',
                    credentials: 'include',
                    body: {
                        isFavorite: value ? '1' : '0',
                    },
                });
                favorite.value = isFavorite;
            } catch (e) {
                favorite.value = prev;
                throw e;
            }
        },
        refresh(_id: typeof id) {
            id = _id;
            console.log(id);
            return refresh();
        },
        async hit() {
            // @ts-ignore
            await $fetch(`${section}/content/${id}/hit`, { baseURL: apiBase, credentials: 'include' });
        },
    };
}

interface Params {
    per_page?: number;
    tag?: string;
    query?: string;
    category?: string;
    subcategory?: string;
    page?: number;
    sort_by?: 'popular' | 'commented' | 'important' | 'main' | 'hot';
    period?: 'year' | 'all' | 'month';
    date?: string;
    archive?: number;
}

export async function useContentList(params: Params = {}, section: Section = 'news', contentType: ContentType = 'content'): Promise<{ articles: Array<Content>, meta: any, links: any[], category?: SubCategory, tag?: any, subcategory?: SubCategory, list?: Array<DocumentsList>, title?: string, search?: Array<any>, years?: Array<any>, year?: string | ''; }> {
    // @ts-ignore
    const { public: { apiBase } } = useRuntimeConfig();
    let articles: Array<Content>;

    let errorStatus;
    // @ts-ignore
    const { data: fetchedData, error: error } = await useFetch<{ data: any[], meta: any, links: any }>(`${section}/${contentType}`, {
        baseURL: apiBase,
        params,
        key: `${section}/${contentType}` + JSON.stringify(params),
        async onResponseError({ response }) {
            errorStatus = response.status;
        },
    });

    if (error.value) {
        // @ts-ignore
        throw createError({ statusCode: errorStatus, statusMessage: 'Page Not Found' });
    }

    const { data, ...additional } = fetchedData.value;

    articles = data.map((article) => {
        if (article?.publishedAt) {
            article.publishedAt = new Date(article.publishedAt);
        }

        if (article?.url) {
            article.url =
                section === 'news'
                    ? new URL(`${article.category.slug}/${article.subcategory.slug}/${article.id}${article.slug ? `-${article.slug}` : ''}`, NEWS_URL)
                    : new URL(article.url);
        }

        return article;
    });

    return {
        articles,
        ...additional,
    };
}

export async function getContentListContext(params: Params = {}, section: Section, contentType: ContentType = 'content') {
    let _articles: Content[] = [];
    let _pages: number[] = [params.page || 1];
    const articles = ref<Content[]>(_articles);
    const page = ref(params.page || 1);
    const pages = ref(_pages);
    const total = ref(0);
    const year = ref('');
    const years = ref([]);

    async function load(_page: number, reset = true) {
        const result = await useContentList({ ...params, page: _page }, section, contentType);
        if (reset) {
            _pages = [_page];
            _articles = [...result.articles];
        } else {
            _articles = [..._articles, ...result.articles];
            _pages = [..._pages, _page];
        }
        pages.value = _pages;
        articles.value = _articles;
        page.value = result.meta?.current_page;
        total.value = result.meta?.total;
        year.value = result?.year || '';
        years.value = result?.years || [];

        return result;
    }

    async function more() {
        await load(page.value + 1, false);
    }

    function toPage(_page: number, _params?: Omit<Params, 'page'>) {
        if (_params) {
            Object.assign(params, _params);
        }
        return load(_page);
    }

    const { category, tag, subcategory } = await load(page.value);

    return { page, pages, articles, more, toPage, total, category, tag, subcategory, year, years };
}

export async function getContentDocumentsListContext(params: Params = {}, section: 'documents', contentType: ContentType = 'documents/main') {
    let _articles: Content[] = [];
    let _list = [];
    let _pages: number[] = [params.page || 1];
    const articles = ref<Content[]>(_articles);
    const page = ref(params.page || 1);
    const pages = ref(_pages);
    const total = ref(0);
    const list = ref();
    const title = ref('');
    const search = ref();

    async function load(_page: number, contentType) {
        const result = await useContentList({ ...params, page: _page }, section, contentType);

        _pages = [_page];
        _articles = [...result.articles];
        _list = result?.list && [...result.list];
        pages.value = _pages;
        articles.value = _articles;
        list.value = _list;
        page.value = result.meta.current_page;
        total.value = result.meta.total;
        title.value = result?.title;
        search.value = result?.search;

        return result;
    }

    function toPage(_page: number, _params?: Omit<Params, 'page'>, contentType?) {
        if (_params) {
            Object.assign(params, _params);
        }

        return load(_page, contentType);
    }

    await load(page.value, contentType);

    return { page, pages, articles, toPage, total, title, list, search };
}

export async function getContentBlanksListContext(params: Params = {}, section: Section, contentType: ContentType = 'content') {
    let _blanks: Content[] = [];
    let _pages: number[] = [params.page || 1];
    const blanks = ref<Content[]>(_blanks);
    const page = ref(params.page || 1);
    const pages = ref(_pages);
    const total = ref(0);
    const subcategory = ref({});

    async function load(_page: number) {
        const { articles, meta, links, ...subCategory } = await useContentList({ ...params, page: _page }, section, contentType);

        _pages = [_page];
        _blanks = [...articles];
        pages.value = _pages;
        blanks.value = _blanks;
        page.value = meta?.current_page;
        total.value = meta?.total;
        subcategory.value = subCategory;

        return '';
    }

    function toPage(_page: number, _params?: Omit<Params, 'page'>) {
        if (_params) {
            Object.assign(params, _params);
        }
        return load(_page);
    }

    await load(page.value);

    return { page, pages, blanks, toPage, total, subcategory };
}
