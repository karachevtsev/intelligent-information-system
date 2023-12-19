<template>
    <div class="text-analyse">
        <h3>Аналізуйте текст статті та отримуйте додаткову інформацію!</h3>
        <p>У нашій системі ви маєте чудову можливість провести аналіз тексту статті з використанням передового інструменту аналітики тексту. Просто
            натискайте на кнопку нижче та отримуйте цінні висновки та додаткову інформацію</p>
        <b>Чому це важливо?</b>
        <ol>
            <li><b>Визначення ключових тем і понять.</b>
                Ідентифікуйте основні поняття та терміни статті, це допоможе вам швидко розібратися в суті
                тексту та визначити його основні аспекти.
                З легкістю проводьте пошк на нашому ресурсі по ключових словах статті та отримайте висновки.
            </li>
            <li><b>Оцінка настрою статті.</b>
                Дізнайтеся, який вплив має стаття — позитивний, нейтральний чи негативний, що особливо є важливим в
                контексті законодавства. Це може бути корисно при
                прийнятті рішень чи формуванні вашої власної думки.
            </li>
        </ol>
        <p>Натискайте на кнопку нижче та розпочинайте аналіз тексту! </p>
        <p class="text-center">
            <Spinner v-if="isAnalyzed"/>
            <button v-else class="btn" type="button" @click="analyzeText">Виконати аналіз статті 📊</button>
        </p>
        <div class="text-analyse-result" v-if="sentimentAnalysisResult">
            <p>Оцінка настрою: {{ sentimentAnalysisResult }} {{ sentimentConfidenceScore * 100 }}%</p>
            <br>
            <p>Ключові слова:</p>
            <ul v-if="keywords.length">
                <li v-for="keyword in keywords" :key="keyword">
                    <NuxtLink :to="`/search?query=${keyword}`" target="_blank">{{ keyword }}</NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { AzureKeyCredential, TextAnalyticsClient } from '@azure/ai-text-analytics';
import { ref } from 'vue';
import Spinner from 'dtkt-shared/components/Spinner.vue';

const props = defineProps<{
    text: string
}>();

const azureEndpoint = 'https://karachevtsev.cognitiveservices.azure.com';
const azureApiKey = '84f96db2785e4d14b8c960ba2b1c30b9';
const client = new TextAnalyticsClient(azureEndpoint, new AzureKeyCredential(azureApiKey));

interface ArticleRate {
    [key: string]: string;
}

const sentimentAnalysisResult = ref('');
const sentimentConfidenceScore = ref('');
const keywords = ref([]);

function removeTags(html: string) {
    return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().substring(0, 5100);
}

const articleRate: ArticleRate = {
    positive: 'Позитивний 🟢',
    negative: 'Негативиний 🔴',
    neutral: 'Нейтральний 🟡',
    mixed: 'Нейтральний 🟡',
};

const isAnalyzed = ref(false);
const analyzeText = async () => {
    isAnalyzed.value = true;
    const text = removeTags(props.text);

    const document = [
        { id: '1', language: 'uk', text: text },
    ];

    try {
        const [sentimentResult, keyPhrasesResult] = await Promise.all([
            client.analyzeSentiment(document),
            client.extractKeyPhrases(document),
        ]);
        sentimentAnalysisResult.value = articleRate[sentimentResult[0].sentiment];
        sentimentConfidenceScore.value = sentimentResult[0].confidenceScores[sentimentResult[0].sentiment];
        keywords.value = keyPhrasesResult[0].keyPhrases;
    } catch (error) {
        console.error('Error:', error);
    } finally {
        isAnalyzed.value = false;
    }
};
</script>

<style lang='scss'>
.text-analyse {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 30px;
    padding: 30px;
    background: #fff;
    border: 1px solid #EDEDEF;
    border-radius: 10px;

    h3 {
        text-align: center;
    }

    p {
        margin: 0;
    }

    ol {


        li + li {
            margin-top: 10px;
        }
    }
}

.text-analyse-result {


    ul {
        display: flex;
        flex-wrap: wrap;
        margin: 0;
        padding: 0;
        list-style: none;
        gap: 5px 10px;

        li {
        }
    }
}
</style>
