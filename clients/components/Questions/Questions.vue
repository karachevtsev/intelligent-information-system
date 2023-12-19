<template>
    <div class="profile-data">
        <QuestionsForm v-if="showQuestionForm" @toQuestions="showQuestionForm=false; scrollTo();"/>
        <QuestionsTable v-else/>
        <Modal v-model="showDeniedModal">
            <template v-slot:header>
                Зверніть увагу!
            </template>
            <template v-slot:content>
                <component :is="component"></component>
            </template>
        </Modal>
    </div>
</template>

<script lang="ts" setup>
import { useFetch, useNuxtApp } from '#app';
import { computed, ref } from 'vue';
import QuestionsDenied from './QuestionsDenied';
import QuestionsLimit from './QuestionsLimit';
import Modal from 'dtkt-shared/components/Modal';

const { $client, $bus } = useNuxtApp();
const showDeniedModal = ref(false);
const showQuestionForm = ref(false);
const { public: { apiBase } } = useRuntimeConfig();

const scrollTo = (y = 0) => {
    window.scrollTo({
        top: y,
    });
};

const askQuestion = async () => {
    if (!$client.value?.additional?.packages?.question || $client.value?.additional?.packages?.question < 1) return showDeniedModal.value = true;

    const {
        data: {
            value: {
                status,
            },
        },
    } = await useFetch('consulting/questions', {
        baseURL: apiBase,
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ test: 1 }),
        key: 'consulting/questions',
    });

    if (status === 'ok') {
        scrollTo();
        return showQuestionForm.value = true;
    }

    return showDeniedModal.value = true;
};

const component = computed(() => {
    return !$client.value?.additional?.packages?.question ? QuestionsDenied : QuestionsLimit;
});

$bus.$on('askQuestion', askQuestion);
</script>
