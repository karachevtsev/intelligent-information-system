<template>
    <div class="comments-form">
        <div class="userpic userpic-form">
            <img v-if="$client && $client.avatar" :src="$client.avatar" :alt="$client.name" width="48" height="48">
        </div>
        <div class="comments-form-body">
            <form class="comment-form" @submit.prevent="send">
                <div class="comment-form-fields" :class="{'has-errors': Object.keys(errors).length !== 0}">
                    <div class="comment-form-input">
                        <Field
                            v-model="name"
                            name="name"
                            class="comment-input"
                            type="text"
                            placeholder="Ім’я"
                        />
                        <span v-if="!$client" class="comment-auth" @click="$bus.$emit('openLoginModal')">Авторизація</span>
                    </div>
                    <Field
                        as="textarea"
                        name="text"
                        class="comment-textarea"
                        placeholder="Введіть текст коментаря (не менше 5 символів)"
                        rows="5"
                    ></Field>
                </div>
                <ErrorMessage class="error" name="name"></ErrorMessage>
                <ErrorMessage class="error" name="text"></ErrorMessage>
                <div class="comment-form-controls">
                    <template v-if="showNotify">
                        <label v-if="$client" class="form-check">
                            <input class="form-check-input"
                                   type="checkbox"
                                   name="notify"
                                   v-model="notify"
                            >
                            <span class="form-check-label">
                              Повідомляти про відповіді на e-mail
                        </span>
                        </label>
                        <div class="comment-form-auth" v-else><span @click="$bus.$emit('openLoginModal')">Авторизуйтесь,</span> щоб отримати відповідь
                            на ваш e-mail
                        </div>
                    </template>
                    <button type="submit" class="btn">Відправити</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from '#app';
import { ErrorMessage, Field, Form, useForm, configure } from 'vee-validate';
import { ref, watch } from 'vue';
import { object, string } from 'yup';
import { errorMessages } from '../../utils/validators';

const { $client, $bus } = useNuxtApp();
const name = ref($client.value?.nickname || $client.value?.name || '');
const notify = ref(false);

const props = defineProps({
    thread: {
        type: Object,
    },
    parent: {
        type: Number,
    },
    showNotify: {
        type: Boolean,
        default: true,
    },
});

configure({
    validateOnInput: false,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnModelUpdate: false,
});

watch($client, () => {
    name.value = $client.value?.nickname || $client.value?.name || '';
});

const { errors, handleSubmit } = useForm({
    validationSchema: object({
        name: string().required(errorMessages.requiredCommentName),
        text: string().required(errorMessages.requiredCommentText).min(5, errorMessages.massageCommentMin).max(1000, errorMessages.massageCommentMax),
    }),
});

const emit = defineEmits(['sendComment']);

const send = handleSubmit((values, { resetForm }) => {
    emit('sendComment', {
        name: values.name,
        text: values.text,
        parent_id: props.parent || 0,
        options: {
            notification: notify.value,
        },
    });

    resetForm({
        values: {
            name: $client.value?.nickname || $client.value?.name || '',
            text: '',
        },
    });
});
</script>
