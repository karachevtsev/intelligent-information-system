<template>
    <div v-if="show" class="desktop-bottom-navigation">
        <div class="container">
            <BottomNavigationList/>
        </div>
        <button type="button" class="close-bottom-navigation" @click="$bus.$emit('openNavigationModal', true)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill="#EDEDEF"/>
                <path d="M16 8L8 16" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8 8L16 16" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import { useNuxtApp } from '#app';
import BottomNavigationList from './BottomNavigationList';

const name = 'dk-accept-navigation';
const show = ref(document.cookie.indexOf(`${name}=1`) === -1);
const { $bus } = useNuxtApp();

$bus.$on('onSwitchNavigation', (value) => {
    show.value = value.show;
    document.cookie = value.show ? `${name}=1;path=/;domain=.dtkt.ua;Max-Age=-1;` : `${name}=1;path=/;domain=.dtkt.ua;`;
});
</script>

<style lang='scss'>
.desktop-bottom-navigation {
    position: sticky;
    z-index: 2;
    bottom: 0;
    left: 0;
    right: 0;
    height: 52px;
    background: $white;
    filter: drop-shadow(5px 0px 20px rgba(0, 0, 0, 0.4));

    @include noprint();

    .container {
        height: inherit;
    }

    .close-bottom-navigation {
        position: absolute;
        top: -40px;
        right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        margin: 0;
        padding: 0;
        border: 0;
        background: transparent;
        border-radius: 50%;
        cursor: pointer;
        overflow: hidden;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        user-select: none;
        text-align: center;
        transition: all 0.3s;

        @include laptop-xxl() {
            top: 50%;
            right: 25px;
            transform: translateY(-50%);
        }

        svg {
            width: 24px;
            height: 24px;
            flex-shrink: 0;
        }

        &:hover {
            svg {
                circle {
                    fill: $white;
                }

                path {
                    stroke: $gray;
                }
            }
        }
    }
}
</style>
