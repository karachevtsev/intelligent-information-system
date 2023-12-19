<template>
    <div class="modal-report-activate">
        <p>Ви активуєте ліцензію для {{ info.title }}, <b>{{ info.code }}</b> на період {{ period }}</p>
        <span>Зверніть увагу!</span>
        <p>Після активації ви зможете безкоштовно подавати звітність в системі «СОТА» до закінчення передплати на «Дебет-Кредит» лише від імені цього
            платника. Змінити його можна буде у новому передплатному періоді.</p>
        <p>
            <button @click="activateReport(info.id, subscription.id)"
                    type="button"
                    class="btn btn-profile"
            >
                Підтвердити
            </button>
        </p>
    </div>
</template>

<script lang='ts' setup>
import { useNuxtApp, useRuntimeConfig } from '#app';
import { computed } from 'vue';

const props = defineProps({
    info: Object,
    subscription: Object,
});

const { $bus } = useNuxtApp();
const isDisabled = ref(false);
const { public: { apiBase } } = useRuntimeConfig();

const activateReport = async (id: number, subsId: number) => {
    try {
        isDisabled.value = true;
        await $fetch(`/dtkt/medoc/${id}`, {
            baseURL: apiBase,
            method: 'PUT',
            credentials: 'include',
            body: { subs: subsId },
        });
        $bus.$emit('activateReport');
    } catch (e) {
        console.log(e);
        $bus.$emit('activateReport', 'error');
    } finally {
        isDisabled.value = false;
    }
};

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('uk-UK', { year: 'numeric', month: 'long' });
};

const period = computed(() => {
    const begin = formatDate(props.subscription?.begin);
    const end = formatDate(props.subscription?.end);

    return `${begin} - ${end}`;
});
</script>

<style lang='scss'>
.modal-report-activate {
    text-align: center;
    font-size: 16px;
    color: #999999;

    p {
        margin-bottom: 20px;

        &:first-child {
            color: #000000;
        }

        &:last-child {
            margin-bottom: 0;
        }
    }

    span {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
        color: #BE4949;
    }
}
</style>
