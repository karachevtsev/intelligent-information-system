<template>
    <div class="advert-manage">
        <template v-if="!isAdvertDisabled">
            <div class="advert-manage-title">
                <template v-if="canDisableAdvert">
                    «Дебет-Кредит» без реклами доступний тільки <span>для передплатників</span>
                </template>
                <template v-else>«Дебет-Кредит» без реклами</template>
            </div>
            <template v-if="$client">
                <template v-if="canDisableAdvert">
                    <p class="advert-manage-text">Ще не передплатник, проте теж хочете скористатись такою можливістю?</p>
                    <p class="advert-manage-text">
                        <NuxtLink :to="PACKAGES.ma.link" target="_blank" rel="">Пакет {{ PACKAGES.ma.name }}</NuxtLink>
                        усього за
                        <PackagePrice :product="PACKAGES.ma.product" :plan="PACKAGES.ma.plan"/>
                        саме для вас.
                    </p>
                    <p class="advert-manage-text mb-0">Або спробуйте
                        <NuxtLink :to="SUBSCRIBE_TRIAL_URL" target="_blank" rel="">безкоштовну передплату</NuxtLink>
                        на місяць прямо зараз прямо зараз
                    </p>
                    <button type="button" class="btn w-100" disabled>Сайт без реклами</button>
                </template>
                <template v-else>
                    <p class="advert-manage-text">
                        Передплатникам «Дебету-Кредиту» дуже просто відмовитись від рекламних оголошень на сайті:
                    </p>
                    <ul>
                        <li>натисніть жовту кнопку нижче;</li>
                        <li>перезавантажте вже відкриті сторінки.</li>
                    </ul>
                    <button type="button" class="btn w-100" @click="send">Сайт без реклами</button>
                </template>
            </template>
            <template v-else>
                <p class="advert-manage-text">Відмовитись від рекламних оголошень на сайті «Дебет-Кредит» дуже просто:</p>
                <ul>
                    <li>авторизуйтесь чи зареєструйтесь, натиснувши на кнопку нижче;</li>
                    <li>ще раз перейдіть вгорі сайту на «Вимкнути рекламу»;</li>
                    <li>якщо ви передплатник «Дебету-Кредиту» – активуйте функцію в один клік.</li>
                </ul>
                <button type="button" class="btn w-100" @click="openLoginModal">Увійти</button>
                <p class="advert-manage-subscribe">Ще не передплатник, проте теж хочете вимкнути рекламу?
                    <NuxtLink :to="PACKAGES.ma.link" target="_blank" rel="">Пакет {{ PACKAGES.ma.name }}</NuxtLink>
                    усього за
                    <PackagePrice :product="PACKAGES.ma.product" :plan="PACKAGES.ma.plan"/>
                    саме для вас.
                </p>
                <p class="advert-manage-subscribe">Або спробуйте
                    <NuxtLink :to="SUBSCRIBE_TRIAL_URL" target="_blank" rel="">безкоштовну передплату</NuxtLink>
                    на місяць прямо зараз
                </p>
            </template>
        </template>
        <template v-else>
            <div class="advert-manage-title">
                Ось і все! Ваш улюблений сайт — <span>без реклами</span>
            </div>
            <p class="advert-manage-text">Щоб повернути усе як було, перейдіть в особистий кабінет й клікніть на перемикач у відповідному розділі.</p>
            <button type="button" class="btn w-100" @click="closeAdvertManage">Зрозуміло</button>
        </template>
        <img v-if="$client"
             alt="Сайт без реклами"
             height="162"
             loading="lazy"
             src="/images/advert-image.svg?url"
             width="122"
        />
    </div>
</template>

<script setup lang="ts">
import { useNuxtApp, useRuntimeConfig } from '#app';
import { PACKAGES, SUBSCRIBE_TRIAL_URL } from '../constants';
import PackagePrice from './PackagePrice';
import { ref, computed } from 'vue';

const { $bus, $client, $updateClient } = useNuxtApp();
const { public: { apiBase } } = useRuntimeConfig();
const isAdvertDisabled = ref(false);

const send = async () => {
    try {
        await $fetch('/dtkt/no-advert', {
            baseURL: apiBase,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: {
                'value': 1,
            },
        });
        await $updateClient();
        isAdvertDisabled.value = true;
    } catch (e) {
        console.error(e);
    }
};

const closeAdvertManage = async () => {
    await $bus.$emit('openAdvertModal', false);
    isAdvertDisabled.value = false;
};

const openLoginModal = async () => {
    await $bus.$emit('openAdvertModal', false);
    await $bus.$emit('openLoginModal');
};

const canDisableAdvert = computed(() => {
    return $client.value?.additional.left < 0 || $client.value?.additional.left === null;
});
</script>

<style lang="scss">
.advert-manage {

    &-title {
        margin-bottom: 30px;
        padding-bottom: 15px;
        font-weight: 700;
        font-size: 21px;
        border-bottom: 1px solid #EDEDEF;

        span {
            color: #F1C40F;
        }
    }

    ul {
        margin-bottom: 0;
    }

    p {
        margin-bottom: 20px;
        line-height: 20px;

        &.mb-0 {
            margin-bottom: 0;
        }
    }

    &-text {
        a {
            color: #333333;

            &:hover {
                text-decoration: none;
            }
        }
    }

    &-subscribe {
        color: #7A7B7D;

        a {
            color: #333333;

            &:hover {
                text-decoration: none;
            }
        }
    }

    .btn {
        margin: 30px 0;
        line-height: 1.6;
    }

    img {
        display: block;
        margin: 20px auto 0;
    }
}
</style>
