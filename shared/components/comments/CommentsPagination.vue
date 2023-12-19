<template>
    <div class="pagination">
        <ul class="pagination-list">
            <li :class="{disabled: page === 1}" class="page-item">
                <span @click="setPage(page - 1)" class="page-link page-link-back">
                    <svg fill="none" height="11" viewBox="0 0 7 11" width="7" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.99994 10L0.999939 5.5L5.99994 1" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </svg>
                </span>
            </li>
            <li v-for="item in items" :class="{disabled: !item, active: page === item}" class="page-item">
                <span v-if="item" @click="setPage(item)" class="page-link">
                    <span>{{ item }}</span>
                </span>
                <span v-else class="page-link page-link-empty">...</span>
            </li>
            <li class="page-item" :class="{disabled: page === pages}">
                <span @click="setPage(page + 1)" class="page-link page-link-next">
                    <svg fill="none" height="12" viewBox="0 0 7 12" width="7" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.999939 1.5L5.99994 6L0.999939 10.5" stroke="black" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2"/>
                    </svg>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
const scrollTo = (y = 0) => {
    window.scrollTo({
        top: y,
    });
}

export default {
    name: "Pagination",
    props: {
        total: {
            type: Number,
            required: true,
        },
        perPage: {
            type: Number,
            default: 10,
        },
        page: {
            type: Number,
            default: 1,
            required: true,
        },
        delta: {
            type: Number,
            default: 2,
        },
        delta2: {
            type: Number,
            default: 1,
        },
    },

    watch: {
        page() {
            const comments = document.getElementById('comments');
            const height = document.getElementById('header').offsetHeight;
            let y = 0;
            if (comments !== null) {
                y = comments.getBoundingClientRect().top + window.pageYOffset - height;
            }
            scrollTo(y);
        }
    },
    computed: {
        pages() {
            return Math.max(1, Math.ceil(this.total / this.perPage))
        },
        items() {
            return [
                [1, Math.min(this.delta2, this.pages)],
                [Math.max(this.page - this.delta, 1), Math.min(this.page + this.delta, this.pages)],
                [Math.max(this.pages - this.delta2 + 1, 1), this.pages],
            ].reduce((items, [a, b]) => {
                let last = items.length ? items[items.length - 1] : 0
                for (let i = a; i <= b; ++i) {
                    if (i <= last) continue
                    if (i > last + 1)
                        items.push(i === last + 2 ? i - 1 : 0)
                    items.push(i)
                    last = i
                }
                return items
            }, [])
        },
    },
    methods: {
        setPage(page) {
            if (page > 0 && page <= this.total) {
                this.$emit('setPage', page);
            }
        }
    },
}
</script>
