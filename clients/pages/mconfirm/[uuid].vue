<template>
    <ContentBase>
        <div class="box-header box-header-left">
            <h1 class="title-bordered">Підтвердження підписки на розсилку</h1>
        </div>
        <div class="box-profile mailing-confirmation">
            <div class="mailing-confirmation-text" v-html="confirmation"></div>
            <Image name="mailing-confirm" alt="Підтвердження підписки на розсилку"/>
            <NuxtLink to="/mailing" class="btn btn-profile">Перейти до списку розсилок</NuxtLink>
        </div>
    </ContentBase>
</template>

<script lang="ts" setup>
import { useRoute } from '#app';
import { ref } from 'vue';
import { createError } from 'h3';

const route = useRoute();
const { public: { apiBase } } = useRuntimeConfig();
const confirmation = ref('');

try {
    const { text }: any = await $fetch(`mailing/confirm/${route.params.uuid}`, {
        method: 'POST',
        baseURL: apiBase,
    });
    confirmation.value = text;
} catch (error) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
}
</script>

<style lang='scss'>
.mailing-confirmation {
    text-align: center;

    &-text {
        max-width: 550px;
        margin: 0 auto 40px;
    }

    h2 {
        margin-bottom: 10px;
        font-weight: 700;
        font-size: 18px;
        color: $color-blue;
    }

    p {
        margin: 0;
        font-weight: 400;
        font-size: 18px;

        u {
            color: $color-blue;
        }
    }

    img {
        margin-bottom: 40px;
    }
}
</style>
