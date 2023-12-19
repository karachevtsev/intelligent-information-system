<template>
    <ul class="article-sharer">
        <li>
            <NuxtLink
                :to="url"
                target="_blank"
                title="Поділитися в Facebook"
                @click.prevent="shareOnFacebook(url)"
                class="link-fb"
            ></NuxtLink>
        </li>
        <li>
            <NuxtLink
                :to="url"
                target="_blank"
                title="Скопіювати посилання"
                @click.prevent="copyToClipboard(url)"
                class="link-copy"
            ></NuxtLink>
            <div :class="isShow ? 'show' : ''"
                 class="toast toast-copy">
                Посилання скопійовано
            </div>
        </li>
        <li>
            <NuxtLink
                title="Друкувати"
                @click.prevent="printArticle"
                class="link-print"
            ></NuxtLink>
        </li>
        <li v-if="hasComments">
            <NuxtLink to="#comments"
                      title="Коментарі"
                      class="link-comments"
            ></NuxtLink>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isShow = ref(false);

const props = defineProps({
    url: String,
    hasComments: {
        type: [Boolean, null],
        default: true,
    },
});

const printArticle = () => {
    if (process.client) {
        window.print();
    }
};

const copyToClipboard = (path: string) => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(path).then(() => {
            console.log('Copied to clipboard');
            isShow.value = true;
            setTimeout(() => {
                isShow.value = false;
            }, 1500);
        });
    } else {
        console.log('Browser Not compatible');
    }
};

const shareOnFacebook = (url: string) => {
    const width = 640;
    const height = 480;
    const left = (screen.width / 2) - (width / 2);

    if (process.client) {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            `Поділитися в Facebook`,
            `width=${width},height=${height},toolbar=0,status=0,left=${left}}`,
        );
    }
};
</script>

<style lang="scss">
.article-sharer {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;

    li {
        position: relative;

        + li {
            margin-left: 25px;

            @include laptop-lg() {
                margin-left: 20px;
            }
        }

        &:nth-child(3) {
            display: none;

            @include laptop-lg() {
                display: block;
            }
        }

        a {
            display: block;
            width: 24px;
            height: 24px;
            line-height: 0;
            cursor: pointer;

            @include laptop-lg() {
                width: 30px;
                height: 30px;
            }

            $icons: (
                'fb',
                'copy',
                'print',
                'comments',
            );

            @each $icon in $icons {
                &.link-#{$icon} {
                    background: center / contain url(@/assets/svg/article-#{$icon}.svg);
                }
            }
        }
    }
}
</style>
