<template>
    <ContentBase>
        <div class="box-header box-header-left">
            <h1 class="title-bordered">Видалити аккаунт</h1>
        </div>
        <div class="box-profile">
            <DeleteSteps v-if="$client" @delete-profile="deleteProfile"/>
            <Login v-else :auth-or-login="false"/>
        </div>
    </ContentBase>
</template>

<script lang='ts' setup>
import { useNuxtApp, useRuntimeConfig } from '#app';
import DeleteSteps from '~/components/Delete/DeleteSteps.vue';

const { $client } = useNuxtApp();
const { public: { apiBase } } = useRuntimeConfig();
const deleteProfile = async () => {
    try {
        await $fetch('/clients/delete', {
            baseURL: apiBase,
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: "application/json"
            },
            async onResponse({ response }) {
                if (!response.ok) {
                    return Promise.reject(response);
                }
            },
        })
            .then(async () => {
                $client.value = null;

                await navigateTo({
                    path: '/delete_success',
                    replace: true
                })
            });
    } catch (response) {
        console.log(response);
    }
}
</script>
