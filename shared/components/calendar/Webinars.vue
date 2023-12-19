<template>
    <div class="calendar-card">
        <div class="calendar-card-header calendar-events">
            Найближчі <br> вебінари
        </div>
        <div class="calendar-card-content">
            <template v-if="isMain">
                <div class="calendar-webinar">
                    <div class="calendar-webinar-author">
                        <img :src="webinar.author.picture" :alt="webinar.author.name" width="122" height="122">
                        <p><span>Спікер:</span>{{ webinar.author.name }}</p>
                        <p>{{ webinar.author.regalia2 }}</p>
                    </div>
                    <div class="calendar-webinar-content webinar-info">
                        <DateInfo :date="new Date(webinar.webinar.date)" class="webinar-date"/>
                        <NuxtLink :to="webinar.url.href" rel="" target="_blank" class="webinar-title">{{ webinar.title }}</NuxtLink>
                        <p v-if="webinar.author" class="webinar-author">Спікер: {{ webinar.author.name }}</p>
                        <div class="webinar-description" v-html="description"></div>
                        <div class="calendar-card-btn">
                            <NuxtLink :to="webinar.url.href" class="btn btn-calendar" rel="" target="_blank">Перейти до вебінару</NuxtLink>
                        </div>
                    </div>
                </div>
            </template>
            <ul class="calendar-card-list" :class="{'calendar-card-list-main': isMain}">
                <li>
                    <DateInfo :date="new Date(webinar.webinar.date)" class="calendar-card-date"/>
                    <NuxtLink :to="webinar.url.href" rel="" target="_blank">{{ webinar.title }}</NuxtLink>
                    <p v-if="webinar.author" class="webinar-author">Спікер: {{ webinar.author.name }}</p>
                </li>
            </ul>
        </div>
        <div class="calendar-card-btn" :class="{'calendar-card-btn-bottom': isMain}">
            <NuxtLink :to="webinar.url.href" class="btn btn-calendar" rel="" target="_blank">Перейти до вебінару</NuxtLink>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { computed } from 'vue';
import { useContentList } from '../../composables/content';
import DateInfo from '../../components/DateInfo';

const { articles: webinars } = await useContentList({ per_page: 1 }, 'webinars');

const webinar = computed(() => webinars[0]);

const description = computed(() => {
    return webinar.value.description
        .split(/(\r?\n)+/gm)
        .filter((s: string) => s !== '\r\n')
        .map((a: any) => `<p>${a}</p>`).join('');
});

const { public: { siteName } } = useRuntimeConfig();
const isMain = computed(() => siteName === 'dtkt');
</script>
