<template>
    <Modal v-model="isOpen">
        <template v-slot:header>
            Зверніть увагу!
        </template>
        <template v-slot:content>
            <div class="modal-content-mailing text-center">
                <template v-if="modalType === 'alarms'">
                    <p class="mb-20">Бухгалтерський сервис нагадувань та повідомлень доступний лише для передплатників пакетів «Мій асистент»,
                        «Експерт», «Профі»,
                        «Профі Плюс»</p>
                    <NuxtLink :to="SUBSCRIBE_URL" target="_blank" rel="" class="btn btn-profile">Оформити передплату</NuxtLink>
                </template>
                <template v-else>
                    <p class="mb-20">
                        Тематичні розсилки доступні лише за передплатою.
                        Вартість мінімального пакету «Мій асистент» становить лише
                        <Price product="ds-assistant" plan="stand"/>
                    </p>
                    <NuxtLink :to="PACKAGES.ma.link" target="_blank" rel="" class="btn btn-profile">Придбати пакет</NuxtLink>
                </template>
            </div>
        </template>
    </Modal>
</template>

<script lang='ts' setup>
import { useNuxtApp } from '#app';
import { SUBSCRIBE_URL, PACKAGES } from 'dtkt-shared/constants/index.js';
import Modal from 'dtkt-shared/components/Modal';
import Price from 'dtkt-shared/components/article/Price';

const { $client, $bus } = useNuxtApp();
const isOpen = ref(false);
const modalType = ref('');

$bus.$on('openMailingModal', (value: string) => {
    isOpen.value = true;
    modalType.value = value;
});
</script>
