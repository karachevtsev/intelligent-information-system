<template>
    <media-query-provider :queries="{
        xs: '(max-width: 768px)',
        md: '(min-width: 769px) and (max-width: 991px)',
        lg: '(min-width: 992px) and (max-width: 1199px)',
        xl: '(min-width: 1200px) and (max-width: 1519px)',
        xxl: '(min-width: 1520px)',
    }" fallback="xs">
        <div class="page">
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
                <div class="container">
                    <ErrorPage v-if="+error.statusCode === 404" @clearError="handleClearError"/>
                    <SeverErrorPage v-else @clearError="handleClearError"/>
                </div>
            </main>
            <TheFooter/>
            <client-only>
                <match-media v-slot="{xs}">
                    <MobileNavigation v-if="xs"/>
                </match-media>
                <ToTop/>
            </client-only>
            <Modals/>
        </div>
    </media-query-provider>
</template>
<script lang="ts" setup>
import { clearError } from '#app';
import { ref } from 'vue';
import MediaQueryProvider from 'dtkt-shared/components/MediaQueryProvider';
import MatchMedia from 'dtkt-shared/components/MatchMedia';
import TheHeader from 'dtkt-shared/components/TheHeader';
import TheFooter from 'dtkt-shared/components/TheFooter';
import SiteLogo from 'dtkt-shared/components/SiteLogo';
import MobileMenu from 'dtkt-shared/components/MobileMenu';
import Collapse from 'dtkt-shared/components/Collapse';
import ToTop from 'dtkt-shared/components/ToTop';
import MobileNavigation from 'dtkt-shared/components/MobileNavigation';
import ErrorPage from 'dtkt-shared/components/404';
import { useRubrics } from 'dtkt-shared/composables/content';
import Modals from 'dtkt-shared/components/Modals';
import SeverErrorPage from 'dtkt-shared/components/500';

const props = defineProps({
    error: Object,
});

console.log(props.error);

const route = useRoute();

onErrorCaptured((err) => {
    console.log(route.fullPath);
});

const isExpandedRubrics = ref(true);
const rubrics = await useRubrics('news');
const handleClearError = () => clearError({ redirect: '/' });
</script>
