<template>
    <div class="profile-data">
        <template v-if="orders.length">
            <div class="profile-table profile-orders">
                <div class="profile-table-row table-header">
                    <div class="profile-table-cell">Найменування</div>
                    <div class="profile-table-cell">Номер замовлення</div>
                    <div class="profile-table-cell">Дата замовлення</div>
                    <div class="profile-table-cell">Статус оплати</div>
                    <div class="profile-table-cell">Рахунок</div>
                </div>
                <div v-for="order in orders" :key="order.id" class="profile-table-row table-body">
                    <div class="profile-table-cell profile-table-caption">
                        <ul class="order-list">
                            <li v-for="item in order.items">{{ item.caption }}, {{ item.description }}</li>
                        </ul>
                    </div>
                    <div class="profile-table-cell font-color-gray">
                        рахунок
                        <span class="cell-helper">№</span>
                        {{ order.number }}
                    </div>
                    <div class="profile-table-cell font-color-gray">
                        <span class="cell-helper">від</span>
                        {{ order.createdAt.toLocaleDateString('uk-UA') }}
                    </div>
                    <div class="profile-table-cell"
                         :class="order.paid_at ? 'font-color-success' : 'font-color-danger'"
                    >
                        {{ order.paid_at ? 'Оплачено' : 'Неоплачено' }}
                    </div>
                    <div class="profile-table-cell">
                        <NuxtLink v-if="order.paid?.type === 'order'"
                                  :to="order.downloadUrl.href"
                                  target="_blank"
                                  class="download-order"
                                  :class="{'is-paid': order.paid_at}"
                                  download
                        >
                            <svg-icon name="pdf"/>
                        </NuxtLink>
                    </div>
                </div>
            </div>
            <Pagination
                v-if="total > perPage"
                :highlight="pages"
                :page="page"
                :per-page="10"
                :to="{name: $route.name, params: $route.params, query:$route.query}"
                :total="total"
            />
        </template>
        <template v-else>
            <Image name="subscriptions-empty" alt="Історія ваших замовлень"/>
            <p class="profile-data-empty">Тут буде зберігатися історія ваших замовлень на електронний сервіс «Дебет-Кредит», книги та
                вебінари редакції, професійні курси, а також бухгалтерську та кадрову відеоплатформи.
            </p>
            <p class="text-center m-0">
                <NuxtLink :to="SUBSCRIBE_URL" class="btn btn-profile" target="_blank" rel="">Оформити передплату</NuxtLink>
            </p>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { useRoute } from '#app';
import { ref, watch } from 'vue';
import { getClientContentListContext } from '~/composables/contentClient';
import { SUBSCRIBE_URL } from 'dtkt-shared/constants/index.js';
import SvgIcon from 'dtkt-shared/components/SvgIcon';
import Pagination from 'dtkt-shared/components/Pagination';

const route = useRoute();
const perPage = ref(10);

const { items: orders, page, pages, toPage, total } = await getClientContentListContext(
    {
        perPage: perPage.value,
        page: +(route.query.page || 1),
    },
    'shop4',
    'orders',
);

watch(route, async ({ query: { page: _page = '1' } }: { query: { page?: string } }) => {
    if (page.value !== +_page) {
        await toPage(+_page);
    }
});
</script>
