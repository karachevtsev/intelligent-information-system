import { computed } from 'vue';

export async function getClientPaperSubscription() {
    const { public: { apiBase } } = useRuntimeConfig();

    const data = await $fetch<{
        subcount: any;
        pagency: any;
        sub_edrpou: any;
        payer: any;
        substart: number;
    }>('/dtkt/paper', {
        method: 'GET',
        baseURL: apiBase,
        credentials: 'include',
    });

    const isEmptyPayer = computed(() => !!data.payer);

    const startDate = computed(() => {
        const year = Math.floor(data.substart / 12);
        const month = new Date(year, data.substart % 12, 1).toLocaleDateString('uk-UA', { month: 'long' });

        return `${month} ${year}`;
    });

    const fields = {
        'Платник': data.payer,
        'Код ЄДРПОУ': data.sub_edrpou,
        'Канал передплати': data.pagency,
        'Початок передплати': startDate.value,
        'Кількість місяців': data.subcount,
    };

    return { isEmptyPayer, fields, data };
}
