<template>
    <Tabs>
        <Tab title="Авторизація" :active="props.activeTab==='login'">
            <AuthForm id="header"/>
        </Tab>
        <Tab title="Реєстрація" :active="props.activeTab==='register'">
            <RegistrationForm id="header"/>
        </Tab>
    </Tabs>
</template>

<script setup lang="ts">
import Tab from './Tab.vue';
import Tabs from './Tabs.vue';
import AuthForm from './AuthForm.vue';
import RegistrationForm from './RegistrationForm.vue';

interface Props {
    activeTab?: String;
}

const props = withDefaults(defineProps<Props>(), {
    activeTab: 'login',
});
</script>

<style lang="scss">
.modal-canvas {
    .tabs {

        &-nav {
            position: relative;
            display: flex;
            justify-content: center;
            margin: 0 0 20px 0;
            padding: 20px 40px 0 40px;
            background: #FAFAFA;
            list-style: none;

            @include laptop-lg() {
                padding-left: 130px;
                padding-right: 130px;
            }

            &:before {
                position: absolute;
                left: 0;
                right: 0;
                bottom: -20px;
                content: '';
                height: 20px;
                width: 100%;
                background: linear-gradient(180deg, rgba(255, 255, 255, 1) 30%, rgba(255, 255, 255, 0) 100%);
            }
        }
    }

    .tab {

        &-item {
            flex: 1;
            flex-shrink: 0;
            position: relative;
            padding-bottom: 10px;
            font-size: 16px;
            line-height: 22px;
            text-align: center;
            color: #000000;
            cursor: pointer;

            &.active {

                &:before {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 5px;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: #F1C40F;
                }
            }
        }

        &-content {
            position: relative;
            padding: 0 40px 200px 40px;
            height: calc(100vh - 52px);
            overflow-y: auto;

            @include scroll();

            @include laptop-lg() {
                padding-left: 130px;
                padding-right: 130px;
                padding-bottom: 50px;
            }
        }
    }
}
</style>
