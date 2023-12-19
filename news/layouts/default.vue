<template>
    <div class="container">
        <MainThemes buttonText="Мої новини"
                    favoriteLink="news"
                    class="hide-on-mobile"
        />
        <div class="main-content">
            <slot></slot>
            <SidebarLeft/>
        </div>
    </div>
</template>

<script lang="ts" setup>
import MainThemes from 'dtkt-shared/components/MainThemes';
import SidebarLeft from '~/components/SidebarLeft';
</script>
