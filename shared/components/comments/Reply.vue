<template>
    <div class="comment">
        <div class="comment-container">
            <div class="userpic" :class="comment.client ? 'userpic-user' : 'userpic-default'">
                <template v-if="comment.client?.avatar">
                    <img :src="comment.client?.avatar" width="48" height="48" :alt="comment.name">
                </template>
                <template v-else>
                    {{ userInitials }}
                </template>
            </div>
            <div class="comment-content">
                <div class="comment-top">
                    <b>{{ comment.name.replace(/\s+$/, '') }}<span v-if="comment.client?.worker">, <span
                        class="worker">«Дебет-Кредит»</span></span></b>
                    <span>{{ createdAt }}</span>
                </div>
                <div class="comment-text" v-html="comment.text"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useNuxtApp } from '#app';
import { computed } from 'vue';

const { $client } = useNuxtApp();

const props = defineProps({
    comment: {
        type: Object,
        required: true,
    },
    thread: {
        type: Object,
    },
});

const userInitials = computed(() => {
    let initials = props.comment.name.split(' ');

    if (initials.length === 1) {
        return initials.map((c: string[]) => c[0]).join('');
    }

    if (initials.length >= 2) {
        return initials.slice(0, 2).map((c: string[]) => c[0]).join('');
    }
});

const createdAt = computed(() => {
    const date = new Date(props.comment.created_at).toLocaleDateString('uk-UA');
    const time = new Date(props.comment.created_at).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
    return `${date}, ${time}`;
});
</script>
