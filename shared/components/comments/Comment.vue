<template>
    <div :id="`comment-${comment.id}`" class="comment">
        <div class="comment-container">
            <div :class="comment.client ? 'userpic-user' : 'userpic-default'" class="userpic">
                <template v-if="comment.client?.avatar">
                    <img :alt="comment.name" :src="comment.client?.avatar" height="48" width="48">
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
                <div class="comment-controls"
                     @click="isShowReplyForm = !isShowReplyForm"
                     v-text="isShowReplyForm ? 'Приховати відповідь' : 'Відповісти'"
                ></div>
            </div>
        </div>
        <CommentsForm
            v-if="isShowReplyForm"
            :parent="comment.id"
            :thread="thread"
            @sendComment="sendComment"
            :showNotify="false"
        />
        <Reply
            v-for="children in comment.children"
            v-if="comment.children.length"
            :key="children.id"
            :comment="children"
        />
        <div v-if="comment.children_count > 2 && isShowAllReplies" class="comment-more">
            <span @click="showAllReplies(comment.id)">Усі {{ comment.children_count }}
                <Plural
                    :value="comment.children_count"
                    few="коментаря"
                    many="коментарів"
                    one="коментар"
                />
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useNuxtApp } from '#app';
import { computed } from 'vue';
import CommentsForm from './CommentsForm';
import Reply from './Reply';
import Plural from '../plural.js';

const { $client } = useNuxtApp();
const isShowReplyForm = ref(false);
const isShowAllReplies = ref(true);

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

const emit = defineEmits(['sendComment', 'showAllReplies']);

const sendComment = (comment: object) => {
    isShowReplyForm.value = false;
    emit('sendComment', comment);
};

const showAllReplies = (id: number) => {
    isShowAllReplies.value = false;
    emit('showAllReplies', id);
};
</script>

