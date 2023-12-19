<template>
    <div class="mobile-navigation">
        <BottomNavigationList class="mobile-navigation-sites"/>
        <span class="mobile-navigation-notifications">
            <Notifications/>
        </span>
    </div>
</template>

<script setup lang="ts">
import Notifications from './Notifications';
import BottomNavigationList from './BottomNavigationList';
</script>

<style lang="scss">
.mobile-navigation {
    position: sticky;
    z-index: 2;
    bottom: 0;
    left: 0;
    right: 0;
    height: 52px;
    padding: 0 2px;
    display: flex;
    justify-content: space-between;
    background: $white;

    @include mobile() {
        height: 56px;
    }

    &:before {
        content: '';
        position: absolute;
        z-index: 2;
        top: -30px;
        left: 0;
        right: 0;
        height: 30px;
        box-shadow: inset 0px -20px 20px -20px rgba(0, 0, 0, 0.35);
    }

    &-sites {
        width: calc(100% - 54px);
        overflow-x: scroll;
        scroll-snap-type: x mandatory;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    &-notifications {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 54px;
        margin-left: 5px;

        img {
            margin: 0 auto;
        }

        &:before {
            content: '';
            position: absolute;
            top: 10px;
            left: 0;
            bottom: 10px;
            width: 1px;
            background: #CDCDCD;
        }
    }

    @include noprint();
}
</style>
