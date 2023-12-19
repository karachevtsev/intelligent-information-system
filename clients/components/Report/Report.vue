<template>
    <div class="report-sota">
        <ReportTop/>
        <Image name="sota" alt="Звітність з «СОТА»"/>
        <ReportTable v-if="reportsData.business.length" :reportsData="reportsData"/>
        <ReportEmpty v-else/>
        <ReportModal/>
    </div>
</template>

<script lang="ts" setup>
import { useNuxtApp, useRuntimeConfig } from '#app';
import { ref } from 'vue';

const { public: { apiBase } } = useRuntimeConfig();
const { $bus } = useNuxtApp();
const reportsData = ref();

const fetchClientReports = async () => {
    let reports: object = [];

    if (process.client) {
        await $fetch<any>('/dtkt/medoc', {
            method: 'GET',
            baseURL: apiBase,
            credentials: 'include',
        }).then((data) => {
            reports = data;
        }).catch((e) => {
            console.log(e);
        });
    }

    return reportsData.value = reports;
};

const deleteReport = async (id: number) => {
    await $fetch(`/dtkt/medoc/${id}`, {
        baseURL: apiBase,
        method: 'DELETE',
        credentials: 'include',
        async onResponse({ response }) {
            if (response.ok) {
                await fetchClientReports();
            }
        },
    });
};

await fetchClientReports();

$bus.$on('addReport', async () => {
    await fetchClientReports();
});

$bus.$on('deleteReport', async (id: number) => {
    await deleteReport(id);
});

$bus.$on('activateReport', async () => {
    await fetchClientReports();
});
</script>
