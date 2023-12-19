<template>
    <div v-click-outside="hide" class="rubrics-menu">
        <div class="rubrics-menu-header" @click="open = !open">
            <span>Усі рубрики</span>
            <img
                alt=""
                height="6"
                src="../assets/svg/arrow-rubrics.svg?url"
                width="8"
            />
        </div>
        <div v-if="open" class="rubrics-menu-dropdown">
            <RubricsCollapse v-for="category in rubrics" :key="category.id" :title="category.title" :url="`/${category.slug}`">
                <ul class="rubrics-submenu">
                    <li v-for="subcategory in category.subcategories" :key="subcategory.id">
                        <NuxtLink :to="`/${category.slug}/${subcategory.slug}`">{{ subcategory.title }}</NuxtLink>
                    </li>
                </ul>
            </RubricsCollapse>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRubrics } from '../composables/content';
import RubricsCollapse from './RubricsCollapse';

interface Props {
    section?: String;
}

const props = withDefaults(defineProps<Props>(), {
    section: 'news',
});

const rubrics = await useRubrics(props.section);
const open = ref(false);

function hide() {
    open.value = false;
}
</script>

<style lang="scss">
.rubrics-menu {
    display: none;
    position: relative;
    font-size: 14px;
    line-height: 16px;
    color: $gray;

    @include laptop-lg() {
        display: block;
    }

    &-header {
        cursor: pointer;
        user-select: none;

        span {
            line-height: 25px;
        }

        img {
            margin-left: 5px;
        }
    }

    &-dropdown {
        position: absolute;
        z-index: 1;
        right: 0;
        width: 240px;
        padding: 10px;
        margin: 5px 0 0 0;
        background: $white;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
    }

    .rubrics-submenu {
        margin: 0;
        padding: 0 10px;
        list-style: none;

        li {
            font-weight: 400;
            font-size: 14px;
            line-height: 16px;

            a {
                color: $text-color;
                text-decoration: none;
                display: block;
                border-radius: 6px;
                padding: 7px 10px;

                &:hover {
                    background: #EFEFEF;
                }
            }
        }
    }
}
</style>

