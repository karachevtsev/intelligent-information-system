<template>
    <div class="box mb-30" v-if="slides.length">
        <div class="box-header">
            <h2>Відео</h2>
        </div>
        <div class="box-content pb-0">
            <div v-for="slide in slides" class="aside-video">
                <a :href="slide.options.link"
                   target="_blank"
                   rel="nofollow noopener"
                   class="aside-video-cover"
                >
                    <img :src="`https://img.youtube.com/vi/${slide.options.videoId}/0.jpg`"
                         :alt="slide.options.name"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="none">
                        <circle cx="45" cy="45" r="44" stroke="#F1C40F" stroke-width="2"/>
                        <path d="M59 42.536c2.667 1.54 2.667 5.389 0 6.928L41 59.856c-2.667 1.54-6-.385-6-3.464V35.608c0-3.08 3.333-5.004 6-3.464l18 10.392Z" fill="#F1C40F"/>
                    </svg>
                </a>
                <a :href="slide.options.link"
                   target="_blank"
                   rel="nofollow noopener"
                   class="aside-video-title"
                >
                    {{ slide.options.name }}
                </a>
                <div class="aside-video-description">
                    {{ slide.options.text }}
                </div>
                <a class="btn"
                   :href="slide.options.link"
                   target="_blank"
                   rel="nofollow noopener"
                >
                    Дивитись відео
                </a>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { computed } from 'vue';
import { useSlider } from '../composables/slider';

const slider = await useSlider('video_DK_widget');

const slides = computed(() => {
    return slider.value['slides'];
});
</script>

<style lang='scss'>
.aside-video {

    + .aside-video {
        border-top: 1px solid $border-color;
        padding-top: 30px;
        margin-top: 30px;
    }

    &-player{
        margin-bottom: 20px;

        &:hover {
            box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.50);
        }
    }

    &-cover {
        position: relative;
        display: block;
        margin-bottom: 20px;

        img {
            display: block;
            object-fit: cover;
            aspect-ratio: 16 / 9;
        }

        svg {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }

        &:hover {
            box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.50);
        }
    }

    &-title {
        display: block;
        margin-bottom: 10px;
        font-size: 21px;
        font-weight: 500;
        line-height: normal;
        text-decoration: none;
        color: $gray-dark;

        &:hover {
            color: $color-main;
            text-decoration: underline;
        }
    }

    &-description {
        margin-bottom: 20px;
        color: $gray;
        font-size: 15px;
        line-height: 130%
    }

    .btn {
        display: block;
        margin: 0 auto;
        width: 150px;
        font-size: 14px;
        line-height: 15px;

        &:focus {
            color: $gray-dark;
        }
    }
}
</style>
