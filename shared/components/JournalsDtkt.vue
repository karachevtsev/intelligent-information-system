<template>
    <div class="box mb-30">
        <div class="box-header">
            <h2>Журнали «Дт-Кт»</h2>
        </div>
        <div class="box-content">
            <ul class="journals-list" v-if="issues.length">
                <template v-for="(issue, index) of issues" :key="issue.id">
                    <li v-if="index===0">
                        <div class="journal">
                            <NuxtLink class="journal-cover" :to="issue.url" target="_blank" rel="">
                                <NuxtPicture format="webp"
                                             quality="80"
                                             src="/images/journal-cover.jpg"
                                             alt="Журнали «Дт-Кт»"
                                             height="200"
                                             width="136"
                                             placeholder="/images/cover.svg"
                                             preload
                                />
                            </NuxtLink>
                            <p v-text="issue.title"></p>
                            <NuxtLink :to="issue.url" class="btn" rel="" target="_blank">Читати онлайн</NuxtLink>
                        </div>
                    </li>
                    <li v-if="index===0" class="journal-previous">Попередні випуски:</li>
                    <li v-else class="journal-link">
                        <NuxtLink :to="issue.url" target="_blank" rel="">{{ issue.title }}</NuxtLink>
                    </li>
                </template>
            </ul>
        </div>
        <div class="box-link">
            <NuxtLink target="_blank" to="https://online.dtkt.ua">
                Усі журнали
                <svg fill="none" height="8" viewBox="0 0 5 8" width="5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 0.999969L4 3.99997L1 6.99997" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                </svg>
            </NuxtLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useFetch } from 'nuxt/app';

const { public: { apiBase } } = useRuntimeConfig();

const { data } = await useFetch('/online/latest', { baseURL: apiBase, key: '/online/latest' });

const issues = ref(data.value?.data ?? []);

watch(data, (value) => {
    issues.value = value?.data ?? [];
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

    &-cover {
        display: block;
        width: 136px;
        height: 200px;
        margin-bottom: 30px;
    }

    img {
        width: inherit;
        height: inherit;
        filter: drop-shadow(0px 16px 20px rgba(0, 0, 0, 0.2));
        background: #F4F4F4;
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
