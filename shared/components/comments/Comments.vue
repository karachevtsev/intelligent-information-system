<template>
    <div class="comments">
        <client-only>
            <div class="comments-count">
                <template v-if="comments.length">
                    {{ total_comments }}
                    <Plural :value="total_comments" one="коментар" few="коментаря" many="коментарів"/>
                </template>
                <template v-else>
                    До цієї статті ще немає коментарів. Залиште перший
                </template>
            </div>
            <CommentsForm
                @sendComment="createComment"
                :thread="thread"
                :showNotify="true"
            />
            <div v-if="comments.length" class="comments-list">
                <Comment
                    v-for="comment in comments.slice(0, 10)"
                    :key="comment.id"
                    :thread="thread"
                    :comment="comment"
                    @sendComment="createComment"
                    @showAllReplies="loadReplies"
                />
                <Comment
                    v-if="newComment"
                    :comment="newComment"
                    :thread="thread"
                    @sendComment="createComment"
                    @showAllReplies="loadReplies"
                />
                <CommentsPagination v-if="pages > 1" :total="total" :page="page" @setPage="setPage" class="pagination-comments"/>
            </div>
        </client-only>
    </div>
</template>

<script>
import CommentsForm from './CommentsForm'
import Comment from './Comment'
import CommentsPagination from './CommentsPagination'
import Plural from '../plural'

export default {
    components: {
        CommentsForm,
        Comment,
        CommentsPagination,
        Plural
    },
    props: {
        thread: {
            type: Object,
        },
        api: {
            required: true,
        },
        comments: {
            type: Array,
            required: true,
        },
        newComment: {
            type: Object,
        },
        total: {
            type: Number,
            default: 0,
        },
        total_comments: {
            type: Number,
            default: 0,
        },
        loading: {
            type: Boolean,
            default: true,
        },
        page: {
            type: Number,
            default: 1,
        },
        pages: {
            type: Number,
            default: 1,
        },
        allow: {
            type: Boolean,
            default: true,
        },
        title: {
            type: String
        }
    },
    emits: ['create', 'page', 'loadReplies'],
    methods: {
        createComment(comment) {
            return this.$emit('create', comment)
        },
        setPage(page) {
            this.$emit('page', page)
        },
        loadReplies(parent) {
            this.$emit('loadReplies', parent)
        }
    },
}
</script>
