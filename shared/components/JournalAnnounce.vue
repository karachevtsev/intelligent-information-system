<template>
    <div v-if="articles.length" class="box mb-30">
        <div class="box-header">
            <h2>Журнали «Дт-Кт»</h2>
        </div>
        <div class="box-content">
            <ul class="journals-list">
                <li>
                    <div class="journal">
                        <NuxtLink :to="issues.data[0].url" target="_blank" rel="">
                            <img :src="issues.data[0].cover" :alt="issues.data[0].title" height="200" width="136" loading="lazy">
                        </NuxtLink>
                        <p v-text="issues.data[0].title"></p>
                        <NuxtLink :to="issues.data[0].url" class="btn" rel="" target="_blank">Читати онлайн</NuxtLink>
                    </div>
                </li>
                <li class="journal-link" v-for="article of articles" :key="articles.id">
                    <NuxtLink :to="article.url" target="_blank" rel="">{{ article.title }}</NuxtLink>
                </li>
            </ul>
        </div>
        <div class="box-link">
            <NuxtLink target="_blank" :to="issueLink">
                Усі статті
                <svg fill="none" height="8" viewBox="0 0 5 8" width="5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 0.999969L4 3.99997L1 6.99997" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                </svg>
            </NuxtLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { public: { apiBase } } = useRuntimeConfig();
const articles = ref([]);
const issueLink = ref();

const { data: issues } = await useFetch<any>('/online/latest', {
    baseURL: apiBase,
});

watch(issues, (newIssues) => {
    const id = newIssues?.data[0]?.id;
    if (id) {
        useFetch(`online/issues/${id}/articles`, {
            baseURL: apiBase,
            params: {
                anonce: 1,
            },
        }).then((response) => {
            articles.value = response.data?.value?.data.slice(0, 6);
            issueLink.value = response.data?.value?.data[0]?.issue?.url;
        });
    }
}, {
    deep: true,
    immediate: true,
});
</script>

<style lang="scss">
.journals-list {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
        &.journal-previous {
            margin-bottom: 12px;
            font-weight: 500;
            font-size: 15px;
            line-height: 18px;
            color: #333333;
        }

        &.journal-link {
            font-weight: 400;
            font-size: 15px;
            line-height: 18px;

            a {
                color: #333333;
                text-decoration-line: underline;

                &:hover {
                    color: $color-main;
                }
            }

            + .journal-link {
                margin-top: 12px;
            }
        }
    }
}

.journal {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #EDEDEF;

    img {
        margin-bottom: 30px;
        width: 136px;
        height: 200px;
        filter: drop-shadow(0px 16px 20px rgba(0, 0, 0, 0.2));
    }

    p {
        margin-bottom: 20px;
        font-weight: 500;
        font-size: 21px;
        line-height: 25px;
        text-align: center;
        color: $gray-dark;
    }

    .btn {
        width: 150px;
        font-size: 14px;
        line-height: 15px;

        &:focus {
            color: $black
        }
    }
}
</style>
