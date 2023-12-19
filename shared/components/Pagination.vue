<template>
    <div class="pagination">
        <ul class="pagination-list">
            <li :class="{disabled: page === 1}" class="page-item">
                <NuxtLink :replace="replace" :to="route(page - 1)" class="page-link page-link-back">
                    <svg fill="none" height="11" viewBox="0 0 7 11" width="7" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.99994 10L0.999939 5.5L5.99994 1" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </svg>
                </NuxtLink>
            </li>
            <li v-for="item in items" :class="{disabled: !item, active: page === item || highlight.includes(item)}" class="page-item">
                <NuxtLink v-if="item" :replace="replace" :to="route(item)" class="page-link">
                    <span>{{ item }}</span>
                </NuxtLink>
                <span v-else class="page-link page-link-empty">...</span>
            </li>
            <li class="page-item" :class="{disabled: page === pages}">
                <NuxtLink :replace="replace" :to="route(page + 1)" class="page-link page-link-next">
                    <svg fill="none" height="12" viewBox="0 0 7 12" width="7" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.999939 1.5L5.99994 6L0.999939 10.5" stroke="black" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2"/>
                    </svg>
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script>
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
        highlight: {
            type: Array,
            default: [],
        },
        delta: {
            type: Number,
            default: 2,
        },
        delta2: {
            type: Number,
            default: 1,
        },
        replace: {
            type: Boolean,
            default: false,
        },
    },
    watch: {
        page() {
            this.check()
        },
        pages() {
            this.check()
        },
        perPage() {
            this.check()
        },
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
    mounted() {
        this.check()
    },
    methods: {
        check() {
            if (this.page > this.pages) {
                this.$router.replace(this.route(this.pages))
            } else if (this.page < 1) {
                this.$router.replace(this.route(1))
            }
        },
        route(page) {
            if (page === 1) page = void 0

            return {
                ...this.$route,
                query: {
                    ...(this.$route.query || {}),
                    page,
                },
            }
        },
    },
}
</script>

<style lang="scss">
.pagination {
    margin: 35px 0 15px;

    &-comments {
        margin-bottom: 0;
    }

    &-list {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .page-item {
        flex-shrink: 0;
        margin: 1px;

        @include laptop-lg() {
            margin: 2px;
        }

        &.active {
            .page-link {
                color: $white;
                background: $pagination-color;
            }
        }

        &.disabled {
            pointer-events: none;
        }
    }

    .page-link {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        padding: 5px 10px;
        min-width: 25px;
        height: 25px;
        font-weight: 700;
        font-size: 14px;
        line-height: 25px;
        text-decoration: none;
        color: $black;
        background: $white;
        border-radius: 4px;
        cursor: pointer;

        @include laptop-lg() {
            font-size: 16px;
            min-width: 29px;
            height: 29px;
            line-height: 29px;
        }

        &:hover {
            color: $black;
            background: $gray-lighter;
        }

        &-empty {
            padding: 0;
            margin: 0;
        }

        &-back, &-next {
            cursor: pointer;

            &:hover {
                background: $white;
            }
        }
    }
}
</style>
