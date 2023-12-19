<template>
    <div class="profile-data">
        <div v-if="subscriptions.length" class="subscriptions">
            <div v-if="groupedSubscriptions?.active" class="subscriptions-item">
                <h2 class="subscriptions-item-title">Активна передплата</h2>
                <div class="subscription">
                    <div class="profile-table profile-subscription">
                        <div class="profile-table-row table-header">
                            <div class="profile-table-cell">Назва пакету</div>
                            <div class="profile-table-cell">Період передплати</div>
                        </div>
                        <template v-for="subscription in groupedSubscriptions?.active">
                            <div class="profile-table-row table-body">
                                <div class="profile-table-cell">
                                    <div class="subscription-package">
                                        {{ subscription.plan }}
                                        <div>
                                            <span>Що входить у пакет?</span>
                                            <ul>
                                                <li v-for="ability in subscription.packages">
                                                    {{ ability.title }}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="profile-table-cell font-color-gray">
                                    {{ formatDate(subscription.begin) }} — {{ formatDate(subscription.end) }}
                                </div>
                            </div>
                            <div class="subscription-abilities">
                                <template v-for="ability in subscription.packages">
                                    <div v-if="ability.quantity > 0" class="subscription-abilities-col">
                                        {{ ability.text }}: {{ ability.quantity - ability.used }} з {{ ability.quantity }}
                                    </div>
                                </template>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div v-else class="subscriptions-item">
                <div class="active-subscription">
                    <h2>Активна передплата</h2>
                    <p>Зараз у вас немає активної передплати. <br> Оберіть передплатний пакет, натиснувши кнопку нижче</p>
                    <NuxtLink :to="SUBSCRIBE_URL" class="btn btn-profile" target="_blank" rel="">Оформити передплату</NuxtLink>
                </div>
            </div>
            <div v-if="groupedSubscriptions?.future" class="subscriptions-item">
                <h2 class="subscriptions-item-title">Майбутня передплата</h2>
                <div class="subscription">
                    <div class="profile-table profile-subscription">
                        <div class="profile-table-row table-header">
                            <div class="profile-table-cell">Назва пакету</div>
                            <div class="profile-table-cell">Період передплати</div>
                        </div>
                        <div class="profile-table-row table-body" v-for="subscription in groupedSubscriptions?.future">
                            <div class="profile-table-cell">
                                <div class="subscription-package">
                                    {{ subscription.plan }}
                                </div>
                            </div>
                            <div class="profile-table-cell font-color-gray">
                                {{ formatDate(subscription.begin) }} — {{ formatDate(subscription.end) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="groupedSubscriptions?.ended" class="subscriptions-item">
                <h2 class="subscriptions-item-title">Більш рання передплата</h2>
                <div class="subscription">
                    <div class="profile-table profile-subscription">
                        <div class="profile-table-row table-header">
                            <div class="profile-table-cell">Назва пакету</div>
                            <div class="profile-table-cell">Період передплати</div>
                        </div>
                        <div class="column-reverse">
                            <div class="profile-table-row table-body" v-for="subscription in groupedSubscriptions?.ended">
                                <div class="profile-table-cell">
                                    <div class="subscription-package">
                                        {{ subscription.plan }}
                                    </div>
                                </div>
                                <div class="profile-table-cell font-color-gray">
                                    {{ formatDate(subscription.begin) }} — {{ formatDate(subscription.end) }}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <template v-else>
            <Image name="subscriptions-empty" alt="Моя передплата"/>
            <p class="profile-data-empty empty-subscriptions">
                На жаль, ви ще не користувались нашим сервісом.
                Оберіть передплатний пакет, натиснувши кнопку нижче або
                <NuxtLink :to="SUBSCRIBE_TRIAL_URL" target="_blank" rel="">спробуйте безкоштовно.</NuxtLink>
            </p>
            <p class="text-center m-0">
                <NuxtLink :to="SUBSCRIBE_URL" class="btn btn-profile" target="_blank" rel="">Оформити
                    передплату
                </NuxtLink>
            </p>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { useRuntimeConfig } from '#app';
import { SUBSCRIBE_URL, SUBSCRIBE_TRIAL_URL } from 'dtkt-shared/constants/index.js';
import { computed } from 'vue';

const { public: { apiBase } } = useRuntimeConfig();

const { data: subscriptions } = await $fetch<{ data: any[], meta: any, links: any }>('/shop4/subscriptions?all=1', {
    baseURL: apiBase,
    credentials: 'include',
});

const groupSubscriptions = (array: any[], key: string | number) => {
    return array?.reduce((result, currentValue) => {
        let keyInner;

        if (currentValue[key]) {
            keyInner = 'ended';
        } else if (new Date(currentValue['begin']).getTime() < new Date().getTime()) {
            keyInner = 'active';
        } else {
            keyInner = 'future';
        }

        (result[keyInner] = result[keyInner] || []).push(currentValue);

        return result;
    }, {});
};

const groupedSubscriptions = computed(() => {
    return groupSubscriptions(subscriptions, 'ended');
});

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('uk-UK', { year: 'numeric', month: 'long' });
};
</script>

<style lang="scss">
.column-reverse {
    display: flex;
    flex-direction: column-reverse;
}

.active-subscription {
    text-align: center;

    h2 {
        margin-bottom: 15px;
        font-size: 21px;
        font-weight: 400;
        line-height: 140%;
    }

    p {
        margin-bottom: 20px;
        font-size: 18px;
        line-height: 140%;
        color: #7A7B7D;
    }
}

.subscriptions-item {
    + .subscriptions-item {
        margin-top: 40px;

        @include laptop-xl() {
            margin-top: 70px;
        }
    }

    &-title {
        margin-bottom: 10px;
        font-size: 21px;
        font-weight: 400;
    }

    .profile-table-row {
        margin-bottom: 5px;

        @include laptop-xl() {
            margin-bottom: 0;
        }
    }
}

.subscription-abilities {
    display: grid;
    grid-gap: 5px;

    @include laptop-xl() {
        grid-template-columns: 1fr 1fr 1fr;
    }

    &-col {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 300px;
        margin: 0 auto;
        padding: 20px 40px;
        font-size: 16px;
        line-height: 140%;
        text-align: center;
        color: #0B8E2F;
        background: #F5FDF2;

        @include laptop-lg() {
            width: 100%;
            padding-left: 50px;
            padding-right: 50px;
        }

        &:first-child {
            border-radius: 6px 0 0 6px;
        }

        &:last-child {
            border-radius: 0 6px 6px 0;
        }
    }
}

.subscription-package {
    font-size: 16px;

    > div {
        position: relative;

        &:hover {
            ul {
                display: block;
            }
        }

        span {
            line-height: 180%;
            text-decoration: underline;
            color: $link-color;
            cursor: pointer;
        }

        ul {
            display: none;
            position: absolute;
            z-index: 1;
            top: 40px;
            left: 50%;
            transform: translateX(-50%);
            margin: 0;
            padding: 25px;
            width: 280px;
            font-size: 16px;
            text-align: left;
            list-style: none;
            color: #000000;
            background: $white;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
            border-radius: 16px;

            &:before {
                content: '';
                position: absolute;
                top: -15px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-bottom: 15px solid $white;
            }

            li {
                position: relative;
                padding-left: 20px;

                &:before {
                    content: '';
                    position: absolute;
                    top: 5px;
                    left: 0;
                    width: 12px;
                    height: 9px;
                    background: url(@/assets/svg/check-package.svg) no-repeat center;
                }

                + li {
                    margin-top: 15px;
                }
            }
        }
    }
}
</style>
