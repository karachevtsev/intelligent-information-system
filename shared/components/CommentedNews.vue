<template>
    <div class="box mb-30">
        <div class="box-header">
            <h2>Зараз коментують</h2>
        </div>
        <div class="box-content pb-0">
            <ul class="commented-news">
                <li v-for="(item, index) in data" :key="index">
                    <div class="commented-article">
                        <div class="author">
                            <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                                    fill="#CDCDD4"/>
                                <mask id="mask0_527_21811" height="20" maskUnits="userSpaceOnUse" style="mask-type:alpha" width="20" x="0" y="0">
                                    <path
                                        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                                        fill="#74747D"/>
                                </mask>
                                <g mask="url(#mask0_527_21811)">
                                    <path
                                        d="M10 31C15.5228 31 20 26.5228 20 21C20 15.4772 15.5228 11 10 11C4.47715 11 0 15.4772 0 21C0 26.5228 4.47715 31 10 31Z"
                                        fill="#7F808D"/>
                                </g>
                                <path
                                    d="M9.99996 12.5385C12.1241 12.5385 13.8461 10.8165 13.8461 8.69235C13.8461 6.56817 12.1241 4.84619 9.99996 4.84619C7.87579 4.84619 6.15381 6.56817 6.15381 8.69235C6.15381 10.8165 7.87579 12.5385 9.99996 12.5385Z"
                                    fill="#797A87"/>
                            </svg>
                            <span v-text="item.name"></span>
                        </div>
                        <div class="comment" v-text="item.comment"></div>
                        <NuxtLink :to="item.content.url">
                            <span v-text="item.content.title"></span>
                        </NuxtLink>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { public: { apiBase } } = useRuntimeConfig();

const { data } = await useFetch('/dtkt/last-comments', {
    baseURL: apiBase,
    key: '/dtkt/last-comments'
});
</script>

<style lang="scss">
.commented-news {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
        + li {
            margin-top: 20px;
        }
    }

    .commented-article {

        .author {
            display: flex;
            align-items: center;
            margin-bottom: 9px;

            svg {
                margin-right: 6px;
                flex-shrink: 0;
            }

            span {
                font-weight: 500;
                color: #333333;
                @include text-overflow();
            }
        }

        .comment {
            margin-bottom: 10px;
            font-weight: 400;
            line-height: 18px;
            color: #7A7B7D;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }

        a {
            font-weight: 500;
            font-size: 15px;
            line-height: 18px;
            text-decoration-line: underline;
            color: #333333;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;

            &:hover {
                color: $color-main;
            }
        }
    }
}
</style>
