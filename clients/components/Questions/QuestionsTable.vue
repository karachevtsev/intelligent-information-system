<template>
    <div class="questions">
        <template v-if="total > 0">
            <div class="questions-headline">
                Тут зберігаються відповіді на ваші запитання
                <br>
                консультантам редакції «Дебет-Кредит»
            </div>
            <div class="questions-btn">
                <QuestionsButton/>
            </div>
            <div class="questions-list">
                <div class="question" v-for="question in questions" :key="question.id">
                    <div class="question-date">
                        {{ new Date(question.created_at).toLocaleDateString('uk-UA') }}
                    </div>
                    <div class="question-text">
                        <b>Запитання</b>
                        {{ question.description }}
                    </div>
                    <div class="question-text">
                        <b>Відповідь</b>
                        <div v-if="question?.answer?.text" v-html="question?.answer?.text"></div>
                        <template v-else-if="question.resolution === 1 && question?.content">
                            Відповідь на Ваше запитання за посиланням:
                            <NuxtLink :to="question?.content?.url">
                                {{ question?.content?.title }}
                            </NuxtLink>
                        </template>
                        <template v-else-if="question.resolution === 2">
                            {{ question?.failed ? `Питання відхилено з причини: ${question?.failed}` : 'Питання відхилено' }}
                        </template>
                        <template v-else-if="question.resolution === 3">
                            Відповідь надано по телефону
                        </template>
                        <template v-else-if="question.resolution === 4">
                            Відмова від платної відповіді на унікальне запитання
                        </template>
                        <template v-else-if="question?.isphone">
                            Чекає на дзвінок консультанта
                        </template>
                        <template v-else>
                            Ваше запитання отримане нами. Відповідь очікуйте найближчим часом.
                        </template>
                    </div>
                </div>
            </div>
            <Pagination
                v-if="total > perPage"
                :highlight="pages"
                :page="page"
                :per-page="perPage"
                :total="total"
            />
            <div class="questions-btn questions-btn-bottom">
                <QuestionsButton/>
            </div>
        </template>
        <QuestionsEmpty v-else/>
    </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from '#app';
import { watch, ref, computed } from 'vue';
import { getClientContentListContext } from '~/composables/contentClient';
import Pagination from 'dtkt-shared/components/Pagination';
import QuestionsButton from '~/components/Questions/QuestionsButton.vue';
import QuestionsEmpty from '~/components/Questions/QuestionsEmpty.vue';

const { $client } = useNuxtApp();
const route = useRoute();
const perPage = ref(5);

const { items: questions, page, pages, toPage, total } = await getClientContentListContext(
    {
        per_page: perPage.value,
        page: +(route.query.page || 1),
    },
    'consulting',
    'questions',
);

watch(route, async ({ query: { page: _page = '1' } }: { query: { page?: string } }) => {
    if (page.value !== +_page) {
        await toPage(+_page);
    }
});
</script>

<style lang="scss">
.questions {

    &-headline {
        margin-bottom: 20px;
        font-size: 18px;
        text-align: center;
    }

    &-btn {
        text-align: center;
    }

    &-btn-bottom {
        margin-top: 40px;
    }

    &-list {
        margin-top: 50px;
    }
}

.question {
    border-radius: 6px;

    + .question {
        margin-top: 30px;
    }

    &-date {
        padding: 10px;
        font-size: 16px;
        text-align: center;
        color: $white;
        background: $color-blue-light;
        border-radius: 6px 6px 0px 0px;
    }

    &-text {
        padding: 15px;
        background: #F4F5F7;

        + .question-text {
            margin-top: 5px;
            border-radius: 0px 0px 6px 6px;
        }

        b {
            display: block;
            margin-bottom: 10px;
            font-size: 16px;
        }
    }
}
</style>
