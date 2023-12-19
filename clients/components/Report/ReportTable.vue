<template>
    <div class="profile-table profile-report">
        <div class="profile-table-row table-header">
            <div class="profile-table-cell">Найменування платника податків</div>
            <div class="profile-table-cell">Ліцензія</div>
            <div class="profile-table-cell">Мої дії</div>
            <div class="profile-table-cell">Видалити</div>
        </div>
        <div v-for="report in reportsData.business" class="profile-table-row table-body">
            <div class="profile-table-cell profile-table-caption">
                {{ report.title }}, {{ report.code }}
            </div>
            <div class="profile-table-cell profile-table-caption">
                {{ report.type ? report.period : 'Неактивно' }}
            </div>
            <div class="profile-table-cell">
                <NuxtLink v-if="report.type"
                          :to="`${medocUrl}${report.id}`"
                          target="_blank"
                          class="btn btn-report">
                    Здати звіт
                </NuxtLink>
                <button v-else
                        @click="activateReport(report, reportsData?.subscriptions[0])"
                        type="button"
                        class="btn btn-report btn-report-activate"
                >
                    Активувати
                </button>
            </div>
            <div class="profile-table-cell">
                <button type="button"
                        class="btn-table-delete"
                        :class="{'has-report-tooltip': report.type}"
                        :disabled="report.type"
                        @click="deleteReport(report.id)"
                >
                    <span v-if="report.type" class="report-sota-tooltip">
                        Ви не можете видалити запис
                        <br>
                        підприємства з активною ліцензією
                    </span>
                </button>
            </div>
        </div>
        <div class="profile-table-btn">
            <ReportAddButton/>
        </div>
        <ReportAlert/>
    </div>
</template>

<script lang='ts' setup>
import { useNuxtApp } from '#app';
import { computed } from 'vue';
import ReportAddButton from '~/components/Report/ReportAddButton';
import ReportAlert from '~/components/Report/ReportAlert';

const medocUrl = 'https://sota-buh.com.ua/dtkt.ashx?id=';
const { $client, $bus } = useNuxtApp();
const props = defineProps({
    reportsData: {
        type: Object,
        required: true,
    },
});

const canSubmitReport = computed(() => {
    return !!$client.value?.additional?.packages?.medoc;
});

const activateReport = (report: object, subscription: object) => {
    const modalContent = canSubmitReport.value ? 'activate' : 'denied';
    $bus.$emit('openReportModal',
        {
            'content': modalContent,
            'report': report,
            'subscription': subscription,
        });
};

const deleteReport = (id: number) => {
    $bus.$emit('deleteReport', id);
};
</script>

