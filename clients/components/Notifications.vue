<template>
    <div class="profile-data">
        <div class="profile-table profile-notifications">
            <div class="profile-table-row table-header">
                <div class="profile-table-cell">Відмітити прочитаним</div>
                <div class="profile-table-cell">Повідомлення</div>
                <div class="profile-table-cell">Дата</div>
            </div>
            <div v-for="notification in notifications"
                 :key="notification.id"
                 :class="notification.readAt ? 'is-read' : 'is-unread'"
                 class="profile-table-row table-body">
                <div class="profile-table-cell">
                    <button @click="readNotification(notification.id, notification.readAt, $updateClient)"
                            :class="{'is-read': notification.readAt}"
                            type="button"
                            class="btn-table-read"
                    >
                        <template v-if="notification.readAt">
                            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="m19.404 17.248.001.002H4.594l.001-.002c.698-1.2 1.423-3.283 1.424-6.745v-.005a5.981 5.981 0 0 1 10.216-4.24l.531-.53-.53.53a5.982 5.982 0 0 1 1.745 4.24v.002c0 3.464.726 5.548 1.423 6.748Z"
                                    stroke="#F1C40F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <mask id="a" fill="#fff">
                                    <path d="M9 18v.75a3 3 0 0 0 6 0V18"/>
                                </mask>
                                <path
                                    d="M10.5 18a1.5 1.5 0 0 0-3 0h3Zm-1.5.75H7.5 9Zm7.5-.75a1.5 1.5 0 0 0-3 0h3Zm-9 0v.75h3V18h-3Zm0 .75a4.5 4.5 0 0 0 1.318 3.182l2.121-2.121a1.5 1.5 0 0 1-.439-1.061h-3Zm1.318 3.182A4.5 4.5 0 0 0 12 23.25v-3a1.5 1.5 0 0 1-1.06-.44l-2.122 2.122ZM12 23.25a4.5 4.5 0 0 0 3.182-1.318l-2.121-2.121A1.5 1.5 0 0 1 12 20.25v3Zm3.182-1.318A4.5 4.5 0 0 0 16.5 18.75h-3a1.5 1.5 0 0 1-.44 1.06l2.122 2.122ZM16.5 18.75V18h-3v.75h3Z"
                                    fill="#F1C40F" mask="url(#a)"/>
                            </svg>
                        </template>
                        <template v-else>
                            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M5.269 10.5a6.731 6.731 0 1 1 13.463 0c0 3.358.702 5.306 1.32 6.371A.75.75 0 0 1 19.409 18H4.592a.751.751 0 0 1-.645-1.13c.62-1.064 1.322-3.013 1.322-6.37Z"
                                    fill="#F1C40F"/>
                                <path d="M9 18v.75a3 3 0 0 0 6 0V18" fill="#E2AA3C"/>
                            </svg>
                            <span class="profile-tooltip">Відмітити прочитаним</span>
                        </template>
                    </button>
                </div>
                <div class="profile-table-cell profile-table-caption">
                    <NuxtLink :to="notification.link"
                              @click="readNotification(notification.id, notification.readAt, $updateClient)"
                              :target="notification.target"
                              class="link-notification"
                    >
                        {{ notification.message }}
                    </NuxtLink>
                </div>
                <div class="profile-table-cell">
                    {{ new Date(notification.createdAt).toLocaleDateString('uk-UA') }}
                </div>
            </div>
        </div>
        <Pagination
            v-if="total > perPage"
            :highlight="pages"
            :page="page"
            :per-page="perPage"
            :to="{name: $route.name, params: $route.params, query:$route.query}"
            :total="total"
        />
    </div>
</template>

<script lang="ts" setup>
import { useNuxtApp, useRoute } from '#app';
import { ref, watch } from 'vue';
import { getClientContentListContext } from '~/composables/contentClient';
import Pagination from 'dtkt-shared/components/Pagination';

const { $client, $updateClient } = useNuxtApp();

const route = useRoute();
const perPage = ref(10);

const { items: notifications, page, pages, toPage, total, readNotification, deleteNotification } = await getClientContentListContext(
    {
        per_page: perPage.value,
        page: +(route.query.page || 1),
    },
    'clients',
    'notifications',
);

watch(route, async ({ query: { page: _page = '1' } }: { query: { page?: string } }) => {
    if (page.value !== +_page) {
        await toPage(+_page);
    }
});
</script>
