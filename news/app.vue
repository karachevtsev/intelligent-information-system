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
                    <SiteLogo title="Новини"/>
                </template>
                <template v-slot:mobile-menu>
                    <MobileMenu>
                        <template v-slot:site-menu>
                            <Collapse v-model="isExpandedRubrics" title="Новини" titleExpanded="Новини">
                                <ul class="mobile-menu-list">
                                    <li v-for="category in rubrics" :key="category.id">
                                        <NuxtLink :to="`/${category.slug}`">{{ category.title }}</NuxtLink>
                                    </li>
                                </ul>
                            </Collapse>
                        </template>
                    </MobileMenu>
                </template>
            </TheHeader>
            <main class="main">
                <NuxtLayout>
                    <NuxtLoadingIndicator color="#8BBA43"/>
                    <NuxtPage/>
                </NuxtLayout>
            </main>
            <TheFooter/>
            <client-only>
                <ToTop/>
            </client-only>
            <Modals/>
        </div>
    </media-query-provider>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import MediaQueryProvider from 'dtkt-shared/components/MediaQueryProvider';
import MatchMedia from 'dtkt-shared/components/MatchMedia';
import TheHeader from 'dtkt-shared/components/TheHeader';
import TheFooter from 'dtkt-shared/components/TheFooter';
import SiteLogo from 'dtkt-shared/components/SiteLogo';
import MobileMenu from 'dtkt-shared/components/MobileMenu';
import Collapse from 'dtkt-shared/components/Collapse';
import CookieMessage from 'dtkt-shared/components/CookieMessage';
import ToTop from 'dtkt-shared/components/ToTop';
import DesktopBottomNavigation from 'dtkt-shared/components/DesktopBottomNavigation';
import MobileNavigation from 'dtkt-shared/components/MobileNavigation';
import SubscriptionNotification from 'dtkt-shared/components/SubscriptionNotification';
import Openx from 'dtkt-shared/components/Openx';
import Modals from 'dtkt-shared/components/Modals';
import { useRubrics } from 'dtkt-shared/composables/content';

const rubrics = await useRubrics('news');

const route = useRoute();
onErrorCaptured((err) => {
    console.log(route.fullPath);
});

const isExpandedRubrics = ref(true);
</script>
