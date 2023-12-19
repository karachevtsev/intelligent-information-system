<template>
    <div class="container">
        <slot name="top"></slot>
        <div class="main-content">
            <slot></slot>
            <SidebarLeft/>
        </div>
    </div>
</template>

<script lang="ts" setup>
import SidebarLeft from '~/components/SidebarLeft';
</script>
