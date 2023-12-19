<template>
    <div class="google-custom-search">
        <h2>Не знайшли те, що шукали? ☹️</h2>
        <p>Перевірте правильність написання або скористайтесь вбудованим пошуком від
            <NuxtLink :to="isMain ? '/search' : 'https://dtkt.ua/search'" target="_blank" ref="">Google</NuxtLink>
        </p>
    </div>
</template>

<script lang='ts' setup>
import { computed } from 'vue';

const { public: { siteName } } = useRuntimeConfig();
const isMain = computed(() => siteName === 'dtkt');
</script>

<style lang='scss'>
.google-custom-search {
    margin-top: 30px;
    padding: 20px;
    background: rgba($color-main, 0.15);
    border-radius: 16px;
    text-align: center;

    h2 {
        margin-bottom: 5px;
        font-weight: 700;
        font-size: 18px;
    }

    p {
        margin: 0;

        a {
            color: #0243EC;

            &:hover {
                text-decoration: none;
            }
        }
    }
}
</style>
