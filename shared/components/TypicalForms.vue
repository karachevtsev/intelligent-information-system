<template>
    <BoxWidget :data="settings">
        <ul class="box-list" v-if="formsList.length">
            <li v-for="form in formsList">
                <div class="box-form has-icon">
                    <div class="box-form-item">
                        <NuxtLink :to="`${url}/${form.alias}`" :target="target" rel="">{{ form.title }}</NuxtLink>
                        <span class="box-form-count">{{ form.count }}</span>
                    </div>
                    <ul v-if="form.blanks.length" class="box-form-list">
                        <li v-for="blank in form.blanks" :key="blank.id">
                            <NuxtLink :to="isBlanks ? blank.url.pathname : blank.url.href" :target="target" rel="">{{ blank.fullName }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink :to="`${url}/${form.alias}`" :target="target" rel="">
                                ...та ще {{ form.count - 3 }}
                                <Plural :value="form.count - 3" one=" форма" few=" форми" many=" форм"/>
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
        <div v-if="!isBlanks" class="box-link box-link-blanks">
            <NuxtLink :to="url" target="_blank" rel="">Більше типових форм
                <svg fill="none" height="8" viewBox="0 0 5 8" width="5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 0.999969L4 3.99997L1 6.99997" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                </svg>
            </NuxtLink>
        </div>
    </BoxWidget>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import BoxWidget from './BoxWidget';
import Plural from './plural';
import { useRubric } from '../composables/contentBlank';

const { public: { apiBase, siteName } } = useRuntimeConfig();

const isBlanks = computed(() => siteName === 'blank');

const url = computed(() => isBlanks.value ? '/forms' : 'https://blank.dtkt.ua/forms');

const target = computed(() => isBlanks.value ? '_self' : '_blank');

const settings = {
    title: 'Типові форми',
    link: url.value,
    linkText: 'Усі типові форми ',
};

const { rubric: forms } = await useRubric('forms', {
    blanks_count: 3,
});

const formsList = computed(() => {
    return isBlanks.value ? forms.value : forms.value.slice(0, 4);
});
</script>

<style lang="scss">
.box-form {

    &.has-icon {
        &:before {
            background: url(../assets/svg/docs.svg) no-repeat center;
        }
    }

    &-item {
        display: flex;

        a {
            text-decoration: none;
        }
    }

    &-count {
        border-bottom: 1px dotted #999;
        flex-grow: 1;
        flex-shrink: 0;
        line-height: 16px;
        margin-bottom: 6px;
        overflow: hidden;
        text-align: right;
    }

    &-list {
        margin: 4px 0 0;
        padding: 0;
        list-style: none;

        li {
            color: #7A7B7D;

            + li {
                margin-top: 5px;
            }

            a {
                font-weight: 400;
                color: inherit;
            }
        }
    }
}
</style>
