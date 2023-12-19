<template>
    <Modal v-model="isOpen">
        <template v-slot:header>
            {{ modalTitle }}
        </template>
        <template v-slot:content>
            <component :is="component"
                       :info="reportInfo"
                       :subscription="reportSubscription"
            ></component>
        </template>
    </Modal>
</template>

<script lang='ts' setup>
import { useNuxtApp } from '#app';
import { ref, shallowRef } from 'vue';
import Modal from 'dtkt-shared/components/Modal';
import ReportActivate from '~/components/Report/ReportActivate';
import ReportDenied from '~/components/Report/ReportDenied';
import ReportForm from '~/components/Report/ReportForm';

const { $bus } = useNuxtApp();
const isOpen = ref(false);
const component = shallowRef('div');
const modalTitle = ref('');
const reportInfo = ref({});
const reportSubscription = ref({});

const modalContents: any = {
    activate: ReportActivate,
    denied: ReportDenied,
    form: ReportForm,
};

const modalTitles: any = {
    activate: 'Активація ліцензії',
    denied: 'Зверніть увагу!',
    form: 'Додати підприємство або ФОП',
};

$bus.$on('openReportModal', (value: any) => {
    isOpen.value = true;
    component.value = modalContents[value.content];
    modalTitle.value = modalTitles[value.content];
    reportInfo.value = value?.report;
    reportSubscription.value = value?.subscription;
});

$bus.$on('addReport', () => {
    isOpen.value = false;
});

$bus.$on('activateReport', () => {
    isOpen.value = false;
});
</script>
