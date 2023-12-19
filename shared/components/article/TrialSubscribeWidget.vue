<template>
    <NuxtLink id="trial-subscribe-widget"
              to="https://subscribe.dtkt.ua/trial"
              class="article-subscribe"
              target="_blank"
              rel=""
              :class="`is-${type}`"
    >
        <span class="mobile-title">30 днiв передплати <b>безкоштовно!</b></span>
        <span class="desktop-title">Оберiть свiй пакет вiд «Дебету-Кредиту» <br> на мiсяць <b>безкоштовно!</b></span>
        <span class="btn-subscribe">Спробувати</span>
        <span class="arrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 306 306">
                <path d="M94.35 0l-35.7 35.7L175.95 153 58.65 270.3l35.7 35.7 153-153z"></path>
            </svg>
        </span>
    </NuxtLink>
</template>

<script lang="ts" setup>
type Template = 'wide' | 'narrow'

const props = withDefaults(
    defineProps<{
        type?: Template;
    }>(),
    {
        type: 'wide',
    },
);
</script>

<style lang="scss">
.article-subscribe {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 320px;
    padding: 14px 25px 14px 50px;
    margin: 30px auto 0;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    text-decoration: none;
    color: #7c2f25;
    background-color: #f2da73;
    border-radius: 10px;

    &.mb-30 {
        margin-bottom: 30px;
    }

    &.is-narrow {
        font-size: 20px;

        @include laptop-xxl() {
            padding-left: 135px;
        }
    }

    @include tablet() {
        max-width: 100%;
        padding: 25px 25px 20px 115px;
        font-size: 19px;
    }

    @include laptop-xl() {
        font-size: 22px;
        padding-left: 130px;
    }

    @include laptop-xxl() {
        padding: 35px 40px 30px 190px;
    }

    @include noprint();

    &:before {
        content: "";
        width: 44px;
        height: 44px;
        position: absolute;
        top: 50%;
        margin-top: -22px;
        left: 12px;
        background: #fff url(../../assets/svg/gift.svg) no-repeat center;
        background-size: 50%;
        border-radius: 50%;
        box-shadow: 0 0 0 3px #f2da73, 0 0 0 5px #eac759;

        @include tablet() {
            left: 27px;
            width: 62px;
            height: 62px;
            margin-top: -31px;
            background-size: 60%;
        }

        @include laptop-xxl() {
            left: 40px;
        }
    }

    .mobile-title {
        @include tablet() {
            display: none;
        }
    }

    .desktop-title {
        display: none;

        @include tablet() {
            display: block;
        }
    }

    .arrow {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        flex: 0 0 24px;
        margin-left: auto;
        background-color: #edcd62;
        transition: all 0.3s;
        border-radius: 0 10px 10px 0;

        svg {
            fill: #fff;
        }

        @include tablet() {
            display: none;
        }
    }

    b {
        color: #cf1d07;
    }

    .btn-subscribe {
        display: none;
        width: 150px;
        height: 35px;
        line-height: 35px;
        background-color: #dd4b39;
        font-size: 19px;
        text-align: center;
        color: #fff;
        border-radius: 6px;
        margin-left: auto;
        transition: all 0.3s;

        @include tablet() {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        @include laptop-xxl() {
            width: 200px;
            height: 40px;
            font-size: 21px;
        }
    }

    &:hover {
        text-decoration: none;
        color: #7c2f25;

        .arrow {
            background-color: #cf1d07;
        }

        .btn-subscribe {
            background-color: #cf1d07;
        }
    }

    &:focus {
        text-decoration: none;
        color: #7c2f25;
    }
}
</style>
