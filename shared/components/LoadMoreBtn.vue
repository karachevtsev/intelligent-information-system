<template>
    <div class="load-more">
        <div class="load-more-btn">
            <span>{{ title }}</span>
            <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.00006 1L1.00006 5L6.00006 9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path
                    d="M1.00006 15C1.00006 16.9778 1.58655 18.9112 2.68536 20.5557C3.78418 22.2002 5.34596 23.4819 7.17323 24.2388C9.00049 24.9957 11.0112 25.1937 12.951 24.8078C14.8908 24.422 16.6726 23.4696 18.0711 22.0711C19.4696 20.6725 20.4221 18.8907 20.8079 16.9509C21.1938 15.0111 20.9957 13.0004 20.2389 11.1732C19.482 9.3459 18.2002 7.78412 16.5558 6.6853C14.9113 5.58649 12.9779 5 11.0001 5H1.95244"
                    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    name: "LoadMoreBtn",
    props: {
        title: {
            type: String,
            required: true,
            default: "Ще новини"
        }
    }
}
</script>

<style lang="scss">
.load-more {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    cursor: pointer;

    &-btn {
        margin: 35px auto 30px;
        display: inline-flex;
        justify-content: center;
        align-items: center;

        @include laptop-xl() {
            margin-bottom: 15px;
        }
    }

    &:hover {
        color: $color-main;
    }

    &:active {
        color: $black;
    }

    svg {
        margin-left: 15px;
        stroke: currentColor;
    }
}
</style>
