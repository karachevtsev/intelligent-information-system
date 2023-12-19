<template>
    <client-only>
        <ModalOffCanvas v-model="isShowLoginModal" :hasTabs="true" title="Авторизація">
            <AuthModalTabs :activeTab="activeTab"/>
        </ModalOffCanvas>
        <ModalOffCanvas v-model="isShowContactModal" title="Напишіть нам">
            <ContactForm/>
        </ModalOffCanvas>
        <ModalOffCanvas v-model="isShowAdvertModal" title="Вимкнути рекламу">
            <AdvertManage/>
        </ModalOffCanvas>
        <ModalSwitchNavigation/>
    </client-only>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import ModalSwitchNavigation from './ModalSwitchNavigation';
import ModalOffCanvas from './ModalOffCanvas';
import AuthModalTabs from './AuthModalTabs';
import ContactForm from './ContactForm';
import AdvertManage from './AdvertManage';

const { $bus } = useNuxtApp();
const activeTab = ref();
const isShowLoginModal = ref(false);
const isShowContactModal = ref(false);
const isShowAdvertModal = ref(false);

$bus.$on('openContactModal', (value: boolean) => {
    return isShowContactModal.value = value;
});

interface modalOptions {
    open: boolean;
    tab: string;
}

$bus.$on('openLoginModal', (options: modalOptions = { open: true, tab: 'login' }): void => {
    isShowLoginModal.value = options.open;
    activeTab.value = options.tab;
});

$bus.$on('openAdvertModal', (value: boolean): void => {
    isShowAdvertModal.value = value;
});
</script>
