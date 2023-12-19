<template>
    <div class="paper-subscribe">
        <PaperTop/>
        <Image name="paper" alt="Передплата на паперовий «Дебет-Кредит»"/>
        <template v-if="$route.name === 'paper'">
            <PaperPayer :fields="fields" v-if="isEmptyPayer"/>
            <template v-else>
                <div class="paper-subscribe-btn">
                    <NuxtLink to="/paper_edit" class="btn btn-profile">Внести дані</NuxtLink>
                </div>
                <PaperInfo/>
            </template>
        </template>
        <PaperForm v-else/>
    </div>
</template>

<script lang="ts" setup>
import { getClientPaperSubscription } from '~/composables/paperSubscription';

const { isEmptyPayer, fields } = await getClientPaperSubscription();
</script>

<style lang="scss">
.paper-subscribe {

    &-top {
        max-width: 575px;
        margin: 0 auto 40px;
        font-size: 18px;
        text-align: center;
    }

    &-btn {
        margin-bottom: 40px;
        text-align: center;
    }

    &-info {
        max-width: 810px;
        margin: 0 auto;
        padding: 20px;
        font-size: 16px;
        text-align: center;
        background: #F4F5F7;
        border-radius: 6px;

        @include laptop-xl() {
            padding-left: 90px;
            padding-right: 90px;
        }

        h2 {
            margin-bottom: 10px;
            font-weight: 500;
            font-size: 18px;
            color: $color-blue;
        }

        p {
            margin-bottom: 15px;

            @include laptop-xl() {
                margin-bottom: 20px;
            }
        }

        ul {
            margin: 0;
            padding: 0;
            list-style: none;
            text-align: left;

            @include tablet() {
                display: flex;
                flex-wrap: wrap;
            }

            li {
                position: relative;
                padding-left: 20px;
                line-height: 19px;

                + li {
                    margin-top: 10px;

                    @include tablet() {
                        margin-top: 0;
                    }
                }

                @include tablet() {
                    line-height: 30px;
                    width: 50%;

                    &:nth-child(odd) {
                        margin-right: 40px;
                    }

                    &:nth-child(even) {
                        width: calc(50% - 40px);
                    }
                }

                &:before {
                    content: '';
                    position: absolute;
                    top: 5px;
                    left: 0;
                    width: 12px;
                    height: 9px;
                    background: url(@/assets/svg/check-package.svg) no-repeat top center;

                    @include tablet() {
                        top: 10px;
                    }
                }
            }
        }
    }
}
</style>
