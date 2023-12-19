<template>
    <ul v-if="show" class="bottom-navigation-switcher">
        <li @click="$bus.$emit('onSwitchNavigation', { show: true });show =!show">Дублювати розділи унизу екрану</li>
    </ul>
</template>

<script lang='ts' setup>
import { ref } from 'vue';

const { $bus } = useNuxtApp();
const name = 'dk-accept-navigation';
const show = ref(document.cookie.indexOf(`${name}=1`) !== -1);
</script>

<style lang='scss'>
.bottom-navigation-switcher {
    position: relative;
    margin: 13px 0 0;
    padding: 13px 10px;
    list-style: none;
    font-size: 14px;
    line-height: 16px;
    text-decoration-line: underline;
    color: #7E7F8C;
    cursor: pointer;

    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: $border-color;

        @include laptop-xl() {
            left: 10px;
            right: 10px;
        }
    }
}
</style>
