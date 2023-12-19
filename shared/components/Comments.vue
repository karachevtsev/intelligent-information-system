<template>
    <Comments
        v-if="thread"
        :api="api"
        :comments="comments"
        :loading="loading"
        :newComment="newComment"
        :page="page"
        :pages="pages"
        :thread="threadData"
        :total="total"
        :total_comments="total_comments"
        @create="createComment"
        @loadReplies="loadReplies"
        @page="setPage"
    />
</template>
<script>
import {CommentsApi} from '../composables/comments';
import Comments from './comments/Comments';

const scrollTo = (y = 0) => {
    window.scrollTo({
        top: y,
    });
}

export default {
    components: {Comments},
    props: {
        thread: {
            type: [Number, Object, null],
            required: true,
        },
    },
    data() {
        return {
            threadData: null,
            api: null,
            comments: [],
            page: 1,
            pages: 1,
            total: 0,
            total_comments: 0,
            timer: null,
            buffer: [],
            bufferTimer: null,
            newComment: null,
            loading: true,
        }
    },
    beforeMount() {
        if (!this.thread) return

        this.api = new CommentsApi(this.threadId)

        if (typeof this.thread !== 'number') {
            this.threadData = this.thread
        }

        const matches = /^#(comment-(\d+))$/.exec(window.location.hash);

        if (matches) {
            this.fetchComments(matches && +matches[2]).then(() => {
                const comment = document.getElementById(matches[1]);
                const height = document.getElementById('header').offsetHeight;
                let y = 0;
                if (comment !== null) {
                    y = comment.getBoundingClientRect()?.top + window.pageYOffset - height;
                }
                scrollTo(y);
            });
        } else {
            this.fetchComments();
        }
    },
    computed: {
        threadId() {
            return typeof this.thread === 'number' ? this.thread : this.thread.id
        },
    },
    watch: {
        page() {
            this.fetchComments()
        },
    },
    methods: {
        insert(comment) {
            this.buffer.push(comment)
            this.bufferTimer || (this.bufferTimer = setTimeout(() => this.flush(), 100))
        },
        flush(comment = null) {
            if (comment) {
                this.insert(comment)
            }
            const comments = [...this.buffer.reverse(), ...this.comments]
            if (this.timer && comments.length > 1000) {
                comment.length = 500
            }
            this.comments = comments
            this.buffer.length = 0
            clearTimeout(this.bufferTimer)
            this.bufferTimer = null
        },
        /**
         *
         * @param {number?} comment
         * @returns {Promise<void>}
         */
        async fetchComments(comment) {
            try {
                this.loading = true
                const {data, meta, thread} = await this.api.fetchComments({
                    limit: 10,
                    page: this.page,
                    thread: Number(this.threadData !== null),
                    comment
                })

                this.threadData = thread || this.threadData;
                this.comments = data;
                this.total = meta.total;
                this.total_comments = meta.total_comments;
                this.pages = meta.last_page;
                this.page = meta.current_page;
            } catch (e) {
                console.log('Error fetching comments: ', e);
            } finally {
                this.loading = false;
            }
        },
        setPage(page) {
            this.page = page
        },
        createComment(comment) {
            if (!comment.parent_id) {
                this.newComment = {
                    id: `new-${new Date().getTime()}`,
                    created_at: new Date().toISOString(),
                    options: {},
                    children: [],
                    ...comment,
                    status: 2,
                }
            }
            this.api.createComment(comment)
                .then(({data, meta}) => {
                    if (data.parent_id > 0) {
                        const commentToReply = this.comments.find(c => c.id === data.parent_id)
                        commentToReply.children = [
                            data,
                            ...commentToReply.children.filter(c => c.id !== 'new'),
                        ]
                        commentToReply.children_count = commentToReply.children_count + 1
                    } else {
                        this.flush(data);
                        this.newComment = null;
                        this.total = meta.branch_total;
                        this.page = 1;
                    }
                })
                .catch(response => {
                    this.newComment = null;
                    throw response;
                })
        },
        loadReplies(parent) {
            this.api.loadReplies(parent)
                .then(({data}) => {
                    this.comments = this.comments.map(c => c.id === parent ? {...c, children: data} : c)
                })
        },
    },
}
</script>
