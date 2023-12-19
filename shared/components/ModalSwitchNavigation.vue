<template>
    <Modal v-model="open"
           :showCloseButton="false"
           class="modal-navigation"
    >
        <template v-slot:header>
            Зверніть увагу!
        </template>
        <template v-slot:content>
            <div class="modal-navigation-content">
                <p>Щоб швидко перейти на необхідний розділ сайту – тисніть <b>«Всі розділи»</b> на кольоровій стрічці вгорі сторінки</p>
                <div class="modal-navigation-buttons">
                    <button type="button" class="btn btn-ok" @click="accept();hide()">Зрозуміло</button>
                    <button type="button" class="btn btn-no" @click="hide">Залишити як є</button>
                </div>
            </div>
        </template>
    </Modal>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import Modal from './Modal';

const { $bus } = useNuxtApp();
const open = ref(false);
const name = 'dk-accept-navigation';

$bus.$on('openNavigationModal', (value: boolean): void => {
    open.value = value;
});

const accept = async () => {
    await $bus.$emit('onSwitchNavigation', { show: false });
};

const hide = () => {
    open.value = false;
};
</script>

<style lang='scss'>
.modal-navigation {
    .modal {
        width: 450px;
    }

    &-content {
        font-size: 16px;
        text-align: center;

        p {
            margin-bottom: 20px;
        }
    }

    &-buttons {
        .btn {
            width: 140px;
            margin: 0 15px;

            &-no {
                color: $gray-light;
                border: 1px solid $gray-lighter;
                background: $white;

                &:hover {
                    color: $gray;
                    border-color: $gray;
                }
            }
        }
    }
}
</style>
