<template>
    <media-query-provider :queries="{
        xs: '(max-width: 768px)',
        md: '(min-width: 769px) and (max-width: 991px)',
        lg: '(min-width: 992px) and (max-width: 1199px)',
        xl: '(min-width: 1200px) and (max-width: 1519px)',
        xxl: '(min-width: 1520px)',
    }" fallback="xs">
        <div class="page">
            <match-media v-slot="{md,xs}">
                <SubscriptionNotification v-if="!xs && !md"/>
            </match-media>
            <TheHeader>
                <template v-slot:site-logo>
                    <SiteLogo title="Мій кабінет"/>
                </template>
                <template v-slot:mobile-menu>
                    <MobileMenu>
                        <template v-slot:site-menu>
                            <template v-for="menu in CLIENT_MENU">
                                <Collapse v-model="isExpandedMenuItem" :title="menu.caption" :titleExpanded="menu.caption">
                                    <ul class="mobile-menu-list">
                                        <li v-for="item in menu.items">
                                            <NuxtLink :to="item.url"
                                                      :class="{'router-link-active router-link-exact-active': $route.name === 'profile' && item.url === '/'}"
                                            >
                                                {{ item.title }}
                                            </NuxtLink>
                                        </li>
                                    </ul>
                                </Collapse>
                            </template>
                        </template>
                    </MobileMenu>
                </template>
            </TheHeader>
            <main class="main">
                <ErrorPage v-if="+error.statusCode === 404" @clearError="handleClearError"/>
                <SeverErrorPage v-else @clearError="handleClearError"/>
            </main>
            <TheFooter/>
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
                <match-media v-slot="{xs}">
                    <MobileNavigation v-if="xs"/>
                </match-media>
                <ToTop/>
            </client-only>
        </div>
    </media-query-provider>
</template>
<script lang="ts" setup>
import { clearError } from '#app';
import { ref } from 'vue';
import { CLIENT_MENU } from '~/constants';
import MediaQueryProvider from 'dtkt-shared/components/MediaQueryProvider';
import MatchMedia from 'dtkt-shared/components/MatchMedia';
import TheHeader from 'dtkt-shared/components/TheHeader';
import TheFooter from 'dtkt-shared/components/TheFooter';
import ModalOffCanvas from 'dtkt-shared/components/ModalOffCanvas';
import AuthModalTabs from 'dtkt-shared/components/AuthModalTabs';
import ContactForm from 'dtkt-shared/components/ContactForm';
import SiteLogo from 'dtkt-shared/components/SiteLogo';
import MobileMenu from 'dtkt-shared/components/MobileMenu';
import Collapse from 'dtkt-shared/components/Collapse';
import AdvertManage from 'dtkt-shared/components/AdvertManage';
import ToTop from 'dtkt-shared/components/ToTop';
import MobileNavigation from 'dtkt-shared/components/MobileNavigation';
import SubscriptionNotification from 'dtkt-shared/components/SubscriptionNotification';
import ErrorPage from 'dtkt-shared/components/404';
import SeverErrorPage from 'dtkt-shared/components/500';

const props = defineProps({
    error: Object,
});

console.log(props.error);

const handleClearError = () => clearError({ redirect: '/' });

const isExpandedMenuItem = ref(true);
const { $bus } = useNuxtApp();
const route = useRoute();

onErrorCaptured((err) => {
    console.log(route.fullPath);
});

const isShowLoginModal = ref(false);
const isShowContactModal = ref(false);
const isShowAdvertModal = ref(false);
const activeTab = ref();

$bus.$on('openContactModal', (value: boolean): void => {
    isShowContactModal.value = value;
});

interface modalOptions {
    open: boolean;
    tab: string;
}

$bus.$on('openLoginModal', (options: modalOptions = { open: true, tab: 'login' }): void => {
    isShowLoginModal.value = options.open;
    activeTab.value = <string>options.tab;
});

$bus.$on('openAdvertModal', (value: boolean): void => {
    isShowAdvertModal.value = value;
});
</script>
