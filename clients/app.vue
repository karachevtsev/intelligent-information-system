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
                <NuxtLayout>
                    <NuxtLoadingIndicator color="#0e7838"/>
                    <NuxtPage/>
                </NuxtLayout>
            </main>
            <TheFooter/>
            <client-only>
                <match-media v-slot="{xs}">
                    <MobileNavigation v-if="xs"/>
                </match-media>
                <match-media v-slot="{xl, xxl}">
                    <DesktopBottomNavigation v-if="xl || xxl"/>
                </match-media>
                <CookieMessage v-if="$route.name !== 'cookies'"/>
                <ToTop/>
            </client-only>
            <Modals/>
        </div>
    </media-query-provider>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { CLIENT_MENU } from '~/constants';
import MediaQueryProvider from 'dtkt-shared/components/MediaQueryProvider';
import MatchMedia from 'dtkt-shared/components/MatchMedia';
import TheHeader from 'dtkt-shared/components/TheHeader';
import TheFooter from 'dtkt-shared/components/TheFooter';
import Modals from 'dtkt-shared/components/Modals';
import SiteLogo from 'dtkt-shared/components/SiteLogo';
import MobileMenu from 'dtkt-shared/components/MobileMenu';
import Collapse from 'dtkt-shared/components/Collapse';
import CookieMessage from 'dtkt-shared/components/CookieMessage';
import ToTop from 'dtkt-shared/components/ToTop';
import DesktopBottomNavigation from 'dtkt-shared/components/DesktopBottomNavigation';
import MobileNavigation from 'dtkt-shared/components/MobileNavigation';
import SubscriptionNotification from 'dtkt-shared/components/SubscriptionNotification';

const isExpandedMenuItem = ref(true);
const route = useRoute();

onErrorCaptured((err) => {
    console.log(route.fullPath);
});
</script>
