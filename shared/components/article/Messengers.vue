<template>
    <div class="article-messengers">
        <h2>Увага!</h2>
        <p>Тепер ви можете читати бухгалтерські новини від «Дебету-Кредиту» у Telegram та VIBER, а обговорювати їх – у
            найбільшій
            групі бухгалтерів на Facebook</p>
        <p>Приєднуйтесь і дізнавайтесь найважливіші новини першими!</p>
        <ul>
            <li>
                <NuxtLink class="btn te" target="_blank" :to="SOCIAL.SOCIAL_TELEGRAM">Telegram</NuxtLink>
            </li>
            <li>
                <NuxtLink class="btn vi" target="_blank" :to="SOCIAL.SOCIAL_VIBER_INVITE">Viber</NuxtLink>
            </li>
            <li>
                <NuxtLink class="btn fb" target="_blank" :to="SOCIAL.SOCIAL_FACEBOOK_CLUB">Facebook
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { SOCIAL } from '../../constants';
</script>

<style lang="scss">
.article-messengers {
    margin-bottom: 30px;
    padding: 30px;
    background: $white;
    border: 1px solid $gray-lighter;
    border-radius: 10px;
    text-align: center;

    @include laptop-xxl() {
        padding-left: 160px;
        padding-right: 160px;
    }

    h2 {
        margin-bottom: 10px;
        text-transform: uppercase;
        font-weight: 700;
        font-size: em(21);
        line-height: em(25);
        color: $gray-dark;
    }

    p {
        font-size: em(15);
        line-height: em(18);
        color: $gray-dark;
    }

    ul {
        margin: 20px 0 0;
        padding: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        @include tablet() {
            flex-direction: row;
        }

        li {
            + li {
                margin-top: 10px;

                @include tablet() {
                    margin-top: 0;
                    margin-left: 20px;
                }

                @include laptop-xl() {
                    margin-left: 40px;
                }
            }

            .btn {
                width: 150px;
                font-weight: 400;
                font-size: 14px;
                line-height: 14px;
                color: $white;

                &.te {
                    background: #2CD9FF;
                }

                &.vi {
                    background: #8255E3;
                }

                &.fb {
                    background: #2E9BFF;
                }
            }
        }
    }

    @include noprint();
}
</style>
